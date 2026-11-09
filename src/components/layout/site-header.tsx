import { contact } from "@/shared/config/contact";
import { SiteBrandLogoLink } from "./site-brand-logo-link";
import { SiteHeaderDesktopNavigation } from "./site-header-desktop-navigation";
import { SiteHeaderMobileMenuDrawer } from "./site-header-mobile-menu-drawer";
import { SiteHeaderStickyNavShell } from "./site-header-sticky-nav-shell";
import { SiteHeaderTopUtilityBar } from "./site-header-top-utility-bar";
import {
  ArrowRightIcon,
  LoginIcon,
  PhoneSolidIcon,
} from "./site-shell-svg-icons";

/**
 * Header dùng chung mọi trang (Server Component) — chuyển từ V2 assets/js/site-header.js.
 * Hàng menu (dính): logo · menu ngang (≥1351px) · tổng đài (≥1281px; chữ số ≥1600px) · Đăng nhập (≥761px)
 * · Đăng ký học (≥601px) · ☰ (≤1350px). Phần tương tác tách island: dính/cuộn + menu ☰.
 */
export function SiteHeader() {
  return (
    <>
      <SiteHeaderTopUtilityBar />
      <SiteHeaderStickyNavShell>
        <div className="w-full px-5 md:px-[22px] lg:px-7">
          <div className="flex items-center gap-3 py-2 sm:gap-7 sm:py-3.5 md:gap-3.5 2xl:gap-3">
            <SiteBrandLogoLink
              className="h-14 min-w-0 flex-[0_1_auto] sm:h-[70px] md:h-[106px] 2xl:h-[108px]"
              imageClassName="max-sm:max-w-full"
            />
            <SiteHeaderDesktopNavigation />
            <SiteHeaderActions />
          </div>
        </div>
      </SiteHeaderStickyNavShell>
    </>
  );
}

function SiteHeaderActions() {
  return (
    <div className="ml-auto flex flex-none items-center gap-4 max-[1720px]:gap-3 min-[1351px]:ml-0">
      <a
        href={contact.hotlineHref}
        className="group/phone before:bg-header-track-line relative hidden items-center gap-[11px] py-1 pr-0 pl-[18px] before:absolute before:top-2 before:bottom-2 before:left-0 before:w-px before:content-[''] max-[1720px]:pl-3.5 min-[1600px]:pr-2 2xl:inline-flex"
      >
        <span className="bg-header-tint text-header-blue after:animate-phone-ring group-hover/phone:bg-header-blue relative flex size-[38px] items-center justify-center rounded-full shadow-[inset_0_0_0_1px_var(--color-header-tint-line)] transition-colors duration-200 group-hover/phone:text-white after:absolute after:-inset-1 after:rounded-full after:border-[1.5px] after:border-[rgba(38,67,233,0.25)] after:content-['']">
          <PhoneSolidIcon className="size-3.5" />
        </span>
        {/* ≤1599px chỉ còn biểu tượng; chữ vẫn có cho trình đọc màn hình. */}
        <span className="sr-only flex-col leading-[1.15] min-[1600px]:not-sr-only min-[1600px]:flex">
          <small className="text-header-muted text-[10.5px] font-semibold tracking-[0.12em] uppercase">
            Tổng đài
          </small>
          <strong className="font-display text-header-navy group-hover/phone:text-header-blue text-[15.5px] font-bold tracking-[0.01em]">
            {contact.hotline}
          </strong>
        </span>
      </a>

      <a
        href={contact.loginUrl}
        className="border-header-indigo-200 font-display text-header-blue-deep hover:border-header-blue hover:bg-header-tint hover:text-header-blue hidden h-12 items-center gap-2 rounded-full border-[1.5px] bg-white pr-[18px] pl-3.5 text-[15px] font-semibold whitespace-nowrap transition-colors duration-200 max-[1660px]:h-11 max-[1660px]:pr-3.5 max-[1660px]:pl-3 max-[1660px]:text-[14px] min-[761px]:inline-flex min-[1351px]:max-[1400px]:gap-1.5 min-[1351px]:max-[1400px]:pr-3 min-[1351px]:max-[1400px]:pl-2.5"
      >
        <LoginIcon className="size-5 shrink-0" />
        Đăng nhập
      </a>

      <a
        href={contact.registerUrl}
        className="group/register font-display hidden h-12 items-center gap-3 rounded-full border-[1.5px] border-transparent bg-[linear-gradient(135deg,var(--color-header-blue-bright)_0%,var(--color-header-blue)_45%,var(--color-header-blue-deep)_100%)] pr-[7px] pl-[22px] text-[15px] font-semibold whitespace-nowrap text-white shadow-[0_10px_22px_-10px_rgba(38,67,233,0.75),inset_0_1px_0_rgba(255,255,255,0.2)] transition duration-200 hover:-translate-y-px hover:shadow-[0_14px_28px_-10px_rgba(38,67,233,0.85),inset_0_1px_0_rgba(255,255,255,0.2)] max-[1660px]:h-11 max-[1660px]:pl-[18px] max-[1660px]:text-[14px] min-[1351px]:max-[1400px]:gap-2 min-[1351px]:max-[1400px]:pl-3.5 sm:inline-flex"
      >
        Đăng ký học
        <ArrowRightIcon className="ease-hp size-[34px] shrink-0 rounded-full bg-white/18 p-[9px] transition duration-300 group-hover/register:translate-x-[3px] group-hover/register:bg-white/28 max-[1660px]:size-[30px] max-[1660px]:p-2" />
      </a>

      <SiteHeaderMobileMenuDrawer />
    </div>
  );
}
