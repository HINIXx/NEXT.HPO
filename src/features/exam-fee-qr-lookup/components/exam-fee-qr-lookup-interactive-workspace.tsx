"use client";

import { ArrowRight, Lock, Search } from "lucide-react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import {
  DEMO_IDENTITY_CARD,
  isValidIdentityCard,
  lookupExamFeeQrStudent,
  type ExamFeeQrStudent,
} from "../data/exam-fee-qr-student-lookup-service";
import { ExamFeeQrLookupResultPanel } from "./exam-fee-qr-lookup-result-panel";

/** Thẻ trắng dùng chung cho ô tra cứu (V2 `.qr-card`). */
export const qrLookupCardClassName =
  "rounded-[20px] border border-[#dfe4ed] bg-white shadow-[0_15px_44px_rgba(8,21,54,0.09)]";

/**
 * Khu tra cứu (V2 `tra-cuu-qr/script.js`): ô CCCD 12 số (chỉ nhận chữ số, đếm x/12) · nút điền số demo ·
 * gọi API → hiện kết quả + mã QR bên dưới, cuộn tới kết quả. `guide` = khung hướng dẫn (Server Component).
 */
export function ExamFeeQrLookupInteractiveWorkspace({
  guide,
}: {
  guide: ReactNode;
}) {
  const [identityCard, setIdentityCard] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState<ExamFeeQrStudent | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const ids = useId();
  const hintId = `${ids}-hint`;
  const errorId = `${ids}-error`;

  useEffect(() => {
    if (student)
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [student]);

  const updateIdentityCard = (value: string) => {
    setIdentityCard(value.replace(/\D/g, "").slice(0, 12));
    setError("");
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!isValidIdentityCard(identityCard)) {
      setStudent(null);
      setError("Vui lòng nhập đúng 12 chữ số căn cước công dân.");
      inputRef.current?.focus();
      return;
    }
    setLoading(true);
    setError("");
    try {
      setStudent(await lookupExamFeeQrStudent(identityCard));
    } catch (lookupError) {
      setStudent(null);
      setError(
        lookupError instanceof Error
          ? lookupError.message
          : String(lookupError),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative z-2 -mt-[34px] grid items-stretch gap-[22px] min-[951px]:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.75fr)]">
        <section
          aria-labelledby="search-title"
          className={cn(
            qrLookupCardClassName,
            "px-[18px] py-[22px] min-[701px]:p-[31px]",
          )}
        >
          <div className="mb-[22px] flex items-center gap-3.5">
            <span className="grid size-12 flex-none place-items-center rounded-[13px] bg-[#1e3a8a] text-white">
              <Search aria-hidden="true" className="size-[22px]" />
            </span>
            <div>
              <p className="mb-1 text-[14px] font-bold tracking-[0.08em] text-slate-600 uppercase">
                Tra cứu học viên
              </p>
              <h2
                id="search-title"
                className="font-display text-[23px] leading-[1.3] font-bold"
              >
                Nhận mã QR thanh toán
              </h2>
            </div>
          </div>

          <div className="mb-[23px] flex gap-3 rounded-[11px] bg-[#fff9e9] px-4 py-[15px] text-[#78350f]">
            <span
              aria-hidden="true"
              className="grid size-[21px] flex-none place-items-center rounded-full border-[1.5px] border-[#b45309] font-[Georgia,serif] text-[13px] font-bold"
            >
              i
            </span>
            <p className="text-[15px] leading-[1.6] text-pretty">
              Mã QR được cấp riêng cho từng học viên. Vui lòng kiểm tra đúng{" "}
              <strong>họ tên và số CCCD</strong> trước khi thanh toán.
            </p>
          </div>

          <form noValidate onSubmit={handleSubmit}>
            <label
              htmlFor="identityCard"
              className="text-ink mb-[9px] block text-[15px] font-bold"
            >
              Số căn cước công dân
            </label>
            <div className="relative">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-[15px] w-[21px] -translate-y-1/2 fill-none stroke-[#738098] stroke-[1.8]"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <circle cx="8" cy="11" r="2" />
                <path d="M13 10h5M13 14h4" />
              </svg>
              <input
                ref={inputRef}
                id="identityCard"
                name="identityCard"
                inputMode="numeric"
                autoComplete="off"
                maxLength={12}
                placeholder="Nhập 12 chữ số CCCD"
                value={identityCard}
                onChange={(event) => updateIdentityCard(event.target.value)}
                aria-describedby={`${hintId} ${errorId}`}
                aria-invalid={!!error}
                className="font-display text-ink h-[54px] w-full rounded-[11px] border border-[#d4dbe6] bg-[#fafbfc] pr-4 pl-[47px] text-base leading-none font-semibold tracking-[0.04em] transition-[border-color,box-shadow] duration-200 outline-none placeholder:text-slate-500 focus:border-[#5d83b8] focus:shadow-[0_0_0_3px_rgba(24,68,119,0.12)] aria-invalid:border-[#c94b4b] aria-invalid:shadow-[0_0_0_3px_rgba(201,75,75,0.1)]"
              />
            </div>
            <div className="mt-2 flex justify-between gap-[15px] text-[14px] text-slate-600">
              <small id={hintId} className="text-[14px]">
                Dữ liệu demo:{" "}
                <button
                  type="button"
                  onClick={() => {
                    updateIdentityCard(DEMO_IDENTITY_CARD);
                    inputRef.current?.focus();
                  }}
                  className="font-display cursor-pointer border-b border-dashed border-current text-[12px] leading-[1.3] font-bold text-[#1e3a8a] hover:text-[#0b2f59]"
                >
                  {DEMO_IDENTITY_CARD}
                </button>
              </small>
              <small className="text-[14px]">{identityCard.length}/12</small>
            </div>
            <p
              id={errorId}
              role="alert"
              className="mt-2 text-[15px] text-[#b42e2e] empty:hidden"
            >
              {error}
            </p>
            <button
              type="submit"
              disabled={loading}
              className="font-display mt-[18px] flex h-[52px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-[10px] bg-[#1e3a8a] text-base font-bold text-white transition-colors duration-200 hover:bg-[#0d3562] disabled:cursor-wait disabled:opacity-72"
            >
              <span>{loading ? "Đang tra cứu…" : "Tra cứu mã QR"}</span>
              <ArrowRight aria-hidden="true" className="size-[18px]" />
            </button>
          </form>

          <p className="mt-[17px] flex items-center justify-center gap-[7px] text-center text-[14px] text-slate-600">
            <Lock aria-hidden="true" className="size-[15px] flex-none" />
            Thông tin chỉ được sử dụng để tra cứu mã thanh toán sát hạch.
          </p>
        </section>

        {guide}
      </div>

      <div ref={resultRef} className="scroll-mt-[140px]">
        {student && (
          <ExamFeeQrLookupResultPanel
            student={student}
            identityCard={identityCard}
            onClose={() => {
              setStudent(null);
              inputRef.current?.focus();
            }}
          />
        )}
      </div>
    </>
  );
}
