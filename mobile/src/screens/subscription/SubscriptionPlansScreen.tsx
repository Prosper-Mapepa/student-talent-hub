import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppDispatch, useAppSelector } from '../../store';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import { showToast } from '../../components/ui/toast';
import { COLORS, GRADIENTS, DASHBOARD_PADDING_H } from '../../theme';
import {
  BillingCycle,
  SubscriptionAudience,
  SubscriptionPackage,
  formatPrice,
  getAnnualSavingsPercent,
  getPackagePrice,
  getPackagesForAudience,
  isPilotIapPurchase,
  PILOT_IAP_PACKAGE_ID,
} from '../../constants/subscriptionPackages';
import { refreshSubscriptionStatus, selectHasStudentPro } from '../../store/slices/subscriptionSlice';
import { RootStackParamList, UserRole } from '../../types';

type Nav = StackNavigationProp<RootStackParamList, 'SubscriptionPlans'>;

const ICON_MAP: Record<SubscriptionPackage['icon'], keyof typeof Ionicons.glyphMap> = {
  leaf: 'leaf-outline',
  star: 'star',
  rocket: 'rocket-outline',
  briefcase: 'briefcase-outline',
  'trending-up': 'trending-up-outline',
  diamond: 'diamond-outline',
};

export default function SubscriptionPlansScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const hasStudentPro = useAppSelector(selectHasStudentPro);

  const audience: SubscriptionAudience =
    user?.role === UserRole.BUSINESS ? 'business' : 'student';

  const packages = useMemo(() => getPackagesForAudience(audience), [audience]);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [selectedId, setSelectedId] = useState(
    () => packages.find((p) => p.highlighted)?.id ?? packages[1]?.id ?? packages[0].id,
  );

  const selectedPackage = packages.find((p) => p.id === selectedId) ?? packages[0];
  const selectedPrice = getPackagePrice(selectedPackage, billingCycle);

  useEffect(() => {
    if (user?.id) {
      dispatch(refreshSubscriptionStatus(user.id));
    }
  }, [dispatch, user?.id]);

  const handleContinue = () => {
    if (selectedPrice === 0) {
      navigation.goBack();
      return;
    }
    if (!isPilotIapPurchase(selectedPackage.id, billingCycle)) {
      showToast('Pilot billing is available for Student Pro · Monthly only.', 'error');
      return;
    }
    navigation.navigate('SubscriptionCheckout', {
      packageId: selectedPackage.id,
      billingCycle,
    });
  };

  return (
    <View style={styles.container}>
      <DashboardHeader
        badge="VeriTalent Plus"
        title="Choose your plan"
        subtitle={
          audience === 'student'
            ? 'Unlock visibility, analytics, and verified status'
            : 'Reach verified student talent faster'
        }
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Billing toggle */}
        <View style={styles.billingToggle}>
          <Pressable
            style={[styles.billingOption, billingCycle === 'monthly' && styles.billingOptionActive]}
            onPress={() => setBillingCycle('monthly')}
          >
            <Text
              style={[
                styles.billingOptionText,
                billingCycle === 'monthly' && styles.billingOptionTextActive,
              ]}
            >
              Monthly
            </Text>
          </Pressable>
          <Pressable
            style={[styles.billingOption, billingCycle === 'annual' && styles.billingOptionActive]}
            onPress={() => setBillingCycle('annual')}
          >
            <Text
              style={[
                styles.billingOptionText,
                billingCycle === 'annual' && styles.billingOptionTextActive,
              ]}
            >
              Annual
            </Text>
            <View style={styles.savePill}>
              <Text style={styles.savePillText}>Save up to 25%</Text>
            </View>
          </Pressable>
        </View>

        {hasStudentPro ? (
          <View style={styles.activeBanner}>
            <Ionicons name="star" size={18} color={COLORS.gold500} />
            <Text style={styles.activeBannerText}>Student Pro is active on your account</Text>
          </View>
        ) : (
          <View style={styles.pilotBanner}>
            <Text style={styles.pilotBannerText}>
              Pilot: in-app billing is live for <Text style={styles.pilotBold}>Student Pro · Monthly</Text>
            </Text>
          </View>
        )}

        {/* Plan cards */}
        {packages.map((pkg) => {
          const price = getPackagePrice(pkg, billingCycle);
          const isSelected = pkg.id === selectedId;
          const savings = billingCycle === 'annual' ? getAnnualSavingsPercent(pkg) : 0;

          return (
            <TouchableOpacity
              key={pkg.id}
              activeOpacity={0.9}
              onPress={() => setSelectedId(pkg.id)}
              style={[
                styles.planCard,
                isSelected && styles.planCardSelected,
                pkg.highlighted && styles.planCardHighlighted,
              ]}
            >
              {pkg.badge ? (
                <LinearGradient colors={[...GRADIENTS.gold]} style={styles.planBadge}>
                  <Text style={styles.planBadgeText}>{pkg.badge}</Text>
                </LinearGradient>
              ) : null}

              <View style={styles.planHeader}>
                <View style={[styles.planIcon, isSelected && styles.planIconSelected]}>
                  <Ionicons
                    name={ICON_MAP[pkg.icon]}
                    size={22}
                    color={isSelected ? COLORS.white : COLORS.teal700}
                  />
                </View>
                <View style={styles.planTitleBlock}>
                  <Text style={styles.planName}>{pkg.name}</Text>
                  <Text style={styles.planTagline}>{pkg.tagline}</Text>
                  {pkg.id === PILOT_IAP_PACKAGE_ID ? (
                    <Text style={styles.pilotTag}>In-app purchase pilot</Text>
                  ) : null}
                </View>
                <View style={[styles.radio, isSelected && styles.radioSelected]}>
                  {isSelected ? <View style={styles.radioInner} /> : null}
                </View>
              </View>

              <View style={styles.priceRow}>
                <Text style={styles.priceAmount}>{formatPrice(price)}</Text>
                {price > 0 ? (
                  <Text style={styles.pricePeriod}>/{billingCycle === 'annual' ? 'year' : 'mo'}</Text>
                ) : null}
                {savings > 0 ? (
                  <Text style={styles.savingsText}>Save {savings}% yearly</Text>
                ) : null}
              </View>

              <View style={styles.featureList}>
                {pkg.features.map((feature) => (
                  <View key={feature} style={styles.featureRow}>
                    <Ionicons name="checkmark-circle" size={18} color={COLORS.teal600} />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          );
        })}

        <View style={styles.trustRow}>
          <Ionicons name="shield-checkmark" size={18} color={COLORS.teal700} />
          <Text style={styles.trustText}>
            Secure checkout · Cancel anytime · No hidden fees
          </Text>
        </View>
      </ScrollView>

      {/* Sticky CTA */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <View style={styles.footerSummary}>
          <Text style={styles.footerLabel}>
            {selectedPackage.name} · {billingCycle === 'annual' ? 'Annual' : 'Monthly'}
          </Text>
          <Text style={styles.footerPrice}>
            {selectedPrice === 0 ? 'Free forever' : formatPrice(selectedPrice)}
          </Text>
        </View>
        <TouchableOpacity activeOpacity={0.85} onPress={handleContinue}>
          <LinearGradient
            colors={[...GRADIENTS.button]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaButton}
          >
            <Text style={styles.ctaText}>
              {selectedPrice === 0
                ? 'Continue with Free'
                : isPilotIapPurchase(selectedPackage.id, billingCycle)
                  ? 'Subscribe in app'
                  : 'Coming soon'}
            </Text>
            <Ionicons name="arrow-forward" size={18} color={COLORS.white} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: DASHBOARD_PADDING_H,
    paddingTop: 20,
    gap: 16,
  },
  billingToggle: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(4, 52, 44, 0.08)',
  },
  billingOption: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  billingOptionActive: {
    backgroundColor: COLORS.mint50,
  },
  billingOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.muted,
  },
  billingOptionTextActive: {
    color: COLORS.teal950,
  },
  savePill: {
    backgroundColor: COLORS.gold500,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  savePillText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.teal950,
  },
  pilotBanner: {
    backgroundColor: COLORS.mint50,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(15, 110, 86, 0.12)',
  },
  pilotBannerText: {
    fontSize: 13,
    color: COLORS.foreground,
    lineHeight: 18,
  },
  pilotBold: {
    fontWeight: '700',
    color: COLORS.teal950,
  },
  activeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.gold500,
  },
  activeBannerText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.teal950,
  },
  pilotTag: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.teal600,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  planCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 18,
    borderWidth: 2,
    borderColor: 'rgba(4, 52, 44, 0.06)',
    position: 'relative',
    overflow: 'hidden',
  },
  planCardSelected: {
    borderColor: COLORS.teal700,
    shadowColor: COLORS.teal950,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  planCardHighlighted: {
    marginTop: 8,
  },
  planBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottomLeftRadius: 12,
  },
  planBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.teal950,
    letterSpacing: 0.3,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  planIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.mint50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planIconSelected: {
    backgroundColor: COLORS.teal700,
  },
  planTitleBlock: {
    flex: 1,
  },
  planName: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.teal950,
  },
  planTagline: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 2,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: COLORS.teal700,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.teal700,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginBottom: 14,
  },
  priceAmount: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.teal950,
  },
  pricePeriod: {
    fontSize: 14,
    color: COLORS.muted,
    fontWeight: '600',
  },
  savingsText: {
    marginLeft: 8,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.teal600,
  },
  featureList: {
    gap: 10,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  featureText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.foreground,
  },
  trustRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  trustText: {
    fontSize: 13,
    color: COLORS.muted,
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: 'rgba(4, 52, 44, 0.08)',
    paddingHorizontal: DASHBOARD_PADDING_H,
    paddingTop: 14,
    gap: 12,
  },
  footerSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLabel: {
    fontSize: 14,
    color: COLORS.muted,
    fontWeight: '600',
  },
  footerPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.teal950,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 14,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
  },
});
