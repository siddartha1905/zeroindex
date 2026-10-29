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
  Activity,
  Sliders,
  Maximize2,
  RefreshCw,
  GitMerge,
  Lightbulb,
  Check,
  ArrowRightLeft,
  Eye,
  Filter,
  CheckCircle,
  Hash
} from 'lucide-react';
import { dldSection27Data } from '../data/dldSection27Data';
import ConnectedCircuitViewer from './ConnectedCircuitViewer';

/**
 * Section 2.7 View: NAND and NOR Implementation
 * Strict Zero-Dash formatting: strictly zero em-dashes and zero en-dashes throughout.
 * All formulas use actual Unicode mathematical symbols: \u03A3 (Sigma) and \u03A0 (Pi).
 */

/**
 * Standard ANSI/IEEE SVG Logic Gate Symbol
 */
const SvgGateSymbol = ({ type = 'NAND', width = 135, height = 65, label = '', showBubble = true }) => {
  const strokeColor = '#285C49';
  const fillColor = '#FAF8F5';
  const bubbleColor = '#285C49';

  return (
    <svg 
      viewBox="-30 -5 135 50" 
      width={width} 
      height={height} 
      className="inline-block overflow-visible"
    >
      {/* Input stubs and labels */}
      {type === 'NOT' ? (
        <>
          <text x="-16" y="24" textAnchor="end" fontSize="11" fontFamily="monospace" fontWeight="bold" fill="#1E293B">A</text>
          <line x1="-10" y1="20" x2="10" y2="20" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <text x="-16" y="14" textAnchor="end" fontSize="11" fontFamily="monospace" fontWeight="bold" fill="#1E293B">A</text>
          <line x1="-10" y1="10" x2="10" y2="10" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
          <text x="-16" y="34" textAnchor="end" fontSize="11" fontFamily="monospace" fontWeight="bold" fill="#1E293B">B</text>
          <line x1="-10" y1="30" x2="10" y2="30" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
        </>
      )}

      {/* Gate Bodies */}
      {(type === 'AND' || type === 'NAND') && (
        <path
          d="M 10,5 L 35,5 A 15,15 0 0 1 35,35 L 10,35 Z"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="2"
        />
      )}

      {(type === 'OR' || type === 'NOR') && (
        <path
          d="M 10,5 Q 22,20 10,35 Q 36,35 48,20 Q 36,5 10,5 Z"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="2"
        />
      )}

      {type === 'NOT' && (
        <polygon
          points="10,5 42,20 10,35"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="2"
        />
      )}

      {(type === 'XOR' || type === 'XNOR') && (
        <>
          <path
            d="M 5,5 Q 17,20 5,35"
            fill="none"
            stroke={strokeColor}
            strokeWidth="2"
          />
          <path
            d="M 12,5 Q 24,20 12,35 Q 38,35 50,20 Q 38,5 12,5 Z"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="2"
          />
        </>
      )}

      {/* Inversion Bubbles */}
      {showBubble && (type === 'NAND' || type === 'NOR' || type === 'NOT' || type === 'XNOR') && (
        <circle
          cx={type === 'NOT' ? 47 : (type === 'NOR' ? 53 : (type === 'XNOR' ? 55 : 49))}
          cy="20"
          r="4"
          fill="white"
          stroke={bubbleColor}
          strokeWidth="2"
        />
      )}

      {/* Output stub and label */}
      <line 
        x1={
          type === 'NOT' ? 52 : 
          (type === 'NOR' ? 58 : 
          (type === 'XNOR' ? 60 : 
          (type === 'NAND' ? 54 : 
          (type === 'XOR' ? 51 : (type === 'OR' ? 49 : 51)))))
        } 
        y1="20" 
        x2="80" 
        y2="20" 
        stroke="#475569" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      <text x="88" y="24" textAnchor="start" fontSize="12" fontFamily="monospace" fontWeight="bold" fill="#166534">F</text>

      {/* Gate Name Label Inside or Above */}
      {label && (
        <text
          x={type === 'NOT' ? "24" : "28"}
          y="23"
          textAnchor="middle"
          fontSize="9"
          fontFamily="monospace"
          fontWeight="bold"
          fill="#1E293B"
        >
          {label}
        </text>
      )}
    </svg>
  );
};

export const Section27View = () => {
  const [activeTab, setActiveTab] = useState('all-seven-gates');

  // Tab 1: All Seven Gates Filter
  const [gateFamilyFilter, setGateFamilyFilter] = useState('All');

  // Tab 3: Gate Realisation Selection State
  const [realisationFamily, setRealisationFamily] = useState('NAND'); // 'NAND' or 'NOR'
  const [selectedTargetGate, setSelectedTargetGate] = useState('nand-and'); // id of target gate

  // Tab 4: Standard Realisations Active Demo
  const [activeStandardDemo, setActiveStandardDemo] = useState('std-1');

  // Tab 5: Multi-Level Guided Example State
  const [activeMlEx, setActiveMlEx] = useState('ml-ex1');
  const [mlStageIndex, setMlStageIndex] = useState(0);

  // Tab 6: Worked Examples State
  const [weFilter, setWeFilter] = useState('All');
  const [activeWeId, setActiveWeId] = useState('WE-01');

  // Tab 8: Practice Questions State
  const [revealedHints, setRevealedHints] = useState({});
  const [revealedSolutions, setRevealedSolutions] = useState({});
  const [pqDifficultyFilter, setPqDifficultyFilter] = useState('All');

  const toggleHint = (id) => {
    setRevealedHints(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSolution = (id) => {
    setRevealedSolutions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // 8 Exact Tabs defined in user requirements
  const tabs = [
    { id: 'all-seven-gates', label: '1. All Seven Logic Gates', icon: Cpu },
    { id: 'why-universal', label: '2. Why NAND/NOR Universal', icon: ShieldCheck },
    { id: 'gate-realisation', label: '3. Gate Realisation (12)', icon: Layers },
    { id: 'standard-realisations', label: '4. Standard Realisations', icon: GitMerge },
    { id: 'multi-level', label: '5. Multi-Level Implementation', icon: Activity },
    { id: 'worked-examples', label: '6. Worked Examples (11)', icon: BookOpen },
    { id: 'master-cheat-sheet', label: '7. Master Cheat Sheet', icon: Zap },
    { id: 'practice-questions', label: '8. Practice Lab (10)', icon: HelpCircle }
  ];

  // Tab 1 filtered gates
  const filteredSevenGates = dldSection27Data.sevenGates.filter(g => {
    if (gateFamilyFilter === 'All') return true;
    return g.family === gateFamilyFilter;
  });

  // Tab 3 active realisation list and object
  const activeFamilyRealisations = realisationFamily === 'NAND' 
    ? dldSection27Data.gateRealisations.nandOnly 
    : dldSection27Data.gateRealisations.norOnly;

  const currentRealisation = activeFamilyRealisations.find(r => r.id === selectedTargetGate) 
    || activeFamilyRealisations[0];

  // Tab 5 active multi-level example
  const currentMlData = dldSection27Data.multiLevelTheory.guidedExamples.find(e => e.id === activeMlEx) 
    || dldSection27Data.multiLevelTheory.guidedExamples[0];

  // Tab 6 filtered worked examples
  const filteredWorkedExamples = dldSection27Data.workedExamples.filter(we => {
    if (weFilter === 'All') return true;
    return we.category === weFilter;
  });

  const activeWorkedExample = dldSection27Data.workedExamples.find(we => we.id === activeWeId) 
    || dldSection27Data.workedExamples[0];

  // Tab 8 filtered practice questions
  const filteredPracticeQuestions = dldSection27Data.practiceQuestions.filter(q => {
    if (pqDifficultyFilter === 'All') return true;
    return q.difficulty === pqDifficultyFilter;
  });

  return (
    <div className="space-y-6 text-slate-800 text-left">
      {/* 1. Header Section */}
      <div className="p-6 md:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#EBF3ED] text-[#285C49] border border-[#DCE7E1]">
                Unit 2.7
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-[#FAF8F5] text-slate-600 border border-[#DCE7E1]">
                {dldSection27Data.badge}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                {dldSection27Data.status}
              </span>
            </div>
            <h1 className="font-editorial text-2xl md:text-3xl font-bold text-[#1E293B] tracking-tight">
              {dldSection27Data.title}
            </h1>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 bg-[#FAF8F5] px-3 py-1.5 rounded-xl border border-[#DCE7E1]">
            <Clock className="w-4 h-4 text-[#285C49]" />
            <span>{dldSection27Data.estimatedReadTime}</span>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed max-w-4xl">
          {dldSection27Data.overview}
        </p>

        {/* 6 Structured Introductory Bullets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {dldSection27Data.introductoryBullets.map((bullet, idx) => (
            <div 
              key={idx}
              className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1 hover:border-[#CBD5E1] transition-all"
            >
              <div className="font-mono text-[11px] font-bold text-[#285C49] tracking-wider uppercase">
                {bullet.label}
              </div>
              <p className="text-xs text-slate-700 leading-snug">
                {bullet.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Responsive 8-Tab Navigation Bar (Approved Section 2.5/2.6 layout: 0 horizontal dragging) */}
      <nav 
        aria-label="Section navigation"
        className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 p-1.5 bg-[#FAF8F5] border border-[#DCE7E1] rounded-2xl shadow-2xs"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center gap-1.5 px-2 py-2 sm:py-2.5 rounded-xl font-mono text-xs font-semibold text-center transition-all cursor-pointer leading-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-[#285C49] ${
                isActive
                  ? 'bg-white text-[#285C49] shadow-xs border border-[#DCE7E1] font-bold ring-1 ring-[#285C49]/20'
                  : 'text-[#5F6C64] hover:text-[#1E293B] hover:bg-white/60'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-[#285C49]' : 'text-[#8C9A90]'}`} />
              <span className="text-center">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* ------------------------------------------------------------------ */}
      {/* TAB 1: ALL SEVEN LOGIC GATES                                       */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'all-seven-gates' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white border border-[#DCE7E1] rounded-2xl shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                Filter Gate Families:
              </span>
              {['All', 'Basic', 'Universal', 'Exclusive'].map(fam => (
                <button
                  key={fam}
                  onClick={() => setGateFamilyFilter(fam)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                    gateFamilyFilter === fam
                      ? 'bg-[#285C49] text-white shadow-2xs font-bold'
                      : 'bg-[#FAF8F5] text-slate-600 border border-[#DCE7E1] hover:bg-slate-100'
                  }`}
                >
                  {fam}
                </button>
              ))}
            </div>
            <div className="text-xs font-mono text-slate-500">
              Showing {filteredSevenGates.length} of 7 Standard Gates
            </div>
          </div>

          {/* Gates List */}
          <div className="grid grid-cols-1 gap-5">
            {filteredSevenGates.map(gate => (
              <div 
                key={gate.id} 
                className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4 hover:border-[#CBD5E1] transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DCE7E1] pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#285C49]" />
                    <h3 className="font-editorial text-lg font-bold text-[#1E293B]">
                      {gate.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold ${
                      gate.family === 'Universal' 
                        ? 'bg-purple-100 text-purple-800 border border-purple-200' 
                        : (gate.family === 'Basic' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-blue-100 text-blue-800 border border-blue-200')
                    }`}>
                      {gate.family} Gate Family
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#DCE7E1] text-[11px] font-mono font-semibold text-slate-600">
                      {gate.inputs.length} Input{gate.inputs.length > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Left: Logic Gate SVG Symbol with Label */}
                  <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-[#FAF8F5] rounded-xl border border-[#CBD5E1]">
                    <div className="text-[11px] font-mono font-bold text-slate-600 uppercase tracking-wider mb-2 self-start">
                      Logic Gate
                    </div>
                    <SvgGateSymbol 
                      type={gate.symbolType} 
                      width={135} 
                      height={65} 
                      label={gate.symbolType} 
                    />
                    <span className="text-[11px] font-mono text-slate-500 mt-2">
                      ANSI/IEEE Standard Symbol
                    </span>
                  </div>

                  {/* Center: Expression and Operation with Label */}
                  <div className="md:col-span-4 space-y-3">
                    <div className="p-3 bg-[#FAF8F5] border border-[#CBD5E1] rounded-xl space-y-1">
                      <div className="text-[11px] font-mono font-bold text-slate-600 uppercase tracking-wider">
                        Boolean Expression
                      </div>
                      <div className="font-mono text-lg font-bold text-[#1E293B] py-1 text-center bg-white rounded-lg border border-[#DCE7E1]">
                        {gate.expression}
                      </div>
                      <div className="text-[11px] font-mono text-slate-600 text-center pt-0.5">
                        Operator: {gate.operatorSymbol}
                      </div>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {gate.operation}
                    </p>
                  </div>

                  {/* Right: Truth Table with Label */}
                  <div className="md:col-span-4 space-y-1.5">
                    <div className="text-[11px] font-mono font-bold text-slate-600 uppercase tracking-wider">
                      Truth Table
                    </div>
                    <div className="overflow-x-auto rounded-xl border border-slate-700 bg-white shadow-2xs">
                      <table className="w-full text-xs font-mono text-center">
                        <thead className="bg-slate-800 text-white font-bold">
                          <tr>
                            <th className="py-2 px-3 border-r border-slate-700 text-slate-100">A</th>
                            {gate.inputs.includes('B') && (
                              <th className="py-2 px-3 border-r border-slate-700 text-slate-100">B</th>
                            )}
                            <th className="py-2 px-3 bg-[#164e39] text-emerald-300 font-bold">F</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {gate.truthTable.map((row, rIdx) => (
                            <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                              <td className="py-1.5 px-3 border-r border-slate-200 text-slate-700 font-semibold">{row.A}</td>
                              {gate.inputs.includes('B') && (
                                <td className="py-1.5 px-3 border-r border-slate-200 text-slate-700 font-semibold">{row.B}</td>
                              )}
                              <td className={`py-1.5 px-3 font-bold ${row.F === 1 ? 'text-[#166534] bg-emerald-50' : 'text-slate-600'}`}>
                                {row.F}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Practical Relatable Example */}
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#DCE7E1] text-xs text-slate-700 flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">Practical Real-World Example:</strong> {gate.practicalExample}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* TAB 2: WHY NAND AND NOR ARE UNIVERSAL                              */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'why-universal' && (
        <div className="space-y-6">
          {/* Central Concept Prominent Banner */}
          <div className="p-6 rounded-2xl bg-[#EBF3ED] border-2 border-[#285C49] space-y-2 shadow-2xs">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#285C49]">
              Core Universality Principle
            </span>
            <h2 className="font-editorial text-xl md:text-2xl font-bold text-[#1E293B] leading-snug">
              "{dldSection27Data.universalFoundations.centralConcept}"
            </h2>
            <p className="text-xs md:text-sm text-slate-700 leading-relaxed pt-1">
              {dldSection27Data.universalFoundations.simpleExplanation}
            </p>
          </div>

          {/* Academic Definitions Comparison */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <h3 className="font-editorial text-lg font-bold text-[#1E293B]">
              Functional Completeness (Universality) Definition
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                <span className="font-mono text-xs font-bold text-[#285C49] uppercase tracking-wider">
                  Simple Definition
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {dldSection27Data.universalFoundations.simpleDefinition}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                <span className="font-mono text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Formal Mathematical Definition
                </span>
                <p className="text-xs text-slate-700 leading-relaxed font-mono">
                  {dldSection27Data.universalFoundations.formalDefinition}
                </p>
              </div>
            </div>
          </div>

          {/* Side-by-side Proofs: NAND vs NOR */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Why NAND is Universal */}
            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
              <div className="flex items-center gap-2 border-b border-[#DCE7E1] pb-3">
                <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-purple-100 text-purple-800">
                  NAND Alone
                </span>
                <h4 className="font-editorial text-base font-bold text-[#1E293B]">
                  {dldSection27Data.universalFoundations.whyNandUniversal.title}
                </h4>
              </div>
              <p className="text-xs text-slate-600">
                {dldSection27Data.universalFoundations.whyNandUniversal.summary}
              </p>
              <div className="space-y-3">
                {dldSection27Data.universalFoundations.whyNandUniversal.steps.map((st, sIdx) => (
                  <div key={sIdx} className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#285C49]">
                        Target: {st.target}
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-[#DCE7E1]">
                        {st.formula}
                      </span>
                    </div>
                    {st.circuit && (
                      <div className="py-1">
                        <ConnectedCircuitViewer circuit={st.circuit} compact={true} />
                      </div>
                    )}
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {st.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Why NOR is Universal */}
            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
              <div className="flex items-center gap-2 border-b border-[#DCE7E1] pb-3">
                <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-blue-100 text-blue-800">
                  NOR Alone
                </span>
                <h4 className="font-editorial text-base font-bold text-[#1E293B]">
                  {dldSection27Data.universalFoundations.whyNorUniversal.title}
                </h4>
              </div>
              <p className="text-xs text-slate-600">
                {dldSection27Data.universalFoundations.whyNorUniversal.summary}
              </p>
              <div className="space-y-3">
                {dldSection27Data.universalFoundations.whyNorUniversal.steps.map((st, sIdx) => (
                  <div key={sIdx} className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#285C49]">
                        Target: {st.target}
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-[#DCE7E1]">
                        {st.formula}
                      </span>
                    </div>
                    {st.circuit && (
                      <div className="py-1">
                        <ConnectedCircuitViewer circuit={st.circuit} compact={true} />
                      </div>
                    )}
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {st.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Practical Importance and Technology Nuances */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <h4 className="font-editorial text-base font-bold text-[#1E293B]">
              {dldSection27Data.universalFoundations.practicalImportance.title}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dldSection27Data.universalFoundations.practicalImportance.aspects.map((asp, aIdx) => (
                <div key={aIdx} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1.5">
                  <span className="font-mono text-xs font-bold text-slate-800">
                    {asp.heading}
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {asp.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Advanced Hardware Implementation at the End */}
          {dldSection27Data.universalFoundations.hardwareImplementation && (
            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
              <div className="flex items-center gap-2 border-b border-[#DCE7E1] pb-3">
                <Cpu className="w-4 h-4 text-[#285C49]" />
                <h4 className="font-editorial text-base font-bold text-[#1E293B]">
                  {dldSection27Data.universalFoundations.hardwareImplementation.title}
                </h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {dldSection27Data.universalFoundations.hardwareImplementation.points.map((pt, pIdx) => (
                  <div key={pIdx} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1.5">
                    <span className="font-mono text-xs font-bold text-slate-800">
                      {pt.heading}
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {pt.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Practical Relatable Scenarios */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <h4 className="font-editorial text-base font-bold text-[#1E293B]">
              Practical Engineering Scenarios
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {dldSection27Data.universalFoundations.practicalScenarios.map((sc, sIdx) => (
                <div key={sIdx} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2.5 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="font-mono text-xs font-bold text-[#285C49]">
                      {sc.title}
                    </span>
                    <div className="p-2 rounded bg-white border border-[#DCE7E1] font-mono text-[11px] text-slate-700">
                      {sc.function}
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {sc.nandImplementation || sc.norImplementation || sc.mixedImplementation}
                    </p>
                  </div>
                  <div className="text-[11px] font-mono text-[#285C49] font-semibold bg-emerald-50 p-2 rounded border border-emerald-100">
                    Key takeaway: {sc.takeaway}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* TAB 3: GATE REALISATION USING NAND / NOR (TWO-LEVEL SELECTION)     */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'gate-realisation' && (
        <div className="space-y-6">
          {/* Level 1 Selector: Family Selection */}
          <div className="p-5 bg-white border border-[#DCE7E1] rounded-2xl shadow-2xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                Step 1: Choose Universal Gate Family:
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setRealisationFamily('NAND');
                    setSelectedTargetGate('nand-and');
                  }}
                  className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    realisationFamily === 'NAND'
                      ? 'bg-[#285C49] text-white shadow-2xs'
                      : 'bg-[#FAF8F5] text-slate-700 border border-[#DCE7E1] hover:bg-slate-100'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>NAND Only Family</span>
                </button>
                <button
                  onClick={() => {
                    setRealisationFamily('NOR');
                    setSelectedTargetGate('nor-and');
                  }}
                  className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    realisationFamily === 'NOR'
                      ? 'bg-[#285C49] text-white shadow-2xs'
                      : 'bg-[#FAF8F5] text-slate-700 border border-[#DCE7E1] hover:bg-slate-100'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>NOR Only Family</span>
                </button>
              </div>
            </div>

            {/* Level 2 Selector: 6 Target Gates */}
            <div className="space-y-2 pt-2 border-t border-[#DCE7E1]">
              <span className="font-mono text-xs font-bold text-slate-600">
                Step 2: Select Target Gate to Synthesize:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {activeFamilyRealisations.map(r => {
                  const isSelected = r.id === currentRealisation.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setSelectedTargetGate(r.id)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer space-y-1 ${
                        isSelected
                          ? 'bg-[#FAF8F5] border-[#285C49] ring-2 ring-[#285C49]/20 shadow-xs'
                          : 'bg-white border-[#DCE7E1] hover:border-slate-300'
                      }`}
                    >
                      <div className="font-mono text-xs font-bold text-slate-800">
                        {r.targetGate}
                      </div>
                      <div className="font-mono text-[11px] text-[#285C49]">
                        {r.targetFunction}
                      </div>
                      <div className="text-[10px] font-mono text-slate-500">
                        {r.gateCount} Gate{r.gateCount > 1 ? 's' : ''} | {r.logicDepth} Level{r.logicDepth > 1 ? 's' : ''}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Realisation Detail Card (ONLY selected gate shown below) */}
          <div className="p-6 md:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE7E1] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#285C49]">
                    Synthesis Target:
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#EBF3ED] text-[#285C49] border border-[#DCE7E1]">
                    {realisationFamily} Only
                  </span>
                </div>
                <h3 className="font-editorial text-xl font-bold text-[#1E293B] mt-1">
                  Synthesizing {currentRealisation.targetGate} using {realisationFamily} Gates
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="font-mono text-sm font-bold text-[#285C49]">
                    {currentRealisation.gateCount} Gate{currentRealisation.gateCount > 1 ? 's' : ''}
                  </div>
                  <div className="text-[11px] font-mono text-slate-500">
                    Depth: {currentRealisation.logicDepth} Level{currentRealisation.logicDepth > 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            </div>

            {/* Circuit Diagram + Equations Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left: Circuit Schematic */}
              <div className="lg:col-span-6 p-5 bg-[#FAF8F5] rounded-2xl border border-[#DCE7E1] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-600">
                    Logic Gate Network Diagram
                  </span>
                  <span className="font-mono text-[11px] text-slate-500">
                    2-Input {realisationFamily} Library
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#DCE7E1]">
                  <ConnectedCircuitViewer circuit={currentRealisation.circuit} />
                </div>
                <div className="text-[11px] font-mono text-slate-500 text-center">
                  All gates are 2-input {realisationFamily}. Primary inputs A, B are uncomplemented.
                </div>
              </div>

              {/* Right: Step-by-Step Derivation and Node Equations */}
              <div className="lg:col-span-6 space-y-4">
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                  <span className="font-mono text-xs font-bold text-slate-600">
                    Intermediate Node Equations:
                  </span>
                  <div className="space-y-1">
                    {currentRealisation.equations.map((eq, eIdx) => (
                      <div key={eIdx} className="font-mono text-xs text-[#285C49] font-bold bg-white p-2 rounded border border-[#DCE7E1]">
                        {eq}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-xs font-bold text-slate-600">
                    Step-by-Step Mathematical Derivation:
                  </span>
                  <ul className="space-y-1.5">
                    {currentRealisation.stepDerivation.map((st, sIdx) => (
                      <li key={sIdx} className="text-xs text-slate-700 leading-relaxed flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#285C49] flex-shrink-0 mt-1.5" />
                        <span>{st}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] text-xs text-slate-700">
                  <strong>Why it works:</strong> {currentRealisation.explanation}
                </div>
              </div>
            </div>

            {/* Truth Table Verification */}
            <div className="space-y-2 pt-2 border-t border-[#DCE7E1]">
              <span className="font-mono text-xs font-bold text-slate-600">
                Complete State Verification Table:
              </span>
              <div className="overflow-x-auto rounded-xl border border-[#DCE7E1]">
                <table className="w-full text-xs font-mono text-center">
                  <thead className="bg-[#FAF8F5] border-b border-[#DCE7E1] font-bold text-slate-700">
                    <tr>
                      <th className="py-2 px-3 border-r border-[#DCE7E1]">Input A</th>
                      <th className="py-2 px-3 border-r border-[#DCE7E1]">Input B</th>
                      {Object.keys(currentRealisation.truthTable[0] || {})
                        .filter(k => k !== 'A' && k !== 'B' && k !== 'F')
                        .map(k => (
                          <th key={k} className="py-2 px-3 border-r border-[#DCE7E1] text-slate-600">
                            Node {k}
                          </th>
                        ))}
                      <th className="py-2 px-3 text-[#285C49] font-bold">
                        Output F ({currentRealisation.targetGate})
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DCE7E1]">
                    {currentRealisation.truthTable.map((row, rIdx) => {
                      const interKeys = Object.keys(row).filter(k => k !== 'A' && k !== 'B' && k !== 'F');
                      return (
                        <tr key={rIdx} className="hover:bg-slate-50">
                          <td className="py-1.5 px-3 border-r border-[#DCE7E1]">{row.A}</td>
                          <td className="py-1.5 px-3 border-r border-[#DCE7E1]">{row.B}</td>
                          {interKeys.map(k => (
                            <td key={k} className="py-1.5 px-3 border-r border-[#DCE7E1] text-slate-600">
                              {row[k]}
                            </td>
                          ))}
                          <td className={`py-1.5 px-3 font-bold ${row.F === 1 ? 'text-[#285C49] bg-emerald-50/50' : 'text-slate-500'}`}>
                            {row.F}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* TAB 4: STANDARD REALISATIONS                                       */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'standard-realisations' && (
        <div className="space-y-6">
          {/* Selector Strip */}
          <div className="p-4 bg-white border border-[#DCE7E1] rounded-2xl shadow-2xs space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
              Select Standard Realisation Demonstration:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {dldSection27Data.standardRealisations.map(demo => (
                <button
                  key={demo.id}
                  onClick={() => setActiveStandardDemo(demo.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer space-y-1 ${
                    activeStandardDemo === demo.id
                      ? 'bg-[#FAF8F5] border-[#285C49] ring-2 ring-[#285C49]/20 shadow-xs'
                      : 'bg-white border-[#DCE7E1] hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold text-[#285C49]">
                      {demo.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {demo.gateCount} Gates
                    </span>
                  </div>
                  <div className="font-mono text-xs font-bold text-slate-800">
                    {demo.expression}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Demo Display */}
          {(() => {
            const demo = dldSection27Data.standardRealisations.find(d => d.id === activeStandardDemo) 
              || dldSection27Data.standardRealisations[0];
            return (
              <div className="p-6 md:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DCE7E1] pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#285C49] uppercase tracking-wider">
                      {demo.category}
                    </span>
                    <h3 className="font-editorial text-xl font-bold text-[#1E293B] mt-0.5">
                      {demo.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] font-mono text-xs font-bold text-slate-700">
                      {demo.gateFamily}
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 font-mono text-xs font-bold text-[#285C49]">
                      {demo.gateCount} Gates | {demo.logicDepth} Levels
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Steps */}
                  <div className="space-y-3">
                    <span className="font-mono text-xs font-bold text-slate-600">
                      Step-by-Step Conversion Procedure:
                    </span>
                    <ol className="space-y-2">
                      {demo.steps.map((st, sIdx) => (
                        <li key={sIdx} className="text-xs text-slate-700 leading-relaxed flex items-start gap-2">
                          <span className="font-mono font-bold text-[#285C49] flex-shrink-0">
                            {sIdx + 1}.
                          </span>
                          <span>{st}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Nodes & Takeaway */}
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                      <span className="font-mono text-xs font-bold text-slate-600">
                        Intermediate Net Equations:
                      </span>
                      <div className="space-y-1.5">
                        {demo.nodes.map((n, nIdx) => (
                          <div key={nIdx} className="flex items-center justify-between p-2 rounded bg-white border border-[#DCE7E1] text-xs font-mono">
                            <span className="font-bold text-[#285C49]">{n.equation}</span>
                            <span className="text-slate-500 text-[11px]">{n.type}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] text-xs text-slate-700 space-y-1">
                      <strong className="text-slate-800">Key Engineering Principle:</strong>
                      <p className="leading-relaxed">{demo.takeaway}</p>
                    </div>
                  </div>
                </div>

                {/* Physically Connected Logic Circuit Schematic */}
                {demo.circuit && (
                  <div className="space-y-2 pt-2 border-t border-[#DCE7E1]">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-600">
                      Physically Connected Logic Circuit Schematic:
                    </span>
                    <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#DCE7E1]">
                      <ConnectedCircuitViewer circuit={demo.circuit} />
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* TAB 5: MULTI-LEVEL IMPLEMENTATION                                  */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'multi-level' && (
        <div className="space-y-6">
          {/* Theory Overview */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <h3 className="font-editorial text-lg font-bold text-[#1E293B]">
              Multi-Level Logic Synthesis Foundations
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {dldSection27Data.multiLevelTheory.overview}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {dldSection27Data.multiLevelTheory.keyConcepts.map((kc, kIdx) => (
                <div key={kIdx} className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1">
                  <div className="font-mono text-xs font-bold text-[#285C49]">
                    {kc.concept}
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {kc.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Guided Example Selector */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DCE7E1] pb-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                Select Guided Multi-Level Demonstration:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {dldSection27Data.multiLevelTheory.guidedExamples.map(ex => (
                  <button
                    key={ex.id}
                    onClick={() => {
                      setActiveMlEx(ex.id);
                      setMlStageIndex(0);
                    }}
                    className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                      activeMlEx === ex.id
                        ? 'bg-[#285C49] text-white shadow-2xs'
                        : 'bg-[#FAF8F5] text-slate-700 border border-[#DCE7E1] hover:bg-slate-100'
                    }`}
                  >
                    {ex.expression}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Guided Example Display */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h4 className="font-editorial text-lg font-bold text-[#1E293B]">
                    {currentMlData.title}
                  </h4>
                  <div className="text-xs font-mono text-slate-500 mt-0.5">
                    {currentMlData.gateFamily}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-mono font-bold text-[#285C49]">
                    Total Gates: {currentMlData.totalGates}
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-blue-50 border border-blue-200 text-xs font-mono font-bold text-blue-800">
                    Logic Depth: {currentMlData.logicDepth} Levels
                  </span>
                </div>
              </div>

              {/* Stage Progress Bar */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-700">
                    Guided Construction Stage {mlStageIndex + 1} of {currentMlData.stages.length}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setMlStageIndex(prev => Math.max(0, prev - 1))}
                      disabled={mlStageIndex === 0}
                      className="px-3 py-1 rounded-lg bg-white border border-[#DCE7E1] text-xs font-mono font-bold disabled:opacity-40 cursor-pointer"
                    >
                      Previous Stage
                    </button>
                    <button
                      onClick={() => setMlStageIndex(prev => Math.min(currentMlData.stages.length - 1, prev + 1))}
                      disabled={mlStageIndex === currentMlData.stages.length - 1}
                      className="px-3 py-1 rounded-lg bg-[#285C49] text-white text-xs font-mono font-bold disabled:opacity-40 cursor-pointer shadow-2xs"
                    >
                      Next Stage
                    </button>
                    <button
                      onClick={() => setMlStageIndex(currentMlData.stages.length - 1)}
                      className="px-3 py-1 rounded-lg bg-white border border-[#DCE7E1] text-xs font-mono font-semibold text-slate-600 cursor-pointer hover:bg-slate-50"
                    >
                      Show Complete Circuit
                    </button>
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="grid grid-cols-4 gap-2">
                  {currentMlData.stages.map((st, sIdx) => (
                    <div 
                      key={sIdx}
                      onClick={() => setMlStageIndex(sIdx)}
                      className={`h-2 rounded-full cursor-pointer transition-all ${
                        sIdx <= mlStageIndex ? 'bg-[#285C49]' : 'bg-[#DCE7E1]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Active Stage Detail */}
              {(() => {
                const stage = currentMlData.stages[mlStageIndex];
                return (
                  <div className="p-5 rounded-xl border border-[#DCE7E1] bg-white space-y-3 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#285C49]">
                        {stage.title}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#DCE7E1] text-[11px] font-mono text-slate-600">
                        Active Level: {stage.activeLevel}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[11px] font-mono font-bold text-slate-500 uppercase">
                        Gates Introduced in this Stage:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {stage.gatesAdded.map((g, gIdx) => (
                          <span key={gIdx} className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] font-mono text-xs font-bold text-[#285C49]">
                            {g}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed">
                      {stage.explanation}
                    </p>
                  </div>
                );
              })()}

              {/* Progressive Circuit Schematic */}
              {currentMlData.circuit && (
                <div className="p-4 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#285C49]">
                      Progressive Circuit Schematic (Active Stage Highlighted in Emerald):
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      Stage {mlStageIndex + 1} of {currentMlData.stages.length}
                    </span>
                  </div>
                  <ConnectedCircuitViewer 
                    circuit={currentMlData.circuit} 
                    activeStageIndex={mlStageIndex} 
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* TAB 6: WORKED EXAMPLES (APPROVED SECTION 2.6 STYLE)               */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'worked-examples' && (
        <div className="space-y-6">
          {/* Category Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white border border-[#DCE7E1] rounded-2xl shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                Filter Worked Models:
              </span>
              {['All', 'NAND', 'NOR', 'Mixed', 'Multi-Level'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setWeFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                    weFilter === cat
                      ? 'bg-[#285C49] text-white shadow-2xs font-bold'
                      : 'bg-[#FAF8F5] text-slate-600 border border-[#DCE7E1] hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="text-xs font-mono text-slate-500">
              Showing {filteredWorkedExamples.length} of 11 Solved Models
            </div>
          </div>

          {/* Compact Example Selection Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {filteredWorkedExamples.map(we => {
              const isSelected = we.id === activeWorkedExample.id;
              return (
                <button
                  key={we.id}
                  onClick={() => setActiveWeId(we.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer space-y-1 ${
                    isSelected
                      ? 'bg-[#FAF8F5] border-[#285C49] ring-2 ring-[#285C49]/20 shadow-xs'
                      : 'bg-white border-[#DCE7E1] hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold text-[#285C49]">
                      {we.id}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {we.category}
                    </span>
                  </div>
                  <div className="font-mono text-xs font-bold text-slate-800 truncate">
                    {we.givenExpression}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500">
                    {we.gateCount} Gates | {we.logicLevels} Levels
                  </div>
                </button>
              );
            })}
          </div>

          {/* Single Detailed Active Example (Approved Section 2.6 pattern) */}
          <div className="p-6 md:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE7E1] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#285C49]">
                    {activeWorkedExample.id}: {activeWorkedExample.number}
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-[#FAF8F5] border border-[#DCE7E1] text-slate-700">
                    {activeWorkedExample.category}
                  </span>
                </div>
                <h3 className="font-editorial text-xl font-bold text-[#1E293B] mt-1">
                  {activeWorkedExample.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 font-mono text-xs font-bold text-[#285C49]">
                  {activeWorkedExample.gateCount} Physical Gates
                </span>
                <span className="px-3 py-1 rounded-lg bg-blue-50 border border-blue-200 font-mono text-xs font-bold text-blue-800">
                  {activeWorkedExample.logicLevels} Logic Levels
                </span>
              </div>
            </div>

            {/* Problem Statement Box */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
              <span className="font-mono text-xs font-bold text-slate-500 uppercase tracking-wider">
                Problem Statement:
              </span>
              <p className="text-sm font-bold text-slate-800 leading-relaxed font-mono">
                {activeWorkedExample.problemStatement}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-600 pt-1">
                <span>Given: <strong>{activeWorkedExample.givenExpression}</strong></span>
                <span>Requirement: <strong>{activeWorkedExample.requiredRealisation}</strong></span>
              </div>
            </div>

            {/* Derivation Steps */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                Step-by-Step Boolean Transformation:
              </h4>
              <ol className="space-y-2">
                {activeWorkedExample.derivationSteps.map((step, sIdx) => (
                  <li key={sIdx} className="text-xs text-slate-700 leading-relaxed flex items-start gap-2">
                    <span className="font-mono font-bold text-[#285C49] flex-shrink-0">
                      {sIdx + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Connected Circuit Diagram */}
            {activeWorkedExample.circuit && (
              <div className="space-y-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-600">
                  Physically Connected Logic Circuit Diagram:
                </span>
                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#DCE7E1]">
                  <ConnectedCircuitViewer circuit={activeWorkedExample.circuit} />
                </div>
              </div>
            )}

            {/* Intermediate Node Interpretation Table */}
            <div className="space-y-2">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                Intermediate Node Definitions:
              </h4>
              <div className="overflow-x-auto rounded-xl border border-[#DCE7E1]">
                <table className="w-full text-xs font-mono text-left">
                  <thead className="bg-[#FAF8F5] border-b border-[#DCE7E1] font-bold text-slate-700">
                    <tr>
                      <th className="py-2 px-3 border-r border-[#DCE7E1]">Signal / Net</th>
                      <th className="py-2 px-3 border-r border-[#DCE7E1]">Boolean Equation</th>
                      <th className="py-2 px-3 border-r border-[#DCE7E1]">Level</th>
                      <th className="py-2 px-3 text-[#285C49]">Circuit Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DCE7E1]">
                    {activeWorkedExample.intermediateNodes.map((n, nIdx) => (
                      <tr key={nIdx} className="hover:bg-slate-50">
                        <td className="py-1.5 px-3 font-bold border-r border-[#DCE7E1] text-[#285C49]">{n.net}</td>
                        <td className="py-1.5 px-3 border-r border-[#DCE7E1] font-semibold text-slate-800">{n.equation}</td>
                        <td className="py-1.5 px-3 border-r border-[#DCE7E1] text-slate-500">{n.level}</td>
                        <td className="py-1.5 px-3 text-slate-600">{n.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Verification and Final Result */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] text-xs space-y-1">
                <span className="font-mono font-bold text-slate-600 uppercase tracking-wider">
                  Truth Table Verification Note:
                </span>
                <p className="text-slate-700 leading-relaxed">
                  {activeWorkedExample.verificationNote}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] flex flex-col justify-between space-y-2">
                <span className="font-mono text-xs font-bold text-[#166534] uppercase tracking-wider">
                  Verified Final Implementation:
                </span>
                <div className="font-mono text-sm font-bold text-[#166534]">
                  {activeWorkedExample.finalAnswer}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* TAB 7: MASTER CHEAT SHEET                                          */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'master-cheat-sheet' && (
        <div className="space-y-6">
          {/* Printable Resource Card */}
          <div className="p-6 md:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DCE7E1] pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-[#285C49] uppercase tracking-wider">
                  Revision Quick Reference
                </span>
                <h3 className="font-editorial text-xl font-bold text-[#1E293B]">
                  NAND and NOR Synthesis Master Cheat Sheet
                </h3>
              </div>
              <div className="text-xs font-mono text-slate-500 bg-[#FAF8F5] px-3 py-1 rounded-lg border border-[#DCE7E1]">
                Digital Logic Design | Section 2.7
              </div>
            </div>

            {/* 1. Seven Gate Summary Table */}
            <div className="space-y-2">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-600">
                1. Standard Logic Gates Reference
              </h4>
              <div className="overflow-x-auto rounded-xl border border-[#DCE7E1]">
                <table className="w-full text-xs font-mono text-left">
                  <thead className="bg-[#FAF8F5] border-b border-[#DCE7E1] font-bold text-slate-700">
                    <tr>
                      <th className="py-2 px-3 border-r border-[#DCE7E1]">Gate</th>
                      <th className="py-2 px-3 border-r border-[#DCE7E1]">Graphic Shape</th>
                      <th className="py-2 px-3 border-r border-[#DCE7E1]">Standard Expression</th>
                      <th className="py-2 px-3 text-[#285C49]">Output Logic Summary</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DCE7E1]">
                    {dldSection27Data.masterCheatSheet.sevenGatesSummary.map((g, gIdx) => (
                      <tr key={gIdx} className="hover:bg-slate-50">
                        <td className="py-1.5 px-3 font-bold border-r border-[#DCE7E1] text-[#285C49]">{g.gate}</td>
                        <td className="py-1.5 px-3 border-r border-[#DCE7E1] text-slate-600">{g.symbol}</td>
                        <td className="py-1.5 px-3 border-r border-[#DCE7E1] font-bold text-slate-800">{g.expression}</td>
                        <td className="py-1.5 px-3 text-slate-700">{g.truthSummary}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2. NAND vs NOR Realisation Comparison Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* NAND Summary */}
              <div className="space-y-2">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#285C49]">
                  2. NAND Only Realisations (2-Input Gates)
                </h4>
                <div className="overflow-x-auto rounded-xl border border-[#DCE7E1]">
                  <table className="w-full text-xs font-mono text-left">
                    <thead className="bg-[#FAF8F5] border-b border-[#DCE7E1] font-bold text-slate-700">
                      <tr>
                        <th className="py-1.5 px-3 border-r border-[#DCE7E1]">Target</th>
                        <th className="py-1.5 px-2 text-center border-r border-[#DCE7E1]">Gates</th>
                        <th className="py-1.5 px-2 text-center border-r border-[#DCE7E1]">Depth</th>
                        <th className="py-1.5 px-3">Construction Formula</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#DCE7E1]">
                      {dldSection27Data.masterCheatSheet.nandRealisationSummary.map((r, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50">
                          <td className="py-1 px-3 font-bold border-r border-[#DCE7E1] text-[#285C49]">{r.target}</td>
                          <td className="py-1 px-2 text-center font-bold border-r border-[#DCE7E1]">{r.gateCount}</td>
                          <td className="py-1 px-2 text-center border-r border-[#DCE7E1] text-slate-500">{r.levels}</td>
                          <td className="py-1 px-3 text-[11px] text-slate-600">{r.formula}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* NOR Summary */}
              <div className="space-y-2">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-blue-800">
                  3. NOR Only Realisations (2-Input Gates)
                </h4>
                <div className="overflow-x-auto rounded-xl border border-[#DCE7E1]">
                  <table className="w-full text-xs font-mono text-left">
                    <thead className="bg-[#FAF8F5] border-b border-[#DCE7E1] font-bold text-slate-700">
                      <tr>
                        <th className="py-1.5 px-3 border-r border-[#DCE7E1]">Target</th>
                        <th className="py-1.5 px-2 text-center border-r border-[#DCE7E1]">Gates</th>
                        <th className="py-1.5 px-2 text-center border-r border-[#DCE7E1]">Depth</th>
                        <th className="py-1.5 px-3">Construction Formula</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#DCE7E1]">
                      {dldSection27Data.masterCheatSheet.norRealisationSummary.map((r, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50">
                          <td className="py-1 px-3 font-bold border-r border-[#DCE7E1] text-blue-800">{r.target}</td>
                          <td className="py-1 px-2 text-center font-bold border-r border-[#DCE7E1]">{r.gateCount}</td>
                          <td className="py-1 px-2 text-center border-r border-[#DCE7E1] text-slate-500">{r.levels}</td>
                          <td className="py-1 px-3 text-[11px] text-slate-600">{r.formula}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* 4. Bubble Pushing and De Morgan Duals */}
            <div className="space-y-2 pt-2">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-600">
                4. De Morgan Graphic Duals and Bubble Pushing Rules
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dldSection27Data.masterCheatSheet.bubblePushingRules.map((bp, bIdx) => (
                  <div key={bIdx} className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#285C49]">{bp.rule}</span>
                      <span className="font-mono text-[11px] text-slate-700 bg-white px-2 py-0.5 rounded border border-[#DCE7E1]">{bp.algebraic}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{bp.graphical}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Compact Connected Reference Circuits */}
            {dldSection27Data.masterCheatSheet.referenceCircuits && (
              <div className="space-y-3 pt-2">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#285C49]">
                  Compact Connected Reference Circuits
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#DCE7E1] space-y-1">
                    <span className="font-mono text-[11px] font-bold text-slate-700">NAND Inverter (F = A')</span>
                    <ConnectedCircuitViewer circuit={dldSection27Data.masterCheatSheet.referenceCircuits.nandInverter} compact={true} />
                  </div>
                  <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#DCE7E1] space-y-1">
                    <span className="font-mono text-[11px] font-bold text-slate-700">NOR Inverter (F = A')</span>
                    <ConnectedCircuitViewer circuit={dldSection27Data.masterCheatSheet.referenceCircuits.norInverter} compact={true} />
                  </div>
                  <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#DCE7E1] space-y-1">
                    <span className="font-mono text-[11px] font-bold text-slate-700">NAND-NAND SOP (AB + CD)</span>
                    <ConnectedCircuitViewer circuit={dldSection27Data.masterCheatSheet.referenceCircuits.nandNandSop} compact={true} />
                  </div>
                  <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#DCE7E1] space-y-1">
                    <span className="font-mono text-[11px] font-bold text-slate-700">NOR-NOR POS ((A+B)(C+D))</span>
                    <ConnectedCircuitViewer circuit={dldSection27Data.masterCheatSheet.referenceCircuits.norNorPos} compact={true} />
                  </div>
                </div>
              </div>
            )}

            {/* 5. 8 Common Traps and Prevention */}
            <div className="space-y-2 pt-2">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-amber-700">
                5. Common Examination Traps and Prevention Rules
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {dldSection27Data.masterCheatSheet.commonMistakes.map((cm, cIdx) => (
                  <div key={cIdx} className="p-3 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1">
                    <div className="font-mono text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                      <span>{cm.mistake}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <strong>Fix:</strong> {cm.prevention}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* TAB 8: PRACTICE QUESTIONS (10 IN-LESSON PROBLEMS)                  */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'practice-questions' && (
        <div className="space-y-6">
          {/* Difficulty Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white border border-[#DCE7E1] rounded-2xl shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                Filter by Difficulty:
              </span>
              {['All', 'Basic', 'Intermediate', 'Advanced', 'Challenging'].map(diff => (
                <button
                  key={diff}
                  onClick={() => setPqDifficultyFilter(diff)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                    pqDifficultyFilter === diff
                      ? 'bg-[#285C49] text-white shadow-2xs font-bold'
                      : 'bg-[#FAF8F5] text-slate-600 border border-[#DCE7E1] hover:bg-slate-100'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
            <div className="text-xs font-mono text-slate-500">
              Showing {filteredPracticeQuestions.length} of 10 Practice Problems
            </div>
          </div>

          {/* Question Cards List */}
          <div className="space-y-4">
            {filteredPracticeQuestions.map(prob => {
              const isHintOpen = revealedHints[prob.id];
              const isSolOpen = revealedSolutions[prob.id];

              const diffBadge = {
                Basic: 'bg-emerald-100 text-emerald-800 border-emerald-200',
                Intermediate: 'bg-blue-100 text-blue-800 border-blue-200',
                Advanced: 'bg-amber-100 text-amber-800 border-amber-200',
                Challenging: 'bg-purple-100 text-purple-800 border-purple-200'
              }[prob.difficulty] || 'bg-slate-100 text-slate-800 border-slate-200';

              return (
                <div 
                  key={prob.id}
                  className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4 hover:border-[#CBD5E1] transition-all"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DCE7E1] pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#285C49]">
                        {prob.id}: {prob.number}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#DCE7E1] text-[11px] font-mono text-slate-600 font-semibold">
                        {prob.category}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold border ${diffBadge}`}>
                        {prob.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleHint(prob.id)}
                        className="px-2.5 py-1 rounded-lg bg-white border border-[#DCE7E1] hover:bg-slate-50 text-[11px] font-mono font-bold text-amber-700 transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Lightbulb className="w-3 h-3 text-amber-600" />
                        <span>{isHintOpen ? 'Hide Hint' : 'Hint'}</span>
                      </button>
                      <button
                        onClick={() => toggleSolution(prob.id)}
                        className="px-3 py-1 rounded-lg bg-[#285C49] hover:bg-[#204a3b] text-white text-[11px] font-mono font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                      >
                        <Eye className="w-3 h-3" />
                        <span>{isSolOpen ? 'Hide Solution' : 'Reveal Solution'}</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-sm font-bold text-slate-800 leading-relaxed font-mono">
                    {prob.question}
                  </p>

                  {/* Hint Reveal */}
                  {isHintOpen && (
                    <div className="p-3.5 rounded-xl bg-[#FEF3C7] border border-[#FDE68A] text-xs text-[#92400E] leading-relaxed flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Hint:</strong> {prob.hint}
                      </div>
                    </div>
                  )}

                  {/* Solution Reveal */}
                  {isSolOpen && (
                    <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-4">
                      <div className="space-y-2">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                          Step-by-Step Derivation:
                        </span>
                        <ul className="space-y-1.5">
                          {prob.steps.map((st, sIdx) => (
                            <li key={sIdx} className="text-xs text-slate-700 leading-relaxed flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#285C49] flex-shrink-0 mt-1.5" />
                              <span>{st}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {prob.circuit && (
                        <div className="space-y-1.5 pt-1">
                          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500">
                            Connected Logic Circuit Schematic:
                          </span>
                          <div className="p-3 bg-white rounded-xl border border-[#DCE7E1]">
                            <ConnectedCircuitViewer circuit={prob.circuit} />
                          </div>
                        </div>
                      )}

                      <div className="p-3.5 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="font-mono text-[11px] font-bold uppercase text-[#166534]">
                            Verified Final Answer:
                          </span>
                          <div className="font-mono text-xs font-bold text-[#166534]">
                            {prob.answer}
                          </div>
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-[#166534] flex-shrink-0" />
                      </div>

                      <div className="text-[11px] text-slate-600 italic">
                        <strong>Key Takeaway:</strong> {prob.takeaway}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Section27View;
