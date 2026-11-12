import { serializeJsonLd } from "@/lib/seo/organization-json-ld";

/**
 * Thẻ `<script type="application/ld+json">` dùng chung (ngoại lệ duy nhất được dùng dangerouslySetInnerHTML).
 * Server Component: dữ liệu có sẵn trong HTML xuất tĩnh.
 */
export function StructuredDataJsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
