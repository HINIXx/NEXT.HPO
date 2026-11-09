import { cn } from "@/lib/utils";
import { quizPanelSurfaceClassName } from "./quiz-workspace-shared-class-names";

/** Dải "Bài thi đang chọn / Chế độ đang chọn" có vạch cam bên trái (V2 `.selected-exam`). */
export function QuizSelectedExamBanner({
  label,
  name,
  className,
}: {
  label: string;
  name: string;
  className?: string;
}) {
  return (
    <div
      aria-live="polite"
      className={cn(
        "border-decor-orange flex items-center gap-3 rounded-lg border-l-3 bg-white px-[18px] py-[13px]",
        className,
      )}
    >
      <span className="font-display text-[14px] leading-[normal] font-bold tracking-[0.1em] text-[#1e3a8a] uppercase">
        {label}
      </span>
      <strong className="font-display text-[16px] leading-[normal] font-bold text-[#0a1330]">
        {name}
      </strong>
    </div>
  );
}

/**
 * Thanh tiến độ trên thẻ câu hỏi (V2 `.quiz-toolbar`): nhãn trái · điểm/số câu đã làm · đồng hồ (thi thử).
 * ≤820px dính đỉnh màn hình khi cuộn như V2.
 */
export function QuizProgressToolbar({
  label,
  score,
  percent,
  clock,
  clockIsLow = false,
  isMockExam = false,
}: {
  label: string;
  score?: string;
  percent: number;
  clock?: string;
  clockIsLow?: boolean;
  isMockExam?: boolean;
}) {
  return (
    <div
      className={cn(
        quizPanelSurfaceClassName,
        "z-5 flex items-center gap-2 p-[11px] max-[821px]:sticky max-[821px]:top-0 min-[521px]:gap-[18px] min-[521px]:px-[21px] min-[521px]:py-[18px]",
        isMockExam && "max-[521px]:gap-[10px] max-[521px]:p-[13px]",
      )}
    >
      <div className="flex-1">
        <div
          className={cn(
            "mb-2 flex justify-between text-[14px]",
            isMockExam && "items-center gap-x-[7px] min-[521px]:gap-3",
            isMockExam && "max-[521px]:flex-wrap max-[521px]:gap-y-1",
          )}
        >
          <span
            className={cn(
              "text-[14px]",
              isMockExam && "flex-1 max-[521px]:basis-full",
            )}
          >
            {label}
          </span>
          {score ? (
            <strong
              className={cn(
                "font-bold text-[#1e3a8a]",
                isMockExam
                  ? "text-[14px] whitespace-nowrap tabular-nums min-[521px]:text-[15px]"
                  : "text-[16px]",
              )}
            >
              {score}
            </strong>
          ) : null}
          {clock ? (
            <strong
              aria-label={`Thời gian còn lại ${clock}`}
              className={cn(
                "text-[16px] font-extrabold whitespace-nowrap tabular-nums max-[521px]:ml-auto",
                clockIsLow ? "text-[#b91c1c]" : "text-[#c2410c]",
              )}
            >
              {clock}
            </strong>
          ) : null}
        </div>
        <div
          role="progressbar"
          aria-label="Tiến độ làm bài"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(percent)}
          className="h-[7px] overflow-hidden rounded-full bg-[#e9eef6]"
        >
          <span
            className="block h-full rounded-full bg-linear-90 from-[#1e3a8a] to-[#3e78db] transition-[width] duration-350"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
