/*
 * Script chung cho trang xem học liệu tĩnh (public/assets/learning-views/*.html), thay HPOStickyScrollSpy + engine-media.js của V2.
 * - Mục đích: `#<id>` trên URL → cuộn tới mục đó; bấm tab bên trái → cuộn mượt tới mục.
 * - Mục đang xem → gắn `.is-active` cho tab + báo trang cha `{ type: "hpo-learning-view", activeId }` (đổi tiêu đề modal).
 * - Esc khi focus đang trong trang này → báo trang cha `{ type: "hpo-learning-view-close" }` để đóng modal.
 * - Video `data-video-src` (động cơ 4 kỳ, lỗi sa hình): chỉ tải/phát khi hiện trên màn hình, dừng khi khuất; tôn trọng "giảm chuyển động".
 */
(() => {
  const pairs = [
    ["data-hpo-tab", "data-hpo-pane"],
    ["data-sh-tab", "data-sh-pane"],
    ["data-shl-tab", "data-shl-pane"],
  ];
  const [tabAttr, paneAttr] =
    pairs.find(([tab]) => document.querySelector(`[${tab}]`)) || [];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const notify = (activeId) => {
    try {
      window.parent?.postMessage({ type: "hpo-learning-view", activeId }, window.location.origin);
    } catch (_) {
      /* không có trang cha */
    }
  };

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    try {
      window.parent?.postMessage({ type: "hpo-learning-view-close" }, window.location.origin);
    } catch (_) {
      /* không có trang cha */
    }
  });

  if (tabAttr) {
    const tabs = [...document.querySelectorAll(`[${tabAttr}]`)];
    const panes = [...document.querySelectorAll(`[${paneAttr}]`)];
    const setActive = (id) => {
      tabs.forEach((tab) => {
        const on = tab.getAttribute(tabAttr) === id;
        tab.classList.toggle("is-active", on);
        if (on) tab.setAttribute("aria-current", "true");
        else tab.removeAttribute("aria-current");
      });
      notify(id);
    };
    const goTo = (id, behavior) => {
      const pane = panes.find((p) => p.getAttribute(paneAttr) === id);
      if (!pane) return;
      pane.scrollIntoView({ behavior: reduceMotion ? "auto" : behavior, block: "start" });
      setActive(id);
    };
    tabs.forEach((tab) =>
      tab.addEventListener("click", (event) => {
        event.preventDefault();
        goTo(tab.getAttribute(tabAttr), "smooth");
      }),
    );
    // Mục đang xem: mục cuối cùng có mép trên đã qua 30% màn hình.
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const line = window.innerHeight * 0.3;
        let current = panes[0];
        for (const pane of panes) if (pane.getBoundingClientRect().top <= line) current = pane;
        if (current) {
          const id = current.getAttribute(paneAttr);
          if (!tabs.find((t) => t.classList.contains("is-active") && t.getAttribute(tabAttr) === id)) setActive(id);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const initial = decodeURIComponent(location.hash.slice(1));
    const start = panes.some((p) => p.getAttribute(paneAttr) === initial)
      ? initial
      : panes[0]?.getAttribute(paneAttr);
    // Chờ ảnh đầu tải để vị trí cuộn đúng.
    requestAnimationFrame(() => goTo(start, "auto"));
    window.addEventListener("load", () => goTo(start, "auto"), { once: true });
  }

  const videos = [...document.querySelectorAll("video[data-video-src], video[data-src]")];
  if (videos.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const { target: video, isIntersecting } of entries) {
          if (isIntersecting) {
            if (!video.getAttribute("src")) {
              video.src = video.dataset.videoSrc || video.dataset.src;
              video.load();
            }
            if (!reduceMotion) video.play().catch(() => {});
          } else if (!video.paused) {
            video.pause();
          }
        }
      },
      { threshold: 0.12 },
    );
    videos.forEach((video) => observer.observe(video));
  }
})();
