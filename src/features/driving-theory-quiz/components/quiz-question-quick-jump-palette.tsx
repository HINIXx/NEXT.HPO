import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  quizFocusRingClassName,
  quizPanelSurfaceClassName,
} from "./quiz-workspace-shared-class-names";

export type QuizPaletteItem = {
  answered: boolean;
  critical?: boolean;
};

const legendSwatch = {
  unanswered: "bg-[#e9eef6]",
  answered: "bg-[#1e3a8a]",
  critical: "bg-[#dc2626]",
} as const;

const cornerBadgeClassName =
  "font-display absolute right-0.5 grid size-[15px] place-items-center rounded-full text-[11px] leading-none font-extrabold";

/**
 * Bảng "Chọn nhanh câu hỏi" (V2 `.question-palette`): chú giải · lưới 5 cột cuộn được · nút phụ (Nộp bài thi).
 * Ô đã trả lời: nền xanh + dấu ✓ góc dưới; câu điểm liệt (thi thử): dấu ! đỏ góc trên; câu đang xem: vòng cam.
 * ≥821px dính khi cuộn; ≤820px nằm dưới thẻ câu hỏi.
 */
export function QuizQuestionQuickJumpPalette({
  items,
  currentIndex,
  showCriticalMarks = false,
  onSelect,
  footer,
  className,
}: {
  items: readonly QuizPaletteItem[];
  currentIndex: number;
  showCriticalMarks?: boolean;
  onSelect: (index: number) => void;
  footer?: ReactNode;
  className?: string;
}) {
  const answeredCount = items.filter((item) => item.answered).length;
  const legend: [keyof typeof legendSwatch, string][] = [
    ["unanswered", "Chưa trả lời"],
    ["answered", "Đã trả lời"],
    ...(showCriticalMarks
      ? ([["critical", "Câu điểm liệt"]] as [
          keyof typeof legendSwatch,
          string,
        ][])
      : []),
  ];

  return (
    <aside
      aria-label="Chọn nhanh câu hỏi"
      className={cn(
        quizPanelSurfaceClassName,
        "mt-[18px] min-[821px]:sticky min-[821px]:top-[18px] min-[821px]:mt-0",
        className,
      )}
    >
      <div className="font-display border-b border-[#dce4f0] px-[22px] pt-[23px] pb-[18px] text-[18px] font-bold">
        Chọn nhanh câu hỏi
        <small className="mt-[3px] block font-sans text-[14px] font-normal text-black">
          {answeredCount} / {items.length} đã trả lời
        </small>
      </div>
      <div className="flex flex-wrap gap-3 border-b border-[#dce4f0] px-[15px] py-[11px] text-[14px]">
        {legend.map(([swatch, label]) => (
          <span key={swatch} className="flex items-center gap-1">
            <i
              aria-hidden="true"
              className={cn("size-[14px] rounded-[2px]", legendSwatch[swatch])}
            />
            {label}
          </span>
        ))}
      </div>
      <div className="grid max-h-80 grid-cols-5 gap-[7px] overflow-auto p-[17px] min-[821px]:max-h-[520px]">
        {items.map((item, index) => {
          const current = index === currentIndex;
          const critical = showCriticalMarks && item.critical;
          return (
            <button
              key={index}
              type="button"
              aria-current={current ? "step" : undefined}
              aria-label={`Câu ${index + 1}${item.answered ? ", đã trả lời" : ", chưa trả lời"}${critical ? ", câu điểm liệt" : ""}`}
              onClick={() => onSelect(index)}
              className={cn(
                "font-display relative aspect-square cursor-pointer rounded-[5px] border text-[14px] font-bold",
                item.answered
                  ? "border-[#1e3a8a] bg-[#1e3a8a] font-extrabold text-white shadow-[0_2px_5px_rgba(18,63,150,0.2)]"
                  : "border-[#dce4f0] bg-white text-black hover:border-[#1e3a8a] hover:text-[#1e3a8a]",
                current &&
                  "outline-decor-orange z-1 border-[#1e3a8a] outline-2 outline-offset-2",
                quizFocusRingClassName,
              )}
            >
              {index + 1}
              {item.answered ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    cornerBadgeClassName,
                    "bottom-0.5 bg-white text-[#1e3a8a]",
                  )}
                >
                  ✓
                </span>
              ) : null}
              {critical ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    cornerBadgeClassName,
                    "top-0.5 bg-[#b91c1c] text-white",
                  )}
                >
                  !
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
      {footer}
    </aside>
  );
}
