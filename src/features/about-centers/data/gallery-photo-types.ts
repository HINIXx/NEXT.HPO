/** Một ảnh trong băng chuyền / hộp xem ảnh lớn. `alt` cũng là chú thích khi phóng to (như V2). */
export type GalleryPhoto = { src: string; alt: string };

/** Ảnh WordPress cũ của hpo.edu.vn (V2 dùng link tuyệt đối, giữ nguyên). */
export const wordpressUpload = (path: string) =>
  `https://hpo.edu.vn/wp-content/uploads/${path}`;

/** Tạo danh sách ảnh từ cặp [đường dẫn sau /uploads/, alt]. */
export const galleryPhotos = (
  entries: readonly (readonly [path: string, alt: string])[],
): GalleryPhoto[] =>
  entries.map(([path, alt]) => ({ src: wordpressUpload(path), alt }));
