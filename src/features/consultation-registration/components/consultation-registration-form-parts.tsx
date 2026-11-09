import Link from "next/link";
import { courseTuitionPromoDeadline } from "@/features/courses/data/course-tuition-offerings";
import { cn } from "@/lib/utils";
import { contact } from "@/shared/config/contact";
import { privacyPolicyLink } from "@/shared/config/navigation";
import {
  trainingClassOptions,
  type PromotionArea,
} from "../data/consultation-registration-config";

export const consultationErrorClassName =
  "mt-1.5 text-[15px] font-bold text-[#b41923]";

/** Đầu khung: "Ưu đãi cho người dân [xã]" + tiêu đề + ô "Áp dụng đến hết ngày …" (V2 `.uu-reg__head`). */
export function ConsultationFormCardHeader({
  titleId,
  area,
}: {
  titleId: string;
  area: PromotionArea | null;
}) {
  return (
    <header className="mb-[22px] flex flex-wrap items-end justify-between gap-x-6 gap-y-3.5">
      <div>
        <p className="text-[17px] leading-[1.65] font-extrabold text-[#b41923]">
          Ưu đãi cho người dân
          {area?.displayName ? ` ${area.displayName}` : ""}
        </p>
        <h2
          id={titleId}
          className="font-display text-brand-navy mt-1 mb-1.5 text-[clamp(26px,2.4vw,34px)] leading-[1.25] font-extrabold"
        >
          Đăng ký học lái xe tại Hiệp Phát
        </h2>
        <p className="text-[18px] leading-[1.45] text-[#475273]">
          Để lại thông tin, nhân viên tuyển sinh sẽ gọi tư vấn miễn phí
        </p>
      </div>
      <p className="flex w-full items-center gap-2.5 rounded-[14px] border border-[#ffd2d4] bg-[#fff4f4] px-4 py-2.5 text-[17px] leading-[1.4] min-[481px]:w-auto">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="stroke-brand-red size-[22px] flex-none fill-none stroke-2 [stroke-linecap:round]"
        >
          <rect x="3.5" y="5" width="17" height="15" rx="3" />
          <path d="M3.5 10h17M8 3v4M16 3v4" />
        </svg>
        <span>
          {area?.appliesTo ? `Áp dụng cho ${area.appliesTo}. ` : null}
          Áp dụng đến hết ngày{" "}
          <strong className="font-bold text-[#b41923]">
            {area?.endDate ?? courseTuitionPromoDeadline}
          </strong>
        </span>
      </p>
    </header>
  );
}

/** 4 ô chọn hạng luôn hiện (không phải mở danh sách), vòng tròn chọn tự vẽ (V2 `.uu-reg__classes`). */
export function TrainingClassRadioFieldset({
  errorId,
  invalid,
  onChange,
}: {
  errorId: string;
  invalid: boolean;
  onChange: () => void;
}) {
  return (
    <fieldset
      aria-describedby={errorId}
      aria-invalid={invalid || undefined}
      onChange={onChange}
      className="group/classes mb-4"
    >
      <legend className="mb-2 text-[17px] font-bold">
        Hạng đào tạo quan tâm{" "}
        <span aria-hidden="true" className="text-brand-red">
          *
        </span>
      </legend>
      <div className="grid grid-cols-1 gap-2.5 min-[481px]:grid-cols-2 lg:grid-cols-4">
        {trainingClassOptions.map((option) => (
          <label key={option.value} className="relative block cursor-pointer">
            <input
              type="radio"
              name="hangDaoTao"
              value={option.value}
              className="peer absolute size-px opacity-0"
            />
            <span className="group-aria-[invalid=true]/classes:border-brand-red peer-checked:border-brand-blue peer-focus-visible:outline-brand-blue peer-checked:before:border-brand-blue peer-checked:before:bg-brand-blue flex min-h-[62px] flex-col justify-center gap-px rounded-[14px] border-2 border-[#cdd6ee] bg-white py-2 pr-3.5 pl-[46px] text-[16px] leading-[1.3] text-[#475273] transition-[border-color,background-color,box-shadow] peer-checked:bg-[#f2f1ff] peer-checked:shadow-[0_0_0_3px_rgba(43,38,251,0.12)] peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 before:absolute before:top-1/2 before:left-[15px] before:-mt-2.5 before:size-5 before:rounded-full before:border-2 before:border-[#9aa6c6] before:bg-white before:content-[''] peer-checked:before:shadow-[inset_0_0_0_4px_#fff] hover:border-[#9a97ff]">
              <b className="text-ink text-[17px] font-extrabold">
                {option.label}
              </b>
              {option.note}
            </span>
          </label>
        ))}
      </div>
      <p id={errorId} hidden={!invalid} className={consultationErrorClassName}>
        Vui lòng chọn hạng đào tạo.
      </p>
    </fieldset>
  );
}

export type ConsultationSubmitStatus = {
  kind: "ok" | "error";
  text: string;
} | null;

/** Ô bẫy bot ẩn + ghi chú + nút gửi + đồng ý chính sách + kết quả gửi (kèm số tổng đài). */
export function ConsultationSubmitFooter({
  busy,
  status,
}: {
  busy: boolean;
  status: ConsultationSubmitStatus;
}) {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] size-px overflow-hidden"
      >
        <label>
          Website{" "}
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <p className="mt-1 mb-4 text-[16px] leading-[1.5] text-[#475273] lg:text-center">
        Nhân viên tuyển sinh sẽ liên hệ để tư vấn chương trình học và học phí.
        Không cần thanh toán.
      </p>
      <button
        type="submit"
        disabled={busy}
        className="group/submit focus-visible:outline-brand-navy flex min-h-14 w-full items-center justify-center gap-2.5 justify-self-center rounded-full bg-[linear-gradient(135deg,#3355ff_0%,#2643e9_45%,#1b2fa8_100%)] px-[22px] text-[18px] font-extrabold text-white shadow-[0_12px_24px_-12px_rgba(38,67,233,0.8),inset_0_1px_0_rgba(255,255,255,0.2)] transition-[translate,box-shadow] hover:-translate-y-px hover:shadow-[0_16px_30px_-12px_rgba(38,67,233,0.9)] focus-visible:outline-3 focus-visible:outline-offset-3 disabled:translate-y-0 disabled:cursor-progress disabled:opacity-70 lg:w-[min(100%,440px)]"
      >
        {busy ? "Đang gửi…" : "Nhận tư vấn miễn phí"}
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="size-[22px] flex-none fill-none stroke-current stroke-[2.4] transition-transform [stroke-linecap:round] [stroke-linejoin:round] group-hover/submit:translate-x-[3px]"
        >
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </button>
      <p className="mt-3 text-center text-[14px] leading-[1.5] text-[#475273]">
        Khi gửi, bạn đồng ý để Hiệp Phát liên hệ theo{" "}
        <Link
          href={privacyPolicyLink.href}
          className="text-brand-blue font-bold"
        >
          Chính sách bảo mật
        </Link>
        .
      </p>
      <p
        role="status"
        aria-live="polite"
        hidden={!status}
        className={cn(
          "mt-3.5 rounded-[14px] px-4 py-3.5 text-[17px] leading-[1.5] font-bold",
          status?.kind === "ok"
            ? "bg-[#e7f7ee] text-[#0f5b32]"
            : "bg-[#fff1f1] text-[#b41923]",
        )}
      >
        {status?.text}{" "}
        {status ? (
          <>
            <a
              href={contact.hotlineHref}
              className="font-extrabold whitespace-nowrap text-inherit"
            >
              {contact.hotline}
            </a>
            .
          </>
        ) : null}
      </p>
    </>
  );
}
