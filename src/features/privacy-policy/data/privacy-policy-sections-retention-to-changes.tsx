import { PrivacyPolicyPendingContentMark as Pending } from "../components/privacy-policy-pending-content-mark";
import {
  EmailLink,
  HotlineLink,
} from "../components/privacy-policy-inline-contact-links";
import type { PrivacyPolicySection } from "./privacy-policy-sections";

/** Mục 8–14 (Thời gian lưu trữ → Thay đổi chính sách) — tách file vì giới hạn 300 dòng. Chữ đúng V2. */
export const privacyPolicyRetentionToChangesSections: readonly PrivacyPolicySection[] =
  [
    {
      id: "luu-tru",
      title: "Thời gian lưu trữ",
      body: (
        <>
          <p>
            Thời hạn lưu dữ liệu cụ thể:{" "}
            <Pending>
              thời hạn lưu theo từng nhóm dữ liệu, tính bằng tháng hoặc theo mốc
              thời gian cụ thể
            </Pending>
            .
          </p>
          <p>
            Việc xử lý bắt đầu khi học viên cung cấp dữ liệu và kết thúc khi hết
            thời hạn lưu đã xác định, mục đích xử lý hoàn tất hoặc yêu cầu xóa
            được chấp nhận, tùy trường hợp và quy định pháp luật. Khi hết thời
            hạn lưu, Công ty xóa hoặc hủy dữ liệu, trừ trường hợp pháp luật yêu
            cầu tiếp tục lưu.
          </p>
        </>
      ),
    },
    {
      id: "bao-ve",
      title: "Bảo vệ dữ liệu",
      body: (
        <p>
          Công ty áp dụng biện pháp kỹ thuật và quản lý phù hợp để bảo vệ dữ
          liệu cá nhân, hạn chế truy cập trái phép và giảm nguy cơ mất, lộ hoặc
          sử dụng sai mục đích. Chỉ nhân viên có nhiệm vụ mới được tiếp cận dữ
          liệu trong phạm vi công việc.
        </p>
      ),
    },
    {
      id: "su-co",
      title: "Rủi ro và sự cố dữ liệu",
      body: (
        <p>
          Rủi ro có thể gồm dữ liệu bị lộ, mất hoặc bị truy cập trái phép. Khi
          phát hiện sự cố, Công ty sẽ áp dụng biện pháp phù hợp để ngăn chặn,
          hạn chế ảnh hưởng, khắc phục sự cố và thông báo cho cơ quan có thẩm
          quyền hoặc chủ thể dữ liệu trong thời hạn, trường hợp pháp luật quy
          định.
        </p>
      ),
    },
    {
      id: "quyen",
      title: "Quyền của học viên",
      body: (
        <>
          <p>
            Theo pháp luật hiện hành về bảo vệ dữ liệu cá nhân, bạn có các quyền
            sau:
          </p>
          <ul>
            <li>Được biết về hoạt động xử lý dữ liệu cá nhân của mình.</li>
            <li>
              Đồng ý hoặc không đồng ý; yêu cầu rút lại sự đồng ý khi pháp luật
              cho phép.
            </li>
            <li>Xem, chỉnh sửa hoặc yêu cầu chỉnh sửa dữ liệu cá nhân.</li>
            <li>
              Yêu cầu cung cấp, xóa hoặc hạn chế xử lý dữ liệu; phản đối việc xử
              lý.
            </li>
            <li>
              Khiếu nại, tố cáo, khởi kiện hoặc yêu cầu bồi thường theo quy định
              pháp luật.
            </li>
            <li>
              Yêu cầu cơ quan có thẩm quyền hoặc bên liên quan áp dụng biện pháp
              bảo vệ dữ liệu.
            </li>
          </ul>
          <p>
            Bạn cũng có trách nhiệm tự bảo vệ dữ liệu của mình và tôn trọng, bảo
            vệ dữ liệu của người khác.
          </p>
        </>
      ),
    },
    {
      id: "thuc-hien-quyen",
      title: "Cách thực hiện quyền và liên hệ",
      body: (
        <p>
          Gửi yêu cầu thực hiện quyền qua email <EmailLink /> hoặc gọi hotline{" "}
          <HotlineLink />. Công ty sẽ tiếp nhận và phản hồi trong thời hạn pháp
          luật quy định.
        </p>
      ),
    },
    {
      id: "tre-em",
      title: "Dữ liệu của trẻ em",
      body: (
        <p>
          Dịch vụ đào tạo lái xe dành cho người đủ tuổi học theo quy định. Công
          ty không chủ động thu thập dữ liệu cá nhân của trẻ em qua website. Nếu
          phát sinh việc xử lý dữ liệu của trẻ em, Công ty thực hiện theo quy
          định pháp luật về bảo vệ trẻ em và dữ liệu cá nhân.
        </p>
      ),
    },
    {
      id: "thay-doi",
      title: "Thay đổi chính sách",
      body: (
        <p>
          Công ty có thể cập nhật chính sách này khi hoạt động hoặc quy định
          pháp luật thay đổi. Bản cập nhật sẽ được đăng trên trang này cùng ngày
          hiệu lực mới.
        </p>
      ),
    },
  ];
