import { Globe, Mail, Phone } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { contact } from "@/shared/config/contact";
import { courseSectionContainerClassName } from "./courses-tuition-showcase-section";

/** Đường kẻ ngăn cột (V2 rgba(29, 78, 216, 0.14)). */
const dividerColor = "border-[rgba(29,78,216,0.14)]";

const flexibleScheduleItems: readonly ReactNode[] = [
  "Chủ động theo thời gian của học viên",
  "Thuận tiện để học mọi lúc, mọi nơi",
];

const examPreparationItems: readonly ReactNode[] = [
  <>
    Kiểm tra hoàn thành khóa đào tạo với xe thiết bị có chấm điểm trên sân sát
    hạch: <strong>20 phút</strong>
  </>,
  <>
    Ôn tập xe thiết bị: <strong>2 giờ</strong>
  </>,
  <>
    Ôn tập lý thuyết: <strong>Phòng lý thuyết</strong>
  </>,
];

const contactItems = [
  {
    Icon: Phone,
    href: contact.courseAdvisorPhoneHref,
    label: `${contact.courseAdvisorPhone} — ${contact.hotline}`,
    external: false,
  },
  {
    Icon: Globe,
    href: "https://hpo.edu.vn",
    label: "https://hpo.edu.vn",
    external: true,
  },
  {
    Icon: Mail,
    href: contact.emailHref,
    label: contact.email,
    external: false,
  },
] as const;

/**
 * Khối "KHÓA HỌC LINH ĐỘNG" dưới 3 thẻ học phí (V2 `section.course-info-section`, cỡ chữ theo trang Học phí
 * `hoc-phi-tuition-readable.css`): cột linh động | cột ôn tập-kiểm tra | hàng liên hệ + link Quy trình.
 * ≥1024px 2 cột + hàng liên hệ 3 ô; <1024px xếp dọc; <768px liên hệ 1 cột.
 */
export function CourseFlexibleScheduleInfoPanelSection() {
  return (
    <section
      aria-label="Thông tin khóa học"
      className="font-display relative isolate overflow-hidden bg-linear-to-b from-[#f5f9ff] to-[#eef4fb] py-[clamp(22px,3.2vw,42px)] text-[#0f1f3d] before:pointer-events-none before:absolute before:top-[-120px] before:right-[8%] before:-z-1 before:size-[300px] before:rounded-full before:bg-[radial-gradient(circle,rgba(84,151,236,0.16),transparent_68%)] before:content-['']"
    >
      <div className={courseSectionContainerClassName}>
        <div
          role="group"
          aria-label="Thông tin khóa học"
          className="grid rounded-[22px] border border-[rgba(29,78,216,0.16)] bg-white/90 p-5 shadow-[0_24px_60px_-38px_rgba(15,45,107,0.48),inset_0_1px_0_rgba(255,255,255,0.96)] backdrop-blur-md min-[768px]:rounded-[26px] min-[768px]:p-[clamp(22px,3vw,38px)] min-[1024px]:grid-cols-[minmax(250px,0.9fr)_minmax(0,1.45fr)]"
        >
          <div
            className={`flex min-w-0 flex-col justify-center gap-2.5 border-b pb-5 ${dividerColor} min-[1024px]:border-r min-[1024px]:border-b-0 min-[1024px]:pt-[clamp(4px,1vw,10px)] min-[1024px]:pr-[clamp(18px,2.5vw,34px)] min-[1024px]:pb-[clamp(8px,1vw,12px)]`}
          >
            <span className="mb-1 self-start rounded-full border border-[rgba(242,181,29,0.78)] bg-linear-135 from-[#ffe66b] to-[#f7c934] px-[17px] py-2.5 text-center text-[13px] leading-[1.25] font-extrabold tracking-[0.12em] text-[#10214d] shadow-[0_8px_18px_-12px_rgba(181,127,0,0.6)] min-[768px]:text-[14px]">
              KHÓA HỌC LINH ĐỘNG
            </span>
            <CourseInfoCheckList
              items={flexibleScheduleItems}
              gapClassName="gap-[7px]"
            />
          </div>

          <div className="flex min-w-0 flex-col justify-center gap-2.5 pt-5 min-[1024px]:pt-[clamp(4px,1vw,10px)] min-[1024px]:pb-[clamp(8px,1vw,12px)] min-[1024px]:pl-[clamp(18px,2.5vw,34px)]">
            <CourseInfoCheckList
              items={examPreparationItems}
              gapClassName="gap-3"
            />
          </div>

          <div
            className={`mt-5 grid gap-3 border-t pt-5 ${dividerColor} min-[768px]:grid-cols-3 min-[768px]:gap-[clamp(12px,2vw,28px)] min-[1024px]:col-span-2 min-[1024px]:mt-[clamp(22px,2.6vw,32px)] min-[1024px]:pt-[clamp(18px,2vw,24px)]`}
          >
            {contactItems.map(({ Icon, href, label, external }) => (
              <a
                key={href}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener" } : {})}
                className="grid grid-cols-[18px_minmax(0,1fr)] items-center gap-2.5 text-[15.5px] leading-[1.4] font-semibold [overflow-wrap:anywhere] text-[#344767] transition-[color,translate] duration-180 hover:translate-x-0.5 hover:text-[#1747a8] focus-visible:rounded focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#3b82f6] min-[768px]:text-base"
              >
                <Icon
                  aria-hidden="true"
                  className="size-[17px] text-[#b48700]"
                />
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>

        <Link
          href="/quy-dinh-chuong-trinh-hoc-lai-xe/"
          className="mx-auto mt-4 block w-fit max-w-full text-center text-base leading-[1.45] font-bold text-[#1747a8] underline decoration-[#d5a400] decoration-2 underline-offset-4 transition-[translate] duration-180 hover:-translate-y-px focus-visible:rounded focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#3b82f6] min-[768px]:text-[17px]"
        >
          Xem chi tiết quy trình đào tạo
        </Link>
      </div>
    </section>
  );
}

/** Danh sách có dấu ✓ tròn viền vàng (V2 `.course-info-panel__list`). */
function CourseInfoCheckList({
  items,
  gapClassName,
}: {
  items: readonly ReactNode[];
  gapClassName: string;
}) {
  return (
    <ul className={`flex flex-col ${gapClassName}`}>
      {items.map((item, index) => (
        <li
          key={index}
          className="grid grid-cols-[18px_minmax(0,1fr)] items-start gap-[9px] text-[15.5px] leading-[1.55] font-semibold text-[#344767] min-[768px]:text-[17px] [&_strong]:font-extrabold [&_strong]:text-[#1747a8]"
        >
          <span
            aria-hidden="true"
            className="grid size-[18px] place-items-center rounded-full border-[1.5px] border-[#d5a400] text-xs leading-none font-black text-[#ad8000]"
          >
            ✓
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
