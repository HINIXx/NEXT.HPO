import type { VehiclePhotoKey } from "./course-vehicle-photo-configs";

/**
 * Học phí + thời gian học 3 hạng — V2 khối "KHÓA HỌC CỦA CHÚNG TÔI" (trang chủ, Học phí, TT GDNN @ 0709939: 16/16/18 triệu).
 * Trang Chương trình ưu đãi dùng giá riêng `promotionTuitionByCourseId` (15/15/17 triệu). Không tự sửa số liệu.
 */
export type CourseTuitionOffering = {
  /** Mã thẻ (V2 `data-course`), cũng là id phần neo giá `gia-<…>`. */
  id: string;
  badge: string;
  className: string;
  vehicleType: string;
  tuition: string;
  duration: string;
  priceListId: string;
  vehicle: VehiclePhotoKey;
};

export const courseTuitionOfferings: readonly CourseTuitionOffering[] = [
  {
    id: "hang-b-so-tu-dong",
    badge: "B",
    className: "Hạng B",
    vehicleType: "Số tự động",
    tuition: "16.000.000đ",
    duration: "2 tháng",
    priceListId: "gia-hang-b-tu-dong",
    vehicle: "hang-b-vios",
  },
  {
    id: "hang-b-so-co-khi",
    badge: "B",
    className: "Hạng B",
    vehicleType: "Số cơ khí",
    tuition: "16.000.000đ",
    duration: "2 tháng",
    priceListId: "gia-hang-b-co-khi",
    vehicle: "hang-b-vios",
  },
  {
    id: "hang-c1",
    badge: "C1",
    className: "Hạng C1",
    vehicleType: "Xe tải",
    tuition: "18.000.000đ",
    duration: "3 tháng",
    priceListId: "gia-hang-c1",
    vehicle: "hang-c1-kia-k200",
  },
];

/** Học phí trên trang Chương trình ưu đãi (V2 `chuong-trinh-uu-dai/index.html` @0709939). */
export const promotionTuitionByCourseId: Readonly<Record<string, string>> = {
  "hang-b-so-tu-dong": "15.000.000đ",
  "hang-b-so-co-khi": "15.000.000đ",
  "hang-c1": "17.000.000đ",
};

/** Hạn đăng ký ưu đãi học phí (cụm "Thời gian áp dụng" dưới 3 thẻ). */
export const courseTuitionPromoDeadline = "31/01/2027";
