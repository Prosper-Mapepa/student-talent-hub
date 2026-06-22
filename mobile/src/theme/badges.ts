import { COLORS } from './colors';

/** VeriTalent-only badge colors — teal + gold palette */
export function getJobTypeColor(type: string): string {
  switch (type) {
    case 'FULL_TIME':
      return COLORS.teal700;
    case 'PART_TIME':
      return COLORS.teal600;
    case 'INTERNSHIP':
      return COLORS.gold600;
    case 'CONTRACT':
      return COLORS.teal950;
    default:
      return COLORS.muted;
  }
}

export function getExperienceColor(level: string): string {
  switch (level) {
    case 'ENTRY_LEVEL':
      return COLORS.teal600;
    case 'INTERMEDIATE':
      return COLORS.gold500;
    case 'SENIOR':
      return COLORS.teal950;
    default:
      return COLORS.muted;
  }
}

export function badgeTint(color: string, opacity = '18'): string {
  return `${color}${opacity}`;
}
