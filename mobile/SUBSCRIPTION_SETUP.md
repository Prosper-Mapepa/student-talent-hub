# VeriTalent — Subscription Pilot (Student Pro Monthly)

This pilot wires **one** in-app subscription through RevenueCat:

| Item | Value |
|------|--------|
| Plan | Student Pro |
| Billing | Monthly |
| App package ID | `student-pro` |
| Store product ID | `veritalent_student_pro_monthly` |
| RevenueCat entitlement | `student_pro` |

Free users are limited to **3 talent showcases**. Pro unlocks unlimited showcases (enforced in the app; add the same check on your Railway API).

---

## 1. RevenueCat

1. Create a project at [revenuecat.com](https://www.revenuecat.com)
2. Add **iOS** app: bundle ID `com.prospermap.StudentTalentHubMobile`
3. Add **Android** app: package `com.prospermap.StudentTalentHubMobile`
4. Connect App Store Connect + Google Play service credentials
5. Create entitlement: **`student_pro`**
6. Create offering **`default`** with one package pointing to `veritalent_student_pro_monthly`
7. Copy **public** API keys into `.env` (see `.env.example`)

---

## 2. App Store Connect

1. Open your live app → **Subscriptions**
2. Create subscription group: `VeriTalent Plus`
3. Add auto-renewable subscription:
   - **Product ID:** `veritalent_student_pro_monthly`
   - **Price:** $9.99 / month (or your tier)
4. Add localization + review screenshot if required
5. Link the product in RevenueCat

**Sandbox test:** Settings → App Store → Sandbox Account on your iPhone.

---

## 3. Google Play Console

1. **Monetize → Subscriptions → Create subscription**
2. Product ID: `veritalent_student_pro_monthly`
3. Base plan: monthly, price $9.99
4. Activate the subscription
5. Add license testers under **Setup → License testing**
6. Link in RevenueCat

---

## 4. Environment variables

Local `.env` in `mobile/`:

```bash
REVENUECAT_APPLE_API_KEY=appl_...
REVENUECAT_GOOGLE_API_KEY=goog_...
```

For EAS production builds:

```bash
eas secret:create --name REVENUECAT_APPLE_API_KEY --value appl_...
eas secret:create --name REVENUECAT_GOOGLE_API_KEY --value goog_...
```

Then add to `eas.json` production profile `env` if not using automatic secret injection.

---

## 5. New native build required

`react-native-purchases` is **not** in Expo Go. You must ship a new store build:

```bash
npm run build:prod:ios
npm run build:prod:android
```

Version bumped to **1.0.8** for this release.

---

## 6. Test flow

1. Install build from TestFlight / Play internal track
2. Log in as a student
3. Profile → **Upgrade** → select **Student Pro** + **Monthly**
4. Tap **Subscribe in app** → complete sandbox purchase
5. Confirm **Student Pro is active** banner
6. Try adding a 4th talent (should work on Pro; blocked on free)

Use **Restore purchases** if you reinstall the app.

---

## 7. Backend (Railway) — next step

The app calls these endpoints (best-effort; failures are ignored for now):

- `POST /subscriptions/sync` — client reports active tier after purchase
- `GET /subscriptions/me` — optional server-side tier

**Production:** add a RevenueCat webhook on your API:

```
POST /webhooks/revenuecat
```

Verify the webhook auth header, then set `user.subscriptionTier = 'student_pro'` when entitlement `student_pro` is active.

Enforce talent limits in `POST /students/:id/talents` so free users cannot bypass the app.

---

## 8. App Review notes

When submitting 1.0.8:

- Subscriptions unlock: unlimited talents, verified badge, priority visibility
- Test account credentials for reviewers
- Restore purchases is on the checkout screen
- Link to privacy policy mentioning subscriptions
