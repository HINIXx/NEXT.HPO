import { contact, socialLinks } from "@/shared/config/contact";
import {
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneSolidIcon,
  SocialIcon,
} from "./site-shell-svg-icons";

const itemBaseClass =
  "items-center gap-[7px] [&>svg]:size-[13px] [&>svg]:text-primary-200";
const itemClass = `inline-flex ${itemBaseClass}`;
const linkClass = "transition-colors duration-200 hover:text-white";

/**
 * Thanh tối trên cùng (V2 .topbar): địa chỉ, giờ làm việc, tổng đài (vàng), email, mạng xã hội.
 * Ẩn ở ≤720px; giờ làm việc ẩn ở ≤1100px. Không dính (chỉ thanh menu bên dưới dính).
 */
export function SiteHeaderTopUtilityBar() {
  return (
    <div className="topbar bg-ink hidden text-[12.5px] leading-[1.55] tracking-[0.01em] text-white/78 md:block">
      <div className="w-full px-[22px] lg:px-7">
        <div className="flex items-center justify-between gap-6 py-2.5">
          <div className="flex items-center gap-6">
            <span className={itemClass}>
              <MapPinIcon />
              {contact.shortAddress}
            </span>
            <span className={`${itemBaseClass} hidden xl:inline-flex`}>
              <ClockIcon />
              {contact.openingHours}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href={contact.hotlineHref}
              className={`${itemClass} text-brand-yellow font-bold transition-colors duration-200 hover:text-white`}
            >
              <PhoneSolidIcon />
              Tổng đài: {contact.hotline}
            </a>
            <a href={contact.emailHref} className={`${itemClass} ${linkClass}`}>
              <MailIcon />
              {contact.email}
            </a>
            <div className="flex gap-3.5 border-l border-white/12 pl-[18px]">
              {socialLinks.map((link) => (
                <a
                  key={link.network}
                  href={link.href}
                  target="_blank"
                  rel="noopener"
                  aria-label={link.label}
                  className={`inline-flex ${linkClass}`}
                >
                  <SocialIcon network={link.network} className="size-[13px]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
