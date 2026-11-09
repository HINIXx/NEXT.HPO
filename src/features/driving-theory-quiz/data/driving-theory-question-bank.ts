/**
 * Ngân hàng 600 câu hỏi lý thuyết (V2 `on-tap/script.js`).
 * Dữ liệu gốc `public/assets/data/600tn.json` (giữ URL V2, ~340 KB) tải khi vào trang — không đưa vào bundle JS.
 */

/** Ảnh câu hỏi nằm trên LMS (đường dẫn tương đối trong JSON). */
const QUESTION_IMAGE_ORIGIN = "https://lms.hpo.edu.vn";
export const QUESTION_BANK_URL = "/assets/data/600tn.json";

type RawQuestion = {
  active: boolean;
  answers: string;
  trueAnswer: number | string;
  importance?: boolean;
  title: string;
  image?: string | null;
};

type RawCategory = { _id: string; order: number; questions: RawQuestion[] };

export type QuizQuestion = {
  /** Khóa so trùng câu giữa các đề (V2 `questionKey`: tiêu đề + ảnh). */
  key: string;
  title: string;
  answers: string[];
  correctIndex: number;
  /** Câu điểm liệt. */
  isCritical: boolean;
  imageUrl: string | null;
};

export type QuizCategory = {
  name: string;
  /** Phần trong cấu trúc đề (1–7). Phần 2 = câu điểm liệt. */
  order: number;
  questions: QuizQuestion[];
};

export type QuestionBank = {
  categories: QuizCategory[];
  questions: QuizQuestion[];
};

/** "1. Đáp án…\n2. Đáp án…" → ["Đáp án…", "Đáp án…"]. */
const splitAnswers = (value: string) =>
  String(value || "")
    .split(/\n+/)
    .map((answer) => answer.replace(/^\s*\d+[.)]\s*/, "").trim())
    .filter(Boolean);

const resolveImageUrl = (path?: string | null) => {
  if (!path) return null;
  return /^https?:\/\//i.test(path) ? path : `${QUESTION_IMAGE_ORIGIN}${path}`;
};

const toQuizQuestion = (raw: RawQuestion): QuizQuestion => ({
  key: `${raw.title}|${raw.image || ""}`,
  title: raw.title || "",
  answers: splitAnswers(raw.answers),
  correctIndex: Number(raw.trueAnswer),
  isCritical: Boolean(raw.importance),
  imageUrl: resolveImageUrl(raw.image),
});

/** Giống V2: xếp theo `order`, bỏ câu không active, đảo ngược thứ tự trong từng chương. */
export function normalizeQuestionBank(data: RawCategory[]): QuestionBank {
  const categories = [...data]
    .sort((a, b) => a.order - b.order)
    .map((category) => ({
      name: category._id,
      order: Number(category.order),
      questions: category.questions
        .filter((question) => question.active)
        .reverse()
        .map(toQuizQuestion),
    }));
  return {
    categories,
    questions: categories.flatMap((category) => category.questions),
  };
}

export async function fetchQuestionBank(signal?: AbortSignal) {
  const response = await fetch(QUESTION_BANK_URL, { signal });
  if (!response.ok) throw new Error("Không thể tải dữ liệu");
  return normalizeQuestionBank((await response.json()) as RawCategory[]);
}

export type PracticeTopic = {
  key: string;
  /** "Tất cả" · "Chương 1" · "Câu điểm liệt". */
  label: string;
  name: string;
  isChapter: boolean;
  isCritical: boolean;
  questions: QuizQuestion[];
};

export const ALL_QUESTIONS_TOPIC_KEY = "all";

/** Danh sách nội dung ôn: Tất cả · 6 chương (bỏ nhóm điểm liệt) · Câu điểm liệt. */
export function buildPracticeTopics(bank: QuestionBank): PracticeTopic[] {
  const chapters = bank.categories.filter(
    (category) => !category.name.toLowerCase().includes("điểm liệt"),
  );
  return [
    {
      key: ALL_QUESTIONS_TOPIC_KEY,
      label: "Tất cả",
      name: "Toàn bộ ngân hàng 600 câu hỏi",
      isChapter: false,
      isCritical: false,
      questions: bank.questions,
    },
    ...chapters.map((category, index) => ({
      key: `chapter-${category.order}`,
      label: `Chương ${index + 1}`,
      name: category.name,
      isChapter: true,
      isCritical: false,
      questions: category.questions,
    })),
    {
      key: "critical",
      label: "Câu điểm liệt",
      name: "60 câu hỏi điểm liệt",
      isChapter: false,
      isCritical: true,
      questions: bank.questions.filter((question) => question.isCritical),
    },
  ];
}

export const answerLetter = (index: number) => String.fromCharCode(65 + index);
