import { createPageMetadata } from "@/lib/seo/create-page-metadata";
import { siteConfig } from "@/shared/config/site";

export const metadata = createPageMetadata({
  title: siteConfig.defaultTitle,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <section className="container-site py-16">
        <h1 className="font-display text-[clamp(32px,4vw,52px)] leading-tight font-extrabold">
          Trung Tâm Giáo Dục Nghề Nghiệp Ô Tô Hiệp Phát
        </h1>
        <p className="text-body mt-4">
          Trang chủ đang được chuyển sang phiên bản mới.
        </p>
      </section>
      <div aria-hidden className="h-[250vh]" />
    </>
  );
}
