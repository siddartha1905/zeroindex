/**
 * Digital Logic Design (DLD) - Unit 1: Number Systems & Binary Arithmetic
 * Comprehensive Master Engineering Preparation Guide
 * Faculty: J. Siddartha Varma, Assistant Professor, Department of CSE-DS
 * Vignan’s Institute of Information Technology (A)
 * Strict formatting: Zero em-dashes and zero en-dashes
 */

import {
  practiceSets13A,
  practiceSets13B,
  practiceSets13C,
  practiceSets13D,
  mixedExamPractice20,
  cheatSheetData13
} from "./dldSection13PracticeData.js";
import { section14Data } from "./dldSection14Data.js";
import { section15Data } from "./dldSection15Data.js";
import { section16Data } from "./dldSection16Data.js";
import { section17Data } from "./dldSection17Data.js";

export const dldUnit1Master = {
  unitId: 1,
  unitRoman: "UNIT-I",
  title: "Digital Systems and Binary Arithmetic",
  courseOutcome: "CO1",
  estimatedTime: "9 Lectures / 3 Weeks",
  summary: "Foundational mathematics and physical electronics of digital computation: analog versus digital systems, positional number systems, 12 conversion methodologies, radix complements, signed arithmetic in 2's complement, and digital logic gate primitives.",
  overleafPdfLink: "https://www.overleaf.com/read/zeroindex-dld-unit1",
  
  sections: [
    {
      id: "1.1",
      number: "1.1",
      title: "Digital Systems, Digital Computers & Analog vs. Digital Systems",
      badge: "Core Foundations",
      estimatedReadTime: "10 min read",
      dataScienceConnection: "In Data Science and Machine Learning, real-world data like audio speech, ambient temperature, sensor telemetry, and camera images begin as continuous analog signals. High-speed Analog-to-Digital Converters (ADCs) sample and quantize these voltages into discrete binary tensors (such as 16-bit PCM audio vectors or 8-bit RGB image arrays) before neural networks can process them.",
      
      overview: "Digital electronics forms the physical substrate of modern computing. This section explains the fundamental distinction between continuous physical signals and discrete digital signals using relatable everyday examples, outlines the six key reasons why engineering adopted digital systems, and dissects the core blocks of a digital computer.",
      
      theoryBullets: [
        {
          title: "Signal and System Concept",
          points: [
            "A signal is any time-varying physical quantity that conveys information, such as electrical voltage, acoustic sound pressure, or temperature.",
            "A system is a physical setup that processes input signals to generate meaningful output signals.",
            "Signals exist in two primary forms in electronics: continuous-time analog signals and discrete-time digital signals."
          ]
        },
        {
          title: "Analog Systems: Continuous and Infinite",
          points: [
            "An Analog Signal is continuous in both time and amplitude. It can take any value across an unbroken continuum within its operational range.",
            "Between any two measured points in time, an infinite number of possible voltage or physical values exist.",
            "Analog circuits operate using continuous voltages or currents, relying on physical components like operational amplifiers, resistors, and capacitors."
          ]
        },
        {
          title: "Digital Systems: Discrete and Quantized",
          points: [
            "A Digital Signal is discrete in both time and amplitude. Information is represented using discrete numeric values rather than continuous waves.",
            "Almost all digital electronic systems use Binary Logic, restricting voltages to two discrete states: Logic 0 (LOW, typically 0V) and Logic 1 (HIGH, typically 3.3V or 5V).",
            "Digital circuits process information using microscopic transistor switches (MOSFETs) operating strictly in ON or OFF states."
          ]
        }
      ],

      realLifeExamples: {
        analog: [
          { item: "Classic Wall Clock", detail: "The second hand sweeps smoothly and continuously around the dial without jumping." },
          { item: "Mercury Thermometer", detail: "Mercury expands continuously with temperature, passing through every infinite fraction of a degree." },
          { item: "Human Voice in Air", detail: "Vocal cords create continuous sound waves of continuously varying air pressure." },
          { item: "Mechanical Bike Speedometer", detail: "A physical cable spins a needle smoothly along a continuous speed dial." },
          { item: "Ceiling Fan Dimmer Knob", detail: "A rotary knob smoothly adjusts resistance and fan speed across a continuous spectrum." }
        ],
        digital: [
          { item: "Digital Wristwatch", detail: "Displays discrete numbers like 10:45 AM, updating in distinct steps each second." },
          { item: "Smartphone Display", detail: "Renders millions of discrete pixels, each defined by exact 8-bit numerical color levels." },
          { item: "Laptop Keyboard Key", detail: "Each key press is a distinct binary event: pressed (Logic 1) or released (Logic 0)." },
          { item: "Room Light Switch", detail: "A bistable mechanical switch with only two stable states: ON or OFF." },
          { item: "Electronic Pocket Calculator", detail: "Displays exact numerical characters and computes results using discrete binary logic." }
        ]
      },

      whyDigitalCards: [
        {
          number: "1",
          title: "Noise Immunity",
          desc: "Small voltage fluctuations from electrical noise, heat, or electromagnetic interference do not change a 0 to a 1 because logic levels have safe voltage tolerance bands."
        },
        {
          number: "2",
          title: "Easy and Permanent Storage",
          desc: "Billions of discrete bits can be stored on solid-state drives (SSDs) or flash memory indefinitely without signal decay or quality loss over time."
        },
        {
          number: "3",
          title: "High Accuracy and Precision",
          desc: "Digital systems can achieve arbitrary mathematical precision simply by widening the binary word length (for example, expanding from 16 bits to 32 bits or 64 bits)."
        },
        {
          number: "4",
          title: "Programmability",
          desc: "A single digital microprocessor can perform completely different tasks by loading new software instructions, without altering a single physical wire."
        },
        {
          number: "5",
          title: "Easy Fabrication (ICs)",
          desc: "Billions of identical microscopic transistor switches fit onto a single silicon chip using automated photolithography, making digital electronics cheap and compact."
        },
        {
          number: "6",
          title: "Exact Reproducibility",
          desc: "A digital file, photo, or numerical dataset can be duplicated millions of times across networks with zero loss in fidelity, unlike analog tapes or records."
        }
      ],

      comparisonTable: {
        headers: ["Parameter", "Analog System", "Digital System"],
        rows: [
          ["Signal Waveform", "Continuous time and continuous amplitude (smooth sine curves)", "Discrete time and discrete amplitude (square clock pulses)"],
          ["Possible Values", "Infinite number of values within a given range", "Finite set of discrete values (typically two: 0 and 1)"],
          ["Accuracy and Precision", "Limited by component aging, temperature drift, and tolerances", "High and predictable; easily increased by adding more bits"],
          ["Effect of Electrical Noise", "High; noise directly adds to the signal and distorts the output", "Very low; small noise voltages are rejected by logic threshold bands"],
          ["Memory and Storage", "Difficult to store; signals degrade on magnetic tape or analog media", "Extremely easy; billions of bits stored reliably in RAM and SSDs"],
          ["Flexibility and Modification", "Rigid; changing behavior requires physically modifying circuits", "Flexible; system behavior is changed simply by updating software code"],
          ["Internal Circuit Components", "Operational amplifiers, capacitors, inductors, variable resistors", "Logic gates (AND, OR, NOT), flip-flops, registers, microprocessors"],
          ["Everyday Examples", "Mercury thermometer, sweeping wall clock, human voice, fan knob", "Digital watch, smartphone, laptop keyboard, pocket calculator"]
        ]
      },

      computerArchitecture: {
        title: "Block Diagram and Anatomy of a Digital Computer",
        summary: "A digital computer is a fast, electronic device that accepts binary data, stores instructions, processes data through logical operations, and produces readable results. It is built from five fundamental functional units:",
        blocks: [
          {
            name: "Input Unit",
            role: "Accepts raw data and instructions from external devices (keyboard, mouse, sensor, network card) and converts them into binary machine code (0s and 1s)."
          },
          {
            name: "Central Processing Unit (CPU)",
            role: "The computational core of the computer, containing three tightly integrated subsystems:",
            subBlocks: [
              { name: "Control Unit (CU)", desc: "Interprets program instructions, generates sequencing timing pulses, and coordinates data movement across internal buses." },
              { name: "Arithmetic Logic Unit (ALU)", desc: "Executes binary arithmetic operations (addition, subtraction) and logical evaluations (AND, OR, NOT, comparisons)." },
              { name: "Registers", desc: "Ultra-fast, high-speed semiconductor memory cells inside the CPU holding active operands, memory addresses, and status flags." }
            ]
          },
          {
            name: "Memory Unit",
            role: "Stores active programs, operational variables, and persistent data:",
            subBlocks: [
              { name: "Primary Memory (RAM/ROM)", desc: "Fast semiconductor working memory directly addressed by the CPU for active program execution." },
              { name: "Secondary Storage (SSD/HDD)", desc: "High-capacity non-volatile storage that retains files, datasets, and the operating system when power is removed." }
            ]
          },
          {
            name: "Output Unit",
            role: "Translates processed binary results from the CPU into human-understandable or actionable forms (monitor displays, audio speakers, printers, actuators)."
          }
        ]
      },

      informationQuantization: {
        title: "Information Quantization and Error Vulnerability",
        subtitle: "Why Analog Signals Degrade Over Distance While Digital Signals Can Be Regenerated",
        analogDilemma: {
          title: "The Analog Noise Trap (Cumulative Degradation)",
          points: [
            "Every physical transmission medium (copper wires, air, optical fiber) introduces thermal noise and electromagnetic interference.",
            "In an analog system, noise adds directly to the signal waveform: v_received(t) = v_transmitted(t) + v_noise(t).",
            "Analog amplifiers cannot distinguish between the original signal and the accumulated noise. Therefore, amplifying the signal amplifies the noise equally.",
            "Over long distances with cascading amplifiers, noise compounds continuously until the original audio or sensor signal is completely distorted."
          ]
        },
        digitalAdvantage: {
          title: "The Digital Regeneration Advantage (Zero Degradation)",
          points: [
            "Digital systems slice continuous physical voltages into discrete quantization bands (Logic 0 and Logic 1).",
            "A digital repeater does not merely amplify the received voltage. Instead, it samples the signal and decides whether it represents a 0 or a 1.",
            "As long as the noise voltage does not exceed the Noise Margin (V_IL or V_IH thresholds), the repeater reconstructs a brand-new, clean, perfect square wave.",
            "Digital data can travel through thousands of repeaters across global fiber-optic links and billions of CPU logic gates with zero signal loss."
          ]
        }
      },

      practiceQuestions: [
        {
          q: "Why do digital computers use binary voltage levels (two states) instead of decimal (ten voltage states)?",
          a: "Semiconductor transistors (MOSFETs) operate most reliably, fastest, and with highest energy efficiency when used as simple ON/OFF switches. Distinguishing ten separate voltage levels would create tiny noise margins, making circuits highly susceptible to noise and thermal errors."
        },
        {
          q: "Give two everyday examples where an analog signal is converted to a digital signal before practical use.",
          a: "1. Smartphone voice calls: The microphone converts acoustic sound waves into continuous analog voltages, which an ADC samples into binary bits for transmission.\n2. Digital Photography: Camera image sensors capture continuous light photons on photodiode pixels, which are converted to 8-bit or 14-bit digital numbers for each color channel."
        },
        {
          q: "What is the primary role of the Control Unit inside a digital computer CPU?",
          a: "The Control Unit acts as the supervisor of the computer. It fetches instructions sequentially from memory, decodes what operation must occur, and generates synchronized timing signals to direct the ALU, registers, and memory."
        },
        {
          q: "Explain why digital storage does not degrade over time compared to analog storage like cassette tapes.",
          a: "Analog media store continuous physical magnetizations that fade and accumulate noise with every playback. Digital storage stores discrete binary bits (0s and 1s). As long as the physical medium can distinguish between a 0 and a 1, error-checking algorithms reproduce the exact original bitstream with 100% fidelity."
        }
      ],

      youtubeResource: {
        title: "What is Signal & Analog vs Digital Signals (Neso Academy)",
        channel: "Neso Academy",
        duration: "11:45",
        url: "https://www.youtube.com/watch?v=M0mx8S05v60",
        secondaryUrl: "https://www.youtube.com/watch?v=F5h3z8p9dPg",
        secondaryTitle: "Analog vs Digital Signals",
        topicsCovered: "Continuous vs discrete signals, logic voltage levels, noise margin concepts, and digital advantages."
      }
    },

    {
      id: "1.2",
      number: "1.2",
      title: "Decimal, Binary, Octal and Hexadecimal Number Systems",
      badge: "Positional Base",
      estimatedReadTime: "12 min read",
      dataScienceConnection: "In Data Science, computer memory pointers in C/C++, GPU memory offsets in CUDA, RGB color codes in computer vision (#2E6F40), and low-level bytecode are written in Hexadecimal. A single byte (8 bits) represents one pixel channel or ASCII character, written cleanly as two hexadecimal digits.",
      
      overview: "Positional number systems express numerical values through an ordered set of digits and their position-dependent radix weights. This section breaks down the generalized radix formula, examines the four computing bases, and presents reference tables and fundamental concepts.",
      
      generalFormula: {
        title: "Generalized Positional Radix Expansion",
        explanation: "In any positional number system with base or radix r, the value of a number (N) with integer digits and fractional digits is given by the weighted polynomial expansion:",
        mathHtml: "(N)<sub>r</sub> = d<sub>n-1</sub> · r<sup>n-1</sup> + d<sub>n-2</sub> · r<sup>n-2</sup> + ... + d<sub>1</sub> · r<sup>1</sup> + d<sub>0</sub> · r<sup>0</sup> + d<sub>-1</sub> · r<sup>-1</sup> + d<sub>-2</sub> · r<sup>-2</sup> + ... + d<sub>-m</sub> · r<sup>-m</sup>",
        terms: [
          { symbol: "r", name: "Radix / Base", desc: "The total count of distinct digit symbols available in the number system." },
          { symbol: "d_i", name: "Digit", desc: "An allowed symbol from the set {0, 1, ..., r-1}." },
          { symbol: "r^i", name: "Positional Weight", desc: "The place value assigned to digit d_i based on its position relative to the radix point." },
          { symbol: "MSD / MSB", name: "Most Significant Digit/Bit", desc: "The leftmost non-zero digit, carrying the highest power of the radix." },
          { symbol: "LSD / LSB", name: "Least Significant Digit/Bit", desc: "The rightmost digit, carrying the lowest power of the radix." }
        ]
      },

      placeValueBreakdowns: [
        {
          number: "(452.78)₁₀",
          base: "Decimal (r = 10)",
          parts: [
            { digit: "4", weight: "10² = 100", value: "400", label: "MSD" },
            { digit: "5", weight: "10¹ = 10", value: "50", label: "Tens" },
            { digit: "2", weight: "10⁰ = 1", value: "2", label: "Units (Integer Part)" },
            { digit: ".", weight: "Radix Point", value: ".", label: "Decimal Point" },
            { digit: "7", weight: "10⁻¹ = 0.1", value: "0.7", label: "Tenths" },
            { digit: "8", weight: "10⁻² = 0.01", value: "0.08", label: "LSD (Hundredths)" }
          ],
          totalExpansion: "4 × 100 + 5 × 10 + 2 × 1 + 7 × 0.1 + 8 × 0.01 = 452.78"
        },
        {
          number: "(1101.01)₂",
          base: "Binary (r = 2)",
          parts: [
            { digit: "1", weight: "2³ = 8", value: "8", label: "MSB" },
            { digit: "1", weight: "2² = 4", value: "4", label: "Fours" },
            { digit: "0", weight: "2¹ = 2", value: "0", label: "Twos" },
            { digit: "1", weight: "2⁰ = 1", value: "1", label: "Units (Integer Part)" },
            { digit: ".", weight: "Binary Point", value: ".", label: "Radix Point" },
            { digit: "0", weight: "2⁻¹ = 0.5", value: "0", label: "Halves" },
            { digit: "1", weight: "2⁻² = 0.25", value: "0.25", label: "LSB (Quarters)" }
          ],
          totalExpansion: "1 × 8 + 1 × 4 + 0 × 2 + 1 × 1 + 0 × 0.5 + 1 × 0.25 = (13.25)₁₀"
        }
      ],

      computingBases: [
        {
          id: "decimal",
          name: "Decimal Number System",
          radix: 10,
          symbolSet: "{ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 }",
          purpose: "Universal standard for human daily mathematics, business, and commerce.",
          weightStrip: [
            { power: "10³", value: "1000" },
            { power: "10²", value: "100" },
            { power: "10¹", value: "10" },
            { power: "10⁰", value: "1" },
            { power: "10⁻¹", value: "0.1" },
            { power: "10⁻²", value: "0.01" },
            { power: "10⁻³", value: "0.001" }
          ],
          notes: [
            "Derived historically from humans counting on ten fingers.",
            "Each move to the left increases value by a factor of 10.",
            "Example polynomial breakdown: (734.5)₁₀ = 7×10² + 3×10¹ + 4×10⁰ + 5×10⁻¹ = 700 + 30 + 4 + 0.5 = 734.5."
          ]
        },
        {
          id: "binary",
          name: "Binary Number System",
          radix: 2,
          symbolSet: "{ 0, 1 }",
          purpose: "Internal hardware representation inside all CPU logic, memory, and registers.",
          weightStrip: [
            { power: "2⁴", value: "16" },
            { power: "2³", value: "8" },
            { power: "2²", value: "4" },
            { power: "2¹", value: "2" },
            { power: "2⁰", value: "1" },
            { power: "2⁻¹", value: "0.5" },
            { power: "2⁻²", value: "0.25" },
            { power: "2⁻³", value: "0.125" }
          ],
          notes: [
            "Bit: A single binary digit (0 or 1). The fundamental atom of digital computing.",
            "Nibble: A group of 4 binary bits (for example, 1010). Exactly one hexadecimal digit.",
            "Byte: A group of 8 binary bits (for example, 11001010). The universal standard addressable memory unit.",
            "Word: The native data chunk processed by a CPU in one cycle (16 bits, 32 bits, or 64 bits).",
            "Why Transistors Use Base-2: A transistor is a switch with two stable states (conducting ON or non-conducting OFF). Two states give maximum physical reliability and noise immunity."
          ]
        },
        {
          id: "octal",
          name: "Octal Number System",
          radix: 8,
          symbolSet: "{ 0, 1, 2, 3, 4, 5, 6, 7 }",
          purpose: "Compact shorthand for binary bitstrings and Unix file system permissions (e.g., chmod 755).",
          weightStrip: [
            { power: "8³", value: "512" },
            { power: "8²", value: "64" },
            { power: "8¹", value: "8" },
            { power: "8⁰", value: "1" },
            { power: "8⁻¹", value: "0.125" },
            { power: "8⁻²", value: "0.015625" }
          ],
          notes: [
            "Important Exam Rule: The symbols 8 and 9 do not exist in Octal. Writing (482)₈ is an invalid number.",
            "Since 8 = 2³, exactly 1 Octal digit represents a group of 3 binary bits (e.g., 7₈ = 111₂).",
            "Used heavily in early minicomputers (DEC PDP series) and Linux file access control."
          ]
        },
        {
          id: "hexadecimal",
          name: "Hexadecimal Number System",
          radix: 16,
          symbolSet: "{ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A(10), B(11), C(12), D(13), E(14), F(15) }",
          purpose: "Primary shorthand for 32/64-bit computer memory addresses, debugging byte dumps, and RGB colors.",
          weightStrip: [
            { power: "16³", value: "4096" },
            { power: "16²", value: "256" },
            { power: "16¹", value: "16" },
            { power: "16⁰", value: "1" },
            { power: "16⁻¹", value: "0.0625" },
            { power: "16⁻²", value: "0.00390625" }
          ],
          notes: [
            "Letters A through F represent numeric values 10 through 15.",
            "Since 16 = 2⁴, exactly 1 Hex digit represents a group of 4 binary bits (1 Nibble).",
            "An 8-bit byte (00000000 to 11111111) is written compactly with two hex digits: 00₁₆ to FF₁₆.",
            "Web colors use Hex: #FFFFFF is pure white (R:255, G:255, B:255), and #2E6F40 is VIIT forest green."
          ]
        }
      ],

      referenceTable: [
        { dec: 0, bin: "0000", oct: "0", hex: "0" },
        { dec: 1, bin: "0001", oct: "1", hex: "1" },
        { dec: 2, bin: "0010", oct: "2", hex: "2" },
        { dec: 3, bin: "0011", oct: "3", hex: "3" },
        { dec: 4, bin: "0100", oct: "4", hex: "4" },
        { dec: 5, bin: "0101", oct: "5", hex: "5" },
        { dec: 6, bin: "0110", oct: "6", hex: "6" },
        { dec: 7, bin: "0111", oct: "7", hex: "7" },
        { dec: 8, bin: "1000", oct: "10", hex: "8" },
        { dec: 9, bin: "1001", oct: "11", hex: "9" },
        { dec: 10, bin: "1010", oct: "12", hex: "A" },
        { dec: 11, bin: "1011", oct: "13", hex: "B" },
        { dec: 12, bin: "1100", oct: "14", hex: "C" },
        { dec: 13, bin: "1101", oct: "15", hex: "D" },
        { dec: 14, bin: "1110", oct: "16", hex: "E" },
        { dec: 15, bin: "1111", oct: "17", hex: "F" },
        { dec: 16, bin: "10000", oct: "20", hex: "10" }
      ],

      fundamentalConcepts: [
        {
          title: "Concept 1: Valid vs. Invalid Numbers in a Given Base",
          desc: "In any base r, every individual digit must satisfy 0 ≤ digit ≤ r-1. Any digit equal to or greater than the radix makes the number invalid.",
          examples: [
            { number: "(385)₈", valid: false, reason: "Invalid in Octal because digit 8 is not in {0, 1, 2, 3, 4, 5, 6, 7}." },
            { number: "(1021)₂", valid: false, reason: "Invalid in Binary because digit 2 is not in {0, 1}." },
            { number: "(12A)₄", valid: false, reason: "Invalid in Base-4 because symbol A represents value 10, which exceeds 3." },
            { number: "(760)₈", valid: true, reason: "Valid in Octal because all digits are strictly between 0 and 7." },
            { number: "(4FA)₁₆", valid: true, reason: "Valid in Hexadecimal because 4, F (15), and A (10) are valid hex symbols." }
          ]
        },
        {
          title: "Concept 2: Counting Sequences in Non-Decimal Bases",
          desc: "When counting in any base r, increment the rightmost digit. When it reaches r-1 (the maximum symbol), it rolls over to 0 and produces a carry of 1 to the next left column.",
          examples: [
            {
              base: "Octal Counting (Base 8)",
              question: "Write the next 4 consecutive numbers after (277)₈:",
              solution: "277₈ + 1: 7 rolls over to 0 with carry 1; next 7 rolls over to 0 with carry 1; 2 + 1 = 3. Next numbers are (300)₈, (301)₈, (302)₈, (303)₈."
            },
            {
              base: "Hexadecimal Counting (Base 16)",
              question: "Write the next 4 consecutive numbers after (99F)₁₆:",
              solution: "99F₁₆ + 1: F rolls over to 0 with carry 1; 9 + 1 = A; hundreds column remains 9. Next numbers are (9A0)₁₆, (9A1)₁₆, (9A2)₁₆, (9A3)₁₆."
            }
          ]
        },
        {
          title: "Concept 3: Maximum Representable Value with n Digits",
          desc: "With n digits in base r, the total number of distinct combinations is rⁿ, spanning from 0 up to rⁿ - 1.",
          examples: [
            { entity: "8-bit Byte (Base 2)", combinations: "2⁸ = 256 distinct values", range: "0 to 255 (or 00000000₂ to 11111111₂)" },
            { entity: "16-bit Word (Base 2)", combinations: "2¹⁶ = 65,536 distinct values", range: "0 to 65,535 (or 0000₁₆ to FFFF₁₆)" },
            { entity: "4-digit Hexadecimal (Base 16)", combinations: "16⁴ = 65,536 distinct values", range: "0 to 65,535 (or 0000₁₆ to FFFF₁₆)" },
            { entity: "3-digit Octal (Base 8)", combinations: "8³ = 512 distinct values", range: "0 to 511 (or 000₈ to 777₈)" }
          ]
        }
      ],

      practiceQuestions: [
        {
          q: "What is the difference between a Bit, a Nibble, and a Byte?",
          a: "A Bit is a single binary digit (0 or 1). A Nibble is a group of 4 bits (representing one hexadecimal character). A Byte is a group of 8 bits (representing two hexadecimal characters, or one standard ASCII character in memory)."
        },
        {
          q: "Why is the number (5A9)₈ mathematically invalid?",
          a: "In the Octal number system (base 8), the only permitted digit symbols are 0, 1, 2, 3, 4, 5, 6, and 7. The symbol 'A' represents value 10 and '9' represents value 9; neither exists in base 8."
        },
        {
          q: "What is the largest decimal number that can be represented using 12 binary bits?",
          a: "The largest decimal number representable by n bits is 2ⁿ - 1. For n = 12: 2¹² - 1 = 4096 - 1 = 4095. In binary, this is written as 12 ones: 1111 1111 1111₂."
        },
        {
          q: "What is the decimal equivalent of the positional weight for the digit 5 in (352.4)₈?",
          a: "In (352.4)₈, the digit 5 is at position 1 (the tens column in base 8). Its positional weight is 8¹ = 8. Its contribution to the total decimal value is 5 × 8 = 40."
        }
      ],

      youtubeResource: {
        title: "Number Systems Introduction: Decimal, Binary, Octal & Hexadecimal",
        channel: "Neso Academy",
        duration: "13:20",
        url: "https://www.youtube.com/watch?v=FFDMzbrEXaE",
        secondaryUrl: "https://www.youtube.com/watch?v=w7ZLvYAi6pY",
        secondaryTitle: "Binary Number System Deep Dive",
        topicsCovered: "Radix polynomial expansion, place value weights, comparison of 4 computing bases, and byte definitions."
      }
    },

    {
      id: "1.3",
      number: "1.3",
      title: "Number System Conversions (Complete 12-Path Master Guide)",
      badge: "High-Yield Exam Core",
      estimatedReadTime: "25 min read",
      dataScienceConnection: "Parsing machine learning datasets, serializing binary protocols, decoding network packets, and formatting GPU memory dumps require rapid, precise conversions between binary representations, hex bytecodes, and decimal counters.",
      
      overview: "Every number system conversion in digital electronics belongs to one of four logical master techniques. This complete guide provides rules, visual methods, integer examples, and fractional examples for all 12 conversion paths, plus arbitrary base transitions and unknown radix equations.",

      masterRouteMap: {
        summary: "The 12 conversions are organized into 4 logical groups:",
        groups: [
          { id: "groupA", name: "1.3A: From Decimal to Other Bases", conversions: "Conversions 1, 2, 3", method: "Successive Division for integer (↑) + Successive Multiplication for fraction (↓)" },
          { id: "groupB", name: "1.3B: To Decimal from Other Bases", conversions: "Conversions 4, 5, 6", method: "Positional Weight Polynomial Multiplication Σ d_i · r^i" },
          { id: "groupC", name: "1.3C: Binary ↔ Octal / Hex Shortcuts", conversions: "Conversions 7, 8, 9, 10", method: "Direct Bit Grouping (3-bit for Octal, 4-bit for Hex, zero-padded outward from radix point)" },
          { id: "groupD", name: "1.3D: Octal ↔ Hex & Radix Models", conversions: "Conversions 11, 12, Models 13 & 14", method: "Direct Binary Bridge for Octal-Hex, Decimal Bridge for arbitrary bases, Quadratic equations for unknown radix" }
        ]
      },

      subSections: [
        {
          id: "1.3A",
          title: "Sub-Section 1.3A: Conversions FROM Decimal to Other Bases (Conversions 1, 2, 3)",
          methodology: "Universal Two-Part Algorithm: 1. Integer Part: Repeatedly divide by the target base r until the quotient becomes 0. Record the remainders at each step. Read the remainders from Bottom to Top (first remainder is LSB/LSD, last remainder is MSB/MSD). 2. Fractional Part: Repeatedly multiply by the target base r. Record the integer carry at each step. Read the carries from Top to Bottom (first carry is first fractional digit). Continue until the fraction reaches 0.0 or the desired bit precision is reached.",
          
          conversions: [
            {
              number: "Conversion 1",
              title: "Decimal to Binary: (N)₁₀ → (?)₂",
              targetBase: 2,
              rule: "Divide integer part repeatedly by 2 (collect remainders bottom-to-top ↑). Multiply fractional part repeatedly by 2 (collect integer carries top-to-bottom ↓).",
              practiceProblems: practiceSets13A.conv1,
              flowchart: [
                { step: "Step 1", title: "Separate Number", desc: "Split (N)₁₀ into Integer Part (left of point) and Fractional Part (right of point)." },
                { step: "Step 2", title: "Integer Rule (÷ 2)", desc: "Divide repeatedly by 2 until Quotient = 0. Collect Remainders Bottom-to-Top (↑, MSB to LSB)." },
                { step: "Step 3", title: "Fraction Rule (× 2)", desc: "Multiply fraction repeatedly by 2. Collect Integer Carries Top-to-Bottom (↓)." },
                { step: "Step 4", title: "Combine Result", desc: "Join both parts at the radix point: (Integer Remainders ↑) . (Fraction Carries ↓)₂" }
              ],
              models: [
                {
                  id: "1A",
                  type: "Model 1A (Pure Integer - Full Visual Division Ladder)",
                  problem: "Convert (53)₁₀ to Binary:",
                  integerStage: {
                    title: "Stage 1: Integer Part (53)₁₀ via Successive Division by 2",
                    number: 53,
                    base: 2,
                    rows: [
                      { step: 1, op: "53 ÷ 2", quotient: 26, remainder: "1", note: "1 (LSB - Least Significant Bit)" },
                      { step: 2, op: "26 ÷ 2", quotient: 13, remainder: "0", note: "0" },
                      { step: 3, op: "13 ÷ 2", quotient: 6, remainder: "1", note: "1" },
                      { step: 4, op: "6 ÷ 2", quotient: 3, remainder: "0", note: "0" },
                      { step: 5, op: "3 ÷ 2", quotient: 1, remainder: "1", note: "1" },
                      { step: 6, op: "1 ÷ 2", quotient: 0, remainder: "1", note: "1 (MSB - Most Significant Bit, Stop: Q = 0)" }
                    ],
                    reading: "Reading remainders upward from bottom (MSB) to top (LSB): 1 1 0 1 0 1",
                    result: "(110101)₂"
                  },
                  fractionStage: null,
                  verification: "Powers of 2 check: 32 + 16 + 4 + 1 = 53₁₀ (Verified correct)",
                  finalResult: "(53)₁₀ = (110101)₂"
                },
                {
                  id: "1B",
                  type: "Model 1B (Pure Terminating Fraction - Visual Multiplication Chain)",
                  problem: "Convert (0.6875)₁₀ to Binary:",
                  integerStage: null,
                  fractionStage: {
                    title: "Stage 2: Fractional Part (0.6875)₁₀ via Successive Multiplication by 2",
                    initialFraction: "0.6875",
                    base: 2,
                    rows: [
                      { step: 1, fraction: "0.6875", op: "0.6875 × 2", product: "1.3750", nextFrac: "0.3750", carry: "1", note: "First fractional bit (2⁻¹ = 0.5)" },
                      { step: 2, fraction: "0.3750", op: "0.3750 × 2", product: "0.7500", nextFrac: "0.7500", carry: "0", note: "Second fractional bit (2⁻² = 0.25)" },
                      { step: 3, fraction: "0.7500", op: "0.7500 × 2", product: "1.5000", nextFrac: "0.5000", carry: "1", note: "Third fractional bit (2⁻³ = 0.125)" },
                      { step: 4, fraction: "0.5000", op: "0.5000 × 2", product: "1.0000", nextFrac: "0.0000", carry: "1", note: "Fourth fractional bit (2⁻⁴ = 0.0625, Frac = 0.0 Terminate!)" }
                    ],
                    reading: "Reading integer carries downward from top to bottom: .1 0 1 1",
                    result: "(0.1011)₂"
                  },
                  verification: "Decimal verification: 0.5 + 0.125 + 0.0625 = 0.6875₁₀ (Terminates exactly in 4 steps)",
                  finalResult: "(0.6875)₁₀ = (0.1011)₂"
                },
                {
                  id: "1C",
                  type: "Model 1C (Combined Integer & Fraction Exam Problem)",
                  problem: "Convert (45.625)₁₀ to Binary:",
                  integerStage: {
                    title: "Stage 1: Integer Part (45)₁₀ via Successive Division by 2",
                    number: 45,
                    base: 2,
                    rows: [
                      { step: 1, op: "45 ÷ 2", quotient: 22, remainder: "1", note: "LSB" },
                      { step: 2, op: "22 ÷ 2", quotient: 11, remainder: "0", note: "Bit 1" },
                      { step: 3, op: "11 ÷ 2", quotient: 5, remainder: "1", note: "Bit 2" },
                      { step: 4, op: "5 ÷ 2", quotient: 2, remainder: "1", note: "Bit 3" },
                      { step: 5, op: "2 ÷ 2", quotient: 1, remainder: "0", note: "Bit 4" },
                      { step: 6, op: "1 ÷ 2", quotient: 0, remainder: "1", note: "MSB (Stop: Q = 0)" }
                    ],
                    reading: "Reading remainders upward from bottom (MSB) to top (LSB): 1 0 1 1 0 1",
                    result: "(101101)₂"
                  },
                  fractionStage: {
                    title: "Stage 2: Fractional Part (0.625)₁₀ via Successive Multiplication by 2",
                    initialFraction: "0.625",
                    base: 2,
                    rows: [
                      { step: 1, fraction: "0.625", op: "0.625 × 2", product: "1.250", nextFrac: "0.250", carry: "1", note: "First fractional bit (2⁻¹)" },
                      { step: 2, fraction: "0.250", op: "0.250 × 2", product: "0.500", nextFrac: "0.500", carry: "0", note: "Second fractional bit (2⁻²)" },
                      { step: 3, fraction: "0.500", op: "0.500 × 2", product: "1.000", nextFrac: "0.000", carry: "1", note: "Third fractional bit (2⁻³, Frac = 0.0 Terminate!)" }
                    ],
                    reading: "Reading integer carries downward from top to bottom: .1 0 1",
                    result: "(0.101)₂"
                  },
                  verification: "Integer: 32 + 8 + 4 + 1 = 45; Fraction: 0.5 + 0.125 = 0.625. Combined = 45.625₁₀",
                  finalResult: "(45.625)₁₀ = (101101.101)₂"
                },
                {
                  id: "1D",
                  type: "Model 1D (Non-Terminating / Repeating Fraction - How to Know When to Stop)",
                  problem: "Convert (27.4)₁₀ to Binary (up to 5 fractional bits):",
                  integerStage: {
                    title: "Stage 1: Integer Part (27)₁₀ via Successive Division by 2",
                    number: 27,
                    base: 2,
                    rows: [
                      { step: 1, op: "27 ÷ 2", quotient: 13, remainder: "1", note: "LSB" },
                      { step: 2, op: "13 ÷ 2", quotient: 6, remainder: "1", note: "Bit 1" },
                      { step: 3, op: "6 ÷ 2", quotient: 3, remainder: "0", note: "Bit 2" },
                      { step: 4, op: "3 ÷ 2", quotient: 1, remainder: "1", note: "Bit 3" },
                      { step: 5, op: "1 ÷ 2", quotient: 0, remainder: "1", note: "MSB (Stop: Q = 0)" }
                    ],
                    reading: "Reading remainders upward: 1 1 0 1 1",
                    result: "(11011)₂"
                  },
                  fractionStage: {
                    title: "Stage 2: Fractional Part (0.4)₁₀ via Successive Multiplication by 2",
                    initialFraction: "0.4",
                    base: 2,
                    rows: [
                      { step: 1, fraction: "0.40", op: "0.40 × 2", product: "0.80", nextFrac: "0.80", carry: "0", note: "Bit 1 (Carry 0)" },
                      { step: 2, fraction: "0.80", op: "0.80 × 2", product: "1.60", nextFrac: "0.60", carry: "1", note: "Bit 2 (Carry 1)" },
                      { step: 3, fraction: "0.60", op: "0.60 × 2", product: "1.20", nextFrac: "0.20", carry: "1", note: "Bit 3 (Carry 1)" },
                      { step: 4, fraction: "0.20", op: "0.20 × 2", product: "0.40", nextFrac: "0.40", carry: "0", note: "Bit 4 (Carry 0 - Loop alert: back to starting 0.40!)" },
                      { step: 5, fraction: "0.40", op: "0.40 × 2", product: "0.80", nextFrac: "0.80", carry: "0", note: "Bit 5 (Carry 0 - Pattern repeats)" }
                    ],
                    reading: "Reading integer carries downward: .0 1 1 0 0 ...",
                    result: "(0.01100...)₂",
                    loopAlert: "Repeating Pattern Alert! Notice that Step 4 produces new fraction 0.40, which was our exact starting fraction. The carry sequence 0 1 1 0 will repeat indefinitely (0.01100110...). In semester exams, calculate 4 to 5 fractional bits and append an ellipsis (...) to indicate non-terminating precision."
                  },
                  verification: "Integer 16 + 8 + 2 + 1 = 27; Fraction 0.25 + 0.125 = 0.375 ≈ 0.4",
                  finalResult: "(27.4)₁₀ ≈ (11011.01100...)₂"
                }
              ]
            },
            {
              number: "Conversion 2",
              title: "Decimal to Octal: (N)₁₀ → (?)₈",
              targetBase: 8,
              rule: "Divide integer part repeatedly by 8 (collect remainders bottom-to-top ↑). Multiply fractional part repeatedly by 8 (collect integer carries top-to-bottom ↓).",
              practiceProblems: practiceSets13A.conv2,
              calculatorTip: "Calculator Shortcut Tip: If you compute 394 ÷ 8 = 49.25 on a calculator, the integer quotient is 49. To get the exact integer remainder without manual long division, take only the fractional part (.25) and multiply by the base: 0.25 × 8 = 2! So 394 ÷ 8 = 49 R 2.",
              flowchart: [
                { step: "Step 1", title: "Separate Number", desc: "Split (N)₁₀ into Integer Part (left of point) and Fractional Part (right of point)." },
                { step: "Step 2", title: "Integer Rule (÷ 8)", desc: "Divide repeatedly by 8 until Quotient = 0. Collect Remainders Bottom-to-Top (↑, LSD to MSD)." },
                { step: "Step 3", title: "Fraction Rule (× 8)", desc: "Multiply fraction repeatedly by 8. Collect Integer Carries Top-to-Bottom (↓)." },
                { step: "Step 4", title: "Combine Result", desc: "Join both parts at the radix point: (Integer Remainders ↑) . (Fraction Carries ↓)₈" }
              ],
              models: [
                {
                  id: "2A",
                  type: "Model 2A (Pure Integer - Full Visual Division Ladder)",
                  problem: "Convert (394)₁₀ to Octal:",
                  integerStage: {
                    title: "Stage 1: Integer Part (394)₁₀ via Successive Division by 8",
                    number: 394,
                    base: 8,
                    rows: [
                      { step: 1, op: "394 ÷ 8", quotient: 49, remainder: "2", note: "LSD (Least Significant Digit)" },
                      { step: 2, op: "49 ÷ 8", quotient: 6, remainder: "1", note: "Digit 1" },
                      { step: 3, op: "6 ÷ 8", quotient: 0, remainder: "6", note: "MSD (Most Significant Digit, Stop: Q = 0)" }
                    ],
                    reading: "Reading remainders upward from bottom (MSD) to top (LSD): 6 1 2",
                    result: "(612)₈"
                  },
                  fractionStage: null,
                  verification: "Positional weight check: 6 × 8² + 1 × 8¹ + 2 × 8⁰ = 6 × 64 + 8 + 2 = 384 + 10 = 394₁₀ (Verified correct)",
                  finalResult: "(394)₁₀ = (612)₈"
                },
                {
                  id: "2B",
                  type: "Model 2B (Larger 4-Digit Integer - Crucial Zero Remainder Handling)",
                  problem: "Convert (1792)₁₀ to Octal:",
                  integerStage: {
                    title: "Stage 1: Integer Part (1792)₁₀ via Successive Division by 8",
                    number: 1792,
                    base: 8,
                    rows: [
                      { step: 1, op: "1792 ÷ 8", quotient: 224, remainder: "0", note: "LSD (Remainder 0 - MUST be recorded!)" },
                      { step: 2, op: "224 ÷ 8", quotient: 28, remainder: "0", note: "Digit 1 (Remainder 0 - MUST be recorded!)" },
                      { step: 3, op: "28 ÷ 8", quotient: 3, remainder: "4", note: "Digit 2" },
                      { step: 4, op: "3 ÷ 8", quotient: 0, remainder: "3", note: "MSD (Stop: Q = 0)" }
                    ],
                    reading: "Reading remainders upward from bottom to top: 3 4 0 0",
                    result: "(3400)₈"
                  },
                  fractionStage: null,
                  verification: "Positional check: 3 × 8³ + 4 × 8² + 0 × 8¹ + 0 × 8⁰ = 3 × 512 + 4 × 64 = 1536 + 256 = 1792₁₀",
                  note: "Caution: Never skip a remainder of 0! Trailing zeros in octal are mandatory positional place-holders.",
                  finalResult: "(1792)₁₀ = (3400)₈"
                },
                {
                  id: "2C",
                  type: "Model 2C (Combined Integer + Terminating Fraction)",
                  problem: "Convert (153.515625)₁₀ to Octal:",
                  integerStage: {
                    title: "Stage 1: Integer Part (153)₁₀ via Successive Division by 8",
                    number: 153,
                    base: 8,
                    rows: [
                      { step: 1, op: "153 ÷ 8", quotient: 19, remainder: "1", note: "LSD" },
                      { step: 2, op: "19 ÷ 8", quotient: 2, remainder: "3", note: "Digit 1" },
                      { step: 3, op: "2 ÷ 8", quotient: 0, remainder: "2", note: "MSD (Stop: Q = 0)" }
                    ],
                    reading: "Reading remainders upward: 2 3 1",
                    result: "(231)₈"
                  },
                  fractionStage: {
                    title: "Stage 2: Fractional Part (0.515625)₁₀ via Successive Multiplication by 8",
                    initialFraction: "0.515625",
                    base: 8,
                    rows: [
                      { step: 1, fraction: "0.515625", op: "0.515625 × 8", product: "4.125000", nextFrac: "0.125000", carry: "4", note: "First octal fractional digit (8⁻¹)" },
                      { step: 2, fraction: "0.125000", op: "0.125000 × 8", product: "1.000000", nextFrac: "0.000000", carry: "1", note: "Second octal fractional digit (8⁻², Frac = 0.0 Terminate!)" }
                    ],
                    reading: "Reading integer carries downward from top to bottom: .4 1",
                    result: "(0.41)₈"
                  },
                  verification: "Integer: 2 × 64 + 3 × 8 + 1 = 153; Fraction: 4/8 + 1/64 = 0.5 + 0.015625 = 0.515625. Total = 153.515625₁₀",
                  finalResult: "(153.515625)₁₀ = (231.41)₈"
                },
                {
                  id: "2D",
                  type: "Model 2D (Combined Integer + Non-Terminating Fraction to 4 Octal Places)",
                  problem: "Convert (247.65)₁₀ to Octal (up to 4 fractional digits):",
                  integerStage: {
                    title: "Stage 1: Integer Part (247)₁₀ via Successive Division by 8",
                    number: 247,
                    base: 8,
                    rows: [
                      { step: 1, op: "247 ÷ 8", quotient: 30, remainder: "7", note: "LSD" },
                      { step: 2, op: "30 ÷ 8", quotient: 3, remainder: "6", note: "Digit 1" },
                      { step: 3, op: "3 ÷ 8", quotient: 0, remainder: "3", note: "MSD (Stop: Q = 0)" }
                    ],
                    reading: "Reading remainders upward: 3 6 7",
                    result: "(367)₈"
                  },
                  fractionStage: {
                    title: "Stage 2: Fractional Part (0.65)₁₀ via Successive Multiplication by 8",
                    initialFraction: "0.65",
                    base: 8,
                    rows: [
                      { step: 1, fraction: "0.65", op: "0.65 × 8", product: "5.20", nextFrac: "0.20", carry: "5", note: "Digit 1 (Carry 5)" },
                      { step: 2, fraction: "0.20", op: "0.20 × 8", product: "1.60", nextFrac: "0.60", carry: "1", note: "Digit 2 (Carry 1)" },
                      { step: 3, fraction: "0.60", op: "0.60 × 8", product: "4.80", nextFrac: "0.80", carry: "4", note: "Digit 3 (Carry 4)" },
                      { step: 4, fraction: "0.80", op: "0.80 × 8", product: "6.40", nextFrac: "0.40", carry: "6", note: "Digit 4 (Carry 6, Stop at 4 places)" }
                    ],
                    reading: "Reading integer carries downward: .5 1 4 6 ...",
                    result: "(0.5146...)₈"
                  },
                  verification: "Integer: 3 × 64 + 6 × 8 + 7 = 192 + 48 + 7 = 247₁₀; Fraction: 5/8 + 1/64 ≈ 0.6406 ≈ 0.65",
                  finalResult: "(247.65)₁₀ ≈ (367.5146...)₈"
                }
              ]
            },
            {
              number: "Conversion 3",
              title: "Decimal to Hexadecimal: (N)₁₀ → (?)₁₆",
              targetBase: 16,
              rule: "Divide integer part repeatedly by 16 (convert remainders 10-15 to symbols A-F, collect bottom-to-top ↑). Multiply fraction by 16 (convert carries 10-15 to symbols A-F, collect top-to-bottom ↓).",
              practiceProblems: practiceSets13A.conv3,
              hexLookupStrip: [
                { dec: 10, hex: "A" },
                { dec: 11, hex: "B" },
                { dec: 12, hex: "C" },
                { dec: 13, hex: "D" },
                { dec: 14, hex: "E" },
                { dec: 15, hex: "F" }
              ],
              examTrap: "CRITICAL EXAM TRAP: The #1 student mistake in DLD exams is writing a two-digit decimal remainder like 10, 11, or 12 directly into the final hex answer! Writing (1026)₁₆ instead of (A26)₁₆ is marked completely wrong. Always substitute the hex letter immediately upon extraction!",
              flowchart: [
                { step: "Step 1", title: "Separate Number", desc: "Split (N)₁₀ into Integer Part (left of point) and Fractional Part (right of point)." },
                { step: "Step 2", title: "Integer Rule (÷ 16)", desc: "Divide repeatedly by 16 until Quotient = 0. Convert remainders 10-15 to symbols A-F. Collect Bottom-to-Top (↑)." },
                { step: "Step 3", title: "Fraction Rule (× 16)", desc: "Multiply fraction repeatedly by 16. Convert integer carries 10-15 to symbols A-F. Collect Top-to-Bottom (↓)." },
                { step: "Step 4", title: "Combine Result", desc: "Join both parts at the radix point: (Integer Remainders ↑) . (Fraction Carries ↓)₁₆" }
              ],
              models: [
                {
                  id: "3A",
                  type: "Model 3A (Pure Integer with Hex Letter Remainder Conversion)",
                  problem: "Convert (2598)₁₀ to Hexadecimal:",
                  integerStage: {
                    title: "Stage 1: Integer Part (2598)₁₀ via Successive Division by 16",
                    number: 2598,
                    base: 16,
                    rows: [
                      { step: 1, op: "2598 ÷ 16", quotient: 162, remainder: "6", hexSymbol: "6", note: "LSD" },
                      { step: 2, op: "162 ÷ 16", quotient: 10, remainder: "2", hexSymbol: "2", note: "Digit 1" },
                      { step: 3, op: "10 ÷ 16", quotient: 0, remainder: "10", hexSymbol: "A", note: "MSD (Remainder 10 converts to Hex Symbol A, Stop: Q = 0)" }
                    ],
                    reading: "Reading remainders upward from bottom (MSD) to top (LSD): A 2 6",
                    result: "(A26)₁₆"
                  },
                  fractionStage: null,
                  verification: "Positional check: 10 × 16² + 2 × 16¹ + 6 × 16⁰ = 10 × 256 + 32 + 6 = 2560 + 38 = 2598₁₀ (Verified correct)",
                  finalResult: "(2598)₁₀ = (A26)₁₆"
                },
                {
                  id: "3B",
                  type: "Model 3B (Integer Producing Multiple Hex Letters: A, B, C, D)",
                  problem: "Convert (43981)₁₀ to Hexadecimal:",
                  integerStage: {
                    title: "Stage 1: Integer Part (43981)₁₀ via Successive Division by 16",
                    number: 43981,
                    base: 16,
                    rows: [
                      { step: 1, op: "43981 ÷ 16", quotient: 2748, remainder: "13", hexSymbol: "D", note: "LSD (Remainder 13 = Symbol D)" },
                      { step: 2, op: "2748 ÷ 16", quotient: 171, remainder: "12", hexSymbol: "C", note: "Digit 1 (Remainder 12 = Symbol C)" },
                      { step: 3, op: "171 ÷ 16", quotient: 10, remainder: "11", hexSymbol: "B", note: "Digit 2 (Remainder 11 = Symbol B)" },
                      { step: 4, op: "10 ÷ 16", quotient: 0, remainder: "10", hexSymbol: "A", note: "MSD (Remainder 10 = Symbol A, Stop: Q = 0)" }
                    ],
                    reading: "Reading remainders upward from bottom to top: A B C D",
                    result: "(ABCD)₁₆"
                  },
                  fractionStage: null,
                  verification: "Positional check: 10 × 4096 + 11 × 256 + 12 × 16 + 13 = 40960 + 2816 + 192 + 13 = 43981₁₀",
                  finalResult: "(43981)₁₀ = (ABCD)₁₆"
                },
                {
                  id: "3C",
                  type: "Model 3C (Combined Integer + Terminating Fraction)",
                  problem: "Convert (675.625)₁₀ to Hexadecimal:",
                  integerStage: {
                    title: "Stage 1: Integer Part (675)₁₀ via Successive Division by 16",
                    number: 675,
                    base: 16,
                    rows: [
                      { step: 1, op: "675 ÷ 16", quotient: 42, remainder: "3", hexSymbol: "3", note: "LSD" },
                      { step: 2, op: "42 ÷ 16", quotient: 2, remainder: "10", hexSymbol: "A", note: "Digit 1 (Remainder 10 = Symbol A)" },
                      { step: 3, op: "2 ÷ 16", quotient: 0, remainder: "2", hexSymbol: "2", note: "MSD (Stop: Q = 0)" }
                    ],
                    reading: "Reading remainders upward: 2 A 3",
                    result: "(2A3)₁₆"
                  },
                  fractionStage: {
                    title: "Stage 2: Fractional Part (0.625)₁₀ via Successive Multiplication by 16",
                    initialFraction: "0.625",
                    base: 16,
                    rows: [
                      { step: 1, fraction: "0.625", op: "0.625 × 16", product: "10.000", nextFrac: "0.000", carry: "10", hexSymbol: "A", note: "First hex fractional digit (16⁻¹, Carry 10 = Symbol A, Frac = 0.0 Terminate!)" }
                    ],
                    reading: "Reading integer carries downward: .A",
                    result: "(0.A)₁₆"
                  },
                  verification: "Integer: 2 × 256 + 10 × 16 + 3 = 512 + 160 + 3 = 675; Fraction: 10/16 = 0.625. Combined = 675.625₁₀",
                  finalResult: "(675.625)₁₀ = (2A3.A)₁₆"
                },
                {
                  id: "3D",
                  type: "Model 3D (Combined Integer + Multi-Step Fractional Hex)",
                  problem: "Convert (942.78)₁₀ to Hexadecimal (up to 3 fractional places):",
                  integerStage: {
                    title: "Stage 1: Integer Part (942)₁₀ via Successive Division by 16",
                    number: 942,
                    base: 16,
                    rows: [
                      { step: 1, op: "942 ÷ 16", quotient: 58, remainder: "14", hexSymbol: "E", note: "LSD (Remainder 14 = Symbol E)" },
                      { step: 2, op: "58 ÷ 16", quotient: 3, remainder: "10", hexSymbol: "A", note: "Digit 1 (Remainder 10 = Symbol A)" },
                      { step: 3, op: "3 ÷ 16", quotient: 0, remainder: "3", hexSymbol: "3", note: "MSD (Stop: Q = 0)" }
                    ],
                    reading: "Reading remainders upward: 3 A E",
                    result: "(3AE)₁₆"
                  },
                  fractionStage: {
                    title: "Stage 2: Fractional Part (0.78)₁₀ via Successive Multiplication by 16",
                    initialFraction: "0.78",
                    base: 16,
                    rows: [
                      { step: 1, fraction: "0.78", op: "0.78 × 16", product: "12.48", nextFrac: "0.48", carry: "12", hexSymbol: "C", note: "Carry 12 = Symbol C" },
                      { step: 2, fraction: "0.48", op: "0.48 × 16", product: "7.68", nextFrac: "0.68", carry: "7", hexSymbol: "7", note: "Carry 7" },
                      { step: 3, fraction: "0.68", op: "0.68 × 16", product: "10.88", nextFrac: "0.88", carry: "10", hexSymbol: "A", note: "Carry 10 = Symbol A (Stop at 3 places)" }
                    ],
                    reading: "Reading integer carries downward: .C 7 A ...",
                    result: "(0.C7A...)₁₆"
                  },
                  verification: "Integer: 3 × 256 + 10 × 16 + 14 = 768 + 160 + 14 = 942₁₀; Fraction: 12/16 + 7/256 + 10/4096 ≈ 0.7798 ≈ 0.78",
                  finalResult: "(942.78)₁₀ ≈ (3AE.C7A...)₁₆"
                }
              ]
            }
          ]
        },

        {
          id: "1.3B",
          title: "Sub-Section 1.3B: Conversions TO Decimal from Other Bases (Conversions 4, 5, 6)",
          methodology: "Universal Positional Expansion Method: Multiply each digit by its positional weight rⁱ (where i is the integer index 0, 1, 2... to the left of the radix point, and -1, -2, -3... to the right of the radix point). Sum all products in decimal arithmetic.",
          
          conversions: [
            {
              number: "Conversion 4",
              sourceBase: 2,
              title: "Binary to Decimal: (N)₂ → (?)₁₀",
              badge: "∑ bit × 2ⁱ",
              practiceProblems: practiceSets13B.conv4,
              models: [
                {
                  type: "Model 4A: Pure Integer",
                  problem: "Convert (110101)₂ to Decimal:",
                  numberStr: "110101",
                  radix: 2,
                  weightTerms: [
                    { symbol: "1", power: 5, weightVal: "32", product: "32", active: true },
                    { symbol: "1", power: 4, weightVal: "16", product: "16", active: true },
                    { symbol: "0", power: 3, weightVal: "8", product: "0", active: false, skipNote: "0 bit = 0 (skip in exam)" },
                    { symbol: "1", power: 2, weightVal: "4", product: "4", active: true },
                    { symbol: "0", power: 1, weightVal: "2", product: "0", active: false, skipNote: "0 bit = 0 (skip in exam)" },
                    { symbol: "1", power: 0, weightVal: "1", product: "1", active: true }
                  ],
                  sumExpression: "32 + 16 + 0 + 4 + 0 + 1 = 53",
                  result: "(110101)₂ = (53)₁₀",
                  verification: "Check: 32 + 16 + 4 + 1 = 53 ✓",
                  tip: "Exam Shortcut: Simply sum the powers of 2 where the bit is 1: 32 + 16 + 4 + 1 = 53."
                },
                {
                  type: "Model 4B: Pure Fraction",
                  problem: "Convert (0.1011)₂ to Decimal:",
                  numberStr: "0.1011",
                  radix: 2,
                  weightTerms: [
                    { symbol: "1", power: -1, weightVal: "2⁻¹ = 0.5", product: "0.5", active: true },
                    { symbol: "0", power: -2, weightVal: "2⁻² = 0.25", product: "0", active: false, skipNote: "0 bit = 0" },
                    { symbol: "1", power: -3, weightVal: "2⁻³ = 0.125", product: "0.125", active: true },
                    { symbol: "1", power: -4, weightVal: "2⁻⁴ = 0.0625", product: "0.0625", active: true }
                  ],
                  sumExpression: "0.5 + 0 + 0.125 + 0.0625 = 0.6875",
                  result: "(0.1011)₂ = (0.6875)₁₀",
                  verification: "Check: 1/2 + 1/8 + 1/16 = 8/16 + 2/16 + 1/16 = 11/16 = 0.6875 ✓"
                },
                {
                  type: "Model 4C: Combined Integer + Fraction",
                  problem: "Convert (10110.101)₂ to Decimal:",
                  numberStr: "10110.101",
                  radix: 2,
                  integerTerms: [
                    { symbol: "1", power: 4, weightVal: "16", product: "16", active: true },
                    { symbol: "0", power: 3, weightVal: "8", product: "0", active: false },
                    { symbol: "1", power: 2, weightVal: "4", product: "4", active: true },
                    { symbol: "1", power: 1, weightVal: "2", product: "2", active: true },
                    { symbol: "0", power: 0, weightVal: "1", product: "0", active: false }
                  ],
                  fractionTerms: [
                    { symbol: "1", power: -1, weightVal: "0.5", product: "0.5", active: true },
                    { symbol: "0", power: -2, weightVal: "0.25", product: "0", active: false },
                    { symbol: "1", power: -3, weightVal: "0.125", product: "0.125", active: true }
                  ],
                  integerSum: "16 + 0 + 4 + 2 + 0 = 22",
                  fractionSum: "0.5 + 0 + 0.125 = 0.625",
                  combinedSum: "22 + 0.625 = 22.625",
                  result: "(10110.101)₂ = (22.625)₁₀",
                  verification: "Check: 16 + 4 + 2 = 22, and 0.5 + 0.125 = 0.625 -> (22.625)₁₀ ✓"
                },
                {
                  type: "Model 4D: 8-Bit Byte with All 1s Shortcut",
                  problem: "Convert (11111111)₂ to Decimal using the 2ⁿ - 1 Formula:",
                  numberStr: "11111111",
                  radix: 2,
                  formulaCard: "n consecutive 1s in base 2 equal 2ⁿ - 1. Here n = 8 bits, so 2⁸ - 1 = 256 - 1 = 255.",
                  weightTerms: [
                    { symbol: "1", power: 7, weightVal: "128", product: "128", active: true },
                    { symbol: "1", power: 6, weightVal: "64", product: "64", active: true },
                    { symbol: "1", power: 5, weightVal: "32", product: "32", active: true },
                    { symbol: "1", power: 4, weightVal: "16", product: "16", active: true },
                    { symbol: "1", power: 3, weightVal: "8", product: "8", active: true },
                    { symbol: "1", power: 2, weightVal: "4", product: "4", active: true },
                    { symbol: "1", power: 1, weightVal: "2", product: "2", active: true },
                    { symbol: "1", power: 0, weightVal: "1", product: "1", active: true }
                  ],
                  sumExpression: "128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255",
                  result: "(11111111)₂ = 2⁸ - 1 = (255)₁₀",
                  verification: "Check: 255 + 1 = 256 = (100000000)₂ ✓"
                }
              ]
            },
            {
              number: "Conversion 5",
              sourceBase: 8,
              title: "Octal to Decimal: (N)₈ → (?)₁₀",
              badge: "∑ digit × 8ⁱ",
              practiceProblems: practiceSets13B.conv5,
              models: [
                {
                  type: "Model 5A: Pure Integer",
                  problem: "Convert (742)₈ to Decimal:",
                  numberStr: "742",
                  radix: 8,
                  weightTerms: [
                    { symbol: "7", power: 2, weightVal: "64", product: "448", active: true },
                    { symbol: "4", power: 1, weightVal: "8", product: "32", active: true },
                    { symbol: "2", power: 0, weightVal: "1", product: "2", active: true }
                  ],
                  sumExpression: "448 + 32 + 2 = 482",
                  result: "(742)₈ = (482)₁₀",
                  verification: "Check: 482 ÷ 8 = 60 R 2; 60 ÷ 8 = 7 R 4; 7 ÷ 8 = 0 R 7 -> (742)₈ ✓"
                },
                {
                  type: "Model 5B: 4-Digit Integer",
                  problem: "Convert (2305)₈ to Decimal:",
                  numberStr: "2305",
                  radix: 8,
                  weightTerms: [
                    { symbol: "2", power: 3, weightVal: "512", product: "1024", active: true },
                    { symbol: "3", power: 2, weightVal: "64", product: "192", active: true },
                    { symbol: "0", power: 1, weightVal: "8", product: "0", active: false, skipNote: "0 digit = 0" },
                    { symbol: "5", power: 0, weightVal: "1", product: "5", active: true }
                  ],
                  sumExpression: "1024 + 192 + 0 + 5 = 1221",
                  result: "(2305)₈ = (1221)₁₀",
                  verification: "Check: 1024 + 192 + 5 = 1221 ✓"
                },
                {
                  type: "Model 5C: Combined Integer + Fraction",
                  problem: "Convert (365.24)₈ to Decimal:",
                  numberStr: "365.24",
                  radix: 8,
                  integerTerms: [
                    { symbol: "3", power: 2, weightVal: "64", product: "192", active: true },
                    { symbol: "6", power: 1, weightVal: "8", product: "48", active: true },
                    { symbol: "5", power: 0, weightVal: "1", product: "5", active: true }
                  ],
                  fractionTerms: [
                    { symbol: "2", power: -1, weightVal: "8⁻¹ = 0.125", product: "0.25", active: true },
                    { symbol: "4", power: -2, weightVal: "8⁻² = 0.015625", product: "0.0625", active: true }
                  ],
                  integerSum: "192 + 48 + 5 = 245",
                  fractionSum: "0.25 + 0.0625 = 0.3125",
                  combinedSum: "245 + 0.3125 = 245.3125",
                  result: "(365.24)₈ = (245.3125)₁₀",
                  verification: "Check: 245.3125: 0.3125 × 8 = 2.5 (carry 2); 0.5 × 8 = 4.0 (carry 4) -> .24 ✓"
                },
                {
                  type: "Model 5D: Fractional Octal",
                  problem: "Convert (0.64)₈ to Decimal:",
                  numberStr: "0.64",
                  radix: 8,
                  fractionTerms: [
                    { symbol: "6", power: -1, weightVal: "8⁻¹ = 0.125", product: "6 × 0.125 = 0.75", active: true },
                    { symbol: "4", power: -2, weightVal: "8⁻² = 0.015625", product: "4 × 0.015625 = 0.0625", active: true }
                  ],
                  sumExpression: "0.75 + 0.0625 = 0.8125",
                  result: "(0.64)₈ = (0.8125)₁₀",
                  verification: "Check: 0.8125 × 8 = 6.5 (carry 6); 0.5 × 8 = 4.0 (carry 4) -> (0.64)₈ ✓"
                }
              ]
            },
            {
              number: "Conversion 6",
              sourceBase: 16,
              title: "Hexadecimal to Decimal: (N)₁₆ → (?)₁₀",
              badge: "∑ digit × 16ⁱ",
              practiceProblems: practiceSets13B.conv6,
              models: [
                {
                  type: "Model 6A: Pure Integer with Hex Letters",
                  problem: "Convert (2F9)₁₆ to Decimal:",
                  numberStr: "2F9",
                  radix: 16,
                  weightTerms: [
                    { symbol: "2", power: 2, weightVal: "256", product: "512", active: true },
                    { symbol: "F", hexVal: 15, power: 1, weightVal: "16", product: "15 × 16 = 240", active: true, note: "F = 15" },
                    { symbol: "9", power: 0, weightVal: "1", product: "9", active: true }
                  ],
                  sumExpression: "512 + 240 + 9 = 761",
                  result: "(2F9)₁₆ = (761)₁₀",
                  verification: "Check: 761 ÷ 16 = 47 R 9; 47 ÷ 16 = 2 R 15 (F); 2 ÷ 16 = 0 R 2 -> (2F9)₁₆ ✓"
                },
                {
                  type: "Model 6B: 4-Digit Hex Memory Value",
                  problem: "Convert (1A3E)₁₆ to Decimal:",
                  numberStr: "1A3E",
                  radix: 16,
                  weightTerms: [
                    { symbol: "1", power: 3, weightVal: "4096", product: "4096", active: true },
                    { symbol: "A", hexVal: 10, power: 2, weightVal: "256", product: "10 × 256 = 2560", active: true, note: "A = 10" },
                    { symbol: "3", power: 1, weightVal: "16", product: "48", active: true },
                    { symbol: "E", hexVal: 14, power: 0, weightVal: "1", product: "14 × 1 = 14", active: true, note: "E = 14" }
                  ],
                  sumExpression: "4096 + 2560 + 48 + 14 = 6718",
                  result: "(1A3E)₁₆ = (6718)₁₀",
                  verification: "Check: 4096 + 2560 + 48 + 14 = 6718 ✓"
                },
                {
                  type: "Model 6C: Combined Integer + Fraction",
                  problem: "Convert (B6A.C8)₁₆ to Decimal:",
                  numberStr: "B6A.C8",
                  radix: 16,
                  integerTerms: [
                    { symbol: "B", hexVal: 11, power: 2, weightVal: "256", product: "11 × 256 = 2816", active: true, note: "B = 11" },
                    { symbol: "6", power: 1, weightVal: "16", product: "96", active: true },
                    { symbol: "A", hexVal: 10, power: 0, weightVal: "1", product: "10 × 1 = 10", active: true, note: "A = 10" }
                  ],
                  fractionTerms: [
                    { symbol: "C", hexVal: 12, power: -1, weightVal: "16⁻¹ = 0.0625", product: "12 × 0.0625 = 0.75", active: true, note: "C = 12" },
                    { symbol: "8", power: -2, weightVal: "16⁻² = 0.00390625", product: "8 × 0.00390625 = 0.03125", active: true }
                  ],
                  integerSum: "2816 + 96 + 10 = 2922",
                  fractionSum: "0.75 + 0.03125 = 0.78125",
                  combinedSum: "2922 + 0.78125 = 2922.78125",
                  result: "(B6A.C8)₁₆ = (2922.78125)₁₀",
                  verification: "Check: 0.78125 × 16 = 12.5 (carry 12=C); 0.5 × 16 = 8.0 (carry 8) -> .C8 ✓"
                },
                {
                  type: "Model 6D: Pure Hex Fraction",
                  problem: "Convert (0.A4)₁₆ to Decimal:",
                  numberStr: "0.A4",
                  radix: 16,
                  fractionTerms: [
                    { symbol: "A", hexVal: 10, power: -1, weightVal: "16⁻¹ = 0.0625", product: "10 × 0.0625 = 0.625", active: true, note: "A = 10" },
                    { symbol: "4", power: -2, weightVal: "16⁻² = 0.00390625", product: "4 × 0.00390625 = 0.015625", active: true }
                  ],
                  sumExpression: "0.625 + 0.015625 = 0.640625",
                  result: "(0.A4)₁₆ = (0.640625)₁₀",
                  verification: "Check: 0.640625 × 16 = 10.25 (carry 10=A); 0.25 × 16 = 4.0 (carry 4) -> (0.A4)₁₆ ✓"
                }
              ]
            }
          ]
        },

        {
          id: "1.3C",
          title: "Sub-Section 1.3C: Binary ↔ Octal & Hexadecimal Grouping Shortcuts (Conversions 7, 8, 9, 10)",
          methodology: "Powers of 2 Shortcut Rule: Since 8 = 2³ and 16 = 2⁴, you NEVER convert through Decimal. Direct grouping is exact and instantaneous. For integer parts: group bits starting from the radix point moving left (pad leading zeros to form a complete 3 or 4-bit group). For fractional parts: group bits starting from the radix point moving right (pad trailing zeros to form a complete group).",
          
          conversions: [
            {
              number: "Conversion 7",
              title: "Binary to Octal: (N)₂ → (?)₈",
              badge: "Group 3 Bits",
              groupSize: 3,
              type: "grouping",
              practiceProblems: practiceSets13C.conv7,
              models: [
                {
                  type: "Model 7A: Exact 3-Bit Multiple",
                  problem: "Convert (110101)₂ to Octal:",
                  groups: [
                    { bits: "110", digit: "6", paddedZeros: 0 },
                    { bits: "101", digit: "5", paddedZeros: 0 }
                  ],
                  result: "(110101)₂ = (65)₈",
                  verification: "Check: 6 × 8 + 5 = 53₁₀; (110101)₂ = 32 + 16 + 4 + 1 = 53₁₀ ✓"
                },
                {
                  type: "Model 7B: Integer Requiring Left Zero-Padding",
                  problem: "Convert (1011101)₂ to Octal:",
                  note: "Original integer has 7 bits. Moving left from radix point: group 1 = 101, group 2 = 011, group 3 = 1. Pad two leading zeros on group 3: [001] [011] [101].",
                  groups: [
                    { bits: "001", digit: "1", paddedZeros: 2, originalBits: "1" },
                    { bits: "011", digit: "3", paddedZeros: 0 },
                    { bits: "101", digit: "5", paddedZeros: 0 }
                  ],
                  result: "(1011101)₂ = (135)₈",
                  verification: "Check: 1×64 + 3×8 + 5 = 64 + 24 + 5 = 93₁₀; (1011101)₂ = 64 + 16 + 8 + 4 + 1 = 93₁₀ ✓"
                },
                {
                  type: "Model 7C: Combined Integer + Fraction with Both-Side Padding",
                  problem: "Convert (1011101.1101)₂ to Octal:",
                  note: "Pad two leading zeros on the integer side [001] and two trailing zeros on the fraction side [100].",
                  integerGroups: [
                    { bits: "001", digit: "1", paddedZeros: 2, originalBits: "1" },
                    { bits: "011", digit: "3", paddedZeros: 0 },
                    { bits: "101", digit: "5", paddedZeros: 0 }
                  ],
                  fractionGroups: [
                    { bits: "110", digit: "6", paddedZeros: 0 },
                    { bits: "100", digit: "4", paddedZeros: 2, originalBits: "1" }
                  ],
                  result: "(1011101.1101)₂ = (135.64)₈",
                  verification: "Check: [001][011][101].[110][100] = 135.64₈ ✓"
                }
              ]
            },
            {
              number: "Conversion 8",
              title: "Octal to Binary: (N)₈ → (?)₂",
              badge: "1 Digit → 3 Bits",
              groupSize: 3,
              type: "expansion",
              practiceProblems: practiceSets13C.conv8,
              models: [
                {
                  type: "Model 8A: Pure Integer",
                  problem: "Convert (673)₈ to Binary:",
                  expansions: [
                    { digit: "6", bits: "110" },
                    { digit: "7", bits: "111" },
                    { digit: "3", bits: "011" }
                  ],
                  result: "(673)₈ = (110111011)₂",
                  verification: "Check: 6=110, 7=111, 3=011. Concatenated: 110111011₂ ✓"
                },
                {
                  type: "Model 8B: Octal Containing Zero Digits (Why 0 Must Become 000)",
                  problem: "Convert (405)₈ to Binary:",
                  note: "Critical Rule: Middle zeros cannot be dropped or compressed. 0₈ MUST be written as 000₂.",
                  expansions: [
                    { digit: "4", bits: "100" },
                    { digit: "0", bits: "000", alert: "Must expand to full 3 bits '000', never single '0'!" },
                    { digit: "5", bits: "101" }
                  ],
                  result: "(405)₈ = (100000101)₂",
                  verification: "Check: 4×64 + 0×8 + 5 = 261₁₀; (100000101)₂ = 256 + 4 + 1 = 261₁₀ ✓"
                },
                {
                  type: "Model 8C: Combined Integer + Fraction",
                  problem: "Convert (673.52)₈ to Binary:",
                  integerExpansions: [
                    { digit: "6", bits: "110" },
                    { digit: "7", bits: "111" },
                    { digit: "3", bits: "011" }
                  ],
                  fractionExpansions: [
                    { digit: "5", bits: "101" },
                    { digit: "2", bits: "010" }
                  ],
                  result: "(673.52)₈ = (110111011.10101)₂",
                  verification: "Check: 673 -> 110111011, and .52 -> .101010 (trailing 0 can be dropped) ✓"
                }
              ]
            },
            {
              number: "Conversion 9",
              title: "Binary to Hexadecimal: (N)₂ → (?)₁₆",
              badge: "Group 4 Bits",
              groupSize: 4,
              type: "grouping",
              practiceProblems: practiceSets13C.conv9,
              models: [
                {
                  type: "Model 9A: Pure Integer",
                  problem: "Convert (11011010)₂ to Hexadecimal:",
                  groups: [
                    { bits: "1101", digit: "D", decVal: 13, paddedZeros: 0 },
                    { bits: "1010", digit: "A", decVal: 10, paddedZeros: 0 }
                  ],
                  result: "(11011010)₂ = (DA)₁₆",
                  verification: "Check: 13×16 + 10 = 208 + 10 = 218₁₀; (11011010)₂ = 128 + 64 + 16 + 8 + 2 = 218₁₀ ✓"
                },
                {
                  type: "Model 9B: Integer Requiring Left Zero-Padding",
                  problem: "Convert (1101111010)₂ to Hexadecimal:",
                  note: "10 bits total. Grouping from right: [1010], [0111], [11]. Pad two leading zeros to make [0011].",
                  groups: [
                    { bits: "0011", digit: "3", paddedZeros: 2, originalBits: "11" },
                    { bits: "0111", digit: "7", paddedZeros: 0 },
                    { bits: "1010", digit: "A", decVal: 10, paddedZeros: 0 }
                  ],
                  result: "(1101111010)₂ = (37A)₁₆",
                  verification: "Check: 3×256 + 7×16 + 10 = 768 + 112 + 10 = 890₁₀; (1101111010)₂ = 512+256+64+32+16+8+2 = 890₁₀ ✓"
                },
                {
                  type: "Model 9C: Combined Integer + Fraction with Both-Side Padding",
                  problem: "Convert (1101111010.01111)₂ to Hexadecimal:",
                  integerGroups: [
                    { bits: "0011", digit: "3", paddedZeros: 2, originalBits: "11" },
                    { bits: "0111", digit: "7", paddedZeros: 0 },
                    { bits: "1010", digit: "A", decVal: 10, paddedZeros: 0 }
                  ],
                  fractionGroups: [
                    { bits: "0111", digit: "7", paddedZeros: 0 },
                    { bits: "1000", digit: "8", paddedZeros: 3, originalBits: "1" }
                  ],
                  result: "(1101111010.01111)₂ = (37A.78)₁₆",
                  verification: "Check: Integer [0011][0111][1010] = 37A; Fraction [0111][1000] = 78 -> (37A.78)₁₆ ✓"
                }
              ]
            },
            {
              number: "Conversion 10",
              title: "Hexadecimal to Binary: (N)₁₆ → (?)₂",
              badge: "1 Digit → 4 Bits",
              groupSize: 4,
              type: "expansion",
              practiceProblems: practiceSets13C.conv10,
              models: [
                {
                  type: "Model 10A: Pure Integer",
                  problem: "Convert (9AF)₁₆ to Binary:",
                  expansions: [
                    { digit: "9", bits: "1001" },
                    { digit: "A", bits: "1010", note: "A = 10" },
                    { digit: "F", bits: "1111", note: "F = 15" }
                  ],
                  result: "(9AF)₁₆ = (100110101111)₂",
                  verification: "Check: 9=1001, A=1010, F=1111 -> 100110101111₂ ✓"
                },
                {
                  type: "Model 10B: Hex Containing 0 and Small Digits (Why 2 Must Be 0010)",
                  problem: "Convert (A02)₁₆ to Binary:",
                  note: "Each hex digit MUST expand to exactly 4 bits. Digit 0 becomes '0000' and digit 2 becomes '0010'.",
                  expansions: [
                    { digit: "A", bits: "1010", note: "A = 10" },
                    { digit: "0", bits: "0000", alert: "Must be 0000, not 0!" },
                    { digit: "2", bits: "0010", alert: "Must be 0010, not 10!" }
                  ],
                  result: "(A02)₁₆ = (101000000010)₂",
                  verification: "Check: 10×256 + 2 = 2562₁₀; 2048 + 512 + 2 = 2562₁₀ ✓"
                },
                {
                  type: "Model 10C: Combined Integer + Fraction",
                  problem: "Convert (9AF.2E)₁₆ to Binary:",
                  integerExpansions: [
                    { digit: "9", bits: "1001" },
                    { digit: "A", bits: "1010" },
                    { digit: "F", bits: "1111" }
                  ],
                  fractionExpansions: [
                    { digit: "2", bits: "0010" },
                    { digit: "E", bits: "1110", note: "E = 14" }
                  ],
                  result: "(9AF.2E)₁₆ = (100110101111.0010111)₂",
                  verification: "Check: .2E -> .00101110 = .0010111₂ ✓"
                }
              ]
            }
          ]
        },

        {
          id: "1.3D",
          title: "Sub-Section 1.3D: Octal ↔ Hexadecimal Bridge & Special Exam Models (Conversions 11, 12, 13, 14)",
          methodology: "The Binary Highway Principle: There is no direct mathematical formula relating base 8 to base 16. However, both are exact powers of 2 (8 = 2³, 16 = 2⁴). Therefore, ALWAYS use Binary as the intermediate bridge. Step 1: Expand each digit into binary (3 bits for Octal, 4 bits for Hex). Step 2: Regroup the binary bitstream into groups of the target size (4 bits for Hex, 3 bits for Octal).",
          
          conversions: [
            {
              number: "Conversion 11",
              title: "Octal to Hexadecimal: (N)₈ → (?)₁₆",
              badge: "3-Bit → 4-Bit Bridge",
              bridgeType: "oct_to_hex",
              practiceProblems: practiceSets13D.conv11,
              models: [
                {
                  type: "Model 11A: Pure Integer",
                  problem: "Convert (756)₈ to Hexadecimal:",
                  step1_octal: "(756)₈",
                  step1_expansion: "[111] [101] [110]",
                  step2_regroup: "Pad one leading 0 -> [0001] [1110] [1110]",
                  step3_hex: "[0001] = 1, [1110] = 14 = E, [1110] = 14 = E",
                  result: "(756)₈ = (1EE)₁₆",
                  verification: "Check: 7×64 + 5×8 + 6 = 494₁₀; (1EE)₁₆ = 256 + 14×16 + 14 = 256 + 224 + 14 = 494₁₀ ✓"
                },
                {
                  type: "Model 11B: Combined Integer + Fraction",
                  problem: "Convert (756.603)₈ to Hexadecimal:",
                  step1_expansion: "Integer: [111][101][110] ; Fraction: .[110][000][011]",
                  step2_regroup: "Integer: [0001][1110][1110] ; Fraction: .[1100][0001][1000] (padded trailing 000)",
                  step3_hex: "Integer: 1 E E ; Fraction: . C 1 8",
                  result: "(756.603)₈ = (1EE.C18)₁₆",
                  verification: "Check: [0001][1110][1110].[1100][0001][1000] = (1EE.C18)₁₆ ✓"
                },
                {
                  type: "Model 11C: 4-Digit Octal Exam Problem",
                  problem: "Convert (2645.34)₈ to Hexadecimal:",
                  step1_expansion: "Integer: [010][110][100][101] ; Fraction: .[011][100]",
                  step2_regroup: "Integer: [0101][1010][0101] ; Fraction: .[0111][0000]",
                  step3_hex: "Integer: 5 A 5 ; Fraction: . 7 0 = .7",
                  result: "(2645.34)₈ = (5A5.7)₁₆",
                  verification: "Check: [0101][1010][0101].[0111] = (5A5.7)₁₆ ✓"
                }
              ]
            },
            {
              number: "Conversion 12",
              title: "Hexadecimal to Octal: (N)₁₆ → (?)₈",
              badge: "4-Bit → 3-Bit Bridge",
              bridgeType: "hex_to_oct",
              practiceProblems: practiceSets13D.conv12,
              models: [
                {
                  type: "Model 12A: Pure Integer",
                  problem: "Convert (3FD)₁₆ to Octal:",
                  step1_expansion: "[0011] [1111] [1101]",
                  step2_regroup: "Bitstream: 001111111101 -> Group into 3s: [001] [111] [111] [101]",
                  step3_octal: "[001] = 1, [111] = 7, [111] = 7, [101] = 5",
                  result: "(3FD)₁₆ = (1775)₈",
                  verification: "Check: (3FD)₁₆ = 3×256 + 15×16 + 13 = 1021₁₀; 1×512 + 7×64 + 7×8 + 5 = 512 + 448 + 56 + 5 = 1021₁₀ ✓"
                },
                {
                  type: "Model 12B: Combined Integer + Fraction",
                  problem: "Convert (3FD.A4)₁₆ to Octal:",
                  step1_expansion: "Integer: [0011][1111][1101] ; Fraction: .[1010][0100]",
                  step2_regroup: "Integer: [001][111][111][101] ; Fraction: .[101][001][000] (padded one 0)",
                  step3_octal: "Integer: 1 7 7 5 ; Fraction: . 5 1 0 = .51",
                  result: "(3FD.A4)₁₆ = (1775.51)₈",
                  verification: "Check: 3FD -> 1775; .A4 = 10100100₂ -> [101][001] = .51₈ ✓"
                },
                {
                  type: "Model 12C: Hex with Zeros & Fractions",
                  problem: "Convert (B2F.C)₁₆ to Octal:",
                  step1_expansion: "Integer: [1011][0010][1111] ; Fraction: .[1100]",
                  step2_regroup: "Integer: [101][100][101][111] ; Fraction: .[110][000]",
                  step3_octal: "Integer: 5 4 5 7 ; Fraction: . 6 0 = .6",
                  result: "(B2F.C)₁₆ = (5457.6)₈",
                  verification: "Check: [101][100][101][111].[110] = (5457.6)₈ ✓"
                }
              ]
            },
            {
              number: "Model 13",
              title: "Arbitrary Base Conversion: (N)r₁ → (?)r₂",
              badge: "Via Decimal Bridge",
              practiceProblems: practiceSets13D.model13,
              models: [
                {
                  type: "Model 13A: Base-4 to Base-7",
                  problem: "Convert (231)₄ to Base-7 (?)₇:",
                  stages: [
                    { phase: "Stage 1: Base-4 to Decimal", steps: ["2×4² + 3×4¹ + 1×4⁰ = 2×16 + 3×4 + 1×1", "= 32 + 12 + 1 = 45₁₀"], result: "(45)₁₀" },
                    { phase: "Stage 2: Decimal (45)₁₀ to Base-7", steps: ["45 ÷ 7 = 6 Remainder 3 (LSD)", "6 ÷ 7 = 0 Remainder 6 (MSD)", "Read upward: 6 3"], result: "(63)₇" }
                  ],
                  result: "(231)₄ = (63)₇",
                  verification: "Check: (63)₇ = 6×7 + 3 = 45₁₀; (231)₄ = 2×16 + 3×4 + 1 = 45₁₀ ✓"
                },
                {
                  type: "Model 13B: Combined Base-4 with Fraction to Base-5",
                  problem: "Convert (123.2)₄ to Base-5 (?)₅:",
                  stages: [
                    { phase: "Stage 1: Base-4 to Decimal", steps: ["Integer: 1×4² + 2×4¹ + 3×4⁰ = 16 + 8 + 3 = 27", "Fraction: 2×4⁻¹ = 2/4 = 0.5", "Decimal = (27.5)₁₀"], result: "(27.5)₁₀" },
                    { phase: "Stage 2: Decimal (27.5)₁₀ to Base-5", steps: ["Integer 27: 27 ÷ 5 = 5 R 2; 5 ÷ 5 = 1 R 0; 1 ÷ 5 = 0 R 1 -> (102)₅", "Fraction 0.5: 0.5 × 5 = 2.5 (carry 2, frac 0.5 repeats) -> .222...₅"], result: "(102.222...)₅" }
                  ],
                  result: "(123.2)₄ = (102.22...)₅",
                  verification: "Check: (102)₅ = 25 + 2 = 27₁₀; .222...₅ = 2/5 + 2/25 + ... = 2/(5-1) = 2/4 = 0.5₁₀ ✓"
                },
                {
                  type: "Model 13C: Base-5 to Base-3",
                  problem: "Convert (432)₅ to Base-3 (?)₃:",
                  stages: [
                    { phase: "Stage 1: Base-5 to Decimal", steps: ["4×5² + 3×5¹ + 2×5⁰ = 4×25 + 3×5 + 2 = 100 + 15 + 2 = 117₁₀"], result: "(117)₁₀" },
                    { phase: "Stage 2: Decimal (117)₁₀ to Base-3", steps: ["117 ÷ 3 = 39 R 0", "39 ÷ 3 = 13 R 0", "13 ÷ 3 = 4 R 1", "4 ÷ 3 = 1 R 1", "1 ÷ 3 = 0 R 1", "Read upward: 1 1 1 0 0"], result: "(11100)₃" }
                  ],
                  result: "(432)₅ = (11100)₃",
                  verification: "Check: (11100)₃ = 81 + 27 + 9 = 117₁₀; 4×25 + 3×5 + 2 = 117₁₀ ✓"
                }
              ]
            },
            {
              number: "Model 14",
              title: "Finding Unknown Radix (r) Equations",
              badge: "Algebraic Exam Model",
              practiceProblems: practiceSets13D.model14,
              models: [
                {
                  type: "Model 14A: Linear Radix Equation",
                  problem: "Find base r such that: (34)_r + (24)_r = (61)_r",
                  constraint: "Condition: r > max digit (6), so r ≥ 7.",
                  algebraicSteps: [
                    "Step 1: Check Minimum Base Constraint: Digits used are 1, 2, 3, 4, 6. Therefore r > 6 (i.e., r ≥ 7).",
                    "Step 2: Expand all numbers into decimal polynomials:",
                    "(34)_r = 3r + 4",
                    "(24)_r = 2r + 4",
                    "(61)_r = 6r + 1",
                    "Step 3: Form the algebraic equation:",
                    "(3r + 4) + (2r + 4) = 6r + 1",
                    "5r + 8 = 6r + 1",
                    "Step 4: Solve for r:",
                    "6r - 5r = 8 - 1  ==>  r = 7"
                  ],
                  result: "Unknown Base r = 7",
                  verification: "Check: (34)₇ + (24)₇ = (25)₁₀ + (18)₁₀ = (43)₁₀; (61)₇ = 6×7 + 1 = 43₁₀ ✓"
                },
                {
                  type: "Model 14B: Quadratic Radix Equation",
                  problem: "Determine the radix r if: (211)_r = (152)₈",
                  constraint: "Condition: r > max digit in (211), so r ≥ 3.",
                  algebraicSteps: [
                    "Step 1: Convert known right side (152)₈ to Decimal:",
                    "(152)₈ = 1×8² + 5×8¹ + 2×8⁰ = 64 + 40 + 2 = 106₁₀",
                    "Step 2: Expand unknown left side (211)_r to Decimal:",
                    "(211)_r = 2r² + 1r + 1",
                    "Step 3: Set up quadratic equation:",
                    "2r² + r + 1 = 106",
                    "2r² + r - 105 = 0",
                    "Step 4: Factor the quadratic equation:",
                    "2r² + 15r - 14r - 105 = 0",
                    "r(2r + 15) - 7(2r + 15) = 0",
                    "(2r + 15)(r - 7) = 0",
                    "Roots: r = 7 or r = -15/2",
                    "Step 5: Apply physical constraints:",
                    "A radix MUST be a positive integer greater than its largest digit (2).",
                    "Reject negative fractional root r = -7.5. Therefore r = 7."
                  ],
                  result: "Unknown Base r = 7",
                  verification: "Check: 2×(7)² + 7 + 1 = 2×49 + 8 = 98 + 8 = 106₁₀; (152)₈ = 106₁₀ ✓"
                },
                {
                  type: "Model 14C: Square Root / Pure Square Radix Problem",
                  problem: "Find radix r if: √(41)_r = (5)₁₀ and if (302)_r = (77)₁₀",
                  constraint: "Condition: r > 4 for first problem; r > 3 for second problem.",
                  algebraicSteps: [
                    "Problem 1: √(41)_r = 5₁₀",
                    "Square both sides: (41)_r = 5² = 25₁₀",
                    "Expand (41)_r: 4r + 1 = 25",
                    "4r = 24  ==>  r = 6 (Valid since r > 4)",
                    "----------------------------------------",
                    "Problem 2: (302)_r = 77₁₀",
                    "Expand (302)_r: 3r² + 0r + 2 = 77",
                    "3r² = 75  ==>  r² = 25  ==>  r = ±5",
                    "Since r > 0, r = 5 (Valid since r > 3)"
                  ],
                  result: "Problem 1: r = 6 ; Problem 2: r = 5",
                  verification: "Check: (41)₆ = 4×6 + 1 = 25; √25 = 5 ✓. (302)₅ = 3×25 + 2 = 77 ✓"
                }
              ]
            }
          ]
        }
      ],

      cheatSheet: cheatSheetData13,
      mixedPracticeArena: mixedExamPractice20,

      practiceQuestions: [
        {
          q: "Convert (125)₁₀ to Binary.",
          a: "125 ÷ 2: 125/2=62 R1, 62/2=31 R0, 31/2=15 R1, 15/2=7 R1, 7/2=3 R1, 3/2=1 R1, 1/2=0 R1. Reading bottom-to-top gives (1111101)₂."
        },
        {
          q: "Convert (0.4375)₁₀ to Binary.",
          a: "0.4375 × 2 = 0.875 (0); 0.875 × 2 = 1.75 (1); 0.75 × 2 = 1.5 (1); 0.5 × 2 = 1.0 (1). Reading top-to-bottom gives (0.0111)₂."
        },
        {
          q: "Convert (11010110.11)₂ to Octal.",
          a: "Integer: [011] [010] [110] → 326₈. Fraction: [110] → 6₈. Result: (326.6)₈."
        },
        {
          q: "Convert (11010110.11)₂ to Hexadecimal.",
          a: "Integer: [1101] [0110] → D6₁₆. Fraction: [1100] → C₁₆. Result: (D6.C)₁₆."
        },
        {
          q: "Convert (572)₈ to Hexadecimal.",
          a: "Octal to Binary: 5=101, 7=111, 2=010 → 101111010₂. Regroup into 4s: [0001] [0111] [1010] → (17A)₁₆."
        },
        {
          q: "Convert (2C4)₁₆ to Octal.",
          a: "Hex to Binary: 2=0010, C=1100, 4=0100 → 001011000100₂. Regroup into 3s: [001] [011] [000] [100] → (1304)₈."
        },
        {
          q: "Convert (345)₈ to Decimal.",
          a: "3×8² + 4×8¹ + 5×8⁰ = 3×64 + 4×8 + 5×1 = 192 + 32 + 5 = (229)₁₀."
        },
        {
          q: "Convert (4B2)₁₆ to Decimal.",
          a: "4×16² + 11×16¹ + 2×16⁰ = 4×256 + 11×16 + 2×1 = 1024 + 176 + 2 = (1202)₁₀."
        },
        {
          q: "Convert (592)₁₀ to Octal.",
          a: "592 ÷ 8: 592/8=74 R0; 74/8=9 R2; 9/8=1 R1; 1/8=0 R1. Reading bottom-to-top gives (1120)₈."
        },
        {
          q: "Convert (428)₁₀ to Hexadecimal.",
          a: "428 ÷ 16: 428/16 = 26 R 12 (C); 26/16 = 1 R 10 (A); 1/16 = 0 R 1. Reading bottom-to-top gives (1AC)₁₆."
        },
        {
          q: "Determine the radix r if (34)_r + (24)_r = (61)_r.",
          a: "Expand in base r: (3r + 4) + (2r + 4) = (6r + 1) → 5r + 8 = 6r + 1 → r = 7. Verify: In base 7, (34)₇ = 25₁₀, (24)₇ = 18₁₀, sum = 43₁₀; (61)₇ = 6×7 + 1 = 43₁₀. Correct!"
        },
        {
          q: "Convert (312)₄ to Base-5 (?)₅ via Decimal bridge.",
          a: "Base-4 to Decimal: 3×16 + 1×4 + 2×1 = 48 + 4 + 2 = (54)₁₀. Decimal to Base-5: 54/5 = 10 R4; 10/5 = 2 R0; 2/5 = 0 R2. Result: (204)₅."
        }
      ],

      youtubeResource: {
        title: "How To Convert Decimal to Binary & Number System Conversions",
        channel: "The Organic Chemistry Tutor",
        duration: "24:18",
        url: "https://www.youtube.com/watch?v=rsxT4FfRBaM",
        topicsCovered: "Step-by-step 12 conversions, integer and fraction division/multiplication, and 3-bit / 4-bit grouping shortcuts."
      }
    },

    // =========================================================================
    // SECTION 1.4: BINARY ARITHMETIC (ADDITION, SUBTRACTION, MUL & DIV)
    // =========================================================================
    section14Data,

    // =========================================================================
    // SECTION 1.5: COMPLEMENTS (1's, 2's, 9's & 10's COMPLEMENTS)
    // =========================================================================
    section15Data,

    section16Data,


    // =========================================================================
    // SECTION 1.7: LOGIC GATES
    // =========================================================================
    section17Data
  ]
};
