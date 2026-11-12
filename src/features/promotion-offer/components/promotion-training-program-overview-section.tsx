import Image from "next/image";

const platformImage = "/assets/images/platform";

/** 3 thẻ xanh "Học lý thuyết" (V2 trang Ưu đãi `.uu-learning__benefit`, 07/11: hình trên chữ dưới). */
const theoryBenefits = [
  {
    src: `${platformImage}/hoc-ly-thuyet-5-mon.webp`,
    width: 560,
    height: 430,
    alt: "Minh họa 5 môn lý thuyết: đèn giao thông, giáo viên, sách luật và xe tải",
    title: "5 môn lý thuyết",
    note: "link",
  },
  {
    src: `${platformImage}/hoc-ly-thuyet-mo-hinh-3d.webp`,
    width: 560,
    height: 396,
    alt: "Minh họa mô hình xe ô tô 3D trên màn hình",
    title: "Mô hình minh họa 3D",
    note: "Trực quan, sinh động",
  },
  {
    src: `${platformImage}/hoc-ly-thuyet-bai-giang-360.webp`,
    width: 560,
    height: 514,
    alt: "Minh họa bài giảng 360 độ trên điện thoại",
    title: "Bài giảng 360 độ",
    note: "Dễ hiểu, dễ nhớ, dễ tiếp thu",
  },
] as const;

const simulatorVisuals = [
  {
    src: `${platformImage}/thuc-hanh-mo-phong-sa-hinh.webp`,
    alt: "Giao diện mô phỏng sa hình với sân sát hạch, biển báo và xe tập lái",
    title: "Mô phỏng sa hình",
    caption: "Hiện thực sân sát hạch đúng kích thước sân thật",
  },
  {
    src: `${platformImage}/thuc-hanh-mo-phong-dat.webp`,
    alt: "Giao diện mô phỏng DAT với các tuyến đường và tình huống giao thông",
    title: "Mô phỏng DAT",
    caption: "Hiện thực tuyến đường và tình huống lái xe thực tế",
  },
] as const;

const practiceCards = [
  {
    number: "01",
    title: "Sa hình",
    lead: "Tích hợp ôn luyện lý thuyết trên HPO:",
    ordered: true,
    items: [
      "Các nguyên tắc xử lý trên sa hình",
      "Hướng dẫn thao tác các bài thực hành",
    ],
    figuresLabel: "Số bài thi:",
    figures: [
      { term: "Hạng B", value: "11 bài thi" },
      { term: "Hạng C1", value: "10 bài thi" },
    ],
  },
  {
    number: "02",
    title: "DAT",
    lead: "Tích hợp môn học lý thuyết kỹ thuật lái xe:",
    ordered: false,
    items: [
      "Các video kỹ thuật lái xe",
      "Kỹ năng xử lý tình huống giao thông phức tạp",
    ],
    figuresLabel: "Thời gian:",
    figures: [
      { term: "Hạng B số tự động", value: "710 km · 17 giờ" },
      { term: "Hạng B số cơ khí", value: "810 km · 20 giờ" },
      { term: "Hạng C1", value: "825 km · 24 giờ" },
    ],
  },
] as const;

function GroupHeading({
  id,
  title,
  subtitle,
}: {
  id: string;
  title: string;
  subtitle: string;
}) {
  return (
    <header className="border-brand-red mb-5 grid gap-1 border-l-[6px] pl-4 sm:pl-[22px]">
      <h3
        id={id}
        className="font-display text-brand-navy text-[clamp(29px,3.2vw,42px)] leading-[1.16] font-extrabold"
      >
        {title}
      </h3>
      <p className="text-[clamp(18px,1.6vw,22px)] leading-[1.45] font-semibold text-[#29375b]">
        {subtitle}
      </p>
    </header>
  );
}

/**
 * "CHƯƠNG TRÌNH ĐÀO TẠO" trang Ưu đãi (V2 `.uu-learning` + `hoc-ly-thuyet-thuc-hanh-gon.css`):
 * Học lý thuyết (3 thẻ xanh + 2 ảnh mô phỏng) · Học thực hành (thẻ Sa hình, DAT). ≤600px 1 cột.
 */
export function PromotionTrainingProgramOverviewSection() {
  return (
    <section
      aria-labelledby="uu-learning-title"
      className="bg-[linear-gradient(180deg,#f4f7ff_0%,#fff_54%,#f8faff_100%)] px-5 py-[clamp(40px,4.5vw,64px)]"
    >
      <div className="mx-auto max-w-[1200px]">
        <h2
          id="uu-learning-title"
          className="section-title-hp mx-auto mb-10 w-fit text-center text-[clamp(28px,4.1vw,50px)]! tracking-[0.01em]"
        >
          CHƯƠNG TRÌNH ĐÀO TẠO
        </h2>

        <div aria-labelledby="uu-learning-theory-title" role="group">
          <GroupHeading
            id="uu-learning-theory-title"
            title="Học lý thuyết"
            subtitle="Học mọi lúc, mọi nơi"
          />
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {theoryBenefits.map((benefit) => (
              <article
                key={benefit.title}
                data-reveal
                className="flex flex-col items-center overflow-hidden rounded-[22px] bg-[linear-gradient(145deg,#2b26fb,#163b9f)] px-4 pt-3.5 pb-[18px] text-center text-white shadow-[0_18px_40px_-26px_rgba(23,40,160,0.8)] sm:px-3 md:px-5 md:pt-[18px] md:pb-[22px]"
              >
                <Image
                  src={benefit.src}
                  alt={benefit.alt}
                  width={benefit.width}
                  height={benefit.height}
                  loading="lazy"
                  className="mb-2 h-24 w-auto object-contain sm:h-[88px] md:mb-3 md:h-[clamp(88px,8.75vw,126px)]"
                />
                <h4 className="font-display mb-1 text-[20px] leading-[1.28] font-bold md:text-[clamp(20px,1.9vw,27px)]">
                  {benefit.title}
                </h4>
                <p className="text-[17px] leading-[1.5] text-[#eef2ff] md:text-[19px]">
                  {benefit.note === "link" ? (
                    <>
                      Chi tiết tại{" "}
                      <a
                        href="https://hpo.edu.vn/"
                        className="text-white underline underline-offset-2"
                      >
                        hpo.edu.vn
                      </a>
                    </>
                  ) : (
                    benefit.note
                  )}
                </p>
              </article>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {simulatorVisuals.map((visual) => (
              <figure
                key={visual.title}
                data-reveal
                className="overflow-hidden rounded-[22px] border border-[#dce5ff] bg-white shadow-[0_16px_38px_-30px_#233a82]"
              >
                <Image
                  src={visual.src}
                  alt={visual.alt}
                  width={1428}
                  height={803}
                  loading="lazy"
                  className="aspect-[1428/803] w-full object-contain"
                />
                <figcaption className="grid gap-0.5 border-t border-[#e8edfa] px-5 pt-3.5 pb-4">
                  <strong className="font-display text-brand-navy text-[21px] leading-[1.3] font-bold">
                    {visual.title}
                  </strong>
                  <span className="text-[17px] leading-[1.5] text-[#344466]">
                    {visual.caption}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div
          aria-labelledby="uu-learning-practice-title"
          role="group"
          className="mt-[clamp(40px,4.5vw,64px)]"
        >
          <GroupHeading
            id="uu-learning-practice-title"
            title="Học thực hành"
            subtitle="An toàn hiệu quả với giáo viên hướng dẫn 1 - 1"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {practiceCards.map((card) => {
              const List = card.ordered ? "ol" : "ul";
              return (
                <article
                  key={card.number}
                  data-reveal
                  aria-labelledby={`uu-practice-${card.number}`}
                  className="border-t-brand-red rounded-[22px] border border-t-[5px] border-[#f4d9dc] bg-white p-5 shadow-[0_18px_40px_-34px_#8d1222] sm:p-[26px]"
                >
                  <div className="mb-3.5 flex items-center gap-3.5">
                    <span
                      aria-hidden="true"
                      className="bg-brand-red grid size-12 place-items-center rounded-[14px] text-[18px] font-extrabold text-white"
                    >
                      {card.number}
                    </span>
                    <h4
                      id={`uu-practice-${card.number}`}
                      className="font-display text-[26px] leading-[1.65] font-bold text-[#b41923]"
                    >
                      {card.title}
                    </h4>
                  </div>
                  <p className="mb-2.5 text-[17px] leading-[1.55] font-bold text-[#172343]">
                    {card.lead}
                  </p>
                  <List
                    className={`marker:text-brand-red mb-3.5 pl-6 text-[17px] leading-[1.55] text-[#172343] marker:font-bold ${card.ordered ? "list-decimal" : "list-disc"}`}
                  >
                    {card.items.map((item) => (
                      <li key={item} className="pl-1">
                        {item}
                      </li>
                    ))}
                  </List>
                  <p className="mb-2.5 text-[17px] leading-[1.55] font-bold text-[#172343]">
                    {card.figuresLabel}
                  </p>
                  <dl className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {card.figures.map((figure) => (
                      <div
                        key={figure.term}
                        className="grid content-start gap-0.5 rounded-[10px] bg-[#fff4f4] px-3 py-2.5"
                      >
                        <dt className="text-[15px] leading-[1.35] text-[#172343]">
                          {figure.term}
                        </dt>
                        <dd className="text-[17px] leading-[1.55] font-extrabold text-[#b41923]">
                          {figure.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
