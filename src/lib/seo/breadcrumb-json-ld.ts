import type { BreadcrumbList, WithContext } from "schema-dts";
import {
  homeLink,
  isNavGroup,
  primaryNavigation,
  privacyPolicyLink,
} from "@/shared/config/navigation";
import { siteConfig } from "@/shared/config/site";
import { toCanonicalPath } from "./create-page-metadata";

/** Tên trang theo menu header (nguồn duy nhất), cộng 2 trang không có trên menu ngang. */
const pageLabelByPath: ReadonlyMap<string, string> = new Map([
  ...primaryNavigation.flatMap((entry) =>
    isNavGroup(entry)
      ? entry.items.map((item) => [item.href, item.label] as const)
      : [[entry.href, entry.label] as const],
  ),
  ["/chuong-trinh-uu-dai/", "Chương trình ưu đãi"],
  [privacyPolicyLink.href, privacyPolicyLink.label],
]);

/**
 * BreadcrumbList 2 cấp "Trang chủ › <trang>" cho trang con (Google hiện đường dẫn thay URL trong kết quả tìm kiếm).
 * Nhóm "Giới thiệu"/"Tra cứu" không có trang riêng (bấm mở trang con đầu) nên không thành cấp giữa.
 */
export function createBreadcrumbJsonLd(
  path: string,
): WithContext<BreadcrumbList> {
  const canonical = toCanonicalPath(path);
  const label = pageLabelByPath.get(canonical);
  if (!label) throw new Error(`Chưa có tên breadcrumb cho ${canonical}`);
  const absolute = (href: string) => new URL(href, siteConfig.url).toString();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: homeLink.mobileLabel,
        item: absolute(homeLink.href),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: label,
        item: absolute(canonical),
      },
    ],
  };
}
