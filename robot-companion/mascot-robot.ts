import * as THREE from 'three';
import { brandMaterials, BRAND, labelTexture, logoDisc, MascotCharacter, superellipsoid, superellipsoidZ, surfacePatch } from './mascot-character-kit';
import type { MascotPose } from './mascot-expression-controller';
import type { FaceLayout } from './mascot-face-material';

export type { Expression } from './mascot-expression-controller';

/**
 * 'reference'  — the AI reference sheet (silver/cyan).
 * 'brand'      — Hiệp Phát blue/yellow, "TẬP LÁI" roof sign, turn-signal ears.
 * 'option-c'   — "Phương án C – Robot công nghệ thân thiện": LED panel + yellow fins on the head, logo ear pods,
 *                LED-ring eyes, glowing blue smile, yellow dash cheeks, navy belt, yellow trim; hero pose (hand on hip, thumbs up).
 * 'option-c-refined' — option C polished: low rounded fins blended into the helmet, flush oval ear panels with a blue
 *                light ring (no logo on the ears), fuller chest, sturdier legs and feet.
 * 'option-c-headset' — bản CHỐT 05/11/2026 (robot trên web): option-c-refined đeo tai nghe có mic — băng đầu navy
 *                có sọc xanh, cup tai vòm bo tròn (vòng vàng = đèn xi-nhan), mic trái có đầu LED sáng khi nói;
 *                đỉnh đầu trơn (không tấm LED, không vây).
 */
export type RobotStyle = 'reference' | 'brand' | 'option-c' | 'option-c-refined' | 'option-c-headset';

/**
 * Head-to-body balance. headScale shrinks the helmet (and face); legExtra / armExtra add length to the thigh+shin and
 * upper arm (boots, hands and chest decals keep their size). Everything above the hips is lifted by legExtra.
 */
export interface RobotProportions {
  headScale: number; legExtra: number; armExtra: number;
  /** Chest/hip roundness (radius multiplier; decals stay undistorted because they follow the surface). */
  torsoFullness: number;
  /** Thickness of thighs, knees, shins (and a little of the arms). */
  limbScale: number;
  /** Boot size. */
  footScale: number;
}
const BASE_PROPORTIONS = { headScale: 1, legExtra: 0, armExtra: 0, torsoFullness: 1, limbScale: 1, footScale: 1 };
export const ROBOT_PROPORTIONS: Record<RobotStyle, RobotProportions> = {
  reference: BASE_PROPORTIONS,
  brand: BASE_PROPORTIONS,
  // Head ≈ 39% of the height, like the option C artwork (was ≈ 45%).
  'option-c': { ...BASE_PROPORTIONS, headScale: .86, legExtra: .24, armExtra: .08 },
  'option-c-refined': { headScale: .86, legExtra: .2, armExtra: .08, torsoFullness: 1.1, limbScale: 1.18, footScale: 1.1 },
  'option-c-headset': { headScale: .86, legExtra: .2, armExtra: .08, torsoFullness: 1.1, limbScale: 1.18, footScale: 1.1 },
};

// Proportions measured from the mascot reference sheet (1 unit ≈ 250 px of the 1254 px front view, ground at y = 0).
const HEAD = { y: 3.44, a: 1.12, b: 1.0, c: .98, p: 2.5 };
const SCREEN = { cy: -.15, halfWidth: .99, halfHeight: .62 };
const ARM_REST = .2;
const headZ = superellipsoidZ(HEAD.a, HEAD.b, HEAD.c, HEAD.p);

/** Torso lathe profile [radius, y] from the neck down to the waist; front depth is scaled by TORSO_DEPTH. */
const TORSO_PROFILE: [number, number][] = [[0, 1.08], [.2, 1.075], [.36, 1.04], [.47, .96], [.53, .84], [.55, .7], [.54, .54], [.5, .36], [.44, .18], [.38, .06], [.3, 0], [.15, -.03], [0, -.04]];
const TORSO_DEPTH = .78;
const torsoRadius = (y: number) => {
  for (let i = 0; i < TORSO_PROFILE.length - 1; i++) {
    const [r0, y0] = TORSO_PROFILE[i], [r1, y1] = TORSO_PROFILE[i + 1];
    if (y <= y0 && y >= y1) return THREE.MathUtils.lerp(r0, r1, (y0 - y) / (y0 - y1));
  }
  return 0;
};

const FACE: Record<RobotStyle, Partial<FaceLayout>> = {
  reference: {},
  brand: { led: '#a9d4ff', glowColor: '#2f5cff', iris: ['#5aa8ff', '#2448f5', '#0b1478'] },
  'option-c': { ledStyle: true, led: '#7fd2ff', glowColor: '#1f6bff', iris: ['#4aa0ff', '#1a4fe0', '#08166a'],
    eyeR: .265, cheekX: .7, cheekY: -.3, mouthScale: 1.05 },
  'option-c-headset': { ledStyle: true, led: '#7fd2ff', glowColor: '#1f6bff', iris: ['#4aa0ff', '#1a4fe0', '#08166a'],
    eyeR: .265, cheekX: .7, cheekY: -.3, mouthScale: 1.05 },
  'option-c-refined': { ledStyle: true, led: '#7fd2ff', glowColor: '#1f6bff', iris: ['#4aa0ff', '#1a4fe0', '#08166a'],
    eyeR: .265, cheekX: .7, cheekY: -.3, mouthScale: 1.05 },
};

/**
 * Hiệp Phát robot mascot: glossy white helmet, black LED face with expressive eyes, LED trim.
 * Same public surface as the previous Robot (group/head/torso/arms/elbows/wrists/legs, wave, setGreetingPose,
 * setBlink, blinkProgress, resetPose, update) plus the expression API from MascotCharacter.
 */
export class Robot extends MascotCharacter {
  readonly head = new THREE.Group();
  readonly torso = new THREE.Group();
  readonly arms = [new THREE.Group(), new THREE.Group()];
  readonly elbows = [new THREE.Group(), new THREE.Group()];
  readonly wrists = [new THREE.Group(), new THREE.Group()];
  readonly legs = [new THREE.Group(), new THREE.Group()];
  /** Hero pose (left hand on hip, right thumbs-up), blended in while not waving. Option C starts with it on. */
  heroPose: boolean;
  private hero = 0;
  private fingers: THREE.Object3D[][] = [[], []];
  private thumbs: THREE.Object3D[] = [];
  private turnSignals: THREE.MeshBasicMaterial[] = [];
  /** Boom-mic tip LED (headset style); brightens with the mouth while talking. */
  private micLight?: THREE.MeshBasicMaterial;
  private wasWaving = false;

  readonly proportions: RobotProportions;

  constructor(readonly style: RobotStyle = 'reference', proportions: Partial<RobotProportions> = {}) {
    super({ ...SCREEN, ...FACE[style] });
    const P = this.proportions = { ...ROBOT_PROPORTIONS[style], ...proportions };
    const lift = P.legExtra, legHalf = P.legExtra / 2;
    /** Shin profile y (originally -.45 … -.88) stretched by half the extra leg length, below the lengthened thigh. */
    const shinY = (y: number) => -.45 - legHalf + (y + .45) * (.43 + legHalf) / .43;
    const k = this.kit, m = brandMaterials();
    const brand = style !== 'reference', optionC = style.startsWith('option-c'), headset = style === 'option-c-headset', refined = style === 'option-c-refined' || headset;
    const F = P.torsoFullness, L = P.limbScale, armL = 1 + (L - 1) * .45, torsoDepth = TORSO_DEPTH * (1 + (F - 1) * .6);
    this.heroPose = optionC;
    const shell = m.shell;
    const silver = new THREE.MeshPhysicalMaterial({ color: '#e4ecf7', roughness: .2, metalness: .1, clearcoat: 1, clearcoatRoughness: .06 });
    const joint = brand ? m.navy : m.graphite;
    const hand = brand ? shell : m.graphite;
    const sole = optionC ? m.navy : brand ? m.blue : new THREE.MeshStandardMaterial({ color: '#465062', roughness: .5, metalness: .2 });
    const slot = brand ? m.navy : new THREE.MeshStandardMaterial({ color: '#0c2350', roughness: .3, metalness: .3 });
    const led = brand ? m.ledYellow : m.ledCyan;
    const ring = brand ? m.blue : m.ledBlue;

    this.group.add(this.head, this.torso, ...this.arms, ...this.legs);

    // ---------- Head: superellipsoid helmet + LED face ----------
    // The helmet bottom stays on the neck while the head scales.
    this.head.position.y = HEAD.y - HEAD.b + lift + HEAD.b * P.headScale;
    this.head.scale.setScalar(P.headScale);
    k.mesh(this.head, superellipsoid(HEAD.a, HEAD.b, HEAD.c, HEAD.p), shell);
    // The face's glossy reflection is painted in the shader (an env-mapped layer showed a hard light-panel rectangle).
    k.mesh(this.head, surfacePatch(headZ, { ...SCREEN, lift: .012 }), this.controller.face.material).name = 'face';

    const topY = .8, topZ = headZ(0, topY);
    if (optionC) {
      // Navy LED panel on the crown, tipped back to follow the helmet (the headset version keeps a clean crown).
      if (!headset) {
        const panel = k.place(this.head, new THREE.Group(), [0, .86, .4], [-.62, 0, 0]);
        k.box(panel, [.64, .14, .36], .065, m.navy);
        k.box(panel, [.46, .05, .22], .025, m.ledCyan, [0, .065, .03]);
      }
      if (refined && !headset) {
        // Low rounded fins grown out of the helmet: a soft white lens half-sunk into the shell, with a slim yellow crest.
        for (const side of [-1, 1]) {
          const fin = k.place(this.head, new THREE.Group(), [side * .84, .56, -.2], [-.2, 0, side * -.9]);
          k.sphere(fin, 1, shell, [0, .02, 0], [.11, .2, .38]);
          // Yellow crest on the outer face of the ridge (local +x faces out and up after the tilt).
          k.sphere(fin, 1, m.yellow, [.035, .08, .02], [.085, .13, .3]);
        }
      } else if (!headset) for (const side of [-1, 1]) {
        // Swept-back fins: tapered blades leaning out, yellow face towards the viewer, white back.
        const fin = k.place(this.head, new THREE.Group(), [side * .72, .74, -.12], [-.35, side * .35, side * -.7]);
        k.mesh(fin, new THREE.CylinderGeometry(.06, .2, .58, 32), shell, [0, .26, 0], undefined, [1, 1, .32]);
        k.mesh(fin, new THREE.CylinderGeometry(.05, .17, .54, 32), m.yellow, [0, .27, .035], undefined, [1, 1, .22]);
      }
    } else if (brand) {
      // "TẬP LÁI" roof sign, like the box on top of every Vietnamese driving-school car.
      const sign = k.place(this.head, new THREE.Group(), [0, .97, -.02]);
      k.cylinder(sign, .05, .12, m.navy, [-.2, -.04, 0]); k.cylinder(sign, .05, .12, m.navy, [.2, -.04, 0]);
      k.box(sign, [.78, .27, .24], .06, m.blue, [0, .14, 0]);
      const texture = labelTexture('TẬP LÁI', BRAND.blue, '#ffffff');
      const label = new THREE.MeshBasicMaterial({ map: texture, color: texture ? '#ffffff' : BRAND.blue, toneMapped: false });
      k.mesh(sign, new THREE.PlaneGeometry(.66, .19), label, [0, .14, .121]);
      k.mesh(sign, new THREE.PlaneGeometry(.66, .19), label, [0, .14, -.121], [0, Math.PI, 0]);
      k.box(sign, [.8, .035, .26], .015, m.yellow, [0, .29, 0]);
    } else {
      // Cyan LED pill set into a dark slot (a capsule only needs placing on the surface, not tilting).
      k.capsule(this.head, .07, .36, slot, [0, topY - .01, topZ - .03], [0, 0, Math.PI / 2]);
      k.capsule(this.head, .05, .32, led, [0, topY, topZ - .012], [0, 0, Math.PI / 2]);
    }

    if (headset) {
      // ---- Headset: band over the crown, rounded padded cups over the ears, boom mic on the robot's left ----
      // The headset replaces the fins: its band is the crown accent.
      const D = .1, bandZ = .08;
      /** Point on the helmet outline in the plane z = bandZ, pushed out by `out`; t runs side → crown → side. */
      const outline = (t: number, out: number) => {
        const c = Math.cos(t), sn = Math.sin(t), e = 2 / HEAD.p;
        return new THREE.Vector3((HEAD.a + out) * Math.sign(c) * Math.abs(c) ** e, (HEAD.b + out) * Math.sign(sn) * Math.abs(sn) ** e, bandZ);
      };
      const arc = (from: number, to: number, out: number) =>
        new THREE.CatmullRomCurve3(Array.from({ length: 33 }, (_, i) => outline(from + (to - from) * i / 32, out)));
      k.mesh(this.head, new THREE.TubeGeometry(arc(-.15, Math.PI + .15, D), 96, .072, 16), m.navy);
      k.mesh(this.head, new THREE.TubeGeometry(arc(.55, Math.PI - .55, D + .065), 64, .024, 10), m.blue);
      for (const side of [-1, 1]) {
        // Local +z points outwards. Rounded cup: soft cushion ring, a near-ellipsoid dome shell, blue belt round its rim,
        // yellow turn-signal ring and a blue button sitting on the curve of the dome.
        const cup = k.place(this.head, new THREE.Group(), [side * 1.0, -.17, -.05], [0, side * Math.PI / 2, 0]);
        k.torus(cup, .28, .085, m.rubber, [0, 0, .19]);
        const dome = { a: .36, b: .41, c: .21, p: 2.2, z: .24 };
        k.mesh(cup, superellipsoid(dome.a, dome.b, dome.c, dome.p), m.navy, [0, 0, dome.z]);
        k.torus(cup, .345, .032, m.blue, [0, 0, dome.z + .02]);
        const domeZ = superellipsoidZ(dome.a, dome.b, dome.c, dome.p);
        const signal = m.ledYellow.clone();
        this.turnSignals.push(signal);
        k.torus(cup, .19, .022, signal, [0, 0, dome.z + domeZ(.19, 0) - .006]);
        k.sphere(cup, .1, m.blue, [0, 0, dome.z + dome.c - .02], [1, 1.1, .45]);
      }
      // Boom mic from the left cup round to the corner of the mouth; the tip carries a small LED ring.
      const boom = new THREE.CatmullRomCurve3([[1.22, -.32, .16], [1.14, -.6, .46], [.86, -.76, .74], [.52, -.74, .86]].map(v => new THREE.Vector3(...v)));
      k.mesh(this.head, new THREE.TubeGeometry(boom, 48, .028, 10), m.navy);
      const tip = k.place(this.head, new THREE.Group(), boom.getPoint(1).toArray());
      tip.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), boom.getTangent(1));
      k.capsule(tip, .055, .1, m.rubber, [0, .05, 0]);
      this.micLight = m.ledBlue.clone();
      k.torus(tip, .058, .013, this.micLight, [0, .01, 0], [Math.PI / 2, 0, 0]);
    } else if (refined) {
      // Direction B — integrated ears: a soft oval lens grown out of the helmet side (reads as a gentle bulge from the
      // front), with flush layers on its surface: navy rim, thin blue light ring, pearl panel, small yellow turn-signal pill.
      const lens = { width: .34, height: .41, depth: .16, p: 2.4 };
      const lensZ = superellipsoidZ(lens.width, lens.height, lens.depth, lens.p);
      const pearl = new THREE.MeshPhysicalMaterial({ color: '#eef3fb', roughness: .18, clearcoat: 1, clearcoatRoughness: .05 });
      for (const side of [-1, 1]) {
        // Local +z points outwards (rotated a quarter turn), local x runs front/back along the head.
        const ear = k.place(this.head, new THREE.Group(), [side * 1.0, -.17, -.05], [0, side * Math.PI / 2, 0]);
        k.mesh(ear, superellipsoid(lens.width, lens.height, lens.depth, lens.p), shell);
        const panel = (halfWidth: number, halfHeight: number, lift: number, material: THREE.Material) =>
          k.mesh(ear, surfacePatch(lensZ, { cy: 0, halfWidth, halfHeight, lift, exponent: 2.3 }), material);
        panel(.27, .33, .006, m.navy);
        panel(.245, .305, .01, m.ledBlue);
        panel(.222, .282, .014, pearl);
        const signal = m.ledYellow.clone();
        this.turnSignals.push(signal);
        panel(.035, .11, .019, signal);
      }
    } else for (const side of [-1, 1]) {
      // Ear pods angled ~30° forward so the ring reads from the front. Option C: navy ring, glowing yellow ring, logo cap.
      const ear = k.place(this.head, new THREE.Group(), [side * 1.0, -.18, .04], [0, side * (Math.PI / 2 - .5), 0]);
      k.cylinder(ear, .44, .26, shell, [0, 0, 0], [Math.PI / 2, 0, 0]);
      k.cylinder(ear, .36, .04, slot, [0, 0, .125], [Math.PI / 2, 0, 0]);
      k.torus(ear, optionC ? .35 : .315, .045, optionC ? m.navy : ring, [0, 0, .14]);
      const signal = (brand ? m.ledYellow : m.ledCyan).clone();
      this.turnSignals.push(signal);
      k.torus(ear, optionC ? .29 : .315, optionC ? .03 : .017, signal, [0, 0, .168]);
      k.sphere(ear, optionC ? .27 : .255, brand ? m.navy : silver, [0, 0, .13], [1, 1, .32]);
      if (optionC) k.place(ear, logoDisc(.19, .62), [0, 0, .218]);
    }

    // ---------- Neck ----------
    k.cylinder(this.group, .21, .2, joint, [0, 2.43 + lift, 0]);
    k.torus(this.group, .205, .024, m.ledBlue, [0, 2.46 + lift, 0], [Math.PI / 2, 0, 0]);

    // ---------- Torso: egg-shaped chest with the Hiệp Phát badge and LED slits ----------
    this.torso.position.y = 1.3 + lift;
    const torsoR = (y: number) => torsoRadius(y) * F;
    k.lathe(this.torso, TORSO_PROFILE.map(([r, y]) => [r * F, y] as [number, number]), shell, [0, 0, 0], [1, 1, torsoDepth]);
    /** Point on the torso front plus the yaw/pitch that lays a decal on the surface. */
    const onChest = (x: number, y: number) => {
      const r = torsoR(y), z = torsoDepth * Math.sqrt(Math.max(0, r * r - x * x));
      const slope = (torsoR(y + .02) - torsoR(y - .02)) / .04;
      return { z, yaw: Math.atan2(x / (r * r), z / (torsoDepth * r) ** 2), pitch: Math.atan(slope * torsoDepth) };
    };
    {
      const y = .68, { z } = onChest(0, y);
      k.cylinder(this.torso, .245, .1, optionC ? m.navy : brand ? m.blue : m.ledBlue, [0, y, z - .03], [Math.PI / 2, 0, 0]);
      k.cylinder(this.torso, .225, .02, slot, [0, y, z + .021], [Math.PI / 2, 0, 0]);
      k.torus(this.torso, .222, optionC ? .02 : .016, optionC ? m.ledCyan : led, [0, y, z + .022]);
      k.place(this.torso, optionC ? logoDisc(.2, .62) : logoDisc(.2), [0, y, z + .033]).name = 'chest-logo';
    }
    {
      const y = .93, { z, pitch } = onChest(0, y);
      k.capsule(this.torso, .026, .13, optionC ? m.ledBlue : led, [0, y, z - .006], [pitch, 0, Math.PI / 2]);
    }
    for (const side of [-1, 1]) {
      const x = side * .37 * F, y = .8, { z, yaw } = onChest(x, y);
      k.capsule(this.torso, .022, .1, led, [x, y, z - .008], [0, yaw, side * .55]);
    }
    for (const side of [-1, 1]) k.sphere(this.torso, .14 * armL, joint, [side * .53 * F, .84, 0]);
    if (optionC) {
      // Navy belt with a blue LED bar, visible between chest and hips.
      k.cylinder(this.group, .41 * F, .17, m.navy, [0, 1.3 + lift, 0], undefined, .37 * F).scale.z = .8 * (1 + (F - 1) * .6);
      k.capsule(this.group, .028, .22, m.ledBlue, [0, 1.31 + lift, .34 * F * (1 + (F - 1) * .6)], [0, 0, Math.PI / 2]);
    } else k.cylinder(this.group, .25, .14, joint, [0, 1.27 + lift, 0]);
    k.sphere(this.group, .37, shell, [0, 1.19 + lift, 0], [F, .6, .82 * F]);

    // ---------- Arms ----------
    for (let i = 0; i < 2; i++) {
      const side = i === 0 ? -1 : 1;
      const arm = this.arms[i]; arm.position.set(side * (.71 + .55 * (F - 1)), 2.12 + lift, 0); arm.rotation.z = side * ARM_REST;
      k.sphere(arm, .21 * armL, shell, [0, 0, 0], [1, 1.08, 1]);
      if (optionC) k.torus(arm, .215, .03, m.yellow, [0, .01, 0], [0, Math.PI / 2, -side * .5], Math.PI * .75);
      k.capsule(arm, .024, .09, led, [side * .2, -.05, 0]);
      k.capsule(arm, .125 * armL, .05 + P.armExtra, shell, [0, -.2 - P.armExtra / 2, 0]);
      const elbow = this.elbows[i]; elbow.position.y = -.34 - P.armExtra; arm.add(elbow);
      k.sphere(elbow, .115, joint);
      k.lathe(elbow, ([[0, -.02], [.11, -.03], [.13, -.08], [.155, -.25], [.165, -.37], [.15, -.44], [.1, -.475], [0, -.485]] as [number, number][]).map(([r, y]) => [r * armL, y] as [number, number]), shell);
      if (brand) k.torus(elbow, .158, .03, optionC ? m.navy : m.blue, [0, -.42, 0], [Math.PI / 2, 0, 0]);
      k.capsule(elbow, .024, .1, led, [side * .158, -.27, 0], [0, 0, -side * .06]);
      const wrist = this.wrists[i]; wrist.position.y = -.5; elbow.add(wrist);
      k.sphere(wrist, .08, joint);
      k.box(wrist, [.24, .2, .13], .06, hand, [0, -.12, 0]);
      // Palm faces local -Z; the greeting rolls the forearm to show it.
      k.box(wrist, [.17, .14, .02], .009, brand ? m.navy : sole, [0, -.12, -.062]).name = 'palm';
      for (let f = 0; f < 4; f++) {
        // Each finger hinges at its knuckle so the hero pose can curl it into a fist.
        const knuckle = k.place(wrist, new THREE.Group(), [(f - 1.5) * .056, -.21, -.015], [.32, 0, (f - 1.5) * -.07]);
        k.capsule(knuckle, .032, .085, hand, [0, -.06, 0]);
        this.fingers[i].push(knuckle);
      }
      const thumb = k.place(wrist, new THREE.Group(), [-side * .11, -.08, .02], [0, 0, -side * .7]);
      k.capsule(thumb, .038, .09, hand, [0, -.065, 0]);
      this.thumbs.push(thumb);
    }

    // ---------- Legs: slightly splayed, the feet stay flat ----------
    for (let i = 0; i < 2; i++) {
      const side = i === 0 ? -1 : 1;
      const leg = this.legs[i]; leg.position.set(side * .26 * (1 + (L - 1) * .55), 1.14 + lift, 0); leg.rotation.z = side * .16;
      k.sphere(leg, .13 * L, joint);
      k.capsule(leg, .165 * L, .14 + legHalf, shell, [0, -.25 - legHalf / 2, 0]);
      k.sphere(leg, .125 * L, joint, [0, -.43 - legHalf, 0]);
      k.lathe(leg, ([[0, -.45], [.13, -.46], [.15, -.55], [.19, -.72], [.215, -.82], [.17, -.87], [0, -.88]] as [number, number][]).map(([r, y]) => [r * L, shinY(y)] as [number, number]), shell);
      if (optionC) {
        k.torus(leg, .172 * L, .028, m.yellow, [0, shinY(-.6), 0], [Math.PI / 2, 0, 0]);
        k.torus(leg, .2 * L, .02, m.ledBlue, [0, shinY(-.76), 0], [Math.PI / 2, 0, 0]);
      }
      // Bigger boots grow upwards from the sole so they stay on the ground.
      const foot = k.place(leg, new THREE.Group(), [0, -.92 - P.legExtra + .25 * (P.footScale - 1), 0], [0, 0, -side * .16], [P.footScale, P.footScale, P.footScale]);
      k.sphere(foot, 1, shell, [0, -.02, .1], [.32, .24, .46]);
      k.sphere(foot, 1, sole, [0, -.17, .1], [.33, .08, .47]);
      k.capsule(foot, .028, .22, optionC ? m.yellow : led, [0, .1, .49], [0, 0, Math.PI / 2]);
      if (optionC) k.capsule(foot, .02, .3, m.ledBlue, [0, -.13, .5], [0, 0, Math.PI / 2]);
    }
  }

  setGreetingPose(amount: number, time = 0, elbowAmount = amount) {
    // Vẫy từ khuỷu tay 2–3 nhịp nhanh, biên độ giảm dần; vai đung đưa trễ nhịp theo cẳng tay. Cổ tay khóa (lòng bàn tay hướng ra).
    const window = THREE.MathUtils.smootherstep(time, .5, .68) * (1 - THREE.MathUtils.smootherstep(time, 1.5, 1.68));
    const decay = 1 - THREE.MathUtils.clamp((time - .55) / 1.1, 0, 1) * .35;
    const phase = (time - .55) * Math.PI * 2 * 2.2;
    const sway = Math.sin(phase) * window * decay, shoulderSway = Math.sin(phase - .7) * window * decay;
    this.arms[1].rotation.set(-amount * .24, 0, ARM_REST + amount * (.98 + shoulderSway * .06));
    this.elbows[1].rotation.set(-elbowAmount * .08, elbowAmount * Math.PI, elbowAmount * (1.57 + sway * .28), 'ZXY');
    this.wrists[1].rotation.set(0, 0, 0);
  }

  protected pose(p: MascotPose, time: number, walking: boolean) {
    this.torso.scale.set(1 + p.breathe * .006, 1 + p.breathe * .012, 1 + p.breathe * .006);
    this.group.position.y = p.bodyY;
    this.group.rotation.z = p.lean;
    this.head.rotation.set(p.headPitch, p.headYaw, p.headTilt);

    // Turn signals: the ear on the side it glances to blinks amber (brand) / brightens (reference).
    const gazeX = this.controller.gaze.x;
    this.micLight?.color.set(BRAND.ledBlue).multiplyScalar(p.expression === 'talking' && !p.reduced ? .6 + p.talk * 1.1 : .7);
    this.turnSignals.forEach((material, i) => {
      const toward = (i === 0 ? -gazeX : gazeX) > .55;
      const on = toward && !p.reduced ? (Math.sin(time * Math.PI * 3) > 0 ? 1.35 : .25) : 1;
      material.color.set(this.style !== 'reference' ? BRAND.ledYellow : '#46dcff').multiplyScalar(on);
    });

    // Hero pose blends in/out smoothly; the wave always wins on the right arm.
    const heroTarget = this.heroPose && !walking ? 1 : 0;
    this.hero += (heroTarget - this.hero) * .12;
    const h = this.hero, armSway = p.reduced ? 0 : p.breathe * .025;
    if (p.waveTime >= 0) { this.setGreetingPose(p.waveAmount, p.waveTime, p.waveElbow); this.wasWaving = true; }
    else {
      if (this.wasWaving) { this.setGreetingPose(0); this.wasWaving = false; }
      // Right arm: forearm up in front of the chest, fist with the thumb up.
      this.arms[1].rotation.set(-.42 * h, 0, ARM_REST + armSway - .12 * h);
      this.elbows[1].rotation.set(-2.05 * h, 0, -.25 * h);
      this.wrists[1].rotation.set(.35 * h, 0, 0);
    }
    // Left arm: elbow out, hand resting on the hip.
    this.arms[0].rotation.set(.12 * h, 0, -ARM_REST - armSway - .58 * h);
    this.elbows[0].rotation.set(-.2 * h, 0, 1.4 * h);
    // Fists: fingers curl towards the palm (-Z); the right thumb straightens along the hand to point up.
    this.fingers.forEach((list, i) => {
      const curl = i === 1 && this.isWaving ? 0 : h;
      list.forEach(knuckle => { knuckle.rotation.x = .32 + 1.35 * curl; });
    });
    const thumbsUp = this.isWaving ? 0 : h;
    this.thumbs[1].position.set(-.11 + .05 * thumbsUp, -.08 - .14 * thumbsUp, .02 - .07 * thumbsUp);
    this.thumbs[1].rotation.set(0, 0, .7 * (1 - thumbsUp));

    const stride = walking && !p.reduced ? Math.sin(time * 8) * .42 : 0;
    this.legs.forEach((leg, i) => leg.rotation.x = THREE.MathUtils.lerp(leg.rotation.x, i === 0 ? stride : -stride, .2));
    if (walking && !p.reduced) {
      this.arms[0].rotation.x = -stride * .75;
      if (!this.isWaving) this.arms[1].rotation.x = stride * .75;
      this.group.position.y = Math.abs(Math.sin(time * 8)) * .055;
    }
  }

  resetPose() {
    super.resetPose();
    this.wasWaving = false; this.hero = 0; this.group.position.y = 0; this.group.rotation.set(0, 0, 0); this.torso.scale.set(1, 1, 1);
    this.head.rotation.set(0, 0, 0); this.legs.forEach(leg => leg.rotation.x = 0);
    this.arms.forEach((arm, i) => arm.rotation.set(0, 0, i === 0 ? -ARM_REST : ARM_REST));
    this.elbows.forEach(joint => joint.rotation.set(0, 0, 0)); this.wrists.forEach(joint => joint.rotation.set(0, 0, 0));
  }
}
