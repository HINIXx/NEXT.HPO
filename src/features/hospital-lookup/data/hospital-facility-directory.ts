import rawFacilities from "./hospital-facilities.json";

/**
 * Danh sách cơ sở khám sức khỏe — chép nguyên V2 `danh-sach-benh-vien/data.json` @ 0709939 (291 cơ sở).
 * Tên khu vực chưa chuẩn hóa ("TX Dĩ An" / "thành phố Dĩ An"…) là dữ liệu gốc, không tự sửa.
 */
export type HospitalFacility = {
  id: number;
  ten: string;
  lienHe: string;
  dienThoai: string;
  kskThongThuong: boolean;
  kskNuocNgoai: boolean;
  kskLaiXe: boolean;
  diaChi: string;
  quanHuyen: string;
  ghiChu: string;
  map: string;
  diaChiMoi: string;
};

export const hospitalFacilities: readonly HospitalFacility[] = rawFacilities;

export type HospitalServiceFilter = "driver" | "foreign" | "all";

export const hospitalServiceOptions: readonly {
  value: HospitalServiceFilter;
  label: string;
}[] = [
  { value: "driver", label: "Khám sức khỏe lái xe" },
  { value: "foreign", label: "Khám cho người nước ngoài" },
  { value: "all", label: "Tất cả cơ sở" },
];

/** Số thẻ mỗi trang kết quả. */
export const HOSPITAL_PAGE_SIZE = 12;

/** Bỏ dấu + chữ thường để tìm "an binh" ra "An Bình". */
export const normalizeForSearch = (value = "") =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();

const isDistrictNumber = (value: string) => /^\d+$/.test(value.trim());

/** Nhãn trong ô chọn khu vực: "1" → "Quận 1". */
export const districtOptionLabel = (value: string) =>
  isDistrictNumber(value) ? `Quận ${value}` : value;

/** Nhãn dưới tên cơ sở: "1" → "Quận 1", "Gò Vấp" → "Khu vực Gò Vấp". */
export const districtCardLabel = (value: string) =>
  value
    ? isDistrictNumber(value)
      ? `Quận ${value}`
      : `Khu vực ${value}`
    : "Chưa phân khu vực";

/** Số gọi được: chỉ giữ chữ số, tối đa 11 (dữ liệu có ô ghi 2 số). */
export const facilityPhoneHref = (value: string) =>
  value.replace(/\D/g, "").slice(0, 11);

/** Khu vực có trong dữ liệu, xếp theo tiếng Việt (số đứng trước, so số tự nhiên). */
export const hospitalDistricts: readonly string[] = [
  ...new Set(hospitalFacilities.map((item) => item.quanHuyen).filter(Boolean)),
].sort((a, b) => a.localeCompare(b, "vi", { numeric: true }));

export const hospitalDriverExamCount = hospitalFacilities.filter(
  (item) => item.kskLaiXe,
).length;

export function filterHospitalFacilities({
  query,
  district,
  service,
}: {
  query: string;
  district: string;
  service: HospitalServiceFilter;
}) {
  const normalizedQuery = normalizeForSearch(query);
  return hospitalFacilities.filter((item) => {
    const searchable = normalizeForSearch(
      [item.ten, item.diaChi, item.diaChiMoi, item.quanHuyen].join(" "),
    );
    const serviceMatch =
      service === "all" ||
      (service === "driver" && item.kskLaiXe) ||
      (service === "foreign" && item.kskNuocNgoai);
    return (
      (!normalizedQuery || searchable.includes(normalizedQuery)) &&
      (!district || item.quanHuyen === district) &&
      serviceMatch
    );
  });
}
