import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../theme';
import { BRAND_LOGO } from '../BrandLogoImage';

type BrandLogoMarkProps = {
  size?: number;
  spinRing?: boolean;
  float?: boolean;
  pulse?: boolean;
};

export function BrandLogoMark({
  size = 108,
  spinRing = true,
  float = true,
  pulse = false,
}: BrandLogoMarkProps) {
  const ringRotate = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const ringSize = size + 20;
  const logoSize = size * 0.92;

  useEffect(() => {
    const loops: Animated.CompositeAnimation[] = [];

    if (spinRing) {
      const spin = Animated.loop(
        Animated.timing(ringRotate, {
          toValue: 1,
          duration: 5000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      spin.start();
      loops.push(spin);
    }

    if (float) {
      const bob = Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnim, {
            toValue: 1,
            duration: 2400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(floatAnim, {
            toValue: 0,
            duration: 2400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      bob.start();
      loops.push(bob);
    }

    if (pulse) {
      const pulseLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.06,
            duration: 1100,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1100,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      pulseLoop.start();
      loops.push(pulseLoop);
    }

    return () => loops.forEach((l) => l.stop());
  }, [spinRing, float, pulse, ringRotate, floatAnim, pulseAnim]);

  const spin = ringRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  return (
    <Animated.View
      style={[
        styles.stage,
        {
          width: ringSize,
          height: ringSize,
          transform: [{ translateY }, { scale: pulse ? pulseAnim : 1 }],
        },
      ]}
    >
      <View
        style={[
          styles.glow,
          {
            width: logoSize * 1.15,
            height: logoSize * 1.15,
            borderRadius: logoSize * 0.58,
          },
        ]}
        pointerEvents="none"
      />

      {spinRing ? (
        <Animated.View
          style={[
            styles.ring,
            {
              width: ringSize,
              height: ringSize,
              borderRadius: ringSize / 2,
              transform: [{ rotate: spin }],
            },
          ]}
          pointerEvents="none"
        >
          <LinearGradient
            colors={[COLORS.teal700, COLORS.gold400, COLORS.teal600, COLORS.gold500, COLORS.teal700]}
            style={[styles.ringGradient, { width: ringSize, height: ringSize, borderRadius: ringSize / 2 }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={[styles.ringHole, { borderRadius: ringSize / 2 - 3 }]} />
          </LinearGradient>
        </Animated.View>
      ) : null}

      <Image
        source={BRAND_LOGO}
        style={{ width: logoSize, height: logoSize }}
        resizeMode="contain"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  stage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    backgroundColor: 'rgba(228, 180, 41, 0.12)',
    shadowColor: COLORS.gold400,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 28,
    elevation: 0,
  },
  ring: {
    position: 'absolute',
  },
  ringGradient: {
    padding: 2.5,
  },
  ringHole: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default BrandLogoMark;
