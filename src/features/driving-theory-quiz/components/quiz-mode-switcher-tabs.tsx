import { cn } from "@/lib/utils";
import {
  quizEntryModeOptions,
  type QuizMode,
} from "../data/quiz-entry-mode-options";
import { quizFocusRingClassName } from "./quiz-workspace-shared-class-names";

/** 3 tab chuyển chế độ khi đang làm bài (V2 `#quizModeSwitcher`). ≤820px cuộn ngang 1 hàng. */
export function QuizModeSwitcherTabs({
  activeMode,
  onSelectMode,
}: {
  activeMode: QuizMode;
  onSelectMode: (mode: QuizMode) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Chọn chức năng"
      className="container-site mt-[14px] mb-[14px] flex gap-1.5 overflow-x-auto pb-1 min-[521px]:mt-[22px] min-[521px]:gap-2 min-[821px]:flex-wrap min-[821px]:overflow-visible min-[821px]:pb-0"
    >
      {quizEntryModeOptions.map((option) => {
        const active = option.mode === activeMode;
        return (
          <button
            key={option.mode}
            type="button"
            aria-pressed={active}
            onClick={() => onSelectMode(option.mode)}
            className={cn(
              "min-h-11 flex-none cursor-pointer rounded-lg border px-[13px] py-[10px] text-[14px] leading-[1.2] font-bold transition-colors duration-200 min-[521px]:px-[18px] min-[521px]:py-[11px] min-[521px]:text-[15px]",
              active
                ? "border-[#1e3a8a] bg-[#1e3a8a] text-white"
                : "border-[#d7dfeb] bg-white text-[#334155] hover:border-[#8da9d8] hover:text-[#1e3a8a]",
              quizFocusRingClassName,
            )}
          >
            {option.tabLabel}
          </button>
        );
      })}
    </div>
  );
}
