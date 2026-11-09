/**
 * Cấu hình chung của site. Đọc biến môi trường lúc `next build` (static export → giá trị đóng băng vào HTML).
 * - SITE_URL: tên miền thật, ví dụ https://hpo.edu.vn (dùng cho canonical, Open Graph, sitemap, JSON-LD).
 * - SITE_INDEXABLE=true: chỉ bật khi đã duyệt SEO production. Mặc định noindex + robots.txt chặn hết.
 */
const siteUrl = process.env.SITE_URL || "http://localhost:3000";

export const siteConfig = {
  /** Tên dùng cho og:site_name. */
  name: "HPO – Hiệp Phát",
  /** Tiêu đề + mô tả trang chủ V2 (index.html), giữ nguyên câu chữ. */
  defaultTitle: "HPO – Trung Tâm Giáo Dục Nghề Nghiệp Ô Tô Hiệp Phát",
  description:
    "Đào tạo lái xe ứng dụng AI, sân tập chuẩn quốc gia QCVN 40:2024/BGTVT. Toyota Vios & Isuzu đời mới. 15+ năm kinh nghiệm.",
  url: siteUrl,
  indexingEnabled:
    process.env.SITE_INDEXABLE === "true" &&
    Boolean(process.env.SITE_URL) &&
    !/staging|localhost|127\.0\.0\.1/i.test(siteUrl),
  /** Ảnh Open Graph mặc định (V2 chưa có ảnh OG riêng). */
  defaultOgImage: {
    url: "/assets/images/logo.png",
    width: 900,
    height: 280,
    alt: "Logo Hiệp Phát",
  },
  gtmId: "GTM-5N79VCJB",
} as const;
