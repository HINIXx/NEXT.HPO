"use client";

/* eslint-disable @next/next/no-img-element -- ảnh QR là data URL tạo trên trình duyệt */
import { Download } from "lucide-react";
import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  formatExamFeeAmount,
  type ExamFeeQrStudent,
} from "../data/exam-fee-qr-student-lookup-service";

/**
 * Kết quả tra cứu (V2 `section.qr-result`): thanh vàng + nút Đóng · thông tin học viên · ô QR + Tải mã QR.
 * Khác V2 có chủ đích: khung kết quả thẳng hàng với 2 khối trên (V2 rộng hơn 56px do gắn `.container` lên chính khung).
 */
export function ExamFeeQrLookupResultPanel({
  student,
  identityCard,
  onClose,
}: {
  student: ExamFeeQrStudent;
  identityCard: string;
  onClose: () => void;
}) {
  const [qrDataUrl, setQrDataUrl] = useState("");

  useEffect(() => {
    let cancelled = false;
    QRCode.toDataURL(student.qrCode ?? "", {
      width: 220,
      margin: 0,
      errorCorrectionLevel: "M",
      color: { dark: "#071432", light: "#ffffff" },
    })
      .then((url) => !cancelled && setQrDataUrl(url))
      .catch(() => !cancelled && setQrDataUrl(""));
    return () => {
      cancelled = true;
    };
  }, [student.qrCode]);

  const details = [
    {
      label: "Số căn cước công dân",
      value: student.identityCard || identityCard,
    },
    { label: "Khóa học", value: student.course || "Chưa cập nhật" },
    { label: "Lệ phí sát hạch", value: formatExamFeeAmount(student.amount) },
  ];

  return (
    <section
      id="qrResult"
      aria-labelledby="result-title"
      className="mt-7 scroll-mt-[140px] overflow-hidden rounded-[20px] border border-[#dfe4ed] bg-white shadow-[0_15px_44px_rgba(8,21,54,0.09)]"
    >
      <div className="flex items-center justify-between bg-[#fff5d9] px-[18px] text-[14px] text-[#725913] min-[701px]:px-[26px]">
        <span className="max-w-[62%] py-2 min-[701px]:max-w-none">
          Mã thanh toán từ hệ thống sát hạch HPO
        </span>
        <button
          type="button"
          onClick={onClose}
          className="min-h-11 cursor-pointer font-bold text-[#6c571b]"
        >
          Đóng kết quả
        </button>
      </div>

      <div className="grid min-[701px]:grid-cols-[minmax(0,1fr)_310px] min-[951px]:grid-cols-[minmax(0,1fr)_340px]">
        <div className="px-5 py-6 min-[701px]:p-[34px]">
          <p className="mb-[5px] text-[14px] font-bold tracking-[0.08em] text-slate-600 uppercase">
            Kết quả tra cứu
          </p>
          <h2
            id="result-title"
            className="font-display mb-2.5 text-[27px] font-bold text-balance"
          >
            {student.fullName || "Học viên"}
          </h2>
          {student.isDemo && (
            <div className="font-display mb-5 inline-flex rounded-full border border-[#e8c45c] bg-[#fff8df] px-[9px] py-[5px] text-[10px] leading-none font-bold tracking-[0.08em] text-[#795b0c]">
              DỮ LIỆU MINH HỌA
            </div>
          )}
          <dl className="grid overflow-hidden rounded-xl border border-[#e1e6ed] min-[701px]:grid-cols-2">
            {[...details, null].map((detail, index) => (
              <div
                key={detail?.label ?? "status"}
                className={cn(
                  "bg-[#f8f9fb] px-[19px] py-[17px]",
                  index > 0 && "border-t border-[#e1e6ed]",
                  index === 1 && "min-[701px]:border-t-0",
                  index % 2 === 1 && "min-[701px]:border-l",
                )}
              >
                <dt className="mb-1.5 text-[13px] text-[#7a8698] uppercase">
                  {detail?.label ?? "Trạng thái"}
                </dt>
                {detail ? (
                  <dd className="text-ink text-base font-bold">
                    {detail.value}
                  </dd>
                ) : (
                  <dd className="flex items-center gap-[7px] text-base font-bold text-[#15803d]">
                    <i
                      aria-hidden="true"
                      className="size-2 rounded-full bg-current"
                    />{" "}
                    Sẵn sàng thanh toán
                  </dd>
                )}
              </div>
            ))}
          </dl>
          <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#a9dbc9] bg-[#edf9f4] p-4 text-[#145d48]">
            <span
              aria-hidden="true"
              className="grid size-[25px] flex-none place-items-center rounded-full bg-[#15803d] font-bold text-white"
            >
              ✓
            </span>
            <p className="mt-px text-[15px] leading-[1.55]">
              {student.isDemo
                ? "Đây là mã QR minh họa để kiểm thử giao diện, không có giá trị thanh toán."
                : "Mã QR đã được tạo từ dữ liệu thanh toán của hệ thống. Hãy dùng ứng dụng ngân hàng để quét mã."}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center border-t border-[#e2e6ed] bg-[#f8f9fb] px-5 py-[25px] min-[701px]:border-t-0 min-[701px]:border-l min-[701px]:p-[31px]">
          <div
            aria-label="Mã QR thanh toán"
            className="grid min-h-[244px] min-w-[244px] place-items-center rounded-[14px] border border-[#dfe5ec] bg-white p-3 shadow-[0_8px_25px_rgba(8,21,54,0.08)]"
          >
            {qrDataUrl && (
              <img
                src={qrDataUrl}
                alt={`Mã QR thanh toán lệ phí sát hạch của ${student.fullName || "học viên"}`}
                width={220}
                height={220}
              />
            )}
          </div>
          <p className="mt-[15px] mb-[13px] text-[15px] font-bold text-[#5f6d82]">
            Quét mã để thanh toán
          </p>
          <a
            href={qrDataUrl || undefined}
            download={`ma-qr-thanh-toan-${identityCard}.png`}
            aria-disabled={!qrDataUrl}
            className="flex min-h-11 items-center gap-2 rounded-[9px] border border-[#cbd4e1] bg-white px-4 font-bold text-[#1e3a8a] hover:bg-[#edf3fa]"
          >
            <Download aria-hidden="true" className="size-[17px]" />
            Tải mã QR
          </a>
        </div>
      </div>
    </section>
  );
}
