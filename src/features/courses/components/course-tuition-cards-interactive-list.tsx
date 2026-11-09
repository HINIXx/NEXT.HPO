"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { CourseTuitionOffering } from "../data/course-tuition-offerings";
import { CourseCardVehicleStageScene } from "./course-card-vehicle-stage-scene";
import scene from "./courses-animated-scene.module.css";

/** Khớp breakpoint xếp dọc (V2 `max-width: 767px`). */
const STACKED_LAYOUT_QUERY = "(max-width: 767px)";
/** Sau thao tác phím: bỏ qua hover "giả" do bố cục dịch dưới con trỏ (V2 600ms). */
const KEYBOARD_HOVER_GUARD_MS = 600;

const EXPAND_EASE = "cubic-bezier(0.45,0,0.2,1)";

/**
 * 3 thẻ học phí (V2 `courses-demo-interactions.js`). Trạng thái = 1 thẻ đang chọn (`data-active`):
 *  - Máy tính (chuột): rê vào thẻ → thẻ mở rộng; rời khu 3 thẻ → bằng nhau. Khoảng hở giữa thẻ không reset.
 *  - Cảm ứng / điện thoại: chạm để chọn, chạm lại để bỏ, chạm ra ngoài → bằng nhau (bố cục ngang).
 *  - Bàn phím: Tab tới tên hạng (máy tính tự mở rộng như hover) + Enter/Space bật/tắt.
 * Không giấu nội dung: giá + thời gian học luôn hiện ở mọi khổ; chọn thẻ chỉ làm nổi bật.
 */
export function CourseTuitionCardsInteractiveList({
  courses,
}: {
  courses: readonly CourseTuitionOffering[];
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const lastPointerType = useRef("mouse");
  const ignoreHoverUntil = useRef(0);

  const isStacked = () => window.matchMedia(STACKED_LAYOUT_QUERY).matches;
  const cardIdOf = (target: EventTarget | null) =>
    (target as Element | null)?.closest<HTMLElement>("[data-course]")?.dataset
      .course ?? null;

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const rememberPointer = (event: PointerEvent) => {
      lastPointerType.current = event.pointerType;
    };
    // Cảm ứng ở bố cục ngang (tablet): chạm ra ngoài → 3 thẻ về bằng nhau.
    const resetOnOutsideTap = (event: MouseEvent) => {
      if (lastPointerType.current === "mouse" || isStacked()) return;
      if (!list.contains(event.target as Node)) setActiveId(null);
    };
    const stackedQuery = window.matchMedia(STACKED_LAYOUT_QUERY);
    const resetOnLayoutChange = () => setActiveId(null);
    // Tiết kiệm pin/CPU: dừng mọi chuyển động của section khi ra khỏi màn hình.
    const section = list.closest<HTMLElement>("section");
    const visibility = new IntersectionObserver(([entry]) => {
      if (section) section.dataset.paused = String(!entry.isIntersecting);
    });
    if (section) visibility.observe(section);
    document.addEventListener("pointerdown", rememberPointer);
    document.addEventListener("click", resetOnOutsideTap);
    stackedQuery.addEventListener("change", resetOnLayoutChange);
    return () => {
      document.removeEventListener("pointerdown", rememberPointer);
      document.removeEventListener("click", resetOnOutsideTap);
      stackedQuery.removeEventListener("change", resetOnLayoutChange);
      visibility.disconnect();
    };
  }, []);

  return (
    <div
      ref={listRef}
      className="flex flex-col gap-3.5 py-2 min-[768px]:flex-row min-[768px]:gap-[clamp(12px,1.4vw,20px)]"
      onPointerOver={(event) => {
        if (event.pointerType !== "mouse" || isStacked()) return;
        if (performance.now() < ignoreHoverUntil.current) return;
        const id = cardIdOf(event.target);
        if (id) setActiveId(id); // khoảng hở giữa thẻ → giữ nguyên
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse" && !isStacked()) setActiveId(null);
      }}
      onFocus={(event) => {
        if (isStacked() || !event.target.matches(":focus-visible")) return;
        setActiveId(cardIdOf(event.target));
      }}
      onBlur={(event) => {
        const list = listRef.current;
        if (
          isStacked() ||
          list?.contains(event.relatedTarget) ||
          list?.matches(":hover")
        )
          return;
        setActiveId(null);
      }}
      onClick={(event) => {
        const id = cardIdOf(event.target);
        if (!id) return;
        const viaKeyboard = event.detail === 0;
        if (viaKeyboard)
          ignoreHoverUntil.current =
            performance.now() + KEYBOARD_HOVER_GUARD_MS;
        if (
          !isStacked() &&
          lastPointerType.current === "mouse" &&
          !viaKeyboard
        ) {
          setActiveId(id);
          return;
        }
        setActiveId((current) => (current === id ? null : id));
      }}
    >
      {courses.map((course) => (
        <CourseTuitionCard
          key={course.id}
          course={course}
          active={course.id === activeId}
        />
      ))}
    </div>
  );
}

function CourseTuitionCard({
  course,
  active,
}: {
  course: CourseTuitionOffering;
  active: boolean;
}) {
  return (
    <article
      data-course={course.id}
      data-active={active}
      className={cn(
        scene.card,
        "group/card @container relative z-0 flex min-w-0 flex-none cursor-pointer touch-manipulation flex-col overflow-hidden rounded-[22px] border border-[#d8e3f4] bg-linear-to-b from-white to-[#f6f9ff] px-2.5 pt-1.5 pb-3 shadow-[inset_0_1px_0_#fff,0_14px_30px_-16px_rgba(15,45,107,0.3)] [-webkit-tap-highlight-color:transparent] min-[768px]:flex-[1_1_0] min-[768px]:pt-2",
        "data-[active=true]:z-2 data-[active=true]:-translate-y-1 data-[active=true]:border-[#3b82f6] data-[active=true]:shadow-[0_0_0_1.5px_rgba(59,130,246,0.6),0_0_34px_rgba(59,130,246,0.5),0_30px_52px_-20px_rgba(15,45,107,0.5)] min-[768px]:data-[active=true]:grow-[2.2] min-[1200px]:data-[active=true]:grow-[2.4]",
      )}
      style={{
        transition: `flex-grow 540ms ${EXPAND_EASE}, translate 420ms ${EXPAND_EASE}, box-shadow 420ms ease, border-color 420ms ease`,
      }}
    >
      <h3>
        <button
          type="button"
          className="flex w-full cursor-pointer items-center gap-2.5 px-0.5 pt-1.5 pb-2.5 text-left focus-visible:rounded-xl focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#3b82f6] min-[768px]:px-1 min-[768px]:pb-3"
        >
          <span
            aria-hidden="true"
            className={cn(
              "grid size-[42px] flex-none place-items-center rounded-xl bg-linear-[145deg] from-[#4f8dfb] via-[#1d4ed8] via-55% to-[#1e3a8a] font-extrabold text-white shadow-[inset_0_-3px_0_rgba(0,0,0,0.16),inset_0_2px_0_rgba(255,255,255,0.25),0_8px_14px_-8px_rgba(29,78,216,0.8)]",
              course.badge.length > 1
                ? "text-base tracking-[-0.02em]"
                : "text-[19px]",
            )}
          >
            {course.badge}
          </span>
          <span className="flex min-w-0 flex-1 flex-row items-baseline gap-2 leading-[1.22] min-[768px]:flex-none min-[768px]:flex-col min-[768px]:items-stretch min-[768px]:gap-0">
            <span className="text-[18px] font-extrabold whitespace-nowrap text-[#0f2d6b] min-[768px]:text-[clamp(16px,1.35vw,19px)]">
              {course.className}
            </span>
            <span className="sr-only"> - </span>
            <span className="text-[14px] font-semibold whitespace-nowrap text-[#1d4ed8] min-[768px]:text-[13.5px]">
              {course.vehicleType}
            </span>
          </span>
          <ChevronDown
            aria-hidden="true"
            strokeWidth={2.6}
            className="size-[30px] flex-none rounded-full bg-[#f0f6ff] p-1.5 text-[#1d4ed8] transition-[rotate,background-color] duration-[420ms] group-data-[active=true]/card:rotate-180 group-data-[active=true]/card:bg-[#dbe8ff] min-[768px]:hidden"
          />
        </button>
      </h3>

      <CourseCardVehicleStageScene vehicle={course.vehicle} />

      <dl
        id={course.priceListId}
        className="mt-2.5 flex flex-col min-[768px]:mt-3"
      >
        <div className="relative flex flex-col gap-px overflow-hidden rounded-xl border border-[#ffd6d6] bg-linear-to-r from-[#fff1f1] to-[#ffe9e9] px-3 pt-2 pb-[9px] transition-[background-color,border-color,box-shadow] duration-400 group-data-[active=true]/card:border-[#ffb0b0] group-data-[active=true]/card:from-[#ffe2e2] group-data-[active=true]/card:to-[#ffd2d2] group-data-[active=true]/card:shadow-[0_10px_20px_-12px_rgba(220,38,38,0.6)]">
          <dt className="text-[11.5px] font-bold tracking-[0.07em] whitespace-nowrap text-[#b4232f] uppercase">
            Học phí
          </dt>
          <dd className="origin-left self-start text-[21px] font-extrabold tracking-[-0.01em] whitespace-nowrap text-[#dc2626] tabular-nums transition-[scale,color] duration-[420ms] group-data-[active=true]/card:scale-[1.07] group-data-[active=true]/card:text-[#cf111e] min-[768px]:text-[clamp(17px,1.62vw,23px)]">
            {course.tuition}
          </dd>
        </div>
        <div className="mt-2 flex items-baseline justify-between gap-2.5 rounded-xl border border-[#dbe5fb] bg-[#f0f6ff] px-3 pt-2 pb-[9px]">
          <dt className="text-[14px] font-bold tracking-[0.07em] whitespace-nowrap text-[#0f2d6b] uppercase">
            Thời gian học
          </dt>
          <dd className="text-[18px] font-extrabold tracking-[-0.01em] whitespace-nowrap text-[#0f2d6b] tabular-nums min-[768px]:text-[17px]">
            {course.duration}
          </dd>
        </div>
      </dl>
    </article>
  );
}
