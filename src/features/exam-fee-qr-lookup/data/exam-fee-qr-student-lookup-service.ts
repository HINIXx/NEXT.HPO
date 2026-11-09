/**
 * Tra cứu mã QR lệ phí sát hạch theo CCCD — logic V2 `tra-cuu-qr/script.js` @ 0709939.
 * Gọi thẳng API công khai của LMS từ trình duyệt (site là static export, không có server riêng).
 */
const STUDENT_QR_API_URL =
  "https://lms.hpo.edu.vn/api/public/license-test-qr/student";

export const DEMO_IDENTITY_CARD = "052098015899";

export type ExamFeeQrStudent = {
  fullName?: string;
  identityCard?: string;
  course?: string;
  amount?: number | string;
  qrCode?: string;
  /** Chỉ bản minh họa: hiện nhãn "DỮ LIỆU MINH HỌA", mã không có giá trị thanh toán. */
  isDemo?: boolean;
};

/** Học viên minh họa (số CCCD demo) — để kiểm thử giao diện, không gọi API. */
const DEMO_STUDENT: ExamFeeQrStudent = {
  fullName: "Nguyễn Minh Anh",
  identityCard: DEMO_IDENTITY_CARD,
  course: "Đào tạo lái xe hạng B",
  amount: 765000,
  isDemo: true,
  qrCode: "HPO-DEMO|CCCD:052098015899|AMOUNT:765000|NOT-FOR-PAYMENT",
};

export const isValidIdentityCard = (value: string) => /^\d{12}$/.test(value);

/** API có thể bọc kết quả ở `result`, `data.result`, `data` hoặc trả thẳng → lấy object đầu tiên trông giống học viên. */
function extractStudent(payload: unknown): ExamFeeQrStudent | undefined {
  const root = payload as {
    result?: unknown;
    data?: { result?: unknown };
  } | null;
  const candidates = [root?.result, root?.data?.result, root?.data, payload];
  return candidates.find(
    (value): value is ExamFeeQrStudent =>
      !!value &&
      typeof value === "object" &&
      ("qrCode" in value || "fullName" in value || "identityCard" in value),
  );
}

/**
 * Trả học viên có `qrCode`; lỗi → throw Error với câu báo tiếng Việt hiển thị thẳng cho người dùng.
 */
export async function lookupExamFeeQrStudent(
  identityCard: string,
): Promise<ExamFeeQrStudent> {
  if (identityCard === DEMO_IDENTITY_CARD) return DEMO_STUDENT;

  const url = new URL(STUDENT_QR_API_URL);
  url.searchParams.set("identityCard", identityCard);
  let response: Response;
  try {
    response = await fetch(url, { headers: { Accept: "application/json" } });
  } catch {
    throw new Error(
      "Không thể kết nối hệ thống tra cứu. Vui lòng thử lại sau.",
    );
  }
  const payload: { message?: string } = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      response.status === 404
        ? "Không tìm thấy thông tin thí sinh với số CCCD này."
        : payload.message || "Không thể tra cứu thông tin lúc này.",
    );
  }
  const student = extractStudent(payload);
  if (!student)
    throw new Error(payload.message || "Dữ liệu trả về chưa hợp lệ.");
  if (!student.qrCode || typeof student.qrCode !== "string") {
    throw new Error(
      "Hệ thống chưa cung cấp mã QR thanh toán cho học viên này.",
    );
  }
  return student;
}

/** "765000" → "765.000 đ"; không phải số → câu thay thế như V2. */
export const formatExamFeeAmount = (amount: ExamFeeQrStudent["amount"]) =>
  amount !== undefined && amount !== "" && Number.isFinite(Number(amount))
    ? `${new Intl.NumberFormat("vi-VN").format(Number(amount))} đ`
    : "Theo thông tin trên mã QR";
