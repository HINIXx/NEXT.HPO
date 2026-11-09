/**
 * Ghi chú dưới bảng "Phân bổ thời gian đào tạo" (V2 04/11): giải nghĩa mục II.1, đặt NGOÀI bảng
 * (yêu cầu không sửa nội dung bảng). Chữ Be Vietnam Pro vì SVN-Gilroy làm "í" dính dấu thành "l" trên màn 1x.
 */
export function TrainingTimeAllocationTableLegalNote() {
  return (
    <aside
      aria-label="Ghi chú cho bảng phân bổ thời gian đào tạo"
      className="border-l-primary bg-primary-50 flex items-start gap-2.5 border-t border-l-4 border-t-[#dbe4f5] px-4 pt-3.5 pb-4 min-[641px]:gap-3 min-[641px]:px-6 min-[641px]:pt-[18px] min-[641px]:pb-5"
    >
      <span
        aria-hidden="true"
        className="font-display bg-primary mt-px grid size-[26px] flex-none place-items-center rounded-full text-[15px] leading-none font-extrabold text-white italic"
      >
        i
      </span>
      {/* Be Vietnam Pro: SVN-Gilroy làm "í" dính dấu thành "l" trên màn 1x (V2 07/11). */}
      <p className="font-display text-ink text-[16px] leading-[1.6] text-pretty min-[641px]:text-[17px]">
        <strong className="text-primary font-bold">Ghi chú:</strong> Quy định
        tại điểm b, khoản 2, điều 6 thông tư 14/2025/TT-BXD: &quot;Số học viên
        trong nhóm học thực hành lái xe được bố trí trên một xe tập lái hạng B
        không quá 05 học viên, hạng C1 không quá 08 học viên; trong đó, quãng
        đường tập lái xe được tính cho từng học viên và{" "}
        <strong className="font-bold text-[#dc2626]">
          thời gian tập lái xe trên sân tập lái được tính cho nhóm học viên trên
          xe tập lái.
        </strong>
        &quot;
      </p>
    </aside>
  );
}
