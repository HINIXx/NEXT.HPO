const heroStats = [
  { value: "600", label: "Câu hỏi" },
  { value: "06", label: "Chương" },
  { value: "60", label: "Câu điểm liệt" },
] as const;

/**
 * Đầu trang Ôn tập (V2 `.quiz-hero`): nền navy, số "600" mờ trang trí, h1 2 dòng (dòng 2 vàng), 3 ô số liệu.
 * ≥1281px: số liệu bên phải tiêu đề · 821–1280px: số liệu xuống dưới, canh phải · ≤820px: số liệu tràn ngang.
 */
export function DrivingTheoryQuizPageHero() {
  return (
    <section className="relative overflow-hidden bg-[#0a1330] pt-[38px] pb-[46px] text-white min-[521px]:pt-[46px] min-[521px]:pb-[54px] min-[821px]:pt-[72px] min-[821px]:pb-[82px]">
      <span
        aria-hidden="true"
        className="font-display pointer-events-none absolute right-[-25px] bottom-[-105px] text-[280px] leading-[normal] font-extrabold tracking-[-0.09em] text-white/[0.035] select-none"
      >
        600
      </span>
      <div className="container-site relative z-1 grid grid-cols-1 items-start gap-[18px] min-[821px]:items-center 2xl:grid-cols-[minmax(0,1fr)_auto] 2xl:gap-x-[clamp(28px,4vw,56px)]">
        <p className="col-span-full text-[16px] leading-[1.6] font-semibold text-[#dbe4f5]">
          Bộ 600 câu hỏi dành cho sát hạch lái xe cơ giới đường bộ của Bộ công
          an - Cục cảnh sát giao thông
        </p>
        <div className="min-w-0 2xl:col-start-1 2xl:row-start-2">
          <h1 className="font-display mt-4 text-[clamp(32px,8.5vw,40px)] leading-[1.12] font-extrabold tracking-[-0.02em] min-[521px]:text-[clamp(38px,4.4vw,64px)]">
            Ôn luyện lý thuyết
            <span className="text-emphasis-yellow mt-[0.12em] block">
              trắc nghiệm lái xe
            </span>
          </h1>
        </div>
        <dl className="flex w-full max-w-full border border-white/14 bg-white/5 min-[821px]:w-auto min-[821px]:self-start min-[821px]:justify-self-end 2xl:col-start-2 2xl:row-start-2 2xl:self-center">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="flex min-w-0 flex-1 flex-col-reverse border-r border-white/14 px-2 py-[13px] text-center last:border-0 min-[521px]:p-5 min-[521px]:text-left min-[821px]:min-w-[120px] min-[821px]:flex-none"
            >
              <dt className="mt-[3px] block text-[14px] leading-[1.4] min-[521px]:text-[15px]">
                {stat.label}
              </dt>
              <dd className="font-display text-emphasis-yellow block text-[clamp(24px,8vw,32px)] leading-[normal] font-extrabold min-[521px]:text-[42px]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
