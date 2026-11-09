"use client";

import { XIcon } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  foldVietnamese,
  formatPressDate,
  pressChannelLabels,
  type PressArticle,
  type PressChannel,
} from "../data/press-coverage-articles";
import {
  ExternalArrowIcon,
  PressChannelIcon,
} from "./press-channel-icon-and-highlights-strip";

type SortKey = "new" | "old" | "az" | "za";
const sortOptions: readonly [SortKey, string][] = [
  ["new", "Mới nhất"],
  ["old", "Cũ nhất"],
  ["az", "Tên báo A → Z"],
  ["za", "Tên báo Z → A"],
];
const selectClassName =
  "text-ink h-11 w-full rounded-xl border border-[#cdd6ee] bg-white px-3 text-[16px] focus:border-brand-blue focus:outline-none";

/**
 * Hộp "Báo chí đưa tin — Xem tất cả" (V2 `#pressListDialog` + homepage-press-list-dialog.js): tìm không cần gõ dấu,
 * lọc theo kênh (nút tự sinh, kèm số bài), chọn tên báo, sắp xếp Mới nhất/Cũ nhất/A→Z/Z→A; 3 bài mới nhất gắn "Mới".
 */
export function PressCoverageListDialog({
  open,
  onClose,
  articles,
  returnFocusTo,
}: {
  open: boolean;
  onClose: () => void;
  articles: readonly PressArticle[];
  returnFocusTo?: HTMLElement | null;
}) {
  const [query, setQuery] = useState("");
  const [channel, setChannel] = useState<PressChannel | "all">("all");
  const [outlet, setOutlet] = useState("");
  const [sort, setSort] = useState<SortKey>("new");

  const outletCounts = useMemo(() => {
    const counts = new Map<string, number>();
    articles.forEach((a) =>
      counts.set(a.outlet, (counts.get(a.outlet) ?? 0) + 1),
    );
    return [...counts].sort(([a], [b]) => a.localeCompare(b, "vi"));
  }, [articles]);
  const channels = (Object.keys(pressChannelLabels) as PressChannel[]).filter(
    (key) => articles.some((a) => a.channel === key),
  );

  const shown = useMemo(() => {
    const folded = foldVietnamese(query.trim());
    const list = articles.filter(
      (a) =>
        (channel === "all" || a.channel === channel) &&
        (!outlet || a.outlet === outlet) &&
        (!folded ||
          foldVietnamese(
            `${a.outlet} ${a.title} ${pressChannelLabels[a.channel]}`,
          ).includes(folded)),
    );
    const time = (a: PressArticle) =>
      a.publishedAt ? Date.parse(a.publishedAt) : 0;
    return [...list].sort((a, b) =>
      sort === "new"
        ? time(b) - time(a) || a.order - b.order
        : sort === "old"
          ? time(a) - time(b) || a.order - b.order
          : sort === "az"
            ? a.outlet.localeCompare(b.outlet, "vi")
            : b.outlet.localeCompare(a.outlet, "vi"),
    );
  }, [articles, channel, outlet, query, sort]);

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(next) => !next && onClose()}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed inset-0 z-[300] bg-[rgba(10,19,48,0.62)] backdrop-blur-[3px]" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          onCloseAutoFocus={(event) => {
            if (!returnFocusTo?.isConnected) return;
            event.preventDefault();
            returnFocusTo.focus({ preventScroll: true });
          }}
          className="data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed top-1/2 left-1/2 z-[301] flex max-h-[calc(100dvh-24px)] w-[calc(100vw-24px)] max-w-[900px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_28px_80px_rgba(10,19,48,0.32)] outline-none"
        >
          <header className="relative border-b border-[#dbe3f0] px-5 pt-5 pr-16 pb-4 sm:px-7">
            <DialogPrimitive.Title className="font-display text-ink text-[22px] leading-[1.25] font-extrabold sm:text-[26px]">
              Báo chí đưa tin về Hiệp Phát{" "}
              <span className="text-primary">({articles.length} bài)</span>
            </DialogPrimitive.Title>
            <DialogPrimitive.Close
              aria-label="Đóng"
              className="text-ink hover:border-primary absolute top-4 right-4 grid size-11 place-items-center rounded-full border border-[#dbe3f0] bg-white"
            >
              <XIcon className="size-5" strokeWidth={2.2} />
            </DialogPrimitive.Close>
            <div className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
              <label className="grid gap-1 text-[14px] font-bold text-[#334155]">
                Tìm bài
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Tên báo hoặc tiêu đề (không cần dấu)"
                  className={selectClassName}
                />
              </label>
              <label className="grid gap-1 text-[14px] font-bold text-[#334155]">
                Tên báo
                <select
                  value={outlet}
                  onChange={(e) => setOutlet(e.target.value)}
                  className={selectClassName}
                >
                  <option value="">Tất cả ({articles.length})</option>
                  {outletCounts.map(([name, count]) => (
                    <option key={name} value={name}>
                      {count > 1 ? `${name} (${count})` : name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1 text-[14px] font-bold text-[#334155]">
                Sắp xếp
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className={selectClassName}
                >
                  {sortOptions.map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div
              role="group"
              aria-label="Lọc theo kênh"
              className="mt-3 flex flex-wrap gap-2"
            >
              {(["all", ...channels] as const).map((key) => {
                const count =
                  key === "all"
                    ? articles.length
                    : articles.filter((a) => a.channel === key).length;
                const active = channel === key;
                return (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setChannel(key)}
                    className={cn(
                      "min-h-11 rounded-full border px-4 text-[15px] font-bold transition-colors",
                      active
                        ? "border-primary bg-primary text-white"
                        : "hover:border-primary border-[#cdd6ee] bg-white text-[#1e3a8a]",
                    )}
                  >
                    {key === "all" ? "Tất cả" : pressChannelLabels[key]} (
                    {count})
                  </button>
                );
              })}
            </div>
          </header>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3 sm:px-5">
            <p
              aria-live="polite"
              className="px-2 pb-2 text-[15px] text-[#475569]"
            >
              Đang hiện {shown.length} bài
            </p>
            <ul className="grid gap-2">
              {shown.map((article) => (
                <li key={article.order}>
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:border-primary flex items-start gap-3 rounded-2xl border border-[#e2e8f5] bg-white p-3.5 transition-colors"
                  >
                    <span className="text-brand-blue grid size-10 flex-none place-items-center rounded-full bg-[#eef2ff]">
                      <PressChannelIcon
                        channel={article.channel}
                        className="size-[18px]"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-[#475569]">
                        <b className="text-[16px] text-[#1e3a8a]">
                          {article.outlet}
                        </b>
                        <span>{pressChannelLabels[article.channel]}</span>
                        {article.publishedAt ? (
                          <span>· {formatPressDate(article.publishedAt)}</span>
                        ) : null}
                        {article.isNew ? (
                          <span className="rounded-full bg-[#dc2626] px-2 py-0.5 text-[13px] font-extrabold text-white uppercase">
                            Mới
                          </span>
                        ) : null}
                      </span>
                      <span className="text-ink mt-1 block text-[17px] leading-[1.45] font-semibold">
                        {article.title}
                      </span>
                    </span>
                    <ExternalArrowIcon className="mt-1 size-5 flex-none text-[#94a3b8]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
