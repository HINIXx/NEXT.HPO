"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import styles from "./hpo-system-ecosystem-card.module.css";
import {
  hpoSystemNodes as nodes,
  type HpoSystemNodeName as NodeName,
} from "./hpo-system-ecosystem-nodes";

/** Toạ độ tâm biểu tượng trên ảnh vòng (viewBox 362), khớp ảnh `hpo-system-circle.webp` (V2 NODES). */
const CENTER = { x: 181, y: 186 };
const SWEEP_SECONDS = 6;
const TRAVEL = 0.18;
const GLOW_PEAK = 0.2;
const ACTIVE_SECONDS = 1.4;

/** Hình học tia + lúc tia quét đi qua từng thành phần (tính sẵn, giống nhau server/client). */
const geometry = nodes.map((node) => {
  const dx = node.x - CENTER.x;
  const dy = node.y - CENTER.y;
  const length = Math.hypot(dx, dy);
  const ux = dx / length;
  const uy = dy / length;
  const path = `M${(CENTER.x + ux * 50).toFixed(1)} ${(CENTER.y + uy * 50).toFixed(1)}L${(node.x - ux * 30).toFixed(1)} ${(node.y - uy * 30).toFixed(1)}`;
  const angle = ((Math.atan2(dx, -dy) * 180) / Math.PI + 360) % 360;
  const hitAt = (angle / 360) * SWEEP_SECONDS;
  return {
    ...node,
    path,
    hitAt,
    begin: `${(hitAt - GLOW_PEAK * SWEEP_SECONDS).toFixed(2)}s`,
  };
});

/**
 * Card "Hệ thống HPO" trong slide 1 trang chủ (V2 `.hpo-sys-card` + homepage-hpo-system-card-motion.js):
 * vòng HPO có tia radar 6s/vòng, mỗi thành phần có tia + gói dữ liệu chạy từ xe ở tâm; mục trong danh sách
 * sáng lên khi tia quét qua. Rê chuột/focus vào mục → khoanh thành phần đó, dừng tự chạy. Nghiêng nhẹ theo chuột.
 * Chữ thành phần 16/14px (V2 14,5/12,5px — nâng theo quy tắc "to, rõ").
 */
export function HpoSystemEcosystemCard() {
  const svgRef = useRef<SVGSVGElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<NodeName | null>(null);
  const [pinned, setPinned] = useState<NodeName | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const svg = svgRef.current;
    if (!svg) return;
    if (reduce.matches) svg.pauseAnimations();
    if (pinned || reduce.matches) return;
    let frame = 0;
    const tick = () => {
      const t = svg.getCurrentTime() % SWEEP_SECONDS;
      const hit = geometry.find(
        (g) => (t - g.hitAt + SWEEP_SECONDS) % SWEEP_SECONDS < ACTIVE_SECONDS,
      );
      setActive(hit ? hit.name : null);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [pinned]);

  const shown = pinned ?? active;

  return (
    <div
      aria-labelledby="hpoSysTitle"
      className="mx-auto mt-[clamp(28px,4.5vh,56px)] grid w-[min(720px,100%)] grid-cols-1 items-center justify-items-center gap-[clamp(20px,3vw,44px)] rounded-[22px] border border-[#e6ecf6] bg-white px-3.5 py-[18px] text-center shadow-[0_30px_70px_-36px_rgba(19,35,90,0.35),0_2px_10px_rgba(15,23,42,0.04)] min-[521px]:rounded-[28px] min-[521px]:px-[clamp(18px,2.6vw,36px)] min-[521px]:py-[clamp(14px,1.8vw,22px)] min-[1100px]:w-[min(1080px,100%)] min-[1100px]:grid-cols-[auto_minmax(0,1fr)] min-[1100px]:justify-items-stretch min-[1100px]:text-left"
    >
      <div
        ref={ringRef}
        className={cn(
          styles.ring,
          "[--ring-size:min(320px,100%)] min-[1100px]:[--ring-size:clamp(240px,28vw,340px)]",
        )}
        onPointerMove={(event) => {
          if (!window.matchMedia("(hover: hover)").matches) return;
          const ring = ringRef.current;
          if (!ring) return;
          const box = ring.getBoundingClientRect();
          ring.style.setProperty(
            "--tilt-x",
            `${(-((event.clientY - box.top) / box.height - 0.5) * 10).toFixed(2)}deg`,
          );
          ring.style.setProperty(
            "--tilt-y",
            `${(((event.clientX - box.left) / box.width - 0.5) * 10).toFixed(2)}deg`,
          );
        }}
        onPointerLeave={() => {
          ringRef.current?.style.setProperty("--tilt-x", "0deg");
          ringRef.current?.style.setProperty("--tilt-y", "0deg");
        }}
      >
        <Image
          src="/assets/images/hero/hpo-system-circle.webp"
          alt="Sơ đồ hệ thống HPO: xe tập lái Hiệp Phát ở tâm, nối với xác thực khuôn mặt, cloud (server), DAT, cabin, mô phỏng, đa nền tảng"
          width={724}
          height={724}
          priority
        />
        <span aria-hidden="true" className={styles.sweep} />
        <span aria-hidden="true" className={styles.ripple} />
        <span
          aria-hidden="true"
          className={cn(styles.ripple, styles.rippleLate)}
        />
        <svg
          ref={svgRef}
          className={styles.motion}
          viewBox="0 0 362 362"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="hpoSysNodeGlow">
              <stop offset="0" stopColor="#d6f8ff" stopOpacity="1" />
              <stop offset=".5" stopColor="#6fdcff" stopOpacity=".6" />
              <stop offset="1" stopColor="#2b8cff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g className={styles.orbit}>
            <circle
              cx="181"
              cy="181"
              r="172"
              fill="none"
              stroke="#cfeeff"
              strokeOpacity=".35"
              strokeWidth="1"
              strokeDasharray="2 7"
            />
            <circle cx="181" cy="9" r="2.6" fill="#e6fbff" />
          </g>
          {geometry.map((g) => {
            const common = {
              dur: `${SWEEP_SECONDS}s`,
              begin: g.begin,
              repeatCount: "indefinite",
            };
            return (
              <g key={g.name}>
                <path d={g.path} className={styles.spoke} />
                <circle
                  cx={g.x}
                  cy={g.y}
                  r="34"
                  fill="url(#hpoSysNodeGlow)"
                  opacity="0"
                >
                  <animate
                    attributeName="opacity"
                    values="0;0;1;.7;0;0"
                    keyTimes={`0;${GLOW_PEAK - 0.03};${GLOW_PEAK};0.3;0.45;1`}
                    {...common}
                  />
                  <animate
                    attributeName="r"
                    values="24;24;44;50;50"
                    keyTimes={`0;${GLOW_PEAK - 0.03};${GLOW_PEAK};0.45;1`}
                    {...common}
                  />
                </circle>
                <circle r="3.4" className={styles.packet} opacity="0">
                  <animateMotion
                    path={g.path}
                    keyPoints="0;1;1"
                    keyTimes={`0;${TRAVEL};1`}
                    calcMode="linear"
                    {...common}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0;0"
                    keyTimes={`0;0.02;${TRAVEL - 0.02};${TRAVEL + 0.01};1`}
                    {...common}
                  />
                </circle>
                <circle
                  cx={g.x}
                  cy={g.y}
                  r="40"
                  className={cn(
                    styles.focus,
                    pinned === g.name && styles.focusOn,
                  )}
                />
              </g>
            );
          })}
        </svg>
      </div>

      <div className="w-full min-w-0">
        <p className="text-[14px] font-bold tracking-[0.14em] text-[#2b4bf2] uppercase">
          Hệ sinh thái số
        </p>
        <h2
          id="hpoSysTitle"
          className="font-display mt-1 mb-0.5 text-[clamp(22px,2vw,30px)] leading-[1.15] font-extrabold tracking-[-0.02em] text-[#13235a]"
        >
          Hệ thống HPO
        </h2>
        <p className="mb-3 text-[16px] leading-[1.45] text-[#5b6782]">
          6 thành phần kết nối trên một nền tảng
        </p>
        <ul className="grid grid-cols-1 gap-1 text-left min-[521px]:grid-cols-2 min-[521px]:gap-1.5 min-[1100px]:grid-cols-3">
          {nodes.map((node) => {
            const on = shown === node.name;
            return (
              <li
                key={node.name}
                tabIndex={0}
                onPointerEnter={() => setPinned(node.name)}
                onPointerLeave={() => setPinned(null)}
                onFocus={() => setPinned(node.name)}
                onBlur={() => setPinned(null)}
                className={cn(
                  "flex items-start gap-2.5 rounded-[14px] border px-2.5 py-[9px] transition-[background-color,border-color,box-shadow] duration-300 outline-none focus-visible:shadow-[0_0_0_3px_rgba(43,75,242,0.35)]",
                  on
                    ? "border-[#dbe3ff] bg-[#f3f6ff] shadow-[0_10px_24px_-18px_rgba(43,75,242,0.55)]"
                    : "border-transparent",
                  "[&>svg]:size-[34px] [&>svg]:flex-none [&>svg]:rounded-[10px] [&>svg]:fill-none [&>svg]:stroke-[1.8] [&>svg]:p-[7px] [&>svg]:transition-colors [&>svg]:[stroke-linecap:round] [&>svg]:[stroke-linejoin:round]",
                  on
                    ? "[&>svg]:bg-[#2b4bf2] [&>svg]:stroke-white"
                    : "[&>svg]:bg-[#eef2ff] [&>svg]:stroke-[#2b4bf2]",
                )}
              >
                {node.icon}
                <span>
                  <b className="block text-[16px] leading-[1.3] font-bold text-[#13235a]">
                    {node.title}
                  </b>
                  <small className="mt-0.5 block text-[14px] leading-[1.4] text-[#5b6782]">
                    {node.note}
                  </small>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
