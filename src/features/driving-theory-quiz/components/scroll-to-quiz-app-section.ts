/** Id khối làm bài (tab chế độ + thẻ câu hỏi) — đích cuộn khi sang câu / bắt đầu đề / nộp bài. */
export const QUIZ_APP_SECTION_ID = "khu-lam-bai";

/** V2: cuộn mượt về đầu khối làm bài, chừa 10px. */
export function scrollToQuizAppSection() {
  const section = document.getElementById(QUIZ_APP_SECTION_ID);
  if (!section) return;
  window.scrollTo({
    top: section.getBoundingClientRect().top + window.scrollY - 10,
    behavior: "smooth",
  });
}
