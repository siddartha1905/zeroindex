/**
 * Digital Logic Design - Unit 1: Number Systems & Binary Arithmetic
 * Modular content structure for 6 sub-modules
 */

export const dldUnit1 = {
  unitId: 1,
  unitRoman: "UNIT I",
  title: "Number Systems & Binary Arithmetic",
  courseOutcome: "CO1",
  estimatedTime: "9 Lectures / 3 Weeks",
  summary: "Foundational mathematics and electronics of discrete computing: analog vs digital signals, positional number representations, base conversion algorithms, r's and (r-1)'s complements, signed binary representation (2's complement), and digital logic gate primitives.",
  subModules: [
    {
      id: "1.1",
      number: "1.1",
      title: "Digital Systems & Analog vs. Digital",
      badge: "Fundamental",
      summary: "Understand the discrete nature of digital computation and why binary voltage levels provide superior noise immunity over continuous analog signals.",
      dataScienceConnection: "In Data Science, real-world data (sound waves, sensor temperatures, camera photons) begins as analog signals. Before machine learning models can process them, Analog-to-Digital Converters (ADCs) quantize them into discrete binary numbers (e.g. 16-bit audio PCM, 8-bit RGB pixel tensors).",
      keyPoints: [
        {
          heading: "Analog Signals",
          desc: "Continuous physical quantities varying smoothly over time (e.g., sound pressure, ambient temperature, voltage). Susceptible to cumulative thermal noise and signal degradation."
        },
        {
          heading: "Digital Signals",
          desc: "Discrete values represented by distinct voltage bands (typically HIGH = 3.3V/5V = Logic 1, LOW = 0V = Logic 0). Noise margins protect signal integrity across complex computer logic."
        },
        {
          heading: "Advantages of Digital Systems",
          desc: "High reliability, reproducibility, programmability, ease of semiconductor scaling (Moore's Law), and exact mathematical precision without analog drift."
        }
      ],
      quickSummaryBox: {
        title: "Key Takeaway",
        content: "Computers use binary (Base-2) not because 2 is magical, but because physical semiconductor transistors (MOSFETs) operate most reliably as simple ON/OFF electronic switches."
      }
    },
    {
      id: "1.2",
      number: "1.2",
      title: "Number Systems (Decimal, Binary, Octal, Hex)",
      badge: "Positional Base",
      summary: "Positional number representation across Base 10, Base 2, Base 8, and Base 16 with Radix polynomial expansion.",
      dataScienceConnection: "Hexadecimal (Base 16) is the lingua franca of low-level data representation: memory pointers in C/C++, RGB color hex codes (#2E6F40), MAC addresses, and raw tensor memory buffers in CUDA/PyTorch.",
      formula: "(N)ᵣ = dₙ₋₁ · rⁿ⁻¹ + ... + d₀ · r⁰ + d₋₁ · r⁻¹ + ... + d₋ₘ · r⁻ᵐ",
      bases: [
        { name: "Decimal", radix: 10, symbols: "0, 1, 2, 3, 4, 5, 6, 7, 8, 9", useCase: "Human daily arithmetic" },
        { name: "Binary", radix: 2, symbols: "0, 1", useCase: "Internal hardware CPU/ALU states" },
        { name: "Octal", radix: 8, symbols: "0, 1, 2, 3, 4, 5, 6, 7", useCase: "Unix file permissions (e.g. chmod 755)" },
        { name: "Hexadecimal", radix: 16, symbols: "0-9, A(10), B(11), C(12), D(13), E(14), F(15)", useCase: "Memory addresses, bytecode, byte inspection" }
      ],
      quickSummaryBox: {
        title: "Grouping Rule of Thumb",
        content: "Since 8 = 2³ and 16 = 2⁴, 1 Octal digit maps exactly to 3 binary bits, and 1 Hexadecimal digit maps exactly to 4 binary bits (a nibble)."
      }
    },
    {
      id: "1.3",
      number: "1.3",
      title: "Number System Conversions (All 12 Paths)",
      badge: "Core Exam Topic",
      summary: "Systematic algorithms for converting integer and fractional numbers across any arbitrary base (Decimal to Base-r, Base-r to Decimal, and Direct Binary <-> Octal / Hex).",
      dataScienceConnection: "Parsing ASCII data files, encoding binary protocols, and converting categorical integer encodings into binary one-hot vectors in machine learning feature preprocessing pipelines.",
      algorithms: [
        {
          name: "Decimal to Any Base-r (Integer Part)",
          method: "Successive Division by r until quotient is 0. Read remainders from Bottom to Top (Least Significant Bit to Most Significant Bit)."
        },
        {
          name: "Decimal to Any Base-r (Fractional Part)",
          method: "Successive Multiplication by r. Extract integer parts from Top to Bottom until fraction becomes 0 or desired precision is met."
        },
        {
          name: "Any Base-r to Decimal",
          method: "Multiply each digit by its positional weight rⁱ and sum all terms."
        },
        {
          name: "Direct Grouping (Binary <-> Hex / Octal)",
          method: "Group bits in sets of 4 (Hex) or 3 (Octal) starting from the radix point moving left for integers and right for fractions."
        }
      ],
      exampleSnippet: {
        problem: "Convert (25.625)₁₀ to Binary:",
        steps: [
          "Integer 25 ÷ 2: 25/2 = 12 R 1, 12/2 = 6 R 0, 6/2 = 3 R 0, 3/2 = 1 R 1, 1/2 = 0 R 1 -> (11001)₂",
          "Fractional 0.625 × 2 = 1.25 (Int: 1), 0.25 × 2 = 0.5 (Int: 0), 0.5 × 2 = 1.0 (Int: 1) -> (0.101)₂",
          "Result: (25.625)₁₀ = (11001.101)₂"
        ]
      }
    },
    {
      id: "1.4",
      number: "1.4",
      title: "Binary Arithmetic (Addition, Subtraction, Mul & Div)",
      badge: "ALU Operations",
      summary: "Elementary binary addition, ripple-carry mechanics, direct subtraction with borrow propagation across zeros, shift-and-add multiplication, and restoring long division.",
      dataScienceConnection: "ALU circuits execute matrix operations, deep neural network forward/backward passes, and tensor calculations using high-speed binary adders, barrel shifters, and multiplier arrays.",
      keyPoints: [
        {
          heading: "Binary Addition",
          desc: "Column-by-column addition with carry generation (1 + 1 = 10₂, 1 + 1 + 1 = 11₂)."
        },
        {
          heading: "Binary Subtraction",
          desc: "Direct subtraction with borrow propagation across multiple consecutive zeros (borrow adds 2₁₀ to current column)."
        },
        {
          heading: "Binary Multiplication",
          desc: "Shift-and-add algorithm where partial products are either copies of the multiplicand or zeros."
        },
        {
          heading: "Binary Division",
          desc: "Restoring long division using iterative comparison and subtraction."
        }
      ]
    },
    {
      id: "1.5",
      number: "1.5",
      title: "Complements (1's, 2's, 9's & 10's Complements)",
      badge: "Hardware Subtraction",
      summary: "Why subtraction is implemented in computer hardware using addition of complements: Radix complement (r's) and Diminished radix complement ((r-1)'s).",
      dataScienceConnection: "CPUs and GPUs don't contain dedicated physical subtraction hardware; ALUs perform subtraction, matrix dot-products, and backpropagation gradients using 2's complement addition circuits.",
      complementsFormulae: [
        {
          type: "r's Complement",
          formula: "r^n - N (for N ≠ 0)",
          explanation: "In binary: 2's complement = 1's complement + 1. In decimal: 10's complement = 9's complement + 1."
        },
        {
          type: "(r-1)'s Complement",
          formula: "(r^n - 1) - N",
          explanation: "In binary: 1's complement (invert all bits: 0->1, 1->0). In decimal: 9's complement (subtract each digit from 9)."
        }
      ],
      subtractionRules: [
        "To compute M - N using r's complement: Add M to r's complement of N.",
        "Case 1 (M >= N): An end carry is generated. Discard end carry; result is positive.",
        "Case 2 (M < N): No end carry is generated. Result is negative and in r's complement form; take r's complement of sum and add negative sign."
      ]
    },
    {
      id: "1.6",
      number: "1.6",
      title: "Signed Binary Numbers (Positive & Negative Representation)",
      badge: "High-Yield",
      summary: "Three representations of signed integers: Signed Magnitude, Signed 1's Complement, and Signed 2's Complement. Overflow detection and dynamic ranges.",
      dataScienceConnection: "In Python (NumPy) and PyTorch, tensor dtypes like int8, int16, int32, and int64 use 2's complement. For example, int8 spans from -128 to +127 (range: -2^(n-1) to +2^(n-1)-1).",
      representations: [
        {
          name: "Signed Magnitude",
          msbMeaning: "0 = Positive, 1 = Negative",
          flaw: "Two representations for zero (+0 = 0000, -0 = 1000) and complex hardware logic."
        },
        {
          name: "Signed 1's Complement",
          msbMeaning: "Negative numbers inverted bitwise",
          flaw: "Still suffers from dual zero (+0 = 0000, -0 = 1111) and requires end-around carry addition."
        },
        {
          name: "Signed 2's Complement (Standard)",
          msbMeaning: "Weight of MSB is -2^(n-1)",
          flaw: "None! Unique zero (0000), single adder circuit, range for n bits: [-2^(n-1), +2^(n-1) - 1]."
        }
      ],
      overflowRule: "Overflow occurs when adding two numbers of the same sign produces a result of the opposite sign, or when Carry-in to MSB != Carry-out of MSB (C_in ^ C_out = 1)."
    },
    {
      id: "1.7",
      number: "1.7",
      title: "Logic Gates & Universal Realizations",
      badge: "Circuit Primitives",
      summary: "Fundamental building blocks of digital logic: Basic gates (AND, OR, NOT), Universal gates (NAND, NOR), and Exclusive gates (XOR, XNOR) with truth tables.",
      dataScienceConnection: "The XOR gate is famous in AI history: in 1969, Minsky & Papert proved a single-layer perceptron cannot solve the non-linearly separable XOR problem, inspiring modern multi-layer deep neural networks.",
      gates: [
        { name: "AND", symbol: "A · B", rule: "Output is 1 only when ALL inputs are 1", isUniversal: false },
        { name: "OR", symbol: "A + B", rule: "Output is 1 when AT LEAST ONE input is 1", isUniversal: false },
        { name: "NOT", symbol: "A'", rule: "Inverts binary state (0 -> 1, 1 -> 0)", isUniversal: false },
        { name: "NAND", symbol: "(A · B)'", rule: "Universal gate. NOT of AND. Can build any digital system alone", isUniversal: true },
        { name: "NOR", symbol: "(A + B)'", rule: "Universal gate. NOT of OR. Can build any digital system alone", isUniversal: true },
        { name: "XOR", symbol: "A ^ B = A'B + AB'", rule: "Odd-function detector. 1 when inputs differ. Parity & Half-Adder sum", isUniversal: false },
        { name: "XNOR", symbol: "(A ^ B)' = AB + A'B'", rule: "Equivalence detector. 1 when inputs are equal", isUniversal: false }
      ]
    }
  ],
  workedExamples: [
    {
      id: "ex-1",
      topic: "1.3 Conversions",
      question: "Convert (175.625)₁₀ to Hexadecimal and Octal.",
      difficulty: "Medium",
      examTag: "Hex & Octal Fractional Conversion",
      solutionSteps: [
        "Convert integer 175 to Hex: 175 ÷ 16 = 10 with Remainder 15 (F). 10 ÷ 16 = 0 with Remainder 10 (A). Integer part = (AF)₁₆",
        "Convert fraction 0.625 to Hex: 0.625 × 16 = 10.0 (A). Fractional part = .A",
        "Result in Hex: (AF.A)₁₆",
        "Direct conversion from Hex (AF.A)₁₆ to Binary: A = 1010, F = 1111, .A = .1010 → (1010 1111 . 1010)₂",
        "Group binary into 3s for Octal: 010 101 111 . 101 → (257.5)₈"
      ]
    },
    {
      id: "ex-2",
      topic: "1.4 Complements",
      question: "Perform (35)₁₀ - (67)₁₀ using 8-bit 2's Complement binary arithmetic.",
      difficulty: "Hard",
      examTag: "Signed 2's Complement Subtraction",
      solutionSteps: [
        "Convert (35)₁₀ to 8-bit binary: 35 = 32 + 2 + 1 = (00100011)₂",
        "Convert (67)₁₀ to 8-bit binary: 67 = 64 + 2 + 1 = (01000011)₂",
        "Find 2's complement of 67: 1's complement = 10111100. Add 1 = (10111101)₂",
        "Add M + 2's complement of N: 00100011 + 10111101 = (11100000)₂",
        "Notice: NO end carry is generated! This signifies the result is NEGATIVE and stored in 2's complement form.",
        "Magnitude = 2's complement of 11100000: (00011111 + 1) = (00100000)₂ = (32)₁₀",
        "Final Result: -32 (which matches 35 - 67 = -32!)"
      ]
    }
  ]
};
