"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import { smartDrivingCurriculumSubjects } from "../data/smart-driving-curriculum-content";
import { CurriculumPartCollapsiblePanel } from "./curriculum-part-collapsible-panel";

/** Màu số môn (V2 process-readable-redesign.css `--hp-subject`); môn 01 giữ màu theo từng phần. */
const subjectAccent: Record<string, string> = {
  "01": "#dc2626",
  "02": "#1e40af",
  "03": "#78350f",
  "04": "#15803d",
  "05": "#c2410c",
  "06": "#2d3489",
};

/**
 * "Chương trình đào tạo lái xe ô tô thông minh" (V2 `#chuong-trinh-mon-hoc`) — khối dùng chung trang Quy trình + trang chủ.
 * 6 hàng môn trong 1 khung; bấm hàng → mở danh mục phần/chương (mỗi lúc 1 môn, như V2). Môn không có danh mục (05) không có nút.
 * Học liệu bấm mở cần `LearningResourceViewerProvider` bọc ngoài.
 */
export function SmartDrivingCurriculumAccordion({
  headingLevel = "h3",
}: {
  /** h3 trong trang Quy trình (dưới h2 Bước 2); trang chủ có thể dùng h2. */
  headingLevel?: "h2" | "h3";
}) {
  const [openNumber, setOpenNumber] = useState<string | null>(null);
  const baseId = useId();
  const Heading = headingLevel;

  return (
    <section
      id="chuong-trinh-mon-hoc"
      aria-labelledby={`${baseId}-title`}
      className="mt-8"
    >
      <Heading
        id={`${baseId}-title`}
        className="font-display text-ink [&_em]:text-primary mb-4 text-[clamp(21px,1.8vw,24px)] leading-[1.18] font-bold tracking-[-0.015em] [&_em]:not-italic"
      >
        Chương trình đào tạo lái xe ô tô <em>thông minh</em>
      </Heading>
      <ul
        data-reveal
        className="overflow-hidden rounded-2xl border border-[#dbe3f0] bg-white"
      >
        {smartDrivingCurriculumSubjects.map((subject) => {
          const isOpen = openNumber === subject.number;
          const hasDetail = subject.parts.length > 0;
          const detailId = `${baseId}-mon-${subject.number}`;
          const accent = subjectAccent[subject.number];
          const rowContent = (
            <>
              <span
                className="font-display pt-0.5 text-[20px] leading-none font-extrabold tracking-[0.02em]"
                style={{ color: accent }}
              >
                {subject.number}
              </span>
              <span className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-1.5">
                <span className="font-display text-ink flex-1 basis-[260px] text-[clamp(18px,1.5vw,21px)] leading-[1.35] font-bold">
                  {subject.title}
                </span>
                <span className="flex flex-wrap gap-2">
                  {subject.metas.map((meta) => (
                    <span
                      key={meta}
                      className="font-display rounded-full bg-[#eaf0fa] px-2.5 py-[3px] text-[14px] font-semibold text-[#334155]"
                    >
                      {meta}
                    </span>
                  ))}
                </span>
              </span>
            </>
          );

          return (
            <li
              key={subject.number}
              className="border-b border-[#e8edf4] last:border-b-0"
            >
              {hasDetail ? (
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={detailId}
                  onClick={() => setOpenNumber(isOpen ? null : subject.number)}
                  className="hover:bg-primary-50/50 grid w-full grid-cols-[40px_minmax(0,1fr)_44px] items-center gap-x-3.5 px-3 py-3.5 text-left transition-colors min-[641px]:grid-cols-[48px_minmax(0,1fr)_44px] min-[641px]:px-5 min-[641px]:py-4"
                >
                  {rowContent}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "text-primary grid size-10 place-items-center justify-self-end rounded-full border border-[#b8c5db] bg-white transition-transform duration-300",
                      isOpen && "rotate-180",
                    )}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-4"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>
              ) : (
                <div className="grid grid-cols-[40px_minmax(0,1fr)_44px] items-center gap-x-3.5 px-3 py-3.5 min-[641px]:grid-cols-[48px_minmax(0,1fr)_44px] min-[641px]:px-5 min-[641px]:py-4">
                  {rowContent}
                </div>
              )}
              {hasDetail ? (
                <div
                  id={detailId}
                  inert={!isOpen}
                  className={cn(
                    "ease-hp grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="grid gap-3.5 border-t border-[#e8edf4] bg-white px-2.5 pt-4 pb-5 min-[641px]:px-[22px] min-[641px]:pt-[22px] min-[641px]:pb-[26px]">
                      {subject.parts.map((part) => (
                        <CurriculumPartCollapsiblePanel
                          key={part.chip + part.title}
                          part={part}
                          accent={subject.number === "01" ? undefined : accent}
                          defaultOpen={subject.parts.length === 1}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
