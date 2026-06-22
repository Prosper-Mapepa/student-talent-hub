# Safety Features Implementation Guide

This document explains how the Apple App Store safety features work in CMU TalentHub.

## Overview

The safety features ensure compliance with Apple App Store **Guideline 1.2 - Safety - User-Generated Content**. The system implements:

1. **EULA/Terms of Service** - Explicit acceptance required
2. **Content Filtering** - Automatic detection and blocking of objectionable content
3. **Reporting System** - Users can flag objectionable content
4. **User Blocking** - Users can block abusive users with instant feed removal
5. **Admin Moderation** - 24-hour review process for reports

---

## 1. EULA/Terms of Service (EULA)

### How It Works:

**Backend:**
- EULA versions are stored in the `eula_versions` table
- Only one EULA version is active at a time
- User acceptances are tracked in `user_eula_acceptances` table

**Flow:**
1. User registers → Must accept EULA checkbox
2. Clicking checkbox → Opens EULA screen with full terms
3. User reads terms → Can accept or decline
4. On acceptance → Backend records acceptance with version number
5. User can now complete registration

**Key Points:**
- ✅ Zero tolerance policy clearly stated in EULA
- ✅ Acceptance is tracked per user per version
- ✅ If EULA is updated, users must accept new version
- ✅ Registration cannot proceed without acceptance

**API Endpoints:**
- `GET /moderation/eula` - Get current EULA
- `POST /moderation/eula/accept` - Accept EULA
- `GET /moderation/eula/check` - Check if user accepted current EULA

---

## 2. Content Filtering

### How It Works:

**Content Filter Service** (`ContentFilterService`) automatically scans content for:
- Profanity and offensive words
- Suspicious patterns (spam, excessive repetition)
- Potentially inappropriate content

**Message Filtering Flow:**
1. User sends a message
2. Backend receives message → `ConversationsService.sendMessage()`
3. Content is checked → `ContentFilterService.containsObjectionableContent()`
4. If objectionable → Message is **rejected** with error
5. If clean → Message is **sanitized** (removes excessive whitespace) and saved

**Blocked Words Detection:**
- Checks against a list of profanity/offensive words
- Handles variations (e.g., f*ck, sh*t)
- Detects suspicious patterns (excessive repetition, spam indicators)

**Example:**
```
User tries to send: "This is a test message with inappropriate language"
→ Filter detects profanity
→ Message rejected: "Message contains inappropriate content and cannot be sent."
```

**Where Applied:**
- ✅ All messages (before sending)
- ✅ Profile content (bio, about sections)
- ✅ Project descriptions
- ✅ Achievement descriptions

---

## 3. Reporting System

### How It Works:

**Users can report:**
- Messages
- Profiles
- Projects
- Achievements
- Jobs
- Other users

**Report Flow:**
1. User sees objectionable content → Clicks "Report" button
2. Report modal opens → Selects reason (inappropriate content, harassment, spam, etc.)
3. Optionally adds description
4. Report submitted → Backend creates `ContentReport` record
5. Report marked as **PENDING**
6. **Admin receives email notification** (if email service configured)
7. Admin reviews within 24 hours

**Report Reasons:**
- `INAPPROPRIATE_CONTENT` - Content violates community standards
- `HARASSMENT` - Harassing or bullying behavior
- `SPAM` - Spam or fraudulent content
- `FAKE_PROFILE` - Fake or misleading profile
- `INAPPROPRIATE_BEHAVIOR` - Inappropriate behavior
- `OTHER` - Other reasons

**Admin Actions:**
- **Resolve** - Take action (remove content, suspend user, etc.)
- **Dismiss** - Report is invalid

**API Endpoints:**
- `POST /moderation/report` - Submit a report
- `GET /moderation/admin/reports` - Get all reports (admin)
- `GET /moderation/admin/reports/pending` - Get pending reports (admin)
- `PATCH /moderation/admin/reports/:id/resolve` - Resolve report (admin)
- `PATCH /moderation/admin/reports/:id/dismiss` - Dismiss report (admin)

---

## 4. User Blocking

### How It Works:

**Blocking Flow:**
1. User views another user's profile → Clicks "..." menu → Selects "Block"
2. Confirmation dialog → "Are you sure you want to block this user?"
3. User confirms → Backend creates `BlockedUser` record
4. **Instant Actions:**
   - Blocked user's content **immediately removed** from blocker's feed
   - Blocked user **cannot send messages** to blocker
   - Blocker **cannot see** blocked user's profile
   - Blocked user **cannot see** blocker's profile
5. **Developer notified** via email (if email service configured)

**What Happens When Blocked:**
- ✅ Conversations with blocked user are hidden
- ✅ Messages from blocked user are rejected
- ✅ User profiles don't show blocked users
- ✅ Blocked users are filtered from all feeds

**Technical Implementation:**
- Before sending message → Check if user is blocked
- Loading conversations → Filter out blocked users
- Loading profiles → Check if user is blocked

**API Endpoints:**
- `POST /moderation/block` - Block a user
- `DELETE /moderation/block/:userId` - Unblock a user
- `GET /moderation/blocked` - Get list of blocked users

**Example:**
```javascript
// User A blocks User B
POST /moderation/block { userId: "user-b-id" }

// User B tries to send message to User A
POST /conversations/{id}/messages
→ Error: "You cannot send messages to this user. They have blocked you."

// User A loads conversations
GET /conversations?userId=user-a-id
→ Conversations with User B are filtered out
```

---

## 5. Admin Moderation

### How It Works:

**Moderation Dashboard:**
- Admins can view all reports
- Filter by status (PENDING, RESOLVED, DISMISSED)
- View reports by specific user
- See moderation statistics

**24-Hour Review Process:**
1. Report created → Status: **PENDING**
2. Admin receives email notification
3. Admin logs into dashboard
4. Admin reviews report within 24 hours
5. Admin takes action:
   - **Resolve** with action taken (e.g., "Content removed", "User suspended")
   - **Dismiss** if report is invalid

**Actions on Resolution:**
- If action involves user suspension → User status changed to `SUSPENDED`
- Content can be removed
- User can be ejected from platform

**Statistics:**
- Pending reports count
- Resolved reports count
- Dismissed reports count
- Total blocks
- Users blocked

---

## Complete User Flow Examples

### Flow 1: User Registration with EULA

```
1. User opens app → Clicks "Register"
2. Fills registration form
3. Clicks "I agree to Terms" checkbox
   → EULA screen opens
4. User reads full EULA text
5. User clicks "Accept & Continue"
   → POST /moderation/eula/accept { version: 1, accepted: true }
   → Backend records acceptance
6. Checkbox is checked ✅
7. User can now submit registration
```

### Flow 2: Reporting Objectionable Content

```
1. User views profile with inappropriate content
2. Clicks "..." menu → "Report"
3. Report modal opens
4. User selects reason: "Inappropriate Content"
5. Adds description: "This profile contains offensive content"
6. Clicks "Submit Report"
   → POST /moderation/report
   → Backend creates report (status: PENDING)
   → Admin receives email notification
7. Report submitted successfully ✅
8. Admin reviews within 24 hours
```

### Flow 3: Blocking a User

```
1. User views another user's profile
2. Clicks "..." menu → "Block"
3. Confirmation dialog appears
4. User confirms block
   → POST /moderation/block { userId: "..." }
   → Backend creates BlockedUser record
   → Developer receives email notification
5. Blocked user immediately removed from:
   - Feed
   - Conversations list
   - Search results
6. Blocked user cannot send messages
```

### Flow 4: Sending a Filtered Message

```
1. User types message: "Hello, this is inappropriate content"
2. User clicks "Send"
   → POST /conversations/{id}/messages { content: "..." }
   → Backend checks: ContentFilterService.containsObjectionableContent()
3. Filter detects objectionable content
   → Error: "Message contains inappropriate content and cannot be sent."
4. Message is NOT sent ✅
5. User must revise message
```

---

## Database Schema

### Tables Created:

1. **`eula_versions`** - Stores EULA versions
   - `version` (integer, unique)
   - `content` (text) - Full EULA text
   - `active` (boolean) - Only one active version

2. **`user_eula_acceptances`** - Tracks user acceptances
   - `user_id` - User who accepted
   - `eula_version_id` - Version accepted
   - `accepted_at` - Timestamp
   - Unique constraint: (user_id, eula_version_id)

3. **`content_reports`** - Stores all reports
   - `reporter_id` - User who reported
   - `reported_user_id` - User being reported (optional)
   - `type` - Type of content (MESSAGE, PROFILE, etc.)
   - `content_id` - ID of specific content
   - `reason` - Reason for report
   - `status` - PENDING, RESOLVED, DISMISSED
   - `reviewed_by` - Admin who reviewed
   - `action_taken` - What action was taken

4. **`blocked_users`** - Tracks blocked relationships
   - `blocker_id` - User who blocked
   - `blocked_user_id` - User who is blocked
   - `developer_notified` - Whether admin was notified
   - Unique constraint: (blocker_id, blocked_user_id)

---

## API Integration (Mobile App)

### EULA Acceptance:
```typescript
// Get current EULA
const eula = await apiService.getCurrentEula();

// Accept EULA
await apiService.acceptEula(eula.version);
```

### Reporting:
```typescript
// Report a user
await apiService.reportContent({
  type: 'USER',
  reportedUserId: userId,
  reason: 'INAPPROPRIATE_CONTENT',
  description: 'User sent inappropriate messages'
});
```

### Blocking:
```typescript
// Block a user
await apiService.blockUser(userId);

// Unblock a user
await apiService.unblockUser(userId);

// Get blocked users
const blocked = await apiService.getBlockedUsers();
```

---

## Compliance Checklist

✅ **Requirement 1: EULA with Zero Tolerance Policy**
- EULA clearly states zero tolerance for objectionable content
- Users must explicitly accept during registration
- Acceptance is tracked in database

✅ **Requirement 2: Content Filtering**
- Automatic filtering of objectionable content
- Messages with profanity are rejected
- Suspicious patterns detected

✅ **Requirement 3: Reporting Mechanism**
- Users can report any content or user
- Multiple report reasons available
- Reports stored for admin review

✅ **Requirement 4: Blocking Mechanism**
- Users can block abusive users
- Instant feed removal
- Developer notification on block
- Blocked users cannot contact blocker

✅ **Requirement 5: 24-Hour Review**
- Reports marked as PENDING
- Admin dashboard for review
- Actions tracked (content removal, user suspension)
- Admin can resolve or dismiss reports

---

## Next Steps

1. **Run Migration:**
   ```bash
   cd backend
   npm run migration:run
   ```

2. **Configure Email Service** (optional but recommended):
   - Set up SendGrid API key in `.env`
   - Admins will receive email notifications for reports and blocks

3. **Test Features:**
   - Register a new account (test EULA)
   - Send a message (test filtering)
   - Report a user (test reporting)
   - Block a user (test blocking)
   - Admin login (test moderation dashboard)

4. **Deploy:**
   - Deploy backend with new migration
   - Deploy mobile app with new UI features
   - Test in production environment

---

## Questions?

If you need clarification on any part of the implementation, check:
- Backend code: `backend/src/moderation/`
- Mobile app code: `mobile/src/components/ReportBlockModal.tsx`
- API endpoints: Swagger UI at `/api/docs` (when backend is running)
