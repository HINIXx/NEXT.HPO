"use client";

import { XIcon } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";
import { subjectSyllabusFrameworks } from "../data/subject-syllabus-framework-content";
import type { SyllabusModalLink } from "../data/training-time-allocation-table";
import {
  SyllabusLearningResourceButtons,
  type LearningResourceOpener,
} from "./syllabus-learning-resource-buttons";

/**
 * Modal "Chương trình khung" (V2 `#monModal`): đầu modal "CHƯƠNG TRÌNH KHUNG" + tên môn, thân cuộn riêng,
 * mỗi phần/mục = khung xám có thanh tiêu đề xanh, chương = nhãn + chữ, kèm danh sách con và học liệu.
 * Mở từ dòng con của bảng thực hành → chỉ hiện các mục `link.sections` (V2 `data-mon-sections`).
 */
export function SubjectSyllabusFrameworkDialog({
  link,
  onClose,
  returnFocusTo,
  onOpenResource,
}: {
  /** null = đóng. */
  link: SyllabusModalLink | null;
  onClose: () => void;
  /** Ô vừa bấm — nhận lại focus khi đóng (modal mở không qua Radix Trigger). */
  returnFocusTo?: HTMLElement | null;
  /** Trống = chưa có trình xem học liệu (GĐ4b): học liệu hiện dạng chữ. */
  onOpenResource?: LearningResourceOpener;
}) {
  const framework = link
    ? subjectSyllabusFrameworks.find((item) => item.key === link.subjectKey)
    : undefined;
  const parts =
    framework?.parts.filter(
      (part) =>
        !link?.sections?.length ||
        (part.sectionKey && link.sections.includes(part.sectionKey)),
    ) ?? [];

  return (
    <DialogPrimitive.Root
      open={link !== null}
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed inset-0 z-[300] bg-[rgba(10,19,48,0.62)] backdrop-blur-[3px]" />
        <DialogPrimitive.Content
          onCloseAutoFocus={(event) => {
            if (!returnFocusTo?.isConnected) return;
            event.preventDefault();
            returnFocusTo.focus({ preventScroll: true });
          }}
          aria-describedby={undefined}
          className={cn(
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-[0.97]",
            "fixed top-1/2 left-1/2 z-[301] flex max-h-[calc(100dvh-24px)] w-[calc(100vw-24px)] max-w-[1180px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[22px] bg-white outline-none min-[641px]:max-h-[calc(100dvh-64px)] min-[641px]:w-[calc(100vw-32px)]",
            "shadow-[0_28px_80px_rgba(10,19,48,0.32),0_0_0_1px_#dbe3f0]",
          )}
        >
          <header className="relative border-b border-[#dbe3f0] bg-[linear-gradient(180deg,#fbfcff,#fff)] py-5 pr-16 pl-5 min-[641px]:pt-[26px] min-[641px]:pr-16 min-[641px]:pb-[22px] min-[641px]:pl-[30px]">
            <p className="font-display text-primary mb-1.5 text-[15px] font-extrabold tracking-[0.16em] uppercase min-[641px]:text-[16px]">
              Chương trình khung
            </p>
            <DialogPrimitive.Title className="font-display text-ink text-[20px] leading-[1.25] font-extrabold text-balance min-[641px]:text-[24px]">
              {link?.title}
            </DialogPrimitive.Title>
            <DialogPrimitive.Close
              aria-label="Đóng"
              className="text-ink hover:border-primary hover:text-primary absolute top-4 right-4 grid size-11 place-items-center rounded-full border border-[#dbe3f0] bg-white transition-colors min-[641px]:top-[18px] min-[641px]:right-[18px]"
            >
              <XIcon className="size-5" strokeWidth={2.2} />
            </DialogPrimitive.Close>
          </header>

          <div
            data-syllabus-modal-body
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3.5 pt-5 pb-6 min-[641px]:px-[30px] min-[641px]:pt-6 min-[641px]:pb-[30px]"
          >
            <div className="grid gap-[26px]">
              {parts.map((part) => (
                <section
                  key={part.index}
                  className="overflow-hidden rounded-2xl border border-[#dbe3f0] bg-[#f5f7fc]"
                >
                  <h3 className="font-display flex items-center gap-3 bg-[linear-gradient(90deg,#1e40af,#1d3b8f)] px-4 py-3.5 text-[17px] leading-[1.3] font-extrabold text-white min-[641px]:px-5 min-[641px]:py-4">
                    <span className="flex-none rounded-full bg-white/18 px-3 py-1 text-[14px] leading-[1.3] tracking-[0.08em] uppercase">
                      {part.index}
                    </span>
                    {part.title}
                  </h3>
                  {part.chapters.length > 0 && (
                    <ol className="px-4 pt-3.5 pb-[18px] min-[641px]:px-5">
                      {part.chapters.map((chapter) => (
                        <li
                          key={chapter.label}
                          className="text-ink border-b border-dashed border-[#cfd7e8] py-3 text-[16px] leading-[1.72] font-semibold last:border-b-0"
                        >
                          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-3.5">
                            <span
                              className={cn(
                                "font-display text-[14px] font-extrabold tracking-[0.04em] text-[#1d3b8f]",
                                // "Chương VII" thẳng cột như V2 `.mon-chap-list--chapter`; số "1", "2.3" để tự nhiên.
                                chapter.label.startsWith("Chương") &&
                                  "min-[641px]:min-w-[74px]",
                              )}
                            >
                              {chapter.label}
                            </span>
                            <span>{chapter.title}</span>
                          </div>
                          {chapter.subItems && chapter.subItems.length > 0 && (
                            <ul className="mt-3 grid gap-1.5 rounded-xl bg-white px-4 py-3 font-normal">
                              {chapter.subItems.map((item) => (
                                <li
                                  key={item}
                                  className="before:bg-ink relative pl-4 before:absolute before:top-[0.75em] before:left-0 before:size-[5px] before:rounded-full before:content-['']"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          )}
                          {chapter.resources &&
                            chapter.resources.length > 0 && (
                              <SyllabusLearningResourceButtons
                                resources={chapter.resources}
                                onOpen={onOpenResource}
                              />
                            )}
                        </li>
                      ))}
                    </ol>
                  )}
                </section>
              ))}
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
