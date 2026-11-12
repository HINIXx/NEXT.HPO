"use client";

import Image from "next/image";
import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import type { GalleryPhoto } from "../data/gallery-photo-types";
import { PhotoGalleryFullscreenLightboxDialog } from "./photo-gallery-fullscreen-lightbox-dialog";

const AUTOPLAY_MS = 3500;

/** Kiểu chấm chọn ảnh theo khối V2. */
const dotStyles = {
  /** `.facility-carousel`: góc phải trên, chấm 5px, tối đa 170px rồi xuống dòng. */
  facility: {
    wrap: "top-[22px] right-[22px] max-w-[170px] flex-wrap justify-end",
    dot: "h-[5px] w-[5px]",
    active: "w-[18px]",
  },
  /** `.exam-gallery`: góc phải trên, chấm 7px. */
  exam: { wrap: "top-5 right-5", dot: "h-[7px] w-[7px]", active: "w-[22px]" },
  /** `.event-carousel`: góc phải dưới, chấm 7px. */
  event: {
    wrap: "right-4 bottom-3.5",
    dot: "h-[7px] w-[7px]",
    active: "w-[22px]",
  },
} as const;

type PhotoCrossfadeCarouselWithLightboxProps = {
  photos: readonly GalleryPhoto[];
  /** Tên vùng cho trình đọc màn hình, ví dụ "Hình ảnh sân sát hạch Hiệp Phát". */
  label: string;
  dotStyle: keyof typeof dotStyles;
  /** Nhãn nút ←/→ (V2 khác nhau từng khối). */
  previousLabel?: string;
  nextLabel?: string;
  /** Nút ←/→ chỉ hiện khi rê chuột (V2 thẻ sự kiện); ≤600px luôn hiện. */
  revealArrowsOnHover?: boolean;
  /** Lớp phủ tối + chú thích nằm trên ảnh (không chặn bấm). */
  overlay?: ReactNode;
  sizes: string;
  className?: string;
};

/**
 * Băng chuyền ảnh mờ dần (V2 `[data-carousel]`): tự chuyển 3,5s, dừng khi rê chuột / focus / ra khỏi màn hình /
 * tab ẩn / giảm chuyển động. Bấm ảnh → hộp xem ảnh lớn. Chỉ gắn ảnh đang xem + 2 ảnh kề để không tải cả chục ảnh 1 lúc.
 */
export function PhotoCrossfadeCarouselWithLightbox({
  photos,
  label,
  dotStyle,
  previousLabel = "Ảnh trước",
  nextLabel = "Ảnh tiếp theo",
  revealArrowsOnHover = false,
  overlay,
  sizes,
  className,
}: PhotoCrossfadeCarouselWithLightboxProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mountedIndexes, setMountedIndexes] = useState(
    () => new Set([0, 1 % photos.length, photos.length - 1]),
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isOnScreen, setIsOnScreen] = useState(false);

  const showSlide = useCallback(
    (index: number) => {
      const next = (index + photos.length) % photos.length;
      setActiveIndex(next);
      setMountedIndexes((previous) => {
        const neighbours = [next, (next + 1) % photos.length];
        if (neighbours.every((i) => previous.has(i))) return previous;
        return new Set([...previous, ...neighbours]);
      });
    },
    [photos.length],
  );

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIsOnScreen(entry.isIntersecting),
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const canAutoplay =
    isOnScreen && !isPaused && lightboxIndex === null && photos.length > 1;
  useEffect(() => {
    if (!canAutoplay) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) showSlide(activeIndex + 1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [canAutoplay, activeIndex, showSlide]);

  const dots = dotStyles[dotStyle];
  const arrowClassName = cn(
    "absolute top-1/2 z-3 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/45 bg-[rgba(7,26,58,0.62)] text-white transition-[opacity,background-color] duration-200 hover:bg-[#dc2626] focus-visible:opacity-100",
    revealArrowsOnHover && "sm:opacity-0 sm:group-hover:opacity-100",
  );

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="băng chuyền"
      aria-label={label}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className={cn("group relative overflow-hidden", className)}
    >
      {photos.map((photo, index) =>
        mountedIndexes.has(index) ? (
          <Image
            key={`${photo.src}-${index}`}
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={sizes}
            aria-hidden={index !== activeIndex}
            className={cn(
              "object-cover transition-[opacity,scale] duration-[650ms,1200ms] ease-[ease,var(--ease-hp)]",
              index === activeIndex
                ? "z-1 scale-100 opacity-100"
                : "scale-[1.025] opacity-0",
            )}
          />
        ) : null,
      )}

      <button
        type="button"
        aria-label={`Phóng to ảnh: ${photos[activeIndex]?.alt}`}
        onClick={() => setLightboxIndex(activeIndex)}
        className="absolute inset-0 z-1 cursor-zoom-in"
      />

      {overlay ? <Fragment key="carousel-overlay">{overlay}</Fragment> : null}

      <button
        type="button"
        aria-label={previousLabel}
        onClick={() => showSlide(activeIndex - 1)}
        className={cn(arrowClassName, "left-4")}
      >
        ←
      </button>
      <button
        type="button"
        aria-label={nextLabel}
        onClick={() => showSlide(activeIndex + 1)}
        className={cn(arrowClassName, "right-4")}
      >
        →
      </button>

      <div className={cn("absolute z-3 flex gap-1.5", dots.wrap)}>
        {photos.map((photo, index) => (
          <button
            key={`${photo.src}-${index}`}
            type="button"
            aria-label={`Xem ảnh ${index + 1}`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => showSlide(index)}
            className={cn(
              "rounded-full transition-[width,background-color] duration-250",
              dots.dot,
              index === activeIndex
                ? cn(dots.active, "bg-[#dc2626]")
                : "bg-white/55",
            )}
          />
        ))}
      </div>

      <PhotoGalleryFullscreenLightboxDialog
        photos={photos}
        openIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
        onClose={() => setLightboxIndex(null)}
      />
    </div>
  );
}

/** Lớp tối dưới đáy ảnh + số thứ tự vòng tròn + tiêu đề/mô tả (V2 `.facility-card__overlay`, `.exam-gallery__label`). */
export function PhotoCarouselNumberedCaptionOverlay({
  number,
  title,
  description,
  titleClassName,
}: {
  number: string;
  title: string;
  description: string;
  titleClassName: string;
}) {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-1 bg-[linear-gradient(0deg,rgba(5,16,40,0.88),transparent_62%)]"
      />
      <div className="pointer-events-none absolute inset-x-[26px] bottom-6 z-2 flex items-end gap-[15px] text-white">
        <span
          aria-hidden="true"
          className="font-display text-emphasis-yellow grid size-[34px] flex-none place-items-center rounded-full border border-white/30 text-[14px] font-bold"
        >
          {number}
        </span>
        <div>
          <h3
            className={cn(
              "font-display leading-[normal] font-bold",
              titleClassName,
            )}
          >
            {title}
          </h3>
          <p className="text-[16px]">{description}</p>
        </div>
      </div>
    </>
  );
}
