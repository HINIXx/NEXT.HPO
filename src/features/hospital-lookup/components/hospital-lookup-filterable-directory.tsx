"use client";

import { Search } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import {
  HOSPITAL_PAGE_SIZE,
  districtOptionLabel,
  filterHospitalFacilities,
  hospitalDistricts,
  hospitalServiceOptions,
  type HospitalServiceFilter,
} from "../data/hospital-facility-directory";
import { HospitalFacilityResultCard } from "./hospital-facility-result-card";
import { HospitalResultsPaginationNav } from "./hospital-results-pagination-nav";

const fieldControlClassName =
  "text-ink h-[50px] w-full rounded-[11px] border border-[#dbe1eb] bg-[#f9fafc] text-[15px] font-medium outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-slate-500 focus:border-[#6287dc] focus:shadow-[0_0_0_3px_rgba(46,91,191,0.12)]";
const fieldLabelClassName = "text-[15px] font-bold";
const solidButtonClassName =
  "font-display h-12 cursor-pointer rounded-[11px] px-[18px] text-[15px] font-bold";

/**
 * Bộ lọc + danh sách cơ sở khám (V2 `danh-sach-benh-vien/script.js`). Lọc ngay khi gõ/chọn, 12 thẻ/trang.
 * Trạng thái đầu (khám lái xe, trang 1) được render sẵn lúc build → HTML có sẵn 12 cơ sở đầu cho SEO.
 */
export function HospitalLookupFilterableDirectory() {
  const [query, setQuery] = useState("");
  const [district, setDistrict] = useState("");
  const [service, setService] = useState<HospitalServiceFilter>("driver");
  const [page, setPage] = useState(1);
  const searchRef = useRef<HTMLInputElement>(null);
  const resultsHeadRef = useRef<HTMLDivElement>(null);

  const results = useMemo(
    () => filterHospitalFacilities({ query, district, service }),
    [query, district, service],
  );
  const totalPages = Math.ceil(results.length / HOSPITAL_PAGE_SIZE);
  const currentPage = Math.min(page, Math.max(totalPages, 1));
  const start = (currentPage - 1) * HOSPITAL_PAGE_SIZE;
  const pageItems = results.slice(start, start + HOSPITAL_PAGE_SIZE);

  /** Đổi bộ lọc → về trang 1. */
  const updateFilter = (apply: () => void) => {
    apply();
    setPage(1);
  };

  const resetFilters = () => {
    updateFilter(() => {
      setQuery("");
      setDistrict("");
      setService("driver");
    });
    searchRef.current?.focus();
  };

  const goToPage = (nextPage: number) => {
    setPage(nextPage);
    resultsHeadRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <div className="relative z-2 -mt-[26px] rounded-[22px] border border-[#e1e6ef] bg-white px-[18px] py-[22px] shadow-[0_18px_50px_rgba(8,21,54,0.1)] min-[761px]:p-[30px]">
        <div className="mb-6 min-[761px]:flex min-[761px]:items-end min-[761px]:justify-between min-[761px]:gap-10">
          <div>
            <p className="font-display text-primary mb-2 text-[14px] leading-[1.3] font-bold tracking-[0.1em] uppercase">
              Danh sách cơ sở y tế
            </p>
            <h2
              id="lookup-title"
              className="font-display text-[clamp(24px,3vw,34px)] leading-[1.2] font-bold tracking-[-0.03em] text-balance"
            >
              Chọn nơi khám thuận tiện
            </h2>
          </div>
          <p className="mt-3 max-w-[430px] text-[15px] leading-[1.65] text-pretty min-[761px]:mt-0">
            Nên gọi xác nhận lịch khám, chi phí và giấy tờ cần mang theo trước
            khi đến.
          </p>
        </div>

        <form
          role="search"
          onSubmit={(event) => event.preventDefault()}
          className="grid items-end gap-3 min-[761px]:grid-cols-2 min-[1051px]:grid-cols-[minmax(280px,1.6fr)_minmax(175px,0.7fr)_minmax(210px,0.8fr)_auto]"
        >
          <label className="grid gap-2 min-[761px]:col-span-full min-[1051px]:col-span-1">
            <span className={fieldLabelClassName}>
              Tìm theo tên hoặc địa chỉ
            </span>
            <span className="relative">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3.5 size-[18px] -translate-y-1/2 text-[#78849b]"
              />
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(event) =>
                  updateFilter(() => setQuery(event.target.value))
                }
                placeholder="Ví dụ: Bệnh viện An Bình, Nguyễn Trãi…"
                autoComplete="off"
                className={`${fieldControlClassName} pr-3.5 pl-[43px]`}
              />
            </span>
          </label>
          <label className="grid gap-2">
            <span className={fieldLabelClassName}>Khu vực</span>
            <select
              value={district}
              onChange={(event) =>
                updateFilter(() => setDistrict(event.target.value))
              }
              className={`${fieldControlClassName} pr-[38px] pl-[13px]`}
            >
              <option value="">Tất cả khu vực</option>
              {hospitalDistricts.map((name) => (
                <option key={name} value={name}>
                  {districtOptionLabel(name)}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2">
            <span className={fieldLabelClassName}>Nhu cầu khám</span>
            <select
              value={service}
              onChange={(event) =>
                updateFilter(() =>
                  setService(event.target.value as HospitalServiceFilter),
                )
              }
              className={`${fieldControlClassName} pr-[38px] pl-[13px]`}
            >
              {hospitalServiceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={resetFilters}
            className={`${solidButtonClassName} text-primary bg-[#edf2ff]`}
          >
            Đặt lại
          </button>
        </form>
      </div>

      <div
        ref={resultsHeadRef}
        className="mx-0.5 mt-[34px] mb-[18px] scroll-mt-[140px]"
      >
        <p aria-live="polite" className="text-base font-bold">
          {results.length.toLocaleString("vi-VN")} cơ sở phù hợp
        </p>
      </div>

      {results.length > 0 ? (
        <div className="grid gap-[18px] min-[761px]:grid-cols-2 min-[1051px]:grid-cols-3">
          {pageItems.map((facility, index) => (
            <HospitalFacilityResultCard
              key={facility.id}
              facility={facility}
              order={start + index + 1}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-[18px] border border-dashed border-[#cbd3e1] bg-white px-5 py-[58px] text-center">
          <strong className="font-display mb-2 block text-[18px] font-bold">
            Chưa tìm thấy cơ sở phù hợp
          </strong>
          <p>Hãy thử tên khác, bỏ chọn khu vực hoặc thay đổi nhu cầu khám.</p>
          <button
            type="button"
            onClick={resetFilters}
            className={`${solidButtonClassName} bg-primary mt-2.5 text-white`}
          >
            Xem tất cả cơ sở khám lái xe
          </button>
        </div>
      )}

      <HospitalResultsPaginationNav
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />
    </>
  );
}
