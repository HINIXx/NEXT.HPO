import * as THREE from 'three';
import { RobotStage, fallback } from './scene';
import { createViewer } from './viewer';

/** Reuse the existing robot and viewer in a stationary homepage placement. */
export function mountHeroRobot(host: HTMLElement, welcomeVoiceUrl: string) {
  document.body.classList.add('has-ai-hero-robot');
  const companion = document.createElement('button');
  companion.id = 'hpo-robot';
  companion.type = 'button';
  companion.className = 'hpo-hero-robot';
  companion.setAttribute('aria-label', 'Gặp gỡ trợ lý AI của Hiệp Phát');
  companion.setAttribute('aria-haspopup', 'dialog');
  companion.setAttribute('aria-controls', 'hpo-robot-viewer');
  companion.setAttribute('aria-expanded', 'false');
  companion.innerHTML = fallback;

  const greeting = document.createElement('span');
  greeting.id = 'hpo-robot-greeting';
  greeting.textContent = 'Học lái xe dễ dàng hơn cùng trợ lý AI của Hiệp Phát!';
  companion.setAttribute('aria-describedby', greeting.id);

  const restoreButton = document.createElement('button');
  restoreButton.id = 'hpo-robot-restore';
  restoreButton.type = 'button';
  restoreButton.className = 'hpo-hero-robot-restore';
  restoreButton.setAttribute('aria-label', 'Hiện robot Hiệp Phát');
  restoreButton.setAttribute('aria-haspopup', 'dialog');
  restoreButton.setAttribute('aria-controls', 'hpo-robot-viewer');
  restoreButton.setAttribute('aria-expanded', 'false');
  restoreButton.textContent = 'Hiện trợ lý AI';

  let hidden = false;
  try { hidden = localStorage.getItem('hpo-robot-hidden') === 'true'; } catch { /* Optional preference. */ }
  companion.hidden = hidden;
  restoreButton.hidden = !hidden;
  host.append(companion, restoreButton);

  let stage: RobotStage | undefined;
  let frame = 0;
  let last = 0;
  let time = 0;
  let inView = false;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = new THREE.Vector2();

  const viewer = createViewer(
    companion,
    welcomeVoiceUrl,
    resume,
    () => {},
    1,
    () => {},
    restoreButton,
    () => !hidden,
    visible => {
      hidden = !visible;
      companion.hidden = hidden;
      restoreButton.hidden = visible;
      try { localStorage.setItem('hpo-robot-hidden', String(hidden)); } catch { /* Optional preference. */ }
      resume();
    },
  );

  try {
    stage = new RobotStage(companion);
    stage.onRestore = resume;
    if (!reducedMotion.matches) stage.robot.wave();
  } catch (error) {
    console.warn('Robot 3D không khả dụng; hiển thị hình thay thế.', error);
  }
  companion.append(greeting);

  function animate(now: number) {
    const dt = Math.min((now - last) / 1000, .05);
    last = now;
    time += dt;
    if (!stage?.lost && !hidden && !viewer.isOpen) {
      stage?.robot.update(dt, time, pointer, false, false);
      stage?.render();
    }
    frame = requestAnimationFrame(animate);
  }
  function resume() {
    cancelAnimationFrame(frame);
    frame = 0;
    if (document.hidden || !inView || hidden || viewer.isOpen) return;
    if (reducedMotion.matches) {
      stage?.robot.resetPose();
      stage?.render();
    } else {
      last = performance.now();
      frame = requestAnimationFrame(animate);
    }
  }
  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    resume();
  }, { threshold: .05 }).observe(host);
  document.addEventListener('visibilitychange', resume);
  reducedMotion.addEventListener('change', resume);
  companion.addEventListener('pointermove', event => {
    const rect = companion.getBoundingClientRect();
    pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1,
      1 - ((event.clientY - rect.top) / rect.height) * 2);
  });
  companion.addEventListener('pointerleave', () => pointer.set(0, 0));
  companion.addEventListener('click', () => { viewer.open(); resume(); });
  restoreButton.addEventListener('click', () => { viewer.open(); resume(); });
}
