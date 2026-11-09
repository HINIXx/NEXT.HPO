import type { NextConfig } from "next";

/**
 * Site tĩnh: `next build` xuất HTML/CSS/JS vào `out/` (hosting chỉ phục vụ file tĩnh).
 * `trailingSlash: true` → mỗi route là `<route>/index.html`, giữ nguyên URL có dấu `/` cuối như V2.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    // Static export không có tối ưu ảnh lúc chạy. GĐ sau có thể thay bằng next-image-export-optimizer.
    unoptimized: true,
  },
};

export default nextConfig;
