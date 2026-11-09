"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { QuestionBank } from "../data/driving-theory-question-bank";
import {
  createMockExamPaper,
  formatCountdown,
  gradeMockExam,
  mockExamConfigs,
  type MockExamMode,
  type MockExamPaper,
  type PreviousMockPaper,
} from "../data/mock-exam-paper-generator";
import { MockExamAnswerReviewSection } from "./mock-exam-answer-review-section";
import { MockExamResultSummaryCard } from "./mock-exam-result-summary-card";
import {
  MockExamStatusPlaceholder,
  MockExamWorkspaceShell,
} from "./mock-exam-workspace-shell-and-status-placeholder";
import { QuizQuestionCardWithAnswerOptions } from "./quiz-question-card-with-answer-options";
import { QuizQuestionQuickJumpPalette } from "./quiz-question-quick-jump-palette";
import { QuizProgressToolbar } from "./quiz-selected-exam-banner-and-progress-toolbar";
import {
  quizPrimaryActionButtonClassName,
  quizSecondaryActionButtonClassName,
} from "./quiz-workspace-shared-class-names";
import { scrollToQuizAppSection } from "./scroll-to-quiz-app-section";

/** Đề vừa làm theo hạng — giữ ở component cha qua các lần làm đề mới. */
export type MockPaperHistory = Map<MockExamMode, PreviousMockPaper>;

export type MockExamCallbacks = {
  onRequestNewPaper: () => void;
  onRequestPractice: () => void;
  onFinished: () => void;
};

type CreatedPaper = { paper: MockExamPaper | null; error: string | null };

/** Một đề thi: tạo đề lúc gắn (cha đổi `key` mỗi lần "Đề mới"), đếm giờ, chấm điểm, hiện kết quả. */
export function MockExamPaperSession({
  mode,
  bank,
  history,
  onRequestNewPaper,
  onRequestPractice,
  onFinished,
}: {
  mode: MockExamMode;
  bank: QuestionBank;
  history: MockPaperHistory;
} & MockExamCallbacks) {
  const config = mockExamConfigs[mode];
  const [created] = useState<CreatedPaper>(() => {
    try {
      const paper = createMockExamPaper(bank, config, history.get(mode));
      return { paper, error: null };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Không thể tạo đề thi.";
      return { paper: null, error: message };
    }
  });
  const questions = useMemo(
    () => created.paper?.questions ?? [],
    [created.paper],
  );
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    questions.map(() => null),
  );
  const [index, setIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const timeLeft = Math.max(0, config.timeLimitMinutes * 60 - elapsed);
  const timeExpired = !submitted && timeLeft === 0;
  const finished = Boolean(created.paper) && (submitted || timeExpired);
  const active = Boolean(created.paper) && !finished;
  const answeredCount = answers.filter((answer) => answer !== null).length;
  const total = questions.length;
  const question = questions[index];

  // Ghi đề này vào lịch sử (đề sau không lặp câu / vị trí điểm liệt) + cuộn tới khu làm bài như V2.
  useEffect(() => {
    const paper = created.paper;
    if (paper)
      history.set(mode, {
        questionKeys: new Set(paper.questions.map((item) => item.key)),
        criticalPosition: paper.criticalPosition,
      });
    scrollToQuizAppSection();
  }, [created.paper, history, mode]);

  useEffect(() => {
    if (!active) return;
    const timer = window.setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => window.clearInterval(timer);
  }, [active]);

  useEffect(() => {
    if (!finished) return;
    onFinished();
    resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [finished, onFinished]);

  const goNext = () => {
    if (!active) return;
    if (index === total - 1) setSubmitted(true);
    else setIndex(index + 1);
  };
  const goPrevious = () => {
    if (active && index > 0) setIndex(index - 1);
  };
  const choose = (choice: number) => {
    if (!active) return;
    setAnswers((previous) =>
      previous.map((value, i) => (i === index ? choice : value)),
    );
  };

  // Phím tắt như V2: ←/→ đổi câu (→ ở câu cuối = nộp bài), 1–4 chọn đáp án.
  useEffect(() => {
    if (!active || !question) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const target = event.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      const digit = Number(event.key);
      if (event.key === "ArrowLeft") goPrevious();
      else if (event.key === "ArrowRight") goNext();
      else if (digit >= 1 && digit <= question.answers.length)
        choose(digit - 1);
      else return;
      event.preventDefault();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });

  if (!created.paper) {
    return (
      <MockExamStatusPlaceholder
        mode={mode}
        progressLabel="Chưa thể bắt đầu đề thi"
        heading={config.title}
        message={created.error ?? "Không thể tạo đề thi."}
        action={
          <button
            type="button"
            onClick={onRequestNewPaper}
            className={quizSecondaryActionButtonClassName}
          >
            ↻ Đề mới
          </button>
        }
      />
    );
  }

  if (finished) {
    const outcome = gradeMockExam(questions, answers, config);
    return (
      <MockExamWorkspaceShell mode={mode} showResult>
        <QuizProgressToolbar
          label="Đã hoàn thành đề thi"
          score={`${outcome.correct} / ${total} câu đúng`}
          percent={100}
          isMockExam
        />
        <div
          ref={resultRef}
          className="scroll-mt-3 px-3 pt-[15px] pb-5 min-[521px]:px-6 min-[521px]:pt-[22px] min-[521px]:pb-[26px]"
        >
          <MockExamResultSummaryCard
            outcome={outcome}
            config={config}
            total={total}
            timeExpired={timeExpired}
            onPractice={onRequestPractice}
            onNewExam={onRequestNewPaper}
          />
          <MockExamAnswerReviewSection
            questions={questions}
            answers={answers}
            correctCount={outcome.correct}
          />
        </div>
      </MockExamWorkspaceShell>
    );
  }

  return (
    <MockExamWorkspaceShell
      mode={mode}
      palette={
        <QuizQuestionQuickJumpPalette
          items={questions.map((item, i) => ({
            answered: answers[i] !== null,
            critical: item.isCritical,
          }))}
          currentIndex={index}
          showCriticalMarks
          onSelect={setIndex}
          className="min-[821px]:col-start-2 min-[821px]:row-start-2"
          footer={
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className={cn(
                quizPrimaryActionButtonClassName,
                "mx-[17px] mb-[17px] w-[calc(100%-34px)] justify-center max-[521px]:w-[calc(100%-34px)]",
              )}
            >
              Nộp bài thi
            </button>
          }
        />
      }
    >
      <QuizProgressToolbar
        label={`Đang xem câu ${index + 1} / ${total}`}
        score={`Đã trả lời ${answeredCount} / ${total}`}
        percent={(answeredCount / total) * 100}
        clock={formatCountdown(timeLeft)}
        clockIsLow={timeLeft <= 60}
        isMockExam
      />
      <QuizQuestionCardWithAnswerOptions
        heading={`Câu ${index + 1} / ${total}`}
        title={question.title}
        imageUrl={question.imageUrl}
        isCritical={question.isCritical}
        answers={question.answers}
        getOptionState={(option) =>
          answers[index] === option ? "selected" : "idle"
        }
        answersLocked={false}
        onSelectAnswer={choose}
        actions={
          <>
            <button
              type="button"
              onClick={onRequestNewPaper}
              className={quizSecondaryActionButtonClassName}
            >
              ↻ Đề mới
            </button>
            <button
              type="button"
              disabled={index === 0}
              onClick={goPrevious}
              className={quizSecondaryActionButtonClassName}
            >
              ← Câu trước
            </button>
            <button
              type="button"
              onClick={goNext}
              className={quizPrimaryActionButtonClassName}
            >
              {index === total - 1 ? "Nộp bài thi" : "Câu tiếp theo"}
              <span aria-hidden="true">→</span>
            </button>
          </>
        }
      />
    </MockExamWorkspaceShell>
  );
}
