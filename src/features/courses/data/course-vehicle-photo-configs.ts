/**
 * Xe ẢNH THẬT (đã tách nền, góc 3/4) cho sân khấu trong thẻ khóa học — V2 `assets/js/courses-demo-vehicle-config.js`.
 * Tọa độ tính theo % kích thước ảnh thân xe nên xe co giãn bao nhiêu cũng khớp:
 *  - wheels: mâm (ảnh tròn) — x, y = tâm (% rộng, % cao) · d = đường kính (% rộng thân xe)
 *            matrix = CSS matrix(a, b, c, d) ép hình tròn về đúng elip phối cảnh của ảnh gốc
 *  - tyres:  điểm lốp chạm đất (đặt bóng tiếp xúc)
 *  - yaw:    góc đường nối 2 bánh cùng bên trên ảnh (độ) → xoay bóng gầm xe
 *  - roadYaw: góc xoay làn đường trên mặt đất (độ) để vạch kẻ song song hướng xe
 *  - spin:   hệ số thời gian quay mâm so với chu kỳ mặt đường (lớn hơn = quay chậm hơn)
 *  - scale:  hệ số kích thước hiển thị (xe tải cao hơn nên thu nhỏ để vừa khung)
 * Số liệu đo tự động từ ảnh gốc (Vision tách nền + fit elip mâm) — không sửa tay.
 */
export type VehiclePhotoConfig = {
  body: string;
  alt: string;
  width: number;
  height: number;
  wheels: readonly {
    src: string;
    x: number;
    y: number;
    d: number;
    matrix: readonly [number, number, number, number];
  }[];
  tyres: readonly [{ x: number; y: number }, { x: number; y: number }];
  yaw: number;
  roadYaw: number;
  spin: number;
  scale: number;
};

const vehicleImage = (name: string) =>
  `/assets/images/courses-demo/vehicles/${name}`;

export const vehiclePhotoConfigs = {
  "hang-b-vios": {
    body: vehicleImage("hang-b-vios-than-xe.webp"),
    alt: "Xe tập lái hạng B – Toyota Vios",
    width: 2959,
    height: 1564,
    wheels: [
      {
        src: vehicleImage("hang-b-vios-mam-sau.webp"),
        x: 6.887,
        y: 59.405,
        d: 10.958,
        matrix: [0.0391, 0.9992, -0.4249, 0.0166],
      },
      {
        src: vehicleImage("hang-b-vios-mam-truoc.webp"),
        x: 44.454,
        y: 79.425,
        d: 14.9,
        matrix: [0.1239, 0.9923, -0.5352, 0.0668],
      },
    ],
    tyres: [
      { x: 6.887, y: 73.849 },
      { x: 44.454, y: 99.233 },
    ],
    yaw: 19.65,
    roadYaw: 24,
    spin: 2.4,
    scale: 1,
  },
  "hang-c1-kia-k200": {
    body: vehicleImage("hang-c1-kia-k200-than-xe.webp"),
    alt: "Xe tập lái hạng C1 – Kia K200 thùng mui bạt",
    width: 3088,
    height: 2369,
    wheels: [
      {
        src: vehicleImage("hang-c1-kia-k200-mam-sau.webp"),
        x: 10.826,
        y: 76.45,
        d: 7.834,
        matrix: [0.0264, 0.9997, -0.3313, 0.0087],
      },
      {
        src: vehicleImage("hang-c1-kia-k200-mam-truoc.webp"),
        x: 38.578,
        y: 85.749,
        d: 13.499,
        matrix: [0.0976, 0.9952, -0.4454, 0.0437],
      },
    ],
    tyres: [
      { x: 10.826, y: 84.339 },
      { x: 38.578, y: 99.451 },
    ],
    yaw: 22.67,
    roadYaw: 27,
    spin: 2.2,
    scale: 0.74,
  },
} as const satisfies Record<string, VehiclePhotoConfig>;

export type VehiclePhotoKey = keyof typeof vehiclePhotoConfigs;
