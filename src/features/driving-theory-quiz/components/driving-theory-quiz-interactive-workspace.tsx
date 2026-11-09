"use client";

import { useCallback, useState } from "react";
import type { MockExamMode } from "../data/mock-exam-paper-generator";
import type { QuizMode } from "../data/quiz-entry-mode-options";
import { useDrivingTheoryQuestionBank } from "../hooks/use-driving-theory-question-bank";
import { usePracticeQuizSession } from "../hooks/use-practice-quiz-session";
import {
  MockExamModeWorkspace,
  type MockPaperHistory,
} from "./mock-exam-mode-workspace";
import { PracticeModeWorkspace } from "./practice-mode-workspace";
import { QuizEntryModeCardGrid } from "./quiz-entry-mode-card-grid";
import { QuizModeSwitcherTabs } from "./quiz-mode-switcher-tabs";
import { QUIZ_APP_SECTION_ID } from "./scroll-to-quiz-app-section";

/**
 * Khu làm bài trang Ôn tập (V2 `.quiz-app-section`). Lúc export chỉ có 3 thẻ chọn hình thức (HTML tĩnh cho SEO);
 * bấm thẻ → tab chuyển chế độ + ôn tập 600 câu hoặc thi thử B/C1.
 * Tiến độ ôn tập và lịch sử đề thi giữ ở đây nên đổi qua lại giữa các tab không mất.
 */
export function DrivingTheoryQuizInteractiveWorkspace() {
  const { bank, status } = useDrivingTheoryQuestionBank();
  const practice = usePracticeQuizSession(bank);
  const [mode, setMode] = useState<QuizMode | null>(null);
  const [paperKey, setPaperKey] = useState(0);
  const [mockFinished, setMockFinished] = useState(false);
  const [paperHistory] = useState<MockPaperHistory>(() => new Map());

  const startMockExam = (nextMode: MockExamMode) => {
    setMode(nextMode);
    setPaperKey((key) => key + 1);
    setMockFinished(false);
  };

  const selectMode = (nextMode: QuizMode) => {
    if (nextMode === "practice") {
      setMode("practice");
      practice.setResultOpen(false);
      return;
    }
    // V2: bấm lại tab đang thi thì giữ nguyên đề; đã nộp bài hoặc đổi hạng thì tạo đề mới.
    if (nextMode !== mode || mockFinished) startMockExam(nextMode);
  };

  const handleMockFinished = useCallback(() => setMockFinished(true), []);

  return (
    <section id={QUIZ_APP_SECTION_ID} className="pb-[100px]">
      {mode === null ? (
        <QuizEntryModeCardGrid onSelectMode={selectMode} />
      ) : (
        <>
          <QuizModeSwitcherTabs activeMode={mode} onSelectMode={selectMode} />
          {mode === "practice" ? (
            <PracticeModeWorkspace session={practice} bankStatus={status} />
          ) : (
            <MockExamModeWorkspace
              mode={mode}
              bank={bank}
              bankStatus={status}
              history={paperHistory}
              paperKey={paperKey}
              onRequestNewPaper={() => startMockExam(mode)}
              onRequestPractice={() => selectMode("practice")}
              onFinished={handleMockFinished}
            />
          )}
        </>
      )}
    </section>
  );
}
