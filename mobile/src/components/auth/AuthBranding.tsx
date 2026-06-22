import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Platform } from 'react-native';
import { COLORS, BRAND } from '../../theme';
import { BRAND_LOGO } from '../BrandLogoImage';
import { VeriTalentWordmark } from './VeriTalentWordmark';

const { width } = Dimensions.get('window');
const isTablet = width >= 768 || (Platform.OS === 'ios' && Platform.isPad);
const isLargeTablet = width >= 1024;

type AuthBrandingProps = {
  subtitle?: string;
  compact?: boolean;
};

export function AuthBranding({ subtitle, compact }: AuthBrandingProps) {
  return (
    <View style={[styles.header, compact && styles.headerCompact]}>
      <View style={styles.logoContainer}>
        <Image source={BRAND_LOGO} style={[styles.logo, compact && styles.logoCompact]} />
      </View>
      <VeriTalentWordmark
        fontSize={compact ? (isTablet ? 32 : 26) : isTablet ? (isLargeTablet ? 44 : 38) : 30}
        letterSpacing={compact ? 0.5 : 1.5}
        style={styles.titleWordmark}
      />
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: isTablet ? (isLargeTablet ? 40 : 30) : 10,
  },
  headerCompact: {
    marginBottom: isTablet ? 24 : 16,
  },
  logoContainer: {
    marginBottom: isTablet ? (isLargeTablet ? 36 : 28) : 20,
    paddingTop: 10,
  },
  logo: {
    width: isTablet ? (isLargeTablet ? 200 : 170) : 120,
    height: isTablet ? (isLargeTablet ? 140 : 120) : 86,
    borderRadius: 20,
  },
  logoCompact: {
    width: isTablet ? 140 : 100,
    height: isTablet ? 100 : 72,
  },
  titleWordmark: {
    marginBottom: 8,
  },
  subtitle: {
    fontSize: isTablet ? (isLargeTablet ? 20 : 18) : 14,
    color: 'rgba(255,255,255,0.92)',
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
    marginBottom: isTablet ? (isLargeTablet ? 40 : 32) : 24,
  },
});

export default AuthBranding;
