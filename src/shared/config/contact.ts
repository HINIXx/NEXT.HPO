/**
 * Thông tin liên hệ, mạng xã hội, cơ sở — chép đúng từ V2 `assets/js/site-header.js` + `site-footer.js`
 * (commit 0709939). Không tự thêm/sửa thông tin công ty; thiếu thì hỏi.
 */
export const contact = {
  companyName: "Công ty TNHH Ô Tô Hiệp Phát",
  hotline: "028.36.362.362",
  hotlineHref: "tel:02836362362",
  /** Dạng quốc tế cho JSON-LD. */
  hotlineE164: "+842836362362",
  /** Số tư vấn khóa học (khối "Khóa học linh động", V2 hiện "0911.739.119 — 028.36.362.362"). */
  courseAdvisorPhone: "0911.739.119",
  courseAdvisorPhoneHref: "tel:0911739119",
  email: "tuyensinh@hpo.edu.vn",
  emailHref: "mailto:tuyensinh@hpo.edu.vn",
  /** Thanh trên cùng header. */
  shortAddress: "176 Thế Lữ, Tân Nhựt, TP. Hồ Chí Minh",
  /** Footer. */
  fullAddress: "176 Thế Lữ, Ấp 1, xã Tân Nhựt, TP. Hồ Chí Minh",
  openingHours: "T2 — T7: 7h30 — 17h30",
  businessRegistration: {
    number: "0309987279",
    issuer: "Sở KH&ĐT TP.HCM",
    issuerLong: "Sở KH&ĐT TP. Hồ Chí Minh",
    firstIssuedOn: "11/05/2010",
  },
  registerUrl: "https://gateway.hpo.edu.vn/signup",
  loginUrl: "https://gateway.hpo.edu.vn/signin",
  googlePlayUrl: "https://play.google.com/store/apps/details?id=com.hpo.edugo",
  appStoreUrl: "https://apps.apple.com/vn/app/hiep-phat-edu/id6748065752",
  governmentNoticeUrl: "http://online.gov.vn/Website/chi-tiet-135372",
  governmentBadgeSrc:
    "https://atm253157-s3user.vcos.cloudstorage.com.vn/web24h-no-object-lock/storage/page/logo.png",
  mapEmbedUrl:
    "https://www.google.com/maps?q=C%C3%B4ng%20ty%20TNHH%20%C3%94%20T%C3%B4%20Hi%E1%BB%87p%20Ph%C3%A1t%20176%20%C4%90%C6%B0%E1%BB%9Dng%20Th%E1%BA%BF%20L%E1%BB%AF%20T%C3%A2n%20Nh%E1%BB%B1t%20TP.HCM&output=embed",
} as const;

export type SocialNetwork = "facebook" | "youtube" | "tiktok";

/** Thứ tự + link như V2. Lưu ý: V2 đặt nút TikTok trỏ về hpo.edu.vn/thong-bao (giữ nguyên). */
export const socialLinks: readonly {
  network: SocialNetwork;
  label: string;
  href: string;
}[] = [
  {
    network: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61579767334341",
  },
  {
    network: "youtube",
    label: "YouTube",
    href: "https://youtube.com/@hiepphat2727",
  },
  { network: "tiktok", label: "TikTok", href: "https://hpo.edu.vn/thong-bao" },
];

/** Cột "Cơ sở" ở footer. */
export const locations = [
  {
    name: "1. Trụ sở chính",
    address: "176 Thế Lữ, Tân Nhựt, TP. HCM",
    phone: "028.36.362.362",
    phoneHref: "tel:02836362362",
    phoneE164: "+842836362362",
  },
  {
    name: "2. Cơ sở Vĩnh Lộc",
    address: "271 Đường số 1, Phường Bình Tân",
    phone: "028.36.201.199",
    phoneHref: "tel:02836201199",
    phoneE164: "+842836201199",
  },
  {
    name: "3. VP Tuyển Sinh",
    address: "276 Minh Phụng, Phường Minh Phụng, TP. HCM",
    phone: "0912.799.129",
    phoneHref: "tel:0912799129",
    phoneE164: "+84912799129",
  },
] as const;
