import { ScrollRevealActivator } from "@/components/sections/scroll-reveal-activator";
import { AboutCenterFullBleedPhotoHero } from "@/features/about-centers/components/about-center-full-bleed-photo-hero";
import { AboutNumberedFeatureTrioBand } from "@/features/about-centers/components/about-numbered-feature-trio-band";
import {
  AboutGlassOutlinePillLink,
  AboutPrimaryRedPillLink,
} from "@/features/about-centers/components/about-page-call-to-action-buttons";
import {
  ExamCenterCallSupportSection,
  ExamCenterFacilitiesGallerySection,
  ExamCenterOverviewIntroSection,
} from "@/features/about-centers/components/exam-center-intro-facilities-and-call-sections";
import {
  examCenterFeatures,
  examCenterHeroProofStats,
  examCenterPanoramaPhotoSrc,
} from "@/features/about-centers/data/driving-exam-center-page-content";
import { createPageMetadata } from "@/lib/seo/create-page-metadata";
import { contact } from "@/shared/config/contact";

export const metadata = createPageMetadata({
  title: "Trung tâm sát hạch lái xe ô tô | Hiệp Phát",
  path: "/gioi-thieu/trung-tam-sat-hach/",
  description:
    "Trung tâm sát hạch lái xe ô tô Hiệp Phát đạt quy chuẩn quốc gia loại 1, sân sát hạch 35.880 m² và hệ thống chấm điểm tự động.",
});

/**
 * Giới thiệu Trung tâm sát hạch (V2 `gioi-thieu/trung-tam-sat-hach/`):
 * đầu trang · giới thiệu trung tâm · 3 ý · cơ sở vật chất (2 băng chuyền) · gọi tư vấn.
 * Khối "Đội ngũ nhân sự" V2 đang ẩn (hidden từ 02/11) → không chuyển.
 */
export default function DrivingExamCenterPage() {
  return (
    <>
      <ScrollRevealActivator />
      <AboutCenterFullBleedPhotoHero
        backgroundImageSrc={examCenterPanoramaPhotoSrc}
        backgroundPositionClassName="object-[center_65%]"
        kicker="Trung tâm sát hạch loại 1"
        title={
          <>
            Thi minh bạch.
            <br />
            <em>Lái xe an toàn.</em>
          </>
        }
        description="Hệ thống sát hạch hiện đại, sân thi đạt chuẩn và chấm điểm tự động — mang đến trải nghiệm thi chuyên nghiệp, công bằng và an toàn."
        actions={
          <>
            <AboutPrimaryRedPillLink href={contact.registerUrl}>
              Đăng ký tư vấn ngay
            </AboutPrimaryRedPillLink>
            <AboutGlassOutlinePillLink href="#co-so-sat-hach">
              Xem cơ sở vật chất
            </AboutGlassOutlinePillLink>
          </>
        }
        proofStats={examCenterHeroProofStats}
        hideProofStatsBelowDesktop
      />
      <ExamCenterOverviewIntroSection />
      <AboutNumberedFeatureTrioBand features={examCenterFeatures} />
      <ExamCenterFacilitiesGallerySection />
      <ExamCenterCallSupportSection />
    </>
  );
}
