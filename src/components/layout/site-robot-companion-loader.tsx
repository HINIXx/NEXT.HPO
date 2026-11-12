"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/** Tăng khi build lại `robot-companion/` (npm run build) để trình duyệt tải bản mới. */
const ROBOT_ASSET_VERSION = "20261109-next-mount";
const ROBOT_SCRIPT_ID = "hpo-robot-companion-script";
const ROBOT_STYLE_ID = "hpo-robot-companion-style";
const ROBOT_LOAD_DELAY_AFTER_PAGE_LOAD_MS = 2000;

type RobotCompanionApi = { mount(): void; unmount(): void };

function getRobotApi() {
  return (window as unknown as { HPORobotCompanion?: RobotCompanionApi })
    .HPORobotCompanion;
}

/** Chờ trang tải xong + 2 giây + trình duyệt rảnh → robot (~660 KB, Three.js) không tranh tài nguyên với nội dung chính (LCP/INP). */
function whenPageIsIdle(callback: () => void) {
  let idle = 0;
  let timer = 0;
  const schedule = () => {
    if (typeof window.requestIdleCallback === "function")
      idle = window.requestIdleCallback(callback, { timeout: 3000 });
    else timer = window.setTimeout(callback, 1200);
  };
  // Thêm 2 giây sau `load`: bundle 640 KB parse thành 1 tác vụ dài → để ngoài cửa sổ tải trang (TBT/INP).
  let delay = 0;
  const scheduleLater = () => {
    delay = window.setTimeout(schedule, ROBOT_LOAD_DELAY_AFTER_PAGE_LOAD_MS);
  };
  if (document.readyState === "complete") scheduleLater();
  else window.addEventListener("load", scheduleLater, { once: true });
  return () => {
    window.removeEventListener("load", scheduleLater);
    window.clearTimeout(delay);
    if (idle) window.cancelIdleCallback(idle);
    window.clearTimeout(timer);
  };
}

function loadRobotBundle(onReady: () => void) {
  if (!document.getElementById(ROBOT_STYLE_ID)) {
    const style = document.createElement("link");
    style.id = ROBOT_STYLE_ID;
    style.rel = "stylesheet";
    style.href = `/robot/dist/companion.css?v=${ROBOT_ASSET_VERSION}`;
    document.head.append(style);
  }
  const existing = document.getElementById(ROBOT_SCRIPT_ID);
  if (existing) {
    if (getRobotApi()) onReady();
    else existing.addEventListener("load", onReady, { once: true });
    return;
  }
  const script = document.createElement("script");
  script.id = ROBOT_SCRIPT_ID;
  script.src = `/robot/dist/companion.js?v=${ROBOT_ASSET_VERSION}`;
  script.async = true;
  // Bundle không tự gắn: island gọi mount() sau khi React đã hydrate (tránh lệch DOM `.floats`).
  script.dataset.manualMount = "";
  script.addEventListener("load", onReady, { once: true });
  document.head.append(script);
}

/**
 * Robot 3D Hiệp Phát (V2 `robot/dist` qua site-footer.js) trên mọi trang: chào + vẫy tay ở đầu trang,
 * lướt xuống thu về nút đầu robot trong cụm hỗ trợ nhanh `.floats`, bấm mở hộp thoại 3D.
 * Nguồn: `robot-companion/` (bản sao V2 robot/ + mount/unmount). Chuyển trang (Next không tải lại) →
 * gỡ robot cũ rồi gắn lại để robot đọc đúng bố cục trang mới (trang chủ: `body.hpo-route-home`).
 * Trang trí thuần — không render gì phía server.
 */
export function SiteRobotCompanionLoader() {
  const pathname = usePathname();
  const [bundleReady, setBundleReady] = useState(false);

  useEffect(
    () => whenPageIsIdle(() => loadRobotBundle(() => setBundleReady(true))),
    [],
  );

  useEffect(() => {
    document.body.classList.toggle("hpo-route-home", pathname === "/");
    if (!bundleReady) return;
    // Đợi 1 khung hình để DOM trang mới (slider trang chủ, hero) đã gắn xong.
    const frame = window.requestAnimationFrame(() => getRobotApi()?.mount());
    return () => {
      window.cancelAnimationFrame(frame);
      getRobotApi()?.unmount();
    };
  }, [bundleReady, pathname]);

  return null;
}
