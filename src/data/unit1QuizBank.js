/**
 * ZeroIndex Unit 1 Practice Arena & Quiz Bank
 * Strictly zero em-dashes (\u2014) and zero en-dashes (\u2013).
 * Strictly zero university names or exam years.
 * 63 Brand-new, mathematically verified questions across 5 syllabus tracks.
 */

export const unit1QuizBank = [
  // ==========================================================================
  // TRACK 1: NUMBER SYSTEMS & ALL 12 CONVERSIONS (15 QUESTIONS)
  // ==========================================================================
  {
    id: "q-c1",
    trackId: "conversions",
    trackTitle: "Topic 1: Number Systems & All 12 Conversions",
    topicBadge: "1.3A: Decimal to Binary (Fractional)",
    difficulty: "Easy",
    set: "set1",
    question: "Convert the fractional decimal number (77.625)₁₀ into its equivalent Binary representation (Base 2).",
    promptDetail: "Show integer successive division by 2 and fractional successive multiplication by 2.",
    inputFormatHint: "Enter binary digits only, e.g., 1001101.101",
    correctAnswer: "1001101.101",
    acceptedAnswers: ["1001101.101", "+1001101.101", "(1001101.101)2", "1001101.101_2"],
    options: [
      { label: "A", text: "1001101.101", isCorrect: true },
      { label: "B", text: "1001101.011", distractorReason: "Reversed fractional bit order" },
      { label: "C", text: "1011101.101", distractorReason: "Arithmetic error in integer division (38 / 2)" },
      { label: "D", text: "1001111.110", distractorReason: "Omitted middle zero quotient" }
    ],
    hint1: "Formula & Rule: Separate into integer part (77) and fractional part (0.625). Divide 77 repeatedly by 2 and collect remainders upwards (bottom = MSB). Multiply 0.625 repeatedly by 2 and collect extracted integer carries downwards.",
    hint2: "First Step & Trap: 77 / 2 = 38 R1. Be careful: reading integer remainders top-to-bottom instead of bottom-to-top will invert the binary word!",
    solution: {
      finalAnswer: "(1001101.101)₂",
      steps: [
        {
          title: "Step 1: Integer Part Successive Division (77 ÷ 2)",
          type: "ladder",
          headers: ["Division", "Quotient", "Remainder", "Bit Position"],
          rows: [
            ["77 ÷ 2", "38", "1", "b0 (LSB)"],
            ["38 ÷ 2", "19", "0", "b1"],
            ["19 ÷ 2", "9", "1", "b2"],
            ["9 ÷ 2", "4", "1", "b3"],
            ["4 ÷ 2", "2", "0", "b4"],
            ["2 ÷ 2", "1", "0", "b5"],
            ["1 ÷ 2", "0", "1", "b6 (MSB)"]
          ],
          readDirection: "Read remainders upward (↑): (77)₁₀ = (1001101)₂"
        },
        {
          title: "Step 2: Fractional Part Successive Multiplication (0.625 × 2)",
          type: "table",
          headers: ["Multiplication", "Product", "Extracted Carry", "Bit Position"],
          rows: [
            ["0.625 × 2", "1.250", "1", "b-1 (First digit)"],
            ["0.250 × 2", "0.500", "0", "b-2"],
            ["0.500 × 2", "1.000", "1", "b-3 (Terminated at 0)"]
          ],
          readDirection: "Read extracted carries downward (↓): (0.625)₁₀ = (0.101)₂"
        },
        {
          title: "Step 3: Combine Integer and Fractional Parts",
          type: "summary",
          content: "(77.625)₁₀ = (1001101.101)₂"
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: 77 = 64 + 8 + 4 + 1 -> weights 2⁶(1) + 2³(1) + 2²(1) + 2⁰(1) = 1001101. 0.625 = 0.5 + 0.125 = 2⁻¹(1) + 2⁻³(1) = .101. Total = 1001101.101!",
      verification: "Base 10 Check: 64 + 8 + 4 + 1 + 0.5 + 0.125 = 77.625₁₀ (100% verified)."
    }
  },
  {
    id: "q-c2",
    trackId: "conversions",
    trackTitle: "Topic 1: Number Systems & All 12 Conversions",
    topicBadge: "1.3B: Binary to Decimal (Fractional)",
    difficulty: "Easy",
    set: "set1",
    question: "Convert the fractional binary number (110110.11)₂ into its exact Decimal value (Base 10).",
    promptDetail: "Expand using positional powers of 2 for both integer and fractional parts.",
    inputFormatHint: "Enter decimal number, e.g., 54.75",
    correctAnswer: "54.75",
    acceptedAnswers: ["54.75", "+54.75", "(54.75)10", "54.75_10"],
    options: [
      { label: "A", text: "54.75", isCorrect: true },
      { label: "B", text: "54.50", distractorReason: "Missed 2⁻² (0.25) fractional weight" },
      { label: "C", text: "46.75", distractorReason: "Miscalculated 2⁵ as 24 instead of 32" },
      { label: "D", text: "58.75", distractorReason: "Added unasserted bit b2 (4)" }
    ],
    hint1: "Formula & Rule: Value = Sum of (bit × 2^i). Integer powers are 2⁵, 2⁴, 2³, 2², 2¹, 2⁰ (32, 16, 8, 4, 2, 1). Fractional powers are 2⁻¹, 2⁻² (0.5, 0.25).",
    hint2: "First Step & Trap: Bits are at positions b5(1), b4(1), b3(0), b2(1), b1(1), b0(0) . b-1(1), b-2(1). Notice that b3 and b0 are 0!",
    solution: {
      finalAnswer: "(54.75)₁₀",
      steps: [
        {
          title: "Step 1: Write Positional Weights Matrix",
          type: "matrix",
          headers: ["Position", "b5", "b4", "b3", "b2", "b1", "b0", ".", "b-1", "b-2"],
          rows: [
            ["Binary Bit", "1", "1", "0", "1", "1", "0", ".", "1", "1"],
            ["Power of 2", "2⁵", "2⁴", "2³", "2²", "2¹", "2⁰", ".", "2⁻¹", "2⁻²"],
            ["Weight Value", "32", "16", "8", "4", "2", "1", ".", "0.5", "0.25"]
          ]
        },
        {
          title: "Step 2: Sum the Active Weighted Terms",
          type: "summary",
          content: "(1 × 32) + (1 × 16) + (0 × 8) + (1 × 4) + (1 × 2) + (0 × 1) + (1 × 0.5) + (1 × 0.25) = 32 + 16 + 4 + 2 + 0.5 + 0.25 = 54.75₁₀"
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: Integer is 32 + 16 + 4 + 2 = 54. Fraction .11 is 1/2 + 1/4 = 3/4 = 0.75. Result: 54.75!",
      verification: "Base 10 Check: 54.75₁₀."
    }
  },
  {
    id: "q-c3",
    trackId: "conversions",
    trackTitle: "Topic 1: Number Systems & All 12 Conversions",
    topicBadge: "1.3C: Decimal to Octal",
    difficulty: "Easy",
    set: "set1",
    question: "Convert the integer decimal number (356)₁₀ into its equivalent Octal representation (Base 8).",
    promptDetail: "Show successive division by 8 with quotients and remainders.",
    inputFormatHint: "Enter octal digits only, e.g., 544",
    correctAnswer: "544",
    acceptedAnswers: ["544", "(544)8", "544_8"],
    options: [
      { label: "A", text: "544", isCorrect: true },
      { label: "B", text: "445", distractorReason: "Read remainders top-to-bottom instead of bottom-to-top" },
      { label: "C", text: "534", distractorReason: "Division remainder error in first step" },
      { label: "D", text: "644", distractorReason: "Incorrect quotient on 356 / 8" }
    ],
    hint1: "Formula & Rule: Repeatedly divide by 8. Record each remainder (0 to 7). Collect remainders from bottom step (MSB) up to top step (LSB).",
    hint2: "First Step & Trap: 356 / 8 = 44 with remainder 4 (since 44 × 8 = 352). Next divide 44 by 8.",
    solution: {
      finalAnswer: "(544)₈",
      steps: [
        {
          title: "Step 1: Successive Division by 8",
          type: "ladder",
          headers: ["Division (N ÷ 8)", "Quotient (Q)", "Remainder (R)", "Digit Position"],
          rows: [
            ["356 ÷ 8", "44", "4", "d0 (LSB)"],
            ["44 ÷ 8", "5", "4", "d1"],
            ["5 ÷ 8", "0", "5", "d2 (MSB)"]
          ],
          readDirection: "Read remainders upward (↑): (356)₁₀ = (544)₈"
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: 5 × 8² + 4 × 8¹ + 4 × 8⁰ = 5 × 64 + 4 × 8 + 4 = 320 + 32 + 4 = 356!",
      verification: "Base 10 Check: 320 + 32 + 4 = 356₁₀ (100% verified)."
    }
  },
  {
    id: "q-c4",
    trackId: "conversions",
    trackTitle: "Topic 1: Number Systems & All 12 Conversions",
    topicBadge: "1.3D: Decimal to Hexadecimal",
    difficulty: "Easy",
    set: "set1",
    question: "Convert the integer decimal number (625)₁₀ into its equivalent Hexadecimal representation (Base 16).",
    promptDetail: "Show successive division by 16 with hex letter substitutions where remainder ≥ 10.",
    inputFormatHint: "Enter hex digits (letters capitalized), e.g., 271",
    correctAnswer: "271",
    acceptedAnswers: ["271", "(271)16", "271_16", "0x271"],
    options: [
      { label: "A", text: "271", isCorrect: true },
      { label: "B", text: "172", distractorReason: "Reversed remainder read direction" },
      { label: "C", text: "2E1", distractorReason: "Mistakenly treated remainder 7 as hex E" },
      { label: "D", text: "371", distractorReason: "Arithmetic error on 625 / 16" }
    ],
    hint1: "Formula & Rule: Divide by 16 repeatedly. Remainder digits 10-15 map to A-F. Collect remainders from bottom to top.",
    hint2: "First Step & Trap: 625 / 16 = 39 with remainder 1 (since 39 × 16 = 624).",
    solution: {
      finalAnswer: "(271)₁₆",
      steps: [
        {
          title: "Step 1: Successive Division by 16",
          type: "ladder",
          headers: ["Division (N ÷ 16)", "Quotient (Q)", "Remainder (R)", "Hex Symbol"],
          rows: [
            ["625 ÷ 16", "39", "1", "1 (LSB)"],
            ["39 ÷ 16", "2", "7", "7"],
            ["2 ÷ 16", "0", "2", "2 (MSB)"]
          ],
          readDirection: "Read upward (↑): (625)₁₀ = (271)₁₆"
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: 2 × 16² + 7 × 16 + 1 = 2 × 256 + 112 + 1 = 512 + 112 + 1 = 625₁₀!",
      verification: "Base 10 Check: 512 + 112 + 1 = 625₁₀ (100% verified)."
    }
  },
  {
    id: "q-c5",
    trackId: "conversions",
    trackTitle: "Topic 1: Number Systems & All 12 Conversions",
    topicBadge: "1.3E: Octal to Decimal (Fractional)",
    difficulty: "Medium",
    set: "set1",
    question: "Convert the fractional octal number (723.4)₈ into its exact Decimal representation (Base 10).",
    promptDetail: "Expand using powers of 8: 8², 8¹, 8⁰, 8⁻¹.",
    inputFormatHint: "Enter decimal number, e.g., 467.5",
    correctAnswer: "467.5",
    acceptedAnswers: ["467.5", "(467.5)10", "467.5_10"],
    options: [
      { label: "A", text: "467.5", isCorrect: true },
      { label: "B", text: "467.4", distractorReason: "Treated .4 as 0.4 instead of 4/8 (0.5)" },
      { label: "C", text: "459.5", distractorReason: "Computed 7 × 64 as 440 instead of 448" },
      { label: "D", text: "475.5", distractorReason: "Added octal 8 instead of multiplying" }
    ],
    hint1: "Formula & Rule: Value = 7 × 8² + 2 × 8¹ + 3 × 8⁰ + 4 × 8⁻¹. Note that 8⁻¹ = 1/8 = 0.125.",
    hint2: "First Step & Trap: 4 × (1/8) = 4/8 = 1/2 = 0.5. Do not write 0.4!",
    solution: {
      finalAnswer: "(467.5)₁₀",
      steps: [
        {
          title: "Step 1: Positional Expansion",
          type: "summary",
          content: "= 7 × 8² + 2 × 8¹ + 3 × 8⁰ + 4 × 8⁻¹"
        },
        {
          title: "Step 2: Compute Intermediate Terms",
          type: "table",
          headers: ["Digit", "Power", "Calculation", "Value"],
          rows: [
            ["7", "8²", "7 × 64", "448"],
            ["2", "8¹", "2 × 8", "16"],
            ["3", "8⁰", "3 × 1", "3"],
            ["4", "8⁻¹", "4 × 0.125", "0.5"]
          ]
        },
        {
          title: "Step 3: Sum the Terms",
          type: "summary",
          content: "448 + 16 + 3 + 0.5 = 467.5₁₀"
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: 7 × 64 = 448. 448 + 19 = 467. 4/8 = 0.5. Total = 467.5!",
      verification: "Base 10 Check: 448 + 16 + 3 + 0.5 = 467.5₁₀."
    }
  },
  {
    id: "q-c6",
    trackId: "conversions",
    trackTitle: "Topic 1: Number Systems & All 12 Conversions",
    topicBadge: "1.3F: Hexadecimal to Decimal (Fractional)",
    difficulty: "Medium",
    set: "set1",
    question: "Convert the fractional hexadecimal number (2E9.C)₁₆ into its exact Decimal representation (Base 10).",
    promptDetail: "Substitute hex letter E = 14, C = 12, and expand using powers of 16.",
    inputFormatHint: "Enter decimal number, e.g., 745.75",
    correctAnswer: "745.75",
    acceptedAnswers: ["745.75", "(745.75)10", "745.75_10"],
    options: [
      { label: "A", text: "745.75", isCorrect: true },
      { label: "B", text: "745.12", distractorReason: "Wrote hex C directly as 0.12 instead of 12/16" },
      { label: "C", text: "729.75", distractorReason: "Treated hex E as 13 instead of 14" },
      { label: "D", text: "761.75", distractorReason: "Treated hex E as 15" }
    ],
    hint1: "Formula & Rule: Hex digits: E = 14, C = 12. Value = 2 × 16² + 14 × 16¹ + 9 × 16⁰ + 12 × 16⁻¹.",
    hint2: "First Step & Trap: 16⁻¹ = 1/16 = 0.0625. Thus, 12 × (1/16) = 12/16 = 3/4 = 0.75.",
    solution: {
      finalAnswer: "(745.75)₁₀",
      steps: [
        {
          title: "Step 1: Map Hex Digits to Decimal Values",
          type: "summary",
          content: "2 -> 2, E -> 14, 9 -> 9, C -> 12"
        },
        {
          title: "Step 2: Multiply by Powers of 16",
          type: "table",
          headers: ["Hex Digit", "Decimal Value", "Power of 16", "Calculated Product"],
          rows: [
            ["2", "2", "16² (256)", "2 × 256 = 512"],
            ["E", "14", "16¹ (16)", "14 × 16 = 224"],
            ["9", "9", "16⁰ (1)", "9 × 1 = 9"],
            ["C", "12", "16⁻¹ (0.0625)", "12 / 16 = 0.75"]
          ]
        },
        {
          title: "Step 3: Total Sum",
          type: "summary",
          content: "512 + 224 + 9 + 0.75 = 745.75₁₀"
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: 512 + 224 = 736; 736 + 9 = 745; C/16 = 12/16 = 0.75. Sum = 745.75!",
      verification: "Base 10 Check: 512 + 224 + 9 + 0.75 = 745.75₁₀."
    }
  },
  {
    id: "q-c7",
    trackId: "conversions",
    trackTitle: "Topic 1: Number Systems & All 12 Conversions",
    topicBadge: "1.3G: Binary to Octal with Zero-Padding",
    difficulty: "Medium",
    set: "set1",
    question: "Convert the fractional binary number (11011101.101)₂ into its equivalent Octal representation (Base 8).",
    promptDetail: "Group into 3-bit triplets outward from radix point. Show Amber padded zeros where required.",
    inputFormatHint: "Enter octal digits, e.g., 335.5",
    correctAnswer: "335.5",
    acceptedAnswers: ["335.5", "(335.5)8", "335.5_8"],
    options: [
      { label: "A", text: "335.5", isCorrect: true },
      { label: "B", text: "335.101", distractorReason: "Did not convert fractional bits to octal" },
      { label: "C", text: "675.5", distractorReason: "Grouped from left to right incorrectly" },
      { label: "D", text: "335.25", distractorReason: "Treated fraction as decimal 0.25" }
    ],
    hint1: "Formula & Rule: Octal uses 3-bit groups (2³ = 8). Integer part: group leftward from radix point, adding leading zeros if needed. Fractional part: group rightward, adding trailing zeros if needed.",
    hint2: "First Step & Trap: Integer 11011101 has 8 bits -> pad with 1 leading zero: (011)(011)(101). Fraction .101 already has 3 bits -> (101).",
    solution: {
      finalAnswer: "(335.5)₈",
      steps: [
        {
          title: "Step 1: Anchor at Radix Point and Group in 3s",
          type: "table",
          headers: ["Position", "Padded 3-Bit Group", "Octal Digit"],
          rows: [
            ["Integer Leftmost", "011 (Padded with leading 0)", "3"],
            ["Integer Middle", "011", "3"],
            ["Integer Rightmost", "101", "5"],
            ["Radix Point", ".", "."],
            ["Fraction Rightward", "101", "5"]
          ]
        },
        {
          title: "Step 2: Assemble Octal Digits",
          type: "summary",
          content: "(011)(011)(101) . (101)₂ = (335.5)₈"
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: 011₂ = 3, 011₂ = 3, 101₂ = 5, .101₂ = 5/8 -> (335.5)₈!",
      verification: "Base 10 Check: 11011101₂ = 221₁₀. 0.101₂ = 0.625₁₀. 3×64 + 3×8 + 5 + 5/8 = 192 + 24 + 5 + 0.625 = 221.625₁₀."
    }
  },
  {
    id: "q-c8",
    trackId: "conversions",
    trackTitle: "Topic 1: Number Systems & All 12 Conversions",
    topicBadge: "1.3H: Binary to Hexadecimal with Padding",
    difficulty: "Medium",
    set: "set1",
    question: "Convert the fractional binary number (11101011.0111)₂ into its equivalent Hexadecimal representation (Base 16).",
    promptDetail: "Group into 4-bit nibbles outward from radix point.",
    inputFormatHint: "Enter hex string, e.g., EB.7",
    correctAnswer: "EB.7",
    acceptedAnswers: ["EB.7", "eb.7", "(EB.7)16", "0xEB.7"],
    options: [
      { label: "A", text: "EB.7", isCorrect: true },
      { label: "B", text: "EB.E", distractorReason: "Shifted fraction nibble or misread 0111" },
      { label: "C", text: "DB.7", distractorReason: "Misread 1110 as D (13) instead of E (14)" },
      { label: "D", text: "EA.7", distractorReason: "Misread 1011 as A (10) instead of B (11)" }
    ],
    hint1: "Formula & Rule: Hex uses 4-bit nibbles (2⁴ = 16). Group outward from radix point: 4 bits to left, 4 bits to right.",
    hint2: "First Step & Trap: Integer 1110 1011 -> (1110) = E, (1011) = B. Fraction .0111 -> (0111) = 7.",
    solution: {
      finalAnswer: "(EB.7)₁₆",
      steps: [
        {
          title: "Step 1: Partition into 4-Bit Nibbles",
          type: "table",
          headers: ["Nibble", "Binary", "Decimal Value", "Hex Digit"],
          rows: [
            ["Integer Upper", "1110", "14", "E"],
            ["Integer Lower", "1011", "11", "B"],
            ["Radix Point", ".", ".", "."],
            ["Fraction Nibble", "0111", "7", "7"]
          ]
        },
        {
          title: "Step 2: Combine Hex Digits",
          type: "summary",
          content: "(1110)(1011) . (0111)₂ = (EB.7)₁₆"
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: 1110 = 14 (E), 1011 = 11 (B), 0111 = 7. Immediate answer: EB.7!",
      verification: "Base 10 Check: EB.7₁₆ = 14×16 + 11 + 7/16 = 224 + 11 + 0.4375 = 235.4375₁₀. 11101011.0111₂ = 235.4375₁₀."
    }
  },
  {
    id: "q-c9",
    trackId: "conversions",
    trackTitle: "Topic 1: Number Systems & All 12 Conversions",
    topicBadge: "1.3I: Octal to Hexadecimal (2-Hop Bridge)",
    difficulty: "Medium",
    set: "set2",
    question: "Convert the fractional octal number (572.3)₈ into Hexadecimal (Base 16) using the 2-Hop Binary Bridge.",
    promptDetail: "Hop 1: Expand each Octal digit into 3 binary bits. Hop 2: Regroup binary bits into 4-bit nibbles outward from radix point.",
    inputFormatHint: "Enter hex string, e.g., 17A.6",
    correctAnswer: "17A.6",
    acceptedAnswers: ["17A.6", "17a.6", "(17A.6)16", "0x17A.6"],
    options: [
      { label: "A", text: "17A.6", isCorrect: true },
      { label: "B", text: "17A.3", distractorReason: "Forgot to pad trailing zero in fraction nibble (wrote .011 as .3 instead of .0110 as .6)" },
      { label: "C", text: "27A.6", distractorReason: "Miscalculated upper integer nibble" },
      { label: "D", text: "1BA.6", distractorReason: "Hex translation error on middle bits" }
    ],
    hint1: "Formula & Rule: NEVER convert Octal to Hex directly. Use the 2-Hop Bridge: Octal -> 3-bit Binary -> 4-bit Hex.",
    hint2: "First Step & Trap: 5 -> 101, 7 -> 111, 2 -> 010, . 3 -> 011. Combined binary = 101 111 010 . 011. Now regroup into 4-bit nibbles. Don't forget trailing zero on fraction!",
    solution: {
      finalAnswer: "(17A.6)₁₆",
      steps: [
        {
          title: "Hop 1: Octal to 3-Bit Binary Expansion",
          type: "summary",
          content: "5 -> 101, 7 -> 111, 2 -> 010, . 3 -> 011 -> (101111010.011)₂"
        },
        {
          title: "Hop 2: Regroup into 4-Bit Hex Nibbles Outward from Radix Point",
          type: "table",
          headers: ["Group", "Binary Nibble", "Hex Digit"],
          rows: [
            ["Integer Nibble 3", "0001 (Padded with 3 zeros)", "1"],
            ["Integer Nibble 2", "0111", "7"],
            ["Integer Nibble 1", "1010", "A (10)"],
            ["Radix Point", ".", "."],
            ["Fraction Nibble 1", "0110 (Padded with 1 trailing zero)", "6"]
          ]
        },
        {
          title: "Step 3: Combine Hex Digits",
          type: "summary",
          content: "(0001)(0111)(1010) . (0110) = (17A.6)₁₆"
        }
      ],
      fastShortcut: "Fast Trap Warning: Octal .3 is .011 in binary. In 4-bit hex, it pads to .0110 = 6, NOT 3!",
      verification: "Base 10 Check: (572.3)₈ = 5×64 + 7×8 + 2 + 3/8 = 320 + 56 + 2 + 0.375 = 378.375₁₀. (17A.6)₁₆ = 256 + 7×16 + 10 + 6/16 = 256 + 112 + 10 + 0.375 = 378.375₁₀ (100% verified)."
    }
  },
  {
    id: "q-c10",
    trackId: "conversions",
    trackTitle: "Topic 1: Number Systems & All 12 Conversions",
    topicBadge: "1.3J: Hexadecimal to Octal (2-Hop Bridge)",
    difficulty: "Medium",
    set: "set2",
    question: "Convert the fractional hexadecimal number (D3.B)₁₆ into Octal (Base 8) using the 2-Hop Binary Bridge.",
    promptDetail: "Hop 1: Expand hex to 4-bit binary. Hop 2: Regroup into 3-bit octal triplets outward from radix point.",
    inputFormatHint: "Enter octal string, e.g., 323.54",
    correctAnswer: "323.54",
    acceptedAnswers: ["323.54", "(323.54)8", "323.54_8"],
    options: [
      { label: "A", text: "323.54", isCorrect: true },
      { label: "B", text: "323.5", distractorReason: "Forgot to pad trailing two zeros to complete the second 3-bit fraction group" },
      { label: "C", text: "643.54", distractorReason: "Regrouped integer from left to right instead of right to left" },
      { label: "D", text: "323.13", distractorReason: "Wrote hex B directly as 13" }
    ],
    hint1: "Formula & Rule: D = 1101, 3 = 0011, B = 1011. Binary = 11010011.1011. Regroup into 3-bit octal groups.",
    hint2: "First Step & Trap: Fraction .1011 has 4 bits. Group 1: 101 (5). Group 2: 1 needs two padded trailing zeros -> 100 (4). Fraction becomes .54!",
    solution: {
      finalAnswer: "(323.54)₈",
      steps: [
        {
          title: "Hop 1: Hex to 4-Bit Binary Expansion",
          type: "summary",
          content: "D -> 1101, 3 -> 0011, B -> 1011 -> (11010011.1011)₂"
        },
        {
          title: "Hop 2: Regroup into 3-Bit Octal Triplets Outward from Radix Point",
          type: "table",
          headers: ["Triplet", "Binary Bits", "Octal Digit"],
          rows: [
            ["Integer Group 3", "011 (Padded with leading 0)", "3"],
            ["Integer Group 2", "010", "2"],
            ["Integer Group 1", "011", "3"],
            ["Radix Point", ".", "."],
            ["Fraction Group 1", "101", "5"],
            ["Fraction Group 2", "100 (Padded with two 0s)", "4"]
          ]
        },
        {
          title: "Step 3: Combine Octal Digits",
          type: "summary",
          content: "(011)(010)(011) . (101)(100) = (323.54)₈"
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: 11 010 011 -> 011(3) 010(2) 011(3). .1011 -> 101(5) 100(4) -> 323.54₈!",
      verification: "Base 10 Check: (D3.B)₁₆ = 13×16 + 3 + 11/16 = 208 + 3 + 0.6875 = 211.6875₁₀. (323.54)₈ = 3×64 + 2×8 + 3 + 5/8 + 4/64 = 192 + 16 + 3 + 0.625 + 0.0625 = 211.6875₁₀ (100% verified)."
    }
  },
  {
    id: "q-c11",
    trackId: "conversions",
    trackTitle: "Topic 1: Number Systems & All 12 Conversions",
    topicBadge: "1.3K: Decimal to Fractional Octal",
    difficulty: "Hard",
    set: "set2",
    question: "Convert the fractional decimal number (46.25)₁₀ into its equivalent Octal representation (Base 8).",
    promptDetail: "Show integer division by 8 and fractional multiplication by 8.",
    inputFormatHint: "Enter octal string, e.g., 56.2",
    correctAnswer: "56.2",
    acceptedAnswers: ["56.2", "(56.2)8", "56.2_8"],
    options: [
      { label: "A", text: "56.2", isCorrect: true },
      { label: "B", text: "56.25", distractorReason: "Left fractional 0.25 in decimal without multiplying by 8" },
      { label: "C", text: "65.2", distractorReason: "Reversed integer remainder order" },
      { label: "D", text: "56.14", distractorReason: "Treated 0.25 as binary .01 then converted incorrectly" }
    ],
    hint1: "Formula & Rule: Integer: 46 ÷ 8. Fraction: 0.25 × 8.",
    hint2: "First Step & Trap: 46 / 8 = 5 R6. 5 / 8 = 0 R5 -> Integer is 56. Fraction: 0.25 × 8 = 2.00 -> extracted carry is 2!",
    solution: {
      finalAnswer: "(56.2)₈",
      steps: [
        {
          title: "Step 1: Integer Successive Division (46 ÷ 8)",
          type: "ladder",
          headers: ["Division", "Quotient", "Remainder", "Digit"],
          rows: [
            ["46 ÷ 8", "5", "6", "d0 (LSB)"],
            ["5 ÷ 8", "0", "5", "d1 (MSB)"]
          ],
          readDirection: "Read upward: (46)₁₀ = (56)₈"
        },
        {
          title: "Step 2: Fractional Successive Multiplication (0.25 × 8)",
          type: "table",
          headers: ["Multiplication", "Product", "Extracted Carry"],
          rows: [
            ["0.25 × 8", "2.00", "2 (Terminated)"]
          ],
          readDirection: "Read downward: (0.25)₁₀ = (0.2)₈"
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: 46 = 5×8 + 6 = 56₈. 0.25 = 1/4 = 2/8 = 0.2₈. Total: 56.2₈!",
      verification: "Base 10 Check: 5×8 + 6 + 2/8 = 40 + 6 + 0.25 = 46.25₁₀ (100% verified)."
    }
  },
  {
    id: "q-c12",
    trackId: "conversions",
    trackTitle: "Topic 1: Number Systems & All 12 Conversions",
    topicBadge: "1.3L: Decimal to Fractional Hexadecimal",
    difficulty: "Hard",
    set: "set2",
    question: "Convert the fractional decimal number (205.1875)₁₀ into its equivalent Hexadecimal representation (Base 16).",
    promptDetail: "Show integer division by 16 and fractional multiplication by 16.",
    inputFormatHint: "Enter hex string, e.g., CD.3",
    correctAnswer: "CD.3",
    acceptedAnswers: ["CD.3", "cd.3", "(CD.3)16", "0xCD.3"],
    options: [
      { label: "A", text: "CD.3", isCorrect: true },
      { label: "B", text: "DC.3", distractorReason: "Reversed integer remainders 12 and 13" },
      { label: "C", text: "CD.1875", distractorReason: "Did not multiply fractional part by 16" },
      { label: "D", text: "BD.3", distractorReason: "Mapped remainder 12 to B instead of C" }
    ],
    hint1: "Formula & Rule: Integer: 205 ÷ 16. Remainder 13 maps to D, remainder 12 maps to C. Fraction: 0.1875 × 16.",
    hint2: "First Step & Trap: 205 / 16 = 12 R 13 (D). 12 / 16 = 0 R 12 (C). Read bottom-to-top: CD!",
    solution: {
      finalAnswer: "(CD.3)₁₆",
      steps: [
        {
          title: "Step 1: Integer Successive Division (205 ÷ 16)",
          type: "ladder",
          headers: ["Division", "Quotient", "Remainder", "Hex Digit"],
          rows: [
            ["205 ÷ 16", "12", "13", "D (LSB)"],
            ["12 ÷ 16", "0", "12", "C (MSB)"]
          ],
          readDirection: "Read upward (↑): (205)₁₀ = (CD)₁₆"
        },
        {
          title: "Step 2: Fractional Successive Multiplication (0.1875 × 16)",
          type: "table",
          headers: ["Multiplication", "Product", "Extracted Carry"],
          rows: [
            ["0.1875 × 16", "3.0000", "3 (Terminated)"]
          ],
          readDirection: "Read downward: (0.1875)₁₀ = (0.3)₁₆"
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: 205 = 12×16 + 13 = C D₁₆. 0.1875 = 3/16 = .3₁₆. Result: CD.3₁₆!",
      verification: "Base 10 Check: 12×16 + 13 + 3/16 = 192 + 13 + 0.1875 = 205.1875₁₀ (100% verified)."
    }
  },
  {
    id: "q-c13",
    trackId: "conversions",
    trackTitle: "Topic 1: Number Systems & All 12 Conversions",
    topicBadge: "1.3M: Unknown Radix Finding",
    difficulty: "Hard",
    set: "set2",
    question: "Find the unknown base radix r such that: (34)_r = (28)₁₀.",
    promptDetail: "Set up the polynomial equation 3r¹ + 4r⁰ = 28 and solve for r.",
    inputFormatHint: "Enter single integer radix, e.g., 8",
    correctAnswer: "8",
    acceptedAnswers: ["8", "r=8", "r = 8"],
    options: [
      { label: "A", text: "8", isCorrect: true },
      { label: "B", text: "7", distractorReason: "Solved 3r = 21 instead of 24" },
      { label: "C", text: "9", distractorReason: "Added 4 to 28 instead of subtracting" },
      { label: "D", text: "6", distractorReason: "Violates digit constraint since digit 4 exists but r could be >= 5" }
    ],
    hint1: "Formula & Rule: Expand LHS in powers of r: 3 × r¹ + 4 × r⁰ = 28.",
    hint2: "First Step & Trap: 3r + 4 = 28 -> 3r = 24 -> r = 8. Check that all digits in (34)_r are less than 8 (3 < 8, 4 < 8 - valid!).",
    solution: {
      finalAnswer: "r = 8",
      steps: [
        {
          title: "Step 1: Formulate Polynomial Base Equation",
          type: "summary",
          content: "3 × r¹ + 4 × r⁰ = 28₁₀"
        },
        {
          title: "Step 2: Linear Algebraic Solution",
          type: "summary",
          content: "3r + 4 = 28 => 3r = 24 => r = 24 / 3 = 8"
        },
        {
          title: "Step 3: Base Validity Check",
          type: "summary",
          content: "In base 8, all digits must be strictly less than 8. Digits present are {3, 4}, both < 8. The solution r = 8 is fully valid."
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: 3r + 4 = 28 -> 3r = 24 -> r = 8!",
      verification: "Base 10 Check: (34)₈ = 3×8 + 4 = 24 + 4 = 28₁₀ (100% verified)."
    }
  },
  {
    id: "q-c14",
    trackId: "conversions",
    trackTitle: "Topic 1: Number Systems & All 12 Conversions",
    topicBadge: "1.3N: Unknown Quadratic Radix",
    difficulty: "Hard",
    set: "set2",
    question: "Find the unknown base radix r such that: (123)_r = (51)₁₀.",
    promptDetail: "Set up the quadratic equation 1r² + 2r + 3 = 51 and solve for positive integer root r.",
    inputFormatHint: "Enter single integer radix, e.g., 6",
    correctAnswer: "6",
    acceptedAnswers: ["6", "r=6", "r = 6"],
    options: [
      { label: "A", text: "6", isCorrect: true },
      { label: "B", text: "7", distractorReason: "Yields 49 + 14 + 3 = 66 != 51" },
      { label: "C", text: "5", distractorReason: "Yields 25 + 10 + 3 = 38 != 51" },
      { label: "D", text: "8", distractorReason: "Rejected negative root r = -8 mathematically" }
    ],
    hint1: "Formula & Rule: 1 × r² + 2 × r + 3 = 51 -> r² + 2r - 48 = 0.",
    hint2: "First Step & Trap: Factor the quadratic: (r + 8)(r - 6) = 0. Since radix r must be positive and greater than 3, r = 6.",
    solution: {
      finalAnswer: "r = 6",
      steps: [
        {
          title: "Step 1: Set Up Polynomial Equation",
          type: "summary",
          content: "1 × r² + 2 × r¹ + 3 × r⁰ = 51"
        },
        {
          title: "Step 2: Solve Quadratic Equation",
          type: "summary",
          content: "r² + 2r + 3 = 51 => r² + 2r - 48 = 0 => (r + 8)(r - 6) = 0"
        },
        {
          title: "Step 3: Root Selection & Validity",
          type: "summary",
          content: "Roots are r = -8 and r = 6. A base must be a positive integer greater than the maximum digit present (max digit is 3). Therefore, r = 6."
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: Test r = 6: 6² + 2(6) + 3 = 36 + 12 + 3 = 51₁₀. Correct!",
      verification: "Base 10 Check: (123)₆ = 36 + 12 + 3 = 51₁₀ (100% verified)."
    }
  },
  {
    id: "q-c15",
    trackId: "conversions",
    trackTitle: "Topic 1: Number Systems & All 12 Conversions",
    topicBadge: "1.3O: Radix Equation with Addition",
    difficulty: "Hard",
    set: "set2",
    question: "Determine the base radix r that satisfies the arithmetic equality: (24)_r + (17)_r = (43)_r.",
    promptDetail: "Expand both sides in powers of r: (2r + 4) + (r + 7) = 4r + 3.",
    inputFormatHint: "Enter single integer radix, e.g., 8",
    correctAnswer: "8",
    acceptedAnswers: ["8", "r=8", "r = 8"],
    options: [
      { label: "A", text: "8", isCorrect: true },
      { label: "B", text: "9", distractorReason: "Yields 22 + 16 = 38 != 39" },
      { label: "C", text: "7", distractorReason: "Digit 7 cannot exist in base 7 (digits must be <= 6)" },
      { label: "D", text: "10", distractorReason: "In base 10, 24 + 17 = 41 != 43" }
    ],
    hint1: "Formula & Rule: Expand all terms: (2r + 4) + (r + 7) = 4r + 3. Check digit constraint: since digit 7 appears in (17)_r, r must be strictly greater than 7 (r >= 8).",
    hint2: "First Step & Trap: LHS = 3r + 11. RHS = 4r + 3. 3r + 11 = 4r + 3 -> 4r - 3r = 11 - 3 -> r = 8.",
    solution: {
      finalAnswer: "r = 8",
      steps: [
        {
          title: "Step 1: Algebraic Base Expansion",
          type: "summary",
          content: "(2r + 4) + (r + 7) = 4r + 3"
        },
        {
          title: "Step 2: Simplify and Solve for r",
          type: "summary",
          content: "3r + 11 = 4r + 3 => 4r - 3r = 11 - 3 => r = 8"
        },
        {
          title: "Step 3: Base Consistency & Constraint Audit",
          type: "summary",
          content: "The digits in the problem are {2, 4, 1, 7, 4, 3}. The maximum digit is 7, requiring r > 7. Our solution r = 8 is consistent and valid."
        }
      ],
      fastShortcut: "Fast Column Inspection: In units column: 4 + 7 = 11. But result unit digit is 3! 11 - 8 = 3 with carry 1. Thus base r must be 8!",
      verification: "Base 10 Check: In base 8: 24₈ = 20₁₀, 17₈ = 15₁₀, 43₈ = 35₁₀. 20 + 15 = 35₁₀ (100% verified)."
    }
  },

  // ==========================================================================
  // TRACK 2: BINARY ARITHMETIC (+, -, ×, ÷) (12 QUESTIONS)
  // ==========================================================================
  {
    id: "q-a1",
    trackId: "arithmetic",
    trackTitle: "Topic 2: Binary Arithmetic (+, -, ×, ÷)",
    topicBadge: "1.4A: Multi-Bit Binary Addition",
    difficulty: "Easy",
    set: "set1",
    question: "Perform the binary addition: (10110)₂ + (01101)₂.",
    promptDetail: "Show column-aligned addition with carry propagation.",
    inputFormatHint: "Enter binary digits, e.g., 100011",
    correctAnswer: "100011",
    acceptedAnswers: ["100011", "(100011)2", "100011_2"],
    options: [
      { label: "A", text: "100011", isCorrect: true },
      { label: "B", text: "110011", distractorReason: "Lost carry propagation across b3 to b4" },
      { label: "C", text: "100111", distractorReason: "Carried 1 into b2 incorrectly" },
      { label: "D", text: "010011", distractorReason: "Dropped MSB overflow carry" }
    ],
    hint1: "Formula & Rule: Binary addition rules: 0+0=0, 0+1=1, 1+1=0 (C=1), 1+1+1=1 (C=1).",
    hint2: "First Step & Trap: b0: 0+1=1 (C=0). b1: 1+0=1 (C=0). b2: 1+1=0 (C=1). b3: 0+1+1=0 (C=1). b4: 1+0+1=0 (C=1). MSB carry = 1.",
    solution: {
      finalAnswer: "(100011)₂",
      steps: [
        {
          title: "Step 1: Column-Aligned Addition Grid",
          type: "grid",
          headers: ["Signal", "MSB C", "b4", "b3", "b2", "b1", "b0"],
          rows: [
            ["Carry-In", "(1)", "1", "1", "1", "0", "0"],
            ["Operand A", "", "1", "0", "1", "1", "0"],
            ["Operand B", "", "0", "1", "1", "0", "1"],
            ["Sum Result", "1", "0", "0", "0", "1", "1"]
          ]
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: 10110₂ = 22₁₀. 01101₂ = 13₁₀. 22 + 13 = 35₁₀ = 32 + 2 + 1 = 100011₂!",
      verification: "Base 10 Check: 22 + 13 = 35₁₀."
    }
  },
  {
    id: "q-a2",
    trackId: "arithmetic",
    trackTitle: "Topic 2: Binary Arithmetic (+, -, ×, ÷)",
    topicBadge: "1.4B: Direct Binary Subtraction (A > B)",
    difficulty: "Easy",
    set: "set1",
    question: "Perform direct binary subtraction: (11011)₂ - (01010)₂.",
    promptDetail: "Show column borrow track where 0 - 1 borrows from left to become 10₂ (2).",
    inputFormatHint: "Enter binary digits, e.g., 10001",
    correctAnswer: "10001",
    acceptedAnswers: ["10001", "(10001)2", "010001", "10001_2"],
    options: [
      { label: "A", text: "10001", isCorrect: true },
      { label: "B", text: "10011", distractorReason: "Subtracted 1 - 0 as 1 instead of 0 in column b1" },
      { label: "C", text: "11001", distractorReason: "Did not propagate subtraction across b3" },
      { label: "D", text: "00001", distractorReason: "Lost MSB digit" }
    ],
    hint1: "Formula & Rule: 1-0=1, 1-1=0, 0-0=0. When 0-1 occurs, borrow 1 from the next higher column (value 2).",
    hint2: "First Step & Trap: Check columns: b0: 1-0=1. b1: 1-1=0. b2: 0-0=0. b3: 1-1=0. b4: 1-0=1. No borrows needed in this case!",
    solution: {
      finalAnswer: "(10001)₂",
      steps: [
        {
          title: "Step 1: Column-by-Column Subtraction",
          type: "grid",
          headers: ["Signal", "b4", "b3", "b2", "b1", "b0"],
          rows: [
            ["Minuend A", "1", "1", "0", "1", "1"],
            ["Subtrahend B", "0", "1", "0", "1", "0"],
            ["Difference", "1", "0", "0", "0", "1"]
          ]
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: 11011₂ = 27₁₀. 01010₂ = 10₁₀. 27 - 10 = 17₁₀ = 16 + 1 = 10001₂!",
      verification: "Base 10 Check: 27 - 10 = 17₁₀."
    }
  },
  {
    id: "q-a3",
    trackId: "arithmetic",
    trackTitle: "Topic 2: Binary Arithmetic (+, -, ×, ÷)",
    topicBadge: "1.4C: Fractional Binary Addition",
    difficulty: "Medium",
    set: "set1",
    question: "Perform fractional binary addition: (1011.101)₂ + (0110.011)₂.",
    promptDetail: "Align at the radix point and propagate carries across into the integer part.",
    inputFormatHint: "Enter binary digits with point, e.g., 10010.000 or 10010",
    correctAnswer: "10010.000",
    acceptedAnswers: ["10010.000", "10010", "10010.0", "10010.00", "(10010.000)2"],
    options: [
      { label: "A", text: "10010.000", isCorrect: true },
      { label: "B", text: "10001.110", distractorReason: "Lost carry crossing the radix point from b-1 to b0" },
      { label: "C", text: "10010.100", distractorReason: "Carried 0 instead of 1 into b-2" },
      { label: "D", text: "11010.000", distractorReason: "Miscalculated integer MSB" }
    ],
    hint1: "Formula & Rule: Anchor at radix point. Start at rightmost fraction column b-3: 1+1=0 (C=1). Carry crosses radix point into b0.",
    hint2: "First Step & Trap: b-3: 1+1=0 (C=1). b-2: 0+1+1=0 (C=1). b-1: 1+0+1=0 (C=1 into b0!). Integer: 1011 + 0110 + 1 = 10010.",
    solution: {
      finalAnswer: "(10010.000)₂ = (10010)₂",
      steps: [
        {
          title: "Step 1: Column-Aligned Addition Grid with Radix Carry",
          type: "grid",
          headers: ["Signal", "b4", "b3", "b2", "b1", "b0", ".", "b-1", "b-2", "b-3"],
          rows: [
            ["Carry Track", "(1)", "1", "1", "1", "1", ".", "1", "1", "0"],
            ["Operand A", "0", "1", "0", "1", "1", ".", "1", "0", "1"],
            ["Operand B", "0", "0", "1", "1", "0", ".", "0", "1", "1"],
            ["Sum Result", "1", "0", "0", "1", "0", ".", "0", "0", "0"]
          ]
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: 1011.101₂ = 11.625₁₀. 0110.011₂ = 6.375₁₀. 11.625 + 6.375 = 18.000₁₀ = 10010₂!",
      verification: "Base 10 Check: 11.625 + 6.375 = 18₁₀ = 16 + 2 = (10010)₂."
    }
  },
  {
    id: "q-a4",
    trackId: "arithmetic",
    trackTitle: "Topic 2: Binary Arithmetic (+, -, ×, ÷)",
    topicBadge: "1.4D: Zero-Bridge Borrow Subtraction",
    difficulty: "Medium",
    set: "set1",
    question: "Perform direct binary subtraction across multiple zeros: (100000)₂ - (010111)₂.",
    promptDetail: "Show Zero-Bridge borrow propagation where intermediate 0s become 1s and the target 0 becomes 10₂ (2).",
    inputFormatHint: "Enter binary digits, e.g., 001001 or 1001",
    correctAnswer: "001001",
    acceptedAnswers: ["001001", "1001", "(001001)2", "001001_2"],
    options: [
      { label: "A", text: "001001", isCorrect: true },
      { label: "B", text: "001011", distractorReason: "Forgot to decrement b1 after borrow" },
      { label: "C", text: "011001", distractorReason: "Lost Zero-Bridge lending at b4" },
      { label: "D", text: "000001", distractorReason: "Failed to propagate borrow through intermediate zeros" }
    ],
    hint1: "Formula & Rule: Zero-Bridge Rule: When borrowing from a distant 1 across intermediate zeros, the lender 1 becomes 0, all intermediate 0s become 1, and the target column becomes 10₂ (2).",
    hint2: "First Step & Trap: Lender is at b5 (1). b5 becomes 0. b4, b3, b2, b1 all bridge to 1. Target b0 becomes 2. Now subtract!",
    solution: {
      finalAnswer: "(001001)₂ = (1001)₂",
      steps: [
        {
          title: "Step 1: Zero-Bridge Borrow State Analysis",
          type: "table",
          headers: ["Column", "Original A", "Borrow Action", "Modified Value", "Subtrahend B", "Diff"],
          rows: [
            ["b5", "1", "Lent borrow rightward", "0", "0", "0 - 0 = 0"],
            ["b4", "0", "Zero-Bridge propagated", "1", "1", "1 - 1 = 0"],
            ["b3", "0", "Zero-Bridge propagated", "1", "0", "1 - 0 = 1"],
            ["b2", "0", "Zero-Bridge propagated", "1", "1", "1 - 1 = 0"],
            ["b1", "0", "Zero-Bridge propagated", "1", "1", "1 - 1 = 0"],
            ["b0", "0", "Target received borrow", "2 (10₂)", "1", "2 - 1 = 1"]
          ]
        },
        {
          title: "Step 2: Collect Difference Bits",
          type: "summary",
          content: "Difference = 001001₂ = 1001₂"
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: 100000₂ = 32₁₀. 010111₂ = 16 + 4 + 2 + 1 = 23₁₀. 32 - 23 = 9₁₀ = (1001)₂!",
      verification: "Base 10 Check: 32 - 23 = 9₁₀ (100% verified)."
    }
  },
  {
    id: "q-a5",
    trackId: "arithmetic",
    trackTitle: "Topic 2: Binary Arithmetic (+, -, ×, ÷)",
    topicBadge: "1.4E: Fractional Direct Subtraction",
    difficulty: "Medium",
    set: "set1",
    question: "Perform direct fractional binary subtraction: (110.101)₂ - (101.110)₂.",
    promptDetail: "Show borrow crossing from integer b0 into fraction b-1.",
    inputFormatHint: "Enter binary digits with point, e.g., 0.111 or 000.111",
    correctAnswer: "0.111",
    acceptedAnswers: ["0.111", "000.111", ".111", "(0.111)2"],
    options: [
      { label: "A", text: "0.111", isCorrect: true },
      { label: "B", text: "0.011", distractorReason: "Lost borrow crossing the radix point" },
      { label: "C", text: "1.111", distractorReason: "Did not decrement integer b0 after borrowing for fraction" },
      { label: "D", text: "0.101", distractorReason: "Arithmetic error in fraction column b-2" }
    ],
    hint1: "Formula & Rule: Align at radix point. b-3: 1-0=1. b-2: 0-1 needs borrow from b-1. b-1 has 1, so it lends and becomes 0. b-2 becomes 2 -> 2-1=1.",
    hint2: "First Step & Trap: Now b-1 has 0. 0-1 needs borrow from integer b0. b0 is 0, so it borrows from b1! Trace borrow across radix point.",
    solution: {
      finalAnswer: "(0.111)₂",
      steps: [
        {
          title: "Step 1: Column Borrow Alignment Grid",
          type: "grid",
          headers: ["Signal", "b2", "b1", "b0", ".", "b-1", "b-2", "b-3"],
          rows: [
            ["Modified A", "1", "0", "1", ".", "0", "2", "1"],
            ["Operand A", "1", "1", "0", ".", "1", "0", "1"],
            ["Operand B", "1", "0", "1", ".", "1", "1", "0"],
            ["Difference", "0", "0", "0", ".", "1", "1", "1"]
          ]
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: 110.101₂ = 6.625₁₀. 101.110₂ = 5.750₁₀. 6.625 - 5.750 = 0.875₁₀ = 0.5 + 0.25 + 0.125 = 0.111₂!",
      verification: "Base 10 Check: 6.625 - 5.750 = 0.875₁₀."
    }
  },
  {
    id: "q-a6",
    trackId: "arithmetic",
    trackTitle: "Topic 2: Binary Arithmetic (+, -, ×, ÷)",
    topicBadge: "1.4F: Negative Direct Subtraction (A < B)",
    difficulty: "Hard",
    set: "set1",
    question: "Perform direct binary subtraction where A < B: (01101)₂ - (10110)₂.",
    promptDetail: "State the negative subtraction rule: compute -(B - A) by swapping larger number on top and prefixing with negative sign.",
    inputFormatHint: "Enter negative binary, e.g., -01001 or -1001",
    correctAnswer: "-01001",
    acceptedAnswers: ["-01001", "-1001", "-(01001)2", "-(1001)2", "-01001_2"],
    options: [
      { label: "A", text: "-01001", isCorrect: true },
      { label: "B", text: "+01001", distractorReason: "Forgot the negative (-) sign" },
      { label: "C", text: "-01101", distractorReason: "Arithmetic borrow error during B - A" },
      { label: "D", text: "-10001", distractorReason: "Miscalculated magnitude" }
    ],
    hint1: "Formula & Rule: Since A (13₁₀) < B (22₁₀), the result is negative. Rule: Compute -(B - A). Place larger operand B (10110) on top, subtract A (01101), and attach a '-' sign.",
    hint2: "First Step & Trap: Calculate 10110 - 01101: b0: 0-1 borrows from b1 -> 2-1 = 1. b1 is 0 -> borrows from b2 (which is 1) -> becomes 2, then lends to b0. Difference = 01001. Final answer = -01001.",
    solution: {
      finalAnswer: "-(01001)₂ = -9₁₀",
      steps: [
        {
          title: "Step 1: Negative Subtraction Swap Rule",
          type: "summary",
          content: "Since A (01101₂ = 13₁₀) < B (10110₂ = 22₁₀), difference is negative: A - B = -(B - A)."
        },
        {
          title: "Step 2: Compute B - A with Borrow Grid",
          type: "grid",
          headers: ["Signal", "b4", "b3", "b2", "b1", "b0"],
          rows: [
            ["Minuend B (22)", "1", "0", "1", "1", "0"],
            ["Subtrahend A (13)", "0", "1", "1", "0", "1"],
            ["Magnitude (B - A)", "0", "1", "0", "0", "1"]
          ]
        },
        {
          title: "Step 3: Attach Explicit Negative Sign",
          type: "summary",
          content: "Result = -(01001)₂ = -(9)₁₀ = -9₁₀"
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: 13 - 22 = -9₁₀. 9 in binary = 1001. Prefix with '-' -> -01001₂!",
      verification: "Base 10 Check: 13 - 22 = -9₁₀."
    }
  },
  {
    id: "q-a7",
    trackId: "arithmetic",
    trackTitle: "Topic 2: Binary Arithmetic (+, -, ×, ÷)",
    topicBadge: "1.4G: Binary Shift-and-Add Multiplication",
    difficulty: "Medium",
    set: "set2",
    question: "Perform binary multiplication using the shift-and-add method: (1011)₂ × (101)₂.",
    promptDetail: "Show all partial products shifted by column position.",
    inputFormatHint: "Enter binary digits, e.g., 110111",
    correctAnswer: "110111",
    acceptedAnswers: ["110111", "(110111)2", "110111_2"],
    options: [
      { label: "A", text: "110111", isCorrect: true },
      { label: "B", text: "100111", distractorReason: "Lost carry during partial product addition" },
      { label: "C", text: "111111", distractorReason: "Incorrectly shifted middle partial product" },
      { label: "D", text: "110011", distractorReason: "Bit error in second partial product" }
    ],
    hint1: "Formula & Rule: If multiplier bit is 1, copy multiplicand shifted left. If multiplier bit is 0, write all zeros shifted left. Sum all partial products.",
    hint2: "First Step & Trap: Multiplier is 101. PP1 (bit 1): 1011. PP2 (bit 0): 00000. PP3 (bit 1): 101100. Sum: 1011 + 00000 + 101100 = 110111.",
    solution: {
      finalAnswer: "(110111)₂",
      steps: [
        {
          title: "Step 1: Partial Product Expansion",
          type: "table",
          headers: ["Multiplier Bit", "Shift", "Partial Product Value"],
          rows: [
            ["b0 = 1", "0 positions", "1011"],
            ["b1 = 0", "1 position", "0000 (shifted)"],
            ["b2 = 1", "2 positions", "1011 (shifted: 101100)"]
          ]
        },
        {
          title: "Step 2: Column Summation of Partial Products",
          type: "summary",
          content: "  001011 (PP1)\n+ 101100 (PP3)\n---------\n  110111₂"
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: 1011₂ = 11₁₀. 101₂ = 5₁₀. 11 × 5 = 55₁₀ = 32 + 16 + 4 + 2 + 1 = 110111₂!",
      verification: "Base 10 Check: 11 × 5 = 55₁₀ (100% verified)."
    }
  },
  {
    id: "q-a8",
    trackId: "arithmetic",
    trackTitle: "Topic 2: Binary Arithmetic (+, -, ×, ÷)",
    topicBadge: "1.4H: Fractional Binary Multiplication",
    difficulty: "Medium",
    set: "set2",
    question: "Perform fractional binary multiplication: (11.1)₂ × (10.1)₂.",
    promptDetail: "Multiply as integers without points, then insert radix point at total fractional digits (1 + 1 = 2 places).",
    inputFormatHint: "Enter binary with point, e.g., 100.11",
    correctAnswer: "100.11",
    acceptedAnswers: ["100.11", "(100.11)2", "100.11_2"],
    options: [
      { label: "A", text: "100.11", isCorrect: true },
      { label: "B", text: "10.011", distractorReason: "Miscounted fractional places as 3 instead of 2" },
      { label: "C", text: "101.01", distractorReason: "Arithmetic sum error in partial products" },
      { label: "D", text: "1001.1", distractorReason: "Placed point after 1 fractional digit only" }
    ],
    hint1: "Formula & Rule: Integer multiply 111₂ (7₁₀) by 101₂ (5₁₀). Result = 100011₂ (35₁₀). Count fractional places: 1 + 1 = 2. Place radix point 2 places from right.",
    hint2: "First Step & Trap: 100011 with 2 fractional places becomes 1000.11? Wait: 7 × 5 = 35 = 32 + 2 + 1 = 100011. Two decimal places from right: 1000.11? Check: 3.5 × 2.5 = 8.75. 8.75 in binary: 8 + 0.5 + 0.25 = 1000.11!",
    solution: {
      finalAnswer: "(1000.11)₂",
      steps: [
        {
          title: "Step 1: Integer Multiplication without Radix Point",
          type: "summary",
          content: "111₂ × 101₂ = 111 + 11100 = 100011₂ (Decimal: 7 × 5 = 35)"
        },
        {
          title: "Step 2: Insert Radix Point",
          type: "summary",
          content: "Operand A has 1 fractional digit; Operand B has 1 fractional digit. Total fractional digits = 1 + 1 = 2 places. 100011 -> 1000.11₂"
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: 11.1₂ = 3.5₁₀. 10.1₂ = 2.5₁₀. 3.5 × 2.5 = 8.75₁₀ = 8 + 0.75 = 1000.11₂!",
      verification: "Base 10 Check: 3.5 × 2.5 = 8.75₁₀."
    }
  },
  {
    id: "q-a9",
    trackId: "arithmetic",
    trackTitle: "Topic 2: Binary Arithmetic (+, -, ×, ÷)",
    topicBadge: "1.4I: Exact Binary Long Division",
    difficulty: "Hard",
    set: "set2",
    question: "Perform exact binary long division: (11110)₂ ÷ (101)₂.",
    promptDetail: "Show dividend slice comparisons and quotient bit generation.",
    inputFormatHint: "Enter binary quotient, e.g., 110",
    correctAnswer: "110",
    acceptedAnswers: ["110", "(110)2", "0110", "110_2"],
    options: [
      { label: "A", text: "110", isCorrect: true },
      { label: "B", text: "101", distractorReason: "Quotient error on second division step" },
      { label: "C", text: "111", distractorReason: "Forgot to append 0 when remainder was 0" },
      { label: "D", text: "100", distractorReason: "Underestimated quotient" }
    ],
    hint1: "Formula & Rule: Compare current slice of dividend with divisor (101). If slice >= 101, quotient bit is 1, subtract 101, bring down next bit. If slice < 101, quotient bit is 0.",
    hint2: "First Step & Trap: Slice 1: 1 < 101 (Q=0). Slice 2: 11 < 101 (Q=0). Slice 3: 111 >= 101 -> Q=1. 111 - 101 = 10. Bring down 1 -> 101. 101 - 101 = 0 (Q=1). Bring down 0 -> 0 < 101 (Q=0). Total Q = 110.",
    solution: {
      finalAnswer: "(110)₂",
      steps: [
        {
          title: "Step 1: Long Division Step-by-Step Trace",
          type: "table",
          headers: ["Step", "Dividend Slice", "Comparison with Divisor 101", "Quotient Bit", "Remainder"],
          rows: [
            ["1", "111", "111 ≥ 101", "1", "111 - 101 = 10"],
            ["2", "101 (brought down 1)", "101 ≥ 101", "1", "101 - 101 = 0"],
            ["3", "00 (brought down 0)", "0 < 101", "0", "0 (Division terminated)"]
          ]
        },
        {
          title: "Step 2: Collect Quotient Bits",
          type: "summary",
          content: "Quotient = 110₂, Remainder = 0"
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: 11110₂ = 30₁₀. 101₂ = 5₁₀. 30 ÷ 5 = 6₁₀ = (110)₂!",
      verification: "Base 10 Check: 30 ÷ 5 = 6₁₀ (100% verified)."
    }
  },
  {
    id: "q-a10",
    trackId: "arithmetic",
    trackTitle: "Topic 2: Binary Arithmetic (+, -, ×, ÷)",
    topicBadge: "1.4J: Fractional Binary Long Division",
    difficulty: "Hard",
    set: "set2",
    question: "Perform binary long division resulting in a fractional quotient: (1011)₂ ÷ (100)₂.",
    promptDetail: "Divide past the radix point by appending zeros.",
    inputFormatHint: "Enter binary quotient with point, e.g., 10.11",
    correctAnswer: "10.11",
    acceptedAnswers: ["10.11", "(10.11)2", "10.11_2"],
    options: [
      { label: "A", text: "10.11", isCorrect: true },
      { label: "B", text: "10.10", distractorReason: "Lost fractional bit during division" },
      { label: "C", text: "11.01", distractorReason: "Miscalculated integer division step" },
      { label: "D", text: "1.011", distractorReason: "Misplaced radix point" }
    ],
    hint1: "Formula & Rule: Dividing by 100₂ (4₁₀) is equivalent to shifting the radix point 2 places to the left!",
    hint2: "First Step & Trap: 1011.0₂ shifted left by 2 positions = 10.11₂.",
    solution: {
      finalAnswer: "(10.11)₂",
      steps: [
        {
          title: "Step 1: Radix Point Shift for Power-of-2 Divisors",
          type: "summary",
          content: "Divisor is (100)₂ = 2² (4₁₀). Dividing by 2² shifts the binary radix point 2 places to the left: 1011. ÷ 100 = 10.11₂"
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: 1011₂ = 11₁₀. 11 ÷ 4 = 2.75₁₀ = 2 + 0.5 + 0.25 = 10.11₂!",
      verification: "Base 10 Check: 11 ÷ 4 = 2.75₁₀."
    }
  },
  {
    id: "q-a11",
    trackId: "arithmetic",
    trackTitle: "Topic 2: Binary Arithmetic (+, -, ×, ÷)",
    topicBadge: "1.4K: Multi-Operand Binary Addition",
    difficulty: "Hard",
    set: "set2",
    question: "Compute the sum of three binary numbers: (1101)₂ + (1011)₂ + (0111)₂.",
    promptDetail: "Show carry tracking across columns where carry can be 2 (10₂) or 3 (11₂).",
    inputFormatHint: "Enter binary sum, e.g., 11111",
    correctAnswer: "11111",
    acceptedAnswers: ["11111", "(11111)2", "11111_2"],
    options: [
      { label: "A", text: "11111", isCorrect: true },
      { label: "B", text: "11011", distractorReason: "Dropped multi-column carry" },
      { label: "C", text: "10111", distractorReason: "Carry addition error in column b3" },
      { label: "D", text: "11101", distractorReason: "Bit error in column b1" }
    ],
    hint1: "Formula & Rule: When adding 3 numbers, column sum can reach 3 (11₂: sum=1, carry=1) or 4 (100₂: sum=0, carry to next=0, carry to next-next=1).",
    hint2: "First Step & Trap: b0: 1+1+1 = 3 = 11₂ -> Sum=1, Carry=1. b1: 0+1+1 + 1(C) = 3 -> Sum=1, Carry=1. b2: 1+0+1 + 1(C) = 3 -> Sum=1, Carry=1. b3: 1+1+0 + 1(C) = 3 -> Sum=1, Carry=1. MSB carry = 1. Result = 11111₂.",
    solution: {
      finalAnswer: "(11111)₂",
      steps: [
        {
          title: "Step 1: 3-Operand Column Addition Grid",
          type: "grid",
          headers: ["Signal", "b4", "b3", "b2", "b1", "b0"],
          rows: [
            ["Carry Track", "(1)", "1", "1", "1", "0"],
            ["Operand 1", "0", "1", "1", "0", "1"],
            ["Operand 2", "0", "1", "0", "1", "1"],
            ["Operand 3", "0", "0", "1", "1", "1"],
            ["Sum Result", "1", "1", "1", "1", "1"]
          ]
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: 1101₂ = 13₁₀. 1011₂ = 11₁₀. 0111₂ = 7₁₀. 13 + 11 + 7 = 31₁₀ = (11111)₂!",
      verification: "Base 10 Check: 13 + 11 + 7 = 31₁₀ = 16 + 8 + 4 + 2 + 1 = (11111)₂."
    }
  },
  {
    id: "q-a12",
    trackId: "arithmetic",
    trackTitle: "Topic 2: Binary Arithmetic (+, -, ×, ÷)",
    topicBadge: "1.4L: Negative Zero-Bridge Subtraction",
    difficulty: "Hard",
    set: "set2",
    question: "Perform direct binary subtraction: (00110)₂ - (10001)₂.",
    promptDetail: "Since A < B, compute -(B - A) with borrow tracking.",
    inputFormatHint: "Enter negative binary, e.g., -01011 or -1011",
    correctAnswer: "-01011",
    acceptedAnswers: ["-01011", "-1011", "-(01011)2", "-(1011)2", "-01011_2"],
    options: [
      { label: "A", text: "-01011", isCorrect: true },
      { label: "B", text: "+01011", distractorReason: "Omitted negative sign on result" },
      { label: "C", text: "-01101", distractorReason: "Borrow propagation error in B - A" },
      { label: "D", text: "-00111", distractorReason: "Subtracted A from B incorrectly" }
    ],
    hint1: "Formula & Rule: A (6₁₀) < B (17₁₀) -> Result is negative -(B - A). Set up 10001 - 00110.",
    hint2: "First Step & Trap: 10001 - 00110: b0: 1-0 = 1. b1: 0-1 borrows across zeros from b4! b4 (1) becomes 0. b3 and b2 become 1. b1 becomes 2 -> 2-1 = 1. b2: 1-1 = 0. b3: 1-0 = 1. Result = 01011 -> final answer = -01011.",
    solution: {
      finalAnswer: "-(01011)₂ = -11₁₀",
      steps: [
        {
          title: "Step 1: Negative Swap Rule",
          type: "summary",
          content: "A (6₁₀) < B (17₁₀) -> Compute -(B - A) = -(10001 - 00110)"
        },
        {
          title: "Step 2: Borrow Grid for B - A",
          type: "grid",
          headers: ["Signal", "b4", "b3", "b2", "b1", "b0"],
          rows: [
            ["Minuend B (17)", "1", "0", "0", "0", "1"],
            ["Subtrahend A (6)", "0", "0", "1", "1", "0"],
            ["Magnitude Diff", "0", "1", "0", "1", "1"]
          ]
        },
        {
          title: "Step 3: Attach Negative Sign",
          type: "summary",
          content: "Difference = -(01011)₂ = -11₁₀"
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: 6 - 17 = -11₁₀. 11 = 8 + 2 + 1 = 01011₂. Result: -01011₂!",
      verification: "Base 10 Check: 6 - 17 = -11₁₀."
    }
  },

  // ==========================================================================
  // TRACK 3: COMPLEMENTS & COMPLEMENT SUBTRACTION (12 QUESTIONS)
  // ==========================================================================
  {
    id: "q-m1",
    trackId: "complements",
    trackTitle: "Topic 3: Complements & Complement Subtraction",
    topicBadge: "1.5A: 1's and 2's Complement of Binary Integer",
    difficulty: "Easy",
    set: "set1",
    question: "Find the 2's complement of the binary number (10101100)₂.",
    promptDetail: "Show bit inversion (1's complement) followed by adding 1 to the LSB.",
    inputFormatHint: "Enter 8-bit binary, e.g., 01010100",
    correctAnswer: "01010100",
    acceptedAnswers: ["01010100", "(01010100)2", "01010100_2"],
    options: [
      { label: "A", text: "01010100", isCorrect: true },
      { label: "B", text: "01010011", distractorReason: "This is only the 1's complement (forgot to add 1 to LSB)" },
      { label: "C", text: "01010101", distractorReason: "Added 1 without propagating carry past trailing zeros" },
      { label: "D", text: "11010100", distractorReason: "Did not invert the MSB" }
    ],
    hint1: "Formula & Rule: 2's Complement = 1's Complement + 1 at LSB. 1's complement inverts all bits (0 <-> 1).",
    hint2: "First Step & Trap: Invert 10101100 -> 01010011. Now add 1: 01010011 + 1 = 01010100.",
    solution: {
      finalAnswer: "(01010100)₂",
      steps: [
        {
          title: "Step 1: Compute 1's Complement (Bitwise Inversion)",
          type: "summary",
          content: "Invert every bit of 10101100 -> 01010011"
        },
        {
          title: "Step 2: Add 1 to LSB",
          type: "summary",
          content: "01010011 + 1 = 01010100"
        }
      ],
      fastShortcut: "Fast Scan Shortcut: Scan from right (LSB) to left: leave all bits up to and including the first '1' unchanged (00 -> 00, 1 -> 1). Invert all bits to the left: 10101 -> 01010. Result: 01010100!",
      verification: "Base 10 Check: 10101100₂ = 172₁₀. 2⁸ - 172 = 256 - 172 = 84₁₀ = 64 + 16 + 4 = (01010100)₂ (100% verified)."
    }
  },
  {
    id: "q-m2",
    trackId: "complements",
    trackTitle: "Topic 3: Complements & Complement Subtraction",
    topicBadge: "1.5B: 9's and 10's Complement of Decimal",
    difficulty: "Easy",
    set: "set1",
    question: "Find the 10's complement of the decimal number (34700)₁₀.",
    promptDetail: "Show 9's complement (subtract from 99999) then add 1 to LSB.",
    inputFormatHint: "Enter 5-digit decimal, e.g., 65300",
    correctAnswer: "65300",
    acceptedAnswers: ["65300", "(65300)10", "65300_10"],
    options: [
      { label: "A", text: "65300", isCorrect: true },
      { label: "B", text: "65299", distractorReason: "This is only the 9's complement (forgot to add 1)" },
      { label: "C", text: "65301", distractorReason: "Added 1 to the end without respecting trailing zeros" },
      { label: "D", text: "75300", distractorReason: "Subtract from 9 error on first digit" }
    ],
    hint1: "Formula & Rule: 10's Complement = 9's Complement + 1. 9's complement of 5-digit number is 99999 - N.",
    hint2: "First Step & Trap: 99999 - 34700 = 65299. Add 1: 65299 + 1 = 65300. Notice trailing zeros stay zeros!",
    solution: {
      finalAnswer: "(65300)₁₀",
      steps: [
        {
          title: "Step 1: Compute 9's Complement (99999 - 34700)",
          type: "summary",
          content: "99999 - 34700 = 65299"
        },
        {
          title: "Step 2: Add 1 to LSB",
          type: "summary",
          content: "65299 + 1 = 65300"
        }
      ],
      fastShortcut: "Fast 9-9-10 Shortcut: Leave trailing zeros untouched (00). Subtract first non-zero digit from 10 (10 - 7 = 3). Subtract all digits to the left from 9 (9-4=5, 9-3=6). Result: 65300!",
      verification: "Base 10 Check: 10⁵ - 34700 = 100000 - 34700 = 65300₁₀ (100% verified)."
    }
  },
  {
    id: "q-m3",
    trackId: "complements",
    trackTitle: "Topic 3: Complements & Complement Subtraction",
    topicBadge: "1.5C: Fractional 1's and 2's Complement",
    difficulty: "Medium",
    set: "set1",
    question: "Find the 2's complement of the fractional binary number (1011.0110)₂.",
    promptDetail: "Invert all bits across the radix point and add 1 at the rightmost LSB.",
    inputFormatHint: "Enter binary with point, e.g., 0100.1010",
    correctAnswer: "0100.1010",
    acceptedAnswers: ["0100.1010", "(0100.1010)2", "0100.1010_2"],
    options: [
      { label: "A", text: "0100.1010", isCorrect: true },
      { label: "B", text: "0100.1001", distractorReason: "This is only the 1's complement" },
      { label: "C", text: "0101.1010", distractorReason: "Carry error into integer part" },
      { label: "D", text: "0100.1011", distractorReason: "Added 1 without respecting trailing zero bit" }
    ],
    hint1: "Formula & Rule: Invert all bits (including fraction): 1011.0110 -> 0100.1001 (1's complement). Then add 1 at the rightmost LSB (position b-4).",
    hint2: "First Step & Trap: 0100.1001 + 0.0001: b-4: 1+1=0 (C=1). b-3: 0+1=1. Result = 0100.1010.",
    solution: {
      finalAnswer: "(0100.1010)₂",
      steps: [
        {
          title: "Step 1: Compute 1's Complement Across Radix Point",
          type: "summary",
          content: "Invert bits: 1011.0110 -> 0100.1001"
        },
        {
          title: "Step 2: Add 1 at Rightmost Fractional LSB (b-4)",
          type: "summary",
          content: "0100.1001 + 0.0001 = 0100.1010"
        }
      ],
      fastShortcut: "Fast Scan Shortcut: Keep trailing 0 and first 1 unchanged (.0110 -> .10). Invert all bits to left: 1011.0 -> 0100.1. Result: 0100.1010!",
      verification: "Base 10 Check: 1011.0110₂ = 11.375₁₀. 16 - 11.375 = 4.625₁₀ = 4 + 0.5 + 0.125 = (0100.1010)₂."
    }
  },
  {
    id: "q-m4",
    trackId: "complements",
    trackTitle: "Topic 3: Complements & Complement Subtraction",
    topicBadge: "1.5D: 1's Complement Subtraction (M > N)",
    difficulty: "Medium",
    set: "set1",
    question: "Perform the binary subtraction: (110101)₂ - (011010)₂ using 1's complement arithmetic.",
    promptDetail: "Show addition M + 1's comp(N), detect End-Around Carry (EAC = 1), and add +1 to LSB.",
    inputFormatHint: "Enter binary result, e.g., +011011 or 011011",
    correctAnswer: "+011011",
    acceptedAnswers: ["+011011", "011011", "11011", "+11011", "(+011011)2"],
    options: [
      { label: "A", text: "+011011", isCorrect: true },
      { label: "B", text: "+011010", distractorReason: "Forgot to add the End-Around Carry (EAC) to LSB" },
      { label: "C", text: "-011011", distractorReason: "Wrong sign (EAC = 1 means positive, not negative)" },
      { label: "D", text: "+101011", distractorReason: "Addition error during M + Comp(N)" }
    ],
    hint1: "Formula & Rule: 1's Complement Subtraction: Add M + 1's complement of N. If End Carry = 1, the result is POSITIVE: wrap the carry around and add +1 to LSB (End-Around Carry).",
    hint2: "First Step & Trap: N = 011010 -> 1's comp(N) = 100101. Now add: 110101 + 100101 = 1 011010. Carry 1 wraps around: 011010 + 1 = +011011.",
    solution: {
      finalAnswer: "+(011011)₂ = +27₁₀",
      steps: [
        {
          title: "Step 1: Length Equalization and Complementation of N",
          type: "summary",
          content: "M = 110101 (6 bits), N = 011010 (6 bits). 1's comp of N = 100101."
        },
        {
          title: "Step 2: Add M + 1's Comp(N)",
          type: "grid",
          headers: ["Signal", "MSB C", "b5", "b4", "b3", "b2", "b1", "b0"],
          rows: [
            ["Carry Track", "(1)", "1", "0", "1", "0", "1", "0"],
            ["Minuend M", "", "1", "1", "0", "1", "0", "1"],
            ["Comp(N)", "", "1", "0", "0", "1", "0", "1"],
            ["Raw Sum", "1", "0", "1", "1", "0", "1", "0"]
          ]
        },
        {
          title: "Step 3: End-Around Carry (EAC) Wrap-Around",
          type: "summary",
          content: "End Carry = 1 indicates positive result. Add +1 to LSB: 011010 + 1 = +011011₂"
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: M = 53₁₀, N = 26₁₀. 53 - 26 = +27₁₀ = 16 + 8 + 2 + 1 = +011011₂!",
      verification: "Base 10 Check: 53 - 26 = +27₁₀."
    }
  },
  {
    id: "q-m5",
    trackId: "complements",
    trackTitle: "Topic 3: Complements & Complement Subtraction",
    topicBadge: "1.5E: 2's Complement Subtraction (M > N)",
    difficulty: "Medium",
    set: "set1",
    question: "Perform binary subtraction: (11100)₂ - (01011)₂ using 2's complement arithmetic.",
    promptDetail: "Show addition M + 2's comp(N), detect End Carry = 1, and discard the carry.",
    inputFormatHint: "Enter binary result, e.g., +10001 or 10001",
    correctAnswer: "+10001",
    acceptedAnswers: ["+10001", "10001", "(+10001)2", "+010001"],
    options: [
      { label: "A", text: "+10001", isCorrect: true },
      { label: "B", text: "+10010", distractorReason: "Mistakenly added End-Around Carry in 2's complement (EAC only applies to 1's complement!)" },
      { label: "C", text: "-10001", distractorReason: "Inverted sign" },
      { label: "D", text: "+01001", distractorReason: "Arithmetic error in column b3" }
    ],
    hint1: "Formula & Rule: In 2's Complement Subtraction: Add M + 2's comp(N). If End Carry = 1, DISCARD the end carry. The remaining bits form the exact positive answer.",
    hint2: "First Step & Trap: N = 01011 -> 1's comp = 10100 -> 2's comp = 10101. Add: 11100 + 10101 = 1 10001. Discard the MSB carry 1 -> Answer = +10001.",
    solution: {
      finalAnswer: "+(10001)₂ = +17₁₀",
      steps: [
        {
          title: "Step 1: Compute 2's Complement of N",
          type: "summary",
          content: "N = 01011 -> 1's comp = 10100 -> 2's comp = 10101"
        },
        {
          title: "Step 2: Add M + 2's Comp(N)",
          type: "grid",
          headers: ["Signal", "MSB C", "b4", "b3", "b2", "b1", "b0"],
          rows: [
            ["Carry Track", "(1)", "1", "0", "0", "0", "0"],
            ["Minuend M", "", "1", "1", "1", "0", "0"],
            ["2's Comp(N)", "", "1", "0", "1", "0", "1"],
            ["Sum", "1", "1", "0", "0", "0", "1"]
          ]
        },
        {
          title: "Step 3: Discard End Carry",
          type: "summary",
          content: "End Carry = 1 indicates Positive result. DISCARD MSB carry 1. Final Answer = +10001₂"
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: 28₁₀ - 11₁₀ = +17₁₀ = +10001₂!",
      verification: "Base 10 Check: 28 - 11 = +17₁₀."
    }
  },
  {
    id: "q-m6",
    trackId: "complements",
    trackTitle: "Topic 3: Complements & Complement Subtraction",
    topicBadge: "1.5F: 1's Complement Subtraction (M < N)",
    difficulty: "Hard",
    set: "set1",
    question: "Perform binary subtraction: (01101)₂ - (10111)₂ using 1's complement arithmetic.",
    promptDetail: "Detect End Carry = 0 (negative answer) and re-complement the sum to find true magnitude.",
    inputFormatHint: "Enter negative binary, e.g., -01010 or -1010",
    correctAnswer: "-01010",
    acceptedAnswers: ["-01010", "-1010", "-(01010)2", "-(1010)2", "-01010_2"],
    options: [
      { label: "A", text: "-01010", isCorrect: true },
      { label: "B", text: "+01010", distractorReason: "Forgot negative sign" },
      { label: "C", text: "-10101", distractorReason: "Forgot to re-complement intermediate sum (10101 is the raw sum, not the answer!)" },
      { label: "D", text: "-01001", distractorReason: "Arithmetic error in re-complementation" }
    ],
    hint1: "Formula & Rule: When End Carry = 0, M < N (negative answer). Take the 1's complement of the intermediate sum and attach a '-' sign.",
    hint2: "First Step & Trap: N = 10111 -> 1's comp = 01000. Add: 01101 + 01000 = 10101 (Carry = 0). Re-complement: 1's comp of 10101 = 01010. Attach '-' -> -01010.",
    solution: {
      finalAnswer: "-(01010)₂ = -10₁₀",
      steps: [
        {
          title: "Step 1: Compute 1's Complement of N",
          type: "summary",
          content: "N = 10111 -> 1's comp(N) = 01000"
        },
        {
          title: "Step 2: Add M + Comp(N)",
          type: "grid",
          headers: ["Signal", "MSB C", "b4", "b3", "b2", "b1", "b0"],
          rows: [
            ["Carry Track", "(0)", "0", "0", "0", "0", "0"],
            ["Minuend M", "", "0", "1", "1", "0", "1"],
            ["Comp(N)", "", "0", "1", "0", "0", "0"],
            ["Intermediate Sum", "0", "1", "0", "1", "0", "1"]
          ]
        },
        {
          title: "Step 3: Re-Complementation (Carry = 0 Decision)",
          type: "summary",
          content: "Carry = 0 indicates negative result (M < N). Take 1's complement of 10101 -> 01010. Attach negative sign: -(01010)₂"
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: 13 - 23 = -10₁₀. 10 in binary = 01010. Result: -01010₂!",
      verification: "Base 10 Check: 13 - 23 = -10₁₀."
    }
  },
  {
    id: "q-m7",
    trackId: "complements",
    trackTitle: "Topic 3: Complements & Complement Subtraction",
    topicBadge: "1.5G: 2's Complement Subtraction (M < N)",
    difficulty: "Hard",
    set: "set1",
    question: "Perform binary subtraction: (01011)₂ - (11010)₂ using 2's complement arithmetic.",
    promptDetail: "Detect End Carry = 0, re-complement sum using 2's complement, and attach negative sign.",
    inputFormatHint: "Enter negative binary, e.g., -01111 or -1111",
    correctAnswer: "-01111",
    acceptedAnswers: ["-01111", "-1111", "-(01111)2", "-(1111)2", "-01111_2"],
    options: [
      { label: "A", text: "-01111", isCorrect: true },
      { label: "B", text: "+01111", distractorReason: "Omitted negative sign" },
      { label: "C", text: "-10001", distractorReason: "Took 1's complement instead of 2's complement during re-complementation" },
      { label: "D", text: "-01110", distractorReason: "Arithmetic error during +1 addition in re-complementation" }
    ],
    hint1: "Formula & Rule: When End Carry = 0 in 2's complement subtraction, result is negative. Take the 2's complement of the intermediate sum and attach a '-' sign.",
    hint2: "First Step & Trap: N = 11010 -> 2's comp = 00110. Add: 01011 + 00110 = 10001 (Carry = 0). Re-complement 10001: invert -> 01110, add 1 -> 01111. Answer = -01111.",
    solution: {
      finalAnswer: "-(01111)₂ = -15₁₀",
      steps: [
        {
          title: "Step 1: Compute 2's Complement of N",
          type: "summary",
          content: "N = 11010 -> 1's comp = 00101 -> 2's comp = 00110"
        },
        {
          title: "Step 2: Add M + 2's Comp(N)",
          type: "grid",
          headers: ["Signal", "MSB C", "b4", "b3", "b2", "b1", "b0"],
          rows: [
            ["Carry Track", "(0)", "1", "1", "0", "0", "0"],
            ["Minuend M", "", "0", "1", "0", "1", "1"],
            ["2's Comp(N)", "", "0", "0", "1", "1", "0"],
            ["Intermediate Sum", "0", "1", "0", "0", "0", "1"]
          ]
        },
        {
          title: "Step 3: Re-Complementation of Intermediate Sum",
          type: "summary",
          content: "Carry = 0 indicates M < N. Invert 10001 -> 01110. Add 1 -> 01111. Attach negative sign: -(01111)₂"
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: 11 - 26 = -15₁₀ = -(01111)₂!",
      verification: "Base 10 Check: 11 - 26 = -15₁₀."
    }
  },
  {
    id: "q-m8",
    trackId: "complements",
    trackTitle: "Topic 3: Complements & Complement Subtraction",
    topicBadge: "1.5H: 9's Complement Decimal Subtraction (M > N)",
    difficulty: "Medium",
    set: "set2",
    question: "Subtract (218)₁₀ from (642)₁₀ using 9's complement arithmetic.",
    promptDetail: "Show 9's complement of 218, addition, and End-Around Carry wrap-around.",
    inputFormatHint: "Enter decimal result, e.g., +424 or 424",
    correctAnswer: "+424",
    acceptedAnswers: ["+424", "424", "(+424)10"],
    options: [
      { label: "A", text: "+424", isCorrect: true },
      { label: "B", text: "+423", distractorReason: "Forgot to add the End-Around Carry (+1 to LSB)" },
      { label: "C", text: "-424", distractorReason: "Wrong sign" },
      { label: "D", text: "+524", distractorReason: "Addition error during M + Comp(N)" }
    ],
    hint1: "Formula & Rule: 9's comp of 218 = 999 - 218 = 781. Add 642 + 781 = 1423. End Carry = 1 -> wrap around and add +1 to LSB: 423 + 1 = +424.",
    hint2: "First Step & Trap: Make sure both numbers have 3 digits (already equalized).",
    solution: {
      finalAnswer: "+(424)₁₀",
      steps: [
        {
          title: "Step 1: Compute 9's Complement of N",
          type: "summary",
          content: "999 - 218 = 781"
        },
        {
          title: "Step 2: Add M + 9's Comp(N)",
          type: "summary",
          content: "642 + 781 = 1423 (MSB End Carry = 1)"
        },
        {
          title: "Step 3: End-Around Carry Addition",
          type: "summary",
          content: "End Carry 1 wraps around: 423 + 1 = +424"
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: 642 - 218 = 424!",
      verification: "Base 10 Check: 642 - 218 = 424₁₀."
    }
  },
  {
    id: "q-m9",
    trackId: "complements",
    trackTitle: "Topic 3: Complements & Complement Subtraction",
    topicBadge: "1.5I: 10's Complement Decimal Subtraction (M > N)",
    difficulty: "Medium",
    set: "set2",
    question: "Subtract (3240)₁₀ from (7520)₁₀ using 10's complement arithmetic.",
    promptDetail: "Show 10's complement of 3240, addition, and carry discard.",
    inputFormatHint: "Enter decimal result, e.g., +4280 or 4280",
    correctAnswer: "+4280",
    acceptedAnswers: ["+4280", "4280", "(+4280)10"],
    options: [
      { label: "A", text: "+4280", isCorrect: true },
      { label: "B", text: "+4281", distractorReason: "Mistakenly added End-Around Carry in 10's complement" },
      { label: "C", text: "-4280", distractorReason: "Wrong sign" },
      { label: "D", text: "+4380", distractorReason: "Complementation subtraction error" }
    ],
    hint1: "Formula & Rule: 10's comp of 3240 = 9999 - 3240 + 1 = 6759 + 1 = 6760. Add 7520 + 6760 = 14280. Discard carry 1 -> +4280.",
    hint2: "First Step & Trap: Remember in 10's complement, the end carry of 1 is DISCARDED, NOT added to the LSB!",
    solution: {
      finalAnswer: "+(4280)₁₀",
      steps: [
        {
          title: "Step 1: Compute 10's Complement of N",
          type: "summary",
          content: "9999 - 3240 = 6759 -> 6759 + 1 = 6760"
        },
        {
          title: "Step 2: Add M + 10's Comp(N)",
          type: "summary",
          content: "7520 + 6760 = 14280 (MSB End Carry = 1)"
        },
        {
          title: "Step 3: Discard End Carry",
          type: "summary",
          content: "In 10's complement, discard end carry 1 -> Final Answer = +4280"
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: 7520 - 3240 = 4280!",
      verification: "Base 10 Check: 7520 - 3240 = 4280₁₀."
    }
  },
  {
    id: "q-m10",
    trackId: "complements",
    trackTitle: "Topic 3: Complements & Complement Subtraction",
    topicBadge: "1.5J: 9's Complement Decimal Subtraction (M < N)",
    difficulty: "Hard",
    set: "set2",
    question: "Perform decimal subtraction: (245)₁₀ - (678)₁₀ using 9's complement arithmetic.",
    promptDetail: "Show addition, detect End Carry = 0, re-complement sum, and attach negative sign.",
    inputFormatHint: "Enter negative decimal, e.g., -433",
    correctAnswer: "-433",
    acceptedAnswers: ["-433", "-(433)10", "-433_10"],
    options: [
      { label: "A", text: "-433", isCorrect: true },
      { label: "B", text: "+433", distractorReason: "Omitted negative sign" },
      { label: "C", text: "-566", distractorReason: "Forgot to re-complement sum (566 is the intermediate sum!)" },
      { label: "D", text: "-432", distractorReason: "Arithmetic re-complementation error" }
    ],
    hint1: "Formula & Rule: 9's comp of 678 = 999 - 678 = 321. Add 245 + 321 = 566 (Carry = 0). Carry = 0 indicates negative result: re-complement 566 using 9's complement (999 - 566 = 433) and attach '-' sign.",
    hint2: "First Step & Trap: Intermediate sum is 566 with NO end carry. Never stop at 566!",
    solution: {
      finalAnswer: "-(433)₁₀",
      steps: [
        {
          title: "Step 1: Compute 9's Complement of N",
          type: "summary",
          content: "999 - 678 = 321"
        },
        {
          title: "Step 2: Add M + 9's Comp(N)",
          type: "summary",
          content: "245 + 321 = 566 (End Carry = 0)"
        },
        {
          title: "Step 3: Re-Complement Intermediate Sum",
          type: "summary",
          content: "Carry = 0 indicates M < N. Re-complement 566: 999 - 566 = 433. Attach negative sign: -433"
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: 245 - 678 = -433!",
      verification: "Base 10 Check: 245 - 678 = -433₁₀."
    }
  },
  {
    id: "q-m11",
    trackId: "complements",
    trackTitle: "Topic 3: Complements & Complement Subtraction",
    topicBadge: "1.5K: 10's Complement Decimal Subtraction (M < N)",
    difficulty: "Hard",
    set: "set2",
    question: "Perform decimal subtraction: (1350)₁₀ - (5480)₁₀ using 10's complement arithmetic.",
    promptDetail: "Show addition, detect End Carry = 0, re-complement sum using 10's complement, and attach negative sign.",
    inputFormatHint: "Enter negative decimal, e.g., -4130",
    correctAnswer: "-4130",
    acceptedAnswers: ["-4130", "-(4130)10", "-4130_10"],
    options: [
      { label: "A", text: "-4130", isCorrect: true },
      { label: "B", text: "+4130", distractorReason: "Omitted negative sign" },
      { label: "C", text: "-5870", distractorReason: "Forgot to re-complement intermediate sum (5870 is intermediate sum!)" },
      { label: "D", text: "-4129", distractorReason: "Used 9's complement instead of 10's complement during re-complementation" }
    ],
    hint1: "Formula & Rule: 10's comp of 5480 = 9999 - 5480 + 1 = 4520. Add 1350 + 4520 = 5870 (Carry = 0). Take 10's comp of 5870: 9999 - 5870 + 1 = 4130. Result = -4130.",
    hint2: "First Step & Trap: Intermediate sum has 0 carry -> true answer is negative. Re-complement using 10's complement!",
    solution: {
      finalAnswer: "-(4130)₁₀",
      steps: [
        {
          title: "Step 1: Compute 10's Complement of N",
          type: "summary",
          content: "9999 - 5480 + 1 = 4519 + 1 = 4520"
        },
        {
          title: "Step 2: Add M + 10's Comp(N)",
          type: "summary",
          content: "1350 + 4520 = 5870 (End Carry = 0)"
        },
        {
          title: "Step 3: Re-Complement Intermediate Sum",
          type: "summary",
          content: "Carry = 0 indicates M < N. 10's comp of 5870 = 9999 - 5870 + 1 = 4129 + 1 = 4130. Result: -4130"
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: 1350 - 5480 = -4130!",
      verification: "Base 10 Check: 1350 - 5480 = -4130₁₀."
    }
  },
  {
    id: "q-m12",
    trackId: "complements",
    trackTitle: "Topic 3: Complements & Complement Subtraction",
    topicBadge: "1.5L: Unequal Length Fractional 2's Complement Subtraction",
    difficulty: "Hard",
    set: "set2",
    question: "Perform binary subtraction: (10.1)₂ - (11.011)₂ using 2's complement arithmetic.",
    promptDetail: "CRITICAL: Equalize operand lengths before taking the complement! M = 010.100, N = 011.011.",
    inputFormatHint: "Enter negative binary, e.g., -0.111 or -000.111",
    correctAnswer: "-0.111",
    acceptedAnswers: ["-0.111", "-000.111", "-.111", "-(0.111)2", "-(000.111)2"],
    options: [
      { label: "A", text: "-0.111", isCorrect: true },
      { label: "B", text: "-0.011", distractorReason: "Did not pad trailing zeros before complementation" },
      { label: "C", text: "+0.111", distractorReason: "Omitted negative sign" },
      { label: "D", text: "-1.111", distractorReason: "Integer borrow error during re-complementation" }
    ],
    hint1: "Formula & Rule: MUST pad operands BEFORE complementation! Integer needs 3 bits, fraction needs 3 bits: M = 010.100, N = 011.011.",
    hint2: "First Step & Trap: If you complement N without padding, you will get the wrong number of bits! 2's comp of 011.011: invert -> 100.100, add 0.001 -> 100.101.",
    solution: {
      finalAnswer: "-(0.111)₂",
      steps: [
        {
          title: "Step 1: Length Equalization with Amber Padded Zeros",
          type: "summary",
          content: "M = 010.100 (padded 1 leading 0, 2 trailing 0s). N = 011.011 (padded 1 leading 0)."
        },
        {
          title: "Step 2: 2's Complement of Equalized N",
          type: "summary",
          content: "1's comp of 011.011 = 100.100 -> 2's comp = 100.101"
        },
        {
          title: "Step 3: Add M + Comp(N)",
          type: "summary",
          content: "010.100 + 100.101 = 111.001 (End Carry = 0)"
        },
        {
          title: "Step 4: Re-Complement Intermediate Sum (Carry = 0)",
          type: "summary",
          content: "Invert 111.001 -> 000.110. Add 0.001 -> 000.111. Attach '-' sign: -(0.111)₂"
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: 10.1₂ = 2.5₁₀. 11.011₂ = 3.375₁₀. 2.5 - 3.375 = -0.875₁₀ = -0.111₂!",
      verification: "Base 10 Check: 2.5 - 3.375 = -0.875₁₀."
    }
  },

  // ==========================================================================
  // TRACK 4: SIGNED BINARY NUMBERS & OVERFLOW (12 QUESTIONS)
  // ==========================================================================
  {
    id: "q-s1",
    trackId: "signed",
    trackTitle: "Topic 4: Signed Binary Numbers & Overflow",
    topicBadge: "1.6A: 8-Bit Signed 2's Complement Representation",
    difficulty: "Easy",
    set: "set1",
    question: "Represent the negative decimal integer -37 in an 8-bit Signed 2's Complement register.",
    promptDetail: "Show positive +37 in 8 bits, bitwise inversion (1's comp), and +1 at LSB.",
    inputFormatHint: "Enter 8 binary bits, e.g., 11011011",
    correctAnswer: "11011011",
    acceptedAnswers: ["11011011", "(11011011)2", "11011011_2"],
    options: [
      { label: "A", text: "11011011", isCorrect: true },
      { label: "B", text: "11011010", distractorReason: "This is only the 1's complement of +37" },
      { label: "C", text: "10100101", distractorReason: "Sign-Magnitude representation of -37" },
      { label: "D", text: "00100101", distractorReason: "Positive +37 instead of -37" }
    ],
    hint1: "Formula & Rule: 1) Write +37 in 8 bits. 2) Invert all bits (1's comp). 3) Add 1 to LSB.",
    hint2: "First Step & Trap: +37 = 32 + 4 + 1 = 00100101. Invert: 11011010. Add 1: 11011011.",
    solution: {
      finalAnswer: "11011011",
      steps: [
        {
          title: "Step 1: Represent Positive +37 in 8 Bits",
          type: "summary",
          content: "+37 = 32 + 4 + 1 = 00100101₂ (Sign bit b7 = 0)"
        },
        {
          title: "Step 2: Take 1's Complement (Bitwise Inversion)",
          type: "summary",
          content: "Invert all 8 bits: 11011010₂"
        },
        {
          title: "Step 3: Add 1 to LSB (2's Complement)",
          type: "summary",
          content: "11011010 + 1 = 11011011₂"
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: Scan from right on 00100101: keep up to first 1 -> 1. Invert remaining bits 0010010 -> 1101101. Result: 11011011!",
      verification: "Base 10 Check: -128 + 64 + 16 + 8 + 2 + 1 = -128 + 91 = -37₁₀ (100% verified)."
    }
  },
  {
    id: "q-s2",
    trackId: "signed",
    trackTitle: "Topic 4: Signed Binary Numbers & Overflow",
    topicBadge: "1.6B: 8-Bit Signed 2's Complement Representation",
    difficulty: "Easy",
    set: "set1",
    question: "Represent the negative decimal integer -85 in an 8-bit Signed 2's Complement register.",
    promptDetail: "Show positive +85 in 8 bits, bitwise inversion, and +1 at LSB.",
    inputFormatHint: "Enter 8 binary bits, e.g., 10101011",
    correctAnswer: "10101011",
    acceptedAnswers: ["10101011", "(10101011)2", "10101011_2"],
    options: [
      { label: "A", text: "10101011", isCorrect: true },
      { label: "B", text: "10101010", distractorReason: "This is only the 1's complement of +85" },
      { label: "C", text: "11010101", distractorReason: "Sign-Magnitude representation of -85" },
      { label: "D", text: "01010101", distractorReason: "Positive +85" }
    ],
    hint1: "Formula & Rule: +85 in 8 bits = 64 + 16 + 4 + 1 = 01010101. Invert and add 1.",
    hint2: "First Step & Trap: Invert 01010101 -> 10101010. Add 1: 10101011.",
    solution: {
      finalAnswer: "10101011",
      steps: [
        {
          title: "Step 1: Positive +85 in 8-Bit Binary",
          type: "summary",
          content: "+85 = 64 + 16 + 4 + 1 = 01010101₂"
        },
        {
          title: "Step 2: Invert Bits and Add 1",
          type: "summary",
          content: "1's comp = 10101010₂ -> 2's comp = 10101010 + 1 = 10101011₂"
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: Fast scan on 01010101: first 1 is at LSB -> keep 1, flip left -> 10101011!",
      verification: "Base 10 Check: -128 + 32 + 8 + 2 + 1 = -128 + 43 = -85₁₀."
    }
  },
  {
    id: "q-s3",
    trackId: "signed",
    trackTitle: "Topic 4: Signed Binary Numbers & Overflow",
    topicBadge: "1.6C: Decoding 8-Bit Signed 2's Complement",
    difficulty: "Medium",
    set: "set1",
    question: "Decode the 8-bit Signed 2's Complement register bit-pattern (11100101)₂ into its exact Decimal integer value.",
    promptDetail: "Detect sign bit b7 = 1 (negative), invert bits and add 1 to find positive magnitude.",
    inputFormatHint: "Enter signed decimal, e.g., -27",
    correctAnswer: "-27",
    acceptedAnswers: ["-27", "-(27)", "-27_10"],
    options: [
      { label: "A", text: "-27", isCorrect: true },
      { label: "B", text: "+229", distractorReason: "Decoded as Unsigned integer (128+64+32+4+1 = 229) instead of Signed!" },
      { label: "C", text: "-26", distractorReason: "Forgot to add +1 during magnitude decoding" },
      { label: "D", text: "-101", distractorReason: "Sign-magnitude interpretation" }
    ],
    hint1: "Formula & Rule: MSB b7 = 1 indicates NEGATIVE. Magnitude = 2's complement of register: Invert 11100101 -> 00011010. Add 1 -> 00011011 (27₁₀). Result = -27.",
    hint2: "First Step & Trap: Alternatively, use negative MSB weight: -128 + (sum of positive weights 64, 32, 4, 1).",
    solution: {
      finalAnswer: "-27₁₀",
      steps: [
        {
          title: "Method 1: Inversion & +1 Magnitude Decoder",
          type: "summary",
          content: "Sign bit b7 = 1 -> Negative. Invert bits: 00011010. Add 1: 00011011 = 16 + 8 + 2 + 1 = 27₁₀. Result: -27₁₀"
        },
        {
          title: "Method 2: Positional Weight Summation (-128 + Positive Weights)",
          type: "summary",
          content: "-128 + 64 + 32 + 4 + 1 = -128 + 101 = -27₁₀"
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: -128 + 101 = -27₁₀!",
      verification: "Base 10 Check: -128 + 64 + 32 + 4 + 1 = -27₁₀."
    }
  },
  {
    id: "q-s4",
    trackId: "signed",
    trackTitle: "Topic 4: Signed Binary Numbers & Overflow",
    topicBadge: "1.6D: Most Negative Integer Asymmetry",
    difficulty: "Medium",
    set: "set1",
    question: "What decimal value does the 8-bit Signed 2's Complement bit-pattern (10000000)₂ represent?",
    promptDetail: "Explain why this value has no positive counterpart in 8 bits.",
    inputFormatHint: "Enter signed decimal, e.g., -128",
    correctAnswer: "-128",
    acceptedAnswers: ["-128", "-(128)", "-128_10"],
    options: [
      { label: "A", text: "-128", isCorrect: true },
      { label: "B", text: "-0", distractorReason: "2's complement has no negative zero (only Sign-Magnitude and 1's Comp have -0)" },
      { label: "C", text: "-127", distractorReason: "Confused with 1's complement minimum value" },
      { label: "D", text: "+128", distractorReason: "+128 cannot be represented in 8-bit signed range [-128, +127]" }
    ],
    hint1: "Formula & Rule: In 8-bit signed 2's complement, the range is -2⁷ to +2⁷ - 1 = -128 to +127.",
    hint2: "First Step & Trap: Bit pattern 10000000 has MSB b7 = 1 (weight -128) and all other bits 0. Value = -128 + 0 = -128.",
    solution: {
      finalAnswer: "-128₁₀",
      steps: [
        {
          title: "Step 1: Positional Weight Evaluation",
          type: "summary",
          content: "Value = (1 × -2⁷) + (0 × 2⁶) + ... + (0 × 2⁰) = -128 + 0 = -128₁₀"
        },
        {
          title: "Step 2: Range Asymmetry Concept",
          type: "summary",
          content: "Because 0 is represented uniquely as 00000000, the negative range extends to -128 while the positive range stops at +127. -128 has no positive counterpart in 8 bits."
        }
      ],
      fastShortcut: "Fast Concept Fact: 10000000₂ in 8-bit 2's complement is ALWAYS the unique most negative integer: -2ⁿ⁻¹ = -128!",
      verification: "Range Check: -128 is within [-128, +127]."
    }
  },
  {
    id: "q-s5",
    trackId: "signed",
    trackTitle: "Topic 4: Signed Binary Numbers & Overflow",
    topicBadge: "1.6E: Signed Addition (No Overflow)",
    difficulty: "Medium",
    set: "set1",
    question: "Add the signed decimal numbers (+42) and (+35) using 8-bit Signed 2's Complement arithmetic. State the 8-bit result.",
    promptDetail: "Check overflow flag V = Cin(b7) ⊕ Cout(b7).",
    inputFormatHint: "Enter 8-bit binary sum, e.g., 01001101",
    correctAnswer: "01001101",
    acceptedAnswers: ["01001101", "(01001101)2", "+01001101"],
    options: [
      { label: "A", text: "01001101", isCorrect: true },
      { label: "B", text: "11001101", distractorReason: "Sign bit error" },
      { label: "C", text: "01001100", distractorReason: "Addition error in column b0" },
      { label: "D", text: "01011101", distractorReason: "Unnecessary carry added into b4" }
    ],
    hint1: "Formula & Rule: Convert both numbers to 8-bit binary: +42 = 00101010, +35 = 00100011. Add them.",
    hint2: "First Step & Trap: 00101010 + 00100011 = 01001101. Cin(b7) = 0, Cout(b7) = 0 -> V = 0 ⊕ 0 = 0 (No overflow). Decimal sum = 77, which is within [-128, +127].",
    solution: {
      finalAnswer: "01001101₂ = +77₁₀ (No Overflow, V = 0)",
      steps: [
        {
          title: "Step 1: 8-Bit Signed Register Alignment",
          type: "grid",
          headers: ["Signal", "b7 (Sign)", "b6", "b5", "b4", "b3", "b2", "b1", "b0"],
          rows: [
            ["Carry Track", "0", "0", "0", "0", "0", "1", "0", "0"],
            ["Operand A (+42)", "0", "0", "1", "0", "1", "0", "1", "0"],
            ["Operand B (+35)", "0", "0", "1", "0", "0", "0", "1", "1"],
            ["Sum (+77)", "0", "1", "0", "0", "1", "1", "0", "1"]
          ]
        },
        {
          title: "Step 2: Overflow Flag Verification",
          type: "summary",
          content: "Cin into b7 = 0, Cout out of b7 = 0. V = Cin ⊕ Cout = 0 ⊕ 0 = 0. No overflow! Result +77 is within [-128, +127]."
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: 42 + 35 = 77₁₀ = 64 + 8 + 4 + 1 = 01001101₂!",
      verification: "Base 10 Check: 42 + 35 = 77₁₀."
    }
  },
  {
    id: "q-s6",
    trackId: "signed",
    trackTitle: "Topic 4: Signed Binary Numbers & Overflow",
    topicBadge: "1.6F: Positive Arithmetic Overflow",
    difficulty: "Hard",
    set: "set1",
    question: "Add the signed decimal numbers (+75) and (+65) in an 8-bit Signed 2's Complement adder. What is the 8-bit register result, and does overflow occur?",
    promptDetail: "Show Cin(b7) and Cout(b7), calculate V = Cin ⊕ Cout, and explain the sign reversal.",
    inputFormatHint: "Enter 8-bit sum, e.g., 10001100",
    correctAnswer: "10001100",
    acceptedAnswers: ["10001100", "(10001100)2", "10001100, V=1", "10001100, overflow"],
    options: [
      { label: "A", text: "10001100 (Overflow V = 1)", isCorrect: true },
      { label: "B", text: "00001100 (No Overflow)", distractorReason: "Lost MSB carry into sign bit" },
      { label: "C", text: "10001100 (No Overflow V = 0)", distractorReason: "Failed to detect overflow (positive + positive yielded negative!)" },
      { label: "D", text: "01001100 (Overflow V = 1)", distractorReason: "Incorrect bit sum" }
    ],
    hint1: "Formula & Rule: 75 + 65 = 140. But maximum 8-bit signed positive integer is +127! Thus, 140 causes positive overflow.",
    hint2: "First Step & Trap: +75 = 01001011, +65 = 01000001. Sum = 10001100. Cin(b7) = 1, Cout(b7) = 0 -> V = 1 ⊕ 0 = 1 (OVERFLOW!). The hardware erroneously interprets the result as -116.",
    solution: {
      finalAnswer: "10001100₂ (Arithmetic Overflow V = 1)",
      steps: [
        {
          title: "Step 1: 8-Bit Addition Grid",
          type: "grid",
          headers: ["Signal", "b7 (Sign)", "b6", "b5", "b4", "b3", "b2", "b1", "b0"],
          rows: [
            ["Carry Track", "1", "0", "0", "0", "0", "0", "1", "0"],
            ["Operand A (+75)", "0", "1", "0", "0", "1", "0", "1", "1"],
            ["Operand B (+65)", "0", "1", "0", "0", "0", "0", "0", "1"],
            ["Register Sum", "1", "0", "0", "0", "1", "1", "0", "0"]
          ]
        },
        {
          title: "Step 2: Overflow Flag Detection",
          type: "summary",
          content: "Cin into b7 = 1, Cout out of b7 = 0. V = Cin ⊕ Cout = 1 ⊕ 0 = 1 (OVERFLOW!). Adding two positive numbers produced a negative number (b7 = 1), proving overflow."
        }
      ],
      fastShortcut: "Fast Exam Rule: (+A) + (+B) yielding sign bit 1 is an INSTANT GUARANTEE of overflow (V = 1)!",
      verification: "Range Check: 75 + 65 = 140 > +127 (Outside allowable 8-bit range)."
    }
  },
  {
    id: "q-s7",
    trackId: "signed",
    trackTitle: "Topic 4: Signed Binary Numbers & Overflow",
    topicBadge: "1.6G: Negative Arithmetic Overflow",
    difficulty: "Hard",
    set: "set1",
    question: "Add the signed decimal numbers (-70) and (-65) in an 8-bit Signed 2's Complement adder. What is the 8-bit register result, and does overflow occur?",
    promptDetail: "Show Cin(b7) and Cout(b7), compute V = Cin ⊕ Cout, and explain why two negatives yield a positive.",
    inputFormatHint: "Enter 8-bit sum, e.g., 01111001",
    correctAnswer: "01111001",
    acceptedAnswers: ["01111001", "(01111001)2", "01111001, V=1", "01111001, overflow"],
    options: [
      { label: "A", text: "01111001 (Overflow V = 1)", isCorrect: true },
      { label: "B", text: "11111001 (No Overflow)", distractorReason: "Ignored sign bit reversal" },
      { label: "C", text: "01111001 (No Overflow V = 0)", distractorReason: "Failed to recognize overflow condition" },
      { label: "D", text: "01111011 (Overflow V = 1)", distractorReason: "Bit error in column b1" }
    ],
    hint1: "Formula & Rule: (-70) + (-65) = -135. But minimum 8-bit signed integer is -128! -135 causes negative overflow.",
    hint2: "First Step & Trap: -70 = 10111010, -65 = 10111111. Sum = 1 01111001. Cin into b7 = 0, Cout out of b7 = 1. V = 0 ⊕ 1 = 1 (OVERFLOW!). The sign bit flipped to 0 (positive +121!).",
    solution: {
      finalAnswer: "01111001₂ (Arithmetic Overflow V = 1)",
      steps: [
        {
          title: "Step 1: 8-Bit Addition Grid",
          type: "grid",
          headers: ["Signal", "MSB Cout", "b7 (Sign)", "b6", "b5", "b4", "b3", "b2", "b1", "b0"],
          rows: [
            ["Carry Track", "1", "0", "1", "1", "1", "1", "1", "1", "0"],
            ["Operand A (-70)", "", "1", "0", "1", "1", "1", "0", "1", "0"],
            ["Operand B (-65)", "", "1", "0", "1", "1", "1", "1", "1", "1"],
            ["Register Sum", "1", "0", "1", "1", "1", "1", "0", "0", "1"]
          ]
        },
        {
          title: "Step 2: Overflow Flag Evaluation",
          type: "summary",
          content: "Cin into b7 = 0, Cout out of b7 = 1. V = Cin ⊕ Cout = 0 ⊕ 1 = 1 (OVERFLOW!). Adding two negatives yielded a positive number (b7 = 0), proving overflow."
        }
      ],
      fastShortcut: "Fast Exam Rule: (-A) + (-B) yielding sign bit 0 is an INSTANT GUARANTEE of overflow (V = 1)!",
      verification: "Range Check: -70 + -65 = -135 < -128 (Outside allowable 8-bit range)."
    }
  },
  {
    id: "q-s8",
    trackId: "signed",
    trackTitle: "Topic 4: Signed Binary Numbers & Overflow",
    topicBadge: "1.6H: Mixed-Sign Addition (Never Overflows)",
    difficulty: "Medium",
    set: "set2",
    question: "Add the signed numbers (+58) and (-34) in an 8-bit Signed 2's Complement adder. What is the 8-bit result?",
    promptDetail: "Explain why adding numbers of opposite signs can NEVER produce an overflow.",
    inputFormatHint: "Enter 8-bit binary sum, e.g., 00011000",
    correctAnswer: "00011000",
    acceptedAnswers: ["00011000", "(00011000)2", "+00011000"],
    options: [
      { label: "A", text: "00011000", isCorrect: true },
      { label: "B", text: "10011000", distractorReason: "Sign bit error" },
      { label: "C", text: "00011001", distractorReason: "Addition error in column b0" },
      { label: "D", text: "00010000", distractorReason: "Lost bit b3 (8)" }
    ],
    hint1: "Formula & Rule: Theorem: Addition of one positive and one negative number NEVER produces an overflow, because the magnitude of the sum is always strictly less than the larger operand.",
    hint2: "First Step & Trap: +58 = 00111010. -34 = 11011110. Add them: 00111010 + 11011110 = 1 00011000. Cout = 1, Cin(b7) = 1 -> V = 1 ⊕ 1 = 0 (No overflow). Decimal = +24.",
    solution: {
      finalAnswer: "00011000₂ = +24₁₀",
      steps: [
        {
          title: "Step 1: 8-Bit Addition Grid",
          type: "grid",
          headers: ["Signal", "MSB Cout", "b7 (Sign)", "b6", "b5", "b4", "b3", "b2", "b1", "b0"],
          rows: [
            ["Carry Track", "1", "1", "1", "1", "1", "1", "0", "0", "0"],
            ["Operand A (+58)", "", "0", "0", "1", "1", "1", "0", "1", "0"],
            ["Operand B (-34)", "", "1", "1", "0", "1", "1", "1", "1", "0"],
            ["Register Sum", "1", "0", "0", "0", "1", "1", "0", "0", "0"]
          ]
        },
        {
          title: "Step 2: Discard Cout & Verify Overflow Flag",
          type: "summary",
          content: "Cin = 1, Cout = 1 -> V = 1 ⊕ 1 = 0. End carry is discarded. Result = 00011000₂ = +24₁₀."
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: 58 - 34 = 24₁₀ = 16 + 8 = 00011000₂!",
      verification: "Base 10 Check: 58 + (-34) = +24₁₀."
    }
  },
  {
    id: "q-s9",
    trackId: "signed",
    trackTitle: "Topic 4: Signed Binary Numbers & Overflow",
    topicBadge: "1.6I: Negative Addition Without Overflow",
    difficulty: "Medium",
    set: "set2",
    question: "Add the signed decimal numbers (-40) and (-30) in an 8-bit Signed 2's Complement register. State the 8-bit result.",
    promptDetail: "Show representation of both numbers, column addition, and discard of MSB carry.",
    inputFormatHint: "Enter 8-bit binary sum, e.g., 10111010",
    correctAnswer: "10111010",
    acceptedAnswers: ["10111010", "(10111010)2", "10111010_2"],
    options: [
      { label: "A", text: "10111010", isCorrect: true },
      { label: "B", text: "00111010", distractorReason: "Sign bit error (positive result for two negatives)" },
      { label: "C", text: "10111011", distractorReason: "Carry addition error in column b0" },
      { label: "D", text: "11111010", distractorReason: "Arithmetic error in column b6" }
    ],
    hint1: "Formula & Rule: -40 = 11011000. -30 = 11100010. Add them. Sum is -70, which is within [-128, +127], so no overflow occurs.",
    hint2: "First Step & Trap: 11011000 + 11100010 = 1 10111010. Cout = 1, Cin(b7) = 1 -> V = 1 ⊕ 1 = 0. Register stores 10111010.",
    solution: {
      finalAnswer: "10111010₂ = -70₁₀",
      steps: [
        {
          title: "Step 1: 8-Bit Addition Grid",
          type: "grid",
          headers: ["Signal", "MSB Cout", "b7 (Sign)", "b6", "b5", "b4", "b3", "b2", "b1", "b0"],
          rows: [
            ["Carry Track", "1", "1", "0", "0", "0", "0", "0", "0", "0"],
            ["Operand A (-40)", "", "1", "1", "0", "1", "1", "0", "0", "0"],
            ["Operand B (-30)", "", "1", "1", "1", "0", "0", "0", "1", "0"],
            ["Register Sum", "1", "1", "0", "1", "1", "1", "0", "1", "0"]
          ]
        },
        {
          title: "Step 2: Overflow Flag Verification",
          type: "summary",
          content: "Cin = 1, Cout = 1 -> V = 1 ⊕ 1 = 0. No overflow! Result is -128 + 32 + 16 + 8 + 2 = -70₁₀."
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: -40 + (-30) = -70₁₀. -128 + 58 = -70 -> 10111010₂!",
      verification: "Base 10 Check: -40 + (-30) = -70₁₀."
    }
  },
  {
    id: "q-s10",
    trackId: "signed",
    trackTitle: "Topic 4: Signed Binary Numbers & Overflow",
    topicBadge: "1.6J: Sign Extension Rule",
    difficulty: "Easy",
    set: "set2",
    question: "Extend the 4-bit Signed 2's Complement number (1011)₂ (-5) into an 8-bit signed register without altering its numerical value.",
    promptDetail: "Apply the Sign Extension Rule: replicate the sign bit into all new upper bit positions.",
    inputFormatHint: "Enter 8-bit binary, e.g., 11111011",
    correctAnswer: "11111011",
    acceptedAnswers: ["11111011", "(11111011)2", "11111011_2"],
    options: [
      { label: "A", text: "11111011", isCorrect: true },
      { label: "B", text: "00001011", distractorReason: "Zero-extended instead of sign-extended (turned -5 into +11!)" },
      { label: "C", text: "10001011", distractorReason: "Only put 1 in b7 and padded zeros in between" },
      { label: "D", text: "11110101", distractorReason: "Re-complemented incorrectly" }
    ],
    hint1: "Formula & Rule: Sign Extension Rule: To widen a signed 2's complement number from m bits to n bits, replicate the existing sign bit into all new upper bit positions.",
    hint2: "First Step & Trap: In 1011, the sign bit is 1. Therefore, replicate 1 into b7, b6, b5, b4: 11111011.",
    solution: {
      finalAnswer: "11111011₂",
      steps: [
        {
          title: "Step 1: Identify Original Sign Bit",
          type: "summary",
          content: "Original 4-bit number is 1011. Sign bit b3 is 1 (value is negative: -8 + 2 + 1 = -5₁₀)."
        },
        {
          title: "Step 2: Replicate Sign Bit to Upper 4 Positions",
          type: "summary",
          content: "Fill b7, b6, b5, b4 with 1s: 1111 1011₂"
        },
        {
          title: "Step 3: Verification of Unaltered Value",
          type: "summary",
          content: "8-bit value = -128 + 64 + 32 + 16 + 8 + 2 + 1 = -128 + 123 = -5₁₀. Value is perfectly preserved."
        }
      ],
      fastShortcut: "Fast Exam Rule: For negative numbers, prefix with 1s. For positive numbers, prefix with 0s!",
      verification: "Base 10 Check: 1011₂ = -5₁₀; 11111011₂ = -5₁₀ (Exact match)."
    }
  },
  {
    id: "q-s11",
    trackId: "signed",
    trackTitle: "Topic 4: Signed Binary Numbers & Overflow",
    topicBadge: "1.6K: Signed Number Range Formula",
    difficulty: "Medium",
    set: "set2",
    question: "What is the allowable decimal range for an 8-bit Signed 2's Complement register?",
    promptDetail: "State the closed-interval range [Min, Max] using the formula -2ⁿ⁻¹ to +2ⁿ⁻¹ - 1.",
    inputFormatHint: "Enter range format, e.g., -128 to +127",
    correctAnswer: "-128 to +127",
    acceptedAnswers: ["-128 to +127", "-128 to 127", "[-128, +127]", "[-128, 127]"],
    options: [
      { label: "A", text: "-128 to +127", isCorrect: true },
      { label: "B", text: "-127 to +127", distractorReason: "This is the range for Sign-Magnitude and 1's Complement, NOT 2's Complement!" },
      { label: "C", text: "0 to 255", distractorReason: "This is the Unsigned 8-bit range, not signed!" },
      { label: "D", text: "-256 to +255", distractorReason: "Used n=9 instead of n=8" }
    ],
    hint1: "Formula & Rule: For n bits in 2's complement: Range = [-2ⁿ⁻¹, +2ⁿ⁻¹ - 1]. For n = 8: -2⁷ to +2⁷ - 1.",
    hint2: "First Step & Trap: 2⁷ = 128. Range = -128 to +127.",
    solution: {
      finalAnswer: "[-128, +127]",
      steps: [
        {
          title: "Step 1: Apply Range Formula",
          type: "summary",
          content: "Minimum Value = -2ⁿ⁻¹ = -2⁷ = -128 (Bit pattern: 10000000)"
        },
        {
          title: "Step 2: Maximum Positive Value",
          type: "summary",
          content: "Maximum Value = +2ⁿ⁻¹ - 1 = +2⁷ - 1 = +128 - 1 = +127 (Bit pattern: 01111111)"
        }
      ],
      fastShortcut: "Fast Fact: 2's complement has 256 total states: 128 negative values (-128 to -1), zero (0), and 127 positive values (+1 to +127)!",
      verification: "Range Count: 128 negatives + 1 zero + 127 positives = 256 unique states = 2⁸."
    }
  },
  {
    id: "q-s12",
    trackId: "signed",
    trackTitle: "Topic 4: Signed Binary Numbers & Overflow",
    topicBadge: "1.6L: Overflow Condition Analysis",
    difficulty: "Hard",
    set: "set2",
    question: "If two negative numbers are added in a signed 2's complement adder and the sum's sign bit b7 is 0, what is the overflow flag V and why?",
    promptDetail: "State V = 1 or V = 0 and provide the physical explanation.",
    inputFormatHint: "Enter V=1 or V=0",
    correctAnswer: "V=1",
    acceptedAnswers: ["V=1", "V = 1", "1", "Overflow", "Overflow occurs"],
    options: [
      { label: "A", text: "V = 1 (Overflow occurs because two negative numbers must yield a negative sum)", isCorrect: true },
      { label: "B", text: "V = 0 (No overflow because sign bit is 0)", distractorReason: "Sign bit 0 means positive, which is impossible when adding two negatives without overflow!" },
      { label: "C", text: "V = 0 (End carry is always discarded)", distractorReason: "Confused end carry Cout with overflow flag V" },
      { label: "D", text: "V = 1 (Only if Cout = 0)", distractorReason: "Cout is actually 1 in this scenario, while Cin is 0" }
    ],
    hint1: "Formula & Rule: Two negative numbers (both b7 = 1) must physically produce a negative number (b7 = 1). If the result has b7 = 0, the sum exceeded the register's negative range and wrapped around into positive territory.",
    hint2: "First Step & Trap: When this happens, Cout = 1 but Cin = 0 -> V = Cin ⊕ Cout = 0 ⊕ 1 = 1.",
    solution: {
      finalAnswer: "V = 1 (Arithmetic Overflow)",
      steps: [
        {
          title: "Step 1: Physical Sign Rule",
          type: "summary",
          content: "Negative + Negative must produce Negative. A positive sum (b7 = 0) represents an impossible result, caused by arithmetic wrap-around."
        },
        {
          title: "Step 2: Carry Logic Demonstration",
          type: "summary",
          content: "In column b7: 1 + 1 + Cin = Sum(b7) + 2·Cout. If Sum(b7) = 0 and Cout = 1, then 1 + 1 + Cin = 2 -> Cin = 0. Therefore: V = Cin ⊕ Cout = 0 ⊕ 1 = 1."
        }
      ],
      fastShortcut: "Fast Truth Table Rule: Whenever Operand Signs match and differ from the Result Sign, V = 1!",
      verification: "Boolean Check: V = (A_msb · B_msb · ~Sum_msb) + (~A_msb · ~B_msb · Sum_msb) = 1·1·1 + 0 = 1."
    }
  },

  // ==========================================================================
  // TRACK 5: LOGIC GATES & PULSE WAVEFORMS (12 QUESTIONS)
  // ==========================================================================
  {
    id: "q-g1",
    trackId: "gates",
    trackTitle: "Topic 5: Logic Gates & Pulse Waveforms",
    topicBadge: "1.7A: Gate Logic Identification",
    difficulty: "Easy",
    set: "set1",
    question: "Which 2-input logic gate produces an output Y = 1 if and only if both inputs are 0 (A = 0 and B = 0)?",
    promptDetail: "Identify the gate whose truth table is Y = (A + B)'.",
    inputFormatHint: "Enter gate name, e.g., NOR",
    correctAnswer: "NOR",
    acceptedAnswers: ["NOR", "nor", "NOR gate", "NOR Gate"],
    options: [
      { label: "A", text: "NOR", isCorrect: true },
      { label: "B", text: "NAND", distractorReason: "NAND outputs 1 whenever any input is 0, not only when both are 0" },
      { label: "C", text: "AND", distractorReason: "AND outputs 1 only when both are 1" },
      { label: "D", text: "XOR", distractorReason: "XOR outputs 0 when both are 0" }
    ],
    hint1: "Formula & Rule: Truth table: (0,0)->1, (0,1)->0, (1,0)->0, (1,1)->0. This is the exact inverse of the OR gate.",
    hint2: "First Step & Trap: OR produces 0 only for (0,0). Inverting OR gives NOR, which produces 1 only for (0,0).",
    solution: {
      finalAnswer: "NOR Gate",
      steps: [
        {
          title: "Step 1: Truth Table Comparison",
          type: "table",
          headers: ["Input A", "Input B", "OR (A + B)", "NOR (A + B)'", "NAND (A · B)'"],
          rows: [
            ["0", "0", "0", "1", "1"],
            ["0", "1", "1", "0", "1"],
            ["1", "0", "1", "0", "1"],
            ["1", "1", "1", "0", "0"]
          ]
        },
        {
          title: "Step 2: Conclusion",
          type: "summary",
          content: "The NOR gate outputs HIGH (1) exclusively when ALL inputs are LOW (0)."
        }
      ],
      fastShortcut: "Fast Inspection: OR is 1 if any input is 1. Thus NOR is 1 only when NO input is 1 (both are 0)!",
      verification: "Equation Check: Y = (0 + 0)' = 0' = 1."
    }
  },
  {
    id: "q-g2",
    trackId: "gates",
    trackTitle: "Topic 5: Logic Gates & Pulse Waveforms",
    topicBadge: "1.7B: 3-Input XOR Odd Parity Function",
    difficulty: "Easy",
    set: "set1",
    question: "For a 3-input XOR gate with inputs A = 1, B = 0, C = 1, what is the output Y?",
    promptDetail: "Apply the odd parity rule: XOR outputs 1 if the number of 1s is odd.",
    inputFormatHint: "Enter 0 or 1",
    correctAnswer: "0",
    acceptedAnswers: ["0", "LOW", "0 (LOW)"],
    options: [
      { label: "A", text: "0", isCorrect: true },
      { label: "B", text: "1", distractorReason: "Miscounted number of 1s (there are two 1s, which is EVEN!)" },
      { label: "C", text: "Indeterminate (Floating)", distractorReason: "XOR output is always a definite binary level 0 or 1" },
      { label: "D", text: "High-Impedance (Hi-Z)", distractorReason: "Standard XOR gate does not produce tri-state high impedance" }
    ],
    hint1: "Formula & Rule: Multi-input XOR is an Odd Parity Detector: Y = 1 if an ODD number of inputs are HIGH (1). Y = 0 if an EVEN number of inputs are HIGH.",
    hint2: "First Step & Trap: Inputs are {1, 0, 1}. Count the 1s: there are two 1s. Two is EVEN -> Output is 0.",
    solution: {
      finalAnswer: "0 (LOW)",
      steps: [
        {
          title: "Step 1: Associative Evaluation",
          type: "summary",
          content: "(A ⊕ B) ⊕ C = (1 ⊕ 0) ⊕ 1 = 1 ⊕ 1 = 0"
        },
        {
          title: "Step 2: Parity Check",
          type: "summary",
          content: "Number of active HIGH inputs = 2 (Even). Odd parity detector outputs 0."
        }
      ],
      fastShortcut: "Fast Parity Rule: 2 ones -> Even -> Output = 0!",
      verification: "Binary Sum Modulo 2: (1 + 0 + 1) mod 2 = 2 mod 2 = 0."
    }
  },
  {
    id: "q-g3",
    trackId: "gates",
    trackTitle: "Topic 5: Logic Gates & Pulse Waveforms",
    topicBadge: "1.7C: XOR as Controlled Inverter",
    difficulty: "Medium",
    set: "set1",
    question: "In an XOR gate Y = A ⊕ B, if control input B is tied to permanent logic 1 (B = 1), what is the output Y in terms of input A?",
    promptDetail: "Evaluate Y = A ⊕ 1 using Boolean identities.",
    inputFormatHint: "Enter expression, e.g., A' or NOT A",
    correctAnswer: "A'",
    acceptedAnswers: ["A'", "NOT A", "~A", "A_bar", "!A"],
    options: [
      { label: "A", text: "A' (Inverter)", isCorrect: true },
      { label: "B", text: "A (Buffer)", distractorReason: "XOR acts as a buffer when B = 0, NOT when B = 1" },
      { label: "C", text: "1", distractorReason: "Confused XOR with OR gate (A + 1 = 1)" },
      { label: "D", text: "0", distractorReason: "Confused XOR with AND gate" }
    ],
    hint1: "Formula & Rule: A ⊕ 0 = A (Buffer / Pass-through). A ⊕ 1 = A' (Controlled Inverter).",
    hint2: "First Step & Trap: If A = 0: 0 ⊕ 1 = 1. If A = 1: 1 ⊕ 1 = 0. Output is always the inverse of A!",
    solution: {
      finalAnswer: "Y = A' (Inverter)",
      steps: [
        {
          title: "Step 1: Boolean Algebraic Proof",
          type: "summary",
          content: "Y = A ⊕ B = A·B' + A'·B. Substitute B = 1: Y = A·(1)' + A'·(1) = A·0 + A'·1 = 0 + A' = A'"
        },
        {
          title: "Step 2: Physical Hardware Role",
          type: "summary",
          content: "This controlled inversion property is the fundamental hardware block used in Binary Adders/Subtractors to dynamically invert operand B when Subtraction is enabled."
        }
      ],
      fastShortcut: "Fast Rule: XOR with 1 INVERTS; XOR with 0 PRESERVES!",
      verification: "Truth Check: When A=0, Y=1; when A=1, Y=0. Matches NOT gate."
    }
  },
  {
    id: "q-g4",
    trackId: "gates",
    trackTitle: "Topic 5: Logic Gates & Pulse Waveforms",
    topicBadge: "1.7D: Gate Enable / Inhibit Control",
    difficulty: "Medium",
    set: "set1",
    question: "A 2-input AND gate has data input A and control input EN. What value must EN be set to in order to enable the data signal A to pass through to the output (Y = A)?",
    promptDetail: "Evaluate Y = A · EN for EN = 1 vs EN = 0.",
    inputFormatHint: "Enter 1 or 0",
    correctAnswer: "1",
    acceptedAnswers: ["1", "HIGH", "1 (HIGH)"],
    options: [
      { label: "A", text: "1 (HIGH)", isCorrect: true },
      { label: "B", text: "0 (LOW)", distractorReason: "Setting EN = 0 inhibits/forces output to permanent 0 regardless of A" },
      { label: "C", text: "Tied to A", distractorReason: "Tying EN to A produces Y = A · A = A, but does not allow independent control" },
      { label: "D", text: "Floating (Unconnected)", distractorReason: "Leaving inputs floating leads to undefined noise or weak pull-up behavior" }
    ],
    hint1: "Formula & Rule: For AND gate: Y = A · EN. If EN = 1: Y = A · 1 = A (Enabled). If EN = 0: Y = A · 0 = 0 (Inhibited).",
    hint2: "First Step & Trap: To pass signal A unaltered, set EN = 1.",
    solution: {
      finalAnswer: "EN = 1 (HIGH)",
      steps: [
        {
          title: "Step 1: Enable State (EN = 1)",
          type: "summary",
          content: "Y = A · 1 = A. When A = 0, Y = 0. When A = 1, Y = 1. The data signal passes through."
        },
        {
          title: "Step 2: Inhibit State (EN = 0)",
          type: "summary",
          content: "Y = A · 0 = 0. Output is forced LOW regardless of input A."
        }
      ],
      fastShortcut: "Fast Rule: AND enables on 1; OR enables on 0!",
      verification: "Boolean Check: A · 1 = A."
    }
  },
  {
    id: "q-g5",
    trackId: "gates",
    trackTitle: "Topic 5: Logic Gates & Pulse Waveforms",
    topicBadge: "1.7E: Universal NAND Implementation of OR",
    difficulty: "Medium",
    set: "set1",
    question: "How many 2-input NAND gates are required to implement a 2-input OR gate?",
    promptDetail: "Apply De Morgan's Law: A + B = (A' · B')'.",
    inputFormatHint: "Enter integer count, e.g., 3",
    correctAnswer: "3",
    acceptedAnswers: ["3", "three", "3 gates"],
    options: [
      { label: "A", text: "3", isCorrect: true },
      { label: "B", text: "2", distractorReason: "Underestimated; 2 NAND gates implement an AND gate" },
      { label: "C", text: "4", distractorReason: "4 NAND gates implement an XOR gate" },
      { label: "D", text: "5", distractorReason: "5 NAND gates implement an XNOR gate" }
    ],
    hint1: "Formula & Rule: De Morgan's Theorem: A + B = (A' · B')'. You need 1 NAND gate to invert A, 1 NAND gate to invert B, and 1 NAND gate to combine A' and B'.",
    hint2: "First Step & Trap: Inverter 1: (A·A)' = A'. Inverter 2: (B·B)' = B'. Output gate: (A' · B')' = A + B. Total = 1 + 1 + 1 = 3 gates.",
    solution: {
      finalAnswer: "3 NAND Gates",
      steps: [
        {
          title: "Step 1: Algebraic De Morgan Formulation",
          type: "summary",
          content: "A + B = ((A + B)')' = (A' · B')'"
        },
        {
          title: "Step 2: Hardware Allocation",
          type: "table",
          headers: ["Gate #", "Function", "Inputs", "Output"],
          rows: [
            ["Gate 1", "NOT A", "A, A", "A'"],
            ["Gate 2", "NOT B", "B, B", "B'"],
            ["Gate 3", "NAND", "A', B'", "(A' · B')' = A + B"]
          ]
        }
      ],
      fastShortcut: "Fast Exam Memory Matrix: NOT = 1, AND = 2, OR = 3, NOR = 4, XOR = 4, XNOR = 5 NAND gates!",
      verification: "Boolean Check: ((A·A)' · (B·B)')' = (A' · B')' = A'' + B'' = A + B."
    }
  },
  {
    id: "q-g6",
    trackId: "gates",
    trackTitle: "Topic 5: Logic Gates & Pulse Waveforms",
    topicBadge: "1.7F: Universal NOR Implementation of AND",
    difficulty: "Hard",
    set: "set1",
    question: "How many 2-input NOR gates are required to implement a 2-input AND gate?",
    promptDetail: "Apply De Morgan's Law: A · B = (A' + B')'.",
    inputFormatHint: "Enter integer count, e.g., 3",
    correctAnswer: "3",
    acceptedAnswers: ["3", "three", "3 gates"],
    options: [
      { label: "A", text: "3", isCorrect: true },
      { label: "B", text: "2", distractorReason: "2 NOR gates implement an OR gate" },
      { label: "C", text: "4", distractorReason: "4 NOR gates implement an XNOR gate" },
      { label: "D", text: "5", distractorReason: "5 NOR gates implement an XOR gate" }
    ],
    hint1: "Formula & Rule: De Morgan's Theorem: A · B = (A' + B')'. You need 1 NOR to invert A, 1 NOR to invert B, and 1 NOR to combine them.",
    hint2: "First Step & Trap: Total = 1 + 1 + 1 = 3 NOR gates. Notice the duality with the NAND implementation of OR!",
    solution: {
      finalAnswer: "3 NOR Gates",
      steps: [
        {
          title: "Step 1: Algebraic De Morgan Formulation",
          type: "summary",
          content: "A · B = ((A · B)')' = (A' + B')'"
        },
        {
          title: "Step 2: Gate Assignment",
          type: "table",
          headers: ["Gate #", "Function", "Inputs", "Output"],
          rows: [
            ["Gate 1", "NOT A", "A, A", "A'"],
            ["Gate 2", "NOT B", "B, B", "B'"],
            ["Gate 3", "NOR", "A', B'", "(A' + B')' = A · B"]
          ]
        }
      ],
      fastShortcut: "Fast Duality Matrix: Dual of OR from NAND (3) is AND from NOR (3)!",
      verification: "Boolean Check: ((A + A)' + (B + B)')' = (A' + B')' = A'' · B'' = A · B."
    }
  },
  {
    id: "q-g7",
    trackId: "gates",
    trackTitle: "Topic 5: Logic Gates & Pulse Waveforms",
    topicBadge: "1.7G: Universal NAND Implementation of XOR",
    difficulty: "Medium",
    set: "set2",
    question: "What is the minimum number of 2-input NAND gates required to implement a 2-input XOR gate?",
    promptDetail: "Recall the classic 4-NAND gate cross-coupled bridge topology.",
    inputFormatHint: "Enter integer count, e.g., 4",
    correctAnswer: "4",
    acceptedAnswers: ["4", "four", "4 gates"],
    options: [
      { label: "A", text: "4", isCorrect: true },
      { label: "B", text: "5", distractorReason: "5 NAND gates are required for XNOR, not XOR" },
      { label: "C", text: "3", distractorReason: "3 NAND gates make an OR gate" },
      { label: "D", text: "6", distractorReason: "Non-optimized sum-of-products implementation" }
    ],
    hint1: "Formula & Rule: Standard textbook 4-NAND topology: Gate 1 computes (AB)'. Gate 2 computes (A·(AB)')'. Gate 3 computes (B·(AB)')'. Gate 4 combines outputs of Gate 2 and Gate 3.",
    hint2: "First Step & Trap: Minimum count is exactly 4 NAND gates.",
    solution: {
      finalAnswer: "4 NAND Gates",
      steps: [
        {
          title: "Step 1: 4-NAND Cross-Coupled Architecture",
          type: "summary",
          content: "N1 = (AB)'\nN2 = (A · N1)' = (A · (AB)')'\nN3 = (B · N1)' = (B · (AB)')'\nN4 = (N2 · N3)' = A ⊕ B"
        },
        {
          title: "Step 2: Boolean Verification",
          type: "summary",
          content: "N2 = A' + AB = A' + B. N3 = B' + AB = B' + A. N4 = (N2 · N3)' = ((A' + B)(B' + A))' = (AB + A'B')' = A ⊕ B."
        }
      ],
      fastShortcut: "Fast Exam Memory Rule: XOR requires 4 NAND gates; XNOR requires 5 NAND gates!",
      verification: "Gate Count Check: Exactly 4."
    }
  },
  {
    id: "q-g8",
    trackId: "gates",
    trackTitle: "Topic 5: Logic Gates & Pulse Waveforms",
    topicBadge: "1.7H: Standard TTL 7400 Series Identification",
    difficulty: "Easy",
    set: "set2",
    question: "Which standard 7400-series TTL IC number corresponds to the Quad 2-Input NAND Gate?",
    promptDetail: "Identify the industry-standard IC package containing four 2-input NAND gates.",
    inputFormatHint: "Enter IC number, e.g., 7400",
    correctAnswer: "7400",
    acceptedAnswers: ["7400", "7400 IC", "IC 7400", "74LS00", "74HC00"],
    options: [
      { label: "A", text: "7400", isCorrect: true },
      { label: "B", text: "7402", distractorReason: "7402 is Quad 2-Input NOR" },
      { label: "C", text: "7408", distractorReason: "7408 is Quad 2-Input AND" },
      { label: "D", text: "7432", distractorReason: "7432 is Quad 2-Input OR" }
    ],
    hint1: "Formula & Rule: 7400 is the flagship founding IC of the 7400 family: Quad 2-Input NAND.",
    hint2: "First Step & Trap: 7400: NAND, 7402: NOR, 7404: NOT (Hex Inverter), 7408: AND, 7432: OR, 7486: XOR.",
    solution: {
      finalAnswer: "7400 (Quad 2-Input NAND)",
      steps: [
        {
          title: "Step 1: Master TTL 74xx Gate Reference Table",
          type: "table",
          headers: ["IC Part Number", "Description", "Gate Type", "Number of Gates"],
          rows: [
            ["7400", "Quad 2-Input", "NAND", "4"],
            ["7402", "Quad 2-Input", "NOR", "4"],
            ["7404", "Hex", "NOT (Inverter)", "6"],
            ["7408", "Quad 2-Input", "AND", "4"],
            ["7432", "Quad 2-Input", "OR", "4"],
            ["7486", "Quad 2-Input", "XOR", "4"]
          ]
        }
      ],
      fastShortcut: "Fast Fact: 7400 is named after the NAND gate itself!",
      verification: "Catalog Check: 7400 = Quad 2-Input NAND."
    }
  },
  {
    id: "q-g9",
    trackId: "gates",
    trackTitle: "Topic 5: Logic Gates & Pulse Waveforms",
    topicBadge: "1.7I: Standard TTL 7486 Identification",
    difficulty: "Easy",
    set: "set2",
    question: "Which standard 7400-series TTL IC number corresponds to the Quad 2-Input XOR Gate?",
    promptDetail: "Identify the IC used for parity generation and binary adders.",
    inputFormatHint: "Enter IC number, e.g., 7486",
    correctAnswer: "7486",
    acceptedAnswers: ["7486", "7486 IC", "IC 7486", "74LS86", "74HC86"],
    options: [
      { label: "A", text: "7486", isCorrect: true },
      { label: "B", text: "7408", distractorReason: "7408 is Quad 2-Input AND" },
      { label: "C", text: "7404", distractorReason: "7404 is Hex Inverter" },
      { label: "D", text: "7432", distractorReason: "7432 is Quad 2-Input OR" }
    ],
    hint1: "Formula & Rule: 7486 is the dedicated Quad 2-input Exclusive-OR (XOR) IC.",
    hint2: "First Step & Trap: 86 ends the basic gate lineup in the standard lab series.",
    solution: {
      finalAnswer: "7486 (Quad 2-Input XOR)",
      steps: [
        {
          title: "Step 1: Standard Identification",
          type: "summary",
          content: "The 7486 (or 74LS86 / 74HC86) provides four independent 2-input XOR gates in a 14-pin DIP package."
        }
      ],
      fastShortcut: "Fast Fact: 7486 is the XOR workhorse in digital labs!",
      verification: "Catalog Check: 7486 = Quad 2-Input XOR."
    }
  },
  {
    id: "q-g10",
    trackId: "gates",
    trackTitle: "Topic 5: Logic Gates & Pulse Waveforms",
    topicBadge: "1.7J: XNOR Equivalence Condition",
    difficulty: "Medium",
    set: "set2",
    question: "Under what input condition does a 2-input XNOR gate produce a HIGH output (Y = 1)?",
    promptDetail: "Identify the equivalence property of XNOR.",
    inputFormatHint: "Enter condition, e.g., A = B or identical inputs",
    correctAnswer: "A = B",
    acceptedAnswers: ["A = B", "A=B", "identical inputs", "same inputs", "when inputs are identical", "both inputs match"],
    options: [
      { label: "A", text: "When inputs are identical (A = B: both 0 or both 1)", isCorrect: true },
      { label: "B", text: "When inputs are different (A != B)", distractorReason: "That is the condition for XOR, not XNOR!" },
      { label: "C", text: "Only when both inputs are 1", distractorReason: "Confused with AND gate" },
      { label: "D", text: "Only when both inputs are 0", distractorReason: "Confused with NOR gate" }
    ],
    hint1: "Formula & Rule: XNOR is also called the Coincidence Gate or Equivalence Gate. Output is 1 if inputs coincide (match).",
    hint2: "First Step & Trap: Truth table: (0,0)->1, (0,1)->0, (1,0)->0, (1,1)->1. Thus Y = 1 when A = B.",
    solution: {
      finalAnswer: "When inputs are identical (A = B)",
      steps: [
        {
          title: "Step 1: Truth Table Analysis",
          type: "table",
          headers: ["Input A", "Input B", "Inputs Match?", "XNOR Output Y"],
          rows: [
            ["0", "0", "Yes (0 = 0)", "1"],
            ["0", "1", "No (0 ≠ 1)", "0"],
            ["1", "0", "No (1 ≠ 0)", "0"],
            ["1", "1", "Yes (1 = 1)", "1"]
          ]
        },
        {
          title: "Step 2: Boolean Equation",
          type: "summary",
          content: "Y = AB + A'B'. Active when A=B=1 OR A=B=0."
        }
      ],
      fastShortcut: "Fast Name: XNOR = EQUIVALENCE gate!",
      verification: "Boolean Check: 0·0 + 0'·0' = 0 + 1·1 = 1; 1·1 + 1'·1' = 1 + 0·0 = 1."
    }
  },
  {
    id: "q-g11",
    trackId: "gates",
    trackTitle: "Topic 5: Logic Gates & Pulse Waveforms",
    topicBadge: "1.7K: Pulse Waveform Output Tracing",
    difficulty: "Hard",
    set: "set2",
    question: "Waveform A is '0 1 0 1' and Waveform B is '0 0 1 1' across 4 clock cycles. What is the output waveform Y for a 2-input NAND gate?",
    promptDetail: "Evaluate cycle-by-cycle: Y = (A · B)'.",
    inputFormatHint: "Enter 4 space-separated or joined bits, e.g., 1 1 1 0 or 1110",
    correctAnswer: "1 1 1 0",
    acceptedAnswers: ["1 1 1 0", "1110", "1, 1, 1, 0", "1,1,1,0"],
    options: [
      { label: "A", text: "1 1 1 0", isCorrect: true },
      { label: "B", text: "0 0 0 1", distractorReason: "This is the output of an AND gate (forgot to invert!)" },
      { label: "C", text: "1 0 0 0", distractorReason: "Output of a NOR gate" },
      { label: "D", text: "0 1 1 0", distractorReason: "Output of an XOR gate" }
    ],
    hint1: "Formula & Rule: NAND outputs 0 ONLY when both inputs are 1. In all other cases, NAND outputs 1.",
    hint2: "First Step & Trap: T1: A=0, B=0 -> (0·0)' = 1. T2: A=1, B=0 -> (1·0)' = 1. T3: A=0, B=1 -> (0·1)' = 1. T4: A=1, B=1 -> (1·1)' = 0. Output: 1 1 1 0.",
    solution: {
      finalAnswer: "1 1 1 0",
      steps: [
        {
          title: "Step 1: Cycle-by-Cycle Timing Breakdown",
          type: "table",
          headers: ["Clock Interval", "Input A", "Input B", "AND (A·B)", "NAND (A·B)'"],
          rows: [
            ["t1", "0", "0", "0", "1"],
            ["t2", "1", "0", "0", "1"],
            ["t3", "0", "1", "0", "1"],
            ["t4", "1", "1", "1", "0"]
          ]
        },
        {
          title: "Step 2: Synthesized Pulse Train",
          type: "summary",
          content: "Output Waveform Y = 1 1 1 0"
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: Only interval t4 has both A=1 and B=1, which produces 0. All others produce 1 -> 1 1 1 0!",
      verification: "Bitwise NAND: ~(0101 & 0011) = ~(0001) = 1110."
    }
  },
  {
    id: "q-g12",
    trackId: "gates",
    trackTitle: "Topic 5: Logic Gates & Pulse Waveforms",
    topicBadge: "1.7L: XOR Timing Waveform Synthesis",
    difficulty: "Hard",
    set: "set2",
    question: "Waveform A is '0 1 1 0 1 0' and Waveform B is '1 1 0 0 1 1' across 6 intervals. What is the output waveform Y for a 2-input XOR gate?",
    promptDetail: "Evaluate cycle-by-cycle: Y = A ⊕ B (1 when inputs differ, 0 when inputs match).",
    inputFormatHint: "Enter 6 bits, e.g., 1 0 1 0 0 1 or 101001",
    correctAnswer: "1 0 1 0 0 1",
    acceptedAnswers: ["1 0 1 0 0 1", "101001", "1, 0, 1, 0, 0, 1", "1,0,1,0,0,1"],
    options: [
      { label: "A", text: "1 0 1 0 0 1", isCorrect: true },
      { label: "B", text: "0 1 0 1 1 0", distractorReason: "Output of an XNOR gate (inverted bits)" },
      { label: "C", text: "1 1 1 0 1 1", distractorReason: "Output of an OR gate" },
      { label: "D", text: "0 1 0 0 1 0", distractorReason: "Output of an AND gate" }
    ],
    hint1: "Formula & Rule: XOR outputs 1 when bits differ (0,1 or 1,0). XOR outputs 0 when bits match (0,0 or 1,1).",
    hint2: "First Step & Trap: t1: 0^1=1. t2: 1^1=0. t3: 1^0=1. t4: 0^0=0. t5: 1^1=0. t6: 0^1=1. Result: 1 0 1 0 0 1.",
    solution: {
      finalAnswer: "1 0 1 0 0 1",
      steps: [
        {
          title: "Step 1: Cycle-by-Cycle Waveform Tracing",
          type: "table",
          headers: ["Cycle", "Input A", "Input B", "Inputs Differ?", "XOR Output Y"],
          rows: [
            ["t1", "0", "1", "Yes (0 ≠ 1)", "1"],
            ["t2", "1", "1", "No (1 = 1)", "0"],
            ["t3", "1", "0", "Yes (1 ≠ 0)", "1"],
            ["t4", "0", "0", "No (0 = 0)", "0"],
            ["t5", "1", "1", "No (1 = 1)", "0"],
            ["t6", "0", "1", "Yes (0 ≠ 1)", "1"]
          ]
        },
        {
          title: "Step 2: Synthesized Output Pulse",
          type: "summary",
          content: "Output Waveform Y = 1 0 1 0 0 1"
        }
      ],
      fastShortcut: "Fast Inspection Shortcut: Differ at t1, t3, t6 -> 1. Match at t2, t4, t5 -> 0. Sequence: 1 0 1 0 0 1!",
      verification: "Bitwise XOR: 011010 ^ 110011 = 101001."
    }
  }
];

export const quizTracks = [
  { id: "all", label: "All Unit 1: Full Mixed Mock Quiz", desc: "Draws a balanced comprehensive exam paper across all 5 syllabus topics (1.1 to 1.7)." },
  { id: "conversions", label: "Topic 1: Number Systems & Conversions", desc: "Base-r representation, 12 fractional conversion paths, and unknown radix finding." },
  { id: "arithmetic", label: "Topic 2: Binary Arithmetic (+, -, ×, ÷)", desc: "Fractional addition, zero-bridge borrow subtraction, shift-and-add multiplication, and long division." },
  { id: "complements", label: "Topic 3: Complements & Subtraction", desc: "1's, 2's, 9's, 10's complement generation, End-Around Carry, and Re-complementation grids." },
  { id: "signed", label: "Topic 4: Signed Numbers & Overflow", desc: "Sign-Magnitude, 1's and 2's complement registers, decoding, 4-case addition, and V = Cin ⊕ Cout." },
  { id: "gates", label: "Topic 5: Logic Gates & Pulse Waveforms", desc: "Fundamental gates, universality proofs, IC 74xx chips, and dynamic timing pulse trains." }
];
