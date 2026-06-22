import { COLORS } from './colors';

export { COLORS };

/** Gradient color tuples for expo-linear-gradient */
export const GRADIENTS = {
  hero: [COLORS.teal950, COLORS.teal700, COLORS.teal600] as const,
  heroRich: [COLORS.teal950, COLORS.primaryDark, COLORS.teal700, COLORS.teal600, COLORS.teal950] as const,
  screen: [COLORS.teal700, COLORS.teal950] as const,
  screenRich: [COLORS.teal700, COLORS.teal950, COLORS.teal700] as const,
  button: [COLORS.teal700, COLORS.teal600] as const,
  buttonRich: [COLORS.teal700, COLORS.teal950, COLORS.teal700] as const,
  gold: [COLORS.gold300, COLORS.gold400, COLORS.gold500] as const,
  goldBright: [COLORS.gold400, COLORS.gold300, COLORS.gold400] as const,
  door: [COLORS.teal950, COLORS.teal700, COLORS.teal950] as const,
};

export const BRAND = {
  name: 'VeriTalent',
  tagline: 'CONNECT • SHOWCASE • EVOLVE',
  footer: 'EMPOWERING VERIFIED STUDENT TALENT ⚡',
};

export const authShared = {
  geometricShape1: { backgroundColor: 'rgba(228, 180, 41, 0.12)' },
  geometricShape2: { backgroundColor: 'rgba(15, 110, 86, 0.12)' },
  geometricShape3: { backgroundColor: 'rgba(4, 52, 44, 0.1)' },
};

export { dashboard, DASHBOARD_PADDING_H } from './dashboard';
export { getJobTypeColor, getExperienceColor, badgeTint } from './badges';
