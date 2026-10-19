# Source Architecture

**Source of truth:** Current `package.json`, `src/`, `public/`, `scripts/`, and Git history. Verify against code before relying on documentation.

- **Frontend Core**: React 18 (`^18.3.1`) paired with Vite 6 (`^6.2.0`).
- **Styling Architecture**: Tailwind CSS 3 (`^3.4.17`), custom CSS resets in `src/index.css`, and selected Ant Design (`antd` `^5.24.1`) visual elements.
- **Iconography**: Lucide React (`^1.16.0`).
- **Client Routing**: State-based client router with hash support in `src/App.jsx`.
- **Hosting and Rewrites**: Vercel SPA routing configured via `vercel.json` (`"source": "/(.*)"` to `"/index.html"`).
- **PWA Capabilities**: Service worker caching in `public/sw.js` and web manifest in `public/manifest.json`.
- **Backend Architecture**: Zero standalone backend servers; purely client-side compilation and evaluation.

---

## Key Source Directories and Files

- `src/App.jsx`: Central router, navigation state, and modal controller.
- `src/components/MainHome.jsx`: Level 0 Flagship Portal landing page.
- `src/components/AcademicsHub.jsx`: Level 1 Academics Hub containing Computing Stack and Bento grid.
- `src/components/WorkbenchLanding.jsx`: The Workbench landing portal.
- `src/components/AtlasLanding.jsx`: The Atlas roadmap landing.
- `src/components/BridgeLanding.jsx`: The Bridge placement landing.
- `src/components/ReadoutLanding.jsx`: The Readout publication landing.
- `src/components/FolioLanding.jsx`: The Folio essay and research landing.
- `src/components/DldSubjectHome.jsx`: Digital Logic Design course overview and unit launcher.
- `src/components/DldWorkspace.jsx`: Unified DLD multi-unit theory, solvers, practice, and revision workspace.
- `src/components/InteractiveSolvers.jsx`: Unit 1 hardware and arithmetic engineering calculators (5 solvers).
- `src/components/Unit2Solvers.jsx`: Unit 2 Boolean Algebra, Truth Table, Canonical Converter, SOP/POS, Interactive K-Map, and NAND/NOR Circuit Builder (6 solvers).
- `src/utils/booleanEngine.js`: Deterministic Boolean tokenizer, AST parser, truth table generator, exact Quine-McCluskey minimizer, and universal logic synthesis engine.
- `src/components/Section21View.jsx` to `Section27View.jsx`: Dedicated academic views for Unit 2 sections 2.1 through 2.7.
- `src/components/BooleanLawsCheatSheet.jsx` & `KMapCheatSheet.jsx`: Academic revision cheat sheet modules.
- `src/components/PracticeArena.jsx`: Timed exam and practice arena with dual Unit 1 and Unit 2 quiz tracks.
- `src/data/dldUnit1Master.js`: Master registry of Unit 1 curricula and worked solutions.
- `src/data/dldUnit2Master.js` & `dldSection22Data.js` to `dldSection27Data.js`: Unit 2 academic master syllabus and section data modules.
- `src/data/unit1QuizBank.js` & `unit2QuizBank.js`: Complete 110-question banks for Unit 1 and Unit 2.
- `scripts/verify*.mjs`: Automated verification scripts for mathematical correctness.
- `scripts/generateProjectSnapshot.mjs`: Technical inventory snapshot generator.
- `handover_md/`: Comprehensive technical audits, future unit specifications, and file manifests.

---

## Important Change Policy

Do not alter academic formulas, truth tables, solver logic, answer keys, or question data during routine UI styling. Such changes must be validated against official course materials and accompanied by updated automated verification tests in `scripts/`. Existing URL route fragments (`#workbench`, `#atlas`, `#bridge`, `#readout`, `#folio`, `#dld`, `#workspace/...`) are backwards-compatibility requirements.
