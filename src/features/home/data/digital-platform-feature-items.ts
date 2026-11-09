/** Mục mở/đóng + ảnh của 2 panel "Đào tạo lái xe trên nền tảng số" (V2 `.platform-acc` data-img), chữ giữ nguyên V2. */
export type PlatformFeatureItem = {
  label: string;
  body: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption: string;
  };
};

export const platformTheoryItems: readonly PlatformFeatureItem[] = [
  {
    label: "Xác thực khuôn mặt",
    body: "Người học hoàn thành nội dung và ghi nhận thời gian học thực bằng xác thực khuôn mặt, giúp quá trình học minh bạch và đúng tiến độ.",
    image: {
      src: "/assets/images/platform/xac-thuc-khuon-mat.webp",
      alt: "Xác thực khuôn mặt",
      width: 640,
      height: 640,
      caption: "Xác thực khuôn mặt",
    },
  },
  {
    label: "Ứng dụng đa nền tảng (Windows, Android, iOS)",
    body: "Học viên có thể học mọi lúc, mọi nơi trên Windows, Android và iOS, chủ động thời gian học và giảm chi phí di chuyển.",
    image: {
      src: "/assets/images/platform/ung-dung-da-nen-tang.webp",
      alt: "Ứng dụng đa nền tảng",
      width: 900,
      height: 461,
      caption: "Ứng dụng đa nền tảng",
    },
  },
];

export const platformPracticeItems: readonly PlatformFeatureItem[] = [
  {
    label: "Thực hành lái xe trên sân sa hình",
    body: "Luyện xuất phát, dừng xe ngang dốc, ghép xe và xử lý giao lộ dưới sự hướng dẫn trực tiếp của giáo viên.",
    image: {
      src: "/assets/images/platform/thuc-hanh-mo-phong-sa-hinh.webp",
      alt: "Mô phỏng sa hình",
      width: 1428,
      height: 803,
      caption: "Mô phỏng sa hình",
    },
  },
  {
    label: "Thực hành lái xe trên đường (DAT)",
    body: "Hệ thống DAT ghi nhận đầy đủ quãng đường và thời gian thực hành, giúp học viên làm quen với tình huống giao thông thực tế.",
    image: {
      src: "/assets/images/platform/thuc-hanh-mo-phong-dat.webp",
      alt: "Mô phỏng DAT",
      width: 1428,
      height: 803,
      caption: "Mô phỏng DAT",
    },
  },
];
