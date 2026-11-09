/**
 * Kiểu dữ liệu modal "Chương trình khung" (V2 `#monModal`): môn → phần/mục → chương → học liệu bấm mở.
 * Học liệu (V2 script.js):
 * - `sign-group`: 5 nhóm biển báo → modal chi tiết biển báo (`/assets/data/bien-bao-view.html`).
 * - `engine-animation`: "Nguyên lý làm việc của động cơ 4 kỳ" (`engine-4ky-view.html`).
 * - `cabin-360`: video YouTube 360° các bộ phận trong buồng lái.
 * - `lesson-video`: bài giảng video + tóm tắt + câu hỏi (`lesson-data.json` / `mon-02-chap-08.json`).
 * - `driving-technique`: 11 bài thực hành lái xe tổng hợp (`ky-thuat-lai-xe-view.html`).
 */
export type SignGroupColorTone = "red" | "yellow" | "blue" | "gray";

export type SyllabusLearningResource =
  | {
      kind: "sign-group";
      target: string;
      name: string;
      iconSrc: string;
      shape: string;
      colorLabel: string;
      colorTone: SignGroupColorTone;
      styleCount: number;
    }
  | { kind: "engine-animation"; title: string }
  | { kind: "cabin-360"; title: string }
  | { kind: "lesson-video"; target: string; title: string }
  | {
      kind: "driving-technique";
      target: string;
      number: string;
      title: string;
    };

export type SyllabusChapter = {
  label: string;
  title: string;
  subItems?: readonly string[];
  resources?: readonly SyllabusLearningResource[];
};

export type SyllabusPart = {
  index: string;
  title: string;
  /** Mục lọc được khi mở từ dòng con của bảng (V2 `data-mon-section`). */
  sectionKey?: string;
  chapters: readonly SyllabusChapter[];
};

export type SubjectSyllabusFramework = {
  key: string;
  parts: readonly SyllabusPart[];
};
