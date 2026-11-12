import * as THREE from 'three';
import { EyeMotion } from './eye-motion';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { HIEPPHAT_CHEST_LOGO } from './hiepphat-chest-logo-data-uri';
import { DEFAULT_ROBOT_THEME, type RobotTheme } from './robot-themes';

export type Expression = 'happy' | 'neutral' | 'thinking';

/** Procedural model; colours, materials, eyes and LED trim come from a RobotTheme (default: Navy & Gold). Public methods can be called by a future chat controller. */
export class Robot {
  readonly group = new THREE.Group();
  readonly head = new THREE.Group();
  readonly torso = new THREE.Group();
  readonly arms = [new THREE.Group(), new THREE.Group()];
  readonly elbows = [new THREE.Group(), new THREE.Group()];
  readonly wrists = [new THREE.Group(), new THREE.Group()];
  readonly legs = [new THREE.Group(), new THREE.Group()];
  private eyes: THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>[] = [];
  private eyeMotion = new EyeMotion();
  private expression: Expression = 'happy';
  private waveTime = -1;
  // Materials come from the theme (robot-themes.ts); the default theme matches the 'Trợ lý ảo AI' artwork.
  private shell!: THREE.MeshPhysicalMaterial;
  private accent!: THREE.MeshPhysicalMaterial;
  private accentSoft!: THREE.MeshPhysicalMaterial;
  private jointMat!: THREE.MeshStandardMaterial;

  constructor(readonly theme: RobotTheme = DEFAULT_ROBOT_THEME) {
    this.shell = new THREE.MeshPhysicalMaterial({ ...theme.shell, clearcoatRoughness: .12 });
    this.accent = new THREE.MeshPhysicalMaterial({ ...theme.accent, clearcoat: .7, clearcoatRoughness: .25 });
    this.accentSoft = new THREE.MeshPhysicalMaterial({ color: theme.accentSoft, metalness: .05, roughness: .35, clearcoat: .5 });
    this.jointMat = new THREE.MeshStandardMaterial(theme.joint);
    const box = (parent: THREE.Object3D, size: number[], pos: number[], mat: THREE.Material = this.shell, radius = .1) => {
      const mesh = new THREE.Mesh(new RoundedBoxGeometry(size[0], size[1], size[2], 5, radius), mat);
      mesh.position.set(pos[0], pos[1], pos[2]); mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
    };
    const sphere = (parent: THREE.Object3D, radius: number, pos: number[], mat: THREE.Material = this.jointMat) => {
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 32, 20), mat);
      mesh.position.set(pos[0], pos[1], pos[2]); mesh.castShadow = true; parent.add(mesh); return mesh;
    };
    const cylinder = (parent: THREE.Object3D, radius: number, depth: number, pos: number[], mat: THREE.Material = this.jointMat) => {
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, depth, 40), mat);
      mesh.position.set(pos[0], pos[1], pos[2]); mesh.castShadow = true; parent.add(mesh); return mesh;
    };
    /** Vertical capsule centred at pos; length is the straight part between the caps. */
    const capsule = (parent: THREE.Object3D, radius: number, length: number, pos: number[], mat: THREE.Material = this.shell) => {
      const mesh = new THREE.Mesh(new THREE.CapsuleGeometry(radius, length, 8, 24), mat);
      mesh.position.set(pos[0], pos[1], pos[2]); mesh.castShadow = true; parent.add(mesh); return mesh;
    };
    this.group.add(this.head, this.torso, ...this.arms, ...this.legs);
    this.group.scale.z = 1.18;
    this.torso.scale.z = 1.2;

    // ---- Head: big rounded helmet (≈42% of height) keeps the cute proportion ----
    this.head.position.y = 3.51;
    const shellGeometry = new THREE.SphereGeometry(1, 64, 40);
    const shellPositions = shellGeometry.attributes.position;
    const rounded = (value: number) => Math.sign(value) * Math.abs(value) ** (2 / 2.4);
    for (let i = 0; i < shellPositions.count; i++) {
      shellPositions.setXYZ(i, rounded(shellPositions.getX(i)), .91 * rounded(shellPositions.getY(i)), .84 * rounded(shellPositions.getZ(i)));
    }
    shellGeometry.computeVertexNormals();
    const helmet = new THREE.Mesh(shellGeometry, this.shell); this.head.add(helmet);
    helmet.castShadow = true;
    // Thin curved patches follow the helmet surface: no stacked protruding boxes.
    const faceZ = (x: number, y: number) => .84 * Math.max(0, 1 - Math.abs(x) ** 2.4 - Math.abs(y / .91) ** 2.4) ** (1 / 2.4);
    const facePatch = (width: number, height: number, lift: number, material: THREE.Material, centerY = -.07, centerX = 0) => {
      const vertices: number[] = [centerX, centerY, faceZ(centerX, centerY) + lift];
      const indices: number[] = [];
      const segments = 64, rings = 12;
      for (let r = 1; r <= rings; r++) for (let i = 0; i < segments; i++) {
        const angle = i / segments * Math.PI * 2;
        const x = centerX + width * .5 * r / rings * Math.sign(Math.cos(angle)) * Math.abs(Math.cos(angle)) ** .5;
        const y = height * .5 * r / rings * Math.sign(Math.sin(angle)) * Math.abs(Math.sin(angle)) ** .5 + centerY;
        vertices.push(x, y, faceZ(x, y) + lift);
        const current = 1 + (r - 1) * segments + i, next = 1 + (r - 1) * segments + (i + 1) % segments;
        if (r === 1) indices.push(0, current, next);
        else { const previous = current - segments, previousNext = next - segments; indices.push(previous, current, next, previous, next, previousNext); }
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      geometry.setIndex(indices); geometry.computeVertexNormals();
      const mesh = new THREE.Mesh(geometry, material); this.head.add(mesh); return mesh;
    };
    if (theme.trim) {
      // Thin glowing LED frame just outside the screen.
      facePatch(1.6, 1.18, .009, new THREE.MeshStandardMaterial({ color: theme.trim, emissive: theme.trim, emissiveIntensity: theme.trimIntensity ?? 1.4, toneMapped: false }));
    }
    const visor = new THREE.MeshPhysicalMaterial({ color: theme.visor, metalness: .1, roughness: .15, clearcoat: 1, clearcoatRoughness: .04 });
    facePatch(1.52, 1.1, .012, visor);

    for (const side of [-1, 1]) {
      // Glowing LED eyes; the shader closes vertically on the curved face without moving the eye width.
      const eyeX = side * theme.eyes.spacing, eyeY = -.03;
      const geometry = new THREE.PlaneGeometry(2.4, 2.4, 24, 24);
      const positions = geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i) * theme.eyes.size[0], y = positions.getY(i) * theme.eyes.size[1];
        positions.setXYZ(i, x, y, faceZ(eyeX + x, eyeY + y) - faceZ(eyeX, eyeY) + .024);
      }
      geometry.computeVertexNormals();
      const eyeMaterial = new THREE.ShaderMaterial({
        toneMapped: false, transparent: true, depthWrite: false,
        uniforms: {
          closure: { value: 0 },
          gaze: { value: this.eyeMotion.gaze },
          core: { value: new THREE.Color(theme.eyes.core) },
          led: { value: new THREE.Color(theme.eyes.led) },
          deep: { value: new THREE.Color(theme.eyes.deep) },
        },
        vertexShader: `varying vec2 eyeUv; void main(){ eyeUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
        fragmentShader: `
          varying vec2 eyeUv;
          uniform float closure;
          uniform vec2 gaze;
          uniform vec3 core, led, deep;
          void main(){
            // Soft pill-shaped screen eyes; the whole shape drifts with the gaze.
            vec2 p=(eyeUv*2.0-1.0)*1.2-gaze*.9;
            float height=mix(1.0,.08,closure);
            float curve=closure*.18*(1.0-p.x*p.x);
            vec2 shape=vec2(p.x,(p.y+curve)/height);
            float edge=length(shape);
            float aa=max(fwidth(edge),.002);
            float fill=1.0-smoothstep(1.0-aa,1.0+aa,edge);
            // Bright core fading to saturated blue at the rim, brighter at the top.
            vec3 color=mix(core,led,smoothstep(-.6,.2,-p.y));
            color=mix(color,deep,smoothstep(.8,1.0,edge)*.6);
            float glint=1.0-smoothstep(.1,.16,length((p-vec2(-.3,.5))*vec2(1.0,1.3)));
            color=mix(color,vec3(.92,.97,1.0),glint*.7*(1.0-closure));
            // Soft halo instead of a bloom pass.
            float outside=max(0.0,edge-1.0)*height;
            float halo=exp(-pow(outside/.07,2.0))*.25;
            halo*=1.0-smoothstep(1.05,1.18,abs(p.x));
            float alpha=max(fill,halo);
            color=mix(led,color,fill);
            if(alpha<.005) discard;
            gl_FragColor=vec4(color,alpha);
            #include <colorspace_fragment>
          }`,
      });
      const eye = new THREE.Mesh(geometry, eyeMaterial);
      eye.name = side < 0 ? 'eye-left' : 'eye-right';
      eye.position.set(eyeX, eyeY, faceZ(eyeX, eyeY));
      this.head.add(eye); this.eyes.push(eye);

      // Round sky-blue ear pods with a light-blue ring.
      const ear = cylinder(this.head, .31, .16, [side * .96, -.04, -.04], this.accent); ear.rotation.z = Math.PI / 2;
      const ring = cylinder(this.head, .23, .08, [side * 1.05, -.04, -.04], this.accentSoft); ring.rotation.z = Math.PI / 2;
      const core = cylinder(this.head, .15, .06, [side * 1.075, -.04, -.04], this.accent); core.rotation.z = Math.PI / 2;
    }
    // ---- Torso: rounded white chest, navy waist band and the Hiệp Phát badge ----
    this.torso.position.y = 2.04;
    cylinder(this.torso, .16, .32, [0, .56, 0], this.jointMat);
    box(this.torso, [1.14, .96, .74], [0, 0, 0], this.shell, .35);
    box(this.torso, [1.0, .13, .66], [0, -.38, 0], new THREE.MeshStandardMaterial({ color: theme.belt, roughness: .4, metalness: .2 }), .06);
    const badgeRing = cylinder(this.torso, .3, .04, [0, .07, .365], this.accent); badgeRing.rotation.x = Math.PI / 2;
    // Unlit + no tone mapping so the logo keeps its exact brand colours.
    const logoMaterial = new THREE.MeshBasicMaterial({ color: '#2b26fb', toneMapped: false });
    if (typeof document !== 'undefined') {
      // Browser only: tests run in Node without an Image implementation.
      new THREE.TextureLoader().load(HIEPPHAT_CHEST_LOGO, texture => {
        texture.colorSpace = THREE.SRGBColorSpace;
        logoMaterial.map = texture; logoMaterial.color.set('#ffffff'); logoMaterial.needsUpdate = true;
      });
    }
    const logo = new THREE.Mesh(new THREE.CircleGeometry(.25, 48), logoMaterial);
    logo.position.set(0, .07, .387); this.torso.add(logo);

    // Waist and hips.
    cylinder(this.group, .26, .22, [0, 1.46, 0], this.jointMat);
    box(this.group, [.88, .34, .76], [0, 1.3, 0], this.shell, .16);
    for (const side of [-1, 1]) box(this.group, [.1, .26, .52], [side * .44, 1.3, 0], this.accent, .045);

    // Navy ball joints, as in the artwork.
    const hinge = (parent: THREE.Object3D, radius: number, y: number, z = 0, mat: THREE.Material = this.jointMat) => sphere(parent, radius, [0, y, z], mat);
    /** Sky-blue pad wrapped by a navy ring (elbows and knees). */
    const pad = (parent: THREE.Object3D, radius: number, y: number, z = 0) => {
      hinge(parent, radius, y, z, this.accent);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(radius * .98, radius * .16, 12, 40), this.jointMat);
      ring.position.set(0, y, z); ring.rotation.y = Math.PI / 2; parent.add(ring);
    };

    for (let i = 0; i < 2; i++) {
      const side = i === 0 ? -1 : 1;
      // ---- Arm: sky-blue shoulder cap, white capsules, blue elbow pad, white mitten hand ----
      const arm = this.arms[i]; arm.position.set(side * .72, 2.32, 0); arm.rotation.z = side * .13;
      hinge(arm, .23, 0, 0, this.accent);
      capsule(arm, .17, .18, [0, -.29, 0]);
      const elbow = this.elbows[i]; elbow.position.y = -.56; arm.add(elbow);
      pad(elbow, .14, 0);
      capsule(elbow, .175, .16, [0, -.25, .01]);
      cylinder(elbow, .18, .06, [0, -.36, .01], this.accent);
      const wrist = this.wrists[i]; wrist.position.y = -.505; elbow.add(wrist);
      sphere(wrist, .085, [0, 0, 0], this.jointMat);
      box(wrist, [.27, .21, .2], [0, -.14, .01], this.shell, .095);
      // Palm faces local -Z; forearm supination presents it during the greeting.
      const palm = box(wrist, [.17, .13, .025], [0, -.14, -.09], this.accentSoft, .025);
      palm.name = 'palm';
      for (let f = 0; f < 3; f++) {
        const x = (f - 1) * .072;
        capsule(wrist, .036, .1, [x, -.29, .0]);
      }
      const thumb = capsule(wrist, .045, .08, [-side * .15, -.16, .07]); thumb.rotation.z = -side * .55;

      // ---- Leg: white capsules, blue knee pad with navy ring, white boot with blue cuff and navy sole ----
      const leg = this.legs[i]; leg.position.set(side * .28, 1.18, 0);
      hinge(leg, .16, 0);
      capsule(leg, .22, .08, [0, -.25, 0]);
      pad(leg, .18, -.48, .02);
      capsule(leg, .22, .14, [side * .02, -.72, 0]);
      cylinder(leg, .225, .08, [side * .02, -.88, 0], this.accent);
      box(leg, [.54, .27, .74], [side * .03, -1.0, .12], this.shell, .12);
      box(leg, [.54, .08, .74], [side * .03, -1.12, .12], this.jointMat, .035);
    }
  }

  get isWaving() { return this.waveTime >= 0; }
  wave() { if (this.isWaving) return false; this.waveTime = 0; return true; }
  /** Thời lượng một lần chào (giây): giơ tay ~0.55s → vẫy ~1.1s → hạ tay ~0.6s. */
  static readonly WAVE_SECONDS = 2.25;
  setGreetingPose(amount: number, time = 0, elbowAmount = amount) {
    // Vẫy từ khuỷu tay như người thật: 2–3 nhịp nhanh (~2.2 lần/giây), biên độ giảm dần, vai đung đưa
    // trễ nhịp theo cẳng tay (chuyển động chồng lớp). Cổ tay khóa để lòng bàn tay luôn hướng về người xem.
    const swayWindow = THREE.MathUtils.smootherstep(time, .5, .68) * (1 - THREE.MathUtils.smootherstep(time, 1.5, 1.68));
    const phase = (time - .55) * Math.PI * 2 * 2.2;
    const decay = 1 - THREE.MathUtils.clamp((time - .55) / 1.1, 0, 1) * .35;
    const sway = Math.sin(phase) * swayWindow * decay;
    const shoulderSway = Math.sin(phase - .7) * swayWindow * decay;
    this.arms[1].rotation.set(-amount * .24, 0, .13 + amount * (.98 + shoulderSway * .06));
    // Bend first, then roll around the forearm's own axis; no wrist rotation.
    this.elbows[1].rotation.set(-elbowAmount * .08, elbowAmount * Math.PI, elbowAmount * (1.57 + sway * .28), 'ZXY');
    this.wrists[1].rotation.set(0, 0, 0);
  }
  /** Chuyển động phụ khi chào: lấy đà (hạ người) → nhún lên, nghiêng đầu về phía tay vẫy, người hơi nghiêng ngược lại. */
  private greetingBody(t: number) {
    const on = THREE.MathUtils.smootherstep(t, 0, .45) * (1 - THREE.MathUtils.smootherstep(t, 1.6, 2.2));
    const dip = -Math.sin(THREE.MathUtils.clamp(t / .22, 0, 1) * Math.PI) * .035;
    const hop = Math.sin(THREE.MathUtils.clamp((t - .22) / .4, 0, 1) * Math.PI) * .05;
    this.group.position.y += dip + hop;
    this.group.rotation.z = -on * .045;
    this.head.rotation.z += on * .14 + Math.sin((t - .55) * Math.PI * 2 * 1.1) * on * .03;
    this.arms[0].rotation.z -= on * .08;
  }
  setBlink(closure: number) {
    const amount = THREE.MathUtils.clamp(closure, 0, 1);
    this.eyes.forEach(eye => { eye.material.uniforms.closure.value = amount; });
  }
  get blinkProgress() { return this.eyes[0].material.uniforms.closure.value as number; }
  // The artwork has no mouth; expressions are kept for the chat API and shown via the eyes later if needed.
  setExpression(expression: Expression) { this.expression = expression; }
  resetPose() { this.eyeMotion.reset(); this.setBlink(0); this.waveTime = -1; this.group.position.y = 0; this.group.rotation.set(0, 0, 0); this.legs.forEach(leg => leg.rotation.set(0, 0, 0)); this.head.rotation.set(0, 0, 0); this.arms.forEach((arm, i) => arm.rotation.set(0, 0, i === 0 ? -.13 : .13)); this.elbows.forEach(joint => joint.rotation.set(0, 0, 0)); this.wrists.forEach(joint => joint.rotation.set(0, 0, 0)); this.setExpression('happy'); }
  update(dt: number, time: number, pointer: THREE.Vector2, reducedMotion: boolean, walking = false) {
    const smooth = 1 - Math.exp(-dt * 5);
    this.group.position.y = reducedMotion ? 0 : Math.sin(time * 1.8) * .025;
    this.head.rotation.y = THREE.MathUtils.lerp(this.head.rotation.y, reducedMotion ? 0 : pointer.x * .16, smooth);
    this.head.rotation.x = THREE.MathUtils.lerp(this.head.rotation.x, reducedMotion ? 0 : -pointer.y * .09, smooth);
    // Small friendly head tilt while idle.
    this.head.rotation.z = reducedMotion ? 0 : Math.sin(time * .9) * .035;
    this.eyeMotion.update(dt, reducedMotion, pointer);
    this.setBlink(this.eyeMotion.blinkProgress);
    if (this.waveTime >= 0) {
      this.waveTime += dt;
      const t = this.waveTime;
      const end = Robot.WAVE_SECONDS;
      const envelope = THREE.MathUtils.smootherstep(t, 0, .58) * (1 - THREE.MathUtils.smootherstep(t, end - .6, end));
      const elbowEnvelope = THREE.MathUtils.smootherstep(t, 0, .72) * (1 - THREE.MathUtils.smootherstep(t, end - .72, end));
      this.setGreetingPose(envelope, t, elbowEnvelope);
      if (t >= end) { this.waveTime = -1; this.setGreetingPose(0); this.group.rotation.z = 0; }
    } else this.arms[1].rotation.z = .13 + (reducedMotion ? 0 : Math.sin(time * 1.8) * .025);
    this.arms[0].rotation.z = -.13 - (reducedMotion ? 0 : Math.sin(time * 1.8) * .025);
    if (this.waveTime >= 0 && !reducedMotion) this.greetingBody(this.waveTime);
    const stride = walking && !reducedMotion ? Math.sin(time * 8) * .42 : 0;
    this.legs.forEach((leg, i) => leg.rotation.x = THREE.MathUtils.lerp(leg.rotation.x, i === 0 ? stride : -stride, smooth));
    this.arms[0].rotation.x = THREE.MathUtils.lerp(this.arms[0].rotation.x, -stride * .75, smooth);
    if (!this.isWaving) this.arms[1].rotation.x = THREE.MathUtils.lerp(this.arms[1].rotation.x, stride * .75, smooth);
    if (walking && !reducedMotion) this.group.position.y = Math.abs(Math.sin(time * 8)) * .055;
  }
}
