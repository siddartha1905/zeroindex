# Decision Register

Record important architectural, design, and academic decisions with their date, rationale, and consequences. Retain historical decisions to preserve institutional context.

---

## D-001 | 2026-10-19 | Five Permanent Architectural Pillars

- **Decision**: The Workbench, The Atlas, The Bridge, The Readout, and The Folio are distinct, permanent top-level destinations.
- **Rationale**: Academic curriculum courses, visual skill roadmaps, placement preparation, faculty monographs, and intellectual essays serve different student needs and modes of study.
- **Consequences**: Preserve these five pillar labels, URLs, and navigation targets across all future refactors.

---

## D-002 | 2026-10-19 | Distinct Hero Illustrations for Home and Academics

- **Decision**: Mount the Knowledge Tree illustration on the Level 0 Flagship homepage and From Zero to Possibility on the Workbench / Academics landing.
- **Rationale**: The Flagship homepage introduces the overarching computing stack; the Workbench focuses on foundational silicon logic.
- **Consequences**: Prevent subject-specific DLD inventories from overwhelming the main ecosystem portal.

---

## D-003 | 2026-10-19 | Academic Resource Distribution Integrity

- **Decision**: Eliminate all Overleaf destinations. Show non-clickable informational placeholders until authentic, verified Google Drive links are provided by the faculty lead.
- **Rationale**: Dead or broken external links compromise student trust and violate academic standards.
- **Consequences**: Resource link updates must be centralized and verified before being rendered as active anchors.

---

## D-004 | 2026-10-19 | Faculty Publication Approval Gate

- **Decision**: The six prewritten sample pieces in Readout and Folio are unapproved drafts and must be unpublished in Phase 1A.
- **Rationale**: Unreviewed articles must not be publicly attributed to the faculty lead or institutional department.
- **Consequences**: Readout and Folio will maintain clean, publication-ready landing templates until authentic articles are reviewed and approved.

---

## D-005 | 2026-10-19 | Incremental Phased Development Sequence

- **Decision**: Execute development in small, verified sequential phases: Phase 1A (Content & Availability Fixes) -> Phase 1B (Routing & Accessibility) -> Phase 1C (Four-Pillar Foundations) -> Phase 1D (First Approved Content) -> Phase 2+ (Workbench review & Unit 2 development).
- **Rationale**: Protects working DLD Unit 1 code from regressions caused by sweeping parallel rewrites.
- **Consequences**: Every phase has explicit release gates and verification checkpoints.

---

## D-006 | 2026-10-19 | Durable Version-Controlled Project Memory

- **Decision**: Maintain a version-controlled `project-memory/` directory alongside `AGENTS.md` and Antigravity workspace rules in `.agents/rules/`.
- **Rationale**: Ensures technical knowledge, design decisions, and status records persist across AI development sessions and multi-year maintenance intervals.
- **Consequences**: All substantive development tasks must update Project Memory records before requesting commit/push permission.

---

## D-007 | 2026-10-19 | Centralized Academic Availability and Study Resource Configuration

- **Decision**: Centralize all DLD study resource links in `src/data/dldResourceConfig.js` and curriculum availability status in `src/data/dldAvailabilityConfig.js`. Standardize non-clickable Google Drive placeholders with message "Material link will be added soon."
- **Rationale**: Avoids duplicating resource URLs and status strings across disparate components (`SyllabusView`, `ZeroIndexSideWings`, `DldWorkspace`, `DldSubjectHome`). Allows instantaneous activation of Drive folders when verified URLs are supplied, without modifying presentation markup.
- **Consequences**: External Drive links must be registered only in `dldResourceConfig.js`. Unit availability flags must only be maintained in `dldAvailabilityConfig.js`.

---

## D-008 | 2026-10-19 | Safe Archival of Unapproved Content Outside Distribution

- **Decision**: Extract unapproved sample articles and essays into offline archives (`unpublished-archive/readout-articles-archive.json` and `unpublished-archive/folio-essays-archive.json`) and exclude the directory from Git via `.gitignore`. Render tasteful empty states in The Readout and The Folio.
- **Rationale**: Guarantees that unreviewed and unapproved materials are never compiled into the client production bundle or published to a public repository, while safely preserving the original author draft text for future review.
- **Consequences**: Production builds will not contain unapproved texts. No publications may appear in Readout or Folio without explicit author approval.

---

## D-009 | 2026-10-19 | Dual-Listener Hash Routing and Direct Deep-Linking

- **Decision**: Implement client-side routing in `src/App.jsx` using hash listeners for both `hashchange` and `popstate` events, without introducing an external routing dependency.
- **Rationale**: ZeroIndex is hosted on static/edge CDNs (Vercel static) where full-path HTML5 pushState routing requires server rewrite configurations that risk 404s on direct file access or static previews. Hash routing (`#workbench`, `#atlas`, `#bridge`, `#readout/:slug`, `#workspace/:tab/:subId`) guarantees universal compatibility across local file preview, static edge hosting, and browser history (Back/Forward).
- **Consequences**: All intra-site navigation must update `window.location.hash`. Components that receive deep-link parameters must synchronize state via URL hash parsing.

---

## D-010 | 2026-10-19 | Interactive Technical Roadmap and Placement Guide Foundations

- **Decision**: Model The Atlas (Programming Foundations Roadmap) and The Bridge (Campus Placement Preparation Guide) as modular data configurations (`src/data/atlasRoadmapsConfig.js` and `src/data/bridgePlacementConfig.js`) with interactive client-side components.
- **Rationale**: Students require structured, actionable learning paths and preparation checklists even before every advanced course module is built. Hardcoded or static text lacks engagement; separate data models ensure curricular updates do not require UI redesigns.
- **Consequences**: Checklists persist completion states in browser `localStorage`. Real ZeroIndex resources (e.g. DLD Unit 1) are cross-linked accurately.

---

## D-011 | 2026-10-19 | Extensible Editorial and Essay Publishing Registries

- **Decision**: Establish formal publication schemas (`readoutArticlesConfig.js` and `folioEssaysConfig.js`) with draft/published status flags, helper retrieval functions (`getPublishedArticles`, `getArticleBySlug`), and reusable responsive detail templates.
- **Rationale**: Enables seamless publication of faculty research and essays upon written approval without altering markup or routing logic. Guarantees that unapproved articles cannot leak into public views if their status is not explicitly set to `'published'`.
- **Consequences**: Adding new approved content requires only registering an item object in the respective configuration array.

---

## D-012 | 2026-10-19 | Homepage Visual Refinement, Brand Identity, and Sunlit Editorial System

- **Decision**: Refine ZeroIndex visual branding with a minimalist brand mark (`ZeroIndexMark`) inspired by index zero `[0]` and the 5 branching pathways of the Knowledge Tree; adopt the Sunlit Editorial color system (`#FBF8F2` warm ivory background, `#FFFFFF` soft white cards, `#285C49` primary forest green, `#DDEADD` supporting sage, `#C38A63` warm accent, `#293B32` primary text); update hero copy and badge to "Five sections. One framework."; implement a balanced 6-column 3+2 pillar card arrangement; rename the author note to "Why I built ZeroIndex" without college crest next to author; simplify footer into 3 balanced columns with institution crest restricted to affiliation block.
- **Rationale**: Elevates ZeroIndex into an elegant, distinctive academic publication that represents the full breadth of learning, roadmaps, career preparation, technology, and personal writing, while keeping institutional attribution dignified and separated from the independent platform identity.
- **Consequences**: `ZeroIndexMark` replaces generic square 0 icons across header, footer, and modals. Subtitle under header brand name is removed. DLD Unit 1 academic content and interactive solvers are 100% preserved.

---

## D-013 | 2026-10-19 | Symmetrical Botanical Brand Mark, Motivation Artwork, and Modal URL Corrections

- **Decision**: (1) Refine the brand identity into an organic symmetrical emblem (`ZeroIndexMark.jsx` and `public/icon.svg`) expressing "One origin. Many directions. Continuous growth." with an origin node, upward growth stem, and five balanced radiating branches; (2) Integrate original vector SVG artwork `MotivationIllustration.jsx` into the "Why I built ZeroIndex" section; (3) Completely remove the hero label above the headline; (4) Redesign the footer author card into a centered, prominent author layout with a distinct institutional affiliation area; (5) Replace stale `zeroindex.edu` URLs with official `https://zeroindex-sigma.vercel.app/` across `InstallModal.jsx`, `AcademicsHub.jsx`, and `manifest.json`, replacing exaggerated offline claims with the preferred app-like access subtitle.
- **Rationale**: Direct response to user review in Homepage Refinement Round 2. Solves visual composition balance, ensures correct installation guidance, and establishes a memorable, mature brand emblem.
- **Consequences**: No broken or stale domains remain in user-facing modals. 100% preservation of academic content and navigation.

## D-014 | 2026-10-19 | Final Homepage Artwork and Master Botanical Logo Integration

- **Decision**: (1) Replace temporary vector SVG illustrations with the authentic master watercolor painting `zeroindex-motivation-journey.webp` in the "Why I built ZeroIndex" section, preserving its natural proportions without heavy borders or deckled-edge cropping; (2) Process the finalized master botanical logo asset `zeroindex-logo.png` to create a high-fidelity transparent background version `public/zeroindex-brand-logo.png` and update `ZeroIndexMark.jsx` to render this exact approved emblem across header, footer, and modals; (3) Generate production-grade favicons (`favicon-32x32.png`, `favicon.ico`) and PWA icons (`icon-192.png`, `icon-512.png`) derived directly from the approved botanical brand mark; (4) Retain 100% of previously verified copy, layout rules, zero-dash compliance, and DLD mathematical engines.
- **Rationale**: Direct response to user directive concluding visual refinements. Replaces interim programmatic drawings with the user's authentic finalized artwork assets.
- **Consequences**: Eliminates synthetic SVG drawings of the logo and motivation scene. All platforms (desktop, mobile, PWA, favicons) display the authentic visual brand assets.

## D-015 | 2026-10-19 | DLD Unit 2 Syllabus Architecture and Phased Academic Sequence

- **Decision**: (1) Extract the exact prescribed VR23 university syllabus for Unit 2 (13 topics) and organize into a 7-section pedagogical architecture: 2.1 Concept of Boolean Algebra & Huntington Postulates; 2.2 Basic Theorems & Algebraic Simplification; 2.3 Boolean Functions & Gate Realization; 2.4 Canonical & Standard Forms (Minterms & Maxterms); 2.5 The Map Method (2 & 3 Variable K-Maps); 2.6 Four-Variable K-Maps, Don't-Care Conditions & Prime Implicants; 2.7 Universal Gate Realization (NAND/NOR) & XOR Implementation; (2) Keep Unit 2 unpublished (`isLive: false`, status: "in-development") until verified and approved; (3) Develop Section 2.1 first as a complete foundational lesson with 6 Huntington postulates, 4 worked models, 5 misconceptions, and 6 practice problems; (4) Defer complete interactive K-Map solver development to Phase 4.
- **Rationale**: Strict adherence to the official university syllabus prevents curriculum drift or missing exam competencies. Incremental phased delivery ensures each section matches the high pedagogical quality of Unit 1.
- **Consequences**: Unit 2 sidebar navigation is available for development testing on `dld-unit2-phase1`. Section 2.1 is fully interactive. Automated tests in `verifySection21Math.mjs` guarantee mathematical accuracy.

## D-016 | 2026-10-19 | DLD Unit 2 Master Implementation and Interactive Solvers Suite

- **Decision**: Implement the complete DLD Unit 2 specification in full: (1) Seven comprehensive academic lessons (2.1 to 2.7) with 60+ progressive worked models and university exam traps; (2) Two standalone revision cheat sheets (`BooleanLawsCheatSheet.jsx` and `KMapCheatSheet.jsx`); (3) Dedicated deterministic mathematical engine `booleanEngine.js` supporting safe recursive-descent AST parsing, truth table generation, exact Quine-McCluskey / Petrick logic minimization, and universal gate synthesis; (4) Suite of 6 interactive solvers (`Unit2Solvers.jsx`) integrated cleanly alongside Unit 1 solvers with unit switcher; (5) 110 validated original questions in `unit2QuizBank.js` integrated into `PracticeArena.jsx`; (6) Preserve Unit 2 in preview status (`isLive: false`) pending formal user release approval.
- **Rationale**: Fulfills the complete academic, interactive, and assessment requirements of DLD Unit 2 without cutting syllabus topics or introducing external AI dependencies.
- **Consequences**: Zero regressions in Unit 1. Students gain an interactive laboratory for Boolean simplification, K-Map cell toggling with live prime implicant grouping, and universal NAND/NOR synthesis.

## D-017 | 2026-10-20 | Permanent WHY-FIRST Teaching Philosophy and Section 2.1 Complete Academic Rebuild

- **Decision**: (1) Formally adopt the WHY-FIRST instructional principle across all Workbench curriculum modules: WHY -> WHERE -> WHAT -> HOW -> TRY -> CONNECT; (2) Rebuild Section 2.1 into a 5-tab pedagogical architecture: Start Here, All Laws, See & Prove, Worked Examples, and Cheat Sheet; (3) Feature a technically accurate Before-and-After logic circuit demonstration ($F = AB + AB' \implies F = A$, reducing 4 gates to 0 gates) and full truth table verification; (4) Provide structured, uniform coverage of all 13 major Boolean laws, both distributive laws, generalized De Morgan theorems, consensus theorems, and principle of duality; (5) Provide 8 interactive truth-table/visual proofs and 10 progressive introductory worked models with step-by-step law citations; (6) Integrate a comprehensive searchable/printable Boolean Laws Master Cheat Sheet.
- **Rationale**: Students must understand WHY a concept exists before learning WHAT it is or HOW it works. Replaces dense formal axioms with an intuitive, student-friendly engineering learning sequence while strictly maintaining mathematical rigor.
- **Consequences**: Applied to Section 2.1 without altering Sections 2.2 to 2.7 or Unit 1. Tested with 81/81 automated checks in `verifySection21Math.mjs`.

---

## D-018 | 2026-10-20 | Section 2.1 Academic, Mathematical, and Visual Refinements

- **Decision**: (1) Strengthen WHY-FIRST Tab 1 with a compact visual summary card ("Why Do We Simplify Boolean Expressions?") with 4 restrained educational points (Simpler Circuits, Smaller Hardware, Lower Power Consumption, Potentially Faster Operation), a 4-step pipeline banner, and an Engineering Distinction callout clarifying mathematical equivalence vs technology-dependent physical benefits; (2) Correct physical wiring bug in discrete-gate before-and-after circuit diagram for $F = AB + AB'$ so input $B$ visibly connects to the NOT gate input, connection dots mark junctions, crossing wires are clear, and gate symbols/labels are crisp; (3) Add optional expandable symbolic algebraic proofs in Tab 3 ("See & Prove") for Absorption, Second Distributive Law, De Morgan's Theorems (via uniqueness of Boolean complements $XY=0$ and $X+Y=1$), and Consensus Theorem ($AB + A'C + BC = AB + A'C$ via $A+A'=1$ expansion); (4) Fix Double Complement cheat sheet row by moving Involution $(A')'=A$ and Constant Complements $0'=1, 1'=0$ into an explicit "Complement Properties" group with dedicated 3-column table format, eliminating misleading OR/Dual column headers; (5) Integrate curated, authoritative video lessons (Neso Academy and ALL ABOUT ELECTRONICS) via `CuratedVideoCard.jsx` and `dldVideoConfig.js` with responsive 16:9 on-demand YouTube-nocookie iframe player; (6) Eliminate desktop clipping of the Cheat Sheet tab by adopting a responsive 5-column grid (`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2`).
- **Rationale**: Direct response to academic and visual review of Section 2.1. Addresses schematic correctness, exam-level symbolic derivation readiness, and visual layout accessibility without scope creep.
- **Consequences**: Section 2.1 is complete, self-contained, mathematically verified (95/95 checks passing), and accessible on all viewport sizes. Strict adherence to zero em-dashes and zero en-dashes maintained.

---

## Decision Record Template

```markdown
### D-NNN | YYYY-MM-DD | Short Factual Title

- **Decision:**
- **Rationale / Alternatives Considered:**
- **Affected Files and Components:**
- **Approval Evidence:**
- **Verification / Follow-up Requirements:**
```
