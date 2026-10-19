import React, { useState } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Zap, 
  Layers, 
  AlertTriangle, 
  ArrowRight,
  ShieldCheck,
  Cpu,
  Clock,
  Sparkles,
  Calculator
} from 'lucide-react';
import BooleanLawsCheatSheet from './BooleanLawsCheatSheet';

/**
 * Section 2.2 View: Simplification of Boolean Expressions Using Algebraic Laws
 * Strictly zero em-dashes and zero en-dashes throughout.
 */

export const Section22View = ({ section }) => {
  const [revealedSolutions, setRevealedSolutions] = useState({});
  const [showCheatSheet, setShowCheatSheet] = useState(false);
  const [filterDifficulty, setFilterDifficulty] = useState('All');

  const toggleSolution = (id) => {
    setRevealedSolutions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (!section) return null;

  const filteredModels = filterDifficulty === 'All'
    ? section.workedModels
    : section.workedModels.filter(m => m.difficulty === filterDifficulty);

  return (
    <div className="space-y-8 text-left">
      {/* 1. Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-[#EBF3ED] text-[#285C49] border border-[#285C49]/20">
              Section {section.number}
            </span>
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
              {section.badge}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#5F6C64]">
            <Clock className="w-3.5 h-3.5" />
            <span>{section.estimatedReadTime}</span>
          </div>
        </div>

        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#293B32] leading-tight">
            {section.title}
          </h1>
          <p className="text-sm text-[#5F6C64] mt-2 leading-relaxed font-normal">
            {section.overview}
          </p>
        </div>

        {/* Data Science Callout */}
        <div className="p-4 rounded-xl bg-[#F4F7F4] border border-[#DCE7E1] flex items-start gap-3">
          <div className="p-2 rounded-lg bg-[#285C49] text-white flex-shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#285C49]">
              Data Science and Query Optimization Context
            </h4>
            <p className="text-xs text-[#293B32]/90 leading-relaxed font-normal">
              {section.dataScienceConnection}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Learning Outcomes */}
      <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-[#F2F7F4]">
          <CheckCircle2 className="w-4 h-4 text-[#2E6F40]" />
          <h3 className="font-editorial text-lg font-bold text-[#1E293B]">Explicit Learning Outcomes</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-[#475569]">
          {section.learningOutcomes?.map((outcome, idx) => (
            <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-[#FAF8F5]">
              <span className="font-mono text-[10px] font-bold text-[#2E6F40] mt-0.5">0{idx + 1}.</span>
              <span>{outcome}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Core Theorems Table & Quick Launcher */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#2E6F40]" />
            <h2 className="font-editorial text-xl font-bold text-[#1E293B]">
              1. Essential Boolean Reduction Theorems
            </h2>
          </div>
          <button
            onClick={() => setShowCheatSheet(!showCheatSheet)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DCE7E1] bg-[#FAF8F5] hover:bg-[#F2F7F4] text-xs font-semibold text-[#2E6F40] transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{showCheatSheet ? 'Hide Cheat Sheet' : 'Open Comprehensive Cheat Sheet'}</span>
          </button>
        </div>

        {showCheatSheet && (
          <BooleanLawsCheatSheet onClose={() => setShowCheatSheet(false)} />
        )}

        <div className="overflow-x-auto rounded-2xl border border-[#DCE7E1] bg-white shadow-2xs">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#DCE7E1] text-[#64748B]">
                <th className="p-3 font-bold">Theorem / Law</th>
                <th className="p-3 font-bold text-[#2E6F40]">OR Form (+)</th>
                <th className="p-3 font-bold text-[#4F46E5]">AND Form (·)</th>
                <th className="p-3 font-bold text-[#1E293B] font-sans">Hardware Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2F7F4]">
              {section.coreTheoremsList?.map((t, idx) => (
                <tr key={idx} className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="p-3 font-bold text-[#1E293B]">{t.name}</td>
                  <td className="p-3 text-[#2E6F40] font-semibold">{t.lawA}</td>
                  <td className="p-3 text-[#4F46E5] font-semibold">{t.lawB}</td>
                  <td className="p-3 text-[#64748B] font-sans text-[11px]">{t.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Progressive Worked Models */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#DCE7E1]">
          <div>
            <h2 className="font-editorial text-xl font-bold text-[#1E293B]">
              2. Progressive Step-by-Step Worked Models
            </h2>
            <p className="text-xs text-[#64748B]">
              15 university-level reduction problems with explicit law justification at every step.
            </p>
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-1.5 bg-[#FAF8F5] p-1 rounded-xl border border-[#DCE7E1]">
            {['All', 'Basic', 'Intermediate', 'Advanced'].map(diff => (
              <button
                key={diff}
                onClick={() => setFilterDifficulty(diff)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  filterDifficulty === diff
                    ? 'bg-white text-[#2E6F40] shadow-xs'
                    : 'text-[#64748B] hover:text-[#1E293B]'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredModels.map((wm) => (
            <div
              key={wm.id}
              className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#FAF8F5] text-[#2E6F40] border border-[#DCE7E1]">
                    {wm.id}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    wm.difficulty === 'Basic'
                      ? 'bg-[#EBF3ED] text-[#2E6F40]'
                      : wm.difficulty === 'Intermediate'
                      ? 'bg-[#FEF3C7] text-[#92400E]'
                      : 'bg-[#FEE2E2] text-[#DC2626]'
                  }`}>
                    {wm.difficulty}
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-[#2E6F40]">
                  Result: {wm.finalResult}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold font-mono text-[#1E293B]">
                  {wm.target}
                </h4>
              </div>

              {/* Numbered Derivation Steps */}
              <div className="space-y-2 border-t border-b border-[#F2F7F4] py-3">
                {wm.solutionSteps.map((step) => (
                  <div key={step.step} className="grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs">
                    <div className="sm:col-span-1 font-mono font-bold text-[#64748B]">
                      Step {step.step}:
                    </div>
                    <div className="sm:col-span-5 font-mono font-semibold text-[#1E293B] bg-[#FAF8F5] p-1.5 rounded-lg border border-[#DCE7E1]">
                      {step.expr}
                    </div>
                    <div className="sm:col-span-6 text-[11px] text-[#475569] flex items-center gap-1.5">
                      <span className="font-bold text-[#2E6F40] font-mono">[{step.rule}]</span>
                      <span>{step.reason}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Verification Note */}
              <div className="p-3 rounded-xl bg-[#F2F7F4] border border-[#DCE7E1] text-[11px] text-[#64748B]">
                <span className="font-bold text-[#2E6F40]">Verification & Hardware Insight: </span>
                {wm.verificationNote}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Exam Traps */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#DCE7E1]">
          <AlertTriangle className="w-4 h-4 text-[#D97706]" />
          <h2 className="font-editorial text-xl font-bold text-[#1E293B]">
            3. Common Examination Pitfalls
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {section.examTraps?.map((trap, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] space-y-1.5">
              <h4 className="text-xs font-bold text-[#92400E]">Trap {idx + 1}: {trap.trap}</h4>
              <p className="text-xs text-[#78350F] leading-relaxed font-normal">{trap.explanation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Practice Exercises */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#DCE7E1]">
          <ShieldCheck className="w-4 h-4 text-[#2E6F40]" />
          <h2 className="font-editorial text-xl font-bold text-[#1E293B]">
            4. Self-Test Practice Exercises
          </h2>
        </div>

        <div className="space-y-3">
          {section.practiceExercises?.map((pe) => {
            const isRevealed = revealedSolutions[pe.id];
            return (
              <div key={pe.id} className="p-4 rounded-xl border border-[#DCE7E1] bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#64748B]">{pe.id}</span>
                  <button
                    onClick={() => toggleSolution(pe.id)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#2E6F40] hover:underline"
                  >
                    <span>{isRevealed ? 'Hide Solution' : 'Reveal Solution'}</span>
                    {isRevealed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-xs font-semibold text-[#1E293B] font-mono">{pe.question}</p>
                {isRevealed && (
                  <div className="p-3 rounded-lg bg-[#F2F7F4] border border-[#DCE7E1] text-xs space-y-1 font-mono">
                    <div className="font-bold text-[#2E6F40]">Answer: {pe.answer}</div>
                    <div className="text-[11px] text-[#64748B]">{pe.steps}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Section22View;
