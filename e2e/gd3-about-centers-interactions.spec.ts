import { expect, test } from "@playwright/test";

/** GĐ3: 2 trang Giới thiệu — TT Giáo dục nghề nghiệp, TT Sát hạch. */

const vocationalPath = "/gioi-thieu/trung-tam-giao-duc-nghe-nghiep/";
const examPath = "/gioi-thieu/trung-tam-sat-hach/";

test("HTML xuất sẵn có đủ nội dung chữ (không cần JS)", async ({ request }) => {
  const vocational = await (await request.get(vocationalPath)).text();
  for (const text of [
    "Vững hành trình.",
    "Học lái xe hiện đại.",
    "Môi trường học tập",
    "Công nghệ đồng hành",
    "Lữ đoàn Thông tin 23",
    "Diễn đàn Hợp tác Kinh tế Việt Nam – ASEAN",
    "KHÓA HỌC CỦA CHÚNG TÔI",
  ])
    expect(vocational).toContain(text);

  const exam = await (await request.get(examPath)).text();
  for (const text of [
    "Lái xe an toàn.",
    "35.880",
    "Vận hành chuyên nghiệp.",
    "Sân sát hạch 35.000 m²",
    "Tự tin trong ngày thi.",
  ])
    expect(exam).toContain(text);
});

test("Băng chuyền: nút → đổi ảnh, bấm ảnh mở hộp xem lớn, ←/→/Esc", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(examPath);
  const gallery = page.getByRole("region", {
    name: "Hình ảnh sân sát hạch Hiệp Phát",
  });
  await gallery.scrollIntoViewIfNeeded();
  const dots = gallery.getByRole("button", { name: /^Xem ảnh \d+$/ });
  await expect(dots).toHaveCount(6);
  await expect(dots.nth(0)).toHaveAttribute("aria-current", "true");

  await gallery.getByRole("button", { name: "Ảnh tiếp theo" }).click();
  await expect(dots.nth(1)).toHaveAttribute("aria-current", "true");

  await gallery.getByRole("button", { name: /^Phóng to ảnh/ }).click();
  const dialog = page.getByRole("dialog", { name: "Xem hình ảnh" });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator("figcaption")).toHaveText(
    "Sa hình sát hạch số 1",
  );
  await page.keyboard.press("ArrowRight");
  await expect(dialog.locator("figcaption")).toHaveText(
    "Sa hình sát hạch số 2",
  );
  await expect(dialog.locator("img")).toHaveJSProperty("complete", true, {
    timeout: 10_000,
  });
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("Nút neo đầu trang cuộn tới đúng khối, nội dung hiện dần đã hiện", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(examPath);
  await page.getByRole("link", { name: /Xem cơ sở vật chất/ }).click();
  await expect(page).toHaveURL(/#co-so-sat-hach$/);
  await expect(
    page.getByRole("heading", { name: /Sẵn sàng cho một kỳ thi/ }),
  ).toBeInViewport();

  await page.goto(vocationalPath);
  await page.getByRole("link", { name: /Xem khóa học/ }).click();
  await expect(page).toHaveURL(/#khoa-hoc$/);
  const coursesTitle = page.getByRole("heading", {
    name: "KHÓA HỌC CỦA CHÚNG TÔI",
  });
  await expect(coursesTitle).toBeInViewport();
});

test("Thẻ hợp tác: ảnh đầu tải khi cuộn tới, 8 băng chuyền đủ chấm", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(vocationalPath);
  const firstStory = page.getByRole("region", {
    name: "Hình ảnh họp báo chuyển đổi số",
  });
  await firstStory.scrollIntoViewIfNeeded();
  await expect(firstStory.locator("img").first()).toHaveJSProperty(
    "complete",
    true,
    { timeout: 10_000 },
  );
  expect(
    await firstStory
      .locator("img")
      .first()
      .evaluate((img: HTMLImageElement) => img.naturalWidth),
  ).toBeGreaterThan(0);
  await expect(
    firstStory.getByRole("button", { name: /^Xem ảnh \d+$/ }),
  ).toHaveCount(9);
  // ≤600px nút ←/→ luôn hiện, vùng bấm 44px.
  const next = firstStory.getByRole("button", { name: "Ảnh tiếp theo" });
  await expect(next).toBeVisible();
  const box = await next.boundingBox();
  expect(box?.width).toBeGreaterThanOrEqual(44);
  await expect(page.locator("main article")).toHaveCount(3 + 8 + 3);
});
