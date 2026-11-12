import { StructuredDataJsonLdScript } from "@/components/seo/structured-data-json-ld-script";
import { createBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";
import { CourseFlexibleScheduleInfoPanelSection } from "@/features/courses/components/course-flexible-schedule-info-panel-section";
import { CoursesTuitionShowcaseSection } from "@/features/courses/components/courses-tuition-showcase-section";
import { createPageMetadata } from "@/lib/seo/create-page-metadata";

export const metadata = createPageMetadata({
  title: "Học phí đào tạo lái xe | HPO",
  path: "/hoc-phi/",
  description:
    "Bảng học phí đào tạo lái xe hạng B số tự động, B số cơ khí và C1 tại HPO.",
});

export default function TuitionPage() {
  return (
    <>
      <StructuredDataJsonLdScript data={createBreadcrumbJsonLd("/hoc-phi/")} />
      {/* V2 không có h1 (tiêu đề nhìn thấy là h2 của khối khóa học) → h1 ẩn cho SEO, không đổi giao diện. */}
      <h1 className="sr-only">Học phí đào tạo lái xe hạng B và C1</h1>
      <CoursesTuitionShowcaseSection />
      <CourseFlexibleScheduleInfoPanelSection />
    </>
  );
}
