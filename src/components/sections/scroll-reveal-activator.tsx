"use client";

import { useEffect } from "react";

/**
 * Bật hiệu ứng "hiện dần khi cuộn tới" cho mọi phần tử `[data-reveal]` trong trang (V2 script.js trang Giới thiệu).
 * Đặt 1 lần trong page. Server render nội dung đầy đủ; chỉ khi island này chạy mới gắn `data-reveal-ready`
 * lên <html> (CSS ở globals.css mới ẩn phần tử) → tắt JS hoặc giảm chuyển động vẫn thấy hết nội dung.
 */
export function ScrollRevealActivator() {
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    )
      return;

    const root = document.documentElement;
    const targets = document.querySelectorAll<HTMLElement>(
      "[data-reveal]:not([data-revealed])",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px" },
    );
    root.setAttribute("data-reveal-ready", "");
    targets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
      root.removeAttribute("data-reveal-ready");
    };
  }, []);

  return null;
}
