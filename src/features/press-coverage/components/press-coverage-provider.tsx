"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  buildTimePressArticles,
  refreshPressArticles,
  type PressArticle,
} from "../data/press-coverage-articles";
import { PressCoverageListDialog } from "./press-coverage-list-dialog";

type PressCoverageContextValue = {
  articles: readonly PressArticle[];
  openList: (trigger: HTMLElement) => void;
};

const PressCoverageContext = createContext<PressCoverageContextValue>({
  articles: buildTimePressArticles,
  openList: () => {},
});

export const usePressCoverage = () => useContext(PressCoverageContext);

/**
 * Bọc các khu báo chí trang chủ (dải "Báo chí đưa tin" + "Bài báo về Hiệp Phát"): dữ liệu bài + hộp "Xem tất cả" dùng chung.
 * Render đầu bằng dữ liệu lúc build, sau đó tải bao-chi.json mới nhất.
 */
export function PressCoverageProvider({ children }: { children: ReactNode }) {
  const [articles, setArticles] = useState<readonly PressArticle[]>(
    buildTimePressArticles,
  );
  const [dialogTrigger, setDialogTrigger] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    refreshPressArticles().then((fresh) => {
      if (!cancelled && fresh?.length) setArticles(fresh);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <PressCoverageContext.Provider
      value={{
        articles,
        openList: (trigger) => {
          setDialogTrigger(trigger);
          setOpen(true);
        },
      }}
    >
      {children}
      <PressCoverageListDialog
        open={open}
        onClose={() => setOpen(false)}
        articles={articles}
        returnFocusTo={dialogTrigger}
      />
    </PressCoverageContext.Provider>
  );
}
