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
  Grid,
  Filter,
  RotateCcw,
  Info,
  Check,
  Eye,
  Compass,
  FileText,
  Printer,
  ArrowRightLeft
} from 'lucide-react';
import { dldSection25Data } from '../data/dldSection25Data';
import { CuratedVideoCard } from './CuratedVideoCard';
import { KMapCheatSheet } from './KMapCheatSheet';

/**
 * Section 2.5 View: Karnaugh Maps - Fundamentals, Two-Variable, Three-Variable, Four-Variable, POS Grouping, and Don't-Care Minimization
 * Strictly zero em-dashes and zero en-dashes throughout.
 * All formulas use actual mathematical symbols: Σ (\u03A3) and Π (\u03A0).
 * Six-Tab Pedagogical Architecture:
 * 1. Start Here: Why K-Maps? (Introductory bullets, video, algebraic factoring vs visual K-Map showcase, power cards, roadmap)
 * 2. Foundations: Gray Code, Map Topology & Cell Indexing (Hamming distance, 2/3/4-var layouts, interactive neighbor explorer, wrapping)
 * 3. Grouping Rules & Term Extraction (8 rules, topology gallery, SOP & POS literal extraction tutorial)
 * 4. Guided Demonstrations (6 step-based interactive walkthroughs: GD1 to GD6)
 * 5. Solved Models (26 classroom blackboard solved models with visual K-Maps and term breakdowns)
 * 6. Cheat Sheet & Practice Lab (Master cheat sheet, 8-point checklist, 28 progressive practice problems)
 */

// Helper: Color palette for K-Map groups
const GROUP_COLORS = [
  { border: 'border-blue-500', bg: 'bg-blue-50/80', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-800 border-blue-300' },
  { border: 'border-emerald-500', bg: 'bg-emerald-50/80', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  { border: 'border-amber-500', bg: 'bg-amber-50/80', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-800 border-amber-300' },
  { border: 'border-purple-500', bg: 'bg-purple-50/80', text: 'text-purple-700', badge: 'bg-purple-100 text-purple-800 border-purple-300' },
  { border: 'border-rose-500', bg: 'bg-rose-50/80', text: 'text-rose-700', badge: 'bg-rose-100 text-rose-800 border-rose-300' }
];

/**
 * Interactive K-Map Grid Component
 * Renders 2x2, 2x4, and 4x4 K-Maps with corner minterm indices, prominent centered target values,
 * color-coded grouping overlays, active focus, and neighbor inspection.
 */
const KMapGrid = ({
  mapType = 'fourVar',
  minterms = [],
  maxterms = [],
  dontCares = [],
  targetPolarity = '1',
  groups = [],
  activeGroup = null,
  inspectedCell = null,
  onCellClick = null,
  showNeighbors = false
}) => {
  const layout = dldSection25Data.foundations.layouts[mapType] || dldSection25Data.foundations.layouts.fourVar;
  const { rowVar, colVar, rows, cols, matrix } = layout;

  // Compute adjacent neighbors for the inspected cell (including wrapping)
  const getNeighbors = (targetIdx) => {
    if (targetIdx === null) return [];
    let r = -1, c = -1;
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === targetIdx) {
          r = i;
          c = j;
          break;
        }
      }
      if (r !== -1) break;
    }
    if (r === -1) return [];

    const numRows = matrix.length;
    const numCols = matrix[0].length;
    const nList = [];

    // Up (wrapping)
    nList.push(matrix[(r - 1 + numRows) % numRows][c]);
    // Down (wrapping)
    nList.push(matrix[(r + 1) % numRows][c]);
    // Left (wrapping)
    nList.push(matrix[r][(c - 1 + numCols) % numCols]);
    // Right (wrapping)
    nList.push(matrix[r][(c + 1) % numCols]);

    return nList;
  };

  const neighbors = showNeighbors && inspectedCell !== null ? getNeighbors(inspectedCell) : [];

  return (
    <div className="inline-block bg-white p-3 sm:p-4 rounded-xl border border-[#DCE7E1] shadow-2xs font-sans text-left">
      <div className="overflow-x-auto">
        <table className="border-collapse select-none">
          <thead>
            <tr>
              {/* Top-left diagonal variable header */}
              <th className="p-2 text-center text-xs font-mono font-bold text-[#285C49] border-b border-r border-[#DCE7E1] bg-[#F4F7F4] min-w-[58px]">
                <div className="text-right text-[11px]">{colVar}</div>
                <div className="w-full h-px bg-[#DCE7E1] my-0.5" />
                <div className="text-left text-[11px]">{rowVar}</div>
              </th>
              {/* Column Gray code headers */}
              {cols.map((colHeader, cIdx) => (
                <th
                  key={cIdx}
                  className="px-3 py-2 text-center text-xs font-mono font-bold text-[#1E293B] border-b border-[#DCE7E1] bg-[#FAF8F5] min-w-[52px] sm:min-w-[62px]"
                >
                  {colHeader}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((rowArr, rIdx) => (
              <tr key={rIdx}>
                {/* Row Gray code header */}
                <th className="px-2.5 py-2 text-center text-xs font-mono font-bold text-[#1E293B] border-r border-[#DCE7E1] bg-[#FAF8F5]">
                  {rows[rIdx]}
                </th>
                {/* Cells */}
                {rowArr.map((cellIdx, cIdx) => {
                  const isMinterm = minterms.includes(cellIdx);
                  const isMaxterm = maxterms.includes(cellIdx);
                  const isDontCare = dontCares.includes(cellIdx);

                  // Check which groups this cell belongs to
                  const memberGroups = groups.filter(g => g.cells && (Array.isArray(g.cells) ? g.cells.includes(cellIdx) : false));
                  const isCellActiveInGroup = activeGroup === 'ALL' 
                    ? memberGroups.length > 0 
                    : memberGroups.some(g => g.group === activeGroup);

                  const isInspected = inspectedCell === cellIdx;
                  const isNeighbor = neighbors.includes(cellIdx);

                  // Cell value determination
                  let displayVal = '';
                  let valClass = 'text-slate-300 font-normal';

                  if (isDontCare) {
                    displayVal = 'X';
                    valClass = 'text-[#D97706] font-bold text-base sm:text-lg';
                  } else if (targetPolarity === '1') {
                    if (isMinterm) {
                      displayVal = '1';
                      valClass = 'text-[#1E293B] font-bold text-base sm:text-lg';
                    } else {
                      displayVal = '0';
                      valClass = 'text-slate-300 text-xs font-normal';
                    }
                  } else {
                    if (isMaxterm) {
                      displayVal = '0';
                      valClass = 'text-[#1E293B] font-bold text-base sm:text-lg';
                    } else {
                      displayVal = '1';
                      valClass = 'text-slate-300 text-xs font-normal';
                    }
                  }

                  // Background & Border styling
                  let cellBg = 'bg-white hover:bg-slate-50/80';
                  let cellBorder = 'border border-[#E2E8F0]';

                  if (isInspected) {
                    cellBg = 'bg-amber-100 ring-2 ring-amber-500 z-10';
                  } else if (isNeighbor) {
                    cellBg = 'bg-emerald-50 ring-2 ring-emerald-400 z-5';
                  } else if (isCellActiveInGroup) {
                    const primaryGroupIdx = groups.findIndex(g => g.group === memberGroups[0]?.group);
                    const colorScheme = GROUP_COLORS[primaryGroupIdx % GROUP_COLORS.length] || GROUP_COLORS[0];
                    cellBg = `${colorScheme.bg} ring-2 ${colorScheme.border} z-5`;
                  } else if (memberGroups.length > 0) {
                    const primaryGroupIdx = groups.findIndex(g => g.group === memberGroups[0]?.group);
                    const colorScheme = GROUP_COLORS[primaryGroupIdx % GROUP_COLORS.length] || GROUP_COLORS[0];
                    cellBg = `${colorScheme.bg}`;
                  }

                  return (
                    <td
                      key={cIdx}
                      onClick={() => onCellClick && onCellClick(cellIdx)}
                      className={`relative w-12 sm:w-16 h-12 sm:h-16 text-center transition-all ${cellBorder} ${cellBg} ${onCellClick ? 'cursor-pointer' : ''}`}
                    >
                      {/* Top-left small minterm index */}
                      <span className="absolute top-1 left-1.5 text-[9px] font-mono font-medium text-slate-400 select-none">
                        m{cellIdx}
                      </span>

                      {/* Top-right group indicators */}
                      {memberGroups.length > 0 && (
                        <div className="absolute top-1 right-1 flex items-center gap-0.5">
                          {memberGroups.map((g, gIdx) => {
                            const groupPaletteIdx = groups.findIndex(grp => grp.group === g.group);
                            const pal = GROUP_COLORS[groupPaletteIdx % GROUP_COLORS.length] || GROUP_COLORS[0];
                            return (
                              <span
                                key={gIdx}
                                className={`w-2 h-2 rounded-full border ${pal.badge}`}
                                title={`Group ${g.group}`}
                              />
                            );
                          })}
                        </div>
                      )}

                      {/* Centered target value */}
                      <span className={`inline-block select-none ${valClass}`}>
                        {displayVal}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend / Info Bar */}
      {groups.length > 0 && (
        <div className="mt-3 pt-2.5 border-t border-[#DCE7E1] flex flex-wrap items-center gap-2 text-xs">
          <span className="font-mono text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Groups:
          </span>
          {groups.map((g, idx) => {
            const pal = GROUP_COLORS[idx % GROUP_COLORS.length];
            const isActive = activeGroup === 'ALL' || activeGroup === g.group;
            return (
              <span
                key={idx}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-mono text-[11px] font-bold border transition-all ${
                  isActive ? `${pal.badge} shadow-xs` : 'bg-slate-100 text-slate-500 border-slate-200 opacity-60'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {g.group}: {g.term}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const Section25View = ({ section }) => {
  const [activeTab, setActiveTab] = useState('start-here');
  const data = dldSection25Data;

  // Tab 1 state
  const [showTruthTable, setShowTruthTable] = useState(false);

  // Tab 2 state
  const [topologyMapSize, setTopologyMapSize] = useState('fourVar');
  const [inspectedCell, setInspectedCell] = useState(0);

  // Tab 4 Guided Demos state
  const [activeDemoId, setActiveDemoId] = useState('GD1');
  const [demoStepIdx, setDemoStepIdx] = useState(0);

  // Tab 5 Worked Models state
  const [modelFilter, setModelFilter] = useState('All');
  const [expandedModels, setExpandedModels] = useState({
    'KM2.5-M01': true,
    'KM2.5-M05': true,
    'KM2.5-M12': true,
    'KM2.5-M21': true
  });

  // Tab 6 Practice Lab state
  const [practiceFilter, setPracticeFilter] = useState('All');
  const [revealedHints, setRevealedHints] = useState({});
  const [revealedSolutions, setRevealedSolutions] = useState({});

  const toggleModel = (id) => {
    setExpandedModels(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleHint = (id) => {
    setRevealedHints(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSolution = (id) => {
    setRevealedSolutions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const tabs = [
    { id: 'start-here', label: '1. Start Here', icon: BookOpen },
    { id: 'foundations', label: '2. Gray Code & Topology', icon: Grid },
    { id: 'grouping-rules', label: '3. Grouping Rules & Terms', icon: ShieldCheck },
    { id: 'guided-demos', label: '4. Guided Demonstrations', icon: Compass },
    { id: 'worked-models', label: '5. Solved Models (26)', icon: Layers },
    { id: 'practice-lab', label: '6. Cheat Sheet & Practice (28)', icon: FileText }
  ];

  const currentDemo = data.guidedDemos.find(d => d.id === activeDemoId) || data.guidedDemos[0];
  const currentStep = currentDemo.steps[demoStepIdx] || currentDemo.steps[0];

  const handleDemoChange = (id) => {
    setActiveDemoId(id);
    setDemoStepIdx(0);
  };

  const handleNextStep = () => {
    if (demoStepIdx < currentDemo.steps.length - 1) {
      setDemoStepIdx(demoStepIdx + 1);
    }
  };

  const handlePrevStep = () => {
    if (demoStepIdx > 0) {
      setDemoStepIdx(demoStepIdx - 1);
    }
  };

  const handleResetStep = () => {
    setDemoStepIdx(0);
  };

  // Model categories
  const modelCategories = [
    'All',
    '2-Variable K-Map',
    '3-Variable K-Map',
    '4-Variable K-Map',
    'Don\'t-Care Minimization',
    'Special Cases'
  ];

  const filteredModels = modelFilter === 'All'
    ? data.workedModels
    : data.workedModels.filter(m => m.category === modelFilter);

  // Practice filters
  const practiceDifficulties = ['All', 'Basic', 'Intermediate', 'Advanced', 'Challenge'];
  const filteredPractice = practiceFilter === 'All'
    ? data.practiceLab
    : data.practiceLab.filter(p => p.difficulty === practiceFilter);

  return (
    <div className="space-y-8 text-left">
      {/* 1. Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-[#EBF3ED] text-[#285C49] border border-[#285C49]/20">
              Section {data.number}
            </span>
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
              {data.badge}
            </span>
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-[#E0E7FF] text-[#3730A3] border border-[#C7D2FE]">
              Classroom Rebuild
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#5F6C64]">
            <Clock className="w-3.5 h-3.5" />
            <span>{data.estimatedReadTime}</span>
          </div>
        </div>

        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1E293B] leading-tight">
            {data.title}
          </h1>
          <p className="text-sm sm:text-base text-[#475569] mt-3 leading-relaxed font-normal">
            {data.overview}
          </p>
        </div>

        {/* Structured Introductory Bullets (WHY, WHERE, WHAT, HOW, WHY CHOSEN, REMEMBER) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {data.introductoryBullets.map((bullet, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1 hover:border-[#285C49]/40 transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#285C49]" />
                <span className="font-mono text-xs font-bold text-[#285C49] tracking-wider">
                  {bullet.label}
                </span>
              </div>
              <p className="text-xs text-[#334155] leading-relaxed">
                {bullet.text}
              </p>
            </div>
          ))}
        </div>

        {/* Data Science Connection */}
        <div className="p-4 rounded-xl bg-[#F4F7F4] border border-[#DCE7E1] flex items-start gap-3">
          <div className="p-2 rounded-lg bg-[#285C49] text-white flex-shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#285C49]">
              Feature Space Geometry & Dimensionality Reduction Context
            </h4>
            <p className="text-xs text-[#293B32]/90 leading-relaxed font-normal">
              {data.dataScienceConnection}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Navigation Tab Bar */}
      <div className="flex items-center gap-1.5 p-1.5 bg-[#FAF8F5] border border-[#DCE7E1] rounded-xl overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-mono text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-white text-[#285C49] shadow-xs border border-[#DCE7E1]'
                  : 'text-[#5F6C64] hover:text-[#1E293B] hover:bg-white/60'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#285C49]' : 'text-[#8C9A90]'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: START HERE - WHY K-MAPS?                                        */}
      {/* ===================================================================== */}
      {activeTab === 'start-here' && (
        <div className="space-y-6">
          {/* Curated Video Lecture */}
          <div className="space-y-2">
            <h3 className="font-editorial text-lg font-bold text-[#1E293B] flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#285C49]" />
              Video Lecture: Introduction to Karnaugh Maps
            </h3>
            <CuratedVideoCard videoKey="kmap-intro" />
          </div>

          {/* Algebraic vs K-Map Comparison Showcase */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-5">
            <div className="border-b border-[#DCE7E1] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#285C49]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#285C49]">
                  Teaching Demonstration
                </span>
              </div>
              <h3 className="font-editorial text-xl font-bold text-[#1E293B] mt-1">
                {data.startHere.algebraVsKMapComparison.problemTitle}
              </h3>
              <p className="font-mono text-sm text-[#285C49] font-bold mt-1">
                {data.startHere.algebraVsKMapComparison.functionSOP}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Minterm indices: {data.startHere.algebraVsKMapComparison.mintermsList} (Σ m(3, 5, 6, 7))
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Left Box: Algebraic Simplification */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#FEF2F2]/60 border border-red-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-red-800">
                      Method A: Boolean Algebra Route
                    </h4>
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-semibold border border-red-200">
                    Tedious Factoring
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  {data.startHere.algebraVsKMapComparison.algebraicRoute.steps.map((st, sIdx) => (
                    <div key={sIdx} className="p-2.5 rounded-lg bg-white border border-red-100 space-y-1">
                      <div className="font-mono font-bold text-red-900">
                        Step {st.stepNumber}: {st.action}
                      </div>
                      <div className="font-mono text-[11px] bg-red-50/70 p-1.5 rounded text-red-950 font-semibold">
                        {st.expression}
                      </div>
                      <div className="text-[10px] text-slate-500 italic">
                        {st.note}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Box: K-Map Visual Route */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#F0FDF4]/60 border border-emerald-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-800">
                      Method B: Karnaugh Map Visual Route
                    </h4>
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold border border-emerald-200">
                    Immediate 1-Step Inspection
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  {data.startHere.algebraVsKMapComparison.kmapRoute.explanation}
                </p>

                {/* 3-Variable K-Map Visualization */}
                <div className="flex justify-center py-1">
                  <KMapGrid
                    mapType="threeVar"
                    minterms={data.startHere.algebraVsKMapComparison.mintermIndices}
                    targetPolarity="1"
                    groups={[
                      { group: 'G1', cells: [3, 7], term: 'BC' },
                      { group: 'G2', cells: [5, 7], term: 'AC' },
                      { group: 'G3', cells: [6, 7], term: 'AB' }
                    ]}
                    activeGroup="ALL"
                  />
                </div>

                <div className="space-y-1.5 text-xs">
                  {data.startHere.algebraVsKMapComparison.kmapRoute.groups.map((grp, gIdx) => (
                    <div key={gIdx} className="p-2 rounded-lg bg-white border border-emerald-100 flex items-center justify-between font-mono">
                      <span className="font-bold text-emerald-800">
                        {grp.group} ({grp.cells}):
                      </span>
                      <span className="text-[11px] text-slate-600">
                        {grp.variables}
                      </span>
                      <span className="font-bold text-[#1E293B] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Term: {grp.term}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-lg bg-emerald-100/70 border border-emerald-200 text-xs text-emerald-950 font-semibold space-y-1">
                  <div>Final Minimal Expression: <span className="font-mono font-bold text-base text-emerald-900">{data.startHere.algebraVsKMapComparison.kmapRoute.finalAnswer}</span></div>
                  <p className="text-[11px] text-emerald-800 font-normal">
                    {data.startHere.algebraVsKMapComparison.kmapRoute.takeaway}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Literal Elimination Power Table */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#285C49]" />
              <h3 className="font-editorial text-lg font-bold text-[#1E293B]">
                Literal Elimination Power of Group Sizes (2^k Cells)
              </h3>
            </div>
            <p className="text-xs text-[#5F6C64]">
              A fundamental mathematical law of K-Maps: grouping 2^k adjacent cells eliminates exactly k variables from that product term.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {data.startHere.powerOfTwoElimination.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1.5 text-center"
                >
                  <span className="font-mono text-[11px] font-bold text-[#285C49] uppercase tracking-wider">
                    {item.name}
                  </span>
                  <div className="font-mono text-base font-bold text-[#1E293B]">
                    {item.power}
                  </div>
                  <div className="text-xs text-emerald-700 font-medium">
                    Eliminates {item.eliminated}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Remaining: {item.remaining}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6-Phase Solving Roadmap */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#285C49]" />
              <h3 className="font-editorial text-lg font-bold text-[#1E293B]">
                Classroom Solving Roadmap: 6 Systematic Stages
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {data.startHere.roadmap.map((st, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white border border-[#DCE7E1] space-y-1 hover:border-[#285C49] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#285C49]">
                      {st.step}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 font-semibold">
                      Phase {idx + 1}
                    </span>
                  </div>
                  <h4 className="font-sans text-xs font-bold text-[#1E293B]">
                    {st.title}
                  </h4>
                  <p className="text-xs text-[#475569] leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: FOUNDATIONS - GRAY CODE, MAP TOPOLOGY & CELL INDEXING           */}
      {/* ===================================================================== */}
      {activeTab === 'foundations' && (
        <div className="space-y-6">
          {/* Gray Code Requirement */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <Grid className="w-4 h-4 text-[#285C49]" />
              <h3 className="font-editorial text-lg font-bold text-[#1E293B]">
                {data.foundations.grayCodeExplanation.heading}
              </h3>
            </div>
            <p className="text-xs text-[#334155] leading-relaxed">
              {data.foundations.grayCodeExplanation.summary}
            </p>
            <div className="p-3.5 rounded-xl bg-[#F4F7F4] border border-[#DCE7E1] text-xs text-[#285C49] leading-relaxed">
              <span className="font-bold">Combining Law Basis: </span>
              {data.foundations.grayCodeExplanation.whyAdjacencyMatters}
            </div>

            {/* Comparison Table: Binary vs Gray Code */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border border-[#DCE7E1] rounded-xl overflow-hidden">
                <thead className="bg-[#FAF8F5] text-slate-700 font-mono text-[11px] border-b border-[#DCE7E1]">
                  <tr>
                    <th className="p-2.5">Transition Step</th>
                    <th className="p-2.5">Binary Sequence</th>
                    <th className="p-2.5">Binary Bit Change</th>
                    <th className="p-2.5">Gray Code Sequence</th>
                    <th className="p-2.5">Gray Code Bit Change</th>
                    <th className="p-2.5">Adjacency Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] font-mono">
                  {data.foundations.grayCodeExplanation.comparisonTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70">
                      <td className="p-2.5 font-bold text-slate-800">{row.step}</td>
                      <td className="p-2.5">{row.binary}</td>
                      <td className={`p-2.5 font-semibold ${row.binaryDiff.includes('INVALID') ? 'text-red-600' : 'text-slate-600'}`}>
                        {row.binaryDiff}
                      </td>
                      <td className="p-2.5 text-emerald-700 font-bold">{row.gray}</td>
                      <td className="p-2.5 text-emerald-700 font-semibold">{row.grayDiff}</td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          row.status.includes('breaks') ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive Topology Selector & Neighbor Inspector */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DCE7E1] pb-3">
              <div>
                <h3 className="font-editorial text-lg font-bold text-[#1E293B]">
                  Interactive Cell Neighbor Inspector
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click any cell in the grid to highlight its horizontal, vertical, and wrapped adjacent neighbors!
                </p>
              </div>

              {/* Map Size Selector */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
                {[
                  { key: 'twoVar', label: '2-Variable (2x2)' },
                  { key: 'threeVar', label: '3-Variable (2x4)' },
                  { key: 'fourVar', label: '4-Variable (4x4)' }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      setTopologyMapSize(item.key);
                      setInspectedCell(0);
                    }}
                    className={`px-3 py-1.5 rounded-md font-mono text-xs font-bold transition-all ${
                      topologyMapSize === item.key
                        ? 'bg-white text-[#285C49] shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Interactive Map Grid */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 bg-[#FAF8F5] rounded-xl border border-[#DCE7E1]">
                <KMapGrid
                  mapType={topologyMapSize}
                  minterms={[]}
                  targetPolarity="1"
                  inspectedCell={inspectedCell}
                  onCellClick={(idx) => setInspectedCell(idx)}
                  showNeighbors={true}
                />
                <div className="mt-3 flex items-center gap-4 text-xs font-mono text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-amber-200 border border-amber-500" />
                    Selected Cell
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-500" />
                    Adjacent Neighbors (Differs by 1 bit)
                  </span>
                </div>
              </div>

              {/* Right Column: Inspected Cell Breakdown */}
              <div className="lg:col-span-5 space-y-3">
                <div className="p-4 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#285C49] uppercase tracking-wider">
                      Cell Inspector
                    </span>
                    <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold border border-amber-200">
                      Cell m{inspectedCell}
                    </span>
                  </div>

                  {(() => {
                    const activeLayout = data.foundations.layouts[topologyMapSize];
                    const cellDetail = activeLayout.cellDetails[inspectedCell] || { binary: '00', term: '-' };
                    return (
                      <div className="space-y-2 text-xs pt-1">
                        <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200 font-mono">
                          <span className="text-slate-500">Binary Value:</span>
                          <span className="font-bold text-[#1E293B]">{cellDetail.binary}</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200 font-mono">
                          <span className="text-slate-500">Minterm Literal:</span>
                          <span className="font-bold text-emerald-800">{cellDetail.term}</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200 text-emerald-950 text-[11px] leading-relaxed">
                          <span className="font-bold">Boolean Adjacency Law: </span>
                          Moving from cell m{inspectedCell} to any highlighted green neighbor changes exactly one variable literal, allowing xy + xy' = x to simplify immediately.
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Topological Adjacency Explanations */}
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2.5 text-xs">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1E293B] flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-[#285C49]" />
                    Boundary Wraparound Properties
                  </h4>
                  <div className="space-y-1.5 text-slate-700 leading-relaxed text-[11px]">
                    <p>
                      <strong className="text-slate-900">Cylindrical Horizontal: </strong>
                      {data.foundations.topologicalWraparound.cylindricalHorizontal}
                    </p>
                    <p>
                      <strong className="text-slate-900">Cylindrical Vertical: </strong>
                      {data.foundations.topologicalWraparound.cylindricalVertical}
                    </p>
                    <p>
                      <strong className="text-slate-900">Toroidal Four Corners: </strong>
                      {data.foundations.topologicalWraparound.toroidalCorners}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: GROUPING RULES AND TERM EXTRACTION                              */}
      {/* ===================================================================== */}
      {activeTab === 'grouping-rules' && (
        <div className="space-y-6">
          {/* 8 Mandatory Grouping Rules */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#285C49]" />
              <h3 className="font-editorial text-lg font-bold text-[#1E293B]">
                The 8 Mandatory Karnaugh Map Grouping Axioms
              </h3>
            </div>
            <p className="text-xs text-[#5F6C64]">
              Grouping errors represent 90% of exam mistakes. Every valid group must satisfy all 8 rules simultaneously:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {data.groupingAndTerms.rules.map((r) => (
                <div
                  key={r.rule}
                  className="p-4 rounded-xl bg-white border border-[#DCE7E1] space-y-1.5 hover:border-[#285C49] transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#EBF3ED] text-[#285C49] border border-[#285C49]/20">
                      Rule {r.rule}
                    </span>
                    <span className="font-mono text-[11px] font-semibold text-slate-700">
                      {r.name}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-[#1E293B]">
                    {r.ruleStatement}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {r.rationale}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Topology Gallery */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <Grid className="w-4 h-4 text-[#285C49]" />
              <h3 className="font-editorial text-lg font-bold text-[#1E293B]">
                Visual Topology Gallery: Valid Groups vs Illegal Geometries
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {data.groupingAndTerms.visualTopologies.map((topo) => (
                <div
                  key={topo.id}
                  className={`p-3.5 rounded-xl border space-y-1.5 ${
                    topo.valid
                      ? 'bg-[#FAF8F5] border-[#DCE7E1]'
                      : 'bg-red-50/70 border-red-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold text-[#1E293B]">
                      {topo.name}
                    </span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                      topo.valid ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'
                    }`}>
                      {topo.valid ? 'VALID' : 'STRICTLY ILLEGAL'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {topo.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Dedicated Tutorial: How to Write the Boolean Term from a Group */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-5">
            <div className="border-b border-[#DCE7E1] pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#285C49]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#285C49]">
                  Comprehensive Derivation Guide
                </span>
              </div>
              <h3 className="font-editorial text-xl font-bold text-[#1E293B] mt-1">
                How to Derive the Simplified Boolean Term from a Group
              </h3>
              <p className="text-xs text-[#5F6C64] mt-0.5">
                Students often group correctly but write the wrong term. Follow these rigorous variable-elimination rules:
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* SOP Derivation Rules */}
              <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#DCE7E1] space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#285C49]">
                    1. Product Term Extraction (SOP: Grouping 1s)
                  </h4>
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    AND Terms
                  </span>
                </div>

                <ul className="space-y-2 text-xs text-slate-700">
                  {data.groupingAndTerms.termExtractionGuide.sopRule.rules.map((rl, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#285C49] mt-1.5 flex-shrink-0" />
                      <span>{rl}</span>
                    </li>
                  ))}
                </ul>

                <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] text-xs text-slate-800 space-y-1">
                  <span className="font-mono font-bold text-[#285C49]">Classroom Example: </span>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                    {data.groupingAndTerms.termExtractionGuide.sopRule.example}
                  </p>
                </div>
              </div>

              {/* POS Derivation Rules */}
              <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#DCE7E1] space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-purple-800">
                    2. Sum Term Extraction (POS: Grouping 0s)
                  </h4>
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                    OR Terms
                  </span>
                </div>

                <ul className="space-y-2 text-xs text-slate-700">
                  {data.groupingAndTerms.termExtractionGuide.posRule.rules.map((rl, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-700 mt-1.5 flex-shrink-0" />
                      <span>{rl}</span>
                    </li>
                  ))}
                </ul>

                <div className="p-3 rounded-lg bg-purple-50/70 border border-purple-200 text-xs text-purple-950 space-y-1">
                  <span className="font-mono font-bold text-purple-900">Classroom Example: </span>
                  <p className="text-[11px] text-purple-800 leading-relaxed font-normal">
                    {data.groupingAndTerms.termExtractionGuide.posRule.example}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 4: GUIDED DEMONSTRATIONS (GD1 TO GD6)                              */}
      {/* ===================================================================== */}
      {activeTab === 'guided-demos' && (
        <div className="space-y-6">
          {/* Demo Selector Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-white border border-[#DCE7E1] rounded-xl overflow-x-auto shadow-2xs">
            {data.guidedDemos.map((demo) => {
              const isActive = activeDemoId === demo.id;
              return (
                <button
                  key={demo.id}
                  onClick={() => handleDemoChange(demo.id)}
                  className={`px-3 py-2 rounded-lg font-mono text-xs font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#285C49] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {demo.id}: {demo.title.split(':')[1] || demo.title}
                </button>
              );
            })}
          </div>

          {/* Active Demo Walkthrough Card */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DCE7E1] pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-[#285C49] uppercase tracking-wider">
                  Guided Demonstration Walkthrough
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#1E293B] mt-0.5">
                  {currentDemo.title}
                </h3>
                <p className="font-mono text-sm font-bold text-emerald-800 mt-1">
                  Target: {currentDemo.functionText}
                </p>
              </div>

              {/* Step Navigation Controls */}
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-slate-500 font-semibold mr-1">
                  Step {demoStepIdx + 1} of {currentDemo.steps.length}
                </span>
                <button
                  onClick={handlePrevStep}
                  disabled={demoStepIdx === 0}
                  className="px-3 py-1.5 rounded-lg border border-[#DCE7E1] bg-white hover:bg-slate-50 text-xs font-mono font-bold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={demoStepIdx === currentDemo.steps.length - 1}
                  className="px-3.5 py-1.5 rounded-lg bg-[#285C49] hover:bg-[#1E4738] text-white text-xs font-mono font-bold disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition-colors"
                >
                  Next Step
                </button>
                <button
                  onClick={handleResetStep}
                  className="p-1.5 rounded-lg border border-[#DCE7E1] bg-white hover:bg-slate-50 text-slate-500 transition-colors"
                  title="Reset Demo"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Interactive Grid and Step Explanation */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Map Grid Visualizer */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center p-4 bg-[#FAF8F5] rounded-xl border border-[#DCE7E1]">
                <KMapGrid
                  mapType={currentDemo.mapType}
                  minterms={currentDemo.minterms || []}
                  maxterms={currentDemo.maxterms || []}
                  dontCares={currentDemo.dontCares || []}
                  targetPolarity={currentDemo.targetPolarity || '1'}
                  groups={currentDemo.steps
                    .filter(s => s.activeGroup && s.activeGroup !== 'ALL')
                    .map((s, idx) => ({ group: s.activeGroup, cells: s.cells, term: s.term }))}
                  activeGroup={currentStep.activeGroup}
                />
              </div>

              {/* Step Details Box */}
              <div className="lg:col-span-6 space-y-4">
                <div className="p-5 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#EBF3ED] text-[#285C49] border border-[#285C49]/20">
                      Step {currentStep.stepNumber}: {currentStep.title}
                    </span>
                    {currentStep.annotation && (
                      <span className="font-mono text-[10px] font-semibold text-slate-500">
                        {currentStep.annotation}
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                    {currentStep.action}
                  </p>

                  {currentStep.term && (
                    <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 font-mono text-xs flex items-center justify-between">
                      <span className="text-emerald-800 font-bold">Extracted Group Term:</span>
                      <span className="text-base font-bold text-emerald-950 bg-white px-3 py-1 rounded border border-emerald-300">
                        {currentStep.term}
                      </span>
                    </div>
                  )}

                  {currentStep.finalAnswer && (
                    <div className="p-3.5 rounded-lg bg-[#285C49] text-white space-y-1">
                      <div className="font-mono text-xs uppercase tracking-wider text-emerald-200 font-semibold">
                        Final Minimal Expression:
                      </div>
                      <div className="font-mono text-lg font-bold">
                        {currentStep.finalAnswer}
                      </div>
                    </div>
                  )}
                </div>

                {/* Progress Indicators */}
                <div className="flex items-center justify-between px-1">
                  {currentDemo.steps.map((st, idx) => (
                    <button
                      key={idx}
                      onClick={() => setDemoStepIdx(idx)}
                      className={`flex-1 h-2 rounded-full mx-1 transition-all ${
                        idx === demoStepIdx
                          ? 'bg-[#285C49]'
                          : idx < demoStepIdx
                          ? 'bg-emerald-300'
                          : 'bg-slate-200'
                      }`}
                      title={`Step ${idx + 1}: ${st.title}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 5: PROGRESSIVE SOLVED K-MAP MODELS (26 MODELS)                     */}
      {/* ===================================================================== */}
      {activeTab === 'worked-models' && (
        <div className="space-y-6">
          {/* Header & Filter Controls */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-editorial text-xl font-bold text-[#1E293B]">
                  Progressive Solved Models: 26 Classroom Blackboards
                </h3>
                <p className="text-xs text-[#5F6C64] mt-0.5">
                  Complete classroom solutions with visual K-Maps, visible grouping overlays, and step-by-step term derivations.
                </p>
              </div>

              <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-[#EBF3ED] text-[#285C49] font-bold border border-[#285C49]/20 self-start sm:self-auto">
                Showing {filteredModels.length} of {data.workedModels.length} Models
              </span>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="font-mono text-xs text-slate-400 font-semibold mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filter:
              </span>
              {modelCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setModelFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                    modelFilter === cat
                      ? 'bg-[#285C49] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Models Grid */}
          <div className="grid grid-cols-1 gap-6">
            {filteredModels.map((model) => {
              const isExpanded = expandedModels[model.id] ?? true;
              return (
                <div
                  key={model.id}
                  className="rounded-2xl bg-white border border-[#DCE7E1] shadow-soft overflow-hidden"
                >
                  {/* Model Card Header */}
                  <div
                    onClick={() => toggleModel(model.id)}
                    className="p-4 sm:p-5 flex items-center justify-between cursor-pointer bg-[#FAF8F5] hover:bg-[#F2F7F4] border-b border-[#DCE7E1] transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white text-[#285C49] border border-[#DCE7E1]">
                          {model.id}
                        </span>
                        <span className="font-mono text-[11px] font-semibold text-slate-500">
                          {model.category}
                        </span>
                        <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          model.difficulty === 'Basic'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : model.difficulty === 'Intermediate'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-purple-50 text-purple-700 border border-purple-200'
                        }`}>
                          {model.difficulty}
                        </span>
                      </div>
                      <h4 className="font-editorial text-base sm:text-lg font-bold text-[#1E293B]">
                        {model.title}
                      </h4>
                    </div>

                    <button className="p-1.5 text-slate-400 hover:text-slate-600">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Model Card Body */}
                  {isExpanded && (
                    <div className="p-5 sm:p-6 space-y-5">
                      {/* Problem Statement Banner */}
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs sm:text-sm text-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="text-slate-500 font-semibold">Problem: </span>
                          <span className="font-bold text-[#285C49]">{model.problemStatement}</span>
                        </div>
                        <span className="text-[11px] text-slate-500">
                          Map: {model.mapType === 'twoVar' ? '2x2 (4 cells)' : model.mapType === 'threeVar' ? '2x4 (8 cells)' : '4x4 (16 cells)'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        {/* Left: Visual K-Map Grid */}
                        <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-[#FAF8F5] rounded-xl border border-[#DCE7E1]">
                          <KMapGrid
                            mapType={model.mapType}
                            minterms={model.minterms || []}
                            maxterms={model.maxterms || []}
                            dontCares={model.dontCares || []}
                            targetPolarity={model.targetPolarity || '1'}
                            groups={model.groupingSteps.map((s, idx) => ({ group: s.group, cells: s.cells, term: s.term }))}
                            activeGroup="ALL"
                          />
                        </div>

                        {/* Right: Step-by-Step Classroom Derivation */}
                        <div className="lg:col-span-7 space-y-3">
                          <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-[#285C49]">
                            Classroom Derivation Steps
                          </h5>

                          <div className="space-y-2 text-xs">
                            {model.groupingSteps.map((st, sIdx) => (
                              <div
                                key={sIdx}
                                className="p-3 rounded-lg bg-white border border-[#DCE7E1] space-y-1 font-mono"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-[#1E293B]">
                                    {st.group}: {st.type || 'Group'}
                                  </span>
                                  {st.annotation && (
                                    <span className="text-[10px] text-slate-500 font-sans italic">
                                      {st.annotation}
                                    </span>
                                  )}
                                </div>
                                <div className="text-[11px] text-slate-600">
                                  Cells: [{Array.isArray(st.cells) ? st.cells.join(', ') : st.cells}] {st.constantVars ? `| Constants: ${st.constantVars}` : ''}
                                </div>
                                <div className="pt-1 flex items-center justify-between text-xs">
                                  <span className="text-slate-500">Derived Term:</span>
                                  <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                    {st.term}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Final Answer Banner */}
                          <div className="p-3.5 rounded-xl bg-[#285C49] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono">
                            <span className="text-xs uppercase tracking-wider text-emerald-200 font-semibold">
                              Final Minimized Answer:
                            </span>
                            <span className="text-base font-bold text-white">
                              {model.finalAnswer}
                            </span>
                          </div>

                          {/* Verification Note */}
                          {model.verificationNote && (
                            <p className="text-[11px] text-slate-500 italic pt-1">
                              Note: {model.verificationNote}
                            </p>
                          )}
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

      {/* ===================================================================== */}
      {/* TAB 6: CHEAT SHEET, EXAM CHECKLIST & PRACTICE LAB                     */}
      {/* ===================================================================== */}
      {activeTab === 'practice-lab' && (
        <div className="space-y-8">
          {/* Section A: Master Cheat Sheet */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DCE7E1] pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-[#285C49] uppercase tracking-wider">
                  Revision Card
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#1E293B] mt-0.5">
                  {data.cheatSheet.title}
                </h3>
              </div>
            </div>

            {/* Gray Code Order & Literal Reduction Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Gray Code Headings */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1E293B]">
                  1. Standard Gray Code Orders
                </h4>
                <div className="space-y-1.5 text-xs font-mono">
                  {data.cheatSheet.grayCodeHeadings.map((h, hIdx) => (
                    <div key={hIdx} className="p-2 rounded bg-white border border-[#DCE7E1] flex items-center justify-between">
                      <span className="font-bold text-[#285C49]">{h.dim}:</span>
                      <span className="text-slate-700">Rows: {h.rows} | Cols: {h.cols}</span>
                      <span className="text-slate-500 font-semibold">({h.totalCells} cells)</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Literal Reduction Power */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1E293B]">
                  2. Group Sizing & Literal Elimination
                </h4>
                <div className="space-y-1.5 text-xs font-mono">
                  {data.cheatSheet.groupSizePower.map((g, gIdx) => (
                    <div key={gIdx} className="p-2 rounded bg-white border border-[#DCE7E1] flex items-center justify-between">
                      <span className="font-bold text-emerald-800">{g.name}:</span>
                      <span className="text-slate-700">Eliminates {g.varsEliminated} var</span>
                      <span className="text-slate-500 font-semibold">{g.literalsRemaining}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SOP vs POS Comparison Table */}
            <div className="space-y-2">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1E293B]">
                3. SOP vs POS Grouping Comparison Table
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border border-[#DCE7E1] rounded-xl overflow-hidden font-mono">
                  <thead className="bg-[#FAF8F5] text-slate-700 font-bold border-b border-[#DCE7E1]">
                    <tr>
                      <th className="p-2.5">Aspect</th>
                      <th className="p-2.5 text-emerald-800">Sum of Products (SOP)</th>
                      <th className="p-2.5 text-purple-800">Product of Sums (POS)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {data.cheatSheet.sopVsPosComparison.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50">
                        <td className="p-2.5 font-bold text-slate-800">{row.aspect}</td>
                        <td className="p-2.5 text-emerald-900">{row.sop}</td>
                        <td className="p-2.5 text-purple-900">{row.pos}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 8-Point Exam Checklist */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#F4F7F4] border border-[#DCE7E1] space-y-2.5">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#285C49] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                8-Point Examination Solving Checklist
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-[#293B32]">
                {data.cheatSheet.examChecklist.map((chk, cIdx) => (
                  <div key={cIdx} className="flex items-start gap-2 p-2 rounded bg-white/80 border border-[#DCE7E1]/60">
                    <Check className="w-4 h-4 text-[#285C49] mt-0.5 flex-shrink-0" />
                    <span>{chk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section B: Practice Lab (28 Problems) */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DCE7E1] pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-[#285C49] uppercase tracking-wider">
                  Interactive Lab
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#1E293B] mt-0.5">
                  Practice Lab: 28 Progressive Examination Problems
                </h3>
                <p className="text-xs text-[#5F6C64] mt-0.5">
                  Self-paced problem sets with progressive difficulty, hints, and complete blackboard derivations.
                </p>
              </div>

              {/* Difficulty Filter */}
              <div className="flex flex-wrap items-center gap-1.5">
                {practiceDifficulties.map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setPracticeFilter(diff)}
                    className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                      practiceFilter === diff
                        ? 'bg-[#285C49] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {diff} ({diff === 'All' ? data.practiceLab.length : data.practiceLab.filter(p => p.difficulty === diff).length})
                  </button>
                ))}
              </div>
            </div>

            {/* Practice Problems Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPractice.map((prob) => {
                const isHintRevealed = revealedHints[prob.id];
                const isSolutionRevealed = revealedSolutions[prob.id];

                return (
                  <div
                    key={prob.id}
                    className="p-4 sm:p-5 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                          {prob.id}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#FAF8F5] text-slate-600 border border-[#DCE7E1]">
                            {prob.mapDimensions}
                          </span>
                          <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            prob.difficulty === 'Basic'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : prob.difficulty === 'Intermediate'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : prob.difficulty === 'Advanced'
                              ? 'bg-purple-50 text-purple-700 border border-purple-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}>
                            {prob.difficulty}
                          </span>
                        </div>
                      </div>

                      <div className="font-mono text-xs sm:text-sm font-bold text-[#1E293B]">
                        {prob.problemStatement}
                      </div>

                      {/* Hint Toggle */}
                      {isHintRevealed && (
                        <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed font-sans">
                          <span className="font-bold font-mono">Hint: </span>
                          {prob.hint}
                        </div>
                      )}

                      {/* Revealed Solution */}
                      {isSolutionRevealed && (
                        <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2 text-xs font-mono">
                          <span className="text-[11px] font-bold text-[#285C49] uppercase tracking-wider">
                            Classroom Derivation:
                          </span>
                          <div className="space-y-1 text-slate-700">
                            {prob.steps.map((st, sIdx) => (
                              <div key={sIdx} className="flex items-start gap-1.5">
                                <span className="text-slate-400 font-bold">{sIdx + 1}.</span>
                                <span>{st}</span>
                              </div>
                            ))}
                          </div>
                          <div className="pt-2 border-t border-[#DCE7E1] flex items-center justify-between">
                            <span className="text-slate-500 font-bold">Answer:</span>
                            <span className="font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-300">
                              {prob.finalAnswer}
                            </span>
                          </div>
                          {prob.takeaway && (
                            <p className="text-[10px] text-slate-500 font-sans italic pt-0.5">
                              Key Takeaway: {prob.takeaway}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => toggleHint(prob.id)}
                        className="px-3 py-1.5 rounded-lg border border-[#DCE7E1] bg-white hover:bg-slate-50 text-xs font-mono font-semibold text-slate-600 transition-colors"
                      >
                        {isHintRevealed ? 'Hide Hint' : 'Show Hint'}
                      </button>
                      <button
                        onClick={() => toggleSolution(prob.id)}
                        className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-colors ${
                          isSolutionRevealed
                            ? 'bg-slate-200 text-slate-700'
                            : 'bg-[#285C49] text-white hover:bg-[#1E4738]'
                        }`}
                      >
                        {isSolutionRevealed ? 'Hide Solution' : 'Reveal Solution'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Section25View;
