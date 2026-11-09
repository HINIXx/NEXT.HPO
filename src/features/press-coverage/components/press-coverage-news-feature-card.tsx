import Image from "next/image";
import {
  formatPressDate,
  pressChannelLabels,
  pressChannelVerbs,
  type PressArticle,
} from "../data/press-coverage-articles";
import {
  ExternalArrowIcon,
  PressChannelIcon,
} from "./press-channel-icon-and-highlights-strip";

/** Bài lớn khu "Bài báo về Hiệp Phát": ảnh 16:9 + nhãn kênh + "Mới" + thanh thời gian vàng, tiêu đề, nguồn, nút mở bài. */
export function PressCoverageNewsFeatureCard({
  article,
  progressKey,
  running,
  intervalMs,
}: {
  article: PressArticle;
  progressKey: number;
  running: boolean;
  intervalMs: number;
}) {
  return (
    <article className="min-w-0">
      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden="true"
        className="relative block aspect-video overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#0a1330,#1e3a8a)]"
      >
        <Image
          key={article.image}
          src={article.image!}
          alt=""
          width={960}
          height={540}
          sizes="(min-width: 1100px) 40vw, 100vw"
          className="size-full object-cover"
        />
        <span className="bg-ink text-emphasis-yellow absolute top-3 left-3 z-[1] inline-flex items-center gap-1.5 rounded-full px-3 py-[5px] text-[16px] leading-[1.2] font-extrabold">
          <PressChannelIcon channel={article.channel} className="size-4" />
          {pressChannelLabels[article.channel]}
        </span>
        {article.isNew ? (
          <span className="absolute top-3 right-3 z-[1] rounded-full bg-[#dc2626] px-3 py-[5px] text-[16px] leading-[1.2] font-extrabold text-white uppercase">
            Mới
          </span>
        ) : null}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1 bg-white/35"
        >
          <i
            key={progressKey}
            className="bg-emphasis-yellow block h-full origin-left"
            style={{
              animation: running
                ? `hpo-slide-progress ${intervalMs}ms linear forwards`
                : "none",
              transform: running ? undefined : "scaleX(0)",
            }}
          />
        </span>
      </a>
      <h3 className="font-display mt-3 text-[clamp(19px,1.6vw,22px)] leading-[1.35] font-bold">
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1e3a8a] hover:underline"
        >
          {article.title}
        </a>
      </h3>
      <p className="mt-1 text-[16px] leading-[1.5] text-[#475569]">
        {[
          article.outlet,
          pressChannelLabels[article.channel],
          formatPressDate(article.publishedAt),
        ]
          .filter(Boolean)
          .join(" · ")}
      </p>
      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex min-h-11 items-center gap-1.5 rounded-full border-2 border-[#2563eb] bg-white px-[18px] text-[16px] font-extrabold text-[#2563eb] transition-colors hover:bg-[#2563eb] hover:text-white"
      >
        {pressChannelVerbs[article.channel]}
        <ExternalArrowIcon className="size-4" />
      </a>
    </article>
  );
}
