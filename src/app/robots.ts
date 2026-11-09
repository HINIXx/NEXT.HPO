import type { MetadataRoute } from "next";
import { siteConfig } from "@/shared/config/site";

// Static export: sinh sẵn robots.txt lúc build.
export const dynamic = "force-static";

/** Mặc định chặn toàn bộ; chỉ mở khi build với SITE_INDEXABLE=true + SITE_URL thật. */
export default function robots(): MetadataRoute.Robots {
  if (!siteConfig.indexingEnabled) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
  };
}
