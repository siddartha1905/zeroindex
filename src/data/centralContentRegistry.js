/**
 * Central Content Registry for ZeroIndex
 * 
 * Defines the complete hierarchical inventory of content across all five pillars:
 * 1. The Workbench (Subjects, Units, Sections, Topics, Solvers, Arena)
 * 2. The Atlas (Divisions, Roadmaps, Stages)
 * 3. The Bridge (Placement Domains, Competencies, Resources)
 * 4. The Readout (Monographs, Articles, Dispatches)
 * 5. The Folio (Essays, Pedagogical Reflections, Notes)
 * 
 * Publication Rules:
 * - Default rule: anything Planned, Draft, or In Review is strictly HIDDEN from the public.
 * - Only explicitly approved and published content may become publicly visible.
 * - Hiding a parent (e.g., pillar or unit) automatically makes all descendants unavailable.
 * 
 * Zero-Dash Standard: Zero em-dashes and zero en-dashes across all entries.
 */

/**
 * @typedef {'workbench' | 'atlas' | 'bridge' | 'readout' | 'folio'} PillarId
 * @typedef {'pillar' | 'subject' | 'unit' | 'section' | 'tool' | 'division' | 'roadmap' | 'domain' | 'article' | 'essay'} ContentType
 * @typedef {'published' | 'in_review' | 'draft' | 'planned'} EditorialStatus
 * 
 * @typedef {Object} ContentRegistryItem
 * @property {string} id - Stable unique identifier
 * @property {string | null} parentId - Parent item identifier or null for root pillars
 * @property {PillarId} pillar - Top-level ZeroIndex pillar
 * @property {ContentType} contentType - Hierarchical node type
 * @property {string} title - Human-readable title
 * @property {string} route - Navigation route string
 * @property {EditorialStatus} editorialStatus - Editorial lifecycle status
 * @property {boolean} isPublic - Public visibility flag (editable by admin if published)
 * @property {string} [description] - Editorial description or abstract
 * @property {Record<string, any>} [metadata] - Extra metadata (author, readTime, tags)
 */

export const centralContentRegistry = [
  // =========================================================================
  // PILLAR 01: THE WORKBENCH
  // =========================================================================
  {
    id: 'pillar-workbench',
    parentId: null,
    pillar: 'workbench',
    contentType: 'pillar',
    title: 'The Workbench',
    route: 'workbench',
    editorialStatus: 'published',
    isPublic: true,
    description: 'Interactive classroom workspace, visual computing solvers, and practice arenas.'
  },
  {
    id: 'workbench-subject-dld',
    parentId: 'pillar-workbench',
    pillar: 'workbench',
    contentType: 'subject',
    title: 'Digital Logic Design',
    route: 'dld',
    editorialStatus: 'published',
    isPublic: true,
    description: 'Course 1005261102: Binary arithmetic, Boolean algebra, minimization, and circuits.'
  },
  // Unit I
  {
    id: 'dld-unit-1',
    parentId: 'workbench-subject-dld',
    pillar: 'workbench',
    contentType: 'unit',
    title: 'Unit I: Number Systems and Boolean Logic',
    route: 'workspace/units/1.1',
    editorialStatus: 'published',
    isPublic: true,
    description: 'Positional number bases, radix conversion, arithmetic, and logic gate primitives.'
  },
  {
    id: 'dld-sec-1.1',
    parentId: 'dld-unit-1',
    pillar: 'workbench',
    contentType: 'section',
    title: 'Section 1.1: Introduction to Digital Systems',
    route: 'workspace/units/1.1',
    editorialStatus: 'published',
    isPublic: true,
    description: 'Analog versus digital signals, discrete levels, and abstraction layers.'
  },
  {
    id: 'dld-sec-1.2',
    parentId: 'dld-unit-1',
    pillar: 'workbench',
    contentType: 'section',
    title: 'Section 1.2: Positional Number Systems',
    route: 'workspace/units/1.2',
    editorialStatus: 'published',
    isPublic: true,
    description: 'Binary, octal, decimal, and hexadecimal representations and digit weights.'
  },
  {
    id: 'dld-sec-1.3',
    parentId: 'dld-unit-1',
    pillar: 'workbench',
    contentType: 'section',
    title: 'Section 1.3: Radix Base Conversion Algorithms',
    route: 'workspace/units/1.3',
    editorialStatus: 'published',
    isPublic: true,
    description: 'Division-multiplication method, power-of-two groupings, and fractional conversion.'
  },
  {
    id: 'dld-sec-1.4',
    parentId: 'dld-unit-1',
    pillar: 'workbench',
    contentType: 'section',
    title: 'Section 1.4: Binary Arithmetic and Diminished Complements',
    route: 'workspace/units/1.4',
    editorialStatus: 'published',
    isPublic: true,
    description: 'Binary addition, subtraction, r complement and (r-1) complement mechanics.'
  },
  {
    id: 'dld-sec-1.5',
    parentId: 'dld-unit-1',
    pillar: 'workbench',
    contentType: 'section',
    title: 'Section 1.5: Signed Number Representations',
    route: 'workspace/units/1.5',
    editorialStatus: 'published',
    isPublic: true,
    description: 'Signed magnitude, 1s complement, 2s complement, and arithmetic overflow rules.'
  },
  {
    id: 'dld-sec-1.6',
    parentId: 'dld-unit-1',
    pillar: 'workbench',
    contentType: 'section',
    title: 'Section 1.6: Binary Codes: BCD, Excess-3, Gray and ASCII',
    route: 'workspace/units/1.6',
    editorialStatus: 'published',
    isPublic: true,
    description: 'Weighted BCD, self-complementing Excess-3, unit-distance Gray, and character ASCII.'
  },
  {
    id: 'dld-sec-1.7',
    parentId: 'dld-unit-1',
    pillar: 'workbench',
    contentType: 'section',
    title: 'Section 1.7: Boolean Logic and Universal Gate Primitives',
    route: 'workspace/units/1.7',
    editorialStatus: 'published',
    isPublic: true,
    description: 'AND, OR, NOT, NAND, NOR, XOR, XNOR truth tables and universality proofs.'
  },
  // Unit II
  {
    id: 'dld-unit-2',
    parentId: 'workbench-subject-dld',
    pillar: 'workbench',
    contentType: 'unit',
    title: 'Unit II: Gate-Level Minimization and Combinational Logic',
    route: 'workspace/units/2.1',
    editorialStatus: 'published',
    isPublic: true,
    description: 'Boolean axioms, algebraic laws, canonical expansions, and K-Map minimization.'
  },
  {
    id: 'dld-sec-2.1',
    parentId: 'dld-unit-2',
    pillar: 'workbench',
    contentType: 'section',
    title: 'Section 2.1: Boolean Axioms, Duals and Algebraic Laws',
    route: 'workspace/units/2.1',
    editorialStatus: 'published',
    isPublic: true,
    description: 'Huntington postulates, duality principle, De Morgan laws, and consensus theorem.'
  },
  {
    id: 'dld-sec-2.2',
    parentId: 'dld-unit-2',
    pillar: 'workbench',
    contentType: 'section',
    title: 'Section 2.2: Algebraic Simplification Mechanics',
    route: 'workspace/units/2.2',
    editorialStatus: 'published',
    isPublic: true,
    description: 'Step-by-step symbolic derivation, literal minimization, and verified proofs.'
  },
  {
    id: 'dld-sec-2.3',
    parentId: 'dld-unit-2',
    pillar: 'workbench',
    contentType: 'section',
    title: 'Section 2.3: Minterms, Maxterms and Canonical Expansions',
    route: 'workspace/units/2.3',
    editorialStatus: 'published',
    isPublic: true,
    description: 'Index notation, sum of minterms, product of maxterms, and complement duals.'
  },
  {
    id: 'dld-sec-2.4',
    parentId: 'dld-unit-2',
    pillar: 'workbench',
    contentType: 'section',
    title: 'Section 2.4: SOP and POS Standard Implementations',
    route: 'workspace/units/2.4',
    editorialStatus: 'published',
    isPublic: true,
    description: 'Two-level AND-OR and OR-AND networks, propagation delays, and synthesis.'
  },
  {
    id: 'dld-sec-2.5',
    parentId: 'dld-unit-2',
    pillar: 'workbench',
    contentType: 'section',
    title: 'Section 2.5: Karnaugh Map Minimization (2 to 4 Variables)',
    route: 'workspace/units/2.5',
    editorialStatus: 'published',
    isPublic: true,
    description: 'Gray-coded adjacency, rectangular power-of-two groupings, and essential prime implicants.'
  },
  {
    id: 'dld-sec-2.6',
    parentId: 'dld-unit-2',
    pillar: 'workbench',
    contentType: 'section',
    title: 'Section 2.6: Don\'t-Care Conditions and 5-Variable K-Maps',
    route: 'workspace/units/2.6',
    editorialStatus: 'planned',
    isPublic: false,
    description: 'Incompletely specified functions and multi-plane 5-variable reflection maps.'
  },
  {
    id: 'dld-sec-2.7',
    parentId: 'dld-unit-2',
    pillar: 'workbench',
    contentType: 'section',
    title: 'Section 2.7: NAND and NOR Multi-Level Synthesis',
    route: 'workspace/units/2.7',
    editorialStatus: 'planned',
    isPublic: false,
    description: 'Universal gate conversions, bubbled gate notations, and graphic transformations.'
  },
  // Future Units
  {
    id: 'dld-unit-3',
    parentId: 'workbench-subject-dld',
    pillar: 'workbench',
    contentType: 'unit',
    title: 'Unit III: Combinational Logic Design and Standard MSI Functions',
    route: 'workspace/units/3.1',
    editorialStatus: 'planned',
    isPublic: false,
    description: 'Adders, subtractors, decoders, encoders, and multiplexers.'
  },
  {
    id: 'dld-unit-4',
    parentId: 'workbench-subject-dld',
    pillar: 'workbench',
    contentType: 'unit',
    title: 'Unit IV: Synchronous Sequential Logic and State Machines',
    route: 'workspace/units/4.1',
    editorialStatus: 'planned',
    isPublic: false,
    description: 'Latches, flip-flops, state tables, state diagrams, and Mealy/Moore machines.'
  },
  {
    id: 'dld-unit-5',
    parentId: 'workbench-subject-dld',
    pillar: 'workbench',
    contentType: 'unit',
    title: 'Unit V: Registers, Counters and Memory Systems',
    route: 'workspace/units/5.1',
    editorialStatus: 'planned',
    isPublic: false,
    description: 'Shift registers, ripple/synchronous counters, ROM, and programmable logic.'
  },
  // Workbench Interactive Tools
  {
    id: 'workbench-tools-group',
    parentId: 'workbench-subject-dld',
    pillar: 'workbench',
    contentType: 'tool',
    title: 'Interactive Solvers and Academic Practice',
    route: 'workspace/solvers',
    editorialStatus: 'published',
    isPublic: true,
    description: 'Visual computation suite and academic problem bank.'
  },
  {
    id: 'workbench-tool-solvers',
    parentId: 'workbench-tools-group',
    pillar: 'workbench',
    contentType: 'tool',
    title: 'Visual Solvers Suite (10 Solvers)',
    route: 'workspace/solvers',
    editorialStatus: 'published',
    isPublic: true,
    description: 'Interactive radix converters, binary arithmetic, complement step solvers, and K-Maps.'
  },
  {
    id: 'workbench-tool-practice',
    parentId: 'workbench-tools-group',
    pillar: 'workbench',
    contentType: 'tool',
    title: 'Practice Arena (250 Questions)',
    route: 'workspace/practice',
    editorialStatus: 'published',
    isPublic: true,
    description: 'Self-assessment quiz arena with instantaneous step-by-step solution derivation.'
  },
  {
    id: 'workbench-tool-resources',
    parentId: 'workbench-tools-group',
    pillar: 'workbench',
    contentType: 'tool',
    title: 'Subject Resources and Textbooks',
    route: 'workspace/syllabus',
    editorialStatus: 'published',
    isPublic: true,
    description: 'Verified academic textbook call numbers, revision sheets, and video references.'
  },

  // =========================================================================
  // PILLAR 02: THE ATLAS
  // =========================================================================
  {
    id: 'pillar-atlas',
    parentId: null,
    pillar: 'atlas',
    contentType: 'pillar',
    title: 'The Atlas',
    route: 'atlas',
    editorialStatus: 'published',
    isPublic: true,
    description: 'Structured engineering pathways, skill development, and career roadmaps.'
  },
  // Division 1: Universal Foundations
  {
    id: 'atlas-div-foundations',
    parentId: 'pillar-atlas',
    pillar: 'atlas',
    contentType: 'division',
    title: 'Division 1: Universal Foundations',
    route: 'atlas',
    editorialStatus: 'published',
    isPublic: true,
    description: 'Foundational programming, mathematical reasoning, communication, and aptitude.'
  },
  {
    id: 'atlas-programming-foundations',
    parentId: 'atlas-div-foundations',
    pillar: 'atlas',
    contentType: 'roadmap',
    title: 'Core Computer Science and Programming Foundations',
    route: 'atlas/programming-foundations',
    editorialStatus: 'planned',
    isPublic: false,
    description: 'From mental execution models to systems awareness and algorithmic intuition.'
  },
  {
    id: 'atlas-english-communication',
    parentId: 'atlas-div-foundations',
    pillar: 'atlas',
    contentType: 'roadmap',
    title: 'English Communication',
    route: 'atlas/english-communication',
    editorialStatus: 'published',
    isPublic: true,
    description: 'Practical communication skills for everyday situations.'
  },
  {
    id: 'atlas-soft-skills',
    parentId: 'atlas-div-foundations',
    pillar: 'atlas',
    contentType: 'roadmap',
    title: 'Professional Soft Skills and Team Dynamics',
    route: 'atlas/soft-skills',
    editorialStatus: 'planned',
    isPublic: false,
    description: 'Constructive teamwork, conflict resolution, technical presentations, and workplace etiquette.'
  },
  {
    id: 'atlas-quantitative-aptitude',
    parentId: 'atlas-div-foundations',
    pillar: 'atlas',
    contentType: 'roadmap',
    title: 'Quantitative Aptitude for Engineers',
    route: 'atlas/quantitative-aptitude',
    editorialStatus: 'planned',
    isPublic: false,
    description: 'Speed arithmetic, commercial mathematics, combinatorics, and geometry fundamentals.'
  },
  {
    id: 'atlas-logical-reasoning',
    parentId: 'atlas-div-foundations',
    pillar: 'atlas',
    contentType: 'roadmap',
    title: 'Logical Reasoning and Analytical Thinking',
    route: 'atlas/logical-reasoning',
    editorialStatus: 'planned',
    isPublic: false,
    description: 'Deductive logic, syllogisms, blood relations, sequence analysis, and critical thinking.'
  },
  {
    id: 'atlas-verbal-ability',
    parentId: 'atlas-div-foundations',
    pillar: 'atlas',
    contentType: 'roadmap',
    title: 'Verbal Ability and Reading Comprehension',
    route: 'atlas/verbal-ability',
    editorialStatus: 'planned',
    isPublic: false,
    description: 'Sentence correction, vocabulary in context, reading comprehension, and error spotting.'
  },
  {
    id: 'atlas-c-programming',
    parentId: 'atlas-div-foundations',
    pillar: 'atlas',
    contentType: 'roadmap',
    title: 'C Programming and Low-Level Memory',
    route: 'atlas/c-programming',
    editorialStatus: 'planned',
    isPublic: false,
    description: 'Pointers, stack frames, heap allocation, bitwise operations, and memory hygiene.'
  },
  {
    id: 'atlas-python-programming',
    parentId: 'atlas-div-foundations',
    pillar: 'atlas',
    contentType: 'roadmap',
    title: 'Python Programming for Engineering and Data',
    route: 'atlas/python-programming',
    editorialStatus: 'planned',
    isPublic: false,
    description: 'Idiomatic syntax, data structures, generators, OOP, and scientific Python ecosystem.'
  },
  {
    id: 'atlas-entry-it-foundations',
    parentId: 'atlas-div-foundations',
    pillar: 'atlas',
    contentType: 'roadmap',
    title: 'IT Services and Entry-Level Competencies',
    route: 'atlas/entry-it-foundations',
    editorialStatus: 'planned',
    isPublic: false,
    description: 'Foundational IT services skills, database queries, web basics, and campus assessments.'
  },
  // Division 2: Electrical & Embedded
  {
    id: 'atlas-div-hardware',
    parentId: 'pillar-atlas',
    pillar: 'atlas',
    contentType: 'division',
    title: 'Division 2: Electrical, Electronics and Embedded Systems',
    route: 'atlas',
    editorialStatus: 'published',
    isPublic: true,
    description: 'Silicon physics, digital logic, microcontrollers, FPGA, VLSI, and communication systems.'
  },
  {
    id: 'atlas-systems-architecture',
    parentId: 'atlas-div-hardware',
    pillar: 'atlas',
    contentType: 'roadmap',
    title: 'Computer Systems and Architecture Pathway',
    route: 'atlas/systems-architecture',
    editorialStatus: 'planned',
    isPublic: false,
    description: 'From silicon gates and instruction set architectures to virtual memory and kernels.'
  },
  {
    id: 'atlas-embedded-systems',
    parentId: 'atlas-div-hardware',
    pillar: 'atlas',
    contentType: 'roadmap',
    title: 'Embedded Systems and Firmware Engineering',
    route: 'atlas/embedded-systems',
    editorialStatus: 'planned',
    isPublic: false,
    description: 'ARM Cortex, bare-metal C, RTOS scheduling, peripheral buses, and IoT interfaces.'
  },
  {
    id: 'atlas-vlsi-rtl-design',
    parentId: 'atlas-div-hardware',
    pillar: 'atlas',
    contentType: 'roadmap',
    title: 'VLSI Digital Design and RTL Synthesis',
    route: 'atlas/vlsi-rtl-design',
    editorialStatus: 'planned',
    isPublic: false,
    description: 'Verilog, SystemVerilog, RTL design rules, timing closure, and synthesis.'
  },
  {
    id: 'atlas-vlsi-verification',
    parentId: 'atlas-div-hardware',
    pillar: 'atlas',
    contentType: 'roadmap',
    title: 'VLSI Verification and UVM Frameworks',
    route: 'atlas/vlsi-verification',
    editorialStatus: 'planned',
    isPublic: false,
    description: 'Constrained random verification, functional coverage, assertions, and UVM methodology.'
  },
  {
    id: 'atlas-vlsi-physical-design',
    parentId: 'atlas-div-hardware',
    pillar: 'atlas',
    contentType: 'roadmap',
    title: 'VLSI Physical Design and Signoff',
    route: 'atlas/vlsi-physical-design',
    editorialStatus: 'planned',
    isPublic: false,
    description: 'Floorplanning, placement, clock tree synthesis, routing, and DRC/LVS signoff.'
  },
  {
    id: 'atlas-analog-ic-design',
    parentId: 'atlas-div-hardware',
    pillar: 'atlas',
    contentType: 'roadmap',
    title: 'Analog and Mixed-Signal IC Design',
    route: 'atlas/analog-ic-design',
    editorialStatus: 'planned',
    isPublic: false,
    description: 'MOSFET physics, single-stage amplifiers, current mirrors, op-amps, and SPICE.'
  },
  {
    id: 'atlas-fpga-design',
    parentId: 'atlas-div-hardware',
    pillar: 'atlas',
    contentType: 'roadmap',
    title: 'FPGA Architecture and Hardware Acceleration',
    route: 'atlas/fpga-design',
    editorialStatus: 'planned',
    isPublic: false,
    description: 'Xilinx/Intel FPGA architecture, DSP slices, high-speed transceivers, and HLS.'
  },
  {
    id: 'atlas-pcb-hardware-design',
    parentId: 'atlas-div-hardware',
    pillar: 'atlas',
    contentType: 'roadmap',
    title: 'PCB and High-Speed Hardware Design',
    route: 'atlas/pcb-hardware-design',
    editorialStatus: 'planned',
    isPublic: false,
    description: 'Schematic capture, PCB stackup, impedance matching, signal integrity, and EMI/EMC.'
  },
  {
    id: 'atlas-rf-communication-systems',
    parentId: 'atlas-div-hardware',
    pillar: 'atlas',
    contentType: 'roadmap',
    title: 'RF and Wireless Communication Engineering',
    route: 'atlas/rf-communication-systems',
    editorialStatus: 'planned',
    isPublic: false,
    description: 'Electromagnetic waves, transmission lines, Smith charts, modulation, and SDR.'
  },
  // Division 3: Computing Systems & Software
  {
    id: 'atlas-div-software',
    parentId: 'pillar-atlas',
    pillar: 'atlas',
    contentType: 'division',
    title: 'Division 3: Computing Systems and Software Engineering',
    route: 'atlas',
    editorialStatus: 'published',
    isPublic: true,
    description: 'Data science, machine learning, distributed backend systems, cloud, and cybersecurity.'
  },
  {
    id: 'atlas-data-science',
    parentId: 'atlas-div-software',
    pillar: 'atlas',
    contentType: 'roadmap',
    title: 'Data Science and Machine Learning Foundations',
    route: 'atlas/data-science',
    editorialStatus: 'planned',
    isPublic: false,
    description: 'Matrix decompositions, gradient calculus, statistical learning, and neural representations.'
  },
  {
    id: 'atlas-backend-development',
    parentId: 'atlas-div-software',
    pillar: 'atlas',
    contentType: 'roadmap',
    title: 'Backend Systems and Distributed Platforms',
    route: 'atlas/backend-development',
    editorialStatus: 'planned',
    isPublic: false,
    description: 'HTTP protocols, relational databases, caching, message queues, and microservices.'
  },
  {
    id: 'atlas-fullstack-development',
    parentId: 'atlas-div-software',
    pillar: 'atlas',
    contentType: 'roadmap',
    title: 'Modern Full-Stack Web Architecture',
    route: 'atlas/fullstack-development',
    editorialStatus: 'planned',
    isPublic: false,
    description: 'Component architecture, responsive state, REST/GraphQL APIs, and server rendering.'
  },
  {
    id: 'atlas-machine-learning-engineering',
    parentId: 'atlas-div-software',
    pillar: 'atlas',
    contentType: 'roadmap',
    title: 'Production Machine Learning Engineering (MLOps)',
    route: 'atlas/machine-learning-engineering',
    editorialStatus: 'planned',
    isPublic: false,
    description: 'Feature pipelines, model training at scale, inference latency, and model monitoring.'
  },
  {
    id: 'atlas-data-engineering',
    parentId: 'atlas-div-software',
    pillar: 'atlas',
    contentType: 'roadmap',
    title: 'Data Engineering and Big Data Infrastructure',
    route: 'atlas/data-engineering',
    editorialStatus: 'planned',
    isPublic: false,
    description: 'Data warehousing, ETL pipelines, distributed processing (Spark), and stream processing.'
  },
  {
    id: 'atlas-cloud-devops',
    parentId: 'atlas-div-software',
    pillar: 'atlas',
    contentType: 'roadmap',
    title: 'Cloud Infrastructure and DevOps Automation',
    route: 'atlas/cloud-devops',
    editorialStatus: 'planned',
    isPublic: false,
    description: 'Linux systems, Docker containers, Kubernetes orchestration, CI/CD, and Terraform.'
  },
  {
    id: 'atlas-cybersecurity-engineering',
    parentId: 'atlas-div-software',
    pillar: 'atlas',
    contentType: 'roadmap',
    title: 'Cybersecurity and Systems Defense',
    route: 'atlas/cybersecurity-engineering',
    editorialStatus: 'planned',
    isPublic: false,
    description: 'Network security, cryptography, application vulnerability assessment, and threat modeling.'
  },

  // =========================================================================
  // PILLAR 03: THE BRIDGE
  // =========================================================================
  {
    id: 'pillar-bridge',
    parentId: null,
    pillar: 'bridge',
    contentType: 'pillar',
    title: 'The Bridge',
    route: 'bridge',
    editorialStatus: 'published',
    isPublic: true,
    description: 'Campus placement preparation guide and structured career readiness tracks.'
  },
  {
    id: 'bridge-domain-quant',
    parentId: 'pillar-bridge',
    pillar: 'bridge',
    contentType: 'domain',
    title: 'Quantitative Aptitude and Numerical Reasoning',
    route: 'bridge',
    editorialStatus: 'published',
    isPublic: true,
    description: 'Speed mathematics, commercial arithmetic, time-work, permutations, and probability.'
  },
  {
    id: 'bridge-domain-logical',
    parentId: 'pillar-bridge',
    pillar: 'bridge',
    contentType: 'domain',
    title: 'Logical Reasoning and Analytical Ability',
    route: 'bridge',
    editorialStatus: 'published',
    isPublic: true,
    description: 'Deductive reasoning, arrangements, coding-decoding, syllogisms, and puzzle solving.'
  },
  {
    id: 'bridge-domain-verbal',
    parentId: 'pillar-bridge',
    pillar: 'bridge',
    contentType: 'domain',
    title: 'Verbal Ability and Reading Comprehension',
    route: 'bridge',
    editorialStatus: 'published',
    isPublic: true,
    description: 'Reading comprehension, sentence correction, vocabulary in context, and error spotting.'
  },
  {
    id: 'bridge-domain-cs-core',
    parentId: 'pillar-bridge',
    pillar: 'bridge',
    contentType: 'domain',
    title: 'Core Computer Science Fundamentals',
    route: 'bridge',
    editorialStatus: 'published',
    isPublic: true,
    description: 'Operating systems, database management, computer networks, and object-oriented design.'
  },
  {
    id: 'bridge-domain-coding',
    parentId: 'pillar-bridge',
    pillar: 'bridge',
    contentType: 'domain',
    title: 'Coding Competency and Data Structures',
    route: 'bridge',
    editorialStatus: 'published',
    isPublic: true,
    description: 'Arrays, two-pointer techniques, recursion, trees, graphs, and dynamic programming.'
  },
  {
    id: 'bridge-domain-systems',
    parentId: 'pillar-bridge',
    pillar: 'bridge',
    contentType: 'domain',
    title: 'Systems Development and Project Architecture',
    route: 'bridge',
    editorialStatus: 'published',
    isPublic: true,
    description: 'System design fundamentals, REST APIs, Git workflows, and capstone project defenses.'
  },
  {
    id: 'bridge-domain-interview',
    parentId: 'pillar-bridge',
    pillar: 'bridge',
    contentType: 'domain',
    title: 'Technical and HR Interview Readiness',
    route: 'bridge',
    editorialStatus: 'published',
    isPublic: true,
    description: 'STAR behavioral response model, communication clarity, and candidate questions.'
  },

  // =========================================================================
  // PILLAR 04: THE READOUT
  // =========================================================================
  {
    id: 'pillar-readout',
    parentId: null,
    pillar: 'readout',
    contentType: 'pillar',
    title: 'The Readout',
    route: 'readout',
    editorialStatus: 'published',
    isPublic: true,
    description: 'Technical field notes, computing monographs, and systems observations.'
  },
  {
    id: 'readout-article-relays-to-tensors',
    parentId: 'pillar-readout',
    pillar: 'readout',
    contentType: 'article',
    title: 'From Relays to Tensors: The Long Arc of Computing Hardware',
    route: 'readout/relays-to-tensors',
    editorialStatus: 'draft',
    isPublic: false,
    description: 'How physical voltage differentials evolved from Shannon relay logic into modern systolic arrays.',
    metadata: {
      date: '12 Oct 2026',
      readTime: '7 min read',
      tag: 'Hardware Architecture'
    }
  },
  {
    id: 'readout-article-zero-based-indexing',
    parentId: 'pillar-readout',
    pillar: 'readout',
    contentType: 'article',
    title: 'Why Zero-Based Indexing Matters in Memory Architecture',
    route: 'readout/zero-based-indexing',
    editorialStatus: 'draft',
    isPublic: false,
    description: 'An architectural examination of pointer arithmetic and contiguous machine address offsets.',
    metadata: {
      date: '28 Sep 2026',
      readTime: '5 min read',
      tag: 'Systems & C'
    }
  },
  {
    id: 'readout-article-attention-geometry',
    parentId: 'pillar-readout',
    pillar: 'readout',
    contentType: 'article',
    title: 'The Geometry of Attention Mechanisms: A First-Principles Intuition',
    route: 'readout/attention-geometry',
    editorialStatus: 'draft',
    isPublic: false,
    description: 'Deconstructing scaled dot-product attention as vector similarity in high-dimensional space.',
    metadata: {
      date: '14 Sep 2026',
      readTime: '9 min read',
      tag: 'Machine Learning'
    }
  },

  // =========================================================================
  // PILLAR 05: THE FOLIO
  // =========================================================================
  {
    id: 'pillar-folio',
    parentId: null,
    pillar: 'folio',
    contentType: 'pillar',
    title: 'The Folio',
    route: 'folio',
    editorialStatus: 'published',
    isPublic: true,
    description: 'Personal essays, pedagogical reflections, and intellectual writing by the author.'
  },
  {
    id: 'folio-essay-teaching-from-index-zero',
    parentId: 'pillar-folio',
    pillar: 'folio',
    contentType: 'essay',
    title: 'On Teaching from Index Zero: Why Every Concept Deserves a Clean Starting Point',
    route: 'folio/teaching-from-index-zero',
    editorialStatus: 'draft',
    isPublic: false,
    description: 'Why cognitive friction happens when textbooks skip foundational assumptions.',
    metadata: {
      date: '04 Oct 2026',
      readTime: '6 min read',
      topic: 'Pedagogy & Foundations'
    }
  },
  {
    id: 'folio-essay-quiet-craft-engineering',
    parentId: 'pillar-folio',
    pillar: 'folio',
    contentType: 'essay',
    title: 'The Quiet Craft of Classroom Engineering',
    route: 'folio/quiet-craft-engineering',
    editorialStatus: 'draft',
    isPublic: false,
    description: 'Observations on preparing lecture models and drawing circuit schematics on the chalkboard.',
    metadata: {
      date: '18 Sep 2026',
      readTime: '5 min read',
      topic: 'Faculty Reflections'
    }
  },
  {
    id: 'folio-essay-deep-reading-summaries',
    parentId: 'pillar-folio',
    pillar: 'folio',
    contentType: 'essay',
    title: 'On Reading Deeply in an Era of Summary Feeds',
    route: 'folio/deep-reading-summaries',
    editorialStatus: 'draft',
    isPublic: false,
    description: 'Why engineering undergraduates must cultivate the endurance to read primary textbooks.',
    metadata: {
      date: '22 Aug 2026',
      readTime: '7 min read',
      topic: 'Books & Mindset'
    }
  }
];

/**
 * Return all registered content items.
 * @returns {ContentRegistryItem[]}
 */
export function getAllRegistryItems() {
  return centralContentRegistry;
}

/**
 * Find a specific content registry item by its unique ID.
 * @param {string} id
 * @returns {ContentRegistryItem | undefined}
 */
export function getRegistryItemById(id) {
  if (!id) return undefined;
  return centralContentRegistry.find(item => item.id === id);
}

/**
 * Get all immediate child items of a given parent ID.
 * @param {string | null} parentId
 * @returns {ContentRegistryItem[]}
 */
export function getChildren(parentId) {
  return centralContentRegistry.filter(item => item.parentId === parentId);
}

/**
 * Determine whether a content item is publicly accessible.
 * 
 * Rules:
 * 1. Default rule: anything Planned, Draft, or In Review is strictly HIDDEN.
 * 2. Only approved content with editorialStatus === 'published' can ever be public.
 * 3. An item's effective isPublic setting must be true.
 * 4. Hierarchical inheritance: if any ancestor is hidden or not published, the item is hidden.
 * 
 * @param {string} itemId - Item ID to evaluate
 * @param {Record<string, boolean>} [visibilityOverrides={}] - Optional map of id -> isPublic overrides
 * @returns {boolean}
 */
export function isItemPubliclyAccessible(itemId, visibilityOverrides = {}) {
  const item = getRegistryItemById(itemId);
  if (!item) return false;

  // Rule 1 & 2: Non-published items are unconditionally inaccessible to public visitors
  if (item.editorialStatus !== 'published') {
    return false;
  }

  // Rule 3: Check item visibility setting
  // When live overrides are active, missing records MUST fail closed (default to false)
  // because Supabase RLS only returns records where is_public is true and accessible.
  let isSelfPublic = false;
  if (Object.prototype.hasOwnProperty.call(visibilityOverrides, item.id)) {
    isSelfPublic = Boolean(visibilityOverrides[item.id]);
  } else {
    // When an item is not explicitly in visibilityOverrides:
    // If visibilityOverrides represents a live Supabase dataset (has multiple live records),
    // any record omitted by Supabase RLS strictly fails closed (false).
    // In local simulation or unit tests with partial overrides, unmentioned records retain default isPublic.
    const isLiveSupabaseMap = visibilityOverrides && Object.keys(visibilityOverrides).length >= 10;
    isSelfPublic = isLiveSupabaseMap ? false : Boolean(item.isPublic);
  }

  if (!isSelfPublic) {
    return false;
  }

  // Rule 4: Recursive inheritance check through all ancestors
  if (item.parentId) {
    return isItemPubliclyAccessible(item.parentId, visibilityOverrides);
  }

  return true;
}

/**
 * Atlas roadmap subpaths mapped to central content registry identifiers.
 */
export const ATLAS_ROADMAP_REGISTRY_MAP = {
  'programming-foundations': 'atlas-programming-foundations',
  'systems-architecture': 'atlas-systems-architecture',
  'data-science': 'atlas-data-science',
  'english-communication': 'atlas-english-communication',
  'soft-skills': 'atlas-soft-skills',
  'quantitative-aptitude': 'atlas-quantitative-aptitude',
  'logical-reasoning': 'atlas-logical-reasoning',
  'verbal-ability': 'atlas-verbal-ability',
  'c-programming': 'atlas-c-programming',
  'python-programming': 'atlas-python-programming',
  'entry-it-foundations': 'atlas-entry-it-foundations',
  'embedded-systems': 'atlas-embedded-systems',
  'vlsi-rtl-design': 'atlas-vlsi-rtl-design',
  'vlsi-verification': 'atlas-vlsi-verification',
  'vlsi-physical-design': 'atlas-vlsi-physical-design',
  'analog-ic-design': 'atlas-analog-ic-design',
  'fpga-design': 'atlas-fpga-design',
  'pcb-hardware-design': 'atlas-pcb-hardware-design',
  'rf-communication-systems': 'atlas-rf-communication-systems',
  'backend-development': 'atlas-backend-development',
  'fullstack-development': 'atlas-fullstack-development',
  'machine-learning-engineering': 'atlas-machine-learning-engineering',
  'data-engineering': 'atlas-data-engineering',
  'cloud-devops': 'atlas-cloud-devops',
  'cybersecurity-engineering': 'atlas-cybersecurity-engineering'
};

/**
 * Return stable registry ID for a DLD section (e.g. '1.1' -> 'dld-sec-1.1').
 * @param {string} sectionId
 * @returns {string}
 */
export function getSectionRegistryId(sectionId) {
  if (!sectionId) return '';
  return `dld-sec-${sectionId}`;
}

/**
 * Return stable registry ID for a DLD unit (e.g. 1 -> 'dld-unit-1').
 * @param {number | string} unitNum
 * @returns {string}
 */
export function getUnitRegistryId(unitNum) {
  if (!unitNum) return '';
  return `dld-unit-${unitNum}`;
}

/**
 * Return stable registry ID for a Workbench workspace tab.
 * @param {string} tabId
 * @returns {string}
 */
export function getWorkspaceTabRegistryId(tabId) {
  switch (tabId) {
    case 'solvers':
    case 'solver':
      return 'workbench-tool-solvers';
    case 'practice':
    case 'quiz':
    case 'arena':
      return 'workbench-tool-practice';
    case 'syllabus':
    case 'resources':
      return 'workbench-tool-resources';
    case 'units':
    case 'theory':
    case 'notes':
    default:
      return 'workbench-subject-dld';
  }
}

/**
 * Determine whether a route is publicly accessible.
 * If the route maps to a hidden item or hidden parent, returns false.
 * Resolves the most specific matching item and verifies all hierarchical ancestors.
 * 
 * @param {string} route
 * @param {Record<string, boolean>} [visibilityOverrides={}]
 * @returns {boolean}
 */
export function isRoutePubliclyAccessible(route, visibilityOverrides = {}) {
  if (!route) return true;
  let normalizedRoute = route.replace(/^#\/?/, '').trim().toLowerCase();

  // Root homepage is always public
  if (!normalizedRoute || normalizedRoute === 'home') {
    return true;
  }

  // Canonical route aliases
  if (normalizedRoute === 'placements' || normalizedRoute.startsWith('placements/')) {
    normalizedRoute = normalizedRoute.replace(/^placements/, 'bridge');
  } else if (normalizedRoute === 'roadmaps' || normalizedRoute.startsWith('roadmaps/')) {
    normalizedRoute = normalizedRoute.replace(/^roadmaps/, 'atlas');
  }

  // 1. Pillar 01: The Workbench routes
  if (normalizedRoute === 'workbench' || normalizedRoute === 'pillar-workbench') {
    return isItemPubliclyAccessible('pillar-workbench', visibilityOverrides);
  }

  if (normalizedRoute === 'dld' || normalizedRoute === 'dld-home') {
    return isItemPubliclyAccessible('workbench-subject-dld', visibilityOverrides);
  }

  if (normalizedRoute === 'workspace' || normalizedRoute === 'workspace/units') {
    // Accessible if subject is accessible and at least one unit is accessible
    const subjectAccessible = isItemPubliclyAccessible('workbench-subject-dld', visibilityOverrides);
    if (!subjectAccessible) return false;
    const anyUnitAccessible = [1, 2, 3, 4, 5].some(u => isItemPubliclyAccessible(`dld-unit-${u}`, visibilityOverrides));
    return anyUnitAccessible;
  }

  if (normalizedRoute === 'workspace/solvers' || normalizedRoute === 'workspace/solver') {
    return isItemPubliclyAccessible('workbench-tool-solvers', visibilityOverrides);
  }

  if (normalizedRoute === 'workspace/practice' || normalizedRoute === 'workspace/quiz' || normalizedRoute === 'workspace/arena') {
    return isItemPubliclyAccessible('workbench-tool-practice', visibilityOverrides);
  }

  if (normalizedRoute === 'workspace/syllabus' || normalizedRoute === 'workspace/resources') {
    return isItemPubliclyAccessible('workbench-tool-resources', visibilityOverrides);
  }

  if (normalizedRoute.startsWith('workspace/units/')) {
    const subId = normalizedRoute.replace(/^workspace\/units\//, '').split('/')[0];
    const sectionRegId = getSectionRegistryId(subId);
    const unitNum = subId.split('.')[0];
    const unitRegId = getUnitRegistryId(unitNum);

    // Section and its unit must both be accessible
    if (!isItemPubliclyAccessible(unitRegId, visibilityOverrides)) {
      return false;
    }
    return isItemPubliclyAccessible(sectionRegId, visibilityOverrides);
  }

  // Direct section route shortcuts (e.g. #2.1, #sec-2.1)
  const directSecMatch = normalizedRoute.match(/^(?:sec(?:tion)?[-_]?)?([1-5]\.[1-7])$/i);
  if (directSecMatch) {
    const subId = directSecMatch[1];
    const sectionRegId = getSectionRegistryId(subId);
    const unitNum = subId.split('.')[0];
    const unitRegId = getUnitRegistryId(unitNum);
    if (!isItemPubliclyAccessible(unitRegId, visibilityOverrides)) {
      return false;
    }
    return isItemPubliclyAccessible(sectionRegId, visibilityOverrides);
  }

  // 2. Pillar 02: The Atlas routes (combines Learning Paths and Career Prep)
  if (normalizedRoute === 'atlas') {
    return isItemPubliclyAccessible('pillar-atlas', visibilityOverrides) || isItemPubliclyAccessible('pillar-bridge', visibilityOverrides);
  }

  if (normalizedRoute === 'atlas/learning-paths') {
    return isItemPubliclyAccessible('pillar-atlas', visibilityOverrides);
  }

  if (normalizedRoute === 'atlas/career-prep') {
    return isItemPubliclyAccessible('pillar-bridge', visibilityOverrides);
  }

  if (normalizedRoute.startsWith('atlas/career-prep/')) {
    const bridgeSubpath = normalizedRoute.slice(18).split('/')[0];
    const bridgeSubpathToRegistryId = {
      'quant': 'bridge-domain-quant',
      'quantitative-aptitude': 'bridge-domain-quant',
      'numerical-reasoning': 'bridge-domain-quant',
      'logical': 'bridge-domain-logical',
      'logical-reasoning': 'bridge-domain-logical',
      'analytical-reasoning': 'bridge-domain-logical',
      'verbal': 'bridge-domain-verbal',
      'verbal-communication': 'bridge-domain-verbal',
      'reading-comprehension': 'bridge-domain-verbal',
      'coding': 'bridge-domain-coding',
      'coding-preparation': 'bridge-domain-coding',
      'cs-core': 'bridge-domain-cs-core',
      'core-cs': 'bridge-domain-cs-core',
      'core-cs-knowledge': 'bridge-domain-cs-core',
      'systems': 'bridge-domain-systems',
      'resume': 'bridge-domain-systems',
      'resume-preparation': 'bridge-domain-systems',
      'interview': 'bridge-domain-interview',
      'interviews': 'bridge-domain-interview',
      'technical-hr-interviews': 'bridge-domain-interview'
    };
    const targetDomainId = bridgeSubpathToRegistryId[bridgeSubpath];
    if (targetDomainId) {
      return isItemPubliclyAccessible(targetDomainId, visibilityOverrides);
    }
    return false;
  }

  if (normalizedRoute.startsWith('atlas/learning-paths/')) {
    const roadmapSlug = normalizedRoute.slice(21).split('/')[0];
    const roadmapRegId = ATLAS_ROADMAP_REGISTRY_MAP[roadmapSlug];
    if (roadmapRegId) {
      return isItemPubliclyAccessible(roadmapRegId, visibilityOverrides);
    }
    return false;
  }

  if (normalizedRoute.startsWith('atlas/activity/') || normalizedRoute.startsWith('atlas/preview/') || normalizedRoute.startsWith('atlas/practice/')) {
    const actSlug = normalizedRoute.split('/')[2];
    const validActivities = [
      'speak-clearly',
      'speak-clearly-60s',
      'listen-respond',
      'express-your-opinion',
      'express-opinion',
      'everyday-conversations',
      'everyday-conversation'
    ];
    if (actSlug && validActivities.includes(actSlug)) {
      return isItemPubliclyAccessible('atlas-english-communication', visibilityOverrides);
    }
    return false;
  }

  if (normalizedRoute.startsWith('atlas/')) {
    const roadmapSlug = normalizedRoute.slice(6).split('/')[0];
    const roadmapRegId = ATLAS_ROADMAP_REGISTRY_MAP[roadmapSlug];
    if (roadmapRegId) {
      return isItemPubliclyAccessible(roadmapRegId, visibilityOverrides);
    }
    // Fail closed for unknown or unregistered roadmap subpaths
    return false;
  }

  // 3. Legacy Pillar 03: The Bridge routes (backward compatibility)
  if (normalizedRoute === 'bridge') {
    return isItemPubliclyAccessible('pillar-bridge', visibilityOverrides);
  }

  if (normalizedRoute.startsWith('bridge/')) {
    const bridgeSubpath = normalizedRoute.slice(7).split('/')[0];
    const bridgeSubpathToRegistryId = {
      'quant': 'bridge-domain-quant',
      'quantitative-aptitude': 'bridge-domain-quant',
      'numerical-reasoning': 'bridge-domain-quant',
      'logical': 'bridge-domain-logical',
      'logical-reasoning': 'bridge-domain-logical',
      'analytical-reasoning': 'bridge-domain-logical',
      'verbal': 'bridge-domain-verbal',
      'verbal-communication': 'bridge-domain-verbal',
      'reading-comprehension': 'bridge-domain-verbal',
      'coding': 'bridge-domain-coding',
      'coding-preparation': 'bridge-domain-coding',
      'cs-core': 'bridge-domain-cs-core',
      'core-cs': 'bridge-domain-cs-core',
      'core-cs-knowledge': 'bridge-domain-cs-core',
      'systems': 'bridge-domain-systems',
      'resume': 'bridge-domain-systems',
      'resume-preparation': 'bridge-domain-systems',
      'interview': 'bridge-domain-interview',
      'interviews': 'bridge-domain-interview',
      'technical-hr-interviews': 'bridge-domain-interview'
    };
    const targetDomainId = bridgeSubpathToRegistryId[bridgeSubpath];
    if (targetDomainId) {
      return isItemPubliclyAccessible(targetDomainId, visibilityOverrides);
    }
    return false;
  }

  // 4. Pillar 03: The Journal routes (combines Insights and Reflections)
  if (normalizedRoute === 'journal') {
    return isItemPubliclyAccessible('pillar-readout', visibilityOverrides) || isItemPubliclyAccessible('pillar-folio', visibilityOverrides);
  }

  if (normalizedRoute === 'journal/insights') {
    return isItemPubliclyAccessible('pillar-readout', visibilityOverrides);
  }

  if (normalizedRoute === 'journal/reflections') {
    return isItemPubliclyAccessible('pillar-folio', visibilityOverrides);
  }

  if (normalizedRoute.startsWith('journal/insights/')) {
    const articleSlug = normalizedRoute.slice(17).split('/')[0];
    const targetItem = centralContentRegistry.find(item => item.route.toLowerCase() === `readout/${articleSlug}`);
    if (targetItem) {
      return isItemPubliclyAccessible(targetItem.id, visibilityOverrides);
    }
    return false;
  }

  if (normalizedRoute.startsWith('journal/reflections/')) {
    const essaySlug = normalizedRoute.slice(20).split('/')[0];
    const targetItem = centralContentRegistry.find(item => item.route.toLowerCase() === `folio/${essaySlug}`);
    if (targetItem) {
      return isItemPubliclyAccessible(targetItem.id, visibilityOverrides);
    }
    return false;
  }

  // Legacy Pillar 04: The Readout routes (backward compatibility)
  if (normalizedRoute === 'readout') {
    return isItemPubliclyAccessible('pillar-readout', visibilityOverrides);
  }

  if (normalizedRoute.startsWith('readout/')) {
    const articleSlug = normalizedRoute.slice(8).split('/')[0];
    const targetItem = centralContentRegistry.find(item => item.route.toLowerCase() === `readout/${articleSlug}`);
    if (targetItem) {
      return isItemPubliclyAccessible(targetItem.id, visibilityOverrides);
    }
    // Fail closed for unpublished or unknown article slugs
    return false;
  }

  // Legacy Pillar 05: The Folio routes (backward compatibility)
  if (normalizedRoute === 'folio') {
    return isItemPubliclyAccessible('pillar-folio', visibilityOverrides);
  }

  if (normalizedRoute.startsWith('folio/')) {
    const essaySlug = normalizedRoute.slice(6).split('/')[0];
    const targetItem = centralContentRegistry.find(item => item.route.toLowerCase() === `folio/${essaySlug}`);
    if (targetItem) {
      return isItemPubliclyAccessible(targetItem.id, visibilityOverrides);
    }
    // Fail closed for unpublished or unknown essay slugs
    return false;
  }

  // Exact route match against any registered item
  const exactMatch = centralContentRegistry.find(item => item.route.toLowerCase() === normalizedRoute);
  if (exactMatch) {
    return isItemPubliclyAccessible(exactMatch.id, visibilityOverrides);
  }

  // Fallback: If route is not tracked in registry, allow default navigation
  return true;
}

