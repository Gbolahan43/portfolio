/**
 * Icon library — exact SVG paths from the approved design.
 * The design specifies 1.75px stroke, round caps/joins, 16px box (20px download).
 * Some icons (moon, copy) deviate from standard Lucide and are custom.
 */

export type IconName =
  | 'arrow-up-right'
  | 'download'
  | 'chevron-down'
  | 'copy'
  | 'check'
  | 'sun'
  | 'moon';

interface IconDef {
  name: string;
  viewBox: string;
  path: string;
  width: number;
  height: number;
  strokeWidth: number;
}

export const icons: Record<IconName, IconDef> = {
  'arrow-up-right': {
    name: 'arrow-up-right',
    viewBox: '0 0 24 24',
    path: 'M7 17L17 7M17 7H9M17 7v8',
    width: 12,
    height: 12,
    strokeWidth: 2,
  },
  download: {
    name: 'download',
    viewBox: '0 0 24 24',
    path: 'M12 4v10m0 0l-3.5-3.5M12 14l3.5-3.5M5 18h14',
    width: 18,
    height: 18,
    strokeWidth: 1.75,
  },
  'chevron-down': {
    name: 'chevron-down',
    viewBox: '0 0 24 24',
    path: 'M6 9.5l6 6 6-6',
    width: 18,
    height: 18,
    strokeWidth: 1.75,
  },
  copy: {
    name: 'copy',
    viewBox: '0 0 24 24',
    path:
      '<rect x="9" y="9" width="11" height="11" rx="2.5"/><path d="M15 5.5A2.5 2.5 0 0012.5 3h-6A3.5 3.5 0 003 6.5v6A2.5 2.5 0 005.5 15h11a2.5 2.5 0 002.5-2.5v-6A3.5 3.5 0 0012.5 3h-6"/>',
    width: 16,
    height: 16,
    strokeWidth: 1.75,
  },
  check: {
    name: 'check',
    viewBox: '0 0 24 24',
    path: 'M4.5 12.5l5 5 10-11',
    width: 16,
    height: 16,
    strokeWidth: 2,
  },
  sun: {
    name: 'sun',
    viewBox: '0 0 24 24',
    path:
      '<circle cx="12" cy="12" r="4.2"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4"/>',
    width: 18,
    height: 18,
    strokeWidth: 1.75,
  },
  moon: {
    name: 'moon',
    viewBox: '0 0 24 24',
    path: '<path d="M20 14.5A8.5 8.5 0 019.5 4a8.5 8.5 0 1010.5 10.5z"/>',
    width: 18,
    height: 18,
    strokeWidth: 1.75,
  },
};
