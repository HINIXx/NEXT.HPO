import type { SVGProps } from "react";
import type { SocialNetwork } from "@/shared/config/contact";

/**
 * Biểu tượng SVG của header/footer/cụm nút nổi — giữ đúng path của V2 (site-header.js, site-footer.js)
 * để giống mắt thường. Mặc định aria-hidden: chữ/aria-label nằm ở thẻ bao ngoài.
 */
type IconProps = SVGProps<SVGSVGElement>;

const strokeIcon = (props: IconProps, strokeWidth = 2): IconProps => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth,
  "aria-hidden": true,
  focusable: false,
  ...props,
});

const fillIcon = (props: IconProps): IconProps => ({
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": true,
  focusable: false,
  ...props,
});

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...strokeIcon(props)}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...strokeIcon(props)}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

/** Ống nghe (đặc) — tổng đài header, nút gọi. */
export function PhoneSolidIcon(props: IconProps) {
  return (
    <svg {...fillIcon(props)}>
      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
    </svg>
  );
}

/** Ống nghe (nét) — mục liên hệ footer. */
export function PhoneOutlineIcon(props: IconProps) {
  return (
    <svg {...strokeIcon(props)}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...strokeIcon(props)}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <svg
      {...strokeIcon(props, 1.8)}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 10 9-7 9 7" />
      <path d="M5.5 9v11h13V9M9.5 20v-6h5v6" />
    </svg>
  );
}

/** "Vào cửa" — nút Đăng nhập. */
export function LoginIcon(props: IconProps) {
  return (
    <svg {...strokeIcon(props)} strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <path d="m10 17 5-5-5-5" />
      <path d="M15 12H3" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg
      {...strokeIcon(props, 2.4)}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

export function ChevronUpIcon(props: IconProps) {
  return (
    <svg
      {...strokeIcon(props, 2.4)}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}

export function UserPlusIcon(props: IconProps) {
  return (
    <svg
      {...strokeIcon(props, 2.2)}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="20" y1="8" x2="20" y2="14" />
      <line x1="23" y1="11" x2="17" y2="11" />
    </svg>
  );
}

const socialPaths: Record<SocialNetwork, string> = {
  facebook: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  youtube:
    "M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z",
  tiktok:
    "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.29 8.29 0 0 0 4.83 1.54V6.79a4.85 4.85 0 0 1-1.07-.1z",
};

export function SocialIcon({
  network,
  ...props
}: IconProps & { network: SocialNetwork }) {
  return (
    <svg {...fillIcon(props)}>
      <path d={socialPaths[network]} />
    </svg>
  );
}
