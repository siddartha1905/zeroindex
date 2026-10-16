/**
 * Section 1.6: Signed Binary Numbers (Representation of Positive and Negative Numbers)
 * Strictly zero em-dashes (\u2014) or en-dashes (\u2013).
 * Pure descriptive concept tags. Zero university names or exam years.
 */

export const section16Data = {
  id: "1.6",
  number: "1.6",
  title: "Signed Binary Numbers (Positive & Negative Representation)",
  badge: "Core Silicon Architecture",
  estimatedReadTime: "25 min read",
  dataScienceConnection: "Every NumPy and PyTorch integer tensor uses 2's complement internally. The dtype int8 stores values from -128 to +127 (not -127 to +127) precisely because the MSB carries a positional weight of -2^7 = -128. Understanding sign extension and arithmetic overflow prevents catastrophic silent overflow bugs in quantized neural network inference and low-precision AI accelerators.",

  overviewSignBit: {
    title: "How Digital Hardware Stores '+' and '-' Using Only 0s and 1s",
    subtitle: "The Sign Bit Convention & Register Architecture",
    humanVsSilicon: {
      human: "On paper, humans use explicit mathematical symbols '+' and '-' (such as +45 or -45) to designate the polarity of a number.",
      hardware: "Inside digital computers (flip-flops, registers, SRAM and DRAM), there are no plus or minus symbols in silicon. Every physical storage cell can only hold a binary state: voltage HIGH (1) or voltage LOW (0)."
    },
    universalRule: {
      name: "The Universal MSB Sign-Bit Convention",
      rule: "Engineers reserve the leftmost bit, the Most Significant Bit (MSB), to denote the sign of the number.",
      positiveBit: "0 = POSITIVE (+)",
      negativeBit: "1 = NEGATIVE (-)",
      positiveHighlight: "For ALL POSITIVE numbers (Sign Bit = 0), all three signed representations (Sign-Magnitude, 1's Complement, and 2's Complement) are 100% IDENTICAL! Differences only exist when the number is NEGATIVE (Sign Bit = 1)."
    },
    registerComparison: {
      unsigned: {
        title: "Unsigned 8-Bit Register",
        bitRange: "b7 down to b0 (All 8 bits represent pure magnitude)",
        weights: "128, 64, 32, 16, 8, 4, 2, 1",
        formula: "Range: 0 to 2^n - 1",
        range8Bit: "0 to +255",
        distinctValues: 256
      },
      signed: {
        title: "Signed 8-Bit Register",
        bitRange: "b7 is reserved as Sign Bit; b6 down to b0 are Magnitude / Value Bits",
        weights: "b7: Sign Bit (or -128 in 2's comp); b6..b0: +64, +32, +16, +8, +4, +2, +1",
        formula: "Range: -2^(n-1) to +(2^(n-1) - 1) [for 2's complement]",
        range8Bit: "-128 to +127",
        distinctValues: 256
      }
    },
    master4BitTable: [
      { decimal: "+7", pattern: "0111", signMag: "0111 (+7)", onesComp: "0111 (+7)", twosComp: "0111 (+7)", note: "Identical across all 3 forms" },
      { decimal: "+6", pattern: "0110", signMag: "0110 (+6)", onesComp: "0110 (+6)", twosComp: "0110 (+6)", note: "Identical across all 3 forms" },
      { decimal: "+5", pattern: "0101", signMag: "0101 (+5)", onesComp: "0101 (+5)", twosComp: "0101 (+5)", note: "Identical across all 3 forms" },
      { decimal: "+4", pattern: "0100", signMag: "0100 (+4)", onesComp: "0100 (+4)", twosComp: "0100 (+4)", note: "Identical across all 3 forms" },
      { decimal: "+3", pattern: "0011", signMag: "0011 (+3)", onesComp: "0011 (+3)", twosComp: "0011 (+3)", note: "Identical across all 3 forms" },
      { decimal: "+2", pattern: "0010", signMag: "0010 (+2)", onesComp: "0010 (+2)", twosComp: "0010 (+2)", note: "Identical across all 3 forms" },
      { decimal: "+1", pattern: "0001", signMag: "0001 (+1)", onesComp: "0001 (+1)", twosComp: "0001 (+1)", note: "Identical across all 3 forms" },
      { decimal: "+0", pattern: "0000", signMag: "0000 (+0)", onesComp: "0000 (+0)", twosComp: "0000 (Unique Zero)", note: "Positive Zero" },
      { decimal: "-0 / -8", pattern: "1000", signMag: "1000 (-0)", onesComp: "1111 (-0)", twosComp: "1000 (-8)", note: "2's comp gains -8 (Unique Zero advantage)" },
      { decimal: "-1", pattern: "1111", signMag: "1001 (-1)", onesComp: "1110 (-1)", twosComp: "1111 (-1)", note: "All-1s is always -1 in 2's comp" },
      { decimal: "-2", pattern: "1110", signMag: "1010 (-2)", onesComp: "1101 (-2)", twosComp: "1110 (-2)", note: "Sign bit = 1" },
      { decimal: "-3", pattern: "1101", signMag: "1011 (-3)", onesComp: "1100 (-3)", twosComp: "1101 (-3)", note: "Sign bit = 1" },
      { decimal: "-4", pattern: "1100", signMag: "1100 (-4)", onesComp: "1011 (-4)", twosComp: "1100 (-4)", note: "Sign bit = 1" },
      { decimal: "-5", pattern: "1011", signMag: "1101 (-5)", onesComp: "1010 (-5)", twosComp: "1011 (-5)", note: "Sign bit = 1" },
      { decimal: "-6", pattern: "1010", signMag: "1110 (-6)", onesComp: "1001 (-6)", twosComp: "1010 (-6)", note: "Sign bit = 1" },
      { decimal: "-7", pattern: "1001", signMag: "1111 (-7)", onesComp: "1000 (-7)", twosComp: "1001 (-7)", note: "Sign bit = 1" }
    ]
  },

  // ---------------------------------------------------------------------------
  // TAB 2: 1.6A THE THREE SIGNED REPRESENTATIONS
  // ---------------------------------------------------------------------------
  threeRepresentations: {
    signMagnitude: {
      id: "sign-magnitude",
      name: "Sign-Magnitude Form",
      subtitle: "Simplest Intuition, But Dual-Zero Hardware Penalty",
      stage1: {
        title: "Stage 1: Formal Mathematical Definition & Formula",
        rangeFormula: "-(2^(n-1) - 1) to +(2^(n-1) - 1)",
        range8Bit: "-127 to +127",
        valueFormula: "V = (-1)^(b_{n-1}) × sum_{i=0}^{n-2} b_i · 2^i",
        zeroRepresentation: "Two representations of zero: +0 = 00000000 and -0 = 10000000",
        variables: [
          { symbol: "n", meaning: "Total register bit width (leftmost bit is sign)" },
          { symbol: "b_{n-1}", meaning: "Sign bit at MSB (0 = positive, 1 = negative)" },
          { symbol: "b_{n-2}..b0", meaning: "Magnitude bits (pure absolute value |N|)" }
        ]
      },
      stage2: {
        title: "Stage 2: The Standard Classroom Method",
        steps: [
          { step: "Step 1", title: "Find Absolute Magnitude", desc: "Convert |N| into pure unsigned binary with n - 1 magnitude bits." },
          { step: "Step 2", title: "Affix the Sign Bit", desc: "If positive, set MSB b_{n-1} = 0. If negative, set MSB b_{n-1} = 1." },
          { step: "Step 3", title: "Assemble the Register", desc: "Place the sign bit at position n-1 followed by the magnitude bits." }
        ]
      },
      stage3: {
        title: "Stage 3: Fast Inspection Shortcut",
        rule: "To decode: Check bit b7. If 0, result is + (binary value of b6..b0). If 1, result is - (binary value of b6..b0).",
        drawback: "Hardware requires separate adder and subtractor logic circuits; dual zeros (+0 and -0) complicate logic equality checks."
      },
      models: [
        {
          id: "sm-model-1",
          conceptTag: "8-Bit Positive & Negative Pair",
          question: "Represent +45 and -45 in 8-bit Sign-Magnitude form.",
          stepByStep: [
            "1. Find binary representation of magnitude 45: 45 = 32 + 8 + 4 + 1 = (0101101)₂ (7 magnitude bits).",
            "2. For +45: Set Sign Bit b7 = 0. Magnitude bits b6..b0 = 0101101. Register: [0 0101101] = 00101101.",
            "3. For -45: Set Sign Bit b7 = 1. Magnitude bits b6..b0 remain 0101101. Register: [1 0101101] = 10101101."
          ],
          registerBits: ["1", "0", "1", "0", "1", "1", "0", "1"],
          signBit: "1",
          magnitudeBits: ["0", "1", "0", "1", "1", "0", "1"],
          finalValue: "-45 in 8-bit Sign-Magnitude: 10101101 (Hex: 0xAD)",
          verification: "+45 = 00101101; -45 = 10101101. Only the MSB differs!"
        },
        {
          id: "sm-model-2",
          conceptTag: "Boundary Values & Dual Zero",
          question: "Represent boundary values +127, -127, +0, and -0 in 8-bit Sign-Magnitude form.",
          stepByStep: [
            "1. Maximum magnitude in 7 bits is 2^7 - 1 = 127 = (1111111)₂.",
            "2. For +127: Sign Bit b7 = 0, Magnitude = 1111111 -> 01111111.",
            "3. For -127: Sign Bit b7 = 1, Magnitude = 1111111 -> 11111111.",
            "4. For +0: Sign Bit b7 = 0, Magnitude = 0000000 -> 00000000.",
            "5. For -0: Sign Bit b7 = 1, Magnitude = 0000000 -> 10000000."
          ],
          registerBits: ["1", "1", "1", "1", "1", "1", "1", "1"],
          signBit: "1",
          magnitudeBits: ["1", "1", "1", "1", "1", "1", "1"],
          finalValue: "-127 = 11111111; +127 = 01111111; -0 = 10000000; +0 = 00000000",
          verification: "Notice that 11111111 is -127 in Sign-Magnitude, but -1 in 2's Complement!"
        },
        {
          id: "sm-model-3",
          conceptTag: "Binary String Decoding",
          question: "Decode the 8-bit pattern 11010110 into Decimal assuming Sign-Magnitude representation.",
          stepByStep: [
            "1. Inspect the MSB (b7): b7 = 1, indicating a NEGATIVE number.",
            "2. Extract the remaining 7 magnitude bits (b6 down to b0): 1010110.",
            "3. Convert magnitude to Decimal: (1 × 64) + (0 × 32) + (1 × 16) + (0 × 8) + (1 × 4) + (1 × 2) + (0 × 1) = 64 + 16 + 4 + 2 = 86.",
            "4. Combine sign and magnitude: Result = -86."
          ],
          registerBits: ["1", "1", "0", "1", "0", "1", "1", "0"],
          signBit: "1",
          magnitudeBits: ["1", "0", "1", "0", "1", "1", "0"],
          finalValue: "Decimal Value: -86",
          verification: "b7 = 1 (-) and (1010110)₂ = 86₁₀ -> Result = -86."
        },
        {
          id: "sm-model-4",
          conceptTag: "Minimum Bit-Width Calculation",
          question: "Determine the minimum bit width n required to store the signed integer -200 in Sign-Magnitude form.",
          stepByStep: [
            "1. An n-bit Sign-Magnitude register can hold magnitudes up to 2^(n-1) - 1.",
            "2. We need 2^(n-1) - 1 >= 200, so 2^(n-1) >= 201.",
            "3. Test powers of 2: 2^7 = 128 (Too small, 127 < 200). 2^8 = 256 (255 >= 200, Valid!).",
            "4. Since n - 1 = 8, we require n = 9 bits minimum.",
            "5. In 9 bits: 200 = 0 11001000, so -200 = [1 11001000]₂."
          ],
          registerBits: ["1", "0", "1", "1", "0", "0", "1", "0", "0"],
          signBit: "1",
          magnitudeBits: ["0", "1", "1", "0", "0", "1", "0", "0"],
          finalValue: "Minimum Register Width: n = 9 bits (Pattern: 101100100)",
          verification: "8 bits only reaches -127. 9 bits covers -255 to +255."
        }
      ]
    },

    signedOnes: {
      id: "signed-ones",
      name: "Signed 1's Complement Form",
      subtitle: "Bit Inversion for Negatives, But End-Around Carry Overhead",
      stage1: {
        title: "Stage 1: Formal Mathematical Definition & Formula",
        rangeFormula: "-(2^(n-1) - 1) to +(2^(n-1) - 1)",
        range8Bit: "-127 to +127",
        valueFormula: "V = -b_{n-1}(2^(n-1) - 1) + sum_{i=0}^{n-2} b_i · 2^i",
        zeroRepresentation: "Two representations of zero: +0 = 00000000 and -0 = 11111111",
        variables: [
          { symbol: "n", meaning: "Total register bit width" },
          { symbol: "b_{n-1}", meaning: "Sign bit (0 = positive, 1 = negative)" },
          { symbol: "b_{n-2}..b0", meaning: "1's complement inverted value bits for negatives" }
        ]
      },
      stage2: {
        title: "Stage 2: The Standard Classroom Method",
        steps: [
          { step: "Step 1", title: "Write Positive Representation", desc: "Express +|N| as an n-bit binary number with leading zero at MSB." },
          { step: "Step 2", title: "Bit Inversion for Negative", desc: "If negative, invert EVERY single bit (0 -> 1 and 1 -> 0) across all n bits." },
          { step: "Step 3", title: "Verify Sign Bit", desc: "The MSB automatically flips from 0 to 1, confirming a negative number." }
        ]
      },
      stage3: {
        title: "Stage 3: Fast Inspection Shortcut",
        rule: "To decode a negative 1's complement number: Invert all bits back to positive, read the decimal magnitude, and prepend a minus sign.",
        drawback: "Requires End-Around Carry addition in hardware, slowing down arithmetic."
      },
      models: [
        {
          id: "ones-model-1",
          conceptTag: "8-Bit Positive & Negative Pair",
          question: "Represent +45 and -45 in 8-bit Signed 1's Complement form.",
          stepByStep: [
            "1. Express +45 as an 8-bit number: 45 = (00101101)₂ with MSB = 0.",
            "2. For +45: Register is 00101101.",
            "3. For -45: Take the 1's complement by inverting all 8 bits: NOT(00101101) = 11010010.",
            "4. Check MSB: b7 = 1, confirming negative."
          ],
          registerBits: ["1", "1", "0", "1", "0", "0", "1", "0"],
          signBit: "1",
          magnitudeBits: ["1", "0", "1", "0", "0", "1", "0"],
          finalValue: "-45 in Signed 1's Complement: 11010010 (Hex: 0xD2)",
          verification: "Inverting 11010010 returns 00101101 = +45."
        },
        {
          id: "ones-model-2",
          conceptTag: "Boundary Values & Dual Zero",
          question: "Represent boundary values +127, -127, +0, and -0 in 8-bit Signed 1's Complement form.",
          stepByStep: [
            "1. +127 in 8 bits: 01111111.",
            "2. -127: Invert all 8 bits of +127: NOT(01111111) = 10000000.",
            "3. +0 in 8 bits: 00000000.",
            "4. -0: Invert all 8 bits of +0: NOT(00000000) = 11111111."
          ],
          registerBits: ["1", "0", "0", "0", "0", "0", "0", "0"],
          signBit: "1",
          magnitudeBits: ["0", "0", "0", "0", "0", "0", "0"],
          finalValue: "-127 = 10000000; +127 = 01111111; -0 = 11111111; +0 = 00000000",
          verification: "Notice that 10000000 is -127 in 1's Comp, but -128 in 2's Comp!"
        },
        {
          id: "ones-model-3",
          conceptTag: "Binary String Decoding",
          question: "Decode the 8-bit pattern 11010110 into Decimal assuming Signed 1's Complement representation.",
          stepByStep: [
            "1. Check MSB: b7 = 1, meaning the number is NEGATIVE.",
            "2. Invert all bits to recover the positive magnitude: NOT(11010110) = 00101001.",
            "3. Convert 00101001 to Decimal: 32 + 8 + 1 = 41.",
            "4. Prepend minus sign: Result = -41."
          ],
          registerBits: ["1", "1", "0", "1", "0", "1", "1", "0"],
          signBit: "1",
          magnitudeBits: ["1", "0", "1", "0", "1", "1", "0"],
          finalValue: "Decimal Value: -41",
          verification: "-(NOT(11010110)₂) = -(00101001₂) = -41₁₀."
        },
        {
          id: "ones-model-4",
          conceptTag: "Minimum Bit-Width Calculation",
          question: "Determine the minimum bit width n required to store -70 in Signed 1's Complement form.",
          stepByStep: [
            "1. Signed 1's complement range: -(2^(n-1) - 1) to +(2^(n-1) - 1).",
            "2. For n = 7: -(2^6 - 1) = -(64 - 1) = -63 (Cannot store -70!).",
            "3. For n = 8: -(2^7 - 1) = -(128 - 1) = -127 (-127 <= -70 <= +127, Valid!).",
            "4. Minimum bit width is n = 8 bits.",
            "5. In 8 bits: +70 = 01000110. Inverting gives -70 = 10111001."
          ],
          registerBits: ["1", "0", "1", "1", "1", "0", "0", "1"],
          signBit: "1",
          magnitudeBits: ["0", "1", "1", "1", "0", "0", "1"],
          finalValue: "Minimum Register Width: n = 8 bits (Pattern: 10111001)",
          verification: "7 bits holds down to -63. 8 bits holds down to -127."
        }
      ]
    },

    signedTwos: {
      id: "signed-twos",
      name: "Signed 2's Complement Form (CPU Standard)",
      subtitle: "Universal Hardware Standard: Single Zero & Unified Addition ALU",
      stage1: {
        title: "Stage 1: Formal Mathematical Definition & Formula",
        rangeFormula: "-2^(n-1) to +(2^(n-1) - 1)",
        range8Bit: "-128 to +127",
        negativeMsbWeightFormula: "V = -b_{n-1} · 2^{n-1} + sum_{i=0}^{n-2} b_i · 2^i",
        zeroRepresentation: "Single unique zero: 00000000 (0x00). Pattern 10000000 is used for -128.",
        variables: [
          { symbol: "n", meaning: "Total register bit width (e.g., n = 8 bits)" },
          { symbol: "-2^{n-1}", meaning: "Positional weight of MSB (for n=8, weight is -128)" },
          { symbol: "b_{n-2}..b0", meaning: "Remaining bits carry normal positive weights (+64, +32, ..., +1)" }
        ]
      },
      stage2: {
        title: "Stage 2: The Standard Classroom Method",
        steps: [
          { step: "Step 1", title: "Write Positive Representation", desc: "Express +|N| as an n-bit binary number with leading zero at MSB." },
          { step: "Step 2", title: "Invert All Bits", desc: "Take the 1's complement of the positive n-bit representation (NOT operation)." },
          { step: "Step 3", title: "Add 1 to the LSB", desc: "Add 1 to the least significant bit (LSB) to obtain the exact 2's complement." }
        ]
      },
      stage3: {
        title: "Stage 3: The 3-Second Negative MSB Weight Shortcut",
        rule: "Treat bit b7 as -128 and add the positive weights of every '1' bit in b6..b0! Example: 11111111 = -128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = -1.",
        whyItWorks: "Because 2's complement is mathematically defined such that MSB carries weight -2^(n-1). No inversion or adding 1 needed for decoding!"
      },
      models: [
        {
          id: "twos-model-1",
          conceptTag: "8-Bit Positive & Negative Pair",
          question: "Represent +45 and -45 in 8-bit Signed 2's Complement form.",
          stepByStep: [
            "1. Write +45 in 8 bits: 45 = 32 + 8 + 4 + 1 = 00101101.",
            "2. For +45: Register is 00101101 (Identical to Sign-Magnitude and 1's Comp).",
            "3. For -45: Take 1's complement of 00101101 -> 11010010.",
            "4. Add 1 to LSB: 11010010 + 1 = 11010011.",
            "5. Shortcut Check: -128 + 64 + 16 + 2 + 1 = -128 + 83 = -45."
          ],
          registerBits: ["1", "1", "0", "1", "0", "0", "1", "1"],
          signBit: "1",
          magnitudeBits: ["1", "0", "1", "0", "0", "1", "1"],
          finalValue: "-45 in Signed 2's Complement: 11010011 (Hex: 0xD3)",
          verification: "-128 + 64 + 16 + 2 + 1 = -45. Verified in 2 seconds!"
        },
        {
          id: "twos-model-2",
          conceptTag: "Boundary Values & Asymmetric -128",
          question: "Represent boundary values +127, -127, -128, and 0 in 8-bit Signed 2's Complement form.",
          stepByStep: [
            "1. +127 in 8 bits: 01111111 (Hex: 0x7F).",
            "2. -127: Invert 01111111 -> 10000000, add 1 -> 10000001 (Hex: 0x81). Check: -128 + 1 = -127.",
            "3. -128: 10000000 (Hex: 0x80). Check: MSB weight is -128 + 0 = -128. (Notice: +128 does not exist in 8 bits!).",
            "4. Zero: 00000000. Negating zero: NOT(00000000) + 1 = 11111111 + 1 = 1 00000000 -> Discard carry -> 00000000 (Single unique zero!)."
          ],
          registerBits: ["1", "0", "0", "0", "0", "0", "0", "0"],
          signBit: "1",
          magnitudeBits: ["0", "0", "0", "0", "0", "0", "0"],
          finalValue: "-128 = 10000000; -127 = 10000001; +127 = 01111111; 0 = 00000000",
          verification: "10000000 has no positive equivalent in 8 bits; its 2's complement is itself."
        },
        {
          id: "twos-model-3",
          conceptTag: "Binary String Decoding (3-Way Compare)",
          question: "Decode 11010110 in 8-bit Signed 2's Complement and compare with Sign-Magnitude and 1's Complement.",
          stepByStep: [
            "1. Using Negative MSB Weight Shortcut:",
            "   Bit weights: b7(-128), b6(64), b5(32), b4(16), b3(8), b2(4), b1(2), b0(1)",
            "   Pattern 11010110 = -128 + 64 + 0 + 16 + 0 + 4 + 2 + 0 = -128 + 86 = -42.",
            "2. Comparison across all 3 schemes for pattern 11010110:",
            "   - Sign-Magnitude: -86",
            "   - Signed 1's Complement: -41",
            "   - Signed 2's Complement: -42"
          ],
          registerBits: ["1", "1", "0", "1", "0", "1", "1", "0"],
          signBit: "1",
          magnitudeBits: ["1", "0", "1", "0", "1", "1", "0"],
          finalValue: "2's Complement Value: -42 (Compare: SM = -86, 1's = -41)",
          verification: "-128 + 64 + 16 + 4 + 2 = -42. Notice 2's comp is exactly 1 less than 1's comp (-42 vs -41)!"
        },
        {
          id: "twos-model-4",
          conceptTag: "Minimum Bit-Width Calculation",
          question: "Determine the minimum bit width n required to store -128 and -129 in Signed 2's Complement form.",
          stepByStep: [
            "1. An n-bit 2's complement register covers range: -2^(n-1) to +(2^(n-1) - 1).",
            "2. For -128: When n = 8, minimum value is -2^(8-1) = -2^7 = -128. Thus, n = 8 bits is sufficient!",
            "3. For -129: -129 falls below -128, so 8 bits cannot store it.",
            "4. For n = 9: Range is -2^8 to +(2^8 - 1) = -256 to +255. Thus, -129 requires n = 9 bits minimum.",
            "5. 9-bit pattern for -129: +129 = 0 10000001 -> Invert: 1 01111110 -> Add 1: 1 01111111."
          ],
          registerBits: ["1", "0", "1", "1", "1", "1", "1", "1", "1"],
          signBit: "1",
          magnitudeBits: ["0", "1", "1", "1", "1", "1", "1", "1"],
          finalValue: "For -128: n = 8 bits; For -129: n = 9 bits (Pattern: 101111111)",
          verification: "Classic exam question! -128 fits in 8 bits, but +128 requires 9 bits."
        }
      ]
    },

    practiceQuestions: [
      {
        id: "p16a-1",
        question: "Represent -75 in 8-bit Sign-Magnitude, Signed 1's Complement, and Signed 2's Complement forms.",
        difficulty: "Medium",
        conceptTag: "3-Scheme Register Mapping",
        solution: {
          steps: [
            "1. +75 in 8-bit binary: 75 = 64 + 8 + 2 + 1 = 01001011.",
            "2. Sign-Magnitude: Change MSB to 1 -> 11001011.",
            "3. Signed 1's Complement: Invert all 8 bits -> 10110100.",
            "4. Signed 2's Complement: Invert and add 1 -> 10110100 + 1 = 10110101."
          ],
          final: "SM: 11001011 | 1's: 10110100 | 2's: 10110101",
          verification: "In 2's: -128 + 32 + 16 + 4 + 1 = -75."
        }
      },
      {
        id: "p16a-2",
        question: "Decode the 8-bit binary string 10101010 into Decimal for all three signed representations.",
        difficulty: "Medium",
        conceptTag: "3-Scheme Decoding",
        solution: {
          steps: [
            "1. MSB is 1 (Negative across all schemes).",
            "2. Sign-Magnitude: Magnitude = 0101010 = 32 + 8 + 2 = 42 -> Result: -42.",
            "3. Signed 1's Comp: Invert 10101010 -> 01010101 = 64 + 16 + 4 + 1 = 85 -> Result: -85.",
            "4. Signed 2's Comp: Weight method: -128 + 32 + 8 + 2 = -86 (or -85 - 1 = -86)."
          ],
          final: "SM: -42 | 1's: -85 | 2's: -86",
          verification: "Notice that 2's comp (-86) is exactly 1 less than 1's comp (-85)."
        }
      },
      {
        id: "p16a-3",
        question: "What integer value is represented by the 8-bit pattern 11111111 in (a) Unsigned, (b) Sign-Magnitude, (c) Signed 1's Comp, (d) Signed 2's Comp?",
        difficulty: "Hard",
        conceptTag: "Pattern 0xFF Analysis",
        solution: {
          steps: [
            "(a) Unsigned: 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255.",
            "(b) Sign-Magnitude: b7=1 (-), magnitude = 1111111 = 127 -> -127.",
            "(c) Signed 1's Comp: NOT(11111111) = 00000000 = 0 -> -0 (Negative zero).",
            "(d) Signed 2's Comp: -128 + 127 = -1."
          ],
          final: "Unsigned: 255 | SM: -127 | 1's: -0 | 2's: -1",
          verification: "A favorite viva/interview question! The exact same bit pattern means 4 different values."
        }
      },
      {
        id: "p16a-4",
        question: "Find the minimum number of bits n needed to represent -64 in (a) Sign-Magnitude, (b) Signed 2's Complement.",
        difficulty: "Medium",
        conceptTag: "Bit-Width Boundary",
        solution: {
          steps: [
            "(a) Sign-Magnitude: Range is -(2^(n-1) - 1) to +(2^(n-1) - 1). For n=7, min is -(64-1) = -63. So -64 requires n = 8 bits.",
            "(b) Signed 2's Complement: Range is -2^(n-1) to +(2^(n-1) - 1). For n=7, min is -2^6 = -64. Thus, n = 7 bits is sufficient!"
          ],
          final: "Sign-Magnitude: 8 bits | 2's Complement: 7 bits",
          verification: "In 7-bit 2's complement: 1000000 = -64."
        }
      },
      {
        id: "p16a-5",
        question: "Represent -1 in an 8-bit register using Signed 2's Complement and show why all bits must be 1.",
        difficulty: "Easy",
        conceptTag: "All-1s Representation",
        solution: {
          steps: [
            "1. +1 in 8 bits: 00000001.",
            "2. Invert all bits: 11111110.",
            "3. Add 1 to LSB: 11111110 + 1 = 11111111.",
            "4. Check with MSB weight: -128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = -128 + 127 = -1."
          ],
          final: "-1 in 8-bit 2's complement = 11111111 (Hex: 0xFF)",
          verification: "In any n-bit 2's complement system, all 1s is ALWAYS -1."
        }
      },
      {
        id: "p16a-6",
        question: "What is the 8-bit 2's complement of the number 10000000 (-128)? Explain the mathematical paradox.",
        difficulty: "Hard",
        conceptTag: "2's Complement Paradox",
        solution: {
          steps: [
            "1. Given pattern: 10000000 (which represents -128).",
            "2. Take 1's complement: Invert all bits -> 01111111.",
            "3. Add 1 to LSB: 01111111 + 1 = 10000000.",
            "4. Notice the result is identical to the original pattern: 10000000!",
            "5. Paradox Reason: In an 8-bit signed system, numbers range from -128 to +127. The positive value +128 DOES NOT EXIST! Attempting to negate -128 produces an arithmetic overflow."
          ],
          final: "2's complement of 10000000 is 10000000 (Overflow: +128 cannot be represented in 8 bits)",
          verification: "To represent +128, at least 9 bits are required: 0 10000000."
        }
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // TAB 3: 1.6B SIGNED 2'S COMPLEMENT ARITHMETIC (ALL 4 SIGN COMBINATIONS)
  // ---------------------------------------------------------------------------
  signedArithmetic: {
    title: "Signed 2's Complement Arithmetic: The 4 Sign Cases",
    subtitle: "Why CPUs Use One Single Adder for Both Addition and Subtraction",
    hardwarePrinciple: "In 2's complement arithmetic, the ALU treats the Sign Bit (b7) just like any other data bit. Addition is performed blindly from LSB to MSB. If an extra carry-out occurs past the MSB (C8 = 1), it is simply DISCARDED as long as no overflow occurred. The sign of the result is automatically correct!",
    fourCases: [
      {
        id: "case-1",
        label: "Case 1: (+A) + (+B)  -  Positive + Positive",
        description: "Both inputs are positive. No end-around carry. Result is positive.",
        example: "(+35) + (+42) = +77",
        model: {
          id: "arith-model-1",
          title: "Model 1 (Case 1: Positive + Positive)",
          conceptTag: "Case 1: (+A) + (+B)",
          question: "Perform (+35) + (+42) in 8-bit signed 2's complement arithmetic.",
          aDec: "+35",
          aBin: "00100011",
          bDec: "+42",
          bBin: "00101010",
          carryRow: ["0", "0", "0", "0", "0", "0", "0", "0"],
          carryOut: "0",
          sumBin: "01001101",
          sumDec: "+77",
          signBit: "0",
          overflow: false,
          discardCarry: "Carry out C8 = 0. No carry discarded.",
          stepByStep: [
            "1. Convert +35 to 8-bit binary: 35 = 32 + 2 + 1 = 00100011 (Sign bit b7 = 0).",
            "2. Convert +42 to 8-bit binary: 42 = 32 + 8 + 2 = 00101010 (Sign bit b7 = 0).",
            "3. Add column by column from b0 to b7.",
            "4. Carry into sign bit C7 = 0; Carry out of sign bit C8 = 0.",
            "5. Result MSB b7 = 0 (Positive). Magnitude: 64 + 8 + 4 + 1 = 77."
          ],
          verification: "+35 + +42 = +77. Register 01001101 = 64 + 8 + 4 + 1 = +77."
        }
      },
      {
        id: "case-2",
        label: "Case 2: (+A) + (-B) where A > B  -  Positive + Smaller Negative",
        description: "Sum is positive. Generates Carry-Out C8 = 1, which is discarded.",
        example: "(+45) + (-27) = +18",
        model: {
          id: "arith-model-2",
          title: "Model 2 (Case 2: Positive + Smaller Negative)",
          conceptTag: "Case 2: (+A) + (-B) [Result > 0]",
          question: "Perform (+45) + (-27) in 8-bit signed 2's complement arithmetic.",
          aDec: "+45",
          aBin: "00101101",
          bDec: "-27",
          bBin: "11100101",
          carryRow: ["1", "1", "0", "0", "1", "1", "1", "0"],
          carryOut: "1",
          sumBin: "00010010",
          sumDec: "+18",
          signBit: "0",
          overflow: false,
          discardCarry: "Carry out C8 = 1 is DISCARDED by hardware. The remaining 8 bits form the correct answer.",
          stepByStep: [
            "1. +45 in 8 bits: 00101101.",
            "2. +27 in 8 bits = 00011011 -> Invert: 11100100 -> Add 1: -27 = 11100101.",
            "3. Add (+45) and (-27):",
            "     00101101  (+45)",
            "   + 11100101  (-27)",
            "   = (1) 00010010",
            "4. The carry-out C8 = 1 is discarded.",
            "5. Check remaining 8 bits: 00010010 = 16 + 2 = +18 (Sign bit b7 = 0, positive)."
          ],
          verification: "+45 - 27 = +18. Register 00010010 = 16 + 2 = +18."
        }
      },
      {
        id: "case-3",
        label: "Case 3: (+A) + (-B) where A < B  -  Positive + Larger Negative",
        description: "Sum is negative. No carry-out generated (C8 = 0). Result is in 2's complement form.",
        example: "(+27) + (-45) = -18",
        model: {
          id: "arith-model-3",
          title: "Model 3 (Case 3: Positive + Larger Negative)",
          conceptTag: "Case 3: (+A) + (-B) [Result < 0]",
          question: "Perform (+27) + (-45) in 8-bit signed 2's complement arithmetic.",
          aDec: "+27",
          aBin: "00011011",
          bDec: "-45",
          bBin: "11010011",
          carryRow: ["0", "0", "0", "1", "0", "1", "1", "0"],
          carryOut: "0",
          sumBin: "11101110",
          sumDec: "-18",
          signBit: "1",
          overflow: false,
          discardCarry: "Carry out C8 = 0. No carry generated.",
          stepByStep: [
            "1. +27 in 8 bits: 00011011.",
            "2. -45 in 8 bits 2's complement: 11010011.",
            "3. Add (+27) and (-45):",
            "     00011011  (+27)",
            "   + 11010011  (-45)",
            "   = 11101110",
            "4. Sign bit b7 = 1, confirming a negative result.",
            "5. Decode 11101110 using MSB weight shortcut: -128 + 64 + 32 + 8 + 4 + 2 = -128 + 110 = -18."
          ],
          verification: "+27 - 45 = -18. Decode 11101110: NOT(11101110)+1 = 00010001+1 = 18 -> -18."
        }
      },
      {
        id: "case-4",
        label: "Case 4: (-A) + (-B)  -  Negative + Negative",
        description: "Both inputs negative. Generates Carry-Out C8 = 1 which is discarded. Result is negative.",
        example: "(-35) + (-42) = -77",
        model: {
          id: "arith-model-4",
          title: "Model 4 (Case 4: Negative + Negative)",
          conceptTag: "Case 4: (-A) + (-B)",
          question: "Perform (-35) + (-42) in 8-bit signed 2's complement arithmetic.",
          aDec: "-35",
          aBin: "11011101",
          bDec: "-42",
          bBin: "11010110",
          carryRow: ["1", "1", "1", "1", "1", "0", "0", "0"],
          carryOut: "1",
          sumBin: "10110011",
          sumDec: "-77",
          signBit: "1",
          overflow: false,
          discardCarry: "Carry out C8 = 1 is DISCARDED by hardware. The 8-bit sum 10110011 correctly represents -77.",
          stepByStep: [
            "1. +35 = 00100011 -> -35 = 11011101.",
            "2. +42 = 00101010 -> -42 = 11010110.",
            "3. Add (-35) and (-42):",
            "     11011101  (-35)",
            "   + 11010110  (-42)",
            "   = (1) 10110011",
            "4. Carry-out C8 = 1 is discarded.",
            "5. Decode 10110011: -128 + 32 + 16 + 2 + 1 = -128 + 51 = -77. Result is -77!"
          ],
          verification: "-35 + -42 = -77. Pattern 10110011 = -128 + 51 = -77."
        }
      }
    ],
    practiceQuestions: [
      {
        id: "p16b-1",
        question: "Perform (+52) + (+29) in 8-bit signed 2's complement arithmetic.",
        difficulty: "Easy",
        conceptTag: "Case 1 Addition",
        solution: {
          steps: [
            "+52 = 00110100",
            "+29 = 00011101",
            "Sum = 00110100 + 00011101 = 01010001",
            "Sign bit b7 = 0. Value = 64 + 16 + 1 = +81.",
            "Carry-in to sign bit C7 = 0, Carry-out C8 = 0. No overflow."
          ],
          final: "01010001 (+81₁₀)",
          verification: "+52 + +29 = +81. Matches exactly."
        }
      },
      {
        id: "p16b-2",
        question: "Perform (+60) + (-25) in 8-bit signed 2's complement arithmetic.",
        difficulty: "Medium",
        conceptTag: "Case 2 Addition",
        solution: {
          steps: [
            "+60 = 00111100",
            "+25 = 00011001 -> -25 = 11100111",
            "Sum = 00111100 + 11100111 = (1) 00100011",
            "Discard carry-out C8 = 1.",
            "Remaining 8 bits: 00100011 = 32 + 2 + 1 = +35."
          ],
          final: "00100011 (+35₁₀)",
          verification: "+60 - 25 = +35. Discarded carry-out is completely normal."
        }
      },
      {
        id: "p16b-3",
        question: "Perform (+19) + (-48) in 8-bit signed 2's complement arithmetic.",
        difficulty: "Medium",
        conceptTag: "Case 3 Addition",
        solution: {
          steps: [
            "+19 = 00010011",
            "+48 = 00110000 -> -48 = 11010000",
            "Sum = 00010011 + 11010000 = 11100011",
            "Sign bit b7 = 1 (Negative result).",
            "Decode: -128 + 64 + 32 + 2 + 1 = -128 + 99 = -29."
          ],
          final: "11100011 (-29₁₀)",
          verification: "+19 - 48 = -29. Verified."
        }
      },
      {
        id: "p16b-4",
        question: "Perform (-20) + (-55) in 8-bit signed 2's complement arithmetic.",
        difficulty: "Medium",
        conceptTag: "Case 4 Addition",
        solution: {
          steps: [
            "+20 = 00010100 -> -20 = 11101100",
            "+55 = 00110111 -> -55 = 11001001",
            "Sum = 11101100 + 11001001 = (1) 10110101",
            "Discard carry-out C8 = 1.",
            "Remaining 8 bits: 10110101 = -128 + 32 + 16 + 4 + 1 = -75."
          ],
          final: "10110101 (-75₁₀)",
          verification: "-20 + -55 = -75. C8 = 1 discarded."
        }
      },
      {
        id: "p16b-5",
        question: "Explain what happens when (+50) - (+20) is computed in a 2's complement CPU.",
        difficulty: "Easy",
        conceptTag: "Subtraction via Addition",
        solution: {
          steps: [
            "1. Subtraction A - B is transformed by hardware into A + (-B).",
            "2. -B is produced by inverting bits of B through XOR gates and setting Carry-in C0 = 1.",
            "3. Compute (+50) + (-20): 00110010 + 11101100 = (1) 00011110.",
            "4. Carry-out is discarded. Result: 00011110 = 16 + 8 + 4 + 2 = +30."
          ],
          final: "00011110 (+30₁₀)",
          verification: "50 - 20 = 30. A single adder handles both addition and subtraction."
        }
      },
      {
        id: "p16b-6",
        question: "Compute (-1) + (+1) in an 8-bit 2's complement register and verify the result.",
        difficulty: "Easy",
        conceptTag: "Additive Inverse",
        solution: {
          steps: [
            "-1 in 8-bit 2's complement: 11111111",
            "+1 in 8-bit binary: 00000001",
            "Sum = 11111111 + 00000001 = (1) 00000000",
            "Carry-out C8 = 1 is discarded.",
            "Remaining register: 00000000 = 0."
          ],
          final: "00000000 (0₁₀)",
          verification: "-1 + 1 = 0. Perfect mathematical cancellation!"
        }
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // TAB 4: 1.6C OVERFLOW DETECTION & SIGN-BIT EXTENSION
  // ---------------------------------------------------------------------------
  overflowSignExtension: {
    title: "Arithmetic Overflow Detection & Sign-Bit Extension",
    subtitle: "Hardware Guardrails Against Silent Calculation Corruption",
    overflowConcept: {
      explanation: "An 8-bit signed 2's complement register can only hold numbers in the range -128 to +127. If the mathematical sum of two numbers falls outside this range (e.g., +85 + +65 = +150), the result cannot fit into 7 magnitude bits and spills into the Sign Bit (b7), turning the answer negative! This calculation failure is called Arithmetic Overflow.",
      threeRules: [
        {
          number: "1",
          title: "When Overflow is Impossible",
          rule: "When adding two numbers of OPPOSITE signs ((+) + (-)), overflow is mathematically IMPOSSIBLE because the sum's absolute value is always smaller than the larger operand."
        },
        {
          number: "2",
          title: "Visual Sign-Contradiction Check (Human Rule)",
          rule: "Overflow occurs IF AND ONLY IF adding two operands of the SAME sign yields a result of the OPPOSITE sign: (+) + (+) = (-) OR (-) + (-) = (+)."
        },
        {
          number: "3",
          title: "Hardware XOR Gate Detector: V = Cin ⊕ Cout",
          rule: "In silicon, an XOR gate compares the Carry INTO the sign bit (C_{n-1}) and the Carry OUT of the sign bit (C_n). Overflow Flag V = C_{n-1} ⊕ C_n. If Cin == Cout -> V = 0 (No Overflow). If Cin != Cout -> V = 1 (OVERFLOW!)."
        }
      ]
    },
    signExtensionConcept: {
      explanation: "When copying a k-bit signed number into an n-bit register (where n > k), the value must not change. In 2's complement, this is accomplished by SIGN-BIT EXTENSION: Replicate the Sign Bit (MSB) into all newly added bit positions on the left.",
      examples: [
        { original: "4-bit: 0101 (+5)", extended: "8-bit: 0000 0101 (+5)", rule: "MSB was 0, so pad four 0s on the left." },
        { original: "4-bit: 1011 (-5)", extended: "8-bit: 1111 1011 (-5)", rule: "MSB was 1, so pad four 1s on the left. Check: -128 + 64 + 32 + 16 + 8 + 2 + 1 = -5!" }
      ]
    },
    models: [
      {
        id: "of-model-1",
        conceptTag: "Positive Overflow (Cin != Cout)",
        title: "Model 1: Positive Overflow Detection",
        question: "Perform (+85) + (+65) in 8-bit signed 2's complement. Trace Cin and Cout at the sign bit to verify overflow.",
        aDec: "+85",
        aBin: "01010101",
        bDec: "+65",
        bBin: "01000001",
        carryRow: ["0", "1", "0", "0", "0", "0", "0", "0"],
        cIn: "1",
        cOut: "0",
        xorResult: "1",
        sumBin: "10010110",
        sumDec: "-106 (Corrupted!)",
        overflow: true,
        stepByStep: [
          "1. +85 = 01010101 (b7 = 0, positive).",
          "2. +65 = 01000001 (b7 = 0, positive).",
          "3. Expected mathematical result: +85 + +65 = +150 (Exceeds maximum 8-bit limit +127!).",
          "4. Addition: 01010101 + 01000001 = 10010110.",
          "5. Check Sign Bit: Result b7 = 1 (Negative! Two positives produced a negative -> Sign contradiction!).",
          "6. Check Hardware XOR: Carry into b7 is C7 = 1; Carry out of b7 is C8 = 0.",
          "   V = C7 ⊕ C8 = 1 ⊕ 0 = 1 (OVERFLOW FLAG SET!).",
          "7. The register reads -106 instead of +150 due to overflow."
        ],
        verification: "V = 1 ⊕ 0 = 1. True sum 150 > 127. Overflow confirmed."
      },
      {
        id: "of-model-2",
        conceptTag: "Negative Overflow (Cin != Cout)",
        title: "Model 2: Negative Overflow Detection",
        question: "Perform (-75) + (-68) in 8-bit signed 2's complement. Show why overflow occurs.",
        aDec: "-75",
        aBin: "10110101",
        bDec: "-68",
        bBin: "10111100",
        carryRow: ["1", "0", "1", "1", "1", "0", "0", "0"],
        cIn: "0",
        cOut: "1",
        xorResult: "1",
        sumBin: "01110001",
        sumDec: "+113 (Corrupted!)",
        overflow: true,
        stepByStep: [
          "1. +75 = 01001011 -> -75 = 10110101.",
          "2. +68 = 01000100 -> -68 = 10111100.",
          "3. Expected mathematical result: -75 + -68 = -143 (Below minimum limit -128!).",
          "4. Addition: 10110101 + 10111100 = (1) 01110001.",
          "5. Check Sign Bit: Result b7 = 0 (Positive! Two negatives produced a positive -> Sign contradiction!).",
          "6. Check Hardware XOR: Carry into b7 is C7 = 0; Carry out of b7 is C8 = 1.",
          "   V = C7 ⊕ C8 = 0 ⊕ 1 = 1 (OVERFLOW FLAG SET!).",
          "7. The register reads +113 instead of -143."
        ],
        verification: "V = 0 ⊕ 1 = 1. True sum -143 < -128. Negative overflow confirmed."
      },
      {
        id: "of-model-3",
        conceptTag: "Valid Negative Sum (Cin == Cout == 1)",
        title: "Model 3: Why Carry-Out Alone is NOT Overflow",
        question: "Perform (-30) + (-40) in 8-bit signed 2's complement. Explain why Cout = 1 does NOT mean overflow.",
        aDec: "-30",
        aBin: "11100010",
        bDec: "-40",
        bBin: "11011000",
        carryRow: ["1", "1", "1", "0", "0", "0", "0", "0"],
        cIn: "1",
        cOut: "1",
        xorResult: "0",
        sumBin: "10111010",
        sumDec: "-70",
        overflow: false,
        stepByStep: [
          "1. -30 = 11100010; -40 = 11011000.",
          "2. Expected sum: -30 + -40 = -70 (Within valid range -128 to +127).",
          "3. Addition: 11100010 + 11011000 = (1) 10111010.",
          "4. Check Carries at sign bit: C7 = 1 (Carry into b7), C8 = 1 (Carry out of b7).",
          "5. Hardware XOR Check: V = C7 ⊕ C8 = 1 ⊕ 1 = 0 (NO OVERFLOW!).",
          "6. The carry-out C8 = 1 is discarded as normal. The result 10111010 correctly represents -70.",
          "7. KEY LESSON: In signed arithmetic, Carry-Out = 1 is completely normal! Only Cin != Cout indicates overflow."
        ],
        verification: "V = 1 ⊕ 1 = 0. Result -70 is valid. Carry-out was safely discarded."
      },
      {
        id: "of-model-4",
        conceptTag: "Sign Extension (4-Bit to 8-Bit)",
        title: "Model 4: Sign-Bit Extension Proof",
        question: "Extend the 5-bit signed 2's complement numbers +11 (01011) and -11 (10101) to 8-bit registers. Prove their decimal values stay unchanged.",
        aDec: "+11 (5-bit: 01011)",
        aBin: "00001011",
        bDec: "-11 (5-bit: 10101)",
        bBin: "11110101",
        stepByStep: [
          "1. For +11 (5-bit: 01011):",
          "   MSB is 0. Extend by padding three 0s to the left: 0000 1011.",
          "   Value in 8 bits: 8 + 2 + 1 = +11 (Unchanged!).",
          "2. For -11 (5-bit: 10101):",
          "   MSB is 1. Extend by padding three 1s to the left: 1111 0101.",
          "   Decode in 8 bits: -128 + 64 + 32 + 16 + 0 + 4 + 0 + 1 = -128 + 117 = -11 (Unchanged!).",
          "3. Mathematical Principle: Adding leading 1s to a negative number adds -2^7 + 2^6 + 2^5 + 2^4 = -128 + 112 = -16, exactly offsetting the original 5-bit sign weight (-16)."
        ],
        finalValue: "+11 -> 00001011 | -11 -> 11110101",
        verification: "Both values remain mathematically identical after extension."
      }
    ],
    practiceQuestions: [
      {
        id: "p16c-1",
        question: "Determine whether adding (+90) + (+45) in 8-bit signed 2's complement causes overflow.",
        difficulty: "Easy",
        conceptTag: "Positive Overflow Check",
        solution: {
          steps: [
            "+90 = 01011010",
            "+45 = 00101101",
            "Sum = 01011010 + 00101101 = 10000111",
            "Two positive numbers produced a negative result (b7 = 1).",
            "Carry in C7 = 1, Carry out C8 = 0. V = 1 ⊕ 0 = 1 (OVERFLOW!).",
            "True sum is +135, which exceeds +127."
          ],
          final: "OVERFLOW DETECTED (V = 1)",
          verification: "90 + 45 = 135 > 127."
        }
      },
      {
        id: "p16c-2",
        question: "Determine whether adding (-90) + (-45) in 8-bit signed 2's complement causes overflow.",
        difficulty: "Easy",
        conceptTag: "Negative Overflow Check",
        solution: {
          steps: [
            "-90 = 10100110",
            "-45 = 11010011",
            "Sum = 10100110 + 11010011 = (1) 01111001",
            "Two negative numbers produced a positive result (b7 = 0).",
            "Carry in C7 = 0, Carry out C8 = 1. V = 0 ⊕ 1 = 1 (OVERFLOW!).",
            "True sum is -135, which is less than -128."
          ],
          final: "OVERFLOW DETECTED (V = 1)",
          verification: "-90 + -45 = -135 < -128."
        }
      },
      {
        id: "p16c-3",
        question: "Can adding (+110) + (-80) cause an overflow in an 8-bit signed 2's complement system? Explain why or why not without adding.",
        difficulty: "Easy",
        conceptTag: "Opposite Sign Immunity",
        solution: {
          steps: [
            "1. Operands have opposite signs: one is positive (+110) and one is negative (-80).",
            "2. When adding numbers of opposite signs, the sum (+30) must have a magnitude strictly less than the larger operand (+110).",
            "3. Since +110 already fits in 8 bits, the sum +30 is guaranteed to fit in 8 bits.",
            "4. Conclusion: Overflow is mathematically IMPOSSIBLE when operands have opposite signs."
          ],
          final: "NO OVERFLOW (Mathematically impossible for opposite signs)",
          verification: "110 + (-80) = +30, well within -128 to +127."
        }
      },
      {
        id: "p16c-4",
        question: "Extend the 4-bit 2's complement number 1100 (-4) to 8 bits and 16 bits.",
        difficulty: "Medium",
        conceptTag: "Multi-Width Sign Extension",
        solution: {
          steps: [
            "1. Given 4-bit number: 1100. Sign bit is 1 (negative).",
            "2. 8-bit extension: Pad four 1s on the left -> 1111 1100.",
            "   Check: -128 + 64 + 32 + 16 + 8 + 4 = -4.",
            "3. 16-bit extension: Pad twelve 1s on the left -> 1111 1111 1111 1100 (Hex: 0xFFFC).",
            "   Value remains -4."
          ],
          final: "8-bit: 11111100 | 16-bit: 1111111111111100",
          verification: "In both registers, decimal value is strictly -4."
        }
      },
      {
        id: "p16c-5",
        question: "In an n-bit adder, if C_{n-1} = 0 and C_n = 0, what is the overflow flag V? What if C_{n-1} = 1 and C_n = 1?",
        difficulty: "Medium",
        conceptTag: "Hardware Flag Logic",
        solution: {
          steps: [
            "1. The hardware overflow detector is V = C_{n-1} ⊕ C_n.",
            "2. When C_{n-1} = 0 and C_n = 0: V = 0 ⊕ 0 = 0 (No overflow).",
            "3. When C_{n-1} = 1 and C_n = 1: V = 1 ⊕ 1 = 0 (No overflow).",
            "4. Only when carries differ (0,1 or 1,0) does V evaluate to 1."
          ],
          final: "In both cases, V = 0 (No Overflow occurred)",
          verification: "XOR yields 0 whenever both inputs are equal."
        }
      },
      {
        id: "p16c-6",
        question: "Why does Python not experience 8-bit integer overflow like C, C++, or Java?",
        difficulty: "Hard",
        conceptTag: "Language Implementation Context",
        solution: {
          steps: [
            "1. In C, C++, and Java, integer types (char, short, int, long) map directly to fixed-width hardware registers (8, 16, 32, 64 bits). When sum exceeds 2^(n-1)-1, hardware overflow flag is ignored and bits wrap around.",
            "2. Python 3 implements arbitrary-precision integers ('bignum'). When an integer exceeds standard word size, Python dynamically allocates more memory digits in software.",
            "3. However, Data Science libraries like NumPy (np.int8) and PyTorch (torch.int8) DO experience fixed-width overflow because they use raw C arrays for GPU/SIMD execution speed!"
          ],
          final: "Python integers auto-expand in software, but NumPy/PyTorch int8 uses hardware 2's complement and WILL overflow!",
          verification: "Vital concept for Data Science students debugging PyTorch tensors."
        }
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // TAB 5: CHEAT SHEET (EXCLUSIVE RULES & SPEED SHORTCUTS)
  // ---------------------------------------------------------------------------
  cheatSheet: {
    heroTitle: "Signed Binary Numbers: Master Exam Cheat Sheet",
    heroSubtitle: "Formula matrix, speed shortcuts, and exam pitfalls with zero duplicated questions.",
    comparisonMatrix: [
      {
        feature: "Full Name",
        signMag: "Sign-Magnitude Form",
        onesComp: "Signed 1's Complement",
        twosComp: "Signed 2's Complement"
      },
      {
        feature: "Range for n Bits",
        signMag: "-(2^(n-1) - 1) to +(2^(n-1) - 1)",
        onesComp: "-(2^(n-1) - 1) to +(2^(n-1) - 1)",
        twosComp: "-2^(n-1) to +(2^(n-1) - 1)"
      },
      {
        feature: "Range for 8 Bits (n=8)",
        signMag: "-127 to +127",
        onesComp: "-127 to +127",
        twosComp: "-128 to +127 (One extra negative!)"
      },
      {
        feature: "Number of Zeros",
        signMag: "2 zeros (+0: 00000000, -0: 10000000)",
        onesComp: "2 zeros (+0: 00000000, -0: 11111111)",
        twosComp: "1 unique zero (00000000)"
      },
      {
        feature: "MSB Weight (b_{n-1})",
        signMag: "Sign indicator only (no magnitude weight)",
        onesComp: "-(2^(n-1) - 1)",
        twosComp: "-2^(n-1) (-128 in 8 bits)"
      },
      {
        feature: "How to Negate",
        signMag: "Toggle MSB bit only",
        onesComp: "Invert all n bits",
        twosComp: "Invert all n bits and add 1"
      },
      {
        feature: "Arithmetic Hardware",
        signMag: "Requires separate adder and subtractor",
        onesComp: "Requires adder with End-Around Carry",
        twosComp: "Single unified adder (Standard in all CPUs)"
      }
    ],
    speedShortcuts: [
      {
        id: "sc-1",
        title: "Shortcut 1: The Negative MSB Weight Trick",
        badge: "3-Second Decode",
        rule: "Never waste exam time inverting bits and adding 1 to decode a negative 2's complement number! Just treat the MSB as -2^(n-1) (-128 in 8 bits) and add the positive weights of every other '1' bit.",
        example: "Decode 11110101: -128 + 64 + 32 + 16 + 4 + 1 = -128 + 117 = -11. Done in 3 seconds!"
      },
      {
        id: "sc-2",
        title: "Shortcut 2: Carry-Out != Overflow Rule",
        badge: "Classic Exam Trap",
        rule: "In unsigned arithmetic, Carry-Out C8 = 1 indicates overflow. In signed 2's complement, Carry-Out is COMPLETELY NORMAL and is simply discarded! Overflow ONLY occurs if Cin != Cout (or two same-sign numbers produce an opposite sign).",
        example: "(-1) + (-1) = 11111111 + 11111111 = (1) 11111110 (-2). Cout = 1 is discarded; answer -2 is 100% correct!"
      },
      {
        id: "sc-3",
        title: "Shortcut 3: All-1s is Always -1",
        badge: "Instant Recognition",
        rule: "In any 2's complement register, regardless of bit width (4-bit 1111, 8-bit 11111111, 16-bit 0xFFFF, 32-bit 0xFFFFFFFF), a pattern of ALL 1s is mathematically EQUAL TO -1.",
        example: "Proof: -2^(n-1) + sum_{i=0}^{n-2} 2^i = -2^(n-1) + (2^(n-1) - 1) = -1."
      },
      {
        id: "sc-4",
        title: "Shortcut 4: 1 Followed by All 0s is -2^(n-1)",
        badge: "Asymmetric Min",
        rule: "The pattern 1000...000 with MSB 1 and all other bits 0 always represents the maximum negative boundary: 4-bit 1000 = -8, 8-bit 10000000 = -128. Its 2's complement is itself because its positive counterpart cannot fit!",
        example: "8-bit 10000000 is -128. Negating it produces an overflow because +128 cannot fit in 8 bits."
      }
    ],
    topMistakes: [
      {
        id: "tm-1",
        mistake: "Inverting Positive Numbers in 2's Complement",
        consequence: "Students mistakenly invert +45 to write it in 2's complement.",
        fix: "Positive numbers (MSB = 0) are NEVER inverted! They are 100% identical in Sign-Magnitude, 1's Comp, and 2's Comp."
      },
      {
        id: "tm-2",
        mistake: "Confusing Carry-Out with Overflow",
        consequence: "Marking valid negative additions as overflow just because Cout = 1.",
        fix: "Check V = Cin ⊕ Cout. If Cin == Cout (both 1 or both 0), there is NO overflow."
      },
      {
        id: "tm-3",
        mistake: "Padding with Zeros When Extending Negative Numbers",
        consequence: "Expanding -5 (1011) to 8 bits as 00001011 turns it into +11!",
        fix: "Always use Sign Extension: replicate the MSB (pad 1s for negatives, pad 0s for positives)."
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // TAB 6: MIXED EXAM CHALLENGE (15 QUESTIONS)
  // ---------------------------------------------------------------------------
  mixedPracticeQuestions: [
    {
      id: "mex-1",
      question: "Represent -85 in 8-bit Sign-Magnitude, Signed 1's Complement, and Signed 2's Complement forms.",
      difficulty: "Medium",
      conceptTag: "3-Scheme Conversion",
      solution: {
        steps: [
          "+85 in 8 bits: 01010101",
          "Sign-Magnitude: 11010101",
          "1's Complement: 10101010",
          "2's Complement: 10101010 + 1 = 10101011"
        ],
        final: "SM: 11010101 | 1's: 10101010 | 2's: 10101011",
        verification: "-128 + 32 + 8 + 2 + 1 = -85."
      }
    },
    {
      id: "mex-2",
      question: "Decode the 8-bit pattern 11100101 under (a) Sign-Magnitude, (b) 1's Comp, (c) 2's Comp.",
      difficulty: "Medium",
      conceptTag: "Decoding 3 Forms",
      solution: {
        steps: [
          "(a) Sign-Magnitude: b7=1 (-), magnitude = 1100101 = 64 + 32 + 4 + 1 = 101 -> -101.",
          "(b) 1's Complement: Invert -> 00011010 = 16 + 8 + 2 = 26 -> -26.",
          "(c) 2's Complement: -128 + 64 + 32 + 4 + 1 = -27."
        ],
        final: "SM: -101 | 1's: -26 | 2's: -27",
        verification: "2's complement is 1 less than 1's comp (-27 vs -26)."
      }
    },
    {
      id: "mex-3",
      question: "Perform (+72) + (+60) in 8-bit signed 2's complement arithmetic and verify if overflow occurred.",
      difficulty: "Easy",
      conceptTag: "Positive Overflow",
      solution: {
        steps: [
          "+72 = 01001000",
          "+60 = 00111100",
          "Sum = 01001000 + 00111100 = 10000100",
          "Two positives yielded a negative result (b7 = 1).",
          "Cin to b7 is 1, Cout from b7 is 0. V = 1 ⊕ 0 = 1.",
          "Expected sum is +132, which exceeds +127."
        ],
        final: "10000100 -> OVERFLOW (V = 1)",
        verification: "72 + 60 = 132 > 127."
      }
    },
    {
      id: "mex-4",
      question: "Perform (+72) + (-60) in 8-bit signed 2's complement arithmetic.",
      difficulty: "Medium",
      conceptTag: "Case 2 Arithmetic",
      solution: {
        steps: [
          "+72 = 01001000",
          "+60 = 00111100 -> -60 = 11000100",
          "Sum = 01001000 + 11000100 = (1) 00001100",
          "Discard carry-out C8 = 1.",
          "Remaining 8 bits: 00001100 = 8 + 4 = +12."
        ],
        final: "00001100 (+12₁₀)",
        verification: "72 - 60 = +12."
      }
    },
    {
      id: "mex-5",
      question: "Perform (+60) + (-72) in 8-bit signed 2's complement arithmetic.",
      difficulty: "Medium",
      conceptTag: "Case 3 Arithmetic",
      solution: {
        steps: [
          "+60 = 00111100",
          "+72 = 01001000 -> -72 = 10111000",
          "Sum = 00111100 + 10111000 = 11110100",
          "Sign bit b7 = 1 (Negative).",
          "Decode: -128 + 64 + 32 + 16 + 4 = -12."
        ],
        final: "11110100 (-12₁₀)",
        verification: "60 - 72 = -12."
      }
    },
    {
      id: "mex-6",
      question: "Perform (-72) + (-50) in 8-bit signed 2's complement arithmetic and check for overflow.",
      difficulty: "Hard",
      conceptTag: "Negative Overflow",
      solution: {
        steps: [
          "-72 = 10111000",
          "-50 = 11001110",
          "Sum = 10111000 + 11001110 = (1) 10000110",
          "Check Cin and Cout: Cin = 1, Cout = 1. V = 1 ⊕ 1 = 0 (No overflow!).",
          "Result: 10000110 = -128 + 4 + 2 = -122.",
          "Expected sum: -72 + -50 = -122 (Fits inside -128 to +127!)."
        ],
        final: "10000110 (-122₁₀) -> NO OVERFLOW",
        verification: "-72 + -50 = -122 >= -128."
      }
    },
    {
      id: "mex-7",
      question: "Sign-extend the 6-bit signed number 101101 (-19) to an 8-bit register and verify its value.",
      difficulty: "Easy",
      conceptTag: "Sign Extension",
      solution: {
        steps: [
          "1. Given 6-bit number: 101101. MSB is 1 (negative).",
          "2. Pad two 1s on the left to make 8 bits: 11101101.",
          "3. Decode: -128 + 64 + 32 + 8 + 4 + 1 = -128 + 109 = -19."
        ],
        final: "11101101 (-19₁₀)",
        verification: "Value remains -19 after extension."
      }
    },
    {
      id: "mex-8",
      question: "Find the 8-bit 2's complement representation of -128 and explain why +128 cannot be negated in 8 bits.",
      difficulty: "Medium",
      conceptTag: "Asymmetric Limit",
      solution: {
        steps: [
          "1. In 8 bits, 10000000 represents -128.",
          "2. 8-bit signed range is -128 to +127.",
          "3. +128 exceeds the positive maximum (+127), so negating -128 requires 9 bits (0 10000000)."
        ],
        final: "10000000 (-128); Negation overflows in 8 bits",
        verification: "-128 has no positive partner in 8 bits."
      }
    },
    {
      id: "mex-9",
      question: "What is the result of subtracting -40 from -10 in an 8-bit signed 2's complement CPU?",
      difficulty: "Medium",
      conceptTag: "Subtraction of Negatives",
      solution: {
        steps: [
          "Expression: (-10) - (-40) = (-10) + (+40) = +30.",
          "-10 in 8-bit 2's complement: 11110110",
          "+40 in 8-bit binary: 00101000",
          "Sum = 11110110 + 00101000 = (1) 00011110",
          "Discard carry-out C8 = 1. Result: 00011110 = 16 + 8 + 4 + 2 = +30."
        ],
        final: "00011110 (+30₁₀)",
        verification: "-10 - (-40) = +30."
      }
    },
    {
      id: "mex-10",
      question: "If an 8-bit ALU adds two numbers and produces C7 = 0 and C8 = 1, did overflow occur? What sign of numbers were added?",
      difficulty: "Hard",
      conceptTag: "Hardware Flag Trace",
      solution: {
        steps: [
          "1. Overflow Flag V = C7 ⊕ C8 = 0 ⊕ 1 = 1 (OVERFLOW OCCURRED!).",
          "2. C8 = 1 means there was a carry-out of the sign bit.",
          "3. C7 = 0 means there was NO carry into the sign bit.",
          "4. For b7: 1 + 1 + 0(Cin) = 10 (Sum bit 0, Cout 1).",
          "5. Both operands had MSB = 1 (two negative numbers), but result has MSB = 0 (positive).",
          "6. Conclusion: Negative overflow occurred!"
        ],
        final: "YES, OVERFLOW (V = 1). Two negative numbers were added, yielding a positive sum.",
        verification: "V = 0 ⊕ 1 = 1."
      }
    },
    {
      id: "mex-11",
      question: "Convert the signed decimal fraction -12.625 into 8-bit fixed-point binary (4 integer bits, 4 fractional bits) in 2's complement.",
      difficulty: "Hard",
      conceptTag: "Fixed-Point 2's Complement",
      solution: {
        steps: [
          "1. Represent positive +12.625 in binary:",
          "   12 = (1100)₂, 0.625 = 0.5 + 0.125 = (0.101)₂.",
          "   +12.625 = 01100.1010 (5 integer bits, 4 fractional bits).",
          "2. In an 8-bit format with 4 integer and 4 fractional bits:",
          "   Magnitude: +12.625 is 1100.1010 (Requires 5 integer bits for signed representation!).",
          "   4 integer bits only covers up to +7 in signed format (-8 to +7).",
          "   Thus, -12.625 cannot fit in a 4.4 signed format! It requires at least 5 integer bits (Q5.4)."
        ],
        final: "Requires at least Q5.4 format (9 bits total: 10011.0110)",
        verification: "Signed range for 4 integer bits is only -8.0 to +7.9375."
      }
    },
    {
      id: "mex-12",
      question: "Why does 2's complement arithmetic eliminate the need for an End-Around Carry that 1's complement requires?",
      difficulty: "Medium",
      conceptTag: "Hardware Theory",
      solution: {
        steps: [
          "1. In 1's complement, the modulus is 2^n - 1. When an extra carry-out occurs, it represents a value of 2^n, which is congruent to +1 modulo (2^n - 1). Thus, the carry must be looped around and added back to the LSB.",
          "2. In 2's complement, the modulus is exactly 2^n. An extra carry-out represents 2^n, which is congruent to 0 modulo 2^n! Therefore, it can simply be discarded with zero correction."
        ],
        final: "Because 2^n = 0 mod 2^n in 2's complement, the carry-out is mathematically zero and discarded.",
        verification: "No extra clock cycle needed in 2's complement."
      }
    },
    {
      id: "mex-13",
      question: "Determine the range of signed integers that can be stored in a 12-bit register using 2's complement.",
      difficulty: "Easy",
      conceptTag: "12-Bit Range Formula",
      solution: {
        steps: [
          "Range formula: -2^(n-1) to +(2^(n-1) - 1).",
          "For n = 12: -2^11 to +(2^11 - 1).",
          "2^11 = 2048.",
          "Range: -2048 to +2047."
        ],
        final: "-2048 to +2047 (Total 4096 distinct values)",
        verification: "2^12 = 4096."
      }
    },
    {
      id: "mex-14",
      question: "Perform (-100) + (+100) in 8-bit signed 2's complement.",
      difficulty: "Easy",
      conceptTag: "Neutral Cancellation",
      solution: {
        steps: [
          "+100 = 01100100",
          "-100 = 10011100",
          "Sum = 10011100 + 01100100 = (1) 00000000",
          "Discard carry-out C8 = 1.",
          "Remaining 8 bits: 00000000 = 0."
        ],
        final: "00000000 (0₁₀)",
        verification: "-100 + 100 = 0."
      }
    },
    {
      id: "mex-15",
      question: "Explain how an 8-bit signed integer in PyTorch (torch.int8) can cause silent gradient corruption during quantization.",
      difficulty: "Hard",
      conceptTag: "AI Hardware Connection",
      solution: {
        steps: [
          "1. In 8-bit neural network quantization (INT8), activation and weight values are scaled and mapped into the range [-128, +127].",
          "2. If an intermediate matrix multiplication accumulator overflows 8 bits (e.g., reaches +130), it silently wraps around to -126 in 2's complement hardware.",
          "3. This flips a large positive activation into a large negative inhibition, destroying the neural network's accuracy completely.",
          "4. Modern inference hardware uses 32-bit accumulators (INT32) during multiplication and only downscales back to INT8 at the very end with saturation clamping."
        ],
        final: "Overflow wraps positive activations to negative, destroying model accuracy. Clamping/scaling prevents this.",
        verification: "Essential real-world concept for deep learning engineers."
      }
    }
  ]
};
