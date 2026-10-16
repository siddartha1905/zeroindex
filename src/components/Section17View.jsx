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
  Layers,
  ShieldCheck,
  Eye,
  EyeOff,
  Sliders,
  Zap,
  Info,
  Activity,
  Lightbulb,
  Table,
  Check
} from 'lucide-react';
import { 
  GateSymbolSvg, 
  LiveGateExplorer, 
  SwitchEquivalentCircuit, 
  GateTruthTable, 
  TimingWaveformViewer 
} from './Section17Components';

/**
 * Section 1.7: Logic Gates & Circuit Primitives
 * Clean 4-Tab View strictly focused on fundamental logic gates:
 * 1. Overview & Live Gate Simulator
 * 2. 1.7A: Basic Gates (NOT, AND, OR)
 * 3. 1.7B: Universal & Special Gates (NAND, NOR, XOR, XNOR)
 * 4. Cheat Sheet & Timing Waveforms
 * 
 * Strict formatting: ZERO em-dashes (\u2014) and ZERO en-dashes (\u2013).
 */
export const Section17View = ({ section }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [subTab17A, setSubTab17A] = useState("not");
  const [subTab17B, setSubTab17B] = useState("nand");
  
  // State for revealed worked models and practice questions
  const [revealedModels, setRevealedModels] = useState({});
  const [revealedPractice, setRevealedPractice] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const toggleModel = (id) => {
    setRevealedModels(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const togglePractice = (id) => {
    setRevealedPractice(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSelectAnswer = (probId, optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [probId]: optionIndex
    }));
  };

  const overview = section.overviewGates || {};
  const basic = section.basicGatesData || {};
  const universalSpecial = section.universalSpecialGatesData || {};
  const cheatSheet = section.cheatSheetTimingData || {};

  return (
    <div className="space-y-8">
      {/* ===================================================================== */}
      {/* SECTION 1.7 TOP 4-TAB NAVIGATION BAR                                  */}
      {/* ===================================================================== */}
      <div className="p-4 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E6F40]">
            Section 1.7: Fundamental Logic Gates Track
          </span>
          <span className="text-xs text-[#64748B]">Select a Module or Workbench:</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`p-2.5 rounded-xl text-xs font-mono font-bold transition-all text-center ${
              activeTab === "overview"
                ? 'bg-[#2E6F40] text-white shadow-sm'
                : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]'
            }`}
          >
            Overview &amp; Live Gate Simulator
          </button>
          <button
            onClick={() => setActiveTab("1.7A")}
            className={`p-2.5 rounded-xl text-xs font-mono font-bold transition-all text-center ${
              activeTab === "1.7A"
                ? 'bg-[#2E6F40] text-white shadow-sm'
                : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]'
            }`}
          >
            1.7A: Basic Gates (NOT, AND, OR)
          </button>
          <button
            onClick={() => setActiveTab("1.7B")}
            className={`p-2.5 rounded-xl text-xs font-mono font-bold transition-all text-center ${
              activeTab === "1.7B"
                ? 'bg-[#2E6F40] text-white shadow-sm'
                : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]'
            }`}
          >
            1.7B: Universal &amp; Special Gates
          </button>
          <button
            onClick={() => setActiveTab("cheatSheet")}
            className={`p-2.5 rounded-xl text-xs font-mono font-bold transition-all text-center ${
              activeTab === "cheatSheet"
                ? 'bg-[#2E6F40] text-white shadow-sm'
                : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]'
            }`}
          >
            Cheat Sheet &amp; Timing Waveforms
          </button>
        </div>
      </div>


      {/* ===================================================================== */}
      {/* TAB 1: OVERVIEW & LIVE GATE SIMULATOR                                 */}
      {/* ===================================================================== */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Conceptual Introduction Card */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase text-[#2E6F40] bg-[#F2F7F4] px-2 py-0.5 rounded">
                Foundations
              </span>
              <h2 className="text-lg font-bold text-[#1E293B]">
                {overview.title || "The Physical Substrate of Digital Computation"}
              </h2>
            </div>

            <p className="text-xs text-[#475569] leading-relaxed">
              {overview.introParagraph}
            </p>

            {/* Voltage Standards in Silicon Table */}
            {overview.voltageStandards && (
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#D97706]" />
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1E293B]">
                    Silicon Voltage Standards for Binary 0 and 1
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {overview.voltageStandards.map((vs, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-white border border-[#DCE7E1] space-y-1.5 text-xs">
                      <span className="font-bold text-[#1E293B] block">{vs.standard}</span>
                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                        <div className="p-1.5 rounded bg-[#FAF8F5] border border-[#DCE7E1]">
                          <span className="text-[#64748B] block text-[9px] uppercase">Logic 0 (LOW)</span>
                          <span className="font-bold text-[#1E293B]">{vs.logic0}</span>
                        </div>
                        <div className="p-1.5 rounded bg-[#F2F7F4] border border-[#2E6F40]/20">
                          <span className="text-[#2E6F40] block text-[9px] uppercase">Logic 1 (HIGH)</span>
                          <span className="font-bold text-[#2E6F40]">{vs.logic1}</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-[#64748B] italic pt-1">
                        Forbidden Band: {vs.forbidden} ({vs.note})
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* The 3 Clean Gate Families (Visual Grid) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#2E6F40]" />
                <h3 className="text-sm font-bold text-[#1E293B]">
                  The 3 Clean Gate Families (Visual Grid)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {overview.families && overview.families.map((fam) => (
                  <div 
                    key={fam.id} 
                    className="p-4 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span 
                          className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded"
                          style={{ backgroundColor: `${fam.color}15`, color: fam.color }}
                        >
                          {fam.badge}
                        </span>
                        <div className="flex items-center gap-1">
                          {fam.gates.map((g, gi) => (
                            <span key={gi} className="px-1.5 py-0.5 rounded bg-white border border-[#DCE7E1] font-mono text-[9px] font-bold text-[#1E293B]">
                              {g}
                            </span>
                          ))}
                        </div>
                      </div>
                      <h4 className="text-xs font-bold text-[#1E293B]">{fam.name}</h4>
                      <p className="text-[11px] text-[#64748B] leading-relaxed">
                        {fam.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#DCE7E1] text-[10px] font-mono font-bold" style={{ color: fam.color }}>
                      Primitives: {fam.gates.join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Live 7-Gate Workbench */}
          {overview.allSevenGates && (
            <LiveGateExplorer gates={overview.allSevenGates} />
          )}
        </div>
      )}


      {/* ===================================================================== */}
      {/* TAB 2: 1.7A BASIC GATES (NOT, AND, OR)                                */}
      {/* ===================================================================== */}
      {activeTab === "1.7A" && (
        <div className="space-y-6">
          {/* Inner 3-Tab Switcher */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-[#FAF8F5] rounded-xl border border-[#DCE7E1]">
            <button
              onClick={() => setSubTab17A("not")}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                subTab17A === "not"
                  ? "bg-[#2E6F40] text-white shadow-2xs"
                  : "text-[#64748B] hover:text-[#1E293B]"
              }`}
            >
              1. NOT Gate (Inverter: IC 7404)
            </button>
            <button
              onClick={() => setSubTab17A("and")}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                subTab17A === "and"
                  ? "bg-[#2E6F40] text-white shadow-2xs"
                  : "text-[#64748B] hover:text-[#1E293B]"
              }`}
            >
              2. AND Gate (Logical Conjunction: IC 7408)
            </button>
            <button
              onClick={() => setSubTab17A("or")}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                subTab17A === "or"
                  ? "bg-[#2E6F40] text-white shadow-2xs"
                  : "text-[#64748B] hover:text-[#1E293B]"
              }`}
            >
              3. OR Gate (Logical Disjunction: IC 7432)
            </button>
          </div>

          {/* Sub-Tab 1: NOT Gate */}
          {subTab17A === "not" && basic.notGate && (
            <div className="space-y-6">
              {/* Gate Header Card with IEEE Symbol & Equation */}
              <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#DCE7E1]">
                  <div>
                    <h3 className="text-base font-bold text-[#1E293B]">{basic.notGate.name}</h3>
                    <span className="text-xs font-mono text-[#64748B]">{basic.notGate.icNumber}</span>
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-[#F2F7F4] text-[#2E6F40]">
                    Boolean Equation: Y = NOT A = A'
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-[#FAF8F5] rounded-xl border border-[#DCE7E1]">
                    <span className="text-[10px] font-mono text-[#64748B] uppercase mb-2">IEEE / ANSI Symbol</span>
                    <GateSymbolSvg gateId="NOT" inputA={1} width={170} height={90} />
                    <span className="text-[10px] text-[#64748B] mt-2 italic text-center">
                      Triangle represents amplification; circle bubble at apex represents logical inversion.
                    </span>
                  </div>

                  <div className="md:col-span-7 space-y-3">
                    <p className="text-xs text-[#475569] leading-relaxed">
                      {basic.notGate.description}
                    </p>
                    <div className="space-y-2">
                      {basic.notGate.keyProperties.map((prop, pi) => (
                        <div key={pi} className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] text-xs">
                          <span className="font-bold text-[#1E293B]">{prop.title}: </span>
                          <span className="font-mono text-[#2E6F40] font-bold">[{prop.formula}] </span>
                          <span className="text-[#64748B]">{prop.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Electrical Switch & Lamp Circuit + Truth Table */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7">
                  <SwitchEquivalentCircuit type="shunt" />
                </div>
                <div className="lg:col-span-5">
                  <GateTruthTable 
                    rows={basic.notGate.truthTable2} 
                    inputs={1} 
                    title="NOT Gate Truth Table" 
                  />
                </div>
              </div>

              {/* 4 Full-Width Worked Models */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#2E6F40]" />
                  <h4 className="text-sm font-bold text-[#1E293B]">
                    Worked Engineering Models (NOT Gate Behavior &amp; Delay)
                  </h4>
                </div>

                <div className="space-y-3">
                  {basic.notGate.workedModels.map((wm) => {
                    const isOpen = revealedModels[wm.id];
                    return (
                      <div key={wm.id} className="p-4 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#F2F7F4] text-[#2E6F40]">
                              {wm.conceptTag}
                            </span>
                            <h5 className="text-xs font-bold text-[#1E293B]">{wm.title}</h5>
                          </div>
                          <button
                            onClick={() => toggleModel(wm.id)}
                            className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#2E6F40] hover:underline"
                          >
                            {isOpen ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            <span>{isOpen ? "Hide Solution" : "Reveal Solution"}</span>
                          </button>
                        </div>

                        <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] text-xs">
                          <span className="font-bold text-[#1E293B]">Problem: </span>
                          <span className="text-[#475569]">{wm.problem}</span>
                        </div>

                        {isOpen && (
                          <div className="space-y-2 pt-2 border-t border-[#DCE7E1]">
                            <div className="p-3 rounded-lg bg-white border border-[#DCE7E1] font-mono text-[11px] text-[#334155] space-y-1">
                              {wm.solutionSteps.map((st, si) => (
                                <div key={si}>{st}</div>
                              ))}
                            </div>
                            <div className="p-2.5 rounded-lg bg-[#F2F7F4] border border-[#2E6F40]/30 font-mono text-xs flex items-center justify-between text-[#2E6F40]">
                              <span><strong>Final:</strong> {wm.finalAnswer}</span>
                              <span className="text-[10px] text-[#64748B] italic">{wm.verification}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 6 Graded Practice Problems */}
              <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#2E6F40]" />
                    <h4 className="text-sm font-bold text-[#1E293B]">
                      Graded Practice Arena: NOT Gate (6 Questions)
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-[#64748B]">Immediate Feedback</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {basic.notGate.practiceProblems.map((prob) => {
                    const isRevealed = revealedPractice[prob.id];
                    const selected = selectedAnswers[prob.id];
                    return (
                      <div key={prob.id} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                              prob.difficulty === "Easy" ? "bg-emerald-100 text-emerald-800" :
                              prob.difficulty === "Medium" ? "bg-amber-100 text-amber-800" : "bg-rose-100 text-rose-800"
                            }`}>
                              {prob.difficulty}
                            </span>
                            <span className="text-[10px] font-mono text-[#64748B]">{prob.conceptTag}</span>
                          </div>
                          <p className="text-xs font-medium text-[#1E293B] leading-relaxed">
                            {prob.question}
                          </p>

                          {/* Options */}
                          <div className="space-y-1.5 pt-1">
                            {prob.options.map((opt, oi) => {
                              const isSelected = selected === oi;
                              const isCorrect = oi === prob.correctIndex;
                              let btnClass = "bg-white border-[#DCE7E1] text-[#475569] hover:bg-[#FAF8F5]";
                              if (isRevealed) {
                                if (isCorrect) btnClass = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold";
                                else if (isSelected) btnClass = "bg-rose-50 border-rose-500 text-rose-900";
                              } else if (isSelected) {
                                btnClass = "bg-[#2E6F40]/10 border-[#2E6F40] text-[#2E6F40] font-bold";
                              }

                              return (
                                <button
                                  key={oi}
                                  onClick={() => handleSelectAnswer(prob.id, oi)}
                                  className={`w-full text-left p-2 rounded-lg border text-xs font-mono transition-all flex items-center justify-between ${btnClass}`}
                                >
                                  <span>{String.fromCharCode(65 + oi)}. {opt}</span>
                                  {isRevealed && isCorrect && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-[#DCE7E1]">
                          <button
                            onClick={() => togglePractice(prob.id)}
                            className="text-[11px] font-mono font-bold text-[#2E6F40] hover:underline"
                          >
                            {isRevealed ? "Hide Explanation" : "Reveal Explanation"}
                          </button>
                          {isRevealed && (
                            <p className="text-[11px] text-[#475569] bg-white p-2.5 rounded-lg border border-[#DCE7E1] mt-2 leading-relaxed">
                              {prob.solution}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Sub-Tab 2: AND Gate */}
          {subTab17A === "and" && basic.andGate && (
            <div className="space-y-6">
              {/* Gate Header Card */}
              <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#DCE7E1]">
                  <div>
                    <h3 className="text-base font-bold text-[#1E293B]">{basic.andGate.name}</h3>
                    <span className="text-xs font-mono text-[#64748B]">{basic.andGate.icNumber}</span>
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-[#F2F7F4] text-[#2E6F40]">
                    Boolean Equation: Y = A . B (Logical Multiplication)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-[#FAF8F5] rounded-xl border border-[#DCE7E1]">
                    <span className="text-[10px] font-mono text-[#64748B] uppercase mb-2">IEEE / ANSI Symbol</span>
                    <GateSymbolSvg gateId="AND" inputA={1} inputB={1} width={180} height={90} />
                    <span className="text-[10px] text-[#64748B] mt-2 italic text-center">
                      Straight back with semicircular rounded output front.
                    </span>
                  </div>

                  <div className="md:col-span-7 space-y-3">
                    <p className="text-xs text-[#475569] leading-relaxed">
                      {basic.andGate.description}
                    </p>
                    {/* Enable / Inhibit Control Masking Card */}
                    <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                      <div className="flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5 text-[#2E6F40]" />
                        <span className="text-xs font-bold text-[#1E293B]">{basic.andGate.controlMasking.title}</span>
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="p-1.5 rounded bg-white border border-[#DCE7E1] font-mono text-[11px] text-[#2E6F40]">
                          {basic.andGate.controlMasking.rule1}
                        </div>
                        <div className="p-1.5 rounded bg-white border border-[#DCE7E1] font-mono text-[11px] text-[#475569]">
                          {basic.andGate.controlMasking.rule2}
                        </div>
                      </div>
                      <p className="text-[10px] text-[#64748B] italic">
                        {basic.andGate.controlMasking.useCase}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Electrical Switch Circuit & Complete Truth Tables (2-input and 3-input) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 space-y-6">
                  <SwitchEquivalentCircuit type="series" />
                  <GateTruthTable 
                    rows={basic.andGate.truthTable2} 
                    inputs={2} 
                    title="2-Input AND Gate Truth Table" 
                  />
                </div>
                <div className="lg:col-span-5">
                  <GateTruthTable 
                    rows={basic.andGate.truthTable3} 
                    inputs={3} 
                    title="3-Input AND Gate Truth Table (Y = A.B.C)" 
                  />
                </div>
              </div>

              {/* 4 Full-Width Worked Models */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#2E6F40]" />
                  <h4 className="text-sm font-bold text-[#1E293B]">
                    Worked Engineering Models (AND Gate Behavior &amp; Control Gating)
                  </h4>
                </div>

                <div className="space-y-3">
                  {basic.andGate.workedModels.map((wm) => {
                    const isOpen = revealedModels[wm.id];
                    return (
                      <div key={wm.id} className="p-4 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#F2F7F4] text-[#2E6F40]">
                              {wm.conceptTag}
                            </span>
                            <h5 className="text-xs font-bold text-[#1E293B]">{wm.title}</h5>
                          </div>
                          <button
                            onClick={() => toggleModel(wm.id)}
                            className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#2E6F40] hover:underline"
                          >
                            {isOpen ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            <span>{isOpen ? "Hide Solution" : "Reveal Solution"}</span>
                          </button>
                        </div>

                        <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] text-xs">
                          <span className="font-bold text-[#1E293B]">Problem: </span>
                          <span className="text-[#475569]">{wm.problem}</span>
                        </div>

                        {isOpen && (
                          <div className="space-y-2 pt-2 border-t border-[#DCE7E1]">
                            <div className="p-3 rounded-lg bg-white border border-[#DCE7E1] font-mono text-[11px] text-[#334155] space-y-1">
                              {wm.solutionSteps.map((st, si) => (
                                <div key={si}>{st}</div>
                              ))}
                            </div>
                            <div className="p-2.5 rounded-lg bg-[#F2F7F4] border border-[#2E6F40]/30 font-mono text-xs flex items-center justify-between text-[#2E6F40]">
                              <span><strong>Final:</strong> {wm.finalAnswer}</span>
                              <span className="text-[10px] text-[#64748B] italic">{wm.verification}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 6 Graded Practice Problems */}
              <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#2E6F40]" />
                    <h4 className="text-sm font-bold text-[#1E293B]">
                      Graded Practice Arena: AND Gate (6 Questions)
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-[#64748B]">Immediate Feedback</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {basic.andGate.practiceProblems.map((prob) => {
                    const isRevealed = revealedPractice[prob.id];
                    const selected = selectedAnswers[prob.id];
                    return (
                      <div key={prob.id} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                              prob.difficulty === "Easy" ? "bg-emerald-100 text-emerald-800" :
                              prob.difficulty === "Medium" ? "bg-amber-100 text-amber-800" : "bg-rose-100 text-rose-800"
                            }`}>
                              {prob.difficulty}
                            </span>
                            <span className="text-[10px] font-mono text-[#64748B]">{prob.conceptTag}</span>
                          </div>
                          <p className="text-xs font-medium text-[#1E293B] leading-relaxed">
                            {prob.question}
                          </p>

                          <div className="space-y-1.5 pt-1">
                            {prob.options.map((opt, oi) => {
                              const isSelected = selected === oi;
                              const isCorrect = oi === prob.correctIndex;
                              let btnClass = "bg-white border-[#DCE7E1] text-[#475569] hover:bg-[#FAF8F5]";
                              if (isRevealed) {
                                if (isCorrect) btnClass = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold";
                                else if (isSelected) btnClass = "bg-rose-50 border-rose-500 text-rose-900";
                              } else if (isSelected) {
                                btnClass = "bg-[#2E6F40]/10 border-[#2E6F40] text-[#2E6F40] font-bold";
                              }

                              return (
                                <button
                                  key={oi}
                                  onClick={() => handleSelectAnswer(prob.id, oi)}
                                  className={`w-full text-left p-2 rounded-lg border text-xs font-mono transition-all flex items-center justify-between ${btnClass}`}
                                >
                                  <span>{String.fromCharCode(65 + oi)}. {opt}</span>
                                  {isRevealed && isCorrect && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-[#DCE7E1]">
                          <button
                            onClick={() => togglePractice(prob.id)}
                            className="text-[11px] font-mono font-bold text-[#2E6F40] hover:underline"
                          >
                            {isRevealed ? "Hide Explanation" : "Reveal Explanation"}
                          </button>
                          {isRevealed && (
                            <p className="text-[11px] text-[#475569] bg-white p-2.5 rounded-lg border border-[#DCE7E1] mt-2 leading-relaxed">
                              {prob.solution}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Sub-Tab 3: OR Gate */}
          {subTab17A === "or" && basic.orGate && (
            <div className="space-y-6">
              {/* Gate Header Card */}
              <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#DCE7E1]">
                  <div>
                    <h3 className="text-base font-bold text-[#1E293B]">{basic.orGate.name}</h3>
                    <span className="text-xs font-mono text-[#64748B]">{basic.orGate.icNumber}</span>
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-[#F2F7F4] text-[#2E6F40]">
                    Boolean Equation: Y = A + B (Logical Addition)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-[#FAF8F5] rounded-xl border border-[#DCE7E1]">
                    <span className="text-[10px] font-mono text-[#64748B] uppercase mb-2">IEEE / ANSI Symbol</span>
                    <GateSymbolSvg gateId="OR" inputA={1} inputB={0} width={180} height={90} />
                    <span className="text-[10px] text-[#64748B] mt-2 italic text-center">
                      Curved input back with two arcs meeting at a sharp output vertex.
                    </span>
                  </div>

                  <div className="md:col-span-7 space-y-3">
                    <p className="text-xs text-[#475569] leading-relaxed">
                      {basic.orGate.description}
                    </p>
                    {/* Pass vs Force-HIGH Masking */}
                    <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                      <div className="flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5 text-[#2E6F40]" />
                        <span className="text-xs font-bold text-[#1E293B]">{basic.orGate.controlMasking.title}</span>
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="p-1.5 rounded bg-white border border-[#DCE7E1] font-mono text-[11px] text-[#2E6F40]">
                          {basic.orGate.controlMasking.rule1}
                        </div>
                        <div className="p-1.5 rounded bg-white border border-[#DCE7E1] font-mono text-[11px] text-[#475569]">
                          {basic.orGate.controlMasking.rule2}
                        </div>
                      </div>
                      <p className="text-[10px] text-[#64748B] italic">
                        {basic.orGate.controlMasking.useCase}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Electrical Switch Circuit & Complete Truth Tables */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 space-y-6">
                  <SwitchEquivalentCircuit type="parallel" />
                  <GateTruthTable 
                    rows={basic.orGate.truthTable2} 
                    inputs={2} 
                    title="2-Input OR Gate Truth Table" 
                  />
                </div>
                <div className="lg:col-span-5">
                  <GateTruthTable 
                    rows={basic.orGate.truthTable3} 
                    inputs={3} 
                    title="3-Input OR Gate Truth Table (Y = A + B + C)" 
                  />
                </div>
              </div>

              {/* 4 Full-Width Worked Models */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#2E6F40]" />
                  <h4 className="text-sm font-bold text-[#1E293B]">
                    Worked Engineering Models (OR Gate Behavior &amp; Redundancy)
                  </h4>
                </div>

                <div className="space-y-3">
                  {basic.orGate.workedModels.map((wm) => {
                    const isOpen = revealedModels[wm.id];
                    return (
                      <div key={wm.id} className="p-4 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#F2F7F4] text-[#2E6F40]">
                              {wm.conceptTag}
                            </span>
                            <h5 className="text-xs font-bold text-[#1E293B]">{wm.title}</h5>
                          </div>
                          <button
                            onClick={() => toggleModel(wm.id)}
                            className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#2E6F40] hover:underline"
                          >
                            {isOpen ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            <span>{isOpen ? "Hide Solution" : "Reveal Solution"}</span>
                          </button>
                        </div>

                        <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] text-xs">
                          <span className="font-bold text-[#1E293B]">Problem: </span>
                          <span className="text-[#475569]">{wm.problem}</span>
                        </div>

                        {isOpen && (
                          <div className="space-y-2 pt-2 border-t border-[#DCE7E1]">
                            <div className="p-3 rounded-lg bg-white border border-[#DCE7E1] font-mono text-[11px] text-[#334155] space-y-1">
                              {wm.solutionSteps.map((st, si) => (
                                <div key={si}>{st}</div>
                              ))}
                            </div>
                            <div className="p-2.5 rounded-lg bg-[#F2F7F4] border border-[#2E6F40]/30 font-mono text-xs flex items-center justify-between text-[#2E6F40]">
                              <span><strong>Final:</strong> {wm.finalAnswer}</span>
                              <span className="text-[10px] text-[#64748B] italic">{wm.verification}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 6 Graded Practice Problems */}
              <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#2E6F40]" />
                    <h4 className="text-sm font-bold text-[#1E293B]">
                      Graded Practice Arena: OR Gate (6 Questions)
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-[#64748B]">Immediate Feedback</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {basic.orGate.practiceProblems.map((prob) => {
                    const isRevealed = revealedPractice[prob.id];
                    const selected = selectedAnswers[prob.id];
                    return (
                      <div key={prob.id} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                              prob.difficulty === "Easy" ? "bg-emerald-100 text-emerald-800" :
                              prob.difficulty === "Medium" ? "bg-amber-100 text-amber-800" : "bg-rose-100 text-rose-800"
                            }`}>
                              {prob.difficulty}
                            </span>
                            <span className="text-[10px] font-mono text-[#64748B]">{prob.conceptTag}</span>
                          </div>
                          <p className="text-xs font-medium text-[#1E293B] leading-relaxed">
                            {prob.question}
                          </p>

                          <div className="space-y-1.5 pt-1">
                            {prob.options.map((opt, oi) => {
                              const isSelected = selected === oi;
                              const isCorrect = oi === prob.correctIndex;
                              let btnClass = "bg-white border-[#DCE7E1] text-[#475569] hover:bg-[#FAF8F5]";
                              if (isRevealed) {
                                if (isCorrect) btnClass = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold";
                                else if (isSelected) btnClass = "bg-rose-50 border-rose-500 text-rose-900";
                              } else if (isSelected) {
                                btnClass = "bg-[#2E6F40]/10 border-[#2E6F40] text-[#2E6F40] font-bold";
                              }

                              return (
                                <button
                                  key={oi}
                                  onClick={() => handleSelectAnswer(prob.id, oi)}
                                  className={`w-full text-left p-2 rounded-lg border text-xs font-mono transition-all flex items-center justify-between ${btnClass}`}
                                >
                                  <span>{String.fromCharCode(65 + oi)}. {opt}</span>
                                  {isRevealed && isCorrect && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-[#DCE7E1]">
                          <button
                            onClick={() => togglePractice(prob.id)}
                            className="text-[11px] font-mono font-bold text-[#2E6F40] hover:underline"
                          >
                            {isRevealed ? "Hide Explanation" : "Reveal Explanation"}
                          </button>
                          {isRevealed && (
                            <p className="text-[11px] text-[#475569] bg-white p-2.5 rounded-lg border border-[#DCE7E1] mt-2 leading-relaxed">
                              {prob.solution}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}


      {/* ===================================================================== */}
      {/* TAB 3: 1.7B UNIVERSAL & SPECIAL GATES (NAND, NOR, XOR, XNOR)          */}
      {/* ===================================================================== */}
      {activeTab === "1.7B" && (
        <div className="space-y-6">
          {/* Inner 4-Tab Switcher */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-[#FAF8F5] rounded-xl border border-[#DCE7E1]">
            <button
              onClick={() => setSubTab17B("nand")}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                subTab17B === "nand"
                  ? "bg-[#4F46E5] text-white shadow-2xs"
                  : "text-[#64748B] hover:text-[#1E293B]"
              }`}
            >
              1. NAND Gate (IC 7400: Universal)
            </button>
            <button
              onClick={() => setSubTab17B("nor")}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                subTab17B === "nor"
                  ? "bg-[#4F46E5] text-white shadow-2xs"
                  : "text-[#64748B] hover:text-[#1E293B]"
              }`}
            >
              2. NOR Gate (IC 7402: Universal)
            </button>
            <button
              onClick={() => setSubTab17B("xor")}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                subTab17B === "xor"
                  ? "bg-[#D97706] text-white shadow-2xs"
                  : "text-[#64748B] hover:text-[#1E293B]"
              }`}
            >
              3. XOR Gate (IC 7486: Odd-1s Detector)
            </button>
            <button
              onClick={() => setSubTab17B("xnor")}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                subTab17B === "xnor"
                  ? "bg-[#D97706] text-white shadow-2xs"
                  : "text-[#64748B] hover:text-[#1E293B]"
              }`}
            >
              4. XNOR Gate (IC 74266: Equivalence Gate)
            </button>
          </div>

          {/* Render selected Gate from universalSpecial */}
          {(() => {
            const gateKey = 
              subTab17B === "nand" ? "nandGate" :
              subTab17B === "nor" ? "norGate" :
              subTab17B === "xor" ? "xorGate" : "xnorGate";

            const gData = universalSpecial[gateKey];
            if (!gData) return null;

            const isUniversal = subTab17B === "nand" || subTab17B === "nor";
            const themeColor = isUniversal ? "#4F46E5" : "#D97706";

            return (
              <div className="space-y-6">
                {/* Gate Header Card */}
                <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#DCE7E1]">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-[#1E293B]">{gData.name}</h3>
                        {isUniversal && (
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#4F46E5] text-white">
                            UNIVERSAL
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono text-[#64748B]">{gData.icNumber}</span>
                    </div>
                    <span 
                      className="text-xs font-mono font-bold px-2 py-1 rounded"
                      style={{ backgroundColor: `${themeColor}15`, color: themeColor }}
                    >
                      Equation: {gData.equationLatex}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-[#FAF8F5] rounded-xl border border-[#DCE7E1]">
                      <span className="text-[10px] font-mono text-[#64748B] uppercase mb-2">IEEE / ANSI Symbol</span>
                      <GateSymbolSvg gateId={gData.id.toUpperCase()} inputA={1} inputB={subTab17B === "xor" ? 0 : 1} width={180} height={90} />
                      <span className="text-[10px] text-[#64748B] mt-2 italic text-center">
                        {gData.symbolDescription}
                      </span>
                    </div>

                    <div className="md:col-span-7 space-y-3">
                      <p className="text-xs text-[#475569] leading-relaxed">
                        {gData.description}
                      </p>

                      {/* Behavioral Trigger Callout */}
                      <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] text-xs">
                        <span className="font-bold text-[#1E293B]">Behavioral Trigger: </span>
                        <span className="text-[#475569]">{gData.behavioralTrigger}</span>
                      </div>

                      {/* Controlled Inverter / Equivalence Card */}
                      {(gData.controlledInverter || gData.controlledEquivalence) && (
                        <div className="p-3.5 rounded-xl bg-white border border-[#DCE7E1] space-y-1.5 text-xs shadow-2xs">
                          <span className="font-bold text-[#1E293B] block">
                            {gData.controlledInverter?.title || gData.controlledEquivalence?.title}
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px]">
                            <div className="p-1.5 rounded bg-[#FAF8F5] border border-[#DCE7E1] text-[#2E6F40]">
                              {gData.controlledInverter?.rule1 || gData.controlledEquivalence?.rule1}
                            </div>
                            <div className="p-1.5 rounded bg-[#FAF8F5] border border-[#DCE7E1] text-[#4F46E5]">
                              {gData.controlledInverter?.rule2 || gData.controlledEquivalence?.rule2}
                            </div>
                          </div>
                          <p className="text-[10px] text-[#64748B] italic pt-1">
                            {gData.controlledInverter?.application || gData.controlledInverter?.tiedInputs || gData.controlledEquivalence?.comparison}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Truth Table */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className={subTab17B === "xor" ? "lg:col-span-6" : "lg:col-span-12"}>
                    <GateTruthTable 
                      rows={gData.truthTable2} 
                      inputs={2} 
                      title={`2-Input ${gData.id.toUpperCase()} Gate Truth Table`} 
                    />
                  </div>
                  {subTab17B === "xor" && gData.truthTable3 && (
                    <div className="lg:col-span-6">
                      <GateTruthTable 
                        rows={gData.truthTable3} 
                        inputs={3} 
                        title="3-Input XOR Gate (Odd-1s Parity Detector)" 
                      />
                    </div>
                  )}
                </div>

                {/* 4 Full-Width Worked Models */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#2E6F40]" />
                    <h4 className="text-sm font-bold text-[#1E293B]">
                      Worked Engineering Models ({gData.name})
                    </h4>
                  </div>

                  <div className="space-y-3">
                    {gData.workedModels.map((wm) => {
                      const isOpen = revealedModels[wm.id];
                      return (
                        <div key={wm.id} className="p-4 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span 
                                className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded"
                                style={{ backgroundColor: `${themeColor}15`, color: themeColor }}
                              >
                                {wm.conceptTag}
                              </span>
                              <h5 className="text-xs font-bold text-[#1E293B]">{wm.title}</h5>
                            </div>
                            <button
                              onClick={() => toggleModel(wm.id)}
                              className="inline-flex items-center gap-1 text-xs font-mono font-bold hover:underline"
                              style={{ color: themeColor }}
                            >
                              {isOpen ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              <span>{isOpen ? "Hide Solution" : "Reveal Solution"}</span>
                            </button>
                          </div>

                          <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] text-xs">
                            <span className="font-bold text-[#1E293B]">Problem: </span>
                            <span className="text-[#475569]">{wm.problem}</span>
                          </div>

                          {isOpen && (
                            <div className="space-y-2 pt-2 border-t border-[#DCE7E1]">
                              <div className="p-3 rounded-lg bg-white border border-[#DCE7E1] font-mono text-[11px] text-[#334155] space-y-1">
                                {wm.solutionSteps.map((st, si) => (
                                  <div key={si}>{st}</div>
                                ))}
                              </div>
                              <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] font-mono text-xs flex items-center justify-between text-[#1E293B]">
                                <span><strong>Final:</strong> {wm.finalAnswer}</span>
                                <span className="text-[10px] text-[#64748B] italic">{wm.verification}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 6 Graded Practice Problems */}
                <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#2E6F40]" />
                      <h4 className="text-sm font-bold text-[#1E293B]">
                        Graded Practice Arena: {gData.name} (6 Questions)
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-[#64748B]">Immediate Feedback</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {gData.practiceProblems.map((prob) => {
                      const isRevealed = revealedPractice[prob.id];
                      const selected = selectedAnswers[prob.id];
                      return (
                        <div key={prob.id} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3 flex flex-col justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                                prob.difficulty === "Easy" ? "bg-emerald-100 text-emerald-800" :
                                prob.difficulty === "Medium" ? "bg-amber-100 text-amber-800" : "bg-rose-100 text-rose-800"
                              }`}>
                                {prob.difficulty}
                              </span>
                              <span className="text-[10px] font-mono text-[#64748B]">{prob.conceptTag}</span>
                            </div>
                            <p className="text-xs font-medium text-[#1E293B] leading-relaxed">
                              {prob.question}
                            </p>

                            <div className="space-y-1.5 pt-1">
                              {prob.options.map((opt, oi) => {
                                const isSelected = selected === oi;
                                const isCorrect = oi === prob.correctIndex;
                                let btnClass = "bg-white border-[#DCE7E1] text-[#475569] hover:bg-[#FAF8F5]";
                                if (isRevealed) {
                                  if (isCorrect) btnClass = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold";
                                  else if (isSelected) btnClass = "bg-rose-50 border-rose-500 text-rose-900";
                                } else if (isSelected) {
                                  btnClass = "bg-[#2E6F40]/10 border-[#2E6F40] text-[#2E6F40] font-bold";
                                }

                                return (
                                  <button
                                    key={oi}
                                    onClick={() => handleSelectAnswer(prob.id, oi)}
                                    className={`w-full text-left p-2 rounded-lg border text-xs font-mono transition-all flex items-center justify-between ${btnClass}`}
                                  >
                                    <span>{String.fromCharCode(65 + oi)}. {opt}</span>
                                    {isRevealed && isCorrect && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div className="pt-2 border-t border-[#DCE7E1]">
                            <button
                              onClick={() => togglePractice(prob.id)}
                              className="text-[11px] font-mono font-bold hover:underline"
                              style={{ color: themeColor }}
                            >
                              {isRevealed ? "Hide Explanation" : "Reveal Explanation"}
                            </button>
                            {isRevealed && (
                              <p className="text-[11px] text-[#475569] bg-white p-2.5 rounded-lg border border-[#DCE7E1] mt-2 leading-relaxed">
                                {prob.solution}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}


      {/* ===================================================================== */}
      {/* TAB 4: CHEAT SHEET & TIMING WAVEFORMS                                 */}
      {/* ===================================================================== */}
      {activeTab === "cheatSheet" && (
        <div className="space-y-8">
          {/* Master 7 Gates Summary Matrix */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
            <div className="flex items-center gap-2">
              <Table className="w-5 h-5 text-[#2E6F40]" />
              <h3 className="text-base font-bold text-[#1E293B]">
                All 7 Logic Gates Master Engineering Matrix
              </h3>
            </div>

            <div className="overflow-x-auto border border-[#DCE7E1] rounded-xl">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-[#FAF8F5] border-b border-[#DCE7E1] font-mono">
                    <th className="py-2.5 px-3 font-bold text-[#1E293B]">Gate Name</th>
                    <th className="py-2.5 px-3 font-bold text-[#1E293B]">Symbol / Equation</th>
                    <th className="py-2.5 px-3 font-bold text-[#1E293B]">TTL IC</th>
                    <th className="py-2.5 px-3 font-bold text-[#10B981]">Output HIGH (1) When</th>
                    <th className="py-2.5 px-3 font-bold text-[#EF4444]">Output LOW (0) When</th>
                    <th className="py-2.5 px-3 font-bold text-[#64748B]">Key Silicon Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2F7F4]">
                  {cheatSheet.masterMatrix && cheatSheet.masterMatrix.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF8F5]/60">
                      <td className="py-2.5 px-3 font-bold text-[#1E293B] font-mono">
                        {row.gate}
                        <span className="block text-[10px] font-normal text-[#64748B]">{row.fullName}</span>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-[#2E6F40] font-bold">
                        {row.expression}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[#4F46E5] font-semibold">
                        {row.icNumber}
                      </td>
                      <td className="py-2.5 px-3 text-[#10B981] font-medium text-[11px]">
                        {row.highWhen}
                      </td>
                      <td className="py-2.5 px-3 text-[#EF4444] font-medium text-[11px]">
                        {row.lowWhen}
                      </td>
                      <td className="py-2.5 px-3 text-[#475569] text-[11px] leading-tight">
                        {row.keyRole}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Graphical Pulse Waveform Timing Guide */}
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#4F46E5]" />
                <h3 className="text-base font-bold text-[#1E293B]">
                  {cheatSheet.waveformGuide?.title || "Step-by-Step Graphical Timing Waveform Analysis"}
                </h3>
              </div>

              {/* Methodology 4 Steps */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {cheatSheet.waveformGuide?.methodologySteps?.map((st) => (
                  <div key={st.step} className="p-3 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1.5 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#4F46E5] text-white flex items-center justify-center font-mono text-[10px] font-bold">
                        {st.step}
                      </span>
                      <h5 className="font-bold text-[#1E293B]">{st.title}</h5>
                    </div>
                    <p className="text-[11px] text-[#64748B] leading-relaxed">
                      {st.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Waveform SVG Viewer */}
            {cheatSheet.waveformGuide?.timeIntervals && (
              <TimingWaveformViewer intervals={cheatSheet.waveformGuide.timeIntervals} />
            )}
          </div>

          {/* Top 5 Exam Mistakes in Logic Gates */}
          <div className="p-6 rounded-2xl bg-white border-2 border-[#EF4444]/20 shadow-soft space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
              <h3 className="text-base font-bold text-[#1E293B]">
                Top 5 High-Probability Exam Mistakes in Logic Gates
              </h3>
            </div>
            <p className="text-xs text-[#64748B]">
              Carefully study these five subtle conceptual traps that trip up students during university theory and lab exams:
            </p>

            <div className="space-y-3">
              {cheatSheet.top5ExamMistakes && cheatSheet.top5ExamMistakes.map((err) => (
                <div key={err.id} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                    <h5 className="text-xs font-bold text-[#1E293B]">{err.title}</h5>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                    <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-900 space-y-1">
                      <span className="font-bold text-[10px] uppercase text-rose-700 block">The Trap:</span>
                      <p className="text-[11px] leading-relaxed">{err.trap}</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
                      <span className="font-bold text-[10px] uppercase text-emerald-700 block">The Silicon Reality:</span>
                      <p className="text-[11px] leading-relaxed">{err.reality}</p>
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-[#DCE7E1] text-[11px] font-mono text-[#2E6F40] font-bold">
                    Golden Rule: {err.ruleToRemember}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
