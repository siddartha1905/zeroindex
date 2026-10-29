/**
 * Digital Logic Design (DLD) Official Syllabus & Metadata
 * Course Code: 1005261102 | I Year - I Semester | L-T-P-C: 3-0-0-3
 * Vignan’s Institute of Information Technology (A)
 * Exact word-for-word syllabus matching official PDF
 */

export const dldSyllabus = {
  courseCode: "1005261102",
  courseTitle: "Digital Logic Design",
  curriculum: "VR23 / Autonomous Regulations",
  yearSem: "I Year - I Semester",
  branch: "B.Tech (Data Science / Computer Science & Engineering)",
  ltpc: "L-T-P-C: 3-0-0-3",
  credits: 3,
  syllabusPdfUrl: null,
  overview: "This course introduces logic design and the basic building blocks used in digital systems, in particular digital computers. It starts with a discussion of combinational logic: logic gates, minimization techniques, arithmetic circuits, and modern logic devices such as field programmable logic. It also deals with sequential circuits: flip-flops, synthesis of sequential circuits, and case studies, including counters and registers.",
  objectives: [
    "To solve typical number base conversions",
    "To optimize logic gates using various techniques",
    "To introduce the basic tools for designing combinational and sequential digital logic."
  ],
  outcomes: [
    {
      code: "CO1",
      description: "Explain number systems, conversions, binary arithmetic, and complements.",
      targetUnit: "Unit 1"
    },
    {
      code: "CO2",
      description: "Simplify Boolean functions using Boolean laws, K-maps, and tabular methods.",
      targetUnit: "Unit 2"
    },
    {
      code: "CO3",
      description: "Design combinational circuits such as adders, subtractors, encoders, decoders, and multiplexers.",
      targetUnit: "Unit 3"
    },
    {
      code: "CO4",
      description: "Analyze different types of flip-flops and their characteristics and conversions.",
      targetUnit: "Unit 4"
    },
    {
      code: "CO5",
      description: "Design registers, shift registers, and synchronous and asynchronous counters.",
      targetUnit: "Unit 5"
    }
  ],
  units: [
    {
      unitNumber: 1,
      roman: "UNIT-I",
      title: "Digital Systems and Binary Arithmetic",
      status: "Active",
      hours: "9 Lectures",
      courseOutcome: "CO1",
      summary: "Digital Systems and Digital Computers, Analog and Digital Systems, Decimal, Binary, Octal and Hexadecimal Number Systems, Number System Conversions, Binary Arithmetic - Addition and Subtraction, Complements - 1's, 2's, 9's and 10's Complements, Signed Binary Numbers, Representation of Positive and Negative Numbers, Logic Gates.",
      topics: [
        "Digital Systems and Digital Computers",
        "Analog and Digital Systems",
        "Decimal, Binary, Octal and Hexadecimal Number Systems",
        "Number System Conversions",
        "Binary Arithmetic - Addition and Subtraction",
        "Complements - 1's, 2's, 9's and 10's Complements",
        "Signed Binary Numbers",
        "Representation of Positive and Negative Numbers",
        "Logic Gates"
      ]
    },
    {
      unitNumber: 2,
      roman: "UNIT-II",
      title: "Boolean Algebra and Gate-Level Minimization",
      status: "Available (Sections 2.1 to 2.7 Complete)",
      hours: "9 Lectures",
      courseOutcome: "CO2",
      summary: "Concept of Boolean algebra, Basic Theorems and Properties of Boolean algebra, Boolean Functions, Canonical and Standard Forms, Minterms and Maxterms, Products of Sum Simplification, Sum of Products Simplification, Gate level Minimization Map Method, Three-Variable K-Map, Four Variable K-Maps, Don't-Care Conditions, NAND and NOR Implementation, Exclusive-OR Function implementation using NAND and NOR gates.",
      topics: [
        "Concept of Boolean algebra",
        "Basic Theorems and Properties of Boolean algebra",
        "Boolean Functions",
        "Canonical and Standard Forms",
        "Minterms and Maxterms",
        "Products of Sum Simplification",
        "Sum of Products Simplification",
        "Gate level Minimization Map Method",
        "Three-Variable K-Map",
        "Four Variable K-Maps",
        "Don't-Care Conditions",
        "NAND and NOR Implementation",
        "Exclusive-OR Function implementation using NAND and NOR gates"
      ]
    },
    {
      unitNumber: 3,
      roman: "UNIT-III",
      title: "Combinational Logic",
      status: "Planned",
      hours: "9 Lectures",
      courseOutcome: "CO3",
      summary: "Combinational Logic Introduction, Analysis Procedure, Half Adder, Full Adder, Half Subtractor, Full Subtractor, Binary Adder, Binary Adder-Subtractor, BCD Adder, Decoders, Encoders, Multiplexers, Demultiplexers, Priority Encoder, Code Converters.",
      topics: [
        "Combinational Logic Introduction",
        "Analysis Procedure",
        "Half Adder",
        "Full Adder",
        "Half Subtractor",
        "Full Subtractor",
        "Binary Adder",
        "Binary Adder-Subtractor",
        "BCD Adder",
        "Decoders",
        "Encoders",
        "Multiplexers",
        "Demultiplexers",
        "Priority Encoder",
        "Code Converters"
      ]
    },
    {
      unitNumber: 4,
      roman: "UNIT-IV",
      title: "Sequential Logic",
      status: "Planned",
      hours: "9 Lectures",
      courseOutcome: "CO4",
      summary: "Introduction to Sequential Circuits, Storage Elements, Latches, RS Latch using NAND and NOR Gates, Truth Tables, RS, JK, D and T Flip-Flops, Characteristic and Excitation Tables, Race-Around Condition in JK Flip-Flop, Master-Slave JK Flip-Flop, Flip-Flop Conversion.",
      topics: [
        "Introduction to Sequential Circuits",
        "Storage Elements",
        "Latches",
        "RS Latch using NAND and NOR Gates",
        "Truth Tables",
        "RS, JK, D and T Flip-Flops",
        "Characteristic and Excitation Tables",
        "Race-Around Condition in JK Flip-Flop",
        "Master-Slave JK Flip-Flop",
        "Flip-Flop Conversion"
      ]
    },
    {
      unitNumber: 5,
      roman: "UNIT-V",
      title: "Registers and Counters",
      status: "Planned",
      hours: "9 Lectures",
      courseOutcome: "CO5",
      summary: "Registers, Shift Registers, Serial and Parallel Data Transfer, SISO, SIPO, PISO and PIPO Shift Registers, Ring Counter, Johnson Counter, Ripple Counters, Synchronous Counters, Design of Modulo-N Counters.",
      topics: [
        "Registers",
        "Shift Registers",
        "Serial and Parallel Data Transfer",
        "SISO, SIPO, PISO and PIPO Shift Registers",
        "Ring Counter",
        "Johnson Counter",
        "Ripple Counters",
        "Synchronous Counters",
        "Design of Modulo-N Counters"
      ]
    }
  ],
  textbooks: [
    {
      id: "tb1",
      number: 1,
      title: "Digital Design",
      edition: "5/e",
      authors: "M.Morris Mano, Michael D Ciletti",
      publisher: "PEA",
      driveLink: null,
      statusText: "Link not yet added",
      description: "Primary prescribed textbook covering Boolean algebra, gate-level minimization, combinational logic design, synchronous sequential circuits, registers, and counters."
    },
    {
      id: "tb2",
      number: 2,
      title: "Fundamentals of Logic Design",
      edition: "5/e",
      authors: "Roth",
      publisher: "Cengage",
      driveLink: null,
      statusText: "Link not yet added",
      description: "Rigorous treatment of digital systems, state machines, timing diagrams, flip-flop conversions, and sequential circuit synthesis."
    }
  ],
  referenceBooks: [
    {
      id: "rb1",
      number: 1,
      title: "Digital Logic and Computer Design",
      authors: "M.Morris Mano",
      publisher: "PEA",
      driveLink: null,
      statusText: "Link not yet added"
    },
    {
      id: "rb2",
      number: 2,
      title: "Digital Logic Design",
      authors: "Leach, Malvino, Saha",
      publisher: "TMH",
      driveLink: null,
      statusText: "Link not yet added"
    },
    {
      id: "rb3",
      number: 3,
      title: "Modern Digital Electronics",
      authors: "R.P. Jain",
      publisher: "TMH",
      driveLink: null,
      statusText: "Link not yet added"
    }
  ]
};
