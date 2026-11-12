"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** 6,5 giây/giải (V2 awards.js DURATION). */
const AWARD_SLIDE_MS = 6500;

const awards = [
  {
    rank: "Top 10",
    name: "Global Excellent Brands 2026",
    subtitle:
      "Sydney Australia, 28/06/2026 - Diễn đàn doanh nghiệp Việt Nam - Australia",
    topline: "Sydney · Australia · 28/06/2026",
    src: "/assets/images/awards/global-excellent-brands-2026-slide-v2.webp",
    alt: "Top 10 Global Excellent Brands 2026 của Hiệp Phát",
    width: 1884,
    height: 835,
  },
  {
    rank: "Top 5",
    name: "ASEAN Strong Brand 2026",
    subtitle:
      "Singapore, 18/04/2026 - Diễn đàn hợp tác kinh tế Việt Nam - Asean",
    topline: "Singapore · 18/04/2026",
    src: "/assets/images/awards/asean-strong-brand-2026-slide-v2.webp",
    alt: "Top 5 ASEAN Strong Brand 2026 của Hiệp Phát",
    width: 1889,
    height: 833,
  },
  {
    rank: "Hàng Việt Tốt",
    name: "Thương hiệu Việt 2025",
    subtitle: "Việt Nam, 13/09/2025 - Thương hiệu Hàng Việt tốt 2025",
    topline: "Việt Nam · 13/09/2025",
    src: "/assets/images/awards/hang-viet-tot-2025-landscape-v3.webp",
    alt: "Poster Thương hiệu Hàng Việt Tốt 2025 của Hiệp Phát",
    width: 1886,
    height: 834,
  },
] as const;

function ArrowIcon({ d }: { d: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

/**
 * "DẤU ẤN HÀNH TRÌNH PHÁT TRIỂN THÀNH TỰU" (V2 `#awardSlider` + awards.js): 3 nút chọn giải (trái) + ảnh poster (phải),
 * dòng địa điểm/ngày đổi theo giải, tự chuyển 6,5s (dừng khi rê chuột/focus/khuất/giảm chuyển động), ←/→.
 * ≤900px: 3 nút chọn thành hàng ngang trên ảnh. Ảnh chỉ tải giải đang xem + kề.
 */
export function AchievementAwardsSliderSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const go = (index: number) =>
    setCurrent((index + awards.length) % awards.length);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const running = visible && !paused;
  useEffect(() => {
    if (
      !running ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const timer = window.setTimeout(
      () => setCurrent((index) => (index + 1) % awards.length),
      AWARD_SLIDE_MS,
    );
    return () => window.clearTimeout(timer);
  }, [current, running]);

  return (
    <section
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label="Ba giải thưởng nổi bật của HPO"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="mx-auto max-w-[1440px] px-4 pt-10 sm:px-[3vw] sm:pt-14"
    >
      <div
        data-reveal
        className="flex flex-col items-center gap-3 pt-5 text-center before:h-1 before:w-16 before:rounded-full before:bg-[linear-gradient(90deg,#2b26fb,#faec1a)] before:content-['']"
      >
        <h2 className="section-title-hp mx-auto w-fit text-center tracking-[-0.025em] uppercase">
          Dấu ấn hành trình phát triển thành tựu
        </h2>
      </div>
      <p className="bg-primary-50 before:border-primary relative mx-auto mt-3.5 mb-6 w-fit max-w-full rounded-full py-2 pr-5 pl-10 text-center text-[15px] leading-[1.4] font-bold tracking-[0.02em] text-[#1e3a8a] before:absolute before:top-1/2 before:left-4 before:size-3.5 before:-translate-y-1/2 before:rounded-full before:border-[3px] before:content-[''] sm:mb-[34px] sm:text-[16px]">
        {awards[current].subtitle}
      </p>

      <div
        data-reveal
        className="mx-auto grid max-w-[1270px] gap-4 lg:grid-cols-[270px_minmax(0,1fr)] lg:gap-[34px]"
      >
        <div
          role="group"
          aria-label="Chọn giải thưởng"
          className="grid grid-cols-3 gap-2 lg:grid-cols-1 lg:content-center lg:gap-3.5"
        >
          {awards.map((award, index) => {
            const active = index === current;
            return (
              <button
                key={award.name}
                type="button"
                aria-label={`Xem giải ${award.rank} ${award.name}`}
                aria-current={active ? "step" : undefined}
                aria-controls="awardSliderTrack"
                onClick={() => go(index)}
                className={cn(
                  "grid min-h-11 items-center gap-2 rounded-2xl border px-2.5 py-2.5 text-left transition-[background,border-color,box-shadow] lg:grid-cols-[46px_minmax(0,1fr)] lg:gap-3.5 lg:py-4 lg:pr-10 lg:pl-[18px]",
                  active
                    ? "border-transparent bg-[linear-gradient(135deg,#1e3a8a_0%,#2b26fb_100%)] text-white shadow-[0_18px_34px_-18px_rgba(43,38,251,0.8)]"
                    : "text-ink hover:border-primary border-[#e6ebf5] bg-white",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "font-display text-brand-blue hidden size-11 place-items-center rounded-[14px] text-[20px] font-black lg:grid",
                    active
                      ? "bg-white"
                      : "bg-primary-50 shadow-[inset_0_0_0_1px_#dbe4ff]",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="grid gap-0.5">
                  <strong className="font-display text-[16px] leading-[1.2] font-extrabold lg:text-[18px]">
                    {award.rank}
                  </strong>
                  <small
                    className={cn(
                      "text-[14px] leading-[1.4]",
                      active ? "text-white/85" : "text-[#334155]",
                    )}
                  >
                    {award.name}
                  </small>
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative overflow-hidden rounded-[18px] bg-[#f6f8fb] shadow-[0_44px_80px_-44px_rgba(10,19,48,0.55),0_0_0_1px_rgba(43,38,251,0.1)] sm:rounded-[26px]">
          <div
            id="awardSliderTrack"
            className="ease-hp flex transition-transform duration-700 motion-reduce:transition-none"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {awards.map((award, index) => {
              const near =
                Math.abs(index - current) <= 1 ||
                (current === 0 && index === awards.length - 1);
              return (
                <article
                  key={award.name}
                  aria-roledescription="slide"
                  aria-label={`${index + 1} trên ${awards.length}: ${award.rank} ${award.name}`}
                  aria-hidden={index !== current}
                  className="relative w-full flex-none"
                >
                  <div className="absolute top-3 left-3 z-[1] sm:top-[22px] sm:left-9">
                    <strong className="inline-flex items-center rounded-full border border-white/40 bg-[rgba(10,19,48,0.62)] px-4 py-[5px] text-[14px] font-bold tracking-[0.12em] text-white uppercase backdrop-blur-sm">
                      {award.topline}
                    </strong>
                  </div>
                  {near ? (
                    <Image
                      src={award.src}
                      alt={award.alt}
                      width={award.width}
                      height={award.height}
                      loading="lazy"
                      sizes="(min-width: 901px) 66vw, 100vw"
                      className="aspect-[1886/834] w-full object-contain"
                    />
                  ) : (
                    <div className="aspect-[1886/834] w-full" />
                  )}
                </article>
              );
            })}
          </div>
          <div className="pointer-events-none absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between">
            {[
              { label: "Giải thưởng trước", d: "M15 5l-7 7 7 7", step: -1 },
              { label: "Giải thưởng tiếp theo", d: "M9 5l7 7-7 7", step: 1 },
            ].map((arrow) => (
              <button
                key={arrow.step}
                type="button"
                aria-label={arrow.label}
                onClick={() => go(current + arrow.step)}
                className="pointer-events-auto grid size-11 place-items-center rounded-full border border-white/70 bg-white/86 text-[#1e3a8a] shadow-[0_8px_20px_rgba(10,19,48,0.2)] backdrop-blur-sm transition-colors hover:bg-white"
              >
                <ArrowIcon d={arrow.d} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
