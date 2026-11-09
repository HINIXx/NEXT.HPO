import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import {
  beVietnamPro,
  svnGilroy,
} from "@/fonts/site-fonts-be-vietnam-pro-and-svn-gilroy";
import {
  createOrganizationJsonLd,
  serializeJsonLd,
} from "@/lib/seo/organization-json-ld";
import { siteConfig } from "@/shared/config/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.defaultTitle,
  description: siteConfig.description,
  // Mặc định noindex; chỉ index khi build với SITE_INDEXABLE=true + SITE_URL thật.
  robots: {
    index: siteConfig.indexingEnabled,
    follow: siteConfig.indexingEnabled,
  },
  icons: {
    icon: "/assets/images/favicon.png",
    shortcut: "/assets/images/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: siteConfig.name,
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    images: [siteConfig.defaultOgImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="vi"
      data-scroll-behavior="smooth"
      className={`${beVietnamPro.variable} ${svnGilroy.variable}`}
    >
      <GoogleTagManager gtmId={siteConfig.gtmId} />
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(createOrganizationJsonLd()),
          }}
        />
        {children}
      </body>
    </html>
  );
}
