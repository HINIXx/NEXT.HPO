import { StructuredDataJsonLdScript } from "@/components/seo/structured-data-json-ld-script";
import { createBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";
import { PrivacyPolicyDocument } from "@/features/privacy-policy/components/privacy-policy-document";
import { createPageMetadata } from "@/lib/seo/create-page-metadata";

export const metadata = createPageMetadata({
  title: "Chính sách bảo mật | Hiệp Phát",
  path: "/chinh-sach-bao-mat/",
  description:
    "Chính sách bảo mật dữ liệu cá nhân của Công ty TNHH Ô Tô Hiệp Phát, áp dụng cho website và hoạt động đăng ký học.",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <StructuredDataJsonLdScript
        data={createBreadcrumbJsonLd("/chinh-sach-bao-mat/")}
      />
      <PrivacyPolicyDocument />
    </>
  );
}
