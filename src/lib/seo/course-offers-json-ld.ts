import type { ItemList, WithContext } from "schema-dts";
import type { CourseTuitionOffering } from "@/features/courses/data/course-tuition-offerings";
import { siteConfig } from "@/shared/config/site";

/** "16.000.000đ" → "16000000". */
const toPlainVnd = (tuition: string) => tuition.replace(/\D/g, "");

/** "2 tháng" → "P2M" (ISO 8601). Không khớp mẫu → bỏ trường. */
const toIsoDuration = (duration: string) => {
  const months = /^(\d+)\s*tháng$/.exec(duration.trim());
  return months ? `P${months[1]}M` : undefined;
};

/** "31/01/2027" → "2027-01-31". */
const toIsoDate = (date: string) => {
  const [day, month, year] = date.split("/");
  return `${year}-${month}-${day}`;
};

/**
 * JSON-LD danh sách khóa học + học phí — đúng số liệu thẻ đang hiện trên trang
 * (trang chủ/Học phí/TT GDNN 16/16/18 triệu, Ưu đãi 15/15/17 triệu). Mô tả ghép từ dữ liệu thẻ, không thêm thông tin.
 */
export function createCourseOffersJsonLd(
  courses: readonly CourseTuitionOffering[],
  priceValidUntil: string,
): WithContext<ItemList> {
  const provider = {
    "@type": "EducationalOrganization" as const,
    name: "Trung Tâm Giáo Dục Nghề Nghiệp Ô Tô Hiệp Phát",
    url: new URL("/", siteConfig.url).toString(),
  };
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Khóa học lái xe tại Hiệp Phát",
    itemListElement: courses.map((course, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Course",
        name: `Đào tạo lái xe ${course.className} – ${course.vehicleType}`,
        description: `Khóa học lái xe ${course.className} (${course.vehicleType.toLowerCase()}), thời gian học ${course.duration}.`,
        inLanguage: "vi",
        provider,
        timeRequired: toIsoDuration(course.duration),
        offers: {
          "@type": "Offer",
          category: "Học phí",
          price: toPlainVnd(course.tuition),
          priceCurrency: "VND",
          priceValidUntil: toIsoDate(priceValidUntil),
        },
      },
    })),
  };
}
