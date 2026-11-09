import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Logo Hiệp Phát (ảnh 900×280) bấm về trang chủ. Chiều cao do `className` quyết định
 * (header: 56/70/106/108px, menu ☰: 48/64px, footer: 82px — bản chữ trắng).
 */
export function SiteBrandLogoLink({
  variant = "color",
  className,
  imageClassName,
}: {
  variant?: "color" | "white";
  className?: string;
  imageClassName?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="Hiệp Phát"
      className={cn("flex shrink-0 items-center", className)}
    >
      <Image
        src={
          variant === "white"
            ? "/assets/images/logo-white.png"
            : "/assets/images/logo.png"
        }
        alt="Hiệp Phát"
        width={900}
        height={280}
        loading={variant === "white" ? "lazy" : "eager"}
        className={cn(
          "h-full w-auto max-w-none object-contain",
          imageClassName,
        )}
      />
    </Link>
  );
}
