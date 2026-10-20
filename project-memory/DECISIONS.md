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

## D-019 | 2026-10-20 | Section 2.2 Complete Academic Rebuild (WHY-FIRST 5-Tab Architecture)

- **Decision**: (1) Rebuild Section 2.2 ("Simplification of Boolean Expressions Using Algebraic Laws") using the permanent ZeroIndex WHY-FIRST 5-tab pedagogical architecture: Start Here, Simplification Techniques, Worked Models, Cheat Sheet & Shortcuts, and Practice Lab; (2) In Tab 1, establish the core engineering purpose ("A Boolean expression describes the logical behavior of a digital circuit... The goal is to preserve the function while identifying a simpler mathematical representation that may lead to a more efficient circuit implementation"), 4 physical benefits with hardware caveats, objective before/after demonstration ($F = A + AB \implies F = A$) with full 4-row truth table verification, the 6-step simplification framework (READ, RECOGNIZE, CHOOSE, TRANSFORM, CHECK, CONCLUDE), and the critical distinction between equivalent, simplified, and minimal expressions; (3) In Tab 2, present matching side-by-side panels for the 4 fundamental OR laws ($A+0=A, A+1=1, A+A=A, A+A'=1$) and 4 fundamental AND laws ($A·1=A, A·0=0, A·A=A, A·A'=0$), duality summary, 10 core pattern-recognition techniques, and 10 common mistakes (Mistake -> Correct Method -> Why); (4) In Tab 3, implement exactly 24 progressive worked models (5 Basic, 6 Intermediate, 12 Advanced, 1 Optional 5-Variable Challenge) where every single step shows the exact law applied and answers the pedagogical question "WHY was this law chosen at this specific step?", including deep multi-step derivations (ADV05 with 9 steps, ADV10 with 14 steps, CH01 across all 32 combinations); (5) In Tab 4, provide a dedicated Simplification Strategy Sheet with a law-selection decision guide flowchart, pattern-recognition reference table, operator precedence hierarchy, factoring shortcuts, 7-point simplification checklist, and an inline link/modal to the Section 2.1 Master Cheat Sheet; (6) In Tab 5, provide 24 validated practice problems (P01 to P24) with two-tier progressive hints, toggleable step-by-step solutions, verified answer keys, and pedagogical observations; (7) Formulate automated test suite `scripts/verifySection22Math.mjs` verifying all 8 fundamental laws, 10 pattern identities, all 24 worked models, all 24 practice questions, and zero-dash compliance (78/78 checks passed).
- **Rationale**: Boolean algebraic simplification cannot be mastered through abstract lists of identities or disconnected formulas; students require pattern recognition, decision reasoning, and extensive verified multi-step practice to build genuine problem-solving confidence.
- **Affected Files**: `src/data/dldSection22Data.js`, `src/components/Section22View.jsx`, `src/data/dldVideoConfig.js`, `scripts/verifySection22Math.mjs`, `project-memory/CURRENT_STATE.md`, `project-memory/CHANGELOG.md`, `project-memory/DECISIONS.md`.
- **Approval Evidence**: All 78/78 tests in `verifySection22Math.mjs`, 95/95 in `verifySection21Math.mjs`, 842/842 in `verifyUnit2Full.mjs`, and 78/78 in Unit 1 suites pass with 100% accuracy. Zero em-dashes and zero en-dashes throughout. `npm run build` succeeds in 3.55s.
- **Verification / Follow-up Requirements**: Continued on branch `dld-unit2-development` (preview status `isLive: false`). User review required before proceeding to Section 2.3 or merging to main.

## D-020 | 2026-10-20 | Section 2.2 Final Minor Visual and Content Refinements

- **Decision**: (1) Replace broken/unavailable YouTube video ID `A2d57vVw8vQ` with active, verified Neso Academy video `k04ksfLBuak` ("Boolean Algebra Examples (Part 1)", 14 min) verified via YouTube oEmbed API; (2) Upgrade Technique badge styling in Tab 2 to authoritative dark forest green (`bg-[#1E4537] text-white font-bold shadow-2xs`) for prominent recognition without visual harshness; (3) Standardize all Watch Out warnings across `tenTechniques` and `commonMistakes` to explicitly state the strict prohibition (using phrasing such as "Watch Out: Do NOT write A + 1 = A...") and enclose each warning in a distinct red alert card (`bg-[#FFF5F5] border border-[#FED7D7]` with `AlertTriangle` icon) to eliminate student misunderstanding; (4) Fix formula alignment and wrapping issues across all tabs by eliminating unconstrained `break-all`, styling `dualitySummary` with dedicated centered pills and `whitespace-nowrap`, wrapping short expressions and table cells in `whitespace-nowrap`, and enhancing Operator Precedence Hierarchy with prominent rank badges (`#1E4537`).
- **Rationale**: Removes student confusion on common exam traps, guarantees that mathematical formulas never split across lines mid-symbol or mid-operator, and ensures working multimedia supplementary learning.
- **Affected Files**: `src/data/dldVideoConfig.js`, `src/data/dldSection22Data.js`, `src/components/Section22View.jsx`, `project-memory/CURRENT_STATE.md`, `project-memory/CHANGELOG.md`, `project-memory/DECISIONS.md`.
- **Approval Evidence**: Render prop tests (`testSection22RenderProps.mjs`) pass with 100% valid schema properties. Math verification (`verifySection22Math.mjs`) passes 78/78 checks with zero errors. Production build (`npm run build`) builds cleanly in 3.62s. Zero em-dashes and zero en-dashes confirmed.
- **Verification / Follow-up Requirements**: Preserved on development branch `dld-unit2-development`. Do not merge into main or deploy to Vercel without user instruction. Section 2.3 will be handled separately.

## D-021 | 2026-10-20 | Section 2.3 Complete Academic Rebuild (WHY-FIRST 6-Tab Architecture)

- **Decision**: (1) Rebuild Section 2.3 ("Boolean Functions, Minterms, Maxterms, Canonical and Standard Forms") using the approved 6-tab academic architecture: Start Here, Minterms & Maxterms, Canonical & Standard Forms, Worked Models, Cheat Sheet & Master Reference, and Practice Lab; (2) In Tab 1, articulate the WHY-FIRST rationale answering "Why do we need minterms and maxterms?" and "How do we turn a truth table into a Boolean expression?", followed by a two-input alarm demonstration ($F=A+B$, Door and Motion sensors) deriving Canonical SOP $\Sigma m(1,2,3)$ and Canonical POS $\Pi M(0)$, a 5-step systematic transformation flow, 11 core fundamentals cards, combinatorial function domain theory ($2^n$ combinations vs $2^{2^n}$ functions with FPGA 4-LUT context), and embedded verified Neso Academy video lesson `canonical-forms`; (3) In Tab 2, define minterms (product terms evaluating to 1 at exactly one row) and maxterms (sum terms evaluating to 0 at exactly one row), their polarity rules ($0 \to A'$ for minterm, $0 \to A$ for maxterm), side-by-side comparison for index 5 ($m_5 = AB'C$ vs $M_5 = A'+B+C'$), De Morgan complement relationship $(m_i)' = M_i$, positional weighting formulas ($4A+2B+C$, $8A+4B+2C+D$), and an interactive truth-table row inspector across 2, 3, and 4 variables (all 28 rows verified); (4) In Tab 3, define SOP, POS, Canonical SOP, Canonical POS, clarify textbook terminology conventions (Morris Mano vs general standards), provide canonical vs non-canonical comparisons, give 7-step procedures for SOP/POS extraction from truth tables, demonstrate synchronized 3-variable truth table for $F=C$ with green 1-rows and blue 0-rows, establish complementary index sets ($F = \Sigma m(S) \iff F = \Pi M(U \setminus S)$ vs $[F]' = \Sigma m(U \setminus S) = \Pi M(S)$), explain constant functions ($F=0, F=1$), and present a feature comparison matrix; (5) In Tab 4, provide 15 verified worked models (4 Basic, 5 Intermediate including the 8-step walkthrough for $AB+C'$, 5 Advanced, 1 Combinatorial Challenge counting 32,768 odd-parity 4-variable functions) with step-by-step transformations and `whitespace-nowrap overflow-x-auto` formula protection; (6) In Tab 5, provide a Master Cheat Sheet with one-glance memory rules, a 9-point conversion checklist, full index tables, and 10 common exam mistakes (Incorrect -> Correct -> Why); (7) In Tab 6, provide 24 practice questions across Basic, Intermediate, Advanced, and Challenge difficulties with two-tier hints and toggleable step-by-step revealed solutions; (8) Build automated verification suite `scripts/verifySection23Math.mjs` verifying all 28 rows, all 15 models, all 24 practice questions, truth tables, and zero-dash compliance (497/497 checks passed).
- **Rationale**: Students must understand why switching functions are mathematically represented in canonical forms, how binary rows map to minterms and maxterms, and why different canonical representations express the exact same logical behavior before encountering algebraic minimization in Section 2.4 and K-Maps in Section 2.5.
- **Affected Files**: `src/data/dldVideoConfig.js`, `src/data/dldSection23Data.js`, `src/components/Section23View.jsx`, `scripts/verifySection23Math.mjs`, `project-memory/CURRENT_STATE.md`, `project-memory/CHANGELOG.md`, `project-memory/DECISIONS.md`.
- **Approval Evidence**: Dedicated math verification suite `verifySection23Math.mjs` passes all 497/497 checks with zero failures. Section 2.1 suite (95 passed) and Section 2.2 suite (78 passed) pass. Production build `npm run build` succeeds in 3.45s with zero errors and zero warnings. Zero em-dashes and zero en-dashes confirmed across all modified and created files.
- **Verification / Follow-up Requirements**: Preserved on development branch `dld-unit2-development` (preview status `isLive: false`). User review required before proceeding to Section 2.4 or merging to main.

---

## D-022 | 2026-10-20 | Permanent Academic Presentation Conventions and Section 2.3 Final Academic and Visual Refinements

- **Decision**: (1) Establish permanent ZeroIndex teaching-presentation rules: replace long introductory paragraphs with 4 to 6 structured, informative bullet points highlighting core concepts in bold typography, restrained forest-green, muted blue, or copper accents without flashy animations; (2) Lead definitions with an immediately understandable Simple Definition followed by the complete Formal Definition; (3) Mandate the use of actual Unicode mathematical symbols Σ (`\u03A3`) and Π (`\u03A0`) in all formulas involving canonical forms, SOP/POS, and K-Maps (strictly prohibiting the written words "Sigma" or "Pi" inside formulas); (4) Standardize complement terminology to "complemented" and "uncomplemented" ($A'$ means $A$ complement / $A$ prime); (5) Refine Section 2.3 Tab 1 by replacing the long quotation block with 6 structured introductory bullet points, adding a first-use explanation card for Σ and Π, and perfecting the alarm truth-table alignment (centered headers `A (Door)`, `B (Motion)`, `F (Alarm)`, centered binary values, left-aligned physical scenario); (6) Refine Tab 2 with a 5-tier definition hierarchy, an explicit lowercase m vs uppercase M callout, and verified complement terminology; (7) Refine Tab 3 with "How Are Standard and Canonical Forms Different?", a single-function master comparison across all 4 forms for $F(A,B,C) = AB+C$ with an 8-row truth-table proof, a 9-row "Boolean Forms at a Glance" matrix, and synchronized $F=C$ demo with Σ and Π; (8) Refine Tab 4 with an orientation card articulating the 5 pedagogical reasons for these examples and ensuring all 15 models use Σ and Π notation; (9) Refine Tab 5 Cheat Sheet and Tab 6 Practice Lab (all 24 exercises, hints, and revealed solutions) to strictly use Σ and Π symbols; (10) Expand verification suite `scripts/verifySection23Math.mjs` to 551 passing checks (including 4-form equivalence proof, Σ and Π glyph audits, and zero-dash compliance).
- **Rationale**: Elevates educational readability, eliminates student ambiguity on mathematical symbols, prevents formula line-break glitches, and guarantees consistent academic rigor across all future ZeroIndex lessons.
- **Affected Files**: `src/data/dldSection23Data.js`, `src/components/Section23View.jsx`, `scripts/verifySection23Math.mjs`, `AGENTS.md`, `.agents/rules/academic_presentation_conventions.md`, `project-memory/CURRENT_STATE.md`, `project-memory/CHANGELOG.md`, `project-memory/DECISIONS.md`.
- **Approval Evidence**: `verifySection23Math.mjs` passes 551/551 checks (0 failures). Section 2.1 suite (95 passed) and Section 2.2 suite (78 passed) regression tests pass. Production build `npm run build` succeeds in 3.75s with zero errors and zero warnings. Visual alignment audit via browser subagent confirmed perfect alignment across all 6 tabs. Zero em-dashes and zero en-dashes confirmed.
- **Verification / Follow-up Requirements**: Preserved on development branch `dld-unit2-development` (preview status `isLive: false`). Stop after Section 2.3 completion; do not merge to main or proceed to Section 2.4 without explicit user instruction.

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


