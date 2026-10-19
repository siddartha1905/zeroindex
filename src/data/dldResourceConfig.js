/**
 * Centralized Google Drive and Academic Resource Configuration for DLD
 * Single source of truth for Units 1 through 5 Study Materials and Standard Textbooks.
 *
 * Rules:
 * - When driveUrl is null or empty, UI elements render an informative, non-clickable card:
 *   "Google Drive Study Materials"
 *   "Material link will be added soon."
 * - When a verified Google Drive URL is provided by the faculty lead, the resource control
 *   automatically becomes an active, clickable link.
 */

export const dldResourceConfig = {
  units: {
    1: {
      unitNumber: 1,
      title: "Number Systems & Binary Arithmetic",
      resourceName: "Google Drive Study Materials",
      statusText: "Material link will be added soon.",
      driveUrl: null
    },
    2: {
      unitNumber: 2,
      title: "Boolean Algebra & Gate-Level Minimization",
      resourceName: "Google Drive Study Materials",
      statusText: "Material link will be added soon.",
      driveUrl: null
    },
    3: {
      unitNumber: 3,
      title: "Combinational Logic Design",
      resourceName: "Google Drive Study Materials",
      statusText: "Material link will be added soon.",
      driveUrl: null
    },
    4: {
      unitNumber: 4,
      title: "Synchronous Sequential Logic & Flip-Flops",
      resourceName: "Google Drive Study Materials",
      statusText: "Material link will be added soon.",
      driveUrl: null
    },
    5: {
      unitNumber: 5,
      title: "Registers, Counters & Memory Systems",
      resourceName: "Google Drive Study Materials",
      statusText: "Material link will be added soon.",
      driveUrl: null
    }
  },

  textbooks: [
    {
      id: "tb1",
      number: 1,
      title: "Digital Design",
      edition: "5th Edition",
      authors: "M. Morris Mano, Michael D. Ciletti",
      publisher: "Pearson (PEA)",
      description: "Primary prescribed textbook covering Boolean algebra, gate-level minimization, combinational logic design, synchronous sequential circuits, registers, and counters.",
      resourceName: "Google Drive Textbook Copy",
      statusText: "Material link will be added soon.",
      driveUrl: null
    },
    {
      id: "tb2",
      number: 2,
      title: "Fundamentals of Logic Design",
      edition: "5th Edition",
      authors: "Charles H. Roth Jr.",
      publisher: "Cengage Learning",
      description: "Rigorous treatment of digital systems, state machines, timing diagrams, flip-flop conversions, and sequential circuit synthesis.",
      resourceName: "Google Drive Textbook Copy",
      statusText: "Material link will be added soon.",
      driveUrl: null
    }
  ],

  referenceBooks: [
    {
      id: "rb1",
      number: 1,
      title: "Digital Logic and Computer Design",
      authors: "M. Morris Mano",
      publisher: "PEA",
      resourceName: "Google Drive Reference Copy",
      statusText: "Material link will be added soon.",
      driveUrl: null
    },
    {
      id: "rb2",
      number: 2,
      title: "Digital Logic Design",
      authors: "Leach, Malvino, Saha",
      publisher: "TMH",
      resourceName: "Google Drive Reference Copy",
      statusText: "Material link will be added soon.",
      driveUrl: null
    },
    {
      id: "rb3",
      number: 3,
      title: "Modern Digital Electronics",
      authors: "R.P. Jain",
      publisher: "TMH",
      resourceName: "Google Drive Reference Copy",
      statusText: "Material link will be added soon.",
      driveUrl: null
    }
  ]
};
