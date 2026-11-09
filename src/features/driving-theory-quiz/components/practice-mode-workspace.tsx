"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { answerLetter } from "../data/driving-theory-question-bank";
import type { PracticeQuizSession } from "../hooks/use-practice-quiz-session";
import type { QuestionBankStatus } from "../hooks/use-driving-theory-question-bank";
import {
  PracticeRestartConfirmDialog,
  PracticeResultDialog,
} from "./practice-result-and-restart-confirm-dialogs";
import { PracticeTopicSidebar } from "./practice-topic-sidebar";
import {
  QuizQuestionCardWithAnswerOptions,
  type QuizAnswerOptionState,
} from "./quiz-question-card-with-answer-options";
import { QuizQuestionQuickJumpPalette } from "./quiz-question-quick-jump-palette";
import {
  QuizProgressToolbar,
  QuizSelectedExamBanner,
} from "./quiz-selected-exam-banner-and-progress-toolbar";
import {
  quizPrimaryActionButtonClassName,
  quizSecondaryActionButtonClassName,
} from "./quiz-workspace-shared-class-names";
import { scrollToQuizAppSection } from "./scroll-to-quiz-app-section";

/** Phím tắt như V2: 1–4 chọn đáp án, ←/→ đổi câu (bỏ qua khi đang gõ chữ hoặc mở hộp thoại). */
const isTypingTarget = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));

/**
 * Chế độ ôn tập 600 câu (V2 `.quiz-shell` không có `is-mock-mode`).
 * Lưới: ≥1281 300|câu hỏi|320 · 821–1280 240|câu hỏi|270 · 521–820 210|câu hỏi + bảng chọn câu xuống dưới ·
 * ≤520 một cột: chương (cuộn ngang) → dải bài đang chọn → câu hỏi → lưu ý điểm liệt → bảng chọn câu.
 */
export function PracticeModeWorkspace({
  session,
  bankStatus,
}: {
  session: PracticeQuizSession;
  bankStatus: QuestionBankStatus;
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { question, questions, index, currentAnswer, activeTopic } = session;
  const total = questions.length;

  const paletteItems = useMemo(
    () => questions.map((_, i) => ({ answered: session.answers.has(i) })),
    [questions, session.answers],
  );

  const goNext = () => {
    if (!currentAnswer) return;
    if (session.isLast) {
      session.setResultOpen(true);
      return;
    }
    session.goTo(index + 1);
    scrollToQuizAppSection();
  };

  const dialogOpen = confirmOpen || session.resultOpen;
  useEffect(() => {
    if (dialogOpen || !question) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (isTypingTarget(event.target)) return;
      if (["1", "2", "3", "4"].includes(event.key)) {
        const choice = Number(event.key) - 1;
        if (choice < question.answers.length) {
          event.preventDefault();
          session.answer(choice);
        }
      } else if (event.key === "ArrowLeft" && index > 0) {
        event.preventDefault();
        session.goTo(index - 1);
      } else if (event.key === "ArrowRight" && index < total - 1) {
        event.preventDefault();
        session.goTo(index + 1);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [dialogOpen, question, index, total, session]);

  const optionState = (option: number): QuizAnswerOptionState => {
    if (!currentAnswer || !question) return "idle";
    if (option === question.correctIndex) return "correct";
    return option === currentAnswer.choice ? "wrong" : "idle";
  };

  const loadingCopy =
    bankStatus === "error"
      ? {
          heading: "Có lỗi xảy ra",
          title: "Không thể tải ngân hàng câu hỏi",
          progress: "Vui lòng tải lại trang",
        }
      : {
          heading: "Câu hỏi",
          title: "Đang tải ngân hàng câu hỏi…",
          progress: "Đang tải câu hỏi…",
        };

  return (
    <>
      <div className="container-site flex flex-col min-[521px]:grid min-[521px]:grid-cols-[210px_minmax(0,1fr)] min-[521px]:items-start min-[521px]:gap-[14px] min-[821px]:grid-cols-[240px_minmax(0,1fr)_270px] min-[821px]:gap-4 2xl:grid-cols-[300px_minmax(0,1fr)_320px] 2xl:gap-6">
        <PracticeTopicSidebar
          topics={session.topics}
          activeKey={activeTopic?.key ?? ""}
          onSelectTopic={session.selectTopic}
        />
        <QuizSelectedExamBanner
          label="Bài thi đang chọn"
          name={
            activeTopic
              ? `${activeTopic.label} — ${activeTopic.name}`
              : "Tất cả câu hỏi"
          }
          className="max-[521px]:order-3 max-[521px]:my-3 max-[521px]:flex-col max-[521px]:items-start max-[521px]:gap-1 min-[521px]:col-span-full min-[521px]:row-start-1 min-[521px]:mb-3 min-[821px]:mb-0"
        />
        <div className="min-w-0 max-[521px]:order-4 min-[521px]:col-start-2 min-[521px]:row-start-2">
          <QuizProgressToolbar
            label={
              question
                ? `Tiến độ ${index + 1} / ${total}`
                : loadingCopy.progress
            }
            score={`Điểm: ${session.correctCount}`}
            percent={question ? ((index + 1) / total) * 100 : 0}
          />
          <QuizQuestionCardWithAnswerOptions
            heading={
              question ? `Câu ${index + 1} / ${total}` : loadingCopy.heading
            }
            title={question?.title ?? loadingCopy.title}
            imageUrl={question?.imageUrl}
            isCritical={question?.isCritical}
            answers={question?.answers ?? []}
            getOptionState={optionState}
            answersLocked={Boolean(currentAnswer)}
            onSelectAnswer={session.answer}
            feedback={
              currentAnswer && question
                ? currentAnswer.correct
                  ? {
                      tone: "correct",
                      text: "Chính xác! Bạn đã chọn đúng đáp án.",
                    }
                  : {
                      tone: "wrong",
                      text: `Chưa chính xác. Đáp án đúng là: ${answerLetter(question.correctIndex)} ${question.answers[question.correctIndex] ?? ""}`,
                    }
                : null
            }
            actions={
              <>
                <button
                  type="button"
                  onClick={() => setConfirmOpen(true)}
                  className={quizSecondaryActionButtonClassName}
                >
                  ↻ Làm lại
                </button>
                <button
                  type="button"
                  disabled={!currentAnswer}
                  onClick={goNext}
                  className={quizPrimaryActionButtonClassName}
                >
                  {session.isLast ? "Xem kết quả" : "Câu tiếp theo"}
                  <span aria-hidden="true">→</span>
                </button>
              </>
            }
          />
        </div>
        <QuizQuestionQuickJumpPalette
          items={paletteItems}
          currentIndex={index}
          onSelect={session.goTo}
          className={cn(
            "max-[521px]:order-6 min-[521px]:col-span-full min-[521px]:row-start-3",
            "min-[821px]:col-3 min-[821px]:row-start-2",
          )}
        />
      </div>

      <PracticeRestartConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={() => {
          setConfirmOpen(false);
          session.restart();
        }}
      />
      <PracticeResultDialog
        open={session.resultOpen}
        onOpenChange={session.setResultOpen}
        correct={session.correctCount}
        answered={session.answers.size}
        total={total}
        onRestart={session.restart}
      />
    </>
  );
}
