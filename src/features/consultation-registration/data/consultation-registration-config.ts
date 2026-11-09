/**
 * Form "Đăng ký tư vấn" (V2 `chuong-trinh-uu-dai/dang-ky-uu-dai-form.js`, dùng chung trang Ưu đãi + trang chủ).
 * Gửi về Google Sheet qua Web App Google Apps Script (tài khoản hiepphat276q11, Sheet 1994IXZ…), kiểu `no-cors`:
 * trình duyệt không đọc được phản hồi → không lỗi mạng = coi như đã gửi. Hướng dẫn tạo Sheet:
 * `../WEB-HPO-V2/plans/handoff-form-dang-ky-uu-dai/HUONG-DAN-GOOGLE-SHEET.md`.
 * Đổi link Web App → sửa `consultationRegistrationEndpoint`; để "" thì form chỉ hiện số tổng đài.
 */
export const consultationRegistrationEndpoint =
  "https://script.google.com/macros/s/AKfycbxIQJHCUKc_XqND3BgMYyrNQJiUs6iqGSvALTr_jOhLjk4tjHMi5SNdsdGDvhMs8b8jCA/exec";

/** 4 lựa chọn hạng (giá trị gửi lên Sheet giữ đúng V2). */
export const trainingClassOptions = [
  { value: "Hạng B - Số tự động", label: "Hạng B", note: "Số tự động" },
  { value: "Hạng B - Số cơ khí", label: "Hạng B", note: "Số cơ khí" },
  { value: "Hạng C1 - Xe tải", label: "Hạng C1", note: "Xe tải" },
  { value: "Chưa xác định", label: "Chưa xác định", note: "Cần tư vấn thêm" },
] as const;

/** "0911.739.119" / "+84 911 739 119" → "0911739119"; "" nếu không hợp lệ (10–11 số, bắt đầu 0). */
export function normalizeVietnamesePhone(value: string): string {
  let digits = value.replace(/[\s.\-()]/g, "");
  if (digits.startsWith("+84")) digits = `0${digits.slice(3)}`;
  else if (digits.startsWith("84") && digits.length === 11)
    digits = `0${digits.slice(2)}`;
  return /^0\d{9,10}$/.test(digits) ? digits : "";
}

/** Dữ liệu ưu đãi theo xã (`public/chuong-trinh-uu-dai/data/<mã>.json`, hướng dẫn V2 `chuong-trinh-uu-dai/HUONG-DAN.md`). */
export type PromotionAreaRecord = {
  maXa: string;
  tenXa: string;
  trangThai?: string;
  hocPhiUuDai?: number;
  hangXeApDung?: string;
  ngayBatDau?: string;
  ngayKetThuc?: string;
  tongDai?: string;
};

export type PromotionArea = {
  /** Gửi vào cột "Xã (ưu đãi)": "Tân Nhựt" (bỏ chữ "xã"); chưa có file JSON → mã bỏ số ("TanNhut"). */
  sheetName: string;
  /** Tên hiển thị "xã Tân Nhựt"; trống khi chưa tải được file. */
  displayName?: string;
  /** "31/12/2026" từ `ngayKetThuc`. */
  endDate?: string;
  appliesTo?: string;
};

const normalizeCode = (value: string) =>
  value.toLowerCase().replace(/[-_\s]/g, "");
const formatIsoDate = (iso: string) => {
  const parts = iso.split("-");
  return parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : iso;
};

/**
 * Đọc `?location=` (link QR tờ rơi từng xã) → file `<mã bỏ số>.json`. Chỉ nhận a–z, 0–9 dài 2–40 (không đọc được file khác).
 * Mã trên link phải khớp `maXa` trong file. Trả null khi không có location hợp lệ.
 */
export async function loadPromotionAreaFromLocation(
  search: string,
): Promise<PromotionArea | null> {
  const raw = (new URLSearchParams(search).get("location") ?? "").trim();
  const code = normalizeCode(raw);
  if (!/^[a-z0-9]{2,40}$/.test(code)) return null;
  const fileCode = code.replace(/\d+$/, "");
  if (!fileCode) return null;
  const fallback: PromotionArea = {
    sheetName: raw
      .replace(/[-_\s]/g, "")
      .replace(/\d+$/, "")
      .slice(0, 80),
  };
  try {
    const response = await fetch(`/chuong-trinh-uu-dai/data/${fileCode}.json`, {
      cache: "no-cache",
    });
    if (!response.ok) return fallback;
    const record = (await response.json()) as PromotionAreaRecord;
    if (!record.tenXa || normalizeCode(record.maXa ?? "") !== code)
      return fallback;
    return {
      sheetName: record.tenXa
        .replace(/^\s*(xã|phường|thị trấn)\s+/i, "")
        .trim(),
      displayName: record.tenXa,
      endDate: record.ngayKetThuc
        ? formatIsoDate(record.ngayKetThuc)
        : undefined,
      appliesTo: record.hangXeApDung || undefined,
    };
  } catch {
    return fallback;
  }
}
