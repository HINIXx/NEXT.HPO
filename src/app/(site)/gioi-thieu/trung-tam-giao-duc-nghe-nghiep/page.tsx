import { StructuredDataJsonLdScript } from "@/components/seo/structured-data-json-ld-script";
import { createBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";
import { ScrollRevealActivator } from "@/components/sections/scroll-reveal-activator";
import {
  AboutCenterFullBleedPhotoHero,
  AboutHeroHotlineLink,
} from "@/features/about-centers/components/about-center-full-bleed-photo-hero";
import { AboutNumberedFeatureTrioBand } from "@/features/about-centers/components/about-numbered-feature-trio-band";
import {
  AboutGlassOutlinePillLink,
  AboutPrimaryRedPillLink,
} from "@/features/about-centers/components/about-page-call-to-action-buttons";
import {
  VocationalCenterAboutUsIntroSection,
  VocationalCenterDigitalLearningIntroSection,
} from "@/features/about-centers/components/vocational-center-digital-learning-and-about-us-sections";
import {
  VocationalCenterDigitalTransformationSection,
  VocationalCenterFacilitiesCarouselSection,
} from "@/features/about-centers/components/vocational-center-facilities-and-digital-transformation-sections";
import { VocationalCenterPartnerEventStoriesSection } from "@/features/about-centers/components/vocational-center-partner-event-stories-section";
import {
  vocationalCenterFeatures,
  vocationalCenterGatePhotoSrc,
  vocationalCenterHeroProofStats,
} from "@/features/about-centers/data/vocational-training-center-page-content";
import { CoursesTuitionShowcaseSection } from "@/features/courses/components/courses-tuition-showcase-section";
import { createPageMetadata } from "@/lib/seo/create-page-metadata";
import { contact } from "@/shared/config/contact";

export const metadata = createPageMetadata({
  title: "Trung tâm Giáo dục nghề nghiệp | Hiệp Phát",
  path: "/gioi-thieu/trung-tam-giao-duc-nghe-nghiep/",
  description:
    "Giới thiệu Trung tâm Giáo dục nghề nghiệp ô tô Hiệp Phát — môi trường đào tạo lái xe hiện đại, thực tiễn và ứng dụng công nghệ.",
});

/**
 * Giới thiệu Trung tâm Giáo dục nghề nghiệp (V2 `gioi-thieu/trung-tam-giao-duc-nghe-nghiep/`):
 * đầu trang · học lái xe hiện đại · về chúng tôi · 3 ý · cơ sở vật chất · chuyển đổi số · hợp tác · khóa học (dùng chung).
 * Khối "Đội ngũ nhân sự" V2 đang ẩn (hidden từ 03/11) → không chuyển.
 */
export default function VocationalTrainingCenterPage() {
  return (
    <>
      <StructuredDataJsonLdScript
        data={createBreadcrumbJsonLd(
          "/gioi-thieu/trung-tam-giao-duc-nghe-nghiep/",
        )}
      />
      <ScrollRevealActivator />
      <AboutCenterFullBleedPhotoHero
        backgroundImageSrc={vocationalCenterGatePhotoSrc}
        backgroundPositionClassName="object-[65%_center] lg:object-[center_42%]"
        kicker="Giới thiệu Trung tâm giáo dục nghề nghiệp Hiệp Phát"
        title={
          <>
            Vững tay lái.
            <br />
            <em>Vững hành trình.</em>
          </>
        }
        description="Trung tâm Giáo dục nghề nghiệp ô tô Hiệp Phát tiên phong đưa công nghệ vào đào tạo, giúp mỗi học viên học đúng, luyện chắc và tự tin làm chủ tay lái."
        actions={
          <>
            <AboutPrimaryRedPillLink href={contact.registerUrl}>
              Đăng ký tư vấn ngay
            </AboutPrimaryRedPillLink>
            <AboutGlassOutlinePillLink href="#khoa-hoc">
              Xem khóa học
            </AboutGlassOutlinePillLink>
            <AboutHeroHotlineLink
              href={contact.hotlineHref}
              label="Hotline tư vấn"
              phone={contact.hotline}
            />
          </>
        }
        proofStats={vocationalCenterHeroProofStats}
      />
      <VocationalCenterDigitalLearningIntroSection />
      <VocationalCenterAboutUsIntroSection />
      <AboutNumberedFeatureTrioBand features={vocationalCenterFeatures} />
      <VocationalCenterFacilitiesCarouselSection />
      <VocationalCenterDigitalTransformationSection />
      <VocationalCenterPartnerEventStoriesSection />
      <CoursesTuitionShowcaseSection />
    </>
  );
}
