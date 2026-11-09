import { cn } from "@/lib/utils";
import {
  describeMockExamOutcome,
  type MockExamConfig,
  type MockExamOutcome,
} from "../data/mock-exam-paper-generator";

const mockButtonClassName =
  "inline-flex min-h-11 min-w-[190px] cursor-pointer items-center justify-center gap-[10px] rounded-[9px] px-4 py-[11px] text-[16px] leading-[1.2] font-bold transition-colors max-[521px]:w-full";

const factToneClassName = {
  neutral: "bg-[#f0f3f8] text-[#334155]",
  fail: "bg-[#fff0ed] text-[#b91c1c]",
  unanswered: "bg-[#fff7e6] text-[#78350f]",
  success: "bg-[#e8f5ee] text-[#117346]",
} as const;

/** Thẻ "Kết quả thi thử" (V2 `.mock-result-summary`): ĐẠT/KHÔNG ĐẠT · điểm · 3 nhãn · 2 nút. */
export function MockExamResultSummaryCard({
  outcome,
  config,
  total,
  timeExpired,
  onPractice,
  onNewExam,
}: {
  outcome: MockExamOutcome;
  config: MockExamConfig;
  total: number;
  timeExpired: boolean;
  onPractice: () => void;
  onNewExam: () => void;
}) {
  const facts: { text: string; tone: keyof typeof factToneClassName }[] = [
    { text: `${outcome.answered}/${total} câu đã trả lời`, tone: "neutral" },
    {
      text: `${outcome.unanswered} câu chưa làm`,
      tone: outcome.unanswered > 0 ? "unanswered" : "neutral",
    },
    {
      text: `Câu điểm liệt: ${outcome.criticalStatus}`,
      tone: outcome.criticalStatus === "đúng" ? "success" : "fail",
    },
  ];

  return (
    <div className="rounded-lg border border-[#e0e6ef] bg-white p-[22px] text-center">
      <span
        aria-hidden="true"
        className={cn(
          "font-display mx-auto mb-3 grid size-[50px] place-items-center rounded-full text-[22px] font-extrabold",
          outcome.passed
            ? "bg-[#e7f6ed] text-[#15803d]"
            : "bg-[#fff0ed] text-[#dc2626]",
        )}
      >
        {outcome.passed ? "✓" : "×"}
      </span>
      <p className="font-display text-[14px] leading-[1.4] font-bold tracking-[0.1em] text-[#1e3a8a] uppercase">
        Kết quả thi thử
      </p>
      <h2
        className={cn(
          "font-display my-2 text-[26px] leading-[1.25] font-extrabold",
          outcome.passed ? "text-[#15803d]" : "text-[#b91c1c]",
        )}
      >
        {outcome.passed ? "ĐẠT" : "KHÔNG ĐẠT"}
      </h2>
      <p className="mx-auto mb-4 text-[16px] leading-[1.5] text-[#475569]">
        {describeMockExamOutcome(outcome, config, timeExpired)}
      </p>
      <p className="mb-[17px] flex items-baseline justify-center gap-2">
        <strong className="font-display text-[29px] leading-[1.2] font-extrabold text-[#0a1330]">
          {outcome.correct} / {total}
        </strong>
        <span className="text-[15px] text-[#475569]">Điểm số</span>
      </p>
      <ul className="mb-5 flex flex-wrap justify-center gap-2">
        {facts.map((fact) => (
          <li
            key={fact.text}
            className={cn(
              "rounded-full px-[10px] py-[7px] text-[14px] font-bold",
              factToneClassName[fact.tone],
            )}
          >
            {fact.text}
          </li>
        ))}
      </ul>
      <div className="flex flex-col justify-center gap-[10px] min-[521px]:flex-row">
        <button
          type="button"
          onClick={onPractice}
          className={cn(
            mockButtonClassName,
            "border border-[#d7dfeb] bg-white text-[#34445e] hover:bg-[#f0f4fa]",
          )}
        >
          Ôn tập 600 câu
        </button>
        <button
          type="button"
          onClick={onNewExam}
          className={cn(mockButtonClassName, "bg-[#1e3a8a] text-white")}
        >
          Làm đề mới
        </button>
      </div>
    </div>
  );
}
