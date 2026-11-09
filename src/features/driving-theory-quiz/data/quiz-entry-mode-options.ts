import type { MockExamMode } from "./mock-exam-paper-generator";

export type QuizMode = "practice" | MockExamMode;

export type QuizEntryModeOption = {
  mode: QuizMode;
  icon: string;
  label: string;
  title: string;
  description: string;
  details: readonly string[];
  cta: string;
  /** Tên trên tab chuyển chế độ (khi đã vào làm bài). */
  tabLabel: string;
};

/** 3 thẻ "Chọn hình thức luyện thi" (câu chữ giữ nguyên V2, kể cả "Ôn thi hạng B" / "Thi thử hạng C1"). */
export const quizEntryModeOptions: readonly QuizEntryModeOption[] = [
  {
    mode: "practice",
    icon: "600",
    label: "ÔN LUYỆN THEO TỪNG CHƯƠNG",
    title: "Ôn tập 600 câu",
    description:
      "Chọn chương hoặc câu điểm liệt, xem đáp án và giải thích ngay sau mỗi câu.",
    details: ["600 câu hỏi", "6 chương"],
    cta: "Bắt đầu ôn tập",
    tabLabel: "Ôn tập 600 câu",
  },
  {
    mode: "B",
    icon: "B",
    label: "ÔN LUYỆN THEO HẠNG",
    title: "Ôn thi hạng B",
    description:
      "Làm đề ngẫu nhiên theo cấu trúc hạng B, có tính giờ và chấm đậu/rớt.",
    details: ["30 câu", "20 phút", "Đạt từ 27"],
    cta: "Vào thi thử",
    tabLabel: "Ôn tập hạng B",
  },
  {
    mode: "C1",
    icon: "C1",
    label: "ÔN LUYỆN THEO HẠNG",
    title: "Thi thử hạng C1",
    description:
      "Làm đề ngẫu nhiên theo cấu trúc hạng C1, có tính giờ và chấm đậu/rớt.",
    details: ["35 câu", "22 phút", "Đạt từ 32"],
    cta: "Vào thi thử",
    tabLabel: "Ôn tập hạng C1",
  },
];
