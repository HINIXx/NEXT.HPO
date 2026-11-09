import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type AboutHeroProofStat = { value: string; label: string };

type AboutCenterFullBleedPhotoHeroProps = {
  /** Ảnh nền toàn khung (V2 đặt bằng background-image). */
  backgroundImageSrc: string;
  /** Vị trí ảnh nền, ví dụ "object-[center_42%] max-lg:object-[65%_center]". */
  backgroundPositionClassName: string;
  kicker: string;
  /** h1 — chữ nhấn dòng 2 bọc trong <em> (vàng DS). */
  title: ReactNode;
  description: string;
  actions: ReactNode;
  proofStats: readonly AboutHeroProofStat[];
  /** V2 trang Sát hạch ẩn khối số liệu ≤900px. */
  hideProofStatsBelowDesktop?: boolean;
};

/**
 * Đầu trang Giới thiệu (V2 `section.about-hero`): ảnh toàn khung + lớp tối navy trái→phải,
 * nhãn · h1 · mô tả · nút, khối 3 số liệu góc phải dưới.
 * Cao: ≥901px = màn hình − 108px (760–940px); 621–900px tối thiểu 720px; ≤620px tối thiểu 820px (V2 790px; +30px vì chữ to hơn).
 */
export function AboutCenterFullBleedPhotoHero({
  backgroundImageSrc,
  backgroundPositionClassName,
  kicker,
  title,
  description,
  actions,
  proofStats,
  hideProofStatsBelowDesktop = false,
}: AboutCenterFullBleedPhotoHeroProps) {
  return (
    <section className="relative min-h-[820px] overflow-hidden bg-[#071a3a] text-white min-[621px]:min-h-[720px] lg:h-[calc(100vh-108px)] lg:max-h-[940px] lg:min-h-[760px]">
      <div className="absolute inset-0 scale-[1.02]" aria-hidden="true">
        <Image
          src={backgroundImageSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className={cn("object-cover", backgroundPositionClassName)}
        />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(4,18,45,0.5),transparent_45%),linear-gradient(90deg,rgba(4,18,45,0.96)_0%,rgba(4,18,45,0.78)_42%,rgba(4,18,45,0.14)_78%)]" />
      </div>

      <div className="container-site relative flex min-h-[820px] items-start pt-[85px] min-[621px]:min-h-[720px] min-[621px]:pt-[130px] lg:h-full lg:min-h-0 lg:items-center lg:pt-0">
        <div data-reveal className="w-full lg:-mt-10 lg:w-[min(760px,62%)]">
          <p className="font-display mb-6 text-base leading-[normal] font-bold tracking-[0.2em] uppercase">
            {kicker}
          </p>
          <h1 className="font-display [&_em]:text-emphasis-yellow text-[46px] leading-[0.99] font-extrabold min-[621px]:text-[clamp(50px,6vw,92px)]">
            {title}
          </h1>
          <p className="mt-[30px] mb-[34px] max-w-[650px] text-[17px] leading-[1.75] min-[621px]:text-[clamp(17px,1.25vw,20px)]">
            {description}
          </p>
          <div className="mb-11 flex flex-col items-start gap-[18px] min-[621px]:flex-row min-[621px]:flex-wrap min-[621px]:items-center min-[621px]:gap-[30px]">
            {actions}
          </div>
        </div>

        <dl
          data-reveal
          data-reveal-delay="2"
          className={cn(
            "absolute inset-x-5 bottom-6 flex border border-white/13 bg-[rgba(7,26,58,0.8)] backdrop-blur-[12px] min-[621px]:inset-x-7 min-[621px]:bottom-[35px] lg:right-7 lg:bottom-[55px] lg:left-auto",
            hideProofStatsBelowDesktop && "max-lg:hidden",
          )}
        >
          {proofStats.map((stat) => (
            <div
              key={stat.label}
              className="flex min-w-0 flex-1 flex-col-reverse border-r border-white/13 px-2.5 py-[13px] last:border-r-0 min-[621px]:p-4 lg:min-w-[150px] lg:flex-none lg:px-[25px] lg:py-[21px]"
            >
              <dt className="text-[14px] leading-[1.3] font-semibold min-[621px]:text-[15px] min-[621px]:leading-[1.55]">
                {stat.label}
              </dt>
              <dd className="font-display text-emphasis-yellow text-[20px] leading-[normal] font-bold min-[621px]:text-[26px]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** Ô "Hotline tư vấn / 028…" cạnh nút ở đầu trang TT GDNN (V2 `.hero-phone`). */
export function AboutHeroHotlineLink({
  href,
  label,
  phone,
}: {
  href: string;
  label: string;
  phone: string;
}) {
  return (
    <a
      href={href}
      className="flex min-h-11 flex-col justify-center min-[621px]:border-l min-[621px]:border-white/25 min-[621px]:pl-[30px]"
    >
      <span className="text-[14px] tracking-[0.08em] text-white/82 uppercase">
        {label}
      </span>
      <strong className="font-display text-[18px] leading-[normal] font-semibold">
        {phone}
      </strong>
    </a>
  );
}
