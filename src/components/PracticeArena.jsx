import React, { useState } from 'react';
import { 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Award, 
  Sparkles, 
  BookOpen, 
  Filter, 
  Eye, 
  EyeOff 
} from 'lucide-react';
import { dldUnit1 } from '../data/dldUnit1';

export const PracticeArena = ({ onNavigate }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [revealedIds, setRevealedIds] = useState({ "p-1": true });

  const practiceQuestions = [
    {
      id: "p-1",
      topic: "1.3 Base Conversions",
      title: "Fractional Decimal to Binary & Hexadecimal",
      difficulty: "Medium",
      examBadge: "Fractional Conversion Method",
      question: "Convert (53.6875)₁₀ into its equivalent Binary and Hexadecimal representations showing complete division and multiplication steps.",
      solution: [
        "Step 1 (Integer part 53 to Binary): Successive division by 2.",
        "53 / 2 = 26 R 1",
        "26 / 2 = 13 R 0",
        "13 / 2 = 6 R 1",
        "6 / 2 = 3 R 0",
        "3 / 2 = 1 R 1",
        "1 / 2 = 0 R 1",
        "Reading remainders from bottom to top: (53)₁₀ = (110101)₂",
        "Step 2 (Fractional part 0.6875 to Binary): Successive multiplication by 2.",
        "0.6875 × 2 = 1.3750 (Int: 1)",
        "0.375 × 2 = 0.7500 (Int: 0)",
        "0.75 × 2 = 1.5000 (Int: 1)",
        "0.5 × 2 = 1.0000 (Int: 1, fraction is 0, stop!)",
        "Reading integers top to bottom: (0.6875)₁₀ = (0.1011)₂",
        "Combined Binary: (53.6875)₁₀ = (110101.1011)₂",
        "Step 3 (Binary to Hexadecimal direct grouping):",
        "Group integer into 4s from radix point left: 0011 0101 → (3 5)₁₆",
        "Group fraction into 4s from radix point right: 1011 → (B)₁₆",
        "Final Hexadecimal Answer: (35.B)₁₆"
      ]
    },
    {
      id: "p-2",
      topic: "1.4 Complements Subtraction",
      title: "Subtraction with Negative Result using 2's Complement",
      difficulty: "Hard",
      examBadge: "2's Complement Subtraction",
      question: "Perform the arithmetic subtraction (24)₁₀ - (56)₁₀ using 8-bit 2's complement binary arithmetic. Explain the significance of the end carry.",
      solution: [
        "Step 1: Convert (24)₁₀ to 8-bit binary:",
        "24 = 16 + 8 = (00011000)₂",
        "Step 2: Convert (56)₁₀ to 8-bit binary:",
        "56 = 32 + 16 + 8 = (00111000)₂",
        "Step 3: Compute 2's complement of (56)₁₀:",
        "1's complement of 00111000 = 11000111",
        "Add 1 = 11000111 + 1 = (11001000)₂",
        "Step 4: Add M + 2's complement of N:",
        "  00011000 (24)",
        "+ 11001000 (-56)",
        "----------",
        "  11100000",
        "Crucial Observation: No end carry is generated! In r's complement arithmetic, the absence of an end carry indicates the final answer is NEGATIVE and stored in 2's complement format.",
        "Step 5: Determine true magnitude by taking 2's complement of the sum (11100000):",
        "1's complement of 11100000 = 00011111",
        "Add 1 = 00011111 + 1 = (00100000)₂ = (32)₁₀",
        "Final Result: -(32)₁₀. Verification: 24 - 56 = -32. Verified!"
      ]
    },
    {
      id: "p-3",
      topic: "1.4 Decimal Complements",
      title: "Decimal Subtraction using 9's and 10's Complements",
      difficulty: "Medium",
      examBadge: "9's & 10's Complements",
      question: "Subtract (3250)₁₀ from (72532)₁₀ using: (a) 10's complement, (b) 9's complement.",
      solution: [
        "Let M = 72532 (5 digits), N = 03250 (padded to 5 digits).",
        "Part (a) using 10's complement:",
        "9's complement of N (03250) = 99999 - 03250 = 96749",
        "10's complement = 96749 + 1 = 96750",
        "Add M + 10's complement of N: 72532 + 96750 = 169282",
        "End carry of 1 is present → Discard end carry. Result = +69282.",
        "Part (b) using 9's complement:",
        "Add M + 9's complement of N: 72532 + 96749 = 169281",
        "End carry of 1 is present → Add end-around carry to LSB: 69281 + 1 = +69282."
      ]
    },
    {
      id: "p-4",
      topic: "1.5 Signed Overflow",
      title: "Overflow Detection in 8-bit 2's Complement",
      difficulty: "Hard",
      examBadge: "ALU Overflow Detection",
      question: "An 8-bit ALU performs the addition of two signed numbers: (+75) + (+80). Show whether arithmetic overflow occurs and analyze the carry-in and carry-out flags.",
      solution: [
        "In 8-bit 2's complement, the maximum representable positive integer is +127 (range: -128 to +127).",
        "Here (+75) + (+80) = +155, which exceeds +127! Hence overflow MUST occur.",
        "Step 1: Convert to 8-bit binary:",
        "+75 = (01001011)₂",
        "+80 = (01010000)₂",
        "Step 2: Add in binary:",
        "  01001011",
        "+ 01010000",
        "----------",
        "  10011011",
        "Analysis:",
        "1. Two positive inputs (MSBs = 0) produced a negative result (MSB = 1, which represents -101 in 2's complement).",
        "2. Carry into sign bit C_in = 1, Carry out of sign bit C_out = 0.",
        "3. Overflow Flag V = C_in ⊕ C_out = 1 ⊕ 0 = 1. Overflow condition confirmed!"
      ]
    }
  ];

  const toggleReveal = (id) => {
    setRevealedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredQuestions = selectedDifficulty === "All"
    ? practiceQuestions
    : practiceQuestions.filter(q => q.difficulty === selectedDifficulty);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-bold uppercase text-[#D97706] bg-[#FEF3C7] px-2.5 py-1 rounded-full">
              Practice Arena
            </span>
            <span className="text-xs text-[#64748B]">Concept-wise Solved Model Problems</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">
            Exam Models & Practice Problems
          </h1>
          <p className="text-sm text-[#475569] mt-1 max-w-2xl leading-relaxed">
            Curated foundational and advanced problems covering all core DLD concepts. Test your understanding with click-to-reveal solutions.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          {["All", "Medium", "Hard"].map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedDifficulty === diff
                  ? 'bg-[#2E6F40] text-white shadow-sm'
                  : 'bg-white border border-[#DCE7E1] text-[#64748B] hover:text-[#1E293B]'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.map((q) => {
          const isRevealed = revealedIds[q.id];

          return (
            <div
              key={q.id}
              className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4 transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#2E6F40] bg-[#F2F7F4] px-2.5 py-0.5 rounded">
                    {q.topic}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    q.difficulty === 'Hard' ? 'bg-[#FEE2E2] text-[#B91C1C]' : 'bg-[#FEF3C7] text-[#D97706]'
                  }`}>
                    {q.difficulty}
                  </span>
                </div>
                <span className="text-xs font-mono font-semibold text-[#64748B]">
                  {q.examBadge}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#1E293B] mb-2">{q.title}</h3>
                <p className="text-sm text-[#334155] leading-relaxed bg-[#FAF8F5] p-3.5 rounded-xl border border-[#DCE7E1] font-mono">
                  {q.question}
                </p>
              </div>

              {/* Reveal Solution Button */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => toggleReveal(q.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    isRevealed
                      ? 'bg-[#F2F7F4] text-[#2E6F40] border border-[#DCE7E1]'
                      : 'bg-[#2E6F40] text-white hover:bg-[#255A34]'
                  }`}
                >
                  {isRevealed ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Hide Step-by-Step Solution</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Click to Reveal Full Solution</span>
                    </>
                  )}
                </button>
                <span className="text-xs text-[#64748B] font-mono">ID: {q.id}</span>
              </div>

              {/* Solution Accordion */}
              {isRevealed && (
                <div className="mt-4 p-5 rounded-xl bg-[#1E293B] text-white font-mono text-xs space-y-2 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-2 border-b border-[#334155] text-[#38BDF8] font-bold">
                    <span>Model Solution & Marking Scheme</span>
                    <span className="text-[10px] uppercase text-[#94A3B8]">Verified</span>
                  </div>
                  <div className="space-y-1.5 pt-1 text-slate-300">
                    {q.solution.map((line, idx) => (
                      <div key={idx} className="leading-relaxed">
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default PracticeArena;
