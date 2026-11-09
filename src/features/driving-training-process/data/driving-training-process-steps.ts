/**
 * 5 bước quy trình đào tạo (V2 `quy-dinh-chuong-trinh-hoc-lai-xe/index.html` @0709939):
 * dùng cho thẻ tóm tắt ở đầu trang (`overviewTitle` + `overviewSummary`) và thanh bước dính (`navLabel`).
 * `sectionId` = id section trên trang (giữ như V2 để link #tuyen-sinh… cũ vẫn chạy).
 */
export type TrainingProcessStep = {
  number: number;
  sectionId: string;
  overviewTitle: string;
  overviewSummary: string;
  navLabel: string;
};

export const trainingProcessSteps: readonly TrainingProcessStep[] = [
  {
    number: 1,
    sectionId: "tuyen-sinh",
    overviewTitle: "Tuyển sinh",
    overviewSummary: "Chuẩn bị giấy tờ, đăng ký và đóng học phí",
    navLabel: "Tuyển sinh",
  },
  {
    number: 2,
    sectionId: "dao-tao",
    overviewTitle: "Chương trình đào tạo",
    overviewSummary: "Tổng 196 đến 237 giờ, tùy hạng bằng",
    navLabel: "Chương trình đào tạo",
  },
  {
    number: 3,
    sectionId: "hoan-thanh",
    overviewTitle: "Kiểm tra hoàn thành khoá đào tạo",
    overviewSummary: "Học đủ giờ, đạt các bài kiểm tra cuối khóa",
    navLabel: "Kiểm tra hoàn thành khoá đào tạo",
  },
  {
    number: 4,
    sectionId: "sat-hach",
    overviewTitle: "Sát hạch",
    overviewSummary: "Lý thuyết, thực hành trên hình, thực hành trên đường",
    navLabel: "Sát hạch",
  },
  {
    number: 5,
    sectionId: "gplx",
    overviewTitle: "Nhận giấy phép lái xe",
    overviewSummary: "GPLX điện tử trong 02 giờ sau khi thi đạt",
    navLabel: "Nhận GPLX",
  },
];

/** Thư mục ảnh riêng của trang (giữ URL V2). */
export const trainingProcessImageBase =
  "/quy-dinh-chuong-trinh-hoc-lai-xe/assets/images";
