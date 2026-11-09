"use client";

import { useEffect, useState } from "react";
import {
  fetchQuestionBank,
  type QuestionBank,
} from "../data/driving-theory-question-bank";

export type QuestionBankStatus = "loading" | "ready" | "error";

/** Tải ngân hàng 600 câu một lần khi vào trang (như V2), chạy nền không chặn hiển thị. */
export function useDrivingTheoryQuestionBank() {
  const [bank, setBank] = useState<QuestionBank | null>(null);
  const [status, setStatus] = useState<QuestionBankStatus>("loading");

  useEffect(() => {
    const controller = new AbortController();
    fetchQuestionBank(controller.signal)
      .then((loaded) => {
        setBank(loaded);
        setStatus("ready");
      })
      .catch(() => {
        if (!controller.signal.aborted) setStatus("error");
      });
    return () => controller.abort();
  }, []);

  return { bank, status };
}
