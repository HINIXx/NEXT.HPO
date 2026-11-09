import { expect, test } from "@playwright/test";

/** GĐ5: trang Chương trình ưu đãi (`/chuong-trinh-uu-dai/`) + form Đăng ký tư vấn dùng chung. */

const path = "/chuong-trinh-uu-dai/";
const sheetEndpoint = /script\.google\.com\/macros/;
test.use({ reducedMotion: "reduce" });

test("HTML xuất sẵn có đủ chữ (không cần JS)", async ({ request }) => {
  const html = await (await request.get(path)).text();
  for (const text of [
    "KỶ NGUYÊN AI",
    "Hướng dẫn những hồ sơ cần nộp",
    "Giấy khám sức khỏe của người lái xe, người điều khiển xe chuyên dụng.",
    "Đăng ký học lái xe tại Hiệp Phát",
    "Nhận tư vấn miễn phí",
    "KHÓA HỌC CỦA CHÚNG TÔI",
    "CHƯƠNG TRÌNH ĐÀO TẠO",
    "825 km · 24 giờ",
  ])
    expect(html).toContain(text);
});

test("Form: báo lỗi từng ô, focus ô lỗi đầu, sửa xong ẩn lỗi", async ({
  page,
}) => {
  let posted = false;
  await page.route(sheetEndpoint, (route) => {
    posted = true;
    return route.abort();
  });
  await page.goto(path);
  const form = page.getByRole("form", { name: "Đăng ký tư vấn" });
  await form.getByRole("button", { name: "Nhận tư vấn miễn phí" }).click();
  await expect(form.getByText("Vui lòng nhập họ và tên.")).toBeVisible();
  await expect(form.getByText("Số điện thoại chưa đúng")).toBeVisible();
  await expect(form.getByText("Vui lòng chọn hạng đào tạo.")).toBeVisible();
  await expect(form.getByLabel("Họ và tên")).toBeFocused();
  await form.getByLabel("Họ và tên").fill("Nguyễn Văn A");
  await expect(form.getByText("Vui lòng nhập họ và tên.")).toBeHidden();
  expect(posted).toBe(false);
});

test("Form + ?location: hiện xã, gửi đúng dữ liệu (chặn mạng, không ghi Sheet thật)", async ({
  page,
}) => {
  let body = "";
  await page.route(sheetEndpoint, async (route) => {
    body = route.request().postData() ?? "";
    await route.fulfill({ status: 200, body: "ok" });
  });
  await page.goto(`${path}?location=TanNhut1793756520`);
  await expect(
    page.getByText("Ưu đãi cho người dân xã Tân Nhựt"),
  ).toBeVisible();
  await expect(page.getByText("31/12/2026")).toBeVisible();
  await expect(page).toHaveTitle(/xã Tân Nhựt/);

  const form = page.getByRole("form", { name: "Đăng ký tư vấn" });
  await form.getByLabel("Họ và tên").fill("TEST Playwright");
  await form.getByLabel("Số điện thoại").fill("+84 911 739 119");
  await form.getByText("Số cơ khí").click();
  await form.getByRole("button", { name: "Nhận tư vấn miễn phí" }).click();
  await expect(form.getByRole("status")).toContainText(
    "Đã nhận đăng ký của TEST Playwright",
  );
  const sent = new URLSearchParams(body);
  expect(sent.get("soDienThoai")).toBe("0911739119");
  expect(sent.get("hangDaoTao")).toBe("Hạng B - Số cơ khí");
  expect(sent.get("xa")).toBe("Tân Nhựt");
  await expect(form.getByLabel("Họ và tên")).toHaveValue("");
});
