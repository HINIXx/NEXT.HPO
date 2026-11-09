import { cn } from "@/lib/utils";

const buttonClassName =
  "font-display text-ink hover:not-disabled:border-primary hover:not-disabled:text-primary h-11 min-w-11 cursor-pointer rounded-[9px] border border-[#d8dfeb] bg-white px-3 text-[15px] font-bold transition-colors duration-200 disabled:cursor-default disabled:opacity-40";

/**
 * Phân trang kết quả (V2 `.lookup-pagination`): Trước · 1 … (trang hiện tại ±1) … cuối · Sau.
 * Vùng bấm 44px (V2 42px) theo quy tắc nút ≥44px.
 */
export function HospitalResultsPaginationNav({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  ).filter(
    (page) =>
      page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1,
  );

  return (
    <nav
      aria-label="Phân trang kết quả"
      className="mt-[30px] flex flex-wrap justify-center gap-[7px]"
    >
      <button
        type="button"
        className={buttonClassName}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Trước
      </button>
      {pages.map((page, index) => (
        <span key={page} className="contents">
          {index > 0 && page - pages[index - 1] > 1 && (
            <span
              aria-hidden="true"
              className="grid h-11 min-w-6 place-items-center"
            >
              …
            </span>
          )}
          <button
            type="button"
            aria-label={`Trang ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
            className={cn(
              buttonClassName,
              page === currentPage && "border-primary bg-primary text-white",
            )}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        </span>
      ))}
      <button
        type="button"
        className={buttonClassName}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Sau
      </button>
    </nav>
  );
}
