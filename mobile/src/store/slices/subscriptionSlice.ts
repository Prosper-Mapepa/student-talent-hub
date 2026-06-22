import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../services/api';
import {
  configurePurchases,
  findStudentProMonthlyPackage,
  getCustomerInfo,
  getOfferings,
  getPurchaseErrorMessage,
  hasStudentProEntitlement,
  isPurchasesConfigured,
  loginPurchasesUser,
  logoutPurchasesUser,
  purchasePackage,
  restorePurchases,
} from '../../services/purchases';
import { REVENUECAT_ENTITLEMENT_STUDENT_PRO } from '../../constants/subscriptionPackages';

export type SubscriptionTier = 'free' | 'student_pro';

export interface SubscriptionState {
  tier: SubscriptionTier;
  isActive: boolean;
  isLoading: boolean;
  isRestoring: boolean;
  isPurchasing: boolean;
  expiresAt: string | null;
  productId: string | null;
  error: string | null;
  isConfigured: boolean;
}

const initialState: SubscriptionState = {
  tier: 'free',
  isActive: false,
  isLoading: false,
  isRestoring: false,
  isPurchasing: false,
  expiresAt: null,
  productId: null,
  error: null,
  isConfigured: false,
};

function tierFromCustomerInfo(customerInfo: Awaited<ReturnType<typeof getCustomerInfo>>): {
  tier: SubscriptionTier;
  isActive: boolean;
  expiresAt: string | null;
  productId: string | null;
} {
  const isPro = hasStudentProEntitlement(customerInfo);
  const entitlement = customerInfo?.entitlements.active[REVENUECAT_ENTITLEMENT_STUDENT_PRO];

  return {
    tier: isPro ? 'student_pro' : 'free',
    isActive: isPro,
    expiresAt: entitlement?.expirationDate ?? null,
    productId: entitlement?.productIdentifier ?? null,
  };
}

async function syncSubscriptionToBackend(
  tier: SubscriptionTier,
  expiresAt: string | null,
  productId: string | null,
): Promise<void> {
  try {
    await apiService.syncSubscription({
      tier,
      entitlement: tier === 'student_pro' ? REVENUECAT_ENTITLEMENT_STUDENT_PRO : 'free',
      productId: productId ?? undefined,
      expiresAt: expiresAt ?? undefined,
    });
  } catch {
    // Backend webhook is the long-term source of truth; client sync is best-effort
  }
}

export const initializePurchases = createAsyncThunk(
  'subscription/initializePurchases',
  async (_, { rejectWithValue }) => {
    const ready = await configurePurchases();
    if (!ready) {
      return { isConfigured: false };
    }
    return { isConfigured: true };
  },
);

export const refreshSubscriptionStatus = createAsyncThunk(
  'subscription/refresh',
  async (userId: string | undefined, { rejectWithValue }) => {
    if (!isPurchasesConfigured()) {
      return tierFromCustomerInfo(null);
    }

    if (userId) {
      await loginPurchasesUser(userId);
    }

    const [customerInfo] = await Promise.all([
      getCustomerInfo(),
      getOfferings(),
    ]);

    const status = tierFromCustomerInfo(customerInfo);

    await syncSubscriptionToBackend(status.tier, status.expiresAt, status.productId);

    return status;
  },
);

export const purchaseStudentPro = createAsyncThunk(
  'subscription/purchaseStudentPro',
  async (_, { rejectWithValue }) => {
    const offerings = await getOfferings();
    const pilotPackage = findStudentProMonthlyPackage(offerings);

    if (!pilotPackage) {
      return rejectWithValue(
        'Subscription product not found. Check RevenueCat and App Store / Play Console setup.',
      );
    }

    try {
      const customerInfo = await purchasePackage(pilotPackage);
      const status = tierFromCustomerInfo(customerInfo);
      await syncSubscriptionToBackend(status.tier, status.expiresAt, status.productId);
      return status;
    } catch (error) {
      return rejectWithValue(getPurchaseErrorMessage(error));
    }
  },
);

export const restoreUserPurchases = createAsyncThunk(
  'subscription/restore',
  async (_, { rejectWithValue }) => {
    try {
      const customerInfo = await restorePurchases();
      const status = tierFromCustomerInfo(customerInfo);
      await syncSubscriptionToBackend(status.tier, status.expiresAt, status.productId);
      return status;
    } catch (error) {
      return rejectWithValue(getPurchaseErrorMessage(error));
    }
  },
);

export const clearSubscriptionOnLogout = createAsyncThunk(
  'subscription/clearOnLogout',
  async () => {
    await logoutPurchasesUser();
    return tierFromCustomerInfo(null);
  },
);

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    clearSubscriptionError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializePurchases.fulfilled, (state, action) => {
        state.isConfigured = action.payload.isConfigured;
      })
      .addCase(refreshSubscriptionStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshSubscriptionStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tier = action.payload.tier;
        state.isActive = action.payload.isActive;
        state.expiresAt = action.payload.expiresAt;
        state.productId = action.payload.productId;
      })
      .addCase(refreshSubscriptionStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Could not load subscription status';
      })
      .addCase(purchaseStudentPro.pending, (state) => {
        state.isPurchasing = true;
        state.error = null;
      })
      .addCase(purchaseStudentPro.fulfilled, (state, action) => {
        state.isPurchasing = false;
        state.tier = action.payload.tier;
        state.isActive = action.payload.isActive;
        state.expiresAt = action.payload.expiresAt;
        state.productId = action.payload.productId;
      })
      .addCase(purchaseStudentPro.rejected, (state, action) => {
        state.isPurchasing = false;
        const message = action.payload as string;
        if (message !== 'Purchase cancelled') {
          state.error = message;
        }
      })
      .addCase(restoreUserPurchases.pending, (state) => {
        state.isRestoring = true;
        state.error = null;
      })
      .addCase(restoreUserPurchases.fulfilled, (state, action) => {
        state.isRestoring = false;
        state.tier = action.payload.tier;
        state.isActive = action.payload.isActive;
        state.expiresAt = action.payload.expiresAt;
        state.productId = action.payload.productId;
      })
      .addCase(restoreUserPurchases.rejected, (state, action) => {
        state.isRestoring = false;
        state.error = (action.payload as string) || 'Could not restore purchases';
      })
      .addCase(clearSubscriptionOnLogout.fulfilled, (state) => {
        state.tier = 'free';
        state.isActive = false;
        state.expiresAt = null;
        state.productId = null;
        state.error = null;
        state.isPurchasing = false;
        state.isRestoring = false;
      });
  },
});

export const { clearSubscriptionError } = subscriptionSlice.actions;
export const selectHasStudentPro = (state: { subscription: SubscriptionState }) =>
  state.subscription.tier === 'student_pro' && state.subscription.isActive;

export const FREE_TALENT_LIMIT = 3;

export default subscriptionSlice.reducer;
