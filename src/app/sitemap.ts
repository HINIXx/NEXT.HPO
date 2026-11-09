import type { MetadataRoute } from "next";
import { publicRoutes } from "@/shared/config/navigation";
import { siteConfig } from "@/shared/config/site";

// Static export: sinh sẵn sitemap.xml lúc build.
export const dynamic = "force-static";

/** Rỗng khi chưa bật index (SITE_INDEXABLE). Route lấy từ `publicRoutes`. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.indexingEnabled) return [];
  return publicRoutes.map(({ path, priority }) => ({
    url: new URL(path, siteConfig.url).toString(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority,
  }));
}
