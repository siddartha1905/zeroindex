# Delivery Roadmap

Status labels: `Planned`, `In Progress`, `In Review`, `Verified`, `Released`, `Blocked`. Set statuses from verified evidence only.

| Stage | Status as of October 19, 2026 | Required Deliverables | Release Gate |
|---|---|---|---|
| **Setup: Project Memory** | **Verified** | Install documentation system, AI rules, snapshot generator, GitHub workflow | All markdown records verified, build passing, zero app code regressions |
| **Phase 1A: Publication and Accuracy Fixes** | **Verified** | Overleaf links removed, centralized Google Drive config created, 6 unapproved pieces archived, Atlas/Bridge honest outlines, availability config created | 163 tests passing (100%), build passing (0 errors), unpublished content verified absent from bundle |
| **Phase 1B: Routing and Usability** | Planned | Deep links, history/back-forward navigation, semantic cards, keyboard/mobile/zoom accessibility | Direct-link URL testing, accessibility audit, DLD workspace smoke tests |
| **Phase 1C: Four Pillar Foundations** | Planned | Clean Atlas and Bridge architecture; publication-ready Readout and Folio templates | Zero placeholder dead ends; responsive design validation |
| **Phase 1D: First Approved Content** | Planned | Draft initial learning roadmap, placement guide, and first faculty articles | Explicit author review and written approval before publishing |
| **Phase 2: Workbench and Unit 1 Review** | Planned | Detailed topic-by-topic academic accuracy audit, syllabus verification against AR23 | Independent verification of all worked models and quiz bank questions |
| **Phase 3: DLD Unit 2** | Planned | Boolean Algebra and K-Map Minimization; interactive 4-variable K-Map solver | Syllabus approval, test suite expansion, 50+ question bank |
| **Phase 4: DLD Units 3 to 5** | Planned | Combinational Logic, Sequential Logic, Registers/Counters, and FSM | Step-by-step worked models and interactive visualizers for each unit |
| **Phase 5: Expansion** | Planned | C Programming, DSA, ML Foundations, career roadmaps | Verified academic data modules and laboratory code assets |

---

## General Safeguards

- No unapproved publishing, invented links, or invented completion percentages.
- Do not rename or break existing DLD routes (`#workbench`, `#dld`, `#workspace/:unitId/:sectionId`).
- Use small, reversible, reviewed commits; preview locally before production deployment.
- Keep this roadmap current after every phase milestone and record changes in `CHANGELOG.md`.
