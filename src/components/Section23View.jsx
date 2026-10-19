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
  Table
} from 'lucide-react';

/**
 * Section 2.3 View: Boolean Functions, Minterms, Maxterms, Canonical & Standard Forms
 * Strictly zero em-dashes and zero en-dashes throughout.
 */

export const Section23View = ({ section }) => {
  const [tableMode, setTableMode] = useState('3var');
  const [revealedSolutions, setRevealedSolutions] = useState({});

  const toggleSolution = (id) => {
    setRevealedSolutions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (!section) return null;

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

        {/* Data Science Connection Callout */}
        <div className="p-4 rounded-xl bg-[#F4F7F4] border border-[#DCE7E1] flex items-start gap-3">
          <div className="p-2 rounded-lg bg-[#285C49] text-white flex-shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#285C49]">
              Machine Learning Feature Space Application
            </h4>
            <p className="text-xs text-[#293B32]/90 leading-relaxed font-normal">
              {section.dataScienceConnection}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Function Domain Theory */}
      <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#F2F7F4]">
          <Layers className="w-4 h-4 text-[#2E6F40]" />
          <h3 className="font-editorial text-lg font-bold text-[#1E293B]">
            1. Input Combinations vs Total Possible Boolean Functions
          </h3>
        </div>

        <p className="text-xs text-[#64748B] leading-relaxed">
          {section.functionDomainTheory?.explanation}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1]">
            <span className="text-[10px] font-mono font-bold uppercase text-[#2E6F40] block mb-1">Domain Formula</span>
            <span className="text-sm font-bold font-mono text-[#1E293B]">
              {section.functionDomainTheory?.inputCombinationsFormula}
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1]">
            <span className="text-[10px] font-mono font-bold uppercase text-[#4F46E5] block mb-1">Function Space Formula</span>
            <span className="text-sm font-bold font-mono text-[#1E293B]">
              {section.functionDomainTheory?.possibleFunctionsFormula}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#DCE7E1] text-[#64748B]">
                <th className="p-2.5">Variables (n)</th>
                <th className="p-2.5">Input Rows (2^n)</th>
                <th className="p-2.5 text-[#2E6F40]">Total Functions (2^(2^n))</th>
                <th className="p-2.5 font-sans">Engineering Examples</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2F7F4]">
              {section.functionDomainTheory?.tableExamples.map((row, idx) => (
                <tr key={idx}>
                  <td className="p-2.5 font-bold">{row.n}</td>
                  <td className="p-2.5">{row.combinations}</td>
                  <td className="p-2.5 font-bold text-[#2E6F40]">{row.totalFunctions.toLocaleString()}</td>
                  <td className="p-2.5 font-sans text-[#64748B]">{row.names}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Formal Definitions */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#DCE7E1]">
          <BookOpen className="w-4 h-4 text-[#2E6F40]" />
          <h2 className="font-editorial text-xl font-bold text-[#1E293B]">
            2. Core Architectural Terminology
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {section.definitions?.map((def, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs space-y-2">
              <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#FAF8F5] text-[#2E6F40] border border-[#DCE7E1]">
                {def.term}
              </span>
              <p className="text-xs text-[#1E293B] leading-relaxed">{def.formal}</p>
              <div className="p-2 rounded-lg bg-[#FAF8F5] text-[11px] text-[#64748B]">
                <span className="font-bold text-[#2E6F40]">Exam Tip: </span>
                {def.examTip}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Minterm & Maxterm Master Tables */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
          <div className="flex items-center gap-2">
            <Table className="w-4 h-4 text-[#2E6F40]" />
            <h2 className="font-editorial text-xl font-bold text-[#1E293B]">
              3. Canonical Minterm & Maxterm Index Tables
            </h2>
          </div>

          <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-xl border border-[#DCE7E1]">
            <button
              onClick={() => setTableMode('2var')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                tableMode === '2var'
                  ? 'bg-white text-[#2E6F40] shadow-xs'
                  : 'text-[#64748B] hover:text-[#1E293B]'
              }`}
            >
              2 Variables (4 terms)
            </button>
            <button
              onClick={() => setTableMode('3var')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                tableMode === '3var'
                  ? 'bg-white text-[#2E6F40] shadow-xs'
                  : 'text-[#64748B] hover:text-[#1E293B]'
              }`}
            >
              3 Variables (8 terms)
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#DCE7E1] bg-white shadow-2xs">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#DCE7E1] text-[#64748B]">
                <th className="p-3">Index</th>
                <th className="p-3">Binary</th>
                <th className="p-3 text-[#2E6F40]">Minterm (mi)</th>
                <th className="p-3 text-[#2E6F40]">Minterm Term</th>
                <th className="p-3 text-[#4F46E5]">Maxterm (Mi)</th>
                <th className="p-3 text-[#4F46E5]">Maxterm Term</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2F7F4]">
              {(tableMode === '2var' ? section.twoVariableTables : section.threeVariableTables)?.map((row) => (
                <tr key={row.index} className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="p-3 font-bold text-[#1E293B]">{row.index}</td>
                  <td className="p-3 font-semibold text-[#64748B]">{row.bin}</td>
                  <td className="p-3 font-bold text-[#2E6F40]">{row.mintermSymbol}</td>
                  <td className="p-3 font-semibold text-[#2E6F40] bg-[#EBF3ED]/30">{row.mintermTerm}</td>
                  <td className="p-3 font-bold text-[#4F46E5]">{row.maxtermSymbol}</td>
                  <td className="p-3 font-semibold text-[#4F46E5] bg-[#EEF2FF]/30">{row.maxtermTerm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Polarity Comparison */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#DCE7E1]">
          <Zap className="w-4 h-4 text-[#2E6F40]" />
          <h2 className="font-editorial text-xl font-bold text-[#1E293B]">
            4. Polarity & Duality Comparison Matrix
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#DCE7E1] bg-white shadow-2xs">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#DCE7E1] text-[#64748B]">
                <th className="p-3 font-mono font-bold">Property</th>
                <th className="p-3 font-mono font-bold text-[#2E6F40]">Minterm Standard</th>
                <th className="p-3 font-mono font-bold text-[#4F46E5]">Maxterm Standard</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2F7F4]">
              {section.polarityComparison?.map((row, idx) => (
                <tr key={idx}>
                  <td className="p-3 font-bold text-[#1E293B]">{row.property}</td>
                  <td className="p-3 font-mono text-[#2E6F40]">{row.minterm}</td>
                  <td className="p-3 font-mono text-[#4F46E5]">{row.maxterm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Worked Models */}
      <div className="space-y-4">
        <div className="pb-2 border-b border-[#DCE7E1]">
          <h2 className="font-editorial text-xl font-bold text-[#1E293B]">
            5. Progressive Worked Models
          </h2>
          <p className="text-xs text-[#64748B]">
            Comprehensive conversion problems from basic decimal indexing to 4-variable algebraic reductions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {section.workedModels?.map((wm) => (
            <div
              key={wm.id}
              className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#FAF8F5] text-[#2E6F40] border border-[#DCE7E1]">
                    {wm.id}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EBF3ED] text-[#2E6F40]">
                    {wm.difficulty}
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-[#2E6F40]">
                  {wm.finalResult}
                </span>
              </div>

              <h4 className="text-sm font-bold font-mono text-[#1E293B]">{wm.target}</h4>

              <div className="space-y-2 border-t border-b border-[#F2F7F4] py-3">
                {wm.solutionSteps.map((step) => (
                  <div key={step.step} className="grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs">
                    <div className="sm:col-span-1 font-mono font-bold text-[#64748B]">
                      Step {step.step}:
                    </div>
                    <div className="sm:col-span-6 font-mono font-semibold text-[#1E293B] bg-[#FAF8F5] p-1.5 rounded-lg border border-[#DCE7E1]">
                      {step.expr}
                    </div>
                    <div className="sm:col-span-5 text-[11px] text-[#475569] flex items-center gap-1.5">
                      <span className="font-bold text-[#2E6F40] font-mono">[{step.rule}]</span>
                      <span>{step.reason}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-[#F2F7F4] border border-[#DCE7E1] text-[11px] text-[#64748B]">
                <span className="font-bold text-[#2E6F40]">Verification Note: </span>
                {wm.verificationNote}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Exam Traps */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#DCE7E1]">
          <AlertTriangle className="w-4 h-4 text-[#D97706]" />
          <h2 className="font-editorial text-xl font-bold text-[#1E293B]">
            6. Critical Examination Traps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {section.examTraps?.map((trap, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] space-y-1.5">
              <h4 className="text-xs font-bold text-[#92400E]">Trap {idx + 1}: {trap.trap}</h4>
              <p className="text-xs text-[#78350F] leading-relaxed font-normal">{trap.explanation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 8. Practice Exercises */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#DCE7E1]">
          <ShieldCheck className="w-4 h-4 text-[#2E6F40]" />
          <h2 className="font-editorial text-xl font-bold text-[#1E293B]">
            7. Self-Assessment Practice Exercises
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

export default Section23View;
