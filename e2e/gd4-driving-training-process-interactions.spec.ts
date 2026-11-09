import { expect, test } from "@playwright/test";

/** GĐ4a: trang Quy trình đào tạo (`/quy-dinh-chuong-trinh-hoc-lai-xe/`). */

const path = "/quy-dinh-chuong-trinh-hoc-lai-xe/";
test.use({ reducedMotion: "reduce" });

test("HTML xuất sẵn có đủ chữ 5 bước + bảng (không cần JS)", async ({
  request,
}) => {
  const html = await (await request.get(path)).text();
  for (const text of [
    "Từ tuyển sinh đến cấp",
    "Tuyển sinh và chuẩn bị",
    "Đơn đề nghị học lái xe theo mẫu quy định tại Phụ lục X",
    "Bạn đã chuẩn bị đủ hồ sơ?",
    "Phân bổ thời gian đào tạo xe ô tô",
    "Tổng quãng đường học thực hành của 01 học viên",
    "thời gian tập lái xe trên sân tập lái được tính cho nhóm học viên",
    "a) Cơ sở đào tạo lái xe tổ chức kiểm tra",
    "tối thiểu 70%",
    "Đạt từ 5,0 trở lên.",
    "Chứng minh thư công vụ đối với người nước ngoài",
    "Bài thi thực hành trên đường",
    "trong vòng 02 giờ sau khi kết thúc kỳ sát hạch",
  ])
    expect(html).toContain(text);
});

test("Thanh 5 bước: bấm nhảy tới bước, mục đang xem đổi theo", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(path);
  const stepNav = page.getByRole("navigation", {
    name: "Điều hướng quy trình",
  });
  await expect(
    stepNav.getByRole("link", { name: /Tuyển sinh/ }),
  ).toHaveAttribute("aria-current", "true");

  await stepNav.getByRole("link", { name: /Sát hạch/ }).click();
  await expect(page.locator("#exam-title")).toBeInViewport();
  await expect(stepNav.getByRole("link", { name: /Sát hạch/ })).toHaveAttribute(
    "aria-current",
    "true",
  );
  // Tiêu đề bước không bị thanh dính che (thanh nằm trên tiêu đề).
  const navBox = await stepNav.boundingBox();
  const titleBox = await page.locator("#exam-title").boundingBox();
  expect(titleBox!.y).toBeGreaterThan(navBox!.y + navBox!.height - 2);
});

test("Bảng: bấm môn mở Chương trình khung, Esc đóng và trả focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(path);
  const cell = page.locator("#dao-tao table").getByRole("button", {
    name: "Pháp luật về giao thông đường bộ",
  });
  await cell.click();
  const dialog = page.getByRole("dialog", {
    name: "Môn I — Pháp luật về giao thông đường bộ",
  });
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByText("Nhận thức về phòng ngừa tai nạn giao thông"),
  ).toBeVisible();
  await expect(dialog.getByText("Biển báo cấm")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(cell).toBeFocused();
});

test("Dòng con thực hành chỉ hiện đúng mục (V2 data-mon-sections)", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(path);
  await page
    .getByRole("row", {
      name: /Thời gian học thực hành lái xe trên đường giao thông/,
    })
    .getByRole("button")
    .click();
  const dialog = page.getByRole("dialog", {
    name: "Môn VI — Thực hành lái xe",
  });
  await expect(
    dialog.getByText("Nội dung Tập lái xe trên đường giao thông"),
  ).toBeVisible();
  await expect(
    dialog.getByText("Nội dung Ôn luyện theo các nội dung sát hạch lái xe"),
  ).toBeVisible();
  await expect(
    dialog.getByText("Nội dung Tập lái xe trên sân tập lái"),
  ).toHaveCount(0);
});

test("Điện thoại: 3 nút chọn hạng đổi cột số liệu", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(path);
  const tabs = page.getByRole("tablist", {
    name: "Chọn hạng giấy phép lái xe",
  });
  await tabs.scrollIntoViewIfNeeded();
  const totalRow = page.getByRole("row", {
    name: /III. Tổng thời gian đào tạo/,
  });
  await expect(totalRow).toContainText("196");
  await expect(totalRow.getByText("237")).toBeHidden();

  await tabs.getByRole("tab", { name: "Hạng C1" }).click();
  await expect(tabs.getByRole("tab", { name: "Hạng C1" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(totalRow.getByText("237")).toBeVisible();
  await expect(totalRow.getByText("196")).toBeHidden();
});

/* ---------- GĐ4b: danh mục môn học + học liệu ---------- */

test("HTML xuất sẵn có danh mục môn học (đóng vẫn có chữ cho SEO)", async ({
  request,
}) => {
  const html = await (await request.get(path)).text();
  for (const text of [
    "Chương trình đào tạo lái xe ô tô",
    "Hệ thống báo hiệu đường bộ",
    "Xe có quyền ưu tiên bên phải",
    "Hư hỏng thường gặp ở hệ thống lái và treo",
    "Bài giảng 360° tham quan các bộ phận của xe ô tô",
  ])
    expect(html).toContain(text);
});

test("Danh mục: mở môn + phần, bấm nhóm biển báo mở trang xem đúng mục", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(path);
  const curriculum = page.locator("#chuong-trinh-mon-hoc");
  const subject = curriculum.getByRole("button", {
    name: /Pháp luật về giao thông đường bộ/,
  });
  await subject.click();
  await expect(subject).toHaveAttribute("aria-expanded", "true");
  await curriculum
    .getByRole("button", { name: /Hệ thống báo hiệu đường bộ/ })
    .click();
  await curriculum.getByRole("button", { name: /Biển nguy hiểm/ }).click();
  const dialog = page.getByRole("dialog", { name: "Biển nguy hiểm" });
  await expect(dialog).toBeVisible();
  await expect(
    dialog
      .frameLocator("iframe")
      .getByText("Nhóm biển báo nguy hiểm gồm có", { exact: false }),
  ).toBeVisible({ timeout: 10_000 });
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("Modal Chương trình khung → bài giảng: tóm tắt + câu hỏi chấm đúng/sai", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(path);
  await page
    .getByRole("button", { name: "Cấu tạo và sửa chữa thông thường" })
    .first()
    .click();
  const syllabus = page.getByRole("dialog", { name: /Môn II/ });
  await syllabus
    .getByRole("button", { name: /Hư hỏng thường gặp ở hộp số/ })
    .click();
  const lesson = page.getByRole("dialog", {
    name: "Hư hỏng thường gặp ở hộp số",
  });
  await expect(
    lesson.getByRole("heading", { name: "Tóm tắt bài học" }),
  ).toBeVisible();
  const firstQuestion = lesson.getByRole("group", { name: "Đáp án câu 1" });
  await firstQuestion.getByRole("button").first().click();
  await expect(lesson.getByRole("status").first()).toBeVisible();
  await expect(firstQuestion.getByRole("button").first()).toBeDisabled();
  // Esc đóng lớp trên cùng, modal Chương trình khung vẫn mở.
  await page.keyboard.press("Escape");
  await expect(lesson).toBeHidden();
  await expect(syllabus).toBeVisible();
});
