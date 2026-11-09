import { trainingProcessImageBase } from "./driving-training-process-steps";

/**
 * Nội dung Bước 3 (Xét, kiểm tra hoàn thành khóa đào tạo — khoản 2, điều 2 TT17/2026 sửa khoản 4, điều 6 TT14/2025)
 * và Bước 4 (Sát hạch) — chữ chép đúng V2 @0709939. Phần chữ nhấn đỏ đánh dấu bằng `**…**`.
 */
const completion = `${trainingProcessImageBase}/completion`;

export type CompletionImage = { src: string; width: number; height: number };
const image = (
  name: string,
  width: number,
  height: number,
): CompletionImage => ({
  src: `${completion}/${name}`,
  width,
  height,
});

/** a) 5 nội dung cơ sở đào tạo tổ chức kiểm tra. */
export const completionCheckItems: readonly {
  index: string;
  title: string;
  description?: string;
  image: CompletionImage;
}[] = [
  {
    index: "01",
    title: "Nội dung đào tạo lý thuyết",
    description: "Theo bộ câu hỏi sát hạch lý thuyết do Bộ Công an ban hành;",
    image: image("completion-checklist.png", 496, 392),
  },
  {
    index: "02",
    title: "Nội dung đào tạo mô phỏng các tình huống giao thông;",
    image: image("completion-simulator-card.jpg", 992, 784),
  },
  {
    index: "03",
    title: "Bài liên hoàn",
    description: "Nội dung đào tạo thực hành lái xe",
    image: image("completion-linked-course.png", 1254, 1254),
  },
  {
    index: "04",
    title: "Bài tiến lùi hình chữ chi",
    description: "Nội dung đào tạo thực hành lái xe",
    image: image("evaluation-zigzag.png", 1774, 887),
  },
  {
    index: "05",
    title: "Lái xe trên đường",
    description: "Nội dung đào tạo thực hành lái xe",
    image: image("completion-road-driving.png", 500, 392),
  },
];

/** b) 3 điều kiện được kiểm tra. */
export const completionEligibilityConditions: readonly {
  number: string;
  text: string;
  image: CompletionImage;
}[] = [
  {
    number: "1",
    text: "Tham dự **tối thiểu 70%** thời gian học nội dung đào tạo lý thuyết;",
    image: image("completion-checklist.png", 496, 392),
  },
  {
    number: "2",
    text: "**Tham dự đủ thời gian** và **tối thiểu 50% quãng đường** học thực hành lái xe trên sân tập lái;",
    image: image("completion-practice-yard.png", 496, 392),
  },
  {
    number: "3",
    text: "**Tham dự đủ quãng đường** và **tối thiểu 50% thời gian** học thực hành lái xe trên đường;",
    image: image("completion-road-driving.png", 500, 392),
  },
];

/** c) Quy trình kiểm tra, đánh giá. */
export const completionEvaluationProcedures: readonly {
  step: string;
  title: string;
  description: string;
  image: CompletionImage;
}[] = [
  {
    step: "1",
    title:
      "Nội dung đào tạo lý thuyết, thực hành lái xe với bài liên hoàn và lái xe trên đường",
    description: "Theo quy trình sát hạch lái xe do Bộ Công an ban hành;",
    image: image("evaluation-theory-practice.png", 1692, 929),
  },
  {
    step: "2",
    title: "Nội dung đào tạo mô phỏng các tình huống giao thông",
    description:
      "Theo quy định tại Phụ lục XXVIII ban hành kèm theo Thông tư này với thang điểm 10 (từ 1 đến 10) có tính đến hàng thập phân 1 con số;",
    image: image("evaluation-simulator.png", 1536, 1024),
  },
  {
    step: "3",
    title: "Nội dung đào tạo bài tiến lùi chữ chi",
    description:
      "Theo quy định tại Phụ lục XXIX ban hành kèm theo Thông tư này với thang điểm 10 (từ 1 đến 10) có tính đến hàng thập phân 1 con số;",
    image: image("evaluation-zigzag.png", 1774, 887),
  },
];

/** d) Xét hoàn thành khóa đào tạo. */
export const completionReviewRules: readonly {
  index: string;
  lead?: string;
  items: readonly string[];
  result: string;
  image: CompletionImage;
}[] = [
  {
    index: "1",
    lead: "Người học lái xe có điểm kiểm tra:",
    items: [
      "Nội dung đào tạo lý thuyết;",
      "Nội dung đào tạo thực hành lái xe với bài liên hoàn;",
      "Nội dung đào tạo thực hành lái xe trên đường.",
    ],
    result:
      "Đạt yêu cầu với hạng tương ứng theo quy trình sát hạch lái xe do Bộ Công an ban hành.",
    image: image("completion-result.png", 500, 392),
  },
  {
    index: "2",
    items: ["Nội dung đào tạo mô phỏng các tình huống giao thông."],
    result: "Đạt từ 5,0 trở lên.",
    image: image("evaluation-simulator.png", 1536, 1024),
  },
  {
    index: "3",
    items: ["Nội dung đào tạo thực hành lái xe với bài tiến lùi chữ chi."],
    result: "Đạt từ 5,0 trở lên.",
    image: image("evaluation-zigzag.png", 1774, 887),
  },
];

/** Bước 4: 5 giấy tờ do cơ sở đào tạo chuẩn bị (thẻ 01–05). */
export const examDossierCenterDocuments: readonly {
  number: string;
  title: string;
  note?: string;
}[] = [
  { number: "01", title: "Kế hoạch đào tạo của cơ sở đào tạo lái xe" },
  {
    number: "02",
    title:
      "Danh sách học viên tham gia khóa đào tạo (BC1) đã được Sở Xây dựng thành phố duyệt",
  },
  {
    number: "03",
    title: "Quyết định hoàn thành khóa đào tạo",
    note: "Kèm danh sách học viên.",
  },
  { number: "04", title: "Danh sách thí sinh dự sát hạch" },
  {
    number: "05",
    title:
      "Danh sách vắng trượt của kỳ sát hạch trước có tên học viên đăng ký sát hạch của kỳ này",
  },
];

/** Bước 4 thẻ 06: hồ sơ của học viên. */
export const examDossierStudentDocuments: readonly {
  number: string;
  text: string;
  italicNote?: string;
  papers?: readonly string[];
}[] = [
  {
    number: "6.1",
    text: "Đơn đề nghị học lái xe",
    italicNote: "(theo Thông tư 14/2025/TT-BXD)",
  },
  { number: "6.2", text: "Giấy xác nhận hoàn thành khóa đào tạo lái xe." },
  { number: "6.3", text: "Giấy khám sức khỏe." },
  {
    number: "6.4",
    text: "Bản sao hoặc bản sao điện tử được chứng thực từ bản chính hoặc bản sao điện tử được cấp từ sổ gốc một trong các giấy tờ sau:",
    papers: [
      "CCCD",
      "Thẻ tạm trú",
      "Thẻ thường trú",
      "Chứng minh thư ngoại giao",
      "Chứng minh thư công vụ đối với người nước ngoài",
    ],
  },
];

export const examContentItems = [
  "Bài thi lý thuyết",
  "Bài thi thực hành trên hình",
  "Bài thi thực hành trên đường",
] as const;
