import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  vocationalCenterDigitalTransformationItems,
  vocationalCenterPracticeYardPhotos,
  vocationalCenterSimulatorCabinPhotoSrc,
  vocationalCenterTrainingVehiclePhotos,
} from "../data/vocational-training-center-page-content";
import {
  AboutSectionEyebrowLabel,
  AboutSplitSectionHead,
  aboutSectionHeadingClassName,
  aboutSectionPaddingClassName,
} from "./about-page-shared-typography";
import {
  PhotoCarouselNumberedCaptionOverlay,
  PhotoCrossfadeCarouselWithLightbox,
} from "./photo-crossfade-carousel-with-lightbox";

/**
 * "Cơ sở vật chất — Môi trường học tập được đầu tư bài bản." (V2 `section.facilities#co-so-vat-chat`):
 * 2 băng chuyền cạnh nhau (sân tập 16 ảnh · xe đào tạo 3 ảnh), cao 480px; ≤620px xếp dọc 390/300px.
 */
export function VocationalCenterFacilitiesCarouselSection() {
  const cardClassName = "min-h-[280px] bg-[#102449]";
  return (
    <section id="co-so-vat-chat" className={aboutSectionPaddingClassName}>
      <div className="container-site">
        <AboutSplitSectionHead
          eyebrow="Cơ sở vật chất"
          title={
            <>
              Môi trường học tập
              <br />
              <span>được đầu tư bài bản.</span>
            </>
          }
          description="Không gian rộng rãi, trang thiết bị hiện đại và hệ thống phương tiện đa dạng — sẵn sàng cho mọi tình huống học tập."
        />
        <div className="flex flex-col gap-[18px] min-[621px]:grid min-[621px]:grid-cols-[1.1fr_0.9fr] min-[621px]:grid-rows-[480px]">
          <div data-reveal>
            <PhotoCrossfadeCarouselWithLightbox
              photos={vocationalCenterPracticeYardPhotos}
              label="Hình ảnh sân tập lái xe tại Hiệp Phát"
              previousLabel="Xem ảnh sân tập trước"
              nextLabel="Xem ảnh sân tập tiếp theo"
              dotStyle="facility"
              sizes="(min-width: 621px) 55vw, 100vw"
              className={cn(cardClassName, "h-[390px] min-[621px]:h-full")}
              overlay={
                <PhotoCarouselNumberedCaptionOverlay
                  key="facility-practice-yard-overlay"
                  number="01"
                  title="Sân tập đạt chuẩn của bộ GTVT"
                  description="3 sân tập với hệ thống sa hình đa dạng"
                  titleClassName="mb-1 text-[28px]"
                />
              }
            />
          </div>
          <div data-reveal data-reveal-delay="1">
            <PhotoCrossfadeCarouselWithLightbox
              photos={vocationalCenterTrainingVehiclePhotos}
              label="Hình ảnh xe đào tạo tại Hiệp Phát"
              previousLabel="Xem ảnh xe đào tạo trước"
              nextLabel="Xem ảnh xe đào tạo tiếp theo"
              dotStyle="facility"
              sizes="(min-width: 621px) 45vw, 100vw"
              className={cn(cardClassName, "h-[300px] min-[621px]:h-full")}
              overlay={
                <PhotoCarouselNumberedCaptionOverlay
                  key="facility-training-vehicle-overlay"
                  number="02"
                  title="Xe đào tạo đời mới"
                  description="3 dòng xe · Số tự động, số sàn và xe tải C1"
                  titleClassName="mb-1 text-[20px]"
                />
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * "Chuyển đổi số — Công nghệ đồng hành trên từng chặng học." (V2 `section.digital`, nền navy):
 * ảnh cabin cắt chéo + huy hiệu tròn 24/7 · 3 ý có dấu ✓.
 */
export function VocationalCenterDigitalTransformationSection() {
  return (
    <section
      className={`bg-[#0a1330] text-white ${aboutSectionPaddingClassName}`}
    >
      <div className="container-site grid items-center gap-[55px] lg:grid-cols-2 lg:gap-[9vw]">
        <div
          data-reveal
          className="relative h-[370px] min-[621px]:h-[440px] min-[621px]:max-w-[620px] lg:h-[570px] lg:max-w-none"
        >
          <div className="relative h-full [clip-path:polygon(0_0,100%_7%,94%_100%,7%_94%)]">
            <Image
              src={vocationalCenterSimulatorCabinPhotoSrc}
              alt=""
              fill
              sizes="(min-width: 901px) 42vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute right-[-5px] bottom-9 flex size-[135px] flex-col items-center justify-center rounded-full bg-[#dc2626] text-center shadow-[0_22px_50px_rgba(0,0,0,0.3)] min-[621px]:right-0 min-[621px]:size-[190px] lg:-right-10">
            <strong className="font-display text-[31px] leading-[normal] font-extrabold min-[621px]:text-[42px]">
              24/7
            </strong>
            <span className="text-[14px] leading-[1.5]">
              Chủ động học
              <br />
              mọi lúc, mọi nơi
            </span>
          </div>
        </div>

        <div data-reveal data-reveal-delay="1">
          <AboutSectionEyebrowLabel tone="light">
            Chuyển đổi số
          </AboutSectionEyebrowLabel>
          <h2
            className={cn(
              aboutSectionHeadingClassName,
              "[&_span]:text-emphasis-yellow text-white",
            )}
          >
            Công nghệ đồng hành
            <br />
            trên từng <span>chặng học.</span>
          </h2>
          <p className="text-body mt-[25px] mb-[30px] leading-[1.8] text-pretty">
            Hiệp Phát ứng dụng công nghệ để tạo nên trải nghiệm học lái xe liền
            mạch, chính xác và dễ tiếp cận hơn.
          </p>
          <ul>
            {vocationalCenterDigitalTransformationItems.map((item) => (
              <li
                key={item.title}
                className="flex gap-4 border-t border-white/13 py-[17px]"
              >
                <span
                  aria-hidden="true"
                  className="grid size-7 flex-none place-items-center rounded-full bg-[rgba(139,178,255,0.13)] text-[#8bb2ff]"
                >
                  ✓
                </span>
                <div>
                  <strong className="font-display block text-[20px] leading-[normal] font-semibold">
                    {item.title}
                  </strong>
                  <span className="text-body mt-1 block">
                    {item.description}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
