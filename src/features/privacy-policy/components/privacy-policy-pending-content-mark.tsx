import type { ReactNode } from "react";

/**
 * Ô vàng "[CẦN BỔ SUNG: …]" — chỗ trung tâm chưa gửi nội dung (V2 `.cbm-todo`).
 * Giữ nguyên chữ V2; khi có nội dung thật thì thay cả ô bằng chữ thường.
 */
export function PrivacyPolicyPendingContentMark({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <mark className="rounded bg-amber-100 px-[5px] py-0.5 leading-[1.6] font-bold text-orange-900">
      [CẦN BỔ SUNG: {children}]
    </mark>
  );
}
