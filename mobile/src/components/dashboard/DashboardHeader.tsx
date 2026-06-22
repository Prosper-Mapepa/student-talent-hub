import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, GRADIENTS, DASHBOARD_PADDING_H } from '../../theme';

type DashboardHeaderProps = {
  title: string;
  subtitle?: string;
  badge?: string;
  right?: ReactNode;
  onBack?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function DashboardHeader({
  title,
  subtitle,
  badge,
  right,
  onBack,
  style,
}: DashboardHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={style}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.teal950} />
      <LinearGradient
        colors={[...GRADIENTS.heroRich]}
        style={[styles.gradient, { paddingTop: insets.top + 14 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.glowOrb} pointerEvents="none" />
        <View style={styles.glowOrbSecondary} pointerEvents="none" />

        {onBack ? (
          <TouchableOpacity style={styles.backBtn} onPress={onBack} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons name="chevron-back" size={22} color={COLORS.white} />
          </TouchableOpacity>
        ) : null}

        {badge ? <Text style={styles.badge}>{badge}</Text> : null}

        <View style={styles.row}>
          <View style={styles.textCol}>
            <Text style={styles.title}>{title}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
          {right ? <View style={styles.actions}>{right}</View> : null}
        </View>
      </LinearGradient>
    </View>
  );
}

export function HeaderIconButton({
  icon,
  onPress,
  variant = 'glass',
}: {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  variant?: 'glass' | 'gold';
}) {
  return (
    <TouchableOpacity
      style={[styles.iconBtn, variant === 'gold' && styles.iconBtnGold]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Ionicons name={icon} size={20} color={variant === 'gold' ? COLORS.teal950 : COLORS.white} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gradient: {
    paddingHorizontal: DASHBOARD_PADDING_H,
    paddingBottom: 22,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: 'hidden',
  },
  glowOrb: {
    position: 'absolute',
    top: -40,
    right: -30,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(29, 158, 117, 0.35)',
  },
  glowOrbSecondary: {
    position: 'absolute',
    bottom: -20,
    left: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(228, 180, 41, 0.15)',
  },
  backBtn: {
    marginBottom: 8,
    alignSelf: 'flex-start',
    padding: 4,
  },
  badge: {
    alignSelf: 'flex-start',
    marginBottom: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: 'hidden',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: COLORS.gold300,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(228, 180, 41, 0.25)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 12,
  },
  textCol: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: -0.5,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.88)',
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: {
    padding: 11,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.22)',
  },
  iconBtnGold: {
    backgroundColor: COLORS.gold400,
    borderColor: COLORS.gold300,
  },
});

export default DashboardHeader;
