import type { ReactNode } from "react";

/** 6 thành phần "Hệ thống HPO": toạ độ trên ảnh vòng (viewBox 362, V2 NODES) + chữ + icon danh sách. */
export type HpoSystemNodeName =
  "face" | "cloud" | "dat" | "cabin" | "sim" | "platform";

const iconProps = { viewBox: "0 0 24 24", "aria-hidden": true } as const;
export const hpoSystemNodes: readonly {
  name: HpoSystemNodeName;
  x: number;
  y: number;
  title: string;
  note: string;
  icon: ReactNode;
}[] = [
  {
    name: "face",
    x: 117,
    y: 104,
    title: "Xác thực khuôn mặt",
    note: "Nhận diện học viên khi học",
    icon: (
      <svg {...iconProps}>
        <path d="M4 8V5a1 1 0 0 1 1-1h3m8 0h3a1 1 0 0 1 1 1v3m0 8v3a1 1 0 0 1-1 1h-3m-8 0H5a1 1 0 0 1-1-1v-3M9 10h.01M15 10h.01M9.5 15a3.5 3.5 0 0 0 5 0" />
      </svg>
    ),
  },
  {
    name: "cloud",
    x: 250,
    y: 98,
    title: "Cloud (server)",
    note: "Lưu trữ dữ liệu tập trung",
    icon: (
      <svg {...iconProps}>
        <ellipse cx="9.5" cy="5" rx="6.5" ry="2.6" />
        <path d="M3 5v12.2c0 1.4 2.8 2.6 6.3 2.6M16 5v5.2M3 11.1c0 1.4 2.9 2.6 6.5 2.6.7 0 1.4 0 2-.1M14.6 21h5.1a2.8 2.8 0 0 0 .3-5.6 3.9 3.9 0 0 0-7.5 1.1 2.3 2.3 0 0 0 2.1 4.5Z" />
      </svg>
    ),
  },
  {
    name: "dat",
    x: 309,
    y: 178,
    title: "DAT",
    note: "Giám sát quãng đường thực hành",
    icon: (
      <svg {...iconProps}>
        <path d="M5.2 9.6 7 6.3c.3-.5.8-.8 1.4-.8h6.4c.5 0 1 .3 1.3.7l2.5 3.4M3 15.6v-3.3c0-1 .5-1.9 1.4-2.4l.8-.3h13.4l1.9.7c.9.4 1.5 1.2 1.5 2.2v3.1M3 15.6c0 .6.4 1 1 1h1.2M21 15.6c0 .6-.4 1-1 1h-1.2M8.8 16.6h6.4M6.4 9.6l.9 2.3h9.4l.9-2.3M4.4 12.6h2M17.6 12.6h2" />
        <circle cx="7" cy="16.8" r="1.8" />
        <circle cx="17" cy="16.8" r="1.8" />
      </svg>
    ),
  },
  {
    name: "cabin",
    x: 246,
    y: 268,
    title: "Cabin",
    note: "Cabin học lái mô phỏng",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="2" />
        <path d="M12 14v7M10 12H3M14 12h7" />
      </svg>
    ),
  },
  {
    name: "sim",
    x: 114,
    y: 264,
    title: "Mô phỏng",
    note: "Luyện tình huống giao thông",
    icon: (
      <svg {...iconProps}>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4M10 7.5v5l4-2.5z" />
      </svg>
    ),
  },
  {
    name: "platform",
    x: 58,
    y: 166,
    title: "Đa nền tảng",
    note: "Học trên mọi thiết bị",
    icon: (
      <svg {...iconProps}>
        <rect x="2" y="4" width="14" height="10" rx="1.5" />
        <path d="M6 18h6M9 14v4" />
        <rect x="17" y="8" width="5" height="11" rx="1" />
      </svg>
    ),
  },
];
