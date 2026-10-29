export const dldSection27Data = {
  "id": "2.7",
  "number": "2.7",
  "title": "NAND and NOR Implementation",
  "badge": "Universal Logic Synthesis",
  "status": "Under Faculty Review",
  "estimatedReadTime": "25 min read",
  "overview": "While Boolean switching functions are algebraically formulated using AND, OR, and NOT operations, physical digital integrated circuits are constructed predominantly using universal inverting gates: NAND and NOR. A logic gate is functionally complete (universal) if any arbitrary switching function can be synthesized using only that single gate type. This section establishes the functional completeness of NAND and NOR gates, details graphical De Morgan transformations and bubble pushing rules, demonstrates the direct mapping of two-level SOP and POS expressions into NAND-NAND and NOR-NOR structures, and provides systematic procedures for synthesizing multi-level gate networks with explicit fan-in constraints, intermediate signal verification, and logic level optimization.",
  "introductoryBullets": [
    {
      "label": "WHY",
      "text": "CMOS semiconductor technology fabricates inverting gates (NAND and NOR) faster, smaller, and with fewer transistors than AND or OR gates."
    },
    {
      "label": "WHERE",
      "text": "Forms the core technology mapping phase inside digital synthesis compilers (FPGA/ASIC) converting RTL code into silicon standard cells."
    },
    {
      "label": "WHAT",
      "text": "The systematic algebraic and graphical transformation of Boolean expressions into universal NAND-only or NOR-only multi-level networks."
    },
    {
      "label": "HOW",
      "text": "Through double negation, De Morgan duality transformations, and graphic bubble cancellation along internal signal interconnects."
    },
    {
      "label": "WHY CHOSEN",
      "text": "Enables arbitrary digital logic to be manufactured using a single standardized gate cell, drastically lowering tooling and mask fabrication costs."
    },
    {
      "label": "REMEMBER",
      "text": "Two-level circuits have a fixed depth of two gate delays; multi-level synthesis factors expressions into deeper networks to satisfy fan-in limits."
    }
  ],
  "learningOutcomes": [
    "Identify and explain all seven standard logic gates across the basic, universal, and exclusive families.",
    "Prove the functional completeness of NAND and NOR gates by synthesizing NOT, AND, and OR operations.",
    "Construct all twelve standard gate realisations using strictly 2-input NAND gates or strictly 2-input NOR gates.",
    "Convert two-level Sum of Products (SOP) expressions into equivalent two-level NAND-NAND networks using double negation.",
    "Convert two-level Product of Sums (POS) expressions into equivalent two-level NOR-NOR networks using double negation.",
    "Synthesize genuine multi-level logic circuits under explicit fan-in constraints with accurate gate counts and logic depths.",
    "Exhaustively verify intermediate signal equations and final circuit outputs against original Boolean truth tables."
  ],
  "sevenGates": [
    {
      "id": "not",
      "name": "NOT Gate (Inverter)",
      "family": "Basic",
      "symbolType": "NOT",
      "expression": "F = A'",
      "operatorSymbol": "' (Prime / Overbar)",
      "inputs": [
        "A"
      ],
      "output": "F",
      "operation": "Inverts the input signal. The output is 1 when the input is 0, and 0 when the input is 1.",
      "practicalExample": "Normally closed safety trip sensor: output signal is High (safe) when the switch is unpressed (0), and drops to Low (emergency stop) when pressed (1).",
      "truthTable": [
        {
          "A": 0,
          "F": 1
        },
        {
          "A": 1,
          "F": 0
        }
      ]
    },
    {
      "id": "and",
      "name": "AND Gate",
      "family": "Basic",
      "symbolType": "AND",
      "expression": "F = AB",
      "operatorSymbol": "· (Dot / Conjunction)",
      "inputs": [
        "A",
        "B"
      ],
      "output": "F",
      "operation": "Logical conjunction. The output is 1 if and only if both input A and input B are simultaneously 1.",
      "practicalExample": "Two-hand safety control on an industrial stamping press: both the left push-button (A) and right push-button (B) must be depressed together to activate the press (F).",
      "truthTable": [
        {
          "A": 0,
          "B": 0,
          "F": 0
        },
        {
          "A": 0,
          "B": 1,
          "F": 0
        },
        {
          "A": 1,
          "B": 0,
          "F": 0
        },
        {
          "A": 1,
          "B": 1,
          "F": 1
        }
      ]
    },
    {
      "id": "or",
      "name": "OR Gate",
      "family": "Basic",
      "symbolType": "OR",
      "expression": "F = A + B",
      "operatorSymbol": "+ (Plus / Disjunction)",
      "inputs": [
        "A",
        "B"
      ],
      "output": "F",
      "operation": "Logical disjunction. The output is 1 if either input A is 1, input B is 1, or both inputs are 1.",
      "practicalExample": "Automobile door-ajar alarm: either the driver door switch (A) or the passenger door switch (B) being open activates the cabin interior dome light (F).",
      "truthTable": [
        {
          "A": 0,
          "B": 0,
          "F": 0
        },
        {
          "A": 0,
          "B": 1,
          "F": 1
        },
        {
          "A": 1,
          "B": 0,
          "F": 1
        },
        {
          "A": 1,
          "B": 1,
          "F": 1
        }
      ]
    },
    {
      "id": "nand",
      "name": "NAND Gate",
      "family": "Universal",
      "symbolType": "NAND",
      "expression": "F = (AB)'",
      "operatorSymbol": "NOT-AND (Inverted Conjunction)",
      "inputs": [
        "A",
        "B"
      ],
      "output": "F",
      "operation": "Inverted AND operation. The output is 0 only when both inputs A and B are 1; otherwise, the output is 1.",
      "practicalExample": "Aircraft engine warning disarm: an emergency warning sounds (F = 1) unless both the primary oil sensor (A) and auxiliary oil sensor (B) report healthy pressure.",
      "truthTable": [
        {
          "A": 0,
          "B": 0,
          "F": 1
        },
        {
          "A": 0,
          "B": 1,
          "F": 1
        },
        {
          "A": 1,
          "B": 0,
          "F": 1
        },
        {
          "A": 1,
          "B": 1,
          "F": 0
        }
      ]
    },
    {
      "id": "nor",
      "name": "NOR Gate",
      "family": "Universal",
      "symbolType": "NOR",
      "expression": "F = (A + B)'",
      "operatorSymbol": "NOT-OR (Inverted Disjunction)",
      "inputs": [
        "A",
        "B"
      ],
      "output": "F",
      "operation": "Inverted OR operation. The output is 1 only when both inputs A and B are simultaneously 0; otherwise, the output is 0.",
      "practicalExample": "Greenhouse thermal safe-zone monitor: output is Active (1) only when neither high-temperature alarm (A) nor low-temperature alarm (B) is triggered.",
      "truthTable": [
        {
          "A": 0,
          "B": 0,
          "F": 1
        },
        {
          "A": 0,
          "B": 1,
          "F": 0
        },
        {
          "A": 1,
          "B": 0,
          "F": 0
        },
        {
          "A": 1,
          "B": 1,
          "F": 0
        }
      ]
    },
    {
      "id": "xor",
      "name": "XOR Gate (Exclusive-OR)",
      "family": "Exclusive",
      "symbolType": "XOR",
      "expression": "F = A'B + AB'",
      "operatorSymbol": "⊕ (Circled Plus)",
      "inputs": [
        "A",
        "B"
      ],
      "output": "F",
      "operation": "Exclusive disjunction (difference detector). The output is 1 if and only if the inputs are different (one is 1 and the other is 0).",
      "practicalExample": "Two-way stairwell light switch: flipping either wall switch (A or B) independently toggles the state of the stairwell light (F).",
      "truthTable": [
        {
          "A": 0,
          "B": 0,
          "F": 0
        },
        {
          "A": 0,
          "B": 1,
          "F": 1
        },
        {
          "A": 1,
          "B": 0,
          "F": 1
        },
        {
          "A": 1,
          "B": 1,
          "F": 0
        }
      ]
    },
    {
      "id": "xnor",
      "name": "XNOR Gate (Exclusive-NOR)",
      "family": "Exclusive",
      "symbolType": "XNOR",
      "expression": "F = AB + A'B'",
      "operatorSymbol": "⊙ (Circled Dot / Equivalence)",
      "inputs": [
        "A",
        "B"
      ],
      "output": "F",
      "operation": "Logical equivalence (equality detector). The output is 1 if and only if both inputs are identical (both 0 or both 1).",
      "practicalExample": "Digital 1-bit comparator equality bit: generates an equality match signal (F = 1) whenever bit A equals bit B.",
      "truthTable": [
        {
          "A": 0,
          "B": 0,
          "F": 1
        },
        {
          "A": 0,
          "B": 1,
          "F": 0
        },
        {
          "A": 1,
          "B": 0,
          "F": 0
        },
        {
          "A": 1,
          "B": 1,
          "F": 1
        }
      ]
    }
  ],
  "universalFoundations": {
    "simpleDefinition": "A logic gate family is universal when any digital circuit, no matter how complex, can be constructed using only that single gate type without requiring any other components.",
    "formalDefinition": "A set of Boolean operators S is functionally complete if the closure of S under functional composition equals the set of all finite switching functions. The singleton sets {NAND} and {NOR} are individually functionally complete because the primitive generating basis {NOT, AND, OR} can be homomorphically embedded within either singleton using De Morgan duality.",
    "whyNandUniversal": {
      "title": "Why NAND is Functionally Complete",
      "summary": "Any Boolean function can be expressed in Sum of Products (SOP) form using {NOT, AND, OR}. If a single gate type can reproduce all three operations, it can reproduce every possible function.",
      "steps": [
        {
          "target": "NOT (Inversion)",
          "formula": "F = (A · A)' = A'",
          "explanation": "Tie both inputs of a 2-input NAND gate together. When input is 0, (0·0)' = 1. When input is 1, (1·1)' = 0. Gate count: 1.",
          "circuit": {
            "width": 260,
            "height": 80,
            "inputs": [
              {
                "id": "A",
                "label": "A",
                "x": 25,
                "y": 40
              }
            ],
            "gates": [
              {
                "id": "G1",
                "type": "NAND",
                "x": 80,
                "y": 25,
                "label": "G1",
                "level": 1
              }
            ],
            "wires": [
              {
                "id": "w1",
                "from": "A",
                "to": "j1",
                "d": "M 25 40 L 55 40",
                "net": "A"
              },
              {
                "id": "w2",
                "from": "j1",
                "to": "G1.in1",
                "d": "M 55 40 L 55 33 L 80 33",
                "net": "A"
              },
              {
                "id": "w3",
                "from": "j1",
                "to": "G1.in2",
                "d": "M 55 40 L 55 47 L 80 47",
                "net": "A"
              },
              {
                "id": "w4",
                "from": "G1.out",
                "to": "F",
                "d": "M 123 40 L 180 40",
                "net": "A'"
              }
            ],
            "junctions": [
              {
                "x": 55,
                "y": 40,
                "r": 3.5
              }
            ],
            "labels": [],
            "output": {
              "label": "F = A'",
              "x": 185,
              "y": 40
            }
          }
        },
        {
          "target": "AND (Conjunction)",
          "formula": "F = ((AB)')' = AB",
          "explanation": "Pass inputs A and B through a NAND gate to form (AB)', then invert that intermediate signal using a second tied-input NAND gate. Gate count: 2.",
          "circuit": {
            "width": 320,
            "height": 80,
            "inputs": [
              {
                "id": "A",
                "label": "A",
                "x": 25,
                "y": 33
              },
              {
                "id": "B",
                "label": "B",
                "x": 25,
                "y": 47
              }
            ],
            "gates": [
              {
                "id": "G1",
                "type": "NAND",
                "x": 70,
                "y": 25,
                "label": "G1",
                "level": 1
              },
              {
                "id": "G2",
                "type": "NAND",
                "x": 180,
                "y": 25,
                "label": "G2",
                "level": 2
              }
            ],
            "wires": [
              {
                "id": "w1",
                "from": "A",
                "to": "G1.in1",
                "d": "M 25 33 L 70 33",
                "net": "A"
              },
              {
                "id": "w2",
                "from": "B",
                "to": "G1.in2",
                "d": "M 25 47 L 70 47",
                "net": "B"
              },
              {
                "id": "w3",
                "from": "G1.out",
                "to": "j1",
                "d": "M 113 40 L 150 40",
                "net": "p"
              },
              {
                "id": "w4",
                "from": "j1",
                "to": "G2.in1",
                "d": "M 150 40 L 150 33 L 180 33",
                "net": "p"
              },
              {
                "id": "w5",
                "from": "j1",
                "to": "G2.in2",
                "d": "M 150 40 L 150 47 L 180 47",
                "net": "p"
              },
              {
                "id": "w6",
                "from": "G2.out",
                "to": "F",
                "d": "M 223 40 L 265 40",
                "net": "AB"
              }
            ],
            "junctions": [
              {
                "x": 150,
                "y": 40,
                "r": 3.5
              }
            ],
            "labels": [
              {
                "text": "p=(AB)'",
                "x": 120,
                "y": 22
              }
            ],
            "output": {
              "label": "F = AB",
              "x": 270,
              "y": 40
            }
          }
        },
        {
          "target": "OR (Disjunction)",
          "formula": "F = (A' · B')' = A'' + B'' = A + B",
          "explanation": "Invert input A with NAND 1 to get A', invert input B with NAND 2 to get B', then feed A' and B' into NAND 3. By De Morgan's theorem, (A'B')' = A + B. Gate count: 3.",
          "circuit": {
            "width": 320,
            "height": 110,
            "inputs": [
              {
                "id": "A",
                "label": "A",
                "x": 25,
                "y": 25
              },
              {
                "id": "B",
                "label": "B",
                "x": 25,
                "y": 85
              }
            ],
            "gates": [
              {
                "id": "G1",
                "type": "NAND",
                "x": 70,
                "y": 10,
                "label": "G1",
                "level": 1
              },
              {
                "id": "G2",
                "type": "NAND",
                "x": 70,
                "y": 70,
                "label": "G2",
                "level": 1
              },
              {
                "id": "G3",
                "type": "NAND",
                "x": 180,
                "y": 40,
                "label": "G3",
                "level": 2
              }
            ],
            "wires": [
              {
                "id": "w1",
                "from": "A",
                "to": "j1",
                "d": "M 25 25 L 45 25",
                "net": "A"
              },
              {
                "id": "w2",
                "from": "j1",
                "to": "G1.in1",
                "d": "M 45 25 L 45 18 L 70 18",
                "net": "A"
              },
              {
                "id": "w3",
                "from": "j1",
                "to": "G1.in2",
                "d": "M 45 25 L 45 32 L 70 32",
                "net": "A"
              },
              {
                "id": "w4",
                "from": "B",
                "to": "j2",
                "d": "M 25 85 L 45 85",
                "net": "B"
              },
              {
                "id": "w5",
                "from": "j2",
                "to": "G2.in1",
                "d": "M 45 85 L 45 78 L 70 78",
                "net": "B"
              },
              {
                "id": "w6",
                "from": "j2",
                "to": "G2.in2",
                "d": "M 45 85 L 45 92 L 70 92",
                "net": "B"
              },
              {
                "id": "w7",
                "from": "G1.out",
                "to": "G3.in1",
                "d": "M 113 25 L 145 25 L 145 48 L 180 48",
                "net": "A'"
              },
              {
                "id": "w8",
                "from": "G2.out",
                "to": "G3.in2",
                "d": "M 113 85 L 145 85 L 145 62 L 180 62",
                "net": "B'"
              },
              {
                "id": "w9",
                "from": "G3.out",
                "to": "F",
                "d": "M 223 55 L 265 55",
                "net": "A+B"
              }
            ],
            "junctions": [
              {
                "x": 45,
                "y": 25,
                "r": 3.5
              },
              {
                "x": 45,
                "y": 85,
                "r": 3.5
              }
            ],
            "labels": [
              {
                "text": "A'",
                "x": 129,
                "y": 17
              },
              {
                "text": "B'",
                "x": 129,
                "y": 95
              }
            ],
            "output": {
              "label": "F = A + B",
              "x": 270,
              "y": 55
            }
          }
        }
      ]
    },
    "whyNorUniversal": {
      "title": "Why NOR is Functionally Complete",
      "summary": "Similarly, any Boolean function can be expressed in Product of Sums (POS) form using {NOT, OR, AND}. By reproducing these three operations, NOR alone achieves universal synthesis.",
      "steps": [
        {
          "target": "NOT (Inversion)",
          "formula": "F = (A + A)' = A'",
          "explanation": "Tie both inputs of a 2-input NOR gate together. When input is 0, (0+0)' = 1. When input is 1, (1+1)' = 0. Gate count: 1.",
          "circuit": {
            "width": 260,
            "height": 80,
            "inputs": [
              {
                "id": "A",
                "label": "A",
                "x": 25,
                "y": 40
              }
            ],
            "gates": [
              {
                "id": "R1",
                "type": "NOR",
                "x": 80,
                "y": 25,
                "label": "R1",
                "level": 1
              }
            ],
            "wires": [
              {
                "id": "w1",
                "from": "A",
                "to": "j1",
                "d": "M 25 40 L 55 40",
                "net": "A"
              },
              {
                "id": "w2",
                "from": "j1",
                "to": "R1.in1",
                "d": "M 55 40 L 55 33 L 80 33",
                "net": "A"
              },
              {
                "id": "w3",
                "from": "j1",
                "to": "R1.in2",
                "d": "M 55 40 L 55 47 L 80 47",
                "net": "A"
              },
              {
                "id": "w4",
                "from": "R1.out",
                "to": "F",
                "d": "M 120 40 L 180 40",
                "net": "A'"
              }
            ],
            "junctions": [
              {
                "x": 55,
                "y": 40,
                "r": 3.5
              }
            ],
            "labels": [],
            "output": {
              "label": "F = A'",
              "x": 185,
              "y": 40
            }
          }
        },
        {
          "target": "OR (Disjunction)",
          "formula": "F = ((A + B)')' = A + B",
          "explanation": "Pass inputs A and B through a NOR gate to form (A + B)', then invert the result using a second tied-input NOR gate. Gate count: 2.",
          "circuit": {
            "width": 320,
            "height": 80,
            "inputs": [
              {
                "id": "A",
                "label": "A",
                "x": 25,
                "y": 33
              },
              {
                "id": "B",
                "label": "B",
                "x": 25,
                "y": 47
              }
            ],
            "gates": [
              {
                "id": "R1",
                "type": "NOR",
                "x": 70,
                "y": 25,
                "label": "R1",
                "level": 1
              },
              {
                "id": "R2",
                "type": "NOR",
                "x": 180,
                "y": 25,
                "label": "R2",
                "level": 2
              }
            ],
            "wires": [
              {
                "id": "w1",
                "from": "A",
                "to": "R1.in1",
                "d": "M 25 33 L 70 33",
                "net": "A"
              },
              {
                "id": "w2",
                "from": "B",
                "to": "R1.in2",
                "d": "M 25 47 L 70 47",
                "net": "B"
              },
              {
                "id": "w3",
                "from": "R1.out",
                "to": "j1",
                "d": "M 110 40 L 150 40",
                "net": "p"
              },
              {
                "id": "w4",
                "from": "j1",
                "to": "R2.in1",
                "d": "M 150 40 L 150 33 L 180 33",
                "net": "p"
              },
              {
                "id": "w5",
                "from": "j1",
                "to": "R2.in2",
                "d": "M 150 40 L 150 47 L 180 47",
                "net": "p"
              },
              {
                "id": "w6",
                "from": "R2.out",
                "to": "F",
                "d": "M 220 40 L 265 40",
                "net": "A+B"
              }
            ],
            "junctions": [
              {
                "x": 150,
                "y": 40,
                "r": 3.5
              }
            ],
            "labels": [
              {
                "text": "p=(A+B)'",
                "x": 115,
                "y": 22
              }
            ],
            "output": {
              "label": "F = A + B",
              "x": 270,
              "y": 40
            }
          }
        },
        {
          "target": "AND (Conjunction)",
          "formula": "F = (A' + B')' = A'' · B'' = AB",
          "explanation": "Invert input A with NOR 1 to get A', invert input B with NOR 2 to get B', then feed A' and B' into NOR 3. By De Morgan's theorem, (A' + B')' = AB. Gate count: 3.",
          "circuit": {
            "width": 320,
            "height": 110,
            "inputs": [
              {
                "id": "A",
                "label": "A",
                "x": 25,
                "y": 25
              },
              {
                "id": "B",
                "label": "B",
                "x": 25,
                "y": 85
              }
            ],
            "gates": [
              {
                "id": "R1",
                "type": "NOR",
                "x": 70,
                "y": 10,
                "label": "R1",
                "level": 1
              },
              {
                "id": "R2",
                "type": "NOR",
                "x": 70,
                "y": 70,
                "label": "R2",
                "level": 1
              },
              {
                "id": "R3",
                "type": "NOR",
                "x": 180,
                "y": 40,
                "label": "R3",
                "level": 2
              }
            ],
            "wires": [
              {
                "id": "w1",
                "from": "A",
                "to": "j1",
                "d": "M 25 25 L 45 25",
                "net": "A"
              },
              {
                "id": "w2",
                "from": "j1",
                "to": "R1.in1",
                "d": "M 45 25 L 45 18 L 70 18",
                "net": "A"
              },
              {
                "id": "w3",
                "from": "j1",
                "to": "R1.in2",
                "d": "M 45 25 L 45 32 L 70 32",
                "net": "A"
              },
              {
                "id": "w4",
                "from": "B",
                "to": "j2",
                "d": "M 25 85 L 45 85",
                "net": "B"
              },
              {
                "id": "w5",
                "from": "j2",
                "to": "R2.in1",
                "d": "M 45 85 L 45 78 L 70 78",
                "net": "B"
              },
              {
                "id": "w6",
                "from": "j2",
                "to": "R2.in2",
                "d": "M 45 85 L 45 92 L 70 92",
                "net": "B"
              },
              {
                "id": "w7",
                "from": "R1.out",
                "to": "R3.in1",
                "d": "M 110 25 L 145 25 L 145 48 L 180 48",
                "net": "A'"
              },
              {
                "id": "w8",
                "from": "R2.out",
                "to": "R3.in2",
                "d": "M 110 85 L 145 85 L 145 62 L 180 62",
                "net": "B'"
              },
              {
                "id": "w9",
                "from": "R3.out",
                "to": "F",
                "d": "M 220 55 L 265 55",
                "net": "AB"
              }
            ],
            "junctions": [
              {
                "x": 45,
                "y": 25,
                "r": 3.5
              },
              {
                "x": 45,
                "y": 85,
                "r": 3.5
              }
            ],
            "labels": [
              {
                "text": "A'",
                "x": 126,
                "y": 17
              },
              {
                "text": "B'",
                "x": 126,
                "y": 95
              }
            ],
            "output": {
              "label": "F = AB",
              "x": 270,
              "y": 55
            }
          }
        }
      ]
    },
    "practicalImportance": {
      "title": "Practical Engineering Tradeoffs and Technology Nuances",
      "aspects": [
        {
          "heading": "Standardized Logic Implementation",
          "text": "Using a universal gate family provides design uniformity. When all logic is constructed from a single gate type, automated synthesis, standard cell placement, and routing tools can optimize circuit layouts efficiently."
        },
        {
          "heading": "Component Inventory and Board-Level Design",
          "text": "In discrete digital circuit design, using quad 2-input NAND packages (such as 74HC00) or quad 2-input NOR packages (such as 74HC02) avoids stocking multiple discrete part numbers, reducing component variety on circuit boards."
        },
        {
          "heading": "CMOS Transistor Considerations",
          "text": "In static CMOS technology, a 2-input NAND gate uses 2 PMOS in parallel and 2 NMOS in series, while a 2-input NOR gate uses 2 PMOS in series and 2 NMOS in parallel. Because electron mobility in NMOS is higher than hole mobility in PMOS, series NMOS transistors offer lower resistance than series PMOS transistors. This structural difference makes CMOS NAND gates naturally faster and more compact than CMOS NOR gates of comparable driving strength."
        },
        {
          "heading": "Realistic Engineering Tradeoffs",
          "text": "While individual NAND and NOR gates use fewer transistors than non-inverting AND and OR gates (which require an internal inverter stage), building an entire circuit with only NAND or only NOR can sometimes increase total gate count. Physical performance, silicon area, dynamic power, and propagation delay always depend on the specific circuit structure, logic depth, and fabrication library."
        }
      ]
    },
    "practicalScenarios": [
      {
        "title": "Scenario 1: Industrial Machine Safety Interlock",
        "function": "F = AB + C (Machine operates if either dual start buttons A and B are held, or maintenance override C is active)",
        "nandImplementation": "Synthesized using 3 NAND gates: G1 = (AB)', G2 = C' = (CC)', G3 = (G1 · G2)' = AB + C.",
        "norImplementation": "Converted to POS F = (A + C)(B + C), synthesized using 3 NOR gates: R1 = (A + C)', R2 = (B + C)', R3 = (R1 + R2)' = (A + C)(B + C).",
        "takeaway": "Both universal families achieve the same logic function in 3 gates, allowing designers to select the family native to their specific ASIC cell library."
      },
      {
        "title": "Scenario 2: Secure Access Authorization",
        "function": "F = A'B + AB' (Access granted if badge A and biometric pin B differ from default lockout state)",
        "nandImplementation": "Synthesized using the optimal 4-NAND XOR core: N1 = (AB)', N2 = (A·N1)', N3 = (B·N1)', F = (N2·N3)'.",
        "norImplementation": "Synthesized using the optimal 5-NOR XOR network: R1 = A', R2 = (A+B)', R3 = B', R4 = AB, F = [ (A+B)' + AB ]' = A ⊕ B.",
        "takeaway": "NAND achieves XOR with 4 gates, whereas NOR requires 5 gates due to De Morgan polarity alignment."
      },
      {
        "title": "Scenario 3: Environmental Greenhouse Alert",
        "function": "F = (AB + C)' (Alert activates if temperature AB exceeds threshold or humidity C fails)",
        "nandImplementation": "Synthesized using 4 NAND gates: 3 gates form AB + C, followed by a 4th NAND inverter.",
        "mixedImplementation": "Synthesized using 2 NAND gates and 1 NOR gate: N1 = (AB)', N2 = (N1·N1)' = AB, followed by NOR gate F = (AB + C)'.",
        "takeaway": "Combining gate families can occasionally eliminate inverter stages while maintaining complete mathematical fidelity."
      }
    ],
    "centralConcept": "NAND and NOR are called universal gates because either gate, used by itself, can be combined to perform the functions of all other logic gates.",
    "simpleExplanation": "In simple terms, any digital circuit, no matter how complex, can be built entirely using only NAND gates, or entirely using only NOR gates. If you have a box containing only NAND chips, you can build NOT, AND, OR, XOR, and complete microprocessor units without needing any other gate type.",
    "hardwareImplementation": {
      "title": "A Little More About Hardware Implementation",
      "points": [
        {
          "heading": "CMOS Transistor Topology",
          "text": "In static CMOS technology, a 2-input NAND gate uses 2 PMOS transistors in parallel in the pull-up network and 2 NMOS transistors in series in the pull-down network. Conversely, a 2-input NOR gate uses 2 PMOS transistors in series and 2 NMOS transistors in parallel."
        },
        {
          "heading": "Silicon Carrier Mobility Comparison",
          "text": "Electrons in NMOS transistors have roughly two to three times higher mobility than holes in PMOS transistors. Because the series resistance of NMOS transistors is lower than PMOS transistors of identical physical dimensions, CMOS NAND gates switch faster and require less silicon area than CMOS NOR gates of equivalent driving capability."
        },
        {
          "heading": "Realistic Silicon Tradeoffs",
          "text": "While individual NAND and NOR gates use fewer transistors than non-inverting AND and OR gates (which require an internal inverter stage), building an entire circuit with only NAND or only NOR can sometimes increase total gate count. Physical performance, silicon area, dynamic power, and propagation delay always depend on the specific circuit structure, logic depth, and fabrication library."
        }
      ]
    }
  },
  "gateRealisations": {
    "nandOnly": [
      {
        "id": "nand-not",
        "targetGate": "NOT Gate",
        "targetFunction": "F = A'",
        "gateCount": 1,
        "logicDepth": 1,
        "equations": [
          "F = NAND(A, A) = (A · A)' = A'"
        ],
        "stepDerivation": [
          "Input A is connected to both inputs of a 2-input NAND gate.",
          "By idempotence: A · A = A.",
          "Applying the NAND inversion yields (A · A)' = A'."
        ],
        "truthTable": [
          {
            "A": 0,
            "B": "-",
            "F": 1
          },
          {
            "A": 1,
            "B": "-",
            "F": 0
          }
        ],
        "explanation": "Tying both inputs of a NAND gate together produces an exact NOT gate inverter requiring 1 physical gate and 1 logic level.",
        "circuit": {
          "width": 460,
          "height": 130,
          "inputs": [
            {
              "id": "A",
              "label": "A",
              "x": 40,
              "y": 65
            }
          ],
          "gates": [
            {
              "id": "G1",
              "type": "NAND",
              "x": 150,
              "y": 50,
              "label": "G1",
              "level": 1
            }
          ],
          "wires": [
            {
              "id": "w1",
              "from": "A",
              "to": "j1",
              "d": "M 40 65 L 100 65",
              "net": "A"
            },
            {
              "id": "w2",
              "from": "j1",
              "to": "G1.in1",
              "d": "M 100 65 L 100 58 L 150 58",
              "net": "A"
            },
            {
              "id": "w3",
              "from": "j1",
              "to": "G1.in2",
              "d": "M 100 65 L 100 72 L 150 72",
              "net": "A"
            },
            {
              "id": "w4",
              "from": "G1.out",
              "to": "F",
              "d": "M 193 65 L 340 65",
              "net": "A'"
            }
          ],
          "junctions": [
            {
              "x": 100,
              "y": 65,
              "r": 3.5
            }
          ],
          "labels": [],
          "output": {
            "label": "F = A'",
            "x": 350,
            "y": 65
          }
        }
      },
      {
        "id": "nand-and",
        "targetGate": "AND Gate",
        "targetFunction": "F = AB",
        "gateCount": 2,
        "logicDepth": 2,
        "equations": [
          "p = NAND(A, B) = (AB)'",
          "F = NAND(p, p) = ((AB)')' = AB"
        ],
        "stepDerivation": [
          "Gate 1 computes the negated conjunction: p = (AB)'.",
          "Gate 2 acts as an inverter with tied inputs: F = (p · p)' = p'.",
          "By double involution: ((AB)')' = AB."
        ],
        "truthTable": [
          {
            "A": 0,
            "B": 0,
            "p": 1,
            "F": 0
          },
          {
            "A": 0,
            "B": 1,
            "p": 1,
            "F": 0
          },
          {
            "A": 1,
            "B": 0,
            "p": 1,
            "F": 0
          },
          {
            "A": 1,
            "B": 1,
            "p": 0,
            "F": 1
          }
        ],
        "explanation": "Two NAND gates in series implement AND. The first gate performs the NAND operation and the second inverts the polarity back to true AND.",
        "circuit": {
          "width": 460,
          "height": 130,
          "inputs": [
            {
              "id": "A",
              "label": "A",
              "x": 30,
              "y": 58
            },
            {
              "id": "B",
              "label": "B",
              "x": 30,
              "y": 72
            }
          ],
          "gates": [
            {
              "id": "G1",
              "type": "NAND",
              "x": 100,
              "y": 50,
              "label": "G1",
              "level": 1
            },
            {
              "id": "G2",
              "type": "NAND",
              "x": 240,
              "y": 50,
              "label": "G2",
              "level": 2
            }
          ],
          "wires": [
            {
              "id": "w1",
              "from": "A",
              "to": "G1.in1",
              "d": "M 30 58 L 100 58",
              "net": "A"
            },
            {
              "id": "w2",
              "from": "B",
              "to": "G1.in2",
              "d": "M 30 72 L 100 72",
              "net": "B"
            },
            {
              "id": "w3",
              "from": "G1.out",
              "to": "j1",
              "d": "M 143 65 L 190 65",
              "net": "p"
            },
            {
              "id": "w4",
              "from": "j1",
              "to": "G2.in1",
              "d": "M 190 65 L 190 58 L 240 58",
              "net": "p"
            },
            {
              "id": "w5",
              "from": "j1",
              "to": "G2.in2",
              "d": "M 190 65 L 190 72 L 240 72",
              "net": "p"
            },
            {
              "id": "w6",
              "from": "G2.out",
              "to": "F",
              "d": "M 283 65 L 380 65",
              "net": "AB"
            }
          ],
          "junctions": [
            {
              "x": 190,
              "y": 65,
              "r": 3.5
            }
          ],
          "labels": [
            {
              "text": "p = (AB)'",
              "x": 152,
              "y": 52
            }
          ],
          "output": {
            "label": "F = AB",
            "x": 390,
            "y": 65
          }
        }
      },
      {
        "id": "nand-or",
        "targetGate": "OR Gate",
        "targetFunction": "F = A + B",
        "gateCount": 3,
        "logicDepth": 2,
        "equations": [
          "p = NAND(A, A) = A'",
          "q = NAND(B, B) = B'",
          "F = NAND(p, q) = (A' · B')' = A + B"
        ],
        "stepDerivation": [
          "Level 1: Gate 1 inverts A to produce p = A'. Gate 2 inverts B to produce q = B'.",
          "Level 2: Gate 3 combines the inverted inputs: F = (p · q)' = (A' · B')'.",
          "By De Morgan's theorem: (A' · B')' = A'' + B'' = A + B."
        ],
        "truthTable": [
          {
            "A": 0,
            "B": 0,
            "p": 1,
            "q": 1,
            "F": 0
          },
          {
            "A": 0,
            "B": 1,
            "p": 1,
            "q": 0,
            "F": 1
          },
          {
            "A": 1,
            "B": 0,
            "p": 0,
            "q": 1,
            "F": 1
          },
          {
            "A": 1,
            "B": 1,
            "p": 0,
            "q": 0,
            "F": 1
          }
        ],
        "explanation": "Three NAND gates form an OR gate. The two input inverters generate complemented literals, and the final NAND gate acts as an Invert-OR stage.",
        "circuit": {
          "width": 460,
          "height": 140,
          "inputs": [
            {
              "id": "A",
              "label": "A",
              "x": 30,
              "y": 35
            },
            {
              "id": "B",
              "label": "B",
              "x": 30,
              "y": 105
            }
          ],
          "gates": [
            {
              "id": "G1",
              "type": "NAND",
              "x": 90,
              "y": 20,
              "label": "G1",
              "level": 1
            },
            {
              "id": "G2",
              "type": "NAND",
              "x": 90,
              "y": 90,
              "label": "G2",
              "level": 1
            },
            {
              "id": "G3",
              "type": "NAND",
              "x": 240,
              "y": 55,
              "label": "G3",
              "level": 2
            }
          ],
          "wires": [
            {
              "id": "w1",
              "from": "A",
              "to": "j1",
              "d": "M 30 35 L 60 35",
              "net": "A"
            },
            {
              "id": "w2",
              "from": "j1",
              "to": "G1.in1",
              "d": "M 60 35 L 60 28 L 90 28",
              "net": "A"
            },
            {
              "id": "w3",
              "from": "j1",
              "to": "G1.in2",
              "d": "M 60 35 L 60 42 L 90 42",
              "net": "A"
            },
            {
              "id": "w4",
              "from": "B",
              "to": "j2",
              "d": "M 30 105 L 60 105",
              "net": "B"
            },
            {
              "id": "w5",
              "from": "j2",
              "to": "G2.in1",
              "d": "M 60 105 L 60 98 L 90 98",
              "net": "B"
            },
            {
              "id": "w6",
              "from": "j2",
              "to": "G2.in2",
              "d": "M 60 105 L 60 112 L 90 112",
              "net": "B"
            },
            {
              "id": "w7",
              "from": "G1.out",
              "to": "G3.in1",
              "d": "M 133 35 L 185 35 L 185 63 L 240 63",
              "net": "A'"
            },
            {
              "id": "w8",
              "from": "G2.out",
              "to": "G3.in2",
              "d": "M 133 105 L 185 105 L 185 77 L 240 77",
              "net": "B'"
            },
            {
              "id": "w9",
              "from": "G3.out",
              "to": "F",
              "d": "M 283 70 L 380 70",
              "net": "A+B"
            }
          ],
          "junctions": [
            {
              "x": 60,
              "y": 35,
              "r": 3.5
            },
            {
              "x": 60,
              "y": 105,
              "r": 3.5
            }
          ],
          "labels": [
            {
              "text": "p = A'",
              "x": 149,
              "y": 28
            },
            {
              "text": "q = B'",
              "x": 140,
              "y": 118
            }
          ],
          "output": {
            "label": "F = A + B",
            "x": 390,
            "y": 70
          }
        }
      },
      {
        "id": "nand-nor",
        "targetGate": "NOR Gate",
        "targetFunction": "F = (A + B)'",
        "gateCount": 4,
        "logicDepth": 3,
        "equations": [
          "p = NAND(A, A) = A'",
          "q = NAND(B, B) = B'",
          "s = NAND(p, q) = A + B",
          "F = NAND(s, s) = (A + B)'"
        ],
        "stepDerivation": [
          "Level 1: Gates 1 and 2 invert A and B to form p = A' and q = B'.",
          "Level 2: Gate 3 combines them to form s = (A'B')' = A + B.",
          "Level 3: Gate 4 inverts s to produce F = (A + B)'."
        ],
        "truthTable": [
          {
            "A": 0,
            "B": 0,
            "p": 1,
            "q": 1,
            "s": 0,
            "F": 1
          },
          {
            "A": 0,
            "B": 1,
            "p": 1,
            "q": 0,
            "s": 1,
            "F": 0
          },
          {
            "A": 1,
            "B": 0,
            "p": 0,
            "q": 1,
            "s": 1,
            "F": 0
          },
          {
            "A": 1,
            "B": 1,
            "p": 0,
            "q": 0,
            "s": 1,
            "F": 0
          }
        ],
        "explanation": "Four NAND gates synthesize a NOR gate: the first three form an OR gate, and the fourth acts as an output inverter.",
        "circuit": {
          "width": 480,
          "height": 140,
          "inputs": [
            {
              "id": "A",
              "label": "A",
              "x": 25,
              "y": 35
            },
            {
              "id": "B",
              "label": "B",
              "x": 25,
              "y": 105
            }
          ],
          "gates": [
            {
              "id": "G1",
              "type": "NAND",
              "x": 75,
              "y": 20,
              "label": "G1",
              "level": 1
            },
            {
              "id": "G2",
              "type": "NAND",
              "x": 75,
              "y": 90,
              "label": "G2",
              "level": 1
            },
            {
              "id": "G3",
              "type": "NAND",
              "x": 195,
              "y": 55,
              "label": "G3",
              "level": 2
            },
            {
              "id": "G4",
              "type": "NAND",
              "x": 315,
              "y": 55,
              "label": "G4",
              "level": 3
            }
          ],
          "wires": [
            {
              "id": "w1",
              "from": "A",
              "to": "j1",
              "d": "M 25 35 L 50 35",
              "net": "A"
            },
            {
              "id": "w2",
              "from": "j1",
              "to": "G1.in1",
              "d": "M 50 35 L 50 28 L 75 28",
              "net": "A"
            },
            {
              "id": "w3",
              "from": "j1",
              "to": "G1.in2",
              "d": "M 50 35 L 50 42 L 75 42",
              "net": "A"
            },
            {
              "id": "w4",
              "from": "B",
              "to": "j2",
              "d": "M 25 105 L 50 105",
              "net": "B"
            },
            {
              "id": "w5",
              "from": "j2",
              "to": "G2.in1",
              "d": "M 50 105 L 50 98 L 75 98",
              "net": "B"
            },
            {
              "id": "w6",
              "from": "j2",
              "to": "G2.in2",
              "d": "M 50 105 L 50 112 L 75 112",
              "net": "B"
            },
            {
              "id": "w7",
              "from": "G1.out",
              "to": "G3.in1",
              "d": "M 118 35 L 155 35 L 155 63 L 195 63",
              "net": "A'"
            },
            {
              "id": "w8",
              "from": "G2.out",
              "to": "G3.in2",
              "d": "M 118 105 L 155 105 L 155 77 L 195 77",
              "net": "B'"
            },
            {
              "id": "w9",
              "from": "G3.out",
              "to": "j3",
              "d": "M 238 70 L 275 70",
              "net": "A+B"
            },
            {
              "id": "w10",
              "from": "j3",
              "to": "G4.in1",
              "d": "M 275 70 L 275 63 L 315 63",
              "net": "A+B"
            },
            {
              "id": "w11",
              "from": "j3",
              "to": "G4.in2",
              "d": "M 275 70 L 275 77 L 315 77",
              "net": "A+B"
            },
            {
              "id": "w12",
              "from": "G4.out",
              "to": "F",
              "d": "M 358 70 L 415 70",
              "net": "(A+B)'"
            }
          ],
          "junctions": [
            {
              "x": 50,
              "y": 35,
              "r": 3.5
            },
            {
              "x": 50,
              "y": 105,
              "r": 3.5
            },
            {
              "x": 275,
              "y": 70,
              "r": 3.5
            }
          ],
          "labels": [
            {
              "text": "p = A'",
              "x": 134,
              "y": 28
            },
            {
              "text": "q = B'",
              "x": 134,
              "y": 118
            },
            {
              "text": "s = A+B",
              "x": 254,
              "y": 60
            }
          ],
          "output": {
            "label": "F = (A + B)'",
            "x": 420,
            "y": 70
          }
        }
      },
      {
        "id": "nand-xor",
        "targetGate": "XOR Gate",
        "targetFunction": "F = A'B + AB'",
        "gateCount": 4,
        "logicDepth": 3,
        "equations": [
          "p = NAND(A, B) = (AB)'",
          "q = NAND(A, p) = [A(AB)']' = A' + B",
          "r = NAND(B, p) = [B(AB)']' = A + B'",
          "F = NAND(q, r) = (q · r)' = A'B + AB'"
        ],
        "stepDerivation": [
          "Level 1: Gate 1 generates shared product complement p = (AB)'.",
          "Level 2: Gate 2 computes q = [A(AB)']' = (A(A'+B'))' = (AB')' = A' + B.",
          "Level 2: Gate 3 computes r = [B(AB)']' = (B(A'+B'))' = (A'B)' = A + B'.",
          "Level 3: Gate 4 computes F = (q · r)' = q' + r' = AB' + A'B = A ⊕ B."
        ],
        "truthTable": [
          {
            "A": 0,
            "B": 0,
            "p": 1,
            "q": 1,
            "r": 1,
            "F": 0
          },
          {
            "A": 0,
            "B": 1,
            "p": 1,
            "q": 1,
            "r": 0,
            "F": 1
          },
          {
            "A": 1,
            "B": 0,
            "p": 1,
            "q": 0,
            "r": 1,
            "F": 1
          },
          {
            "A": 1,
            "B": 1,
            "p": 0,
            "q": 1,
            "r": 1,
            "F": 0
          }
        ],
        "explanation": "The classic 4-NAND XOR core shares intermediate signal p = (AB)' across both legs, achieving XOR in 4 gates and 3 logic levels without prior input complements.",
        "circuit": {
          "width": 480,
          "height": 150,
          "inputs": [
            {
              "id": "A",
              "label": "A",
              "x": 25,
              "y": 45
            },
            {
              "id": "B",
              "label": "B",
              "x": 25,
              "y": 95
            }
          ],
          "gates": [
            {
              "id": "G1",
              "type": "NAND",
              "x": 90,
              "y": 55,
              "label": "G1",
              "level": 1
            },
            {
              "id": "G2",
              "type": "NAND",
              "x": 210,
              "y": 20,
              "label": "G2",
              "level": 2
            },
            {
              "id": "G3",
              "type": "NAND",
              "x": 210,
              "y": 90,
              "label": "G3",
              "level": 2
            },
            {
              "id": "G4",
              "type": "NAND",
              "x": 330,
              "y": 55,
              "label": "G4",
              "level": 3
            }
          ],
          "wires": [
            {
              "id": "w1",
              "from": "A",
              "to": "j1",
              "d": "M 25 45 L 55 45",
              "net": "A"
            },
            {
              "id": "w2",
              "from": "j1",
              "to": "G1.in1",
              "d": "M 55 45 L 55 63 L 90 63",
              "net": "A"
            },
            {
              "id": "w3",
              "from": "j1",
              "to": "G2.in1",
              "d": "M 55 45 L 55 28 L 210 28",
              "net": "A"
            },
            {
              "id": "w4",
              "from": "B",
              "to": "j2",
              "d": "M 25 95 L 55 95",
              "net": "B"
            },
            {
              "id": "w5",
              "from": "j2",
              "to": "G1.in2",
              "d": "M 55 95 L 55 77 L 90 77",
              "net": "B"
            },
            {
              "id": "w6",
              "from": "j2",
              "to": "G3.in2",
              "d": "M 55 95 L 55 112 L 210 112",
              "net": "B"
            },
            {
              "id": "w7",
              "from": "G1.out",
              "to": "j3",
              "d": "M 133 70 L 165 70",
              "net": "p"
            },
            {
              "id": "w8",
              "from": "j3",
              "to": "G2.in2",
              "d": "M 165 70 L 165 42 L 210 42",
              "net": "p"
            },
            {
              "id": "w9",
              "from": "j3",
              "to": "G3.in1",
              "d": "M 165 70 L 165 98 L 210 98",
              "net": "p"
            },
            {
              "id": "w10",
              "from": "G2.out",
              "to": "G4.in1",
              "d": "M 253 35 L 290 35 L 290 63 L 330 63",
              "net": "q"
            },
            {
              "id": "w11",
              "from": "G3.out",
              "to": "G4.in2",
              "d": "M 253 105 L 290 105 L 290 77 L 330 77",
              "net": "r"
            },
            {
              "id": "w12",
              "from": "G4.out",
              "to": "F",
              "d": "M 373 70 L 415 70",
              "net": "A ⊕ B"
            }
          ],
          "junctions": [
            {
              "x": 55,
              "y": 45,
              "r": 3.5
            },
            {
              "x": 55,
              "y": 95,
              "r": 3.5
            },
            {
              "x": 165,
              "y": 70,
              "r": 3.5
            }
          ],
          "labels": [
            {
              "text": "p = (AB)'",
              "x": 149,
              "y": 60
            },
            {
              "text": "q = (A·p)'",
              "x": 269,
              "y": 25
            },
            {
              "text": "r = (B·p)'",
              "x": 255,
              "y": 122
            }
          ],
          "output": {
            "label": "F = A ⊕ B",
            "x": 420,
            "y": 70
          }
        }
      },
      {
        "id": "nand-xnor",
        "targetGate": "XNOR Gate",
        "targetFunction": "F = AB + A'B'",
        "gateCount": 5,
        "logicDepth": 3,
        "equations": [
          "p = NAND(A, A) = A'",
          "q = NAND(B, B) = B'",
          "r = NAND(A, B) = (AB)'",
          "s = NAND(p, q) = (A'B')' = A + B",
          "F = NAND(r, s) = ((AB)'(A + B))' = AB + A'B'"
        ],
        "stepDerivation": [
          "Step 1 (Level 1): Generate inverted literals p = A' and q = B' using tied-input NAND gates, while simultaneously computing r = (AB)' with a third NAND gate.",
          "Step 2 (Level 2): Combine inverted literals p and q with a fourth NAND gate to produce the sum term s = (A' · B')' = A + B.",
          "Step 3 (Level 3): Combine intermediate product r and sum s with the fifth NAND gate to produce F = ((AB)' · (A + B))' = AB + A'B' = A ⊙ B in an optimal 3-level network."
        ],
        "truthTable": [
          {
            "A": 0,
            "B": 0,
            "p": 1,
            "q": 1,
            "r": 1,
            "s": 0,
            "F": 1
          },
          {
            "A": 0,
            "B": 1,
            "p": 1,
            "q": 0,
            "r": 1,
            "s": 1,
            "F": 0
          },
          {
            "A": 1,
            "B": 0,
            "p": 0,
            "q": 1,
            "r": 1,
            "s": 1,
            "F": 0
          },
          {
            "A": 1,
            "B": 1,
            "p": 0,
            "q": 0,
            "r": 0,
            "s": 1,
            "F": 1
          }
        ],
        "explanation": "Five NAND gates synthesize XNOR in an optimal 3-level topology: three Level 1 gates compute A', B', and (AB)', Level 2 produces A + B, and Level 3 combines them into equivalence.",
        "circuit": {
          "width": 480,
          "height": 160,
          "inputs": [
            {
              "id": "A",
              "label": "A",
              "x": 25,
              "y": 40
            },
            {
              "id": "B",
              "label": "B",
              "x": 25,
              "y": 110
            }
          ],
          "gates": [
            {
              "id": "G1",
              "type": "NAND",
              "x": 90,
              "y": 15,
              "label": "G1",
              "level": 1,
              "inputs": [
                "A",
                "A"
              ],
              "out": "p"
            },
            {
              "id": "G2",
              "type": "NAND",
              "x": 90,
              "y": 65,
              "label": "G2",
              "level": 1,
              "inputs": [
                "A",
                "B"
              ],
              "out": "r"
            },
            {
              "id": "G3",
              "type": "NAND",
              "x": 90,
              "y": 115,
              "label": "G3",
              "level": 1,
              "inputs": [
                "B",
                "B"
              ],
              "out": "q"
            },
            {
              "id": "G4",
              "type": "NAND",
              "x": 220,
              "y": 65,
              "label": "G4",
              "level": 2,
              "inputs": [
                "p",
                "q"
              ],
              "out": "s"
            },
            {
              "id": "G5",
              "type": "NAND",
              "x": 350,
              "y": 65,
              "label": "G5",
              "level": 3,
              "inputs": [
                "r",
                "s"
              ],
              "out": "F"
            }
          ],
          "wires": [
            {
              "id": "w1",
              "from": "A",
              "to": "j1",
              "d": "M 25 40 L 50 40",
              "net": "A"
            },
            {
              "id": "w2",
              "from": "j1",
              "to": "j1a",
              "d": "M 50 40 L 50 25",
              "net": "A"
            },
            {
              "id": "w3",
              "from": "j1a",
              "to": "G1.in1",
              "d": "M 50 25 L 50 20 L 90 20",
              "net": "A"
            },
            {
              "id": "w4",
              "from": "j1a",
              "to": "G1.in2",
              "d": "M 50 25 L 50 30 L 90 30",
              "net": "A"
            },
            {
              "id": "w5",
              "from": "j1",
              "to": "G2.in1",
              "d": "M 50 40 L 50 72 L 90 72",
              "net": "A"
            },
            {
              "id": "w6",
              "from": "B",
              "to": "j2",
              "d": "M 25 110 L 50 110",
              "net": "B"
            },
            {
              "id": "w7",
              "from": "j2",
              "to": "G2.in2",
              "d": "M 50 110 L 50 83 L 90 83",
              "net": "B"
            },
            {
              "id": "w8",
              "from": "j2",
              "to": "j2a",
              "d": "M 50 110 L 50 125",
              "net": "B"
            },
            {
              "id": "w9",
              "from": "j2a",
              "to": "G3.in1",
              "d": "M 50 125 L 50 120 L 90 120",
              "net": "B"
            },
            {
              "id": "w10",
              "from": "j2a",
              "to": "G3.in2",
              "d": "M 50 125 L 50 130 L 90 130",
              "net": "B"
            },
            {
              "id": "w11",
              "from": "G1.out",
              "to": "G4.in1",
              "d": "M 133 27 L 175 27 L 175 72 L 220 72",
              "net": "p"
            },
            {
              "id": "w12",
              "from": "G3.out",
              "to": "G4.in2",
              "d": "M 133 127 L 175 127 L 175 83 L 220 83",
              "net": "q"
            },
            {
              "id": "w13",
              "from": "G2.out",
              "to": "G5.in1",
              "d": "M 133 77 L 180 77 L 180 45 L 305 45 L 305 72 L 350 72",
              "net": "r"
            },
            {
              "id": "w14",
              "from": "G4.out",
              "to": "G5.in2",
              "d": "M 263 77 L 350 77",
              "net": "s"
            },
            {
              "id": "w15",
              "from": "G5.out",
              "to": "F",
              "d": "M 393 77 L 440 77",
              "net": "F"
            }
          ],
          "junctions": [
            {
              "id": "j1",
              "x": 50,
              "y": 40,
              "r": 3.5
            },
            {
              "id": "j1a",
              "x": 50,
              "y": 25,
              "r": 3.5
            },
            {
              "id": "j2",
              "x": 50,
              "y": 110,
              "r": 3.5
            },
            {
              "id": "j2a",
              "x": 50,
              "y": 125,
              "r": 3.5
            }
          ],
          "labels": [
            {
              "text": "p=A'",
              "x": 149,
              "y": 20
            },
            {
              "text": "r=(AB)'",
              "x": 149,
              "y": 70
            },
            {
              "text": "q=B'",
              "x": 149,
              "y": 140
            },
            {
              "text": "s=A+B",
              "x": 279,
              "y": 65
            }
          ],
          "output": {
            "label": "F = A ⊙ B",
            "x": 445,
            "y": 77
          }
        }
      }
    ],
    "norOnly": [
      {
        "id": "nor-not",
        "targetGate": "NOT Gate",
        "targetFunction": "F = A'",
        "gateCount": 1,
        "logicDepth": 1,
        "equations": [
          "F = NOR(A, A) = (A + A)' = A'"
        ],
        "stepDerivation": [
          "Input A is tied to both inputs of a 2-input NOR gate.",
          "By idempotence: A + A = A.",
          "The NOR inversion produces (A + A)' = A'."
        ],
        "truthTable": [
          {
            "A": 0,
            "B": "-",
            "F": 1
          },
          {
            "A": 1,
            "B": "-",
            "F": 0
          }
        ],
        "explanation": "Tying both inputs of a NOR gate together produces an exact NOT inverter requiring 1 physical gate and 1 logic level.",
        "circuit": {
          "width": 460,
          "height": 130,
          "inputs": [
            {
              "id": "A",
              "label": "A",
              "x": 40,
              "y": 65
            }
          ],
          "gates": [
            {
              "id": "R1",
              "type": "NOR",
              "x": 150,
              "y": 50,
              "label": "R1",
              "level": 1
            }
          ],
          "wires": [
            {
              "id": "w1",
              "from": "A",
              "to": "j1",
              "d": "M 40 65 L 100 65",
              "net": "A"
            },
            {
              "id": "w2",
              "from": "j1",
              "to": "R1.in1",
              "d": "M 100 65 L 100 58 L 150 58",
              "net": "A"
            },
            {
              "id": "w3",
              "from": "j1",
              "to": "R1.in2",
              "d": "M 100 65 L 100 72 L 150 72",
              "net": "A"
            },
            {
              "id": "w4",
              "from": "R1.out",
              "to": "F",
              "d": "M 190 65 L 340 65",
              "net": "A'"
            }
          ],
          "junctions": [
            {
              "x": 100,
              "y": 65,
              "r": 3.5
            }
          ],
          "labels": [],
          "output": {
            "label": "F = A'",
            "x": 350,
            "y": 65
          }
        }
      },
      {
        "id": "nor-and",
        "targetGate": "AND Gate",
        "targetFunction": "F = AB",
        "gateCount": 3,
        "logicDepth": 2,
        "equations": [
          "p = NOR(A, A) = A'",
          "q = NOR(B, B) = B'",
          "F = NOR(p, q) = (A' + B')' = AB"
        ],
        "stepDerivation": [
          "Level 1: Gate 1 inverts A to produce p = A'. Gate 2 inverts B to produce q = B'.",
          "Level 2: Gate 3 combines them: F = (p + q)' = (A' + B')'.",
          "By De Morgan's theorem: (A' + B')' = A'' · B'' = AB."
        ],
        "truthTable": [
          {
            "A": 0,
            "B": 0,
            "p": 1,
            "q": 1,
            "F": 0
          },
          {
            "A": 0,
            "B": 1,
            "p": 1,
            "q": 0,
            "F": 0
          },
          {
            "A": 1,
            "B": 0,
            "p": 0,
            "q": 1,
            "F": 0
          },
          {
            "A": 1,
            "B": 1,
            "p": 0,
            "q": 0,
            "F": 1
          }
        ],
        "explanation": "Three NOR gates synthesize an AND gate: two input inverters generate complemented inputs, and the final NOR acts as an Invert-AND stage.",
        "circuit": {
          "width": 460,
          "height": 140,
          "inputs": [
            {
              "id": "A",
              "label": "A",
              "x": 30,
              "y": 35
            },
            {
              "id": "B",
              "label": "B",
              "x": 30,
              "y": 105
            }
          ],
          "gates": [
            {
              "id": "R1",
              "type": "NOR",
              "x": 90,
              "y": 20,
              "label": "R1",
              "level": 1
            },
            {
              "id": "R2",
              "type": "NOR",
              "x": 90,
              "y": 90,
              "label": "R2",
              "level": 1
            },
            {
              "id": "R3",
              "type": "NOR",
              "x": 240,
              "y": 55,
              "label": "R3",
              "level": 2
            }
          ],
          "wires": [
            {
              "id": "w1",
              "from": "A",
              "to": "j1",
              "d": "M 30 35 L 60 35",
              "net": "A"
            },
            {
              "id": "w2",
              "from": "j1",
              "to": "R1.in1",
              "d": "M 60 35 L 60 28 L 90 28",
              "net": "A"
            },
            {
              "id": "w3",
              "from": "j1",
              "to": "R1.in2",
              "d": "M 60 35 L 60 42 L 90 42",
              "net": "A"
            },
            {
              "id": "w4",
              "from": "B",
              "to": "j2",
              "d": "M 30 105 L 60 105",
              "net": "B"
            },
            {
              "id": "w5",
              "from": "j2",
              "to": "R2.in1",
              "d": "M 60 105 L 60 98 L 90 98",
              "net": "B"
            },
            {
              "id": "w6",
              "from": "j2",
              "to": "R2.in2",
              "d": "M 60 105 L 60 112 L 90 112",
              "net": "B"
            },
            {
              "id": "w7",
              "from": "R1.out",
              "to": "R3.in1",
              "d": "M 130 35 L 185 35 L 185 63 L 240 63",
              "net": "A'"
            },
            {
              "id": "w8",
              "from": "R2.out",
              "to": "R3.in2",
              "d": "M 130 105 L 185 105 L 185 77 L 240 77",
              "net": "B'"
            },
            {
              "id": "w9",
              "from": "R3.out",
              "to": "F",
              "d": "M 280 70 L 380 70",
              "net": "AB"
            }
          ],
          "junctions": [
            {
              "x": 60,
              "y": 35,
              "r": 3.5
            },
            {
              "x": 60,
              "y": 105,
              "r": 3.5
            }
          ],
          "labels": [
            {
              "text": "p = A'",
              "x": 146,
              "y": 28
            },
            {
              "text": "q = B'",
              "x": 140,
              "y": 118
            }
          ],
          "output": {
            "label": "F = AB",
            "x": 390,
            "y": 70
          }
        }
      },
      {
        "id": "nor-or",
        "targetGate": "OR Gate",
        "targetFunction": "F = A + B",
        "gateCount": 2,
        "logicDepth": 2,
        "equations": [
          "p = NOR(A, B) = (A + B)'",
          "F = NOR(p, p) = ((A + B)')' = A + B"
        ],
        "stepDerivation": [
          "Gate 1 computes the negated disjunction: p = (A + B)'.",
          "Gate 2 inverts p using tied inputs: F = (p + p)' = p'.",
          "By double involution: ((A + B)')' = A + B."
        ],
        "truthTable": [
          {
            "A": 0,
            "B": 0,
            "p": 1,
            "F": 0
          },
          {
            "A": 0,
            "B": 1,
            "p": 0,
            "F": 1
          },
          {
            "A": 1,
            "B": 0,
            "p": 0,
            "F": 1
          },
          {
            "A": 1,
            "B": 1,
            "p": 0,
            "F": 1
          }
        ],
        "explanation": "Two NOR gates in series implement OR. The first gate performs the NOR operation and the second inverts the polarity back to true OR.",
        "circuit": {
          "width": 460,
          "height": 130,
          "inputs": [
            {
              "id": "A",
              "label": "A",
              "x": 30,
              "y": 58
            },
            {
              "id": "B",
              "label": "B",
              "x": 30,
              "y": 72
            }
          ],
          "gates": [
            {
              "id": "R1",
              "type": "NOR",
              "x": 100,
              "y": 50,
              "label": "R1",
              "level": 1
            },
            {
              "id": "R2",
              "type": "NOR",
              "x": 240,
              "y": 50,
              "label": "R2",
              "level": 2
            }
          ],
          "wires": [
            {
              "id": "w1",
              "from": "A",
              "to": "R1.in1",
              "d": "M 30 58 L 100 58",
              "net": "A"
            },
            {
              "id": "w2",
              "from": "B",
              "to": "R1.in2",
              "d": "M 30 72 L 100 72",
              "net": "B"
            },
            {
              "id": "w3",
              "from": "R1.out",
              "to": "j1",
              "d": "M 140 65 L 190 65",
              "net": "p"
            },
            {
              "id": "w4",
              "from": "j1",
              "to": "R2.in1",
              "d": "M 190 65 L 190 58 L 240 58",
              "net": "p"
            },
            {
              "id": "w5",
              "from": "j1",
              "to": "R2.in2",
              "d": "M 190 65 L 190 72 L 240 72",
              "net": "p"
            },
            {
              "id": "w6",
              "from": "R2.out",
              "to": "F",
              "d": "M 280 65 L 380 65",
              "net": "A+B"
            }
          ],
          "junctions": [
            {
              "x": 190,
              "y": 65,
              "r": 3.5
            }
          ],
          "labels": [
            {
              "text": "p = (A+B)'",
              "x": 156,
              "y": 52
            }
          ],
          "output": {
            "label": "F = A + B",
            "x": 390,
            "y": 65
          }
        }
      },
      {
        "id": "nor-nand",
        "targetGate": "NAND Gate",
        "targetFunction": "F = (AB)'",
        "gateCount": 4,
        "logicDepth": 3,
        "equations": [
          "p = NOR(A, A) = A'",
          "q = NOR(B, B) = B'",
          "s = NOR(p, q) = AB",
          "F = NOR(s, s) = (AB)'"
        ],
        "stepDerivation": [
          "Level 1: Gates 1 and 2 invert A and B to form p = A' and q = B'.",
          "Level 2: Gate 3 combines them to form s = (A' + B')' = AB.",
          "Level 3: Gate 4 inverts s to produce F = (AB)'."
        ],
        "truthTable": [
          {
            "A": 0,
            "B": 0,
            "p": 1,
            "q": 1,
            "s": 0,
            "F": 1
          },
          {
            "A": 0,
            "B": 1,
            "p": 1,
            "q": 0,
            "s": 0,
            "F": 1
          },
          {
            "A": 1,
            "B": 0,
            "p": 0,
            "q": 1,
            "s": 0,
            "F": 1
          },
          {
            "A": 1,
            "B": 1,
            "p": 0,
            "q": 0,
            "s": 1,
            "F": 0
          }
        ],
        "explanation": "Four NOR gates synthesize a NAND gate: the first three form an AND gate, and the fourth acts as an output inverter.",
        "circuit": {
          "width": 480,
          "height": 140,
          "inputs": [
            {
              "id": "A",
              "label": "A",
              "x": 25,
              "y": 35
            },
            {
              "id": "B",
              "label": "B",
              "x": 25,
              "y": 105
            }
          ],
          "gates": [
            {
              "id": "R1",
              "type": "NOR",
              "x": 75,
              "y": 20,
              "label": "R1",
              "level": 1
            },
            {
              "id": "R2",
              "type": "NOR",
              "x": 75,
              "y": 90,
              "label": "R2",
              "level": 1
            },
            {
              "id": "R3",
              "type": "NOR",
              "x": 195,
              "y": 55,
              "label": "R3",
              "level": 2
            },
            {
              "id": "R4",
              "type": "NOR",
              "x": 315,
              "y": 55,
              "label": "R4",
              "level": 3
            }
          ],
          "wires": [
            {
              "id": "w1",
              "from": "A",
              "to": "j1",
              "d": "M 25 35 L 50 35",
              "net": "A"
            },
            {
              "id": "w2",
              "from": "j1",
              "to": "R1.in1",
              "d": "M 50 35 L 50 28 L 75 28",
              "net": "A"
            },
            {
              "id": "w3",
              "from": "j1",
              "to": "R1.in2",
              "d": "M 50 35 L 50 42 L 75 42",
              "net": "A"
            },
            {
              "id": "w4",
              "from": "B",
              "to": "j2",
              "d": "M 25 105 L 50 105",
              "net": "B"
            },
            {
              "id": "w5",
              "from": "j2",
              "to": "R2.in1",
              "d": "M 50 105 L 50 98 L 75 98",
              "net": "B"
            },
            {
              "id": "w6",
              "from": "j2",
              "to": "R2.in2",
              "d": "M 50 105 L 50 112 L 75 112",
              "net": "B"
            },
            {
              "id": "w7",
              "from": "R1.out",
              "to": "R3.in1",
              "d": "M 115 35 L 155 35 L 155 63 L 195 63",
              "net": "A'"
            },
            {
              "id": "w8",
              "from": "R2.out",
              "to": "R3.in2",
              "d": "M 115 105 L 155 105 L 155 77 L 195 77",
              "net": "B'"
            },
            {
              "id": "w9",
              "from": "R3.out",
              "to": "j3",
              "d": "M 235 70 L 275 70",
              "net": "AB"
            },
            {
              "id": "w10",
              "from": "j3",
              "to": "R4.in1",
              "d": "M 275 70 L 275 63 L 315 63",
              "net": "AB"
            },
            {
              "id": "w11",
              "from": "j3",
              "to": "R4.in2",
              "d": "M 275 70 L 275 77 L 315 77",
              "net": "AB"
            },
            {
              "id": "w12",
              "from": "R4.out",
              "to": "F",
              "d": "M 355 70 L 415 70",
              "net": "(AB)'"
            }
          ],
          "junctions": [
            {
              "x": 50,
              "y": 35,
              "r": 3.5
            },
            {
              "x": 50,
              "y": 105,
              "r": 3.5
            },
            {
              "x": 275,
              "y": 70,
              "r": 3.5
            }
          ],
          "labels": [
            {
              "text": "p = A'",
              "x": 131,
              "y": 28
            },
            {
              "text": "q = B'",
              "x": 131,
              "y": 118
            },
            {
              "text": "s = AB",
              "x": 251,
              "y": 60
            }
          ],
          "output": {
            "label": "F = (AB)'",
            "x": 420,
            "y": 70
          }
        }
      },
      {
        "id": "nor-xor",
        "targetGate": "XOR Gate",
        "targetFunction": "F = A'B + AB'",
        "gateCount": 5,
        "logicDepth": 3,
        "equations": [
          "R1 = NOR(A, A) = A'",
          "R2 = NOR(A, B) = (A + B)'",
          "R3 = NOR(B, B) = B'",
          "R4 = NOR(R1, R3) = (A' + B')' = AB",
          "F = NOR(R2, R4) = [ (A + B)' + AB ]' = A ⊕ B"
        ],
        "stepDerivation": [
          "Level 1: R1 and R3 invert inputs A and B to form A' and B'. In parallel, R2 computes (A + B)'.",
          "Level 2: R4 combines inverted signals R1 and R3: R4 = (A' + B')' = AB.",
          "Level 3: Output gate combines R2 and R4: F = [ (A + B)' + AB ]' = (A + B)(AB)' = A'B + AB' = A ⊕ B."
        ],
        "truthTable": [
          {
            "A": 0,
            "B": 0,
            "R1": 1,
            "R2": 1,
            "R3": 1,
            "R4": 0,
            "F": 0
          },
          {
            "A": 0,
            "B": 1,
            "R1": 1,
            "R2": 0,
            "R3": 0,
            "R4": 0,
            "F": 1
          },
          {
            "A": 1,
            "B": 0,
            "R1": 0,
            "R2": 0,
            "R3": 1,
            "R4": 0,
            "F": 1
          },
          {
            "A": 1,
            "B": 1,
            "R1": 0,
            "R2": 0,
            "R3": 0,
            "R4": 1,
            "F": 0
          }
        ],
        "explanation": "Five NOR gates synthesize XOR in only 3 logic levels. R1, R2, and R3 operate in parallel at Level 1, R4 computes AB at Level 2, and the output gate recombines them at Level 3. An alternative 4-level serial construction exists where a 4-gate XNOR core feeds a tied-input inverter, but the 3-level network shown here is the optimal-depth implementation.",
        "circuit": {
          "width": 480,
          "height": 160,
          "inputs": [
            {
              "id": "A",
              "label": "A",
              "x": 25,
              "y": 40
            },
            {
              "id": "B",
              "label": "B",
              "x": 25,
              "y": 120
            }
          ],
          "gates": [
            {
              "id": "R1",
              "type": "NOR",
              "x": 80,
              "y": 15,
              "label": "R1",
              "level": 1
            },
            {
              "id": "R2",
              "type": "NOR",
              "x": 80,
              "y": 65,
              "label": "R2",
              "level": 1
            },
            {
              "id": "R3",
              "type": "NOR",
              "x": 80,
              "y": 115,
              "label": "R3",
              "level": 1
            },
            {
              "id": "R4",
              "type": "NOR",
              "x": 220,
              "y": 65,
              "label": "R4",
              "level": 2
            },
            {
              "id": "R5",
              "type": "NOR",
              "x": 345,
              "y": 65,
              "label": "R5",
              "level": 3
            }
          ],
          "wires": [
            {
              "id": "w1",
              "from": "A",
              "to": "j1",
              "d": "M 25 40 L 45 40",
              "net": "A"
            },
            {
              "id": "w2",
              "from": "j1",
              "to": "R1.in1",
              "d": "M 45 40 L 45 23 L 80 23",
              "net": "A"
            },
            {
              "id": "w3",
              "from": "j1",
              "to": "R1.in2",
              "d": "M 45 40 L 45 37 L 80 37",
              "net": "A"
            },
            {
              "id": "w4",
              "from": "j1",
              "to": "R2.in1",
              "d": "M 45 40 L 45 73 L 80 73",
              "net": "A"
            },
            {
              "id": "w5",
              "from": "B",
              "to": "j2",
              "d": "M 25 120 L 45 120",
              "net": "B"
            },
            {
              "id": "w6",
              "from": "j2",
              "to": "R2.in2",
              "d": "M 45 120 L 45 87 L 80 87",
              "net": "B"
            },
            {
              "id": "w7",
              "from": "j2",
              "to": "R3.in1",
              "d": "M 45 120 L 45 123 L 80 123",
              "net": "B"
            },
            {
              "id": "w8",
              "from": "j2",
              "to": "R3.in2",
              "d": "M 45 120 L 45 137 L 80 137",
              "net": "B"
            },
            {
              "id": "w9",
              "from": "R1.out",
              "to": "R4.in1",
              "d": "M 120 30 L 170 30 L 170 73 L 220 73",
              "net": "R1"
            },
            {
              "id": "w10",
              "from": "R3.out",
              "to": "R4.in2",
              "d": "M 120 130 L 170 130 L 170 87 L 220 87",
              "net": "R3"
            },
            {
              "id": "w11",
              "from": "R2.out",
              "to": "R5.in1",
              "d": "M 120 80 L 150 80 L 150 50 L 305 50 L 305 73 L 345 73",
              "net": "R2"
            },
            {
              "id": "w12",
              "from": "R4.out",
              "to": "R5.in2",
              "d": "M 260 80 L 305 80 L 305 87 L 345 87",
              "net": "R4"
            },
            {
              "id": "w13",
              "from": "R5.out",
              "to": "F",
              "d": "M 385 80 L 425 80",
              "net": "A ⊕ B"
            }
          ],
          "junctions": [
            {
              "x": 45,
              "y": 40,
              "r": 3.5
            },
            {
              "x": 45,
              "y": 120,
              "r": 3.5
            }
          ],
          "labels": [
            {
              "text": "R1 = A'",
              "x": 136,
              "y": 22
            },
            {
              "text": "R2 = (A+B)'",
              "x": 136,
              "y": 72
            },
            {
              "text": "R3 = B'",
              "x": 136,
              "y": 142
            },
            {
              "text": "R4 = AB",
              "x": 276,
              "y": 72
            }
          ],
          "output": {
            "label": "F = A ⊕ B",
            "x": 430,
            "y": 80
          }
        }
      },
      {
        "id": "nor-xnor",
        "targetGate": "XNOR Gate",
        "targetFunction": "F = AB + A'B'",
        "gateCount": 4,
        "logicDepth": 3,
        "equations": [
          "p = NOR(A, B) = (A + B)'",
          "q = NOR(A, p) = A'B",
          "r = NOR(B, p) = AB'",
          "F = NOR(q, r) = (q + r)' = AB + A'B'"
        ],
        "stepDerivation": [
          "Level 1: Gate 1 computes p = (A + B)' = A'B'.",
          "Level 2: Gate 2 computes q = (A + p)' = A'B.",
          "Level 2: Gate 3 computes r = (B + p)' = AB'.",
          "Level 3: Gate 4 combines them: F = (q + r)' = (A'B + AB')' = AB + A'B' = A ⊙ B."
        ],
        "truthTable": [
          {
            "A": 0,
            "B": 0,
            "p": 1,
            "q": 0,
            "r": 0,
            "F": 1
          },
          {
            "A": 0,
            "B": 1,
            "p": 0,
            "q": 1,
            "r": 0,
            "F": 0
          },
          {
            "A": 1,
            "B": 0,
            "p": 0,
            "q": 0,
            "r": 1,
            "F": 0
          },
          {
            "A": 1,
            "B": 1,
            "p": 0,
            "q": 0,
            "r": 0,
            "F": 1
          }
        ],
        "explanation": "The 4-NOR core directly produces XNOR at Gate 4 without an additional inverter stage, in contrast to the 4-NAND core which directly produces XOR.",
        "circuit": {
          "width": 480,
          "height": 150,
          "inputs": [
            {
              "id": "A",
              "label": "A",
              "x": 25,
              "y": 45
            },
            {
              "id": "B",
              "label": "B",
              "x": 25,
              "y": 95
            }
          ],
          "gates": [
            {
              "id": "R1",
              "type": "NOR",
              "x": 90,
              "y": 55,
              "label": "R1",
              "level": 1
            },
            {
              "id": "R2",
              "type": "NOR",
              "x": 210,
              "y": 20,
              "label": "R2",
              "level": 2
            },
            {
              "id": "R3",
              "type": "NOR",
              "x": 210,
              "y": 90,
              "label": "R3",
              "level": 2
            },
            {
              "id": "R4",
              "type": "NOR",
              "x": 330,
              "y": 55,
              "label": "R4",
              "level": 3
            }
          ],
          "wires": [
            {
              "id": "w1",
              "from": "A",
              "to": "j1",
              "d": "M 25 45 L 55 45",
              "net": "A"
            },
            {
              "id": "w2",
              "from": "j1",
              "to": "R1.in1",
              "d": "M 55 45 L 55 63 L 90 63",
              "net": "A"
            },
            {
              "id": "w3",
              "from": "j1",
              "to": "R2.in1",
              "d": "M 55 45 L 55 28 L 210 28",
              "net": "A"
            },
            {
              "id": "w4",
              "from": "B",
              "to": "j2",
              "d": "M 25 95 L 55 95",
              "net": "B"
            },
            {
              "id": "w5",
              "from": "j2",
              "to": "R1.in2",
              "d": "M 55 95 L 55 77 L 90 77",
              "net": "B"
            },
            {
              "id": "w6",
              "from": "j2",
              "to": "R3.in2",
              "d": "M 55 95 L 55 112 L 210 112",
              "net": "B"
            },
            {
              "id": "w7",
              "from": "R1.out",
              "to": "j3",
              "d": "M 130 70 L 165 70",
              "net": "p"
            },
            {
              "id": "w8",
              "from": "j3",
              "to": "R2.in2",
              "d": "M 165 70 L 165 42 L 210 42",
              "net": "p"
            },
            {
              "id": "w9",
              "from": "j3",
              "to": "R3.in1",
              "d": "M 165 70 L 165 98 L 210 98",
              "net": "p"
            },
            {
              "id": "w10",
              "from": "R2.out",
              "to": "R4.in1",
              "d": "M 250 35 L 290 35 L 290 63 L 330 63",
              "net": "q"
            },
            {
              "id": "w11",
              "from": "R3.out",
              "to": "R4.in2",
              "d": "M 250 105 L 290 105 L 290 77 L 330 77",
              "net": "r"
            },
            {
              "id": "w12",
              "from": "R4.out",
              "to": "F",
              "d": "M 370 70 L 415 70",
              "net": "A ⊙ B"
            }
          ],
          "junctions": [
            {
              "x": 55,
              "y": 45,
              "r": 3.5
            },
            {
              "x": 55,
              "y": 95,
              "r": 3.5
            },
            {
              "x": 165,
              "y": 70,
              "r": 3.5
            }
          ],
          "labels": [
            {
              "text": "p = (A+B)'",
              "x": 146,
              "y": 60
            },
            {
              "text": "q = A'B",
              "x": 266,
              "y": 25
            },
            {
              "text": "r = AB'",
              "x": 255,
              "y": 122
            }
          ],
          "output": {
            "label": "F = A ⊙ B",
            "x": 420,
            "y": 70
          }
        }
      }
    ]
  },
  "standardRealisations": [
    {
      "id": "std-1",
      "title": "Demonstration 1: SOP using Two-Level NAND-NAND",
      "category": "SOP to NAND",
      "expression": "F = AB + CD",
      "gateFamily": "NAND Only",
      "gateCount": 3,
      "logicDepth": 2,
      "steps": [
        "Given expression is in minimal Sum of Products form: F = AB + CD.",
        "Apply double negation over the complete expression: F = ((AB + CD)')'.",
        "Apply De Morgan's theorem to the inner negated sum: (AB + CD)' = (AB)' · (CD)'.",
        "Substitute into outer negation: F = [ (AB)' · (CD)' ]'.",
        "Assign gates: p = NAND(A, B) = (AB)' and q = NAND(C, D) = (CD)' at Level 1.",
        "Output gate: F = NAND(p, q) = [ (AB)' · (CD)' ]' = AB + CD at Level 2."
      ],
      "nodes": [
        {
          "node": "p",
          "equation": "p = (AB)'",
          "type": "Level 1 NAND"
        },
        {
          "node": "q",
          "equation": "q = (CD)'",
          "type": "Level 1 NAND"
        },
        {
          "node": "F",
          "equation": "F = (pq)' = AB + CD",
          "type": "Level 2 Output NAND"
        }
      ],
      "takeaway": "An AND-OR two-level network translates directly into a NAND-NAND network with identical topology and input connections. No extra inverters are needed when primary inputs are uncomplemented.",
      "circuit": {
        "width": 480,
        "height": 140,
        "inputs": [
          {
            "id": "A",
            "label": "A",
            "x": 25,
            "y": 28
          },
          {
            "id": "B",
            "label": "B",
            "x": 25,
            "y": 42
          },
          {
            "id": "C",
            "label": "C",
            "x": 25,
            "y": 88
          },
          {
            "id": "D",
            "label": "D",
            "x": 25,
            "y": 102
          }
        ],
        "gates": [
          {
            "id": "G1",
            "type": "NAND",
            "x": 90,
            "y": 20,
            "label": "G1",
            "level": 1
          },
          {
            "id": "G2",
            "type": "NAND",
            "x": 90,
            "y": 80,
            "label": "G2",
            "level": 1
          },
          {
            "id": "G3",
            "type": "NAND",
            "x": 230,
            "y": 50,
            "label": "G3",
            "level": 2
          }
        ],
        "wires": [
          {
            "id": "w1",
            "from": "A",
            "to": "G1.in1",
            "d": "M 25 28 L 90 28",
            "net": "A"
          },
          {
            "id": "w2",
            "from": "B",
            "to": "G1.in2",
            "d": "M 25 42 L 90 42",
            "net": "B"
          },
          {
            "id": "w3",
            "from": "C",
            "to": "G2.in1",
            "d": "M 25 88 L 90 88",
            "net": "C"
          },
          {
            "id": "w4",
            "from": "D",
            "to": "G2.in2",
            "d": "M 25 102 L 90 102",
            "net": "D"
          },
          {
            "id": "w5",
            "from": "G1.out",
            "to": "G3.in1",
            "d": "M 133 35 L 180 35 L 180 58 L 230 58",
            "net": "p"
          },
          {
            "id": "w6",
            "from": "G2.out",
            "to": "G3.in2",
            "d": "M 133 95 L 180 95 L 180 72 L 230 72",
            "net": "q"
          },
          {
            "id": "w7",
            "from": "G3.out",
            "to": "F",
            "d": "M 273 65 L 360 65",
            "net": "AB+CD"
          }
        ],
        "junctions": [],
        "labels": [
          {
            "text": "p = (AB)'",
            "x": 149,
            "y": 28
          },
          {
            "text": "q = (CD)'",
            "x": 140,
            "y": 108
          }
        ],
        "output": {
          "label": "F = AB + CD",
          "x": 370,
          "y": 65
        }
      }
    },
    {
      "id": "std-2",
      "title": "Demonstration 2: POS using Two-Level NOR-NOR",
      "category": "POS to NOR",
      "expression": "F = (A + B)(C + D)",
      "gateFamily": "NOR Only",
      "gateCount": 3,
      "logicDepth": 2,
      "steps": [
        "Given expression is in minimal Product of Sums form: F = (A + B)(C + D).",
        "Apply double negation over the complete expression: F = [ ((A + B)(C + D))' ]'.",
        "Apply De Morgan's theorem to the inner negated product: [ (A + B)(C + D) ]' = (A + B)' + (C + D)'.",
        "Substitute into outer negation: F = [ (A + B)' + (C + D)' ]'.",
        "Assign gates: p = NOR(A, B) = (A + B)' and q = NOR(C, D) = (C + D)' at Level 1.",
        "Output gate: F = NOR(p, q) = [ (A + B)' + (C + D)' ]' = (A + B)(C + D) at Level 2."
      ],
      "nodes": [
        {
          "node": "p",
          "equation": "p = (A + B)'",
          "type": "Level 1 NOR"
        },
        {
          "node": "q",
          "equation": "q = (C + D)'",
          "type": "Level 1 NOR"
        },
        {
          "node": "F",
          "equation": "F = (p + q)' = (A+B)(C+D)",
          "type": "Level 2 Output NOR"
        }
      ],
      "takeaway": "An OR-AND two-level network translates directly into a NOR-NOR network with identical topology and input connections.",
      "circuit": {
        "width": 480,
        "height": 140,
        "inputs": [
          {
            "id": "A",
            "label": "A",
            "x": 25,
            "y": 28
          },
          {
            "id": "B",
            "label": "B",
            "x": 25,
            "y": 42
          },
          {
            "id": "C",
            "label": "C",
            "x": 25,
            "y": 88
          },
          {
            "id": "D",
            "label": "D",
            "x": 25,
            "y": 102
          }
        ],
        "gates": [
          {
            "id": "R1",
            "type": "NOR",
            "x": 90,
            "y": 20,
            "label": "R1",
            "level": 1
          },
          {
            "id": "R2",
            "type": "NOR",
            "x": 90,
            "y": 80,
            "label": "R2",
            "level": 1
          },
          {
            "id": "R3",
            "type": "NOR",
            "x": 230,
            "y": 50,
            "label": "R3",
            "level": 2
          }
        ],
        "wires": [
          {
            "id": "w1",
            "from": "A",
            "to": "R1.in1",
            "d": "M 25 28 L 90 28",
            "net": "A"
          },
          {
            "id": "w2",
            "from": "B",
            "to": "R1.in2",
            "d": "M 25 42 L 90 42",
            "net": "B"
          },
          {
            "id": "w3",
            "from": "C",
            "to": "R2.in1",
            "d": "M 25 88 L 90 88",
            "net": "C"
          },
          {
            "id": "w4",
            "from": "D",
            "to": "R2.in2",
            "d": "M 25 102 L 90 102",
            "net": "D"
          },
          {
            "id": "w5",
            "from": "R1.out",
            "to": "R3.in1",
            "d": "M 130 35 L 180 35 L 180 58 L 230 58",
            "net": "p"
          },
          {
            "id": "w6",
            "from": "R2.out",
            "to": "R3.in2",
            "d": "M 130 95 L 180 95 L 180 72 L 230 72",
            "net": "q"
          },
          {
            "id": "w7",
            "from": "R3.out",
            "to": "F",
            "d": "M 270 65 L 360 65",
            "net": "(A+B)(C+D)"
          }
        ],
        "junctions": [],
        "labels": [
          {
            "text": "p = (A+B)'",
            "x": 146,
            "y": 28
          },
          {
            "text": "q = (C+D)'",
            "x": 146,
            "y": 108
          }
        ],
        "output": {
          "label": "F = (A+B)(C+D)",
          "x": 370,
          "y": 65
        }
      }
    },
    {
      "id": "std-3",
      "title": "Demonstration 3: SOP with Complemented Input Literal",
      "category": "Complemented Literal",
      "expression": "F = A'B + AC",
      "gateFamily": "NAND Only",
      "gateCount": 4,
      "logicDepth": 3,
      "steps": [
        "Expression F = A'B + AC contains a complemented literal A' while primary inputs A, B, C are uncomplemented.",
        "Generate literal A' using a tied-input NAND inverter: u = NAND(A, A) = A' (Level 1).",
        "Form product complements: p = NAND(u, B) = (A'B)' and q = NAND(A, C) = (AC)' (Level 1).",
        "Combine at the second-level NAND gate: F = NAND(p, q) = [ (A'B)' · (AC)' ]' = A'B + AC (Level 2).",
        "Notice that primary input A is shared between the inverter u and the product gate q."
      ],
      "nodes": [
        {
          "node": "u",
          "equation": "u = (AA)' = A'",
          "type": "Level 1 NAND Inverter"
        },
        {
          "node": "p",
          "equation": "p = (uB)' = (A'B)'",
          "type": "Level 1 NAND"
        },
        {
          "node": "q",
          "equation": "q = (AC)'",
          "type": "Level 1 NAND"
        },
        {
          "node": "F",
          "equation": "F = (pq)' = A'B + AC",
          "type": "Level 2 Output NAND"
        }
      ],
      "takeaway": "When primary inputs are uncomplemented, each complemented variable requires an explicit inverter gate. Because inverter u precedes product gate p, the critical path (A -> u -> p -> F) has a logic depth of 3 levels, not 2.",
      "circuit": {
        "width": 480,
        "height": 140,
        "inputs": [
          {
            "id": "A",
            "label": "A",
            "x": 25,
            "y": 25
          },
          {
            "id": "B",
            "label": "B",
            "x": 25,
            "y": 60
          },
          {
            "id": "C",
            "label": "C",
            "x": 25,
            "y": 105
          }
        ],
        "gates": [
          {
            "id": "G1",
            "type": "NAND",
            "x": 75,
            "y": 10,
            "label": "G1",
            "level": 1
          },
          {
            "id": "G2",
            "type": "NAND",
            "x": 195,
            "y": 20,
            "label": "G2",
            "level": 2
          },
          {
            "id": "G3",
            "type": "NAND",
            "x": 195,
            "y": 80,
            "label": "G3",
            "level": 2
          },
          {
            "id": "G4",
            "type": "NAND",
            "x": 325,
            "y": 50,
            "label": "G4",
            "level": 3
          }
        ],
        "wires": [
          {
            "id": "w1",
            "from": "A",
            "to": "jA",
            "d": "M 25 25 L 35 25",
            "net": "A"
          },
          {
            "id": "w2",
            "from": "jA",
            "to": "j1",
            "d": "M 35 25 L 55 25",
            "net": "A"
          },
          {
            "id": "w3",
            "from": "j1",
            "to": "G1.in1",
            "d": "M 55 25 L 55 18 L 75 18",
            "net": "A"
          },
          {
            "id": "w4",
            "from": "j1",
            "to": "G1.in2",
            "d": "M 55 25 L 55 32 L 75 32",
            "net": "A"
          },
          {
            "id": "w5",
            "from": "jA",
            "to": "G3.in1",
            "d": "M 35 25 L 35 88 L 195 88",
            "net": "A"
          },
          {
            "id": "w6",
            "from": "G1.out",
            "to": "G2.in1",
            "d": "M 118 25 L 145 25 L 145 28 L 195 28",
            "net": "u"
          },
          {
            "id": "w7",
            "from": "B",
            "to": "G2.in2",
            "d": "M 25 60 L 165 60 L 165 42 L 195 42",
            "net": "B"
          },
          {
            "id": "w8",
            "from": "C",
            "to": "G3.in2",
            "d": "M 25 105 L 175 105 L 175 102 L 195 102",
            "net": "C"
          },
          {
            "id": "w9",
            "from": "G2.out",
            "to": "G4.in1",
            "d": "M 238 35 L 275 35 L 275 58 L 325 58",
            "net": "p"
          },
          {
            "id": "w10",
            "from": "G3.out",
            "to": "G4.in2",
            "d": "M 238 95 L 285 95 L 285 72 L 325 72",
            "net": "q"
          },
          {
            "id": "w11",
            "from": "G4.out",
            "to": "F",
            "d": "M 368 65 L 420 65",
            "net": "A'B+AC"
          }
        ],
        "junctions": [
          {
            "id": "jA",
            "x": 35,
            "y": 25,
            "r": 3.5
          },
          {
            "id": "j1",
            "x": 55,
            "y": 25,
            "r": 3.5
          }
        ],
        "labels": [
          {
            "text": "u = A'",
            "x": 134,
            "y": 18
          },
          {
            "text": "p = (A'B)'",
            "x": 254,
            "y": 28
          },
          {
            "text": "q = (AC)'",
            "x": 245,
            "y": 108
          }
        ],
        "output": {
          "label": "F = A'B + AC",
          "x": 425,
          "y": 65
        }
      }
    },
    {
      "id": "std-4",
      "title": "Demonstration 4: Single-Literal Term Handling in SOP",
      "category": "Single-Literal SOP",
      "expression": "F = A + BC",
      "gateFamily": "NAND Only",
      "gateCount": 3,
      "logicDepth": 2,
      "steps": [
        "Expression F = A + BC contains a single literal term A alongside product term BC.",
        "Apply double negation: F = [ (A + BC)' ]' = [ A' · (BC)' ]'.",
        "Notice the crucial requirement: the output NAND gate expects inputs A' and (BC)'.",
        "If input A were connected directly to the output NAND without inversion, the circuit would compute [ A · (BC)' ]' = A' + BC, which is an incorrect function!",
        "Therefore, an inverter is required for A: u = NAND(A, A) = A'.",
        "Product gate: p = NAND(B, C) = (BC)'. Output gate: F = NAND(u, p) = [ A' · (BC)' ]' = A + BC."
      ],
      "nodes": [
        {
          "node": "u",
          "equation": "u = (AA)' = A'",
          "type": "Level 1 NAND Inverter"
        },
        {
          "node": "p",
          "equation": "p = (BC)'",
          "type": "Level 1 NAND"
        },
        {
          "node": "F",
          "equation": "F = (up)' = A + BC",
          "type": "Level 2 Output NAND"
        }
      ],
      "takeaway": "Exam Trap: In a NAND-NAND circuit, an isolated single-literal term feeding the output gate MUST be inverted first because the output gate performs an Invert-OR operation.",
      "circuit": {
        "width": 480,
        "height": 140,
        "inputs": [
          {
            "id": "A",
            "label": "A",
            "x": 25,
            "y": 35
          },
          {
            "id": "B",
            "label": "B",
            "x": 25,
            "y": 88
          },
          {
            "id": "C",
            "label": "C",
            "x": 25,
            "y": 102
          }
        ],
        "gates": [
          {
            "id": "G1",
            "type": "NAND",
            "x": 90,
            "y": 20,
            "label": "G1",
            "level": 1
          },
          {
            "id": "G2",
            "type": "NAND",
            "x": 90,
            "y": 80,
            "label": "G2",
            "level": 1
          },
          {
            "id": "G3",
            "type": "NAND",
            "x": 230,
            "y": 50,
            "label": "G3",
            "level": 2
          }
        ],
        "wires": [
          {
            "id": "w1",
            "from": "A",
            "to": "j1",
            "d": "M 25 35 L 55 35",
            "net": "A"
          },
          {
            "id": "w2",
            "from": "j1",
            "to": "G1.in1",
            "d": "M 55 35 L 55 28 L 90 28",
            "net": "A"
          },
          {
            "id": "w3",
            "from": "j1",
            "to": "G1.in2",
            "d": "M 55 35 L 55 42 L 90 42",
            "net": "A"
          },
          {
            "id": "w4",
            "from": "B",
            "to": "G2.in1",
            "d": "M 25 88 L 90 88",
            "net": "B"
          },
          {
            "id": "w5",
            "from": "C",
            "to": "G2.in2",
            "d": "M 25 102 L 90 102",
            "net": "C"
          },
          {
            "id": "w6",
            "from": "G1.out",
            "to": "G3.in1",
            "d": "M 133 35 L 180 35 L 180 58 L 230 58",
            "net": "u"
          },
          {
            "id": "w7",
            "from": "G2.out",
            "to": "G3.in2",
            "d": "M 133 95 L 180 95 L 180 72 L 230 72",
            "net": "p"
          },
          {
            "id": "w8",
            "from": "G3.out",
            "to": "F",
            "d": "M 273 65 L 360 65",
            "net": "A+BC"
          }
        ],
        "junctions": [
          {
            "x": 55,
            "y": 35,
            "r": 3.5
          }
        ],
        "labels": [
          {
            "text": "u = A'",
            "x": 145,
            "y": 26
          },
          {
            "text": "p = (BC)'",
            "x": 145,
            "y": 108
          }
        ],
        "output": {
          "label": "F = A + BC",
          "x": 370,
          "y": 65
        }
      }
    },
    {
      "id": "std-5",
      "title": "Demonstration 5: POS Expression Implemented with NAND Alone",
      "category": "Opposite Family",
      "expression": "F = (A + B)(A' + C)",
      "gateFamily": "NAND Only",
      "gateCount": 4,
      "logicDepth": 3,
      "steps": [
        "Problem requires implementing a Product of Sums expression using exclusively NAND gates.",
        "Step 1: Convert the POS expression into an equivalent SOP form using distributive expansion and consensus:",
        "F = (A + B)(A' + C) = AA' + AC + A'B + BC = AC + A'B (since AA'=0 and BC is the redundant consensus term).",
        "Step 2: Double-negate the SOP form: F = ((AC + A'B)')' = [ (AC)' · (A'B)' ]'.",
        "Step 3: Generate u = NAND(A, A) = A', p = NAND(u, B) = (A'B)', q = NAND(A, C) = (AC)'.",
        "Step 4: Output gate F = NAND(p, q) = [ (A'B)' · (AC)' ]' = AC + A'B."
      ],
      "nodes": [
        {
          "node": "u",
          "equation": "u = A'",
          "type": "Level 1 NAND Inverter"
        },
        {
          "node": "p",
          "equation": "p = (uB)' = (A'B)'",
          "type": "Level 2 NAND (depends on u)"
        },
        {
          "node": "q",
          "equation": "q = (AC)'",
          "type": "Level 1 NAND"
        },
        {
          "node": "F",
          "equation": "F = (pq)' = AC + A'B",
          "type": "Level 3 Output NAND"
        }
      ],
      "takeaway": "A POS expression can be realized with NAND gates alone by first algebraically converting it to SOP form. Because inverter u precedes product gate p, the critical path (A -> u -> p -> F) has a logic depth of 3 levels.",
      "circuit": {
        "width": 480,
        "height": 140,
        "inputs": [
          {
            "id": "A",
            "label": "A",
            "x": 25,
            "y": 25
          },
          {
            "id": "B",
            "label": "B",
            "x": 25,
            "y": 60
          },
          {
            "id": "C",
            "label": "C",
            "x": 25,
            "y": 105
          }
        ],
        "gates": [
          {
            "id": "G1",
            "type": "NAND",
            "x": 75,
            "y": 10,
            "label": "G1",
            "level": 1
          },
          {
            "id": "G2",
            "type": "NAND",
            "x": 195,
            "y": 20,
            "label": "G2",
            "level": 2
          },
          {
            "id": "G3",
            "type": "NAND",
            "x": 195,
            "y": 80,
            "label": "G3",
            "level": 2
          },
          {
            "id": "G4",
            "type": "NAND",
            "x": 325,
            "y": 50,
            "label": "G4",
            "level": 3
          }
        ],
        "wires": [
          {
            "id": "w1",
            "from": "A",
            "to": "jA",
            "d": "M 25 25 L 35 25",
            "net": "A"
          },
          {
            "id": "w2",
            "from": "jA",
            "to": "j1",
            "d": "M 35 25 L 55 25",
            "net": "A"
          },
          {
            "id": "w3",
            "from": "j1",
            "to": "G1.in1",
            "d": "M 55 25 L 55 18 L 75 18",
            "net": "A"
          },
          {
            "id": "w4",
            "from": "j1",
            "to": "G1.in2",
            "d": "M 55 25 L 55 32 L 75 32",
            "net": "A"
          },
          {
            "id": "w5",
            "from": "jA",
            "to": "G3.in1",
            "d": "M 35 25 L 35 88 L 195 88",
            "net": "A"
          },
          {
            "id": "w6",
            "from": "G1.out",
            "to": "G2.in1",
            "d": "M 118 25 L 145 25 L 145 28 L 195 28",
            "net": "u"
          },
          {
            "id": "w7",
            "from": "B",
            "to": "G2.in2",
            "d": "M 25 60 L 165 60 L 165 42 L 195 42",
            "net": "B"
          },
          {
            "id": "w8",
            "from": "C",
            "to": "G3.in2",
            "d": "M 25 105 L 175 105 L 175 102 L 195 102",
            "net": "C"
          },
          {
            "id": "w9",
            "from": "G2.out",
            "to": "G4.in1",
            "d": "M 238 35 L 275 35 L 275 58 L 325 58",
            "net": "p"
          },
          {
            "id": "w10",
            "from": "G3.out",
            "to": "G4.in2",
            "d": "M 238 95 L 285 95 L 285 72 L 325 72",
            "net": "q"
          },
          {
            "id": "w11",
            "from": "G4.out",
            "to": "F",
            "d": "M 368 65 L 420 65",
            "net": "AC+A'B"
          }
        ],
        "junctions": [
          {
            "id": "jA",
            "x": 35,
            "y": 25,
            "r": 3.5
          },
          {
            "id": "j1",
            "x": 55,
            "y": 25,
            "r": 3.5
          }
        ],
        "labels": [
          {
            "text": "u = A'",
            "x": 135,
            "y": 18
          },
          {
            "text": "p = (A'B)'",
            "x": 255,
            "y": 28
          },
          {
            "text": "q = (AC)'",
            "x": 255,
            "y": 108
          }
        ],
        "output": {
          "label": "F = AC + A'B",
          "x": 425,
          "y": 65
        }
      },
      "name": "POS via NAND alone (4 NAND, 3 Levels)"
    },
    {
      "id": "std-6",
      "title": "Demonstration 6: SOP Expression Implemented with NOR Alone",
      "category": "Opposite Family",
      "expression": "F = AB + C",
      "gateFamily": "NOR Only",
      "gateCount": 3,
      "logicDepth": 2,
      "steps": [
        "Target function F = AB + C is given in SOP form. By distributive law, convert to POS: F = (A + C)(B + C).",
        "Step 1 (Level 1): Generate negated sum terms using 2 NOR gates: p = NOR(A, C) = (A + C)' and q = NOR(B, C) = (B + C)'.",
        "Step 2 (Level 2): Combine p and q with the output NOR gate: F = NOR(p, q) = ((A + C)' + (B + C)')' = (A + C)(B + C) = AB + C.",
        "Critical-path logic depth is exactly 2 levels because both Level 1 gates operate in parallel from primary inputs."
      ],
      "nodes": [
        {
          "node": "p",
          "equation": "p = (A + C)'",
          "type": "Level 1 NOR"
        },
        {
          "node": "q",
          "equation": "q = (B + C)'",
          "type": "Level 1 NOR"
        },
        {
          "node": "F",
          "equation": "F = (p + q)' = AB + C",
          "type": "Level 2 Output NOR"
        }
      ],
      "takeaway": "An SOP expression can be realized with NOR gates alone by first converting it to POS form. The shared input C connects to both Level 1 gates.",
      "circuit": {
        "width": 460,
        "height": 150,
        "inputs": [
          {
            "id": "A",
            "label": "A",
            "x": 25,
            "y": 35
          },
          {
            "id": "B",
            "label": "B",
            "x": 25,
            "y": 115
          },
          {
            "id": "C",
            "label": "C",
            "x": 25,
            "y": 75
          }
        ],
        "gates": [
          {
            "id": "R1",
            "type": "NOR",
            "x": 110,
            "y": 25,
            "label": "R1",
            "level": 1,
            "inputs": [
              "A",
              "C"
            ],
            "out": "p"
          },
          {
            "id": "R2",
            "type": "NOR",
            "x": 110,
            "y": 95,
            "label": "R2",
            "level": 1,
            "inputs": [
              "B",
              "C"
            ],
            "out": "q"
          },
          {
            "id": "R3",
            "type": "NOR",
            "x": 260,
            "y": 60,
            "label": "R3",
            "level": 2,
            "inputs": [
              "p",
              "q"
            ],
            "out": "F"
          }
        ],
        "wires": [
          {
            "id": "w1",
            "from": "A",
            "to": "R1.in1",
            "d": "M 25 35 L 110 35",
            "net": "A"
          },
          {
            "id": "w2",
            "from": "C",
            "to": "j1",
            "d": "M 25 75 L 65 75",
            "net": "C"
          },
          {
            "id": "w3",
            "from": "j1",
            "to": "R1.in2",
            "d": "M 65 75 L 65 48 L 110 48",
            "net": "C"
          },
          {
            "id": "w4",
            "from": "j1",
            "to": "R2.in1",
            "d": "M 65 75 L 65 103 L 110 103",
            "net": "C"
          },
          {
            "id": "w5",
            "from": "B",
            "to": "R2.in2",
            "d": "M 25 115 L 110 115",
            "net": "B"
          },
          {
            "id": "w6",
            "from": "R1.out",
            "to": "R3.in1",
            "d": "M 150 40 L 205 40 L 205 68 L 260 68",
            "net": "p"
          },
          {
            "id": "w7",
            "from": "R2.out",
            "to": "R3.in2",
            "d": "M 150 110 L 205 110 L 205 82 L 260 82",
            "net": "q"
          },
          {
            "id": "w8",
            "from": "R3.out",
            "to": "F",
            "d": "M 300 75 L 390 75",
            "net": "F"
          }
        ],
        "junctions": [
          {
            "x": 65,
            "y": 75,
            "r": 3.5
          }
        ],
        "labels": [
          {
            "text": "p=(A+C)'",
            "x": 166,
            "y": 32
          },
          {
            "text": "q=(B+C)'",
            "x": 166,
            "y": 125
          }
        ],
        "output": {
          "label": "F = AB + C",
          "x": 395,
          "y": 75
        }
      },
      "name": "SOP via NOR alone (3 NOR, 2 Levels)"
    },
    {
      "id": "std-7",
      "title": "Demonstration 7: Combined Mixed NAND and NOR Network",
      "category": "Mixed Network",
      "expression": "F = (AB + C)'",
      "gateFamily": "Mixed NAND / NOR",
      "gateCount": 3,
      "logicDepth": 3,
      "steps": [
        "Target function F = (AB + C)' naturally consists of an AND operation (AB) followed by an inverted OR operation ((...) + C)'.",
        "Step 1: Compute negated product using NAND: p = NAND(A, B) = (AB)' (Level 1).",
        "Step 2: Invert p using a NAND inverter: q = NAND(p, p) = ((AB)')' = AB (Level 2).",
        "Step 3: Combine true product q with literal C using a NOR gate: F = NOR(q, C) = (q + C)' = (AB + C)' (Level 3).",
        "Exam Pitfall: Feeding p directly into the final NOR gives (p + C)' = ((AB)' + C)' = (AB)'' · C' = ABC', which is completely wrong! The middle inverter is mandatory to restore polarity."
      ],
      "nodes": [
        {
          "node": "p",
          "equation": "p = (AB)'",
          "type": "Level 1 NAND"
        },
        {
          "node": "q",
          "equation": "q = (pp)' = AB",
          "type": "Level 2 NAND Inverter"
        },
        {
          "node": "F",
          "equation": "F = (q + C)' = (AB + C)'",
          "type": "Level 3 Output NOR"
        }
      ],
      "takeaway": "In mixed NAND/NOR networks, verify that signal polarity entering each gate matches the expected algebraic operator. Never omit an intermediate inverter without checking truth-table equivalence.",
      "circuit": {
        "width": 460,
        "height": 130,
        "inputs": [
          {
            "id": "A",
            "label": "A",
            "x": 25,
            "y": 30
          },
          {
            "id": "B",
            "label": "B",
            "x": 25,
            "y": 48
          },
          {
            "id": "C",
            "label": "C",
            "x": 25,
            "y": 95
          }
        ],
        "gates": [
          {
            "id": "N1",
            "type": "NAND",
            "x": 90,
            "y": 25,
            "label": "N1",
            "level": 1,
            "inputs": [
              "A",
              "B"
            ],
            "out": "p"
          },
          {
            "id": "N2",
            "type": "NAND",
            "x": 210,
            "y": 25,
            "label": "N2",
            "level": 2,
            "inputs": [
              "p",
              "p"
            ],
            "out": "q"
          },
          {
            "id": "R1",
            "type": "NOR",
            "x": 320,
            "y": 50,
            "label": "R1",
            "level": 3,
            "inputs": [
              "q",
              "C"
            ],
            "out": "F"
          }
        ],
        "wires": [
          {
            "id": "w1",
            "from": "A",
            "to": "N1.in1",
            "d": "M 25 30 L 90 30",
            "net": "A"
          },
          {
            "id": "w2",
            "from": "B",
            "to": "N1.in2",
            "d": "M 25 48 L 90 48",
            "net": "B"
          },
          {
            "id": "w3",
            "from": "N1.out",
            "to": "j1",
            "d": "M 133 37 L 165 37",
            "net": "p"
          },
          {
            "id": "w4",
            "from": "j1",
            "to": "N2.in1",
            "d": "M 165 37 L 165 32 L 210 32",
            "net": "p"
          },
          {
            "id": "w5",
            "from": "j1",
            "to": "N2.in2",
            "d": "M 165 37 L 165 42 L 210 42",
            "net": "p"
          },
          {
            "id": "w6",
            "from": "N2.out",
            "to": "R1.in1",
            "d": "M 253 37 L 285 37 L 285 58 L 320 58",
            "net": "q"
          },
          {
            "id": "w7",
            "from": "C",
            "to": "R1.in2",
            "d": "M 25 95 L 285 95 L 285 72 L 320 72",
            "net": "C"
          },
          {
            "id": "w8",
            "from": "R1.out",
            "to": "F",
            "d": "M 360 65 L 400 65",
            "net": "F"
          }
        ],
        "junctions": [
          {
            "x": 165,
            "y": 37,
            "r": 3.5
          }
        ],
        "labels": [
          {
            "text": "p=(AB)'",
            "x": 138,
            "y": 24
          },
          {
            "text": "q=AB",
            "x": 258,
            "y": 24
          }
        ],
        "output": {
          "label": "F = (AB + C)'",
          "x": 405,
          "y": 65
        }
      },
      "name": "Negated SOP via Mixed NAND/NOR (3 Gates, 3 Levels)"
    }
  ],
  "multiLevelTheory": {
    "overview": "A circuit is multi-level if signals traverse three or more gates in series from primary inputs to the final output. Multi-level implementations are essential when standard 2-level SOP/POS forms require gates with too many inputs (fan-in limits), or when algebraic factoring dramatically reduces total gate count and silicon area.",
    "keyConcepts": [
      {
        "concept": "Logic Depth vs Gate Count",
        "explanation": "Gate count measures total silicon area, while logic depth (number of gates on the critical path) determines propagation delay. A circuit with 6 gates across 4 levels is slower than a 6-gate circuit across 2 levels."
      },
      {
        "concept": "Gate Fan-In Constraints",
        "explanation": "Physical standard cell libraries rarely offer gates with more than 3 or 4 inputs. Wide product terms must be decomposed into a multi-level tree of 2-input gates."
      },
      {
        "concept": "Algebraic Factoring",
        "explanation": "Factoring common subexpressions (e.g. AB + AC = A(B + C)) trades extra logic levels for fewer gates and reduced wiring congestion."
      },
      {
        "concept": "Subexpression Sharing",
        "explanation": "Intermediate signals generated once can be fanned out to multiple downstream gates, eliminating redundant hardware."
      }
    ],
    "methodology": [
      {
        "step": 1,
        "title": "Expression Analysis",
        "description": "Inspect the Boolean expression, identify parentheses, and check library fan-in limits."
      },
      {
        "step": 2,
        "title": "Algebraic Factoring",
        "description": "Factor subexpressions to minimize literal count while keeping path depth balanced."
      },
      {
        "step": 3,
        "title": "Gate Family Selection",
        "description": "Choose NAND-only, NOR-only, or mixed implementation based on expression structure."
      },
      {
        "step": 4,
        "title": "Intermediate Signal Naming",
        "description": "Assign explicit labels (e.g. N1, N2, T1) to every intermediate gate output."
      },
      {
        "step": 5,
        "title": "Stage-by-Stage Mapping",
        "description": "Map operations from innermost parentheses outward, preserving signal polarities."
      },
      {
        "step": 6,
        "title": "Exhaustive Truth-Table Check",
        "description": "Evaluate all 2^n input states across intermediate nodes to verify equivalence."
      }
    ],
    "guidedExamples": [
      {
        "id": "ml-ex1",
        "title": "Multi-Level Factored NAND Synthesis: F = (AB + C)D + E",
        "expression": "F = (AB + C)D + E",
        "gateFamily": "NAND Only (Strictly 2-input gates, uncomplemented inputs)",
        "totalGates": 6,
        "logicDepth": 4,
        "variables": [
          "A",
          "B",
          "C",
          "D",
          "E"
        ],
        "stages": [
          {
            "title": "Stage 1: Generate Inner Product and Inverted Literals",
            "activeLevel": "Level 1",
            "gatesAdded": [
              "G1: NAND(A, B) -> p",
              "Gu: NAND(C, C) -> u = C'",
              "Gv: NAND(E, E) -> v = E'"
            ],
            "explanation": "Three NAND gates operate in parallel at Level 1: G1 computes p = (AB)', Gu inverts literal C to u = C', and Gv inverts literal E to v = E' for subsequent active-low recombination."
          },
          {
            "title": "Stage 2: Form Sum Term (AB + C)",
            "activeLevel": "Level 2",
            "gatesAdded": [
              "G2: NAND(p, u) -> q = AB + C"
            ],
            "explanation": "Gate G2 combines negated product p and inverted literal u to produce q = (p · u)' = ((AB)' · C')' = AB + C at Level 2."
          },
          {
            "title": "Stage 3: Multiply by Literal D",
            "activeLevel": "Level 3",
            "gatesAdded": [
              "G3: NAND(q, D) -> r = ((AB + C)D)'"
            ],
            "explanation": "Gate G3 multiplies intermediate sum q by primary input D to produce negated cascade output r = ((AB + C)D)' at Level 3."
          },
          {
            "title": "Stage 4: Final Output Recombination",
            "activeLevel": "Level 4",
            "gatesAdded": [
              "G4: NAND(r, v) -> F = (AB + C)D + E"
            ],
            "explanation": "Final gate G4 combines r and inverted literal v = E' to yield output F = (r · v)' = (((AB + C)D)' · E')' = (AB + C)D + E in 4 logic levels using 6 NAND gates."
          }
        ],
        "circuit": {
          "width": 560,
          "height": 180,
          "inputs": [
            {
              "id": "A",
              "label": "A",
              "x": 20,
              "y": 25
            },
            {
              "id": "B",
              "label": "B",
              "x": 20,
              "y": 45
            },
            {
              "id": "C",
              "label": "C",
              "x": 20,
              "y": 75
            },
            {
              "id": "D",
              "label": "D",
              "x": 20,
              "y": 115
            },
            {
              "id": "E",
              "label": "E",
              "x": 20,
              "y": 150
            }
          ],
          "gates": [
            {
              "id": "G1",
              "type": "NAND",
              "x": 80,
              "y": 20,
              "label": "G1",
              "level": 1,
              "stage": 0,
              "inputs": [
                "A",
                "B"
              ],
              "out": "p"
            },
            {
              "id": "Gu",
              "type": "NAND",
              "x": 80,
              "y": 65,
              "label": "Gu",
              "level": 1,
              "stage": 0,
              "inputs": [
                "C",
                "C"
              ],
              "out": "u"
            },
            {
              "id": "Gv",
              "type": "NAND",
              "x": 80,
              "y": 140,
              "label": "Gv",
              "level": 1,
              "stage": 0,
              "inputs": [
                "E",
                "E"
              ],
              "out": "v"
            },
            {
              "id": "G2",
              "type": "NAND",
              "x": 200,
              "y": 42,
              "label": "G2",
              "level": 2,
              "stage": 1,
              "inputs": [
                "p",
                "u"
              ],
              "out": "q"
            },
            {
              "id": "G3",
              "type": "NAND",
              "x": 310,
              "y": 75,
              "label": "G3",
              "level": 3,
              "stage": 2,
              "inputs": [
                "q",
                "D"
              ],
              "out": "r"
            },
            {
              "id": "G4",
              "type": "NAND",
              "x": 420,
              "y": 105,
              "label": "G4",
              "level": 4,
              "stage": 3,
              "inputs": [
                "r",
                "v"
              ],
              "out": "F"
            }
          ],
          "wires": [
            {
              "id": "w1",
              "from": "A",
              "to": "G1.in1",
              "d": "M 20 25 L 80 25",
              "net": "A"
            },
            {
              "id": "w2",
              "from": "B",
              "to": "G1.in2",
              "d": "M 20 45 L 50 45 L 50 37 L 80 37",
              "net": "B"
            },
            {
              "id": "w3",
              "from": "C",
              "to": "j1",
              "d": "M 20 75 L 50 75",
              "net": "C"
            },
            {
              "id": "w4",
              "from": "j1",
              "to": "Gu.in1",
              "d": "M 50 75 L 50 70 L 80 70",
              "net": "C"
            },
            {
              "id": "w5",
              "from": "j1",
              "to": "Gu.in2",
              "d": "M 50 75 L 50 80 L 80 80",
              "net": "C"
            },
            {
              "id": "w6",
              "from": "E",
              "to": "j2",
              "d": "M 20 150 L 50 150",
              "net": "E"
            },
            {
              "id": "w7",
              "from": "j2",
              "to": "Gv.in1",
              "d": "M 50 150 L 50 145 L 80 145",
              "net": "E"
            },
            {
              "id": "w8",
              "from": "j2",
              "to": "Gv.in2",
              "d": "M 50 150 L 50 155 L 80 155",
              "net": "E"
            },
            {
              "id": "w9",
              "from": "G1.out",
              "to": "G2.in1",
              "d": "M 123 32 L 160 32 L 160 49 L 200 49",
              "net": "p"
            },
            {
              "id": "w10",
              "from": "Gu.out",
              "to": "G2.in2",
              "d": "M 123 77 L 160 77 L 160 60 L 200 60",
              "net": "u"
            },
            {
              "id": "w11",
              "from": "G2.out",
              "to": "G3.in1",
              "d": "M 243 55 L 275 55 L 275 82 L 310 82",
              "net": "q"
            },
            {
              "id": "w12",
              "from": "D",
              "to": "G3.in2",
              "d": "M 20 115 L 275 115 L 275 93 L 310 93",
              "net": "D"
            },
            {
              "id": "w13",
              "from": "G3.out",
              "to": "G4.in1",
              "d": "M 353 87 L 385 87 L 385 112 L 420 112",
              "net": "r"
            },
            {
              "id": "w14",
              "from": "Gv.out",
              "to": "G4.in2",
              "d": "M 123 152 L 385 152 L 385 123 L 420 123",
              "net": "v"
            },
            {
              "id": "w15",
              "from": "G4.out",
              "to": "F",
              "d": "M 463 117 L 500 117",
              "net": "F"
            }
          ],
          "junctions": [
            {
              "x": 50,
              "y": 75,
              "r": 3.5
            },
            {
              "x": 50,
              "y": 150,
              "r": 3.5
            }
          ],
          "labels": [
            {
              "text": "p=(AB)'",
              "x": 139,
              "y": 25
            },
            {
              "text": "u=C'",
              "x": 139,
              "y": 70
            },
            {
              "text": "v=E'",
              "x": 139,
              "y": 145
            },
            {
              "text": "q=AB+C",
              "x": 259,
              "y": 48
            },
            {
              "text": "r",
              "x": 369,
              "y": 80
            }
          ],
          "output": {
            "label": "F = (AB+C)D+E",
            "x": 505,
            "y": 117
          }
        },
        "gateCount": 6
      },
      {
        "id": "ml-ex2",
        "title": "Multi-Level Factored NOR Synthesis: F = [(A + B)C + D]E",
        "expression": "F = [(A + B)C + D]E",
        "gateFamily": "NOR Only (Strictly 2-input gates, uncomplemented inputs)",
        "totalGates": 6,
        "logicDepth": 4,
        "variables": [
          "A",
          "B",
          "C",
          "D",
          "E"
        ],
        "stages": [
          {
            "title": "Stage 1: Generate Inner Sum and Inverted Literals",
            "activeLevel": "Level 1",
            "gatesAdded": [
              "R1: NOR(A, B) -> p",
              "Ru: NOR(C, C) -> u = C'",
              "Rv: NOR(E, E) -> v = E'"
            ],
            "explanation": "Three NOR gates operate in parallel at Level 1: R1 computes p = (A + B)', Ru inverts literal C to u = C', and Rv inverts literal E to v = E'."
          },
          {
            "title": "Stage 2: Form Product Term (A + B)C",
            "activeLevel": "Level 2",
            "gatesAdded": [
              "R2: NOR(p, u) -> q = (A + B)C"
            ],
            "explanation": "Gate R2 combines negated sum p and inverted literal u to produce q = (p + u)' = ((A + B)' + C')' = (A + B)C at Level 2."
          },
          {
            "title": "Stage 3: Add Literal D",
            "activeLevel": "Level 3",
            "gatesAdded": [
              "R3: NOR(q, D) -> r = ((A + B)C + D)'"
            ],
            "explanation": "Gate R3 adds literal D to intermediate product q to produce negated cascade signal r = ((A + B)C + D)' at Level 3."
          },
          {
            "title": "Stage 4: Final Output Multiplication",
            "activeLevel": "Level 4",
            "gatesAdded": [
              "R4: NOR(r, v) -> F = [(A + B)C + D]E"
            ],
            "explanation": "Final gate R4 combines cascade r with inverted literal v = E' to yield output F = (r + v)' = (((A + B)C + D)' + E')' = [(A + B)C + D]E in 4 logic levels using 6 NOR gates."
          }
        ],
        "circuit": {
          "width": 560,
          "height": 180,
          "inputs": [
            {
              "id": "A",
              "label": "A",
              "x": 20,
              "y": 25
            },
            {
              "id": "B",
              "label": "B",
              "x": 20,
              "y": 45
            },
            {
              "id": "C",
              "label": "C",
              "x": 20,
              "y": 75
            },
            {
              "id": "D",
              "label": "D",
              "x": 20,
              "y": 115
            },
            {
              "id": "E",
              "label": "E",
              "x": 20,
              "y": 150
            }
          ],
          "gates": [
            {
              "id": "R1",
              "type": "NOR",
              "x": 80,
              "y": 20,
              "label": "R1",
              "level": 1,
              "stage": 0,
              "inputs": [
                "A",
                "B"
              ],
              "out": "p"
            },
            {
              "id": "Ru",
              "type": "NOR",
              "x": 80,
              "y": 65,
              "label": "Ru",
              "level": 1,
              "stage": 0,
              "inputs": [
                "C",
                "C"
              ],
              "out": "u"
            },
            {
              "id": "Rv",
              "type": "NOR",
              "x": 80,
              "y": 140,
              "label": "Rv",
              "level": 1,
              "stage": 0,
              "inputs": [
                "E",
                "E"
              ],
              "out": "v"
            },
            {
              "id": "R2",
              "type": "NOR",
              "x": 200,
              "y": 42,
              "label": "R2",
              "level": 2,
              "stage": 1,
              "inputs": [
                "p",
                "u"
              ],
              "out": "q"
            },
            {
              "id": "R3",
              "type": "NOR",
              "x": 310,
              "y": 75,
              "label": "R3",
              "level": 3,
              "stage": 2,
              "inputs": [
                "q",
                "D"
              ],
              "out": "r"
            },
            {
              "id": "R4",
              "type": "NOR",
              "x": 420,
              "y": 105,
              "label": "R4",
              "level": 4,
              "stage": 3,
              "inputs": [
                "r",
                "v"
              ],
              "out": "F"
            }
          ],
          "wires": [
            {
              "id": "w1",
              "from": "A",
              "to": "R1.in1",
              "d": "M 20 25 L 80 25",
              "net": "A"
            },
            {
              "id": "w2",
              "from": "B",
              "to": "R1.in2",
              "d": "M 20 45 L 50 45 L 50 37 L 80 37",
              "net": "B"
            },
            {
              "id": "w3",
              "from": "C",
              "to": "j1",
              "d": "M 20 75 L 50 75",
              "net": "C"
            },
            {
              "id": "w4",
              "from": "j1",
              "to": "Ru.in1",
              "d": "M 50 75 L 50 70 L 80 70",
              "net": "C"
            },
            {
              "id": "w5",
              "from": "j1",
              "to": "Ru.in2",
              "d": "M 50 75 L 50 80 L 80 80",
              "net": "C"
            },
            {
              "id": "w6",
              "from": "E",
              "to": "j2",
              "d": "M 20 150 L 50 150",
              "net": "E"
            },
            {
              "id": "w7",
              "from": "j2",
              "to": "Rv.in1",
              "d": "M 50 150 L 50 145 L 80 145",
              "net": "E"
            },
            {
              "id": "w8",
              "from": "j2",
              "to": "Rv.in2",
              "d": "M 50 150 L 50 155 L 80 155",
              "net": "E"
            },
            {
              "id": "w9",
              "from": "R1.out",
              "to": "R2.in1",
              "d": "M 120 35 L 160 35 L 160 49 L 200 49",
              "net": "p"
            },
            {
              "id": "w10",
              "from": "Ru.out",
              "to": "R2.in2",
              "d": "M 120 80 L 160 80 L 160 60 L 200 60",
              "net": "u"
            },
            {
              "id": "w11",
              "from": "R2.out",
              "to": "R3.in1",
              "d": "M 240 57 L 275 57 L 275 82 L 310 82",
              "net": "q"
            },
            {
              "id": "w12",
              "from": "D",
              "to": "R3.in2",
              "d": "M 20 115 L 275 115 L 275 93 L 310 93",
              "net": "D"
            },
            {
              "id": "w13",
              "from": "R3.out",
              "to": "R4.in1",
              "d": "M 350 90 L 385 90 L 385 112 L 420 112",
              "net": "r"
            },
            {
              "id": "w14",
              "from": "Rv.out",
              "to": "R4.in2",
              "d": "M 120 155 L 385 155 L 385 123 L 420 123",
              "net": "v"
            },
            {
              "id": "w15",
              "from": "R4.out",
              "to": "F",
              "d": "M 460 120 L 500 120",
              "net": "F"
            }
          ],
          "junctions": [
            {
              "x": 50,
              "y": 75,
              "r": 3.5
            },
            {
              "x": 50,
              "y": 150,
              "r": 3.5
            }
          ],
          "labels": [
            {
              "text": "p=(A+B)'",
              "x": 136,
              "y": 25
            },
            {
              "text": "u=C'",
              "x": 136,
              "y": 70
            },
            {
              "text": "v=E'",
              "x": 136,
              "y": 145
            },
            {
              "text": "q=(A+B)C",
              "x": 256,
              "y": 48
            },
            {
              "text": "r",
              "x": 366,
              "y": 80
            }
          ],
          "output": {
            "label": "F = [(A+B)C+D]E",
            "x": 505,
            "y": 120
          }
        },
        "gateCount": 6
      },
      {
        "id": "ml-ex3",
        "title": "Subexpression Factoring with Fan-In Limits: F = A(B + CD)",
        "expression": "F = A(B + CD)",
        "gateFamily": "NAND Only (Strictly 2-input gates)",
        "totalGates": 5,
        "logicDepth": 4,
        "variables": [
          "A",
          "B",
          "C",
          "D"
        ],
        "stages": [
          {
            "title": "Stage 1: Form Inner Product CD and Invert Literal B",
            "activeLevel": "Level 1",
            "gatesAdded": [
              "G1: NAND(B, B) -> p = B'",
              "G2: NAND(C, D) -> q = (CD)'"
            ],
            "explanation": "Two NAND gates operate at Level 1: G1 inverts literal B to p = B', and G2 computes negated product q = (CD)'."
          },
          {
            "title": "Stage 2: Combine to Form Sum (B + CD)",
            "activeLevel": "Level 2",
            "gatesAdded": [
              "G3: NAND(p, q) -> r = B + CD"
            ],
            "explanation": "Gate G3 combines p and q to produce r = (p · q)' = (B' · (CD)')' = B + CD at Level 2."
          },
          {
            "title": "Stage 3: Multiply by Literal A",
            "activeLevel": "Level 3",
            "gatesAdded": [
              "G4: NAND(A, r) -> s = (A(B + CD))'"
            ],
            "explanation": "Gate G4 multiplies intermediate sum r by literal A to produce s = (A(B + CD))' at Level 3."
          },
          {
            "title": "Stage 4: Output Inversion",
            "activeLevel": "Level 4",
            "gatesAdded": [
              "G5: NAND(s, s) -> F = A(B + CD)"
            ],
            "explanation": "Final tied-input NAND inverter G5 inverts s to produce F = (s · s)' = A(B + CD) in 4 logic levels using strictly 5 NAND gates."
          }
        ],
        "circuit": {
          "width": 540,
          "height": 160,
          "inputs": [
            {
              "id": "A",
              "label": "A",
              "x": 20,
              "y": 25
            },
            {
              "id": "B",
              "label": "B",
              "x": 20,
              "y": 65
            },
            {
              "id": "C",
              "label": "C",
              "x": 20,
              "y": 110
            },
            {
              "id": "D",
              "label": "D",
              "x": 20,
              "y": 130
            }
          ],
          "gates": [
            {
              "id": "G1",
              "type": "NAND",
              "x": 80,
              "y": 55,
              "label": "G1",
              "level": 1,
              "stage": 0,
              "inputs": [
                "B",
                "B"
              ],
              "out": "p"
            },
            {
              "id": "G2",
              "type": "NAND",
              "x": 80,
              "y": 110,
              "label": "G2",
              "level": 1,
              "stage": 0,
              "inputs": [
                "C",
                "D"
              ],
              "out": "q"
            },
            {
              "id": "G3",
              "type": "NAND",
              "x": 195,
              "y": 80,
              "label": "G3",
              "level": 2,
              "stage": 1,
              "inputs": [
                "p",
                "q"
              ],
              "out": "r"
            },
            {
              "id": "G4",
              "type": "NAND",
              "x": 305,
              "y": 40,
              "label": "G4",
              "level": 3,
              "stage": 2,
              "inputs": [
                "A",
                "r"
              ],
              "out": "s"
            },
            {
              "id": "G5",
              "type": "NAND",
              "x": 415,
              "y": 40,
              "label": "G5",
              "level": 4,
              "stage": 3,
              "inputs": [
                "s",
                "s"
              ],
              "out": "F"
            }
          ],
          "wires": [
            {
              "id": "w1",
              "from": "B",
              "to": "j1",
              "d": "M 20 65 L 50 65",
              "net": "B"
            },
            {
              "id": "w2",
              "from": "j1",
              "to": "G1.in1",
              "d": "M 50 65 L 50 60 L 80 60",
              "net": "B"
            },
            {
              "id": "w3",
              "from": "j1",
              "to": "G1.in2",
              "d": "M 50 65 L 50 70 L 80 70",
              "net": "B"
            },
            {
              "id": "w4",
              "from": "C",
              "to": "G2.in1",
              "d": "M 20 110 L 50 110 L 50 117 L 80 117",
              "net": "C"
            },
            {
              "id": "w5",
              "from": "D",
              "to": "G2.in2",
              "d": "M 20 130 L 50 130 L 50 127 L 80 127",
              "net": "D"
            },
            {
              "id": "w6",
              "from": "G1.out",
              "to": "G3.in1",
              "d": "M 123 67 L 160 67 L 160 87 L 195 87",
              "net": "p"
            },
            {
              "id": "w7",
              "from": "G2.out",
              "to": "G3.in2",
              "d": "M 123 122 L 160 122 L 160 98 L 195 98",
              "net": "q"
            },
            {
              "id": "w8",
              "from": "A",
              "to": "G4.in1",
              "d": "M 20 25 L 265 25 L 265 47 L 305 47",
              "net": "A"
            },
            {
              "id": "w9",
              "from": "G3.out",
              "to": "G4.in2",
              "d": "M 238 92 L 265 92 L 265 58 L 305 58",
              "net": "r"
            },
            {
              "id": "w10",
              "from": "G4.out",
              "to": "j2",
              "d": "M 348 52 L 380 52",
              "net": "s"
            },
            {
              "id": "w11",
              "from": "j2",
              "to": "G5.in1",
              "d": "M 380 52 L 380 47 L 415 47",
              "net": "s"
            },
            {
              "id": "w12",
              "from": "j2",
              "to": "G5.in2",
              "d": "M 380 52 L 380 57 L 415 57",
              "net": "s"
            },
            {
              "id": "w13",
              "from": "G5.out",
              "to": "F",
              "d": "M 458 52 L 495 52",
              "net": "F"
            }
          ],
          "junctions": [
            {
              "x": 50,
              "y": 65,
              "r": 3.5
            },
            {
              "x": 380,
              "y": 52,
              "r": 3.5
            }
          ],
          "labels": [
            {
              "text": "p=B'",
              "x": 139,
              "y": 58
            },
            {
              "text": "q=(CD)'",
              "x": 139,
              "y": 141
            },
            {
              "text": "r=B+CD",
              "x": 254,
              "y": 85
            },
            {
              "text": "s",
              "x": 364,
              "y": 45
            }
          ],
          "output": {
            "label": "F = A(B+CD)",
            "x": 500,
            "y": 52
          }
        },
        "gateCount": 5
      }
    ]
  },
  "workedExamples": [
    {
      "id": "WE-01",
      "number": "Model 34",
      "title": "SOP with Complemented Input using NAND Only",
      "category": "NAND",
      "givenExpression": "F(A,B,C) = AB + A'C",
      "problemStatement": "Synthesize the 2:1 multiplexer logic function F(A,B,C) = AB + A'C using minimum 2-input NAND gates alone, assuming only uncomplemented primary inputs A, B, and C are available.",
      "requiredRealisation": "NAND Only",
      "gateCount": 4,
      "logicLevels": 3,
      "derivationSteps": [
        "Apply involution (double inversion) to the given sum of products: F = ((AB + A'C)'')'.",
        "Apply De Morgan's theorem to the inner expression: (AB + A'C)' = (AB)' · (A'C)'.",
        "Because primary input A is uncomplemented, synthesize an initial inverter stage: u = NAND(A, A) = A' (Level 1).",
        "Synthesize first-level product terms: p = NAND(A, B) = (AB)' and q = NAND(u, C) = (A'C)' (Level 2).",
        "Combine p and q in the final output NAND gate: F = NAND(p, q) = (p · q)' = ((AB)' · (A'C)')' = AB + A'C (Level 3)."
      ],
      "intermediateNodes": [
        {
          "net": "u",
          "equation": "A' = (A·A)'",
          "level": 1,
          "type": "Primary Input Inverter"
        },
        {
          "net": "p",
          "equation": "(AB)'",
          "level": 2,
          "type": "First Product Term"
        },
        {
          "net": "q",
          "equation": "(A'C)'",
          "level": 2,
          "type": "Second Product Term"
        },
        {
          "net": "F",
          "equation": "AB + A'C",
          "level": 3,
          "type": "Final Output Sum"
        }
      ],
      "truthTable": [
        {
          "A": 0,
          "B": 0,
          "C": 0,
          "F": 0
        },
        {
          "A": 0,
          "B": 0,
          "C": 1,
          "F": 1
        },
        {
          "A": 0,
          "B": 1,
          "C": 0,
          "F": 0
        },
        {
          "A": 0,
          "B": 1,
          "C": 1,
          "F": 1
        },
        {
          "A": 1,
          "B": 0,
          "C": 0,
          "F": 0
        },
        {
          "A": 1,
          "B": 0,
          "C": 1,
          "F": 0
        },
        {
          "A": 1,
          "B": 1,
          "C": 0,
          "F": 1
        },
        {
          "A": 1,
          "B": 1,
          "C": 1,
          "F": 1
        }
      ],
      "interpretation": "The 2:1 multiplexer requires 4 NAND gates. Because input A must be inverted by gate G1 before entering product gate G3, the critical path passes through G1, G3, and G4, yielding exactly 3 logic levels.",
      "finalAnswer": "F = [ (AB)' · (A'C)' ]' = AB + A'C synthesized with 4 NAND gates in 3 logic levels.",
      "circuit": {
        "width": 480,
        "height": 140,
        "inputs": [
          {
            "id": "A",
            "label": "A",
            "x": 25,
            "y": 25
          },
          {
            "id": "B",
            "label": "B",
            "x": 25,
            "y": 65
          },
          {
            "id": "C",
            "label": "C",
            "x": 25,
            "y": 110
          }
        ],
        "gates": [
          {
            "id": "G1",
            "type": "NAND",
            "x": 75,
            "y": 10,
            "label": "G1",
            "level": 1
          },
          {
            "id": "G2",
            "type": "NAND",
            "x": 195,
            "y": 20,
            "label": "G2",
            "level": 2
          },
          {
            "id": "G3",
            "type": "NAND",
            "x": 195,
            "y": 80,
            "label": "G3",
            "level": 2
          },
          {
            "id": "G4",
            "type": "NAND",
            "x": 325,
            "y": 50,
            "label": "G4",
            "level": 3
          }
        ],
        "wires": [
          {
            "id": "w1",
            "from": "A",
            "to": "j1",
            "d": "M 25 25 L 45 25",
            "net": "A"
          },
          {
            "id": "w2",
            "from": "j1",
            "to": "G1.in1",
            "d": "M 45 25 L 45 18 L 75 18",
            "net": "A"
          },
          {
            "id": "w3",
            "from": "j1",
            "to": "G1.in2",
            "d": "M 45 25 L 45 32 L 75 32",
            "net": "A"
          },
          {
            "id": "w4",
            "from": "j1",
            "to": "G2.in1",
            "d": "M 45 25 L 45 5 L 175 5 L 175 28 L 195 28",
            "net": "A"
          },
          {
            "id": "w5",
            "from": "B",
            "to": "G2.in2",
            "d": "M 25 65 L 185 65 L 185 42 L 195 42",
            "net": "B"
          },
          {
            "id": "w6",
            "from": "G1.out",
            "to": "G3.in1",
            "d": "M 118 25 L 155 25 L 155 88 L 195 88",
            "net": "u"
          },
          {
            "id": "w7",
            "from": "C",
            "to": "G3.in2",
            "d": "M 25 110 L 165 110 L 165 102 L 195 102",
            "net": "C"
          },
          {
            "id": "w8",
            "from": "G2.out",
            "to": "G4.in1",
            "d": "M 238 35 L 275 35 L 275 58 L 325 58",
            "net": "p"
          },
          {
            "id": "w9",
            "from": "G3.out",
            "to": "G4.in2",
            "d": "M 238 95 L 285 95 L 285 72 L 325 72",
            "net": "q"
          },
          {
            "id": "w10",
            "from": "G4.out",
            "to": "F",
            "d": "M 368 65 L 420 65",
            "net": "AB+A'C"
          }
        ],
        "junctions": [
          {
            "x": 45,
            "y": 25,
            "r": 3.5
          }
        ],
        "labels": [
          {
            "text": "u = A'",
            "x": 134,
            "y": 18
          },
          {
            "text": "p = (AB)'",
            "x": 254,
            "y": 28
          },
          {
            "text": "q = (A'C)'",
            "x": 245,
            "y": 108
          }
        ],
        "output": {
          "label": "F = AB + A'C",
          "x": 425,
          "y": 65
        }
      }
    },
    {
      "id": "WE-02",
      "number": "Model 35",
      "title": "POS with Complemented Input using NOR Only",
      "category": "NOR",
      "givenExpression": "F(A,B,C) = (A + B')(B + C)",
      "problemStatement": "Synthesize the product-of-sums function F(A,B,C) = (A + B')(B + C) using 2-input NOR gates alone, assuming only uncomplemented primary inputs are available.",
      "requiredRealisation": "NOR Only",
      "gateCount": 4,
      "logicLevels": 3,
      "derivationSteps": [
        "Apply double involution to the POS expression: F = (( (A + B')(B + C) )'')'.",
        "Apply De Morgan's theorem: [ (A + B')(B + C) ]' = (A + B')' + (B + C)'.",
        "Because B is uncomplemented, synthesize an inverter stage: v = NOR(B, B) = B' (Level 1).",
        "Synthesize sum terms: p = NOR(A, v) = (A + B')' and q = NOR(B, C) = (B + C)' (Level 2).",
        "Combine p and q in the output NOR gate: F = NOR(p, q) = (p + q)' = (A + B')(B + C) (Level 3)."
      ],
      "intermediateNodes": [
        {
          "net": "v",
          "equation": "B' = (B+B)'",
          "level": 1,
          "type": "Primary Input Inverter"
        },
        {
          "net": "p",
          "equation": "(A + B')'",
          "level": 2,
          "type": "First Sum Term"
        },
        {
          "net": "q",
          "equation": "(B + C)'",
          "level": 2,
          "type": "Second Sum Term"
        },
        {
          "net": "F",
          "equation": "(A + B')(B + C)",
          "level": 3,
          "type": "Final Output Product"
        }
      ],
      "truthTable": [
        {
          "A": 0,
          "B": 0,
          "C": 0,
          "F": 0
        },
        {
          "A": 0,
          "B": 0,
          "C": 1,
          "F": 1
        },
        {
          "A": 0,
          "B": 1,
          "C": 0,
          "F": 0
        },
        {
          "A": 0,
          "B": 1,
          "C": 1,
          "F": 0
        },
        {
          "A": 1,
          "B": 0,
          "C": 0,
          "F": 0
        },
        {
          "A": 1,
          "B": 0,
          "C": 1,
          "F": 1
        },
        {
          "A": 1,
          "B": 1,
          "C": 0,
          "F": 1
        },
        {
          "A": 1,
          "B": 1,
          "C": 1,
          "F": 1
        }
      ],
      "interpretation": "Synthesizing a POS expression using NOR gates naturally produces a 2-level OR-AND equivalent. With complemented input B', a preliminary inverter adds one level, producing a total logic depth of 3.",
      "finalAnswer": "F = [ (A + B')' + (B + C)' ]' = (A + B')(B + C) synthesized with 4 NOR gates in 3 logic levels.",
      "circuit": {
        "width": 480,
        "height": 140,
        "inputs": [
          {
            "id": "A",
            "label": "A",
            "x": 25,
            "y": 25
          },
          {
            "id": "B",
            "label": "B",
            "x": 25,
            "y": 65
          },
          {
            "id": "C",
            "label": "C",
            "x": 25,
            "y": 110
          }
        ],
        "gates": [
          {
            "id": "R1",
            "type": "NOR",
            "x": 75,
            "y": 10,
            "label": "R1",
            "level": 1
          },
          {
            "id": "R2",
            "type": "NOR",
            "x": 195,
            "y": 20,
            "label": "R2",
            "level": 2
          },
          {
            "id": "R3",
            "type": "NOR",
            "x": 195,
            "y": 80,
            "label": "R3",
            "level": 2
          },
          {
            "id": "R4",
            "type": "NOR",
            "x": 325,
            "y": 50,
            "label": "R4",
            "level": 3
          }
        ],
        "wires": [
          {
            "id": "w1",
            "from": "B",
            "to": "j1",
            "d": "M 25 65 L 45 65",
            "net": "B"
          },
          {
            "id": "w2",
            "from": "j1",
            "to": "R1.in1",
            "d": "M 45 65 L 45 18 L 75 18",
            "net": "B"
          },
          {
            "id": "w3",
            "from": "j1",
            "to": "R1.in2",
            "d": "M 45 65 L 45 32 L 75 32",
            "net": "B"
          },
          {
            "id": "w4",
            "from": "j1",
            "to": "R3.in1",
            "d": "M 45 65 L 160 65 L 160 88 L 195 88",
            "net": "B"
          },
          {
            "id": "w5",
            "from": "A",
            "to": "R2.in1",
            "d": "M 25 25 L 35 25 L 35 5 L 175 5 L 175 28 L 195 28",
            "net": "A"
          },
          {
            "id": "w6",
            "from": "R1.out",
            "to": "R2.in2",
            "d": "M 115 25 L 150 25 L 150 42 L 195 42",
            "net": "v"
          },
          {
            "id": "w7",
            "from": "C",
            "to": "R3.in2",
            "d": "M 25 110 L 170 110 L 170 102 L 195 102",
            "net": "C"
          },
          {
            "id": "w8",
            "from": "R2.out",
            "to": "R4.in1",
            "d": "M 238 35 L 275 35 L 275 58 L 325 58",
            "net": "p"
          },
          {
            "id": "w9",
            "from": "R3.out",
            "to": "R4.in2",
            "d": "M 238 95 L 285 95 L 285 72 L 325 72",
            "net": "q"
          },
          {
            "id": "w10",
            "from": "R4.out",
            "to": "F",
            "d": "M 368 65 L 420 65",
            "net": "(A+B')(B+C)"
          }
        ],
        "junctions": [
          {
            "x": 45,
            "y": 65,
            "r": 3.5
          }
        ],
        "labels": [
          {
            "text": "v = B'",
            "x": 131,
            "y": 18
          },
          {
            "text": "p = (A+B')'",
            "x": 251,
            "y": 28
          },
          {
            "text": "q = (B+C)'",
            "x": 245,
            "y": 108
          }
        ],
        "output": {
          "label": "F = (A+B')(B+C)",
          "x": 425,
          "y": 65
        }
      }
    },
    {
      "id": "WE-03",
      "number": "Model 36",
      "title": "Equivalence (XNOR) using NAND-NAND SOP Network",
      "category": "NAND",
      "givenExpression": "F(A,B) = A'B' + AB",
      "problemStatement": "Synthesize the 2-variable equivalence function F(A,B) = A'B' + AB using standard 2-level SOP NAND architecture from uncomplemented primary inputs.",
      "requiredRealisation": "NAND Only",
      "gateCount": 5,
      "logicLevels": 3,
      "derivationSteps": [
        "Invert inputs A and B using tied-input NAND inverters: u = (AA)' = A' and v = (BB)' = B' (Level 1).",
        "Form product terms: p = NAND(u, v) = (A'B')' and q = NAND(A, B) = (AB)' (Level 2).",
        "Combine p and q in output NAND: F = NAND(p, q) = ((A'B')' · (AB)')' = A'B' + AB (Level 3)."
      ],
      "intermediateNodes": [
        {
          "net": "u",
          "equation": "A'",
          "level": 1,
          "type": "Inverter on A"
        },
        {
          "net": "v",
          "equation": "B'",
          "level": 1,
          "type": "Inverter on B"
        },
        {
          "net": "p",
          "equation": "(A'B')'",
          "level": 2,
          "type": "First Product Term"
        },
        {
          "net": "q",
          "equation": "(AB)'",
          "level": 2,
          "type": "Second Product Term"
        },
        {
          "net": "F",
          "equation": "A'B' + AB",
          "level": 3,
          "type": "Output Equivalence"
        }
      ],
      "truthTable": [
        {
          "A": 0,
          "B": 0,
          "F": 1
        },
        {
          "A": 0,
          "B": 1,
          "F": 0
        },
        {
          "A": 1,
          "B": 0,
          "F": 0
        },
        {
          "A": 1,
          "B": 1,
          "F": 1
        }
      ],
      "interpretation": "Standard SOP synthesis of XNOR requires 5 NAND gates and 3 logic levels when primary inputs are uncomplemented.",
      "finalAnswer": "F = A'B' + AB synthesized with 5 NAND gates in 3 logic levels.",
      "circuit": {
        "width": 500,
        "height": 150,
        "inputs": [
          {
            "id": "A",
            "label": "A",
            "x": 25,
            "y": 45
          },
          {
            "id": "B",
            "label": "B",
            "x": 25,
            "y": 95
          }
        ],
        "gates": [
          {
            "id": "G1",
            "type": "NAND",
            "x": 75,
            "y": 15,
            "label": "G1",
            "level": 1
          },
          {
            "id": "G2",
            "type": "NAND",
            "x": 75,
            "y": 95,
            "label": "G2",
            "level": 1
          },
          {
            "id": "G3",
            "type": "NAND",
            "x": 205,
            "y": 30,
            "label": "G3",
            "level": 2
          },
          {
            "id": "G4",
            "type": "NAND",
            "x": 205,
            "y": 90,
            "label": "G4",
            "level": 2
          },
          {
            "id": "G5",
            "type": "NAND",
            "x": 335,
            "y": 60,
            "label": "G5",
            "level": 3
          }
        ],
        "wires": [
          {
            "id": "w1",
            "from": "A",
            "to": "j1",
            "d": "M 25 45 L 45 45",
            "net": "A"
          },
          {
            "id": "w2",
            "from": "j1",
            "to": "G1.in1",
            "d": "M 45 45 L 45 23 L 75 23",
            "net": "A"
          },
          {
            "id": "w3",
            "from": "j1",
            "to": "G1.in2",
            "d": "M 45 45 L 45 37 L 75 37",
            "net": "A"
          },
          {
            "id": "w4",
            "from": "j1",
            "to": "G4.in1",
            "d": "M 45 45 L 45 70 L 175 70 L 175 98 L 205 98",
            "net": "A"
          },
          {
            "id": "w5",
            "from": "B",
            "to": "j2",
            "d": "M 25 95 L 45 95",
            "net": "B"
          },
          {
            "id": "w6",
            "from": "j2",
            "to": "G2.in1",
            "d": "M 45 95 L 45 103 L 75 103",
            "net": "B"
          },
          {
            "id": "w7",
            "from": "j2",
            "to": "G2.in2",
            "d": "M 45 95 L 45 117 L 75 117",
            "net": "B"
          },
          {
            "id": "w8",
            "from": "j2",
            "to": "G4.in2",
            "d": "M 45 95 L 45 135 L 185 135 L 185 112 L 205 112",
            "net": "B"
          },
          {
            "id": "w9",
            "from": "G1.out",
            "to": "G3.in1",
            "d": "M 118 30 L 155 30 L 155 38 L 205 38",
            "net": "u"
          },
          {
            "id": "w10",
            "from": "G2.out",
            "to": "G3.in2",
            "d": "M 118 110 L 165 110 L 165 52 L 205 52",
            "net": "v"
          },
          {
            "id": "w11",
            "from": "G3.out",
            "to": "G5.in1",
            "d": "M 248 45 L 290 45 L 290 68 L 335 68",
            "net": "p"
          },
          {
            "id": "w12",
            "from": "G4.out",
            "to": "G5.in2",
            "d": "M 248 105 L 290 105 L 290 82 L 335 82",
            "net": "q"
          },
          {
            "id": "w13",
            "from": "G5.out",
            "to": "F",
            "d": "M 378 75 L 430 75",
            "net": "F"
          }
        ],
        "junctions": [
          {
            "x": 45,
            "y": 45,
            "r": 3.5
          },
          {
            "x": 45,
            "y": 95,
            "r": 3.5
          }
        ],
        "labels": [
          {
            "text": "u = A'",
            "x": 134,
            "y": 22
          },
          {
            "text": "v = B'",
            "x": 134,
            "y": 122
          },
          {
            "text": "p = (A'B')'",
            "x": 264,
            "y": 38
          },
          {
            "text": "q = (AB)'",
            "x": 255,
            "y": 118
          }
        ],
        "output": {
          "label": "F = A'B' + AB",
          "x": 435,
          "y": 75
        }
      }
    },
    {
      "id": "WE-04",
      "number": "Model 37",
      "title": "POS Expression with Complemented Input using NOR Only",
      "category": "NOR",
      "givenExpression": "F(A,B,C) = (A' + B)(A + C)",
      "problemStatement": "Synthesize the product-of-sums function F(A,B,C) = (A' + B)(A + C) using minimum 2-input NOR gates alone from uncomplemented inputs.",
      "requiredRealisation": "NOR Only",
      "gateCount": 4,
      "logicLevels": 3,
      "derivationSteps": [
        "Apply double involution: F = (( (A' + B)(A + C) )'')'.",
        "Apply De Morgan's theorem: [ (A' + B)(A + C) ]' = (A' + B)' + (A + C)'.",
        "Synthesize an inverter for literal A: u = NOR(A, A) = A' (Level 1).",
        "Synthesize sum gates: p = NOR(u, B) = (A' + B)' and q = NOR(A, C) = (A + C)' (Level 2).",
        "Combine p and q in the final output NOR gate: F = NOR(p, q) = (p + q)' = (A' + B)(A + C) (Level 3)."
      ],
      "intermediateNodes": [
        {
          "net": "u",
          "equation": "A' = (A+A)'",
          "level": 1,
          "type": "Primary Input Inverter"
        },
        {
          "net": "p",
          "equation": "(A' + B)'",
          "level": 2,
          "type": "First Sum Term"
        },
        {
          "net": "q",
          "equation": "(A + C)'",
          "level": 2,
          "type": "Second Sum Term"
        },
        {
          "net": "F",
          "equation": "(A' + B)(A + C)",
          "level": 3,
          "type": "Final Output Product"
        }
      ],
      "truthTable": [
        {
          "A": 0,
          "B": 0,
          "C": 0,
          "F": 0
        },
        {
          "A": 0,
          "B": 0,
          "C": 1,
          "F": 1
        },
        {
          "A": 0,
          "B": 1,
          "C": 0,
          "F": 0
        },
        {
          "A": 0,
          "B": 1,
          "C": 1,
          "F": 1
        },
        {
          "A": 1,
          "B": 0,
          "C": 0,
          "F": 0
        },
        {
          "A": 1,
          "B": 0,
          "C": 1,
          "F": 0
        },
        {
          "A": 1,
          "B": 1,
          "C": 0,
          "F": 1
        },
        {
          "A": 1,
          "B": 1,
          "C": 1,
          "F": 1
        }
      ],
      "interpretation": "Because input A feeds both an inverter at Level 1 and a sum gate at Level 2, the total logic depth is 3 levels.",
      "finalAnswer": "F = [ (A' + B)' + (A + C)' ]' = (A' + B)(A + C) synthesized with 4 NOR gates in 3 logic levels.",
      "circuit": {
        "width": 480,
        "height": 140,
        "inputs": [
          {
            "id": "A",
            "label": "A",
            "x": 25,
            "y": 25
          },
          {
            "id": "B",
            "label": "B",
            "x": 25,
            "y": 60
          },
          {
            "id": "C",
            "label": "C",
            "x": 25,
            "y": 105
          }
        ],
        "gates": [
          {
            "id": "R1",
            "type": "NOR",
            "x": 75,
            "y": 10,
            "label": "R1",
            "level": 1
          },
          {
            "id": "R2",
            "type": "NOR",
            "x": 195,
            "y": 20,
            "label": "R2",
            "level": 2
          },
          {
            "id": "R3",
            "type": "NOR",
            "x": 195,
            "y": 80,
            "label": "R3",
            "level": 2
          },
          {
            "id": "R4",
            "type": "NOR",
            "x": 325,
            "y": 50,
            "label": "R4",
            "level": 3
          }
        ],
        "wires": [
          {
            "id": "w1",
            "from": "A",
            "to": "jA",
            "d": "M 25 25 L 35 25",
            "net": "A"
          },
          {
            "id": "w2",
            "from": "jA",
            "to": "j1",
            "d": "M 35 25 L 55 25",
            "net": "A"
          },
          {
            "id": "w3",
            "from": "j1",
            "to": "R1.in1",
            "d": "M 55 25 L 55 18 L 75 18",
            "net": "A"
          },
          {
            "id": "w4",
            "from": "j1",
            "to": "R1.in2",
            "d": "M 55 25 L 55 32 L 75 32",
            "net": "A"
          },
          {
            "id": "w5",
            "from": "jA",
            "to": "R3.in1",
            "d": "M 35 25 L 35 88 L 195 88",
            "net": "A"
          },
          {
            "id": "w6",
            "from": "R1.out",
            "to": "R2.in1",
            "d": "M 118 25 L 145 25 L 145 28 L 195 28",
            "net": "u"
          },
          {
            "id": "w7",
            "from": "B",
            "to": "R2.in2",
            "d": "M 25 60 L 165 60 L 165 42 L 195 42",
            "net": "B"
          },
          {
            "id": "w8",
            "from": "C",
            "to": "R3.in2",
            "d": "M 25 105 L 175 105 L 175 102 L 195 102",
            "net": "C"
          },
          {
            "id": "w9",
            "from": "R2.out",
            "to": "R4.in1",
            "d": "M 238 35 L 275 35 L 275 58 L 325 58",
            "net": "p"
          },
          {
            "id": "w10",
            "from": "R3.out",
            "to": "R4.in2",
            "d": "M 238 95 L 285 95 L 285 72 L 325 72",
            "net": "q"
          },
          {
            "id": "w11",
            "from": "R4.out",
            "to": "F",
            "d": "M 368 65 L 420 65",
            "net": "(A'+B)(A+C)"
          }
        ],
        "junctions": [
          {
            "id": "jA",
            "x": 35,
            "y": 25,
            "r": 3.5
          },
          {
            "id": "j1",
            "x": 55,
            "y": 25,
            "r": 3.5
          }
        ],
        "labels": [
          {
            "text": "u = A'",
            "x": 131,
            "y": 18
          },
          {
            "text": "p = (A'+B)'",
            "x": 251,
            "y": 28
          },
          {
            "text": "q = (A+C)'",
            "x": 245,
            "y": 108
          }
        ],
        "output": {
          "label": "F = (A'+B)(A+C)",
          "x": 425,
          "y": 65
        }
      }
    },
    {
      "id": "WE-05",
      "number": "Model 38",
      "title": "Degenerate SOP Term Synthesis with Single NAND Inverter",
      "category": "NAND",
      "givenExpression": "F(A,B,C) = A' + BC",
      "problemStatement": "Synthesize the Boolean function F(A,B,C) = A' + BC using minimum 2-input NAND gates alone from uncomplemented inputs.",
      "requiredRealisation": "NAND Only",
      "gateCount": 2,
      "logicLevels": 2,
      "derivationSteps": [
        "Express F by double inversion: F = ((A' + BC)'')'.",
        "Apply De Morgan's theorem: (A' + BC)' = A'' · (BC)' = A · (BC)'.",
        "Therefore: F = (A · (BC)')'.",
        "Gate 1 computes p = NAND(B, C) = (BC)' (Level 1).",
        "Gate 2 computes F = NAND(A, p) = (A · (BC)')' = A' + BC (Level 2)."
      ],
      "intermediateNodes": [
        {
          "net": "p",
          "equation": "(BC)'",
          "level": 1,
          "type": "Product Term NAND"
        },
        {
          "net": "F",
          "equation": "A' + BC",
          "level": 2,
          "type": "Output NAND"
        }
      ],
      "truthTable": [
        {
          "A": 0,
          "B": 0,
          "C": 0,
          "F": 1
        },
        {
          "A": 0,
          "B": 0,
          "C": 1,
          "F": 1
        },
        {
          "A": 0,
          "B": 1,
          "C": 0,
          "F": 1
        },
        {
          "A": 0,
          "B": 1,
          "C": 1,
          "F": 1
        },
        {
          "A": 1,
          "B": 0,
          "C": 0,
          "F": 0
        },
        {
          "A": 1,
          "B": 0,
          "C": 1,
          "F": 0
        },
        {
          "A": 1,
          "B": 1,
          "C": 0,
          "F": 0
        },
        {
          "A": 1,
          "B": 1,
          "C": 1,
          "F": 1
        }
      ],
      "interpretation": "Because A appears complemented in the SOP sum, De Morgan dualization allows A to enter the output NAND gate directly without a preliminary inverter, achieving complete implementation in only 2 NAND gates and 2 levels.",
      "finalAnswer": "F = (A · (BC)')' = A' + BC synthesized with exactly 2 NAND gates in 2 logic levels.",
      "circuit": {
        "width": 420,
        "height": 120,
        "inputs": [
          {
            "id": "A",
            "label": "A",
            "x": 25,
            "y": 72
          },
          {
            "id": "B",
            "label": "B",
            "x": 25,
            "y": 28
          },
          {
            "id": "C",
            "label": "C",
            "x": 25,
            "y": 42
          }
        ],
        "gates": [
          {
            "id": "G1",
            "type": "NAND",
            "x": 90,
            "y": 20,
            "label": "G1",
            "level": 1
          },
          {
            "id": "G2",
            "type": "NAND",
            "x": 230,
            "y": 50,
            "label": "G2",
            "level": 2
          }
        ],
        "wires": [
          {
            "id": "w1",
            "from": "B",
            "to": "G1.in1",
            "d": "M 25 28 L 90 28",
            "net": "B"
          },
          {
            "id": "w2",
            "from": "C",
            "to": "G1.in2",
            "d": "M 25 42 L 90 42",
            "net": "C"
          },
          {
            "id": "w3",
            "from": "G1.out",
            "to": "G2.in1",
            "d": "M 133 35 L 180 35 L 180 58 L 230 58",
            "net": "p"
          },
          {
            "id": "w4",
            "from": "A",
            "to": "G2.in2",
            "d": "M 25 72 L 230 72",
            "net": "A"
          },
          {
            "id": "w5",
            "from": "G2.out",
            "to": "F",
            "d": "M 273 65 L 340 65",
            "net": "F"
          }
        ],
        "junctions": [],
        "labels": [
          {
            "text": "p = (BC)'",
            "x": 149,
            "y": 28
          }
        ],
        "output": {
          "label": "F = A' + BC",
          "x": 350,
          "y": 65
        }
      }
    },
    {
      "id": "WE-06",
      "number": "Model 39",
      "title": "Factored POS to SOP Conversion for NAND Synthesis",
      "category": "NAND",
      "givenExpression": "F(A,B,C) = (A + B)(B + C) = B + AC",
      "problemStatement": "Convert the factored product of sums F = (A + B)(B + C) into sum of products and synthesize using minimum NAND gates.",
      "requiredRealisation": "NAND Only",
      "gateCount": 3,
      "logicLevels": 2,
      "derivationSteps": [
        "Expand using Boolean distributivity: (A + B)(B + C) = B + AC.",
        "Apply double inversion: F = ((B + AC)'')' = (B' · (AC)')'.",
        "Gate 1 computes p = NAND(A, C) = (AC)' (Level 1).",
        "Gate 2 inverts B: v = NAND(B, B) = B' (Level 1).",
        "Gate 3 combines v and p: F = NAND(v, p) = (B' · (AC)')' = B + AC (Level 2)."
      ],
      "intermediateNodes": [
        {
          "net": "p",
          "equation": "(AC)'",
          "level": 1,
          "type": "NAND product"
        },
        {
          "net": "v",
          "equation": "B'",
          "level": 1,
          "type": "Inverter on B"
        },
        {
          "net": "F",
          "equation": "B + AC",
          "level": 2,
          "type": "Output NAND"
        }
      ],
      "truthTable": [
        {
          "A": 0,
          "B": 0,
          "C": 0,
          "F": 0
        },
        {
          "A": 0,
          "B": 0,
          "C": 1,
          "F": 0
        },
        {
          "A": 0,
          "B": 1,
          "C": 0,
          "F": 1
        },
        {
          "A": 0,
          "B": 1,
          "C": 1,
          "F": 1
        },
        {
          "A": 1,
          "B": 0,
          "C": 0,
          "F": 0
        },
        {
          "A": 1,
          "B": 0,
          "C": 1,
          "F": 1
        },
        {
          "A": 1,
          "B": 1,
          "C": 0,
          "F": 1
        },
        {
          "A": 1,
          "B": 1,
          "C": 1,
          "F": 1
        }
      ],
      "interpretation": "Expanding the POS expression to B + AC enables a 3-gate, 2-level NAND synthesis, saving both gates and delay compared to brute-force conversion.",
      "finalAnswer": "F = (B' · (AC)')' = B + AC synthesized with 3 NAND gates in 2 logic levels.",
      "circuit": {
        "width": 460,
        "height": 130,
        "inputs": [
          {
            "id": "A",
            "label": "A",
            "x": 25,
            "y": 28
          },
          {
            "id": "C",
            "label": "C",
            "x": 25,
            "y": 42
          },
          {
            "id": "B",
            "label": "B",
            "x": 25,
            "y": 95
          }
        ],
        "gates": [
          {
            "id": "G1",
            "type": "NAND",
            "x": 90,
            "y": 20,
            "label": "G1",
            "level": 1
          },
          {
            "id": "G2",
            "type": "NAND",
            "x": 90,
            "y": 80,
            "label": "G2",
            "level": 1
          },
          {
            "id": "G3",
            "type": "NAND",
            "x": 230,
            "y": 50,
            "label": "G3",
            "level": 2
          }
        ],
        "wires": [
          {
            "id": "w1",
            "from": "A",
            "to": "G1.in1",
            "d": "M 25 28 L 90 28",
            "net": "A"
          },
          {
            "id": "w2",
            "from": "C",
            "to": "G1.in2",
            "d": "M 25 42 L 90 42",
            "net": "C"
          },
          {
            "id": "w3",
            "from": "B",
            "to": "j1",
            "d": "M 25 95 L 55 95",
            "net": "B"
          },
          {
            "id": "w4",
            "from": "j1",
            "to": "G2.in1",
            "d": "M 55 95 L 55 88 L 90 88",
            "net": "B"
          },
          {
            "id": "w5",
            "from": "j1",
            "to": "G2.in2",
            "d": "M 55 95 L 55 102 L 90 102",
            "net": "B"
          },
          {
            "id": "w6",
            "from": "G1.out",
            "to": "G3.in1",
            "d": "M 133 35 L 180 35 L 180 58 L 230 58",
            "net": "p"
          },
          {
            "id": "w7",
            "from": "G2.out",
            "to": "G3.in2",
            "d": "M 133 95 L 180 95 L 180 72 L 230 72",
            "net": "v"
          },
          {
            "id": "w8",
            "from": "G3.out",
            "to": "F",
            "d": "M 273 65 L 360 65",
            "net": "F"
          }
        ],
        "junctions": [
          {
            "x": 55,
            "y": 95,
            "r": 3.5
          }
        ],
        "labels": [
          {
            "text": "p = (AC)'",
            "x": 149,
            "y": 28
          },
          {
            "text": "v = B'",
            "x": 140,
            "y": 108
          }
        ],
        "output": {
          "label": "F = B + AC",
          "x": 370,
          "y": 65
        }
      }
    },
    {
      "id": "WE-07",
      "number": "Model 40",
      "title": "Factored SOP to POS Conversion for NOR Synthesis",
      "category": "NOR",
      "givenExpression": "F(A,B,C) = A'B + A'C = A'(B + C)",
      "problemStatement": "Factor the expression F = A'B + A'C and synthesize using minimum 2-input NOR gates alone from uncomplemented inputs.",
      "requiredRealisation": "NOR Only",
      "gateCount": 2,
      "logicLevels": 2,
      "derivationSteps": [
        "Factor out common literal A': F = A'(B + C).",
        "Apply double inversion: F = ((A'(B + C))'')' = (A'' + (B + C)')' = (A + (B + C)')'.",
        "Gate 1 computes p = NOR(B, C) = (B + C)' (Level 1).",
        "Gate 2 computes F = NOR(A, p) = (A + (B + C)')' = A'(B + C) (Level 2)."
      ],
      "intermediateNodes": [
        {
          "net": "p",
          "equation": "(B + C)'",
          "level": 1,
          "type": "NOR on B, C"
        },
        {
          "net": "F",
          "equation": "A'(B + C)",
          "level": 2,
          "type": "Output NOR"
        }
      ],
      "truthTable": [
        {
          "A": 0,
          "B": 0,
          "C": 0,
          "F": 0
        },
        {
          "A": 0,
          "B": 0,
          "C": 1,
          "F": 1
        },
        {
          "A": 0,
          "B": 1,
          "C": 0,
          "F": 1
        },
        {
          "A": 0,
          "B": 1,
          "C": 1,
          "F": 1
        },
        {
          "A": 1,
          "B": 0,
          "C": 0,
          "F": 0
        },
        {
          "A": 1,
          "B": 0,
          "C": 1,
          "F": 0
        },
        {
          "A": 1,
          "B": 1,
          "C": 0,
          "F": 0
        },
        {
          "A": 1,
          "B": 1,
          "C": 1,
          "F": 0
        }
      ],
      "interpretation": "Factoring allows input A to enter NOR Gate 2 directly uncomplemented, implementing the entire function in just 2 NOR gates and 2 levels.",
      "finalAnswer": "F = (A + (B + C)')' = A'(B + C) synthesized with 2 NOR gates in 2 logic levels.",
      "circuit": {
        "width": 420,
        "height": 120,
        "inputs": [
          {
            "id": "A",
            "label": "A",
            "x": 25,
            "y": 72
          },
          {
            "id": "B",
            "label": "B",
            "x": 25,
            "y": 28
          },
          {
            "id": "C",
            "label": "C",
            "x": 25,
            "y": 42
          }
        ],
        "gates": [
          {
            "id": "R1",
            "type": "NOR",
            "x": 90,
            "y": 20,
            "label": "R1",
            "level": 1
          },
          {
            "id": "R2",
            "type": "NOR",
            "x": 230,
            "y": 50,
            "label": "R2",
            "level": 2
          }
        ],
        "wires": [
          {
            "id": "w1",
            "from": "B",
            "to": "R1.in1",
            "d": "M 25 28 L 90 28",
            "net": "B"
          },
          {
            "id": "w2",
            "from": "C",
            "to": "R1.in2",
            "d": "M 25 42 L 90 42",
            "net": "C"
          },
          {
            "id": "w3",
            "from": "R1.out",
            "to": "R2.in1",
            "d": "M 130 35 L 180 35 L 180 58 L 230 58",
            "net": "p"
          },
          {
            "id": "w4",
            "from": "A",
            "to": "R2.in2",
            "d": "M 25 72 L 230 72",
            "net": "A"
          },
          {
            "id": "w5",
            "from": "R2.out",
            "to": "F",
            "d": "M 270 65 L 340 65",
            "net": "F"
          }
        ],
        "junctions": [],
        "labels": [
          {
            "text": "p = (B+C)'",
            "x": 146,
            "y": 28
          }
        ],
        "output": {
          "label": "F = A'(B + C)",
          "x": 350,
          "y": 65
        }
      }
    },
    {
      "id": "WE-08",
      "number": "Model 41",
      "title": "Mixed NAND-NOR Synthesis of Inverted Compound Logic",
      "category": "Mixed",
      "givenExpression": "F(A,B,C) = A(B + C)'",
      "problemStatement": "Synthesize F = A(B + C)' using a mixed library of 2-input NAND and NOR gates to achieve minimum gate count.",
      "requiredRealisation": "Mixed",
      "gateCount": 3,
      "logicLevels": 3,
      "derivationSteps": [
        "Gate 1 (NOR) directly computes p = NOR(B, C) = (B + C)' (Level 1).",
        "Gate 2 (NAND) computes q = NAND(A, p) = (A · (B + C)')' (Level 2).",
        "Gate 3 (NAND inverter) inverts q: F = NAND(q, q) = A(B + C)' (Level 3)."
      ],
      "intermediateNodes": [
        {
          "net": "p",
          "equation": "(B + C)'",
          "level": 1,
          "type": "NOR intermediate"
        },
        {
          "net": "q",
          "equation": "(A·p)'",
          "level": 2,
          "type": "NAND product"
        },
        {
          "net": "F",
          "equation": "A(B + C)'",
          "level": 3,
          "type": "Output inverter"
        }
      ],
      "truthTable": [
        {
          "A": 0,
          "B": 0,
          "C": 0,
          "F": 0
        },
        {
          "A": 0,
          "B": 0,
          "C": 1,
          "F": 0
        },
        {
          "A": 0,
          "B": 1,
          "C": 0,
          "F": 0
        },
        {
          "A": 0,
          "B": 1,
          "C": 1,
          "F": 0
        },
        {
          "A": 1,
          "B": 0,
          "C": 0,
          "F": 1
        },
        {
          "A": 1,
          "B": 0,
          "C": 1,
          "F": 0
        },
        {
          "A": 1,
          "B": 1,
          "C": 0,
          "F": 0
        },
        {
          "A": 1,
          "B": 1,
          "C": 1,
          "F": 0
        }
      ],
      "interpretation": "Using NOR for the sum term and NAND for the conjunction eliminates De Morgan conversion overhead, using 3 gates.",
      "finalAnswer": "F = A(B + C)' synthesized with 1 NOR and 2 NAND gates in 3 logic levels.",
      "circuit": {
        "width": 480,
        "height": 130,
        "inputs": [
          {
            "id": "A",
            "label": "A",
            "x": 25,
            "y": 75
          },
          {
            "id": "B",
            "label": "B",
            "x": 25,
            "y": 25
          },
          {
            "id": "C",
            "label": "C",
            "x": 25,
            "y": 40
          }
        ],
        "gates": [
          {
            "id": "R1",
            "type": "NOR",
            "x": 90,
            "y": 20,
            "label": "R1",
            "level": 1
          },
          {
            "id": "N1",
            "type": "NAND",
            "x": 210,
            "y": 45,
            "label": "N1",
            "level": 2
          },
          {
            "id": "N2",
            "type": "NAND",
            "x": 330,
            "y": 45,
            "label": "N2",
            "level": 3
          }
        ],
        "wires": [
          {
            "id": "w1",
            "from": "B",
            "to": "R1.in1",
            "d": "M 25 25 L 90 28",
            "net": "B"
          },
          {
            "id": "w2",
            "from": "C",
            "to": "R1.in2",
            "d": "M 25 40 L 90 42",
            "net": "C"
          },
          {
            "id": "w3",
            "from": "R1.out",
            "to": "N1.in1",
            "d": "M 130 35 L 170 35 L 170 53 L 210 53",
            "net": "p"
          },
          {
            "id": "w4",
            "from": "A",
            "to": "N1.in2",
            "d": "M 25 75 L 170 75 L 170 67 L 210 67",
            "net": "A"
          },
          {
            "id": "w5",
            "from": "N1.out",
            "to": "j1",
            "d": "M 253 60 L 290 60",
            "net": "q"
          },
          {
            "id": "w6",
            "from": "j1",
            "to": "N2.in1",
            "d": "M 290 60 L 290 53 L 330 53",
            "net": "q"
          },
          {
            "id": "w7",
            "from": "j1",
            "to": "N2.in2",
            "d": "M 290 60 L 290 67 L 330 67",
            "net": "q"
          },
          {
            "id": "w8",
            "from": "N2.out",
            "to": "F",
            "d": "M 373 60 L 420 60",
            "net": "F"
          }
        ],
        "junctions": [
          {
            "x": 290,
            "y": 60,
            "r": 3.5
          }
        ],
        "labels": [
          {
            "text": "p = (B+C)'",
            "x": 146,
            "y": 28
          },
          {
            "text": "q = (A·p)'",
            "x": 269,
            "y": 45
          }
        ],
        "output": {
          "label": "F = A(B+C)'",
          "x": 425,
          "y": 60
        }
      }
    },
    {
      "id": "WE-09",
      "number": "Model 42",
      "title": "Multi-Level Factorized NAND Network",
      "category": "Multi-Level",
      "givenExpression": "F(A,B,C,D) = (AB + C)D",
      "problemStatement": "Synthesize the 4-variable factored expression F = (AB + C)D as a 4-level NAND network from uncomplemented primary inputs.",
      "requiredRealisation": "NAND Only",
      "gateCount": 5,
      "logicLevels": 4,
      "derivationSteps": [
        "Level 1: G1 computes p = (AB)'.",
        "Level 1: Gc inverts C to c = C'.",
        "Level 2: G2 combines p and c: q = (p · c)' = AB + C.",
        "Level 3: G3 combines q and D: r = (q · D)' = ((AB + C)D)'.",
        "Level 4: G4 inverts r: F = (r · r)' = (AB + C)D."
      ],
      "intermediateNodes": [
        {
          "net": "p",
          "equation": "(AB)'",
          "level": 1,
          "type": "NAND on A, B"
        },
        {
          "net": "c",
          "equation": "C'",
          "level": 1,
          "type": "Inverter on C"
        },
        {
          "net": "q",
          "equation": "AB + C",
          "level": 2,
          "type": "Sub-expression Sum"
        },
        {
          "net": "r",
          "equation": "((AB + C)D)'",
          "level": 3,
          "type": "Product with D"
        },
        {
          "net": "F",
          "equation": "(AB + C)D",
          "level": 4,
          "type": "Final Output"
        }
      ],
      "truthTable": [
        {
          "A": 0,
          "B": 0,
          "C": 0,
          "D": 0,
          "F": 0
        },
        {
          "A": 0,
          "B": 0,
          "C": 0,
          "D": 1,
          "F": 0
        },
        {
          "A": 0,
          "B": 0,
          "C": 1,
          "D": 0,
          "F": 0
        },
        {
          "A": 0,
          "B": 0,
          "C": 1,
          "D": 1,
          "F": 1
        },
        {
          "A": 0,
          "B": 1,
          "C": 0,
          "D": 0,
          "F": 0
        },
        {
          "A": 0,
          "B": 1,
          "C": 0,
          "D": 1,
          "F": 0
        },
        {
          "A": 0,
          "B": 1,
          "C": 1,
          "D": 0,
          "F": 0
        },
        {
          "A": 0,
          "B": 1,
          "C": 1,
          "D": 1,
          "F": 1
        },
        {
          "A": 1,
          "B": 0,
          "C": 0,
          "D": 0,
          "F": 0
        },
        {
          "A": 1,
          "B": 0,
          "C": 0,
          "D": 1,
          "F": 0
        },
        {
          "A": 1,
          "B": 0,
          "C": 1,
          "D": 0,
          "F": 0
        },
        {
          "A": 1,
          "B": 0,
          "C": 1,
          "D": 1,
          "F": 1
        },
        {
          "A": 1,
          "B": 1,
          "C": 0,
          "D": 0,
          "F": 0
        },
        {
          "A": 1,
          "B": 1,
          "C": 0,
          "D": 1,
          "F": 1
        },
        {
          "A": 1,
          "B": 1,
          "C": 1,
          "D": 0,
          "F": 0
        },
        {
          "A": 1,
          "B": 1,
          "C": 1,
          "D": 1,
          "F": 1
        }
      ],
      "interpretation": "Factored multi-level logic reduces total gate input fan-in from 3 to 2, yielding a 4-level, 5-gate pipeline.",
      "finalAnswer": "F = (AB + C)D synthesized with 5 NAND gates in 4 logic levels.",
      "circuit": {
        "width": 520,
        "height": 150,
        "inputs": [
          {
            "id": "A",
            "label": "A",
            "x": 25,
            "y": 28
          },
          {
            "id": "B",
            "label": "B",
            "x": 25,
            "y": 42
          },
          {
            "id": "C",
            "label": "C",
            "x": 25,
            "y": 95
          },
          {
            "id": "D",
            "label": "D",
            "x": 25,
            "y": 130
          }
        ],
        "gates": [
          {
            "id": "G1",
            "type": "NAND",
            "x": 75,
            "y": 20,
            "label": "G1",
            "level": 1,
            "stage": 1
          },
          {
            "id": "Gc",
            "type": "NAND",
            "x": 75,
            "y": 80,
            "label": "Gc",
            "level": 1,
            "stage": 2
          },
          {
            "id": "G2",
            "type": "NAND",
            "x": 185,
            "y": 45,
            "label": "G2",
            "level": 2,
            "stage": 2
          },
          {
            "id": "G3",
            "type": "NAND",
            "x": 295,
            "y": 45,
            "label": "G3",
            "level": 3,
            "stage": 3
          },
          {
            "id": "G4",
            "type": "NAND",
            "x": 395,
            "y": 45,
            "label": "G4",
            "level": 4,
            "stage": 4
          }
        ],
        "wires": [
          {
            "id": "w1",
            "from": "A",
            "to": "G1.in1",
            "d": "M 25 28 L 75 28",
            "net": "A",
            "stage": 1
          },
          {
            "id": "w2",
            "from": "B",
            "to": "G1.in2",
            "d": "M 25 42 L 75 42",
            "net": "B",
            "stage": 1
          },
          {
            "id": "w3",
            "from": "C",
            "to": "j1",
            "d": "M 25 95 L 50 95",
            "net": "C",
            "stage": 2
          },
          {
            "id": "w4",
            "from": "j1",
            "to": "Gc.in1",
            "d": "M 50 95 L 50 88 L 75 88",
            "net": "C",
            "stage": 2
          },
          {
            "id": "w5",
            "from": "j1",
            "to": "Gc.in2",
            "d": "M 50 95 L 50 102 L 75 102",
            "net": "C",
            "stage": 2
          },
          {
            "id": "w6",
            "from": "G1.out",
            "to": "G2.in1",
            "d": "M 118 35 L 150 35 L 150 53 L 185 53",
            "net": "p",
            "stage": 2
          },
          {
            "id": "w7",
            "from": "Gc.out",
            "to": "G2.in2",
            "d": "M 118 95 L 150 95 L 150 67 L 185 67",
            "net": "c",
            "stage": 2
          },
          {
            "id": "w8",
            "from": "G2.out",
            "to": "G3.in1",
            "d": "M 228 60 L 295 53",
            "net": "q",
            "stage": 3
          },
          {
            "id": "w9",
            "from": "D",
            "to": "G3.in2",
            "d": "M 25 130 L 260 130 L 260 67 L 295 67",
            "net": "D",
            "stage": 3
          },
          {
            "id": "w10",
            "from": "G3.out",
            "to": "j2",
            "d": "M 338 60 L 365 60",
            "net": "r",
            "stage": 4
          },
          {
            "id": "w11",
            "from": "j2",
            "to": "G4.in1",
            "d": "M 365 60 L 365 53 L 395 53",
            "net": "r",
            "stage": 4
          },
          {
            "id": "w12",
            "from": "j2",
            "to": "G4.in2",
            "d": "M 365 60 L 365 67 L 395 67",
            "net": "r",
            "stage": 4
          },
          {
            "id": "w13",
            "from": "G4.out",
            "to": "F",
            "d": "M 438 60 L 470 60",
            "net": "F",
            "stage": 4
          }
        ],
        "junctions": [
          {
            "x": 50,
            "y": 95,
            "r": 3.5,
            "stage": 2
          },
          {
            "x": 365,
            "y": 60,
            "r": 3.5,
            "stage": 4
          }
        ],
        "labels": [
          {
            "text": "p=(AB)'",
            "x": 134,
            "y": 28,
            "stage": 1
          },
          {
            "text": "q=AB+C",
            "x": 235,
            "y": 45,
            "stage": 2
          },
          {
            "text": "r=((AB+C)D)'",
            "x": 354,
            "y": 45,
            "stage": 3
          }
        ],
        "output": {
          "label": "F = (AB + C)D",
          "x": 475,
          "y": 60,
          "stage": 4
        }
      }
    },
    {
      "id": "WE-10",
      "number": "Model 43",
      "title": "Multi-Level Factorized NOR Network",
      "category": "Multi-Level",
      "givenExpression": "F(A,B,C,D) = (A + B)C + D",
      "problemStatement": "Synthesize the 4-variable factored expression F = (A + B)C + D as a 4-level NOR network from uncomplemented primary inputs.",
      "requiredRealisation": "NOR Only",
      "gateCount": 5,
      "logicLevels": 4,
      "derivationSteps": [
        "Level 1: R1 computes p = (A + B)'.",
        "Level 1: Rc inverts C to c = C'.",
        "Level 2: R2 combines p and c: q = (p + c)' = (A + B)C.",
        "Level 3: R3 combines q and D: s = (q + D)' = [(A + B)C + D]'.",
        "Level 4: R4 inverts s: F = (s + s)' = (A + B)C + D."
      ],
      "intermediateNodes": [
        {
          "net": "p",
          "equation": "(A + B)'",
          "level": 1,
          "type": "NOR on A, B"
        },
        {
          "net": "c",
          "equation": "C'",
          "level": 1,
          "type": "Inverter on C"
        },
        {
          "net": "q",
          "equation": "(A + B)C",
          "level": 2,
          "type": "Sub-expression Product"
        },
        {
          "net": "s",
          "equation": "[(A + B)C + D]'",
          "level": 3,
          "type": "Sum with D"
        },
        {
          "net": "F",
          "equation": "(A + B)C + D",
          "level": 4,
          "type": "Final Output"
        }
      ],
      "truthTable": [
        {
          "A": 0,
          "B": 0,
          "C": 0,
          "D": 0,
          "F": 0
        },
        {
          "A": 0,
          "B": 0,
          "C": 0,
          "D": 1,
          "F": 1
        },
        {
          "A": 0,
          "B": 0,
          "C": 1,
          "D": 0,
          "F": 0
        },
        {
          "A": 0,
          "B": 0,
          "C": 1,
          "D": 1,
          "F": 1
        },
        {
          "A": 0,
          "B": 1,
          "C": 0,
          "D": 0,
          "F": 0
        },
        {
          "A": 0,
          "B": 1,
          "C": 0,
          "D": 1,
          "F": 1
        },
        {
          "A": 0,
          "B": 1,
          "C": 1,
          "D": 0,
          "F": 1
        },
        {
          "A": 0,
          "B": 1,
          "C": 1,
          "D": 1,
          "F": 1
        },
        {
          "A": 1,
          "B": 0,
          "C": 0,
          "D": 0,
          "F": 0
        },
        {
          "A": 1,
          "B": 0,
          "C": 0,
          "D": 1,
          "F": 1
        },
        {
          "A": 1,
          "B": 0,
          "C": 1,
          "D": 0,
          "F": 1
        },
        {
          "A": 1,
          "B": 0,
          "C": 1,
          "D": 1,
          "F": 1
        },
        {
          "A": 1,
          "B": 1,
          "C": 0,
          "D": 0,
          "F": 0
        },
        {
          "A": 1,
          "B": 1,
          "C": 0,
          "D": 1,
          "F": 1
        },
        {
          "A": 1,
          "B": 1,
          "C": 1,
          "D": 0,
          "F": 1
        },
        {
          "A": 1,
          "B": 1,
          "C": 1,
          "D": 1,
          "F": 1
        }
      ],
      "interpretation": "The dual of the multi-level NAND circuit, this 5-gate NOR network computes compound AND-OR logic across 4 levels.",
      "finalAnswer": "F = (A + B)C + D synthesized with 5 NOR gates in 4 logic levels.",
      "circuit": {
        "width": 520,
        "height": 150,
        "inputs": [
          {
            "id": "A",
            "label": "A",
            "x": 25,
            "y": 28
          },
          {
            "id": "B",
            "label": "B",
            "x": 25,
            "y": 42
          },
          {
            "id": "C",
            "label": "C",
            "x": 25,
            "y": 95
          },
          {
            "id": "D",
            "label": "D",
            "x": 25,
            "y": 130
          }
        ],
        "gates": [
          {
            "id": "R1",
            "type": "NOR",
            "x": 75,
            "y": 20,
            "label": "R1",
            "level": 1,
            "stage": 1
          },
          {
            "id": "Rc",
            "type": "NOR",
            "x": 75,
            "y": 80,
            "label": "Rc",
            "level": 1,
            "stage": 2
          },
          {
            "id": "R2",
            "type": "NOR",
            "x": 185,
            "y": 45,
            "label": "R2",
            "level": 2,
            "stage": 2
          },
          {
            "id": "R3",
            "type": "NOR",
            "x": 295,
            "y": 45,
            "label": "R3",
            "level": 3,
            "stage": 3
          },
          {
            "id": "R4",
            "type": "NOR",
            "x": 395,
            "y": 45,
            "label": "R4",
            "level": 4,
            "stage": 4
          }
        ],
        "wires": [
          {
            "id": "w1",
            "from": "A",
            "to": "R1.in1",
            "d": "M 25 28 L 75 28",
            "net": "A",
            "stage": 1
          },
          {
            "id": "w2",
            "from": "B",
            "to": "R1.in2",
            "d": "M 25 42 L 75 42",
            "net": "B",
            "stage": 1
          },
          {
            "id": "w3",
            "from": "C",
            "to": "j1",
            "d": "M 25 95 L 50 95",
            "net": "C",
            "stage": 2
          },
          {
            "id": "w4",
            "from": "j1",
            "to": "Rc.in1",
            "d": "M 50 95 L 50 88 L 75 88",
            "net": "C",
            "stage": 2
          },
          {
            "id": "w5",
            "from": "j1",
            "to": "Rc.in2",
            "d": "M 50 95 L 50 102 L 75 102",
            "net": "C",
            "stage": 2
          },
          {
            "id": "w6",
            "from": "R1.out",
            "to": "R2.in1",
            "d": "M 115 35 L 150 35 L 150 53 L 185 53",
            "net": "p",
            "stage": 2
          },
          {
            "id": "w7",
            "from": "Rc.out",
            "to": "R2.in2",
            "d": "M 115 95 L 150 95 L 150 67 L 185 67",
            "net": "c",
            "stage": 2
          },
          {
            "id": "w8",
            "from": "R2.out",
            "to": "R3.in1",
            "d": "M 225 60 L 295 53",
            "net": "q",
            "stage": 3
          },
          {
            "id": "w9",
            "from": "D",
            "to": "R3.in2",
            "d": "M 25 130 L 260 130 L 260 67 L 295 67",
            "net": "D",
            "stage": 3
          },
          {
            "id": "w10",
            "from": "R3.out",
            "to": "j2",
            "d": "M 335 60 L 365 60",
            "net": "s",
            "stage": 4
          },
          {
            "id": "w11",
            "from": "j2",
            "to": "R4.in1",
            "d": "M 365 60 L 365 53 L 395 53",
            "net": "s",
            "stage": 4
          },
          {
            "id": "w12",
            "from": "j2",
            "to": "R4.in2",
            "d": "M 365 60 L 365 67 L 395 67",
            "net": "s",
            "stage": 4
          },
          {
            "id": "w13",
            "from": "R4.out",
            "to": "F",
            "d": "M 435 60 L 470 60",
            "net": "F",
            "stage": 4
          }
        ],
        "junctions": [
          {
            "x": 50,
            "y": 95,
            "r": 3.5,
            "stage": 2
          },
          {
            "x": 365,
            "y": 60,
            "r": 3.5,
            "stage": 4
          }
        ],
        "labels": [
          {
            "text": "p=(A+B)'",
            "x": 131,
            "y": 28,
            "stage": 1
          },
          {
            "text": "q=(A+B)C",
            "x": 235,
            "y": 45,
            "stage": 2
          },
          {
            "text": "s=[(A+B)C+D]'",
            "x": 351,
            "y": 45,
            "stage": 3
          }
        ],
        "output": {
          "label": "F = (A + B)C + D",
          "x": 475,
          "y": 60,
          "stage": 4
        }
      }
    },
    {
      "id": "WE-11",
      "number": "Model 44",
      "title": "Comprehensive Comparison: XOR Realisation using NAND vs NOR",
      "category": "Mixed",
      "givenExpression": "F(A,B) = A ⊕ B",
      "problemStatement": "Compare the optimal synthesis of 2-input XOR using NAND gates versus NOR gates in terms of gate count, logic depth, and intermediate Boolean expressions.",
      "requiredRealisation": "NAND vs NOR",
      "gateCount": 4,
      "logicLevels": 3,
      "derivationSteps": [
        "Optimal NAND XOR: Uses 4 gates in 3 levels. Gate 1 computes p = (AB)'. Gates 2 and 3 compute q = (A·p)' and r = (B·p)'. Gate 4 combines q and r to produce F = A ⊕ B.",
        "Optimal NOR XOR: Uses 5 gates in 3 levels. Level 1: R1 = A', R2 = (A+B)', R3 = B'. Level 2: R4 = NOR(R1, R3) = AB. Level 3: F = NOR(R2, R4) = A ⊕ B.",
        "Depth Comparison: Both implementations achieve identical minimum logic depth of 3 levels.",
        "Gate Count Comparison: NAND achieves XOR in 4 gates, whereas NOR requires 5 gates due to De Morgan polarity alignment."
      ],
      "intermediateNodes": [
        {
          "net": "NAND XOR",
          "equation": "4 gates, 3 levels: G1=(AB)', G2=(A·p)', G3=(B·p)', F=(q·r)'",
          "level": 3,
          "type": "Optimal NAND Core"
        },
        {
          "net": "NOR XOR",
          "equation": "5 gates, 3 levels: R1=A', R2=(A+B)', R3=B', R4=AB, F=NOR(R2,R4)",
          "level": 3,
          "type": "Optimal NOR Network"
        }
      ],
      "truthTable": [
        {
          "A": 0,
          "B": 0,
          "F": 0
        },
        {
          "A": 0,
          "B": 1,
          "F": 1
        },
        {
          "A": 1,
          "B": 0,
          "F": 1
        },
        {
          "A": 1,
          "B": 1,
          "F": 0
        }
      ],
      "interpretation": "Both NAND and NOR synthesize XOR in 3 logic levels. NAND uses 4 gates while NOR uses 5 gates.",
      "finalAnswer": "NAND XOR: 4 gates, 3 levels. NOR XOR: 5 gates, 3 levels.",
      "circuit": {
        "width": 480,
        "height": 150,
        "inputs": [
          {
            "id": "A",
            "label": "A",
            "x": 25,
            "y": 45
          },
          {
            "id": "B",
            "label": "B",
            "x": 25,
            "y": 95
          }
        ],
        "gates": [
          {
            "id": "G1",
            "type": "NAND",
            "x": 90,
            "y": 55,
            "label": "G1",
            "level": 1
          },
          {
            "id": "G2",
            "type": "NAND",
            "x": 210,
            "y": 20,
            "label": "G2",
            "level": 2
          },
          {
            "id": "G3",
            "type": "NAND",
            "x": 210,
            "y": 90,
            "label": "G3",
            "level": 2
          },
          {
            "id": "G4",
            "type": "NAND",
            "x": 330,
            "y": 55,
            "label": "G4",
            "level": 3
          }
        ],
        "wires": [
          {
            "id": "w1",
            "from": "A",
            "to": "j1",
            "d": "M 25 45 L 55 45",
            "net": "A"
          },
          {
            "id": "w2",
            "from": "j1",
            "to": "G1.in1",
            "d": "M 55 45 L 55 63 L 90 63",
            "net": "A"
          },
          {
            "id": "w3",
            "from": "j1",
            "to": "G2.in1",
            "d": "M 55 45 L 55 28 L 210 28",
            "net": "A"
          },
          {
            "id": "w4",
            "from": "B",
            "to": "j2",
            "d": "M 25 95 L 55 95",
            "net": "B"
          },
          {
            "id": "w5",
            "from": "j2",
            "to": "G1.in2",
            "d": "M 55 95 L 55 77 L 90 77",
            "net": "B"
          },
          {
            "id": "w6",
            "from": "j2",
            "to": "G3.in2",
            "d": "M 55 95 L 55 112 L 210 112",
            "net": "B"
          },
          {
            "id": "w7",
            "from": "G1.out",
            "to": "j3",
            "d": "M 133 70 L 165 70",
            "net": "p"
          },
          {
            "id": "w8",
            "from": "j3",
            "to": "G2.in2",
            "d": "M 165 70 L 165 42 L 210 42",
            "net": "p"
          },
          {
            "id": "w9",
            "from": "j3",
            "to": "G3.in1",
            "d": "M 165 70 L 165 98 L 210 98",
            "net": "p"
          },
          {
            "id": "w10",
            "from": "G2.out",
            "to": "G4.in1",
            "d": "M 253 35 L 290 35 L 290 63 L 330 63",
            "net": "q"
          },
          {
            "id": "w11",
            "from": "G3.out",
            "to": "G4.in2",
            "d": "M 253 105 L 290 105 L 290 77 L 330 77",
            "net": "r"
          },
          {
            "id": "w12",
            "from": "G4.out",
            "to": "F",
            "d": "M 373 70 L 415 70",
            "net": "A ⊕ B"
          }
        ],
        "junctions": [
          {
            "x": 55,
            "y": 45,
            "r": 3.5
          },
          {
            "x": 55,
            "y": 95,
            "r": 3.5
          },
          {
            "x": 165,
            "y": 70,
            "r": 3.5
          }
        ],
        "labels": [
          {
            "text": "p = (AB)'",
            "x": 149,
            "y": 60
          },
          {
            "text": "q = (A·p)'",
            "x": 269,
            "y": 25
          },
          {
            "text": "r = (B·p)'",
            "x": 255,
            "y": 122
          }
        ],
        "output": {
          "label": "F = A ⊕ B",
          "x": 420,
          "y": 70
        }
      }
    }
  ],
  "masterCheatSheet": {
    "sevenGatesSummary": [
      {
        "gate": "NOT",
        "symbol": "Triangle with output bubble",
        "expression": "F = A'",
        "truthSummary": "Inverts single input"
      },
      {
        "gate": "AND",
        "symbol": "D-shape flat back",
        "expression": "F = AB",
        "truthSummary": "1 iff all inputs 1"
      },
      {
        "gate": "OR",
        "symbol": "Curved back pointed front",
        "expression": "F = A + B",
        "truthSummary": "1 iff any input 1"
      },
      {
        "gate": "NAND",
        "symbol": "AND shape with output bubble",
        "expression": "F = (AB)'",
        "truthSummary": "0 iff all inputs 1"
      },
      {
        "gate": "NOR",
        "symbol": "OR shape with output bubble",
        "expression": "F = (A + B)'",
        "truthSummary": "1 iff all inputs 0"
      },
      {
        "gate": "XOR",
        "symbol": "OR shape with double curved back",
        "expression": "F = A'B + AB'",
        "truthSummary": "1 iff inputs differ"
      },
      {
        "gate": "XNOR",
        "symbol": "XOR shape with output bubble",
        "expression": "F = AB + A'B'",
        "truthSummary": "1 iff inputs equal"
      }
    ],
    "nandRealisationSummary": [
      {
        "target": "NOT",
        "gateCount": 1,
        "levels": 1,
        "formula": "F = (AA)'"
      },
      {
        "target": "AND",
        "gateCount": 2,
        "levels": 2,
        "formula": "p = (AB)', F = (pp)'"
      },
      {
        "target": "OR",
        "gateCount": 3,
        "levels": 2,
        "formula": "p = (AA)', q = (BB)', F = (pq)'"
      },
      {
        "target": "NOR",
        "gateCount": 4,
        "levels": 3,
        "formula": "OR (3 gates) + Inverter (1 gate)"
      },
      {
        "target": "XOR",
        "gateCount": 4,
        "levels": 3,
        "formula": "p=(AB)', q=(Ap)', r=(Bp)', F=(qr)'"
      },
      {
        "target": "XNOR",
        "gateCount": 5,
        "levels": 3,
        "formula": "XOR (4 gates) + Inverter (1 gate)"
      }
    ],
    "norRealisationSummary": [
      {
        "target": "NOT",
        "gateCount": 1,
        "levels": 1,
        "formula": "F = (A + A)'"
      },
      {
        "target": "AND",
        "gateCount": 3,
        "levels": 2,
        "formula": "p = (A+A)', q = (B+B)', F = (p+q)'"
      },
      {
        "target": "OR",
        "gateCount": 2,
        "levels": 2,
        "formula": "p = (A+B)', F = (pp)'"
      },
      {
        "target": "NAND",
        "gateCount": 4,
        "levels": 3,
        "formula": "AND (3 gates) + Inverter (1 gate)"
      },
      {
        "target": "XOR",
        "gateCount": 5,
        "levels": 3,
        "formula": "R1=A', R2=(A+B)', R3=B', R4=AB, F=NOR(R2,R4)"
      },
      {
        "target": "XNOR",
        "gateCount": 4,
        "levels": 3,
        "formula": "p=(A+B)', q=(A+p)', r=(B+p)', F=(q+r)'"
      }
    ],
    "bubblePushingRules": [
      {
        "rule": "De Morgan NAND Dual (Invert-OR)",
        "algebraic": "(AB)' = A' + B'",
        "graphical": "AND shape with output bubble is identical to OR shape with input bubbles."
      },
      {
        "rule": "De Morgan NOR Dual (Invert-AND)",
        "algebraic": "(A + B)' = A' · B'",
        "graphical": "OR shape with output bubble is identical to AND shape with input bubbles."
      },
      {
        "rule": "Double Inversion Cancellation",
        "algebraic": "(x')' = x",
        "graphical": "Two inversion bubbles on the same connecting wire cancel out completely."
      },
      {
        "rule": "Unmatched Bubble Compensation",
        "algebraic": "x → x'",
        "graphical": "An isolated bubble on a signal line inverts logic polarity; insert an inverter or use complemented input."
      }
    ],
    "standardRecipes": [
      {
        "form": "SOP to 2-Level NAND-NAND",
        "recipe": "F = P1 + P2 = ((P1 + P2)')' = (P1' · P2')'. First level NAND gates compute negated products Pi'; second level NAND gate performs Invert-OR recombination."
      },
      {
        "form": "POS to 2-Level NOR-NOR",
        "recipe": "F = S1 · S2 = ((S1 · S2)')' = (S1' + S2')'. First level NOR gates compute negated sums Si'; second level NOR gate performs Invert-AND recombination."
      },
      {
        "form": "Single-Literal Terms in SOP",
        "recipe": "In F = A + BC, literal A must be supplied inverted (A') to the output NAND gate because (A')' = A. Connecting un-inverted A gives A' + BC."
      },
      {
        "form": "Single-Literal Terms in POS",
        "recipe": "In F = A(B + C), literal A must be supplied inverted (A') to the output NOR gate because (A')' = A. Connecting un-inverted A gives A'(B + C)."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Confusing Gate Count with Logic Levels",
        "prevention": "Gate count dictates chip area; logic levels (critical path depth) dictate propagation delay and maximum clock frequency."
      },
      {
        "mistake": "Forgetting to Invert Isolated Literals",
        "prevention": "In 2-level NAND-NAND circuits, every product term gets an automatic complement from its first-stage gate; an isolated literal bypasses this stage and must be inverted explicitly."
      },
      {
        "mistake": "Assuming NAND or NOR is Associative",
        "prevention": "NAND and NOR are NOT associative: (A NAND B) NAND C ≠ A NAND (B NAND C). Group parentheses strictly."
      },
      {
        "mistake": "Assuming Universal Gates Always Save Area",
        "prevention": "Universal gates reduce mask and inventory costs, but synthesizing non-inverting operations requires extra gates. Evaluate net gate count."
      },
      {
        "mistake": "Violating Library Fan-In Limits",
        "prevention": "Standard libraries rarely provide 5-input gates. Decompose wide terms into multi-level trees of 2-input gates."
      },
      {
        "mistake": "Connecting Opposing Families Directly",
        "prevention": "In mixed networks, feeding (AB)' directly to a NOR gate gives ((AB)' + C)' = ABC', not (AB + C)'. An inverter is required."
      },
      {
        "mistake": "Omission of Output Inversion Bubbles",
        "prevention": "Every NAND, NOR, and NOT gate must display its circular inversion bubble. Omitting the bubble turns the gate into an AND, OR, or buffer."
      },
      {
        "mistake": "Unverified Intermediate Signal Polarity",
        "prevention": "Label every internal net with its exact algebraic equation and check truth table values before finalizing schematic."
      }
    ],
    "referenceCircuits": {
      "nandInverter": {
        "width": 220,
        "height": 65,
        "inputs": [
          {
            "id": "A",
            "label": "A",
            "x": 20,
            "y": 32
          }
        ],
        "gates": [
          {
            "id": "G1",
            "type": "NAND",
            "x": 65,
            "y": 18,
            "label": "G1",
            "level": 1
          }
        ],
        "wires": [
          {
            "id": "w1",
            "from": "A",
            "to": "j1",
            "d": "M 20 32 L 45 32",
            "net": "A"
          },
          {
            "id": "w2",
            "from": "j1",
            "to": "G1.in1",
            "d": "M 45 32 L 45 26 L 65 26",
            "net": "A"
          },
          {
            "id": "w3",
            "from": "j1",
            "to": "G1.in2",
            "d": "M 45 32 L 45 40 L 65 40",
            "net": "A"
          },
          {
            "id": "w4",
            "from": "G1.out",
            "to": "F",
            "d": "M 108 33 L 150 33",
            "net": "A'"
          }
        ],
        "junctions": [
          {
            "x": 45,
            "y": 32,
            "r": 3.5
          }
        ],
        "labels": [],
        "output": {
          "label": "F = A'",
          "x": 155,
          "y": 33
        }
      },
      "norInverter": {
        "width": 220,
        "height": 65,
        "inputs": [
          {
            "id": "A",
            "label": "A",
            "x": 20,
            "y": 32
          }
        ],
        "gates": [
          {
            "id": "R1",
            "type": "NOR",
            "x": 65,
            "y": 18,
            "label": "R1",
            "level": 1
          }
        ],
        "wires": [
          {
            "id": "w1",
            "from": "A",
            "to": "j1",
            "d": "M 20 32 L 45 32",
            "net": "A"
          },
          {
            "id": "w2",
            "from": "j1",
            "to": "R1.in1",
            "d": "M 45 32 L 45 26 L 65 26",
            "net": "A"
          },
          {
            "id": "w3",
            "from": "j1",
            "to": "R1.in2",
            "d": "M 45 32 L 45 40 L 65 40",
            "net": "A"
          },
          {
            "id": "w4",
            "from": "R1.out",
            "to": "F",
            "d": "M 105 33 L 150 33",
            "net": "A'"
          }
        ],
        "junctions": [
          {
            "x": 45,
            "y": 32,
            "r": 3.5
          }
        ],
        "labels": [],
        "output": {
          "label": "F = A'",
          "x": 155,
          "y": 33
        }
      },
      "nandNandSop": {
        "width": 480,
        "height": 140,
        "inputs": [
          {
            "id": "A",
            "label": "A",
            "x": 25,
            "y": 28
          },
          {
            "id": "B",
            "label": "B",
            "x": 25,
            "y": 42
          },
          {
            "id": "C",
            "label": "C",
            "x": 25,
            "y": 88
          },
          {
            "id": "D",
            "label": "D",
            "x": 25,
            "y": 102
          }
        ],
        "gates": [
          {
            "id": "G1",
            "type": "NAND",
            "x": 90,
            "y": 20,
            "label": "G1",
            "level": 1
          },
          {
            "id": "G2",
            "type": "NAND",
            "x": 90,
            "y": 80,
            "label": "G2",
            "level": 1
          },
          {
            "id": "G3",
            "type": "NAND",
            "x": 230,
            "y": 50,
            "label": "G3",
            "level": 2
          }
        ],
        "wires": [
          {
            "id": "w1",
            "from": "A",
            "to": "G1.in1",
            "d": "M 25 28 L 90 28",
            "net": "A"
          },
          {
            "id": "w2",
            "from": "B",
            "to": "G1.in2",
            "d": "M 25 42 L 90 42",
            "net": "B"
          },
          {
            "id": "w3",
            "from": "C",
            "to": "G2.in1",
            "d": "M 25 88 L 90 88",
            "net": "C"
          },
          {
            "id": "w4",
            "from": "D",
            "to": "G2.in2",
            "d": "M 25 102 L 90 102",
            "net": "D"
          },
          {
            "id": "w5",
            "from": "G1.out",
            "to": "G3.in1",
            "d": "M 133 35 L 180 35 L 180 58 L 230 58",
            "net": "p"
          },
          {
            "id": "w6",
            "from": "G2.out",
            "to": "G3.in2",
            "d": "M 133 95 L 180 95 L 180 72 L 230 72",
            "net": "q"
          },
          {
            "id": "w7",
            "from": "G3.out",
            "to": "F",
            "d": "M 273 65 L 360 65",
            "net": "AB+CD"
          }
        ],
        "junctions": [],
        "labels": [
          {
            "text": "p = (AB)'",
            "x": 149,
            "y": 28
          },
          {
            "text": "q = (CD)'",
            "x": 140,
            "y": 108
          }
        ],
        "output": {
          "label": "F = AB + CD",
          "x": 370,
          "y": 65
        }
      },
      "norNorPos": {
        "width": 480,
        "height": 140,
        "inputs": [
          {
            "id": "A",
            "label": "A",
            "x": 25,
            "y": 28
          },
          {
            "id": "B",
            "label": "B",
            "x": 25,
            "y": 42
          },
          {
            "id": "C",
            "label": "C",
            "x": 25,
            "y": 88
          },
          {
            "id": "D",
            "label": "D",
            "x": 25,
            "y": 102
          }
        ],
        "gates": [
          {
            "id": "R1",
            "type": "NOR",
            "x": 90,
            "y": 20,
            "label": "R1",
            "level": 1
          },
          {
            "id": "R2",
            "type": "NOR",
            "x": 90,
            "y": 80,
            "label": "R2",
            "level": 1
          },
          {
            "id": "R3",
            "type": "NOR",
            "x": 230,
            "y": 50,
            "label": "R3",
            "level": 2
          }
        ],
        "wires": [
          {
            "id": "w1",
            "from": "A",
            "to": "R1.in1",
            "d": "M 25 28 L 90 28",
            "net": "A"
          },
          {
            "id": "w2",
            "from": "B",
            "to": "R1.in2",
            "d": "M 25 42 L 90 42",
            "net": "B"
          },
          {
            "id": "w3",
            "from": "C",
            "to": "R2.in1",
            "d": "M 25 88 L 90 88",
            "net": "C"
          },
          {
            "id": "w4",
            "from": "D",
            "to": "R2.in2",
            "d": "M 25 102 L 90 102",
            "net": "D"
          },
          {
            "id": "w5",
            "from": "R1.out",
            "to": "R3.in1",
            "d": "M 130 35 L 180 35 L 180 58 L 230 58",
            "net": "p"
          },
          {
            "id": "w6",
            "from": "R2.out",
            "to": "R3.in2",
            "d": "M 130 95 L 180 95 L 180 72 L 230 72",
            "net": "q"
          },
          {
            "id": "w7",
            "from": "R3.out",
            "to": "F",
            "d": "M 270 65 L 360 65",
            "net": "(A+B)(C+D)"
          }
        ],
        "junctions": [],
        "labels": [
          {
            "text": "p = (A+B)'",
            "x": 146,
            "y": 28
          },
          {
            "text": "q = (C+D)'",
            "x": 146,
            "y": 108
          }
        ],
        "output": {
          "label": "F = (A+B)(C+D)",
          "x": 370,
          "y": 65
        }
      }
    }
  },
  "practiceQuestions": [
    {
      "id": "PQ-01",
      "number": "Question 01",
      "difficulty": "Basic",
      "category": "Gate Fundamentals",
      "question": "Identify the unique input combination that distinguishes a 2-input NAND gate from a 2-input NOR gate. Provide their Boolean expressions and truth-table outputs for all 4 input states.",
      "hint": "Evaluate the outputs when inputs are both 0 (0,0) and when inputs are both 1 (1,1).",
      "steps": [
        "NAND expression: F_NAND = (AB)'. Output is 0 only when A=1 and B=1. For inputs (0,0), (0,1), (1,0), output is 1.",
        "NOR expression: F_NOR = (A + B)'. Output is 1 only when A=0 and B=0. For inputs (0,1), (1,0), (1,1), output is 0.",
        "At (0,0): NAND = 1, NOR = 1 (identical).",
        "At (0,1): NAND = 1, NOR = 0 (differ).",
        "At (1,0): NAND = 1, NOR = 0 (differ).",
        "At (1,1): NAND = 0, NOR = 0 (identical).",
        "Inputs (0,1) and (1,0) distinguish the two gates directly: NAND produces 1 while NOR produces 0."
      ],
      "answer": "Inputs (0,1) and (1,0) produce output 1 for NAND and output 0 for NOR. At (0,0) both produce 1; at (1,1) both produce 0.",
      "takeaway": "NAND is 0 only on the (1,1) row; NOR is 1 only on the (0,0) row. They are dual operators under De Morgan's laws."
    },
    {
      "id": "PQ-02",
      "number": "Question 02",
      "difficulty": "Basic",
      "category": "Universal Gate Theory",
      "question": "State the formal definition of functional completeness. Why is proving the synthesis of NOT, AND, and OR sufficient to prove that a logic gate family is universal?",
      "hint": "Recall that every switching function can be expanded into canonical SOP form.",
      "steps": [
        "A set of logic operations is functionally complete if any arbitrary finite Boolean function can be constructed using only operations from that set.",
        "The standard basis {NOT, AND, OR} is already proven to be functionally complete because any truth table can be written as a canonical Sum of Products (OR of minterm AND products containing complemented/uncomplemented literals).",
        "Therefore, by transitivity of functional composition, if a single gate (such as NAND or NOR) can synthesize NOT, AND, and OR, it can synthesize any canonical SOP expression.",
        "Consequently, the singleton {NAND} and singleton {NOR} are individually functionally complete."
      ],
      "answer": "A gate set is functionally complete if it can synthesize any switching function. Because any function can be represented in SOP form using {NOT, AND, OR}, synthesizing these three primitive gates proves universality.",
      "takeaway": "Universal gate proofs always establish NOT, AND, and OR first, guaranteeing that any switching function can be realized."
    },
    {
      "id": "PQ-03",
      "number": "Question 03",
      "difficulty": "Basic",
      "category": "SOP to NAND",
      "question": "Synthesize the Boolean function F(A, B, C) = AB + C' using exclusively 2-input NAND gates from uncomplemented inputs.",
      "hint": "Apply De Morgan's inversion: F = ((AB + C')')' = ((AB)' · C)'. Notice that C' becomes C in the second NAND input!",
      "steps": [
        "Given F = AB + C'. Apply double negation: F = [ (AB + C')' ]' = [ (AB)' · (C')' ]' = [ (AB)' · C ]'.",
        "Notice that the second-level NAND gate computes F = NAND( in1, in2 ) = (in1 · in2)'.",
        "If in1 = (AB)' and in2 = C, the output evaluates as [ (AB)' · C ]' = (AB)'' + C' = AB + C'.",
        "Gate 1: T1 = NAND(A, B) = (AB)' (Level 1).",
        "Gate 2: F = NAND(T1, C) = [ (AB)' · C ]' = AB + C' (Level 2).",
        "Primary input C connects directly to the second-level NAND gate without an inverter!"
      ],
      "answer": "Step 1: Compute Level 1 product: p = NAND(A, B) = (AB)'.\nStep 2: Combine p and primary input C in output NAND: F = NAND(p, C) = ((AB)' · C)' = (AB)'' + C' = AB + C'.\nTotal gates: exactly 2 NAND gates; Logic depth: 2 levels.",
      "takeaway": "Because the output NAND gate inverts all its inputs, a complemented literal in an SOP term (C') requires connecting uncomplemented literal C directly.",
      "circuit": {
        "width": 420,
        "height": 130,
        "inputs": [
          {
            "id": "A",
            "label": "A",
            "x": 25,
            "y": 30
          },
          {
            "id": "B",
            "label": "B",
            "x": 25,
            "y": 50
          },
          {
            "id": "C",
            "label": "C",
            "x": 25,
            "y": 95
          }
        ],
        "gates": [
          {
            "id": "G1",
            "type": "NAND",
            "x": 100,
            "y": 28,
            "label": "G1",
            "level": 1,
            "inputs": [
              "A",
              "B"
            ],
            "out": "p"
          },
          {
            "id": "G2",
            "type": "NAND",
            "x": 240,
            "y": 55,
            "label": "G2",
            "level": 2,
            "inputs": [
              "p",
              "C"
            ],
            "out": "F"
          }
        ],
        "wires": [
          {
            "id": "w1",
            "from": "A",
            "to": "G1.in1",
            "d": "M 25 30 L 100 30",
            "net": "A"
          },
          {
            "id": "w2",
            "from": "B",
            "to": "G1.in2",
            "d": "M 25 50 L 60 50 L 60 42 L 100 42",
            "net": "B"
          },
          {
            "id": "w3",
            "from": "G1.out",
            "to": "G2.in1",
            "d": "M 143 40 L 190 40 L 190 63 L 240 63",
            "net": "p"
          },
          {
            "id": "w4",
            "from": "C",
            "to": "G2.in2",
            "d": "M 25 95 L 190 95 L 190 77 L 240 77",
            "net": "C"
          },
          {
            "id": "w5",
            "from": "G2.out",
            "to": "F",
            "d": "M 283 67 L 340 67",
            "net": "F"
          }
        ],
        "junctions": [],
        "labels": [
          {
            "text": "p=(AB)'",
            "x": 159,
            "y": 32
          }
        ],
        "output": {
          "label": "F = AB + C'",
          "x": 345,
          "y": 67
        }
      }
    },
    {
      "id": "PQ-04",
      "number": "Question 04",
      "difficulty": "Intermediate",
      "category": "POS to NOR",
      "question": "Synthesize the Product of Sums expression F(A, B, C, D) = (A + B')(C' + D) using exclusively 2-input NOR gates from uncomplemented inputs.",
      "hint": "Invert B and C at Level 1, form negated sum terms at Level 2, and recombine with a final NOR gate at Level 3.",
      "steps": [
        "Case (a) with uncomplemented inputs A, B, C, D only:",
        "  Level 1 inverters: R1 = NOR(B, B) = B' and R2 = NOR(C, C) = C' (2 gates).",
        "  Level 2 sum gates: R3 = NOR(A, R1) = (A + B')' and R4 = NOR(R2, D) = (C' + D)' (2 gates).",
        "  Level 3 output gate: F = NOR(R3, R4) = [ (A + B')' + (C' + D)' ]' = (A + B')(C' + D) (1 gate).",
        "  Total gates for Case (a): 5 NOR gates, 3 logic levels.",
        "Case (b) with complemented inputs B' and C' already available externally:",
        "  Level 1: R3 = NOR(A, B') = (A + B')' and R4 = NOR(C', D) = (C' + D)' (2 gates).",
        "  Level 2: F = NOR(R3, R4) = (A + B')(C' + D) (1 gate).",
        "  Total gates for Case (b): Exactly 3 NOR gates, 2 logic levels."
      ],
      "answer": "Step 1 (Level 1): Generate u = NOR(B, B) = B' and v = NOR(C, C) = C'.\nStep 2 (Level 2): Compute p = NOR(A, u) = (A + B')' and q = NOR(v, D) = (C' + D)'.\nStep 3 (Level 3): Recombine: F = NOR(p, q) = (p + q)' = (A + B')(C' + D).\nTotal gates: 5 NOR gates; Logic depth: 3 levels.",
      "takeaway": "Primary input complement availability significantly alters physical gate count and critical path delay.",
      "circuit": {
        "width": 480,
        "height": 160,
        "inputs": [
          {
            "id": "A",
            "label": "A",
            "x": 25,
            "y": 25
          },
          {
            "id": "B",
            "label": "B",
            "x": 25,
            "y": 55
          },
          {
            "id": "C",
            "label": "C",
            "x": 25,
            "y": 95
          },
          {
            "id": "D",
            "label": "D",
            "x": 25,
            "y": 125
          }
        ],
        "gates": [
          {
            "id": "Ru",
            "type": "NOR",
            "x": 80,
            "y": 45,
            "label": "Ru",
            "level": 1,
            "inputs": [
              "B",
              "B"
            ],
            "out": "u"
          },
          {
            "id": "Rv",
            "type": "NOR",
            "x": 80,
            "y": 85,
            "label": "Rv",
            "level": 1,
            "inputs": [
              "C",
              "C"
            ],
            "out": "v"
          },
          {
            "id": "R1",
            "type": "NOR",
            "x": 200,
            "y": 25,
            "label": "R1",
            "level": 2,
            "inputs": [
              "A",
              "u"
            ],
            "out": "p"
          },
          {
            "id": "R2",
            "type": "NOR",
            "x": 200,
            "y": 95,
            "label": "R2",
            "level": 2,
            "inputs": [
              "v",
              "D"
            ],
            "out": "q"
          },
          {
            "id": "R3",
            "type": "NOR",
            "x": 330,
            "y": 60,
            "label": "R3",
            "level": 3,
            "inputs": [
              "p",
              "q"
            ],
            "out": "F"
          }
        ],
        "wires": [
          {
            "id": "w1",
            "from": "B",
            "to": "j1",
            "d": "M 25 55 L 50 55",
            "net": "B"
          },
          {
            "id": "w2",
            "from": "j1",
            "to": "Ru.in1",
            "d": "M 50 55 L 50 50 L 80 50",
            "net": "B"
          },
          {
            "id": "w3",
            "from": "j1",
            "to": "Ru.in2",
            "d": "M 50 55 L 50 60 L 80 60",
            "net": "B"
          },
          {
            "id": "w4",
            "from": "C",
            "to": "j2",
            "d": "M 25 95 L 50 95",
            "net": "C"
          },
          {
            "id": "w5",
            "from": "j2",
            "to": "Rv.in1",
            "d": "M 50 95 L 50 90 L 80 90",
            "net": "C"
          },
          {
            "id": "w6",
            "from": "j2",
            "to": "Rv.in2",
            "d": "M 50 95 L 50 100 L 80 100",
            "net": "C"
          },
          {
            "id": "w7",
            "from": "A",
            "to": "R1.in1",
            "d": "M 25 25 L 200 25",
            "net": "A"
          },
          {
            "id": "w8",
            "from": "Ru.out",
            "to": "R1.in2",
            "d": "M 120 60 L 160 60 L 160 37 L 200 37",
            "net": "u"
          },
          {
            "id": "w9",
            "from": "Rv.out",
            "to": "R2.in1",
            "d": "M 120 100 L 160 100 L 160 103 L 200 103",
            "net": "v"
          },
          {
            "id": "w10",
            "from": "D",
            "to": "R2.in2",
            "d": "M 25 125 L 160 125 L 160 115 L 200 115",
            "net": "D"
          },
          {
            "id": "w11",
            "from": "R1.out",
            "to": "R3.in1",
            "d": "M 240 37 L 285 37 L 285 68 L 330 68",
            "net": "p"
          },
          {
            "id": "w12",
            "from": "R2.out",
            "to": "R3.in2",
            "d": "M 240 107 L 285 107 L 285 82 L 330 82",
            "net": "q"
          },
          {
            "id": "w13",
            "from": "R3.out",
            "to": "F",
            "d": "M 370 75 L 420 75",
            "net": "F"
          }
        ],
        "junctions": [
          {
            "x": 50,
            "y": 55,
            "r": 3.5
          },
          {
            "x": 50,
            "y": 95,
            "r": 3.5
          }
        ],
        "labels": [
          {
            "text": "u=B'",
            "x": 136,
            "y": 48
          },
          {
            "text": "v=C'",
            "x": 136,
            "y": 115
          },
          {
            "text": "p",
            "x": 256,
            "y": 32
          },
          {
            "text": "q",
            "x": 256,
            "y": 120
          }
        ],
        "output": {
          "label": "F = (A+B')(C'+D)",
          "x": 425,
          "y": 75
        }
      }
    },
    {
      "id": "PQ-05",
      "number": "Question 05",
      "difficulty": "Intermediate",
      "category": "Factored NAND",
      "question": "Synthesize the factored function F(A, B, C, D) = A(B + CD) using exclusively 2-input NAND gates from uncomplemented inputs.",
      "hint": "Invert B and compute (CD)' at Level 1, combine to form (B + CD) at Level 2, multiply by A at Level 3, and invert at Level 4.",
      "steps": [
        "Innermost product CD: N1 = NAND(C, D) = (CD)' (Level 1).",
        "Literal B must be inverted for Invert-OR recombination: N2 = NAND(B, B) = B' (Level 1).",
        "Combine to form sum B + CD: N3 = NAND(N1, N2) = [ (CD)' · B' ]' = B + CD (Level 2).",
        "Multiply by literal A: N4 = NAND(A, N3) = [ A(B + CD) ]' (Level 3).",
        "Output inverter: F = NAND(N4, N4) = [ (A(B + CD))' ]' = A(B + CD) (Level 4)."
      ],
      "answer": "Step 1 (Level 1): p = NAND(B, B) = B', q = NAND(C, D) = (CD)'.\nStep 2 (Level 2): r = NAND(p, q) = B + CD.\nStep 3 (Level 3): s = NAND(A, r) = (A(B + CD))'.\nStep 4 (Level 4): F = NAND(s, s) = A(B + CD).\nTotal gates: 5 NAND gates; Logic depth: 4 levels.",
      "takeaway": "Factoring eliminates duplicate product terms but increases logic levels compared to flat 2-level SOP.",
      "circuit": {
        "width": 540,
        "height": 160,
        "inputs": [
          {
            "id": "A",
            "label": "A",
            "x": 20,
            "y": 25
          },
          {
            "id": "B",
            "label": "B",
            "x": 20,
            "y": 65
          },
          {
            "id": "C",
            "label": "C",
            "x": 20,
            "y": 110
          },
          {
            "id": "D",
            "label": "D",
            "x": 20,
            "y": 130
          }
        ],
        "gates": [
          {
            "id": "G1",
            "type": "NAND",
            "x": 80,
            "y": 55,
            "label": "G1",
            "level": 1,
            "stage": 0,
            "inputs": [
              "B",
              "B"
            ],
            "out": "p"
          },
          {
            "id": "G2",
            "type": "NAND",
            "x": 80,
            "y": 110,
            "label": "G2",
            "level": 1,
            "stage": 0,
            "inputs": [
              "C",
              "D"
            ],
            "out": "q"
          },
          {
            "id": "G3",
            "type": "NAND",
            "x": 195,
            "y": 80,
            "label": "G3",
            "level": 2,
            "stage": 1,
            "inputs": [
              "p",
              "q"
            ],
            "out": "r"
          },
          {
            "id": "G4",
            "type": "NAND",
            "x": 305,
            "y": 40,
            "label": "G4",
            "level": 3,
            "stage": 2,
            "inputs": [
              "A",
              "r"
            ],
            "out": "s"
          },
          {
            "id": "G5",
            "type": "NAND",
            "x": 415,
            "y": 40,
            "label": "G5",
            "level": 4,
            "stage": 3,
            "inputs": [
              "s",
              "s"
            ],
            "out": "F"
          }
        ],
        "wires": [
          {
            "id": "w1",
            "from": "B",
            "to": "j1",
            "d": "M 20 65 L 50 65",
            "net": "B"
          },
          {
            "id": "w2",
            "from": "j1",
            "to": "G1.in1",
            "d": "M 50 65 L 50 60 L 80 60",
            "net": "B"
          },
          {
            "id": "w3",
            "from": "j1",
            "to": "G1.in2",
            "d": "M 50 65 L 50 70 L 80 70",
            "net": "B"
          },
          {
            "id": "w4",
            "from": "C",
            "to": "G2.in1",
            "d": "M 20 110 L 50 110 L 50 117 L 80 117",
            "net": "C"
          },
          {
            "id": "w5",
            "from": "D",
            "to": "G2.in2",
            "d": "M 20 130 L 50 130 L 50 127 L 80 127",
            "net": "D"
          },
          {
            "id": "w6",
            "from": "G1.out",
            "to": "G3.in1",
            "d": "M 123 67 L 160 67 L 160 87 L 195 87",
            "net": "p"
          },
          {
            "id": "w7",
            "from": "G2.out",
            "to": "G3.in2",
            "d": "M 123 122 L 160 122 L 160 98 L 195 98",
            "net": "q"
          },
          {
            "id": "w8",
            "from": "A",
            "to": "G4.in1",
            "d": "M 20 25 L 265 25 L 265 47 L 305 47",
            "net": "A"
          },
          {
            "id": "w9",
            "from": "G3.out",
            "to": "G4.in2",
            "d": "M 238 92 L 265 92 L 265 58 L 305 58",
            "net": "r"
          },
          {
            "id": "w10",
            "from": "G4.out",
            "to": "j2",
            "d": "M 348 52 L 380 52",
            "net": "s"
          },
          {
            "id": "w11",
            "from": "j2",
            "to": "G5.in1",
            "d": "M 380 52 L 380 47 L 415 47",
            "net": "s"
          },
          {
            "id": "w12",
            "from": "j2",
            "to": "G5.in2",
            "d": "M 380 52 L 380 57 L 415 57",
            "net": "s"
          },
          {
            "id": "w13",
            "from": "G5.out",
            "to": "F",
            "d": "M 458 52 L 495 52",
            "net": "F"
          }
        ],
        "junctions": [
          {
            "x": 50,
            "y": 65,
            "r": 3.5
          },
          {
            "x": 380,
            "y": 52,
            "r": 3.5
          }
        ],
        "labels": [
          {
            "text": "p=B'",
            "x": 139,
            "y": 58
          },
          {
            "text": "q=(CD)'",
            "x": 139,
            "y": 141
          },
          {
            "text": "r=B+CD",
            "x": 254,
            "y": 85
          },
          {
            "text": "s",
            "x": 364,
            "y": 45
          }
        ],
        "output": {
          "label": "F = A(B+CD)",
          "x": 500,
          "y": 52
        }
      }
    },
    {
      "id": "PQ-06",
      "number": "Question 06",
      "difficulty": "Intermediate",
      "category": "SOP to NOR",
      "question": "Convert the SOP expression F(A, B, C) = AB + C into an all-NOR implementation using Boolean algebra from uncomplemented inputs.",
      "hint": "Distribute C over the product: F = (A + C)(B + C). Each sum term can be generated by a NOR gate at Level 1.",
      "steps": [
        "Step 1: Convert SOP to POS using distributivity: F = C + AB = (A + C)(B + C).",
        "Step 2: Double-negate POS: F = [ ((A + C)(B + C))' ]' = [ (A + C)' + (B + C)' ]'.",
        "Step 3: Level 1 NOR gates: p = NOR(A, C) = (A + C)' and q = NOR(B, C) = (B + C)'.",
        "Step 4: Level 2 output NOR gate: F = NOR(p, q) = [ (A + C)' + (B + C)' ]' = (A + C)(B + C) = AB + C.",
        "Total gates: 3 NOR gates across 2 logic levels."
      ],
      "answer": "Step 1: Distribute literal C: F = (A + C)(B + C).\nStep 2 (Level 1): p = NOR(A, C) = (A + C)', q = NOR(B, C) = (B + C)'.\nStep 3 (Level 2): F = NOR(p, q) = ((A + C)' + (B + C)')' = (A + C)(B + C) = AB + C.\nTotal gates: 3 NOR gates; Logic depth: 2 levels.",
      "takeaway": "Converting SOP to POS allows direct 2-level NOR-NOR realization without needing extra inverters.",
      "circuit": {
        "width": 460,
        "height": 150,
        "inputs": [
          {
            "id": "A",
            "label": "A",
            "x": 25,
            "y": 35
          },
          {
            "id": "B",
            "label": "B",
            "x": 25,
            "y": 115
          },
          {
            "id": "C",
            "label": "C",
            "x": 25,
            "y": 75
          }
        ],
        "gates": [
          {
            "id": "R1",
            "type": "NOR",
            "x": 110,
            "y": 25,
            "label": "R1",
            "level": 1,
            "inputs": [
              "A",
              "C"
            ],
            "out": "p"
          },
          {
            "id": "R2",
            "type": "NOR",
            "x": 110,
            "y": 95,
            "label": "R2",
            "level": 1,
            "inputs": [
              "B",
              "C"
            ],
            "out": "q"
          },
          {
            "id": "R3",
            "type": "NOR",
            "x": 260,
            "y": 60,
            "label": "R3",
            "level": 2,
            "inputs": [
              "p",
              "q"
            ],
            "out": "F"
          }
        ],
        "wires": [
          {
            "id": "w1",
            "from": "A",
            "to": "R1.in1",
            "d": "M 25 35 L 110 35",
            "net": "A"
          },
          {
            "id": "w2",
            "from": "C",
            "to": "j1",
            "d": "M 25 75 L 65 75",
            "net": "C"
          },
          {
            "id": "w3",
            "from": "j1",
            "to": "R1.in2",
            "d": "M 65 75 L 65 48 L 110 48",
            "net": "C"
          },
          {
            "id": "w4",
            "from": "j1",
            "to": "R2.in1",
            "d": "M 65 75 L 65 103 L 110 103",
            "net": "C"
          },
          {
            "id": "w5",
            "from": "B",
            "to": "R2.in2",
            "d": "M 25 115 L 110 115",
            "net": "B"
          },
          {
            "id": "w6",
            "from": "R1.out",
            "to": "R3.in1",
            "d": "M 150 40 L 205 40 L 205 68 L 260 68",
            "net": "p"
          },
          {
            "id": "w7",
            "from": "R2.out",
            "to": "R3.in2",
            "d": "M 150 110 L 205 110 L 205 82 L 260 82",
            "net": "q"
          },
          {
            "id": "w8",
            "from": "R3.out",
            "to": "F",
            "d": "M 300 75 L 390 75",
            "net": "F"
          }
        ],
        "junctions": [
          {
            "x": 65,
            "y": 75,
            "r": 3.5
          }
        ],
        "labels": [
          {
            "text": "p=(A+C)'",
            "x": 166,
            "y": 32
          },
          {
            "text": "q=(B+C)'",
            "x": 166,
            "y": 125
          }
        ],
        "output": {
          "label": "F = AB + C",
          "x": 395,
          "y": 75
        }
      }
    },
    {
      "id": "PQ-07",
      "number": "Question 07",
      "difficulty": "Advanced",
      "category": "POS to NAND",
      "question": "Implement the POS expression F(A, B, C) = (A + B)(A' + C) using exclusively 2-input NAND gates from uncomplemented inputs.",
      "hint": "Expand and apply consensus theorem to get SOP: F = A'B + AC. Then invert literal A at Level 1.",
      "steps": [
        "Expand: (A + B)(A' + C) = AA' + AC + A'B + BC = AC + A'B + BC (since AA'=0).",
        "Apply consensus theorem: in AC + A'B + BC, term BC is redundant because A and A' are complementary literals. Thus, F = AC + A'B.",
        "Double-negate SOP: F = ((AC + A'B)')' = [ (AC)' · (A'B)' ]'.",
        "Invert input A: u = NAND(A, A) = A' (Level 1).",
        "Product terms: p = NAND(u, B) = (A'B)' (Level 2, depends on u) and q = NAND(A, C) = (AC)' (Level 1).",
        "Output gate: F = NAND(p, q) = [ (A'B)' · (AC)' ]' = AC + A'B (Level 3).",
        "Total: 4 NAND gates, 3 logic levels."
      ],
      "answer": "Step 1: Multiply out: F = AA' + AC + A'B + BC = A'B + AC (consensus eliminates BC).\nStep 2 (Level 1): u = NAND(A, A) = A'.\nStep 3 (Level 2): p = NAND(u, B) = (A'B)', q = NAND(A, C) = (AC)'.\nStep 4 (Level 3): F = NAND(p, q) = A'B + AC = (A + B)(A' + C).\nTotal gates: 4 NAND gates; Logic depth: 3 logic levels.",
      "takeaway": "Algebraic simplification before technology mapping minimizes physical gate count.",
      "circuit": {
        "width": 460,
        "height": 150,
        "inputs": [
          {
            "id": "A",
            "label": "A",
            "x": 25,
            "y": 30
          },
          {
            "id": "B",
            "label": "B",
            "x": 25,
            "y": 68
          },
          {
            "id": "C",
            "label": "C",
            "x": 25,
            "y": 115
          }
        ],
        "gates": [
          {
            "id": "Gu",
            "type": "NAND",
            "x": 80,
            "y": 20,
            "label": "Gu",
            "level": 1,
            "inputs": [
              "A",
              "A"
            ],
            "out": "u"
          },
          {
            "id": "G1",
            "type": "NAND",
            "x": 195,
            "y": 35,
            "label": "G1",
            "level": 2,
            "inputs": [
              "u",
              "B"
            ],
            "out": "p"
          },
          {
            "id": "G2",
            "type": "NAND",
            "x": 195,
            "y": 95,
            "label": "G2",
            "level": 2,
            "inputs": [
              "A",
              "C"
            ],
            "out": "q"
          },
          {
            "id": "G3",
            "type": "NAND",
            "x": 315,
            "y": 65,
            "label": "G3",
            "level": 3,
            "inputs": [
              "p",
              "q"
            ],
            "out": "F"
          }
        ],
        "wires": [
          {
            "id": "w1",
            "from": "A",
            "to": "j1",
            "d": "M 25 30 L 50 30",
            "net": "A"
          },
          {
            "id": "w2",
            "from": "j1",
            "to": "Gu.in1",
            "d": "M 50 30 L 50 25 L 80 25",
            "net": "A"
          },
          {
            "id": "w3",
            "from": "j1",
            "to": "Gu.in2",
            "d": "M 50 30 L 50 35 L 80 35",
            "net": "A"
          },
          {
            "id": "w4",
            "from": "j1",
            "to": "G2.in1",
            "d": "M 50 30 L 50 102 L 195 102",
            "net": "A"
          },
          {
            "id": "w5",
            "from": "Gu.out",
            "to": "G1.in1",
            "d": "M 123 32 L 160 32 L 160 42 L 195 42",
            "net": "u"
          },
          {
            "id": "w6",
            "from": "B",
            "to": "G1.in2",
            "d": "M 25 68 L 160 68 L 160 53 L 195 53",
            "net": "B"
          },
          {
            "id": "w7",
            "from": "C",
            "to": "G2.in2",
            "d": "M 25 115 L 195 115",
            "net": "C"
          },
          {
            "id": "w8",
            "from": "G1.out",
            "to": "G3.in1",
            "d": "M 238 47 L 275 47 L 275 72 L 315 72",
            "net": "p"
          },
          {
            "id": "w9",
            "from": "G2.out",
            "to": "G3.in2",
            "d": "M 238 107 L 275 107 L 275 83 L 315 83",
            "net": "q"
          },
          {
            "id": "w10",
            "from": "G3.out",
            "to": "F",
            "d": "M 358 77 L 400 77",
            "net": "F"
          }
        ],
        "junctions": [
          {
            "x": 50,
            "y": 30,
            "r": 3.5
          }
        ],
        "labels": [
          {
            "text": "u=A'",
            "x": 139,
            "y": 22
          },
          {
            "text": "p=(A'B)'",
            "x": 254,
            "y": 40
          },
          {
            "text": "q=(AC)'",
            "x": 254,
            "y": 126
          }
        ],
        "output": {
          "label": "F = (A+B)(A'+C)",
          "x": 405,
          "y": 77
        }
      }
    },
    {
      "id": "PQ-08",
      "number": "Question 08",
      "difficulty": "Advanced",
      "category": "Mixed Network",
      "question": "A student implements F = (AB + C)' using a mixed network of two NAND gates and one NOR gate from uncomplemented inputs. Show the step-by-step signals and logic depth.",
      "hint": "First form (AB)' with NAND, restore polarity to AB with a NAND inverter, then use NOR to add C and invert.",
      "steps": [
        "Correct implementation: Gate 1 computes p = (AB)' (NAND). Gate 2 inverts p to q = (pp)' = AB (NAND inverter). Gate 3 computes F = (q + C)' = (AB + C)' (NOR). This matches the target function.",
        "Proposed modification: Omit Gate 2 and feed p = (AB)' directly to Gate 3.",
        "Modified output: F_mod = NOR(p, C) = (p + C)' = [ (AB)' + C ]'.",
        "Applying De Morgan's theorem to F_mod: [ (AB)' + C ]' = (AB)'' · C' = AB · C' = ABC'.",
        "Comparison: Target function is (AB + C)' = (AB)' · C' = (A' + B')C' = A'C' + B'C'.",
        "For input A=0, B=0, C=0: Target F = (0 + 0)' = 1. Modified F_mod = 0 · 0 · 1 = 0.",
        "The outputs disagree! Removing the middle inverter alters the Boolean function completely."
      ],
      "answer": "Step 1 (Level 1): p = NAND(A, B) = (AB)'.\nStep 2 (Level 2): q = NAND(p, p) = AB.\nStep 3 (Level 3): F = NOR(q, C) = (q + C)' = (AB + C)'.\nTotal gates: 2 NAND + 1 NOR = 3 gates; Logic depth: 3 levels.",
      "takeaway": "Intermediate inverters in mixed gate networks maintain correct polarity alignment and cannot be arbitrarily removed.",
      "circuit": {
        "width": 460,
        "height": 130,
        "inputs": [
          {
            "id": "A",
            "label": "A",
            "x": 25,
            "y": 30
          },
          {
            "id": "B",
            "label": "B",
            "x": 25,
            "y": 48
          },
          {
            "id": "C",
            "label": "C",
            "x": 25,
            "y": 95
          }
        ],
        "gates": [
          {
            "id": "N1",
            "type": "NAND",
            "x": 90,
            "y": 25,
            "label": "N1",
            "level": 1,
            "inputs": [
              "A",
              "B"
            ],
            "out": "p"
          },
          {
            "id": "N2",
            "type": "NAND",
            "x": 210,
            "y": 25,
            "label": "N2",
            "level": 2,
            "inputs": [
              "p",
              "p"
            ],
            "out": "q"
          },
          {
            "id": "R1",
            "type": "NOR",
            "x": 320,
            "y": 50,
            "label": "R1",
            "level": 3,
            "inputs": [
              "q",
              "C"
            ],
            "out": "F"
          }
        ],
        "wires": [
          {
            "id": "w1",
            "from": "A",
            "to": "N1.in1",
            "d": "M 25 30 L 90 30",
            "net": "A"
          },
          {
            "id": "w2",
            "from": "B",
            "to": "N1.in2",
            "d": "M 25 48 L 90 48",
            "net": "B"
          },
          {
            "id": "w3",
            "from": "N1.out",
            "to": "j1",
            "d": "M 133 37 L 165 37",
            "net": "p"
          },
          {
            "id": "w4",
            "from": "j1",
            "to": "N2.in1",
            "d": "M 165 37 L 165 32 L 210 32",
            "net": "p"
          },
          {
            "id": "w5",
            "from": "j1",
            "to": "N2.in2",
            "d": "M 165 37 L 165 42 L 210 42",
            "net": "p"
          },
          {
            "id": "w6",
            "from": "N2.out",
            "to": "R1.in1",
            "d": "M 253 37 L 285 37 L 285 58 L 320 58",
            "net": "q"
          },
          {
            "id": "w7",
            "from": "C",
            "to": "R1.in2",
            "d": "M 25 95 L 285 95 L 285 72 L 320 72",
            "net": "C"
          },
          {
            "id": "w8",
            "from": "R1.out",
            "to": "F",
            "d": "M 360 65 L 400 65",
            "net": "F"
          }
        ],
        "junctions": [
          {
            "x": 165,
            "y": 37,
            "r": 3.5
          }
        ],
        "labels": [
          {
            "text": "p=(AB)'",
            "x": 138,
            "y": 24
          },
          {
            "text": "q=AB",
            "x": 258,
            "y": 24
          }
        ],
        "output": {
          "label": "F = (AB + C)'",
          "x": 405,
          "y": 65
        }
      }
    },
    {
      "id": "PQ-09",
      "number": "Question 09",
      "difficulty": "Challenging",
      "category": "Multi-Level Depth",
      "question": "For the factored expression F = (AB + C)D + E synthesized with strictly 2-input NAND gates from uncomplemented inputs, calculate the required gate count and critical-path logic depth.",
      "hint": "Because C and E are uncomplemented primary inputs being ORed, they each require a NAND inverter at Level 1.",
      "steps": [
        "Gate network: N1=NAND(A,B), N2=NAND(C,C), N3=NAND(N1,N2), N4=NAND(N3,D), N5=NAND(E,E), F=NAND(N4,N5).",
        "Level 1: N1 (inputs A, B), N2 (input C), N5 (input E). Path depth = 1 gate.",
        "Level 2: N3 depends on N1 and N2. Path depth = 2 gates (A,B → N1 → N3).",
        "Level 3: N4 depends on N3 and D. Path depth = 3 gates (A,B → N1 → N3 → N4).",
        "Level 4: F depends on N4 and N5. Path depth = 4 gates (A,B → N1 → N3 → N4 → F).",
        "Critical path: Input A (or B) → N1 → N3 → N4 → F (4 gates in series).",
        "Total physical gates instantiated: 6 NAND gates."
      ],
      "answer": "Step 1 (Level 1): p = NAND(A, B) = (AB)', u = NAND(C, C) = C', v = NAND(E, E) = E'.\nStep 2 (Level 2): q = NAND(p, u) = AB + C.\nStep 3 (Level 3): r = NAND(q, D) = ((AB + C)D)'.\nStep 4 (Level 4): F = NAND(r, v) = (AB + C)D + E.\nTotal gates: 6 NAND gates; Logic depth: 4 levels.",
      "takeaway": "The critical path dictates propagation delay; parallel gates (like N2 and N5) do not add to the critical depth.",
      "circuit": {
        "width": 560,
        "height": 180,
        "inputs": [
          {
            "id": "A",
            "label": "A",
            "x": 20,
            "y": 25
          },
          {
            "id": "B",
            "label": "B",
            "x": 20,
            "y": 45
          },
          {
            "id": "C",
            "label": "C",
            "x": 20,
            "y": 75
          },
          {
            "id": "D",
            "label": "D",
            "x": 20,
            "y": 115
          },
          {
            "id": "E",
            "label": "E",
            "x": 20,
            "y": 150
          }
        ],
        "gates": [
          {
            "id": "G1",
            "type": "NAND",
            "x": 80,
            "y": 20,
            "label": "G1",
            "level": 1,
            "stage": 0,
            "inputs": [
              "A",
              "B"
            ],
            "out": "p"
          },
          {
            "id": "Gu",
            "type": "NAND",
            "x": 80,
            "y": 65,
            "label": "Gu",
            "level": 1,
            "stage": 0,
            "inputs": [
              "C",
              "C"
            ],
            "out": "u"
          },
          {
            "id": "Gv",
            "type": "NAND",
            "x": 80,
            "y": 140,
            "label": "Gv",
            "level": 1,
            "stage": 0,
            "inputs": [
              "E",
              "E"
            ],
            "out": "v"
          },
          {
            "id": "G2",
            "type": "NAND",
            "x": 200,
            "y": 42,
            "label": "G2",
            "level": 2,
            "stage": 1,
            "inputs": [
              "p",
              "u"
            ],
            "out": "q"
          },
          {
            "id": "G3",
            "type": "NAND",
            "x": 310,
            "y": 75,
            "label": "G3",
            "level": 3,
            "stage": 2,
            "inputs": [
              "q",
              "D"
            ],
            "out": "r"
          },
          {
            "id": "G4",
            "type": "NAND",
            "x": 420,
            "y": 105,
            "label": "G4",
            "level": 4,
            "stage": 3,
            "inputs": [
              "r",
              "v"
            ],
            "out": "F"
          }
        ],
        "wires": [
          {
            "id": "w1",
            "from": "A",
            "to": "G1.in1",
            "d": "M 20 25 L 80 25",
            "net": "A"
          },
          {
            "id": "w2",
            "from": "B",
            "to": "G1.in2",
            "d": "M 20 45 L 50 45 L 50 37 L 80 37",
            "net": "B"
          },
          {
            "id": "w3",
            "from": "C",
            "to": "j1",
            "d": "M 20 75 L 50 75",
            "net": "C"
          },
          {
            "id": "w4",
            "from": "j1",
            "to": "Gu.in1",
            "d": "M 50 75 L 50 70 L 80 70",
            "net": "C"
          },
          {
            "id": "w5",
            "from": "j1",
            "to": "Gu.in2",
            "d": "M 50 75 L 50 80 L 80 80",
            "net": "C"
          },
          {
            "id": "w6",
            "from": "E",
            "to": "j2",
            "d": "M 20 150 L 50 150",
            "net": "E"
          },
          {
            "id": "w7",
            "from": "j2",
            "to": "Gv.in1",
            "d": "M 50 150 L 50 145 L 80 145",
            "net": "E"
          },
          {
            "id": "w8",
            "from": "j2",
            "to": "Gv.in2",
            "d": "M 50 150 L 50 155 L 80 155",
            "net": "E"
          },
          {
            "id": "w9",
            "from": "G1.out",
            "to": "G2.in1",
            "d": "M 123 32 L 160 32 L 160 49 L 200 49",
            "net": "p"
          },
          {
            "id": "w10",
            "from": "Gu.out",
            "to": "G2.in2",
            "d": "M 123 77 L 160 77 L 160 60 L 200 60",
            "net": "u"
          },
          {
            "id": "w11",
            "from": "G2.out",
            "to": "G3.in1",
            "d": "M 243 55 L 275 55 L 275 82 L 310 82",
            "net": "q"
          },
          {
            "id": "w12",
            "from": "D",
            "to": "G3.in2",
            "d": "M 20 115 L 275 115 L 275 93 L 310 93",
            "net": "D"
          },
          {
            "id": "w13",
            "from": "G3.out",
            "to": "G4.in1",
            "d": "M 353 87 L 385 87 L 385 112 L 420 112",
            "net": "r"
          },
          {
            "id": "w14",
            "from": "Gv.out",
            "to": "G4.in2",
            "d": "M 123 152 L 385 152 L 385 123 L 420 123",
            "net": "v"
          },
          {
            "id": "w15",
            "from": "G4.out",
            "to": "F",
            "d": "M 463 117 L 500 117",
            "net": "F"
          }
        ],
        "junctions": [
          {
            "x": 50,
            "y": 75,
            "r": 3.5
          },
          {
            "x": 50,
            "y": 150,
            "r": 3.5
          }
        ],
        "labels": [
          {
            "text": "p=(AB)'",
            "x": 139,
            "y": 25
          },
          {
            "text": "u=C'",
            "x": 139,
            "y": 70
          },
          {
            "text": "v=E'",
            "x": 139,
            "y": 145
          },
          {
            "text": "q=AB+C",
            "x": 259,
            "y": 48
          },
          {
            "text": "r",
            "x": 369,
            "y": 80
          }
        ],
        "output": {
          "label": "F = (AB+C)D+E",
          "x": 505,
          "y": 117
        }
      }
    },
    {
      "id": "PQ-10",
      "number": "Question 10",
      "difficulty": "Challenging",
      "category": "Exclusive Gate Limits",
      "question": "Prove that synthesizing Exclusive-OR (A ⊕ B) from uncomplemented inputs requires 4 NAND gates (3 levels), whereas Exclusive-NOR (A ⊙ B) can be implemented in 5 NAND gates and 3 logic levels.",
      "hint": "For XNOR, rather than cascading a 4th inverter after XOR (which would give 4 levels), use 3 Level 1 gates (A', B', (AB)'), one Level 2 gate (A + B), and combine them at Level 3.",
      "steps": [
        "Flat SOP for XOR: A'B + AB'. Expanding directly with 2-level NAND requires 2 inverters (A', B'), 2 product NANDs, and 1 output NAND = 5 gates.",
        "However, algebraic factoring reveals: A'B + AB' = (A + B)(AB)' = [ A(AB)' ]' · [ B(AB)' ]'.",
        "By sharing the central term p = (AB)', Gate 1 computes p, Gate 2 computes q = (Ap)', Gate 3 computes r = (Bp)', and Gate 4 computes F = (qr)' = A ⊕ B.",
        "This achieves XOR with exactly 4 two-input NAND gates.",
        "Because the 4-gate core outputs XOR, obtaining XNOR (A ⊙ B = (A ⊕ B)') requires inverting the core output with a 5th tied-input NAND gate.",
        "Thus, XNOR requires 5 NAND gates in this shared-signal topology."
      ],
      "answer": "XOR: Requires 4 NAND gates in 3 levels (p = (AB)', q = (A · p)', r = (B · p)', F = (q · r)' = A ⊕ B).\nXNOR: Optimal 3-level synthesis uses 5 NAND gates:\nLevel 1: p = NAND(A, A) = A', q = NAND(B, B) = B', r = NAND(A, B) = (AB)'.\nLevel 2: s = NAND(p, q) = A + B.\nLevel 3: F = NAND(r, s) = ((AB)'(A + B))' = AB + A'B' = A ⊙ B.\nTotal gates: 5 NAND gates; Logic depth: 3 levels.",
      "takeaway": "Shared intermediate signals enable gate savings, while duality shifts the extra inverter between XOR and XNOR.",
      "circuit": {
        "width": 480,
        "height": 160,
        "inputs": [
          {
            "id": "A",
            "label": "A",
            "x": 25,
            "y": 40
          },
          {
            "id": "B",
            "label": "B",
            "x": 25,
            "y": 110
          }
        ],
        "gates": [
          {
            "id": "G1",
            "type": "NAND",
            "x": 90,
            "y": 15,
            "label": "G1",
            "level": 1,
            "inputs": [
              "A",
              "A"
            ],
            "out": "p"
          },
          {
            "id": "G2",
            "type": "NAND",
            "x": 90,
            "y": 65,
            "label": "G2",
            "level": 1,
            "inputs": [
              "A",
              "B"
            ],
            "out": "r"
          },
          {
            "id": "G3",
            "type": "NAND",
            "x": 90,
            "y": 115,
            "label": "G3",
            "level": 1,
            "inputs": [
              "B",
              "B"
            ],
            "out": "q"
          },
          {
            "id": "G4",
            "type": "NAND",
            "x": 220,
            "y": 65,
            "label": "G4",
            "level": 2,
            "inputs": [
              "p",
              "q"
            ],
            "out": "s"
          },
          {
            "id": "G5",
            "type": "NAND",
            "x": 350,
            "y": 65,
            "label": "G5",
            "level": 3,
            "inputs": [
              "r",
              "s"
            ],
            "out": "F"
          }
        ],
        "wires": [
          {
            "id": "w1",
            "from": "A",
            "to": "j1",
            "d": "M 25 40 L 50 40",
            "net": "A"
          },
          {
            "id": "w2",
            "from": "j1",
            "to": "j1a",
            "d": "M 50 40 L 50 25",
            "net": "A"
          },
          {
            "id": "w3",
            "from": "j1a",
            "to": "G1.in1",
            "d": "M 50 25 L 50 20 L 90 20",
            "net": "A"
          },
          {
            "id": "w4",
            "from": "j1a",
            "to": "G1.in2",
            "d": "M 50 25 L 50 30 L 90 30",
            "net": "A"
          },
          {
            "id": "w5",
            "from": "j1",
            "to": "G2.in1",
            "d": "M 50 40 L 50 72 L 90 72",
            "net": "A"
          },
          {
            "id": "w6",
            "from": "B",
            "to": "j2",
            "d": "M 25 110 L 50 110",
            "net": "B"
          },
          {
            "id": "w7",
            "from": "j2",
            "to": "G2.in2",
            "d": "M 50 110 L 50 83 L 90 83",
            "net": "B"
          },
          {
            "id": "w8",
            "from": "j2",
            "to": "j2a",
            "d": "M 50 110 L 50 125",
            "net": "B"
          },
          {
            "id": "w9",
            "from": "j2a",
            "to": "G3.in1",
            "d": "M 50 125 L 50 120 L 90 120",
            "net": "B"
          },
          {
            "id": "w10",
            "from": "j2a",
            "to": "G3.in2",
            "d": "M 50 125 L 50 130 L 90 130",
            "net": "B"
          },
          {
            "id": "w11",
            "from": "G1.out",
            "to": "G4.in1",
            "d": "M 133 27 L 175 27 L 175 72 L 220 72",
            "net": "p"
          },
          {
            "id": "w12",
            "from": "G3.out",
            "to": "G4.in2",
            "d": "M 133 127 L 175 127 L 175 83 L 220 83",
            "net": "q"
          },
          {
            "id": "w13",
            "from": "G2.out",
            "to": "G5.in1",
            "d": "M 133 77 L 180 77 L 180 45 L 305 45 L 305 72 L 350 72",
            "net": "r"
          },
          {
            "id": "w14",
            "from": "G4.out",
            "to": "G5.in2",
            "d": "M 263 77 L 350 77",
            "net": "s"
          },
          {
            "id": "w15",
            "from": "G5.out",
            "to": "F",
            "d": "M 393 77 L 440 77",
            "net": "F"
          }
        ],
        "junctions": [
          {
            "id": "j1",
            "x": 50,
            "y": 40,
            "r": 3.5
          },
          {
            "id": "j1a",
            "x": 50,
            "y": 25,
            "r": 3.5
          },
          {
            "id": "j2",
            "x": 50,
            "y": 110,
            "r": 3.5
          },
          {
            "id": "j2a",
            "x": 50,
            "y": 125,
            "r": 3.5
          }
        ],
        "labels": [
          {
            "text": "p=A'",
            "x": 149,
            "y": 20
          },
          {
            "text": "r=(AB)'",
            "x": 149,
            "y": 70
          },
          {
            "text": "q=B'",
            "x": 149,
            "y": 140
          },
          {
            "text": "s=A+B",
            "x": 279,
            "y": 65
          }
        ],
        "output": {
          "label": "F = A ⊙ B",
          "x": 445,
          "y": 77
        }
      }
    }
  ]
};
export default dldSection27Data;
