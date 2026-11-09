"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import type {
  CurriculumChapter,
  CurriculumPart,
  CurriculumPartTone,
} from "../data/smart-driving-curriculum-types";
import {
  CurriculumLessonRows,
  CurriculumRoadSignGroupGrid,
  CurriculumSituationCardGrid,
} from "./curriculum-learning-item-buttons";

/** Màu phần (V2 `.phan--I/II/III`): sọc + nhãn nền, chữ "07 chương". Môn 2–6 dùng màu riêng của môn qua `accent`. */
const partToneColors: Record<
  CurriculumPartTone,
  { solid: string; text: string }
> = {
  I: { solid: "#e21d3b", text: "#dc2626" },
  II: { solid: "#10833f", text: "#15803d" },
  III: { solid: "#a93613", text: "#c2410c" },
};

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ChapterRow({
  chapter,
  chipColor,
}: {
  chapter: CurriculumChapter;
  chipColor: string;
}) {
  const hasExtras = !!(
    chapter.lessons?.length ||
    chapter.situationCards?.length ||
    chapter.showsRoadSignGroups
  );
  return (
    <li className="rounded-xl border border-[#e2e8f5] bg-white">
      <div className="grid grid-cols-1 items-start gap-x-[18px] gap-y-2 px-4 py-3.5 min-[641px]:grid-cols-[minmax(108px,auto)_minmax(0,1fr)]">
        <span
          className="font-display w-fit min-w-[108px] rounded-full px-3 py-[5px] text-center text-[14px] leading-[1.5] font-extrabold tracking-[0.06em] whitespace-nowrap text-white uppercase"
          style={{ backgroundColor: chipColor }}
        >
          {chapter.label}
        </span>
        <div className="min-w-0">
          <p className="text-ink pt-1 text-[17px] leading-[1.4] font-semibold">
            {chapter.title}
          </p>
          {chapter.description ? (
            <p className="mt-1.5 max-w-[760px] text-[16px] leading-[1.5] font-medium text-[#334155]">
              {chapter.description}
            </p>
          ) : null}
        </div>
      </div>
      {hasExtras ? (
        <div className="grid gap-2.5 border-t border-[#eef2f7] px-3 pt-3 pb-3.5 min-[641px]:px-4">
          {chapter.showsRoadSignGroups ? <CurriculumRoadSignGroupGrid /> : null}
          {chapter.situationCards?.length ? (
            <CurriculumSituationCardGrid cards={chapter.situationCards} />
          ) : null}
          {chapter.lessons?.length ? (
            <CurriculumLessonRows lessons={chapter.lessons} />
          ) : null}
        </div>
      ) : null}
    </li>
  );
}

/**
 * 1 phần trong môn (V2 `.phan`): đầu phần có sọc màu + nhãn "Phần 1"/"Môn 2" + tên + số chương + mô tả, bấm để mở/đóng.
 * Nội dung chương luôn có trong HTML (SEO, tìm bằng Ctrl+F); khi đóng thì thu chiều cao 0 + `inert`.
 */
export function CurriculumPartCollapsiblePanel({
  part,
  accent,
  defaultOpen = false,
}: {
  part: CurriculumPart;
  /** Màu riêng của môn (môn 2–6); trống = theo màu phần. */
  accent?: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const bodyId = useId();
  const tone = partToneColors[part.tone];
  const solid = accent ?? tone.solid;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border bg-white transition-shadow",
        open
          ? "border-transparent shadow-[0_12px_32px_rgba(8,15,46,0.12)]"
          : "border-[#e2e8f5]",
      )}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={() => setOpen((value) => !value)}
        className="group grid w-full grid-cols-[6px_minmax(0,1fr)_46px] text-left"
      >
        <span
          aria-hidden="true"
          className="self-stretch"
          style={{ backgroundColor: solid }}
        />
        <span className="grid gap-2.5 px-4 py-4 min-[641px]:px-5 min-[641px]:py-[18px]">
          <span className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span
              className="font-display rounded-md px-3.5 py-[5px] text-[14px] leading-[1.35] font-bold tracking-[0.06em] text-white uppercase"
              style={{ backgroundColor: solid }}
            >
              {part.chip}
            </span>
            <span className="text-ink w-full text-[19px] leading-[1.35] font-semibold min-[641px]:w-auto min-[641px]:flex-1 min-[641px]:text-[20px]">
              {part.title}
            </span>
            <span
              className="font-display text-[14px] font-bold"
              style={{ color: accent ?? tone.text }}
            >
              {part.countLabel}
            </span>
          </span>
          {part.description ? (
            <span className="text-[16px] leading-[1.5] font-medium text-[#334155]">
              {part.description}
            </span>
          ) : null}
        </span>
        <span className="flex items-center justify-start">
          <span
            className={cn(
              "grid size-[30px] place-items-center rounded-full border transition-transform duration-300",
              open && "rotate-180",
            )}
            style={
              open
                ? {
                    borderColor: solid,
                    color: solid,
                    backgroundColor: "#f8fafc",
                  }
                : { borderColor: "#e2e8f5" }
            }
          >
            <ChevronDownIcon className="size-3.5" />
          </span>
        </span>
      </button>
      <div
        id={bodyId}
        inert={!open}
        className={cn(
          "ease-hp grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <ol className="grid gap-1.5 border-t border-[#e2e8f5] px-2.5 pt-4 pb-5 min-[641px]:px-4">
            {part.chapters.map((chapter) => (
              <ChapterRow
                key={chapter.label + chapter.title}
                chapter={chapter}
                chipColor={solid}
              />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
