"use client";

import { useCallback, useState, type ReactNode } from "react";
import { useOpenLearningResource } from "@/features/learning-resources/components/learning-resource-viewer-provider";
import { syllabusResourceToLearningViewerRequest } from "../data/syllabus-resource-to-learning-viewer-request";
import type { SyllabusModalLink } from "../data/training-time-allocation-table";
import { SubjectSyllabusFrameworkDialog } from "./subject-syllabus-framework-dialog";
import { SyllabusModalOpenContext } from "./syllabus-modal-open-context";

/**
 * Bọc khối Bước 2: cấp hàm "mở Chương trình khung" cho các ô môn học trong bảng (context) và vẽ 1 modal dùng chung.
 * Đóng modal → focus về ô vừa bấm (V2 `lastFocused`). Ô vừa bấm giữ trong state riêng, KHÔNG xóa khi đóng,
 * vì Radix gọi `onCloseAutoFocus` sau lần render đóng.
 */
export function SyllabusModalProviderWithDialog({
  children,
}: {
  children: ReactNode;
}) {
  const [openLink, setOpenLink] = useState<SyllabusModalLink | null>(null);
  const openLearningResource = useOpenLearningResource();
  const [lastTrigger, setLastTrigger] = useState<HTMLElement | null>(null);
  const open = useCallback((link: SyllabusModalLink, trigger: HTMLElement) => {
    setLastTrigger(trigger);
    setOpenLink(link);
  }, []);

  return (
    <SyllabusModalOpenContext.Provider value={open}>
      {children}
      <SubjectSyllabusFrameworkDialog
        link={openLink}
        onClose={() => setOpenLink(null)}
        returnFocusTo={lastTrigger}
        onOpenResource={
          openLearningResource
            ? (resource, trigger) =>
                openLearningResource(
                  syllabusResourceToLearningViewerRequest(resource),
                  trigger,
                )
            : undefined
        }
      />
    </SyllabusModalOpenContext.Provider>
  );
}
