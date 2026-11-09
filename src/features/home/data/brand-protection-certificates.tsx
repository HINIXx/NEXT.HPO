import type { ReactNode } from "react";

/** 5 văn bằng bảo hộ (V2 trang chủ `#so-huu-tri-tue`, sinh từ DOM @0709939). `lightboxIndex` = thứ tự trong hộp xem ảnh lớn (V2 data-img-idx). */
export type BrandCertificate = {
  number: string;
  tag: string;
  tagIcon: ReactNode;
  lightboxIndex: number;
  zoomLabel: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  title: string;
  description: string;
  facts: readonly (readonly [string, string])[];
  link?: { href: string; text: string };
};

export const brandCertificates: readonly BrandCertificate[] = [
  {
    number: "01",
    tag: "Sở hữu trí tuệ",
    tagIcon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    lightboxIndex: 0,
    zoomLabel: "Xem Giấy chứng nhận đăng ký nhãn hiệu số 537625",
    src: "/assets/images/so-huu-tri-tue/nhanHieu.png",
    alt: "Giấy chứng nhận đăng ký nhãn hiệu số 537625",
    width: 1190,
    height: 837,
    title: "Giấy chứng nhận đăng ký nhãn hiệu",
    description:
      "Văn bằng ghi nhận nhãn hiệu của Công ty TNHH Ô Tô Hiệp Phát được bảo hộ cho dịch vụ thuộc Nhóm 41 – Giáo dục.",
    facts: [
      ["Số chứng nhận", "537625"],
      ["Quyết định", "46269/QĐ-SHTT"],
      ["Ngày cấp", "11/04/2025"],
    ],
  },
  {
    number: "02",
    tag: "Website thương mại điện tử",
    tagIcon: <path d="M3 9h18l-1.5-5h-15L3 9Zm0 0v11h18V9M9 20v-6h6v6" />,
    lightboxIndex: 3,
    zoomLabel: "Xem thông tin website hpo.edu.vn đã thông báo Bộ Công Thương",
    src: "/assets/images/so-huu-tri-tue/boCngThuong.png",
    alt: "Thông tin website hpo.edu.vn đã thông báo Bộ Công Thương",
    width: 606,
    height: 948,
    title: "Website đã thông báo Bộ Công Thương",
    description:
      "Cổng online.gov.vn ghi nhận hpo.edu.vn là nền tảng đặt hàng trực tuyến đã thông báo Bộ Công Thương.",
    facts: [
      ["Website", "hpo.edu.vn"],
      ["Mã số thuế", "0309987279"],
      ["Trạng thái", "Đã thông báo Bộ Công Thương"],
    ],
    link: {
      href: "http://online.gov.vn/Website/chi-tiet-135372",
      text: "Xem trên online.gov.vn",
    },
  },
  {
    number: "03",
    tag: "Tài nguyên Internet",
    tagIcon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </>
    ),
    lightboxIndex: 4,
    zoomLabel: "Xem Giấy chứng nhận đăng ký tên miền hpo.edu.vn",
    src: "/assets/images/so-huu-tri-tue/tenMien.png",
    alt: "Giấy chứng nhận đăng ký tên miền hpo.edu.vn",
    width: 652,
    height: 922,
    title: "Giấy chứng nhận đăng ký tên miền “hpo.edu.vn”",
    description:
      "Giấy chứng nhận của P.A Việt Nam ghi nhận tên miền hpo.edu.vn do Công ty TNHH Ô Tô Hiệp Phát đăng ký.",
    facts: [
      ["Tên miền", "hpo.edu.vn"],
      ["Ngày đăng ký", "23/02/2021"],
      ["Nhà đăng ký", "P.A Việt Nam"],
    ],
  },
  {
    number: "04",
    tag: "Quyền tác giả bài giảng",
    tagIcon: (
      <>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4M10 7.5v5l4-2.5z" />
      </>
    ),
    lightboxIndex: 1,
    zoomLabel: "Xem Giấy chứng nhận quyền tác giả bài giảng video",
    src: "/assets/images/so-huu-tri-tue/tacGiaBaiGiang.png",
    alt: "Giấy chứng nhận quyền tác giả bài giảng video",
    width: 673,
    height: 979,
    title: "Học liệu điện tử",
    description:
      "Giấy chứng nhận đăng ký quyền tác giả cho bài giảng video đào tạo lái xe ô tô hạng B và hạng C theo mô hình tập trung trên nền tảng số.",
    facts: [
      ["Số chứng nhận", "0780/2025/QTG"],
      ["Ngày cấp", "22/01/2025"],
      ["Loại hình", "Bài giảng"],
    ],
  },
  {
    number: "05",
    tag: "Quyền tác giả phần mềm",
    tagIcon: <path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" />,
    lightboxIndex: 2,
    zoomLabel: "Xem Giấy chứng nhận quyền tác giả phần mềm đào tạo lái xe",
    src: "/assets/images/so-huu-tri-tue/tacGiaPhanMem.png",
    alt: "Giấy chứng nhận quyền tác giả phần mềm đào tạo lái xe",
    width: 717,
    height: 959,
    title: "Hệ thống đào tạo lái xe ô tô",
    description:
      "Giấy chứng nhận đăng ký quyền tác giả cho phần mềm đào tạo lái xe ô tô theo mô hình tập trung trên nền tảng số.",
    facts: [
      ["Số chứng nhận", "6392/2025/QTG"],
      ["Ngày cấp", "01/08/2025"],
      ["Loại hình", "Chương trình máy tính"],
    ],
  },
];
