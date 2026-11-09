import { DigitalDrivingEraWelcomeHero } from "@/components/sections/digital-driving-era-welcome-hero";
import { ScrollRevealActivator } from "@/components/sections/scroll-reveal-activator";
import { ConsultationRegistrationFormCard } from "@/features/consultation-registration/components/consultation-registration-form-card";
import { CoursesTuitionShowcaseSection } from "@/features/courses/components/courses-tuition-showcase-section";
import { promotionTuitionByCourseId } from "@/features/courses/data/course-tuition-offerings";
import { AdmissionRequiredDocumentsSection } from "@/features/driving-training-process/components/admission-documents-and-registration-sections";
import { PromotionTrainingProgramOverviewSection } from "@/features/promotion-offer/components/promotion-training-program-overview-section";
import { createPageMetadata } from "@/lib/seo/create-page-metadata";

export const metadata = createPageMetadata({
  title: "Chương trình ưu đãi học lái xe | Hiệp Phát",
  path: "/chuong-trinh-uu-dai/",
  description:
    "Những giấy tờ cần nộp khi đăng ký học lái xe ô tô và các địa điểm nhận hồ sơ của chương trình ưu đãi tại địa phương.",
});

/**
 * Chương trình ưu đãi (V2 `chuong-trinh-uu-dai/`) — trang đích khi quét QR tờ rơi từng xã: `?location=TanNhut1793756520`.
 * Đầu trang "Kỷ nguyên AI" · 7 giấy tờ cần nộp (dùng lại Bước 1 trang Quy trình) · form Đăng ký tư vấn (gửi Google Sheet,
 * đọc `?location=` → tên xã/ngày hết hạn) · Khóa học (dùng chung, giá ưu đãi 15/15/17 triệu như V2) · Chương trình đào tạo.
 * V2 có bảng "Nơi nhận hồ sơ tại xã…" + thông báo trạng thái nhưng đang ẩn/comment → không chuyển.
 */
export default function PromotionOfferPage() {
  return (
    <>
      <ScrollRevealActivator />
      <DigitalDrivingEraWelcomeHero />
      <AdmissionRequiredDocumentsSection
        eyebrow="Hướng dẫn những hồ sơ cần nộp"
        showChecklist
        sectionClassName="pt-6 pb-12 min-[641px]:pt-9 min-[641px]:pb-16"
      />
      <section
        aria-label="Đăng ký học lái xe"
        className="pt-10 pb-[82px] min-[641px]:pt-14 lg:pb-[104px]"
      >
        <div className="container-site">
          <ConsultationRegistrationFormCard
            className="mt-8"
            documentTitlePrefix="Chương trình ưu đãi học lái xe"
          />
        </div>
      </section>
      <CoursesTuitionShowcaseSection
        tuitionByCourseId={promotionTuitionByCourseId}
      />
      <PromotionTrainingProgramOverviewSection />
    </>
  );
}
