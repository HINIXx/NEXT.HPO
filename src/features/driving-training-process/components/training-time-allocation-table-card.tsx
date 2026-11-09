"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  licenseClassTabs,
  trainingTimeRows,
  type LicenseClassKey,
  type SyllabusModalLink,
  type TrainingTimeRow,
} from "../data/training-time-allocation-table";
import { useSyllabusModalOpener } from "./syllabus-modal-open-context";
import { TrainingTimeAllocationTableLegalNote } from "./training-time-allocation-table-legal-note";

const cellBorder =
  "border border-[#b8c5db] px-2.5 py-[9px] align-middle min-[641px]:px-3 min-[641px]:py-2.5";
const groupToneClassName: Record<"theory" | "practice" | "total", string> = {
  theory: "bg-[#eef4ff] text-ink",
  practice: "bg-[#fff4ed] text-ink",
  total: "bg-ink text-white",
};

/** Ô "Nội dung" bấm được (V2 `.mon-cell`): chữ xanh + "›" trượt khi rê chuột. */
function SyllabusLinkCellContent({
  label,
  link,
  practice,
}: {
  label: string;
  link: SyllabusModalLink;
  practice?: boolean;
}) {
  const open = useSyllabusModalOpener();
  if (!open) return <>{label}</>;
  return (
    <>
      {/* Chữ ẩn giữ chiều cao ô; nút phủ kín ô hiện chữ thật. */}
      <span className="invisible" aria-hidden="true">
        {label}
      </span>
      <button
        type="button"
        // Tên nút = chữ hiện trên ô (V2 dùng aria-label chung "Xem nội dung…" làm 2 dòng thực hành đọc giống nhau).
        title={link.ariaLabel}
        aria-haspopup="dialog"
        onClick={(event) => open(link, event.currentTarget)}
        className={cn(
          "group/mon absolute inset-0 flex w-full items-center pr-7 pl-2.5 text-left font-[inherit] min-[641px]:pr-[38px] min-[641px]:pl-3",
          "transition-colors duration-200 outline-none after:absolute after:top-1/2 after:right-2.5 after:-translate-y-1/2 after:leading-none after:font-extrabold after:transition-transform after:duration-200 after:content-['›'] hover:after:translate-x-1 focus-visible:after:translate-x-1 min-[641px]:after:right-3.5",
          practice
            ? "text-[#c2410c] hover:bg-[#ffe1d2] focus-visible:bg-[#ffe1d2] focus-visible:shadow-[inset_0_0_0_2px_#c2410c]"
            : "text-primary hover:bg-primary-50 hover:text-primary-hover focus-visible:bg-primary-50 focus-visible:shadow-[inset_0_0_0_2px_#1e40af]",
        )}
      >
        {label}
      </button>
    </>
  );
}

function ValueCells({
  row,
  activeClass,
  className,
}: {
  row: TrainingTimeRow;
  activeClass: LicenseClassKey;
  className?: string;
}) {
  return licenseClassTabs.map(({ key }) => (
    <td
      key={key}
      className={cn(
        cellBorder,
        "text-center",
        className,
        key !== activeClass && "max-[640px]:hidden",
      )}
    >
      {row.values[key]}
    </td>
  ));
}

/**
 * Thẻ bảng "Phân bổ thời gian đào tạo xe ô tô" (V2 `.training-table-card`):
 * ≥641px bảng đủ 3 hạng (cuộn ngang nếu hẹp, tối thiểu 1120px); ≤640px 3 nút chọn hạng + bảng 4 cột.
 * Ghi chú điểm b, khoản 2, điều 6 TT 14/2025 đặt ngoài bảng (V2 04/11).
 */
export function TrainingTimeAllocationTableCard() {
  const [activeClass, setActiveClass] = useState<LicenseClassKey>("bauto");
  const activeLabel = licenseClassTabs.find(
    (tab) => tab.key === activeClass,
  )?.label;

  return (
    <section
      aria-labelledby="training-table-title"
      data-reveal
      className="mt-7 overflow-hidden rounded-[18px] border border-[#dbe3f0] bg-white shadow-[0_10px_26px_rgba(10,19,48,0.07)] min-[641px]:rounded-3xl"
    >
      <div className="grid justify-items-center border-b border-[#dbe3f0] bg-[linear-gradient(180deg,#fbfcff,#fff)] p-5 text-center min-[641px]:p-6 lg:px-7 lg:pt-7 lg:pb-[22px]">
        <h3
          id="training-table-title"
          className="font-display text-ink max-w-[820px] text-[clamp(21px,1.8vw,24px)] leading-[1.18] font-bold"
        >
          Phân bổ thời gian đào tạo xe ô tô
        </h3>
        <span className="pt-3 text-[16px]">
          Quy định tại Khoản 1, Điều 2 thông tư 17/2026/TT-BXD
        </span>
      </div>

      <div
        role="tablist"
        aria-label="Chọn hạng giấy phép lái xe"
        className="hidden grid-cols-3 gap-2 border-b border-[#dbe3f0] bg-[linear-gradient(180deg,#fbfcff,#fff)] px-[18px] pt-[18px] pb-1 max-[640px]:grid"
      >
        {licenseClassTabs.map((tab) => {
          const isActive = tab.key === activeClass;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveClass(tab.key)}
              className={cn(
                "font-display min-h-12 rounded-xl border-[1.5px] px-1.5 py-2 text-[16px] leading-[1.2] font-bold tracking-[0.01em] transition-[background-color,border-color,color,box-shadow,translate] duration-200",
                isActive
                  ? "border-primary bg-primary -translate-y-px text-white shadow-[0_10px_22px_-10px_rgba(30,64,175,0.45)]"
                  : "text-ink hover:border-primary hover:text-primary-hover border-[#b8c5db] bg-white",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        role="region"
        aria-label="Bảng khung chương trình đào tạo"
        tabIndex={0}
        className="[scrollbar-width:thin] [scrollbar-color:#b8c5db_transparent] overflow-x-auto focus:outline-[3px] focus:-outline-offset-[3px] focus:outline-[rgba(30,64,175,0.18)] max-[640px]:overflow-x-visible"
      >
        <table className="text-ink w-full border-collapse text-[15px] leading-[1.4] min-[641px]:min-w-[1120px] min-[641px]:table-fixed min-[641px]:text-[16px]">
          <caption className="sr-only">
            Khung chương trình đào tạo lái xe ô tô theo hạng giấy phép lái xe
          </caption>
          <colgroup>
            <col className="min-[641px]:w-[72px]" />
            <col className="min-[641px]:w-[410px]" />
            <col className="min-[641px]:w-[110px]" />
            {licenseClassTabs.map((tab) => (
              <col
                key={tab.key}
                className={cn(
                  "min-[641px]:w-[176px]",
                  tab.key !== activeClass && "max-[640px]:hidden",
                )}
              />
            ))}
          </colgroup>
          <thead className="font-display text-center text-[15px] font-extrabold text-white">
            <tr className="bg-primary-900 max-[640px]:hidden">
              <th scope="col" rowSpan={3} className={cellBorder}>
                STT
              </th>
              <th scope="col" rowSpan={3} className={cellBorder}>
                Nội dung
              </th>
              <th scope="col" rowSpan={3} className={cellBorder}>
                Đơn vị tính
              </th>
              <th scope="colgroup" colSpan={3} className={cellBorder}>
                Hạng giấy phép lái xe
              </th>
            </tr>
            <tr className="bg-primary-hover max-[640px]:hidden">
              <th scope="colgroup" colSpan={2} className={cellBorder}>
                Hạng B
              </th>
              <th scope="col" rowSpan={2} className={cellBorder}>
                Hạng C1
              </th>
            </tr>
            <tr className="bg-primary font-sans font-bold max-[640px]:hidden">
              <th scope="col" className={cellBorder}>
                Học xe chuyển số tự động
                <br />
                (bao gồm cả xe ô tô điện)
              </th>
              <th scope="col" className={cellBorder}>
                Học xe chuyển số cơ khí
                <br />
                (số sàn)
              </th>
            </tr>
            <tr className="bg-primary hidden text-[14px] max-[640px]:table-row">
              <th scope="col" className="border border-[#b8c5db] px-2 py-2.5">
                STT
              </th>
              <th scope="col" className="border border-[#b8c5db] px-2 py-2.5">
                Nội dung
              </th>
              <th scope="col" className="border border-[#b8c5db] px-2 py-2.5">
                Đơn vị
              </th>
              <th scope="col" className="border border-[#b8c5db] px-2 py-2.5">
                {activeLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            {trainingTimeRows.map((row, rowIndex) =>
              row.kind === "group" ? (
                <tr
                  key={rowIndex}
                  className={cn(
                    "font-display font-extrabold",
                    groupToneClassName[row.tone],
                  )}
                >
                  <th
                    scope="row"
                    colSpan={2}
                    className={cn(cellBorder, "relative text-left font-bold")}
                  >
                    {row.syllabus ? (
                      <>
                        <SyllabusLinkCellContent
                          label={row.label}
                          link={row.syllabus}
                          practice={row.tone === "practice"}
                        />
                      </>
                    ) : (
                      row.label
                    )}
                  </th>
                  <td className={cn(cellBorder, "text-center")}>{row.unit}</td>
                  <ValueCells row={row} activeClass={activeClass} />
                </tr>
              ) : (
                <tr key={rowIndex} className="hover:bg-primary-50">
                  {row.orderRowSpan === 0 ? null : (
                    <td
                      rowSpan={row.orderRowSpan}
                      className={cn(cellBorder, "text-center font-bold")}
                    >
                      {row.order}
                    </td>
                  )}
                  <th
                    scope="row"
                    className={cn(
                      cellBorder,
                      "relative text-left font-bold",
                      row.syllabus && "pr-7 min-[641px]:pr-[38px]",
                    )}
                  >
                    {row.syllabus ? (
                      <>
                        <SyllabusLinkCellContent
                          label={row.label}
                          link={row.syllabus}
                        />
                      </>
                    ) : (
                      row.label
                    )}
                  </th>
                  <td className={cn(cellBorder, "text-center")}>{row.unit}</td>
                  <ValueCells row={row} activeClass={activeClass} />
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>

      <TrainingTimeAllocationTableLegalNote />
    </section>
  );
}
