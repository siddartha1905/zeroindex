/**
 * Digital Logic Design - Section 1.4: Binary Arithmetic
 * Addition, Subtraction, Multiplication & Division
 * 
 * Strict formatting: ZERO em-dashes and ZERO en-dashes.
 */

export const section14Data = {
  id: "1.4",
  number: "1.4",
  title: "Binary Arithmetic (Addition, Subtraction, Mul & Div)",
  badge: "ALU Operations",
  estimatedReadTime: "25 min read",
  dataScienceConnection: "Every matrix multiplication in PyTorch, gradient backpropagation step in TensorFlow, and floating-point computation in GPU CUDA cores breaks down into integer binary addition, subtraction, shift-and-add multiplication, and restoring division inside Arithmetic Logic Units (ALUs).",
  overview: "Binary arithmetic underpins every computation in a digital system. This section covers direct binary addition and subtraction rules, ripple carry propagation across bits, zero-bridge borrow mechanics, hardware shift-and-add multiplication, and restoring long division.",

  // ---------------------------------------------------------------------------
  // TAB 1: OVERVIEW & RULES
  // ---------------------------------------------------------------------------
  overviewRules: {
    heroTitle: "Universal Blueprint: How Base-2 Arithmetic Powers Computation",
    heroSubtitle: "Binary arithmetic follows the identical positional rules of familiar decimal math, but with a base of 2 instead of 10. Understanding carry generation and borrow propagation across bits is the bedrock of computer hardware design.",

    carryBorrowComparison: [
      {
        feature: "Carry Mechanism (Addition)",
        decimal: "When column sum >= 10, subtract 10 and generate Carry = +1 into the next left column (each carry is worth 10 units).",
        binary: "When column sum >= 2, subtract 2 and generate Carry = +1 into the next left column (each carry is worth 2 units = 10₂).",
        highlight: "1 + 1 = 2₁₀ = 10₂ -> Write 0, Carry 1 to next higher column"
      },
      {
        feature: "Borrow Mechanism (Subtraction)",
        decimal: "When top digit < bottom digit (e.g., 2 - 7), borrow 1 from the next left column. Borrowed digit adds 10 to current column (12 - 7 = 5).",
        binary: "When top bit < bottom bit (0 - 1), borrow 1 from the next left column. Borrowed bit adds 2₁₀ = 10₂ to current column (2 - 1 = 1).",
        highlight: "0 - 1 with Borrow 1 -> Borrow brings 10₂ (Decimal 2), so 2 - 1 = 1"
      }
    ],

    rulesTables: {
      addition: [
        { a: "0", b: "0", carryIn: "0", sum: "0", carryOut: "0", decimalCheck: "0 + 0 = 0", rule: "Trivial addition with no carry" },
        { a: "0", b: "1", carryIn: "0", sum: "1", carryOut: "0", decimalCheck: "0 + 1 = 1", rule: "Single 1 produces sum 1" },
        { a: "1", b: "0", carryIn: "0", sum: "1", carryOut: "0", decimalCheck: "1 + 0 = 1", rule: "Single 1 produces sum 1" },
        { a: "1", b: "1", carryIn: "0", sum: "0", carryOut: "1", decimalCheck: "1 + 1 = 2 = (10)₂", rule: "Two 1s generate sum 0 with carry 1" },
        { a: "1", b: "1", carryIn: "1", sum: "1", carryOut: "1", decimalCheck: "1 + 1 + 1 = 3 = (11)₂", rule: "Three 1s generate sum 1 with carry 1" }
      ],
      subtraction: [
        { a: "0", b: "0", diff: "0", borrow: "0", decimalCheck: "0 - 0 = 0", rule: "Zero minus zero produces zero" },
        { a: "1", b: "0", diff: "1", borrow: "0", decimalCheck: "1 - 0 = 1", rule: "One minus zero produces one without borrow" },
        { a: "1", b: "1", diff: "0", borrow: "0", decimalCheck: "1 - 1 = 0", rule: "One minus one cancels out to zero" },
        { a: "0", b: "1", diff: "1", borrow: "1", decimalCheck: "(2 - 1) = 1", rule: "Borrow 1 from left column; 10₂ - 1 = 1" }
      ],
      multiplication: [
        { a: "0", b: "0", product: "0", rule: "0 × 0 = 0 (Equivalent to logical AND)" },
        { a: "0", b: "1", product: "0", rule: "0 × 1 = 0 (Equivalent to logical AND)" },
        { a: "1", b: "0", product: "0", rule: "1 × 0 = 0 (Equivalent to logical AND)" },
        { a: "1", b: "1", product: "1", rule: "1 × 1 = 1 (Only case resulting in 1)" }
      ],
      division: [
        { expression: "0 / 1 = 0", rule: "Zero divided by one gives quotient 0 with remainder 0" },
        { expression: "1 / 1 = 1", rule: "One divided by one gives quotient 1 with remainder 0" },
        { expression: "N / 0 = Undefined", rule: "Division by zero is strictly prohibited in computer hardware" },
        { expression: "Slice >= Divisor", rule: "If dividend slice >= divisor, quotient bit is 1; subtract divisor. Otherwise quotient bit is 0." }
      ]
    }
  },

  // ---------------------------------------------------------------------------
  // TAB 2: 1.4A BINARY ADDITION (DEEP DIVE)
  // ---------------------------------------------------------------------------
  additionDeepDive: {
    title: "1.4A: Binary Addition & Multi-Carry Engine",
    subtitle: "Master ripple carry propagation, integer and fractional radix alignment, multi-operand addition, and non-decimal base addition.",

    coreCases: [
      { caseLabel: "Case 1", expr: "0 + 0", sum: "0", carry: "0", desc: "No bits set. Sum is 0, Carry is 0." },
      { caseLabel: "Case 2", expr: "0 + 1", sum: "1", carry: "0", desc: "One bit set. Sum is 1, Carry is 0." },
      { caseLabel: "Case 3", expr: "1 + 0", sum: "1", carry: "0", desc: "One bit set. Sum is 1, Carry is 0." },
      { caseLabel: "Case 4", expr: "1 + 1", sum: "0", carry: "1", desc: "Two 1s = 2₁₀ = (10)₂. Write 0 in current column, Carry 1 left." },
      { caseLabel: "Case 5", expr: "1 + 1 + 1", sum: "1", carry: "1", desc: "Three 1s = 3₁₀ = (11)₂. Write 1 in current column, Carry 1 left." }
    ],

    multiNumberRule: {
      title: "Universal Multi-Operand Addition Rule",
      step1: "Count the total number of 1s in the active column (including all operands and incoming carries).",
      step2: "Convert that decimal count into binary (e.g., 2 -> 10₂, 3 -> 11₂, 4 -> 100₂, 5 -> 101₂).",
      step3: "Write the LSB of that binary value as the Sum bit for the current column.",
      step4: "Pass the remaining higher bits as carries: bit 1 carries to column i+1, bit 2 carries to column i+2!"
    },

    models: [
      {
        id: "model-1a",
        filterTag: "integer",
        title: "Model 1A: Standard 6-Bit Integer Addition",
        subtitle: "Add two 6-bit binary numbers: (101101)₂ + (010110)₂",
        problem: "(101101)₂ + (010110)₂",
        op: "+",
        gridColumns: [
          { colId: "c6", colLabel: "b₆", carry: "1", a: " ", b: " ", res: "1" },
          { colId: "c5", colLabel: "b₅", carry: "1", a: "1", b: "0", res: "0" },
          { colId: "c4", colLabel: "b₄", carry: "1", a: "0", b: "1", res: "0" },
          { colId: "c3", colLabel: "b₃", carry: "1", a: "1", b: "0", res: "0" },
          { colId: "c2", colLabel: "b₂", carry: null, a: "1", b: "1", res: "0" },
          { colId: "c1", colLabel: "b₁", carry: null, a: "0", b: "1", res: "1" },
          { colId: "c0", colLabel: "b₀", carry: null, a: "1", b: "0", res: "1" }
        ],
        steps: [
          "Column b₀ (LSB): 1 + 0 = 1. Write Sum 1, Carry 0.",
          "Column b₁: 0 + 1 + 0 = 1. Write Sum 1, Carry 0.",
          "Column b₂: 1 + 1 + 0 = 2₁₀ = (10)₂. Write Sum 0, Carry 1 to b₃.",
          "Column b₃: 1 + 0 + 1 (carry) = 2₁₀ = (10)₂. Write Sum 0, Carry 1 to b₄.",
          "Column b₄: 0 + 1 + 1 (carry) = 2₁₀ = (10)₂. Write Sum 0, Carry 1 to b₅.",
          "Column b₅: 1 + 0 + 1 (carry) = 2₁₀ = (10)₂. Write Sum 0, Carry 1 to b₆.",
          "Column b₆ (Final Overflow Bit): 0 + 0 + 1 (carry) = 1. Write Sum 1."
        ],
        verification: "Decimal Check: 45 + 22 = 67. (1000011)₂ = 64 + 2 + 1 = 67. Perfectly verified!",
        result: "(1000011)₂"
      },
      {
        id: "model-1b",
        filterTag: "ripple",
        title: "Model 1B: Continuous Ripple Carry Propagation Across 1s",
        subtitle: "Add (11111)₂ + (01011)₂ with heavy ripple carries",
        problem: "(11111)₂ + (01011)₂",
        op: "+",
        gridColumns: [
          { colId: "c5", colLabel: "b₅", carry: "1", a: " ", b: " ", res: "1" },
          { colId: "c4", colLabel: "b₄", carry: "1", a: "1", b: "0", res: "0" },
          { colId: "c3", colLabel: "b₃", carry: "1", a: "1", b: "1", res: "1" },
          { colId: "c2", colLabel: "b₂", carry: "1", a: "1", b: "0", res: "0" },
          { colId: "c1", colLabel: "b₁", carry: "1", a: "1", b: "1", res: "1" },
          { colId: "c0", colLabel: "b₀", carry: null, a: "1", b: "1", res: "0" }
        ],
        steps: [
          "Column b₀: 1 + 1 = 2₁₀ = (10)₂. Write Sum 0, Carry 1 to b₁.",
          "Column b₁: 1 + 1 + 1 (carry) = 3₁₀ = (11)₂. Write Sum 1, Carry 1 to b₂.",
          "Column b₂: 1 + 0 + 1 (carry) = 2₁₀ = (10)₂. Write Sum 0, Carry 1 to b₃.",
          "Column b₃: 1 + 1 + 1 (carry) = 3₁₀ = (11)₂. Write Sum 1, Carry 1 to b₄.",
          "Column b₄: 1 + 0 + 1 (carry) = 2₁₀ = (10)₂. Write Sum 0, Carry 1 to b₅.",
          "Column b₅: 0 + 0 + 1 (carry) = 1. Write Sum 1."
        ],
        verification: "Decimal Check: 31 + 11 = 42. (101010)₂ = 32 + 8 + 2 = 42. Perfectly verified!",
        result: "(101010)₂"
      },
      {
        id: "model-1c",
        filterTag: "fractional",
        title: "Model 1C: Combined Integer & Fractional Binary Addition with Zero-Padding",
        subtitle: "Add (10110.101)₂ + (1101.11)₂ with Radix Alignment",
        problem: "(10110.101)₂ + (1101.11)₂",
        op: "+",
        gridColumns: [
          { colId: "c5", colLabel: "b₅", carry: "1", a: " ", b: " ", res: "1" },
          { colId: "c4", colLabel: "b₄", carry: "1", a: "1", b: "0", isPaddedB: true, res: "0" },
          { colId: "c3", colLabel: "b₃", carry: "1", a: "0", b: "1", res: "0" },
          { colId: "c2", colLabel: "b₂", carry: "1", a: "1", b: "1", res: "1" },
          { colId: "c1", colLabel: "b₁", carry: "1", a: "1", b: "0", res: "0" },
          { colId: "c0", colLabel: "b₀", carry: "1", a: "0", b: "1", res: "0" },
          { colId: "radix", colLabel: "·", isRadix: true },
          { colId: "cm1", colLabel: "b₋₁", carry: null, a: "1", b: "1", res: "0" },
          { colId: "cm2", colLabel: "b₋₂", carry: null, a: "0", b: "1", res: "1" },
          { colId: "cm3", colLabel: "b₋₃", carry: null, a: "1", b: "0", isPaddedB: true, res: "1" }
        ],
        steps: [
          "Zero-Padding: Pad operand B to 5 integer bits and 3 fractional bits: (01101.110)₂.",
          "Column b₋₃ (LSB): 1 + 0 = 1. Sum 1, Carry 0.",
          "Column b₋₂: 0 + 1 = 1. Sum 1, Carry 0.",
          "Column b₋₁: 1 + 1 = 2₁₀ = (10)₂. Sum 0, Carry 1 across the radix point to b₀.",
          "Column b₀: 0 + 1 + 1 (carry) = 2₁₀ = (10)₂. Sum 0, Carry 1 to b₁.",
          "Column b₁: 1 + 0 + 1 (carry) = 2₁₀ = (10)₂. Sum 0, Carry 1 to b₂.",
          "Column b₂: 1 + 1 + 1 (carry) = 3₁₀ = (11)₂. Sum 1, Carry 1 to b₃.",
          "Column b₃: 0 + 1 + 1 (carry) = 2₁₀ = (10)₂. Sum 0, Carry 1 to b₄.",
          "Column b₄: 1 + 0 (padded) + 1 (carry) = 2₁₀ = (10)₂. Sum 0, Carry 1 to b₅.",
          "Column b₅: 0 + 0 + 1 (carry) = 1. Write Sum 1."
        ],
        verification: "Decimal Check: 22.625 + 13.750 = 36.375. (100100.011)₂ = 32 + 4 + 0.25 + 0.125 = 36.375. Perfectly verified!",
        result: "(100100.011)₂"
      },
      {
        id: "model-1d",
        filterTag: "multi",
        title: "Model 1D: Adding 4 Binary Numbers Simultaneously",
        subtitle: "Add (1011)₂ + (1101)₂ + (1111)₂ + (1010)₂ using Multi-Column Carries",
        problem: "(1011)₂ + (1101)₂ + (1111)₂ + (1010)₂",
        multiOperands: [
          { label: "N1", bits: ["1", "0", "1", "1"] },
          { label: "N2", bits: ["1", "1", "0", "1"] },
          { label: "N3", bits: ["1", "1", "1", "1"] },
          { label: "N4", bits: ["1", "0", "1", "0"] }
        ],
        multiCarries: [
          { col: "b₀", count1s: "3", decSum: "3", binSum: "11", sumBit: "1", carryToNext: "1", carryToNext2: "0" },
          { col: "b₁", count1s: "3 + 1 (carry) = 4", decSum: "4", binSum: "100", sumBit: "0", carryToNext: "0", carryToNext2: "1" },
          { col: "b₂", count1s: "2 + 0 + 0 = 2", decSum: "2", binSum: "10", sumBit: "0", carryToNext: "1", carryToNext2: "0" },
          { col: "b₃", count1s: "4 + 1 + 1 (carry) = 6", decSum: "6", binSum: "110", sumBit: "0", carryToNext: "1", carryToNext2: "1" },
          { col: "b₄", count1s: "0 + 1 + 0 = 1", decSum: "1", binSum: "01", sumBit: "1", carryToNext: "0", carryToNext2: "0" },
          { col: "b₅", count1s: "0 + 0 + 1 (carry) = 1", decSum: "1", binSum: "01", sumBit: "1", carryToNext: "0", carryToNext2: "0" }
        ],
        steps: [
          "Column b₀: Count of 1s is 1 + 1 + 1 + 0 = 3₁₀ = (11)₂. Write Sum 1, Carry 1 to b₁.",
          "Column b₁: Count of 1s is 1 + 0 + 1 + 1 + 1 (carry) = 4₁₀ = (100)₂. Write Sum 0, Carry 0 to b₂, and Carry 1 to b₃ (worth 4)! That means Carry 1 jumps TWO columns left to b₃!",
          "Column b₂: 0 + 1 + 1 + 0 + 0 (from b₁) = 2₁₀ = (10)₂. Write Sum 0, Carry 1 to b₃.",
          "Column b₃: 1 + 1 + 1 + 1 + 1 (from b₂) + 1 (from b₁) = 6₁₀ = (110)₂. Write Sum 0, Carry 1 to b₄, Carry 1 to b₅.",
          "Column b₄: 0 + 1 = 1.",
          "Column b₅: 0 + 1 = 1.",
          "Total binary sum evaluates systematically to (110001)₂."
        ],
        verification: "Decimal Check: 11 + 13 + 15 + 10 = 49. (110001)₂ = 32 + 16 + 1 = 49. Verified!",
        result: "(110001)₂"
      },
      {
        id: "model-1e",
        filterTag: "otherBases",
        title: "Model 1E: Octal & Hexadecimal Direct Addition Bonus Model",
        subtitle: "Direct Base-8 (Modulo 8) and Base-16 (Modulo 16) Addition",
        problem: "Part 1: (754)₈ + (365)₈   |   Part 2: (5A9)₁₆ + (8B7)₁₆",
        octalExample: {
          problem: "(754)₈ + (365)₈",
          steps: [
            "Col 0: 4 + 5 = 9₁₀ -> 9 >= 8. Write 9 - 8 = 1, Carry 1 to Col 1.",
            "Col 1: 5 + 6 + 1 (carry) = 12₁₀ -> 12 >= 8. Write 12 - 8 = 4, Carry 1 to Col 2.",
            "Col 2: 7 + 3 + 1 (carry) = 11₁₀ -> 11 >= 8. Write 11 - 8 = 3, Carry 1 to Col 3.",
            "Col 3: 0 + 0 + 1 (carry) = 1.",
            "Result: (1341)₈"
          ],
          verification: "Decimal Check: 754₈ = 492₁₀, 365₈ = 245₁₀. 492 + 245 = 737₁₀. 1341₈ = 512 + 192 + 32 + 1 = 737₁₀. Correct!"
        },
        hexExample: {
          problem: "(5A9)₁₆ + (8B7)₁₆",
          steps: [
            "Col 0: 9 + 7 = 16₁₀ -> 16 >= 16. Write 16 - 16 = 0, Carry 1 to Col 1.",
            "Col 1: A (10) + B (11) + 1 (carry) = 22₁₀ -> 22 >= 16. Write 22 - 16 = 6, Carry 1 to Col 2.",
            "Col 2: 5 + 8 + 1 (carry) = 14₁₀ = E (since 14 < 16, no carry).",
            "Result: (E60)₁₆"
          ],
          verification: "Decimal Check: 5A9₁₆ = 1449₁₀, 8B7₁₆ = 2231₁₀. 1449 + 2231 = 3680₁₀. E60₁₆ = 3584 + 96 = 3680₁₀. Correct!"
        },
        result: "(1341)₈ and (E60)₁₆"
      }
    ],

    practiceQuestions: [
      {
        id: "p14a-1",
        difficulty: "Easy",
        examTag: "Direct Binary Addition",
        question: "Compute the binary sum of (11010)₂ + (01101)₂ and verify by converting to Base-10.",
        op: "+",
        result: "(100111)₂ = 39₁₀",
        verification: "26 + 13 = 39. (100111)₂ = 32 + 4 + 2 + 1 = 39.",
        gridColumns: [
          { colId: "c5", colLabel: "b₅", carry: "1", a: " ", b: " ", res: "1" },
          { colId: "c4", colLabel: "b₄", carry: "1", a: "1", b: "0", res: "0" },
          { colId: "c3", colLabel: "b₃", carry: null, a: "1", b: "1", res: "0" },
          { colId: "c2", colLabel: "b₂", carry: null, a: "0", b: "1", res: "1" },
          { colId: "c1", colLabel: "b₁", carry: null, a: "1", b: "0", res: "1" },
          { colId: "c0", colLabel: "b₀", carry: null, a: "0", b: "1", res: "1" }
        ],
        solution: "Align bits:\n  1 1 0 1 0 (26)\n+ 0 1 1 0 1 (13)\nCarries: 1 1 0 0 0\nSum:     1 0 0 1 1 1 (39)\nVerification: 26 + 13 = 39. (100111)₂ = 32 + 4 + 2 + 1 = 39."
      },
      {
        id: "p14a-2",
        difficulty: "Easy",
        examTag: "Multi-Operand 1s Counting",
        question: "Add (1110)₂ + (1011)₂ + (0111)₂ using the multi-operand 1s count method.",
        op: "+",
        result: "(100000)₂ = 32₁₀",
        verification: "14 + 11 + 7 = 32. Perfectly verified!",
        multiOperands: [
          { label: "N1", bits: ["1", "1", "1", "0"] },
          { label: "N2", bits: ["1", "0", "1", "1"] },
          { label: "N3", bits: ["0", "1", "1", "1"] }
        ],
        multiCarries: [
          { col: "b₀", count1s: "2", decSum: "2", binSum: "10", sumBit: "0", carryToNext: "1", carryToNext2: "0" },
          { col: "b₁", count1s: "3 + 1 = 4", decSum: "4", binSum: "100", sumBit: "0", carryToNext: "0", carryToNext2: "1" },
          { col: "b₂", count1s: "2 + 0 = 2", decSum: "2", binSum: "10", sumBit: "0", carryToNext: "1", carryToNext2: "0" },
          { col: "b₃", count1s: "2 + 1 + 1 = 4", decSum: "4", binSum: "100", sumBit: "0", carryToNext: "0", carryToNext2: "1" },
          { col: "b₄", count1s: "0 + 0 = 0", decSum: "0", binSum: "0", sumBit: "0", carryToNext: "1", carryToNext2: "0" },
          { col: "b₅", count1s: "0 + 1 = 1", decSum: "1", binSum: "1", sumBit: "1", carryToNext: "0", carryToNext2: "0" }
        ],
        solution: "Column b₀: 0 + 1 + 1 = 2₁₀ = (10)₂ -> Sum 0, Carry 1.\nColumn b₁: 1 + 1 + 1 + 1 (carry) = 4₁₀ = (100)₂ -> Sum 0, Carry 0 to b₂, Carry 1 to b₃!\nColumn b₂: 1 + 0 + 1 + 0 = 2₁₀ = (10)₂ -> Sum 0, Carry 1.\nColumn b₃: 1 + 1 + 0 + 1 (from b₂) + 1 (from b₁) = 4₁₀ = (100)₂ -> Sum 0, Carry 0 to b₄, Carry 1 to b₅.\nResult: (100000)₂ = (32)₁₀.\nCheck: 14 + 11 + 7 = 32."
      },
      {
        id: "p14a-3",
        difficulty: "Medium",
        examTag: "Fractional Radix Alignment",
        question: "Perform addition of fractional binary numbers: (101.11)₂ + (110.011)₂.",
        op: "+",
        result: "(1100.001)₂ = 12.125₁₀",
        verification: "5.75 + 6.375 = 12.125. Perfectly verified!",
        gridColumns: [
          { colId: "c3", colLabel: "b₃", carry: "1", a: " ", b: " ", res: "1" },
          { colId: "c2", colLabel: "b₂", carry: "1", a: "1", b: "1", res: "1" },
          { colId: "c1", colLabel: "b₁", carry: "1", a: "0", b: "1", res: "0" },
          { colId: "c0", colLabel: "b₀", carry: "1", a: "1", b: "0", res: "0" },
          { colId: "radix", colLabel: "·", isRadix: true },
          { colId: "cm1", colLabel: "b₋₁", carry: "1", a: "1", b: "0", res: "0" },
          { colId: "cm2", colLabel: "b₋₂", carry: null, a: "1", b: "1", res: "0" },
          { colId: "cm3", colLabel: "b₋₃", carry: null, a: "0", b: "1", isPaddedA: true, res: "1" }
        ],
        solution: "Pad (101.11)₂ to 3 fractional bits: (101.110)₂.\n  1 0 1 . 1 1 0 (5.75)\n+ 1 1 0 . 0 1 1 (6.375)\nCarries across point: 1 1 1 . 1 0 0\nSum: 1 1 0 0 . 0 0 1\nDecimal Check: 5.75 + 6.375 = 12.125. (1100.001)₂ = 8 + 4 + 0.125 = 12.125."
      },
      {
        id: "p14a-4",
        difficulty: "Medium",
        examTag: "Base-8 Direct Addition",
        question: "Find the sum of Octal numbers (752)₈ + (467)₈ directly in Base-8.",
        op: "+",
        result: "(1441)₈ = 801₁₀",
        verification: "752₈ = 490₁₀, 467₈ = 311₁₀ -> Sum = 801₁₀. 1441₈ = 801₁₀.",
        gridColumns: [
          { colId: "c3", colLabel: "Col 3", carry: "1", a: " ", b: " ", res: "1" },
          { colId: "c2", colLabel: "Col 2", carry: "1", a: "7", b: "4", res: "4" },
          { colId: "c1", colLabel: "Col 1", carry: "1", a: "5", b: "6", res: "4" },
          { colId: "c0", colLabel: "Col 0", carry: null, a: "2", b: "7", res: "1" }
        ],
        solution: "Col 0: 2 + 7 = 9₁₀ -> 9 - 8 = 1 with Carry 1.\nCol 1: 5 + 6 + 1 = 12₁₀ -> 12 - 8 = 4 with Carry 1.\nCol 2: 7 + 4 + 1 = 12₁₀ -> 12 - 8 = 4 with Carry 1.\nCol 3: Carry 1.\nResult: (1441)₈.\nCheck: 752₈ = 490₁₀, 467₈ = 311₁₀ -> Sum = 801₁₀. 1441₈ = 512 + 256 + 32 + 1 = 801₁₀."
      },
      {
        id: "p14a-5",
        difficulty: "Hard",
        examTag: "Base-16 Direct Addition",
        question: "Add Hexadecimal numbers (3FA.8)₁₆ + (8C9.C)₁₆ directly in Base-16.",
        op: "+",
        result: "(CC4.4)₁₆ = 3268.25₁₀",
        verification: "1018.5 + 2249.75 = 3268.25. CC4.4₁₆ = 3268.25. Verified!",
        gridColumns: [
          { colId: "c2", colLabel: "Col 2", carry: "1", a: "3", b: "8", res: "C" },
          { colId: "c1", colLabel: "Col 1", carry: "1", a: "F", b: "C", res: "C" },
          { colId: "c0", colLabel: "Col 0", carry: "1", a: "A", b: "9", res: "4" },
          { colId: "radix", colLabel: "·", isRadix: true },
          { colId: "cm1", colLabel: "Col -1", carry: null, a: "8", b: "C", res: "4" }
        ],
        solution: "Fraction: 8 + C (12) = 20₁₀ -> 20 - 16 = 4 with Carry 1 to integer part.\nCol 0: A (10) + 9 + 1 = 20₁₀ -> 20 - 16 = 4 with Carry 1.\nCol 1: F (15) + C (12) + 1 = 28₁₀ -> 28 - 16 = 12 (C) with Carry 1.\nCol 2: 3 + 8 + 1 = 12 (C) with Carry 0.\nResult: (CC4.4)₁₆."
      },
      {
        id: "p14a-6",
        difficulty: "Hard",
        examTag: "5-Operand Ripple Adder",
        question: "Compute the sum of 5 binary numbers: 1111₂ + 1110₂ + 1101₂ + 1011₂ + 1001₂.",
        op: "+",
        result: "(111110)₂ = (62)₁₀",
        verification: "15 + 14 + 13 + 11 + 9 = 62. Verified!",
        multiOperands: [
          { label: "N1", bits: ["1", "1", "1", "1"] },
          { label: "N2", bits: ["1", "1", "1", "0"] },
          { label: "N3", bits: ["1", "1", "0", "1"] },
          { label: "N4", bits: ["1", "0", "1", "1"] },
          { label: "N5", bits: ["1", "0", "0", "1"] }
        ],
        multiCarries: [
          { col: "b₀", count1s: "4", decSum: "4", binSum: "100", sumBit: "0", carryToNext: "0", carryToNext2: "1" },
          { col: "b₁", count1s: "3 + 0 = 3", decSum: "3", binSum: "11", sumBit: "1", carryToNext: "1", carryToNext2: "0" },
          { col: "b₂", count1s: "3 + 1 + 1 = 5", decSum: "5", binSum: "101", sumBit: "1", carryToNext: "0", carryToNext2: "1" },
          { col: "b₃", count1s: "5 + 0 = 5", decSum: "5", binSum: "101", sumBit: "1", carryToNext: "0", carryToNext2: "1" },
          { col: "b₄", count1s: "0 + 1 = 1", decSum: "1", binSum: "1", sumBit: "1", carryToNext: "0", carryToNext2: "0" },
          { col: "b₅", count1s: "0 + 1 = 1", decSum: "1", binSum: "1", sumBit: "1", carryToNext: "0", carryToNext2: "0" }
        ],
        solution: "Col b₀: 1 + 0 + 1 + 1 + 1 = 4₁₀ = 100₂ -> Sum 0, Carry 0 to b₁, Carry 1 to b₂.\nCol b₁: 1 + 1 + 0 + 1 + 0 + 0 = 3₁₀ = 11₂ -> Sum 1, Carry 1 to b₂.\nCol b₂: 1 + 1 + 1 + 0 + 0 + 1 (from b₀) + 1 (from b₁) = 5₁₀ = 101₂ -> Sum 1, Carry 0 to b₃, Carry 1 to b₄.\nCol b₃: 1 + 1 + 1 + 1 + 1 + 0 = 5₁₀ = 101₂ -> Sum 1, Carry 0 to b₄, Carry 1 to b₅.\nCol b₄: 0 + 1 (from b₂) + 0 (from b₃) = 1 -> Sum 1.\nCol b₅: 0 + 1 (from b₃) = 1 -> Sum 1.\nResult: (111110)₂ = (62)₁₀.\nCheck: 15 + 14 + 13 + 11 + 9 = 62. Verified!"
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // TAB 3: 1.4B DIRECT BINARY SUBTRACTION (DEEP DIVE)
  // ---------------------------------------------------------------------------
  subtractionDeepDive: {
    title: "1.4B: Direct Binary Subtraction & Zero-Bridge Borrowing",
    subtitle: "Master single borrows, zero-bridge propagation across consecutive 0s, fractional subtraction, subtrahend > minuend, and base-8 / base-16 subtraction.",

    borrowMechanicsBlueprint: {
      coreRule: "When subtracting 0 - 1, a borrow of 1 is required from the nearest non-zero column to the left.",
      valueAdded: "Borrowing 1 from position 2^(k+1) brings 2₁₀ = (10)₂ into position 2^k. The subtraction then becomes (10)₂ - 1 = 2₁₀ - 1 = 1.",
      zeroBridgeRule: [
        "1. Identify the nearest 1 to the left. Cross it out and change it to 0.",
        "2. Every intermediate 0 that was crossed over turns into 1 (because it received 2 and immediately gave away 1).",
        "3. The final destination bit (where the borrow was needed) receives 10₂ (Decimal 2).",
        "4. Perform the subtraction at the destination: 2 - 1 = 1."
      ]
    },

    models: [
      {
        id: "model-2a",
        filterTag: "singleBorrow",
        title: "Model 2A: Standard Integer Subtraction with Single Borrow",
        subtitle: "Subtract (110101)₂ - (101010)₂",
        problem: "(110101)₂ - (101010)₂",
        op: "-",
        gridColumns: [
          { colId: "c5", colLabel: "b₅", borrow: null, a: "1", b: "1", res: "0" },
          { colId: "c4", colLabel: "b₄", borrow: { original: "1", crossed: true, current: "0" }, a: "1", b: "0", res: "0" },
          { colId: "c3", colLabel: "b₃", borrow: { original: "0", crossed: true, current: "10₂" }, a: "0", b: "1", res: "1" },
          { colId: "c2", colLabel: "b₂", borrow: { original: "1", crossed: true, current: "0" }, a: "1", b: "0", res: "0" },
          { colId: "c1", colLabel: "b₁", borrow: { original: "0", crossed: true, current: "10₂" }, a: "0", b: "1", res: "1" },
          { colId: "c0", colLabel: "b₀", borrow: null, a: "1", b: "0", res: "1" }
        ],
        steps: [
          "Column b₀ (LSB): 1 - 0 = 1. No borrow needed.",
          "Column b₁: 0 - 1 cannot proceed. Borrow 1 from b₂. The bit at b₂ becomes 0. The current bit at b₁ becomes 10₂ (2₁₀). 2 - 1 = 1.",
          "Column b₂: Remaining bit is 0. 0 - 0 = 0.",
          "Column b₃: 0 - 1 cannot proceed. Borrow 1 from b₄. Bit at b₄ becomes 0. Bit at b₃ becomes 10₂ (2₁₀). 2 - 1 = 1.",
          "Column b₄: Remaining bit is 0. 0 - 0 = 0.",
          "Column b₅ (MSB): 1 - 1 = 0."
        ],
        verification: "Decimal Check: 53 - 42 = 11. (001011)₂ = 8 + 2 + 1 = 11. Perfectly verified!",
        result: "(001011)₂ = (1011)₂"
      },
      {
        id: "model-2b",
        filterTag: "zeroBridge",
        title: "Model 2B: Borrowing Across Multiple Consecutive Zeros (Zero-Bridge)",
        subtitle: "Subtract (10000)₂ - (00101)₂ and (101000)₂ - (011011)₂",
        problem: "Case 1: (10000)₂ - (00101)₂   |   Case 2: (101000)₂ - (011011)₂",
        op: "-",
        gridColumns: [
          { colId: "c4", colLabel: "b₄", borrow: { original: "1", crossed: true, current: "0" }, a: "1", b: "0", res: "0" },
          { colId: "c3", colLabel: "b₃", borrow: { original: "0", crossed: true, current: "1" }, a: "0", b: "0", res: "1" },
          { colId: "c2", colLabel: "b₂", borrow: { original: "0", crossed: true, current: "1" }, a: "0", b: "1", res: "0" },
          { colId: "c1", colLabel: "b₁", borrow: { original: "0", crossed: true, current: "1" }, a: "0", b: "0", res: "1" },
          { colId: "c0", colLabel: "b₀", borrow: { original: "0", crossed: true, current: "10₂" }, a: "0", b: "1", res: "1" }
        ],
        steps: [
          "Zero-Bridge Walkthrough on (10000)₂ - (00101)₂:",
          "At b₀, we need 0 - 1. We must look left for the nearest 1, which is all the way at b₄!",
          "Cross out the 1 at b₄ -> it becomes 0.",
          "Every intermediate zero crossed over (b₃, b₂, b₁) turns into 1.",
          "The target bit at b₀ receives 10₂ (Decimal 2).",
          "Now execute column subtractions effortlessly:",
          "b₀: 2 - 1 = 1.",
          "b₁: 1 - 0 = 1.",
          "b₂: 1 - 1 = 0.",
          "b₃: 1 - 0 = 1.",
          "b₄: 0 - 0 = 0."
        ],
        verification: "Decimal Check: 16 - 5 = 11. (01011)₂ = 8 + 2 + 1 = 11. Case 2: 40 - 27 = 13 = (001101)₂. Verified!",
        result: "(01011)₂ and (001101)₂"
      },
      {
        id: "model-2c",
        filterTag: "fractional",
        title: "Model 2C: Combined Integer & Fractional Binary Subtraction with Zero-Padding",
        subtitle: "Subtract (10100.01)₂ - (01011.101)₂",
        problem: "(10100.01)₂ - (01011.101)₂",
        op: "-",
        gridColumns: [
          { colId: "c4", colLabel: "b₄", borrow: { original: "1", crossed: true, current: "0" }, a: "1", b: "0", res: "0" },
          { colId: "c3", colLabel: "b₃", borrow: { original: "0", crossed: true, current: "10₂" }, a: "0", b: "1", res: "1" },
          { colId: "c2", colLabel: "b₂", borrow: { original: "1", crossed: true, current: "0" }, a: "1", b: "0", res: "0" },
          { colId: "c1", colLabel: "b₁", borrow: { original: "0", crossed: true, current: "1" }, a: "0", b: "1", res: "0" },
          { colId: "c0", colLabel: "b₀", borrow: { original: "0", crossed: true, current: "1" }, a: "0", b: "1", res: "0" },
          { colId: "radix", colLabel: "·", isRadix: true },
          { colId: "cm1", colLabel: "b₋₁", borrow: { original: "0", crossed: true, current: "10₂" }, a: "0", b: "1", res: "1" },
          { colId: "cm2", colLabel: "b₋₂", borrow: { original: "1", crossed: true, current: "0" }, a: "1", b: "0", res: "0" },
          { colId: "cm3", colLabel: "b₋₃", borrow: { original: "0", crossed: true, current: "10₂" }, a: "0", b: "1", isPaddedA: true, res: "1" }
        ],
        steps: [
          "Step 1: Pad operand A with a trailing zero: (10100.01)₂ -> (10100.010)₂ to match 3 fractional bits.",
          "Step 2: At b₋₃, we need 0 - 1. Borrow 1 from b₋₂ (which has 1). b₋₂ becomes 0, and b₋₃ becomes 10₂ (2). 2 - 1 = 1.",
          "Step 3: At b₋₂, remaining bit is 0. 0 - 0 = 0.",
          "Step 4: At b₋₁, we need 0 - 1. Nearest 1 to the left is at b₂! Zero-bridge applies across b₀ and b₁.",
          "Executing through all columns yields: (01000.101)₂."
        ],
        verification: "Decimal Check: 20.250 - 11.625 = 8.625. (01000.101)₂ = 8 + 0.5 + 0.125 = 8.625. Perfectly verified!",
        result: "(01000.101)₂"
      },
      {
        id: "model-2d",
        filterTag: "negative",
        title: "Model 2D: Direct Subtraction When Subtrahend > Minuend (A < B)",
        subtitle: "Subtract (10010)₂ - (11011)₂ to handle negative results",
        problem: "Evaluate |B - A|: (11011)₂ - (10010)₂",
        op: "-",
        gridColumns: [
          { colId: "c4", colLabel: "b₄", borrow: null, a: "1", b: "1", res: "0" },
          { colId: "c3", colLabel: "b₃", borrow: null, a: "1", b: "0", res: "1" },
          { colId: "c2", colLabel: "b₂", borrow: null, a: "0", b: "0", res: "0" },
          { colId: "c1", colLabel: "b₁", borrow: null, a: "1", b: "1", res: "0" },
          { colId: "c0", colLabel: "b₀", borrow: null, a: "1", b: "0", res: "1" }
        ],
        steps: [
          "Comparison Rule: A = (10010)₂ = 18₁₀. B = (11011)₂ = 27₁₀. Since A < B, the result is negative.",
          "Formula: (A - B) = -(B - A).",
          "Compute (B - A) directly:\n   1 1 0 1 1  (27)\n - 1 0 0 1 0  (18)\n-------------\n   0 1 0 0 1  (9)",
          "Attach the negative sign to the result: -(01001)₂ = -(9)₁₀.",
          "Hardware note: In computer systems, negative numbers are never stored with a separate minus symbol; Section 1.5 (Complements) and Section 1.6 (Signed 2's Complement) automate this entirely in hardware."
        ],
        verification: "Decimal Check: 18 - 27 = -9. -(01001)₂ = -(8 + 1) = -9. Perfectly verified!",
        result: "-(01001)₂ = -9₁₀"
      },
      {
        id: "model-2e",
        filterTag: "otherBases",
        title: "Model 2E: Octal & Hexadecimal Direct Subtraction Bonus Model",
        subtitle: "Direct Base-8 (Borrow 8) and Base-16 (Borrow 16) Subtraction",
        problem: "Part 1: (623)₈ - (256)₈   |   Part 2: (9B4)₁₆ - (4E8)₁₆",
        octalExample: {
          problem: "(623)₈ - (256)₈",
          steps: [
            "Col 0: 3 - 6 cannot proceed. Borrow 1 from Col 1 (digit 2 becomes 1). Borrow adds 8 to current digit! Current digit = 3 + 8 = 11. 11 - 6 = 5.",
            "Col 1: Remaining digit 1 - 5 cannot proceed. Borrow 1 from Col 2 (digit 6 becomes 5). Current digit = 1 + 8 = 9. 9 - 5 = 4.",
            "Col 2: Remaining digit 5 - 2 = 3.",
            "Result: (345)₈"
          ],
          verification: "Decimal Check: 623₈ = 403₁₀, 256₈ = 174₁₀. 403 - 174 = 229₁₀. 345₈ = 192 + 32 + 5 = 229₁₀. Correct!"
        },
        hexExample: {
          problem: "(9B4)₁₆ - (4E8)₁₆",
          steps: [
            "Col 0: 4 - 8 cannot proceed. Borrow 1 from Col 1 (B becomes A = 10). Borrow adds 16 to current digit! 4 + 16 = 20. 20 - 8 = 12 (C).",
            "Col 1: Remaining digit A (10) - E (14) cannot proceed. Borrow 1 from Col 2 (9 becomes 8). Current digit = 10 + 16 = 26. 26 - 14 = 12 (C).",
            "Col 2: Remaining digit 8 - 4 = 4.",
            "Result: (4CC)₁₆"
          ],
          verification: "Decimal Check: 9B4₁₆ = 2484₁₀, 4E8₁₆ = 1256₁₀. 2484 - 1256 = 1228₁₀. 4CC₁₆ = 1024 + 192 + 12 = 1228₁₀. Correct!"
        },
        result: "(345)₈ and (4CC)₁₆"
      }
    ],

    practiceQuestions: [
      {
        id: "p14b-1",
        difficulty: "Easy",
        examTag: "Single Column Borrow",
        question: "Subtract (11101)₂ - (10011)₂ directly and verify in Base-10.",
        op: "-",
        result: "(01010)₂ = (10)₁₀",
        verification: "29 - 19 = 10. Verified!",
        gridColumns: [
          { colId: "c4", colLabel: "b₄", borrow: null, a: "1", b: "1", res: "0" },
          { colId: "c3", colLabel: "b₃", borrow: null, a: "1", b: "0", res: "1" },
          { colId: "c2", colLabel: "b₂", borrow: { original: "1", crossed: true, current: "0" }, a: "1", b: "0", res: "0" },
          { colId: "c1", colLabel: "b₁", borrow: { original: "0", crossed: true, current: "10₂" }, a: "0", b: "1", res: "1" },
          { colId: "c0", colLabel: "b₀", borrow: null, a: "1", b: "1", res: "0" }
        ],
        solution: "Align:\n  1 1 1 0 1 (29)\n- 1 0 0 1 1 (19)\nBorrow at b₁: b₂ becomes 0, b₁ becomes 10₂ (2). 2 - 1 = 1.\nResult: (01010)₂ = (10)₁₀.\nCheck: 29 - 19 = 10."
      },
      {
        id: "p14b-2",
        difficulty: "Easy",
        examTag: "Zero-Bridge Borrow Rule",
        question: "Evaluate (1000)₂ - (0011)₂ using the Zero-Bridge rule.",
        op: "-",
        result: "(0101)₂ = (5)₁₀",
        verification: "8 - 3 = 5. Verified!",
        gridColumns: [
          { colId: "c3", colLabel: "b₃", borrow: { original: "1", crossed: true, current: "0" }, a: "1", b: "0", res: "0" },
          { colId: "c2", colLabel: "b₂", borrow: { original: "0", crossed: true, current: "1" }, a: "0", b: "0", res: "1" },
          { colId: "c1", colLabel: "b₁", borrow: { original: "0", crossed: true, current: "1" }, a: "0", b: "1", res: "0" },
          { colId: "c0", colLabel: "b₀", borrow: { original: "0", crossed: true, current: "10₂" }, a: "0", b: "1", res: "1" }
        ],
        solution: "At b₀, need 0 - 1. Nearest 1 is at b₃. Cross out b₃ (becomes 0). Intermediate bits b₂, b₁ become 1. Destination b₀ becomes 2.\nb₀: 2 - 1 = 1\nb₁: 1 - 1 = 0\nb₂: 1 - 0 = 1\nb₃: 0 - 0 = 0\nResult: (0101)₂ = (5)₁₀. Check: 8 - 3 = 5."
      },
      {
        id: "p14b-3",
        difficulty: "Medium",
        examTag: "Fractional Radix Alignment",
        question: "Compute (11000.1)₂ - (10011.01)₂ with fractional alignment.",
        op: "-",
        result: "(00101.01)₂ = 5.25₁₀",
        verification: "24.5 - 19.25 = 5.25. Verified!",
        gridColumns: [
          { colId: "c4", colLabel: "b₄", borrow: null, a: "1", b: "1", res: "0" },
          { colId: "c3", colLabel: "b₃", borrow: { original: "1", crossed: true, current: "0" }, a: "1", b: "0", res: "0" },
          { colId: "c2", colLabel: "b₂", borrow: { original: "0", crossed: true, current: "1" }, a: "0", b: "0", res: "1" },
          { colId: "c1", colLabel: "b₁", borrow: { original: "0", crossed: true, current: "1" }, a: "0", b: "1", res: "0" },
          { colId: "c0", colLabel: "b₀", borrow: { original: "0", crossed: true, current: "1" }, a: "0", b: "1", res: "1" },
          { colId: "radix", colLabel: "·", isRadix: true },
          { colId: "cm1", colLabel: "b₋₁", borrow: { original: "1", crossed: true, current: "0" }, a: "1", b: "0", res: "0" },
          { colId: "cm2", colLabel: "b₋₂", borrow: { original: "0", crossed: true, current: "10₂" }, a: "0", b: "1", isPaddedA: true, res: "1" }
        ],
        solution: "Pad top number to 2 fractional digits: (11000.10)₂.\n  1 1 0 0 0 . 1 0 (24.5)\n- 1 0 0 1 1 . 0 1 (19.25)\nBorrow from b₋₁ (becomes 0), b₋₂ becomes 2: 2 - 1 = 1.\nFractional part: .01.\nInteger part: 24 - 19 = 5 -> (00101)₂.\nResult: (00101.01)₂ = 5.25₁₀. Check: 24.5 - 19.25 = 5.25."
      },
      {
        id: "p14b-4",
        difficulty: "Medium",
        examTag: "Minuend < Subtrahend",
        question: "Perform direct subtraction where Minuend < Subtrahend: (10101)₂ - (11100)₂.",
        op: "-",
        result: "-(00111)₂ = -(7)₁₀",
        verification: "21 - 28 = -7. Verified!",
        gridColumns: [
          { colId: "c4", colLabel: "b₄", borrow: null, a: "1", b: "1", res: "0" },
          { colId: "c3", colLabel: "b₃", borrow: { original: "1", crossed: true, current: "0" }, a: "1", b: "0", res: "0" },
          { colId: "c2", colLabel: "b₂", borrow: { original: "1", crossed: true, current: "0" }, a: "1", b: "1", res: "1" },
          { colId: "c1", colLabel: "b₁", borrow: { original: "0", crossed: true, current: "1" }, a: "0", b: "0", res: "1" },
          { colId: "c0", colLabel: "b₀", borrow: { original: "0", crossed: true, current: "10₂" }, a: "0", b: "1", res: "1" }
        ],
        solution: "A = 21₁₀, B = 28₁₀. Since A < B, result is -(B - A).\n  1 1 1 0 0 (28)\n- 1 0 1 0 1 (21)\n-------------\n  0 0 1 1 1 (7)\nResult: -(00111)₂ = -(7)₁₀."
      },
      {
        id: "p14b-5",
        difficulty: "Hard",
        examTag: "Base-8 Direct Subtraction",
        question: "Subtract Octal numbers (532)₈ - (274)₈ directly.",
        op: "-",
        result: "(236)₈ = 158₁₀",
        verification: "346 - 188 = 158. 236₈ = 158. Verified!",
        gridColumns: [
          { colId: "c2", colLabel: "Col 2", borrow: { original: "5", crossed: true, current: "4" }, a: "5", b: "2", res: "2" },
          { colId: "c1", colLabel: "Col 1", borrow: { original: "3", crossed: true, current: "10" }, a: "3", b: "7", res: "3" },
          { colId: "c0", colLabel: "Col 0", borrow: { original: "2", crossed: true, current: "10" }, a: "2", b: "4", res: "6" }
        ],
        solution: "Col 0: 2 - 4 cannot proceed. Borrow 8 from 3 (becomes 2): 2 + 8 = 10. 10 - 4 = 6.\nCol 1: 2 - 7 cannot proceed. Borrow 8 from 5 (becomes 4): 2 + 8 = 10. 10 - 7 = 3.\nCol 2: 4 - 2 = 2.\nResult: (236)₈.\nCheck: 532₈ = 346₁₀, 274₈ = 188₁₀. 346 - 188 = 158₁₀. 236₈ = 128 + 24 + 6 = 158₁₀."
      },
      {
        id: "p14b-6",
        difficulty: "Hard",
        examTag: "Base-16 Borrow Propagation",
        question: "Subtract Hexadecimal numbers (A05)₁₆ - (3D8)₁₆ using direct borrow.",
        op: "-",
        result: "(62D)₁₆ = 1581₁₀",
        verification: "2565 - 984 = 1581. 62D₁₆ = 1581. Verified!",
        gridColumns: [
          { colId: "c2", colLabel: "Col 2", borrow: { original: "A", crossed: true, current: "9" }, a: "A", b: "3", res: "6" },
          { colId: "c1", colLabel: "Col 1", borrow: { original: "0", crossed: true, current: "F" }, a: "0", b: "D", res: "2" },
          { colId: "c0", colLabel: "Col 0", borrow: { original: "5", crossed: true, current: "21" }, a: "5", b: "8", res: "D" }
        ],
        solution: "Col 0: 5 - 8 cannot proceed. Nearest non-zero digit is A at Col 2!\nCross out A (becomes 9). Intermediate Col 1 (0) becomes F (15). Col 0 receives 16 + 5 = 21. 21 - 8 = 13 (D).\nCol 1: 15 - D (13) = 2.\nCol 2: 9 - 3 = 6.\nResult: (62D)₁₆.\nCheck: A05₁₆ = 2565₁₀, 3D8₁₆ = 984₁₀. 2565 - 984 = 1581₁₀. 62D₁₆ = 1536 + 32 + 13 = 1581₁₀."
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // TAB 4: 1.4C MULTIPLICATION & DIVISION (GRAPHICAL MATRIX & LADDER)
  // ---------------------------------------------------------------------------
  mulDivGuide: {
    title: "1.4C: Binary Multiplication & Division",
    subtitle: "Hardware shift-and-add visual matrix and restoring long division ladder mechanics.",

    multiplication: {
      concept: "Binary multiplication uses the Hardware Shift-and-Add algorithm. Each multiplier bit b_k either copies the multiplicand shifted left by k positions (if bit is 1) or writes all zeros (if bit is 0).",
      blueprint: {
        title: "The 2 Core Shift-and-Add Multiplication Rules",
        rule1: "If Multiplier bit = 1: Copy the Multiplicand shifted left by that bit position k (append k zeros to the right).",
        rule2: "If Multiplier bit = 0: Write a row of all zeros shifted left by k positions.",
        hardwareNote: "Modern CPU ALUs use an Accumulator register, a Shift Register, and an Adder to compute products efficiently in hardware without massive look-up tables."
      },
      models: [
        {
          id: "ex-3a",
          title: "Example 3A: 4-Bit × 4-Bit Integer Multiplication",
          subtitle: "Multiply (1101)₂ × (1011)₂ using the Shift-and-Add Matrix",
          problem: "(1101)₂ × (1011)₂",
          colHeaders: ["b₇", "b₆", "b₅", "b₄", "b₃", "b₂", "b₁", "b₀"],
          operands: {
            a: { label: "Multiplicand (A = 13₁₀)", bits: [" ", " ", " ", " ", "1", "1", "0", "1"] },
            b: { label: "Multiplier (B = 11₁₀)", bits: [" ", " ", " ", " ", "1", "0", "1", "1"] }
          },
          rows: [
            {
              bitLabel: "b₀ = 1",
              shift: 0,
              callout: "× b₀ (1) → Copy A (No shift)",
              cells: [
                { val: " ", isPad: false },
                { val: " ", isPad: false },
                { val: " ", isPad: false },
                { val: " ", isPad: false },
                { val: "1", isBit: true },
                { val: "1", isBit: true },
                { val: "0", isBit: true },
                { val: "1", isBit: true }
              ]
            },
            {
              bitLabel: "b₁ = 1",
              shift: 1,
              callout: "× b₁ (1) → Copy A (Shift Left 1 ←)",
              cells: [
                { val: " ", isPad: false },
                { val: " ", isPad: false },
                { val: " ", isPad: false },
                { val: "1", isBit: true },
                { val: "1", isBit: true },
                { val: "0", isBit: true },
                { val: "1", isBit: true },
                { val: "0", isShiftZero: true }
              ]
            },
            {
              bitLabel: "b₂ = 0",
              shift: 2,
              callout: "× b₂ (0) → All 0s (Shift Left 2 ←←)",
              cells: [
                { val: " ", isPad: false },
                { val: " ", isPad: false },
                { val: "0", isBit: true },
                { val: "0", isBit: true },
                { val: "0", isBit: true },
                { val: "0", isBit: true },
                { val: "0", isShiftZero: true },
                { val: "0", isShiftZero: true }
              ]
            },
            {
              bitLabel: "b₃ = 1",
              shift: 3,
              callout: "× b₃ (1) → Copy A (Shift Left 3 ←←←)",
              cells: [
                { val: " ", isPad: false },
                { val: "1", isBit: true },
                { val: "1", isBit: true },
                { val: "0", isBit: true },
                { val: "1", isBit: true },
                { val: "0", isShiftZero: true },
                { val: "0", isShiftZero: true },
                { val: "0", isShiftZero: true }
              ]
            }
          ],
          finalSum: {
            label: "Final Product",
            bits: ["1", "0", "0", "0", "1", "1", "1", "1"],
            val: "(10001111)₂ = 143₁₀"
          },
          verification: "Decimal Check: 13 × 11 = 143. (10001111)₂ = 128 + 8 + 4 + 2 + 1 = 143. Perfectly verified!",
          steps: [
            "Multiplier bit b₀ = 1: Write Multiplicand (1101) directly (Shift 0).",
            "Multiplier bit b₁ = 1: Shift Multiplicand left 1 place -> (11010).",
            "Multiplier bit b₂ = 0: All zeros shifted 2 places -> (000000).",
            "Multiplier bit b₃ = 1: Shift Multiplicand left 3 places -> (1101000).",
            "Add all 4 partial products in binary: 1101 + 11010 + 000000 + 1101000 = (10001111)₂."
          ]
        },
        {
          id: "ex-3b",
          title: "Example 3B: Multiplier Containing Zeros",
          subtitle: "Multiply (10110)₂ × (101)₂ with Zero-Optimization",
          problem: "(10110)₂ × (101)₂",
          colHeaders: ["b₆", "b₅", "b₄", "b₃", "b₂", "b₁", "b₀"],
          operands: {
            a: { label: "Multiplicand (A = 22₁₀)", bits: [" ", " ", "1", "0", "1", "1", "0"] },
            b: { label: "Multiplier (B = 5₁₀)", bits: [" ", " ", " ", " ", "1", "0", "1"] }
          },
          rows: [
            {
              bitLabel: "b₀ = 1",
              shift: 0,
              callout: "× b₀ (1) → Copy A (No shift)",
              cells: [
                { val: " ", isPad: false },
                { val: " ", isPad: false },
                { val: "1", isBit: true },
                { val: "0", isBit: true },
                { val: "1", isBit: true },
                { val: "1", isBit: true },
                { val: "0", isBit: true }
              ]
            },
            {
              bitLabel: "b₁ = 0",
              shift: 1,
              callout: "× b₁ (0) → All 0s (Shift Left 1 ←)",
              cells: [
                { val: " ", isPad: false },
                { val: "0", isBit: true },
                { val: "0", isBit: true },
                { val: "0", isBit: true },
                { val: "0", isBit: true },
                { val: "0", isBit: true },
                { val: "0", isShiftZero: true }
              ]
            },
            {
              bitLabel: "b₂ = 1",
              shift: 2,
              callout: "× b₂ (1) → Copy A (Shift Left 2 ←←)",
              cells: [
                { val: "1", isBit: true },
                { val: "0", isBit: true },
                { val: "1", isBit: true },
                { val: "1", isBit: true },
                { val: "0", isBit: true },
                { val: "0", isShiftZero: true },
                { val: "0", isShiftZero: true }
              ]
            }
          ],
          finalSum: {
            label: "Final Product",
            bits: ["1", "1", "0", "1", "1", "1", "0"],
            val: "(1101110)₂ = 110₁₀"
          },
          verification: "Decimal Check: 22 × 5 = 110. (1101110)₂ = 64 + 32 + 8 + 4 + 2 = 110. Perfectly verified!",
          steps: [
            "Multiplier bit b₀ = 1: Copy 10110.",
            "Multiplier bit b₁ = 0: All zeros shifted 1 position (000000).",
            "Multiplier bit b₂ = 1: Copy 10110 shifted 2 positions -> 1011000.",
            "Sum partial products: 0010110 + 1011000 = (1101110)₂ = 110₁₀."
          ]
        },
        {
          id: "ex-3c",
          title: "Example 3C: Fractional Binary Multiplication",
          subtitle: "Multiply (101.1)₂ × (11.01)₂ using Radix Counting",
          problem: "(101.1)₂ × (11.01)₂",
          colHeaders: ["b₇", "b₆", "b₅", "b₄", "b₃", "b₂", "b₁", "b₀"],
          operands: {
            a: { label: "Multiplicand (101.1, 1 frac bit)", bits: [" ", " ", " ", " ", "1", "0", "1", "1"] },
            b: { label: "Multiplier (11.01, 2 frac bits)", bits: [" ", " ", " ", " ", "1", "1", "0", "1"] }
          },
          rows: [
            {
              bitLabel: "b₀ = 1",
              shift: 0,
              callout: "× b₀ (1) → Copy 1011 (No shift)",
              cells: [
                { val: " ", isPad: false },
                { val: " ", isPad: false },
                { val: " ", isPad: false },
                { val: " ", isPad: false },
                { val: "1", isBit: true },
                { val: "0", isBit: true },
                { val: "1", isBit: true },
                { val: "1", isBit: true }
              ]
            },
            {
              bitLabel: "b₁ = 0",
              shift: 1,
              callout: "× b₁ (0) → All 0s (Shift 1 ←)",
              cells: [
                { val: " ", isPad: false },
                { val: " ", isPad: false },
                { val: " ", isPad: false },
                { val: "0", isBit: true },
                { val: "0", isBit: true },
                { val: "0", isBit: true },
                { val: "0", isBit: true },
                { val: "0", isShiftZero: true }
              ]
            },
            {
              bitLabel: "b₂ = 1",
              shift: 2,
              callout: "× b₂ (1) → Copy 1011 (Shift 2 ←←)",
              cells: [
                { val: " ", isPad: false },
                { val: " ", isPad: false },
                { val: "1", isBit: true },
                { val: "0", isBit: true },
                { val: "1", isBit: true },
                { val: "1", isBit: true },
                { val: "0", isShiftZero: true },
                { val: "0", isShiftZero: true }
              ]
            },
            {
              bitLabel: "b₃ = 1",
              shift: 3,
              callout: "× b₃ (1) → Copy 1011 (Shift 3 ←←←)",
              cells: [
                { val: " ", isPad: false },
                { val: "1", isBit: true },
                { val: "0", isBit: true },
                { val: "1", isBit: true },
                { val: "1", isBit: true },
                { val: "0", isShiftZero: true },
                { val: "0", isShiftZero: true },
                { val: "0", isShiftZero: true }
              ]
            }
          ],
          finalSum: {
            label: "Product with Radix Point",
            bits: ["1", "0", "0", "0", "1", "1", "1", "1"],
            val: "(10001.111)₂ = 17.875₁₀ (Radix point placed 1 + 2 = 3 bits from right)"
          },
          verification: "Decimal Check: 5.5 × 3.25 = 17.875. (10001.111)₂ = 16 + 1 + 0.5 + 0.25 + 0.125 = 17.875. Perfectly verified!",
          steps: [
            "Rule: Multiply numbers as integers ignoring the radix point.",
            "Integer multiplication: 1011₂ × 1101₂ = 11 × 13 = 143₁₀ = (10001111)₂.",
            "Total fractional digits: 1 (from 101.1) + 2 (from 11.01) = 3 fractional bits.",
            "Count 3 positions from right: (10001.111)₂ = 17.875₁₀."
          ]
        }
      ]
    },

    division: {
      concept: "Binary division uses the Restoring Division ladder method. At each cycle, compare the current dividend slice with the divisor. If slice >= divisor, write quotient bit 1 and subtract divisor; otherwise write 0 and bring down the next bit.",
      blueprint: {
        title: "The 3-Step Compare-Subtract-BringDown Loop",
        step1: "Compare: Inspect current Dividend Slice with Divisor. If Slice >= Divisor, write Quotient bit 1 (Green); if Slice < Divisor, write Quotient bit 0 (Amber).",
        step2: "Subtract: If Quotient bit is 1, compute remainder = Slice - Divisor.",
        step3: "Bring Down (↓): Append the next dividend bit to remainder to form the next cycle's Slice."
      },
      models: [
        {
          id: "ex-4a",
          title: "Example 4A: Exact Integer Long Division",
          subtitle: "Divide (11011)₂ ÷ (11)₂ using the Restoring Long-Division Ladder",
          problem: "(11011)₂ ÷ (11)₂",
          dividend: "11011 (27₁₀)",
          divisor: "11 (3₁₀)",
          quotient: "(1001)₂ = 9₁₀",
          remainder: "0",
          bracket: {
            divisor: "11",
            dividend: "11011",
            quotientBits: [
              { bit: "1", color: "green" },
              { bit: "0", color: "amber" },
              { bit: "0", color: "amber" },
              { bit: "1", color: "green" }
            ]
          },
          cycles: [
            {
              cycleNum: 1,
              slice: "11",
              divisor: "11",
              comp: "11 >= 11 (True)",
              qBit: "1",
              qBitColor: "green",
              action: "Subtract: 11 - 11 = 0",
              remainder: "0",
              bringDown: "0",
              nextSlice: "00",
              note: "Bring down next bit '0' ↓"
            },
            {
              cycleNum: 2,
              slice: "00",
              divisor: "11",
              comp: "00 < 11 (False)",
              qBit: "0",
              qBitColor: "amber",
              action: "Cannot subtract. Write 0 in quotient.",
              remainder: "00",
              bringDown: "1",
              nextSlice: "01",
              note: "Bring down next bit '1' ↓"
            },
            {
              cycleNum: 3,
              slice: "01",
              divisor: "11",
              comp: "01 < 11 (False)",
              qBit: "0",
              qBitColor: "amber",
              action: "Cannot subtract. Write 0 in quotient.",
              remainder: "01",
              bringDown: "1",
              nextSlice: "11",
              note: "Bring down final bit '1' ↓"
            },
            {
              cycleNum: 4,
              slice: "11",
              divisor: "11",
              comp: "11 >= 11 (True)",
              qBit: "1",
              qBitColor: "green",
              action: "Subtract: 11 - 11 = 0",
              remainder: "0",
              bringDown: null,
              nextSlice: null,
              note: "No more bits. Division terminates with Remainder 0."
            }
          ],
          verification: "Decimal Check: 27 ÷ 3 = 9 with Remainder 0. Quotient (1001)₂ = 9₁₀. Perfectly verified!",
          steps: [
            "Step 1: First 2 bits of dividend give slice 11. 11 >= 11 -> Quotient bit 1. 11 - 11 = 0.",
            "Step 2: Bring down 0 -> slice 00. 00 < 11 -> Quotient bit 0.",
            "Step 3: Bring down 1 -> slice 01. 01 < 11 -> Quotient bit 0.",
            "Step 4: Bring down 1 -> slice 11. 11 >= 11 -> Quotient bit 1. 11 - 11 = 0.",
            "Quotient = (1001)₂ = 9₁₀, Remainder = 0."
          ]
        },
        {
          id: "ex-4b",
          title: "Example 4B: Division with Remainder",
          subtitle: "Divide (101101)₂ ÷ (110)₂ with Non-Zero Remainder",
          problem: "(101101)₂ ÷ (110)₂",
          dividend: "101101 (45₁₀)",
          divisor: "110 (6₁₀)",
          quotient: "(111)₂ = 7₁₀",
          remainder: "(11)₂ = 3₁₀",
          bracket: {
            divisor: "110",
            dividend: "101101",
            quotientBits: [
              { bit: "1", color: "green" },
              { bit: "1", color: "green" },
              { bit: "1", color: "green" }
            ]
          },
          cycles: [
            {
              cycleNum: 1,
              slice: "1011",
              divisor: "110",
              comp: "1011 (11₁₀) >= 110 (6₁₀)",
              qBit: "1",
              qBitColor: "green",
              action: "Subtract: 1011 - 110 = 101",
              remainder: "101",
              bringDown: "0",
              nextSlice: "1010",
              note: "Bring down '0' ↓"
            },
            {
              cycleNum: 2,
              slice: "1010",
              divisor: "110",
              comp: "1010 (10₁₀) >= 110 (6₁₀)",
              qBit: "1",
              qBitColor: "green",
              action: "Subtract: 1010 - 110 = 100",
              remainder: "100",
              bringDown: "1",
              nextSlice: "1001",
              note: "Bring down '1' ↓"
            },
            {
              cycleNum: 3,
              slice: "1001",
              divisor: "110",
              comp: "1001 (9₁₀) >= 110 (6₁₀)",
              qBit: "1",
              qBitColor: "green",
              action: "Subtract: 1001 - 110 = 011",
              remainder: "11 (3₁₀)",
              bringDown: null,
              nextSlice: null,
              note: "Division complete. Final Remainder is (11)₂ = 3₁₀."
            }
          ],
          verification: "Decimal Check: 45 ÷ 6 = 7 with Remainder 3. Quotient (111)₂ = 7, Remainder (11)₂ = 3. Check: (7 × 6) + 3 = 45. Verified!",
          steps: [
            "Step 1: Slice 101 < 110. Take 4 bits -> 1011 (11). 1011 >= 110 -> Quotient bit 1. 1011 - 110 = 101.",
            "Step 2: Bring down 0 -> 1010 (10). 1010 >= 110 -> Quotient bit 1. 1010 - 110 = 100.",
            "Step 3: Bring down 1 -> 1001 (9). 1001 >= 110 -> Quotient bit 1. 1001 - 110 = 011 (3).",
            "Quotient = (111)₂ = 7₁₀, Remainder = (11)₂ = 3₁₀."
          ]
        },
        {
          id: "ex-4c",
          title: "Example 4C: Fractional Binary Division",
          subtitle: "Divide (1111)₂ ÷ (10)₂ into Binary Fractions",
          problem: "(1111)₂ ÷ (10)₂",
          dividend: "1111 (15₁₀)",
          divisor: "10 (2₁₀)",
          quotient: "(111.1)₂ = 7.5₁₀",
          remainder: "0",
          bracket: {
            divisor: "10",
            dividend: "1111",
            quotientBits: [
              { bit: "1", color: "green" },
              { bit: "1", color: "green" },
              { bit: "1", color: "green" },
              { bit: ".", color: "slate" },
              { bit: "1", color: "green" }
            ]
          },
          cycles: [
            {
              cycleNum: 1,
              slice: "11",
              divisor: "10",
              comp: "11 >= 10 (True)",
              qBit: "1",
              qBitColor: "green",
              action: "Subtract: 11 - 10 = 1",
              remainder: "1",
              bringDown: "1",
              nextSlice: "11",
              note: "Bring down '1' ↓"
            },
            {
              cycleNum: 2,
              slice: "11",
              divisor: "10",
              comp: "11 >= 10 (True)",
              qBit: "1",
              qBitColor: "green",
              action: "Subtract: 11 - 10 = 1",
              remainder: "1",
              bringDown: "1",
              nextSlice: "11",
              note: "Bring down '1' ↓"
            },
            {
              cycleNum: 3,
              slice: "11",
              divisor: "10",
              comp: "11 >= 10 (True)",
              qBit: "1",
              qBitColor: "green",
              action: "Subtract: 11 - 10 = 1",
              remainder: "1",
              bringDown: "0 (fractional)",
              nextSlice: "10",
              note: "Place radix point in quotient! Append fractional '0' ↓"
            },
            {
              cycleNum: 4,
              slice: "10",
              divisor: "10",
              comp: "10 >= 10 (True)",
              qBit: "1",
              qBitColor: "green",
              action: "Subtract: 10 - 10 = 0",
              remainder: "0",
              bringDown: null,
              nextSlice: null,
              note: "Exact division reached. Remainder = 0."
            }
          ],
          verification: "Decimal Check: 15 ÷ 2 = 7.5. (111.1)₂ = 4 + 2 + 1 + 0.5 = 7.5. Perfectly verified!",
          steps: [
            "Integer division yields: 1111 ÷ 10 = Quotient 111 with remainder 1.",
            "To continue into fractions, place a radix point in the quotient and append a 0 to the remainder.",
            "Remainder becomes (10)₂. 10 ÷ 10 = 1 with remainder 0.",
            "Quotient is (111.1)₂ = 7.5₁₀."
          ]
        }
      ]
    },

    practiceQuestions: [
      {
        id: "p14c-1",
        difficulty: "Easy",
        examTag: "Shift-and-Add Method",
        question: "Multiply (110)₂ × (101)₂ using the binary shift-and-add method.",
        solution: "Multiplicand = 110 (6), Multiplier = 101 (5).\nPartial product 0: 110 × 1 = 110\nPartial product 1: 110 × 0 = 0000\nPartial product 2: 110 × 1 (shifted 2) = 11000\nSum: 00110 + 11000 = (11110)₂ = (30)₁₀.\nCheck: 6 × 5 = 30."
      },
      {
        id: "p14c-2",
        difficulty: "Easy",
        examTag: "Restoring Long Division",
        question: "Divide (1100)₂ ÷ (11)₂ and state the quotient and remainder.",
        solution: "1100 (12) ÷ 11 (3):\nSlice 11: 11 ÷ 11 = 1 with remainder 0.\nBring 0: 0 ÷ 11 = 0.\nBring 0: 0 ÷ 11 = 0.\nQuotient = (100)₂ = 4₁₀, Remainder = 0.\nCheck: 12 ÷ 3 = 4."
      },
      {
        id: "p14c-3",
        difficulty: "Medium",
        examTag: "Fractional Shift Multiplication",
        question: "Perform fractional multiplication: (10.11)₂ × (1.1)₂.",
        solution: "Remove radix points: 1011₂ × 11₂ = 11₁₀ × 3₁₀ = 33₁₀ = (100001)₂.\nTotal fractional places: 2 (from 10.11) + 1 (from 1.1) = 3 places.\nPlace point 3 bits from right: (100.001)₂ = 4 + 0.125 = 4.125₁₀.\nCheck: 2.75 × 1.5 = 4.125. Verified!"
      },
      {
        id: "p14c-4",
        difficulty: "Medium",
        examTag: "Division with Remainder",
        question: "Divide (101010)₂ by (101)₂ using restoring long division.",
        solution: "Dividend = 101010 (42), Divisor = 101 (5).\n101 ÷ 101 = 1, Remainder 0.\nBring 0: 0 < 101 -> Quotient bit 0.\nBring 1: 1 < 101 -> Quotient bit 0.\nBring 0: 10 < 101 -> Quotient bit 0 with remainder (10)₂.\nQuotient = (1000)₂ = 8₁₀, Remainder = (10)₂ = 2₁₀.\nCheck: 42 = (8 × 5) + 2. Correct!"
      },
      {
        id: "p14c-5",
        difficulty: "Hard",
        examTag: "5-Bit Multiplication",
        question: "Multiply two 5-bit binary numbers: (11011)₂ × (10110)₂.",
        solution: "Multiplicand = 11011 (27), Multiplier = 10110 (22).\nNotice multiplier has LSB 0, so result will end in 0.\nPartial products:\nPP1 (bit 1): 110110\nPP2 (bit 2): 1101100\nPP3 (bit 4): 110110000\nSum: 110110 + 1101100 = 10100010.\n10100010 + 110110000 = (1001010010)₂ = (594)₁₀.\nCheck: 27 × 22 = 594. Verified!"
      },
      {
        id: "p14c-6",
        difficulty: "Hard",
        examTag: "Fractional Restoring Division",
        question: "Perform fractional division to 3 fractional bits: (101)₂ ÷ (1000)₂.",
        solution: "101 (5) ÷ 1000 (8).\nInteger quotient is 0.\nAdd point: (101.0)₂ ÷ 1000 -> 1010 (10) ÷ 1000 (8) = 1, R 10 (2).\nAppend 0: 100 (4) < 1000 (8) -> Quotient bit 0.\nAppend 0: 1000 (8) ÷ 1000 (8) = 1, R 0.\nResult: (0.101)₂ = 0.5 + 0.125 = 0.625₁₀.\nCheck: 5 ÷ 8 = 0.625."
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // TAB 5: CHEAT SHEET (EXCLUSIVE SPEED SHORTCUTS & SANITY CHECKS)
  // ---------------------------------------------------------------------------
  cheatSheet: {
    title: "Binary Arithmetic Exam Cheat Sheet & Quick-Check Rules",
    subtitle: "High-speed mental calculation shortcuts, 4-operation master matrix, and top exam traps.",

    masterMatrix: [
      {
        op: "Binary Addition (A + B)",
        identity: "0 (A + 0 = A)",
        carryBorrow: "Carry +1 when A + B + Cin >= 2; Carry +2 when sum = 4",
        keyConstraint: "Carry out from MSB creates an extra bit column",
        speedTrick: "Parity Check: Odd + Even = Odd (LSB 1); Even + Even = Even (LSB 0)"
      },
      {
        op: "Binary Subtraction (A - B)",
        identity: "0 (A - 0 = A)",
        carryBorrow: "Borrow 1 from left adds 2₁₀ = (10)₂ to current bit",
        keyConstraint: "If A < B, result is -(B - A) with negative sign",
        speedTrick: "Zero-Bridge: Borrowing across zeros turns intermediate 0s into 1s"
      },
      {
        op: "Binary Multiplication (A × B)",
        identity: "1 (A × 1 = A)",
        carryBorrow: "Shift-and-Add partial products; no borrows",
        keyConstraint: "Product requires up to (n + m) total bit width",
        speedTrick: "Skip Multiplier 0s: Never write all-zero rows; shift directly"
      },
      {
        op: "Binary Division (A ÷ B)",
        identity: "1 (A ÷ 1 = A)",
        carryBorrow: "Restoring compare-and-subtract loop",
        keyConstraint: "Division by 0 is undefined; remainder < divisor",
        speedTrick: "Divisors of 2^k: Shift radix point left by k positions directly"
      }
    ],

    shortcuts: [
      {
        id: "sc-1",
        title: "The Multiplier Bit-Skip Shortcut",
        badge: "Multiplication Speed Hack",
        concept: "Avoid writing redundant all-zero partial product rows in exams.",
        rule: "When multiplying by a multiplier containing zeros (e.g., 10001₂), NEVER write rows of all zeros. Shift the multiplicand left by each 1-bit position and sum directly. Saves up to 60% of exam time.",
        formula: "A × (2ᵏ + 1) = (A << k) + A",
        example: "(1101)₂ × (10001)₂ = (11010000)₂ + (1101)₂ = (11011101)₂ (13 × 17 = 221).",
        explanation: "Since 10001₂ = 2⁴ + 2⁰, simply shift (1101)₂ left by 4 positions -> 11010000₂, then add the unshifted 1101₂. Solved in 5 seconds without a 5-row matrix!"
      },
      {
        id: "sc-2",
        title: "The Zero-Bridge Rapid Borrow Rule",
        badge: "Zero-Bridge Formula",
        concept: "Borrow across multiple consecutive zeros in a single step without cascading subtractions.",
        rule: "When borrowing across k consecutive zeros (e.g., 10000₂ - 1), the first 1 to the left becomes 0, every intermediate zero becomes 1, and the target column receives 2₁₀ = 10₂.",
        formula: "1 0 0 0 0₂ - 1 = 0 1 1 1 1₂ (2ᵏ - 1 = k ones)",
        example: "(10000)₂ - (00001)₂: MSB 1 becomes 0, intermediate three 0s become 1s, LSB receives 2 -> 2 - 1 = 1 -> (01111)₂.",
        explanation: "Never do step-by-step borrows across zeros in exams. Instantaneously cross out the 1, write 1s over all intervening zeros, and write 2 above the target bit."
      },
      {
        id: "sc-3",
        title: "Division by Powers of Two (Instant Right Shift)",
        badge: "Division Shortcut",
        concept: "Divide binary numbers by 2, 4, 8, 16 in 1 second by moving the radix point.",
        rule: "Dividing any binary number by 2ᵏ is equivalent to shifting the radix point k positions to the left. The shifted bits become the remainder or fractional part.",
        formula: "(N)₂ ÷ 2ᵏ = (N >> k) with remainder = (lower k bits)",
        example: "(1101)₂ ÷ (100)₂ = (1101)₂ ÷ 2² = (11.01)₂ = 3.25₁₀ (13 ÷ 4 = 3.25).",
        explanation: "Divisor 100₂ has 2 zeros. Shift the binary point left by 2 positions: 1101. becomes 11.01₂. Quotient integer is 11₂ (3), remainder is 01₂ (1), or exact fraction 3.25₁₀."
      },
      {
        id: "sc-4",
        title: "Multiplication by Powers of Two (Instant Left Shift)",
        badge: "Hardware Left Shift",
        concept: "Multiply by 2, 4, 8, 16 by appending zeros without multiplication.",
        rule: "Multiplying any binary number by 2ᵏ is equivalent to shifting the number k bits to the left and appending k zeros to the right.",
        formula: "(N)₂ × 2ᵏ = (N << k) [append k zeros]",
        example: "(1011)₂ × (1000)₂ = (1011)₂ × 2³ = (1011000)₂ = 88₁₀ (11 × 8 = 88).",
        explanation: "Multiplier 1000₂ is 2³. Simply append three zeros to 1011₂ -> 1011000₂. Decimal check: 11 × 8 = 88. Zero arithmetic required."
      },
      {
        id: "sc-5",
        title: "The 1-Second Parity Sanity Check",
        badge: "Sanity Check Fix",
        concept: "Instant verification of addition and subtraction by examining LSB parity.",
        rule: "The LSB of the result is strictly determined by the LSBs of the operands: Odd + Even = Odd (LSB 1), Even + Even = Even (LSB 0), Odd + Odd = Even (LSB 0). If your binary answer violates this parity check, a carry error occurred at b₀.",
        formula: "LSB(Sum) = LSB(A) ⊕ LSB(B) ⊕ Cin",
        example: "(1101)₂ [Odd, LSB 1] + (0110)₂ [Even, LSB 0] MUST have LSB 1. Result (10011)₂ has LSB 1. Check passed!",
        explanation: "Check the LSB of your answer first before handing in the exam paper. An odd decimal result must always end in 1 in binary."
      }
    ],

    topMistakes: [
      {
        rank: 1,
        mistake: "Missing Intermediate 1s in Zero-Bridge Borrowing",
        why: "Students cross out the left 1 but leave intermediate zeros as 0s instead of turning them into 1s, or forget that the destination column receives 2₁₀ = (10)₂, not 1.",
        fix: "Apply the rule: First non-zero to left becomes 0, ALL intermediate zeros become 1, destination receives 2₁₀ = (10)₂."
      },
      {
        rank: 2,
        mistake: "Radix Point Misalignment in Fractional Arithmetic",
        why: "Aligning fractional numbers to the outer edge rather than locking the radix point (·), causing bits with different weights (e.g., 2⁻¹ and 2⁻²) to be added together.",
        fix: "Always line up the radix point (·) first. Pad trailing zeros to the right until both operands have equal fractional lengths."
      },
      {
        rank: 3,
        mistake: "Handling Multiple Carries in Multi-Number Addition",
        why: "When adding 3 or 4 binary numbers, a column sum of 4 produces (100)₂, which carries +2 (or +1 to column i+2). Students often mistakenly write down +1 carry.",
        fix: "Sum of 1s in column: 2 → Sum 0, Carry +1; 3 → Sum 1, Carry +1; 4 → Sum 0, Carry +2 (or carry +1 two columns left)."
      },
      {
        rank: 4,
        mistake: "Forgetting the Staircase Shift in Multiplication",
        why: "Writing partial product rows directly beneath one another without shifting left by the multiplier bit's positional weight k.",
        fix: "Row k must be shifted left by k positions (append k zeros to the right). Color the empty cells with amber zeros to verify alignment."
      },
      {
        rank: 5,
        mistake: "Confusing Integer Remainder with Fractional Quotient",
        why: "Writing the leftover integer remainder as fractional quotient digits without inserting a radix point and appending zeros.",
        fix: "Integer division terminates when all dividend bits are brought down. To calculate fractional bits, insert a radix point in the quotient and bring down fractional 0s."
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // TAB 6: MIXED EXAM CHALLENGE (15 DISTINCT QUESTIONS - NO UNIVERSITY NAMES)
  // ---------------------------------------------------------------------------
  mixedExamChallenge: [
    {
      id: "mec-1",
      difficulty: "Easy",
      topic: "Ripple Carry Addition",
      examTag: "Ripple Carry Addition",
      question: "Add (101011)₂ + (011101)₂ and verify your result by converting both operands to Base-10.",
      solution: "Align:\n  1 0 1 0 1 1 (43)\n+ 0 1 1 1 0 1 (29)\nCarries: 1 1 1 1 1 0\nSum:     1 0 0 1 0 0 0 (72)\nVerification: 43 + 29 = 72. (1001000)₂ = 64 + 8 = 72."
    },
    {
      id: "mec-2",
      difficulty: "Easy",
      topic: "Zero-Bridge Subtraction",
      examTag: "Zero-Bridge Subtraction",
      question: "Perform binary subtraction (100000)₂ - (001101)₂ using the Zero-Bridge rule.",
      solution: "At b₀, nearest 1 is at b₅.\nCross out b₅ (becomes 0).\nIntermediate bits b₄, b₃, b₂, b₁ all turn into 1.\nDestination b₀ becomes 2 (10₂).\nb₀: 2 - 1 = 1\nb₁: 1 - 0 = 1\nb₂: 1 - 1 = 0\nb₃: 1 - 1 = 0\nb₄: 1 - 0 = 1\nb₅: 0 - 0 = 0\nResult: (010011)₂ = (19)₁₀.\nCheck: 32 - 13 = 19."
    },
    {
      id: "mec-3",
      difficulty: "Easy",
      topic: "Binary Multiplication",
      examTag: "Shift-and-Add Multiplication",
      question: "Multiply (1011)₂ by (110)₂ using the shift-and-add method.",
      solution: "Multiplicand = 1011 (11), Multiplier = 110 (6).\nPartial Product 0: 0000\nPartial Product 1 (shifted 1): 10110\nPartial Product 2 (shifted 2): 101100\nSum: 010110 + 101100 = (1000010)₂ = (66)₁₀.\nCheck: 11 × 6 = 66."
    },
    {
      id: "mec-4",
      difficulty: "Easy",
      topic: "Binary Division",
      examTag: "Integer Long Division",
      question: "Divide (11110)₂ by (101)₂ and find both Quotient and Remainder.",
      solution: "11110 (30) ÷ 101 (5):\nSlice 111: 111 >= 101 -> Quotient bit 1, Remainder 111 - 101 = 10.\nBring 1 -> 101: 101 >= 101 -> Quotient bit 1, Remainder 0.\nBring 0 -> 0: 0 < 101 -> Quotient bit 0, Remainder 0.\nQuotient: (110)₂ = 6₁₀, Remainder = 0.\nCheck: 30 ÷ 5 = 6 R 0."
    },
    {
      id: "mec-5",
      difficulty: "Medium",
      topic: "Fractional Addition",
      examTag: "Zero-Padded Fractional Addition",
      question: "Add (1101.011)₂ + (1011.11)₂ with strict zero-padding.",
      solution: "Pad second operand to 3 fractional places: (1011.110)₂.\n  1 1 0 1 . 0 1 1 (13.375)\n+ 1 0 1 1 . 1 1 0 (11.750)\nCarries: 1 1 1 1 . 1 0 0\nSum:     1 1 0 0 1 . 0 0 1 (25.125)\nCheck: 13.375 + 11.750 = 25.125. (11001.001)₂ = 16 + 8 + 1 + 0.125 = 25.125."
    },
    {
      id: "mec-6",
      difficulty: "Medium",
      topic: "Fractional Subtraction",
      examTag: "Cross-Radix Borrow Subtraction",
      question: "Subtract (10010.01)₂ - (01101.111)₂ using borrow propagation.",
      solution: "Pad first operand to 3 fractional places: (10010.010)₂.\n  1 0 0 1 0 . 0 1 0 (18.250)\n- 0 1 1 0 1 . 1 1 1 (13.875)\nExecute borrow from integer bits across point:\nResult: (00100.011)₂ = 4 + 0.25 + 0.125 = 4.375₁₀.\nCheck: 18.250 - 13.875 = 4.375."
    },
    {
      id: "mec-7",
      difficulty: "Medium",
      topic: "Multi-Operand Addition",
      examTag: "4-Operand Multi-Column Addition",
      question: "Add four binary numbers simultaneously: (1110)₂ + (1011)₂ + (1101)₂ + (1111)₂.",
      solution: "Col b₀: 0 + 1 + 1 + 1 = 3₁₀ = 11₂ -> Sum 1, Carry 1 to b₁.\nCol b₁: 1 + 1 + 0 + 1 + 1 (carry) = 4₁₀ = 100₂ -> Sum 0, Carry 0 to b₂, Carry 1 to b₃!\nCol b₂: 1 + 0 + 1 + 1 + 0 = 3₁₀ = 11₂ -> Sum 1, Carry 1 to b₃.\nCol b₃: 1 + 1 + 1 + 1 + 1 (from b₁) + 1 (from b₂) = 6₁₀ = 110₂ -> Sum 0, Carry 1 to b₄, Carry 1 to b₅.\nCol b₄: 0 + 1 = 1.\nCol b₅: 0 + 1 = 1.\nResult: (110101)₂ = (53)₁₀.\nCheck: 14 + 11 + 13 + 15 = 53. Verified!"
    },
    {
      id: "mec-8",
      difficulty: "Medium",
      topic: "Negative Subtraction",
      examTag: "Polarity & Magnitude (A < B)",
      question: "Directly evaluate (01011)₂ - (10110)₂ and express the answer with proper polarity.",
      solution: "A = 11₁₀, B = 22₁₀. Since A < B, result is -(B - A).\n  1 0 1 1 0 (22)\n- 0 1 0 1 1 (11)\n-------------\n  0 1 0 1 1 (11)\nResult: -(01011)₂ = -(11)₁₀."
    },
    {
      id: "mec-9",
      difficulty: "Medium",
      topic: "Fractional Multiplication",
      examTag: "Fractional Radix Multiplication",
      question: "Compute (11.1)₂ × (10.01)₂ and state the product in binary and decimal.",
      solution: "111₂ (7) × 1001₂ (9) = 63₁₀ = (111111)₂.\nTotal fractional bits: 1 + 2 = 3.\nPlace radix point 3 bits from right: (111.111)₂.\nDecimal: 3.5 × 2.25 = 7.875₁₀.\n(111.111)₂ = 4 + 2 + 1 + 0.5 + 0.25 + 0.125 = 7.875. Verified!"
    },
    {
      id: "mec-10",
      difficulty: "Medium",
      topic: "Fractional Division",
      examTag: "Fractional Restoring Division",
      question: "Compute (1001)₂ ÷ (100)₂ by restoring division into binary fractions.",
      solution: "1001 (9) ÷ 100 (4):\nInteger part: 1001 ÷ 100 = 10 (2) with remainder 1.\nPlace radix point, bring 0: 10 < 100 -> Quotient bit 0.\nBring 0: 100 ÷ 100 = 1 with remainder 0.\nResult: (10.01)₂ = 2.25₁₀.\nCheck: 9 ÷ 4 = 2.25."
    },
    {
      id: "mec-11",
      difficulty: "Hard",
      topic: "Octal Arithmetic",
      examTag: "Octal Radix Addition",
      question: "Perform Octal addition: (765.4)₈ + (547.6)₈ directly in Base-8.",
      solution: "Fraction: 4 + 6 = 10₁₀ -> 10 - 8 = 2 with Carry 1 to integer part.\nCol 0: 5 + 7 + 1 = 13₁₀ -> 13 - 8 = 5 with Carry 1.\nCol 1: 6 + 4 + 1 = 11₁₀ -> 11 - 8 = 3 with Carry 1.\nCol 2: 7 + 5 + 1 = 13₁₀ -> 13 - 8 = 5 with Carry 1.\nCol 3: Carry 1.\nResult: (1535.2)₈."
    },
    {
      id: "mec-12",
      difficulty: "Hard",
      topic: "Octal Subtraction",
      examTag: "Octal Borrow Subtraction",
      question: "Directly subtract (704)₈ - (356)₈ in Base-8.",
      solution: "Col 0: 4 - 6 cannot proceed. Borrow 8 from Col 2 across intermediate 0!\nCol 2 (7) becomes 6. Col 1 (0) becomes 7. Col 0 receives 8 + 4 = 12.\nCol 0: 12 - 6 = 6.\nCol 1: 7 - 5 = 2.\nCol 2: 6 - 3 = 3.\nResult: (326)₈.\nCheck: 704₈ = 452₁₀, 356₈ = 238₁₀. 452 - 238 = 214₁₀. 326₈ = 192 + 16 + 6 = 214₁₀."
    },
    {
      id: "mec-13",
      difficulty: "Hard",
      topic: "Hexadecimal Addition",
      examTag: "Hexadecimal Direct Addition",
      question: "Add Hexadecimal values (A9F.B)₁₆ + (7E8.D)₁₆ directly in Base-16.",
      solution: "Fraction: B (11) + D (13) = 24₁₀ -> 24 - 16 = 8 with Carry 1.\nCol 0: F (15) + 8 + 1 = 24₁₀ -> 24 - 16 = 8 with Carry 1.\nCol 1: 9 + E (14) + 1 = 24₁₀ -> 24 - 16 = 8 with Carry 1.\nCol 2: A (10) + 7 + 1 = 18₁₀ -> 18 - 16 = 2 with Carry 1.\nCol 3: Carry 1.\nResult: (1288.8)₁₆."
    },
    {
      id: "mec-14",
      difficulty: "Hard",
      topic: "Hexadecimal Subtraction",
      examTag: "Hexadecimal Borrow Subtraction",
      question: "Directly evaluate (F02)₁₆ - (8B9)₁₆ in Base-16 with borrow propagation.",
      solution: "Col 0: 2 - 9 cannot proceed. Borrow 16 from Col 2 across intermediate 0!\nCol 2: F (15) becomes E (14).\nCol 1: 0 becomes F (15).\nCol 0: 2 + 16 = 18. 18 - 9 = 9.\nCol 1: 15 - B (11) = 4.\nCol 2: 14 - 8 = 6.\nResult: (649)₁₆.\nCheck: F02₁₆ = 3842₁₀, 8B9₁₆ = 2233₁₀. 3842 - 2233 = 1609₁₀. 649₁₆ = 1536 + 64 + 9 = 1609₁₀."
    },
    {
      id: "mec-15",
      difficulty: "Hard",
      topic: "Complex 5-Operand Addition",
      examTag: "5-Operand Multi-Column Addition",
      question: "Compute the combined sum of: 11111₂ + 10101₂ + 01110₂ + 11001₂ + 00111₂.",
      solution: "Col b₀: 1 + 1 + 0 + 1 + 1 = 4₁₀ = 100₂ -> Sum 0, Carry 0 to b₁, Carry 1 to b₂.\nCol b₁: 1 + 0 + 1 + 0 + 1 + 0 = 3₁₀ = 11₂ -> Sum 1, Carry 1 to b₂.\nCol b₂: 1 + 1 + 1 + 0 + 1 + 1 (from b₀) + 1 (from b₁) = 6₁₀ = 110₂ -> Sum 0, Carry 1 to b₃, Carry 1 to b₄.\nCol b₃: 1 + 0 + 1 + 1 + 0 + 1 (from b₂) = 4₁₀ = 100₂ -> Sum 0, Carry 0 to b₄, Carry 1 to b₅.\nCol b₄: 1 + 1 + 0 + 1 + 0 + 1 (from b₂) + 0 (from b₃) = 4₁₀ = 100₂ -> Sum 0, Carry 0 to b₅, Carry 1 to b₆.\nCol b₅: 0 + 1 (from b₃) + 0 (from b₄) = 1.\nCol b₆: 0 + 1 (from b₄) = 1.\nResult: (1100010)₂ = (98)₁₀.\nCheck: 31 + 21 + 14 + 25 + 7 = 98. Verified!"
    }
  ],

  youtubeResource: {
    title: "Binary Addition and Subtraction Explained with Examples (ALL ABOUT ELECTRONICS)",
    channel: "ALL ABOUT ELECTRONICS",
    duration: "18:40",
    url: "https://www.youtube.com/watch?v=AE-27BSbkJ4",
    topicsCovered: "Step-by-step binary addition and subtraction, ripple carry propagation, zero-bridge borrow mechanics, and multi-base arithmetic."
  }
};
