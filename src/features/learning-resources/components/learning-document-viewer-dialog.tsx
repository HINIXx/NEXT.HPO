"use client";

import { useEffect, useState } from "react";
import {
  learningDocumentUrl,
  learningDocuments,
  type LearningDocumentKey,
} from "../data/learning-resource-catalog";
import { LearningViewerDialogShell } from "./learning-viewer-dialog-shell";

/**
 * Modal xem trang học liệu tĩnh (biển báo, sa hình, động cơ 4 kỳ, 11 bài thực hành…) qua iframe cùng origin.
 * Tiêu đề đổi theo mục đang xem: trang con gửi postMessage `{ type: "hpo-learning-view", activeId }`.
 */
export function LearningDocumentViewerDialog({
  request,
  onClose,
  returnFocusTo,
}: {
  /** null = đóng. */
  request: { doc: LearningDocumentKey; target?: string } | null;
  onClose: () => void;
  returnFocusTo?: HTMLElement | null;
}) {
  const [activeId, setActiveId] = useState<string | undefined>();
  const doc = request ? learningDocuments[request.doc] : null;

  useEffect(() => {
    if (!request) return;
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      const data = event.data as { type?: string; activeId?: string };
      if (data?.type === "hpo-learning-view") setActiveId(data.activeId);
      // Esc bấm khi focus nằm trong iframe (Radix không nghe được phím trong iframe).
      if (data?.type === "hpo-learning-view-close") {
        setActiveId(undefined);
        onClose();
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [request, onClose]);

  const sectionId = activeId ?? request?.target;
  const title =
    (sectionId && doc?.sectionTitles?.[sectionId]) || doc?.defaultTitle || "";

  return (
    <LearningViewerDialogShell
      open={request !== null}
      onClose={() => {
        setActiveId(undefined);
        onClose();
      }}
      kicker={doc?.kicker ?? ""}
      title={title}
      returnFocusTo={returnFocusTo}
    >
      {request ? (
        <iframe
          key={`${request.doc}#${request.target ?? ""}`}
          src={learningDocumentUrl(request.doc, request.target)}
          title={`${doc?.kicker} — ${doc?.defaultTitle}`}
          className="block size-full border-0 bg-[#f8fafc]"
        />
      ) : null}
    </LearningViewerDialogShell>
  );
}
