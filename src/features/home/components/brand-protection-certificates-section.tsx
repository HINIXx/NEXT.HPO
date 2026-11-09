"use client";

import Image from "next/image";
import { useState } from "react";
import { PhotoGalleryFullscreenLightboxDialog } from "@/features/about-centers/components/photo-gallery-fullscreen-lightbox-dialog";
import { cn } from "@/lib/utils";
import { brandCertificates } from "../data/brand-protection-certificates";

/** Ảnh trong hộp xem lớn theo thứ tự V2 (data-img-idx). */
const lightboxPhotos = [...brandCertificates]
  .sort((a, b) => a.lightboxIndex - b.lightboxIndex)
  .map((certificate) => ({ src: certificate.src, alt: certificate.alt }));

/**
 * "THƯƠNG HIỆU" (V2 `#so-huu-tri-tue` + homepage-brand-certificates.css): 5 thẻ văn bằng (3 + 2 căn giữa ở ≥1101px),
 * nhãn loại + số thứ tự, bấm ảnh → hộp xem ảnh lớn (←/→ qua 5 văn bằng). Chữ mô tả/thông tin nâng 17/15px theo "to, rõ".
 */
export function BrandProtectionCertificatesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="so-huu-tri-tue"
      aria-labelledby="brand-protection-title"
      className="bg-[linear-gradient(180deg,#eef4ff_0%,#f8faff_100%)] px-4 py-14 sm:py-[57px]"
    >
      <div className="mx-auto max-w-[1240px] sm:px-7">
        <header
          data-reveal
          className="mx-auto mb-7 flex max-w-[860px] flex-col items-center gap-3 pt-5 text-center before:h-1 before:w-16 before:rounded-full before:bg-[linear-gradient(90deg,#2b26fb,#faec1a)] before:content-['']"
        >
          <h2
            id="brand-protection-title"
            className="section-title-hp uppercase"
          >
            Thương hiệu
          </h2>
          <p className="text-[17px] leading-[1.55] font-semibold text-[#334155]">
            Các tài sản trí tuệ của hệ thống HPO đã được cơ quan nhà nước có
            thẩm quyền cấp văn bằng bảo hộ
          </p>
        </header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-6 xl:gap-7">
          {brandCertificates.map((certificate, index) => (
            <article
              key={certificate.number}
              data-reveal
              className={cn(
                "flex flex-col overflow-hidden rounded-[22px] border border-[#e6ebf5] bg-white shadow-[0_24px_50px_-36px_rgba(10,19,48,0.5)] xl:col-span-2",
                index === 3 && "xl:col-start-2",
              )}
            >
              <button
                type="button"
                aria-haspopup="dialog"
                aria-label={certificate.zoomLabel}
                onClick={() => setOpenIndex(certificate.lightboxIndex)}
                className="group relative grid h-[240px] place-items-center overflow-hidden bg-[#f7f9ff] bg-[linear-gradient(rgba(43,38,251,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(43,38,251,0.05)_1px,transparent_1px)] bg-[size:18px_18px] px-10 pt-12 pb-6 sm:h-[281px]"
              >
                <span className="absolute top-4 left-4 z-[1] inline-flex items-center gap-1.5 rounded-full bg-white/92 py-1.5 pr-3 pl-2 text-[14px] leading-none font-bold tracking-[0.06em] text-[#1e3a8a] uppercase shadow-[0_4px_12px_rgba(10,19,48,0.08)]">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="size-4 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
                  >
                    {certificate.tagIcon}
                  </svg>
                  {certificate.tag}
                </span>
                <span
                  aria-hidden="true"
                  className="font-display text-primary absolute top-2.5 right-4 text-[40px] leading-none font-black tracking-[-0.04em]"
                >
                  {certificate.number}
                </span>
                <Image
                  src={certificate.src}
                  alt={certificate.alt}
                  width={certificate.width}
                  height={certificate.height}
                  loading="lazy"
                  sizes="(min-width: 1101px) 300px, 80vw"
                  className="max-h-full w-auto rounded bg-white object-contain shadow-[0_2px_4px_rgba(10,19,48,0.08),0_18px_34px_-16px_rgba(10,19,48,0.45)] transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <span
                  aria-hidden="true"
                  className="bg-brand-blue absolute right-3.5 bottom-3.5 rounded-full px-3 py-[7px] text-[14px] font-semibold text-white shadow-[0_8px_18px_-8px_rgba(43,38,251,0.8)]"
                >
                  Xem ảnh
                </span>
              </button>
              <div className="flex flex-1 flex-col gap-2.5 px-[22px] pt-5 pb-[22px]">
                <h3 className="font-display text-ink text-[19px] leading-[1.3] font-extrabold tracking-[-0.01em]">
                  {certificate.title}
                </h3>
                <p className="text-[17px] leading-[1.55] text-[#334155]">
                  {certificate.description}
                </p>
                <dl className="mt-auto grid gap-[7px] border-t border-dashed border-[#e6ebf5] pt-3">
                  {certificate.facts.map(([term, value]) => (
                    <div
                      key={term}
                      className="flex justify-between gap-3 text-[15px] leading-[1.4]"
                    >
                      <dt className="text-[#64748b]">{term}</dt>
                      <dd className="text-ink text-right font-bold">{value}</dd>
                    </div>
                  ))}
                </dl>
                {certificate.link ? (
                  <a
                    href={certificate.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary-50 text-brand-blue mt-1 inline-flex min-h-11 w-fit items-center gap-1 rounded-full px-4 text-[15px] font-bold"
                  >
                    {certificate.link.text} <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
      <PhotoGalleryFullscreenLightboxDialog
        photos={lightboxPhotos}
        openIndex={openIndex}
        onIndexChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </section>
  );
}
