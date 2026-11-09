import type { ReactNode } from "react";
import { SiteFloatingQuickActions } from "./site-floating-quick-actions";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function SiteShellHeaderMainFooter({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <a
        href="#main-content"
        className="focus:rounded-control focus:text-ink sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[300] focus:bg-white focus:px-4 focus:py-3"
      >
        Chuyển đến nội dung
      </a>
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
      <SiteFloatingQuickActions />
      <div
        aria-hidden
        className="h-[calc(64px+env(safe-area-inset-bottom,0px))] sm:hidden"
      />
    </>
  );
}
