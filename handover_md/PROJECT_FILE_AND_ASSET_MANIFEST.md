# ZeroIndex: Complete Project File and Asset Manifest

**Document Reference**: `ZEROINDEX-MANIFEST-V1`  
**Generated On**: October 19, 2026  
**Parent Platform**: ZeroIndex Academic Ecosystem  
**Repository Architecture**: Single Page Application (Vite 5 + React 18 + Tailwind CSS 3)  
**Total Production Codebase Size**: 68 Core Files / Over 38,000 Lines of Code and Academic Data  
**Primary Deployment Target**: Vercel Serverless Edge CDN  

---

## 1. Executive Codebase Summary

ZeroIndex is structured as a client-side Single Page Application (SPA) with zero external backend dependencies. All data, including high-precision numerical algorithms, IEEE 754 converters, BCD arithmetic engines, 110+ quiz questions, and complete syllabus models, are bundled directly into optimized client JavaScript modules.

| Architectural Layer | File Count | Primary Technologies | Primary Responsibility |
|:---|:---:|:---|:---|
| **Root Configuration & Deploy** | 7 | Vite, Tailwind, PostCSS, JSON | Build tooling, bundling, and deployment routing |
| **Documentation & Handover** | 4 | Markdown (GFM) | Complete architectural specifications and audit logs |
| **Application Core & Styling** | 3 | React, Vanilla CSS, Tailwind | DOM mount, global reset, typography, and theme vars |
| **Global Layout & Navigation** | 8 | React, Lucide Icons | Responsive headers, footers, modal dialogs, and branding |
| **Ecosystem & Landing Views** | 9 | React, Lucide Icons | Level 0 flagship portal, Level 1 hub, editorial section portals |
| **DLD Subject Portal & Core** | 4 | React, Lucide Icons | Subject home, unit workspace, curriculum navigation |
| **Specialized Section Views** | 6 | React, SVG, Canvas | Deep interactive learning modules for Sections 1.5, 1.6, and 1.7 |
| **Interactive Solvers & Arenas** | 3 | React, Canvas, Custom Math | Real-time hardware simulators and assessment engine |
| **Academic Data Stores & Banks** | 11 | ES Modules, JSON data | Syllabus trees, worked models, and 110+ quiz questions |
| **Utilities & Design Tokens** | 2 | ES Modules, JS Objects | Quiz grading algorithms and theme palettes |
| **Verification & Test Suites** | 4 | Node.js (ESM), Console assertions | Headless verification of mathematical correctness |
| **Static Public Assets & PWA** | 6 | Web App Manifest, Service Worker | PWA caching, icons, and institutional emblems |

---

## 2. Root Configuration and Deployment Files

### `package.json` (24 lines)
- **Role**: Project manifest declaring dependencies, scripts, and runtime engine constraints.
- **Key Dependencies**: `react` (^18.3.1), `react-dom` (^18.3.1), `lucide-react` (^0.344.0).
- **Key Dev Dependencies**: `@vitejs/plugin-react` (^4.2.1), `vite` (^5.1.4), `tailwindcss` (^3.4.1), `postcss` (^8.4.35), `autoprefixer` (^10.4.17).
- **Scripts**: `npm run dev` (Vite dev server), `npm run build` (Vite production bundle), `npm run preview` (Vite local preview).

### `package-lock.json` (3,818 lines)
- **Role**: Deterministic dependency lockfile ensuring reproducible builds across local machines and Vercel CI/CD pipelines.

### `vite.config.js` (11 lines)
- **Role**: Vite build tool configuration.
- **Settings**: Integrates `@vitejs/plugin-react`, configures development server port (`3000` default, dynamically increments if busy), and sets chunking optimizations.

### `vercel.json` (8 lines)
- **Role**: Vercel deployment routing configuration.
- **Routing**: Implements client-side SPA rewrites (`"source": "/(.*)"` $\to$ `"destination": "/index.html"`), ensuring page refreshes and direct URL navigation do not produce HTTP 404 errors.

### `tailwind.config.js` (89 lines)
- **Role**: Tailwind CSS design token declarations.
- **Content Paths**: Scans `./index.html` and `./src/**/*.{js,ts,jsx,tsx}`.
- **Extensions**: Custom palette tokens (`editorial-amber`, `editorial-slate`, `editorial-bg`, `editorial-card`), custom font family bindings (`playfair`, `newsreader`, `jetbrains`, `jakarta`), and custom animations.

### `postcss.config.js` (6 lines)
- **Role**: PostCSS processor pipeline configuration binding `tailwindcss` and `autoprefixer`.

### `index.html` (34 lines)
- **Role**: Single-page entry HTML document.
- **Metadata**: Preloads Google Fonts (`Playfair Display`, `Newsreader`, `JetBrains Mono`, `Plus Jakarta Sans`), registers mobile viewports, PWA manifest link (`manifest.json`), and mounts root container `<div id="root"></div>`.

### `README.md` (98 lines)
- **Role**: Primary GitHub repository documentation detailing project mission, pedagogical methodology, architecture, and deployment procedures.

---

## 3. Handover and Architectural Documentation

### `handover_md/ZEROIndex_PROJECT_HANDOVER.md` (164 lines)
- **Role**: Master project handover briefing.
- **Content**: Executive overview, institutional context (VIIT), editorial design standards, 5 content pillars, DLD curriculum mapping, local development commands, and version control checkpoints.

### `handover_md/DLD_UNIT_1_TECHNICAL_AND_ACADEMIC_AUDIT.md` (123 lines)
- **Role**: Rigorous audit of Digital Logic Design Unit 1.
- **Content**: Section-by-section breakdown (Sections 1.1 to 1.7), mathematical proofs, worked models (1A to 6E), 5 interactive solvers, and 110+ quiz question verification metrics.

### `handover_md/DLD_FUTURE_UNITS_AND_ROADMAP.md` (325 lines)
- **Role**: Engineering and curriculum blueprint for Units 2 through 5.
- **Content**: Detailed syllabus, planned interactive tools (K-Map visualizer, MUX synthesizer, Flip-Flop waveform simulator, Counter/FSM engine), data schemas, and question bank distribution.

### `handover_md/PROJECT_FILE_AND_ASSET_MANIFEST.md` (This document)
- **Role**: Exhaustive file-by-file inventory and interdependency specification.

---

## 4. Core Application Entry and Global Styling

### `src/main.jsx` (10 lines)
- **Role**: React client mount point.
- **Behavior**: Uses `ReactDOM.createRoot` on `#root` to render `<App />` within `React.StrictMode`. Imports global stylesheet `src/index.css`.

### `src/App.jsx` (178 lines)
- **Role**: Central state-based router and application controller.
- **State Properties**:
  - `activeSection`: Current top-level pillar (`'home'`, `'readout'`, `'portal'`, `'workbench'`, `'atlas'`, `'folio'`).
  - `activeHomeView`: Current home view state (`'flagship'` for Level 0 landing, `'academics'` for Level 1 Academics Hub).
  - `activeSubject`: Currently active academic subject (`'dld'`, `'c-prog'`, `'dsa'`, etc.).
  - `activeUnitId`: Currently active DLD unit (`'unit-1'`).
  - `aboutModalOpen` / `installModalOpen`: Modal visibility state controls.
- **Dependencies**: Imports layout wrappers (`SiteHeader`, `SiteFooter`, `ZeroIndexSideWings`), views (`MainHome`, `AcademicsHub`, `DldSubjectHome`, `UnitWorkspace`, etc.), and modal dialogs.

### `src/index.css` (123 lines)
- **Role**: Global stylesheet combining Tailwind directives (`@tailwind base`, `@tailwind components`, `@tailwind utilities`) with custom typography resets.
- **Key Features**: Smooth scrolling behavior, custom scrollbar styling, KaTeX formula formatting, and print stylesheet rules.

---

## 5. Global Layout and Navigation Components

### `src/components/SiteHeader.jsx` (212 lines)
- **Role**: Top navigation bar featuring the ZeroIndex editorial banner, active view breadcrumbs, subject switcher, and fast action triggers.
- **Exports**: `SiteHeader` (Default export).

### `src/components/SiteFooter.jsx` (142 lines)
- **Role**: Institutional footer displaying VIIT autonomy accreditation, academic integrity notice, copyright, and direct links to syllabus archives.
- **Exports**: `SiteFooter` (Default export).

### `src/components/Navbar.jsx` (217 lines)
- **Role**: Legacy desktop and mobile responsive navigation bar with dropdown menus.
- **Exports**: `Navbar` (Default export).

### `src/components/BottomNav.jsx` (54 lines)
- **Role**: Mobile bottom navigation bar for quick one-thumb navigation between Home, Academics, Solvers, and Practice Arena on handheld devices.
- **Exports**: `BottomNav` (Default export).

### `src/components/ZeroIndexSideWings.jsx` (995 lines)
- **Role**: High-aesthetic side navigation rails providing contextual table of contents, rapid section jumping, and reading progress indicators on wide screens ($> 1440\text{px}$).
- **Exports**: `ZeroIndexSideWings` (Default export).

### `src/components/ViitCrest.jsx` (51 lines)
- **Role**: Scalable SVG component rendering the official Vignan Institute of Information Technology academic crest.
- **Exports**: `ViitCrest` (Default export).

### `src/components/AboutModal.jsx` (111 lines)
- **Role**: Modal dialog presenting the platform academic mission, author credentials, autonomous regulation details, and open-source credits.
- **Exports**: `AboutModal` (Default export).

### `src/components/InstallModal.jsx` (113 lines)
- **Role**: Progressive Web App (PWA) installation guide providing step-by-step instructions for iOS (Safari Add to Home Screen) and Desktop Chrome/Edge.
- **Exports**: `InstallModal` (Default export).

---

## 6. Ecosystem and Landing Views

### `src/components/MainHome.jsx` (387 lines)
- **Role**: Level 0 Flagship Portal landing page.
- **Design**: Deep Architectural Obsidian (`#0B0F17`) aesthetic with serif editorial lead paragraph, institutional affiliation, five pillar gateway cards, and interactive feature highlights.
- **Exports**: `MainHome` (Default export).

### `src/components/AcademicsHub.jsx` (888 lines)
- **Role**: Level 1 Academics Hub.
- **Design**: Warm Alabaster (`#F8F9FA`) background containing the interactive `Computing Stack: [0] to AI` widget, Bento grid of academic foundations (DLD, C Programming, DSA, Machine Learning, Deep Learning), direct solver jumps, and syllabus downloads.
- **Exports**: `AcademicsHub` (Default export).

### `src/components/ReadoutLanding.jsx` (210 lines)
- **Role**: Editorial publication hub for long-form faculty essays, computing monographs, and curriculum commentary.
- **Exports**: `ReadoutLanding` (Default export).

### `src/components/PortalLanding.jsx` (4 lines)
- **Role**: Lightweight redirect wrapper routing users from the legacy portal route into the new Academics Hub.
- **Exports**: `PortalLanding` (Default export).

### `src/components/WorkbenchLanding.jsx` (271 lines)
- **Role**: Dedicated landing directory for all engineering calculators, visualizers, and interactive hardware simulators.
- **Exports**: `WorkbenchLanding` (Default export).

### `src/components/AtlasLanding.jsx` (289 lines)
- **Role**: Interactive visual roadmap portal displaying prerequisite graphs, core engineering tracks, and computer science career paths.
- **Exports**: `AtlasLanding` (Default export).

### `src/components/FolioLanding.jsx` (180 lines)
- **Role**: Showcase of student capstone projects, laboratory research papers, and technical implementation writeups.
- **Exports**: `FolioLanding` (Default export).

### `src/components/RoadmapsView.jsx` (162 lines)
- **Role**: Step-by-step sequential learning guides for self-directed engineering students.
- **Exports**: `RoadmapsView` (Default export).

### `src/components/KnowledgeTreeIllustration.jsx` (319 lines)
- **Role**: Custom SVG illustration representing the hierarchical tree of computer science disciplines from physical silicon to artificial intelligence.
- **Exports**: `KnowledgeTreeIllustration` (Default export).

### `src/components/FromZeroToPossibilityIllustration.jsx` (125 lines)
- **Role**: Editorial artwork depicting the conceptual journey from a single binary bit to high-level computational cognition.
- **Exports**: `FromZeroToPossibilityIllustration` (Default export).

---

## 7. DLD Subject Portal and Workspaces

### `src/components/DldSubjectHome.jsx` (499 lines)
- **Role**: Subject home base for Digital Logic Design.
- **Features**: Unit selection cards (Units 1 to 5), course syllabus progress indicators, direct links to the 5 interactive solvers, and 110+ practice quiz launcher.
- **Exports**: `DldSubjectHome` (Default export).

### `src/components/UnitWorkspace.jsx` (5,540 lines)
- **Role**: Comprehensive academic learning workspace for DLD Unit 1.
- **Features**: Houses the full content for Sections 1.1 through 1.4, including number base conversions, radix arithmetic, complements, and signed binary representations. Implements step-by-step mathematical derivation cards, interactive input sandboxes, and university practice problems.
- **Exports**: `UnitWorkspace` (Default export).

### `src/components/DldWorkspace.jsx` (279 lines)
- **Role**: Secondary unit workspace container handling navigation between theory tabs, worked models, and quick practice tests.
- **Exports**: `DldWorkspace` (Default export).

### `src/components/SyllabusView.jsx` (292 lines)
- **Role**: Formal academic syllabus view mapping autonomous college course outcomes (COs) and unit-level learning objectives to specific textbook chapters (Morris Mano, Roth).
- **Exports**: `SyllabusView` (Default export).

---

## 8. Specialized Section Views and Components

### `src/components/Section15View.jsx` (1,354 lines)
- **Role**: Dedicated interactive view for Section 1.5 (Binary Coded Decimal & Digital Codes).
- **Features**: Detailed treatment of 8421 BCD, Excess-3 (Self-Complementary), 2421, Biquinary, and Gray codes.
- **Exports**: `Section15View` (Default export).

### `src/components/Section15Components.jsx` (1,035 lines)
- **Role**: Reusable visual components for Section 1.5.
- **Components**: BCD adder circuit diagram, reflective Gray code wheel, code conversion tables, and self-complementary test harness.
- **Exports**: Multiple named exports for specialized visualizers.

### `src/components/Section16View.jsx` (1,213 lines)
- **Role**: Dedicated interactive view for Section 1.6 (Floating-Point Representation and IEEE 754 Standards).
- **Features**: Mathematical treatment of single precision (32-bit) and double precision (64-bit) IEEE 754 formats, normalized vs denormalized numbers, biased exponents, and special values ($+0, -0, +\infty, -\infty, \text{NaN}$).
- **Exports**: `Section16View` (Default export).

### `src/components/Section16Components.jsx` (1,105 lines)
- **Role**: Interactive bit-level visual components for Section 1.6.
- **Components**: Color-coded IEEE 754 32-bit register (Sign bit 31, Exponent bits 30-23, Mantissa bits 22-0), real-time floating-point breakdown, and precision loss simulator.
- **Exports**: Named component exports.

### `src/components/Section17View.jsx` (1,296 lines)
- **Role**: Dedicated interactive view for Section 1.7 (Error Detection, Correction, and Hamming Codes).
- **Features**: Complete treatment of even/odd parity, Hamming distance principles, and SEC-DED (Single Error Correction, Double Error Detection) matrix generation.
- **Exports**: `Section17View` (Default export).

### `src/components/Section17Components.jsx` (1,040 lines)
- **Role**: Interactive parity and error correction visualizers for Section 1.7.
- **Components**: Interactive 7-bit Hamming code generator ($P_1, P_2, D_3, P_4, D_5, D_6, D_7$), live single-bit error injection grid, parity check equations, and syndrome bit decoder.
- **Exports**: Named component exports.

---

## 9. Interactive Engineering Solvers and Quizzes

### `src/components/InteractiveSolvers.jsx` (5,487 lines)
- **Role**: Standalone engineering calculator engine containing all 5 Unit 1 solvers:
  1. **Arbitrary Radix Base Converter**: Base 2 through 36 with fractional expansion.
  2. **Complements and Signed Arithmetic Engine**: 1s/2s/Radix-1/Radix complements with overflow flags.
  3. **BCD Arithmetic and Code Converter**: Step-by-step $+6$ correction and Gray code mapping.
  4. **IEEE 754 Floating-Point Converter**: 32-bit single and 64-bit double precision with live bit toggle.
  5. **Hamming Code SEC-DED Generator**: Automated parity generation, bit flipping, and syndrome error location.
- **Exports**: `InteractiveSolvers` (Default export), plus individual named solver subcomponents.

### `src/components/SolversHub.jsx` (8 lines)
- **Role**: Clean wrapper facilitating modular mounting of interactive solvers within both the Academics Hub and individual unit workspaces.
- **Exports**: `SolversHub` (Default export).

### `src/components/PracticeArena.jsx` (1,816 lines)
- **Role**: High-stakes academic testing and practice environment.
- **Features**: Filter questions by Section (1.1 to 1.7) and Difficulty (Level 1 Foundation, Level 2 Standard, Level 3 Analytical, Level 4 Gate Challenge). Includes timed exam simulation, instantaneous answer verification, detailed academic explanations, and session scorecards.
- **Exports**: `PracticeArena` (Default export).

---

## 10. Academic Curricula and Data Stores

### `src/data/portalConfig.js` (172 lines)
- **Role**: Master metadata configuration for the entire ZeroIndex portal, defining the 5 content pillars, institutional links, and navigation hierarchies.

### `src/data/dldSyllabus.js` (210 lines)
- **Role**: Complete course syllabus data structure covering Units 1 through 5 of Digital Logic Design.

### `src/data/dldUnit1Master.js` (1,561 lines)
- **Role**: Comprehensive master data registry for Unit 1, consolidating all 7 sections, learning outcomes, textbook citations, and worked problem sets.

### `src/data/dldUnit1.js` (221 lines)
- **Role**: Core summary descriptors and section outline for DLD Unit 1.

### `src/data/unit1.js` (2 lines)
- **Role**: Legacy alias re-exporting `dldUnit1.js` to preserve backward compatibility.

### `src/data/dldSection13PracticeData.js` (1,531 lines)
- **Role**: Curated worked practice models for Section 1.3 (Signed Binary and Complements Arithmetic). Includes step-by-step solutions for overflow edge cases.

### `src/data/dldSection14Data.js` (1,431 lines)
- **Role**: Academic content and step-by-step worked models for Section 1.4 (Fixed-Point Arithmetic and Subtraction).

### `src/data/dldSection15Data.js` (1,946 lines)
- **Role**: Complete academic text, truth tables, and worked models for Section 1.5 (BCD and Digital Codes).

### `src/data/dldSection16Data.js` (1,525 lines)
- **Role**: Complete academic text, normalization equations, and worked models for Section 1.6 (Floating-Point Numbers).

### `src/data/dldSection17Data.js` (1,629 lines)
- **Role**: Complete academic text, parity generator matrices, and worked models for Section 1.7 (Error-Detecting and Correcting Codes).

### `src/data/unit1QuizBank.js` (8,938 lines)
- **Role**: Comprehensive question bank of 110+ multi-choice and numerical questions across all 7 sections of Unit 1, categorized by taxonomy and difficulty.

---

## 11. Utilities and Theme Tokens

### `src/utils/quizGrading.js` (85 lines)
- **Role**: Pure utility functions for calculating quiz percentages, evaluating accuracy by section, determining passing thresholds, and formatting grade reports.

### `src/theme/pastelTheme.js` (65 lines)
- **Role**: Color token definitions for subtle academic badge backgrounds, difficulty indicators, and status pill highlights.

---

## 12. Verification and Test Scripts

### `scripts/verifyUnit1Math.mjs` (169 lines)
- **Role**: Headless Node.js test script verifying the mathematical accuracy of number base conversions and complement calculations in Unit 1 master data.
- **Run Command**: `node scripts/verifyUnit1Math.mjs`

### `scripts/verifySection15Math.mjs` (160 lines)
- **Role**: Automated test script validating BCD addition corrections, Excess-3 self-complementary properties, and Gray code transitions.
- **Run Command**: `node scripts/verifySection15Math.mjs`

### `scripts/verifySection17.mjs` (130 lines)
- **Role**: Automated test script validating 7-bit Hamming code parity bit calculations and single-bit syndrome decoding.
- **Run Command**: `node scripts/verifySection17.mjs`

### `scripts/verifyInteractiveSolvers.mjs` (243 lines)
- **Role**: Comprehensive algorithmic regression suite validating all 5 interactive calculators against known mathematical benchmarks.
- **Run Command**: `node scripts/verifyInteractiveSolvers.mjs`

---

## 13. Static Public Assets and PWA Files

### `public/manifest.json` (24 lines)
- **Role**: Progressive Web App manifest declaring application name, display mode (`standalone`), theme color (`#0F172A`), background color (`#0B0F17`), and icon references.

### `public/sw.js` (38 lines)
- **Role**: Client service worker providing offline asset caching for fonts, stylesheets, and core scripts.

### `public/viit-logo.png`
- **Role**: High-resolution raster emblem of Vignan's Institute of Information Technology for institutional accreditation displays.

### `public/icon.svg` / `public/icon-192.png` / `public/icon-512.png`
- **Role**: Vector and raster application icons for mobile home screen launchers and browser favicons.

---

## 14. File Interdependency Graph

```
index.html
  +-- src/main.jsx
        +-- src/index.css
        +-- src/App.jsx
              +-- src/components/SiteHeader.jsx
              |     +-- src/components/ViitCrest.jsx
              +-- src/components/SiteFooter.jsx
              +-- src/components/ZeroIndexSideWings.jsx
              +-- src/components/AboutModal.jsx
              +-- src/components/InstallModal.jsx
              +-- src/components/MainHome.jsx (Level 0 Flagship)
              |     +-- src/components/FromZeroToPossibilityIllustration.jsx
              +-- src/components/AcademicsHub.jsx (Level 1 Academics Hub)
              |     +-- src/components/KnowledgeTreeIllustration.jsx
              |     +-- src/data/portalConfig.js
              +-- src/components/DldSubjectHome.jsx
              |     +-- src/data/dldSyllabus.js
              |     +-- src/data/dldUnit1Master.js
              +-- src/components/UnitWorkspace.jsx
              |     +-- src/data/dldUnit1Master.js
              |     +-- src/data/dldSection13PracticeData.js
              |     +-- src/data/dldSection14Data.js
              +-- src/components/Section15View.jsx
              |     +-- src/components/Section15Components.jsx
              |     +-- src/data/dldSection15Data.js
              +-- src/components/Section16View.jsx
              |     +-- src/components/Section16Components.jsx
              |     +-- src/data/dldSection16Data.js
              +-- src/components/Section17View.jsx
              |     +-- src/components/Section17Components.jsx
              |     +-- src/data/dldSection17Data.js
              +-- src/components/InteractiveSolvers.jsx
              +-- src/components/PracticeArena.jsx
                    +-- src/data/unit1QuizBank.js
                    +-- src/utils/quizGrading.js
```
