"use client";

import { createContext, useContext } from "react";
import type { SyllabusModalLink } from "../data/training-time-allocation-table";

/**
 * Cầu nối "bấm ô môn học trong bảng → mở modal Chương trình khung" (V2 `.mon-cell` → `#monModal`).
 * Provider đặt ở khối Bước 2 (bảng + modal); không có provider → ô môn học hiện như chữ thường.
 */
export type SyllabusModalOpener = (
  link: SyllabusModalLink,
  trigger: HTMLElement,
) => void;

export const SyllabusModalOpenContext =
  createContext<SyllabusModalOpener | null>(null);

export const useSyllabusModalOpener = () =>
  useContext(SyllabusModalOpenContext);
