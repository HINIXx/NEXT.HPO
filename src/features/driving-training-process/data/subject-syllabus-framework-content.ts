// File sinh tự động từ V2 @0709939 (#monModal) — scratchpad gd4/generate-subject-syllabus-ts-data.py. Sửa chữ thì sửa trực tiếp ở đây.
import type { SubjectSyllabusFramework } from "./subject-syllabus-framework-types";

/** Nội dung modal "Chương trình khung" theo môn (bấm ô môn học trong bảng phân bổ thời gian). */
export const subjectSyllabusFrameworks: readonly SubjectSyllabusFramework[] = [
  {
    key: "mon-01",
    parts: [
      {
        index: "Phần I",
        title: "Nội dung Luật Trật tự, an toàn giao thông đường bộ",
        chapters: [
          { label: "Chương I", title: "Những quy định chung" },
          { label: "Chương II", title: "Quy tắc giao thông đường bộ" },
          {
            label: "Chương III",
            title: "Xe ô tô tham gia giao thông đường bộ",
          },
          {
            label: "Chương IV",
            title: "Người lái xe ô tô tham gia giao thông đường bộ",
          },
          {
            label: "Chương V",
            title:
              "Nhận thức về Bộ luật hình sự liên quan đến nhóm tội phạm quy định về giao thông",
          },
          {
            label: "Chương VI",
            title:
              "Pháp luật về xử lý vi phạm hành chính về trật tự, an toàn giao thông đường bộ",
          },
          {
            label: "Chương VII",
            title:
              "Nhận thức về xếp hàng hóa trên xe ô tô và pháp luật về vận tải đường bộ",
          },
        ],
      },
      {
        index: "Phần II",
        title: "Nội dung Hệ thống báo hiệu đường bộ",
        chapters: [
          { label: "Chương I", title: "Quy định chung" },
          { label: "Chương II", title: "Hiệu lệnh điều khiển giao thông" },
          {
            label: "Chương III",
            title: "Biển báo hiệu - 5 loại biển báo",
            resources: [
              {
                kind: "sign-group",
                target: "bien-cam",
                name: "1. Biển báo cấm",
                iconSrc: "/assets/images/bienbao/bbcam.png",
                shape: "Tròn",
                colorLabel: "Viền đỏ",
                colorTone: "red",
                styleCount: 63,
              },
              {
                kind: "sign-group",
                target: "nguy-hiem",
                name: "2. Biển nguy hiểm",
                iconSrc: "/assets/images/bienbao/bbNguyHiem.png",
                shape: "Tam giác",
                colorLabel: "Vàng",
                colorTone: "yellow",
                styleCount: 83,
              },
              {
                kind: "sign-group",
                target: "hieu-lenh",
                name: "3. Biển hiệu lệnh",
                iconSrc: "/assets/images/bienbao/bbHieuLenh.png",
                shape: "Tròn",
                colorLabel: "Nền xanh",
                colorTone: "blue",
                styleCount: 65,
              },
              {
                kind: "sign-group",
                target: "chi-dan",
                name: "4. Biển chỉ dẫn",
                iconSrc: "/assets/images/bienbao/bbChiDan.png",
                shape: "Chữ nhật",
                colorLabel: "Xanh",
                colorTone: "blue",
                styleCount: 92,
              },
              {
                kind: "sign-group",
                target: "bien-phu",
                name: "5. Biển phụ",
                iconSrc: "/assets/images/bienbao/bbPhu.png",
                shape: "Chữ nhật",
                colorLabel: "Trắng",
                colorTone: "gray",
                styleCount: 31,
              },
            ],
          },
          {
            label: "Chương IV",
            title: "Các báo hiệu đường bộ khác",
            subItems: [
              "Vạch kẻ đường",
              "Cọc tiêu, tiêu phản quang, tường bảo vệ và hàng rào chắn",
              "Cột kilômét",
              "Mốc lộ giới",
              "Gương cầu lồi, dải phân cách và lan can phòng hộ",
              "Báo hiệu trên đường cao tốc",
              "Báo hiệu cấm đi lại",
            ],
          },
          {
            label: "Chương V",
            title: "Tốc độ và khoảng cách",
            subItems: [
              "Quy định về tốc độ của phương tiện tham gia giao thông đường bộ",
              "Khoảng cách an toàn giữa hai xe khi tham gia giao thông",
            ],
          },
        ],
      },
      {
        index: "Phần III",
        title: "Nội dung Xử lý các tình huống giao thông",
        chapters: [
          { label: "Chương I", title: "Các đặc điểm của sa hình" },
          { label: "Chương II", title: "Các nguyên tắc đi sa hình" },
          {
            label: "Chương III",
            title: "Nhận thức về phòng ngừa tai nạn giao thông",
          },
        ],
      },
    ],
  },
  {
    key: "mon-02",
    parts: [
      {
        index: "Môn II",
        title: "Nội dung Cấu tạo và sửa chữa thông thường",
        chapters: [
          { label: "1", title: "Giới thiệu chung về xe ô tô" },
          {
            label: "2",
            title: "Động cơ xe ô tô",
            resources: [
              {
                kind: "engine-animation",
                title: "Nguyên lý làm việc của động cơ 4 kỳ",
              },
            ],
          },
          { label: "3", title: "Cấu tạo Gầm ô tô" },
          { label: "4", title: "Hệ thống Điện xe ô tô" },
          {
            label: "5",
            title: "Các hệ thống an toàn chủ động trang bị trên xe ô tô",
          },
          { label: "6", title: "Hệ thống tự chẩn đoán trên ô tô" },
          { label: "7", title: "Nội quy xưởng và kỹ thuật an toàn" },
          {
            label: "8",
            title: "Các hư hỏng thông thường",
            resources: [
              {
                kind: "lesson-video",
                target: "hu-hong-dong-co",
                title: "Hư hỏng thường gặp ở động cơ",
              },
              {
                kind: "lesson-video",
                target: "hu-hong-thuong-gap",
                title: "Hư hỏng thường gặp ở hộp số",
              },
              {
                kind: "lesson-video",
                target: "hu-hong-thuong-gap-dieu-hoa-va-dien",
                title: "Hư hỏng thường gặp ở điều hoà và hệ thống điện",
              },
              {
                kind: "lesson-video",
                target: "hu-hong-thuong-gap-he-thong-lai-va-treo",
                title: "Hư hỏng thường gặp ở hệ thống lái và treo",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: "mon-03",
    parts: [
      {
        index: "Môn III",
        title:
          "Nội dung Đạo đức người lái xe, văn hóa giao thông và phòng chống tác hại của rượu, bia khi tham gia giao thông, kỹ năng PCCC và CNCH",
        chapters: [
          {
            label: "1",
            title:
              "Những vấn đề cơ bản về phẩm chất đạo đức trong giai đoạn hiện nay",
          },
          { label: "2", title: "Đạo đức của người lái xe" },
          {
            label: "3",
            title: "Văn hóa giao thông",
            resources: [
              {
                kind: "lesson-video",
                target: "cac-tinh-huong-ung-xu-khi-tham-gia-giao-thong",
                title: "Các tình huống ứng xử khi tham gia giao thông",
              },
            ],
          },
          {
            label: "4",
            title: "Phòng, chống tác hại của rượu, bia khi tham gia giao thông",
            resources: [
              {
                kind: "lesson-video",
                target: "tac-hai-cua-su-dung-ruou-bia-khi-lai-xe",
                title: "Tác hại của việc sử dụng rượu, bia khi lái xe",
              },
              {
                kind: "lesson-video",
                target: "cac-giai-phap-phong-chong-tac-hai-ruou-bia-khi-lai-xe",
                title:
                  "Các giải pháp phòng, chống tác hại của rượu, bia khi lái xe",
              },
            ],
          },
          {
            label: "5",
            title: "Thực hành sơ cấp cứu",
            resources: [
              {
                kind: "lesson-video",
                target: "so-cuu-nguoi-bi-ngat",
                title: "Sơ cứu người bị ngất",
              },
              {
                kind: "lesson-video",
                target: "so-cuu-nguoi-bi-thuong-chay-mau",
                title: "Sơ cấp cứu người bị thương chảy máu",
              },
            ],
          },
          {
            label: "6",
            title: "Hướng dẫn kỹ năng phòng cháy, chữa cháy và cứu nạn, cứu hộ",
            subItems: [
              "6.1. Tình hình cháy, nổ, sự cố tai nạn ô tô, xe máy trong thời gian vừa qua",
              "6.2. Kiến thức pháp luật về phòng cháy, chữa cháy và cứu nạn, cứu hộ (PCCC&CNCH)",
              "6.3. Kiến thức cơ bản về phòng cháy, chữa cháy và cứu nạn, cứu hộ",
              "6.4. Nguyên nhân gây cháy, nổ, sự cố tai nạn ô tô",
              "6.5. Các biện pháp phòng cháy, chữa cháy và cứu nạn, cứu hộ đối với ô tô",
              "6.6. Biện pháp xử lý cháy, nổ, sự cố tai nạn đối với ô tô",
              "6.7. Hướng dẫn sử dụng phương tiện, dụng cụ chữa cháy, cứu nạn, cứu hộ",
            ],
          },
        ],
      },
    ],
  },
  {
    key: "mon-04",
    parts: [
      {
        index: "Môn V",
        title: "Nội dung Kỹ thuật lái xe",
        chapters: [
          {
            label: "1",
            title: "Vị trí, tác dụng các bộ phận trong buồng lái",
            resources: [
              {
                kind: "cabin-360",
                title: "Bài giảng 360° tham quan các bộ phận của xe ô tô",
              },
            ],
          },
          { label: "2", title: "Kỹ thuật lái xe cơ bản" },
          {
            label: "3",
            title: "Kỹ thuật lái xe trên các loại đường",
            subItems: [
              "Lái xe ô tô trên bãi phẳng, đường bằng",
              "Lái xe ô tô trên đường dốc, đường vòng quanh co",
              "Lái xe qua trạm thu phí sử dụng dịch vụ đường bộ, qua cầu, phà",
              "Lái xe trên đường phức tạp qua: chỗ hẹp, đường sắt, đường xấu, đường ngập nước, đường ngầm",
              "Lái xe ô tô ban đêm, khu vực sương mù",
              "Lái xe ô tô trên đường cao tốc",
            ],
          },
          { label: "4", title: "Kỹ thuật lái xe an toàn chủ động" },
          { label: "5", title: "Kỹ thuật lái xe ô tô chở hàng hóa" },
          { label: "6", title: "Tâm lý điều khiển xe ô tô" },
          {
            label: "7",
            title: "Phương pháp thực hành lái xe tổng hợp",
            resources: [
              {
                kind: "driving-technique",
                target: "chap-7-content-1",
                number: "1",
                title: "Xuất phát",
              },
              {
                kind: "driving-technique",
                target: "chap-7-content-2",
                number: "2",
                title: "Dừng xe nhường đường cho người đi bộ",
              },
              {
                kind: "driving-technique",
                target: "chap-7-content-3",
                number: "3",
                title: "Dừng xe khởi hành ngang dốc",
              },
              {
                kind: "driving-technique",
                target: "chap-7-content-4",
                number: "4",
                title: "Qua vệt bánh xe và đường hẹp vuông góc",
              },
              {
                kind: "driving-technique",
                target: "chap-7-content-5",
                number: "5",
                title: "Qua ngã tư có đèn tín hiệu giao thông",
              },
              {
                kind: "driving-technique",
                target: "chap-7-content-6",
                number: "6",
                title: "Đường vòng quanh co",
              },
              {
                kind: "driving-technique",
                target: "chap-7-content-7",
                number: "7",
                title: "Ghép xe dọc vào nơi đỗ",
              },
              {
                kind: "driving-technique",
                target: "chap-7-content-8",
                number: "8",
                title: "Tạm dừng ở nơi có đường sắt chạy qua",
              },
              {
                kind: "driving-technique",
                target: "chap-7-content-9",
                number: "9",
                title: "Thay đổi số trên đường bằng",
              },
              {
                kind: "driving-technique",
                target: "chap-7-content-10",
                number: "10",
                title: "Ghép xe ngang vào nơi đỗ",
              },
              {
                kind: "driving-technique",
                target: "chap-7-content-11",
                number: "11",
                title: "Bài kết thúc",
              },
            ],
          },
          {
            label: "8",
            title:
              "Kỹ thuật kiểm tra, quan sát an toàn, chỉnh gương chiếu hậu trước khi cho xe tập lái xuất phát; bật tín hiệu chuyển hướng rẽ tại tất cả các bài tập lái khi thay đổi hướng chuyển động của xe tập lái",
          },
          {
            label: "9",
            title:
              "Kỹ thuật thực hiện các tình huống học lái xe ô tô như: Vượt xe; tăng tốc, chuyển làn; chuyển hướng rẽ trái; chuyển hướng rẽ phải; chuyển hướng quay đầu; tránh xe đi ngược chiều; nhường đường cho người đi bộ hoặc xe lăn của người khuyết tật qua đường; dừng xe, mở cửa xe khi gặp tình huống nguy hiểm; xử lý tình huống từ đường nhánh ra đường chính hoặc từ đường không ưu tiên ra đường ưu tiên; chấp hành tín hiệu đèn giao thông",
          },
        ],
      },
    ],
  },
  {
    key: "mon-thuc-hanh",
    parts: [
      {
        index: "Mục 1",
        title: "Nội dung Tập lái xe trên xe ô tô được kê kích",
        sectionKey: "1",
        chapters: [
          { label: "1.1", title: "Tập lái xe tại chỗ không nổ máy" },
          { label: "1.2", title: "Tập lái xe tại chỗ có nổ máy" },
        ],
      },
      {
        index: "Mục 2",
        title: "Nội dung Tập lái xe trên sân tập lái",
        sectionKey: "2",
        chapters: [
          { label: "2.1", title: "Tập lái xe trong bãi phẳng" },
          {
            label: "2.2",
            title:
              "Tập lái xe trong hình số 3, số 8 ghép; tiến lùi theo hình chữ chi",
          },
          { label: "2.3", title: "Tập lái xe trên đường bằng" },
          { label: "2.4", title: "Bài tập lái xe tổng hợp" },
        ],
      },
      {
        index: "Mục 3",
        title: "Nội dung Tập lái xe trên đường giao thông",
        sectionKey: "3",
        chapters: [
          {
            label: "3.1",
            title:
              "Tập lái xe trên đường cao tốc hoặc đường cao tốc phân kỳ đầu tư đối với học lái xe hạng B và hạng C1 (học trên ca bin tập lái xe ô tô hoặc trên xe tập lái theo kế hoạch đào tạo do cơ sở đào tạo lái xe lập)",
          },
          {
            label: "3.2",
            title: "Tập lái xe trên đường dốc, đường vòng quanh co",
          },
          { label: "3.3", title: "Tập lái xe trên đường phức tạp" },
          { label: "3.4", title: "Tập lái xe ban đêm" },
          { label: "3.5", title: "Tập lái xe có tải" },
          {
            label: "3.6",
            title:
              "Tập lái xe trên đường với xe ô tô chuyển số tự động (bao gồm cả xe ô tô điện) đối với học hạng B số cơ khí và hạng C1",
          },
          {
            label: "3.7",
            title:
              "Tập lái xe trên đường với xe tải hạng C đối với học nâng hạng từ hạng B lên hạng D1 hoặc D2",
          },
        ],
      },
      {
        index: "Mục 4",
        title: "Nội dung Ôn luyện theo các nội dung sát hạch lái xe",
        sectionKey: "4",
        chapters: [],
      },
    ],
  },
  {
    key: "mon-cabin",
    parts: [
      {
        index: "Cabin",
        title: "Nội dung thực hành cabin",
        chapters: [
          { label: "1", title: "Bài tập lái xe tổng hợp" },
          { label: "2", title: "Bài lái trong đô thị" },
          { label: "3", title: "Bài lái cao tốc" },
          { label: "4", title: "Bài lái đường đồi núi" },
          { label: "5", title: "Bài lái xe lên, xuống phà" },
          { label: "6", title: "Bài lái xe trên đường lầy" },
          { label: "7", title: "Bài lái xe trong điều kiện sương mù" },
          { label: "8", title: "Lái xe qua đường ngập nước, lái xe qua ngầm" },
        ],
      },
    ],
  },
];
