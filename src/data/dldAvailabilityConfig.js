/**
 * Centralized Academic Availability Configuration for Digital Logic Design (DLD)
 * Single source of truth for course completion, unit availability, and publication state.
 */

export const dldAvailabilityConfig = {
  courseCode: "1005261102",
  subjectTitle: "Digital Logic Design",
  regulation: "VR23 / Autonomous",
  subjectAvailabilityText: "Units I (Complete) and II (Sections 2.1 to 2.5) available. Additional units planned.",
  overallStatus: "Units I & II (Partial) Live",
  
  units: [
    {
      unitNumber: 1,
      roman: "UNIT I",
      title: "Number Systems & Binary Arithmetic",
      status: "available",
      label: "Available",
      sublabel: "Complete & Verified",
      totalSections: 7,
      completedSections: 7,
      isLive: true
    },
    {
      unitNumber: 2,
      roman: "UNIT II",
      title: "Boolean Algebra & Gate-Level Minimization",
      status: "partially-available",
      label: "Partially Available",
      sublabel: "Sections 2.1 to 2.5 Live (2.6 & 2.7 Planned)",
      totalSections: 7,
      completedSections: 5,
      isLive: true
    },
    {
      unitNumber: 3,
      roman: "UNIT III",
      title: "Combinational Logic Design",
      status: "planned",
      label: "Planned",
      sublabel: "Planned",
      totalSections: 7,
      completedSections: 0,
      isLive: false
    },
    {
      unitNumber: 4,
      roman: "UNIT IV",
      title: "Synchronous Sequential Logic & Flip-Flops",
      status: "planned",
      label: "Planned",
      sublabel: "Planned",
      totalSections: 6,
      completedSections: 0,
      isLive: false
    },
    {
      unitNumber: 5,
      roman: "UNIT V",
      title: "Registers, Counters & Memory Systems",
      status: "planned",
      label: "Planned",
      sublabel: "Planned",
      totalSections: 7,
      completedSections: 0,
      isLive: false
    }
  ],

  // Verified section metrics based strictly on authored curriculum
  getVerifiedCompletionStats() {
    const totalSections = this.units.reduce((sum, u) => sum + u.totalSections, 0);
    const completedSections = this.units.reduce((sum, u) => sum + u.completedSections, 0);
    return {
      totalSections,
      completedSections,
      summaryText: `${completedSections} of ${totalSections} syllabus sections verified`
    };
  }
};
