"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  answerLetter,
  type QuizQuestion,
} from "../data/driving-theory-question-bank";

const criticalBadgeClassName =
  "font-display grid place-items-center rounded-full bg-[#b91c1c] font-extrabold leading-none text-white";

const legend = [
  { mark: "✓", label: "Trả lời đúng", className: "rounded-[5px] bg-[#15803d]" },
  {
    mark: "×",
    label: "Sai hoặc chưa làm",
    className: "rounded-[5px] bg-[#dc2626]",
  },
  { mark: "!", label: "Câu điểm liệt", className: "rounded-full bg-[#b91c1c]" },
] as const;

/** Ảnh trong phần đối chiếu: lỗi tải thì bỏ hẳn khung (như V2). */
function ReviewQuestionImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <figure className="mb-4 rounded-[10px] border border-[#e7ebf2] bg-[#f8f9fc] p-[10px] text-center">
      {/* eslint-disable-next-line @next/next/no-img-element -- ảnh ngoài (lms.hpo.edu.vn), không biết kích thước */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className="mx-auto block max-h-[360px] max-w-full object-contain"
      />
    </figure>
  );
}

/**
 * "Đối chiếu bài làm — Đáp án chi tiết" (V2 `.mock-review-section`): lưới số câu xanh/đỏ (! = điểm liệt),
 * bấm số → xem câu đó với đáp án đã chọn + đáp án đúng.
 */
export function MockExamAnswerReviewSection({
  questions,
  answers,
  correctCount,
}: {
  questions: readonly QuizQuestion[];
  answers: readonly (number | null)[];
  correctCount: number;
}) {
  const [reviewIndex, setReviewIndex] = useState(0);
  const question = questions[reviewIndex];
  const selected = answers[reviewIndex] ?? null;
  const isCorrect = question ? selected === question.correctIndex : false;

  return (
    <section aria-labelledby="mock-review-title" className="mt-5">
      <div className="mb-3 flex flex-col items-start justify-between gap-1 min-[521px]:flex-row min-[521px]:items-end min-[521px]:gap-3">
        <div>
          <p className="text-[14px] leading-[1.4] font-bold tracking-[0.1em] text-[#475569]">
            Đối chiếu bài làm
          </p>
          <h3
            id="mock-review-title"
            className="font-display mt-1 text-[20px] leading-[1.3] font-extrabold text-[#0a1330]"
          >
            Đáp án chi tiết
          </h3>
        </div>
        <span className="text-[15px] text-[#475569]">
          {correctCount} đúng · {questions.length - correctCount} sai hoặc bỏ
          trống
        </span>
      </div>
      <div
        aria-label="Chú giải kết quả câu hỏi"
        className="mb-[10px] flex flex-wrap gap-x-4 gap-y-[9px]"
      >
        {legend.map((item) => (
          <span
            key={item.label}
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#334155]"
          >
            <i
              aria-hidden="true"
              className={cn(
                "grid size-5 place-items-center text-[13px] leading-none font-extrabold text-white not-italic",
                item.className,
              )}
            >
              {item.mark}
            </i>
            {item.label}
          </span>
        ))}
      </div>
      <div
        role="group"
        aria-label="Chọn câu để xem đáp án chi tiết"
        className="mb-4 grid grid-cols-[repeat(5,46px)] justify-center gap-[7px] rounded-xl border border-[#e0e6ef] bg-[#f7f9fc] p-[10px] min-[521px]:grid-cols-[repeat(7,48px)] min-[521px]:gap-2 min-[521px]:p-[14px] min-[821px]:grid-cols-[repeat(10,48px)]"
      >
        {questions.map((item, index) => {
          const answer = answers[index] ?? null;
          const correct = answer === item.correctIndex;
          const current = index === reviewIndex;
          return (
            <button
              key={index}
              type="button"
              aria-pressed={current}
              aria-label={`Câu ${index + 1}, ${correct ? "đúng" : answer === null ? "chưa làm" : "sai"}${item.isCritical ? ", câu điểm liệt" : ""}`}
              onClick={() => setReviewIndex(index)}
              className={cn(
                "font-display focus-visible:outline-decor-orange relative grid aspect-square min-w-0 cursor-pointer place-items-center rounded-lg text-[15px] leading-none font-extrabold text-white transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[0_4px_10px_rgba(7,26,58,0.18)] focus-visible:outline-3 focus-visible:outline-offset-3",
                correct ? "bg-[#15803d]" : "bg-[#dc2626]",
                current &&
                  "outline-decor-orange z-1 outline-3 outline-offset-2",
              )}
            >
              {index + 1}
              {item.isCritical ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    criticalBadgeClassName,
                    "absolute -top-1 -right-1 size-5 border-2 border-white text-[12px]",
                  )}
                >
                  !
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {question ? (
        <article
          aria-live="polite"
          className="rounded-xl border border-[#e0e6ef] bg-white p-[14px] min-[521px]:p-5"
        >
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <strong className="font-display text-[16px] leading-[1.3] font-extrabold text-[#0a1330]">
              Câu {reviewIndex + 1}
            </strong>
            {question.isCritical ? (
              <span className="rounded-full bg-[#fff0ed] px-[9px] py-[5px] text-[14px] font-extrabold text-[#b91c1c]">
                ! Câu điểm liệt
              </span>
            ) : null}
            <span
              className={cn(
                "rounded-full px-[9px] py-[5px] text-[14px] font-extrabold",
                isCorrect
                  ? "bg-[#e8f5ee] text-[#117346]"
                  : "bg-[#fff0ed] text-[#b91c1c]",
              )}
            >
              {isCorrect
                ? "Trả lời đúng"
                : selected === null
                  ? "Chưa trả lời"
                  : "Trả lời sai"}
            </span>
          </div>
          <h4 className="mb-4 text-[17px] leading-[1.6] font-bold whitespace-pre-line text-[#0a1330]">
            {question.title}
          </h4>
          {question.imageUrl ? (
            <ReviewQuestionImage
              key={question.imageUrl}
              src={question.imageUrl}
              alt={`Hình minh họa câu ${reviewIndex + 1}`}
            />
          ) : null}
          <div className="grid gap-2">
            {question.answers.map((answer, index) => {
              const isAnswer = index === question.correctIndex;
              const isSelected = selected === index;
              const wrongPick = isSelected && !isAnswer;
              return (
                <div
                  key={`${index}-${answer}`}
                  className={cn(
                    "grid grid-cols-[34px_minmax(0,1fr)] items-center gap-[10px] rounded-[9px] border px-3 py-[11px] text-[16px] leading-[1.5] text-[#334155] min-[521px]:grid-cols-[34px_minmax(0,1fr)_auto]",
                    isAnswer
                      ? "border-[#9fd0b6] bg-[#edf8f2]"
                      : wrongPick
                        ? "border-[#e7a0a3] bg-[#fff1f1]"
                        : "border-[#e0e6ef] bg-white",
                  )}
                >
                  <span
                    className={cn(
                      "font-display grid size-8 place-items-center rounded-[7px] text-[15px] leading-none font-extrabold",
                      isAnswer
                        ? "bg-[#15803d] text-white"
                        : wrongPick
                          ? "bg-[#dc2626] text-white"
                          : "bg-[#edf1f7] text-[#334155]",
                    )}
                  >
                    {answerLetter(index)}
                  </span>
                  <span className="min-w-0 wrap-anywhere">{answer}</span>
                  {isSelected || isAnswer ? (
                    <span
                      className={cn(
                        "col-start-2 text-left text-[14px] font-extrabold min-[521px]:col-start-3 min-[521px]:text-right",
                        wrongPick ? "text-[#b91c1c]" : "text-[#117346]",
                      )}
                    >
                      {isSelected && isAnswer
                        ? "Bạn chọn · Đáp án đúng"
                        : isSelected
                          ? "Bạn đã chọn"
                          : "Đáp án đúng"}
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>
        </article>
      ) : null}
    </section>
  );
}
