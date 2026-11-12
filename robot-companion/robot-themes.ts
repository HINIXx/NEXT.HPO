// Bộ giao diện (theme) cho robot 3D: cùng hình khối và hoạt ảnh, khác màu, vật liệu, mắt và viền LED.
// Website dùng DEFAULT_ROBOT_THEME (Navy & Gold, chọn ngày 2026-10-31); các theme khác giữ để đổi nhanh.

export interface RobotTheme {
  id: string;
  label: string;
  /** Vỏ chính (đầu, thân, tay, chân). */
  shell: { color: string; roughness: number; metalness: number; clearcoat: number };
  /** Đệm vai, khuỷu, gối, tai, cổ giày, viền huy hiệu. */
  accent: { color: string; roughness: number; metalness: number };
  /** Vòng tai, lòng bàn tay. */
  accentSoft: string;
  /** Khớp cầu, vòng khớp, đế giày. */
  joint: { color: string; roughness: number; metalness: number };
  /** Đai eo. */
  belt: string;
  visor: string;
  eyes: { core: string; led: string; deep: string; /** nửa rộng, nửa cao */ size: [number, number]; spacing: number };
  /** Viền LED phát sáng quanh kính mặt (bỏ trống = không có). */
  trim?: string;
  /** Độ sáng viền LED (mặc định 1.4). */
  trimIntensity?: number;
}

export const ROBOT_THEMES: RobotTheme[] = [
  {
    id: 'tro-ly-ao', label: 'Trợ lý ảo',
    shell: { color: '#f8fbff', roughness: .3, metalness: 0, clearcoat: 1 },
    accent: { color: '#3f93e6', roughness: .32, metalness: .05 },
    accentSoft: '#8fc8f5',
    joint: { color: '#1f2d42', roughness: .45, metalness: .25 },
    belt: '#1f2d42',
    visor: '#05080e',
    eyes: { core: '#a9dcff', led: '#7cc6f7', deep: '#4a9fe6', size: [.105, .175], spacing: .27 },
  },
  {
    id: 'navy-gold', label: 'Navy & Gold',
    shell: { color: '#f3f4f6', roughness: .22, metalness: 0, clearcoat: 1 },
    accent: { color: '#1b2a5c', roughness: .3, metalness: .2 },
    accentSoft: '#d6b25a',
    joint: { color: '#2a2f3a', roughness: .35, metalness: .5 },
    belt: '#d6b25a',
    visor: '#03050b',
    eyes: { core: '#ffffff', led: '#cfe9ff', deep: '#8dc6ff', size: [.13, .13], spacing: .28 },
    trim: '#d9a440',
    trimIntensity: .95,
  },
  {
    id: 'graphite-tech', label: 'Graphite Tech',
    shell: { color: '#3a4049', roughness: .38, metalness: .55, clearcoat: .6 },
    accent: { color: '#2f7dff', roughness: .25, metalness: .3 },
    accentSoft: '#5fe1ff',
    joint: { color: '#14171c', roughness: .4, metalness: .6 },
    belt: '#14171c',
    visor: '#010204',
    eyes: { core: '#e6fdff', led: '#5fe1ff', deep: '#1aa8ff', size: [.17, .055], spacing: .29 },
    trim: '#38c8ff',
  },
  {
    id: 'ceramic-minimal', label: 'Ceramic Minimal',
    shell: { color: '#f2f1ee', roughness: .55, metalness: 0, clearcoat: .25 },
    accent: { color: '#d9dce1', roughness: .5, metalness: 0 },
    accentSoft: '#c4c9d1',
    joint: { color: '#8a929e', roughness: .45, metalness: .2 },
    belt: '#c4c9d1',
    visor: '#0b0d11',
    eyes: { core: '#d9eeff', led: '#9fd0ff', deep: '#6aaee8', size: [.09, .15], spacing: .25 },
  },
  {
    id: 'hiep-phat-brand', label: 'Hiệp Phát Brand',
    shell: { color: '#ffffff', roughness: .26, metalness: 0, clearcoat: 1 },
    accent: { color: '#2b26fb', roughness: .3, metalness: .05 },
    accentSoft: '#faec1a',
    joint: { color: '#2d3489', roughness: .4, metalness: .2 },
    belt: '#ea1e24',
    visor: '#060a1c',
    eyes: { core: '#d8ecff', led: '#6fb6ff', deep: '#2b6bff', size: [.12, .14], spacing: .27 },
    trim: '#4a6bff',
  },
];

export const DEFAULT_ROBOT_THEME = ROBOT_THEMES.find(theme => theme.id === 'navy-gold')!;
