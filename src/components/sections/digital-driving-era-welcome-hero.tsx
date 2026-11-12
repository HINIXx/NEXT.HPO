import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const classPillClassName =
  "inline-block rounded-lg border border-[#c7d2fe] bg-[#eef2ff] px-[0.45em] font-bold text-[#1e3a8a]";

/**
 * Đầu trang chữ "Chào mừng các bạn đến với Hiệp Phát / KỶ NGUYÊN AI / TRONG ĐÀO TẠO LÁI XE"
 * (V2 `.hpo-digital-hero` — trang Chương trình ưu đãi; trang chủ GĐ6 dùng cùng phần chữ).
 * Tiêu đề 2 dòng chữ gradient: xanh #1f6bff→#2b26fb→#4b1fd8, đỏ #ff3b30→#ea1e24→#c3122f
 * (đệm .16em trên để dấu tiếng Việt không bị cắt khi tô chữ bằng nền).
 */
export function DigitalDrivingEraWelcomeHero({
  headingLevel = "h1",
  ariaLabel = "Kỷ nguyên AI trong đào tạo lái xe",
  className,
  children,
}: {
  headingLevel?: "h1" | "h2";
  ariaLabel?: string;
  /** Trang chủ: slide 1 của slider (`role="group"` do slider gắn). */
  className?: string;
  /** Nội dung thêm dưới chữ (trang chủ: card "Hệ thống HPO"). */
  children?: ReactNode;
}) {
  const Heading = headingLevel;
  return (
    <section
      aria-label={ariaLabel}
      className={cn("hpo-digital-hero relative bg-white", className)}
    >
      <div className="mx-auto max-w-[1480px] px-3 pt-11 pb-[34px] text-center sm:px-[4vw] sm:pt-[45px] sm:pb-[42px] xl:pt-10">
        <p
          className={cn(
            "font-display text-primary mb-3.5 flex items-center justify-center gap-[0.38em] text-[16px] leading-[1.3] font-bold tracking-[0.02em] uppercase sm:mb-[27px] sm:gap-[0.75em] sm:text-[clamp(16px,1.9vw,28px)] sm:tracking-[0.07em]",
            "before:h-[3px] before:w-[18px] before:flex-none before:bg-[#dc2626] before:content-[''] after:h-[3px] after:w-[18px] after:flex-none after:bg-[#dc2626] after:content-[''] sm:before:w-11 sm:after:w-11",
          )}
        >
          Chào mừng các bạn đến với Hiệp Phát
        </p>
        <Heading className="font-display text-[clamp(35px,9.2vw,56px)] leading-[1.04] font-black tracking-[-0.045em] text-[#102a56] uppercase sm:text-[7vw] xl:text-[clamp(35px,6.15vw,104px)]">
          <span className="mx-auto -mt-[0.16em] -mb-[0.1em] block w-fit max-w-full bg-[linear-gradient(90deg,#1f6bff_0%,#2b26fb_52%,#4b1fd8_100%)] bg-clip-text px-[0.04em] pt-[0.16em] pb-[0.1em] [-webkit-text-fill-color:transparent]">
            KỶ NGUYÊN AI
          </span>
          <span className="mx-auto mt-[calc(8px-0.16em)] block w-fit max-w-full bg-[linear-gradient(90deg,#ff3b30_0%,#ea1e24_50%,#c3122f_100%)] bg-clip-text px-[0.04em] pt-[0.16em] pb-[0.1em] text-[0.78em] [-webkit-text-fill-color:transparent] sm:text-[0.81em]">
            TRONG ĐÀO TẠO LÁI XE
          </span>
        </Heading>
        <p className="mx-auto mt-3 max-w-[1040px] text-[clamp(16.4px,1.9vw,30px)] leading-[1.45] font-medium text-[#132957] sm:mt-[13px]">
          Hệ sinh thái chuyển đổi số toàn diện cho đào tạo lái xe ô tô thông
          minh
        </p>
        <p className="mx-auto mt-3 max-w-[1000px] text-[17px] leading-[1.55] font-medium text-[#1e293b] sm:mt-3.5 md:text-[19px] xl:text-[23px]">
          Tại Hiệp Phát, chúng tôi đào tạo lái xe ô tô trên nền tảng tích hợp
          trí tuệ nhân tạo,
          <br className="hidden md:inline" /> với{" "}
          <strong className={classPillClassName}>Hạng B</strong> (Bao gồm số cơ
          khí (số sàn) và số tự động (xe ô tô điện,...)) và{" "}
          <strong className={classPillClassName}>Hạng C1</strong>.
        </p>
        {children}
      </div>
    </section>
  );
}
