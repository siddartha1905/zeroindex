---
description: Permanent ZeroIndex academic presentation conventions and pedagogical rules
---

# ZeroIndex Academic Presentation Conventions

This rule establishes permanent academic and visual presentation conventions for ZeroIndex instructional content, adhering strictly to the WHY-FIRST teaching philosophy.

## 1. Introductory Bullet-Point Structure

Replace long introductory paragraphs with short, properly arranged, informative bullet points for:
- WHY a topic is required.
- WHERE it is used.
- WHAT it means.
- HOW a method works.
- WHY a particular method is chosen.
- WHAT students must remember.

Guidelines:
- Each bullet point must communicate one clear, self-contained idea.
- Provide approximately 4 to 6 meaningful bullet points rather than an excessive collection of fragmented statements.
- Avoid large, intimidating walls of introductory prose and oversized quotation wrappers.

## 2. Restrained Concept and Keyword Emphasis

Within each introductory or conceptual point, highlight the central learning concept:
- Use bold typography for primary keywords.
- Use restrained forest-green styling (`text-[#1E4537]` or `text-[#285C49]`) for core concept terms.
- Use muted blue (`text-[#1E3A8A]` or `text-[#1D4ED8]`) or warm copper (`text-[#C38A63]`) when semantically meaningful (such as maxterm/POS distinction).
- Use compact formula code tags (`font-mono font-bold`) for mathematical expressions.
- Do NOT highlight every word.
- Do NOT use bright gradients, metallic effects, animated emphasis, or visually noisy decorations.
- Ensure the student can immediately recognize the core concept when scanning.

## 3. Preservation of Academic Accuracy

- Formal definitions must remain complete, rigorous, and suitable for university examination answers.
- A definition hierarchy should lead with an immediately understandable Simple Definition, followed by the complete Formal Definition, Construction Rules, Examples, and Key Properties.
- Clarifying segments may include: "In simple words", "Important point", "Example", and "Remember this".
- Never shorten a formal definition to the point where it becomes mathematically inaccurate.
- Detailed worked solutions may retain thorough step-by-step explanations where genuinely necessary.

## 4. Mandatory Mathematical Symbols (Sigma and Pi)

- In all lessons involving canonical forms, SOP/POS representations, and Karnaugh Maps, formulas MUST render actual Unicode mathematical glyphs:
  - Capital Sigma: Σ (`\u03A3`)
  - Capital Pi: Π (`\u03A0`)
- Do NOT display the English words "Sigma" or "Pi" in place of mathematical symbols inside formulas (e.g. use `F(A,B) = Σm(1,2,3)`, NEVER `F(A,B) = Sigma m(1,2,3)`).
- The words Sigma and Pi may only appear in explanatory prose describing the symbols.
- On first introduction in a lesson, provide a brief explanatory guide:
  - Σ (capital sigma): represents the sum, or logical OR, of selected minterms.
  - Π (capital pi): represents the product, or logical AND, of selected maxterms.
  - Lowercase m denotes a minterm (`m_i`).
  - Uppercase M denotes a maxterm (`M_i`).

## 5. Standardized Complement Terminology

- Consistently use "complemented" and "uncomplemented" throughout instructional text (e.g. "complemented variable", "uncomplemented variable") rather than solely "primed variable".
- Note on first occurrence: "A' means A complement. It may also be read as A prime."
- Maintain standard apostrophe notation (`A'`) consistently.
- Polarity rules:
  - Minterms: 0 maps to complemented variable (`A'`), 1 maps to uncomplemented variable (`A`).
  - Maxterms: 0 maps to uncomplemented variable (`A`), 1 maps to complemented variable (`A'`).

## 6. Dash-Free Formatting Requirement

- Strictly zero em-dashes (`\u2014`) and zero en-dashes (`\u2013`) in all code, documentation, and user-facing text. Use standard hyphens, colons, or parentheses.
