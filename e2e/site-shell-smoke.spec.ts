import { expect, test } from "@playwright/test";
import {
  isNavGroup,
  primaryNavigation,
  publicRoutes,
} from "../src/shared/config/navigation";

const externalError = (message: string) =>
  /googletagmanager\.com|google\.com\/maps/i.test(message);

/**
 * Route có trên menu nhưng chưa chuyển (GĐ1–6): `next/link` tự prefetch → 404 là dự kiến.
 * Chuyển xong trang nào thì thêm vào `publicRoutes` → tự rời danh sách này và lại bị kiểm 404.
 */
const builtPaths = new Set(publicRoutes.map((route) => route.path));
const pendingPaths = primaryNavigation
  .flatMap((entry) => (isNavGroup(entry) ? entry.items : [entry]))
  .map((link) => link.href)
  .filter((href) => href.startsWith("/") && !builtPaths.has(href));
const isPendingRoute = (url: string) => {
  const { pathname } = new URL(url);
  return pendingPaths.some((path) => pathname.startsWith(path));
};

for (const { path } of publicRoutes)
  for (const width of [390, 1024, 1440, 1920]) {
    test(`${path} at ${width}px`, async ({ page, baseURL }) => {
      const errors: string[] = [];
      const failedResponses: string[] = [];
      const origin = new URL(baseURL!).origin;

      page.on("console", (message) => {
        if (
          message.type() === "error" &&
          !externalError(message.text()) &&
          !isPendingRoute(message.location().url || "http://x/")
        )
          errors.push(message.text());
      });
      page.on("pageerror", (error) => {
        if (!externalError(error.message)) errors.push(error.message);
      });
      page.on("response", (response) => {
        if (
          new URL(response.url()).origin === origin &&
          response.status() >= 400 &&
          !isPendingRoute(response.url())
        ) {
          failedResponses.push(`${response.status()} ${response.url()}`);
        }
      });

      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      await expect(page.locator("nav#navbar")).toBeVisible();
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("footer#lien-he")).toBeAttached();
      await expect(page.locator('html[lang="vi"]')).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
      // JSON-LD: đúng 1 khối tổ chức (layout) + Breadcrumb ở trang con; khối nào cũng là JSON hợp lệ.
      const jsonLdTypes = await page
        .locator('script[type="application/ld+json"]')
        .evaluateAll((scripts) =>
          scripts.map(
            (script) =>
              (JSON.parse(script.textContent || "{}") as { "@type"?: string })[
                "@type"
              ],
          ),
        );
      expect(
        jsonLdTypes.filter((type) => type === "EducationalOrganization"),
      ).toHaveLength(1);
      expect(jsonLdTypes.includes("BreadcrumbList")).toBe(path !== "/");

      if (width === 390 && path === "/") {
        await page.getByRole("button", { name: "Mở menu" }).click();
        await expect(
          page.getByRole("dialog").getByRole("link", { name: "Học phí" }),
        ).toBeVisible();
        await page.keyboard.press("Escape");
        await expect(page.getByRole("dialog")).toHaveCount(0);
      }

      const scrollWidth = await page.evaluate(
        () => document.documentElement.scrollWidth,
      );
      expect(
        scrollWidth,
        `horizontal overflow at ${width}px`,
      ).toBeLessThanOrEqual(width);
      expect(failedResponses).toEqual([]);
      expect(errors).toEqual([]);
    });
  }
