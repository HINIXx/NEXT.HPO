"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { answerLetter } from "../data/driving-theory-question-bank";
import {
  quizFocusRingClassName,
  quizPanelSurfaceClassName,
} from "./quiz-workspace-shared-class-names";

export type QuizAnswerOptionState = "idle" | "selected" | "correct" | "wrong";

const optionStateClassName: Record<QuizAnswerOptionState, string> = {
  idle: "border-[#dce4f0] bg-white",
  selected: "border-[#1e3a8a] bg-[#eef4ff]",
  correct: "border-[#60bd8d] bg-[#effaf4]",
  wrong: "border-[#eb9095] bg-[#fff3f3]",
};

const letterStateClassName: Record<QuizAnswerOptionState, string> = {
  idle: "bg-[#edf2fa] text-[#1e3a8a]",
  selected: "bg-[#edf2fa] text-[#1e3a8a]",
  correct: "bg-[#15803d] text-white",
  wrong: "bg-[#dc2626] text-white",
};

/** Ảnh minh họa từ LMS (kích thước không biết trước) → `<img>` thường; lỗi tải thì hiện dòng báo. */
function QuizQuestionIllustration({ src, alt }: { src: string; alt: string }) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  return (
    <figure className="relative mx-auto mt-[22px] mb-0.5 max-w-[680px] overflow-hidden border border-[#dce4f0] bg-[#f8fafc] text-center">
      {failedSrc === src ? (
        <div className="p-[55px] text-[14px]">Không tải được hình minh họa</div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- ảnh ngoài (lms.hpo.edu.vn), không biết kích thước
        <img
          src={src}
          alt={alt}
          onError={() => setFailedSrc(src)}
          className="mx-auto max-h-80 w-auto max-w-full object-contain"
        />
      )}
    </figure>
  );
}

/**
 * Thẻ câu hỏi dùng chung cho ôn tập + thi thử (V2 `#questionCard`):
 * "Câu x / y" + nhãn điểm liệt · tiêu đề · ảnh · 3–4 đáp án · ô phản hồi · hàng nút (truyền vào `actions`).
 */
export function QuizQuestionCardWithAnswerOptions({
  heading,
  title,
  imageUrl,
  isCritical,
  answers,
  getOptionState,
  answersLocked,
  onSelectAnswer,
  feedback,
  actions,
}: {
  heading: string;
  title: string;
  imageUrl?: string | null;
  isCritical?: boolean;
  answers: readonly string[];
  getOptionState: (index: number) => QuizAnswerOptionState;
  answersLocked: boolean;
  onSelectAnswer: (index: number) => void;
  feedback?: { tone: "correct" | "wrong"; text: string } | null;
  actions: ReactNode;
}) {
  return (
    <article
      aria-live="polite"
      className={cn(
        quizPanelSurfaceClassName,
        "mt-[14px] p-[19px] min-[521px]:p-6 min-[821px]:p-[38px]",
      )}
    >
      <div className="mb-[13px] flex items-center justify-between gap-3">
        <span className="font-display text-[14px] font-extrabold tracking-[0.08em] text-[#1e3a8a] uppercase">
          {heading}
        </span>
        {isCritical ? (
          <span className="font-display rounded-full bg-[#fff0f0] px-[9px] py-1.5 text-[14px] font-bold text-[#b91c1c] uppercase">
            Câu điểm liệt
          </span>
        ) : null}
      </div>
      <h2 className="font-display text-[19px] leading-[1.5] font-bold tracking-[-0.02em] text-[#0a1330] min-[521px]:text-[clamp(17px,2.2vw,18px)]">
        {title}
      </h2>
      {imageUrl ? (
        <QuizQuestionIllustration
          key={imageUrl}
          src={imageUrl}
          alt="Hình minh họa câu hỏi"
        />
      ) : null}
      <div className="mt-[29px] grid gap-[13px]">
        {answers.map((answer, index) => {
          const state = getOptionState(index);
          return (
            <button
              key={`${index}-${answer}`}
              type="button"
              disabled={answersLocked}
              data-answer-option={index}
              aria-pressed={state === "selected"}
              onClick={() => onSelectAnswer(index)}
              className={cn(
                "grid w-full grid-cols-[40px_1fr] items-start gap-[15px] rounded-[10px] border p-3 text-left text-black transition-[border-color,background-color,transform] duration-200 enabled:cursor-pointer min-[521px]:px-[19px] min-[521px]:py-[17px]",
                state === "idle" &&
                  "enabled:hover:translate-x-[3px] enabled:hover:border-[#8da9d8] enabled:hover:bg-[#f6f9ff]",
                optionStateClassName[state],
                quizFocusRingClassName,
              )}
            >
              <span
                className={cn(
                  "font-display grid size-9 place-items-center rounded-lg text-[16px] font-extrabold",
                  letterStateClassName[state],
                )}
              >
                {answerLetter(index)}
              </span>
              <span className="pt-1.5 text-[16px] leading-[1.55] min-[521px]:text-[17px]">
                {answer}
              </span>
            </button>
          );
        })}
      </div>
      {feedback ? (
        <p
          className={cn(
            "mt-[14px] border-l-3 px-[18px] py-[15px] text-[16px]",
            feedback.tone === "correct"
              ? "border-[#15803d] bg-[#effaf4] text-[#075d37]"
              : "border-[#dc2626] bg-[#fff3f3] text-[#991b1b]",
          )}
        >
          {feedback.text}
        </p>
      ) : null}
      <div className="mt-6 flex flex-col-reverse justify-between gap-3 border-t border-[#dce4f0] pt-5 min-[521px]:flex-row">
        {actions}
      </div>
    </article>
  );
}
