# ZeroIndex Content Confidentiality and Bundling Security Audit

Date: October 2026  
Status: Active Reference  
Standard: Strictly zero em-dashes and zero en-dashes across all lines.

---

## Executive Summary

This audit assesses the technical boundary between client-side bundle exposure and server-enforced content confidentiality in ZeroIndex. It clarifies where content resides, what threats client-side hiding does and does not mitigate, and establishes a secure pathway for genuine confidentiality.

---

## Content Classification Matrix

ZeroIndex content is partitioned into three distinct security tiers:

| Tier | Description | Current Location | Public Exposure Risk | Confidentiality Mechanism |
| :--- | :--- | :--- | :--- | :--- |
| **Tier 1: Intentionally Public Learning Material** | Digital Logic Design Unit I (1.1 to 1.7) and Unit II (2.1 to 2.5), 10 visual solvers, 250 quiz questions, and 3 foundational Atlas pathways. | `src/data/dldUnit1Master.js`, `src/data/dldUnit2Master.js`, Vite production bundle (`dist/assets/*.js`). | Fully accessible by design. Included in compiled frontend JavaScript. | Admin visibility toggle removes navigation entries and user interface links. **Technical Limitation**: Strings remain in downloadable JS bundle if already compiled. |
| **Tier 2: Unpublished Faculty Drafts and Archives** | Readout monographs (Relays to Tensors, Zero-Based Indexing, Attention Geometry), Folio personal essays, and Atlas Phase A2 English Communication curriculum. | `unpublished-archive/*.json`, separate git branch `atlas-phase-a2-development`. | **Zero Public Exposure**. Kept completely off main branch and completely excluded from Vite production builds. | Physical file isolation and branch separation. Admin preview is served via authenticated storage or offline developer inspection. |
| **Tier 3: Administrative Control and Metadata** | Content registry, visibility overrides, admin audit trail, and user authorization credentials. | Supabase PostgreSQL (`content_registry`, `admin_users`, `admin_audit_logs`). | Protected by PostgreSQL Row Level Security (RLS). Public visitors cannot access admin rows or write permissions. | Cryptographic JWT session validation, Row Level Security, and TOTP Multi-Factor Authentication. |

---

## The Frontend Hiding Limitation

### The Technical Reality
When an application relies on client-side state (such as `if (!item.isPublic) return null;`) to hide content that is statically imported via ES modules (`import { dldUnit1 } from './dldUnit1'`), the underlying text, data structures, and assets are still bundled by Vite/Rollup into the production JavaScript asset (`dist/assets/index-*.js`).

Any visitor with browser Developer Tools or a command-line tool (`curl`) can search and inspect string literals in the downloaded bundle, regardless of whether a button or route is visible on screen.

### ZeroIndex Principle
ZeroIndex will never pretend that hiding a navigation link or tab provides true cryptographic confidentiality for content that is statically bundled in client code.

---

## Current Architecture and Safeguards

1. **Approved Public Material (DLD Units 1 and 2)**:
   * This material is intentionally open-access educational content published for students of Vignan Institute of Information Technology and the wider community.
   * Administrative visibility controls allow the faculty owner to take a subject, unit, or solver offline from public navigation if curriculum changes occur, without requiring code edits or redeploying Vercel.

2. **Unapproved Drafts and Future Proprietary Content**:
   * All unapproved drafts (e.g., unpublished Readout articles and Folio essays) are stored in `unpublished-archive/` and in Supabase `unpublished_drafts`, never imported into public client routes.
   * Atlas Phase A2 English Communication development is preserved exclusively on its local git branch `atlas-phase-a2-development`, preventing exposure on the public GitHub repository and preventing inclusion in the Vercel production bundle.
   * When the administrator previews an unpublished draft inside the Admin Panel, the content is fetched through an authenticated request (`fetchUnpublishedDraft`) that verifies owner credentials, rather than exposing the draft to public visitors.

---

## Migration Roadmap for Future Confidential Courses

If future subjects, private exam banks, or licensed courseware require strict intellectual property protection or paywalled access, the following architecture must be followed:

1. **Decouple Data from Frontend Bundles**:
   Do not import course text into React `.jsx` or `.js` modules.
2. **Encrypted or Private Object Storage**:
   Store course JSON or Markdown payloads in private Supabase Storage buckets or PostgreSQL `content_payloads` tables with strict Row Level Security:
   ```sql
   CREATE POLICY "Only enrolled or admin can read lesson"
     ON public.course_lessons
     FOR SELECT
     TO authenticated
     USING (public.is_admin() OR is_enrolled(auth.uid(), course_id));
   ```
3. **Dynamic Decryption and Fetch**:
   The client fetches lesson payloads dynamically via authenticated API calls upon route navigation, decrypting and rendering content on the fly.
4. **Preservation of Existing Workbench**:
   Per faculty instructions, existing published DLD Units 1 and 2 do not require large-scale automatic migration at this time, as they are intentionally open public educational resources.
