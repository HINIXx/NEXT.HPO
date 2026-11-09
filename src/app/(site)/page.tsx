import { DigitalDrivingEraWelcomeHero } from "@/components/sections/digital-driving-era-welcome-hero";
import { ScrollRevealActivator } from "@/components/sections/scroll-reveal-activator";
import { ConsultationRegistrationFormCard } from "@/features/consultation-registration/components/consultation-registration-form-card";
import { CourseFlexibleScheduleInfoPanelSection } from "@/features/courses/components/course-flexible-schedule-info-panel-section";
import { CoursesTuitionShowcaseSection } from "@/features/courses/components/courses-tuition-showcase-section";
import { BrandProtectionCertificatesSection } from "@/features/home/components/brand-protection-certificates-section";
import { DigitalPlatformTrainingPanelsSection } from "@/features/home/components/digital-platform-training-panels-section";
import {
  CenterIntroVideoSection,
  InfrastructureHighlightsSection,
} from "@/features/home/components/infrastructure-and-intro-video-sections";
import { LearningResourceViewerProvider } from "@/features/learning-resources/components/learning-resource-viewer-provider";
import { SmartDrivingCurriculumAccordion } from "@/features/smart-driving-curriculum/components/smart-driving-curriculum-accordion";
import { AchievementAwardsSliderSection } from "@/features/home/components/achievement-awards-slider-section";
import { CompanyIntroductionBannerSlide } from "@/features/home/components/company-introduction-banner-slide";
import { HomeHeroIntroductionSlider } from "@/features/home/components/home-hero-introduction-slider";
import { HpoSystemEcosystemCard } from "@/features/home/components/hpo-system-ecosystem-card";
import { PressCoverageHighlightsStrip } from "@/features/press-coverage/components/press-channel-icon-and-highlights-strip";
import { PressCoverageNewsRotatorSection } from "@/features/press-coverage/components/press-coverage-news-rotator-section";
import { PressCoverageProvider } from "@/features/press-coverage/components/press-coverage-provider";
import { createPageMetadata } from "@/lib/seo/create-page-metadata";
import { siteConfig } from "@/shared/config/site";

export const metadata = createPageMetadata({
  title: siteConfig.defaultTitle,
  path: "/",
});

/**
 * Trang chủ — Cổng thông tin điện tử (V2 `index.html` @0709939). Thứ tự khối như V2:
 * slider (Kỷ nguyên AI + Hệ thống HPO · Giới thiệu công ty) → dải Báo chí đưa tin → Dấu ấn giải thưởng → Bài báo về Hiệp Phát →
 * Thương hiệu → Hạ tầng kỹ thuật → Video giới thiệu → Khóa học → Khóa học linh động → Đăng ký tư vấn →
 * Đào tạo trên nền tảng số (danh mục môn học + học liệu dùng chung). V2 "Biên bản kiểm tra" đang ẩn → không chuyển.
 */
export default function HomePage() {
  return (
    <>
      <ScrollRevealActivator />
      <HomeHeroIntroductionSlider
        slides={[
          {
            label: "Kỷ nguyên AI trong đào tạo lái xe",
            content: (
              <DigitalDrivingEraWelcomeHero
                ariaLabel="Kỷ nguyên AI trong đào tạo lái xe"
                className="pb-14"
              >
                <HpoSystemEcosystemCard />
              </DigitalDrivingEraWelcomeHero>
            ),
          },
          {
            label: "Giới thiệu công ty",
            content: <CompanyIntroductionBannerSlide />,
          },
        ]}
      />
      <PressCoverageProvider>
        <PressCoverageHighlightsStrip />
        <AchievementAwardsSliderSection />
        <PressCoverageNewsRotatorSection />
      </PressCoverageProvider>
      <BrandProtectionCertificatesSection />
      <InfrastructureHighlightsSection />
      <CenterIntroVideoSection />
      <CoursesTuitionShowcaseSection />
      <CourseFlexibleScheduleInfoPanelSection />
      <section
        id="dang-ky-tu-van"
        aria-label="Đăng ký tư vấn"
        className="scroll-mt-[150px] pb-14 sm:pb-[72px]"
      >
        <div className="container-site">
          <ConsultationRegistrationFormCard />
        </div>
      </section>
      <LearningResourceViewerProvider>
        <DigitalPlatformTrainingPanelsSection
          curriculum={<SmartDrivingCurriculumAccordion />}
        />
      </LearningResourceViewerProvider>
    </>
  );
}
