import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  mockExamConfigs,
  type MockExamMode,
} from "../data/mock-exam-paper-generator";
import { QuizQuestionCardWithAnswerOptions } from "./quiz-question-card-with-answer-options";
import {
  QuizProgressToolbar,
  QuizSelectedExamBanner,
} from "./quiz-selected-exam-banner-and-progress-toolbar";

/**
 * Khung chế độ thi thử (V2 `.quiz-shell.is-mock-mode`): dải "Chế độ đang chọn" · cột câu hỏi ·
 * bảng chọn câu 320px bên phải. Màn kết quả: 1 cột, không có bảng chọn câu. ≤820px xếp 1 cột.
 */
export function MockExamWorkspaceShell({
  mode,
  showResult = false,
  children,
  palette,
}: {
  mode: MockExamMode;
  showResult?: boolean;
  children: ReactNode;
  palette?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "container-site block min-[821px]:grid min-[821px]:items-start min-[821px]:gap-4 2xl:gap-6",
        showResult
          ? "min-[821px]:grid-cols-1"
          : "min-[821px]:grid-cols-[minmax(0,1fr)_320px]",
      )}
    >
      <QuizSelectedExamBanner
        label="Chế độ đang chọn"
        name={mockExamConfigs[mode].title}
        className="max-[821px]:my-3 min-[821px]:col-span-full min-[821px]:row-start-1"
      />
      <div className="min-w-0 min-[821px]:col-start-1 min-[821px]:row-start-2">
        {children}
      </div>
      {palette}
    </div>
  );
}

/** Thẻ câu hỏi chỉ hiện thông báo: đang tải đề · lỗi tải ngân hàng câu hỏi · không đủ câu để tạo đề. */
export function MockExamStatusPlaceholder({
  mode,
  progressLabel,
  heading,
  message,
  action,
}: {
  mode: MockExamMode;
  progressLabel: string;
  heading: string;
  message: string;
  action?: ReactNode;
}) {
  return (
    <MockExamWorkspaceShell mode={mode}>
      <QuizProgressToolbar label={progressLabel} percent={0} isMockExam />
      <QuizQuestionCardWithAnswerOptions
        heading={heading}
        title={message}
        answers={[]}
        getOptionState={() => "idle"}
        answersLocked
        onSelectAnswer={() => {}}
        actions={action}
      />
    </MockExamWorkspaceShell>
  );
}
