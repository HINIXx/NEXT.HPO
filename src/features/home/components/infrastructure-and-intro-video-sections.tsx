"use client";

import Image from "next/image";
import { useState } from "react";
import { PhotoGalleryFullscreenLightboxDialog } from "@/features/about-centers/components/photo-gallery-fullscreen-lightbox-dialog";

const twoToneTitleClassName =
  "font-display text-[clamp(26px,3.2vw,44px)] leading-[1.18] font-black tracking-[-0.02em] uppercase [&>span]:block [&>span]:bg-clip-text [&>span]:[-webkit-text-fill-color:transparent]";
const blueLine =
  "bg-[linear-gradient(100deg,#1e3a8a_0%,#2b26fb_45%,#2b26fb_55%,#1e3a8a_100%)] text-[#1e3a8a]";
const redLine =
  "bg-[linear-gradient(100deg,#b91c1c_0%,#ea1e24_45%,#ea1e24_55%,#b91c1c_100%)] text-[#b91c1c]";

const infrastructurePhoto = {
  src: "/assets/images/so-huu-tri-tue/HaTangKyThuat.jpg",
  alt: "Hạ tầng máy chủ đám mây Viettel IDC của hệ thống HPO",
};

const pillars = [
  {
    number: "01",
    title: "Hiện đại",
    text: "Máy chủ đặt tại trung tâm dữ liệu Viettel IDC.",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="7" rx="2" />
        <rect x="3" y="14" width="18" height="7" rx="2" />
        <path d="M7 6.5h.01M7 17.5h.01M11 6.5h6M11 17.5h6" />
      </>
    ),
  },
  {
    number: "02",
    title: "Đồng bộ",
    text: "Xác thực khuôn mặt, DAT, cabin, mô phỏng chung một hệ thống HPO.",
    icon: (
      <path d="M21 12a9 9 0 0 1-15.5 6.2M3 12a9 9 0 0 1 15.5-6.2M21 4v5h-5M3 20v-5h5" />
    ),
  },
  {
    number: "03",
    title: "Thông suốt",
    text: "Truy cập mọi lúc trên máy tính, điện thoại, máy tính bảng.",
    icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
  },
] as const;

/**
 * "HỆ THỐNG HẠ TẦNG KỸ THUẬT / HIỆN ĐẠI, ĐỒNG BỘ, THÔNG SUỐT" (V2 `.digital-learning-materials` +
 * homepage-infrastructure-section.css): ảnh Viettel IDC trên "sân khấu" có quỹ đạo quay (bấm → ảnh lớn) + 3 trụ cột nối dọc.
 */
export function InfrastructureHighlightsSection() {
  const [open, setOpen] = useState(false);
  return (
    <section
      aria-labelledby="digital-platform-title"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f6f9ff_0%,#fffaf5_100%)] px-4 py-14 sm:py-[72px]"
    >
      <div className="mx-auto max-w-[1240px] sm:px-7">
        <header
          data-reveal
          className="mb-9 flex flex-col items-center gap-3 text-center before:h-1 before:w-16 before:rounded-full before:bg-[linear-gradient(90deg,#2b26fb,#faec1a)] before:content-['']"
        >
          <h2 id="digital-platform-title" className={twoToneTitleClassName}>
            <span className={blueLine}>Hệ thống hạ tầng kỹ thuật</span>
            <span className={redLine}>hiện đại, đồng bộ, thông suốt</span>
          </h2>
        </header>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
          <figure
            data-reveal
            className="relative overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_50%_55%,#fff_0%,#e5edff_55%,#cfdcff_100%)] shadow-[0_40px_70px_-40px_rgba(30,58,138,0.6)]"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-[56%] left-1/2 aspect-[2.2/1] w-[96%] -translate-x-1/2 -translate-y-1/2 animate-[spin_40s_linear_infinite] rounded-[50%] border border-dashed border-[#7c9cf5]/50 motion-reduce:animate-none"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-[60%] left-1/2 aspect-[2.6/1] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-[#7c9cf5]/40"
            />
            <button
              type="button"
              aria-haspopup="dialog"
              aria-label="Xem ảnh hạ tầng máy chủ Viettel IDC"
              onClick={() => setOpen(true)}
              className="relative block w-full"
            >
              <Image
                src={infrastructurePhoto.src}
                alt={infrastructurePhoto.alt}
                width={829}
                height={635}
                loading="lazy"
                sizes="(min-width: 901px) 45vw, 100vw"
                className="aspect-[829/635] w-full object-contain mix-blend-multiply"
              />
            </button>
            <figcaption className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[15px] text-[#334155] shadow-[0_8px_20px_-10px_rgba(10,19,48,0.4)]">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-[18px] fill-none stroke-[#1e40af] stroke-2"
              >
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
              </svg>
              Lưu trữ tại <b className="text-[#dc2626]">Viettel IDC</b>
            </figcaption>
          </figure>
          <ol className="grid gap-10">
            {pillars.map((pillar, index) => (
              <li
                key={pillar.number}
                data-reveal
                className="relative grid grid-cols-[62px_minmax(0,1fr)] gap-5 after:absolute after:top-[66px] after:left-[30px] after:h-[calc(100%-26px)] after:w-0.5 after:bg-[linear-gradient(180deg,#a5b4fc,#fca5a5)] after:content-[''] last:after:hidden"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <span
                  aria-hidden="true"
                  className="text-brand-blue grid size-[62px] place-items-center rounded-[18px] border border-[#e6ebf5] bg-white shadow-[0_12px_26px_-16px_rgba(30,58,138,0.6)]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-7 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
                  >
                    {pillar.icon}
                  </svg>
                </span>
                <div>
                  <span className="text-[14px] font-extrabold tracking-[0.12em] text-[#dc2626]">
                    {pillar.number}
                  </span>
                  <h3 className="font-display text-ink text-[clamp(22px,2vw,26px)] leading-[1.25] font-extrabold">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 text-[17px] leading-[1.6] text-[#334155]">
                    {pillar.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <PhotoGalleryFullscreenLightboxDialog
        photos={[infrastructurePhoto]}
        openIndex={open ? 0 : null}
        onIndexChange={() => {}}
        onClose={() => setOpen(false)}
      />
    </section>
  );
}

/**
 * "TRUNG TÂM GIÁO DỤC NGHỀ NGHIỆP / VÀ SÁT HẠCH LÁI XE Ô TÔ HIỆP PHÁT" (V2 `#gioi_thieu_ve_chung_toi`): video YouTube
 * giới thiệu (tự phát, tắt tiếng, lặp như V2). Iframe tải trễ khi cuộn gần tới.
 */
export function CenterIntroVideoSection() {
  return (
    <section
      id="gioi_thieu_ve_chung_toi"
      aria-labelledby="intro-video-title"
      className="bg-[linear-gradient(180deg,#f3f7ff_0%,#fff_100%)] px-4 py-14 sm:py-[72px]"
    >
      <div className="mx-auto max-w-[1440px] sm:px-[3vw]">
        <header
          data-reveal
          className="mb-8 flex flex-col items-center gap-3 text-center before:h-1 before:w-16 before:rounded-full before:bg-[linear-gradient(90deg,#2b26fb,#faec1a)] before:content-['']"
        >
          <h2 id="intro-video-title" className={twoToneTitleClassName}>
            <span className={blueLine}>Trung tâm giáo dục Nghề nghiệp</span>
            <span className={redLine}>
              và <span className="whitespace-nowrap">sát hạch</span> lái xe ô tô
              Hiệp Phát
            </span>
          </h2>
        </header>
        <div
          data-reveal
          className="bg-ink overflow-hidden rounded-[22px] shadow-[0_40px_80px_-40px_rgba(10,19,48,0.7)]"
        >
          <iframe
            src="https://www.youtube.com/embed/P5yDyQ1_NqA?autoplay=1&mute=1&loop=1&playlist=P5yDyQ1_NqA&playsinline=1&vq=hd1080"
            title="Giới thiệu trung tâm giáo dục nghề nghiệp Hiệp Phát"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="aspect-video w-full border-0"
          />
        </div>
      </div>
    </section>
  );
}
