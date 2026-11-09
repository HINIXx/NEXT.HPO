"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { trainingProcessSteps } from "../data/driving-training-process-steps";

const AUTO_HIDE_DELAY_MS = 1200;

/**
 * Thanh 5 bước dính dưới menu chính (V2 `.process-subnav` + script.js đầu file):
 * - Dính ngay dưới `#navbar` (đo chiều cao thật → biến `--site-header-height` cho scroll-mt các bước).
 * - Bước đang xem = section cắt đường kích hoạt max(menu + thanh + 150px, 34% màn hình).
 * - Khi đang dính và ngừng cuộn 1,2s → trượt ẩn; rê chuột/focus vào thanh hoặc đưa chuột lên sát mép trên → hiện lại.
 * - ≤900px cuộn ngang 5 cột ≥156px.
 */
export function TrainingProcessStickyStepNavigation() {
  const navRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState(trainingProcessSteps[0].sectionId);
  const [isAutoHidden, setIsAutoHidden] = useState(false);
  const [isScrollActive, setIsScrollActive] = useState(false);
  const [stickyTop, setStickyTop] = useState(0);
  const hideTimer = useRef(0);

  const isStuck = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return false;
    return (
      window.scrollY > 0 && nav.getBoundingClientRect().top <= stickyTop + 1
    );
  }, [stickyTop]);

  const showTemporarily = useCallback(() => {
    window.clearTimeout(hideTimer.current);
    setIsAutoHidden(false);
    setIsScrollActive(true);
    hideTimer.current = window.setTimeout(() => {
      setIsScrollActive(false);
      const nav = navRef.current;
      if (isStuck() && nav && !nav.matches(":hover, :focus-within")) {
        setIsAutoHidden(true);
      }
    }, AUTO_HIDE_DELAY_MS);
  }, [isStuck]);

  // Chiều cao menu chính → vị trí dính + bù neo cho các bước.
  useEffect(() => {
    const siteNav = document.getElementById("navbar");
    if (!siteNav) return;
    const sync = () => {
      const height = siteNav.offsetHeight;
      setStickyTop(height);
      document.documentElement.style.setProperty(
        "--site-header-height",
        `${height}px`,
      );
    };
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(siteNav);
    return () => observer.disconnect();
  }, []);

  // Bước đang xem theo vị trí cuộn.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const navHeight = navRef.current?.offsetHeight ?? 0;
      const activationLine = Math.max(
        stickyTop + navHeight + 150,
        window.innerHeight * 0.34,
      );
      let current = trainingProcessSteps[0].sectionId;
      for (const step of trainingProcessSteps) {
        const rect = document
          .getElementById(step.sectionId)
          ?.getBoundingClientRect();
        if (
          rect &&
          rect.top <= activationLine &&
          rect.bottom > activationLine
        ) {
          current = step.sectionId;
        }
      }
      setActiveId(current);
    };
    const onScroll = () => {
      showTemporarily();
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
      window.clearTimeout(hideTimer.current);
    };
  }, [showTemporarily, stickyTop]);

  // Thanh đang ẩn: đưa chuột lên sát dưới menu chính → hiện lại.
  useEffect(() => {
    if (!isAutoHidden) return;
    const onPointerMove = (event: PointerEvent) => {
      if (event.clientY <= stickyTop + 28) showTemporarily();
    };
    document.addEventListener("pointermove", onPointerMove);
    return () => document.removeEventListener("pointermove", onPointerMove);
  }, [isAutoHidden, showTemporarily, stickyTop]);

  const jumpTo = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
    history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  };

  return (
    <nav
      ref={navRef}
      aria-label="Điều hướng quy trình"
      data-auto-hidden={isAutoHidden || undefined}
      onMouseEnter={showTemporarily}
      onMouseLeave={showTemporarily}
      onFocus={showTemporarily}
      style={{ top: stickyTop }}
      className={cn(
        "sticky z-[90] border-y border-t-[rgba(230,235,245,0.8)] border-b-[rgba(230,235,245,0.95)] bg-white/92 backdrop-blur-[18px]",
        "ease-hp transition-[translate,opacity,box-shadow] duration-[480ms,280ms,280ms] motion-reduce:transition-none",
        "data-[auto-hidden]:pointer-events-none data-[auto-hidden]:-translate-y-[calc(100%+2px)] data-[auto-hidden]:opacity-0",
        isScrollActive && "shadow-[0_12px_30px_rgba(10,19,48,0.08)]",
      )}
    >
      <div className="container-site grid [scrollbar-width:none] grid-cols-[repeat(5,minmax(156px,1fr))] overflow-x-auto pt-4 pb-3.5 lg:grid-cols-5 lg:overflow-x-visible lg:pt-3 lg:pb-2.5 [&::-webkit-scrollbar]:hidden">
        {trainingProcessSteps.map((step, index) => {
          const isActive = step.sectionId === activeId;
          const isLast = index === trainingProcessSteps.length - 1;
          return (
            <a
              key={step.sectionId}
              href={`#${step.sectionId}`}
              aria-current={isActive ? "true" : undefined}
              onClick={(event) => jumpTo(event, step.sectionId)}
              className={cn(
                "group font-display text-ink relative z-0 grid min-h-[84px] w-full min-w-0 items-center justify-items-center gap-[9px] rounded-[18px] border border-transparent px-1.5 text-[13px] font-extrabold transition-[background-color,border-color] duration-200",
                "min-[641px]:px-3 min-[641px]:text-[14px] lg:min-h-[76px]",
                !isActive && "hover:bg-primary-50 hover:border-[#b8c5db]",
                // Vạch nối sang bước sau (V2 `::after`).
                !isLast &&
                  "after:absolute after:top-4 after:right-[calc(-50%+21px)] after:left-[calc(50%+21px)] after:-z-0 after:h-[3px] after:rounded-full after:content-[''] min-[641px]:after:top-[18px] min-[641px]:after:right-[calc(-50%-100px)] min-[641px]:after:left-[calc(50%+23px)]",
                !isLast &&
                  (isActive
                    ? "after:bg-[linear-gradient(90deg,#1e40af,#dbe3f0)]"
                    : "after:bg-[linear-gradient(90deg,#b8c5db,#dbe3f0)]"),
              )}
            >
              <span
                className={cn(
                  "relative z-[1] grid size-[34px] place-items-center rounded-full border-2 text-[14px] leading-none min-[641px]:size-[38px] min-[641px]:text-[15px]",
                  isActive
                    ? "border-primary bg-primary text-white shadow-[0_14px_28px_rgba(30,64,175,0.24)]"
                    : "text-primary border-[#b8c5db] bg-white shadow-[0_8px_18px_rgba(10,19,48,0.08)]",
                )}
              >
                {step.number}
              </span>
              <span
                className={cn(
                  "relative z-[1] inline-flex min-h-[34px] max-w-full items-center justify-center rounded-full px-2.5 text-center text-[15px] leading-[1.25] text-balance transition-[background-color,box-shadow,color] duration-200 min-[641px]:min-h-9 min-[641px]:px-3.5 lg:text-[17px]",
                  isActive &&
                    "bg-primary text-white shadow-[0_14px_26px_rgba(30,64,175,0.2)]",
                )}
              >
                {step.navLabel}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
