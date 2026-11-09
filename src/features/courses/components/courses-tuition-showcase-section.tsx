/* eslint-disable @next/next/no-img-element -- hộp quà SVG minh họa, kích thước cố định */
import {
  courseTuitionOfferings,
  courseTuitionPromoDeadline,
} from "../data/course-tuition-offerings";
import { CourseTuitionCardsInteractiveList } from "./course-tuition-cards-interactive-list";
import scene from "./courses-animated-scene.module.css";

/** Khung nội dung riêng của khối khóa học (V2 `.course-demo-container`: tối đa 1280px, lề clamp 16–40px). */
export const courseSectionContainerClassName =
  "mx-auto w-[min(1280px,calc(100%-2*clamp(16px,4vw,40px)))]";

/**
 * Khối "KHÓA HỌC CỦA CHÚNG TÔI" (V2 `section.courses-section#khoa-hoc`, dùng chung trang chủ, Học phí,
 * TT GDNN, Ưu đãi): nền trời-mây-thành phố · tiêu đề DS · hộp quà "HỌC PHÍ TRỌN GÓI" · 3 thẻ · hạn ưu đãi.
 * Bố cục: ≥1024px hộp quà trái + thẻ phải; <1024px hộp quà lên trên (nằm ngang); <768px thẻ xếp dọc.
 */
export function CoursesTuitionShowcaseSection({
  tuitionByCourseId,
}: {
  /** Giá riêng theo mã thẻ (trang Ưu đãi: `promotionTuitionByCourseId`); trống = giá chuẩn. */
  tuitionByCourseId?: Readonly<Record<string, string>>;
} = {}) {
  const courses = tuitionByCourseId
    ? courseTuitionOfferings.map((course) => ({
        ...course,
        tuition: tuitionByCourseId[course.id] ?? course.tuition,
      }))
    : courseTuitionOfferings;
  return (
    <section
      id="khoa-hoc"
      aria-labelledby="courses-title"
      className={`${scene.scene} font-display relative isolate flex items-start overflow-hidden bg-[#eef4fb] pt-9 pb-[clamp(64px,8vw,112px)] text-[#0f1f3d] sm:pt-12`}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-1"
        aria-hidden="true"
      >
        <div className={scene.sky} />
        <div className={scene.cloud} />
        <div className={scene.cloud} />
        <div className={scene.cloud} />
        <div className={scene.city} />
        <div className={scene.fade} />
      </div>

      <div className={courseSectionContainerClassName}>
        <header className="mb-5 text-center sm:mb-7">
          <h2 id="courses-title" className="section-title-hp tracking-[0.01em]">
            KHÓA HỌC CỦA CHÚNG TÔI
          </h2>
          <p className="mt-2 text-[clamp(12px,calc(0.3vw+10px),14px)] font-bold tracking-[0.06em] text-balance text-[#1e3a8a]">
            <span className="whitespace-nowrap">
              ĐÀO TẠO LÁI XE Ô TÔ THÔNG MINH
            </span>
            <span className="text-brand-red"> - </span>
            <span className="whitespace-nowrap">CHI PHÍ THẤP</span>
            <span className="text-brand-red"> - </span>
            <span className="whitespace-nowrap">CHẤT LƯỢNG HÀNG ĐẦU</span>
          </p>
        </header>

        <div className="grid gap-[clamp(20px,2.6vw,36px)] min-[1024px]:grid-cols-[clamp(196px,19vw,250px)_minmax(0,1fr)] min-[1024px]:items-center">
          <CourseTuitionGiftPromo />
          <CourseTuitionCardsInteractiveList courses={courses} />
          <CourseTuitionPromoDeadlineNote />
        </div>
      </div>
    </section>
  );
}

/** Hộp quà ưu đãi + ruy băng "HỌC PHÍ TRỌN GÓI" (V2 `aside.promo`). */
function CourseTuitionGiftPromo() {
  return (
    <aside
      aria-label="Ưu đãi học phí"
      className="relative isolate grid grid-cols-[96px_auto] items-center justify-center gap-x-3 text-left min-[768px]:grid-cols-[132px_auto] min-[768px]:gap-x-[18px] min-[1024px]:flex min-[1024px]:flex-col min-[1024px]:text-center"
    >
      <div
        className={`${scene.gift} row-span-2 max-w-[96px] min-[768px]:max-w-[132px] min-[1024px]:max-w-[220px]`}
      >
        <span className={scene.giftGlow} aria-hidden="true" />
        <span className={scene.giftSpark} aria-hidden="true" />
        <span className={scene.giftSpark} aria-hidden="true" />
        <span className={scene.giftSpark} aria-hidden="true" />
        <span className={scene.giftSpark} aria-hidden="true" />
        <span className={scene.giftSpark} aria-hidden="true" />
        <img
          className={scene.giftBox}
          src="/assets/images/courses-demo/gift-box.svg"
          alt="Hộp quà ưu đãi học phí"
          width={240}
          height={228}
        />
        <span className={scene.giftShadow} aria-hidden="true" />
      </div>
      <p
        className={`${scene.ribbon} ml-3.5 self-end justify-self-start rounded-md px-4 py-2 text-[15px] font-extrabold tracking-[0.04em] whitespace-nowrap text-white min-[768px]:px-[22px] min-[768px]:py-2.5 min-[768px]:text-[clamp(15px,1.35vw,18px)] min-[1024px]:mt-2.5 min-[1024px]:ml-0 min-[1024px]:self-center`}
      >
        <span>HỌC PHÍ TRỌN GÓI</span>
      </p>
      <p className="mt-2.5 self-start text-[10.5px] leading-normal font-bold tracking-[0.08em] text-balance text-[#0f2d6b] uppercase min-[768px]:text-xs min-[1024px]:mt-3.5 min-[1024px]:self-center">
        Minh bạch · Hiệu quả
        <br />
        Chất lượng cao
      </p>
    </aside>
  );
}

/** Cụm "Thời gian áp dụng" dưới 3 thẻ (V2 `p.course-deadline`). */
function CourseTuitionPromoDeadlineNote() {
  return (
    <p
      role="note"
      className="text-ink flex flex-wrap items-start gap-x-3 gap-y-1.5 rounded-[18px] border border-[#fecaca] bg-linear-to-r from-[#fff5f5] to-white to-60% py-3 pr-3.5 pl-3 text-base leading-normal font-medium shadow-[0_10px_26px_rgba(185,28,28,0.08)] min-[768px]:items-center min-[768px]:gap-x-3.5 min-[768px]:gap-y-2.5 min-[768px]:pr-5 min-[768px]:text-[17px] min-[1024px]:col-start-2 min-[1024px]:-mt-3.5"
    >
      <span
        aria-hidden="true"
        className="inline-grid size-10 flex-none place-items-center rounded-xl bg-[#dc2626] text-white shadow-[0_6px_14px_rgba(220,38,38,0.3)] min-[768px]:size-11"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-6 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
        >
          <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
          <path d="M3.5 10h17M8 3v4M16 3v4M8.5 14.5l2.3 2.3 4.7-4.6" />
        </svg>
      </span>
      <span className="flex-none text-base leading-10 font-extrabold tracking-[0.04em] text-[#b91c1c] uppercase min-[768px]:leading-normal">
        Thời gian áp dụng:
      </span>
      <span className="min-w-0 basis-full min-[768px]:flex-[1_1_320px]">
        Chương trình ưu đãi học phí đăng ký đến hết ngày{" "}
        <strong className="font-extrabold whitespace-nowrap text-[#dc2626]">
          {courseTuitionPromoDeadline}
        </strong>
        .
      </span>
    </p>
  );
}
