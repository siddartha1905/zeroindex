/**
 * Digital Logic Design (DLD) - Section 2.5 Data Module
 * Karnaugh Maps: Fundamentals, Two-Variable, Three-Variable, Four-Variable and Don't-Care Conditions
 * 
 * Strict formatting: Zero em-dashes and zero en-dashes throughout.
 */

export const dldSection25Data = {
  id: "2.5",
  number: "2.5",
  title: "Karnaugh Maps: Fundamentals, Two-Variable, Three-Variable, Four-Variable and Don't-Care Conditions",
  badge: "Visual Optimization",
  status: "Available",
  estimatedReadTime: "24 min read",
  dataScienceConnection: "In feature selection and hyper-parameter space pruning, high-dimensional grid searches often have redundant dimensions where model performance remains invariant. Karnaugh map grouping is mathematically identical to finding minimal orthogonal hyper-rectangles in a discrete Boolean feature space, compressing decision boundaries and eliminating non-informative features.",

  overview: "The Karnaugh Map (K-Map), invented by Maurice Karnaugh at Bell Labs in 1953, is a graphical technique that transforms Boolean algebraic minimization into visual pattern recognition. By arranging truth-table minterms in a multi-dimensional grid indexed by Gray code (where adjacent cells differ by exactly one binary bit), adjacent cells satisfy the algebraic Combining Law: xy + xy' = x. Grouping adjacent cells of size 2^k (singletons, pairs, quads, octets) eliminates k changing literals immediately without tedious algebraic factoring. This section provides complete coverage of 2-, 3-, and 4-variable K-Maps, edge-wrapping, corner quads, Prime Implicants, Essential Prime Implicants, POS minimization, and don't-care conditions.",

  learningOutcomes: [
    "Explain why Gray code ordering (00, 01, 11, 10) guarantees physical and logical adjacency between adjacent cells.",
    "Formulate and enforce the 8 mandatory grouping rules: powers of two, rectangular geometry, wrapping, and overlap.",
    "Solve 2-variable, 3-variable, and 4-variable K-Maps in both Sum of Products (SOP) and Product of Sums (POS) modes.",
    "Identify Prime Implicants (PIs) and Essential Prime Implicants (EPIs) to construct minimal irredundant covers.",
    "Utilize don't-care conditions (X or d) strategically to expand group sizes without covering unnecessary cells.",
    "Handle special boundary cases: four-corner quads, isolated minterms, multiple minimal solutions, and constant functions."
  ],

  fundamentals: [
    {
      title: "Why Gray Code is Essential",
      description: "In ordinary binary counting (00, 01, 10, 11), transitioning from 01 to 10 changes two bits simultaneously. In Gray code (00, 01, 11, 10), every adjacent step differs by exactly one bit. This ensures that any two horizontally or vertically adjacent cells in a K-Map represent two minterms differing by only one variable, allowing that variable to be eliminated by xy + xy' = x."
    },
    {
      title: "Cell Dimensions & Minterm Capacities",
      description: "For n variables, a K-Map has exactly 2^n cells:\n- 2 variables: 2 x 2 grid = 4 cells (m0 to m3)\n- 3 variables: 2 x 4 grid = 8 cells (m0 to m7)\n- 4 variables: 4 x 4 grid = 16 cells (m0 to m15)\nEvery cell corresponds to one specific minterm index."
    },
    {
      title: "Literal Elimination Power of Group Sizes",
      description: "A group of size 2^k eliminates exactly k variables:\n- 1 cell (2^0): eliminates 0 variables (keeps all n literals)\n- 2 cells (2^1, Pair): eliminates 1 variable (keeps n - 1 literals)\n- 4 cells (2^2, Quad): eliminates 2 variables (keeps n - 2 literals)\n- 8 cells (2^3, Octet): eliminates 3 variables (keeps n - 3 literals)\n- 16 cells (2^4): eliminates 4 variables (reduces to constant 1)"
    },
    {
      title: "Prime Implicants (PI) vs Essential Prime Implicants (EPI)",
      description: "A Prime Implicant (PI) is a product term obtained by grouping the maximum possible number of adjacent 1-cells (it cannot be combined into any larger valid group).\nAn Essential Prime Implicant (EPI) is a Prime Implicant that covers at least one required 1-cell that is NOT covered by any other prime implicant.\nEvery EPI must be included in the final minimal expression."
    }
  ],

  groupingRules: [
    { rule: 1, name: "Power-of-Two Sizing", desc: "Groups must contain 1, 2, 4, 8, or 16 cells. Groups of 3, 5, 6, or 7 cells are strictly invalid." },
    { rule: 2, name: "Rectangular Geometry", desc: "Every group must be a 1D line or a 2D rectangle. L-shapes, diagonal groups, and T-shapes are prohibited." },
    { rule: 3, name: "Target Polarity", desc: "For SOP, group cells containing 1. For POS, group cells containing 0." },
    { rule: 4, name: "Completeness", desc: "Every required 1 (for SOP) or 0 (for POS) must be included in at least one group." },
    { rule: 5, name: "Maximum Group Size", desc: "Always make groups as large as possible. Larger groups eliminate more literals and yield simpler logic." },
    { rule: 6, name: "Permitted Overlap", desc: "Groups may share cells. If a 1-cell is already covered, it can be reused to make another group larger." },
    { rule: 7, name: "Edge Wrapping", desc: "The top row wraps to the bottom row; the left column wraps to the right column. The four corners of a 4x4 map form a valid quad." },
    { rule: 8, name: "Don't-Care Usage", desc: "Don't-care cells (X) may be treated as 1 (or 0) if they enlarge a group, but there is no obligation to cover an X." }
  ],

  layouts: {
    twoVar: {
      rowVar: "A",
      colVar: "B",
      rows: ["0", "1"],
      cols: ["0", "1"],
      matrix: [
        [0, 1], // m0, m1
        [2, 3]  // m2, m3
      ]
    },
    threeVar: {
      rowVar: "A",
      colVar: "BC",
      rows: ["0", "1"],
      cols: ["00", "01", "11", "10"],
      matrix: [
        [0, 1, 3, 2], // m0, m1, m3, m2
        [4, 5, 7, 6]  // m4, m5, m7, m6
      ]
    },
    fourVar: {
      rowVar: "AB",
      colVar: "CD",
      rows: ["00", "01", "11", "10"],
      cols: ["00", "01", "11", "10"],
      matrix: [
        [0, 1, 3, 2],       // m0, m1, m3, m2
        [4, 5, 7, 6],       // m4, m5, m7, m6
        [12, 13, 15, 14],   // m12, m13, m15, m14
        [8, 9, 11, 10]      // m8, m9, m11, m10
      ]
    }
  },

  workedModels: [
    // ----------------------------------------------------
    // 2-VARIABLE WORKED MODELS
    // ----------------------------------------------------
    {
      id: "KM2.5-01",
      category: "2-Variable K-Map",
      difficulty: "Basic",
      target: "Minimize: F(A, B) = Sigma m(1, 3)",
      mapDimensions: "2x2 (4 cells)",
      minterms: [1, 3],
      groupingSteps: [
        { group: "G1", cells: [1, 3], size: 2, type: "Pair (Vertical Column)", term: "B", explanation: "Column B=1 has 1s at row A=0 (m1) and row A=1 (m3). Variable A changes (0 to 1) and is eliminated. Variable B remains constant at 1." }
      ],
      finalResult: "F = B",
      verificationNote: "Algebraic check: m1 + m3 = A'B + AB = (A' + A)B = 1 · B = B. Verified."
    },
    {
      id: "KM2.5-02",
      category: "2-Variable K-Map",
      difficulty: "Basic",
      target: "Minimize: F(A, B) = Sigma m(0, 1, 2)",
      mapDimensions: "2x2 (4 cells)",
      minterms: [0, 1, 2],
      groupingSteps: [
        { group: "G1", cells: [0, 1], size: 2, type: "Pair (Horizontal Row)", term: "A'", explanation: "Top row where A=0. Variable B changes (0 to 1) and is eliminated." },
        { group: "G2", cells: [0, 2], size: 2, type: "Pair (Vertical Column)", term: "B'", explanation: "Left column where B=0. Overlaps m0 to cover m2. Variable A changes and is eliminated." }
      ],
      finalResult: "F = A' + B'",
      verificationNote: "POS check: Only cell m3 (11) is 0. M3 = (A' + B'). Inverting yields NAND: F = (AB)' = A' + B'."
    },
    {
      id: "KM2.5-03",
      category: "2-Variable K-Map",
      difficulty: "Basic",
      target: "Minimize: F(A, B) = Sigma m(0, 3)",
      mapDimensions: "2x2 (4 cells)",
      minterms: [0, 3],
      groupingSteps: [
        { group: "G1", cells: [0], size: 1, type: "Singleton", term: "A'B'", explanation: "Cell (0,0). Cannot combine diagonally with (1,1)." },
        { group: "G2", cells: [3], size: 1, type: "Singleton", term: "AB", explanation: "Cell (1,1). Diagonal adjacency is strictly prohibited." }
      ],
      finalResult: "F = A'B' + AB (XNOR function)",
      verificationNote: "Demonstrates that diagonal cells cannot be grouped. Each cell remains a 2-literal term."
    },
    // ----------------------------------------------------
    // 3-VARIABLE WORKED MODELS
    // ----------------------------------------------------
    {
      id: "KM2.5-04",
      category: "3-Variable K-Map",
      difficulty: "Basic",
      target: "Minimize: F(A, B, C) = Sigma m(1, 3, 5, 7)",
      mapDimensions: "2x4 (8 cells)",
      minterms: [1, 3, 5, 7],
      groupingSteps: [
        { group: "G1", cells: [1, 3, 5, 7], size: 4, type: "Quad (2x2 subgrid)", term: "C", explanation: "Covers all cells in columns BC=01 (m1, m5) and BC=11 (m3, m7). Across these four cells, A changes (0,1), B changes (0,1), while C remains constant at 1." }
      ],
      finalResult: "F = C",
      verificationNote: "Eliminates 2 variables (A and B). Quad of 4 cells leaves a single literal C."
    },
    {
      id: "KM2.5-05",
      category: "3-Variable K-Map",
      difficulty: "Basic",
      target: "Minimize: F(A, B, C) = Sigma m(0, 2, 4, 6)",
      mapDimensions: "2x4 (8 cells)",
      minterms: [0, 2, 4, 6],
      groupingSteps: [
        { group: "G1", cells: [0, 2, 4, 6], size: 4, type: "Quad (Edge Wrapping)", term: "C'", explanation: "Column BC=00 (m0, m4) wraps around to column BC=10 (m2, m6). Variable C is 0 in both columns. Variables A and B change completely." }
      ],
      finalResult: "F = C'",
      verificationNote: "Classic demonstration of horizontal edge wrapping on an 8-cell map."
    },
    {
      id: "KM2.5-06",
      category: "3-Variable K-Map",
      difficulty: "Intermediate",
      target: "Minimize: F(A, B, C) = Sigma m(0, 1, 2, 4, 5, 6)",
      mapDimensions: "2x4 (8 cells)",
      minterms: [0, 1, 2, 4, 5, 6],
      groupingSteps: [
        { group: "G1", cells: [0, 1, 4, 5], size: 4, type: "Quad", term: "B'", explanation: "Columns BC=00 and BC=01 across both rows. B remains 0; A and C change." },
        { group: "G2", cells: [0, 2, 4, 6], size: 4, type: "Quad (Wrapping)", term: "C'", explanation: "Columns BC=00 and BC=10 across both rows. C remains 0; A and B change." }
      ],
      finalResult: "F = B' + C'",
      verificationNote: "POS check: Missing cells are m3 and m7 (where B=1 and C=1). Inverting gives (BC)' = B' + C'."
    },
    {
      id: "KM2.5-07",
      category: "3-Variable K-Map",
      difficulty: "Intermediate",
      target: "Minimize: F(A, B, C) = Sigma m(3, 4, 5, 6, 7)",
      mapDimensions: "2x4 (8 cells)",
      minterms: [3, 4, 5, 6, 7],
      groupingSteps: [
        { group: "G1", cells: [4, 5, 6, 7], size: 4, type: "Quad (Bottom Row)", term: "A", explanation: "All 4 cells of row A=1. Eliminates B and C completely." },
        { group: "G2", cells: [3, 7], size: 2, type: "Pair", term: "BC", explanation: "Column BC=11 covering m3 (row A=0) and m7 (row A=1). A changes and is eliminated." }
      ],
      finalResult: "F = A + BC",
      verificationNote: "Algebraic check: A + A'BC = A + BC by Redundancy Law. Grouping mirrors this exactly."
    },
    {
      id: "KM2.5-08",
      category: "3-Variable K-Map",
      difficulty: "Intermediate",
      target: "Minimize: F(A, B, C) = Sigma m(1, 2, 5, 7)",
      mapDimensions: "2x4 (8 cells)",
      minterms: [1, 2, 5, 7],
      groupingSteps: [
        { group: "G1", cells: [1, 5], size: 2, type: "Pair", term: "B'C", explanation: "Column BC=01 across rows A=0 and A=1. A is eliminated." },
        { group: "G2", cells: [5, 7], size: 2, type: "Pair", term: "AC", explanation: "Row A=1 across columns BC=01 and BC=11. B is eliminated. Overlaps m5." },
        { group: "G3", cells: [2], size: 1, type: "Singleton", term: "A'BC'", explanation: "Cell (0, 10). Has no adjacent 1s. Remains 3 literals." }
      ],
      finalResult: "F = B'C + AC + A'BC'",
      verificationNote: "Cell m2 is an isolated minterm that cannot combine with any other 1."
    },
    {
      id: "KM2.5-09",
      category: "3-Variable K-Map",
      difficulty: "Intermediate",
      target: "POS Minimization: Minimize F(A, B, C) = Pi M(0, 1, 4, 5)",
      mapDimensions: "2x4 (8 cells)",
      minterms: [],
      maxterms: [0, 1, 4, 5],
      groupingSteps: [
        { group: "G1", cells: [0, 1, 4, 5], size: 4, type: "Quad of 0s", term: "B", explanation: "Columns BC=00 and BC=01 where B=0. In POS maxterm polarity, B=0 corresponds to the uncomplemented sum literal B." }
      ],
      finalResult: "F = B",
      verificationNote: "Notice that grouping 0s directly generates the POS term B without inverting."
    },
    // ----------------------------------------------------
    // 4-VARIABLE WORKED MODELS
    // ----------------------------------------------------
    {
      id: "KM2.5-10",
      category: "4-Variable K-Map",
      difficulty: "Intermediate",
      target: "Four-Corner Wraparound: F(A, B, C, D) = Sigma m(0, 2, 8, 10)",
      mapDimensions: "4x4 (16 cells)",
      minterms: [0, 2, 8, 10],
      groupingSteps: [
        { group: "G1", cells: [0, 2, 8, 10], size: 4, type: "Corner Quad", term: "B'D'", explanation: "The four corners of the 4x4 map: top-left m0 (0000), top-right m2 (0010), bottom-left m8 (1000), bottom-right m10 (1010). Rows AB=00 and AB=10 share B=0. Columns CD=00 and CD=10 share D=0. A and C change and are eliminated." }
      ],
      finalResult: "F = B'D'",
      verificationNote: "Required syllabus example. Confirms two-dimensional wraparound adjacency."
    },
    {
      id: "KM2.5-11",
      category: "4-Variable K-Map",
      difficulty: "Intermediate",
      target: "Minimize: F(A, B, C, D) = Sigma m(0, 1, 2, 3, 8, 9, 10, 11)",
      mapDimensions: "4x4 (16 cells)",
      minterms: [0, 1, 2, 3, 8, 9, 10, 11],
      groupingSteps: [
        { group: "G1", cells: [0, 1, 2, 3, 8, 9, 10, 11], size: 8, type: "Octet (Edge Wrapping Rows)", term: "B'", explanation: "Top row AB=00 (m0..m3) and bottom row AB=10 (m8..m11) wrap together. Across all 8 cells, B=0 remains constant. A, C, and D all change through all combinations and are eliminated." }
      ],
      finalResult: "F = B'",
      verificationNote: "An octet of 8 cells eliminates 3 variables, leaving a single literal."
    },
    {
      id: "KM2.5-12",
      category: "4-Variable K-Map",
      difficulty: "Intermediate",
      target: "Minimize: F(A, B, C, D) = Sigma m(5, 7, 13, 15)",
      mapDimensions: "4x4 (16 cells)",
      minterms: [5, 7, 13, 15],
      groupingSteps: [
        { group: "G1", cells: [5, 7, 13, 15], size: 4, type: "Quad", term: "BD", explanation: "Rows AB=01 and AB=11 share B=1. Columns CD=01 and CD=11 share D=1. A and C are eliminated." }
      ],
      finalResult: "F = BD",
      verificationNote: "Eliminates 2 variables. Preserves literals B and D."
    },
    {
      id: "KM2.5-13",
      category: "4-Variable K-Map",
      difficulty: "Intermediate",
      target: "Minimize: F(A, B, C, D) = Sigma m(0, 4, 8, 12)",
      mapDimensions: "4x4 (16 cells)",
      minterms: [0, 4, 8, 12],
      groupingSteps: [
        { group: "G1", cells: [0, 4, 8, 12], size: 4, type: "Quad (Vertical Column)", term: "C'D'", explanation: "Entire first column CD=00 across all 4 rows. Variables A and B change through all 4 combinations and are eliminated." }
      ],
      finalResult: "F = C'D'",
      verificationNote: "A vertical column quad in a 4-variable map eliminates both row variables."
    },
    {
      id: "KM2.5-14",
      category: "4-Variable K-Map",
      difficulty: "Advanced",
      target: "Minimize: F(A, B, C, D) = Sigma m(0, 2, 5, 7, 8, 10, 13, 15)",
      mapDimensions: "4x4 (16 cells)",
      minterms: [0, 2, 5, 7, 8, 10, 13, 15],
      groupingSteps: [
        { group: "G1", cells: [0, 2, 8, 10], size: 4, type: "Corner Quad", term: "B'D'", explanation: "The four corners wrap together to form B'D'." },
        { group: "G2", cells: [5, 7, 13, 15], size: 4, type: "Center Quad", term: "BD", explanation: "The 2x2 central block in rows AB=01,11 and columns CD=01,11 gives BD." }
      ],
      finalResult: "F = B'D' + BD (or (B ⊕ D)')",
      verificationNote: "Classic checkerboard pattern of 8 cells reducing to the XNOR equivalence of B and D."
    },
    {
      id: "KM2.5-15",
      category: "4-Variable K-Map",
      difficulty: "Advanced",
      target: "Minimize: F(A, B, C, D) = Sigma m(1, 3, 7, 11, 15)",
      mapDimensions: "4x4 (16 cells)",
      minterms: [1, 3, 7, 11, 15],
      groupingSteps: [
        { group: "G1", cells: [3, 7, 11, 15], size: 4, type: "Quad (Column)", term: "CD", explanation: "Column CD=11 across all four rows. A and B are eliminated." },
        { group: "G2", cells: [1, 3], size: 2, type: "Pair (Horizontal)", term: "A'B'D", explanation: "Row AB=00 across columns CD=01 (m1) and CD=11 (m3). C is eliminated. Overlaps m3." }
      ],
      finalResult: "F = CD + A'B'D",
      verificationNote: "CD is an Essential Prime Implicant covering {7, 11, 15}. A'B'D is an Essential Prime Implicant covering m1."
    },
    // ----------------------------------------------------
    // DON'T-CARE CONDITIONS WORKED MODELS
    // ----------------------------------------------------
    {
      id: "KM2.5-16",
      category: "Don't-Care Minimization",
      difficulty: "Intermediate",
      target: "Syllabus Required Example: F(A, B, C) = Sigma m(1, 3, 7), d(5)",
      mapDimensions: "2x4 (8 cells)",
      minterms: [1, 3, 7],
      dontCares: [5],
      groupingSteps: [
        { group: "With Don't-Care", cells: [1, 3, 5, 7], size: 4, type: "Quad", term: "C", explanation: "By including optional don't-care cell 5 (m5), the three required 1s {1, 3, 7} combine with 5 into a full quad of size 4. This eliminates both A and B, producing the single literal C." },
        { group: "Without Don't-Care", cells: [1, 3], size: 2, type: "Pair", term: "A'C", explanation: "Without m5, we must use Pair {1, 3} -> A'C and Pair {3, 7} -> BC. The result would be F = A'C + BC (2 terms, 4 literals)." }
      ],
      finalResult: "F = C",
      verificationNote: "Proves that including the don't care at m5 saves 1 gate and 3 literals."
    },
    {
      id: "KM2.5-17",
      category: "Don't-Care Minimization",
      difficulty: "Advanced",
      target: "BCD to Excess-3 Bit Converter: F(A, B, C, D) = Sigma m(5, 6, 7, 8, 9), d(10, 11, 12, 13, 14, 15)",
      mapDimensions: "4x4 (16 cells)",
      minterms: [5, 6, 7, 8, 9],
      dontCares: [10, 11, 12, 13, 14, 15],
      groupingSteps: [
        { group: "G1", cells: [8, 9, 10, 11, 12, 13, 14, 15], size: 8, type: "Octet", term: "A", explanation: "Bottom two rows AB=11 and AB=10 contain required 1s {8, 9} and don't-cares {10..15}. Grouping all 8 cells eliminates B, C, and D, yielding literal A." },
        { group: "G2", cells: [6, 7, 14, 15], size: 4, type: "Quad", term: "BC", explanation: "Columns CD=11 and CD=10 across rows AB=01 and AB=11. Uses don't-cares {14, 15} to cover {6, 7}." },
        { group: "G3", cells: [5, 7, 13, 15], size: 4, type: "Quad", term: "BD", explanation: "Columns CD=01 and CD=11 across rows AB=01 and AB=11. Uses don't-cares {13, 15} to cover m5." }
      ],
      finalResult: "F = A + BC + BD = A + B(C + D)",
      verificationNote: "Standard practical design problem for invalid BCD combinations (10 to 15)."
    },
    {
      id: "KM2.5-18",
      category: "Don't-Care Minimization",
      difficulty: "Advanced",
      target: "Unhelpful Don't-Care: F(A, B, C) = Sigma m(0, 2), d(7)",
      mapDimensions: "2x4 (8 cells)",
      minterms: [0, 2],
      dontCares: [7],
      groupingSteps: [
        { group: "G1", cells: [0, 2], size: 2, type: "Pair (Wrapping)", term: "A'C'", explanation: "Cells m0 and m2 wrap horizontally in row A=0. C is 0; B changes." },
        { group: "Don't-care d(7)", cells: [7], size: 0, type: "Ignored", term: "-", explanation: "Cell 7 is located at A=1, BC=11. It has no adjacent required 1s. Grouping it would only add an unnecessary redundant term. It is set to 0 and ignored." }
      ],
      finalResult: "F = A'C'",
      verificationNote: "Crucial exam principle: Never group a don't-care unless it actively enlarges a group covering a required 1."
    },
    // ----------------------------------------------------
    // SPECIAL CASES WORKED MODELS
    // ----------------------------------------------------
    {
      id: "KM2.5-19",
      category: "Special Cases",
      difficulty: "Advanced",
      target: "Multiple Minimal Solutions: F(A, B, C, D) = Sigma m(1, 5, 6, 7, 11, 12, 13, 15)",
      mapDimensions: "4x4 (16 cells)",
      minterms: [1, 5, 6, 7, 11, 12, 13, 15],
      groupingSteps: [
        { group: "Cover 1", cells: "Quad {5,7,13,15} (BD) + Quad {1,5,11,15} (C'D) + Pair {6,7} (A'BC) + Pair {12,13} (AB C')", size: 4, type: "Option A", term: "BD + C'D + A'BC + ABC'", explanation: "Valid minimal cover containing 4 terms." },
        { group: "Cover 2", cells: "Quad {5,7,13,15} (BD) + Pair {1,5} (A'C'D) + Pair {6,7} (A'BC) + Pair {11,15} (ACD) + Pair {12,13} (ABC')", size: 4, type: "Option B", term: "Alternative valid minimal cover exists", explanation: "Shows students that K-Map minimization does not always have a uniquely singular minimal algebraic solution." }
      ],
      finalResult: "Multiple equally minimal solutions exist",
      verificationNote: "Demonstrates that equal cost solutions can differ in their secondary Prime Implicant choices."
    },
    {
      id: "KM2.5-20",
      category: "Special Cases",
      difficulty: "Basic",
      target: "Trivial Functions: F = Sigma m(all) vs F = Sigma m(none)",
      mapDimensions: "2x2, 2x4, 4x4",
      minterms: [],
      groupingSteps: [
        { group: "All 1s", cells: "All 2^n cells", size: 16, type: "Full Map", term: "1", explanation: "All variables change across the entire map. Output is logic constant 1 (VCC)." },
        { group: "All 0s", cells: "No cells", size: 0, type: "Empty Map", term: "0", explanation: "No required 1s exist to group. Output is logic constant 0 (GND)." }
      ],
      finalResult: "Full map = 1 | Empty map = 0",
      verificationNote: "Guarantees robust boundary handling in automated minimization tools."
    }
  ],

  examChecklist: [
    "Always check the Gray code headings (00, 01, 11, 10). A common error is writing 10 before 11.",
    "Look for corner quads: cells 0, 2, 8, 10 in a 4-variable map wrap in both directions to form B'D'.",
    "Identify Essential Prime Implicants first by finding 1-cells that have only one possible grouping.",
    "Do not group isolated don't-cares (X) by themselves.",
    "Count literals in your final expression: if a group of 4 exists, make sure it has n - 2 literals."
  ]
};

export default dldSection25Data;
