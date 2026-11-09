import { partnerEventStories } from "../data/vocational-center-partner-event-stories";
import {
  AboutSplitSectionHead,
  aboutSectionPaddingClassName,
} from "./about-page-shared-typography";
import { PhotoCrossfadeCarouselWithLightbox } from "./photo-crossfade-carousel-with-lightbox";

/**
 * "Hợp tác & liên kết đào tạo — Cùng cộng đồng kiến tạo những hành trình mới." (V2 `section.partners`):
 * 8 thẻ hoạt động, mỗi thẻ 1 băng chuyền 16:9 + nhóm · tên · mô tả; ≥901px 2 cột.
 */
export function VocationalCenterPartnerEventStoriesSection() {
  return (
    <section className={`bg-[#f8faff] ${aboutSectionPaddingClassName}`}>
      <div className="container-site">
        <AboutSplitSectionHead
          alignTop
          eyebrow="Hợp tác & liên kết đào tạo"
          title={
            <>
              Cùng cộng đồng kiến tạo
              <br />
              <span>những hành trình mới.</span>
            </>
          }
          description="Từ nhà trường, lực lượng vũ trang đến doanh nghiệp và các diễn đàn khu vực, Hiệp Phát chủ động kết nối để đưa cơ hội học nghề đến gần hơn với cộng đồng."
        />
        <div className="grid gap-5 min-[621px]:gap-7 lg:grid-cols-2">
          {partnerEventStories.map((story, index) => (
            // data-reveal ở lớp ngoài: transition của hiệu ứng nổi khi rê chuột không đè transition hiện dần.
            <div
              key={story.meta}
              data-reveal
              data-reveal-delay={index % 2 ? "1" : undefined}
              className="min-w-0"
            >
              <article className="ease-hp flex h-full min-w-0 flex-col border border-[#dce4f0] bg-white shadow-[0_18px_50px_-38px_rgba(7,26,58,0.5)] transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_26px_58px_-35px_rgba(7,26,58,0.55)]">
                <PhotoCrossfadeCarouselWithLightbox
                  photos={story.photos}
                  label={story.carouselLabel}
                  dotStyle="event"
                  revealArrowsOnHover
                  sizes="(min-width: 901px) 46vw, 100vw"
                  className="aspect-video bg-[#dce4f0]"
                />
                <div className="flex-1 px-[22px] pt-[23px] pb-[27px] min-[621px]:px-[30px] min-[621px]:pt-7 min-[621px]:pb-8">
                  <p className="font-display mb-[13px] text-[14px] leading-[normal] font-bold tracking-[0.13em] text-[#1e40af] uppercase">
                    {story.meta}
                  </p>
                  <h3 className="font-display text-[clamp(18px,1.5vw,23px)] leading-[1.35] font-bold tracking-[-0.025em] text-balance text-[#0a1330]">
                    {story.title}
                  </h3>
                  <p className="text-body mt-3.5 leading-[1.6] text-pretty text-black">
                    {story.description}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
