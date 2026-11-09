import { DarkNavyLookupToolPageHero } from "@/components/sections/dark-navy-lookup-tool-page-hero";
import { ExamFeeQrLookupInteractiveWorkspace } from "@/features/exam-fee-qr-lookup/components/exam-fee-qr-lookup-interactive-workspace";
import { ExamFeeQrPaymentStepsGuide } from "@/features/exam-fee-qr-lookup/components/exam-fee-qr-payment-steps-guide";
import { createPageMetadata } from "@/lib/seo/create-page-metadata";

export const metadata = createPageMetadata({
  title: "Tra cứu mã QR thanh toán sát hạch | HPO",
  path: "/tra-cuu-qr/",
  description:
    "Tra cứu mã QR thanh toán lệ phí sát hạch lái xe dành cho học viên HPO.",
});

/** Tra cứu mã QR (V2 `tra-cuu-qr/`): đầu trang navy + biểu tượng QR · ô tra cứu CCCD + hướng dẫn 3 bước · kết quả. */
export default function ExamFeeQrLookupPage() {
  return (
    <div className="bg-[#f4f6fa]">
      <DarkNavyLookupToolPageHero
        eyebrow="Thanh toán trực tuyến"
        title={
          <>
            Tra cứu <em>mã QR thanh toán sát hạch</em>
          </>
        }
        description="Nhập số căn cước công dân để nhận đúng mã QR thanh toán lệ phí sát hạch của bạn."
        className="bg-linear-[125deg] from-[#071432] via-[#10285d] via-64% to-[#17437f] pt-[50px] pb-[68px] before:bg-[radial-gradient(circle,#fff_1px,transparent_1.4px)] before:bg-size-[24px_24px] before:opacity-16 min-[701px]:pt-[72px] min-[701px]:pb-20"
        innerClassName="flex items-center justify-between gap-[60px]"
        titleClassName="mb-[18px] max-w-[850px] text-[clamp(38px,5vw,64px)] leading-[1.1] font-bold tracking-[-0.045em]"
        aside={
          <div
            aria-hidden="true"
            className="hidden size-[166px] flex-none place-items-center rounded-full border border-white/20 bg-white/6 shadow-[0_0_0_16px_rgba(255,255,255,0.025)] min-[701px]:grid"
          >
            <svg viewBox="0 0 64 64" className="fill-emphasis-yellow w-[82px]">
              <path d="M6 6h20v20H6zM38 6h20v20H38zM6 38h20v20H6zM12 12h8v8h-8zM44 12h8v8h-8zM12 44h8v8h-8zM38 38h8v8h-8zM50 38h8v8h-8zM38 50h8v8h-8zM50 50h8v8h-8z" />
            </svg>
          </div>
        }
      />

      <section className="pb-[90px]">
        <div className="container-site">
          <ExamFeeQrLookupInteractiveWorkspace
            guide={<ExamFeeQrPaymentStepsGuide />}
          />
        </div>
      </section>
    </div>
  );
}
