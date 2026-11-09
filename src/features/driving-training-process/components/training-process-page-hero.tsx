import { cn } from "@/lib/utils";
import { trainingProcessSteps } from "../data/driving-training-process-steps";
import {
  ProcessEyebrowLabel,
  processGradientHeadingClassName,
} from "./training-process-shared-typography";

/**
 * Đầu trang Quy trình đào tạo (V2 `.process-hero` + `.process-overview`):
 * trái tiêu đề + mô tả, phải 5 thẻ tóm tắt bấm nhảy tới từng bước. ≤1100px xếp 1 cột.
 * Nền: lưới 28px + quầng xanh logo nhạt (V2 process-readable-redesign.css).
 */
export function TrainingProcessPageHero() {
  return (
    <section
      aria-labelledby="page-title"
      className={cn(
        "relative flex items-center overflow-hidden",
        "bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.88)_44%,rgba(239,246,255,0.72)_100%),radial-gradient(circle_at_82%_28%,rgba(43,38,251,0.10),transparent_30%),linear-gradient(#f5f7fc_1px,transparent_1px),linear-gradient(90deg,#f5f7fc_1px,transparent_1px)]",
        "bg-[size:auto,auto,28px_28px,28px_28px]",
      )}
    >
      <div className="container-site relative z-[2] grid w-full grid-cols-1 items-center gap-6 py-8 max-[640px]:px-4 min-[641px]:gap-[clamp(32px,4vw,64px)] min-[641px]:py-[clamp(40px,4vw,64px)] xl:grid-cols-[minmax(0,1fr)_minmax(440px,0.9fr)]">
        <div>
          <ProcessEyebrowLabel className="mb-3.5">
            Quy trình đào tạo
          </ProcessEyebrowLabel>
          <h1
            id="page-title"
            className={cn(
              processGradientHeadingClassName,
              "text-[34px] leading-[1.2] text-balance min-[641px]:text-[clamp(32px,3.6vw,52px)]",
            )}
          >
            Từ tuyển sinh đến cấp <em>giấy phép lái xe</em>
          </h1>
          <p className="text-ink mt-3.5 max-w-[650px] text-[17px] leading-normal min-[641px]:mt-5 min-[641px]:text-[19px]">
            5 bước, từ lúc nộp hồ sơ đến khi nhận bằng. Bấm vào từng bước để xem
            chi tiết.
          </p>
        </div>

        <ol
          aria-label="Tóm tắt 5 bước"
          className="m-0 grid list-none gap-2.5 p-0"
        >
          {trainingProcessSteps.map((step) => (
            <li key={step.sectionId}>
              <a
                href={`#${step.sectionId}`}
                className={cn(
                  "text-ink grid grid-cols-[38px_minmax(0,1fr)] items-center gap-x-3 gap-y-0.5 rounded-2xl border border-[#dbe3f0] bg-white py-2.5 pr-3.5 pl-3 no-underline",
                  "ease-hp shadow-[0_10px_26px_rgba(10,19,48,0.07)] transition-[border-color,box-shadow] duration-200",
                  "hover:border-primary focus-visible:border-primary hover:shadow-[0_10px_24px_rgba(30,64,175,0.14)]",
                  "min-[641px]:grid-cols-[44px_minmax(0,1fr)] min-[641px]:gap-x-3.5 min-[641px]:py-3 min-[641px]:pr-[18px] min-[641px]:pl-3.5",
                )}
              >
                <span className="font-display bg-primary row-span-2 grid size-[38px] place-items-center rounded-full text-[17px] font-extrabold text-white min-[641px]:size-11 min-[641px]:text-[19px]">
                  {step.number}
                </span>
                <strong className="font-display text-[17.5px] leading-[1.25] font-extrabold min-[641px]:text-[20px]">
                  {step.overviewTitle}
                </strong>
                <span className="text-[15.5px] leading-[1.45] text-[#334155] min-[641px]:text-[16px]">
                  {step.overviewSummary}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
