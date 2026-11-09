"use client";

/* eslint-disable @next/next/no-img-element -- ảnh lớn hiện theo kích thước gốc (object-contain), không biết trước cỡ */
import { XIcon } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";
import type { GalleryPhoto } from "../data/gallery-photo-types";

const roundGhostButtonClassName =
  "grid place-items-center rounded-full border border-white/28 bg-white/8 text-white transition-colors hover:border-[#dc2626] hover:bg-[#dc2626]";

/**
 * Hộp xem ảnh lớn của các băng chuyền trang Giới thiệu (V2 `#imageModal`): nền tối mờ, ảnh giữa,
 * chú thích = alt, nút ←/→, chấm chọn ảnh, phím ←/→/Esc. Radix Dialog lo khóa cuộn + giữ focus.
 */
export function PhotoGalleryFullscreenLightboxDialog({
  photos,
  openIndex,
  onIndexChange,
  onClose,
}: {
  photos: readonly GalleryPhoto[];
  /** null = đóng. */
  openIndex: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const isOpen = openIndex !== null;
  const index = openIndex ?? 0;
  const photo = photos[index];
  const go = (step: number) =>
    onIndexChange((index + step + photos.length) % photos.length);

  return (
    <DialogPrimitive.Root
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed inset-0 z-[300] bg-[rgba(3,10,25,0.92)] backdrop-blur-[10px]" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") go(-1);
            if (event.key === "ArrowRight") go(1);
          }}
          className="data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed inset-0 z-[301] grid place-items-center outline-none"
        >
          <DialogPrimitive.Title className="sr-only">
            Xem hình ảnh
          </DialogPrimitive.Title>
          <div className="relative grid h-dvh w-screen grid-cols-[48px_minmax(0,1fr)_48px] grid-rows-[minmax(0,1fr)_auto] items-center gap-1 px-2 pt-[58px] pb-5 sm:h-[min(90vh,900px)] sm:w-[min(94vw,1400px)] sm:grid-cols-[64px_minmax(0,1fr)_64px] sm:gap-4 sm:p-0">
            <DialogPrimitive.Close
              aria-label="Đóng"
              className={cn(
                roundGhostButtonClassName,
                "absolute top-3 right-3.5 z-2 size-11 sm:top-0 sm:right-0",
              )}
            >
              <XIcon className="size-7" strokeWidth={2} />
            </DialogPrimitive.Close>
            <button
              type="button"
              aria-label="Ảnh trước"
              onClick={() => go(-1)}
              className={cn(
                roundGhostButtonClassName,
                "size-11 justify-self-start text-[19px] sm:size-[52px]",
              )}
            >
              ←
            </button>
            <figure className="flex h-full min-w-0 flex-col items-center justify-center">
              {photo && (
                <img
                  key={photo.src}
                  src={photo.src}
                  alt={photo.alt}
                  className="block h-auto max-h-[calc(100dvh-170px)] w-auto max-w-full object-contain shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:max-h-[calc(90vh-90px)]"
                />
              )}
              <figcaption className="min-h-6 pt-3 text-center text-[17px] text-white">
                {photo?.alt}
              </figcaption>
            </figure>
            <button
              type="button"
              aria-label="Ảnh tiếp theo"
              onClick={() => go(1)}
              className={cn(
                roundGhostButtonClassName,
                "size-11 justify-self-end text-[19px] sm:size-[52px]",
              )}
            >
              →
            </button>
            <div className="col-span-full flex max-w-[min(90vw,700px)] flex-wrap justify-center gap-[7px] justify-self-center py-2">
              {photos.map((item, dotIndex) => (
                <button
                  key={`${item.src}-${dotIndex}`}
                  type="button"
                  aria-label={`Xem hình ảnh ${dotIndex + 1}`}
                  aria-current={dotIndex === index ? "true" : undefined}
                  onClick={() => onIndexChange(dotIndex)}
                  className={cn(
                    "h-[7px] rounded-full transition-[width,background-color] duration-200",
                    dotIndex === index
                      ? "w-6 bg-[#dc2626]"
                      : "w-[7px] bg-white/40",
                  )}
                />
              ))}
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
