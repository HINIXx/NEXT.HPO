import Image from "next/image";
import Link from "next/link";
import { contact, locations, socialLinks } from "@/shared/config/contact";
import { privacyPolicyLink } from "@/shared/config/navigation";
import { SiteBrandLogoLink } from "./site-brand-logo-link";
import {
  MailIcon,
  MapPinIcon,
  PhoneOutlineIcon,
  SocialIcon,
} from "./site-shell-svg-icons";

const contactItemClass =
  "flex items-start gap-3 text-[15px] leading-[1.6] max-sm:text-[14.5px]";
const contactIconClass =
  "flex size-7 shrink-0 items-center justify-center rounded-[9px] bg-white/12 text-white";
const headingClass =
  "mb-3.5 font-display text-[15px] font-bold tracking-[0.1em] text-white uppercase";

export function SiteFooter() {
  return (
    <footer
      id="lien-he"
      className="bg-ink relative overflow-hidden pt-10 pb-[22px] text-white/86 before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-[linear-gradient(90deg,#2b26fb,#faec1a)] before:content-['']"
    >
      <div className="container-site">
        <div className="mb-[18px] grid gap-9 border-b border-white/8 pb-[34px] md:gap-[34px] lg:grid-cols-2 xl:grid-cols-[1.5fr_1fr_.9fr_1.25fr]">
          <div>
            <SiteBrandLogoLink variant="white" className="h-[82px] w-fit" />
            <p className="mt-3.5 mb-4 max-w-[360px] text-[15px] leading-[1.6] text-pretty max-sm:text-[14.5px]">
              {contact.companyName}
              <br />
              GCNKD số {contact.businessRegistration.number}, do{" "}
              {contact.businessRegistration.issuer}
              <br />
              cấp lần đầu ngày {contact.businessRegistration.firstIssuedOn}.
            </p>
            <div className="mb-4 flex flex-col gap-[9px]">
              <div className={contactItemClass}>
                <span className={contactIconClass}>
                  <MapPinIcon className="size-3.5" />
                </span>
                <span>{contact.fullAddress}</span>
              </div>
              <div className={contactItemClass}>
                <span className={contactIconClass}>
                  <PhoneOutlineIcon className="size-3.5" />
                </span>
                <a
                  href={contact.hotlineHref}
                  className="hover:text-brand-yellow transition-colors"
                >
                  {contact.hotline}
                </a>
              </div>
              <div className={contactItemClass}>
                <span className={contactIconClass}>
                  <MailIcon className="size-3.5" />
                </span>
                <a
                  href={contact.emailHref}
                  className="hover:text-brand-yellow transition-colors"
                >
                  {contact.email}
                </a>
              </div>
            </div>
            <div className="mt-1.5 flex gap-2.5">
              {socialLinks.map((link) => (
                <a
                  key={link.network}
                  href={link.href}
                  target="_blank"
                  rel="noopener"
                  aria-label={link.label}
                  className="rounded-control hover:bg-brand-blue flex size-9 items-center justify-center bg-white/12 text-white transition duration-200 hover:-translate-y-0.5"
                >
                  <SocialIcon network={link.network} className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className={headingClass}>Cơ sở</h2>
            {locations.map((location, index) => (
              <div
                key={location.name}
                className={`py-[11px] ${index === 0 ? "pt-0" : "border-t border-white/8"}`}
              >
                <strong className="font-display text-brand-yellow mb-1 block text-[13px] font-semibold tracking-[0.1em] uppercase">
                  {location.name}
                </strong>
                <p className="text-[14px] leading-[1.5]">{location.address}</p>
                <a
                  href={location.phoneHref}
                  className="hover:text-brand-yellow text-[14px] transition-colors"
                >
                  {location.phone}
                </a>
              </div>
            ))}
          </div>

          <div>
            <h2 className={headingClass}>Tải ứng dụng</h2>
            <p className="mb-3 text-[15px] leading-[1.6] max-sm:text-[14.5px]">
              Trải nghiệm ngay trên Hiệp Phát Edu.
            </p>
            <div className="flex flex-col gap-[9px]">
              <a
                href={contact.googlePlayUrl}
                target="_blank"
                rel="noopener"
                aria-label="Tải Hiệp Phát Edu trên Google Play"
                className="inline-flex w-fit rounded-lg transition hover:-translate-y-0.5"
              >
                <Image
                  src="/assets/images/CHPlay.png"
                  alt="Tải trên Google Play"
                  width={959}
                  height={287}
                  loading="lazy"
                  className="h-auto max-h-[42px] w-[142px] object-contain"
                />
              </a>
              <a
                href={contact.appStoreUrl}
                target="_blank"
                rel="noopener"
                aria-label="Tải Hiệp Phát Edu trên App Store"
                className="inline-flex w-fit rounded-lg transition hover:-translate-y-0.5"
              >
                <Image
                  src="/assets/images/AppStore.png"
                  alt="Tải trên App Store"
                  width={959}
                  height={285}
                  loading="lazy"
                  className="h-auto max-h-[42px] w-[142px] object-contain"
                />
              </a>
            </div>
          </div>

          <div>
            <h2 className={headingClass}>Bản đồ</h2>
            <div className="rounded-control h-[138px] overflow-hidden border border-white/10 bg-white/5">
              <iframe
                title="Bản đồ Công ty TNHH Ô Tô Hiệp Phát"
                src={contact.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="block size-full border-0"
              />
            </div>
            <a
              href={contact.governmentNoticeUrl}
              target="_blank"
              rel="noopener"
              aria-label="Thông tin website Hiệp Phát trên Bộ Công Thương"
              className="mt-3 inline-flex rounded-lg transition hover:-translate-y-0.5"
            >
              <Image
                src={contact.governmentBadgeSrc}
                alt="Đã thông báo Bộ Công Thương"
                width={600}
                height={227}
                loading="lazy"
                className="h-auto w-[214px] max-w-full"
              />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 text-[13px] text-white/70 md:flex-row md:items-center md:justify-between">
          <p>© 2025 Công Ty TNHH Ô Tô Hiệp Phát. Tất cả quyền được bảo lưu.</p>
          <p>
            <Link
              href={privacyPolicyLink.href}
              className="transition-colors hover:text-white"
            >
              {privacyPolicyLink.label}
            </Link>
          </p>
          <p className="leading-[1.55] md:text-right">
            GCNKD: {contact.businessRegistration.number} — Cấp ngày{" "}
            {contact.businessRegistration.firstIssuedOn}
            <br />
            {contact.businessRegistration.issuerLong}
          </p>
        </div>
      </div>
    </footer>
  );
}
