/**
 * Menu header (V2 `assets/js/site-header.js`, thứ tự "menu cũ" duyệt 02/11/2026):
 * ⌂ Cổng thông tin điện tử · Giới thiệu ▾ · Học phí · Quy trình đào tạo · Tra cứu ▾ · Ôn tập.
 * URL giữ nguyên V2, luôn có dấu `/` cuối (trailingSlash). Không có `/tien-do-thi-sat-hach/` (đã bỏ).
 */
export type NavLink = {
  label: string;
  href: string;
  /** Nhãn trong menu ☰ nếu khác menu ngang. */
  mobileLabel?: string;
};

export type NavGroup = {
  label: string;
  /** Mục cha bấm được → trang đầu tiên của nhóm. */
  href: string;
  items: readonly NavLink[];
};

export type NavEntry = NavLink | NavGroup;

export const isNavGroup = (entry: NavEntry): entry is NavGroup =>
  "items" in entry;

export const homeLink = {
  href: "/",
  label: "Cổng thông tin điện tử",
  mobileLabel: "Trang chủ",
} as const;

export const primaryNavigation: readonly NavEntry[] = [
  {
    label: "Giới thiệu",
    href: "/gioi-thieu/trung-tam-giao-duc-nghe-nghiep/",
    items: [
      {
        label: "Trung tâm giáo dục nghề nghiệp",
        href: "/gioi-thieu/trung-tam-giao-duc-nghe-nghiep/",
      },
      {
        label: "Trung tâm sát hạch lái xe ô tô",
        mobileLabel: "Trung tâm sát hạch lái xe",
        href: "/gioi-thieu/trung-tam-sat-hach/",
      },
    ],
  },
  { label: "Học phí", href: "/hoc-phi/" },
  { label: "Quy trình đào tạo", href: "/quy-dinh-chuong-trinh-hoc-lai-xe/" },
  {
    label: "Tra cứu",
    href: "/danh-sach-benh-vien/",
    items: [
      { label: "Danh sách bệnh viện", href: "/danh-sach-benh-vien/" },
      { label: "Mã QR thanh toán sát hạch", href: "/tra-cuu-qr/" },
    ],
  },
  { label: "Ôn tập", href: "/on-tap/" },
];

/** Menu ☰ có thêm "Thông tin" (link WordPress cũ) giữa "Tra cứu" và "Ôn tập", như V2. */
export const mobileExtraLink: NavLink & { insertBefore: string } = {
  label: "Thông tin",
  href: "https://hpo.edu.vn/thong-tin/",
  insertBefore: "/on-tap/",
};

export const privacyPolicyLink: NavLink = {
  label: "Chính sách bảo mật",
  href: "/chinh-sach-bao-mat/",
};

/**
 * Route công khai đã chuyển xong (đưa vào sitemap). Mỗi GĐ1–6 chuyển xong trang nào thì thêm dòng đó.
 * Danh sách đích (V2): /gioi-thieu/trung-tam-giao-duc-nghe-nghiep/ 0.8, /gioi-thieu/trung-tam-sat-hach/ 0.8,
 * /hoc-phi/ 0.8, /chuong-trinh-uu-dai/ 0.8, /quy-dinh-chuong-trinh-hoc-lai-xe/ 0.8, /on-tap/ 0.7,
 * /danh-sach-benh-vien/ 0.6, /tra-cuu-qr/ 0.6, /chinh-sach-bao-mat/ 0.3.
 */
export const publicRoutes: readonly { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/hoc-phi/", priority: 0.8 },
  { path: "/on-tap/", priority: 0.7 },
  { path: "/danh-sach-benh-vien/", priority: 0.6 },
  { path: "/tra-cuu-qr/", priority: 0.6 },
  { path: "/chinh-sach-bao-mat/", priority: 0.3 },
];
