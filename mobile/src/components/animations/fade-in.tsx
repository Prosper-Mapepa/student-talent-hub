import type { ReactNode } from 'react';
import { View } from 'react-native';

type FadeInProps = {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
};

/** Lightweight fade-in wrapper (RN — no framer-motion). */
export function FadeIn({ children }: FadeInProps) {
  return <View>{children}</View>;
}

export default FadeIn;
