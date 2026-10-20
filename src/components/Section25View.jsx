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
  ArrowRightLeft,
  XCircle,
  Plus,
  Trash2,
  Lightbulb
} from 'lucide-react';
import { dldSection25Data } from '../data/dldSection25Data';
import { CuratedVideoCard } from './CuratedVideoCard';

/**
 * Section 2.5 View: Karnaugh Maps - Fundamentals, Two-Variable, Three-Variable, Four-Variable, POS Grouping, and Don't-Care Minimization
 * Strictly zero em-dashes and zero en-dashes throughout.
 * All formulas use actual mathematical symbols: Σ (\u03A3) and Π (\u03A0).
 * Seven-Tab Pedagogical Architecture:
 * 1. Start Here: Why K-Maps? (Introductory bullets, algebraic factoring vs visual K-Map showcase, visual power cards, roadmap, optional video)
 * 2. Gray Code & Topology (Hamming distance, 2/3/4-var layouts, interactive neighbor inspector, wraparound properties)
 * 3. Grouping Rules & Terms (8 rules, visual topology gallery with real K-Maps, illustrated SOP & POS literal extraction guide)
 * 4. Guided Demonstrations (6 compact card selector, GD1 to GD6 interactive walkthroughs)
 * 5. Solved Models (34 classroom blackboard solved models with SOP/POS intro banner, dual filters, visual K-Maps)
 * 6. Master Cheat Sheet (Dedicated exam revision sheet: visual ladders, dual SOP/POS comparison panels, Gray code references, print button)
 * 7. Practice Lab (Interactive "Try It Yourself" workspace + 36 progressive practice problems with hints and solutions)
 */

// Helper: Color palette for K-Map groups
const GROUP_COLORS = [
  { border: 'border-blue-500', bg: 'bg-blue-50/90', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-800 border-blue-300', dot: 'bg-blue-500' },
  { border: 'border-emerald-500', bg: 'bg-emerald-50/90', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-800 border-emerald-300', dot: 'bg-emerald-500' },
  { border: 'border-amber-500', bg: 'bg-amber-50/90', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-800 border-amber-300', dot: 'bg-amber-500' },
  { border: 'border-purple-500', bg: 'bg-purple-50/90', text: 'text-purple-700', badge: 'bg-purple-100 text-purple-800 border-purple-300', dot: 'bg-purple-500' },
  { border: 'border-rose-500', bg: 'bg-rose-50/90', text: 'text-rose-700', badge: 'bg-rose-100 text-rose-800 border-rose-300', dot: 'bg-rose-500' }
];

/**
 * Interactive K-Map Grid Component
 * Renders 2x2, 2x4, and 4x4 K-Maps with corner minterm indices, prominent centered target values,
 * color-coded grouping overlays, active focus, and neighbor inspection.
 */
export const KMapGrid = ({
  mapType = 'fourVar',
  minterms = [],
  maxterms = [],
  dontCares = [],
  targetPolarity = '1',
  groups = [],
  activeGroup = null,
  inspectedCell = null,
  onCellClick = null,
  showNeighbors = false,
  selectedCells = [],
  size = 'md'
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

  const isCompact = size === 'sm';
  const cellSizeClass = isCompact 
    ? 'w-8 sm:w-9 h-8 sm:h-9 text-xs' 
    : 'w-12 sm:w-16 h-12 sm:h-16 text-sm sm:text-base';

  return (
    <div className={`inline-block bg-white ${isCompact ? 'p-2' : 'p-3 sm:p-4'} rounded-xl border border-[#DCE7E1] shadow-2xs font-sans text-left`}>
      <div className="overflow-x-auto">
        <table className="border-collapse select-none">
          <thead>
            <tr>
              {/* Top-left diagonal variable header */}
              <th className={`p-1 text-center font-mono font-bold text-[#285C49] border-b border-r border-[#DCE7E1] bg-[#F4F7F4] ${isCompact ? 'min-w-[42px] text-[10px]' : 'min-w-[58px] text-xs'}`}>
                <div className="text-right text-[10px]">{colVar}</div>
                <div className="w-full h-px bg-[#DCE7E1] my-0.5" />
                <div className="text-left text-[10px]">{rowVar}</div>
              </th>
              {/* Column Gray code headers */}
              {cols.map((colHeader, cIdx) => (
                <th
                  key={cIdx}
                  className={`px-2 py-1 text-center font-mono font-bold text-[#1E293B] border-b border-[#DCE7E1] bg-[#FAF8F5] ${isCompact ? 'min-w-[34px] text-[10px]' : 'min-w-[52px] sm:min-w-[62px] text-xs'}`}
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
                <th className={`px-2 py-1 text-center font-mono font-bold text-[#1E293B] border-r border-[#DCE7E1] bg-[#FAF8F5] ${isCompact ? 'text-[10px]' : 'text-xs'}`}>
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
                  const isSelectedInWorkspace = selectedCells.includes(cellIdx);

                  // Cell value determination
                  let displayVal = '';
                  let valClass = 'text-slate-300 font-normal';

                  if (isDontCare) {
                    displayVal = 'X';
                    valClass = isCompact ? 'text-[#D97706] font-bold text-xs' : 'text-[#D97706] font-bold text-base sm:text-lg';
                  } else if (targetPolarity === '1') {
                    if (isMinterm) {
                      displayVal = '1';
                      valClass = isCompact ? 'text-[#1E293B] font-bold text-xs' : 'text-[#1E293B] font-bold text-base sm:text-lg';
                    } else {
                      displayVal = '0';
                      valClass = 'text-slate-300 text-[10px] font-normal';
                    }
                  } else {
                    if (isMaxterm) {
                      displayVal = '0';
                      valClass = isCompact ? 'text-[#1E293B] font-bold text-xs' : 'text-[#1E293B] font-bold text-base sm:text-lg';
                    } else {
                      displayVal = '1';
                      valClass = 'text-slate-300 text-[10px] font-normal';
                    }
                  }

                  // Background & Border styling
                  let cellBg = 'bg-white hover:bg-slate-50/80';
                  let cellBorder = 'border border-[#E2E8F0]';

                  if (isSelectedInWorkspace) {
                    cellBg = 'bg-amber-100 ring-2 ring-amber-500 z-20';
                  } else if (isInspected) {
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
                      className={`relative ${cellSizeClass} text-center transition-all ${cellBorder} ${cellBg} ${onCellClick ? 'cursor-pointer' : ''}`}
                    >
                      {/* Top-left small minterm index */}
                      <span className={`absolute top-0.5 left-1 font-mono font-medium text-slate-400 select-none ${isCompact ? 'text-[7px]' : 'text-[9px]'}`}>
                        m{cellIdx}
                      </span>

                      {/* Top-right group indicators */}
                      {!isCompact && memberGroups.length > 0 && (
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
      {!isCompact && groups.length > 0 && (
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

/**
 * Compact Miniature K-Map Component for Galleries, Cheat Sheet & Group Sizing Cards
 * Renders small visual representations with highlighted groups, clean cell indices, and invalid indicators.
 */
export const MiniKMap = ({
  mapType = 'threeVar',
  highlightCells = [],
  targetValue = '1',
  groupColor = 'emerald', // 'emerald', 'blue', 'amber', 'purple', 'red'
  isInvalid = false,
  showAllIndices = true
}) => {
  const layout = dldSection25Data.foundations.layouts[mapType] || dldSection25Data.foundations.layouts.threeVar;
  const { rowVar, colVar, rows, cols, matrix } = layout;

  const colorStyles = {
    emerald: { bg: 'bg-emerald-100', border: 'border-emerald-500', text: 'text-emerald-900', ring: 'ring-1 ring-emerald-500' },
    blue: { bg: 'bg-blue-100', border: 'border-blue-500', text: 'text-blue-900', ring: 'ring-1 ring-blue-500' },
    amber: { bg: 'bg-amber-100', border: 'border-amber-500', text: 'text-amber-900', ring: 'ring-1 ring-amber-500' },
    purple: { bg: 'bg-purple-100', border: 'border-purple-500', text: 'text-purple-900', ring: 'ring-1 ring-purple-500' },
    red: { bg: 'bg-rose-100', border: 'border-rose-500', text: 'text-rose-900', ring: 'ring-1 ring-rose-500' }
  }[isInvalid ? 'red' : groupColor] || { bg: 'bg-emerald-100', border: 'border-emerald-500', text: 'text-emerald-900', ring: 'ring-1 ring-emerald-500' };

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
                const cellBg = isHighlighted ? `${colorStyles.bg} ${colorStyles.ring}` : 'bg-white';
                const textColor = isHighlighted ? colorStyles.text : 'text-slate-300';
                const val = isHighlighted ? targetValue : '-';

                return (
                  <td
                    key={cIdx}
                    className={`relative w-6 h-6 text-center border border-[#E2E8F0] ${cellBg} font-mono`}
                  >
                    {showAllIndices && (
                      <span className="absolute top-0 left-0.5 text-[6px] text-slate-400">
                        {cellIdx}
                      </span>
                    )}
                    <span className={`text-[10px] font-bold ${textColor}`}>
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

class SectionErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('Section 2.5 Error caught:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 max-w-4xl mx-auto my-8 bg-rose-50 border border-rose-200 rounded-2xl text-[#1E293B]">
          <h2 className="text-xl font-bold text-rose-900 mb-2">Section 2.5 Rendering Error</h2>
          <p className="text-sm text-rose-800 mb-4">A component error occurred while rendering this view:</p>
          <pre className="p-4 bg-white rounded-lg border border-rose-300 text-xs font-mono text-rose-700 overflow-x-auto whitespace-pre-wrap">
            {this.state.error?.toString()}
          </pre>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-4 px-4 py-2 bg-rose-700 text-white font-mono text-xs font-bold rounded-lg hover:bg-rose-800 transition-colors"
          >
            Retry Rendering
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const Section25ViewInternal = ({ section, initialTab = 'start-here' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const data = dldSection25Data;

  // Tab 2 state
  const [topologyMapSize, setTopologyMapSize] = useState('fourVar');
  const [inspectedCell, setInspectedCell] = useState(0);

  // Tab 4 Guided Demos state
  const [activeDemoId, setActiveDemoId] = useState('GD1');
  const [demoStepIdx, setDemoStepIdx] = useState(0);

  // Tab 5 Worked Models state
  const [modelFilter, setModelFilter] = useState('All');
  const [formFilter, setFormFilter] = useState('All');
  const [expandedModels, setExpandedModels] = useState({
    'KM2.5-M01': true,
    'KM2.5-M05': true,
    'KM2.5-M12': true,
    'KM2.5-M21': true,
    'KM2.5-M27': true
  });

  // Tab 7 Practice Lab state
  const [practiceFilter, setPracticeFilter] = useState('All');
  const [practiceFormFilter, setPracticeFormFilter] = useState('All');
  const [revealedHints, setRevealedHints] = useState({});
  const [revealedSolutions, setRevealedSolutions] = useState({});

  // Interactive Workspace State (Task 10)
  const [selectedPresetId, setSelectedPresetId] = useState('IP-01');
  const [workspaceSelectedCells, setWorkspaceSelectedCells] = useState([]);
  const [workspaceFormedGroups, setWorkspaceFormedGroups] = useState([]);
  const [workspaceFeedback, setWorkspaceFeedback] = useState(null);
  const [workspaceShowHint, setWorkspaceShowHint] = useState(false);

  const activePreset = data.practiceLab.interactivePresets.find(p => p.id === selectedPresetId) 
    || data.practiceLab.interactivePresets[0];

  const handlePresetChange = (presetId) => {
    setSelectedPresetId(presetId);
    setWorkspaceSelectedCells([]);
    setWorkspaceFormedGroups([]);
    setWorkspaceFeedback(null);
    setWorkspaceShowHint(false);
  };

  const handleWorkspaceCellClick = (cellIdx) => {
    setWorkspaceSelectedCells(prev => {
      if (prev.includes(cellIdx)) {
        return prev.filter(c => c !== cellIdx);
      } else {
        return [...prev, cellIdx].sort((a, b) => a - b);
      }
    });
    setWorkspaceFeedback(null);
  };

  // Mathematical validation of user-selected cells for interactive practice
  const handleValidateProposedGroup = () => {
    if (workspaceSelectedCells.length === 0) {
      setWorkspaceFeedback({
        type: 'error',
        message: 'Please select at least one cell in the K-Map to form a group.'
      });
      return;
    }

    const size = workspaceSelectedCells.length;
    const numVars = activePreset.mapType === 'twoVar' ? 2 : activePreset.mapType === 'threeVar' ? 3 : 4;
    const varNames = numVars === 2 ? ['A', 'B'] : numVars === 3 ? ['A', 'B', 'C'] : ['A', 'B', 'C', 'D'];

    // 1. Power of 2 check
    const k = Math.round(Math.log2(size));
    if (Math.pow(2, k) !== size || k < 0 || k > numVars) {
      setWorkspaceFeedback({
        type: 'error',
        message: `Invalid size (${size} cells). Karnaugh map groups MUST contain 2^k cells (1, 2, 4, 8, or 16).`
      });
      return;
    }

    // 2. Check target values (only 1s/Xs for SOP, only 0s/Xs for POS)
    const allowedCells = activePreset.targetPolarity === '1' 
      ? [...activePreset.minterms, ...(activePreset.dontCares || [])]
      : [...activePreset.maxterms, ...(activePreset.dontCares || [])];

    const containsInvalidCell = workspaceSelectedCells.some(c => !allowedCells.includes(c));
    if (containsInvalidCell) {
      setWorkspaceFeedback({
        type: 'error',
        message: activePreset.targetPolarity === '1'
          ? 'Selected cells contain a 0-cell. SOP groups can only contain 1s and don\'t-cares (Xs).'
          : 'Selected cells contain a 1-cell. POS groups can only contain 0s and don\'t-cares (Xs).'
      });
      return;
    }

    // 3. Mathematical subcube / rectangular geometric adjacency check
    const binaries = workspaceSelectedCells.map(c => c.toString(2).padStart(numVars, '0'));
    let varyingCount = 0;
    const fixedBits = {};

    for (let b = 0; b < numVars; b++) {
      const bitVal = binaries[0][b];
      const isConstant = binaries.every(bin => bin[b] === bitVal);
      if (isConstant) {
        fixedBits[b] = bitVal;
      } else {
        varyingCount++;
      }
    }

    if (varyingCount !== k) {
      setWorkspaceFeedback({
        type: 'error',
        message: 'Selected cells do not form an adjacent rectangular group (geometric adjacency or wraparound violated).'
      });
      return;
    }

    // 4. Derive term
    let derivedTerm = '';
    if (activePreset.targetPolarity === '1') {
      // SOP Product Term
      if (k === numVars) {
        derivedTerm = '1';
      } else {
        const parts = [];
        for (let b = 0; b < numVars; b++) {
          if (b in fixedBits) {
            parts.push(fixedBits[b] === '1' ? varNames[b] : `${varNames[b]}'`);
          }
        }
        derivedTerm = parts.join('');
      }
    } else {
      // POS Sum Term
      if (k === numVars) {
        derivedTerm = '0';
      } else {
        const parts = [];
        for (let b = 0; b < numVars; b++) {
          if (b in fixedBits) {
            parts.push(fixedBits[b] === '0' ? varNames[b] : `${varNames[b]}'`);
          }
        }
        derivedTerm = `(${parts.join(' + ')})`;
      }
    }

    // Check if group already added
    const alreadyExists = workspaceFormedGroups.some(g => 
      g.cells.length === workspaceSelectedCells.length && 
      g.cells.every((c, i) => c === workspaceSelectedCells[i])
    );

    if (alreadyExists) {
      setWorkspaceFeedback({
        type: 'warning',
        message: `Group {${workspaceSelectedCells.join(', ')}} has already been added.`
      });
      return;
    }

    const newGroup = {
      group: `G${workspaceFormedGroups.length + 1}`,
      cells: [...workspaceSelectedCells],
      term: derivedTerm
    };

    setWorkspaceFormedGroups(prev => [...prev, newGroup]);
    setWorkspaceSelectedCells([]);
    setWorkspaceFeedback({
      type: 'success',
      message: `Valid Group formed! Extracted Term: ${derivedTerm} (eliminated ${k} variable${k === 1 ? '' : 's'}).`
    });
  };

  const handleRemoveWorkspaceGroup = (groupIndex) => {
    setWorkspaceFormedGroups(prev => prev.filter((_, idx) => idx !== groupIndex));
    setWorkspaceFeedback(null);
  };

  const handleCheckWorkspaceCover = () => {
    if (workspaceFormedGroups.length === 0) {
      setWorkspaceFeedback({
        type: 'error',
        message: 'No groups have been formed yet. Select cells and click "Validate & Add Group" first.'
      });
      return;
    }

    // Covered cells
    const coveredCells = new Set();
    workspaceFormedGroups.forEach(g => {
      g.cells.forEach(c => coveredCells.add(c));
    });

    const targetCells = activePreset.targetPolarity === '1' ? activePreset.minterms : activePreset.maxterms;
    const uncovered = targetCells.filter(c => !coveredCells.has(c));

    if (uncovered.length > 0) {
      setWorkspaceFeedback({
        type: 'warning',
        message: `Incomplete cover! The following required cells are still uncovered: ${uncovered.map(c => `m${c}`).join(', ')}.`
      });
      return;
    }

    // Check expression against minimal expression
    const fullExpr = activePreset.targetPolarity === '1'
      ? `F = ${workspaceFormedGroups.map(g => g.term).join(' + ')}`
      : `F = ${workspaceFormedGroups.map(g => g.term).join('')}`;

    if (workspaceFormedGroups.length === activePreset.expectedGroups.length) {
      setWorkspaceFeedback({
        type: 'complete',
        message: `Congratulations! Complete minimal cover achieved: ${fullExpr}! All required cells covered with zero redundancy.`
      });
    } else {
      setWorkspaceFeedback({
        type: 'success',
        message: `Valid complete cover (${fullExpr}), but can it be minimized further with larger groups? Expected ${activePreset.expectedGroups.length} group(s).`
      });
    }
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

  // Seven Tabs Definition (Task 3)
  const tabs = [
    { id: 'start-here', label: '1. Start Here', icon: BookOpen },
    { id: 'foundations', label: '2. Gray Code & Topology', icon: Grid },
    { id: 'grouping-rules', label: '3. Grouping Rules & Terms', icon: ShieldCheck },
    { id: 'guided-demos', label: '4. Guided Demonstrations', icon: Compass },
    { id: 'worked-models', label: '5. Solved Models (34)', icon: Layers },
    { id: 'cheat-sheet', label: '6. Master Cheat Sheet', icon: FileText },
    { id: 'practice-lab', label: '7. Practice Lab (36)', icon: Zap }
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

  // Model categories & form filters
  const modelCategories = [
    'All',
    '2-Variable K-Map',
    '3-Variable K-Map',
    '4-Variable K-Map',
    'Don\'t-Care Minimization',
    'Special Cases'
  ];

  const filteredModels = data.workedModels.filter(m => {
    const matchesCat = modelFilter === 'All' || m.category === modelFilter;
    const matchesForm = formFilter === 'All' || m.form === formFilter;
    return matchesCat && matchesForm;
  });

  // Practice filters
  const practiceDifficulties = ['All', 'Basic', 'Intermediate', 'Advanced', 'Challenge'];
  const filteredPractice = data.practiceLab.problems.filter(p => {
    const matchesDiff = practiceFilter === 'All' || p.difficulty === practiceFilter;
    const matchesForm = practiceFormFilter === 'All' || p.form === practiceFormFilter;
    return matchesDiff && matchesForm;
  });

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
              Classroom & Practice Rebuild
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

      {/* 2. Responsive 7-Tab Navigation Bar (Task 3: No horizontal scrollbar, fully discoverable) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-1.5 p-1.5 bg-[#FAF8F5] border border-[#DCE7E1] rounded-2xl shadow-2xs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl font-mono text-xs font-semibold text-center transition-all ${
                isActive
                  ? 'bg-white text-[#285C49] shadow-xs border border-[#DCE7E1] font-bold ring-1 ring-[#285C49]/20'
                  : 'text-[#5F6C64] hover:text-[#1E293B] hover:bg-white/60'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-[#285C49]' : 'text-[#8C9A90]'}`} />
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: START HERE - WHY K-MAPS?                                        */}
      {/* ===================================================================== */}
      {activeTab === 'start-here' && (
        <div className="space-y-6">
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

          {/* Group-Size and Literal Elimination Progression (Task 2: Visual Mini K-Maps) */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-5">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#285C49]" />
              <h3 className="font-editorial text-lg font-bold text-[#1E293B]">
                Literal Elimination Power of Group Sizes: 2^k Cells Eliminates k Variables
              </h3>
            </div>
            <p className="text-xs text-[#5F6C64]">
              For an n-variable K-Map, grouping 2^k adjacent cells eliminates exactly k variables. Observe the visual progression below:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              {data.startHere.powerOfTwoElimination.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2.5 text-center flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <span className="font-mono text-[11px] font-bold text-[#285C49] uppercase tracking-wider block">
                      {item.name}
                    </span>
                    <div className="font-mono text-xs font-bold text-[#1E293B]">
                      {item.power} ({item.cells} {item.cells === 1 ? 'cell' : 'cells'})
                    </div>
                  </div>

                  {/* Miniature Visual K-Map Diagram */}
                  <div className="flex justify-center py-1">
                    <MiniKMap
                      mapType={item.miniMap?.mapType || (item.cells <= 4 ? 'twoVar' : item.cells === 8 ? 'threeVar' : 'fourVar')}
                      highlightCells={item.miniMap?.cells || (item.cells === 1 ? [0] : item.cells === 2 ? [0, 1] : item.cells === 4 ? [0, 1, 2, 3] : item.cells === 8 ? [0, 1, 3, 2, 4, 5, 7, 6] : [0, 1, 3, 2, 4, 5, 7, 6, 12, 13, 15, 14, 8, 9, 11, 10])}
                      targetValue="1"
                      groupColor="emerald"
                    />
                  </div>

                  <div className="space-y-1 pt-1 border-t border-[#DCE7E1]">
                    <div className="text-xs text-emerald-800 font-bold">
                      Eliminates {item.eliminated}
                    </div>
                    <div className="text-[11px] text-slate-600 font-mono">
                      {item.remaining}
                    </div>
                    <div className="text-[10px] text-slate-500 italic pt-0.5">
                      {item.takeaway}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Full Map Boundary Conditions Banner */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="font-mono font-bold text-[#285C49]">Full-Map Boundary Conditions: </span>
                <span className="text-slate-600">When all 2^n cells in an n-variable map are grouped together:</span>
              </div>
              <div className="flex items-center gap-3 font-mono font-bold">
                <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                  SOP All-Ones: F = 1
                </span>
                <span className="px-2.5 py-1 rounded bg-purple-100 text-purple-800 border border-purple-300">
                  POS All-Zeros: F = 0
                </span>
              </div>
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

          {/* Task 1: Curated Video Lecture Relocated to Bottom as Optional Supplementary Resource */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-3">
            <div className="flex items-center gap-2 border-b border-[#DCE7E1] pb-3">
              <Zap className="w-4 h-4 text-[#285C49]" />
              <h3 className="font-editorial text-lg font-bold text-[#1E293B]">
                Optional Video Lesson: Need Another Explanation?
              </h3>
            </div>
            <p className="text-xs text-[#5F6C64]">
              Prefer watching an instructor walk through the intuition? This curated video introduces Karnaugh map theory, Gray code adjacency, and rectangular group sizing.
            </p>
            <CuratedVideoCard videoKey="kmap-intro" />
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
          {/* 8 Mandatory Grouping Rules (Task 5: Refined Axioms) */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#285C49]" />
              <h3 className="font-editorial text-lg font-bold text-[#1E293B]">
                The 8 Mandatory Karnaugh Map Grouping Axioms
              </h3>
            </div>
            <p className="text-xs text-[#5F6C64]">
              Grouping errors are the primary cause of exam point deductions. Follow these 8 rigorous axioms for sound algebraic minimization:
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

          {/* Visual Topology Gallery with Real Visual K-Maps (Task 4) */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-5">
            <div className="border-b border-[#DCE7E1] pb-3">
              <div className="flex items-center gap-2">
                <Grid className="w-4 h-4 text-[#285C49]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#285C49]">
                  Visual Geometry Gallery
                </span>
              </div>
              <h3 className="font-editorial text-xl font-bold text-[#1E293B] mt-1">
                Visual Topology Gallery: Valid Groups vs Illegal Geometries
              </h3>
              <p className="text-xs text-[#5F6C64] mt-0.5">
                Students must SEE the difference between genuine rectangular subcubes and invalid shapes. Every card below illustrates an actual K-Map pattern:
              </p>
            </div>

            {/* Valid Topologies Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Valid Grouping Topologies (Powers of Two Rectangular Subcubes)
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.groupingAndTerms.visualTopologies.filter(t => t.valid).map((topo) => (
                  <div
                    key={topo.id}
                    className="p-4 rounded-xl border border-emerald-200 bg-white shadow-2xs space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[#1E293B]">
                          {topo.name}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          VALID
                        </span>
                      </div>

                      {/* Real Visual K-Map Diagram */}
                      <div className="flex justify-center py-1">
                        <MiniKMap
                          mapType={topo.miniMap?.mapType || topo.mapType || 'fourVar'}
                          highlightCells={topo.miniMap?.cells || topo.groupCells || topo.minterms || []}
                          targetValue={topo.miniMap?.targetVal || topo.targetPolarity || '1'}
                          groupColor={topo.miniMap?.groupColor || 'emerald'}
                        />
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {topo.desc}
                      </p>
                    </div>

                    {/* Derived Term Banner */}
                    {topo.derivedTerm && (
                      <div className="p-2 rounded bg-emerald-50 border border-emerald-200 font-mono text-[11px] flex items-center justify-between">
                        <span className="text-emerald-800 font-bold">Extracted Term:</span>
                        <span className="font-bold text-[#1E293B] bg-white px-2 py-0.5 rounded border border-emerald-300">
                          {topo.derivedTerm}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Invalid Topologies Section */}
            <div className="space-y-3 pt-3 border-t border-[#DCE7E1]">
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-rose-600" />
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-rose-800">
                  Illegal Geometries (Prohibited Shapes & Non-Power-of-Two Sizes)
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.groupingAndTerms.visualTopologies.filter(t => !t.valid).map((topo) => (
                  <div
                    key={topo.id}
                    className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 shadow-2xs space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-rose-950">
                          {topo.name}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-100 text-rose-800 border border-rose-300">
                          {topo.rejectionBadge || 'STRICTLY ILLEGAL'}
                        </span>
                      </div>

                      {/* Real Visual K-Map Diagram with Red/Rose indicator */}
                      <div className="flex justify-center py-1">
                        <MiniKMap
                          mapType={topo.miniMap?.mapType || topo.mapType || 'fourVar'}
                          highlightCells={topo.miniMap?.cells || topo.groupCells || topo.minterms || []}
                          targetValue="1"
                          isInvalid={true}
                        />
                      </div>

                      <p className="text-xs text-rose-900 leading-relaxed font-sans">
                        {topo.desc}
                      </p>
                    </div>

                    <div className="p-2 rounded bg-rose-100/70 border border-rose-200 font-sans text-[11px] text-rose-950">
                      <span className="font-bold font-mono">Mathematical Reason: </span>
                      {topo.reason}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dedicated Tutorial: How to Write the Boolean Term from a Group (Task 6: Fully Illustrated) */}
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
                Students often group correctly but write the wrong term. Compare SOP Product Term extraction versus POS Sum Term extraction:
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* SOP Derivation Illustrated */}
              <div className="p-5 rounded-xl bg-white border border-emerald-200 space-y-4 shadow-2xs">
                <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#285C49]" />
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#285C49]">
                      1. Product Term Extraction (SOP: Grouping 1s)
                    </h4>
                  </div>
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                    AND Terms
                  </span>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-700">
                  {data.groupingAndTerms.termExtractionGuide.sopRule.rules.map((rl, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#285C49] mt-1.5 flex-shrink-0" />
                      <span>{rl}</span>
                    </li>
                  ))}
                </ul>

                {/* SOP Fully Illustrated Example */}
                {(data.groupingAndTerms?.termExtractionGuide?.sopRule?.workedExample || data.groupingAndTerms?.termExtractionGuide?.sopRule?.example) && (() => {
                  const ex = data.groupingAndTerms.termExtractionGuide.sopRule.workedExample || data.groupingAndTerms.termExtractionGuide.sopRule.example;
                  return (
                    <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[#285C49]">
                          {ex.title}
                        </span>
                      </div>

                      <div className="flex justify-center py-1">
                        <MiniKMap
                          mapType={ex.miniMap?.mapType || 'fourVar'}
                          highlightCells={ex.miniMap?.cells || ex.cells || []}
                          targetValue="1"
                          groupColor="emerald"
                        />
                      </div>

                      {/* Variable Analysis Table */}
                      {ex.varAnalysis && (
                        <div className="overflow-x-auto">
                          <table className="w-full text-[11px] font-mono text-left border border-[#DCE7E1] rounded overflow-hidden">
                            <thead className="bg-slate-100 text-slate-700">
                              <tr>
                                <th className="p-1.5">Var</th>
                                <th className="p-1.5">Values</th>
                                <th className="p-1.5">Status</th>
                                <th className="p-1.5">Literal</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E2E8F0] bg-white">
                              {ex.varAnalysis.map((v, vIdx) => (
                                <tr key={vIdx}>
                                  <td className="p-1.5 font-bold text-slate-800">{v.variable}</td>
                                  <td className="p-1.5 text-slate-600">{v.values}</td>
                                  <td className={`p-1.5 font-semibold ${v.status === 'Eliminated' ? 'text-slate-400 italic' : 'text-emerald-700'}`}>
                                    {v.status}
                                  </td>
                                  <td className="p-1.5 font-bold text-[#285C49]">{v.literal}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      <div className="p-2 rounded bg-emerald-100/70 border border-emerald-300 font-mono text-xs flex items-center justify-between">
                        <span className="text-emerald-900 font-bold">Resulting Product Term:</span>
                        <span className="font-bold text-base text-emerald-950 bg-white px-2.5 py-0.5 rounded border border-emerald-300">
                          {ex.derivedTerm || ex.term}
                        </span>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* POS Derivation Illustrated */}
              <div className="p-5 rounded-xl bg-white border border-purple-200 space-y-4 shadow-2xs">
                <div className="flex items-center justify-between border-b border-purple-100 pb-2">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-purple-700" />
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-purple-800">
                      2. Sum Term Extraction (POS: Grouping 0s)
                    </h4>
                  </div>
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800 border border-purple-300">
                    OR Terms
                  </span>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-700">
                  {data.groupingAndTerms.termExtractionGuide.posRule.rules.map((rl, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-700 mt-1.5 flex-shrink-0" />
                      <span>{rl}</span>
                    </li>
                  ))}
                </ul>

                {/* POS Fully Illustrated Example */}
                {(data.groupingAndTerms?.termExtractionGuide?.posRule?.workedExample || data.groupingAndTerms?.termExtractionGuide?.posRule?.example) && (() => {
                  const ex = data.groupingAndTerms.termExtractionGuide.posRule.workedExample || data.groupingAndTerms.termExtractionGuide.posRule.example;
                  return (
                    <div className="p-3.5 rounded-xl bg-purple-50/50 border border-purple-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-purple-900">
                          {ex.title}
                        </span>
                      </div>

                      <div className="flex justify-center py-1">
                        <MiniKMap
                          mapType={ex.miniMap?.mapType || 'fourVar'}
                          highlightCells={ex.miniMap?.cells || ex.cells || []}
                          targetValue="0"
                          groupColor="purple"
                        />
                      </div>

                      {/* Variable Analysis Table */}
                      {ex.varAnalysis && (
                        <div className="overflow-x-auto">
                          <table className="w-full text-[11px] font-mono text-left border border-purple-200 rounded overflow-hidden">
                            <thead className="bg-purple-100/70 text-purple-900">
                              <tr>
                                <th className="p-1.5">Var</th>
                                <th className="p-1.5">Values</th>
                                <th className="p-1.5">Status</th>
                                <th className="p-1.5">Literal</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-purple-100 bg-white">
                              {ex.varAnalysis.map((v, vIdx) => (
                                <tr key={vIdx}>
                                  <td className="p-1.5 font-bold text-purple-900">{v.variable}</td>
                                  <td className="p-1.5 text-slate-600">{v.values}</td>
                                  <td className={`p-1.5 font-semibold ${v.status === 'Eliminated' ? 'text-slate-400 italic' : 'text-purple-700'}`}>
                                    {v.status}
                                  </td>
                                  <td className="p-1.5 font-bold text-purple-900">{v.literal}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      <div className="p-2 rounded bg-purple-100 border border-purple-300 font-mono text-xs flex items-center justify-between">
                        <span className="text-purple-950 font-bold">Resulting Sum Term:</span>
                        <span className="font-bold text-base text-purple-950 bg-white px-2.5 py-0.5 rounded border border-purple-300">
                          {ex.derivedTerm || ex.term}
                        </span>
                      </div>
                    </div>
                  );
                })()}
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
          {/* Accessible 6-Card Demonstration Selector (Task 7) */}
          <div className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#285C49]" />
                <h3 className="font-editorial text-lg font-bold text-[#1E293B]">
                  Six Guided K-Map Demonstrations
                </h3>
              </div>
              <span className="font-mono text-xs text-slate-500 font-semibold">
                Click any card to load walkthrough
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {data.guidedDemos.map((demo) => {
                const isActive = activeDemoId === demo.id;
                return (
                  <button
                    key={demo.id}
                    onClick={() => handleDemoChange(demo.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isActive
                        ? 'bg-[#EBF3ED] border-[#285C49] shadow-xs ring-1 ring-[#285C49]'
                        : 'bg-[#FAF8F5] border-[#DCE7E1] hover:bg-white hover:border-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded ${
                        isActive ? 'bg-[#285C49] text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {demo.id}
                      </span>
                      <span className="font-mono text-[10px] text-slate-500 font-semibold">
                        {demo.varCount || `${demo.variables}-Var`}
                      </span>
                    </div>
                    <div className="font-sans text-xs font-bold text-[#1E293B] mt-1.5 truncate">
                      {demo.technique || demo.title.split(':')[1] || demo.title}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate mt-0.5">
                      {demo.steps.length} interactive steps
                    </div>
                  </button>
                );
              })}
            </div>
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
      {/* TAB 5: PROGRESSIVE SOLVED K-MAP MODELS (34 MODELS - TASK 8)           */}
      {/* ===================================================================== */}
      {activeTab === 'worked-models' && (
        <div className="space-y-6">
          {/* SOP vs POS Introduction Banner (Task 8A) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F5] border border-[#DCE7E1] shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#DCE7E1] pb-3">
              <div className="flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4 text-[#285C49]" />
                <h3 className="font-editorial text-lg font-bold text-[#1E293B]">
                  SOP vs POS Minimization: Polarity Duality in Karnaugh Maps
                </h3>
              </div>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-white text-[#285C49] font-bold border border-[#DCE7E1]">
                Academic Distinction
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
              {/* SOP Card */}
              <div className="p-4 rounded-xl bg-white border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-[#285C49]">Sum of Products (SOP: Σ m)</span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                    Group 1s
                  </span>
                </div>
                <ul className="space-y-1 text-slate-700 text-[11px] leading-relaxed">
                  <li>- <strong>Target:</strong> Group adjacent 1-cells and helpful don't-cares.</li>
                  <li>- <strong>Terms:</strong> Form <strong>Product (AND)</strong> terms.</li>
                  <li>- <strong>Literals:</strong> Constant 1 maps to uncomplemented variable ($A$).</li>
                  <li>- <strong>Literals:</strong> Constant 0 maps to complemented variable ($A'$).</li>
                  <li>- <strong>Assembly:</strong> OR the derived product terms: $F = P_1 + P_2 + \dots$</li>
                </ul>
              </div>

              {/* POS Card */}
              <div className="p-4 rounded-xl bg-white border border-purple-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-purple-900">Product of Sums (POS: Π M)</span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold">
                    Group 0s
                  </span>
                </div>
                <ul className="space-y-1 text-slate-700 text-[11px] leading-relaxed">
                  <li>- <strong>Target:</strong> Group adjacent 0-cells and helpful don't-cares.</li>
                  <li>- <strong>Terms:</strong> Form <strong>Sum (OR)</strong> terms.</li>
                  <li>- <strong>Literals:</strong> Constant 0 maps to uncomplemented variable ($A$).</li>
                  <li>- <strong>Literals:</strong> Constant 1 maps to complemented variable ($A'$).</li>
                  <li>- <strong>Assembly:</strong> AND the derived sum terms: $F = S_1 \cdot S_2 \dots$</li>
                </ul>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 italic">
              Note: The underlying geometry, adjacency rules, power-of-two group sizing, and toroidal boundary wrapping are 100% identical for both forms.
            </p>
          </div>

          {/* Header & Dual Filter Controls (Task 8B) */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-editorial text-xl font-bold text-[#1E293B]">
                  Progressive Solved Models: 34 Classroom Blackboards
                </h3>
                <p className="text-xs text-[#5F6C64] mt-0.5">
                  Complete classroom solutions with visual K-Maps, visible grouping overlays, and step-by-step term derivations.
                </p>
              </div>

              <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-[#EBF3ED] text-[#285C49] font-bold border border-[#285C49]/20 self-start sm:self-auto">
                Showing {filteredModels.length} of {data.workedModels.length} Models
              </span>
            </div>

            {/* Filter Controls Row */}
            <div className="space-y-2.5 pt-1 border-t border-[#DCE7E1]">
              {/* Form Filter Pills (SOP vs POS) */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-mono text-xs text-slate-400 font-semibold mr-1 flex items-center gap-1">
                  Form:
                </span>
                {['All', 'SOP', 'POS'].map((form) => (
                  <button
                    key={form}
                    onClick={() => setFormFilter(form)}
                    className={`px-3 py-1 rounded-lg font-mono text-xs font-bold transition-all ${
                      formFilter === form
                        ? form === 'POS' ? 'bg-purple-700 text-white shadow-xs' : 'bg-[#285C49] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {form === 'All' ? 'All Forms' : form === 'SOP' ? 'SOP (Σ m)' : 'POS (Π M)'}
                  </button>
                ))}
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-mono text-xs text-slate-400 font-semibold mr-1 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> Category:
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
          </div>

          {/* Models Grid */}
          <div className="grid grid-cols-1 gap-6">
            {filteredModels.map((model) => {
              const isExpanded = expandedModels[model.id] ?? true;
              const isPOS = model.form === 'POS';

              return (
                <div
                  key={model.id}
                  className="rounded-2xl bg-white border border-[#DCE7E1] shadow-soft overflow-hidden"
                >
                  {/* Model Card Header */}
                  <div
                    onClick={() => toggleModel(model.id)}
                    className={`p-4 sm:p-5 flex items-center justify-between cursor-pointer border-b border-[#DCE7E1] transition-colors ${
                      isPOS ? 'bg-[#FAF5FF] hover:bg-[#F3E8FF]' : 'bg-[#FAF8F5] hover:bg-[#F2F7F4]'
                    }`}
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
                          isPOS
                            ? 'bg-purple-100 text-purple-800 border border-purple-200'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}>
                          {model.form || 'SOP'}
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
                          <span className={`font-bold ${isPOS ? 'text-purple-900' : 'text-[#285C49]'}`}>
                            {model.problemStatement}
                          </span>
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
                                  <span className={`font-bold px-2 py-0.5 rounded border ${
                                    isPOS 
                                      ? 'text-purple-900 bg-purple-50 border-purple-200' 
                                      : 'text-emerald-800 bg-emerald-50 border-emerald-200'
                                  }`}>
                                    {st.term}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Final Answer Banner */}
                          <div className={`p-3.5 rounded-xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono ${
                            isPOS ? 'bg-purple-800' : 'bg-[#285C49]'
                          }`}>
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
      {/* TAB 6: MASTER K-MAP CHEAT SHEET (TASK 9: DEDICATED VISUAL REVISION)   */}
      {/* ===================================================================== */}
      {activeTab === 'cheat-sheet' && (
        <div className="space-y-6">
          {/* Header Banner & Print Button */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DCE7E1] pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-[#285C49] uppercase tracking-wider">
                  Comprehensive Revision Standard
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#1E293B] mt-0.5">
                  {data.cheatSheet.title}
                </h3>
                <p className="text-xs text-[#5F6C64] mt-0.5">
                  One-glance visual reference: Gray code topologies, group-size ladders, SOP vs POS dual panels, and exam procedures.
                </p>
              </div>

              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] hover:bg-[#F2F7F4] text-xs font-bold text-[#1E293B] transition-colors self-start sm:self-auto shadow-2xs"
              >
                <Printer className="w-4 h-4 text-[#285C49]" />
                <span>Print Revision Sheet</span>
              </button>
            </div>

            {/* A. Gray-Code Map Reference (2-var, 3-var, 4-var) */}
            <div className="space-y-3 pt-1">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1E293B] flex items-center gap-1.5">
                <Grid className="w-3.5 h-3.5 text-[#285C49]" />
                1. Standard Gray-Code Topographies & Cell Indices
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 2-Variable Map Reference */}
                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2 text-center">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="font-bold text-[#285C49]">2-Variable (2x2)</span>
                    <span className="text-slate-500 text-[10px]">4 cells</span>
                  </div>
                  <div className="flex justify-center py-1">
                    <MiniKMap
                      mapType="twoVar"
                      highlightCells={[]}
                      targetValue=""
                      showAllIndices={true}
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 font-mono">
                    Rows: A (0, 1) | Cols: B (0, 1)
                  </p>
                </div>

                {/* 3-Variable Map Reference */}
                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2 text-center">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="font-bold text-[#285C49]">3-Variable (2x4)</span>
                    <span className="text-slate-500 text-[10px]">8 cells</span>
                  </div>
                  <div className="flex justify-center py-1">
                    <MiniKMap
                      mapType="threeVar"
                      highlightCells={[]}
                      targetValue=""
                      showAllIndices={true}
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 font-mono">
                    Rows: A (0, 1) | Cols: BC (00, 01, 11, 10)
                  </p>
                </div>

                {/* 4-Variable Map Reference */}
                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2 text-center">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="font-bold text-[#285C49]">4-Variable (4x4)</span>
                    <span className="text-slate-500 text-[10px]">16 cells</span>
                  </div>
                  <div className="flex justify-center py-1">
                    <MiniKMap
                      mapType="fourVar"
                      highlightCells={[]}
                      targetValue=""
                      showAllIndices={true}
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 font-mono">
                    Rows: AB (00, 01, 11, 10) | Cols: CD (00, 01, 11, 10)
                  </p>
                </div>
              </div>
            </div>

            {/* B. Visual Group-Size Ladder */}
            <div className="space-y-3 pt-3 border-t border-[#DCE7E1]">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1E293B] flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#285C49]" />
                2. Visual Group-Size Ladder & Variable Elimination
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {data.cheatSheet.groupSizeLadder.map((step, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2 text-center"
                  >
                    <span className="font-mono text-[11px] font-bold text-[#285C49] block">
                      {step.name} ({step.cells} cells)
                    </span>
                    <div className="flex justify-center py-0.5">
                      <MiniKMap
                        mapType={step.miniMap?.mapType || (step.cells <= 4 ? 'twoVar' : step.cells === 8 ? 'threeVar' : 'fourVar')}
                        highlightCells={step.miniMap?.cells || (step.cells === 1 ? [0] : step.cells === 2 ? [0, 1] : step.cells === 4 ? [0, 1, 2, 3] : step.cells === 8 ? [0, 1, 3, 2, 4, 5, 7, 6] : [0, 1, 3, 2, 4, 5, 7, 6, 12, 13, 15, 14, 8, 9, 11, 10])}
                        targetValue="1"
                        groupColor="emerald"
                      />
                    </div>
                    <div className="text-[11px] font-mono text-emerald-800 font-bold">
                      Eliminates {step.eliminated}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {step.remaining}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* C. SOP Versus POS Dual Complementary Panels (Task 9C) */}
            <div className="space-y-3 pt-3 border-t border-[#DCE7E1]">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1E293B] flex items-center gap-1.5">
                <ArrowRightLeft className="w-3.5 h-3.5 text-[#285C49]" />
                3. SOP Versus POS Comparative Reference
              </h4>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* SOP Green Panel */}
                <div className="p-4 rounded-xl bg-[#F0FDF4] border border-emerald-300 space-y-3">
                  <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                    <span className="font-mono text-xs font-bold text-emerald-900 uppercase tracking-wider">
                      Sum of Products (SOP: Σ m)
                    </span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 font-bold">
                      Group 1s
                    </span>
                  </div>

                  <ul className="space-y-1.5 text-xs text-emerald-950 font-sans leading-relaxed">
                    <li>- <strong>Grouping Objective:</strong> Form largest powers-of-two rectangles of 1-cells.</li>
                    <li>- <strong>Boolean Term Type:</strong> Generates <strong>Product (AND)</strong> terms.</li>
                    <li>- <strong>Constant 1:</strong> Variable is <strong>uncomplemented</strong> (e.g., $B$).</li>
                    <li>- <strong>Constant 0:</strong> Variable is <strong>complemented</strong> (e.g., $B'$).</li>
                    <li>- <strong>All-Ones Full Map:</strong> Entire function evaluates to $F = 1$.</li>
                  </ul>
                </div>

                {/* POS Purple Panel */}
                <div className="p-4 rounded-xl bg-[#FAF5FF] border border-purple-300 space-y-3">
                  <div className="flex items-center justify-between border-b border-purple-200 pb-2">
                    <span className="font-mono text-xs font-bold text-purple-950 uppercase tracking-wider">
                      Product of Sums (POS: Π M)
                    </span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-purple-200 text-purple-950 font-bold">
                      Group 0s
                    </span>
                  </div>

                  <ul className="space-y-1.5 text-xs text-purple-950 font-sans leading-relaxed">
                    <li>- <strong>Grouping Objective:</strong> Form largest powers-of-two rectangles of 0-cells.</li>
                    <li>- <strong>Boolean Term Type:</strong> Generates <strong>Sum (OR)</strong> terms.</li>
                    <li>- <strong>Constant 0:</strong> Variable is <strong>uncomplemented</strong> (e.g., $B$).</li>
                    <li>- <strong>Constant 1:</strong> Variable is <strong>complemented</strong> (e.g., $B'$).</li>
                    <li>- <strong>All-Zeros Full Map:</strong> Entire function evaluates to $F = 0$.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* D. Wraparound Topologies Reference */}
            <div className="space-y-3 pt-3 border-t border-[#DCE7E1]">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1E293B] flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-[#285C49]" />
                4. Boundary Wraparound Reference
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.cheatSheet.wraparoundReference.map((wrap, wIdx) => (
                  <div
                    key={wIdx}
                    className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2 text-center"
                  >
                    <span className="font-mono text-xs font-bold text-[#1E293B] block">
                      {wrap.name}
                    </span>
                    <div className="flex justify-center py-1">
                      <MiniKMap
                        mapType={wrap.miniMap?.mapType || (wIdx === 0 ? 'threeVar' : 'fourVar')}
                        highlightCells={wrap.miniMap?.cells || (wIdx === 0 ? [0, 2] : wIdx === 1 ? [0, 1, 8, 9] : [0, 2, 8, 10])}
                        targetValue="1"
                        groupColor="emerald"
                      />
                    </div>
                    <div className="text-[11px] font-mono text-[#285C49] font-bold">
                      Term: {wrap.term}
                    </div>
                    <p className="text-[10px] text-slate-500 font-sans">
                      {wrap.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* E. Don't-Care Rules & Common Mistakes Visual Checklist */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-3 border-t border-[#DCE7E1]">
              {/* Don't-Care Rules */}
              <div className="p-4 rounded-xl bg-[#FFFBEB] border border-amber-300 space-y-2.5">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  Don't-Care (X) Minimization Principles
                </h4>
                <ul className="space-y-1.5 text-xs text-amber-950 font-sans">
                  {data.cheatSheet.dontCareRules.map((r, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 flex-shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 8-Point Exam Checklist */}
              <div className="p-4 rounded-xl bg-[#F4F7F4] border border-[#DCE7E1] space-y-2.5">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#285C49] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#285C49]" />
                  8-Point Examination Solving Checklist
                </h4>
                <div className="space-y-1.5 text-xs text-[#293B32]">
                  {data.cheatSheet.examChecklist.slice(0, 5).map((chk, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#285C49] mt-0.5 flex-shrink-0" />
                      <span className="text-[11px]">{chk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Common Traps Checklist */}
            <div className="space-y-2 pt-3 border-t border-[#DCE7E1]">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                Common Examination Mistakes to Avoid
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
                {data.cheatSheet.commonMistakes.map((m, mIdx) => (
                  <div key={mIdx} className="p-2.5 rounded-lg bg-rose-50/50 border border-rose-200 space-y-1">
                    <div className="font-mono font-bold text-rose-900">{m.mistake}</div>
                    <div className="text-[11px] text-slate-700"><strong>Fix:</strong> {m.fix}</div>
                    <div className="text-[10px] text-rose-700 italic">Impact: {m.impact}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 7: PRACTICE LAB (TASK 10: INTERACTIVE WORKSPACE + 36 PROBLEMS)    */}
      {/* ===================================================================== */}
      {activeTab === 'practice-lab' && (
        <div className="space-y-8">
          {/* A. Hands-On Interactive K-Map Practice Workspace (Task 10) */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DCE7E1] pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-[#285C49] uppercase tracking-wider">
                  Hands-On Interactive Workspace
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#1E293B] mt-0.5">
                  Try It Yourself: Build and Solve a K-Map
                </h3>
                <p className="text-xs text-[#5F6C64] mt-0.5">
                  Select cells directly on the K-Map to propose groups. The system verifies power-of-two size, rectangularity, and extracts the Boolean term!
                </p>
              </div>

              {/* Preset Selector */}
              <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
                {data.practiceLab.interactivePresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handlePresetChange(preset.id)}
                    className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                      selectedPresetId === preset.id
                        ? 'bg-[#285C49] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {preset.title.split(':')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Preset Header */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
              <div>
                <span className="text-slate-500 font-semibold">Active Problem: </span>
                <span className="font-bold text-[#1E293B]">{activePreset.title}</span>
                <span className="block text-emerald-800 font-bold mt-0.5">{activePreset.functionText}</span>
              </div>
              <span className={`px-2.5 py-1 rounded-full font-bold self-start sm:self-auto ${
                activePreset.targetPolarity === '1' 
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                  : 'bg-purple-100 text-purple-800 border border-purple-300'
              }`}>
                {activePreset.targetForm} (Group {activePreset.targetPolarity}s)
              </span>
            </div>

            {/* Interactive Grid & Group Builder */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Interactive K-Map */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center p-4 bg-[#FAF8F5] rounded-xl border border-[#DCE7E1] space-y-3">
                <KMapGrid
                  mapType={activePreset.mapType}
                  minterms={activePreset.minterms || []}
                  maxterms={activePreset.maxterms || []}
                  dontCares={activePreset.dontCares || []}
                  targetPolarity={activePreset.targetPolarity}
                  groups={workspaceFormedGroups}
                  activeGroup="ALL"
                  selectedCells={workspaceSelectedCells}
                  onCellClick={handleWorkspaceCellClick}
                />

                <div className="text-xs font-mono text-slate-500 text-center">
                  Click cells to toggle selection (amber outline). Click "Validate & Add Group" below.
                </div>
              </div>

              {/* Right Column: Group Controls & Derivation */}
              <div className="lg:col-span-6 space-y-4">
                {/* Selected Cells Panel */}
                <div className="p-4 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-600">
                      Currently Selected Cells:
                    </span>
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
                      {workspaceSelectedCells.length} cells
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 font-mono text-xs text-[#1E293B]">
                    {workspaceSelectedCells.length > 0 ? (
                      <span>[{workspaceSelectedCells.map(c => `m${c}`).join(', ')}]</span>
                    ) : (
                      <span className="text-slate-400 italic">No cells selected yet (click cells in the map)</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleValidateProposedGroup}
                      disabled={workspaceSelectedCells.length === 0}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#285C49] hover:bg-[#1E4738] text-white font-mono text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Validate & Add Group</span>
                    </button>
                    <button
                      onClick={() => setWorkspaceSelectedCells([])}
                      disabled={workspaceSelectedCells.length === 0}
                      className="px-3 py-2 rounded-lg border border-[#DCE7E1] bg-white hover:bg-slate-50 text-xs font-mono font-semibold text-slate-600 transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                {/* Formed Groups List */}
                <div className="p-4 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#285C49]">
                      Formed Groups ({workspaceFormedGroups.length})
                    </span>
                    {workspaceFormedGroups.length > 0 && (
                      <button
                        onClick={handleCheckWorkspaceCover}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white font-mono text-[11px] font-bold shadow-2xs transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Check Cover</span>
                      </button>
                    )}
                  </div>

                  {workspaceFormedGroups.length > 0 ? (
                    <div className="space-y-2">
                      {workspaceFormedGroups.map((grp, gIdx) => (
                        <div
                          key={gIdx}
                          className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] flex items-center justify-between font-mono text-xs"
                        >
                          <div>
                            <span className="font-bold text-[#285C49] mr-2">{grp.group}:</span>
                            <span className="text-slate-600">[{grp.cells.join(', ')}]</span>
                            <span className="font-bold text-[#1E293B] ml-2 bg-white px-2 py-0.5 rounded border border-[#DCE7E1]">
                              {grp.term}
                            </span>
                          </div>
                          <button
                            onClick={() => handleRemoveWorkspaceGroup(gIdx)}
                            className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                            title="Remove group"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">
                      No groups added yet. Build groups until all required cells are covered.
                    </p>
                  )}
                </div>

                {/* Interactive Feedback Message */}
                {workspaceFeedback && (
                  <div className={`p-3.5 rounded-xl border text-xs font-mono leading-relaxed ${
                    workspaceFeedback.type === 'error'
                      ? 'bg-rose-50 border-rose-200 text-rose-900'
                      : workspaceFeedback.type === 'warning'
                      ? 'bg-amber-50 border-amber-200 text-amber-900'
                      : workspaceFeedback.type === 'complete'
                      ? 'bg-emerald-100 border-emerald-300 text-emerald-950 font-bold'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  }`}>
                    {workspaceFeedback.message}
                  </div>
                )}

                {/* Preset Hint Toggle */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => setWorkspaceShowHint(prev => !prev)}
                    className="inline-flex items-center gap-1 text-xs font-mono text-[#285C49] hover:underline"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>{workspaceShowHint ? 'Hide Hint' : 'Need a Hint?'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setWorkspaceFormedGroups(activePreset.expectedGroups.map((g, i) => ({
                        group: `G${i + 1}`,
                        cells: g.cells,
                        term: g.term
                      })));
                      setWorkspaceSelectedCells([]);
                      setWorkspaceFeedback({
                        type: 'complete',
                        message: `Loaded Model Solution: ${activePreset.minimalExpression}`
                      });
                    }}
                    className="text-xs font-mono text-slate-500 hover:text-slate-800 underline"
                  >
                    Load Solution
                  </button>
                </div>

                {workspaceShowHint && (
                  <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 font-sans leading-relaxed">
                    <strong>Hint: </strong>{activePreset.hint}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* B. 36 Progressive Examination Practice Problems */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DCE7E1] pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-[#285C49] uppercase tracking-wider">
                  Self-Paced Examination Problems
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#1E293B] mt-0.5">
                  Practice Lab: 36 Progressive Examination Problems
                </h3>
                <p className="text-xs text-[#5F6C64] mt-0.5">
                  Graded practice sets spanning 2-Var, 3-Var, 4-Var, SOP, POS, Don't-Care, and Wraparound minimization.
                </p>
              </div>

              {/* Problem Filters Row */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Form Filter */}
                <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg">
                  {['All', 'SOP', 'POS'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setPracticeFormFilter(f)}
                      className={`px-2.5 py-1 rounded-md font-mono text-[11px] font-bold transition-all ${
                        practiceFormFilter === f
                          ? 'bg-white text-[#285C49] shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                {/* Difficulty Filter */}
                <div className="flex items-center gap-1">
                  {practiceDifficulties.map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setPracticeFilter(diff)}
                      className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold transition-all ${
                        practiceFilter === diff
                          ? 'bg-[#285C49] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Practice Problems Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPractice.map((prob) => {
                const isHintRevealed = revealedHints[prob.id];
                const isSolutionRevealed = revealedSolutions[prob.id];
                const isPOS = prob.form === 'POS';

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
                          <span className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold ${
                            isPOS ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {prob.form || 'SOP'}
                          </span>
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
                            : isPOS ? 'bg-purple-800 text-white hover:bg-purple-900' : 'bg-[#285C49] text-white hover:bg-[#1E4738]'
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

export const Section25View = (props) => (
  <SectionErrorBoundary>
    <Section25ViewInternal {...props} />
  </SectionErrorBoundary>
);

export default Section25View;
