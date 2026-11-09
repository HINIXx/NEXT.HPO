"use client";

/* eslint-disable @next/next/no-img-element -- icon nhóm biển báo nhỏ, giữ tỉ lệ gốc */
import type { ReactNode } from "react";
import { useOpenLearningResource } from "@/features/learning-resources/components/learning-resource-viewer-provider";
import type { LearningViewerRequest } from "@/features/learning-resources/data/learning-resource-catalog";
import {
  roadSignColorTextClassName,
  roadSignGroups,
} from "@/features/learning-resources/data/road-sign-groups";
import { cn } from "@/lib/utils";
import type {
  CurriculumLessonItem,
  CurriculumSituationCard,
} from "../data/smart-driving-curriculum-types";

const tagToneClassName = {
  blue: "bg-primary-50 text-primary",
  fire: "bg-[#fef2f2] text-[#b91c1c]",
  green: "bg-[#f0fdf4] text-[#15803d]",
} as const;

/** Nút mở học liệu; không có trình xem (V2 không có) hoặc chưa bọc provider → khối chữ thường. */
function LearningTrigger({
  viewer,
  className,
  interactiveClassName,
  children,
}: {
  viewer?: LearningViewerRequest;
  className: string;
  interactiveClassName: string;
  children: ReactNode;
}) {
  const open = useOpenLearningResource();
  if (!viewer || !open) return <div className={className}>{children}</div>;
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={(event) => open(viewer, event.currentTarget)}
      className={cn(
        className,
        interactiveClassName,
        "transition-[background-color,border-color,box-shadow,translate] duration-200",
      )}
    >
      {children}
    </button>
  );
}

/** Hàng bài giảng "BG"/"360°" (V2 `.chap` con trong `.chap-content-pad`). */
export function CurriculumLessonRows({
  lessons,
}: {
  lessons: readonly CurriculumLessonItem[];
}) {
  return (
    <div className="grid gap-2">
      {lessons.map((lesson) => (
        <LearningTrigger
          key={lesson.title}
          viewer={lesson.viewer}
          className="flex min-h-[60px] w-full items-center gap-3.5 rounded-xl bg-[#eef2f9] px-4 py-3 text-left min-[641px]:px-6"
          interactiveClassName="hover:bg-primary-50 focus-visible:outline-primary focus-visible:outline-2"
        >
          <span className="font-display bg-primary grid min-h-9 min-w-9 flex-none place-items-center rounded-lg px-1.5 text-[14px] font-extrabold text-white">
            {lesson.badge}
          </span>
          <span className="text-ink flex-1 text-[16px] leading-[1.45] font-semibold">
            {lesson.title}
          </span>
          {lesson.tag ? (
            <span
              className={cn(
                "rounded-full px-3 py-1 text-[14px] font-bold",
                tagToneClassName[lesson.tag.tone],
              )}
            >
              {lesson.tag.text}
            </span>
          ) : null}
          {lesson.viewer?.kind === "lesson" ? (
            <span
              aria-hidden="true"
              className="bg-primary-hover grid size-9 flex-none place-items-center rounded-full shadow-[2px_4px_12px_rgba(8,15,46,0.12)]"
            >
              <svg viewBox="0 0 24 24" fill="white" className="ml-0.5 size-4">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          ) : null}
        </LearningTrigger>
      ))}
    </div>
  );
}

/** Lưới 5 nhóm biển báo (V2 `.bb-grid`). */
export function CurriculumRoadSignGroupGrid() {
  return (
    <div className="grid grid-cols-2 gap-2.5 min-[641px]:grid-cols-3 lg:grid-cols-5">
      {roadSignGroups.map((group) => (
        <LearningTrigger
          key={group.target}
          viewer={{ kind: "document", doc: "bien-bao", target: group.target }}
          className="grid justify-items-center rounded-[14px] border border-[#e2e8f5] bg-white px-3 pt-4 pb-3.5 text-center"
          interactiveClassName="hover:border-primary focus-visible:border-primary hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(30,64,175,0.12)]"
        >
          <span className="text-ink mb-1.5 text-[16px] leading-[1.25] font-extrabold">
            {group.name}
          </span>
          <img
            src={group.iconSrc}
            alt={group.name.replace(/^\d+\.\s*/, "")}
            loading="lazy"
            className="mb-3 size-[72px] object-contain"
          />
          <span className="text-ink mb-2 text-[15px] font-semibold">
            {group.shape} ·{" "}
            <em
              className={cn(
                "font-display font-bold not-italic",
                roadSignColorTextClassName[group.colorTone],
              )}
            >
              {group.colorLabel}
            </em>
          </span>
          <span className="font-display text-primary text-[18px] leading-none font-bold">
            {group.styleCount}
            <small className="ml-1 text-[15px] font-semibold">kiểu</small>
          </span>
        </LearningTrigger>
      ))}
    </div>
  );
}

/** Thẻ đánh số (7 nguyên tắc sa hình, 11 bài thực hành tổng hợp — V2 `.sa-grid`). */
export function CurriculumSituationCardGrid({
  cards,
}: {
  cards: readonly CurriculumSituationCard[];
}) {
  return (
    <div className="grid grid-cols-1 gap-2.5 min-[641px]:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <LearningTrigger
          key={card.number}
          viewer={card.viewer}
          className="flex min-h-[56px] items-center gap-3 rounded-xl border border-[#e2e8f5] bg-white px-3.5 py-3 text-left"
          interactiveClassName="hover:border-primary focus-visible:border-primary hover:shadow-[0_10px_24px_rgba(30,64,175,0.1)]"
        >
          <span className="font-display bg-primary grid size-8 flex-none place-items-center rounded-full text-[15px] font-extrabold text-white">
            {card.number}
          </span>
          <span className="text-ink text-[16px] leading-[1.4] font-semibold">
            {card.title}
          </span>
        </LearningTrigger>
      ))}
    </div>
  );
}
