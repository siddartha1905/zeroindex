import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Cpu, 
  ArrowRight,
  BookOpen,
  Sparkles,
  HelpCircle,
  Video,
  Clock,
  Layers,
  ShieldCheck,
  Eye,
  EyeOff
} from 'lucide-react';
import { 
  HardwareLogicDiagram, 
  ComplementBitGrid, 
  ComplementDecimalGrid,
  ComplementIntuitionCard,
  ClassroomFlowchart3Steps,
  SubtractionWhyCarryCard,
  StandardClassroomMethodGrid
} from './Section15Components';
import { section15Data } from '../data/dldSection15Data.js';

/**
 * Section 1.5: Complements (1's, 2's, 9's & 10's Complements)
 * Full 6-Tab View
 * Strict formatting: ZERO em-dashes and ZERO en-dashes.
 */
export const Section15View = ({ section = section15Data }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [subTab15A, setSubTab15A] = useState("decimal");
  const [subTab15B, setSubTab15B] = useState("9s");
  const [subTab15C, setSubTab15C] = useState("1s");
  const [activeMixedFilter, setActiveMixedFilter] = useState("all");
  const [revealedSolutions, setRevealedSolutions] = useState({});

  const toggleSolution = (id) => {
    setRevealedSolutions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const currentSection = section || section15Data;
  const mixedQuestions = currentSection?.mixedExamChallenge || [];
  const filteredMixedQuestions = mixedQuestions.filter(q => {
    if (activeMixedFilter === "all") return true;
    return q.difficulty.toLowerCase() === activeMixedFilter.toLowerCase();
  });

  return (
    <div className="space-y-8">
      {/* ===================================================================== */}
      {/* SECTION 1.5 TOP 6-TAB NAVIGATION BAR                                  */}
      {/* ===================================================================== */}
      <div className="p-4 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E6F40]">
            Complement Arithmetic Interactive Study Track
          </span>
          <span className="text-xs text-[#64748B]">Select a Module or Exam Arena:</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`p-2.5 rounded-xl text-xs font-mono font-bold transition-all text-center ${
              activeTab === "overview"
                ? 'bg-[#2E6F40] text-white shadow-sm'
                : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]'
            }`}
          >
            Overview &amp; Logic
          </button>
          <button
            onClick={() => setActiveTab("1.5A")}
            className={`p-2.5 rounded-xl text-xs font-mono font-bold transition-all text-center ${
              activeTab === "1.5A"
                ? 'bg-[#2E6F40] text-white shadow-sm'
                : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]'
            }`}
          >
            1.5A: Finding Complements
          </button>
          <button
            onClick={() => setActiveTab("1.5B")}
            className={`p-2.5 rounded-xl text-xs font-mono font-bold transition-all text-center ${
              activeTab === "1.5B"
                ? 'bg-[#2E6F40] text-white shadow-sm'
                : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]'
            }`}
          >
            1.5B: 9's &amp; 10's Sub
          </button>
          <button
            onClick={() => setActiveTab("1.5C")}
            className={`p-2.5 rounded-xl text-xs font-mono font-bold transition-all text-center ${
              activeTab === "1.5C"
                ? 'bg-[#2E6F40] text-white shadow-sm'
                : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]'
            }`}
          >
            1.5C: 1's &amp; 2's Sub
          </button>
          <button
            onClick={() => setActiveTab("cheatSheet")}
            className={`p-2.5 rounded-xl text-xs font-mono font-bold transition-all text-center ${
              activeTab === "cheatSheet"
                ? 'bg-[#2E6F40] text-white shadow-sm'
                : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]'
            }`}
          >
            Cheat Sheet
          </button>
          <button
            onClick={() => setActiveTab("mixedPractice")}
            className={`p-2.5 rounded-xl text-xs font-mono font-bold transition-all text-center ${
              activeTab === "mixedPractice"
                ? 'bg-[#2E6F40] text-white shadow-sm'
                : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]'
            }`}
          >
            Mixed Exam (15 Qs)
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: OVERVIEW & HARDWARE LOGIC                                      */}
      {/* ===================================================================== */}
      {activeTab === "overview" && section.overviewHardware && (
        <div className="space-y-6">
          {/* Hero Banner */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase text-[#4F46E5] bg-[#EEF2FF] px-2 py-0.5 rounded">
                Foundations
              </span>
              <h2 className="text-lg font-bold text-[#1E293B]">
                {section.overviewHardware.heroTitle}
              </h2>
            </div>
            <p className="text-xs text-[#475569] leading-relaxed">
              {section.overviewHardware.heroSubtitle}
            </p>
          </div>

          {/* "What is a Complement in Simple Words?" Visual Intuition Card */}
          <ComplementIntuitionCard intuitionData={section.overviewHardware.whatIsAComplement} />

          {/* Visual Silicon Hardware Logic Diagram */}
          <HardwareLogicDiagram />

          {/* Two Complement Families Side-by-Side Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {section.overviewHardware.complementFamilies.map((fam) => (
              <div key={fam.familyId} className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase text-[#2E6F40] bg-[#F2F7F4] px-2 py-0.5 rounded">
                      {fam.familyId === "diminished" ? "Family 1" : "Family 2"}
                    </span>
                    <h3 className="text-sm font-bold text-[#1E293B]">{fam.name}</h3>
                  </div>

                  <p className="text-xs text-[#475569] leading-relaxed">{fam.explanation}</p>

                  {/* Formula Box */}
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border-2 border-[#2E6F40]/30 space-y-2 font-mono text-center">
                    <div className="text-xs font-bold text-[#1E293B]">General Mathematical Formula:</div>
                    <div className="p-2.5 rounded-lg bg-white border border-[#DCE7E1] text-sm sm:text-base font-bold text-[#0F172A] shadow-2xs">
                      {fam.familyId === "diminished" ? (
                        <span>C<sub>r-1</sub>(N) = (r<sup>n</sup> - r<sup>-m</sup>) - N</span>
                      ) : (
                        <span>C<sub>r</sub>(N) = r<sup>n</sup> - N</span>
                      )}
                    </div>
                    {fam.relationFormula && (
                      <div className="text-xs font-bold text-[#4F46E5] pt-0.5">
                        Relation: C<sub>r</sub>(N) = [(r - 1)'s Complement] + 1 (at LSB)
                      </div>
                    )}
                    <div className="text-[10px] text-[#64748B]">{fam.parameters}</div>
                  </div>
                </div>

                {/* Sub-types */}
                <div className="space-y-2 pt-2 border-t border-[#DCE7E1]">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#64748B] block">
                    Concrete Digital Radix Realizations:
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {fam.members.map((m, mIdx) => (
                      <div key={mIdx} className="p-3 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] space-y-1 text-xs">
                        <span className="font-bold text-[#1E293B] block">{m.name}</span>
                        <div className="text-[#475569]">{m.rule}</div>
                        <div className="font-mono text-[11px] text-[#2E6F40] pt-0.5 font-semibold">
                          Example: {m.quickExample}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: 1.5A FINDING COMPLEMENTS                                       */}
      {/* ===================================================================== */}
      {activeTab === "1.5A" && section.findingComplements && (
        <div className="space-y-6">
          {/* Visual Intuition First: What is a Complement in Simple Words? */}
          <ComplementIntuitionCard intuitionData={section.overviewHardware?.whatIsAComplement} />

          {/* Inner 2-Tab Switcher */}
          <div className="flex border-b border-[#DCE7E1] gap-4">
            <button
              onClick={() => setSubTab15A("decimal")}
              className={`pb-2.5 text-xs font-mono font-bold transition-all relative ${
                subTab15A === "decimal"
                  ? "text-[#2E6F40] border-b-2 border-[#2E6F40]"
                  : "text-[#64748B] hover:text-[#1E293B]"
              }`}
            >
              Finding 9's &amp; 10's Complements (Decimal Base 10)
            </button>
            <button
              onClick={() => setSubTab15A("binary")}
              className={`pb-2.5 text-xs font-mono font-bold transition-all relative ${
                subTab15A === "binary"
                  ? "text-[#2E6F40] border-b-2 border-[#2E6F40]"
                  : "text-[#64748B] hover:text-[#1E293B]"
              }`}
            >
              Finding 1's &amp; 2's Complements (Binary Base 2)
            </button>
          </div>

          {/* SUB-TAB 1: DECIMAL 9's & 10's */}
          {subTab15A === "decimal" && (
            <div className="space-y-6">
              {/* Stage 1: Formal Mathematical Definition & Formula Box */}
              {section.findingComplements.decimal.threeStages?.stage1 && (
                <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-5 font-mono">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#DCE7E1]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D97706] flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#D97706]" />
                      Stage 1: Formal Mathematical Definition &amp; Formula
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FEF3C7] text-[#92400E] border border-[#FCD34D]">
                      Rigorous Mathematics
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Left Box: 9's Complement Formula */}
                    <div className="p-5 rounded-xl bg-[#FAF8F5] border-2 border-[#D97706]/30 space-y-3">
                      <div className="flex items-center justify-between pb-1 border-b border-[#DCE7E1]">
                        <span className="text-xs font-bold text-[#1E293B]">
                          9's Complement Formula (r - 1 Radix):
                        </span>
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]">
                          r = 10
                        </span>
                      </div>

                      {/* For an n-digit Integer */}
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-[#64748B] block">For an n-digit Integer:</span>
                        <div className="p-2.5 rounded-lg bg-white border border-[#DCE7E1] text-[#0F172A] font-mono text-sm sm:text-base font-bold shadow-2xs">
                          9's Complement = (10<sup>n</sup> - 1) - N
                        </div>
                      </div>

                      {/* General Formula with fraction */}
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-[#64748B] block">General Formula (with n integer &amp; m fraction digits):</span>
                        <div className="p-2.5 rounded-lg bg-white border border-[#DCE7E1] text-[#0F172A] font-mono text-xs sm:text-sm font-semibold shadow-2xs">
                          9's Complement = (10<sup>n</sup> - 10<sup>-m</sup>) - N
                        </div>
                      </div>

                      {/* Formula Example */}
                      <div className="p-2.5 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] text-xs">
                        <strong className="block text-[11px] mb-0.5">Formula Example:</strong>
                        <span>For N = 37 (n = 2): (10<sup>2</sup> - 1) - 37 = 99 - 37 = <strong className="font-black text-[#B45309]">62</strong></span>
                      </div>
                    </div>

                    {/* Right Box: 10's Complement Formula */}
                    <div className="p-5 rounded-xl bg-[#FAF8F5] border-2 border-[#4F46E5]/30 space-y-3">
                      <div className="flex items-center justify-between pb-1 border-b border-[#DCE7E1]">
                        <span className="text-xs font-bold text-[#1E293B]">
                          10's Complement Formula (r Radix):
                        </span>
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]">
                          r = 10
                        </span>
                      </div>

                      {/* For an n-digit Integer */}
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-[#64748B] block">For an n-digit Integer:</span>
                        <div className="p-2.5 rounded-lg bg-white border border-[#DCE7E1] text-[#0F172A] font-mono text-sm sm:text-base font-bold shadow-2xs">
                          10's Complement = 10<sup>n</sup> - N = (9's Complement) + 1
                        </div>
                      </div>

                      {/* General Formula with fraction */}
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-[#64748B] block">General Formula (with fraction):</span>
                        <div className="p-2.5 rounded-lg bg-white border border-[#DCE7E1] text-[#0F172A] font-mono text-xs sm:text-sm font-semibold shadow-2xs">
                          10's Complement = 10<sup>n</sup> - N = (9's Complement) + 10<sup>-m</sup>
                        </div>
                      </div>

                      {/* Formula Example */}
                      <div className="p-2.5 rounded-lg bg-[#EEF2FF] border border-[#C7D2FE] text-[#3730A3] text-xs">
                        <strong className="block text-[11px] mb-0.5">Formula Example:</strong>
                        <span>For N = 37 (n = 2): 10<sup>2</sup> - 37 = 100 - 37 = <strong className="font-black text-[#4338CA]">63</strong> (or 62 + 1 = <strong className="font-black text-[#4338CA]">63</strong>)</span>
                      </div>
                    </div>
                  </div>

                  {/* Compact Variable Legend Pill Strip */}
                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B] block">
                      Mathematical Variable Definitions:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
                      <div className="p-2 rounded-lg bg-white border border-[#DCE7E1] flex items-center gap-2 shadow-2xs">
                        <span className="px-2 py-0.5 rounded bg-[#EEF2FF] text-[#4F46E5] font-black border border-[#C7D2FE]">r</span>
                        <span className="text-[#334155]">Base / Radix (10 for Decimal)</span>
                      </div>
                      <div className="p-2 rounded-lg bg-white border border-[#DCE7E1] flex items-center gap-2 shadow-2xs">
                        <span className="px-2 py-0.5 rounded bg-[#DCFCE7] text-[#15803D] font-black border border-[#86EFAC]">n</span>
                        <span className="text-[#334155]">Integer Digits (left of point)</span>
                      </div>
                      <div className="p-2 rounded-lg bg-white border border-[#DCE7E1] flex items-center gap-2 shadow-2xs">
                        <span className="px-2 py-0.5 rounded bg-[#FEF3C7] text-[#92400E] font-black border border-[#FCD34D]">m</span>
                        <span className="text-[#334155]">Fractional Digits (right of point)</span>
                      </div>
                      <div className="p-2 rounded-lg bg-white border border-[#DCE7E1] flex items-center gap-2 shadow-2xs">
                        <span className="px-2 py-0.5 rounded bg-[#FAF8F5] text-[#1E293B] font-black border border-[#DCE7E1]">N</span>
                        <span className="text-[#334155]">Given Decimal Number</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Stage 2: The Standard Classroom Method (Normal Step-by-Step Method) Flowchart */}
              {section.findingComplements.decimal.threeStages?.stage2 && (
                <ClassroomFlowchart3Steps stageData={section.findingComplements.decimal.threeStages.stage2} />
              )}

              {/* Stage 3: The 2-Second Inspection Shortcut */}
              {section.findingComplements.decimal.threeStages?.stage3 && (
                <div className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-3 font-mono">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#DCE7E1]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#4F46E5]" />
                      {section.findingComplements.decimal.threeStages.stage3.title}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]">
                      Fast Verification
                    </span>
                  </div>

                  {section.findingComplements.decimal.threeStages.stage3.ruleSummary && (
                    <div className="p-3.5 rounded-xl bg-[#EEF2FF] border border-[#C7D2FE] space-y-1">
                      <span className="font-bold text-[#3730A3] text-xs block">The 9-9-9-10 Inspection Rule:</span>
                      <p className="text-xs text-[#4338CA] leading-relaxed">
                        {section.findingComplements.decimal.threeStages.stage3.ruleSummary}
                      </p>
                    </div>
                  )}

                  {section.findingComplements.decimal.threeStages.stage3.rules && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      {section.findingComplements.decimal.threeStages.stage3.rules.map((r, i) => (
                        <div key={i} className="p-3 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1">
                          <span className="font-bold text-[#1E293B] block">{r.name}:</span>
                          <p className="text-[11px] text-[#475569] leading-relaxed">{r.rule}</p>
                          <div className="text-[11px] text-[#2E6F40] font-semibold pt-1">
                            Mechanism: {r.example}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.findingComplements.decimal.threeStages.stage3.whyItWorks && (
                    <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1 text-xs text-[#334155]">
                      <span className="font-bold text-[#1E293B] block">Why the Shortcut Works Mathematically:</span>
                      <p className="leading-relaxed">{section.findingComplements.decimal.threeStages.stage3.whyItWorks}</p>
                    </div>
                  )}
                </div>
              )}

              {/* 4 Worked Models with StandardClassroomMethodGrid */}
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E6F40]">
                    Worked Engineering Models: 9's &amp; 10's Complements
                  </h4>
                  <span className="text-[10px] font-mono text-[#64748B]">Question &rarr; Normal Method &rarr; Shortcut &rarr; Proof</span>
                </div>

                {section.findingComplements.decimal.models.map((model) => (
                  <StandardClassroomMethodGrid key={model.id} modelType="decimal" model={model} />
                ))}
              </div>

              {/* Targeted Practice Set */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E6F40]">
                    Targeted Practice Set: Decimal Complements
                  </span>
                  <span className="text-[10px] font-mono text-[#64748B]">3 Graded Problems</span>
                </div>

                <div className="space-y-3">
                  {section.findingComplements.decimal.practiceQuestions.map((q) => (
                    <div key={q.id} className="p-4 rounded-xl bg-white border border-[#DCE7E1] space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-mono font-bold text-[#1E293B]">{q.question}</span>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FAF8F5] text-[#64748B] border border-[#DCE7E1]">
                            {q.difficulty}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]">
                            {q.conceptTag}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleSolution(q.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#2E6F40] hover:text-[#1F4A2B]"
                      >
                        {revealedSolutions[q.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        <span>{revealedSolutions[q.id] ? "Hide Solution" : "Reveal Graphical Solution"}</span>
                      </button>

                      {revealedSolutions[q.id] && (
                        <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2 font-mono text-xs">
                          <div className="text-[#1E293B]">
                            <strong className="text-[#2E6F40]">9's Comp: </strong> {q.solution.ninesStep}
                          </div>
                          <div className="text-[#1E293B]">
                            <strong className="text-[#4F46E5]">10's Comp: </strong> {q.solution.tensStep}
                          </div>
                          <div className="pt-2 border-t border-[#DCE7E1] flex items-center gap-2 text-[#166534]">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Verification: {q.solution.verification}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB 2: BINARY 1's & 2's */}
          {subTab15A === "binary" && (
            <div className="space-y-6">
              {/* Stage 1: Formal Mathematical Definition & Formula Box */}
              {section.findingComplements.binary.threeStages?.stage1 && (
                <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-5 font-mono">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#DCE7E1]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#15803D] flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#15803D]" />
                      Stage 1: Formal Mathematical Definition &amp; Formula
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#DCFCE7] text-[#15803D] border border-[#86EFAC]">
                      Rigorous Mathematics
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Left Box: 1's Complement Formula */}
                    <div className="p-5 rounded-xl bg-[#FAF8F5] border-2 border-[#15803D]/30 space-y-3">
                      <div className="flex items-center justify-between pb-1 border-b border-[#DCE7E1]">
                        <span className="text-xs font-bold text-[#1E293B]">
                          1's Complement Formula (r - 1 Radix):
                        </span>
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-[#DCFCE7] text-[#15803D] border border-[#86EFAC]">
                          r = 2
                        </span>
                      </div>

                      {/* For an n-bit Integer */}
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-[#64748B] block">For an n-bit Integer:</span>
                        <div className="p-2.5 rounded-lg bg-white border border-[#DCE7E1] text-[#0F172A] font-mono text-sm sm:text-base font-bold shadow-2xs">
                          1's Complement = (2<sup>n</sup> - 1) - N
                        </div>
                      </div>

                      {/* General Formula with fraction */}
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-[#64748B] block">General Formula (with n integer &amp; m fractional bits):</span>
                        <div className="p-2.5 rounded-lg bg-white border border-[#DCE7E1] text-[#0F172A] font-mono text-xs sm:text-sm font-semibold shadow-2xs">
                          1's Complement = (2<sup>n</sup> - 2<sup>-m</sup>) - N
                        </div>
                      </div>

                      {/* Formula Example */}
                      <div className="p-2.5 rounded-lg bg-[#DCFCE7] border border-[#86EFAC] text-[#14532D] text-xs">
                        <strong className="block text-[11px] mb-0.5">Formula Example:</strong>
                        <span>For N = (1010)<sub>2</sub> (n = 4, where 2<sup>4</sup> - 1 = 15<sub>10</sub> = 1111<sub>2</sub>): 1111<sub>2</sub> - 1010<sub>2</sub> = <strong className="font-black text-[#15803D]">(0101)<sub>2</sub></strong></span>
                      </div>
                    </div>

                    {/* Right Box: 2's Complement Formula */}
                    <div className="p-5 rounded-xl bg-[#FAF8F5] border-2 border-[#4F46E5]/30 space-y-3">
                      <div className="flex items-center justify-between pb-1 border-b border-[#DCE7E1]">
                        <span className="text-xs font-bold text-[#1E293B]">
                          2's Complement Formula (r Radix):
                        </span>
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]">
                          r = 2
                        </span>
                      </div>

                      {/* For an n-bit Integer */}
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-[#64748B] block">For an n-bit Integer:</span>
                        <div className="p-2.5 rounded-lg bg-white border border-[#DCE7E1] text-[#0F172A] font-mono text-sm sm:text-base font-bold shadow-2xs">
                          2's Complement = 2<sup>n</sup> - N = (1's Complement) + 1 (at LSB)
                        </div>
                      </div>

                      {/* General Formula with fraction */}
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-[#64748B] block">General Formula (with fraction):</span>
                        <div className="p-2.5 rounded-lg bg-white border border-[#DCE7E1] text-[#0F172A] font-mono text-xs sm:text-sm font-semibold shadow-2xs">
                          2's Complement = 2<sup>n</sup> - N = (1's Complement) + 2<sup>-m</sup>
                        </div>
                      </div>

                      {/* Formula Example */}
                      <div className="p-2.5 rounded-lg bg-[#EEF2FF] border border-[#C7D2FE] text-[#3730A3] text-xs">
                        <strong className="block text-[11px] mb-0.5">Formula Example:</strong>
                        <span>For N = (1010)<sub>2</sub> (n = 4): 0101<sub>2</sub> + 1 = <strong className="font-black text-[#4338CA]">(0110)<sub>2</sub></strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Compact Variable Legend Pill Strip */}
                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B] block">
                      Mathematical Variable Definitions:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
                      <div className="p-2 rounded-lg bg-white border border-[#DCE7E1] flex items-center gap-2 shadow-2xs">
                        <span className="px-2 py-0.5 rounded bg-[#DCFCE7] text-[#15803D] font-black border border-[#86EFAC]">r</span>
                        <span className="text-[#334155]">Base / Radix (2 for Binary)</span>
                      </div>
                      <div className="p-2 rounded-lg bg-white border border-[#DCE7E1] flex items-center gap-2 shadow-2xs">
                        <span className="px-2 py-0.5 rounded bg-[#DCFCE7] text-[#15803D] font-black border border-[#86EFAC]">n</span>
                        <span className="text-[#334155]">Integer Bits (left of point)</span>
                      </div>
                      <div className="p-2 rounded-lg bg-white border border-[#DCE7E1] flex items-center gap-2 shadow-2xs">
                        <span className="px-2 py-0.5 rounded bg-[#FEF3C7] text-[#92400E] font-black border border-[#FCD34D]">m</span>
                        <span className="text-[#334155]">Fractional Bits (right of point)</span>
                      </div>
                      <div className="p-2 rounded-lg bg-white border border-[#DCE7E1] flex items-center gap-2 shadow-2xs">
                        <span className="px-2 py-0.5 rounded bg-[#FAF8F5] text-[#1E293B] font-black border border-[#DCE7E1]">N</span>
                        <span className="text-[#334155]">Given Binary Number</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Stage 2: Standard Classroom Method Flowchart */}
              {section.findingComplements.binary.threeStages?.stage2 && (
                <ClassroomFlowchart3Steps stageData={section.findingComplements.binary.threeStages.stage2} />
              )}

              {/* Stage 3: The 2-Second Inspection Shortcut */}
              {section.findingComplements.binary.threeStages?.stage3 && (
                <div className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4 font-mono">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#DCE7E1]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#4F46E5]" />
                      {section.findingComplements.binary.threeStages.stage3.title}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]">
                      2-Second Scan Strip
                    </span>
                  </div>

                  {/* Scan Strip Visual Banner */}
                  <div className="p-4 rounded-xl bg-[#EEF2FF] border border-[#C7D2FE] space-y-2">
                    <span className="text-xs font-bold text-[#3730A3] flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 transform rotate-180" />
                      Right-to-Left Scan Mechanics (&larr; from LSB to MSB)
                    </span>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <div className="p-2 rounded-lg bg-white border border-[#C7D2FE] text-[#4338CA]">
                        <span className="font-bold">Bits to the Left: </span>
                        <span className="text-[#4F46E5] font-black">INVERT (0 &harr; 1)</span>
                      </div>
                      <span className="font-bold text-[#64748B]">&larr; Scan &larr;</span>
                      <div className="p-2 rounded-lg bg-[#DCFCE7] border border-[#86EFAC] text-[#15803D]">
                        <span className="font-bold">First 1 and Trailing 0s: </span>
                        <span className="font-black">KEEP UNCHANGED</span>
                      </div>
                    </div>
                  </div>

                  {/* Why the Shortcut Works */}
                  {section.findingComplements.binary.threeStages.stage3.whyItWorks && (
                    <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1.5 text-xs text-[#334155]">
                      <span className="font-bold text-[#1E293B] block">Why the Shortcut Works Mathematically:</span>
                      <p className="leading-relaxed">{section.findingComplements.binary.threeStages.stage3.whyItWorks}</p>
                    </div>
                  )}
                </div>
              )}

              {/* 4 Worked Models */}
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E6F40]">
                    Worked Engineering Models: 1's &amp; 2's Complements
                  </h4>
                  <span className="text-[10px] font-mono text-[#64748B]">Question &rarr; Normal Method &rarr; Shortcut &rarr; Proof</span>
                </div>

                {section.findingComplements.binary.models.map((model) => (
                  <React.Fragment key={model.id}>
                    {model.edgeCases ? (
                      <div className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4 font-mono">
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#DCE7E1]">
                          <span className="text-xs font-bold text-[#1E293B]">{model.label}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]">
                            {model.conceptTag}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-[#1E293B]">{model.question}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          {model.edgeCases.map((ec, ecIdx) => (
                            <div key={ecIdx} className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                              <span className="font-bold text-[#1E293B] block">{ec.name}</span>
                              <div className="text-[#64748B]">1's Comp: <strong className="text-[#1E293B]">{ec.ones}</strong></div>
                              <div className="text-[#64748B]">2's Comp: <strong className="text-[#2E6F40]">{ec.twos}</strong></div>
                              <p className="text-[11px] text-[#4F46E5] pt-1 border-t border-[#DCE7E1]">{ec.note}</p>
                            </div>
                          ))}
                        </div>
                        <div className="p-3.5 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center gap-2.5 shadow-2xs text-xs text-[#166534]">
                          <CheckCircle2 className="w-4 h-4 text-[#15803D] flex-shrink-0" />
                          <div>
                            <span className="font-bold mr-1.5">5-Second Base-10 Verification:</span>
                            <span>{model.verification.sumCheck}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <StandardClassroomMethodGrid modelType="binary" model={model} />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Targeted Practice Set */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E6F40]">
                    Targeted Practice Set: Binary Complements
                  </span>
                  <span className="text-[10px] font-mono text-[#64748B]">3 Graded Problems</span>
                </div>

                <div className="space-y-3">
                  {section.findingComplements.binary.practiceQuestions.map((q) => (
                    <div key={q.id} className="p-4 rounded-xl bg-white border border-[#DCE7E1] space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-mono font-bold text-[#1E293B]">{q.question}</span>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FAF8F5] text-[#64748B] border border-[#DCE7E1]">
                            {q.difficulty}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]">
                            {q.conceptTag}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleSolution(q.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#2E6F40] hover:text-[#1F4A2B]"
                      >
                        {revealedSolutions[q.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        <span>{revealedSolutions[q.id] ? "Hide Solution" : "Reveal Graphical Solution"}</span>
                      </button>

                      {revealedSolutions[q.id] && (
                        <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2 font-mono text-xs">
                          <div className="text-[#1E293B]">
                            <strong className="text-[#2E6F40]">1's Comp: </strong> {q.solution.onesStep}
                          </div>
                          <div className="text-[#1E293B]">
                            <strong className="text-[#4F46E5]">2's Comp: </strong> {q.solution.twosStep}
                          </div>
                          <div className="pt-2 border-t border-[#DCE7E1] flex items-center gap-2 text-[#166534]">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Verification: {q.solution.verification}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: 1.5B 9's & 10's COMPLEMENT SUBTRACTION                          */}
      {/* ===================================================================== */}
      {activeTab === "1.5B" && section.decimalSubtraction && (
        <div className="space-y-6">
          {/* Subtraction Theory: Why Carry Decides the Sign & 5 Classroom Steps */}
          <SubtractionWhyCarryCard
            theoryData={section.decimalSubtraction.subtractionTheory}
            algorithmSteps={section.decimalSubtraction.classroomAlgorithm5Steps}
          />

          {/* Inner 2-Tab Switcher */}
          <div className="flex border-b border-[#DCE7E1] gap-4">
            <button
              onClick={() => setSubTab15B("9s")}
              className={`pb-2.5 text-xs font-mono font-bold transition-all relative ${
                subTab15B === "9s"
                  ? "text-[#2E6F40] border-b-2 border-[#2E6F40]"
                  : "text-[#64748B] hover:text-[#1E293B]"
              }`}
            >
              Subtraction Using 9's Complement [End-Around Carry +1]
            </button>
            <button
              onClick={() => setSubTab15B("10s")}
              className={`pb-2.5 text-xs font-mono font-bold transition-all relative ${
                subTab15B === "10s"
                  ? "text-[#2E6F40] border-b-2 border-[#2E6F40]"
                  : "text-[#64748B] hover:text-[#1E293B]"
              }`}
            >
              Subtraction Using 10's Complement [Discard Carry]
            </button>
          </div>

          {/* Decision Flowchart SVG */}
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1E293B] block">
              Decision Flowchart: M - N Using 9's vs 10's Complement
            </span>
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 720 280" className="w-full min-w-[680px] max-w-[720px] mx-auto" style={{fontFamily: 'monospace'}}>
                <defs>
                  <marker id="arr15flow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="#64748B" />
                  </marker>
                </defs>
                {/* Step 1 */}
                <rect x="230" y="10" width="260" height="36" rx="6" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.5"/>
                <text x="360" y="26" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1E293B">Step 1: Equalize Digits in M and N</text>
                <text x="360" y="38" textAnchor="middle" fontSize="8.5" fill="#92400E">(Pad Amber leading zeros to shorter number)</text>
                <line x1="360" y1="46" x2="360" y2="66" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#arr15flow)"/>

                {/* Step 2 */}
                <rect x="210" y="66" width="300" height="36" rx="6" fill="#F2F7F4" stroke="#2E6F40" strokeWidth="1.5"/>
                <text x="360" y="82" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1E293B">Step 2: Compute S = M + Comp(N)</text>
                <text x="360" y="94" textAnchor="middle" fontSize="8.5" fill="#166534">9's: subtract from 9 | 10's: 9's comp + 1</text>
                <line x1="360" y1="102" x2="360" y2="122" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#arr15flow)"/>

                {/* Step 3 Diamond */}
                <polygon points="360,122 470,152 360,182 250,152" fill="#FAF8F5" stroke="#4F46E5" strokeWidth="1.5"/>
                <text x="360" y="147" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#4F46E5">End Carry</text>
                <text x="360" y="160" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#4F46E5">Generated?</text>

                {/* YES Branch */}
                <line x1="470" y1="152" x2="560" y2="152" stroke="#16A34A" strokeWidth="1.5" markerEnd="url(#arr15flow)"/>
                <text x="515" y="144" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#16A34A">YES (M &ge; N)</text>
                <rect x="560" y="120" width="150" height="64" rx="6" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1.5"/>
                <text x="635" y="138" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#15803D">POSITIVE (+)</text>
                <text x="635" y="152" textAnchor="middle" fontSize="8" fill="#166534">9's: Add EAC (+1) to LSB</text>
                <text x="635" y="165" textAnchor="middle" fontSize="8" fill="#166534">10's: Discard Carry</text>
                <text x="635" y="177" textAnchor="middle" fontSize="8" fill="#166534">Remaining = Final Answer</text>

                {/* NO Branch */}
                <line x1="360" y1="182" x2="360" y2="210" stroke="#DC2626" strokeWidth="1.5" markerEnd="url(#arr15flow)"/>
                <text x="370" y="200" fontSize="9" fontWeight="bold" fill="#DC2626">NO (M &lt; N)</text>
                <rect x="230" y="210" width="260" height="58" rx="6" fill="#FEF2F2" stroke="#DC2626" strokeWidth="1.5"/>
                <text x="360" y="228" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#DC2626">NEGATIVE (-)</text>
                <text x="360" y="242" textAnchor="middle" fontSize="8" fill="#991B1B">9's: Take 9's comp of sum, prefix '-'</text>
                <text x="360" y="255" textAnchor="middle" fontSize="8" fill="#991B1B">10's: Take 10's comp of sum, prefix '-'</text>
              </svg>
            </div>
          </div>

          {/* SUB-TAB 1: 9's COMPLEMENT */}
          {subTab15B === "9s" && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#86EFAC] flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#15803D]">
                  9's Complement Golden Rule: End-Around Carry (EAC) +1 Added to LSB
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white text-[#15803D] border border-[#86EFAC]">
                  EAC Active
                </span>
              </div>

              {/* 4 Models */}
              <div className="space-y-4">
                {section.decimalSubtraction.subtraction9s.models.map((model) => (
                  <div key={model.id} className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-3">
                    <span className="text-xs font-mono font-bold text-[#1E293B] block pb-1 border-b border-[#DCE7E1]">
                      {model.label}
                    </span>
                    <ComplementDecimalGrid modelType="9s" {...model} />
                  </div>
                ))}
              </div>

              {/* Targeted Practice Set */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E6F40] block pb-2 border-b border-[#DCE7E1]">
                  Targeted Practice Set: 9's Complement Subtraction
                </span>
                <div className="space-y-3">
                  {section.decimalSubtraction.subtraction9s.practiceQuestions.map((q) => (
                    <div key={q.id} className="p-4 rounded-xl bg-white border border-[#DCE7E1] space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-mono font-bold text-[#1E293B]">{q.question}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]">
                          {q.conceptTag}
                        </span>
                      </div>
                      <button
                        onClick={() => toggleSolution(q.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#2E6F40] hover:text-[#1F4A2B]"
                      >
                        {revealedSolutions[q.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        <span>{revealedSolutions[q.id] ? "Hide Solution" : "Reveal Step-by-Step Solution"}</span>
                      </button>
                      {revealedSolutions[q.id] && (
                        <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1.5 font-mono text-xs">
                          {q.solution.steps.map((st, i) => (
                            <div key={i} className="text-[#334155]">{st}</div>
                          ))}
                          <div className="pt-2 border-t border-[#DCE7E1] flex items-center justify-between font-bold">
                            <span className="text-[#2E6F40]">Final Result: {q.solution.final}</span>
                            <span className="text-[#15803D]">Verification: {q.solution.verification}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB 2: 10's COMPLEMENT */}
          {subTab15B === "10s" && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-[#EEF2FF] border border-[#C7D2FE] flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#3730A3]">
                  10's Complement Golden Rule: Discard Carry (Result is Positive Directly)
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white text-[#4338CA] border border-[#C7D2FE]">
                  Discard Carry
                </span>
              </div>

              {/* 4 Models */}
              <div className="space-y-4">
                {section.decimalSubtraction.subtraction10s.models.map((model) => (
                  <div key={model.id} className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-3">
                    <span className="text-xs font-mono font-bold text-[#1E293B] block pb-1 border-b border-[#DCE7E1]">
                      {model.label}
                    </span>
                    <ComplementDecimalGrid modelType="10s" {...model} />
                  </div>
                ))}
              </div>

              {/* Targeted Practice Set */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E6F40] block pb-2 border-b border-[#DCE7E1]">
                  Targeted Practice Set: 10's Complement Subtraction
                </span>
                <div className="space-y-3">
                  {section.decimalSubtraction.subtraction10s.practiceQuestions.map((q) => (
                    <div key={q.id} className="p-4 rounded-xl bg-white border border-[#DCE7E1] space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-mono font-bold text-[#1E293B]">{q.question}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]">
                          {q.conceptTag}
                        </span>
                      </div>
                      <button
                        onClick={() => toggleSolution(q.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#2E6F40] hover:text-[#1F4A2B]"
                      >
                        {revealedSolutions[q.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        <span>{revealedSolutions[q.id] ? "Hide Solution" : "Reveal Step-by-Step Solution"}</span>
                      </button>
                      {revealedSolutions[q.id] && (
                        <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1.5 font-mono text-xs">
                          {q.solution.steps.map((st, i) => (
                            <div key={i} className="text-[#334155]">{st}</div>
                          ))}
                          <div className="pt-2 border-t border-[#DCE7E1] flex items-center justify-between font-bold">
                            <span className="text-[#2E6F40]">Final Result: {q.solution.final}</span>
                            <span className="text-[#15803D]">Verification: {q.solution.verification}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 4: 1.5C 1's & 2's COMPLEMENT SUBTRACTION (HIGH WEIGHTAGE)          */}
      {/* ===================================================================== */}
      {activeTab === "1.5C" && section.binarySubtraction && (
        <div className="space-y-6">
          {/* Subtraction Theory: Why Carry Decides the Sign & 5 Classroom Steps */}
          <SubtractionWhyCarryCard
            theoryData={section.binarySubtraction.subtractionTheory}
            algorithmSteps={section.binarySubtraction.classroomAlgorithm5Steps}
          />

          {/* Inner 2-Tab Switcher */}
          <div className="flex border-b border-[#DCE7E1] gap-4">
            <button
              onClick={() => setSubTab15C("1s")}
              className={`pb-2.5 text-xs font-mono font-bold transition-all relative ${
                subTab15C === "1s"
                  ? "text-[#2E6F40] border-b-2 border-[#2E6F40]"
                  : "text-[#64748B] hover:text-[#1E293B]"
              }`}
            >
              Binary Subtraction Using 1's Complement [EAC: Add Carry +1 to LSB]
            </button>
            <button
              onClick={() => setSubTab15C("2s")}
              className={`pb-2.5 text-xs font-mono font-bold transition-all relative ${
                subTab15C === "2s"
                  ? "text-[#2E6F40] border-b-2 border-[#2E6F40]"
                  : "text-[#64748B] hover:text-[#1E293B]"
              }`}
            >
              Binary Subtraction Using 2's Complement [Discard Extra Carry]
            </button>
          </div>

          {/* SUB-TAB 1: 1's COMPLEMENT SUBTRACTION */}
          {subTab15C === "1s" && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#86EFAC] flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#15803D]">
                  1's Complement Rule: {section.binarySubtraction.subtraction1s.ruleSummary}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white text-[#15803D] border border-[#86EFAC]">
                  {section.binarySubtraction.subtraction1s.ruleBadge}
                </span>
              </div>

              {/* 5 Models */}
              <div className="space-y-4">
                {section.binarySubtraction.subtraction1s.models.map((model) => (
                  <div key={model.id} className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-3">
                    <span className="text-xs font-mono font-bold text-[#1E293B] block pb-1 border-b border-[#DCE7E1]">
                      {model.label}
                    </span>
                    <ComplementBitGrid modelType="1s" {...model} />
                  </div>
                ))}
              </div>

              {/* Targeted Practice Set */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E6F40] block pb-2 border-b border-[#DCE7E1]">
                  Targeted Practice Set: 1's Complement Subtraction
                </span>
                <div className="space-y-3">
                  {section.binarySubtraction.subtraction1s.practiceQuestions.map((q) => (
                    <div key={q.id} className="p-4 rounded-xl bg-white border border-[#DCE7E1] space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-mono font-bold text-[#1E293B]">{q.question}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]">
                          {q.conceptTag}
                        </span>
                      </div>
                      <button
                        onClick={() => toggleSolution(q.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#2E6F40] hover:text-[#1F4A2B]"
                      >
                        {revealedSolutions[q.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        <span>{revealedSolutions[q.id] ? "Hide Solution" : "Reveal Step-by-Step Solution"}</span>
                      </button>
                      {revealedSolutions[q.id] && (
                        <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1.5 font-mono text-xs">
                          {q.solution.steps.map((st, i) => (
                            <div key={i} className="text-[#334155]">{st}</div>
                          ))}
                          <div className="pt-2 border-t border-[#DCE7E1] flex items-center justify-between font-bold">
                            <span className="text-[#2E6F40]">Final Result: {q.solution.final}</span>
                            <span className="text-[#15803D]">Verification: {q.solution.verification}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB 2: 2's COMPLEMENT SUBTRACTION */}
          {subTab15C === "2s" && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-[#EEF2FF] border border-[#C7D2FE] flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#3730A3]">
                  2's Complement Rule: {section.binarySubtraction.subtraction2s.ruleSummary}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white text-[#4338CA] border border-[#C7D2FE]">
                  {section.binarySubtraction.subtraction2s.ruleBadge}
                </span>
              </div>

              {/* 5 Models */}
              <div className="space-y-4">
                {section.binarySubtraction.subtraction2s.models.map((model) => (
                  <div key={model.id} className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-3">
                    <span className="text-xs font-mono font-bold text-[#1E293B] block pb-1 border-b border-[#DCE7E1]">
                      {model.label}
                    </span>
                    <ComplementBitGrid modelType="2s" {...model} />
                  </div>
                ))}
              </div>

              {/* Targeted Practice Set */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E6F40] block pb-2 border-b border-[#DCE7E1]">
                  Targeted Practice Set: 2's Complement Subtraction
                </span>
                <div className="space-y-3">
                  {section.binarySubtraction.subtraction2s.practiceQuestions.map((q) => (
                    <div key={q.id} className="p-4 rounded-xl bg-white border border-[#DCE7E1] space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-mono font-bold text-[#1E293B]">{q.question}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]">
                          {q.conceptTag}
                        </span>
                      </div>
                      <button
                        onClick={() => toggleSolution(q.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#2E6F40] hover:text-[#1F4A2B]"
                      >
                        {revealedSolutions[q.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        <span>{revealedSolutions[q.id] ? "Hide Solution" : "Reveal Step-by-Step Solution"}</span>
                      </button>
                      {revealedSolutions[q.id] && (
                        <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1.5 font-mono text-xs">
                          {q.solution.steps.map((st, i) => (
                            <div key={i} className="text-[#334155]">{st}</div>
                          ))}
                          <div className="pt-2 border-t border-[#DCE7E1] flex items-center justify-between font-bold">
                            <span className="text-[#2E6F40]">Final Result: {q.solution.final}</span>
                            <span className="text-[#15803D]">Verification: {q.solution.verification}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 5: CHEAT SHEET (EXCLUSIVE RULES & SPEED SHORTCUTS)                 */}
      {/* ===================================================================== */}
      {activeTab === "cheatSheet" && section.cheatSheet && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase text-[#2E6F40] bg-[#F2F7F4] px-2 py-0.5 rounded">
                Master Reference
              </span>
              <h2 className="text-lg font-bold text-[#1E293B]">
                {section.cheatSheet.heroTitle}
              </h2>
            </div>
            <p className="text-xs text-[#475569] leading-relaxed">
              {section.cheatSheet.heroSubtitle}
            </p>
          </div>

          {/* 1. The Ultimate 2x2 Complement Decision Matrix Table */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1E293B] block">
              1. The Ultimate 2x2 Complement Decision Matrix
            </span>

            <div className="overflow-x-auto border border-[#DCE7E1] rounded-xl">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-[#FAF8F5] border-b border-[#DCE7E1] font-mono">
                    <th className="py-3 px-4 font-bold text-[#1E293B]">Family &amp; Types</th>
                    <th className="py-3 px-4 font-bold text-[#4F46E5]">How to Find Quickly</th>
                    <th className="py-3 px-4 font-bold text-[#15803D]">When Carry = 1 (M &ge; N, Positive)</th>
                    <th className="py-3 px-4 font-bold text-[#DC2626]">When Carry = 0 (M &lt; N, Negative)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2F7F4] font-mono text-[11px]">
                  {section.cheatSheet.decisionMatrix.map((dm, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF8F5]/60">
                      <td className="py-3 px-4 font-bold text-[#1E293B]">
                        <div>{dm.complementFamily}</div>
                        <div className="text-[10px] text-[#64748B] font-normal">{dm.types}</div>
                      </td>
                      <td className="py-3 px-4 text-[#475569]">{dm.howToFind}</td>
                      <td className="py-3 px-4 text-[#15803D] font-medium bg-[#F0FDF4]/50">{dm.whenCarryOne}</td>
                      <td className="py-3 px-4 text-[#DC2626] font-medium bg-[#FEF2F2]/50">{dm.whenCarryZero}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. 4 Exclusive 5-Second Exam Speed Shortcuts */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E6F40] block">
              2. 4 Exclusive 5-Second Exam Speed Shortcuts
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.cheatSheet.speedShortcuts.map((sc) => (
                <div key={sc.id} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between pb-1 border-b border-[#DCE7E1]">
                    <span className="font-bold text-[#1E293B]">{sc.title}</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]">
                      {sc.badge}
                    </span>
                  </div>
                  <div className="text-[#2E6F40] font-bold text-[11px]">{sc.timeSaved}</div>
                  <p className="text-[#475569]">{sc.rule}</p>
                  <div className="p-2.5 rounded-lg bg-white border border-[#DCE7E1] text-[11px] text-[#1E293B]">
                    <span className="font-bold text-[#4F46E5]">Exam Walkthrough: </span>
                    <span>{sc.example}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Top 5 Exam Mistakes to Avoid */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#DC2626] block">
              3. Top 5 Exam Mistakes to Avoid in Complement Subtraction
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {section.cheatSheet.topMistakes.map((tm) => (
                <div key={tm.id} className="p-4 rounded-xl bg-[#FEF2F2]/60 border border-[#FECACA] space-y-2 font-mono text-xs">
                  <span className="font-bold text-[#DC2626] block">{tm.mistake}</span>
                  <div className="text-[#991B1B] text-[11px]">
                    <strong>Consequence: </strong>{tm.consequence}
                  </div>
                  <div className="p-2 rounded bg-white border border-[#FECACA] text-[#15803D] text-[11px] font-semibold">
                    <strong>Rule: </strong>{tm.fix}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preserved Direct YouTube Resource */}
          {section.youtubeResource && (
            <div className="p-4 rounded-xl bg-white border border-[#DCE7E1] flex flex-wrap items-center justify-between gap-3 shadow-2xs font-mono text-xs">
              <div className="flex items-center gap-2.5">
                <Video className="w-4 h-4 text-[#DC2626]" />
                <div>
                  <span className="font-bold text-[#1E293B] block">{section.youtubeResource.title}</span>
                  <span className="text-[#64748B] text-[11px]">Channel: {section.youtubeResource.channel} • Duration: {section.youtubeResource.duration}</span>
                </div>
              </div>
              <a
                href={section.youtubeResource.url}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] text-[#2E6F40] font-bold border border-[#DCE7E1] hover:bg-[#F2F7F4] transition-all"
              >
                Watch on YouTube &rarr;
              </a>
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 6: MIXED EXAM CHALLENGE (15 QUESTIONS)                            */}
      {/* ===================================================================== */}
      {activeTab === "mixedPractice" && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase text-[#4F46E5] bg-[#EEF2FF] px-2 py-0.5 rounded">
                    Exam Arena
                  </span>
                  <h2 className="text-lg font-bold text-[#1E293B]">
                    Mixed Complement Exam Challenge ({mixedQuestions.length} Questions)
                  </h2>
                </div>
                <p className="text-xs text-[#64748B] mt-1">
                  15 verified exam-level problems across all complement methods, radixes, fractional numbers, and edge cases.
                </p>
              </div>

              {/* Difficulty Filter */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] text-xs font-mono">
                {["all", "Easy", "Medium", "Hard"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveMixedFilter(f)}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      activeMixedFilter.toLowerCase() === f.toLowerCase()
                        ? "bg-[#2E6F40] text-white shadow-2xs"
                        : "text-[#64748B] hover:text-[#1E293B]"
                    }`}
                  >
                    {f === "all" ? `All (${mixedQuestions.length})` : f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 15 Questions List */}
          <div className="space-y-4">
            {filteredMixedQuestions.map((q, idx) => (
              <div key={q.id} className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#DCE7E1]">
                  <span className="text-xs font-mono font-bold text-[#1E293B]">
                    Problem #{idx + 1}: {q.question}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      q.difficulty === "Easy" ? "bg-[#DCFCE7] text-[#15803D]" :
                      q.difficulty === "Medium" ? "bg-[#FEF3C7] text-[#92400E]" :
                      "bg-[#FEE2E2] text-[#991B1B]"
                    }`}>
                      {q.difficulty}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]">
                      {q.conceptTag}
                    </span>
                  </div>
                </div>

                {/* Options List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
                  {q.options.map((opt, oIdx) => (
                    <div
                      key={oIdx}
                      className={`p-3 rounded-xl border flex items-center gap-2 ${
                        revealedSolutions[q.id] && opt === q.correctAnswer
                          ? "bg-[#DCFCE7] border-[#86EFAC] text-[#15803D] font-bold"
                          : "bg-[#FAF8F5] border-[#DCE7E1] text-[#334155]"
                      }`}
                    >
                      <span className="w-5 h-5 rounded-md bg-white border border-[#DCE7E1] flex items-center justify-center text-[10px] font-bold">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  ))}
                </div>

                {/* Reveal Solution Button */}
                <div className="pt-1 flex items-center justify-between">
                  <button
                    onClick={() => toggleSolution(q.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#2E6F40] hover:text-[#1F4A2B]"
                  >
                    {revealedSolutions[q.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{revealedSolutions[q.id] ? "Hide Solution" : "Reveal Complete Solution & Verification"}</span>
                  </button>
                  {revealedSolutions[q.id] && (
                    <span className="text-xs font-mono font-bold text-[#15803D]">
                      Correct Answer: {q.correctAnswer}
                    </span>
                  )}
                </div>

                {/* Solution Box */}
                {revealedSolutions[q.id] && (
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2 font-mono text-xs">
                    <span className="text-[11px] font-bold text-[#1E293B] block">Step-by-Step Derivation:</span>
                    <ul className="space-y-1">
                      {q.solution.steps.map((st, sIdx) => (
                        <li key={sIdx} className="text-[#475569] flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] mt-1.5 flex-shrink-0" />
                          <span>{st}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-2.5 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] flex items-center gap-2 text-[#15803D] font-bold mt-2">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      <span>5-Second Verification: {q.solution.verification}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
