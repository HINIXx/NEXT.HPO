import { cn } from "@/lib/utils";
import type { PracticeTopic } from "../data/driving-theory-question-bank";
import {
  quizFocusRingClassName,
  quizPanelSurfaceClassName,
} from "./quiz-workspace-shared-class-names";

const topicButtonClassName = {
  regular: {
    idle: "border-[#1e3a8a] bg-transparent text-black hover:bg-[#f0f4fb] [&_small]:text-black",
    active: "border-[#1e3a8a] bg-[#1e3a8a] text-white [&_small]:text-[#dbe4f5]",
  },
  critical: {
    idle: "border-[#e7a4a8] bg-[#fff1f2] text-[#b91c1c] hover:border-[#dc2626] hover:bg-[#dc2626] hover:text-white [&_small]:text-[#9f1e25] hover:[&_small]:text-white/78",
    active: "border-[#dc2626] bg-[#dc2626] text-white [&_small]:text-white/78",
  },
} as const;

/**
 * Cột trái chế độ ôn tập (V2 `.quiz-sidebar`): Tất cả · 6 chương · Câu điểm liệt + hộp "Lưu ý câu điểm liệt".
 * ≤520px: khung tan ra (`contents`) để xếp lại thứ tự như V2 — chương cuộn ngang ở trên, hộp lưu ý xuống sau câu hỏi
 * (các `order-*` dưới đây khớp với `order-*` trong practice-mode-workspace.tsx).
 */
export function PracticeTopicSidebar({
  topics,
  activeKey,
  onSelectTopic,
}: {
  topics: readonly PracticeTopic[] | null;
  activeKey: string;
  onSelectTopic: (key: string) => void;
}) {
  return (
    <aside
      aria-label="Chọn nội dung ôn tập"
      className={cn(
        quizPanelSurfaceClassName,
        "max-[521px]:contents min-[521px]:sticky min-[521px]:top-3 min-[521px]:col-start-1 min-[521px]:row-start-2 min-[521px]:max-h-[calc(100vh-24px)] min-[521px]:overflow-y-auto min-[821px]:top-[18px] min-[821px]:max-h-[calc(100vh-36px)]",
      )}
    >
      <p className="font-display border-b border-[#dce4f0] px-[22px] pt-[23px] pb-3 text-[15px] font-bold max-[521px]:order-1">
        Chọn nội dung ôn tập
      </p>
      <div className="grid grid-cols-1 gap-2 p-3 max-[521px]:order-2 max-[521px]:flex max-[521px]:w-full max-[521px]:min-w-0 max-[521px]:snap-x max-[521px]:snap-proximity max-[521px]:overflow-x-auto">
        {topics
          ? topics.map((topic) => {
              const active = topic.key === activeKey;
              const tone = topic.isCritical ? "critical" : "regular";
              return (
                <button
                  key={topic.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onSelectTopic(topic.key)}
                  className={cn(
                    "flex w-full min-w-0 cursor-pointer items-start rounded-[9px] border p-3 text-left transition-colors duration-200 max-[521px]:flex-[0_0_min(210px,70vw)] max-[521px]:snap-start",
                    topicButtonClassName[tone][active ? "active" : "idle"],
                    quizFocusRingClassName,
                  )}
                >
                  <span>
                    <strong className="font-display block text-[15px] leading-[1.4] font-semibold">
                      {topic.isChapter ? topic.name : topic.label}
                    </strong>
                    <small className="mt-[5px] block text-[14px] leading-[1.35]">
                      {topic.isChapter
                        ? `${topic.label} · ${topic.questions.length} câu`
                        : `${topic.questions.length} câu`}
                    </small>
                  </span>
                </button>
              );
            })
          : Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                aria-hidden="true"
                className="m-2 h-[55px] animate-pulse rounded-lg bg-[#eef2f7] max-[521px]:flex-[0_0_min(210px,70vw)]"
              />
            ))}
      </div>
      <div className="mx-3 mt-2 mb-4 flex gap-[10px] bg-[#fff4ef] p-4 max-[521px]:order-5 max-[521px]:m-0 max-[521px]:mt-[14px]">
        <span
          aria-hidden="true"
          className="grid size-6 flex-[0_0_24px] place-items-center rounded-full bg-[#c2410c] font-extrabold text-white"
        >
          !
        </span>
        <p className="text-[14px] leading-[1.5]">
          <strong className="block text-[15px]">Lưu ý câu điểm liệt</strong>
          Trả lời sai câu điểm liệt có thể khiến bài thi không đạt.
        </p>
      </div>
    </aside>
  );
}
