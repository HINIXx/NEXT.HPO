import type { ReactNode } from "react";
import {
  EmailLink,
  HotlineLink,
  PolicyLink,
} from "../components/privacy-policy-inline-contact-links";
import { PrivacyPolicyPendingContentMark as Pending } from "../components/privacy-policy-pending-content-mark";
import { privacyPolicyRetentionToChangesSections } from "./privacy-policy-sections-retention-to-changes";
import { contact, locations } from "@/shared/config/contact";

/**
 * Nội dung trang Chính sách bảo mật — chép đúng chữ V2 `chinh-sach-bao-mat/index.html` @ 0709939.
 * Các ô "[CẦN BỔ SUNG: …]" chờ trung tâm gửi (ngày hiệu lực, cookie/GA, thời gian lưu, đối tác…): không tự điền.
 */
export type PrivacyPolicySection = {
  /** Neo URL (#id) — giữ như V2 để link cũ còn đúng. */
  id: string;
  title: string;
  body: ReactNode;
};

const [, vinhLocCampus, admissionsOffice] = locations;

export const privacyPolicySections: readonly PrivacyPolicySection[] = [
  {
    id: "gioi-thieu",
    title: "Giới thiệu và phạm vi",
    body: (
      <>
        <p>
          Chính sách này giải thích cách {contact.companyName} thu thập, sử
          dụng, lưu trữ, chia sẻ và bảo vệ dữ liệu cá nhân khi bạn truy cập
          website <PolicyLink href="https://hpo.edu.vn/">hpo.edu.vn</PolicyLink>{" "}
          hoặc đăng ký học qua{" "}
          <PolicyLink href="https://gateway.hpo.edu.vn/">
            gateway.hpo.edu.vn
          </PolicyLink>
          .
        </p>
        <p>
          Chính sách cũng áp dụng khi bạn liên hệ tư vấn hoặc nộp hồ sơ trực
          tiếp tại văn phòng của Công ty. Phạm vi áp dụng với ứng dụng Hiệp Phát
          Edu:{" "}
          <Pending>
            xác nhận chính sách này có áp dụng cho ứng dụng Hiệp Phát Edu hay
            không
          </Pending>
          .
        </p>
        <p>
          Chính sách được xây dựng theo{" "}
          <PolicyLink
            external
            href="https://vanban.chinhphu.vn/?docid=214590&pageid=27160"
          >
            Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15
          </PolicyLink>{" "}
          và{" "}
          <PolicyLink
            external
            href="https://vanban.chinhphu.vn/?docid=216387&pageid=27160&typegroupid=4"
          >
            Nghị định 356/2025/NĐ-CP
          </PolicyLink>
          , cùng các quy định liên quan đang có hiệu lực. Nghị định
          13/2023/NĐ-CP đã được thay thế từ ngày 01/01/2026.
        </p>
      </>
    ),
  },
  {
    id: "don-vi-xu-ly",
    title: "Bên kiểm soát và xử lý dữ liệu",
    body: (
      <>
        <p>
          <strong>{contact.companyName}</strong> là bên kiểm soát và xử lý dữ
          liệu cá nhân theo hoạt động được mô tả trong chính sách này.
        </p>
        <ul>
          <li>
            GCNKD/MST: {contact.businessRegistration.number};{" "}
            {contact.businessRegistration.issuer} cấp lần đầu ngày{" "}
            {contact.businessRegistration.firstIssuedOn}.
          </li>
          <li>Trụ sở: {contact.fullAddress}.</li>
          <li>
            Cơ sở Vĩnh Lộc: {vinhLocCampus.address} · {vinhLocCampus.phone}.
          </li>
          <li>
            Văn phòng tuyển sinh: 276 Minh Phụng, Phường Minh Phụng, TP.HCM ·{" "}
            {admissionsOffice.phone}.
          </li>
          <li>
            Hotline: <HotlineLink /> · Email: <EmailLink />.
          </li>
        </ul>
        <p>
          Người hoặc bộ phận phụ trách bảo vệ dữ liệu cá nhân:{" "}
          <Pending>
            tên hoặc chức danh, bộ phận và thông tin liên hệ phụ trách
          </Pending>
          .
        </p>
      </>
    ),
  },
  {
    id: "du-lieu-thu-thap",
    title: "Dữ liệu chúng tôi thu thập",
    body: (
      <>
        <p>
          Thông tin cơ bản được cung cấp khi hỏi hoặc đăng ký học gồm họ tên và
          số điện thoại. Danh sách dữ liệu khác thực tế được thu thập cần xác
          nhận:{" "}
          <Pending>
            email, ngày sinh, địa chỉ, số CCCD, ảnh chân dung và các dữ liệu cơ
            bản khác nếu có
          </Pending>
          .
        </p>
        <p>
          Hồ sơ học và thi có thể chứa dữ liệu về sức khỏe, như giấy khám sức
          khỏe. Đây là dữ liệu cá nhân nhạy cảm. Công ty chỉ xử lý dữ liệu này
          trong phạm vi cần thiết để lập hồ sơ học, hồ sơ thi sát hạch và theo
          quy định pháp luật. Danh sách giấy tờ thực tế cần xác nhận:{" "}
          <Pending>
            liệt kê giấy tờ trong hồ sơ học và hồ sơ thi có dữ liệu cá nhân
          </Pending>
          .
        </p>
      </>
    ),
  },
  {
    id: "cach-thu-thap",
    title: "Cách thu thập dữ liệu",
    body: (
      <p>
        Công ty nhận dữ liệu khi học viên tự điền biểu mẫu đăng ký trên
        gateway.hpo.edu.vn, gọi điện cho Công ty hoặc nộp hồ sơ tại văn phòng.
        Cách thu thập khác (nếu có):{" "}
        <Pending>
          xác nhận còn nhận dữ liệu qua kênh hoặc nguồn nào khác
        </Pending>
        .
      </p>
    ),
  },
  {
    id: "muc-dich",
    title: "Mục đích sử dụng",
    body: (
      <>
        <p>Công ty sử dụng dữ liệu cá nhân để:</p>
        <ul>
          <li>Tư vấn khóa học và hỗ trợ đăng ký.</li>
          <li>Lập, quản lý hồ sơ học và hồ sơ thi sát hạch.</li>
          <li>
            Liên hệ, gửi thông báo về lịch học, lịch thi và thông tin liên quan
            đến khóa học.
          </li>
        </ul>
        <p>
          Công ty không sử dụng dữ liệu cho mục đích khác nếu chưa thông báo và
          có căn cứ xử lý phù hợp theo quy định, bao gồm sự đồng ý của học viên
          khi pháp luật yêu cầu.
        </p>
      </>
    ),
  },
  {
    id: "cookie",
    title: "Cookie và công cụ đo lường",
    body: (
      <p>
        Tình trạng sử dụng cookie, Google Analytics hoặc Facebook Pixel chưa
        được xác nhận:{" "}
        <Pending>
          xác nhận từng công cụ có hoặc không được dùng; nếu có, nêu mục đích và
          cách tắt cookie trong trình duyệt
        </Pending>
        .
      </p>
    ),
  },
  {
    id: "chia-se",
    title: "Chia sẻ dữ liệu",
    body: (
      <>
        <p>
          Công ty chỉ chia sẻ dữ liệu cần thiết với cơ quan nhà nước có thẩm
          quyền về đào tạo, sát hạch và cấp giấy phép lái xe khi pháp luật yêu
          cầu hoặc cho phép.
        </p>
        <p>
          Đối tác hoặc đơn vị cung cấp dịch vụ có thể tham gia xử lý dữ liệu:{" "}
          <Pending>
            xác nhận các đối tác, đơn vị xử lý dữ liệu và phạm vi dữ liệu họ
            được tiếp cận
          </Pending>
          . Công ty không bán dữ liệu cá nhân.
        </p>
      </>
    ),
  },
  ...privacyPolicyRetentionToChangesSections,
];
