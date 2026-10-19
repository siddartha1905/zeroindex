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
  ToggleLeft
} from 'lucide-react';

export const Section21View = ({ section }) => {
  const [activePostulateTab, setActivePostulateTab] = useState('P4');
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
              Data Science and Machine Learning Application
            </h4>
            <p className="text-xs text-[#293B32]/90 leading-relaxed font-normal">
              {section.dataScienceConnection}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Core Definitions Panel */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#DCE7E1]">
          <BookOpen className="w-4 h-4 text-[#285C49]" />
          <h2 className="font-editorial text-xl font-bold text-[#293B32]">
            1. Core Exam-Ready Definitions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {section.definitions.map((def, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#FAF8F5] text-[#285C49] border border-[#DCE7E1]">
                  DEF 0{idx + 1}
                </span>
                <h3 className="font-editorial text-lg font-bold text-[#293B32]">
                  {def.term}
                </h3>
                <p className="text-xs text-[#293B32]/90 leading-relaxed font-normal">
                  {def.formal}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F2F7F4] flex items-start gap-1.5 text-[11px] font-technical text-[#78350F] bg-[#FFFBEB] p-2.5 rounded-lg border border-[#FEF3C7]">
                <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0 text-[#D97706] mt-0.5" />
                <span><strong>Exam Note:</strong> {def.examTip}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Ordinary Algebra vs Boolean Algebra Comparison Matrix */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#DCE7E1]">
          <Layers className="w-4 h-4 text-[#285C49]" />
          <h2 className="font-editorial text-xl font-bold text-[#293B32]">
            2. Ordinary Algebra vs. Boolean Switching Algebra
          </h2>
        </div>

        <div className="overflow-x-auto border border-[#DCE7E1] rounded-2xl bg-white shadow-2xs">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#DCE7E1] font-technical font-bold text-[#293B32]">
                <th className="py-3 px-4 w-1/4">Feature / Property</th>
                <th className="py-3 px-4 w-3/8 text-[#64748B]">Ordinary High-School Algebra</th>
                <th className="py-3 px-4 w-3/8 text-[#285C49]">Boolean Switching Algebra (B, +, ·, ', 0, 1)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2F7F4]">
              {section.ordinaryVsBoolean.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="py-3 px-4 font-bold text-[#293B32]">{row.feature}</td>
                  <td className="py-3 px-4 text-[#64748B] font-mono text-[11px] leading-relaxed">{row.ordinaryAlgebra}</td>
                  <td className="py-3 px-4 text-[#293B32] font-mono text-[11px] leading-relaxed bg-[#F4F7F4]/40 font-semibold">{row.booleanAlgebra}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Interactive Huntington Postulates Explorer */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#285C49]" />
            <h2 className="font-editorial text-xl font-bold text-[#293B32]">
              3. The Huntington Postulates (1904)
            </h2>
          </div>
          <span className="text-xs font-mono text-[#5F6C64]">Click postulate tabs to inspect</span>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap gap-2">
          {section.huntingtonPostulates.map((p) => {
            const isActive = activePostulateTab === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActivePostulateTab(p.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#285C49] text-white shadow-sm'
                    : 'bg-white text-[#5F6C64] border border-[#DCE7E1] hover:border-[#285C49]'
                }`}
              >
                <span>{p.id}:</span>
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Postulate Detail Card */}
        {(() => {
          const currentP = section.huntingtonPostulates.find(p => p.id === activePostulateTab);
          if (!currentP) return null;
          return (
            <div className="p-6 rounded-2xl bg-white border-2 border-[#285C49]/20 shadow-soft space-y-5 animate-in fade-in duration-200">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DCE7E1] pb-3">
                <div>
                  <span className="font-mono text-xs font-bold text-[#285C49] uppercase">
                    Huntington Axiom {currentP.id}
                  </span>
                  <h3 className="font-editorial text-2xl font-bold text-[#293B32] mt-0.5">
                    {currentP.name}
                  </h3>
                </div>
                <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#EBF3ED] text-[#285C49] font-bold">
                  Dual Pair Structure
                </span>
              </div>

              {/* Dual Pair Columns: Part A (OR) and Part B (AND) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Part A: OR */}
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold text-[#285C49] uppercase">Part (a): Disjunction (OR)</span>
                    <span className="w-5 h-5 rounded-full bg-[#EBF3ED] text-[#285C49] font-mono text-[10px] font-bold flex items-center justify-center">+</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-[#DCE7E1] font-mono font-bold text-sm text-[#293B32]">
                    {currentP.partA.formula}
                  </div>
                  <p className="text-xs text-[#5F6C64] leading-relaxed">
                    {currentP.partA.meaning}
                  </p>
                </div>

                {/* Part B: AND */}
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold text-[#285C49] uppercase">Part (b): Conjunction (AND)</span>
                    <span className="w-5 h-5 rounded-full bg-[#EBF3ED] text-[#285C49] font-mono text-[10px] font-bold flex items-center justify-center">·</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-[#DCE7E1] font-mono font-bold text-sm text-[#293B32]">
                    {currentP.partB.formula}
                  </div>
                  <p className="text-xs text-[#5F6C64] leading-relaxed">
                    {currentP.partB.meaning}
                  </p>
                </div>
              </div>

              {/* Physical Switch Analogy */}
              <div className="p-4 rounded-xl bg-[#FFFDF9] border border-[#FDE68A] flex items-start gap-3">
                <ToggleLeft className="w-5 h-5 text-[#D97706] flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-mono text-xs font-bold text-[#92400E] uppercase tracking-wider">
                    Physical Electrical Switch Analogy
                  </h4>
                  <p className="text-xs text-[#293B32]/90 leading-relaxed font-normal">
                    {currentP.switchAnalogy}
                  </p>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* 5. Operator Precedence Ladder */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#DCE7E1]">
          <Cpu className="w-4 h-4 text-[#285C49]" />
          <h2 className="font-editorial text-xl font-bold text-[#293B32]">
            4. Operator Precedence Hierarchy
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {section.operatorPrecedence.map((op) => (
            <div key={op.level} className="p-4 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-extrabold px-2 py-0.5 rounded bg-[#EBF3ED] text-[#285C49]">
                  PRIORITY {op.level}
                </span>
                <span className="font-mono text-base font-bold text-[#285C49]">{op.symbol}</span>
              </div>
              <h3 className="font-editorial text-base font-bold text-[#293B32]">{op.name}</h3>
              <p className="text-xs text-[#5F6C64] leading-relaxed">{op.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Step-by-Step Worked Academic Models */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-[#DCE7E1]">
          <HelpCircle className="w-4 h-4 text-[#285C49]" />
          <h2 className="font-editorial text-xl font-bold text-[#293B32]">
            5. Step-by-Step Worked Examination Models
          </h2>
        </div>

        <div className="space-y-6">
          {section.workedModels.map((model) => (
            <div key={model.id} className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F2F7F4] pb-3">
                <h3 className="font-editorial text-xl font-bold text-[#293B32]">
                  {model.title}
                </h3>
                <span className="font-mono text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#FAF8F5] text-[#285C49] border border-[#DCE7E1]">
                  {model.level}
                </span>
              </div>

              {/* Problem Statement */}
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1">
                <span className="font-mono text-[10px] font-bold uppercase text-[#5F6C64]">Problem Statement</span>
                <pre className="font-mono text-xs text-[#293B32] whitespace-pre-wrap leading-relaxed">
                  {model.problemStatement}
                </pre>
              </div>

              {/* Methodology */}
              <p className="text-xs text-[#5F6C64] leading-relaxed italic">
                <strong>Methodology:</strong> {model.methodology}
              </p>

              {/* Steps (if available) */}
              {model.steps && (
                <div className="space-y-3 pt-2">
                  {model.steps.map((st, sIdx) => (
                    <div key={sIdx} className="p-3.5 rounded-xl bg-white border border-[#E5EBE7] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[#285C49]">
                          {st.subpart || `Step ${st.stepNumber}: ${st.action}`}
                        </span>
                      </div>
                      {st.derivation && (
                        <pre className="font-mono text-xs text-[#293B32] whitespace-pre-wrap bg-[#FBF8F2] p-2.5 rounded-lg border border-[#DCE7E1]">
                          {st.derivation}
                        </pre>
                      )}
                      {st.expression && (
                        <div className="font-mono text-xs text-[#293B32] bg-[#FBF8F2] p-2 rounded border border-[#DCE7E1]">
                          {st.expression}
                        </div>
                      )}
                      {st.caution && (
                        <div className="text-[11px] text-[#92400E] flex items-center gap-1 font-mono">
                          <span>&#x26A0; Note:</span>
                          <span>{st.caution}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Truth Table (for Model 2) */}
              {model.truthTable && (
                <div className="overflow-x-auto border border-[#DCE7E1] rounded-xl bg-white shadow-2xs">
                  <table className="w-full text-xs text-center border-collapse">
                    <thead>
                      <tr className="bg-[#FAF8F5] border-b border-[#DCE7E1] font-mono text-[#293B32]">
                        {model.truthTable.columns.map((c, cIdx) => (
                          <th key={cIdx} className={`py-2 px-3 ${c.includes('LHS') || c.includes('RHS') ? 'bg-[#EBF3ED] text-[#285C49] font-bold' : ''}`}>
                            {c}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F2F7F4] font-mono">
                      {model.truthTable.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-[#FAF8F5]/60 transition-colors">
                          {row.map((val, cellIdx) => (
                            <td key={cellIdx} className={`py-2 px-3 ${cellIdx === 4 || cellIdx === 7 ? 'bg-[#F4F7F4] font-bold text-[#285C49]' : 'text-[#64748B]'}`}>
                              {val}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Circuit Explanations (for Model 3) */}
              {model.explanations && (
                <div className="space-y-3 pt-2">
                  {model.explanations.map((exp, eIdx) => (
                    <div key={eIdx} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                      <h4 className="font-mono text-xs font-bold text-[#285C49]">{exp.circuit}</h4>
                      <div className="space-y-1 text-xs text-[#293B32]/90 leading-relaxed">
                        <p><strong>Left Side:</strong> {exp.lhs}</p>
                        <p><strong>Right Side:</strong> {exp.rhs}</p>
                        <p className="text-[#285C49] font-semibold"><strong>Equivalence:</strong> {exp.equivalence}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {model.conclusion && (
                <div className="p-3 bg-[#EBF3ED] text-[#285C49] rounded-xl border border-[#285C49]/20 text-xs font-mono font-bold">
                  {model.conclusion}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 7. Common Student Misconceptions & Exam Traps */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#DCE7E1]">
          <AlertTriangle className="w-4 h-4 text-[#D97706]" />
          <h2 className="font-editorial text-xl font-bold text-[#293B32]">
            6. Top 5 Examination Misconceptions and Traps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {section.commonMistakes.map((mistake) => (
            <div key={mistake.id} className="p-5 rounded-2xl bg-white border border-[#FDE68A] shadow-2xs space-y-3">
              <h3 className="font-editorial text-base font-bold text-[#92400E]">
                {mistake.title}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B]">
                  <span className="font-bold block text-[10px] uppercase text-[#B91C1C]">Exam Trap (0 Marks):</span>
                  {mistake.wrongSnippet}
                </div>
                <div className="p-2.5 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46]">
                  <span className="font-bold block text-[10px] uppercase text-[#047857]">Correct Method:</span>
                  {mistake.correctSnippet}
                </div>
              </div>

              <p className="text-xs text-[#5F6C64] leading-relaxed">
                {mistake.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 8. Quick Revision Summary & Duality Checklist */}
      <div className="p-6 rounded-2xl bg-[#F4F7F4] border border-[#DCE7E1] space-y-5">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#285C49]" />
          <h2 className="font-editorial text-xl font-bold text-[#293B32]">
            7. Quick Revision Summary & Duality Checklist
          </h2>
        </div>

        <div className="overflow-x-auto border border-[#DCE7E1] rounded-xl bg-white shadow-2xs">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#DCE7E1] font-mono text-[#293B32]">
                {section.examRevisionSummary.headers.map((h, idx) => (
                  <th key={idx} className="py-2.5 px-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2F7F4] font-mono">
              {section.examRevisionSummary.postulatesTable.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-[#285C49]">{row[0]}</td>
                  <td className="py-2.5 px-3 text-[#293B32]">{row[1]}</td>
                  <td className="py-2.5 px-3 text-[#293B32]">{row[2]}</td>
                  <td className="py-2.5 px-3 text-[#5F6C64]">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-2">
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#285C49]">
            5-Step Duality Generation Checklist
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            {section.examRevisionSummary.dualityChecklist.map((step, sIdx) => (
              <div key={sIdx} className="p-2.5 rounded-lg bg-white border border-[#DCE7E1] text-[#293B32] flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#285C49] flex-shrink-0" />
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 9. Curated Practice Arena with Revealable Answers */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#285C49]" />
            <h2 className="font-editorial text-xl font-bold text-[#293B32]">
              8. University Practice Arena (Verified Detailed Solutions)
            </h2>
          </div>
          <span className="text-xs font-mono text-[#5F6C64]">6 Curated Exam Questions</span>
        </div>

        <div className="space-y-4">
          {section.practiceQuestions.map((q) => {
            const isRevealed = !!revealedSolutions[q.id];
            return (
              <div key={q.id} className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#EBF3ED] text-[#285C49] font-mono text-xs font-bold flex items-center justify-center">
                      Q{q.questionNumber}
                    </span>
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#FAF8F5] text-[#5F6C64] border border-[#DCE7E1]">
                      {q.type}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E]">
                    {q.difficulty}
                  </span>
                </div>

                <p className="text-sm font-semibold text-[#293B32] leading-relaxed">
                  {q.question}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => toggleSolution(q.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#EBF3ED] text-[#285C49] border border-[#DCE7E1] text-xs font-mono font-bold transition-colors cursor-pointer"
                  >
                    <span>{isRevealed ? "Hide Step-by-Step Solution" : "View Step-by-Step Solution"}</span>
                    {isRevealed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {isRevealed && (
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2 mt-3 animate-in fade-in duration-150">
                    <span className="font-mono text-[10px] font-bold text-[#285C49] uppercase tracking-wider block">
                      Verified Academic Solution
                    </span>
                    <pre className="font-mono text-xs text-[#293B32] whitespace-pre-wrap leading-relaxed">
                      {q.solution}
                    </pre>
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

export default Section21View;
