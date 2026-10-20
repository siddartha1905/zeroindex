import React, { useState } from 'react';
import { 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Zap, 
  Layers, 
  AlertTriangle, 
  ShieldCheck, 
  Cpu, 
  Clock, 
  Sparkles, 
  FileText, 
  Compass, 
  Check, 
  Filter, 
  RotateCcw, 
  Info, 
  Table as TableIcon,
  HelpCircle,
  ArrowRight,
  Printer,
  GitCompare,
  ArrowRightLeft
} from 'lucide-react';
import { dldSection24Data } from '../data/dldSection24Data';
import { CuratedVideoCard } from './CuratedVideoCard';

/**
 * Section 2.4 View: SOP and POS Forms, Conversions and Simplification
 * Strictly zero em-dashes and zero en-dashes throughout.
 * All formulas use actual mathematical symbols: Σ (\u03A3) and Π (\u03A0).
 * Six-Tab Pedagogical Architecture:
 * 1. Start Here (WHY-FIRST pedagogy, primary demo, 2-level topologies, roadmap)
 * 2. Conversion Methods (8 methods + Conversion vs Complementation)
 * 3. Guided Demonstrations (4 visual step-by-step master walkthroughs)
 * 4. Worked Models (18 verified models: 5 Basic, 5 Intermediate, 8 Advanced)
 * 5. Cheat Sheet & Master Reference (Formula panel, decision table, 11 common mistakes)
 * 6. Practice Lab (28 progressive exercises with two-tier hints and revealed derivations)
 */

export const Section24View = ({ section }) => {
  const [activeTab, setActiveTab] = useState('start-here');
  
  // Tab 1 state
  const [showTruthTableProof, setShowTruthTableProof] = useState(false);
  
  // Tab 2 state
  const [expandedMethods, setExpandedMethods] = useState({ 
    'M01': true, 
    'M02': true, 
    'M03': true, 
    'M05': true 
  });
  
  // Tab 3 state
  const [activeDemo, setActiveDemo] = useState('GD1');
  
  // Tab 4 Worked Models state
  const [modelFilter, setModelFilter] = useState('All');
  const [expandedModels, setExpandedModels] = useState({ 
    'WM2.4-B01': true, 
    'WM2.4-I01': true, 
    'WM2.4-A01': true 
  });
  
  // Tab 6 Practice Lab state
  const [practiceFilter, setPracticeFilter] = useState('All');
  const [revealedHints, setRevealedHints] = useState({});
  const [revealedSolutions, setRevealedSolutions] = useState({});

  const toggleMethod = (id) => {
    setExpandedMethods(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleModel = (id) => {
    setExpandedModels(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleHint = (id) => {
    setRevealedHints(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSolution = (id) => {
    setRevealedSolutions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const printCheatSheet = () => {
    window.print();
  };

  const data = dldSection24Data;

  const tabs = [
    { id: 'start-here', label: '1. Start Here', icon: BookOpen },
    { id: 'methods', label: '2. Conversion Methods', icon: ArrowRightLeft },
    { id: 'demos', label: '3. Guided Demonstrations', icon: Compass },
    { id: 'models', label: '4. Worked Models (18)', icon: Layers },
    { id: 'cheat-sheet', label: '5. Cheat Sheet', icon: FileText },
    { id: 'practice', label: '6. Practice Lab (28)', icon: Sparkles }
  ];

  const filteredModels = data.workedModels.filter(m => {
    if (modelFilter === 'All') return true;
    return m.difficulty === modelFilter;
  });

  const filteredPractice = data.practiceLab.filter(p => {
    if (practiceFilter === 'All') return true;
    return p.difficulty === practiceFilter;
  });

  return (
    <div className="space-y-8 text-left max-w-6xl mx-auto px-2 sm:px-4">
      {/* 1. Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-[#EBF3ED] text-[#285C49] border border-[#285C49]/20">
              Section {data.number}
            </span>
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
              {data.badge}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#5F6C64]">
            <Clock className="w-3.5 h-3.5" />
            <span>{data.estimatedReadTime}</span>
          </div>
        </div>

        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#293B32] leading-tight">
            {data.title}
          </h1>
          <p className="text-sm text-[#5F6C64] mt-2 leading-relaxed font-normal">
            {data.overview}
          </p>
        </div>

        {/* Data Science Callout */}
        <div className="p-4 rounded-xl bg-[#F4F7F4] border border-[#DCE7E1] flex items-start gap-3">
          <div className="p-2 rounded-lg bg-[#285C49] text-white flex-shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#285C49]">
              Data Science & Verification Link: SAT Solvers & Normal Forms (CNF / DNF)
            </h4>
            <p className="text-xs text-[#293B32]/90 leading-relaxed font-normal">
              {data.dataScienceConnection}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="border-b border-[#DCE7E1] bg-white rounded-xl p-1.5 shadow-2xs overflow-x-auto">
        <nav className="flex space-x-1 sm:space-x-2 min-w-max" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#1E4537] text-white shadow-xs'
                    : 'text-[#5F6C64] hover:text-[#1E4537] hover:bg-[#F2F7F4]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#5F6C64]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* TAB 1: START HERE                                                  */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'start-here' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Opening Rationale */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#285C49]">
                Foundational Pedagogical Rationale
              </span>
              <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#1E293B]">
                {data.startHere.title}
              </h2>
            </div>

            {/* Central Question Card */}
            <div className="p-5 rounded-xl bg-[#F8FAF9] border-l-4 border-[#285C49] border-y border-r border-[#DCE7E1] shadow-2xs">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-[#285C49] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#1E293B]">The Central Engineering Question</h4>
                  <p className="text-sm text-[#285C49] font-medium italic mt-1">
                    "{data.startHere.centralQuestion}"
                  </p>
                </div>
              </div>
            </div>

            {/* Structured 6-Bullet Presentation */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#5F6C64]">
                Six Key Reasons for Form Conversion in Digital Systems
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data.startHere.whyReasons.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-[#285C49] bg-[#EBF3ED] w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="space-y-1">
                      <strong className="text-xs font-bold text-[#1E4537] block">
                        {item.keyword}
                      </strong>
                      <p className="text-xs text-[#293B32]/90 leading-relaxed font-normal">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Crucial Engineering Qualification */}
            <div className="p-4 rounded-xl bg-[#FFFBF0] border border-[#FDE68A] flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#B45309] flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#92400E]">
                  {data.startHere.hardwareQualification.title}
                </h4>
                <ul className="space-y-1 text-xs text-[#78350F] list-disc list-inside">
                  {data.startHere.hardwareQualification.points.map((pt, pIdx) => (
                    <li key={pIdx} className="leading-relaxed">{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Primary Visual Demonstration: One Function in Two Forms */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-[#F2F7F4]">
              <GitCompare className="w-5 h-5 text-[#285C49]" />
              <h3 className="font-editorial text-lg font-bold text-[#1E293B]">
                {data.startHere.primaryDemonstration.title}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#EBF3ED]/40 border border-[#285C49]/30 space-y-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#285C49] block">
                  General SOP Representation
                </span>
                <div className="p-3 rounded-lg bg-white border border-[#DCE7E1] font-mono text-base font-bold text-[#1E4537] text-center">
                  {data.startHere.primaryDemonstration.functionSOP}
                </div>
                <p className="text-xs text-[#5F6C64]">
                  Sum of two product terms: <strong>AB</strong> (AND term) + <strong>C</strong> (single literal).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] space-y-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1D4ED8] block">
                  Equivalent General POS Representation
                </span>
                <div className="p-3 rounded-lg bg-white border border-[#BFDBFE] font-mono text-base font-bold text-[#1E3A8A] text-center">
                  {data.startHere.primaryDemonstration.functionPOS}
                </div>
                <p className="text-xs text-[#5F6C64]">
                  Product of two sum terms: <strong>(A + C)</strong> (OR term) · <strong>(B + C)</strong> (OR term).
                </p>
              </div>
            </div>

            {/* Algebraic Proof Steps */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#5F6C64]">
                Algebraic Equivalence Derivation: Multiplying POS back to SOP
              </h4>
              <div className="space-y-2">
                {data.startHere.primaryDemonstration.algebraicProof.map((step, sIdx) => (
                  <div key={sIdx} className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg bg-white border border-[#E2E8F0] text-xs gap-2">
                    <span className="font-mono font-bold text-[#1E4537] whitespace-nowrap">
                      {step.expr}
                    </span>
                    <span className="text-[#64748B] italic">
                      {step.note}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Toggleable Truth Table Proof */}
            <div>
              <button
                onClick={() => setShowTruthTableProof(!showTruthTableProof)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] text-xs font-bold text-[#285C49] hover:bg-[#EBF3ED] transition-colors"
              >
                <TableIcon className="w-4 h-4" />
                <span>{showTruthTableProof ? "Hide 8-Row Truth Table Verification" : "Show 8-Row Truth Table Verification"}</span>
                {showTruthTableProof ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {showTruthTableProof && (
                <div className="mt-4 overflow-x-auto rounded-xl border border-[#DCE7E1] animate-fadeIn">
                  <table className="w-full text-xs text-center border-collapse">
                    <thead className="bg-[#1E4537] text-white font-mono">
                      <tr>
                        <th className="py-2.5 px-3 border-r border-[#285C49]">Row</th>
                        <th className="py-2.5 px-2 border-r border-[#285C49]">A</th>
                        <th className="py-2.5 px-2 border-r border-[#285C49]">B</th>
                        <th className="py-2.5 px-2 border-r border-[#285C49]">C</th>
                        <th className="py-2.5 px-3 border-r border-[#285C49]">AB</th>
                        <th className="py-2.5 px-3 bg-[#285C49] text-emerald-200 font-bold border-r border-emerald-700">F_SOP (AB+C)</th>
                        <th className="py-2.5 px-3 border-r border-[#285C49]">A+C</th>
                        <th className="py-2.5 px-3 border-r border-[#285C49]">B+C</th>
                        <th className="py-2.5 px-3 bg-[#1E3A8A] text-blue-200 font-bold border-r border-blue-800">F_POS ((A+C)(B+C))</th>
                        <th className="py-2.5 px-3">Equivalence</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0] font-mono">
                      {data.startHere.primaryDemonstration.truthTable.map((r) => (
                        <tr key={r.row} className={r.F_SOP === 1 ? "bg-emerald-50/50" : "bg-blue-50/30"}>
                          <td className="py-2 px-3 font-bold text-[#64748B] border-r border-[#E2E8F0]">{r.row}</td>
                          <td className="py-2 px-2 border-r border-[#E2E8F0]">{r.A}</td>
                          <td className="py-2 px-2 border-r border-[#E2E8F0]">{r.B}</td>
                          <td className="py-2 px-2 border-r border-[#E2E8F0]">{r.C}</td>
                          <td className="py-2 px-3 border-r border-[#E2E8F0]">{r.AB}</td>
                          <td className="py-2 px-3 font-bold text-[#1E4537] border-r border-[#E2E8F0] bg-emerald-100/40">{r.F_SOP}</td>
                          <td className="py-2 px-3 border-r border-[#E2E8F0]">{r.AC}</td>
                          <td className="py-2 px-3 border-r border-[#E2E8F0]">{r.BC}</td>
                          <td className="py-2 px-3 font-bold text-[#1E3A8A] border-r border-[#E2E8F0] bg-blue-100/40">{r.F_POS}</td>
                          <td className="py-2 px-3 text-emerald-600 font-bold">
                            <span className="inline-flex items-center gap-1 text-[11px]">
                              <Check className="w-3.5 h-3.5" /> Identical
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="p-3 bg-[#FAF8F5] border-t border-[#DCE7E1] text-xs text-[#5F6C64] flex flex-wrap justify-between gap-2 font-mono">
                    <span>Canonical SOP: <strong>{data.startHere.primaryDemonstration.canonicalSOP}</strong></span>
                    <span>Canonical POS: <strong>{data.startHere.primaryDemonstration.canonicalPOS}</strong></span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SOP and POS Two-Level Topologies */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-[#F2F7F4]">
              <Cpu className="w-5 h-5 text-[#285C49]" />
              <h3 className="font-editorial text-lg font-bold text-[#1E293B]">
                Two-Level Standard Gate Topologies
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* SOP Architecture Card */}
              <div className="p-5 rounded-xl border border-[#285C49]/20 bg-[#FAF8F5] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#EBF3ED] text-[#285C49]">
                    SOP Topology
                  </span>
                  <span className="text-xs font-bold text-[#285C49] font-mono">2-Level AND-OR</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1E293B]">{data.startHere.twoLevelTopologies.sop.title}</h4>
                  <p className="text-xs text-[#5F6C64] mt-1 leading-relaxed">
                    {data.startHere.twoLevelTopologies.sop.description}
                  </p>
                </div>

                {/* SVG Schematic: AND-OR Network */}
                <div className="p-3 rounded-lg bg-white border border-[#DCE7E1]">
                  <svg viewBox="0 0 340 130" className="w-full h-auto text-[#293B32]">
                    {/* Wires */}
                    <path d="M 20 25 L 80 25 M 20 45 L 80 45" stroke="#94A3B8" strokeWidth="2" fill="none" />
                    <path d="M 20 85 L 80 85 M 20 105 L 80 105" stroke="#94A3B8" strokeWidth="2" fill="none" />
                    <path d="M 140 35 L 200 35 L 200 55 L 220 55" stroke="#285C49" strokeWidth="2" fill="none" />
                    <path d="M 140 95 L 200 95 L 200 75 L 220 75" stroke="#285C49" strokeWidth="2" fill="none" />
                    <path d="M 280 65 L 320 65" stroke="#1E4537" strokeWidth="2.5" fill="none" />

                    {/* Input Labels */}
                    <text x="10" y="29" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#64748B">A</text>
                    <text x="10" y="49" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#64748B">B</text>
                    <text x="10" y="89" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#64748B">C</text>
                    <text x="10" y="109" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#64748B">D</text>

                    {/* AND Gate 1 */}
                    <g transform="translate(80, 15)">
                      <rect x="0" y="0" width="30" height="40" fill="#EBF3ED" stroke="#285C49" strokeWidth="2" />
                      <path d="M 30 0 A 20 20 0 0 1 30 40 Z" fill="#EBF3ED" stroke="#285C49" strokeWidth="2" />
                      <text x="18" y="24" fontSize="9" fontWeight="bold" fill="#1E4537">AND</text>
                    </g>

                    {/* AND Gate 2 */}
                    <g transform="translate(80, 75)">
                      <rect x="0" y="0" width="30" height="40" fill="#EBF3ED" stroke="#285C49" strokeWidth="2" />
                      <path d="M 30 0 A 20 20 0 0 1 30 40 Z" fill="#EBF3ED" stroke="#285C49" strokeWidth="2" />
                      <text x="18" y="24" fontSize="9" fontWeight="bold" fill="#1E4537">AND</text>
                    </g>

                    {/* Intermediate Term Labels */}
                    <text x="150" y="30" fontSize="9" fontFamily="monospace" fontWeight="bold" fill="#285C49">AB</text>
                    <text x="150" y="90" fontSize="9" fontFamily="monospace" fontWeight="bold" fill="#285C49">CD</text>

                    {/* OR Gate Level 2 */}
                    <g transform="translate(220, 45)">
                      <path d="M 0 0 Q 20 20 0 40 Q 35 40 55 20 Q 35 0 0 0 Z" fill="#DDEADD" stroke="#1E4537" strokeWidth="2" />
                      <text x="16" y="24" fontSize="9" fontWeight="bold" fill="#1E4537">OR</text>
                    </g>

                    {/* Output Label */}
                    <text x="290" y="58" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#1E4537">F = AB + CD</text>
                  </svg>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-[#DCE7E1] font-mono text-xs text-[#285C49] flex items-center justify-between">
                  <span>Level 1: <strong>AND Gates</strong></span>
                  <span>{"->"}</span>
                  <span>Level 2: <strong>OR Gate</strong></span>
                </div>
              </div>

              {/* POS Architecture Card */}
              <div className="p-5 rounded-xl border border-[#1E3A8A]/20 bg-[#F8FAFC] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#EFF6FF] text-[#1E3A8A]">
                    POS Topology
                  </span>
                  <span className="text-xs font-bold text-[#1E3A8A] font-mono">2-Level OR-AND</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1E293B]">{data.startHere.twoLevelTopologies.pos.title}</h4>
                  <p className="text-xs text-[#5F6C64] mt-1 leading-relaxed">
                    {data.startHere.twoLevelTopologies.pos.description}
                  </p>
                </div>

                {/* SVG Schematic: OR-AND Network */}
                <div className="p-3 rounded-lg bg-white border border-[#BFDBFE]">
                  <svg viewBox="0 0 340 130" className="w-full h-auto text-[#1E3A8A]">
                    {/* Wires */}
                    <path d="M 20 25 L 80 25 M 20 45 L 80 45" stroke="#94A3B8" strokeWidth="2" fill="none" />
                    <path d="M 20 85 L 80 85 M 20 105 L 80 105" stroke="#94A3B8" strokeWidth="2" fill="none" />
                    <path d="M 140 35 L 200 35 L 200 55 L 220 55" stroke="#1D4ED8" strokeWidth="2" fill="none" />
                    <path d="M 140 95 L 200 95 L 200 75 L 220 75" stroke="#1D4ED8" strokeWidth="2" fill="none" />
                    <path d="M 280 65 L 320 65" stroke="#1E3A8A" strokeWidth="2.5" fill="none" />

                    {/* Input Labels */}
                    <text x="10" y="29" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#64748B">A</text>
                    <text x="10" y="49" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#64748B">B</text>
                    <text x="10" y="89" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#64748B">C</text>
                    <text x="10" y="109" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#64748B">D</text>

                    {/* OR Gate 1 */}
                    <g transform="translate(80, 15)">
                      <path d="M 0 0 Q 15 20 0 40 Q 35 40 55 20 Q 35 0 0 0 Z" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="2" />
                      <text x="18" y="24" fontSize="9" fontWeight="bold" fill="#1E3A8A">OR</text>
                    </g>

                    {/* OR Gate 2 */}
                    <g transform="translate(80, 75)">
                      <path d="M 0 0 Q 15 20 0 40 Q 35 40 55 20 Q 35 0 0 0 Z" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="2" />
                      <text x="18" y="24" fontSize="9" fontWeight="bold" fill="#1E3A8A">OR</text>
                    </g>

                    {/* Intermediate Term Labels */}
                    <text x="145" y="30" fontSize="9" fontFamily="monospace" fontWeight="bold" fill="#1D4ED8">A+B</text>
                    <text x="145" y="90" fontSize="9" fontFamily="monospace" fontWeight="bold" fill="#1D4ED8">C+D</text>

                    {/* AND Gate Level 2 */}
                    <g transform="translate(220, 45)">
                      <rect x="0" y="0" width="30" height="40" fill="#DBEAFE" stroke="#1E3A8A" strokeWidth="2" />
                      <path d="M 30 0 A 20 20 0 0 1 30 40 Z" fill="#DBEAFE" stroke="#1E3A8A" strokeWidth="2" />
                      <text x="16" y="24" fontSize="9" fontWeight="bold" fill="#1E3A8A">AND</text>
                    </g>

                    {/* Output Label */}
                    <text x="270" y="58" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#1E3A8A">F = (A+B)(C+D)</text>
                  </svg>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-[#BFDBFE] font-mono text-xs text-[#1E3A8A] flex items-center justify-between">
                  <span>Level 1: <strong>OR Gates</strong></span>
                  <span>{"->"}</span>
                  <span>Level 2: <strong>AND Gate</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Problem-Solving Roadmap: 6 Stages */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#F2F7F4]">
              <Compass className="w-5 h-5 text-[#285C49]" />
              <h3 className="font-editorial text-lg font-bold text-[#1E293B]">
                The ZeroIndex Problem-Solving Roadmap
              </h3>
            </div>
            <p className="text-xs text-[#5F6C64]">
              Follow this standardized 6-step discipline for every conversion and simplification problem in homework and university exams.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
              {data.startHere.problemSolvingRoadmap.map((stage, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#1E4537] text-white">
                      {stage.stage}
                    </span>
                    <span className="font-mono text-xs text-[#64748B]">Step {idx + 1}</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#1E293B]">{stage.action}</h4>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {stage.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Curated Video Lesson */}
          <div className="space-y-2">
            <h3 className="font-editorial text-base font-bold text-[#1E293B]">
              Recommended Supplementary Lecture
            </h3>
            <CuratedVideoCard videoKey="canonical-conversion" />
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* TAB 2: CONVERSION METHODS                                          */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'methods' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Header */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-2">
            <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#1E293B]">
              The 8 Standard Boolean Form Conversion Methods
            </h2>
            <p className="text-xs text-[#5F6C64] leading-relaxed">
              Every Boolean expression conversion fits into one of eight distinct algebraic or tabular pathways. Select any method below to view its formal rule, step-by-step procedure, verified example, and common traps.
            </p>
          </div>

          {/* Critical Distinction Card */}
          <div className="p-6 rounded-2xl bg-white border-2 border-[#C38A63] shadow-soft space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#C38A63] text-white flex-shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-editorial text-lg font-bold text-[#78350F]">
                  {data.conversionVsComplementation.title}
                </h3>
                <p className="text-xs text-[#B45309] font-medium">
                  {data.conversionVsComplementation.warning}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {data.conversionVsComplementation.principles.map((p, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E2E8F0] space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C38A63]" />
                    <h4 className="text-xs font-bold text-[#1E293B]">{p.concept}</h4>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-[#CBD5E1] font-mono text-xs font-bold text-[#1E4537] text-center">
                    {p.operation}
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {p.meaning}
                  </p>
                </div>
              ))}
            </div>

            {/* Concrete Example */}
            <div className="p-4 rounded-xl bg-[#F8FAF9] border border-[#DCE7E1] space-y-2 text-xs">
              <strong className="text-xs font-bold text-[#1E4537] block">
                Concrete 3-Variable Proof ({data.conversionVsComplementation.concreteExample.domain}):
              </strong>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono">
                <div className="p-2 rounded bg-white border border-[#DCE7E1]">
                  Original Function: <strong>{data.conversionVsComplementation.concreteExample.originalFunction}</strong>
                </div>
                <div className="p-2 rounded bg-white border border-[#BFDBFE] text-[#1E3A8A]">
                  Same Function in POS: <strong>{data.conversionVsComplementation.concreteExample.sameFunctionPOS}</strong>
                </div>
                <div className="p-2 rounded bg-white border border-[#FED7AA] text-[#C2410C]">
                  Complement F' in SOP: <strong>{data.conversionVsComplementation.concreteExample.complementSOP}</strong>
                </div>
                <div className="p-2 rounded bg-white border border-[#FED7AA] text-[#C2410C]">
                  Complement F' in POS: <strong>{data.conversionVsComplementation.concreteExample.complementPOS}</strong>
                </div>
              </div>
              <p className="text-[#5F6C64] italic pt-1">
                {data.conversionVsComplementation.concreteExample.takeaway}
              </p>
            </div>
          </div>

          {/* Methods Accordion List */}
          <div className="space-y-4">
            {data.conversionMethods.map((method) => {
              const isExpanded = expandedMethods[method.id];
              return (
                <div key={method.id} className="rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs overflow-hidden transition-all">
                  <div 
                    onClick={() => toggleMethod(method.id)}
                    className="p-5 flex items-center justify-between cursor-pointer hover:bg-[#F2F7F4] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#1E4537] text-white">
                        {method.id}
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-[#1E293B]">{method.name}</h3>
                        <p className="text-xs text-[#64748B] mt-0.5">
                          {method.startForm} {"->"} {method.targetForm}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="hidden sm:inline font-mono text-[11px] text-[#285C49] font-medium bg-[#EBF3ED] px-2.5 py-1 rounded-full">
                        {method.mainRule}
                      </span>
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-[#64748B]" /> : <ChevronDown className="w-5 h-5 text-[#64748B]" />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-6 border-t border-[#F2F7F4] space-y-6 animate-fadeIn">
                      {/* Context & Main Rule */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1 text-xs">
                          <strong className="text-[#1E4537] block font-bold">When Is This Method Required?</strong>
                          <p className="text-[#64748B] leading-relaxed">{method.whenRequired}</p>
                        </div>
                        <div className="p-4 rounded-xl bg-[#EBF3ED]/40 border border-[#285C49]/20 space-y-1 text-xs">
                          <strong className="text-[#285C49] block font-bold">Primary Mathematical Rule</strong>
                          <div className="font-mono font-bold text-sm text-[#1E4537]">{method.mainRule}</div>
                        </div>
                      </div>

                      {/* Step-by-Step Procedure */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#5F6C64]">
                          Systematic Execution Procedure
                        </h4>
                        <ol className="space-y-1.5 text-xs text-[#293B32]">
                          {method.procedure.map((step, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-2.5">
                              <span className="font-mono text-xs font-bold text-[#285C49] bg-[#EBF3ED] w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                {sIdx + 1}
                              </span>
                              <span className="leading-relaxed">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Verified Concrete Example */}
                      <div className="p-4 rounded-xl bg-[#F8FAF9] border border-[#DCE7E1] space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#1E4537] uppercase tracking-wider font-mono">
                            Verified Demonstration
                          </span>
                          <span className="text-xs font-bold text-[#285C49]">{method.example.title}</span>
                        </div>
                        <div className="space-y-1.5 font-mono text-xs">
                          {method.example.steps.map((st, eIdx) => (
                            <div key={eIdx} className="p-2 rounded bg-white border border-[#E2E8F0] text-[#1E293B]">
                              {st}
                            </div>
                          ))}
                        </div>
                        <div className="p-2.5 rounded-lg bg-[#EBF3ED] border border-[#285C49]/30 font-mono text-xs font-bold text-[#1E4537] text-center">
                          Final Target: {method.example.result}
                        </div>
                      </div>

                      {/* Traps & Pro-Tips */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="p-3.5 rounded-xl bg-[#FFF5F5] border border-[#FED7D7] flex items-start gap-2.5">
                          <AlertTriangle className="w-4 h-4 text-[#C53030] flex-shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-[#9B2C2C] block font-bold">Watch Out: Common Exam Mistake</strong>
                            <p className="text-[#C53030] mt-0.5">{method.commonMistake}</p>
                          </div>
                        </div>
                        <div className="p-3.5 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-start gap-2.5">
                          <Sparkles className="w-4 h-4 text-[#16A34A] flex-shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-[#15803D] block font-bold">Pro Shortcut</strong>
                            <p className="text-[#16A34A] mt-0.5">{method.shortcut}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* TAB 3: GUIDED DEMONSTRATIONS                                       */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'demos' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Header */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-2">
            <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#1E293B]">
              Visual Master Walkthroughs: 4 Guided Demonstrations
            </h2>
            <p className="text-xs text-[#5F6C64] leading-relaxed">
              These comprehensive guided walkthroughs illustrate every intermediate mathematical step and index alignment before you practice longer problems independently.
            </p>
          </div>

          {/* Demo Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {data.guidedDemos.map((demo) => (
              <button
                key={demo.id}
                onClick={() => setActiveDemo(demo.id)}
                className={`p-3.5 rounded-xl border text-xs font-bold transition-all text-left ${
                  activeDemo === demo.id
                    ? 'bg-[#1E4537] text-white border-[#1E4537] shadow-soft'
                    : 'bg-white text-[#5F6C64] border-[#DCE7E1] hover:bg-[#F2F7F4]'
                }`}
              >
                <div className="font-mono text-[10px] opacity-80 uppercase tracking-wider">{demo.id}</div>
                <div className="truncate mt-1">{demo.title.split(':')[1] || demo.title}</div>
              </button>
            ))}
          </div>

          {/* Active Demo Card */}
          {(() => {
            const demo = data.guidedDemos.find(d => d.id === activeDemo);
            if (!demo) return null;

            return (
              <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-[#EBF3ED] text-[#285C49]">
                      {demo.id}
                    </span>
                    <h3 className="font-editorial text-lg font-bold text-[#1E293B]">
                      {demo.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#5F6C64] italic">
                    {demo.objective}
                  </p>
                </div>

                {/* Target Expression Pill */}
                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] font-mono text-xs font-bold text-[#1E4537] text-center">
                  Problem Target: {demo.target}
                </div>

                {/* Step by Step Breakdown */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#5F6C64]">
                    Step-by-Step Mathematical Derivation
                  </h4>
                  <div className="space-y-3">
                    {demo.steps.map((st, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-[#F8FAF9] border border-[#E2E8F0] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-[#285C49] bg-[#EBF3ED] px-2 py-0.5 rounded">
                            {st.phase}
                          </span>
                          <span className="text-[11px] text-[#64748B] font-mono">Stage {idx + 1}</span>
                        </div>
                        <div className="p-3 rounded-lg bg-white border border-[#DCE7E1] font-mono text-xs font-bold text-[#1E4537] whitespace-nowrap overflow-x-auto">
                          {st.expression}
                        </div>
                        <p className="text-xs text-[#64748B] leading-relaxed">
                          {st.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Universe Tile Visualization for GD3 */}
                {demo.id === 'GD3' && (
                  <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#5F6C64]">
                      Index Universe Partition Visualization (3 Variables: 8 Rows)
                    </h4>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 text-center font-mono text-xs font-bold">
                      {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => {
                        const isMinterm = [1, 4, 5, 6, 7].includes(idx);
                        return (
                          <div 
                            key={idx} 
                            className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 ${
                              isMinterm 
                                ? 'bg-[#EBF3ED] border-[#285C49] text-[#1E4537]' 
                                : 'bg-[#EFF6FF] border-[#3B82F6] text-[#1E3A8A]'
                            }`}
                          >
                            <span className="text-[10px] opacity-70">Row {idx}</span>
                            <span className="text-sm">{isMinterm ? `m${idx}` : `M${idx}`}</span>
                            <span className="text-[9px] uppercase px-1 rounded bg-white/70">
                              {isMinterm ? "F = 1" : "F = 0"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex items-center justify-center gap-6 text-xs font-mono pt-2">
                      <span className="flex items-center gap-1.5 text-[#1E4537]">
                        <span className="w-3 h-3 rounded bg-[#EBF3ED] border border-[#285C49]" /> Minterms (Σm): 1-Rows
                      </span>
                      <span className="flex items-center gap-1.5 text-[#1E3A8A]">
                        <span className="w-3 h-3 rounded bg-[#EFF6FF] border border-[#3B82F6]" /> Maxterms (ΠM): 0-Rows
                      </span>
                    </div>
                  </div>
                )}

                {/* Final Form & Verification */}
                <div className="p-4 rounded-xl bg-[#EBF3ED]/60 border border-[#285C49]/40 space-y-1 text-xs">
                  <div className="font-mono font-bold text-sm text-[#1E4537]">
                    Final Canonical Result: {demo.finalForm}
                  </div>
                  <p className="text-[#285C49] font-medium pt-1">
                    Verification: {demo.verification}
                  </p>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* TAB 4: WORKED MODELS                                               */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'models' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Header */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#285C49]">
                Guided Problem-Solving Foundation
              </span>
              <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#1E293B] mt-1">
                From Truth Tables to Boolean Terms: Guided Worked Examples
              </h2>
            </div>

            {/* Rationale Bullet Card */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2 text-xs">
              <strong className="text-[#1E4537] font-bold block">
                Why Are We Solving These Specific Models?
              </strong>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#293B32]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#285C49] flex-shrink-0" />
                  <span>Master missing-variable expansion without polarity mistakes.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#285C49] flex-shrink-0" />
                  <span>Execute algebraic factoring with the second distributive law.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#285C49] flex-shrink-0" />
                  <span>Deduplicate overlapping 4-variable minterm rows reliably.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#285C49] flex-shrink-0" />
                  <span>Prepare directly for 4-variable Karnaugh Maps in Section 2.5.</span>
                </div>
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#5F6C64]" />
                <span className="text-xs font-mono font-bold text-[#5F6C64]">Filter Difficulty:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['All', 'Basic', 'Intermediate', 'Advanced'].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setModelFilter(diff)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      modelFilter === diff
                        ? 'bg-[#1E4537] text-white shadow-2xs'
                        : 'bg-[#F2F7F4] text-[#5F6C64] hover:bg-[#EBF3ED]'
                    }`}
                  >
                    {diff} ({diff === 'All' ? data.workedModels.length : data.workedModels.filter(m => m.difficulty === diff).length})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Worked Models List */}
          <div className="space-y-6">
            {filteredModels.map((model) => {
              const isExpanded = expandedModels[model.id];
              return (
                <div key={model.id} className="rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs overflow-hidden">
                  <div 
                    onClick={() => toggleModel(model.id)}
                    className="p-5 flex items-start sm:items-center justify-between cursor-pointer hover:bg-[#F2F7F4] transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#1E4537] text-white">
                          {model.id}
                        </span>
                        <span className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          model.difficulty === 'Basic' ? 'bg-[#EBF3ED] text-[#285C49]' :
                          model.difficulty === 'Intermediate' ? 'bg-[#EFF6FF] text-[#1D4ED8]' :
                          'bg-[#FEF3C7] text-[#92400E]'
                        }`}>
                          {model.difficulty}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-[#1E293B]">{model.title}</h3>
                      <p className="font-mono text-xs text-[#285C49] font-medium">
                        {model.problemStatement}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 mt-1 sm:mt-0">
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-[#64748B]" /> : <ChevronDown className="w-5 h-5 text-[#64748B]" />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-6 border-t border-[#F2F7F4] space-y-6 animate-fadeIn">
                      {/* Method Rationale Card */}
                      <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1 text-xs">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <strong className="text-[#1E4537] font-bold">Selected Method: {model.methodSelected}</strong>
                          <span className="font-mono text-[11px] text-[#64748B]">Domain: {model.variableOrder}</span>
                        </div>
                        <p className="text-[#64748B] leading-relaxed pt-1">
                          {model.methodRationale}
                        </p>
                      </div>

                      {/* Desktop 4-Column Table */}
                      <div className="overflow-x-auto rounded-xl border border-[#DCE7E1]">
                        <table className="w-full text-xs border-collapse">
                          <thead className="bg-[#1E4537] text-white font-mono">
                            <tr>
                              <th className="py-2.5 px-3 text-center border-r border-[#285C49] w-14">Step</th>
                              <th className="py-2.5 px-4 text-left border-r border-[#285C49]">Mathematical Expression</th>
                              <th className="py-2.5 px-4 text-left border-r border-[#285C49] w-48">Applied Law / Method</th>
                              <th className="py-2.5 px-4 text-left">Why It Is Valid</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#E2E8F0]">
                            {model.solutionSteps.map((st) => (
                              <tr key={st.step} className="hover:bg-[#FAF8F5]">
                                <td className="py-3 px-3 text-center font-mono font-bold text-[#64748B] border-r border-[#E2E8F0] bg-[#FAF8F5]">
                                  {st.step}
                                </td>
                                <td className="py-3 px-4 font-mono font-bold text-[#1E4537] border-r border-[#E2E8F0] whitespace-nowrap overflow-x-auto">
                                  {st.expr}
                                </td>
                                <td className="py-3 px-4 font-mono text-[11px] text-[#285C49] border-r border-[#E2E8F0]">
                                  {st.law}
                                </td>
                                <td className="py-3 px-4 text-[#64748B] leading-relaxed">
                                  {st.reason}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Final Answer Banner */}
                      <div className="p-4 rounded-xl bg-[#EBF3ED]/60 border border-[#285C49]/40 space-y-1 text-xs">
                        <strong className="text-xs font-mono font-bold text-[#1E4537] uppercase tracking-wider block">
                          Verified Final Answer
                        </strong>
                        <div className="font-mono font-bold text-sm text-[#1E4537] whitespace-nowrap overflow-x-auto">
                          {model.finalAnswer}
                        </div>
                        <p className="text-[#285C49] font-medium pt-1">
                          Verification: {model.verificationNote}
                        </p>
                      </div>

                      {/* Exam Tip */}
                      {model.examTip && (
                        <div className="p-3.5 rounded-xl bg-[#FFFBF0] border border-[#FDE68A] flex items-start gap-2.5 text-xs">
                          <Sparkles className="w-4 h-4 text-[#B45309] flex-shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-[#92400E] block font-bold">Examiner's Tip</strong>
                            <p className="text-[#78350F] mt-0.5">{model.examTip}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* TAB 5: CHEAT SHEET & MASTER REFERENCE                              */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'cheat-sheet' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Header */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#1E293B]">
                {data.cheatSheet.title}
              </h2>
              <p className="text-xs text-[#5F6C64] mt-1">
                One-glance memory rules, conversion decision tree, and 11 common exam traps for rapid revision.
              </p>
            </div>
            <button
              onClick={printCheatSheet}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1E4537] text-white text-xs font-bold shadow-soft hover:bg-[#285C49] transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Cheat Sheet</span>
            </button>
          </div>

          {/* Mandatory Formula Panel */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <h3 className="font-editorial text-lg font-bold text-[#1E293B]">
              Core Form Conversion Formulas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.cheatSheet.formulaPanel.map((f, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1.5">
                  <span className="font-mono text-xs font-bold text-[#285C49] block">
                    {f.name}
                  </span>
                  <div className="p-2.5 rounded-lg bg-white border border-[#CBD5E1] font-mono text-xs font-bold text-[#1E4537] text-center">
                    {f.formula}
                  </div>
                  <p className="text-[11px] text-[#64748B]">
                    {f.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Conversion Decision Table */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <h3 className="font-editorial text-lg font-bold text-[#1E293B]">
              Conversion Method Selection Matrix
            </h3>
            <div className="overflow-x-auto rounded-xl border border-[#DCE7E1]">
              <table className="w-full text-xs border-collapse">
                <thead className="bg-[#1E4537] text-white font-mono">
                  <tr>
                    <th className="py-2.5 px-4 text-left border-r border-[#285C49]">Given Form</th>
                    <th className="py-2.5 px-4 text-left border-r border-[#285C49]">Required Form</th>
                    <th className="py-2.5 px-4 text-left">Recommended Method & Procedure</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {data.cheatSheet.decisionTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF8F5]">
                      <td className="py-3 px-4 font-mono font-bold text-[#1E4537] border-r border-[#E2E8F0] bg-[#FAF8F5]">
                        {row.given}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-[#1E3A8A] border-r border-[#E2E8F0]">
                        {row.required}
                      </td>
                      <td className="py-3 px-4 text-[#293B32] leading-relaxed">
                        {row.method}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Core Boolean Identities for Conversions */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <h3 className="font-editorial text-lg font-bold text-[#1E293B]">
              Essential Boolean Identities for Form Conversions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {data.cheatSheet.coreIdentities.map((id, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#F8FAF9] border border-[#DCE7E1] space-y-1.5">
                  <span className="font-mono text-xs font-bold text-[#285C49] block">
                    {id.name}
                  </span>
                  <div className="p-2 rounded bg-white border border-[#E2E8F0] font-mono text-xs font-bold text-[#1E4537] text-center">
                    {id.formula}
                  </div>
                  <p className="text-[11px] text-[#64748B]">
                    {id.use}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 11 Common Exam Mistakes */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#C53030]" />
              <h3 className="font-editorial text-lg font-bold text-[#1E293B]">
                11 Common Examination Traps & How to Avoid Them
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.cheatSheet.commonMistakes.map((m, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#FED7D7] space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#FED7D7] text-[#C53030] font-mono text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <strong className="text-[#9B2C2C] font-bold">Incorrect: {m.mistake}</strong>
                  </div>
                  <div className="p-2 rounded bg-white border border-[#BBF7D0] text-[#15803D] font-mono text-[11px] font-bold">
                    Correct: {m.correct}
                  </div>
                  <p className="text-[#64748B] text-[11px] leading-relaxed">
                    <strong>Why:</strong> {m.why}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* TAB 6: PRACTICE LAB (28 PROBLEMS)                                  */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'practice' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Header */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#285C49]">
                Self-Paced Mastery & Exam Rehearsal
              </span>
              <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#1E293B] mt-1">
                Section 2.4 Practice Lab: 28 Verified Problems
              </h2>
              <p className="text-xs text-[#5F6C64] mt-1 leading-relaxed">
                Test your skills on 28 problems ranging from basic 3-variable missing literal expansions to multi-variable compound challenge equations. Use hints when stuck, then reveal full derivations.
              </p>
            </div>

            {/* Filter Bar */}
            <div className="flex items-center justify-between flex-wrap gap-3 pt-2 border-t border-[#F2F7F4]">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#5F6C64]" />
                <span className="text-xs font-mono font-bold text-[#5F6C64]">Filter:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['All', 'Basic', 'Intermediate', 'Advanced', 'Challenge'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setPracticeFilter(lvl)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      practiceFilter === lvl
                        ? 'bg-[#1E4537] text-white shadow-2xs'
                        : 'bg-[#F2F7F4] text-[#5F6C64] hover:bg-[#EBF3ED]'
                    }`}
                  >
                    {lvl} ({lvl === 'All' ? data.practiceLab.length : data.practiceLab.filter(p => p.difficulty === lvl).length})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Practice Question Cards */}
          <div className="space-y-4">
            {filteredPractice.map((problem) => {
              const isHintOpen = revealedHints[problem.id];
              const isSolutionOpen = revealedSolutions[problem.id];

              return (
                <div key={problem.id} className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#1E4537] text-white">
                        {problem.id}
                      </span>
                      <span className={`font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        problem.difficulty === 'Basic' ? 'bg-[#EBF3ED] text-[#285C49]' :
                        problem.difficulty === 'Intermediate' ? 'bg-[#EFF6FF] text-[#1D4ED8]' :
                        problem.difficulty === 'Advanced' ? 'bg-[#FEF3C7] text-[#92400E]' :
                        'bg-[#FCE7F3] text-[#BE185D]'
                      }`}>
                        {problem.difficulty}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-[#64748B]">Domain: {problem.declaredVariables}</span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#1E293B] leading-relaxed">
                      {problem.problemStatement}
                    </h3>
                    <p className="text-xs text-[#285C49] font-mono mt-1">
                      Target: {problem.target}
                    </p>
                  </div>

                  {/* Action Buttons: Hint & Reveal Solution */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <button
                      onClick={() => toggleHint(problem.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        isHintOpen 
                          ? 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]' 
                          : 'bg-[#FAF8F5] text-[#5F6C64] border border-[#DCE7E1] hover:bg-[#F2F7F4]'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isHintOpen ? "Hide Pedagogical Hint" : "Show Hint"}</span>
                    </button>

                    <button
                      onClick={() => toggleSolution(problem.id)}
                      className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        isSolutionOpen 
                          ? 'bg-[#1E4537] text-white' 
                          : 'bg-[#EBF3ED] text-[#285C49] border border-[#285C49]/30 hover:bg-[#DDEADD]'
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{isSolutionOpen ? "Hide Complete Solution" : "Reveal Complete Solution"}</span>
                      {isSolutionOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Hint Reveal Box */}
                  {isHintOpen && (
                    <div className="p-3.5 rounded-xl bg-[#FFFBF0] border border-[#FDE68A] text-xs text-[#78350F] flex items-start gap-2.5 animate-fadeIn">
                      <Sparkles className="w-4 h-4 text-[#B45309] flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#92400E] block font-bold">Hint:</strong>
                        <p className="mt-0.5">{problem.hint}</p>
                      </div>
                    </div>
                  )}

                  {/* Revealed Solution Box */}
                  {isSolutionOpen && (
                    <div className="p-5 rounded-xl bg-[#F8FAF9] border border-[#DCE7E1] space-y-4 animate-fadeIn">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1E4537]">
                        Step-by-Step Mathematical Derivation
                      </h4>
                      <div className="space-y-2">
                        {problem.steps.map((st) => (
                          <div key={st.step} className="p-3 rounded-lg bg-white border border-[#E2E8F0] space-y-1 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="font-mono font-bold text-[#285C49]">Step {st.step}</span>
                              <span className="font-mono text-[11px] text-[#64748B]">{st.law}</span>
                            </div>
                            <div className="font-mono font-bold text-[#1E4537] whitespace-nowrap overflow-x-auto">
                              {st.expr}
                            </div>
                            <p className="text-[#64748B] text-[11px]">
                              {st.reason}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Final Answer Banner */}
                      <div className="p-3.5 rounded-lg bg-[#EBF3ED] border border-[#285C49]/30 font-mono text-xs font-bold text-[#1E4537]">
                        Target Result: {problem.finalAnswer}
                      </div>

                      {/* Pedagogical Takeaway */}
                      <p className="text-xs text-[#5F6C64] italic">
                        <strong>Takeaway:</strong> {problem.takeaway}
                      </p>
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

export default Section24View;
