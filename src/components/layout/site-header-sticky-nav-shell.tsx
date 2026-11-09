"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Island nhỏ: thẻ <nav> dính trên cùng, đổi nền đậm hơn + viền dưới khi đã cuộn > 16px (V2 core.js).
 * Nội dung bên trong (logo, menu, nút) vẫn là Server Component truyền qua `children`.
 * Lớp mờ tối phủ nội dung khi rê chuột vào mục có danh sách xổ xuống (V2 `.nav::after`).
 */
export function SiteHeaderStickyNavShell({
  children,
}: {
  children: ReactNode;
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const sync = () => setIsScrolled(window.scrollY > 16);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);

  return (
    <nav
      id="navbar"
      aria-label="Menu chính"
      data-scrolled={isScrolled}
      className="data-[scrolled=true]:border-line sticky top-0 z-[100] border-b border-transparent bg-white/86 backdrop-blur-[20px] transition-[background-color,border-color] duration-300 after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:-z-10 after:h-screen after:bg-[rgba(10,19,48,0.45)] after:opacity-0 after:backdrop-blur-[2px] after:transition-opacity after:duration-300 after:content-[''] has-[[data-nav-dropdown]:hover]:after:opacity-100 data-[scrolled=true]:bg-white/96"
    >
      {children}
    </nav>
  );
}
