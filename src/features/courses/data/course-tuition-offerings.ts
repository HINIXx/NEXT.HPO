import type { VehiclePhotoKey } from "./course-vehicle-photo-configs";

/**
 * Học phí + thời gian học 3 hạng — V2 khối "KHÓA HỌC CỦA CHÚNG TÔI" (giống nhau ở trang chủ, Học phí,
 * TT GDNN, Ưu đãi @ 0709939). Đổi giá/hạn ở ĐÂY là đổi cả 4 trang. Không tự sửa số liệu.
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

/** Hạn đăng ký ưu đãi học phí (cụm "Thời gian áp dụng" dưới 3 thẻ). */
export const courseTuitionPromoDeadline = "31/01/2027";
