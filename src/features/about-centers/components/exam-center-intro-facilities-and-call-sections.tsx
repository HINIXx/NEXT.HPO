import Image from "next/image";
import { contact } from "@/shared/config/contact";
import {
  examCenterLicenseClassChips,
  examCenterPanoramaPhotoSrc,
  examCenterTestVehiclePhotos,
  examCenterTestYardPhotos,
} from "../data/driving-exam-center-page-content";
import { AboutPrimaryRedPillLink } from "./about-page-call-to-action-buttons";
import {
  AboutSectionEyebrowLabel,
  AboutSplitSectionHead,
  aboutSectionPaddingClassName,
  examPageLargeHeadingClassName,
} from "./about-page-shared-typography";
import {
  PhotoCarouselNumberedCaptionOverlay,
  PhotoCrossfadeCarouselWithLightbox,
} from "./photo-crossfade-carousel-with-lightbox";

/**
 * "Giới thiệu trung tâm — Đầu tư đồng bộ. Vận hành chuyên nghiệp." (V2 `section.exam-intro`):
 * ảnh toàn cảnh + nhãn "LOẠI 1 Đạt quy chuẩn quốc gia" · 2 đoạn giới thiệu · thẻ 3 hạng.
 */
export function ExamCenterOverviewIntroSection() {
  return (
    <section className={aboutSectionPaddingClassName}>
      <div className="container-site grid items-center gap-[clamp(60px,8vw,120px)] lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)]">
        <div
          data-reveal
          className="relative min-h-[360px] min-[621px]:min-h-[500px] min-[621px]:max-w-[720px] lg:min-h-[580px] lg:max-w-none"
        >
          <Image
            src={examCenterPanoramaPhotoSrc}
            alt="Toàn cảnh Trung tâm sát hạch lái xe Hiệp Phát"
            fill
            sizes="(min-width: 901px) 46vw, 100vw"
            className="object-cover shadow-[0_30px_70px_-35px_rgba(7,26,58,0.5)]"
          />
          {/* V2 ≤620px đặt cả top lẫn bottom làm nhãn phủ kín ảnh → ở đây chỉ dời xuống đáy. */}
          <p className="font-display absolute bottom-4 left-2 flex max-w-[calc(100%-16px)] items-center gap-[13px] bg-[#1e3a8a] px-4 py-3.5 text-base leading-[1.4] font-semibold tracking-[0.08em] text-white uppercase min-[621px]:top-7 min-[621px]:bottom-auto min-[621px]:-left-[18px] min-[621px]:max-w-none min-[621px]:px-6 min-[621px]:py-5">
            <strong className="text-emphasis-yellow text-[22px] font-black whitespace-nowrap">
              Loại 1
            </strong>
            Đạt quy chuẩn quốc gia
          </p>
        </div>

        <div data-reveal data-reveal-delay="1">
          <AboutSectionEyebrowLabel>
            Giới thiệu trung tâm
          </AboutSectionEyebrowLabel>
          <h2 className={examPageLargeHeadingClassName}>
            Đầu tư đồng bộ.
            <br />
            <em>Vận hành chuyên nghiệp.</em>
          </h2>
          <div className="space-y-[18px] pt-[18px] text-[20px] leading-[1.8] text-pretty text-black">
            <p>
              Trung tâm Sát hạch Lái xe Hiệp Phát thuộc Công ty TNHH Ô Tô Hiệp
              Phát, được xây dựng theo quy chuẩn quốc gia dành cho trung tâm sát
              hạch loại 1 với tổng diện tích 35.880 m².
            </p>
            <p>
              Trung tâm có đủ điều kiện tổ chức sát hạch các hạng B số tự động,
              B số cơ khí, C1, C, D và E trong môi trường minh bạch, an toàn và
              chuyên nghiệp.
            </p>
          </div>
          <ul
            aria-label="Hạng đào tạo"
            className="mt-[26px] flex flex-wrap gap-2"
          >
            {examCenterLicenseClassChips.map((chip) => (
              <li
                key={chip}
                className="font-display rounded-full border border-[#c8d4e7] px-[13px] py-2 text-base leading-[normal] font-bold text-[#1e3a8a]"
              >
                {chip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/**
 * "Cơ sở vật chất — Sẵn sàng cho một kỳ thi an toàn và công bằng." (V2 `section.exam-facilities#co-so-sat-hach`):
 * 2 băng chuyền (sân sát hạch 6 ảnh · xe sát hạch 4 ảnh); ≥901px cạnh nhau 1.15fr/0.85fr, cao 540px.
 */
export function ExamCenterFacilitiesGallerySection() {
  const galleryClassName =
    "h-[350px] bg-[#0b2149] min-[621px]:h-[470px] lg:h-[540px]";
  const titleClassName = "text-[17px] min-[621px]:text-[21px]";
  return (
    <section
      id="co-so-sat-hach"
      className={`scroll-mt-[73px] sm:scroll-mt-[99px] md:scroll-mt-[135px] 2xl:scroll-mt-[137px] ${aboutSectionPaddingClassName}`}
    >
      <div className="container-site">
        <AboutSplitSectionHead
          eyebrow="Cơ sở vật chất"
          title={
            <>
              Sẵn sàng cho một kỳ thi
              <br />
              <span>an toàn và công bằng.</span>
            </>
          }
          description="Sân sát hạch rộng, hệ thống công nghệ hiện đại và phương tiện đạt chuẩn cho từng bài thi."
        />
        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div data-reveal>
            <PhotoCrossfadeCarouselWithLightbox
              photos={examCenterTestYardPhotos}
              label="Hình ảnh sân sát hạch Hiệp Phát"
              dotStyle="exam"
              sizes="(min-width: 901px) 55vw, 100vw"
              className={galleryClassName}
              overlay={
                <PhotoCarouselNumberedCaptionOverlay
                  number="01"
                  title="Sân sát hạch 35.000 m²"
                  description="Rộng rãi · Công nghệ hiện đại"
                  titleClassName={titleClassName}
                />
              }
            />
          </div>
          <div data-reveal data-reveal-delay="1">
            <PhotoCrossfadeCarouselWithLightbox
              photos={examCenterTestVehiclePhotos}
              label="Hình ảnh xe sát hạch Hiệp Phát"
              dotStyle="exam"
              sizes="(min-width: 901px) 40vw, 100vw"
              className={galleryClassName}
              overlay={
                <PhotoCarouselNumberedCaptionOverlay
                  number="02"
                  title="Xe sát hạch đời mới"
                  description="Toyota · Isuzu · Chấm điểm tự động"
                  titleClassName={titleClassName}
                />
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/** "Cần hỗ trợ thông tin sát hạch? — Chuẩn bị kỹ hôm nay. Tự tin trong ngày thi." + nút gọi (V2 `section.exam-cta`). */
export function ExamCenterCallSupportSection() {
  return (
    <section className="bg-linear-135 from-[#f4f7fc] to-[#e8f0fb] py-[68px] min-[621px]:py-[90px]">
      <div className="container-site flex flex-col items-start gap-[50px] lg:flex-row lg:items-end lg:justify-between">
        <div data-reveal>
          <AboutSectionEyebrowLabel>
            Cần hỗ trợ thông tin sát hạch?
          </AboutSectionEyebrowLabel>
          <h2 className={examPageLargeHeadingClassName}>
            Chuẩn bị kỹ hôm nay.
            <br />
            <span>Tự tin trong ngày thi.</span>
          </h2>
        </div>
        <div className="flex flex-col items-start gap-3">
          <p className="text-body">Tư vấn quy trình và lịch sát hạch</p>
          <AboutPrimaryRedPillLink href={contact.hotlineHref}>
            Gọi {contact.hotline}
          </AboutPrimaryRedPillLink>
        </div>
      </div>
    </section>
  );
}
