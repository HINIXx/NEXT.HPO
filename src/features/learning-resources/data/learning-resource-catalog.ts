/**
 * Danh mục học liệu dùng chung (trang Quy trình đào tạo + trang chủ — V2 `assets/js/learning.js`, `quy-dinh…/script.js`).
 *
 * 1. Trang xem tĩnh `public/assets/learning-views/<doc>.html` (sinh từ V2 `assets/data/*-view.html` + CSS V2 đã lọc,
 *    script: `plans/reports/screenshots-gd4/generate-standalone-learning-view-documents.cjs`). Mở trong iframe,
 *    `#<mục>` để nhảy tới mục; trang báo mục đang xem qua postMessage `{ type: "hpo-learning-view", activeId }`.
 * 2. Bài giảng: video YouTube + tóm tắt + câu hỏi trắc nghiệm (`/assets/data/mon-02-chap-08.json`, `/assets/data/lesson-data.json`).
 */
export type LearningDocumentKey =
  "bien-bao" | "sa-hinh" | "loi-sa-hinh" | "engine-4ky" | "ky-thuat-lai-xe";

export type LearningViewerRequest =
  | { kind: "document"; doc: LearningDocumentKey; target?: string }
  | {
      kind: "lesson";
      title: string;
      /** Khóa bài trong file JSON (V2 `data-target`). */
      lessonTarget?: string;
      /** Link YouTube khi bài không có trong JSON (vd video 360°). */
      videoUrl?: string;
    };

export const learningDocuments: Record<
  LearningDocumentKey,
  {
    kicker: string;
    defaultTitle: string;
    sectionTitles?: Record<string, string>;
  }
> = {
  "bien-bao": {
    kicker: "Hệ thống báo hiệu đường bộ",
    defaultTitle: "5 loại biển báo",
    sectionTitles: {
      "bien-cam": "Biển báo cấm",
      "nguy-hiem": "Biển nguy hiểm",
      "hieu-lenh": "Biển hiệu lệnh",
      "chi-dan": "Biển chỉ dẫn",
      "bien-phu": "Biển phụ",
    },
  },
  "sa-hinh": {
    kicker: "Các nguyên tắc đi sa hình",
    defaultTitle: "Nguyên tắc đi sa hình",
    sectionTitles: {
      "nguyen-tac-1": "Xe có đường riêng",
      "nguyen-tac-2": "Quyền bình đẳng xe vào nơi đường giao nhau",
      "nguyen-tac-3": "Xe ưu tiên theo luật giao thông đường bộ",
      "nguyen-tac-4": "Xe ở đường ưu tiên",
      "nguyen-tac-5": "Xe có quyền ưu tiên bên phải",
      "nguyen-tac-6": "Quyền ưu tiên đối với xe đi cùng đoàn, cùng hướng",
      "nguyen-tac-7": "Xe phải nhường đường khi rẽ trái",
    },
  },
  "loi-sa-hinh": {
    kicker: "Phương pháp thực hành lái xe tổng hợp",
    defaultTitle: "11 bài thi sa hình",
  },
  "engine-4ky": {
    kicker: "Động cơ xe ô tô",
    defaultTitle: "Nguyên lý làm việc của động cơ 4 kỳ",
  },
  "ky-thuat-lai-xe": {
    kicker: "Phương pháp thực hành lái xe tổng hợp",
    defaultTitle: "11 bài thực hành",
    sectionTitles: Object.fromEntries(
      [
        "Xuất phát",
        "Dừng xe nhường đường cho người đi bộ",
        "Dừng xe và khởi hành ngang dốc",
        "Qua vệt bánh xe và đường hẹp vuông góc",
        "Qua ngã tư có đèn tín hiệu giao thông",
        "Đường vòng quanh co",
        "Ghép xe dọc vào nơi đỗ",
        "Tạm dừng ở nơi có đường sắt chạy qua",
        "Thay đổi số trên đường bằng",
        "Ghép xe ngang vào nơi đỗ",
        "Bài kết thúc",
      ].map((title, index) => [`chap-7-content-${index + 1}`, title]),
    ),
  },
};

export const learningDocumentUrl = (
  doc: LearningDocumentKey,
  target?: string,
) => `/assets/learning-views/${doc}.html${target ? `#${target}` : ""}`;

/** Video YouTube "Bài giảng 360° tham quan các bộ phận của xe ô tô" (V2 `VIDEO_360_URL`). */
export const cabin360VideoUrl = "https://www.youtube.com/embed/8DGmYr3N-DI";

export type LessonSummaryBlock = {
  id: number;
  title: string;
  causes?: string[];
  solutions?: string[];
  other?: string[];
};
export type LessonQuizQuestion = {
  id: number;
  question: string;
  options: { id: string; text: string; correct: boolean }[];
};
export type LessonRecord = {
  target: string;
  src: string;
  content: LessonSummaryBlock[];
  questions: LessonQuizQuestion[];
};

const lessonFiles = [
  "/assets/data/mon-02-chap-08.json",
  "/assets/data/lesson-data.json",
];
let lessonsPromise: Promise<LessonRecord[]> | null = null;

/** Tải 2 file bài giảng 1 lần (khi mở bài đầu tiên), giữ trong bộ nhớ. */
export function loadLessonRecords(): Promise<LessonRecord[]> {
  lessonsPromise ??= Promise.all(
    lessonFiles.map((file) =>
      fetch(file).then((response) => {
        if (!response.ok) throw new Error(`Không tải được ${file}`);
        return response.json() as Promise<{ data: LessonRecord[] }>;
      }),
    ),
  )
    .then((files) => files.flatMap((file) => file.data))
    .catch((error) => {
      lessonsPromise = null;
      throw error;
    });
  return lessonsPromise;
}

/** Mã video YouTube từ link youtu.be / youtube.com/embed / watch?v=. */
export function youtubeVideoId(url: string): string | undefined {
  return url.match(/(?:youtu\.be\/|embed\/|[?&]v=)([\w-]{11})/)?.[1];
}

export const youtubeEmbedUrl = (id: string) =>
  `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
