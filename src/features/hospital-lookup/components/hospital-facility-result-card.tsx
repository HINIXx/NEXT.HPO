import {
  districtCardLabel,
  facilityPhoneHref,
  type HospitalFacility,
} from "../data/hospital-facility-directory";

const badgeClassName = "rounded-[7px] px-[9px] py-[7px] text-[13px] font-bold";
const actionClassName =
  "inline-flex min-h-11 items-center justify-center gap-[7px] rounded-[9px] text-[15px] font-bold only:col-span-full";

/** Thẻ 1 cơ sở khám (V2 `.hospital-card`): số thứ tự · tên + khu vực · địa chỉ mới · nhãn dịch vụ · ghi chú · liên hệ · Gọi/Bản đồ. */
export function HospitalFacilityResultCard({
  facility,
  order,
}: {
  facility: HospitalFacility;
  /** Số thứ tự trong toàn bộ kết quả (bắt đầu từ 1). */
  order: number;
}) {
  const phone = facilityPhoneHref(facility.dienThoai);
  const address =
    facility.diaChiMoi || facility.diaChi || "Chưa cập nhật địa chỉ";

  return (
    <article className="flex min-h-full flex-col rounded-[18px] border border-[#e0e5ed] bg-white p-[22px] shadow-[0_8px_24px_rgba(8,21,54,0.045)] transition-[translate,box-shadow,border-color] duration-200 hover:-translate-y-[3px] hover:border-[#bdc9e3] hover:shadow-[0_14px_32px_rgba(8,21,54,0.09)]">
      <div className="flex items-start gap-[13px]">
        <span className="font-display bg-ink grid size-[38px] flex-none place-items-center rounded-[10px] text-[14px] font-bold text-white">
          {String(order).padStart(2, "0")}
        </span>
        <div>
          <h3 className="font-display text-ink mt-px mb-[7px] text-[17px] leading-[1.45] font-bold text-balance">
            {facility.ten}
          </h3>
          <span className="text-primary inline-flex text-[14px] font-bold">
            {districtCardLabel(facility.quanHuyen)}
          </span>
        </div>
      </div>

      <p className="mt-[18px] mb-3 text-[15px] leading-[1.65] text-pretty">
        <span className="mb-[3px] block text-[13px] font-bold tracking-[0.08em] uppercase">
          Địa chỉ mới
        </span>
        {address}
      </p>

      <div className="mb-[13px] flex flex-wrap gap-1.5">
        {facility.kskLaiXe && (
          <span className={`${badgeClassName} bg-[#edf7ee] text-[#15803d]`}>
            Khám sức khỏe lái xe
          </span>
        )}
        {facility.kskNuocNgoai && (
          <span className={`${badgeClassName} bg-[#fff6dc] text-[#78350f]`}>
            Khám người nước ngoài
          </span>
        )}
      </div>

      {facility.ghiChu && (
        <p className="mb-[15px] border-l-3 border-[#e4b742] bg-[#fffaf0] px-[13px] py-[11px] text-[15px] leading-[1.6] text-pretty text-[#78350f]">
          {facility.ghiChu}
        </p>
      )}

      {(facility.lienHe || facility.dienThoai) && (
        <div className="mt-auto border-t border-[#edf0f5] pt-3.5 text-[15px] leading-normal [&_p]:mb-[5px]">
          {facility.lienHe && (
            <p>
              Liên hệ: <strong>{facility.lienHe}</strong>
            </p>
          )}
          {facility.dienThoai && (
            <p>
              Điện thoại: <strong>{facility.dienThoai}</strong>
            </p>
          )}
        </div>
      )}

      <div className="mt-3.5 grid grid-cols-1 gap-2 min-[421px]:grid-cols-2">
        {phone && (
          <a
            className={`${actionClassName} text-primary bg-[#edf2ff]`}
            href={`tel:${phone}`}
          >
            Gọi điện
          </a>
        )}
        {facility.map && (
          <a
            className={`${actionClassName} bg-primary text-white`}
            href={facility.map}
            target="_blank"
            rel="noopener"
          >
            Xem bản đồ ↗
          </a>
        )}
      </div>
    </article>
  );
}
