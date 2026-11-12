import type { Metadata } from "next";
import { siteConfig } from "@/shared/config/site";

/** Chuẩn hóa đường dẫn canonical: luôn bắt đầu bằng `/` và kết thúc bằng `/` (trailingSlash). */
export function toCanonicalPath(path: string): string {
  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  if (withLeadingSlash === "/") return "/";
  return `${withLeadingSlash.replace(/\/+$/, "")}/`;
}

type PageMetadataInput = {
  /** Tiêu đề đầy đủ của trang (giữ đúng chữ V2, ví dụ "Học phí đào tạo lái xe | HPO"). */
  title: string;
  /** Đường dẫn route, ví dụ "/hoc-phi/". */
  path: string;
  description?: string;
  /** Ảnh OG riêng của trang (đường dẫn trong public/). Mặc định: logo. */
  ogImage?: { url: string; width: number; height: number; alt: string };
  /**
   * Ghi đè chỉ thị robots của trang (mặc định theo `siteConfig.indexingEnabled`).
   * V2 đánh dấu `noindex, nofollow` cho trang ưu đãi vì giá ưu đãi riêng từng xã
   * (URL có `?location=`) — không nên để máy tìm kiếm lập chỉ mục.
   */
  robots?: { index: boolean; follow: boolean };
};

/**
 * Metadata cho từng trang: title, description, canonical, Open Graph.
 * URL tương đối được ghép với `metadataBase` (SITE_URL) đặt ở root layout.
 * Dùng: `export const metadata = createPageMetadata({ title, path, description })` trong page.tsx.
 */
export function createPageMetadata({
  title,
  path,
  description = siteConfig.description,
  ogImage = siteConfig.defaultOgImage,
  robots,
}: PageMetadataInput): Metadata {
  const canonical = toCanonicalPath(path);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    // Trang không ghi đè thì theo mặc định của site (noindex tới khi duyệt SEO production).
    ...(robots ? { robots: { ...robots } } : {}),
    openGraph: {
      type: "website",
      locale: "vi_VN",
      siteName: siteConfig.name,
      title,
      description,
      url: canonical,
      images: [ogImage],
    },
  };
}
