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
  Clock, 
  Sparkles, 
  Grid, 
  Filter, 
  RotateCcw, 
  Info, 
  Check, 
  Eye, 
  Compass, 
  FileText, 
  Lightbulb,
  ArrowRightLeft,
  Printer
} from 'lucide-react';
import { dldSection26Data } from '../data/dldSection26Data';
import { KMapGrid } from './Section25View';

/**
 * Section 2.6 View: Don't-Care Conditions in Karnaugh Maps
 * Strictly zero em-dashes and zero en-dashes throughout.
 * All formulas use actual Unicode mathematical symbols: \u03A3 (Sigma) and \u03A0 (Pi).
 * 
 * Six-Tab Pedagogical Architecture:
 * 1. Don't-Care Foundations (Definitions, 3-value comparison, BCD case study, how don't-cares help, standard operating rules)
 * 2. K-Map Method with Don't-Cares (Conceptual bridge, placing minterms/maxterms, demonstrations of using vs ignoring X)
 * 3. Worked Examples (11 comprehensive worked problems: 3 two-variable, 4 three-variable, 4 four-variable)
 * 4. Introduction to 5-Variable Maps (Short introductory tab: 32 minterms, two 4x4 planes, cross-plane adjacency, 1 solved illustration)
 * 5. Master Cheat Sheet (Printable-style revision standard: markings, rules, SOP vs POS comparison, quick method, common mistakes)
 * 6. Practice Lab (10) (Unified progressive practice collection across 2, 3, and 4 variables in SOP and POS)
 */

// Color palette for K-Map groups
const GROUP_COLORS = [
  { border: 'border-blue-500', bg: 'bg-blue-50/90', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-800 border-blue-300', dot: 'bg-blue-500' },
  { border: 'border-emerald-500', bg: 'bg-emerald-50/90', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-800 border-emerald-300', dot: 'bg-emerald-500' },
  { border: 'border-amber-500', bg: 'bg-amber-50/90', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-800 border-amber-300', dot: 'bg-amber-500' },
  { border: 'border-purple-500', bg: 'bg-purple-50/90', text: 'text-purple-700', badge: 'bg-purple-100 text-purple-800 border-purple-300', dot: 'bg-purple-500' },
  { border: 'border-rose-500', bg: 'bg-rose-50/90', text: 'text-rose-700', badge: 'bg-rose-100 text-rose-800 border-rose-300', dot: 'bg-rose-500' }
];

/**
 * Dedicated MiniKMap for Section 2.6 cheat sheet visual reminders.
 * Accurately renders care 1s, don't-care Xs (both grouped and ungrouped), and 0s.
 */
export const MiniKMap26 = ({
  mapType = 'threeVar',
  highlightCells = [],
  minterms = [],
  dontCares = [],
  groupColor = 'emerald',
  showAllIndices = true
}) => {
  const layout = {
    rowVar: 'A',
    colVar: 'BC',
    rows: ['0', '1'],
    cols: ['00', '01', '11', '10'],
    matrix: [
      [0, 1, 3, 2],
      [4, 5, 7, 6]
    ]
  };
  const { rowVar, colVar, rows, cols, matrix } = layout;

  const colorStyles = {
    emerald: { bg: 'bg-emerald-100', text: 'text-emerald-900', ring: 'ring-1 ring-emerald-500' },
    amber: { bg: 'bg-amber-100', text: 'text-amber-900', ring: 'ring-1 ring-amber-500' }
  }[groupColor] || { bg: 'bg-emerald-100', text: 'text-emerald-900', ring: 'ring-1 ring-emerald-500' };

  return (
    <div className="inline-block bg-white p-1.5 rounded-lg border border-[#DCE7E1] shadow-2xs font-sans text-left">
      <table className="border-collapse select-none text-[9px]">
        <thead>
          <tr>
            <th className="p-0.5 text-center font-mono font-bold text-[#285C49] border-b border-r border-[#DCE7E1] bg-[#F4F7F4] min-w-[28px]">
              <span className="text-[8px]">{rowVar}\{colVar}</span>
            </th>
            {cols.map((colHeader, cIdx) => (
              <th
                key={cIdx}
                className="px-1 py-0.5 text-center font-mono text-[8px] font-bold text-slate-600 border-b border-[#DCE7E1] bg-[#FAF8F5]"
              >
                {colHeader}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrix.map((rowArr, rIdx) => (
            <tr key={rIdx}>
              <th className="px-1 py-0.5 text-center font-mono text-[8px] font-bold text-slate-600 border-r border-[#DCE7E1] bg-[#FAF8F5]">
                {rows[rIdx]}
              </th>
              {rowArr.map((cellIdx, cIdx) => {
                const isHighlighted = highlightCells.includes(cellIdx);
                const isDC = dontCares.includes(cellIdx);
                const isMin = minterms.includes(cellIdx);

                let val = '-';
                if (isDC) val = 'X';
                else if (isMin) val = '1';

                const cellBg = isHighlighted ? `${colorStyles.bg} ${colorStyles.ring}` : 'bg-white';
                let textColor = 'text-slate-300';
                if (isDC) {
                  textColor = isHighlighted ? 'text-amber-900 font-bold' : 'text-amber-700 font-bold';
                } else if (isMin) {
                  textColor = isHighlighted ? colorStyles.text : 'text-slate-700 font-bold';
                }

                return (
                  <td
                    key={cIdx}
                    className={`relative w-7 h-7 text-center border border-[#E2E8F0] ${cellBg} font-mono`}
                  >
                    {showAllIndices && (
                      <span className="absolute top-0 left-0.5 text-[6px] text-slate-400">
                        {cellIdx}
                      </span>
                    )}
                    <span className={`text-[11px] font-bold ${textColor}`}>
                      {val}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const Section26View = ({ section = dldSection26Data, initialTab = 'foundations', onNavigate }) => {
  const data = section || dldSection26Data;

  // Tabs state (6 tabs)
  const [activeTab, setActiveTab] = useState(initialTab);

  // Worked Examples state
  const [exampleVarFilter, setExampleVarFilter] = useState('All');
  const [exampleFormFilter, setExampleFormFilter] = useState('All');
  const [activeExampleId, setActiveExampleId] = useState('DC-EX01');

  // Practice Problems state (Unified 10 Problems)
  const [practiceVarFilter, setPracticeVarFilter] = useState('All');
  const [practiceDiffFilter, setPracticeDiffFilter] = useState('All');
  const [practiceFormFilter, setPracticeFormFilter] = useState('All');
  const [revealedHints, setRevealedHints] = useState({});
  const [revealedSolutions, setRevealedSolutions] = useState({});

  const toggleHint = (id) => {
    setRevealedHints(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSolution = (id) => {
    setRevealedSolutions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const tabs = [
    { id: 'foundations', label: "1. Don't-Care Foundations", icon: BookOpen },
    { id: 'method', label: "2. K-Map Method with Don't-Cares", icon: Grid },
    { id: 'examples', label: "3. Worked Examples (11)", icon: Layers },
    { id: 'intro5var', label: "4. Introduction to 5-Variable Maps", icon: Compass },
    { id: 'cheatSheet', label: "5. Master Cheat Sheet", icon: FileText },
    { id: 'practiceLab', label: "6. Practice Lab (10)", icon: CheckCircle2 }
  ];

  // Filtered worked examples with synchronized active selection
  const filteredExamples = data.workedExamples.filter(ex => {
    const matchesVar = exampleVarFilter === 'All' || ex.category.startsWith(exampleVarFilter);
    const matchesForm = exampleFormFilter === 'All' || ex.form === exampleFormFilter;
    return matchesVar && matchesForm;
  });

  const activeExample = filteredExamples.find(ex => ex.id === activeExampleId) || filteredExamples[0] || data.workedExamples[0];

  const handleVarFilterChange = (v) => {
    setExampleVarFilter(v);
    const nextFiltered = data.workedExamples.filter(ex => {
      const matchesVar = v === 'All' || ex.category.startsWith(v);
      const matchesForm = exampleFormFilter === 'All' || ex.form === exampleFormFilter;
      return matchesVar && matchesForm;
    });
    if (nextFiltered.length > 0 && !nextFiltered.some(e => e.id === activeExampleId)) {
      setActiveExampleId(nextFiltered[0].id);
    }
  };

  const handleFormFilterChange = (f) => {
    setExampleFormFilter(f);
    const nextFiltered = data.workedExamples.filter(ex => {
      const matchesVar = exampleVarFilter === 'All' || ex.category.startsWith(exampleVarFilter);
      const matchesForm = f === 'All' || ex.form === f;
      return matchesVar && matchesForm;
    });
    if (nextFiltered.length > 0 && !nextFiltered.some(e => e.id === activeExampleId)) {
      setActiveExampleId(nextFiltered[0].id);
    }
  };

  // Unified Practice Problems list
  const allPracticeProblems = data.practiceProblems || data.practiceLab?.problems || [];

  const filteredPracticeProblems = allPracticeProblems.filter(p => {
    const matchesVar = practiceVarFilter === 'All' || p.category.startsWith(practiceVarFilter);
    const matchesDiff = practiceDiffFilter === 'All' || p.difficulty === practiceDiffFilter;
    const matchesForm = practiceFormFilter === 'All' || p.form === practiceFormFilter;
    return matchesVar && matchesDiff && matchesForm;
  });

  return (
    <div className="space-y-8 text-left">
      {/* 1. Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-[#EBF3ED] text-[#285C49] border border-[#C2D7CB]">
              DLD Unit II: Karnaugh Maps
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
              Section 2.6
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <Clock className="w-3.5 h-3.5" />
            <span>45 min comprehensive lecture & lab</span>
          </div>
        </div>

        <div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#1E293B] tracking-tight">
            {data.title}
          </h1>
          <p className="mt-2 text-base text-[#475569] leading-relaxed max-w-4xl">
            {data.description}
          </p>
        </div>

        {/* 6 Structured Introductory Bullets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {data.introductoryBullets.map((bullet, idx) => (
            <div 
              key={idx}
              className="p-3.5 rounded-xl border border-[#E2E8F0] bg-[#FAF8F5]/60 hover:bg-[#FAF8F5] transition-colors space-y-1"
            >
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold uppercase tracking-wider bg-[#285C49] text-white">
                  {bullet.label}
                </span>
              </div>
              <p className="text-xs text-[#334155] leading-relaxed">
                {bullet.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Responsive 6-Tab Navigation Bar (Section 2.5 pattern: no horizontal scrollbar, fully discoverable) */}
      <nav 
        aria-label="Section navigation"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 p-1.5 bg-[#FAF8F5] border border-[#DCE7E1] rounded-2xl shadow-2xs"
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
              className={`flex items-center justify-center gap-1.5 px-2.5 py-2.5 sm:py-2 rounded-xl font-mono text-xs font-semibold text-center transition-all cursor-pointer leading-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-[#285C49] ${
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

      {/* ------------------------------------------------------------- */}
      {/* TAB 1: DON'T-CARE FOUNDATIONS                                 */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'foundations' && (
        <div className="space-y-8">
          {/* Definitions Card */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <div className="border-b border-[#DCE7E1] pb-3">
              <span className="font-mono text-xs font-bold text-[#285C49] uppercase tracking-wider">
                Theoretical Foundations
              </span>
              <h3 className="font-editorial text-2xl font-bold text-[#1E293B] mt-0.5">
                Understanding Don't-Care Conditions
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E2E8F0] space-y-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#285C49]">
                  Simple Definition
                </span>
                <p className="text-xs text-[#334155] leading-relaxed">
                  {data.foundations.simpleDefinition}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E2E8F0] space-y-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#166534]">
                  Formal Definition (Switching Theory)
                </span>
                <p className="text-xs text-[#334155] leading-relaxed">
                  {data.foundations.formalDefinition}
                </p>
              </div>
            </div>

            {/* Truth-Table Output Markings Comparison */}
            <div className="space-y-3 pt-3">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1E293B]">
                Truth-Table Output Markings Distinction
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {data.foundations.valueComparison.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-[#DCE7E1] bg-white space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-base font-bold text-[#285C49]">
                        {item.symbol}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#EBF3ED] text-[#285C49]">
                        {item.name}
                      </span>
                    </div>
                    <p className="text-xs text-[#475569] leading-relaxed">
                      {item.meaning}
                    </p>
                    <div className="pt-2 border-t border-[#F1F5F9] space-y-1">
                      <div className="text-[11px] font-mono text-slate-600">
                        <strong className="text-slate-800">SOP:</strong> {item.sopRole}
                      </div>
                      <div className="text-[11px] font-mono text-slate-600">
                        <strong className="text-slate-800">POS:</strong> {item.posRole}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Real-World BCD Case Study */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <div className="border-b border-[#DCE7E1] pb-3">
              <span className="font-mono text-xs font-bold text-amber-700 uppercase tracking-wider">
                Industrial Case Study
              </span>
              <h3 className="font-editorial text-2xl font-bold text-[#1E293B] mt-0.5">
                {data.foundations.bcdCaseStudy.title}
              </h3>
              <p className="text-xs text-[#475569] mt-1 leading-relaxed">
                {data.foundations.bcdCaseStudy.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-2">
                <span className="font-mono text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Valid BCD Domain (0 to 9)
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-mono">
                  {data.foundations.bcdCaseStudy.validCodes}
                </p>
                <p className="text-xs text-emerald-950 leading-relaxed">
                  Every legal decimal digit maps to an exact 4-bit binary code. Output must be strictly 0 or 1 as specified.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 space-y-2">
                <span className="font-mono text-xs font-bold text-amber-800 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Invalid BCD Domain (10 to 15)
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-mono">
                  {data.foundations.bcdCaseStudy.invalidCodes}
                </p>
                <p className="text-xs text-amber-950 leading-relaxed">
                  These 6 binary combinations can never be generated by a normal decimal digit sender. Their outputs are assigned as don't-cares.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E2E8F0] space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#285C49]">
                Important Design Consideration
              </span>
              <p className="text-xs text-[#334155] leading-relaxed">
                {data.foundations.bcdCaseStudy.presentationCaveat}
              </p>
            </div>
          </div>

          {/* Standard Operating Rules (8 Rules) */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <div className="border-b border-[#DCE7E1] pb-3">
              <span className="font-mono text-xs font-bold text-[#285C49] uppercase tracking-wider">
                Standard Operating Rules
              </span>
              <h3 className="font-editorial text-2xl font-bold text-[#1E293B] mt-0.5">
                8 Rules for K-Map Minimisation with Don't-Cares
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {data.foundations.standardRules.map((rule, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5]/60 hover:bg-[#FAF8F5] transition-colors space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#285C49] text-white flex items-center justify-center font-mono text-[10px] font-bold">
                      {idx + 1}
                    </span>
                    <h5 className="font-mono text-xs font-bold text-[#1E293B]">
                      {rule.title}
                    </h5>
                  </div>
                  <p className="text-xs text-[#475569] leading-relaxed pl-7">
                    {rule.rule}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 2: K-MAP METHOD WITH DON'T-CARES                          */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'method' && (
        <div className="space-y-8">
          {/* Method Card */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <div className="border-b border-[#DCE7E1] pb-3">
              <span className="font-mono text-xs font-bold text-[#285C49] uppercase tracking-wider">
                Grouping Strategy
              </span>
              <h3 className="font-editorial text-2xl font-bold text-[#1E293B] mt-0.5">
                {data.method?.title || "K-Map Grouping Method with Don't-Cares"}
              </h3>
              <p className="text-xs text-[#5F6C64] mt-1">
                {data.method?.conceptualBridge || "Building on Section 2.5: In standard K-maps, every group must contain only 1s (for SOP) or only 0s (for POS). With don't-care conditions, selected X cells can be included in a group to enlarge it to a higher power of two (2, 4, 8, 16), eliminating additional variables."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* SOP Grouping Principles */}
              <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/30 space-y-3">
                <span className="font-mono text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  SOP Grouping Principles
                </span>
                <ul className="space-y-2">
                  {(data.method?.sopGroupingPrinciples || []).map((item, idx) => (
                    <li key={idx} className="text-xs text-slate-700 leading-relaxed flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 flex-shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* POS Grouping Principles */}
              <div className="p-5 rounded-xl border border-blue-200 bg-blue-50/30 space-y-3">
                <span className="font-mono text-xs font-bold text-blue-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-blue-600" />
                  POS Grouping Principles
                </span>
                <ul className="space-y-2">
                  {(data.method?.posGroupingPrinciples || []).map((item, idx) => (
                    <li key={idx} className="text-xs text-slate-700 leading-relaxed flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>


            {/* Visual Demonstrations of Using vs Leaving X */}
            <div className="space-y-4 pt-4 border-t border-[#DCE7E1]">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1E293B]">
                Two Essential Don't-Care Scenarios
              </h4>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Scenario 1: Using an X to enlarge a pair to a quad */}
                <div className="p-5 rounded-xl bg-white border border-[#DCE7E1] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-emerald-700">
                      Scenario 1: Using X to Enlarge a Group
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      m(1, 3) + d(5, 7)
                    </span>
                  </div>
                  <p className="text-xs text-[#334155] leading-relaxed">
                    Minterms 1 and 3 form a 2-cell pair (A'C). By including don't-cares 5 and 7 as 1s, the group doubles into a 4-cell quad {'{1, 3, 5, 7}'}, eliminating variable A and yielding the single literal <strong>C</strong>.
                  </p>
                  <div className="flex justify-center p-3 rounded-lg bg-[#FAF8F5] border border-[#E2E8F0]">
                    <KMapGrid
                      mapType="threeVar"
                      minterms={[1, 3]}
                      maxterms={[0, 2, 4, 6]}
                      dontCares={[5, 7]}
                      targetPolarity="1"
                      groups={[{ group: 'G1', cells: [1, 3, 5, 7] }]}
                      activeGroup="G1"
                      size="sm"
                    />
                  </div>
                </div>

                {/* Scenario 2: Leaving an X unused */}
                <div className="p-5 rounded-xl bg-white border border-[#DCE7E1] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-amber-700">
                      Scenario 2: Leaving X Unused
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      m(1) + d(2)
                    </span>
                  </div>
                  <p className="text-xs text-[#334155] leading-relaxed">
                    Minterm 1 is at cell 01, while don't-care 2 is at cell 10. They are diagonally opposite and cannot group. Grouping cell 2 would require an extra term AB' without covering any required 1s, so cell 2 is left unused.
                  </p>
                  <div className="flex justify-center p-3 rounded-lg bg-[#FAF8F5] border border-[#E2E8F0]">
                    <KMapGrid
                      mapType="twoVar"
                      minterms={[1]}
                      maxterms={[0, 3]}
                      dontCares={[2]}
                      targetPolarity="1"
                      groups={[{ group: 'G1', cells: [1] }]}
                      activeGroup="G1"
                      size="sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 3: WORKED EXAMPLES (11 COMPREHENSIVE PROBLEMS)           */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'examples' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="p-4 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#285C49]" />
                <span className="font-mono text-xs font-bold text-[#1E293B] uppercase tracking-wider">
                  Filter Worked Examples
                </span>
              </div>
              <div className="text-xs font-mono text-slate-500">
                Showing {filteredExamples.length} of {data.workedExamples.length} examples
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#F1F5F9]">
              {/* Variable Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-mono text-slate-500">Variables:</span>
                {['All', '2-Variable', '3-Variable', '4-Variable'].map((v) => (
                  <button
                    key={v}
                    onClick={() => handleVarFilterChange(v)}
                    className={`px-2.5 py-1 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                      exampleVarFilter === v
                        ? 'bg-[#285C49] text-white'
                        : 'bg-[#FAF8F5] text-slate-600 hover:bg-[#EBF3ED]'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>

              {/* Form Filter */}
              <div className="flex items-center gap-1.5 ml-auto">
                <span className="text-xs font-mono text-slate-500">Form:</span>
                {['All', 'SOP', 'POS'].map((f) => (
                  <button
                    key={f}
                    onClick={() => handleFormFilterChange(f)}
                    className={`px-2.5 py-1 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                      exampleFormFilter === f
                        ? 'bg-[#285C49] text-white'
                        : 'bg-[#FAF8F5] text-slate-600 hover:bg-[#EBF3ED]'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Example Selection Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {filteredExamples.map((ex) => {
              const isSelected = ex.id === activeExample.id;
              return (
                <button
                  key={ex.id}
                  onClick={() => setActiveExampleId(ex.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#285C49] bg-[#F4F7F4] ring-2 ring-[#285C49]/20'
                      : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1] hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#1E293B]">
                      {ex.id}
                    </span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                      ex.form === 'SOP' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {ex.form}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 truncate">
                    {ex.category.split(' ')[0]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Detailed Example Panel */}
          {activeExample && (
            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DCE7E1] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#285C49]">
                      {activeExample.id}
                    </span>
                    <span className="text-slate-400">&bull;</span>
                    <span className="font-mono text-xs text-slate-600">
                      {activeExample.category}
                    </span>
                    <span className="text-slate-400">&bull;</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                      activeExample.form === 'SOP' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {activeExample.form}
                    </span>
                  </div>
                  <h3 className="font-editorial text-2xl font-bold text-[#1E293B] mt-1">
                    {activeExample.title}
                  </h3>
                </div>

                <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#E2E8F0] font-mono text-xs text-slate-700">
                  {activeExample.problemStatement}
                </div>
              </div>

              {/* Grid + Table Split View */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left: Coloured K-Map */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1]">
                  <span className="font-mono text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">
                    K-Map Diagram
                  </span>
                  <KMapGrid
                    mapType={activeExample.mapType}
                    minterms={activeExample.minterms}
                    maxterms={activeExample.maxterms}
                    dontCares={activeExample.dontCares}
                    targetPolarity={activeExample.targetPolarity}
                    groups={activeExample.groups}
                    size="md"
                  />
                  <div className="mt-3 text-[11px] font-mono text-slate-500">
                    Polarity: {activeExample.targetPolarity === '1' ? '1s & Xs (SOP)' : '0s & Xs (POS)'}
                  </div>
                </div>

                {/* Right: Group interpretation & Variable Elimination Table */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1E293B]">
                      Group Interpretation & Variable Elimination
                    </h4>

                    <div className="overflow-x-auto border border-[#E2E8F0] rounded-xl">
                      <table className="w-full text-left text-xs font-mono border-collapse">
                        <thead>
                          <tr className="bg-[#FAF8F5] border-b border-[#E2E8F0] text-slate-600">
                            <th className="p-2.5 font-bold">Group</th>
                            <th className="p-2.5 font-bold">Cells</th>
                            <th className="p-2.5 font-bold">Size</th>
                            <th className="p-2.5 font-bold">Fixed Variables</th>
                            <th className="p-2.5 font-bold">Term</th>
                          </tr>
                        </thead>
                        <tbody>
                          {activeExample.groups.map((g, gIdx) => {
                            const color = GROUP_COLORS[gIdx % GROUP_COLORS.length];
                            return (
                              <tr key={g.group} className="border-b border-[#F1F5F9] hover:bg-slate-50/50">
                                <td className="p-2.5 font-bold">
                                  <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] ${color.badge}`}>
                                    {g.group}
                                  </span>
                                </td>
                                <td className="p-2.5 text-slate-700">{`{${g.cells.join(', ')}}`}</td>
                                <td className="p-2.5 text-slate-600">{g.size}</td>
                                <td className="p-2.5 text-slate-700">{g.fixedVars}</td>
                                <td className="p-2.5 font-bold text-[#285C49]">{g.term}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Step-by-Step Derivation */}
                  <div className="space-y-2">
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1E293B]">
                      Step-by-Step Derivation
                    </h4>
                    <ul className="space-y-1.5">
                      {activeExample.stepByStep.map((step, sIdx) => (
                        <li key={sIdx} className="text-xs text-[#334155] leading-relaxed flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#285C49] flex-shrink-0 mt-1.5" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Final Boxed Answer */}
                  <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[#166534] font-bold block">
                        Final Minimal Expression:
                      </span>
                      <span className="font-mono text-lg font-bold text-[#166534]">
                        {activeExample.finalAnswer}
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-white text-[#166534] text-xs font-mono font-bold border border-[#BBF7D0] shadow-2xs">
                      Care entries verified
                    </span>
                  </div>

                  {/* Verification Note */}
                  <div className="text-[11px] text-slate-500 italic">
                    <strong>Verification:</strong> {activeExample.verificationNote}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 4: INTRODUCTION TO 5-VARIABLE MAPS                        */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'intro5var' && (
        <div className="space-y-8">
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <div className="border-b border-[#DCE7E1] pb-3">
              <span className="font-mono text-xs font-bold text-[#285C49] uppercase tracking-wider">
                Advanced Architectural Extension
              </span>
              <h3 className="font-editorial text-2xl font-bold text-[#1E293B] mt-0.5">
                {data.fiveVarIntro.title}
              </h3>
              <p className="text-xs text-[#5F6C64] mt-1">
                {data.fiveVarIntro.subtitle}
              </p>
            </div>

            <p className="text-xs text-[#334155] leading-relaxed">
              {data.fiveVarIntro.structureExplanation}
            </p>

            {/* Two 4x4 Planes Demonstration */}
            <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#E2E8F0] space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E8F0] pb-2">
                <span className="font-mono text-xs font-bold text-[#1E293B]">
                  Two-Plane Architecture: Variable A Selects the Plane
                </span>
                <span className="text-[11px] font-mono text-[#285C49] font-bold">
                  32 Total Minterms (0 to 31)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Plane 0: A = 0 */}
                <div className="p-4 rounded-xl bg-white border border-[#DCE7E1] flex flex-col items-center space-y-2">
                  <div className="flex items-center justify-between w-full border-b border-[#F1F5F9] pb-1">
                    <span className="font-mono text-xs font-bold text-slate-800">
                      Plane 0: A = 0 (m0 to m15)
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      Rows BC, Cols DE
                    </span>
                  </div>
                  <KMapGrid
                    mapType="fourVar"
                    minterms={[0, 2, 8, 10]}
                    maxterms={[]}
                    dontCares={[]}
                    targetPolarity="1"
                    groups={[{ group: 'G1', cells: [0, 2, 8, 10] }]}
                    size="sm"
                  />
                  <span className="text-[11px] font-mono text-slate-500 text-center">
                    Left 4-corner cells {0, 2, 8, 10} highlighted
                  </span>
                </div>

                {/* Plane 1: A = 1 */}
                <div className="p-4 rounded-xl bg-white border border-[#DCE7E1] flex flex-col items-center space-y-2">
                  <div className="flex items-center justify-between w-full border-b border-[#F1F5F9] pb-1">
                    <span className="font-mono text-xs font-bold text-slate-800">
                      Plane 1: A = 1 (m16 to m31)
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      Rows BC, Cols DE
                    </span>
                  </div>
                  <KMapGrid
                    mapType="fourVar"
                    minterms={[16, 18, 24, 26]}
                    maxterms={[]}
                    dontCares={[]}
                    targetPolarity="1"
                    groups={[{ group: 'G1', cells: [16, 18, 24, 26] }]}
                    size="sm"
                  />
                  <span className="text-[11px] font-mono text-slate-500 text-center">
                    Identical 4-corner cells {16, 18, 24, 26} highlighted
                  </span>
                </div>
              </div>

              {/* Solved Illustration Explanation */}
              <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#166534]">
                    {data.fiveVarIntro.solvedModel.title}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#166534]">
                    {data.fiveVarIntro.solvedModel.finalAnswer}
                  </span>
                </div>
                <p className="text-xs text-[#334155] leading-relaxed">
                  Function: {data.fiveVarIntro.solvedModel.problemStatement}. The four corners of Plane 0 {'{0, 2, 8, 10}'} align with the four corners of Plane 1 {'{16, 18, 24, 26}'} across space. Combining both 4-cell corner quads yields an 8-cell octet spanning both planes. Variable A changes (0 to 1) and is eliminated, leaving the single product term <strong>B'E'</strong>.
                </p>
                <div className="text-[11px] text-slate-600 italic">
                  <strong>Key Takeaway:</strong> {data.fiveVarIntro.solvedModel.takeaway}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 5: MASTER CHEAT SHEET                                     */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'cheatSheet' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DCE7E1] pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-[#285C49] uppercase tracking-wider">
                  Comprehensive Revision Reference
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#1E293B] mt-0.5">
                  {data.cheatSheet.title}
                </h3>
                <p className="text-xs text-[#5F6C64] mt-0.5">
                  {data.cheatSheet.subtitle}
                </p>
              </div>

              <button
                onClick={() => window.print()}
                className="px-3.5 py-1.5 rounded-lg bg-[#285C49] hover:bg-[#204a3b] text-white text-xs font-mono font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save as PDF</span>
              </button>
            </div>

            {/* A. Don't-Care Meaning & Markings */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1E293B] flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-[#285C49]" />
                A. Truth-Table Markings & Meaning
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {(data.cheatSheet?.markingsSummary || []).map((m, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-lg font-bold text-[#285C49]">{m.symbol || m.value}</span>
                      <span className="text-[11px] font-mono font-bold text-slate-700">{m.name}</span>
                    </div>
                    <p className="text-xs text-[#475569] leading-relaxed">{m.meaning || m.definition}</p>
                    {m.assignment && (
                      <div className="text-[11px] font-mono text-[#166534] pt-1">
                        <strong>Role:</strong> {m.assignment}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* B. SOP vs POS Comparison Matrix */}
            <div className="space-y-3 pt-2">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1E293B] flex items-center gap-1.5">
                <ArrowRightLeft className="w-3.5 h-3.5 text-[#285C49]" />
                B. SOP vs POS Minimisation Matrix
              </h4>

              <div className="overflow-x-auto border border-[#E2E8F0] rounded-xl">
                <table className="w-full text-left text-xs font-mono border-collapse">
                  <thead>
                    <tr className="bg-[#FAF8F5] border-b border-[#E2E8F0] text-slate-700">
                      <th className="p-2.5 font-bold">Aspect</th>
                      <th className="p-2.5 font-bold text-emerald-800">Sum of Products (SOP)</th>
                      <th className="p-2.5 font-bold text-blue-800">Product of Sums (POS)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(data.cheatSheet?.sopVsPos || []).map((row, idx) => (
                      <tr key={idx} className="border-b border-[#F1F5F9] hover:bg-slate-50/50">
                        <td className="p-2.5 font-bold text-slate-800">{row.aspect}</td>
                        <td className="p-2.5 text-[#166534]">{row.sop}</td>
                        <td className="p-2.5 text-blue-800">{row.pos}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* C. Grouping Rules */}
            <div className="space-y-3 pt-2">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1E293B] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#285C49]" />
                C. Core Grouping Rules
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {(data.cheatSheet?.groupingRules || []).map((r, rIdx) => (
                  <div key={r.num || r.number || rIdx} className="p-3 rounded-lg border border-[#E2E8F0] bg-white flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#EBF3ED] text-[#285C49] flex items-center justify-center font-mono text-[10px] font-bold flex-shrink-0 mt-0.5">
                      {r.num || r.number || rIdx + 1}
                    </span>
                    <div>
                      <h5 className="font-mono text-xs font-bold text-[#1E293B]">{r.rule || r.title}</h5>
                      <p className="text-xs text-[#475569] leading-relaxed mt-0.5">{r.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* D. Quick Method */}
            <div className="space-y-3 pt-2">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1E293B] flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#285C49]" />
                D. 6-Step Minimisation Procedure
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {data.cheatSheet.quickMethod.map((qm, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] space-y-1">
                    <div className="w-6 h-6 rounded-full bg-[#285C49] text-white flex items-center justify-center font-mono text-xs font-bold">
                      {idx + 1}
                    </div>
                    <h5 className="font-mono text-xs font-bold text-[#1E293B]">{qm.step}</h5>
                    <p className="text-[11px] text-[#475569] leading-relaxed">{qm.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* E. Side-by-Side Visual Reminders */}
            <div className="space-y-3 pt-2">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1E293B] flex items-center gap-1.5">
                <Grid className="w-3.5 h-3.5 text-[#285C49]" />
                E. Visual Reminders: When to Use vs Ignore an X
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Useful X: Pair to Quad */}
                <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#166534]">
                      1. Useful X: Enlarge Pair to Quad
                    </span>
                    <span className="text-[11px] font-mono text-[#166534] font-bold">
                      F = C (1 literal)
                    </span>
                  </div>
                  <p className="text-xs text-[#334155] leading-relaxed">
                    Function: F(A, B, C) = \u03A3 m(1, 3), d = {'{5, 7}'}. Including optional cells 5 and 7 doubles the 2-cell pair {'{1, 3}'} (A'C) into a 4-cell quad {'{1, 3, 5, 7}'}, eliminating variable A completely.
                  </p>
                  <div className="flex justify-center pt-1">
                    <MiniKMap26
                      mapType="threeVar"
                      highlightCells={[1, 3, 5, 7]}
                      minterms={[1, 3]}
                      dontCares={[5, 7]}
                      groupColor="emerald"
                      showAllIndices={true}
                    />
                  </div>
                </div>

                {/* Ignored X: Avoid Redundancy */}
                <div className="p-4 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#92400E]">
                      2. Optional X: Left Unused
                    </span>
                    <span className="text-[11px] font-mono text-[#92400E] font-bold">
                      F = C (d6 ignored)
                    </span>
                  </div>
                  <p className="text-xs text-[#334155] leading-relaxed">
                    Function: F(A, B, C) = \u03A3 m(1, 5, 7), d = {'{3, 6}'}. Cell 3 is used to form quad {'{1, 3, 5, 7}'} = C. Cell 6 is an isolated X; grouping it would add redundant term AB without covering any new required 1s, so it is ignored.
                  </p>
                  <div className="flex justify-center pt-1">
                    <MiniKMap26
                      mapType="threeVar"
                      highlightCells={[1, 3, 5, 7]}
                      minterms={[1, 5, 7]}
                      dontCares={[3, 6]}
                      groupColor="amber"
                      showAllIndices={true}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* F. Common Mistakes to Avoid */}
            <div className="space-y-3 pt-2">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1E293B] flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                F. Common Mistakes to Avoid
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {data.cheatSheet.commonMistakes.map((cm, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-rose-50/50 border border-rose-200 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-rose-800 font-mono text-xs font-bold">
                      <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{cm.mistake}</span>
                    </div>
                    <p className="text-xs text-[#334155] leading-relaxed">
                      <strong className="text-[#1E293B]">Correction:</strong> {cm.fix}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 6: PRACTICE LAB (10) (Unified 10 Progressive Problems)    */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'practiceLab' && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DCE7E1] pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-[#285C49] uppercase tracking-wider">
                  Interactive Practice Standard
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#1E293B] mt-0.5">
                  Practice Problems (10)
                </h3>
                <p className="text-xs text-[#5F6C64] mt-0.5">
                  Comprehensive hands-on practice across 2-, 3-, and 4-variable K-maps with don't-care conditions.
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-[#EBF3ED] text-[#285C49] text-xs font-mono font-bold border border-[#C2D7CB]">
                10 Problems
              </span>
            </div>

            {/* Unified Filter Bar */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E2E8F0] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#285C49]" />
                  <span className="font-mono text-xs font-bold text-[#1E293B] uppercase tracking-wider">
                    Filter Practice Problems
                  </span>
                </div>
                <div className="text-xs font-mono text-slate-500">
                  Showing {filteredPracticeProblems.length} of {allPracticeProblems.length} Problems
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-[#E2E8F0]">
                {/* Variable Filter */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono text-slate-500">Variables:</span>
                  {['All', '2-Variable', '3-Variable', '4-Variable'].map((v) => (
                    <button
                      key={v}
                      onClick={() => setPracticeVarFilter(v)}
                      className={`px-2.5 py-1 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                        practiceVarFilter === v
                          ? 'bg-[#285C49] text-white'
                          : 'bg-white text-slate-600 hover:bg-[#EBF3ED] border border-[#DCE7E1]'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>

                {/* Difficulty Filter */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono text-slate-500">Difficulty:</span>
                  {['All', 'Basic', 'Intermediate', 'Advanced', 'Challenging'].map((d) => (
                    <button
                      key={d}
                      onClick={() => setPracticeDiffFilter(d)}
                      className={`px-2.5 py-1 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                        practiceDiffFilter === d
                          ? 'bg-[#285C49] text-white'
                          : 'bg-white text-slate-600 hover:bg-[#EBF3ED] border border-[#DCE7E1]'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>

                {/* Form Filter */}
                <div className="flex items-center gap-1.5 ml-auto">
                  <span className="text-xs font-mono text-slate-500">Form:</span>
                  {['All', 'SOP', 'POS'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setPracticeFormFilter(f)}
                      className={`px-2.5 py-1 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                        practiceFormFilter === f
                          ? 'bg-[#285C49] text-white'
                          : 'bg-white text-slate-600 hover:bg-[#EBF3ED] border border-[#DCE7E1]'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Unified 10 Problems List */}
            <div className="space-y-4 pt-2">
              {filteredPracticeProblems.length === 0 ? (
                <div className="p-8 text-center rounded-xl bg-[#FAF8F5] border border-[#E2E8F0] space-y-3">
                  <p className="text-sm font-mono text-slate-600">
                    No practice problems match the selected filter combination.
                  </p>
                  <button
                    onClick={() => {
                      setPracticeVarFilter('All');
                      setPracticeDiffFilter('All');
                      setPracticeFormFilter('All');
                    }}
                    className="px-4 py-2 rounded-lg bg-[#285C49] text-white text-xs font-mono font-bold cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                filteredPracticeProblems.map((problem) => {
                  const isHintOpen = revealedHints[problem.id];
                  const isSolOpen = revealedSolutions[problem.id];

                  // Difficulty styling badge
                  const diffColor = {
                    Basic: 'bg-emerald-100 text-emerald-800 border-emerald-200',
                    Intermediate: 'bg-blue-100 text-blue-800 border-blue-200',
                    Advanced: 'bg-amber-100 text-amber-800 border-amber-200',
                    Challenging: 'bg-purple-100 text-purple-800 border-purple-200'
                  }[problem.difficulty] || 'bg-slate-100 text-slate-800 border-slate-200';

                  return (
                    <div 
                      key={problem.id} 
                      className="p-5 rounded-xl border border-[#DCE7E1] bg-white hover:border-[#CBD5E1] transition-all space-y-4 shadow-2xs"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-bold text-[#285C49]">
                            {problem.id}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#DCE7E1] text-[11px] font-mono font-semibold text-slate-700">
                            {problem.category}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                            problem.form === 'SOP' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {problem.form}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold border ${diffColor}`}>
                            {problem.difficulty}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleHint(problem.id)}
                            className="px-2.5 py-1 rounded-lg bg-white border border-[#DCE7E1] hover:bg-slate-50 text-[11px] font-mono font-bold text-amber-700 transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <Lightbulb className="w-3 h-3 text-amber-600" />
                            <span>{isHintOpen ? 'Hide Hint' : 'Hint'}</span>
                          </button>
                          <button
                            onClick={() => toggleSolution(problem.id)}
                            className="px-3 py-1 rounded-lg bg-[#285C49] hover:bg-[#204a3b] text-white text-[11px] font-mono font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                          >
                            <Eye className="w-3 h-3" />
                            <span>{isSolOpen ? 'Hide Solution' : 'Reveal Solution'}</span>
                          </button>
                        </div>
                      </div>

                      <div className="text-sm font-bold text-[#1E293B] font-mono">
                        {problem.problemStatement}
                      </div>

                      {/* Hint reveal */}
                      {isHintOpen && (
                        <div className="p-3 rounded-lg bg-[#FEF3C7] border border-[#FDE68A] text-xs text-[#92400E] leading-relaxed flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
                          <div>
                            <strong>Hint:</strong> {problem.hint}
                          </div>
                        </div>
                      )}

                      {/* Solution reveal */}
                      {isSolOpen && (
                        <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                            <div className="md:col-span-5 flex justify-center p-3 rounded-lg bg-white border border-[#DCE7E1]">
                              <KMapGrid
                                mapType={problem.mapType}
                                minterms={problem.minterms}
                                maxterms={problem.maxterms}
                                dontCares={problem.dontCares}
                                targetPolarity={problem.targetPolarity}
                                groups={problem.groups}
                                size="sm"
                              />
                            </div>

                            <div className="md:col-span-7 space-y-3">
                              <div className="space-y-1.5">
                                <h5 className="font-mono text-[11px] font-bold uppercase text-slate-500">
                                  Step-by-Step Solution:
                                </h5>
                                <ul className="space-y-1">
                                  {problem.steps.map((st, sIdx) => (
                                    <li key={sIdx} className="text-xs text-[#334155] leading-relaxed flex items-start gap-1.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#285C49] flex-shrink-0 mt-1.5" />
                                      <span>{st}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="p-2.5 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-between">
                                <span className="font-mono text-xs font-bold text-[#166534]">
                                  Answer: {problem.finalAnswer}
                                </span>
                                <CheckCircle2 className="w-4 h-4 text-[#166534]" />
                              </div>

                              <div className="text-[11px] text-slate-600 italic">
                                <strong>Takeaway:</strong> {problem.takeaway}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Section26View;
