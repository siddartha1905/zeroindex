# ZeroIndex Supabase Administration Setup Guide

This guide describes how to configure the minimal Supabase backend for the ZeroIndex administration and publishing system.

There are only two access types:
1. Public: All students and visitors. No account or login required.
2. Admin: One authenticated faculty owner who can access the complete content inventory and publishing controls.

---

## 1. Create a Supabase Project

1. Sign in to your account at [supabase.com](https://supabase.com/).
2. Click **New Project**.
3. Choose a name (e.g., `zeroindex-production`) and select your closest region.
4. Set a strong database password and click **Create new project**.

---

## 2. Configure Local and Deployment Environment Variables

In your project root, create a file named `.env.local` (do not commit this to public Git):

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

For production deployment on Vercel:
1. Open your Vercel Dashboard for `zeroindex`.
2. Go to **Settings -> Environment Variables**.
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

---

## 3. Run the Database Migration

1. In your Supabase Dashboard, open the **SQL Editor** from the left navigation.
2. Open the file `supabase/migrations/20261021000001_admin_content_system.sql`.
3. Copy its entire content, paste it into the Supabase SQL Editor, and click **Run**.
4. This creates:
   * `public.admin_users` table with Row Level Security.
   * `public.is_admin()` security definer function.
   * `public.content_registry` table with granular public read and admin write policies.
   * `public.admin_audit_logs` table for publishing history.
   * `public.unpublished_drafts` table for secure admin previews.
   * Initial seed data for all 5 pillars (The Workbench, The Atlas, The Bridge, The Readout, The Folio).

---

## 4. Disable Public Signups (Mandatory Security Step)

To prevent unauthorized public visitors from creating accounts:
1. In your Supabase Dashboard, navigate to **Authentication -> Providers -> Email**.
2. Toggle **Enable Signups** to **OFF**.
3. Save changes.

Now, only users explicitly created by the project administrator can exist in Supabase Auth.

---

## 5. Provision the Owner Administrator Account

1. Navigate to **Authentication -> Users** in your Supabase Dashboard.
2. Click **Add User -> Create User**.
3. Enter the faculty owner email:
   * Email: `jampana13411@gmail.com`
   * Set a strong temporary password.
   * Select **Auto Confirm User** so no confirmation email is required.
4. Click **Create User**.
5. Copy the generated User **UUID** (e.g., `a1b2c3d4-e5f6-7890-abcd-ef1234567890`).
6. Return to the **SQL Editor** and run the following single SQL command to authorize the owner:

```sql
INSERT INTO public.admin_users (id, email, role)
VALUES ('PASTE_USER_UUID_HERE', 'jampana13411@gmail.com', 'owner')
ON CONFLICT (id) DO UPDATE SET role = 'owner';
```

---

## 6. Access the Admin Panel and Enable Multi-Factor Authentication (MFA)

1. Launch ZeroIndex locally (`npm run dev`) or visit your deployed site.
2. Navigate to the admin login route:
   `http://localhost:3000/#admin/login`
3. Enter the owner email (`jampana13411@gmail.com`) and password.
4. Once authenticated, click the **MFA Setup** button in the top right corner of the Admin Dashboard.
5. Scan the provided QR code using Google Authenticator, Authy, or 1Password.
6. Enter the 6-digit verification code to complete enrollment.
7. From this point forward, logging in and performing publishing writes requires verified Authenticator Assurance Level 2 (AAL2).

---

## 7. Security and Publication Rules Reference

* **Default Rule**: Anything marked `Planned`, `Draft`, or `In Review` is strictly hidden from the public.
* **Approval Safeguard**: Only items with status `published` can be toggled visible.
* **Hierarchical Inheritance**: Hiding a parent pillar or unit automatically hides all child sections, roadmaps, and tools from public visitors.
* **Independent Authorization**: Backend PostgreSQL Row Level Security enforces that public anonymous visitors cannot read draft items or modify permissions, even if frontend requests are tampered with.
