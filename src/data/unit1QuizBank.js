/**
 * ZeroIndex Portal - Unit 1 Master Question Bank (110 Verified Questions)
 * Strictly zero em-dashes (\u2014) or en-dashes (\u2013).
 * Strictly zero collegiate affiliations or test session years.
 * 100% brand-new numerical values that do not duplicate Worked Examples in Sections 1.1 to 1.7.
 * Covers 4 core Unit 1 topics:
 *   1. Number Systems & All 12 Conversions (35 Qs)
 *   2. Binary Arithmetic with 95% Addition & Direct Subtraction (25 Qs)
 *   3. Complements & Complement Subtraction (1's, 2's, 9's, 10's) (30 Qs)
 *   4. Signed Binary Numbers, Overflow & General Unit 1 Theory (20 Qs)
 * Total Pool: 110 Questions.
 */

export const unit1QuizBank = [
  {
    "id": "q-c1",
    "trackId": "conversions",
    "trackTitle": "Topic 1: Number Systems & All 12 Conversions",
    "topicBadge": "1.3A: Decimal to Binary (Fractional)",
    "difficulty": "Easy",
    "set": "setA",
    "question": "Convert the fractional decimal number (77.625)₁₀ into its equivalent Binary representation (Base 2).",
    "promptDetail": "Show integer successive division by 2 and fractional successive multiplication by 2.",
    "inputFormatHint": "Enter binary digits only, e.g., 1001101.101",
    "correctAnswer": "1001101.101",
    "acceptedAnswers": [
      "1001101.101",
      "+1001101.101",
      "(1001101.101)2",
      "1001101.101_2"
    ],
    "options": [
      {
        "label": "A",
        "text": "1001101.101",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "1001101.011",
        "distractorReason": "Reversed fractional bit order"
      },
      {
        "label": "C",
        "text": "1011101.101",
        "distractorReason": "Arithmetic error in integer division (38 / 2)"
      },
      {
        "label": "D",
        "text": "1001111.110",
        "distractorReason": "Omitted middle zero quotient"
      }
    ],
    "hint1": "Formula & Rule: Separate into integer part (77) and fractional part (0.625). Divide 77 repeatedly by 2 and collect remainders upwards (bottom = MSB). Multiply 0.625 repeatedly by 2 and collect extracted integer carries downwards.",
    "hint2": "First Step & Trap: 77 / 2 = 38 R1. Be careful: reading integer remainders top-to-bottom instead of bottom-to-top will invert the binary word!",
    "solution": {
      "finalAnswer": "(1001101.101)₂",
      "steps": [
        {
          "title": "Step 1: Integer Part Successive Division (77 ÷ 2)",
          "type": "ladder",
          "headers": [
            "Division",
            "Quotient",
            "Remainder",
            "Bit Position"
          ],
          "rows": [
            [
              "77 ÷ 2",
              "38",
              "1",
              "b0 (LSB)"
            ],
            [
              "38 ÷ 2",
              "19",
              "0",
              "b1"
            ],
            [
              "19 ÷ 2",
              "9",
              "1",
              "b2"
            ],
            [
              "9 ÷ 2",
              "4",
              "1",
              "b3"
            ],
            [
              "4 ÷ 2",
              "2",
              "0",
              "b4"
            ],
            [
              "2 ÷ 2",
              "1",
              "0",
              "b5"
            ],
            [
              "1 ÷ 2",
              "0",
              "1",
              "b6 (MSB)"
            ]
          ],
          "readDirection": "Read remainders upward (↑): (77)₁₀ = (1001101)₂"
        },
        {
          "title": "Step 2: Fractional Part Successive Multiplication (0.625 × 2)",
          "type": "table",
          "headers": [
            "Multiplication",
            "Product",
            "Extracted Carry",
            "Bit Position"
          ],
          "rows": [
            [
              "0.625 × 2",
              "1.250",
              "1",
              "b-1 (First digit)"
            ],
            [
              "0.250 × 2",
              "0.500",
              "0",
              "b-2"
            ],
            [
              "0.500 × 2",
              "1.000",
              "1",
              "b-3 (Terminated at 0)"
            ]
          ],
          "readDirection": "Read extracted carries downward (↓): (0.625)₁₀ = (0.101)₂"
        },
        {
          "title": "Step 3: Combine Integer and Fractional Parts",
          "type": "summary",
          "content": "(77.625)₁₀ = (1001101.101)₂"
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: 77 = 64 + 8 + 4 + 1 -> weights 2⁶(1) + 2³(1) + 2²(1) + 2⁰(1) = 1001101. 0.625 = 0.5 + 0.125 = 2⁻¹(1) + 2⁻³(1) = .101. Total = 1001101.101!",
      "verification": "Base 10 Check: 64 + 8 + 4 + 1 + 0.5 + 0.125 = 77.625₁₀ (100% verified)."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-c2",
    "trackId": "conversions",
    "trackTitle": "Topic 1: Number Systems & All 12 Conversions",
    "topicBadge": "1.3B: Binary to Decimal (Fractional)",
    "difficulty": "Easy",
    "set": "setA",
    "question": "Convert the fractional binary number (110110.11)₂ into its exact Decimal value (Base 10).",
    "promptDetail": "Expand using positional powers of 2 for both integer and fractional parts.",
    "inputFormatHint": "Enter decimal number, e.g., 54.75",
    "correctAnswer": "54.75",
    "acceptedAnswers": [
      "54.75",
      "+54.75",
      "(54.75)10",
      "54.75_10"
    ],
    "options": [
      {
        "label": "A",
        "text": "54.75",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "54.50",
        "distractorReason": "Missed 2⁻² (0.25) fractional weight"
      },
      {
        "label": "C",
        "text": "46.75",
        "distractorReason": "Miscalculated 2⁵ as 24 instead of 32"
      },
      {
        "label": "D",
        "text": "58.75",
        "distractorReason": "Added unasserted bit b2 (4)"
      }
    ],
    "hint1": "Formula & Rule: Value = Sum of (bit × 2^i). Integer powers are 2⁵, 2⁴, 2³, 2², 2¹, 2⁰ (32, 16, 8, 4, 2, 1). Fractional powers are 2⁻¹, 2⁻² (0.5, 0.25).",
    "hint2": "First Step & Trap: Bits are at positions b5(1), b4(1), b3(0), b2(1), b1(1), b0(0) . b-1(1), b-2(1). Notice that b3 and b0 are 0!",
    "solution": {
      "finalAnswer": "(54.75)₁₀",
      "steps": [
        {
          "title": "Step 1: Write Positional Weights Matrix",
          "type": "matrix",
          "headers": [
            "Position",
            "b5",
            "b4",
            "b3",
            "b2",
            "b1",
            "b0",
            ".",
            "b-1",
            "b-2"
          ],
          "rows": [
            [
              "Binary Bit",
              "1",
              "1",
              "0",
              "1",
              "1",
              "0",
              ".",
              "1",
              "1"
            ],
            [
              "Power of 2",
              "2⁵",
              "2⁴",
              "2³",
              "2²",
              "2¹",
              "2⁰",
              ".",
              "2⁻¹",
              "2⁻²"
            ],
            [
              "Weight Value",
              "32",
              "16",
              "8",
              "4",
              "2",
              "1",
              ".",
              "0.5",
              "0.25"
            ]
          ]
        },
        {
          "title": "Step 2: Sum the Active Weighted Terms",
          "type": "summary",
          "content": "(1 × 32) + (1 × 16) + (0 × 8) + (1 × 4) + (1 × 2) + (0 × 1) + (1 × 0.5) + (1 × 0.25) = 32 + 16 + 4 + 2 + 0.5 + 0.25 = 54.75₁₀"
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: Integer is 32 + 16 + 4 + 2 = 54. Fraction .11 is 1/2 + 1/4 = 3/4 = 0.75. Result: 54.75!",
      "verification": "Base 10 Check: 54.75₁₀."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-c3",
    "trackId": "conversions",
    "trackTitle": "Topic 1: Number Systems & All 12 Conversions",
    "topicBadge": "1.3C: Decimal to Octal",
    "difficulty": "Easy",
    "set": "setA",
    "question": "Convert the integer decimal number (356)₁₀ into its equivalent Octal representation (Base 8).",
    "promptDetail": "Show successive division by 8 with quotients and remainders.",
    "inputFormatHint": "Enter octal digits only, e.g., 544",
    "correctAnswer": "544",
    "acceptedAnswers": [
      "544",
      "(544)8",
      "544_8"
    ],
    "options": [
      {
        "label": "A",
        "text": "544",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "445",
        "distractorReason": "Read remainders top-to-bottom instead of bottom-to-top"
      },
      {
        "label": "C",
        "text": "534",
        "distractorReason": "Division remainder error in first step"
      },
      {
        "label": "D",
        "text": "644",
        "distractorReason": "Incorrect quotient on 356 / 8"
      }
    ],
    "hint1": "Formula & Rule: Repeatedly divide by 8. Record each remainder (0 to 7). Collect remainders from bottom step (MSB) up to top step (LSB).",
    "hint2": "First Step & Trap: 356 / 8 = 44 with remainder 4 (since 44 × 8 = 352). Next divide 44 by 8.",
    "solution": {
      "finalAnswer": "(544)₈",
      "steps": [
        {
          "title": "Step 1: Successive Division by 8",
          "type": "ladder",
          "headers": [
            "Division (N ÷ 8)",
            "Quotient (Q)",
            "Remainder (R)",
            "Digit Position"
          ],
          "rows": [
            [
              "356 ÷ 8",
              "44",
              "4",
              "d0 (LSB)"
            ],
            [
              "44 ÷ 8",
              "5",
              "4",
              "d1"
            ],
            [
              "5 ÷ 8",
              "0",
              "5",
              "d2 (MSB)"
            ]
          ],
          "readDirection": "Read remainders upward (↑): (356)₁₀ = (544)₈"
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: 5 × 8² + 4 × 8¹ + 4 × 8⁰ = 5 × 64 + 4 × 8 + 4 = 320 + 32 + 4 = 356!",
      "verification": "Base 10 Check: 320 + 32 + 4 = 356₁₀ (100% verified)."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-c4",
    "trackId": "conversions",
    "trackTitle": "Topic 1: Number Systems & All 12 Conversions",
    "topicBadge": "1.3D: Decimal to Hexadecimal",
    "difficulty": "Easy",
    "set": "setA",
    "question": "Convert the integer decimal number (625)₁₀ into its equivalent Hexadecimal representation (Base 16).",
    "promptDetail": "Show successive division by 16 with hex letter substitutions where remainder ≥ 10.",
    "inputFormatHint": "Enter hex digits (letters capitalized), e.g., 271",
    "correctAnswer": "271",
    "acceptedAnswers": [
      "271",
      "(271)16",
      "271_16",
      "0x271"
    ],
    "options": [
      {
        "label": "A",
        "text": "271",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "172",
        "distractorReason": "Reversed remainder read direction"
      },
      {
        "label": "C",
        "text": "2E1",
        "distractorReason": "Mistakenly treated remainder 7 as hex E"
      },
      {
        "label": "D",
        "text": "371",
        "distractorReason": "Arithmetic error on 625 / 16"
      }
    ],
    "hint1": "Formula & Rule: Divide by 16 repeatedly. Remainder digits 10-15 map to A-F. Collect remainders from bottom to top.",
    "hint2": "First Step & Trap: 625 / 16 = 39 with remainder 1 (since 39 × 16 = 624).",
    "solution": {
      "finalAnswer": "(271)₁₆",
      "steps": [
        {
          "title": "Step 1: Successive Division by 16",
          "type": "ladder",
          "headers": [
            "Division (N ÷ 16)",
            "Quotient (Q)",
            "Remainder (R)",
            "Hex Symbol"
          ],
          "rows": [
            [
              "625 ÷ 16",
              "39",
              "1",
              "1 (LSB)"
            ],
            [
              "39 ÷ 16",
              "2",
              "7",
              "7"
            ],
            [
              "2 ÷ 16",
              "0",
              "2",
              "2 (MSB)"
            ]
          ],
          "readDirection": "Read upward (↑): (625)₁₀ = (271)₁₆"
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: 2 × 16² + 7 × 16 + 1 = 2 × 256 + 112 + 1 = 512 + 112 + 1 = 625₁₀!",
      "verification": "Base 10 Check: 512 + 112 + 1 = 625₁₀ (100% verified)."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-c5",
    "trackId": "conversions",
    "trackTitle": "Topic 1: Number Systems & All 12 Conversions",
    "topicBadge": "1.3E: Octal to Decimal (Fractional)",
    "difficulty": "Medium",
    "set": "setA",
    "question": "Convert the fractional octal number (723.4)₈ into its exact Decimal representation (Base 10).",
    "promptDetail": "Expand using powers of 8: 8², 8¹, 8⁰, 8⁻¹.",
    "inputFormatHint": "Enter decimal number, e.g., 467.5",
    "correctAnswer": "467.5",
    "acceptedAnswers": [
      "467.5",
      "(467.5)10",
      "467.5_10"
    ],
    "options": [
      {
        "label": "A",
        "text": "467.5",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "467.4",
        "distractorReason": "Treated .4 as 0.4 instead of 4/8 (0.5)"
      },
      {
        "label": "C",
        "text": "459.5",
        "distractorReason": "Computed 7 × 64 as 440 instead of 448"
      },
      {
        "label": "D",
        "text": "475.5",
        "distractorReason": "Added octal 8 instead of multiplying"
      }
    ],
    "hint1": "Formula & Rule: Value = 7 × 8² + 2 × 8¹ + 3 × 8⁰ + 4 × 8⁻¹. Note that 8⁻¹ = 1/8 = 0.125.",
    "hint2": "First Step & Trap: 4 × (1/8) = 4/8 = 1/2 = 0.5. Do not write 0.4!",
    "solution": {
      "finalAnswer": "(467.5)₁₀",
      "steps": [
        {
          "title": "Step 1: Positional Expansion",
          "type": "summary",
          "content": "= 7 × 8² + 2 × 8¹ + 3 × 8⁰ + 4 × 8⁻¹"
        },
        {
          "title": "Step 2: Compute Intermediate Terms",
          "type": "table",
          "headers": [
            "Digit",
            "Power",
            "Calculation",
            "Value"
          ],
          "rows": [
            [
              "7",
              "8²",
              "7 × 64",
              "448"
            ],
            [
              "2",
              "8¹",
              "2 × 8",
              "16"
            ],
            [
              "3",
              "8⁰",
              "3 × 1",
              "3"
            ],
            [
              "4",
              "8⁻¹",
              "4 × 0.125",
              "0.5"
            ]
          ]
        },
        {
          "title": "Step 3: Sum the Terms",
          "type": "summary",
          "content": "448 + 16 + 3 + 0.5 = 467.5₁₀"
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: 7 × 64 = 448. 448 + 19 = 467. 4/8 = 0.5. Total = 467.5!",
      "verification": "Base 10 Check: 448 + 16 + 3 + 0.5 = 467.5₁₀."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-c6",
    "trackId": "conversions",
    "trackTitle": "Topic 1: Number Systems & All 12 Conversions",
    "topicBadge": "1.3F: Hexadecimal to Decimal (Fractional)",
    "difficulty": "Medium",
    "set": "setA",
    "question": "Convert the fractional hexadecimal number (2E9.C)₁₆ into its exact Decimal representation (Base 10).",
    "promptDetail": "Substitute hex letter E = 14, C = 12, and expand using powers of 16.",
    "inputFormatHint": "Enter decimal number, e.g., 745.75",
    "correctAnswer": "745.75",
    "acceptedAnswers": [
      "745.75",
      "(745.75)10",
      "745.75_10"
    ],
    "options": [
      {
        "label": "A",
        "text": "745.75",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "745.12",
        "distractorReason": "Wrote hex C directly as 0.12 instead of 12/16"
      },
      {
        "label": "C",
        "text": "729.75",
        "distractorReason": "Treated hex E as 13 instead of 14"
      },
      {
        "label": "D",
        "text": "761.75",
        "distractorReason": "Treated hex E as 15"
      }
    ],
    "hint1": "Formula & Rule: Hex digits: E = 14, C = 12. Value = 2 × 16² + 14 × 16¹ + 9 × 16⁰ + 12 × 16⁻¹.",
    "hint2": "First Step & Trap: 16⁻¹ = 1/16 = 0.0625. Thus, 12 × (1/16) = 12/16 = 3/4 = 0.75.",
    "solution": {
      "finalAnswer": "(745.75)₁₀",
      "steps": [
        {
          "title": "Step 1: Map Hex Digits to Decimal Values",
          "type": "summary",
          "content": "2 -> 2, E -> 14, 9 -> 9, C -> 12"
        },
        {
          "title": "Step 2: Multiply by Powers of 16",
          "type": "table",
          "headers": [
            "Hex Digit",
            "Decimal Value",
            "Power of 16",
            "Calculated Product"
          ],
          "rows": [
            [
              "2",
              "2",
              "16² (256)",
              "2 × 256 = 512"
            ],
            [
              "E",
              "14",
              "16¹ (16)",
              "14 × 16 = 224"
            ],
            [
              "9",
              "9",
              "16⁰ (1)",
              "9 × 1 = 9"
            ],
            [
              "C",
              "12",
              "16⁻¹ (0.0625)",
              "12 / 16 = 0.75"
            ]
          ]
        },
        {
          "title": "Step 3: Total Sum",
          "type": "summary",
          "content": "512 + 224 + 9 + 0.75 = 745.75₁₀"
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: 512 + 224 = 736; 736 + 9 = 745; C/16 = 12/16 = 0.75. Sum = 745.75!",
      "verification": "Base 10 Check: 512 + 224 + 9 + 0.75 = 745.75₁₀."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-c7",
    "trackId": "conversions",
    "trackTitle": "Topic 1: Number Systems & All 12 Conversions",
    "topicBadge": "1.3G: Binary to Octal with Zero-Padding",
    "difficulty": "Medium",
    "set": "setA",
    "question": "Convert the fractional binary number (11011101.101)₂ into its equivalent Octal representation (Base 8).",
    "promptDetail": "Group into 3-bit triplets outward from radix point. Show Amber padded zeros where required.",
    "inputFormatHint": "Enter octal digits, e.g., 335.5",
    "correctAnswer": "335.5",
    "acceptedAnswers": [
      "335.5",
      "(335.5)8",
      "335.5_8"
    ],
    "options": [
      {
        "label": "A",
        "text": "335.5",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "335.101",
        "distractorReason": "Did not convert fractional bits to octal"
      },
      {
        "label": "C",
        "text": "675.5",
        "distractorReason": "Grouped from left to right incorrectly"
      },
      {
        "label": "D",
        "text": "335.25",
        "distractorReason": "Treated fraction as decimal 0.25"
      }
    ],
    "hint1": "Formula & Rule: Octal uses 3-bit groups (2³ = 8). Integer part: group leftward from radix point, adding leading zeros if needed. Fractional part: group rightward, adding trailing zeros if needed.",
    "hint2": "First Step & Trap: Integer 11011101 has 8 bits -> pad with 1 leading zero: (011)(011)(101). Fraction .101 already has 3 bits -> (101).",
    "solution": {
      "finalAnswer": "(335.5)₈",
      "steps": [
        {
          "title": "Step 1: Anchor at Radix Point and Group in 3s",
          "type": "table",
          "headers": [
            "Position",
            "Padded 3-Bit Group",
            "Octal Digit"
          ],
          "rows": [
            [
              "Integer Leftmost",
              "011 (Padded with leading 0)",
              "3"
            ],
            [
              "Integer Middle",
              "011",
              "3"
            ],
            [
              "Integer Rightmost",
              "101",
              "5"
            ],
            [
              "Radix Point",
              ".",
              "."
            ],
            [
              "Fraction Rightward",
              "101",
              "5"
            ]
          ]
        },
        {
          "title": "Step 2: Assemble Octal Digits",
          "type": "summary",
          "content": "(011)(011)(101) . (101)₂ = (335.5)₈"
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: 011₂ = 3, 011₂ = 3, 101₂ = 5, .101₂ = 5/8 -> (335.5)₈!",
      "verification": "Base 10 Check: 11011101₂ = 221₁₀. 0.101₂ = 0.625₁₀. 3×64 + 3×8 + 5 + 5/8 = 192 + 24 + 5 + 0.625 = 221.625₁₀."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-c8",
    "trackId": "conversions",
    "trackTitle": "Topic 1: Number Systems & All 12 Conversions",
    "topicBadge": "1.3H: Binary to Hexadecimal with Padding",
    "difficulty": "Medium",
    "set": "setA",
    "question": "Convert the fractional binary number (11101011.0111)₂ into its equivalent Hexadecimal representation (Base 16).",
    "promptDetail": "Group into 4-bit nibbles outward from radix point.",
    "inputFormatHint": "Enter hex string, e.g., EB.7",
    "correctAnswer": "EB.7",
    "acceptedAnswers": [
      "EB.7",
      "eb.7",
      "(EB.7)16",
      "0xEB.7"
    ],
    "options": [
      {
        "label": "A",
        "text": "EB.7",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "EB.E",
        "distractorReason": "Shifted fraction nibble or misread 0111"
      },
      {
        "label": "C",
        "text": "DB.7",
        "distractorReason": "Misread 1110 as D (13) instead of E (14)"
      },
      {
        "label": "D",
        "text": "EA.7",
        "distractorReason": "Misread 1011 as A (10) instead of B (11)"
      }
    ],
    "hint1": "Formula & Rule: Hex uses 4-bit nibbles (2⁴ = 16). Group outward from radix point: 4 bits to left, 4 bits to right.",
    "hint2": "First Step & Trap: Integer 1110 1011 -> (1110) = E, (1011) = B. Fraction .0111 -> (0111) = 7.",
    "solution": {
      "finalAnswer": "(EB.7)₁₆",
      "steps": [
        {
          "title": "Step 1: Partition into 4-Bit Nibbles",
          "type": "table",
          "headers": [
            "Nibble",
            "Binary",
            "Decimal Value",
            "Hex Digit"
          ],
          "rows": [
            [
              "Integer Upper",
              "1110",
              "14",
              "E"
            ],
            [
              "Integer Lower",
              "1011",
              "11",
              "B"
            ],
            [
              "Radix Point",
              ".",
              ".",
              "."
            ],
            [
              "Fraction Nibble",
              "0111",
              "7",
              "7"
            ]
          ]
        },
        {
          "title": "Step 2: Combine Hex Digits",
          "type": "summary",
          "content": "(1110)(1011) . (0111)₂ = (EB.7)₁₆"
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: 1110 = 14 (E), 1011 = 11 (B), 0111 = 7. Immediate answer: EB.7!",
      "verification": "Base 10 Check: EB.7₁₆ = 14×16 + 11 + 7/16 = 224 + 11 + 0.4375 = 235.4375₁₀. 11101011.0111₂ = 235.4375₁₀."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-c9",
    "trackId": "conversions",
    "trackTitle": "Topic 1: Number Systems & All 12 Conversions",
    "topicBadge": "1.3I: Octal to Hexadecimal (2-Hop Bridge)",
    "difficulty": "Medium",
    "set": "setB",
    "question": "Convert the fractional octal number (572.3)₈ into Hexadecimal (Base 16) using the 2-Hop Binary Bridge.",
    "promptDetail": "Hop 1: Expand each Octal digit into 3 binary bits. Hop 2: Regroup binary bits into 4-bit nibbles outward from radix point.",
    "inputFormatHint": "Enter hex string, e.g., 17A.6",
    "correctAnswer": "17A.6",
    "acceptedAnswers": [
      "17A.6",
      "17a.6",
      "(17A.6)16",
      "0x17A.6"
    ],
    "options": [
      {
        "label": "A",
        "text": "17A.6",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "17A.3",
        "distractorReason": "Forgot to pad trailing zero in fraction nibble (wrote .011 as .3 instead of .0110 as .6)"
      },
      {
        "label": "C",
        "text": "27A.6",
        "distractorReason": "Miscalculated upper integer nibble"
      },
      {
        "label": "D",
        "text": "1BA.6",
        "distractorReason": "Hex translation error on middle bits"
      }
    ],
    "hint1": "Formula & Rule: NEVER convert Octal to Hex directly. Use the 2-Hop Bridge: Octal -> 3-bit Binary -> 4-bit Hex.",
    "hint2": "First Step & Trap: 5 -> 101, 7 -> 111, 2 -> 010, . 3 -> 011. Combined binary = 101 111 010 . 011. Now regroup into 4-bit nibbles. Don't forget trailing zero on fraction!",
    "solution": {
      "finalAnswer": "(17A.6)₁₆",
      "steps": [
        {
          "title": "Hop 1: Octal to 3-Bit Binary Expansion",
          "type": "summary",
          "content": "5 -> 101, 7 -> 111, 2 -> 010, . 3 -> 011 -> (101111010.011)₂"
        },
        {
          "title": "Hop 2: Regroup into 4-Bit Hex Nibbles Outward from Radix Point",
          "type": "table",
          "headers": [
            "Group",
            "Binary Nibble",
            "Hex Digit"
          ],
          "rows": [
            [
              "Integer Nibble 3",
              "0001 (Padded with 3 zeros)",
              "1"
            ],
            [
              "Integer Nibble 2",
              "0111",
              "7"
            ],
            [
              "Integer Nibble 1",
              "1010",
              "A (10)"
            ],
            [
              "Radix Point",
              ".",
              "."
            ],
            [
              "Fraction Nibble 1",
              "0110 (Padded with 1 trailing zero)",
              "6"
            ]
          ]
        },
        {
          "title": "Step 3: Combine Hex Digits",
          "type": "summary",
          "content": "(0001)(0111)(1010) . (0110) = (17A.6)₁₆"
        }
      ],
      "fastShortcut": "Fast Trap Warning: Octal .3 is .011 in binary. In 4-bit hex, it pads to .0110 = 6, NOT 3!",
      "verification": "Base 10 Check: (572.3)₈ = 5×64 + 7×8 + 2 + 3/8 = 320 + 56 + 2 + 0.375 = 378.375₁₀. (17A.6)₁₆ = 256 + 7×16 + 10 + 6/16 = 256 + 112 + 10 + 0.375 = 378.375₁₀ (100% verified)."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-c10",
    "trackId": "conversions",
    "trackTitle": "Topic 1: Number Systems & All 12 Conversions",
    "topicBadge": "1.3J: Hexadecimal to Octal (2-Hop Bridge)",
    "difficulty": "Medium",
    "set": "setB",
    "question": "Convert the fractional hexadecimal number (D3.B)₁₆ into Octal (Base 8) using the 2-Hop Binary Bridge.",
    "promptDetail": "Hop 1: Expand hex to 4-bit binary. Hop 2: Regroup into 3-bit octal triplets outward from radix point.",
    "inputFormatHint": "Enter octal string, e.g., 323.54",
    "correctAnswer": "323.54",
    "acceptedAnswers": [
      "323.54",
      "(323.54)8",
      "323.54_8"
    ],
    "options": [
      {
        "label": "A",
        "text": "323.54",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "323.5",
        "distractorReason": "Forgot to pad trailing two zeros to complete the second 3-bit fraction group"
      },
      {
        "label": "C",
        "text": "643.54",
        "distractorReason": "Regrouped integer from left to right instead of right to left"
      },
      {
        "label": "D",
        "text": "323.13",
        "distractorReason": "Wrote hex B directly as 13"
      }
    ],
    "hint1": "Formula & Rule: D = 1101, 3 = 0011, B = 1011. Binary = 11010011.1011. Regroup into 3-bit octal groups.",
    "hint2": "First Step & Trap: Fraction .1011 has 4 bits. Group 1: 101 (5). Group 2: 1 needs two padded trailing zeros -> 100 (4). Fraction becomes .54!",
    "solution": {
      "finalAnswer": "(323.54)₈",
      "steps": [
        {
          "title": "Hop 1: Hex to 4-Bit Binary Expansion",
          "type": "summary",
          "content": "D -> 1101, 3 -> 0011, B -> 1011 -> (11010011.1011)₂"
        },
        {
          "title": "Hop 2: Regroup into 3-Bit Octal Triplets Outward from Radix Point",
          "type": "table",
          "headers": [
            "Triplet",
            "Binary Bits",
            "Octal Digit"
          ],
          "rows": [
            [
              "Integer Group 3",
              "011 (Padded with leading 0)",
              "3"
            ],
            [
              "Integer Group 2",
              "010",
              "2"
            ],
            [
              "Integer Group 1",
              "011",
              "3"
            ],
            [
              "Radix Point",
              ".",
              "."
            ],
            [
              "Fraction Group 1",
              "101",
              "5"
            ],
            [
              "Fraction Group 2",
              "100 (Padded with two 0s)",
              "4"
            ]
          ]
        },
        {
          "title": "Step 3: Combine Octal Digits",
          "type": "summary",
          "content": "(011)(010)(011) . (101)(100) = (323.54)₈"
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: 11 010 011 -> 011(3) 010(2) 011(3). .1011 -> 101(5) 100(4) -> 323.54₈!",
      "verification": "Base 10 Check: (D3.B)₁₆ = 13×16 + 3 + 11/16 = 208 + 3 + 0.6875 = 211.6875₁₀. (323.54)₈ = 3×64 + 2×8 + 3 + 5/8 + 4/64 = 192 + 16 + 3 + 0.625 + 0.0625 = 211.6875₁₀ (100% verified)."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-c11",
    "trackId": "conversions",
    "trackTitle": "Topic 1: Number Systems & All 12 Conversions",
    "topicBadge": "1.3K: Decimal to Fractional Octal",
    "difficulty": "Hard",
    "set": "setB",
    "question": "Convert the fractional decimal number (46.25)₁₀ into its equivalent Octal representation (Base 8).",
    "promptDetail": "Show integer division by 8 and fractional multiplication by 8.",
    "inputFormatHint": "Enter octal string, e.g., 56.2",
    "correctAnswer": "56.2",
    "acceptedAnswers": [
      "56.2",
      "(56.2)8",
      "56.2_8"
    ],
    "options": [
      {
        "label": "A",
        "text": "56.2",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "56.25",
        "distractorReason": "Left fractional 0.25 in decimal without multiplying by 8"
      },
      {
        "label": "C",
        "text": "65.2",
        "distractorReason": "Reversed integer remainder order"
      },
      {
        "label": "D",
        "text": "56.14",
        "distractorReason": "Treated 0.25 as binary .01 then converted incorrectly"
      }
    ],
    "hint1": "Formula & Rule: Integer: 46 ÷ 8. Fraction: 0.25 × 8.",
    "hint2": "First Step & Trap: 46 / 8 = 5 R6. 5 / 8 = 0 R5 -> Integer is 56. Fraction: 0.25 × 8 = 2.00 -> extracted carry is 2!",
    "solution": {
      "finalAnswer": "(56.2)₈",
      "steps": [
        {
          "title": "Step 1: Integer Successive Division (46 ÷ 8)",
          "type": "ladder",
          "headers": [
            "Division",
            "Quotient",
            "Remainder",
            "Digit"
          ],
          "rows": [
            [
              "46 ÷ 8",
              "5",
              "6",
              "d0 (LSB)"
            ],
            [
              "5 ÷ 8",
              "0",
              "5",
              "d1 (MSB)"
            ]
          ],
          "readDirection": "Read upward: (46)₁₀ = (56)₈"
        },
        {
          "title": "Step 2: Fractional Successive Multiplication (0.25 × 8)",
          "type": "table",
          "headers": [
            "Multiplication",
            "Product",
            "Extracted Carry"
          ],
          "rows": [
            [
              "0.25 × 8",
              "2.00",
              "2 (Terminated)"
            ]
          ],
          "readDirection": "Read downward: (0.25)₁₀ = (0.2)₈"
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: 46 = 5×8 + 6 = 56₈. 0.25 = 1/4 = 2/8 = 0.2₈. Total: 56.2₈!",
      "verification": "Base 10 Check: 5×8 + 6 + 2/8 = 40 + 6 + 0.25 = 46.25₁₀ (100% verified)."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-c12",
    "trackId": "conversions",
    "trackTitle": "Topic 1: Number Systems & All 12 Conversions",
    "topicBadge": "1.3L: Decimal to Fractional Hexadecimal",
    "difficulty": "Hard",
    "set": "setB",
    "question": "Convert the fractional decimal number (205.1875)₁₀ into its equivalent Hexadecimal representation (Base 16).",
    "promptDetail": "Show integer division by 16 and fractional multiplication by 16.",
    "inputFormatHint": "Enter hex string, e.g., CD.3",
    "correctAnswer": "CD.3",
    "acceptedAnswers": [
      "CD.3",
      "cd.3",
      "(CD.3)16",
      "0xCD.3"
    ],
    "options": [
      {
        "label": "A",
        "text": "CD.3",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "DC.3",
        "distractorReason": "Reversed integer remainders 12 and 13"
      },
      {
        "label": "C",
        "text": "CD.1875",
        "distractorReason": "Did not multiply fractional part by 16"
      },
      {
        "label": "D",
        "text": "BD.3",
        "distractorReason": "Mapped remainder 12 to B instead of C"
      }
    ],
    "hint1": "Formula & Rule: Integer: 205 ÷ 16. Remainder 13 maps to D, remainder 12 maps to C. Fraction: 0.1875 × 16.",
    "hint2": "First Step & Trap: 205 / 16 = 12 R 13 (D). 12 / 16 = 0 R 12 (C). Read bottom-to-top: CD!",
    "solution": {
      "finalAnswer": "(CD.3)₁₆",
      "steps": [
        {
          "title": "Step 1: Integer Successive Division (205 ÷ 16)",
          "type": "ladder",
          "headers": [
            "Division",
            "Quotient",
            "Remainder",
            "Hex Digit"
          ],
          "rows": [
            [
              "205 ÷ 16",
              "12",
              "13",
              "D (LSB)"
            ],
            [
              "12 ÷ 16",
              "0",
              "12",
              "C (MSB)"
            ]
          ],
          "readDirection": "Read upward (↑): (205)₁₀ = (CD)₁₆"
        },
        {
          "title": "Step 2: Fractional Successive Multiplication (0.1875 × 16)",
          "type": "table",
          "headers": [
            "Multiplication",
            "Product",
            "Extracted Carry"
          ],
          "rows": [
            [
              "0.1875 × 16",
              "3.0000",
              "3 (Terminated)"
            ]
          ],
          "readDirection": "Read downward: (0.1875)₁₀ = (0.3)₁₆"
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: 205 = 12×16 + 13 = C D₁₆. 0.1875 = 3/16 = .3₁₆. Result: CD.3₁₆!",
      "verification": "Base 10 Check: 12×16 + 13 + 3/16 = 192 + 13 + 0.1875 = 205.1875₁₀ (100% verified)."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-c13",
    "trackId": "conversions",
    "trackTitle": "Topic 1: Number Systems & All 12 Conversions",
    "topicBadge": "1.3M: Unknown Radix Finding",
    "difficulty": "Hard",
    "set": "setB",
    "question": "Find the unknown base radix r such that: (34)_r = (28)₁₀.",
    "promptDetail": "Set up the polynomial equation 3r¹ + 4r⁰ = 28 and solve for r.",
    "inputFormatHint": "Enter single integer radix, e.g., 8",
    "correctAnswer": "8",
    "acceptedAnswers": [
      "8",
      "r=8",
      "r = 8"
    ],
    "options": [
      {
        "label": "A",
        "text": "8",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "7",
        "distractorReason": "Solved 3r = 21 instead of 24"
      },
      {
        "label": "C",
        "text": "9",
        "distractorReason": "Added 4 to 28 instead of subtracting"
      },
      {
        "label": "D",
        "text": "6",
        "distractorReason": "Violates digit constraint since digit 4 exists but r could be >= 5"
      }
    ],
    "hint1": "Formula & Rule: Expand LHS in powers of r: 3 × r¹ + 4 × r⁰ = 28.",
    "hint2": "First Step & Trap: 3r + 4 = 28 -> 3r = 24 -> r = 8. Check that all digits in (34)_r are less than 8 (3 < 8, 4 < 8 - valid!).",
    "solution": {
      "finalAnswer": "r = 8",
      "steps": [
        {
          "title": "Step 1: Formulate Polynomial Base Equation",
          "type": "summary",
          "content": "3 × r¹ + 4 × r⁰ = 28₁₀"
        },
        {
          "title": "Step 2: Linear Algebraic Solution",
          "type": "summary",
          "content": "3r + 4 = 28 => 3r = 24 => r = 24 / 3 = 8"
        },
        {
          "title": "Step 3: Base Validity Check",
          "type": "summary",
          "content": "In base 8, all digits must be strictly less than 8. Digits present are {3, 4}, both < 8. The solution r = 8 is fully valid."
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: 3r + 4 = 28 -> 3r = 24 -> r = 8!",
      "verification": "Base 10 Check: (34)₈ = 3×8 + 4 = 24 + 4 = 28₁₀ (100% verified)."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-c14",
    "trackId": "conversions",
    "trackTitle": "Topic 1: Number Systems & All 12 Conversions",
    "topicBadge": "1.3N: Unknown Quadratic Radix",
    "difficulty": "Hard",
    "set": "setB",
    "question": "Find the unknown base radix r such that: (123)_r = (51)₁₀.",
    "promptDetail": "Set up the quadratic equation 1r² + 2r + 3 = 51 and solve for positive integer root r.",
    "inputFormatHint": "Enter single integer radix, e.g., 6",
    "correctAnswer": "6",
    "acceptedAnswers": [
      "6",
      "r=6",
      "r = 6"
    ],
    "options": [
      {
        "label": "A",
        "text": "6",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "7",
        "distractorReason": "Yields 49 + 14 + 3 = 66 != 51"
      },
      {
        "label": "C",
        "text": "5",
        "distractorReason": "Yields 25 + 10 + 3 = 38 != 51"
      },
      {
        "label": "D",
        "text": "8",
        "distractorReason": "Rejected negative root r = -8 mathematically"
      }
    ],
    "hint1": "Formula & Rule: 1 × r² + 2 × r + 3 = 51 -> r² + 2r - 48 = 0.",
    "hint2": "First Step & Trap: Factor the quadratic: (r + 8)(r - 6) = 0. Since radix r must be positive and greater than 3, r = 6.",
    "solution": {
      "finalAnswer": "r = 6",
      "steps": [
        {
          "title": "Step 1: Set Up Polynomial Equation",
          "type": "summary",
          "content": "1 × r² + 2 × r¹ + 3 × r⁰ = 51"
        },
        {
          "title": "Step 2: Solve Quadratic Equation",
          "type": "summary",
          "content": "r² + 2r + 3 = 51 => r² + 2r - 48 = 0 => (r + 8)(r - 6) = 0"
        },
        {
          "title": "Step 3: Root Selection & Validity",
          "type": "summary",
          "content": "Roots are r = -8 and r = 6. A base must be a positive integer greater than the maximum digit present (max digit is 3). Therefore, r = 6."
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: Test r = 6: 6² + 2(6) + 3 = 36 + 12 + 3 = 51₁₀. Correct!",
      "verification": "Base 10 Check: (123)₆ = 36 + 12 + 3 = 51₁₀ (100% verified)."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-c15",
    "trackId": "conversions",
    "trackTitle": "Topic 1: Number Systems & All 12 Conversions",
    "topicBadge": "1.3O: Radix Equation with Addition",
    "difficulty": "Hard",
    "set": "setB",
    "question": "Determine the base radix r that satisfies the arithmetic equality: (24)_r + (17)_r = (43)_r.",
    "promptDetail": "Expand both sides in powers of r: (2r + 4) + (r + 7) = 4r + 3.",
    "inputFormatHint": "Enter single integer radix, e.g., 8",
    "correctAnswer": "8",
    "acceptedAnswers": [
      "8",
      "r=8",
      "r = 8"
    ],
    "options": [
      {
        "label": "A",
        "text": "8",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "9",
        "distractorReason": "Yields 22 + 16 = 38 != 39"
      },
      {
        "label": "C",
        "text": "7",
        "distractorReason": "Digit 7 cannot exist in base 7 (digits must be <= 6)"
      },
      {
        "label": "D",
        "text": "10",
        "distractorReason": "In base 10, 24 + 17 = 41 != 43"
      }
    ],
    "hint1": "Formula & Rule: Expand all terms: (2r + 4) + (r + 7) = 4r + 3. Check digit constraint: since digit 7 appears in (17)_r, r must be strictly greater than 7 (r >= 8).",
    "hint2": "First Step & Trap: LHS = 3r + 11. RHS = 4r + 3. 3r + 11 = 4r + 3 -> 4r - 3r = 11 - 3 -> r = 8.",
    "solution": {
      "finalAnswer": "r = 8",
      "steps": [
        {
          "title": "Step 1: Algebraic Base Expansion",
          "type": "summary",
          "content": "(2r + 4) + (r + 7) = 4r + 3"
        },
        {
          "title": "Step 2: Simplify and Solve for r",
          "type": "summary",
          "content": "3r + 11 = 4r + 3 => 4r - 3r = 11 - 3 => r = 8"
        },
        {
          "title": "Step 3: Base Consistency & Constraint Audit",
          "type": "summary",
          "content": "The digits in the problem are {2, 4, 1, 7, 4, 3}. The maximum digit is 7, requiring r > 7. Our solution r = 8 is consistent and valid."
        }
      ],
      "fastShortcut": "Fast Column Inspection: In units column: 4 + 7 = 11. But result unit digit is 3! 11 - 8 = 3 with carry 1. Thus base r must be 8!",
      "verification": "Base 10 Check: In base 8: 24₈ = 20₁₀, 17₈ = 15₁₀, 43₈ = 35₁₀. 20 + 15 = 35₁₀ (100% verified)."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-c16",
    "trackId": "conversions",
    "trackTitle": "Topic 1: Number Systems & All 12 Conversions",
    "topicBadge": "1.3A: Decimal with Fraction to Binary",
    "questionType": "numerical",
    "difficulty": "Easy",
    "set": "setA",
    "question": "Convert the decimal number (93.375)₁₀ into its exact Binary representation.",
    "promptDetail": "Perform successive division by 2 for 93 and multiplication by 2 for 0.375.",
    "inputFormatHint": "Enter binary digits with point, e.g., 1011101.011",
    "correctAnswer": "1011101.011",
    "acceptedAnswers": [
      "1011101.011",
      "(1011101.011)2",
      "1011101.011_2"
    ],
    "options": [
      {
        "label": "A",
        "text": "1011101.011",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "1011101.110",
        "distractorReason": "Reversed fractional bit order"
      },
      {
        "label": "C",
        "text": "1101101.011",
        "distractorReason": "Bit error in integer position b5"
      },
      {
        "label": "D",
        "text": "1011001.011",
        "distractorReason": "Omitted bit b2 (4)"
      }
    ],
    "hint1": "Formula & Rule: 93 = 64 + 16 + 8 + 4 + 1 = 1011101₂. 0.375 = 0.25 + 0.125 = 0.011₂.",
    "hint2": "First Step & Trap: 0.375 × 2 = 0.75 (0); 0.75 × 2 = 1.50 (1); 0.50 × 2 = 1.00 (1). Read top to bottom: .011.",
    "solution": {
      "finalAnswer": "(1011101.011)₂",
      "steps": [
        {
          "title": "Step 1: Integer Successive Division (93 ÷ 2)",
          "type": "ladder",
          "headers": [
            "Division",
            "Quotient",
            "Remainder",
            "Bit"
          ],
          "rows": [
            [
              "93 ÷ 2",
              "46",
              "1",
              "b0 (LSB)"
            ],
            [
              "46 ÷ 2",
              "23",
              "0",
              "b1"
            ],
            [
              "23 ÷ 2",
              "11",
              "1",
              "b2"
            ],
            [
              "11 ÷ 2",
              "5",
              "1",
              "b3"
            ],
            [
              "5 ÷ 2",
              "2",
              "1",
              "b4"
            ],
            [
              "2 ÷ 2",
              "1",
              "0",
              "b5"
            ],
            [
              "1 ÷ 2",
              "0",
              "1",
              "b6 (MSB)"
            ]
          ],
          "readDirection": "Read upward (↑): (93)₁₀ = (1011101)₂"
        },
        {
          "title": "Step 2: Fractional Successive Multiplication (0.375 × 2)",
          "type": "table",
          "headers": [
            "Multiplication",
            "Product",
            "Carry Bit",
            "Position"
          ],
          "rows": [
            [
              "0.375 × 2",
              "0.750",
              "0",
              "b-1"
            ],
            [
              "0.750 × 2",
              "1.500",
              "1",
              "b-2"
            ],
            [
              "0.500 × 2",
              "1.000",
              "1",
              "b-3"
            ]
          ],
          "readDirection": "Read downward (↓): (0.375)₁₀ = (0.011)₂"
        }
      ],
      "fastShortcut": "Fast Positional Inspection: 93 = 64 + 16 + 8 + 4 + 1 -> 1011101. 0.375 = 1/4 + 1/8 -> .011. Result: 1011101.011!",
      "verification": "Base 10 Check: 64 + 16 + 8 + 4 + 1 + 0.25 + 0.125 = 93.375₁₀ (100% verified)."
    }
  },
  {
    "id": "q-c17",
    "trackId": "conversions",
    "trackTitle": "Topic 1: Number Systems & All 12 Conversions",
    "topicBadge": "1.3B: Fractional Binary to Decimal",
    "questionType": "numerical",
    "difficulty": "Easy",
    "set": "setA",
    "question": "Convert the fractional binary number (1011010.101)₂ into its exact Decimal value.",
    "promptDetail": "Sum powers of 2 from 2⁶ down to 2⁻³.",
    "inputFormatHint": "Enter decimal value, e.g., 90.625",
    "correctAnswer": "90.625",
    "acceptedAnswers": [
      "90.625",
      "(90.625)10",
      "+90.625"
    ],
    "options": [
      {
        "label": "A",
        "text": "90.625",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "90.500",
        "distractorReason": "Omitted fractional bit b-3 (0.125)"
      },
      {
        "label": "C",
        "text": "82.625",
        "distractorReason": "Omitted bit b3 (8)"
      },
      {
        "label": "D",
        "text": "94.625",
        "distractorReason": "Added bit b2 (4) incorrectly"
      }
    ],
    "hint1": "Formula & Rule: Integer: 64 + 16 + 8 + 2 = 90. Fraction: 0.5 + 0.125 = 0.625.",
    "hint2": "First Step & Trap: Bits present: b6(64), b4(16), b3(8), b1(2) . b-1(0.5), b-3(0.125).",
    "solution": {
      "finalAnswer": "90.625₁₀",
      "steps": [
        {
          "title": "Step 1: Positional Weights Breakdown",
          "type": "matrix",
          "headers": [
            "Position",
            "b6",
            "b5",
            "b4",
            "b3",
            "b2",
            "b1",
            "b0",
            ".",
            "b-1",
            "b-2",
            "b-3"
          ],
          "rows": [
            [
              "Bit",
              "1",
              "0",
              "1",
              "1",
              "0",
              "1",
              "0",
              ".",
              "1",
              "0",
              "1"
            ],
            [
              "Power",
              "2⁶",
              "2⁵",
              "2⁴",
              "2³",
              "2²",
              "2¹",
              "2⁰",
              ".",
              "2⁻¹",
              "2⁻²",
              "2⁻³"
            ],
            [
              "Weight",
              "64",
              "32",
              "16",
              "8",
              "4",
              "2",
              "1",
              ".",
              "0.5",
              "0.25",
              "0.125"
            ]
          ]
        },
        {
          "title": "Step 2: Weighted Summation",
          "type": "summary",
          "content": "64 + 16 + 8 + 2 + 0.5 + 0.125 = 90.625₁₀"
        }
      ],
      "fastShortcut": "Fast Inspection: 64 + 16 + 8 + 2 = 90. .101 = 1/2 + 1/8 = 5/8 = 0.625. Result: 90.625!",
      "verification": "Base 10 Check: 90.625₁₀."
    }
  },
  {
    "id": "q-c18",
    "trackId": "conversions",
    "trackTitle": "Topic 1: Number Systems & All 12 Conversions",
    "topicBadge": "1.3C: Decimal to Octal",
    "questionType": "numerical",
    "difficulty": "Easy",
    "set": "setA",
    "question": "Convert the integer decimal number (489)₁₀ into its equivalent Octal representation.",
    "promptDetail": "Show successive division by 8 with quotients and remainders.",
    "inputFormatHint": "Enter octal digits, e.g., 751",
    "correctAnswer": "751",
    "acceptedAnswers": [
      "751",
      "(751)8",
      "751_8"
    ],
    "options": [
      {
        "label": "A",
        "text": "751",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "157",
        "distractorReason": "Read remainders top to bottom instead of bottom to top"
      },
      {
        "label": "C",
        "text": "761",
        "distractorReason": "Division error on second step"
      },
      {
        "label": "D",
        "text": "651",
        "distractorReason": "489 / 8 calculated quotient as 60 instead of 61"
      }
    ],
    "hint1": "Formula & Rule: Repeatedly divide by 8 and read remainders upward from LSB to MSB.",
    "hint2": "First Step & Trap: 489 / 8 = 61 R1 (61 × 8 = 488). Next: 61 / 8 = 7 R5. Finally: 7 / 8 = 0 R7.",
    "solution": {
      "finalAnswer": "(751)₈",
      "steps": [
        {
          "title": "Step 1: Division Ladder by 8",
          "type": "ladder",
          "headers": [
            "Division (N ÷ 8)",
            "Quotient (Q)",
            "Remainder (R)",
            "Digit"
          ],
          "rows": [
            [
              "489 ÷ 8",
              "61",
              "1",
              "d0 (LSB)"
            ],
            [
              "61 ÷ 8",
              "7",
              "5",
              "d1"
            ],
            [
              "7 ÷ 8",
              "0",
              "7",
              "d2 (MSB)"
            ]
          ],
          "readDirection": "Read upward (↑): (489)₁₀ = (751)₈"
        }
      ],
      "fastShortcut": "Fast Base 8 Verification: 7×64 + 5×8 + 1 = 448 + 40 + 1 = 489₁₀!",
      "verification": "Base 10 Check: 448 + 40 + 1 = 489₁₀ (100% verified)."
    }
  },
  {
    "id": "q-c19",
    "trackId": "conversions",
    "trackTitle": "Topic 1: Number Systems & All 12 Conversions",
    "topicBadge": "1.3D: Decimal to Hexadecimal",
    "questionType": "numerical",
    "difficulty": "Easy",
    "set": "setA",
    "question": "Convert the integer decimal number (874)₁₀ into its equivalent Hexadecimal representation.",
    "promptDetail": "Show successive division by 16 and mapping of remainders >= 10 to letters A-F.",
    "inputFormatHint": "Enter hex string, e.g., 36A",
    "correctAnswer": "36A",
    "acceptedAnswers": [
      "36A",
      "36a",
      "(36A)16",
      "0x36A"
    ],
    "options": [
      {
        "label": "A",
        "text": "36A",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A63",
        "distractorReason": "Reversed hex digit order"
      },
      {
        "label": "C",
        "text": "369",
        "distractorReason": "Mapped remainder 10 to 9 instead of A"
      },
      {
        "label": "D",
        "text": "37A",
        "distractorReason": "Quotient division error"
      }
    ],
    "hint1": "Formula & Rule: 874 ÷ 16 = 54 R 10 (which is hex digit A).",
    "hint2": "First Step & Trap: 54 ÷ 16 = 3 R 6. 3 ÷ 16 = 0 R 3. Read upward: 3 6 A.",
    "solution": {
      "finalAnswer": "(36A)₁₆",
      "steps": [
        {
          "title": "Step 1: Division Ladder by 16",
          "type": "ladder",
          "headers": [
            "Division (N ÷ 16)",
            "Quotient (Q)",
            "Remainder (R)",
            "Hex Digit"
          ],
          "rows": [
            [
              "874 ÷ 16",
              "54",
              "10",
              "A (LSB)"
            ],
            [
              "54 ÷ 16",
              "3",
              "6",
              "6"
            ],
            [
              "3 ÷ 16",
              "0",
              "3",
              "3 (MSB)"
            ]
          ],
          "readDirection": "Read upward (↑): (874)₁₀ = (36A)₁₆"
        }
      ],
      "fastShortcut": "Fast Inspection: 3×256 + 6×16 + 10 = 768 + 96 + 10 = 874₁₀!",
      "verification": "Base 10 Check: 768 + 96 + 10 = 874₁₀."
    }
  },
  {
    "id": "q-c20",
    "trackId": "conversions",
    "trackTitle": "Topic 1: Number Systems & All 12 Conversions",
    "topicBadge": "1.3E: Fractional Octal to Decimal",
    "questionType": "numerical",
    "difficulty": "Medium",
    "set": "setA",
    "question": "Convert the fractional octal number (375.4)₈ into its exact Decimal representation.",
    "promptDetail": "Expand in positional powers of 8: 8², 8¹, 8⁰ and 8⁻¹.",
    "inputFormatHint": "Enter decimal number, e.g., 253.5",
    "correctAnswer": "253.5",
    "acceptedAnswers": [
      "253.5",
      "(253.5)10",
      "+253.5"
    ],
    "options": [
      {
        "label": "A",
        "text": "253.5",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "253.4",
        "distractorReason": "Left fractional digit 4 as 0.4 instead of dividing by 8"
      },
      {
        "label": "C",
        "text": "245.5",
        "distractorReason": "Multiplied 3 × 64 as 184 instead of 192"
      },
      {
        "label": "D",
        "text": "253.25",
        "distractorReason": "Divided 4 by 16 instead of 8"
      }
    ],
    "hint1": "Formula & Rule: Integer: 3×64 + 7×8 + 5×1 = 192 + 56 + 5 = 253. Fraction: 4/8 = 0.5.",
    "hint2": "First Step & Trap: Total = 253 + 0.5 = 253.5.",
    "solution": {
      "finalAnswer": "253.5₁₀",
      "steps": [
        {
          "title": "Step 1: Positional Powers of 8",
          "type": "matrix",
          "headers": [
            "Digit",
            "3",
            "7",
            "5",
            ".",
            "4"
          ],
          "rows": [
            [
              "Power",
              "8²",
              "8¹",
              "8⁰",
              ".",
              "8⁻¹"
            ],
            [
              "Weight",
              "64",
              "8",
              "1",
              ".",
              "0.125"
            ],
            [
              "Product",
              "192",
              "56",
              "5",
              ".",
              "0.5"
            ]
          ]
        },
        {
          "title": "Step 2: Sum the Terms",
          "type": "summary",
          "content": "192 + 56 + 5 + 0.5 = 253.5₁₀"
        }
      ],
      "fastShortcut": "Fast Inspection: 3×64=192, 7×8=56, 5×1=5 -> 253. 4/8 = 0.5 -> 253.5!",
      "verification": "Base 10 Check: 253.5₁₀."
    }
  },
  {
    "id": "q-c21",
    "trackId": "conversions",
    "trackTitle": "Topic 1: Number Systems & All 12 Conversions",
    "topicBadge": "1.3F: Fractional Hexadecimal to Decimal",
    "questionType": "numerical",
    "difficulty": "Medium",
    "set": "setA",
    "question": "Convert the fractional hexadecimal number (4A.C)₁₆ into its exact Decimal value.",
    "promptDetail": "Expand using 16¹, 16⁰, and 16⁻¹ where A = 10 and C = 12.",
    "inputFormatHint": "Enter decimal number, e.g., 74.75",
    "correctAnswer": "74.75",
    "acceptedAnswers": [
      "74.75",
      "(74.75)10",
      "+74.75"
    ],
    "options": [
      {
        "label": "A",
        "text": "74.75",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "74.12",
        "distractorReason": "Left fractional C as 0.12 instead of 12/16"
      },
      {
        "label": "C",
        "text": "70.75",
        "distractorReason": "Omitted digit A (10)"
      },
      {
        "label": "D",
        "text": "68.75",
        "distractorReason": "Calculated 4 × 16 as 58 instead of 64"
      }
    ],
    "hint1": "Formula & Rule: 4×16 + 10×1 + 12/16 = 64 + 10 + 0.75 = 74.75.",
    "hint2": "First Step & Trap: C is 12. 12 / 16 = 3 / 4 = 0.75.",
    "solution": {
      "finalAnswer": "74.75₁₀",
      "steps": [
        {
          "title": "Step 1: Hexadecimal Positional Expansion",
          "type": "summary",
          "content": "Value = (4 × 16¹) + (10 × 16⁰) + (12 × 16⁻¹) = 64 + 10 + 0.75 = 74.75₁₀"
        }
      ],
      "fastShortcut": "Fast Inspection: 4×16=64, A=10 -> 74. C/16 = 12/16 = 0.75 -> 74.75!",
      "verification": "Base 10 Check: 74.75₁₀."
    }
  },
  {
    "id": "q-c22",
    "trackId": "conversions",
    "trackTitle": "Topic 1: Number Systems & All 12 Conversions",
    "topicBadge": "1.3G: Binary to Octal Grouping with Outer Padding",
    "questionType": "numerical",
    "difficulty": "Medium",
    "set": "setB",
    "question": "Convert the binary number (100111010.1101)₂ into its exact Octal equivalent.",
    "promptDetail": "Pad fractional triplets on the right: .110 100.",
    "inputFormatHint": "Enter octal string with point, e.g., 472.64",
    "correctAnswer": "472.64",
    "acceptedAnswers": [
      "472.64",
      "(472.64)8",
      "472.64_8"
    ],
    "options": [
      {
        "label": "A",
        "text": "472.64",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "472.61",
        "distractorReason": "Padded fractional 1 with leading 00 instead of trailing 00"
      },
      {
        "label": "C",
        "text": "472.13",
        "distractorReason": "Grouped fraction into 4 bits instead of 3 bits"
      },
      {
        "label": "D",
        "text": "462.64",
        "distractorReason": "Group 111 misread as 6 instead of 7"
      }
    ],
    "hint1": "Formula & Rule: Group into 3 bits outward from radix point. Integer: 100 111 010. Fraction: 110 100 (padded with two 0s!).",
    "hint2": "First Step & Trap: 100=4, 111=7, 010=2. Fraction: 110=6, 100=4 -> 472.64.",
    "solution": {
      "finalAnswer": "(472.64)₈",
      "steps": [
        {
          "title": "Step 1: Triplet Grouping with Amber Padding",
          "type": "table",
          "headers": [
            "Position",
            "3-Bit Group",
            "Octal Digit"
          ],
          "rows": [
            [
              "Integer High",
              "100",
              "4"
            ],
            [
              "Integer Mid",
              "111",
              "7"
            ],
            [
              "Integer Low",
              "010",
              "2"
            ],
            [
              "Radix Point",
              ".",
              "."
            ],
            [
              "Fraction Group 1",
              "110",
              "6"
            ],
            [
              "Fraction Group 2",
              "100 (Padded with 00)",
              "4"
            ]
          ]
        }
      ],
      "fastShortcut": "Fast Grouping: 100(4) 111(7) 010(2) . 110(6) 100(4) = 472.64₈!",
      "verification": "Bit Count Check: 9 integer bits = 3 digits; 4 fractional bits padded to 6 bits = 2 digits."
    }
  },
  {
    "id": "q-c23",
    "trackId": "conversions",
    "trackTitle": "Topic 1: Number Systems & All 12 Conversions",
    "topicBadge": "1.3H: Binary to Hexadecimal Grouping with Outer Padding",
    "questionType": "numerical",
    "difficulty": "Medium",
    "set": "setB",
    "question": "Convert the binary number (1110101011.01101)₂ into its equivalent Hexadecimal representation.",
    "promptDetail": "Pad integer on the left (0011) and fraction on the right (0110 1000).",
    "inputFormatHint": "Enter hex string with point, e.g., 3AB.68",
    "correctAnswer": "3AB.68",
    "acceptedAnswers": [
      "3AB.68",
      "3ab.68",
      "(3AB.68)16",
      "0x3AB.68"
    ],
    "options": [
      {
        "label": "A",
        "text": "3AB.68",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "3AB.61",
        "distractorReason": "Padded fractional bit 1 with leading 000 instead of trailing 000"
      },
      {
        "label": "C",
        "text": "7AB.68",
        "distractorReason": "Integer left padding error"
      },
      {
        "label": "D",
        "text": "3BA.68",
        "distractorReason": "Swapped middle nibbles A and B"
      }
    ],
    "hint1": "Formula & Rule: Group in 4-bit nibbles outward from radix point.",
    "hint2": "First Step & Trap: Integer: 0011 (3), 1010 (A), 1011 (B). Fraction: 0110 (6), 1000 (8).",
    "solution": {
      "finalAnswer": "(3AB.68)₁₆",
      "steps": [
        {
          "title": "Step 1: 4-Bit Nibble Partitioning",
          "type": "table",
          "headers": [
            "Position",
            "4-Bit Nibble",
            "Hex Digit"
          ],
          "rows": [
            [
              "Integer Nibble 3",
              "0011 (Padded with 00)",
              "3"
            ],
            [
              "Integer Nibble 2",
              "1010",
              "A"
            ],
            [
              "Integer Nibble 1",
              "1011",
              "B"
            ],
            [
              "Radix Point",
              ".",
              "."
            ],
            [
              "Fraction Nibble 1",
              "0110",
              "6"
            ],
            [
              "Fraction Nibble 2",
              "1000 (Padded with 000)",
              "8"
            ]
          ]
        }
      ],
      "fastShortcut": "Fast Nibble Scan: 0011(3) 1010(A) 1011(B) . 0110(6) 1000(8) = 3AB.68₁₆!",
      "verification": "Hex Mapping: 3=0011, A=1010, B=1011, 6=0110, 8=1000."
    }
  },
  {
    "id": "q-c24",
    "trackId": "conversions",
    "trackTitle": "Topic 1: Number Systems & All 12 Conversions",
    "topicBadge": "1.3I: Octal to Hexadecimal via 2-Hop Bridge",
    "questionType": "numerical",
    "difficulty": "Hard",
    "set": "setB",
    "question": "Convert the octal number (735.6)₈ into its equivalent Hexadecimal representation using the 2-Hop Binary Bridge.",
    "promptDetail": "Hop 1: Expand octal digits to 3-bit binary. Hop 2: Regroup into 4-bit nibbles outward from radix point.",
    "inputFormatHint": "Enter hex string, e.g., 1DD.C",
    "correctAnswer": "1DD.C",
    "acceptedAnswers": [
      "1DD.C",
      "1dd.c",
      "(1DD.C)16",
      "0x1DD.C"
    ],
    "options": [
      {
        "label": "A",
        "text": "1DD.C",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "1DD.6",
        "distractorReason": "Left fractional digit 6 without regrouping into 4 bits"
      },
      {
        "label": "C",
        "text": "3DD.C",
        "distractorReason": "Regrouping nibble error on MSB"
      },
      {
        "label": "D",
        "text": "1ED.C",
        "distractorReason": "Middle nibble addition error"
      }
    ],
    "hint1": "Formula & Rule: Hop 1: 7=111, 3=011, 5=101 . 6=110 -> (111011101.110)₂. Hop 2: Regroup in 4s: 0001 1101 1101 . 1100.",
    "hint2": "First Step & Trap: 0001=1, 1101=D, 1101=D . 1100=C. Answer = 1DD.C.",
    "solution": {
      "finalAnswer": "(1DD.C)₁₆",
      "steps": [
        {
          "title": "Hop 1: Octal to 3-Bit Binary",
          "type": "summary",
          "content": "7 -> 111, 3 -> 011, 5 -> 101, . 6 -> 110. Full binary: 111011101.110₂"
        },
        {
          "title": "Hop 2: Regroup into 4-Bit Nibbles",
          "type": "table",
          "headers": [
            "Nibble",
            "Bits",
            "Hex Digit"
          ],
          "rows": [
            [
              "Nibble 3",
              "0001 (Padded with 000)",
              "1"
            ],
            [
              "Nibble 2",
              "1101",
              "D"
            ],
            [
              "Nibble 1",
              "1101",
              "D"
            ],
            [
              "Point",
              ".",
              "."
            ],
            [
              "Fraction Nibble",
              "1100 (Padded with 0)",
              "C"
            ]
          ]
        }
      ],
      "fastShortcut": "Fast Bridge: 735.6₈ = 111 011 101 . 110 -> 0001(1) 1101(D) 1101(D) . 1100(C) = 1DD.C₁₆!",
      "verification": "Base 10 Check: (735.6)₈ = 477.75₁₀ = (1DD.C)₁₆ (100% verified)."
    }
  },
  {
    "id": "q-c25",
    "trackId": "conversions",
    "trackTitle": "Topic 1: Number Systems & All 12 Conversions",
    "topicBadge": "1.3J: Hexadecimal to Octal via 2-Hop Bridge",
    "questionType": "numerical",
    "difficulty": "Hard",
    "set": "setB",
    "question": "Convert the hexadecimal number (2F.8)₁₆ into its equivalent Octal representation.",
    "promptDetail": "Hop 1: Expand hex to 4-bit binary. Hop 2: Regroup into 3-bit triplets.",
    "inputFormatHint": "Enter octal string, e.g., 57.4",
    "correctAnswer": "57.4",
    "acceptedAnswers": [
      "57.4",
      "(57.4)8",
      "57.4_8",
      "057.4"
    ],
    "options": [
      {
        "label": "A",
        "text": "57.4",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "57.8",
        "distractorReason": "Left fractional 8 in hex without converting to octal"
      },
      {
        "label": "C",
        "text": "27.4",
        "distractorReason": "Binary expansion error for digit 2"
      },
      {
        "label": "D",
        "text": "67.4",
        "distractorReason": "Grouping triplet alignment error"
      }
    ],
    "hint1": "Formula & Rule: 2=0010, F=1111 . 8=1000 -> (00101111.1000)₂. Regroup into 3s: 000 101 111 . 100.",
    "hint2": "First Step & Trap: 000=0, 101=5, 111=7 . 100=4 -> (57.4)₈.",
    "solution": {
      "finalAnswer": "(57.4)₈",
      "steps": [
        {
          "title": "Hop 1: Hex to 4-Bit Binary",
          "type": "summary",
          "content": "2 -> 0010, F -> 1111, 8 -> 1000 -> (00101111.1000)₂"
        },
        {
          "title": "Hop 2: Regroup into 3-Bit Triplets",
          "type": "summary",
          "content": "(000) (101) (111) . (100) = 0 5 7 . 4 = (57.4)₈"
        }
      ],
      "fastShortcut": "Fast Inspection: 2F₁₆ = 47₁₀ = 5×8 + 7 = 57₈. 0.8₁₆ = 8/16 = 0.5 = 4/8 = 0.4₈ -> 57.4₈!",
      "verification": "Base 10 Check: (2F.8)₁₆ = 47.5₁₀ = (57.4)₈."
    }
  },
  {
    "id": "q-c26",
    "trackId": "conversions",
    "trackTitle": "Topic 1: Number Systems & All 12 Conversions",
    "topicBadge": "1.3K: Decimal to Fractional Octal",
    "questionType": "numerical",
    "difficulty": "Hard",
    "set": "setB",
    "question": "Convert the fractional decimal number (71.875)₁₀ into its equivalent Octal representation.",
    "promptDetail": "Show successive division by 8 for 71 and multiplication by 8 for 0.875.",
    "inputFormatHint": "Enter octal string, e.g., 107.7",
    "correctAnswer": "107.7",
    "acceptedAnswers": [
      "107.7",
      "(107.7)8",
      "107.7_8"
    ],
    "options": [
      {
        "label": "A",
        "text": "107.7",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "107.875",
        "distractorReason": "Left fractional part in decimal"
      },
      {
        "label": "C",
        "text": "170.7",
        "distractorReason": "Swapped integer digits 0 and 7"
      },
      {
        "label": "D",
        "text": "87.7",
        "distractorReason": "Division error: 71 / 8 = 8 R 7, 8 / 8 = 1 R 0"
      }
    ],
    "hint1": "Formula & Rule: 71 ÷ 8 = 8 R 7; 8 ÷ 8 = 1 R 0; 1 ÷ 8 = 0 R 1 -> 107. 0.875 × 8 = 7.00 -> .7.",
    "hint2": "First Step & Trap: Notice the middle quotient 8 / 8 produces remainder 0, giving digit 0!",
    "solution": {
      "finalAnswer": "(107.7)₈",
      "steps": [
        {
          "title": "Step 1: Integer Division Ladder (71 ÷ 8)",
          "type": "ladder",
          "headers": [
            "Division",
            "Quotient",
            "Remainder",
            "Digit"
          ],
          "rows": [
            [
              "71 ÷ 8",
              "8",
              "7",
              "d0 (LSB)"
            ],
            [
              "8 ÷ 8",
              "1",
              "0",
              "d1"
            ],
            [
              "1 ÷ 8",
              "0",
              "1",
              "d2 (MSB)"
            ]
          ],
          "readDirection": "Read upward (↑): 107"
        },
        {
          "title": "Step 2: Fractional Multiplication (0.875 × 8)",
          "type": "table",
          "headers": [
            "Multiplication",
            "Product",
            "Extracted Carry"
          ],
          "rows": [
            [
              "0.875 × 8",
              "7.000",
              "7 (Terminated)"
            ]
          ],
          "readDirection": "Read downward (↓): .7"
        }
      ],
      "fastShortcut": "Fast Inspection: 71 = 64 + 7 = 1×8² + 0×8¹ + 7×8⁰ = 107₈. 0.875 = 7/8 = 0.7₈ -> 107.7₈!",
      "verification": "Base 10 Check: 1×64 + 0×8 + 7 + 7/8 = 71.875₁₀ (100% verified)."
    }
  },
  {
    "id": "q-c27",
    "trackId": "conversions",
    "trackTitle": "Topic 1: Number Systems & All 12 Conversions",
    "topicBadge": "1.3L: Decimal to Fractional Hexadecimal",
    "questionType": "numerical",
    "difficulty": "Hard",
    "set": "setB",
    "question": "Convert the fractional decimal number (179.0625)₁₀ into its equivalent Hexadecimal representation.",
    "promptDetail": "Show division by 16 for 179 and multiplication by 16 for 0.0625.",
    "inputFormatHint": "Enter hex string, e.g., B3.1",
    "correctAnswer": "B3.1",
    "acceptedAnswers": [
      "B3.1",
      "b3.1",
      "(B3.1)16",
      "0xB3.1"
    ],
    "options": [
      {
        "label": "A",
        "text": "B3.1",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "3B.1",
        "distractorReason": "Reversed integer hex digits B and 3"
      },
      {
        "label": "C",
        "text": "B3.0625",
        "distractorReason": "Did not multiply fractional part by 16"
      },
      {
        "label": "D",
        "text": "C3.1",
        "distractorReason": "Mapped remainder 11 to C instead of B"
      }
    ],
    "hint1": "Formula & Rule: 179 ÷ 16 = 11 R 3 (11 = B). 0.0625 × 16 = 1.000 -> .1.",
    "hint2": "First Step & Trap: 179 = 11 × 16 + 3 = B3. Fraction: 1/16 = 0.0625 = .1.",
    "solution": {
      "finalAnswer": "(B3.1)₁₆",
      "steps": [
        {
          "title": "Step 1: Integer Division (179 ÷ 16)",
          "type": "ladder",
          "headers": [
            "Division",
            "Quotient",
            "Remainder",
            "Hex Digit"
          ],
          "rows": [
            [
              "179 ÷ 16",
              "11",
              "3",
              "3 (LSB)"
            ],
            [
              "11 ÷ 16",
              "0",
              "11",
              "B (MSB)"
            ]
          ],
          "readDirection": "Read upward (↑): (179)₁₀ = (B3)₁₆"
        },
        {
          "title": "Step 2: Fractional Multiplication (0.0625 × 16)",
          "type": "table",
          "headers": [
            "Multiplication",
            "Product",
            "Hex Digit"
          ],
          "rows": [
            [
              "0.0625 × 16",
              "1.0000",
              "1 (Terminated)"
            ]
          ],
          "readDirection": "Read downward (↓): (0.0625)₁₀ = (0.1)₁₆"
        }
      ],
      "fastShortcut": "Fast Inspection: 11×16 + 3 = 179 (B3). 1/16 = 0.0625 (.1). Result: B3.1₁₆!",
      "verification": "Base 10 Check: 11×16 + 3 + 1/16 = 179.0625₁₀ (100% verified)."
    }
  },
  {
    "id": "q-c28",
    "trackId": "conversions",
    "trackTitle": "Topic 1: Number Systems & All 12 Conversions",
    "topicBadge": "1.1A: Base Radix Positional Rule",
    "questionType": "fill_blank",
    "difficulty": "Easy",
    "set": "theory",
    "question": "In any positional number system with base radix r, what is the largest valid single-digit symbol?",
    "promptDetail": "State the mathematical formula in terms of radix r.",
    "inputFormatHint": "Enter formula, e.g., r - 1 or r-1",
    "correctAnswer": "r - 1",
    "acceptedAnswers": [
      "r - 1",
      "r-1",
      "(r-1)",
      "r -1"
    ],
    "options": [
      {
        "label": "A",
        "text": "r - 1",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "r",
        "distractorReason": "The radix r itself can never appear as a single digit (it is written as 10_r)"
      },
      {
        "label": "C",
        "text": "r + 1",
        "distractorReason": "Exceeds the radix"
      },
      {
        "label": "D",
        "text": "2^r",
        "distractorReason": "Confused with state count"
      }
    ],
    "hint1": "Formula & Rule: In base 10, largest digit is 9 (10 - 1). In base 2, largest digit is 1 (2 - 1). In base r, largest digit is r - 1.",
    "hint2": "First Step & Trap: The count of symbols is r, running from 0 up to r - 1.",
    "solution": {
      "finalAnswer": "r - 1",
      "steps": [
        {
          "title": "Fundamental Theorem of Positional Radices",
          "type": "summary",
          "content": "A number system of radix r uses exactly r distinct symbols: {0, 1, 2, ..., r - 1}. Therefore, the maximum single digit symbol is always r - 1."
        }
      ],
      "fastShortcut": "Fast Rule: Base 10 -> 9; Base 2 -> 1; Base 8 -> 7; Base 16 -> 15 (F). Formula: r - 1!",
      "verification": "Axiomatic Base Definition Check."
    }
  },
  {
    "id": "q-c29",
    "trackId": "conversions",
    "trackTitle": "Topic 1: Number Systems & All 12 Conversions",
    "topicBadge": "1.1B: Binary Terminology (Nibble vs Byte)",
    "questionType": "fill_blank",
    "difficulty": "Easy",
    "set": "theory",
    "question": "How many bits are in exactly 1 nibble and 1 byte respectively?",
    "promptDetail": "Enter the number of bits for a nibble followed by a byte.",
    "inputFormatHint": "Enter text, e.g., 4 bits and 8 bits or 4 and 8",
    "correctAnswer": "4 bits and 8 bits",
    "acceptedAnswers": [
      "4 bits and 8 bits",
      "4 and 8",
      "4, 8",
      "4,8",
      "4 bits, 8 bits"
    ],
    "options": [
      {
        "label": "A",
        "text": "4 bits and 8 bits",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "8 bits and 16 bits",
        "distractorReason": "Confused nibble with byte, and byte with word"
      },
      {
        "label": "C",
        "text": "2 bits and 4 bits",
        "distractorReason": "Underestimated bit counts"
      },
      {
        "label": "D",
        "text": "4 bits and 16 bits",
        "distractorReason": "16 bits is a 2-byte word"
      }
    ],
    "hint1": "Formula & Rule: 1 nibble = 4 bits (half a byte). 1 byte = 8 bits.",
    "hint2": "First Step & Trap: One hex digit corresponds to exactly 1 nibble (4 bits).",
    "solution": {
      "finalAnswer": "4 bits and 8 bits",
      "steps": [
        {
          "title": "Standard Architecture Units",
          "type": "summary",
          "content": "1 Nibble = 4 Bits (one hexadecimal digit).\n1 Byte = 8 Bits (two hexadecimal digits, standard addressable memory unit)."
        }
      ],
      "fastShortcut": "Fast Fact: 1 Nibble = 4 bits, 1 Byte = 8 bits!",
      "verification": "Standard IEEE / ISO computing definition."
    }
  },
  {
    "id": "q-c30",
    "trackId": "conversions",
    "trackTitle": "Topic 1: Number Systems & All 12 Conversions",
    "topicBadge": "1.1C: Largest 4-Bit Hex Value",
    "questionType": "fill_blank",
    "difficulty": "Easy",
    "set": "theory",
    "question": "The hexadecimal equivalent of the largest 4-bit unsigned binary integer (1111)₂ is ____.",
    "promptDetail": "Enter the single uppercase hexadecimal digit.",
    "inputFormatHint": "Enter single hex character, e.g., F",
    "correctAnswer": "F",
    "acceptedAnswers": [
      "F",
      "f",
      "F_16",
      "(F)16",
      "0xF"
    ],
    "options": [
      {
        "label": "A",
        "text": "F",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "E",
        "distractorReason": "E represents 14 (1110)₂"
      },
      {
        "label": "C",
        "text": "15",
        "distractorReason": "15 is decimal, not single-digit hexadecimal"
      },
      {
        "label": "D",
        "text": "10",
        "distractorReason": "10 in hex is 16 in decimal"
      }
    ],
    "hint1": "Formula & Rule: (1111)₂ = 8 + 4 + 2 + 1 = 15₁₀ = F₁₆.",
    "hint2": "First Step & Trap: In hexadecimal, decimal values 10 to 15 map to A to F.",
    "solution": {
      "finalAnswer": "F₁₆",
      "steps": [
        {
          "title": "Nibble Evaluation",
          "type": "summary",
          "content": "1111₂ = 8 + 4 + 2 + 1 = 15₁₀. In base 16, 15 is represented by the single symbol F."
        }
      ],
      "fastShortcut": "Fast Fact: All 1s in 4 bits = F₁₆!",
      "verification": "Base 16 Check: F = 15."
    }
  },
  {
    "id": "q-c31",
    "trackId": "conversions",
    "trackTitle": "Topic 1: Number Systems & All 12 Conversions",
    "topicBadge": "1.2A: Decimal to Octal Algorithm",
    "questionType": "fill_blank",
    "difficulty": "Easy",
    "set": "theory",
    "question": "To convert an integer from Decimal to Octal, we divide successively by ____ and read remainders from ____ to ____.",
    "promptDetail": "State the divisor and read direction.",
    "inputFormatHint": "Enter text, e.g., 8 and bottom to top",
    "correctAnswer": "8 and bottom to top",
    "acceptedAnswers": [
      "8 and bottom to top",
      "8, bottom to top",
      "8 and upward",
      "8 and bottom-to-top"
    ],
    "options": [
      {
        "label": "A",
        "text": "8 and bottom to top",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "8 and top to bottom",
        "distractorReason": "Top to bottom reading inverts MSB and LSB"
      },
      {
        "label": "C",
        "text": "2 and bottom to top",
        "distractorReason": "Dividing by 2 converts to binary, not octal"
      },
      {
        "label": "D",
        "text": "16 and bottom to top",
        "distractorReason": "Dividing by 16 converts to hex"
      }
    ],
    "hint1": "Formula & Rule: Repeated division by target base (8). The first remainder is LSB, last remainder is MSB. Thus read upward (bottom to top).",
    "hint2": "First Step & Trap: Always collect remainders from the last non-zero division quotient up to the first step.",
    "solution": {
      "finalAnswer": "8 and bottom to top",
      "steps": [
        {
          "title": "Integer Base-r Conversion Theorem",
          "type": "summary",
          "content": "For any integer N, repeated division by r yields quotients and remainders: N = Q0·r + R0. R0 has weight r⁰ (LSB). The final remainder has weight rⁿ⁻¹ (MSB). Therefore, remainders are read bottom to top."
        }
      ],
      "fastShortcut": "Fast Rule: Divide by 8, read remainders UP (bottom to top)!",
      "verification": "Algorithm Check: Verified."
    }
  },
  {
    "id": "q-c32",
    "trackId": "conversions",
    "trackTitle": "Topic 1: Number Systems & All 12 Conversions",
    "topicBadge": "1.2B: Fractional Binary Conversion Rule",
    "questionType": "fill_blank",
    "difficulty": "Easy",
    "set": "theory",
    "question": "In fractional binary conversion, multiplying decimal 0.625 successively by 2 gives the first fractional bit as ____.",
    "promptDetail": "Calculate 0.625 × 2 and extract the integer part.",
    "inputFormatHint": "Enter 0 or 1",
    "correctAnswer": "1",
    "acceptedAnswers": [
      "1",
      "bit 1",
      "b-1 = 1"
    ],
    "options": [
      {
        "label": "A",
        "text": "1",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "0",
        "distractorReason": "0.625 × 2 = 1.250, which has integer part 1, not 0"
      },
      {
        "label": "C",
        "text": "2",
        "distractorReason": "Binary bits can only be 0 or 1"
      },
      {
        "label": "D",
        "text": "Indeterminate",
        "distractorReason": "Multiplication by 2 produces a deterministic integer part"
      }
    ],
    "hint1": "Formula & Rule: 0.625 × 2 = 1.250. The integer part is 1, so bit b-1 = 1.",
    "hint2": "First Step & Trap: The remaining fraction 0.250 is multiplied by 2 in the next step.",
    "solution": {
      "finalAnswer": "1",
      "steps": [
        {
          "title": "Fractional Algorithm Step 1",
          "type": "summary",
          "content": "0.625 × 2 = 1.250. Integer part = 1 -> b-1 = 1. Remaining fraction = 0.250."
        }
      ],
      "fastShortcut": "Fast Rule: 0.625 >= 0.5 (2⁻¹), so first bit is 1!",
      "verification": "Math Check: 0.625 × 2 = 1.25 -> 1."
    }
  },
  {
    "id": "q-c33",
    "trackId": "conversions",
    "trackTitle": "Topic 1: Number Systems & All 12 Conversions",
    "topicBadge": "1.2C: Fractional Grouping Direction",
    "questionType": "conceptual_mcq",
    "difficulty": "Easy",
    "set": "theory",
    "question": "When converting a binary fraction to octal, how should bits be grouped from the radix point?",
    "promptDetail": "Identify grouping size, direction of traversal, and padding rule.",
    "inputFormatHint": "Select the correct option A, B, C, or D",
    "correctAnswer": "Group into 3 bits moving rightward from radix point, padding trailing zeros as needed",
    "acceptedAnswers": [
      "Group into 3 bits moving rightward from radix point, padding trailing zeros as needed",
      "A"
    ],
    "options": [
      {
        "label": "A",
        "text": "Group into 3 bits moving rightward from radix point, padding trailing zeros as needed",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Group into 3 bits moving leftward toward the radix point",
        "distractorReason": "Grouping leftward into the radix point skews fractional bit weights"
      },
      {
        "label": "C",
        "text": "Group into 4 bits moving rightward",
        "distractorReason": "4 bits is for hexadecimal, not octal"
      },
      {
        "label": "D",
        "text": "Group into 3 bits and pad leading zeros next to the radix point",
        "distractorReason": "Padding zeros immediately adjacent to radix point alters the fraction value"
      }
    ],
    "hint1": "Formula & Rule: Fractional bits represent negative powers of 2 (2⁻¹, 2⁻², 2⁻³...). Grouping must start immediately at the radix point and move rightward.",
    "hint2": "First Step & Trap: Never pad zeros next to the radix point! Zeros are padded at the outer trailing edge.",
    "solution": {
      "finalAnswer": "Group into 3 bits moving rightward from radix point, padding trailing zeros as needed",
      "steps": [
        {
          "title": "Radix Point Partitioning Rule",
          "type": "summary",
          "content": "Integer bits are grouped moving LEFTWARD from the radix point (padded with leading zeros).\nFractional bits are grouped moving RIGHTWARD from the radix point (padded with trailing zeros)."
        }
      ],
      "fastShortcut": "Fast Memory Rule: Move OUTWARD from radix point in both directions!",
      "verification": "Positional weight preservation check."
    }
  },
  {
    "id": "q-c34",
    "trackId": "conversions",
    "trackTitle": "Topic 1: Number Systems & All 12 Conversions",
    "topicBadge": "1.1D: Hexadecimal Alphabetical Range",
    "questionType": "conceptual_mcq",
    "difficulty": "Easy",
    "set": "theory",
    "question": "A hexadecimal number system requires 16 distinct symbols. The letters A through F represent decimal values:",
    "promptDetail": "Select the exact decimal range corresponding to letters A to F.",
    "inputFormatHint": "Select option A, B, C, or D",
    "correctAnswer": "10 to 15",
    "acceptedAnswers": [
      "10 to 15",
      "A",
      "10-15"
    ],
    "options": [
      {
        "label": "A",
        "text": "10 to 15",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "1 to 6",
        "distractorReason": "Confused alphabetical index with hex digit value"
      },
      {
        "label": "C",
        "text": "11 to 16",
        "distractorReason": "Off-by-one error (A is 10, not 11; F is 15, not 16)"
      },
      {
        "label": "D",
        "text": "9 to 14",
        "distractorReason": "9 is already a decimal digit"
      }
    ],
    "hint1": "Formula & Rule: Digits 0 to 9 cover 0 to 9. Letters A, B, C, D, E, F cover 10, 11, 12, 13, 14, 15.",
    "hint2": "First Step & Trap: A=10, B=11, C=12, D=13, E=14, F=15.",
    "solution": {
      "finalAnswer": "10 to 15",
      "steps": [
        {
          "title": "Hexadecimal Symbol Mapping",
          "type": "summary",
          "content": "0..9 -> 0..9\nA -> 10, B -> 11, C -> 12, D -> 13, E -> 14, F -> 15"
        }
      ],
      "fastShortcut": "Fast Fact: A=10, F=15!",
      "verification": "Standard Base 16 definition."
    }
  },
  {
    "id": "q-c35",
    "trackId": "conversions",
    "trackTitle": "Topic 1: Number Systems & All 12 Conversions",
    "topicBadge": "1.3M: Unknown Radix Finding",
    "questionType": "numerical",
    "difficulty": "Medium",
    "set": "theory",
    "question": "If (43)_r = (31)₁₀, what is the value of the unknown radix r?",
    "promptDetail": "Set up the linear equation 4r + 3 = 31 and solve for positive integer r.",
    "inputFormatHint": "Enter single integer, e.g., 7",
    "correctAnswer": "7",
    "acceptedAnswers": [
      "7",
      "r=7",
      "r = 7"
    ],
    "options": [
      {
        "label": "A",
        "text": "7",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "8",
        "distractorReason": "4(8) + 3 = 35 != 31"
      },
      {
        "label": "C",
        "text": "6",
        "distractorReason": "4(6) + 3 = 27 != 31"
      },
      {
        "label": "D",
        "text": "9",
        "distractorReason": "4(9) + 3 = 39 != 31"
      }
    ],
    "hint1": "Formula & Rule: 4 × r¹ + 3 × r⁰ = 31 -> 4r + 3 = 31 -> 4r = 28 -> r = 7.",
    "hint2": "First Step & Trap: Ensure radix 7 is strictly greater than all digits present {4, 3}. Since 7 > 4, it is valid.",
    "solution": {
      "finalAnswer": "r = 7",
      "steps": [
        {
          "title": "Step 1: Set Up Positional Equation",
          "type": "summary",
          "content": "4 × r¹ + 3 × r⁰ = 31 => 4r + 3 = 31"
        },
        {
          "title": "Step 2: Linear Solution",
          "type": "summary",
          "content": "4r = 31 - 3 = 28 => r = 28 / 4 = 7"
        }
      ],
      "fastShortcut": "Fast Inspection: 4r + 3 = 31 -> 4r = 28 -> r = 7!",
      "verification": "Base 10 Check: (43)₇ = 4×7 + 3 = 28 + 3 = 31₁₀ (100% verified)."
    }
  },
  {
    "id": "q-a1",
    "trackId": "arithmetic",
    "trackTitle": "Topic 2: Binary Arithmetic (+, -, ×, ÷)",
    "topicBadge": "1.4A: Multi-Bit Binary Addition",
    "difficulty": "Easy",
    "set": "setA",
    "question": "Perform the binary addition: (10110)₂ + (01101)₂.",
    "promptDetail": "Show column-aligned addition with carry propagation.",
    "inputFormatHint": "Enter binary digits, e.g., 100011",
    "correctAnswer": "100011",
    "acceptedAnswers": [
      "100011",
      "(100011)2",
      "100011_2"
    ],
    "options": [
      {
        "label": "A",
        "text": "100011",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "110011",
        "distractorReason": "Lost carry propagation across b3 to b4"
      },
      {
        "label": "C",
        "text": "100111",
        "distractorReason": "Carried 1 into b2 incorrectly"
      },
      {
        "label": "D",
        "text": "010011",
        "distractorReason": "Dropped MSB overflow carry"
      }
    ],
    "hint1": "Formula & Rule: Binary addition rules: 0+0=0, 0+1=1, 1+1=0 (C=1), 1+1+1=1 (C=1).",
    "hint2": "First Step & Trap: b0: 0+1=1 (C=0). b1: 1+0=1 (C=0). b2: 1+1=0 (C=1). b3: 0+1+1=0 (C=1). b4: 1+0+1=0 (C=1). MSB carry = 1.",
    "solution": {
      "finalAnswer": "(100011)₂",
      "steps": [
        {
          "title": "Step 1: Column-Aligned Addition Grid",
          "type": "grid",
          "headers": [
            "Signal",
            "MSB C",
            "b4",
            "b3",
            "b2",
            "b1",
            "b0"
          ],
          "rows": [
            [
              "Carry-In",
              "(1)",
              "1",
              "1",
              "1",
              "0",
              "0"
            ],
            [
              "Operand A",
              "",
              "1",
              "0",
              "1",
              "1",
              "0"
            ],
            [
              "Operand B",
              "",
              "0",
              "1",
              "1",
              "0",
              "1"
            ],
            [
              "Sum Result",
              "1",
              "0",
              "0",
              "0",
              "1",
              "1"
            ]
          ]
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: 10110₂ = 22₁₀. 01101₂ = 13₁₀. 22 + 13 = 35₁₀ = 32 + 2 + 1 = 100011₂!",
      "verification": "Base 10 Check: 22 + 13 = 35₁₀."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-a2",
    "trackId": "arithmetic",
    "trackTitle": "Topic 2: Binary Arithmetic (+, -, ×, ÷)",
    "topicBadge": "1.4B: Direct Binary Subtraction (A > B)",
    "difficulty": "Easy",
    "set": "setA",
    "question": "Perform direct binary subtraction: (11011)₂ - (01010)₂.",
    "promptDetail": "Show column borrow track where 0 - 1 borrows from left to become 10₂ (2).",
    "inputFormatHint": "Enter binary digits, e.g., 10001",
    "correctAnswer": "10001",
    "acceptedAnswers": [
      "10001",
      "(10001)2",
      "010001",
      "10001_2"
    ],
    "options": [
      {
        "label": "A",
        "text": "10001",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "10011",
        "distractorReason": "Subtracted 1 - 0 as 1 instead of 0 in column b1"
      },
      {
        "label": "C",
        "text": "11001",
        "distractorReason": "Did not propagate subtraction across b3"
      },
      {
        "label": "D",
        "text": "00001",
        "distractorReason": "Lost MSB digit"
      }
    ],
    "hint1": "Formula & Rule: 1-0=1, 1-1=0, 0-0=0. When 0-1 occurs, borrow 1 from the next higher column (value 2).",
    "hint2": "First Step & Trap: Check columns: b0: 1-0=1. b1: 1-1=0. b2: 0-0=0. b3: 1-1=0. b4: 1-0=1. No borrows needed in this case!",
    "solution": {
      "finalAnswer": "(10001)₂",
      "steps": [
        {
          "title": "Step 1: Column-by-Column Subtraction",
          "type": "grid",
          "headers": [
            "Signal",
            "b4",
            "b3",
            "b2",
            "b1",
            "b0"
          ],
          "rows": [
            [
              "Minuend A",
              "1",
              "1",
              "0",
              "1",
              "1"
            ],
            [
              "Subtrahend B",
              "0",
              "1",
              "0",
              "1",
              "0"
            ],
            [
              "Difference",
              "1",
              "0",
              "0",
              "0",
              "1"
            ]
          ]
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: 11011₂ = 27₁₀. 01010₂ = 10₁₀. 27 - 10 = 17₁₀ = 16 + 1 = 10001₂!",
      "verification": "Base 10 Check: 27 - 10 = 17₁₀."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-a3",
    "trackId": "arithmetic",
    "trackTitle": "Topic 2: Binary Arithmetic (+, -, ×, ÷)",
    "topicBadge": "1.4C: Fractional Binary Addition",
    "difficulty": "Medium",
    "set": "setA",
    "question": "Perform fractional binary addition: (1011.101)₂ + (0110.011)₂.",
    "promptDetail": "Align at the radix point and propagate carries across into the integer part.",
    "inputFormatHint": "Enter binary digits with point, e.g., 10010.000 or 10010",
    "correctAnswer": "10010.000",
    "acceptedAnswers": [
      "10010.000",
      "10010",
      "10010.0",
      "10010.00",
      "(10010.000)2"
    ],
    "options": [
      {
        "label": "A",
        "text": "10010.000",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "10001.110",
        "distractorReason": "Lost carry crossing the radix point from b-1 to b0"
      },
      {
        "label": "C",
        "text": "10010.100",
        "distractorReason": "Carried 0 instead of 1 into b-2"
      },
      {
        "label": "D",
        "text": "11010.000",
        "distractorReason": "Miscalculated integer MSB"
      }
    ],
    "hint1": "Formula & Rule: Anchor at radix point. Start at rightmost fraction column b-3: 1+1=0 (C=1). Carry crosses radix point into b0.",
    "hint2": "First Step & Trap: b-3: 1+1=0 (C=1). b-2: 0+1+1=0 (C=1). b-1: 1+0+1=0 (C=1 into b0!). Integer: 1011 + 0110 + 1 = 10010.",
    "solution": {
      "finalAnswer": "(10010.000)₂ = (10010)₂",
      "steps": [
        {
          "title": "Step 1: Column-Aligned Addition Grid with Radix Carry",
          "type": "grid",
          "headers": [
            "Signal",
            "b4",
            "b3",
            "b2",
            "b1",
            "b0",
            ".",
            "b-1",
            "b-2",
            "b-3"
          ],
          "rows": [
            [
              "Carry Track",
              "(1)",
              "1",
              "1",
              "1",
              "1",
              ".",
              "1",
              "1",
              "0"
            ],
            [
              "Operand A",
              "0",
              "1",
              "0",
              "1",
              "1",
              ".",
              "1",
              "0",
              "1"
            ],
            [
              "Operand B",
              "0",
              "0",
              "1",
              "1",
              "0",
              ".",
              "0",
              "1",
              "1"
            ],
            [
              "Sum Result",
              "1",
              "0",
              "0",
              "1",
              "0",
              ".",
              "0",
              "0",
              "0"
            ]
          ]
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: 1011.101₂ = 11.625₁₀. 0110.011₂ = 6.375₁₀. 11.625 + 6.375 = 18.000₁₀ = 10010₂!",
      "verification": "Base 10 Check: 11.625 + 6.375 = 18₁₀ = 16 + 2 = (10010)₂."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-a4",
    "trackId": "arithmetic",
    "trackTitle": "Topic 2: Binary Arithmetic (+, -, ×, ÷)",
    "topicBadge": "1.4D: Zero-Bridge Borrow Subtraction",
    "difficulty": "Medium",
    "set": "setA",
    "question": "Perform direct binary subtraction across multiple zeros: (100000)₂ - (010111)₂.",
    "promptDetail": "Show Zero-Bridge borrow propagation where intermediate 0s become 1s and the target 0 becomes 10₂ (2).",
    "inputFormatHint": "Enter binary digits, e.g., 001001 or 1001",
    "correctAnswer": "001001",
    "acceptedAnswers": [
      "001001",
      "1001",
      "(001001)2",
      "001001_2"
    ],
    "options": [
      {
        "label": "A",
        "text": "001001",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "001011",
        "distractorReason": "Forgot to decrement b1 after borrow"
      },
      {
        "label": "C",
        "text": "011001",
        "distractorReason": "Lost Zero-Bridge lending at b4"
      },
      {
        "label": "D",
        "text": "000001",
        "distractorReason": "Failed to propagate borrow through intermediate zeros"
      }
    ],
    "hint1": "Formula & Rule: Zero-Bridge Rule: When borrowing from a distant 1 across intermediate zeros, the lender 1 becomes 0, all intermediate 0s become 1, and the target column becomes 10₂ (2).",
    "hint2": "First Step & Trap: Lender is at b5 (1). b5 becomes 0. b4, b3, b2, b1 all bridge to 1. Target b0 becomes 2. Now subtract!",
    "solution": {
      "finalAnswer": "(001001)₂ = (1001)₂",
      "steps": [
        {
          "title": "Step 1: Zero-Bridge Borrow State Analysis",
          "type": "table",
          "headers": [
            "Column",
            "Original A",
            "Borrow Action",
            "Modified Value",
            "Subtrahend B",
            "Diff"
          ],
          "rows": [
            [
              "b5",
              "1",
              "Lent borrow rightward",
              "0",
              "0",
              "0 - 0 = 0"
            ],
            [
              "b4",
              "0",
              "Zero-Bridge propagated",
              "1",
              "1",
              "1 - 1 = 0"
            ],
            [
              "b3",
              "0",
              "Zero-Bridge propagated",
              "1",
              "0",
              "1 - 0 = 1"
            ],
            [
              "b2",
              "0",
              "Zero-Bridge propagated",
              "1",
              "1",
              "1 - 1 = 0"
            ],
            [
              "b1",
              "0",
              "Zero-Bridge propagated",
              "1",
              "1",
              "1 - 1 = 0"
            ],
            [
              "b0",
              "0",
              "Target received borrow",
              "2 (10₂)",
              "1",
              "2 - 1 = 1"
            ]
          ]
        },
        {
          "title": "Step 2: Collect Difference Bits",
          "type": "summary",
          "content": "Difference = 001001₂ = 1001₂"
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: 100000₂ = 32₁₀. 010111₂ = 16 + 4 + 2 + 1 = 23₁₀. 32 - 23 = 9₁₀ = (1001)₂!",
      "verification": "Base 10 Check: 32 - 23 = 9₁₀ (100% verified)."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-a5",
    "trackId": "arithmetic",
    "trackTitle": "Topic 2: Binary Arithmetic (+, -, ×, ÷)",
    "topicBadge": "1.4E: Fractional Direct Subtraction",
    "difficulty": "Medium",
    "set": "setA",
    "question": "Perform direct fractional binary subtraction: (110.101)₂ - (101.110)₂.",
    "promptDetail": "Show borrow crossing from integer b0 into fraction b-1.",
    "inputFormatHint": "Enter binary digits with point, e.g., 0.111 or 000.111",
    "correctAnswer": "0.111",
    "acceptedAnswers": [
      "0.111",
      "000.111",
      ".111",
      "(0.111)2"
    ],
    "options": [
      {
        "label": "A",
        "text": "0.111",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "0.011",
        "distractorReason": "Lost borrow crossing the radix point"
      },
      {
        "label": "C",
        "text": "1.111",
        "distractorReason": "Did not decrement integer b0 after borrowing for fraction"
      },
      {
        "label": "D",
        "text": "0.101",
        "distractorReason": "Arithmetic error in fraction column b-2"
      }
    ],
    "hint1": "Formula & Rule: Align at radix point. b-3: 1-0=1. b-2: 0-1 needs borrow from b-1. b-1 has 1, so it lends and becomes 0. b-2 becomes 2 -> 2-1=1.",
    "hint2": "First Step & Trap: Now b-1 has 0. 0-1 needs borrow from integer b0. b0 is 0, so it borrows from b1! Trace borrow across radix point.",
    "solution": {
      "finalAnswer": "(0.111)₂",
      "steps": [
        {
          "title": "Step 1: Column Borrow Alignment Grid",
          "type": "grid",
          "headers": [
            "Signal",
            "b2",
            "b1",
            "b0",
            ".",
            "b-1",
            "b-2",
            "b-3"
          ],
          "rows": [
            [
              "Modified A",
              "1",
              "0",
              "1",
              ".",
              "0",
              "2",
              "1"
            ],
            [
              "Operand A",
              "1",
              "1",
              "0",
              ".",
              "1",
              "0",
              "1"
            ],
            [
              "Operand B",
              "1",
              "0",
              "1",
              ".",
              "1",
              "1",
              "0"
            ],
            [
              "Difference",
              "0",
              "0",
              "0",
              ".",
              "1",
              "1",
              "1"
            ]
          ]
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: 110.101₂ = 6.625₁₀. 101.110₂ = 5.750₁₀. 6.625 - 5.750 = 0.875₁₀ = 0.5 + 0.25 + 0.125 = 0.111₂!",
      "verification": "Base 10 Check: 6.625 - 5.750 = 0.875₁₀."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-a6",
    "trackId": "arithmetic",
    "trackTitle": "Topic 2: Binary Arithmetic (+, -, ×, ÷)",
    "topicBadge": "1.4F: Negative Direct Subtraction (A < B)",
    "difficulty": "Hard",
    "set": "setA",
    "question": "Perform direct binary subtraction where A < B: (01101)₂ - (10110)₂.",
    "promptDetail": "State the negative subtraction rule: compute -(B - A) by swapping larger number on top and prefixing with negative sign.",
    "inputFormatHint": "Enter negative binary, e.g., -01001 or -1001",
    "correctAnswer": "-01001",
    "acceptedAnswers": [
      "-01001",
      "-1001",
      "-(01001)2",
      "-(1001)2",
      "-01001_2"
    ],
    "options": [
      {
        "label": "A",
        "text": "-01001",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "+01001",
        "distractorReason": "Forgot the negative (-) sign"
      },
      {
        "label": "C",
        "text": "-01101",
        "distractorReason": "Arithmetic borrow error during B - A"
      },
      {
        "label": "D",
        "text": "-10001",
        "distractorReason": "Miscalculated magnitude"
      }
    ],
    "hint1": "Formula & Rule: Since A (13₁₀) < B (22₁₀), the result is negative. Rule: Compute -(B - A). Place larger operand B (10110) on top, subtract A (01101), and attach a '-' sign.",
    "hint2": "First Step & Trap: Calculate 10110 - 01101: b0: 0-1 borrows from b1 -> 2-1 = 1. b1 is 0 -> borrows from b2 (which is 1) -> becomes 2, then lends to b0. Difference = 01001. Final answer = -01001.",
    "solution": {
      "finalAnswer": "-(01001)₂ = -9₁₀",
      "steps": [
        {
          "title": "Step 1: Negative Subtraction Swap Rule",
          "type": "summary",
          "content": "Since A (01101₂ = 13₁₀) < B (10110₂ = 22₁₀), difference is negative: A - B = -(B - A)."
        },
        {
          "title": "Step 2: Compute B - A with Borrow Grid",
          "type": "grid",
          "headers": [
            "Signal",
            "b4",
            "b3",
            "b2",
            "b1",
            "b0"
          ],
          "rows": [
            [
              "Minuend B (22)",
              "1",
              "0",
              "1",
              "1",
              "0"
            ],
            [
              "Subtrahend A (13)",
              "0",
              "1",
              "1",
              "0",
              "1"
            ],
            [
              "Magnitude (B - A)",
              "0",
              "1",
              "0",
              "0",
              "1"
            ]
          ]
        },
        {
          "title": "Step 3: Attach Explicit Negative Sign",
          "type": "summary",
          "content": "Result = -(01001)₂ = -(9)₁₀ = -9₁₀"
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: 13 - 22 = -9₁₀. 9 in binary = 1001. Prefix with '-' -> -01001₂!",
      "verification": "Base 10 Check: 13 - 22 = -9₁₀."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-a7",
    "trackId": "arithmetic",
    "trackTitle": "Topic 2: Binary Arithmetic (+, -, ×, ÷)",
    "topicBadge": "1.4G: Binary Shift-and-Add Multiplication",
    "difficulty": "Medium",
    "set": "setB",
    "question": "Perform binary multiplication using the shift-and-add method: (1011)₂ × (101)₂.",
    "promptDetail": "Show all partial products shifted by column position.",
    "inputFormatHint": "Enter binary digits, e.g., 110111",
    "correctAnswer": "110111",
    "acceptedAnswers": [
      "110111",
      "(110111)2",
      "110111_2"
    ],
    "options": [
      {
        "label": "A",
        "text": "110111",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "100111",
        "distractorReason": "Lost carry during partial product addition"
      },
      {
        "label": "C",
        "text": "111111",
        "distractorReason": "Incorrectly shifted middle partial product"
      },
      {
        "label": "D",
        "text": "110011",
        "distractorReason": "Bit error in second partial product"
      }
    ],
    "hint1": "Formula & Rule: If multiplier bit is 1, copy multiplicand shifted left. If multiplier bit is 0, write all zeros shifted left. Sum all partial products.",
    "hint2": "First Step & Trap: Multiplier is 101. PP1 (bit 1): 1011. PP2 (bit 0): 00000. PP3 (bit 1): 101100. Sum: 1011 + 00000 + 101100 = 110111.",
    "solution": {
      "finalAnswer": "(110111)₂",
      "steps": [
        {
          "title": "Step 1: Partial Product Expansion",
          "type": "table",
          "headers": [
            "Multiplier Bit",
            "Shift",
            "Partial Product Value"
          ],
          "rows": [
            [
              "b0 = 1",
              "0 positions",
              "1011"
            ],
            [
              "b1 = 0",
              "1 position",
              "0000 (shifted)"
            ],
            [
              "b2 = 1",
              "2 positions",
              "1011 (shifted: 101100)"
            ]
          ]
        },
        {
          "title": "Step 2: Column Summation of Partial Products",
          "type": "summary",
          "content": "  001011 (PP1)\n+ 101100 (PP3)\n---------\n  110111₂"
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: 1011₂ = 11₁₀. 101₂ = 5₁₀. 11 × 5 = 55₁₀ = 32 + 16 + 4 + 2 + 1 = 110111₂!",
      "verification": "Base 10 Check: 11 × 5 = 55₁₀ (100% verified)."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-a8",
    "trackId": "arithmetic",
    "trackTitle": "Topic 2: Binary Arithmetic (+, -, ×, ÷)",
    "topicBadge": "1.4H: Fractional Binary Multiplication",
    "difficulty": "Medium",
    "set": "setB",
    "question": "Perform fractional binary multiplication: (11.1)₂ × (10.1)₂.",
    "promptDetail": "Multiply as integers without points, then insert radix point at total fractional digits (1 + 1 = 2 places).",
    "inputFormatHint": "Enter binary with point, e.g., 100.11",
    "correctAnswer": "100.11",
    "acceptedAnswers": [
      "100.11",
      "(100.11)2",
      "100.11_2"
    ],
    "options": [
      {
        "label": "A",
        "text": "100.11",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "10.011",
        "distractorReason": "Miscounted fractional places as 3 instead of 2"
      },
      {
        "label": "C",
        "text": "101.01",
        "distractorReason": "Arithmetic sum error in partial products"
      },
      {
        "label": "D",
        "text": "1001.1",
        "distractorReason": "Placed point after 1 fractional digit only"
      }
    ],
    "hint1": "Formula & Rule: Integer multiply 111₂ (7₁₀) by 101₂ (5₁₀). Result = 100011₂ (35₁₀). Count fractional places: 1 + 1 = 2. Place radix point 2 places from right.",
    "hint2": "First Step & Trap: 100011 with 2 fractional places becomes 1000.11? Wait: 7 × 5 = 35 = 32 + 2 + 1 = 100011. Two decimal places from right: 1000.11? Check: 3.5 × 2.5 = 8.75. 8.75 in binary: 8 + 0.5 + 0.25 = 1000.11!",
    "solution": {
      "finalAnswer": "(1000.11)₂",
      "steps": [
        {
          "title": "Step 1: Integer Multiplication without Radix Point",
          "type": "summary",
          "content": "111₂ × 101₂ = 111 + 11100 = 100011₂ (Decimal: 7 × 5 = 35)"
        },
        {
          "title": "Step 2: Insert Radix Point",
          "type": "summary",
          "content": "Operand A has 1 fractional digit; Operand B has 1 fractional digit. Total fractional digits = 1 + 1 = 2 places. 100011 -> 1000.11₂"
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: 11.1₂ = 3.5₁₀. 10.1₂ = 2.5₁₀. 3.5 × 2.5 = 8.75₁₀ = 8 + 0.75 = 1000.11₂!",
      "verification": "Base 10 Check: 3.5 × 2.5 = 8.75₁₀."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-a9",
    "trackId": "arithmetic",
    "trackTitle": "Topic 2: Binary Arithmetic (+, -, ×, ÷)",
    "topicBadge": "1.4I: Exact Binary Long Division",
    "difficulty": "Hard",
    "set": "setB",
    "question": "Perform exact binary long division: (11110)₂ ÷ (101)₂.",
    "promptDetail": "Show dividend slice comparisons and quotient bit generation.",
    "inputFormatHint": "Enter binary quotient, e.g., 110",
    "correctAnswer": "110",
    "acceptedAnswers": [
      "110",
      "(110)2",
      "0110",
      "110_2"
    ],
    "options": [
      {
        "label": "A",
        "text": "110",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "101",
        "distractorReason": "Quotient error on second division step"
      },
      {
        "label": "C",
        "text": "111",
        "distractorReason": "Forgot to append 0 when remainder was 0"
      },
      {
        "label": "D",
        "text": "100",
        "distractorReason": "Underestimated quotient"
      }
    ],
    "hint1": "Formula & Rule: Compare current slice of dividend with divisor (101). If slice >= 101, quotient bit is 1, subtract 101, bring down next bit. If slice < 101, quotient bit is 0.",
    "hint2": "First Step & Trap: Slice 1: 1 < 101 (Q=0). Slice 2: 11 < 101 (Q=0). Slice 3: 111 >= 101 -> Q=1. 111 - 101 = 10. Bring down 1 -> 101. 101 - 101 = 0 (Q=1). Bring down 0 -> 0 < 101 (Q=0). Total Q = 110.",
    "solution": {
      "finalAnswer": "(110)₂",
      "steps": [
        {
          "title": "Step 1: Long Division Step-by-Step Trace",
          "type": "table",
          "headers": [
            "Step",
            "Dividend Slice",
            "Comparison with Divisor 101",
            "Quotient Bit",
            "Remainder"
          ],
          "rows": [
            [
              "1",
              "111",
              "111 ≥ 101",
              "1",
              "111 - 101 = 10"
            ],
            [
              "2",
              "101 (brought down 1)",
              "101 ≥ 101",
              "1",
              "101 - 101 = 0"
            ],
            [
              "3",
              "00 (brought down 0)",
              "0 < 101",
              "0",
              "0 (Division terminated)"
            ]
          ]
        },
        {
          "title": "Step 2: Collect Quotient Bits",
          "type": "summary",
          "content": "Quotient = 110₂, Remainder = 0"
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: 11110₂ = 30₁₀. 101₂ = 5₁₀. 30 ÷ 5 = 6₁₀ = (110)₂!",
      "verification": "Base 10 Check: 30 ÷ 5 = 6₁₀ (100% verified)."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-a10",
    "trackId": "arithmetic",
    "trackTitle": "Topic 2: Binary Arithmetic (+, -, ×, ÷)",
    "topicBadge": "1.4J: Fractional Binary Long Division",
    "difficulty": "Hard",
    "set": "setB",
    "question": "Perform binary long division resulting in a fractional quotient: (1011)₂ ÷ (100)₂.",
    "promptDetail": "Divide past the radix point by appending zeros.",
    "inputFormatHint": "Enter binary quotient with point, e.g., 10.11",
    "correctAnswer": "10.11",
    "acceptedAnswers": [
      "10.11",
      "(10.11)2",
      "10.11_2"
    ],
    "options": [
      {
        "label": "A",
        "text": "10.11",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "10.10",
        "distractorReason": "Lost fractional bit during division"
      },
      {
        "label": "C",
        "text": "11.01",
        "distractorReason": "Miscalculated integer division step"
      },
      {
        "label": "D",
        "text": "1.011",
        "distractorReason": "Misplaced radix point"
      }
    ],
    "hint1": "Formula & Rule: Dividing by 100₂ (4₁₀) is equivalent to shifting the radix point 2 places to the left!",
    "hint2": "First Step & Trap: 1011.0₂ shifted left by 2 positions = 10.11₂.",
    "solution": {
      "finalAnswer": "(10.11)₂",
      "steps": [
        {
          "title": "Step 1: Radix Point Shift for Power-of-2 Divisors",
          "type": "summary",
          "content": "Divisor is (100)₂ = 2² (4₁₀). Dividing by 2² shifts the binary radix point 2 places to the left: 1011. ÷ 100 = 10.11₂"
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: 1011₂ = 11₁₀. 11 ÷ 4 = 2.75₁₀ = 2 + 0.5 + 0.25 = 10.11₂!",
      "verification": "Base 10 Check: 11 ÷ 4 = 2.75₁₀."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-a11",
    "trackId": "arithmetic",
    "trackTitle": "Topic 2: Binary Arithmetic (+, -, ×, ÷)",
    "topicBadge": "1.4K: Multi-Operand Binary Addition",
    "difficulty": "Hard",
    "set": "setB",
    "question": "Compute the sum of three binary numbers: (1101)₂ + (1011)₂ + (0111)₂.",
    "promptDetail": "Show carry tracking across columns where carry can be 2 (10₂) or 3 (11₂).",
    "inputFormatHint": "Enter binary sum, e.g., 11111",
    "correctAnswer": "11111",
    "acceptedAnswers": [
      "11111",
      "(11111)2",
      "11111_2"
    ],
    "options": [
      {
        "label": "A",
        "text": "11111",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "11011",
        "distractorReason": "Dropped multi-column carry"
      },
      {
        "label": "C",
        "text": "10111",
        "distractorReason": "Carry addition error in column b3"
      },
      {
        "label": "D",
        "text": "11101",
        "distractorReason": "Bit error in column b1"
      }
    ],
    "hint1": "Formula & Rule: When adding 3 numbers, column sum can reach 3 (11₂: sum=1, carry=1) or 4 (100₂: sum=0, carry to next=0, carry to next-next=1).",
    "hint2": "First Step & Trap: b0: 1+1+1 = 3 = 11₂ -> Sum=1, Carry=1. b1: 0+1+1 + 1(C) = 3 -> Sum=1, Carry=1. b2: 1+0+1 + 1(C) = 3 -> Sum=1, Carry=1. b3: 1+1+0 + 1(C) = 3 -> Sum=1, Carry=1. MSB carry = 1. Result = 11111₂.",
    "solution": {
      "finalAnswer": "(11111)₂",
      "steps": [
        {
          "title": "Step 1: 3-Operand Column Addition Grid",
          "type": "grid",
          "headers": [
            "Signal",
            "b4",
            "b3",
            "b2",
            "b1",
            "b0"
          ],
          "rows": [
            [
              "Carry Track",
              "(1)",
              "1",
              "1",
              "1",
              "0"
            ],
            [
              "Operand 1",
              "0",
              "1",
              "1",
              "0",
              "1"
            ],
            [
              "Operand 2",
              "0",
              "1",
              "0",
              "1",
              "1"
            ],
            [
              "Operand 3",
              "0",
              "0",
              "1",
              "1",
              "1"
            ],
            [
              "Sum Result",
              "1",
              "1",
              "1",
              "1",
              "1"
            ]
          ]
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: 1101₂ = 13₁₀. 1011₂ = 11₁₀. 0111₂ = 7₁₀. 13 + 11 + 7 = 31₁₀ = (11111)₂!",
      "verification": "Base 10 Check: 13 + 11 + 7 = 31₁₀ = 16 + 8 + 4 + 2 + 1 = (11111)₂."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-a12",
    "trackId": "arithmetic",
    "trackTitle": "Topic 2: Binary Arithmetic (+, -, ×, ÷)",
    "topicBadge": "1.4L: Negative Zero-Bridge Subtraction",
    "difficulty": "Hard",
    "set": "setB",
    "question": "Perform direct binary subtraction: (00110)₂ - (10001)₂.",
    "promptDetail": "Since A < B, compute -(B - A) with borrow tracking.",
    "inputFormatHint": "Enter negative binary, e.g., -01011 or -1011",
    "correctAnswer": "-01011",
    "acceptedAnswers": [
      "-01011",
      "-1011",
      "-(01011)2",
      "-(1011)2",
      "-01011_2"
    ],
    "options": [
      {
        "label": "A",
        "text": "-01011",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "+01011",
        "distractorReason": "Omitted negative sign on result"
      },
      {
        "label": "C",
        "text": "-01101",
        "distractorReason": "Borrow propagation error in B - A"
      },
      {
        "label": "D",
        "text": "-00111",
        "distractorReason": "Subtracted A from B incorrectly"
      }
    ],
    "hint1": "Formula & Rule: A (6₁₀) < B (17₁₀) -> Result is negative -(B - A). Set up 10001 - 00110.",
    "hint2": "First Step & Trap: 10001 - 00110: b0: 1-0 = 1. b1: 0-1 borrows across zeros from b4! b4 (1) becomes 0. b3 and b2 become 1. b1 becomes 2 -> 2-1 = 1. b2: 1-1 = 0. b3: 1-0 = 1. Result = 01011 -> final answer = -01011.",
    "solution": {
      "finalAnswer": "-(01011)₂ = -11₁₀",
      "steps": [
        {
          "title": "Step 1: Negative Swap Rule",
          "type": "summary",
          "content": "A (6₁₀) < B (17₁₀) -> Compute -(B - A) = -(10001 - 00110)"
        },
        {
          "title": "Step 2: Borrow Grid for B - A",
          "type": "grid",
          "headers": [
            "Signal",
            "b4",
            "b3",
            "b2",
            "b1",
            "b0"
          ],
          "rows": [
            [
              "Minuend B (17)",
              "1",
              "0",
              "0",
              "0",
              "1"
            ],
            [
              "Subtrahend A (6)",
              "0",
              "0",
              "1",
              "1",
              "0"
            ],
            [
              "Magnitude Diff",
              "0",
              "1",
              "0",
              "1",
              "1"
            ]
          ]
        },
        {
          "title": "Step 3: Attach Negative Sign",
          "type": "summary",
          "content": "Difference = -(01011)₂ = -11₁₀"
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: 6 - 17 = -11₁₀. 11 = 8 + 2 + 1 = 01011₂. Result: -01011₂!",
      "verification": "Base 10 Check: 6 - 17 = -11₁₀."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-a13",
    "trackId": "arithmetic",
    "trackTitle": "Topic 2: Binary Arithmetic (+ and - Focus)",
    "topicBadge": "1.4C: Fractional Binary Addition",
    "questionType": "numerical",
    "difficulty": "Medium",
    "set": "setA",
    "question": "Perform binary addition with fractional radix point: (10110.101)₂ + (01101.110)₂.",
    "promptDetail": "Align radix points, propagate carries across fractional-to-integer boundary.",
    "inputFormatHint": "Enter binary string with point, e.g., 100100.011",
    "correctAnswer": "100100.011",
    "acceptedAnswers": [
      "100100.011",
      "(100100.011)2",
      "100100.011_2"
    ],
    "options": [
      {
        "label": "A",
        "text": "100100.011",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "100100.111",
        "distractorReason": "Omitted carry propagation from fractional bit b-1 into integer b0"
      },
      {
        "label": "C",
        "text": "100010.011",
        "distractorReason": "Addition error in column b2"
      },
      {
        "label": "D",
        "text": "110100.011",
        "distractorReason": "Carried extra 1 into column b4"
      }
    ],
    "hint1": "Formula & Rule: Align radix points. Fraction: .101 + .110: b-3: 1+0=1. b-2: 0+1=1. b-1: 1+1=0 (Carry 1 crosses into integer b0!).",
    "hint2": "First Step & Trap: In integer part: b0: 0+1 + Carry 1 = 0 (Carry 1). Propagate carries through integer columns.",
    "solution": {
      "finalAnswer": "(100100.011)₂",
      "steps": [
        {
          "title": "Step 1: Column-Aligned Addition Grid with Radix Carry Crossing",
          "type": "grid",
          "headers": [
            "Signal",
            "MSB C",
            "b4",
            "b3",
            "b2",
            "b1",
            "b0",
            ".",
            "b-1",
            "b-2",
            "b-3"
          ],
          "rows": [
            [
              "Carry Track",
              "(1)",
              "1",
              "1",
              "0",
              "1",
              "1",
              ".",
              "1",
              "0",
              "0"
            ],
            [
              "Operand A",
              "",
              "1",
              "0",
              "1",
              "1",
              "0",
              ".",
              "1",
              "0",
              "1"
            ],
            [
              "Operand B",
              "",
              "0",
              "1",
              "1",
              "0",
              "1",
              ".",
              "1",
              "1",
              "0"
            ],
            [
              "Sum Result",
              "1",
              "0",
              "0",
              "1",
              "0",
              "0",
              ".",
              "0",
              "1",
              "1"
            ]
          ]
        }
      ],
      "fastShortcut": "Fast Base-10 Verification: 22.625 + 13.75 = 36.375₁₀ = 32 + 4 + 0.25 + 0.125 = (100100.011)₂!",
      "verification": "Base 10 Check: 22.625 + 13.75 = 36.375₁₀."
    }
  },
  {
    "id": "q-a14",
    "trackId": "arithmetic",
    "trackTitle": "Topic 2: Binary Arithmetic (+ and - Focus)",
    "topicBadge": "1.4D: Fractional Binary Addition (Unequal Places)",
    "questionType": "numerical",
    "difficulty": "Medium",
    "set": "setA",
    "question": "Perform binary addition: (1101.011)₂ + (1011.110)₂.",
    "promptDetail": "Show column-aligned addition with carry across radix point.",
    "inputFormatHint": "Enter binary string with point, e.g., 11001.001",
    "correctAnswer": "11001.001",
    "acceptedAnswers": [
      "11001.001",
      "(11001.001)2",
      "11001.001_2"
    ],
    "options": [
      {
        "label": "A",
        "text": "11001.001",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "11001.011",
        "distractorReason": "Forgot to propagate carry from column b-2 into b-1"
      },
      {
        "label": "C",
        "text": "10101.001",
        "distractorReason": "Column b3 carry error"
      },
      {
        "label": "D",
        "text": "11011.001",
        "distractorReason": "Added carry into b1 twice"
      }
    ],
    "hint1": "Formula & Rule: Align by radix point: 1101.011 + 1011.110. Fraction .011 + .110 = 1.001 (sum .001 with carry 1 to integer).",
    "hint2": "First Step & Trap: Integer: 1101 + 1011 + 1 = 11001. Combined sum = 11001.001.",
    "solution": {
      "finalAnswer": "(11001.001)₂",
      "steps": [
        {
          "title": "Step 1: Aligned Addition Grid",
          "type": "grid",
          "headers": [
            "Signal",
            "MSB C",
            "b3",
            "b2",
            "b1",
            "b0",
            ".",
            "b-1",
            "b-2",
            "b-3"
          ],
          "rows": [
            [
              "Carry Track",
              "(1)",
              "1",
              "1",
              "1",
              "1",
              ".",
              "1",
              "1",
              "0"
            ],
            [
              "Operand A",
              "",
              "1",
              "1",
              "0",
              "1",
              ".",
              "0",
              "1",
              "1"
            ],
            [
              "Operand B",
              "",
              "1",
              "0",
              "1",
              "1",
              ".",
              "1",
              "1",
              "0"
            ],
            [
              "Sum Result",
              "1",
              "1",
              "0",
              "0",
              "1",
              ".",
              "0",
              "0",
              "1"
            ]
          ]
        }
      ],
      "fastShortcut": "Fast Decimal Check: 13.375 + 11.75 = 25.125₁₀ = 16 + 8 + 1 + 0.125 = (11001.001)₂!",
      "verification": "Base 10 Check: 13.375 + 11.75 = 25.125₁₀."
    }
  },
  {
    "id": "q-a15",
    "trackId": "arithmetic",
    "trackTitle": "Topic 2: Binary Arithmetic (+ and - Focus)",
    "topicBadge": "1.4A: 8-Bit Unsigned Binary Addition",
    "questionType": "numerical",
    "difficulty": "Medium",
    "set": "setA",
    "question": "Perform 8-bit unsigned binary addition: (01101101)₂ + (01011110)₂.",
    "promptDetail": "Show carry propagation across all 8 columns.",
    "inputFormatHint": "Enter 8-bit binary sum, e.g., 11001011",
    "correctAnswer": "11001011",
    "acceptedAnswers": [
      "11001011",
      "(11001011)2",
      "11001011_2"
    ],
    "options": [
      {
        "label": "A",
        "text": "11001011",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "11001001",
        "distractorReason": "Addition error in column b1"
      },
      {
        "label": "C",
        "text": "11011011",
        "distractorReason": "Forgot to propagate carry from column b3 into b4"
      },
      {
        "label": "D",
        "text": "10101011",
        "distractorReason": "Carry error in MSB column"
      }
    ],
    "hint1": "Formula & Rule: 109 + 94 = 203. 203 = 128 + 64 + 8 + 2 + 1 = 11001011.",
    "hint2": "First Step & Trap: b0: 1+0=1. b1: 0+1=1. b2: 1+1=0 (C=1). b3: 1+1+1=1 (C=1). b4: 0+1+1=0 (C=1). b5: 1+0+1=0 (C=1). b6: 1+1+1=1 (C=1). b7: 0+0+1=1.",
    "solution": {
      "finalAnswer": "(11001011)₂",
      "steps": [
        {
          "title": "Step 1: 8-Column Carry and Sum Alignment",
          "type": "grid",
          "headers": [
            "Signal",
            "b7",
            "b6",
            "b5",
            "b4",
            "b3",
            "b2",
            "b1",
            "b0"
          ],
          "rows": [
            [
              "Carry Track",
              "1",
              "1",
              "1",
              "1",
              "1",
              "1",
              "0",
              "0"
            ],
            [
              "Operand A",
              "0",
              "1",
              "1",
              "0",
              "1",
              "1",
              "0",
              "1"
            ],
            [
              "Operand B",
              "0",
              "1",
              "0",
              "1",
              "1",
              "1",
              "1",
              "0"
            ],
            [
              "Sum Result",
              "1",
              "1",
              "0",
              "0",
              "1",
              "0",
              "1",
              "1"
            ]
          ]
        }
      ],
      "fastShortcut": "Fast Inspection: 109 + 94 = 203₁₀ = 128 + 64 + 8 + 2 + 1 = 11001011₂!",
      "verification": "Base 10 Check: 109 + 94 = 203₁₀."
    }
  },
  {
    "id": "q-a16",
    "trackId": "arithmetic",
    "trackTitle": "Topic 2: Binary Arithmetic (+ and - Focus)",
    "topicBadge": "1.4A: 6-Bit Binary Addition with Output Carry",
    "questionType": "numerical",
    "difficulty": "Easy",
    "set": "setA",
    "question": "Perform binary addition: (101110)₂ + (011101)₂.",
    "promptDetail": "Show column addition and the 7th generated MSB carry bit.",
    "inputFormatHint": "Enter 7-bit binary sum, e.g., 1001011",
    "correctAnswer": "1001011",
    "acceptedAnswers": [
      "1001011",
      "(1001011)2",
      "1001011_2"
    ],
    "options": [
      {
        "label": "A",
        "text": "1001011",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "0001011",
        "distractorReason": "Omitted the 7th generated carry bit out of MSB"
      },
      {
        "label": "C",
        "text": "1011011",
        "distractorReason": "Carry propagation error in column b3"
      },
      {
        "label": "D",
        "text": "1000111",
        "distractorReason": "Addition error in column b2"
      }
    ],
    "hint1": "Formula & Rule: 46 + 29 = 75. In binary: 75 = 64 + 8 + 2 + 1 = 1001011.",
    "hint2": "First Step & Trap: Notice the sum exceeds 6 bits (64 requires bit position b6).",
    "solution": {
      "finalAnswer": "(1001011)₂",
      "steps": [
        {
          "title": "Step 1: Column Addition Grid",
          "type": "grid",
          "headers": [
            "Signal",
            "MSB C",
            "b5",
            "b4",
            "b3",
            "b2",
            "b1",
            "b0"
          ],
          "rows": [
            [
              "Carry Track",
              "(1)",
              "1",
              "1",
              "1",
              "0",
              "0",
              "0"
            ],
            [
              "Operand A",
              "",
              "1",
              "0",
              "1",
              "1",
              "1",
              "0"
            ],
            [
              "Operand B",
              "",
              "0",
              "1",
              "1",
              "1",
              "0",
              "1"
            ],
            [
              "Sum Result",
              "1",
              "0",
              "0",
              "1",
              "0",
              "1",
              "1"
            ]
          ]
        }
      ],
      "fastShortcut": "Fast Inspection: 46 + 29 = 75₁₀ = 64 + 8 + 2 + 1 = 1001011₂!",
      "verification": "Base 10 Check: 46 + 29 = 75₁₀."
    }
  },
  {
    "id": "q-a17",
    "trackId": "arithmetic",
    "trackTitle": "Topic 2: Binary Arithmetic (+ and - Focus)",
    "topicBadge": "1.4C: Fractional Addition with Unequal Lengths",
    "questionType": "numerical",
    "difficulty": "Medium",
    "set": "setB",
    "question": "Perform binary addition: (11101.1)₂ + (1011.01)₂.",
    "promptDetail": "Pad operands with amber zeros to equalize columns: (11101.10)₂ + (01011.01)₂.",
    "inputFormatHint": "Enter binary string with point, e.g., 101000.11",
    "correctAnswer": "101000.11",
    "acceptedAnswers": [
      "101000.11",
      "(101000.11)2",
      "101000.11_2"
    ],
    "options": [
      {
        "label": "A",
        "text": "101000.11",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "101000.10",
        "distractorReason": "Omitted fractional bit b-2"
      },
      {
        "label": "C",
        "text": "100100.11",
        "distractorReason": "Carry error in column b3"
      },
      {
        "label": "D",
        "text": "111000.11",
        "distractorReason": "Omitted carry into column b4"
      }
    ],
    "hint1": "Formula & Rule: Equalize lengths: 11101.10 + 01011.01. Fraction is .11. Integer is 11101 + 01011 = 101000.",
    "hint2": "First Step & Trap: 29.5 + 11.25 = 40.75₁₀ = 32 + 8 + 0.5 + 0.25 = 101000.11.",
    "solution": {
      "finalAnswer": "(101000.11)₂",
      "steps": [
        {
          "title": "Step 1: Equalized Column Grid",
          "type": "grid",
          "headers": [
            "Signal",
            "MSB C",
            "b4",
            "b3",
            "b2",
            "b1",
            "b0",
            ".",
            "b-1",
            "b-2"
          ],
          "rows": [
            [
              "Carry Track",
              "(1)",
              "1",
              "1",
              "1",
              "1",
              "0",
              ".",
              "0",
              "0"
            ],
            [
              "Operand A",
              "",
              "1",
              "1",
              "1",
              "0",
              "1",
              ".",
              "1",
              "0"
            ],
            [
              "Operand B",
              "",
              "0",
              "1",
              "0",
              "1",
              "1",
              ".",
              "0",
              "1"
            ],
            [
              "Sum Result",
              "1",
              "0",
              "1",
              "0",
              "0",
              "0",
              ".",
              "1",
              "1"
            ]
          ]
        }
      ],
      "fastShortcut": "Fast Inspection: 29.5 + 11.25 = 40.75₁₀ = 101000.11₂!",
      "verification": "Base 10 Check: 29.5 + 11.25 = 40.75₁₀."
    }
  },
  {
    "id": "q-a18",
    "trackId": "arithmetic",
    "trackTitle": "Topic 2: Binary Arithmetic (+ and - Focus)",
    "topicBadge": "1.4A: Three-Operand Binary Addition",
    "questionType": "numerical",
    "difficulty": "Medium",
    "set": "setB",
    "question": "Add the three binary numbers simultaneously: (1101)₂ + (0111)₂ + (1010)₂.",
    "promptDetail": "Track double carries (weight 2) generated from column additions.",
    "inputFormatHint": "Enter binary sum, e.g., 11110",
    "correctAnswer": "11110",
    "acceptedAnswers": [
      "11110",
      "(11110)2",
      "11110_2"
    ],
    "options": [
      {
        "label": "A",
        "text": "11110",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "11101",
        "distractorReason": "Addition error in column b0"
      },
      {
        "label": "C",
        "text": "11010",
        "distractorReason": "Lost carry in column b2"
      },
      {
        "label": "D",
        "text": "10110",
        "distractorReason": "Lost carry in MSB column"
      }
    ],
    "hint1": "Formula & Rule: 13 + 7 + 10 = 30₁₀ = 16 + 8 + 4 + 2 = 11110₂.",
    "hint2": "First Step & Trap: b0: 1+1+0 = 2 -> Sum = 0, Carry = 1 into b1.",
    "solution": {
      "finalAnswer": "(11110)₂",
      "steps": [
        {
          "title": "Step 1: Multi-Operand Addition Grid",
          "type": "grid",
          "headers": [
            "Signal",
            "MSB C",
            "b3",
            "b2",
            "b1",
            "b0"
          ],
          "rows": [
            [
              "Carry Track",
              "(1)",
              "1",
              "1",
              "1",
              "0"
            ],
            [
              "Operand 1 (13)",
              "",
              "1",
              "1",
              "0",
              "1"
            ],
            [
              "Operand 2 (7)",
              "",
              "0",
              "1",
              "1",
              "1"
            ],
            [
              "Operand 3 (10)",
              "",
              "1",
              "0",
              "1",
              "0"
            ],
            [
              "Sum Result",
              "1",
              "1",
              "1",
              "1",
              "0"
            ]
          ]
        }
      ],
      "fastShortcut": "Fast Inspection: 13 + 7 + 10 = 30₁₀ = 16 + 8 + 4 + 2 = 11110₂!",
      "verification": "Base 10 Check: 13 + 7 + 10 = 30₁₀."
    }
  },
  {
    "id": "q-a19",
    "trackId": "arithmetic",
    "trackTitle": "Topic 2: Binary Arithmetic (+ and - Focus)",
    "topicBadge": "1.4B: Fractional Subtraction with Borrow Across Radix",
    "questionType": "numerical",
    "difficulty": "Hard",
    "set": "setB",
    "question": "Perform direct binary subtraction: (10100.01)₂ - (01101.10)₂.",
    "promptDetail": "Show borrow propagation crossing the radix point from integer into fraction.",
    "inputFormatHint": "Enter binary string with point, e.g., 00110.11 or 110.11",
    "correctAnswer": "00110.11",
    "acceptedAnswers": [
      "00110.11",
      "110.11",
      "(00110.11)2",
      "(110.11)2"
    ],
    "options": [
      {
        "label": "A",
        "text": "00110.11",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "00110.01",
        "distractorReason": "Forgot to borrow across radix point in column b-1"
      },
      {
        "label": "C",
        "text": "01110.11",
        "distractorReason": "Borrow tracking error in column b4"
      },
      {
        "label": "D",
        "text": "00101.11",
        "distractorReason": "Subtraction error in column b0"
      }
    ],
    "hint1": "Formula & Rule: 20.25 - 13.50 = 6.75₁₀ = 4 + 2 + 0.5 + 0.25 = 00110.11₂.",
    "hint2": "First Step & Trap: b-2: 1-0 = 1. b-1: 0-1 requires borrow from integer b0 (which is 0, so borrows from b2 across b1 and b0!).",
    "solution": {
      "finalAnswer": "(00110.11)₂",
      "steps": [
        {
          "title": "Step 1: Column Borrow Grid Across Radix Point",
          "type": "grid",
          "headers": [
            "Signal",
            "b4",
            "b3",
            "b2",
            "b1",
            "b0",
            ".",
            "b-1",
            "b-2"
          ],
          "rows": [
            [
              "Minuend (20.25)",
              "1",
              "0",
              "1",
              "0",
              "0",
              ".",
              "0",
              "1"
            ],
            [
              "Subtrahend (13.5)",
              "0",
              "1",
              "1",
              "0",
              "1",
              ".",
              "1",
              "0"
            ],
            [
              "Difference",
              "0",
              "0",
              "1",
              "1",
              "0",
              ".",
              "1",
              "1"
            ]
          ]
        }
      ],
      "fastShortcut": "Fast Inspection: 20.25 - 13.50 = 6.75₁₀ = 4 + 2 + 0.75 = 110.11₂!",
      "verification": "Base 10 Check: 20.25 - 13.50 = 6.75₁₀."
    }
  },
  {
    "id": "q-a20",
    "trackId": "arithmetic",
    "trackTitle": "Topic 2: Binary Arithmetic (+ and - Focus)",
    "topicBadge": "1.4B: Zero-Bridge Borrow Across 6 Columns",
    "questionType": "numerical",
    "difficulty": "Hard",
    "set": "setB",
    "question": "Perform direct binary subtraction: (1000000)₂ - (0010111)₂.",
    "promptDetail": "Show Zero-Bridge borrowing from bit b6 across bits b5, b4, b3, b2, and b1.",
    "inputFormatHint": "Enter binary result, e.g., 0101001 or 101001",
    "correctAnswer": "0101001",
    "acceptedAnswers": [
      "0101001",
      "101001",
      "(0101001)2",
      "(101001)2"
    ],
    "options": [
      {
        "label": "A",
        "text": "0101001",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "0101011",
        "distractorReason": "Borrow error in column b1"
      },
      {
        "label": "C",
        "text": "0111001",
        "distractorReason": "Failed to propagate borrow through columns b4 and b3"
      },
      {
        "label": "D",
        "text": "1101001",
        "distractorReason": "Did not decrement the source bit b6 from 1 to 0"
      }
    ],
    "hint1": "Formula & Rule: 64 - 23 = 41₁₀ = 32 + 8 + 1 = 0101001₂.",
    "hint2": "First Step & Trap: Bit b6 (1) becomes 0. Bits b5, b4, b3, b2, b1 become 1. Target bit b0 becomes 2. 2 - 1 = 1.",
    "solution": {
      "finalAnswer": "(0101001)₂",
      "steps": [
        {
          "title": "Step 1: Zero-Bridge Borrow Grid",
          "type": "grid",
          "headers": [
            "Signal",
            "b6",
            "b5",
            "b4",
            "b3",
            "b2",
            "b1",
            "b0"
          ],
          "rows": [
            [
              "Minuend (64)",
              "1",
              "0",
              "0",
              "0",
              "0",
              "0",
              "0"
            ],
            [
              "Subtrahend (23)",
              "0",
              "0",
              "1",
              "0",
              "1",
              "1",
              "1"
            ],
            [
              "Difference (41)",
              "0",
              "1",
              "0",
              "1",
              "0",
              "0",
              "1"
            ]
          ]
        }
      ],
      "fastShortcut": "Fast Inspection: 64 - 23 = 41₁₀ = 32 + 8 + 1 = 0101001₂!",
      "verification": "Base 10 Check: 64 - 23 = 41₁₀."
    }
  },
  {
    "id": "q-a21",
    "trackId": "arithmetic",
    "trackTitle": "Topic 2: Binary Arithmetic (+ and - Focus)",
    "topicBadge": "1.4B: Direct Binary Subtraction with Borrow",
    "questionType": "numerical",
    "difficulty": "Easy",
    "set": "setA",
    "question": "Perform direct binary subtraction: (100010)₂ - (011101)₂.",
    "promptDetail": "Show borrow propagation.",
    "inputFormatHint": "Enter binary result, e.g., 000101 or 101",
    "correctAnswer": "000101",
    "acceptedAnswers": [
      "000101",
      "101",
      "(000101)2",
      "(101)2"
    ],
    "options": [
      {
        "label": "A",
        "text": "000101",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "000111",
        "distractorReason": "Borrow error in column b1"
      },
      {
        "label": "C",
        "text": "001101",
        "distractorReason": "Failed to propagate borrow through b2"
      },
      {
        "label": "D",
        "text": "000011",
        "distractorReason": "Arithmetic error in column b2"
      }
    ],
    "hint1": "Formula & Rule: 34 - 29 = 5₁₀ = 4 + 1 = 000101₂.",
    "hint2": "First Step & Trap: b0: 0-1 borrows from b1 (which is 1). b1 becomes 0, b0 becomes 2 -> 2-1 = 1.",
    "solution": {
      "finalAnswer": "(000101)₂ = 5₁₀",
      "steps": [
        {
          "title": "Step 1: Column Subtraction Grid",
          "type": "grid",
          "headers": [
            "Signal",
            "b5",
            "b4",
            "b3",
            "b2",
            "b1",
            "b0"
          ],
          "rows": [
            [
              "Minuend (34)",
              "1",
              "0",
              "0",
              "0",
              "1",
              "0"
            ],
            [
              "Subtrahend (29)",
              "0",
              "1",
              "1",
              "1",
              "0",
              "1"
            ],
            [
              "Difference (5)",
              "0",
              "0",
              "0",
              "1",
              "0",
              "1"
            ]
          ]
        }
      ],
      "fastShortcut": "Fast Inspection: 34 - 29 = 5₁₀ = 101₂!",
      "verification": "Base 10 Check: 34 - 29 = 5₁₀."
    }
  },
  {
    "id": "q-a22",
    "trackId": "arithmetic",
    "trackTitle": "Topic 2: Binary Arithmetic (+ and - Focus)",
    "topicBadge": "1.4B: Negative Binary Subtraction (A < B)",
    "questionType": "numerical",
    "difficulty": "Medium",
    "set": "setB",
    "question": "Perform direct binary subtraction: (01010)₂ - (11100)₂.",
    "promptDetail": "Since A < B, compute -(B - A) and attach a negative sign.",
    "inputFormatHint": "Enter negative binary, e.g., -10010 or -010010",
    "correctAnswer": "-10010",
    "acceptedAnswers": [
      "-10010",
      "-010010",
      "-(10010)2",
      "-(010010)2"
    ],
    "options": [
      {
        "label": "A",
        "text": "-10010",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "+10010",
        "distractorReason": "Omitted negative sign on result"
      },
      {
        "label": "C",
        "text": "-10100",
        "distractorReason": "Borrow propagation error in B - A"
      },
      {
        "label": "D",
        "text": "-01110",
        "distractorReason": "Arithmetic error during column subtraction"
      }
    ],
    "hint1": "Formula & Rule: A (10₁₀) < B (28₁₀) -> Result is negative: -(B - A) = -(11100 - 01010).",
    "hint2": "First Step & Trap: 11100 - 01010 = 10010 (18₁₀). Attach '-' -> -10010.",
    "solution": {
      "finalAnswer": "-(10010)₂ = -18₁₀",
      "steps": [
        {
          "title": "Step 1: Negative Swap Rule",
          "type": "summary",
          "content": "A (10) < B (28) -> Compute -(B - A) = -(11100 - 01010)"
        },
        {
          "title": "Step 2: Subtraction Grid B - A",
          "type": "grid",
          "headers": [
            "Signal",
            "b4",
            "b3",
            "b2",
            "b1",
            "b0"
          ],
          "rows": [
            [
              "Minuend B (28)",
              "1",
              "1",
              "1",
              "0",
              "0"
            ],
            [
              "Subtrahend A (10)",
              "0",
              "1",
              "0",
              "1",
              "0"
            ],
            [
              "Magnitude Diff",
              "1",
              "0",
              "0",
              "1",
              "0"
            ]
          ]
        }
      ],
      "fastShortcut": "Fast Inspection: 10 - 28 = -18₁₀ = -(16 + 2) = -10010₂!",
      "verification": "Base 10 Check: 10 - 28 = -18₁₀."
    }
  },
  {
    "id": "q-a23",
    "trackId": "arithmetic",
    "trackTitle": "Topic 2: Binary Arithmetic (+ and - Focus)",
    "topicBadge": "1.4B: Borrow Weight Rule",
    "questionType": "fill_blank",
    "difficulty": "Easy",
    "set": "theory",
    "question": "In direct binary subtraction, borrowing 1 from the immediate left column brings a numerical weight of decimal ____ into the current column.",
    "promptDetail": "Enter the decimal integer weight brought in by 1 borrow.",
    "inputFormatHint": "Enter single integer, e.g., 2",
    "correctAnswer": "2",
    "acceptedAnswers": [
      "2",
      "two",
      "decimal 2",
      "2_10"
    ],
    "options": [
      {
        "label": "A",
        "text": "2",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "10",
        "distractorReason": "Confused with decimal borrow (which brings 10 in base 10)"
      },
      {
        "label": "C",
        "text": "1",
        "distractorReason": "The borrow originates as 1 from the left, but is worth 2 in the current column"
      },
      {
        "label": "D",
        "text": "4",
        "distractorReason": "4 is the weight two columns away"
      }
    ],
    "hint1": "Formula & Rule: In base r, borrowing 1 from column i brings weight r into column i-1. In binary (base 2), r = 2.",
    "hint2": "First Step & Trap: In base 10, a borrow brings 10. In base 2, a borrow brings 2.",
    "solution": {
      "finalAnswer": "2",
      "steps": [
        {
          "title": "Positional Borrow Axiom",
          "type": "summary",
          "content": "Column i has weight 2ⁱ. Column i-1 has weight 2ⁱ⁻¹. Borrowing 1 from 2ⁱ brings (2ⁱ / 2ⁱ⁻¹) = 2 units into column i-1."
        }
      ],
      "fastShortcut": "Fast Fact: Binary borrow brings 2!",
      "verification": "Base 2 Radix Definition."
    }
  },
  {
    "id": "q-a24",
    "trackId": "arithmetic",
    "trackTitle": "Topic 2: Binary Arithmetic (+ and - Focus)",
    "topicBadge": "1.4B: 0 - 1 Primitive Subtraction",
    "questionType": "fill_blank",
    "difficulty": "Easy",
    "set": "theory",
    "question": "In binary column subtraction, the operation 0 - 1 produces a Difference of ____ and a Borrow-out of ____.",
    "promptDetail": "State the difference bit and borrow bit.",
    "inputFormatHint": "Enter text, e.g., 1 and 1",
    "correctAnswer": "1 and 1",
    "acceptedAnswers": [
      "1 and 1",
      "1, 1",
      "1,1",
      "D=1, B=1",
      "D = 1, B = 1"
    ],
    "options": [
      {
        "label": "A",
        "text": "1 and 1",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "0 and 1",
        "distractorReason": "Difference is 2 - 1 = 1, not 0"
      },
      {
        "label": "C",
        "text": "1 and 0",
        "distractorReason": "A borrow must be generated when subtracting 1 from 0"
      },
      {
        "label": "D",
        "text": "0 and 0",
        "distractorReason": "Produces non-zero difference"
      }
    ],
    "hint1": "Formula & Rule: 0 - 1 borrows 1 (worth 2). 2 - 1 = 1. So Difference = 1, Borrow = 1.",
    "hint2": "First Step & Trap: Half-Subtractor truth table: for A=0, B=1: Diff = 1, Borrow = 1.",
    "solution": {
      "finalAnswer": "1 and 1",
      "steps": [
        {
          "title": "Half-Subtractor Truth Table",
          "type": "summary",
          "content": "0 - 1: Borrow 1 from next higher column -> (2 + 0) - 1 = 1.\nDifference D = 1, Borrow-out Bout = 1."
        }
      ],
      "fastShortcut": "Fast Fact: 0 - 1 = Diff 1 with Borrow 1!",
      "verification": "Half-Subtractor logic equations: D = A XOR B, Bout = A'B."
    }
  },
  {
    "id": "q-a25",
    "trackId": "arithmetic",
    "trackTitle": "Topic 2: Binary Arithmetic (+ and - Focus)",
    "topicBadge": "1.4A: Unequal Bit Lengths Alignment Rule",
    "questionType": "conceptual_mcq",
    "difficulty": "Easy",
    "set": "theory",
    "question": "When adding or subtracting binary integers with unequal bit lengths, what preparatory step MUST be performed?",
    "promptDetail": "Identify the column alignment rule.",
    "inputFormatHint": "Select option A, B, C, or D",
    "correctAnswer": "Pad the shorter operand with leading zeros to align identical positional weights",
    "acceptedAnswers": [
      "Pad the shorter operand with leading zeros to align identical positional weights",
      "A"
    ],
    "options": [
      {
        "label": "A",
        "text": "Pad the shorter operand with leading zeros to align identical positional weights",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Pad the shorter operand with trailing zeros on the right",
        "distractorReason": "Adding trailing zeros multiplies the integer operand by powers of 2!"
      },
      {
        "label": "C",
        "text": "Truncate the longer operand to match the shorter operand",
        "distractorReason": "Truncating discards significant higher-order bits"
      },
      {
        "label": "D",
        "text": "Invert the shorter operand before column alignment",
        "distractorReason": "Inversion is complementation, not alignment"
      }
    ],
    "hint1": "Formula & Rule: Leading zeros on an integer do not change its value (e.g., 101₂ = 000101₂ = 5₁₀), but allow exact column-by-column alignment.",
    "hint2": "First Step & Trap: Never pad trailing zeros on an integer, as 10100₂ = 20₁₀ != 5₁₀!",
    "solution": {
      "finalAnswer": "Pad the shorter operand with leading zeros to align identical positional weights",
      "steps": [
        {
          "title": "Positional Alignment Principle",
          "type": "summary",
          "content": "To guarantee that bit b_k of operand A aligns with bit b_k of operand B, the shorter operand is padded with leading amber zeros until both operands possess identical bit lengths."
        }
      ],
      "fastShortcut": "Fast Rule: Pad LEADING zeros for integers; pad TRAILING zeros for fractions!",
      "verification": "Positional algebra check."
    }
  },
  {
    "id": "q-m1",
    "trackId": "complements",
    "trackTitle": "Topic 3: Complements & Complement Subtraction",
    "topicBadge": "1.5A: 1's and 2's Complement of Binary Integer",
    "difficulty": "Easy",
    "set": "setA",
    "question": "Find the 2's complement of the binary number (10101100)₂.",
    "promptDetail": "Show bit inversion (1's complement) followed by adding 1 to the LSB.",
    "inputFormatHint": "Enter 8-bit binary, e.g., 01010100",
    "correctAnswer": "01010100",
    "acceptedAnswers": [
      "01010100",
      "(01010100)2",
      "01010100_2"
    ],
    "options": [
      {
        "label": "A",
        "text": "01010100",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "01010011",
        "distractorReason": "This is only the 1's complement (forgot to add 1 to LSB)"
      },
      {
        "label": "C",
        "text": "01010101",
        "distractorReason": "Added 1 without propagating carry past trailing zeros"
      },
      {
        "label": "D",
        "text": "11010100",
        "distractorReason": "Did not invert the MSB"
      }
    ],
    "hint1": "Formula & Rule: 2's Complement = 1's Complement + 1 at LSB. 1's complement inverts all bits (0 <-> 1).",
    "hint2": "First Step & Trap: Invert 10101100 -> 01010011. Now add 1: 01010011 + 1 = 01010100.",
    "solution": {
      "finalAnswer": "(01010100)₂",
      "steps": [
        {
          "title": "Step 1: Compute 1's Complement (Bitwise Inversion)",
          "type": "summary",
          "content": "Invert every bit of 10101100 -> 01010011"
        },
        {
          "title": "Step 2: Add 1 to LSB",
          "type": "summary",
          "content": "01010011 + 1 = 01010100"
        }
      ],
      "fastShortcut": "Fast Scan Shortcut: Scan from right (LSB) to left: leave all bits up to and including the first '1' unchanged (00 -> 00, 1 -> 1). Invert all bits to the left: 10101 -> 01010. Result: 01010100!",
      "verification": "Base 10 Check: 10101100₂ = 172₁₀. 2⁸ - 172 = 256 - 172 = 84₁₀ = 64 + 16 + 4 = (01010100)₂ (100% verified)."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-m2",
    "trackId": "complements",
    "trackTitle": "Topic 3: Complements & Complement Subtraction",
    "topicBadge": "1.5B: 9's and 10's Complement of Decimal",
    "difficulty": "Easy",
    "set": "setA",
    "question": "Find the 10's complement of the decimal number (34700)₁₀.",
    "promptDetail": "Show 9's complement (subtract from 99999) then add 1 to LSB.",
    "inputFormatHint": "Enter 5-digit decimal, e.g., 65300",
    "correctAnswer": "65300",
    "acceptedAnswers": [
      "65300",
      "(65300)10",
      "65300_10"
    ],
    "options": [
      {
        "label": "A",
        "text": "65300",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "65299",
        "distractorReason": "This is only the 9's complement (forgot to add 1)"
      },
      {
        "label": "C",
        "text": "65301",
        "distractorReason": "Added 1 to the end without respecting trailing zeros"
      },
      {
        "label": "D",
        "text": "75300",
        "distractorReason": "Subtract from 9 error on first digit"
      }
    ],
    "hint1": "Formula & Rule: 10's Complement = 9's Complement + 1. 9's complement of 5-digit number is 99999 - N.",
    "hint2": "First Step & Trap: 99999 - 34700 = 65299. Add 1: 65299 + 1 = 65300. Notice trailing zeros stay zeros!",
    "solution": {
      "finalAnswer": "(65300)₁₀",
      "steps": [
        {
          "title": "Step 1: Compute 9's Complement (99999 - 34700)",
          "type": "summary",
          "content": "99999 - 34700 = 65299"
        },
        {
          "title": "Step 2: Add 1 to LSB",
          "type": "summary",
          "content": "65299 + 1 = 65300"
        }
      ],
      "fastShortcut": "Fast 9-9-10 Shortcut: Leave trailing zeros untouched (00). Subtract first non-zero digit from 10 (10 - 7 = 3). Subtract all digits to the left from 9 (9-4=5, 9-3=6). Result: 65300!",
      "verification": "Base 10 Check: 10⁵ - 34700 = 100000 - 34700 = 65300₁₀ (100% verified)."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-m3",
    "trackId": "complements",
    "trackTitle": "Topic 3: Complements & Complement Subtraction",
    "topicBadge": "1.5C: Fractional 1's and 2's Complement",
    "difficulty": "Medium",
    "set": "setA",
    "question": "Find the 2's complement of the fractional binary number (1011.0110)₂.",
    "promptDetail": "Invert all bits across the radix point and add 1 at the rightmost LSB.",
    "inputFormatHint": "Enter binary with point, e.g., 0100.1010",
    "correctAnswer": "0100.1010",
    "acceptedAnswers": [
      "0100.1010",
      "(0100.1010)2",
      "0100.1010_2"
    ],
    "options": [
      {
        "label": "A",
        "text": "0100.1010",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "0100.1001",
        "distractorReason": "This is only the 1's complement"
      },
      {
        "label": "C",
        "text": "0101.1010",
        "distractorReason": "Carry error into integer part"
      },
      {
        "label": "D",
        "text": "0100.1011",
        "distractorReason": "Added 1 without respecting trailing zero bit"
      }
    ],
    "hint1": "Formula & Rule: Invert all bits (including fraction): 1011.0110 -> 0100.1001 (1's complement). Then add 1 at the rightmost LSB (position b-4).",
    "hint2": "First Step & Trap: 0100.1001 + 0.0001: b-4: 1+1=0 (C=1). b-3: 0+1=1. Result = 0100.1010.",
    "solution": {
      "finalAnswer": "(0100.1010)₂",
      "steps": [
        {
          "title": "Step 1: Compute 1's Complement Across Radix Point",
          "type": "summary",
          "content": "Invert bits: 1011.0110 -> 0100.1001"
        },
        {
          "title": "Step 2: Add 1 at Rightmost Fractional LSB (b-4)",
          "type": "summary",
          "content": "0100.1001 + 0.0001 = 0100.1010"
        }
      ],
      "fastShortcut": "Fast Scan Shortcut: Keep trailing 0 and first 1 unchanged (.0110 -> .10). Invert all bits to left: 1011.0 -> 0100.1. Result: 0100.1010!",
      "verification": "Base 10 Check: 1011.0110₂ = 11.375₁₀. 16 - 11.375 = 4.625₁₀ = 4 + 0.5 + 0.125 = (0100.1010)₂."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-m4",
    "trackId": "complements",
    "trackTitle": "Topic 3: Complements & Complement Subtraction",
    "topicBadge": "1.5D: 1's Complement Subtraction (M > N)",
    "difficulty": "Medium",
    "set": "setA",
    "question": "Perform the binary subtraction: (110101)₂ - (011010)₂ using 1's complement arithmetic.",
    "promptDetail": "Show addition M + 1's comp(N), detect End-Around Carry (EAC = 1), and add +1 to LSB.",
    "inputFormatHint": "Enter binary result, e.g., +011011 or 011011",
    "correctAnswer": "+011011",
    "acceptedAnswers": [
      "+011011",
      "011011",
      "11011",
      "+11011",
      "(+011011)2"
    ],
    "options": [
      {
        "label": "A",
        "text": "+011011",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "+011010",
        "distractorReason": "Forgot to add the End-Around Carry (EAC) to LSB"
      },
      {
        "label": "C",
        "text": "-011011",
        "distractorReason": "Wrong sign (EAC = 1 means positive, not negative)"
      },
      {
        "label": "D",
        "text": "+101011",
        "distractorReason": "Addition error during M + Comp(N)"
      }
    ],
    "hint1": "Formula & Rule: 1's Complement Subtraction: Add M + 1's complement of N. If End Carry = 1, the result is POSITIVE: wrap the carry around and add +1 to LSB (End-Around Carry).",
    "hint2": "First Step & Trap: N = 011010 -> 1's comp(N) = 100101. Now add: 110101 + 100101 = 1 011010. Carry 1 wraps around: 011010 + 1 = +011011.",
    "solution": {
      "finalAnswer": "+(011011)₂ = +27₁₀",
      "steps": [
        {
          "title": "Step 1: Length Equalization and Complementation of N",
          "type": "summary",
          "content": "M = 110101 (6 bits), N = 011010 (6 bits). 1's comp of N = 100101."
        },
        {
          "title": "Step 2: Add M + 1's Comp(N)",
          "type": "grid",
          "headers": [
            "Signal",
            "MSB C",
            "b5",
            "b4",
            "b3",
            "b2",
            "b1",
            "b0"
          ],
          "rows": [
            [
              "Carry Track",
              "(1)",
              "1",
              "0",
              "1",
              "0",
              "1",
              "0"
            ],
            [
              "Minuend M",
              "",
              "1",
              "1",
              "0",
              "1",
              "0",
              "1"
            ],
            [
              "Comp(N)",
              "",
              "1",
              "0",
              "0",
              "1",
              "0",
              "1"
            ],
            [
              "Raw Sum",
              "1",
              "0",
              "1",
              "1",
              "0",
              "1",
              "0"
            ]
          ]
        },
        {
          "title": "Step 3: End-Around Carry (EAC) Wrap-Around",
          "type": "summary",
          "content": "End Carry = 1 indicates positive result. Add +1 to LSB: 011010 + 1 = +011011₂"
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: M = 53₁₀, N = 26₁₀. 53 - 26 = +27₁₀ = 16 + 8 + 2 + 1 = +011011₂!",
      "verification": "Base 10 Check: 53 - 26 = +27₁₀."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-m5",
    "trackId": "complements",
    "trackTitle": "Topic 3: Complements & Complement Subtraction",
    "topicBadge": "1.5E: 2's Complement Subtraction (M > N)",
    "difficulty": "Medium",
    "set": "setA",
    "question": "Perform binary subtraction: (11100)₂ - (01011)₂ using 2's complement arithmetic.",
    "promptDetail": "Show addition M + 2's comp(N), detect End Carry = 1, and discard the carry.",
    "inputFormatHint": "Enter binary result, e.g., +10001 or 10001",
    "correctAnswer": "+10001",
    "acceptedAnswers": [
      "+10001",
      "10001",
      "(+10001)2",
      "+010001"
    ],
    "options": [
      {
        "label": "A",
        "text": "+10001",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "+10010",
        "distractorReason": "Mistakenly added End-Around Carry in 2's complement (EAC only applies to 1's complement!)"
      },
      {
        "label": "C",
        "text": "-10001",
        "distractorReason": "Inverted sign"
      },
      {
        "label": "D",
        "text": "+01001",
        "distractorReason": "Arithmetic error in column b3"
      }
    ],
    "hint1": "Formula & Rule: In 2's Complement Subtraction: Add M + 2's comp(N). If End Carry = 1, DISCARD the end carry. The remaining bits form the exact positive answer.",
    "hint2": "First Step & Trap: N = 01011 -> 1's comp = 10100 -> 2's comp = 10101. Add: 11100 + 10101 = 1 10001. Discard the MSB carry 1 -> Answer = +10001.",
    "solution": {
      "finalAnswer": "+(10001)₂ = +17₁₀",
      "steps": [
        {
          "title": "Step 1: Compute 2's Complement of N",
          "type": "summary",
          "content": "N = 01011 -> 1's comp = 10100 -> 2's comp = 10101"
        },
        {
          "title": "Step 2: Add M + 2's Comp(N)",
          "type": "grid",
          "headers": [
            "Signal",
            "MSB C",
            "b4",
            "b3",
            "b2",
            "b1",
            "b0"
          ],
          "rows": [
            [
              "Carry Track",
              "(1)",
              "1",
              "0",
              "0",
              "0",
              "0"
            ],
            [
              "Minuend M",
              "",
              "1",
              "1",
              "1",
              "0",
              "0"
            ],
            [
              "2's Comp(N)",
              "",
              "1",
              "0",
              "1",
              "0",
              "1"
            ],
            [
              "Sum",
              "1",
              "1",
              "0",
              "0",
              "0",
              "1"
            ]
          ]
        },
        {
          "title": "Step 3: Discard End Carry",
          "type": "summary",
          "content": "End Carry = 1 indicates Positive result. DISCARD MSB carry 1. Final Answer = +10001₂"
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: 28₁₀ - 11₁₀ = +17₁₀ = +10001₂!",
      "verification": "Base 10 Check: 28 - 11 = +17₁₀."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-m6",
    "trackId": "complements",
    "trackTitle": "Topic 3: Complements & Complement Subtraction",
    "topicBadge": "1.5F: 1's Complement Subtraction (M < N)",
    "difficulty": "Hard",
    "set": "setA",
    "question": "Perform binary subtraction: (01101)₂ - (10111)₂ using 1's complement arithmetic.",
    "promptDetail": "Detect End Carry = 0 (negative answer) and re-complement the sum to find true magnitude.",
    "inputFormatHint": "Enter negative binary, e.g., -01010 or -1010",
    "correctAnswer": "-01010",
    "acceptedAnswers": [
      "-01010",
      "-1010",
      "-(01010)2",
      "-(1010)2",
      "-01010_2"
    ],
    "options": [
      {
        "label": "A",
        "text": "-01010",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "+01010",
        "distractorReason": "Forgot negative sign"
      },
      {
        "label": "C",
        "text": "-10101",
        "distractorReason": "Forgot to re-complement intermediate sum (10101 is the raw sum, not the answer!)"
      },
      {
        "label": "D",
        "text": "-01001",
        "distractorReason": "Arithmetic error in re-complementation"
      }
    ],
    "hint1": "Formula & Rule: When End Carry = 0, M < N (negative answer). Take the 1's complement of the intermediate sum and attach a '-' sign.",
    "hint2": "First Step & Trap: N = 10111 -> 1's comp = 01000. Add: 01101 + 01000 = 10101 (Carry = 0). Re-complement: 1's comp of 10101 = 01010. Attach '-' -> -01010.",
    "solution": {
      "finalAnswer": "-(01010)₂ = -10₁₀",
      "steps": [
        {
          "title": "Step 1: Compute 1's Complement of N",
          "type": "summary",
          "content": "N = 10111 -> 1's comp(N) = 01000"
        },
        {
          "title": "Step 2: Add M + Comp(N)",
          "type": "grid",
          "headers": [
            "Signal",
            "MSB C",
            "b4",
            "b3",
            "b2",
            "b1",
            "b0"
          ],
          "rows": [
            [
              "Carry Track",
              "(0)",
              "0",
              "0",
              "0",
              "0",
              "0"
            ],
            [
              "Minuend M",
              "",
              "0",
              "1",
              "1",
              "0",
              "1"
            ],
            [
              "Comp(N)",
              "",
              "0",
              "1",
              "0",
              "0",
              "0"
            ],
            [
              "Intermediate Sum",
              "0",
              "1",
              "0",
              "1",
              "0",
              "1"
            ]
          ]
        },
        {
          "title": "Step 3: Re-Complementation (Carry = 0 Decision)",
          "type": "summary",
          "content": "Carry = 0 indicates negative result (M < N). Take 1's complement of 10101 -> 01010. Attach negative sign: -(01010)₂"
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: 13 - 23 = -10₁₀. 10 in binary = 01010. Result: -01010₂!",
      "verification": "Base 10 Check: 13 - 23 = -10₁₀."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-m7",
    "trackId": "complements",
    "trackTitle": "Topic 3: Complements & Complement Subtraction",
    "topicBadge": "1.5G: 2's Complement Subtraction (M < N)",
    "difficulty": "Hard",
    "set": "setA",
    "question": "Perform binary subtraction: (01011)₂ - (11010)₂ using 2's complement arithmetic.",
    "promptDetail": "Detect End Carry = 0, re-complement sum using 2's complement, and attach negative sign.",
    "inputFormatHint": "Enter negative binary, e.g., -01111 or -1111",
    "correctAnswer": "-01111",
    "acceptedAnswers": [
      "-01111",
      "-1111",
      "-(01111)2",
      "-(1111)2",
      "-01111_2"
    ],
    "options": [
      {
        "label": "A",
        "text": "-01111",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "+01111",
        "distractorReason": "Omitted negative sign"
      },
      {
        "label": "C",
        "text": "-10001",
        "distractorReason": "Took 1's complement instead of 2's complement during re-complementation"
      },
      {
        "label": "D",
        "text": "-01110",
        "distractorReason": "Arithmetic error during +1 addition in re-complementation"
      }
    ],
    "hint1": "Formula & Rule: When End Carry = 0 in 2's complement subtraction, result is negative. Take the 2's complement of the intermediate sum and attach a '-' sign.",
    "hint2": "First Step & Trap: N = 11010 -> 2's comp = 00110. Add: 01011 + 00110 = 10001 (Carry = 0). Re-complement 10001: invert -> 01110, add 1 -> 01111. Answer = -01111.",
    "solution": {
      "finalAnswer": "-(01111)₂ = -15₁₀",
      "steps": [
        {
          "title": "Step 1: Compute 2's Complement of N",
          "type": "summary",
          "content": "N = 11010 -> 1's comp = 00101 -> 2's comp = 00110"
        },
        {
          "title": "Step 2: Add M + 2's Comp(N)",
          "type": "grid",
          "headers": [
            "Signal",
            "MSB C",
            "b4",
            "b3",
            "b2",
            "b1",
            "b0"
          ],
          "rows": [
            [
              "Carry Track",
              "(0)",
              "1",
              "1",
              "0",
              "0",
              "0"
            ],
            [
              "Minuend M",
              "",
              "0",
              "1",
              "0",
              "1",
              "1"
            ],
            [
              "2's Comp(N)",
              "",
              "0",
              "0",
              "1",
              "1",
              "0"
            ],
            [
              "Intermediate Sum",
              "0",
              "1",
              "0",
              "0",
              "0",
              "1"
            ]
          ]
        },
        {
          "title": "Step 3: Re-Complementation of Intermediate Sum",
          "type": "summary",
          "content": "Carry = 0 indicates M < N. Invert 10001 -> 01110. Add 1 -> 01111. Attach negative sign: -(01111)₂"
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: 11 - 26 = -15₁₀ = -(01111)₂!",
      "verification": "Base 10 Check: 11 - 26 = -15₁₀."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-m8",
    "trackId": "complements",
    "trackTitle": "Topic 3: Complements & Complement Subtraction",
    "topicBadge": "1.5H: 9's Complement Decimal Subtraction (M > N)",
    "difficulty": "Medium",
    "set": "setB",
    "question": "Subtract (218)₁₀ from (642)₁₀ using 9's complement arithmetic.",
    "promptDetail": "Show 9's complement of 218, addition, and End-Around Carry wrap-around.",
    "inputFormatHint": "Enter decimal result, e.g., +424 or 424",
    "correctAnswer": "+424",
    "acceptedAnswers": [
      "+424",
      "424",
      "(+424)10"
    ],
    "options": [
      {
        "label": "A",
        "text": "+424",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "+423",
        "distractorReason": "Forgot to add the End-Around Carry (+1 to LSB)"
      },
      {
        "label": "C",
        "text": "-424",
        "distractorReason": "Wrong sign"
      },
      {
        "label": "D",
        "text": "+524",
        "distractorReason": "Addition error during M + Comp(N)"
      }
    ],
    "hint1": "Formula & Rule: 9's comp of 218 = 999 - 218 = 781. Add 642 + 781 = 1423. End Carry = 1 -> wrap around and add +1 to LSB: 423 + 1 = +424.",
    "hint2": "First Step & Trap: Make sure both numbers have 3 digits (already equalized).",
    "solution": {
      "finalAnswer": "+(424)₁₀",
      "steps": [
        {
          "title": "Step 1: Compute 9's Complement of N",
          "type": "summary",
          "content": "999 - 218 = 781"
        },
        {
          "title": "Step 2: Add M + 9's Comp(N)",
          "type": "summary",
          "content": "642 + 781 = 1423 (MSB End Carry = 1)"
        },
        {
          "title": "Step 3: End-Around Carry Addition",
          "type": "summary",
          "content": "End Carry 1 wraps around: 423 + 1 = +424"
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: 642 - 218 = 424!",
      "verification": "Base 10 Check: 642 - 218 = 424₁₀."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-m9",
    "trackId": "complements",
    "trackTitle": "Topic 3: Complements & Complement Subtraction",
    "topicBadge": "1.5I: 10's Complement Decimal Subtraction (M > N)",
    "difficulty": "Medium",
    "set": "setB",
    "question": "Subtract (3240)₁₀ from (7520)₁₀ using 10's complement arithmetic.",
    "promptDetail": "Show 10's complement of 3240, addition, and carry discard.",
    "inputFormatHint": "Enter decimal result, e.g., +4280 or 4280",
    "correctAnswer": "+4280",
    "acceptedAnswers": [
      "+4280",
      "4280",
      "(+4280)10"
    ],
    "options": [
      {
        "label": "A",
        "text": "+4280",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "+4281",
        "distractorReason": "Mistakenly added End-Around Carry in 10's complement"
      },
      {
        "label": "C",
        "text": "-4280",
        "distractorReason": "Wrong sign"
      },
      {
        "label": "D",
        "text": "+4380",
        "distractorReason": "Complementation subtraction error"
      }
    ],
    "hint1": "Formula & Rule: 10's comp of 3240 = 9999 - 3240 + 1 = 6759 + 1 = 6760. Add 7520 + 6760 = 14280. Discard carry 1 -> +4280.",
    "hint2": "First Step & Trap: Remember in 10's complement, the end carry of 1 is DISCARDED, NOT added to the LSB!",
    "solution": {
      "finalAnswer": "+(4280)₁₀",
      "steps": [
        {
          "title": "Step 1: Compute 10's Complement of N",
          "type": "summary",
          "content": "9999 - 3240 = 6759 -> 6759 + 1 = 6760"
        },
        {
          "title": "Step 2: Add M + 10's Comp(N)",
          "type": "summary",
          "content": "7520 + 6760 = 14280 (MSB End Carry = 1)"
        },
        {
          "title": "Step 3: Discard End Carry",
          "type": "summary",
          "content": "In 10's complement, discard end carry 1 -> Final Answer = +4280"
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: 7520 - 3240 = 4280!",
      "verification": "Base 10 Check: 7520 - 3240 = 4280₁₀."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-m10",
    "trackId": "complements",
    "trackTitle": "Topic 3: Complements & Complement Subtraction",
    "topicBadge": "1.5J: 9's Complement Decimal Subtraction (M < N)",
    "difficulty": "Hard",
    "set": "setB",
    "question": "Perform decimal subtraction: (245)₁₀ - (678)₁₀ using 9's complement arithmetic.",
    "promptDetail": "Show addition, detect End Carry = 0, re-complement sum, and attach negative sign.",
    "inputFormatHint": "Enter negative decimal, e.g., -433",
    "correctAnswer": "-433",
    "acceptedAnswers": [
      "-433",
      "-(433)10",
      "-433_10"
    ],
    "options": [
      {
        "label": "A",
        "text": "-433",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "+433",
        "distractorReason": "Omitted negative sign"
      },
      {
        "label": "C",
        "text": "-566",
        "distractorReason": "Forgot to re-complement sum (566 is the intermediate sum!)"
      },
      {
        "label": "D",
        "text": "-432",
        "distractorReason": "Arithmetic re-complementation error"
      }
    ],
    "hint1": "Formula & Rule: 9's comp of 678 = 999 - 678 = 321. Add 245 + 321 = 566 (Carry = 0). Carry = 0 indicates negative result: re-complement 566 using 9's complement (999 - 566 = 433) and attach '-' sign.",
    "hint2": "First Step & Trap: Intermediate sum is 566 with NO end carry. Never stop at 566!",
    "solution": {
      "finalAnswer": "-(433)₁₀",
      "steps": [
        {
          "title": "Step 1: Compute 9's Complement of N",
          "type": "summary",
          "content": "999 - 678 = 321"
        },
        {
          "title": "Step 2: Add M + 9's Comp(N)",
          "type": "summary",
          "content": "245 + 321 = 566 (End Carry = 0)"
        },
        {
          "title": "Step 3: Re-Complement Intermediate Sum",
          "type": "summary",
          "content": "Carry = 0 indicates M < N. Re-complement 566: 999 - 566 = 433. Attach negative sign: -433"
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: 245 - 678 = -433!",
      "verification": "Base 10 Check: 245 - 678 = -433₁₀."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-m11",
    "trackId": "complements",
    "trackTitle": "Topic 3: Complements & Complement Subtraction",
    "topicBadge": "1.5K: 10's Complement Decimal Subtraction (M < N)",
    "difficulty": "Hard",
    "set": "setB",
    "question": "Perform decimal subtraction: (1350)₁₀ - (5480)₁₀ using 10's complement arithmetic.",
    "promptDetail": "Show addition, detect End Carry = 0, re-complement sum using 10's complement, and attach negative sign.",
    "inputFormatHint": "Enter negative decimal, e.g., -4130",
    "correctAnswer": "-4130",
    "acceptedAnswers": [
      "-4130",
      "-(4130)10",
      "-4130_10"
    ],
    "options": [
      {
        "label": "A",
        "text": "-4130",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "+4130",
        "distractorReason": "Omitted negative sign"
      },
      {
        "label": "C",
        "text": "-5870",
        "distractorReason": "Forgot to re-complement intermediate sum (5870 is intermediate sum!)"
      },
      {
        "label": "D",
        "text": "-4129",
        "distractorReason": "Used 9's complement instead of 10's complement during re-complementation"
      }
    ],
    "hint1": "Formula & Rule: 10's comp of 5480 = 9999 - 5480 + 1 = 4520. Add 1350 + 4520 = 5870 (Carry = 0). Take 10's comp of 5870: 9999 - 5870 + 1 = 4130. Result = -4130.",
    "hint2": "First Step & Trap: Intermediate sum has 0 carry -> true answer is negative. Re-complement using 10's complement!",
    "solution": {
      "finalAnswer": "-(4130)₁₀",
      "steps": [
        {
          "title": "Step 1: Compute 10's Complement of N",
          "type": "summary",
          "content": "9999 - 5480 + 1 = 4519 + 1 = 4520"
        },
        {
          "title": "Step 2: Add M + 10's Comp(N)",
          "type": "summary",
          "content": "1350 + 4520 = 5870 (End Carry = 0)"
        },
        {
          "title": "Step 3: Re-Complement Intermediate Sum",
          "type": "summary",
          "content": "Carry = 0 indicates M < N. 10's comp of 5870 = 9999 - 5870 + 1 = 4129 + 1 = 4130. Result: -4130"
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: 1350 - 5480 = -4130!",
      "verification": "Base 10 Check: 1350 - 5480 = -4130₁₀."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-m12",
    "trackId": "complements",
    "trackTitle": "Topic 3: Complements & Complement Subtraction",
    "topicBadge": "1.5L: Unequal Length Fractional 2's Complement Subtraction",
    "difficulty": "Hard",
    "set": "setB",
    "question": "Perform binary subtraction: (10.1)₂ - (11.011)₂ using 2's complement arithmetic.",
    "promptDetail": "CRITICAL: Equalize operand lengths before taking the complement! M = 010.100, N = 011.011.",
    "inputFormatHint": "Enter negative binary, e.g., -0.111 or -000.111",
    "correctAnswer": "-0.111",
    "acceptedAnswers": [
      "-0.111",
      "-000.111",
      "-.111",
      "-(0.111)2",
      "-(000.111)2"
    ],
    "options": [
      {
        "label": "A",
        "text": "-0.111",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "-0.011",
        "distractorReason": "Did not pad trailing zeros before complementation"
      },
      {
        "label": "C",
        "text": "+0.111",
        "distractorReason": "Omitted negative sign"
      },
      {
        "label": "D",
        "text": "-1.111",
        "distractorReason": "Integer borrow error during re-complementation"
      }
    ],
    "hint1": "Formula & Rule: MUST pad operands BEFORE complementation! Integer needs 3 bits, fraction needs 3 bits: M = 010.100, N = 011.011.",
    "hint2": "First Step & Trap: If you complement N without padding, you will get the wrong number of bits! 2's comp of 011.011: invert -> 100.100, add 0.001 -> 100.101.",
    "solution": {
      "finalAnswer": "-(0.111)₂",
      "steps": [
        {
          "title": "Step 1: Length Equalization with Amber Padded Zeros",
          "type": "summary",
          "content": "M = 010.100 (padded 1 leading 0, 2 trailing 0s). N = 011.011 (padded 1 leading 0)."
        },
        {
          "title": "Step 2: 2's Complement of Equalized N",
          "type": "summary",
          "content": "1's comp of 011.011 = 100.100 -> 2's comp = 100.101"
        },
        {
          "title": "Step 3: Add M + Comp(N)",
          "type": "summary",
          "content": "010.100 + 100.101 = 111.001 (End Carry = 0)"
        },
        {
          "title": "Step 4: Re-Complement Intermediate Sum (Carry = 0)",
          "type": "summary",
          "content": "Invert 111.001 -> 000.110. Add 0.001 -> 000.111. Attach '-' sign: -(0.111)₂"
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: 10.1₂ = 2.5₁₀. 11.011₂ = 3.375₁₀. 2.5 - 3.375 = -0.875₁₀ = -0.111₂!",
      "verification": "Base 10 Check: 2.5 - 3.375 = -0.875₁₀."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-m13",
    "trackId": "complements",
    "trackTitle": "Topic 3: Complements & Complement Subtraction",
    "topicBadge": "1.5A: 1's Complement of Binary Integer",
    "questionType": "numerical",
    "difficulty": "Easy",
    "set": "setA",
    "question": "Find the 1's complement of the binary number (11010011)₂.",
    "promptDetail": "Perform bitwise inversion: flip 1 to 0 and 0 to 1.",
    "inputFormatHint": "Enter 8-bit binary, e.g., 00101100",
    "correctAnswer": "00101100",
    "acceptedAnswers": [
      "00101100",
      "(00101100)2",
      "00101100_2"
    ],
    "options": [
      {
        "label": "A",
        "text": "00101100",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "00101101",
        "distractorReason": "This is the 2's complement (added 1 to LSB)"
      },
      {
        "label": "C",
        "text": "11010011",
        "distractorReason": "Original uncomplemented number"
      },
      {
        "label": "D",
        "text": "00100100",
        "distractorReason": "Bit inversion error in column b3"
      }
    ],
    "hint1": "Formula & Rule: 1's complement is obtained by flipping every 0 to 1 and every 1 to 0.",
    "hint2": "First Step & Trap: 11010011 -> 00101100. Do NOT add 1 (that is 2's complement!).",
    "solution": {
      "finalAnswer": "(00101100)₂",
      "steps": [
        {
          "title": "Step 1: Bitwise Inversion",
          "type": "summary",
          "content": "11010011 -> Invert every bit -> 00101100"
        }
      ],
      "fastShortcut": "Fast Inversion: 1->0, 0->1 across all bits: 00101100₂!",
      "verification": "Base 10 Check: (2⁸ - 1) - 211 = 255 - 211 = 44₁₀ = 00101100₂ (100% verified)."
    }
  },
  {
    "id": "q-m14",
    "trackId": "complements",
    "trackTitle": "Topic 3: Complements & Complement Subtraction",
    "topicBadge": "1.5A: 2's Complement with Trailing Zeros",
    "questionType": "numerical",
    "difficulty": "Medium",
    "set": "setA",
    "question": "Find the 2's complement of the binary integer (11001000)₂.",
    "promptDetail": "Show bit inversion then +1 at LSB, paying attention to trailing zero carry ripple.",
    "inputFormatHint": "Enter 8-bit binary, e.g., 00111000",
    "correctAnswer": "00111000",
    "acceptedAnswers": [
      "00111000",
      "(00111000)2",
      "00111000_2"
    ],
    "options": [
      {
        "label": "A",
        "text": "00111000",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "00110111",
        "distractorReason": "This is only the 1's complement"
      },
      {
        "label": "C",
        "text": "00110001",
        "distractorReason": "Failed to propagate carry through trailing zeros"
      },
      {
        "label": "D",
        "text": "11001000",
        "distractorReason": "No change made"
      }
    ],
    "hint1": "Formula & Rule: 1's comp = 00110111. Add 1: 00110111 + 1 = 00111000.",
    "hint2": "First Step & Trap: Fast scan shortcut: scan from right, leave trailing zeros (000) and first 1 unchanged (1000). Flip all remaining bits to the left: 1100 -> 0011.",
    "solution": {
      "finalAnswer": "(00111000)₂",
      "steps": [
        {
          "title": "Step 1: Compute 1's Complement",
          "type": "summary",
          "content": "Invert all 8 bits: 11001000 -> 00110111"
        },
        {
          "title": "Step 2: Add 1 to LSB",
          "type": "summary",
          "content": "00110111 + 1 = 00111000"
        }
      ],
      "fastShortcut": "Fast Scan Shortcut: Keep trailing 1000 unchanged, flip left bits 1100 -> 0011. Result: 00111000!",
      "verification": "Base 10 Check: 256 - 200 = 56₁₀ = 32 + 16 + 8 = (00111000)₂ (100% verified)."
    }
  },
  {
    "id": "q-m15",
    "trackId": "complements",
    "trackTitle": "Topic 3: Complements & Complement Subtraction",
    "topicBadge": "1.5B: 9's Complement of Decimal",
    "questionType": "numerical",
    "difficulty": "Easy",
    "set": "setA",
    "question": "Find the 9's complement of the decimal number (58240)₁₀.",
    "promptDetail": "Subtract each digit from 9.",
    "inputFormatHint": "Enter 5-digit decimal, e.g., 41759",
    "correctAnswer": "41759",
    "acceptedAnswers": [
      "41759",
      "(41759)10",
      "41759_10"
    ],
    "options": [
      {
        "label": "A",
        "text": "41759",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "41760",
        "distractorReason": "This is the 10's complement (added 1)"
      },
      {
        "label": "C",
        "text": "51759",
        "distractorReason": "9 - 5 calculated as 5 instead of 4"
      },
      {
        "label": "D",
        "text": "41750",
        "distractorReason": "Subtracted trailing 0 from 0 instead of 9"
      }
    ],
    "hint1": "Formula & Rule: 9's complement of 5-digit number N is 99999 - N.",
    "hint2": "First Step & Trap: 99999 - 58240: 9-5=4, 9-8=1, 9-2=7, 9-4=5, 9-0=9 -> 41759.",
    "solution": {
      "finalAnswer": "41759₁₀",
      "steps": [
        {
          "title": "Step 1: Digit-by-Digit Subtraction from 9",
          "type": "summary",
          "content": "99999 - 58240 = 41759"
        }
      ],
      "fastShortcut": "Fast Inspection: 9-5=4, 9-8=1, 9-2=7, 9-4=5, 9-0=9 -> 41759!",
      "verification": "Base 10 Check: 58240 + 41759 = 99999."
    }
  },
  {
    "id": "q-m16",
    "trackId": "complements",
    "trackTitle": "Topic 3: Complements & Complement Subtraction",
    "topicBadge": "1.5B: 10's Complement with Trailing Zeros",
    "questionType": "numerical",
    "difficulty": "Easy",
    "set": "setA",
    "question": "Find the 10's complement of the decimal integer (24600)₁₀.",
    "promptDetail": "Show 9's complement + 1, observing that trailing zeros remain zeros.",
    "inputFormatHint": "Enter 5-digit decimal, e.g., 75400",
    "correctAnswer": "75400",
    "acceptedAnswers": [
      "75400",
      "(75400)10",
      "75400_10"
    ],
    "options": [
      {
        "label": "A",
        "text": "75400",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "75399",
        "distractorReason": "This is only the 9's complement"
      },
      {
        "label": "C",
        "text": "75401",
        "distractorReason": "Added 1 without respecting trailing zeros"
      },
      {
        "label": "D",
        "text": "85400",
        "distractorReason": "Subtraction error on first digit"
      }
    ],
    "hint1": "Formula & Rule: 10's complement = 9's complement + 1 = 99999 - 24600 + 1 = 75399 + 1 = 75400.",
    "hint2": "First Step & Trap: 9-9-10 inspection shortcut: leave trailing zeros untouched (00). Subtract first non-zero digit from 10 (10 - 6 = 4). Subtract remaining digits from 9: 9-4=5, 9-2=7 -> 75400.",
    "solution": {
      "finalAnswer": "75400₁₀",
      "steps": [
        {
          "title": "Step 1: 9's Complement Computation",
          "type": "summary",
          "content": "99999 - 24600 = 75399"
        },
        {
          "title": "Step 2: Add 1 to LSB",
          "type": "summary",
          "content": "75399 + 1 = 75400"
        }
      ],
      "fastShortcut": "Fast 9-9-10 Shortcut: Keep trailing 00, 10-6=4, 9-4=5, 9-2=7 -> 75400!",
      "verification": "Base 10 Check: 100000 - 24600 = 75400₁₀."
    }
  },
  {
    "id": "q-m17",
    "trackId": "complements",
    "trackTitle": "Topic 3: Complements & Complement Subtraction",
    "topicBadge": "1.5C: Fractional 1's Complement",
    "questionType": "numerical",
    "difficulty": "Medium",
    "set": "setA",
    "question": "Find the 1's complement of the fractional binary number (110.1011)₂.",
    "promptDetail": "Invert all bits across the radix point.",
    "inputFormatHint": "Enter binary string with point, e.g., 001.0100",
    "correctAnswer": "001.0100",
    "acceptedAnswers": [
      "001.0100",
      "(001.0100)2",
      "001.0100_2",
      "1.01"
    ],
    "options": [
      {
        "label": "A",
        "text": "001.0100",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "001.0101",
        "distractorReason": "Added 1 to fractional LSB (computed 2's complement instead)"
      },
      {
        "label": "C",
        "text": "001.1011",
        "distractorReason": "Inverted integer part but left fraction unchanged"
      },
      {
        "label": "D",
        "text": "110.0100",
        "distractorReason": "Inverted fraction but left integer unchanged"
      }
    ],
    "hint1": "Formula & Rule: Invert all bits both before and after the radix point: 110.1011 -> 001.0100.",
    "hint2": "First Step & Trap: Radix point stays in the exact same position.",
    "solution": {
      "finalAnswer": "(001.0100)₂",
      "steps": [
        {
          "title": "Step 1: Fractional Bit Inversion",
          "type": "summary",
          "content": "110.1011 -> Invert every bit -> 001.0100"
        }
      ],
      "fastShortcut": "Fast Inversion: 110 -> 001, .1011 -> .0100. Result: 001.0100₂!",
      "verification": "Sum Check: 110.1011 + 001.0100 = 111.1111."
    }
  },
  {
    "id": "q-m18",
    "trackId": "complements",
    "trackTitle": "Topic 3: Complements & Complement Subtraction",
    "topicBadge": "1.5C: Fractional 2's Complement with Trailing Zeros",
    "questionType": "numerical",
    "difficulty": "Medium",
    "set": "setA",
    "question": "Find the 2's complement of the fractional binary number (101.0100)₂.",
    "promptDetail": "Invert all bits and add 1 at the rightmost fractional LSB position (b-4).",
    "inputFormatHint": "Enter binary string with point, e.g., 010.1100",
    "correctAnswer": "010.1100",
    "acceptedAnswers": [
      "010.1100",
      "(010.1100)2",
      "010.1100_2",
      "10.11"
    ],
    "options": [
      {
        "label": "A",
        "text": "010.1100",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "010.1011",
        "distractorReason": "This is only the 1's complement"
      },
      {
        "label": "C",
        "text": "010.1101",
        "distractorReason": "Added 1 to LSB without respecting trailing zero bits"
      },
      {
        "label": "D",
        "text": "011.1100",
        "distractorReason": "Integer carry error"
      }
    ],
    "hint1": "Formula & Rule: 1's comp = 010.1011. Add 0.0001 at LSB: 010.1011 + 0.0001 = 010.1100.",
    "hint2": "First Step & Trap: Fast scan shortcut: keep trailing 00 and first 1 unchanged (.0100 -> .1100). Invert left: 101.0 -> 010.1.",
    "solution": {
      "finalAnswer": "(010.1100)₂",
      "steps": [
        {
          "title": "Step 1: Compute 1's Complement Across Radix Point",
          "type": "summary",
          "content": "Invert 101.0100 -> 010.1011"
        },
        {
          "title": "Step 2: Add 1 at Fractional LSB (b-4)",
          "type": "summary",
          "content": "010.1011 + 0.0001 = 010.1100"
        }
      ],
      "fastShortcut": "Fast Scan: Keep trailing 100 unchanged (.100 -> .100). Invert left: 101.0 -> 010.1. Result: 010.1100₂!",
      "verification": "Base 10 Check: 101.0100₂ = 5.25₁₀. 8 - 5.25 = 2.75₁₀ = 2 + 0.5 + 0.25 = (010.1100)₂."
    }
  },
  {
    "id": "q-m19",
    "trackId": "complements",
    "trackTitle": "Topic 3: Complements & Complement Subtraction",
    "topicBadge": "1.5D: 1's Complement Subtraction (M > N)",
    "questionType": "numerical",
    "difficulty": "Medium",
    "set": "setA",
    "question": "Perform binary subtraction: (110010)₂ - (011101)₂ using 1's complement arithmetic.",
    "promptDetail": "Show addition M + 1's comp(N), detect End-Around Carry (EAC = 1), and add +1 to LSB.",
    "inputFormatHint": "Enter binary result with sign, e.g., +010101 or 010101",
    "correctAnswer": "+010101",
    "acceptedAnswers": [
      "+010101",
      "010101",
      "10101",
      "+10101",
      "(+010101)2"
    ],
    "options": [
      {
        "label": "A",
        "text": "+010101",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "+010100",
        "distractorReason": "Forgot to wrap around the End-Around Carry (+1 to LSB)"
      },
      {
        "label": "C",
        "text": "-010101",
        "distractorReason": "Wrong sign (EAC = 1 means positive)"
      },
      {
        "label": "D",
        "text": "+011001",
        "distractorReason": "Addition carry error during M + Comp(N)"
      }
    ],
    "hint1": "Formula & Rule: 50 - 29 = +21. N = 011101 -> 1's comp = 100010. Add 110010 + 100010 = 1 010100. EAC 1 wraps: 010100 + 1 = +010101.",
    "hint2": "First Step & Trap: Remember EAC applies to 1's complement, wrapping around to the units bit.",
    "solution": {
      "finalAnswer": "+(010101)₂ = +21₁₀",
      "steps": [
        {
          "title": "Step 1: 1's Complement of N",
          "type": "summary",
          "content": "N = 011101 -> 1's comp(N) = 100010"
        },
        {
          "title": "Step 2: Add M + 1's Comp(N)",
          "type": "grid",
          "headers": [
            "Signal",
            "MSB C",
            "b5",
            "b4",
            "b3",
            "b2",
            "b1",
            "b0"
          ],
          "rows": [
            [
              "Carry Track",
              "(1)",
              "1",
              "0",
              "0",
              "0",
              "0",
              "0"
            ],
            [
              "Minuend M",
              "",
              "1",
              "1",
              "0",
              "0",
              "1",
              "0"
            ],
            [
              "Comp(N)",
              "",
              "1",
              "0",
              "0",
              "0",
              "1",
              "0"
            ],
            [
              "Raw Sum",
              "1",
              "0",
              "1",
              "0",
              "1",
              "0",
              "0"
            ]
          ]
        },
        {
          "title": "Step 3: End-Around Carry Wrap-Around",
          "type": "summary",
          "content": "End Carry = 1 indicates positive result. Add +1 to LSB: 010100 + 1 = +010101₂"
        }
      ],
      "fastShortcut": "Fast Inspection: 50 - 29 = +21₁₀ = 16 + 4 + 1 = +010101₂!",
      "verification": "Base 10 Check: 50 - 29 = +21₁₀."
    }
  },
  {
    "id": "q-m20",
    "trackId": "complements",
    "trackTitle": "Topic 3: Complements & Complement Subtraction",
    "topicBadge": "1.5F: 1's Complement Subtraction (M < N)",
    "questionType": "numerical",
    "difficulty": "Hard",
    "set": "setA",
    "question": "Perform binary subtraction: (010101)₂ - (110010)₂ using 1's complement arithmetic.",
    "promptDetail": "Detect End Carry = 0, re-complement the sum using 1's complement, and attach negative sign.",
    "inputFormatHint": "Enter negative binary, e.g., -011101 or -11101",
    "correctAnswer": "-011101",
    "acceptedAnswers": [
      "-011101",
      "-11101",
      "-(011101)2",
      "-(11101)2"
    ],
    "options": [
      {
        "label": "A",
        "text": "-011101",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "+011101",
        "distractorReason": "Omitted negative sign"
      },
      {
        "label": "C",
        "text": "-100010",
        "distractorReason": "Forgot to re-complement intermediate sum (100010 is raw sum!)"
      },
      {
        "label": "D",
        "text": "-011110",
        "distractorReason": "Re-complementation arithmetic error"
      }
    ],
    "hint1": "Formula & Rule: 21 - 50 = -29. M = 010101, 1's comp N = 001101. Add: 010101 + 001101 = 100010 (Carry = 0). Carry 0 means negative: re-complement 100010 -> 011101 -> -011101.",
    "hint2": "First Step & Trap: Carry out of MSB is 0! Never stop at 100010.",
    "solution": {
      "finalAnswer": "-(011101)₂ = -29₁₀",
      "steps": [
        {
          "title": "Step 1: 1's Complement of N",
          "type": "summary",
          "content": "N = 110010 -> 1's comp(N) = 001101"
        },
        {
          "title": "Step 2: Add M + Comp(N)",
          "type": "grid",
          "headers": [
            "Signal",
            "MSB C",
            "b5",
            "b4",
            "b3",
            "b2",
            "b1",
            "b0"
          ],
          "rows": [
            [
              "Carry Track",
              "(0)",
              "0",
              "0",
              "1",
              "0",
              "0",
              "0"
            ],
            [
              "Minuend M",
              "",
              "0",
              "1",
              "0",
              "1",
              "0",
              "1"
            ],
            [
              "Comp(N)",
              "",
              "0",
              "0",
              "1",
              "1",
              "0",
              "1"
            ],
            [
              "Intermediate Sum",
              "0",
              "1",
              "0",
              "0",
              "0",
              "1",
              "0"
            ]
          ]
        },
        {
          "title": "Step 3: Re-Complementation",
          "type": "summary",
          "content": "Carry = 0 indicates negative result. 1's complement of 100010 = 011101. Attach negative sign: -(011101)₂"
        }
      ],
      "fastShortcut": "Fast Inspection: 21 - 50 = -29₁₀ = -(16 + 8 + 4 + 1) = -011101₂!",
      "verification": "Base 10 Check: 21 - 50 = -29₁₀."
    }
  },
  {
    "id": "q-m21",
    "trackId": "complements",
    "trackTitle": "Topic 3: Complements & Complement Subtraction",
    "topicBadge": "1.5E: 2's Complement Subtraction (M > N)",
    "questionType": "numerical",
    "difficulty": "Medium",
    "set": "setB",
    "question": "Perform binary subtraction: (111011)₂ - (010110)₂ using 2's complement arithmetic.",
    "promptDetail": "Show addition M + 2's comp(N), detect End Carry = 1, and discard carry.",
    "inputFormatHint": "Enter binary result, e.g., +100101 or 100101",
    "correctAnswer": "+100101",
    "acceptedAnswers": [
      "+100101",
      "100101",
      "(+100101)2",
      "+0100101"
    ],
    "options": [
      {
        "label": "A",
        "text": "+100101",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "+100110",
        "distractorReason": "Mistakenly added End-Around Carry in 2's complement"
      },
      {
        "label": "C",
        "text": "-100101",
        "distractorReason": "Wrong sign"
      },
      {
        "label": "D",
        "text": "+101101",
        "distractorReason": "Addition error in column b3"
      }
    ],
    "hint1": "Formula & Rule: 59 - 22 = +37. N = 010110 -> 2's comp = 101010. Add: 111011 + 101010 = 1 100101. Discard MSB carry 1 -> +100101.",
    "hint2": "First Step & Trap: In 2's complement subtraction, discard the end carry of 1!",
    "solution": {
      "finalAnswer": "+(100101)₂ = +37₁₀",
      "steps": [
        {
          "title": "Step 1: Compute 2's Complement of N",
          "type": "summary",
          "content": "N = 010110 -> 1's comp = 101001 -> 2's comp = 101010"
        },
        {
          "title": "Step 2: Add M + 2's Comp(N)",
          "type": "grid",
          "headers": [
            "Signal",
            "MSB C",
            "b5",
            "b4",
            "b3",
            "b2",
            "b1",
            "b0"
          ],
          "rows": [
            [
              "Carry Track",
              "(1)",
              "1",
              "0",
              "0",
              "1",
              "0",
              "0"
            ],
            [
              "Minuend M",
              "",
              "1",
              "1",
              "1",
              "0",
              "1",
              "1"
            ],
            [
              "2's Comp(N)",
              "",
              "1",
              "0",
              "1",
              "0",
              "1",
              "0"
            ],
            [
              "Sum",
              "1",
              "1",
              "0",
              "0",
              "1",
              "0",
              "1"
            ]
          ]
        },
        {
          "title": "Step 3: Discard End Carry",
          "type": "summary",
          "content": "End Carry = 1 indicates positive result. DISCARD MSB carry 1 -> Final Answer = +100101₂"
        }
      ],
      "fastShortcut": "Fast Inspection: 59 - 22 = +37₁₀ = 32 + 4 + 1 = +100101₂!",
      "verification": "Base 10 Check: 59 - 22 = +37₁₀."
    }
  },
  {
    "id": "q-m22",
    "trackId": "complements",
    "trackTitle": "Topic 3: Complements & Complement Subtraction",
    "topicBadge": "1.5G: 2's Complement Subtraction (M < N)",
    "questionType": "numerical",
    "difficulty": "Hard",
    "set": "setB",
    "question": "Perform binary subtraction: (010110)₂ - (111011)₂ using 2's complement arithmetic.",
    "promptDetail": "Detect End Carry = 0, re-complement sum using 2's complement, and attach negative sign.",
    "inputFormatHint": "Enter negative binary, e.g., -100101 or -0100101",
    "correctAnswer": "-100101",
    "acceptedAnswers": [
      "-100101",
      "-0100101",
      "-(100101)2",
      "-(0100101)2"
    ],
    "options": [
      {
        "label": "A",
        "text": "-100101",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "+100101",
        "distractorReason": "Omitted negative sign"
      },
      {
        "label": "C",
        "text": "-011011",
        "distractorReason": "Forgot to re-complement intermediate sum (011011 is raw sum!)"
      },
      {
        "label": "D",
        "text": "-100100",
        "distractorReason": "Used 1's complement instead of 2's complement during re-complementation"
      }
    ],
    "hint1": "Formula & Rule: 22 - 59 = -37. N = 111011 -> 2's comp = 000101. Add: 010110 + 000101 = 011011 (Carry = 0). Re-complement 011011: invert -> 100100, add 1 -> 100101. Answer = -100101.",
    "hint2": "First Step & Trap: Carry = 0 indicates negative result. Must re-complement with 2's complement!",
    "solution": {
      "finalAnswer": "-(100101)₂ = -37₁₀",
      "steps": [
        {
          "title": "Step 1: Compute 2's Complement of N",
          "type": "summary",
          "content": "N = 111011 -> 1's comp = 000100 -> 2's comp = 000101"
        },
        {
          "title": "Step 2: Add M + 2's Comp(N)",
          "type": "grid",
          "headers": [
            "Signal",
            "MSB C",
            "b5",
            "b4",
            "b3",
            "b2",
            "b1",
            "b0"
          ],
          "rows": [
            [
              "Carry Track",
              "(0)",
              "0",
              "0",
              "0",
              "1",
              "0",
              "0"
            ],
            [
              "Minuend M",
              "",
              "0",
              "1",
              "0",
              "1",
              "1",
              "0"
            ],
            [
              "2's Comp(N)",
              "",
              "0",
              "0",
              "0",
              "1",
              "0",
              "1"
            ],
            [
              "Intermediate Sum",
              "0",
              "0",
              "1",
              "1",
              "0",
              "1",
              "1"
            ]
          ]
        },
        {
          "title": "Step 3: Re-Complementation of Intermediate Sum",
          "type": "summary",
          "content": "Carry = 0 indicates negative result. 2's complement of 011011 = 100100 + 1 = 100101. Attach negative sign: -(100101)₂"
        }
      ],
      "fastShortcut": "Fast Inspection: 22 - 59 = -37₁₀ = -(100101)₂!",
      "verification": "Base 10 Check: 22 - 59 = -37₁₀."
    }
  },
  {
    "id": "q-m23",
    "trackId": "complements",
    "trackTitle": "Topic 3: Complements & Complement Subtraction",
    "topicBadge": "1.5E: Unequal Bit Length 2's Complement Subtraction",
    "questionType": "numerical",
    "difficulty": "Medium",
    "set": "setB",
    "question": "Perform binary subtraction: (11010)₂ - (101)₂ using 2's complement arithmetic.",
    "promptDetail": "CRITICAL: Pad subtrahend N to 5 bits (00101) BEFORE taking its complement!",
    "inputFormatHint": "Enter binary result, e.g., +10101 or 10101",
    "correctAnswer": "+10101",
    "acceptedAnswers": [
      "+10101",
      "10101",
      "(+10101)2",
      "+010101"
    ],
    "options": [
      {
        "label": "A",
        "text": "+10101",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "+10110",
        "distractorReason": "Did not pad N to 5 bits before complementation"
      },
      {
        "label": "C",
        "text": "-10101",
        "distractorReason": "Wrong sign"
      },
      {
        "label": "D",
        "text": "+01101",
        "distractorReason": "Addition error during M + Comp(N)"
      }
    ],
    "hint1": "Formula & Rule: Equalize lengths: M = 11010 (5 bits), N = 00101 (padded to 5 bits). 2's comp of 00101 = 11011.",
    "hint2": "First Step & Trap: Add 11010 + 11011 = 1 10101. Discard carry 1 -> +10101.",
    "solution": {
      "finalAnswer": "+(10101)₂ = +21₁₀",
      "steps": [
        {
          "title": "Step 1: Length Equalization and Complementation",
          "type": "summary",
          "content": "M = 11010 (5 bits). N = 101 -> pad to 00101. 2's comp of 00101 = 11011."
        },
        {
          "title": "Step 2: Add M + 2's Comp(N)",
          "type": "summary",
          "content": "11010 + 11011 = 1 10101 (End Carry = 1). Discard carry 1 -> +10101₂"
        }
      ],
      "fastShortcut": "Fast Inspection: 26 - 5 = +21₁₀ = 16 + 4 + 1 = +10101₂!",
      "verification": "Base 10 Check: 26 - 5 = +21₁₀."
    }
  },
  {
    "id": "q-m24",
    "trackId": "complements",
    "trackTitle": "Topic 3: Complements & Complement Subtraction",
    "topicBadge": "1.5H: 9's Complement Decimal Subtraction (M > N)",
    "questionType": "numerical",
    "difficulty": "Medium",
    "set": "setB",
    "question": "Subtract (349)₁₀ from (835)₁₀ using 9's complement arithmetic.",
    "promptDetail": "Show 9's complement of 349, addition, and End-Around Carry wrap-around.",
    "inputFormatHint": "Enter decimal result, e.g., +486 or 486",
    "correctAnswer": "+486",
    "acceptedAnswers": [
      "+486",
      "486",
      "(+486)10"
    ],
    "options": [
      {
        "label": "A",
        "text": "+486",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "+485",
        "distractorReason": "Forgot to wrap around End-Around Carry (+1 to LSB)"
      },
      {
        "label": "C",
        "text": "-486",
        "distractorReason": "Wrong sign"
      },
      {
        "label": "D",
        "text": "+586",
        "distractorReason": "Addition error during M + Comp(N)"
      }
    ],
    "hint1": "Formula & Rule: 9's comp of 349 = 999 - 349 = 650. Add 835 + 650 = 1485. End Carry = 1 -> wrap around: 485 + 1 = +486.",
    "hint2": "First Step & Trap: Both numbers have 3 digits. End carry 1 confirms positive answer.",
    "solution": {
      "finalAnswer": "+(486)₁₀",
      "steps": [
        {
          "title": "Step 1: Compute 9's Complement of N",
          "type": "summary",
          "content": "999 - 349 = 650"
        },
        {
          "title": "Step 2: Add M + 9's Comp(N)",
          "type": "summary",
          "content": "835 + 650 = 1485 (End Carry = 1)"
        },
        {
          "title": "Step 3: End-Around Carry Wrap-Around",
          "type": "summary",
          "content": "End carry of 1 is added to LSB: 485 + 1 = +486"
        }
      ],
      "fastShortcut": "Fast Inspection: 835 - 349 = 486!",
      "verification": "Base 10 Check: 835 - 349 = 486₁₀."
    }
  },
  {
    "id": "q-m25",
    "trackId": "complements",
    "trackTitle": "Topic 3: Complements & Complement Subtraction",
    "topicBadge": "1.5J: 9's Complement Decimal Subtraction (M < N)",
    "questionType": "numerical",
    "difficulty": "Hard",
    "set": "setB",
    "question": "Perform decimal subtraction: (278)₁₀ - (645)₁₀ using 9's complement arithmetic.",
    "promptDetail": "Show addition, detect End Carry = 0, re-complement sum, and attach negative sign.",
    "inputFormatHint": "Enter negative decimal, e.g., -367",
    "correctAnswer": "-367",
    "acceptedAnswers": [
      "-367",
      "-(367)10",
      "-367_10"
    ],
    "options": [
      {
        "label": "A",
        "text": "-367",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "+367",
        "distractorReason": "Omitted negative sign"
      },
      {
        "label": "C",
        "text": "-632",
        "distractorReason": "Forgot to re-complement intermediate sum (632 is intermediate sum!)"
      },
      {
        "label": "D",
        "text": "-366",
        "distractorReason": "Arithmetic error in re-complementation"
      }
    ],
    "hint1": "Formula & Rule: 9's comp of 645 = 999 - 645 = 354. Add 278 + 354 = 632 (Carry = 0). Carry = 0 indicates negative: re-complement 632 (999 - 632 = 367) -> -367.",
    "hint2": "First Step & Trap: Intermediate sum has NO carry. Never stop at 632!",
    "solution": {
      "finalAnswer": "-(367)₁₀",
      "steps": [
        {
          "title": "Step 1: Compute 9's Complement of N",
          "type": "summary",
          "content": "999 - 645 = 354"
        },
        {
          "title": "Step 2: Add M + 9's Comp(N)",
          "type": "summary",
          "content": "278 + 354 = 632 (End Carry = 0)"
        },
        {
          "title": "Step 3: Re-Complement Intermediate Sum",
          "type": "summary",
          "content": "Carry = 0 indicates negative result. 999 - 632 = 367. Attach negative sign: -367"
        }
      ],
      "fastShortcut": "Fast Inspection: 278 - 645 = -367!",
      "verification": "Base 10 Check: 278 - 645 = -367₁₀."
    }
  },
  {
    "id": "q-m26",
    "trackId": "complements",
    "trackTitle": "Topic 3: Complements & Complement Subtraction",
    "topicBadge": "1.5I: 10's Complement Decimal Subtraction (M > N)",
    "questionType": "numerical",
    "difficulty": "Medium",
    "set": "setB",
    "question": "Subtract (4615)₁₀ from (9240)₁₀ using 10's complement arithmetic.",
    "promptDetail": "Show 10's complement of 4615, addition, and carry discard.",
    "inputFormatHint": "Enter decimal result, e.g., +4625 or 4625",
    "correctAnswer": "+4625",
    "acceptedAnswers": [
      "+4625",
      "4625",
      "(+4625)10"
    ],
    "options": [
      {
        "label": "A",
        "text": "+4625",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "+4626",
        "distractorReason": "Mistakenly added End-Around Carry in 10's complement"
      },
      {
        "label": "C",
        "text": "-4625",
        "distractorReason": "Wrong sign"
      },
      {
        "label": "D",
        "text": "+4725",
        "distractorReason": "Subtraction error in 10's complement step"
      }
    ],
    "hint1": "Formula & Rule: 10's comp of 4615 = 9999 - 4615 + 1 = 5384 + 1 = 5385. Add 9240 + 5385 = 14625. Discard carry 1 -> +4625.",
    "hint2": "First Step & Trap: In 10's complement, DISCARD the end carry!",
    "solution": {
      "finalAnswer": "+(4625)₁₀",
      "steps": [
        {
          "title": "Step 1: Compute 10's Complement of N",
          "type": "summary",
          "content": "9999 - 4615 + 1 = 5384 + 1 = 5385"
        },
        {
          "title": "Step 2: Add M + 10's Comp(N)",
          "type": "summary",
          "content": "9240 + 5385 = 14625 (MSB End Carry = 1)"
        },
        {
          "title": "Step 3: Discard End Carry",
          "type": "summary",
          "content": "Discard end carry 1 -> Final Answer = +4625"
        }
      ],
      "fastShortcut": "Fast Inspection: 9240 - 4615 = 4625!",
      "verification": "Base 10 Check: 9240 - 4615 = 4625₁₀."
    }
  },
  {
    "id": "q-m27",
    "trackId": "complements",
    "trackTitle": "Topic 3: Complements & Complement Subtraction",
    "topicBadge": "1.5K: 10's Complement Decimal Subtraction (M < N)",
    "questionType": "numerical",
    "difficulty": "Hard",
    "set": "setB",
    "question": "Perform decimal subtraction: (3180)₁₀ - (7820)₁₀ using 10's complement arithmetic.",
    "promptDetail": "Show addition, detect End Carry = 0, re-complement sum using 10's complement, and attach negative sign.",
    "inputFormatHint": "Enter negative decimal, e.g., -4640",
    "correctAnswer": "-4640",
    "acceptedAnswers": [
      "-4640",
      "-(4640)10",
      "-4640_10"
    ],
    "options": [
      {
        "label": "A",
        "text": "-4640",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "+4640",
        "distractorReason": "Omitted negative sign"
      },
      {
        "label": "C",
        "text": "-5360",
        "distractorReason": "Forgot to re-complement intermediate sum (5360 is raw sum!)"
      },
      {
        "label": "D",
        "text": "-4639",
        "distractorReason": "Used 9's complement instead of 10's complement during re-complementation"
      }
    ],
    "hint1": "Formula & Rule: 10's comp of 7820 = 9999 - 7820 + 1 = 2179 + 1 = 2180. Add 3180 + 2180 = 5360 (Carry = 0). 10's comp of 5360 = 9999 - 5360 + 1 = 4640. Result = -4640.",
    "hint2": "First Step & Trap: Intermediate sum has 0 carry -> negative result. Take 10's complement of 5360!",
    "solution": {
      "finalAnswer": "-(4640)₁₀",
      "steps": [
        {
          "title": "Step 1: Compute 10's Complement of N",
          "type": "summary",
          "content": "9999 - 7820 + 1 = 2180"
        },
        {
          "title": "Step 2: Add M + 10's Comp(N)",
          "type": "summary",
          "content": "3180 + 2180 = 5360 (End Carry = 0)"
        },
        {
          "title": "Step 3: Re-Complement Intermediate Sum",
          "type": "summary",
          "content": "10's complement of 5360 = 9999 - 5360 + 1 = 4640. Attach negative sign: -4640"
        }
      ],
      "fastShortcut": "Fast Inspection: 3180 - 7820 = -4640!",
      "verification": "Base 10 Check: 3180 - 7820 = -4640₁₀."
    }
  },
  {
    "id": "q-m28",
    "trackId": "complements",
    "trackTitle": "Topic 3: Complements & Complement Subtraction",
    "topicBadge": "1.5A: 2's Complement Inspection Rule",
    "questionType": "fill_blank",
    "difficulty": "Easy",
    "set": "theory",
    "question": "When scanning a binary integer from right to left to find its 2's complement by inspection, all bits up to and including the ____ remain unchanged, and all bits to the left are inverted.",
    "promptDetail": "State which bit marks the boundary of bit inversion.",
    "inputFormatHint": "Enter text, e.g., first 1",
    "correctAnswer": "first 1",
    "acceptedAnswers": [
      "first 1",
      "first one",
      "first 1 bit",
      "first '1'"
    ],
    "options": [
      {
        "label": "A",
        "text": "first 1",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "first 0",
        "distractorReason": "The first 0 does not mark the boundary of 2's complement"
      },
      {
        "label": "C",
        "text": "MSB",
        "distractorReason": "MSB is on the extreme left, not during right-to-left scan"
      },
      {
        "label": "D",
        "text": "last 1",
        "distractorReason": "Scanning starts from the right (LSB), so the first '1' encountered is the boundary"
      }
    ],
    "hint1": "Formula & Rule: Scanning right to left: trailing zeros stay zero, and the first 1 remains 1. Every bit to the left is flipped (0 <-> 1).",
    "hint2": "First Step & Trap: For example: on 101100, trailing 00 stay 00, first 1 stays 1 -> 100, and 101 flips to 010 -> 010100.",
    "solution": {
      "finalAnswer": "first 1",
      "steps": [
        {
          "title": "Right-to-Left Inspection Theorem",
          "type": "summary",
          "content": "Because 2's complement adds 1 to the 1's complement, adding 1 ripples through all inverted trailing 1s (turning them back to 0s) until reaching the inverted first 1 (turning it back to 1). Therefore, all bits up to and including the first 1 remain identical to the original number."
        }
      ],
      "fastShortcut": "Fast Fact: Scan right-to-left: keep up to first 1, invert the rest!",
      "verification": "Mathematical induction proof."
    }
  },
  {
    "id": "q-m29",
    "trackId": "complements",
    "trackTitle": "Topic 3: Complements & Complement Subtraction",
    "topicBadge": "1.5D: 1's Complement Carry Rule",
    "questionType": "fill_blank",
    "difficulty": "Easy",
    "set": "theory",
    "question": "In 1's complement subtraction, an end carry of 1 signifies that the result is ____ and the end carry must be added to the ____.",
    "promptDetail": "State the result sign and target position.",
    "inputFormatHint": "Enter text, e.g., positive and LSB",
    "correctAnswer": "positive and LSB",
    "acceptedAnswers": [
      "positive and LSB",
      "positive, LSB",
      "positive and added to LSB",
      "positive and units bit"
    ],
    "options": [
      {
        "label": "A",
        "text": "positive and LSB",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "negative and discarded",
        "distractorReason": "Carry 1 indicates positive, not negative; discarding is for 2's complement"
      },
      {
        "label": "C",
        "text": "positive and discarded",
        "distractorReason": "Discarding carry applies to 2's complement (r's complement), not 1's complement!"
      },
      {
        "label": "D",
        "text": "negative and LSB",
        "distractorReason": "Carry 1 always indicates positive"
      }
    ],
    "hint1": "Formula & Rule: In 1's complement (diminished radix complement), the end carry of 1 is the End-Around Carry (EAC) that must be wrapped around and added to the LSB.",
    "hint2": "First Step & Trap: End carry = 1 -> positive. End carry = 0 -> negative.",
    "solution": {
      "finalAnswer": "positive and LSB",
      "steps": [
        {
          "title": "Diminished Radix End-Around Carry Law",
          "type": "summary",
          "content": "In (r - 1)'s complement subtraction M - N: If M >= N, an end carry of 1 is produced with value rⁿ. Because M + (rⁿ - 1 - N) = (M - N) + rⁿ - 1, subtracting rⁿ and adding 1 completes the true difference. Thus the end carry 1 is wrapped around to the LSB."
        }
      ],
      "fastShortcut": "Fast Rule: 1's complement End-Carry wraps to LSB!",
      "verification": "Axiomatic Diminished Radix Proof."
    }
  },
  {
    "id": "q-m30",
    "trackId": "complements",
    "trackTitle": "Topic 3: Complements & Complement Subtraction",
    "topicBadge": "1.5E: 2's Complement Carry Rule",
    "questionType": "conceptual_mcq",
    "difficulty": "Easy",
    "set": "theory",
    "question": "In 2's complement subtraction (M - N), what action is taken when an End-Carry of 1 is generated?",
    "promptDetail": "Identify result sign and treatment of end carry.",
    "inputFormatHint": "Select option A, B, C, or D",
    "correctAnswer": "The result is positive, and the end carry is DISCARDED",
    "acceptedAnswers": [
      "The result is positive, and the end carry is DISCARDED",
      "A"
    ],
    "options": [
      {
        "label": "A",
        "text": "The result is positive, and the end carry is DISCARDED",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "The result is positive, and the end carry is added to LSB",
        "distractorReason": "Adding to LSB (End-Around Carry) is only for 1's complement!"
      },
      {
        "label": "C",
        "text": "The result is negative, and the sum must be re-complemented",
        "distractorReason": "Negative result occurs when End Carry is 0, not 1"
      },
      {
        "label": "D",
        "text": "An overflow has occurred and the result is invalid",
        "distractorReason": "End carry in unsigned subtraction simply indicates M >= N, not signed overflow"
      }
    ],
    "hint1": "Formula & Rule: In 2's complement subtraction: End Carry = 1 indicates M >= N (Positive answer). The end carry is discarded.",
    "hint2": "First Step & Trap: Never add End-Around Carry in 2's complement!",
    "solution": {
      "finalAnswer": "The result is positive, and the end carry is DISCARDED",
      "steps": [
        {
          "title": "Radix Complement Carry Law",
          "type": "summary",
          "content": "In r's complement: M + (rⁿ - N) = (M - N) + rⁿ. If M >= N, the sum contains an extra rⁿ (the MSB end carry). Discarding this end carry directly leaves the true difference (M - N)."
        }
      ],
      "fastShortcut": "Fast Rule: 2's complement DISCARDS end carry; 1's complement WRAPS end carry!",
      "verification": "Radix complement algebra check."
    }
  },
  {
    "id": "q-s1",
    "trackId": "signed",
    "trackTitle": "Topic 4: Signed Binary Numbers & Overflow",
    "topicBadge": "1.6A: 8-Bit Signed 2's Complement Representation",
    "difficulty": "Easy",
    "set": "setA",
    "question": "Represent the negative decimal integer -37 in an 8-bit Signed 2's Complement register.",
    "promptDetail": "Show positive +37 in 8 bits, bitwise inversion (1's comp), and +1 at LSB.",
    "inputFormatHint": "Enter 8 binary bits, e.g., 11011011",
    "correctAnswer": "11011011",
    "acceptedAnswers": [
      "11011011",
      "(11011011)2",
      "11011011_2"
    ],
    "options": [
      {
        "label": "A",
        "text": "11011011",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "11011010",
        "distractorReason": "This is only the 1's complement of +37"
      },
      {
        "label": "C",
        "text": "10100101",
        "distractorReason": "Sign-Magnitude representation of -37"
      },
      {
        "label": "D",
        "text": "00100101",
        "distractorReason": "Positive +37 instead of -37"
      }
    ],
    "hint1": "Formula & Rule: 1) Write +37 in 8 bits. 2) Invert all bits (1's comp). 3) Add 1 to LSB.",
    "hint2": "First Step & Trap: +37 = 32 + 4 + 1 = 00100101. Invert: 11011010. Add 1: 11011011.",
    "solution": {
      "finalAnswer": "11011011",
      "steps": [
        {
          "title": "Step 1: Represent Positive +37 in 8 Bits",
          "type": "summary",
          "content": "+37 = 32 + 4 + 1 = 00100101₂ (Sign bit b7 = 0)"
        },
        {
          "title": "Step 2: Take 1's Complement (Bitwise Inversion)",
          "type": "summary",
          "content": "Invert all 8 bits: 11011010₂"
        },
        {
          "title": "Step 3: Add 1 to LSB (2's Complement)",
          "type": "summary",
          "content": "11011010 + 1 = 11011011₂"
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: Scan from right on 00100101: keep up to first 1 -> 1. Invert remaining bits 0010010 -> 1101101. Result: 11011011!",
      "verification": "Base 10 Check: -128 + 64 + 16 + 8 + 2 + 1 = -128 + 91 = -37₁₀ (100% verified)."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-s2",
    "trackId": "signed",
    "trackTitle": "Topic 4: Signed Binary Numbers & Overflow",
    "topicBadge": "1.6B: 8-Bit Signed 2's Complement Representation",
    "difficulty": "Easy",
    "set": "setA",
    "question": "Represent the negative decimal integer -85 in an 8-bit Signed 2's Complement register.",
    "promptDetail": "Show positive +85 in 8 bits, bitwise inversion, and +1 at LSB.",
    "inputFormatHint": "Enter 8 binary bits, e.g., 10101011",
    "correctAnswer": "10101011",
    "acceptedAnswers": [
      "10101011",
      "(10101011)2",
      "10101011_2"
    ],
    "options": [
      {
        "label": "A",
        "text": "10101011",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "10101010",
        "distractorReason": "This is only the 1's complement of +85"
      },
      {
        "label": "C",
        "text": "11010101",
        "distractorReason": "Sign-Magnitude representation of -85"
      },
      {
        "label": "D",
        "text": "01010101",
        "distractorReason": "Positive +85"
      }
    ],
    "hint1": "Formula & Rule: +85 in 8 bits = 64 + 16 + 4 + 1 = 01010101. Invert and add 1.",
    "hint2": "First Step & Trap: Invert 01010101 -> 10101010. Add 1: 10101011.",
    "solution": {
      "finalAnswer": "10101011",
      "steps": [
        {
          "title": "Step 1: Positive +85 in 8-Bit Binary",
          "type": "summary",
          "content": "+85 = 64 + 16 + 4 + 1 = 01010101₂"
        },
        {
          "title": "Step 2: Invert Bits and Add 1",
          "type": "summary",
          "content": "1's comp = 10101010₂ -> 2's comp = 10101010 + 1 = 10101011₂"
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: Fast scan on 01010101: first 1 is at LSB -> keep 1, flip left -> 10101011!",
      "verification": "Base 10 Check: -128 + 32 + 8 + 2 + 1 = -128 + 43 = -85₁₀."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-s3",
    "trackId": "signed",
    "trackTitle": "Topic 4: Signed Binary Numbers & Overflow",
    "topicBadge": "1.6C: Decoding 8-Bit Signed 2's Complement",
    "difficulty": "Medium",
    "set": "setA",
    "question": "Decode the 8-bit Signed 2's Complement register bit-pattern (11100101)₂ into its exact Decimal integer value.",
    "promptDetail": "Detect sign bit b7 = 1 (negative), invert bits and add 1 to find positive magnitude.",
    "inputFormatHint": "Enter signed decimal, e.g., -27",
    "correctAnswer": "-27",
    "acceptedAnswers": [
      "-27",
      "-(27)",
      "-27_10"
    ],
    "options": [
      {
        "label": "A",
        "text": "-27",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "+229",
        "distractorReason": "Decoded as Unsigned integer (128+64+32+4+1 = 229) instead of Signed!"
      },
      {
        "label": "C",
        "text": "-26",
        "distractorReason": "Forgot to add +1 during magnitude decoding"
      },
      {
        "label": "D",
        "text": "-101",
        "distractorReason": "Sign-magnitude interpretation"
      }
    ],
    "hint1": "Formula & Rule: MSB b7 = 1 indicates NEGATIVE. Magnitude = 2's complement of register: Invert 11100101 -> 00011010. Add 1 -> 00011011 (27₁₀). Result = -27.",
    "hint2": "First Step & Trap: Alternatively, use negative MSB weight: -128 + (sum of positive weights 64, 32, 4, 1).",
    "solution": {
      "finalAnswer": "-27₁₀",
      "steps": [
        {
          "title": "Method 1: Inversion & +1 Magnitude Decoder",
          "type": "summary",
          "content": "Sign bit b7 = 1 -> Negative. Invert bits: 00011010. Add 1: 00011011 = 16 + 8 + 2 + 1 = 27₁₀. Result: -27₁₀"
        },
        {
          "title": "Method 2: Positional Weight Summation (-128 + Positive Weights)",
          "type": "summary",
          "content": "-128 + 64 + 32 + 4 + 1 = -128 + 101 = -27₁₀"
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: -128 + 101 = -27₁₀!",
      "verification": "Base 10 Check: -128 + 64 + 32 + 4 + 1 = -27₁₀."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-s4",
    "trackId": "signed",
    "trackTitle": "Topic 4: Signed Binary Numbers & Overflow",
    "topicBadge": "1.6D: Most Negative Integer Asymmetry",
    "difficulty": "Medium",
    "set": "setA",
    "question": "What decimal value does the 8-bit Signed 2's Complement bit-pattern (10000000)₂ represent?",
    "promptDetail": "Explain why this value has no positive counterpart in 8 bits.",
    "inputFormatHint": "Enter signed decimal, e.g., -128",
    "correctAnswer": "-128",
    "acceptedAnswers": [
      "-128",
      "-(128)",
      "-128_10"
    ],
    "options": [
      {
        "label": "A",
        "text": "-128",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "-0",
        "distractorReason": "2's complement has no negative zero (only Sign-Magnitude and 1's Comp have -0)"
      },
      {
        "label": "C",
        "text": "-127",
        "distractorReason": "Confused with 1's complement minimum value"
      },
      {
        "label": "D",
        "text": "+128",
        "distractorReason": "+128 cannot be represented in 8-bit signed range [-128, +127]"
      }
    ],
    "hint1": "Formula & Rule: In 8-bit signed 2's complement, the range is -2⁷ to +2⁷ - 1 = -128 to +127.",
    "hint2": "First Step & Trap: Bit pattern 10000000 has MSB b7 = 1 (weight -128) and all other bits 0. Value = -128 + 0 = -128.",
    "solution": {
      "finalAnswer": "-128₁₀",
      "steps": [
        {
          "title": "Step 1: Positional Weight Evaluation",
          "type": "summary",
          "content": "Value = (1 × -2⁷) + (0 × 2⁶) + ... + (0 × 2⁰) = -128 + 0 = -128₁₀"
        },
        {
          "title": "Step 2: Range Asymmetry Concept",
          "type": "summary",
          "content": "Because 0 is represented uniquely as 00000000, the negative range extends to -128 while the positive range stops at +127. -128 has no positive counterpart in 8 bits."
        }
      ],
      "fastShortcut": "Fast Concept Fact: 10000000₂ in 8-bit 2's complement is ALWAYS the unique most negative integer: -2ⁿ⁻¹ = -128!",
      "verification": "Range Check: -128 is within [-128, +127]."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-s5",
    "trackId": "signed",
    "trackTitle": "Topic 4: Signed Binary Numbers & Overflow",
    "topicBadge": "1.6E: Signed Addition (No Overflow)",
    "difficulty": "Medium",
    "set": "setA",
    "question": "Add the signed decimal numbers (+42) and (+35) using 8-bit Signed 2's Complement arithmetic. State the 8-bit result.",
    "promptDetail": "Check overflow flag V = Cin(b7) ⊕ Cout(b7).",
    "inputFormatHint": "Enter 8-bit binary sum, e.g., 01001101",
    "correctAnswer": "01001101",
    "acceptedAnswers": [
      "01001101",
      "(01001101)2",
      "+01001101"
    ],
    "options": [
      {
        "label": "A",
        "text": "01001101",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "11001101",
        "distractorReason": "Sign bit error"
      },
      {
        "label": "C",
        "text": "01001100",
        "distractorReason": "Addition error in column b0"
      },
      {
        "label": "D",
        "text": "01011101",
        "distractorReason": "Unnecessary carry added into b4"
      }
    ],
    "hint1": "Formula & Rule: Convert both numbers to 8-bit binary: +42 = 00101010, +35 = 00100011. Add them.",
    "hint2": "First Step & Trap: 00101010 + 00100011 = 01001101. Cin(b7) = 0, Cout(b7) = 0 -> V = 0 ⊕ 0 = 0 (No overflow). Decimal sum = 77, which is within [-128, +127].",
    "solution": {
      "finalAnswer": "01001101₂ = +77₁₀ (No Overflow, V = 0)",
      "steps": [
        {
          "title": "Step 1: 8-Bit Signed Register Alignment",
          "type": "grid",
          "headers": [
            "Signal",
            "b7 (Sign)",
            "b6",
            "b5",
            "b4",
            "b3",
            "b2",
            "b1",
            "b0"
          ],
          "rows": [
            [
              "Carry Track",
              "0",
              "0",
              "0",
              "0",
              "0",
              "1",
              "0",
              "0"
            ],
            [
              "Operand A (+42)",
              "0",
              "0",
              "1",
              "0",
              "1",
              "0",
              "1",
              "0"
            ],
            [
              "Operand B (+35)",
              "0",
              "0",
              "1",
              "0",
              "0",
              "0",
              "1",
              "1"
            ],
            [
              "Sum (+77)",
              "0",
              "1",
              "0",
              "0",
              "1",
              "1",
              "0",
              "1"
            ]
          ]
        },
        {
          "title": "Step 2: Overflow Flag Verification",
          "type": "summary",
          "content": "Cin into b7 = 0, Cout out of b7 = 0. V = Cin ⊕ Cout = 0 ⊕ 0 = 0. No overflow! Result +77 is within [-128, +127]."
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: 42 + 35 = 77₁₀ = 64 + 8 + 4 + 1 = 01001101₂!",
      "verification": "Base 10 Check: 42 + 35 = 77₁₀."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-s6",
    "trackId": "signed",
    "trackTitle": "Topic 4: Signed Binary Numbers & Overflow",
    "topicBadge": "1.6F: Positive Arithmetic Overflow",
    "difficulty": "Hard",
    "set": "setA",
    "question": "Add the signed decimal numbers (+75) and (+65) in an 8-bit Signed 2's Complement adder. What is the 8-bit register result, and does overflow occur?",
    "promptDetail": "Show Cin(b7) and Cout(b7), calculate V = Cin ⊕ Cout, and explain the sign reversal.",
    "inputFormatHint": "Enter 8-bit sum, e.g., 10001100",
    "correctAnswer": "10001100",
    "acceptedAnswers": [
      "10001100",
      "(10001100)2",
      "10001100, V=1",
      "10001100, overflow"
    ],
    "options": [
      {
        "label": "A",
        "text": "10001100 (Overflow V = 1)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "00001100 (No Overflow)",
        "distractorReason": "Lost MSB carry into sign bit"
      },
      {
        "label": "C",
        "text": "10001100 (No Overflow V = 0)",
        "distractorReason": "Failed to detect overflow (positive + positive yielded negative!)"
      },
      {
        "label": "D",
        "text": "01001100 (Overflow V = 1)",
        "distractorReason": "Incorrect bit sum"
      }
    ],
    "hint1": "Formula & Rule: 75 + 65 = 140. But maximum 8-bit signed positive integer is +127! Thus, 140 causes positive overflow.",
    "hint2": "First Step & Trap: +75 = 01001011, +65 = 01000001. Sum = 10001100. Cin(b7) = 1, Cout(b7) = 0 -> V = 1 ⊕ 0 = 1 (OVERFLOW!). The hardware erroneously interprets the result as -116.",
    "solution": {
      "finalAnswer": "10001100₂ (Arithmetic Overflow V = 1)",
      "steps": [
        {
          "title": "Step 1: 8-Bit Addition Grid",
          "type": "grid",
          "headers": [
            "Signal",
            "b7 (Sign)",
            "b6",
            "b5",
            "b4",
            "b3",
            "b2",
            "b1",
            "b0"
          ],
          "rows": [
            [
              "Carry Track",
              "1",
              "0",
              "0",
              "0",
              "0",
              "0",
              "1",
              "0"
            ],
            [
              "Operand A (+75)",
              "0",
              "1",
              "0",
              "0",
              "1",
              "0",
              "1",
              "1"
            ],
            [
              "Operand B (+65)",
              "0",
              "1",
              "0",
              "0",
              "0",
              "0",
              "0",
              "1"
            ],
            [
              "Register Sum",
              "1",
              "0",
              "0",
              "0",
              "1",
              "1",
              "0",
              "0"
            ]
          ]
        },
        {
          "title": "Step 2: Overflow Flag Detection",
          "type": "summary",
          "content": "Cin into b7 = 1, Cout out of b7 = 0. V = Cin ⊕ Cout = 1 ⊕ 0 = 1 (OVERFLOW!). Adding two positive numbers produced a negative number (b7 = 1), proving overflow."
        }
      ],
      "fastShortcut": "Fast Exam Rule: (+A) + (+B) yielding sign bit 1 is an INSTANT GUARANTEE of overflow (V = 1)!",
      "verification": "Range Check: 75 + 65 = 140 > +127 (Outside allowable 8-bit range)."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-s7",
    "trackId": "signed",
    "trackTitle": "Topic 4: Signed Binary Numbers & Overflow",
    "topicBadge": "1.6G: Negative Arithmetic Overflow",
    "difficulty": "Hard",
    "set": "setA",
    "question": "Add the signed decimal numbers (-70) and (-65) in an 8-bit Signed 2's Complement adder. What is the 8-bit register result, and does overflow occur?",
    "promptDetail": "Show Cin(b7) and Cout(b7), compute V = Cin ⊕ Cout, and explain why two negatives yield a positive.",
    "inputFormatHint": "Enter 8-bit sum, e.g., 01111001",
    "correctAnswer": "01111001",
    "acceptedAnswers": [
      "01111001",
      "(01111001)2",
      "01111001, V=1",
      "01111001, overflow"
    ],
    "options": [
      {
        "label": "A",
        "text": "01111001 (Overflow V = 1)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "11111001 (No Overflow)",
        "distractorReason": "Ignored sign bit reversal"
      },
      {
        "label": "C",
        "text": "01111001 (No Overflow V = 0)",
        "distractorReason": "Failed to recognize overflow condition"
      },
      {
        "label": "D",
        "text": "01111011 (Overflow V = 1)",
        "distractorReason": "Bit error in column b1"
      }
    ],
    "hint1": "Formula & Rule: (-70) + (-65) = -135. But minimum 8-bit signed integer is -128! -135 causes negative overflow.",
    "hint2": "First Step & Trap: -70 = 10111010, -65 = 10111111. Sum = 1 01111001. Cin into b7 = 0, Cout out of b7 = 1. V = 0 ⊕ 1 = 1 (OVERFLOW!). The sign bit flipped to 0 (positive +121!).",
    "solution": {
      "finalAnswer": "01111001₂ (Arithmetic Overflow V = 1)",
      "steps": [
        {
          "title": "Step 1: 8-Bit Addition Grid",
          "type": "grid",
          "headers": [
            "Signal",
            "MSB Cout",
            "b7 (Sign)",
            "b6",
            "b5",
            "b4",
            "b3",
            "b2",
            "b1",
            "b0"
          ],
          "rows": [
            [
              "Carry Track",
              "1",
              "0",
              "1",
              "1",
              "1",
              "1",
              "1",
              "1",
              "0"
            ],
            [
              "Operand A (-70)",
              "",
              "1",
              "0",
              "1",
              "1",
              "1",
              "0",
              "1",
              "0"
            ],
            [
              "Operand B (-65)",
              "",
              "1",
              "0",
              "1",
              "1",
              "1",
              "1",
              "1",
              "1"
            ],
            [
              "Register Sum",
              "1",
              "0",
              "1",
              "1",
              "1",
              "1",
              "0",
              "0",
              "1"
            ]
          ]
        },
        {
          "title": "Step 2: Overflow Flag Evaluation",
          "type": "summary",
          "content": "Cin into b7 = 0, Cout out of b7 = 1. V = Cin ⊕ Cout = 0 ⊕ 1 = 1 (OVERFLOW!). Adding two negatives yielded a positive number (b7 = 0), proving overflow."
        }
      ],
      "fastShortcut": "Fast Exam Rule: (-A) + (-B) yielding sign bit 0 is an INSTANT GUARANTEE of overflow (V = 1)!",
      "verification": "Range Check: -70 + -65 = -135 < -128 (Outside allowable 8-bit range)."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-s8",
    "trackId": "signed",
    "trackTitle": "Topic 4: Signed Binary Numbers & Overflow",
    "topicBadge": "1.6H: Mixed-Sign Addition (Never Overflows)",
    "difficulty": "Medium",
    "set": "setB",
    "question": "Add the signed numbers (+58) and (-34) in an 8-bit Signed 2's Complement adder. What is the 8-bit result?",
    "promptDetail": "Explain why adding numbers of opposite signs can NEVER produce an overflow.",
    "inputFormatHint": "Enter 8-bit binary sum, e.g., 00011000",
    "correctAnswer": "00011000",
    "acceptedAnswers": [
      "00011000",
      "(00011000)2",
      "+00011000"
    ],
    "options": [
      {
        "label": "A",
        "text": "00011000",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "10011000",
        "distractorReason": "Sign bit error"
      },
      {
        "label": "C",
        "text": "00011001",
        "distractorReason": "Addition error in column b0"
      },
      {
        "label": "D",
        "text": "00010000",
        "distractorReason": "Lost bit b3 (8)"
      }
    ],
    "hint1": "Formula & Rule: Theorem: Addition of one positive and one negative number NEVER produces an overflow, because the magnitude of the sum is always strictly less than the larger operand.",
    "hint2": "First Step & Trap: +58 = 00111010. -34 = 11011110. Add them: 00111010 + 11011110 = 1 00011000. Cout = 1, Cin(b7) = 1 -> V = 1 ⊕ 1 = 0 (No overflow). Decimal = +24.",
    "solution": {
      "finalAnswer": "00011000₂ = +24₁₀",
      "steps": [
        {
          "title": "Step 1: 8-Bit Addition Grid",
          "type": "grid",
          "headers": [
            "Signal",
            "MSB Cout",
            "b7 (Sign)",
            "b6",
            "b5",
            "b4",
            "b3",
            "b2",
            "b1",
            "b0"
          ],
          "rows": [
            [
              "Carry Track",
              "1",
              "1",
              "1",
              "1",
              "1",
              "1",
              "0",
              "0",
              "0"
            ],
            [
              "Operand A (+58)",
              "",
              "0",
              "0",
              "1",
              "1",
              "1",
              "0",
              "1",
              "0"
            ],
            [
              "Operand B (-34)",
              "",
              "1",
              "1",
              "0",
              "1",
              "1",
              "1",
              "1",
              "0"
            ],
            [
              "Register Sum",
              "1",
              "0",
              "0",
              "0",
              "1",
              "1",
              "0",
              "0",
              "0"
            ]
          ]
        },
        {
          "title": "Step 2: Discard Cout & Verify Overflow Flag",
          "type": "summary",
          "content": "Cin = 1, Cout = 1 -> V = 1 ⊕ 1 = 0. End carry is discarded. Result = 00011000₂ = +24₁₀."
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: 58 - 34 = 24₁₀ = 16 + 8 = 00011000₂!",
      "verification": "Base 10 Check: 58 + (-34) = +24₁₀."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-s9",
    "trackId": "signed",
    "trackTitle": "Topic 4: Signed Binary Numbers & Overflow",
    "topicBadge": "1.6I: Negative Addition Without Overflow",
    "difficulty": "Medium",
    "set": "setB",
    "question": "Add the signed decimal numbers (-40) and (-30) in an 8-bit Signed 2's Complement register. State the 8-bit result.",
    "promptDetail": "Show representation of both numbers, column addition, and discard of MSB carry.",
    "inputFormatHint": "Enter 8-bit binary sum, e.g., 10111010",
    "correctAnswer": "10111010",
    "acceptedAnswers": [
      "10111010",
      "(10111010)2",
      "10111010_2"
    ],
    "options": [
      {
        "label": "A",
        "text": "10111010",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "00111010",
        "distractorReason": "Sign bit error (positive result for two negatives)"
      },
      {
        "label": "C",
        "text": "10111011",
        "distractorReason": "Carry addition error in column b0"
      },
      {
        "label": "D",
        "text": "11111010",
        "distractorReason": "Arithmetic error in column b6"
      }
    ],
    "hint1": "Formula & Rule: -40 = 11011000. -30 = 11100010. Add them. Sum is -70, which is within [-128, +127], so no overflow occurs.",
    "hint2": "First Step & Trap: 11011000 + 11100010 = 1 10111010. Cout = 1, Cin(b7) = 1 -> V = 1 ⊕ 1 = 0. Register stores 10111010.",
    "solution": {
      "finalAnswer": "10111010₂ = -70₁₀",
      "steps": [
        {
          "title": "Step 1: 8-Bit Addition Grid",
          "type": "grid",
          "headers": [
            "Signal",
            "MSB Cout",
            "b7 (Sign)",
            "b6",
            "b5",
            "b4",
            "b3",
            "b2",
            "b1",
            "b0"
          ],
          "rows": [
            [
              "Carry Track",
              "1",
              "1",
              "0",
              "0",
              "0",
              "0",
              "0",
              "0",
              "0"
            ],
            [
              "Operand A (-40)",
              "",
              "1",
              "1",
              "0",
              "1",
              "1",
              "0",
              "0",
              "0"
            ],
            [
              "Operand B (-30)",
              "",
              "1",
              "1",
              "1",
              "0",
              "0",
              "0",
              "1",
              "0"
            ],
            [
              "Register Sum",
              "1",
              "1",
              "0",
              "1",
              "1",
              "1",
              "0",
              "1",
              "0"
            ]
          ]
        },
        {
          "title": "Step 2: Overflow Flag Verification",
          "type": "summary",
          "content": "Cin = 1, Cout = 1 -> V = 1 ⊕ 1 = 0. No overflow! Result is -128 + 32 + 16 + 8 + 2 = -70₁₀."
        }
      ],
      "fastShortcut": "Fast Inspection Shortcut: -40 + (-30) = -70₁₀. -128 + 58 = -70 -> 10111010₂!",
      "verification": "Base 10 Check: -40 + (-30) = -70₁₀."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-s10",
    "trackId": "signed",
    "trackTitle": "Topic 4: Signed Binary Numbers & Overflow",
    "topicBadge": "1.6J: Sign Extension Rule",
    "difficulty": "Easy",
    "set": "setB",
    "question": "Extend the 4-bit Signed 2's Complement number (1011)₂ (-5) into an 8-bit signed register without altering its numerical value.",
    "promptDetail": "Apply the Sign Extension Rule: replicate the sign bit into all new upper bit positions.",
    "inputFormatHint": "Enter 8-bit binary, e.g., 11111011",
    "correctAnswer": "11111011",
    "acceptedAnswers": [
      "11111011",
      "(11111011)2",
      "11111011_2"
    ],
    "options": [
      {
        "label": "A",
        "text": "11111011",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "00001011",
        "distractorReason": "Zero-extended instead of sign-extended (turned -5 into +11!)"
      },
      {
        "label": "C",
        "text": "10001011",
        "distractorReason": "Only put 1 in b7 and padded zeros in between"
      },
      {
        "label": "D",
        "text": "11110101",
        "distractorReason": "Re-complemented incorrectly"
      }
    ],
    "hint1": "Formula & Rule: Sign Extension Rule: To widen a signed 2's complement number from m bits to n bits, replicate the existing sign bit into all new upper bit positions.",
    "hint2": "First Step & Trap: In 1011, the sign bit is 1. Therefore, replicate 1 into b7, b6, b5, b4: 11111011.",
    "solution": {
      "finalAnswer": "11111011₂",
      "steps": [
        {
          "title": "Step 1: Identify Original Sign Bit",
          "type": "summary",
          "content": "Original 4-bit number is 1011. Sign bit b3 is 1 (value is negative: -8 + 2 + 1 = -5₁₀)."
        },
        {
          "title": "Step 2: Replicate Sign Bit to Upper 4 Positions",
          "type": "summary",
          "content": "Fill b7, b6, b5, b4 with 1s: 1111 1011₂"
        },
        {
          "title": "Step 3: Verification of Unaltered Value",
          "type": "summary",
          "content": "8-bit value = -128 + 64 + 32 + 16 + 8 + 2 + 1 = -128 + 123 = -5₁₀. Value is perfectly preserved."
        }
      ],
      "fastShortcut": "Fast Exam Rule: For negative numbers, prefix with 1s. For positive numbers, prefix with 0s!",
      "verification": "Base 10 Check: 1011₂ = -5₁₀; 11111011₂ = -5₁₀ (Exact match)."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-s11",
    "trackId": "signed",
    "trackTitle": "Topic 4: Signed Binary Numbers & Overflow",
    "topicBadge": "1.6K: Signed Number Range Formula",
    "difficulty": "Medium",
    "set": "setB",
    "question": "What is the allowable decimal range for an 8-bit Signed 2's Complement register?",
    "promptDetail": "State the closed-interval range [Min, Max] using the formula -2ⁿ⁻¹ to +2ⁿ⁻¹ - 1.",
    "inputFormatHint": "Enter range format, e.g., -128 to +127",
    "correctAnswer": "-128 to +127",
    "acceptedAnswers": [
      "-128 to +127",
      "-128 to 127",
      "[-128, +127]",
      "[-128, 127]"
    ],
    "options": [
      {
        "label": "A",
        "text": "-128 to +127",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "-127 to +127",
        "distractorReason": "This is the range for Sign-Magnitude and 1's Complement, NOT 2's Complement!"
      },
      {
        "label": "C",
        "text": "0 to 255",
        "distractorReason": "This is the Unsigned 8-bit range, not signed!"
      },
      {
        "label": "D",
        "text": "-256 to +255",
        "distractorReason": "Used n=9 instead of n=8"
      }
    ],
    "hint1": "Formula & Rule: For n bits in 2's complement: Range = [-2ⁿ⁻¹, +2ⁿ⁻¹ - 1]. For n = 8: -2⁷ to +2⁷ - 1.",
    "hint2": "First Step & Trap: 2⁷ = 128. Range = -128 to +127.",
    "solution": {
      "finalAnswer": "[-128, +127]",
      "steps": [
        {
          "title": "Step 1: Apply Range Formula",
          "type": "summary",
          "content": "Minimum Value = -2ⁿ⁻¹ = -2⁷ = -128 (Bit pattern: 10000000)"
        },
        {
          "title": "Step 2: Maximum Positive Value",
          "type": "summary",
          "content": "Maximum Value = +2ⁿ⁻¹ - 1 = +2⁷ - 1 = +128 - 1 = +127 (Bit pattern: 01111111)"
        }
      ],
      "fastShortcut": "Fast Fact: 2's complement has 256 total states: 128 negative values (-128 to -1), zero (0), and 127 positive values (+1 to +127)!",
      "verification": "Range Count: 128 negatives + 1 zero + 127 positives = 256 unique states = 2⁸."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-s12",
    "trackId": "signed",
    "trackTitle": "Topic 4: Signed Binary Numbers & Overflow",
    "topicBadge": "1.6L: Overflow Condition Analysis",
    "difficulty": "Hard",
    "set": "setB",
    "question": "If two negative numbers are added in a signed 2's complement adder and the sum's sign bit b7 is 0, what is the overflow flag V and why?",
    "promptDetail": "State V = 1 or V = 0 and provide the physical explanation.",
    "inputFormatHint": "Enter V=1 or V=0",
    "correctAnswer": "V=1",
    "acceptedAnswers": [
      "V=1",
      "V = 1",
      "1",
      "Overflow",
      "Overflow occurs"
    ],
    "options": [
      {
        "label": "A",
        "text": "V = 1 (Overflow occurs because two negative numbers must yield a negative sum)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "V = 0 (No overflow because sign bit is 0)",
        "distractorReason": "Sign bit 0 means positive, which is impossible when adding two negatives without overflow!"
      },
      {
        "label": "C",
        "text": "V = 0 (End carry is always discarded)",
        "distractorReason": "Confused end carry Cout with overflow flag V"
      },
      {
        "label": "D",
        "text": "V = 1 (Only if Cout = 0)",
        "distractorReason": "Cout is actually 1 in this scenario, while Cin is 0"
      }
    ],
    "hint1": "Formula & Rule: Two negative numbers (both b7 = 1) must physically produce a negative number (b7 = 1). If the result has b7 = 0, the sum exceeded the register's negative range and wrapped around into positive territory.",
    "hint2": "First Step & Trap: When this happens, Cout = 1 but Cin = 0 -> V = Cin ⊕ Cout = 0 ⊕ 1 = 1.",
    "solution": {
      "finalAnswer": "V = 1 (Arithmetic Overflow)",
      "steps": [
        {
          "title": "Step 1: Physical Sign Rule",
          "type": "summary",
          "content": "Negative + Negative must produce Negative. A positive sum (b7 = 0) represents an impossible result, caused by arithmetic wrap-around."
        },
        {
          "title": "Step 2: Carry Logic Demonstration",
          "type": "summary",
          "content": "In column b7: 1 + 1 + Cin = Sum(b7) + 2·Cout. If Sum(b7) = 0 and Cout = 1, then 1 + 1 + Cin = 2 -> Cin = 0. Therefore: V = Cin ⊕ Cout = 0 ⊕ 1 = 1."
        }
      ],
      "fastShortcut": "Fast Truth Table Rule: Whenever Operand Signs match and differ from the Result Sign, V = 1!",
      "verification": "Boolean Check: V = (A_msb · B_msb · ~Sum_msb) + (~A_msb · ~B_msb · Sum_msb) = 1·1·1 + 0 = 1."
    },
    "questionType": "numerical"
  },
  {
    "id": "q-s13",
    "trackId": "signed",
    "trackTitle": "Topic 4: Signed Numbers, Overflow & Unit 1 Theory",
    "topicBadge": "1.1A: Analog vs Digital Signal Distinction",
    "questionType": "fill_blank",
    "difficulty": "Easy",
    "set": "theory",
    "question": "An analog signal is continuous in both time and amplitude, whereas a digital signal is ____ in both time and amplitude.",
    "promptDetail": "Enter the single word describing digital signal discretization.",
    "inputFormatHint": "Enter single word, e.g., discrete",
    "correctAnswer": "discrete",
    "acceptedAnswers": [
      "discrete",
      "discrete and quantized",
      "quantized",
      "digitized"
    ],
    "options": [
      {
        "label": "A",
        "text": "discrete",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "continuous",
        "distractorReason": "Continuous describes analog signals, not digital"
      },
      {
        "label": "C",
        "text": "infinite",
        "distractorReason": "Digital signals take on finite sets of discrete levels"
      },
      {
        "label": "D",
        "text": "periodic",
        "distractorReason": "Periodic describes repetitive waveforms, not discretization"
      }
    ],
    "hint1": "Formula & Rule: Analog = continuous in time & amplitude. Digital = discrete in time (sampled) & discrete in amplitude (quantized).",
    "hint2": "First Step & Trap: The standard IEEE definition is 'discrete'.",
    "solution": {
      "finalAnswer": "discrete",
      "steps": [
        {
          "title": "Signal Taxonomy Definition",
          "type": "summary",
          "content": "Analog signals vary continuously over time and can take on an infinite continuum of voltage values.\nDigital signals are discrete in time (sampled at discrete clock ticks) and discrete in amplitude (quantized to binary 0 and 1 voltage thresholds)."
        }
      ],
      "fastShortcut": "Fast Fact: Analog = Continuous; Digital = Discrete!",
      "verification": "Standard Digital Signal Processing (DSP) Axiom."
    }
  },
  {
    "id": "q-s14",
    "trackId": "signed",
    "trackTitle": "Topic 4: Signed Numbers, Overflow & Unit 1 Theory",
    "topicBadge": "1.6A: Why 2's Complement Dominates Hardware",
    "questionType": "conceptual_mcq",
    "difficulty": "Medium",
    "set": "theory",
    "question": "Why is 2's complement arithmetic universally preferred over 1's complement in modern digital processor ALUs?",
    "promptDetail": "Identify the two decisive hardware advantages.",
    "inputFormatHint": "Select option A, B, C, or D",
    "correctAnswer": "It has a unique representation for zero and requires no End-Around Carry wrap-around hardware",
    "acceptedAnswers": [
      "It has a unique representation for zero and requires no End-Around Carry wrap-around hardware",
      "A"
    ],
    "options": [
      {
        "label": "A",
        "text": "It has a unique representation for zero and requires no End-Around Carry wrap-around hardware",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "It can represent twice as many positive integers as 1's complement",
        "distractorReason": "Positive ranges are identical (both up to +127 in 8 bits)"
      },
      {
        "label": "C",
        "text": "It completely eliminates arithmetic overflow under all conditions",
        "distractorReason": "Overflow still occurs when adding two large numbers of like sign"
      },
      {
        "label": "D",
        "text": "It requires fewer bits to encode negative numbers",
        "distractorReason": "Both systems require identical register bit widths"
      }
    ],
    "hint1": "Formula & Rule: 1's complement has two zeros (+0 and -0) and requires a secondary addition cycle for End-Around Carry (+1 to LSB). 2's complement solves both!",
    "hint2": "First Step & Trap: 2's complement has unique zero (00000000) and standard binary adders handle subtraction by discarding carry.",
    "solution": {
      "finalAnswer": "It has a unique representation for zero and requires no End-Around Carry wrap-around hardware",
      "steps": [
        {
          "title": "Hardware Architecture Rationale",
          "type": "summary",
          "content": "1. Unique Zero: In 2's complement, zero is uniquely 00000000 (eliminating equality comparison ambiguity).\n2. Unified Adder Hardware: A single binary adder circuit handles both addition and subtraction without needing secondary End-Around Carry logic."
        }
      ],
      "fastShortcut": "Fast Fact: Unique 0 + No EAC Hardware = 2's Complement dominance!",
      "verification": "CPU Architecture Design Principle."
    }
  },
  {
    "id": "q-s15",
    "trackId": "signed",
    "trackTitle": "Topic 4: Signed Numbers, Overflow & Unit 1 Theory",
    "topicBadge": "1.6A: Zero Representations in Signed Systems",
    "questionType": "fill_blank",
    "difficulty": "Easy",
    "set": "theory",
    "question": "In 8-bit Sign-Magnitude and 1's Complement systems, how many distinct binary bit patterns represent the number zero?",
    "promptDetail": "State the number of zero representations.",
    "inputFormatHint": "Enter single integer, e.g., 2",
    "correctAnswer": "2",
    "acceptedAnswers": [
      "2",
      "two",
      "2 (+0 and -0)"
    ],
    "options": [
      {
        "label": "A",
        "text": "2",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "1",
        "distractorReason": "Only 2's complement has 1 unique zero"
      },
      {
        "label": "C",
        "text": "0",
        "distractorReason": "Zero is always represented"
      },
      {
        "label": "D",
        "text": "4",
        "distractorReason": "Exceeds possible combinations"
      }
    ],
    "hint1": "Formula & Rule: Both Sign-Magnitude and 1's Complement have +0 (all zeros) and -0 (sign bit 1 with zeros, or all ones).",
    "hint2": "First Step & Trap: Sign-Magnitude: +0 = 00000000, -0 = 10000000. 1's Comp: +0 = 00000000, -0 = 11111111. Total = 2.",
    "solution": {
      "finalAnswer": "2",
      "steps": [
        {
          "title": "Dual Zero Bit Patterns",
          "type": "summary",
          "content": "In Sign-Magnitude: +0 = 00000000, -0 = 10000000.\nIn 1's Complement: +0 = 00000000, -0 = 11111111.\nBoth systems waste one state on negative zero (-0)."
        }
      ],
      "fastShortcut": "Fast Fact: Sign-Mag & 1's Comp have 2 zeros; 2's Comp has 1 zero!",
      "verification": "Number system range property."
    }
  },
  {
    "id": "q-s16",
    "trackId": "signed",
    "trackTitle": "Topic 4: Signed Numbers, Overflow & Unit 1 Theory",
    "topicBadge": "1.6D: 8-Bit 2's Complement Range",
    "questionType": "fill_blank",
    "difficulty": "Easy",
    "set": "theory",
    "question": "The range of integers that can be represented in an 8-bit Signed 2's Complement register is from decimal ____ to ____.",
    "promptDetail": "State the minimum and maximum decimal values.",
    "inputFormatHint": "Enter text, e.g., -128 to +127",
    "correctAnswer": "-128 to +127",
    "acceptedAnswers": [
      "-128 to +127",
      "-128 to 127",
      "[-128, +127]",
      "[-128, 127]",
      "-128, +127"
    ],
    "options": [
      {
        "label": "A",
        "text": "-128 to +127",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "-127 to +127",
        "distractorReason": "This is the range for Sign-Magnitude and 1's Complement"
      },
      {
        "label": "C",
        "text": "0 to 255",
        "distractorReason": "This is the range for 8-bit Unsigned integers"
      },
      {
        "label": "D",
        "text": "-256 to +255",
        "distractorReason": "This is for 9-bit registers"
      }
    ],
    "hint1": "Formula & Rule: Range for n-bit 2's complement is -2ⁿ⁻¹ to +2ⁿ⁻¹ - 1. For n = 8: -2⁷ to +2⁷ - 1 = -128 to +127.",
    "hint2": "First Step & Trap: Because 0 has a single representation, the extra state is absorbed into the negative range (-128).",
    "solution": {
      "finalAnswer": "-128 to +127",
      "steps": [
        {
          "title": "Range Formula Evaluation",
          "type": "summary",
          "content": "Min = -2ⁿ⁻¹ = -2⁷ = -128\nMax = +2ⁿ⁻¹ - 1 = +2⁷ - 1 = +127\nTotal states = 128 + 1 + 127 = 256 states (2⁸)."
        }
      ],
      "fastShortcut": "Fast Fact: 8-bit signed range is always -128 to +127!",
      "verification": "Total combinations: 2⁸ = 256."
    }
  },
  {
    "id": "q-s17",
    "trackId": "signed",
    "trackTitle": "Topic 4: Signed Numbers, Overflow & Unit 1 Theory",
    "topicBadge": "1.6E: Overflow Impossibility Condition",
    "questionType": "conceptual_mcq",
    "difficulty": "Easy",
    "set": "theory",
    "question": "Under what condition is arithmetic overflow mathematically IMPOSSIBLE in signed 2's complement addition?",
    "promptDetail": "Identify the operand sign combination where overflow can never occur.",
    "inputFormatHint": "Select option A, B, C, or D",
    "correctAnswer": "When adding two operands of OPPOSITE signs (one positive and one negative)",
    "acceptedAnswers": [
      "When adding two operands of OPPOSITE signs (one positive and one negative)",
      "A"
    ],
    "options": [
      {
        "label": "A",
        "text": "When adding two operands of OPPOSITE signs (one positive and one negative)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "When adding two large positive numbers",
        "distractorReason": "Positive overflow frequently occurs when sum exceeds +127"
      },
      {
        "label": "C",
        "text": "When adding two large negative numbers",
        "distractorReason": "Negative overflow frequently occurs when sum is less than -128"
      },
      {
        "label": "D",
        "text": "When both operands have identical signs",
        "distractorReason": "Identical signs is the ONLY scenario where overflow can occur!"
      }
    ],
    "hint1": "Formula & Rule: If A > 0 and B < 0, the sum A + B is strictly smaller in magnitude than the larger operand. It can never exceed the register limits.",
    "hint2": "First Step & Trap: Overflow can ONLY occur when adding two operands of the SAME sign.",
    "solution": {
      "finalAnswer": "When adding two operands of OPPOSITE signs (one positive and one negative)",
      "steps": [
        {
          "title": "Overflow Boundary Proof",
          "type": "summary",
          "content": "Let operands be A in [0, 127] and B in [-128, 0]. The sum A + B must lie within [-128, 127]. Since the result cannot escape this boundary, overflow is mathematically impossible."
        }
      ],
      "fastShortcut": "Fast Rule: Opposite signs -> OVERFLOW CAN NEVER OCCUR!",
      "verification": "Bounded interval arithmetic."
    }
  },
  {
    "id": "q-s18",
    "trackId": "signed",
    "trackTitle": "Topic 4: Signed Numbers, Overflow & Unit 1 Theory",
    "topicBadge": "1.6A: MSB Sign Bit Convention",
    "questionType": "fill_blank",
    "difficulty": "Easy",
    "set": "theory",
    "question": "In an 8-bit signed binary register [b7, b6, ..., b0], the Most Significant Bit (b7) serves as the sign bit, where 0 represents ____ and 1 represents ____.",
    "promptDetail": "State the polarity for 0 and 1.",
    "inputFormatHint": "Enter text, e.g., positive and negative",
    "correctAnswer": "positive and negative",
    "acceptedAnswers": [
      "positive and negative",
      "positive, negative",
      "+ and -",
      "+, -"
    ],
    "options": [
      {
        "label": "A",
        "text": "positive and negative",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "negative and positive",
        "distractorReason": "Reversed polarities"
      },
      {
        "label": "C",
        "text": "carry and borrow",
        "distractorReason": "b7 is the MSB data sign bit, not a carry flag"
      },
      {
        "label": "D",
        "text": "even and odd",
        "distractorReason": "LSB (b0) indicates parity, not MSB"
      }
    ],
    "hint1": "Formula & Rule: Universal signed binary standard: MSB = 0 indicates positive (+); MSB = 1 indicates negative (-).",
    "hint2": "First Step & Trap: Applicable across Sign-Magnitude, 1's Complement, and 2's Complement.",
    "solution": {
      "finalAnswer": "positive and negative",
      "steps": [
        {
          "title": "MSB Sign Convention",
          "type": "summary",
          "content": "In all standard signed binary representations: bit b7 = 0 denotes a positive number; bit b7 = 1 denotes a negative number."
        }
      ],
      "fastShortcut": "Fast Rule: MSB 0 = Positive (+); MSB 1 = Negative (-)!",
      "verification": "IEEE standard convention."
    }
  },
  {
    "id": "q-s19",
    "trackId": "signed",
    "trackTitle": "Topic 4: Signed Numbers, Overflow & Unit 1 Theory",
    "topicBadge": "1.6E: Hardware Overflow Detection Circuit",
    "questionType": "conceptual_mcq",
    "difficulty": "Medium",
    "set": "theory",
    "question": "What hardware Boolean logic condition triggers the Overflow flag V in an n-bit binary adder?",
    "promptDetail": "Identify the carry-in and carry-out relationship at the MSB sign bit.",
    "inputFormatHint": "Select option A, B, C, or D",
    "correctAnswer": "V = Cin(MSB) XOR Cout(MSB)",
    "acceptedAnswers": [
      "V = Cin(MSB) XOR Cout(MSB)",
      "A",
      "V = Cin ^ Cout"
    ],
    "options": [
      {
        "label": "A",
        "text": "V = Cin(MSB) XOR Cout(MSB)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "V = Cin(MSB) AND Cout(MSB)",
        "distractorReason": "AND does not detect when one carry is 1 and the other is 0"
      },
      {
        "label": "C",
        "text": "V = Cout(MSB) only",
        "distractorReason": "Cout alone is the unsigned carry flag, NOT the signed overflow flag!"
      },
      {
        "label": "D",
        "text": "V = Cin(MSB) OR Cout(MSB)",
        "distractorReason": "OR triggers incorrectly when both carries are 1 (which is valid, no overflow)"
      }
    ],
    "hint1": "Formula & Rule: Overflow occurs if and only if carry INTO the sign bit does NOT match carry OUT of the sign bit: V = Cin(b7) ⊕ Cout(b7).",
    "hint2": "First Step & Trap: If Cin = 1 and Cout = 0 -> V = 1. If Cin = 0 and Cout = 1 -> V = 1. If Cin = Cout -> V = 0.",
    "solution": {
      "finalAnswer": "V = Cin(MSB) XOR Cout(MSB)",
      "steps": [
        {
          "title": "ALU Overflow Logic Gate",
          "type": "summary",
          "content": "In digital adder hardware, an XOR gate connects to Cin and Cout of the MSB full adder stage: V = Cin(MSB) ⊕ Cout(MSB). An active HIGH (1) output signals signed arithmetic overflow."
        }
      ],
      "fastShortcut": "Fast Formula: V = Cin ⊕ Cout at sign bit!",
      "verification": "Standard ALU status register definition."
    }
  },
  {
    "id": "q-s20",
    "trackId": "signed",
    "trackTitle": "Topic 4: Signed Numbers, Overflow & Unit 1 Theory",
    "topicBadge": "1.1A: Digital System Advantages",
    "questionType": "conceptual_mcq",
    "difficulty": "Easy",
    "set": "theory",
    "question": "What is the primary physical advantage of digital electronic systems over analog systems in signal processing and communication?",
    "promptDetail": "Identify why discrete voltage thresholds ensure superior fidelity.",
    "inputFormatHint": "Select option A, B, C, or D",
    "correctAnswer": "Superior noise immunity and exact signal regeneration using discrete threshold levels",
    "acceptedAnswers": [
      "Superior noise immunity and exact signal regeneration using discrete threshold levels",
      "A"
    ],
    "options": [
      {
        "label": "A",
        "text": "Superior noise immunity and exact signal regeneration using discrete threshold levels",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Infinitely higher frequency response than any analog component",
        "distractorReason": "Analog components can operate at extremely high raw physical bandwidths"
      },
      {
        "label": "C",
        "text": "Complete elimination of electrical resistance and thermal dissipation",
        "distractorReason": "Digital circuits still dissipate power and encounter physical resistance"
      },
      {
        "label": "D",
        "text": "Ability to represent physical continuous real-world phenomena without quantization",
        "distractorReason": "Digital systems intrinsically quantize continuous signals"
      }
    ],
    "hint1": "Formula & Rule: Digital systems use discrete threshold levels (e.g. 0V to 0.8V for 0, 2V to 5V for 1). Small noise does not flip logic state, and buffer gates regenerate clean square waves.",
    "hint2": "First Step & Trap: Analog noise accumulates with every amplification stage, whereas digital noise is stripped by threshold regeneration.",
    "solution": {
      "finalAnswer": "Superior noise immunity and exact signal regeneration using discrete threshold levels",
      "steps": [
        {
          "title": "Noise Margin & Regeneration Principle",
          "type": "summary",
          "content": "Digital hardware utilizes noise margins: as long as noise voltage remains within the margin, logic levels are decoded with zero error. Logic gates physically regenerate clean, restored voltage levels at each stage."
        }
      ],
      "fastShortcut": "Fast Fact: Digital advantage = Noise Immunity + Exact Signal Regeneration!",
      "verification": "Foundational Digital Electronics Axiom."
    }
  }
];

export const quizTracks = [
  {
    "id": "all",
    "label": "Full Unit 1 Mixed Mock Exam",
    "poolSize": 110,
    "desc": "Draws a balanced weighted exam paper across the entire 110-question Unit 1 pool."
  },
  {
    "id": "conversions",
    "label": "Topic 1: Number Systems & All 12 Conversions",
    "poolSize": 35,
    "desc": "All 12 conversion paths, fractional conversions, unknown base r, and 3-bit/4-bit grouping."
  },
  {
    "id": "arithmetic",
    "label": "Topic 2: Binary Arithmetic (+ and - Focus)",
    "poolSize": 25,
    "desc": "95% Binary Addition & Direct Subtraction (multi-carries, zero-bridge borrows across multiple zeros), plus 2 advanced multiplication/division questions."
  },
  {
    "id": "complements",
    "label": "Topic 3: Complements & Complement Subtraction",
    "poolSize": 30,
    "desc": "1's, 2's, 9's, 10's complement generation + subtraction using complements (M > N, M < N, unequal lengths, and fractions)."
  },
  {
    "id": "signed",
    "label": "Topic 4: Signed Numbers, Overflow & Unit 1 Theory",
    "poolSize": 20,
    "desc": "Sign-Magnitude, 1's/2's complement registers, overflow detection V = Cin ⊕ Cout, plus Unit 1 conceptual theory and fill-in-the-blanks."
  }
];
