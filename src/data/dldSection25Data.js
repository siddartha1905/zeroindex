/**
 * Digital Logic Design (DLD) - Section 2.5 Data Module
 * Section Title: Karnaugh Maps - Fundamentals, Two-Variable, Three-Variable, Four-Variable, POS Grouping, and Don't-Care Minimization
 * 
 * Strict formatting: Zero em-dashes and zero en-dashes throughout.
 * All formulas use actual Unicode mathematical symbols: Σ (Σ) and Π (Π).
 */

export const dldSection25Data = {
  id: "2.5",
  number: "2.5",
  title: "Karnaugh Maps - Fundamentals, Two-Variable, Three-Variable, Four-Variable, POS Grouping, and Don't-Care Minimization",
  badge: "Visual Minimization",
  status: "Available",
  estimatedReadTime: "28 min read",
  dataScienceConnection: "In feature selection and hyper-parameter space pruning, high-dimensional grid searches often have redundant dimensions where model performance remains invariant. Karnaugh map grouping is mathematically identical to finding minimal orthogonal hyper-rectangles in a discrete Boolean feature space, compressing decision boundaries and eliminating non-informative features.",

  overview: "The Karnaugh Map (K-Map), invented by Maurice Karnaugh at Bell Labs in 1953, is a graphical technique that transforms Boolean algebraic minimization into visual pattern recognition. By arranging truth-table minterms in a multi-dimensional grid indexed by Gray code (where adjacent cells differ by exactly one binary bit), adjacent cells satisfy the algebraic Combining Law: xy + xy' = x. Grouping adjacent cells of size 2^k (singletons, pairs, quads, octets) eliminates k changing literals immediately without tedious algebraic factoring. This section provides complete coverage of 2-, 3-, and 4-variable K-Maps, edge-wrapping, corner quads, Prime Implicants, Essential Prime Implicants, POS minimization, and don't-care conditions.",

  introductoryBullets: [
    {
      label: "WHY",
      text: "Algebraic minimization requires creative factoring tricks, consensus theorems, and term duplication that are error-prone and non-systematic for larger functions."
    },
    {
      label: "WHERE",
      text: "Karnaugh Maps are applied in digital design to simplify Boolean functions of 2, 3, 4, and 5 variables before gate-level implementation in ASICs, FPGAs, and microcontrollers."
    },
    {
      label: "WHAT",
      text: "A K-Map is an array of 2^n cells where each cell represents one minterm, ordered such that adjacent cells differ by exactly one binary literal."
    },
    {
      label: "HOW",
      text: "Cells containing 1s (for SOP) or 0s (for POS) are grouped into rectangular clusters whose sizes are powers of two (1, 2, 4, 8, 16), eliminating variables that change state across the group."
    },
    {
      label: "WHY CHOSEN",
      text: "The method guarantees finding prime implicants visually and eliminates tedious algebraic manipulation, ensuring minimal gate-count logic circuits."
    },
    {
      label: "REMEMBER",
      text: "Gray code sequence 00, 01, 11, 10 must be strictly preserved; groups must always be powers of two; and edge-wrapping enables boundary cells to combine into single minimal terms."
    }
  ],

  learningOutcomes: [
    "Explain why Gray code ordering (00, 01, 11, 10) guarantees physical and logical adjacency between adjacent cells.",
    "Formulate and enforce the 8 mandatory grouping rules: powers of two, rectangular geometry, wrapping, and overlap.",
    "Solve 2-variable, 3-variable, and 4-variable K-Maps in both Sum of Products (SOP) and Product of Sums (POS) modes.",
    "Identify Prime Implicants (PIs) and Essential Prime Implicants (EPIs) to construct minimal irredundant covers.",
    "Utilize don't-care conditions (X or d) strategically to expand group sizes without covering unnecessary cells.",
    "Handle special boundary cases: four-corner quads, isolated minterms, multiple minimal solutions, and constant functions."
  ],

  // ---------------------------------------------------------------------------
  // TAB 1: START HERE - WHY K-MAPS?
  // ---------------------------------------------------------------------------
  startHere: {
    title: "Why Karnaugh Maps? Algebraic Factoring vs Visual Grouping",
    subtitle: "How spatial Gray code organization eliminates tedious algebraic guesswork",
    videoId: "kmap-intro",
    algebraVsKMapComparison: {
      problemTitle: "Motivating Example: Simplifying a 3-Variable Function",
      functionSOP: "F(A, B, C) = A'BC + ABC + AB'C + ABC'",
      mintermsList: "m3, m7, m5, m6",
      mintermIndices: [3, 5, 6, 7],
      algebraicRoute: {
        methodName: "Algebraic Simplification Route",
        difficulty: "Difficult & Non-Systematic",
        steps: [
          {
            stepNumber: 1,
            action: "Identify that minterm ABC (m7) must be shared across three separate adjacencies.",
            expression: "F = A'BC + ABC + AB'C + ABC'",
            note: "In standard algebra, students often fail to notice that ABC can combine with all three other terms."
          },
          {
            stepNumber: 2,
            action: "Apply Idempotent Law (x + x = x) to duplicate term ABC two additional times.",
            expression: "F = (A'BC + ABC) + (AB'C + ABC) + (ABC' + ABC)",
            note: "[Idempotence x + x + x = x] This requires non-obvious creative intuition."
          },
          {
            stepNumber: 3,
            action: "Factor out common two-variable products from each bracketed pair.",
            expression: "F = BC(A' + A) + AC(B' + B) + AB(C' + C)",
            note: "[Distributive Law factoring]"
          },
          {
            stepNumber: 4,
            action: "Apply Inverse Law (x + x' = 1) and Identity Law (y · 1 = y).",
            expression: "F = BC(1) + AC(1) + AB(1)",
            note: "[Complement and Identity Laws]"
          },
          {
            stepNumber: 5,
            action: "Write the final simplified Sum of Products expression.",
            expression: "F = BC + AC + AB",
            note: "Total: 3 product terms, 6 literals. Required 4 algebraic steps and creative term duplication."
          }
        ]
      },
      kmapRoute: {
        methodName: "Karnaugh Map Visual Route",
        difficulty: "Immediate & Systematic",
        explanation: "In a 2x4 K-Map, minterms m3, m5, m6, m7 are plotted directly into their cells. Cell m7 (111) is physically adjacent to m3 (011), m5 (101), and m6 (110). Three overlapping pairs of size 2 are instantly visible without any guesswork:",
        groups: [
          { group: "G1", cells: "m3, m7", variables: "B=1, C=1 remain constant; A changes", term: "BC" },
          { group: "G2", cells: "m5, m7", variables: "A=1, C=1 remain constant; B changes", term: "AC" },
          { group: "G3", cells: "m6, m7", variables: "A=1, B=1 remain constant; C changes", term: "AB" }
        ],
        finalAnswer: "F = BC + AC + AB",
        takeaway: "Grouping adjacent 1s extracts the exact minimal expression in one visual inspection step. No algebraic factoring or term duplication required!"
      }
    },
    powerOfTwoElimination: [
      { size: 1, power: "2^0 = 1 cell", name: "Singleton", eliminated: "0 variables", remaining: "n literals (full minterm)", example: "In 4-var map: ABCD" },
      { size: 2, power: "2^1 = 2 cells", name: "Pair", eliminated: "1 variable", remaining: "n - 1 literals", example: "In 4-var map: ABC" },
      { size: 4, power: "2^2 = 4 cells", name: "Quad", eliminated: "2 variables", remaining: "n - 2 literals", example: "In 4-var map: AB" },
      { size: 8, power: "2^3 = 8 cells", name: "Octet", eliminated: "3 variables", remaining: "n - 3 literals", example: "In 4-var map: A" },
      { size: 16, power: "2^4 = 16 cells", name: "Full Map", eliminated: "4 variables", remaining: "Constant 1 (tautology)", example: "F = 1 (VCC)" }
    ],
    roadmap: [
      { step: "1. MAP", title: "Select Dimension", desc: "Choose 2x2 (2-var), 2x4 (3-var), or 4x4 (4-var) grid with standard Gray code row/column headers." },
      { step: "2. PLOT", title: "Fill Target Polarity", desc: "For SOP (Σ m), place 1 in target minterm cells; for POS (Π M), place 0 in target maxterm cells. Place X in don't-cares." },
      { step: "3. INSPECT", title: "Identify Isolated 1s", desc: "Spot essential cells that have only one possible grouping direction before forming larger groups." },
      { step: "4. MAXIMIZE", title: "Form Largest Groups", desc: "Build octets first, then quads, then pairs. Wrap across borders and overlap cells to maximize size." },
      { step: "5. EXTRACT", title: "Derive Product Terms", desc: "For each group, keep variables that remain constant and eliminate variables that change state." },
      { step: "6. COMBINE", title: "Eliminate Redundancy", desc: "Combine Essential Prime Implicants. Discard any group whose 1s are already covered by others." }
    ]
  },

  // ---------------------------------------------------------------------------
  // TAB 2: FOUNDATIONS - GRAY CODE, MAP TOPOLOGY & CELL INDEXING
  // ---------------------------------------------------------------------------
  foundations: {
    title: "Gray Code, Map Topology, and Cell Indexing",
    subtitle: "Why 00, 01, 11, 10 is mandatory and how physical adjacency reflects Boolean logic",
    grayCodeExplanation: {
      heading: "The Gray Code Requirement: Single-Bit Adjacency",
      summary: "In conventional binary counting (00, 01, 10, 11), advancing from 01 to 10 changes two bits at the same time: bit 1 changes from 0 to 1, and bit 0 changes from 1 to 0. If a K-Map used binary counting, adjacent cells would differ by two variables, making visual simplification impossible.",
      whyAdjacencyMatters: "Boolean minimization relies on the fundamental Combining Law: xy + xy' = x(y + y') = x · 1 = x. For this law to apply spatially, moving from one cell to its direct neighbor MUST change exactly one variable while keeping all other variables constant. Gray code (00, 01, 11, 10) satisfies this condition everywhere, including the wraparound from 10 back to 00.",
      comparisonTable: [
        { step: "Step 0 to 1", binary: "00 -> 01", binaryDiff: "1 bit changed (valid)", gray: "00 -> 01", grayDiff: "1 bit changed (valid)", status: "Both valid" },
        { step: "Step 1 to 2", binary: "01 -> 10", binaryDiff: "2 BITS CHANGED (INVALID!)", gray: "01 -> 11", grayDiff: "1 bit changed (valid)", status: "Binary breaks adjacency!" },
        { step: "Step 2 to 3", binary: "10 -> 11", binaryDiff: "1 bit changed (valid)", gray: "11 -> 10", grayDiff: "1 bit changed (valid)", status: "Both valid" },
        { step: "Wrap 3 to 0", binary: "11 -> 00", binaryDiff: "2 BITS CHANGED (INVALID!)", gray: "10 -> 00", grayDiff: "1 bit changed (valid)", status: "Gray wraps with 1-bit diff" }
      ]
    },
    topologicalWraparound: {
      cylindricalHorizontal: "The leftmost column (00) is adjacent to the rightmost column (10) because they differ only in the first bit. Rolling the 2D grid into a cylinder joins these columns physically.",
      cylindricalVertical: "The topmost row (00) is adjacent to the bottommost row (10) because they differ only in the first bit. Rolling vertically joins the top and bottom edges.",
      toroidalCorners: "The four outer corners of a 4x4 map - cells m0 (0000), m2 (0010), m8 (1000), and m10 (1010) - are all mutually adjacent on a continuous torus (doughnut surface). They combine into a single valid 4-cell corner quad yielding the term B'D'."
    },
    layouts: {
      twoVar: {
        name: "2-Variable K-Map (4 Cells)",
        variables: "A, B",
        rowVar: "A",
        colVar: "B",
        rows: ["0", "1"],
        cols: ["0", "1"],
        matrix: [
          [0, 1], // m0, m1
          [2, 3]  // m2, m3
        ],
        cellDetails: {
          0: { index: 0, binary: "00", minterm: "m0", term: "A'B'", row: 0, col: 0 },
          1: { index: 1, binary: "01", minterm: "m1", term: "A'B", row: 0, col: 1 },
          2: { index: 2, binary: "10", minterm: "m2", term: "AB'", row: 1, col: 0 },
          3: { index: 3, binary: "11", minterm: "m3", term: "AB", row: 1, col: 1 }
        }
      },
      threeVar: {
        name: "3-Variable K-Map (8 Cells)",
        variables: "A, B, C",
        rowVar: "A",
        colVar: "BC",
        rows: ["0", "1"],
        cols: ["00", "01", "11", "10"],
        matrix: [
          [0, 1, 3, 2], // m0, m1, m3, m2
          [4, 5, 7, 6]  // m4, m5, m7, m6
        ],
        cellDetails: {
          0: { index: 0, binary: "000", minterm: "m0", term: "A'B'C'", row: 0, col: 0 },
          1: { index: 1, binary: "001", minterm: "m1", term: "A'B'C", row: 0, col: 1 },
          3: { index: 3, binary: "011", minterm: "m3", term: "A'BC", row: 0, col: 2 },
          2: { index: 2, binary: "010", minterm: "m2", term: "A'BC'", row: 0, col: 3 },
          4: { index: 4, binary: "100", minterm: "m4", term: "AB'C'", row: 1, col: 0 },
          5: { index: 5, binary: "101", minterm: "m5", term: "AB'C", row: 1, col: 1 },
          7: { index: 7, binary: "111", minterm: "m7", term: "ABC", row: 1, col: 2 },
          6: { index: 6, binary: "110", minterm: "m6", term: "ABC'", row: 1, col: 3 }
        }
      },
      fourVar: {
        name: "4-Variable K-Map (16 Cells)",
        variables: "A, B, C, D",
        rowVar: "AB",
        colVar: "CD",
        rows: ["00", "01", "11", "10"],
        cols: ["00", "01", "11", "10"],
        matrix: [
          [0, 1, 3, 2],       // Row 00: m0, m1, m3, m2
          [4, 5, 7, 6],       // Row 01: m4, m5, m7, m6
          [12, 13, 15, 14],   // Row 11: m12, m13, m15, m14 (Note row 11 precedes 10!)
          [8, 9, 11, 10]      // Row 10: m8, m9, m11, m10
        ],
        cellDetails: {
          0: { index: 0, binary: "0000", minterm: "m0", term: "A'B'C'D'", row: 0, col: 0 },
          1: { index: 1, binary: "0001", minterm: "m1", term: "A'B'C'D", row: 0, col: 1 },
          3: { index: 3, binary: "0011", minterm: "m3", term: "A'B'CD", row: 0, col: 2 },
          2: { index: 2, binary: "0010", minterm: "m2", term: "A'B'CD'", row: 0, col: 3 },
          4: { index: 4, binary: "0100", minterm: "m4", term: "A'BC'D'", row: 1, col: 0 },
          5: { index: 5, binary: "0101", minterm: "m5", term: "A'BC'D", row: 1, col: 1 },
          7: { index: 7, binary: "0111", minterm: "m7", term: "A'BCD", row: 1, col: 2 },
          6: { index: 6, binary: "0110", minterm: "m6", term: "A'BCD'", row: 1, col: 3 },
          12: { index: 12, binary: "1100", minterm: "m12", term: "ABC'D'", row: 2, col: 0 },
          13: { index: 13, binary: "1101", minterm: "m13", term: "ABC'D", row: 2, col: 1 },
          15: { index: 15, binary: "1111", minterm: "m15", term: "ABCD", row: 2, col: 2 },
          14: { index: 14, binary: "1110", minterm: "m14", term: "ABCD'", row: 2, col: 3 },
          8: { index: 8, binary: "1000", minterm: "m8", term: "AB'C'D'", row: 3, col: 0 },
          9: { index: 9, binary: "1001", minterm: "m9", term: "AB'C'D", row: 3, col: 1 },
          11: { index: 11, binary: "1011", minterm: "m11", term: "AB'CD", row: 3, col: 2 },
          10: { index: 10, binary: "1010", minterm: "m10", term: "AB'CD'", row: 3, col: 3 }
        }
      }
    }
  },

  // Direct reference to layouts for backward compatibility
  get layouts() {
    return this.foundations.layouts;
  },

  // ---------------------------------------------------------------------------
  // TAB 3: GROUPING RULES AND TERM EXTRACTION
  // ---------------------------------------------------------------------------
  groupingAndTerms: {
    title: "Grouping Axioms and Boolean Term Extraction",
    subtitle: "The 8 mandatory grouping rules and systematic literal extraction for SOP and POS",
    rules: [
      {
        rule: 1,
        name: "Power-of-Two Sizing",
        ruleStatement: "A group must contain exactly 2^k cells: 1, 2, 4, 8, or 16.",
        rationale: "Only powers of two correspond to binary variables being eliminated via xy + xy' = x. Groups of 3, 5, 6, or 7 cells are strictly illegal because they cannot eliminate whole literals."
      },
      {
        rule: 2,
        name: "Rectangular Geometry Only",
        ruleStatement: "Every group must be a 1D line or a 2D rectangle (1x1, 1x2, 2x1, 1x4, 4x1, 2x2, 2x4, 4x2, 4x4).",
        rationale: "Diagonal groupings, L-shapes, T-shapes, and staircase patterns do not represent single-variable adjacency and are invalid."
      },
      {
        rule: 3,
        name: "Target Polarity Consistency",
        ruleStatement: "For SOP minimization (Σ m), group cells containing 1. For POS minimization (Π M), group cells containing 0.",
        rationale: "Never mix 1s and 0s in the same group. SOP groups (Σ m) produce product terms; POS groups (Π M) produce sum terms."
      },
      {
        rule: 4,
        name: "Completeness of Target Cells",
        ruleStatement: "Every required target cell (1 for SOP, 0 for POS) must belong to at least one group.",
        rationale: "Leaving any required cell uncovered produces an incomplete logic function that fails truth table verification."
      },
      {
        rule: 5,
        name: "Maximum Group Size Priority",
        ruleStatement: "Always make groups as large as possible before forming smaller groups.",
        rationale: "A larger group eliminates more variables. An octet of 8 cells leaves 1 literal; two quads would leave 2 literals each."
      },
      {
        rule: 6,
        name: "Permitted and Encouraged Overlap",
        ruleStatement: "A target cell may belong to multiple groups if doing so enlarges another group.",
        rationale: "By Boolean idempotence (x + x = x), reusing a 1 to turn an isolated cell into a pair, or a pair into a quad, produces simpler terms."
      },
      {
        rule: 7,
        name: "Wraparound and Toroidal Adjacency",
        ruleStatement: "Top row wraps to bottom row; left column wraps to right column; all four outer corners wrap together.",
        rationale: "Gray code adjacency is continuous across boundaries. The four corners of a 4x4 map form a valid 4-cell quad."
      },
      {
        rule: 8,
        name: "Strategic Don't-Care Usage",
        ruleStatement: "Treat don't-care cells (X or d) as 1 (or 0) only if they help enlarge a group; otherwise leave them unassigned.",
        rationale: "There is no requirement to cover an X. Never create a group consisting exclusively of don't-cares."
      }
    ],
    visualTopologies: [
      { id: "VT-01", name: "Singleton (1 Cell)", size: 1, valid: true, desc: "Single cell that cannot combine with any neighbor. Yields full term with all n literals." },
      { id: "VT-02", name: "Pair (2 Cells)", size: 2, valid: true, desc: "Two horizontally or vertically adjacent cells. Eliminates 1 variable; yields n - 1 literals." },
      { id: "VT-03", name: "Quad (4 Cells)", size: 4, valid: true, desc: "A 2x2 square or 1x4 / 4x1 strip. Eliminates 2 variables; yields n - 2 literals." },
      { id: "VT-04", name: "Octet (8 Cells)", size: 8, valid: true, desc: "A 2x4 or 4x2 block of 8 cells. Eliminates 3 variables; yields n - 3 literals." },
      { id: "VT-05", name: "Corner Quad (4 Cells)", size: 4, valid: true, desc: "Cells {0, 2, 8, 10} wrapping both horizontally and vertically. Yields B'D'." },
      { id: "VT-06", name: "Edge Wraparound Quad", size: 4, valid: true, desc: "Columns 00 and 10 across 2 rows, or rows 00 and 10 across 2 columns." },
      { id: "VT-07", name: "Overlapping Groups", size: 4, valid: true, desc: "Sharing cells between two quads or pairs to maximize group sizes." },
      { id: "VT-08", name: "Diagonal or L-Shape", size: 3, valid: false, desc: "STRICTLY ILLEGAL: L-shapes, diagonals, and 3-cell groups violate Boolean adjacency." }
    ],
    termExtractionGuide: {
      sopRule: {
        title: "How to Derive a Product Term from an SOP Group (Grouping 1s)",
        rules: [
          "Examine all cells belonging to the group.",
          "If a variable remains constant at 1 across all cells in the group, write the uncomplemented variable (e.g. A).",
          "If a variable remains constant at 0 across all cells in the group, write the complemented variable with apostrophe (e.g. A').",
          "If a variable changes between 0 and 1 within the group, ELIMINATE that variable completely from the product term."
        ],
        example: "In a 4-variable map, for quad {0, 1, 4, 5}: AB changes from 00 (row 0) to 01 (row 1), so A remains 0 (A') while B changes (eliminated). In columns CD, cells span 00 and 01, so C remains 0 (C') while D changes (eliminated). Constant variables: A=0, C=0. Resulting term: A'C'."
      },
      posRule: {
        title: "How to Derive a Sum Term from a POS Group (Grouping 0s)",
        rules: [
          "Examine all cells belonging to the 0-group.",
          "In POS (Maxterm logic), 0 corresponds to the uncomplemented literal, and 1 corresponds to the complemented literal.",
          "If a variable remains constant at 0 across all cells in the group, write the UNCOMPLEMENTED variable in the sum term (+ A).",
          "If a variable remains constant at 1 across all cells in the group, write the COMPLEMENTED variable in the sum term (+ A').",
          "If a variable changes between 0 and 1 within the group, ELIMINATE that variable completely from the sum term."
        ],
        example: "For a 0-quad covering cells {0, 2, 8, 10}: In rows AB (00 and 10), A changes (eliminated) while B remains 0 -> write B. In columns CD (00 and 10), C changes (eliminated) while D remains 0 -> write D. Combining into a sum term: (B + D)."
      }
    }
  },

  // ---------------------------------------------------------------------------
  // TAB 4: GUIDED INTERACTIVE DEMONSTRATIONS (GD1 TO GD6)
  // ---------------------------------------------------------------------------
  guidedDemos: [
    {
      id: "GD1",
      title: "GD1: 2-Variable SOP Minimization",
      mapType: "twoVar",
      functionText: "F(A, B) = Σ m(1, 2, 3)",
      minterms: [1, 2, 3],
      dontCares: [],
      targetPolarity: "1",
      steps: [
        {
          stepNumber: 1,
          title: "Plot Minterms on 2x2 Grid",
          cells: [1, 2, 3],
          action: "Place 1 in cell m1 (A=0, B=1), cell m2 (A=1, B=0), and cell m3 (A=1, B=1). Cell m0 is 0.",
          activeGroup: null
        },
        {
          stepNumber: 2,
          title: "Form Group G1: Horizontal Pair",
          cells: [2, 3],
          action: "Group row A=1 containing cells m2 and m3. Row A remains constant at 1. Variable B changes from 0 to 1 and is eliminated.",
          activeGroup: "G1",
          term: "A",
          annotation: "[Pair elimination: eliminates B]"
        },
        {
          stepNumber: 3,
          title: "Form Group G2: Vertical Pair with Overlap",
          cells: [1, 3],
          action: "Group column B=1 containing cells m1 and m3. Variable B remains constant at 1. Variable A changes from 0 to 1 and is eliminated. Overlapping cell m3 is valid and optimal.",
          activeGroup: "G2",
          term: "B",
          annotation: "[Permitted overlap covering m1]"
        },
        {
          stepNumber: 4,
          title: "Combine Terms for Final Expression",
          cells: [1, 2, 3],
          action: "Combine both Essential Prime Implicants into the minimal SOP expression.",
          activeGroup: "ALL",
          finalAnswer: "F = A + B",
          annotation: "[Minimal SOP: 2 terms, 2 literals]"
        }
      ]
    },
    {
      id: "GD2",
      title: "GD2: 3-Variable SOP Minimization (Quad Elimination)",
      mapType: "threeVar",
      functionText: "F(A, B, C) = Σ m(1, 3, 5, 7)",
      minterms: [1, 3, 5, 7],
      dontCares: [],
      targetPolarity: "1",
      steps: [
        {
          stepNumber: 1,
          title: "Plot Minterms on 2x4 Grid",
          cells: [1, 3, 5, 7],
          action: "Place 1 in cells m1, m3, m5, m7. Note they occupy columns BC=01 and BC=11 across both rows A=0 and A=1.",
          activeGroup: null
        },
        {
          stepNumber: 2,
          title: "Form Group G1: 2x2 Quad of 4 Cells",
          cells: [1, 3, 5, 7],
          action: "Combine all four 1s into a single 2x2 quad. Across these 4 cells: variable A changes (0 to 1) -> eliminated; variable B changes (0 to 1) -> eliminated; variable C remains constant at 1.",
          activeGroup: "G1",
          term: "C",
          annotation: "[Quad of 4 cells eliminates 2 variables: A and B]"
        },
        {
          stepNumber: 3,
          title: "Derive Final Minimal Expression",
          cells: [1, 3, 5, 7],
          action: "All 1s are covered by one single essential quad. No further groups needed.",
          activeGroup: "ALL",
          finalAnswer: "F = C",
          annotation: "[Minimal SOP: 1 single literal]"
        }
      ]
    },
    {
      id: "GD3",
      title: "GD3: 4-Variable SOP with Wraparound Octet",
      mapType: "fourVar",
      functionText: "F(A, B, C, D) = Σ m(0, 2, 4, 6, 8, 10, 12, 14)",
      minterms: [0, 2, 4, 6, 8, 10, 12, 14],
      dontCares: [],
      targetPolarity: "1",
      steps: [
        {
          stepNumber: 1,
          title: "Plot Minterms on 4x4 Grid",
          cells: [0, 2, 4, 6, 8, 10, 12, 14],
          action: "Notice all eight minterms lie in column CD=00 (cells 0, 4, 12, 8) and column CD=10 (cells 2, 6, 14, 10).",
          activeGroup: null
        },
        {
          stepNumber: 2,
          title: "Recognize Column Wraparound Adjacency",
          cells: [0, 2, 4, 6, 8, 10, 12, 14],
          action: "Column CD=00 wraps around the outer edge to meet column CD=10. Together they form an 8-cell octet spanning all four rows.",
          activeGroup: "G1",
          term: "D'",
          annotation: "[Octet elimination: eliminates A, B, and C; keeps D=0 -> D']"
        },
        {
          stepNumber: 3,
          title: "Derive Final Minimal Expression",
          cells: [0, 2, 4, 6, 8, 10, 12, 14],
          action: "The single octet covers all eight 1s. Three variables (A, B, C) change across the 8 cells and are eliminated.",
          activeGroup: "ALL",
          finalAnswer: "F = D'",
          annotation: "[Minimal SOP: 1 single literal D']"
        }
      ]
    },
    {
      id: "GD4",
      title: "GD4: 4-Variable with Corner Quad and Center Quad",
      mapType: "fourVar",
      functionText: "F(A, B, C, D) = Σ m(0, 2, 5, 7, 8, 10, 13, 15)",
      minterms: [0, 2, 5, 7, 8, 10, 13, 15],
      dontCares: [],
      targetPolarity: "1",
      steps: [
        {
          stepNumber: 1,
          title: "Plot Minterms on 4x4 Grid",
          cells: [0, 2, 5, 7, 8, 10, 13, 15],
          action: "Observe four cells in the exact outer corners (0, 2, 8, 10) and four cells in the exact center square (5, 7, 13, 15).",
          activeGroup: null
        },
        {
          stepNumber: 2,
          title: "Form Group G1: Four-Corner Quad",
          cells: [0, 2, 8, 10],
          action: "Cells m0, m2, m8, m10 wrap across both horizontal and vertical boundaries. In rows AB (00 and 10), B remains 0 (B'). In columns CD (00 and 10), D remains 0 (D').",
          activeGroup: "G1",
          term: "B'D'",
          annotation: "[Toroidal Corner Quad: eliminates A and C; keeps B'D']"
        },
        {
          stepNumber: 3,
          title: "Form Group G2: Center 2x2 Quad",
          cells: [5, 7, 13, 15],
          action: "Cells m5, m7, m13, m15 lie in rows AB=01 and AB=11 (B remains 1) and columns CD=01 and CD=11 (D remains 1). A and C change and are eliminated.",
          activeGroup: "G2",
          term: "BD",
          annotation: "[Center Quad: eliminates A and C; keeps BD]"
        },
        {
          stepNumber: 4,
          title: "Derive Final Minimal Expression",
          cells: [0, 2, 5, 7, 8, 10, 13, 15],
          action: "Combine both Essential Prime Implicants into the minimal SOP expression.",
          activeGroup: "ALL",
          finalAnswer: "F = B'D' + BD",
          annotation: "[Minimal SOP: 2 terms, 4 literals]"
        }
      ]
    },
    {
      id: "GD5",
      title: "GD5: 3-Variable POS Minimization (Grouping 0s)",
      mapType: "threeVar",
      functionText: "F(A, B, C) = Π M(0, 2, 4)",
      minterms: [],
      maxterms: [0, 2, 4],
      dontCares: [],
      targetPolarity: "0",
      steps: [
        {
          stepNumber: 1,
          title: "Plot Maxterm 0-Cells on 2x4 Grid",
          cells: [0, 2, 4],
          action: "For POS minimization, place 0 in maxterm cells M0 (000), M2 (010), and M4 (100). Remaining cells contain 1 and are ignored.",
          activeGroup: null
        },
        {
          stepNumber: 2,
          title: "Form Group G1: Horizontal Edge-Wrapping Pair",
          cells: [0, 2],
          action: "Cells M0 (row 0, col 00) and M2 (row 0, col 10) wrap horizontally. In row 0, A=0 -> write A. In columns 00 and 10, C=0 -> write C. Variable B changes (eliminated).",
          activeGroup: "G1",
          term: "(A + C)",
          annotation: "[POS sum term: constant 0 yields uncomplemented literal]"
        },
        {
          stepNumber: 3,
          title: "Form Group G2: Vertical Column Pair with Overlap",
          cells: [0, 4],
          action: "Cells M0 and M4 occupy column BC=00 across rows A=0 and A=1. A changes (eliminated). B=0 -> write B; C=0 -> write C.",
          activeGroup: "G2",
          term: "(B + C)",
          annotation: "[POS sum term: constant 0 yields (B + C)]"
        },
        {
          stepNumber: 4,
          title: "Combine Sum Terms for Minimal POS Expression",
          cells: [0, 2, 4],
          action: "Multiply the two sum terms to obtain the minimal Product of Sums (POS) expression.",
          activeGroup: "ALL",
          finalAnswer: "F = (A + C)(B + C)",
          annotation: "[Minimal POS: 2 sum terms, 4 literals]"
        }
      ]
    },
    {
      id: "GD6",
      title: "GD6: 4-Variable Don't-Care Minimization",
      mapType: "fourVar",
      functionText: "F(A, B, C, D) = Σ m(1, 3, 7, 11, 15) + d(0, 2, 5)",
      minterms: [1, 3, 7, 11, 15],
      dontCares: [0, 2, 5],
      targetPolarity: "1",
      steps: [
        {
          stepNumber: 1,
          title: "Plot Required 1s and Optional Don't-Cares (X)",
          cells: [1, 3, 7, 11, 15],
          action: "Place 1 in required minterms {1, 3, 7, 11, 15}. Place X in don't-care cells {0, 2, 5}. Don't-cares may be treated as 1 if helpful.",
          activeGroup: null
        },
        {
          stepNumber: 2,
          title: "Form Group G1: Column Quad Covering 4 Required 1s",
          cells: [3, 7, 11, 15],
          action: "Column CD=11 contains required 1s at rows 00, 01, 11, 10. They form a complete vertical 1x4 quad. A and B change completely and are eliminated. C=1, D=1 remain constant.",
          activeGroup: "G1",
          term: "CD",
          annotation: "[Essential Prime Implicant CD covering {3, 7, 11, 15}]"
        },
        {
          stepNumber: 3,
          title: "Form Group G2: 2x2 Quad Using Don't-Cares",
          cells: [0, 1, 2, 3],
          action: "To cover remaining required 1 at m1, we can combine m1 with m3 and don't-cares m0 and m2 in row AB=00! This creates a 1x4 quad of row AB=00: {0, 1, 3, 2}. CD changes completely, leaving A=0, B=0 -> A'B'. Notice don't-care cell 5 is unused and left unassigned.",
          activeGroup: "G2",
          term: "A'B'",
          annotation: "[Don't-cares m0 and m2 used to enlarge pair {1,3} into a 4-cell quad]"
        },
        {
          stepNumber: 4,
          title: "Derive Final Minimal Expression",
          cells: [0, 1, 2, 3, 7, 11, 15],
          action: "Combine both terms. Don't-care cell 5 is ignored because covering it would add an unnecessary redundant term.",
          activeGroup: "ALL",
          finalAnswer: "F = CD + A'B'",
          annotation: "[Minimal SOP: 2 terms, 4 literals]"
        }
      ]
    }
  ],

  // ---------------------------------------------------------------------------
  // TAB 5: PROGRESSIVE SOLVED K-MAP MODELS (26 MODELS)
  // ---------------------------------------------------------------------------
  workedModels: [
    // --- 2-VARIABLE MODELS (4) ---
    {
      id: "KM2.5-M01",
      category: "2-Variable K-Map",
      difficulty: "Basic",
      title: "Model 01: Single Column Pair in 2-Variable Map",
      problemStatement: "Minimize: F(A, B) = Σ m(1, 3)",
      mapType: "twoVar",
      minterms: [1, 3],
      dontCares: [],
      targetPolarity: "1",
      groupingSteps: [
        {
          group: "G1",
          cells: [1, 3],
          size: 2,
          type: "Pair (Column B=1)",
          constantVars: "B=1; A changes (0 to 1)",
          term: "B",
          annotation: "[Pair elimination: eliminates A]"
        }
      ],
      finalAnswer: "F = B",
      verificationNote: "Algebraic proof: m1 + m3 = A'B + AB = (A' + A)B = 1 · B = B. Single literal."
    },
    {
      id: "KM2.5-M02",
      category: "2-Variable K-Map",
      difficulty: "Basic",
      title: "Model 02: Overlapping Pairs Covering 3 Minterms",
      problemStatement: "Minimize: F(A, B) = Σ m(0, 1, 2)",
      mapType: "twoVar",
      minterms: [0, 1, 2],
      dontCares: [],
      targetPolarity: "1",
      groupingSteps: [
        {
          group: "G1",
          cells: [0, 1],
          size: 2,
          type: "Pair (Row A=0)",
          constantVars: "A=0; B changes (0 to 1)",
          term: "A'",
          annotation: "[Horizontal pair]"
        },
        {
          group: "G2",
          cells: [0, 2],
          size: 2,
          type: "Pair (Column B=0)",
          constantVars: "B=0; A changes (0 to 1)",
          term: "B'",
          annotation: "[Vertical pair overlapping m0]"
        }
      ],
      finalAnswer: "F = A' + B'",
      verificationNote: "POS check: Only cell m3 is 0. M3 = (A' + B'). Inverting gives NAND logic F = (AB)' = A' + B'."
    },
    {
      id: "KM2.5-M03",
      category: "2-Variable K-Map",
      difficulty: "Basic",
      title: "Model 03: Diagonal Non-Adjacent Cells (XNOR Function)",
      problemStatement: "Minimize: F(A, B) = Σ m(0, 3)",
      mapType: "twoVar",
      minterms: [0, 3],
      dontCares: [],
      targetPolarity: "1",
      groupingSteps: [
        {
          group: "G1",
          cells: [0],
          size: 1,
          type: "Singleton",
          constantVars: "A=0, B=0",
          term: "A'B'",
          annotation: "[Diagonal cells cannot combine]"
        },
        {
          group: "G2",
          cells: [3],
          size: 1,
          type: "Singleton",
          constantVars: "A=1, B=1",
          term: "AB",
          annotation: "[Diagonal cells cannot combine]"
        }
      ],
      finalAnswer: "F = A'B' + AB",
      verificationNote: "Demonstrates that diagonal adjacency is strictly illegal in K-Maps. Represents XNOR gate."
    },
    {
      id: "KM2.5-M04",
      category: "2-Variable K-Map",
      difficulty: "Basic",
      title: "Model 04: Full 2x2 Map Tautology (Constant 1)",
      problemStatement: "Minimize: F(A, B) = Σ m(0, 1, 2, 3)",
      mapType: "twoVar",
      minterms: [0, 1, 2, 3],
      dontCares: [],
      targetPolarity: "1",
      groupingSteps: [
        {
          group: "G1",
          cells: [0, 1, 2, 3],
          size: 4,
          type: "Full Map Quad",
          constantVars: "All variables change state",
          term: "1",
          annotation: "[Full map: eliminates all 2 variables]"
        }
      ],
      finalAnswer: "F = 1",
      verificationNote: "When all 2^n cells are 1, the function simplifies to the logic constant 1 (VCC)."
    },

    // --- 3-VARIABLE MODELS (7) ---
    {
      id: "KM2.5-M05",
      category: "3-Variable K-Map",
      difficulty: "Basic",
      title: "Model 05: 2x2 Quad in 3-Variable Map",
      problemStatement: "Minimize: F(A, B, C) = Σ m(1, 3, 5, 7)",
      mapType: "threeVar",
      minterms: [1, 3, 5, 7],
      dontCares: [],
      targetPolarity: "1",
      groupingSteps: [
        {
          group: "G1",
          cells: [1, 3, 5, 7],
          size: 4,
          type: "Quad (Columns 01 & 11)",
          constantVars: "C=1; A and B change completely",
          term: "C",
          annotation: "[Quad of 4 cells eliminates 2 variables: A and B]"
        }
      ],
      finalAnswer: "F = C",
      verificationNote: "Quad of 4 cells eliminates 2 variables, leaving exactly 1 literal C."
    },
    {
      id: "KM2.5-M06",
      category: "3-Variable K-Map",
      difficulty: "Basic",
      title: "Model 06: Horizontal Edge-Wrapping Quad",
      problemStatement: "Minimize: F(A, B, C) = Σ m(0, 2, 4, 6)",
      mapType: "threeVar",
      minterms: [0, 2, 4, 6],
      dontCares: [],
      targetPolarity: "1",
      groupingSteps: [
        {
          group: "G1",
          cells: [0, 2, 4, 6],
          size: 4,
          type: "Quad (Wrapping Columns 00 & 10)",
          constantVars: "C=0; A and B change completely",
          term: "C'",
          annotation: "[Edge wrapping quad: eliminates A and B]"
        }
      ],
      finalAnswer: "F = C'",
      verificationNote: "Left column BC=00 wraps to right column BC=10. Constant variable is C=0 -> C'."
    },
    {
      id: "KM2.5-M07",
      category: "3-Variable K-Map",
      difficulty: "Intermediate",
      title: "Model 07: Two Overlapping Quads Covering 6 Minterms",
      problemStatement: "Minimize: F(A, B, C) = Σ m(0, 1, 2, 4, 5, 6)",
      mapType: "threeVar",
      minterms: [0, 1, 2, 4, 5, 6],
      dontCares: [],
      targetPolarity: "1",
      groupingSteps: [
        {
          group: "G1",
          cells: [0, 1, 4, 5],
          size: 4,
          type: "Quad (Columns 00 & 01)",
          constantVars: "B=0; A and C change",
          term: "B'",
          annotation: "[Left 2x2 quad]"
        },
        {
          group: "G2",
          cells: [0, 2, 4, 6],
          size: 4,
          type: "Quad (Wrapping Columns 00 & 10)",
          constantVars: "C=0; A and B change",
          term: "C'",
          annotation: "[Edge-wrapping quad overlapping {0, 4}]"
        }
      ],
      finalAnswer: "F = B' + C'",
      verificationNote: "POS check: Missing cells are m3 and m7 (where B=1, C=1). Inverting gives (BC)' = B' + C'."
    },
    {
      id: "KM2.5-M08",
      category: "3-Variable K-Map",
      difficulty: "Basic",
      title: "Model 08: Center Quad in 3-Variable Map",
      problemStatement: "Minimize: F(A, B, C) = Σ m(2, 3, 6, 7)",
      mapType: "threeVar",
      minterms: [2, 3, 6, 7],
      dontCares: [],
      targetPolarity: "1",
      groupingSteps: [
        {
          group: "G1",
          cells: [2, 3, 6, 7],
          size: 4,
          type: "Quad (Columns 11 & 10)",
          constantVars: "B=1; A and C change",
          term: "B",
          annotation: "[Center 2x2 quad: eliminates A and C]"
        }
      ],
      finalAnswer: "F = B",
      verificationNote: "Columns BC=11 and BC=10 both have B=1. Variables A and C cycle through all states."
    },
    {
      id: "KM2.5-M09",
      category: "3-Variable K-Map",
      difficulty: "Basic",
      title: "Model 09: Left-Hand Quad in 3-Variable Map",
      problemStatement: "Minimize: F(A, B, C) = Σ m(0, 1, 4, 5)",
      mapType: "threeVar",
      minterms: [0, 1, 4, 5],
      dontCares: [],
      targetPolarity: "1",
      groupingSteps: [
        {
          group: "G1",
          cells: [0, 1, 4, 5],
          size: 4,
          type: "Quad (Columns 00 & 01)",
          constantVars: "B=0; A and C change",
          term: "B'",
          annotation: "[Left 2x2 quad: eliminates A and C]"
        }
      ],
      finalAnswer: "F = B'",
      verificationNote: "Columns BC=00 and BC=01 both have B=0. Leaves single literal B'."
    },
    {
      id: "KM2.5-M10",
      category: "3-Variable K-Map",
      difficulty: "Intermediate",
      title: "Model 10: Two Non-Adjacent Vertical Pairs (XOR Logic)",
      problemStatement: "Minimize: F(A, B, C) = Σ m(1, 2, 5, 6)",
      mapType: "threeVar",
      minterms: [1, 2, 5, 6],
      dontCares: [],
      targetPolarity: "1",
      groupingSteps: [
        {
          group: "G1",
          cells: [1, 5],
          size: 2,
          type: "Pair (Column BC=01)",
          constantVars: "B=0, C=1; A changes",
          term: "B'C",
          annotation: "[Vertical column pair]"
        },
        {
          group: "G2",
          cells: [2, 6],
          size: 2,
          type: "Pair (Column BC=10)",
          constantVars: "B=1, C=0; A changes",
          term: "BC'",
          annotation: "[Vertical column pair]"
        }
      ],
      finalAnswer: "F = B'C + BC' = B \u2295 C",
      verificationNote: "Columns 01 and 10 differ by 2 bits, so they cannot combine into a quad. Represents XOR gate."
    },
    {
      id: "KM2.5-M11",
      category: "3-Variable K-Map",
      difficulty: "Intermediate",
      title: "Model 11: Identifying and Removing a Redundant Prime Implicant",
      problemStatement: "Minimize: F(A, B, C) = Σ m(3, 4, 5, 7)",
      mapType: "threeVar",
      minterms: [3, 4, 5, 7],
      dontCares: [],
      targetPolarity: "1",
      groupingSteps: [
        {
          group: "G1",
          cells: [4, 5],
          size: 2,
          type: "Pair (Row A=1, Cols 00 & 01)",
          constantVars: "A=1, B=0; C changes",
          term: "AB'",
          annotation: "[Essential: covers minterm 4]"
        },
        {
          group: "G2",
          cells: [3, 7],
          size: 2,
          type: "Pair (Column BC=11)",
          constantVars: "B=1, C=1; A changes",
          term: "BC",
          annotation: "[Essential: covers minterm 3]"
        },
        {
          group: "Redundant",
          cells: [5, 7],
          size: 2,
          type: "Pair (Row A=1, Cols 01 & 11)",
          constantVars: "A=1, C=1",
          term: "AC",
          annotation: "[DISCARDED: Redundant Consensus term; 5 covered by G1, 7 covered by G2]"
        }
      ],
      finalAnswer: "F = AB' + BC",
      verificationNote: "Pair {5, 7} is a Prime Implicant but NOT Essential because both its cells are covered by other EPIs."
    },

    // --- 4-VARIABLE MODELS (9) ---
    {
      id: "KM2.5-M12",
      category: "4-Variable K-Map",
      difficulty: "Basic",
      title: "Model 12: Standard Four-Corner Quad",
      problemStatement: "Minimize: F(A, B, C, D) = Σ m(0, 2, 8, 10)",
      mapType: "fourVar",
      minterms: [0, 2, 8, 10],
      dontCares: [],
      targetPolarity: "1",
      groupingSteps: [
        {
          group: "G1",
          cells: [0, 2, 8, 10],
          size: 4,
          type: "Corner Quad",
          constantVars: "B=0, D=0; A and C change completely",
          term: "B'D'",
          annotation: "[Four corners wrap on torus: eliminates A and C]"
        }
      ],
      finalAnswer: "F = B'D'",
      verificationNote: "Cells {0, 2, 8, 10} represent corners: row 00 and row 10 (B=0), col 00 and col 10 (D=0)."
    },
    {
      id: "KM2.5-M13",
      category: "4-Variable K-Map",
      difficulty: "Intermediate",
      title: "Model 13: Horizontal Edge-Wrapping Octet (Top & Bottom Rows)",
      problemStatement: "Minimize: F(A, B, C, D) = Σ m(0, 1, 2, 3, 8, 9, 10, 11)",
      mapType: "fourVar",
      minterms: [0, 1, 2, 3, 8, 9, 10, 11],
      dontCares: [],
      targetPolarity: "1",
      groupingSteps: [
        {
          group: "G1",
          cells: [0, 1, 2, 3, 8, 9, 10, 11],
          size: 8,
          type: "Octet (Rows AB=00 and AB=10)",
          constantVars: "B=0; A, C, and D change completely",
          term: "B'",
          annotation: "[Octet eliminates 3 variables: A, C, D]"
        }
      ],
      finalAnswer: "F = B'",
      verificationNote: "Top row (AB=00) wraps to bottom row (AB=10). B remains 0 across all 8 cells."
    },
    {
      id: "KM2.5-M14",
      category: "4-Variable K-Map",
      difficulty: "Basic",
      title: "Model 14: Middle Rows Octet (Rows 01 & 11)",
      problemStatement: "Minimize: F(A, B, C, D) = Σ m(4, 5, 6, 7, 12, 13, 14, 15)",
      mapType: "fourVar",
      minterms: [4, 5, 6, 7, 12, 13, 14, 15],
      dontCares: [],
      targetPolarity: "1",
      groupingSteps: [
        {
          group: "G1",
          cells: [4, 5, 6, 7, 12, 13, 14, 15],
          size: 8,
          type: "Octet (Rows AB=01 and AB=11)",
          constantVars: "B=1; A, C, and D change completely",
          term: "B",
          annotation: "[Octet eliminates 3 variables: A, C, D]"
        }
      ],
      finalAnswer: "F = B",
      verificationNote: "Middle two rows have B=1 across all cells. Reduces to single literal B."
    },
    {
      id: "KM2.5-M15",
      category: "4-Variable K-Map",
      difficulty: "Intermediate",
      title: "Model 15: Vertical Edge-Wrapping Octet (Left & Right Columns)",
      problemStatement: "Minimize: F(A, B, C, D) = Σ m(0, 2, 4, 6, 8, 10, 12, 14)",
      mapType: "fourVar",
      minterms: [0, 2, 4, 6, 8, 10, 12, 14],
      dontCares: [],
      targetPolarity: "1",
      groupingSteps: [
        {
          group: "G1",
          cells: [0, 2, 4, 6, 8, 10, 12, 14],
          size: 8,
          type: "Octet (Cols CD=00 and CD=10)",
          constantVars: "D=0; A, B, and C change completely",
          term: "D'",
          annotation: "[Column wraparound octet]"
        }
      ],
      finalAnswer: "F = D'",
      verificationNote: "Left column CD=00 wraps to right column CD=10. D remains 0 across all 8 cells."
    },
    {
      id: "KM2.5-M16",
      category: "4-Variable K-Map",
      difficulty: "Basic",
      title: "Model 16: Center 2x2 Quad in 4-Variable Map",
      problemStatement: "Minimize: F(A, B, C, D) = Σ m(5, 7, 13, 15)",
      mapType: "fourVar",
      minterms: [5, 7, 13, 15],
      dontCares: [],
      targetPolarity: "1",
      groupingSteps: [
        {
          group: "G1",
          cells: [5, 7, 13, 15],
          size: 4,
          type: "Quad (Center 2x2)",
          constantVars: "B=1, D=1; A and C change",
          term: "BD",
          annotation: "[Center quad eliminates A and C]"
        }
      ],
      finalAnswer: "F = BD",
      verificationNote: "Rows 01 & 11 (B=1) intersect cols 01 & 11 (D=1). Yields 2-literal product term BD."
    },
    {
      id: "KM2.5-M17",
      category: "4-Variable K-Map",
      difficulty: "Intermediate",
      title: "Model 17: Left 2 Columns Octet",
      problemStatement: "Minimize: F(A, B, C, D) = Σ m(0, 1, 4, 5, 8, 9, 12, 13)",
      mapType: "fourVar",
      minterms: [0, 1, 4, 5, 8, 9, 12, 13],
      dontCares: [],
      targetPolarity: "1",
      groupingSteps: [
        {
          group: "G1",
          cells: [0, 1, 4, 5, 8, 9, 12, 13],
          size: 8,
          type: "Octet (Cols CD=00 and CD=01)",
          constantVars: "C=0; A, B, and D change completely",
          term: "C'",
          annotation: "[Octet of 8 cells eliminates 3 variables]"
        }
      ],
      finalAnswer: "F = C'",
      verificationNote: "In columns CD=00 and CD=01, C remains 0. All other variables change."
    },
    {
      id: "KM2.5-M18",
      category: "4-Variable K-Map",
      difficulty: "Intermediate",
      title: "Model 18: Vertical Quad Combined with Horizontal Pair",
      problemStatement: "Minimize: F(A, B, C, D) = Σ m(1, 3, 7, 11, 15)",
      mapType: "fourVar",
      minterms: [1, 3, 7, 11, 15],
      dontCares: [],
      targetPolarity: "1",
      groupingSteps: [
        {
          group: "G1",
          cells: [3, 7, 11, 15],
          size: 4,
          type: "Quad (Column CD=11)",
          constantVars: "C=1, D=1; A and B change",
          term: "CD",
          annotation: "[Essential: covers 7, 11, 15]"
        },
        {
          group: "G2",
          cells: [1, 3],
          size: 2,
          type: "Pair (Row AB=00, Cols 01 & 11)",
          constantVars: "A=0, B=0, D=1; C changes",
          term: "A'B'D",
          annotation: "[Essential: covers m1 overlapping m3]"
        }
      ],
      finalAnswer: "F = CD + A'B'D",
      verificationNote: "Overlapping m3 allows m1 to form a pair instead of remaining a singleton."
    },
    {
      id: "KM2.5-M19",
      category: "4-Variable K-Map",
      difficulty: "Advanced",
      title: "Model 19: Corner Quad and Center Quad Coexistence",
      problemStatement: "Minimize: F(A, B, C, D) = Σ m(0, 2, 5, 7, 8, 10, 13, 15)",
      mapType: "fourVar",
      minterms: [0, 2, 5, 7, 8, 10, 13, 15],
      dontCares: [],
      targetPolarity: "1",
      groupingSteps: [
        {
          group: "G1",
          cells: [0, 2, 8, 10],
          size: 4,
          type: "Corner Quad",
          constantVars: "B=0, D=0; A and C change",
          term: "B'D'",
          annotation: "[Four corners wrap on torus]"
        },
        {
          group: "G2",
          cells: [5, 7, 13, 15],
          size: 4,
          type: "Center Quad",
          constantVars: "B=1, D=1; A and C change",
          term: "BD",
          annotation: "[Center 2x2 quad]"
        }
      ],
      finalAnswer: "F = B'D' + BD",
      verificationNote: "Notice B'D' + BD represents the XNOR relation between B and D: (B \u2295 D)'."
    },
    {
      id: "KM2.5-M20",
      category: "4-Variable K-Map",
      difficulty: "Advanced",
      title: "Model 20: Overlapping Column Quad and Corner Quad",
      problemStatement: "Minimize: F(A, B, C, D) = Σ m(2, 6, 8, 10, 12, 14)",
      mapType: "fourVar",
      minterms: [2, 6, 8, 10, 12, 14],
      dontCares: [],
      targetPolarity: "1",
      groupingSteps: [
        {
          group: "G1",
          cells: [2, 6, 10, 14],
          size: 4,
          type: "Quad (Column CD=10)",
          constantVars: "C=1, D=0; A and B change",
          term: "CD'",
          annotation: "[Column quad covers {2, 6, 10, 14}]"
        },
        {
          group: "G2",
          cells: [8, 10, 12, 14],
          size: 4,
          type: "Quad (Rows AB=11 & 10, Cols 00 & 10)",
          constantVars: "A=1, D=0; B and C change",
          term: "AD'",
          annotation: "[Edge-wrapping quad in bottom two rows]"
        }
      ],
      finalAnswer: "F = CD' + AD' = D'(A + C)",
      verificationNote: "Both quads share cells m10 and m14. Variable D is constant at 0 in both terms."
    },

    // --- DON'T-CARE MINIMIZATION MODELS (3) ---
    {
      id: "KM2.5-M21",
      category: "Don't-Care Minimization",
      difficulty: "Intermediate",
      title: "Model 21: Expanding a Pair into a Quad via Don't-Care",
      problemStatement: "Minimize: F(A, B, C) = Σ m(1, 3, 7) + d(5)",
      mapType: "threeVar",
      minterms: [1, 3, 7],
      dontCares: [5],
      targetPolarity: "1",
      groupingSteps: [
        {
          group: "G1 (With d(5))",
          cells: [1, 3, 5, 7],
          size: 4,
          type: "Quad (Using d(5))",
          constantVars: "C=1; A and B change completely",
          term: "C",
          annotation: "[Don't-care d(5) expands 2 pairs into a full 4-cell quad]"
        }
      ],
      finalAnswer: "F = C",
      verificationNote: "Without d(5), we would need two pairs {1, 3} and {3, 7} -> F = A'C + BC (4 literals). With d(5), F = C (1 literal)!"
    },
    {
      id: "KM2.5-M22",
      category: "Don't-Care Minimization",
      difficulty: "Advanced",
      title: "Model 22: BCD Code Invalid States (10 to 15) as Don't-Cares",
      problemStatement: "Minimize: F(A, B, C, D) = Σ m(5, 6, 7, 8, 9) + d(10, 11, 12, 13, 14, 15)",
      mapType: "fourVar",
      minterms: [5, 6, 7, 8, 9],
      dontCares: [10, 11, 12, 13, 14, 15],
      targetPolarity: "1",
      groupingSteps: [
        {
          group: "G1",
          cells: [8, 9, 10, 11, 12, 13, 14, 15],
          size: 8,
          type: "Octet (Rows AB=11 & 10)",
          constantVars: "A=1; B, C, and D change",
          term: "A",
          annotation: "[Octet covers required {8, 9} using don't-cares {10..15}]"
        },
        {
          group: "G2",
          cells: [6, 7, 14, 15],
          size: 4,
          type: "Quad (Cols 11 & 10, Rows 01 & 11)",
          constantVars: "B=1, C=1; A and D change",
          term: "BC",
          annotation: "[Quad covers required {6, 7} using don't-cares {14, 15}]"
        },
        {
          group: "G3",
          cells: [5, 7, 13, 15],
          size: 4,
          type: "Quad (Cols 01 & 11, Rows 01 & 11)",
          constantVars: "B=1, D=1; A and C change",
          term: "BD",
          annotation: "[Quad covers required m5 using don't-cares {13, 15}]"
        }
      ],
      finalAnswer: "F = A + BC + BD = A + B(C + D)",
      verificationNote: "Standard practical engineering example: BCD digits only span 0..9, so 10..15 are don't-cares."
    },
    {
      id: "KM2.5-M23",
      category: "Don't-Care Minimization",
      difficulty: "Intermediate",
      title: "Model 23: Deliberately Ignoring an Unhelpful Don't-Care",
      problemStatement: "Minimize: F(A, B, C) = Σ m(0, 2) + d(7)",
      mapType: "threeVar",
      minterms: [0, 2],
      dontCares: [7],
      targetPolarity: "1",
      groupingSteps: [
        {
          group: "G1",
          cells: [0, 2],
          size: 2,
          type: "Pair (Row A=0, Cols 00 & 10)",
          constantVars: "A=0, C=0; B changes",
          term: "A'C'",
          annotation: "[Horizontal wrapping pair covers all required 1s]"
        },
        {
          group: "Unused d(7)",
          cells: [7],
          size: 0,
          type: "Ignored Cell",
          constantVars: "Isolated don't-care",
          term: "(Set to 0)",
          annotation: "[CRITICAL: Never group an isolated X. It would add a redundant term ABC!]"
        }
      ],
      finalAnswer: "F = A'C'",
      verificationNote: "Exam trap: Students often feel obligated to cover every X. Setting d(7) = 0 leaves the optimal term A'C'."
    },

    // --- SPECIAL CASES & POS MODELS (3) ---
    {
      id: "KM2.5-M24",
      category: "Special Cases",
      difficulty: "Intermediate",
      title: "Model 24: 3-Variable POS Grouping of Maxterm 0-Cells",
      problemStatement: "Minimize in POS: F(A, B, C) = Π M(0, 2, 4)",
      mapType: "threeVar",
      minterms: [],
      maxterms: [0, 2, 4],
      dontCares: [],
      targetPolarity: "0",
      groupingSteps: [
        {
          group: "G1",
          cells: [0, 2],
          size: 2,
          type: "Pair (Row A=0, Cols 00 & 10)",
          constantVars: "A=0, C=0; B changes",
          term: "(A + C)",
          annotation: "[POS sum term: constant 0 yields uncomplemented variable]"
        },
        {
          group: "G2",
          cells: [0, 4],
          size: 2,
          type: "Pair (Column BC=00, Rows 0 & 1)",
          constantVars: "B=0, C=0; A changes",
          term: "(B + C)",
          annotation: "[POS sum term: constant 0 yields (B + C)]"
        }
      ],
      finalAnswer: "F = (A + C)(B + C)",
      verificationNote: "Direct POS minimization by grouping 0s produces sum terms without needing De Morgan complementation."
    },
    {
      id: "KM2.5-M25",
      category: "Special Cases",
      difficulty: "Advanced",
      title: "Model 25: 4-Variable POS Minimization (Octet of 0s)",
      problemStatement: "Minimize in POS: F(A, B, C, D) = Π M(0, 1, 4, 5, 8, 9, 12, 13)",
      mapType: "fourVar",
      minterms: [],
      maxterms: [0, 1, 4, 5, 8, 9, 12, 13],
      dontCares: [],
      targetPolarity: "0",
      groupingSteps: [
        {
          group: "G1",
          cells: [0, 1, 4, 5, 8, 9, 12, 13],
          size: 8,
          type: "Octet (Cols CD=00 and CD=01)",
          constantVars: "C=0; A, B, and D change completely",
          term: "(C)",
          annotation: "[Octet of 0s: constant C=0 gives sum term C]"
        }
      ],
      finalAnswer: "F = C",
      verificationNote: "All 0s lie in columns where C=0. In POS logic, constant 0 maps to uncomplemented literal C."
    },
    {
      id: "KM2.5-M26",
      category: "Special Cases",
      difficulty: "Advanced",
      title: "Model 26: Multiple Valid Minimal Covers (Tie-Breaking)",
      problemStatement: "Minimize: F(A, B, C, D) = Σ m(1, 5, 6, 7, 11, 12, 13, 15)",
      mapType: "fourVar",
      minterms: [1, 5, 6, 7, 11, 12, 13, 15],
      dontCares: [],
      targetPolarity: "1",
      groupingSteps: [
        {
          group: "EPI G1",
          cells: [5, 7, 13, 15],
          size: 4,
          type: "Center Quad",
          constantVars: "B=1, D=1",
          term: "BD",
          annotation: "[Essential Prime Implicant]"
        },
        {
          group: "EPI G2",
          cells: [6, 7],
          size: 2,
          type: "Pair",
          constantVars: "A=0, B=1, C=1",
          term: "A'BC",
          annotation: "[Essential: covers minterm 6]"
        },
        {
          group: "EPI G3",
          cells: [12, 13],
          size: 2,
          type: "Pair",
          constantVars: "A=1, B=1, C=0",
          term: "ABC'",
          annotation: "[Essential: covers minterm 12]"
        },
        {
          group: "Choice A (Quad)",
          cells: [1, 5, 11, 15],
          size: 4,
          type: "Quad (Cols 01 & 11, Rows 00 & 10? Wait: {1, 5, 11, 15} is cols 01 and 11 across rows 00 and 10)",
          constantVars: "B'D or C'D",
          term: "C'D (covering m1)",
          annotation: "[Option 1 minimal cover: F = BD + A'BC + ABC' + C'D]"
        },
        {
          group: "Choice B (Pair)",
          cells: [1, 5],
          size: 2,
          type: "Alternative valid choice",
          constantVars: "A=0, C=0, D=1",
          term: "ACD or A'C'D",
          annotation: "[Option 2 minimal cover: equally valid minimal solution]"
        }
      ],
      finalAnswer: "F = BD + A'BC + ABC' + C'D (Multiple minimal covers exist)",
      verificationNote: "Demonstrates that K-Map minimization does not always have a uniquely singular algebraic representation."
    }
  ],

  // ---------------------------------------------------------------------------
  // TAB 6: CHEAT SHEET, EXAM CHECKLIST & PRACTICE LAB
  // ---------------------------------------------------------------------------
  cheatSheet: {
    title: "K-Map Master Cheat Sheet and Quick Reference",
    grayCodeHeadings: [
      { dim: "2-Variable", rows: "A (0, 1)", cols: "B (0, 1)", totalCells: 4 },
      { dim: "3-Variable", rows: "A (0, 1)", cols: "BC (00, 01, 11, 10)", totalCells: 8 },
      { dim: "4-Variable", rows: "AB (00, 01, 11, 10)", cols: "CD (00, 01, 11, 10)", totalCells: 16 }
    ],
    groupSizePower: [
      { size: 1, name: "Singleton (2^0)", varsEliminated: 0, literalsRemaining: "n literals (full term)" },
      { size: 2, name: "Pair (2^1)", varsEliminated: 1, literalsRemaining: "n - 1 literals" },
      { size: 4, name: "Quad (2^2)", varsEliminated: 2, literalsRemaining: "n - 2 literals" },
      { size: 8, name: "Octet (2^3)", varsEliminated: 3, literalsRemaining: "n - 3 literals" },
      { size: 16, name: "16-Cell (2^4)", varsEliminated: 4, literalsRemaining: "Logic constant 1" }
    ],
    sopVsPosComparison: [
      { aspect: "Canonical Notation", sop: "F = Σ m(i, j, ...)", pos: "F = Π M(i, j, ...)" },
      { aspect: "Target Cell Value", sop: "Group 1s (and useful Xs)", pos: "Group 0s (and useful Xs)" },
      { aspect: "Term Type", sop: "Product term (AND gate)", pos: "Sum term (OR gate)" },
      { aspect: "Variable = 1", sop: "Uncomplemented literal (A)", pos: "Complemented literal (A')" },
      { aspect: "Variable = 0", sop: "Complemented literal (A')", pos: "Uncomplemented literal (A)" },
      { aspect: "Variable changes", sop: "Eliminated completely", pos: "Eliminated completely" },
      { aspect: "Final Combination", sop: "Sum of Products (OR of ANDs)", pos: "Product of Sums (AND of ORs)" }
    ],
    cornerQuadCoordinates: "In a 4-variable map, cells {0, 2, 8, 10} form the standard corner quad: B'D'.",
    examChecklist: [
      "Distinguish canonical notation: SOP expressions use Σ m(...) to group 1-cells; POS expressions use Π M(...) to group 0-cells.",
      "Check Gray code headings first: ensure 11 precedes 10 on both row and column headers.",
      "Fill only the required polarity: 1s for SOP (Σ m) or 0s for POS (Π M). Leave non-target cells blank to prevent visual clutter.",
      "Check the 4 corners: always look for cells 0, 2, 8, 10 forming a 4-cell corner quad (B'D').",
      "Form the largest valid groups first: look for octets of 8 cells before quads, and quads before pairs.",
      "Utilize permitted overlap: if an already-covered cell enlarges another group from a pair to a quad, always reuse it.",
      "Audit every group for essentiality: ensure every group covers at least one cell that no other group covers.",
      "Remove redundant prime implicants: if all cells in a group are already covered by other groups, discard that group.",
      "Count literals in your final answer: a group of size 2^k in an n-variable map must produce exactly n - k literals."
    ]
  },

  // ---------------------------------------------------------------------------
  // PRACTICE LAB (28 PROGRESSIVE PROBLEMS: 6 BASIC, 8 INTERMEDIATE, 10 ADVANCED, 4 CHALLENGE)
  // ---------------------------------------------------------------------------
  practiceLab: [
    // --- BASIC (6) ---
    {
      id: "KM-P01",
      difficulty: "Basic",
      category: "2-Variable K-Map",
      problemStatement: "Minimize: F(A, B) = Σ m(0, 1)",
      targetForm: "SOP",
      mapDimensions: "2x2",
      minterms: [0, 1],
      dontCares: [],
      hint: "Cells 0 (00) and 1 (01) occupy row A=0 across both columns.",
      steps: [
        "Plot 1s at m0 (00) and m1 (01).",
        "Form horizontal Pair {0, 1} in row A=0.",
        "A remains constant at 0 (A'); B changes from 0 to 1 and is eliminated."
      ],
      finalAnswer: "F = A'",
      takeaway: "A horizontal pair in a 2x2 map eliminates variable B."
    },
    {
      id: "KM-P02",
      difficulty: "Basic",
      category: "2-Variable K-Map",
      problemStatement: "Minimize: F(A, B) = Σ m(2, 3)",
      targetForm: "SOP",
      mapDimensions: "2x2",
      minterms: [2, 3],
      dontCares: [],
      hint: "Cells 2 (10) and 3 (11) occupy row A=1 across both columns.",
      steps: [
        "Plot 1s at m2 (10) and m3 (11).",
        "Form horizontal Pair {2, 3} in row A=1.",
        "A remains constant at 1 (A); B changes and is eliminated."
      ],
      finalAnswer: "F = A",
      takeaway: "Pair in row A=1 yields single literal A."
    },
    {
      id: "KM-P03",
      difficulty: "Basic",
      category: "2-Variable K-Map",
      problemStatement: "Minimize: F(A, B) = Σ m(0, 2)",
      targetForm: "SOP",
      mapDimensions: "2x2",
      minterms: [0, 2],
      dontCares: [],
      hint: "Cells 0 (00) and 2 (10) occupy column B=0 across both rows.",
      steps: [
        "Plot 1s at m0 (00) and m2 (10).",
        "Form vertical Pair {0, 2} in column B=0.",
        "B remains constant at 0 (B'); A changes and is eliminated."
      ],
      finalAnswer: "F = B'",
      takeaway: "A vertical pair in a 2x2 map eliminates variable A."
    },
    {
      id: "KM-P04",
      difficulty: "Basic",
      category: "3-Variable K-Map",
      problemStatement: "Minimize: F(A, B, C) = Σ m(0, 1)",
      targetForm: "SOP",
      mapDimensions: "2x4",
      minterms: [0, 1],
      dontCares: [],
      hint: "Cells 0 (000) and 1 (001) lie in row A=0, cols 00 and 01.",
      steps: [
        "Plot 1s at m0 and m1.",
        "Form Pair {0, 1} in row A=0.",
        "A=0 (A') and B=0 (B') remain constant; C changes (eliminated)."
      ],
      finalAnswer: "F = A'B'",
      takeaway: "Pair of 2 cells in 3-var map leaves 3 - 1 = 2 literals."
    },
    {
      id: "KM-P05",
      difficulty: "Basic",
      category: "3-Variable K-Map",
      problemStatement: "Minimize: F(A, B, C) = Σ m(4, 5, 6, 7)",
      targetForm: "SOP",
      mapDimensions: "2x4",
      minterms: [4, 5, 6, 7],
      dontCares: [],
      hint: "All four minterms occupy the entire bottom row A=1.",
      steps: [
        "Plot 1s at m4, m5, m6, m7.",
        "Form 1x4 Quad spanning all columns of row A=1.",
        "A remains 1 (A); B and C cycle through all 4 combinations and are eliminated."
      ],
      finalAnswer: "F = A",
      takeaway: "Entire row of 4 cells eliminates 2 variables, yielding A."
    },
    {
      id: "KM-P06",
      difficulty: "Basic",
      category: "3-Variable K-Map",
      problemStatement: "Minimize: F(A, B, C) = Σ m(0, 1, 2, 3)",
      targetForm: "SOP",
      mapDimensions: "2x4",
      minterms: [0, 1, 2, 3],
      dontCares: [],
      hint: "All four minterms occupy the entire top row A=0.",
      steps: [
        "Plot 1s at m0, m1, m2, m3.",
        "Form 1x4 Quad spanning all columns of row A=0.",
        "A remains 0 (A'); B and C cycle through all combinations and are eliminated."
      ],
      finalAnswer: "F = A'",
      takeaway: "Entire top row of 4 cells yields single literal A'."
    },

    // --- INTERMEDIATE (8) ---
    {
      id: "KM-P07",
      difficulty: "Intermediate",
      category: "3-Variable K-Map",
      problemStatement: "Minimize: F(A, B, C) = Σ m(1, 3, 5)",
      targetForm: "SOP",
      mapDimensions: "2x4",
      minterms: [1, 3, 5],
      dontCares: [],
      hint: "Form two overlapping pairs using cell 1 twice.",
      steps: [
        "Plot 1s at m1 (001), m3 (011), m5 (101).",
        "Form Pair {1, 3} in row A=0: A=0, C=1 -> A'C.",
        "Form Pair {1, 5} in column BC=01: B=0, C=1 -> B'C."
      ],
      finalAnswer: "F = A'C + B'C = C(A' + B')",
      takeaway: "Overlapping cell m1 produces two 2-literal terms."
    },
    {
      id: "KM-P08",
      difficulty: "Intermediate",
      category: "3-Variable K-Map",
      problemStatement: "Minimize: F(A, B, C) = Σ m(0, 2, 4)",
      targetForm: "SOP",
      mapDimensions: "2x4",
      minterms: [0, 2, 4],
      dontCares: [],
      hint: "Cell 0 wraps horizontally to 2, and vertically to 4.",
      steps: [
        "Plot 1s at m0 (000), m2 (010), m4 (100).",
        "Form horizontal wrapping Pair {0, 2}: A=0, C=0 -> A'C'.",
        "Form vertical Pair {0, 4}: B=0, C=0 -> B'C'."
      ],
      finalAnswer: "F = A'C' + B'C' = C'(A' + B')",
      takeaway: "Edge wrapping combines m0 and m2 horizontally."
    },
    {
      id: "KM-P09",
      difficulty: "Intermediate",
      category: "3-Variable K-Map",
      problemStatement: "Minimize: F(A, B, C) = Σ m(2, 3, 4, 5)",
      targetForm: "SOP",
      mapDimensions: "2x4",
      minterms: [2, 3, 4, 5],
      dontCares: [],
      hint: "Cells {2, 3} are in row 0; cells {4, 5} are in row 1.",
      steps: [
        "Plot 1s at m2 (010), m3 (011), m4 (100), m5 (101).",
        "Pair {2, 3}: A=0, B=1 -> A'B.",
        "Pair {4, 5}: A=1, B=0 -> AB'.",
        "Pairs cannot combine vertically because columns 01/11 do not align with 00/01."
      ],
      finalAnswer: "F = A'B + AB' = A \u2295 B",
      takeaway: "Two disjoint horizontal pairs represent the XOR function."
    },
    {
      id: "KM-P10",
      difficulty: "Intermediate",
      category: "4-Variable K-Map",
      problemStatement: "Minimize: F(A, B, C, D) = Σ m(0, 1, 4, 5)",
      targetForm: "SOP",
      mapDimensions: "4x4",
      minterms: [0, 1, 4, 5],
      dontCares: [],
      hint: "Cells lie in rows AB=00 & 01, and columns CD=00 & 01.",
      steps: [
        "Plot 1s at m0, m1, m4, m5.",
        "Form top-left 2x2 Quad {0, 1, 4, 5}.",
        "Rows 00 & 01: A=0 (A'), B changes. Cols 00 & 01: C=0 (C'), D changes."
      ],
      finalAnswer: "F = A'C'",
      takeaway: "A 2x2 corner quad eliminates 2 variables: B and D."
    },
    {
      id: "KM-P11",
      difficulty: "Intermediate",
      category: "4-Variable K-Map",
      problemStatement: "Minimize: F(A, B, C, D) = Σ m(2, 3, 6, 7)",
      targetForm: "SOP",
      mapDimensions: "4x4",
      minterms: [2, 3, 6, 7],
      dontCares: [],
      hint: "Rows AB=00 & 01, columns CD=11 & 10.",
      steps: [
        "Plot 1s at m2, m3, m6, m7.",
        "Form 2x2 Quad {2, 3, 6, 7}.",
        "Rows 00 & 01: A=0 (A'). Cols 11 & 10: C=1 (C). B and D change."
      ],
      finalAnswer: "F = A'C",
      takeaway: "Quad in top-right area yields A'C."
    },
    {
      id: "KM-P12",
      difficulty: "Intermediate",
      category: "4-Variable K-Map",
      problemStatement: "Minimize: F(A, B, C, D) = Σ m(8, 9, 10, 11)",
      targetForm: "SOP",
      mapDimensions: "4x4",
      minterms: [8, 9, 10, 11],
      dontCares: [],
      hint: "All 4 minterms occupy the entire bottom row AB=10.",
      steps: [
        "Plot 1s at m8, m9, m10, m11 in bottom row AB=10.",
        "Form 1x4 horizontal Quad.",
        "Row AB=10 has A=1, B=0 constant -> AB'. C and D change completely."
      ],
      finalAnswer: "F = AB'",
      takeaway: "Entire bottom row of 4 cells eliminates C and D."
    },
    {
      id: "KM-P13",
      difficulty: "Intermediate",
      category: "Don't-Care Minimization",
      problemStatement: "Minimize: F(A, B, C) = Σ m(0, 1, 4) + d(5)",
      targetForm: "SOP",
      mapDimensions: "2x4",
      minterms: [0, 1, 4],
      dontCares: [5],
      hint: "Use d(5) to combine with {0, 1, 4} into a 2x2 quad.",
      steps: [
        "Plot 1s at m0, m1, m4 and X at m5.",
        "Include d(5) to form 2x2 Quad {0, 1, 4, 5}.",
        "Cols 00 & 01: B=0 (B'); A and C change completely."
      ],
      finalAnswer: "F = B'",
      takeaway: "Don't-care cell 5 turns two pairs into a single literal B'."
    },
    {
      id: "KM-P14",
      difficulty: "Intermediate",
      category: "POS Minimization",
      problemStatement: "Minimize in POS: F(A, B, C) = Π M(1, 3, 5, 7)",
      targetForm: "POS",
      mapDimensions: "2x4",
      minterms: [],
      maxterms: [1, 3, 5, 7],
      dontCares: [],
      hint: "Group 0-cells in columns BC=01 and BC=11.",
      steps: [
        "Place 0 in maxterm cells M1, M3, M5, M7.",
        "Form 2x2 Quad of 0s in columns 01 and 11 across both rows.",
        "A and B change; C=1 constant across all four 0-cells.",
        "In POS logic, constant 1 produces complemented literal (C')."
      ],
      finalAnswer: "F = C'",
      takeaway: "POS quad of 0s with constant 1 yields sum term C'."
    },

    // --- ADVANCED (10) ---
    {
      id: "KM-P15",
      difficulty: "Advanced",
      category: "4-Variable K-Map",
      problemStatement: "Minimize: F(A, B, C, D) = Σ m(0, 2, 4, 6)",
      targetForm: "SOP",
      mapDimensions: "4x4",
      minterms: [0, 2, 4, 6],
      dontCares: [],
      hint: "Top two rows AB=00 & 01, columns CD=00 & 10 wrap horizontally.",
      steps: [
        "Plot 1s at m0, m2, m4, m6.",
        "Form edge-wrapping 2x2 Quad across columns CD=00 and CD=10.",
        "Rows 00 & 01: A=0 (A'). Cols 00 & 10: D=0 (D'). B and C change."
      ],
      finalAnswer: "F = A'D'",
      takeaway: "Edge-wrapping quad in top half yields A'D'."
    },
    {
      id: "KM-P16",
      difficulty: "Advanced",
      category: "4-Variable K-Map",
      problemStatement: "Minimize: F(A, B, C, D) = Σ m(8, 10, 12, 14)",
      targetForm: "SOP",
      mapDimensions: "4x4",
      minterms: [8, 10, 12, 14],
      dontCares: [],
      hint: "Bottom two rows AB=11 & 10, columns CD=00 & 10 wrap horizontally.",
      steps: [
        "Plot 1s at m8, m10, m12, m14.",
        "Form edge-wrapping 2x2 Quad across bottom two rows.",
        "Rows 11 & 10: A=1 (A). Cols 00 & 10: D=0 (D'). B and C change."
      ],
      finalAnswer: "F = AD'",
      takeaway: "Edge-wrapping quad in bottom half yields AD'."
    },
    {
      id: "KM-P17",
      difficulty: "Advanced",
      category: "4-Variable K-Map",
      problemStatement: "Minimize: F(A, B, C, D) = Σ m(0, 1, 8, 9)",
      targetForm: "SOP",
      mapDimensions: "4x4",
      minterms: [0, 1, 8, 9],
      dontCares: [],
      hint: "Row AB=00 and row AB=10 wrap vertically; columns CD=00 & 01.",
      steps: [
        "Plot 1s at m0, m1, m8, m9.",
        "Form vertically wrapping 2x2 Quad across rows 00 and 10.",
        "Rows 00 & 10: B=0 (B'). Cols 00 & 01: C=0 (C'). A and D change."
      ],
      finalAnswer: "F = B'C'",
      takeaway: "Vertical wraparound combines rows 00 and 10."
    },
    {
      id: "KM-P18",
      difficulty: "Advanced",
      category: "4-Variable K-Map",
      problemStatement: "Minimize: F(A, B, C, D) = Σ m(2, 3, 10, 11)",
      targetForm: "SOP",
      mapDimensions: "4x4",
      minterms: [2, 3, 10, 11],
      dontCares: [],
      hint: "Row AB=00 and row AB=10 wrap vertically; columns CD=11 & 10.",
      steps: [
        "Plot 1s at m2, m3, m10, m11.",
        "Form vertically wrapping 2x2 Quad across rows 00 and 10.",
        "Rows 00 & 10: B=0 (B'). Cols 11 & 10: C=1 (C). A and D change."
      ],
      finalAnswer: "F = B'C",
      takeaway: "Vertical wraparound in columns 11 & 10 yields B'C."
    },
    {
      id: "KM-P19",
      difficulty: "Advanced",
      category: "4-Variable K-Map",
      problemStatement: "Minimize: F(A, B, C, D) = Σ m(4, 6, 12, 14)",
      targetForm: "SOP",
      mapDimensions: "4x4",
      minterms: [4, 6, 12, 14],
      dontCares: [],
      hint: "Middle rows AB=01 & 11, columns CD=00 & 10 wrap horizontally.",
      steps: [
        "Plot 1s at m4, m6, m12, m14.",
        "Form horizontally wrapping 2x2 Quad in middle rows.",
        "Rows 01 & 11: B=1 (B). Cols 00 & 10: D=0 (D'). A and C change."
      ],
      finalAnswer: "F = BD'",
      takeaway: "Edge-wrapping quad in middle rows yields BD'."
    },
    {
      id: "KM-P20",
      difficulty: "Advanced",
      category: "4-Variable K-Map",
      problemStatement: "Minimize: F(A, B, C, D) = Σ m(1, 5, 9, 13)",
      targetForm: "SOP",
      mapDimensions: "4x4",
      minterms: [1, 5, 9, 13],
      dontCares: [],
      hint: "All 4 minterms occupy the entire column CD=01.",
      steps: [
        "Plot 1s at m1, m5, m9, m13 in column CD=01.",
        "Form 1x4 vertical Quad spanning all four rows.",
        "Col CD=01 has C=0, D=1 constant -> C'D. A and B change completely."
      ],
      finalAnswer: "F = C'D",
      takeaway: "A full vertical column quad eliminates A and B."
    },
    {
      id: "KM-P21",
      difficulty: "Advanced",
      category: "Don't-Care Minimization",
      problemStatement: "Minimize: F(A, B, C, D) = Σ m(0, 2, 8, 10) + d(1, 3)",
      targetForm: "SOP",
      mapDimensions: "4x4",
      minterms: [0, 2, 8, 10],
      dontCares: [1, 3],
      hint: "Corner quad covers all required 1s. Check if d(1, 3) can enlarge it.",
      steps: [
        "Plot 1s at {0, 2, 8, 10} and X at {1, 3}.",
        "Notice {0, 1, 3, 2} in row 00 would form a quad, but row 10 has {8, 10} which would still need covering.",
        "However, {0, 2, 8, 10} ALREADY forms a corner quad yielding B'D'!",
        "If we also group {0, 1, 3, 2} using Xs, that gives A'B'. But {0, 2, 8, 10} already covers all required 1s alone!",
        "Therefore, the single corner quad B'D' covers all 1s minimally. Don't-cares d(1, 3) are not needed."
      ],
      finalAnswer: "F = B'D'",
      takeaway: "Don't-cares should only be used if they reduce the total term count."
    },
    {
      id: "KM-P22",
      difficulty: "Advanced",
      category: "Don't-Care Minimization",
      problemStatement: "Minimize: F(A, B, C, D) = Σ m(1, 3, 7, 11, 15) + d(5)",
      targetForm: "SOP",
      mapDimensions: "4x4",
      minterms: [1, 3, 7, 11, 15],
      dontCares: [5],
      hint: "Include d(5) into column CD=01 to form a quad with m1.",
      steps: [
        "Plot 1s at {1, 3, 7, 11, 15} and X at m5.",
        "Quad G1: Column CD=11 covering {3, 7, 11, 15} -> CD.",
        "Quad G2: With d(5), cells {1, 3, 5, 7} form a 2x2 quad in rows 00 & 01 and cols 01 & 11 -> A'D.",
        "Both terms are 2 literals. All 1s covered."
      ],
      finalAnswer: "F = CD + A'D = D(C + A')",
      takeaway: "Don't-care cell 5 turns pair {1, 3} into a 4-cell quad {1, 3, 5, 7}."
    },
    {
      id: "KM-P23",
      difficulty: "Advanced",
      category: "POS Minimization",
      problemStatement: "Minimize in POS: F(A, B, C, D) = Π M(0, 2, 8, 10)",
      targetForm: "POS",
      mapDimensions: "4x4",
      minterms: [],
      maxterms: [0, 2, 8, 10],
      dontCares: [],
      hint: "The four corners contain 0s. Group them into a corner quad.",
      steps: [
        "Place 0 in cells {0, 2, 8, 10}.",
        "Form corner Quad of 0s wrapping both horizontally and vertically.",
        "Rows 00 & 10: B=0. Cols 00 & 10: D=0. A and C change.",
        "In POS logic, constant 0 maps to uncomplemented variable: (B + D)."
      ],
      finalAnswer: "F = (B + D)",
      takeaway: "Corner quad of 0s yields single sum term (B + D)."
    },
    {
      id: "KM-P24",
      difficulty: "Advanced",
      category: "POS Minimization",
      problemStatement: "Minimize in POS: F(A, B, C, D) = Π M(4, 5, 6, 7, 12, 13, 14, 15)",
      targetForm: "POS",
      mapDimensions: "4x4",
      minterms: [],
      maxterms: [4, 5, 6, 7, 12, 13, 14, 15],
      dontCares: [],
      hint: "Middle two rows contain 0s. Form an 8-cell octet.",
      steps: [
        "Place 0 in all cells of rows AB=01 and AB=11.",
        "Form 2x4 Octet of 0s spanning middle two rows.",
        "B=1 constant across all eight 0-cells; A, C, and D change.",
        "In POS logic, constant 1 maps to complemented variable (B')."
      ],
      finalAnswer: "F = B'",
      takeaway: "Octet of 0s with constant 1 yields single literal B'."
    },

    // --- CHALLENGE (4) ---
    {
      id: "KM-P25",
      difficulty: "Challenge",
      category: "4-Variable K-Map",
      problemStatement: "Minimize: F(A, B, C, D) = Σ m(0, 1, 2, 4, 5, 6, 8, 9, 12, 13, 14)",
      targetForm: "SOP",
      mapDimensions: "4x4",
      minterms: [0, 1, 2, 4, 5, 6, 8, 9, 12, 13, 14],
      dontCares: [],
      hint: "Look for two overlapping octets or 4-cell edge wraps.",
      steps: [
        "Plot all 11 minterms.",
        "Octet G1: Columns CD=00 and CD=01 contain 8 cells {0, 1, 4, 5, 8, 9, 12, 13} -> C'.",
        "Quad G2: Cells {0, 2, 4, 6} in top two rows and cols 00 & 10 -> A'D'.",
        "Quad G3: Cells {4, 6, 12, 14} in middle rows and cols 00 & 10 -> BD'.",
        "Combine to ensure all 1s covered: C' covers {0,1,4,5,8,9,12,13}. Remaining are 2, 6, 14. Quad {0, 2, 4, 6} covers 2, 6. Quad {4, 6, 12, 14} or {8, 10...} -> cell 14 is covered by Quad {4, 6, 12, 14} (BD') or {12, 14, 8, 10} if 10 were present.",
        "Final minimal expression: F = C' + A'D' + BD'."
      ],
      finalAnswer: "F = C' + A'D' + BD'",
      takeaway: "Large 11-minterm problem simplifies to 3 terms using one octet and two quads."
    },
    {
      id: "KM-P26",
      difficulty: "Challenge",
      category: "4-Variable K-Map",
      problemStatement: "Minimize: F(A, B, C, D) = Σ m(1, 3, 4, 5, 6, 7, 9, 11, 13, 15)",
      targetForm: "SOP",
      mapDimensions: "4x4",
      minterms: [1, 3, 4, 5, 6, 7, 9, 11, 13, 15],
      dontCares: [],
      hint: "Observe that columns CD=01 and CD=11 contain all their cells (8 cells), plus row AB=01 contains {4, 6}.",
      steps: [
        "Plot all 10 minterms.",
        "Octet G1: Columns CD=01 and CD=11 across all four rows contain {1, 3, 5, 7, 9, 11, 13, 15}. Variable D=1 is constant across all 8 cells -> D.",
        "Remaining uncovered cells: m4 and m6 in row AB=01.",
        "Quad G2: Row AB=01 contains cells {4, 5, 7, 6}. Overlapping m5 and m7 with row AB=01 creates a 1x4 Quad -> A'B.",
        "Every minterm is now covered by G1 or G2."
      ],
      finalAnswer: "F = D + A'B",
      takeaway: "An 8-cell octet plus an overlapping 4-cell quad compresses 10 minterms into just 3 literals!"
    },
    {
      id: "KM-P27",
      difficulty: "Challenge",
      category: "Don't-Care Minimization",
      problemStatement: "Minimize: F(A, B, C, D) = Σ m(0, 2, 5, 7, 8, 10) + d(13, 15)",
      targetForm: "SOP",
      mapDimensions: "4x4",
      minterms: [0, 2, 5, 7, 8, 10],
      dontCares: [13, 15],
      hint: "Corners form a quad; don't-cares turn pair {5, 7} into a center quad.",
      steps: [
        "Plot 1s at {0, 2, 5, 7, 8, 10} and Xs at {13, 15}.",
        "Quad G1: The four corners {0, 2, 8, 10} form a standard corner quad -> B'D'.",
        "Quad G2: Cells {5, 7} combine with don't-cares {13, 15} in columns 01 & 11 and rows 01 & 11 to form the center 2x2 quad -> BD.",
        "Both quads are essential. Minimal SOP obtained."
      ],
      finalAnswer: "F = B'D' + BD = (B \u2295 D)'",
      takeaway: "Don't-cares at 13 and 15 complete the center quad, yielding an XNOR relationship."
    },
    {
      id: "KM-P28",
      difficulty: "Challenge",
      category: "Special Cases",
      problemStatement: "Minimize: F(A, B, C, D) = Σ m(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)",
      targetForm: "SOP",
      mapDimensions: "4x4",
      minterms: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      dontCares: [],
      hint: "All 16 cells of the 4-variable map are 1.",
      steps: [
        "All 2^4 = 16 cells contain 1.",
        "Form single 16-cell group spanning the entire map.",
        "All four variables (A, B, C, D) change between 0 and 1 across the grid and are eliminated.",
        "Output simplifies to the Boolean identity 1."
      ],
      finalAnswer: "F = 1",
      takeaway: "A full 16-cell group eliminates all 4 variables, yielding logic constant 1 (tautology)."
    }
  ]
};

export default dldSection25Data;
