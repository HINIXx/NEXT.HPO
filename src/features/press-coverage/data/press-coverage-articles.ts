import pressJson from "../../../../public/assets/data/bao-chi.json";

/**
 * Báo chí đưa tin về Hiệp Phát — 1 file dữ liệu `public/assets/data/bao-chi.json` (giữ URL V2, đọc mục `_huongDan`).
 * Bản build lấy sẵn file lúc export (HTML có đủ tiêu đề bài cho SEO); trình duyệt tải lại file mới nhất lúc chạy
 * (`refreshPressArticles`) nên sửa JSON trên máy chủ là đủ, như V2.
 */
export type PressChannel =
  "bao-dien-tu" | "truyen-hinh" | "phat-thanh" | "mang-xa-hoi";

type RawPressFile = {
  kenh?: Record<string, string>;
  bai?: {
    bao?: string;
    kenh?: string;
    tieuDe?: string;
    link?: string;
    anh?: string;
    ngay?: string;
    moTa?: string;
  }[];
};

export type PressArticle = {
  order: number;
  outlet: string;
  channel: PressChannel;
  title: string;
  link: string;
  /** Ảnh đại diện "/assets/images/bao-chi/…" — chỉ bài có ảnh mới vào khu "Bài báo về Hiệp Phát". */
  image?: string;
  /** ISO giờ Việt Nam "2026-10-28T16:34". */
  publishedAt?: string;
  isNew: boolean;
};

export const pressChannelLabels: Record<PressChannel, string> = {
  "bao-dien-tu": "Báo điện tử",
  "truyen-hinh": "Truyền hình",
  "phat-thanh": "Phát thanh",
  "mang-xa-hoi": "Mạng xã hội",
};

/** Động từ nút mở bài theo kênh (V2 VERB). */
export const pressChannelVerbs: Record<PressChannel, string> = {
  "bao-dien-tu": "Đọc bài",
  "truyen-hinh": "Xem video",
  "phat-thanh": "Nghe bài",
  "mang-xa-hoi": "Xem bài đăng",
};

/** Số bài mới nhất được gắn nhãn "Mới". */
const NEW_COUNT = 3;

export function normalizePressFile(file: RawPressFile): PressArticle[] {
  const articles = (file.bai ?? [])
    .filter((item) => item?.bao && item.link)
    .map((item, order) => ({
      order,
      outlet: String(item.bao),
      channel: (item.kenh && item.kenh in pressChannelLabels
        ? item.kenh
        : "bao-dien-tu") as PressChannel,
      title: String(item.tieuDe ?? ""),
      link: String(item.link),
      image: item.anh ? `/${item.anh.replace(/^\/+/, "")}` : undefined,
      publishedAt:
        item.ngay && !Number.isNaN(Date.parse(item.ngay))
          ? item.ngay
          : undefined,
      isNew: false,
    }));
  [...articles]
    .filter((article) => article.publishedAt)
    .sort((a, b) => Date.parse(b.publishedAt!) - Date.parse(a.publishedAt!))
    .slice(0, NEW_COUNT)
    .forEach((article) => (article.isNew = true));
  return articles;
}

export const buildTimePressArticles = normalizePressFile(
  pressJson as RawPressFile,
);

/** Tải bản mới nhất của bao-chi.json (luôn bỏ qua bộ nhớ đệm như V2); lỗi → null (giữ bản build). */
export async function refreshPressArticles(): Promise<PressArticle[] | null> {
  try {
    const response = await fetch("/assets/data/bao-chi.json", {
      cache: "no-cache",
    });
    if (!response.ok) return null;
    return normalizePressFile((await response.json()) as RawPressFile);
  } catch {
    return null;
  }
}

/** "28/10/2026" theo giờ Việt Nam. */
export function formatPressDate(iso?: string): string {
  if (!iso) return "";
  const [date] = iso.split("T");
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

/** Bỏ dấu tiếng Việt để tìm không cần gõ dấu. */
export const foldVietnamese = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
