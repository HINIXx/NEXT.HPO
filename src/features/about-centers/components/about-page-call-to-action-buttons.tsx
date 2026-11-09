import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Khung nút V2 `.btn`: viên thuốc, Be Vietnam Pro 600, không xuống dòng (15px — V2 14px, tăng cho dễ đọc). */
const pillButtonBaseClassName =
  "font-display inline-flex items-center gap-2.5 rounded-full border text-[15px] font-semibold tracking-[0.01em] whitespace-nowrap transition-[transform,background-color,border-color,box-shadow] duration-250 ease-hp";

/**
 * Nút chính đỏ DS "Đăng ký tư vấn ngay" / "Gọi 028…" (V2 `.btn-hero-consult` sau lớp DS: nền #dc2626,
 * bóng trung tính, bỏ quầng cam nhấp nháy, giữ vệt sáng lướt qua). Mũi tên 19px làm nút cao ~63px như V2.
 */
export function AboutPrimaryRedPillLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={cn(
        pillButtonBaseClassName,
        "group relative isolate overflow-hidden border-[#dc2626] bg-[#dc2626] px-[27px] py-4 text-white shadow-[0_14px_30px_-14px_rgba(10,19,48,0.45)]",
        "hover:-translate-y-[3px] hover:scale-[1.02] hover:border-[#b91c1c] hover:bg-[#b91c1c] hover:shadow-[0_18px_36px_-14px_rgba(10,19,48,0.5)]",
        "before:animate-consult-shine before:absolute before:top-[-30%] before:left-[-45%] before:-z-1 before:h-[160%] before:w-[30%] before:skew-x-[-22deg] before:bg-linear-to-r before:from-transparent before:via-white/55 before:to-transparent before:content-['']",
      )}
    >
      <span>{children}</span>
      <strong
        aria-hidden="true"
        className="ease-hp text-[19px] transition-transform duration-250 group-hover:translate-x-1"
      >
        →
      </strong>
    </a>
  );
}

/** Nút viền kính mờ trên nền tối "Xem khóa học ↓" (V2 `.btn-course`). */
export function AboutGlassOutlinePillLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={cn(
        pillButtonBaseClassName,
        "group border-white/55 bg-white/8 px-[26px] py-3.5 text-white backdrop-blur-[8px] hover:-translate-y-0.5 hover:border-[#dc2626] hover:bg-[#dc2626]",
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className="ease-hp transition-transform duration-250 group-hover:translate-y-[3px]"
      >
        ↓
      </span>
    </a>
  );
}
