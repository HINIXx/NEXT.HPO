import type { AboutHeroProofStat } from "../components/about-center-full-bleed-photo-hero";
import type { AboutNumberedFeature } from "../components/about-numbered-feature-trio-band";
import { galleryPhotos, wordpressUpload } from "./gallery-photo-types";

/** Nội dung trang Trung tâm sát hạch lái xe ô tô — chép đúng V2 @0709939 (`gioi-thieu/trung-tam-sat-hach/`). */

/** Ảnh toàn cảnh trung tâm: nền đầu trang + ảnh khối "Giới thiệu trung tâm". */
export const examCenterPanoramaPhotoSrc = wordpressUpload(
  "2025/11/TTSH-1-1024x724.webp",
);

export const examCenterHeroProofStats: readonly AboutHeroProofStat[] = [
  { value: "35.880", label: "m² tổng diện tích" },
  { value: "Loại 1", label: "Quy chuẩn quốc gia" },
  { value: "06", label: "Nhóm hạng GPLX" },
];

/** Thẻ hạng dưới đoạn giới thiệu (V2 chỉ hiện 3 hạng đang đào tạo). */
export const examCenterLicenseClassChips = [
  "B tự động",
  "B cơ khí",
  "C1",
] as const;

export const examCenterFeatures: readonly AboutNumberedFeature[] = [
  {
    icon: "◎",
    title: "Chấm điểm tự động",
    description:
      "Thiết bị được trang bị đồng bộ theo quy chuẩn, bảo đảm kết quả chính xác và minh bạch.",
  },
  {
    icon: "◇",
    title: "Sân thi đạt chuẩn",
    description:
      "Không gian rộng rãi, đầy đủ bài thi và hệ thống công nghệ hỗ trợ hiện đại.",
  },
  {
    icon: "⌁",
    title: "Xe sát hạch đời mới",
    description:
      "Các dòng xe Toyota và Isuzu được bảo dưỡng thường xuyên, vận hành ổn định.",
  },
];

export const examCenterTestYardPhotos = galleryPhotos([
  ["2025/11/San-16-1-1024x683.jpg", "Toàn cảnh sân sát hạch Hiệp Phát"],
  ["2025/11/San-1-2-1024x576.jpg", "Sa hình sát hạch số 1"],
  ["2025/11/San-2-2-1024x576.jpg", "Sa hình sát hạch số 2"],
  ["2025/11/San-3-2-1024x576.jpg", "Sa hình sát hạch số 3"],
  ["2025/11/San-4-2-1024x576.jpg", "Khu vực thi thực hành"],
  ["2025/11/San-5-1-1024x576.jpg", "Đường thi sát hạch"],
]);

export const examCenterTestVehiclePhotos = galleryPhotos([
  ["2025/11/San-2-1-1-1024x494.jpg", "Xe sát hạch Hiệp Phát"],
  ["2025/11/San-1-1-1-1024x597.jpg", "Xe Toyota sát hạch"],
  ["2025/11/San-3-1-1-1024x683.jpg", "Xe Isuzu sát hạch"],
  ["2025/11/San-4-1-1-1024x724.jpg", "Dàn xe sát hạch đời mới"],
]);
