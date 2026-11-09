import { DrivingTheoryQuizInteractiveWorkspace } from "@/features/driving-theory-quiz/components/driving-theory-quiz-interactive-workspace";
import { DrivingTheoryQuizPageHero } from "@/features/driving-theory-quiz/components/driving-theory-quiz-page-hero";
import { createPageMetadata } from "@/lib/seo/create-page-metadata";

export const metadata = createPageMetadata({
  title: "Ôn tập 600 câu hỏi lái xe | Hiệp Phát",
  path: "/on-tap/",
  description:
    "Ôn tập 600 câu hỏi lý thuyết lái xe, chấm điểm tự động và luyện câu điểm liệt tại Hiệp Phát.",
});

/** Ôn tập (V2 `on-tap/`): đầu trang navy · chọn hình thức (ôn 600 câu / thi thử B / thi thử C1) · khu làm bài. */
export default function DrivingTheoryQuizPage() {
  return (
    <div className="bg-[#f3f6fb] text-black">
      <DrivingTheoryQuizPageHero />
      <DrivingTheoryQuizInteractiveWorkspace />
    </div>
  );
}
