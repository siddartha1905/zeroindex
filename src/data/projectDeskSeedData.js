/**
 * ZeroIndex Private Project Desk - Initial Reference Baseline and Fixtures
 * File: src/data/projectDeskSeedData.js
 * 
 * IMPORTANT DATA ISOLATION NOTICE:
 * Static frontend assets can be retrieved by any client without authentication.
 * Consequently, this file contains ONLY public, non-sensitive architectural decisions
 * (D-040, D-001, D-039, D-041, D-042, REQ-DESK-01, REQ-DESK-02) and generic demonstration
 * fixtures for local development previews.
 * 
 * Genuine confidential faculty teaching notes, student tutorial records, unpublished exam questions,
 * and private development notes MUST NEVER be committed to static JavaScript source files.
 * They are created strictly inside the authenticated Project Desk interface and persisted to private
 * Supabase tables (public.project_desk_items) guarded by Row Level Security (RLS) and AAL2 MFA.
 * 
 * Standard: Strictly zero em-dashes and zero en-dashes across all code and text.
 */

export const initialProjectDeskItems = [
  // 1. Current Three-Pillar Decision (Active)
  {
    id: 'desk-dec-040',
    item_type: 'decision',
    category: 'general',
    pillar: 'general',
    title: 'Three-Pillar Architectural Consolidation: The Workbench, The Atlas, The Journal',
    content: 'Consolidates ZeroIndex into three sustainable public pillars: The Workbench (curriculum, concept lessons, interactive solvers, practice arena), The Atlas (curriculum roadmaps and 7-domain placement preparation guide), and The Journal (technical systems dispatches and pedagogical essays). Simplifies student navigation and aligns with single-faculty maintenance capacity.',
    status: 'active',
    priority: 'high',
    decision_ref: 'D-040',
    tags: ['architecture', 'pillars', 'reorganization'],
    metadata: {
      approvedDate: '2026-10-27',
      approvedBy: 'Faculty Lead (J. Siddartha Varma)',
      supersedes: ['D-001', 'D-012']
    }
  },

  // 2. Former Five-Pillar Structure (Superseded)
  {
    id: 'desk-dec-001',
    item_type: 'decision',
    category: 'general',
    pillar: 'general',
    title: 'Five Permanent Architectural Pillars (Superseded by D-040)',
    content: 'Originally established five separate top-level pillars (The Workbench, The Atlas, The Bridge, The Readout, The Folio). Superseded by D-040 three-pillar consolidation. All former Bridge content is absorbed into The Atlas; Readout and Folio are unified into The Journal. Historical routes are preserved via hash aliasing.',
    status: 'superseded',
    priority: 'medium',
    decision_ref: 'D-001',
    tags: ['historical', 'pillars', 'superseded'],
    metadata: {
      originalDate: '2026-10-19',
      supersededDate: '2026-10-27',
      supersededBy: 'D-040'
    }
  },

  // 3. Faculty-First Academic Content Rule (Active)
  {
    id: 'desk-dec-039',
    item_type: 'decision',
    category: 'workbench',
    pillar: 'workbench',
    title: 'Permanent Faculty-First Academic Content Rule and Natural Integration Convention',
    content: 'Prioritizes faculty-supplied classroom notes, board explanations, and preferred mathematical expressions over generic textbook arrangements. In diminished radix complements, r^n - N - 1 is displayed as the primary formula with (r^n - 1) - N retained as the secondary textbook equivalent. Changes must be integrated naturally into existing definition and formula cards without introducing separate promotional badges or duplicate walkthrough panels.',
    status: 'active',
    priority: 'urgent',
    decision_ref: 'D-039',
    tags: ['pedagogy', 'faculty-first', 'accuracy', 'complements'],
    metadata: {
      approvedDate: '2026-10-22',
      codifiedRules: ['AGENTS.md Convention 7', '.agents/rules/faculty_first_academic_content.md']
    }
  },

  // 4. Simple Start -> Try -> Next Roadmap Design (Active)
  {
    id: 'desk-dec-041',
    item_type: 'decision',
    category: 'atlas',
    pillar: 'atlas',
    title: 'Simplified Three-Stage Roadmap Architecture: Start -> Try -> Next',
    content: 'Restructures curriculum and skills roadmaps within The Atlas from sprawling multi-tier matrices into an actionable three-phase progression: Start (essential prerequisites and core syntax), Try (hands-on mini-projects and terminal challenges), and Next (advanced systems topics, portfolio synthesis, and interview readiness). Prevents cognitive overload for undergraduate students.',
    status: 'active',
    priority: 'high',
    decision_ref: 'D-041',
    tags: ['atlas', 'roadmaps', 'ux', 'progression'],
    metadata: {
      approvedDate: '2026-10-27',
      implementationPillar: 'The Atlas'
    }
  },

  // 5. Flexible Content Development Schedule (Active)
  {
    id: 'desk-dec-042',
    item_type: 'decision',
    category: 'general',
    pillar: 'general',
    title: 'Sustainable Single-Faculty Content Development and Maintenance Schedule',
    content: 'Eliminates rigid calendar-driven release dates in favor of a quality-gated delivery cadence. New syllabus sections (such as DLD Unit 2 Sections 2.6 and 2.7, and future Units 3 to 5) are published only after classroom validation, comprehensive automated test suite verification, zero-dash compliance, and explicit faculty approval.',
    status: 'active',
    priority: 'medium',
    decision_ref: 'D-042',
    tags: ['governance', 'maintenance', 'faculty-first'],
    metadata: {
      approvedDate: '2026-10-27',
      scope: 'All Curriculum and Editorial Content'
    }
  },

  // 6. Existing Publishing and Security Requirements (Active)
  {
    id: 'desk-req-001',
    item_type: 'requirement',
    category: 'general',
    pillar: 'general',
    title: 'Single-Owner Publishing Controls, AAL2 MFA Authorization, and Fail-Closed RLS',
    content: 'Enforces strict two-tier access: public open access for learners (no passwords or accounts) and owner-only authorization for the faculty administrator. Content modifications require Authenticator TOTP Multi-Factor Authentication (AAL2). Anonymous database queries can access only published items where all ancestors are verified public.',
    status: 'active',
    priority: 'urgent',
    decision_ref: 'D-036',
    tags: ['security', 'auth', 'mfa', 'rls'],
    metadata: {
      approvedDate: '2026-10-21',
      implementationFiles: [
        'supabase/migrations/20261021000001_admin_content_system.sql',
        'supabase/migrations/20261021000002_fix_anon_content_policy.sql'
      ]
    }
  },

  // 7. Approved Future Project Desk Requirements (Active)
  {
    id: 'desk-req-002',
    item_type: 'requirement',
    category: 'general',
    pillar: 'general',
    title: 'Private Project Desk Operational Workspace Architecture',
    content: 'Specifies a lightweight, private workspace inside the Admin Dashboard containing an Idea Inbox, Now/Next/Later Development Plan, Decision Register, Teaching Notes Inbox, and a downloadable sanitized project snapshot. Rejects heavy dependencies, AI chatbots, analytics tracking, and automated local-storage duplication of sensitive text.',
    status: 'active',
    priority: 'high',
    decision_ref: 'REQ-DESK-01',
    tags: ['project-desk', 'admin', 'operational-tooling'],
    metadata: {
      approvedDate: '2026-10-27',
      phase: 'Phase 1 Secure Foundation'
    }
  },

  // 8. Teaching Notes Sample Demonstration Fixture (Active / Non-sensitive)
  {
    id: 'desk-idea-001',
    item_type: 'idea',
    category: 'teaching_note',
    pillar: 'workbench',
    title: '[SAMPLE FIXTURE] Classroom Observation: Diminished Radix Formula Student Retention',
    content: 'Non-sensitive demonstration fixture for local UI preview: Observed that students calculate complements with fewer arithmetic errors when using r^n - N - 1 directly. Real confidential faculty teaching notes and student records must only be entered via the authenticated Project Desk and stored in private Supabase tables protected by RLS.',
    status: 'approved',
    priority: 'medium',
    decision_ref: 'D-039',
    tags: ['sample-fixture', 'dld-unit1', 'complements'],
    metadata: {
      isSampleFixture: true,
      createdDate: '2026-10-22',
      courseCode: '1005261102',
      topic: 'Radix Complements'
    }
  },

  // 9. Initial Development Plan Tasks (Now / Next / Later)
  {
    id: 'desk-plan-001',
    item_type: 'plan',
    category: 'general',
    pillar: 'general',
    title: 'Project Desk Phase 1: Secure Database Migration and Services',
    content: 'Prepare the owner-only Supabase migration for project_desk_items and project_desk_meta with AAL2 write protection, implement projectDeskService.js, and verify with automated test script.',
    status: 'completed',
    priority: 'urgent',
    decision_ref: 'REQ-DESK-01',
    tags: ['sprint-done', 'phase-1'],
    metadata: { targetMilestone: 'Project Desk Phase 1', completedDate: '2026-10-27' }
  },
  {
    id: 'desk-plan-002',
    item_type: 'plan',
    category: 'general',
    pillar: 'general',
    title: 'Project Desk Phase 2: Compact Admin Dashboard UI and Workspace Switcher',
    content: 'Build the Project Desk tabs inside AdminDashboard.jsx: Idea Inbox, Development Desk (Now/Next/Later), Project Memory, and Continue Where I Left Off status bar.',
    status: 'completed',
    priority: 'urgent',
    decision_ref: 'REQ-DESK-01',
    tags: ['sprint-done', 'phase-2'],
    metadata: { targetMilestone: 'Project Desk Phase 2', completedDate: '2026-10-27' }
  },
  {
    id: 'desk-plan-002b',
    item_type: 'plan',
    category: 'general',
    pillar: 'general',
    title: 'Project Desk Phase 2.5: Security Hardening and Supabase Migration Readiness',
    content: 'Conduct data isolation audit, verify RLS policies and AAL2 MFA write rules, eliminate silent in-memory fallback on database errors, sanitize export fields with explicit disclaimer, and prepare beginner-friendly migration application instructions.',
    status: 'completed',
    priority: 'urgent',
    decision_ref: 'REQ-DESK-01',
    tags: ['sprint-done', 'phase-2.5', 'security'],
    metadata: { targetMilestone: 'Project Desk Phase 2.5', completedDate: '2026-10-27' }
  },
  {
    id: 'desk-plan-002c',
    item_type: 'plan',
    category: 'general',
    pillar: 'general',
    title: 'Project Desk Phase 2.6: Post-Migration Live Verification',
    content: 'Verify live Supabase database tables (project_desk_items and project_desk_meta), test RLS policies, execute live CRUD persistence verification, and preserve genuine records.',
    status: 'completed',
    priority: 'urgent',
    decision_ref: 'REQ-DESK-01',
    tags: ['sprint-done', 'phase-2.6', 'verification'],
    metadata: { targetMilestone: 'Project Desk Phase 2.6', completedDate: '2026-10-27' }
  },
  {
    id: 'desk-plan-003',
    item_type: 'plan',
    category: 'workbench',
    pillar: 'workbench',
    title: "DLD Unit 2 Sections 2.6 and 2.7 Completion (Don't Cares and Multi-Level Synthesis)",
    content: 'Complete pedagogical derivations, worked models, solvers, and practice questions for Sections 2.6 and 2.7 on branch dld-unit2-development.',
    status: 'next',
    priority: 'high',
    decision_ref: 'D-035',
    tags: ['curriculum', 'dld-unit2'],
    metadata: { targetMilestone: 'DLD Unit 2 Full Release' }
  },
  {
    id: 'desk-plan-004',
    item_type: 'plan',
    category: 'workbench',
    pillar: 'workbench',
    title: 'DLD Units 3 to 5: Combinational Logic, Sequential Logic, and Memory Systems',
    content: 'Author comprehensive WHY-FIRST modules for Units 3, 4, and 5 in accordance with the AR23 autonomous curriculum blueprint.',
    status: 'later',
    priority: 'medium',
    decision_ref: 'D-035',
    tags: ['curriculum', 'dld-future'],
    metadata: { targetMilestone: 'DLD Units 3-5' }
  },
  {
    id: 'desk-plan-005',
    item_type: 'plan',
    category: 'general',
    pillar: 'general',
    title: 'Project Desk Phase 3: Public Three-Pillar Website Consolidation',
    content: 'Unify public navigation from five pillars to three (The Workbench, The Atlas, The Journal) while preserving historical route aliases for students.',
    status: 'later',
    priority: 'high',
    decision_ref: 'D-040',
    tags: ['three-pillars', 'consolidation', 'phase-3'],
    metadata: { targetMilestone: 'Phase 3 Consolidation' }
  }
];

export const initialProjectDeskMeta = {
  continue_where_left_off: {
    note: 'Faculty owner executed migration 20261028000001_project_desk_foundation.sql in Supabase. Completed live database readiness check, RLS security verification, and cloud persistence testing.',
    lastEdited: '2026-10-27T23:00:00.000Z',
    activeMilestone: 'Project Desk Phase 2.6: Post-Migration Live Verification',
    nextAction: 'Review live verification results before proceeding to Phase 3 (Public Three-Pillar Website Consolidation).'
  }
};
