import { expect, test } from "@playwright/test";

/** GĐ7: robot 3D (bundle `public/robot/dist`, nguồn `robot-companion/`) gắn qua island tải trễ. */

test("Trang chủ: robot đứng ở đầu trang, nút đầu robot nằm trong cụm hỗ trợ nhanh", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const robot = page.locator("#hpo-robot");
  await expect(robot).toBeVisible({ timeout: 15_000 });
  await expect(page.locator("body")).toHaveClass(/hpo-home-robot/);
  await expect(page.locator("body")).toHaveClass(/hpo-route-home/);
  await expect(page.locator(".floats > #hpo-robot-restore")).toHaveCount(1);

  // Lướt xuống → robot thu vào nút đầu robot ở góc.
  await page.mouse.wheel(0, 1200);
  await expect(page.locator("#hpo-robot-restore")).toBeVisible();
  await expect(robot).toBeHidden();

  // Bấm nút đầu robot → hộp thoại 3D; Escape đóng.
  await page.locator("#hpo-robot-restore").click();
  await expect(page.locator("#hpo-robot-viewer")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#hpo-robot-viewer")).toBeHidden();
});

test("Chuyển trang (không tải lại): robot gắn lại đúng 1 lần theo bố cục trang con", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator("#hpo-robot")).toBeVisible({ timeout: 15_000 });
  await page.evaluate(() => {
    (window as unknown as { __noReload: boolean }).__noReload = true;
  });
  await page.locator('footer a[href="/chinh-sach-bao-mat/"]').first().click();
  await expect(page).toHaveURL(/\/chinh-sach-bao-mat\/$/);
  await expect(page.locator("body")).toHaveClass(/hpo-page-robot/);
  await expect(page.locator("body")).not.toHaveClass(/hpo-home-robot/);
  await expect(page.locator("body")).not.toHaveClass(/hpo-route-home/);
  expect(
    await page.evaluate(
      () => (window as unknown as { __noReload?: boolean }).__noReload,
    ),
  ).toBe(true);
  await expect(page.locator("#hpo-robot")).toHaveCount(1);
  await expect(page.locator("#hpo-robot-restore")).toHaveCount(1);
  await expect(page.locator("#hpo-robot-viewer")).toHaveCount(1);
  await expect(page.locator("#hpo-robot")).toBeVisible();
});

test("Điện thoại: robot nằm trên thanh nút đáy, không gây tràn ngang", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator(".floats > #hpo-robot-restore")).toBeVisible({
    timeout: 15_000,
  });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test("JSON-LD khóa học đúng học phí từng trang (Ưu đãi 15/15/17, Học phí 16/16/18)", async ({
  request,
}) => {
  const pricesOn = async (path: string) => {
    const html = await (await request.get(path)).text();
    const blocks = [
      ...html.matchAll(
        /<script type="application\/ld\+json">([^<]*)<\/script>/g,
      ),
    ].map((match) => JSON.parse(match[1]));
    const list = blocks.find((block) => block["@type"] === "ItemList");
    return list.itemListElement.map(
      (entry: { item: { offers: { price: string } } }) =>
        entry.item.offers.price,
    );
  };
  expect(await pricesOn("/hoc-phi/")).toEqual([
    "16000000",
    "16000000",
    "18000000",
  ]);
  expect(await pricesOn("/chuong-trinh-uu-dai/")).toEqual([
    "15000000",
    "15000000",
    "17000000",
  ]);
});
