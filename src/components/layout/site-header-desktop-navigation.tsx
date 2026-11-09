import {
  homeLink,
  isNavGroup,
  primaryNavigation,
  type NavGroup,
} from "@/shared/config/navigation";
import { ActiveRouteAwareLink } from "./active-route-aware-link";
import { HomeIcon } from "./site-shell-svg-icons";

/**
 * Menu ngang dạng "viên trượt" (V2 site-header-nav-refresh.css), hiện ở ≥1351px.
 * Co dần theo ngưỡng V2: ≤1720 / ≤1660 / ≤1640 / ≤1400px.
 */
const topLinkClass = [
  "inline-flex h-10 items-center gap-[7px] whitespace-nowrap rounded-full px-3.5",
  "font-display text-[14.5px] font-medium tracking-[-0.005em] text-header-ink",
  "transition-[color,background-color,box-shadow] duration-200 ease-hp",
  "hover:bg-white/75 hover:text-header-blue",
  "aria-[current=page]:bg-white aria-[current=page]:font-semibold aria-[current=page]:text-header-blue",
  "aria-[current=page]:shadow-[0_1px_2px_rgba(19,35,90,0.08),0_6px_16px_-8px_rgba(38,67,233,0.45)]",
  "max-[1720px]:px-[11px] max-[1720px]:text-[14px]",
  "max-[1660px]:h-[38px] max-[1660px]:px-[9px] max-[1660px]:text-[13.5px]",
  "max-[1640px]:px-2",
  "max-[1400px]:gap-[5px] max-[1400px]:px-[7px] max-[1400px]:text-[13px]",
].join(" ");

/** Mũi tên ▾ của mục có danh sách xổ xuống, xoay lên khi rê chuột. */
const dropdownArrowClass = [
  "after:-mt-[3px] after:ml-px after:size-[5px] after:rotate-45 after:border-r-[1.6px] after:border-b-[1.6px]",
  "after:border-current after:opacity-70 after:transition-transform after:duration-200 after:content-['']",
  "group-hover/dropdown:bg-white/75 group-hover/dropdown:text-header-blue",
  "group-hover/dropdown:after:mt-[3px] group-hover/dropdown:after:rotate-[225deg] group-hover/dropdown:after:opacity-100",
].join(" ");

const dropdownPanelClass = [
  "invisible absolute top-[calc(100%+14px)] left-0 min-w-[280px] -translate-y-2 rounded-card border border-header-track-line bg-white p-2 opacity-0",
  "shadow-[0_24px_50px_-20px_rgba(19,35,90,0.35),0_4px_12px_rgba(19,35,90,0.06)]",
  "transition-[opacity,transform,visibility] duration-[220ms] ease-hp",
  "group-hover/dropdown:visible group-hover/dropdown:translate-y-0 group-hover/dropdown:opacity-100",
  "group-focus-within/dropdown:visible group-focus-within/dropdown:translate-y-0 group-focus-within/dropdown:opacity-100",
  // Mũi nhọn chỉ lên mục cha
  "before:absolute before:-top-[7px] before:left-7 before:size-3 before:rotate-45 before:rounded-tl-[3px]",
  "before:border-t before:border-l before:border-header-track-line before:bg-white before:content-['']",
  // Cầu nối vô hình để rê chuột từ mục cha xuống không bị mất
  "after:absolute after:inset-x-0 after:-top-4 after:h-4 after:content-['']",
].join(" ");

const dropdownLinkClass = [
  "group/item flex items-center gap-3 rounded-xl px-3.5 py-3 text-[14px] font-medium text-header-ink",
  "transition-colors duration-[180ms] hover:bg-header-track hover:text-header-blue",
  "aria-[current=page]:bg-header-tint aria-[current=page]:font-semibold aria-[current=page]:text-header-blue",
  "aria-[current=page]:shadow-[inset_3px_0_0_var(--color-header-blue)]",
].join(" ");

/**
 * Giữ sẵn bề rộng chữ đậm (bản đậm ẩn trong ::after) → mục đang chọn đậm hơn nhưng menu không xê dịch
 * khi chuyển trang (V2 site-header-stable-across-pages.css).
 */
function StableWidthLabel({ text }: { text: string }) {
  return (
    <span
      data-label={text}
      className="inline-grid justify-items-center after:pointer-events-none after:invisible after:h-0 after:overflow-hidden after:font-semibold after:content-[attr(data-label)] after:select-none"
    >
      {text}
    </span>
  );
}

function DropdownItem({ group }: { group: NavGroup }) {
  return (
    <li className="group/dropdown relative" data-nav-dropdown>
      <ActiveRouteAwareLink
        href={group.href}
        matchPaths={group.items.map((item) => item.href)}
        className={`${topLinkClass} ${dropdownArrowClass}`}
      >
        <StableWidthLabel text={group.label} />
      </ActiveRouteAwareLink>
      <div className={dropdownPanelClass}>
        {group.items.map((item) => (
          <ActiveRouteAwareLink
            key={item.href}
            href={item.href}
            className={dropdownLinkClass}
          >
            <span className="bg-header-indigo-200 group-hover/item:bg-header-blue group-aria-[current=page]/item:bg-header-blue size-[7px] shrink-0 rounded-full transition-colors" />
            {item.label}
          </ActiveRouteAwareLink>
        ))}
      </div>
    </li>
  );
}

export function SiteHeaderDesktopNavigation() {
  return (
    <ul className="border-header-track-line bg-header-track ml-auto hidden items-center gap-0.5 rounded-full border p-[5px] shadow-[inset_0_1px_2px_rgba(19,35,90,0.04)] max-[1660px]:p-1 max-[1400px]:gap-0 min-[1351px]:flex">
      <li className="relative whitespace-nowrap">
        <ActiveRouteAwareLink
          href={homeLink.href}
          title="Trang chủ"
          aria-label="Cổng thông tin điện tử – Trang chủ"
          className={topLinkClass}
        >
          <HomeIcon className="size-[19px] max-[1640px]:size-[17px]" />
          <span>{homeLink.label}</span>
        </ActiveRouteAwareLink>
      </li>
      {primaryNavigation.map((entry) =>
        isNavGroup(entry) ? (
          <DropdownItem key={entry.label} group={entry} />
        ) : (
          <li key={entry.href} className="relative whitespace-nowrap">
            <ActiveRouteAwareLink href={entry.href} className={topLinkClass}>
              <StableWidthLabel text={entry.label} />
            </ActiveRouteAwareLink>
          </li>
        ),
      )}
    </ul>
  );
}
