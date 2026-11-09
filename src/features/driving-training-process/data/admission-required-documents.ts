import { trainingProcessImageBase } from "./driving-training-process-steps";

/** Kiểu hình minh họa của thẻ giấy tờ (V2: cccd-stack, vneid-container, gplx-stack, sdt-container, photo-stack, ảnh tĩnh). */
export type AdmissionDocumentIllustration =
  | {
      kind: "flip-card";
      frontSrc: string;
      backSrc: string;
      width: number;
      height: number;
    }
  | { kind: "vneid-phone"; src: string }
  | { kind: "calling-phone"; src: string }
  | { kind: "photo-fan"; src: string }
  | { kind: "floating-image"; src: string };

export type AdmissionRequiredDocument = {
  index: string;
  title: string;
  description?: string;
  illustration: AdmissionDocumentIllustration;
  /** Thẻ có hiệu ứng riêng tự chạy minh họa khi cuộn tới (V2 autoDemoCards). */
  autoDemo: boolean;
};

const admission = `${trainingProcessImageBase}/admission`;

/** 7 giấy tờ Bước 1 — chữ giữ nguyên V2. */
export const admissionRequiredDocuments: readonly AdmissionRequiredDocument[] =
  [
    {
      index: "01",
      title: "Căn cước công dân",
      description: "Bản photo rõ thông tin cá nhân để đối chiếu hồ sơ đăng ký.",
      illustration: {
        kind: "flip-card",
        frontSrc: `${admission}/cccd-front.jpg`,
        backSrc: `${admission}/cccd-back.png`,
        width: 960,
        height: 606,
      },
      autoDemo: true,
    },
    {
      index: "02",
      title: "VNeID",
      description: "Cung cấp căn cước điện tử trên VNeID để xác thực nhanh.",
      illustration: { kind: "vneid-phone", src: `${admission}/vneid.png` },
      autoDemo: true,
    },
    {
      index: "03",
      title: "GPLX nếu có (A, A1, B1,...)",
      description: "Bản photo giấy phép lái xe nếu học viên đã có.",
      illustration: {
        kind: "flip-card",
        frontSrc: `${admission}/gplx-oto-front.png`,
        backSrc: `${admission}/gplx-oto-back.png`,
        width: 570,
        height: 438,
      },
      autoDemo: true,
    },
    {
      index: "04",
      title:
        "Đơn đề nghị học lái xe theo mẫu quy định tại Phụ lục X ban hành kèm TT 14/2025/TT-BXD",
      illustration: {
        kind: "floating-image",
        src: `${admission}/dondenghi.png`,
      },
      autoDemo: false,
    },
    {
      index: "05",
      title: "Số điện thoại",
      description:
        "Số liên hệ chính để nhận lịch học, lịch kiểm tra và thông báo.",
      illustration: { kind: "calling-phone", src: `${admission}/sdt.png` },
      autoDemo: true,
    },
    {
      index: "06",
      title: "Ảnh 3x4",
      description: "Ảnh đúng quy cách, nền trắng theo yêu cầu hồ sơ.",
      illustration: { kind: "photo-fan", src: `${admission}/anh34-stack.png` },
      autoDemo: true,
    },
    {
      index: "07",
      title: "Giấy khám sức khỏe",
      description:
        "Giấy khám sức khỏe của người lái xe, người điều khiển xe chuyên dụng.",
      illustration: { kind: "floating-image", src: `${admission}/gksk.png` },
      autoDemo: false,
    },
  ];

/** Vị trí 8 ảnh 3x4: chồng lệch nhẹ → xòe quạt (V2 `.photo-copy--1…8`). */
export const admissionPhotoFanLayers: readonly {
  zIndex: number;
  stack: string;
  fan: string;
}[] = [
  {
    zIndex: 1,
    stack: "translate(-7px, 3px) rotate(-2.5deg)",
    fan: "translate(-91px, 20px) rotate(-30deg)",
  },
  {
    zIndex: 2,
    stack: "translate(-5px, 2px) rotate(-1.8deg)",
    fan: "translate(-68px, 2px) rotate(-21deg)",
  },
  {
    zIndex: 3,
    stack: "translate(-3px, 1px) rotate(-1deg)",
    fan: "translate(-43px, -10px) rotate(-12deg)",
  },
  {
    zIndex: 7,
    stack: "translate(-1px, 0) rotate(-0.4deg)",
    fan: "translate(-16px, -16px) rotate(-4deg)",
  },
  {
    zIndex: 8,
    stack: "translate(0, 0) rotate(0deg)",
    fan: "translate(16px, -16px) rotate(4deg)",
  },
  {
    zIndex: 6,
    stack: "translate(2px, 1px) rotate(0.7deg)",
    fan: "translate(43px, -10px) rotate(12deg)",
  },
  {
    zIndex: 5,
    stack: "translate(4px, 2px) rotate(1.5deg)",
    fan: "translate(68px, 2px) rotate(21deg)",
  },
  {
    zIndex: 4,
    stack: "translate(6px, 3px) rotate(2.3deg)",
    fan: "translate(91px, 20px) rotate(30deg)",
  },
];

/** 3 địa điểm đăng ký trực tiếp (khối "Bạn đã chuẩn bị đủ hồ sơ?"). */
export const admissionWalkInLocations: readonly {
  label: string;
  address: string;
}[] = [
  { label: "Trụ sở chính", address: "176 Thế Lữ, Tân Nhựt, TP. HCM" },
  { label: "Cơ sở Vĩnh Lộc", address: "271 Đường số 1, P. Bình Tân" },
  {
    label: "VP Tuyển Sinh",
    address: "276 Minh Phụng, Phường Minh Phụng, TP. HCM",
  },
];
