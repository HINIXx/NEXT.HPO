import { expect, test } from "@playwright/test";

/** GĐ6: trang chủ (`/`). */

test.use({ reducedMotion: "reduce" });

test("HTML xuất sẵn có đủ chữ các khối (không cần JS)", async ({ request }) => {
  const html = await (await request.get("/")).text();
  for (const text of [
    "KỶ NGUYÊN AI",
    "Hệ thống HPO",
    "GIỚI THIỆU CÔNG TY",
    "QCVN 15:2026/BCA",
    "Dấu ấn hành trình phát triển thành tựu",
    "Học lái xe ô tô mọi lúc, mọi nơi nhờ nền tảng số tích hợp AI",
    "Giấy chứng nhận đăng ký nhãn hiệu",
    "Hệ thống hạ tầng kỹ thuật",
    "KHÓA HỌC CỦA CHÚNG TÔI",
    "16.000.000đ",
    "Đăng ký học lái xe tại Hiệp Phát",
    "Đào tạo lái xe trên nền tảng số",
    "Pháp luật về giao thông đường bộ",
  ])
    expect(html).toContain(text);
});

test("Slider đầu trang: nút → chuyển slide, slide ẩn được inert", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const dots = page.getByRole("button", { name: /^Slide \d:/ });
  await expect(dots.nth(0)).toHaveAttribute("aria-current", "true");
  await page.getByRole("button", { name: "Slide tiếp theo" }).click();
  await expect(dots.nth(1)).toHaveAttribute("aria-current", "true");
  await expect(page.getByRole("group", { name: /1 \/ 2/ })).toHaveAttribute(
    "inert",
    "",
  );
});

test("Báo chí: hộp Xem tất cả lọc theo kênh + tìm không dấu", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.getByRole("button", { name: /Xem tất cả \d+ bài/ }).click();
  const dialog = page.getByRole("dialog", {
    name: /Báo chí đưa tin về Hiệp Phát/,
  });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: /^Truyền hình/ }).click();
  const items = dialog.getByRole("listitem");
  const count = await items.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++)
    await expect(items.nth(i)).toContainText("Truyền hình");
  await dialog.getByRole("button", { name: /^Tất cả/ }).click();
  await dialog.getByLabel("Tìm bài").fill("tuoi tre");
  await expect(items.first()).toContainText("Tuổi Trẻ");
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("Thương hiệu: bấm ảnh văn bằng mở hộp xem ảnh lớn", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page
    .getByRole("button", {
      name: "Xem Giấy chứng nhận đăng ký nhãn hiệu số 537625",
    })
    .click();
  const dialog = page.getByRole("dialog", { name: "Xem hình ảnh" });
  await expect(dialog.locator("figcaption")).toHaveText(
    "Giấy chứng nhận đăng ký nhãn hiệu số 537625",
  );
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("Danh mục môn học trang chủ mở được học liệu", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const curriculum = page.locator("#chuong-trinh-mon-hoc");
  await curriculum
    .getByRole("button", {
      name: /Phần mềm mô phỏng|Pháp luật về giao thông đường bộ/,
    })
    .first()
    .click();
  await curriculum
    .getByRole("button", { name: /Xử lý các tình huống giao thông/ })
    .click();
  await curriculum
    .getByRole("button", { name: /Xe có quyền ưu tiên bên phải/ })
    .click();
  await expect(
    page.getByRole("dialog", { name: "Xe có quyền ưu tiên bên phải" }),
  ).toBeVisible();
});
