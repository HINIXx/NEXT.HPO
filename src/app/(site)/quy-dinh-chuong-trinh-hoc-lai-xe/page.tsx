import { StructuredDataJsonLdScript } from "@/components/seo/structured-data-json-ld-script";
import { createBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";
import { ScrollRevealActivator } from "@/components/sections/scroll-reveal-activator";
import {
  AdmissionRegistrationCallToAction,
  AdmissionRequiredDocumentsSection,
} from "@/features/driving-training-process/components/admission-documents-and-registration-sections";
import { CourseCompletionReviewStepSection } from "@/features/driving-training-process/components/course-completion-review-step-section";
import {
  DrivingExamStepSection,
  DrivingLicenseIssuanceStepSection,
} from "@/features/driving-training-process/components/driving-exam-and-license-step-sections";
import { TrainingProgramStepSection } from "@/features/driving-training-process/components/training-program-step-section";
import { TrainingProcessPageHero } from "@/features/driving-training-process/components/training-process-page-hero";
import { TrainingProcessStickyStepNavigation } from "@/features/driving-training-process/components/training-process-sticky-step-navigation";
import { SmartDrivingCurriculumAccordion } from "@/features/smart-driving-curriculum/components/smart-driving-curriculum-accordion";
import { createPageMetadata } from "@/lib/seo/create-page-metadata";

export const metadata = createPageMetadata({
  title: "Quy trình đào tạo lái xe ô tô | HPO",
  path: "/quy-dinh-chuong-trinh-hoc-lai-xe/",
  description:
    "Quy trình đào tạo lái xe ô tô tại HPO từ tuyển sinh, đào tạo, hoàn thành khóa học, sát hạch đến cấp giấy phép lái xe.",
});

/**
 * Quy trình đào tạo (V2 `quy-dinh-chuong-trinh-hoc-lai-xe/`): đầu trang + thanh 5 bước dính +
 * Bước 1 Tuyển sinh · Bước 2 Chương trình đào tạo · Bước 3 Kiểm tra hoàn thành · Bước 4 Sát hạch · Bước 5 Nhận GPLX.
 */
export default function DrivingTrainingProcessPage() {
  return (
    <>
      <StructuredDataJsonLdScript
        data={createBreadcrumbJsonLd("/quy-dinh-chuong-trinh-hoc-lai-xe/")}
      />
      <ScrollRevealActivator />
      <TrainingProcessPageHero />
      <TrainingProcessStickyStepNavigation />
      <AdmissionRequiredDocumentsSection />
      <AdmissionRegistrationCallToAction />
      <TrainingProgramStepSection
        curriculum={<SmartDrivingCurriculumAccordion />}
      />
      <CourseCompletionReviewStepSection />
      <DrivingExamStepSection />
      <DrivingLicenseIssuanceStepSection />
    </>
  );
}
