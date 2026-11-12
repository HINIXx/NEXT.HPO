"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/** 6 giây: đủ cho người lớn tuổi đọc hết slide trước khi tự chuyển (V2 AUTO_SLIDE_MS). */
const AUTO_SLIDE_MS = 6000;

function ChevronIcon({ d }: { d: string }) {
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
 * Slider đầu trang chủ (V2 `.company-slider` + homepage.js): cuộn ngang có snap (vuốt được), mũi tên ←/→, chấm chọn
 * (chấm đang chọn kéo dài thành thanh chạy 6s báo "sắp tự chuyển"), phím ←/→ trong track.
 * Tự chuyển dừng khi rê chuột/chạm/focus vào slider, tab ẩn, ra khỏi màn hình, hoặc bật "giảm chuyển động".
 * Slide không hiện được gắn `inert`. ≤1000px chiều cao track theo slide đang xem; rộng hơn các slide cao bằng nhau.
 */
export function HomeHeroIntroductionSlider({
  slides,
}: {
  /** `robotHookClassName`: class V2 mà bundle robot đọc (`hpo-digital-hero`, `company-banner`); wrapper slide đang xem có thêm `is-active`. */
  slides: readonly {
    label: string;
    content: ReactNode;
    robotHookClassName?: string;
  }[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [autoplaying, setAutoplaying] = useState(false);
  const [trackHeight, setTrackHeight] = useState<number | undefined>();
  const interacting = useRef({
    hovered: false,
    touching: false,
    visible: true,
  });

  const go = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      const target = (index + slides.length) % slides.length;
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      track.scrollTo({
        left: target * track.clientWidth,
        behavior: reduce ? "instant" : "smooth",
      });
    },
    [slides.length],
  );

  // Tự chuyển: hẹn lại mỗi khi slide đổi / trạng thái tương tác đổi.
  const [tick, setTick] = useState(0);
  const reschedule = useCallback(() => setTick((value) => value + 1), []);
  useEffect(() => {
    const root = rootRef.current;
    const { hovered, touching, visible } = interacting.current;
    const blocked =
      !visible ||
      document.hidden ||
      hovered ||
      touching ||
      (root?.contains(document.activeElement) ?? false) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // setState chỉ trong rAF (không đồng bộ trong effect).
    const frame = requestAnimationFrame(() => setAutoplaying(!blocked));
    if (blocked) return () => cancelAnimationFrame(frame);
    const timer = window.setTimeout(() => go(active + 1), AUTO_SLIDE_MS);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [active, go, tick]);

  // Theo dõi cuộn → slide đang xem; chiều cao track ≤1000px.
  useEffect(() => {
    const track = trackRef.current;
    const root = rootRef.current;
    if (!track || !root) return;
    let frame = 0;
    const sync = () => {
      frame = 0;
      const index = Math.max(
        0,
        Math.min(
          slides.length - 1,
          Math.round(track.scrollLeft / track.clientWidth),
        ),
      );
      setActive(index);
      const slide = track.children[index] as HTMLElement | undefined;
      setTrackHeight(
        window.matchMedia("(max-width: 1000px)").matches && slide
          ? slide.scrollHeight
          : undefined,
      );
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    const resize = new ResizeObserver(() => {
      track.scrollTo({
        left:
          Math.round(track.scrollLeft / track.clientWidth) * track.clientWidth,
        behavior: "instant",
      });
      sync();
    });
    resize.observe(track);
    Array.from(track.children).forEach((child) => resize.observe(child));
    const visibility = new IntersectionObserver(([entry]) => {
      interacting.current.visible = entry.isIntersecting;
      reschedule();
    });
    visibility.observe(root);
    document.addEventListener("visibilitychange", reschedule);
    sync();
    return () => {
      track.removeEventListener("scroll", onScroll);
      resize.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", reschedule);
      cancelAnimationFrame(frame);
    };
  }, [reschedule, slides.length]);

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Giới thiệu HPO"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse" || event.pointerType === "pen") {
          interacting.current.hovered = true;
          reschedule();
        }
      }}
      onPointerLeave={() => {
        interacting.current.hovered = false;
        reschedule();
      }}
      onPointerDown={() => {
        interacting.current.touching = true;
        reschedule();
      }}
      onPointerUp={() => {
        interacting.current.touching = false;
        reschedule();
      }}
      onFocus={reschedule}
      onBlur={() => requestAnimationFrame(reschedule)}
      className="relative bg-white"
    >
      <div
        ref={trackRef}
        id="companySliderTrack"
        tabIndex={0}
        aria-label="Vuốt hoặc dùng phím mũi tên để chuyển slide"
        onKeyDown={(event) => {
          if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
          event.preventDefault();
          go(active + (event.key === "ArrowRight" ? 1 : -1));
        }}
        style={{ height: trackHeight }}
        className="company-slider-track flex snap-x snap-mandatory [scrollbar-width:none] items-start overflow-x-auto overflow-y-hidden transition-[height] duration-300 outline-none min-[1001px]:items-stretch [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, index) => (
          <div
            key={slide.label}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} / ${slides.length}: ${slide.label}`}
            inert={index !== active}
            className={cn(
              "flex w-full flex-none snap-start snap-always flex-col [&>*]:flex-1",
              slide.robotHookClassName,
              index === active && "is-active",
            )}
          >
            {slide.content}
          </div>
        ))}
      </div>

      <div
        aria-label="Chọn banner"
        className="pointer-events-none absolute inset-0"
      >
        {[
          {
            step: -1,
            label: "Slide trước",
            d: "M15 5l-7 7 7 7",
            side: "left-2.5 min-[1001px]:left-9",
          },
          {
            step: 1,
            label: "Slide tiếp theo",
            d: "M9 5l7 7-7 7",
            side: "right-2.5 min-[1001px]:right-9",
          },
        ].map((button) => (
          <button
            key={button.step}
            type="button"
            aria-label={button.label}
            aria-controls="companySliderTrack"
            onClick={() => go(active + button.step)}
            className={cn(
              "hover:border-primary hover:text-primary pointer-events-auto absolute top-[clamp(180px,47%,424px)] z-10 grid size-11 place-items-center rounded-full border border-[#bacbe5] bg-white/92 text-[#102a56] shadow-[0_4px_18px_rgba(16,42,86,0.15)] transition-colors",
              button.side,
            )}
          >
            <ChevronIcon d={button.d} />
          </button>
        ))}
        <div className="pointer-events-auto absolute bottom-[22px] left-1/2 flex -translate-x-1/2 items-center gap-0.5 rounded-full bg-white/92 px-1.5 shadow-[0_4px_16px_rgba(16,42,86,0.15)]">
          {slides.map((slide, index) => {
            const isActive = index === active;
            return (
              <button
                key={slide.label}
                type="button"
                aria-label={`Slide ${index + 1}: ${slide.label}`}
                aria-controls="companySliderTrack"
                aria-current={isActive ? "true" : undefined}
                onClick={() => go(index)}
                className="grid h-11 min-w-6 place-items-center"
              >
                <span
                  className={cn(
                    "relative block h-2 overflow-hidden rounded-full bg-[#c8d3e8] transition-[width] duration-300",
                    isActive ? "w-9" : "w-2",
                  )}
                >
                  {isActive ? (
                    <span
                      className="bg-primary absolute inset-0 origin-left rounded-full"
                      style={{
                        animation: autoplaying
                          ? `hpo-slide-progress ${AUTO_SLIDE_MS}ms linear forwards`
                          : "none",
                      }}
                    />
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
