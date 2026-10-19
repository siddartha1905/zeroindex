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
  Info
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
    { id: 'simplifier', label: 'Algebraic Simplifier', icon: Calculator, badge: 'Solver A' },
    { id: 'truthTable', label: 'Truth Table Generator', icon: Table, badge: 'Solver B' },
    { id: 'mintermMaxterm', label: 'Minterm/Maxterm Converter', icon: Layers, badge: 'Solver C' },
    { id: 'sopPos', label: 'SOP/POS Form Optimizer', icon: GitBranch, badge: 'Solver D' },
    { id: 'kmap', label: 'Interactive K-Map Solver', icon: Grid, badge: 'Solver E' },
    { id: 'nandNor', label: 'NAND/NOR Circuit Builder', icon: Cpu, badge: 'Solver F' }
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2E6F40]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#2E6F40]">
              UNIT-II Interactive Mathematical Suite
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
            Six verified interactive tools designed for symbolic transformation, truth table analysis, canonical indexing, Karnaugh map grouping, and universal gate synthesis.
          </p>
        </div>

        {/* Sub-Tabs Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-2 border-t border-[#F2F7F4]">
          {solverTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSolverTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSolverTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#2E6F40] text-white shadow-sm'
                    : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] hover:bg-[#F2F7F4] border border-[#DCE7E1]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                  isActive ? 'bg-white/20 text-white' : 'bg-white text-[#2E6F40] border border-[#DCE7E1]'
                }`}>
                  {tab.badge}
                </span>
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
// SOLVER A: BOOLEAN EXPRESSION SIMPLIFIER
// ============================================================================
const SolverA_Simplifier = () => {
  const [inputExpr, setInputExpr] = useState("A + A'B");
  const presets = [
    "A + A'B",
    "AB + AB'",
    "A + AB",
    "(A + B)(A + B')",
    "AB + A'C + BC",
    "A'B'C' + A'BC' + AB'C' + ABC'",
    "(A + B)' + AB"
  ];

  const result = useMemo(() => {
    return traceAlgebraicSimplification(inputExpr);
  }, [inputExpr]);

  return (
    <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
      <div className="border-b border-[#F2F7F4] pb-4">
        <span className="text-[10px] font-mono font-bold uppercase text-[#2E6F40] bg-[#EBF3ED] px-2 py-0.5 rounded">
          Solver A · Pure AST Symbolic Engine
        </span>
        <h3 className="text-xl font-editorial font-bold text-[#1E293B] mt-1">
          Boolean Expression Simplifier
        </h3>
        <p className="text-xs text-[#64748B] mt-0.5">
          Parses arbitrary expressions, executes verified algebraic reductions, and cites exact Boolean laws at every step.
        </p>
      </div>

      {/* Presets */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-bold text-[#64748B] uppercase font-mono">Quick Presets:</span>
        <div className="flex flex-wrap gap-1.5">
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setInputExpr(p)}
              className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] text-xs font-mono hover:border-[#2E6F40] hover:text-[#2E6F40] transition-colors"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-[#1E293B] font-mono">
          Enter Boolean Expression (Operators: ' for NOT, + for OR, · or implicit for AND, ^ for XOR):
        </label>
        <input
          type="text"
          value={inputExpr}
          onChange={(e) => setInputExpr(e.target.value)}
          placeholder="e.g. A + A'B or AB + A'C + BC"
          className="w-full px-4 py-2.5 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] text-sm font-mono text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#2E6F40] focus:bg-white transition-all"
        />
      </div>

      {/* Output Results */}
      {result.success ? (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#EBF3ED] border border-[#2E6F40]/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-[#2E6F40] block">Minimal Reduced Form</span>
              <span className="text-xl font-mono font-bold text-[#2E6F40]">{result.simplified}</span>
            </div>
            <div className="text-right text-xs font-mono text-[#64748B]">
              <span>Variables: {result.variables.join(', ')}</span>
              <div className="text-[10px] text-[#2E6F40] font-bold mt-0.5">Truth-Table Verified Equivalence</div>
            </div>
          </div>

          {/* Derivation Steps */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#1E293B] uppercase tracking-wider font-mono">
              Step-by-Step Algebraic Reduction Trace
            </h4>
            <div className="divide-y divide-[#F2F7F4] border border-[#DCE7E1] rounded-xl overflow-hidden bg-white">
              {result.steps.map((s) => (
                <div key={s.stepNumber} className="p-3 grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs">
                  <div className="sm:col-span-1 font-mono font-bold text-[#64748B]">
                    Step {s.stepNumber}:
                  </div>
                  <div className="sm:col-span-5 font-mono font-bold text-[#1E293B] bg-[#FAF8F5] p-1.5 rounded-lg border border-[#DCE7E1]">
                    {s.expression}
                  </div>
                  <div className="sm:col-span-6 flex flex-col justify-center text-[11px] text-[#475569]">
                    <span className="font-bold text-[#2E6F40] font-mono">{s.law}</span>
                    <span className="text-[#64748B]">{s.justification}</span>
                  </div>
                </div>
              ))}
            </div>
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
// SOLVER B: TRUTH TABLE GENERATOR
// ============================================================================
const SolverB_TruthTable = () => {
  const [inputExpr, setInputExpr] = useState("A'B + AB'");
  const [explicitVars, setExplicitVars] = useState("A, B");

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

  return (
    <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
      <div className="border-b border-[#F2F7F4] pb-4">
        <span className="text-[10px] font-mono font-bold uppercase text-[#2E6F40] bg-[#EBF3ED] px-2 py-0.5 rounded">
          Solver B · Exhaustive State Evaluator
        </span>
        <h3 className="text-xl font-editorial font-bold text-[#1E293B] mt-1">
          Truth Table Generator & Minterm/Maxterm Extractor
        </h3>
        <p className="text-xs text-[#64748B] mt-0.5">
          Generates all 2^n input combinations, highlights outputs, and extracts canonical Sigma m and Pi M index sets.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2 space-y-1.5">
          <label className="text-xs font-bold text-[#1E293B] font-mono">Boolean Expression:</label>
          <input
            type="text"
            value={inputExpr}
            onChange={(e) => setInputExpr(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] text-xs font-mono"
            placeholder="e.g. A + B*C"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E293B] font-mono">Explicit Variables (Order):</label>
          <input
            type="text"
            value={explicitVars}
            onChange={(e) => setExplicitVars(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] text-xs font-mono"
            placeholder="e.g. A, B, C"
          />
        </div>
      </div>

      {tableData.success ? (
        <div className="space-y-4">
          {/* Index summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-[#EBF3ED] border border-[#2E6F40]/30 space-y-0.5">
              <span className="text-[10px] font-bold text-[#2E6F40] uppercase">Canonical SOP (Minterms F=1)</span>
              <div className="text-sm font-bold text-[#2E6F40]">
                Sigma m({tableData.data.minterms.join(', ') || 'none'})
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#EEF2FF] border border-[#4F46E5]/30 space-y-0.5">
              <span className="text-[10px] font-bold text-[#4F46E5] uppercase">Canonical POS (Maxterms F=0)</span>
              <div className="text-sm font-bold text-[#4F46E5]">
                Pi M({tableData.data.maxterms.join(', ') || 'none'})
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-[#DCE7E1]">
            <table className="w-full text-center text-xs font-mono">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-[#DCE7E1] text-[#64748B]">
                  <th className="p-2 border-r border-[#DCE7E1]">Row Index</th>
                  {tableData.data.variables.map(v => (
                    <th key={v} className="p-2 border-r border-[#DCE7E1] font-bold text-[#1E293B]">{v}</th>
                  ))}
                  <th className="p-2 border-r border-[#DCE7E1]">Minterm</th>
                  <th className="p-2 text-[#2E6F40] font-bold bg-[#FAF8F5]">Output (F)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2F7F4]">
                {tableData.data.rows.map((r) => (
                  <tr key={r.index} className={r.output === 1 ? 'bg-[#EBF3ED]/30' : 'bg-white'}>
                    <td className="p-2 border-r border-[#DCE7E1] font-bold text-[#64748B]">{r.index}</td>
                    {tableData.data.variables.map(v => (
                      <td key={v} className="p-2 border-r border-[#DCE7E1]">{r.assignment[v]}</td>
                    ))}
                    <td className="p-2 border-r border-[#DCE7E1] text-[#64748B]">
                      {getMintermTerm(r.index, tableData.data.variables)}
                    </td>
                    <td className={`p-2 font-bold ${r.output === 1 ? 'text-[#2E6F40]' : 'text-[#64748B]'}`}>
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
  );
};

// ============================================================================
// SOLVER C: MINTERM & MAXTERM CONVERTER
// ============================================================================
const SolverC_MintermMaxterm = () => {
  const [varCount, setVarCount] = useState(3);
  const [mintermInput, setMintermInput] = useState("1, 3, 5, 7");

  const variables = useMemo(() => {
    return ['A', 'B', 'C', 'D'].slice(0, varCount);
  }, [varCount]);

  const convertedData = useMemo(() => {
    const totalCombinations = Math.pow(2, varCount);
    const indices = mintermInput
      .split(',')
      .map(s => parseInt(s.trim(), 10))
      .filter(n => !isNaN(n) && n >= 0 && n < totalCombinations);
    
    const uniqueMinterms = Array.from(new Set(indices)).sort((a, b) => a - b);
    const maxterms = [];
    for (let i = 0; i < totalCombinations; i++) {
      if (!uniqueMinterms.includes(i)) maxterms.push(i);
    }

    const canonicalSOP = formatCanonicalSOP(uniqueMinterms, variables);
    const canonicalPOS = formatCanonicalPOS(maxterms, variables);
    const minimalSOP = minimizeKMap(uniqueMinterms, [], variables, 'SOP').minimalExpression;

    return {
      minterms: uniqueMinterms,
      maxterms,
      canonicalSOP,
      canonicalPOS,
      minimalSOP
    };
  }, [mintermInput, varCount, variables]);

  return (
    <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
      <div className="border-b border-[#F2F7F4] pb-4">
        <span className="text-[10px] font-mono font-bold uppercase text-[#2E6F40] bg-[#EBF3ED] px-2 py-0.5 rounded">
          Solver C · Canonical Bidirectional Mapper
        </span>
        <h3 className="text-xl font-editorial font-bold text-[#1E293B] mt-1">
          Minterm and Maxterm Converter
        </h3>
        <p className="text-xs text-[#64748B] mt-0.5">
          Converts decimal minterm lists into canonical SOP, complementary maxterm lists, canonical POS, and minimal representations.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E293B] font-mono">Number of Variables:</label>
          <div className="flex gap-2">
            {[2, 3, 4].map(num => (
              <button
                key={num}
                onClick={() => setVarCount(num)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
                  varCount === num
                    ? 'bg-[#2E6F40] text-white'
                    : 'bg-[#FAF8F5] border border-[#DCE7E1] text-[#64748B]'
                }`}
              >
                {num} Vars ({Math.pow(2, num)} cells)
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E293B] font-mono">
            Minterm Indices (comma-separated, 0 to {Math.pow(2, varCount) - 1}):
          </label>
          <input
            type="text"
            value={mintermInput}
            onChange={(e) => setMintermInput(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] text-xs font-mono"
            placeholder="e.g. 1, 3, 5, 7"
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="p-4 rounded-xl bg-[#EBF3ED] border border-[#2E6F40]/30 space-y-1">
          <span className="text-[10px] font-mono uppercase font-bold text-[#2E6F40] block">Canonical Sum of Minterms (Sigma m)</span>
          <div className="text-sm font-bold font-mono text-[#2E6F40]">
            F({variables.join(', ')}) = Sigma m({convertedData.minterms.join(', ')})
          </div>
          <div className="text-xs font-mono text-[#1E293B] pt-1">
            = {convertedData.canonicalSOP}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#EEF2FF] border border-[#4F46E5]/30 space-y-1">
          <span className="text-[10px] font-mono uppercase font-bold text-[#4F46E5] block">Canonical Product of Maxterms (Pi M)</span>
          <div className="text-sm font-bold font-mono text-[#4F46E5]">
            F({variables.join(', ')}) = Pi M({convertedData.maxterms.join(', ')})
          </div>
          <div className="text-xs font-mono text-[#1E293B] pt-1">
            = {convertedData.canonicalPOS}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1">
          <span className="text-[10px] font-mono uppercase font-bold text-[#1E293B] block">Irreducible Minimal SOP</span>
          <div className="text-base font-bold font-mono text-[#2E6F40]">
            F = {convertedData.minimalSOP}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SOLVER D: SOP / POS CONVERTER & SIMPLIFIER
// ============================================================================
const SolverD_SopPos = () => {
  const [expression, setExpression] = useState("AB + CD");
  const [variablesStr, setVariablesStr] = useState("A, B, C, D");

  const comparison = useMemo(() => {
    try {
      const vars = variablesStr.split(',').map(s => s.trim().toUpperCase()).filter(Boolean);
      const tt = generateTruthTable(expression, vars);
      const sopMin = minimizeKMap(tt.minterms, [], vars, 'SOP');
      const posMin = minimizeKMap(tt.minterms, [], vars, 'POS');

      return {
        success: true,
        variables: vars,
        minterms: tt.minterms,
        maxterms: tt.maxterms,
        sopExpr: sopMin.minimalExpression,
        posExpr: posMin.minimalExpression,
        sopGroups: sopMin.selectedGroups,
        posGroups: posMin.selectedGroups
      };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [expression, variablesStr]);

  return (
    <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
      <div className="border-b border-[#F2F7F4] pb-4">
        <span className="text-[10px] font-mono font-bold uppercase text-[#2E6F40] bg-[#EBF3ED] px-2 py-0.5 rounded">
          Solver D · Dual Architecture Evaluator
        </span>
        <h3 className="text-xl font-editorial font-bold text-[#1E293B] mt-1">
          SOP and POS Form Optimizer & Hardware Comparison
        </h3>
        <p className="text-xs text-[#64748B] mt-0.5">
          Simultaneously derives minimal Sum of Products and Product of Sums representations to compare gate costs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2 space-y-1.5">
          <label className="text-xs font-bold text-[#1E293B] font-mono">Target Expression:</label>
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] text-xs font-mono"
            placeholder="e.g. AB + CD"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E293B] font-mono">Variables:</label>
          <input
            type="text"
            value={variablesStr}
            onChange={(e) => setVariablesStr(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] text-xs font-mono"
            placeholder="e.g. A, B, C, D"
          />
        </div>
      </div>

      {comparison.success ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-[#2E6F40]/30 bg-[#EBF3ED]/30 space-y-3">
            <span className="text-[10px] font-mono font-bold uppercase text-[#2E6F40] block">Minimal SOP (AND-OR Network)</span>
            <div className="text-lg font-mono font-bold text-[#2E6F40]">
              F = {comparison.sopExpr}
            </div>
            <div className="text-xs text-[#64748B] space-y-1">
              <div>Prime Implicants: {comparison.sopGroups.length} terms</div>
              <div>Target Minterms: Sigma m({comparison.minterms.join(', ')})</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-[#4F46E5]/30 bg-[#EEF2FF]/30 space-y-3">
            <span className="text-[10px] font-mono font-bold uppercase text-[#4F46E5] block">Minimal POS (OR-AND Network)</span>
            <div className="text-lg font-mono font-bold text-[#4F46E5]">
              F = {comparison.posExpr}
            </div>
            <div className="text-xs text-[#64748B] space-y-1">
              <div>Prime Implicants: {comparison.posGroups.length} terms</div>
              <div>Target Maxterms: Pi M({comparison.maxterms.join(', ')})</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-[#FEE2E2] text-xs text-[#991B1B]">
          {comparison.error}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// SOLVER E: INTERACTIVE K-MAP SOLVER
// ============================================================================
const SolverE_KMap = () => {
  const [varCount, setVarCount] = useState(4);
  const [mode, setMode] = useState('SOP'); // 'SOP' or 'POS'
  // cellStates: dictionary of index -> 0, 1, or 'X'
  const [cellStates, setCellStates] = useState({
    0: 1, 2: 1, 8: 1, 10: 1 // Default four corners quad
  });

  const variables = useMemo(() => {
    return ['A', 'B', 'C', 'D'].slice(0, varCount);
  }, [varCount]);

  const descriptor = useMemo(() => {
    return getKMapGridDescriptor(varCount, variables);
  }, [varCount, variables]);

  const toggleCell = (index) => {
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
  };

  const handleClear = () => {
    setCellStates({});
  };

  const handlePreset = (type) => {
    if (type === 'corners') {
      setVarCount(4);
      setCellStates({ 0: 1, 2: 1, 8: 1, 10: 1 });
    } else if (type === 'dontcare') {
      setVarCount(3);
      setCellStates({ 1: 1, 3: 1, 7: 1, 5: 'X' });
    } else if (type === 'twovar') {
      setVarCount(2);
      setCellStates({ 1: 1, 3: 1 });
    }
  };

  // Compute minimization result
  const minResult = useMemo(() => {
    const minterms = [];
    const dontCares = [];
    const totalCells = Math.pow(2, varCount);

    for (let i = 0; i < totalCells; i++) {
      const state = cellStates[i] !== undefined ? cellStates[i] : 0;
      if (state === 1) minterms.push(i);
      else if (state === 'X') dontCares.push(i);
    }

    return minimizeKMap(minterms, dontCares, variables, mode);
  }, [cellStates, varCount, variables, mode]);

  return (
    <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2F7F4] pb-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase text-[#2E6F40] bg-[#EBF3ED] px-2 py-0.5 rounded">
            Solver E · Signature Visual Minimizer
          </span>
          <h3 className="text-xl font-editorial font-bold text-[#1E293B] mt-1">
            Interactive Karnaugh Map Solver
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Click any cell to cycle values (0 {'->'} 1 {'->'} X). Exact Quine-McCluskey engine derives prime implicants and minimal covers in real time.
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
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-all ${
                  varCount === num
                    ? 'bg-[#2E6F40] text-white shadow-xs'
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
                onClick={() => setMode(m)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-all ${
                  mode === m
                    ? 'bg-[#2E6F40] text-white shadow-xs'
                    : 'text-[#64748B] hover:text-[#1E293B]'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <button
            onClick={handleClear}
            className="px-2.5 py-1 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] text-xs font-semibold text-[#64748B] hover:text-[#DC2626] transition-colors"
          >
            Clear Grid
          </button>
        </div>
      </div>

      {/* Presets */}
      <div className="flex items-center gap-2 text-xs font-mono">
        <span className="text-[#64748B] font-bold">Standard Presets:</span>
        <button
          onClick={() => handlePreset('corners')}
          className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] hover:border-[#2E6F40] text-[#1E293B]"
        >
          4-Corner Quad (B'D')
        </button>
        <button
          onClick={() => handlePreset('dontcare')}
          className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] hover:border-[#2E6F40] text-[#1E293B]"
        >
          Don't Care Example (C)
        </button>
        <button
          onClick={() => handlePreset('twovar')}
          className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] hover:border-[#2E6F40] text-[#1E293B]"
        >
          2-Var Column (B)
        </button>
      </div>

      {/* Interactive Grid & Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: The Clickable K-Map Grid (7 cols) */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-[#1E293B]">
              Rows: {descriptor.rowVars.join('')} | Columns: {descriptor.colVars.join('')}
            </span>
            <span className="text-[11px] text-[#64748B]">Click cell to toggle (0 {'->'} 1 {'->'} X)</span>
          </div>

          <div className="overflow-x-auto">
            <table className="border-collapse text-center text-xs font-mono mx-auto">
              <thead>
                <tr>
                  <th className="p-3 border border-[#DCE7E1] bg-white text-[#64748B]">
                    {descriptor.rowVars.join('')} \ {descriptor.colVars.join('')}
                  </th>
                  {descriptor.colHeaders.map(ch => (
                    <th key={ch} className="p-3 border border-[#DCE7E1] bg-white font-bold text-[#2E6F40]">
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

                      return (
                        <td
                          key={cellIdx}
                          onClick={() => toggleCell(cellIdx)}
                          className={`p-3.5 border border-[#DCE7E1] cursor-pointer transition-all hover:scale-105 select-none relative ${
                            isTarget
                              ? 'bg-[#2E6F40] text-white shadow-inner font-bold'
                              : isX
                              ? 'bg-[#FEF3C7] text-[#92400E] font-bold'
                              : 'bg-white text-[#64748B] hover:bg-[#F2F7F4]'
                          }`}
                        >
                          <span className="text-base font-bold block">{state}</span>
                          <span className={`text-[9px] block font-mono ${
                            isTarget ? 'text-white/80' : 'text-[#94A3B8]'
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
        </div>

        {/* Right: Real-Time Minimization Output (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-xl bg-[#EBF3ED] border border-[#2E6F40]/30 space-y-1">
            <span className="text-[10px] font-mono uppercase font-bold text-[#2E6F40] block">
              Minimized {mode} Expression
            </span>
            <div className="text-xl font-mono font-bold text-[#2E6F40]">
              F = {minResult.minimalExpression}
            </div>
          </div>

          {/* Groups List */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#1E293B] uppercase font-mono block">
              Selected Prime Implicant Groups ({minResult.selectedGroups.length})
            </span>
            <div className="space-y-2">
              {minResult.selectedGroups.length === 0 ? (
                <div className="p-3 rounded-lg bg-[#FAF8F5] text-xs text-[#64748B] text-center">
                  No required cells to group.
                </div>
              ) : (
                minResult.selectedGroups.map((g, idx) => (
                  <div
                    key={g.id || idx}
                    className="p-3 rounded-xl border border-[#DCE7E1] bg-white space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#1E293B] flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: g.color || '#2E6F40' }} />
                        Term: {g.term}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF8F5] text-[#2E6F40] font-bold">
                        {g.size} Cell{g.size > 1 ? 's' : ''} {g.isEssential ? '· Essential' : ''}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-[#64748B]">
                      Cells: {'{'}{g.cells.join(', ')}{'}'}
                    </div>
                    <div className="text-[11px] text-[#475569] pt-0.5">
                      {g.explanation}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SOLVER F: NAND/NOR CIRCUIT BUILDER
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
    <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2F7F4] pb-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase text-[#2E6F40] bg-[#EBF3ED] px-2 py-0.5 rounded">
            Solver F · Universal Logic Synthesizer
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
                  ? 'bg-[#2E6F40] text-white shadow-xs'
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
          className="w-full px-3.5 py-2 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] text-xs font-mono"
        />
      </div>

      {synthesis.gates ? (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1">
            <span className="text-[10px] font-mono uppercase font-bold text-[#2E6F40] block">
              De Morgan Dual Involution Proof
            </span>
            <div className="text-xs font-mono font-bold text-[#1E293B]">
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
                <div key={g.gateId} className="p-4 rounded-xl border border-[#DCE7E1] bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#2E6F40]">{g.gateId}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#DCE7E1] font-bold">
                      Level {g.level}
                    </span>
                  </div>
                  <div className="text-xs font-mono font-bold text-[#1E293B]">
                    Inputs: {g.inputs.join(', ')}
                  </div>
                  <div className="text-xs font-mono text-[#2E6F40] bg-[#FAF8F5] p-1.5 rounded border border-[#DCE7E1]">
                    Output: {g.output}
                  </div>
                  <p className="text-[11px] text-[#64748B]">{g.description}</p>
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
