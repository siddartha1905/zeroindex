/**
 * Digital Logic Design (DLD) - Section 1.7: Logic Gates & Circuit Primitives
 * Strictly zero em-dashes (\u2014) or en-dashes (\u2013).
 * Descriptive concept tags only. Zero university names or exam years.
 * Focuses exclusively on fundamental logic gates; advanced Boolean algebra reserved for Unit 2.
 */

export const section17Data = {
  id: "1.7",
  number: "1.7",
  title: "Logic Gates & Circuit Primitives",
  badge: "Hardware Building Blocks",
  estimatedReadTime: "25 min read",
  dataScienceConnection: "Every tensor processing unit (TPU), GPU streaming multiprocessor, and neural accelerator is physically constructed from billions of interconnected logic gates. In 1969, Marvin Minsky and Seymour Papert proved that a single-layer perceptron could not learn the non-linearly separable XOR gate function, creating the historic AI winter until multi-layer neural networks solved non-linear classification.",

  // =========================================================================
  // TAB 1: OVERVIEW & LIVE GATE SIMULATOR DATA
  // =========================================================================
  overviewGates: {
    title: "The Physical Substrate of Digital Computation",
    subtitle: "What is a Logic Gate?",
    introParagraph: "A logic gate is an elementary physical electronic circuit that makes logical decisions based on the combination of digital signals present at its inputs. In digital hardware, these binary signals correspond to discrete physical voltage ranges: Logic 0 is represented by LOW voltage (nominally 0V, or 0.0V to 0.8V in TTL silicon), and Logic 1 is represented by HIGH voltage (nominally +5V, or 2.0V to 5.0V in TTL silicon).",
    
    voltageStandards: [
      {
        standard: "TTL (Transistor-Transistor Logic)",
        logic0: "0.0V to 0.8V (Nominal 0V)",
        logic1: "2.0V to 5.0V (Nominal +5V)",
        forbidden: "0.8V to 2.0V (Forbidden transition band / Undefined)",
        note: "Classic 7400-series bipolar technology."
      },
      {
        standard: "CMOS (3.3V LVCMOS)",
        logic0: "0.0V to 0.8V",
        logic1: "2.0V to 3.3V",
        forbidden: "0.8V to 2.0V",
        note: "Modern low-power digital microcontrollers and FPGAs."
      }
    ],

    families: [
      {
        id: "basic",
        name: "Basic Gates",
        badge: "Core Foundations",
        color: "#2E6F40",
        description: "The three primary logic primitives: Inversion (NOT), Logical Conjunction (AND), and Logical Disjunction (OR). Any combinatorial circuit can theoretically be described using these three fundamental operations.",
        gates: ["NOT", "AND", "OR"]
      },
      {
        id: "universal",
        name: "Universal Gates",
        badge: "Silicon Primitives",
        color: "#4F46E5",
        description: "NAND and NOR gates are functionally complete. Any arbitrary Boolean function or digital circuit can be fabricated using exclusively NAND gates or exclusively NOR gates, without requiring any other gate type.",
        gates: ["NAND", "NOR"]
      },
      {
        id: "special",
        name: "Exclusive / Parity Gates",
        badge: "Arithmetic & Parity",
        color: "#D97706",
        description: "XOR (Exclusive-OR) and XNOR (Exclusive-NOR) are arithmetic and comparison primitives. XOR acts as an inequality detector and odd-parity generator, while XNOR acts as an equality comparator and even-parity generator.",
        gates: ["XOR", "XNOR"]
      }
    ],

    // Master definitions for the 7 gates (used by LiveGateExplorer)
    allSevenGates: [
      {
        id: "NOT",
        name: "NOT Gate (Inverter)",
        ic: "IC 7404",
        family: "Basic",
        inputs: 1,
        expression: "Y = NOT A = A'",
        equationLatex: "Y = \\overline{A}",
        rule: "Output is the exact opposite of input: 0 becomes 1, and 1 becomes 0.",
        evalFn: (a, b) => (a === 0 ? 1 : 0),
        reasonFn: (a, b) => `Input A is ${a}, so inverted Output Y is ${a === 0 ? 1 : 0}.`
      },
      {
        id: "AND",
        name: "AND Gate",
        ic: "IC 7408",
        family: "Basic",
        inputs: 2,
        expression: "Y = A . B",
        equationLatex: "Y = A \\cdot B",
        rule: "Output is 1 ONLY when ALL inputs are 1. Any 0 forces output to 0.",
        evalFn: (a, b) => (a === 1 && b === 1 ? 1 : 0),
        reasonFn: (a, b) => (a === 1 && b === 1 
          ? "Both inputs A and B are 1: Output is HIGH (1)." 
          : `At least one input is 0 (A=${a}, B=${b}): Output is forced to LOW (0).`)
      },
      {
        id: "OR",
        name: "OR Gate",
        ic: "IC 7432",
        family: "Basic",
        inputs: 2,
        expression: "Y = A + B",
        equationLatex: "Y = A + B",
        rule: "Output is 1 when ANY input is 1. Output is 0 ONLY when all inputs are 0.",
        evalFn: (a, b) => (a === 1 || b === 1 ? 1 : 0),
        reasonFn: (a, b) => (a === 0 && b === 0 
          ? "Both inputs are 0: Output is LOW (0)." 
          : `At least one input is 1 (A=${a}, B=${b}): Output is HIGH (1).`)
      },
      {
        id: "NAND",
        name: "NAND Gate",
        ic: "IC 7400",
        family: "Universal",
        inputs: 2,
        expression: "Y = (A . B)'",
        equationLatex: "Y = \\overline{A \\cdot B}",
        rule: "Inverted AND: Output is 0 ONLY when ALL inputs are 1. Any 0 gives output 1.",
        evalFn: (a, b) => (!(a === 1 && b === 1) ? 1 : 0),
        reasonFn: (a, b) => (a === 1 && b === 1 
          ? "Both inputs are 1: Output is LOW (0)." 
          : `At least one input is 0 (A=${a}, B=${b}): Output is HIGH (1).`)
      },
      {
        id: "NOR",
        name: "NOR Gate",
        ic: "IC 7402",
        family: "Universal",
        inputs: 2,
        expression: "Y = (A + B)'",
        equationLatex: "Y = \\overline{A + B}",
        rule: "Inverted OR: Output is 1 ONLY when ALL inputs are 0. Any 1 pulls output to 0.",
        evalFn: (a, b) => (a === 0 && b === 0 ? 1 : 0),
        reasonFn: (a, b) => (a === 0 && b === 0 
          ? "Both inputs are 0: Output is HIGH (1)." 
          : `At least one input is 1 (A=${a}, B=${b}): Output is forced to LOW (0).`)
      },
      {
        id: "XOR",
        name: "XOR Gate (Exclusive-OR)",
        ic: "IC 7486",
        family: "Exclusive",
        inputs: 2,
        expression: "Y = A (+) B = A'B + AB'",
        equationLatex: "Y = A \\oplus B",
        rule: "Inequality Detector: Output is 1 when inputs are DIFFERENT. 0 when equal.",
        evalFn: (a, b) => (a !== b ? 1 : 0),
        reasonFn: (a, b) => (a !== b 
          ? `Inputs differ (A=${a}, B=${b}): Inequality detected -> Output is HIGH (1).` 
          : `Inputs are identical (A=B=${a}): Output is LOW (0).`)
      },
      {
        id: "XNOR",
        name: "XNOR Gate (Equivalence)",
        ic: "IC 74266",
        family: "Exclusive",
        inputs: 2,
        expression: "Y = (A (+) B)' = AB + A'B'",
        equationLatex: "Y = A \\odot B",
        rule: "Equality Detector: Output is 1 when inputs are EQUAL. 0 when different.",
        evalFn: (a, b) => (a === b ? 1 : 0),
        reasonFn: (a, b) => (a === b 
          ? `Inputs are identical (A=B=${a}): Equality detected -> Output is HIGH (1).` 
          : `Inputs differ (A=${a}, B=${b}): Output is LOW (0).`)
      }
    ]
  },

  // =========================================================================
  // TAB 2: 1.7A BASIC GATES (NOT, AND, OR)
  // =========================================================================
  basicGatesData: {
    notGate: {
      id: "not",
      name: "NOT Gate (Inverter)",
      icNumber: "IC 7404 (Hex Inverter: 6 Independent Gates per IC)",
      symbolDescription: "Triangle pointing right with an inversion bubble (circle) at the output vertex.",
      equationLatex: "Y = \\overline{A} \\quad \\text{or} \\quad Y = A'",
      description: "The simplest logic gate. It accepts a single binary input and generates its logical complement. The small circle (bubble) at the output physically symbolizes logical negation or inversion.",
      
      switchCircuit: {
        type: "shunt",
        title: "Shunt (Bypass) Switch & Lamp Analogy",
        explanation: "A mechanical switch A connected in parallel (shunt) across the lamp with a series current-limiting resistor R. When switch A is OPEN (A = 0), current cannot pass through the switch, so it flows entirely through the lamp, lighting it ON (Y = 1). When switch A is CLOSED (A = 1), it provides a near-zero resistance short-circuit path to ground, bypassing the lamp and starving it of current, turning it OFF (Y = 0)."
      },

      truthTable2: [
        { a: 0, y: 1, state: "A = 0 (LOW / 0V) -> Y = 1 (HIGH / +5V)" },
        { a: 1, y: 0, state: "A = 1 (HIGH / +5V) -> Y = 0 (LOW / 0V)" }
      ],

      keyProperties: [
        {
          title: "Double Inversion (Involution Law)",
          formula: "NOT(NOT A) = A",
          desc: "Passing a binary signal through two consecutive inverters restores the original signal exactly: A'' = A. In digital design, two cascaded inverters form a Non-Inverting Buffer used to restore signal voltage and boost driving current."
        },
        {
          title: "Propagation Delay (tpd)",
          formula: "tpd nominally 5 ns to 10 ns for TTL",
          desc: "Output does not change instantaneously with input. The finite physical time required for transistors to switch from saturation to cutoff introduces a propagation delay tpd."
        }
      ],

      workedModels: [
        {
          id: "wm-not-1",
          title: "Model 1: Single Inverter Pulse Evaluation",
          conceptTag: "Signal Inversion",
          problem: "An alternating 4-bit pulse sequence A = [0, 1, 0, 1] is applied sequentially to the input of an IC 7404 NOT gate. Determine the corresponding output sequence Y.",
          solutionSteps: [
            "Step 1: Write down the functional equation of the NOT gate: Y = NOT A = A'.",
            "Step 2: Invert each bit sequentially:",
            "  Bit 0: A = 0 -> Y = 0' = 1",
            "  Bit 1: A = 1 -> Y = 1' = 0",
            "  Bit 2: A = 0 -> Y = 0' = 1",
            "  Bit 3: A = 1 -> Y = 1' = 0",
            "Step 3: Collect the resulting output bits: Y = [1, 0, 1, 0]."
          ],
          finalAnswer: "Output Sequence Y = [1, 0, 1, 0]",
          verification: "Every bit is inverted: [0, 1, 0, 1] inverted is [1, 0, 1, 0]. Verified."
        },
        {
          id: "wm-not-2",
          title: "Model 2: Cascaded Inverter Chain (Buffer Analysis)",
          conceptTag: "Double Inversion Chain",
          problem: "A logic signal X is passed through an odd chain of 5 cascaded NOT gates. If X = 1, determine the final output Z. How does the behavior differ if 6 NOT gates are used instead?",
          solutionSteps: [
            "Step 1: Evaluate a chain of n inverters: Output = X if n is EVEN; Output = X' if n is ODD.",
            "Step 2: For n = 5 (odd number of inverters):",
            "  Gate 1 output: 1' = 0",
            "  Gate 2 output: 0' = 1",
            "  Gate 3 output: 1' = 0",
            "  Gate 4 output: 0' = 1",
            "  Gate 5 output: 1' = 0",
            "  Therefore, Z = 0 (Inverted).",
            "Step 3: For n = 6 (even number of inverters):",
            "  Gate 6 output: 0' = 1 = X (Original Signal Restored).",
            "Step 4: An even chain of inverters acts as a non-inverting buffer, preserving logic while boosting fan-out capacity."
          ],
          finalAnswer: "For 5 inverters: Z = 0. For 6 inverters: Z = 1 (Buffer restored).",
          verification: "Odd count inverts: 5 is odd -> 1' = 0. Even count restores: 6 is even -> 1. Verified."
        },
        {
          id: "wm-not-3",
          title: "Model 3: Shunt Switch Electrical Current Analysis",
          conceptTag: "Electrical Equivalence",
          problem: "In the electrical shunt switch circuit of a NOT gate, the DC supply voltage is VCC = 5V and resistor R = 330 ohms. The lamp has internal resistance Rlamp = 100 ohms. Calculate the current through the lamp when: (a) Switch is open (A=0), and (b) Switch is closed (A=1, assume ideal 0 ohm switch).",
          solutionSteps: [
            "Step 1: When Switch is OPEN (A = 0):",
            "  The switch branch has infinite resistance (open circuit).",
            "  Current flows through R and Rlamp in series: Rtotal = R + Rlamp = 330 + 100 = 430 ohms.",
            "  Ilamp = VCC / Rtotal = 5V / 430 ohms = 11.63 mA. The lamp lights ON (Y = 1).",
            "Step 2: When Switch is CLOSED (A = 1):",
            "  The closed switch branch has 0 ohms resistance directly in parallel with Rlamp.",
            "  Equivalent resistance of switch and lamp = (0 * 100) / (0 + 100) = 0 ohms.",
            "  All current from R flows through the switch: Iswitch = 5V / 330 ohms = 15.15 mA.",
            "  Current through lamp Ilamp = 0 mA. The lamp is completely OFF (Y = 0)."
          ],
          finalAnswer: "(a) Ilamp = 11.63 mA (Lamp ON, Y=1); (b) Ilamp = 0 mA (Lamp OFF, Y=0)",
          verification: "Shunt switch diverts 100% of current away from lamp when closed. Matches NOT truth table."
        },
        {
          id: "wm-not-4",
          title: "Model 4: Ring Oscillator Frequency from Inverter Delay",
          conceptTag: "Propagation Delay",
          problem: "A 3-stage ring oscillator is constructed by connecting 3 NOT gates in a closed feedback loop. If each NOT gate has an average propagation delay of tpd = 8 ns, calculate the oscillation frequency f of the circuit.",
          solutionSteps: [
            "Step 1: In an odd-number ring of n inverters, a single signal transition must travel through all n inverters twice to complete one full cycle (one HIGH-to-LOW trip and one LOW-to-HIGH trip).",
            "Step 2: Write the formula for the oscillation time period T:",
            "  T = 2 * n * tpd",
            "Step 3: Substitute n = 3 and tpd = 8 ns:",
            "  T = 2 * 3 * 8 ns = 48 ns = 48 * 10^-9 seconds.",
            "Step 4: Compute the frequency f = 1 / T:",
            "  f = 1 / (48 * 10^-9) = 20.83 MHz."
          ],
          finalAnswer: "Period T = 48 ns, Oscillation Frequency f = 20.83 MHz",
          verification: "T = 2 * 3 * 8ns = 48ns. f = 1 / 48ns = 20.833 MHz. Verified."
        }
      ],

      practiceProblems: [
        {
          id: "pr-not-1",
          difficulty: "Easy",
          conceptTag: "Truth Table Evaluation",
          question: "What is the output of an inverter when its input is connected to +5V (Logic 1)?",
          options: ["+5V (Logic 1)", "0V (Logic 0)", "2.5V (High Impedance)", "-5V (Negative Voltage)"],
          correctIndex: 1,
          solution: "A NOT gate inverts the logic level. An input of Logic 1 (+5V) produces Logic 0 (0V) at the output."
        },
        {
          id: "pr-not-2",
          difficulty: "Easy",
          conceptTag: "Inverter Cascading",
          question: "If an input signal bit X = 0 is fed into a cascade of 7 NOT gates in series, what is the final output bit?",
          options: ["0", "1", "High Impedance", "Undefined"],
          correctIndex: 1,
          solution: "Since 7 is an odd integer, the overall chain inverts the signal: Output = NOT(0) = 1."
        },
        {
          id: "pr-not-3",
          difficulty: "Medium",
          conceptTag: "Shunt Switch Behavior",
          question: "In the electrical switch equivalent of a NOT gate, why must a resistor R be placed in series between VCC and the switch?",
          options: [
            "To speed up the switching time of the lamp",
            "To prevent a direct short-circuit between VCC and Ground when the switch is closed",
            "To double the voltage delivered to the lamp",
            "To invert the input polarity"
          ],
          correctIndex: 1,
          solution: "When switch A closes (A = 1), it connects directly to ground. Resistor R drops the full VCC voltage safely, limiting current and preventing a power-supply dead short."
        },
        {
          id: "pr-not-4",
          difficulty: "Medium",
          conceptTag: "Ring Oscillator",
          question: "Why can a ring oscillator NOT be constructed using an EVEN number of inverters (e.g., 4 NOT gates)?",
          options: [
            "Even chains have zero propagation delay",
            "An even chain creates a stable bi-stable latch (memory state) and locks up without oscillating",
            "Even chains burn out the IC package due to excessive heat",
            "The output voltage drops below the 0.8V TTL threshold"
          ],
          correctIndex: 1,
          solution: "An even number of inverters has positive feedback (A'' = A). It latches into one stable state (0 or 1) and holds it permanently, acting as a static RAM cell rather than an oscillator."
        },
        {
          id: "pr-not-5",
          difficulty: "Hard",
          conceptTag: "Floating TTL Input",
          question: "If the input pin of a standard TTL 7404 NOT gate is left floating (unconnected), what state does it assume, and what will the output voltage be?",
          options: [
            "Input floats to LOW (0); Output is HIGH (+5V)",
            "Input floats to HIGH (1); Output is LOW (nominally 0V to 0.4V)",
            "Input oscillates randomly between 0V and 5V",
            "Output stays at 2.5V permanently"
          ],
          correctIndex: 1,
          solution: "Standard bipolar TTL inputs internally source current from VCC through the base-emitter junction. An unconnected pin floats to a HIGH logic state (1). Therefore, the NOT gate inverts it and pulls output to LOW (0)."
        },
        {
          id: "pr-not-6",
          difficulty: "Hard",
          conceptTag: "Propagation Delay Chain",
          question: "A pulse of width 4 ns is sent into a NOT gate with tpd = 7 ns. What happens to the pulse in physical silicon?",
          options: [
            "The pulse is perfectly inverted and stretched to 14 ns",
            "The pulse is rejected or heavily attenuated because pulse width is shorter than the gate propagation delay",
            "The gate catches fire due to excessive slew rate",
            "The pulse frequency doubles automatically"
          ],
          correctIndex: 1,
          solution: "When an input pulse width is narrower than the gate's internal propagation delay (switching time), internal transistors cannot fully turn on or off before the pulse ends. The pulse is severely attenuated or completely suppressed (glitch filtering)."
        }
      ]
    },

    andGate: {
      id: "and",
      name: "AND Gate (Logical Multiplication)",
      icNumber: "IC 7408 (Quad 2-Input AND: 4 Independent Gates per IC)",
      symbolDescription: "Flat back on the input side with a rounded semicircular curve on the output side.",
      equationLatex: "Y = A \\cdot B \\quad \\text{or} \\quad Y = AB",
      description: "An AND gate implements logical conjunction. The output is HIGH (1) if and only if all inputs are simultaneously HIGH (1). If any input is LOW (0), the output is immediately forced LOW (0).",

      switchCircuit: {
        type: "series",
        title: "Series Switches & Lamp Analogy",
        explanation: "Two mechanical switches A and B connected in SERIES between the power supply and the lamp. For electrical current to complete the circuit and illuminate the lamp (Y = 1), Switch A MUST be closed AND Switch B MUST be closed simultaneously. If either switch is open (or both are open), the circuit is broken and the lamp remains dark (Y = 0)."
      },

      truthTable2: [
        { a: 0, b: 0, y: 0, state: "Both OFF -> Lamp OFF" },
        { a: 0, b: 1, y: 0, state: "A is OFF -> Lamp OFF" },
        { a: 1, b: 0, y: 0, state: "B is OFF -> Lamp OFF" },
        { a: 1, b: 1, y: 1, state: "Both ON -> Lamp ON (Only 1 in row 4)" }
      ],

      truthTable3: [
        { a: 0, b: 0, c: 0, y: 0 },
        { a: 0, b: 0, c: 1, y: 0 },
        { a: 0, b: 1, c: 0, y: 0 },
        { a: 0, b: 1, c: 1, y: 0 },
        { a: 1, b: 0, c: 0, y: 0 },
        { a: 1, b: 0, c: 1, y: 0 },
        { a: 1, b: 1, c: 0, y: 0 },
        { a: 1, b: 1, c: 1, y: 1 }
      ],

      controlMasking: {
        title: "Enable / Inhibit (Control Masking) Property",
        rule1: "When Control EN = 1: Y = A . 1 = A (Gate is ENABLED; data A passes through uncorrupted).",
        rule2: "When Control EN = 0: Y = A . 0 = 0 (Gate is INHIBITED / Disabled; output is clamped to 0 regardless of A).",
        useCase: "Used extensively in digital bus gating, clock gating in low-power mobile CPUs, and chip-select decoders."
      },

      workedModels: [
        {
          id: "wm-and-1",
          title: "Model 1: 3-Input AND Gate Evaluation",
          conceptTag: "Multi-Input Truth Evaluation",
          problem: "A 3-input AND gate has inputs A = 1, B = 0, C = 1. Determine the output Y. What must C be changed to in order to make Y = 1?",
          solutionSteps: [
            "Step 1: Write the Boolean expression for a 3-input AND gate: Y = A . B . C.",
            "Step 2: Substitute the given input values:",
            "  Y = 1 . 0 . 1 = 0.",
            "  Because input B = 0, the output is forced to 0 regardless of A and C.",
            "Step 3: To make Y = 1, ALL three inputs must be 1 simultaneously: A = 1, B = 1, C = 1.",
            "  Therefore, B must be changed from 0 to 1 (not C, since C was already 1)."
          ],
          finalAnswer: "Current Output Y = 0. To make Y = 1, input B must be changed to 1.",
          verification: "1 . 0 . 1 = 0. Only 1 . 1 . 1 = 1. Verified."
        },
        {
          id: "wm-and-2",
          title: "Model 2: Clock Gating & Enable Line Analysis",
          conceptTag: "Enable / Disable Masking",
          problem: "A 10 MHz digital square-wave clock signal CLK is connected to Input A of an AND gate. A control signal ENABLE is applied to Input B. If ENABLE is held HIGH for 300 ns and LOW for 700 ns, how many clock pulses pass through the gate during one 1000 ns period?",
          solutionSteps: [
            "Step 1: Calculate the period T of the 10 MHz clock signal:",
            "  T = 1 / f = 1 / (10 * 10^6 Hz) = 100 ns.",
            "Step 2: Apply the AND enable masking rule:",
            "  When ENABLE = 1, Y = CLK . 1 = CLK (Clock pulses pass through).",
            "  When ENABLE = 0, Y = CLK . 0 = 0 (Output is held constant at 0V).",
            "Step 3: Determine how many clock cycles fit inside the 300 ns ENABLE = 1 window:",
            "  Number of pulses = Window Duration / Clock Period = 300 ns / 100 ns = 3 full pulses.",
            "Step 4: During the remaining 700 ns, ENABLE = 0, so 0 pulses pass."
          ],
          finalAnswer: "Exactly 3 full clock pulses pass through the gate.",
          verification: "300 ns / 100 ns per cycle = 3 pulses. Verified."
        },
        {
          id: "wm-and-3",
          title: "Model 3: Constructing a 4-Input AND from 2-Input AND Gates",
          conceptTag: "Gate Tree Expansion",
          problem: "Show how to construct a 4-input AND gate (Y = A . B . C . D) using only 2-input AND gates. What is the total number of gates required, and what is the propagation delay if each gate has tpd = 9 ns?",
          solutionSteps: [
            "Step 1: Use the Associative Law of Boolean multiplication: Y = (A . B) . (C . D).",
            "Step 2: Gate level design:",
            "  Stage 1: Gate G1 computes X1 = A . B (requires 1 gate).",
            "  Stage 1: Gate G2 computes X2 = C . D (requires 1 gate).",
            "  Stage 2: Gate G3 computes Y = X1 . X2 = (A . B) . (C . D) (requires 1 gate).",
            "Step 3: Count total gates: 3 two-input AND gates are required.",
            "Step 4: Calculate worst-case propagation delay:",
            "  Signals must traverse 2 cascaded stages (Stage 1 -> Stage 2).",
            "  Total delay = 2 * tpd = 2 * 9 ns = 18 ns."
          ],
          finalAnswer: "3 two-input AND gates required in a 2-level tree. Total delay = 18 ns.",
          verification: "Binary tree for 4 inputs needs 4 - 1 = 3 gates with depth log2(4) = 2 levels. 2 * 9ns = 18ns. Verified."
        },
        {
          id: "wm-and-4",
          title: "Model 4: Series Switch Electrical Reliability Analysis",
          conceptTag: "Electrical Circuit Analysis",
          problem: "In an industrial safety interlock circuit, three safety switches (Emergency Stop A, Guard Door B, and Pressure Sensor C) are wired in series with a 24V DC alarm relay (acting as a 3-input AND gate). If switch contacts have a failure-to-close probability of p = 0.001 each, what is the probability that the system safely activates when all 3 sensors are engaged?",
          solutionSteps: [
            "Step 1: The circuit operates if and only if ALL three series switches close successfully.",
            "Step 2: Probability of a single switch closing successfully = 1 - p = 1 - 0.001 = 0.999.",
            "Step 3: Assuming independent switch operations, the overall success probability P(success) is:",
            "  P(success) = (0.999) * (0.999) * (0.999) = (0.999)^3.",
            "Step 4: Compute the numeric value:",
            "  (0.999)^3 = 0.997003 (approximately 99.70%).",
            "Step 5: The series configuration makes AND logic inherently fail-safe: any single contact failure breaks the circuit."
          ],
          finalAnswer: "P(safe activation) = 99.70% (0.997003)",
          verification: "(1 - 0.001)^3 = 0.997003. Verified."
        }
      ],

      practiceProblems: [
        {
          id: "pr-and-1",
          difficulty: "Easy",
          conceptTag: "Truth Table Evaluation",
          question: "For a 2-input AND gate, under which condition is the output HIGH (1)?",
          options: [
            "When either input A or input B is 1",
            "When both input A and input B are 1 simultaneously",
            "When input A is 1 and input B is 0",
            "When both inputs are 0"
          ],
          correctIndex: 1,
          solution: "By definition of the AND operation (logical multiplication), all inputs must be 1 simultaneously for the output to be 1."
        },
        {
          id: "pr-and-2",
          difficulty: "Easy",
          conceptTag: "Multi-Input Truth Table",
          question: "How many total input combinations exist in the truth table of a 4-input AND gate, and how many of those combinations produce an output of 1?",
          options: [
            "8 total combinations, 1 produces 1",
            "16 total combinations, 1 produces 1",
            "16 total combinations, 4 produce 1",
            "32 total combinations, 1 produces 1"
          ],
          correctIndex: 1,
          solution: "A 4-input gate has 2^4 = 16 rows. Only the single row where all 4 inputs are HIGH (1111) produces an output of 1. The remaining 15 rows produce 0."
        },
        {
          id: "pr-and-3",
          difficulty: "Medium",
          conceptTag: "Enable / Disable Masking",
          question: "If input A of an AND gate is fed a continuous data stream and input B is tied to Logic 0 (Ground), what is the output Y?",
          options: [
            "Output Y = A (data passes through)",
            "Output Y = A' (inverted data)",
            "Output Y = 0 permanently (Inhibited / Zero-masked)",
            "Output oscillates at the input clock frequency"
          ],
          correctIndex: 2,
          solution: "Since Y = A . 0 = 0 (Null law / Inhibit rule of AND), tying one input to 0 clamps the output to 0 permanently."
        },
        {
          id: "pr-and-4",
          difficulty: "Medium",
          conceptTag: "Switch Analogy",
          question: "Which of the following electrical switch configurations represents an AND gate?",
          options: [
            "Two switches connected in parallel across the load",
            "Two switches connected in series with the load",
            "One switch connected in shunt across the power supply",
            "Two double-throw switches connected in cross-over configuration"
          ],
          correctIndex: 1,
          solution: "Two switches in series require both switches to close before current can reach the load, directly modeling Y = A . B."
        },
        {
          id: "pr-and-5",
          difficulty: "Hard",
          conceptTag: "Gate Tree Expansion",
          question: "To implement an 8-input AND gate using only 2-input AND gates, what is the minimum number of gates and minimum number of gate delay levels required?",
          options: [
            "7 gates, 3 delay levels",
            "8 gates, 4 delay levels",
            "7 gates, 4 delay levels",
            "6 gates, 3 delay levels"
          ],
          correctIndex: 0,
          solution: "A binary tree for N inputs requires N - 1 two-input gates: 8 - 1 = 7 gates. The tree depth is log2(8) = 3 levels (Level 1: 4 gates, Level 2: 2 gates, Level 3: 1 gate)."
        },
        {
          id: "pr-and-6",
          difficulty: "Hard",
          conceptTag: "Silicon Fault Diagnosis",
          question: "An engineer tests a 2-input AND gate and observes: (A=0, B=0 -> Y=0), (A=0, B=1 -> Y=0), (A=1, B=0 -> Y=1), (A=1, B=1 -> Y=1). What is the exact fault in the gate?",
          options: [
            "Input A is internally stuck-at-0",
            "Input B is internally stuck-at-1",
            "Output Y is shorted to VCC",
            "Input A is internally shorted to Input B"
          ],
          correctIndex: 1,
          solution: "Notice that Y = A regardless of B: when A=0, Y=0; when A=1, Y=1. The gate acts as Y = A . 1. This proves input B is internally stuck-at-1 (open bonding wire floating to HIGH in TTL)."
        }
      ]
    },

    orGate: {
      id: "or",
      name: "OR Gate (Logical Addition)",
      icNumber: "IC 7432 (Quad 2-Input OR: 4 Independent Gates per IC)",
      symbolDescription: "Curved input back with two arcs meeting at a sharp pointed tip at the output.",
      equationLatex: "Y = A + B",
      description: "An OR gate implements logical disjunction. The output is HIGH (1) if at least one input is HIGH (1). The output is LOW (0) if and only if all inputs are simultaneously LOW (0).",

      switchCircuit: {
        type: "parallel",
        title: "Parallel Switches & Lamp Analogy",
        explanation: "Two mechanical switches A and B connected in PARALLEL with each other in series with the lamp. Closing switch A creates an electrical path to the lamp. Closing switch B creates an alternative independent path to the lamp. Closing BOTH switches also illuminates the lamp. The lamp remains OFF (Y = 0) only when BOTH switches remain open."
      },

      truthTable2: [
        { a: 0, b: 0, y: 0, state: "Both OFF -> Lamp OFF (Only 0 in row 1)" },
        { a: 0, b: 1, y: 1, state: "B is ON -> Lamp ON" },
        { a: 1, b: 0, y: 1, state: "A is ON -> Lamp ON" },
        { a: 1, b: 1, y: 1, state: "Both ON -> Lamp ON" }
      ],

      truthTable3: [
        { a: 0, b: 0, c: 0, y: 0 },
        { a: 0, b: 0, c: 1, y: 1 },
        { a: 0, b: 1, c: 0, y: 1 },
        { a: 0, b: 1, c: 1, y: 1 },
        { a: 1, b: 0, c: 0, y: 1 },
        { a: 1, b: 0, c: 1, y: 1 },
        { a: 1, b: 1, c: 0, y: 1 },
        { a: 1, b: 1, c: 1, y: 1 }
      ],

      controlMasking: {
        title: "Controlled Pass vs. Force-HIGH Masking Property",
        rule1: "When Control C = 0: Y = A + 0 = A (Gate is ENABLED; data A passes through uncorrupted).",
        rule2: "When Control C = 1: Y = A + 1 = 1 (Output is FORCED to HIGH / 1 regardless of A).",
        useCase: "Used in master interrupt request lines, alarm triggers, and default-override circuits."
      },

      workedModels: [
        {
          id: "wm-or-1",
          title: "Model 1: 3-Input OR Gate Evaluation",
          conceptTag: "Multi-Input Truth Evaluation",
          problem: "A 3-input OR gate has inputs A = 0, B = 0, C = 1. What is the output Y? What is the output if C is switched to 0?",
          solutionSteps: [
            "Step 1: Write the Boolean expression for a 3-input OR gate: Y = A + B + C.",
            "Step 2: Evaluate with A = 0, B = 0, C = 1:",
            "  Y = 0 + 0 + 1 = 1 (since at least one input is 1).",
            "Step 3: Evaluate when C is switched to 0 (A = 0, B = 0, C = 0):",
            "  Y = 0 + 0 + 0 = 0 (all inputs are 0, so output drops to 0)."
          ],
          finalAnswer: "Initial Output Y = 1. When C = 0, Output Y = 0.",
          verification: "0 + 0 + 1 = 1; 0 + 0 + 0 = 0. Matches OR truth table. Verified."
        },
        {
          id: "wm-or-2",
          title: "Model 2: Multi-Sensor Alarm System with OR Logic",
          conceptTag: "Alarm System Voting",
          problem: "A security monitoring system has 4 perimeter sensors: Window Sensor W, Front Door D, Back Door B, and Motion Detector M. The alarm Siren S must trigger (S = 1) if ANY of the four sensors detects an intrusion (signal = 1). Write the Boolean expression, identify the gate type, and calculate how many sensor combinations trigger the alarm.",
          solutionSteps: [
            "Step 1: Since ANY sensor detecting intrusion must trigger the alarm, the required operation is logical OR.",
            "Step 2: Boolean expression: S = W + D + B + M.",
            "Step 3: Total possible sensor input combinations with 4 sensors = 2^4 = 16.",
            "Step 4: The only combination where the siren does NOT trigger is when all sensors report 0: (W=0, D=0, B=0, M=0).",
            "Step 5: Number of combinations that trigger the alarm = Total - Safe = 16 - 1 = 15 combinations."
          ],
          finalAnswer: "Expression: S = W + D + B + M (4-input OR gate). 15 out of 16 combinations trigger the alarm.",
          verification: "2^4 - 1 = 15. Verified."
        },
        {
          id: "wm-or-3",
          title: "Model 3: Parallel Switch Circuit Redundancy",
          conceptTag: "Electrical Circuit Analysis",
          problem: "Two parallel switches A and B control an emergency cooling pump from a 12V DC battery. Each switch has a failure-to-close probability of p = 0.05 (5%). Calculate the probability that the cooling pump successfully turns ON when the emergency signal commands both switches to close.",
          solutionSteps: [
            "Step 1: In a parallel configuration, the pump fails to turn ON if and only if BOTH switches fail to close simultaneously.",
            "Step 2: Probability that switch A fails = p = 0.05.",
            "Step 3: Probability that switch B fails = p = 0.05.",
            "Step 4: Combined failure probability P(failure) = pA * pB = 0.05 * 0.05 = 0.0025 (0.25%).",
            "Step 5: Success probability P(success) = 1 - P(failure) = 1 - 0.0025 = 0.9975 (99.75%).",
            "Step 6: The parallel OR configuration dramatically reduces failure rate from 5% to 0.25%."
          ],
          finalAnswer: "P(pump turns ON) = 99.75%",
          verification: "1 - (0.05)^2 = 1 - 0.0025 = 0.9975. Verified."
        },
        {
          id: "wm-or-4",
          title: "Model 4: Controlled Pass vs Override with OR Gate",
          conceptTag: "Control Masking",
          problem: "A data signal D is connected to input 1 of an OR gate, and a control line C is connected to input 2. Show mathematically what happens to the output Y when: (a) C = 0, and (b) C = 1.",
          solutionSteps: [
            "Step 1: Write the general OR expression: Y = D + C.",
            "Step 2: Case (a) C = 0:",
            "  Y = D + 0.",
            "  By the Identity Law of Boolean algebra, D + 0 = D.",
            "  If D = 0 -> Y = 0. If D = 1 -> Y = 1.",
            "  The gate is in PASS / ENABLE mode, transferring data D without alteration.",
            "Step 3: Case (b) C = 1:",
            "  Y = D + 1.",
            "  By the Null (Dominance) Law of Boolean algebra, D + 1 = 1.",
            "  The output is locked to HIGH (1) permanently, overriding the data signal."
          ],
          finalAnswer: "(a) When C = 0: Y = D (Data Passes). (b) When C = 1: Y = 1 (Force HIGH / Override).",
          verification: "D + 0 = D; D + 1 = 1. Matches Boolean axioms. Verified."
        }
      ],

      practiceProblems: [
        {
          id: "pr-or-1",
          difficulty: "Easy",
          conceptTag: "Truth Table Evaluation",
          question: "Under what sole condition does a 2-input OR gate produce an output of LOW (0)?",
          options: [
            "When either input A or B is 0",
            "When both input A and input B are 0 simultaneously",
            "When both input A and input B are 1 simultaneously",
            "When input A is 1 and input B is 0"
          ],
          correctIndex: 1,
          solution: "An OR gate produces 0 if and only if all inputs are 0. If any input is 1, the output is immediately 1."
        },
        {
          id: "pr-or-2",
          difficulty: "Easy",
          conceptTag: "Electrical Analogy",
          question: "Which physical electrical circuit layout represents the behavior of an OR gate?",
          options: [
            "Switches connected in series with the lamp",
            "Switches connected in parallel with each other, in series with the lamp",
            "A single switch connected in shunt across the battery",
            "A potentiometer configured as a voltage divider"
          ],
          correctIndex: 1,
          solution: "Parallel switches allow current to reach the lamp through any closed path, modeling logical addition (OR)."
        },
        {
          id: "pr-or-3",
          difficulty: "Medium",
          conceptTag: "Control Masking",
          question: "How do the control lines of an AND gate and an OR gate differ when used to ENABLE data transmission?",
          options: [
            "AND enables with Control = 0; OR enables with Control = 1",
            "AND enables with Control = 1; OR enables with Control = 0",
            "Both gates enable when Control = 1",
            "Both gates enable when Control = 0"
          ],
          correctIndex: 1,
          solution: "For AND: A . 1 = A (Control must be 1 to pass data). For OR: A + 0 = A (Control must be 0 to pass data)."
        },
        {
          id: "pr-or-4",
          difficulty: "Medium",
          conceptTag: "Multi-Input Truth Table",
          question: "For a 5-input OR gate, how many rows in its 32-row truth table have an output of 1?",
          options: ["1 row", "16 rows", "31 rows", "32 rows"],
          correctIndex: 2,
          solution: "A 5-input gate has 2^5 = 32 rows. Only the row with all zeros (00000) produces Y = 0. All other 32 - 1 = 31 rows produce Y = 1."
        },
        {
          id: "pr-or-5",
          difficulty: "Hard",
          conceptTag: "Gate Tree Expansion",
          question: "How many 2-input OR gates are required to build a 6-input OR gate?",
          options: ["3 gates", "4 gates", "5 gates", "6 gates"],
          correctIndex: 2,
          solution: "To combine N inputs using 2-input gates of the same type, exactly N - 1 gates are required: 6 - 1 = 5 gates."
        },
        {
          id: "pr-or-6",
          difficulty: "Hard",
          conceptTag: "Silicon Fault Diagnosis",
          question: "A technician observes that an OR gate outputs 1 for inputs (0,0), (0,1), (1,0), and (1,1). What is the internal failure?",
          options: [
            "Input A is stuck-at-0",
            "Input B is stuck-at-0",
            "Output Y is stuck-at-1 (shorted to VCC)",
            "The ground pin is disconnected"
          ],
          correctIndex: 2,
          solution: "Since row (0,0) outputs 1 instead of 0, and all other rows also output 1, the output pin is stuck-at-1 (shorted to VCC)."
        }
      ]
    }
  },

  // =========================================================================
  // TAB 3: 1.7B UNIVERSAL & SPECIAL GATES (NAND, NOR, XOR, XNOR)
  // =========================================================================
  universalSpecialGatesData: {
    nandGate: {
      id: "nand",
      name: "NAND Gate (NOT-AND)",
      icNumber: "IC 7400 (Quad 2-Input NAND: 4 Independent Gates per IC)",
      symbolDescription: "AND shape (flat back, curved front) with an inversion bubble at the output point.",
      equationLatex: "Y = \\overline{A \\cdot B} \\quad \\text{or} \\quad Y = (AB)'",
      description: "A NAND gate is the exact complement of an AND gate. Its output is LOW (0) if and only if ALL inputs are simultaneously HIGH (1). If any input is LOW (0), the output is guaranteed to be HIGH (1).",

      truthTable2: [
        { a: 0, b: 0, y: 1, state: "Both 0 -> Output 1" },
        { a: 0, b: 1, y: 1, state: "At least one 0 -> Output 1" },
        { a: 1, b: 0, y: 1, state: "At least one 0 -> Output 1" },
        { a: 1, b: 1, y: 0, state: "Both 1 -> Output 0 (Only 0 in row 4)" }
      ],

      behavioralTrigger: "LOW-only trigger: Output is 0 ONLY when all inputs are 1. Any single 0 at an input immediately forces output to 1.",
      
      controlledInverter: {
        title: "Controlled Inverter Property",
        rule1: "When Control = 1: Y = (A . 1)' = A' (Inverts the input signal).",
        rule2: "When Control = 0: Y = (A . 0)' = 0' = 1 (Forces output HIGH / 1).",
        tiedInputs: "Connecting both inputs together converts NAND into a NOT gate: Y = (A . A)' = A'."
      },

      workedModels: [
        {
          id: "wm-nand-1",
          title: "Model 1: 3-Input NAND Gate Truth Evaluation",
          conceptTag: "Multi-Input Evaluation",
          problem: "Evaluate the output of a 3-input NAND gate for inputs: (a) A = 1, B = 1, C = 1; (b) A = 1, B = 0, C = 1.",
          solutionSteps: [
            "Step 1: Write the 3-input NAND equation: Y = (A . B . C)'.",
            "Step 2: Case (a) A = 1, B = 1, C = 1:",
            "  Y = (1 . 1 . 1)' = (1)' = 0.",
            "  All inputs are 1, so the AND product is 1, and the inversion produces 0.",
            "Step 3: Case (b) A = 1, B = 0, C = 1:",
            "  Y = (1 . 0 . 1)' = (0)' = 1.",
            "  Input B = 0, which makes the AND product 0. Inverting 0 gives 1."
          ],
          finalAnswer: "(a) Y = 0; (b) Y = 1",
          verification: "(1.1.1)' = 0; (1.0.1)' = 1. Matches NAND truth table. Verified."
        },
        {
          id: "wm-nand-2",
          title: "Model 2: NAND Gate as a Controlled Inverter",
          conceptTag: "Controlled Inversion",
          problem: "Show how a 2-input NAND gate acts as a signal inverter when one input is tied to Logic 1 (+5V). What happens if it is tied to Logic 0 instead?",
          solutionSteps: [
            "Step 1: Let the data input be A and control input be C.",
            "Step 2: When C is tied to Logic 1 (C = 1):",
            "  Y = (A . C)' = (A . 1)'.",
            "  Since A . 1 = A, Y = A'.",
            "  When A = 0, Y = 0' = 1. When A = 1, Y = 1' = 0.",
            "  The circuit functions as a standard NOT gate (inverter).",
            "Step 3: When C is tied to Logic 0 (C = 0):",
            "  Y = (A . 0)' = (0)' = 1.",
            "  The output is locked permanently at HIGH (1), blocking data flow."
          ],
          finalAnswer: "With C = 1: Y = A' (Inverter). With C = 0: Y = 1 (Fixed HIGH).",
          verification: "(A.1)' = A'; (A.0)' = 1. Verified."
        },
        {
          id: "wm-nand-3",
          title: "Model 3: Active-LOW Set/Reset Latch Core",
          conceptTag: "Cross-Coupled Latch",
          problem: "Two NAND gates G1 and G2 are cross-coupled such that Q = (S_bar . Q_bar)' and Q_bar = (R_bar . Q)'. If S_bar = 0 and R_bar = 1, determine the output states Q and Q_bar.",
          solutionSteps: [
            "Step 1: Analyze Gate G1 with S_bar = 0:",
            "  By NAND rule: If any input is 0, the output is guaranteed to be 1.",
            "  Since S_bar = 0, Q = (0 . Q_bar)' = 0' = 1.",
            "Step 2: Now feed Q = 1 into Gate G2 along with R_bar = 1:",
            "  Q_bar = (R_bar . Q)' = (1 . 1)' = 1' = 0.",
            "Step 3: Verify consistency:",
            "  Feed Q_bar = 0 back into G1: Q = (0 . 0)' = 0' = 1 (Matches Step 1).",
            "Step 4: The latch is in the SET state (Q = 1, Q_bar = 0)."
          ],
          finalAnswer: "Q = 1, Q_bar = 0 (SET State)",
          verification: "S_bar = 0 forces Q = 1. R_bar = 1 with Q = 1 gives Q_bar = 0. Verified."
        },
        {
          id: "wm-nand-4",
          title: "Model 4: CMOS NAND Transistor Implementation",
          conceptTag: "CMOS Silicon Primitive",
          problem: "Explain why NAND is the preferred primitive in CMOS technology compared to AND gates, referencing NMOS pull-down and PMOS pull-up transistor structures.",
          solutionSteps: [
            "Step 1: A CMOS gate consists of a PMOS Pull-Up Network (PUN) connected to VCC and an NMOS Pull-Down Network (PDN) connected to Ground.",
            "Step 2: For a NAND gate:",
            "  PDN consists of two NMOS transistors in SERIES (conducts only when both A=1 and B=1, pulling output to 0).",
            "  PUN consists of two PMOS transistors in PARALLEL (conducts when either A=0 or B=0, pulling output to 1).",
            "  Total transistors required for 2-input NAND = 2 PMOS + 2 NMOS = 4 transistors.",
            "Step 3: An AND gate in CMOS cannot be fabricated directly; it requires a 4-transistor NAND gate followed by a 2-transistor Inverter (NOT gate), totaling 6 transistors.",
            "Step 4: Therefore, NAND gates use fewer transistors, have lower silicon area, and exhibit shorter propagation delay than AND gates in CMOS."
          ],
          finalAnswer: "NAND requires only 4 CMOS transistors; AND requires 6 transistors (NAND + NOT).",
          verification: "Standard CMOS transistor count: NAND2 = 4, AND2 = 6. Verified."
        }
      ],

      practiceProblems: [
        {
          id: "pr-nand-1",
          difficulty: "Easy",
          conceptTag: "Truth Table Evaluation",
          question: "What is the output of a 2-input NAND gate when both inputs A and B are 1?",
          options: ["1", "0", "High Impedance", "Undefined"],
          correctIndex: 1,
          solution: "Y = (1 . 1)' = 1' = 0. Output is LOW only when all inputs are HIGH."
        },
        {
          id: "pr-nand-2",
          difficulty: "Easy",
          conceptTag: "Inverter Conversion",
          question: "How can a 2-input NAND gate be converted into an inverter (NOT gate)?",
          options: [
            "Tie both inputs together",
            "Tie one input to Ground (0V)",
            "Leave one input unconnected",
            "Connect a resistor between the two inputs"
          ],
          correctIndex: 0,
          solution: "Tying both inputs together gives Y = (A . A)' = A', which is the NOT operation."
        },
        {
          id: "pr-nand-3",
          difficulty: "Medium",
          conceptTag: "Controlled Masking",
          question: "If one input of a NAND gate is connected to Logic 1, what does the gate output represent?",
          options: ["Logic 1", "Logic 0", "Inverted data A'", "Unchanged data A"],
          correctIndex: 2,
          solution: "Y = (A . 1)' = A'. The gate acts as a controlled inverter."
        },
        {
          id: "pr-nand-4",
          difficulty: "Medium",
          conceptTag: "Multi-Input Truth Count",
          question: "In the truth table of an 8-input NAND gate, how many input combinations yield an output of 1?",
          options: ["1", "128", "255", "256"],
          correctIndex: 2,
          solution: "Total rows = 2^8 = 256. Only the single row where all 8 inputs are 1 produces 0. The remaining 256 - 1 = 255 rows produce 1."
        },
        {
          id: "pr-nand-5",
          difficulty: "Hard",
          conceptTag: "Unused Inputs in TTL",
          question: "In practical digital circuits, what should be done with unused inputs of a TTL 7400 NAND gate?",
          options: [
            "Tie them to Ground (0V)",
            "Tie them to VCC (+5V) through a pull-up resistor or connect them to an active input",
            "Leave them completely unconnected and floating",
            "Connect them directly to the output pin"
          ],
          correctIndex: 1,
          solution: "Tying an unused NAND input to Ground would permanently lock output to 1. To keep the gate functioning with the remaining inputs, unused inputs must be tied to VCC (+5V) via a 1k-ohm pull-up resistor or connected in parallel with an active input."
        },
        {
          id: "pr-nand-6",
          difficulty: "Hard",
          conceptTag: "Gate Waveform Response",
          question: "Two square waves of equal frequency with a 90-degree phase shift are fed to a NAND gate. During what fraction of the period is the output LOW (0)?",
          options: ["0%", "25%", "50%", "75%"],
          correctIndex: 1,
          solution: "A 90-degree phase shift means both waves are HIGH simultaneously for only 1 quarter (25%) of the cycle. NAND outputs 0 only when both inputs are HIGH, so output is LOW for 25% of the period."
        }
      ]
    },

    norGate: {
      id: "nor",
      name: "NOR Gate (NOT-OR)",
      icNumber: "IC 7402 (Quad 2-Input NOR: 4 Independent Gates per IC)",
      symbolDescription: "OR shape (curved back, pointed front) with an inversion bubble at the output point.",
      equationLatex: "Y = \\overline{A + B} \\quad \\text{or} \\quad Y = (A + B)'",
      description: "A NOR gate is the exact complement of an OR gate. Its output is HIGH (1) if and only if ALL inputs are simultaneously LOW (0). If any input is HIGH (1), the output is immediately forced LOW (0).",

      truthTable2: [
        { a: 0, b: 0, y: 1, state: "Both 0 -> Output 1 (Only 1 in row 1)" },
        { a: 0, b: 1, y: 0, state: "At least one 1 -> Output 0" },
        { a: 1, b: 0, y: 0, state: "At least one 1 -> Output 0" },
        { a: 1, b: 1, y: 0, state: "Both 1 -> Output 0" }
      ],

      behavioralTrigger: "HIGH-only trigger: Output is 1 ONLY when all inputs are 0. Any single 1 at an input immediately pulls output to 0.",

      controlledInverter: {
        title: "Controlled Inverter Property",
        rule1: "When Control = 0: Y = (A + 0)' = A' (Inverts the input signal).",
        rule2: "When Control = 1: Y = (A + 1)' = 1' = 0 (Forces output LOW / 0).",
        tiedInputs: "Connecting both inputs together converts NOR into a NOT gate: Y = (A + A)' = A'."
      },

      workedModels: [
        {
          id: "wm-nor-1",
          title: "Model 1: 3-Input NOR Gate Truth Evaluation",
          conceptTag: "Multi-Input Evaluation",
          problem: "Evaluate the output of a 3-input NOR gate for: (a) A = 0, B = 0, C = 0; (b) A = 0, B = 1, C = 0.",
          solutionSteps: [
            "Step 1: Write the 3-input NOR expression: Y = (A + B + C)'.",
            "Step 2: Case (a) A = 0, B = 0, C = 0:",
            "  Y = (0 + 0 + 0)' = (0)' = 1.",
            "  All inputs are 0, so the sum is 0, and the inversion yields 1.",
            "Step 3: Case (b) A = 0, B = 1, C = 0:",
            "  Y = (0 + 1 + 0)' = (1)' = 0.",
            "  Input B = 1 makes the internal OR sum 1. Inverting 1 gives 0."
          ],
          finalAnswer: "(a) Y = 1; (b) Y = 0",
          verification: "(0+0+0)' = 1; (0+1+0)' = 0. Matches NOR truth table. Verified."
        },
        {
          id: "wm-nor-2",
          title: "Model 2: NOR Gate as a Controlled Inverter",
          conceptTag: "Controlled Inversion",
          problem: "Show mathematically how a NOR gate can be configured as an inverter using a control line. Contrast this with the NAND gate configuration.",
          solutionSteps: [
            "Step 1: For a NOR gate: Y = (A + C)'.",
            "Step 2: To make Y = A', we need the term inside the parenthesis to equal A.",
            "  By Boolean identity, A + 0 = A.",
            "  Therefore, setting Control C = 0 gives Y = (A + 0)' = A'.",
            "Step 3: Comparison with NAND gate:",
            "  NAND requires Control = 1 to invert: (A . 1)' = A'.",
            "  NOR requires Control = 0 to invert: (A + 0)' = A'.",
            "Step 4: If Control C = 1 on a NOR gate, Y = (A + 1)' = 1' = 0 (Output is forced LOW)."
          ],
          finalAnswer: "NOR inverts when Control = 0. (Contrast: NAND inverts when Control = 1).",
          verification: "(A+0)' = A'. Verified."
        },
        {
          id: "wm-nor-3",
          title: "Model 3: Active-HIGH Set/Reset Latch Core",
          conceptTag: "Cross-Coupled Latch",
          problem: "Two NOR gates are cross-coupled such that Q = (R + Q_bar)' and Q_bar = (S + Q)'. If S = 1 and R = 0, trace the output values of Q and Q_bar.",
          solutionSteps: [
            "Step 1: Examine the gate computing Q_bar with S = 1:",
            "  By NOR rule: If ANY input is 1, output is immediately 0.",
            "  Since S = 1, Q_bar = (1 + Q)' = 1' = 0.",
            "Step 2: Feed Q_bar = 0 into the upper gate with R = 0:",
            "  Q = (R + Q_bar)' = (0 + 0)' = 0' = 1.",
            "Step 3: Verify stability:",
            "  Feed Q = 1 back into the lower gate: Q_bar = (1 + 1)' = 1' = 0 (Matches Step 1).",
            "Step 4: This is the SET state: Q = 1, Q_bar = 0."
          ],
          finalAnswer: "Q = 1, Q_bar = 0 (Active-HIGH SET)",
          verification: "S = 1 forces Q_bar = 0. R = 0 and Q_bar = 0 gives Q = 1. Verified."
        },
        {
          id: "wm-nor-4",
          title: "Model 4: CMOS NOR Transistor Sizing Challenge",
          conceptTag: "CMOS Silicon Primitive",
          problem: "In CMOS fabrication, why are NOR gates generally slower than NAND gates of the same silicon area?",
          solutionSteps: [
            "Step 1: In CMOS, hole mobility in PMOS transistors is roughly 2 to 3 times lower than electron mobility in NMOS transistors (mu_n > mu_p).",
            "Step 2: A CMOS NOR gate places PMOS transistors in SERIES in the Pull-Up Network (to conduct when both A=0 and B=0).",
            "Step 3: Placing already slow PMOS transistors in series compounds their resistance, requiring 2 to 3 times wider channels to achieve equal rise times.",
            "Step 4: In contrast, CMOS NAND places fast NMOS transistors in series and PMOS in parallel.",
            "Step 5: Hence, NAND gates are faster, more compact, and universally favored over NOR in high-speed microprocessors."
          ],
          finalAnswer: "NOR requires series PMOS transistors; lower hole mobility makes series PMOS slower and larger.",
          verification: "Physical silicon property: mu_n approx 2.5 * mu_p. Verified."
        }
      ],

      practiceProblems: [
        {
          id: "pr-nor-1",
          difficulty: "Easy",
          conceptTag: "Truth Table Evaluation",
          question: "When does a 2-input NOR gate produce an output of HIGH (1)?",
          options: [
            "When both inputs are 0",
            "When both inputs are 1",
            "When input A is 1 and input B is 0",
            "When either input is 1"
          ],
          correctIndex: 0,
          solution: "Y = (0 + 0)' = 0' = 1. NOR outputs 1 if and only if all inputs are 0."
        },
        {
          id: "pr-nor-2",
          difficulty: "Easy",
          conceptTag: "Inverter Conversion",
          question: "How can a NOR gate be used as an inverter?",
          options: [
            "Short both inputs together or tie one input to Ground (0V)",
            "Tie one input to VCC (+5V)",
            "Leave both inputs unconnected",
            "Connect output back to input"
          ],
          correctIndex: 0,
          solution: "Tying both inputs together gives (A + A)' = A'. Tying one input to Ground gives (A + 0)' = A'."
        },
        {
          id: "pr-nor-3",
          difficulty: "Medium",
          conceptTag: "Unused Inputs in TTL",
          question: "What must be done with unused inputs of a TTL NOR gate to keep it active for other inputs?",
          options: [
            "Tie them to Ground (0V)",
            "Tie them to +5V (VCC)",
            "Leave them open/floating",
            "Connect them to the output"
          ],
          correctIndex: 0,
          solution: "For NOR: Y = (A + Unused)'. If unused is tied to +5V (1), Y is locked to 0 permanently. Therefore, unused NOR inputs must be tied to Ground (0V)."
        },
        {
          id: "pr-nor-4",
          difficulty: "Medium",
          conceptTag: "Truth Table Count",
          question: "In a 4-input NOR gate truth table (16 rows), how many rows produce an output of 0?",
          options: ["1", "4", "15", "16"],
          correctIndex: 2,
          solution: "Only the single row where all 4 inputs are 0 (0000) produces Y = 1. The remaining 16 - 1 = 15 rows produce Y = 0."
        },
        {
          id: "pr-nor-5",
          difficulty: "Hard",
          conceptTag: "Polarity Inversion Check",
          question: "If inputs A and B are connected to both an OR gate and a NOR gate, what is the exact mathematical relationship between their outputs?",
          options: [
            "YNOR = YOR",
            "YNOR = NOT(YOR)",
            "YNOR = YOR + 1",
            "YNOR = 2 * YOR"
          ],
          correctIndex: 1,
          solution: "By definition, NOR is the negated OR operation: YNOR = (A + B)' = NOT(YOR). They are exact complementary signals at all times."
        },
        {
          id: "pr-nor-6",
          difficulty: "Hard",
          conceptTag: "Logic Circuit Tracing",
          question: "A NOR gate has inputs X and Y. X is driven by an inverter with input A. Y is tied to Ground. What is the final output of the NOR gate?",
          options: ["A", "A'", "0", "1"],
          correctIndex: 0,
          solution: "X = A'. Y = 0. The NOR gate output is (X + Y)' = (A' + 0)' = (A')' = A. The circuit acts as a non-inverting buffer."
        }
      ]
    },

    xorGate: {
      id: "xor",
      name: "XOR Gate (Exclusive-OR)",
      icNumber: "IC 7486 (Quad 2-Input XOR: 4 Independent Gates per IC)",
      symbolDescription: "OR shape with an additional curved line drawn across the input terminals.",
      equationLatex: "Y = A \\oplus B = \\overline{A}B + A\\overline{B}",
      description: "An Exclusive-OR gate implements modulo-2 addition. For two inputs, the output is HIGH (1) if the inputs are DIFFERENT, and LOW (0) if the inputs are IDENTICAL. For 3 or more inputs, it acts as an Odd-1s detector.",

      truthTable2: [
        { a: 0, b: 0, y: 0, state: "Equal inputs -> Output 0" },
        { a: 0, b: 1, y: 1, state: "Different inputs -> Output 1" },
        { a: 1, b: 0, y: 1, state: "Different inputs -> Output 1" },
        { a: 1, b: 1, y: 0, state: "Equal inputs -> Output 0" }
      ],

      truthTable3: [
        { a: 0, b: 0, c: 0, y: 0, count1s: 0, parity: "Even (0 ones)" },
        { a: 0, b: 0, c: 1, y: 1, count1s: 1, parity: "Odd (1 one)" },
        { a: 0, b: 1, c: 0, y: 1, count1s: 1, parity: "Odd (1 one)" },
        { a: 0, b: 1, c: 1, y: 0, count1s: 2, parity: "Even (2 ones)" },
        { a: 1, b: 0, c: 0, y: 1, count1s: 1, parity: "Odd (1 one)" },
        { a: 1, b: 0, c: 1, y: 0, count1s: 2, parity: "Even (2 ones)" },
        { a: 1, b: 1, c: 0, y: 0, count1s: 2, parity: "Even (2 ones)" },
        { a: 1, b: 1, c: 1, y: 1, count1s: 3, parity: "Odd (3 ones)" }
      ],

      behavioralTrigger: "Inequality Detector: For 2 inputs, Y = 1 if and only if A != B. For N inputs, it functions as an Odd-1s Detector (Y = 1 when an ODD number of inputs are 1).",

      controlledInverter: {
        title: "Controlled Inverter Property (Hardware Trick in Add/Subtract)",
        rule1: "When Control = 0: Y = A (+) 0 = A (Buffer mode: Data passes through unchanged).",
        rule2: "When Control = 1: Y = A (+) 1 = A' (Inverter mode: Bit is conditionally inverted to 1's complement).",
        application: "Used directly in 8-bit Signed Adder/Subtractor ALUs. Setting SUB = 1 inverts operand B via XOR gates and feeds Carry-in = 1 to compute 2's complement on the fly."
      },

      workedModels: [
        {
          id: "wm-xor-1",
          title: "Model 1: 3-Input XOR as an Odd-1s Detector",
          conceptTag: "Odd Parity Detection",
          problem: "Evaluate Y = A (+) B (+) C for all four cases: (a) 000, (b) 011, (c) 101, (d) 111. Prove that output Y is 1 if and only if the number of 1s is odd.",
          solutionSteps: [
            "Step 1: Evaluate using associative grouping: Y = (A (+) B) (+) C.",
            "Step 2: Case (a) 000: (0 (+) 0) (+) 0 = 0 (+) 0 = 0 (Zero 1s: Even count -> Output 0).",
            "Step 3: Case (b) 011: (0 (+) 1) (+) 1 = 1 (+) 1 = 0 (Two 1s: Even count -> Output 0).",
            "Step 4: Case (c) 101: (1 (+) 0) (+) 1 = 1 (+) 1 = 0 (Two 1s: Even count -> Output 0).",
            "Step 5: Case (d) 111: (1 (+) 1) (+) 1 = 0 (+) 1 = 1 (Three 1s: Odd count -> Output 1).",
            "Step 6: General Law: An N-input XOR gate outputs 1 if and only if an ODD number of inputs are 1."
          ],
          finalAnswer: "(a) 0, (b) 0, (c) 0, (d) 1. Confirms the Odd-1s detector rule.",
          verification: "Rows with 1 or 3 ones output 1; rows with 0 or 2 ones output 0. Verified."
        },
        {
          id: "wm-xor-2",
          title: "Model 2: Controlled Inverter in 4-Bit Adder/Subtractor",
          conceptTag: "Controlled Inversion",
          problem: "A 4-bit binary operand B = [B3, B2, B1, B0] = 0110 (+6) is fed to four XOR gates whose second input is tied to a control line M. Determine the output vector [Y3, Y2, Y1, Y0] when: (a) M = 0 (Add mode), and (b) M = 1 (Subtract mode).",
          solutionSteps: [
            "Step 1: For each bit i: Yi = Bi (+) M.",
            "Step 2: Case (a) M = 0 (Add mode):",
            "  Y3 = 0 (+) 0 = 0",
            "  Y2 = 1 (+) 0 = 1",
            "  Y1 = 1 (+) 0 = 1",
            "  Y0 = 0 (+) 0 = 0",
            "  Output = 0110 (Unchanged operand B).",
            "Step 3: Case (b) M = 1 (Subtract mode):",
            "  Y3 = 0 (+) 1 = 1",
            "  Y2 = 1 (+) 1 = 0",
            "  Y1 = 1 (+) 1 = 0",
            "  Y0 = 0 (+) 1 = 1",
            "  Output = 1001 (Exact 1's complement of B).",
            "Step 4: Feeding M = 1 into the adder's carry-in Cin adds 1, completing the 2's complement negation."
          ],
          finalAnswer: "(a) For M = 0: Y = 0110 (Pass). (b) For M = 1: Y = 1001 (1's complement).",
          verification: "B (+) 0 = B; B (+) 1 = B'. Verified."
        },
        {
          id: "wm-xor-3",
          title: "Model 3: Self-Inverse Property & Cryptographic Vernam Cipher",
          conceptTag: "Self-Inverse Axiom",
          problem: "Prove the self-inverse properties of XOR: (a) A (+) A = 0, and (b) (A (+) K) (+) K = A. Explain how this forms the basis of the symmetric Vernam one-time pad cipher.",
          solutionSteps: [
            "Step 1: Prove A (+) A = 0:",
            "  A (+) A = A'A + AA' = 0 + 0 = 0 (Inputs are identical, so XOR is 0).",
            "Step 2: Prove (A (+) K) (+) K = A:",
            "  Using the associative property: (A (+) K) (+) K = A (+) (K (+) K).",
            "  From Step 1, K (+) K = 0.",
            "  Then A (+) 0 = A. Thus, encrypting with K and decrypting with K recovers A.",
            "Step 3: Cryptographic significance:",
            "  If Plaintext P is XORed with a random key K to form Ciphertext C = P (+) K,",
            "  The receiver decrypts by computing C (+) K = (P (+) K) (+) K = P.",
            "  Encryption and decryption use the identical XOR hardware circuit."
          ],
          finalAnswer: "A (+) A = 0 and (A (+) K) (+) K = A proven. Identical hardware encrypts and decrypts.",
          verification: "A (+) 0 = A; K (+) K = 0. Verified."
        },
        {
          id: "wm-xor-4",
          title: "Model 4: Half-Adder Sum and Parity Bit Generation",
          conceptTag: "Half-Adder Architecture",
          problem: "Show that the Sum output of a binary Half-Adder is implemented by an XOR gate, while the Carry output is implemented by an AND gate. Verify for inputs (A=1, B=1).",
          solutionSteps: [
            "Step 1: Write the binary addition rules for two 1-bit numbers A and B:",
            "  0 + 0 = 0 (Sum = 0, Carry = 0)",
            "  0 + 1 = 1 (Sum = 1, Carry = 0)",
            "  1 + 0 = 1 (Sum = 1, Carry = 0)",
            "  1 + 1 = 10_2 (Sum = 0, Carry = 1)",
            "Step 2: Inspect the Sum column: Sum is 1 when inputs differ (01 or 10), and 0 when equal (00 or 11).",
            "  This is the exact truth table of XOR: Sum = A (+) B.",
            "Step 3: Inspect the Carry column: Carry is 1 only when A = 1 and B = 1.",
            "  This is the exact truth table of AND: Carry = A . B.",
            "Step 4: For inputs A = 1, B = 1:",
            "  Sum = 1 (+) 1 = 0.",
            "  Carry = 1 . 1 = 1.",
            "  Combined result: (Carry, Sum) = (1, 0) = 2_10. Correct."
          ],
          finalAnswer: "Sum = A (+) B, Carry = A . B. For (1, 1): Sum = 0, Carry = 1.",
          verification: "1 + 1 = 2 (binary 10). Sum = 0, Carry = 1. Verified."
        }
      ],

      practiceProblems: [
        {
          id: "pr-xor-1",
          difficulty: "Easy",
          conceptTag: "Truth Table Evaluation",
          question: "What is the output of an XOR gate when both inputs are equal to 1?",
          options: ["1", "0", "High Impedance", "Undefined"],
          correctIndex: 1,
          solution: "XOR outputs 0 when inputs are equal (1 (+) 1 = 0). It outputs 1 only when inputs differ."
        },
        {
          id: "pr-xor-2",
          difficulty: "Easy",
          conceptTag: "Odd Parity Rule",
          question: "Evaluate the output of a 3-input XOR gate for inputs A = 1, B = 0, C = 1.",
          options: ["0", "1", "Undefined", "High Impedance"],
          correctIndex: 0,
          solution: "Number of 1s in input is 2 (an even number). Multi-input XOR acts as an Odd-1s detector, so output is 0. (1 (+) 0 (+) 1 = 1 (+) 1 = 0)."
        },
        {
          id: "pr-xor-3",
          difficulty: "Medium",
          conceptTag: "Controlled Inverter Property",
          question: "If input A is connected to an XOR gate and the second input is tied to Logic 1, what does the gate output produce?",
          options: ["A", "A' (Inverted A)", "0", "1"],
          correctIndex: 1,
          solution: "A (+) 1 = A'1' + A1 = A'0 + A'1 = A'. Tying one input to 1 makes XOR an inverter."
        },
        {
          id: "pr-xor-4",
          difficulty: "Medium",
          conceptTag: "Self-Inverse Axiom",
          question: "Simplify the Boolean expression: X = A (+) B (+) A.",
          options: ["A", "B", "A (+) B", "0"],
          correctIndex: 1,
          solution: "By commutative and associative properties: A (+) B (+) A = (A (+) A) (+) B. Since A (+) A = 0, we have 0 (+) B = B."
        },
        {
          id: "pr-xor-5",
          difficulty: "Hard",
          conceptTag: "Parity Generator Design",
          question: "To generate an EVEN parity bit P for a 3-bit data word [D2, D1, D0], how should the XOR gates be connected?",
          options: [
            "P = D2 . D1 . D0",
            "P = D2 + D1 + D0",
            "P = D2 (+) D1 (+) D0",
            "P = (D2 (+) D1 (+) D0)'"
          ],
          correctIndex: 2,
          solution: "For even parity, the total number of 1s in [D2, D1, D0, P] must be even. If [D2, D1, D0] has an odd number of 1s, XOR outputs 1, making P = 1 (total 1s becomes even). If it has an even number of 1s, XOR outputs 0, making P = 0. Thus P = D2 (+) D1 (+) D0."
        },
        {
          id: "pr-xor-6",
          difficulty: "Hard",
          conceptTag: "AI Neural Network History",
          question: "Why did Minsky and Papert's 1969 proof about the XOR gate cause the historic AI winter?",
          options: [
            "XOR gates cannot be fabricated in silicon",
            "A single-layer perceptron with a linear decision boundary cannot separate the XOR truth table because outputs for (0,1) and (1,0) cannot be separated from (0,0) and (1,1) by a straight line",
            "XOR gates require infinite power in analog computers",
            "XOR logic violates Boolean algebra"
          ],
          correctIndex: 1,
          solution: "The points (0,1) and (1,0) have target 1, while (0,0) and (1,1) have target 0 on the Cartesian plane. No single linear hyperplane (straight line) can separate these two classes. This demonstrated that single-layer neural networks could not solve non-linear problems without hidden layers."
        }
      ]
    },

    xnorGate: {
      id: "xnor",
      name: "XNOR Gate (Equivalence Gate)",
      icNumber: "IC 74266 (Quad 2-Input XNOR with Open-Collector Outputs)",
      symbolDescription: "XOR shape (double curved input back) with an inversion bubble at the output point.",
      equationLatex: "Y = A \\odot B = AB + \\overline{A}\\,\\overline{B} = \\overline{A \\oplus B}",
      description: "An Exclusive-NOR gate is the complement of the XOR gate. For two inputs, the output is HIGH (1) if the inputs are IDENTICAL (both 0 or both 1), and LOW (0) if the inputs are DIFFERENT. It acts as a digital Equality Comparator.",

      truthTable2: [
        { a: 0, b: 0, y: 1, state: "Equal inputs (both 0) -> Output 1" },
        { a: 0, b: 1, y: 0, state: "Different inputs -> Output 0" },
        { a: 1, b: 0, y: 0, state: "Different inputs -> Output 0" },
        { a: 1, b: 1, y: 1, state: "Equal inputs (both 1) -> Output 1" }
      ],

      behavioralTrigger: "Equality Detector: Output is 1 if and only if inputs are EQUAL (A = B). Output is 0 when inputs differ (A != B).",

      controlledEquivalence: {
        title: "Controlled Inversion with XNOR",
        rule1: "When Control = 1: Y = A (odot) 1 = A (Data passes through unchanged).",
        rule2: "When Control = 0: Y = A (odot) 0 = A' (Inverts the data signal).",
        comparison: "Notice the inverse control polarity compared to XOR: XOR inverts when Control = 1, whereas XNOR inverts when Control = 0."
      },

      workedModels: [
        {
          id: "wm-xnor-1",
          title: "Model 1: 2-Bit Equality Comparator Circuit",
          conceptTag: "Digital Comparator",
          problem: "Design an equality comparator circuit that compares two 2-bit unsigned numbers A = [A1, A0] and B = [B1, B0]. The circuit must output EQUAL = 1 if and only if A equals B.",
          solutionSteps: [
            "Step 1: Two multi-bit numbers are equal if and only if every corresponding bit pair is equal simultaneously: (A1 == B1) AND (A0 == B0).",
            "Step 2: An XNOR gate tests equality between two single bits: X1 = A1 (odot) B1, and X0 = A0 (odot) B0.",
            "  X1 = 1 if A1 == B1; X1 = 0 if A1 != B1.",
            "  X0 = 1 if A0 == B0; X0 = 0 if A0 != B0.",
            "Step 3: Combine both bit equality signals with a 2-input AND gate: EQUAL = X1 . X0.",
            "Step 4: Verify for A = 10_2 and B = 10_2:",
            "  X1 = 1 (odot) 1 = 1; X0 = 0 (odot) 0 = 1.",
            "  EQUAL = 1 . 1 = 1 (Equal verified).",
            "Step 5: Verify for A = 10_2 and B = 11_2:",
            "  X1 = 1 (odot) 1 = 1; X0 = 0 (odot) 1 = 0.",
            "  EQUAL = 1 . 0 = 0 (Not equal verified)."
          ],
          finalAnswer: "EQUAL = (A1 XNOR B1) . (A0 XNOR B0). Uses 2 XNOR gates and 1 AND gate.",
          verification: "Output is 1 only when A1=B1 and A0=B0. Matches numeric equality. Verified."
        },
        {
          id: "wm-xnor-2",
          title: "Model 2: Controlled Inversion Polarity Comparison",
          conceptTag: "Controlled Inversion",
          problem: "Prove algebraically that: (a) A (odot) 1 = A, and (b) A (odot) 0 = A'. Explain why this is the dual of XOR.",
          solutionSteps: [
            "Step 1: Write the definition of XNOR: A (odot) B = AB + A'B'.",
            "Step 2: Case (a) Substitute B = 1:",
            "  A (odot) 1 = A(1) + A'(1') = A(1) + A'(0) = A + 0 = A.",
            "  Thus, tying one input of XNOR to 1 creates a non-inverting buffer.",
            "Step 3: Case (b) Substitute B = 0:",
            "  A (odot) 0 = A(0) + A'(0') = 0 + A'(1) = A'.",
            "  Thus, tying one input of XNOR to 0 creates an inverter.",
            "Step 4: Comparison with XOR:",
            "  For XOR: A (+) 0 = A (Pass with 0); A (+) 1 = A' (Invert with 1).",
            "  For XNOR: A (odot) 1 = A (Pass with 1); A (odot) 0 = A' (Invert with 0)."
          ],
          finalAnswer: "A (odot) 1 = A and A (odot) 0 = A' proven. Control polarities are inverted compared to XOR.",
          verification: "Matches XNOR Boolean algebra axioms. Verified."
        },
        {
          id: "wm-xnor-3",
          title: "Model 3: 3-Input XNOR Evaluation Nuance",
          conceptTag: "Odd/Even Parity Nuance",
          problem: "Evaluate a 3-input XNOR function defined as Y = (A (+) B (+) C)' for: (a) 000, (b) 001, (c) 011, (d) 111. Contrast this with chaining two 2-input XNOR gates ((A (odot) B) (odot) C).",
          solutionSteps: [
            "Step 1: In standard digital logic, an N-input XNOR gate is defined as the complement of an N-input XOR gate: Y = (A (+) B (+) C)'.",
            "Step 2: Since 3-input XOR is an Odd-1s detector, its complement (3-input XNOR) is an Even-1s detector:",
            "  (a) 000 (zero 1s, even): XOR = 0 -> XNOR = 0' = 1.",
            "  (b) 001 (one 1, odd): XOR = 1 -> XNOR = 1' = 0.",
            "  (c) 011 (two 1s, even): XOR = 0 -> XNOR = 0' = 1.",
            "  (d) 111 (three 1s, odd): XOR = 1 -> XNOR = 1' = 0.",
            "Step 3: Now evaluate cascaded 2-input XNOR gates: Z = (A (odot) B) (odot) C:",
            "  For 000: (0 (odot) 0) = 1; 1 (odot) 0 = 0 (Differs from Step 2!).",
            "Step 4: Warning: Associativity of XNOR differs from XOR for odd numbers of inputs. Always use the complemented XOR definition in standard IC datasheets."
          ],
          finalAnswer: "True 3-input XNOR Y = (A (+) B (+) C)' outputs 1 for 000 and 011; outputs 0 for 001 and 111.",
          verification: "Complemented XOR truth table: 0->1, 1->0, 2->1, 3->0. Verified."
        },
        {
          id: "wm-xnor-4",
          title: "Model 4: Even Parity Checker Circuit",
          conceptTag: "Parity Checking",
          problem: "A 4-bit data byte [B3, B2, B1, B0] accompanied by an even parity bit P is received over an ethernet channel. Design an error detector that outputs ERROR = 1 if single-bit corruption occurred.",
          solutionSteps: [
            "Step 1: The sender generated P such that the total number of 1s in [B3, B2, B1, B0, P] is EVEN.",
            "Step 2: An XOR tree computes parity: Sum = B3 (+) B2 (+) B1 (+) B0 (+) P.",
            "Step 3: If transmission is error-free, the number of 1s is even, so Sum = 0.",
            "Step 4: If a single bit flips (0 becomes 1, or 1 becomes 0), the total number of 1s becomes ODD, so Sum = 1.",
            "Step 5: Therefore, ERROR = B3 (+) B2 (+) B1 (+) B0 (+) P directly signals an error when HIGH (1).",
            "Step 6: Alternatively, an XNOR gate outputs VALID = 1 when transmission is error-free (Sum = 0)."
          ],
          finalAnswer: "ERROR = B3 (+) B2 (+) B1 (+) B0 (+) P. An odd count indicates single-bit transmission corruption.",
          verification: "Odd parity detects all single-bit flips. Verified."
        }
      ],

      practiceProblems: [
        {
          id: "pr-xnor-1",
          difficulty: "Easy",
          conceptTag: "Truth Table Evaluation",
          question: "Under what conditions does a 2-input XNOR gate produce an output of HIGH (1)?",
          options: [
            "When both inputs are 0 or both inputs are 1 (inputs are equal)",
            "When input A is 1 and input B is 0",
            "When input A is 0 and input B is 1",
            "Only when both inputs are 1"
          ],
          correctIndex: 0,
          solution: "XNOR is an equality detector. It outputs 1 if and only if both inputs are equal (00 or 11)."
        },
        {
          id: "pr-xnor-2",
          difficulty: "Easy",
          conceptTag: "XOR/XNOR Relation",
          question: "What is the relationship between the truth tables of XOR and XNOR for 2 inputs?",
          options: [
            "They are completely identical",
            "They are exact logical complements of each other in every row",
            "XNOR has twice as many 1s as XOR",
            "XNOR is shifted by one clock period"
          ],
          correctIndex: 1,
          solution: "XNOR = NOT(XOR). In every row of the 2-input truth table, where XOR is 0, XNOR is 1, and where XOR is 1, XNOR is 0."
        },
        {
          id: "pr-xnor-3",
          difficulty: "Medium",
          conceptTag: "Controlled Inverter Property",
          question: "To use an XNOR gate as an inverter, how should its second control pin be connected?",
          options: [
            "Tied to Logic 1 (+5V)",
            "Tied to Logic 0 (Ground)",
            "Left open",
            "Connected to the gate output"
          ],
          correctIndex: 1,
          solution: "A (odot) 0 = A(0) + A'(0') = A'. Tying the control pin of XNOR to 0 inverts the data signal."
        },
        {
          id: "pr-xnor-4",
          difficulty: "Medium",
          conceptTag: "Comparator Logic",
          question: "How many 2-input XNOR gates and AND gates are needed to build an 8-bit digital equality comparator?",
          options: [
            "8 XNOR gates and one 8-input AND gate",
            "4 XNOR gates and 4 AND gates",
            "8 XOR gates and one OR gate",
            "16 XNOR gates and zero AND gates"
          ],
          correctIndex: 0,
          solution: "Each bit pair is compared by one XNOR gate (8 XNOR gates total). The outputs are combined with an 8-input AND gate so that EQUAL = 1 only if all 8 pairs match."
        },
        {
          id: "pr-xnor-5",
          difficulty: "Hard",
          conceptTag: "Boolean Identity",
          question: "Simplify the Boolean expression: Y = A (odot) A'.",
          options: ["1", "0", "A", "A'"],
          correctIndex: 1,
          solution: "By definition, A and A' are always different. Since XNOR outputs 0 when inputs differ, A (odot) A' = 0 permanently."
        },
        {
          id: "pr-xnor-6",
          difficulty: "Hard",
          conceptTag: "Open Collector IC Output",
          question: "IC 74266 is a quad 2-input XNOR gate with open-collector outputs. What external component is mandatory on its output pin for proper digital operation?",
          options: [
            "A series inductor",
            "A pull-up resistor connected to VCC",
            "A bypass capacitor to Ground",
            "A Zener diode"
          ],
          correctIndex: 1,
          solution: "Open-collector outputs cannot source current to produce Logic 1 (+5V) on their own; they only pull down to Ground (0V). An external pull-up resistor connected to VCC is required to pull the line HIGH when the output transistor turns off."
        }
      ]
    }
  },

  // =========================================================================
  // TAB 4: CHEAT SHEET & TIMING WAVEFORMS
  // =========================================================================
  cheatSheetTimingData: {
    masterMatrix: [
      {
        gate: "NOT",
        fullName: "Inverter",
        icNumber: "IC 7404",
        inputs: 1,
        expression: "Y = A'",
        equationLatex: "Y = \\overline{A}",
        highWhen: "Input is 0 (LOW)",
        lowWhen: "Input is 1 (HIGH)",
        keyRole: "Signal negation, oscillator generation, buffering (2 in series)",
        category: "Basic"
      },
      {
        gate: "AND",
        fullName: "Logical Conjunction",
        icNumber: "IC 7408",
        inputs: 2,
        expression: "Y = A . B",
        equationLatex: "Y = A \\cdot B",
        highWhen: "ALL inputs are 1 simultaneously",
        lowWhen: "ANY input is 0",
        keyRole: "Enable/Inhibit gate (EN=1 passes data, EN=0 blocks data), address decoding",
        category: "Basic"
      },
      {
        gate: "OR",
        fullName: "Logical Disjunction",
        icNumber: "IC 7432",
        inputs: 2,
        expression: "Y = A + B",
        equationLatex: "Y = A + B",
        highWhen: "ANY input is 1",
        lowWhen: "ALL inputs are 0 simultaneously",
        keyRole: "Pass/Force gate (C=0 passes data, C=1 forces HIGH), alarm voting",
        category: "Basic"
      },
      {
        gate: "NAND",
        fullName: "NOT-AND (Universal)",
        icNumber: "IC 7400",
        inputs: 2,
        expression: "Y = (A . B)'",
        equationLatex: "Y = \\overline{A \\cdot B}",
        highWhen: "ANY input is 0",
        lowWhen: "ALL inputs are 1 simultaneously",
        keyRole: "Functionally complete universal building block; primary silicon primitive in CMOS",
        category: "Universal"
      },
      {
        gate: "NOR",
        fullName: "NOT-OR (Universal)",
        icNumber: "IC 7402",
        inputs: 2,
        expression: "Y = (A + B)'",
        equationLatex: "Y = \\overline{A + B}",
        highWhen: "ALL inputs are 0 simultaneously",
        lowWhen: "ANY input is 1",
        keyRole: "Functionally complete universal building block; dual of NAND",
        category: "Universal"
      },
      {
        gate: "XOR",
        fullName: "Exclusive-OR",
        icNumber: "IC 7486",
        inputs: 2,
        expression: "Y = A (+) B",
        equationLatex: "Y = A \\oplus B",
        highWhen: "Inputs are DIFFERENT (A != B) [Odd 1s]",
        lowWhen: "Inputs are EQUAL (A == B) [Even 1s]",
        keyRole: "Inequality detector, odd parity generator, half-adder sum, controlled inverter",
        category: "Exclusive"
      },
      {
        gate: "XNOR",
        fullName: "Exclusive-NOR (Equivalence)",
        icNumber: "IC 74266",
        inputs: 2,
        expression: "Y = (A (+) B)'",
        equationLatex: "Y = A \\odot B",
        highWhen: "Inputs are EQUAL (A == B) [Even 1s]",
        lowWhen: "Inputs are DIFFERENT (A != B) [Odd 1s]",
        keyRole: "Digital equality comparator, even parity checker, equivalence testing",
        category: "Exclusive"
      }
    ],

    waveformGuide: {
      title: "Step-by-Step Graphical Timing Waveform Analysis",
      subtitle: "Tracing Logic Output Signals Across Discrete Time Slots",
      methodologySteps: [
        {
          step: 1,
          title: "Identify Input Transition Edges",
          description: "Mark every point in time where ANY input waveform changes state (rising edge 0 -> 1 or falling edge 1 -> 0). Draw vertical dashed grid lines down the timing diagram at each transition."
        },
        {
          step: 2,
          title: "Sample Input Pairs (A, B) in Each Interval",
          description: "Between adjacent dashed lines, all inputs remain steady. Read and record the binary values (A, B) for that specific time interval (e.g., Interval 1: A=0, B=0; Interval 2: A=0, B=1; etc.)."
        },
        {
          step: 3,
          title: "Apply Truth Table Rules",
          description: "Use the fundamental truth table of the logic gate to calculate the exact output Y for each time slice."
        },
        {
          step: 4,
          title: "Draw Output Waveform (with Physical Delay tpd)",
          description: "Plot the resulting output waveform HIGH (+5V) or LOW (0V). In real silicon circuits, shift each output transition slightly to the right by the propagation delay tpd (typically 5 ns to 15 ns)."
        }
      ],

      timeIntervals: [
        { slot: "t1", duration: "0 to 10 ns", a: 0, b: 0, notA: 1, and: 0, or: 0, nand: 1, nor: 1, xor: 0, xnor: 1 },
        { slot: "t2", duration: "10 to 20 ns", a: 0, b: 1, notA: 1, and: 0, or: 1, nand: 1, nor: 0, xor: 1, xnor: 0 },
        { slot: "t3", duration: "20 to 30 ns", a: 1, b: 0, notA: 0, and: 0, or: 1, nand: 1, nor: 0, xor: 1, xnor: 0 },
        { slot: "t4", duration: "30 to 40 ns", a: 1, b: 1, notA: 0, and: 1, or: 1, nand: 0, nor: 0, xor: 0, xnor: 1 }
      ]
    },

    top5ExamMistakes: [
      {
        id: "err-1",
        title: "Mistake 1: Confusing XOR and XNOR Output for All-Zeros (0,0)",
        trap: "Students frequently assume that (0, 0) into an XNOR gate yields 0 because 'zero plus zero is zero'.",
        reality: "XNOR is an EQUALITY detector. Since input A (0) is EQUAL to input B (0), the equality condition is satisfied, so XNOR(0, 0) = 1! In contrast, XOR(0, 0) = 0 because the inputs do not differ.",
        ruleToRemember: "XNOR(0, 0) = 1 and XNOR(1, 1) = 1. XOR(0, 0) = 0 and XOR(1, 1) = 0."
      },
      {
        id: "err-2",
        title: "Mistake 2: Assuming Multi-Input XNOR is Always Inverted XOR",
        trap: "Assuming that a 3-input XNOR behaves as (A (+) B (+) C)' in chained gates without checking associativity.",
        reality: "For an EVEN number of inputs (2, 4, 6...), XNOR is the exact inverse of XOR. But for an ODD number of inputs (3, 5...), chained 2-input XNOR gates ((A XNOR B) XNOR C) produce the SAME output as chained XOR gates for certain rows! In textbook exams, always confirm whether the question means a monolithic 3-input gate (complemented XOR) or a cascade of 2-input gates.",
        ruleToRemember: "Always verify whether the multi-input gate is defined as NOT(Odd-1s) or as cascaded 2-input gates."
      },
      {
        id: "err-3",
        title: "Mistake 3: Leaving Unused TTL Inputs Floating",
        trap: "Leaving unused gate inputs unconnected in circuit diagrams or laboratory breadboards.",
        reality: "In bipolar TTL logic (74xx), a floating pin internally floats to Logic 1 (HIGH). If you leave an unused input of an AND gate floating, it defaults to 1 (safe). But if you leave an unused input of a NOR gate floating, it pulls the output to 0 PERMANENTLY, completely disabling the circuit!",
        ruleToRemember: "Tie unused AND/NAND inputs to VCC (or to an active input). Tie unused OR/NOR inputs to Ground."
      },
      {
        id: "err-4",
        title: "Mistake 4: Inverting the Enable Control Polarity",
        trap: "Using Control = 0 to enable an AND gate, or Control = 1 to enable an OR gate.",
        reality: "AND requires Control = 1 to pass data: A . 1 = A (A . 0 = 0 kills data). OR requires Control = 0 to pass data: A + 0 = A (A + 1 = 1 overrides data). Similarly, NAND inverts with Control = 1, while NOR inverts with Control = 0.",
        ruleToRemember: "AND & NAND enable with 1. OR & NOR enable with 0."
      },
      {
        id: "err-5",
        title: "Mistake 5: Neglecting Propagation Delay in Waveform Timing",
        trap: "Drawing gate output transitions perfectly vertical and synchronized with input transitions.",
        reality: "Real transistors have parasitic capacitance and finite charge-storage times. Gate outputs change only after a propagation delay tpd (typically 5 ns to 15 ns). In high-frequency systems, overlapping delays create transient glitches (hazards) where an output briefly dips to 0 or spikes to 1.",
        ruleToRemember: "Always show output waveforms shifted slightly to the right of input transition edges."
      }
    ]
  }
};
