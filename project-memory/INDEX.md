# ZeroIndex Project Memory

**Purpose:** a portable, version-controlled record of what ZeroIndex is, what has actually been built, why decisions were made, and how to continue safely after months away or with a different AI tool.

**Read in this order:**

1. `CURRENT_STATE.md`: present verified state and known risks.
2. `ROADMAP.md`: next steps, phases and release gates.
3. `AI_HANDOFF.md`: rapid restart procedure and non-negotiable rules.
4. `ARCHITECTURE.md`: technology, files, how to run the project.
5. `CONTENT_REGISTRY.md`: published, drafted and planned teaching/editorial content.
6. `DECISIONS.md`: binding decisions and reasons.
7. `CHANGELOG.md`: significant completed changes and evidence.
8. `QUALITY_CHECKS.md`: build, tests, manual QA and known limits.
9. `sessions/`: dated milestone notes.
10. `prompts/`: reusable prompts and prompt-history index.
11. `TECHNICAL_SNAPSHOT.md`: generated non-editorial technical inventory.

## Handover and Reference Documents

In addition to this memory system, comprehensive technical and academic audits are maintained in the root `handover_md/` directory:
- `handover_md/ZEROIndex_PROJECT_HANDOVER.md`: Master architectural briefing.
- `handover_md/DLD_UNIT_1_TECHNICAL_AND_ACADEMIC_AUDIT.md`: DLD Unit 1 academic audit and test matrix.
- `handover_md/DLD_FUTURE_UNITS_AND_ROADMAP.md`: Curriculum and engineering blueprint for Units 2 through 5.
- `handover_md/PROJECT_FILE_AND_ASSET_MANIFEST.md`: Exhaustive file-by-file inventory and interdependency tree.

## How updates work

- **Developer/AI updates the narrative docs as changes occur.** GitHub does not automatically know that a lesson is academically complete or an article is approved.
- **Technical inventory is machine-generated.** Run `node scripts/generateProjectSnapshot.mjs` after structural changes; review and commit output.
- **Significant commits** should include matching project-memory updates. Minor formatting-only changes can use a short changelog note or no entry if they do not affect function, status, or decisions.
- Never confuse proposed work with a tested, approved release.

The files in this project memory system reflect the reconciled baseline as of October 19, 2026, aligned with Git commit `c79f3ed` and current production source.
