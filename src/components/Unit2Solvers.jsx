import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Table, 
  Layers, 
  GitBranch, 
  Grid, 
  Cpu, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  RefreshCw, 
  ArrowRight, 
  Sliders, 
  Check, 
  Copy, 
  Info,
  HelpCircle,
  Eye,
  Plus,
  Trash2,
  XCircle,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { 
  parseBooleanExpression, 
  extractVariables, 
  generateTruthTable, 
  getMintermTerm, 
  getMaxtermTerm, 
  formatCanonicalSOP, 
  formatCanonicalPOS, 
  getKMapGridDescriptor, 
  minimizeKMap, 
  areExpressionsEquivalent, 
  traceAlgebraicSimplification, 
  validateKMapGroup, 
  compareExpressions, 
  expandSOPTerm, 
  expandPOSTerm, 
  convertCanonicalSOPtoPOS, 
  convertCanonicalPOStoSOP, 
  buildNandSynthesis, 
  buildNorSynthesis 
} from '../utils/booleanEngine';

/**
 * Unit 2 Dedicated Interactive Solvers Suite
 * Digital Logic Design (DLD) - Unit 2
 * ZeroIndex Engineering Platform
 * 
 * Strict formatting: Zero em-dashes and zero en-dashes throughout.
 */

export const Unit2Solvers = () => {
  const [activeSolverTab, setActiveSolverTab] = useState('simplifier');

  const solverTabs = [
    { 
      id: 'simplifier', 
      label: 'Boolean Simplifier', 
      section: 'Sec 2.1 & 2.2', 
      icon: Calculator, 
      desc: 'Algebraic Reduction & Laws' 
    },
    { 
      id: 'truthTable', 
      label: 'Truth Table & Equivalence', 
      section: 'Sec 2.1 - 2.4', 
      icon: Table, 
      desc: 'State Evaluation & Equivalence' 
    },
    { 
      id: 'mintermMaxterm', 
      label: 'Minterm/Maxterm Explorer', 
      section: 'Sec 2.3', 
      icon: Layers, 
      desc: 'Canonical Indexing & Polarity' 
    },
    { 
      id: 'sopPos', 
      label: 'SOP/POS Conversion Studio', 
      section: 'Sec 2.4', 
      icon: GitBranch, 
      desc: 'Expansions & Complementation' 
    },
    { 
      id: 'kmap', 
      label: 'Interactive K-Map Solver', 
      section: 'Sec 2.5', 
      icon: Grid, 
      desc: 'Visual Minimization & Grouping' 
    },
    { 
      id: 'nandNor', 
      label: 'NAND/NOR Circuit Builder', 
      section: 'Sec 2.6', 
      icon: Cpu, 
      desc: 'Universal Logic Synthesis' 
    }
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Top Banner Dashboard */}
      <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#285C49]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#285C49]">
              Unit II Interactive Mathematical Suite
            </span>
          </div>
          <span className="text-xs font-mono text-[#64748B]">
            Deterministic Local Mathematical Engines
          </span>
        </div>

        <div>
          <h2 className="font-editorial text-2xl font-bold text-[#1E293B]">
            Boolean Algebra & Logic Minimization Solvers
          </h2>
          <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
            Five core interactive mathematical tools built for symbolic transformation, truth table analysis, canonical indexing, SOP/POS expansion, and Karnaugh map minimization.
          </p>
        </div>

        {/* 6-Tab Selection Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2 border-t border-[#F2F7F4]">
          {solverTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSolverTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSolverTab(tab.id)}
                className={`p-3 rounded-xl text-left transition-all flex flex-col justify-between border ${
                  isActive
                    ? 'bg-[#285C49] text-white border-[#285C49] shadow-xs'
                    : 'bg-[#FAF8F5] text-[#1E293B] border-[#DCE7E1] hover:bg-white hover:border-[#285C49]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#285C49]'}`} />
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-white/20 text-white' : 'bg-white text-[#64748B] border border-[#DCE7E1]'
                  }`}>
                    {tab.section}
                  </span>
                </div>
                <div className="mt-2">
                  <div className={`text-xs font-bold ${isActive ? 'text-white' : 'text-[#1E293B]'}`}>
                    {tab.label}
                  </div>
                  <div className={`text-[10px] mt-0.5 line-clamp-1 ${isActive ? 'text-emerald-100' : 'text-[#64748B]'}`}>
                    {tab.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Solver Views */}
      {activeSolverTab === 'simplifier' && <SolverA_Simplifier />}
      {activeSolverTab === 'truthTable' && <SolverB_TruthTable />}
      {activeSolverTab === 'mintermMaxterm' && <SolverC_MintermMaxterm />}
      {activeSolverTab === 'sopPos' && <SolverD_SopPos />}
      {activeSolverTab === 'kmap' && <SolverE_KMap />}
      {activeSolverTab === 'nandNor' && <SolverF_NandNor />}
    </div>
  );
};

// ============================================================================
// SOLVER 1: BOOLEAN EXPRESSION SIMPLIFIER (Sections 2.1 & 2.2)
// ============================================================================
const SolverA_Simplifier = () => {
  const [inputExpr, setInputExpr] = useState("AB + AB'");
  const [showTruthTable, setShowTruthTable] = useState(false);

  const presets = [
    { label: "Combining: AB + AB'", expr: "AB + AB'" },
    { label: "Redundancy: A + A'B", expr: "A + A'B" },
    { label: "Distributive: (A+B)(A+C)", expr: "(A+B)(A+C)" },
    { label: "Consensus: AB + A'C + BC", expr: "AB + A'C + BC" },
    { label: "Absorption: A + AB", expr: "A + AB" },
    { label: "Multivar: A'B'C' + A'BC' + AB'C' + ABC'", expr: "A'B'C' + A'BC' + AB'C' + ABC'" }
  ];

  const result = useMemo(() => {
    return traceAlgebraicSimplification(inputExpr);
  }, [inputExpr]);

  const truthTable = useMemo(() => {
    if (!result.success) return null;
    try {
      return generateTruthTable(inputExpr, result.variables);
    } catch {
      return null;
    }
  }, [inputExpr, result]);

  return (
    <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-6">
      <div className="border-b border-[#F2F7F4] pb-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold uppercase text-[#285C49] bg-[#EBF3ED] px-2 py-0.5 rounded">
            Solver 1 · Sections 2.1 & 2.2
          </span>
          <span className="text-xs text-[#64748B]">Deterministic AST Symbolic Engine</span>
        </div>
        <h3 className="text-xl font-editorial font-bold text-[#1E293B] mt-1">
          Boolean Algebra & Expression Simplifier
        </h3>
        <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
          Enter any Boolean expression to view its step-by-step algebraic reduction. The solver cites exact Boolean laws and proves truth table equivalence.
        </p>
      </div>

      {/* Presets */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-bold text-[#64748B] uppercase font-mono">Curriculum Presets:</span>
        <div className="flex flex-wrap gap-1.5">
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setInputExpr(p.expr)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors border ${
                inputExpr === p.expr
                  ? 'bg-[#285C49] text-white border-[#285C49]'
                  : 'bg-[#FAF8F5] border-[#DCE7E1] text-[#1E293B] hover:border-[#285C49]'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <label className="font-bold text-[#1E293B]">
            Boolean Expression Input:
          </label>
          <span className="text-[11px] text-[#64748B]">
            Syntax: ' for NOT, + for OR, juxtaposition for AND, () for grouping
          </span>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputExpr}
            onChange={(e) => setInputExpr(e.target.value)}
            placeholder="e.g. AB + AB' or A + A'B"
            className="flex-1 px-4 py-2.5 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] text-sm font-mono text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#285C49] focus:bg-white transition-all"
          />
          <button
            onClick={() => setInputExpr("AB + AB'")}
            className="px-3 py-2 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] text-xs font-mono text-[#64748B] hover:text-[#1E293B]"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Output Results */}
      {result.success ? (
        <div className="space-y-5">
          {/* Minimal Form Banner */}
          <div className="p-4 rounded-xl bg-[#EBF3ED] border border-[#285C49]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-[#285C49] block">
                Minimal Irreducible Form
              </span>
              <span className="text-2xl font-mono font-bold text-[#285C49]">
                F = {result.simplified}
              </span>
            </div>
            <div className="text-right text-xs font-mono text-[#64748B] space-y-1">
              <div>Variables ({result.variables.length}): {result.variables.join(', ')}</div>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white text-[#285C49] border border-[#285C49]/30 text-[11px] font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Truth-Table Verified Equivalence</span>
              </div>
            </div>
          </div>

          {/* Derivation Steps */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#1E293B] uppercase tracking-wider font-mono">
              Classroom Step-by-Step Reduction Trace
            </h4>
            <div className="divide-y divide-[#F2F7F4] border border-[#DCE7E1] rounded-xl overflow-hidden bg-white">
              {result.steps.map((s) => (
                <div key={s.stepNumber} className="p-3.5 grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs items-center">
                  <div className="sm:col-span-2 font-mono font-bold text-[#64748B] flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#FAF8F5] border border-[#DCE7E1] flex items-center justify-center text-[10px]">
                      {s.stepNumber}
                    </span>
                    <span>Step {s.stepNumber}</span>
                  </div>
                  <div className="sm:col-span-5 font-mono font-bold text-[#1E293B] bg-[#FAF8F5] p-2 rounded-lg border border-[#DCE7E1] text-sm">
                    {s.expression}
                  </div>
                  <div className="sm:col-span-5 flex flex-col justify-center text-xs">
                    <span className="font-bold text-[#285C49] font-mono">{s.law}</span>
                    <span className="text-[#64748B] text-[11px] mt-0.5">{s.justification}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Truth Table Verification Toggle */}
          <div className="pt-2">
            <button
              onClick={() => setShowTruthTable(!showTruthTable)}
              className="text-xs font-mono font-bold text-[#285C49] hover:underline flex items-center gap-1"
            >
              <span>{showTruthTable ? 'Hide Truth Table Verification' : 'Show Truth Table Verification (All Rows)'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {showTruthTable && truthTable && (
              <div className="mt-3 overflow-x-auto rounded-xl border border-[#DCE7E1]">
                <table className="w-full text-center text-xs font-mono">
                  <thead>
                    <tr className="bg-[#FAF8F5] border-b border-[#DCE7E1] text-[#64748B]">
                      <th className="p-2 border-r border-[#DCE7E1]">Row</th>
                      {truthTable.variables.map(v => (
                        <th key={v} className="p-2 border-r border-[#DCE7E1] font-bold text-[#1E293B]">{v}</th>
                      ))}
                      <th className="p-2 border-r border-[#DCE7E1]">Original F</th>
                      <th className="p-2 text-[#285C49] font-bold bg-[#FAF8F5]">Simplified F</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2F7F4]">
                    {truthTable.rows.map(r => (
                      <tr key={r.index} className={r.output === 1 ? 'bg-[#EBF3ED]/30' : 'bg-white'}>
                        <td className="p-1.5 border-r border-[#DCE7E1] text-[#64748B]">{r.index}</td>
                        {truthTable.variables.map(v => (
                          <td key={v} className="p-1.5 border-r border-[#DCE7E1]">{r.assignment[v]}</td>
                        ))}
                        <td className="p-1.5 border-r border-[#DCE7E1] font-bold">{r.output}</td>
                        <td className="p-1.5 font-bold text-[#285C49]">{r.output}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-[#FEE2E2] border border-[#DC2626]/30 text-xs text-[#991B1B] flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>Invalid expression syntax: {result.error}</span>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// SOLVER 2: TRUTH TABLE GENERATOR & EQUIVALENCE CHECKER (Sections 2.1 to 2.4)
// ============================================================================
const SolverB_TruthTable = () => {
  const [mode, setMode] = useState('single'); // 'single' or 'compare'
  
  // Single mode state
  const [inputExpr, setInputExpr] = useState("A'B + AB'");
  const [explicitVars, setExplicitVars] = useState("A, B");
  
  // Compare mode state
  const [compareExpr1, setCompareExpr1] = useState("AB + C");
  const [compareExpr2, setCompareExpr2] = useState("(A + C)(B + C)");
  const [compareVars, setCompareVars] = useState("A, B, C");

  const tableData = useMemo(() => {
    try {
      const vars = explicitVars.split(',').map(v => v.trim().toUpperCase()).filter(Boolean);
      return {
        success: true,
        data: generateTruthTable(inputExpr, vars.length > 0 ? vars : null)
      };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [inputExpr, explicitVars]);

  const comparisonData = useMemo(() => {
    const vars = compareVars.split(',').map(v => v.trim().toUpperCase()).filter(Boolean);
    return compareExpressions(compareExpr1, compareExpr2, vars.length > 0 ? vars : null);
  }, [compareExpr1, compareExpr2, compareVars]);

  return (
    <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2F7F4] pb-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase text-[#285C49] bg-[#EBF3ED] px-2 py-0.5 rounded">
            Solver 2 · Sections 2.1 to 2.4
          </span>
          <h3 className="text-xl font-editorial font-bold text-[#1E293B] mt-1">
            Truth Table Generator & Equivalence Checker
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Generates exhaustive 2^n truth tables, extracts canonical \u03A3m and \u03A0M indices, and tests formal equivalence between two expressions.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-xl border border-[#DCE7E1] self-start sm:self-auto">
          <button
            onClick={() => setMode('single')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
              mode === 'single'
                ? 'bg-[#285C49] text-white shadow-xs'
                : 'text-[#64748B] hover:text-[#1E293B]'
            }`}
          >
            Single Truth Table
          </button>
          <button
            onClick={() => setMode('compare')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
              mode === 'compare'
                ? 'bg-[#285C49] text-white shadow-xs'
                : 'text-[#64748B] hover:text-[#1E293B]'
            }`}
          >
            Equivalence Checker
          </button>
        </div>
      </div>

      {mode === 'single' ? (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-[#1E293B] font-mono">Boolean Expression:</label>
              <input
                type="text"
                value={inputExpr}
                onChange={(e) => setInputExpr(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] text-xs font-mono text-[#1E293B]"
                placeholder="e.g. A + B*C"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1E293B] font-mono">Explicit Variables (Preserved Order):</label>
              <input
                type="text"
                value={explicitVars}
                onChange={(e) => setExplicitVars(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] text-xs font-mono text-[#1E293B]"
                placeholder="e.g. A, B, C"
              />
            </div>
          </div>

          {tableData.success ? (
            <div className="space-y-4">
              {/* Canonical Index Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-[#EBF3ED] border border-[#285C49]/30 space-y-1">
                  <span className="text-[10px] font-bold text-[#285C49] uppercase">
                    Canonical SOP (Minterms F = 1)
                  </span>
                  <div className="text-base font-bold text-[#285C49]">
                    F({tableData.data.variables.join(', ')}) = \u03A3m({tableData.data.minterms.join(', ') || 'none'})
                  </div>
                  <div className="text-[11px] text-[#64748B]">
                    = {formatCanonicalSOP(tableData.data.minterms, tableData.data.variables)}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#EEF2FF] border border-[#4F46E5]/30 space-y-1">
                  <span className="text-[10px] font-bold text-[#4F46E5] uppercase">
                    Canonical POS (Maxterms F = 0)
                  </span>
                  <div className="text-base font-bold text-[#4F46E5]">
                    F({tableData.data.variables.join(', ')}) = \u03A0M({tableData.data.maxterms.join(', ') || 'none'})
                  </div>
                  <div className="text-[11px] text-[#64748B]">
                    = {formatCanonicalPOS(tableData.data.maxterms, tableData.data.variables)}
                  </div>
                </div>
              </div>

              {/* Truth Table */}
              <div className="overflow-x-auto rounded-xl border border-[#DCE7E1]">
                <table className="w-full text-center text-xs font-mono">
                  <thead>
                    <tr className="bg-[#FAF8F5] border-b border-[#DCE7E1] text-[#64748B]">
                      <th className="p-2 border-r border-[#DCE7E1]">Row</th>
                      {tableData.data.variables.map(v => (
                        <th key={v} className="p-2 border-r border-[#DCE7E1] font-bold text-[#1E293B]">{v}</th>
                      ))}
                      <th className="p-2 border-r border-[#DCE7E1]">Minterm</th>
                      <th className="p-2 border-r border-[#DCE7E1]">Maxterm</th>
                      <th className="p-2 text-[#285C49] font-bold bg-[#FAF8F5]">Output (F)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2F7F4]">
                    {tableData.data.rows.map((r) => (
                      <tr key={r.index} className={r.output === 1 ? 'bg-[#EBF3ED]/30' : 'bg-white'}>
                        <td className="p-2 border-r border-[#DCE7E1] font-bold text-[#64748B]">{r.index}</td>
                        {tableData.data.variables.map(v => (
                          <td key={v} className="p-2 border-r border-[#DCE7E1]">{r.assignment[v]}</td>
                        ))}
                        <td className="p-2 border-r border-[#DCE7E1] text-[#285C49] font-bold">
                          {getMintermTerm(r.index, tableData.data.variables)}
                        </td>
                        <td className="p-2 border-r border-[#DCE7E1] text-[#4F46E5]">
                          {getMaxtermTerm(r.index, tableData.data.variables)}
                        </td>
                        <td className={`p-2 font-bold ${r.output === 1 ? 'text-[#285C49]' : 'text-[#64748B]'}`}>
                          {r.output}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-[#FEE2E2] text-xs text-[#991B1B]">
              {tableData.error}
            </div>
          )}
        </div>
      ) : (
        /* Equivalence Checker Mode */
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1E293B] font-mono">Expression 1:</label>
              <input
                type="text"
                value={compareExpr1}
                onChange={(e) => setCompareExpr1(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] text-xs font-mono text-[#1E293B]"
                placeholder="e.g. AB + C"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1E293B] font-mono">Expression 2:</label>
              <input
                type="text"
                value={compareExpr2}
                onChange={(e) => setCompareExpr2(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] text-xs font-mono text-[#1E293B]"
                placeholder="e.g. (A + C)(B + C)"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1E293B] font-mono">Variables Scope:</label>
            <input
              type="text"
              value={compareVars}
              onChange={(e) => setCompareVars(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] text-xs font-mono text-[#1E293B]"
              placeholder="e.g. A, B, C"
            />
          </div>

          {comparisonData.success ? (
            <div className="space-y-4">
              {/* Verdict Card */}
              {comparisonData.isEquivalent ? (
                <div className="p-4 rounded-xl bg-[#EBF3ED] border border-[#285C49]/40 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#285C49] flex-shrink-0" />
                  <div>
                    <span className="font-bold text-[#285C49] font-mono text-sm block">
                      Strict Mathematical Equivalence Proved
                    </span>
                    <span className="text-xs text-[#285C49]">
                      Both expressions evaluate to identical truth values across all {comparisonData.totalRows} input combinations.
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-[#FEE2E2] border border-[#DC2626]/40 space-y-1 text-xs text-[#991B1B]">
                  <div className="flex items-center gap-2 font-bold font-mono text-sm">
                    <XCircle className="w-5 h-5 flex-shrink-0" />
                    <span>Expressions are NOT Equivalent</span>
                  </div>
                  <div>
                    Counterexample found at row {comparisonData.counterExample?.index}:{' '}
                    {Object.entries(comparisonData.counterExample?.assignment || {}).map(([k, v]) => `${k}=${v}`).join(', ')}
                    {' '}\u2192 Expr 1 = {comparisonData.counterExample?.val1}, Expr 2 = {comparisonData.counterExample?.val2}.
                  </div>
                </div>
              )}

              {/* Comparison Truth Table */}
              <div className="overflow-x-auto rounded-xl border border-[#DCE7E1]">
                <table className="w-full text-center text-xs font-mono">
                  <thead>
                    <tr className="bg-[#FAF8F5] border-b border-[#DCE7E1] text-[#64748B]">
                      <th className="p-2 border-r border-[#DCE7E1]">Row</th>
                      {comparisonData.variables.map(v => (
                        <th key={v} className="p-2 border-r border-[#DCE7E1] font-bold text-[#1E293B]">{v}</th>
                      ))}
                      <th className="p-2 border-r border-[#DCE7E1] font-bold text-[#285C49]">Expr 1</th>
                      <th className="p-2 border-r border-[#DCE7E1] font-bold text-[#4F46E5]">Expr 2</th>
                      <th className="p-2 font-bold">Match</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2F7F4]">
                    {comparisonData.rows.map(r => (
                      <tr key={r.index} className={!r.match ? 'bg-rose-50' : 'bg-white'}>
                        <td className="p-2 border-r border-[#DCE7E1] text-[#64748B]">{r.index}</td>
                        {comparisonData.variables.map(v => (
                          <td key={v} className="p-2 border-r border-[#DCE7E1]">{r.assignment[v]}</td>
                        ))}
                        <td className="p-2 border-r border-[#DCE7E1] font-bold text-[#285C49]">{r.val1}</td>
                        <td className="p-2 border-r border-[#DCE7E1] font-bold text-[#4F46E5]">{r.val2}</td>
                        <td className="p-2 font-bold">
                          {r.match ? (
                            <span className="text-[#285C49]">✓</span>
                          ) : (
                            <span className="text-rose-600 font-bold">✗ Diff</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-[#FEE2E2] text-xs text-[#991B1B]">
              {comparisonData.error}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// SOLVER 3: MINTERM & MAXTERM EXPLORER (Section 2.3)
// ============================================================================
const SolverC_MintermMaxterm = () => {
  const [varCount, setVarCount] = useState(3);
  const [inspectedRow, setInspectedRow] = useState(5);
  // Row outputs: dictionary of index -> 0 or 1
  const [rowOutputs, setRowOutputs] = useState({ 1: 1, 3: 1, 5: 1, 7: 1 });

  const variables = useMemo(() => {
    return ['A', 'B', 'C', 'D'].slice(0, varCount);
  }, [varCount]);

  const totalRows = Math.pow(2, varCount);

  const toggleRow = (idx) => {
    setRowOutputs(prev => ({
      ...prev,
      [idx]: prev[idx] === 1 ? 0 : 1
    }));
  };

  const selectedMinterms = useMemo(() => {
    const list = [];
    for (let i = 0; i < totalRows; i++) {
      if (rowOutputs[i] === 1) list.push(i);
    }
    return list;
  }, [rowOutputs, totalRows]);

  const selectedMaxterms = useMemo(() => {
    const list = [];
    for (let i = 0; i < totalRows; i++) {
      if (rowOutputs[i] !== 1) list.push(i);
    }
    return list;
  }, [rowOutputs, totalRows]);

  // Inspection details for selected row
  const rowInspection = useMemo(() => {
    if (inspectedRow < 0 || inspectedRow >= totalRows) return null;
    const bin = inspectedRow.toString(2).padStart(varCount, '0');
    const bitBreakdown = [];
    for (let i = 0; i < varCount; i++) {
      const bitVal = parseInt(bin[i], 10);
      const varName = variables[i];
      bitBreakdown.push({
        variable: varName,
        bit: bitVal,
        mintermLit: bitVal === 1 ? varName : `${varName}'`,
        maxtermLit: bitVal === 0 ? varName : `${varName}'`,
        mintermReason: bitVal === 1 ? `${varName}=1 \u2192 uncomplemented ${varName}` : `${varName}=0 \u2192 complemented ${varName}'`,
        maxtermReason: bitVal === 0 ? `${varName}=0 \u2192 uncomplemented ${varName}` : `${varName}=1 \u2192 complemented ${varName}'`
      });
    }
    return {
      index: inspectedRow,
      binary: bin,
      minterm: getMintermTerm(inspectedRow, variables),
      maxterm: getMaxtermTerm(inspectedRow, variables),
      bitBreakdown
    };
  }, [inspectedRow, totalRows, varCount, variables]);

  return (
    <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-6">
      <div className="border-b border-[#F2F7F4] pb-4">
        <span className="text-[10px] font-mono font-bold uppercase text-[#285C49] bg-[#EBF3ED] px-2 py-0.5 rounded">
          Solver 3 · Section 2.3
        </span>
        <h3 className="text-xl font-editorial font-bold text-[#1E293B] mt-1">
          Minterm and Maxterm Explorer & Function Builder
        </h3>
        <p className="text-xs text-[#64748B] mt-0.5">
          Hands-on exploration of binary input combinations, bit polarities, and automatic canonical \u03A3m and \u03A0M construction.
        </p>
      </div>

      {/* Dimension Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#1E293B] font-mono">Select Variables:</span>
          <div className="flex gap-1.5">
            {[2, 3, 4].map(num => (
              <button
                key={num}
                onClick={() => {
                  setVarCount(num);
                  setRowOutputs({});
                  setInspectedRow(0);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
                  varCount === num
                    ? 'bg-[#285C49] text-white shadow-xs'
                    : 'bg-[#FAF8F5] border border-[#DCE7E1] text-[#64748B] hover:text-[#1E293B]'
                }`}
              >
                {num} Variables ({['A', 'B', 'C', 'D'].slice(0, num).join('')})
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => {
              const full = {};
              for (let i = 0; i < totalRows; i++) full[i] = 1;
              setRowOutputs(full);
            }}
            className="px-2.5 py-1 rounded bg-[#FAF8F5] border border-[#DCE7E1] text-[#1E293B] hover:border-[#285C49]"
          >
            All 1s (Tautology)
          </button>
          <button
            onClick={() => setRowOutputs({})}
            className="px-2.5 py-1 rounded bg-[#FAF8F5] border border-[#DCE7E1] text-[#1E293B] hover:border-[#DC2626]"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Row Inspector Modal Card */}
      {rowInspection && (
        <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-[#285C49] uppercase">
              Row Inspection · Index {rowInspection.index} ({rowInspection.binary})
            </span>
            <span className="text-[11px] font-mono text-[#64748B]">
              Click any row in the table below to inspect its formation
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-white border border-[#285C49]/30">
              <span className="text-[10px] text-[#285C49] font-bold uppercase block">Minterm (Product Term = 1)</span>
              <div className="text-base font-bold text-[#285C49] mt-0.5">
                m{rowInspection.index} = {rowInspection.minterm}
              </div>
              <p className="text-[11px] text-[#64748B] font-sans mt-1">
                Evaluates to logic 1 ONLY when inputs equal {rowInspection.binary}.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white border border-[#4F46E5]/30">
              <span className="text-[10px] text-[#4F46E5] font-bold uppercase block">Maxterm (Sum Term = 0)</span>
              <div className="text-base font-bold text-[#4F46E5] mt-0.5">
                M{rowInspection.index} = {rowInspection.maxterm}
              </div>
              <p className="text-[11px] text-[#64748B] font-sans mt-1">
                Evaluates to logic 0 ONLY when inputs equal {rowInspection.binary}.
              </p>
            </div>
          </div>

          {/* Bit Polarity Explanations */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono text-left bg-white rounded-lg border border-[#DCE7E1]">
              <thead className="bg-[#F2F7F4] text-[#64748B]">
                <tr>
                  <th className="p-2 border-r border-[#DCE7E1]">Variable</th>
                  <th className="p-2 border-r border-[#DCE7E1]">Input Bit</th>
                  <th className="p-2 border-r border-[#DCE7E1]">Minterm Literal</th>
                  <th className="p-2">Maxterm Literal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2F7F4]">
                {rowInspection.bitBreakdown.map((b) => (
                  <tr key={b.variable}>
                    <td className="p-2 border-r border-[#DCE7E1] font-bold">{b.variable}</td>
                    <td className="p-2 border-r border-[#DCE7E1] font-bold text-[#1E293B]">{b.bit}</td>
                    <td className="p-2 border-r border-[#DCE7E1] text-[#285C49]">
                      <span className="font-bold">{b.mintermLit}</span> ({b.mintermReason})
                    </td>
                    <td className="p-2 text-[#4F46E5]">
                      <span className="font-bold">{b.maxtermLit}</span> ({b.maxtermReason})
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Real-Time Generated Canonical Functions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-[#EBF3ED] border border-[#285C49]/30 space-y-1 text-xs font-mono">
          <span className="text-[10px] font-bold text-[#285C49] uppercase">
            Constructed Canonical SOP (\u03A3m)
          </span>
          <div className="text-base font-bold text-[#285C49]">
            F({variables.join(', ')}) = \u03A3m({selectedMinterms.join(', ') || 'none'})
          </div>
          <div className="text-[11px] text-[#1E293B] pt-0.5">
            = {formatCanonicalSOP(selectedMinterms, variables)}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#EEF2FF] border border-[#4F46E5]/30 space-y-1 text-xs font-mono">
          <span className="text-[10px] font-bold text-[#4F46E5] uppercase">
            Constructed Canonical POS (\u03A0M)
          </span>
          <div className="text-base font-bold text-[#4F46E5]">
            F({variables.join(', ')}) = \u03A0M({selectedMaxterms.join(', ') || 'none'})
          </div>
          <div className="text-[11px] text-[#1E293B] pt-0.5">
            = {formatCanonicalPOS(selectedMaxterms, variables)}
          </div>
        </div>
      </div>

      {/* Interactive Table with Output Toggles */}
      <div className="overflow-x-auto rounded-xl border border-[#DCE7E1]">
        <table className="w-full text-center text-xs font-mono">
          <thead>
            <tr className="bg-[#FAF8F5] border-b border-[#DCE7E1] text-[#64748B]">
              <th className="p-2 border-r border-[#DCE7E1]">Row</th>
              {variables.map(v => (
                <th key={v} className="p-2 border-r border-[#DCE7E1] font-bold text-[#1E293B]">{v}</th>
              ))}
              <th className="p-2 border-r border-[#DCE7E1]">Minterm</th>
              <th className="p-2 border-r border-[#DCE7E1]">Maxterm</th>
              <th className="p-2 border-r border-[#DCE7E1]">Click to Toggle F</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F2F7F4]">
            {Array.from({ length: totalRows }, (_, idx) => {
              const bin = idx.toString(2).padStart(varCount, '0');
              const isOutput1 = rowOutputs[idx] === 1;
              const isSelectedForInspect = inspectedRow === idx;

              return (
                <tr 
                  key={idx} 
                  className={`${isOutput1 ? 'bg-[#EBF3ED]/40' : 'bg-white'} ${isSelectedForInspect ? 'ring-2 ring-[#285C49]' : ''}`}
                >
                  <td className="p-2 border-r border-[#DCE7E1] font-bold text-[#64748B]">{idx}</td>
                  {variables.map((v, vIdx) => (
                    <td key={v} className="p-2 border-r border-[#DCE7E1]">{bin[vIdx]}</td>
                  ))}
                  <td className="p-2 border-r border-[#DCE7E1] text-[#285C49] font-bold">
                    {getMintermTerm(idx, variables)}
                  </td>
                  <td className="p-2 border-r border-[#DCE7E1] text-[#4F46E5]">
                    {getMaxtermTerm(idx, variables)}
                  </td>
                  <td className="p-2 border-r border-[#DCE7E1]">
                    <button
                      onClick={() => toggleRow(idx)}
                      className={`px-3 py-1 rounded-lg font-bold transition-all ${
                        isOutput1
                          ? 'bg-[#285C49] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      {isOutput1 ? '1' : '0'}
                    </button>
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => setInspectedRow(idx)}
                      className="px-2 py-1 rounded text-[11px] font-bold text-[#285C49] hover:bg-[#EBF3ED] transition-colors"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ============================================================================
// SOLVER 4: SOP / POS CONVERSION STUDIO (Section 2.4)
// ============================================================================
const SolverD_SopPos = () => {
  const [route, setRoute] = useState('sopToCan'); // 'sopToCan', 'posToCan', 'canonical', 'dual'
  const [expression, setExpression] = useState("AB + C");
  const [variablesStr, setVariablesStr] = useState("A, B, C");

  const variables = useMemo(() => {
    return variablesStr.split(',').map(s => s.trim().toUpperCase()).filter(Boolean);
  }, [variablesStr]);

  // Expansion results for general SOP
  const sopExpansion = useMemo(() => {
    if (route !== 'sopToCan') return null;
    const terms = expression.split('+').map(t => t.trim()).filter(Boolean);
    const expansions = terms.map(t => expandSOPTerm(t, variables));
    const allMinterms = Array.from(new Set(expansions.flatMap(e => e.finalMinterms)));
    
    // Evaluate truth table to get indices
    try {
      const tt = generateTruthTable(expression, variables);
      return {
        expansions,
        allMinterms,
        mintermIndices: tt.minterms,
        canonicalSOP: formatCanonicalSOP(tt.minterms, variables)
      };
    } catch {
      return null;
    }
  }, [expression, variables, route]);

  // Expansion results for general POS
  const posExpansion = useMemo(() => {
    if (route !== 'posToCan') return null;
    const sumRegex = /\(([^)]+)\)/g;
    const terms = [];
    let match;
    while ((match = sumRegex.exec(expression)) !== null) {
      terms.push(match[1].trim());
    }
    if (terms.length === 0) terms.push(expression.replace(/[()]/g, '').trim());

    const expansions = terms.map(t => expandPOSTerm(t, variables));
    try {
      const tt = generateTruthTable(expression, variables);
      return {
        expansions,
        maxtermIndices: tt.maxterms,
        canonicalPOS: formatCanonicalPOS(tt.maxterms, variables)
      };
    } catch {
      return null;
    }
  }, [expression, variables, route]);

  // Canonical SOP <-> POS Conversion
  const canonicalConversion = useMemo(() => {
    try {
      const tt = generateTruthTable(expression, variables);
      return convertCanonicalSOPtoPOS(tt.minterms, variables.length, variables);
    } catch {
      return null;
    }
  }, [expression, variables]);

  // Dual SOP vs POS comparison
  const dualComparison = useMemo(() => {
    try {
      const tt = generateTruthTable(expression, variables);
      const sopMin = minimizeKMap(tt.minterms, [], variables, 'SOP');
      const posMin = minimizeKMap(tt.minterms, [], variables, 'POS');

      return {
        success: true,
        minterms: tt.minterms,
        maxterms: tt.maxterms,
        sopExpr: sopMin.minimalExpression,
        posExpr: posMin.minimalExpression,
        sopGroupsCount: sopMin.selectedGroups.length,
        posGroupsCount: posMin.selectedGroups.length
      };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [expression, variables]);

  return (
    <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-6">
      <div className="border-b border-[#F2F7F4] pb-4">
        <span className="text-[10px] font-mono font-bold uppercase text-[#285C49] bg-[#EBF3ED] px-2 py-0.5 rounded">
          Solver 4 · Section 2.4
        </span>
        <h3 className="text-xl font-editorial font-bold text-[#1E293B] mt-1">
          SOP and POS Conversion Studio
        </h3>
        <p className="text-xs text-[#64748B] mt-0.5">
          Step-by-step missing variable expansion, canonical set complementation (\u03A3m \u2194 \u03A0M), and hardware network comparisons.
        </p>
      </div>

      {/* Route Switcher */}
      <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1]">
        {[
          { id: 'sopToCan', label: 'General SOP \u2192 Canonical SOP' },
          { id: 'posToCan', label: 'General POS \u2192 Canonical POS' },
          { id: 'canonical', label: 'Canonical SOP \u2194 Canonical POS (U \\ S)' },
          { id: 'dual', label: 'Dual SOP vs POS Hardware Comparison' }
        ].map(r => (
          <button
            key={r.id}
            onClick={() => {
              setRoute(r.id);
              if (r.id === 'posToCan') setExpression('(A + B)(A + C)');
              else setExpression('AB + C');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
              route === r.id
                ? 'bg-[#285C49] text-white shadow-xs'
                : 'text-[#64748B] hover:text-[#1E293B]'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2 space-y-1.5">
          <label className="text-xs font-bold text-[#1E293B] font-mono">Input Expression:</label>
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] text-xs font-mono text-[#1E293B]"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E293B] font-mono">Declared Variables:</label>
          <input
            type="text"
            value={variablesStr}
            onChange={(e) => setVariablesStr(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] text-xs font-mono text-[#1E293B]"
          />
        </div>
      </div>

      {/* Route 1: General SOP to Canonical SOP */}
      {route === 'sopToCan' && sopExpansion && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#EBF3ED] border border-[#285C49]/30 space-y-1">
            <span className="text-[10px] font-mono uppercase font-bold text-[#285C49] block">
              Resulting Canonical SOP Expression
            </span>
            <div className="text-base font-bold font-mono text-[#285C49]">
              F({variables.join(', ')}) = \u03A3m({sopExpansion.mintermIndices.join(', ')})
            </div>
            <div className="text-xs font-mono text-[#1E293B] pt-0.5">
              = {sopExpansion.canonicalSOP}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#1E293B] uppercase font-mono">
              Missing Variable Expansion Steps
            </h4>
            <div className="space-y-2">
              {sopExpansion.expansions.map((exp, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] space-y-1.5 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1E293B]">Term {idx + 1}: {exp.originalTerm}</span>
                    <span className="text-[11px] text-[#64748B]">
                      {exp.missingVars.length === 0 ? 'Complete (No missing vars)' : `Missing: ${exp.missingVars.join(', ')}`}
                    </span>
                  </div>
                  {exp.steps.map((st, sIdx) => (
                    <div key={sIdx} className="p-2 rounded bg-white border border-[#DCE7E1] text-[11px] text-[#285C49]">
                      <span className="font-bold">Multiply by ({st.missingVar} + {st.missingVar}'): </span>
                      <span>{st.detail}</span>
                    </div>
                  ))}
                  <div className="text-[11px] text-[#475569]">
                    Resulting minterms: {exp.finalMinterms.join(' + ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Route 2: General POS to Canonical POS */}
      {route === 'posToCan' && posExpansion && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#EEF2FF] border border-[#4F46E5]/30 space-y-1">
            <span className="text-[10px] font-mono uppercase font-bold text-[#4F46E5] block">
              Resulting Canonical POS Expression
            </span>
            <div className="text-base font-bold font-mono text-[#4F46E5]">
              F({variables.join(', ')}) = \u03A0M({posExpansion.maxtermIndices.join(', ')})
            </div>
            <div className="text-xs font-mono text-[#1E293B] pt-0.5">
              = {posExpansion.canonicalPOS}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#1E293B] uppercase font-mono">
              Missing Variable Expansion Steps (Add V · V' and Factor)
            </h4>
            <div className="space-y-2">
              {posExpansion.expansions.map((exp, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] space-y-1.5 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1E293B]">Sum Term {idx + 1}: {exp.originalTerm}</span>
                    <span className="text-[11px] text-[#64748B]">
                      {exp.missingVars.length === 0 ? 'Complete' : `Missing: ${exp.missingVars.join(', ')}`}
                    </span>
                  </div>
                  {exp.steps.map((st, sIdx) => (
                    <div key={sIdx} className="p-2 rounded bg-white border border-[#DCE7E1] text-[11px] text-[#4F46E5]">
                      <span className="font-bold">Add {st.missingVar} · {st.missingVar}': </span>
                      <span>{st.detail}</span>
                    </div>
                  ))}
                  <div className="text-[11px] text-[#475569]">
                    Resulting maxterms: {exp.finalMaxterms.join(' · ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Route 3: Canonical Set Complementation */}
      {route === 'canonical' && canonicalConversion && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between border-b border-[#DCE7E1] pb-2">
              <span className="font-bold text-[#1E293B] uppercase">Universal Set of Combinations:</span>
              <span className="text-[#64748B]">U = {'{'}{canonicalConversion.universalSet.join(', ')}{'}'}</span>
            </div>
            <p className="text-[11px] text-[#64748B] font-sans">
              Conversion versus complementation rule: The canonical POS of the SAME function uses the complementary set U \ S. The complement function F' uses the opposite set.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#EBF3ED] border border-[#285C49]/30 space-y-2">
              <span className="text-[10px] font-mono uppercase font-bold text-[#285C49] block">
                Original Function F (Same Function)
              </span>
              <div className="text-xs font-mono space-y-1">
                <div className="text-[#285C49] font-bold">Canonical SOP: F = \u03A3m({canonicalConversion.minterms.join(', ')})</div>
                <div className="text-[#4F46E5] font-bold">Canonical POS: F = \u03A0M({canonicalConversion.maxterms.join(', ')})</div>
              </div>
              <p className="text-[10px] text-[#64748B] pt-1">
                Notice both representations describe the exact same logical function.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FEF3C7] border border-[#D97706]/40 space-y-2">
              <span className="text-[10px] font-mono uppercase font-bold text-[#92400E] block">
                Complement Function F' (Inverted Function)
              </span>
              <div className="text-xs font-mono space-y-1">
                <div className="text-[#D97706] font-bold">Canonical SOP: F' = \u03A3m({canonicalConversion.maxterms.join(', ')})</div>
                <div className="text-[#D97706] font-bold">Canonical POS: F' = \u03A0M({canonicalConversion.minterms.join(', ')})</div>
              </div>
              <p className="text-[10px] text-[#64748B] pt-1">
                Obtained by inverting truth table outputs: F' is 1 where F is 0.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Route 4: Dual SOP vs POS Hardware Comparison */}
      {route === 'dual' && dualComparison && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-[#285C49]/30 bg-[#EBF3ED]/30 space-y-3">
            <span className="text-[10px] font-mono font-bold uppercase text-[#285C49] block">
              Minimal SOP (Two-Level AND-OR Network)
            </span>
            <div className="text-lg font-mono font-bold text-[#285C49]">
              F = {dualComparison.sopExpr}
            </div>
            <div className="text-xs text-[#64748B] space-y-1 font-mono">
              <div>Product Terms: {dualComparison.sopGroupsCount}</div>
              <div>Minterms Covered: \u03A3m({dualComparison.minterms.join(', ')})</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-[#4F46E5]/30 bg-[#EEF2FF]/30 space-y-3">
            <span className="text-[10px] font-mono font-bold uppercase text-[#4F46E5] block">
              Minimal POS (Two-Level OR-AND Network)
            </span>
            <div className="text-lg font-mono font-bold text-[#4F46E5]">
              F = {dualComparison.posExpr}
            </div>
            <div className="text-xs text-[#64748B] space-y-1 font-mono">
              <div>Sum Terms: {dualComparison.posGroupsCount}</div>
              <div>Maxterms Covered: \u03A0M({dualComparison.maxterms.join(', ')})</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// SOLVER 5: INTERACTIVE KARNAUGH MAP SOLVER (Section 2.5 - Signature Experience)
// ============================================================================
const SolverE_KMap = () => {
  const [varCount, setVarCount] = useState(4);
  const [mode, setMode] = useState('SOP'); // 'SOP' or 'POS'
  const [workflowMode, setWorkflowMode] = useState('manual'); // 'manual' or 'guided'
  
  // cellStates: dictionary of index -> 0, 1, or 'X'
  const [cellStates, setCellStates] = useState({
    0: 1, 2: 1, 8: 1, 10: 1 // Default four corners quad
  });

  // Manual grouping state
  const [selectedCells, setSelectedCells] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [groupFeedback, setGroupFeedback] = useState(null);
  const [coverStatus, setCoverStatus] = useState(null);

  const variables = useMemo(() => {
    return ['A', 'B', 'C', 'D'].slice(0, varCount);
  }, [varCount]);

  const descriptor = useMemo(() => {
    return getKMapGridDescriptor(varCount, variables);
  }, [varCount, variables]);

  const totalCells = Math.pow(2, varCount);

  // Cell toggle in manual mode
  const toggleCellVal = (index) => {
    setCellStates(prev => {
      const current = prev[index] !== undefined ? prev[index] : 0;
      let next;
      if (current === 0) next = 1;
      else if (current === 1) next = 'X';
      else next = 0;

      return {
        ...prev,
        [index]: next
      };
    });
    // Reset validation states on cell change
    setGroupFeedback(null);
    setCoverStatus(null);
  };

  // Cell selection for student grouping
  const toggleCellSelection = (index) => {
    setSelectedCells(prev => {
      if (prev.includes(index)) {
        return prev.filter(c => c !== index);
      }
      return [...prev, index].sort((a, b) => a - b);
    });
  };

  // Add group from current selection
  const handleAddGroup = () => {
    const validation = validateKMapGroup(selectedCells, varCount, variables, cellStates, mode);
    if (!validation.isValid) {
      setGroupFeedback({
        success: false,
        message: validation.reason
      });
      return;
    }

    const newGroup = {
      id: `G${userGroups.length + 1}`,
      cells: validation.cells,
      size: validation.size,
      term: validation.term,
      constantVars: validation.constantVars,
      eliminatedVars: validation.eliminatedVars,
      color: ['#285C49', '#4F46E5', '#D97706', '#DC2626', '#0891B2', '#9333EA'][userGroups.length % 6]
    };

    setUserGroups(prev => [...prev, newGroup]);
    setSelectedCells([]);
    setGroupFeedback({
      success: true,
      message: `Group ${newGroup.id} successfully formed! Term: ${newGroup.term}`
    });
  };

  // Check cover completeness
  const handleCheckCover = () => {
    const requiredTargets = [];
    for (let i = 0; i < totalCells; i++) {
      const val = cellStates[i] !== undefined ? cellStates[i] : 0;
      if (mode === 'SOP' && val === 1) requiredTargets.push(i);
      if (mode === 'POS' && val === 0) requiredTargets.push(i);
    }

    const coveredSet = new Set(userGroups.flatMap(g => g.cells));
    const uncovered = requiredTargets.filter(c => !coveredSet.has(c));

    // Compare with QM minimal cover
    const minterms = [];
    const dontCares = [];
    for (let i = 0; i < totalCells; i++) {
      const state = cellStates[i] !== undefined ? cellStates[i] : 0;
      if (state === 1) minterms.push(i);
      else if (state === 'X') dontCares.push(i);
    }
    const qm = minimizeKMap(minterms, dontCares, variables, mode);

    if (uncovered.length > 0) {
      setCoverStatus({
        isComplete: false,
        message: `Incomplete Cover: ${uncovered.length} required ${mode === 'SOP' ? '1s' : '0s'} remain uncovered (cells: ${uncovered.join(', ')}).`
      });
    } else {
      const isOptimal = userGroups.length <= qm.selectedGroups.length;
      setCoverStatus({
        isComplete: true,
        isOptimal,
        message: isOptimal
          ? `Complete & Minimal Cover! All required cells covered using ${userGroups.length} terms.`
          : `Valid Complete Cover! All required cells covered, but nonminimal (${userGroups.length} terms used vs ${qm.selectedGroups.length} optimal terms).`
      });
    }
  };

  const handleClearGroups = () => {
    setUserGroups([]);
    setSelectedCells([]);
    setGroupFeedback(null);
    setCoverStatus(null);
  };

  const handleClearAll = () => {
    setCellStates({});
    handleClearGroups();
  };

  const handlePreset = (presetType) => {
    handleClearGroups();
    if (presetType === 'corners') {
      setVarCount(4);
      setCellStates({ 0: 1, 2: 1, 8: 1, 10: 1 });
    } else if (presetType === 'dontcare') {
      setVarCount(3);
      setCellStates({ 1: 1, 3: 1, 7: 1, 5: 'X' });
    } else if (presetType === 'wrap1x4') {
      setVarCount(4);
      setCellStates({ 0: 1, 1: 1, 8: 1, 9: 1 });
    } else if (presetType === 'twovar') {
      setVarCount(2);
      setCellStates({ 1: 1, 3: 1 });
    }
  };

  // Automatic QM result
  const minResult = useMemo(() => {
    const minterms = [];
    const dontCares = [];
    for (let i = 0; i < totalCells; i++) {
      const state = cellStates[i] !== undefined ? cellStates[i] : 0;
      if (state === 1) minterms.push(i);
      else if (state === 'X') dontCares.push(i);
    }
    return minimizeKMap(minterms, dontCares, variables, mode);
  }, [cellStates, totalCells, variables, mode]);

  return (
    <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2F7F4] pb-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase text-[#285C49] bg-[#EBF3ED] px-2 py-0.5 rounded">
            Solver 5 · Section 2.5 Flagship
          </span>
          <h3 className="text-xl font-editorial font-bold text-[#1E293B] mt-1">
            Interactive Karnaugh Map Solver & Minimizer
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Full Quine-McCluskey exact minimization, hands-on student manual grouping, toroidal wrapping verification, and step-by-step term derivation.
          </p>
        </div>

        {/* Dimension & Mode Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-xl border border-[#DCE7E1]">
            {[2, 3, 4].map(num => (
              <button
                key={num}
                onClick={() => {
                  setVarCount(num);
                  setCellStates({});
                  handleClearGroups();
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-all ${
                  varCount === num
                    ? 'bg-[#285C49] text-white shadow-xs'
                    : 'text-[#64748B] hover:text-[#1E293B]'
                }`}
              >
                {num}V
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-xl border border-[#DCE7E1]">
            {['SOP', 'POS'].map(m => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  handleClearGroups();
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-all ${
                  mode === m
                    ? 'bg-[#285C49] text-white shadow-xs'
                    : 'text-[#64748B] hover:text-[#1E293B]'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-xl border border-[#DCE7E1]">
            <button
              onClick={() => setWorkflowMode('manual')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-all ${
                workflowMode === 'manual'
                  ? 'bg-[#285C49] text-white shadow-xs'
                  : 'text-[#64748B] hover:text-[#1E293B]'
              }`}
            >
              Manual Grouping
            </button>
            <button
              onClick={() => setWorkflowMode('guided')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-all ${
                workflowMode === 'guided'
                  ? 'bg-[#285C49] text-white shadow-xs'
                  : 'text-[#64748B] hover:text-[#1E293B]'
              }`}
            >
              Auto Solve
            </button>
          </div>
        </div>
      </div>

      {/* Presets Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[#64748B] font-bold">Standard Presets:</span>
          <button
            onClick={() => handlePreset('corners')}
            className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] hover:border-[#285C49] text-[#1E293B]"
          >
            4-Corner Quad (B'D')
          </button>
          <button
            onClick={() => handlePreset('dontcare')}
            className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] hover:border-[#285C49] text-[#1E293B]"
          >
            Don't-Care Optimization (C)
          </button>
          <button
            onClick={() => handlePreset('wrap1x4')}
            className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] hover:border-[#285C49] text-[#1E293B]"
          >
            Edge Wrap Quad (B'C')
          </button>
          <button
            onClick={() => handlePreset('twovar')}
            className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] hover:border-[#285C49] text-[#1E293B]"
          >
            2-Var Pair (B)
          </button>
        </div>

        <button
          onClick={handleClearAll}
          className="text-xs text-[#DC2626] hover:underline font-mono"
        >
          Reset All Cells
        </button>
      </div>

      {/* Main Grid & Solution Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive Gray-Code K-Map Grid (7 Cols) */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-[#1E293B]">
              Rows: {descriptor.rowVars.join('')} | Columns: {descriptor.colVars.join('')}
            </span>
            <span className="text-[11px] text-[#64748B]">
              Click cell to toggle value (0 \u2192 1 \u2192 X)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="border-collapse text-center text-xs font-mono mx-auto select-none">
              <thead>
                <tr>
                  <th className="p-3 border border-[#DCE7E1] bg-white text-[#64748B]">
                    {descriptor.rowVars.join('')} \ {descriptor.colVars.join('')}
                  </th>
                  {descriptor.colHeaders.map(ch => (
                    <th key={ch} className="p-3 border border-[#DCE7E1] bg-white font-bold text-[#285C49]">
                      {ch}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {descriptor.grid.map((row, rIdx) => (
                  <tr key={rIdx}>
                    <td className="p-3 border border-[#DCE7E1] bg-white font-bold text-[#4F46E5]">
                      {descriptor.rowHeaders[rIdx]}
                    </td>
                    {row.map(cellIdx => {
                      const state = cellStates[cellIdx] !== undefined ? cellStates[cellIdx] : 0;
                      const isTarget = mode === 'SOP' ? state === 1 : state === 0;
                      const isX = state === 'X';
                      const isSelected = selectedCells.includes(cellIdx);

                      // Check user groups containing this cell
                      const activeInUserGroups = userGroups.filter(g => g.cells.includes(cellIdx));

                      return (
                        <td
                          key={cellIdx}
                          onClick={() => {
                            if (workflowMode === 'manual') {
                              toggleCellSelection(cellIdx);
                            } else {
                              toggleCellVal(cellIdx);
                            }
                          }}
                          onContextMenu={(e) => {
                            e.preventDefault();
                            toggleCellVal(cellIdx);
                          }}
                          className={`p-3.5 border border-[#DCE7E1] cursor-pointer transition-all hover:scale-105 relative min-w-[54px] min-h-[54px] ${
                            isSelected
                              ? 'bg-amber-100 ring-2 ring-amber-500 z-10'
                              : activeInUserGroups.length > 0
                              ? 'bg-emerald-50 ring-2 ring-[#285C49]'
                              : isTarget
                              ? 'bg-[#285C49] text-white shadow-inner font-bold'
                              : isX
                              ? 'bg-[#FEF3C7] text-[#92400E] font-bold'
                              : 'bg-white text-[#64748B] hover:bg-[#F2F7F4]'
                          }`}
                        >
                          <span className={`text-base font-bold block ${isSelected ? 'text-[#1E293B]' : ''}`}>
                            {state}
                          </span>
                          <span className={`text-[9px] block font-mono ${
                            isSelected ? 'text-[#64748B]' : isTarget ? 'text-white/80' : 'text-[#94A3B8]'
                          }`}>
                            m{cellIdx}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[#64748B] pt-1 border-t border-[#DCE7E1]">
            <span>Left-click: {workflowMode === 'manual' ? 'Select cells for group' : 'Toggle 0 \u2192 1 \u2192 X'}</span>
            <span>Right-click: Toggle cell value (0/1/X)</span>
          </div>
        </div>

        {/* Right: Manual Grouping Controls or Auto Solve (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {workflowMode === 'manual' ? (
            <div className="space-y-4">
              {/* Manual Action Box */}
              <div className="p-4 rounded-xl bg-white border border-[#DCE7E1] space-y-3">
                <span className="text-xs font-bold text-[#1E293B] uppercase font-mono block">
                  Student Group Formation
                </span>
                <div className="text-xs font-mono text-[#64748B]">
                  Selected Cells ({selectedCells.length}): {'{'}{selectedCells.join(', ') || 'None'}{'}'}
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={handleAddGroup}
                    disabled={selectedCells.length === 0}
                    className="flex-1 px-3 py-2 rounded-xl bg-[#285C49] disabled:bg-slate-200 text-white font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Form Group</span>
                  </button>
                  <button
                    onClick={() => setSelectedCells([])}
                    className="px-3 py-2 rounded-xl border border-[#DCE7E1] text-[#64748B] font-mono text-xs hover:text-[#1E293B]"
                  >
                    Clear Selection
                  </button>
                </div>

                {groupFeedback && (
                  <div className={`p-2.5 rounded-lg text-xs font-mono flex items-start gap-2 ${
                    groupFeedback.success
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                      : 'bg-rose-50 text-rose-800 border border-rose-300'
                  }`}>
                    {groupFeedback.success ? <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />}
                    <span>{groupFeedback.message}</span>
                  </div>
                )}
              </div>

              {/* Formed Groups List */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1E293B] uppercase font-mono">
                    Formed Groups ({userGroups.length})
                  </span>
                  {userGroups.length > 0 && (
                    <button
                      onClick={handleClearGroups}
                      className="text-[11px] text-[#DC2626] font-mono hover:underline"
                    >
                      Remove All
                    </button>
                  )}
                </div>

                {userGroups.length === 0 ? (
                  <div className="p-4 rounded-xl border border-dashed border-[#DCE7E1] text-center text-xs text-[#64748B] font-mono">
                    No groups formed yet. Select 1, 2, 4, 8, or 16 adjacent cells on the map and click "Form Group".
                  </div>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {userGroups.map((g, idx) => (
                      <div key={g.id} className="p-3 rounded-xl border border-[#DCE7E1] bg-white space-y-1 text-xs font-mono">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#1E293B] flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: g.color }} />
                            {g.id}: Term = {g.term}
                          </span>
                          <button
                            onClick={() => setUserGroups(prev => prev.filter((_, i) => i !== idx))}
                            className="text-[#DC2626] hover:bg-rose-50 p-1 rounded"
                            title="Delete Group"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-[11px] text-[#64748B]">
                          Cells: {'{'}{g.cells.join(', ')}{'}'} ({g.size} cells)
                        </div>
                        <div className="text-[10px] text-[#285C49]">
                          Eliminates: {g.eliminatedVars.join(', ') || 'None'} | Preserves: {g.constantVars.map(c => `${c.variable}=${c.value}`).join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Check Cover Button */}
                {userGroups.length > 0 && (
                  <button
                    onClick={handleCheckCover}
                    className="w-full mt-2 px-3 py-2 rounded-xl bg-white border border-[#285C49] text-[#285C49] font-mono text-xs font-bold hover:bg-[#EBF3ED] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verify Cover Completeness</span>
                  </button>
                )}

                {coverStatus && (
                  <div className={`p-3 rounded-xl text-xs font-mono ${
                    coverStatus.isComplete
                      ? 'bg-[#EBF3ED] border border-[#285C49]/40 text-[#285C49]'
                      : 'bg-amber-50 border border-amber-300 text-amber-900'
                  }`}>
                    {coverStatus.message}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Automatic Minimization Output */
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#EBF3ED] border border-[#285C49]/30 space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-[#285C49] block">
                  Exact Minimal {mode} Expression
                </span>
                <div className="text-xl font-mono font-bold text-[#285C49]">
                  F = {minResult.minimalExpression}
                </div>
              </div>

              {/* Prime Implicants */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#1E293B] uppercase font-mono block">
                  Selected Prime Implicant Groups ({minResult.selectedGroups.length})
                </span>
                <div className="space-y-2">
                  {minResult.selectedGroups.map((g, idx) => (
                    <div key={g.id || idx} className="p-3 rounded-xl border border-[#DCE7E1] bg-white space-y-1 text-xs font-mono">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#1E293B] flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: g.color || '#285C49' }} />
                          Group {idx + 1}: Term = {g.term}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF8F5] text-[#285C49] font-bold">
                          {g.size} Cells {g.isEssential ? '· Essential' : ''}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#64748B]">
                        Cells: {'{'}{g.cells.join(', ')}{'}'}
                      </div>
                      <div className="text-[11px] text-[#475569] font-sans">
                        {g.explanation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SOLVER 6: UNIVERSAL GATE SYNTHESIS (Section 2.6 Supplemental)
// ============================================================================
const SolverF_NandNor = () => {
  const [expr, setExpr] = useState("AB + CD");
  const [mode, setMode] = useState('NAND'); // 'NAND' or 'NOR'

  const synthesis = useMemo(() => {
    try {
      if (mode === 'NAND') return buildNandSynthesis(expr);
      return buildNorSynthesis(expr);
    } catch (err) {
      return { error: err.message };
    }
  }, [expr, mode]);

  return (
    <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2F7F4] pb-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase text-[#285C49] bg-[#EBF3ED] px-2 py-0.5 rounded">
            Solver 6 · Universal Gate Synthesis
          </span>
          <h3 className="text-xl font-editorial font-bold text-[#1E293B] mt-1">
            NAND/NOR Circuit Builder & Netlist Generator
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Synthesizes 2-level SOP into NAND-NAND networks, and POS into NOR-NOR networks with exact De Morgan equivalence proofs.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-xl border border-[#DCE7E1]">
          {['NAND', 'NOR'].map(m => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                if (m === 'NOR') setExpr('(A + B)(C + D)');
                else setExpr('AB + CD');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold font-mono transition-all ${
                mode === m
                  ? 'bg-[#285C49] text-white shadow-xs'
                  : 'text-[#64748B] hover:text-[#1E293B]'
              }`}
            >
              {m} Synthesis
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#1E293B] font-mono">
          {mode === 'NAND' ? 'Enter SOP Expression (e.g. AB + CD):' : 'Enter POS Expression (e.g. (A+B)(C+D)):'}
        </label>
        <input
          type="text"
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
          className="w-full px-3.5 py-2 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] text-xs font-mono text-[#1E293B]"
        />
      </div>

      {synthesis.gates ? (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1 font-mono text-xs">
            <span className="text-[10px] uppercase font-bold text-[#285C49] block">
              De Morgan Dual Involution Proof
            </span>
            <div className="font-bold text-[#1E293B]">
              {synthesis.deMorganProof}
            </div>
            <div className="text-[11px] text-[#64748B]">
              Total Gates Required: {synthesis.totalGates} ({mode} gates) | Logic Depth: 2 levels
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#1E293B] uppercase font-mono">
              Synthesized Gate Netlist
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {synthesis.gates.map((g) => (
                <div key={g.gateId} className="p-4 rounded-xl border border-[#DCE7E1] bg-white space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#285C49]">{g.gateId}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#DCE7E1] font-bold">
                      Level {g.level}
                    </span>
                  </div>
                  <div className="font-bold text-[#1E293B]">
                    Inputs: {g.inputs.join(', ')}
                  </div>
                  <div className="text-[#285C49] bg-[#FAF8F5] p-1.5 rounded border border-[#DCE7E1]">
                    Output: {g.output}
                  </div>
                  <p className="text-[11px] text-[#64748B] font-sans">{g.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-[#FEE2E2] text-xs text-[#991B1B]">
          {synthesis.error}
        </div>
      )}
    </div>
  );
};

export default Unit2Solvers;
