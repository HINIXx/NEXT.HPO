import type { LearningViewerRequest } from "@/features/learning-resources/data/learning-resource-catalog";

/**
 * Danh mục "Chương trình đào tạo lái xe ô tô thông minh" (V2 `#chuong-trinh-mon-hoc`, trang Quy trình + trang chủ):
 * môn → phần (sọc màu, mở/đóng) → chương (nhãn "CHƯƠNG N") → học liệu (bài giảng, 5 nhóm biển báo, thẻ sa hình/11 bài).
 * `viewer` trống = V2 không có trình xem cho mục đó → hiện dạng chữ.
 */
export type CurriculumLessonItem = {
  /** "BG" (bài giảng) hoặc "360°". */
  badge: string;
  title: string;
  tag?: { text: string; tone: "blue" | "fire" | "green" };
  viewer?: LearningViewerRequest;
};

export type CurriculumSituationCard = {
  number: string;
  title: string;
  viewer: LearningViewerRequest;
};

export type CurriculumChapter = {
  label: string;
  title: string;
  description?: string;
  lessons?: readonly CurriculumLessonItem[];
  situationCards?: readonly CurriculumSituationCard[];
  /** Hiện lưới 5 nhóm biển báo (bấm → trang xem biển báo). */
  showsRoadSignGroups?: boolean;
};

/** Màu sọc/nhãn phần theo V2 `.phan--I` đỏ · `--II` xanh lá · `--III` nâu cam. */
export type CurriculumPartTone = "I" | "II" | "III";

export type CurriculumPart = {
  tone: CurriculumPartTone;
  chip: string;
  title: string;
  countLabel: string;
  description?: string;
  chapters: readonly CurriculumChapter[];
};

export type SmartCurriculumSubject = {
  number: string;
  title: string;
  metas: readonly string[];
  /** Trống = môn không có danh mục mở rộng (V2 môn 05 Phần mềm mô phỏng). */
  parts: readonly CurriculumPart[];
};
