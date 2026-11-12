import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { MascotExpressionController, type Expression, type MascotPose } from './mascot-expression-controller';
import type { FaceLayout } from './mascot-face-material';
import { HIEPPHAT_CHEST_LOGO } from './hiepphat-chest-logo-data-uri';

/** Hiệp Phát brand colours (from the logo) plus the shared neutrals used by every concept. */
export const BRAND = {
  blue: '#2b26fb', navy: '#1b2170', yellow: '#ffd51c', red: '#ea1e24',
  white: '#f6f8fc', graphite: '#4a5263', ledBlue: '#3d6bff', ledYellow: '#ffd23a',
};

type Vec = number[];
/** Small helpers so every concept builds meshes the same way (position / rotation / scale arrays). */
export class ShapeKit {
  place<T extends THREE.Object3D>(parent: THREE.Object3D, object: T, pos: Vec = [0, 0, 0], rot: Vec = [0, 0, 0], scale?: Vec) {
    object.position.set(pos[0], pos[1], pos[2]); object.rotation.set(rot[0], rot[1], rot[2]);
    if (scale) object.scale.set(scale[0], scale[1], scale[2]);
    parent.add(object); return object;
  }
  mesh(parent: THREE.Object3D, geometry: THREE.BufferGeometry, mat: THREE.Material, pos?: Vec, rot?: Vec, scale?: Vec) {
    return this.place(parent, new THREE.Mesh(geometry, mat), pos, rot, scale);
  }
  sphere(parent: THREE.Object3D, r: number, mat: THREE.Material, pos?: Vec, scale?: Vec) {
    return this.mesh(parent, new THREE.SphereGeometry(r, 40, 28), mat, pos, undefined, scale);
  }
  cylinder(parent: THREE.Object3D, r: number, h: number, mat: THREE.Material, pos?: Vec, rot?: Vec, rBottom = r) {
    return this.mesh(parent, new THREE.CylinderGeometry(r, rBottom, h, 48), mat, pos, rot);
  }
  capsule(parent: THREE.Object3D, r: number, len: number, mat: THREE.Material, pos?: Vec, rot?: Vec) {
    return this.mesh(parent, new THREE.CapsuleGeometry(r, len, 8, 20), mat, pos, rot);
  }
  torus(parent: THREE.Object3D, r: number, tube: number, mat: THREE.Material, pos?: Vec, rot?: Vec, arc = Math.PI * 2) {
    return this.mesh(parent, new THREE.TorusGeometry(r, tube, 14, 64, arc), mat, pos, rot);
  }
  box(parent: THREE.Object3D, size: Vec, radius: number, mat: THREE.Material, pos?: Vec, rot?: Vec) {
    return this.mesh(parent, new RoundedBoxGeometry(size[0], size[1], size[2], 4, radius), mat, pos, rot);
  }
  /** Profile written top → bottom as [radius, y]; LatheGeometry needs bottom → top for outward-facing triangles. */
  lathe(parent: THREE.Object3D, profile: [number, number][], mat: THREE.Material, pos?: Vec, scale?: Vec) {
    const points = profile.map(([r, y]) => new THREE.Vector2(r, y)).reverse();
    return this.mesh(parent, new THREE.LatheGeometry(points, 56), mat, pos, undefined, scale);
  }
}

/** Superellipsoid (exponent p) with half sizes a, b, c: rounder than a box, flatter than a sphere. */
export function superellipsoid(a: number, b: number, c: number, p: number, widthSegments = 80, heightSegments = 56) {
  const geometry = new THREE.SphereGeometry(1, widthSegments, heightSegments);
  const pos = geometry.attributes.position;
  const round = (v: number) => Math.sign(v) * Math.abs(v) ** (2 / p);
  for (let i = 0; i < pos.count; i++) pos.setXYZ(i, a * round(pos.getX(i)), b * round(pos.getY(i)), c * round(pos.getZ(i)));
  geometry.computeVertexNormals();
  return geometry;
}
/** Front z of that superellipsoid at (x, y). */
export const superellipsoidZ = (a: number, b: number, c: number, p: number) => (x: number, y: number) =>
  c * Math.max(0, 1 - Math.abs(x / a) ** p - Math.abs(y / b) ** p) ** (1 / p);

/**
 * A face patch that hugs a surface (z = surfaceZ(x, y)), outline |x|^n + |y|^n = 1 (n = exponent, default 4 = rounded
 * rectangle, 2 = ellipse), UVs 0…1 for the face shader. cx/cy is the patch centre in the parent's space, lift raises it off the surface.
 */
export function surfacePatch(surfaceZ: (x: number, y: number) => number, o: { cx?: number; cy: number; halfWidth: number; halfHeight: number; lift: number; exponent?: number }) {
  const cx = o.cx ?? 0, segments = 96, rings = 18, power = 2 / (o.exponent ?? 4);
  const vertices = [cx, o.cy, surfaceZ(cx, o.cy) + o.lift], uvs = [.5, .5], indices: number[] = [];
  for (let r = 1; r <= rings; r++) for (let i = 0; i < segments; i++) {
    const angle = i / segments * Math.PI * 2, k = r / rings;
    const nx = k * Math.sign(Math.cos(angle)) * Math.abs(Math.cos(angle)) ** power;
    const ny = k * Math.sign(Math.sin(angle)) * Math.abs(Math.sin(angle)) ** power;
    const x = cx + nx * o.halfWidth, y = o.cy + ny * o.halfHeight;
    vertices.push(x, y, surfaceZ(x, y) + o.lift); uvs.push(.5 + nx * .5, .5 + ny * .5);
    const current = 1 + (r - 1) * segments + i, next = 1 + (r - 1) * segments + (i + 1) % segments;
    if (r === 1) indices.push(0, current, next);
    else indices.push(current - segments, current, next, current - segments, next, next - segments);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices); geometry.computeVertexNormals();
  return geometry;
}

/** Shared materials: glossy white shell, LEDs that skip tone mapping so they stay saturated without bloom. */
export function brandMaterials() {
  return {
    shell: new THREE.MeshPhysicalMaterial({ color: BRAND.white, roughness: .24, clearcoat: 1, clearcoatRoughness: .08 }),
    blue: new THREE.MeshPhysicalMaterial({ color: BRAND.blue, roughness: .3, clearcoat: .8, clearcoatRoughness: .15 }),
    navy: new THREE.MeshPhysicalMaterial({ color: BRAND.navy, roughness: .32, metalness: .15, clearcoat: .6 }),
    yellow: new THREE.MeshPhysicalMaterial({ color: BRAND.yellow, roughness: .3, clearcoat: .8 }),
    graphite: new THREE.MeshStandardMaterial({ color: BRAND.graphite, roughness: .36, metalness: .35 }),
    rubber: new THREE.MeshStandardMaterial({ color: '#2a2f3a', roughness: .75, metalness: .05 }),
    glass: new THREE.MeshPhysicalMaterial({ color: '#cfe3ff', roughness: .05, transmission: 0, clearcoat: 1, metalness: .1 }),
    ledBlue: new THREE.MeshBasicMaterial({ color: BRAND.ledBlue, toneMapped: false }),
    ledYellow: new THREE.MeshBasicMaterial({ color: BRAND.ledYellow, toneMapped: false }),
    ledCyan: new THREE.MeshBasicMaterial({ color: '#46dcff', toneMapped: false }),
  };
}

/** Unlit disc with the real Hiệp Phát round logo (exact brand colours). crop < 1 zooms into the centre "HP" mark. */
export function logoDisc(radius: number, crop = 1) {
  const material = new THREE.MeshBasicMaterial({ color: '#1d4fd8', toneMapped: false });
  if (typeof document !== 'undefined') {
    new THREE.TextureLoader().load(HIEPPHAT_CHEST_LOGO, texture => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.repeat.set(crop, crop); texture.offset.set((1 - crop) / 2, (1 - crop) / 2);
      material.map = texture; material.color.set('#ffffff'); material.needsUpdate = true;
    });
  }
  const mesh = new THREE.Mesh(new THREE.CircleGeometry(radius, 56), material);
  mesh.name = 'logo';
  return mesh;
}

/** Text plate texture, e.g. the "TẬP LÁI" roof sign of Vietnamese driving-school cars. */
export function labelTexture(text: string, background: string, color: string, width = 512, height = 160) {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = background; ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = color; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.font = `900 ${Math.round(height * .62)}px "Be Vietnam Pro", "Segoe UI", system-ui, sans-serif`;
  ctx.fillText(text, width / 2, height * .54, width * .9);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace; texture.anisotropy = 4;
  return texture;
}

/**
 * Base for every mascot: owns the expression controller and forwards the public API that main.ts / viewer.ts
 * and the prototype pages call. Subclasses build geometry and map MascotPose onto their joints in `pose()`.
 */
export abstract class MascotCharacter {
  readonly group = new THREE.Group();
  readonly controller: MascotExpressionController;
  protected kit = new ShapeKit();

  constructor(face: FaceLayout) { this.controller = new MascotExpressionController(face); }

  get expressionName() { return this.controller.expressionName; }
  get isWaving() { return this.controller.isWaving; }
  get blinkProgress() { return this.controller.blinkProgress; }
  setExpression(expression: Expression) { this.controller.setExpression(expression); }
  play(expression: Expression, seconds?: number) { this.controller.play(expression, seconds); }
  wave() { return this.controller.wave(); }
  hop() { this.controller.hop(); }
  tilt() { this.controller.tilt(); }
  blink() { this.controller.blink(); }
  lookAt(x: number, y: number, seconds?: number) { this.controller.lookAt(x, y, seconds); }
  setBlink(closure: number) { this.controller.setBlink(closure); }
  resetPose() { this.controller.reset(); this.pose(this.controller.update(0, 0, { x: 0, y: 0 }, true), 0, false); }

  update(dt: number, time: number, pointer: { x: number; y: number }, reducedMotion: boolean, walking = false) {
    this.pose(this.controller.update(dt, time, pointer, reducedMotion), time, walking);
  }
  protected abstract pose(pose: MascotPose, time: number, walking: boolean): void;
}
