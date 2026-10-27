---
description: Prioritize core development over repetitive documentation, batching project-memory updates to explicit checkpoints
---

# ZeroIndex Fast Development and Batched Documentation Policy

## 1. During Individual Development Tasks
Focus primarily on:
- Implementing the requested functionality.
- Modifying the necessary application source files.
- Correcting relevant errors.
- Performing focused verification.
- Confirming that existing functionality remains intact.

Do NOT automatically update the following files after every minor task:
- project-memory/DECISIONS.md
- project-memory/ROADMAP.md
- project-memory/CURRENT_STATE.md
- project-memory/CHANGELOG.md
- project-memory/TECHNICAL_SNAPSHOT.md
- project-memory/sessions/*

Do not repeatedly regenerate technical snapshots or run documentation synchronization scripts during intermediate coding tasks.
Exception: Update essential specifications, migrations, security documentation or files required for correct implementation when the task genuinely depends on them.

## 2. Lightweight Reporting
At the end of each individual task, provide only:
1. Changes completed.
2. Files modified.
3. Relevant test results.
4. Issues remaining.
5. Recommended next action.

Present the report in one easy-to-copy Markdown code block.

## 3. Consolidated Project-Memory Updates
Only when the faculty owner explicitly requests a development checkpoint, project-memory synchronization, or end-of-day closure:
- Review accumulated local changes.
- Update DECISIONS.md with genuinely new or superseded decisions.
- Update ROADMAP.md with actual progress.
- Update CURRENT_STATE.md to reflect the latest verified implementation.
- Add meaningful CHANGELOG entries.
- Regenerate TECHNICAL_SNAPSHOT.md once if required.
- Create one consolidated session summary only if useful.

## 4. Local-First Workflow
Continue all development on the local ZeroIndex workspace.
Do not commit, push, merge, or deploy during intermediate tasks.
Run focused tests during development. Reserve broad regression testing for the final release checkpoint.

## 5. End-of-Day Release
Only after explicit approval:
1. Review accumulated code changes.
2. Synchronize necessary project documentation once.
3. Run final regression and production-build checks.
4. Create one consolidated Git commit, or the minimum logically necessary commits.
5. Push safely to the existing GitHub repository.
6. Verify the corresponding Vercel production deployment.

