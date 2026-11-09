import type { AboutHeroProofStat } from "../components/about-center-full-bleed-photo-hero";
import type { AboutNumberedFeature } from "../components/about-numbered-feature-trio-band";
import { galleryPhotos, wordpressUpload } from "./gallery-photo-types";

/** Nội dung trang Trung tâm Giáo dục nghề nghiệp — chép đúng V2 @0709939 (`gioi-thieu/trung-tam-giao-duc-nghe-nghiep/`). */

/** Ảnh cổng trung tâm + học viên: nền đầu trang và ảnh khối "Học lái xe hiện đại". */
export const vocationalCenterGatePhotoSrc = wordpressUpload(
  "2026/01/IMG_0584-1-1024x765.jpg",
);

export const vocationalCenterHeroProofStats: readonly AboutHeroProofStat[] = [
  { value: "03", label: "Sân tập tiêu chuẩn" },
  { value: "15+", label: "Năm kinh nghiệm" },
  { value: "4.0", label: "Đào tạo số hóa" },
];

export const vocationalCenterDigitalLearningStats = [
  {
    value: "03 sân tập",
    label: "Sa hình đa dạng, môi trường thực hành rộng rãi",
  },
  {
    value: "Học tập 4.0",
    label: "Kết hợp trực tuyến, mô phỏng và thực hành thực tế",
  },
] as const;

export const vocationalCenterDigitalLearningBenefits = [
  "Bài học trực tuyến giúp chủ động thời gian",
  "Mô phỏng tình huống giao thông sát thực tế",
  "Theo dõi tiến độ học tập thông minh, chính xác",
] as const;

export const vocationalCenterFeatures: readonly AboutNumberedFeature[] = [
  {
    icon: "⌁",
    title: "Học tập linh hoạt",
    description:
      "Kết hợp học trực tuyến và trực tiếp, chủ động thời gian nhưng vẫn bảo đảm tiến độ.",
  },
  {
    icon: "◎",
    title: "Theo dõi thông minh",
    description:
      "Quản lý hành trình học rõ ràng, minh bạch qua nền tảng đào tạo số.",
  },
  {
    icon: "◇",
    title: "Thực hành thực chất",
    description:
      "Rèn luyện với giáo viên giàu kinh nghiệm trên xe và sân tập tiêu chuẩn.",
  },
];

export const vocationalCenterPracticeYardPhotos = galleryPhotos([
  ["2025/11/San-16-1-1024x683.jpg", "Toàn cảnh sân tập lái xe Hiệp Phát"],
  ["2025/11/San-1-2-1024x576.jpg", "Sa hình sân tập Hiệp Phát 1"],
  ["2025/11/San-2-2-1024x576.jpg", "Sa hình sân tập Hiệp Phát 2"],
  ["2025/11/San-3-2-1024x576.jpg", "Sa hình sân tập Hiệp Phát 3"],
  ["2025/11/San-4-2-1024x576.jpg", "Khu vực thực hành tại sân tập Hiệp Phát"],
  ["2025/11/San-5-1-1024x576.jpg", "Đường thực hành trong sân tập Hiệp Phát"],
  ["2025/11/San-6-1-1024x576.jpg", "Tình huống sa hình tại Hiệp Phát"],
  ["2025/11/San-7-1-1024x576.jpg", "Khu luyện tập lái xe Hiệp Phát"],
  ["2025/11/San-8-1-1024x576.jpg", "Cơ sở sân tập lái xe Hiệp Phát"],
  ["2025/11/San-9-1-1024x576.jpg", "Hệ thống sa hình tiêu chuẩn Hiệp Phát"],
  ["2025/11/San-10-1-1024x683.jpg", "Sân tập rộng rãi tại Hiệp Phát"],
  ["2025/11/San-11-1-1024x682.jpg", "Đường tập lái tại Trung tâm Hiệp Phát"],
  ["2025/11/San-12-1-683x1024.jpg", "Biển báo tại sân tập Hiệp Phát"],
  ["2025/11/San-13-1-1024x576.jpg", "Khu sa hình tại Trung tâm Hiệp Phát"],
  ["2025/11/San-14-1-1024x576.jpg", "Không gian sân tập Hiệp Phát"],
  ["2025/11/San-15-1-1024x683.jpg", "Sân tập tiêu chuẩn Hiệp Phát"],
]);

export const vocationalCenterTrainingVehiclePhotos = galleryPhotos([
  ["2026/01/IMG_5428-1-1024x544.jpg", "Xe đào tạo đời mới tại Hiệp Phát"],
  ["2026/01/IMG_5415-1-1024x648.jpg", "Xe đào tạo hạng C1 tại Hiệp Phát"],
  ["2026/01/IMG_5469-1-1024x683.jpg", "Xe đào tạo hạng B tại Hiệp Phát"],
]);

/** Ảnh cabin mô phỏng khối "Chuyển đổi số". */
export const vocationalCenterSimulatorCabinPhotoSrc = wordpressUpload(
  "2026/01/cabin2-1.png",
);

export const vocationalCenterDigitalTransformationItems = [
  {
    title: "Học lý thuyết trực tuyến",
    description: "Ôn tập chủ động trên ứng dụng Hiệp Phát Edu.",
  },
  {
    title: "Mô phỏng tình huống thực tế",
    description: "Làm quen tình huống giao thông trước khi ra đường.",
  },
  {
    title: "Quản lý tiến độ thông minh",
    description: "Theo dõi lộ trình học rõ ràng và chính xác.",
  },
] as const;
