import { cn } from "@/lib/utils";
import { contact } from "@/shared/config/contact";
import {
  admissionRequiredDocuments,
  admissionWalkInLocations,
} from "../data/admission-required-documents";
import { AdmissionCardsAutoDemoActivator } from "./admission-cards-auto-demo-activator";
import { AdmissionDocumentIllustration } from "./admission-document-illustration";
import styles from "./admission-document-illustrations.module.css";
import {
  TrainingProcessSectionHead,
  trainingProcessSectionClassName,
} from "./training-process-shared-typography";

/** Bước 1 (V2 `#tuyen-sinh`): 7 thẻ giấy tờ, 4 cột · ≤1100px 2 cột · ≤640px 1 cột. */
export function AdmissionRequiredDocumentsSection() {
  return (
    <section
      id="tuyen-sinh"
      aria-labelledby="admission-title"
      className={trainingProcessSectionClassName}
    >
      <AdmissionCardsAutoDemoActivator />
      <div className="container-site">
        <TrainingProcessSectionHead
          eyebrow="Bước 01"
          titleId="admission-title"
          title={
            <>
              Tuyển sinh và chuẩn bị <em>hồ sơ</em>
            </>
          }
          description="Học viên chuẩn bị thông tin cá nhân, giấy tờ theo yêu cầu và hoàn tất học phí để được xác nhận nhập học trước khi bắt đầu chương trình đào tạo."
        />
        <div className="grid grid-cols-1 gap-5 min-[641px]:grid-cols-2 xl:grid-cols-4">
          {admissionRequiredDocuments.map((document, position) => (
            <article
              key={document.index}
              data-reveal
              data-admission-auto-demo={document.autoDemo || undefined}
              className={cn(
                styles.card,
                "min-w-0 rounded-[22px] border border-[#dbe3f0] bg-white shadow-[0_10px_26px_rgba(10,19,48,0.07)]",
                "hover:shadow-hp-md hover:-translate-y-1 hover:border-[#b8c5db]",
              )}
            >
              <AdmissionDocumentIllustration
                illustration={document.illustration}
                position={position}
              />
              <div className="px-5 pt-[18px] pb-[22px]">
                <span className="font-display text-primary bg-primary-50 inline-flex min-h-[30px] min-w-10 items-center justify-center rounded-full text-[15px] font-extrabold">
                  {document.index}
                </span>
                <h3 className="font-display text-ink mt-3 mb-2 text-[20px] leading-[1.25] font-extrabold">
                  {document.title}
                </h3>
                {document.description ? (
                  <p className="text-[16px] leading-[1.6] text-[#334155]">
                    {document.description}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1 1 18 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

/** Khối navy "Bạn đã chuẩn bị đủ hồ sơ?" (V2 `.admission-cta`, kéo lên đè 34px vào cuối Bước 1). */
export function AdmissionRegistrationCallToAction() {
  return (
    <aside
      aria-labelledby="admission-cta-title"
      data-reveal
      className="relative -mt-5 min-[761px]:-mt-[34px]"
    >
      <div className="container-site">
        <div
          className={cn(
            "relative isolate grid grid-cols-1 gap-[26px] overflow-hidden rounded-[20px] border border-white/8 px-5 py-[26px] min-[761px]:gap-[clamp(30px,4vw,58px)] min-[761px]:rounded-[30px] min-[761px]:p-[clamp(34px,4vw,52px)] xl:grid-cols-[minmax(300px,0.76fr)_minmax(0,1.24fr)]",
            "bg-[radial-gradient(circle_at_4%_5%,rgba(75,124,255,0.34),transparent_31%),linear-gradient(135deg,#091733_0%,#10275b_58%,#15346f_100%)]",
            "shadow-[0_28px_64px_rgba(10,23,53,0.25)]",
            // Chấm lưới mờ dần sang phải (V2 `::before`).
            "before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(rgba(255,255,255,0.13)_0.8px,transparent_0.8px)] before:[mask-image:linear-gradient(90deg,#000,transparent_55%)] before:bg-[size:22px_22px] before:opacity-[0.18] before:content-['']",
          )}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-[80px] -bottom-[120px] -z-10 size-[310px] rounded-full bg-[rgba(71,116,255,0.28)] blur-[18px]"
          />
          <div className="relative self-center pl-4 before:absolute before:top-[3px] before:bottom-[3px] before:left-0 before:w-[3px] before:rounded-full before:bg-[linear-gradient(180deg,#dc2626,rgba(220,38,38,0))] before:content-[''] min-[761px]:pl-5">
            <p className="font-display text-emphasis-yellow mb-3 text-[15px] font-extrabold tracking-[0.06em] uppercase">
              Bắt đầu khóa học
            </p>
            <h2
              id="admission-cta-title"
              className="font-display text-[clamp(28px,2.8vw,40px)] leading-[1.08] font-bold tracking-[-0.015em] text-white"
            >
              Bạn đã chuẩn bị đủ hồ sơ?
            </h2>
            <p className="mt-[15px] mb-[22px] text-[17px] leading-[1.75] text-[#dbe4f5]">
              Đăng ký trực tuyến hoặc đến trực tiếp cơ sở gần bạn để được tư vấn
              và hoàn tất thủ tục nhập học.
            </p>
            <a
              href={contact.registerUrl}
              className="font-display inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-xl border border-[#dc2626] bg-[#dc2626] px-5 text-[17px] font-bold text-white shadow-[0_12px_28px_rgba(220,38,38,0.3)] transition-colors hover:border-[#b91c1c] hover:bg-[#b91c1c] focus-visible:border-[#b91c1c] focus-visible:bg-[#b91c1c] min-[641px]:w-auto"
            >
              Đăng ký ngay
              <ArrowRightIcon />
            </a>
          </div>

          <article className="relative grid grid-cols-[46px_minmax(0,1fr)] gap-3.5 rounded-[22px] border border-white/16 bg-[linear-gradient(145deg,rgba(255,255,255,0.13),rgba(255,255,255,0.075))] p-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] min-[761px]:p-[clamp(26px,3vw,36px)]">
            <span className="flex size-[46px] items-center justify-center rounded-[15px] border border-white/10 bg-white/14 text-[#c5d4ff]">
              <MapPinIcon />
            </span>
            <div>
              <span className="text-emphasis-yellow mb-[9px] block text-[15px] font-extrabold tracking-[0.06em] uppercase">
                Đăng ký tại cơ sở
              </span>
              <h3 className="font-display mb-[18px] text-[22px] leading-[1.3] font-bold">
                Đăng ký trực tiếp
              </h3>
              <ul className="grid gap-3">
                {admissionWalkInLocations.map((location, index) => (
                  <li
                    key={location.label}
                    className={cn(
                      "text-[16px] leading-[1.65] text-[#dbe4f5]",
                      index < admissionWalkInLocations.length - 1 &&
                        "border-b border-white/10 pb-3",
                    )}
                  >
                    <strong className="font-bold text-white">
                      {location.label}:
                    </strong>{" "}
                    {location.address}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </div>
    </aside>
  );
}
