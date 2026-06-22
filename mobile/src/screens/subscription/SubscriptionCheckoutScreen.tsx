import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Platform,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../../types';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import { showToast } from '../../components/ui/toast';
import { useAppDispatch, useAppSelector } from '../../store';
import { COLORS, GRADIENTS, DASHBOARD_PADDING_H } from '../../theme';
import {
  formatPrice,
  getPackageById,
  getPackagePrice,
  isPilotIapPurchase,
  PILOT_STORE_PRODUCT_ID,
} from '../../constants/subscriptionPackages';
import {
  clearSubscriptionError,
  purchaseStudentPro,
  refreshSubscriptionStatus,
  restoreUserPurchases,
  selectHasStudentPro,
} from '../../store/slices/subscriptionSlice';
import { findStudentProMonthlyPackage, getOfferings } from '../../services/purchases';

type Nav = StackNavigationProp<RootStackParamList, 'SubscriptionCheckout'>;
type Route = RouteProp<RootStackParamList, 'SubscriptionCheckout'>;

export default function SubscriptionCheckoutScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const {
    isPurchasing,
    isRestoring,
    isLoading,
    isConfigured,
    error,
  } = useAppSelector((state) => state.subscription);
  const hasStudentPro = useAppSelector(selectHasStudentPro);
  const [storePrice, setStorePrice] = useState<string | null>(null);
  const [productReady, setProductReady] = useState(false);

  const { packageId, billingCycle } = route.params;
  const pkg = getPackageById(packageId);
  const isPilotPurchase = pkg ? isPilotIapPurchase(packageId, billingCycle) : false;

  const subtotal = useMemo(
    () => (pkg ? getPackagePrice(pkg, billingCycle) : 0),
    [pkg, billingCycle],
  );

  const displayPrice = storePrice ?? formatPrice(subtotal);

  useEffect(() => {
    if (user?.id) {
      dispatch(refreshSubscriptionStatus(user.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    let cancelled = false;

    async function loadStoreProduct() {
      if (!isConfigured || !isPilotPurchase) {
        setProductReady(false);
        return;
      }

      const offerings = await getOfferings();
      const pilotPackage = findStudentProMonthlyPackage(offerings);
      if (cancelled) {
        return;
      }

      if (pilotPackage) {
        setStorePrice(pilotPackage.product.priceString);
        setProductReady(true);
      } else {
        setStorePrice(null);
        setProductReady(false);
      }
    }

    loadStoreProduct();
    return () => {
      cancelled = true;
    };
  }, [isConfigured, isPilotPurchase]);

  useEffect(() => {
    if (error) {
      showToast(error, 'error');
      dispatch(clearSubscriptionError());
    }
  }, [error, dispatch]);

  if (!pkg) {
    return (
      <View style={styles.container}>
        <DashboardHeader title="Checkout" onBack={() => navigation.goBack()} />
        <View style={styles.centered}>
          <Text style={styles.errorText}>Plan not found.</Text>
        </View>
      </View>
    );
  }

  if (hasStudentPro) {
    return (
      <View style={styles.container}>
        <View style={[styles.successWrap, { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 24 }]}>
          <LinearGradient colors={[...GRADIENTS.hero]} style={styles.successIcon}>
            <Ionicons name="checkmark" size={48} color={COLORS.white} />
          </LinearGradient>
          <Text style={styles.successTitle}>Pro is active</Text>
          <Text style={styles.successSubtitle}>
            Your Student Pro subscription is already active on this account.
          </Text>
          <TouchableOpacity activeOpacity={0.85} onPress={() => navigation.popToTop()}>
            <LinearGradient colors={[...GRADIENTS.button]} style={styles.successButton}>
              <Text style={styles.successButtonText}>Back to app</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const handleSubscribe = async () => {
    if (!isPilotPurchase) {
      showToast('Only Student Pro (monthly) is available in the pilot release.', 'error');
      return;
    }
    if (!isConfigured) {
      showToast('Subscriptions are not configured yet. Add RevenueCat API keys and rebuild the app.', 'error');
      return;
    }
    if (!productReady) {
      showToast(
        `Product "${PILOT_STORE_PRODUCT_ID}" not found. Finish App Store / Play / RevenueCat setup.`,
        'error',
      );
      return;
    }

    const result = await dispatch(purchaseStudentPro());
    if (purchaseStudentPro.fulfilled.match(result)) {
      showToast(`Welcome to ${pkg.name}!`, 'success');
      navigation.popToTop();
    }
  };

  const handleRestore = async () => {
    const result = await dispatch(restoreUserPurchases());
    if (restoreUserPurchases.fulfilled.match(result)) {
      if (result.payload.isActive) {
        showToast('Subscription restored!', 'success');
        navigation.popToTop();
      } else {
        showToast('No active subscription found for this account.', 'error');
      }
    }
  };

  const openManageSubscriptions = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('https://apps.apple.com/account/subscriptions');
    } else {
      Linking.openURL('https://play.google.com/store/account/subscriptions');
    }
  };

  return (
    <View style={styles.container}>
      <DashboardHeader
        badge="App Store / Play billing"
        title="Subscribe with VeriTalent"
        subtitle={`${pkg.name} · ${billingCycle === 'annual' ? 'Annual' : 'Monthly'}`}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 140 }]}
        showsVerticalScrollIndicator={false}
      >
        {!isPilotPurchase ? (
          <View style={styles.noticeCard}>
            <Ionicons name="information-circle" size={22} color={COLORS.teal700} />
            <Text style={styles.noticeText}>
              Pilot testing is limited to <Text style={styles.noticeBold}>Student Pro · Monthly</Text>.
              Other plans are coming soon.
            </Text>
          </View>
        ) : null}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Order summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>{pkg.name} subscription</Text>
            <Text style={styles.summaryValue}>{displayPrice}</Text>
          </View>
          <View style={styles.renewalNote}>
            <Ionicons name="refresh-outline" size={16} color={COLORS.muted} />
            <Text style={styles.renewalText}>
              Billed through {Platform.OS === 'ios' ? 'Apple' : 'Google Play'}. Cancel anytime in
              your store account settings.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>What you unlock</Text>
          {pkg.features.map((feature) => (
            <View key={feature} style={styles.featureRow}>
              <Ionicons name="checkmark-circle" size={18} color={COLORS.teal600} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Pilot product ID</Text>
          <Text style={styles.productId}>{PILOT_STORE_PRODUCT_ID}</Text>
          <Text style={styles.productHint}>
            Must exist in App Store Connect, Google Play Console, and RevenueCat with entitlement{' '}
            <Text style={styles.noticeBold}>student_pro</Text>.
          </Text>
        </View>

        <TouchableOpacity style={styles.restoreButton} onPress={handleRestore} disabled={isRestoring}>
          {isRestoring ? (
            <ActivityIndicator color={COLORS.teal700} />
          ) : (
            <Text style={styles.restoreText}>Restore purchases</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.manageButton} onPress={openManageSubscriptions}>
          <Text style={styles.manageText}>Manage subscriptions</Text>
        </TouchableOpacity>

        <View style={styles.secureRow}>
          <Ionicons name="lock-closed" size={16} color={COLORS.teal700} />
          <Text style={styles.secureText}>
            Secure billing via {Platform.OS === 'ios' ? 'Apple In-App Purchase' : 'Google Play Billing'}
          </Text>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleSubscribe}
          disabled={isPurchasing || isLoading || !isPilotPurchase}
        >
          <LinearGradient
            colors={[...GRADIENTS.button]}
            style={[styles.payButton, (isPurchasing || !isPilotPurchase) && styles.payButtonDisabled]}
          >
            {isPurchasing || isLoading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <>
                <Ionicons name="shield-checkmark" size={18} color={COLORS.white} />
                <Text style={styles.payButtonText}>
                  {isPilotPurchase ? `Subscribe · ${displayPrice}` : 'Pilot: Student Pro monthly only'}
                </Text>
              </>
            )}
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
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: DASHBOARD_PADDING_H,
    paddingTop: 20,
    gap: 16,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 16,
    color: COLORS.muted,
  },
  noticeCard: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: COLORS.mint50,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(15, 110, 86, 0.12)',
  },
  noticeText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.foreground,
  },
  noticeBold: {
    fontWeight: '700',
    color: COLORS.teal950,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(4, 52, 44, 0.06)',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.teal950,
    marginBottom: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: COLORS.muted,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.teal950,
  },
  renewalNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    padding: 10,
    backgroundColor: COLORS.mint50,
    borderRadius: 10,
  },
  renewalText: {
    flex: 1,
    fontSize: 12,
    color: COLORS.muted,
    lineHeight: 18,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
  },
  featureText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.foreground,
  },
  productId: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 13,
    color: COLORS.teal700,
    marginBottom: 8,
  },
  productHint: {
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.muted,
  },
  restoreButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  restoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.teal700,
  },
  manageButton: {
    alignItems: 'center',
    paddingBottom: 8,
  },
  manageText: {
    fontSize: 13,
    color: COLORS.muted,
    textDecorationLine: 'underline',
  },
  secureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  secureText: {
    fontSize: 12,
    color: COLORS.muted,
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
  },
  payButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 14,
  },
  payButtonDisabled: {
    opacity: 0.65,
  },
  payButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.white,
  },
  successWrap: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: COLORS.background,
  },
  successIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.teal950,
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 15,
    color: COLORS.muted,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },
  successButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  successButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
  },
});
