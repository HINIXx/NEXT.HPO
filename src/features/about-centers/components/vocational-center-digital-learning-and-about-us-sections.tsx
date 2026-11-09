import Image from "next/image";
import { contact } from "@/shared/config/contact";
import {
  vocationalCenterDigitalLearningBenefits,
  vocationalCenterDigitalLearningStats,
  vocationalCenterGatePhotoSrc,
} from "../data/vocational-training-center-page-content";
import {
  AboutSectionEyebrowLabel,
  aboutSectionHeadingClassName,
  aboutSectionPaddingClassName,
} from "./about-page-shared-typography";

/** Link chữ gạch chân + mũi tên trượt khi rê chuột (V2 `.exam-center__link`, `.text-link`). */
function UnderlinedArrowTextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: string;
  className: string;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-3 border-b pb-[7px] font-bold text-[#1e3a8a] ${className}`}
    >
      {children}
      <span
        aria-hidden="true"
        className="ease-hp transition-transform duration-250 group-hover:translate-x-1"
      >
        →
      </span>
    </a>
  );
}

/**
 * "Học lái xe hiện đại. Chủ động trên mọi hành trình." (V2 `section.exam-center` trang TT GDNN):
 * ảnh cổng trung tâm + nhãn 4.0 · 2 số liệu · 3 lợi ích · link đăng ký tư vấn.
 */
export function VocationalCenterDigitalLearningIntroSection() {
  return (
    <section
      aria-labelledby="exam-center-title"
      className={`overflow-hidden bg-[#f4f7fc] ${aboutSectionPaddingClassName}`}
    >
      <div className="container-site grid items-center gap-[clamp(60px,8vw,120px)] lg:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)]">
        <div
          data-reveal
          className="relative min-h-[390px] w-full min-[621px]:min-h-[540px] min-[621px]:max-w-[720px] lg:min-h-[610px] lg:max-w-none"
        >
          <Image
            src={vocationalCenterGatePhotoSrc}
            alt="Môi trường đào tạo tại Trung tâm Giáo dục nghề nghiệp Hiệp Phát"
            fill
            sizes="(min-width: 901px) 46vw, 100vw"
            className="object-cover shadow-[0_30px_70px_-35px_rgba(7,26,58,0.55)]"
          />
          <div className="absolute bottom-6 left-2 flex min-h-[82px] w-[155px] items-center gap-3.5 bg-[#1e3a8a] p-3.5 text-white shadow-[0_22px_45px_-20px_rgba(18,63,150,0.65)] min-[621px]:bottom-10 min-[621px]:-left-5 min-[621px]:min-h-[105px] min-[621px]:w-[190px] min-[621px]:p-5">
            <strong className="font-display text-base leading-[normal] font-extrabold min-[621px]:text-[20px]">
              4.0
            </strong>
            <span className="border-l border-white/30 pl-3.5 text-[14px] leading-[1.45]">
              Đào tạo
              <br />
              chuyển đổi số
            </span>
          </div>
        </div>

        <div data-reveal data-reveal-delay="1">
          <AboutSectionEyebrowLabel>
            Trung tâm giáo dục nghề nghiệp
          </AboutSectionEyebrowLabel>
          <h2 id="exam-center-title" className={aboutSectionHeadingClassName}>
            Học lái xe hiện đại.
            <br />
            <span>Chủ động trên mọi hành trình.</span>
          </h2>
          <p className="mt-6 mb-[26px] text-[18px] leading-[1.8] text-pretty text-black">
            Hiệp Phát tiên phong áp dụng chuyển đổi số vào quy trình đào tạo lái
            xe, mang đến phương thức học tập hiện đại, thuận tiện và hiệu quả
            hơn. Công nghệ giúp học viên tiết kiệm thời gian, đồng thời nâng cao
            chất lượng trong từng giai đoạn học.
          </p>
          <dl className="mb-6 grid border-y border-[#ced8e8] min-[621px]:grid-cols-2">
            {vocationalCenterDigitalLearningStats.map((stat) => (
              <div
                key={stat.value}
                className="flex flex-col-reverse py-[18px] pr-5 [&+&]:border-t [&+&]:border-[#ced8e8] min-[621px]:[&+&]:border-t-0 min-[621px]:[&+&]:border-l min-[621px]:[&+&]:pl-5"
              >
                <dt className="mt-[5px] text-[16px] leading-[1.5] text-black">
                  {stat.label}
                </dt>
                <dd className="font-display text-[30px] leading-[normal] font-extrabold text-[#dc2626]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
          <ul>
            {vocationalCenterDigitalLearningBenefits.map((benefit) => (
              <li
                key={benefit}
                className="flex gap-2.5 py-[5px] text-[18px] text-black"
              >
                <span
                  aria-hidden="true"
                  className="font-extrabold text-[#1e8d58]"
                >
                  ✓
                </span>
                {benefit}
              </li>
            ))}
          </ul>
          <UnderlinedArrowTextLink
            href={contact.registerUrl}
            className="font-display mt-[26px] border-[#9fb1ce] text-[17px]"
          >
            Đăng ký tư vấn chương trình học
          </UnderlinedArrowTextLink>
        </div>
      </div>
    </section>
  );
}

/** "Về chúng tôi — Đào tạo thực chất, kiến tạo người lái xe an toàn." (V2 `section.intro#ve-chung-toi`). */
export function VocationalCenterAboutUsIntroSection() {
  return (
    <section id="ve-chung-toi" className={aboutSectionPaddingClassName}>
      <div className="container-site grid items-start gap-[55px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-[10vw]">
        <div data-reveal>
          <AboutSectionEyebrowLabel>Về chúng tôi</AboutSectionEyebrowLabel>
          <h2 className={aboutSectionHeadingClassName}>
            Đào tạo thực chất,
            <br />
            kiến tạo <span>người lái xe an toàn.</span>
          </h2>
        </div>
        <div data-reveal data-reveal-delay="1">
          <p className="font-display mb-[22px] text-[clamp(19px,1.5vw,23px)] leading-[1.65] font-semibold text-pretty text-[#0a1330]">
            Không chỉ hướng đến một tấm bằng, Hiệp Phát xây dựng nền tảng kiến
            thức, kỹ năng và văn hóa giao thông cho mỗi học viên.
          </p>
          <p className="text-body leading-[1.8] text-pretty text-black">
            Quy trình học được số hóa từ đăng ký, học lý thuyết, mô phỏng đến
            theo dõi tiến độ. Công nghệ giúp việc học thuận tiện hơn, nhưng trải
            nghiệm thực hành sát thực tế vẫn luôn là trọng tâm.
          </p>
          <UnderlinedArrowTextLink
            href={contact.registerUrl}
            className="mt-7 border-[#b6c5df] text-[17px]"
          >
            Bắt đầu hành trình học lái
          </UnderlinedArrowTextLink>
        </div>
      </div>
    </section>
  );
}
