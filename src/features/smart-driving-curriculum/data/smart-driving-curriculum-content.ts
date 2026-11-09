// File sinh tự động từ V2 @0709939 (#chuong-trinh-mon-hoc) — scratchpad gd4/generate-smart-curriculum-ts-data.py.
// Sửa chữ thì sửa trực tiếp ở đây.
import type { SmartCurriculumSubject } from "./smart-driving-curriculum-types";

/** Danh mục "Chương trình đào tạo lái xe ô tô thông minh" — 6 môn (trang Quy trình đào tạo + trang chủ). */
export const smartDrivingCurriculumSubjects: readonly SmartCurriculumSubject[] =
  [
    {
      number: "01",
      title: "Pháp luật về giao thông đường bộ",
      metas: ["3 phần", "15 chương"],
      parts: [
        {
          tone: "I",
          chip: "Phần 1",
          title: "Luật Trật tự, an toàn giao thông đường bộ",
          countLabel: "07 chương",
          description:
            "Hệ thống quy định pháp luật cốt lõi về trật tự, an toàn giao thông đường bộ năm 2024 - quy tắc giao thông, người điều khiển phương tiện, trách nhiệm pháp lý và xử lý vi phạm.",
          chapters: [
            { label: "Chương 1", title: "Những quy định chung" },
            { label: "Chương 2", title: "Quy tắc giao thông đường bộ" },
            {
              label: "Chương 3",
              title: "Xe ô tô tham gia giao thông đường bộ",
            },
            {
              label: "Chương 4",
              title: "Người lái xe ô tô tham gia giao thông đường bộ",
            },
            {
              label: "Chương 5",
              title:
                "Nhận thức về Bộ luật hình sự liên quan đến nhóm tội phạm quy định về giao thông",
            },
            {
              label: "Chương 6",
              title:
                "Pháp luật về xử lý vi phạm hành chính về trật tự, an toàn giao thông đường bộ",
            },
            {
              label: "Chương 7",
              title:
                "Nhận thức về xếp hàng hóa trên xe ô tô và pháp luật về vận tải đường bộ",
            },
          ],
        },
        {
          tone: "II",
          chip: "Phần 2",
          title: "Hệ thống báo hiệu đường bộ",
          countLabel: "05 chương",
          description:
            "Nhận biết và phân loại đầy đủ hệ thống báo hiệu đường bộ: biển báo, đèn tín hiệu,vạch kẻ đường và hiệu lệnh người điều khiển - nền tảng để xử lý đúng mọi tình huống thực tế.",
          chapters: [
            { label: "Chương 1", title: "Quy định chung" },
            { label: "Chương 2", title: "Hiệu lệnh điều khiển giao thông" },
            {
              label: "Chương 3",
              title: "Biển báo hiệu",
              description:
                "Nhận diện 5 nhóm biển báo qua hình ảnh trực quan, hiểu ý nghĩa để xử lý tình huống đúng luật. Đăng ký học ngay để tự tin hơn trên mọi hành trình.",
              showsRoadSignGroups: true,
            },
            { label: "Chương 4", title: "Các báo hiệu đường bộ khác" },
            { label: "Chương 5", title: "Tốc độ và khoảng cách" },
          ],
        },
        {
          tone: "III",
          chip: "Phần 3",
          title: "Xử lý các tình huống giao thông",
          countLabel: "03 chương",
          description:
            "Phương pháp phân tích sa hình và 7 nguyên tắc xử lý tình huống giao nhau, rèn kỹ năng quyết định nhanh, an toàn khi tham gia giao thông.",
          chapters: [
            { label: "Chương 1", title: "Các đặc điểm của sa hình" },
            {
              label: "Chương 2",
              title: "Các nguyên tắc đi sa hình",
              description:
                "Nắm thứ tự ưu tiên và cách xử lý từng tình huống sa hình, giúp bạn chọn hướng đi chính xác khi luyện tập và sát hạch. Đăng ký học để luyện vững từng dạng bài.",
              situationCards: [
                {
                  number: "1",
                  title: "Xe có đường riêng",
                  viewer: {
                    kind: "document",
                    doc: "sa-hinh",
                    target: "nguyen-tac-1",
                  },
                },
                {
                  number: "2",
                  title: "Quyền bình đẳng xe vào nơi đường giao nhau",
                  viewer: {
                    kind: "document",
                    doc: "sa-hinh",
                    target: "nguyen-tac-2",
                  },
                },
                {
                  number: "3",
                  title: "Xe ưu tiên theo luật giao thông đường bộ",
                  viewer: {
                    kind: "document",
                    doc: "sa-hinh",
                    target: "nguyen-tac-3",
                  },
                },
                {
                  number: "4",
                  title: "Xe ở đường ưu tiên",
                  viewer: {
                    kind: "document",
                    doc: "sa-hinh",
                    target: "nguyen-tac-4",
                  },
                },
                {
                  number: "5",
                  title: "Xe có quyền ưu tiên bên phải",
                  viewer: {
                    kind: "document",
                    doc: "sa-hinh",
                    target: "nguyen-tac-5",
                  },
                },
                {
                  number: "6",
                  title: "Quyền ưu tiên đối với xe đi cùng đoàn, cùng hướng",
                  viewer: {
                    kind: "document",
                    doc: "sa-hinh",
                    target: "nguyen-tac-6",
                  },
                },
                {
                  number: "7",
                  title: "Xe phải nhường đường khi rẽ trái",
                  viewer: {
                    kind: "document",
                    doc: "sa-hinh",
                    target: "nguyen-tac-7",
                  },
                },
              ],
            },
            {
              label: "Chương 3",
              title: "Nhận thức về phòng ngừa tai nạn giao thông",
            },
          ],
        },
      ],
    },
    {
      number: "02",
      title: "Cấu tạo và sửa chữa thông thường",
      metas: ["8 chương"],
      parts: [
        {
          tone: "I",
          chip: "Môn 2",
          title: "Cấu tạo và sửa chữa thông thường",
          countLabel: "08 mục",
          chapters: [
            { label: "Chương 1", title: "Giới thiệu chung về xe ô tô" },
            {
              label: "Chương 2",
              title: "Động cơ xe ô tô",
              description:
                "Khám phá nguyên lý hoạt động của động cơ 4 kỳ để hiểu rõ hơn chiếc xe mình điều khiển. Bắt đầu học ngay để xây nền tảng kiến thức ô tô vững chắc.",
              lessons: [
                {
                  badge: "BG",
                  title: "Nguyên lý làm việc của động cơ 4 kỳ",
                  tag: { text: "Bài giảng", tone: "blue" },
                  viewer: { kind: "document", doc: "engine-4ky" },
                },
              ],
            },
            { label: "Chương 3", title: "Cấu tạo Gầm ô tô" },
            { label: "Chương 4", title: "Hệ thống Điện xe ô tô" },
            {
              label: "Chương 5",
              title: "Các hệ thống an toàn chủ động trang bị trên xe ô tô",
            },
            { label: "Chương 6", title: "Hệ thống tự chẩn đoán trên ô tô" },
            { label: "Chương 7", title: "Nội quy xưởng và kỹ thuật an toàn" },
            {
              label: "Chương 8",
              title: "Các hư hỏng thông thường",
              description:
                "Nhận biết dấu hiệu hư hỏng thường gặp ở động cơ, hộp số, điều hòa, điện, lái và treo để chủ động đưa xe đi kiểm tra. Đăng ký học để chăm sóc xe tốt hơn.",
              lessons: [
                {
                  badge: "BG",
                  title: "Hư hỏng thường gặp ở động cơ",
                  viewer: {
                    kind: "lesson",
                    title: "Hư hỏng thường gặp ở động cơ",
                    videoUrl: "https://youtu.be/G9eeLeNSYB4",
                  },
                },
                {
                  badge: "BG",
                  title: "Hư hỏng thường gặp ở hộp số",
                  viewer: {
                    kind: "lesson",
                    title: "Hư hỏng thường gặp ở hộp số",
                    videoUrl: "https://youtu.be/E2rwBpPNPiQ",
                  },
                },
                {
                  badge: "BG",
                  title: "Hư hỏng thường gặp ở điều hòa và hệ thống điện",
                  viewer: {
                    kind: "lesson",
                    title: "Hư hỏng thường gặp ở điều hòa và hệ thống điện",
                    videoUrl: "https://youtu.be/F4Fz56U2Fjc",
                  },
                },
                {
                  badge: "BG",
                  title: "Hư hỏng thường gặp ở hệ thống lái và treo",
                  viewer: {
                    kind: "lesson",
                    title: "Hư hỏng thường gặp ở hệ thống lái và treo",
                    videoUrl: "https://youtu.be/3q1WpUh1AsE",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      number: "03",
      title:
        "Đạo đức người lái xe, văn hóa giao thông, phòng chống tác hại của rượu bia; kỹ năng phòng cháy chữa cháy và cứu nạn cứu hộ",
      metas: ["6 chương"],
      parts: [
        {
          tone: "II",
          chip: "Môn 3",
          title:
            "Đạo đức người lái xe, văn hóa GT và phòng chống tác hại của rượu, bia khi tham gia GT, kỹ năng PCCC và CNCH",
          countLabel: "06 mục",
          chapters: [
            {
              label: "Chương 1",
              title:
                "Những vấn đề cơ bản về phẩm chất đạo đức trong giai đoạn hiện nay",
            },
            { label: "Chương 2", title: "Đạo đức của người lái xe" },
            {
              label: "Chương 3",
              title: "Văn hóa giao thông",
              description:
                "Rèn văn hóa giao thông và ý thức trách nhiệm, để mỗi hành trình an toàn, văn minh hơn cho bạn và mọi người. Đăng ký khóa học để trở thành người lái xe trách nhiệm.",
              lessons: [
                {
                  badge: "BG",
                  title: "Văn hóa giao thông và trách nhiệm của người lái xe",
                  tag: { text: "Bài giảng", tone: "blue" },
                },
              ],
            },
            {
              label: "Chương 4",
              title:
                "Phòng, chống tác hại của rượu, bia khi tham gia giao thông",
              description:
                "Hiểu tác hại của rượu, bia và cách phòng tránh rủi ro khi tham gia giao thông, giúp bạn chọn phương án an toàn cho mình và cộng đồng. Đăng ký học ngay để xây dựng thói quen lái xe an toàn.",
              lessons: [
                {
                  badge: "BG",
                  title:
                    "Phòng, chống tác hại của rượu, bia khi tham gia giao thông",
                  tag: { text: "Bài giảng", tone: "fire" },
                },
              ],
            },
            {
              label: "Chương 5",
              title: "Thực hành sơ cấp cứu",
              description:
                "Học kỹ năng sơ cấp cứu cơ bản để biết cách hỗ trợ ban đầu khi xảy ra tai nạn. Đăng ký học để sẵn sàng giúp đỡ người gặp nạn.",
              lessons: [
                {
                  badge: "BG",
                  title:
                    "Kỹ năng sơ cấp cứu cơ bản khi xảy ra tai nạn giao thông",
                  tag: { text: "Bài giảng", tone: "green" },
                },
              ],
            },
            {
              label: "Chương 6",
              title:
                "Hướng dẫn kỹ năng phòng cháy, chữa cháy và cứu nạn, cứu hộ",
            },
          ],
        },
      ],
    },
    {
      number: "04",
      title: "Kỹ thuật lái xe",
      metas: ["9 chương"],
      parts: [
        {
          tone: "I",
          chip: "Môn 4",
          title: "Kỹ thuật lái xe",
          countLabel: "09 mục",
          chapters: [
            {
              label: "Chương 1",
              title: "Vị trí, tác dụng các bộ phận trong buồng lái",
              description:
                "Khám phá buồng lái qua bài giảng 360°, nhận biết vị trí và chức năng các bộ phận để làm quen xe trước giờ thực hành. Đăng ký học ngay để tự tin hơn khi vào buồng lái.",
              lessons: [
                {
                  badge: "360°",
                  title: "Bài giảng 360° tham quan các bộ phận của xe ô tô",
                  viewer: {
                    kind: "lesson",
                    title: "Bài giảng 360° tham quan các bộ phận của xe ô tô",
                    videoUrl: "https://youtu.be/8DGmYr3N-DI",
                  },
                },
              ],
            },
            { label: "Chương 2", title: "Kỹ thuật lái xe cơ bản" },
            { label: "Chương 3", title: "Kỹ thuật lái xe trên các loại đường" },
            { label: "Chương 4", title: "Kỹ thuật lái xe an toàn chủ động" },
            { label: "Chương 5", title: "Kỹ thuật lái xe ô tô chở hàng hóa" },
            { label: "Chương 6", title: "Tâm lý điều khiển xe ô tô" },
            {
              label: "Chương 7",
              title: "Phương pháp thực hành lái xe tổng hợp",
              description:
                "Luyện 11 bài tập từ xuất phát đến kết thúc bài sát hạch, làm quen trình tự và củng cố kỹ năng lái. Đăng ký học ngay để tự tin hơn trước ngày sát hạch.",
              situationCards: [
                {
                  number: "1",
                  title: "Xuất phát",
                  viewer: {
                    kind: "document",
                    doc: "ky-thuat-lai-xe",
                    target: "chap-7-content-1",
                  },
                },
                {
                  number: "2",
                  title: "Dừng xe nhường đường cho người đi bộ",
                  viewer: {
                    kind: "document",
                    doc: "ky-thuat-lai-xe",
                    target: "chap-7-content-2",
                  },
                },
                {
                  number: "3",
                  title: "Dừng xe và khởi hành ngang dốc",
                  viewer: {
                    kind: "document",
                    doc: "ky-thuat-lai-xe",
                    target: "chap-7-content-3",
                  },
                },
                {
                  number: "4",
                  title: "Qua vệt bánh xe và đường hẹp vuông góc",
                  viewer: {
                    kind: "document",
                    doc: "ky-thuat-lai-xe",
                    target: "chap-7-content-4",
                  },
                },
                {
                  number: "5",
                  title: "Qua ngã tư có đèn tín hiệu giao thông",
                  viewer: {
                    kind: "document",
                    doc: "ky-thuat-lai-xe",
                    target: "chap-7-content-5",
                  },
                },
                {
                  number: "6",
                  title: "Đường vòng quanh co",
                  viewer: {
                    kind: "document",
                    doc: "ky-thuat-lai-xe",
                    target: "chap-7-content-6",
                  },
                },
                {
                  number: "7",
                  title: "Ghép xe dọc vào nơi đỗ",
                  viewer: {
                    kind: "document",
                    doc: "ky-thuat-lai-xe",
                    target: "chap-7-content-7",
                  },
                },
                {
                  number: "8",
                  title: "Tạm dừng ở nơi có đường sắt chạy qua",
                  viewer: {
                    kind: "document",
                    doc: "ky-thuat-lai-xe",
                    target: "chap-7-content-8",
                  },
                },
                {
                  number: "9",
                  title: "Thay đổi số trên đường bằng",
                  viewer: {
                    kind: "document",
                    doc: "ky-thuat-lai-xe",
                    target: "chap-7-content-9",
                  },
                },
                {
                  number: "10",
                  title: "Ghép xe ngang vào nơi đỗ",
                  viewer: {
                    kind: "document",
                    doc: "ky-thuat-lai-xe",
                    target: "chap-7-content-10",
                  },
                },
                {
                  number: "11",
                  title: "Bài kết thúc",
                  viewer: {
                    kind: "document",
                    doc: "ky-thuat-lai-xe",
                    target: "chap-7-content-11",
                  },
                },
              ],
            },
            {
              label: "Chương 8",
              title:
                "Kỹ thuật kiểm tra, quan sát an toàn, chỉnh gương chiếu hậu trước khi cho xe tập lái xuất phát",
            },
            {
              label: "Chương 9",
              title: "Kỹ thuật thực hiện các tình huống học lái xe ô tô",
            },
          ],
        },
      ],
    },
    {
      number: "05",
      title: "Phần mềm mô phỏng tình huống giao thông",
      metas: ["120 tình huống"],
      parts: [],
    },
    {
      number: "06",
      title: "Thực hành lái xe",
      metas: ["4 chương"],
      parts: [
        {
          tone: "II",
          chip: "Môn 6",
          title: "Thực hành lái xe",
          countLabel: "04 mục",
          chapters: [
            {
              label: "Chương 1",
              title: "Tập lái xe trên xe ô tô được kê kích",
            },
            { label: "Chương 2", title: "Tập lái xe trên sân tập lái" },
            { label: "Chương 3", title: "Tập lái xe trên đường giao thông" },
            {
              label: "Chương 4",
              title: "Ôn luyện theo các nội dung sát hạch lái xe",
            },
          ],
        },
      ],
    },
  ];
