"use client";

import Image from "next/image";
import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { contact } from "@/shared/config/contact";
import {
  platformPracticeItems as practiceItems,
  platformTheoryItems as theoryItems,
  type PlatformFeatureItem as FeatureItem,
} from "../data/digital-platform-feature-items";

/** Danh sách mở/đóng + ảnh đổi theo mục đang mở (V2 `.platform-acc` + homepage.js). Mặc định mở mục đầu. */
function FeatureAccordionWithVisual({
  items,
  tone,
}: {
  items: readonly FeatureItem[];
  tone: "theory" | "practice";
}) {
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();
  const shown = items[openIndex] ?? items[0];
  const accent = tone === "theory" ? "bg-ink" : "bg-[#c2410c]";
  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-7">
      <div className="grid gap-3.5">
        {items.map((item, index) => {
          const open = index === openIndex;
          return (
            <div
              key={item.label}
              className={cn(
                "overflow-hidden rounded-xl border bg-white transition-shadow",
                open
                  ? "border-[#cfd9ee] shadow-[0_14px_30px_-22px_rgba(30,58,138,0.6)]"
                  : "border-[#e2e8f5]",
              )}
            >
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`${baseId}-${index}`}
                onClick={() => setOpenIndex(open ? -1 : index)}
                className={cn(
                  "flex min-h-[58px] w-full items-center justify-between gap-3 px-5 py-3 text-left text-[17px] font-bold",
                  open ? "bg-[#eef3ff] text-[#1e3a8a]" : "text-[#1e3a8a]",
                )}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-7 flex-none place-items-center rounded-md text-[18px] leading-none font-bold text-white",
                    open
                      ? accent
                      : tone === "theory"
                        ? "bg-primary"
                        : "bg-[#c2410c]",
                  )}
                >
                  {open ? "−" : "+"}
                </span>
              </button>
              <div
                id={`${baseId}-${index}`}
                hidden={!open}
                className="text-ink px-5 pt-3 pb-5 text-[17px] leading-[1.6]"
              >
                {item.body}
              </div>
            </div>
          );
        })}
      </div>
      <figure className="overflow-hidden rounded-2xl border border-[#dce5ff] bg-[linear-gradient(180deg,#eef3ff,#e2eaff)]">
        <Image
          key={shown.image.src}
          src={shown.image.src}
          alt={shown.image.alt}
          width={shown.image.width}
          height={shown.image.height}
          loading="lazy"
          sizes="(min-width: 901px) 35vw, 100vw"
          className="aspect-[1.45/1] w-full object-contain p-4"
        />
        {tone === "practice" ? (
          <figcaption className="text-ink pb-3 text-center text-[16px] font-bold">
            {shown.image.caption}
          </figcaption>
        ) : null}
      </figure>
    </div>
  );
}

function PanelHead({
  number,
  label,
  title,
  tone,
  children,
}: {
  number: string;
  label: string;
  title: string;
  tone: "theory" | "practice";
  children: ReactNode;
}) {
  return (
    <header className="mb-6 border-b border-[#e2e8f5] pb-6">
      <span className="flex items-center gap-3">
        <span
          className={cn(
            "font-display grid size-12 place-items-center rounded-xl text-[24px] font-extrabold text-white",
            tone === "theory" ? "bg-primary" : "bg-[#c2410c]",
          )}
        >
          {number}
        </span>
        <span
          className={cn(
            "font-display text-[clamp(24px,2.4vw,32px)] font-extrabold tracking-[0.06em] uppercase",
            tone === "theory" ? "text-[#1e3a8a]" : "text-[#c2410c]",
          )}
        >
          {label}
        </span>
      </span>
      <h3 className="font-display text-ink mt-3 text-[clamp(22px,2vw,28px)] leading-[1.25] font-extrabold">
        {title}
      </h3>
      <div className="mt-2 text-[17px] leading-[1.6] text-[#334155]">
        {children}
      </div>
    </header>
  );
}

/**
 * "ĐÀO TẠO LÁI XE TRÊN NỀN TẢNG SỐ" (V2 `.platform-v2`): nút tải app, panel 01 Lý thuyết (xác thực khuôn mặt, đa nền tảng +
 * danh mục môn học `curriculum` dùng chung) và panel 02 Thực hành (sa hình, DAT). Ngưỡng 70% / 50% nhấn đỏ.
 */
export function DigitalPlatformTrainingPanelsSection({
  curriculum,
}: {
  curriculum: ReactNode;
}) {
  return (
    <section
      aria-labelledby="platform-v2-title"
      className="bg-[linear-gradient(180deg,#fff_0%,#f4f7ff_100%)] px-4 py-14 sm:py-[72px]"
    >
      <div className="mx-auto max-w-[1240px] sm:px-7">
        <header
          data-reveal
          className="flex flex-col items-center gap-3 text-center before:h-1 before:w-16 before:rounded-full before:bg-[linear-gradient(90deg,#2b26fb,#faec1a)] before:content-['']"
        >
          <h2 id="platform-v2-title" className="section-title-hp uppercase">
            Đào tạo lái xe trên nền tảng số
          </h2>
        </header>
        <div data-reveal className="mt-3 mb-10 text-center">
          <p className="text-[17px] text-[#dc2626] italic">
            Tải ứng dụng học đa nền tảng
          </p>
          <div className="mt-3 flex justify-center gap-3">
            <a
              href={contact.googlePlayUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Tải trên Google Play"
            >
              <Image
                src="/assets/images/CHPlay.png"
                alt="Tải trên Google Play"
                width={180}
                height={53}
                className="h-12 w-auto"
              />
            </a>
            <a
              href={contact.appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Tải trên App Store"
            >
              <Image
                src="/assets/images/AppStore.png"
                alt="Tải trên App Store"
                width={180}
                height={53}
                className="h-12 w-auto"
              />
            </a>
          </div>
        </div>

        <div className="grid gap-8">
          <article className="border-t-primary rounded-[22px] border border-t-4 border-[#e2e8f5] bg-white p-5 shadow-[0_24px_50px_-40px_rgba(10,19,48,0.6)] sm:p-8">
            <PanelHead
              number="01"
              label="Lý thuyết"
              title="Học lý thuyết trên nền tảng số"
              tone="theory"
            >
              <p>
                Người học hoàn thành nội dung, chương trình, ghi nhận thời gian
                học thực bằng xác thực khuôn mặt. Hệ thống ghi nhận quá trình
                hoàn tất đầy đủ nội dung và thời gian thực của người học.
              </p>
              <p className="border-primary bg-primary-50 mt-3 max-w-[700px] rounded-r-xl border-l-4 px-4 py-3">
                Người học lái xe được kiểm tra để xét hoàn thành khóa đào tạo
                khi tham dự{" "}
                <strong className="text-[#1e3a8a]">tối thiểu 70%</strong> thời
                gian học nội dung đào tạo lý thuyết;
              </p>
            </PanelHead>
            <FeatureAccordionWithVisual items={theoryItems} tone="theory" />
            {curriculum}
          </article>

          <article className="rounded-[22px] border border-t-4 border-[#e2e8f5] border-t-[#ea580c] bg-white p-5 shadow-[0_24px_50px_-40px_rgba(10,19,48,0.6)] sm:p-8">
            <PanelHead
              number="02"
              label="Thực hành"
              title="Rèn kỹ năng lái xe thực hành môi trường ảo"
              tone="practice"
            >
              <p>
                Người học lái xe được kiểm tra để xét hoàn thành khóa đào tạo
                khi
              </p>
              <ul className="mt-3 max-w-[760px] rounded-xl border border-[#fed7aa] bg-[#fff7ed] px-5 py-3">
                <li>
                  Tham dự{" "}
                  <strong className="text-[#b91c1c]">đủ thời gian</strong> và{" "}
                  <strong className="text-[#b91c1c]">
                    tối thiểu 50% quãng đường
                  </strong>{" "}
                  học thực hành lái xe trên sân tập lái;
                </li>
                <li>
                  Tham dự{" "}
                  <strong className="text-[#b91c1c]">đủ quãng đường</strong> và{" "}
                  <strong className="text-[#b91c1c]">
                    tối thiểu 50% thời gian
                  </strong>{" "}
                  học thực hành lái xe trên đường (DAT)
                </li>
              </ul>
            </PanelHead>
            <FeatureAccordionWithVisual items={practiceItems} tone="practice" />
          </article>
        </div>
      </div>
    </section>
  );
}
