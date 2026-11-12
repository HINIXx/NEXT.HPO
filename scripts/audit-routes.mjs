/**
 * Quét lỗi toàn trang trên bản build tĩnh (chạy `pnpm run build` rồi `pnpm run preview:out` trước).
 * Kiểm tra: tràn ngang, h1/meta/canonical/JSON-LD, ảnh hỏng & thiếu alt, lỗi console,
 * HTTP lỗi, CLS. Dùng để kiểm tra trước khi đẩy lên production.
 */
import { chromium } from "@playwright/test";

const ROUTES = [
  "/",
  "/gioi-thieu/trung-tam-giao-duc-nghe-nghiep/",
  "/gioi-thieu/trung-tam-sat-hach/",
  "/hoc-phi/",
  "/chuong-trinh-uu-dai/",
  "/quy-dinh-chuong-trinh-hoc-lai-xe/",
  "/on-tap/",
  "/danh-sach-benh-vien/",
  "/tra-cuu-qr/",
  "/chinh-sach-bao-mat/",
];

const BASE = "http://127.0.0.1:3100";
const VIEWPORTS = [
  { name: "390", width: 390, height: 844 },
  { name: "1024", width: 1024, height: 768 },
  { name: "1440", width: 1440, height: 900 },
  { name: "1920", width: 1920, height: 1080 },
];

const browser = await chromium.launch();
const problems = [];

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  for (const route of ROUTES) {
    const page = await ctx.newPage();
    const consoleErrors = [];
    const pageErrors = [];
    const failedReq = [];
    page.on("console", (m) => {
      if (m.type() === "error") consoleErrors.push(m.text().replace(/\s+/g, " ").slice(0, 220));
    });
    page.on("pageerror", (e) => pageErrors.push(e.message));
    page.on("response", (r) => {
      if (r.status() >= 400) failedReq.push(`${r.status()} ${r.url()}`);
    });
    try {
      await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 30000 });
      await page.waitForTimeout(700);
      const info = await page.evaluate(() => {
        const de = document.documentElement;
        const over = [];
        for (const el of document.querySelectorAll("body *")) {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && r.height > 0 && r.right > window.innerWidth + 2) {
            let p = el.parentElement, hidden = false;
            while (p) {
              const ps = getComputedStyle(p);
              if (["hidden", "clip", "auto", "scroll"].includes(ps.overflowX)) { hidden = true; break; }
              p = p.parentElement;
            }
            if (!hidden) over.push(`${el.tagName}.${(el.className || "").toString().slice(0, 60)} right=${Math.round(r.right)}`);
          }
        }
        const imgs = [...document.querySelectorAll("img")];
        return {
          overflowX: de.scrollWidth > window.innerWidth,
          scrollW: de.scrollWidth,
          innerW: window.innerWidth,
          h1: document.querySelectorAll("h1").length,
          desc: document.querySelector('meta[name="description"]')?.content ?? null,
          canonical: document.querySelector('link[rel="canonical"]')?.href ?? null,
          jsonLd: document.querySelectorAll('script[type="application/ld+json"]').length,
          brokenImgs: imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src),
          noAlt: imgs.filter((i) => !i.hasAttribute("alt")).length,
          lang: document.documentElement.lang,
          overflowers: over.slice(0, 5),
        };
      });
      // CLS: cuộn hết trang để kích hoạt lazy load rồi đo tổng layout shift.
      const cls = await page.evaluate(
        () =>
          new Promise((resolve) => {
            let total = 0;
            new PerformanceObserver((list) => {
              for (const e of list.getEntries()) if (!e.hadRecentInput) total += e.value;
            }).observe({ type: "layout-shift", buffered: true });
            const h = document.body.scrollHeight;
            for (let y = 0; y < h; y += 600) window.scrollTo(0, y);
            setTimeout(() => resolve(Number(total.toFixed(4))), 1500);
          }),
      );
      const issues = [];
      if (info.overflowX) issues.push(`TRÀN NGANG scrollW=${info.scrollW} > ${info.innerW}`);
      if (info.overflowers.length) issues.push(`vượt viewport: ${info.overflowers.join(" | ")}`);
      if (info.h1 !== 1) issues.push(`h1 count = ${info.h1}`);
      if (!info.desc) issues.push("thiếu meta description");
      if (!info.canonical) issues.push("thiếu canonical");
      if (info.jsonLd === 0) issues.push("thiếu JSON-LD");
      if (info.brokenImgs.length) issues.push(`ảnh hỏng: ${info.brokenImgs.join(", ")}`);
      if (info.noAlt) issues.push(`${info.noAlt} ảnh thiếu alt`);
      if (info.lang !== "vi") issues.push(`lang = ${info.lang}`);
      if (cls > 0.1) issues.push(`CLS cao = ${cls} (ngưỡng tốt < 0.1)`);
      if (pageErrors.length) issues.push(`pageerror: ${pageErrors.join(" | ")}`);
      if (consoleErrors.length) issues.push(`console.error: ${[...new Set(consoleErrors)].join(" | ")}`);
      if (failedReq.length) issues.push(`HTTP lỗi: ${[...new Set(failedReq)].join(" | ")}`);
      if (issues.length) problems.push(`[${vp.name}] ${route}\n    - ${issues.join("\n    - ")}`);
      else console.log(`OK  [${vp.name}] ${route}`);
    } catch (e) {
      problems.push(`[${vp.name}] ${route} → LỖI: ${e.message}`);
    }
    await page.close();
  }
  await ctx.close();
}
await browser.close();

console.log("\n================ VẤN ĐỀ (PRODUCTION BUILD) ================");
if (!problems.length) console.log("Không phát hiện vấn đề nào.");
else problems.forEach((p) => console.log(p + "\n"));
