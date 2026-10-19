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
  Sliders
} from 'lucide-react';

/**
 * Section 2.6 View: Gate-Level Minimization and NAND/NOR Implementation
 * Strictly zero em-dashes and zero en-dashes throughout.
 */

export const Section26View = ({ section }) => {
  const [universalTab, setUniversalTab] = useState('NAND');
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

        {/* Data Science Callout */}
        <div className="p-4 rounded-xl bg-[#F4F7F4] border border-[#DCE7E1] flex items-start gap-3">
          <div className="p-2 rounded-lg bg-[#285C49] text-white flex-shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#285C49]">
              VLSI & Transistor-Level Efficiency
            </h4>
            <p className="text-xs text-[#293B32]/90 leading-relaxed font-normal">
              {section.dataScienceConnection}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Hardware Cost Metrics */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#DCE7E1]">
          <Sliders className="w-4 h-4 text-[#2E6F40]" />
          <h2 className="font-editorial text-xl font-bold text-[#1E293B]">
            1. Digital Hardware Optimization Metrics
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {section.costMetrics?.map((m, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-[#DCE7E1] bg-white shadow-2xs space-y-1.5">
              <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#FAF8F5] text-[#2E6F40] border border-[#DCE7E1]">
                {m.metric}
              </span>
              <p className="text-xs text-[#1E293B] font-semibold">{m.definition}</p>
              <p className="text-[11px] text-[#64748B] leading-relaxed">{m.impact}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Universal Gate Synthesis Proofs */}
      <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#F2F7F4]">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#2E6F40]" />
            <h3 className="font-editorial text-lg font-bold text-[#1E293B]">
              2. Universal Gate Realization (Functional Completeness)
            </h3>
          </div>

          <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-xl border border-[#DCE7E1]">
            <button
              onClick={() => setUniversalTab('NAND')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                universalTab === 'NAND'
                  ? 'bg-white text-[#2E6F40] shadow-xs'
                  : 'text-[#64748B] hover:text-[#1E293B]'
              }`}
            >
              NAND as Universal Gate
            </button>
            <button
              onClick={() => setUniversalTab('NOR')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                universalTab === 'NOR'
                  ? 'bg-white text-[#2E6F40] shadow-xs'
                  : 'text-[#64748B] hover:text-[#1E293B]'
              }`}
            >
              NOR as Universal Gate
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {(universalTab === 'NAND'
            ? section.universalGateConstructions?.nandUniversal
            : section.universalGateConstructions?.norUniversal
          )?.map((gate, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1E293B]">{gate.targetGate}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white border border-[#DCE7E1] text-[#2E6F40] font-bold">
                  {gate.gatesUsed} Gate{gate.gatesUsed > 1 ? 's' : ''}
                </span>
              </div>
              <p className="text-xs text-[#475569] leading-relaxed font-normal">
                {gate.construction}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Bubble Pushing Rules */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#DCE7E1]">
          <Layers className="w-4 h-4 text-[#2E6F40]" />
          <h2 className="font-editorial text-xl font-bold text-[#1E293B]">
            3. Bubble Pushing & Graphical De Morgan Transformations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {section.bubblePushingRules?.map((bpr, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-[#DCE7E1] bg-white shadow-2xs space-y-1.5">
              <span className="font-mono text-xs font-bold text-[#2E6F40]">{bpr.name}</span>
              <p className="text-xs text-[#64748B] leading-relaxed">{bpr.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Worked Models */}
      <div className="space-y-4">
        <div className="pb-2 border-b border-[#DCE7E1]">
          <h2 className="font-editorial text-xl font-bold text-[#1E293B]">
            4. Progressive Gate Synthesis Models
          </h2>
          <p className="text-xs text-[#64748B]">
            Includes the syllabus required AB + CD (NAND) and (A+B)(C+D) (NOR) conversions.
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
                <span className="font-bold text-[#2E6F40]">Hardware Insight: </span>
                {wm.verificationNote}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Exam Traps */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#DCE7E1]">
          <AlertTriangle className="w-4 h-4 text-[#D97706]" />
          <h2 className="font-editorial text-xl font-bold text-[#1E293B]">
            5. Critical Examination Pitfalls
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

      {/* 7. Practice Exercises */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#DCE7E1]">
          <ShieldCheck className="w-4 h-4 text-[#2E6F40]" />
          <h2 className="font-editorial text-xl font-bold text-[#1E293B]">
            6. Self-Assessment Practice Exercises
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

export default Section26View;
