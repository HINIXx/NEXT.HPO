"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { formatPressDate } from "../data/press-coverage-articles";
import { PressCoverageNewsFeatureCard as FeatureCard } from "./press-coverage-news-feature-card";
import { usePressCoverage } from "./press-coverage-provider";

const NEWS_INTERVAL_MS = 6500;
const SMALL_COUNT = 3;
const barButtonClassName =
  "grid size-12 flex-none place-items-center rounded-[14px] bg-[#e2eaf7] text-primary transition-colors hover:bg-[#d3def3]";

/**
 * "BÀI BÁO VỀ HIỆP PHÁT" (V2 `.news-rot` + homepage-news-rotator.js): giới thiệu | 1 bài lớn | 3 bài nhỏ, tự đổi 6,5s
 * (thanh vàng chạy dưới ảnh lớn), bấm bài nhỏ → lên khung lớn, nút "Xem tất cả N bài" / trước / sau / tạm dừng.
 * Chỉ bài có ảnh (`anh`), mới nhất trước. Dừng khi rê chuột/focus/khuất; "giảm chuyển động" → mặc định dừng.
 */
export function PressCoverageNewsRotatorSection() {
  const { articles, openList } = usePressCoverage();
  const items = useMemo(
    () =>
      articles
        .filter((a) => a.image)
        .sort(
          (a, b) =>
            Date.parse(b.publishedAt ?? "0") - Date.parse(a.publishedAt ?? "0"),
        ),
    [articles],
  );
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = requestAnimationFrame(() => setUserPaused(true));
      return () => cancelAnimationFrame(frame);
    }
  }, []);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const running = inView && !hovering && !userPaused && items.length > 1;
  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(
      () => setIndex((i) => (i + 1) % items.length),
      NEWS_INTERVAL_MS,
    );
    return () => window.clearTimeout(timer);
  }, [index, running, items.length]);

  if (!items.length) return null;
  const at = (n: number) =>
    items[((n % items.length) + items.length) % items.length];
  const feature = at(index);
  const small = Array.from(
    { length: Math.min(SMALL_COUNT, items.length - 1) },
    (_, k) => ({ article: at(index + k + 1), offset: k + 1 }),
  );

  return (
    <section
      ref={rootRef}
      aria-labelledby="news-rot-title"
      aria-roledescription="carousel"
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
      className="relative bg-[#f5f8fd] bg-[radial-gradient(60%_80%_at_0%_100%,rgba(191,219,254,0.45),transparent_70%)] px-4 py-12 sm:px-9 sm:py-16"
    >
      <div className="mx-auto grid max-w-[1320px] gap-8 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.95fr)_minmax(0,1.6fr)] xl:gap-[clamp(20px,2.2vw,32px)]">
        <header>
          <span className="text-primary inline-block rounded-full bg-[#dbeafe] px-4 py-1.5 text-[16px] font-extrabold tracking-[0.03em] uppercase">
            Hiệp Phát
          </span>
          <h2
            id="news-rot-title"
            className="font-display text-ink mt-4 text-[clamp(26px,2.2vw,32px)] leading-[1.12] font-extrabold tracking-[-0.02em] uppercase"
          >
            <span className="xl:block">Bài báo về</span>{" "}
            <span className="xl:block">Hiệp Phát</span>
          </h2>
          <span
            aria-hidden="true"
            className="mt-4 mb-[18px] block h-1 w-14 rounded-full bg-[#2563eb]"
          />
          <p className="text-[16px] leading-[1.6] text-[#334155]">
            Bài viết, phóng sự trên báo điện tử, truyền hình và phát thanh về mô
            hình học lái xe tích hợp AI của Hiệp Phát.
          </p>
        </header>

        <FeatureCard
          article={feature}
          progressKey={index}
          running={running}
          intervalMs={NEWS_INTERVAL_MS}
        />

        <div>
          <ul className="grid gap-3">
            {small.map(({ article, offset }) => (
              <li key={article.order}>
                <button
                  type="button"
                  onClick={() => setIndex((i) => (i + offset) % items.length)}
                  aria-label={`Xem lớn: ${article.outlet} — ${article.title}`}
                  className="grid w-full grid-cols-[clamp(96px,30%,150px)_minmax(0,1fr)] items-start gap-3 rounded-2xl bg-white p-2.5 text-left shadow-[0_10px_26px_-20px_rgba(30,58,138,0.6)] transition-shadow hover:shadow-[0_14px_30px_-18px_rgba(30,58,138,0.7)]"
                >
                  <Image
                    src={article.image!}
                    alt=""
                    width={960}
                    height={540}
                    sizes="150px"
                    loading="lazy"
                    className="aspect-[4/3] w-full rounded-xl object-cover"
                  />
                  <span>
                    <span className="font-display line-clamp-3 text-[17px] leading-[1.35] font-bold text-[#1e3a8a]">
                      {article.title}
                    </span>
                    <span className="mt-1 block text-[15px] text-[#475569]">
                      {[article.outlet, formatPressDate(article.publishedAt)]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={(event) => openList(event.currentTarget)}
              className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-[#2563eb] px-[22px] text-[16px] font-extrabold text-white shadow-[0_10px_24px_-10px_rgba(37,99,235,0.6)]"
            >
              Xem tất cả {articles.length} bài <span aria-hidden="true">»</span>
            </button>
            <button
              type="button"
              aria-label="Bài trước"
              onClick={() =>
                setIndex((i) => (i - 1 + items.length) % items.length)
              }
              className={barButtonClassName}
            >
              <svg
                viewBox="0 0 24 24"
                className="size-5 fill-none stroke-current stroke-[2.4]"
                aria-hidden="true"
              >
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Bài tiếp theo"
              onClick={() => setIndex((i) => (i + 1) % items.length)}
              className={barButtonClassName}
            >
              <svg
                viewBox="0 0 24 24"
                className="size-5 fill-none stroke-current stroke-[2.4]"
                aria-hidden="true"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              type="button"
              aria-pressed={userPaused}
              aria-label={
                userPaused ? "Tự chuyển bài" : "Tạm dừng tự chuyển bài"
              }
              onClick={() => setUserPaused((v) => !v)}
              className={cn(
                barButtonClassName,
                userPaused && "bg-primary hover:bg-primary-hover text-white",
              )}
            >
              {userPaused ? (
                <svg
                  viewBox="0 0 24 24"
                  className="size-5 fill-current"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  className="size-5 fill-current"
                  aria-hidden="true"
                >
                  <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      <p className="sr-only" aria-live="off">
        {`Bài ${(index % items.length) + 1} trên ${items.length}: ${feature.outlet}, ${feature.title}`}
      </p>
    </section>
  );
}
