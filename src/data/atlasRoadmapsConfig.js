/**
 * Centralized Academic Roadmaps Configuration for The Atlas (Pillar 02)
 * Single source of truth for technical pathways, stage progressions, and learning milestones.
 */

export const atlasRoadmaps = [
  {
    id: 'programming-foundations',
    isPrimary: true,
    title: 'Programming Foundations Roadmap',
    subtitle: 'A Structured Route from Discrete Machine Logic to Algorithms and Systems',
    accent: '#496D91',
    softAccent: '#E1EAF2',
    status: 'Foundational Roadmap',
    target: 'Undergraduate engineers and self-directed students seeking genuine foundational rigor',
    prerequisites: 'Basic high school mathematics and logical reasoning',
    overview: 'This roadmap provides a deliberate, first-principles sequence to learn computing. Rather than treating code as arbitrary syntax, it starts with how machines represent data in silicon, moves into systematic problem decomposition, builds deep systems intuition with C, expands into modern rapid development with Python, cements core data structures, and outlines specialized engineering directions.',
    stages: [
      {
        stageNumber: '01',
        title: 'Computing & Programming Fundamentals',
        subtitle: 'How Digital Machines Represent Data and Execute Instructions',
        estimatedTime: 'Weeks 1 to 3',
        prerequisites: 'High school algebra and general computer literacy',
        status: 'Curriculum Link Available',
        statusType: 'available',
        learningObjectives: [
          'Understand how electronic voltage levels correspond to discrete logic states (0 and 1).',
          'Master positional number representations across Binary, Octal, Decimal, and Hexadecimal.',
          'Execute radix conversions manually using division ladders and multiplication algorithms.',
          'Understand 2s complement signed integer representation, bit ranges, and arithmetic overflow.',
          'Grasp the CPU fetch-decode-execute instruction cycle and memory address concepts.'
        ],
        coreConcepts: [
          'Bits, Bytes, Words and Word-Length Boundaries',
          'Positional Weights and Base Conversion Algorithms',
          'Radix (r) and Diminished Radix (r-1) Complements',
          'Signed Magnitude, 1s Complement and 2s Complement',
          'Arithmetic Overflow Detection (V-bit Flag)',
          'Fundamental Logic Gates (AND, OR, NOT, NAND, NOR, XOR, XNOR)',
          'Von Neumann Architecture and Memory Address Spaces'
        ],
        practicalMilestones: [
          'Convert integer and fractional decimal numbers to binary and hexadecimal by hand.',
          'Derive 8-bit 2s complement representations of signed numbers and detect overflow traps.',
          'Trace manual logic gate truth tables and verify switch circuit electrical analogies.'
        ],
        zeroIndexLink: {
          available: true,
          label: 'Digital Logic Design · Unit 1 (Available on The Workbench)',
          sectionRoute: 'workspace/units/1.1'
        }
      },
      {
        stageNumber: '02',
        title: 'Problem-Solving & Algorithmic Thinking',
        subtitle: 'Decomposing Requirements into Unambiguous Step-by-Step Logic',
        estimatedTime: 'Weeks 4 to 6',
        prerequisites: 'Computing and numeric fundamentals',
        status: 'Methodology Framework',
        statusType: 'framework',
        learningObjectives: [
          'Break down ambiguous, open-ended problem descriptions into discrete executable steps.',
          'Construct rigorous pseudocode using standard control primitives without language-specific quirks.',
          'Identify loop invariants and formulate mathematical termination conditions.',
          'Estimate basic time and space algorithmic complexity using Big-O asymptotic notation.',
          'Identify boundary edge cases: empty collections, single elements, and extrema.'
        ],
        coreConcepts: [
          'Functional Problem Decomposition and Flowcharting',
          'Control Flow Primitives: Sequence, Selection, Iteration',
          'Loop Invariants and Pre/Post-Condition Contracts',
          'Asymptotic Notation: Big-O Time and Space Bounds (O(1), O(log n), O(n), O(n^2))',
          'Divide-and-Conquer Mental Models',
          'Systematic Dry-Running and State Tracing'
        ],
        practicalMilestones: [
          'Write step-by-step pseudocode for searching and sorting algorithms before touching any compiler.',
          'Construct state-trace matrices tracking loop variables across multiple iterations on paper.',
          'Analyze operation count equations for nested loops and simplify to Big-O bounds.'
        ],
        zeroIndexLink: {
          available: true,
          label: 'DLD Practice Arena & Logic Exercises (Available on The Workbench)',
          sectionRoute: 'workspace/practice'
        }
      },
      {
        stageNumber: '03',
        title: 'C Programming Fundamentals & Systems Intuition',
        subtitle: 'Explicit Memory Layout, Pointer Mechanics, and Bare-Metal Execution',
        estimatedTime: 'Weeks 7 to 10',
        prerequisites: 'Algorithmic problem solving and basic control flow',
        status: 'Curriculum Outline',
        statusType: 'planned',
        learningObjectives: [
          'Understand exact data type byte-widths and numeric limits in machine memory.',
          'Master pointer mechanics: memory addresses, dereferencing, and pointer arithmetic.',
          'Differentiate call stack execution frames (local variables) from heap memory allocations.',
          'Allocate and deallocate dynamic heap buffers safely using malloc, calloc, and free.',
          'Compose composite types using structs, unions, and understand memory alignment padding.'
        ],
        coreConcepts: [
          'Data Types, Sizeof Operator, and Standard Integers (stdint.h)',
          'Pointer Mechanics, Address-of (&) and Dereference (*) Operators',
          'Array-Pointer Relationship and Pointer Arithmetic',
          'Call Stack Frames, Activation Records, and Variable Scope',
          'Heap Memory Allocation (malloc, realloc, free) and Memory Leak Prevention',
          'Struct Memory Layout, Member Offsets, and Word Alignment Padding',
          'Bitwise Operators (&, |, ^, ~, <<, >>) and Bit Manipulation Masking'
        ],
        practicalMilestones: [
          'Implement a resizable dynamic array in C that doubles its buffer when capacity is reached.',
          'Write a custom string tokenization function using pointers without string.h strtok.',
          'Construct a command-line student record system with binary file persistence (fread/fwrite).'
        ],
        zeroIndexLink: {
          available: false,
          label: 'C Programming & Systems Track (Planned on The Workbench)',
          sectionRoute: null
        }
      },
      {
        stageNumber: '04',
        title: 'Python Programming & Rapid Implementation',
        subtitle: 'High-Level Expressiveness, Standard Library Power, and Rapid Prototyping',
        estimatedTime: 'Weeks 11 to 13',
        prerequisites: 'Control flow primitives and structured programming concepts',
        status: 'Curriculum Outline',
        statusType: 'planned',
        learningObjectives: [
          'Transition from low-level memory mechanics to high-level expressive productivity.',
          'Master Python built-in collections: lists, tuples, sets, dictionaries and their complexities.',
          'Write idiomatic Python using list/dict comprehensions, generators, and iterators.',
          'Understand reference semantics, mutability, and object identity (is vs ==).',
          'Structure software into reusable modules and manage dependencies with virtual environments.'
        ],
        coreConcepts: [
          'Python Object Model: Reference Semantics and Mutability',
          'Built-in Data Structures: Lists (Dynamic Arrays), Dicts (Hash Maps), Sets, Tuples',
          'List and Dictionary Comprehensions and Generator Expressions',
          'Functions as First-Class Objects, Higher-Order Functions, and Lambdas',
          'Exception Handling Hierarchies (try, except, else, finally)',
          'File I/O Context Managers (with open() as f)',
          'Modules, Packages, Virtual Environments (venv) and pip Hygiene'
        ],
        practicalMilestones: [
          'Build an automated file-indexing script that analyzes directory contents and word frequency.',
          'Construct a CSV/JSON data sanitizer that validates schema types and reports anomalies.',
          'Implement a command-line tool that interfaces with a public web API and formats results.'
        ],
        zeroIndexLink: {
          available: false,
          label: 'Applied Python Computing Track (Future Planned Track)',
          sectionRoute: null
        }
      },
      {
        stageNumber: '05',
        title: 'Essential Data Structures & Operational Complexity',
        subtitle: 'Organizing Information for Efficient Search, Insertion, and Deletion',
        estimatedTime: 'Weeks 14 to 18',
        prerequisites: 'Proficiency in C or Python, pointer or reference understanding',
        status: 'Curriculum Outline',
        statusType: 'planned',
        learningObjectives: [
          'Differentiate contiguous memory collections (arrays) from node-based linked structures.',
          'Implement Stacks (LIFO) and Queues (FIFO) and identify their algorithmic applications.',
          'Understand Hash Tables, hash functions, and collision resolution techniques.',
          'Traverse non-linear tree structures (Binary Trees and Binary Search Trees).',
          'Select the optimal data structure given specific time, space, and access patterns.'
        ],
        coreConcepts: [
          'Contiguous vs Discontinuous Memory Allocations',
          'Singly and Doubly Linked Lists: Insertion, Deletion, and Node Traversal',
          'Stacks (LIFO): Call Stack Simulation, Expression Evaluation, Monotonic Stacks',
          'Queues (FIFO): Circular Buffers, Deques, Breadth-First Explorations',
          'Hash Tables: Hash Functions, Bucket Arrays, Chaining vs Open Addressing',
          'Binary Search Trees: In-Order, Pre-Order, Post-Order Traversals, Search Bounds',
          'Priority Queues and Binary Heaps (Min/Max Heap Properties)'
        ],
        practicalMilestones: [
          'Implement an arithmetic infix-to-postfix converter and evaluator using stacks.',
          'Build a custom Hash Map from scratch with linked-list collision chaining.',
          'Construct a Binary Search Tree with search, insert, and recursive traversal routines.'
        ],
        zeroIndexLink: {
          available: false,
          label: 'Data Structures & Algorithms Track (Planned on The Workbench)',
          sectionRoute: null
        }
      },
      {
        stageNumber: '06',
        title: 'Further Technical Learning Directions',
        subtitle: 'Choosing Your Next Specialization Branch in Computer Science',
        estimatedTime: 'Continuous Pathway',
        prerequisites: 'Core programming fundamentals, systems awareness, and essential data structures',
        status: 'Pathway Synthesis',
        statusType: 'synthesis',
        learningObjectives: [
          'Evaluate computer science specializations based on intellectual interest and career goals.',
          'Identify the mathematical and technological prerequisites for advanced engineering branches.',
          'Bridge foundational knowledge to real-world software systems or research disciplines.'
        ],
        coreConcepts: [
          'Systems and Infrastructure: Operating Systems, Computer Architecture, Distributed Systems',
          'Applied Data Science & AI: Linear Algebra, Multivariate Calculus, Statistical Modeling, Deep Learning',
          'Web and Cloud Engineering: HTTP Protocols, Relational Databases, REST/gRPC, Distributed Consensus',
          'Algorithmic Problem Solving: Dynamic Programming, Graph Traversals, Segment Trees, Complexity Proofs'
        ],
        branches: [
          {
            branchTitle: 'Branch A: Systems & Computer Architecture',
            target: 'For engineers drawn to operating systems, hardware interaction, and low-level performance.',
            keyTopics: ['Computer Organization', 'Operating Systems Internals', 'Virtual Memory', 'Concurrency & Locks', 'Rust/C++ Systems Programming'],
            workbenchLink: 'Digital Logic Design & Systems (Unit 1 Live)'
          },
          {
            branchTitle: 'Branch B: Data Science & Machine Learning',
            target: 'For students drawn to mathematical modeling, statistical learning, and artificial intelligence.',
            keyTopics: ['Linear Algebra & SVD', 'Multivariable Optimization', 'Loss Functions & Gradients', 'PyTorch & Deep Neural Models'],
            workbenchLink: 'Machine Learning Foundations (Planned)'
          },
          {
            branchTitle: 'Branch C: Software Architecture & Web Platforms',
            target: 'For engineers who want to design resilient web applications and distributed cloud services.',
            keyTopics: ['Relational Schema Design & SQL', 'Networking (TCP/IP, HTTP)', 'API Design & Security', 'Distributed Message Queues'],
            workbenchLink: 'Web Systems Architecture (Planned)'
          },
          {
            branchTitle: 'Branch D: Algorithmic Problem Solving & Competitive Programming',
            target: 'For students preparing for competitive programming and rigorous technical interview rounds.',
            keyTopics: ['Graph Theory (BFS, DFS, Dijkstra)', 'State-Space Dynamic Programming', 'Bitmasking', 'Advanced Tree Structures'],
            workbenchLink: 'The Bridge Placement Guide (Active)'
          }
        ],
        zeroIndexLink: {
          available: true,
          label: 'The Bridge: Campus Placement Preparation Guide',
          sectionRoute: 'bridge'
        }
      }
    ]
  },
  {
    id: 'systems-architecture',
    isPrimary: false,
    title: 'Computer Systems & Architecture Pathway',
    subtitle: 'From Silicon & Gates to Modern Operating Systems',
    accent: '#346C53',
    softAccent: '#E0EBDF',
    status: 'Specialized Pathway',
    target: 'Foundational CS & Computer Systems Engineers',
    prerequisites: 'Basic algebra and logical reasoning',
    overview: 'Traces the vertical compute stack upwards: from electronic logic gates and sequential registers, through instruction set architectures and assembly, to memory virtualization and multi-threaded operating system kernels.',
    stages: [
      {
        stageNumber: '01',
        title: 'Boolean Logic & Digital Hardware',
        subtitle: 'Number Systems, Combinational Gates & Binary Arithmetic',
        topics: ['Positional Number Systems', 'Complements & Subtraction', '7 Logic Gate Primitives', 'Sequential Flip-Flops'],
        zeroIndexLink: {
          available: true,
          label: 'Digital Logic Design · Unit 1 (Available on The Workbench)',
          sectionRoute: 'workspace/units/1.1'
        },
        status: 'Unit 1 Live on Workbench',
        statusType: 'available'
      },
      {
        stageNumber: '02',
        title: 'Low-Level Execution & Memory in C',
        subtitle: 'Pointers, Stack Frames, and Bare-Metal Execution',
        topics: ['Address Space Organization', 'Pointers & Dereferencing', 'Dynamic Memory Management', 'Struct Bitfields'],
        zeroIndexLink: {
          available: false,
          label: 'C Programming & Systems (Planned Track)',
          sectionRoute: null
        },
        status: 'Planned Outline',
        statusType: 'planned'
      },
      {
        stageNumber: '03',
        title: 'Computer Organization & Assembly',
        subtitle: 'Datapaths, Control Units, and Instruction Sets',
        topics: ['ALU Design & Flags', 'Register Files', 'Instruction Set Architecture (RISC-V)', 'Pipelining & Hazards'],
        zeroIndexLink: {
          available: false,
          label: 'Computer Architecture (Planned Track)',
          sectionRoute: null
        },
        status: 'In Blueprint',
        statusType: 'planned'
      },
      {
        stageNumber: '04',
        title: 'Operating System Internals',
        subtitle: 'Processes, Virtual Memory, and Kernel Concurrency',
        topics: ['Process Scheduling', 'Virtual Memory & Paging', 'Deadlocks & Semaphores', 'File System Architecture'],
        zeroIndexLink: {
          available: false,
          label: 'Operating Systems (Planned Track)',
          sectionRoute: null
        },
        status: 'In Blueprint',
        statusType: 'planned'
      }
    ]
  },
  {
    id: 'data-science',
    isPrimary: false,
    title: 'Data Science & Machine Learning Foundations',
    subtitle: 'Mathematical Principles to Deep Neural Representations',
    accent: '#245B4B',
    softAccent: '#E0EBDF',
    status: 'Specialized Pathway',
    target: 'Data Science & Applied Artificial Intelligence Undergraduates',
    prerequisites: 'Calculus, linear algebra, and Python programming basics',
    overview: 'Grounds modern machine learning in rigorous mathematics: matrix transformations, multivariable gradient calculus, classical statistical learning, and backpropagation mechanics in deep neural networks.',
    stages: [
      {
        stageNumber: '01',
        title: 'Applied Linear Algebra & Calculus',
        subtitle: 'Vector Spaces, Matrix Factorizations, and Derivatives',
        topics: ['Matrix Decompositions (SVD, PCA)', 'Eigenvalues & Eigenvectors', 'Partial Derivatives & Gradients', 'Vector Norms'],
        zeroIndexLink: {
          available: false,
          label: 'ML Mathematical Foundations (Planned Track)',
          sectionRoute: null
        },
        status: 'Planned Outline',
        statusType: 'planned'
      },
      {
        stageNumber: '02',
        title: 'Statistical Modeling & Classical Machine Learning',
        subtitle: 'Regression, Classification, and Loss Minimization',
        topics: ['Linear & Logistic Regression', 'Decision Trees & Ensembles', 'Cross-Validation & Regularization', 'Loss Functions & Gradient Descent'],
        zeroIndexLink: {
          available: false,
          label: 'Statistical Learning (Planned Track)',
          sectionRoute: null
        },
        status: 'In Blueprint',
        statusType: 'planned'
      },
      {
        stageNumber: '03',
        title: 'Deep Neural Networks & Representation',
        subtitle: 'Backpropagation Proofs, Convolutions, and Transformers',
        topics: ['Computational Graphs & Backprop Calculus', 'CNNs & Spatial Filters', 'Sequence Embeddings', 'Attention Mechanisms & Transformers'],
        zeroIndexLink: {
          available: false,
          label: 'Deep Learning (Planned Track)',
          sectionRoute: null
        },
        status: 'In Blueprint',
        statusType: 'planned'
      }
    ]
  }
];
