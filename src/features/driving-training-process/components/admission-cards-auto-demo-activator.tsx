"use client";

import { useEffect } from "react";

const START_DELAY_MS = 2200;
const STAGGER_MS = 650;
const ACTIVE_MS = 2200;
const GAP_MS = 4200;
const AFTER_INTERACTION_MS = 900;

/**
 * Tự chạy minh họa thẻ giấy tờ Bước 1 (V2 script.js `autoDemoCards`): khi thẻ `[data-admission-auto-demo]`
 * hiện ≥25% trên màn hình, lần lượt gắn `data-auto-active` 2,2s rồi nghỉ 4,2s. Dừng khi người dùng rê
 * chuột/focus vào thẻ, khi tab ẩn, hoặc khi bật "giảm chuyển động". Đặt 1 lần trong trang.
 */
export function AdmissionCardsAutoDemoActivator() {
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    )
      return;

    const cards = Array.from(
      document.querySelectorAll<HTMLElement>("[data-admission-auto-demo]"),
    );
    const cleanups: (() => void)[] = [];

    const controllers = cards.map((card, index) => {
      let isVisible = false;
      let startTimer: number | null = null;
      let finishTimer: number | null = null;

      const clearTimers = () => {
        if (startTimer !== null) window.clearTimeout(startTimer);
        if (finishTimer !== null) window.clearTimeout(finishTimer);
        startTimer = finishTimer = null;
      };
      const pause = () => {
        clearTimers();
        card.removeAttribute("data-auto-active");
      };
      const isInteracting = () =>
        card.matches(":hover") || card.contains(document.activeElement);

      const schedule = (delay: number) => {
        if (startTimer !== null || finishTimer !== null) return;
        if (document.hidden || !isVisible || isInteracting()) return;
        startTimer = window.setTimeout(run, delay);
      };
      function run() {
        startTimer = null;
        if (document.hidden || !isVisible || isInteracting()) {
          schedule(AFTER_INTERACTION_MS);
          return;
        }
        card.setAttribute("data-auto-active", "");
        finishTimer = window.setTimeout(() => {
          finishTimer = null;
          card.removeAttribute("data-auto-active");
          schedule(GAP_MS);
        }, ACTIVE_MS);
      }

      const resume = () => schedule(AFTER_INTERACTION_MS);
      const onFocusOut = (event: FocusEvent) => {
        if (!card.contains(event.relatedTarget as Node | null))
          window.setTimeout(resume, 0);
      };
      card.addEventListener("mouseenter", pause);
      card.addEventListener("mouseleave", resume);
      card.addEventListener("focusin", pause);
      card.addEventListener("focusout", onFocusOut);
      cleanups.push(() => {
        pause();
        card.removeEventListener("mouseenter", pause);
        card.removeEventListener("mouseleave", resume);
        card.removeEventListener("focusin", pause);
        card.removeEventListener("focusout", onFocusOut);
      });

      return {
        setVisible(next: boolean) {
          if (isVisible === next) return;
          isVisible = next;
          pause();
          if (isVisible) schedule(START_DELAY_MS + index * STAGGER_MS);
        },
        restart() {
          pause();
          schedule(START_DELAY_MS + index * STAGGER_MS);
        },
        pause,
      };
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          controllers[cards.indexOf(entry.target as HTMLElement)]?.setVisible(
            entry.isIntersecting && entry.intersectionRatio >= 0.25,
          );
        }
      },
      { threshold: [0, 0.25, 0.6] },
    );
    cards.forEach((card) => observer.observe(card));

    const onVisibilityChange = () =>
      controllers.forEach((controller) =>
        document.hidden ? controller.pause() : controller.restart(),
      );
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return null;
}
