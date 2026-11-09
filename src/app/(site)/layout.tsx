import type { ReactNode } from "react";
import { SiteShellHeaderMainFooter } from "@/components/layout/site-shell-header-main-footer";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return <SiteShellHeaderMainFooter>{children}</SiteShellHeaderMainFooter>;
}
