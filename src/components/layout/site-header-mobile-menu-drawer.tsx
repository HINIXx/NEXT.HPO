"use client";

import { Dialog } from "radix-ui";
import Link from "next/link";
import { contact } from "@/shared/config/contact";
import {
  homeLink,
  isNavGroup,
  mobileExtraLink,
  primaryNavigation,
  type NavEntry,
  type NavGroup,
} from "@/shared/config/navigation";
import {
  ActiveRouteAwareLink,
  useIsAnyPathCurrent,
} from "./active-route-aware-link";
import { SiteBrandLogoLink } from "./site-brand-logo-link";
import {
  ArrowRightIcon,
  LoginIcon,
  PhoneSolidIcon,
} from "./site-shell-svg-icons";

/**
 * Island: nút ☰ (hiện ở ≤1350px) + ngăn kéo menu bên phải (V2 .mobile-menu).
 * Radix Dialog lo khóa cuộn trang, Esc, bẫy focus, trả focus về nút ☰.
 * Khác V2 có chủ đích: mục đang chọn dùng xanh header thay chữ cam (quy tắc: cam không làm màu chữ);
 * nút đóng 44px thay 40px (vùng bấm ≥44px).
 */
const linkClass = [
  "block rounded-control px-4 py-3.5 font-display text-[15px] font-semibold text-ink transition-colors duration-200",
  "hover:bg-surface hover:text-primary",
  "aria-[current=page]:bg-header-tint aria-[current=page]:text-header-blue aria-[current=page]:shadow-[inset_3px_0_0_var(--color-header-blue)]",
].join(" ");

const childLinkClass = [
  "group/child relative ml-4 block rounded-control font-display py-2.5 pr-4 pl-7 text-[14px] font-medium text-ink transition-colors duration-200",
  "hover:bg-surface hover:text-primary",
  "aria-[current=page]:bg-header-tint aria-[current=page]:font-semibold aria-[current=page]:text-header-blue",
  "before:absolute before:top-1/2 before:left-3 before:size-1.5 before:-translate-y-1/2 before:rounded-full before:bg-primary-200 before:content-['']",
  "hover:before:bg-decor-orange aria-[current=page]:before:bg-header-blue",
].join(" ");

const footButtonBase =
  "inline-flex items-center justify-center gap-2.5 rounded-full border-[1.5px] px-[26px] py-3.5 font-display text-[14px] font-semibold tracking-[0.01em] whitespace-nowrap transition [&>svg]:size-4";

function MobileMenuGroup({ entry }: { entry: NavGroup }) {
  const isActive = useIsAnyPathCurrent(entry.items.map((item) => item.href));
  return (
    <div className="py-1.5">
      <span
        className={`font-display block px-4 pt-2 pb-1.5 text-[15px] ${isActive ? "text-header-blue font-bold" : "text-ink font-semibold"}`}
      >
        {entry.label}
      </span>
      {entry.items.map((item) => (
        <Dialog.Close asChild key={item.href}>
          <ActiveRouteAwareLink href={item.href} className={childLinkClass}>
            {item.mobileLabel ?? item.label}
          </ActiveRouteAwareLink>
        </Dialog.Close>
      ))}
    </div>
  );
}

export function SiteHeaderMobileMenuDrawer() {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        aria-label="Mở menu"
        className="rounded-control border-line-strong hover:border-primary flex size-11 flex-col items-center justify-center gap-[5px] border bg-white transition-colors duration-200 min-[1351px]:hidden"
      >
        <span className="bg-ink block h-[1.8px] w-[18px] rounded-sm" />
        <span className="bg-ink block h-[1.8px] w-[18px] rounded-sm" />
        <span className="bg-ink block h-[1.8px] w-[18px] rounded-sm" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed inset-0 z-[200] bg-[rgba(10,19,48,0.6)] backdrop-blur-[8px]" />
        <Dialog.Content
          aria-describedby={undefined}
          className="ease-hp data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:animate-in data-[state=open]:slide-in-from-right fixed top-0 right-0 z-[200] flex h-full w-[min(90vw,380px)] flex-col overflow-y-auto bg-white px-6 pt-6 pb-8 duration-400"
        >
          <Dialog.Title className="sr-only">Menu</Dialog.Title>
          <div className="border-line mb-3 flex items-center justify-between border-b pb-[18px]">
            <SiteBrandLogoLink className="h-12 md:h-16" />
            <Dialog.Close
              aria-label="Đóng menu"
              className="rounded-control border-line-strong text-ink flex size-11 items-center justify-center border bg-white text-[22px]"
            >
              ×
            </Dialog.Close>
          </div>

          <nav aria-label="Menu" className="flex flex-col gap-0.5 py-2">
            <Dialog.Close asChild>
              <ActiveRouteAwareLink href={homeLink.href} className={linkClass}>
                {homeLink.mobileLabel}
              </ActiveRouteAwareLink>
            </Dialog.Close>
            {primaryNavigation.map((entry) => (
              <MobileMenuEntry key={entry.href + entry.label} entry={entry} />
            ))}
          </nav>

          <div className="border-line mt-auto flex flex-col gap-3 border-t pt-6">
            <a
              href={contact.hotlineHref}
              className={`${footButtonBase} border-line-strong text-ink hover:border-ink`}
            >
              <PhoneSolidIcon />
              {contact.hotline}
            </a>
            <a
              href={contact.registerUrl}
              className={`${footButtonBase} bg-primary shadow-hp-blue hover:bg-primary-hover border-transparent text-white hover:-translate-y-0.5`}
            >
              Đăng ký học
              <ArrowRightIcon className="shrink-0" />
            </a>
            <a
              href={contact.loginUrl}
              className="border-header-indigo-200 font-display text-header-blue-deep hover:border-header-blue hover:bg-header-tint hover:text-header-blue inline-flex h-12 items-center justify-center gap-2 rounded-full border-[1.5px] bg-white pr-[18px] pl-3.5 text-[15px] font-semibold transition-colors"
            >
              <LoginIcon className="size-5 shrink-0" />
              Đăng nhập
            </a>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function MobileMenuEntry({ entry }: { entry: NavEntry }) {
  if (isNavGroup(entry)) return <MobileMenuGroup entry={entry} />;
  return (
    <>
      {entry.href === mobileExtraLink.insertBefore && (
        <Dialog.Close asChild>
          <Link href={mobileExtraLink.href} className={linkClass}>
            {mobileExtraLink.label}
          </Link>
        </Dialog.Close>
      )}
      <Dialog.Close asChild>
        <ActiveRouteAwareLink href={entry.href} className={linkClass}>
          {entry.label}
        </ActiveRouteAwareLink>
      </Dialog.Close>
    </>
  );
}
