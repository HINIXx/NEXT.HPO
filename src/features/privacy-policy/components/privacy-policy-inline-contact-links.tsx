import type { ComponentProps } from "react";
import { contact } from "@/shared/config/contact";

/** Link trong nội dung: vùng bấm cao 44px như V2 (`.cbm-policy__content a`). */
export function PolicyLink({
  external,
  ...props
}: ComponentProps<"a"> & { external?: boolean }) {
  return (
    <a
      {...props}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
      className="text-primary inline-flex min-h-11 items-center"
    />
  );
}

export const HotlineLink = () => (
  <PolicyLink href={contact.hotlineHref}>{contact.hotline}</PolicyLink>
);
export const EmailLink = () => (
  <PolicyLink href={contact.emailHref}>{contact.email}</PolicyLink>
);
