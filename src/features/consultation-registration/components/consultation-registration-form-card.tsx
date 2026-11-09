"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import {
  ConsultationFormCardHeader,
  ConsultationSubmitFooter,
  consultationErrorClassName,
  type ConsultationSubmitStatus,
  TrainingClassRadioFieldset,
} from "./consultation-registration-form-parts";
import {
  consultationRegistrationEndpoint,
  loadPromotionAreaFromLocation,
  normalizeVietnamesePhone,
  type PromotionArea,
} from "../data/consultation-registration-config";

type FieldErrors = { name?: boolean; phone?: boolean; trainingClass?: boolean };

const inputClassName =
  "text-ink h-[54px] w-full rounded-[14px] border-2 border-[#cdd6ee] bg-white px-[18px] text-[18px] transition-[border-color,box-shadow] placeholder:text-[#8a93ad] focus:border-brand-blue focus:shadow-[0_0_0_4px_rgba(43,38,251,0.16)] focus:outline-none aria-[invalid=true]:border-brand-red";
const errorClassName = consultationErrorClassName;

/**
 * Khung "Đăng ký học lái xe tại Hiệp Phát" + form Đăng ký tư vấn (V2 `.uu-reg`, trang Ưu đãi + trang chủ).
 * Họ tên ≥2 ký tự · SĐT VN 10–11 số · 1 trong 4 hạng; lỗi hiện chữ dưới từng ô, focus ô lỗi đầu tiên.
 * Ô "Website" ẩn bẫy bot. `?location=` → điền "Ưu đãi cho người dân xã …", ngày hết hạn, cột Xã gửi lên Sheet.
 */
export function ConsultationRegistrationFormCard({
  className,
  documentTitlePrefix,
}: {
  className?: string;
  /** Trang Ưu đãi: có xã → đổi tiêu đề tab "<prefix> – xã Tân Nhựt | Hiệp Phát" (như V2). */
  documentTitlePrefix?: string;
}) {
  const baseId = useId();
  const [area, setArea] = useState<PromotionArea | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<ConsultationSubmitStatus>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadPromotionAreaFromLocation(window.location.search).then((result) => {
      if (cancelled) return;
      setArea(result);
      if (documentTitlePrefix && result?.displayName)
        document.title = `${documentTitlePrefix} – ${result.displayName} | Hiệp Phát`;
    });
    return () => {
      cancelled = true;
    };
  }, [documentTitlePrefix]);

  const ids = {
    title: `${baseId}-title`,
    formTitle: `${baseId}-form-title`,
    name: `${baseId}-name`,
    phone: `${baseId}-phone`,
    nameErr: `${baseId}-name-err`,
    phoneErr: `${baseId}-phone-err`,
    classErr: `${baseId}-class-err`,
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("hoTen") ?? "").trim();
    const phone = normalizeVietnamesePhone(
      String(data.get("soDienThoai") ?? ""),
    );
    const trainingClass = String(data.get("hangDaoTao") ?? "");
    const nextErrors = {
      name: name.length < 2,
      phone: !phone,
      trainingClass: !trainingClass,
    };
    setErrors(nextErrors);
    const firstInvalid = nextErrors.name
      ? "hoTen"
      : nextErrors.phone
        ? "soDienThoai"
        : nextErrors.trainingClass
          ? "hangDaoTao"
          : null;
    if (firstInvalid) {
      (
        form.querySelector(
          `[name="${firstInvalid}"]`,
        ) as HTMLInputElement | null
      )?.focus();
      return;
    }
    // Bot điền ô ẩn → giả vờ thành công, không gửi.
    if (String(data.get("website") ?? "")) {
      setStatus({ kind: "ok", text: "Đã nhận đăng ký. Cảm ơn bạn!" });
      form.reset();
      return;
    }
    if (!/^https:\/\//.test(consultationRegistrationEndpoint)) {
      setStatus({
        kind: "error",
        text: "Hệ thống nhận đăng ký đang được cập nhật. Vui lòng gọi tổng đài",
      });
      return;
    }
    const body = new URLSearchParams({
      hoTen: name.slice(0, 80),
      soDienThoai: phone,
      hangDaoTao: trainingClass,
      xa: area?.sheetName ?? "",
      trang: window.location.href.slice(0, 300),
    });
    setBusy(true);
    try {
      await fetch(consultationRegistrationEndpoint, {
        method: "POST",
        mode: "no-cors",
        body,
      });
      form.reset();
      setStatus({
        kind: "ok",
        text: `Đã nhận đăng ký của ${name}. Nhân viên tuyển sinh Hiệp Phát sẽ gọi lại cho bạn sớm. Cần gấp, gọi tổng đài`,
      });
    } catch {
      setStatus({
        kind: "error",
        text: "Chưa gửi được (mạng không ổn định). Vui lòng thử lại hoặc gọi tổng đài",
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      aria-labelledby={ids.title}
      className={cn(
        "text-ink rounded-[20px] border border-[#d9e1f5] bg-[linear-gradient(180deg,#f5f7ff_0%,#fff_42%)] px-3.5 py-[18px] shadow-[0_24px_50px_-38px_rgba(20,33,110,0.55)] [border-top:6px_solid_#ea1e24] min-[481px]:rounded-3xl min-[481px]:p-[clamp(20px,3vw,34px)]",
        className,
      )}
    >
      <ConsultationFormCardHeader titleId={ids.title} area={area} />

      <form
        noValidate
        aria-labelledby={ids.formTitle}
        onSubmit={onSubmit}
        className="border-brand-blue relative grid rounded-[20px] border-2 bg-white px-3.5 py-4 shadow-[0_18px_40px_-28px_rgba(43,38,251,0.7)] min-[481px]:p-7 lg:grid-cols-2 lg:gap-x-5 [&>*:not([data-half-width])]:col-span-full"
      >
        <div className="mb-5 flex flex-wrap items-center gap-3.5 min-[481px]:flex-nowrap">
          <span
            aria-hidden="true"
            className="text-brand-blue grid size-[50px] flex-none place-items-center rounded-[14px] bg-[#ecebff]"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-6 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
            >
              <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
              <rect x="3" y="13.5" width="4" height="6" rx="1.6" />
              <rect x="17" y="13.5" width="4" height="6" rx="1.6" />
              <path d="M20 19.5c0 1.4-1.6 2-4 2h-2" />
            </svg>
          </span>
          <div className="min-w-0 basis-[calc(100%-64px)] min-[481px]:flex-1 min-[481px]:basis-auto">
            <h3
              id={ids.formTitle}
              className="font-display text-[22px] leading-[1.3] font-extrabold"
            >
              Đăng ký tư vấn
            </h3>
            <p className="text-[16px] leading-[1.4] text-[#475273]">
              Chưa quyết định học, cần được hỗ trợ
            </p>
          </div>
          <span className="ml-16 rounded-full bg-[#e7f7ee] px-3 py-1.5 text-[14px] font-extrabold text-[#146c3c] min-[481px]:ml-0">
            Miễn phí tư vấn
          </span>
        </div>

        <div data-half-width className="mb-4">
          <label
            htmlFor={ids.name}
            className="mb-2 block text-[17px] font-bold"
          >
            Họ và tên{" "}
            <span aria-hidden="true" className="text-brand-red">
              *
            </span>
          </label>
          <input
            id={ids.name}
            name="hoTen"
            type="text"
            autoComplete="name"
            placeholder="Nhập họ và tên"
            required
            maxLength={80}
            aria-invalid={errors.name || undefined}
            aria-describedby={ids.nameErr}
            onInput={(e) =>
              e.currentTarget.value.trim().length >= 2 &&
              setErrors((v) => ({ ...v, name: false }))
            }
            className={inputClassName}
          />
          <p id={ids.nameErr} hidden={!errors.name} className={errorClassName}>
            Vui lòng nhập họ và tên.
          </p>
        </div>
        <div data-half-width className="mb-4">
          <label
            htmlFor={ids.phone}
            className="mb-2 block text-[17px] font-bold"
          >
            Số điện thoại{" "}
            <span aria-hidden="true" className="text-brand-red">
              *
            </span>
          </label>
          <input
            id={ids.phone}
            name="soDienThoai"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Ví dụ: 0911 739 119"
            required
            maxLength={16}
            aria-invalid={errors.phone || undefined}
            aria-describedby={ids.phoneErr}
            onInput={(e) =>
              normalizeVietnamesePhone(e.currentTarget.value) &&
              setErrors((v) => ({ ...v, phone: false }))
            }
            className={inputClassName}
          />
          <p
            id={ids.phoneErr}
            hidden={!errors.phone}
            className={errorClassName}
          >
            Số điện thoại chưa đúng (10–11 số, bắt đầu bằng 0).
          </p>
        </div>

        <TrainingClassRadioFieldset
          errorId={ids.classErr}
          invalid={!!errors.trainingClass}
          onChange={() => setErrors((v) => ({ ...v, trainingClass: false }))}
        />

        <ConsultationSubmitFooter busy={busy} status={status} />
      </form>
    </div>
  );
}
