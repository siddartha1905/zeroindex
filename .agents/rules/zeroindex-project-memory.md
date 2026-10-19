---
description: Maintain factual, version-controlled ZeroIndex project memory alongside code changes
---

# ZeroIndex Project Memory Maintenance

Before implementation, read `AGENTS.md` and `project-memory/INDEX.md`. Preserve other existing workspace rules, including the local preview link rule (`always_provide_preview_link.md`).

For every important development task, follow this exact sequence:
1. Check the existing Project Memory status before changing code.
2. Identify the relevant existing functionality.
3. Make the approved changes.
4. Run appropriate tests.
5. Update the documentation to record actual results.
6. Record important decisions and outstanding work.
7. Save a session note for significant development milestones.
8. Generate the technical snapshot when the project structure changes (`node scripts/generateProjectSnapshot.mjs`).
9. Report the files changed and verification performed.
10. Request approval before pushing to GitHub or deploying to Vercel.

Do not silently mark work complete, invent percentages, make false publication claims, or modify files solely to create the appearance of progress. Update records before asking for commit/push approval; never push without permission.
