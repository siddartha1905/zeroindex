/**
 * ZeroIndex Engineering Platform - Digital Logic Design (DLD)
 * Phase 3 Subject Resources and Connected Learning Registry
 * Strictly zero em-dashes (\u2014) and zero en-dashes (\u2013).
 * Mandatory Unicode Sigma (\u03A3) and Pi (\u03A0).
 */

export const dldSubjectResourcesData = {
  unitsMetadata: [
    {
      unitNumber: 1,
      roman: "Unit I",
      title: "Number Systems and Digital Fundamentals",
      shortTitle: "Number Systems & Digital Logic",
      badge: "Completed & Verified",
      sections: "Sections 1.1 to 1.7",
      hours: "12 Lecture Hours",
      description: "Foundational digital engineering covering positional radix systems, base conversions, binary arithmetic, radix complements, signed representations, and elementary logic gates."
    },
    {
      unitNumber: 2,
      roman: "Unit II",
      title: "Boolean Algebra and Karnaugh Maps",
      shortTitle: "Boolean Algebra & K-Maps",
      badge: "Completed & Verified",
      sections: "Sections 2.1 to 2.5",
      hours: "14 Lecture Hours",
      description: "Mathematical foundations of switching circuits, axiomatic Huntington postulates, algebraic reductions, canonical minterms/maxterms (\u03A3m & \u03A0M), SOP/POS conversions, and visual Karnaugh map optimization."
    },
    {
      unitNumber: 3,
      roman: "Unit III",
      title: "Combinational Logic Design",
      shortTitle: "Combinational Circuits",
      badge: "Planned Curriculum",
      sections: "Sections 3.1 to 3.7",
      hours: "12 Lecture Hours",
      description: "Adders, subtractors, multiplexers, demultiplexers, encoders, decoders, and code converters in accordance with the AR23 blueprint."
    },
    {
      unitNumber: 4,
      roman: "Unit IV",
      title: "Synchronous Sequential Logic",
      shortTitle: "Sequential Logic & Flip-Flops",
      badge: "Planned Curriculum",
      sections: "Sections 4.1 to 4.6",
      hours: "12 Lecture Hours",
      description: "Latches, flip-flops (SR, JK, D, T), state tables, state diagrams, state reduction, and sequential circuit synthesis."
    },
    {
      unitNumber: 5,
      roman: "Unit V",
      title: "Registers, Counters & Memory Systems",
      shortTitle: "Registers & Counters",
      badge: "Planned Curriculum",
      sections: "Sections 5.1 to 5.6",
      hours: "10 Lecture Hours",
      description: "Shift registers, ripple counters, synchronous counters, ring counters, RAM, ROM, and programmable logic devices."
    }
  ],

  // A. STUDY MATERIALS AND TEXTBOOKS
  studyMaterials: {
    officialNotice: "Prescribed curriculum textbooks from Vignan's Institute of Information Technology (Autonomous) AR23 regulations. Digital copies hosted on the department drive are maintained as bibliographic references until official links are released.",
    driveConfig: {
      resourceName: "Google Drive Study Materials",
      statusText: "Material link will be added soon.",
      driveUrl: null,
      unitPlaceholders: {
        1: { status: "pending", note: "Unit 1 lecture notes and tutorial sheets will be linked once verified by faculty." },
        2: { status: "pending", note: "Unit 2 Boolean algebra and K-Map reference materials will be linked once verified." },
        3: { status: "pending", note: "Unit 3 combinational circuit notes are in preparation." },
        4: { status: "pending", note: "Unit 4 sequential circuit notes are in preparation." },
        5: { status: "pending", note: "Unit 5 registers and memory systems notes are in preparation." }
      }
    },
    textbooks: [
      {
        id: "tb-mano",
        number: 1,
        title: "Digital Design",
        edition: "5th Edition",
        authors: "M. Morris Mano, Michael D. Ciletti",
        publisher: "Pearson Education",
        year: "2013",
        isbn: "978-0132774208",
        unitsCovered: [1, 2, 3, 4, 5],
        description: "Primary prescribed text for undergraduate digital engineering. Chapters 1 and 2 directly establish the axiomatic Boolean theorems, standard forms, and Karnaugh map minimization methods used in ZeroIndex.",
        libraryCallNumber: "VIIT-LIB-EC-0421",
        driveLink: null,
        statusText: "Material link will be added soon."
      },
      {
        id: "tb-roth",
        number: 2,
        title: "Fundamentals of Logic Design",
        edition: "5th Edition",
        authors: "Charles H. Roth Jr.",
        publisher: "Cengage Learning",
        year: "2004",
        isbn: "978-0534378042",
        unitsCovered: [1, 2, 3, 4],
        description: "Comprehensive coverage of switching theory, algebraic proofs, multi-level gate networks, and state machine reduction techniques.",
        libraryCallNumber: "VIIT-LIB-EC-0518",
        driveLink: null,
        statusText: "Material link will be added soon."
      },
      {
        id: "tb-malvino",
        number: 3,
        title: "Digital Principles and Applications",
        edition: "8th Edition",
        authors: "Donald P. Leach, Albert Paul Malvino, Goutam Saha",
        publisher: "McGraw Hill Education",
        year: "2014",
        isbn: "978-9339203405",
        unitsCovered: [1, 2, 3],
        description: "Practical engineering perspective emphasizing binary number arithmetic, logic family characteristics, and digital troubleshooting.",
        libraryCallNumber: "VIIT-LIB-EC-0633",
        driveLink: null,
        statusText: "Material link will be added soon."
      }
    ],
    referenceBooks: [
      {
        id: "rb-kohavi",
        number: 1,
        title: "Switching and Finite Automata Theory",
        authors: "Zvi Kohavi, Niraj K. Jha",
        publisher: "Cambridge University Press",
        edition: "3rd Edition",
        unitsCovered: [2, 4],
        description: "Rigorous theoretical treatment of combinational switching networks, decomposition, and finite-state machine minimization."
      },
      {
        id: "rb-floyd",
        number: 2,
        title: "Digital Fundamentals",
        authors: "Thomas L. Floyd",
        publisher: "Pearson Education",
        edition: "11th Edition",
        unitsCovered: [1, 2, 3],
        description: "Visual textbook featuring full-color timing diagrams, logic gate test circuits, and hands-on laboratory exercises."
      },
      {
        id: "rb-jain",
        number: 3,
        title: "Modern Digital Electronics",
        authors: "R. P. Jain",
        publisher: "Tata McGraw-Hill",
        edition: "4th Edition",
        unitsCovered: [1, 2, 3, 4],
        description: "Popular Indian university reference with extensive worked numerical problems on binary codes, K-Maps, and arithmetic units."
      }
    ]
  },

  // B. FORMULA SHEETS AND QUICK REVISION
  formulaSheets: {
    unit1: [
      {
        id: "u1-rev-11",
        sectionId: "1.1",
        title: "Section 1.1: Digital Systems Foundations",
        topic: "Analog vs Digital & Switching Logic",
        bullets: [
          "Analog quantities are continuous in time and amplitude; digital quantities are discrete, represented by binary 0 and 1 voltage ranges.",
          "Digital advantages include superior noise immunity, reliable magnetic/electronic storage, programmable operation, and IC integration.",
          "For standard 5V TTL input specifications, guaranteed Logic 0 recognition is 0.0V to 0.8V (V_IL max = 0.8V) and guaranteed Logic 1 recognition is 2.0V to 5.0V (V_IH min = 2.0V), with 0.8V to 2.0V being an indeterminate transition region.",
          "Noise margin is the maximum unwanted voltage noise that can be added to a signal without causing an erroneous output state."
        ],
        keyRules: [
          { rule: "Logic State 1", detail: "Active high / asserted / True / Vcc / Closed switch" },
          { rule: "Logic State 0", detail: "Active low / negated / False / Ground / Open switch" },
          { rule: "Binary Variable", detail: "Takes exactly one of two values: x \u2208 {0, 1}" }
        ]
      },
      {
        id: "u1-rev-12",
        sectionId: "1.2",
        title: "Section 1.2: Number Systems & Positional Radix",
        topic: "Decimal, Binary, Octal & Hexadecimal",
        bullets: [
          "A positional number system of radix r uses r distinct digit symbols from 0 to (r - 1).",
          "The numeric value equals the sum of each digit multiplied by its integer weight: N = \u03A3 (d_i \u00D7 r^i).",
          "Radix comparisons: Binary (r=2, digits 0,1), Octal (r=8, digits 0 to 7), Hexadecimal (r=16, digits 0 to 9, A to F).",
          "One hexadecimal digit directly encodes exactly 4 binary bits (nibble); one octal digit encodes exactly 3 binary bits."
        ],
        keyRules: [
          { rule: "Positional Formula", detail: "N = d_n r^n + ... + d_1 r^1 + d_0 r^0 + d_{-1} r^{-1} + ..." },
          { rule: "Powers of 2 Reference", detail: "2^0=1, 2^4=16, 2^8=256, 2^10=1024 (1K), 2^16=65536 (64K)" },
          { rule: "Hexadecimal Digits", detail: "A=10, B=11, C=12, D=13, E=14, F=15" }
        ]
      },
      {
        id: "u1-rev-13",
        sectionId: "1.3",
        title: "Section 1.3: Number-System Conversions",
        topic: "Integer & Fractional Base Conversion",
        bullets: [
          "Decimal integer to base r: Successively divide by r and collect remainders bottom-to-top (MSB to LSB).",
          "Decimal fraction to base r: Successively multiply by r and collect integer carries top-to-bottom.",
          "Binary to Octal: Group bits in groups of 3 from the radix point outward; replace each group with octal digit.",
          "Binary to Hexadecimal: Group bits in groups of 4 from the radix point outward; replace with hex digit."
        ],
        keyRules: [
          { rule: "Integer Part", detail: "Successive division by target radix r; remainders read upwards" },
          { rule: "Fraction Part", detail: "Successive multiplication by target radix r; integer carries read downwards" },
          { rule: "Fast Power-of-Two Grouping", detail: "Octal = 3 bits (4-2-1 code); Hex = 4 bits (8-4-2-1 code)" }
        ]
      },
      {
        id: "u1-rev-14",
        sectionId: "1.4",
        title: "Section 1.4: Binary Arithmetic",
        topic: "Addition, Subtraction & Arithmetic Operations",
        bullets: [
          "Binary addition rules: 0+0=0, 0+1=1, 1+0=1, 1+1=0 (carry 1), 1+1+1=1 (carry 1).",
          "Binary subtraction rules: 0-0=0, 1-0=1, 1-1=0, 0-1=1 with borrow 1 from next higher column.",
          "A borrow from column k reduces column k by 1 and adds radix value 2 to column (k - 1).",
          "Binary multiplication uses shift-and-add of partial products based on multiplicand bits."
        ],
        keyRules: [
          { rule: "Half Adder Sum & Carry", detail: "Sum = A \u2295 B, Carry = A \u00B7 B" },
          { rule: "Full Adder Sum & Carry", detail: "Sum = A \u2295 B \u2295 C_in, C_out = AB + BC_in + AC_in" },
          { rule: "Borrow Rule", detail: "0 - 1 = 1 (with Borrow 1 from adjacent high bit)" }
        ]
      },
      {
        id: "u1-rev-15",
        sectionId: "1.5",
        title: "Section 1.5: Complements & Complement Subtraction",
        topic: "1's Complement & 2's Complement",
        bullets: [
          "For base r and n digits: Radix complement is r^n - N; Diminished radix complement is (r^n - 1) - N.",
          "In binary: 1's complement is obtained by bitwise inversion (change 0 to 1 and 1 to 0).",
          "2's complement equals (1's complement + 1); fast shortcut: leave trailing zeros and first 1 unchanged, invert all bits to the left.",
          "Subtraction M - N via 2's complement: Add M + (2's comp of N). If end-carry occurs, discard it (result is positive). If no end-carry, result is negative -(2's comp of sum)."
        ],
        keyRules: [
          { rule: "1's Complement", detail: "Bitwise NOT: (2^n - 1) - N" },
          { rule: "2's Complement", detail: "1's complement + 1: 2^n - N" },
          { rule: "End-Around Carry (1's comp)", detail: "End carry = 1 implies positive, add 1 to LSB; End carry = 0 implies negative result in 1's comp" },
          { rule: "Discard Carry (2's comp)", detail: "End carry = 1 implies positive, discard carry; End carry = 0 implies negative result in 2's comp" }
        ]
      },
      {
        id: "u1-rev-16",
        sectionId: "1.6",
        title: "Section 1.6: Signed Number Representation",
        topic: "Signed Magnitude, 1's Comp & 2's Comp Ranges",
        bullets: [
          "In signed representations, the MSB denotes sign: 0 for positive (+), 1 for negative (-).",
          "Signed Magnitude: MSB is sign, remaining (n - 1) bits denote absolute value. Range: -(2^{n-1} - 1) to +(2^{n-1} - 1). Dual zero (+0 and -0).",
          "1's Complement: Negative numbers inverted. Range: -(2^{n-1} - 1) to +(2^{n-1} - 1). Dual zero (+0 and -0).",
          "2's Complement: Most widely used in modern computers. Range: -2^{n-1} to +(2^{n-1} - 1). Unique zero representation.",
          "Overflow occurs when the addition of two numbers of the same sign produces a result of the opposite sign: V = C_{in} \u2295 C_{out} at MSB."
        ],
        keyRules: [
          { rule: "8-Bit Signed Range (2's Comp)", detail: "-128 to +127 (unique zero 00000000)" },
          { rule: "8-Bit Signed Range (1's Comp)", detail: "-127 to +127 (two zeros: 00000000 and 11111111)" },
          { rule: "Arithmetic Overflow", detail: "V = C_{in} \u2295 C_{out} on sign bit (overflow if V = 1)" }
        ]
      },
      {
        id: "u1-rev-17",
        sectionId: "1.7",
        title: "Section 1.7: Logic Gates & Truth Tables",
        topic: "Basic, Universal & Exclusive Logic Gates",
        bullets: [
          "Primary gates: AND (all 1s \u2192 1), OR (any 1 \u2192 1), NOT (inverts state).",
          "Universal gates: NAND and NOR can synthesize any arbitrary Boolean function without other gate types.",
          "NAND synthesis: NOT is A NAND A; AND is (A NAND B) NAND (A NAND B); OR is (A NAND A) NAND (B NAND B).",
          "XOR gate: Output is 1 when inputs differ: A \u2295 B = A'B + AB'. Used as odd parity detector and half adder sum.",
          "XNOR gate: Output is 1 when inputs are equal: (A \u2295 B)' = AB + A'B'. Used as equivalence detector."
        ],
        keyRules: [
          { rule: "AND Function", detail: "F = A \u00B7 B (output 1 only when A=1 and B=1)" },
          { rule: "OR Function", detail: "F = A + B (output 0 only when A=0 and B=0)" },
          { rule: "XOR Identity", detail: "A \u2295 B = A'B + AB' = (A + B)(A' + B')" },
          { rule: "XNOR Identity", detail: "A \u2299 B = AB + A'B' = (A \u2295 B)'" }
        ]
      }
    ],

    unit2: [
      {
        id: "u2-rev-21",
        sectionId: "2.1",
        title: "Section 2.1: Boolean Laws & Axiomatic Postulates",
        topic: "Huntington Postulates, Theorems & Duality",
        bullets: [
          "Huntington Postulates (1904) define Boolean algebra over set B with operators (+, \u00B7) satisfying closure, identity (0 for +, 1 for \u00B7), commutativity, distributivity of each operator over the other, and complements.",
          "Idempotence: A + A = A, and A \u00B7 A = A.",
          "Boundedness / Dominance: A + 1 = 1, and A \u00B7 0 = 0.",
          "Involution: (A')' = A.",
          "De Morgan's Laws: (A + B)' = A'B', and (AB)' = A' + B'. Break the line and change the sign.",
          "Consensus Theorem: AB + A'C + BC = AB + A'C. The third term BC is redundant.",
          "Duality Principle: Any valid identity remains valid when (+ and \u00B7) are interchanged and (0 and 1) are interchanged."
        ],
        keyRules: [
          { rule: "Absorption 1", detail: "A + AB = A (variable absorbs its product)" },
          { rule: "Absorption 2 (Redundancy)", detail: "A + A'B = A + B (complemented variable is redundant)" },
          { rule: "Dual Consensus", detail: "(A + B)(A' + C)(B + C) = (A + B)(A' + C)" },
          { rule: "Distributive Dual", detail: "A + BC = (A + B)(A + C)" }
        ]
      },
      {
        id: "u2-rev-22",
        sectionId: "2.2",
        title: "Section 2.2: Algebraic Simplification",
        topic: "Reduction Techniques & Minimization Shortcuts",
        bullets: [
          "Objective: Minimize total literals and total terms to reduce gate count and gate fan-in.",
          "Three core algebraic operations: Term expansion, factoring/dual combining, and consensus elimination.",
          "Common factor pairing: AB + AB' = A(B + B') = A(1) = A.",
          "Redundancy elimination: Look for term of form X + X'Y, which immediately simplifies to X + Y.",
          "Consensus recognition: Identify two terms with one complemented variable (e.g. A and A'). Their consensus is the product of remaining variables.",
          "Always verify results by checking truth table rows or evaluating extremal states (all 0s or all 1s)."
        ],
        keyRules: [
          { rule: "Combining Rule", detail: "XY + XY' = X (eliminates variable Y)" },
          { rule: "POS Factoring", detail: "(X + Y)(X + Y') = X" },
          { rule: "Cascade Absorption", detail: "X + X'Y + X'Y'Z = X + Y + Z" }
        ]
      },
      {
        id: "u2-rev-23",
        sectionId: "2.3",
        title: "Section 2.3: Minterms & Maxterms",
        topic: "Canonical SOP (\u03A3m) & Canonical POS (\u03A0M)",
        bullets: [
          "Minterm m_i is a product of all n variables in either complemented or uncomplemented form, evaluating to 1 for exactly one input combination.",
          "Minterm rule: Variable is uncomplemented if its bit value is 1, and complemented if its bit value is 0.",
          "Maxterm M_i is a sum of all n variables, evaluating to 0 for exactly one input combination.",
          "Maxterm rule: Variable is uncomplemented if its bit value is 0, and complemented if its bit value is 1.",
          "Orthogonality: Minterm m_i and Maxterm M_i are logical complements: (m_i)' = M_i and (M_i)' = m_i.",
          "Canonical SOP: F = \u03A3m(indices where F = 1). Canonical POS: F = \u03A0M(indices where F = 0)."
        ],
        keyRules: [
          { rule: "Minterm Polarity", detail: "Bit 1 \u2192 A, Bit 0 \u2192 A' (Product term)" },
          { rule: "Maxterm Polarity", detail: "Bit 0 \u2192 A, Bit 1 \u2192 A' (Sum term)" },
          { rule: "De Morgan Relation", detail: "m_i' = M_i (e.g. (ABC)' = A' + B' + C')" },
          { rule: "Total Combinations", detail: "n variables yield exactly 2^n minterms and 2^n maxterms" }
        ]
      },
      {
        id: "u2-rev-24",
        sectionId: "2.4",
        title: "Section 2.4: SOP and POS Conversions",
        topic: "Canonical Conversions & Non-Canonical Expansions",
        bullets: [
          "Canonical vs Standard: Canonical form contains every variable in every term; standard form terms may have fewer literals.",
          "Expanding general SOP to Canonical SOP: Multiply each incomplete product term by (X + X') for each missing variable X.",
          "Expanding general POS to Canonical POS: Add (X \u00B7 X') to each incomplete sum term, then apply distribution A + BC = (A + B)(A + C).",
          "Conversion between Canonical SOP and POS: Invert the index set with respect to universal set U = {0, 1, ..., 2^n - 1}. F = \u03A3m(S) \u21D4 F = \u03A0M(U \\ S).",
          "Complementation: F' is formed by swapping minterms to maxterms or changing index set to remaining indices in same representation."
        ],
        keyRules: [
          { rule: "Conversion Principle", detail: "F = \u03A3m(1, 3, 5, 7) = \u03A0M(0, 2, 4, 6) in 3-variable space" },
          { rule: "Missing Variable SOP", detail: "AB in 3 vars (A, B, C) becomes AB(C + C') = ABC + ABC'" },
          { rule: "Missing Variable POS", detail: "(A + B) becomes (A + B + CC') = (A + B + C)(A + B + C')" }
        ]
      },
      {
        id: "u2-rev-25",
        sectionId: "2.5",
        title: "Section 2.5: Karnaugh Map Minimization",
        topic: "2, 3 & 4-Variable K-Maps, Gray Code & Wraparound",
        bullets: [
          "Karnaugh Map is a graphical truth table arranged in Gray-code sequence (00, 01, 11, 10) so adjacent cells differ by exactly 1 bit.",
          "Group sizes must strictly be integer powers of two: 1, 2, 4, 8, 16 cells.",
          "Combining 2^k adjacent cells eliminates exactly k variables, producing a term with (n - k) literals.",
          "Wraparound adjacency: The top row wraps around to the bottom row; the leftmost column wraps around to the rightmost column.",
          "The 4 outer corners {0, 2, 8, 10} in a 4-variable map form a valid quad simplifying to B'D'.",
          "Don't-Care terms (d or X) should be grouped with 1s only when doing so enlarges a group or eliminates an isolated 1.",
          "Essential Prime Implicant (EPI): A prime implicant that contains at least one minterm covered by no other prime implicant."
        ],
        keyRules: [
          { rule: "Gray Code Sequence", detail: "00, 01, 11, 10 (crucial swap of 3rd and 4th position)" },
          { rule: "4-Corner Quad", detail: "Cells {0, 2, 8, 10} \u2192 B'D' (in SOP) or (B + D) (in POS)" },
          { rule: "Row Quad", detail: "Row 01 cells {4, 5, 6, 7} \u2192 A'B" },
          { rule: "Column Quad", detail: "Col 01 cells {1, 5, 9, 13} \u2192 C'D" },
          { rule: "Octet Group", detail: "8 cells eliminate 3 variables, yielding a single-literal term" }
        ]
      }
    ]
  },

  // C. RECOMMENDED EDUCATIONAL CHANNELS (Strictly 4 curated channels, no embeds)
  educationalChannels: [
    {
      id: "ch-neso",
      name: "Neso Academy",
      specialty: "Digital Electronics, Number Systems, Boolean Algebra & K-Maps",
      relevantUnits: ["Unit I", "Unit II"],
      reason: "Classroom-paced, highly structured lectures with comprehensive whiteboard derivations. Excellent for beginners building foundation in binary arithmetic, De Morgan proofs, and multi-variable Karnaugh mapping.",
      topicsCovered: [
        "Binary, Octal, Hex Conversions",
        "1's and 2's Complement Subtraction",
        "Axiomatic Boolean Theorems",
        "Canonical \u03A3m and \u03A0M Expansions",
        "K-Map Grouping & Don't Cares"
      ],
      searchQuery: "Neso Academy Digital Electronics"
    },
    {
      id: "ch-aae",
      name: "ALL ABOUT ELECTRONICS",
      specialty: "Digital Circuit Principles, Logic Gates & Timing Animations",
      relevantUnits: ["Unit I", "Unit II"],
      reason: "Outstanding visual animations showing timing diagrams, gate propagation, and step-by-step consensus theorem proofs. Clear audio and engineering rigor make complex reductions easy to follow.",
      topicsCovered: [
        "Logic Gates & Universal NAND/NOR",
        "Boolean Algebra Laws with Examples",
        "De Morgan's Laws & Dual Networks",
        "Canonical SOP to POS Pathways",
        "3 and 4-Variable K-Map Solvers"
      ],
      searchQuery: "ALL ABOUT ELECTRONICS Digital Logic"
    },
    {
      id: "ch-gate-smashers",
      name: "Gate Smashers",
      specialty: "University & Competitive Examination Problem Solving",
      relevantUnits: ["Unit I", "Unit II"],
      reason: "High-energy problem-oriented explanations focused on exam questions, shortcut tricks, and common student traps. Highly recommended for quick pre-exam review and speed technique acquisition.",
      topicsCovered: [
        "Complement Representation Ranges",
        "Signed Binary Arithmetic & Overflow",
        "Fast Boolean Algebraic Simplification",
        "Essential Prime Implicant Identification",
        "Minimal Expression Uniqueness Traps"
      ],
      searchQuery: "Gate Smashers Digital Logic Design"
    },
    {
      id: "ch-ben-eater",
      name: "Ben Eater",
      specialty: "Hardware-Level Digital Circuits & Breadboard Computer Architecture",
      relevantUnits: ["Unit I"],
      reason: "Builds functional 8-bit computers on breadboards using discrete 7400-series TTL chips. Invaluable for students wanting to understand how binary numbers, adders, and registers physically execute on hardware.",
      topicsCovered: [
        "How Logic Gates Work in Physical Silicon",
        "Building an 8-bit Binary Adder from Gates",
        "2's Complement Hardware Subtraction",
        "Clock Signals, Registers & Flip-Flops",
        "Connecting Theoretical Math to Real Circuits"
      ],
      searchQuery: "Ben Eater 8 bit computer digital logic"
    }
  ],

  // D. TRUSTED ACADEMIC REFERENCE WEBSITES (3 websites)
  referenceWebsites: [
    {
      id: "web-aac",
      name: "All About Circuits: Digital Circuits Textbook",
      url: "https://www.allaboutcircuits.com/textbook/digital/",
      displayUrl: "allaboutcircuits.com/textbook/digital",
      relevantUnits: ["Unit I", "Unit II"],
      topics: "Number Systems, Boolean Algebra, Logic Gates, Karnaugh Maps",
      description: "Comprehensive open-access engineering textbook with clear explanations of radix conversion procedures, boolean switching theorems, and digital circuit schematics. Excellent supplementary reading.",
      accessType: "Open Access (Free Online Reading)"
    },
    {
      id: "web-mit-ocw",
      name: "MIT OpenCourseWare: Computation Structures (6.004)",
      url: "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2009/",
      displayUrl: "ocw.mit.edu/courses/6-004",
      relevantUnits: ["Unit I", "Unit II"],
      topics: "Digital Systems, CMOS Logic, Boolean Minimization",
      description: "Archival university course materials from MIT covering the transition from digital abstractions to gate-level design. Includes lecture handouts, worksheets, and problem sets.",
      accessType: "Free OpenCourseWare Archive"
    },
    {
      id: "web-neso-portal",
      name: "Neso Academy: Digital Electronics Learning Portal",
      url: "https://www.nesoacademy.org/cs/15-digitalelectronics",
      displayUrl: "nesoacademy.org/cs/15-digitalelectronics",
      relevantUnits: ["Unit I", "Unit II"],
      topics: "Boolean Algebra, Logic Minimization, Arithmetic Circuits",
      description: "Structured academic portal categorizing lessons according to standard undergraduate curriculum syllabi. Useful for syllabus cross-referencing and supplementary practice questions.",
      accessType: "Web Reference (Registration may be required for some materials)"
    }
  ],

  // E. EXTERNAL ONLINE CALCULATORS AND SOLVERS (4 curated calculators)
  onlineCalculators: [
    {
      id: "calc-dcode-bool",
      name: "dCode: Boolean Expressions Calculator",
      url: "https://www.dcode.fr/boolean-expressions-calculator",
      displayUrl: "dcode.fr/boolean-expressions-calculator",
      category: "Boolean Algebra",
      categoryKey: "boolean",
      relevantUnits: ["Unit II (Sec 2.1 - 2.4)"],
      purpose: "Experiment with algebraic Boolean reduction, expand truth tables, and verify equivalent normal forms.",
      syntaxNote: "Uses ASCII operator syntax: type !A or NOT A for complementation; A && B for AND; A || B for OR.",
      disclaimer: "Independent supplementary calculator. Minimality criterion and syntax conventions may differ from ZeroIndex standard course notation."
    },
    {
      id: "calc-dcode-kmap",
      name: "dCode: Karnaugh Map Calculator",
      url: "https://www.dcode.fr/karnaugh-map",
      displayUrl: "dcode.fr/karnaugh-map",
      category: "Karnaugh Maps",
      categoryKey: "kmap",
      relevantUnits: ["Unit II (Sec 2.5)"],
      purpose: "Generates visual Karnaugh maps for 2 to 4 variables from truth tables or expressions and reveals grouping steps.",
      syntaxNote: "Enter minterms as comma-separated integers (e.g. 0, 2, 8, 10) or paste truth table values.",
      disclaimer: "Supplementary verification tool. Always use the interactive ZeroIndex K-Map Solver for classroom step-by-step derivations."
    },
    {
      id: "calc-rapid-base",
      name: "RapidTables: Number Base Converter",
      url: "https://www.rapidtables.com/convert/number/base-converter.html",
      displayUrl: "rapidtables.com/convert/number/base-converter",
      category: "Number Converters",
      categoryKey: "number",
      relevantUnits: ["Unit I (Sec 1.2 - 1.3)"],
      purpose: "Convert integers and fractional values between binary, octal, decimal, hexadecimal, and arbitrary base-N systems.",
      syntaxNote: "Supports optional radix point '.' for fractional conversion (e.g. 1101.101 in base 2).",
      disclaimer: "External tool for checking homework answers. Ensure you master the manual successive division/multiplication steps."
    },
    {
      id: "calc-digikey-conv",
      name: "DigiKey: Number Conversion Calculator",
      url: "https://www.digikey.in/en/resources/conversion-calculators/conversion-calculator-number-conversion",
      displayUrl: "digikey.in/resources/conversion-calculators",
      category: "Number Converters",
      categoryKey: "number",
      relevantUnits: ["Unit I (Sec 1.2 - 1.3)"],
      purpose: "Engineering lookup calculator simultaneously displaying binary, decimal, octal, hexadecimal, and ASCII representations.",
      syntaxNote: "Real-time lookup grid updating all radix representations upon single-character keystrokes.",
      disclaimer: "Industrial engineer reference tool provided by component distributor DigiKey for rapid hardware representation lookup."
    }
  ],

  // CONTEXTUAL LEARNING CONNECTIONS MAP (LEARN -> EXPERIMENT -> PRACTISE -> REVISE)
  contextualLearningMap: {
    "1.1": {
      lessonId: "1.1",
      unit: 1,
      title: "Digital Systems Foundations",
      solverTarget: { tab: "solvers", unit: 1, solverTab: "gates", label: "Try in Logic Gates Simulator" },
      practiceTarget: { tab: "practice", unit: 1, trackId: "signed", label: "Practise Digital Foundations" },
      resourceTarget: { tab: "syllabus", unit: 1, sheetId: "u1-rev-11", label: "Review Digital Systems Summary" }
    },
    "1.2": {
      lessonId: "1.2",
      unit: 1,
      title: "Number Systems & Positional Radix",
      solverTarget: { tab: "solvers", unit: 1, solverTab: "converter", label: "Try in Base Converter" },
      practiceTarget: { tab: "practice", unit: 1, trackId: "conversions", label: "Practise Number Systems" },
      resourceTarget: { tab: "syllabus", unit: 1, sheetId: "u1-rev-12", label: "Review Radix & Powers Table" }
    },
    "1.3": {
      lessonId: "1.3",
      unit: 1,
      title: "Number-System Conversions",
      solverTarget: { tab: "solvers", unit: 1, solverTab: "converter", label: "Try in Base Converter" },
      practiceTarget: { tab: "practice", unit: 1, trackId: "conversions", label: "Practise Number Conversions" },
      resourceTarget: { tab: "syllabus", unit: 1, sheetId: "u1-rev-13", label: "Review Base Conversion Sheet" }
    },
    "1.4": {
      lessonId: "1.4",
      unit: 1,
      title: "Binary Arithmetic",
      solverTarget: { tab: "solvers", unit: 1, solverTab: "arithmetic", label: "Try in Binary Arithmetic" },
      practiceTarget: { tab: "practice", unit: 1, trackId: "arithmetic", label: "Practise Binary Arithmetic" },
      resourceTarget: { tab: "syllabus", unit: 1, sheetId: "u1-rev-14", label: "Review Arithmetic Rules" }
    },
    "1.5": {
      lessonId: "1.5",
      unit: 1,
      title: "Complements & Subtraction",
      solverTarget: { tab: "solvers", unit: 1, solverTab: "complements", label: "Try in Complement Subtraction" },
      practiceTarget: { tab: "practice", unit: 1, trackId: "complements", label: "Practise Complement Subtraction" },
      resourceTarget: { tab: "syllabus", unit: 1, sheetId: "u1-rev-15", label: "Review Complement Rules" }
    },
    "1.6": {
      lessonId: "1.6",
      unit: 1,
      title: "Signed Number Representation",
      solverTarget: { tab: "solvers", unit: 1, solverTab: "signed", label: "Try in Signed Range Checker" },
      practiceTarget: { tab: "practice", unit: 1, trackId: "signed", label: "Practise Signed Representation" },
      resourceTarget: { tab: "syllabus", unit: 1, sheetId: "u1-rev-16", label: "Review Signed Ranges Table" }
    },
    "1.7": {
      lessonId: "1.7",
      unit: 1,
      title: "Logic Gates & Truth Tables",
      solverTarget: { tab: "solvers", unit: 1, solverTab: "gates", label: "Try in Logic Gates Simulator" },
      practiceTarget: { tab: "practice", unit: 1, trackId: "all", label: "Practise Logic Gate Problems" },
      resourceTarget: { tab: "syllabus", unit: 1, sheetId: "u1-rev-17", label: "Review Gate Truth Tables" }
    },
    "2.1": {
      lessonId: "2.1",
      unit: 2,
      title: "Boolean Laws & Axioms",
      solverTarget: { tab: "solvers", unit: 2, solverTab: "simplifier", label: "Try in Boolean Simplifier" },
      practiceTarget: { tab: "practice", unit: 2, trackId: "sec21", label: "Practise Boolean Laws" },
      resourceTarget: { tab: "syllabus", unit: 2, sheetId: "u2-rev-21", label: "Review Important Boolean Laws" }
    },
    "2.2": {
      lessonId: "2.2",
      unit: 2,
      title: "Algebraic Simplification",
      solverTarget: { tab: "solvers", unit: 2, solverTab: "simplifier", label: "Try in Boolean Simplifier" },
      practiceTarget: { tab: "practice", unit: 2, trackId: "sec22", label: "Practise Algebraic Simplification" },
      resourceTarget: { tab: "syllabus", unit: 2, sheetId: "u2-rev-22", label: "Review Reduction Shortcuts" }
    },
    "2.3": {
      lessonId: "2.3",
      unit: 2,
      title: "Minterms and Maxterms",
      solverTarget: { tab: "solvers", unit: 2, solverTab: "mintermMaxterm", label: "Open Minterm/Maxterm Explorer" },
      practiceTarget: { tab: "practice", unit: 2, trackId: "sec23", label: "Practise Canonical Indexing" },
      resourceTarget: { tab: "syllabus", unit: 2, sheetId: "u2-rev-23", label: "Review Index Polarity Table" }
    },
    "2.4": {
      lessonId: "2.4",
      unit: 2,
      title: "SOP and POS Conversions",
      solverTarget: { tab: "solvers", unit: 2, solverTab: "sopPos", label: "Try in Conversion Studio" },
      practiceTarget: { tab: "practice", unit: 2, trackId: "sec24", label: "Practise SOP/POS Conversions" },
      resourceTarget: { tab: "syllabus", unit: 2, sheetId: "u2-rev-24", label: "Review Conversion Cheat Sheet" }
    },
    "2.5": {
      lessonId: "2.5",
      unit: 2,
      title: "Karnaugh Maps",
      solverTarget: { tab: "solvers", unit: 2, solverTab: "kmap", label: "Try in K-Map Solver" },
      practiceTarget: { tab: "practice", unit: 2, trackId: "sec25", label: "Practise K-Map Minimization" },
      resourceTarget: { tab: "syllabus", unit: 2, sheetId: "u2-rev-25", label: "Review K-Map Grouping Rules" }
    }
  }
};

export const dldSubjectResourcesUnits = dldSubjectResourcesData.unitsMetadata;
export const dldPrescribedTextbooks = dldSubjectResourcesData.studyMaterials.textbooks;
export const dldReferenceBooks = dldSubjectResourcesData.studyMaterials.referenceBooks;
export const dldGoogleDriveMaterials = dldSubjectResourcesData.studyMaterials.driveConfig;
export const dldFormulaSheets = dldSubjectResourcesData.formulaSheets;
export const dldCuratedChannels = dldSubjectResourcesData.educationalChannels;
export const dldReferenceWebsites = dldSubjectResourcesData.referenceWebsites;
export const dldExternalCalculators = dldSubjectResourcesData.onlineCalculators.calculators;
export const dldCalculatorNotice = dldSubjectResourcesData.onlineCalculators.notice;
export const contextualLearningMap = dldSubjectResourcesData.contextualLearningMap;

export default dldSubjectResourcesData;
