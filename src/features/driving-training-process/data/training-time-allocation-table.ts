/**
 * Bảng "Phân bổ thời gian đào tạo xe ô tô" (Khoản 1, Điều 2 TT 17/2026/TT-BXD) — số liệu chép đúng V2 @0709939.
 * Cột giá trị theo hạng: B số tự động · B cơ khí · C1.
 */
export type LicenseClassKey = "bauto" | "bmanual" | "c1";

export const licenseClassTabs: readonly {
  key: LicenseClassKey;
  label: string;
}[] = [
  { key: "bauto", label: "Hạng B số tự động" },
  { key: "bmanual", label: "Hạng B cơ khí" },
  { key: "c1", label: "Hạng C1" },
];

/**
 * Ô "Nội dung" bấm được → mở chương trình khung môn học (V2 `.mon-cell[data-mon-modal]`).
 * `sections`: chỉ hiện các phần đó của môn (V2 `data-mon-sections`).
 */
export type SyllabusModalLink = {
  subjectKey: string;
  title: string;
  ariaLabel: string;
  sections?: readonly string[];
};

export type TrainingTimeRow =
  | {
      kind: "group";
      tone: "theory" | "practice" | "total";
      label: string;
      unit: string;
      values: Record<LicenseClassKey, string>;
      syllabus?: SyllabusModalLink;
    }
  | {
      kind: "item";
      order: string;
      /** Ô STT gộp nhiều dòng (V2 "Trong đó" rowspan=2); 0 = dòng bị gộp, không vẽ ô STT. */
      orderRowSpan?: number;
      label: string;
      unit: string;
      values: Record<LicenseClassKey, string>;
      syllabus?: SyllabusModalLink;
    };

const subjectThreeTitle =
  "Môn III — Đạo đức người lái xe, văn hóa giao thông và phòng chống tác hại của rượu, bia khi tham gia giao thông, kỹ năng PCCC và CNCH";

export const trainingTimeRows: readonly TrainingTimeRow[] = [
  {
    kind: "group",
    tone: "theory",
    label: "I. Đào tạo lý thuyết",
    unit: "giờ",
    values: { bauto: "136", bmanual: "152", c1: "152" },
  },
  {
    kind: "item",
    order: "1",
    label: "Pháp luật về giao thông đường bộ",
    unit: "giờ",
    values: { bauto: "90", bmanual: "90", c1: "90" },
    syllabus: {
      subjectKey: "mon-01",
      title: "Môn I — Pháp luật về giao thông đường bộ",
      ariaLabel: "Xem chương trình khung môn Pháp luật về giao thông đường bộ",
    },
  },
  {
    kind: "item",
    order: "2",
    label: "Cấu tạo và sửa chữa thông thường",
    unit: "giờ",
    values: { bauto: "8", bmanual: "18", c1: "18" },
    syllabus: {
      subjectKey: "mon-02",
      title: "Môn II — Cấu tạo và sửa chữa thông thường",
      ariaLabel: "Xem chương trình khung môn Cấu tạo và sửa chữa thông thường",
    },
  },
  {
    kind: "item",
    order: "3",
    label:
      "Đạo đức, văn hóa giao thông và phòng chống tác hại của rượu, bia khi tham gia giao thông",
    unit: "giờ",
    values: { bauto: "10", bmanual: "16", c1: "16" },
    syllabus: {
      subjectKey: "mon-03",
      title: subjectThreeTitle,
      ariaLabel: "Xem chương trình khung môn Đạo đức, văn hóa giao thông",
    },
  },
  {
    kind: "item",
    order: "",
    label: "Kỹ năng phòng cháy, chữa cháy và cứu nạn, cứu hộ",
    unit: "giờ",
    values: { bauto: "4", bmanual: "4", c1: "4" },
    syllabus: {
      subjectKey: "mon-03",
      title: subjectThreeTitle,
      ariaLabel:
        "Xem chương trình khung kỹ năng phòng cháy, chữa cháy và cứu nạn, cứu hộ",
    },
  },
  {
    kind: "item",
    order: "4",
    label: "Kỹ thuật lái xe",
    unit: "giờ",
    values: { bauto: "20", bmanual: "20", c1: "20" },
    syllabus: {
      subjectKey: "mon-04",
      title: "Môn V — Kỹ thuật lái xe",
      ariaLabel: "Xem chương trình khung môn Kỹ thuật lái xe",
    },
  },
  {
    kind: "item",
    order: "5",
    label: "Học phần mềm mô phỏng các tình huống giao thông",
    unit: "giờ",
    values: { bauto: "4", bmanual: "4", c1: "4" },
  },
  {
    kind: "group",
    tone: "practice",
    label: "II. Đào tạo thực hành",
    unit: "giờ",
    values: { bauto: "60", bmanual: "76", c1: "85" },
    syllabus: {
      subjectKey: "mon-thuc-hanh",
      title: "Môn VI — Thực hành lái xe",
      ariaLabel: "Xem toàn bộ nội dung chương trình thực hành lái xe",
    },
  },
  {
    kind: "item",
    order: "1",
    label: "Thời gian học thực hành lái xe trên sân tập lái của 01 học viên",
    unit: "giờ",
    values: { bauto: "34", bmanual: "34", c1: "35" },
    syllabus: {
      subjectKey: "mon-thuc-hanh",
      title: "Môn VI — Thực hành lái xe",
      ariaLabel: "Xem nội dung chương trình thực hành lái xe",
      sections: ["1", "2"],
    },
  },
  {
    kind: "item",
    order: "2",
    label:
      "Thời gian học thực hành lái xe trên đường giao thông của 01 học viên",
    unit: "giờ",
    values: { bauto: "24", bmanual: "40", c1: "48" },
    syllabus: {
      subjectKey: "mon-thuc-hanh",
      title: "Môn VI — Thực hành lái xe",
      ariaLabel: "Xem nội dung chương trình thực hành lái xe",
      sections: ["3", "4"],
    },
  },
  {
    kind: "item",
    order: "3",
    label: "Thời gian học thực hành trên cabin học lái xe ô tô của 01 học viên",
    unit: "giờ",
    values: { bauto: "2", bmanual: "2", c1: "2" },
    syllabus: {
      subjectKey: "mon-cabin",
      title: "Thực hành trên cabin học lái xe ô tô",
      ariaLabel: "Xem danh sách các bài thực hành cabin",
    },
  },
  {
    kind: "item",
    order: "4",
    label: "Tổng quãng đường học thực hành của 01 học viên",
    unit: "km",
    values: { bauto: "950", bmanual: "1.050", c1: "1.050" },
  },
  {
    kind: "item",
    order: "Trong đó",
    orderRowSpan: 2,
    label: "Quãng đường học thực hành lái xe trên sân tập lái của 01 học viên",
    unit: "km",
    values: { bauto: "240", bmanual: "240", c1: "225" },
  },
  {
    kind: "item",
    order: "",
    orderRowSpan: 0,
    label:
      "Quãng đường học thực hành lái xe trên đường giao thông của 01 học viên",
    unit: "km",
    values: { bauto: "710", bmanual: "810", c1: "825" },
  },
  {
    kind: "group",
    tone: "total",
    label: "III. Tổng thời gian đào tạo",
    unit: "giờ",
    values: { bauto: "196", bmanual: "228", c1: "237" },
  },
];
