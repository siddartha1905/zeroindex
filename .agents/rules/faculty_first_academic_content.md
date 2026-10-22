---
description: Permanent ZeroIndex Faculty-First Academic Content Rule for authentic classroom pedagogy
---

# ZeroIndex Faculty-First Academic Content Rule

This rule governs all academic content development, curriculum refinement, and formula integration across ZeroIndex, including Digital Logic Design (DLD) and all future engineering subjects.

## Core Principle

ZeroIndex exists to reflect the authentic teaching methods, board explanations, formulas, shortcuts, and insights used by the faculty author in the classroom. When classroom board notes and textbook presentations differ in arrangement or emphasis, the faculty author's verified classroom methodology takes presentation priority.

## The 12 Integration Principles

Whenever the faculty author supplies handwritten classroom notes, board photographs, formulas, shortcuts, definitions, diagrams, exam techniques, or explanations:

1. **Identify the exact scope**: Pinpoint the precise subject, unit, section, and sub-concept addressed by the faculty material.
2. **Read and interpret faithfully**: Read handwritten and whiteboard material with academic care, preserving the faculty's terminology, notation, and pedagogical sequence.
3. **Verify mathematical correctness**: Validate all formulas, derivations, and numerical examples mathematically (e.g. Base-10 balances, truth-table equivalence, algebraic proofs).
4. **Compare with existing content**: Check existing lesson text, interactive cards, solvers, question banks, and revision sheets to identify gaps, differing notation, or opportunities for alignment.
5. **Give classroom methods priority**: Present the faculty's preferred formulas and board methods as the primary instructional pathway students encounter first.
6. **Retain textbook equivalents as supporting references**: Keep standard textbook notations (e.g. standard textbook formulas like `(r^n - 1) - N`) as secondary equivalents to ensure students are prepared for external exam phrasing.
7. **Selective, high-yield integration**: Integrate content that genuinely clarifies concepts or builds exam confidence; avoid dumping large, uncurated blocks of text.
8. **Preserve existing verified infrastructure**: Protect established solvers, question banks, and mathematical engines unless a genuine mathematical error is uncovered.
9. **Natural integration into existing lesson content**: When faculty-supplied classroom notes or formulas are provided, verify their technical correctness and integrate them naturally into the appropriate EXISTING lesson content. Do not automatically introduce separate Faculty Method panels, badges, new tabs or repeated explanations. Prefer minimal, precise changes to existing definitions, formulas, examples, diagrams and revision notes. Explicit faculty attribution in the public UI is not required unless requested.
10. **Open technical dialogue on discrepancies**: If a faculty note contains a mathematical slip or typographical ambiguity, formulate a respectful, precise mathematical explanation instead of silently modifying the formula.
11. **Do not invent ambiguous transcriptions**: If handwriting or symbols are genuinely ambiguous, flag the uncertainty explicitly for faculty review rather than guessing.
12. **Maintain cross-lesson consistency**: Ensure displayed formulas, worked examples, practice solutions, solver explanations, and quick revision sheets maintain uniform formula definitions throughout the portal.

## Section 1.5 Canonical Complement Formulas

Under this rule, Section 1.5 (Complements) permanently establishes:

- **Radix complement (r's complement):**
  `r's complement = r^n - N`
- **Diminished radix complement ((r-1)'s complement):**
  `(r-1)'s complement = r^n - N - 1` (Primary displayed expression)
  `Secondary textbook equivalent: (r^n - 1) - N`
- **Relationship between complements:**
  `(r-1)'s complement = r's complement - 1`
  `r's complement = (r-1)'s complement + 1`
- **Parameters:**
  `r` = radix or base.
  `n` = fixed number of digits (for `N != 0`).
  `N` = given number.
