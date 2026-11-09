import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Chữ dùng chung trang Quy trình đào tạo (V2 `styles/process-readable-redesign.css` mục 0):
 * tiêu đề 2 vế — vế 1 gradient "Xanh Hiệp Phát" #1e3a8a→#2b26fb, chữ nhấn `<em>` gradient "Đỏ Hiệp Phát"
 * #b91c1c→#ea1e24 (chữ đứng, không tách dòng). Mô tả #334155, eyebrow #1e40af có vạch đỏ.
 * Lưu ý: KHÔNG gộp chung `leading-*` ở đây — `cn()` (tailwind-merge) gặp `text-[..px]` phía sau sẽ xóa nó.
 * Nơi dùng tự thêm cỡ chữ rồi `leading-[1.2]`.
 */
export const processGradientHeadingClassName = cn(
  "font-display font-extrabold tracking-[-0.015em] text-[#1e3a8a]",
  "bg-[linear-gradient(100deg,#1e3a8a_0%,#2b26fb_45%,#2b26fb_55%,#1e3a8a_100%)] bg-clip-text [-webkit-text-fill-color:transparent]",
  "[&_em]:pr-[0.08em] [&_em]:font-bold [&_em]:whitespace-nowrap [&_em]:not-italic [&_em]:text-[#b91c1c]",
  "[&_em]:bg-[linear-gradient(100deg,#b91c1c_0%,#ea1e24_45%,#ea1e24_55%,#b91c1c_100%)] [&_em]:bg-clip-text",
);

/** Nhãn in hoa có vạch phía trước (V2 `.eyebrow`). `tone="light"` = nền navy: chữ + vạch vàng #facc15. */
export function ProcessEyebrowLabel({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-display inline-flex items-center gap-3 text-[16px] leading-[1.65] font-bold tracking-[0.08em] uppercase",
        "before:h-0.5 before:w-7 before:flex-none before:content-['']",
        tone === "dark"
          ? "text-primary before:bg-[#dc2626]"
          : "text-emphasis-yellow before:bg-emphasis-yellow",
        className,
      )}
    >
      {children}
    </p>
  );
}

/**
 * Đầu mỗi bước (V2 `.section-head`): "Bước 0x" + h2 gradient + mô tả ≤68ch.
 * h2: 28→40px (≤900px V2 cũng giữ clamp), mô tả 18px · ≤900px 17px.
 */
export function TrainingProcessSectionHead({
  eyebrow,
  title,
  titleId,
  description,
  extra,
}: {
  eyebrow: string;
  title: ReactNode;
  titleId: string;
  description: ReactNode;
  /** Nội dung thêm dưới mô tả, trong khoảng đầu section (vd danh sách giấy tờ trang Ưu đãi). */
  extra?: ReactNode;
}) {
  return (
    <div className="mb-[42px]">
      <ProcessEyebrowLabel className="mt-4">{eyebrow}</ProcessEyebrowLabel>
      <h2
        id={titleId}
        className={cn(
          processGradientHeadingClassName,
          "text-[clamp(28px,2.8vw,40px)] leading-[1.2]",
        )}
      >
        {title}
      </h2>
      <p className="mt-4 max-w-[68ch] text-[17px] leading-[1.65] text-[#334155] lg:text-[18px]">
        {description}
      </p>
      {extra}
    </div>
  );
}

/** Khoảng đệm dọc mỗi bước (V2 `.process-section`: 104px · ≤900px 82px) + bù thanh bước dính khi nhảy neo. */
export const trainingProcessSectionClassName =
  "scroll-mt-[calc(var(--site-header-height,137px)+96px)] py-[82px] lg:py-[104px]";
