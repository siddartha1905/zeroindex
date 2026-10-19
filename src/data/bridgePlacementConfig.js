/**
 * Centralized Placement & Career Readiness Configuration for The Bridge (Pillar 03)
 * Single source of truth for the Campus Placement Preparation Guide.
 * 
 * Organizes 7 foundational competencies with practical preparation checklists,
 * high-yield formulas, frameworks, and honest progress tracking.
 */

export const bridgePlacementDomains = [
  {
    id: 'quantitative-aptitude',
    title: 'Quantitative Aptitude & Numerical Reasoning',
    shortTitle: 'Quantitative Aptitude',
    category: 'Foundational Reasoning',
    badge: 'Preparation Guide',
    accent: '#956A43',
    softAccent: '#F1E5D9',
    summary: 'Systematic numerical reasoning, speed mental arithmetic, core formulas, and time-management strategies for campus placement assessments.',
    overview: 'Quantitative aptitude rounds evaluate numeric fluency, mental estimation, and the ability to model word problems mathematically under strict time constraints. Success requires both formula recall and identifying calculation shortcuts.',
    competencyTracks: [
      {
        trackName: 'Speed Mathematics & Mental Calculation',
        description: 'Multiplication shortcuts, squares up to 30, cubes up to 15, fractional equivalents of percentages (1/2 through 1/12), and fast divisibility tests (2 through 13).'
      },
      {
        trackName: 'Commercial Arithmetic Core',
        description: 'Percentages, Profit and Loss, Marked Price and Discount equations, Simple Interest (SI) and Compound Interest (CI) with compounding periods, Ratios, Proportions, and Partnership shares.'
      },
      {
        trackName: 'Motion, Time & Work Dynamics',
        description: 'Time and Work (Unitary and LCM methods), Pipes and Cisterns, Time-Speed-Distance, Relative Speed for trains moving in opposite vs same directions, Boats and Streams (Upstream vs Downstream).'
      },
      {
        trackName: 'Modern Mathematics & Combinatorics',
        description: 'Permutations (arrangements where order matters), Combinations (selections where order does not matter), Probability of independent and mutually exclusive events, Set Theory and 2/3-circle Venn diagrams.'
      },
      {
        trackName: 'Number Theory & Algebra',
        description: 'Prime factorization, HCF (GCD) and LCM word problems, Remainder Theorem, Units digit cycle of powers, Progressions (AP, GP), and Quadratic Equations.'
      }
    ],
    formulasAndRules: [
      {
        ruleTitle: 'Work Rate and Time Equation',
        ruleFormula: 'Total Work = Work Rate × Time',
        ruleNote: 'If Person A finishes in X days and Person B finishes in Y days, their combined rate is 1/X + 1/Y = (X+Y)/(XY), taking XY/(X+Y) days.'
      },
      {
        ruleTitle: 'Relative Speed of Two Moving Objects',
        ruleFormula: 'Opposite Directions: S_rel = S_1 + S_2 | Same Direction: S_rel = |S_1 - S_2|',
        ruleNote: 'When a train crosses a platform of length L, total distance covered is Length_train + L.'
      },
      {
        ruleTitle: 'Effective Percentage Change',
        ruleFormula: 'Net Change = a + b + (a × b) / 100',
        ruleNote: 'Useful for successive discounts, successive percentage increments, and area scaling problems.'
      },
      {
        ruleTitle: 'Permutations vs Combinations',
        ruleFormula: 'P(n, r) = n! / (n - r)!  |  C(n, r) = n! / [r! × (n - r)!]',
        ruleNote: 'Use combinations when choosing a committee or team; use permutations when ordering digits or assigning distinct seats.'
      }
    ],
    checklist: [
      'Memorize squares of integers from 1 through 30 and cubes from 1 through 15.',
      'Master fractional equivalents of percentages: 1/2 (50%) through 1/12 (8.33%).',
      'Verify divisibility rules for 2, 3, 4, 5, 6, 7, 8, 9, 11, and 13.',
      'Solve 15 variations of Time and Work using the LCM total-work method.',
      'Practice relative speed calculations for train crossing and boat stream problems.',
      'Distinguish Permutations (order matters) from Combinations (selection only).',
      'Calculate LCM and HCF word problems with remainder constraints.',
      'Solve 10 mixed quantitative timed problem sets (20 questions in 25 minutes).'
    ],
    zeroIndexLink: {
      available: true,
      label: 'Digital Logic Design · Unit 1: Number Systems & Conversions (Workbench)',
      sectionRoute: 'workspace/units/1.1'
    }
  },
  {
    id: 'logical-reasoning',
    title: 'Logical & Analytical Reasoning',
    shortTitle: 'Logical Reasoning',
    category: 'Analytical Deduction',
    badge: 'Preparation Guide',
    accent: '#496D91',
    softAccent: '#E1EAF2',
    summary: 'Deductive logic, arrangement matrices, relation trees, syllogisms, and systematic pattern elimination.',
    overview: 'Logical reasoning sections measure structural thinking and deduction. Rather than intuition, candidates must systematically translate conditions into diagrams and eliminate contradictory hypotheses.',
    competencyTracks: [
      {
        trackName: 'Deductive Logic & Syllogisms',
        description: 'Statements and Conclusions using the Venn Diagram approach: All A are B, Some A are B, No A is B. Differentiating definite conclusions from possibility cases.'
      },
      {
        trackName: 'Seating & Position Arrangements',
        description: 'Linear arrangements (single row and parallel double rows facing each other), Circular tables (facing center vs facing outward), Floor puzzles, and Weekday scheduling grids.'
      },
      {
        trackName: 'Family Trees & Blood Relations',
        description: 'Coded relations (A + B means A is father of B), generation diagrams, horizontal spouse/sibling notation, and vertical parent-child links.'
      },
      {
        trackName: 'Direction Sense & Vectors',
        description: '8-cardinal compass headings (N, S, E, W, NE, NW, SE, SW), right and left turn angle rotations, Pythagoras distance calculations, and sunrise/sunset shadow logic.'
      },
      {
        trackName: 'Data Sufficiency & Analytical Series',
        description: 'Alphanumeric sequences, symbol patterns, and determining whether Statement (1) alone, (2) alone, both together, or neither are sufficient to answer.'
      }
    ],
    formulasAndRules: [
      {
        ruleTitle: 'Golden Rule of Seating Arrangements',
        ruleFormula: 'Start with 100% Definite Anchor Placements',
        ruleNote: 'Never guess open positions early. Identify clues that fix an element to a specific seat, end, or facing orientation first, then build dependencies.'
      },
      {
        ruleTitle: 'Syllogism Definite vs Possibility Rule',
        ruleFormula: 'A conclusion is valid ONLY if it holds in EVERY possible Venn diagram',
        ruleNote: 'If you can draw even one valid Venn diagram where the conclusion fails, that conclusion is NOT definitely true.'
      },
      {
        ruleTitle: 'Blood Relation Notation Protocol',
        ruleFormula: 'Generations = Vertical | Spouses = Double Horizontal | Siblings = Single Horizontal',
        ruleNote: 'Always mark gender (+ for male, - for female) immediately to prevent misidentifying maternal vs paternal relations.'
      }
    ],
    checklist: [
      'Draw standard Venn representations for All, Some, No, and Some Not statements.',
      'Solve 10 circular seating arrangements with mixed facing directions (inside and outside).',
      'Construct linear seating arrangements with two parallel rows facing each other.',
      'Practice coded blood relations by drawing multi-generation family trees.',
      'Solve direction problems involving multiple turns and Pythagorean shortest distances.',
      'Master the 5 data sufficiency response options without calculating full numerical answers.',
      'Practice alphabet position indexing (A=1 to Z=26) and reverse complements (Sum = 27).',
      'Complete 5 timed logical reasoning sets (20 questions in 20 minutes).'
    ],
    zeroIndexLink: {
      available: true,
      label: 'Digital Logic Design · Unit 1: Logic Gates & Truth Tables (Workbench)',
      sectionRoute: 'workspace/units/1.7'
    }
  },
  {
    id: 'verbal-communication',
    title: 'Verbal Ability & Professional Communication',
    shortTitle: 'Verbal & Communication',
    category: 'Language & Articulation',
    badge: 'Preparation Guide',
    accent: '#245B4B',
    softAccent: '#E0EBDF',
    summary: 'Reading comprehension under time pressure, grammatical mechanics, concise articulation, and professional written communication.',
    overview: 'Evaluates written English proficiency, vocabulary in context, reading speed, and professional communication standards essential for engineering teams and customer-facing roles.',
    competencyTracks: [
      {
        trackName: 'Timed Reading Comprehension',
        description: 'Extracting central thesis, author tone (objective, skeptical, critical, didactic), separating explicit facts from inferences, and navigating dense technical prose.'
      },
      {
        trackName: 'Core Grammatical Mechanics',
        description: 'Subject-verb agreement, pronoun-antecedent agreement, parallel sentence structure, dangling and misplaced modifiers, and tense consistency.'
      },
      {
        trackName: 'Vocabulary & Contextual Word Usage',
        description: 'Collocations, phrasal verbs, idioms, common homophones, root words (Greek and Latin prefixes/suffixes), and words with multiple contextual meanings.'
      },
      {
        trackName: 'Sentence Logic & Structure',
        description: 'Para Jumbles (sentence rearrangement using pronoun links, chronology, and transition markers), Cloze tests, and sentence correction.'
      },
      {
        trackName: 'Professional Technical Writing',
        description: 'Clear active voice, concise technical email composition, bug report clarity, and avoiding ambiguous phrasing in engineering correspondence.'
      }
    ],
    formulasAndRules: [
      {
        ruleTitle: 'The Active Reading Protocol',
        ruleFormula: 'First Paragraph + Topic Sentences + Final Conclusion',
        ruleNote: 'Skim the introductory paragraph to grasp the subject, read first sentences of body paragraphs for structure, and read conclusion for author stance.'
      },
      {
        ruleTitle: 'Parallel Structure Rule',
        ruleFormula: 'A, B, and C must share identical grammatical form',
        ruleNote: 'Example: "The engineer is responsible for designing, testing, and deploying" (all gerunds), not "designing, testing, and to deploy".'
      },
      {
        ruleTitle: 'Subject-Verb Agreement with Intervening Phrases',
        ruleFormula: 'Ignore phrases between Subject and Verb (as well as, together with, along with)',
        ruleNote: '"The lead architect, along with three senior engineers, is attending" (Singular verb matches singular subject architect).'
      }
    ],
    checklist: [
      'Practice skimming 500-word editorial articles in under 90 seconds.',
      'Review top 10 subject-verb agreement rules with intervening clauses.',
      'Identify and correct parallel structure errors in compound sentences.',
      'Practice sentence rearrangement (Para Jumbles) using pronoun and transition clues.',
      'Study Latin and Greek root word families (bene, mal, chron, bio, spec, tele).',
      'Review professional email etiquette: subject line precision, greeting, and call to action.',
      'Complete 5 timed verbal ability sections (25 questions in 20 minutes).'
    ],
    zeroIndexLink: {
      available: false,
      label: 'The Readout Technical Monograph Series (Under Preparation)',
      sectionRoute: null
    }
  },
  {
    id: 'coding-preparation',
    title: 'Coding & Algorithmic Problem Solving',
    shortTitle: 'Coding Preparation',
    category: 'Technical Problem Solving',
    badge: 'Preparation Guide',
    accent: '#346C53',
    softAccent: '#E0EBDF',
    summary: 'Pattern-based algorithmic classification, clean coding hygiene, and complexity management for technical coding rounds.',
    overview: 'Rather than memorizing isolated solutions, technical interviews require mapping unseen problems onto proven algorithmic patterns, writing bug-free modular code, and explaining time/space trade-offs.',
    competencyTracks: [
      {
        trackName: 'Coding Fundamentals & Edge Cases',
        description: 'Handling null and empty inputs, single-element arrays, negative numbers, integer overflow (2^31 - 1 in C/Java), and precision limits in floating-point math.'
      },
      {
        trackName: 'Two-Pointer & Sliding Window Patterns',
        description: 'Sorted array pair search, palindrome verification, trapping water, fixed-size window maximums, and dynamic windows for longest valid substrings.'
      },
      {
        trackName: 'Binary Search Over Solution Spaces',
        description: 'Binary search on sorted arrays, finding lower and upper bounds, rotated sorted arrays, and binary search over monotonic answer spaces (capacity/allocation problems).'
      },
      {
        trackName: 'Hash Maps & Frequency Accelerators',
        description: 'O(1) lookups for Two-Sum pattern, frequency counts, grouping anagrams, prefix sums with hash map lookups for subarray sum problems.'
      },
      {
        trackName: 'Linked Lists & Fast/Slow Pointers',
        description: 'Floyds cycle detection, finding middle node, in-place list reversal, merging sorted lists, and dummy head pointers.'
      },
      {
        trackName: 'Trees, Graphs & Recursive Exploration',
        description: 'Binary Tree traversals (BFS level order, DFS pre/in/post order), Binary Search Tree validation, Graph adjacency lists, and connected components.'
      }
    ],
    formulasAndRules: [
      {
        ruleTitle: 'The 7-Step Live Coding Protocol',
        ruleFormula: 'Clarify -> Constraints -> Brute Force -> Optimize -> Dry Run -> Code -> Test',
        ruleNote: 'Never write code immediately. Ask clarifying questions on bounds, state a simple brute force solution first, discuss Big-O, dry-run an example, then code.'
      },
      {
        ruleTitle: 'Sliding Window Invariant Template',
        ruleFormula: 'Expand right pointer -> Validate condition -> Contract left pointer while invalid',
        ruleNote: 'Guarantees O(n) runtime since each element is visited at most twice (once by right, once by left).'
      },
      {
        ruleTitle: 'Time Complexity Estimation from Input Size (N)',
        ruleFormula: 'N <= 20: O(2^N) | N <= 10^3: O(N^2) | N <= 10^5: O(N log N) | N <= 10^7: O(N)',
        ruleNote: 'CP platforms execute ~10^8 basic operations per second. Use constraints to deduce required algorithmic efficiency.'
      }
    ],
    checklist: [
      'Implement Two Pointers pattern for sorted pair search and array reversal.',
      'Implement Sliding Window for max sum subarray of size K and longest unique substring.',
      'Implement Binary Search with correct midpoint calculation: mid = low + (high - low) / 2.',
      'Use Hash Maps to solve Subarray Sum Equals K using Prefix Sums in O(n).',
      'Implement Floyds cycle detection in a linked list using slow and fast pointers.',
      'Write recursive and iterative binary tree traversals (In-order, Pre-order, Post-order).',
      'Implement Graph BFS using a Queue and visited boolean array.',
      'Practice writing clean code on a blank whiteboard or editor without syntax highlighting.',
      'Solve 25 classic pattern problems across Arrays, Strings, Linked Lists, and Trees.'
    ],
    zeroIndexLink: {
      available: true,
      label: 'The Atlas: Programming Foundations Roadmap (Stage 05: Data Structures)',
      sectionRoute: 'atlas'
    }
  },
  {
    id: 'core-cs-knowledge',
    title: 'Core Computer Science Fundamentals',
    shortTitle: 'Core CS Subjects',
    category: 'Academic Theory',
    badge: 'Preparation Guide',
    accent: '#496D91',
    softAccent: '#E1EAF2',
    summary: 'The foundational computer science theory tested in technical interviews: Operating Systems, Databases, Computer Networks, and Object-Oriented Design.',
    overview: 'Campus technical interviews extensively test theoretical computer science foundations to verify whether candidates understand what happens beneath their code.',
    competencyTracks: [
      {
        trackName: 'Operating Systems & Concurrency',
        description: 'Processes vs Threads, PCB, CPU scheduling algorithms (SJF, Round Robin), Inter-Process Communication, Race conditions, Mutex vs Semaphore, 4 Deadlock conditions, Banker Algorithm, Virtual Memory, Paging, Page Faults, and Page Replacement (FIFO, LRU).'
      },
      {
        trackName: 'Database Management Systems & SQL',
        description: 'Relational Model, Primary/Candidate/Foreign keys, Normalization (1NF, 2NF, 3NF, BCNF), SQL Joins (Inner, Left, Right, Full), Group By and Having, Transactions and ACID guarantees, WAL (Write-Ahead Logging), and B-Tree Indexing.'
      },
      {
        trackName: 'Computer Networks & Internet Protocols',
        description: 'OSI 7-layer model vs TCP/IP 4-layer model, IPv4 addressing and CIDR subnet masks, TCP vs UDP differences, TCP 3-way handshake and 4-way connection termination, DNS resolution steps, HTTP vs HTTPS, and SSL/TLS handshake.'
      },
      {
        trackName: 'Object-Oriented Design & Clean Architecture',
        description: 'The 4 OOP Pillars (Encapsulation, Abstraction, Inheritance, Polymorphism), Overloading vs Overriding, Abstract Classes vs Interfaces, Composition over Inheritance, and the 5 SOLID design principles.'
      }
    ],
    formulasAndRules: [
      {
        ruleTitle: 'The 4 Necessary Deadlock Conditions (Coffman)',
        ruleFormula: 'Mutual Exclusion + Hold and Wait + No Preemption + Circular Wait',
        ruleNote: 'Deadlock can occur only if all 4 conditions hold simultaneously. Preventing deadlock requires breaking at least one condition.'
      },
      {
        ruleTitle: 'ACID Transaction Guarantees',
        ruleFormula: 'Atomicity (All-or-Nothing) + Consistency + Isolation + Durability',
        ruleNote: 'Guarantees that database transactions are processed reliably even during hardware power failures or concurrent execution.'
      },
      {
        ruleTitle: 'TCP 3-Way Handshake Connection Protocol',
        ruleFormula: 'Client: SYN -> Server: SYN-ACK -> Client: ACK (Established)',
        ruleNote: 'Ensures both client and server agree on initial sequence numbers and have working bidirectional communication channels.'
      }
    ],
    checklist: [
      'Explain difference between Process (isolated memory) and Thread (shared address space).',
      'Describe critical section problem and contrast Mutex (locking) with Semaphore (signaling).',
      'Trace virtual memory translation: Virtual Address -> Page Table -> Physical Frame.',
      'Write complex SQL queries using JOIN, GROUP BY, HAVING, and correlated subqueries.',
      'Explain normalization from unnormalized data up to Boyce-Codd Normal Form (BCNF).',
      'Trace TCP 3-way handshake and describe why TCP is reliable while UDP is connectionless.',
      'Walk through what happens in the network when you type https://google.com in a browser.',
      'Define all 5 SOLID principles with concrete code examples.',
      'Explain method overloading (compile-time) vs method overriding (runtime polymorphism).',
      'Review top 30 standard technical interview questions in OS, DBMS, and Networks.'
    ],
    zeroIndexLink: {
      available: true,
      label: 'Digital Logic Design · Unit 1: Foundations of Computer Hardware (Workbench)',
      sectionRoute: 'workspace/units/1.1'
    }
  },
  {
    id: 'resume-preparation',
    title: 'Technical Resume Architecture & Engineering Portfolio',
    shortTitle: 'Resume Preparation',
    category: 'Career Presentation',
    badge: 'Framework Guide',
    accent: '#B77B59',
    softAccent: '#F1E5D9',
    summary: 'Single-page engineering resume formatting, project impact deconstruction, and technical portfolio presentation.',
    overview: 'A technical resume serves as an engineering document, not an autobiography. Recruiters and technical leads review resumes in 15 to 30 seconds to evaluate relevant coursework, project scope, and technological competencies.',
    competencyTracks: [
      {
        trackName: 'Single-Page Engineering Format',
        description: 'Single-page limit for undergraduates, clean sans-serif typography, logical hierarchy: Header -> Education -> Technical Skills -> Projects -> Experience/Work -> Achievements.'
      },
      {
        trackName: 'Project Impact Deconstruction Formula',
        description: 'Every project bullet must follow: [Active Verb] + [Specific Framework/Tool] + [System Problem Solved] + [Quantifiable Result/Metric].'
      },
      {
        trackName: 'Technical Skills Categorization',
        description: 'Group skills cleanly into Languages, Frameworks & Libraries, Developer Tools & Systems, and Core Coursework. Never list subjective proficiency bars (e.g. 80% Python) or technologies you cannot code live.'
      },
      {
        trackName: 'GitHub Repository & Portfolio Hygiene',
        description: 'Every listed project must have a public repository with an informative README, architecture diagram, setup instructions, clean commit history, and a working deployed demo link.'
      }
    ],
    formulasAndRules: [
      {
        ruleTitle: 'The Action-Metric-Result Bullet Formula',
        ruleFormula: '[Active Verb] + [Tool / Architecture] + [Problem] + [Measurable Outcome]',
        ruleNote: 'Weak: "Made a website using React." | Strong: "Engineered responsive single-page web app in React 18, cutting client bundle size by 35% through modular code-splitting."'
      },
      {
        ruleTitle: 'The 30-Second Screening Rule',
        ruleFormula: 'Clarity > Decoration | Zero Rating Bars | PDF Format Only',
        ruleNote: 'Never include graphical star ratings or progress bars. Screening ATS parsers cannot read them, and interviewers view self-assessed percentages skeptically.'
      }
    ],
    checklist: [
      'Format resume to strictly fit on one single standard letter/A4 page.',
      'Ensure contact information includes GitHub, LinkedIn, email, phone, and portfolio URL.',
      'Rewrite all project bullets to start with strong past-tense action verbs (Architected, Engineered, Implemented).',
      'Include at least one quantifiable metric or scale estimate in every project description.',
      'Group technical skills into Languages, Databases, Tools, and Core Concepts.',
      'Verify that all listed projects have public GitHub repositories with clean READMEs.',
      'Proofread for spelling, formatting consistency, and export as clean selectable PDF.'
    ],
    zeroIndexLink: {
      available: false,
      label: 'Portfolio Architecture Guide (Under Preparation)',
      sectionRoute: null
    }
  },
  {
    id: 'technical-hr-interviews',
    title: 'Technical & HR Interview Mastery',
    shortTitle: 'Interview Mastery',
    category: 'Behavioral & Verbal',
    badge: 'Framework Guide',
    accent: '#765C90',
    softAccent: '#EBE5F0',
    summary: 'Frameworks for verbalizing problem-solving thought processes, discussing engineering trade-offs, and answering behavioral questions authentically.',
    overview: 'Interviews evaluate how you think, communicate under pressure, collaborate with teammates, and reflect on mistakes. Mastery requires structured storytelling and continuous dialogue.',
    competencyTracks: [
      {
        trackName: 'The STAR Behavioral Framework',
        description: 'Structuring answers to situational questions using Situation (context), Task (challenge), Action (your specific contribution), and Result (tangible outcome and lesson).'
      },
      {
        trackName: 'The Past-Present-Future Self Introduction',
        description: 'Answering "Tell me about yourself" in 90 seconds: Past (academic background and what drew you to CS), Present (recent projects and technical focus), Future (why this team and role).'
      },
      {
        trackName: 'Thinking Out Loud Protocol',
        description: 'Verbalizing thoughts continuously during live problem solving: sharing assumptions, writing simple examples, explaining trade-offs, and collaborating with interviewer hints.'
      },
      {
        trackName: 'Handling Behavioral & Conflict Questions',
        description: 'Answering "Tell me about a time you failed" or "Disagreement with a team member" with humility, objective problem focus, and demonstrated growth.'
      },
      {
        trackName: 'Thoughtful Questions for the Interviewer',
        description: 'Asking intelligent questions about engineering culture, deployment pipelines, team onboarding, and architectural challenges at the end of the round.'
      }
    ],
    formulasAndRules: [
      {
        ruleTitle: 'The STAR Behavioral Response Template',
        ruleFormula: 'Situation (20%) -> Task (15%) -> Action (50%) -> Result (15%)',
        ruleNote: 'Spend the majority of your time on Action (what YOU specifically did, choices you made, trade-offs evaluated) rather than setting up the backstory.'
      },
      {
        ruleTitle: 'The 90-Second Introduction Formula',
        ruleFormula: 'Past (30s) + Present (40s) + Future & Motivation (20s)',
        ruleNote: 'Keep it concise and tailored. Do not recite your entire resume chronologically; highlight the trajectory that brought you to this conversation.'
      }
    ],
    checklist: [
      'Prepare a crisp 90-second self-introduction using Past-Present-Future.',
      'Prepare 3 STAR stories: a challenging project bug, a team disagreement, and an unexpected failure with recovery.',
      'Practice thinking out loud: verbalizing steps before writing code.',
      'Formulate honest responses for technical gaps: "I have not worked directly with X, but based on my experience with Y, I would approach it by..."',
      'Prepare 3 thoughtful questions to ask the interviewer about their engineering practices.',
      'Test your webcam, microphone, lighting, and quiet room setup for virtual interview rounds.',
      'Conduct at least one peer mock interview with real-time feedback on pacing and composure.',
      'Review college placement guidelines, dress code, and interview day logistics.'
    ],
    zeroIndexLink: {
      available: false,
      label: 'Peer Mock Interview Framework (Under Preparation)',
      sectionRoute: null
    }
  }
];
