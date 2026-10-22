# ZeroIndex working agreement for AI development agents

Read `project-memory/INDEX.md`, `project-memory/CURRENT_STATE.md`, and `project-memory/AI_HANDOFF.md` before making significant changes. Check the actual source, Git state, and test results; the documentation is context, not proof.

For every substantive code/content change:
1. Check the existing Project Memory status before changing code.
2. Identify the relevant existing functionality.
3. Make the approved changes.
4. Run appropriate tests.
5. Update the documentation to record actual results (`CURRENT_STATE.md`, `CHANGELOG.md`, `ROADMAP.md`, `CONTENT_REGISTRY.md`, `ARCHITECTURE.md`, `DECISIONS.md`).
6. Record important decisions and outstanding work.
7. Save a session note in `project-memory/sessions/` for significant development milestones.
8. Generate the technical snapshot when the project structure changes (`node scripts/generateProjectSnapshot.mjs`).
9. Report the files changed and verification performed.
10. Request approval before pushing to GitHub or deploying to Vercel.

Never fabricate progress percentages, publications, test results, working routes, academic correctness, external links, deployment success, or author approval. Do not publish or push without explicit user approval. Never commit secrets, private student information, or unpublished content intended to remain private. Keep approved URLs and DLD Unit 1 working. Preserve existing `.agents/rules/` instructions.

## Permanent Academic Presentation Conventions
1. **Introductory Bullets**: Replace long introductory paragraphs with 4 to 6 structured, informative bullet points (WHY, WHERE, WHAT, HOW, WHY CHOSEN, REMEMBER) communicating one clear idea each.
2. **Restrained Keyword Emphasis**: Highlight central concepts in bold typography with restrained forest-green, muted blue, or copper accents. No bright gradients, metallic effects, or visual noise.
3. **Academic Accuracy Hierarchy**: Lead with an immediately understandable Simple Definition, followed by the rigorous Formal Definition suitable for exams, construction rules, examples, and key properties.
4. **Mandatory Mathematical Symbols**: Always render actual Unicode Σ (`\u03A3`) and Π (`\u03A0`) in all canonical form, SOP/POS, and K-Map formulas. Never substitute the words "Sigma" or "Pi" inside formulas.
5. **Standardized Complement Terminology**: Use "complemented" and "uncomplemented" consistently ($A'$ means $A$ complement / $A$ prime).
6. **Zero-Dash Standard**: Strictly zero em-dashes and zero en-dashes across all code, content, and documentation files.
7. **Faculty-First Academic Content Rule**: Always give faculty-supplied classroom notes, board explanations, and preferred formulas presentation priority over standard textbook arrangements, while preserving textbook equivalents as secondary references. Reflect the exact mathematical arrangement used in classroom instruction (such as r^n - N - 1 for diminished radix complements) and verify mathematical accuracy before integration. When faculty-supplied classroom notes or formulas are provided, verify their technical correctness and integrate them naturally into the appropriate EXISTING lesson content. Do not automatically introduce separate Faculty Method panels, badges, new tabs or repeated explanations. Prefer minimal, precise changes to existing definitions, formulas, examples, diagrams and revision notes. Explicit faculty attribution in the public UI is not required unless requested. See `.agents/rules/faculty_first_academic_content.md`.

To transfer this work to another assistant, share `project-memory/AI_HANDOFF.md`, `CURRENT_STATE.md`, `ROADMAP.md`, `DECISIONS.md`, `QUALITY_CHECKS.md`, the relevant content registry and source files. The repo is the source of truth; revalidate any dated claims.

