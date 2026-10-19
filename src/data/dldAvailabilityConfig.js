/**
 * Centralized Academic Availability Configuration for Digital Logic Design (DLD)
 * Single source of truth for course completion, unit availability, and publication state.
 */

export const dldAvailabilityConfig = {
  courseCode: "1005261102",
  subjectTitle: "Digital Logic Design",
  regulation: "VR23 / Autonomous",
  subjectAvailabilityText: "Unit 1 available. Additional units planned.",
  overallStatus: "Unit 1 Live",
  
  units: [
    {
      unitNumber: 1,
      roman: "UNIT I",
      title: "Number Systems & Binary Arithmetic",
      status: "available",
      label: "Available",
      sublabel: "Pending final academic review",
      totalSections: 7,
      completedSections: 7,
      isLive: true
    },
    {
      unitNumber: 2,
      roman: "UNIT II",
      title: "Boolean Algebra & Gate-Level Minimization",
      status: "in-development",
      label: "In Development",
      sublabel: "Complete & Verified (Preview Ready)",
      totalSections: 7,
      completedSections: 7,
      isLive: false
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
