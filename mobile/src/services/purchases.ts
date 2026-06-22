import { Platform } from 'react-native';
import Constants from 'expo-constants';
import Purchases, {
  CustomerInfo,
  LOG_LEVEL,
  PurchasesOfferings,
  PurchasesPackage,
  PURCHASES_ERROR_CODE,
} from 'react-native-purchases';
import {
  PILOT_STORE_PRODUCT_ID,
  REVENUECAT_ENTITLEMENT_STUDENT_PRO,
} from '../constants/subscriptionPackages';

let configured = false;

function getRevenueCatApiKey(): string | null {
  const extra = Constants.expoConfig?.extra as Record<string, string | undefined> | undefined;
  if (Platform.OS === 'ios') {
    return extra?.revenueCatAppleApiKey?.trim() || null;
  }
  if (Platform.OS === 'android') {
    return extra?.revenueCatGoogleApiKey?.trim() || null;
  }
  return null;
}

export function isPurchasesConfigured(): boolean {
  return configured;
}

export async function configurePurchases(): Promise<boolean> {
  const apiKey = getRevenueCatApiKey();
  if (!apiKey) {
    console.warn('[Purchases] Missing RevenueCat API key — subscriptions disabled');
    return false;
  }

  if (configured) {
    return true;
  }

  if (__DEV__) {
    Purchases.setLogLevel(LOG_LEVEL.DEBUG);
  }

  Purchases.configure({ apiKey });
  configured = true;
  return true;
}

export async function loginPurchasesUser(userId: string): Promise<CustomerInfo | null> {
  if (!configured) {
    return null;
  }
  const { customerInfo } = await Purchases.logIn(userId);
  return customerInfo;
}

export async function logoutPurchasesUser(): Promise<void> {
  if (!configured) {
    return;
  }
  try {
    await Purchases.logOut();
  } catch {
    // Anonymous user after logout is expected
  }
}

export async function getCustomerInfo(): Promise<CustomerInfo | null> {
  if (!configured) {
    return null;
  }
  return Purchases.getCustomerInfo();
}

export async function getOfferings(): Promise<PurchasesOfferings | null> {
  if (!configured) {
    return null;
  }
  return Purchases.getOfferings();
}

export function hasStudentProEntitlement(customerInfo: CustomerInfo | null | undefined): boolean {
  if (!customerInfo) {
    return false;
  }
  return Boolean(customerInfo.entitlements.active[REVENUECAT_ENTITLEMENT_STUDENT_PRO]);
}

export function findStudentProMonthlyPackage(
  offerings: PurchasesOfferings | null,
): PurchasesPackage | null {
  if (!offerings?.current) {
    return null;
  }

  const { current } = offerings;

  const byProductId = current.availablePackages.find(
    (pkg) => pkg.product.identifier === PILOT_STORE_PRODUCT_ID,
  );
  if (byProductId) {
    return byProductId;
  }

  const monthly = current.monthly;
  if (monthly?.product.identifier === PILOT_STORE_PRODUCT_ID) {
    return monthly;
  }

  return current.availablePackages[0] ?? null;
}

export async function purchasePackage(pkg: PurchasesPackage): Promise<CustomerInfo> {
  const { customerInfo } = await Purchases.purchasePackage(pkg);
  return customerInfo;
}

export async function restorePurchases(): Promise<CustomerInfo> {
  return Purchases.restorePurchases();
}

export function isUserCancelledPurchase(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as { code?: string }).code === PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR
  );
}

export function getPurchaseErrorMessage(error: unknown): string {
  if (isUserCancelledPurchase(error)) {
    return 'Purchase cancelled';
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return 'Purchase failed. Please try again.';
}
