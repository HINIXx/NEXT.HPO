/** 5 nhóm biển báo hiệu (V2 `.bb-card` / `.mon-bb-card`): bấm → trang xem biển báo tại nhóm đó. */
export type RoadSignGroup = {
  target: string;
  name: string;
  iconSrc: string;
  shape: string;
  colorLabel: string;
  colorTone: "red" | "yellow" | "blue" | "gray";
  styleCount: number;
};

export const roadSignGroups: readonly RoadSignGroup[] = [
  {
    target: "bien-cam",
    name: "1. Biển báo cấm",
    iconSrc: "/assets/images/bienbao/bbcam.png",
    shape: "Tròn",
    colorLabel: "Viền đỏ",
    colorTone: "red",
    styleCount: 63,
  },
  {
    target: "nguy-hiem",
    name: "2. Biển nguy hiểm",
    iconSrc: "/assets/images/bienbao/bbNguyHiem.png",
    shape: "Tam giác",
    colorLabel: "Vàng",
    colorTone: "yellow",
    styleCount: 83,
  },
  {
    target: "hieu-lenh",
    name: "3. Biển hiệu lệnh",
    iconSrc: "/assets/images/bienbao/bbHieuLenh.png",
    shape: "Tròn",
    colorLabel: "Nền xanh",
    colorTone: "blue",
    styleCount: 65,
  },
  {
    target: "chi-dan",
    name: "4. Biển chỉ dẫn",
    iconSrc: "/assets/images/bienbao/bbChiDan.png",
    shape: "Chữ nhật",
    colorLabel: "Xanh",
    colorTone: "blue",
    styleCount: 92,
  },
  {
    target: "bien-phu",
    name: "5. Biển phụ",
    iconSrc: "/assets/images/bienbao/bbPhu.png",
    shape: "Chữ nhật",
    colorLabel: "Trắng",
    colorTone: "gray",
    styleCount: 31,
  },
];

/** Màu chữ nhãn màu biển (đủ tương phản trên nền trắng; vàng thật #faec1a không dùng làm chữ). */
export const roadSignColorTextClassName: Record<
  RoadSignGroup["colorTone"],
  string
> = {
  red: "text-[#dc2626]",
  yellow: "text-[#a16207]",
  blue: "text-primary",
  gray: "text-[#334155]",
};
