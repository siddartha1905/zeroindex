# Quality and Release Checks

Execute the relevant checks following any substantive change. Never record a check as 'passed' unless it was actively executed against current code.

---

## 1. Automated Command-Line Checks

```bash
# Verify build bundle and asset compilation
npm run build

# Run DLD Unit 1 foundational arithmetic and number systems audit (44 checks)
node scripts/verifyUnit1Math.mjs

# Run Section 1.5 decimal and binary complements audit (35 checks)
node scripts/verifySection15Math.mjs

# Run Section 1.7 logic gates and switch analogies audit (50 checks)
node scripts/verifySection17.mjs

# Run Interactive Solvers algorithmic regression suite (34 checks)
node scripts/verifyInteractiveSolvers.mjs

# Regenerate technical inventory snapshot
node scripts/generateProjectSnapshot.mjs
```

> **Note on Test Coverage**: The four existing verification scripts validate specific mathematical and architectural properties. They do not constitute exhaustive curriculum approval. All newly authored units and worked examples must include dedicated verification suites.

---

## 2. Manual Visual and Interaction Smoke Tests

- [ ] All five homepage destination cards open their respective views.
- [ ] Working route hashes (`#workbench`, `#atlas`, `#bridge`, `#readout`, `#folio`, `#dld`, `#workspace/...`) retain intended behavior.
- [ ] Browser history, back/forward buttons, and page reloads work cleanly without HTTP 404 errors.
- [ ] DLD Unit 1 workspace, 5 interactive solvers, and Practice Arena work without console errors.
- [ ] No unapproved sample articles or essays are presented as published faculty works.
- [ ] No dead Overleaf or placeholder Google Drive links are rendered as active anchors.
- [ ] Mobile responsive layout, keyboard focus rings, and touch targets work cleanly on small screens.
- [ ] PWA installation prompts and service worker caching function properly.

---

## 3. Pre-Commit and Release Checklist

- [ ] Git diff inspected to confirm no unintended file changes or secrets.
- [ ] All automated test scripts executed and verified passing.
- [ ] `CURRENT_STATE.md` and `CONTENT_REGISTRY.md` updated if status or availability changed.
- [ ] `CHANGELOG.md` entry created for substantive changes.
- [ ] `ROADMAP.md` and `DECISIONS.md` updated if priorities or architectural choices shifted.
- [ ] Technical snapshot refreshed with `node scripts/generateProjectSnapshot.mjs`.
- [ ] User approval received before pushing to GitHub or deploying to Vercel.
