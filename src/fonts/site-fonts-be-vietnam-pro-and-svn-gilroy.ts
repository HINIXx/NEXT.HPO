import localFont from "next/font/local";

/**
 * Hệ chữ Hiệp Phát (theo Design System, giống V2 `site-typography-be-vietnam-gilroy.css`):
 * - Tiêu đề, số liệu: Be Vietnam Pro → biến CSS `--font-be-vietnam-pro` (Tailwind `font-display`).
 * - Nội dung: SVN-Gilroy → biến CSS `--font-svn-gilroy` (Tailwind `font-sans`, mặc định của body).
 *
 * Be Vietnam Pro: V2 tách mỗi độ đậm thành 2 file subset (latin + vietnamese, dùng unicode-range).
 * next/font/local không hỗ trợ unicode-range theo từng file, nên 2 subset đã được gộp thành 1 file
 * cho mỗi độ đậm bằng `scripts/merge-be-vietnam-pro-latin-vietnamese-font-subsets.py` (cùng glyph với V2).
 *
 * preload: false — tổng 16 file (~460 KB); preload hết sẽ tranh băng thông với ảnh LCP. Trình duyệt chỉ tải
 * độ đậm thật sự dùng; `adjustFontFallback` (mặc định Arial) tạo font dự phòng cùng kích thước → ít nhảy chữ.
 */
export const beVietnamPro = localFont({
  variable: "--font-be-vietnam-pro",
  display: "swap",
  preload: false,
  src: [
    {
      path: "./be-vietnam-pro/be-vietnam-pro-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./be-vietnam-pro/be-vietnam-pro-400-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./be-vietnam-pro/be-vietnam-pro-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./be-vietnam-pro/be-vietnam-pro-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./be-vietnam-pro/be-vietnam-pro-600-italic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "./be-vietnam-pro/be-vietnam-pro-700.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./be-vietnam-pro/be-vietnam-pro-700-italic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "./be-vietnam-pro/be-vietnam-pro-800.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./be-vietnam-pro/be-vietnam-pro-900.woff2",
      weight: "900",
      style: "normal",
    },
  ],
});

/** SVN-Gilroy 300 → 900, không có bản nghiêng (giống V2). */
export const svnGilroy = localFont({
  variable: "--font-svn-gilroy",
  display: "swap",
  preload: false,
  src: [
    {
      path: "./svn-gilroy/svn-gilroy-light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./svn-gilroy/svn-gilroy-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./svn-gilroy/svn-gilroy-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./svn-gilroy/svn-gilroy-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./svn-gilroy/svn-gilroy-bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./svn-gilroy/svn-gilroy-xbold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./svn-gilroy/svn-gilroy-black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
});
