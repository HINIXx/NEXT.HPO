import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  examContentItems,
  examDossierCenterDocuments,
  examDossierStudentDocuments,
} from "../data/course-completion-and-exam-requirements";
import { trainingProcessImageBase } from "../data/driving-training-process-steps";
import {
  ProcessEyebrowLabel,
  TrainingProcessSectionHead,
  trainingProcessSectionClassName,
} from "./training-process-shared-typography";

const stepNumberClassName =
  "font-display inline-flex items-center justify-center border-4 border-surface font-extrabold text-white";

/**
 * Bước 4 (V2 `#sat-hach`, nền #f5f7fc): bảng "Hồ sơ dự sát hạch lái xe" — 5 thẻ nối bằng vạch (≥1181px),
 * thẻ 06 hồ sơ học viên trải hết hàng, rồi dải navy "Nội dung sát hạch" 3 bài thi.
 */
export function DrivingExamStepSection() {
  return (
    <section
      id="sat-hach"
      aria-labelledby="exam-title"
      className={`bg-surface ${trainingProcessSectionClassName}`}
    >
      <div className="container-site">
        <TrainingProcessSectionHead
          eyebrow="Bước 04"
          titleId="exam-title"
          title={
            <>
              Sát hạch <em>lái xe</em>
            </>
          }
          description="Trước kỳ sát hạch, cơ sở đào tạo hoàn thiện hồ sơ đề nghị tổ chức sát hạch và học viên tham gia các nội dung thi theo quy định."
        />
        <div className="shadow-hp-md relative grid gap-5 overflow-hidden rounded-[20px] border border-[#dbe3f0] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(245,247,252,0.92)),#fff] p-[18px] min-[641px]:rounded-[28px] min-[641px]:p-[22px] min-[981px]:gap-6 min-[981px]:p-[clamp(22px,3vw,34px)]">
          <div className="font-display text-ink inline-flex min-h-[54px] w-full items-center justify-center rounded-full border border-[#b8c5db] bg-white px-4 text-[16px] font-extrabold shadow-[0_10px_26px_rgba(10,19,48,0.07)] min-[641px]:w-fit min-[641px]:justify-start min-[641px]:px-[22px]">
            Hồ sơ dự sát hạch lái xe
          </div>
          <ol className="relative grid grid-cols-1 gap-4 min-[641px]:grid-cols-2 min-[981px]:grid-cols-3 min-[1181px]:grid-cols-5 min-[1181px]:before:absolute min-[1181px]:before:top-[30px] min-[1181px]:before:right-11 min-[1181px]:before:left-11 min-[1181px]:before:z-0 min-[1181px]:before:h-0.5 min-[1181px]:before:rounded-full min-[1181px]:before:bg-[linear-gradient(90deg,#1e40af,#dc2626)] min-[1181px]:before:content-['']">
            {examDossierCenterDocuments.map((document, index) => (
              <li
                key={document.number}
                className="hover:shadow-hp-md relative z-[1] grid content-start gap-4 rounded-[20px] border border-[#dbe3f0] bg-[linear-gradient(180deg,#fff,#f8fbff)] p-[18px] shadow-[0_10px_26px_rgba(10,19,48,0.07)] transition-[translate,border-color,box-shadow] duration-200 hover:-translate-y-[3px] hover:border-[rgba(30,64,175,0.2)] min-[1181px]:min-h-[172px]"
              >
                <span
                  className={cn(
                    stepNumberClassName,
                    "size-12 rounded-[15px] min-[981px]:size-[54px] min-[981px]:rounded-[18px]",
                    index % 2 === 1 ? "bg-[#dc2626]" : "bg-ink",
                  )}
                >
                  {document.number}
                </span>
                <div>
                  <h3 className="font-display text-ink mb-2 text-[18px] leading-[1.35] font-extrabold">
                    {document.title}
                  </h3>
                  {document.note ? (
                    <p className="text-ink text-[16px]">{document.note}</p>
                  ) : null}
                </div>
              </li>
            ))}
            <li className="relative z-[1] col-span-full grid grid-cols-1 gap-[18px] rounded-[20px] border border-[#dbe3f0] bg-white p-[18px] shadow-[0_10px_26px_rgba(10,19,48,0.07)] min-[641px]:p-6 min-[1181px]:grid-cols-[72px_minmax(0,1fr)]">
              <span
                className={cn(
                  stepNumberClassName,
                  "size-[62px] rounded-[18px] bg-[#dc2626]",
                )}
              >
                06
              </span>
              <div>
                <h3 className="font-display text-ink my-2 text-[18px] leading-[1.35] font-extrabold">
                  Hồ sơ dự sát hạch lái xe của học viên
                </h3>
                <ol className="mt-4 grid grid-cols-1 gap-3 min-[901px]:grid-cols-2 min-[1181px]:grid-cols-3">
                  {examDossierStudentDocuments.map((item) => (
                    <li
                      key={item.number}
                      className={cn(
                        "bg-surface grid grid-cols-[32px_minmax(0,1fr)] items-start gap-2.5 rounded-2xl border border-[#dbe3f0] p-3.5 min-[641px]:grid-cols-[auto_minmax(0,1fr)] min-[641px]:gap-3",
                        item.papers && "col-span-full",
                      )}
                    >
                      <span className="font-display bg-primary-50 inline-flex min-h-8 min-w-8 items-center justify-center rounded-full text-[15px] font-extrabold text-[#1e3a8a]">
                        {item.number}
                      </span>
                      <div>
                        <p className="text-ink text-[16px] leading-[1.55] min-[641px]:text-[18px]">
                          {item.text}
                          {item.italicNote ? (
                            <>
                              {" "}
                              <em className="font-bold italic">
                                {item.italicNote}
                              </em>
                              .
                            </>
                          ) : null}
                        </p>
                        {item.papers ? (
                          <ul className="text-ink mt-3 flex flex-wrap gap-2 text-[14px]">
                            {item.papers.map((paper) => (
                              <li
                                key={paper}
                                className="rounded-full border border-[#dbe3f0] bg-white px-2.5 py-[5px] leading-[1.35] font-bold"
                              >
                                {paper}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </li>
          </ol>

          <section
            aria-labelledby="exam-content-title"
            className="mt-4 grid grid-cols-1 overflow-hidden rounded-[22px] border border-[rgba(10,19,48,0.12)] bg-[linear-gradient(135deg,#0a1330,#1d3b8f)] shadow-[0_22px_52px_rgba(10,19,48,0.14)] min-[981px]:grid-cols-[minmax(220px,0.32fr)_minmax(0,1fr)]"
          >
            <h3
              id="exam-content-title"
              className="font-display flex items-center border-b border-white/14 bg-white/6 px-6 py-[22px] text-[22px] leading-[1.2] font-extrabold text-white min-[981px]:border-r min-[981px]:border-b-0"
            >
              Nội dung sát hạch
            </h3>
            <ul className="grid grid-cols-1 gap-3 p-4 min-[641px]:p-5 min-[981px]:grid-cols-3">
              {examContentItems.map((item, index) => (
                <li
                  key={item}
                  className="relative rounded-2xl border border-white/14 bg-white/8 py-4 pr-4 pl-[52px] text-[17px] leading-[1.45] font-bold text-white/90"
                >
                  <span
                    aria-hidden="true"
                    className="font-display bg-emphasis-yellow text-ink absolute top-4 left-4 grid size-[26px] place-items-center rounded-full text-[14px] font-extrabold"
                  >
                    {index + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}

/**
 * Bước 5 (V2 `#gplx`): băng navy — chữ trái, thẻ GPLX phải (rê chuột lật mặt sau); ≤900px xếp dọc.
 * Vạch đáy phải gradient xanh logo → vàng (V2 `--hp-lead-bar`).
 */
export function DrivingLicenseIssuanceStepSection() {
  const admission = `${trainingProcessImageBase}/admission`;
  return (
    <section
      id="gplx"
      aria-labelledby="license-title"
      className={trainingProcessSectionClassName}
    >
      <div className="container-site">
        <div
          data-reveal
          className={cn(
            "relative grid grid-cols-1 items-center gap-9 overflow-hidden rounded-3xl px-[22px] py-[30px] min-[641px]:p-[38px] lg:min-h-[500px] lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.68fr)] lg:p-14",
            "bg-[linear-gradient(135deg,rgba(10,19,48,0.98),rgba(30,64,175,0.94)),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:auto,32px_32px] shadow-[0_26px_70px_rgba(10,19,48,0.18)]",
            "after:absolute after:right-0 after:bottom-0 after:h-1.5 after:w-[34%] after:bg-[linear-gradient(90deg,#2b26fb,#faec1a)] after:content-['']",
          )}
        >
          <div className="relative z-[1]">
            <ProcessEyebrowLabel tone="light" className="mb-3.5">
              Bước 05
            </ProcessEyebrowLabel>
            <h2
              id="license-title"
              className="font-display [&_em]:text-emphasis-yellow text-[clamp(28px,2.8vw,40px)] leading-[1.08] font-extrabold tracking-[-0.015em] text-white [&_em]:font-bold [&_em]:whitespace-nowrap [&_em]:not-italic"
            >
              Nhận giấy phép <em>lái xe</em>
            </h2>
            <div className="mt-5 grid gap-[18px] text-[17px] leading-[1.6] text-[#dbe4f5] min-[901px]:text-[18px]">
              <p>
                Người đạt kỳ sát hạch được cấp GPLX điện tử và tích hợp trên hệ
                thống trong vòng 02 giờ sau khi kết thúc kỳ sát hạch.
              </p>
              <p>
                Trường hợp đăng ký GPLX thẻ PET, thời gian in và trả không quá
                3,5 ngày làm việc, nhận tại Phòng CSGT, trung tâm sát hạch, cơ
                sở đào tạo hoặc qua bưu chính.
              </p>
            </div>
          </div>
          <figure
            aria-hidden="true"
            className="group relative z-[1] mx-auto w-full max-w-[444px] [perspective:1000px]"
          >
            <div className="relative aspect-[570/438] transition-transform duration-600 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] motion-reduce:transition-none">
              <Image
                src={`${admission}/gplx-oto-front.png`}
                alt=""
                width={570}
                height={438}
                loading="lazy"
                className="absolute inset-0 size-full [backface-visibility:hidden]"
              />
              <Image
                src={`${admission}/gplx-oto-back.png`}
                alt=""
                width={573}
                height={436}
                loading="lazy"
                className="absolute inset-0 size-full [transform:rotateY(180deg)] [backface-visibility:hidden]"
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
