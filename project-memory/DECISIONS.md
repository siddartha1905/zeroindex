# Decision Register

Record important architectural, design, and academic decisions with their date, rationale, and consequences. Retain historical decisions to preserve institutional context.

---

## D-001 | 2026-10-19 | Five Permanent Architectural Pillars

- **Decision**: The Workbench, The Atlas, The Bridge, The Readout, and The Folio are distinct, permanent top-level destinations.
- **Rationale**: Academic curriculum courses, visual skill roadmaps, placement preparation, faculty monographs, and intellectual essays serve different student needs and modes of study.
- **Consequences**: Preserve these five pillar labels, URLs, and navigation targets across all future refactors.

---

## D-002 | 2026-10-19 | Distinct Hero Illustrations for Home and Academics

- **Decision**: Mount the Knowledge Tree illustration on the Level 0 Flagship homepage and From Zero to Possibility on the Workbench / Academics landing.
- **Rationale**: The Flagship homepage introduces the overarching computing stack; the Workbench focuses on foundational silicon logic.
- **Consequences**: Prevent subject-specific DLD inventories from overwhelming the main ecosystem portal.

---

## D-003 | 2026-10-19 | Academic Resource Distribution Integrity

- **Decision**: Eliminate all Overleaf destinations. Show non-clickable informational placeholders until authentic, verified Google Drive links are provided by the faculty lead.
- **Rationale**: Dead or broken external links compromise student trust and violate academic standards.
- **Consequences**: Resource link updates must be centralized and verified before being rendered as active anchors.

---

## D-004 | 2026-10-19 | Faculty Publication Approval Gate

- **Decision**: The six prewritten sample pieces in Readout and Folio are unapproved drafts and must be unpublished in Phase 1A.
- **Rationale**: Unreviewed articles must not be publicly attributed to the faculty lead or institutional department.
- **Consequences**: Readout and Folio will maintain clean, publication-ready landing templates until authentic articles are reviewed and approved.

---

## D-005 | 2026-10-19 | Incremental Phased Development Sequence

- **Decision**: Execute development in small, verified sequential phases: Phase 1A (Content & Availability Fixes) -> Phase 1B (Routing & Accessibility) -> Phase 1C (Four-Pillar Foundations) -> Phase 1D (First Approved Content) -> Phase 2+ (Workbench review & Unit 2 development).
- **Rationale**: Protects working DLD Unit 1 code from regressions caused by sweeping parallel rewrites.
- **Consequences**: Every phase has explicit release gates and verification checkpoints.

---

## D-006 | 2026-10-19 | Durable Version-Controlled Project Memory

- **Decision**: Maintain a version-controlled `project-memory/` directory alongside `AGENTS.md` and Antigravity workspace rules in `.agents/rules/`.
- **Rationale**: Ensures technical knowledge, design decisions, and status records persist across AI development sessions and multi-year maintenance intervals.
- **Consequences**: All substantive development tasks must update Project Memory records before requesting commit/push permission.

---

## D-007 | 2026-10-19 | Centralized Academic Availability and Study Resource Configuration

- **Decision**: Centralize all DLD study resource links in `src/data/dldResourceConfig.js` and curriculum availability status in `src/data/dldAvailabilityConfig.js`. Standardize non-clickable Google Drive placeholders with message "Material link will be added soon."
- **Rationale**: Avoids duplicating resource URLs and status strings across disparate components (`SyllabusView`, `ZeroIndexSideWings`, `DldWorkspace`, `DldSubjectHome`). Allows instantaneous activation of Drive folders when verified URLs are supplied, without modifying presentation markup.
- **Consequences**: External Drive links must be registered only in `dldResourceConfig.js`. Unit availability flags must only be maintained in `dldAvailabilityConfig.js`.

---

## D-008 | 2026-10-19 | Safe Archival of Unapproved Content Outside Distribution

- **Decision**: Extract unapproved sample articles and essays into offline archives (`unpublished-archive/readout-articles-archive.json` and `unpublished-archive/folio-essays-archive.json`) and exclude the directory from Git via `.gitignore`. Render tasteful empty states in The Readout and The Folio.
- **Rationale**: Guarantees that unreviewed and unapproved materials are never compiled into the client production bundle or published to a public repository, while safely preserving the original author draft text for future review.
- **Consequences**: Production builds will not contain unapproved texts. No publications may appear in Readout or Folio without explicit author approval.

---

## Decision Record Template

```markdown
### D-NNN | YYYY-MM-DD | Short Factual Title

- **Decision:**
- **Rationale / Alternatives Considered:**
- **Affected Files and Components:**
- **Approval Evidence:**
- **Verification / Follow-up Requirements:**
```
