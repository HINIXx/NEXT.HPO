"use client";

/* eslint-disable @next/next/no-img-element -- icon nhóm biển báo nhỏ, giữ đúng tỉ lệ ảnh gốc */
import { cn } from "@/lib/utils";
import type {
  SignGroupColorTone,
  SyllabusLearningResource,
} from "../data/subject-syllabus-framework-types";

export type LearningResourceOpener = (
  resource: SyllabusLearningResource,
  trigger: HTMLElement,
) => void;

const signColorClassName: Record<SignGroupColorTone, string> = {
  red: "text-[#dc2626]",
  yellow: "text-[#a16207]",
  blue: "text-primary",
  gray: "text-[#334155]",
};

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="white"
      className="ml-0.5 size-[18px]"
      aria-hidden="true"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

/** Nút mở học liệu; khi chưa có trình xem (`onOpen` trống) → khối chữ thường, không bấm được. */
function ResourceTrigger({
  onOpen,
  className,
  children,
}: {
  onOpen?: (trigger: HTMLElement) => void;
  className: string;
  children: React.ReactNode;
}) {
  if (!onOpen) return <div className={className}>{children}</div>;
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={(event) => onOpen(event.currentTarget)}
      className={cn(
        className,
        "transition-[background-color,border-color,box-shadow,translate]",
      )}
    >
      {children}
    </button>
  );
}

/** Nút bài giảng dạng hàng xám (V2 `.chap-2-title`, `.chap-lesson-wrapper`, `.mon-360-wrapper`). */
function LessonRowButton({
  badge,
  badgeClassName,
  title,
  showPlay,
  onClick,
}: {
  badge: string;
  badgeClassName: string;
  title: string;
  showPlay: boolean;
  onClick?: (trigger: HTMLElement) => void;
}) {
  return (
    <ResourceTrigger
      onOpen={onClick}
      className={cn(
        "flex min-h-[52px] w-full items-center gap-3 rounded-lg bg-[#edeef0] px-[18px] py-3 text-left",
        onClick &&
          "hover:bg-primary-50 focus-visible:outline-primary focus-visible:outline-2",
      )}
    >
      <span
        className={cn(
          "flex-none rounded-lg px-2.5 py-2 text-[14px] leading-none font-semibold text-white",
          badgeClassName,
        )}
      >
        {badge}
      </span>
      <span className="text-ink flex-1 text-[16px] font-semibold">{title}</span>
      {showPlay && onClick ? (
        <span className="bg-primary flex size-8 flex-none items-center justify-center rounded-full shadow-[2px_4px_12px_rgba(8,15,46,0.12)]">
          <PlayIcon />
        </span>
      ) : null}
    </ResourceTrigger>
  );
}

/**
 * Học liệu trong 1 chương của modal Chương trình khung — mỗi loại 1 kiểu nút như V2:
 * thẻ nhóm biển báo (lưới 5), hàng "BG"/"360°" có nút phát, ô 11 bài thực hành tổng hợp (lưới 3).
 * `onOpen` trống (chưa có trình xem học liệu — GĐ4b) → hiện dạng chữ, không có nút "chết".
 */
export function SyllabusLearningResourceButtons({
  resources,
  onOpen,
}: {
  resources: readonly SyllabusLearningResource[];
  onOpen?: LearningResourceOpener;
}) {
  const signGroups = resources.filter((r) => r.kind === "sign-group");
  const techniques = resources.filter((r) => r.kind === "driving-technique");
  const lessons = resources.filter(
    (r) =>
      r.kind === "lesson-video" ||
      r.kind === "engine-animation" ||
      r.kind === "cabin-360",
  );

  return (
    <div className="mt-3 grid w-full gap-3">
      {signGroups.length > 0 && (
        <div
          aria-label="Các nhóm biển báo hiệu"
          className="grid grid-cols-2 gap-2.5 min-[641px]:grid-cols-3 lg:grid-cols-5"
        >
          {signGroups.map((group) => (
            <ResourceTrigger
              key={group.target}
              onOpen={onOpen && ((trigger) => onOpen(group, trigger))}
              className={cn(
                "grid justify-items-center gap-1.5 rounded-xl border border-[#dbe3f0] bg-white px-2.5 py-3.5 text-center",
                onOpen &&
                  "hover:border-primary focus-visible:border-primary hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(30,64,175,0.12)]",
              )}
            >
              <span className="font-display text-ink text-[15px] font-bold">
                {group.name}
              </span>
              <span className="grid h-14 place-items-center">
                <img
                  src={group.iconSrc}
                  alt={group.name.replace(/^\d+\.\s*/, "")}
                  loading="lazy"
                  className="max-h-14 w-auto"
                />
              </span>
              <span className="text-[14px] text-[#334155]">
                {group.shape} ·{" "}
                <em
                  className={cn(
                    "font-bold not-italic",
                    signColorClassName[group.colorTone],
                  )}
                >
                  {group.colorLabel}
                </em>
              </span>
              <span className="font-display text-primary text-[20px] font-extrabold">
                {group.styleCount}{" "}
                <small className="text-[14px] font-bold">kiểu</small>
              </span>
            </ResourceTrigger>
          ))}
        </div>
      )}

      {lessons.map((lesson) => (
        <LessonRowButton
          key={lesson.kind === "lesson-video" ? lesson.target : lesson.kind}
          badge={lesson.kind === "cabin-360" ? "360°" : "BG"}
          badgeClassName={
            lesson.kind === "cabin-360"
              ? "bg-[#db2675]"
              : "bg-primary shadow-[0_2px_4px_#1e40af]"
          }
          title={lesson.title}
          showPlay={lesson.kind !== "engine-animation"}
          onClick={onOpen && ((trigger) => onOpen(lesson, trigger))}
        />
      ))}

      {techniques.length > 0 && (
        <div className="grid grid-cols-1 gap-3 min-[641px]:grid-cols-2 lg:grid-cols-3">
          {techniques.map((technique) => (
            <ResourceTrigger
              key={technique.target}
              onOpen={onOpen && ((trigger) => onOpen(technique, trigger))}
              className={cn(
                "font-display text-ink flex min-h-[52px] items-center gap-2.5 rounded-xl border border-[#dbe3f0] bg-white p-3.5 text-left text-[15px] font-bold",
                onOpen &&
                  "hover:border-primary focus-visible:border-primary hover:shadow-[0_10px_24px_rgba(30,64,175,0.1)]",
              )}
            >
              <span className="bg-primary grid size-8 flex-none place-items-center rounded-full text-[14px] font-extrabold text-white">
                {technique.number}
              </span>
              {technique.title}
            </ResourceTrigger>
          ))}
        </div>
      )}
    </div>
  );
}
