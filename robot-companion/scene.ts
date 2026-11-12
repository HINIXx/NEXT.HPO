import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Robot } from './mascot-robot';
import type { RobotTheme } from './robot-themes';

export const fallback = `<svg class="hpo-robot-fallback" viewBox="0 0 140 200" aria-hidden="true"><g fill="none" stroke-linecap="round"><path d="M50 152v30m40-30v30M34 110l-12 34m96-34 12 34" stroke="#d5dbe5" stroke-width="19"/><path d="M50 152v30m40-30v30M34 110l-12 34m96-34 12 34" stroke="#f3f4f6" stroke-width="15"/></g><g fill="#1b2a5c"><rect x="40" y="172" width="20" height="7" rx="3.5"/><rect x="80" y="172" width="20" height="7" rx="3.5"/></g><g fill="#f3f4f6" stroke="#d5dbe5" stroke-width="2"><rect x="37" y="98" width="66" height="52" rx="22"/><rect x="18" y="20" width="104" height="80" rx="36"/></g><rect x="26" y="29" width="88" height="62" rx="25" fill="#d9a440"/><rect x="28" y="31" width="84" height="58" rx="23" fill="#03050b"/><g fill="#eef7ff"><circle cx="55" cy="58" r="8"/><circle cx="85" cy="58" r="8"/></g><g fill="#1b2a5c"><rect x="10" y="44" width="10" height="28" rx="5"/><rect x="120" y="44" width="10" height="28" rx="5"/><circle cx="34" cy="106" r="9"/><circle cx="106" cy="106" r="9"/><circle cx="70" cy="120" r="13"/></g><circle cx="70" cy="120" r="8" fill="#d6b25a"/><rect x="40" y="138" width="60" height="7" rx="3.5" fill="#d6b25a"/></svg>`;

/** A stage owns its GPU resources and resize/context listeners. */
export class RobotStage {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene = new THREE.Scene();
  readonly camera = new THREE.PerspectiveCamera(35, 1, .1, 60);
  readonly robot: Robot;
  lost = false;
  onRestore = () => {};
  private observer: ResizeObserver;
  private events = new AbortController();
  private shadow: THREE.Mesh;
  private environment: THREE.Texture;

  constructor(readonly host: HTMLElement, theme?: RobotTheme) {
    host.innerHTML = `${fallback}<canvas aria-hidden="true"></canvas>`;
    const canvas = host.querySelector('canvas')!;
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    // Neutral tone mapping keeps the brand blue from drifting to lavender.
    this.renderer.toneMapping = THREE.NeutralToneMapping;
    this.renderer.toneMappingExposure = .95;
    // Robot linh vật cao ~4.5 (kể cả băng tai nghe): khung vừa khít (lookAt giữa thân, gần hơn robot cũ)
    this.camera.position.set(0, 2.55, 8.9);
    this.camera.lookAt(0, 2.3, 0);
    // Robot linh vật Hiệp Phát bản chốt 05/11/2026: đeo tai nghe có mic, mặt LED, logo ngực. theme cũ không còn dùng.
    void theme;
    this.robot = new Robot('option-c-headset');
    // Trên web robot đứng thả tay (vẫy tay khi chào). Dáng chống hông + giơ ngón cái: đặt heroPose = true.
    this.robot.heroPose = false;
    // Soft ground contact shadow stays on the floor while the body bobs and turns.
    const shadowMaterial = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false,
      uniforms: { strength: { value: .4 } },
      vertexShader: `varying vec2 shadowUv; void main() { shadowUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
      fragmentShader: `varying vec2 shadowUv; uniform float strength; void main() { float r=length((shadowUv-.5)*2.0); float alpha=pow(1.0-smoothstep(0.0,1.0,r),1.3)*strength; gl_FragColor=vec4(.06,.11,.25,alpha); }`,
    });
    this.shadow = new THREE.Mesh(new THREE.PlaneGeometry(2.55,1.85),shadowMaterial);
    this.shadow.rotation.x=-Math.PI/2;
    this.shadow.position.set(.10,-.015,.10);
    this.scene.add(this.shadow);
    // Soft studio reflections keep the glossy white shell white instead of grey.
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.environment = pmrem.fromScene(new RoomEnvironment(), .04).texture;
    pmrem.dispose();
    this.scene.environment = this.environment;
    this.scene.environmentIntensity = .9;
    this.scene.add(this.robot.group, new THREE.HemisphereLight('#eef6ff', '#8a9bb5', 1.4));
    const key = new THREE.DirectionalLight('#fff6ea', 2.6);
    key.position.set(-3, 7, 5);
    const rim = new THREE.DirectionalLight('#8fbaff', 2.2);
    rim.position.set(4, 4, -3);
    this.scene.add(key, rim);
    this.observer = new ResizeObserver(() => this.resize());
    this.observer.observe(host);
    canvas.addEventListener('webglcontextlost', event => {
      event.preventDefault();
      this.lost = true;
      host.classList.remove('is-ready');
    }, { signal: this.events.signal });
    canvas.addEventListener('webglcontextrestored', () => {
      this.lost = false;
      this.resize();
      host.classList.add('is-ready');
      this.onRestore();
    }, { signal: this.events.signal });
    this.resize();
    host.classList.add('is-ready');
  }

  resize() {
    const width = this.host.clientWidth, height = this.host.clientHeight;
    if (!width || !height) return;
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.render();
  }

  render() {
    const lift = Math.max(0,this.robot.group.position.y);
    this.shadow.scale.setScalar(1+lift*2);
    (this.shadow.material as THREE.ShaderMaterial).uniforms.strength.value=.4-lift*.6;
    if (!this.lost) this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.events.abort();
    this.observer.disconnect();
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    this.scene.traverse(object => {
      if (object instanceof THREE.Mesh) {
        geometries.add(object.geometry);
        (Array.isArray(object.material) ? object.material : [object.material]).forEach(material => materials.add(material));
      }
    });
    geometries.forEach(geometry => geometry.dispose());
    materials.forEach(material => {
      Object.values(material).forEach(value => { if (value instanceof THREE.Texture) value.dispose(); });
      material.dispose();
    });
    this.environment.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.host.classList.remove('is-ready');
    this.host.innerHTML = fallback;
  }
}
