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
- `src/components/UnitWorkspace.jsx`: Unit 1 comprehensive theory and derivation workspace.
- `src/components/InteractiveSolvers.jsx`: All 5 hardware and arithmetic engineering calculators.
- `src/components/PracticeArena.jsx`: 110+ question timed exam and practice arena.
- `src/data/dldUnit1Master.js`: Master registry of Unit 1 curricula and worked solutions.
- `src/data/unit1QuizBank.js`: Complete 110+ question bank categorized by taxonomy.
- `scripts/verify*.mjs`: Automated verification scripts for mathematical correctness.
- `scripts/generateProjectSnapshot.mjs`: Technical inventory snapshot generator.
- `handover_md/`: Comprehensive technical audits, future unit specifications, and file manifests.

---

## Important Change Policy

Do not alter academic formulas, truth tables, solver logic, answer keys, or question data during routine UI styling. Such changes must be validated against official course materials and accompanied by updated automated verification tests in `scripts/`. Existing URL route fragments (`#workbench`, `#atlas`, `#bridge`, `#readout`, `#folio`, `#dld`, `#workspace/...`) are backwards-compatibility requirements.
