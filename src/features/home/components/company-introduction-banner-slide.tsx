"use client";

import Image from "next/image";
import { useState } from "react";
import { PhotoGalleryFullscreenLightboxDialog } from "@/features/about-centers/components/photo-gallery-fullscreen-lightbox-dialog";
import { cn } from "@/lib/utils";

const campusPhoto = {
  src: "/assets/images/banner/company-campus-gate-building-collage.webp",
  alt: "Cơ sở Hiệp Phát: cổng 176 Thế Lữ, tòa nhà trung tâm, đội xe tập lái và xe sát hạch",
};

/**
 * Slide 2 slider trang chủ "GIỚI THIỆU CÔNG TY" (V2 `.company-banner` + homepage-company-banner-*.css):
 * ≥1001px tiêu đề trên cùng, chữ trái / ảnh phải (50/50), cơ sở vật chất + nút website dưới; điện thoại xếp dọc
 * tiêu đề → ảnh → chữ. Bấm ảnh cơ sở → hộp xem ảnh lớn (V2 `data-img-group="campus"`).
 */
export function CompanyIntroductionBannerSlide({
  className,
}: {
  className?: string;
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <section
      aria-label="Giới thiệu công ty"
      className={cn(
        "flex items-start justify-center bg-white px-[22px] py-[26px] min-[1001px]:items-center min-[1001px]:px-[4vw] min-[1001px]:py-8",
        className,
      )}
    >
      <div className="grid w-full max-w-[1266px] grid-cols-1 gap-x-7 gap-y-4 min-[1001px]:grid-cols-[minmax(0,0.67fr)_minmax(0,1fr)] min-[1001px]:gap-x-[4vw] min-[1001px]:gap-y-0">
        <header className="col-span-full mb-[22px] flex flex-col items-center gap-3.5 pt-[34px] pb-3.5 text-center before:h-1 before:w-16 before:rounded-full before:bg-[linear-gradient(90deg,#2b26fb,#faec1a)] before:content-[''] min-[1001px]:mb-[34px]">
          <h2 className="font-display mx-auto w-fit bg-[linear-gradient(100deg,#1e3a8a_0%,#2b26fb_45%,#2b26fb_55%,#1e3a8a_100%)] bg-clip-text px-[0.04em] pt-[0.12em] text-[clamp(39px,5vw,72px)] leading-[1.08] font-black tracking-[-0.045em] text-balance text-[#1e3a8a] [-webkit-text-fill-color:transparent]">
            GIỚI THIỆU CÔNG TY
          </h2>
        </header>

        <button
          type="button"
          aria-haspopup="dialog"
          aria-label="Bấm để xem ảnh lớn cơ sở đào tạo Hiệp Phát"
          onClick={() => setLightboxOpen(true)}
          className="relative overflow-hidden rounded-[20px] bg-white shadow-[0_24px_46px_-28px_rgba(10,19,48,0.55)] min-[1001px]:col-start-2 min-[1001px]:row-start-2 min-[1001px]:rounded-3xl"
        >
          <Image
            src={campusPhoto.src}
            alt={campusPhoto.alt}
            width={1600}
            height={900}
            className="aspect-video w-full object-cover"
            sizes="(min-width: 1001px) 55vw, 100vw"
          />
        </button>

        <div className="min-[1001px]:col-start-1 min-[1001px]:row-start-2 min-[1001px]:self-center">
          <p className="font-display mb-3.5 text-[22px] leading-[1.25] font-extrabold tracking-[-0.015em] text-[#dc2626] min-[1001px]:mb-[18px] min-[1001px]:text-[clamp(24px,2.2vw,32px)]">
            Đào tạo và sát hạch cùng một địa điểm
          </p>
          <ul className="text-ink grid gap-1.5 text-[17px] leading-[1.55] min-[1001px]:text-[clamp(18px,1.5vw,22px)]">
            {[
              <>Thành lập năm 2010.</>,
              <>Hoạt động đào tạo lái xe từ năm 2015.</>,
              <>
                Phương châm{" "}
                <strong className="text-primary">
                  “Khởi đầu sự nghiệp lái xe an toàn của bạn”
                </strong>
                : đào tạo thành công nhiều học viên.
              </>,
            ].map((item, index) => (
              <li
                key={index}
                className="before:bg-primary relative pl-[22px] before:absolute before:top-[0.62em] before:left-0 before:size-2 before:rounded-full before:content-[''] min-[1001px]:pl-[26px] min-[1001px]:before:size-[9px]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-full mt-4 flex flex-col items-start gap-3.5 border-t border-[#dce7f5] pt-3.5 min-[1001px]:flex-row min-[1001px]:items-center min-[1001px]:gap-[22px]">
          <Image
            src="/assets/images/banner/h3.png"
            alt="Cơ sở vật chất"
            width={504}
            height={84}
            className="h-8 w-auto min-[1001px]:h-[37px]"
          />
          <div className="flex flex-col gap-3 min-[1001px]:flex-row min-[1001px]:items-center min-[1001px]:gap-[18px]">
            <ul className="flex list-disc gap-x-[26px] gap-y-2 pl-5 text-[16px] font-extrabold min-[1001px]:block min-[1001px]:list-none min-[1001px]:pl-6 min-[1001px]:text-[clamp(16px,1.3vw,19px)]">
              <li>02 sân tập lái</li>
              <li>01 sân sát hạch</li>
            </ul>
            <p className="border-l-2 border-[#3289ed] pl-3 text-[16px] leading-[1.6] min-[1001px]:border-l-[3px] min-[1001px]:pl-[18px] min-[1001px]:text-[clamp(16px,1.3vw,19px)]">
              Quy chuẩn kỹ thuật Quốc gia về TTSH lái xe cơ giới đường bộ
              <br />
              <strong>QCVN 15:2026/BCA</strong> ban hành ngày 29/06/2026
            </p>
          </div>
        </div>

        <a
          href="https://hpo.edu.vn/"
          aria-label="Website Hiệp Phát"
          className="col-span-full mt-3 flex w-fit items-center gap-3 justify-self-center rounded-[18px] border border-[#3022ff] bg-white pr-[18px] text-[15px] min-[1001px]:gap-[18px] min-[1001px]:justify-self-end min-[1001px]:text-[16px]"
        >
          <span className="rounded-[18px] bg-[#3022ff] px-[18px] py-2.5 font-bold text-white">
            Website:
          </span>
          hpo.edu.vn <span aria-hidden="true">↗</span>
        </a>
      </div>

      <PhotoGalleryFullscreenLightboxDialog
        photos={[campusPhoto]}
        openIndex={lightboxOpen ? 0 : null}
        onIndexChange={() => {}}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  );
}
