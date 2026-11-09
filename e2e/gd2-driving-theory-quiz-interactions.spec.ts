import { expect, test, type Page } from "@playwright/test";

/** GĐ2: trang Ôn tập — ôn 600 câu (chọn chương, trả lời, làm lại, kết quả) + thi thử B/C1 (đồng hồ, nộp bài, đối chiếu). */

// Thẻ chọn hình thức nhấp nhô liên tục → tắt chuyển động để Playwright bấm được.
test.use({ reducedMotion: "reduce" });

const answerOptions = (page: Page) => page.locator("[data-answer-option]");
const expectNoHorizontalOverflow = async (page: Page, width: number) => {
  const scrollWidth = await page.evaluate(
    () => document.documentElement.scrollWidth,
  );
  expect(scrollWidth, `tràn ngang ở ${width}px`).toBeLessThanOrEqual(width);
};

test("HTML tĩnh có sẵn đầu trang + 3 thẻ chọn hình thức (SEO)", async ({
  request,
}) => {
  const html = await (await request.get("/on-tap/")).text();
  expect(html).toContain("Ôn luyện lý thuyết");
  expect(html).toContain("Chọn hình thức luyện thi");
  expect(html).toContain("Thi thử hạng C1");
  expect(html).toContain("Ôn tập 600 câu hỏi lái xe | Hiệp Phát");
});

for (const width of [390, 1440])
  test(`Ôn tập 600 câu ở ${width}px: trả lời, phản hồi, chọn chương, làm lại`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/on-tap/");
    await page
      .getByRole("button", { name: /Ôn tập 600 câu.*Bắt đầu ôn tập/ })
      .click();

    await expect(page.getByText("Câu 1 / 600")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Ôn tập 600 câu", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    const next = page.getByRole("button", { name: /Câu tiếp theo/ });
    await expect(next).toBeDisabled();

    // Câu 1: đáp án đúng là B (index 1) — chọn A → sai, hiện đáp án đúng, khóa đáp án.
    await answerOptions(page).first().click();
    await expect(
      page.getByText(/Chưa chính xác. Đáp án đúng là: B/),
    ).toBeVisible();
    await expect(answerOptions(page).first()).toBeDisabled();
    await expect(next).toBeEnabled();
    await expect(page.getByText("1 / 600 đã trả lời")).toBeVisible();

    await next.click();
    await expect(page.getByText("Câu 2 / 600")).toBeVisible();
    await page.keyboard.press("ArrowLeft");
    await expect(page.getByText("Câu 1 / 600")).toBeVisible();

    // Chọn "Câu điểm liệt" → 60 câu, có nhãn điểm liệt, tiến độ xóa.
    await page.getByRole("button", { name: /^Câu điểm liệt 60 câu/ }).click();
    await expect(page.getByText("Câu 1 / 60")).toBeVisible();
    await expect(
      page.locator("article").getByText("Câu điểm liệt", { exact: true }),
    ).toBeVisible();
    await expect(page.getByText("0 / 60 đã trả lời")).toBeVisible();

    // Phím 2 → trả lời; "Làm lại" hỏi xác nhận → Đồng ý → xóa tiến độ.
    await page.keyboard.press("2");
    await expect(page.getByText("1 / 60 đã trả lời")).toBeVisible();
    await page.getByRole("button", { name: "↻ Làm lại" }).click();
    const confirm = page.getByRole("dialog");
    await expect(confirm).toContainText("Bạn có chắc chắn");
    await confirm.getByRole("button", { name: "Đồng ý" }).click();
    await expect(confirm).toHaveCount(0);
    await expect(page.getByText("0 / 60 đã trả lời")).toBeVisible();

    await expectNoHorizontalOverflow(page, width);
  });

test("Ôn tập: câu cuối → hộp kết quả", async ({ page }) => {
  await page.goto("/on-tap/");
  await page
    .getByRole("button", { name: /Ôn tập 600 câu.*Bắt đầu ôn tập/ })
    .click();
  // Chương 4 (Cấu tạo và sửa chữa, 37 câu): nhảy tới câu cuối bằng bảng chọn câu.
  await page.getByRole("button", { name: /Cấu tạo và sửa chữa/ }).click();
  await page.getByRole("button", { name: "Câu 37, chưa trả lời" }).click();
  await answerOptions(page).first().click();
  await page.getByRole("button", { name: /Xem kết quả/ }).click();
  const result = page.getByRole("dialog");
  await expect(result).toContainText("Hoàn thành nội dung ôn tập");
  await expect(result).toContainText("(1 câu đã làm)");
  await result.getByRole("button", { name: "Làm lại nội dung này" }).click();
  await expect(result).toHaveCount(0);
  await expect(page.getByText("Câu 1 / 37")).toBeVisible();
});

for (const [mode, total, clock] of [
  ["B", 30, "20:00"],
  ["C1", 35, "22:00"],
] as const)
  test(`Thi thử hạng ${mode}: ${total} câu, 1 câu điểm liệt, đồng hồ, nộp bài, đối chiếu`, async ({
    page,
  }) => {
    await page.clock.install();
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto("/on-tap/");
    await page
      .getByRole("button", { name: new RegExp(`hạng ${mode}.*Vào thi thử`) })
      .click();

    await expect(
      page.getByText(`Câu 1 / ${total}`, { exact: true }),
    ).toBeVisible();
    await expect(page.getByText(clock)).toBeVisible();
    await expect(
      page.getByRole("button", { name: /, câu điểm liệt$/ }),
    ).toHaveCount(1);

    await answerOptions(page).nth(1).click();
    await expect(answerOptions(page).nth(1)).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(page.getByText(`Đã trả lời 1 / ${total}`)).toBeVisible();
    await page.clock.runFor(5_000);
    await expect(page.getByText(clock)).toHaveCount(0);

    await page
      .getByRole("button", { name: "Nộp bài thi", exact: true })
      .click();
    await expect(
      page.getByRole("heading", { name: "KHÔNG ĐẠT" }),
    ).toBeVisible();
    await expect(page.getByText(`${total - 1} câu chưa làm`)).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Đáp án chi tiết" }),
    ).toBeVisible();
    await page.getByRole("button", { name: /^Câu 2, chưa làm/ }).click();
    await expect(page.getByText("Chưa trả lời", { exact: true })).toBeVisible();
    await expectNoHorizontalOverflow(page, 390);

    // "Làm đề mới" → đề mới, đồng hồ đặt lại.
    await page.getByRole("button", { name: "Làm đề mới" }).click();
    await expect(
      page.getByText(`Câu 1 / ${total}`, { exact: true }),
    ).toBeVisible();
    await expect(page.getByText(clock)).toBeVisible();
  });

test("Thi thử: hết giờ tự nộp bài", async ({ page }) => {
  await page.clock.install();
  await page.goto("/on-tap/");
  await page.getByRole("button", { name: /hạng B.*Vào thi thử/ }).click();
  await expect(page.getByText("20:00")).toBeVisible();
  await page.clock.runFor(20 * 60 * 1000 + 1000);
  await expect(page.getByText(/^Đã hết thời gian\./)).toBeVisible();
  await expect(page.getByRole("heading", { name: "KHÔNG ĐẠT" })).toBeVisible();
});
