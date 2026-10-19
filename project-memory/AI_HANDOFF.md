# AI Handoff and Rapid Restart

## Ten-Minute Restart Procedure

1. Read `AGENTS.md`, `project-memory/INDEX.md`, `CURRENT_STATE.md`, `DECISIONS.md`, `ROADMAP.md`, and `CONTENT_REGISTRY.md`.
2. Inspect the current Git branch and commit history (`git log -n 5 --oneline`), `package.json`, actual source files, and test suites.
3. Check the most recent session note under `project-memory/sessions/` and verify known open tasks.
4. Verify the current local development server (`http://localhost:3002/`).
5. Before modifying any code, clearly restate the requested task, identify affected files, and state the verification plan.
6. Make small, focused edits. Do not perform sweeping refactors without explicit authorization.
7. Run the relevant verification scripts and `npm run build`.
8. Update the Project Memory records (`CURRENT_STATE.md`, `CHANGELOG.md`, `TECHNICAL_SNAPSHOT.md`).
9. Propose your changes clearly, report test results, and ask for explicit permission before committing, pushing to GitHub, or deploying to Vercel.

---

## Stable Architectural Requirements

- **Five Distinct Pillars**: The Workbench, The Atlas, The Bridge, The Readout, and The Folio must remain distinct top-level destinations.
- **Two-Stage Home Layout**: Level 0 Flagship Portal (Deep Obsidian `#0B0F17`) acts as the ecosystem gateway; Level 1 Academics Hub (Warm Alabaster `#F8F9FA`) houses the curriculum tracks.
- **Illustration Placement**: The Knowledge Tree illustration belongs on the homepage; From Zero to Possibility belongs on the Workbench.
- **External Resource Integrity**: No live Overleaf links. Do not fabricate Google Drive URLs.
- **Publication Gate**: The 6 sample articles/essays in source are unapproved placeholders; do not publish them without written author approval.
- **Academic Protection**: Protect DLD Unit 1 teaching, worked models, solvers, and quiz questions from unintended modification.
- **Editorial Tone**: Maintain the scholarly, refined editorial design aesthetic (serif typography, muted slate surfaces, amber/emerald accents).

---

## Essential Development and Verification Commands

```bash
# Start local development server
npm run dev

# Run production build
npm run build

# Run automated academic verification test suites (163 checks)
node scripts/verifyUnit1Math.mjs
node scripts/verifySection15Math.mjs
node scripts/verifySection17.mjs
node scripts/verifyInteractiveSolvers.mjs

# Regenerate technical snapshot inventory
node scripts/generateProjectSnapshot.mjs
```

---

## Instructions for Transferring to Another AI Assistant

When transitioning work to another AI agent, provide:
1. `AGENTS.md` and `.agents/rules/`
2. The entire `project-memory/` directory
3. The `handover_md/` comprehensive audit files
4. Instructions to read `CURRENT_STATE.md` and reconcile with current Git state before proposing changes.
