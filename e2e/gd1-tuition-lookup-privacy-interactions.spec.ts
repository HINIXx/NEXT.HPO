import { expect, test } from "@playwright/test";

/** GĐ1: tương tác các trang Học phí, Danh sách bệnh viện, Tra cứu QR, Chính sách bảo mật. */

test("Học phí: rê chuột mở rộng thẻ (máy tính), chạm bật/tắt thẻ (điện thoại)", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/hoc-phi/");
  const cards = page.locator("article[data-course]");
  await expect(cards).toHaveCount(3);
  await expect(page.getByText("18.000.000đ")).toBeVisible();
  await cards.nth(1).hover();
  await expect(cards.nth(1)).toHaveAttribute("data-active", "true");
  await page.mouse.move(5, 5);
  await expect(cards.nth(1)).toHaveAttribute("data-active", "false");

  await page.setViewportSize({ width: 390, height: 844 });
  const toggle = cards.nth(2).getByRole("button");
  await toggle.click();
  const state = await cards.nth(2).getAttribute("data-active");
  await toggle.click();
  await expect(cards.nth(2)).not.toHaveAttribute("data-active", state!);
  // Không giấu nội dung: giá + thời gian học luôn hiện kể cả khi thẻ thu gọn.
  await expect(cards.nth(2).getByText("3 tháng")).toBeVisible();
});

test("Danh sách bệnh viện: lọc, tìm không dấu, phân trang", async ({
  page,
}) => {
  await page.goto("/danh-sach-benh-vien/");
  await expect(page.getByText("126 cơ sở phù hợp")).toBeVisible();
  await expect(page.locator("main article")).toHaveCount(12);

  await page.getByLabel("Nhu cầu khám").selectOption("all");
  await expect(page.getByText("291 cơ sở phù hợp")).toBeVisible();

  await page.getByRole("button", { name: "Trang 2", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Trang 2", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await expect(page.locator("main article").first()).toContainText("13");

  await page.getByLabel("Tìm theo tên hoặc địa chỉ").fill("an binh");
  await expect(page.locator("main article").first()).toContainText("An Bình");

  await page
    .getByLabel("Tìm theo tên hoặc địa chỉ")
    .fill("khong co co so nao ten nay");
  await expect(page.getByText("Chưa tìm thấy cơ sở phù hợp")).toBeVisible();
  await page
    .getByRole("button", { name: "Xem tất cả cơ sở khám lái xe" })
    .click();
  await expect(page.getByText("126 cơ sở phù hợp")).toBeVisible();
});

test("Tra cứu QR: báo lỗi CCCD sai, số demo hiện kết quả + mã QR (không gọi API)", async ({
  page,
}) => {
  const apiCalls: string[] = [];
  await page.route("https://lms.hpo.edu.vn/**", (route) => {
    apiCalls.push(route.request().url());
    return route.abort();
  });
  await page.goto("/tra-cuu-qr/");
  const input = page.getByLabel("Số căn cước công dân");
  await input.fill("12ab34");
  await expect(input).toHaveValue("1234");
  await page.getByRole("button", { name: "Tra cứu mã QR" }).click();
  await expect(page.locator("form").getByRole("alert")).toHaveText(
    "Vui lòng nhập đúng 12 chữ số căn cước công dân.",
  );

  await page.getByRole("button", { name: "052098015899" }).click();
  await expect(page.getByText("12/12")).toBeVisible();
  await page.getByRole("button", { name: "Tra cứu mã QR" }).click();
  await expect(
    page.getByRole("heading", { name: "Nguyễn Minh Anh" }),
  ).toBeVisible();
  await expect(page.getByText("DỮ LIỆU MINH HỌA")).toBeVisible();
  await expect(page.getByText("765.000 đ")).toBeVisible();
  await expect(page.locator('img[alt^="Mã QR thanh toán"]')).toBeVisible();
  expect(apiCalls).toEqual([]);

  await page.getByRole("button", { name: "Đóng kết quả" }).click();
  await expect(
    page.getByRole("heading", { name: "Nguyễn Minh Anh" }),
  ).toHaveCount(0);
});

test("Chính sách bảo mật: mục lục 14 mục trỏ đúng neo", async ({ page }) => {
  await page.goto("/chinh-sach-bao-mat/");
  const tocLinks = page
    .getByRole("navigation", { name: "Mục lục chính sách bảo mật" })
    .getByRole("link");
  await expect(tocLinks).toHaveCount(14);
  for (const href of await tocLinks.evaluateAll((links) =>
    links.map((link) => link.getAttribute("href")),
  )) {
    await expect(page.locator(href!)).toHaveCount(1);
  }
});
