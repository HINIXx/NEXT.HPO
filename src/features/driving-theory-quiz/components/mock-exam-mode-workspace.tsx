"use client";

import type { QuestionBank } from "../data/driving-theory-question-bank";
import type { MockExamMode } from "../data/mock-exam-paper-generator";
import type { QuestionBankStatus } from "../hooks/use-driving-theory-question-bank";
import {
  MockExamPaperSession,
  type MockExamCallbacks,
  type MockPaperHistory,
} from "./mock-exam-timed-paper-session";
import { MockExamStatusPlaceholder } from "./mock-exam-workspace-shell-and-status-placeholder";

export type { MockPaperHistory } from "./mock-exam-timed-paper-session";

/**
 * Chế độ thi thử hạng B / C1 (V2 `mock-exam.js`). Chưa tải xong ngân hàng câu hỏi → thẻ "Đang tải đề thi";
 * tải xong → `MockExamPaperSession` (cha đổi `paperKey` để tạo đề mới).
 */
export function MockExamModeWorkspace({
  mode,
  bank,
  bankStatus,
  history,
  paperKey,
  ...callbacks
}: {
  mode: MockExamMode;
  bank: QuestionBank | null;
  bankStatus: QuestionBankStatus;
  history: MockPaperHistory;
  paperKey: number;
} & MockExamCallbacks) {
  if (bank)
    return (
      <MockExamPaperSession
        key={`${mode}-${paperKey}`}
        mode={mode}
        bank={bank}
        history={history}
        {...callbacks}
      />
    );
  const failed = bankStatus === "error";
  return (
    <MockExamStatusPlaceholder
      mode={mode}
      progressLabel={
        failed ? "Vui lòng tải lại trang" : "Vui lòng đợi trong giây lát"
      }
      heading="Đang tải đề thi"
      message={
        failed
          ? "Không thể tải ngân hàng câu hỏi."
          : "Đang tải ngân hàng câu hỏi…"
      }
    />
  );
}
