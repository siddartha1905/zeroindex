# Delivery Roadmap

Status labels: `Planned`, `In Progress`, `In Review`, `Verified`, `Released`, `Blocked`. Set statuses from verified evidence only.

| Stage | Status as of October 28, 2026 | Required Deliverables | Release Gate |
|---|---|---|---|
| **Setup: Project Memory** | **Verified** | Install documentation system, AI rules, snapshot generator, GitHub workflow | All markdown records verified, build passing, zero app code regressions |
| **Phase 1A: Publication and Accuracy Fixes** | **Verified** | Overleaf links removed, centralized Google Drive config created, 6 unapproved pieces archived, Atlas/Bridge honest outlines, availability config created | 163 tests passing (100%), build passing (0 errors), unpublished content verified absent from bundle |
| **Foundation Development Sprint (1B, 1C, 1D)** | **Released** | Robust dual-listener hash routing, browser zoom accessibility fix, Atlas 6-stage Programming Foundations Roadmap, Bridge 7-domain Campus Placement Guide with interactive checklists, Readout article publishing registry and detail template, Folio essay publishing registry and detail template, modal Escape handlers | 163 tests passing, production build passing (0 errors), 0 em/en dashes, zero unapproved articles bundled |
| **Phase 2: Workbench and Unit 1 Review** | Planned | Detailed topic-by-topic academic accuracy audit, syllabus verification against AR23 | Independent verification of all worked models and quiz bank questions |
| **DLD Unit 2 Master Implementation (Sections 2.1 to 2.5)** | **Released** | 7 complete syllabus sections (2.1 to 2.7); Sections 2.1 to 2.5 rebuilt into verified WHY-FIRST academic modules; Phase 1 Interactive Solvers suite refined and verified (157/157 checks); Phase 2 Practice Arena complete and verified with 125 unique questions across 6 tracks and multi-modal grading (2,715 checks passing); Phase 3 Subject Resources reference center and Connected Learning Loop complete and verified across Unit I and Unit II (238/238 checks passing); Sections 2.6 and 2.7 planned | Faculty approved for production release; merged to main and deployed |
| **Project Desk Suite (Phases 1, 2, 2.5, 2.6 & Persistence Fix)** | **Released** | Schema migration with owner-only RLS and AAL2 writes, ProjectDeskView with Idea Inbox, Development Desk (NOW/NEXT/LATER), Project Memory, Continue Where I Left Off; Supabase cloud persistence verified live; Idea Inbox schema normalization fix | 141 regression tests passing, clean build, verified cloud persistence |
| **Three-Pillar Public Consolidation (Phases 3 & 3.1)** | **Released** | Consolidate 5 public pillars to 3 (The Workbench, The Atlas, The Journal); unified Atlas (Learning Paths + 7 Career Prep domains); unified Journal (Technical Insights + Personal Reflections); backward-compatible hash aliases (#bridge, #readout, #folio); 3-branch Knowledge Tree; fail-closed route visibility guards | 41/41 redesign tests passing, zero broken bookmarks, clean build |
| **English Communication Learning Path (Phase 5A Public Launch)** | **Released** | Complete 4-activity communication path (Speak Clearly, Listen & Respond, Express Your Opinion, Everyday Conversations) on START -> TRY -> NEXT framework with horizontal LearningNudge row layout, natural British English, public discovery on The Atlas Learning Paths, and direct anonymous accessibility for all four activities | Faculty owner approved Phase 5A release; 268/268 verification checks passed; production build passed (0 errors); deployed live to Vercel on main |
| **DLD Unit 2 Completion (Sections 2.6 and 2.7)** | **Planned** | NAND/NOR Implementations and other two-level implementations; exclusive-OR functions, parity generation and checking | Academic data modules, practice arena questions, and interactive solvers |
| **Phase 4: DLD Units 3 to 5** | Planned | Combinational Logic, Sequential Logic, Registers/Counters, and FSM | Step-by-step worked models and interactive visualizers for each unit |
| **Phase 5: Expansion** | Planned | C Programming, DSA, ML Foundations, career roadmaps | Verified academic data modules and laboratory code assets |

---

## General Safeguards

- No unapproved publishing, invented links, or invented completion percentages.
- Do not rename or break existing DLD routes (`#workbench`, `#dld`, `#workspace/:unitId/:sectionId`).
- Use small, reversible, reviewed commits; preview locally before production deployment.
- Keep this roadmap current after every phase milestone and record changes in `CHANGELOG.md`.
