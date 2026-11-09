import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Đầu trang nền navy của 2 trang tra cứu (V2 `.lookup-hero` Danh sách bệnh viện, `.qr-hero` Tra cứu QR):
 * nhãn vàng · tiêu đề lớn có vế nhấn vàng `<em>` (chữ đứng) · đoạn mô tả · khối phụ bên phải.
 * Hai trang lệch nhau vài px (padding, hoa văn chấm) → nhận className riêng thay vì nhân bản component.
 */
export function DarkNavyLookupToolPageHero({
  eyebrow,
  title,
  description,
  aside,
  className,
  innerClassName,
  titleClassName,
  decoration,
}: {
  eyebrow: string;
  /** Có thể chứa `<em>` cho vế nhấn vàng. */
  title: ReactNode;
  description: string;
  aside: ReactNode;
  /** Padding + nền gradient + hoa văn ::before. */
  className: string;
  /** Bố cục cột chữ ↔ khối phụ. */
  innerClassName: string;
  titleClassName: string;
  /** Lớp trang trí thêm (ví dụ dấu "+" khổng lồ của trang bệnh viện). */
  decoration?: ReactNode;
}) {
  return (
    <section
      aria-labelledby="page-title"
      className={cn(
        "relative overflow-hidden text-white before:absolute before:inset-0 before:content-['']",
        className,
      )}
    >
      {decoration}
      <div className={cn("container-site relative z-1", innerClassName)}>
        <div>
          <p className="font-display text-emphasis-yellow mb-3.5 text-[14px] leading-[1.3] font-bold tracking-[0.1em] uppercase">
            {eyebrow}
          </p>
          <h1
            id="page-title"
            className={cn(
              "font-display [&_em]:text-emphasis-yellow text-balance text-white [&_em]:inline-block [&_em]:font-bold",
              titleClassName,
            )}
          >
            {title}
          </h1>
          <p className="max-w-[min(68ch,720px)] text-[17px] leading-[1.75] text-pretty text-white/76">
            {description}
          </p>
        </div>
        {aside}
      </div>
    </section>
  );
}
