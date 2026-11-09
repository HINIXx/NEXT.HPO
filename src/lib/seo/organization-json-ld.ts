import type { EducationalOrganization, WithContext } from "schema-dts";
import { contact, locations, socialLinks } from "@/shared/config/contact";
import { siteConfig } from "@/shared/config/site";

/**
 * JSON-LD tổ chức — CHỈ dùng thông tin có thật trong V2 (header/footer). Không thêm giờ mở cửa,
 * năm thành lập, đánh giá… khi chưa có nguồn. Link "TikTok" của V2 trỏ về hpo.edu.vn nên không đưa vào sameAs.
 */
export function createOrganizationJsonLd(): WithContext<EducationalOrganization> {
  const absolute = (path: string) => new URL(path, siteConfig.url).toString();
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Trung Tâm Giáo Dục Nghề Nghiệp Ô Tô Hiệp Phát",
    alternateName: "HPO",
    legalName: contact.companyName,
    url: absolute("/"),
    logo: absolute("/assets/images/logo.png"),
    email: contact.email,
    telephone: contact.hotlineE164,
    address: {
      "@type": "PostalAddress",
      streetAddress: "176 Thế Lữ, Ấp 1",
      addressLocality: "Xã Tân Nhựt",
      addressRegion: "TP. Hồ Chí Minh",
      addressCountry: "VN",
    },
    location: locations.map((location) => ({
      "@type": "Place",
      name: location.name.replace(/^\d+\.\s*/, ""),
      address: location.address,
      telephone: location.phoneE164,
    })),
    sameAs: socialLinks
      .filter((link) => link.network !== "tiktok")
      .map((link) => link.href),
  };
}

/** Chuỗi JSON an toàn để nhúng trong <script type="application/ld+json"> (chặn `</script>`). */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
