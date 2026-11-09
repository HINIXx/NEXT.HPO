const paymentSteps = [
  { title: "Nhập CCCD", text: "Dùng đúng 12 chữ số đã đăng ký với HPO." },
  {
    title: "Kiểm tra thông tin",
    text: "Đối chiếu họ tên và CCCD trên kết quả.",
  },
  {
    title: "Quét mã QR",
    text: "Mở ứng dụng ngân hàng và quét mã để thanh toán.",
  },
] as const;

/**
 * Khung navy "Quét mã an toàn trong 3 bước" cạnh ô tra cứu (V2 `aside.qr-guide`).
 * ≥951px: 1 cột cạnh ô tra cứu · 701–950px: 3 bước nằm ngang · ≤700px: xếp dọc.
 */
export function ExamFeeQrPaymentStepsGuide() {
  return (
    <aside className="bg-ink after:font-display relative overflow-hidden rounded-[20px] border border-[#dfe4ed] px-[18px] py-[22px] text-white shadow-[0_15px_44px_rgba(8,21,54,0.09)] after:absolute after:right-[-15px] after:bottom-[-38px] after:text-[130px] after:leading-none after:font-extrabold after:text-white/3.5 after:content-['QR'] min-[701px]:p-[31px]">
      <p className="font-display text-emphasis-yellow mb-3 text-[13px] font-bold tracking-[0.16em]">
        HƯỚNG DẪN THANH TOÁN
      </p>
      <h2 className="font-display relative z-1 mb-[26px] text-[21px] leading-[1.4] font-bold text-balance">
        Quét mã an toàn trong 3 bước
      </h2>
      <ol className="relative z-1 grid gap-5 min-[701px]:grid-cols-3 min-[951px]:grid-cols-1">
        {paymentSteps.map((step, index) => (
          <li key={step.title} className="flex gap-[13px]">
            <span className="font-display text-emphasis-yellow grid size-[34px] flex-none place-items-center rounded-[9px] border border-white/22 text-[11px] font-bold">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <strong className="mt-px mb-1 block text-base">
                {step.title}
              </strong>
              <p className="text-[14px] leading-[1.55] text-pretty text-white/80">
                {step.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <div className="relative z-1 mt-[26px] border-t border-white/14 pt-5">
        <strong className="text-emphasis-yellow text-[12px]">Lưu ý</strong>
        <p className="mt-[5px] text-[14px] leading-[1.55] text-white/80">
          Không chỉnh sửa nội dung hoặc số tiền do hệ thống tạo.
        </p>
      </div>
    </aside>
  );
}
