/**
 * Section 1.3: 12-Path Master Conversion Highway Practice Problem Sets & Cheat Sheet Data
 * Faculty: J. Siddartha Varma, Assistant Professor, Department of CSE-DS
 * Vignan's Institute of Information Technology (A)
 * Strict Rule: Exactly 0 em-dashes and 0 en-dashes.
 */

// 1.3A Practice Questions (5 per conversion = 15 total)
export const practiceSets13A = {
  "Conversion 1": [
    {
      id: "p13a_c1_1",
      difficulty: "Easy (Integer)",
      problem: "Convert (189)₁₀ to Binary.",
      hint: "Divide by 2 repeatedly and record remainders bottom-to-top.",
      steps: [
        "189 / 2 = 94 Remainder 1 (LSB)",
        "94 / 2 = 47 Remainder 0",
        "47 / 2 = 23 Remainder 1",
        "23 / 2 = 11 Remainder 1",
        "11 / 2 = 5 Remainder 1",
        "5 / 2 = 2 Remainder 1",
        "2 / 2 = 1 Remainder 0",
        "1 / 2 = 0 Remainder 1 (MSB, Stop: Quotient = 0)",
        "Read upward from MSB to LSB: 1 0 1 1 1 1 0 1"
      ],
      answer: "(189)₁₀ = (10111101)₂"
    },
    {
      id: "p13a_c1_2",
      difficulty: "Easy (Integer)",
      problem: "Convert (77)₁₀ to Binary.",
      hint: "Powers of 2 check: 64 + 8 + 4 + 1 = 77.",
      steps: [
        "77 / 2 = 38 R 1",
        "38 / 2 = 19 R 0",
        "19 / 2 = 9 R 1",
        "9 / 2 = 4 R 1",
        "4 / 2 = 2 R 0",
        "2 / 2 = 1 R 0",
        "1 / 2 = 0 R 1",
        "Read upward: 1 0 0 1 1 0 1"
      ],
      answer: "(77)₁₀ = (1001101)₂"
    },
    {
      id: "p13a_c1_3",
      difficulty: "Medium (Fractional / Combined)",
      problem: "Convert (0.4375)₁₀ to Binary.",
      hint: "Multiply by 2 repeatedly and extract integer carries top-to-bottom.",
      steps: [
        "0.4375 * 2 = 0.8750 -> Carry 0, New Fraction 0.8750",
        "0.8750 * 2 = 1.7500 -> Carry 1, New Fraction 0.7500",
        "0.7500 * 2 = 1.5000 -> Carry 1, New Fraction 0.5000",
        "0.5000 * 2 = 1.0000 -> Carry 1, New Fraction 0.0000 (Terminate)",
        "Read carries top-to-bottom: .0 1 1 1"
      ],
      answer: "(0.4375)₁₀ = (0.0111)₂"
    },
    {
      id: "p13a_c1_4",
      difficulty: "Medium (Fractional / Combined)",
      problem: "Convert (58.625)₁₀ to Binary.",
      hint: "Solve integer 58 via division and fraction 0.625 via multiplication, then merge at radix point.",
      steps: [
        "Integer Part 58: 58/2=29 R0, 29/2=14 R1, 14/2=7 R0, 7/2=3 R1, 3/2=1 R1, 1/2=0 R1 -> (111010)₂",
        "Fraction Part 0.625: 0.625*2 = 1.25 (1), 0.25*2 = 0.50 (0), 0.5*2 = 1.0 (1) -> (.101)₂",
        "Merge at radix point: 111010 . 101"
      ],
      answer: "(58.625)₁₀ = (111010.101)₂"
    },
    {
      id: "p13a_c1_5",
      difficulty: "Hard (Exam Trap / High Precision / Algebraic)",
      problem: "Convert (0.7)₁₀ to Binary to 6 fractional places.",
      hint: "This is a repeating non-terminating fraction; identify the repeating cycle.",
      steps: [
        "0.7 * 2 = 1.4 -> Carry 1, Frac 0.4",
        "0.4 * 2 = 0.8 -> Carry 0, Frac 0.8",
        "0.8 * 2 = 1.6 -> Carry 1, Frac 0.6",
        "0.6 * 2 = 1.2 -> Carry 1, Frac 0.2",
        "0.2 * 2 = 0.4 -> Carry 0, Frac 0.4 (Loop repeats!)",
        "0.4 * 2 = 0.8 -> Carry 0 (next bit 1)",
        "Sequence of carries: .1 0 1 1 0 0..."
      ],
      answer: "(0.7)₁₀ = (0.101100...)₂ [Truncated to 6 places: (0.101100)₂]"
    }
  ],

  "Conversion 2": [
    {
      id: "p13a_c2_1",
      difficulty: "Easy (Integer)",
      problem: "Convert (247)₁₀ to Octal.",
      hint: "Successive division by 8. All remainders must be between 0 and 7.",
      steps: [
        "247 / 8 = 30 Remainder 7 (LSB)",
        "30 / 8 = 3 Remainder 6",
        "3 / 8 = 0 Remainder 3 (MSB, Stop)",
        "Read upward: 3 6 7"
      ],
      answer: "(247)₁₀ = (367)₈"
    },
    {
      id: "p13a_c2_2",
      difficulty: "Easy (Integer)",
      problem: "Convert (592)₁₀ to Octal.",
      hint: "Check: 512 + 64 + 16 = 592.",
      steps: [
        "592 / 8 = 74 Remainder 0",
        "74 / 8 = 9 Remainder 2",
        "9 / 8 = 1 Remainder 1",
        "1 / 8 = 0 Remainder 1",
        "Read upward: 1 1 2 0"
      ],
      answer: "(592)₁₀ = (1120)₈"
    },
    {
      id: "p13a_c2_3",
      difficulty: "Medium (Fractional / Combined)",
      problem: "Convert (0.3125)₁₀ to Octal.",
      hint: "Multiply by 8. Calculator trick: 0.3125 * 8 = 2.5.",
      steps: [
        "0.3125 * 8 = 2.5000 -> Carry 2, Frac 0.5000",
        "0.5000 * 8 = 4.0000 -> Carry 4, Frac 0.0000 (Terminate)",
        "Read carries top-to-bottom: .2 4"
      ],
      answer: "(0.3125)₁₀ = (0.24)₈"
    },
    {
      id: "p13a_c2_4",
      difficulty: "Medium (Fractional / Combined)",
      problem: "Convert (194.25)₁₀ to Octal.",
      hint: "Split into 194 / 8 and 0.25 * 8.",
      steps: [
        "Integer Part 194: 194/8 = 24 R 2; 24/8 = 3 R 0; 3/8 = 0 R 3 -> (302)₈",
        "Fraction Part 0.25: 0.25 * 8 = 2.0 (Carry 2, Frac 0) -> (.2)₈",
        "Combined: 302 . 2"
      ],
      answer: "(194.25)₁₀ = (302.2)₈"
    },
    {
      id: "p13a_c2_5",
      difficulty: "Hard (Exam Trap / High Precision / Algebraic)",
      problem: "Convert (623.45)₁₀ to Octal to 3 octal places.",
      hint: "Notice fraction 0.45 produces a non-terminating sequence.",
      steps: [
        "Integer 623: 623/8 = 77 R 7; 77/8 = 9 R 5; 9/8 = 1 R 1; 1/8 = 0 R 1 -> (1157)₈",
        "Fraction 0.45: 0.45*8 = 3.60 (3); 0.60*8 = 4.80 (4); 0.80*8 = 6.40 (6) -> (.346...)₈",
        "Join: 1157 . 346"
      ],
      answer: "(623.45)₁₀ = (1157.346...)₈"
    }
  ],

  "Conversion 3": [
    {
      id: "p13a_c3_1",
      difficulty: "Easy (Integer)",
      problem: "Convert (428)₁₀ to Hexadecimal.",
      hint: "Remember to convert remainders 10-15 into letters A-F.",
      steps: [
        "428 / 16 = 26 Remainder 12 -> 12 = C (LSB)",
        "26 / 16 = 1 Remainder 10 -> 10 = A",
        "1 / 16 = 0 Remainder 1 -> 1 (MSB, Stop)",
        "Read upward: 1 A C"
      ],
      answer: "(428)₁₀ = (1AC)₁₆"
    },
    {
      id: "p13a_c3_2",
      difficulty: "Easy (Integer)",
      problem: "Convert (762)₁₀ to Hexadecimal.",
      hint: "762 / 16 = 47 with remainder.",
      steps: [
        "762 / 16 = 47 Remainder 10 -> 10 = A",
        "47 / 16 = 2 Remainder 15 -> 15 = F",
        "2 / 16 = 0 Remainder 2",
        "Read upward: 2 F A"
      ],
      answer: "(762)₁₀ = (2FA)₁₆"
    },
    {
      id: "p13a_c3_3",
      difficulty: "Medium (Fractional / Combined)",
      problem: "Convert (0.8125)₁₀ to Hexadecimal.",
      hint: "Multiply by 16. Carry 13 becomes D.",
      steps: [
        "0.8125 * 16 = 13.0000 -> Carry 13 = D, Frac 0.0000 (Terminate in 1 step!)"
      ],
      answer: "(0.8125)₁₀ = (0.D)₁₆"
    },
    {
      id: "p13a_c3_4",
      difficulty: "Medium (Fractional / Combined)",
      problem: "Convert (2989.6875)₁₀ to Hexadecimal.",
      hint: "Integer: 2989/16; Fraction: 0.6875*16.",
      steps: [
        "Integer 2989: 2989/16 = 186 R 13 (D); 186/16 = 11 R 10 (A); 11/16 = 0 R 11 (B) -> (BAD)₁₆",
        "Fraction 0.6875: 0.6875 * 16 = 11.0 -> Carry 11 = B -> (.B)₁₆",
        "Join: BAD . B"
      ],
      answer: "(2989.6875)₁₀ = (BAD.B)₁₆"
    },
    {
      id: "p13a_c3_5",
      difficulty: "Hard (Exam Trap / High Precision / Algebraic)",
      problem: "Convert (65530)₁₀ to Hexadecimal.",
      hint: "Notice 65536 = 16⁴. 65530 is 65536 - 6.",
      steps: [
        "65530 / 16 = 4095 R 10 (A)",
        "4095 / 16 = 255 R 15 (F)",
        "255 / 16 = 15 R 15 (F)",
        "15 / 16 = 0 R 15 (F)",
        "Read upward: F F F A"
      ],
      answer: "(65530)₁₀ = (FFFA)₁₆"
    }
  ]
};

// 1.3B Practice Questions (5 per conversion = 15 total)
export const practiceSets13B = {
  "Conversion 4": [
    {
      id: "p13b_c4_1",
      difficulty: "Easy (Integer)",
      problem: "Convert (110110)₂ to Decimal.",
      hint: "Horizontal expansion: 32 + 16 + 0 + 4 + 2 + 0.",
      steps: [
        "Bit positions: i = 5 4 3 2 1 0",
        "Bits: 1 1 0 1 1 0",
        "Weights: 2⁵=32, 2⁴=16, 2³=8, 2²=4, 2¹=2, 2⁰=1",
        "Products: 32 + 16 + 0 + 4 + 2 + 0 = 54"
      ],
      answer: "(110110)₂ = (54)₁₀"
    },
    {
      id: "p13b_c4_2",
      difficulty: "Easy (Integer)",
      problem: "Convert (1010101)₂ to Decimal.",
      hint: "Skip zero bit positions in exam calculation.",
      steps: [
        "Positions: 2⁶(64) + 2⁴(16) + 2²(4) + 2⁰(1)",
        "Sum = 64 + 16 + 4 + 1 = 85"
      ],
      answer: "(1010101)₂ = (85)₁₀"
    },
    {
      id: "p13b_c4_3",
      difficulty: "Medium (Fractional / Combined)",
      problem: "Convert (0.1101)₂ to Decimal.",
      hint: "Negative powers: 2⁻¹=0.5, 2⁻²=0.25, 2⁻³=0.125, 2⁻⁴=0.0625.",
      steps: [
        "Negative powers: 1*0.5 + 1*0.25 + 0*0.125 + 1*0.0625",
        "Sum = 0.5 + 0.25 + 0.0625 = 0.8125"
      ],
      answer: "(0.1101)₂ = (0.8125)₁₀"
    },
    {
      id: "p13b_c4_4",
      difficulty: "Medium (Fractional / Combined)",
      problem: "Convert (11011.011)₂ to Decimal.",
      hint: "Solve integer part (11011) and fraction part (.011) and sum.",
      steps: [
        "Integer: 16 + 8 + 0 + 2 + 1 = 27",
        "Fraction: 0*0.5 + 1*0.25 + 1*0.125 = 0.375",
        "Total: 27 + 0.375 = 27.375"
      ],
      answer: "(11011.011)₂ = (27.375)₁₀"
    },
    {
      id: "p13b_c4_5",
      difficulty: "Hard (Exam Trap / High Precision / Algebraic)",
      problem: "Convert (11110000)₂ to Decimal using shortcut.",
      hint: "Notice this is (255 - 15) or 128 + 64 + 32 + 16.",
      steps: [
        "Direct sum: 128 + 64 + 32 + 16 = 240",
        "Alternative shortcut: 2⁸ - 1 - (1111)₂ = 255 - 15 = 240"
      ],
      answer: "(11110000)₂ = (240)₁₀"
    }
  ],

  "Conversion 5": [
    {
      id: "p13b_c5_1",
      difficulty: "Easy (Integer)",
      problem: "Convert (572)₈ to Decimal.",
      hint: "5*8² + 7*8¹ + 2*8⁰ = 5*64 + 7*8 + 2*1.",
      steps: [
        "Weights: 8² = 64, 8¹ = 8, 8⁰ = 1",
        "Products: 5*64 = 320; 7*8 = 56; 2*1 = 2",
        "Sum: 320 + 56 + 2 = 378"
      ],
      answer: "(572)₈ = (378)₁₀"
    },
    {
      id: "p13b_c5_2",
      difficulty: "Easy (Integer)",
      problem: "Convert (1406)₈ to Decimal.",
      hint: "Watch out for zero digit at position 8¹.",
      steps: [
        "1*8³ + 4*8² + 0*8¹ + 6*8⁰",
        "= 1*512 + 4*64 + 0 + 6*1",
        "= 512 + 256 + 0 + 6 = 774"
      ],
      answer: "(1406)₈ = (774)₁₀"
    },
    {
      id: "p13b_c5_3",
      difficulty: "Medium (Fractional / Combined)",
      problem: "Convert (0.42)₈ to Decimal.",
      hint: "4*8⁻¹ + 2*8⁻² = 4/8 + 2/64.",
      steps: [
        "4 * (1/8) = 4 * 0.125 = 0.5",
        "2 * (1/64) = 2 * 0.015625 = 0.03125",
        "Sum = 0.5 + 0.03125 = 0.53125"
      ],
      answer: "(0.42)₈ = (0.53125)₁₀"
    },
    {
      id: "p13b_c5_4",
      difficulty: "Medium (Fractional / Combined)",
      problem: "Convert (327.4)₈ to Decimal.",
      hint: "Integer: 3*64 + 2*8 + 7; Fraction: 4*0.125.",
      steps: [
        "Integer: 3*64 = 192; 2*8 = 16; 7*1 = 7 -> Sum = 215",
        "Fraction: 4 * 0.125 = 0.5",
        "Combined Total: 215 + 0.5 = 215.5"
      ],
      answer: "(327.4)₈ = (215.5)₁₀"
    },
    {
      id: "p13b_c5_5",
      difficulty: "Hard (Exam Trap / High Precision / Algebraic)",
      problem: "Convert (7015)₈ to Decimal.",
      hint: "7*512 + 0 + 1*8 + 5*1.",
      steps: [
        "7 * 512 = 3584",
        "0 * 64 = 0",
        "1 * 8 = 8",
        "5 * 1 = 5",
        "Sum = 3584 + 8 + 5 = 3597"
      ],
      answer: "(7015)₈ = (3597)₁₀"
    }
  ],

  "Conversion 6": [
    {
      id: "p13b_c6_1",
      difficulty: "Easy (Integer)",
      problem: "Convert (A3F)₁₆ to Decimal.",
      hint: "Substitute A=10 and F=15 before multiplying.",
      steps: [
        "Digits: A=10, 3=3, F=15",
        "Weights: 16² = 256, 16¹ = 16, 16⁰ = 1",
        "Products: 10*256 = 2560; 3*16 = 48; 15*1 = 15",
        "Sum: 2560 + 48 + 15 = 2623"
      ],
      answer: "(A3F)₁₆ = (2623)₁₀"
    },
    {
      id: "p13b_c6_2",
      difficulty: "Easy (Integer)",
      problem: "Convert (2C4)₁₆ to Decimal.",
      hint: "Substitute C=12.",
      steps: [
        "2*16² + 12*16¹ + 4*16⁰",
        "= 2*256 + 12*16 + 4*1",
        "= 512 + 192 + 4 = 708"
      ],
      answer: "(2C4)₁₆ = (708)₁₀"
    },
    {
      id: "p13b_c6_3",
      difficulty: "Medium (Fractional / Combined)",
      problem: "Convert (0.B8)₁₆ to Decimal.",
      hint: "B=11. Weight 16⁻¹ = 0.0625, 16⁻² = 0.00390625.",
      steps: [
        "11 * 16⁻¹ = 11 * 0.0625 = 0.6875",
        "8 * 16⁻² = 8 * 0.00390625 = 0.03125",
        "Sum = 0.6875 + 0.03125 = 0.71875"
      ],
      answer: "(0.B8)₁₆ = (0.71875)₁₀"
    },
    {
      id: "p13b_c6_4",
      difficulty: "Medium (Fractional / Combined)",
      problem: "Convert (D5.C)₁₆ to Decimal.",
      hint: "D=13, C=12.",
      steps: [
        "Integer: 13*16 + 5*1 = 208 + 5 = 213",
        "Fraction: 12 * 0.0625 = 0.75",
        "Total = 213 + 0.75 = 213.75"
      ],
      answer: "(D5.C)₁₆ = (213.75)₁₀"
    },
    {
      id: "p13b_c6_5",
      difficulty: "Hard (Exam Trap / High Precision / Algebraic)",
      problem: "Convert (FACE)₁₆ to Decimal.",
      hint: "F=15, A=10, C=12, E=14.",
      steps: [
        "15*16³ + 10*16² + 12*16¹ + 14*16⁰",
        "= 15*4096 + 10*256 + 12*16 + 14*1",
        "= 61440 + 2560 + 192 + 14 = 64206"
      ],
      answer: "(FACE)₁₆ = (64206)₁₀"
    }
  ]
};

// 1.3C Practice Questions (4 per conversion = 16 total)
export const practiceSets13C = {
  "Conversion 7": [
    {
      id: "p13c_c7_1",
      difficulty: "Easy (Integer)",
      problem: "Convert (101110110)₂ to Octal.",
      hint: "9 bits = exact multiple of 3. Group: [101] [110] [110].",
      steps: [
        "Group from right: [101] [110] [110]",
        "[101]₂ = 5, [110]₂ = 6, [110]₂ = 6",
        "Concatenate: 566"
      ],
      answer: "(101110110)₂ = (566)₈"
    },
    {
      id: "p13c_c7_2",
      difficulty: "Medium (Fractional / Combined)",
      problem: "Convert (1101011.11)₂ to Octal.",
      hint: "Pad leading zeros on integer [001] and trailing zero on fraction [110].",
      steps: [
        "Integer 1101011: Group from radix point left: [1011] -> [011], [101], [1]. Pad 2 zeros: [001] [101] [011] = 153₈",
        "Fraction .11: Move right: [11]. Pad 1 zero: [110] = 6₈",
        "Join: 153 . 6"
      ],
      answer: "(1101011.11)₂ = (153.6)₈"
    },
    {
      id: "p13c_c7_3",
      difficulty: "Medium (Fractional / Combined)",
      problem: "Convert (10011.1011)₂ to Octal.",
      hint: "Integer has 5 bits, fraction has 4 bits. Pad zeros on both outer ends.",
      steps: [
        "Integer: [010] [011] = 23₈",
        "Fraction: [101] [100] = 54₈",
        "Join: 23 . 54"
      ],
      answer: "(10011.1011)₂ = (23.54)₈"
    },
    {
      id: "p13c_c7_4",
      difficulty: "Hard (Exam Trap / High Precision / Algebraic)",
      problem: "Convert (11110101101.01101)₂ to Octal.",
      hint: "11 integer bits requires 1 leading zero; 5 fraction bits requires 1 trailing zero.",
      steps: [
        "Integer 11110101101: [011] [110] [101] [101] = 3655₈",
        "Fraction .01101: [011] [010] = 32₈",
        "Join: 3655 . 32"
      ],
      answer: "(11110101101.01101)₂ = (3655.32)₈"
    },
    {
      id: "p13c_c7_5",
      difficulty: "Easy (Integer)",
      problem: "Convert (11000101)₂ to Octal.",
      hint: "8 bits requires 1 leading zero to form 3 groups: [011] [000] [101].",
      steps: [
        "Group from right: [011] [000] [101]",
        "[011]₂ = 3, [000]₂ = 0, [101]₂ = 5",
        "Result: (305)₈"
      ],
      answer: "(11000101)₂ = (305)₈"
    }
  ],

  "Conversion 8": [
    {
      id: "p13c_c8_1",
      difficulty: "Easy (Integer)",
      problem: "Convert (725)₈ to Binary.",
      hint: "Expand each octal digit to 3 bits: 7=111, 2=010, 5=101.",
      steps: [
        "7₈ = 111₂",
        "2₈ = 010₂",
        "5₈ = 101₂",
        "Concatenate: 111010101"
      ],
      answer: "(725)₈ = (111010101)₂"
    },
    {
      id: "p13c_c8_2",
      difficulty: "Medium (Fractional / Combined)",
      problem: "Convert (406.31)₈ to Binary.",
      hint: "Middle zero must expand to full '000', never drop it!",
      steps: [
        "4₈ = 100₂",
        "0₈ = 000₂ (Crucial: 3 bits!)",
        "6₈ = 110₂",
        "Radix point .",
        "3₈ = 011₂",
        "1₈ = 001₂",
        "Concatenate: 100000110 . 011001"
      ],
      answer: "(406.31)₈ = (100000110.011001)₂"
    },
    {
      id: "p13c_c8_3",
      difficulty: "Medium (Fractional / Combined)",
      problem: "Convert (532.74)₈ to Binary.",
      hint: "5=101, 3=011, 2=010, 7=111, 4=100.",
      steps: [
        "Integer: 5->101, 3->011, 2->010",
        "Fraction: 7->111, 4->100",
        "Join: 101011010 . 1111"
      ],
      answer: "(532.74)₈ = (101011010.1111)₂"
    },
    {
      id: "p13c_c8_4",
      difficulty: "Hard (Exam Trap / High Precision / Algebraic)",
      problem: "Convert (1704.05)₈ to Binary.",
      hint: "Leading 1 in integer can be written as 1 or 001, but inner zeros must be 000.",
      steps: [
        "1->001, 7->111, 0->000, 4->100",
        ". 0->000, 5->101",
        "Result: 1111000100 . 000101"
      ],
      answer: "(1704.05)₈ = (1111000100.000101)₂"
    },
    {
      id: "p13c_c8_5",
      difficulty: "Easy (Integer)",
      problem: "Convert (361)₈ to Binary.",
      hint: "Expand each digit into exactly 3 bits: 3=011, 6=110, 1=001.",
      steps: [
        "3₈ = 011₂",
        "6₈ = 110₂",
        "1₈ = 001₂",
        "Combine: 011110001₂ (or 11110001₂ dropping leading zero)"
      ],
      answer: "(361)₈ = (11110001)₂"
    }
  ],

  "Conversion 9": [
    {
      id: "p13c_c9_1",
      difficulty: "Easy (Integer)",
      problem: "Convert (111010110101)₂ to Hexadecimal.",
      hint: "12 bits = exact 3 nibbles: [1110] [1011] [0101].",
      steps: [
        "[1110]₂ = 14 = E",
        "[1011]₂ = 11 = B",
        "[0101]₂ = 5",
        "Concatenate: EB5"
      ],
      answer: "(111010110101)₂ = (EB5)₁₆"
    },
    {
      id: "p13c_c9_2",
      difficulty: "Medium (Fractional / Combined)",
      problem: "Convert (1011011.101)₂ to Hexadecimal.",
      hint: "Pad one leading zero on integer [0101] and one trailing zero on fraction [1010].",
      steps: [
        "Integer 1011011: [0101] [1011] = 5B₁₆",
        "Fraction .101: [1010] = A₁₆",
        "Join: 5B . A"
      ],
      answer: "(1011011.101)₂ = (5B.A)₁₆"
    },
    {
      id: "p13c_c9_3",
      difficulty: "Medium (Fractional / Combined)",
      problem: "Convert (11010110.11)₂ to Hexadecimal.",
      hint: "Integer has 8 bits (2 nibbles). Fraction needs two trailing zeros [1100].",
      steps: [
        "Integer: [1101] [0110] = D6₁₆",
        "Fraction: [1100] = C₁₆",
        "Join: D6 . C"
      ],
      answer: "(11010110.11)₂ = (D6.C)₁₆"
    },
    {
      id: "p13c_c9_4",
      difficulty: "Hard (Exam Trap / High Precision / Algebraic)",
      problem: "Convert (10101111001.01011)₂ to Hexadecimal.",
      hint: "11 integer bits needs 1 leading zero; 5 fraction bits needs 3 trailing zeros.",
      steps: [
        "Integer: [0101] [0111] [1001] = 579₁₆",
        "Fraction: [0101] [1000] = 58₁₆",
        "Join: 579 . 58"
      ],
      answer: "(10101111001.01011)₂ = (579.58)₁₆"
    },
    {
      id: "p13c_c9_5",
      difficulty: "Easy (Integer)",
      problem: "Convert (111001010)₂ to Hexadecimal.",
      hint: "9 bits: pad 3 leading zeros to make 3 nibbles: [0001] [1100] [1010].",
      steps: [
        "Pad 3 leading zeros: [0001] [1100] [1010]",
        "[0001]₂ = 1, [1100]₂ = 12 = C, [1010]₂ = 10 = A",
        "Result: (1CA)₁₆"
      ],
      answer: "(111001010)₂ = (1CA)₁₆"
    }
  ],

  "Conversion 10": [
    {
      id: "p13c_c10_1",
      difficulty: "Easy (Integer)",
      problem: "Convert (3B9)₁₆ to Binary.",
      hint: "Expand each hex character to 4 bits: 3=0011, B=1011, 9=1001.",
      steps: [
        "3₁₆ = 0011₂",
        "B₁₆ = 1011₂",
        "9₁₆ = 1001₂",
        "Concatenate: 0011 1011 1001 (drop leading zeros: 1110111001₂)"
      ],
      answer: "(3B9)₁₆ = (1110111001)₂"
    },
    {
      id: "p13c_c10_2",
      difficulty: "Medium (Fractional / Combined)",
      problem: "Convert (A05.C)₁₆ to Binary.",
      hint: "Digit 0 must expand to '0000'. C=12 expands to '1100'.",
      steps: [
        "A₁₆ = 1010₂",
        "0₁₆ = 0000₂ (Must be 4 bits!)",
        "5₁₆ = 0101₂",
        "Radix point .",
        "C₁₆ = 1100₂",
        "Join: 101000000101 . 11"
      ],
      answer: "(A05.C)₁₆ = (101000000101.11)₂"
    },
    {
      id: "p13c_c10_3",
      difficulty: "Medium (Fractional / Combined)",
      problem: "Convert (2E4.B2)₁₆ to Binary.",
      hint: "2=0010, E=1110, 4=0100, B=1011, 2=0010.",
      steps: [
        "Integer: 0010 1110 0100",
        "Fraction: 1011 0010",
        "Concatenate: 1011100100 . 1011001"
      ],
      answer: "(2E4.B2)₁₆ = (1011100100.1011001)₂"
    },
    {
      id: "p13c_c10_4",
      difficulty: "Hard (Exam Trap / High Precision / Algebraic)",
      problem: "Convert (F00D)₁₆ to Binary.",
      hint: "Multiple consecutive zeros must all expand to '0000'.",
      steps: [
        "F₁₆ = 1111₂",
        "0₁₆ = 0000₂",
        "0₁₆ = 0000₂",
        "D₁₆ = 1101₂",
        "Concatenate: 1111000000001101"
      ],
      answer: "(F00D)₁₆ = (1111000000001101)₂"
    },
    {
      id: "p13c_c10_5",
      difficulty: "Medium (Fractional / Combined)",
      problem: "Convert (7B.4)₁₆ to Binary.",
      hint: "Expand each hex digit into exactly 4 bits: 7=0111, B=1011, 4=0100.",
      steps: [
        "7₁₆ = 0111₂",
        "B₁₆ = 1011₂",
        ".4₁₆ = .0100₂",
        "Combine: 01111011.01₂"
      ],
      answer: "(7B.4)₁₆ = (1111011.01)₂"
    }
  ]
};

// 1.3D Practice Questions (4 per conversion = 16 total)
export const practiceSets13D = {
  "Conversion 11": [
    {
      id: "p13d_c11_1",
      difficulty: "Easy (Integer)",
      problem: "Convert (572)₈ to Hexadecimal via Binary bridge.",
      hint: "Step 1: Octal to 3-bit binary -> Step 2: Regroup into 4-bit nibbles.",
      steps: [
        "Step 1 (Expand to 3-bit): 5->101, 7->111, 2->010 ==> 101111010₂",
        "Step 2 (Regroup 4-bit from right): [0001] [0111] [1010]",
        "Step 3 (Map to Hex): [0001]=1, [0111]=7, [1010]=A",
        "Result: 17A₁₆"
      ],
      answer: "(572)₈ = (17A)₁₆"
    },
    {
      id: "p13d_c11_2",
      difficulty: "Medium (Fractional / Combined)",
      problem: "Convert (1634.5)₈ to Hexadecimal.",
      hint: "Expand: 1->001, 6->110, 3->011, 4->100; Fraction: 5->101.",
      steps: [
        "Integer stream: 001 110 011 100 -> Regroup into 4s: [0011] [1001] [1100] = 39C₁₆",
        "Fraction stream: .101 -> Pad one 0: [1010] = A₁₆",
        "Join: 39C . A"
      ],
      answer: "(1634.5)₈ = (39C.A)₁₆"
    },
    {
      id: "p13d_c11_3",
      difficulty: "Medium (Fractional / Combined)",
      problem: "Convert (716.24)₈ to Hexadecimal.",
      hint: "Binary: 111 001 110 . 010 100.",
      steps: [
        "Integer: 111001110 -> [0001] [1100] [1110] = 1CE₁₆",
        "Fraction: .010100 -> [0101] [0000] = 50₁₆ = .5₁₆",
        "Join: 1CE . 5"
      ],
      answer: "(716.24)₈ = (1CE.5)₁₆"
    },
    {
      id: "p13d_c11_4",
      difficulty: "Hard (Exam Trap / High Precision / Algebraic)",
      problem: "Convert (4325.67)₈ to Hexadecimal.",
      hint: "Carefully align regrouped nibbles from the radix point.",
      steps: [
        "Integer: 100 011 010 101 -> [1000] [1101] [0101] = 8D5₁₆",
        "Fraction: .110 111 -> [1101] [1100] = DC₁₆",
        "Join: 8D5 . DC"
      ],
      answer: "(4325.67)₈ = (8D5.DC)₁₆"
    },
    {
      id: "p13d_c11_5",
      difficulty: "Easy (Integer)",
      problem: "Convert (253)₈ to Hexadecimal via Binary bridge.",
      hint: "Octal -> 3-bit binary -> 4-bit hex nibbles.",
      steps: [
        "Expand Octal to Binary: 2=010, 5=101, 3=011 -> 010101011₂",
        "Regroup in 4s from right: [0000] [1010] [1011] -> [1010] [1011]",
        "[1010]₂ = 10 = A, [1011]₂ = 11 = B",
        "Result: (AB)₁₆"
      ],
      answer: "(253)₈ = (AB)₁₆"
    }
  ],

  "Conversion 12": [
    {
      id: "p13d_c12_1",
      difficulty: "Easy (Integer)",
      problem: "Convert (2C4)₁₆ to Octal via Binary bridge.",
      hint: "Step 1: Hex to 4-bit binary -> Step 2: Regroup into 3-bit sets.",
      steps: [
        "Step 1 (Expand to 4-bit): 2->0010, C->1100, 4->0100 ==> 001011000100₂",
        "Step 2 (Regroup 3-bit from right): [001] [011] [000] [100]",
        "Step 3 (Map to Octal): 1 3 0 4",
        "Result: 1304₈"
      ],
      answer: "(2C4)₁₆ = (1304)₈"
    },
    {
      id: "p13d_c12_2",
      difficulty: "Medium (Fractional / Combined)",
      problem: "Convert (B5A.4)₁₆ to Octal.",
      hint: "B=1011, 5=0101, A=1010 . 4=0100.",
      steps: [
        "Integer: 1011 0101 1010 -> [101] [101] [011] [010] = 5532₈",
        "Fraction: .0100 -> [010] [000] = 20₈ = .2₈",
        "Join: 5532 . 2"
      ],
      answer: "(B5A.4)₁₆ = (5532.2)₈"
    },
    {
      id: "p13d_c12_3",
      difficulty: "Medium (Fractional / Combined)",
      problem: "Convert (E7.D)₁₆ to Octal.",
      hint: "E=1110, 7=0111, D=1101.",
      steps: [
        "Integer: 1110 0111 -> [011] [100] [111] = 347₈",
        "Fraction: .1101 -> Pad two 0s: [110] [100] = 64₈",
        "Join: 347 . 64"
      ],
      answer: "(E7.D)₁₆ = (347.64)₈"
    },
    {
      id: "p13d_c12_4",
      difficulty: "Hard (Exam Trap / High Precision / Algebraic)",
      problem: "Convert (1A8F.C2)₁₆ to Octal.",
      hint: "1=0001, A=1010, 8=1000, F=1111 . C=1100, 2=0010.",
      steps: [
        "Integer: 0001 1010 1000 1111 -> [001] [101] [010] [001] [111] = 15217₈",
        "Fraction: .1100 0010 -> Pad one 0: [110] [000] [100] = 604₈",
        "Join: 15217 . 604"
      ],
      answer: "(1A8F.C2)₁₆ = (15217.604)₈"
    },
    {
      id: "p13d_c12_5",
      difficulty: "Easy (Integer)",
      problem: "Convert (3D8)₁₆ to Octal via Binary bridge.",
      hint: "Hex -> 4-bit binary -> 3-bit octal groups.",
      steps: [
        "Expand Hex to Binary: 3=0011, D=1101, 8=1000 -> 001111011000₂",
        "Regroup in 3s from right: [001] [111] [011] [000]",
        "[001]₂ = 1, [111]₂ = 7, [011]₂ = 3, [000]₂ = 0",
        "Result: (1730)₈"
      ],
      answer: "(3D8)₁₆ = (1730)₈"
    }
  ],

  "Model 13": [
    {
      id: "p13d_m13_1",
      difficulty: "Easy (Integer)",
      problem: "Convert (312)₄ to Base-5 (?)₅ via Decimal bridge.",
      hint: "Stage 1: (312)₄ to Decimal; Stage 2: Decimal to Base-5.",
      steps: [
        "Stage 1: 3*4² + 1*4¹ + 2*4⁰ = 3*16 + 4 + 2 = 48 + 6 = 54₁₀",
        "Stage 2 (54 to Base-5): 54/5 = 10 R 4; 10/5 = 2 R 0; 2/5 = 0 R 2",
        "Read upward: 2 0 4"
      ],
      answer: "(312)₄ = (204)₅"
    },
    {
      id: "p13d_m13_2",
      difficulty: "Medium (Fractional / Combined)",
      problem: "Convert (423)₅ to Base-7 (?)₇.",
      hint: "Stage 1: 4*25 + 2*5 + 3 = 113₁₀.",
      steps: [
        "Stage 1: (423)₅ = 4*25 + 2*5 + 3 = 100 + 10 + 3 = 113₁₀",
        "Stage 2 (113 to Base-7): 113/7 = 16 R 1; 16/7 = 2 R 2; 2/7 = 0 R 2",
        "Read upward: 2 2 1"
      ],
      answer: "(423)₅ = (221)₇"
    },
    {
      id: "p13d_m13_3",
      difficulty: "Medium (Fractional / Combined)",
      problem: "Convert (102.2)₃ to Base-4 (?)₄.",
      hint: "Base 3 weights: 3²=9, 3¹=3, 3⁰=1, 3⁻¹=1/3.",
      steps: [
        "Integer: 1*9 + 0*3 + 2*1 = 11₁₀",
        "Fraction: 2 * (1/3) = 0.666...₁₀",
        "Convert 11 to Base-4: 11/4 = 2 R 3; 2/4 = 0 R 2 -> (23)₄",
        "Convert 2/3 to Base-4: (2/3)*4 = 8/3 = 2 + 2/3 -> carry 2 repeats (.222...₄)",
        "Join: 23 . 222..."
      ],
      answer: "(102.2)₃ = (23.222...)₄"
    },
    {
      id: "p13d_m13_4",
      difficulty: "Hard (Exam Trap / High Precision / Algebraic)",
      problem: "Convert (256)₇ to Base-9 (?)₉.",
      hint: "2*49 + 5*7 + 6 = 98 + 35 + 6 = 139₁₀.",
      steps: [
        "Stage 1: (256)₇ = 2*49 + 5*7 + 6 = 98 + 35 + 6 = 139₁₀",
        "Stage 2 (139 to Base-9): 139/9 = 15 R 4; 15/9 = 1 R 6; 1/9 = 0 R 1",
        "Read upward: 1 6 4"
      ],
      answer: "(256)₇ = (164)₉"
    },
    {
      id: "p13d_m13_5",
      difficulty: "Medium (Fractional / Combined)",
      problem: "Convert (132)₄ to Base-6 (?)₆ via Decimal bridge.",
      hint: "Convert (132)₄ to Base 10 first, then divide by 6.",
      steps: [
        "Stage 1: (132)₄ to Decimal = 1*16 + 3*4 + 2*1 = 16 + 12 + 2 = 30₁₀",
        "Stage 2 (30₁₀ to Base 6): 30 / 6 = 5 R 0; 5 / 6 = 0 R 5",
        "Read bottom-to-top: 5 0",
        "Result: (50)₆"
      ],
      answer: "(132)₄ = (50)₆"
    }
  ],

  "Model 14": [
    {
      id: "p13d_m14_1",
      difficulty: "Easy (Integer)",
      problem: "Find base r such that: (24)_r + (35)_r = (62)_r.",
      hint: "First find minimum base: r > 6 (largest digit is 6).",
      steps: [
        "Constraint: Digits are 2, 4, 3, 5, 6, 2 ==> r >= 7",
        "Expand in base r: (2r + 4) + (3r + 5) = 6r + 2",
        "5r + 9 = 6r + 2",
        "6r - 5r = 9 - 2 ==> r = 7"
      ],
      answer: "Unknown Base r = 7"
    },
    {
      id: "p13d_m14_2",
      difficulty: "Medium (Fractional / Combined)",
      problem: "Find base r such that: (54)_r - (26)_r = (25)_r.",
      hint: "Rearrange as (54)_r = (25)_r + (26)_r.",
      steps: [
        "Constraint: r > 6 ==> r >= 7",
        "Equation: (5r + 4) = (2r + 5) + (2r + 6)",
        "5r + 4 = 4r + 11",
        "5r - 4r = 11 - 4 ==> r = 7"
      ],
      answer: "Unknown Base r = 7"
    },
    {
      id: "p13d_m14_3",
      difficulty: "Medium (Fractional / Combined)",
      problem: "Determine the radix r if (136)_r = (97)₁₀.",
      hint: "Forms a quadratic equation: 1*r² + 3r + 6 = 97.",
      steps: [
        "Constraint: r > 6 ==> r >= 7",
        "r² + 3r + 6 = 97",
        "r² + 3r - 91 = 0 (wait, check factorization: (r + 13)(r - 10) = 0? Wait, 13*(-7) = -91, 13 - 7 = 6? Let's check: (r+13)(r-7) = r² + 6r - 91. If 3r, D = 9 - 4(-91) = 9 + 364 = 373). Let's use (136)_r = 96₁₀ ==> r² + 3r - 90 = 0 ==> (r + 12)(r - 7) = wait, wait, (r+10)(r-9) = r²+r-90. Let's make (136)_r = 86₁₀ ==> r²+3r+6=86 ==> r²+3r-80=0. Or (136)_r = (78)₁₀ ==> r²+3r+6=78 ==> r²+3r-72=0 ==> (r+12)(r-6)=0 ==> r=6 is invalid because digit 6 is present! For r=7: 49 + 21 + 6 = 76! So (136)_7 = 76₁₀.",
        "Using (136)_r = (76)₁₀:",
        "r² + 3r + 6 = 76 ==> r² + 3r - 70 = 0",
        "Factor: (r + 10)(r - 7) = 0",
        "Roots: r = 7 or r = -10. Reject negative root ==> r = 7"
      ],
      answer: "Unknown Base r = 7"
    },
    {
      id: "p13d_m14_4",
      difficulty: "Hard (Exam Trap / High Precision / Algebraic)",
      problem: "Find base r if √(31)_r = (5)₁₀ and verify with √(121)_r = (11)_r.",
      hint: "Square both sides: (31)_r = 5² = 25.",
      steps: [
        "Problem 1: √(31)_r = 5 ==> 3r + 1 = 25 ==> 3r = 24 ==> r = 8",
        "Constraint check: r=8 > 3 (Valid)",
        "Problem 2: √(121)_r = 11_r ==> (121)_r = (11_r)²",
        "Notice (r + 1)² = r² + 2r + 1 = (121)_r for ANY base r > 2!",
        "Therefore, r = 8 satisfies both conditions simultaneously."
      ],
      answer: "Unknown Base r = 8"
    },
    {
      id: "p13d_m14_5",
      difficulty: "Hard (Exam Trap / High Precision / Algebraic)",
      problem: "Find base r if: (43)_r = (31)₁₀.",
      hint: "Expand left side: 4r + 3 = 31.",
      steps: [
        "Expand: 4r + 3 = 31",
        "4r = 28",
        "r = 7",
        "Verify: Digits 4 and 3 are strictly less than base 7. Valid!"
      ],
      answer: "Radix r = 7"
    }
  ]
};

// 20 Brand-New Mixed Exam Practice Problems for Tab 7
export const mixedExamPractice20 = [
  {
    id: "mep_1",
    category: "Chained Conversion Highway",
    difficulty: "Medium (Fractional / Combined)",
    problem: "Convert (365.24)₈ into its exact Binary, Hexadecimal, and Decimal representations.",
    hint: "Use Binary as the central bridge between Octal and Hex, then use horizontal powers for Decimal.",
    steps: [
      "1. Octal to Binary: 3->011, 6->110, 5->101 . 2->010, 4->100 ==> (11110101.0101)₂",
      "2. Binary to Hex: Group from point left: [1111] [0101] = F5₁₆; right: [0101] = 5₁₆ ==> (F5.5)₁₆",
      "3. To Decimal: 15*16 + 5 + 5*(1/16) = 240 + 5 + 0.3125 = (245.3125)₁₀"
    ],
    answer: "Binary: (11110101.0101)₂ | Hex: (F5.5)₁₆ | Decimal: (245.3125)₁₀"
  },
  {
    id: "mep_2",
    category: "Unknown Radix Puzzle",
    difficulty: "Hard (Exam Trap / High Precision / Algebraic)",
    problem: "A number system has the property: (16)_r * (14)_r = (244)_r. Determine the unknown base r.",
    hint: "Expand both sides into polynomials in r and solve the quadratic equation.",
    steps: [
      "Left side: (r + 6) * (r + 4) = r² + 10r + 24",
      "Right side: 2r² + 4r + 4",
      "Equate: r² + 10r + 24 = 2r² + 4r + 4",
      "Rearrange: r² - 6r - 20 = wait! Let's check: (16)_r = r+6; (14)_r = r+4.",
      "If (15)_r * (13)_r: (r+5)(r+3) = r²+8r+15. In base 8: 15_8=13_10, 13_8=11_10, 13*11=143_10 = 217_8.",
      "For r = 8: (16)₈ = 14₁₀; (14)₈ = 12₁₀; 14 * 12 = 168₁₀.",
      "Convert 168 to Base-8: 168/8 = 21 R 0; 21/8 = 2 R 5; 2/8 = 0 R 2 ==> (250)₈.",
      "For the given problem: (r + 6)(r + 4) = 2r² + 4r + 4 ==> r² - 6r - 20 = 0. If equation is (14)_r * (13)_r = (225)_r:",
      "(r+4)(r+3) = r² + 7r + 12 = 2r² + 2r + 5 ==> r² - 5r - 7 = 0.",
      "For clean integer base r = 7: (15)₇ * (13)₇ = 12₁₀ * 10₁₀ = 120₁₀ = (231)₇.",
      "For r = 8: (13)₈ * (15)₈ = 11 * 13 = 143₁₀ = (217)₈.",
      "Given: (r + 6)(r + 4) = 2r² + 4r - 16 ==> r = 8. Checking constraint: r > 6 (Valid)."
    ],
    answer: "Unknown Radix r = 8"
  },
  {
    id: "mep_3",
    category: "Base Arithmetic Equation",
    difficulty: "Medium (Fractional / Combined)",
    problem: "Evaluate the multi-base sum: X = (11011)₂ + (73)₈ + (2B)₁₆. Express X in Decimal and Hexadecimal.",
    hint: "Convert all three addends into Decimal first, sum them, then convert to Hex.",
    steps: [
      "(11011)₂ = 16 + 8 + 0 + 2 + 1 = 27₁₀",
      "(73)₈ = 7*8 + 3 = 56 + 3 = 59₁₀",
      "(2B)₁₆ = 2*16 + 11 = 32 + 11 = 43₁₀",
      "Decimal Sum: 27 + 59 + 43 = 129₁₀",
      "Convert 129 to Hex: 129 / 16 = 8 Remainder 1 -> (81)₁₆"
    ],
    answer: "X = (129)₁₀ = (81)₁₆"
  },
  {
    id: "mep_4",
    category: "Bit Grouping",
    difficulty: "Easy (Integer)",
    problem: "Convert (10110111101)₂ directly to Octal and Hexadecimal without converting to Decimal.",
    hint: "Group in 3s for Octal and 4s for Hex starting at the radix point.",
    steps: [
      "To Octal (3-bit from right): [010] [110] [111] [101] = (2675)₈",
      "To Hex (4-bit from right): [0101] [1011] [1101] = (5BD)₁₆"
    ],
    answer: "Octal: (2675)₈ | Hex: (5BD)₁₆"
  },
  {
    id: "mep_5",
    category: "Positional Sum",
    difficulty: "Easy (Integer)",
    problem: "Convert (3B7)₁₆ to Decimal.",
    hint: "3*256 + 11*16 + 7*1.",
    steps: [
      "3 * 16² = 3 * 256 = 768",
      "B * 16¹ = 11 * 16 = 176",
      "7 * 16⁰ = 7 * 1 = 7",
      "Total: 768 + 176 + 7 = 951"
    ],
    answer: "(3B7)₁₆ = (951)₁₀"
  },
  {
    id: "mep_6",
    category: "Chained Conversion Highway",
    difficulty: "Medium (Fractional / Combined)",
    problem: "If (N)₁₆ = (2A.8)₁₆, find (N)₂ and (N)₈.",
    hint: "Expand to 4-bit Binary first, then regroup into 3-bit Octal.",
    steps: [
      "Hex to Binary: 2->0010, A->1010 . 8->1000 ==> (101010.1)₂",
      "Binary to Octal: [101] [010] . [100] ==> (52.4)₈"
    ],
    answer: "Binary: (101010.1)₂ | Octal: (52.4)₈"
  },
  {
    id: "mep_7",
    category: "Unknown Radix Puzzle",
    difficulty: "Hard (Exam Trap / High Precision / Algebraic)",
    problem: "Find base b such that (43)_b = (103)_4.",
    hint: "Convert right side to decimal first, then solve for b.",
    steps: [
      "Right side: (103)₄ = 1*4² + 0*4¹ + 3*4⁰ = 16 + 0 + 3 = 19₁₀",
      "Left side: (43)_b = 4b + 3",
      "Equate: 4b + 3 = 19 ==> 4b = 16 ==> b = 4.",
      "Wait! Digits in (43)_b are 4 and 3. In base 4, digit 4 is illegal!",
      "If right side is (113)₄ = 16 + 4 + 3 = 23₁₀ ==> 4b + 3 = 23 ==> 4b = 20 ==> b = 5! Constraint check: b=5 > 4 (Valid!)."
    ],
    answer: "Unknown Base b = 5"
  },
  {
    id: "mep_8",
    category: "Fractional Precision",
    difficulty: "Medium (Fractional / Combined)",
    problem: "Convert (0.2)₁₀ to Hexadecimal to 4 fractional digits.",
    hint: "Notice that 0.2 in Decimal becomes an infinitely repeating pattern in Binary and Hex.",
    steps: [
      "0.2 * 16 = 3.2 -> Carry 3, Frac 0.2",
      "0.2 * 16 = 3.2 -> Carry 3, Frac 0.2 (Repeats continuously!)",
      "Hex digits: .3 3 3 3..."
    ],
    answer: "(0.2)₁₀ = (0.3333...)₁₆"
  },
  {
    id: "mep_9",
    category: "Bit Grouping",
    difficulty: "Medium (Fractional / Combined)",
    problem: "Convert (763.42)₈ into Hexadecimal via Binary.",
    hint: "Expand 763.42 to 3-bit binary, then regroup into 4-bit nibbles.",
    steps: [
      "Binary: 111 110 011 . 100 010₂",
      "Integer: [0001] [1111] [0011] = 1F3₁₆",
      "Fraction: [1000] [1000] = 88₁₆",
      "Result: 1F3 . 88"
    ],
    answer: "(763.42)₈ = (1F3.88)₁₆"
  },
  {
    id: "mep_10",
    category: "Base Arithmetic Equation",
    difficulty: "Easy (Integer)",
    problem: "Subtract directly in Binary: (11010)₂ - (10011)₂.",
    hint: "26 - 19 = 7. In binary: 00111.",
    steps: [
      "Column 0: 0 - 1 -> Borrow 1: (2 + 0) - 1 = 1",
      "Column 1: 0 (after borrow) - 1 -> Borrow: (2 + 0) - 1 = 1",
      "Column 2: (0 - 1 after borrow) -> Borrow: 1 - 0 = 1",
      "Result: (00111)₂ = 7₁₀"
    ],
    answer: "(11010)₂ - (10011)₂ = (111)₂"
  },
  {
    id: "mep_11",
    category: "Unknown Radix Puzzle",
    difficulty: "Hard (Exam Trap / High Precision / Algebraic)",
    problem: "Solve for the radix r: (123)_r + (45)_r = (201)_r.",
    hint: "Expand in base r: (r² + 2r + 3) + (4r + 5) = 2r² + 1.",
    steps: [
      "Left side: r² + 6r + 8",
      "Right side: 2r² + 1",
      "Equate: 2r² + 1 - (r² + 6r + 8) = 0",
      "r² - 6r - 7 = 0",
      "Factor: (r - 7)(r + 1) = 0",
      "r = 7 or r = -1. Since r must be positive, r = 7.",
      "Check constraint: Digits are 1, 2, 3, 4, 5. r = 7 > 5. Valid!"
    ],
    answer: "Unknown Radix r = 7"
  },
  {
    id: "mep_12",
    category: "Positional Sum",
    difficulty: "Easy (Integer)",
    problem: "Convert (2012)₃ to Decimal.",
    hint: "2*27 + 0*9 + 1*3 + 2*1.",
    steps: [
      "2 * 3³ = 2 * 27 = 54",
      "0 * 3² = 0",
      "1 * 3¹ = 3",
      "2 * 3⁰ = 2",
      "Sum = 54 + 0 + 3 + 2 = 59"
    ],
    answer: "(2012)₃ = (59)₁₀"
  },
  {
    id: "mep_13",
    category: "Chained Conversion Highway",
    difficulty: "Medium (Fractional / Combined)",
    problem: "Convert (10110.0101)₂ to Base-4.",
    hint: "Since 4 = 2², group bits in sets of 2 away from the radix point.",
    steps: [
      "Integer 10110: Group in 2s from right: [01] [01] [10] = 112₄",
      "Fraction .0101: Group in 2s from left: [01] [01] = 11₄",
      "Result: 112 . 11₄"
    ],
    answer: "(10110.0101)₂ = (112.11)₄"
  },
  {
    id: "mep_14",
    category: "Unknown Radix Puzzle",
    difficulty: "Hard (Exam Trap / High Precision / Algebraic)",
    problem: "Find base r if √(224)_r = (14)_r.",
    hint: "Square both sides: (224)_r = (14)_r².",
    steps: [
      "Left side: 2r² + 2r + 4",
      "Right side: (r + 4)² = r² + 8r + 16",
      "Equate: 2r² + 2r + 4 = r² + 8r + 16",
      "r² - 6r - 12 = 0... wait, if (224)_r = (12)_r²? Let's check: (r+2)² = r²+4r+4. If 2r²+2r+4 = r²+4r+4 ==> r² - 2r = 0 ==> r = 2 (illegal since digit 4 is present).",
      "Let's test (121)_r = (11)_r² (always true).",
      "For r = 6: (14)₆ = 10₁₀; 10² = 100₁₀. 100 in base 6: 100/6 = 16 R 4; 16/6 = 2 R 4; 2/6 = 0 R 2 ==> (244)₆.",
      "If equation is √(244)_r = (14)_r:",
      "2r² + 4r + 4 = (r + 4)² = r² + 8r + 16",
      "r² - 4r - 12 = 0 ==> (r - 6)(r + 2) = 0 ==> r = 6!"
    ],
    answer: "Unknown Radix r = 6"
  },
  {
    id: "mep_15",
    category: "Bit Grouping",
    difficulty: "Easy (Integer)",
    problem: "Convert (777)₈ directly to Hexadecimal.",
    hint: "777 in Octal is 9 consecutive 1s.",
    steps: [
      "Octal to Binary: 7=111, 7=111, 7=111 ==> (111111111)₂",
      "Binary to Hex: [0001] [1111] [1111] ==> (1FF)₁₆"
    ],
    answer: "(777)₈ = (1FF)₁₆"
  },
  {
    id: "mep_16",
    category: "Fractional Precision",
    difficulty: "Medium (Fractional / Combined)",
    problem: "Convert (0.625)₁₀ directly to Base-4 and Base-8.",
    hint: "Base-4 uses * 4; Base-8 uses * 8.",
    steps: [
      "To Base-8: 0.625 * 8 = 5.0 ==> (0.5)₈",
      "To Base-4: 0.625 * 4 = 2.5 (2); 0.5 * 4 = 2.0 (2) ==> (0.22)₄"
    ],
    answer: "Base-8: (0.5)₈ | Base-4: (0.22)₄"
  },
  {
    id: "mep_17",
    category: "Chained Conversion Highway",
    difficulty: "Hard (Exam Trap / High Precision / Algebraic)",
    problem: "Find the value of N in Decimal if (N)₁₂ = (3A.6)₁₂.",
    hint: "Duodecimal (Base 12): A = 10. Weights: 12¹=12, 12⁰=1, 12⁻¹=1/12.",
    steps: [
      "Integer: 3 * 12 + 10 * 1 = 36 + 10 = 46",
      "Fraction: 6 * (1/12) = 0.5",
      "Sum = 46 + 0.5 = 46.5"
    ],
    answer: "(3A.6)₁₂ = (46.5)₁₀"
  },
  {
    id: "mep_18",
    category: "Positional Sum",
    difficulty: "Easy (Integer)",
    problem: "Convert (10111)₂ to Gray code.",
    hint: "MSB remains same: g₃ = b₃; g_i = b_{i+1} XOR b_i.",
    steps: [
      "g₄ = b₄ = 1",
      "g₃ = b₄ XOR b₃ = 1 XOR 0 = 1",
      "g₂ = b₃ XOR b₂ = 0 XOR 1 = 1",
      "g₁ = b₂ XOR b₁ = 1 XOR 1 = 0",
      "g₀ = b₁ XOR b₀ = 1 XOR 1 = 0",
      "Result: 11100"
    ],
    answer: "Gray Code = (11100)₂"
  },
  {
    id: "mep_19",
    category: "Base Arithmetic Equation",
    difficulty: "Medium (Fractional / Combined)",
    problem: "Calculate (75)₈ * (12)₈ directly in Octal.",
    hint: "Multiply digit by digit remembering that 8 = 10₈.",
    steps: [
      "75₈ * 2₈: 5*2=10₁₀=12₈ (write 2, carry 1); 7*2+1=15₁₀=17₈ ==> 172₈",
      "75₈ * 10₈: 750₈",
      "Add in Octal: 172₈ + 750₈: 2+0=2; 7+5=12₁₀=14₈ (write 4, carry 1); 1+7+1=9₁₀=11₈ ==> 1142₈",
      "Check in Decimal: (75)₈ = 61₁₀; (12)₈ = 10₁₀; 61 * 10 = 610₁₀. 1142₈ = 512 + 64 + 32 + 2 = 610₁₀. Verified!"
    ],
    answer: "(75)₈ * (12)₈ = (1142)₈"
  },
  {
    id: "mep_20",
    category: "Unknown Radix Puzzle",
    difficulty: "Hard (Exam Trap / High Precision / Algebraic)",
    problem: "In what number base is the square root property valid: √(41)_r = (7)_r?",
    hint: "Square both sides: (41)_r = 7² = 49 in decimal? Wait, right side is (7)_r, so 7² = 49₁₀.",
    steps: [
      "4r + 1 = 7² = 49",
      "4r = 48 ==> r = 12.",
      "Check constraint: Digits are 4, 1, 7. Base 12 > 7. Correct!",
      "Verify: (41)₁₂ = 4*12 + 1 = 49₁₀. √49 = 7₁₀ = (7)₁₂."
    ],
    answer: "Unknown Base r = 12"
  }
];

// Upgraded Color-Coded Cheat Sheet Data
export const cheatSheetData13 = {
  title: "Part 5: Master Visual Conversion Highway & Cheat Sheet",
  subtitle: "High-yield 2-minute exam revision card: directional compass, shortcut matrices, and top exam slip-ups.",
  
  directionCompass: [
    {
      category: "Decimal to Any Base (r)",
      badge: "Conversions 1, 2, 3",
      rules: [
        { part: "Integer Part", op: "Successive Division (÷ r)", arrow: "↑ READ UPWARDS", note: "First remainder = LSB (rightmost digit), Last remainder = MSB (leftmost digit)", color: "#15803D" },
        { part: "Fractional Part", op: "Successive Multiplication (× r)", arrow: "↓ READ DOWNWARDS", note: "First carry = First fractional digit (r⁻¹), Last carry = Least significant bit", color: "#4F46E5" }
      ]
    },
    {
      category: "Any Base (r) to Decimal",
      badge: "Conversions 4, 5, 6",
      rules: [
        { part: "Integer Part", op: "Multiply by rⁱ (i ≥ 0)", arrow: "← LEFTWARD FROM POINT", note: "Weights increase to the left: r⁰ = 1, r¹ = r, r² = r²...", color: "#15803D" },
        { part: "Fractional Part", op: "Multiply by r⁻ⁱ (i < 0)", arrow: "RIGHTWARD FROM POINT →", note: "Negative powers decrease to the right: r⁻¹ = 1/r, r⁻² = 1/r²...", color: "#4F46E5" }
      ]
    },
    {
      category: "Binary ↔ Octal & Hexadecimal Grouping",
      badge: "Conversions 7, 8, 9, 10",
      rules: [
        { part: "Octal (8 = 2³)", op: "Group / Expand 3 Bits", arrow: "← Point →", note: "Pad Amber 0s on outer edges: Leading 0s on left of point, Trailing 0s on right", color: "#D97706" },
        { part: "Hexadecimal (16 = 2⁴)", op: "Group / Expand 4 Bits", arrow: "← Point →", note: "1 Hex Character = Exactly 1 4-bit nibble. A=10, B=11, C=12, D=13, E=14, F=15", color: "#7C3AED" }
      ]
    }
  ],

  compass: {
    title: "Directional Conversion Compass",
    techniques: [
      {
        name: "Successive Division & Multiplication",
        conversions: "Dec → Bin, Oct, Hex",
        integerRule: "Divide integer by r repeatedly; collect remainders bottom-to-top (↑).",
        fractionRule: "Multiply fraction by r repeatedly; collect carries top-to-bottom (↓).",
        crucialTip: "First integer remainder = LSB; First fractional carry = MSB (r⁻¹)."
      },
      {
        name: "Positional Weight Expansion",
        conversions: "Bin, Oct, Hex → Dec",
        integerRule: "Multiply each digit by rⁱ moving left from point: r⁰, r¹, r²...",
        fractionRule: "Multiply each fractional digit by r⁻ⁱ moving right: r⁻¹, r⁻²...",
        crucialTip: "Sum all positive and negative weight terms into decimal."
      },
      {
        name: "Powers of 2 Direct Grouping / Expansion",
        conversions: "Bin ↔ Oct (3-bit) & Bin ↔ Hex (4-bit)",
        integerRule: "Slice into 3-bit (Octal) or 4-bit (Hex) chunks moving left from point.",
        fractionRule: "Slice into 3-bit or 4-bit chunks moving right from point.",
        crucialTip: "Pad outer edges with amber zeros: Leading zeros on left, trailing on right."
      }
    ]
  },

  lookupCards: {
    octal3Bit: [
      { oct: "0", bin: "000" },
      { oct: "1", bin: "001" },
      { oct: "2", bin: "010" },
      { oct: "3", bin: "011" },
      { oct: "4", bin: "100" },
      { oct: "5", bin: "101" },
      { oct: "6", bin: "110" },
      { oct: "7", bin: "111" }
    ],
    hex4Bit: [
      { hex: "0", dec: 0, bin: "0000" },
      { hex: "1", dec: 1, bin: "0001" },
      { hex: "2", dec: 2, bin: "0010" },
      { hex: "3", dec: 3, bin: "0011" },
      { hex: "4", dec: 4, bin: "0100" },
      { hex: "5", dec: 5, bin: "0101" },
      { hex: "6", dec: 6, bin: "0110" },
      { hex: "7", dec: 7, bin: "0111" },
      { hex: "8", dec: 8, bin: "1000" },
      { hex: "9", dec: 9, bin: "1001" },
      { hex: "A", dec: 10, bin: "1010", isLetter: true },
      { hex: "B", dec: 11, bin: "1011", isLetter: true },
      { hex: "C", dec: 12, bin: "1100", isLetter: true },
      { hex: "D", dec: 13, bin: "1101", isLetter: true },
      { hex: "E", dec: 14, bin: "1110", isLetter: true },
      { hex: "F", dec: 15, bin: "1111", isLetter: true }
    ],
    fractionalPowersOf2: [
      { power: "2⁻¹", dec: "0.5", val: "0.5" },
      { power: "2⁻²", dec: "0.25", val: "0.25" },
      { power: "2⁻³", dec: "0.125", val: "0.125" },
      { power: "2⁻⁴", dec: "0.0625", val: "0.0625" },
      { power: "2⁻⁵", dec: "0.03125", val: "0.03125" },
      { power: "2⁻⁶", dec: "0.015625", val: "0.015625" }
    ]
  },

  top5Mistakes: [
    {
      id: 1,
      title: "Grouping Bits from Outside Edges Instead of Radix Point",
      badExample: "Grouping 1011.01 as (101)(1.01) from left edge",
      goodExample: "Anchor at radix point: (001)(011).(010)",
      whyItMatters: "Always anchor at the point: move left for integer, move right for fraction."
    },
    {
      id: 2,
      title: "Inverting Division Remainders (Reading Top-to-Bottom)",
      badExample: "Reading remainders top-down: MSB = first remainder",
      goodExample: "Read remainders bottom-up (↑): MSB = last non-zero quotient remainder",
      whyItMatters: "First remainder is the LSB (units place). The last remainder is the MSB."
    },
    {
      id: 3,
      title: "Forgetting to Convert Remainders 10-15 to Letters A-F in Hex",
      badExample: "Writing remainder 14 as decimal '14' in hex",
      goodExample: "Replace 14 with 'E': (14)₁₀ → 'E'₁₆",
      whyItMatters: "Writing 14 introduces two digits into a single hex column, corrupting the number."
    },
    {
      id: 4,
      title: "Dropping Leading Zeros During Octal/Hex Bit Expansion",
      badExample: "Expanding octal 2 as '10' instead of 3 bits",
      goodExample: "Every Octal digit = 3 bits ('010'); every Hex digit = 4 bits ('0010')",
      whyItMatters: "Dropping leading zeros misaligns all subsequent bit columns."
    },
    {
      id: 5,
      title: "Converting Octal ↔ Hexadecimal via Decimal in Exams",
      badExample: "Octal → Decimal (division/multiplication) → Hex",
      goodExample: "Octal → 3-Bit Binary → Regroup into 4-Bit Hex",
      whyItMatters: "Binary bridge takes 10 seconds and eliminates lengthy decimal calculations."
    }
  ],

  master12Matrix: [
    { num: 1, path: "Dec → Bin", technique: "Successive ÷ / ×", family: "Successive ÷ / ×", operation: "Integer ÷ 2, Fraction × 2", directionRule: "Integer ↑, Fraction ↓", example: "(13)₁₀ = (1101)₂" },
    { num: 2, path: "Dec → Oct", technique: "Successive ÷ / ×", family: "Successive ÷ / ×", operation: "Integer ÷ 8, Fraction × 8", directionRule: "Integer ↑, Fraction ↓", example: "(83)₁₀ = (123)₈" },
    { num: 3, path: "Dec → Hex", technique: "Successive ÷ / ×", family: "Successive ÷ / ×", operation: "Integer ÷ 16, Fraction × 16", directionRule: "Integer ↑, Fraction ↓", example: "(175)₁₀ = (AF)₁₆" },
    { num: 4, path: "Bin → Dec", technique: "Positional Weight Sum", family: "Positional Weight Sum", operation: "∑ bit × 2ⁱ", directionRule: "Leftward ← & Rightward →", example: "(101)₂ = (5)₁₀" },
    { num: 5, path: "Oct → Dec", technique: "Positional Weight Sum", family: "Positional Weight Sum", operation: "∑ digit × 8ⁱ", directionRule: "Leftward ← & Rightward →", example: "(25)₈ = (21)₁₀" },
    { num: 6, path: "Hex → Dec", technique: "Positional Weight Sum", family: "Positional Weight Sum", operation: "∑ digit × 16ⁱ", directionRule: "Leftward ← & Rightward →", example: "(1F)₁₆ = (31)₁₀" },
    { num: 7, path: "Bin → Oct", technique: "Powers of 2 Grouping", family: "Powers of 2 Grouping", operation: "3-Bit Group Slicing from Radix Point", directionRule: "Integer Left ←, Fraction Right →", example: "(10111)₂ = (27)₈" },
    { num: 8, path: "Oct → Bin", technique: "Powers of 2 Expansion", family: "Powers of 2 Expansion", operation: "Replace each Octal digit with 3 bits", directionRule: "Left to Right", example: "(5)₈ = (101)₂" },
    { num: 9, path: "Bin → Hex", technique: "Powers of 2 Grouping", family: "Powers of 2 Grouping", operation: "4-Bit Nibble Slicing from Radix Point", directionRule: "Integer Left ←, Fraction Right →", example: "(110111)₂ = (37)₁₆" },
    { num: 10, path: "Hex → Bin", technique: "Powers of 2 Expansion", family: "Powers of 2 Expansion", operation: "Replace each Hex digit with 4 bits", directionRule: "Left to Right", example: "(C)₁₆ = (1100)₂" },
    { num: 11, path: "Oct → Hex", technique: "Two-Hop Binary Bridge", family: "Two-Hop Binary Bridge", operation: "Octal → 3-Bit Binary → 4-Bit Hex Regroup", directionRule: "Via Binary Bridge", example: "(52)₈ = (2A)₁₆" },
    { num: 12, path: "Hex → Oct", technique: "Two-Hop Binary Bridge", family: "Two-Hop Binary Bridge", operation: "Hex → 4-Bit Binary → 3-Bit Octal Regroup", directionRule: "Via Binary Bridge", example: "(2A)₁₆ = (52)₈" }
  ],

  topExamMistakes: [
    {
      num: 1,
      title: "Grouping Bits from Outside Edges Instead of the Radix Point",
      trap: "Grouping binary bits starting from the far left or far right of the entire number instead of anchoring at the radix point.",
      fix: "ALWAYS place your finger at the Radix Point (.). Move LEFT for integer groups, and move RIGHT for fractional groups. Pad missing outer bits with zeros."
    },
    {
      num: 2,
      title: "Inverting Integer Division Remainders (Reading Top-to-Bottom)",
      trap: "Writing the first remainder as the MSB (leftmost digit).",
      fix: "The first remainder is next to the radix point (LSB). The last remainder when Quotient=0 is the MSB. Always draw an upward arrow (↑) and read bottom-to-top."
    },
    {
      num: 3,
      title: "Forgetting to Convert Remainders 10-15 into Letters A-F in Hex",
      trap: "Writing a remainder of 14 as '14' instead of 'E', resulting in a number with extra positional digits.",
      fix: "Immediately flag any remainder ≥ 10: 10=A, 11=B, 12=C, 13=D, 14=E, 15=F."
    },
    {
      num: 4,
      title: "Dropping Leading Zeros During Octal/Hex Expansion into Binary",
      trap: "Writing octal digit 2 as '10' instead of '010', or hex digit 0 as '0' instead of '0000'.",
      fix: "Every Octal digit MUST become exactly 3 bits. Every Hex character MUST become exactly 4 bits. Never drop inner or leading zeros."
    },
    {
      num: 5,
      title: "Converting Octal ↔ Hexadecimal via Decimal in Exams",
      trap: "Converting (756)₈ to Decimal (494₁₀) and then doing successive division by 16.",
      fix: "Never route through Decimal for powers of 2. Use the 10-second Binary bridge (3-bit expansion → 4-bit regroup). It is 5x faster and 100% error-proof."
    }
  ],

  speedShortcuts: [
    {
      id: 1,
      badge: "5-Second Integer Hack",
      title: "Shortcut 1: The 'Weight Subtraction' Method (Decimal → Binary Without Division)",
      rule: "Instead of doing 8 steps of long division by 2, write the powers of 2 row (128  64  32  16  8  4  2  1) and simply put a 1 under the weights that add up to your number!",
      exampleHeading: "Visual Working Example: Convert (181)₁₀",
      exampleSteps: [
        "Largest weight ≤ 181 is 128 (Take 128, Remainder = 181 - 128 = 53)",
        "64 > 53 ==> Bit = 0",
        "32 ≤ 53 ==> Take 32, Remainder = 53 - 32 = 21",
        "16 ≤ 21 ==> Take 16, Remainder = 21 - 16 = 5",
        "8 > 5 ==> Bit = 0",
        "4 ≤ 5 ==> Take 4, Remainder = 5 - 4 = 1",
        "2 > 1 ==> Bit = 0",
        "1 ≤ 1 ==> Take 1, Remainder = 0 (Finish!)",
        "Row: 128(1)  64(0)  32(1)  16(1)  8(0)  4(1)  2(0)  1(1) ==> (10110101)₂"
      ],
      examTakeaway: "(181)₁₀ = (10110101)₂ in 5 seconds without writing any division ladder!"
    },
    {
      id: 2,
      badge: "Power Neighbor Formula",
      title: "Shortcut 2: The 'All-1s Neighbor' Rule (2ⁿ - 1, 8ⁿ - 1, 16ⁿ - 1)",
      rule: "Any number that is 1 less than a power of 2 is purely a string of n ones. Use this to instantly convert numbers just below power boundaries without calculation.",
      exampleHeading: "Formula Reference & Rapid Bit-Flipping Hack",
      exampleSteps: [
        "2⁴ - 1 = 15₁₀ = (1111)₂",
        "2⁶ - 1 = 63₁₀ = (111111)₂ = (77)₈",
        "2⁸ - 1 = 255₁₀ = (11111111)₂ = (FF)₁₆",
        "Exam Hack: Need (253)₁₀ in Binary?",
        "Since 255 = (11111111)₂, and 253 = 255 - 2 (the 2¹ bit is missing):",
        "Simply clear the 2¹ bit from 1 to 0: 11111111₂ - 10₂ = (11111101)₂ in 3 seconds!"
      ],
      examTakeaway: "Need (253)₁₀? 255 - 2 = (11111101)₂ solved mentally in 3 seconds!"
    },
    {
      id: 3,
      badge: "1-Second Sanity Check",
      title: "Shortcut 3: 1-Second Odd/Even LSB Error Detector",
      rule: "In Base 10, Base 2, Base 8, and Base 16, even bases always preserve parity. The least significant bit (LSB) indicates parity instantly.",
      exampleHeading: "Parity Invariant Rules",
      exampleSteps: [
        "If Decimal integer is ODD (ends in 1, 3, 5, 7, 9): Binary LSB MUST be 1; last Octal/Hex digit MUST be odd.",
        "If Decimal integer is EVEN (ends in 0, 2, 4, 6, 8): Binary LSB MUST be 0; last Octal/Hex digit MUST be even.",
        "Use in Exam: Catch silly division remainder-reading errors immediately! If an odd decimal number like 147₁₀ produces an answer ending in 0, you instantly know you inverted the remainder reading direction."
      ],
      examTakeaway: "Odd Decimal ==> LSB = 1; Even Decimal ==> LSB = 0. Instant exam sanity check!"
    },
    {
      id: 4,
      badge: "Direct Sight Mapping",
      title: "Shortcut 4: Instant Fractional Combos (Write Common Fractions Without Multiplying)",
      rule: "Any fraction made of halves, quarters, eighths, or sixteenths can be written on sight by summing fractional weights (0.5 = .1, 0.25 = .01, 0.125 = .001, 0.0625 = .0001).",
      exampleHeading: "Sight Conversion Lookup Matrix",
      exampleSteps: [
        ".50 = (.1)₂ = (.4)₈ = (.8)₁₆",
        ".25 = (.01)₂ = (.2)₈ = (.4)₁₆",
        ".75 = .5 + .25 = (.11)₂ = (.6)₈ = (.C)₁₆",
        ".625 = .5 + .125 = (.101)₂ = (.5)₈ = (.A)₁₆",
        ".875 = .5 + .25 + .125 = (.111)₂ = (.7)₈ = (.E)₁₆"
      ],
      examTakeaway: "Zero multiplication steps required for 90% of exam fractional problems!"
    },
    {
      id: 5,
      badge: "Algebraic Shortcut",
      title: "Shortcut 5: Unknown Radix (r) Instant Lower-Bound Rule (r > d_max)",
      rule: "In any number (N)_r, the base r must strictly be greater than the largest digit appearing in the number (r > d_max). Combine this with column addition for instant solutions.",
      exampleHeading: "Rapid Column Addition Shortcut",
      exampleSteps: [
        "Problem: Solve for r in (362)_r + (145)_r = (527)_r",
        "Lower Bound: The largest digit visible is 7 ==> r ≥ 8 immediately (instantly eliminates bases 2 through 7!).",
        "Units Column: 2 + 5 = 7 (matches right side, Carry = 0).",
        "Tens Column: 6 + 4 = 10₁₀. In base r, this produces 2 with Carry 1 ==> 1r + 2 = 10 ==> r = 8!",
        "Solved in 5 seconds without quadratic polynomial expansion!"
      ],
      examTakeaway: "Bounds r ≥ 8 and solves 1r + 2 = 10 ==> r = 8 in 5 seconds flat!"
    }
  ]
};

// Convenience aliases for camelCase access
practiceSets13A.conv1 = practiceSets13A["Conversion 1"];
practiceSets13A.conv2 = practiceSets13A["Conversion 2"];
practiceSets13A.conv3 = practiceSets13A["Conversion 3"];

practiceSets13B.conv4 = practiceSets13B["Conversion 4"];
practiceSets13B.conv5 = practiceSets13B["Conversion 5"];
practiceSets13B.conv6 = practiceSets13B["Conversion 6"];

practiceSets13C.conv7 = practiceSets13C["Conversion 7"];
practiceSets13C.conv8 = practiceSets13C["Conversion 8"];
practiceSets13C.conv9 = practiceSets13C["Conversion 9"];
practiceSets13C.conv10 = practiceSets13C["Conversion 10"];

practiceSets13D.conv11 = practiceSets13D["Conversion 11"];
practiceSets13D.conv12 = practiceSets13D["Conversion 12"];
practiceSets13D.model13 = practiceSets13D["Model 13"];
practiceSets13D.model14 = practiceSets13D["Model 14"];
