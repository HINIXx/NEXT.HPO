export type AboutNumberedFeature = {
  /** Ký hiệu trang trí (V2 dùng ký tự ◎ ◇ ⌁). */
  icon: string;
  title: string;
  description: string;
};

/**
 * Dải 3 ý nổi bật đánh số 01–03 trên nền xanh nhạt (V2 `.feature-band` / `.exam-values` + `.feature-grid`).
 * ≥901px 3 cột có vạch ngăn; nhỏ hơn xếp dọc thành khung kẻ.
 */
export function AboutNumberedFeatureTrioBand({
  features,
}: {
  features: readonly AboutNumberedFeature[];
}) {
  return (
    <section className="bg-[#f4f7fc]">
      <div className="container-site grid lg:grid-cols-3">
        {features.map((feature, index) => (
          <article
            key={feature.title}
            data-reveal
            data-reveal-delay={index ? String(index) : undefined}
            className="relative border-x border-b border-[#dce4f0] p-[38px] lg:border-b-0 lg:border-l-0 lg:px-[45px] lg:pt-[60px] lg:pb-16 lg:first:border-l"
          >
            <span
              aria-hidden="true"
              className="font-display absolute top-[22px] right-[25px] text-[18px] leading-[normal] font-bold"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div
              aria-hidden="true"
              className="h-[58px] text-[42px] text-[#1e3a8a]"
            >
              {feature.icon}
            </div>
            <h3 className="font-display my-3 text-[22px] leading-[normal] font-bold text-balance text-[#0a1330]">
              {feature.title}
            </h3>
            <p className="text-[18px] leading-[1.7] text-pretty text-black">
              {feature.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
