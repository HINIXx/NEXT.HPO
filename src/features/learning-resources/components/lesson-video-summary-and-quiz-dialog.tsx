"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  loadLessonRecords,
  youtubeEmbedUrl,
  youtubeVideoId,
  type LessonQuizQuestion,
  type LessonRecord,
} from "../data/learning-resource-catalog";
import { LearningViewerDialogShell } from "./learning-viewer-dialog-shell";

export type LessonDialogRequest = {
  title: string;
  lessonTarget?: string;
  videoUrl?: string;
};

/** 1 câu hỏi: chọn 1 lần, khóa lại; sai → tô đỏ đáp án chọn + tô xanh đáp án đúng (V2 `.quiz-option.correct/.wrong`). */
function LessonQuizQuestionCard({
  question,
}: {
  question: LessonQuizQuestion;
}) {
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <li className="rounded-2xl border border-[#dbe3f0] bg-white p-4">
      <p className="text-ink mb-3 text-[17px] leading-[1.5] font-semibold">
        <span className="text-primary font-display mr-1 font-extrabold">
          Câu {question.id}.
        </span>
        {question.question}
      </p>
      <div
        role="group"
        aria-label={`Đáp án câu ${question.id}`}
        className="grid gap-2"
      >
        {question.options.map((option) => {
          const isPicked = picked === option.id;
          const reveal = picked !== null;
          return (
            <button
              key={option.id}
              type="button"
              disabled={reveal}
              aria-pressed={isPicked}
              onClick={() => setPicked(option.id)}
              className={cn(
                "flex min-h-11 items-start gap-3 rounded-xl border px-3 py-2.5 text-left text-[16px] leading-[1.45] transition-colors",
                !reveal &&
                  "hover:border-primary hover:bg-primary-50 border-[#dbe3f0] bg-white",
                reveal &&
                  option.correct &&
                  "border-[#15803d] bg-[#f0fdf4] text-[#14532d]",
                reveal &&
                  isPicked &&
                  !option.correct &&
                  "border-[#dc2626] bg-[#fef2f2] text-[#7f1d1d]",
                reveal &&
                  !option.correct &&
                  !isPicked &&
                  "border-[#dbe3f0] bg-white opacity-70",
              )}
            >
              <span className="font-display grid size-7 flex-none place-items-center rounded-full bg-[#eef2ff] text-[14px] font-extrabold text-[#1e3a8a]">
                {option.id}
              </span>
              <span className="pt-0.5">{option.text}</span>
            </button>
          );
        })}
      </div>
      {picked !== null ? (
        <p
          role="status"
          className={cn(
            "mt-2 text-[15px] font-bold",
            question.options.find((o) => o.id === picked)?.correct
              ? "text-[#15803d]"
              : "text-[#dc2626]",
          )}
        >
          {question.options.find((o) => o.id === picked)?.correct
            ? "Chính xác!"
            : "Chưa đúng — đáp án đúng được tô xanh."}
        </p>
      ) : null}
    </li>
  );
}

function SummaryList({ label, items }: { label?: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="mt-2">
      {label ? (
        <p className="text-[15px] font-bold text-[#334155]">{label}</p>
      ) : null}
      <ul className="mt-1 grid gap-1">
        {items.map((item) => (
          <li
            key={item}
            className="before:bg-primary relative pl-4 text-[16px] leading-[1.5] before:absolute before:top-[0.65em] before:left-0 before:size-[5px] before:rounded-full before:content-['']"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Modal bài giảng (V2 `#Lesson02Modal`, `#LessonModal`, `#lessonModal`, trang chủ `#chapVideoModal`):
 * video YouTube (nếu có) + "Tóm tắt bài học" (nguyên nhân / biện pháp) + "Câu hỏi ôn tập".
 * ≥1101px 3 cột tóm tắt | video | câu hỏi; hẹp hơn xếp dọc. Không ẩn nội dung sau nút thu gọn (V2 có nút thu gọn 2 bên).
 */
export function LessonVideoSummaryAndQuizDialog({
  request,
  onClose,
  returnFocusTo,
}: {
  request: LessonDialogRequest | null;
  onClose: () => void;
  returnFocusTo?: HTMLElement | null;
}) {
  const [lessons, setLessons] = useState<LessonRecord[] | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!request || lessons) return;
    let cancelled = false;
    loadLessonRecords()
      .then((records) => !cancelled && setLessons(records))
      .catch(() => !cancelled && setLoadError(true));
    return () => {
      cancelled = true;
    };
  }, [request, lessons]);

  const videoId = request?.videoUrl
    ? youtubeVideoId(request.videoUrl)
    : undefined;
  const lesson = lessons?.find(
    (record) =>
      (request?.lessonTarget && record.target === request.lessonTarget) ||
      (videoId && youtubeVideoId(record.src) === videoId),
  );
  const embedId =
    videoId ?? (lesson?.src ? youtubeVideoId(lesson.src) : undefined);
  const hasNotes =
    !!lesson && (lesson.content.length > 0 || lesson.questions.length > 0);

  return (
    <LearningViewerDialogShell
      open={request !== null}
      onClose={onClose}
      kicker="Bài giảng"
      title={request?.title ?? ""}
      returnFocusTo={returnFocusTo}
      bodyClassName="overflow-y-auto overscroll-contain"
    >
      <div
        className={cn(
          "grid gap-4 p-3.5 min-[641px]:p-5",
          hasNotes &&
            embedId &&
            "xl:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.6fr)_minmax(280px,0.9fr)]",
        )}
      >
        {embedId ? (
          <div className="xl:order-2">
            <div className="shadow-hp-md aspect-video overflow-hidden rounded-2xl bg-black">
              <iframe
                src={youtubeEmbedUrl(embedId)}
                title={request?.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="size-full border-0"
              />
            </div>
          </div>
        ) : null}

        {lesson && lesson.content.length > 0 ? (
          <section
            aria-label="Tóm tắt bài học"
            className="rounded-2xl border border-[#dbe3f0] bg-white p-4 xl:order-1"
          >
            <h3 className="font-display text-ink mb-2 text-[18px] font-extrabold">
              Tóm tắt bài học
            </h3>
            <div className="grid gap-4">
              {lesson.content.map((block) => (
                <div key={block.id}>
                  <h4 className="font-display text-primary text-[16px] leading-[1.4] font-bold">
                    {block.title}
                  </h4>
                  <SummaryList label="Nguyên nhân:" items={block.causes} />
                  <SummaryList label="Biện pháp:" items={block.solutions} />
                  <SummaryList items={block.other} />
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {lesson && lesson.questions.length > 0 ? (
          <section aria-label="Câu hỏi ôn tập" className="xl:order-3">
            <h3 className="font-display text-ink mb-2 text-[18px] font-extrabold">
              Câu hỏi ôn tập
            </h3>
            <ol className="grid gap-3">
              {lesson.questions.map((question) => (
                <LessonQuizQuestionCard
                  key={`${lesson.target}-${question.id}`}
                  question={question}
                />
              ))}
            </ol>
          </section>
        ) : null}

        {!embedId && !lesson ? (
          <p className="py-10 text-center text-[17px] text-[#334155]">
            {loadError
              ? "Không tải được nội dung bài giảng. Vui lòng thử lại."
              : lessons
                ? "Bài giảng đang được cập nhật."
                : "Đang tải bài giảng…"}
          </p>
        ) : null}
      </div>
    </LearningViewerDialogShell>
  );
}
