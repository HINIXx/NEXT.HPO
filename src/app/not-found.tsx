import type { Metadata } from "next";
import Link from "next/link";
import { SiteShellHeaderMainFooter } from "@/components/layout/site-shell-header-main-footer";

export const metadata: Metadata = {
  title: "Không tìm thấy trang | HPO",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <SiteShellHeaderMainFooter>
      <section className="container-site py-16">
        <h1 className="font-display text-[clamp(32px,4vw,52px)] leading-tight font-extrabold">
          Không tìm thấy trang
        </h1>
        <p className="text-body mt-4">
          Trang bạn tìm không tồn tại hoặc đã được chuyển.
        </p>
        <Link
          href="/"
          className="bg-primary font-display mt-8 inline-flex min-h-11 items-center rounded-full px-6 font-semibold text-white"
        >
          Về trang chủ
        </Link>
      </section>
    </SiteShellHeaderMainFooter>
  );
}
