"use client";

import { Dialog as DialogPrimitive } from "radix-ui";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * 2 hộp thoại chế độ ôn tập (V2 `#resultModal`, `#restartConfirm`) — Radix Dialog: khóa cuộn, Esc đóng, giữ focus.
 * Nút chính cam đậm DS #c2410c (V2 cam #ff6b35 chữ trắng chỉ đạt 2,8:1).
 */
const dialogCtaClassName =
  "font-display min-h-11 cursor-pointer rounded-[9px] bg-[#c2410c] text-[16px] font-bold text-white transition-colors hover:bg-[#9a3412]";

function QuizDialogShell({
  open,
  onOpenChange,
  overlayClassName,
  className,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  overlayClassName: string;
  className: string;
  children: ReactNode;
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed inset-0 z-[300]",
            overlayClassName,
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 fixed top-1/2 left-1/2 z-[301] w-[calc(100%-40px)] -translate-x-1/2 -translate-y-1/2 bg-white text-center outline-none",
            className,
          )}
        >
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

const practiceResultTitle = (percent: number) =>
  percent >= 80
    ? "Kết quả rất tốt!"
    : percent >= 50
      ? "Bạn đang tiến bộ"
      : "Hãy luyện tập thêm";

/** Kết quả sau câu cuối của nội dung đang ôn: vòng % · đúng/sai · "Làm lại nội dung này". */
export function PracticeResultDialog({
  open,
  onOpenChange,
  correct,
  answered,
  total,
  onRestart,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  correct: number;
  answered: number;
  total: number;
  onRestart: () => void;
}) {
  const percent = total ? Math.round((correct / total) * 100) : 0;
  return (
    <QuizDialogShell
      open={open}
      onOpenChange={onOpenChange}
      overlayClassName="bg-[rgba(7,26,58,0.8)] backdrop-blur-[8px]"
      className="max-w-[460px] rounded-lg p-[38px]"
    >
      <DialogPrimitive.Close
        aria-label="Đóng kết quả"
        className="absolute top-1.5 right-1.5 grid size-11 cursor-pointer place-items-center text-[27px] leading-none"
      >
        ×
      </DialogPrimitive.Close>
      <div
        className="relative mx-auto mb-5 grid size-[120px] place-items-center rounded-full after:absolute after:size-[92px] after:rounded-full after:bg-white after:content-['']"
        style={{
          background: `conic-gradient(#1e3a8a ${percent}%, #e7edf6 0)`,
        }}
      >
        <strong className="font-display relative z-1 text-[24px] font-extrabold">
          {percent}%
        </strong>
      </div>
      <span className="font-display text-[14px] font-bold tracking-[0.13em] text-[#1e3a8a] uppercase">
        Hoàn thành nội dung ôn tập
      </span>
      <DialogPrimitive.Title className="font-display my-2 text-[25px] font-bold text-[#0a1330]">
        {practiceResultTitle(percent)}
      </DialogPrimitive.Title>
      <DialogPrimitive.Description className="text-[14px]">
        Bạn đã trả lời đúng {correct} / {total} câu hỏi ({answered} câu đã làm).
      </DialogPrimitive.Description>
      <div className="my-[22px] grid grid-cols-2 border border-[#dce4f0]">
        <div className="p-4">
          <strong className="font-display block text-[30px] font-extrabold text-[#15803d]">
            {correct}
          </strong>
          <span className="text-[14px]">Trả lời đúng</span>
        </div>
        <div className="border-l border-[#dce4f0] p-4">
          <strong className="font-display block text-[30px] font-extrabold text-[#dc2626]">
            {answered - correct}
          </strong>
          <span className="text-[14px]">Trả lời sai</span>
        </div>
      </div>
      <button
        type="button"
        onClick={onRestart}
        className={cn(dialogCtaClassName, "w-full p-[14px]")}
      >
        Làm lại nội dung này
      </button>
    </QuizDialogShell>
  );
}

/** Hỏi lại trước khi xóa tiến độ ôn tập ("↻ Làm lại"). */
export function PracticeRestartConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}) {
  return (
    <QuizDialogShell
      open={open}
      onOpenChange={onOpenChange}
      overlayClassName="bg-[rgba(7,26,58,0.72)] backdrop-blur-[6px]"
      className="max-w-[440px] rounded-2xl p-[34px] shadow-[0_30px_80px_-28px_rgba(7,26,58,0.75)]"
    >
      <div
        aria-hidden="true"
        className="font-display mx-auto mb-[18px] grid size-[52px] place-items-center rounded-full bg-[#fff1eb] text-[22px] font-extrabold text-[#c2410c]"
      >
        !
      </div>
      <DialogPrimitive.Title className="font-display text-[20px] leading-[1.45] font-bold tracking-[-0.02em] text-[#0a1330]">
        Bạn có chắc chắn muốn làm lại bài trắc nghiệm không?
      </DialogPrimitive.Title>
      <DialogPrimitive.Description className="mt-[9px] text-[16px] text-black">
        Tất cả tiến độ và điểm số sẽ bị xóa.
      </DialogPrimitive.Description>
      <div className="mt-[25px] grid grid-cols-2 gap-[10px]">
        <DialogPrimitive.Close className="font-display min-h-11 cursor-pointer rounded-[9px] border border-[#dce4f0] bg-white px-[18px] py-[13px] text-[16px] font-bold text-[#0a1330] hover:bg-[#f2f5fa]">
          Hủy
        </DialogPrimitive.Close>
        <button
          type="button"
          onClick={onConfirm}
          className={cn(
            dialogCtaClassName,
            "border border-[#c2410c] px-[18px] py-[13px] shadow-[0_12px_24px_-14px_rgba(194,65,12,0.8)]",
          )}
        >
          Đồng ý
        </button>
      </div>
    </QuizDialogShell>
  );
}
