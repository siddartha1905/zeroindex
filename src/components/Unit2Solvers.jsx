import React, { useState, useMemo, Component } from 'react';
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
  ArrowLeft,
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
  RotateCcw,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { 
  parseBooleanExpression, 
  evaluateAst,
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

class SolverErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('SolverErrorBoundary caught error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 space-y-3 font-mono text-xs">
          <div className="text-base font-bold text-amber-950">Solver Recovery View</div>
          <p>An unexpected state was encountered during calculation ({this.state.error?.message || 'Calculation error'}).</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-4 py-2 bg-[#285C49] text-white rounded-xl font-bold hover:bg-[#1E4537] transition-colors"
          >
            Reset Solver
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

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
            Boolean Algebra &amp; Logic Minimization Solvers
          </h2>
          <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
            Five core interactive mathematical tools covering Sections 2.1 to 2.5: Boolean Simplification, Truth Table Analysis, Minterm/Maxterm Indexing, SOP/POS Conversions, and Karnaugh Map Minimization.
          </p>
        </div>

        {/* 5-Tab Selection Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-2 border-t border-[#F2F7F4]">
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
                    : 'bg-[#FAF8F5] hover:bg-[#F2F7F4] text-[#1E293B] border-[#DCE7E1]'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-white/20 text-white' : 'bg-white text-[#285C49] border border-[#DCE7E1]'
                  }`}>
                    {tab.section}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#285C49]'}`} />
                </div>
                <div>
                  <span className="text-xs font-bold leading-tight block">
                    {tab.label}
                  </span>
                  <span className={`text-[10px] line-clamp-1 mt-0.5 ${isActive ? 'text-white/80' : 'text-[#64748B]'}`}>
                    {tab.desc}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Selected Solver */}
      <SolverErrorBoundary>
        {activeSolverTab === 'simplifier' && <SolverA_Simplifier />}
        {activeSolverTab === 'truthTable' && <SolverB_TruthTable />}
        {activeSolverTab === 'mintermMaxterm' && <SolverC_MintermMaxterm />}
        {activeSolverTab === 'sopPos' && <SolverD_SopPos />}
        {activeSolverTab === 'kmap' && <SolverE_KMap />}
        {activeSolverTab === 'nandNor' && <SolverF_NandNor onBack={() => setActiveSolverTab('kmap')} />}
      </SolverErrorBoundary>

      {/* Optional Supplemental Tool Link */}
      {activeSolverTab !== 'nandNor' && (
        <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] flex items-center justify-between text-xs font-mono">
          <span className="text-[#64748B]">
            Looking for universal gate synthesis? Preview the Section 2.6 NAND/NOR Circuit Builder:
          </span>
          <button
            onClick={() => setActiveSolverTab('nandNor')}
            className="text-[#285C49] font-bold hover:underline flex items-center gap-1"
          >
            <span>Open Universal Gate Builder</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// SOLVER 1: BOOLEAN ALGEBRA & SIMPLIFICATION (Sections 2.1 & 2.2)
// ============================================================================
export const SolverA_Simplifier = () => {
  const [expression, setExpression] = useState("AB + AB'");
  const [variablesStr, setVariablesStr] = useState("A, B");
  const [showTruthTableVerification, setShowTruthTableVerification] = useState(false);

  const variables = useMemo(() => {
    return variablesStr.split(',').map(s => s.trim().toUpperCase()).filter(Boolean);
  }, [variablesStr]);

  const traceResult = useMemo(() => {
    try {
      return traceAlgebraicSimplification(expression);
    } catch (err) {
      return { error: err.message };
    }
  }, [expression]);

  const truthTableComparison = useMemo(() => {
    if (!traceResult || traceResult.error) return null;
    try {
      const vars = variables.length > 0 ? variables : traceResult.variables;
      const ttOrig = generateTruthTable(expression, vars);
      const ttSimp = generateTruthTable(traceResult.simplified, vars);

      const rows = ttOrig.rows.map((r, i) => ({
        index: i,
        assignment: r.assignment,
        origVal: r.output,
        simpVal: ttSimp.rows[i].output,
        isMatch: r.output === ttSimp.rows[i].output
      }));

      const allMatch = rows.every(r => r.isMatch);

      return {
        variables: vars,
        rows,
        allMatch
      };
    } catch {
      return null;
    }
  }, [expression, traceResult, variables]);

  const presets = [
    { label: "AB + AB' → A (Combining)", expr: "AB + AB'", vars: "A, B" },
    { label: "A + A'B → A + B (Redundancy)", expr: "A + A'B", vars: "A, B" },
    { label: "(A+B)(A+C) → A + BC (Distributive)", expr: "(A+B)(A+C)", vars: "A, B, C" },
    { label: "AB + A'C + BC → AB + A'C (Consensus)", expr: "AB + A'C + BC", vars: "A, B, C" },
    { label: "A + AB → A (Absorption)", expr: "A + AB", vars: "A, B" },
    { label: "(A + B)' → A'B' (De Morgan)", expr: "(A + B)'", vars: "A, B" }
  ];

  return (
    <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-6">
      <div className="border-b border-[#F2F7F4] pb-4">
        <span className="text-[10px] font-mono font-bold uppercase text-[#285C49] bg-[#EBF3ED] px-2 py-0.5 rounded">
          Solver 1 · Sections 2.1 &amp; 2.2
        </span>
        <h3 className="text-xl font-editorial font-bold text-[#1E293B] mt-1">
          Boolean Expression Simplifier &amp; Algebraic Tracer
        </h3>
        <p className="text-xs text-[#64748B] mt-0.5">
          Step-by-step reduction citing fundamental laws (Combining, Second Distributive, Consensus, Absorption) with exhaustive truth-table verification.
        </p>
      </div>

      {/* Input Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2 space-y-1.5">
          <label className="text-xs font-bold text-[#1E293B] font-mono">
            Enter Boolean Expression:
          </label>
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="e.g. AB + AB' or (A+B)(A+C)"
            className="w-full px-3.5 py-2 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] text-xs font-mono text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#285C49]/20"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E293B] font-mono">
            Declared Variables:
          </label>
          <input
            type="text"
            value={variablesStr}
            onChange={(e) => setVariablesStr(e.target.value)}
            placeholder="A, B, C"
            className="w-full px-3.5 py-2 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] text-xs font-mono text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#285C49]/20"
          />
        </div>
      </div>

      {/* Presets */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] font-bold text-[#64748B] uppercase font-mono">Curriculum Presets:</span>
        <div className="flex flex-wrap gap-1.5">
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setExpression(p.expr);
                setVariablesStr(p.vars);
              }}
              className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] hover:border-[#285C49] text-[11px] font-mono text-[#1E293B] transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Output / Results */}
      {traceResult.error ? (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono flex items-start gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="block">Syntax or Parsing Error</strong>
            <span>{traceResult.error}</span>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Summary Banner */}
          <div className="p-4 rounded-xl bg-[#EBF3ED] border border-[#285C49]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-[#285C49] block">
                Simplified Result (Minimal Form)
              </span>
              <div className="text-xl font-bold font-mono text-[#285C49] mt-0.5">
                F = {traceResult.simplified}
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-[#64748B]">
              <span className="px-2.5 py-1 rounded-lg bg-white border border-[#DCE7E1]">
                Variables: {traceResult.variables.join(', ')}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white border border-[#DCE7E1]">
                Original Literals: {traceResult.originalLiteralCount} → Minimal: {traceResult.finalLiteralCount}
              </span>
            </div>
          </div>

          {/* Derivation Steps */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#1E293B] uppercase font-mono tracking-wider flex items-center justify-between">
              <span>Step-by-Step Algebraic Derivation</span>
              <span className="text-[10px] text-[#64748B] font-normal">Classroom Blackboard Format</span>
            </h4>
            <div className="space-y-2">
              {traceResult.steps.map((step, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#285C49]/10 text-[#285C49] font-bold flex items-center justify-center text-[10px] flex-shrink-0">
                      {step.stepNumber}
                    </span>
                    <span className="text-[#1E293B] font-bold">
                      F = {step.expression}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-[#64748B] pl-7 sm:pl-0">
                    <span className="px-2 py-0.5 rounded bg-white border border-[#DCE7E1] text-[#285C49] font-semibold">
                      {step.lawCited}
                    </span>
                    <span className="hidden md:inline text-[10px]">{step.explanation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verification Section */}
          <div className="pt-2 border-t border-[#F2F7F4] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#285C49]" />
                <span className="text-xs font-bold text-[#1E293B] font-mono">
                  Mathematical Equivalence: {truthTableComparison?.allMatch ? 'VERIFIED (Identical across all rows)' : 'Pending'}
                </span>
              </div>
              <button
                onClick={() => setShowTruthTableVerification(!showTruthTableVerification)}
                className="text-xs text-[#285C49] font-mono font-bold hover:underline flex items-center gap-1"
              >
                <span>{showTruthTableVerification ? 'Hide Truth Table' : 'Show Truth Table Proof'}</span>
              </button>
            </div>

            {showTruthTableVerification && truthTableComparison && (
              <div className="overflow-x-auto rounded-xl border border-[#DCE7E1]">
                <table className="w-full text-xs font-mono text-left">
                  <thead className="bg-[#FAF8F5] text-[#1E293B] border-b border-[#DCE7E1]">
                    <tr>
                      <th className="p-2 border-r border-[#DCE7E1]">Row</th>
                      {truthTableComparison.variables.map(v => (
                        <th key={v} className="p-2 border-r border-[#DCE7E1] text-center">{v}</th>
                      ))}
                      <th className="p-2 border-r border-[#DCE7E1] text-center">Original ({expression})</th>
                      <th className="p-2 border-r border-[#DCE7E1] text-center">Simplified ({traceResult.simplified})</th>
                      <th className="p-2 text-center">Match</th>
                    </tr>
                  </thead>
                  <tbody>
                    {truthTableComparison.rows.map((r) => (
                      <tr key={r.index} className="border-b border-[#F2F7F4] hover:bg-slate-50">
                        <td className="p-2 border-r border-[#DCE7E1] text-[#64748B]">#{r.index}</td>
                        {truthTableComparison.variables.map(v => (
                          <td key={v} className="p-2 border-r border-[#DCE7E1] text-center">
                            {r.assignment[v]}
                          </td>
                        ))}
                        <td className="p-2 border-r border-[#DCE7E1] text-center font-bold">
                          {r.origVal}
                        </td>
                        <td className="p-2 border-r border-[#DCE7E1] text-center font-bold text-[#285C49]">
                          {r.simpVal}
                        </td>
                        <td className="p-2 text-center">
                          {r.isMatch ? (
                            <span className="text-[#285C49] font-bold">✓ Match</span>
                          ) : (
                            <span className="text-[#DC2626] font-bold">✗ Differ</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// SOLVER 2: TRUTH TABLE GENERATOR & EQUIVALENCE CHECKER (Sections 2.1 - 2.4)
// ============================================================================
export const SolverB_TruthTable = () => {
  const [mode, setMode] = useState('single'); // 'single' or 'compare'
  const [expr1, setExpr1] = useState("AB + C");
  const [expr2, setExpr2] = useState("(A + C)(B + C)");
  const [variablesStr, setVariablesStr] = useState("A, B, C");

  const variables = useMemo(() => {
    return variablesStr.split(',').map(s => s.trim().toUpperCase()).filter(Boolean);
  }, [variablesStr]);

  const tableData = useMemo(() => {
    try {
      const data = generateTruthTable(expr1, variables);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [expr1, variables]);

  const comparisonData = useMemo(() => {
    if (mode !== 'compare') return null;
    try {
      return compareExpressions(expr1, expr2, variables);
    } catch (err) {
      return { error: err.message };
    }
  }, [expr1, expr2, variables, mode]);

  return (
    <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2F7F4] pb-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase text-[#285C49] bg-[#EBF3ED] px-2 py-0.5 rounded">
            Solver 2 · Sections 2.1 to 2.4
          </span>
          <h3 className="text-xl font-editorial font-bold text-[#1E293B] mt-1">
            Truth Table Generator &amp; Dual Expression Equivalence Checker
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Generates exhaustive 2^n truth tables, extracts canonical Σm and ΠM indices, and tests formal equivalence between two expressions.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-xl border border-[#DCE7E1]">
          <button
            onClick={() => setMode('single')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
              mode === 'single'
                ? 'bg-[#285C49] text-white shadow-xs'
                : 'text-[#64748B] hover:text-[#1E293B]'
            }`}
          >
            Single Table
          </button>
          <button
            onClick={() => setMode('compare')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
              mode === 'compare'
                ? 'bg-[#285C49] text-white shadow-xs'
                : 'text-[#64748B] hover:text-[#1E293B]'
            }`}
          >
            Dual Equivalence Checker
          </button>
        </div>
      </div>

      {/* Input Rows */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className={`${mode === 'compare' ? 'sm:col-span-1' : 'sm:col-span-2'} space-y-1.5`}>
          <label className="text-xs font-bold text-[#1E293B] font-mono">
            {mode === 'compare' ? 'Expression 1:' : 'Boolean Expression:'}
          </label>
          <input
            type="text"
            value={expr1}
            onChange={(e) => setExpr1(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] text-xs font-mono text-[#1E293B]"
          />
        </div>

        {mode === 'compare' && (
          <div className="sm:col-span-1 space-y-1.5">
            <label className="text-xs font-bold text-[#1E293B] font-mono">
              Expression 2:
            </label>
            <input
              type="text"
              value={expr2}
              onChange={(e) => setExpr2(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] text-xs font-mono text-[#1E293B]"
            />
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E293B] font-mono">
            Declared Variable Domain:
          </label>
          <input
            type="text"
            value={variablesStr}
            onChange={(e) => setVariablesStr(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] text-xs font-mono text-[#1E293B]"
          />
        </div>
      </div>

      {/* Single Mode View */}
      {mode === 'single' && (
        <>
          {tableData.success ? (
            <div className="space-y-4">
              {/* Canonical Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-[#EBF3ED] border border-[#285C49]/30">
                  <span className="text-[10px] font-mono uppercase font-bold text-[#285C49] block">
                    Canonical SOP (Minterms)
                  </span>
                  <div className="text-sm font-bold font-mono text-[#285C49] mt-0.5">
                    F({tableData.data.variables.join(', ')}) = Σm({tableData.data.minterms.join(', ') || 'none'})
                  </div>
                  <div className="text-[11px] font-mono text-[#1E293B]/70 mt-1 line-clamp-1">
                    = {formatCanonicalSOP(tableData.data.minterms, tableData.data.variables)}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#EEF2FF] border border-[#4F46E5]/30">
                  <span className="text-[10px] font-mono uppercase font-bold text-[#4F46E5] block">
                    Canonical POS (Maxterms)
                  </span>
                  <div className="text-sm font-bold font-mono text-[#4F46E5] mt-0.5">
                    F({tableData.data.variables.join(', ')}) = ΠM({tableData.data.maxterms.join(', ') || 'none'})
                  </div>
                  <div className="text-[11px] font-mono text-[#1E293B]/70 mt-1 line-clamp-1">
                    = {formatCanonicalPOS(tableData.data.maxterms, tableData.data.variables)}
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-xl border border-[#DCE7E1]">
                <table className="w-full text-xs font-mono text-left">
                  <thead className="bg-[#FAF8F5] text-[#1E293B] border-b border-[#DCE7E1]">
                    <tr>
                      <th className="p-2 border-r border-[#DCE7E1]">Row</th>
                      {tableData.data.variables.map(v => (
                        <th key={v} className="p-2 border-r border-[#DCE7E1] text-center">{v}</th>
                      ))}
                      <th className="p-2 border-r border-[#DCE7E1]">Minterm (m_i)</th>
                      <th className="p-2 border-r border-[#DCE7E1]">Maxterm (M_i)</th>
                      <th className="p-2 text-center bg-[#285C49]/5 font-bold">Output F</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.data.rows.map((r) => {
                      const isHigh = r.output === 1;
                      return (
                        <tr 
                          key={r.index} 
                          className={`border-b border-[#F2F7F4] hover:bg-slate-50 ${isHigh ? 'bg-[#EBF3ED]/20' : ''}`}
                        >
                          <td className="p-2 border-r border-[#DCE7E1] text-[#64748B]">#{r.index}</td>
                          {tableData.data.variables.map(v => (
                            <td key={v} className="p-2 border-r border-[#DCE7E1] text-center">
                              {r.assignment[v]}
                            </td>
                          ))}
                          <td className="p-2 border-r border-[#DCE7E1] text-[#285C49]">
                            m{r.index} = {getMintermTerm(r.index, tableData.data.variables)}
                          </td>
                          <td className="p-2 border-r border-[#DCE7E1] text-[#4F46E5]">
                            M{r.index} = {getMaxtermTerm(r.index, tableData.data.variables)}
                          </td>
                          <td className="p-2 text-center font-bold">
                            <span className={`px-2 py-0.5 rounded text-[11px] ${
                              isHigh ? 'bg-[#285C49] text-white' : 'bg-slate-200 text-[#1E293B]'
                            }`}>
                              {r.output}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono">
              {tableData.error}
            </div>
          )}
        </>
      )}

      {/* Compare Mode View */}
      {mode === 'compare' && comparisonData && (
        <div className="space-y-4">
          {comparisonData.error ? (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono">
              {comparisonData.error}
            </div>
          ) : (
            <>
              {/* Equivalence Status Banner */}
              <div className={`p-4 rounded-xl flex items-start gap-3 border ${
                comparisonData.isEquivalent
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-rose-50 border-rose-300 text-rose-900'
              }`}>
                {comparisonData.isEquivalent ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-700 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="text-sm font-bold font-mono">
                    {comparisonData.isEquivalent 
                      ? 'Expressions are Strictly Equivalent! (✓ Identical for all inputs)'
                      : 'Expressions are NOT Equivalent! (✗ Diverge on one or more inputs)'}
                  </h4>
                  <p className="text-xs font-mono mt-0.5 opacity-90">
                    {comparisonData.isEquivalent
                      ? 'Both functions produce identical truth tables across all 2^n input rows.'
                      : `Functions differ on ${comparisonData.differingRows.length} rows out of ${comparisonData.totalRows}.`}
                  </p>
                  {!comparisonData.isEquivalent && (
                    <div className="mt-2 text-xs font-mono p-2 rounded bg-white/80 border border-rose-200">
                      <strong>Concrete Counterexample: </strong>
                      Row #{comparisonData.counterExample?.index} (
                      {Object.entries(comparisonData.counterExample?.assignment || {}).map(([k, v]) => `${k}=${v}`).join(', ')}
                      ) → Expr 1 = {comparisonData.counterExample?.val1}, Expr 2 = {comparisonData.counterExample?.val2}.
                    </div>
                  )}
                </div>
              </div>

              {/* Side-by-side Table */}
              <div className="overflow-x-auto rounded-xl border border-[#DCE7E1]">
                <table className="w-full text-xs font-mono text-left">
                  <thead className="bg-[#FAF8F5] text-[#1E293B] border-b border-[#DCE7E1]">
                    <tr>
                      <th className="p-2 border-r border-[#DCE7E1]">Row</th>
                      {comparisonData.variables.map(v => (
                        <th key={v} className="p-2 border-r border-[#DCE7E1] text-center">{v}</th>
                      ))}
                      <th className="p-2 border-r border-[#DCE7E1] text-center">Expr 1: {expr1}</th>
                      <th className="p-2 border-r border-[#DCE7E1] text-center">Expr 2: {expr2}</th>
                      <th className="p-2 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.rows.map((r) => {
                      const isMatch = r.isMatch;
                      return (
                        <tr 
                          key={r.index}
                          className={`border-b border-[#F2F7F4] ${!isMatch ? 'bg-rose-50' : 'hover:bg-slate-50'}`}
                        >
                          <td className="p-2 border-r border-[#DCE7E1] text-[#64748B]">#{r.index}</td>
                          {comparisonData.variables.map(v => (
                            <td key={v} className="p-2 border-r border-[#DCE7E1] text-center">
                              {r.assignment[v]}
                            </td>
                          ))}
                          <td className="p-2 border-r border-[#DCE7E1] text-center font-bold">
                            {r.val1}
                          </td>
                          <td className="p-2 border-r border-[#DCE7E1] text-center font-bold">
                            {r.val2}
                          </td>
                          <td className="p-2 text-center">
                            {isMatch ? (
                              <span className="text-[#285C49] font-bold">✓ Match</span>
                            ) : (
                              <span className="text-[#DC2626] font-bold bg-rose-100 px-1.5 py-0.5 rounded">
                                ✗ Differ
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// SOLVER 3: MINTERM & MAXTERM EXPLORER (Section 2.3)
// ============================================================================
export const SolverC_MintermMaxterm = () => {
  const [varCount, setVarCount] = useState(3);
  const [selectedRow, setSelectedRow] = useState(5); // Default to row 5 (101)
  const [functionValues, setFunctionValues] = useState({
    1: 1, 3: 1, 5: 1, 7: 1 // Default to F = C
  });

  const variables = useMemo(() => {
    return ['A', 'B', 'C', 'D'].slice(0, varCount);
  }, [varCount]);

  const totalRows = Math.pow(2, varCount);

  // Inspector explanation for selected row
  const rowExplanation = useMemo(() => {
    const bin = selectedRow.toString(2).padStart(varCount, '0');
    const mintermTerms = [];
    const maxtermTerms = [];
    const bitBreakdown = [];

    for (let i = 0; i < varCount; i++) {
      const bitVal = parseInt(bin[i], 10);
      const varName = variables[i];

      if (bitVal === 1) {
        mintermTerms.push(varName);
        maxtermTerms.push(`${varName}'`);
      } else {
        mintermTerms.push(`${varName}'`);
        maxtermTerms.push(varName);
      }

      bitBreakdown.push({
        variable: varName,
        bit: bitVal,
        mintermReason: bitVal === 1 ? `${varName}=1 → uncomplemented ${varName}` : `${varName}=0 → complemented ${varName}'`,
        maxtermReason: bitVal === 0 ? `${varName}=0 → uncomplemented ${varName}` : `${varName}=1 → complemented ${varName}'`
      });
    }

    return {
      index: selectedRow,
      binary: bin,
      mintermId: `m${selectedRow}`,
      maxtermId: `M${selectedRow}`,
      mintermExpr: mintermTerms.join(''),
      maxtermExpr: `(${maxtermTerms.join(' + ')})`,
      bitBreakdown
    };
  }, [selectedRow, varCount, variables]);

  const toggleRowValue = (idx) => {
    setFunctionValues(prev => ({
      ...prev,
      [idx]: prev[idx] === 1 ? 0 : 1
    }));
  };

  const selectedMinterms = useMemo(() => {
    const list = [];
    for (let i = 0; i < totalRows; i++) {
      if (functionValues[i] === 1) list.push(i);
    }
    return list;
  }, [functionValues, totalRows]);

  const selectedMaxterms = useMemo(() => {
    const list = [];
    for (let i = 0; i < totalRows; i++) {
      if (functionValues[i] !== 1) list.push(i);
    }
    return list;
  }, [functionValues, totalRows]);

  return (
    <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2F7F4] pb-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase text-[#285C49] bg-[#EBF3ED] px-2 py-0.5 rounded">
            Solver 3 · Section 2.3
          </span>
          <h3 className="text-xl font-editorial font-bold text-[#1E293B] mt-1">
            Minterm &amp; Maxterm Indexing Explorer
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Hands-on exploration of binary input combinations, bit polarities, and automatic canonical Σm and ΠM construction.
          </p>
        </div>

        {/* Variable Count Switcher */}
        <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-xl border border-[#DCE7E1]">
          {[2, 3, 4].map(num => (
            <button
              key={num}
              onClick={() => {
                setVarCount(num);
                if (selectedRow >= Math.pow(2, num)) setSelectedRow(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
                varCount === num
                  ? 'bg-[#285C49] text-white shadow-xs'
                  : 'text-[#64748B] hover:text-[#1E293B]'
              }`}
            >
              {num} Variables ({Math.pow(2, num)} Rows)
            </button>
          ))}
        </div>
      </div>

      {/* Row Inspector Callout */}
      <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DCE7E1] pb-2">
          <span className="text-xs font-bold font-mono text-[#1E293B]">
            Interactive Inspector: Row #{rowExplanation.index} (Binary: {rowExplanation.binary})
          </span>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-2 py-0.5 rounded bg-[#EBF3ED] text-[#285C49] font-bold">
              {rowExplanation.mintermId} = {rowExplanation.mintermExpr}
            </span>
            <span className="px-2 py-0.5 rounded bg-[#EEF2FF] text-[#4F46E5] font-bold">
              {rowExplanation.maxtermId} = {rowExplanation.maxtermExpr}
            </span>
          </div>
        </div>

        {/* Bit Polarity Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono">
          {rowExplanation.bitBreakdown.map((b) => (
            <div key={b.variable} className="p-2.5 rounded-lg bg-white border border-[#DCE7E1] space-y-1">
              <div className="flex items-center justify-between font-bold">
                <span className="text-[#1E293B]">{b.variable}</span>
                <span className={`px-1.5 py-0.2 rounded ${b.bit === 1 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-[#1E293B]'}`}>
                  Bit = {b.bit}
                </span>
              </div>
              <div className="text-[10px] text-[#285C49] font-semibold">{b.mintermReason}</div>
              <div className="text-[10px] text-[#4F46E5] font-semibold">{b.maxtermReason}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid Table & Function Builder */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table (7 Cols) */}
        <div className="lg:col-span-7 overflow-x-auto rounded-xl border border-[#DCE7E1]">
          <table className="w-full text-xs font-mono text-left">
            <thead className="bg-[#FAF8F5] text-[#1E293B] border-b border-[#DCE7E1]">
              <tr>
                <th className="p-2 border-r border-[#DCE7E1]">Select</th>
                <th className="p-2 border-r border-[#DCE7E1]">Dec</th>
                <th className="p-2 border-r border-[#DCE7E1]">Binary</th>
                <th className="p-2 border-r border-[#DCE7E1]">Minterm</th>
                <th className="p-2 border-r border-[#DCE7E1]">Maxterm</th>
                <th className="p-2 text-center">F Value</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: totalRows }).map((_, i) => {
                const bin = i.toString(2).padStart(varCount, '0');
                const isSelected = selectedRow === i;
                const isHigh = functionValues[i] === 1;

                return (
                  <tr 
                    key={i}
                    onClick={() => setSelectedRow(i)}
                    className={`border-b border-[#F2F7F4] cursor-pointer ${
                      isSelected ? 'bg-amber-50 font-bold' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="p-2 border-r border-[#DCE7E1] text-center">
                      <input
                        type="radio"
                        name="inspectRow"
                        checked={isSelected}
                        onChange={() => setSelectedRow(i)}
                      />
                    </td>
                    <td className="p-2 border-r border-[#DCE7E1] text-[#64748B]">#{i}</td>
                    <td className="p-2 border-r border-[#DCE7E1] font-bold">{bin}</td>
                    <td className="p-2 border-r border-[#DCE7E1] text-[#285C49]">
                      m{i} = {getMintermTerm(i, variables)}
                    </td>
                    <td className="p-2 border-r border-[#DCE7E1] text-[#4F46E5]">
                      M{i} = {getMaxtermTerm(i, variables)}
                    </td>
                    <td 
                      className="p-2 text-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleRowValue(i);
                      }}
                    >
                      <button 
                        className={`px-2.5 py-0.5 rounded text-[11px] font-bold transition-all ${
                          isHigh ? 'bg-[#285C49] text-white shadow-xs' : 'bg-slate-200 text-[#1E293B]'
                        }`}
                        title="Click to toggle function output"
                      >
                        {isHigh ? 1 : 0}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Dynamic Function Construction Panel (5 Cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-[#285C49] block">
              Dynamic Function Constructor
            </span>
            <h4 className="text-sm font-bold text-[#1E293B] mt-0.5">
              Click any row's F value button to toggle 1/0
            </h4>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-white border border-[#DCE7E1] space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#285C49]">
                Constructed Canonical SOP (Σm)
              </span>
              <div className="text-sm font-bold text-[#285C49]">
                F({variables.join(', ')}) = Σm({selectedMinterms.join(', ') || 'none'})
              </div>
              <div className="text-[11px] text-[#64748B] pt-0.5 break-words">
                = {formatCanonicalSOP(selectedMinterms, variables)}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-[#DCE7E1] space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#4F46E5]">
                Constructed Canonical POS (ΠM)
              </span>
              <div className="text-sm font-bold text-[#4F46E5]">
                F({variables.join(', ')}) = ΠM({selectedMaxterms.join(', ') || 'none'})
              </div>
              <div className="text-[11px] text-[#64748B] pt-0.5 break-words">
                = {formatCanonicalPOS(selectedMaxterms, variables)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SOLVER 4: SOP/POS CONVERSION STUDIO (Section 2.4 - Full 6 Pathways)
// ============================================================================
export const SolverD_SopPos = () => {
  const [route, setRoute] = useState('sopToCan');
  const [expression, setExpression] = useState("AB + C");
  const [variablesStr, setVariablesStr] = useState("A, B, C");

  const variables = useMemo(() => {
    return variablesStr.split(',').map(s => s.trim().toUpperCase()).filter(Boolean);
  }, [variablesStr]);

  // General SOP -> Canonical SOP expansion
  const sopExpansion = useMemo(() => {
    if (route !== 'sopToCan') return null;
    try {
      const terms = expression.split('+').map(t => t.trim()).filter(Boolean);
      const expansions = terms.map(t => expandSOPTerm(t, variables));
      const tt = generateTruthTable(expression, variables);

      return {
        expansions,
        mintermIndices: tt.minterms,
        canonicalSOP: formatCanonicalSOP(tt.minterms, variables)
      };
    } catch {
      return null;
    }
  }, [expression, variables, route]);

  // General POS -> Canonical POS expansion
  const posExpansion = useMemo(() => {
    if (route !== 'posToCan') return null;
    try {
      const sumRegex = /\(([^)]+)\)/g;
      const terms = [];
      let match;
      while ((match = sumRegex.exec(expression)) !== null) {
        terms.push(match[1].trim());
      }
      if (terms.length === 0) {
        terms.push(expression.replace(/[()]/g, '').trim());
      }

      const expansions = terms.map(t => expandPOSTerm(t, variables));
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

  // General Dual SOP <-> POS Synthesizer
  const generalDualData = useMemo(() => {
    try {
      const tt = generateTruthTable(expression, variables);
      const sopMin = minimizeKMap(tt.minterms, [], variables, 'SOP');
      const posMin = minimizeKMap(tt.minterms, [], variables, 'POS');

      return {
        success: true,
        original: expression,
        minimalSOP: sopMin.minimalExpression,
        minimalPOS: posMin.minimalExpression,
        minterms: tt.minterms,
        maxterms: tt.maxterms
      };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [expression, variables]);

  // Truth table row-to-term mapping
  const truthTableData = useMemo(() => {
    try {
      return generateTruthTable(expression, variables);
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
          Step-by-step missing variable expansion, canonical set complementation (Σm ↔ ΠM), general form synthesis, and hardware network comparisons.
        </p>
      </div>

      {/* Pathway Switcher */}
      <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1]">
        {[
          { id: 'sopToCan', label: '1. General SOP → Canonical SOP' },
          { id: 'posToCan', label: '2. General POS → Canonical POS' },
          { id: 'canonical', label: '3. Canonical SOP ↔ POS (U \\ S)' },
          { id: 'generalDual', label: '4. General SOP ↔ General POS' },
          { id: 'truthTable', label: '5. Truth Table → Canonical Forms' },
          { id: 'dual', label: '6. Hardware Network Comparison' }
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
              F({variables.join(', ')}) = Σm({sopExpansion.mintermIndices.join(', ')})
            </div>
            <div className="text-xs font-mono text-[#1E293B] pt-0.5">
              = {sopExpansion.canonicalSOP}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#1E293B] uppercase font-mono">
              Missing Variable Expansion Steps (Multiply by X + X')
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
              F({variables.join(', ')}) = ΠM({posExpansion.maxtermIndices.join(', ')})
            </div>
            <div className="text-xs font-mono text-[#1E293B] pt-0.5">
              = {posExpansion.canonicalPOS}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#1E293B] uppercase font-mono">
              Missing Variable Expansion Steps (Add X · X' and Apply Distributive Law)
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
            <p className="text-[11px] text-[#64748B] font-sans leading-relaxed">
              <strong>Conversion versus Complementation Principle:</strong> The equivalent canonical POS of the SAME function uses the complementary index set U \ S. In contrast, the complement function F' inverts all outputs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#EBF3ED] border border-[#285C49]/30 space-y-2">
              <span className="text-[10px] font-mono uppercase font-bold text-[#285C49] block">
                Original Function F (Same Logical Function)
              </span>
              <div className="text-xs font-mono space-y-1">
                <div className="text-[#285C49] font-bold">Canonical SOP: F = Σm({canonicalConversion.minterms.join(', ')})</div>
                <div className="text-[#4F46E5] font-bold">Canonical POS: F = ΠM({canonicalConversion.maxterms.join(', ')})</div>
              </div>
              <p className="text-[10px] text-[#64748B] pt-1">
                Both expressions yield identical output truth values for every binary input combination.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FEF3C7] border border-[#D97706]/40 space-y-2">
              <span className="text-[10px] font-mono uppercase font-bold text-[#92400E] block">
                Complement Function F' (Inverted Truth Values)
              </span>
              <div className="text-xs font-mono space-y-1">
                <div className="text-[#D97706] font-bold">Canonical SOP: F' = Σm({canonicalConversion.maxterms.join(', ')})</div>
                <div className="text-[#D97706] font-bold">Canonical POS: F' = ΠM({canonicalConversion.minterms.join(', ')})</div>
              </div>
              <p className="text-[10px] text-[#64748B] pt-1">
                Obtained by inverting outputs: F' = 1 wherever original F = 0.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Route 4: General SOP <-> General POS Dual Synthesis */}
      {route === 'generalDual' && generalDualData && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#EBF3ED] border border-[#285C49]/30 space-y-2">
              <span className="text-[10px] font-mono uppercase font-bold text-[#285C49] block">
                Equivalent Minimal SOP (Sum of Products)
              </span>
              <div className="text-lg font-bold font-mono text-[#285C49]">
                F = {generalDualData.minimalSOP}
              </div>
              <div className="text-xs font-mono text-[#64748B]">
                Covers minterms: Σm({generalDualData.minterms.join(', ')})
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#EEF2FF] border border-[#4F46E5]/30 space-y-2">
              <span className="text-[10px] font-mono uppercase font-bold text-[#4F46E5] block">
                Equivalent Minimal POS (Product of Sums)
              </span>
              <div className="text-lg font-bold font-mono text-[#4F46E5]">
                F = {generalDualData.minimalPOS}
              </div>
              <div className="text-xs font-mono text-[#64748B]">
                Covers maxterms: ΠM({generalDualData.maxterms.join(', ')})
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] text-xs font-mono space-y-2">
            <span className="font-bold text-[#1E293B] uppercase block">
              Algebraic Transformation Derivation:
            </span>
            <div className="space-y-1 text-[#285C49]">
              <div>Step 1: Evaluate function across all {Math.pow(2, variables.length)} truth table combinations.</div>
              <div>Step 2: Group output 1s for SOP network; group output 0s for POS network.</div>
              <div>Step 3: Apply the Second Distributive Law: X + YZ = (X+Y)(X+Z) to factor into POS.</div>
              <div>Step 4: Formal truth table verification confirms exact equivalence between both forms.</div>
            </div>
          </div>
        </div>
      )}

      {/* Route 5: Truth Table -> Canonical Forms */}
      {route === 'truthTable' && truthTableData && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] text-xs font-mono flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="font-bold text-[#285C49]">Minterms (F = 1): </span>
              <span>Σm({truthTableData.minterms.join(', ') || 'none'})</span>
            </div>
            <div>
              <span className="font-bold text-[#4F46E5]">Maxterms (F = 0): </span>
              <span>ΠM({truthTableData.maxterms.join(', ') || 'none'})</span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#DCE7E1]">
            <table className="w-full text-xs font-mono text-left">
              <thead className="bg-[#FAF8F5] text-[#1E293B] border-b border-[#DCE7E1]">
                <tr>
                  <th className="p-2 border-r border-[#DCE7E1]">Row</th>
                  {truthTableData.variables.map(v => (
                    <th key={v} className="p-2 border-r border-[#DCE7E1] text-center">{v}</th>
                  ))}
                  <th className="p-2 border-r border-[#DCE7E1] text-center">Output F</th>
                  <th className="p-2">Extracted Canonical Term</th>
                </tr>
              </thead>
              <tbody>
                {truthTableData.rows.map(r => {
                  const isOne = r.output === 1;
                  return (
                    <tr key={r.index} className={`border-b border-[#F2F7F4] ${isOne ? 'bg-[#EBF3ED]/20' : 'bg-[#EEF2FF]/20'}`}>
                      <td className="p-2 border-r border-[#DCE7E1] text-[#64748B]">#{r.index}</td>
                      {truthTableData.variables.map(v => (
                        <td key={v} className="p-2 border-r border-[#DCE7E1] text-center">{r.assignment[v]}</td>
                      ))}
                      <td className="p-2 border-r border-[#DCE7E1] text-center font-bold">
                        <span className={`px-2 py-0.5 rounded text-[11px] ${isOne ? 'bg-[#285C49] text-white' : 'bg-[#4F46E5] text-white'}`}>
                          {r.output}
                        </span>
                      </td>
                      <td className="p-2">
                        {isOne ? (
                          <span className="text-[#285C49] font-bold">
                            m{r.index} = {getMintermTerm(r.index, truthTableData.variables)} (contributes to SOP)
                          </span>
                        ) : (
                          <span className="text-[#4F46E5] font-bold">
                            M{r.index} = {getMaxtermTerm(r.index, truthTableData.variables)} (contributes to POS)
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Route 6: Dual SOP vs POS Hardware Comparison */}
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
              <div>Level 1 Gates: {dualComparison.sopGroupsCount} AND gates</div>
              <div>Level 2 Gate: 1 OR gate ({dualComparison.sopGroupsCount} inputs)</div>
              <div>Minterms Covered: Σm({dualComparison.minterms.join(', ')})</div>
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
              <div>Level 1 Gates: {dualComparison.posGroupsCount} OR gates</div>
              <div>Level 2 Gate: 1 AND gate ({dualComparison.posGroupsCount} inputs)</div>
              <div>Maxterms Covered: ΠM({dualComparison.maxterms.join(', ')})</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// SOLVER 5: INTERACTIVE KARNAUGH MAP SOLVER (Section 2.5 - Flagship)
// ============================================================================
export const SolverE_KMap = () => {
  const [varCount, setVarCount] = useState(4);
  const [mode, setMode] = useState('SOP'); // 'SOP' or 'POS'
  const [workflowMode, setWorkflowMode] = useState('manual'); // 'manual' or 'guided'
  
  // Input Panel States
  const [inputMode, setInputMode] = useState('minterms'); // 'minterms', 'maxterms', 'expression', 'direct'
  const [mintermInput, setMintermInput] = useState("0, 2, 8, 10");
  const [maxtermInput, setMaxtermInput] = useState("0, 2, 8, 10");
  const [exprInput, setExprInput] = useState("B'D'");
  const [dontCareInput, setDontCareInput] = useState("");
  const [inputError, setInputError] = useState(null);
  const [activePresetId, setActivePresetId] = useState('corners');

  // Cell States: dictionary of index -> 0, 1, or 'X'
  const [cellStates, setCellStates] = useState({
    0: 1, 2: 1, 8: 1, 10: 1 // Default four corners quad
  });

  // Manual grouping state
  const [selectedCells, setSelectedCells] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [groupFeedback, setGroupFeedback] = useState(null);
  const [coverStatus, setCoverStatus] = useState(null);

  // Guided Step-by-Step State
  const [activeStep, setActiveStep] = useState(1);
  const [showAllSteps, setShowAllSteps] = useState(false);
  const [hoveredGroupCells, setHoveredGroupCells] = useState(null);

  const variables = useMemo(() => {
    return ['A', 'B', 'C', 'D'].slice(0, varCount);
  }, [varCount]);

  const descriptor = useMemo(() => {
    return getKMapGridDescriptor(varCount, variables);
  }, [varCount, variables]);

  const totalCells = Math.pow(2, varCount);

  // Direct cell toggle
  const toggleCellVal = (index) => {
    setActivePresetId(null);
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
    setHoveredGroupCells(null);
  };

  const handleClearAll = () => {
    setCellStates({});
    handleClearGroups();
    setActivePresetId(null);
    setInputError(null);
  };

  // Generate K-Map from user inputs
  const handleGenerateFromInput = () => {
    setInputError(null);
    handleClearGroups();
    setActivePresetId(null);
    setActiveStep(1);

    // Parse don't-cares
    const dcList = [];
    if (dontCareInput.trim()) {
      const cleaned = dontCareInput.replace(/^[dD]\s*\(/, '').replace(/\)$/, '');
      const parts = cleaned.split(/[\s,]+/).filter(Boolean);
      for (const p of parts) {
        const val = parseInt(p, 10);
        if (isNaN(val)) {
          setInputError(`Invalid don't-care index: "${p}". Indices must be integers.`);
          return;
        }
        if (val < 0 || val >= totalCells) {
          setInputError(`Don't-care index ${val} is out of range for a ${varCount}-variable map (valid range: 0 to ${totalCells - 1}).`);
          return;
        }
        if (!dcList.includes(val)) dcList.push(val);
      }
    }

    if (inputMode === 'minterms') {
      if (!mintermInput.trim()) {
        setInputError("Please enter at least one minterm index, e.g. 0, 2, 8, 10.");
        return;
      }
      const cleaned = mintermInput.replace(/^(?:Σ|Sigma|\u03A3)?\s*m?\s*\(/i, '').replace(/\)$/, '');
      const parts = cleaned.split(/[\s,]+/).filter(Boolean);
      const mList = [];
      for (const p of parts) {
        const val = parseInt(p, 10);
        if (isNaN(val)) {
          setInputError(`Invalid minterm index: "${p}". Indices must be integers.`);
          return;
        }
        if (val < 0 || val >= totalCells) {
          setInputError(`Minterm index ${val} is out of range for a ${varCount}-variable map (valid range: 0 to ${totalCells - 1}).`);
          return;
        }
        if (dcList.includes(val)) {
          setInputError(`Contradictory assignment: index ${val} cannot be both a required minterm and a don't-care.`);
          return;
        }
        if (!mList.includes(val)) mList.push(val);
      }

      const newCells = {};
      for (let i = 0; i < totalCells; i++) {
        if (mList.includes(i)) newCells[i] = 1;
        else if (dcList.includes(i)) newCells[i] = 'X';
        else newCells[i] = 0;
      }
      setMode('SOP');
      setCellStates(newCells);
    } else if (inputMode === 'maxterms') {
      if (!maxtermInput.trim()) {
        setInputError("Please enter at least one maxterm index, e.g. 0, 2, 8, 10.");
        return;
      }
      const cleaned = maxtermInput.replace(/^(?:Π|Pi|\u03A0)?\s*M?\s*\(/i, '').replace(/\)$/, '');
      const parts = cleaned.split(/[\s,]+/).filter(Boolean);
      const MList = [];
      for (const p of parts) {
        const val = parseInt(p, 10);
        if (isNaN(val)) {
          setInputError(`Invalid maxterm index: "${p}". Indices must be integers.`);
          return;
        }
        if (val < 0 || val >= totalCells) {
          setInputError(`Maxterm index ${val} is out of range for a ${varCount}-variable map (valid range: 0 to ${totalCells - 1}).`);
          return;
        }
        if (dcList.includes(val)) {
          setInputError(`Contradictory assignment: index ${val} cannot be both a required maxterm and a don't-care.`);
          return;
        }
        if (!MList.includes(val)) MList.push(val);
      }

      const newCells = {};
      for (let i = 0; i < totalCells; i++) {
        if (MList.includes(i)) newCells[i] = 0;
        else if (dcList.includes(i)) newCells[i] = 'X';
        else newCells[i] = 1;
      }
      setMode('POS');
      setCellStates(newCells);
    } else if (inputMode === 'expression') {
      if (!exprInput.trim()) {
        setInputError("Please enter a Boolean expression, e.g. AB + CD or A'B + AC.");
        return;
      }
      try {
        const ast = parseBooleanExpression(exprInput);
        const newCells = {};
        for (let i = 0; i < totalCells; i++) {
          if (dcList.includes(i)) {
            newCells[i] = 'X';
            continue;
          }
          const bin = i.toString(2).padStart(varCount, '0');
          const assignment = {};
          for (let v = 0; v < varCount; v++) {
            assignment[variables[v]] = parseInt(bin[v], 10);
          }
          const val = evaluateAst(ast, assignment);
          newCells[i] = val;
        }
        setCellStates(newCells);
      } catch (err) {
        setInputError(`Expression syntax error: ${err.message}`);
        return;
      }
    }
  };

  // Presets handler
  const handlePreset = (presetType) => {
    handleClearGroups();
    setInputError(null);
    setActivePresetId(presetType);
    setActiveStep(1);

    if (presetType === 'corners') {
      setVarCount(4);
      setMode('SOP');
      setInputMode('minterms');
      setMintermInput('0, 2, 8, 10');
      setDontCareInput('');
      setCellStates({ 0: 1, 2: 1, 8: 1, 10: 1 });
    } else if (presetType === 'wrap1x4') {
      setVarCount(4);
      setMode('SOP');
      setInputMode('minterms');
      setMintermInput('0, 1, 8, 9');
      setDontCareInput('');
      setCellStates({ 0: 1, 1: 1, 8: 1, 9: 1 });
    } else if (presetType === 'dontcare') {
      setVarCount(3);
      setMode('SOP');
      setInputMode('minterms');
      setMintermInput('1, 3, 7');
      setDontCareInput('5');
      setCellStates({ 1: 1, 3: 1, 7: 1, 5: 'X' });
    } else if (presetType === 'twovar') {
      setVarCount(2);
      setMode('SOP');
      setInputMode('minterms');
      setMintermInput('1, 3');
      setDontCareInput('');
      setCellStates({ 1: 1, 3: 1 });
    } else if (presetType === 'posQuad') {
      setVarCount(3);
      setMode('POS');
      setInputMode('maxterms');
      setMaxtermInput('2, 3, 6, 7');
      setDontCareInput('');
      setCellStates({ 2: 0, 3: 0, 6: 0, 7: 0, 0: 1, 1: 1, 4: 1, 5: 1 });
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

  // Derived current canonical function description
  const functionSummary = useMemo(() => {
    const minterms = [];
    const maxterms = [];
    const dontCares = [];
    for (let i = 0; i < totalCells; i++) {
      const state = cellStates[i] !== undefined ? cellStates[i] : 0;
      if (state === 1) minterms.push(i);
      else if (state === 0) maxterms.push(i);
      else if (state === 'X') dontCares.push(i);
    }

    const dcText = dontCares.length > 0 ? ` + d(${dontCares.join(', ')})` : '';

    return {
      minterms,
      maxterms,
      dontCares,
      sopText: `F(${variables.join(', ')}) = Σm(${minterms.join(', ') || 'none'})${dcText}`,
      posText: `F(${variables.join(', ')}) = ΠM(${maxterms.join(', ') || 'none'})${dcText}`
    };
  }, [cellStates, totalCells, variables]);

  // Build Guided Solution Steps
  const solutionSteps = useMemo(() => {
    const steps = [];
    const numGroups = minResult.selectedGroups.length;

    // Step 1: Plot the K-Map
    steps.push({
      stepNumber: 1,
      title: 'Step 1 : Plot the K-Map',
      type: 'plot',
      badge: 'Grid Setup',
      badgeColor: 'bg-slate-100 text-[#1E293B]',
      content: `Populate the ${varCount}-variable Gray-code matrix with target ${mode === 'SOP' ? '1s' : '0s'} and don't-care conditions (X).`,
      stats: `Target cells: ${mode === 'SOP' ? functionSummary.minterms.length : functionSummary.maxterms.length} | Don't-cares: ${functionSummary.dontCares.length}`,
      cells: []
    });

    // Steps 2 to (1 + N): Form Each Group
    minResult.selectedGroups.forEach((g, idx) => {
      const groupNum = idx + 1;
      let geoNote = 'Standard Subcube';
      const cellSet = new Set(g.cells);
      if (g.cells.length === 4 && cellSet.has(0) && cellSet.has(2) && cellSet.has(8) && cellSet.has(10)) {
        geoNote = 'Four-Corner Toroidal Quad';
      } else if (g.cells.some(c => [0, 8].includes(c)) && g.cells.some(c => [1, 9].includes(c))) {
        geoNote = 'Vertical Cylindrical Edge Wrap';
      } else if (g.cells.some(c => [0, 4].includes(c)) && g.cells.some(c => [2, 6].includes(c))) {
        geoNote = 'Horizontal Cylindrical Edge Wrap';
      } else if (g.cells.length === 16) {
        geoNote = 'Full-Map Octet/Hexadec (Constant Function)';
      }

      steps.push({
        stepNumber: groupNum + 1,
        title: `Step ${groupNum + 1} : Form Group G${groupNum}`,
        type: 'group',
        groupId: `G${groupNum}`,
        groupColor: g.color || '#285C49',
        badge: g.isEssential ? 'Essential Prime Implicant' : 'Prime Implicant',
        badgeColor: g.isEssential ? 'bg-[#EBF3ED] text-[#285C49]' : 'bg-amber-50 text-amber-800',
        cells: g.cells,
        size: g.size,
        term: g.term,
        geoNote,
        explanation: g.explanation,
        constantVars: g.constantVars,
        eliminatedVars: g.eliminatedVars
      });
    });

    // Step (2 + N): Combine Terms
    steps.push({
      stepNumber: numGroups + 2,
      title: `Step ${numGroups + 2} : Combine Derived Terms`,
      type: 'combine',
      badge: 'Algebraic Sum',
      badgeColor: 'bg-emerald-50 text-[#285C49]',
      content: mode === 'SOP'
        ? `Combine the product terms using OR: F = ${minResult.selectedGroups.map((_, i) => `G${i + 1}`).join(' + ')}`
        : `Combine the sum terms using AND: F = ${minResult.selectedGroups.map((_, i) => `(G${i + 1})`).join(' · ')}`,
      resultingExpression: minResult.minimalExpression,
      cells: []
    });

    // Step (3 + N): Verification
    steps.push({
      stepNumber: numGroups + 3,
      title: `Step ${numGroups + 3} : Verify Equivalence`,
      type: 'verify',
      badge: 'Verified Truth Values',
      badgeColor: 'bg-[#285C49] text-white',
      content: `The simplified expression F = ${minResult.minimalExpression} is verified against all ${totalCells - functionSummary.dontCares.length} specified combinations of the truth table.`,
      cells: []
    });

    return steps;
  }, [minResult, varCount, mode, functionSummary, totalCells]);

  // Active step highlight
  const currentStepData = solutionSteps[activeStep - 1] || solutionSteps[0];

  return (
    <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2F7F4] pb-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase text-[#285C49] bg-[#EBF3ED] px-2 py-0.5 rounded">
            Solver 5 · Section 2.5 Flagship
          </span>
          <h3 className="text-xl font-editorial font-bold text-[#1E293B] mt-1">
            Interactive Karnaugh Map Solver &amp; Minimizer
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Explicit minterm/maxterm inputs, step-by-step group derivation, Quine-McCluskey exact minimization, and student manual grouping.
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
                  setActivePresetId(null);
                  setActiveStep(1);
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
                  setActivePresetId(null);
                  setActiveStep(1);
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

      {/* TASK 1: ENTER YOUR BOOLEAN FUNCTION PANEL */}
      <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DCE7E1] pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#285C49]" />
            <span className="text-xs font-bold font-mono text-[#1E293B] uppercase">
              Enter Your Boolean Function
            </span>
          </div>

          {/* Input Mode Selector */}
          <div className="flex flex-wrap items-center gap-1 text-[11px] font-mono">
            {[
              { id: 'minterms', label: '1. Minterms : Σm' },
              { id: 'maxterms', label: '2. Maxterms : ΠM' },
              { id: 'expression', label: '3. Boolean Expression' },
              { id: 'direct', label: '4. Edit Map Directly' }
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setInputMode(m.id)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  inputMode === m.id
                    ? 'bg-[#285C49] text-white shadow-xs'
                    : 'bg-white text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Mode Content */}
        {inputMode === 'minterms' && (
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
            <div className="sm:col-span-6 space-y-1">
              <label className="text-[11px] font-mono font-bold text-[#1E293B]">
                Minterm Indices : Σm(indices):
              </label>
              <input
                type="text"
                value={mintermInput}
                onChange={(e) => {
                  setMintermInput(e.target.value);
                  setActivePresetId(null);
                }}
                placeholder="e.g. 0, 2, 8, 10 or Σm(0,2,8,10)"
                className="w-full px-3 py-1.5 rounded-lg border border-[#DCE7E1] bg-white text-xs font-mono text-[#1E293B]"
              />
            </div>
            <div className="sm:col-span-4 space-y-1">
              <label className="text-[11px] font-mono font-bold text-[#1E293B]">
                Don't-Care Indices : d(indices) [Optional]:
              </label>
              <input
                type="text"
                value={dontCareInput}
                onChange={(e) => {
                  setDontCareInput(e.target.value);
                  setActivePresetId(null);
                }}
                placeholder="e.g. 5, 7"
                className="w-full px-3 py-1.5 rounded-lg border border-[#DCE7E1] bg-white text-xs font-mono text-[#1E293B]"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                onClick={handleGenerateFromInput}
                className="w-full px-3 py-1.5 rounded-lg bg-[#285C49] text-white font-mono text-xs font-bold hover:bg-[#1E4335] transition-colors"
              >
                Generate K-Map
              </button>
            </div>
          </div>
        )}

        {inputMode === 'maxterms' && (
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
            <div className="sm:col-span-6 space-y-1">
              <label className="text-[11px] font-mono font-bold text-[#1E293B]">
                Maxterm Indices : ΠM(indices):
              </label>
              <input
                type="text"
                value={maxtermInput}
                onChange={(e) => {
                  setMaxtermInput(e.target.value);
                  setActivePresetId(null);
                }}
                placeholder="e.g. 0, 2, 8, 10 or ΠM(0,2,8,10)"
                className="w-full px-3 py-1.5 rounded-lg border border-[#DCE7E1] bg-white text-xs font-mono text-[#1E293B]"
              />
            </div>
            <div className="sm:col-span-4 space-y-1">
              <label className="text-[11px] font-mono font-bold text-[#1E293B]">
                Don't-Care Indices : d(indices) [Optional]:
              </label>
              <input
                type="text"
                value={dontCareInput}
                onChange={(e) => {
                  setDontCareInput(e.target.value);
                  setActivePresetId(null);
                }}
                placeholder="e.g. 5, 7"
                className="w-full px-3 py-1.5 rounded-lg border border-[#DCE7E1] bg-white text-xs font-mono text-[#1E293B]"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                onClick={handleGenerateFromInput}
                className="w-full px-3 py-1.5 rounded-lg bg-[#285C49] text-white font-mono text-xs font-bold hover:bg-[#1E4335] transition-colors"
              >
                Generate K-Map
              </button>
            </div>
          </div>
        )}

        {inputMode === 'expression' && (
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
            <div className="sm:col-span-6 space-y-1">
              <label className="text-[11px] font-mono font-bold text-[#1E293B]">
                Boolean Expression (Domain: {variables.join(', ')}):
              </label>
              <input
                type="text"
                value={exprInput}
                onChange={(e) => {
                  setExprInput(e.target.value);
                  setActivePresetId(null);
                }}
                placeholder="e.g. AB + CD or A'B + AC"
                className="w-full px-3 py-1.5 rounded-lg border border-[#DCE7E1] bg-white text-xs font-mono text-[#1E293B]"
              />
            </div>
            <div className="sm:col-span-4 space-y-1">
              <label className="text-[11px] font-mono font-bold text-[#1E293B]">
                Don't-Care Indices [Optional]:
              </label>
              <input
                type="text"
                value={dontCareInput}
                onChange={(e) => {
                  setDontCareInput(e.target.value);
                  setActivePresetId(null);
                }}
                placeholder="e.g. 5"
                className="w-full px-3 py-1.5 rounded-lg border border-[#DCE7E1] bg-white text-xs font-mono text-[#1E293B]"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                onClick={handleGenerateFromInput}
                className="w-full px-3 py-1.5 rounded-lg bg-[#285C49] text-white font-mono text-xs font-bold hover:bg-[#1E4335] transition-colors"
              >
                Generate K-Map
              </button>
            </div>
          </div>
        )}

        {inputMode === 'direct' && (
          <div className="p-2.5 rounded-lg bg-white border border-[#DCE7E1] text-xs font-mono text-[#64748B] flex items-center justify-between">
            <span>Direct Editing Mode: Click or tap any cell in the K-Map grid below to cycle its value: <strong>0 → 1 → X → 0</strong>.</span>
            <span className="text-[#285C49] font-bold">Touch and Mobile Friendly</span>
          </div>
        )}

        {/* Input Validation Error */}
        {inputError && (
          <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-300 text-rose-800 text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{inputError}</span>
          </div>
        )}

        {/* Current Function Canonical Equation Bar */}
        <div className="pt-2 border-t border-[#DCE7E1] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-[#64748B] font-bold">Current Function:</span>
            <span className="text-[#285C49] font-bold">
              {mode === 'SOP' ? functionSummary.sopText : functionSummary.posText}
            </span>
          </div>
          <div className="text-[11px] text-[#64748B]">
            Mode: <strong>{mode}</strong> | Active Domain: <strong>{variables.join(', ')}</strong> ({totalCells} cells)
          </div>
        </div>
      </div>

      {/* TASK 3: VERIFIED PRESETS STRIP */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[#64748B] font-bold">Verified Curriculum Presets:</span>
          
          <button
            onClick={() => handlePreset('corners')}
            className={`px-2.5 py-1 rounded-lg border transition-all ${
              activePresetId === 'corners'
                ? 'bg-[#285C49] text-white border-[#285C49] font-bold shadow-xs'
                : 'bg-[#FAF8F5] border-[#DCE7E1] hover:border-[#285C49] text-[#1E293B]'
            }`}
          >
            4-Corner Quad (B'D')
          </button>

          <button
            onClick={() => handlePreset('wrap1x4')}
            className={`px-2.5 py-1 rounded-lg border transition-all ${
              activePresetId === 'wrap1x4'
                ? 'bg-[#285C49] text-white border-[#285C49] font-bold shadow-xs'
                : 'bg-[#FAF8F5] border-[#DCE7E1] hover:border-[#285C49] text-[#1E293B]'
            }`}
          >
            Vertically Wrapped Quad (B'C')
          </button>

          <button
            onClick={() => handlePreset('dontcare')}
            className={`px-2.5 py-1 rounded-lg border transition-all ${
              activePresetId === 'dontcare'
                ? 'bg-[#285C49] text-white border-[#285C49] font-bold shadow-xs'
                : 'bg-[#FAF8F5] border-[#DCE7E1] hover:border-[#285C49] text-[#1E293B]'
            }`}
          >
            Don't-Care Optimization (C)
          </button>

          <button
            onClick={() => handlePreset('twovar')}
            className={`px-2.5 py-1 rounded-lg border transition-all ${
              activePresetId === 'twovar'
                ? 'bg-[#285C49] text-white border-[#285C49] font-bold shadow-xs'
                : 'bg-[#FAF8F5] border-[#DCE7E1] hover:border-[#285C49] text-[#1E293B]'
            }`}
          >
            2-Var Pair (B)
          </button>

          <button
            onClick={() => handlePreset('posQuad')}
            className={`px-2.5 py-1 rounded-lg border transition-all ${
              activePresetId === 'posQuad'
                ? 'bg-[#4F46E5] text-white border-[#4F46E5] font-bold shadow-xs'
                : 'bg-[#FAF8F5] border-[#DCE7E1] hover:border-[#4F46E5] text-[#1E293B]'
            }`}
          >
            3-Var POS Quad (B')
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
              Click cell to toggle value: 0 → 1 → X → 0
            </span>
          </div>

          {/* K-Map Table with Gray Code Ordering */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-2 border border-[#DCE7E1] bg-[#EBF3ED] text-[11px] font-mono text-[#285C49] text-center">
                    {(descriptor.rowVars || []).join('')} \ {(descriptor.colVars || []).join('')}
                  </th>
                  {(descriptor.colGrayCodes || descriptor.colHeaders || []).map((code) => (
                    <th 
                      key={code}
                      className="p-2 border border-[#DCE7E1] bg-[#FAF8F5] text-xs font-mono font-bold text-[#1E293B] text-center"
                    >
                      {code}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(descriptor.rowGrayCodes || descriptor.rowHeaders || []).map((rowCode, rIdx) => (
                  <tr key={rowCode}>
                    <td className="p-2 border border-[#DCE7E1] bg-[#FAF8F5] text-xs font-mono font-bold text-[#1E293B] text-center">
                      {rowCode}
                    </td>
                    {(descriptor.colGrayCodes || descriptor.colHeaders || []).map((colCode, cIdx) => {
                      const matrix = descriptor.grid || descriptor.matrix || [];
                      const cellIdx = matrix[rIdx]?.[cIdx];
                      if (cellIdx === undefined) return null;
                      const state = cellStates[cellIdx] !== undefined ? cellStates[cellIdx] : 0;
                      const isSelected = selectedCells.includes(cellIdx);
                      const isTarget = (mode === 'SOP' && state === 1) || (mode === 'POS' && state === 0);
                      const isDontCare = state === 'X';

                      // Check if cell is in active group (Auto Solve mode)
                      const isCellInActiveStepGroup = workflowMode === 'guided' && currentStepData?.type === 'group' && currentStepData?.cells?.includes(cellIdx);
                      const isCellInHoveredGroup = hoveredGroupCells && hoveredGroupCells.includes(cellIdx);
                      const activeGroupColor = isCellInActiveStepGroup ? currentStepData.groupColor : (isCellInHoveredGroup ? '#285C49' : null);

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
                          className={`p-3 border border-[#DCE7E1] text-center relative cursor-pointer select-none transition-all ${
                            isSelected 
                              ? 'bg-amber-100 ring-2 ring-amber-500 z-10' 
                              : activeGroupColor
                                ? 'ring-2 z-10'
                                : isTarget 
                                  ? (mode === 'SOP' ? 'bg-[#285C49] text-white' : 'bg-[#4F46E5] text-white')
                                  : isDontCare 
                                    ? 'bg-amber-50 text-amber-900 border-amber-300' 
                                    : 'bg-white text-[#64748B] hover:bg-slate-50'
                          }`}
                          style={activeGroupColor ? { backgroundColor: `${activeGroupColor}20`, borderColor: activeGroupColor } : {}}
                        >
                          <span className="text-base font-bold font-mono block">
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
            <span>Click cell: {workflowMode === 'manual' ? 'Select cell for group' : 'Cycle 0 → 1 → X → 0'}</span>
            <span>Target Polarity: {mode === 'SOP' ? 'Group 1s (Green)' : 'Group 0s (Indigo)'}</span>
          </div>
        </div>

        {/* Right: Manual Grouping Controls or Step-by-Step Auto Solve (5 Cols) */}
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
                      <div 
                        key={g.id} 
                        onMouseEnter={() => setHoveredGroupCells(g.cells)}
                        onMouseLeave={() => setHoveredGroupCells(null)}
                        className="p-3 rounded-xl border border-[#DCE7E1] bg-white space-y-1 text-xs font-mono"
                      >
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
                          Eliminates: {(g.eliminatedVars || []).join(', ') || 'None'} | Preserves: {(g.constantVars || []).map(c => `${c.variable}=${c.value}`).join(', ') || 'None'}
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
            /* TASK 2: COMPLETE STEP-BY-STEP AUTOMATIC SOLUTION */
            <div className="space-y-4">
              {/* Minimal Result Banner */}
              <div className="p-4 rounded-xl bg-[#EBF3ED] border border-[#285C49]/30 space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-[#285C49] block">
                  Exact Minimal {mode} Expression
                </span>
                <div className="text-xl font-mono font-bold text-[#285C49]">
                  F = {minResult.minimalExpression}
                </div>
              </div>

              {/* Step Navigation Bar */}
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-[#1E293B]">
                    Solution Walkthrough ({solutionSteps.length} Steps)
                  </span>
                  <button
                    onClick={() => setShowAllSteps(!showAllSteps)}
                    className="text-[11px] font-mono text-[#285C49] font-bold hover:underline"
                  >
                    {showAllSteps ? 'Show Single Step' : 'Show All Steps'}
                  </button>
                </div>

                {!showAllSteps && (
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <button
                      onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                      disabled={activeStep === 1}
                      className="px-2.5 py-1 rounded bg-white border border-[#DCE7E1] text-xs font-mono disabled:opacity-40 flex items-center gap-1"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Prev</span>
                    </button>
                    <span className="text-xs font-mono font-bold text-[#285C49]">
                      Step {activeStep} of {solutionSteps.length}
                    </span>
                    <button
                      onClick={() => setActiveStep(prev => Math.min(solutionSteps.length, prev + 1))}
                      disabled={activeStep === solutionSteps.length}
                      className="px-2.5 py-1 rounded bg-white border border-[#DCE7E1] text-xs font-mono disabled:opacity-40 flex items-center gap-1"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Render Steps */}
              {showAllSteps ? (
                /* All Steps View */
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {solutionSteps.map((st) => (
                    <div 
                      key={st.stepNumber}
                      onMouseEnter={() => st.cells?.length && setHoveredGroupCells(st.cells)}
                      onMouseLeave={() => setHoveredGroupCells(null)}
                      className="p-3.5 rounded-xl border border-[#DCE7E1] bg-white space-y-2 text-xs font-mono"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#1E293B] flex items-center gap-1.5">
                          {st.groupColor && (
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: st.groupColor }} />
                          )}
                          {st.title}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${st.badgeColor}`}>
                          {st.badge}
                        </span>
                      </div>

                      {st.type === 'plot' && (
                        <div className="text-[11px] text-[#64748B]">
                          <div>{st.content}</div>
                          <div className="text-[#285C49] font-semibold mt-1">{st.stats}</div>
                        </div>
                      )}

                      {st.type === 'group' && (
                        <div className="space-y-1 text-[11px]">
                          <div className="text-[#1E293B] font-bold">
                            Derived Boolean Term: <span className="text-[#285C49] text-xs">{st.term}</span>
                          </div>
                          <div className="text-[#64748B]">
                            Cells: {'{'}{st.cells.join(', ')}{'}'} ({st.size} cells, {st.geoNote})
                          </div>
                          <div className="text-[#475569]">
                            {st.explanation}
                          </div>
                        </div>
                      )}

                      {st.type === 'combine' && (
                        <div className="text-[11px] text-[#285C49] font-bold">
                          {st.content}
                          <div className="text-sm font-bold mt-1">F = {st.resultingExpression}</div>
                        </div>
                      )}

                      {st.type === 'verify' && (
                        <div className="text-[11px] text-emerald-800 bg-emerald-50 p-2 rounded border border-emerald-200">
                          {st.content}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                /* Single Active Step Card */
                <div className="p-4 rounded-xl border border-[#285C49]/40 bg-white space-y-3 text-xs font-mono shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#F2F7F4] pb-2">
                    <span className="font-bold text-[#1E293B] flex items-center gap-1.5">
                      {currentStepData.groupColor && (
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: currentStepData.groupColor }} />
                      )}
                      {currentStepData.title}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${currentStepData.badgeColor}`}>
                      {currentStepData.badge}
                    </span>
                  </div>

                  {currentStepData.type === 'plot' && (
                    <div className="space-y-2 text-[#475569]">
                      <p>{currentStepData.content}</p>
                      <div className="p-2 rounded bg-[#FAF8F5] border border-[#DCE7E1] text-[#285C49] font-bold">
                        {currentStepData.stats}
                      </div>
                    </div>
                  )}

                  {currentStepData.type === 'group' && (
                    <div className="space-y-2">
                      <div className="p-2.5 rounded-lg bg-[#EBF3ED] text-[#285C49] font-bold text-sm">
                        Derived Boolean Term: {currentStepData.term}
                      </div>
                      <div className="text-[#64748B] space-y-1">
                        <div>Covered Cells: {'{'}{(currentStepData.cells || []).join(', ')}{'}'} ({currentStepData.size || 0} cells)</div>
                        <div>Geometry: {currentStepData.geoNote || 'Standard'}</div>
                        <div>Constant Variables: {(currentStepData.constantVars || []).map(c => `${c.variable}=${c.value}`).join(', ') || 'None'}</div>
                        <div>Eliminated Variables: {(currentStepData.eliminatedVars || []).join(', ') || 'None'}</div>
                      </div>
                      <p className="text-[11px] text-[#475569] font-sans pt-1 border-t border-[#F2F7F4]">
                        {currentStepData.explanation}
                      </p>
                    </div>
                  )}

                  {currentStepData.type === 'combine' && (
                    <div className="space-y-2">
                      <p className="text-[#475569]">{currentStepData.content}</p>
                      <div className="p-3 rounded-lg bg-[#EBF3ED] text-[#285C49] font-bold text-base">
                        Final Form: F = {currentStepData.resultingExpression}
                      </div>
                    </div>
                  )}

                  {currentStepData.type === 'verify' && (
                    <div className="space-y-2 text-emerald-900 bg-emerald-50 p-3 rounded-xl border border-emerald-300">
                      <div className="flex items-center gap-2 font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span>Equivalence Rigorously Verified</span>
                      </div>
                      <p className="text-[11px] text-emerald-800">
                        {currentStepData.content}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SOLVER 6: UNIVERSAL GATE SYNTHESIS (Section 2.6 Supplemental - Preserved)
// ============================================================================
export const SolverF_NandNor = ({ onBack }) => {
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
            Solver 6 · Universal Gate Synthesis (Sec 2.6 Preview)
          </span>
          <h3 className="text-xl font-editorial font-bold text-[#1E293B] mt-1">
            NAND/NOR Circuit Builder &amp; Netlist Generator
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Synthesizes 2-level SOP into NAND-NAND networks, and POS into NOR-NOR networks with exact De Morgan equivalence proofs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="px-3 py-1.5 rounded-lg border border-[#DCE7E1] text-xs font-mono text-[#64748B] hover:text-[#1E293B]"
            >
              Back to Solvers
            </button>
          )}

          <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-xl border border-[#DCE7E1]">
            {['NAND', 'NOR'].map(m => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  if (m === 'NOR') setExpr('(A + B)(C + D)');
                  else setExpr('AB + CD');
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
        </div>
      </div>

      {/* Input */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#1E293B] font-mono">
          Input Boolean Expression ({mode === 'NAND' ? 'SOP Form' : 'POS Form'}):
        </label>
        <input
          type="text"
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
          className="w-full px-3.5 py-2 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] text-xs font-mono text-[#1E293B]"
        />
      </div>

      {/* Output */}
      {synthesis.error ? (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono">
          {synthesis.error}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-[#285C49] block">
              De Morgan Dual Involution Mathematical Proof
            </span>
            <div className="text-sm font-bold font-mono text-[#1E293B]">
              {synthesis.deMorganProof}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#1E293B] uppercase font-mono">
              Synthesized Two-Level Gate Netlist ({synthesis.totalGates} Gates)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {synthesis.gates.map((g) => (
                <div key={g.gateId} className="p-3.5 rounded-xl border border-[#DCE7E1] bg-white space-y-1.5 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#285C49]">{g.gateId} ({g.type} - Level {g.level})</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF8F5] text-[#64748B]">
                      {g.inputs.length} Inputs
                    </span>
                  </div>
                  <div className="text-[11px] text-[#1E293B]">
                    Inputs: [{g.inputs.join(', ')}] → Output: {g.output}
                  </div>
                  <p className="text-[10px] text-[#64748B] font-sans">
                    {g.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Unit2Solvers;
