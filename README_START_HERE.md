# ZeroIndex Project Memory Starter

This archive is **not an updated ZeroIndex website**. It is a set of Markdown records, two AI-agent guidance files, and one safe local inventory script to merge into your existing Antigravity project.

## Recommended use

1. Extract to a temporary folder on your Mac.
2. Give Antigravity the setup prompt supplied by ChatGPT. Tell it to merge this starter with current source and Git state, preserving existing `.agents/rules/` files.
3. Ask Antigravity to **reconcile** the dated 2026-10-19 baseline before marking any phase complete.
4. Run `node scripts/generateProjectSnapshot.mjs` in the actual ZeroIndex root to populate `project-memory/TECHNICAL_SNAPSHOT.md`.
5. Review the documentation diff; commit and push only when you authorize it.
6. During Phases 1A-1D and beyond, update docs as an explicit completion step.

The source ZIP from October 19 showed an existing `.agents/rules/always_provide_preview_link.md`; never delete or replace it. The starter rule is additive.

**Automation limitation:** the inventory script can automatically enumerate technical facts. Publication approvals, learning completion and test outcomes still require explicit source inspection and human/agent updates; GitHub does not infer them.

## Automated consistency check on GitHub

The optional `.github/workflows/project-memory-check.yml` runs on GitHub pushes and pull requests, regenerates `TECHNICAL_SNAPSHOT.md`, and fails if the committed inventory is outdated. It **does not auto-push code or rewrite the human-maintained project status**. If this workflow conflicts with an existing CI configuration, review it before enabling.
