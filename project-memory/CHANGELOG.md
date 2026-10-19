# ZeroIndex Development Changelog

Record significant completed work in this document. Future intentions belong in `ROADMAP.md`. Each entry must state the actual change, affected files, tests performed, and deployment state.

---

## 2026-10-19: Phase 1A Stabilization (Links, Availability, Archival)

- **Type**: fix / content / refactor
- **Summary**: Implemented Phase 1A of the ZeroIndex stabilization plan on dedicated branch `phase-1a-stabilization`. Completely removed all active Overleaf URLs and destinations across the entire codebase. Created centralized Google Drive study material configuration with non-clickable status cards ("Material link will be added soon."). Corrected DLD availability flags (Unit 1 available pending review; Units 2-5 planned in development; no false full-course claims). Corrected Atlas and Bridge claims (removed unsupported course completion claims and fabricated question counts; honestly labeled as roadmap/interview outlines). Unpublished six unapproved pieces (3 Readout articles, 3 Folio essays) to offline archive excluded from Git and build output; rendered tasteful empty states.
- **Affected Files**:
  * Created: `src/data/dldResourceConfig.js`, `src/data/dldAvailabilityConfig.js`
  * Preserved offline: `unpublished-archive/readout-articles-archive.json`, `unpublished-archive/folio-essays-archive.json`
  * Modified: `.gitignore`, `README.md`, `src/data/portalConfig.js`, `src/data/dldUnit1.js`, `src/data/dldUnit1Master.js`, `src/data/dldSyllabus.js`
  * Modified components: `src/components/SyllabusView.jsx`, `src/components/ZeroIndexSideWings.jsx`, `src/components/DldWorkspace.jsx`, `src/components/UnitWorkspace.jsx`, `src/components/AcademicsHub.jsx`, `src/components/DldSubjectHome.jsx`, `src/components/AtlasLanding.jsx`, `src/components/BridgeLanding.jsx`, `src/components/ReadoutLanding.jsx`, `src/components/FolioLanding.jsx`
  * Project Memory: `CURRENT_STATE.md`, `CONTENT_REGISTRY.md`, `ROADMAP.md`, `DECISIONS.md`, `CHANGELOG.md`, `QUALITY_CHECKS.md`, `TECHNICAL_SNAPSHOT.md`, `project-memory/sessions/2026-10-19-phase-1a-corrections.md`
- **Verification Actually Performed**:
  * Executed 4 verification scripts: 163 checks passed (100% accuracy, 0 failures).
  * Executed `npm run build`: 3,375 modules transformed, 0 errors, build completed in 3.68s.
  * Verified unpublished archives absent from client distribution bundle.
  * Verified zero em-dashes and zero en-dashes across all modified and created source files.
  * Verified local server responding with HTTP 200 OK on `http://localhost:3002/`.
- **Approval / Publication State**: Complete on local branch `phase-1a-stabilization`. Unapproved articles safely excluded. No push or deployment without user approval.
- **Commit / Tag / Preview URL:** Branch `phase-1a-stabilization`; Preview: `http://localhost:3002/`.
- **Remaining Work:** Awaiting user signoff to merge Phase 1A and begin Phase 1B (Routing & Usability).

---

## 2026-10-19: Project Memory System and Master Handover Suite

- **Type**: Documentation / Maintenance Architecture
- **Summary**: Installed the permanent Project Memory system (`project-memory/`), root AI agent rules (`AGENTS.md`), Antigravity workspace rules (`.agents/rules/zeroindex-project-memory.md`), automated technical inventory script (`scripts/generateProjectSnapshot.mjs`), and GitHub Actions consistency workflow (`.github/workflows/project-memory-check.yml`).
- **Affected Files**:
  * Added: `AGENTS.md`, `README_START_HERE.md`
  * Added: `.agents/rules/zeroindex-project-memory.md` (preserved `always_provide_preview_link.md`)
  * Added: `.github/workflows/project-memory-check.yml`
  * Added: `scripts/generateProjectSnapshot.mjs`
  * Added: `project-memory/INDEX.md`, `CURRENT_STATE.md`, `ROADMAP.md`, `ARCHITECTURE.md`, `AI_HANDOFF.md`, `CONTENT_REGISTRY.md`, `DECISIONS.md`, `CHANGELOG.md`, `QUALITY_CHECKS.md`, `TECHNICAL_SNAPSHOT.md`
  * Added: `project-memory/prompts/AI_RESUME_PROMPT.md`, `project-memory/prompts/PROMPT_LOG.md`
  * Added: `project-memory/sessions/SESSION_TEMPLATE.md`, `project-memory/sessions/2026-10-19-project-memory-setup.md`
  * Reference Handover Docs: `handover_md/ZEROIndex_PROJECT_HANDOVER.md`, `handover_md/DLD_UNIT_1_TECHNICAL_AND_ACADEMIC_AUDIT.md`, `handover_md/DLD_FUTURE_UNITS_AND_ROADMAP.md`, `handover_md/PROJECT_FILE_AND_ASSET_MANIFEST.md`
- **Verification Performed**:
  * Executed `node scripts/generateProjectSnapshot.mjs`: Wrote `TECHNICAL_SNAPSHOT.md` (48 source files listed).
  * Executed `npm run build`: Production bundle succeeded in 4.88s (0 errors).
  * Executed 4 verification test scripts: 163 total checks passed, 0 failed.
  * Verified zero modifications to application source files (`src/`).
- **Deployment State**: Local development verified on `http://localhost:3002/`. No automatic push or deployment performed.
- **Next Task**: Awaiting user authorization to begin Phase 1A.

---

## Entry Template

```markdown
### YYYY-MM-DD: Short, Factual Title

- **Type**: feature / fix / content / refactor / release / documentation
- **Changes**:
- **Affected Files**:
- **Verification Actually Performed**:
- **Approval / Publication State**:
- **Commit / Tag / Preview URL:**
- **Remaining Work:**
```
