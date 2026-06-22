import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  StatusBar,
  SafeAreaView,
  Easing,
  LayoutChangeEvent,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../types';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, BRAND } from '../../theme';
import { BrandLogoMark } from '../../components/auth/BrandLogoMark';
import { VeriTalentWordmark } from '../../components/auth/VeriTalentWordmark';

const PILLARS = [
  { icon: 'star' as const, label: 'Showcase' },
  { icon: 'briefcase' as const, label: 'Discover' },
  { icon: 'people' as const, label: 'Connect' },
  { icon: 'trending-up' as const, label: 'Evolve' },
];

function PillarTicker() {
  const translateX = useRef(new Animated.Value(0)).current;
  const segmentWidth = useRef(0);
  const loopRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => () => loopRef.current?.stop(), []);

  const startLoop = (width: number) => {
    loopRef.current?.stop();
    translateX.setValue(0);
    loopRef.current = Animated.loop(
      Animated.timing(translateX, {
        toValue: -width,
        duration: width * 22,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loopRef.current.start();
  };

  const onSegmentLayout = (event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width;
    if (width > 0 && width !== segmentWidth.current) {
      segmentWidth.current = width;
      startLoop(width);
    }
  };

  const renderSegment = (prefix: string) => (
    <View
      style={styles.tickerSegment}
      onLayout={prefix === 'a' ? onSegmentLayout : undefined}
    >
      {PILLARS.map((item) => (
        <View key={`${prefix}-${item.label}`} style={styles.tickerItem}>
          <Ionicons name={item.icon} size={20} color={COLORS.gold400} />
          <Text style={styles.pillarLabel}>{item.label}</Text>
          <Text style={styles.tickerDot}>•</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.tickerMask}>
      <Animated.View style={[styles.tickerTrack, { transform: [{ translateX }] }]}>
        {renderSegment('a')}
        {renderSegment('b')}
      </Animated.View>
    </View>
  );
}

const WelcomeHomeScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'WelcomeHome'>>();
  const insets = useSafeAreaInsets();

  const fade = useRef(new Animated.Value(0)).current;
  const rise = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.spring(rise, { toValue: 0, friction: 9, tension: 50, useNativeDriver: true }),
    ]).start();
  }, [fade, rise]);

  const handleSignIn = () => navigation.navigate('Login');
  const handleJoin = () => navigation.navigate('Register');

  return (
    <View style={styles.fullScreen}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.teal950} translucent />
      <LinearGradient
        colors={[COLORS.teal950, '#074d3d', COLORS.teal950]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <SafeAreaView style={styles.safeArea}>
        <Animated.View
          style={[
            styles.body,
            {
              paddingBottom: Math.max(insets.bottom, 20) + 12,
              opacity: fade,
              transform: [{ translateY: rise }],
            },
          ]}
        >
          <View style={styles.hero}>
            <BrandLogoMark size={120} spinRing float />
            <VeriTalentWordmark
              fontSize={44}
              letterSpacing={-0.5}
              fullWidth
              style={styles.titleWordmark}
            />
            <Text style={styles.tagline}>{BRAND.tagline}</Text>
            {/* <Text style={styles.subtitle}>
              Verified student talent, in one place.
            </Text> */}
          </View>

          <View style={styles.spacer} />

          <PillarTicker />

          <View style={styles.ctaBlock}>
            <TouchableOpacity onPress={handleJoin} activeOpacity={0.9} style={styles.primaryBtn}>
              <LinearGradient
                colors={[COLORS.gold400, COLORS.gold500]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.primaryBtnGradient}
              >
                <Text style={styles.primaryBtnText}>Get Started</Text>
                <Ionicons name="arrow-forward" size={18} color={COLORS.teal950} />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSignIn} activeOpacity={0.7} style={styles.secondaryBtn}>
              <Text style={styles.secondaryBtnText}>I already have an account</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: COLORS.teal950,
  },
  safeArea: {
    flex: 1,
  },
  body: {
    flex: 1,
    paddingHorizontal: 28,
  },
  hero: {
    alignItems: 'center',
    paddingTop: 50,
    gap: 6,
  },
  titleWordmark: {
    marginTop: 16,
    width: '100%',
  },
  tagline: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.55)',
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: 4,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(255,255,255,0.88)',
    textAlign: 'center',
    fontWeight: '500',
    maxWidth: 280,
    paddingHorizontal: 8,
  },
  spacer: {
    flex: 1,
    minHeight: 24,
  },
  tickerMask: {
    overflow: 'hidden',
    marginBottom: 36,
    height: 44,
    justifyContent: 'center',
  },
  tickerTrack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tickerSegment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 18,
  },
  tickerDot: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.25)',
    marginLeft: 4,
  },
  pillarLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 0.2,
  },
  ctaBlock: {
    gap: 8,
  },
  primaryBtn: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  primaryBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  primaryBtnText: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.teal950,
  },
  secondaryBtn: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryBtnText: {
    fontSize: 15,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.75)',
  },
});

export default WelcomeHomeScreen;
