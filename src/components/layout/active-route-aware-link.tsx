"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

/** Bỏ dấu `/` cuối để so khớp (usePathname có thể trả về có hoặc không có `/` cuối). */
const normalizePath = (path: string) =>
  path.length > 1 ? path.replace(/\/+$/, "") : path;

/**
 * Link tự gắn `aria-current="page"` khi đang ở đúng trang (hoặc một trong `matchPaths`).
 * Style trạng thái "đang chọn" viết bằng biến thể Tailwind `aria-[current=page]:…` ở nơi dùng.
 * Static export vẫn render sẵn trạng thái này vào HTML (pathname đã biết lúc build).
 */
export function ActiveRouteAwareLink({
  href,
  matchPaths,
  ...props
}: ComponentProps<typeof Link> & {
  href: string;
  matchPaths?: readonly string[];
}) {
  const pathname = normalizePath(usePathname() ?? "/");
  const isCurrent = (matchPaths ?? [href]).some(
    (path) => normalizePath(path) === pathname,
  );
  return (
    <Link
      href={href}
      aria-current={isCurrent ? "page" : undefined}
      {...props}
    />
  );
}

/** Nhãn nhóm (không phải link) đổi màu khi đang ở một trang con của nhóm — dùng trong menu ☰. */
export function useIsAnyPathCurrent(paths: readonly string[]): boolean {
  const pathname = normalizePath(usePathname() ?? "/");
  return paths.some((path) => normalizePath(path) === pathname);
}
