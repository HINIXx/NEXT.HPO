"use client";

import { useMemo, useState } from "react";
import {
  ALL_QUESTIONS_TOPIC_KEY,
  buildPracticeTopics,
  type QuestionBank,
} from "../data/driving-theory-question-bank";

export type PracticeAnswer = { choice: number; correct: boolean };

/**
 * Trạng thái chế độ ôn tập (V2 `on-tap/script.js`): nội dung đang chọn, câu đang xem, đáp án đã chọn.
 * Giữ ở component cha → chuyển sang thi thử rồi quay lại vẫn còn tiến độ (như V2).
 * Mỗi câu chỉ trả lời 1 lần; đổi nội dung hoặc "Làm lại" thì xóa tiến độ.
 */
export function usePracticeQuizSession(bank: QuestionBank | null) {
  const [topicKey, setTopicKey] = useState(ALL_QUESTIONS_TOPIC_KEY);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<ReadonlyMap<number, PracticeAnswer>>(
    () => new Map(),
  );
  const [resultOpen, setResultOpen] = useState(false);

  const topics = useMemo(
    () => (bank ? buildPracticeTopics(bank) : null),
    [bank],
  );
  const activeTopic =
    topics?.find((topic) => topic.key === topicKey) ?? topics?.[0] ?? null;
  const questions = activeTopic?.questions ?? [];
  const question = questions[index] ?? null;
  const currentAnswer = answers.get(index) ?? null;
  const correctCount = [...answers.values()].filter((a) => a.correct).length;

  const resetProgress = () => {
    setIndex(0);
    setAnswers(new Map());
    setResultOpen(false);
  };

  return {
    topics,
    activeTopic,
    questions,
    question,
    index,
    answers,
    currentAnswer,
    correctCount,
    resultOpen,
    setResultOpen,
    isLast: index === questions.length - 1,
    selectTopic(key: string) {
      setTopicKey(key);
      resetProgress();
    },
    restart: resetProgress,
    goTo(nextIndex: number) {
      if (nextIndex >= 0 && nextIndex < questions.length) setIndex(nextIndex);
    },
    answer(choice: number) {
      if (!question || answers.has(index)) return;
      setAnswers((previous) =>
        new Map(previous).set(index, {
          choice,
          correct: choice === question.correctIndex,
        }),
      );
    },
  };
}

export type PracticeQuizSession = ReturnType<typeof usePracticeQuizSession>;
