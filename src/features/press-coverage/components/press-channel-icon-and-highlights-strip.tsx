"use client";

import { cn } from "@/lib/utils";
import {
  pressChannelLabels,
  type PressArticle,
  type PressChannel,
} from "../data/press-coverage-articles";
import { usePressCoverage } from "./press-coverage-provider";

const channelIconPaths: Record<PressChannel, React.ReactNode> = {
  "bao-dien-tu": (
    <>
      <path d="M4 5h13v14H6a2 2 0 0 1-2-2zM17 9h3v8a2 2 0 0 1-2 2" />
      <path d="M7.5 9h6M7.5 12.5h6M7.5 16h4" />
    </>
  ),
  "truyen-hinh": (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M10 9.5v5l4.2-2.5z" />
    </>
  ),
  "phat-thanh": (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7" />
    </>
  ),
  "mang-xa-hoi": (
    <>
      <circle cx="18" cy="5.5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="18.5" r="2.5" />
      <path d="m8.2 10.8 7.6-4M8.2 13.2l7.6 4" />
    </>
  ),
};

/** Icon kênh báo chí (V2 ICONS): báo điện tử, truyền hình, phát thanh, mạng xã hội. */
export function PressChannelIcon({
  channel,
  className,
}: {
  channel: PressChannel;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn(
        "fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]",
        className,
      )}
    >
      {channelIconPaths[channel]}
    </svg>
  );
}

export function ExternalArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn(
        "fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]",
        className,
      )}
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

function StripChip({
  article,
  hidden,
}: {
  article: PressArticle;
  hidden?: boolean;
}) {
  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={hidden ? -1 : undefined}
      aria-label={
        hidden
          ? undefined
          : `${article.outlet}: ${article.title} (${pressChannelLabels[article.channel].toLowerCase()}, mở trong tab mới)`
      }
      className="hover:border-primary flex max-w-[min(560px,80vw)] flex-none items-center gap-2.5 rounded-full border border-[#dbe4f8] bg-white py-2 pr-[18px] pl-2 text-[15px] leading-[1.2] text-[#1e3a8a] shadow-[0_6px_16px_-12px_rgba(30,58,138,0.5)] transition-colors"
    >
      <span className="text-brand-blue grid size-[34px] flex-none place-items-center rounded-full bg-[#eef2ff]">
        <PressChannelIcon channel={article.channel} className="size-4" />
      </span>
      <b className="flex-none font-bold">{article.outlet}</b>
      <span className="truncate text-[#475569]">{article.title}</span>
      <ExternalArrowIcon className="size-4 flex-none text-[#94a3b8]" />
    </a>
  );
}

/**
 * Dải "Báo chí đưa tin" dưới slider (V2 `.strip--press`): nhãn đứng yên bên trái (bấm → hộp xem tất cả) + thẻ bài chạy ngang
 * 300s/vòng (2 nhóm nối tiếp, nhóm 2 ẩn khỏi trình đọc), dừng khi rê chuột/focus; "giảm chuyển động" → cuộn tay.
 */
export function PressCoverageHighlightsStrip() {
  const { articles, openList } = usePressCoverage();
  return (
    <div
      role="region"
      aria-label="Báo chí đưa tin về Hiệp Phát"
      className="group/strip flex items-center bg-[linear-gradient(180deg,#fff_0%,#f4f7fe_100%)]"
    >
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={(event) => openList(event.currentTarget)}
        className="flex h-[88px] flex-none items-center gap-2.5 pr-[18px] pl-4 text-left text-[14px] leading-[1.15] font-extrabold tracking-[0.06em] text-[#1e3a8a] uppercase sm:pl-7"
      >
        <span className="bg-primary relative grid size-[38px] place-items-center rounded-full text-white">
          <PressChannelIcon channel="bao-dien-tu" className="size-[18px]" />
          <span className="bg-ink text-emphasis-yellow absolute -top-2.5 -right-3 rounded-full border-2 border-white px-[5px] text-[12px] leading-[18px]">
            {articles.length}
          </span>
        </span>
        <span className="flex flex-col gap-[3px]">
          <span>
            Báo chí
            <br />
            đưa tin
          </span>
          <span className="text-primary text-[14px] font-bold tracking-normal normal-case">
            Xem tất cả ›
          </span>
        </span>
      </button>
      <div className="min-w-0 flex-1 overflow-hidden motion-reduce:overflow-x-auto">
        <div className="flex w-max animate-[press-strip-marquee_300s_linear_infinite] py-[18px] group-focus-within/strip:[animation-play-state:paused] group-hover/strip:[animation-play-state:paused] motion-reduce:animate-none">
          {[false, true].map((hidden) => (
            <div
              key={String(hidden)}
              aria-hidden={hidden || undefined}
              className="flex gap-3.5 pr-3.5"
            >
              {articles.map((article) => (
                <StripChip
                  key={`${article.order}-${hidden}`}
                  article={article}
                  hidden={hidden}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
