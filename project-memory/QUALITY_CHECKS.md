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

### Verified Test Run: Foundation Development Sprint Production Release (2026-10-19)

| Test Script / Build | Scope | Result | Details |
|---|---|---|---|
| `npm run build` | Vite 6 Production Bundle on `main` | **PASS** | 3,379 modules transformed in 3.07s; 0 errors; unapproved archives verified absent |
| `verifyUnit1Math.mjs` | DLD Radix & Number Systems | **PASS** | 44/44 checks passed (100% accuracy) |
| `verifySection15Math.mjs` | Complements & Subtraction | **PASS** | 35/35 checks passed (100% accuracy) |
| `verifySection17.mjs` | 7-Gate Logic Explorer & Waves | **PASS** | 50/50 checks passed (100% accuracy) |
| `verifyInteractiveSolvers.mjs` | 5 Interactive Solvers Suite | **PASS** | 34/34 checks passed (100% accuracy) |
| Dash Constraint Check | Em-dash & En-dash Scan | **PASS** | 0 em-dashes, 0 en-dashes across all modified/new files |
| Dev Server Health | Local HTTP Endpoint | **PASS** | Responding HTTP 200 OK on `http://localhost:3002/` |
| Viewport Zoom Fix | `index.html` Meta Viewport | **PASS** | Removed `maximum-scale=1.0` and `user-scalable=no` for WCAG compliance |
| Modal Accessibility | `AboutModal` & `InstallModal` | **PASS** | Keyboard `Escape` listener and backdrop dismiss verified |

> **Qualification on Academic Correctness**: Automated tests verify specific mathematical algorithms, conversions, truth tables, and complement arithmetic. Passing these tests does not constitute exhaustive academic approval of all instructional content, which remains subject to comprehensive faculty review.

---

## 2. Functional Verification & Smoke Testing Record

### Performed and Verified:
- [x] Production build passes cleanly with 0 errors.
- [x] All 4 automated mathematical test suites pass (163 total checks).
- [x] Zero Overleaf links present across the repository.
- [x] Google Drive textbook and reference placeholders are non-clickable ("Material link will be added soon.").
- [x] Readout and Folio empty states display neutral, natural availability wording without unnecessary status badges.
- [x] DLD Units 2 through 5 are labeled "Planned" across all configuration files and workspace views without claiming active development.
- [x] Six unpublished sample pieces are safely stored in `unpublished-archive/` outside git and production bundles.
- [x] Responsive layout code verified via Tailwind CSS utility classes.

### Not Executed in Automated Test Session (Environment Boundary):
- [ ] Interactive browser viewport resizing and automated browser click-through via Playwright could not be executed due to Playwright driver download failure (HTTP 404 from Azure Edge CDN). Code audit and component verification were performed instead. Real browser verification should be performed manually by the developer on `http://localhost:3002/`.

---

## 3. Pre-Commit and Release Checklist

- [ ] Git diff inspected to confirm no unintended file changes or secrets.
- [ ] All automated test scripts executed and verified passing.
- [ ] `CURRENT_STATE.md` and `CONTENT_REGISTRY.md` updated if status or availability changed.
- [ ] `CHANGELOG.md` entry created for substantive changes.
- [ ] `ROADMAP.md` and `DECISIONS.md` updated if priorities or architectural choices shifted.
- [ ] Technical snapshot refreshed with `node scripts/generateProjectSnapshot.mjs`.
- [ ] User approval received before pushing to GitHub or deploying to Vercel.
