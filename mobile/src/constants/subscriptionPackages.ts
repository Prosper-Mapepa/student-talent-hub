export type SubscriptionAudience = 'student' | 'business';
export type BillingCycle = 'monthly' | 'annual';

/** Pilot in-app subscription — must match App Store, Play Console, and RevenueCat */
export const PILOT_IAP_PACKAGE_ID = 'student-pro';
export const PILOT_STORE_PRODUCT_ID = 'veritalent_student_pro_monthly';
export const REVENUECAT_ENTITLEMENT_STUDENT_PRO = 'student_pro';

export function isPilotIapPurchase(packageId: string, billingCycle: BillingCycle): boolean {
  return packageId === PILOT_IAP_PACKAGE_ID && billingCycle === 'monthly';
}

export interface SubscriptionPackage {
  id: string;
  audience: SubscriptionAudience;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  icon: 'leaf' | 'star' | 'rocket' | 'briefcase' | 'trending-up' | 'diamond';
}

export const STUDENT_PACKAGES: SubscriptionPackage[] = [
  {
    id: 'student-free',
    audience: 'student',
    name: 'Starter',
    tagline: 'Get discovered on VeriTalent',
    monthlyPrice: 0,
    annualPrice: 0,
    icon: 'leaf',
    features: [
      'Create up to 3 talent showcases',
      'Apply to open roles',
      'Basic messaging',
      'Public student profile',
    ],
  },
  {
    id: 'student-pro',
    audience: 'student',
    name: 'Pro',
    tagline: 'Stand out to recruiters',
    monthlyPrice: 9.99,
    annualPrice: 89.99,
    highlighted: true,
    badge: 'Most popular',
    icon: 'star',
    features: [
      'Unlimited talent showcases',
      'Verified student badge',
      'Priority application visibility',
      'Profile & engagement analytics',
      'Featured in talent discovery',
    ],
  },
  {
    id: 'student-elite',
    audience: 'student',
    name: 'Elite',
    tagline: 'Maximum visibility & support',
    monthlyPrice: 19.99,
    annualPrice: 179.99,
    icon: 'rocket',
    features: [
      'Everything in Pro',
      'Top placement in search',
      'Portfolio review credits',
      'Early access to premium roles',
      'Direct intro requests to businesses',
    ],
  },
];

export const BUSINESS_PACKAGES: SubscriptionPackage[] = [
  {
    id: 'business-free',
    audience: 'business',
    name: 'Starter',
    tagline: 'Post your first opportunity',
    monthlyPrice: 0,
    annualPrice: 0,
    icon: 'briefcase',
    features: [
      '1 active job listing',
      'Basic applicant inbox',
      'Company profile page',
      'Standard listing placement',
    ],
  },
  {
    id: 'business-growth',
    audience: 'business',
    name: 'Growth',
    tagline: 'Hire verified student talent',
    monthlyPrice: 49.99,
    annualPrice: 479.99,
    highlighted: true,
    badge: 'Best value',
    icon: 'trending-up',
    features: [
      'Unlimited job listings',
      'Applicant tracking & filters',
      'Messaging with candidates',
      'Hiring analytics dashboard',
      'Verified business badge',
    ],
  },
  {
    id: 'business-featured',
    audience: 'business',
    name: 'Featured',
    tagline: 'Maximum reach & priority hiring',
    monthlyPrice: 99,
    annualPrice: 949.99,
    icon: 'diamond',
    features: [
      'Everything in Growth',
      'Featured job placements',
      'Priority in student feeds',
      'Dedicated onboarding support',
      'Branded talent search spotlight',
    ],
  },
];

export function getPackagesForAudience(audience: SubscriptionAudience): SubscriptionPackage[] {
  return audience === 'student' ? STUDENT_PACKAGES : BUSINESS_PACKAGES;
}

export function getPackageById(packageId: string): SubscriptionPackage | undefined {
  return [...STUDENT_PACKAGES, ...BUSINESS_PACKAGES].find((pkg) => pkg.id === packageId);
}

export function getPackagePrice(pkg: SubscriptionPackage, cycle: BillingCycle): number {
  return cycle === 'annual' ? pkg.annualPrice : pkg.monthlyPrice;
}

export function getAnnualSavingsPercent(pkg: SubscriptionPackage): number {
  if (pkg.monthlyPrice <= 0) return 0;
  const annualFromMonthly = pkg.monthlyPrice * 12;
  if (annualFromMonthly <= pkg.annualPrice) return 0;
  return Math.round(((annualFromMonthly - pkg.annualPrice) / annualFromMonthly) * 100);
}

export function formatPrice(amount: number): string {
  if (amount === 0) return 'Free';
  return `$${amount.toFixed(amount % 1 === 0 ? 0 : 2)}`;
}
