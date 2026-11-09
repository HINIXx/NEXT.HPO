"use client";

import { useEffect, useState } from "react";
import { contact } from "@/shared/config/contact";
import {
  ChevronUpIcon,
  PhoneSolidIcon,
  UserPlusIcon,
} from "./site-shell-svg-icons";

const actionClass =
  "flex h-12 flex-1 items-center justify-center gap-2 rounded-xl font-display text-[15px] leading-none font-bold sm:size-[46px] sm:flex-none sm:rounded-full sm:text-white sm:shadow-hp-lg sm:transition sm:hover:-translate-y-[3px] sm:hover:scale-[1.06] min-[1440px]:size-[54px]";
const iconClass = "size-5 shrink-0 min-[1440px]:size-[22px]";

export function SiteFloatingQuickActions() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const sync = () => {
      frame = 0;
      setIsScrolled(window.scrollY > window.innerHeight * 2);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(sync);
    };
    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      role="group"
      aria-label="Hỗ trợ nhanh"
      className="fixed inset-x-0 bottom-0 z-[90] flex flex-row items-center gap-2 border-t border-[#e2e8f0] bg-white px-3 pt-2 pb-[calc(8px+env(safe-area-inset-bottom,0px))] shadow-[0_-8px_24px_rgba(10,19,48,0.08)] min-[1440px]:right-6 min-[1440px]:bottom-6 min-[1440px]:gap-3 sm:right-3 sm:bottom-4 sm:left-auto sm:flex-col sm:gap-2.5 sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none"
    >
      {isScrolled && (
        <button
          type="button"
          title="Lên đầu trang"
          aria-label="Lên đầu trang"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="sm:text-primary-hover hidden sm:flex sm:size-10 sm:items-center sm:justify-center sm:rounded-full sm:border sm:border-[#dbe3f3] sm:bg-white sm:shadow-[0_4px_14px_rgba(10,19,48,0.12)] sm:transition sm:hover:-translate-y-[3px] sm:hover:scale-[1.06]"
        >
          <ChevronUpIcon className="size-[18px]" />
        </button>
      )}
      <a
        href={contact.hotlineHref}
        title="Gọi ngay"
        className={`${actionClass} bg-header-tint text-primary-hover sm:bg-primary 2xl:hidden`}
      >
        <PhoneSolidIcon className={iconClass} />
        <span className="sm:sr-only">Gọi tư vấn</span>
      </a>
      <a
        href={contact.registerUrl}
        title="Đăng ký học"
        className={`${actionClass} bg-brand-red-deep text-white sm:hidden`}
      >
        <UserPlusIcon className={iconClass} />
        <span className="sm:sr-only">Đăng ký học</span>
      </a>
    </div>
  );
}
