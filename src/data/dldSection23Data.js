/**
 * Digital Logic Design (DLD) - Section 2.3 Data Module
 * Boolean Functions, Minterms, Maxterms, Canonical and Standard Forms
 * 
 * Strict formatting: Zero em-dashes and zero en-dashes throughout.
 */

export const dldSection23Data = {
  id: "2.3",
  number: "2.3",
  title: "Boolean Functions, Minterms, Maxterms, Canonical and Standard Forms",
  badge: "Canonical Standards",
  status: "Available",
  estimatedReadTime: "18 min read",
  description: "Understand how truth tables are transformed into Boolean expressions, how minterms and maxterms are constructed, and how canonical forms represent complete logical functions.",

  // Tab 1: Start Here Content
  startHere: {
    whyMintermsMaxterms: {
      title: "Why Do We Need Minterms and Maxterms?",
      lead: "Every digital circuit receives inputs and produces outputs. When a digital function contains only one or two conditions, describing its behavior may be straightforward. But when there are three, four or more inputs, how can we systematically describe every combination that should produce an output of 1 or 0? A truth table gives us the complete input-output behavior. The next challenge is to convert that truth table into a Boolean expression without missing any combination. Minterms and maxterms provide a systematic mathematical method for doing this. They let us build complete Boolean representations directly from the rows of a truth table. Once we understand this method, we can represent functions in canonical forms and prepare them for later conversion and minimization techniques.",
      questionCallout: "How do we turn a truth table into a Boolean expression?"
    },

    alarmDemo: {
      title: "First Learning Demonstration: Two-Input Alarm System",
      scenario: "Consider a practical digital security alarm with two binary sensors: A = Door Open sensor (1 = open, 0 = closed), B = Motion Detected sensor (1 = motion, 0 = no motion). The alarm siren F must sound (F = 1) whenever the door is opened OR motion is detected inside.",
      functionExpr: "F = A + B",
      truthTable: [
        { index: 0, A: 0, B: 0, F: 0, rowType: "zero", minterm: "m0 = A'B'", maxterm: "M0 = (A + B)", note: "Safe: Door closed, no motion -> Alarm quiet" },
        { index: 1, A: 0, B: 1, F: 1, rowType: "one", minterm: "m1 = A'B", maxterm: "M1 = (A + B')", note: "Breach: Motion detected while door closed -> Alarm sounds" },
        { index: 2, A: 1, B: 0, F: 1, rowType: "one", minterm: "m2 = AB'", maxterm: "M2 = (A' + B)", note: "Breach: Door forced open without motion -> Alarm sounds" },
        { index: 3, A: 1, B: 1, F: 1, rowType: "one", minterm: "m3 = AB", maxterm: "M3 = (A' + B')", note: "Breach: Door open and motion detected -> Alarm sounds" }
      ],
      sopDerivation: {
        title: "Canonical Sum of Products (SOP) via Minterms",
        explanation: "To guarantee F = 1 for rows 1, 2, and 3, we take the logical OR (sum) of the minterms corresponding to each 1-output row:",
        expandedExpr: "F = A'B + AB' + AB",
        compactNotation: "F(A, B) = Sigma m(1, 2, 3)"
      },
      posDerivation: {
        title: "Canonical Product of Sums (POS) via Maxterms",
        explanation: "Alternatively, we can describe the exact conditions where the alarm stays quiet (F = 0). Row 0 is the only zero-output condition. Taking the logical AND (product) of the zero-row maxterms:",
        expandedExpr: "F = (A + B)",
        compactNotation: "F(A, B) = Pi M(0)"
      },
      takeaway: "Both canonical representations describe the identical physical circuit behavior. Algebraic simplification confirms that A'B + AB' + AB simplifies to A + B, perfectly matching Pi M(0) = (A + B). Minterms and maxterms are two complementary lenses for specifying the exact same truth table."
    },

    learningFlow: {
      title: "The Systematic Canonical Transformation Pipeline",
      subtitle: "From Binary Input Conditions to Canonical Specifications",
      steps: [
        {
          step: 1,
          name: "Binary Inputs",
          desc: "Declare named binary input variables in strict significant order: MSB on the left to LSB on the right (e.g. A, B, C)."
        },
        {
          step: 2,
          name: "Truth Table",
          desc: "Enumerate all 2^n unique binary input combinations and assign the required functional output (1 or 0) for each row."
        },
        {
          step: 3,
          name: "Select Output Rows",
          desc: "For Canonical SOP, highlight all rows where F = 1. For Canonical POS, highlight all rows where F = 0."
        },
        {
          step: 4,
          name: "Construct Terms",
          desc: "Apply the polarity rules: form product minterms (0 -> prime, 1 -> unprimed) or sum maxterms (0 -> unprimed, 1 -> prime)."
        },
        {
          step: 5,
          name: "Canonical Expression",
          desc: "Combine terms: OR the minterms to yield Sigma m(...) or AND the maxterms to yield Pi M(...)."
        }
      ]
    },

    coreFundamentals: [
      {
        term: "Boolean Function",
        definition: "A mathematical rule that maps n binary input variables to a single binary output bit (0 or 1).",
        plainExplanation: "A digital logic specification describing how an electronic circuit responds to every possible input signal.",
        smallExample: "F(A, B) = A + B",
        truthTableMeaning: "Represented by the complete output column F across all rows of the truth table."
      },
      {
        term: "Binary Input Variables",
        definition: "Independent binary variables that can assume values exclusively from the set {0, 1}.",
        plainExplanation: "The physical input wires feeding into a logic gate network or switching circuit.",
        smallExample: "Inputs A, B, C for a 3-input voting circuit.",
        truthTableMeaning: "Form the n input columns on the left side of the truth table."
      },
      {
        term: "Function Output",
        definition: "The dependent binary value determined by evaluating the Boolean function for a given combination of input values.",
        plainExplanation: "The electrical voltage level produced at the output wire (High = 1, Low = 0).",
        smallExample: "F = 1 when A = 0, B = 1 in an OR gate.",
        truthTableMeaning: "The single binary entry in the F column for a specific row."
      },
      {
        term: "Truth-Table Rows",
        definition: "A complete list of all 2^n possible permutations of n binary variables, ordered systematically by binary count.",
        plainExplanation: "A comprehensive grid listing every scenario that could ever happen to the circuit.",
        smallExample: "Row 5 in a 3-variable table corresponds to input bits 101.",
        truthTableMeaning: "Each individual horizontal line in the truth table representing one unique state."
      },
      {
        term: "Variable Ordering",
        definition: "The strict sequence in which binary variables are assigned significant positional weight (MSB to LSB).",
        plainExplanation: "The alphabetical or declared order ensuring that binary 100 always means index 4, not index 1.",
        smallExample: "For variables (A, B, C), A has weight 4, B has weight 2, and C has weight 1.",
        truthTableMeaning: "Determines the exact column order from left to right across the table."
      },
      {
        term: "Decimal Row Index",
        definition: "The decimal integer value obtained by converting the binary input string of that row into base-10.",
        plainExplanation: "A compact integer tag identifying which row of the table we are referring to.",
        smallExample: "Binary inputs A=1, B=0, C=1 evaluate to index 1*4 + 0*2 + 1*1 = 5.",
        truthTableMeaning: "The integer label i (from 0 to 2^n - 1) identifying the row."
      },
      {
        term: "Literal",
        definition: "A single instance of a variable appearing in either its uncomplemented (unprimed) or complemented (primed) form.",
        plainExplanation: "Each appearance of an input letter in an algebraic formula.",
        smallExample: "In F = AB' + C, there are 3 variables (A, B, C) and 3 literals (A, B', C).",
        truthTableMeaning: "Corresponds to checking whether a specific input column is 1 (A) or 0 (A')."
      },
      {
        term: "Complemented Literal",
        definition: "A variable inverted by the logical NOT operation, denoted by a prime (A') or overbar.",
        plainExplanation: "The negated version of a variable: A' evaluates to 1 when A is 0, and to 0 when A is 1.",
        smallExample: "A' is true only when A is logic 0.",
        truthTableMeaning: "Selects rows where that specific input variable holds a value of 0."
      },
      {
        term: "Product Term",
        definition: "One or more literals combined exclusively using the logical AND (conjunction) operator.",
        plainExplanation: "A group of variables multiplied together. A single standalone literal also counts as a product term.",
        smallExample: "AB, A'BC, and X are all valid product terms.",
        truthTableMeaning: "Evaluates to 1 only when every single literal in the term is simultaneously 1."
      },
      {
        term: "Sum Term",
        definition: "One or more literals combined exclusively using the logical OR (disjunction) operator.",
        plainExplanation: "A group of variables added together with OR (+). A single standalone literal also counts as a sum term.",
        smallExample: "(A + B), (A' + B + C'), and Y are all valid sum terms.",
        truthTableMeaning: "Evaluates to 0 only when every single literal in the term is simultaneously 0."
      },
      {
        term: "Functional Equivalence",
        definition: "The property where two distinct Boolean expressions produce identical outputs for every possible input combination.",
        plainExplanation: "Two formulas that look different on paper but describe the exact same digital behavior.",
        smallExample: "F = A'B + AB' + AB is functionally equivalent to F = A + B.",
        truthTableMeaning: "Their truth-table output columns match row-for-row with 100% agreement."
      }
    ],

    functionDomainTheory: {
      inputCombinationsFormula: "Total input combinations for n variables = 2^n",
      possibleFunctionsFormula: "Total distinct single-output Boolean functions = 2^(2^n)",
      explanation: "A truth table for n binary inputs contains exactly 2^n unique input combinations (rows). Because the output value for each row can independently be specified as either 0 or 1, there are 2 * 2 * ... (2^n times) = 2^(2^n) distinct truth-table output columns possible.",
      derivation: "To see why 2^(2^n) grows so rapidly: for 2 variables, there are 4 rows. Each row can be 0 or 1, giving 2^4 = 16 functions. For 3 variables, there are 8 rows, giving 2^8 = 256 functions. For 4 variables, there are 16 rows, giving 2^16 = 65,536 distinct logic functions! This combinatorial explosion explains why automated synthesis tools and standard canonical forms are essential.",
      table: [
        { variables: 1, inputRows: 2, possibleFunctions: 4, functionFormula: "2^(2^1) = 2^2 = 4", examples: "Constant 0, Identity (A), Inverter (A'), Constant 1" },
        { variables: 2, inputRows: 4, possibleFunctions: 16, functionFormula: "2^(2^2) = 2^4 = 16", examples: "AND, OR, NAND, NOR, XOR, XNOR, Implication, Constants, etc." },
        { variables: 3, inputRows: 8, possibleFunctions: 256, functionFormula: "2^(2^3) = 2^8 = 256", examples: "All 3-variable logic functions (multiplexers, full adders, decoders)" },
        { variables: 4, inputRows: 16, possibleFunctions: 65536, functionFormula: "2^(2^4) = 2^16 = 65,536", examples: "All 4-variable functions (the mathematical capacity of 4-input LUTs in modern FPGAs)" }
      ]
    }
  },

  // Tab 2: Minterms and Maxterms Content
  mintermsAndMaxterms: {
    mintermDefinition: {
      title: "Formal Definition of a Minterm",
      definition: "A minterm is a product (AND) term containing every variable of an n-variable Boolean function exactly once, either complemented or uncomplemented. A minterm evaluates to 1 for exactly one input combination and evaluates to 0 for all other 2^n - 1 input combinations.",
      polarityRule: "Minterm Construction Rule: If a variable is 0 in the row, write it complemented (primed, e.g. A'). If a variable is 1 in the row, write it uncomplemented (unprimed, e.g. A).",
      exampleCalculation: {
        inputs: "ABC = 101",
        index: 5,
        calculation: "A = 1 -> A, B = 0 -> B', C = 1 -> C",
        resultSymbol: "m5",
        resultTerm: "AB'C",
        proof: "When A=1, B=0, C=1: m5 = (1) · (0)' · (1) = 1 · 1 · 1 = 1. For any other input row, at least one literal becomes 0, forcing the product to 0."
      }
    },

    maxtermDefinition: {
      title: "Formal Definition of a Maxterm",
      definition: "A maxterm is a sum (OR) term containing every variable of an n-variable Boolean function exactly once, either complemented or uncomplemented. A maxterm evaluates to 0 for exactly one input combination and evaluates to 1 for all other 2^n - 1 input combinations.",
      polarityRule: "Maxterm Construction Rule: If a variable is 0 in the row, write it uncomplemented (unprimed, e.g. A). If a variable is 1 in the row, write it complemented (primed, e.g. A'). This is the exact opposite of the minterm rule!",
      exampleCalculation: {
        inputs: "ABC = 101",
        index: 5,
        calculation: "A = 1 -> A', B = 0 -> B, C = 1 -> C'",
        resultSymbol: "M5",
        resultTerm: "A' + B + C'",
        proof: "When A=1, B=0, C=1: M5 = (1)' + (0) + (1)' = 0 + 0 + 0 = 0. For any other input row, at least one literal becomes 1, forcing the sum to 1."
      }
    },

    sideBySideComparison: {
      title: "Side-by-Side Comparison for Row ABC = 101 (Index 5)",
      inputRow: "A = 1, B = 0, C = 1 (Binary 101, Decimal 5)",
      minterm: {
        symbol: "m5",
        term: "AB'C",
        operation: "Logical AND (Conjunction)",
        targetValue: "Evaluates to 1 ONLY at row 5",
        colorRole: "Forest Green (Sum of Products)"
      },
      maxterm: {
        symbol: "M5",
        term: "A' + B + C'",
        operation: "Logical OR (Disjunction)",
        targetValue: "Evaluates to 0 ONLY at row 5",
        colorRole: "Muted Blue (Product of Sums)"
      },
      complementRelationship: {
        formula: "(m5)' = M5  and  (M5)' = m5",
        derivation: "(m5)' = (AB'C)' = A' + (B')' + C' = A' + B + C' = M5",
        note: "Crucial Academic Note: The relationship between a minterm and a maxterm of the same index is a true Boolean Complement (inversion via De Morgan's Law). Do not confuse this with algebraic duality: in duality, literals are NOT complemented."
      }
    },

    variableOrderingConvention: {
      title: "Variable Ordering and Positional Weighting",
      rule: "Standard engineering convention declares variables in alphabetical order from most significant bit (MSB) to least significant bit (LSB):",
      twoVar: { vars: "A, B", formula: "Index = 2A + B", msb: "A (weight 2)", lsb: "B (weight 1)" },
      threeVar: { vars: "A, B, C", formula: "Index = 4A + 2B + C", msb: "A (weight 4)", lsb: "C (weight 1)" },
      fourVar: { vars: "A, B, C, D", formula: "Index = 8A + 4B + 2C + D", msb: "A (weight 8)", lsb: "D (weight 1)" },
      caution: "Always maintain the declared variable order throughout an entire problem. Swapping variable order (e.g. interpreting CBA instead of ABC) inverts indices and produces completely incorrect canonical expressions."
    },

    // 2-Variable Complete Table (4 rows)
    twoVariableTable: [
      { index: 0, bin: "00", A: 0, B: 0, mintermSymbol: "m0", mintermTerm: "A'B'", maxtermSymbol: "M0", maxtermTerm: "A + B" },
      { index: 1, bin: "01", A: 0, B: 1, mintermSymbol: "m1", mintermTerm: "A'B", maxtermSymbol: "M1", maxtermTerm: "A + B'" },
      { index: 2, bin: "10", A: 1, B: 0, mintermSymbol: "m2", mintermTerm: "AB'", maxtermSymbol: "M2", maxtermTerm: "A' + B" },
      { index: 3, bin: "11", A: 1, B: 1, mintermSymbol: "m3", mintermTerm: "AB", maxtermSymbol: "M3", maxtermTerm: "A' + B'" }
    ],

    // 3-Variable Complete Table (8 rows)
    threeVariableTable: [
      { index: 0, bin: "000", A: 0, B: 0, C: 0, mintermSymbol: "m0", mintermTerm: "A'B'C'", maxtermSymbol: "M0", maxtermTerm: "A + B + C" },
      { index: 1, bin: "001", A: 0, B: 0, C: 1, mintermSymbol: "m1", mintermTerm: "A'B'C", maxtermSymbol: "M1", maxtermTerm: "A + B + C'" },
      { index: 2, bin: "010", A: 0, B: 1, C: 0, mintermSymbol: "m2", mintermTerm: "A'BC'", maxtermSymbol: "M2", maxtermTerm: "A + B' + C" },
      { index: 3, bin: "011", A: 0, B: 1, C: 1, mintermSymbol: "m3", mintermTerm: "A'BC", maxtermSymbol: "M3", maxtermTerm: "A + B' + C'" },
      { index: 4, bin: "100", A: 1, B: 0, C: 0, mintermSymbol: "m4", mintermTerm: "AB'C'", maxtermSymbol: "M4", maxtermTerm: "A' + B + C" },
      { index: 5, bin: "101", A: 1, B: 0, C: 1, mintermSymbol: "m5", mintermTerm: "AB'C", maxtermSymbol: "M5", maxtermTerm: "A' + B + C'" },
      { index: 6, bin: "110", A: 1, B: 1, C: 0, mintermSymbol: "m6", mintermTerm: "ABC'", maxtermSymbol: "M6", maxtermTerm: "A' + B' + C" },
      { index: 7, bin: "111", A: 1, B: 1, C: 1, mintermSymbol: "m7", mintermTerm: "ABC", maxtermSymbol: "M7", maxtermTerm: "A' + B' + C'" }
    ],

    // 4-Variable Complete Table (16 rows)
    fourVariableTable: [
      { index: 0, bin: "0000", A: 0, B: 0, C: 0, D: 0, mintermSymbol: "m0", mintermTerm: "A'B'C'D'", maxtermSymbol: "M0", maxtermTerm: "A + B + C + D" },
      { index: 1, bin: "0001", A: 0, B: 0, C: 0, D: 1, mintermSymbol: "m1", mintermTerm: "A'B'C'D", maxtermSymbol: "M1", maxtermTerm: "A + B + C + D'" },
      { index: 2, bin: "0010", A: 0, B: 0, C: 1, D: 0, mintermSymbol: "m2", mintermTerm: "A'B'CD'", maxtermSymbol: "M2", maxtermTerm: "A + B + C' + D" },
      { index: 3, bin: "0011", A: 0, B: 0, C: 1, D: 1, mintermSymbol: "m3", mintermTerm: "A'B'CD", maxtermSymbol: "M3", maxtermTerm: "A + B + C' + D'" },
      { index: 4, bin: "0100", A: 0, B: 1, C: 0, D: 0, mintermSymbol: "m4", mintermTerm: "A'BC'D'", maxtermSymbol: "M4", maxtermTerm: "A + B' + C + D" },
      { index: 5, bin: "0101", A: 0, B: 1, C: 0, D: 1, mintermSymbol: "m5", mintermTerm: "A'BC'D", maxtermSymbol: "M5", maxtermTerm: "A + B' + C + D'" },
      { index: 6, bin: "0110", A: 0, B: 1, C: 1, D: 0, mintermSymbol: "m6", mintermTerm: "A'BCD'", maxtermSymbol: "M6", maxtermTerm: "A + B' + C' + D" },
      { index: 7, bin: "0111", A: 0, B: 1, C: 1, D: 1, mintermSymbol: "m7", mintermTerm: "A'BCD", maxtermSymbol: "M7", maxtermTerm: "A + B' + C' + D'" },
      { index: 8, bin: "1000", A: 1, B: 0, C: 0, D: 0, mintermSymbol: "m8", mintermTerm: "AB'C'D'", maxtermSymbol: "M8", maxtermTerm: "A' + B + C + D" },
      { index: 9, bin: "1001", A: 1, B: 0, C: 0, D: 1, mintermSymbol: "m9", mintermTerm: "AB'C'D", maxtermSymbol: "M9", maxtermTerm: "A' + B + C + D'" },
      { index: 10, bin: "1010", A: 1, B: 0, C: 1, D: 0, mintermSymbol: "m10", mintermTerm: "AB'CD'", maxtermSymbol: "M10", maxtermTerm: "A' + B + C' + D" },
      { index: 11, bin: "1011", A: 1, B: 0, C: 1, D: 1, mintermSymbol: "m11", mintermTerm: "AB'CD", maxtermSymbol: "M11", maxtermTerm: "A' + B + C' + D'" },
      { index: 12, bin: "1100", A: 1, B: 1, C: 0, D: 0, mintermSymbol: "m12", mintermTerm: "ABC'D'", maxtermSymbol: "M12", maxtermTerm: "A' + B' + C + D" },
      { index: 13, bin: "1101", A: 1, B: 1, C: 0, D: 1, mintermSymbol: "m13", mintermTerm: "ABC'D", maxtermSymbol: "M13", maxtermTerm: "A' + B' + C + D'" },
      { index: 14, bin: "1110", A: 1, B: 1, C: 1, D: 0, mintermSymbol: "m14", mintermTerm: "ABCD'", maxtermSymbol: "M14", maxtermTerm: "A' + B' + C' + D" },
      { index: 15, bin: "1111", A: 1, B: 1, C: 1, D: 1, mintermSymbol: "m15", mintermTerm: "ABCD", maxtermSymbol: "M15", maxtermTerm: "A' + B' + C' + D'" }
    ]
  },

  // Tab 3: Canonical and Standard Forms Content
  canonicalForms: {
    terminologyDefinitions: [
      {
        term: "Sum of Products (SOP)",
        definition: "A Boolean expression consisting of multiple product terms combined by the logical OR operator.",
        example: "F = AB + C",
        standardStatus: "General Standard Form: Does NOT require every variable to appear in every product term."
      },
      {
        term: "Product of Sums (POS)",
        definition: "A Boolean expression consisting of multiple sum terms combined by the logical AND operator.",
        example: "F = (A + B)C",
        standardStatus: "General Standard Form: Does NOT require every variable to appear in every sum term."
      },
      {
        term: "Canonical SOP (Sum of Minterms)",
        definition: "An SOP expression in which EVERY product term is a true minterm containing all n declared variables exactly once.",
        example: "F(A, B, C) = ABC + ABC' + A'BC",
        standardStatus: "Canonical Form: Full variable presence required in every term. Denoted by Sigma m(...)."
      },
      {
        term: "Canonical POS (Product of Maxterms)",
        definition: "A POS expression in which EVERY sum term is a true maxterm containing all n declared variables exactly once.",
        example: "F(A, B, C) = (A + B + C)(A + B' + C)(A' + B + C)",
        standardStatus: "Canonical Form: Full variable presence required in every term. Denoted by Pi M(...)."
      }
    ],

    textbookNote: "Terminology Convention Notice: In some academic syllabi and textbooks (e.g. Morris Mano), the term 'Standard Form' refers to any SOP or POS expression where terms may contain any subset of variables, whereas 'Canonical Form' strictly demands that every term contain all n variables. Other textbooks use 'standard minterm form' synonymously with canonical form. In ZeroIndex, we adhere to the standard distinction: standard forms permit varying term lengths, while canonical forms require complete variable presence.",

    canonicalVsNonCanonical: {
      title: "Canonical vs Non-Canonical Representation Comparison",
      sop: {
        declaredVariables: "A, B, C (3 variables declared)",
        nonCanonical: {
          expr: "F(A, B, C) = AB + C",
          status: "Non-Canonical (General Standard SOP)",
          flaw: "Term AB has length 2 (missing C). Term C has length 1 (missing A and B)."
        },
        canonical: {
          expr: "F(A, B, C) = ABC + ABC' + AB'C + A'BC + A'B'C",
          status: "Canonical SOP (Sum of Minterms)",
          merit: "Every single product term contains all 3 variables {A, B, C}. It maps directly to Sigma m(0, 2, 4, 6, 7)."
        }
      },
      pos: {
        declaredVariables: "A, B, C (3 variables declared)",
        nonCanonical: {
          expr: "F(A, B, C) = (A + B)C",
          status: "Non-Canonical (General Standard POS)",
          flaw: "Factor (A + B) is missing C; Factor C is missing A and B."
        },
        canonical: {
          expr: "F(A, B, C) = (A + B + C)(A + B + C')(A + B' + C)(A' + B + C)",
          status: "Canonical POS (Product of Maxterms)",
          merit: "Every single sum term contains all 3 variables {A, B, C}. It maps directly to Pi M(0, 1, 2, 4)."
        }
      }
    },

    procedures: {
      sopProcedure: [
        { step: 1, title: "Establish Variable Order", action: "Determine the exact input variable sequence (e.g. A as MSB, B, C as LSB)." },
        { step: 2, title: "Construct Truth Table", action: "Write out the 2^n binary input permutations and compute the functional output for each row." },
        { step: 3, title: "Identify F = 1 Rows", action: "Scan the output column and select only those rows where the function evaluates to logic 1." },
        { step: 4, title: "Formulate Minterms", action: "For each selected row, write its minterm: variable is 0 -> prime (A'), variable is 1 -> unprimed (A)." },
        { step: 5, title: "Logical OR (Sum)", action: "Connect all formulated minterms together using the logical OR (+) operator." },
        { step: 6, title: "Express Compact Notation", action: "Write the result in compact summation form: F = Sigma m(index1, index2, ...)." },
        { step: 7, title: "Verify Completeness", action: "Confirm that every 1-row is represented and no 0-rows are mistakenly included." }
      ],
      posProcedure: [
        { step: 1, title: "Establish Variable Order", action: "Determine the exact input variable sequence (e.g. A as MSB, B, C as LSB)." },
        { step: 2, title: "Construct Truth Table", action: "Write out the 2^n binary input permutations and compute the functional output for each row." },
        { step: 3, title: "Identify F = 0 Rows", action: "Scan the output column and select only those rows where the function evaluates to logic 0." },
        { step: 4, title: "Formulate Maxterms", action: "For each selected row, write its maxterm: variable is 0 -> unprimed (A), variable is 1 -> prime (A')." },
        { step: 5, title: "Logical AND (Product)", action: "Connect all formulated maxterms together using the logical AND (·) operator or parentheses." },
        { step: 6, title: "Express Compact Notation", action: "Write the result in compact product form: F = Pi M(index1, index2, ...)." },
        { step: 7, title: "Verify Completeness", action: "Confirm that every 0-row is represented and no 1-rows are mistakenly included." }
      ]
    },

    synchronizedTableDemo: {
      title: "Synchronized Truth Table Demonstration: F(A, B, C) = C",
      subtitle: "Observe how F = 1 rows generate Canonical SOP while F = 0 rows generate Canonical POS for the exact same function.",
      rows: [
        { index: 0, bin: "000", A: 0, B: 0, C: 0, F: 0, selectedFor: "POS (M0)", term: "M0 = (A + B + C)", role: "F = 0 Row" },
        { index: 1, bin: "001", A: 0, B: 0, C: 1, F: 1, selectedFor: "SOP (m1)", term: "m1 = A'B'C", role: "F = 1 Row" },
        { index: 2, bin: "010", A: 0, B: 1, C: 0, F: 0, selectedFor: "POS (M2)", term: "M2 = (A + B' + C)", role: "F = 0 Row" },
        { index: 3, bin: "011", A: 0, B: 1, C: 1, F: 1, selectedFor: "SOP (m3)", term: "m3 = A'BC", role: "F = 1 Row" },
        { index: 4, bin: "100", A: 1, B: 0, C: 0, F: 0, selectedFor: "POS (M4)", term: "M4 = (A' + B + C)", role: "F = 0 Row" },
        { index: 5, bin: "101", A: 1, B: 0, C: 1, F: 1, selectedFor: "SOP (m5)", term: "m5 = AB'C", role: "F = 1 Row" },
        { index: 6, bin: "110", A: 1, B: 1, C: 0, F: 0, selectedFor: "POS (M6)", term: "M6 = (A' + B' + C)", role: "F = 0 Row" },
        { index: 7, bin: "111", A: 1, B: 1, C: 1, F: 1, selectedFor: "SOP (m7)", term: "m7 = ABC", role: "F = 1 Row" }
      ],
      canonicalSOPResult: "F(A, B, C) = Sigma m(1, 3, 5, 7) = A'B'C + A'BC + AB'C + ABC",
      canonicalPOSResult: "F(A, B, C) = Pi M(0, 2, 4, 6) = (A + B + C)(A + B' + C)(A' + B + C)(A' + B' + C)",
      simplificationProof: "Both expressions algebraically reduce to F = C. For SOP: (A'B' + A'B + AB' + AB)C = [1]C = C. For POS: (A + C)(A' + C) = AA' + C = C. Perfect functional equivalence is verified."
    },

    complementaryIndexSets: {
      title: "Complementary Index Sets and Function Complementation",
      universeFormula: "Universe of indices U = {0, 1, 2, ..., 2^n - 1}",
      partitionRule: "For any Boolean function F of n variables, the minterm set S and the maxterm set S_c partition the index universe U into two mutually exclusive and exhaustive subsets:",
      dualFormulas: [
        { name: "Canonical POS of Same Function F", formula: "F = Sigma m(S)  <=>  F = Pi M(U \\ S)", meaning: "To convert a function from SOP to POS, simply list all the missing indices from the universe." },
        { name: "Complement Function F' in SOP", formula: "[F]' = [Sigma m(S)]' = Sigma m(U \\ S)", meaning: "The complement function F' produces 1 wherever F produces 0." },
        { name: "Complement Function F' in POS", formula: "[F]' = [Pi M(U \\ S)]' = Pi M(S)", meaning: "The complement function in POS uses the original 1-row indices of F." }
      ],
      distinctionWarning: "Crucial Academic Distinction: Converting F to canonical POS (F = Pi M(U \\ S)) leaves the function output unchanged! In contrast, complementing the function ([F]' = Sigma m(U \\ S) = Pi M(S)) inverts the physical circuit output."
    },

    constantFunctions: {
      title: "Constant Functions and Empty Index Conventions",
      constantZero: {
        function: "F = 0 (Contradiction / Ground)",
        mintermSet: "Sigma m(empty set) = 0",
        maxtermSet: "Pi M(0, 1, ..., 2^n - 1)",
        explanation: "F is never 1 on any row. Therefore its minterm set is empty (empty sum = 0), and its maxterm set contains all 2^n rows."
      },
      constantOne: {
        function: "F = 1 (Tautology / VCC)",
        mintermSet: "Sigma m(0, 1, ..., 2^n - 1)",
        maxtermSet: "Pi M(empty set) = 1",
        explanation: "F is 1 on every row. Therefore its minterm set contains all 2^n rows, and its maxterm set is empty (empty product = 1)."
      },
      formalConventions: "Mathematical Identity Conventions: By standard algebraic convention, an empty sum (Sigma of 0 terms) is defined as the additive identity 0, and an empty product (Pi of 0 terms) is defined as the multiplicative identity 1."
    },

    featureComparisonTable: [
      { feature: "Primary Building Block", canonicalSOP: "Minterm (Standard Product)", canonicalPOS: "Maxterm (Standard Sum)" },
      { feature: "Inner Operator (within term)", canonicalSOP: "AND (Conjunction, ·)", canonicalPOS: "OR (Disjunction, +)" },
      { feature: "Outer Operator (between terms)", canonicalSOP: "OR (Disjunction, +)", canonicalPOS: "AND (Conjunction, ·)" },
      { feature: "Row Selection Criterion", canonicalSOP: "Rows where F = 1", canonicalPOS: "Rows where F = 0" },
      { feature: "Standard Notation", canonicalSOP: "Sigma m(i_1, i_2, ...)", canonicalPOS: "Pi M(i_1, i_2, ...)" },
      { feature: "Variable Completeness", canonicalSOP: "Every term MUST contain all n variables", canonicalPOS: "Every term MUST contain all n variables" },
      { feature: "Literal Polarity for Binary 0", canonicalSOP: "Complemented (A')", canonicalPOS: "Uncomplemented (A)" },
      { feature: "Literal Polarity for Binary 1", canonicalSOP: "Uncomplemented (A)", canonicalPOS: "Complemented (A')" }
    ]
  },

  // Tab 4: Worked Models Content (14 Core + 1 Challenge = 15 Total)
  workedModels: [
    // Level 1: Basic Models (B01 - B04)
    {
      id: "WM2.3-B01",
      number: 1,
      level: "Basic",
      title: "Two-Variable Minterm and Maxterm Derivation",
      variables: "A, B (2 variables)",
      problem: "Given the two-variable binary input combination AB = 10, determine its decimal row index, its corresponding minterm, and its corresponding maxterm.",
      solutionSteps: [
        { step: 1, expr: "Binary input string: A = 1, B = 0", rule: "Binary Input Definition", reason: "Positional weight: A is MSB (weight 2), B is LSB (weight 1)." },
        { step: 2, expr: "Index = 2(A) + 1(B) = 2(1) + 1(0) = 2", rule: "Binary to Decimal Conversion", reason: "Decimal index tag is 2." },
        { step: 3, expr: "m2 = A · B' = AB'", rule: "Minterm Polarity Rule", reason: "Binary 1 -> uncomplemented (A); Binary 0 -> complemented (B')." },
        { step: 4, expr: "M2 = (A' + B)", rule: "Maxterm Polarity Rule", reason: "Binary 1 -> complemented (A'); Binary 0 -> uncomplemented (B)." },
        { step: 5, expr: "(m2)' = (AB')' = A' + (B')' = A' + B = M2", rule: "De Morgan Inversion Check", reason: "Verifies the fundamental complement identity (m_i)' = M_i." }
      ],
      finalAnswer: "Index = 2 | m2 = AB' | M2 = (A' + B)",
      verification: "At AB = 10: m2 = (1)(0)' = 1 · 1 = 1. M2 = (1)' + 0 = 0 + 0 = 0. Exactly matches formal definitions.",
      pitfall: "Do not reverse polarity: writing m2 = A'B or M2 = AB' is completely wrong."
    },
    {
      id: "WM2.3-B02",
      number: 2,
      level: "Basic",
      title: "Three-Variable Decimal Index Term Construction",
      variables: "A, B, C (3 variables)",
      problem: "Construct the minterm and maxterm for decimal index 5 with declared variable sequence (A, B, C).",
      solutionSteps: [
        { step: 1, expr: "5 in 3-bit binary = 101", rule: "Decimal to Binary Encoding", reason: "4(1) + 2(0) + 1(1) = 5. Hence A = 1, B = 0, C = 1." },
        { step: 2, expr: "m5 = A · B' · C = AB'C", rule: "Minterm Construction", reason: "A=1 -> A, B=0 -> B', C=1 -> C. Combined with AND." },
        { step: 3, expr: "M5 = (A' + B + C')", rule: "Maxterm Construction", reason: "A=1 -> A', B=0 -> B, C=1 -> C'. Combined with OR." },
        { step: 4, expr: "(m5)' = (AB'C)' = A' + B + C' = M5", rule: "Complement Equivalence", reason: "De Morgan's theorem confirms exact duality." }
      ],
      finalAnswer: "m5 = AB'C | M5 = (A' + B + C')",
      verification: "At ABC = 101: m5 = (1)(1)(1) = 1. M5 = (0) + (0) + (0) = 0. All other 7 combinations produce m5 = 0 and M5 = 1.",
      pitfall: "Do not confuse lowercase m5 (minterm) with uppercase M5 (maxterm)."
    },
    {
      id: "WM2.3-B03",
      number: 3,
      level: "Basic",
      title: "Four-Variable Minterm and Maxterm Formulation",
      variables: "A, B, C, D (4 variables)",
      problem: "Determine the minterm and maxterm for index 10 in a four-variable system (A, B, C, D).",
      solutionSteps: [
        { step: 1, expr: "10 in 4-bit binary = 1010", rule: "Decimal to 4-bit Binary", reason: "8(1) + 4(0) + 2(1) + 1(0) = 10. Thus A = 1, B = 0, C = 1, D = 0." },
        { step: 2, expr: "m10 = A · B' · C · D' = AB'CD'", rule: "Minterm Polarity", reason: "1 -> unprimed (A, C); 0 -> primed (B', D'). Product term." },
        { step: 3, expr: "M10 = (A' + B + C' + D)", rule: "Maxterm Polarity", reason: "1 -> primed (A', C'); 0 -> unprimed (B, D). Sum term." },
        { step: 4, expr: "(m10)' = (AB'CD')' = A' + B + C' + D = M10", rule: "De Morgan Verification", reason: "Complement identity holds for any number of variables." }
      ],
      finalAnswer: "m10 = AB'CD' | M10 = (A' + B + C' + D)",
      verification: "At ABCD = 1010: m10 = (1)(1)(1)(1) = 1; M10 = 0 + 0 + 0 + 0 = 0. Verified.",
      pitfall: "Ensure 4-bit width: writing 10 as 1010 (not 101) is essential for 4-variable functions."
    },
    {
      id: "WM2.3-B04",
      number: 4,
      level: "Basic",
      title: "Two-Variable Canonical Function Construction",
      variables: "A, B (2 variables)",
      problem: "A two-variable logic circuit evaluates to logic 1 at input combinations 01, 10, and 11, and evaluates to 0 at 00. Construct its complete canonical SOP and canonical POS representations, and draw its truth table.",
      solutionSteps: [
        { step: 1, expr: "Input rows: 00 (idx 0 -> F=0), 01 (idx 1 -> F=1), 10 (idx 2 -> F=1), 11 (idx 3 -> F=1)", rule: "Truth Table Construction", reason: "4 rows completely specify the 2-variable domain." },
        { step: 2, expr: "1-row set = {1, 2, 3} -> Minterms: m1 = A'B, m2 = AB', m3 = AB", rule: "Canonical SOP Selection", reason: "Select rows where F = 1 and sum minterms." },
        { step: 3, expr: "F_SOP = A'B + AB' + AB = Sigma m(1, 2, 3)", rule: "Canonical SOP Formulation", reason: "Sum of Products notation." },
        { step: 4, expr: "0-row set = {0} -> Maxterm: M0 = (A + B)", rule: "Canonical POS Selection", reason: "Select rows where F = 0 and product maxterms." },
        { step: 5, expr: "F_POS = (A + B) = Pi M(0)", rule: "Canonical POS Formulation", reason: "Product of Sums notation." },
        { step: 6, expr: "Algebraic simplification: A'B + AB' + AB = A'B + A(B' + B) = A'B + A(1) = A + A'B = A + B", rule: "Simplification Check", reason: "Both canonical forms equal the simple OR gate F = A + B." }
      ],
      finalAnswer: "Canonical SOP = Sigma m(1, 2, 3) | Canonical POS = Pi M(0) | Reduced: F = A + B",
      verification: "Evaluated at all 4 rows, both Sigma m(1, 2, 3) and Pi M(0) produce outputs [0, 1, 1, 1].",
      pitfall: "Do not forget the single zero-row: Pi M(0) is a single factor (A + B)."
    },

    // Level 2: Intermediate Models (I01 - I05)
    {
      id: "WM2.3-I01",
      number: 5,
      level: "Intermediate",
      title: "Three-Variable Canonical Form Equivalence",
      variables: "A, B, C (3 variables)",
      problem: "For the function F(A, B, C) = Sigma m(1, 3, 5, 7), construct its expanded canonical SOP, determine its canonical POS, and prove algebraically that both equal F = C.",
      solutionSteps: [
        { step: 1, expr: "Indices: 1 (001 -> A'B'C), 3 (011 -> A'BC), 5 (101 -> AB'C), 7 (111 -> ABC)", rule: "Minterm Expansion", reason: "Expand each index into its full 3-literal minterm." },
        { step: 2, expr: "F_SOP = A'B'C + A'BC + AB'C + ABC", rule: "Canonical SOP", reason: "OR the minterms." },
        { step: 3, expr: "U = {0, 1, 2, 3, 4, 5, 6, 7}. Complementary set: U \\ {1, 3, 5, 7} = {0, 2, 4, 6}", rule: "Complementary Set Deduction", reason: "Maxterms correspond to zero-output rows." },
        { step: 4, expr: "Maxterms: 0 (A+B+C), 2 (A+B'+C), 4 (A'+B+C), 6 (A'+B'+C)", rule: "Maxterm Formulation", reason: "Apply maxterm polarity rule (0 -> unprimed, 1 -> primed)." },
        { step: 5, expr: "F_POS = Pi M(0, 2, 4, 6) = (A+B+C)(A+B'+C)(A'+B+C)(A'+B'+C)", rule: "Canonical POS", reason: "AND the maxterms." },
        { step: 6, expr: "SOP Reduction: C(A'B' + A'B + AB' + AB) = C[A'(B'+B) + A(B'+B)] = C[A'(1) + A(1)] = C[A'+A] = C(1) = C", rule: "Boolean Factoring", reason: "Factor out common variable C." },
        { step: 7, expr: "POS Reduction: [(A+C) + B][(A+C) + B'] · [(A'+C) + B][(A'+C) + B'] = (A+C)(A'+C) = AA' + C = 0 + C = C", rule: "Distributive Combining", reason: "Combine conjugate maxterm pairs." }
      ],
      finalAnswer: "F_SOP = Sigma m(1, 3, 5, 7) | F_POS = Pi M(0, 2, 4, 6) | Reduced Form: F = C",
      verification: "F is logic 1 whenever C = 1 regardless of A and B. Perfect equivalence confirmed.",
      pitfall: "Do not leave out parentheses when writing the product of maxterms."
    },
    {
      id: "WM2.3-I02",
      number: 6,
      level: "Intermediate",
      title: "Mandatory Model Walkthrough: F(A, B, C) = AB + C'",
      variables: "A, B, C (3 variables)",
      problem: "Convert the non-canonical Boolean expression F(A, B, C) = AB + C' into both canonical SOP and canonical POS representations, and verify equivalence.",
      solutionSteps: [
        { step: 1, expr: "Variable declaration: A (MSB, weight 4), B (weight 2), C (LSB, weight 1)", rule: "Variable Declaration", reason: "Declaring 3 variables establishes universe U = {0, 1, 2, 3, 4, 5, 6, 7}." },
        { step: 2, expr: "Analyze term C': C' = 1 when C = 0. Combinations: 000 (0), 010 (2), 100 (4), 110 (6)", rule: "Sub-expression Truth Mapping", reason: "C is 0 on all four even row indices." },
        { step: 3, expr: "Analyze term AB: AB = 1 when A = 1 and B = 1. Combinations: 110 (6), 111 (7)", rule: "Sub-expression Truth Mapping", reason: "A=1 and B=1 occurs on rows 6 and 7." },
        { step: 4, expr: "Union of 1-rows: {0, 2, 4, 6} U {6, 7} = {0, 2, 4, 6, 7}", rule: "Disjunctive Set Union", reason: "Index 6 is shared by both terms; do not count it twice (idempotence)." },
        { step: 5, expr: "F_SOP = Sigma m(0, 2, 4, 6, 7) = A'B'C' + A'BC' + AB'C' + ABC' + ABC", rule: "Canonical SOP Formulation", reason: "Write out the 5 expanded minterms." },
        { step: 6, expr: "Complementary zero-output set: U \\ {0, 2, 4, 6, 7} = {1, 3, 5}", rule: "Complementary Set Deduction", reason: "Rows where F = 0 become the maxterm indices." },
        { step: 7, expr: "F_POS = Pi M(1, 3, 5) = (A + B + C')(A + B' + C')(A' + B + C')", rule: "Canonical POS Formulation", reason: "Apply maxterm polarity: 1=001 (A+B+C'), 3=011 (A+B'+C'), 5=101 (A'+B+C')." },
        { step: 8, expr: "Truth-table verification: Evaluate AB + C' across all 8 rows -> [1, 0, 1, 0, 1, 0, 1, 1]. Matches {0, 2, 4, 6, 7} exactly.", rule: "Exhaustive Validation", reason: "Proves mathematical correctness of both representations." }
      ],
      finalAnswer: "F_SOP = Sigma m(0, 2, 4, 6, 7) | F_POS = Pi M(1, 3, 5)",
      verification: "5 minterms + 3 maxterms = 8 total domain rows. All rows accounted for.",
      pitfall: "Avoid duplicate counting: index 6 satisfies both AB and C'; it must appear only once in Sigma m."
    },
    {
      id: "WM2.3-I03",
      number: 7,
      level: "Intermediate",
      title: "Expansion of Non-Canonical SOP: F(A, B, C) = A'B + BC",
      variables: "A, B, C (3 variables)",
      problem: "Convert F(A, B, C) = A'B + BC into canonical SOP and POS forms.",
      solutionSteps: [
        { step: 1, expr: "Term A'B lacks variable C. Expand: A'B(C + C') = A'BC + A'BC'", rule: "Identity & Complement Multiplication", reason: "Multiplying by (C + C') = 1 preserves truth value." },
        { step: 2, expr: "Term BC lacks variable A. Expand: (A + A')BC = ABC + A'BC", rule: "Identity & Complement Multiplication", reason: "Multiplying by (A + A') = 1 introduces variable A." },
        { step: 3, expr: "Combine: F = A'BC + A'BC' + ABC + A'BC = A'BC' + A'BC + ABC", rule: "Idempotent Redundancy Elimination", reason: "A'BC appears twice; eliminate duplicate." },
        { step: 4, expr: "Map binary to indices: A'BC' = 010 (2), A'BC = 011 (3), ABC = 111 (7)", rule: "Binary Index Mapping", reason: "Indices are {2, 3, 7}." },
        { step: 5, expr: "F_SOP = Sigma m(2, 3, 7)", rule: "Canonical SOP", reason: "Sum of minterms." },
        { step: 6, expr: "Complementary set: U \\ {2, 3, 7} = {0, 1, 4, 5, 6}", rule: "Complementary Set Deduction", reason: "Zero-output rows." },
        { step: 7, expr: "F_POS = Pi M(0, 1, 4, 5, 6)", rule: "Canonical POS", reason: "Product of maxterms." }
      ],
      finalAnswer: "F_SOP = Sigma m(2, 3, 7) | F_POS = Pi M(0, 1, 4, 5, 6)",
      verification: "Testing row 3 (ABC=011): A'B=1, BC=1 -> F=1. Testing row 0 (ABC=000): A'B=0, BC=0 -> F=0. Matches index sets.",
      pitfall: "Remember to remove duplicate minterm A'BC after algebraic expansion."
    },
    {
      id: "WM2.3-I04",
      number: 8,
      level: "Intermediate",
      title: "Single-Literal Function in Three-Variable Universe: F = C'",
      variables: "A, B, C (3 variables)",
      problem: "A three-variable system has the simple logic function F(A, B, C) = C'. Find its canonical SOP and canonical POS representations.",
      solutionSteps: [
        { step: 1, expr: "C' means F = 1 whenever C = 0, regardless of the values of A and B.", rule: "Functional Analysis", reason: "A and B are 'don't care' variables with respect to the output." },
        { step: 2, expr: "Enumerate all rows where C = 0: 000 (0), 010 (2), 100 (4), 110 (6)", rule: "Binary Truth Search", reason: "4 rows have C = 0." },
        { step: 3, expr: "Minterms: m0 = A'B'C', m2 = A'BC', m4 = AB'C', m6 = ABC'", rule: "Minterm Formulation", reason: "Formulate standard product for each 1-row." },
        { step: 4, expr: "F_SOP = Sigma m(0, 2, 4, 6) = A'B'C' + A'BC' + AB'C' + ABC'", rule: "Canonical SOP", reason: "4 minterms." },
        { step: 5, expr: "Complementary rows (where C = 1): 001 (1), 011 (3), 101 (5), 111 (7)", rule: "Zero-Row Search", reason: "4 rows have C = 1." },
        { step: 6, expr: "F_POS = Pi M(1, 3, 5, 7) = (A+B+C')(A+B'+C')(A'+B+C')(A'+B'+C')", rule: "Canonical POS", reason: "Product of maxterms." }
      ],
      finalAnswer: "F_SOP = Sigma m(0, 2, 4, 6) | F_POS = Pi M(1, 3, 5, 7)",
      verification: "4 minterms + 4 maxterms = 8 rows. Expanding F_POS using distributivity collapses directly back to C'.",
      pitfall: "Do not assume a single literal has only 1 minterm: in a 3-variable universe, C' spans exactly 4 minterms."
    },
    {
      id: "WM2.3-I05",
      number: 9,
      level: "Intermediate",
      title: "Non-Canonical POS Expansion: F(A, B, C) = (A + B)(A' + C)",
      variables: "A, B, C (3 variables)",
      problem: "Convert the factored expression F(A, B, C) = (A + B)(A' + C) into canonical POS and canonical SOP forms.",
      solutionSteps: [
        { step: 1, expr: "Factor (A + B) lacks C. Add CC' = 0: (A + B) + CC' = (A + B + C)(A + B + C')", rule: "Second Distributive Law (X + YZ = (X+Y)(X+Z))", reason: "Expands into two standard sum terms." },
        { step: 2, expr: "Factor (A' + C) lacks B. Add BB' = 0: (A' + C) + BB' = (A' + B + C)(A' + B' + C)", rule: "Second Distributive Law", reason: "Expands into two standard sum terms." },
        { step: 3, expr: "Combine factors: F = (A + B + C)(A + B + C')(A' + B + C)(A' + B' + C)", rule: "Conjunction", reason: "No duplicates generated." },
        { step: 4, expr: "Map maxterms to indices: (A+B+C) = 000 (0), (A+B+C') = 001 (1), (A'+B+C) = 100 (4), (A'+B'+C) = 110 (6)", rule: "Maxterm Index Mapping", reason: "Remember 0 -> unprimed, 1 -> primed." },
        { step: 5, expr: "F_POS = Pi M(0, 1, 4, 6)", rule: "Canonical POS", reason: "Product of maxterms." },
        { step: 6, expr: "Complementary 1-rows: U \\ {0, 1, 4, 6} = {2, 3, 5, 7}", rule: "Complementary Set Deduction", reason: "Minterm set." },
        { step: 7, expr: "F_SOP = Sigma m(2, 3, 5, 7) = A'BC' + A'BC + AB'C + ABC", rule: "Canonical SOP", reason: "Sum of minterms." }
      ],
      finalAnswer: "F_POS = Pi M(0, 1, 4, 6) | F_SOP = Sigma m(2, 3, 5, 7)",
      verification: "At ABC = 010 (2): (0+1)(1+0) = 1 · 1 = 1. At ABC = 000 (0): (0+0)(1+0) = 0 · 1 = 0. Matches perfectly.",
      pitfall: "Do not multiply out into SOP first if POS is requested: use the second distributive identity directly on each factor."
    },

    // Level 3: Advanced Models (A01 - A05)
    {
      id: "WM2.3-A01",
      number: 10,
      level: "Advanced",
      title: "Four-Variable Dual Product Expansion: F(A, B, C, D) = AB + CD",
      variables: "A, B, C, D (4 variables)",
      problem: "For the four-variable Boolean function F(A, B, C, D) = AB + CD, determine the complete canonical SOP and POS index sets.",
      solutionSteps: [
        { step: 1, expr: "Universe U = {0, 1, 2, ..., 15} (16 rows total).", rule: "4-Variable Domain", reason: "A=8, B=4, C=2, D=1." },
        { step: 2, expr: "Term AB: A = 1, B = 1, with C and D taking all 4 combinations (00, 01, 10, 11). Indices: 1100 (12), 1101 (13), 1110 (14), 1111 (15)", rule: "Minterm Sub-domain Expansion", reason: "4 minterms generated by AB." },
        { step: 3, expr: "Term CD: C = 1, D = 1, with A and B taking all 4 combinations (00, 01, 10, 11). Indices: 0011 (3), 0111 (7), 1011 (11), 1111 (15)", rule: "Minterm Sub-domain Expansion", reason: "4 minterms generated by CD." },
        { step: 4, expr: "Union of 1-rows: {12, 13, 14, 15} U {3, 7, 11, 15} = {3, 7, 11, 12, 13, 14, 15}", rule: "Set Union", reason: "Index 15 (ABCD = 1111) is common to both terms; include once." },
        { step: 5, expr: "F_SOP = Sigma m(3, 7, 11, 12, 13, 14, 15) [7 minterms]", rule: "Canonical SOP", reason: "Sum of all 7 minterms." },
        { step: 6, expr: "0-row set: U \\ {3, 7, 11, 12, 13, 14, 15} = {0, 1, 2, 4, 5, 6, 8, 9, 10} [9 maxterms]", rule: "Complementary Set Deduction", reason: "All 9 zero-output rows." },
        { step: 7, expr: "F_POS = Pi M(0, 1, 2, 4, 5, 6, 8, 9, 10)", rule: "Canonical POS", reason: "Product of all 9 maxterms." }
      ],
      finalAnswer: "F_SOP = Sigma m(3, 7, 11, 12, 13, 14, 15) | F_POS = Pi M(0, 1, 2, 4, 5, 6, 8, 9, 10)",
      verification: "7 minterms + 9 maxterms = 16 total rows. Evaluated at 1111 (15): 1 + 1 = 1. Evaluated at 0000 (0): 0 + 0 = 0.",
      pitfall: "Index 15 is shared by both terms. Writing 8 minterms instead of 7 is a frequent exam error."
    },
    {
      id: "WM2.3-A02",
      number: 11,
      level: "Advanced",
      title: "Four-Variable Factorized POS Function: F = (A + B)(C + D)",
      variables: "A, B, C, D (4 variables)",
      problem: "Given the four-variable expression F(A, B, C, D) = (A + B)(C + D), derive its canonical SOP and POS index representations.",
      solutionSteps: [
        { step: 1, expr: "F = 0 whenever either factor (A + B) = 0 OR (C + D) = 0.", rule: "Zero-Product Logic", reason: "An AND product is zero if ANY input factor is zero." },
        { step: 2, expr: "Factor (A + B) = 0 when A = 0 and B = 0. C and D vary freely (4 rows): 0000 (0), 0001 (1), 0010 (2), 0011 (3)", rule: "Zero-Row Mapping", reason: "Indices {0, 1, 2, 3}." },
        { step: 3, expr: "Factor (C + D) = 0 when C = 0 and D = 0. A and B vary freely (4 rows): 0000 (0), 0100 (4), 1000 (8), 1100 (12)", rule: "Zero-Row Mapping", reason: "Indices {0, 4, 8, 12}." },
        { step: 4, expr: "Union of 0-rows: {0, 1, 2, 3} U {0, 4, 8, 12} = {0, 1, 2, 3, 4, 8, 12} [7 maxterms]", rule: "Set Union", reason: "Row 0 is common to both factors; include once." },
        { step: 5, expr: "F_POS = Pi M(0, 1, 2, 3, 4, 8, 12)", rule: "Canonical POS", reason: "Product of 7 maxterms." },
        { step: 6, expr: "Complementary 1-rows: U \\ {0, 1, 2, 3, 4, 8, 12} = {5, 6, 7, 9, 10, 11, 13, 14, 15} [9 minterms]", rule: "Complementary Set Deduction", reason: "All 9 rows where F = 1." },
        { step: 7, expr: "F_SOP = Sigma m(5, 6, 7, 9, 10, 11, 13, 14, 15)", rule: "Canonical SOP", reason: "Sum of 9 minterms." }
      ],
      finalAnswer: "F_POS = Pi M(0, 1, 2, 3, 4, 8, 12) | F_SOP = Sigma m(5, 6, 7, 9, 10, 11, 13, 14, 15)",
      verification: "7 maxterms + 9 minterms = 16 rows. Testing row 5 (0101): (0+1)(0+1) = 1 · 1 = 1. Testing row 4 (0100): (0+1)(0+0) = 1 · 0 = 0. Correct.",
      pitfall: "Notice that row 0000 (index 0) makes both factors zero simultaneously: do not list it twice in the maxterm index set."
    },
    {
      id: "WM2.3-A03",
      number: 12,
      level: "Advanced",
      title: "Four-Variable Mixed Literals: F(A, B, C, D) = A'C + BD",
      variables: "A, B, C, D (4 variables)",
      problem: "Convert F(A, B, C, D) = A'C + BD into both canonical SOP and canonical POS representations.",
      solutionSteps: [
        { step: 1, expr: "Term A'C: A = 0, C = 1. B and D vary across {00, 01, 10, 11}: 0010 (2), 0011 (3), 0110 (6), 0111 (7)", rule: "Minterm Expansion", reason: "4 rows produced by A'C." },
        { step: 2, expr: "Term BD: B = 1, D = 1. A and C vary across {00, 01, 10, 11}: 0101 (5), 0111 (7), 1101 (13), 1111 (15)", rule: "Minterm Expansion", reason: "4 rows produced by BD." },
        { step: 3, expr: "Union of 1-rows: {2, 3, 6, 7} U {5, 7, 13, 15} = {2, 3, 5, 6, 7, 13, 15} [7 minterms]", rule: "Set Union", reason: "Row 7 (0111) is common to both terms." },
        { step: 4, expr: "F_SOP = Sigma m(2, 3, 5, 6, 7, 13, 15)", rule: "Canonical SOP", reason: "Sum of 7 minterms." },
        { step: 5, expr: "0-row set: U \\ {2, 3, 5, 6, 7, 13, 15} = {0, 1, 4, 8, 9, 10, 11, 12, 14} [9 maxterms]", rule: "Complementary Set Deduction", reason: "Remaining 9 rows." },
        { step: 6, expr: "F_POS = Pi M(0, 1, 4, 8, 9, 10, 11, 12, 14)", rule: "Canonical POS", reason: "Product of 9 maxterms." }
      ],
      finalAnswer: "F_SOP = Sigma m(2, 3, 5, 6, 7, 13, 15) | F_POS = Pi M(0, 1, 4, 8, 9, 10, 11, 12, 14)",
      verification: "At row 7 (0111): A'C = 1·1 = 1, BD = 1·1 = 1 -> F=1. At row 0 (0000): A'C = 0, BD = 0 -> F=0.",
      pitfall: "Carefully expand the two 'free' variables in each product term to avoid missing indices."
    },
    {
      id: "WM2.3-A04",
      number: 13,
      level: "Advanced",
      title: "Symmetric Four-Variable Function and Equivalence Check",
      variables: "A, B, C, D (4 variables)",
      problem: "Given F(A, B, C, D) = Sigma m(0, 2, 5, 7, 8, 10, 13, 15), determine its canonical POS representation and verify that it simplifies to F = B'D' + BD.",
      solutionSteps: [
        { step: 1, expr: "Minterm set: S = {0, 2, 5, 7, 8, 10, 13, 15} (8 minterms).", rule: "Minterm Definition", reason: "Exactly half of the 16 rows evaluate to 1." },
        { step: 2, expr: "Complementary 0-row set: U \\ S = {1, 3, 4, 6, 9, 11, 12, 14} (8 maxterms).", rule: "Complementary Set Deduction", reason: "Remaining 8 rows." },
        { step: 3, expr: "F_POS = Pi M(1, 3, 4, 6, 9, 11, 12, 14)", rule: "Canonical POS", reason: "Product of 8 maxterms." },
        { step: 4, expr: "Group minterms {0, 2, 8, 10}: A'B'C'D' + A'B'CD' + AB'C'D' + AB'CD' = B'D'(A'C' + A'C + AC' + AC) = B'D'(1) = B'D'", rule: "Algebraic Factoring", reason: "Variables A and C eliminate completely." },
        { step: 5, expr: "Group minterms {5, 7, 13, 15}: A'BC'D + A'BCD + ABC'D + ABCD = BD(A'C' + A'C + AC' + AC) = BD(1) = BD", rule: "Algebraic Factoring", reason: "Variables A and C eliminate completely." },
        { step: 6, expr: "Combine: F = B'D' + BD", rule: "Disjunction", reason: "This is the XNOR function of variables B and D." }
      ],
      finalAnswer: "F_POS = Pi M(1, 3, 4, 6, 9, 11, 12, 14) | Simplified Equivalence: F = B'D' + BD",
      verification: "Testing B=0, D=0 (rows 0, 2, 8, 10): B'D' = 1 -> F=1. Testing B=1, D=1 (rows 5, 7, 13, 15): BD = 1 -> F=1. All 8 rows match.",
      pitfall: "Notice the symmetry: the function is completely independent of variables A and C."
    },
    {
      id: "WM2.3-A05",
      number: 14,
      level: "Advanced",
      title: "Exhaustive Truth Table Construction: F(A, B, C, D) = A'B + CD'",
      variables: "A, B, C, D (4 variables)",
      problem: "Construct the complete 16-row truth table for F(A, B, C, D) = A'B + CD', and derive both canonical forms directly from the table.",
      solutionSteps: [
        { step: 1, expr: "Rows where A'B = 1: A = 0, B = 1 -> Rows 4 (0100), 5 (0101), 6 (0110), 7 (0111)", rule: "Truth Evaluation", reason: "A'B is high for 4 consecutive rows." },
        { step: 2, expr: "Rows where CD' = 1: C = 1, D = 0 -> Rows 2 (0010), 6 (0110), 10 (1010), 14 (1110)", rule: "Truth Evaluation", reason: "CD' is high for 4 dispersed rows." },
        { step: 3, expr: "Evaluate F = A'B + CD' across all 16 rows:\nRow 0 (0000): 0+0 = 0\nRow 1 (0001): 0+0 = 0\nRow 2 (0010): 0+1 = 1\nRow 3 (0011): 0+0 = 0\nRow 4 (0100): 1+0 = 1\nRow 5 (0101): 1+0 = 1\nRow 6 (0110): 1+1 = 1\nRow 7 (0111): 1+0 = 1\nRow 8 (1000): 0+0 = 0\nRow 9 (1001): 0+0 = 0\nRow 10 (1010): 0+1 = 1\nRow 11 (1011): 0+0 = 0\nRow 12 (1100): 0+0 = 0\nRow 13 (1101): 0+0 = 0\nRow 14 (1110): 0+1 = 1\nRow 15 (1111): 0+0 = 0", rule: "Truth Table Construction", reason: "Exact evaluation of the 16 rows." },
        { step: 4, expr: "1-rows: {2, 4, 5, 6, 7, 10, 14} -> Canonical SOP = Sigma m(2, 4, 5, 6, 7, 10, 14)", rule: "Canonical SOP Extraction", reason: "7 minterms." },
        { step: 5, expr: "0-rows: {0, 1, 3, 8, 9, 11, 12, 13, 15} -> Canonical POS = Pi M(0, 1, 3, 8, 9, 11, 12, 13, 15)", rule: "Canonical POS Extraction", reason: "9 maxterms." }
      ],
      finalAnswer: "F_SOP = Sigma m(2, 4, 5, 6, 7, 10, 14) | F_POS = Pi M(0, 1, 3, 8, 9, 11, 12, 13, 15)",
      verification: "7 + 9 = 16 rows. Row 6 satisfies both product terms (1+1=1).",
      pitfall: "Row 6 (0110) has both A'B=1 and CD'=1: do not list it twice in the index set."
    },

    // Optional Enrichment Model (CH01)
    {
      id: "WM2.3-CH01",
      number: 15,
      level: "Challenge",
      title: "Optional Enrichment: Combinatorial Counting of Boolean Function Space",
      variables: "n = 4 variables (16 input combinations)",
      problem: "A four-variable Boolean function has 16 possible input combinations. Prove mathematically that out of the 65,536 total possible 4-variable Boolean functions, exactly 32,768 functions contain an odd number of 1-output rows.",
      solutionSteps: [
        { step: 1, expr: "A 4-variable truth table has 2^4 = 16 rows. The output column F is a 16-bit binary vector: (F0, F1, ..., F15) in {0, 1}^16.", rule: "Vector Space Representation", reason: "Total possible output vectors = 2^16 = 65,536." },
        { step: 2, expr: "The number of 1-output rows is the Hamming weight k of the output vector, where k ranges from 0 to 16.", rule: "Hamming Weight Definition", reason: "The number of functions with exactly k ones is given by the binomial coefficient C(16, k)." },
        { step: 3, expr: "An odd number of 1-rows corresponds to k in {1, 3, 5, 7, 9, 11, 13, 15}.", rule: "Odd Partition Condition", reason: "Sum of C(16, k) for all odd k." },
        { step: 4, expr: "By the Binomial Theorem: (1 + 1)^16 = Sum_{k=0..16} C(16, k) = 2^16 = 65,536.", rule: "Total Sum Identity", reason: "Sum of all subsets." },
        { step: 5, expr: "Also: (1 - 1)^16 = 0 = Sum_{k even} C(16, k) - Sum_{k odd} C(16, k) = 0.", rule: "Alternating Sum Identity", reason: "Shows that Sum_{k even} C(16, k) = Sum_{k odd} C(16, k)." },
        { step: 6, expr: "Therefore: Sum_{k odd} C(16, k) = 2^16 / 2 = 2^(16 - 1) = 2^15 = 32,768.", rule: "Bisection Property", reason: "Exactly half of the function space has odd weight." }
      ],
      finalAnswer: "Exactly 32,768 four-variable Boolean functions have an odd number of 1-output rows (exactly 50% of the function space).",
      verification: "C(16, 1) + C(16, 3) + C(16, 5) + C(16, 7) + C(16, 9) + C(16, 11) + C(16, 13) + C(16, 15) = 16 + 560 + 4368 + 11440 + 11440 + 4368 + 560 + 16 = 32,768. Mathematically exact.",
      pitfall: "This property holds for any number of inputs n: exactly 2^(2^n - 1) functions have odd parity."
    }
  ],

  // Tab 5: Complete Cheat Sheet Content
  cheatSheet: {
    oneGlanceRules: [
      {
        concept: "Minterm Polarity (SOP)",
        rule: "0 -> Complemented (A')  |  1 -> Uncomplemented (A)",
        tip: "Formulate product terms (AND). Evaluates to 1 ONLY at that indexed row."
      },
      {
        concept: "Maxterm Polarity (POS)",
        rule: "0 -> Uncomplemented (A)  |  1 -> Complemented (A')",
        tip: "Formulate sum terms (OR). Evaluates to 0 ONLY at that indexed row."
      },
      {
        concept: "Canonical SOP Selection",
        rule: "Select all rows where F = 1",
        tip: "F = Sigma m(1-rows). Connect minterms with logical OR (+)."
      },
      {
        concept: "Canonical POS Selection",
        rule: "Select all rows where F = 0",
        tip: "F = Pi M(0-rows). Connect maxterms with logical AND (·)."
      },
      {
        concept: "De Morgan Complement",
        rule: "(m_i)' = M_i  and  (M_i)' = m_i",
        tip: "The complement of a minterm is its corresponding maxterm with identical index."
      },
      {
        concept: "Index Conversion Shortcut",
        rule: "F = Sigma m(S)  <=>  F = Pi M(U \\ S)",
        tip: "The maxterm index list is simply the missing indices from universe U = {0, 1, ..., 2^n - 1}."
      }
    ],

    checklist: [
      "Have I established a strict variable order (e.g. A as MSB, B, C as LSB)?",
      "Are all 2^n binary permutations written in correct ascending count order?",
      "For Canonical SOP: have I selected ONLY the rows where F = 1?",
      "For Canonical POS: have I selected ONLY the rows where F = 0?",
      "Have I verified minterm polarity: 0 -> prime, 1 -> unprimed?",
      "Have I verified maxterm polarity: 0 -> unprimed, 1 -> prime?",
      "Does every term in my canonical expression contain ALL n declared variables?",
      "Have duplicate indices been eliminated from the Sigma m or Pi M list?",
      "Do minterm count + maxterm count equal exactly 2^n?"
    ],

    commonExamMistakes: [
      {
        id: "err1",
        title: "Reversing Polarity Rules",
        incorrect: "Writing m2 = A'B for row 10, or M2 = AB' for row 10.",
        correct: "m2 = AB' (1 -> A, 0 -> B') and M2 = A' + B (1 -> A', 0 -> B).",
        why: "Minterms are products that must equal 1 at that row; Maxterms are sums that must equal 0 at that row."
      },
      {
        id: "err2",
        title: "Confusing Binary Value with Index",
        incorrect: "Assuming row ABC = 011 has index 6.",
        correct: "Row 011 in base-10 is 0*4 + 1*2 + 1*1 = 3 (index 3).",
        why: "Row indices are strictly the base-10 numerical values of the binary string."
      },
      {
        id: "err3",
        title: "Changing Variable Ordering",
        incorrect: "Declaring variables (A, B, C) but evaluating C as the MSB (CBA).",
        correct: "Always evaluate the leftmost variable as MSB and rightmost as LSB: 4A + 2B + C.",
        why: "Flipping variable order completely scrambles all decimal row indices."
      },
      {
        id: "err4",
        title: "Assuming Every Product Term is a Minterm",
        incorrect: "Calling AB a minterm in a 3-variable function F(A, B, C).",
        correct: "AB is a general product term, NOT a minterm. A minterm for 3 variables MUST contain all 3 variables (ABC or ABC').",
        why: "By definition, a minterm contains every declared variable of the function exactly once."
      },
      {
        id: "err5",
        title: "Assuming Every Sum Term is a Maxterm",
        incorrect: "Calling (A + B) a maxterm in a 3-variable function F(A, B, C).",
        correct: "(A + B) is a general sum term, NOT a maxterm. A maxterm must contain all 3 variables: (A + B + C) or (A + B + C').",
        why: "A maxterm must contain every declared variable of the function exactly once."
      },
      {
        id: "err6",
        title: "Confusing SOP with Canonical SOP",
        incorrect: "Writing F = AB + C and calling it canonical SOP.",
        correct: "F = AB + C is standard SOP. Canonical SOP requires expansion to Sigma m: ABC + ABC' + AB'C + A'BC + A'B'C.",
        why: "Canonical form is an exhaustive expansion where every term has identical full length."
      },
      {
        id: "err7",
        title: "Selecting F = 0 Rows for Canonical SOP",
        incorrect: "Writing F_SOP = Sigma m(zero-rows).",
        correct: "Canonical SOP sums minterms where F = 1. Canonical POS products maxterms where F = 0.",
        why: "Minterms are ORed together; if you include a 0-row minterm, F would incorrectly become 1 at that row."
      },
      {
        id: "err8",
        title: "Selecting F = 1 Rows for Canonical POS",
        incorrect: "Writing F_POS = Pi M(one-rows).",
        correct: "Canonical POS products maxterms where F = 0.",
        why: "Maxterms are ANDed together; if you include a 1-row maxterm, F would incorrectly become 0 at that row."
      },
      {
        id: "err9",
        title: "Confusing POS Conversion with Function Complementation",
        incorrect: "Thinking that converting F = Sigma m(1, 2) to F = Pi M(0, 3) creates the inverted function F'.",
        correct: "F = Sigma m(1, 2) and F = Pi M(0, 3) are the EXACT SAME function F. The complement is F' = Sigma m(0, 3) = Pi M(1, 2).",
        why: "Rewriting in POS changes the algebraic perspective, NOT the truth values of the function."
      },
      {
        id: "err10",
        title: "Duplicate Index Counting in SOP Union",
        incorrect: "Writing F = Sigma m(2, 3, 3, 7) because term 1 and term 2 both generated index 3.",
        correct: "F = Sigma m(2, 3, 7). By Boolean idempotence (x + x = x), duplicate terms collapse.",
        why: "A truth-table row cannot be selected more than once."
      }
    ]
  },

  // Tab 6: Practice Lab Content (24 Validated Exercises: 6 Basic, 6 Intermediate, 8 Advanced, 4 Challenge)
  practiceLab: [
    // Basic (P01 - P06)
    {
      id: "P01",
      number: 1,
      difficulty: "Basic",
      variables: "A, B",
      problem: "For the two-variable binary combination AB = 10, determine its decimal index, minterm, and maxterm.",
      hint1: "Calculate decimal index: 2(A) + 1(B). What does binary 10 equal?",
      hint2: "For minterm: 1 -> A, 0 -> B'. For maxterm: 1 -> A', 0 -> B.",
      solutionSteps: [
        { step: 1, expr: "Index: 2(1) + 1(0) = 2", law: "Binary Conversion", reason: "Binary 10 is decimal 2." },
        { step: 2, expr: "m2 = AB'", law: "Minterm Polarity", reason: "1 -> A, 0 -> B' (product term)." },
        { step: 3, expr: "M2 = (A' + B)", law: "Maxterm Polarity", reason: "1 -> A', 0 -> B (sum term)." }
      ],
      finalAnswer: "m2 = AB' | M2 = (A' + B)",
      keyTakeaway: "Index 2 corresponds to minterm AB' and maxterm (A' + B)."
    },
    {
      id: "P02",
      number: 2,
      difficulty: "Basic",
      variables: "A, B",
      problem: "For the two-variable combination AB = 11, identify its minterm and maxterm.",
      hint1: "Both variables are logic 1. What index is binary 11?",
      hint2: "In minterms, 1 stays unprimed. In maxterms, 1 becomes primed.",
      solutionSteps: [
        { step: 1, expr: "Index: 2(1) + 1(1) = 3", law: "Binary Conversion", reason: "Binary 11 is decimal 3." },
        { step: 2, expr: "m3 = AB", law: "Minterm Polarity", reason: "Both variables uncomplemented." },
        { step: 3, expr: "M3 = (A' + B')", law: "Maxterm Polarity", reason: "Both variables complemented." }
      ],
      finalAnswer: "m3 = AB | M3 = (A' + B')",
      keyTakeaway: "m3 = AB and M3 = (A' + B')."
    },
    {
      id: "P03",
      number: 3,
      difficulty: "Basic",
      variables: "A, B, C",
      problem: "For the three-variable input combination ABC = 011, identify its decimal index, minterm, and maxterm.",
      hint1: "Binary 011: calculate 4(0) + 2(1) + 1(1).",
      hint2: "Minterm: A is 0 (prime), B and C are 1 (unprimed).",
      solutionSteps: [
        { step: 1, expr: "Index: 4(0) + 2(1) + 1(1) = 3", law: "Binary Conversion", reason: "Binary 011 is decimal 3." },
        { step: 2, expr: "m3 = A'BC", law: "Minterm Polarity", reason: "0 -> A', 1 -> B, 1 -> C." },
        { step: 3, expr: "M3 = (A + B' + C')", law: "Maxterm Polarity", reason: "0 -> A, 1 -> B', 1 -> C'." }
      ],
      finalAnswer: "m3 = A'BC | M3 = (A + B' + C')",
      keyTakeaway: "Row 3 corresponds to minterm A'BC and maxterm (A + B' + C')."
    },
    {
      id: "P04",
      number: 4,
      difficulty: "Basic",
      variables: "A, B, C",
      problem: "For decimal index 6 with variables (A, B, C), identify the binary input pattern, minterm, and maxterm.",
      hint1: "Convert decimal 6 into a 3-bit binary string.",
      hint2: "6 = 4 + 2 + 0 -> binary 110.",
      solutionSteps: [
        { step: 1, expr: "6 in binary = 110 (A=1, B=1, C=0)", law: "Decimal to Binary", reason: "4(1) + 2(1) + 1(0) = 6." },
        { step: 2, expr: "m6 = ABC'", law: "Minterm Polarity", reason: "1 -> A, 1 -> B, 0 -> C'." },
        { step: 3, expr: "M6 = (A' + B' + C)", law: "Maxterm Polarity", reason: "1 -> A', 1 -> B', 0 -> C." }
      ],
      finalAnswer: "Binary = 110 | m6 = ABC' | M6 = (A' + B' + C)",
      keyTakeaway: "Index 6 corresponds to binary 110, minterm ABC', and maxterm (A' + B' + C)."
    },
    {
      id: "P05",
      number: 5,
      difficulty: "Basic",
      variables: "A, B, C, D",
      problem: "For the four-variable combination ABCD = 1001, identify its decimal index, minterm, and maxterm.",
      hint1: "Positional weights: A=8, B=4, C=2, D=1. What is 8(1) + 1(1)?",
      hint2: "Minterm: 1 -> unprimed, 0 -> primed. Maxterm: 1 -> primed, 0 -> unprimed.",
      solutionSteps: [
        { step: 1, expr: "Index: 8(1) + 4(0) + 2(0) + 1(1) = 9", law: "Binary Conversion", reason: "Binary 1001 is decimal 9." },
        { step: 2, expr: "m9 = AB'C'D", law: "Minterm Polarity", reason: "1 -> A, 0 -> B', 0 -> C', 1 -> D." },
        { step: 3, expr: "M9 = (A' + B + C + D')", law: "Maxterm Polarity", reason: "1 -> A', 0 -> B, 0 -> C, 1 -> D'." }
      ],
      finalAnswer: "m9 = AB'C'D | M9 = (A' + B + C + D')",
      keyTakeaway: "Row 9 in a 4-variable table is m9 = AB'C'D and M9 = (A' + B + C + D')."
    },
    {
      id: "P06",
      number: 6,
      difficulty: "Basic",
      variables: "A, B, C, D",
      problem: "For the four-variable combination ABCD = 1110, determine its decimal index, minterm, and maxterm.",
      hint1: "Weights: 8 + 4 + 2 + 0 = 14.",
      hint2: "D is 0; A, B, C are 1.",
      solutionSteps: [
        { step: 1, expr: "Index: 8(1) + 4(1) + 2(1) + 1(0) = 14", law: "Binary Conversion", reason: "Binary 1110 is decimal 14." },
        { step: 2, expr: "m14 = ABCD'", law: "Minterm Polarity", reason: "1 -> A, B, C; 0 -> D'." },
        { step: 3, expr: "M14 = (A' + B' + C' + D)", law: "Maxterm Polarity", reason: "1 -> A', B', C'; 0 -> D." }
      ],
      finalAnswer: "m14 = ABCD' | M14 = (A' + B' + C' + D)",
      keyTakeaway: "Row 14 is m14 = ABCD' and M14 = (A' + B' + C' + D)."
    },

    // Intermediate (P07 - P12)
    {
      id: "P07",
      number: 7,
      difficulty: "Intermediate",
      variables: "A, B",
      problem: "A two-variable function evaluates to logic 1 at input combinations 01 and 10, and evaluates to 0 elsewhere. Express F in compact Sigma m and Pi M notation.",
      hint1: "Identify the 1-rows and the 0-rows from the 4-row universe {0, 1, 2, 3}.",
      hint2: "1-rows are indices 1 and 2. 0-rows are the remaining indices.",
      solutionSteps: [
        { step: 1, expr: "1-rows: index 1 (01) and index 2 (10) -> Sigma m(1, 2)", law: "Canonical SOP", reason: "Rows where F = 1." },
        { step: 2, expr: "0-rows: index 0 (00) and index 3 (11) -> Pi M(0, 3)", law: "Canonical POS", reason: "Rows where F = 0." }
      ],
      finalAnswer: "F = Sigma m(1, 2) = Pi M(0, 3)",
      keyTakeaway: "This is the classic XOR function: F = A'B + AB' = (A + B)(A' + B')."
    },
    {
      id: "P08",
      number: 8,
      difficulty: "Intermediate",
      variables: "A, B, C",
      problem: "For the three-variable function F(A, B, C) = Sigma m(1, 3, 5, 7), determine its canonical POS representation.",
      hint1: "Universe U has 8 indices: {0, 1, 2, 3, 4, 5, 6, 7}.",
      hint2: "Subtract the given minterm set from the universe.",
      solutionSteps: [
        { step: 1, expr: "U = {0, 1, 2, 3, 4, 5, 6, 7}", law: "Index Universe", reason: "3-variable universe." },
        { step: 2, expr: "0-rows = U \\ {1, 3, 5, 7} = {0, 2, 4, 6}", law: "Complementary Set Deduction", reason: "All even indices have F = 0." },
        { step: 3, expr: "F = Pi M(0, 2, 4, 6)", law: "Canonical POS", reason: "Product of maxterms." }
      ],
      finalAnswer: "F(A, B, C) = Pi M(0, 2, 4, 6)",
      keyTakeaway: "The maxterm set is the exact complement of the minterm set within universe U."
    },
    {
      id: "P09",
      number: 9,
      difficulty: "Intermediate",
      variables: "A, B, C",
      problem: "For F(A, B, C) = Pi M(1, 2, 6), determine its canonical SOP representation.",
      hint1: "Find all indices from 0 to 7 that are NOT 1, 2, or 6.",
      hint2: "Universe U = {0, 1, 2, 3, 4, 5, 6, 7}.",
      solutionSteps: [
        { step: 1, expr: "Given 0-rows: {1, 2, 6}", law: "Maxterm Set", reason: "Rows where F = 0." },
        { step: 2, expr: "1-rows: {0, 1, 2, 3, 4, 5, 6, 7} \\ {1, 2, 6} = {0, 3, 4, 5, 7}", law: "Complementary Set", reason: "Rows where F = 1." },
        { step: 3, expr: "F = Sigma m(0, 3, 4, 5, 7)", law: "Canonical SOP", reason: "Sum of minterms." }
      ],
      finalAnswer: "F(A, B, C) = Sigma m(0, 3, 4, 5, 7)",
      keyTakeaway: "3 maxterms + 5 minterms = 8 total domain rows."
    },
    {
      id: "P10",
      number: 10,
      difficulty: "Intermediate",
      variables: "A, B, C",
      problem: "For the expression F(A, B, C) = AB + C', find both Sigma m and Pi M index notations.",
      hint1: "Where is C' equal to 1? (All rows where C = 0). Where is AB equal to 1? (Rows 6 and 7).",
      hint2: "Take the union of these row sets.",
      solutionSteps: [
        { step: 1, expr: "C' is 1 at indices {0, 2, 4, 6}", law: "Truth Mapping", reason: "Even rows have C = 0." },
        { step: 2, expr: "AB is 1 at indices {6, 7}", law: "Truth Mapping", reason: "A=1, B=1." },
        { step: 3, expr: "1-rows = {0, 2, 4, 6} U {6, 7} = {0, 2, 4, 6, 7} -> F = Sigma m(0, 2, 4, 6, 7)", law: "Set Union", reason: "Canonical SOP." },
        { step: 4, expr: "0-rows = {0, 1, 2, 3, 4, 5, 6, 7} \\ {0, 2, 4, 6, 7} = {1, 3, 5} -> F = Pi M(1, 3, 5)", law: "Complementary Set", reason: "Canonical POS." }
      ],
      finalAnswer: "F = Sigma m(0, 2, 4, 6, 7) = Pi M(1, 3, 5)",
      keyTakeaway: "Union the minterms of each product term and complement to find maxterms."
    },
    {
      id: "P11",
      number: 11,
      difficulty: "Intermediate",
      variables: "A, B, C",
      problem: "For F(A, B, C) = A'B + BC, determine both canonical index sets.",
      hint1: "A'B is 1 when A=0, B=1. What rows are these?",
      hint2: "BC is 1 when B=1, C=1. What rows are these?",
      solutionSteps: [
        { step: 1, expr: "A'B is 1 at ABC = 010 (2) and 011 (3)", law: "Product Expansion", reason: "A=0, B=1, C varies." },
        { step: 2, expr: "BC is 1 at ABC = 011 (3) and 111 (7)", law: "Product Expansion", reason: "B=1, C=1, A varies." },
        { step: 3, expr: "1-rows: {2, 3} U {3, 7} = {2, 3, 7} -> F = Sigma m(2, 3, 7)", law: "Set Union", reason: "Canonical SOP." },
        { step: 4, expr: "0-rows: {0, 1, 4, 5, 6} -> F = Pi M(0, 1, 4, 5, 6)", law: "Complementary Set", reason: "Canonical POS." }
      ],
      finalAnswer: "F = Sigma m(2, 3, 7) = Pi M(0, 1, 4, 5, 6)",
      keyTakeaway: "Row 3 is common to both terms; include it once in Sigma m."
    },
    {
      id: "P12",
      number: 12,
      difficulty: "Intermediate",
      variables: "A, B, C",
      problem: "For the function F(A, B, C) = C', construct both canonical representations.",
      hint1: "C' is 1 whenever C = 0.",
      hint2: "Which rows in the 3-variable table have C = 0?",
      solutionSteps: [
        { step: 1, expr: "C = 0 on rows: 000 (0), 010 (2), 100 (4), 110 (6)", law: "Truth Mapping", reason: "4 rows." },
        { step: 2, expr: "F = Sigma m(0, 2, 4, 6)", law: "Canonical SOP", reason: "Sum of minterms." },
        { step: 3, expr: "C = 1 on remaining rows: 001 (1), 011 (3), 101 (5), 111 (7)", law: "Complementary Rows", reason: "4 rows." },
        { step: 4, expr: "F = Pi M(1, 3, 5, 7)", law: "Canonical POS", reason: "Product of maxterms." }
      ],
      finalAnswer: "F = Sigma m(0, 2, 4, 6) = Pi M(1, 3, 5, 7)",
      keyTakeaway: "A single literal in 3 variables spans exactly 4 minterms."
    },

    // Advanced (P13 - P20)
    {
      id: "P13",
      number: 13,
      difficulty: "Advanced",
      variables: "A, B, C, D",
      problem: "For F(A, B, C, D) = AB + CD, determine the canonical index sets.",
      hint1: "AB is 1 for ABCD in {1100, 1101, 1110, 1111} (indices 12, 13, 14, 15).",
      hint2: "CD is 1 for ABCD in {0011, 0111, 1011, 1111} (indices 3, 7, 11, 15).",
      solutionSteps: [
        { step: 1, expr: "AB minterms: {12, 13, 14, 15}", law: "Product Expansion", reason: "A=1, B=1." },
        { step: 2, expr: "CD minterms: {3, 7, 11, 15}", law: "Product Expansion", reason: "C=1, D=1." },
        { step: 3, expr: "1-rows: {12, 13, 14, 15} U {3, 7, 11, 15} = {3, 7, 11, 12, 13, 14, 15}", law: "Set Union", reason: "Index 15 shared." },
        { step: 4, expr: "F = Sigma m(3, 7, 11, 12, 13, 14, 15)", law: "Canonical SOP", reason: "7 minterms." },
        { step: 5, expr: "F = Pi M(0, 1, 2, 4, 5, 6, 8, 9, 10)", law: "Canonical POS", reason: "Remaining 9 maxterms from {0..15}." }
      ],
      finalAnswer: "F = Sigma m(3, 7, 11, 12, 13, 14, 15) | Pi M(0, 1, 2, 4, 5, 6, 8, 9, 10)",
      keyTakeaway: "7 minterms and 9 maxterms partition the 16-row universe."
    },
    {
      id: "P14",
      number: 14,
      difficulty: "Advanced",
      variables: "A, B, C, D",
      problem: "For F(A, B, C, D) = (A + B)(C + D), determine both canonical representations.",
      hint1: "Find when (A + B) = 0 (A=0, B=0 -> rows 0, 1, 2, 3).",
      hint2: "Find when (C + D) = 0 (C=0, D=0 -> rows 0, 4, 8, 12). Take their union for maxterms.",
      solutionSteps: [
        { step: 1, expr: "(A + B) = 0 at {0, 1, 2, 3}", law: "Zero Factor Analysis", reason: "A=0, B=0." },
        { step: 2, expr: "(C + D) = 0 at {0, 4, 8, 12}", law: "Zero Factor Analysis", reason: "C=0, D=0." },
        { step: 3, expr: "0-rows = {0, 1, 2, 3} U {0, 4, 8, 12} = {0, 1, 2, 3, 4, 8, 12}", law: "Set Union", reason: "7 maxterms." },
        { step: 4, expr: "F = Pi M(0, 1, 2, 3, 4, 8, 12)", law: "Canonical POS", reason: "Product of maxterms." },
        { step: 5, expr: "1-rows = {0..15} \\ {0, 1, 2, 3, 4, 8, 12} = {5, 6, 7, 9, 10, 11, 13, 14, 15}", law: "Complementary Deduction", reason: "9 minterms." },
        { step: 6, expr: "F = Sigma m(5, 6, 7, 9, 10, 11, 13, 14, 15)", law: "Canonical SOP", reason: "Sum of minterms." }
      ],
      finalAnswer: "F = Sigma m(5, 6, 7, 9, 10, 11, 13, 14, 15) | Pi M(0, 1, 2, 3, 4, 8, 12)",
      keyTakeaway: "Row 0 makes both sum factors zero; union prevents duplicate counting."
    },
    {
      id: "P15",
      number: 15,
      difficulty: "Advanced",
      variables: "A, B, C, D",
      problem: "For F(A, B, C, D) = A'C + BD, determine both canonical index sets.",
      hint1: "A'C produces 4 minterms: A=0, C=1, with B and D varying.",
      hint2: "BD produces 4 minterms: B=1, D=1, with A and C varying.",
      solutionSteps: [
        { step: 1, expr: "A'C minterms: 0010 (2), 0011 (3), 0110 (6), 0111 (7)", law: "Product Expansion", reason: "A=0, C=1." },
        { step: 2, expr: "BD minterms: 0101 (5), 0111 (7), 1101 (13), 1111 (15)", law: "Product Expansion", reason: "B=1, D=1." },
        { step: 3, expr: "1-rows: {2, 3, 6, 7} U {5, 7, 13, 15} = {2, 3, 5, 6, 7, 13, 15}", law: "Set Union", reason: "Index 7 shared." },
        { step: 4, expr: "F = Sigma m(2, 3, 5, 6, 7, 13, 15)", law: "Canonical SOP", reason: "7 minterms." },
        { step: 5, expr: "F = Pi M(0, 1, 4, 8, 9, 10, 11, 12, 14)", law: "Canonical POS", reason: "Remaining 9 maxterms." }
      ],
      finalAnswer: "F = Sigma m(2, 3, 5, 6, 7, 13, 15) | Pi M(0, 1, 4, 8, 9, 10, 11, 12, 14)",
      keyTakeaway: "Union row 7 once; 7 minterms and 9 maxterms."
    },
    {
      id: "P16",
      number: 16,
      difficulty: "Advanced",
      variables: "A, B, C, D",
      problem: "For F(A, B, C, D) = A'B + CD', determine both canonical index sets.",
      hint1: "A'B is high on rows 4, 5, 6, 7.",
      hint2: "CD' is high on rows 2, 6, 10, 14.",
      solutionSteps: [
        { step: 1, expr: "A'B rows: {4, 5, 6, 7}", law: "Product Expansion", reason: "A=0, B=1." },
        { step: 2, expr: "CD' rows: {2, 6, 10, 14}", law: "Product Expansion", reason: "C=1, D=0." },
        { step: 3, expr: "1-rows: {4, 5, 6, 7} U {2, 6, 10, 14} = {2, 4, 5, 6, 7, 10, 14}", law: "Set Union", reason: "Row 6 shared." },
        { step: 4, expr: "F = Sigma m(2, 4, 5, 6, 7, 10, 14)", law: "Canonical SOP", reason: "7 minterms." },
        { step: 5, expr: "F = Pi M(0, 1, 3, 8, 9, 11, 12, 13, 15)", law: "Canonical POS", reason: "Remaining 9 maxterms." }
      ],
      finalAnswer: "F = Sigma m(2, 4, 5, 6, 7, 10, 14) | Pi M(0, 1, 3, 8, 9, 11, 12, 13, 15)",
      keyTakeaway: "Sigma m(2, 4, 5, 6, 7, 10, 14) has 7 minterms."
    },
    {
      id: "P17",
      number: 17,
      difficulty: "Advanced",
      variables: "A, B, C, D",
      problem: "Convert Sigma m(0, 2, 5, 7, 8, 10, 13, 15) into canonical POS for variables A, B, C, D.",
      hint1: "4 variables means universe U has indices 0 through 15.",
      hint2: "List all indices from {0..15} that are NOT in the given Sigma m list.",
      solutionSteps: [
        { step: 1, expr: "Universe U = {0, 1, 2, ..., 15}", law: "4-Variable Universe", reason: "16 rows total." },
        { step: 2, expr: "Given minterm set S = {0, 2, 5, 7, 8, 10, 13, 15}", law: "Minterm Set", reason: "8 minterms." },
        { step: 3, expr: "U \\ S = {1, 3, 4, 6, 9, 11, 12, 14}", law: "Complementary Set", reason: "8 maxterms." },
        { step: 4, expr: "F = Pi M(1, 3, 4, 6, 9, 11, 12, 14)", law: "Canonical POS", reason: "Product of maxterms." }
      ],
      finalAnswer: "F = Pi M(1, 3, 4, 6, 9, 11, 12, 14)",
      keyTakeaway: "Direct set subtraction from U yields the canonical POS notation."
    },
    {
      id: "P18",
      number: 18,
      difficulty: "Advanced",
      variables: "A, B, C, D",
      problem: "For a four-variable function, F = 1 exactly when D = 1. Determine its canonical SOP and POS index sets.",
      hint1: "Which binary numbers between 0 and 15 end with 1?",
      hint2: "All odd numbers have D = 1 (1, 3, 5, 7, 9, 11, 13, 15).",
      solutionSteps: [
        { step: 1, expr: "D = 1 on all odd indices: {1, 3, 5, 7, 9, 11, 13, 15}", law: "Binary Parity Analysis", reason: "LSB is 1." },
        { step: 2, expr: "F = Sigma m(1, 3, 5, 7, 9, 11, 13, 15)", law: "Canonical SOP", reason: "8 minterms." },
        { step: 3, expr: "D = 0 on all even indices: {0, 2, 4, 6, 8, 10, 12, 14}", law: "Binary Parity Analysis", reason: "LSB is 0." },
        { step: 4, expr: "F = Pi M(0, 2, 4, 6, 8, 10, 12, 14)", law: "Canonical POS", reason: "8 maxterms." }
      ],
      finalAnswer: "F = Sigma m(1, 3, 5, 7, 9, 11, 13, 15) | Pi M(0, 2, 4, 6, 8, 10, 12, 14)",
      keyTakeaway: "Single literal D in a 4-variable universe spans exactly 8 minterms (all odd rows)."
    },
    {
      id: "P19",
      number: 19,
      difficulty: "Advanced",
      variables: "A, B, C, D",
      problem: "For F(A, B, C, D) = (A + B')(C + D), construct both canonical index sets.",
      hint1: "(A + B') = 0 when A = 0, B = 1 (rows 4, 5, 6, 7).",
      hint2: "(C + D) = 0 when C = 0, D = 0 (rows 0, 4, 8, 12). Union gives maxterm indices.",
      solutionSteps: [
        { step: 1, expr: "(A + B') = 0 at ABCD in {0100(4), 0101(5), 0110(6), 0111(7)}", law: "Zero Factor Analysis", reason: "A=0, B=1." },
        { step: 2, expr: "(C + D) = 0 at ABCD in {0000(0), 0100(4), 1000(8), 1100(12)}", law: "Zero Factor Analysis", reason: "C=0, D=0." },
        { step: 3, expr: "0-rows: {4, 5, 6, 7} U {0, 4, 8, 12} = {0, 4, 5, 6, 7, 8, 12}", law: "Set Union", reason: "Row 4 common; 7 maxterms." },
        { step: 4, expr: "F = Pi M(0, 4, 5, 6, 7, 8, 12)", law: "Canonical POS", reason: "7 maxterms." },
        { step: 5, expr: "1-rows: {0..15} \\ {0, 4, 5, 6, 7, 8, 12} = {1, 2, 3, 9, 10, 11, 13, 14, 15}", law: "Complementary Set", reason: "9 minterms." },
        { step: 6, expr: "F = Sigma m(1, 2, 3, 9, 10, 11, 13, 14, 15)", law: "Canonical SOP", reason: "9 minterms." }
      ],
      finalAnswer: "F = Sigma m(1, 2, 3, 9, 10, 11, 13, 14, 15) | Pi M(0, 4, 5, 6, 7, 8, 12)",
      keyTakeaway: "Row 4 makes both factors zero; 7 maxterms and 9 minterms."
    },
    {
      id: "P20",
      number: 20,
      difficulty: "Advanced",
      variables: "A, B, C, D",
      problem: "For F(A, B, C, D) = AB' + C'D, determine its canonical representations.",
      hint1: "AB' = 1 when A=1, B=0 (rows 8, 9, 10, 11).",
      hint2: "C'D = 1 when C=0, D=1 (rows 1, 5, 9, 13).",
      solutionSteps: [
        { step: 1, expr: "AB' minterms: {8, 9, 10, 11}", law: "Product Expansion", reason: "A=1, B=0." },
        { step: 2, expr: "C'D minterms: {1, 5, 9, 13}", law: "Product Expansion", reason: "C=0, D=1." },
        { step: 3, expr: "1-rows: {8, 9, 10, 11} U {1, 5, 9, 13} = {1, 5, 8, 9, 10, 11, 13}", law: "Set Union", reason: "Row 9 common; 7 minterms." },
        { step: 4, expr: "F = Sigma m(1, 5, 8, 9, 10, 11, 13)", law: "Canonical SOP", reason: "7 minterms." },
        { step: 5, expr: "0-rows: {0, 2, 3, 4, 6, 7, 12, 14, 15}", law: "Complementary Set", reason: "9 maxterms." },
        { step: 6, expr: "F = Pi M(0, 2, 3, 4, 6, 7, 12, 14, 15)", law: "Canonical POS", reason: "9 maxterms." }
      ],
      finalAnswer: "F = Sigma m(1, 5, 8, 9, 10, 11, 13) | Pi M(0, 2, 3, 4, 6, 7, 12, 14, 15)",
      keyTakeaway: "Index 9 is shared by both product terms; include it once in Sigma m."
    },

    // Challenge (P21 - P24)
    {
      id: "P21",
      number: 21,
      difficulty: "Challenge",
      variables: "A, B, C, D",
      problem: "For F(A, B, C, D) = A'B' + CD, determine the full canonical index sets.",
      hint1: "A'B' = 1 on rows where A=0, B=0 (indices 0, 1, 2, 3).",
      hint2: "CD = 1 on rows where C=1, D=1 (indices 3, 7, 11, 15).",
      solutionSteps: [
        { step: 1, expr: "A'B' produces: 0000 (0), 0001 (1), 0010 (2), 0011 (3)", law: "Product Expansion", reason: "4 minterms." },
        { step: 2, expr: "CD produces: 0011 (3), 0111 (7), 1011 (11), 1111 (15)", law: "Product Expansion", reason: "4 minterms." },
        { step: 3, expr: "1-rows: {0, 1, 2, 3} U {3, 7, 11, 15} = {0, 1, 2, 3, 7, 11, 15}", law: "Set Union", reason: "Index 3 shared; 7 minterms." },
        { step: 4, expr: "F = Sigma m(0, 1, 2, 3, 7, 11, 15)", law: "Canonical SOP", reason: "7 minterms." },
        { step: 5, expr: "0-rows: {4, 5, 6, 8, 9, 10, 12, 13, 14}", law: "Complementary Set", reason: "9 maxterms." },
        { step: 6, expr: "F = Pi M(4, 5, 6, 8, 9, 10, 12, 13, 14)", law: "Canonical POS", reason: "9 maxterms." }
      ],
      finalAnswer: "F = Sigma m(0, 1, 2, 3, 7, 11, 15) | Pi M(4, 5, 6, 8, 9, 10, 12, 13, 14)",
      keyTakeaway: "Row 3 satisfies both terms. Total minterms = 7, total maxterms = 9."
    },
    {
      id: "P22",
      number: 22,
      difficulty: "Challenge",
      variables: "A, B, C",
      problem: "Given F(A, B, C) = Sigma m(1, 2, 4, 7), write the equivalent canonical POS index notation.",
      hint1: "Universe U for 3 variables contains indices 0 through 7.",
      hint2: "List the complementary indices.",
      solutionSteps: [
        { step: 1, expr: "Universe U = {0, 1, 2, 3, 4, 5, 6, 7}", law: "3-Variable Universe", reason: "8 rows total." },
        { step: 2, expr: "Given minterm set S = {1, 2, 4, 7}", law: "Minterm Set", reason: "Odd-parity and symmetric rows." },
        { step: 3, expr: "U \\ S = {0, 3, 5, 6}", law: "Complementary Set", reason: "Zero-output rows." },
        { step: 4, expr: "F = Pi M(0, 3, 5, 6)", law: "Canonical POS", reason: "Product of maxterms." }
      ],
      finalAnswer: "F(A, B, C) = Pi M(0, 3, 5, 6)",
      keyTakeaway: "F = Sigma m(1, 2, 4, 7) = Pi M(0, 3, 5, 6). Notice this is the 3-variable odd parity (XOR) function!"
    },
    {
      id: "P23",
      number: 23,
      difficulty: "Challenge",
      variables: "n = 4 variables (16 rows)",
      problem: "A four-variable Boolean function has 16 possible input rows. How many different output columns contain an odd number of ones?",
      hint1: "Total output vectors = 2^16 = 65,536.",
      hint2: "The number of subsets of size k from a set of 16 is C(16, k). What is the sum of C(16, k) for all odd k?",
      solutionSteps: [
        { step: 1, expr: "Total possible 4-variable truth table output vectors = 2^16 = 65,536.", law: "Function Space", reason: "Each of the 16 rows can be independently 0 or 1." },
        { step: 2, expr: "The number of functions with exactly k ones is C(16, k).", law: "Combinatorics", reason: "Binomial coefficient." },
        { step: 3, expr: "Odd number of ones means k in {1, 3, 5, 7, 9, 11, 13, 15}.", law: "Parity Condition", reason: "Odd Hamming weight." },
        { step: 4, expr: "Sum_{k odd} C(16, k) = 2^(16 - 1) = 2^15 = 32,768.", law: "Binomial Theorem Bisection", reason: "Exactly half of all subsets of any non-empty finite set have odd size." }
      ],
      finalAnswer: "32,768 functions (exactly 2^15, or half of the 65,536 total function space).",
      keyTakeaway: "Exactly half of all Boolean functions for any number of inputs n have an odd number of minterms: 2^(2^n - 1)."
    },
    {
      id: "P24",
      number: 24,
      difficulty: "Challenge",
      variables: "A, B, C (3 variables)",
      problem: "For three variables A, B, C, construct the canonical index-set representations for the constant functions F = 0 and F = 1, and state the governing empty-set algebraic conventions.",
      hint1: "Constant 0 is never 1 on any row. What is its minterm set?",
      hint2: "Constant 1 is never 0 on any row. What is its maxterm set?",
      solutionSteps: [
        { step: 1, expr: "For F = 0 (Constant False): F is never 1 on any row -> Minterm set is empty: Sigma m(empty set). F is 0 on all 8 rows -> Maxterm set contains all rows: Pi M(0, 1, 2, 3, 4, 5, 6, 7).", law: "Constant Zero Definition", reason: "Empty sum = 0." },
        { step: 2, expr: "For F = 1 (Constant True): F is 1 on all 8 rows -> Minterm set contains all rows: Sigma m(0, 1, 2, 3, 4, 5, 6, 7). F is never 0 on any row -> Maxterm set is empty: Pi M(empty set).", law: "Constant One Definition", reason: "Empty product = 1." },
        { step: 3, expr: "Algebraic convention: Empty sum (disjunction over 0 terms) = additive identity 0. Empty product (conjunction over 0 terms) = multiplicative identity 1.", law: "Formal Mathematical Conventions", reason: "Preserves algebraic consistency across all Boolean ring operations." }
      ],
      finalAnswer: "F = 0: Sigma m(empty set) = Pi M(0, 1, 2, 3, 4, 5, 6, 7) | F = 1: Sigma m(0, 1, 2, 3, 4, 5, 6, 7) = Pi M(empty set)",
      keyTakeaway: "Empty sum = 0 and empty product = 1 ensure mathematical consistency for constant functions."
    }
  ]
};

export default dldSection23Data;
