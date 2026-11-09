import type {
  QuestionBank,
  QuizQuestion,
} from "./driving-theory-question-bank";

/**
 * Thi thử sát hạch hạng B / C1 (V2 `on-tap/mock-exam.js`).
 * `questionCountByPart[i]` = số câu lấy từ phần i+1 (theo `order` của chương); phần 2 là câu điểm liệt,
 * được chèn vào vị trí ngẫu nhiên sau khi tạo các phần còn lại.
 */
export type MockExamMode = "B" | "C1";

export type MockExamConfig = {
  title: string;
  timeLimitMinutes: number;
  questionCountByPart: readonly number[];
  criticalQuestionsRequired: number;
  passMark: number;
};

export const mockExamConfigs: Record<MockExamMode, MockExamConfig> = {
  B: {
    title: "Thi thử hạng B",
    timeLimitMinutes: 20,
    questionCountByPart: [8, 1, 1, 1, 1, 9, 9],
    criticalQuestionsRequired: 1,
    passMark: 27,
  },
  C1: {
    title: "Thi thử hạng C1",
    timeLimitMinutes: 22,
    questionCountByPart: [10, 1, 1, 2, 1, 10, 10],
    criticalQuestionsRequired: 1,
    passMark: 32,
  },
};

const CRITICAL_PART = 2;

/** Đề vừa làm của một hạng: đề mới không lặp câu, câu điểm liệt không lặp đúng vị trí cũ. */
export type PreviousMockPaper = {
  questionKeys: ReadonlySet<string>;
  criticalPosition: number | null;
};

export type MockExamPaper = {
  questions: QuizQuestion[];
  criticalPosition: number | null;
};

const shuffle = <T>(items: readonly T[]) => {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1));
    [result[index], result[other]] = [result[other], result[index]];
  }
  return result;
};

const questionsOfPart = (bank: QuestionBank, part: number) =>
  bank.categories
    .filter((category) => category.order === part)
    .flatMap((category) => category.questions);

/** Tạo đề ngẫu nhiên. Ném lỗi (câu chữ như V2) nếu ngân hàng không đủ câu. */
export function createMockExamPaper(
  bank: QuestionBank,
  config: MockExamConfig,
  previous?: PreviousMockPaper,
): MockExamPaper {
  const excluded = previous?.questionKeys ?? new Set<string>();
  const used = new Set<string>();
  const questions: QuizQuestion[] = [];

  config.questionCountByPart.forEach((count, index) => {
    const part = index + 1;
    if (part === CRITICAL_PART) return;
    const available = questionsOfPart(bank, part).filter(
      (question) =>
        !question.isCritical &&
        !used.has(question.key) &&
        !excluded.has(question.key),
    );
    if (available.length < count) {
      throw new Error(`Phần ${part} hiện không đủ câu hỏi để tạo đề.`);
    }
    shuffle(available)
      .slice(0, count)
      .forEach((question) => {
        used.add(question.key);
        questions.push(question);
      });
  });

  const criticalPool = questionsOfPart(bank, CRITICAL_PART).filter(
    (question) =>
      question.isCritical &&
      !used.has(question.key) &&
      !excluded.has(question.key),
  );
  if (criticalPool.length < config.criticalQuestionsRequired) {
    throw new Error("Không đủ câu điểm liệt để tạo đề mới.");
  }

  let criticalPosition: number | null = null;
  shuffle(criticalPool)
    .slice(0, config.criticalQuestionsRequired)
    .forEach((question) => {
      const positions = Array.from(
        { length: questions.length + 1 },
        (_, position) => position,
      ).filter((position) => position !== previous?.criticalPosition);
      criticalPosition =
        positions[Math.floor(Math.random() * positions.length)];
      questions.splice(criticalPosition, 0, question);
    });

  return { questions, criticalPosition };
}

export type MockExamOutcome = {
  correct: number;
  answered: number;
  unanswered: number;
  passed: boolean;
  /** Trạng thái câu điểm liệt hiện trên màn kết quả. */
  criticalStatus: "đúng" | "sai" | "chưa làm" | "thiếu câu";
  criticalWrong: number;
};

export function gradeMockExam(
  questions: readonly QuizQuestion[],
  answers: readonly (number | null)[],
  config: MockExamConfig,
): MockExamOutcome {
  const correct = questions.filter(
    (question, index) => answers[index] === question.correctIndex,
  ).length;
  const critical = questions
    .map((question, index) => ({ question, answer: answers[index] }))
    .filter(({ question }) => question.isCritical);
  const criticalWrong = critical.filter(
    ({ question, answer }) => answer !== question.correctIndex,
  ).length;
  const answered = answers.filter((answer) => answer !== null).length;
  const first = critical[0];
  const criticalStatus = !first
    ? "thiếu câu"
    : first.answer === null
      ? "chưa làm"
      : first.answer === first.question.correctIndex
        ? "đúng"
        : "sai";
  return {
    correct,
    answered,
    unanswered: questions.length - answered,
    criticalWrong,
    criticalStatus,
    passed:
      correct >= config.passMark &&
      critical.length === config.criticalQuestionsRequired &&
      criticalWrong === 0,
  };
}

export function describeMockExamOutcome(
  outcome: MockExamOutcome,
  config: MockExamConfig,
  timeExpired: boolean,
) {
  const reason = outcome.passed
    ? `Bạn đạt ${outcome.correct} điểm, đủ mức yêu cầu ${config.passMark} điểm.`
    : outcome.criticalWrong > 0
      ? "Bạn sai hoặc bỏ trống câu điểm liệt nên bài thi không đạt."
      : `Bạn cần đạt ít nhất ${config.passMark} điểm để qua bài thi.`;
  return timeExpired ? `Đã hết thời gian. ${reason}` : reason;
}

export const formatCountdown = (seconds: number) =>
  `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
