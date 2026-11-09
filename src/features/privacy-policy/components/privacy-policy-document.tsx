import { contact } from "@/shared/config/contact";
import { privacyPolicySections } from "../data/privacy-policy-sections";
import { PrivacyPolicyPendingContentMark } from "./privacy-policy-pending-content-mark";

/** Thẻ trắng viền xanh nhạt dùng cho Mục lục + nội dung (V2 `.cbm-policy__toc`, `.cbm-policy__content`). */
const panelClassName =
  "rounded-[14px] border border-[#dbe3f0] bg-white px-4 py-5 shadow-[0_8px_24px_rgba(15,35,80,0.05)] sm:rounded-card sm:p-[clamp(20px,4vw,32px)]";

/**
 * Trang Chính sách bảo mật (V2 `chinh-sach-bao-mat/` + `assets/css/privacy-policy-page.css`):
 * tiêu đề giữa → Mục lục 2 cột (1 cột ≤600px) → các mục đánh số, khung rộng tối đa 760px.
 */
export function PrivacyPolicyDocument() {
  return (
    <div className="bg-slate-50 px-3 pt-[clamp(32px,5vw,64px)] pb-[72px] text-slate-800 sm:px-4">
      <header className="mx-auto mb-6 w-full max-w-[760px] text-center">
        <p className="text-primary mb-2.5 text-[15px] font-extrabold tracking-[0.06em] uppercase">
          {contact.companyName}
        </p>
        <h1 className="font-display text-ink text-[clamp(28px,4vw,40px)] leading-[1.2] font-extrabold">
          Chính sách bảo mật dữ liệu cá nhân
        </h1>
        <p className="mt-4 text-base text-slate-600">
          Ngày hiệu lực:{" "}
          <PrivacyPolicyPendingContentMark>
            ngày hiệu lực
          </PrivacyPolicyPendingContentMark>
        </p>
      </header>

      <div className="mx-auto grid w-full max-w-[760px] gap-7">
        <nav className={panelClassName} aria-label="Mục lục chính sách bảo mật">
          <h2 className="text-ink mb-3 text-[21px] leading-[1.3] font-bold">
            Mục lục
          </h2>
          <ol className="grid list-decimal pl-6 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-1">
            {privacyPolicySections.map((section) => (
              <li key={section.id} className="pl-0.5">
                <a
                  href={`#${section.id}`}
                  className="text-primary hover:text-ink flex min-h-11 items-center px-1 py-[5px] text-base leading-[1.35]"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article
          className={`${panelClassName} text-body leading-[1.7] [overflow-wrap:anywhere] [&_li]:mb-[7px] [&_p]:mb-3 [&_ul]:mt-2 [&_ul]:mb-3.5 [&_ul]:pl-6`}
        >
          {privacyPolicySections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`heading-${section.id}`}
              className="border-slate-200 [&+&]:mt-[30px] [&+&]:border-t [&+&]:pt-6"
            >
              <h2
                id={`heading-${section.id}`}
                className="text-ink mb-3 scroll-mt-[100px] text-[clamp(20px,2.5vw,24px)] leading-[1.35] font-extrabold"
              >
                {index + 1}. {section.title}
              </h2>
              {section.body}
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}
