/**
 * Digital Logic Design - Section 1.5: Complements
 * 1's, 2's, 9's and 10's Complements and Complement Subtraction
 * 
 * Strict formatting: ZERO em-dashes and ZERO en-dashes.
 * All problems mathematically verified with Base-10 check.
 */

export const section15Data = {
  id: "1.5",
  number: "1.5",
  title: "Complements (1's, 2's, 9's & 10's Complements)",
  badge: "Hardware Subtraction",
  estimatedReadTime: "25 min read",
  dataScienceConnection: "CPUs and GPUs contain no physical borrow subtractor circuits. Arithmetic Logic Units (ALUs) perform all integer subtraction, tensor backpropagation gradient updates, and pointer offsets using 2's complement adder circuits. When machine learning engines compute W = W - learning_rate * grad, the subtraction is physically executed by inverting the bits and adding 1.",
  overview: "Complements allow digital computers to perform subtraction using simple addition hardware. This section covers diminished radix and radix complement definitions, step-by-step algorithms for Base-10 (9's and 10's) and Base-2 (1's and 2's), end-around carry mechanics, leading-zero equalization padding, and base-10 verification.",
  youtubeResource: {
    title: "1's Complement and 2's Complement and Signed Binary Numbers Explained",
    channel: "ALL ABOUT ELECTRONICS",
    duration: "18:42",
    url: "https://www.youtube.com/watch?v=MuUnffIpX7Y",
    topicsCovered: "Step-by-step complement finding, complement subtraction with M > N and M < N cases, End-Around Carry explained visually."
  },

  // ---------------------------------------------------------------------------
  // TAB 1: OVERVIEW & HARDWARE LOGIC
  // ---------------------------------------------------------------------------
  overviewHardware: {
    heroTitle: "Why Digital Computers Use Complements Instead of Subtractors",
    heroSubtitle: "In early computing, engineers attempted building physical subtractor circuits alongside adder circuits. This duplicated silicon real estate, doubled transistor counts, and increased manufacturing costs. The invention of complement arithmetic eliminated the need for subtractors entirely.",

    hardwareComparison: {
      withoutComplements: {
        title: "Without Complements (Dual Circuit Approach)",
        description: "Requires two entirely separate arithmetic modules: a Dedicated Binary Adder for A + B, and a Dedicated Borrow Subtractor for A - B with complex multi-stage borrow-propagation chains.",
        drawbacks: [
          "Doubles silicon area and transistor budget in the ALU",
          "Borrow-propagation logic is electrically slower than ripple carry",
          "Separate control paths needed for addition versus subtraction"
        ]
      },
      withComplements: {
        title: "With Complements (Unified Single-Adder ALU)",
        description: "Subtraction M - N is mathematically re-cast into Addition M + [Complement of N]. A single Parallel Adder handles both addition and subtraction. Inverting bits through simple NOT gates and setting the initial Carry-in to 1 produces 2's complement subtraction at zero extra hardware cost.",
        advantages: [
          "Single parallel adder handles both Addition and Subtraction",
          "NOT gates (inverters) take minimal silicon area and run with near-zero gate delay",
          "A single Add/Subtract control line flips XOR gates to instantly switch operations"
        ]
      }
    },

    complementFamilies: [
      {
        familyId: "diminished",
        name: "Diminished Radix Complement [(r - 1)'s Complement]",
        baseFormula: "C_{r-1}(N) = (r^n - r^{-m}) - N",
        integerFormula: "C_{r-1}(N) = (r^n - 1) - N   [for pure n-digit integers]",
        parameters: "where r = radix/base, n = number of integer digits, m = number of fractional digits",
        explanation: "Obtained by subtracting every individual digit of N from the maximum digit value (r - 1) allowed in that number base.",
        members: [
          {
            name: "9's Complement (Decimal Base 10, r = 10)",
            rule: "Subtract each digit from 9 (since r - 1 = 10 - 1 = 9).",
            quickExample: "9's complement of 5472 is 9999 - 5472 = 4527."
          },
          {
            name: "1's Complement (Binary Base 2, r = 2)",
            rule: "Invert every single bit: change all 0s to 1s and all 1s to 0s (since r - 1 = 2 - 1 = 1).",
            quickExample: "1's complement of 10110100 is 01001011."
          }
        ]
      },
      {
        familyId: "radix",
        name: "Radix Complement [r's Complement]",
        baseFormula: "C_r(N) = r^n - N",
        relationFormula: "C_r(N) = [(r - 1)'s Complement of N] + 1  (at the LSB position)",
        parameters: "where r = radix/base, n = number of integer digits in N",
        explanation: "Always equal to the diminished radix complement plus 1 added to the least significant position (LSB).",
        members: [
          {
            name: "10's Complement (Decimal Base 10, r = 10)",
            rule: "Take 9's complement, then add 1 to the units digit (LSB).",
            quickExample: "10's complement of 5472 is 4527 + 1 = 4528."
          },
          {
            name: "2's Complement (Binary Base 2, r = 2)",
            rule: "Take 1's complement, then add 1 to the LSB.",
            quickExample: "2's complement of 10110100 is 01001011 + 1 = 01001100."
          }
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // TAB 2: FINDING COMPLEMENTS (1.5A)
  // ---------------------------------------------------------------------------
  findingComplements: {
    // SUB-TAB 1: DECIMAL 9's & 10's COMPLEMENTS
    decimal: {
      title: "Finding 9's and 10's Complements (Decimal Base 10)",
      badge: "Base 10 Radix Rules",
      rules: {
        ninesRule: "To find the 9's complement of any decimal number, subtract every single digit from 9.",
        tensRuleStandard: "Standard Method: Find the 9's complement first, then add 1 to the least significant digit (LSB).",
        tensRuleShortcut: "Fast Exam Shortcut (The 9-9-9-10 Rule): Scanning from Left to Right, subtract each digit from 9, EXCEPT subtract the last non-zero rightmost digit from 10. Keep any trailing zeros unchanged."
      },
      models: [
        {
          id: "model-1a",
          label: "Model 1A: Pure Integer (Standard 4-Digit)",
          inputNumber: "5472",
          base: 10,
          conceptTag: "Standard Integer",
          digits: ["5", "4", "7", "2"],
          ninesRows: [
            { label: "Radix Max (9)", values: ["9", "9", "9", "9"] },
            { label: "Original Number N", values: ["5", "4", "7", "2"] },
            { label: "9's Complement", values: ["4", "5", "2", "7"] }
          ],
          ninesResult: "4527",
          tensSteps: [
            { step: "Step 1: Compute 9's complement", val: "4527" },
            { step: "Step 2: Add 1 to LSB", val: "4527 + 1 = 4528" },
            { step: "Shortcut Check (9-9-9-10 Rule)", val: "(9-5)(9-4)(9-7)(10-2) = 4 5 2 8" }
          ],
          tensResult: "4528",
          verification: {
            method: "Radix Definition Check",
            formula: "10^4 - 5472 = 10000 - 5472 = 4528",
            isCorrect: true
          }
        },
        {
          id: "model-1b",
          label: "Model 1B: Integer Ending with Trailing Zeros (Classic Exam Trap)",
          inputNumber: "24600",
          base: 10,
          conceptTag: "Trailing Zeros Trap",
          digits: ["2", "4", "6", "0", "0"],
          ninesRows: [
            { label: "Radix Max (9)", values: ["9", "9", "9", "9", "9"] },
            { label: "Original Number N", values: ["2", "4", "6", "0", "0"] },
            { label: "9's Complement", values: ["7", "5", "3", "9", "9"] }
          ],
          ninesResult: "75399",
          tensSteps: [
            { step: "Step 1: Compute 9's complement", val: "75399" },
            { step: "Step 2: Add 1 to LSB", val: "75399 + 1 = 75400" },
            { step: "Shortcut Check (9-9-9-10 Rule)", val: "Keep trailing zeros '00'. Subtract first non-zero digit 6 from 10 (10-6=4). Subtract rest from 9: (9-2=7), (9-4=5) -> 75400" }
          ],
          tensResult: "75400",
          verification: {
            method: "Radix Definition Check",
            formula: "10^5 - 24600 = 100000 - 24600 = 75400",
            isCorrect: true
          }
        },
        {
          id: "model-1c",
          label: "Model 1C: Combined Integer and Fraction",
          inputNumber: "384.62",
          base: 10,
          conceptTag: "Fractional Complement",
          digits: ["3", "8", "4", ".", "6", "2"],
          ninesRows: [
            { label: "Radix Max (9)", values: ["9", "9", "9", ".", "9", "9"] },
            { label: "Original Number N", values: ["3", "8", "4", ".", "6", "2"] },
            { label: "9's Complement", values: ["6", "1", "5", ".", "3", "7"] }
          ],
          ninesResult: "615.37",
          tensSteps: [
            { step: "Step 1: Compute 9's complement", val: "615.37" },
            { step: "Step 2: Add 1 at the LSB position (0.01)", val: "615.37 + 0.01 = 615.38" },
            { step: "Shortcut Check (9-9-9-10 Rule)", val: "Subtract last non-zero digit 2 from 10 (10-2=8), subtract all other digits from 9 -> 615.38" }
          ],
          tensResult: "615.38",
          verification: {
            method: "Radix Formula Check",
            formula: "10^3 - 384.62 = 1000 - 384.62 = 615.38",
            isCorrect: true
          }
        },
        {
          id: "model-1d",
          label: "Model 1D: Pure Decimal Fraction (Zero Integer Part)",
          inputNumber: "0.0485",
          base: 10,
          conceptTag: "Pure Decimal Fraction",
          digits: ["0", ".", "0", "4", "8", "5"],
          ninesRows: [
            { label: "Radix Max (0.9999)", values: ["0", ".", "9", "9", "9", "9"] },
            { label: "Original Number N", values: ["0", ".", "0", "4", "8", "5"] },
            { label: "9's Complement", values: ["0", ".", "9", "5", "1", "4"] }
          ],
          ninesResult: "0.9514",
          tensSteps: [
            { step: "Step 1: Compute 9's complement", val: "0.9514" },
            { step: "Step 2: Add 1 to LSB position (0.0001)", val: "0.9514 + 0.0001 = 0.9515" },
            { step: "Shortcut Check (9-9-9-10 Rule)", val: "Subtract rightmost digit 5 from 10 (10-5=5), others from 9 -> 0.9515" }
          ],
          tensResult: "0.9515",
          verification: {
            method: "Radix Formula Check",
            formula: "10^0 - 0.0485 = 1.0000 - 0.0485 = 0.9515",
            isCorrect: true
          }
        }
      ],
      practiceQuestions: [
        {
          id: "p15a-dec-1",
          difficulty: "Easy",
          conceptTag: "Standard Integer",
          question: "Find the 9's and 10's complement of the decimal integer (6328)₁₀.",
          given: "N = 6328",
          solution: {
            ninesStep: "Subtract each digit from 9: (9-6)(9-3)(9-2)(9-8) = 3671.",
            tensStep: "Add 1 to the LSB: 3671 + 1 = 3672. By shortcut: (9-6)(9-3)(9-2)(10-8) = 3672.",
            finalNines: "3671",
            finalTens: "3672",
            verification: "10000 - 6328 = 3672 (Exact Match)"
          }
        },
        {
          id: "p15a-dec-2",
          difficulty: "Medium",
          conceptTag: "Trailing Zeros Trap",
          question: "Find the 9's and 10's complement of the decimal integer (45700)₁₀.",
          given: "N = 45700",
          solution: {
            ninesStep: "Subtract each digit from 9: (9-4)(9-5)(9-7)(9-0)(9-0) = 54299.",
            tensStep: "Add 1 to the LSB: 54299 + 1 = 54300. By shortcut: keep trailing '00', subtract 7 from 10 (10-7=3), remaining from 9 -> 54300.",
            finalNines: "54299",
            finalTens: "54300",
            verification: "100000 - 45700 = 54300 (Exact Match)"
          }
        },
        {
          id: "p15a-dec-3",
          difficulty: "Hard",
          conceptTag: "Fractional Decimal",
          question: "Find the 9's and 10's complement of the mixed decimal number (129.46)₁₀.",
          given: "N = 129.46",
          solution: {
            ninesStep: "Subtract each digit from 9: 999.99 - 129.46 = 870.53.",
            tensStep: "Add 1 at the least significant position (0.01): 870.53 + 0.01 = 870.54.",
            finalNines: "870.53",
            finalTens: "870.54",
            verification: "1000 - 129.46 = 870.54 (Exact Match)"
          }
        }
      ]
    },

    // SUB-TAB 2: BINARY 1's & 2's COMPLEMENTS
    binary: {
      title: "Finding 1's and 2's Complements (Binary Base 2)",
      badge: "Base 2 Logic Rules",
      rules: {
        onesRule: "To find the 1's complement of any binary number, invert every single bit (change 0 to 1 and 1 to 0).",
        twosRuleStandard: "Method A (Standard Definition): Invert all bits to find the 1's complement, then add 1 to the LSB.",
        twosRuleShortcut: "Method B (2-Second Exam Shortcut: 'Keep Up to First 1, Flip the Rest'): Scan the bits from Right to Left (<- from LSB towards MSB). Keep all trailing 0s and the very first 1 completely unchanged. Invert every bit to the left of that first 1."
      },
      models: [
        {
          id: "model-2a",
          label: "Model 2A: 8-Bit Integer with Trailing Zeros",
          inputNumber: "10110100",
          base: 2,
          conceptTag: "8-Bit Trailing Zeros",
          bits: ["1", "0", "1", "1", "0", "1", "0", "0"],
          onesResult: "01001011",
          twosStandard: {
            ones: "01001011",
            addOne: "+ 1",
            sum: "01001100"
          },
          twosShortcut: {
            keptBits: "100",
            keptDescription: "Rightmost trailing zeros and the very first '1' stay UNCHANGED (100)",
            flippedBits: "01001",
            flippedDescription: "All bits to the left of the first '1' (10110) are INVERTED -> 01001",
            combined: "01001100"
          },
          verification: {
            method: "Base-10 Arithmetic Verification",
            originalDec: "180",
            twosDec: "76",
            sumCheck: "180 + 76 = 256 = 2^8 (Exact 8-Bit Match)",
            isCorrect: true
          }
        },
        {
          id: "model-2b",
          label: "Model 2B: Binary Number Ending in 1",
          inputNumber: "1100101",
          base: 2,
          conceptTag: "Odd Binary Integer",
          bits: ["1", "1", "0", "0", "1", "0", "1"],
          onesResult: "0011010",
          twosStandard: {
            ones: "0011010",
            addOne: "+ 1",
            sum: "0011011"
          },
          twosShortcut: {
            keptBits: "1",
            keptDescription: "LSB is already 1, so only the LSB '1' is kept unchanged",
            flippedBits: "001101",
            flippedDescription: "All 6 preceding bits (110010) are INVERTED -> 001101",
            combined: "0011011"
          },
          verification: {
            method: "Base-10 Arithmetic Verification",
            originalDec: "101",
            twosDec: "27",
            sumCheck: "101 + 27 = 128 = 2^7 (Exact 7-Bit Match)",
            isCorrect: true
          }
        },
        {
          id: "model-2c",
          label: "Model 2C: Combined Integer and Fractional Binary Number",
          inputNumber: "1011.0110",
          base: 2,
          conceptTag: "Fractional Binary",
          bits: ["1", "0", "1", "1", ".", "0", "1", "1", "0"],
          onesResult: "0100.1001",
          twosStandard: {
            ones: "0100.1001",
            addOne: "+ 0.0001 (at LSB 2^-4)",
            sum: "0100.1010"
          },
          twosShortcut: {
            keptBits: "10",
            keptDescription: "Trailing fractional zero and first '1' kept unchanged (.10)",
            flippedBits: "0100.10",
            flippedDescription: "All bits to the left are INVERTED -> 0100.10",
            combined: "0100.1010"
          },
          verification: {
            method: "Base-10 Arithmetic Verification",
            originalDec: "11.375",
            twosDec: "4.625",
            sumCheck: "11.375 + 4.625 = 16.0 = 2^4 (Exact Match)",
            isCorrect: true
          }
        },
        {
          id: "model-2d",
          label: "Model 2D: Critical Edge Cases (All 1s and Power-of-2 Single 1)",
          inputNumber: "1111 and 1000",
          base: 2,
          conceptTag: "Boundary Edge Cases",
          bits: ["1", "1", "1", "1"],
          edgeCases: [
            {
              name: "Case A: All 1s Number (1111)₂ = 15₁₀",
              ones: "0000",
              twos: "0000 + 1 = 0001",
              note: "2's complement of (2^n - 1) is always 1 (in binary 000...001)."
            },
            {
              name: "Case B: Power of 2 (Single 1 at MSB) (1000)₂ = 8₁₀",
              ones: "0111",
              twos: "0111 + 1 = 1000",
              note: "The 2's complement of (1000)₂ is identical to itself! In 4-bit signed 2's complement, 1000 represents -8, which has no positive 4-bit counterpart."
            }
          ],
          onesResult: "See Cases",
          twosStandard: { ones: "See Cases", addOne: "", sum: "See Cases" },
          verification: {
            method: "Base-10 Arithmetic Verification",
            originalDec: "15 and 8",
            twosDec: "1 and 8",
            sumCheck: "15 + 1 = 16 (2^4); 8 + 8 = 16 (2^4)",
            isCorrect: true
          }
        }
      ],
      practiceQuestions: [
        {
          id: "p15a-bin-1",
          difficulty: "Easy",
          conceptTag: "Standard Binary",
          question: "Find the 1's and 2's complement of the binary number (11010)₂.",
          given: "N = (11010)₂",
          solution: {
            onesStep: "Invert all bits: 11010 -> 00101.",
            twosStep: "Add 1 to LSB: 00101 + 1 = 00110. By shortcut: keep '10', invert '110' -> '001', combining gives 00110.",
            finalOnes: "00101",
            finalTwos: "00110",
            verification: "Base-10: 26 + 6 = 32 = 2^5 (Exact Match)"
          }
        },
        {
          id: "p15a-bin-2",
          difficulty: "Medium",
          conceptTag: "Multiple Trailing Zeros",
          question: "Find the 1's and 2's complement of the 7-bit binary number (1011000)₂.",
          given: "N = (1011000)₂",
          solution: {
            onesStep: "Invert all bits: 1011000 -> 0100111.",
            twosStep: "Add 1 to LSB: 0100111 + 1 = 0101000. By shortcut: keep trailing '1000', invert preceding '101' to '010' -> 0101000.",
            finalOnes: "0100111",
            finalTwos: "0101000",
            verification: "Base-10: 88 + 40 = 128 = 2^7 (Exact Match)"
          }
        },
        {
          id: "p15a-bin-3",
          difficulty: "Hard",
          conceptTag: "Fractional Binary",
          question: "Find the 1's and 2's complement of the binary fraction (1101.101)₂.",
          given: "N = (1101.101)₂",
          solution: {
            onesStep: "Invert all bits: 1101.101 -> 0010.010.",
            twosStep: "Add 1 to the LSB position (2^-3 = 0.001): 0010.010 + 0.001 = 0010.011.",
            finalOnes: "0010.010",
            finalTwos: "0010.011",
            verification: "Base-10: 13.625 + 2.375 = 16.0 = 2^4 (Exact Match)"
          }
        }
      ]
    }
  },

  // ---------------------------------------------------------------------------
  // TAB 3: 9's & 10's COMPLEMENT SUBTRACTION (1.5B)
  // ---------------------------------------------------------------------------
  decimalSubtraction: {
    heroTitle: "Decimal Subtraction Using 9's and 10's Complements",
    heroSubtitle: "Subtraction M - N is computed by converting N into its complement and adding: S = M + Complement(N). The end carry determines the algebraic sign and final result representation.",

    flowchartSteps: [
      { step: "1", title: "Equalize Digits", desc: "Count digits in M and N. Pad leading zeros (in Amber) to the shorter number so both have the exact same number of digits n." },
      { step: "2", title: "Complement Subtrahend N", desc: "For 9's complement subtraction, find 9's comp of N. For 10's complement subtraction, find 10's comp of N." },
      { step: "3", title: "Add S = M + Comp(N)", desc: "Perform standard decimal addition of M and the complement of N." },
      { step: "4", title: "Examine End-Around Carry", desc: "If Carry = 1: M >= N (Positive result). If Carry = 0: M < N (Negative result)." }
    ],

    // SUB-TAB 1: 9's COMPLEMENT SUBTRACTION
    subtraction9s: {
      ruleBadge: "End-Around Carry +1",
      carryRules: {
        carryOne: {
          title: "When Carry = 1 (M >= N, Result is Positive)",
          action: "An end-around carry is produced out of the MSB. Remove this carry and ADD 1 to the least significant digit (LSB) of the sum. The resulting number is the final positive answer."
        },
        carryZero: {
          title: "When Carry = 0 (M < N, Result is Negative)",
          action: "No carry is generated. The answer is negative. Take the 9's complement of the resulting sum and prefix a minus sign (-) to obtain the true magnitude."
        }
      },
      models: [
        {
          id: "model-3a",
          label: "Model 3A: Case 1 (M > N, Equal Digits) with End-Around Carry",
          conceptTag: "Case 1: M > N (Carry = 1)",
          minuend: "72532",
          subtrahend: "13250",
          paddedM: "72532",
          paddedN: "13250",
          digitsCount: 5,
          ninesCompN: "86749",
          additionGrid: {
            topNumber: "72532",
            bottomNumber: "86749",
            carries: ["1", "0", "0", "0", "0"],
            rawSum: "159281",
            endCarry: "1",
            remainingSum: "59281"
          },
          eacAddition: {
            sum: "59281",
            addCarry: "+ 1",
            finalResult: "+59282"
          },
          finalAnswer: "+59282",
          verification: {
            base10Calculation: "72532 - 13250 = +59282",
            isCorrect: true
          }
        },
        {
          id: "model-3b",
          label: "Model 3B: Case 1 (M > N, Unequal Digits Requiring Leading Zero Padding)",
          conceptTag: "Unequal Digit Padding on N",
          minuend: "8435",
          subtrahend: "627",
          paddedM: "8435",
          paddedN: "0627",
          paddingNote: "N has 3 digits while M has 4 digits. Pad 1 leading zero to N: 627 -> 0627.",
          digitsCount: 4,
          ninesCompN: "9372",
          additionGrid: {
            topNumber: "8435",
            bottomNumber: "9372",
            carries: ["1", "0", "1", "0"],
            rawSum: "17807",
            endCarry: "1",
            remainingSum: "7807"
          },
          eacAddition: {
            sum: "7807",
            addCarry: "+ 1",
            finalResult: "+7808"
          },
          finalAnswer: "+7808",
          verification: {
            base10Calculation: "8435 - 627 = +7808",
            isCorrect: true
          }
        },
        {
          id: "model-3c",
          label: "Model 3C: Case 2 (M < N, No Carry) Producing Negative Result",
          conceptTag: "Case 2: M < N (No Carry)",
          minuend: "13250",
          subtrahend: "72532",
          paddedM: "13250",
          paddedN: "72532",
          digitsCount: 5,
          ninesCompN: "27467",
          additionGrid: {
            topNumber: "13250",
            bottomNumber: "27467",
            carries: ["0", "1", "0", "0", "0"],
            rawSum: "40717",
            endCarry: "0",
            remainingSum: "40717"
          },
          negativeHandling: {
            rule: "No end-carry generated -> Result is NEGATIVE.",
            action: "Take 9's complement of the sum 40717 and add a minus sign.",
            compStep: "99999 - 40717 = 59282",
            finalResult: "-59282"
          },
          finalAnswer: "-59282",
          verification: {
            base10Calculation: "13250 - 72532 = -59282",
            isCorrect: true
          }
        },
        {
          id: "model-3d",
          label: "Model 3D: Fractional Decimal Complement Subtraction",
          conceptTag: "Fractional Complement",
          minuend: "456.75",
          subtrahend: "189.50",
          paddedM: "456.75",
          paddedN: "189.50",
          digitsCount: 5,
          ninesCompN: "810.49",
          additionGrid: {
            topNumber: "456.75",
            bottomNumber: "810.49",
            carries: ["1", "0", "1", "1", "0"],
            rawSum: "1267.24",
            endCarry: "1",
            remainingSum: "267.24"
          },
          eacAddition: {
            sum: "267.24",
            addCarry: "+ 0.01 (at LSB)",
            finalResult: "+267.25"
          },
          finalAnswer: "+267.25",
          verification: {
            base10Calculation: "456.75 - 189.50 = +267.25",
            isCorrect: true
          }
        }
      ],
      practiceQuestions: [
        {
          id: "p15b-9s-1",
          difficulty: "Easy",
          conceptTag: "Case 1: M > N (Carry = 1)",
          question: "Subtract (231)₁₀ from (874)₁₀ using 9's complement.",
          given: "M = 874, N = 231",
          solution: {
            steps: [
              "Step 1: Digits are equal (3 digits each).",
              "Step 2: 9's complement of 231 is 999 - 231 = 768.",
              "Step 3: Add M + Comp(N) = 874 + 768 = 1642.",
              "Step 4: End carry = 1. Add carry to LSB: 642 + 1 = +643."
            ],
            final: "+643",
            verification: "874 - 231 = +643 (Exact Match)"
          }
        },
        {
          id: "p15b-9s-2",
          difficulty: "Medium",
          conceptTag: "Case 2: M < N (No Carry)",
          question: "Perform (526 - 814)₁₀ using 9's complement.",
          given: "M = 526, N = 814",
          solution: {
            steps: [
              "Step 1: Digits are equal (3 digits each).",
              "Step 2: 9's complement of 814 is 999 - 814 = 185.",
              "Step 3: Add M + Comp(N) = 526 + 185 = 711.",
              "Step 4: End carry = 0 (No carry) -> Result is negative.",
              "Step 5: Take 9's complement of sum: 999 - 711 = 288. Prefix minus sign: -288."
            ],
            final: "-288",
            verification: "526 - 814 = -288 (Exact Match)"
          }
        },
        {
          id: "p15b-9s-3",
          difficulty: "Hard",
          conceptTag: "Unequal Digit Padding on N",
          question: "Perform (9354 - 482)₁₀ using 9's complement.",
          given: "M = 9354, N = 482",
          solution: {
            steps: [
              "Step 1: Pad leading zero to N: 482 -> 0482 (both 4 digits).",
              "Step 2: 9's complement of 0482 is 9999 - 0482 = 9517.",
              "Step 3: Add M + Comp(N) = 9354 + 9517 = 18871.",
              "Step 4: End carry = 1. Add carry to LSB: 8871 + 1 = +8872."
            ],
            final: "+8872",
            verification: "9354 - 482 = +8872 (Exact Match)"
          }
        }
      ]
    },

    // SUB-TAB 2: 10's COMPLEMENT SUBTRACTION
    subtraction10s: {
      ruleBadge: "Discard Carry",
      carryRules: {
        carryOne: {
          title: "When Carry = 1 (M >= N, Result is Positive)",
          action: "An end carry is generated out of the MSB. Simply DISCARD the carry. The remaining digits form the final positive answer. No end-around addition needed!"
        },
        carryZero: {
          title: "When Carry = 0 (M < N, Result is Negative)",
          action: "No carry is generated. The answer is negative. Take the 10's complement of the resulting sum and prefix a minus sign (-) to obtain the true magnitude."
        }
      },
      models: [
        {
          id: "model-4a",
          label: "Model 4A: Case 1 (M > N, Equal Digits) with Discard Carry",
          conceptTag: "Case 1: M > N (Discard Carry)",
          minuend: "72532",
          subtrahend: "13250",
          paddedM: "72532",
          paddedN: "13250",
          digitsCount: 5,
          tensCompN: "86750",
          additionGrid: {
            topNumber: "72532",
            bottomNumber: "86750",
            carries: ["1", "0", "0", "0", "0"],
            rawSum: "159282",
            endCarry: "1",
            remainingSum: "59282"
          },
          carryAction: {
            rule: "Carry = 1 out of MSB -> DISCARD CARRY.",
            note: "Remaining 5 digits represent the final positive answer directly.",
            finalResult: "+59282"
          },
          finalAnswer: "+59282",
          verification: {
            base10Calculation: "72532 - 13250 = +59282",
            isCorrect: true
          }
        },
        {
          id: "model-4b",
          label: "Model 4B: Case 1 (M > N, Unequal Digits Requiring Leading Zero Padding)",
          conceptTag: "Unequal Digit Padding on N",
          minuend: "6428",
          subtrahend: "409",
          paddedM: "6428",
          paddedN: "0409",
          paddingNote: "N has 3 digits, M has 4 digits. Pad leading zero to N: 409 -> 0409.",
          digitsCount: 4,
          tensCompN: "9591",
          additionGrid: {
            topNumber: "6428",
            bottomNumber: "9591",
            carries: ["1", "1", "0", "1"],
            rawSum: "16019",
            endCarry: "1",
            remainingSum: "6019"
          },
          carryAction: {
            rule: "Carry = 1 out of MSB -> DISCARD CARRY.",
            note: "Discard the leading 1. Result is positive.",
            finalResult: "+6019"
          },
          finalAnswer: "+6019",
          verification: {
            base10Calculation: "6428 - 409 = +6019",
            isCorrect: true
          }
        },
        {
          id: "model-4c",
          label: "Model 4C: Case 2 (M < N, No Carry) Producing Negative Result",
          conceptTag: "Case 2: M < N (No Carry)",
          minuend: "13250",
          subtrahend: "72532",
          paddedM: "13250",
          paddedN: "72532",
          digitsCount: 5,
          tensCompN: "27468",
          additionGrid: {
            topNumber: "13250",
            bottomNumber: "27468",
            carries: ["0", "1", "0", "0", "0"],
            rawSum: "40718",
            endCarry: "0",
            remainingSum: "40718"
          },
          negativeHandling: {
            rule: "No end-carry generated -> Result is NEGATIVE.",
            action: "Take 10's complement of the sum 40718 and prefix a minus sign.",
            compStep: "100000 - 40718 = 59282 (or 99999 - 40718 + 1 = 59282)",
            finalResult: "-59282"
          },
          finalAnswer: "-59282",
          verification: {
            base10Calculation: "13250 - 72532 = -59282",
            isCorrect: true
          }
        },
        {
          id: "model-4d",
          label: "Model 4D: Case 2 (M < N, Unequal Digits Requiring Padding on M)",
          conceptTag: "Unequal Digit Padding on M",
          minuend: "409",
          subtrahend: "6428",
          paddedM: "0409",
          paddedN: "6428",
          paddingNote: "M has 3 digits, N has 4 digits. Pad leading zero to M: 409 -> 0409.",
          digitsCount: 4,
          tensCompN: "3572",
          additionGrid: {
            topNumber: "0409",
            bottomNumber: "3572",
            carries: ["0", "0", "0", "1"],
            rawSum: "3981",
            endCarry: "0",
            remainingSum: "3981"
          },
          negativeHandling: {
            rule: "No end-carry generated -> Result is NEGATIVE.",
            action: "Take 10's complement of the sum 3981 and prefix minus sign.",
            compStep: "10000 - 3981 = 6019",
            finalResult: "-6019"
          },
          finalAnswer: "-6019",
          verification: {
            base10Calculation: "409 - 6428 = -6019",
            isCorrect: true
          }
        }
      ],
      practiceQuestions: [
        {
          id: "p15b-10s-1",
          difficulty: "Easy",
          conceptTag: "Case 1: M > N (Discard Carry)",
          question: "Subtract (1240)₁₀ from (7532)₁₀ using 10's complement.",
          given: "M = 7532, N = 1240",
          solution: {
            steps: [
              "Step 1: Equal digit lengths (4 digits).",
              "Step 2: 10's complement of 1240: 9's comp is 8759 -> add 1 = 8760.",
              "Step 3: Add M + Comp(N) = 7532 + 8760 = 16292.",
              "Step 4: End carry = 1 out of MSB. Discard carry -> +6292."
            ],
            final: "+6292",
            verification: "7532 - 1240 = +6292 (Exact Match)"
          }
        },
        {
          id: "p15b-10s-2",
          difficulty: "Medium",
          conceptTag: "Case 2: M < N (No Carry)",
          question: "Perform (1840 - 7532)₁₀ using 10's complement.",
          given: "M = 1840, N = 7532",
          solution: {
            steps: [
              "Step 1: Both numbers have 4 digits.",
              "Step 2: 10's complement of 7532: 9's comp is 2467 -> add 1 = 2468.",
              "Step 3: Add M + Comp(N) = 1840 + 2468 = 4308.",
              "Step 4: End carry = 0 (No carry) -> Result is negative.",
              "Step 5: Take 10's complement of 4308: 10000 - 4308 = 5692. Prefix minus: -5692."
            ],
            final: "-5692",
            verification: "1840 - 7532 = -5692 (Exact Match)"
          }
        },
        {
          id: "p15b-10s-3",
          difficulty: "Hard",
          conceptTag: "Unequal Digit Padding on M",
          question: "Subtract (4680)₁₀ from (315)₁₀ using 10's complement.",
          given: "M = 315, N = 4680",
          solution: {
            steps: [
              "Step 1: Pad leading zero to M: 315 -> 0315 (4 digits).",
              "Step 2: 10's complement of 4680: 9's comp is 5319 -> add 1 = 5320.",
              "Step 3: Add M + Comp(N) = 0315 + 5320 = 5635.",
              "Step 4: No carry generated -> Result is negative.",
              "Step 5: 10's complement of 5635: 10000 - 5635 = 4365. Prefix minus: -4365."
            ],
            final: "-4365",
            verification: "315 - 4680 = -4365 (Exact Match)"
          }
        }
      ]
    }
  },

  // ---------------------------------------------------------------------------
  // TAB 4: 1's & 2's COMPLEMENT SUBTRACTION (1.5C)
  // ---------------------------------------------------------------------------
  binarySubtraction: {
    heroTitle: "Binary Subtraction Using 1's and 2's Complements",
    heroSubtitle: "The core arithmetic mechanism inside modern CPU ALUs. Binary complement subtraction unifies addition and subtraction onto a single hardware adder.",

    // SUB-TAB 1: 1's COMPLEMENT SUBTRACTION
    subtraction1s: {
      ruleBadge: "EAC: Add Carry +1 to LSB",
      ruleSummary: "If Carry = 1 out of MSB -> Add End-Around Carry (+1) to the LSB (Result is positive). If Carry = 0 -> Invert all bits of the sum (1's complement) and prefix a minus sign (Result is negative).",
      models: [
        {
          id: "model-5a",
          label: "Model 5A: Case 1 (M > N, Equal Bit Width) with End-Around Carry",
          conceptTag: "Case 1: M > N (Carry = 1)",
          minuend: "1010100",
          subtrahend: "1000011",
          bitWidth: 7,
          paddedM: "1010100",
          paddedN: "1000011",
          compN: "0111100",
          columns: ["b6", "b5", "b4", "b3", "b2", "b1", "b0"],
          carriesIn: ["1", "1", "1", "1", "1", "0", "0"],
          mBits: ["1", "0", "1", "0", "1", "0", "0"],
          compNBits: ["0", "1", "1", "1", "1", "0", "0"],
          rawSumBits: ["0", "0", "1", "0", "0", "0", "0"],
          cout: "1",
          endAroundCarry: {
            action: "Carry = 1 out of MSB (End-Around Carry). Add +1 to LSB.",
            eacBits: ["0", "0", "1", "0", "0", "0", "1"],
            finalBinary: "+(0010001)₂"
          },
          verification: {
            base10Minuend: 84,
            base10Subtrahend: 67,
            base10Diff: 17,
            binaryValue: 17,
            isCorrect: true
          }
        },
        {
          id: "model-5b",
          label: "Model 5B: Case 2 (M < N, Equal Bit Width) Producing Negative Result",
          conceptTag: "Case 2: M < N (No Carry)",
          minuend: "1000011",
          subtrahend: "1010100",
          bitWidth: 7,
          paddedM: "1000011",
          paddedN: "1010100",
          compN: "0101011",
          columns: ["b6", "b5", "b4", "b3", "b2", "b1", "b0"],
          carriesIn: ["0", "0", "0", "0", "0", "1", "0"],
          mBits: ["1", "0", "0", "0", "0", "1", "1"],
          compNBits: ["0", "1", "0", "1", "0", "1", "1"],
          rawSumBits: ["1", "1", "0", "1", "1", "1", "0"],
          cout: "0",
          negativeHandling: {
            action: "Carry = 0 out of MSB (No Carry) -> Result is NEGATIVE.",
            step: "Take 1's complement of raw sum (invert all bits) and prefix '-':",
            compResult: "Invert (1101110)₂ -> (0010001)₂",
            finalBinary: "-(0010001)₂"
          },
          verification: {
            base10Minuend: 67,
            base10Subtrahend: 84,
            base10Diff: -17,
            binaryValue: -17,
            isCorrect: true
          }
        },
        {
          id: "model-5c",
          label: "Model 5C: Unequal Bit Widths (Must Pad Subtrahend N Before Complementing)",
          conceptTag: "Unequal Bit-Width Padding",
          minuend: "110101",
          subtrahend: "1101",
          bitWidth: 6,
          paddedM: "110101",
          paddedN: "001101",
          paddingNote: "M has 6 bits, N has 4 bits. Pad 2 leading zeros to N: 1101 -> 001101 BEFORE taking 1's complement!",
          compN: "110010",
          columns: ["b5", "b4", "b3", "b2", "b1", "b0"],
          carriesIn: ["1", "1", "0", "0", "0", "0"],
          mBits: ["1", "1", "0", "1", "0", "1"],
          compNBits: ["1", "1", "0", "0", "1", "0"],
          rawSumBits: ["1", "0", "0", "1", "1", "1"],
          cout: "1",
          endAroundCarry: {
            action: "Carry = 1 out of MSB. Add +1 to LSB.",
            eacBits: ["1", "0", "1", "0", "0", "0"],
            finalBinary: "+(101000)₂"
          },
          verification: {
            base10Minuend: 53,
            base10Subtrahend: 13,
            base10Diff: 40,
            binaryValue: 40,
            isCorrect: true
          }
        },
        {
          id: "model-5d",
          label: "Model 5D: Combined Integer and Fractional Binary Subtraction",
          conceptTag: "Fractional Complement",
          minuend: "1101.10",
          subtrahend: "0110.01",
          bitWidth: 6,
          paddedM: "1101.10",
          paddedN: "0110.01",
          compN: "1001.10",
          columns: ["b3", "b2", "b1", "b0", ".", "b-1", "b-2"],
          carriesIn: ["1", "0", "0", "1", ".", "1", "0"],
          mBits: ["1", "1", "0", "1", ".", "1", "0"],
          compNBits: ["1", "0", "0", "1", ".", "1", "0"],
          rawSumBits: ["0", "1", "1", "1", ".", "0", "0"],
          cout: "1",
          endAroundCarry: {
            action: "Carry = 1 out of MSB. Add +1 at LSB position (b-2 = 0.01).",
            eacBits: ["0", "1", "1", "1", ".", "0", "1"],
            finalBinary: "+(0111.01)₂"
          },
          verification: {
            base10Minuend: 13.5,
            base10Subtrahend: 6.25,
            base10Diff: 7.25,
            binaryValue: 7.25,
            isCorrect: true
          }
        },
        {
          id: "model-5e",
          label: "Model 5E: Fractional Subtraction Where M < N (Negative Result)",
          conceptTag: "Fractional M < N (No Carry)",
          minuend: "0101.10",
          subtrahend: "1100.11",
          bitWidth: 6,
          paddedM: "0101.10",
          paddedN: "1100.11",
          compN: "0011.00",
          columns: ["b3", "b2", "b1", "b0", ".", "b-1", "b-2"],
          carriesIn: ["0", "1", "1", "1", ".", "0", "0"],
          mBits: ["0", "1", "0", "1", ".", "1", "0"],
          compNBits: ["0", "0", "1", "1", ".", "0", "0"],
          rawSumBits: ["1", "0", "0", "0", ".", "1", "0"],
          cout: "0",
          negativeHandling: {
            action: "Carry = 0 out of MSB -> Result is NEGATIVE.",
            step: "Take 1's complement of sum (invert all bits) and prefix '-':",
            compResult: "Invert (1000.10)₂ -> (0111.01)₂",
            finalBinary: "-(0111.01)₂"
          },
          verification: {
            base10Minuend: 5.5,
            base10Subtrahend: 12.75,
            base10Diff: -7.25,
            binaryValue: -7.25,
            isCorrect: true
          }
        }
      ],
      practiceQuestions: [
        {
          id: "p15c-1s-1",
          difficulty: "Easy",
          conceptTag: "Case 1: M > N (Carry = 1)",
          question: "Perform (11011)₂ - (10010)₂ using 1's complement.",
          given: "M = (11011)₂, N = (10010)₂",
          solution: {
            steps: [
              "Step 1: Bit widths are equal (5 bits).",
              "Step 2: 1's complement of N (10010) is (01101)₂.",
              "Step 3: Add M + Comp(N) = 11011 + 01101 = (1)01000₂ (Carry = 1).",
              "Step 4: End-around carry: 01000 + 1 = +(01001)₂."
            ],
            final: "+(01001)₂",
            verification: "Base-10: 27 - 18 = +9 = +(01001)₂ (Exact Match)"
          }
        },
        {
          id: "p15c-1s-2",
          difficulty: "Medium",
          conceptTag: "Case 2: M < N (No Carry)",
          question: "Perform (10010)₂ - (11011)₂ using 1's complement.",
          given: "M = (10010)₂, N = (11011)₂",
          solution: {
            steps: [
              "Step 1: Equal bit widths (5 bits).",
              "Step 2: 1's complement of N (11011) is (00100)₂.",
              "Step 3: Add M + Comp(N) = 10010 + 00100 = (0)10110₂ (Carry = 0).",
              "Step 4: No carry -> Result is negative. Invert sum 10110 -> 01001.",
              "Step 5: Prefix minus sign: -(01001)₂."
            ],
            final: "-(01001)₂",
            verification: "Base-10: 18 - 27 = -9 = -(01001)₂ (Exact Match)"
          }
        },
        {
          id: "p15c-1s-3",
          difficulty: "Hard",
          conceptTag: "Unequal Bit-Width Padding",
          question: "Subtract (1110)₂ from (101101)₂ using 1's complement.",
          given: "M = (101101)₂, N = (1110)₂",
          solution: {
            steps: [
              "Step 1: Pad 2 leading zeros to N: 1110 -> 001110 (6 bits).",
              "Step 2: 1's complement of 001110 is 110001.",
              "Step 3: Add M + Comp(N) = 101101 + 110001 = (1)011110₂ (Carry = 1).",
              "Step 4: End-around carry: 011110 + 1 = +(011111)₂."
            ],
            final: "+(011111)₂",
            verification: "Base-10: 45 - 14 = +31 = +(011111)₂ (Exact Match)"
          }
        }
      ]
    },

    // SUB-TAB 2: 2's COMPLEMENT SUBTRACTION
    subtraction2s: {
      ruleBadge: "Discard Extra Carry",
      ruleSummary: "If Carry = 1 out of MSB -> DISCARD the extra carry. The remaining n bits are the final positive answer! If Carry = 0 -> Take the 2's complement of the sum and prefix a minus sign (Result is negative).",
      models: [
        {
          id: "model-6a",
          label: "Model 6A: Case 1 (M > N, Equal Bit Width) with Discarded Carry",
          conceptTag: "Case 1: M > N (Discard Carry)",
          minuend: "1010100",
          subtrahend: "1000011",
          bitWidth: 7,
          paddedM: "1010100",
          paddedN: "1000011",
          compN: "0111101",
          columns: ["b6", "b5", "b4", "b3", "b2", "b1", "b0"],
          carriesIn: ["1", "1", "1", "1", "1", "0", "0"],
          mBits: ["1", "0", "1", "0", "1", "0", "0"],
          compNBits: ["0", "1", "1", "1", "1", "0", "1"],
          rawSumBits: ["0", "0", "1", "0", "0", "0", "1"],
          cout: "1",
          discardCarryAction: {
            action: "Carry = 1 out of MSB -> DISCARD CARRY. Result is positive.",
            note: "The remaining 7 bits are the final answer directly.",
            finalBinary: "+(0010001)₂"
          },
          verification: {
            base10Minuend: 84,
            base10Subtrahend: 67,
            base10Diff: 17,
            binaryValue: 17,
            isCorrect: true
          }
        },
        {
          id: "model-6b",
          label: "Model 6B: Case 2 (M < N, Equal Bit Width) Producing Negative Result",
          conceptTag: "Case 2: M < N (No Carry)",
          minuend: "1000011",
          subtrahend: "1010100",
          bitWidth: 7,
          paddedM: "1000011",
          paddedN: "1010100",
          compN: "0101100",
          columns: ["b6", "b5", "b4", "b3", "b2", "b1", "b0"],
          carriesIn: ["0", "0", "0", "0", "0", "0", "0"],
          mBits: ["1", "0", "0", "0", "0", "1", "1"],
          compNBits: ["0", "1", "0", "1", "1", "0", "0"],
          rawSumBits: ["1", "1", "0", "1", "1", "1", "1"],
          cout: "0",
          negativeHandling: {
            action: "Carry = 0 out of MSB (No Carry) -> Result is NEGATIVE.",
            step: "Take 2's complement of sum (1101111)₂ and prefix '-':",
            compResult: "1's comp = 0010000 -> add 1 = (0010001)₂",
            finalBinary: "-(0010001)₂"
          },
          verification: {
            base10Minuend: 67,
            base10Subtrahend: 84,
            base10Diff: -17,
            binaryValue: -17,
            isCorrect: true
          }
        },
        {
          id: "model-6c",
          label: "Model 6C: Unequal Bit Widths (Padding N Before Taking 2's Complement)",
          conceptTag: "Unequal Bit-Width Padding",
          minuend: "101100",
          subtrahend: "111",
          bitWidth: 6,
          paddedM: "101100",
          paddedN: "000111",
          paddingNote: "M has 6 bits, N has 3 bits. Pad 3 leading zeros to N: 111 -> 000111 BEFORE taking 2's complement!",
          compN: "111001",
          columns: ["b5", "b4", "b3", "b2", "b1", "b0"],
          carriesIn: ["1", "1", "1", "0", "0", "0"],
          mBits: ["1", "0", "1", "1", "0", "0"],
          compNBits: ["1", "1", "1", "0", "0", "1"],
          rawSumBits: ["1", "0", "0", "1", "0", "1"],
          cout: "1",
          discardCarryAction: {
            action: "Carry = 1 out of MSB -> DISCARD CARRY. Result is positive.",
            note: "The remaining 6 bits form the final magnitude directly.",
            finalBinary: "+(100101)₂"
          },
          verification: {
            base10Minuend: 44,
            base10Subtrahend: 7,
            base10Diff: 37,
            binaryValue: 37,
            isCorrect: true
          }
        },
        {
          id: "model-6d",
          label: "Model 6D: Unequal Bit Widths Where M < N (Padding M)",
          conceptTag: "Unequal Bit-Width (M < N)",
          minuend: "1101",
          subtrahend: "100110",
          bitWidth: 6,
          paddedM: "001101",
          paddedN: "100110",
          paddingNote: "M has 4 bits, N has 6 bits. Pad 2 leading zeros to M: 1101 -> 001101.",
          compN: "011010",
          columns: ["b5", "b4", "b3", "b2", "b1", "b0"],
          carriesIn: ["0", "1", "1", "0", "0", "0"],
          mBits: ["0", "0", "1", "1", "0", "1"],
          compNBits: ["0", "1", "1", "0", "1", "0"],
          rawSumBits: ["1", "0", "0", "1", "1", "1"],
          cout: "0",
          negativeHandling: {
            action: "Carry = 0 out of MSB -> Result is NEGATIVE.",
            step: "Take 2's complement of sum (100111)₂ and prefix '-':",
            compResult: "1's comp = 011000 -> add 1 = (011001)₂",
            finalBinary: "-(011001)₂"
          },
          verification: {
            base10Minuend: 13,
            base10Subtrahend: 38,
            base10Diff: -25,
            binaryValue: -25,
            isCorrect: true
          }
        },
        {
          id: "model-6e",
          label: "Model 6E: Combined Integer and Fractional 2's Complement Subtraction",
          conceptTag: "Fractional 2's Complement",
          minuend: "10110.10",
          subtrahend: "01101.11",
          bitWidth: 7,
          paddedM: "10110.10",
          paddedN: "01101.11",
          compN: "10010.01",
          columns: ["b4", "b3", "b2", "b1", "b0", ".", "b-1", "b-2"],
          carriesIn: ["1", "0", "1", "1", "0", ".", "0", "0"],
          mBits: ["1", "0", "1", "1", "0", ".", "1", "0"],
          compNBits: ["1", "0", "0", "1", "0", ".", "0", "1"],
          rawSumBits: ["0", "1", "0", "0", "0", ".", "1", "1"],
          cout: "1",
          discardCarryAction: {
            action: "Carry = 1 out of MSB -> DISCARD CARRY. Result is positive.",
            note: "Drop the overflow carry bit; remaining bits form answer.",
            finalBinary: "+(01000.11)₂"
          },
          verification: {
            base10Minuend: 22.5,
            base10Subtrahend: 13.75,
            base10Diff: 8.75,
            binaryValue: 8.75,
            isCorrect: true
          }
        }
      ],
      practiceQuestions: [
        {
          id: "p15c-2s-1",
          difficulty: "Easy",
          conceptTag: "Case 1: M > N (Discard Carry)",
          question: "Perform (11101)₂ - (10100)₂ using 2's complement.",
          given: "M = (11101)₂, N = (10100)₂",
          solution: {
            steps: [
              "Step 1: Equal bit widths (5 bits).",
              "Step 2: 2's complement of N (10100) is (01100)₂.",
              "Step 3: Add M + Comp(N) = 11101 + 01100 = (1)01001₂ (Carry = 1).",
              "Step 4: Discard carry -> +(01001)₂."
            ],
            final: "+(01001)₂",
            verification: "Base-10: 29 - 20 = +9 = +(01001)₂ (Exact Match)"
          }
        },
        {
          id: "p15c-2s-2",
          difficulty: "Medium",
          conceptTag: "Case 2: M < N (No Carry)",
          question: "Perform (10100)₂ - (11101)₂ using 2's complement.",
          given: "M = (10100)₂, N = (11101)₂",
          solution: {
            steps: [
              "Step 1: Equal bit widths (5 bits).",
              "Step 2: 2's complement of N (11101) is (00011)₂.",
              "Step 3: Add M + Comp(N) = 10100 + 00011 = (0)10111₂ (Carry = 0).",
              "Step 4: No carry -> Result is negative. Take 2's complement of sum 10111: 01000 + 1 = 01001.",
              "Step 5: Prefix minus: -(01001)₂."
            ],
            final: "-(01001)₂",
            verification: "Base-10: 20 - 29 = -9 = -(01001)₂ (Exact Match)"
          }
        },
        {
          id: "p15c-2s-3",
          difficulty: "Hard",
          conceptTag: "Unequal Bit-Width (M < N)",
          question: "Subtract (101110)₂ from (1100)₂ using 2's complement.",
          given: "M = (1100)₂, N = (101110)₂",
          solution: {
            steps: [
              "Step 1: Pad 2 leading zeros to M: 1100 -> 001100 (6 bits).",
              "Step 2: 2's complement of N (101110) is 010010.",
              "Step 3: Add M + Comp(N) = 001100 + 010010 = (0)011110₂ (Carry = 0).",
              "Step 4: No carry -> Result is negative. Take 2's complement of 011110: 100001 + 1 = 100010.",
              "Step 5: Prefix minus: -(100010)₂."
            ],
            final: "-(100010)₂",
            verification: "Base-10: 12 - 46 = -34 = -(100010)₂ (Exact Match)"
          }
        }
      ]
    }
  },

  // ---------------------------------------------------------------------------
  // TAB 5: CHEAT SHEET (EXCLUSIVE RULES & SPEED SHORTCUTS)
  // ---------------------------------------------------------------------------
  cheatSheet: {
    heroTitle: "Complement Arithmetic Master Cheat Sheet",
    heroSubtitle: "High-yield formulas, the 2x2 Decision Matrix, 4 exclusive exam speed shortcuts, and the top 5 mistakes that cost marks in university exams.",

    decisionMatrix: [
      {
        complementFamily: "Diminished Radix [(r - 1)'s Complement]",
        types: "1's Complement (Base 2) & 9's Complement (Base 10)",
        howToFind: "Subtract each digit from (r - 1). For binary: invert every bit (0 <-> 1). For decimal: subtract each digit from 9.",
        whenCarryOne: "End-Around Carry: Add the carry (+1) to the least significant position (LSB) of the raw sum.",
        whenCarryZero: "No Carry: Result is NEGATIVE (-). Take the (r - 1)'s complement of the sum and prefix a minus sign."
      },
      {
        complementFamily: "Radix [r's Complement]",
        types: "2's Complement (Base 2) & 10's Complement (Base 10)",
        howToFind: "[(r - 1)'s Complement] + 1 at LSB. Or use exam scanning shortcuts (Keep up to first 1, flip rest / 9-9-9-10).",
        whenCarryOne: "Discard Carry: An extra carry is produced out of the MSB. Simply discard it! Remaining digits are the final positive answer.",
        whenCarryZero: "No Carry: Result is NEGATIVE (-). Take the r's complement of the sum and prefix a minus sign."
      }
    ],

    speedShortcuts: [
      {
        id: "sc-1",
        title: "Shortcut 1: The 'First-1 Latch' for 2's Complement",
        timeSaved: "2 Seconds vs 1's Comp + 1 Addition",
        badge: "Binary Speed Secret",
        rule: "Scan bits from Right to Left (<- from LSB towards MSB). Keep all trailing 0s and the very first 1 completely unchanged. Invert all bits to the left of that first 1.",
        example: "Find 2's complement of 11010100: Trailing zeros and first 1 are '100' (keep them). Invert the remaining '11010' to '00101'. Combine -> 00101100. Zero addition steps required!"
      },
      {
        id: "sc-2",
        title: "Shortcut 2: The '9-9-9-10 Scan' for 10's Complement",
        timeSaved: "3 Seconds vs 9's Comp + 1 Addition",
        badge: "Decimal Speed Secret",
        rule: "Scanning from Left to Right, subtract each digit from 9, EXCEPT subtract the last non-zero rightmost digit from 10. Keep any trailing zeros unchanged.",
        example: "Find 10's complement of 82500: Trailing '00' stay unchanged. Last non-zero digit 5 subtracted from 10: (10 - 5 = 5). Digits to the left subtracted from 9: (9 - 8 = 1), (9 - 2 = 7). Combine -> 17500."
      },
      {
        id: "sc-3",
        title: "Shortcut 3: Why Equalization Padding MUST Come FIRST",
        timeSaved: "Avoids Complete Problem Failure",
        badge: "Exam Trap Alert",
        rule: "Always pad M and N to equal length BEFORE taking any complement. If M has 6 bits and N has 4 bits (e.g. 1101), taking the 1's complement of 1101 directly gives 0010 (4 bits) instead of 110010 (6 bits), completely missing two leading 1s and invalidating the arithmetic!",
        example: "To compute (101101)₂ - (1101)₂, pad N to 6 bits first: 001101. Then complement -> 110010. Never complement the unpadded 4-bit number!"
      },
      {
        id: "sc-4",
        title: "Shortcut 4: General Base-r Complement Trick (Octal 7's/8's and Hex 15's/16's)",
        timeSaved: "Works for Any Arbitrary Radix r",
        badge: "Radix Generalization",
        rule: "To find (r - 1)'s complement in Octal (Base 8), subtract each digit from 7. For Hexadecimal (Base 16), subtract each hex digit from 15 (F). To get r's complement (8's or 16's), add 1 to the LSB.",
        example: "Octal 7's comp of (542)₈ = (777 - 542)₈ = (235)₈. 8's comp = 235 + 1 = (236)₈. Hex 15's comp of (3A7)₁₆ = (FFF - 3A7)₁₆ = (C58)₁₆. 16's comp = (C59)₁₆."
      }
    ],

    topMistakes: [
      {
        id: "tm-1",
        mistake: "Complementing the Minuend (M) Instead of the Subtrahend (N)",
        consequence: "Computes -M + N = N - M instead of M - N, inverting the sign of the answer.",
        fix: "In M - N, M stays untouched. Only the subtrahend N is complemented: S = M + Comp(N)."
      },
      {
        id: "tm-2",
        mistake: "Forgetting to Add End-Around Carry in 1's or 9's Complement",
        consequence: "Answer is off by exactly 1 unit.",
        fix: "In (r - 1)'s complements, a carry out of the MSB is NEVER discarded; it wraps around to +1 at the LSB."
      },
      {
        id: "tm-3",
        mistake: "Adding Carry in 2's or 10's Complement (Confusing Discard vs EAC)",
        consequence: "Double-adds the carry and ruins the answer.",
        fix: "In r's complements (2's and 10's), the carry out of the MSB represents r^n and is simply DISCARDED."
      },
      {
        id: "tm-4",
        mistake: "Taking Complement of Sum When Carry = 1 (Positive Answer)",
        consequence: "Inverts a positive result into an unintended complement form.",
        fix: "Only take the complement of the sum when Carry = 0 (No Carry), which flags a negative answer."
      },
      {
        id: "tm-5",
        mistake: "Neglecting Leading Zeros When Complementing Shorter Numbers",
        consequence: "Loses essential inverted high-order bits, producing catastrophic calculation errors.",
        fix: "Equalize digit/bit lengths of M and N with leading zeros BEFORE calculating any complement."
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // TAB 6: MIXED EXAM CHALLENGE (15 QUESTIONS)
  // ---------------------------------------------------------------------------
  mixedExamChallenge: [
    {
      id: "mec-1",
      difficulty: "Easy",
      conceptTag: "Trailing Zeros Shortcut",
      question: "Find the 1's and 2's complement of the 8-bit binary number (10110110)₂.",
      given: "N = (10110110)₂",
      options: [
        "1's = 01001001, 2's = 01001010",
        "1's = 01001010, 2's = 01001011",
        "1's = 01001001, 2's = 01001001",
        "1's = 10110110, 2's = 01001010"
      ],
      correctAnswer: "1's = 01001001, 2's = 01001010",
      solution: {
        steps: [
          "1's Complement: Invert every bit of 10110110 -> 01001001.",
          "2's Complement: Add 1 to LSB: 01001001 + 1 = 01001010.",
          "Exam Shortcut Check: Keep trailing '10' unchanged, flip bits to the left of the first '1' (101101 -> 010010) -> 01001010."
        ],
        verification: "Base-10: 182 + 74 = 256 = 2^8 (Exact Match)"
      }
    },
    {
      id: "mec-2",
      difficulty: "Easy",
      conceptTag: "Multiple Trailing Zeros Trap",
      question: "Find the 9's and 10's complement of the decimal integer (834000)₁₀.",
      given: "N = 834000",
      options: [
        "9's = 165999, 10's = 166000",
        "9's = 165000, 10's = 165001",
        "9's = 165999, 10's = 165999",
        "9's = 166000, 10's = 166001"
      ],
      correctAnswer: "9's = 165999, 10's = 166000",
      solution: {
        steps: [
          "9's Complement: Subtract each digit from 9: 999999 - 834000 = 165999.",
          "10's Complement: Add 1 to LSB: 165999 + 1 = 166000.",
          "Exam Shortcut (9-9-9-10): Keep trailing '000'. Subtract first non-zero digit 4 from 10: 10 - 4 = 6. Subtract others from 9: 9 - 8 = 1, 9 - 3 = 6 -> 166000."
        ],
        verification: "Base-10: 1000000 - 834000 = 166000 (Exact Match)"
      }
    },
    {
      id: "mec-3",
      difficulty: "Easy",
      conceptTag: "Case 1: M > N (Carry = 1)",
      question: "Subtract (10011)₂ from (11100)₂ using 1's complement arithmetic.",
      given: "M = (11100)₂, N = (10011)₂",
      options: [
        "+(01001)₂",
        "+(01000)₂",
        "-(01001)₂",
        "+(10001)₂"
      ],
      correctAnswer: "+(01001)₂",
      solution: {
        steps: [
          "Step 1: Bit widths are equal (5 bits).",
          "Step 2: 1's complement of N (10011) is 01100.",
          "Step 3: Add M + Comp(N) = 11100 + 01100 = (1)01000₂ (Carry = 1).",
          "Step 4: End-around carry: 01000 + 1 = +(01001)₂."
        ],
        verification: "Base-10: 28 - 19 = +9 = +(01001)₂ (Exact Match)"
      }
    },
    {
      id: "mec-4",
      difficulty: "Easy",
      conceptTag: "Case 1: M > N (Discard Carry)",
      question: "Subtract (10011)₂ from (11100)₂ using 2's complement arithmetic.",
      given: "M = (11100)₂, N = (10011)₂",
      options: [
        "+(01001)₂",
        "+(01010)₂",
        "-(01001)₂",
        "+(11001)₂"
      ],
      correctAnswer: "+(01001)₂",
      solution: {
        steps: [
          "Step 1: Bit widths are equal (5 bits).",
          "Step 2: 2's complement of N (10011) is 01101.",
          "Step 3: Add M + Comp(N) = 11100 + 01101 = (1)01001₂ (Carry = 1).",
          "Step 4: Discard carry -> +(01001)₂."
        ],
        verification: "Base-10: 28 - 19 = +9 = +(01001)₂ (Exact Match)"
      }
    },
    {
      id: "mec-5",
      difficulty: "Medium",
      conceptTag: "Unequal Digit Padding on N",
      question: "Subtract (482)₁₀ from (3915)₁₀ using 9's complement arithmetic.",
      given: "M = 3915, N = 482",
      options: [
        "+3433",
        "+3432",
        "-3433",
        "+4433"
      ],
      correctAnswer: "+3433",
      solution: {
        steps: [
          "Step 1: Pad leading zero to N: 482 -> 0482 (both 4 digits).",
          "Step 2: 9's complement of 0482 is 9999 - 0482 = 9517.",
          "Step 3: Add M + Comp(N) = 3915 + 9517 = 13432 (Carry = 1).",
          "Step 4: End-around carry: 3432 + 1 = +3433."
        ],
        verification: "Base-10: 3915 - 482 = +3433 (Exact Match)"
      }
    },
    {
      id: "mec-6",
      difficulty: "Medium",
      conceptTag: "Case 2: M < N (No Carry)",
      question: "Perform (2130 - 8450)₁₀ using 10's complement arithmetic.",
      given: "M = 2130, N = 8450",
      options: [
        "-6320",
        "+6320",
        "-6319",
        "-7320"
      ],
      correctAnswer: "-6320",
      solution: {
        steps: [
          "Step 1: Both numbers have 4 digits.",
          "Step 2: 10's complement of 8450: 9's comp is 1549 -> add 1 = 1550.",
          "Step 3: Add M + Comp(N) = 2130 + 1550 = 3680 (Carry = 0).",
          "Step 4: No carry -> Result is negative.",
          "Step 5: Take 10's complement of 3680: 10000 - 3680 = 6320. Prefix minus: -6320."
        ],
        verification: "Base-10: 2130 - 8450 = -6320 (Exact Match)"
      }
    },
    {
      id: "mec-7",
      difficulty: "Medium",
      conceptTag: "Fractional End-Around Carry",
      question: "Perform (1011.11)₂ - (0110.10)₂ using 1's complement arithmetic.",
      given: "M = (1011.11)₂, N = (0110.10)₂",
      options: [
        "+(0101.01)₂",
        "+(0101.00)₂",
        "+(0110.01)₂",
        "-(0101.01)₂"
      ],
      correctAnswer: "+(0101.01)₂",
      solution: {
        steps: [
          "Step 1: Equal bit lengths (4 integer bits, 2 fractional bits).",
          "Step 2: 1's complement of N (0110.10) is 1001.01.",
          "Step 3: Add M + Comp(N) = 1011.11 + 1001.01 = (1)0101.00₂ (Carry = 1).",
          "Step 4: End-around carry to LSB (b-2 = 0.01): 0101.00 + 0.01 = +(0101.01)₂."
        ],
        verification: "Base-10: 11.75 - 6.50 = +5.25 = +(0101.01)₂ (Exact Match)"
      }
    },
    {
      id: "mec-8",
      difficulty: "Medium",
      conceptTag: "Fractional Discard Carry",
      question: "Perform (1101.01)₂ - (1000.11)₂ using 2's complement arithmetic.",
      given: "M = (1101.01)₂, N = (1000.11)₂",
      options: [
        "+(0100.10)₂",
        "+(0100.01)₂",
        "+(0011.10)₂",
        "-(0100.10)₂"
      ],
      correctAnswer: "+(0100.10)₂",
      solution: {
        steps: [
          "Step 1: Equal bit lengths (4 integer bits, 2 fractional bits).",
          "Step 2: 2's complement of N: 1's comp of 1000.11 is 0111.00 -> add 0.01 at LSB = 0111.01.",
          "Step 3: Add M + Comp(N) = 1101.01 + 0111.01 = (1)0100.10₂ (Carry = 1).",
          "Step 4: Discard carry -> +(0100.10)₂."
        ],
        verification: "Base-10: 13.25 - 8.75 = +4.50 = +(0100.10)₂ (Exact Match)"
      }
    },
    {
      id: "mec-9",
      difficulty: "Medium",
      conceptTag: "Unequal Bit-Width (M < N)",
      question: "Subtract (110100)₂ from (1101)₂ using 2's complement arithmetic.",
      given: "M = (1101)₂, N = (110100)₂",
      options: [
        "-(100111)₂",
        "+(100111)₂",
        "-(100110)₂",
        "-(010111)₂"
      ],
      correctAnswer: "-(100111)₂",
      solution: {
        steps: [
          "Step 1: Pad 2 leading zeros to M: 1101 -> 001101 (6 bits).",
          "Step 2: 2's complement of N (110100) is 001100.",
          "Step 3: Add M + Comp(N) = 001101 + 001100 = (0)011001₂ (Carry = 0).",
          "Step 4: No carry -> Result is negative. Take 2's complement of 011001: 100110 + 1 = 100111.",
          "Step 5: Prefix minus: -(100111)₂."
        ],
        verification: "Base-10: 13 - 52 = -39 = -(32 + 4 + 2 + 1) = -(100111)₂ (Exact Match)"
      }
    },
    {
      id: "mec-10",
      difficulty: "Hard",
      conceptTag: "Base-8 Radix Complement",
      question: "Find the 7's and 8's complement of the Octal number (6420)₈.",
      given: "N = (6420)₈",
      options: [
        "7's = (1357)₈, 8's = (1360)₈",
        "7's = (1357)₈, 8's = (1358)₈",
        "7's = (1350)₈, 8's = (1351)₈",
        "7's = (2357)₈, 8's = (2360)₈"
      ],
      correctAnswer: "7's = (1357)₈, 8's = (1360)₈",
      solution: {
        steps: [
          "7's Complement: Subtract each octal digit from 7: (7-6)(7-4)(7-2)(7-0) = (1357)₈.",
          "8's Complement: Add 1 to LSB in base 8: 1357 + 1 = (1360)₈ (since 7 + 1 = 8₁₀ = 10₈).",
          "Exam Shortcut: Keep trailing 0, subtract first non-zero digit 2 from 8 (8-2=6), subtract others from 7 (7-6=1, 7-4=3) -> (1360)₈."
        ],
        verification: "Octal: 8^4 - (6420)₈ = (10000)₈ - (6420)₈ = (1360)₈ (Exact Match)"
      }
    },
    {
      id: "mec-11",
      difficulty: "Hard",
      conceptTag: "Base-16 Radix Complement",
      question: "Find the 15's (F's) and 16's complement of the Hexadecimal number (2B5A)₁₆.",
      given: "N = (2B5A)₁₆",
      options: [
        "15's = (D4A5)₁₆, 16's = (D4A6)₁₆",
        "15's = (C4A5)₁₆, 16's = (C4A6)₁₆",
        "15's = (D4A5)₁₆, 16's = (D4A5)₁₆",
        "15's = (E4A5)₁₆, 16's = (E4A6)₁₆"
      ],
      correctAnswer: "15's = (D4A5)₁₆, 16's = (D4A6)₁₆",
      solution: {
        steps: [
          "15's Complement: Subtract each hex digit from 15 (F):",
          "F - 2 = D (13), F - B (11) = 4, F - 5 = A (10), F - A (10) = 5 -> (D4A5)₁₆.",
          "16's Complement: Add 1 to LSB: D4A5 + 1 = (D4A6)₁₆."
        ],
        verification: "Hex: 16^4 - (2B5A)₁₆ = (10000)₁₆ - (2B5A)₁₆ = (D4A6)₁₆ (Exact Match)"
      }
    },
    {
      id: "mec-12",
      difficulty: "Hard",
      conceptTag: "Unequal Width M < N Padding",
      question: "Subtract (11010)₂ from (101)₂ using 1's complement arithmetic.",
      given: "M = (101)₂, N = (11010)₂",
      options: [
        "-(10101)₂",
        "+(10101)₂",
        "-(10100)₂",
        "-(01011)₂"
      ],
      correctAnswer: "-(10101)₂",
      solution: {
        steps: [
          "Step 1: Pad 2 leading zeros to M: 101 -> 00101 (5 bits).",
          "Step 2: 1's complement of N (11010) is 00101.",
          "Step 3: Add M + Comp(N) = 00101 + 00101 = (0)01010₂ (Carry = 0).",
          "Step 4: No carry -> Result is negative. Invert sum 01010 -> 10101.",
          "Step 5: Prefix minus sign: -(10101)₂."
        ],
        verification: "Base-10: 5 - 26 = -21 = -(16 + 4 + 1) = -(10101)₂ (Exact Match)"
      }
    },
    {
      id: "mec-13",
      difficulty: "Hard",
      conceptTag: "Fractional M < N (No Carry)",
      question: "Subtract (142.85)₁₀ from (89.40)₁₀ using 10's complement arithmetic.",
      given: "M = 89.40, N = 142.85",
      options: [
        "-53.45",
        "+53.45",
        "-53.44",
        "-43.45"
      ],
      correctAnswer: "-53.45",
      solution: {
        steps: [
          "Step 1: Pad 1 leading zero to M: 89.40 -> 089.40 (same digit layout as 142.85).",
          "Step 2: 10's complement of 142.85: 9's comp is 857.14 -> add 0.01 = 857.15.",
          "Step 3: Add M + Comp(N) = 089.40 + 857.15 = 946.55 (Carry = 0).",
          "Step 4: No carry -> Result is negative.",
          "Step 5: Take 10's complement of 946.55: 1000.00 - 946.55 = 53.45. Prefix minus: -53.45."
        ],
        verification: "Base-10: 89.40 - 142.85 = -53.45 (Exact Match)"
      }
    },
    {
      id: "mec-14",
      difficulty: "Hard",
      conceptTag: "Power of 2 Boundary",
      question: "Subtract (1000)₂ from (0111)₂ using 2's complement arithmetic.",
      given: "M = (0111)₂, N = (1000)₂",
      options: [
        "-(0001)₂",
        "+(0001)₂",
        "-(1111)₂",
        "-(0000)₂"
      ],
      correctAnswer: "-(0001)₂",
      solution: {
        steps: [
          "Step 1: Equal bit widths (4 bits).",
          "Step 2: 2's complement of N (1000): 1's comp is 0111 -> add 1 = 1000 (Notice 2's comp of 1000 is 1000).",
          "Step 3: Add M + Comp(N) = 0111 + 1000 = (0)1111₂ (Carry = 0).",
          "Step 4: No carry -> Result is negative. Take 2's complement of sum 1111: 0000 + 1 = 0001.",
          "Step 5: Prefix minus sign: -(0001)₂."
        ],
        verification: "Base-10: 7 - 8 = -1 = -(0001)₂ (Exact Match)"
      }
    },
    {
      id: "mec-15",
      difficulty: "Hard",
      conceptTag: "1's vs 2's Complement Equivalence",
      question: "Given M = (10110)₂ and N = (11100)₂, compute M - N using both 1's and 2's complement and verify that both methods yield identical mathematical results.",
      given: "M = (10110)₂, N = (11100)₂",
      options: [
        "-(00110)₂ via both methods",
        "+(00110)₂ via both methods",
        "-(00101)₂ in 1's and -(00110)₂ in 2's",
        "-(10110)₂ via both methods"
      ],
      correctAnswer: "-(00110)₂ via both methods",
      solution: {
        steps: [
          "Method 1 (1's Complement):",
          "- 1's comp of N (11100) is 00011.",
          "- Sum: 10110 + 00011 = (0)11001₂ (Carry = 0 -> Negative).",
          "- 1's comp of 11001 is 00110 -> Result = -(00110)₂.",
          "Method 2 (2's Complement):",
          "- 2's comp of N (11100) is 00100.",
          "- Sum: 10110 + 00100 = (0)11010₂ (Carry = 0 -> Negative).",
          "- 2's comp of 11010 is 00110 -> Result = -(00110)₂.",
          "Conclusion: Both 1's and 2's complement methods yield the exact same result: -(00110)₂."
        ],
        verification: "Base-10: 22 - 28 = -6 = -(00110)₂ (Exact Match)"
      }
    }
  ]
};
