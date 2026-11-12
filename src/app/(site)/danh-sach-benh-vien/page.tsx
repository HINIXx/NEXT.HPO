import { StructuredDataJsonLdScript } from "@/components/seo/structured-data-json-ld-script";
import { createBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";
import { DarkNavyLookupToolPageHero } from "@/components/sections/dark-navy-lookup-tool-page-hero";
import { HospitalLookupFilterableDirectory } from "@/features/hospital-lookup/components/hospital-lookup-filterable-directory";
import {
  hospitalDriverExamCount,
  hospitalFacilities,
} from "@/features/hospital-lookup/data/hospital-facility-directory";
import { createPageMetadata } from "@/lib/seo/create-page-metadata";

export const metadata = createPageMetadata({
  title: "Tra cứu bệnh viện khám sức khỏe lái xe | HPO",
  path: "/danh-sach-benh-vien/",
  description:
    "Tra cứu cơ sở khám sức khỏe lái xe ô tô tại TP.HCM và khu vực lân cận dành cho học viên HPO.",
});

const stats = [
  { value: hospitalDriverExamCount, label: "Cơ sở khám lái xe" },
  { value: hospitalFacilities.length, label: "Cơ sở trong dữ liệu" },
];

/** Danh sách bệnh viện (V2 `danh-sach-benh-vien/`): đầu trang navy + số liệu · bộ lọc + thẻ cơ sở · lưu ý. */
export default function HospitalListPage() {
  return (
    <div className="bg-[#f5f7fb]">
      <StructuredDataJsonLdScript
        data={createBreadcrumbJsonLd("/danh-sach-benh-vien/")}
      />
      <DarkNavyLookupToolPageHero
        eyebrow="Tiện ích cho học viên HPO"
        title={
          <>
            Tra cứu nơi khám{" "}
            <em className="whitespace-nowrap">sức khỏe lái xe</em>
          </>
        }
        description="Tìm nhanh bệnh viện, trung tâm y tế và phòng khám có dịch vụ khám sức khỏe dành cho người học lái xe ô tô."
        className="bg-linear-[128deg] from-[#071432] via-[#102962] via-68% to-[#174c98] pt-[52px] pb-[62px] before:bg-[radial-gradient(circle_at_82%_18%,#fff_0_1px,transparent_1.5px)] before:bg-size-[22px_22px] before:opacity-18 min-[761px]:pt-[76px] min-[761px]:pb-[68px]"
        innerClassName="grid items-end gap-[30px] min-[761px]:grid-cols-[minmax(0,1fr)_auto] min-[761px]:gap-16"
        titleClassName="mb-5 max-w-[780px] text-[clamp(38px,5vw,66px)] leading-[1.08] font-bold tracking-[-0.045em]"
        decoration={
          <span
            aria-hidden="true"
            className="font-display absolute top-[-100px] right-[7vw] hidden text-[420px] leading-none font-medium text-white/5.5 min-[761px]:block"
          >
            +
          </span>
        }
        aside={
          <div
            aria-label="Thống kê dữ liệu"
            className="grid grid-cols-1 rounded-[18px] border border-white/18 bg-white/8 backdrop-blur-md min-[421px]:grid-cols-2 min-[761px]:grid-cols-[150px_150px]"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-[22px] [&+&]:border-t [&+&]:border-white/16 min-[421px]:[&+&]:border-t-0 min-[421px]:[&+&]:border-l"
              >
                <strong className="font-display text-emphasis-yellow mb-2 block text-[32px] leading-none font-bold">
                  {stat.value.toLocaleString("vi-VN")}
                </strong>
                <span className="block text-[14px] leading-[1.45] text-white/75">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        }
      />

      <section aria-labelledby="lookup-title" className="pb-[90px]">
        <div className="container-site">
          <HospitalLookupFilterableDirectory />

          <aside
            aria-labelledby="advice-title"
            className="mt-11 flex gap-[18px] rounded-2xl border border-[#d8dfeb] bg-[#eef2f8] px-[18px] py-[21px] min-[761px]:px-7 min-[761px]:py-[25px]"
          >
            <div
              aria-hidden="true"
              className="bg-primary grid size-[34px] flex-none place-items-center rounded-full font-[Georgia,serif] text-base font-bold text-white"
            >
              i
            </div>
            <div>
              <h2
                id="advice-title"
                className="font-display mb-[7px] text-[17px] font-bold"
              >
                Lưu ý trước khi đi khám
              </h2>
              <p className="max-w-[520px] text-[15px] leading-[1.7] text-pretty">
                Thông tin có thể thay đổi theo từng thời điểm. Học viên nên liên
                hệ trực tiếp cơ sở y tế để xác nhận cơ sở còn thực hiện khám sức
                khỏe lái xe và hỏi trước về hồ sơ, ảnh thẻ, thời gian trả kết
                quả.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
