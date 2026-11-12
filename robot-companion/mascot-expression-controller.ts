import * as THREE from 'three';
import { EyeMotion } from './eye-motion';
import { createFaceMaterial, FACE_DEFAULT, type FaceLayout, type FaceState } from './mascot-face-material';

/** 'neutral' is kept as an alias of 'idle' for older callers. */
export type Expression = 'idle' | 'happy' | 'talking' | 'thinking' | 'greeting' | 'winking' | 'neutral';
export type MoodExpression = Exclude<Expression, 'neutral'>;

/** Face targets per expression, layered over FACE_DEFAULT (the idle smile). */
const FACES: Record<MoodExpression, Partial<FaceState>> = {
  idle: {},
  happy: { arcL: 1, arcR: 1, mouthOpen: 1, mouthWidth: 1.35, mouthCurve: 1, cheek: 1, browL: .05, browR: .05, glow: 1.08 },
  talking: { mouthOpen: .5, mouthWidth: .95, cheek: .55 },
  thinking: { mouthOpen: .06, mouthWidth: .55, mouthCurve: -.25, mouthShift: .08, cheek: .3, browL: .08, browR: -.01 },
  // Chào (vẫy tay): mắt cong "^ ^" + miệng cười khép, má hồng — như mẫu robot vẫy tay sếp gửi (05/11/2026).
  greeting: { arcL: 1, arcR: 1, mouthOpen: .3, mouthWidth: 1.5, mouthCurve: 1, cheek: 1, browL: .05, browR: .05, glow: 1.12 },
  winking: { arcR: 1, mouthOpen: .85, mouthWidth: 1.15, mouthCurve: 1, cheek: .95, browR: .06 },
};
/** Where the eyes look per expression (gaze units, ±1 ≈ full side glance). */
const LOOK: Partial<Record<MoodExpression, [number, number]>> = { thinking: [-1.3, 1.6] };
/** How long temporary expressions last before returning to the persistent one. */
const DURATION: Partial<Record<MoodExpression, number>> = { happy: 2.4, greeting: 3.4, winking: 1.8 };
/** Một lần chào: giơ tay ~0.55s → vẫy 2–3 nhịp (~2.2 lần/giây, giảm dần) → hạ tay ~0.6s. */
export const WAVE_SECONDS = 2.25;

/** Everything a character needs to pose itself this frame. */
export interface MascotPose {
  expression: MoodExpression;
  reduced: boolean;
  /** Breathing phase −1…1. */
  breathe: number;
  /** Extra body lift (bob + happy hop). */
  bodyY: number;
  /** Side-to-side body lean (rad). */
  lean: number;
  headYaw: number; headPitch: number; headTilt: number;
  /** Greeting wave: seconds since start (−1 = not waving) and smooth 0→1→0 envelopes. */
  waveTime: number; waveAmount: number; waveElbow: number; waveSway: number;
  /** 0…1 while talking (mouth opening), handy for body nods. */
  talk: number;
}

/**
 * Shared brain of every mascot concept: expression timing, blinking, gaze, face uniforms and the
 * body rhythm (breathing, hops, head tilt, wave timing). Characters only map MascotPose onto their own joints.
 */
export class MascotExpressionController {
  readonly face: ReturnType<typeof createFaceMaterial>;
  readonly faceState: FaceState = { ...FACE_DEFAULT };
  readonly gaze = new THREE.Vector2();
  private eyeMotion = new EyeMotion();
  private expression: MoodExpression = 'idle';
  private persistent: MoodExpression = 'idle';
  private expressionLeft = Infinity;
  private waveTime = -1;
  private hopTime = -1;
  private tiltTime = -1;
  private blinkTime = -1;
  private forcedBlink = -1;
  private look: { x: number; y: number; left: number } | null = null;
  private talkPhase = 0;
  private head = new THREE.Euler();
  private lean = 0;

  constructor(layout: FaceLayout) { this.face = createFaceMaterial(layout); }

  get expressionName() { return this.expression; }
  get isWaving() { return this.waveTime >= 0; }
  get blinkProgress() { return this.faceState.blinkL; }

  /** Keep an expression until another one is set. */
  setExpression(expression: Expression) {
    const next = expression === 'neutral' ? 'idle' : expression;
    this.persistent = next; this.play(next, Infinity);
  }
  /** Show an expression for a while, then return to the persistent one. Greeting also waves, happy hops, winking tilts. */
  play(expression: Expression, seconds?: number) {
    const next = expression === 'neutral' ? 'idle' : expression;
    this.expression = next;
    this.expressionLeft = seconds ?? DURATION[next] ?? Infinity;
    if (next === 'greeting') this.wave();
    if (next === 'happy') this.hop();
    if (next === 'winking') this.tilt();
  }
  /** Vẫy tay; mặt chuyển sang biểu cảm chào suốt lúc vẫy (+0,5 s cho mắt kịp mở lại sau khi hạ tay). */
  wave() {
    if (this.isWaving) return false;
    this.waveTime = 0;
    if (this.expression !== 'greeting') { this.expression = 'greeting'; this.expressionLeft = WAVE_SECONDS + .5; }
    return true;
  }
  hop() { this.hopTime = 0; }
  tilt() { this.tiltTime = 0; }
  blink() { this.blinkTime = 0; }
  lookAt(x: number, y: number, seconds = 1.6) { this.look = { x, y, left: seconds }; }
  setBlink(closure: number) {
    const amount = THREE.MathUtils.clamp(closure, 0, 1);
    this.faceState.blinkL = this.faceState.blinkR = amount; this.forcedBlink = amount;
    this.face.apply(this.faceState, this.gaze, 0);
  }
  reset() {
    this.eyeMotion.reset(); this.gaze.set(0, 0); this.look = null; this.head.set(0, 0, 0); this.lean = 0;
    this.waveTime = this.hopTime = this.tiltTime = this.blinkTime = this.forcedBlink = -1;
    this.persistent = this.expression = 'idle'; this.expressionLeft = Infinity;
    Object.assign(this.faceState, FACE_DEFAULT);
    this.face.apply(this.faceState, this.gaze, 0);
  }

  update(dt: number, time: number, pointer: { x: number; y: number }, reduced: boolean): MascotPose {
    dt = Math.min(Math.max(dt, 0), .1);
    const ease = (rate: number) => 1 - Math.exp(-dt * rate);
    if (Number.isFinite(this.expressionLeft)) {
      this.expressionLeft -= dt;
      if (this.expressionLeft <= 0) { this.expression = this.persistent; this.expressionLeft = Infinity; }
    }
    const expr = this.expression;

    // ---- Face ----
    this.eyeMotion.update(dt, reduced, pointer);
    const target: FaceState = { ...FACE_DEFAULT, ...FACES[expr] };
    let talk = 0;
    if (expr === 'talking' && !reduced) {
      // Syllable-like mouth flaps: open wide = narrower "o", closed = wider smile.
      this.talkPhase += dt * (7.5 + Math.sin(time * 1.7) * 2);
      talk = .18 + .78 * Math.abs(Math.sin(this.talkPhase) * (.65 + .35 * Math.sin(this.talkPhase * .37 + 1)));
      target.mouthOpen = talk; target.mouthWidth = 1.1 - talk * .45;
    }
    if (expr === 'greeting' || expr === 'happy') target.glow *= 1 + Math.sin(time * 6) * .03;
    const faceEase = ease(expr === 'talking' ? 22 : 9);
    for (const key of Object.keys(target) as (keyof FaceState)[]) {
      if (key === 'blinkL' || key === 'blinkR') continue;
      this.faceState[key] += (target[key] - this.faceState[key]) * faceEase;
    }
    // Natural blinks from the shared clock, plus an on-demand blink.
    let blink = this.eyeMotion.blinkProgress;
    if (this.blinkTime >= 0) {
      this.blinkTime += dt;
      const t = this.blinkTime / .32;
      blink = Math.max(blink, t < .45 ? THREE.MathUtils.smootherstep(t, 0, .45) : 1 - THREE.MathUtils.smootherstep(t, .55, 1));
      if (t >= 1) this.blinkTime = -1;
    }
    if (this.forcedBlink >= 0) { blink = this.forcedBlink; this.forcedBlink = -1; }
    if (reduced) blink = 0;
    this.faceState.blinkL = this.faceState.blinkR = blink;

    // ---- Gaze: idle drift + expression look + explicit glances ----
    let [lookX, lookY] = LOOK[expr] ?? [0, 0];
    if (this.look) {
      lookX = this.look.x; lookY = this.look.y; this.look.left -= dt;
      if (this.look.left <= 0) this.look = null;
    }
    const gazeTarget = reduced ? new THREE.Vector2() : this.eyeMotion.gaze.clone().multiplyScalar(2.2).add(new THREE.Vector2(lookX, lookY));
    this.gaze.lerp(gazeTarget, ease(lookX || lookY ? 6 : 4));
    this.face.apply(this.faceState, this.gaze, time);

    // ---- Body rhythm ----
    const breathe = reduced ? 0 : Math.sin(time * 1.7);
    let bodyY = reduced ? 0 : breathe * .018;
    if (this.hopTime >= 0) {
      this.hopTime += dt;
      const t = this.hopTime;
      bodyY += reduced ? 0 : Math.abs(Math.sin(t * Math.PI / .38)) * .12 * (1 - THREE.MathUtils.smoothstep(t, .5, .76));
      if (t >= .76) this.hopTime = -1;
    }
    this.lean = THREE.MathUtils.lerp(this.lean, reduced ? 0 : Math.sin(time * .75) * .018, ease(3));

    let tilt = Math.sin(time * .9) * .03;
    if (expr === 'thinking') tilt = .15;
    if (expr === 'winking') tilt = -.1;
    if (this.tiltTime >= 0) {
      this.tiltTime += dt;
      tilt += Math.sin(Math.min(1, this.tiltTime / 1.4) * Math.PI) * .16;
      if (this.tiltTime >= 1.4) this.tiltTime = -1;
    }
    if (reduced) tilt = 0;
    const headEase = ease(5);
    this.head.y = THREE.MathUtils.lerp(this.head.y, reduced ? 0 : pointer.x * .16 + this.gaze.x * .06, headEase);
    this.head.x = THREE.MathUtils.lerp(this.head.x, reduced ? 0 : -pointer.y * .09 - (expr === 'thinking' ? .1 : 0) + talk * .03, headEase);
    this.head.z = THREE.MathUtils.lerp(this.head.z, tilt, ease(4));

    let waveAmount = 0, waveElbow = 0, waveSway = 0, greetBodyY = 0, greetTilt = 0;
    const waveTime = this.waveTime;
    if (this.waveTime >= 0) {
      this.waveTime += dt;
      const t = this.waveTime;
      const end = WAVE_SECONDS;
      waveAmount = THREE.MathUtils.smootherstep(t, 0, .58) * (1 - THREE.MathUtils.smootherstep(t, end - .6, end));
      waveElbow = THREE.MathUtils.smootherstep(t, 0, .72) * (1 - THREE.MathUtils.smootherstep(t, end - .72, end));
      const window = THREE.MathUtils.smootherstep(t, .5, .68) * (1 - THREE.MathUtils.smootherstep(t, 1.5, 1.68));
      const decay = 1 - THREE.MathUtils.clamp((t - .55) / 1.1, 0, 1) * .35;
      waveSway = Math.sin((t - .55) * Math.PI * 2 * 2.2) * window * decay;
      // chuyển động phụ: lấy đà (hạ người) → nhún lên, nghiêng đầu về phía tay vẫy
      if (!reduced) {
        const on = THREE.MathUtils.smootherstep(t, 0, .45) * (1 - THREE.MathUtils.smootherstep(t, 1.6, end));
        greetBodyY = -Math.sin(THREE.MathUtils.clamp(t / .22, 0, 1) * Math.PI) * .035 + Math.sin(THREE.MathUtils.clamp((t - .22) / .4, 0, 1) * Math.PI) * .05;
        greetTilt = on * .14 + Math.sin((t - .55) * Math.PI * 2 * 1.1) * on * .03;
      }
      if (t >= end) this.waveTime = -1;
    }
    return {
      expression: expr, reduced, breathe, bodyY: bodyY + greetBodyY, lean: this.lean,
      headYaw: this.head.y, headPitch: this.head.x, headTilt: this.head.z + greetTilt,
      waveTime: waveTime >= 0 ? this.waveTime : -1, waveAmount, waveElbow, waveSway, talk,
    };
  }
}
