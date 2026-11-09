# AGENTS.md — Website Hiệp Phát (NEXT.HPO)

Chuyển site tĩnh `../WEB-HPO-V2` (nguồn chốt: commit `0709939`) sang Next.js để tối ưu component + SEO.
Kế hoạch 8 giai đoạn: `plans/00-ke-hoach-chuyen-nextjs.md` (plans/ không lên git). Trạng thái chung: `../00_BAN_GIAO.md`.
Giao tiếp với user bằng tiếng Việt.

## Lệnh

- `pnpm dev` — chạy thử (http://localhost:3000).
- `pnpm run lint` · `pnpm run typecheck` · `pnpm run format`
- `pnpm run build` → xuất site tĩnh vào `out/` (Turbopack; nếu môi trường cấm mở cổng: `pnpm exec next build --webpack`).
- `pnpm run test:e2e` — Playwright chạy trên `out/` qua `pnpm run preview:out` (cổng 3100). Build trước rồi mới test.
- So với V2: trong `../WEB-HPO-V2` chạy `python3 -m http.server 5180 --bind 127.0.0.1`.
- Biến môi trường lúc build: `SITE_URL` (tên miền thật), `SITE_INDEXABLE=true` chỉ khi đã duyệt SEO production. Mặc định noindex.

## Kiến trúc

- Next 16.3 App Router, React 19, TypeScript, Tailwind v4, Radix (`radix-ui`), pnpm. **Đây không phải Next bạn quen**: đọc `node_modules/next/dist/docs/` trước khi dùng API lạ (middleware → proxy, `next lint` đã bỏ, Turbopack mặc định…).
- `next.config.ts`: `output: "export"`, `trailingSlash: true`, `images.unoptimized: true`. Không dùng tính năng cần server (Server Actions, proxy, rewrites/redirects, ISR, cookies, route handler đọc Request). `robots.ts`/`sitemap.ts` có `export const dynamic = "force-static"`.
- Cấu trúc:
  ```
  src/app/layout.tsx               # html lang="vi", font, GTM, JSON-LD tổ chức, metadata mặc định
  src/app/(site)/layout.tsx        # khung chung: header + main#main-content + footer + nút nổi
  src/app/(site)/<route>/page.tsx  # mỏng: metadata + ghép section
  src/features/<khu>/{components,data}
  src/components/layout/*          # header/footer/nút nổi (đã xong GĐ0)
  src/components/ui/*              # primitive shadcn (lấy lại từ repo cũ)
  src/shared/config/*              # contact.ts, navigation.ts, site.ts — nguồn duy nhất cho SĐT, link, menu
  src/lib/seo/*                    # createPageMetadata, JSON-LD
  public/assets/...                # tài sản giữ nguyên URL như V2
  ```
- **Server Component mặc định.** Chỉ tách island `"use client"` nhỏ cho phần cần trạng thái (ví dụ `site-header-sticky-nav-shell.tsx`, `site-header-mobile-menu-drawer.tsx`, `site-floating-quick-actions.tsx`). Nội dung chữ phải có sẵn trong HTML.
- **Không** chép CSS V2, **không** nhét HTML chuỗi qua `dangerouslySetInnerHTML` (ngoại lệ duy nhất: JSON-LD). Viết lại thành component Tailwind, dữ liệu lặp → mảng có kiểu trong `data/` hoặc `src/content/`.
  Ngoại lệ đã dùng: đồ họa động không phải bố cục (mặt đường 3D, mâm xe quay, hộp quà…) → CSS module cạnh component, ví dụ `src/features/courses/components/courses-animated-scene.module.css`.
- Khối dùng chung đã có: Khóa học học phí `src/features/courses/` (trang chủ/TT GDNN/Ưu đãi dùng lại), đầu trang tra cứu `src/components/sections/dark-navy-lookup-tool-page-hero.tsx`, tiêu đề section gradient `section-title-hp` (globals.css).
- Mỗi trang: `export const metadata = createPageMetadata({ title, path, description })` — giữ đúng title/description của V2. Chuyển xong trang nào → thêm vào `publicRoutes` (`src/shared/config/navigation.ts`) để vào sitemap và để smoke test bắt 404 của route đó.
- File `.tsx` tối đa 300 dòng (ESLint). Tên file kebab-case, dài, tự mô tả.
- Ảnh: `next/image` có `width`/`height`; ảnh dưới màn đầu `loading="lazy"`. Giữ URL `/assets/...` như V2.
- Route `/tien-do-thi-sat-hach/` đã bỏ — không tạo lại.

## Token thiết kế (`src/app/globals.css`)

- Breakpoint min-width bằng px: `sm`=601 `md`=721 `lg`=901 `xl`=1101 `2xl`=1281 (V2 viết max-width 600/720/900/1100/1280). Ngưỡng lẻ dùng `min-[1351px]:` / `max-[1660px]:`.
- Màu: `ink`, `line`, `line-strong`, `surface`, `primary` (#1e40af), `primary-hover`, `brand-blue` #2b26fb, `brand-red` #ea1e24, `brand-navy` #2d3489, `brand-yellow` #faec1a, `emphasis-yellow` #facc15, `emphasis-red`, `decor-orange` #ff6b35, `header-*`.
- Font: `font-display` = Be Vietnam Pro (tiêu đề, số), `font-sans` = SVN-Gilroy (nội dung, mặc định). Font nằm ở `src/fonts/`; Be Vietnam Pro đã gộp subset latin+vietnamese (`scripts/merge-be-vietnam-pro-latin-vietnamese-font-subsets.py`).
- Khung nội dung: utility `container-site` (max clamp(1240px, 88vw, 1680px), lề 20/22/28px) hoặc `<Container>`.
- Cỡ chữ: `text-body` 17px, `text-meta` 14px, `text-lead`. Bóng `shadow-hp-{sm,md,lg,blue}`, bo `rounded-control` 10px / `rounded-card` 18px, chuyển động `ease-hp`.

## Thiết kế (Giám đốc ~71 tuổi duyệt: "to, rõ, không phải bấm")

- Giống V2 bằng mắt thường; lệch vài px chấp nhận được.
- Vàng #faec1a chỉ trên nền tối. Cam #ff6b35 chỉ trang trí, **không làm màu chữ**.
- Chữ nhấn chỉ đổi màu, chữ đứng: nền sáng đỏ, nền tối vàng #facc15.
- Chữ nội dung ≥17px, chữ phụ ≥14px, vùng bấm ≥44px. Không giấu nội dung sau click.
- Giữ nguyên câu chữ đã duyệt; không bịa giá, ngày, thông tin công ty — thiếu thì hỏi.

## Quy tắc làm việc

- KHÔNG commit/push khi chưa được yêu cầu. Không `--force`.
- Chỉ sửa file thuộc phạm vi việc được giao.
- Giao việc cho Codex: viết `plans/handoff-<việc>/HANDOFF.md` (spec + lệnh kiểm + mẫu báo cáo `REPORT.md`); Claude duyệt diff + chụp ảnh so V2.

## Kiểm tra trước khi báo xong

1. `pnpm run lint && pnpm run typecheck && pnpm run build && pnpm run test:e2e`.
2. Smoke test 390/1024/1440/1920: không tràn ngang, console sạch, không 404 cùng origin (trừ route chưa chuyển). Đổi header → test quét 1101–2000px phải đạt.
3. Chụp ảnh trang đã chuyển cạnh V2 ở 4 khổ (mẫu: `plans/reports/screenshots-gd0/`).
4. Báo lại: file chính, lệnh + kết quả, ảnh so sánh, việc chưa làm + lý do, câu hỏi còn mở.
