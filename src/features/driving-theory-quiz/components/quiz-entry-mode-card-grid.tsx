import { cn } from "@/lib/utils";
import {
  quizEntryModeOptions,
  type QuizMode,
} from "../data/quiz-entry-mode-options";

/** Màu riêng từng thẻ: viền trên (trang trí), ô biểu tượng, chữ nút. Cam DS đậm #c2410c cho chữ (cam #ff6b35 chỉ viền). */
const cardTone: Record<
  QuizMode,
  { card: string; icon: string; cta: string; delay: string }
> = {
  practice: {
    card: "border-t-[#1e3a8a]",
    icon: "bg-[#eaf0fc] text-[#1e3a8a] text-[19px]",
    cta: "text-[#1e3a8a]",
    delay: "",
  },
  B: {
    card: "border-t-decor-orange",
    icon: "bg-[#fff0e9] text-[#c2410c] text-[25px]",
    cta: "text-[#c2410c]",
    delay: "[animation-delay:-1.65s]",
  },
  C1: {
    card: "border-t-[#138a55]",
    icon: "bg-[#e8f5ee] text-[#117346] text-[21px]",
    cta: "text-[#117346]",
    delay: "[animation-delay:-3.3s]",
  },
};

/**
 * Khối "Chọn hình thức luyện thi" (V2 `#quizEntry`): 3 thẻ-nút lớn, ≤900px xếp 1 cột rộng tối đa 620px.
 * Chữ trong thẻ có sẵn trong HTML lúc export (SEO); bấm thẻ → vào chế độ tương ứng.
 */
export function QuizEntryModeCardGrid({
  onSelectMode,
}: {
  onSelectMode: (mode: QuizMode) => void;
}) {
  return (
    <section
      aria-labelledby="quiz-entry-title"
      className="container-site pt-[clamp(30px,5vw,58px)] pb-[clamp(42px,6vw,72px)]"
    >
      <div className="mx-auto mb-[30px] max-w-[680px] text-center">
        <p className="font-display text-primary text-[15px] leading-[1.4] font-extrabold tracking-[0.06em]">
          BẮT ĐẦU LUYỆN TẬP
        </p>
        <h2
          id="quiz-entry-title"
          className="font-display mt-[9px] mb-2 text-[clamp(25px,3vw,34px)] leading-[1.2] font-extrabold tracking-[-0.035em] text-[#0a1330]"
        >
          Chọn hình thức luyện thi
        </h2>
        <p className="text-[17px] leading-[1.6] text-[#334155]">
          Ôn theo từng chương hoặc làm đề thi thử hạng B, C1.
        </p>
      </div>
      <div
        role="group"
        aria-label="Ba chức năng luyện thi"
        className="mx-auto grid max-w-[620px] grid-cols-1 items-stretch gap-[18px] lg:max-w-none lg:grid-cols-3"
      >
        {quizEntryModeOptions.map((option) => {
          const tone = cardTone[option.mode];
          return (
            <button
              key={option.mode}
              type="button"
              onClick={() => onSelectMode(option.mode)}
              className={cn(
                "group animate-quiz-card-float relative flex min-w-0 cursor-pointer flex-col items-start overflow-hidden rounded-[14px] border border-t-4 border-[#d8e1ef] bg-white p-[22px] text-left text-[#24324a] shadow-[0_14px_36px_rgba(7,26,58,0.07)] transition-[transform,box-shadow,border-color] duration-200 hover:[transform:translateY(-4px)] hover:border-[#9db4e3] hover:shadow-[0_22px_44px_rgba(7,26,58,0.13)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[rgba(255,107,53,0.55)] lg:min-h-[330px] lg:p-[26px]",
                "after:pointer-events-none after:absolute after:right-[-28px] after:bottom-[-52px] after:size-[140px] after:rounded-full after:bg-[rgba(18,63,150,0.045)] after:content-['']",
                tone.card,
                tone.delay,
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "font-display mb-[14px] grid size-14 place-items-center rounded-2xl leading-none font-extrabold lg:mb-[19px] lg:size-[62px]",
                  tone.icon,
                )}
              >
                {option.icon}
              </span>
              <span className="mb-[7px] text-[14px] font-bold text-[#475569]">
                {option.label}
              </span>
              <strong className="text-[clamp(19px,2vw,23px)] leading-[1.25] font-extrabold text-[#0a1330]">
                {option.title}
              </strong>
              <span className="mt-[10px] text-[16px] leading-[1.55] text-[#334155]">
                {option.description}
              </span>
              <span className="mt-[17px] flex flex-wrap gap-[7px]">
                {option.details.map((detail) => (
                  <span
                    key={detail}
                    className="rounded-full border border-[#e0e6ef] bg-[#f6f8fb] px-[9px] py-1.5 text-[14px] font-bold text-[#334155]"
                  >
                    {detail}
                  </span>
                ))}
              </span>
              <span
                className={cn(
                  "mt-auto flex w-full items-center justify-between pt-[18px] text-[16px] font-extrabold lg:pt-6",
                  tone.cta,
                )}
              >
                {option.cta}
                <span
                  aria-hidden="true"
                  className="text-[21px] leading-none transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
