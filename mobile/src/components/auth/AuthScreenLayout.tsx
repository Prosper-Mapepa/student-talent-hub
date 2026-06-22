import React, { ReactNode } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, GRADIENTS, authShared } from '../../theme';

const { width } = Dimensions.get('window');
const isTablet = width >= 768 || (Platform.OS === 'ios' && Platform.isPad);
const isLargeTablet = width >= 1024;

type AuthScreenLayoutProps = {
  children: ReactNode;
  scroll?: boolean;
  centerContent?: boolean;
};

export function AuthScreenLayout({
  children,
  scroll = true,
  centerContent = false,
}: AuthScreenLayoutProps) {
  const content = (
    <>
      <View style={styles.backgroundElements} pointerEvents="none">
        <View style={[styles.geometricShape1, authShared.geometricShape1]} />
        <View style={[styles.geometricShape2, authShared.geometricShape2]} />
        <View style={[styles.geometricShape3, authShared.geometricShape3]} />
      </View>
      {children}
    </>
  );

  return (
    <View style={styles.fullScreen}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.teal950} translucent />
      <LinearGradient
        colors={[...GRADIENTS.screen]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            {scroll ? (
              <ScrollView
                contentContainerStyle={[
                  styles.scrollContent,
                  isTablet && styles.scrollContentTablet,
                  centerContent && styles.scrollCentered,
                ]}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                {content}
              </ScrollView>
            ) : (
              <View style={[styles.scrollContent, centerContent && styles.scrollCentered]}>{content}</View>
            )}
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

export const authFormStyles = StyleSheet.create({
  form: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    paddingVertical: isTablet ? (isLargeTablet ? 44 : 40) : 28,
    paddingHorizontal: isTablet ? (isLargeTablet ? 40 : 36) : 20,
    shadowColor: COLORS.teal950,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  formTablet: {
    maxWidth: isLargeTablet ? 650 : 550,
    alignSelf: 'center',
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: isTablet ? (isLargeTablet ? 20 : 18) : 14,
    backgroundColor: COLORS.inputBg,
    height: isTablet ? (isLargeTablet ? 58 : 54) : 48,
    marginBottom: isTablet ? (isLargeTablet ? 16 : 14) : 12,
  },
  inputContainerFocused: {
    borderColor: COLORS.teal700,
    backgroundColor: COLORS.surface,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: isTablet ? (isLargeTablet ? 19 : 18) : 16,
    color: COLORS.foreground,
    height: '100%',
  },
  primaryButton: {
    borderRadius: 12,
    height: isTablet ? (isLargeTablet ? 58 : 54) : 48,
    marginBottom: isTablet ? 20 : 16,
    overflow: 'hidden',
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: isTablet ? (isLargeTablet ? 20 : 18) : 16,
    fontWeight: '700',
  },
  linkText: {
    color: COLORS.teal700,
    fontWeight: '700',
    fontSize: isTablet ? (isLargeTablet ? 17 : 16) : 14,
  },
  mutedText: {
    color: COLORS.muted,
    fontSize: isTablet ? (isLargeTablet ? 17 : 16) : 14,
  },
  fieldError: {
    color: COLORS.destructive,
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
    marginLeft: 4,
  },
});

const styles = StyleSheet.create({
  fullScreen: { flex: 1 },
  safeArea: { flex: 1 },
  container: { flex: 1 },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: Platform.OS === 'ios' ? 8 : 32,
  },
  scrollContentTablet: {
    paddingHorizontal: isLargeTablet ? 80 : 64,
    maxWidth: isLargeTablet ? 700 : 600,
    alignSelf: 'center',
    width: '100%',
  },
  scrollCentered: {
    justifyContent: 'center',
  },
  backgroundElements: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  geometricShape1: {
    position: 'absolute',
    top: 80,
    right: -40,
    width: 100,
    height: 100,
    borderRadius: 20,
    transform: [{ rotate: '45deg' }],
  },
  geometricShape2: {
    position: 'absolute',
    bottom: 180,
    left: -30,
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  geometricShape3: {
    position: 'absolute',
    top: 280,
    left: 40,
    width: 56,
    height: 56,
    borderRadius: 28,
    transform: [{ rotate: '30deg' }],
  },
});

export default AuthScreenLayout;
