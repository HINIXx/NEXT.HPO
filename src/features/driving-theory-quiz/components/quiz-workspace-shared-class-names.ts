/**
 * Lớp Tailwind dùng chung cho phần làm bài (V2 `on-tap/style.css` + `quiz-app-design-system.css`).
 * Màu trang (V2 token sau khi đè DS): navy #0a1330, xanh #1e3a8a, xanh lá #15803d, đỏ #dc2626 (chữ đỏ #b91c1c),
 * viền #dce4f0, nền #f3f6fb. Cam #ff6b35 chỉ ở viền/vòng chọn.
 */

/** Khung trắng của danh sách chương, thanh tiến độ, thẻ câu hỏi, bảng chọn câu. */
export const quizPanelSurfaceClassName =
  "rounded-lg border border-[#dce4f0] bg-white shadow-[0_18px_50px_-42px_rgba(7,26,58,0.55)]";

const quizActionButtonBaseClassName =
  "font-display inline-flex min-h-11 cursor-pointer items-center gap-[10px] rounded-[9px] px-5 py-[15px] text-[16px] leading-[normal] font-bold max-[521px]:w-full max-[521px]:justify-center";

/** V2 `.btn-restart`: Làm lại · Đề mới · Câu trước. */
export const quizSecondaryActionButtonClassName = `${quizActionButtonBaseClassName} bg-[#edf2f8] text-[#0a1330] transition-colors hover:bg-[#e2e9f3] disabled:cursor-not-allowed disabled:opacity-45`;

/** V2 `.btn-next`: Câu tiếp theo · Xem kết quả · Nộp bài thi. */
export const quizPrimaryActionButtonClassName = `${quizActionButtonBaseClassName} bg-[#1e3a8a] text-white shadow-[0_12px_26px_-13px_rgba(18,63,150,0.7)] disabled:cursor-not-allowed disabled:opacity-45`;

/** Vòng chọn bằng bàn phím (V2: cam nhạt, trang trí). */
export const quizFocusRingClassName =
  "focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[rgba(255,107,53,0.55)]";
