import "./style.css";
import * as THREE from "three";
import { RobotStage, fallback } from "./scene";
import { Wander } from "./wander";
import { createViewer } from "./viewer";
import { ROBOT_HEAD_AVATAR } from "./robot-head-avatar-data-uri";
import { ROBOT_FULL_BODY_AVATAR } from "./robot-full-body-avatar-data-uri";

const GREETING_TEXT =
  "Xin chào! Tôi là trợ lý AI của Hiệp Phát. Rất vui được hỗ trợ bạn.";
// Robot đứng trên trang thì chào lặp lại: bong bóng + vẫy tay hiện GREETING_SHOW_MS,
// nghỉ GREETING_GAP_MS rồi chào tiếp. Lướt xuống (robot thu về góc) thì dừng.
const GREETING_SHOW_MS = 3500;
const GREETING_GAP_MS = 2000;

// Next.js: script được chèn động từ client island → currentScript vẫn có; dự phòng đường dẫn cố định.
const currentScriptElement =
  document.currentScript instanceof HTMLScriptElement ? document.currentScript : null;
const bundleUrl =
  currentScriptElement?.src ||
  new URL("/robot/dist/companion.js", document.baseURI).href;
const welcomeVoiceUrl = new URL("../assets/voice-tram-guillaume.mp3", bundleUrl)
  .href;

/**
 * Gắn robot vào trang hiện tại, trả về hàm gỡ sạch (listener, observer, timer, WebGL, phần tử DOM).
 * Next.js chuyển trang không tải lại → island gọi unmount rồi mount lại để robot đọc đúng bố cục trang mới
 * (trang chủ / trang con), giống V2 mỗi trang tải lại một lần.
 */
function mount(): () => void {
  if (document.getElementById("hpo-robot")) return () => {};
  const lifecycle = new AbortController();
  const { signal } = lifecycle;
  const observers: { disconnect(): void }[] = [];
  const watch = <T extends { disconnect(): void }>(observer: T) => {
    observers.push(observer);
    return observer;
  };
  let destroyed = false;
  const homeHero = document.querySelector<HTMLElement>(".hpo-digital-hero");
  // Mọi trang: robot đứng yên trên trang lúc vừa vào (chào + vẫy tay), lướt xuống thì thu về góc.
  // Chế độ đi dạo / kéo thả (Wander) chỉ còn giữ trong code, không bật.
  const stationary = true;
  const companion = document.createElement("button");
  companion.id = "hpo-robot";
  companion.type = "button";
  companion.setAttribute(
    "aria-label",
    stationary
      ? "Robot Hiệp Phát — nhấn để xem 3D và tương tác"
      : "Robot Hiệp Phát — nhấn để xem 3D, kéo hoặc dùng phím mũi tên để di chuyển",
  );
  companion.setAttribute("aria-haspopup", "dialog");
  companion.setAttribute("aria-controls", "hpo-robot-viewer");
  companion.setAttribute("aria-expanded", "false");
  companion.title = stationary
    ? "Nhấn để xem mô hình 3D và vẫy tay"
    : "Kéo để di chuyển · Ném ra ngoài khung để ẩn · Nhấn để xem 3D";
  companion.innerHTML = fallback;
  const restoreButton = document.createElement("button");
  restoreButton.id = "hpo-robot-restore";
  restoreButton.type = "button";
  restoreButton.className = "float-btn";
  restoreButton.setAttribute("aria-label", "Mở hộp thoại robot Hiệp Phát");
  restoreButton.setAttribute("aria-haspopup", "dialog");
  restoreButton.setAttribute("aria-controls", "hpo-robot-viewer");
  restoreButton.setAttribute("aria-expanded", "false");
  restoreButton.title = "Mở robot Hiệp Phát";
  // Nút robot = đầu robot 3D (ảnh render sẵn) + bong bóng chào. Bong bóng nằm trong nút
  // nên bấm vào bong bóng cũng mở hộp thoại.
  // Máy tính/máy tính bảng: đầu robot. Điện thoại: robot đủ thân đứng trên thanh nút đáy (CSS chọn ảnh).
  restoreButton.innerHTML = `<img class="hpo-robot-head" src="${ROBOT_HEAD_AVATAR}" alt="" width="64" height="64" decoding="async"><img class="hpo-robot-full" src="${ROBOT_FULL_BODY_AVATAR}" alt="" width="125" height="240" decoding="async">`;
  const dockGreeting = document.createElement("span");
  dockGreeting.id = "hpo-robot-dock-greeting";
  dockGreeting.className = "is-hidden";
  dockGreeting.textContent = GREETING_TEXT;
  restoreButton.append(dockGreeting);
  restoreButton.setAttribute("aria-describedby", dockGreeting.id);
  restoreButton.hidden = true;
  const greeting = document.createElement("span");
  greeting.id = "hpo-robot-greeting";
  greeting.textContent = GREETING_TEXT;
  companion.setAttribute("aria-describedby", greeting.id);
  document.body.append(companion, restoreButton);
  document.body.classList.add(homeHero ? "hpo-home-robot" : "hpo-page-robot");
  const dockRestoreButton = () => {
    const floats = document.querySelector<HTMLElement>(".floats");
    if (!floats) return false;
    floats.prepend(restoreButton);
    return true;
  };
  if (!dockRestoreButton()) {
    const floatObserver = watch(new MutationObserver(() => {
      if (dockRestoreButton()) floatObserver.disconnect();
    }));
    floatObserver.observe(document.body, { childList: true, subtree: true });
  }

  const position = new THREE.Vector2();
  const pointer = new THREE.Vector2();
  const wander = new Wander();
  try {
    const savedSpeed = localStorage.getItem("hpo-robot-speed");
    if (savedSpeed !== null) wander.setSpeed(Number(savedSpeed));
  } catch {
    /* Storage can be unavailable; keep the default speed. */
  }
  const media = matchMedia("(prefers-reduced-motion: reduce)");
  let stage: RobotStage | undefined;
  let frame = 0,
    last = 0,
    time = 0;
  let paused = false,
    hovered = false,
    keyboardFocused = false;
  let width = 0,
    height = 0,
    minX = 8,
    minY = 8;
  let robotHidden = false;
  let hideTimer = 0;
  let greetingWidth = 0,
    robotWidth = 0,
    viewportWidth = 0;
  let drag:
    | {
        id: number;
        x: number;
        y: number;
        offsetX: number;
        offsetY: number;
        moved: boolean;
        lastX: number;
        lastY: number;
        lastTime: number;
        velocityX: number;
        velocityY: number;
      }
    | undefined;
  let suppressClick = false;
  let greetingIdleSince: number | null = null;
  let greetingLastX = position.x,
    greetingLastY = position.y;
  let greetingMovementUntil = 0;
  // greeted = vừa chào xong một lượt; greetAgainAt = thời điểm chào lượt kế tiếp (0 = chưa hẹn).
  let greeted = false;
  let greetAgainAt = 0;
  // Chỉ chào sau khi đã thử tạo robot 3D, để vẫy tay khớp lúc bong bóng bật ra.
  let stageReady = false;
  let greetingStarted = false;
  // Robot đứng trên trang khi trang còn ở đầu (trang chủ: cả khi băng chuyền sang slide
  // "Giới thiệu công ty"); lướt xuống thì robot thu vào nút đầu robot ở góc.
  const phoneLayout = matchMedia("(max-width: 600px)");
  let docked = phoneLayout.matches;
  try {
    robotHidden = localStorage.getItem("hpo-robot-hidden") === "true";
  } catch {
    /* Storage can be unavailable; keep the default visibility. */
  }
  // Mỗi lần vào trang đều chào (bong bóng + vẫy tay); không còn giới hạn 1 lần/phiên.
  const onStage = () => !robotHidden && !docked;
  function syncDock() {
    companion.hidden = !onStage();
    restoreButton.hidden = onStage();
  }
  syncDock();
  const viewer = createViewer(
    companion,
    welcomeVoiceUrl,
    () => {
      wander.pause();
      resume();
    },
    (value) => {
      paused = value;
    },
    wander.speed,
    (value) => {
      wander.setSpeed(value);
      try {
        localStorage.setItem("hpo-robot-speed", String(wander.speed));
      } catch {
        /* Optional preference. */
      }
    },
    restoreButton,
    () => !robotHidden,
    (visible) => setRobotVisible(visible),
  );

  function setRobotVisible(visible: boolean, throwDirection?: THREE.Vector2) {
    robotHidden = !visible;
    try {
      localStorage.setItem("hpo-robot-hidden", String(robotHidden));
    } catch {
      /* Visibility remains available for this page if storage is unavailable. */
    }
    window.clearTimeout(hideTimer);
    companion.classList.remove("is-throwing-away");
    wander.pause();
    if (visible) {
      syncDock();
      if (!onStage()) return updateGreeting();
      resize();
      position.set(
        THREE.MathUtils.clamp(position.x, 0, width),
        THREE.MathUtils.clamp(position.y, 0, height),
      );
      wander.snapToEdge(position, width, height);
      place();
    } else if (throwDirection && !media.matches) {
      restoreButton.hidden = false;
      const direction = throwDirection.clone();
      if (direction.lengthSq() < 1) direction.set(1, 1);
      direction.normalize();
      const distance = Math.max(width, height, robotWidth, companion.offsetHeight) * 2;
      companion.style.setProperty(
        "--hpo-throw-to-x",
        `${position.x + minX + direction.x * distance}px`,
      );
      companion.style.setProperty(
        "--hpo-throw-to-y",
        `${position.y + minY + direction.y * distance}px`,
      );
      companion.style.setProperty(
        "--hpo-throw-rotation",
        `${THREE.MathUtils.clamp(direction.x * 32, -32, 32)}deg`,
      );
      companion.classList.add("is-throwing-away");
      hideTimer = window.setTimeout(() => {
        companion.hidden = true;
        companion.classList.remove("is-throwing-away");
      }, media.matches ? 0 : 340);
    } else {
      syncDock();
    }
    updateGreeting();
  }

  function updateGreeting(now = performance.now()) {
    const moving = position.x !== greetingLastX || position.y !== greetingLastY;
    greetingLastX = position.x;
    greetingLastY = position.y;
    if (moving) greetingMovementUntil = now + 120;
    // Hết thời gian nghỉ giữa 2 lượt chào → mở lượt mới (vẫy tay lại cùng bong bóng).
    if (greeted && greetAgainAt && now >= greetAgainAt && onStage() && !viewer.isOpen) {
      greeted = false;
      greetingStarted = false;
      greetAgainAt = 0;
    }
    const unavailable =
      !stageReady ||
      greeted ||
      moving ||
      now < greetingMovementUntil ||
      !!drag ||
      viewer.isOpen ||
      !onStage() ||
      document.hidden;
    if (unavailable) greetingIdleSince = null;
    else if (greetingIdleSince === null) greetingIdleSince = now;
    const visible =
      greetingIdleSince !== null && now - greetingIdleSince < GREETING_SHOW_MS;
    if (visible && !greetingStarted) {
      greetingStarted = true;
      // Vẫy tay đúng lúc bong bóng bật ra (giảm chuyển động: chỉ hiện bong bóng).
      if (!media.matches && stage && !stage.lost) stage.robot.wave();
    }
    if (unavailable && greetingStarted) {
      // Bị ngắt giữa lượt (mở hộp thoại, thu về góc…) → vẫn hẹn lượt sau để vòng chào không dừng hẳn.
      greeted = true;
      if (!greetAgainAt) greetAgainAt = now + GREETING_GAP_MS;
    }
    if (greetingIdleSince !== null && !visible) {
      greeted = true;
      // Chào xong trọn một lượt → hẹn lượt sau sau khoảng nghỉ.
      if (!greetAgainAt) greetAgainAt = now + GREETING_GAP_MS;
    }
    greeting.classList.toggle("is-hidden", !visible);
    if (visible) companion.setAttribute("aria-describedby", greeting.id);
    else companion.removeAttribute("aria-describedby");
  }

  // Slide "Giới thiệu công ty": vị trí robot bên trái tiêu đề, chân cao hơn câu nhấn "Đào tạo và sát hạch…",
  // bong bóng chào không đè header. null = không phải slide này; NaN = không đủ chỗ (máy tính bảng) → thu về góc.
  let lastRobotH = 198, lastBubbleH = 90;
  function companySlideTop(): number | null {
    if (!homeHero || homeHero.classList.contains("is-active")) { companion.classList.remove("is-bubble-off"); return null; }
    const banner = document.querySelector<HTMLElement>(".company-banner.is-active");
    const heading = banner?.querySelector<HTMLElement>(".company-banner-heading h2");
    const motto = banner?.querySelector<HTMLElement>(".company-banner-motto");
    if (!heading || !motto) { companion.classList.remove("is-bubble-off"); return null; }
    // đáy header đang hiện trên màn hình (thanh trên cùng có thể đã cuộn khuất)
    const headerBottom = document.getElementById("navbar")?.getBoundingClientRect().bottom || 0;
    const h = heading.getBoundingClientRect(), m = motto.getBoundingClientRect();
    // robot đang thu về góc thì không đo được kích thước → dùng số đo lần gần nhất
    if (companion.offsetHeight) lastRobotH = companion.offsetHeight;
    if (greeting.offsetHeight) lastBubbleH = greeting.offsetHeight;
    const robotH = lastRobotH, bubbleH = lastBubbleH + 8;
    // đứng thấp nhất có thể: chân robot ngay trên câu nhấn (chừa tối đa chỗ cho bong bóng phía trên, không đè header)
    void h;
    const top = m.top - robotH - 12;
    // đủ chỗ cho robot nhưng không đủ cho bong bóng (laptop 1440×900…) → robot vẫn đứng + vẫy tay, ẩn bong bóng
    companion.classList.toggle("is-bubble-off", top - bubbleH < headerBottom - 2);
    return top < headerBottom + 4 ? NaN : top;
  }
  function place() {
    if (stationary) {
      companion.style.removeProperty("transform");
      const headerHeight = (document.querySelector<HTMLElement>(".topbar")?.offsetHeight || 0) +
        (document.getElementById("navbar")?.offsetHeight || 0);
      const compact = matchMedia("(max-width: 1100px)").matches;
      const gap = innerWidth <= 600 ? 12 : 16;
      // Trang con: robot đứng ở mép phải, khoảng giữa phần màn hình dưới header (bên trái là chữ +
      // nút của hero; góc dưới phải là cụm nút nổi). Điện thoại: sát trên thanh nút đáy.
      const visibleForPage = window.visualViewport?.height || innerHeight;
      const naturalTop = !homeHero
        ? innerWidth <= 600
          ? Number.POSITIVE_INFINITY
          : headerHeight + Math.max(0, (visibleForPage - headerHeight - companion.offsetHeight) / 2) + 40
        : compact
          ? headerHeight + homeHero.offsetHeight - companion.offsetHeight - gap
          : headerHeight + 108; // 108 (trước 122): ở slide "Giới thiệu công ty" chân robot không chạm câu nhấn
      const visibleHeight = window.visualViewport?.height || innerHeight;
      // Trên điện thoại cụm hỗ trợ nhanh là thanh dưới đáy: chừa chỗ để robot không đè lên.
      const bottomBar = matchMedia("(max-width: 600px)").matches
        ? document.querySelector<HTMLElement>(".floats")?.offsetHeight || 0
        : 0;
      let top = Math.min(naturalTop, visibleHeight - bottomBar - companion.offsetHeight - (homeHero ? 12 : gap + 8));
      // Trang chủ, băng chuyền đang ở slide "Giới thiệu công ty": cột trái là câu nhấn "Đào tạo và sát hạch…"
      // → đưa robot lên khoảng trống bên trái tiêu đề "GIỚI THIỆU CÔNG TY", chân robot luôn cao hơn câu nhấn.
      const slide2 = homeHero ? companySlideTop() : null;
      if (slide2 !== null) top = slide2;
      companion.style.top = `${top}px`;
      companion.style.bottom = "auto";
      greeting.style.removeProperty("left");
      greeting.style.removeProperty("--greeting-tail");
      updateGreeting();
      return;
    }
    if (!drag) wander.snapToEdge(position, width, height);
    companion.style.transform = `translate3d(${position.x + minX}px, ${position.y + minY}px, 0)`;
    const bubbleLeft = THREE.MathUtils.clamp(
      position.x + robotWidth / 2 - greetingWidth / 2,
      0,
      Math.max(0, viewportWidth - greetingWidth - 16),
    );
    greeting.style.left = `${bubbleLeft - position.x}px`;
    greeting.style.setProperty(
      "--greeting-tail",
      `${THREE.MathUtils.clamp(position.x + robotWidth / 2 - bubbleLeft, 16, greetingWidth - 16)}px`,
    );
    updateGreeting();
  }
  function resize(initial = false) {
    if (stationary) {
      place();
      return;
    }
    const viewport = window.visualViewport;
    minX = (viewport?.offsetLeft || 0) + 8;
    const greetingSpace = Math.max(
      0,
      greeting.offsetHeight - companion.offsetHeight * 0.1,
    );
    greetingWidth = greeting.offsetWidth;
    robotWidth = companion.offsetWidth;
    viewportWidth = viewport?.width || innerWidth;
    minY = (viewport?.offsetTop || 0) + 8 + greetingSpace;
    width = Math.max(
      0,
      (viewport?.width || innerWidth) - companion.offsetWidth - 16,
    );
    height = Math.max(
      0,
      (viewport?.height || innerHeight) -
        companion.offsetHeight -
        greetingSpace -
        16,
    );
    if (initial) position.set(0, height);
    place();
  }
  resize(true);
  watch(new ResizeObserver(() => resize())).observe(companion);
  watch(new ResizeObserver(() => resize())).observe(greeting);
  {
    if (homeHero) {
      watch(new ResizeObserver(() => resize())).observe(homeHero);
    }
    // Robot chỉ thu về góc khi lướt xuống (> 25% màn hình); băng chuyền đổi slide trên trang
    // chủ không còn làm robot thu lại. Lướt lên lại → robot đứng ra, chào lại sau 0.5 giây.
    // Robot đứng kiểu position: fixed nhưng bám theo câu nhấn của slide "Giới thiệu công ty" và đáy header
    // → khi đang đứng ngoài trang phải đo lại mỗi lần cuộn (trước chỉ đo lúc đổi trạng thái thu/đứng,
    // nên lướt lên tới đầu trang robot giữ chỗ cũ và đè lên logo).
    let placeRaf = 0;
    const placeSoon = () => {
      cancelAnimationFrame(placeRaf);
      placeRaf = requestAnimationFrame(() => { if (!docked && !destroyed) place(); });
    };
    const syncHeroDock = () => {
      const now = performance.now();
      const away = scrollY > innerHeight * 0.25;
      // Điện thoại: robot luôn đứng cố định trên thanh nút đáy (không bật ra trang khi lướt lên đầu).
      const nextDocked = away || phoneLayout.matches || Number.isNaN(companySlideTop());
      if (nextDocked === docked) {
        if (!docked && homeHero) placeSoon();
        return;
      }
      docked = nextDocked;
      if (!docked) {
        greeted = false;
        greetingStarted = false;
        greetAgainAt = 0;
        greetingMovementUntil = now + 500;
      }
      syncDock();
      if (onStage()) {
        resize();
        resume();
      }
      updateGreeting();
    };
    window.addEventListener("scroll", syncHeroDock, { passive: true, signal });
    phoneLayout.addEventListener("change", syncHeroDock, { signal });
    if (homeHero)
    {
      // Băng chuyền đổi slide → đặt lại chỗ robot. Băng chuyền trượt ngang (scroll của .company-slider-track),
      // nên đo lại theo từng khung hình khi track cuộn và khi đổi class is-active.
      let raf = 0;
      const replace = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => { if (destroyed) return; syncHeroDock(); place(); }); };
      watch(new MutationObserver(replace)).observe(homeHero, { attributes: true, attributeFilter: ["class"] });
      document.querySelector(".company-slider-track")?.addEventListener("scroll", replace, { passive: true, signal });
      // tiêu đề / câu nhấn của slide 2 có hiệu ứng trượt vào (company-reveal) → đo lại khi hiệu ứng xong
      document.querySelector(".company-banner")?.addEventListener("animationend", replace, { signal });
      // header co/giãn khi cuộn (thanh trên cùng ẩn/hiện) có hiệu ứng → đo lại khi hiệu ứng xong
      document.getElementById("navbar")?.closest("header")?.addEventListener("transitionend", replace, { signal });
    }
    syncHeroDock();
  }
  window.addEventListener("resize", () => resize(), { signal });
  window.visualViewport?.addEventListener("resize", () => resize(), { signal });
  window.visualViewport?.addEventListener("scroll", () => resize(), { signal });

  // Robot 3D đứng trên mọi trang; vẫy tay bắt đầu cùng lúc bong bóng chào (updateGreeting).
  {
    try {
      stage = new RobotStage(companion);
      stage.onRestore = resume;
    } catch (error) {
      console.warn("Robot 3D không khả dụng; hiển thị hình thay thế.", error);
    }
    stageReady = true;
  }
  // RobotStage replaces the host contents, so attach the greeting afterwards,
  // including when WebGL initialization falls back to the static illustration.
  companion.append(greeting);
  resize(true);
  // Keep the greeting cycle running even when reduced motion stops the 3D loop.
  const greetingInterval = window.setInterval(updateGreeting, 100);

  function animate(now: number) {
    if (destroyed) return;
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    time += dt;
    if (viewer.isOpen) viewer.tick(dt, time, false);
    else if (onStage()) {
      if (!stationary) {
        wander.update(
          dt,
          position,
          width,
          height,
          paused || hovered || keyboardFocused || !!drag || !!stage?.lost || !onStage(),
          !drag,
        );
        place();
      }
      if (stage && !stage.lost && onStage()) {
        stage.robot.group.rotation.y = stationary ? 0 : wander.heading;
        if (!stationary && !drag && !stage.robot.isWaving && wander.takeGreeting())
          stage.robot.wave();
        stage.robot.update(dt, time, pointer, false, !stationary && wander.walking);
        stage.render();
      }
    }
    frame = requestAnimationFrame(animate);
  }
  function resume() {
    cancelAnimationFrame(frame);
    if (destroyed || document.hidden) return;
    if (media.matches) {
      stage?.robot.resetPose();
      stage?.render();
      viewer.resetMotion();
      viewer.tick(0, time, true);
    } else {
      last = performance.now();
      frame = requestAnimationFrame(animate);
    }
  }

  companion.addEventListener("pointerdown", (event) => {
    if (stationary) return;
    if (!event.isPrimary || event.button !== 0 || drag) return;
    suppressClick = false;
    keyboardFocused = false;
    drag = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      offsetX: event.clientX - position.x - minX,
      offsetY: event.clientY - position.y - minY,
      moved: false,
      lastX: event.clientX,
      lastY: event.clientY,
      lastTime: performance.now(),
      velocityX: 0,
      velocityY: 0,
    };
    companion.setPointerCapture(event.pointerId);
    wander.pause();
    updateGreeting();
  });
  companion.addEventListener("pointermove", (event) => {
    if (drag && event.pointerId === drag.id) {
      const now = performance.now();
      const elapsed = Math.max(1, now - drag.lastTime);
      const sampleVelocityX = ((event.clientX - drag.lastX) / elapsed) * 1000;
      const sampleVelocityY = ((event.clientY - drag.lastY) / elapsed) * 1000;
      drag.velocityX = drag.velocityX * 0.35 + sampleVelocityX * 0.65;
      drag.velocityY = drag.velocityY * 0.35 + sampleVelocityY * 0.65;
      drag.lastX = event.clientX;
      drag.lastY = event.clientY;
      drag.lastTime = now;
      if (
        !drag.moved &&
        Math.hypot(event.clientX - drag.x, event.clientY - drag.y) < 6
      )
        return;
      drag.moved = true;
      companion.classList.add("is-dragging");
      const nextX = event.clientX - drag.offsetX - minX;
      const nextY = event.clientY - drag.offsetY - minY;
      const dx = nextX - position.x,
        dy = nextY - position.y;
      if (Math.hypot(dx, dy) > 1) {
        const desired = Math.atan2(dx, dy);
        wander.heading +=
          Math.atan2(
            Math.sin(desired - wander.heading),
            Math.cos(desired - wander.heading),
          ) * 0.3;
      }
      position.set(nextX, nextY);
      place();
      if (stage) {
        stage.robot.group.rotation.y = wander.heading;
        stage.render();
      }
    } else {
      const rect = companion.getBoundingClientRect();
      pointer.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        1 - ((event.clientY - rect.top) / rect.height) * 2,
      );
    }
  });
  function endDrag(event?: PointerEvent) {
    if (!drag || (event && event.pointerId !== drag.id)) return;
    const current = drag;
    drag = undefined;
    suppressClick = current.moved;
    if (companion.hasPointerCapture(current.id))
      companion.releasePointerCapture(current.id);
    companion.classList.remove("is-dragging");
    wander.pause();
    if (!current.moved) return;
    if (event?.type !== "pointerup") {
      wander.snapToEdge(position, width, height);
      place();
      return;
    }
    const velocityFade = Math.exp(-(performance.now() - current.lastTime) / 140);
    const velocityX = current.velocityX * velocityFade;
    const velocityY = current.velocityY * velocityFade;
    const speed = Math.hypot(velocityX, velocityY);
    const projectedX = position.x + velocityX * 0.3;
    const projectedY = position.y + velocityY * 0.3;
    const draggedOut =
      position.x < -robotWidth * 0.35 ||
      position.x > width + robotWidth * 0.35 ||
      position.y < -companion.offsetHeight * 0.35 ||
      position.y > height + companion.offsetHeight * 0.35;
    const thrownOut =
      speed >= 650 &&
      (projectedX < 0 ||
        projectedX > width ||
        projectedY < 0 ||
        projectedY > height);
    if (draggedOut || thrownOut) {
      const direction = new THREE.Vector2(
        speed >= 260
          ? velocityX
          : position.x - (current.x - current.offsetX - minX),
        speed >= 260
          ? velocityY
          : position.y - (current.y - current.offsetY - minY),
      );
      setRobotVisible(false, direction);
      restoreButton.focus({ preventScroll: true });
    } else {
      wander.snapToEdge(position, width, height);
      place();
    }
  }
  companion.addEventListener("pointerup", endDrag);
  companion.addEventListener("pointercancel", endDrag);
  companion.addEventListener("lostpointercapture", endDrag);
  window.addEventListener("blur", () => {
    endDrag();
    hovered = false;
  }, { signal });
  companion.addEventListener("click", (event) => {
    if (suppressClick && event.detail !== 0) {
      suppressClick = false;
      return;
    }
    suppressClick = false;
    viewer.open();
    updateGreeting();
  });
  // Bong bóng chào cạnh đầu robot: tự hiện ~6 giây sau khi tải trang (nếu robot đang ở
  // dạng nút), hiện lại khi rê chuột/focus; luôn tự ẩn để không che nội dung lâu.
  let dockGreetingTimer = 0;
  const hideDockGreeting = () => {
    window.clearTimeout(dockGreetingTimer);
    dockGreeting.classList.add("is-hidden");
  };
  const showDockGreeting = (duration: number) => {
    if (restoreButton.hidden || viewer.isOpen) return;
    dockGreeting.classList.remove("is-hidden");
    window.clearTimeout(dockGreetingTimer);
    dockGreetingTimer = window.setTimeout(hideDockGreeting, duration);
  };
  const dockGreetingIntroTimer = window.setTimeout(() => showDockGreeting(6000), 1200);
  restoreButton.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "mouse") showDockGreeting(4000);
  });
  restoreButton.addEventListener("pointerleave", hideDockGreeting);
  restoreButton.addEventListener("focus", () => {
    if (restoreButton.matches(":focus-visible")) showDockGreeting(4000);
  });
  restoreButton.addEventListener("blur", hideDockGreeting);
  restoreButton.addEventListener("click", () => {
    hideDockGreeting();
    viewer.open();
    updateGreeting();
  });
  companion.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "mouse") hovered = true;
  });
  companion.addEventListener("pointerleave", () => {
    hovered = false;
    pointer.set(0, 0);
  });
  companion.addEventListener("focus", () => {
    keyboardFocused = companion.matches(":focus-visible");
  });
  companion.addEventListener("blur", () => {
    keyboardFocused = false;
  });
  companion.addEventListener("keydown", (event) => {
    if (stationary) return;
    const delta: Record<string, [number, number]> = {
      ArrowLeft: [-24, 0],
      ArrowRight: [24, 0],
      ArrowUp: [0, -24],
      ArrowDown: [0, 24],
    };
    if (!delta[event.key]) return;
    event.preventDefault();
    keyboardFocused = true;
    const [dx, dy] = delta[event.key];
    position.x += dx;
    position.y += dy;
    wander.heading = Math.atan2(dx, dy);
    place();
    if (stage) {
      stage.robot.group.rotation.y = wander.heading;
      stage.render();
    }
    wander.pause();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) endDrag();
    resume();
  }, { signal });
  media.addEventListener("change", resume, { signal });
  resume();

  return () => {
    destroyed = true;
    lifecycle.abort();
    observers.forEach((observer) => observer.disconnect());
    cancelAnimationFrame(frame);
    window.clearInterval(greetingInterval);
    window.clearTimeout(dockGreetingIntroTimer);
    window.clearTimeout(dockGreetingTimer);
    window.clearTimeout(hideTimer);
    viewer.destroy();
    stage?.dispose();
    companion.remove();
    restoreButton.remove();
    document.body.classList.remove("hpo-home-robot", "hpo-page-robot");
  };
}

// API cho Next.js: `window.HPORobotCompanion.mount()` / `.unmount()`.
// Thẻ script có `data-manual-mount` → không tự gắn (island gọi mount sau khi React hydrate xong).
let unmountCurrent: (() => void) | undefined;
const robotCompanionApi = {
  mount() {
    robotCompanionApi.unmount();
    unmountCurrent = mount();
  },
  unmount() {
    unmountCurrent?.();
    unmountCurrent = undefined;
  },
};
(window as unknown as { HPORobotCompanion: typeof robotCompanionApi }).HPORobotCompanion =
  robotCompanionApi;
if (!currentScriptElement?.hasAttribute("data-manual-mount")) {
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", () => robotCompanionApi.mount(), { once: true });
  else robotCompanionApi.mount();
}
