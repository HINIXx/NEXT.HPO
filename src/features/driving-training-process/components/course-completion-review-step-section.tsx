import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  completionCheckItems,
  completionEligibilityConditions,
  completionEvaluationProcedures,
  completionReviewRules,
} from "../data/course-completion-and-exam-requirements";
import {
  TrainingProcessSectionHead,
  trainingProcessSectionClassName,
} from "./training-process-shared-typography";

const cardBorder = "rounded-[20px] border border-[#dbe3f0]";
const softFigureBackground = "bg-[linear-gradient(180deg,#eff6ff,#fff)]";

/** Chữ có đoạn `**nhấn**` → chữ đỏ đậm (V2 `.condition-emphasis`). */
function EmphasizedText({ text }: { text: string }) {
  return text.split(/(\*\*[^*]+\*\*)/).map((piece, index) =>
    piece.startsWith("**") ? (
      <span key={index} className="text-[#dc2626]">
        {piece.slice(2, -2)}
      </span>
    ) : (
      piece
    ),
  );
}

/** Khung trắng a)–d) (V2 `.completion-panel`): đầu khung có vạch dưới + lưới thẻ. */
function CompletionPanel({
  titleId,
  title,
  tone = "plain",
  children,
}: {
  titleId: string;
  title: string;
  tone?: "plain" | "accent" | "review";
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={titleId}
      data-reveal
      className={cn(
        "overflow-hidden rounded-[18px] border border-[#dbe3f0] shadow-[0_10px_26px_rgba(10,19,48,0.07)] min-[641px]:rounded-3xl",
        tone === "plain" && "bg-white",
        tone === "accent" && "bg-[linear-gradient(180deg,#fef2f2,#fff_36%)]",
        tone === "review" && "bg-[linear-gradient(180deg,#fbfcff,#fff_42%)]",
      )}
    >
      <div className="border-b border-[#dbe3f0] px-[18px] pt-7 pb-[22px] min-[641px]:px-7">
        <h3
          id={titleId}
          className="font-display text-ink text-[23px] leading-[1.18] font-bold min-[641px]:text-[24px]"
        >
          {title}
        </h3>
      </div>
      {children}
    </section>
  );
}

/** Bước 3 (V2 `#hoan-thanh`): 4 khung a) nội dung kiểm tra · b) điều kiện · c) quy trình đánh giá · d) xét hoàn thành. */
export function CourseCompletionReviewStepSection() {
  return (
    <section
      id="hoan-thanh"
      aria-labelledby="completion-title"
      className={trainingProcessSectionClassName}
    >
      <div className="container-site">
        <TrainingProcessSectionHead
          eyebrow="Bước 03"
          titleId="completion-title"
          title={
            <>
              Xét, kiểm tra hoàn thành <em>khóa đào tạo</em>
            </>
          }
          description="Quy định tại khoản 2, điều 2 TT17/2026/TT-BXD sửa đổi bổ sung khoản 4, điều 6 TT14/2025/TT-BXD."
        />
        <div
          aria-label="Thông tin kiểm tra và xét hoàn thành khóa đào tạo"
          className="grid gap-[22px] min-[641px]:gap-[30px]"
        >
          <CompletionPanel
            titleId="completion-guide-title"
            title="a) Cơ sở đào tạo lái xe tổ chức kiểm tra để xét hoàn thành khóa đào tạo, gồm:"
          >
            <div className="grid grid-cols-1 gap-3 px-[18px] pt-6 pb-7 min-[641px]:grid-cols-2 min-[1201px]:px-7 lg:grid-cols-5">
              {completionCheckItems.map((item) => (
                <article
                  key={item.index}
                  className={cn(cardBorder, "relative bg-white pb-[18px]")}
                >
                  <span className="font-display bg-ink absolute top-[13px] left-[13px] z-[1] flex size-[34px] items-center justify-center rounded-xl text-[15px] font-extrabold text-white">
                    {item.index}
                  </span>
                  <figure
                    aria-hidden="true"
                    className={cn(
                      "aspect-[219/173] overflow-hidden rounded-t-[19px]",
                      softFigureBackground,
                    )}
                  >
                    <Image
                      src={item.image.src}
                      alt=""
                      width={item.image.width}
                      height={item.image.height}
                      loading="lazy"
                      className="size-full object-cover"
                    />
                  </figure>
                  <h4 className="font-display text-ink mx-[18px] mt-2.5 mb-2 text-[18px] leading-[1.3] font-bold">
                    {item.title}
                  </h4>
                  {item.description ? (
                    <p className="px-[18px] text-[16px] leading-[1.5] text-[#334155]">
                      {item.description}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </CompletionPanel>

          <CompletionPanel
            titleId="completion-condition-title"
            tone="accent"
            title="b) Người học lái xe được kiểm tra để xét hoàn thành khóa đào tạo khi"
          >
            <div className="grid grid-cols-1 gap-[18px] px-[18px] pt-6 pb-7 min-[641px]:px-7 lg:grid-cols-3">
              {completionEligibilityConditions.map((condition) => (
                <article
                  key={condition.number}
                  className={cn(
                    cardBorder,
                    "grid grid-cols-[minmax(118px,0.56fr)_minmax(0,1fr)] overflow-hidden bg-white",
                  )}
                >
                  <figure
                    aria-hidden="true"
                    className={cn(
                      "relative row-span-2 border-r border-[#dbe3f0]",
                      softFigureBackground,
                    )}
                  >
                    <Image
                      src={condition.image.src}
                      alt=""
                      width={condition.image.width}
                      height={condition.image.height}
                      loading="lazy"
                      className="absolute inset-0 size-full object-contain p-3"
                    />
                  </figure>
                  <span className="font-display bg-primary mx-[18px] mt-[18px] flex size-[34px] items-center justify-center rounded-full text-[16px] font-extrabold text-white">
                    {condition.number}
                  </span>
                  <h4 className="font-display text-ink mx-[18px] mt-3 mb-[18px] text-[18px] leading-[1.5] font-bold">
                    <EmphasizedText text={condition.text} />
                  </h4>
                </article>
              ))}
            </div>
          </CompletionPanel>

          <CompletionPanel
            titleId="completion-process-title"
            title="c) Quy trình kiểm tra và đánh giá kết quả hoàn thành khóa đào tạo:"
          >
            <div className="grid grid-cols-1 gap-5 px-[18px] pt-6 pb-7 min-[641px]:px-7 lg:grid-cols-3">
              {completionEvaluationProcedures.map((procedure) => (
                <article
                  key={procedure.step}
                  className="border-t-primary relative flex flex-col items-start rounded-[20px] border border-t-4 border-[#dbe3f0] bg-[linear-gradient(180deg,#fff,#f8faff)] p-[22px]"
                >
                  <span className="font-display bg-primary absolute top-5 left-[17px] z-[1] flex size-[42px] items-center justify-center rounded-full text-[16px] font-extrabold text-white shadow-[0_8px_18px_rgba(31,66,177,0.2)]">
                    {procedure.step}
                  </span>
                  <figure
                    aria-hidden="true"
                    className="bg-primary-50 mb-[18px] aspect-[325/150] w-full overflow-hidden rounded-[14px]"
                  >
                    <Image
                      src={procedure.image.src}
                      alt=""
                      width={procedure.image.width}
                      height={procedure.image.height}
                      loading="lazy"
                      className="size-full object-cover"
                    />
                  </figure>
                  <h4 className="font-display text-ink mb-4 text-[18px] leading-[1.4] font-bold">
                    {procedure.title}
                  </h4>
                  <p className="bg-primary-50 mt-auto rounded-[14px] px-4 py-[15px] text-[16px] leading-[1.5] text-[#334155]">
                    {procedure.description}
                  </p>
                </article>
              ))}
            </div>
          </CompletionPanel>

          <CompletionPanel
            titleId="completion-review-title"
            tone="review"
            title="d) Xét hoàn thành khóa đào tạo:"
          >
            <div className="grid grid-cols-1 gap-3.5 px-[18px] pt-5 pb-[22px] min-[641px]:px-7 lg:grid-cols-2">
              {completionReviewRules.map((rule, index) => (
                <article
                  key={rule.index}
                  className={cn(
                    cardBorder,
                    "relative grid grid-cols-1 overflow-hidden bg-white min-[641px]:grid-cols-[minmax(132px,0.45fr)_minmax(0,1fr)] lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)]",
                    index === 0 && "lg:col-span-2",
                  )}
                >
                  <span className="font-display bg-primary absolute top-4 left-[18px] z-[1] flex size-9 items-center justify-center rounded-full text-[16px] font-extrabold text-white">
                    {rule.index}
                  </span>
                  <figure
                    aria-hidden="true"
                    className={cn(
                      // Ảnh đặt tuyệt đối: cột ảnh cao theo nội dung chữ, không theo tỉ lệ ảnh gốc.
                      "relative aspect-video border-b border-[#dbe3f0] min-[641px]:aspect-auto min-[641px]:min-h-[160px] min-[641px]:border-r min-[641px]:border-b-0",
                      softFigureBackground,
                    )}
                  >
                    <Image
                      src={rule.image.src}
                      alt=""
                      width={rule.image.width}
                      height={rule.image.height}
                      loading="lazy"
                      className="absolute inset-0 size-full object-contain p-3"
                    />
                  </figure>
                  <div className="flex flex-col justify-center gap-2.5 px-5 py-[18px]">
                    {rule.lead ? (
                      <p className="text-ink text-[17px] leading-[1.58] font-bold">
                        {rule.lead}
                      </p>
                    ) : null}
                    <ul className="grid gap-[7px]">
                      {rule.items.map((item) => (
                        <li
                          key={item}
                          className="before:bg-primary relative pl-[18px] text-[16px] leading-[1.5] before:absolute before:top-[0.6em] before:left-0 before:size-1.5 before:rounded-full before:content-['']"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="text-ink mt-0.5 rounded-r-lg border-l-[3px] border-[#15803d] bg-[#f0fdf4] px-2.5 py-2 text-[17px] leading-[1.58] font-bold">
                      {rule.result}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </CompletionPanel>
        </div>
      </div>
    </section>
  );
}
