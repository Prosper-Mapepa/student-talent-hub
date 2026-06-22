import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, BRAND } from '../theme';
import { BrandLogoMark } from '../components/auth/BrandLogoMark';
import { VeriTalentWordmark } from '../components/auth/VeriTalentWordmark';

const LoadingScreen: React.FC = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(12)).current;
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, friction: 7, tension: 45, useNativeDriver: true }),
    ]).start();

    const bounceDot = (dot: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, { toValue: 1, duration: 350, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0.3, duration: 350, useNativeDriver: true }),
        ])
      );

    const d1 = bounceDot(dot1, 0);
    const d2 = bounceDot(dot2, 150);
    const d3 = bounceDot(dot3, 300);
    d1.start();
    d2.start();
    d3.start();

    return () => {
      d1.stop();
      d2.stop();
      d3.stop();
    };
  }, [fadeAnim, slideAnim, dot1, dot2, dot3]);

  return (
    <View style={styles.fullScreen}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.teal950} translucent />
      <LinearGradient
        colors={[COLORS.teal950, COLORS.teal700, COLORS.teal950]}
        style={styles.gradient}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
      >
        <View style={styles.orbTop} pointerEvents="none" />
        <View style={styles.orbBottom} pointerEvents="none" />

        <Animated.View
          style={[
            styles.content,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <BrandLogoMark size={120} spinRing float pulse />

          <VeriTalentWordmark fontSize={34} letterSpacing={-0.5} style={styles.wordmark} />
          <Text style={styles.tagline}>{BRAND.tagline}</Text>

          <View style={styles.dotsRow}>
            <Animated.View style={[styles.loadingDot, { opacity: dot1 }]} />
            <Animated.View style={[styles.loadingDot, { opacity: dot2 }]} />
            <Animated.View style={[styles.loadingDot, { opacity: dot3 }]} />
          </View>
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orbTop: {
    position: 'absolute',
    top: -60,
    right: -40,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(29, 158, 117, 0.2)',
  },
  orbBottom: {
    position: 'absolute',
    bottom: -40,
    left: -30,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(228, 180, 41, 0.12)',
  },
  content: {
    alignItems: 'center',
  },
  wordmark: {
    marginTop: 20,
    marginBottom: 6,
  },
  tagline: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 28,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  loadingDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: COLORS.gold400,
  },
});

export default LoadingScreen;
