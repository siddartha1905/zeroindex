/**
 * Digital Logic Design (DLD) - Section 2.6 Data Module
 * Don't-Care Conditions in Karnaugh Maps
 * 
 * Strict formatting: Strictly zero em-dashes and zero en-dashes throughout.
 * All formulas use actual Unicode mathematical symbols: \u03A3 (Sigma) and \u03A0 (Pi).
 */

export const dldSection26Data = {
  id: "2.6",
  number: "2.6",
  title: "Don't-Care Conditions in Karnaugh Maps",
  badge: "Unit II · Advanced Map Minimization",
  status: "Planned / In Development",
  estimatedReadTime: "22 min read",
  dataScienceConnection: "In hardware acceleration for deep neural networks and edge inference devices, logic controllers frequently encounter restricted state spaces. For example, quantization tables and sparse tensor indices never produce certain binary combinations. Treating these unused states as don't-care conditions allows hardware synthesis tools to eliminate redundant logic gates and reduce silicon die area. Furthermore, multi-dimensional tensor indexing mirrors the folded hyperplane topology of 5-variable and 6-variable Karnaugh maps.",

  overview: "Real-world digital systems frequently involve switching functions where certain input combinations can never occur during normal operation, or where the output corresponding to specific input combinations has no physical consequence. Such conditions are termed don't-care conditions, denoted by X or d. When systematically utilized during Karnaugh map minimization, don't-care terms provide the designer with flexibility: they may be assigned either logic 1 or logic 0 to enlarge prime implicants into larger power-of-two groupings, thereby reducing the literal and gate count of the circuit. In this lesson, we study systematic don't-care handling across 2-variable, 3-variable, and 4-variable K-maps for both SOP and POS forms, provide a concise introduction to 5-variable dual-plane maps, and summarize essential rules in a dedicated Master Cheat Sheet and Practice Lab.",

  learningOutcomes: [
    "Differentiate mathematically and physically between logic 0, logic 1, and don't-care condition X.",
    "Identify real-world digital scenarios generating don't-cares, such as invalid BCD codes and mutually exclusive sensor states.",
    "Apply SOP grouping rules to selectively include don't-cares that enlarge 1-groups while leaving isolated don't-cares un-grouped.",
    "Apply POS grouping rules to selectively include don't-cares that enlarge 0-groups with correct literal polarity.",
    "Understand the multi-plane topology of a 5-variable K-map across Plane A=0 and Plane A=1 using a single solved illustration."
  ],

  introductoryBullets: [
    {
      label: "WHY",
      text: "Practical digital circuits operate within physical constraints where certain input codes never occur, allowing designers to leave those outputs unspecified."
    },
    {
      label: "WHERE",
      text: "Common in code converters (such as BCD 8421 invalid digits 10 through 15), mutually exclusive sensor interlocks, and state machine controllers."
    },
    {
      label: "WHAT",
      text: "A comprehensive study of don't-care conditions (marked X or d) in Karnaugh maps across two, three, and four variables, with a brief five-variable introduction."
    },
    {
      label: "HOW",
      text: "By strategically assigning X to 1 or 0 to enlarge prime implicants into larger power-of-two groupings, while ignoring any X that does not benefit required terms."
    },
    {
      label: "WHY CHOSEN",
      text: "Enlarges groups (pairs to quads, quads to octets), eliminating more variables and reducing total gate and literal counts in physical silicon."
    },
    {
      label: "REMEMBER",
      text: "X is an algebraic design freedom, not a physical voltage; isolated X cells that do not enlarge a required group must be left un-grouped."
    }
  ],

  foundations: {
    simpleDefinition: "A don't-care condition represents an input combination for which the digital circuit output does not matter, allowing the designer to treat it as either 0 or 1 to achieve the simplest possible logic circuit.",
    formalDefinition: "An incompletely specified Boolean function F: {0,1}^n -> {0,1,X} is defined over three mutually disjoint subsets of the Boolean domain: the ON-set (required minterms where F = 1), the OFF-set (required maxterms where F = 0), and the DC-set (don't-care minterms where F = X), such that ON-set U OFF-set U DC-set = {0,1}^n. During hardware synthesis, F is mapped to a completely specified function F*: {0,1}^n -> {0,1} satisfying F*(m) = 1 for all m in ON-set and F*(m) = 0 for all m in OFF-set, while F*(m) in {0,1} for all m in DC-set is chosen freely to minimize total hardware cost.",
    valueComparison: [
      {
        value: "Logic 0",
        symbol: "0",
        meaning: "Strictly Required Low Output",
        role: "The physical circuit must reliably produce a low voltage (logic 0). In SOP, it must be excluded from all groups. In POS, it must be completely covered.",
        hardwareImpact: "Tied to ground (0V / GND) or low output threshold for that specific input."
      },
      {
        value: "Logic 1",
        symbol: "1",
        meaning: "Strictly Required High Output",
        role: "The physical circuit must reliably produce a high voltage (logic 1). In SOP, every 1 must be covered by at least one prime implicant. In POS, it must be excluded from all groups.",
        hardwareImpact: "Tied to supply voltage (5V / 3.3V) or high output threshold for that specific input."
      },
      {
        value: "Don't-Care",
        symbol: "X or d",
        meaning: "Flexible Specification Variable",
        role: "Not a third physical logic voltage level. It is an algebraic wildcard during minimization. May be treated as 1 to enlarge a group, or 0 if unhelpful. Distinct from high-impedance Z (which represents open-circuit bus disconnection).",
        hardwareImpact: "The fabricated circuit will output a fixed 0 or 1, but the system specification guarantees this input will never occur or affect downstream logic."
      }
    ],
    whyExist: [
      {
        title: "Unused Input Combinations",
        detail: "Certain hardware states can never physically occur due to external constraints (for example, two mutually exclusive pushbuttons cannot be pressed at the same time)."
      },
      {
        title: "Invalid Binary Codes",
        detail: "Codes using a subset of binary patterns (such as 4-bit BCD using only 0000 to 1001) leave the remaining 6 patterns (1010 to 1111) unused during normal operation."
      },
      {
        title: "Unspecified Operating Conditions",
        detail: "The system specification does not constrain the output for transient or test states where the output value has no operational consequence."
      },
      {
        title: "Specification Flexibility",
        detail: "System architects deliberately grant implementation freedom to hardware designers, allowing synthesis tools to eliminate logic gates and reduce silicon area."
      }
    ],
    bcdCaseStudy: {
      title: "Example: Don't-Cares in 8421 BCD",
      description: "In Binary Coded Decimal (8421 code), 4 binary bits (A, B, C, D) represent the ten decimal digits 0 through 9 using minterms m0 through m9. Because 4 bits provide 16 possible combinations, the 6 binary patterns from 1010 (decimal 10) to 1111 (decimal 15) are invalid BCD digits. In any standard decimal system where inputs are guaranteed to come from a valid BCD source, minterms m10 through m15 are designated as don't-cares: d = {10, 11, 12, 13, 14, 15}.",
      caveat: "Important Design Consideration: Invalid input combinations can only be treated as don't-cares when the system requirements permit it. If the circuit is explicitly tasked with detecting illegal codes or raising a fault alarm, those outputs must be strictly specified (such as Error = 1) and cannot be treated as don't-cares. Never assume an invalid code is automatically a don't-care without consulting the specification.",
      significance: "Leveraging the 6 optional BCD cells to expand groups into octets and quads allows simplifying complex detectors into 1 to 3 compact terms, substantially reducing the required gates and inputs."
    },
    howHelp: {
      steps: [
        { step: "1. Identify Required Cells", text: "Mark all required 1s (for SOP) or required 0s (for POS) from the function's care set." },
        { step: "2. Plot Optional X Cells", text: "Mark all don't-care combinations with an X in the corresponding K-map cells." },
        { step: "3. Enlarge Valid Groups", text: "Use adjacent X cells to expand pairs into quads, or quads into octets (powers of 2: 1, 2, 4, 8, 16)." },
        { step: "4. Eliminate Variables", text: "Each doubling of group size eliminates one additional literal from the resulting product term or sum factor." },
        { step: "5. Ignore Unhelpful X Cells", text: "Any X cell that does not help enlarge a required group is simply left un-grouped (treated as 0 in SOP, or 1 in POS)." }
      ]
    },
    standardRules: [
      { num: 1, title: "Mark Specified Values", desc: "Mark all specified 1s and 0s correctly in their exact K-map cells." },
      { num: 2, title: "Mark Don't-Cares with X", desc: "Mark each declared don't-care cell with an X (or d)." },
      { num: 3, title: "SOP Grouping of 1s with X", desc: "For SOP, group required 1s with useful optional X cells to form the largest possible rectangular blocks." },
      { num: 4, title: "POS Grouping of 0s with X", desc: "For POS, group required 0s with useful optional X cells with correct maxterm sum polarity." },
      { num: 5, title: "Never Group Opposite Values", desc: "Never include a specified 0 in an SOP 1-group, and never include a specified 1 in a POS 0-group." },
      { num: 6, title: "Every Target Cell Covered", desc: "Every required 1 (in SOP) or required 0 (in POS) must be covered by at least one group." },
      { num: 7, title: "Don't-Cares Need Not All Be Covered", desc: "There is no requirement to cover all X cells. Only use Xs that improve group size." },
      { num: 8, title: "Omit X-Only Groups", desc: "A group containing only don't-care cells covers no required output and must be omitted as completely redundant." },
      { num: 9, title: "Verify on Specified Combinations", desc: "Verify the final Boolean expression against every specified care minterm and maxterm to ensure exact functional equivalence." }
    ]
  },

  method: {
    title: "K-Map Grouping Method with Don't-Cares",
    conceptualBridge: "Building on Section 2.5: In standard K-maps, every group must contain only 1s (for SOP) or only 0s (for POS). With don't-care conditions, selected X cells can be included in a group to enlarge it to a higher power of two (2, 4, 8, 16), eliminating additional variables.",
    keyPrinciples: [
      "Placing minterms (1s) and don't-cares (Xs) in an SOP map",
      "Placing maxterms (0s) and don't-cares (Xs) in a POS map",
      "SOP grouping: combine 1s and useful Xs into 2, 4, 8, or 16-cell blocks",
      "POS grouping: combine 0s and useful Xs into 2, 4, 8, or 16-cell blocks",
      "Doubling group size (e.g. pair to quad) eliminates one extra literal",
      "Ignoring isolated Xs that would require an extra group without covering new care cells",
      "Preserving strict separation: 1s and 0s can never share a group",
      "Deriving final simplified expressions directly from constant variable analysis"
    ],
    sopGroupingPrinciples: [
      "Plot required 1s for all care minterms and mark don't-care cells with X.",
      "Form groups of 1, 2, 4, 8, or 16 adjacent cells containing 1s and optionally useful Xs.",
      "Include an X cell only if it enlarges an existing group of 1s or covers an otherwise isolated 1.",
      "Never include a 0 in an SOP group, and never create a group containing only X cells.",
      "Derive product terms by retaining variables that remain constant across all cells in the group."
    ],
    posGroupingPrinciples: [
      "Plot required 0s for all care maxterms and mark don't-care cells with X.",
      "Form groups of 1, 2, 4, 8, or 16 adjacent cells containing 0s and optionally useful Xs.",
      "Include an X cell only if it enlarges an existing group of 0s or covers an otherwise isolated 0.",
      "Never include a 1 in a POS group, and never create a group containing only X cells.",
      "Derive sum factors by inverting polarity: constant 0 yields uncomplemented literal, constant 1 yields complemented literal."
    ],

    demoEnlarge: {
      title: "Demonstration 1: Enlarging a Pair to a Quad Using Don't-Cares",
      problemStatement: "Minimize in SOP: F(A, B, C) = \u03A3 m(1, 3), with don't-care d = {5, 7}",
      mapType: "threeVar",
      minterms: [1, 3],
      maxterms: [0, 2, 4, 6],
      dontCares: [5, 7],
      withoutX: {
        groups: [{ group: "G1", cells: [1, 3], term: "A'C", description: "Horizontal pair in row A=0" }],
        finalAnswer: "F = A'C",
        literalCount: 2,
        explanation: "Only the two required 1s are grouped. Fixed variables: A=0, C=1. Variable B changes."
      },
      withX: {
        groups: [{ group: "G1", cells: [1, 3, 5, 7], term: "C", description: "2x2 Quad spanning rows A=0 and A=1" }],
        finalAnswer: "F = C",
        literalCount: 1,
        explanation: "Don't-cares 5 and 7 join cells 1 and 3 to form a 4-cell quad. Variables A and B both change and are eliminated. The literal count drops from 2 to 1."
      },
      takeaway: "Using don't-cares 5 and 7 enlarged a 2-cell pair into a 4-cell quad, eliminating variable A and cutting gate requirements in half."
    },
    demoIgnore: {
      title: "Demonstration 2: Leaving an Optional Don't-Care Cell Unused",
      problemStatement: "Minimize in SOP: F(A, B, C) = \u03A3 m(1, 5, 7), with don't-care d = {3, 6}",
      mapType: "threeVar",
      minterms: [1, 5, 7],
      maxterms: [0, 2, 4],
      dontCares: [3, 6],
      quadGroup: {
        group: "G1",
        cells: [1, 3, 5, 7],
        term: "C",
        description: "Quad formed using optional cell 3 to cover all required 1s"
      },
      unusedCell: 6,
      finalAnswer: "F = C",
      explanation: "Required 1s are at cells 1, 5, and 7. Using don't-care cell 3 allows forming quad {1, 3, 5, 7}, which covers all three required 1s with the single literal C. Don't-care cell 6 remains. Because all required 1s are already covered, forming an extra group to cover cell 6 (such as pair {6, 7} = AB) would add an unnecessary product term without covering any new required 1. Therefore, cell 6 is left completely un-grouped (assigned 0 in the implementation).",
      takeaway: "Covering an X cell is optional, not mandatory. If an X does not enlarge a group of required target cells, covering it only adds unnecessary gates and literals."
    }
  },

  workedExamples: [
    {
      id: "DC-EX01",
      category: "2-Variable K-Map",
      form: "SOP",
      difficulty: "Basic",
      title: "Example 1: Single Minterm Enlarged by Don't-Care into a Row Pair",
      problemStatement: "Minimize in SOP: F(A, B) = \u03A3 m(0), with don't-care d = {1}",
      mapType: "twoVar",
      minterms: [0],
      maxterms: [2, 3],
      dontCares: [1],
      targetPolarity: "1",
      groups: [
        {
          group: "G1",
          cells: [0, 1],
          size: 2,
          type: "Row Pair (Row A=0)",
          fixedVars: "A=0; B changes (0 to 1)",
          term: "A'",
          annotation: "Horizontal pair in row A=0 eliminates variable B"
        }
      ],
      stepByStep: [
        "Plot required 1 at m0 (00), 0s at m2 (10) and m3 (11), and X at m1 (01).",
        "Without the don't-care cell, m0 is an isolated single-cell group yielding A'B'.",
        "Including optional cell m1 (X) allows forming horizontal pair {0, 1} across row A=0.",
        "Across pair {0, 1}, variable A remains fixed at 0 (producing literal A') while B changes from 0 to 1 and is eliminated."
      ],
      finalAnswer: "F = A'",
      verificationNote: "All care conditions verified: m0 gives A'=1; m2 and m3 give A'=0. Literal count reduced from 2 to 1."
    },
    {
      id: "DC-EX02",
      category: "2-Variable K-Map",
      form: "SOP",
      difficulty: "Basic",
      title: "Example 2: Diagonal Don't-Care That Must Be Ignored",
      problemStatement: "Minimize in SOP: F(A, B) = \u03A3 m(1), with don't-care d = {2}",
      mapType: "twoVar",
      minterms: [1],
      maxterms: [0, 3],
      dontCares: [2],
      targetPolarity: "1",
      groups: [
        {
          group: "G1",
          cells: [1],
          size: 1,
          type: "Single Cell {1}",
          fixedVars: "A=0, B=1",
          term: "A'B",
          annotation: "Isolated 1-cell; cannot group diagonally with cell 2"
        }
      ],
      stepByStep: [
        "Plot required 1 at m1 (01), don't-care X at m2 (10), and 0s at m0 (00) and m3 (11).",
        "Check adjacency: cell 1 (01) and cell 2 (10) differ by two bits (Hamming distance = 2), so diagonal grouping is physically invalid.",
        "Cell 2 contains only an optional don't-care. Covering cell 2 with an extra group would add redundant product term AB' without covering any required 1.",
        "Therefore, cell 2 is left un-grouped (assigned 0 in the implementation)."
      ],
      finalAnswer: "F = A'B",
      verificationNote: "Care conditions verified: m1 gives 1; m0 and m3 give 0. Cell 2 outputs 0, which is fully permitted."
    },
    {
      id: "DC-EX03",
      category: "2-Variable K-Map",
      form: "POS",
      difficulty: "Basic",
      title: "Example 3: 2-Variable POS Maxterm Enlarged by Don't-Care",
      problemStatement: "Minimize in POS: F(A, B) = \u03A0 M(0), with don't-care d = {2}",
      mapType: "twoVar",
      minterms: [1, 3],
      maxterms: [0],
      dontCares: [2],
      targetPolarity: "0",
      groups: [
        {
          group: "G1",
          cells: [0, 2],
          size: 2,
          type: "Column Pair (Col B=0)",
          fixedVars: "B=0; A changes (0 to 1)",
          term: "B",
          annotation: "POS sum term: fixed 0 yields uncomplemented literal B"
        }
      ],
      stepByStep: [
        "Plot required 0 at M0 (00), optional X at M2 (10), and required 1s at M1 (01) and M3 (11).",
        "Without don't-care cell 2, M0 is an isolated zero-cell yielding sum factor (A + B).",
        "Including optional cell 2 (X) forms vertical column pair {0, 2} in column B=0.",
        "Across column pair {0, 2}, variable B remains fixed at 0 (producing sum literal B) while A changes and is eliminated."
      ],
      finalAnswer: "F = B",
      verificationNote: "Care conditions verified: M0 gives B=0; M1 and M3 give B=1. Factoring eliminated literal A."
    },
    {
      id: "DC-EX04",
      category: "3-Variable K-Map",
      form: "SOP",
      difficulty: "Intermediate",
      title: "Example 4: Don't-Cares Enlarge a 2-Cell Pair to a 4-Cell Quad",
      problemStatement: "Minimize in SOP: F(A, B, C) = \u03A3 m(1, 3), with don't-care d = {5, 7}",
      mapType: "threeVar",
      minterms: [1, 3],
      maxterms: [0, 2, 4, 6],
      dontCares: [5, 7],
      targetPolarity: "1",
      groups: [
        {
          group: "G1",
          cells: [1, 3, 5, 7],
          size: 4,
          type: "Quad (Cols BC=01 & 11)",
          fixedVars: "C=1; A changes (0 to 1), B changes (0 to 1)",
          term: "C",
          annotation: "4-cell quad eliminates both A and B"
        }
      ],
      stepByStep: [
        "Plot required 1s at m1 (001) and m3 (011) in row A=0.",
        "Plot don't-care Xs at m5 (101) and m7 (111) in row A=1.",
        "Without don't-cares, {1, 3} forms a horizontal pair in row A=0 yielding A'C (2 literals).",
        "With don't-cares {5, 7}, cells {1, 3, 5, 7} form a 2x2 quad across both rows.",
        "In this quad, C=1 is constant across all 4 cells. Variables A and B both toggle and are eliminated."
      ],
      finalAnswer: "F = C",
      verificationNote: "Care conditions verified: m1 and m3 give C=1; m0, m2, m4, m6 all have C=0 and give 0. Result is a single literal."
    },
    {
      id: "DC-EX05",
      category: "3-Variable K-Map",
      form: "SOP",
      difficulty: "Intermediate",
      title: "Example 5: Left-Right Edge Wraparound Quad Formed with Don't-Cares",
      problemStatement: "Minimize in SOP: F(A, B, C) = \u03A3 m(0, 2), with don't-care d = {4, 6}",
      mapType: "threeVar",
      minterms: [0, 2],
      maxterms: [1, 3, 5, 7],
      dontCares: [4, 6],
      targetPolarity: "1",
      groups: [
        {
          group: "G1",
          cells: [0, 2, 4, 6],
          size: 4,
          type: "Wraparound Quad (Cols BC=00 & 10)",
          fixedVars: "C=0; A changes (0 to 1), B changes (0 to 1)",
          term: "C'",
          annotation: "Left and right column edges wrap around"
        }
      ],
      stepByStep: [
        "Plot required 1s at m0 (000) and m2 (010).",
        "Plot don't-care Xs at m4 (100) and m6 (110).",
        "Column BC=00 (cells 0, 4) and column BC=10 (cells 2, 6) are adjacent by wraparound (differ only in bit B).",
        "Together, cells {0, 2, 4, 6} form a wraparound quad covering both required 1s.",
        "Across the quad, C=0 remains fixed (yielding literal C') while A and B both change and are eliminated."
      ],
      finalAnswer: "F = C'",
      verificationNote: "Care conditions: m0 and m2 have C=0 yielding 1; m1, m3, m5, m7 have C=1 yielding 0. Expression is minimal."
    },
    {
      id: "DC-EX06",
      category: "3-Variable K-Map",
      form: "SOP",
      difficulty: "Intermediate",
      title: "Example 6: Selective Inclusion - One Don't-Care Used, One Left Unused",
      problemStatement: "Minimize in SOP: F(A, B, C) = \u03A3 m(1, 5, 7), with don't-care d = {3, 6}",
      mapType: "threeVar",
      minterms: [1, 5, 7],
      maxterms: [0, 2, 4],
      dontCares: [3, 6],
      targetPolarity: "1",
      groups: [
        {
          group: "G1",
          cells: [1, 3, 5, 7],
          size: 4,
          type: "Quad (Cols BC=01 & 11)",
          fixedVars: "C=1; A changes (0 to 1), B changes (0 to 1)",
          term: "C",
          annotation: "Uses d3 to enlarge {1, 5, 7} to a quad"
        }
      ],
      stepByStep: [
        "Plot required 1s at m1, m5, m7; don't-cares at m3, m6; 0s at m0, m2, m4.",
        "Evaluate d3: Including cell 3 combines with {1, 5, 7} to form 4-cell quad {1, 3, 5, 7}, covering all three required 1s with term C.",
        "Evaluate d6: Cell 6 is a don't-care. All required 1s are ALREADY covered by quad G1.",
        "Forming an additional group to cover cell 6 (such as pair {6, 7} = AB) would add an unnecessary term without covering any new required 1.",
        "Therefore, cell 3 is treated as 1, while cell 6 is ignored (treated as 0)."
      ],
      finalAnswer: "F = C",
      verificationNote: "All required 1s (1, 5, 7) output 1; all required 0s (0, 2, 4) output 0. Unused don't-care 6 correctly outputs 0."
    },
    {
      id: "DC-EX07",
      category: "3-Variable K-Map",
      form: "POS",
      difficulty: "Intermediate",
      title: "Example 7: 3-Variable POS Wraparound Quad with Don't-Cares",
      problemStatement: "Minimize in POS: F(A, B, C) = \u03A0 M(0, 2), with don't-care d = {4, 6}",
      mapType: "threeVar",
      minterms: [1, 3, 5, 7],
      maxterms: [0, 2],
      dontCares: [4, 6],
      targetPolarity: "0",
      groups: [
        {
          group: "G1",
          cells: [0, 2, 4, 6],
          size: 4,
          type: "Wraparound Zero-Quad (Cols BC=00 & 10)",
          fixedVars: "C=0; A and B change",
          term: "C",
          annotation: "POS sum term: fixed 0 yields uncomplemented literal C"
        }
      ],
      stepByStep: [
        "Plot required 0s at M0 (000) and M2 (010).",
        "Plot optional Xs at M4 (100) and M6 (110).",
        "Without don't-cares, {0, 2} forms a wraparound pair in row A=0 yielding sum factor (A + C).",
        "Using optional cells 4 and 6 enlarges the pair into a 4-cell wraparound quad {0, 2, 4, 6}.",
        "Across this quad, C=0 is fixed across all 4 cells. In POS grouping, constant 0 gives uncomplemented literal C.",
        "Variables A and B both change and are eliminated."
      ],
      finalAnswer: "F = C",
      verificationNote: "Check specified rows: M0 and M2 have C=0, giving F=0. M1, M3, M5, M7 have C=1, giving F=1. Matches specification exactly."
    },
    {
      id: "DC-EX08",
      category: "4-Variable K-Map",
      form: "SOP",
      difficulty: "Advanced",
      title: "Example 8: BCD Digit 5 to 9 Detector with Invalid Code Don't-Cares",
      problemStatement: "Minimize in SOP: F(A, B, C, D) = \u03A3 m(5, 6, 7, 8, 9), with don't-care d = {10, 11, 12, 13, 14, 15}",
      mapType: "fourVar",
      minterms: [5, 6, 7, 8, 9],
      maxterms: [0, 1, 2, 3, 4],
      dontCares: [10, 11, 12, 13, 14, 15],
      targetPolarity: "1",
      groups: [
        {
          group: "G1",
          cells: [8, 9, 10, 11, 12, 13, 14, 15],
          size: 8,
          type: "Octet (Rows AB=11 & 10)",
          fixedVars: "A=1; B, C, D change",
          term: "A",
          annotation: "Combines m8, m9 with d10-d15 into bottom two rows"
        },
        {
          group: "G2",
          cells: [5, 7, 13, 15],
          size: 4,
          type: "Quad (Cols CD=01 & 11, Rows 01 & 11)",
          fixedVars: "B=1, D=1; A, C change",
          term: "BD",
          annotation: "Covers m5, m7 using d13, d15"
        },
        {
          group: "G3",
          cells: [6, 7, 14, 15],
          size: 4,
          type: "Quad (Cols CD=11 & 10, Rows 01 & 11)",
          fixedVars: "B=1, C=1; A, D change",
          term: "BC",
          annotation: "Covers m6 using d14, d15"
        }
      ],
      stepByStep: [
        "Plot required 1s at m5, m6, m7, m8, m9 (valid BCD digits 5 through 9).",
        "Plot required 0s at m0, m1, m2, m3, m4 (valid BCD digits 0 through 4).",
        "Plot don't-care Xs at m10 through m15 (invalid BCD bit patterns 1010 through 1111).",
        "Group G1: Cells {8, 9, 10, 11, 12, 13, 14, 15} form an 8-cell octet spanning the entire bottom half (rows AB=11 and AB=10). Fixed variable A=1 gives term A.",
        "Group G2: Cells {5, 7, 13, 15} form a 4-cell quad covering m5 and m7. Fixed variables B=1, D=1 give term BD.",
        "Group G3: Cells {6, 7, 14, 15} form a 4-cell quad covering m6. Fixed variables B=1, C=1 give term BC.",
        "All 5 required 1s are covered. Summing prime implicants gives F = A + BC + BD (or factored as A + B(C + D))."
      ],
      finalAnswer: "F = A + BC + BD",
      verificationNote: "Check boundaries: 4 (0100) gives A=0, BC=0, BD=0 -> 0; 5 (0101) gives BD=1 -> 1; 8 (1000) gives A=1 -> 1; 9 (1001) gives A=1 -> 1. Valid BCD domain is perfectly covered."
    },
    {
      id: "DC-EX09",
      category: "4-Variable K-Map",
      form: "SOP",
      difficulty: "Intermediate",
      title: "Example 9: Four-Corner Wraparound Quad Formed with Don't-Cares",
      problemStatement: "Minimize in SOP: F(A, B, C, D) = \u03A3 m(0, 8), with don't-care d = {2, 10}",
      mapType: "fourVar",
      minterms: [0, 8],
      maxterms: [1, 3, 4, 5, 6, 7, 9, 11, 12, 13, 14, 15],
      dontCares: [2, 10],
      targetPolarity: "1",
      groups: [
        {
          group: "G1",
          cells: [0, 2, 8, 10],
          size: 4,
          type: "Corner Quad {0, 2, 8, 10}",
          fixedVars: "B=0, D=0; A and C change",
          term: "B'D'",
          annotation: "Four corners wrap around horizontally and vertically"
        }
      ],
      stepByStep: [
        "Plot required 1s at m0 (0000) and m8 (1000).",
        "Plot don't-care Xs at m2 (0010) and m10 (1010).",
        "Without don't-cares, {0, 8} is a vertical pair in column 00 yielding B'C'D' (3 literals).",
        "Including optional corner cells 2 and 10 forms the classic 4-corner quad {0, 2, 8, 10}.",
        "Across all four corners, B=0 and D=0 remain constant. Variables A and C both change and are eliminated.",
        "Resulting term is B'D' (2 literals, saving 1 literal and doubling group size)."
      ],
      finalAnswer: "F = B'D'",
      verificationNote: "Care conditions: m0 and m8 have B=0, D=0 -> 1; all other care cells have either B=1 or D=1 -> 0."
    },
    {
      id: "DC-EX10",
      category: "4-Variable K-Map",
      form: "SOP",
      difficulty: "Advanced",
      title: "Example 10: Overlapping Quads with Strategic Selection and Ignored Don't-Cares",
      problemStatement: "Minimize in SOP: F(A, B, C, D) = \u03A3 m(1, 3, 7, 11, 15), with don't-care d = {0, 2, 5}",
      mapType: "fourVar",
      minterms: [1, 3, 7, 11, 15],
      maxterms: [4, 6, 8, 9, 10, 12, 13, 14],
      dontCares: [0, 2, 5],
      targetPolarity: "1",
      groups: [
        {
          group: "G1",
          cells: [3, 7, 11, 15],
          size: 4,
          type: "Column Quad (Col CD=11)",
          fixedVars: "C=1, D=1; A, B change",
          term: "CD",
          annotation: "Essential column quad covers m7, m11, m15"
        },
        {
          group: "G2",
          cells: [1, 3, 5, 7],
          size: 4,
          type: "Quad (Rows AB=00 & 01, Cols 01 & 11)",
          fixedVars: "A=0, D=1; B, C change",
          term: "A'D",
          annotation: "Covers m1 using d5 and sharing m3, m7"
        }
      ],
      stepByStep: [
        "Plot required 1s at m1, m3, m7, m11, m15; don't-cares at m0, m2, m5; 0s at remaining cells.",
        "Identify essential prime implicant: Column CD=11 contains cells {3, 7, 11, 15}. Cells 11 and 15 have no other adjacent 1s. This forms quad G1 = CD.",
        "Now cover remaining required 1 at m1: m1 can pair with m3 (A'B'D) or, using don't-care m5 along with m3 and m7, form a 4-cell quad {1, 3, 5, 7}. Quad G2 yields term A'D.",
        "Evaluate remaining don't-cares: Cells 0 and 2 are optional Xs. Since all required 1s are now covered, grouping cells 0 and 2 would only add redundant terms.",
        "Therefore, d0 and d2 are ignored (assigned 0), while d5 is included (assigned 1)."
      ],
      finalAnswer: "F = CD + A'D",
      verificationNote: "Check care minterms: 1, 3, 7, 11, 15 all produce 1. Check all care zeros: all produce 0. Ignored cells 0 and 2 produce 0."
    },
    {
      id: "DC-EX11",
      category: "4-Variable K-Map",
      form: "POS",
      difficulty: "Advanced",
      title: "Example 11: 4-Variable POS Octet Formed Across Don't-Care Row",
      problemStatement: "Minimize in POS: F(A, B, C, D) = \u03A0 M(4, 5, 6, 7), with don't-care d = {12, 13, 14, 15}",
      mapType: "fourVar",
      minterms: [0, 1, 2, 3, 8, 9, 10, 11],
      maxterms: [4, 5, 6, 7],
      dontCares: [12, 13, 14, 15],
      targetPolarity: "0",
      groups: [
        {
          group: "G1",
          cells: [4, 5, 6, 7, 12, 13, 14, 15],
          size: 8,
          type: "Octet (Rows AB=01 & 11)",
          fixedVars: "B=1; A, C, D change",
          term: "B'",
          annotation: "POS sum term: fixed 1 produces complemented sum literal B'"
        }
      ],
      stepByStep: [
        "Plot required 0s at row AB=01 (cells 4, 5, 6, 7).",
        "Plot don't-care Xs at row AB=11 (cells 12, 13, 14, 15).",
        "Without don't-cares, the required row of zeros {4, 5, 6, 7} forms a quad yielding POS factor (A + B').",
        "Including the entire don't-care row {12, 13, 14, 15} combines rows 01 and 11 into an 8-cell octet {4, 5, 6, 7, 12, 13, 14, 15}.",
        "Across this octet, B=1 is constant across all 8 cells. In POS grouping, constant 1 produces complemented sum literal B'.",
        "Variables A, C, and D all vary and are eliminated."
      ],
      finalAnswer: "F = B'",
      verificationNote: "Check care maxterms: cells 4, 5, 6, 7 have B=1 -> B'=0 -> F=0. Check care minterms: cells 0, 1, 2, 3, 8, 9, 10, 11 have B=0 -> B'=1 -> F=1. Matches perfectly."
    }
  ],

  fiveVarIntro: {
    definition: "A five-variable Karnaugh map represents switching functions of 5 input variables (A, B, C, D, E) comprising 2^5 = 32 minterms (m0 through m31). Because a single 2D plane can only represent 4 variables (16 cells) with Gray-code single-bit adjacency, a 5-variable map is constructed as two parallel 16-cell four-variable planes: Plane 0 where A = 0 (m0 to m15) and Plane 1 where A = 1 (m16 to m31).",
    planesDescription: "Both planes share identical row coordinates (BC: 00, 01, 11, 10) and column coordinates (DE: 00, 01, 11, 10). Variable A acts as the third spatial dimension selecting between the two planes.",
    crossPlaneAdjacency: "In addition to the 4 standard planar adjacencies (up, down, left, right including boundary wraparounds), each cell m in Plane 0 is adjacent to cell m + 16 in Plane 1 directly above it. Corresponding cells across the two planes differ in exactly one variable: variable A.",
    matrixLayout: {
      rowVar: "BC",
      colVar: "DE",
      rows: ["00", "01", "11", "10"],
      cols: ["00", "01", "11", "10"],
      plane0: [
        [0, 1, 3, 2],
        [4, 5, 7, 6],
        [12, 13, 15, 14],
        [8, 9, 11, 10]
      ],
      plane1: [
        [16, 17, 19, 18],
        [20, 21, 23, 22],
        [28, 29, 31, 30],
        [24, 25, 27, 26]
      ]
    },
    solvedModel: {
      title: "Single Solved Model: Cross-Plane Octet Grouping",
      problemStatement: "Simplify: F(A, B, C, D, E) = \u03A3 m(0, 2, 4, 6, 16, 18, 20, 22)",
      minterms: [0, 2, 4, 6, 16, 18, 20, 22],
      dontCares: [],
      plane0Cells: [0, 2, 4, 6],
      plane1Cells: [16, 18, 20, 22],
      groups: [
        {
          group: "G1",
          cells: [0, 2, 4, 6, 16, 18, 20, 22],
          size: 8,
          type: "Cross-Plane Octet (Rows BC=00 & 01, Cols DE=00 & 10 across both planes)",
          fixedVars: "B=0, E=0; A changes (0 to 1), C changes (0 to 1), D changes (0 to 1)",
          term: "B'E'",
          annotation: "Superimposed 4-cell quads in Plane 0 and Plane 1 combine into an 8-cell octet"
        }
      ],
      stepByStep: [
        "In Plane 0 (A = 0): Cells {0, 2, 4, 6} occupy rows BC=00, 01 and columns DE=00, 10. This forms a 4-cell quad with fixed variables A=0, B=0, E=0 (term A'B'E').",
        "In Plane 1 (A = 1): Cells {16, 18, 20, 22} occupy the exact same coordinate positions (rows BC=00, 01 and columns DE=00, 10). This forms a 4-cell quad with fixed variables A=1, B=0, E=0 (term AB'E').",
        "Because corresponding cells across both planes are physically adjacent, the two 4-cell quads superimpose to form a single 8-cell octet {0, 2, 4, 6, 16, 18, 20, 22}.",
        "Across this 8-cell octet: variable A changes (0 in Plane 0, 1 in Plane 1) and is eliminated; variable C changes (0 in row 00, 1 in row 01) and is eliminated; variable D changes (0 in col 00, 1 in col 10) and is eliminated.",
        "Variables B=0 and E=0 remain constant across all 8 cells, yielding the single minimal product term B'E'."
      ],
      finalAnswer: "F = B'E'",
      explanation: "By superimposing identical 4-cell groups in both planes, the variable distinguishing the planes (variable A) is eliminated algebraically: A'B'E' + AB'E' = (A' + A)B'E' = 1 \u00B7 B'E' = B'E'. 5-variable maps provide a conceptual bridge to multi-plane topologies, while standard minimization focuses on 2-, 3-, and 4-variable maps."
    }
  },

  cheatSheet: {
    title: "Master Cheat Sheet: Don't-Care Conditions",
    subtitle: "One-glance visual reference: truth-table markings, SOP vs POS comparison, operating rules, quick method, and common mistakes.",
    markingsSummary: [
      {
        value: "0",
        name: "Logic 0",
        meaning: "Required LOW output (0V / GND). Excluded from SOP 1-groups; must be completely covered in POS 0-groups."
      },
      {
        value: "1",
        name: "Logic 1",
        meaning: "Required HIGH output (VDD). Must be completely covered in SOP 1-groups; excluded from POS 0-groups."
      },
      {
        value: "X or d",
        name: "Don't-Care",
        meaning: "Unspecified output. Freely assigned as 1 or 0 during minimization to enlarge groups. Never a physical voltage; distinct from high-impedance Z."
      }
    ],
    quickMethod: [
      { step: "1. Read Function", text: "Identify care minterms (1s), care maxterms (0s), and declared don't-cares (X)." },
      { step: "2. Plot Values", text: "Place 1s and Xs (for SOP) or 0s and Xs (for POS) in their exact Gray-code cells." },
      { step: "3. Form Useful Groups", text: "Combine required target cells with useful Xs into power-of-two rectangles (1, 2, 4, 8, 16)." },
      { step: "4. Derive Literals", text: "Identify variables that remain fixed across each group. Eliminate all changing variables." },
      { step: "5. Write Expression", text: "Sum product terms (SOP) or multiply sum factors (POS) to form the minimal equation." },
      { step: "6. Verify Outputs", text: "Confirm that every specified care minterm and maxterm evaluates correctly." }
    ],
    groupingRules: [
      { num: 1, rule: "Cover All Required Target Cells", detail: "Every specified 1 (in SOP) or specified 0 (in POS) must be included in at least one prime implicant." },
      { num: 2, rule: "Selective Use of Don't-Cares", detail: "Include an X only if it doubles group size (2 to 4, 4 to 8), eliminating an extra literal. Leave isolated Xs un-grouped." },
      { num: 3, rule: "Never Group Opposite Values", detail: "A group of 1s must never include a 0. A group of 0s must never include a 1." },
      { num: 4, rule: "Omit All-X Groups", detail: "A group containing only don't-care cells covers no required function output and is completely redundant." },
      { num: 5, rule: "Powers of Two Only", detail: "Group dimensions must always be powers of two (1, 2, 4, 8, 16). Groups of 3, 5, or 6 cells are strictly invalid." },
      { num: 6, rule: "Wrap Around Edges", detail: "Left and right edges, as well as top and bottom edges, are adjacent and wrap around on 3-variable and 4-variable maps." },
      { num: 7, rule: "POS Complement Polarity", detail: "In POS grouping, a variable fixed at 0 gives an uncomplemented sum literal (A), while a variable fixed at 1 gives a complemented literal (A')." },
      { num: 8, rule: "Verify Against Care Set", detail: "Always verify the simplified equation by substituting all care minterm and maxterm combinations." }
    ],
    sopVsPos: [
      { aspect: "Target Cells Covered", sop: "Required 1s (must all be covered)", pos: "Required 0s (must all be covered)" },
      { aspect: "Role of Don't-Care X", sop: "Treated as 1 if it enlarges a 1-group; ignored otherwise", pos: "Treated as 0 if it enlarges a 0-group; ignored otherwise" },
      { aspect: "Excluded Cells", sop: "Never include any specified 0-cell", pos: "Never include any specified 1-cell" },
      { aspect: "Literal Extraction", sop: "Constant 1 gives uncomplemented (A); constant 0 gives complemented (A')", pos: "Constant 0 gives uncomplemented (A); constant 1 gives complemented (A')" },
      { aspect: "Term Type", sop: "Product terms summed together (e.g. AB + CD)", pos: "Sum factors multiplied together (e.g. (A+B)(C+D))" },
      { aspect: "Isolated X Cells", sop: "Omitted (assigned 0 in implementation)", pos: "Omitted (assigned 1 in implementation)" }
    ],
    commonMistakes: [
      {
        mistake: "1. Feeling Obligated to Cover Every X Cell",
        fix: "Don't-cares are optional resources, not obligations. Never create a standalone group consisting only of X cells or an extra group just to cover an isolated X."
      },
      {
        mistake: "2. Mixing Specified 1s and Specified 0s",
        fix: "In SOP, a group of 1s can include Xs but must never include a 0. In POS, a group of 0s can include Xs but must never include a 1."
      },
      {
        mistake: "3. Assuming X Means High-Impedance (Z)",
        fix: "Don't-care X is a Boolean logic synthesis wildcard (0 or 1). Tri-state Z is an electrical open-circuit state on a shared physical bus. They are completely different concepts."
      },
      {
        mistake: "4. Forgetting Variable Polarity in POS Sum Terms",
        fix: "In POS, a constant 0 produces an uncomplemented variable (e.g. A=0 yields A), while a constant 1 produces a complemented variable (e.g. A=1 yields A')."
      },
      {
        mistake: "5. Assuming Invalid Codes Are Always Don't-Cares",
        fix: "Unused codes (such as BCD 10-15) can only be treated as don't-cares if the design specification allows it. If an error detector or safety interlock is required, those outputs must be strictly specified."
      },
      {
        mistake: "6. Overlooking Redundant Groups",
        fix: "Always check essential prime implicant coverage. Form the largest valid groups (powers of 2), but eliminate any redundant group whose required target cells are already covered by other groups."
      }
    ]
  },

  practiceProblems: [
    {
      id: "DC-P01",
      category: "2-Variable K-Map",
      form: "SOP",
      difficulty: "Basic",
      part: "A",
      problemStatement: "Minimize in SOP: F(A, B) = \u03A3 m(2), with don't-care d = {3}",
      mapType: "twoVar",
      minterms: [2],
      maxterms: [0, 1],
      dontCares: [3],
      targetPolarity: "1",
      hint: "Cell 2 is at (1, 0) and cell 3 is at (1, 1). Check if they share row A=1.",
      steps: [
        "Plot required 1 at m2 (10), don't-care X at m3 (11), and 0s at m0 (00) and m1 (01).",
        "Combine m2 and optional cell m3 into horizontal pair {2, 3} across row A=1.",
        "Variable A=1 is constant across the pair. Variable B changes (0 to 1) and is eliminated."
      ],
      finalAnswer: "F = A",
      takeaway: "Using don't-care cell 3 enlarged the single 1-cell at m2 into a 2-cell row pair, eliminating literal B to give F = A.",
      groups: [
        { group: "G1", cells: [2, 3], size: 2, type: "Row Pair", fixedVars: "A=1", term: "A" }
      ]
    },
    {
      id: "DC-P02",
      category: "2-Variable K-Map",
      form: "SOP",
      difficulty: "Basic",
      part: "A",
      problemStatement: "Minimize in SOP: F(A, B) = \u03A3 m(0), with don't-care d = {3}",
      mapType: "twoVar",
      minterms: [0],
      maxterms: [1, 2],
      dontCares: [3],
      targetPolarity: "1",
      hint: "Cell 0 is at (0, 0) and cell 3 is at (1, 1). Are they adjacent?",
      steps: [
        "Plot required 1 at m0 (00), don't-care X at m3 (11), and 0s at m1 (01) and m2 (10).",
        "Cells 0 and 3 are diagonally opposite and cannot group together.",
        "Covering cell 3 would require adding a redundant term AB that covers no required 1s.",
        "Cell 0 forms a single-cell group {0} with fixed literals A=0, B=0 (term A'B'). Cell 3 is ignored."
      ],
      finalAnswer: "F = A'B'",
      takeaway: "Diagonal don't-cares cannot be grouped with target cells and must be left un-grouped.",
      groups: [
        { group: "G1", cells: [0], size: 1, type: "Single Cell", fixedVars: "A=0, B=0", term: "A'B'" }
      ]
    },
    {
      id: "DC-P03",
      category: "2-Variable K-Map",
      form: "POS",
      difficulty: "Basic",
      part: "B",
      problemStatement: "Minimize in POS: F(A, B) = \u03A0 M(1), with don't-care d = {3}",
      mapType: "twoVar",
      minterms: [0, 2],
      maxterms: [1],
      dontCares: [3],
      targetPolarity: "0",
      hint: "Maxterm 1 is at (0, 1) and cell 3 is at (1, 1). Check column B=1.",
      steps: [
        "Plot required 0 at M1 (01), don't-care X at M3 (11), and 1s at M0 (00) and M2 (10).",
        "Cells 1 and 3 form vertical column pair {1, 3} in column B=1.",
        "In POS grouping, variable B=1 is constant across the column, yielding complemented sum factor B'.",
        "Variable A changes from 0 to 1 and is eliminated."
      ],
      finalAnswer: "F = B'",
      takeaway: "Maxterm 1 combines with don't-care 3 into a column pair yielding single sum literal B'.",
      groups: [
        { group: "G1", cells: [1, 3], size: 2, type: "Column Pair", fixedVars: "B=1", term: "B'" }
      ]
    },
    {
      id: "DC-P04",
      category: "3-Variable K-Map",
      form: "SOP",
      difficulty: "Basic",
      part: "B",
      problemStatement: "Minimize in SOP: F(A, B, C) = \u03A3 m(0, 1), with don't-care d = {2, 3}",
      mapType: "threeVar",
      minterms: [0, 1],
      maxterms: [4, 5, 6, 7],
      dontCares: [2, 3],
      targetPolarity: "1",
      hint: "Cells 0, 1, 2, 3 span the entire row A=0 across all four columns.",
      steps: [
        "Plot required 1s at m0 (000), m1 (001); don't-cares at m2 (010), m3 (011).",
        "Together, cells {0, 1, 2, 3} form a full 4-cell row quad across row A=0.",
        "Variable A remains fixed at 0 (term A'), while B and C both change across all 4 combinations and are eliminated."
      ],
      finalAnswer: "F = A'",
      takeaway: "Don't-cares 2 and 3 expand a 2-cell pair into a full row quad, eliminating both B and C.",
      groups: [
        { group: "G1", cells: [0, 1, 2, 3], size: 4, type: "Row Quad", fixedVars: "A=0", term: "A'" }
      ]
    },
    {
      id: "DC-P05",
      category: "3-Variable K-Map",
      form: "SOP",
      difficulty: "Intermediate",
      part: "B",
      problemStatement: "Minimize in SOP: F(A, B, C) = \u03A3 m(2, 6), with don't-care d = {0, 5}",
      mapType: "threeVar",
      minterms: [2, 6],
      maxterms: [1, 3, 4, 7],
      dontCares: [0, 5],
      targetPolarity: "1",
      hint: "Cells 2 (010) and 6 (110) occupy column BC=10. What about don't-care cells 0 and 5?",
      steps: [
        "Plot required 1s at m2 (010) and m6 (110) in column BC=10.",
        "Plot don't-care Xs at m0 (000) and m5 (101).",
        "Cells 2 and 6 form vertical column pair {2, 6} where B=1, C=0 are fixed (term BC').",
        "Evaluate don't-cares: cell 0 could pair with cell 2, but cell 2 is already covered. Cell 5 could pair with nothing useful.",
        "Grouping either don't-care would add redundant terms without covering new required 1s. Both d0 and d5 are ignored."
      ],
      finalAnswer: "F = BC'",
      takeaway: "Both don't-cares are ignored because required 1s {2, 6} are already minimally covered by column pair BC'.",
      groups: [
        { group: "G1", cells: [2, 6], size: 2, type: "Column Pair", fixedVars: "B=1, C=0", term: "BC'" }
      ]
    },
    {
      id: "DC-P06",
      category: "3-Variable K-Map",
      form: "POS",
      difficulty: "Intermediate",
      part: "B",
      problemStatement: "Minimize in POS: F(A, B, C) = \u03A0 M(1, 3), with don't-care d = {5, 7}",
      mapType: "threeVar",
      minterms: [0, 2, 4, 6],
      maxterms: [1, 3],
      dontCares: [5, 7],
      targetPolarity: "0",
      hint: "0-cells at 1, 3 and don't-cares at 5, 7 form columns BC=01 and BC=11.",
      steps: [
        "Plot required 0s at M1 (001) and M3 (011) in row A=0.",
        "Plot don't-care Xs at M5 (101) and M7 (111) in row A=1.",
        "Cells {1, 3, 5, 7} form a 4-cell quad spanning both rows.",
        "In this quad, C=1 is fixed across all 4 cells. In POS grouping, constant 1 gives complemented sum literal C'.",
        "Variables A and B both change and are eliminated."
      ],
      finalAnswer: "F = C'",
      takeaway: "POS 4-cell quad with C=1 fixed produces the single literal sum factor C'.",
      groups: [
        { group: "G1", cells: [1, 3, 5, 7], size: 4, type: "Quad", fixedVars: "C=1", term: "C'" }
      ]
    },
    {
      id: "DC-P07",
      category: "4-Variable K-Map",
      form: "SOP",
      difficulty: "Advanced",
      part: "B",
      problemStatement: "Minimize in SOP: F(A, B, C, D) = \u03A3 m(1, 5, 9, 13), with don't-care d = {3, 7, 11, 15}",
      mapType: "fourVar",
      minterms: [1, 5, 9, 13],
      maxterms: [0, 2, 4, 6, 8, 10, 12, 14],
      dontCares: [3, 7, 11, 15],
      targetPolarity: "1",
      hint: "Minterms occupy column CD=01. Don't-cares occupy column CD=11. Are these columns adjacent?",
      steps: [
        "Plot required 1s in column CD=01 (cells 1, 5, 9, 13).",
        "Plot don't-care Xs in column CD=11 (cells 3, 7, 11, 15).",
        "Columns CD=01 and CD=11 are adjacent and combine to form an 8-cell octet {1, 3, 5, 7, 9, 11, 13, 15}.",
        "Across this octet, variable D=1 is constant across all 8 cells. Variables A, B, and C all change and are eliminated."
      ],
      finalAnswer: "F = D",
      takeaway: "Using an entire column of don't-cares doubles the 4-cell column into an 8-cell octet, eliminating three variables to leave literal D.",
      groups: [
        { group: "G1", cells: [1, 3, 5, 7, 9, 11, 13, 15], size: 8, type: "Octet", fixedVars: "D=1", term: "D" }
      ]
    },
    {
      id: "DC-P08",
      category: "4-Variable K-Map",
      form: "SOP",
      difficulty: "Advanced",
      part: "B",
      problemStatement: "Minimize in SOP: F(A, B, C, D) = \u03A3 m(0, 2, 8, 10), with don't-care d = {5, 13}",
      mapType: "fourVar",
      minterms: [0, 2, 8, 10],
      maxterms: [1, 3, 4, 6, 7, 9, 11, 12, 14, 15],
      dontCares: [5, 13],
      targetPolarity: "1",
      hint: "Cells 0, 2, 8, 10 are the 4 corners of the map. Don't-cares 5, 13 are in column 01.",
      steps: [
        "Plot required 1s at m0, m2, m8, m10 (the four corners).",
        "Plot don't-care Xs at m5 (0101) and m13 (1101).",
        "The four corners wrap around horizontally and vertically to form corner quad {0, 2, 8, 10} with fixed literals B=0, D=0 (term B'D').",
        "All required 1s are now covered. Don't-cares 5 and 13 cannot enlarge the corner quad and are left un-grouped."
      ],
      finalAnswer: "F = B'D'",
      takeaway: "The 4 corners form an essential quad B'D'. Don't-cares 5 and 13 are ignored as redundant.",
      groups: [
        { group: "G1", cells: [0, 2, 8, 10], size: 4, type: "Corner Quad", fixedVars: "B=0, D=0", term: "B'D'" }
      ]
    },
    {
      id: "DC-P09",
      category: "4-Variable K-Map",
      form: "SOP",
      difficulty: "Challenging",
      part: "B",
      problemStatement: "Minimize in SOP: F(A, B, C, D) = \u03A3 m(0, 1, 2, 8, 9), with don't-care d = {10, 11}",
      mapType: "fourVar",
      minterms: [0, 1, 2, 8, 9],
      maxterms: [3, 4, 5, 6, 7, 12, 13, 14, 15],
      dontCares: [10, 11],
      targetPolarity: "1",
      hint: "Look at cells {0, 1, 8, 9} (top and bottom rows, left two columns) and corner cells {0, 2, 8, 10}.",
      steps: [
        "Plot required 1s at m0, m1, m2, m8, m9; don't-cares at m10, m11; 0s at remaining cells.",
        "Group G1: Cells {0, 1, 8, 9} wrap top to bottom across columns 00 and 01, yielding B'C'. This covers m0, m1, m8, m9.",
        "Group G2: To cover remaining required 1 at m2, use don't-care m10 along with m0 and m8 to form corner quad {0, 2, 8, 10}, yielding B'D'.",
        "All required 1s are now covered. Don't-care 11 is not needed and is left un-grouped.",
        "Summing groups yields F = B'C' + B'D'."
      ],
      finalAnswer: "F = B'C' + B'D'",
      takeaway: "Don't-care 10 enables corner quad B'D' to cover m2, while don't-care 11 is ignored.",
      groups: [
        { group: "G1", cells: [0, 1, 8, 9], size: 4, type: "Wraparound Quad", fixedVars: "B=0, C=0", term: "B'C'" },
        { group: "G2", cells: [0, 2, 8, 10], size: 4, type: "Corner Quad", fixedVars: "B=0, D=0", term: "B'D'" }
      ]
    },
    {
      id: "DC-P10",
      category: "4-Variable K-Map",
      form: "POS",
      difficulty: "Challenging",
      part: "B",
      problemStatement: "Minimize in POS: F(A, B, C, D) = \u03A0 M(0, 1, 4, 5), with don't-care d = {2, 3, 6, 7}",
      mapType: "fourVar",
      minterms: [8, 9, 10, 11, 12, 13, 14, 15],
      maxterms: [0, 1, 4, 5],
      dontCares: [2, 3, 6, 7],
      targetPolarity: "0",
      hint: "0-cells occupy rows AB=00, 01 in columns CD=00, 01. Don't-cares occupy the same rows in columns CD=11, 10.",
      steps: [
        "Plot required 0s at M0, M1, M4, M5 (top two rows, left two columns).",
        "Plot don't-care Xs at M2, M3, M6, M7 (top two rows, right two columns).",
        "Together, rows AB=00 and AB=01 across ALL four columns form a full 8-cell octet {0, 1, 2, 3, 4, 5, 6, 7}.",
        "Across this octet, variable A=0 is constant. In POS grouping, constant 0 produces uncomplemented literal A.",
        "Variables B, C, and D all change and are eliminated."
      ],
      finalAnswer: "F = A",
      takeaway: "Combining the 4 required zeros with 4 don't-cares forms an 8-cell octet yielding the single literal sum factor A.",
      groups: [
        { group: "G1", cells: [0, 1, 2, 3, 4, 5, 6, 7], size: 8, type: "Octet", fixedVars: "A=0", term: "A" }
      ]
    }
  ]
};

// Aliases for compatibility
dldSection26Data.revision = dldSection26Data.cheatSheet;
dldSection26Data.examTraps = dldSection26Data.cheatSheet.commonMistakes.map(m => ({ trap: m.mistake, fix: m.fix }));
dldSection26Data.practiceLab = {
  title: "Practice Problems (10)",
  subtitle: "Comprehensive hands-on practice across 2-, 3-, and 4-variable K-maps with don't-care conditions. No 5-variable problems.",
  problems: dldSection26Data.practiceProblems
};

