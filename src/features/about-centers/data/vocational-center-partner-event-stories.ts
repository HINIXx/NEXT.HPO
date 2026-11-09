import { galleryPhotos, type GalleryPhoto } from "./gallery-photo-types";

export type PartnerEventStory = {
  /** Số thứ tự · nhóm, ví dụ "01 · Chuyển đổi số". */
  meta: string;
  title: string;
  description: string;
  /** Tên vùng băng chuyền cho trình đọc màn hình. */
  carouselLabel: string;
  photos: GalleryPhoto[];
};

/**
 * 8 hoạt động "Hợp tác & liên kết đào tạo" trang TT GDNN — chép đúng V2 @0709939 (chữ, ảnh, thứ tự).
 * V2 có vài ảnh lặp trong cùng băng chuyền (thẻ 01, 03): giữ nguyên để số chấm khớp V2.
 */
export const partnerEventStories: readonly PartnerEventStory[] = [
  {
    meta: "01 · Chuyển đổi số",
    title: "Họp báo “Tiên phong chuyển đổi số trong đào tạo lái xe ô tô”",
    description:
      "Dấu mốc ứng dụng công nghệ vào quản lý, giảng dạy và theo dõi quá trình học tập.",
    carouselLabel: "Hình ảnh họp báo chuyển đổi số",
    photos: galleryPhotos([
      ["2026/02/11-1-1024x681.jpg", "Họp báo chuyển đổi số tại Hiệp Phát"],
      ["2026/02/12-1024x681.jpg", "Khách mời tại họp báo chuyển đổi số"],
      ["2026/02/8-1-1024x681.jpg", "Hoạt động trong họp báo chuyển đổi số"],
      ["2026/02/5-1-300x200.jpg", "Hoạt động trong họp báo chuyển đổi số"],
      ["2026/02/13-1024x681.jpg", "Hoạt động trong họp báo chuyển đổi số"],
      ["2026/02/14-1024x683.jpg", "Hoạt động trong họp báo chuyển đổi số"],
      ["2026/02/1-1024x576.png", "Hoạt động trong họp báo chuyển đổi số"],
      ["2026/02/13-1024x681.jpg", "Hoạt động trong họp báo chuyển đổi số"],
      ["2026/02/9-1-1024x681.jpg", "Hoạt động trong họp báo chuyển đổi số"],
    ]),
  },
  {
    meta: "02 · Giáo dục",
    title: "Trường Đại học Kinh tế – Kỹ thuật Bình Dương",
    description:
      "Mở rộng liên kết giữa đào tạo nghề và môi trường giáo dục chuyên nghiệp.",
    carouselLabel: "Hình ảnh hợp tác với Đại học Kinh tế Kỹ thuật Bình Dương",
    photos: galleryPhotos([
      [
        "2026/01/DSC03687-1-1024x683.jpg",
        "Hiệp Phát hợp tác cùng Đại học Kinh tế Kỹ thuật Bình Dương",
      ],
      [
        "2026/02/DSC03722-1024x683.jpg",
        "Hoạt động liên kết tại trường đại học",
      ],
      [
        "2026/02/DSC03774-1024x683.jpg",
        "Đại biểu tham dự chương trình hợp tác",
      ],
      [
        "2026/02/DSC03859-1024x683.jpg",
        "Đại biểu tham dự chương trình hợp tác",
      ],
      [
        "2026/01/DSC04043-1-1024x604.jpg",
        "Đại biểu tham dự chương trình hợp tác",
      ],
    ]),
  },
  {
    meta: "03 · Đào tạo",
    title: "Bộ Tư lệnh Thành phố Hồ Chí Minh",
    description:
      "Phối hợp đào tạo kỹ năng lái xe an toàn, kỷ luật và đúng quy chuẩn.",
    carouselLabel: "Hình ảnh hợp tác với Bộ Tư lệnh Thành phố Hồ Chí Minh",
    photos: galleryPhotos([
      [
        "2026/01/611182271_122132285816992244_8030622149371431023_n-1024x505.jpg",
        "Chương trình cùng Bộ Tư lệnh Thành phố Hồ Chí Minh",
      ],
      [
        "2026/04/chinh-sua-hinh-anh-2-1024x606.png",
        "Đại diện Hiệp Phát và Bộ Tư lệnh Thành phố Hồ Chí Minh",
      ],
      ["2026/01/DSC02634-1-1024x618.jpg", "Hoạt động đào tạo cùng Bộ Tư lệnh"],
      [
        "2026/01/611182271_122132285816992244_8030622149371431023_n-1024x505.jpg",
        "Hoạt động đào tạo cùng Bộ Tư lệnh",
      ],
      [
        "2026/04/chinh-sua-hinh-anh-2-1024x606.png",
        "Hoạt động đào tạo cùng Bộ Tư lệnh",
      ],
      [
        "2026/01/604686652_122130667652992244_274410593248110545_n-1024x521.jpg",
        "Hoạt động đào tạo cùng Bộ Tư lệnh",
      ],
      [
        "2026/01/603764140_122130667454992244_4723898541629810838_n-1024x605.jpg",
        "Hoạt động đào tạo cùng Bộ Tư lệnh",
      ],
      ["2026/02/DSC02487-1024x588.jpg", "Hoạt động đào tạo cùng Bộ Tư lệnh"],
      [
        "2026/01/605740769_122130667364992244_7625418263054320303_n-1024x576.jpg",
        "Hoạt động đào tạo cùng Bộ Tư lệnh",
      ],
      [
        "2026/01/605535950_122130667886992244_2081100362082527642_n-1024x683.jpg",
        "Hoạt động đào tạo cùng Bộ Tư lệnh",
      ],
      [
        "2026/01/605712035_122130667952992244_7195696868085647794_n-1024x616.jpg",
        "Hoạt động đào tạo cùng Bộ Tư lệnh",
      ],
      ["2026/01/DSC02622-2-1024x576.jpg", "Hoạt động đào tạo cùng Bộ Tư lệnh"],
    ]),
  },
  {
    meta: "04 · Liên kết",
    title: "Lữ đoàn Thông tin 23",
    description:
      "Kết nối chương trình đào tạo nghề với nhu cầu thực tiễn của đơn vị.",
    carouselLabel: "Hình ảnh hợp tác với Lữ đoàn Thông tin 23",
    photos: galleryPhotos([
      ["2026/02/1-1024x648.jpg", "Chương trình tại Lữ đoàn Thông tin 23"],
      ["2026/02/2-1024x672.jpg", "Hoạt động liên kết với Lữ đoàn Thông tin 23"],
      [
        "2026/02/3-1024x612.jpg",
        "Đại biểu tại chương trình Lữ đoàn Thông tin 23",
      ],
      [
        "2026/02/5-1024x671.jpg",
        "Đại biểu tại chương trình Lữ đoàn Thông tin 23",
      ],
      [
        "2026/02/6-1024x683.jpg",
        "Đại biểu tại chương trình Lữ đoàn Thông tin 23",
      ],
      [
        "2026/02/8-1024x623.jpg",
        "Đại biểu tại chương trình Lữ đoàn Thông tin 23",
      ],
      [
        "2026/02/9-1024x637.jpg",
        "Đại biểu tại chương trình Lữ đoàn Thông tin 23",
      ],
      [
        "2026/02/10-1024x612.jpg",
        "Đại biểu tại chương trình Lữ đoàn Thông tin 23",
      ],
      [
        "2026/02/11-1024x668.jpg",
        "Đại biểu tại chương trình Lữ đoàn Thông tin 23",
      ],
      [
        "2026/02/4-1024x683.jpg",
        "Đại biểu tại chương trình Lữ đoàn Thông tin 23",
      ],
    ]),
  },
  {
    meta: "05 · Cộng đồng",
    title: "Gala tọa đàm Giao thông xanh",
    description:
      "Chia sẻ góc nhìn về di chuyển bền vững và văn hóa giao thông hiện đại.",
    carouselLabel: "Hình ảnh Gala tọa đàm Giao thông xanh",
    photos: galleryPhotos([
      ["2026/02/DSC03115-1024x683.jpg", "Gala tọa đàm Giao thông xanh"],
      ["2026/02/ok-1024x682.png", "Khách mời tại tọa đàm Giao thông xanh"],
      ["2026/02/DSC03105-1024x683.jpg", "Chia sẻ tại tọa đàm Giao thông xanh"],
      ["2026/02/DSC03083-1024x683.jpg", "Chia sẻ tại tọa đàm Giao thông xanh"],
      ["2026/02/DSC03069-1024x833.jpg", "Chia sẻ tại tọa đàm Giao thông xanh"],
      ["2026/02/DSC03140-1024x683.jpg", "Chia sẻ tại tọa đàm Giao thông xanh"],
      ["2026/02/DSC03144-1024x683.jpg", "Chia sẻ tại tọa đàm Giao thông xanh"],
      [
        "2026/04/chinh-sua-hinh-anh-4-1024x682.png",
        "Chia sẻ tại tọa đàm Giao thông xanh",
      ],
      [
        "2026/04/chinh-sua-hinh-anh-3-1024x683.png",
        "Chia sẻ tại tọa đàm Giao thông xanh",
      ],
      ["2026/02/DSC03095-1024x658.jpg", "Chia sẻ tại tọa đàm Giao thông xanh"],
    ]),
  },
  {
    meta: "06 · Hướng nghiệp",
    title: "Bộ đội xuất ngũ xã Tân Nhựt, Bình Chánh",
    description:
      "Đồng hành định hướng nghề nghiệp, hỗ trợ kỹ năng cho quân nhân xuất ngũ.",
    carouselLabel: "Hình ảnh chương trình bộ đội xuất ngũ xã Tân Nhựt",
    photos: galleryPhotos([
      [
        "2026/02/DSC03203-1024x683.jpg",
        "Chương trình dành cho bộ đội xuất ngũ xã Tân Nhựt",
      ],
      [
        "2026/02/DSC03185-1024x664.jpg",
        "Tư vấn nghề nghiệp cho bộ đội xuất ngũ",
      ],
      [
        "2026/02/DSC03155-1-1024x683.jpg",
        "Đại biểu tại chương trình bộ đội xuất ngũ",
      ],
      [
        "2026/04/DSC03146-1024x683.jpg",
        "Đại biểu tại chương trình bộ đội xuất ngũ",
      ],
      [
        "2026/02/DSC03212-1-1024x683.jpg",
        "Đại biểu tại chương trình bộ đội xuất ngũ",
      ],
    ]),
  },
  {
    meta: "07 · Việc làm",
    title: "Ngày hội việc làm – Cao đẳng Bách khoa Sài Gòn",
    description:
      "Kết nối sinh viên với cơ hội nghề nghiệp và nhu cầu thực tế của doanh nghiệp.",
    carouselLabel: "Hình ảnh ngày hội việc làm Cao đẳng Bách khoa Sài Gòn",
    photos: galleryPhotos([
      [
        "2026/03/IMG_0899-1024x575.jpg",
        "Ngày hội việc làm Cao đẳng Bách khoa Sài Gòn",
      ],
      [
        "2026/03/IMG_1234-1024x711.jpg",
        "Gian hàng Hiệp Phát tại ngày hội việc làm",
      ],
      ["2026/03/IMG_0868-1024x649.jpg", "Sinh viên tham gia ngày hội việc làm"],
      ["2026/03/IMG_0916-1024x575.jpg", "Sinh viên tham gia ngày hội việc làm"],
      ["2026/03/IMG_0921-1024x575.jpg", "Sinh viên tham gia ngày hội việc làm"],
      ["2026/03/IMG_1385-1024x666.jpg", "Sinh viên tham gia ngày hội việc làm"],
      ["2026/03/IMG_0923-1024x602.jpg", "Sinh viên tham gia ngày hội việc làm"],
      ["2026/03/IMG_1153-1024x651.jpg", "Sinh viên tham gia ngày hội việc làm"],
      ["2026/03/IMG_1392-1024x787.jpg", "Sinh viên tham gia ngày hội việc làm"],
      ["2026/03/IMG_1399-1024x726.jpg", "Sinh viên tham gia ngày hội việc làm"],
      ["2026/03/IMG_0928-1024x575.jpg", "Sinh viên tham gia ngày hội việc làm"],
      ["2026/03/IMG_1253-1024x624.jpg", "Sinh viên tham gia ngày hội việc làm"],
      ["2026/03/IMG_1248-1024x769.jpg", "Sinh viên tham gia ngày hội việc làm"],
      ["2026/03/IMG_1446-1024x683.jpg", "Sinh viên tham gia ngày hội việc làm"],
      ["2026/03/IMG_1460-1024x732.jpg", "Sinh viên tham gia ngày hội việc làm"],
      ["2026/03/IMG_1459-1024x751.jpg", "Sinh viên tham gia ngày hội việc làm"],
      ["2026/03/IMG_1061-1024x769.jpg", "Sinh viên tham gia ngày hội việc làm"],
      ["2026/03/IMG_1084-1024x769.jpg", "Sinh viên tham gia ngày hội việc làm"],
      ["2026/03/IMG_1086-1024x769.jpg", "Sinh viên tham gia ngày hội việc làm"],
      ["2026/03/IMG_1157-1024x723.jpg", "Sinh viên tham gia ngày hội việc làm"],
    ]),
  },
  {
    meta: "08 · Kết nối",
    title: "Diễn đàn Hợp tác Kinh tế Việt Nam – ASEAN",
    description:
      "Tham gia mạng lưới kết nối, trao đổi và thúc đẩy giá trị đào tạo trong khu vực.",
    carouselLabel: "Hình ảnh Diễn đàn Hợp tác Kinh tế Việt Nam ASEAN",
    photos: galleryPhotos([
      [
        "2026/05/ASEAN-2043-1024x681.jpg",
        "Diễn đàn Hợp tác Kinh tế Việt Nam ASEAN",
      ],
      [
        "2026/05/ASEAN-2017-1024x681.jpg",
        "Đại biểu tại Diễn đàn Việt Nam ASEAN",
      ],
      [
        "2026/05/ASEAN-2021-1024x681.jpg",
        "Hoạt động kết nối tại Diễn đàn Việt Nam ASEAN",
      ],
      [
        "2026/05/MCF_6665-1024x681.jpg",
        "Hoạt động kết nối tại Diễn đàn Việt Nam ASEAN",
      ],
      [
        "2026/05/MCF_6707-1024x681.jpg",
        "Hoạt động kết nối tại Diễn đàn Việt Nam ASEAN",
      ],
      [
        "2026/05/MCF_6616-1024x681.jpg",
        "Hoạt động kết nối tại Diễn đàn Việt Nam ASEAN",
      ],
      [
        "2026/05/ASEAN-1661-1024x681.jpg",
        "Hoạt động kết nối tại Diễn đàn Việt Nam ASEAN",
      ],
      [
        "2026/05/ASEAN-1643-1024x681.jpg",
        "Hoạt động kết nối tại Diễn đàn Việt Nam ASEAN",
      ],
      [
        "2026/05/ASEAN-1647-1024x681.jpg",
        "Hoạt động kết nối tại Diễn đàn Việt Nam ASEAN",
      ],
      [
        "2026/05/ASEAN-1087-1024x681.jpg",
        "Hoạt động kết nối tại Diễn đàn Việt Nam ASEAN",
      ],
      [
        "2026/05/ASEAN-1642-1024x681.jpg",
        "Hoạt động kết nối tại Diễn đàn Việt Nam ASEAN",
      ],
    ]),
  },
];
