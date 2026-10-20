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
  GitBranch,
  Activity
} from 'lucide-react';

/**
 * Section 2.7 View: Exclusive-OR Functions & Implementation Using NAND/NOR Gates
 * Strictly zero em-dashes and zero en-dashes throughout.
 */

export const Section27View = ({ section }) => {
  const [xorDemoState, setXorDemoState] = useState({ A: 0, B: 1 });
  const [revealedSolutions, setRevealedSolutions] = useState({});

  const toggleSolution = (id) => {
    setRevealedSolutions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (!section) return null;

  // Signal tracing for 4-NAND circuit
  const { A, B } = xorDemoState;
  const N1 = (A && B) ? 0 : 1;
  const N2 = (A && N1) ? 0 : 1;
  const N3 = (B && N1) ? 0 : 1;
  const N4_out = (N2 && N3) ? 0 : 1;

  // Signal tracing for 5-NOR circuit
  const R1 = (!A && !B) ? 1 : 0;
  const R2 = (!A && !R1) ? 1 : 0;
  const R3 = (!B && !R1) ? 1 : 0;
  const R4_xnor = (!R2 && !R3) ? 1 : 0;
  const R5_out = (!R4_xnor && !R4_xnor) ? 1 : 0;

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
              Parity Checks, Cyclic Redundancy Checks (CRC) & Cryptography
            </h4>
            <p className="text-xs text-[#293B32]/90 leading-relaxed font-normal">
              {section.dataScienceConnection}
            </p>
          </div>
        </div>
      </div>

      {/* 2. XOR & XNOR Foundations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* XOR Card */}
        <div className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2E6F40]" />
              <h3 className="font-editorial text-lg font-bold text-[#1E293B]">Exclusive-OR (XOR)</h3>
            </div>
            <span className="font-mono text-xs font-bold text-[#2E6F40]">A ⊕ B</span>
          </div>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Outputs 1 if and only if inputs are different (odd parity). Formula: A'B + AB'.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-center text-xs font-mono">
              <thead>
                <tr className="bg-[#FAF8F5] text-[#64748B]">
                  <th className="p-1.5 border border-[#DCE7E1]">A</th>
                  <th className="p-1.5 border border-[#DCE7E1]">B</th>
                  <th className="p-1.5 border border-[#DCE7E1] text-[#2E6F40]">A ⊕ B</th>
                </tr>
              </thead>
              <tbody>
                {section.truthTables?.xorTable.map((row, idx) => (
                  <tr key={idx}>
                    <td className="p-1.5 border border-[#DCE7E1]">{row.A}</td>
                    <td className="p-1.5 border border-[#DCE7E1]">{row.B}</td>
                    <td className="p-1.5 border border-[#DCE7E1] font-bold text-[#2E6F40] bg-[#EBF3ED]/30">{row.out}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* XNOR Card */}
        <div className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4F46E5]" />
              <h3 className="font-editorial text-lg font-bold text-[#1E293B]">Exclusive-NOR (XNOR)</h3>
            </div>
            <span className="font-mono text-xs font-bold text-[#4F46E5]">(A ⊕ B)'</span>
          </div>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Outputs 1 if and only if inputs are identical (equivalence). Formula: AB + A'B'.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-center text-xs font-mono">
              <thead>
                <tr className="bg-[#FAF8F5] text-[#64748B]">
                  <th className="p-1.5 border border-[#DCE7E1]">A</th>
                  <th className="p-1.5 border border-[#DCE7E1]">B</th>
                  <th className="p-1.5 border border-[#DCE7E1] text-[#4F46E5]">(A ⊕ B)'</th>
                </tr>
              </thead>
              <tbody>
                {section.truthTables?.xnorTable.map((row, idx) => (
                  <tr key={idx}>
                    <td className="p-1.5 border border-[#DCE7E1]">{row.A}</td>
                    <td className="p-1.5 border border-[#DCE7E1]">{row.B}</td>
                    <td className="p-1.5 border border-[#DCE7E1] font-bold text-[#4F46E5] bg-[#EEF2FF]/30">{row.out}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 3. Core Algebraic Properties */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#DCE7E1]">
          <BookOpen className="w-4 h-4 text-[#2E6F40]" />
          <h2 className="font-editorial text-xl font-bold text-[#1E293B]">
            1. Core Algebraic Properties of XOR
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {section.algebraicProperties?.map((prop, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-[#DCE7E1] bg-white shadow-2xs space-y-1.5">
              <span className="text-[10px] font-mono font-bold uppercase text-[#2E6F40] block">{prop.prop}</span>
              <div className="font-mono text-sm font-bold text-[#1E293B]">{prop.formula}</div>
              <p className="text-[11px] text-[#64748B] leading-relaxed">{prop.proof}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Interactive 4-NAND and 5-NOR Circuit Derivations */}
      <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#F2F7F4]">
          <div>
            <h3 className="font-editorial text-lg font-bold text-[#1E293B]">
              2. Interactive Signal Tracer: 4-NAND & 5-NOR Realizations
            </h3>
            <p className="text-xs text-[#64748B]">
              Toggle inputs A and B to observe intermediate node voltages propagating in real time.
            </p>
          </div>

          {/* Interactive Input Toggles */}
          <div className="flex items-center gap-3 bg-[#FAF8F5] p-2 rounded-xl border border-[#DCE7E1]">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold">
              <span>Input A:</span>
              <button
                onClick={() => setXorDemoState(prev => ({ ...prev, A: prev.A ? 0 : 1 }))}
                className={`w-7 h-7 rounded-lg font-bold transition-all ${
                  A ? 'bg-[#2E6F40] text-white' : 'bg-white text-[#64748B] border border-[#DCE7E1]'
                }`}
              >
                {A}
              </button>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold">
              <span>Input B:</span>
              <button
                onClick={() => setXorDemoState(prev => ({ ...prev, B: prev.B ? 0 : 1 }))}
                className={`w-7 h-7 rounded-lg font-bold transition-all ${
                  B ? 'bg-[#2E6F40] text-white' : 'bg-white text-[#64748B] border border-[#DCE7E1]'
                }`}
              >
                {B}
              </button>
            </div>
          </div>
        </div>

        {/* 4-NAND Circuit Tracing */}
        <div className="p-4 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-[#2E6F40] uppercase">
              {section.fourNandDerivation?.title} (4 Gates Total)
            </span>
            <span className="font-mono text-xs font-bold text-[#1E293B]">
              Output XOR = {N4_out}
            </span>
          </div>

          <p className="text-xs text-[#64748B]">
            {section.fourNandDerivation?.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-white border border-[#DCE7E1]">
              <span className="text-[10px] text-[#64748B] block">Gate 1: NAND(A, B)</span>
              <span className="font-bold text-[#1E293B]">N1 = {N1}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-[#DCE7E1]">
              <span className="text-[10px] text-[#64748B] block">Gate 2: NAND(A, N1)</span>
              <span className="font-bold text-[#1E293B]">N2 = {N2}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-[#DCE7E1]">
              <span className="text-[10px] text-[#64748B] block">Gate 3: NAND(B, N1)</span>
              <span className="font-bold text-[#1E293B]">N3 = {N3}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#EBF3ED] border border-[#2E6F40]/30">
              <span className="text-[10px] text-[#2E6F40] font-bold block">Gate 4: NAND(N2, N3)</span>
              <span className="font-bold text-[#2E6F40] text-sm">XOR = {N4_out}</span>
            </div>
          </div>
        </div>

        {/* 5-NOR Circuit Tracing */}
        <div className="p-4 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-[#4F46E5] uppercase">
              {section.fiveNorDerivation?.title} (5 Gates Total)
            </span>
            <span className="font-mono text-xs font-bold text-[#1E293B]">
              Output XOR = {R5_out}
            </span>
          </div>

          <p className="text-xs text-[#64748B]">
            {section.fiveNorDerivation?.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
            <div className="p-2 rounded-lg bg-white border border-[#DCE7E1]">
              <span className="text-[10px] text-[#64748B] block">R1: NOR(A, B)</span>
              <span className="font-bold text-[#1E293B]">R1 = {R1}</span>
            </div>
            <div className="p-2 rounded-lg bg-white border border-[#DCE7E1]">
              <span className="text-[10px] text-[#64748B] block">R2: NOR(A, R1)</span>
              <span className="font-bold text-[#1E293B]">R2 = {R2}</span>
            </div>
            <div className="p-2 rounded-lg bg-white border border-[#DCE7E1]">
              <span className="text-[10px] text-[#64748B] block">R3: NOR(B, R1)</span>
              <span className="font-bold text-[#1E293B]">R3 = {R3}</span>
            </div>
            <div className="p-2 rounded-lg bg-white border border-[#DCE7E1]">
              <span className="text-[10px] text-[#4F46E5] font-bold block">R4 (XNOR)</span>
              <span className="font-bold text-[#4F46E5]">XNOR = {R4_xnor}</span>
            </div>
            <div className="p-2 rounded-lg bg-[#EEF2FF] border border-[#4F46E5]/30">
              <span className="text-[10px] text-[#4F46E5] font-bold block">R5 (Inverter)</span>
              <span className="font-bold text-[#4F46E5] text-sm">XOR = {R5_out}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Worked Models */}
      <div className="space-y-4">
        <div className="pb-2 border-b border-[#DCE7E1]">
          <h2 className="font-editorial text-xl font-bold text-[#1E293B]">
            3. Progressive Worked Models
          </h2>
          <p className="text-xs text-[#64748B]">
            Includes multi-variable XOR reductions, algebraic properties, and parity derivations.
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
                <span className="font-bold text-[#2E6F40]">Insight: </span>
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
            4. Common Examination Pitfalls
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
            5. Self-Assessment Practice Exercises
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

export default Section27View;
