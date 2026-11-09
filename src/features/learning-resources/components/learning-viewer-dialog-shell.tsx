"use client";

import { XIcon } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Khung modal học liệu gần toàn màn hình (V2 `.bb-view-modal`, `.lesson-modal`): đầu modal nhãn nhỏ + tiêu đề + nút đóng 44px,
 * thân chiếm hết phần còn lại. Mở chồng lên modal Chương trình khung được (Radix xếp lớp, Esc đóng lớp trên cùng).
 */
export function LearningViewerDialogShell({
  open,
  onClose,
  kicker,
  title,
  returnFocusTo,
  bodyClassName,
  children,
}: {
  open: boolean;
  onClose: () => void;
  kicker: string;
  title: string;
  returnFocusTo?: HTMLElement | null;
  bodyClassName?: string;
  children: ReactNode;
}) {
  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(next) => !next && onClose()}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed inset-0 z-[310] bg-[rgba(10,19,48,0.7)] backdrop-blur-[3px]" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          onCloseAutoFocus={(event) => {
            if (!returnFocusTo?.isConnected) return;
            event.preventDefault();
            returnFocusTo.focus({ preventScroll: true });
          }}
          className={cn(
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-[0.98]",
            "fixed inset-0 z-[311] flex flex-col overflow-hidden bg-[#f8fafc] outline-none min-[641px]:inset-4 min-[641px]:rounded-[22px] lg:inset-6",
            "shadow-[0_28px_80px_rgba(10,19,48,0.4)]",
          )}
        >
          <header className="relative flex-none border-b border-[#dbe3f0] bg-white py-3.5 pr-16 pl-4 min-[641px]:py-4 min-[641px]:pl-6">
            <p className="font-display text-primary text-[14px] font-extrabold tracking-[0.12em] uppercase">
              {kicker}
            </p>
            <DialogPrimitive.Title className="font-display text-ink text-[19px] leading-[1.25] font-extrabold text-balance min-[641px]:text-[22px]">
              {title}
            </DialogPrimitive.Title>
            <DialogPrimitive.Close
              aria-label="Đóng"
              className="text-ink hover:border-primary hover:text-primary absolute top-1/2 right-3.5 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-[#dbe3f0] bg-white transition-colors"
            >
              <XIcon className="size-5" strokeWidth={2.2} />
            </DialogPrimitive.Close>
          </header>
          <div className={cn("min-h-0 flex-1", bodyClassName)}>{children}</div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
