import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Chữ dùng chung 2 trang Giới thiệu (V2 `gioi-thieu/*` style.css + training-center-design-system.css):
 * token trang đã đưa về DS — xanh đậm #1e3a8a, mực #0a1330, gạch nhấn đỏ #dc2626.
 */

/** Tiêu đề section thang DS 32–48px (V2 `.intro h2`, `.section-head h2`, `.digital h2`…). Chữ nhấn: `<span>`. */
export const aboutSectionHeadingClassName =
  "font-display text-[clamp(32px,3.3vw,48px)] leading-[1.12] font-bold tracking-[-0.04em] text-balance text-[#0a1330] [&_em]:text-[#1e3a8a] [&_span]:text-[#1e3a8a]";

/** Tiêu đề lớn hơn của trang Sát hạch (V2 `.exam-intro h2`, `.exam-cta h2`: clamp 35–58px, không qua thang DS). */
export const examPageLargeHeadingClassName =
  "font-display text-[clamp(35px,4vw,58px)] leading-[1.12] font-bold tracking-[-0.04em] text-[#0a1330] [&_em]:text-[#1e3a8a] [&_span]:text-[#1e3a8a]";

/** Nhãn nhỏ in hoa có gạch đỏ phía trước (V2 `.section-label`). `tone="light"` cho nền tối (chữ vàng DS). */
export function AboutSectionEyebrowLabel({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-display mb-6 flex items-center gap-3 text-[18px] leading-[normal] font-bold tracking-[0.1em] uppercase",
        "before:h-0.5 before:w-7 before:flex-none before:bg-[#dc2626] before:content-['']",
        tone === "dark" ? "text-[#1e3a8a]" : "text-emphasis-yellow",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Đầu section 2 cột: nhãn + tiêu đề trái, mô tả phải (V2 `.section-head`); ≤900px xếp dọc. */
export function AboutSplitSectionHead({
  eyebrow,
  title,
  description,
  alignTop = false,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  description: ReactNode;
  /** V2 `.partners-head`: căn đầu thay vì căn đáy. */
  alignTop?: boolean;
}) {
  return (
    <div
      data-reveal
      className={cn(
        "mb-[54px] flex flex-col items-start gap-[60px] lg:flex-row lg:justify-between",
        alignTop ? "lg:items-start" : "lg:items-end",
      )}
    >
      <div>
        <AboutSectionEyebrowLabel>{eyebrow}</AboutSectionEyebrowLabel>
        <h2 className={aboutSectionHeadingClassName}>{title}</h2>
      </div>
      <p className="text-body max-w-[560px] leading-[1.7] text-pretty text-black lg:w-[420px] lg:flex-none">
        {description}
      </p>
    </div>
  );
}

/** Khoảng đệm dọc section (V2 `.section`: 120px · ≤900px 85px · ≤620px 68px). */
export const aboutSectionPaddingClassName =
  "py-[68px] min-[621px]:py-[85px] lg:py-[120px]";
