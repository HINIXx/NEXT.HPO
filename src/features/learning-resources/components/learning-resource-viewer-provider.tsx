"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { LearningViewerRequest } from "../data/learning-resource-catalog";
import { LearningDocumentViewerDialog } from "./learning-document-viewer-dialog";
import { LessonVideoSummaryAndQuizDialog } from "./lesson-video-summary-and-quiz-dialog";

export type OpenLearningResource = (
  request: LearningViewerRequest,
  trigger: HTMLElement,
) => void;

const LearningResourceViewerContext =
  createContext<OpenLearningResource | null>(null);

/** Hàm mở học liệu; null = chưa bọc provider (nơi gọi hiện học liệu dạng chữ). */
export const useOpenLearningResource = () =>
  useContext(LearningResourceViewerContext);

/**
 * Bọc khu có học liệu (Bước 2 trang Quy trình; trang chủ GĐ6): cấp `useOpenLearningResource()` và vẽ 2 modal dùng chung
 * — trang xem tĩnh (iframe) và bài giảng video + tóm tắt + câu hỏi. Đóng → focus về nút vừa bấm.
 */
export function LearningResourceViewerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [request, setRequest] = useState<LearningViewerRequest | null>(null);
  const [lastTrigger, setLastTrigger] = useState<HTMLElement | null>(null);
  const open = useCallback<OpenLearningResource>((next, trigger) => {
    setLastTrigger(trigger);
    setRequest(next);
  }, []);
  const close = useCallback(() => setRequest(null), []);

  return (
    <LearningResourceViewerContext.Provider value={open}>
      {children}
      <LearningDocumentViewerDialog
        request={request?.kind === "document" ? request : null}
        onClose={close}
        returnFocusTo={lastTrigger}
      />
      <LessonVideoSummaryAndQuizDialog
        request={request?.kind === "lesson" ? request : null}
        onClose={close}
        returnFocusTo={lastTrigger}
      />
    </LearningResourceViewerContext.Provider>
  );
}
