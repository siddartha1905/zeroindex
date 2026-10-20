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
  Printer
} from 'lucide-react';
import { dldSection23Data } from '../data/dldSection23Data';
import { CuratedVideoCard } from './CuratedVideoCard';

/**
 * Section 2.3 View: Boolean Functions, Minterms, Maxterms, Canonical and Standard Forms
 * Strictly zero em-dashes and zero en-dashes throughout.
 * Follows permanent ZeroIndex WHY-FIRST philosophy: WHY -> WHERE -> WHAT -> HOW -> TRY -> CONNECT
 */

export const Section23View = ({ section }) => {
  const [activeTab, setActiveTab] = useState('start-here');
  
  // Tab 2 interactive state
  const [activeVarTable, setActiveVarTable] = useState('3var');
  const [selectedRowIndex, setSelectedRowIndex] = useState(5); // Default to row 5 (101)
  
  // Tab 4 Worked Models state
  const [modelFilter, setModelFilter] = useState('All');
  const [expandedModels, setExpandedModels] = useState({ 
    'WM2.3-B01': true, 
    'WM2.3-I02': true, 
    'WM2.3-A01': true 
  });
  
  // Tab 5 Checklist state
  const [checkedItems, setCheckedItems] = useState({});

  // Tab 6 Practice Lab state
  const [practiceFilter, setPracticeFilter] = useState('All');
  const [revealedHints, setRevealedHints] = useState({});
  const [revealedSolutions, setRevealedSolutions] = useState({});

  const data = dldSection23Data;

  // Handlers
  const toggleModel = (id) => {
    setExpandedModels(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleHint = (problemId, hintNumber) => {
    const key = `${problemId}_hint${hintNumber}`;
    setRevealedHints(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleSolution = (id) => {
    setRevealedSolutions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleChecklist = (idx) => {
    setCheckedItems(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  // Get current active table data for Tab 2
  const getCurrentTableData = () => {
    if (activeVarTable === '2var') return data.mintermsAndMaxterms.twoVariableTable;
    if (activeVarTable === '4var') return data.mintermsAndMaxterms.fourVariableTable;
    return data.mintermsAndMaxterms.threeVariableTable;
  };

  const currentRows = getCurrentTableData();
  const selectedRowData = currentRows.find(r => r.index === selectedRowIndex) || currentRows[0];

  // Filter worked models
  const filteredModels = modelFilter === 'All'
    ? data.workedModels
    : data.workedModels.filter(m => m.level === modelFilter);

  // Filter practice problems
  const filteredPractice = practiceFilter === 'All'
    ? data.practiceLab
    : data.practiceLab.filter(p => p.difficulty === practiceFilter);

  // Print helper for Tab 5
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 text-left">
      
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
            {data.description}
          </p>
        </div>

        {/* Academic Context Notice */}
        <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] text-xs text-[#5F6C64] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#285C49] flex-shrink-0" />
            <span>
              <strong className="text-[#293B32]">Pedagogical Rationale: </strong>
              Connects truth tables directly to canonical Boolean expressions before algebraic minimization in Section 2.4 and K-Maps in Section 2.5.
            </span>
          </div>
        </div>

        {/* Six Responsive Navigation Tabs */}
        <div className="pt-2 border-t border-[#DCE7E1]">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {[
              { id: 'start-here', label: '1. Start Here', icon: Compass },
              { id: 'minterms-maxterms', label: '2. Minterms & Maxterms', icon: TableIcon },
              { id: 'canonical-forms', label: '3. Canonical & Standard', icon: Layers },
              { id: 'worked-models', label: '4. Worked Models', icon: CheckCircle2 },
              { id: 'cheat-sheet', label: '5. Cheat Sheet', icon: FileText },
              { id: 'practice-lab', label: '6. Practice Lab', icon: Zap }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all duration-150 cursor-pointer text-center ${
                    isActive
                      ? 'bg-[#285C49] text-white shadow-xs'
                      : 'bg-[#FAF8F5] text-[#5F6C64] hover:text-[#293B32] hover:bg-[#F0EEEA] border border-[#DCE7E1]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: START HERE                                                         */}
      {/* ========================================================================= */}
      {activeTab === 'start-here' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* WHY DO WE NEED MINTERMS AND MAXTERMS */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#DCE7E1]">
              <Sparkles className="w-5 h-5 text-[#285C49]" />
              <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#293B32]">
                {data.startHere.whyMintermsMaxterms.title}
              </h2>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-[#F4F7F4] border-l-4 border-[#285C49] space-y-2">
              <p className="font-editorial text-base sm:text-lg text-[#293B32] leading-relaxed">
                "{data.startHere.whyMintermsMaxterms.lead}"
              </p>
            </div>

            {/* Visual Question Callout */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#EBF3ED] text-[#285C49] flex items-center justify-center font-bold font-mono">
                  ?
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-[#285C49] uppercase tracking-wider block">
                    Core Academic Question
                  </span>
                  <span className="font-editorial text-base sm:text-lg font-bold text-[#293B32]">
                    {data.startHere.whyMintermsMaxterms.questionCallout}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* FIRST LEARNING DEMO: 2-INPUT ALARM SYSTEM */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#285C49] block mb-1">
                Concrete Physical Example
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#293B32]">
                {data.startHere.alarmDemo.title}
              </h3>
              <p className="text-sm text-[#5F6C64] mt-2 leading-relaxed">
                {data.startHere.alarmDemo.scenario}
              </p>
            </div>

            {/* Truth Table with Green / Blue row highlights */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#293B32]">
                  Alarm Truth Table (Inputs: A = Door, B = Motion | Output: F = Siren)
                </span>
                <span className="text-xs font-mono font-bold text-[#285C49]">
                  Physical Law: F = A + B
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-[#DCE7E1]">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#FAF8F5] border-b border-[#DCE7E1] text-[#293B32]">
                    <tr>
                      <th className="p-3">Index</th>
                      <th className="p-3">A (Door)</th>
                      <th className="p-3">B (Motion)</th>
                      <th className="p-3 font-bold text-center">F (Alarm)</th>
                      <th className="p-3">Minterm (if F=1)</th>
                      <th className="p-3">Maxterm (if F=0)</th>
                      <th className="p-3">Physical Scenario</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DCE7E1]">
                    {data.startHere.alarmDemo.truthTable.map((row) => (
                      <tr 
                        key={row.index}
                        className={row.F === 1 ? 'bg-[#EBF3ED]/60' : 'bg-[#EBF8FF]/70'}
                      >
                        <td className="p-3 font-bold text-[#293B32]">Row {row.index}</td>
                        <td className="p-3">{row.A}</td>
                        <td className="p-3">{row.B}</td>
                        <td className="p-3 text-center">
                          <span className={`inline-block px-2 py-0.5 rounded font-bold ${
                            row.F === 1 
                              ? 'bg-[#285C49] text-white' 
                              : 'bg-[#2B6CB0] text-white'
                          }`}>
                            {row.F}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className={row.F === 1 ? 'font-bold text-[#285C49]' : 'text-gray-400'}>
                            {row.minterm}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className={row.F === 0 ? 'font-bold text-[#2B6CB0]' : 'text-gray-400'}>
                            {row.maxterm}
                          </span>
                        </td>
                        <td className="p-3 text-[#5F6C64] font-sans text-xs">
                          {row.note}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Two Derivations: SOP (Green) vs POS (Blue) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* SOP Card */}
              <div className="p-5 rounded-xl bg-[#EBF3ED]/40 border-2 border-[#285C49]/30 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#285C49]"></div>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#285C49]">
                    {data.startHere.alarmDemo.sopDerivation.title}
                  </h4>
                </div>
                <p className="text-xs text-[#5F6C64] leading-relaxed">
                  {data.startHere.alarmDemo.sopDerivation.explanation}
                </p>
                <div className="p-3 rounded-lg bg-white border border-[#285C49]/20 font-mono text-xs space-y-1">
                  <div className="text-[#5F6C64]">Expanded Minterm Sum:</div>
                  <div className="font-bold text-[#285C49] text-sm whitespace-nowrap overflow-x-auto">
                    {data.startHere.alarmDemo.sopDerivation.expandedExpr}
                  </div>
                  <div className="text-[#5F6C64] pt-1">Compact Sigma Notation:</div>
                  <div className="font-bold text-[#285C49] text-sm">
                    {data.startHere.alarmDemo.sopDerivation.compactNotation}
                  </div>
                </div>
              </div>

              {/* POS Card */}
              <div className="p-5 rounded-xl bg-[#EBF8FF]/50 border-2 border-[#2B6CB0]/30 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2B6CB0]"></div>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#2B6CB0]">
                    {data.startHere.alarmDemo.posDerivation.title}
                  </h4>
                </div>
                <p className="text-xs text-[#5F6C64] leading-relaxed">
                  {data.startHere.alarmDemo.posDerivation.explanation}
                </p>
                <div className="p-3 rounded-lg bg-white border border-[#2B6CB0]/20 font-mono text-xs space-y-1">
                  <div className="text-[#5F6C64]">Expanded Maxterm Product:</div>
                  <div className="font-bold text-[#2B6CB0] text-sm whitespace-nowrap overflow-x-auto">
                    {data.startHere.alarmDemo.posDerivation.expandedExpr}
                  </div>
                  <div className="text-[#5F6C64] pt-1">Compact Pi Notation:</div>
                  <div className="font-bold text-[#2B6CB0] text-sm">
                    {data.startHere.alarmDemo.posDerivation.compactNotation}
                  </div>
                </div>
              </div>
            </div>

            {/* Takeaway Box */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] text-xs text-[#293B32] space-y-1">
              <span className="font-mono font-bold text-[#285C49] uppercase tracking-wider block">
                Fundamental Mathematical Takeaway
              </span>
              <p className="leading-relaxed">
                {data.startHere.alarmDemo.takeaway}
              </p>
            </div>
          </div>

          {/* MAIN LEARNING-FLOW ILLUSTRATION */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#285C49] block mb-1">
                Instructional Workflow
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#293B32]">
                {data.startHere.learningFlow.title}
              </h3>
              <p className="text-sm text-[#5F6C64] mt-1">
                {data.startHere.learningFlow.subtitle}
              </p>
            </div>

            {/* 5-step horizontal flow */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {data.startHere.learningFlow.steps.map((st, idx) => (
                <div 
                  key={st.step}
                  className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] relative flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-[#285C49] text-white text-xs font-mono font-bold flex items-center justify-center">
                      {st.step}
                    </span>
                    {idx < 4 && (
                      <ArrowRight className="w-4 h-4 text-[#5F6C64] hidden lg:block" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-mono text-xs font-bold text-[#293B32]">
                      {st.name}
                    </h4>
                    <p className="text-xs text-[#5F6C64] mt-1 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CORE FUNDAMENTALS (11 Cards) */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#285C49] block mb-1">
                Academic Terminology
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#293B32]">
                11 Core Fundamentals of Boolean Function Representation
              </h3>
              <p className="text-sm text-[#5F6C64] mt-1">
                Master these exam-ready definitions and understand their practical meaning in truth tables.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.startHere.coreFundamentals.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2.5 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-[#285C49] bg-[#EBF3ED] px-2 py-0.5 rounded">
                        #{idx + 1}
                      </span>
                    </div>
                    <h4 className="font-editorial text-base font-bold text-[#293B32]">
                      {item.term}
                    </h4>
                    <p className="text-xs text-[#293B32] font-medium leading-relaxed">
                      {item.definition}
                    </p>
                    <p className="text-xs text-[#5F6C64] leading-relaxed">
                      {item.plainExplanation}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#DCE7E1] space-y-1 text-[11px] font-mono">
                    <div className="text-[#285C49]">
                      <strong>Example: </strong>{item.smallExample}
                    </div>
                    <div className="text-[#5F6C64]">
                      <strong>Truth Table: </strong>{item.truthTableMeaning}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FUNCTION DOMAIN THEORY: 2^n vs 2^(2^n) */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#285C49] block mb-1">
                Combinatorial Foundations
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#293B32]">
                Input Combinations (2^n) vs Total Possible Boolean Functions (2^(2^n))
              </h3>
              <p className="text-sm text-[#5F6C64] mt-1">
                {data.startHere.functionDomainTheory.explanation}
              </p>
            </div>

            {/* Formula Callout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1]">
                <span className="text-[#5F6C64] block">Truth Table Rows:</span>
                <span className="font-bold text-sm text-[#285C49]">
                  {data.startHere.functionDomainTheory.inputCombinationsFormula}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1]">
                <span className="text-[#5F6C64] block">Possible Boolean Functions:</span>
                <span className="font-bold text-sm text-[#2B6CB0]">
                  {data.startHere.functionDomainTheory.possibleFunctionsFormula}
                </span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-[#DCE7E1]">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#FAF8F5] border-b border-[#DCE7E1] text-[#293B32]">
                  <tr>
                    <th className="p-3">Variables (n)</th>
                    <th className="p-3">Input Rows (2^n)</th>
                    <th className="p-3">Possible Functions</th>
                    <th className="p-3">Mathematical Calculation</th>
                    <th className="p-3">Engineering Relevance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DCE7E1]">
                  {data.startHere.functionDomainTheory.table.map((row) => (
                    <tr key={row.variables} className="hover:bg-[#FAF8F5]/50">
                      <td className="p-3 font-bold text-[#285C49]">{row.variables}</td>
                      <td className="p-3 font-bold text-[#293B32]">{row.inputRows}</td>
                      <td className="p-3 font-bold text-[#2B6CB0]">
                        {row.possibleFunctions.toLocaleString()}
                      </td>
                      <td className="p-3 text-[#5F6C64]">{row.functionFormula}</td>
                      <td className="p-3 text-[#5F6C64] font-sans text-xs">{row.examples}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Optional Derivation Note */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] text-xs text-[#5F6C64] space-y-1">
              <span className="font-mono font-bold text-[#293B32] uppercase tracking-wider block">
                Combinatorial Derivation
              </span>
              <p className="leading-relaxed">
                {data.startHere.functionDomainTheory.derivation}
              </p>
            </div>
          </div>

          {/* CURATED VIDEO CARD */}
          <CuratedVideoCard videoKey="canonical-forms" />

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: MINTERMS AND MAXTERMS                                              */}
      {/* ========================================================================= */}
      {activeTab === 'minterms-maxterms' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* DEFINITIONS & POLARITY RULES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Minterm Definition Card (Green) */}
            <div className="p-6 rounded-2xl bg-white border-2 border-[#285C49]/30 shadow-soft space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[#DCE7E1]">
                <div className="w-3 h-3 rounded-full bg-[#285C49]"></div>
                <h3 className="font-editorial text-lg sm:text-xl font-bold text-[#285C49]">
                  {data.mintermsAndMaxterms.mintermDefinition.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#293B32] leading-relaxed">
                {data.mintermsAndMaxterms.mintermDefinition.definition}
              </p>

              {/* Polarity Rule */}
              <div className="p-3.5 rounded-xl bg-[#EBF3ED] border border-[#285C49]/20 font-mono text-xs space-y-1">
                <span className="font-bold text-[#285C49] block">
                  Minterm Construction Polarity Rule:
                </span>
                <span className="text-[#293B32]">
                  {data.mintermsAndMaxterms.mintermDefinition.polarityRule}
                </span>
              </div>

              {/* Example */}
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] font-mono text-xs space-y-1.5">
                <div className="text-[#5F6C64]">
                  Example for {data.mintermsAndMaxterms.mintermDefinition.exampleCalculation.inputs} (Index {data.mintermsAndMaxterms.mintermDefinition.exampleCalculation.index}):
                </div>
                <div className="text-[#285C49]">
                  {data.mintermsAndMaxterms.mintermDefinition.exampleCalculation.calculation}
                </div>
                <div className="font-bold text-sm text-[#285C49]">
                  Result: {data.mintermsAndMaxterms.mintermDefinition.exampleCalculation.resultSymbol} = {data.mintermsAndMaxterms.mintermDefinition.exampleCalculation.resultTerm}
                </div>
                <div className="text-[#5F6C64] font-sans text-xs pt-1 border-t border-[#DCE7E1]">
                  <strong>Proof: </strong>{data.mintermsAndMaxterms.mintermDefinition.exampleCalculation.proof}
                </div>
              </div>
            </div>

            {/* Maxterm Definition Card (Blue) */}
            <div className="p-6 rounded-2xl bg-white border-2 border-[#2B6CB0]/30 shadow-soft space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[#DCE7E1]">
                <div className="w-3 h-3 rounded-full bg-[#2B6CB0]"></div>
                <h3 className="font-editorial text-lg sm:text-xl font-bold text-[#2B6CB0]">
                  {data.mintermsAndMaxterms.maxtermDefinition.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#293B32] leading-relaxed">
                {data.mintermsAndMaxterms.maxtermDefinition.definition}
              </p>

              {/* Polarity Rule */}
              <div className="p-3.5 rounded-xl bg-[#EBF8FF] border border-[#2B6CB0]/20 font-mono text-xs space-y-1">
                <span className="font-bold text-[#2B6CB0] block">
                  Maxterm Construction Polarity Rule:
                </span>
                <span className="text-[#293B32]">
                  {data.mintermsAndMaxterms.maxtermDefinition.polarityRule}
                </span>
              </div>

              {/* Example */}
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] font-mono text-xs space-y-1.5">
                <div className="text-[#5F6C64]">
                  Example for {data.mintermsAndMaxterms.maxtermDefinition.exampleCalculation.inputs} (Index {data.mintermsAndMaxterms.maxtermDefinition.exampleCalculation.index}):
                </div>
                <div className="text-[#2B6CB0]">
                  {data.mintermsAndMaxterms.maxtermDefinition.exampleCalculation.calculation}
                </div>
                <div className="font-bold text-sm text-[#2B6CB0]">
                  Result: {data.mintermsAndMaxterms.maxtermDefinition.exampleCalculation.resultSymbol} = {data.mintermsAndMaxterms.maxtermDefinition.exampleCalculation.resultTerm}
                </div>
                <div className="text-[#5F6C64] font-sans text-xs pt-1 border-t border-[#DCE7E1]">
                  <strong>Proof: </strong>{data.mintermsAndMaxterms.maxtermDefinition.exampleCalculation.proof}
                </div>
              </div>
            </div>

          </div>

          {/* SIDE-BY-SIDE VISUAL DEMONSTRATION & COMPLEMENT RELATION */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#285C49] block mb-1">
                Comparative Analysis
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#293B32]">
                {data.mintermsAndMaxterms.sideBySideComparison.title}
              </h3>
              <p className="text-xs font-mono text-[#5F6C64] mt-1">
                Input Pattern: {data.mintermsAndMaxterms.sideBySideComparison.inputRow}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Minterm m5 */}
              <div className="p-4 rounded-xl bg-[#EBF3ED]/50 border border-[#285C49]/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#285C49] uppercase">
                    Minterm Formulation
                  </span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#285C49] text-white font-bold">
                    {data.mintermsAndMaxterms.sideBySideComparison.minterm.symbol}
                  </span>
                </div>
                <div className="font-mono text-xl font-bold text-[#285C49]">
                  {data.mintermsAndMaxterms.sideBySideComparison.minterm.term}
                </div>
                <div className="text-xs font-mono text-[#5F6C64] space-y-1">
                  <div>Operation: {data.mintermsAndMaxterms.sideBySideComparison.minterm.operation}</div>
                  <div className="text-[#285C49] font-bold">
                    Target: {data.mintermsAndMaxterms.sideBySideComparison.minterm.targetValue}
                  </div>
                </div>
              </div>

              {/* Maxterm M5 */}
              <div className="p-4 rounded-xl bg-[#EBF8FF]/50 border border-[#2B6CB0]/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#2B6CB0] uppercase">
                    Maxterm Formulation
                  </span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#2B6CB0] text-white font-bold">
                    {data.mintermsAndMaxterms.sideBySideComparison.maxterm.symbol}
                  </span>
                </div>
                <div className="font-mono text-xl font-bold text-[#2B6CB0]">
                  {data.mintermsAndMaxterms.sideBySideComparison.maxterm.term}
                </div>
                <div className="text-xs font-mono text-[#5F6C64] space-y-1">
                  <div>Operation: {data.mintermsAndMaxterms.sideBySideComparison.maxterm.operation}</div>
                  <div className="text-[#2B6CB0] font-bold">
                    Target: {data.mintermsAndMaxterms.sideBySideComparison.maxterm.targetValue}
                  </div>
                </div>
              </div>
            </div>

            {/* De Morgan Complement Relationship */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#293B32] uppercase tracking-wider">
                  The De Morgan Complement Relationship
                </span>
                <span className="font-mono text-xs font-bold text-[#285C49]">
                  {data.mintermsAndMaxterms.sideBySideComparison.complementRelationship.formula}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-white border border-[#DCE7E1] font-mono text-xs text-[#293B32]">
                Derivation: {data.mintermsAndMaxterms.sideBySideComparison.complementRelationship.derivation}
              </div>
              <p className="text-xs text-[#5F6C64] leading-relaxed">
                {data.mintermsAndMaxterms.sideBySideComparison.complementRelationship.note}
              </p>
            </div>
          </div>

          {/* VARIABLE ORDERING AND POSITIONAL WEIGHTING */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#285C49] block mb-1">
                Standard Convention
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#293B32]">
                {data.mintermsAndMaxterms.variableOrderingConvention.title}
              </h3>
              <p className="text-xs text-[#5F6C64] mt-1">
                {data.mintermsAndMaxterms.variableOrderingConvention.rule}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1">
                <span className="font-bold text-[#285C49] block">
                  2 Variables: {data.mintermsAndMaxterms.variableOrderingConvention.twoVar.vars}
                </span>
                <div className="text-sm font-bold text-[#293B32]">
                  {data.mintermsAndMaxterms.variableOrderingConvention.twoVar.formula}
                </div>
                <div className="text-[#5F6C64] text-[11px] pt-1 border-t border-[#DCE7E1]">
                  MSB: {data.mintermsAndMaxterms.variableOrderingConvention.twoVar.msb} | LSB: {data.mintermsAndMaxterms.variableOrderingConvention.twoVar.lsb}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1">
                <span className="font-bold text-[#285C49] block">
                  3 Variables: {data.mintermsAndMaxterms.variableOrderingConvention.threeVar.vars}
                </span>
                <div className="text-sm font-bold text-[#293B32]">
                  {data.mintermsAndMaxterms.variableOrderingConvention.threeVar.formula}
                </div>
                <div className="text-[#5F6C64] text-[11px] pt-1 border-t border-[#DCE7E1]">
                  MSB: {data.mintermsAndMaxterms.variableOrderingConvention.threeVar.msb} | LSB: {data.mintermsAndMaxterms.variableOrderingConvention.threeVar.lsb}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1">
                <span className="font-bold text-[#285C49] block">
                  4 Variables: {data.mintermsAndMaxterms.variableOrderingConvention.fourVar.vars}
                </span>
                <div className="text-sm font-bold text-[#293B32]">
                  {data.mintermsAndMaxterms.variableOrderingConvention.fourVar.formula}
                </div>
                <div className="text-[#5F6C64] text-[11px] pt-1 border-t border-[#DCE7E1]">
                  MSB: {data.mintermsAndMaxterms.variableOrderingConvention.fourVar.msb} | LSB: {data.mintermsAndMaxterms.variableOrderingConvention.fourVar.lsb}
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{data.mintermsAndMaxterms.variableOrderingConvention.caution}</span>
            </div>
          </div>

          {/* INTERACTIVE INDEX TABLE EXPLORER (2, 3, and 4 variables) */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#DCE7E1]">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#285C49] block mb-1">
                  Interactive Learning Tool
                </span>
                <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#293B32]">
                  Complete Minterm and Maxterm Index Reference
                </h3>
                <p className="text-xs text-[#5F6C64] mt-0.5">
                  Click any row to inspect its exact bit-by-bit term construction.
                </p>
              </div>

              {/* Table Selector */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] self-start sm:self-auto font-mono text-xs">
                {[
                  { id: '2var', label: '2 Variables (4 rows)' },
                  { id: '3var', label: '3 Variables (8 rows)' },
                  { id: '4var', label: '4 Variables (16 rows)' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveVarTable(tab.id);
                      setSelectedRowIndex(0); // Reset selection to row 0
                    }}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                      activeVarTable === tab.id
                        ? 'bg-[#285C49] text-white shadow-2xs'
                        : 'text-[#5F6C64] hover:text-[#293B32]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Row Bit-by-Bit Inspector Card */}
            {selectedRowData && (
              <div className="p-5 rounded-xl bg-[#FAF8F5] border-2 border-[#285C49] space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#285C49] text-white">
                      Row {selectedRowData.index} Selected
                    </span>
                    <span className="font-mono text-xs font-bold text-[#293B32]">
                      Binary Pattern: {selectedRowData.bin}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#5F6C64]">
                    Formula: (m{selectedRowData.index})' = M{selectedRowData.index}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                  {/* Minterm Construction breakdown */}
                  <div className="p-3.5 rounded-lg bg-white border border-[#285C49]/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#285C49]">
                        Minterm Construction ({selectedRowData.mintermSymbol})
                      </span>
                      <span className="text-sm font-bold text-[#285C49]">
                        {selectedRowData.mintermTerm}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#5F6C64] space-y-1">
                      <div>Rule: 0 {"->"} prime ('), 1 {"->"} unprimed</div>
                      <div className="text-[#285C49]">
                        Bits: {selectedRowData.bin.split('').map((b, i) => {
                          const vars = activeVarTable === '2var' ? ['A','B'] : activeVarTable === '4var' ? ['A','B','C','D'] : ['A','B','C'];
                          return `${vars[i]}=${b} (${b === '1' ? vars[i] : vars[i] + "'"})`;
                        }).join(' · ')}
                      </div>
                    </div>
                  </div>

                  {/* Maxterm Construction breakdown */}
                  <div className="p-3.5 rounded-lg bg-white border border-[#2B6CB0]/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#2B6CB0]">
                        Maxterm Construction ({selectedRowData.maxtermSymbol})
                      </span>
                      <span className="text-sm font-bold text-[#2B6CB0]">
                        ({selectedRowData.maxtermTerm})
                      </span>
                    </div>
                    <div className="text-[11px] text-[#5F6C64] space-y-1">
                      <div>Rule: 0 {"->"} unprimed, 1 {"->"} prime (')</div>
                      <div className="text-[#2B6CB0]">
                        Bits: {selectedRowData.bin.split('').map((b, i) => {
                          const vars = activeVarTable === '2var' ? ['A','B'] : activeVarTable === '4var' ? ['A','B','C','D'] : ['A','B','C'];
                          return `${vars[i]}=${b} (${b === '0' ? vars[i] : vars[i] + "'"})`;
                        }).join(' + ')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Complete Interactive Table */}
            <div className="overflow-x-auto rounded-xl border border-[#DCE7E1]">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#FAF8F5] border-b border-[#DCE7E1] text-[#293B32]">
                  <tr>
                    <th className="p-3">Index</th>
                    <th className="p-3">Binary Pattern</th>
                    {activeVarTable === '2var' && <>
                      <th className="p-3">A (MSB)</th>
                      <th className="p-3">B (LSB)</th>
                    </>}
                    {activeVarTable === '3var' && <>
                      <th className="p-3">A (MSB)</th>
                      <th className="p-3">B</th>
                      <th className="p-3">C (LSB)</th>
                    </>}
                    {activeVarTable === '4var' && <>
                      <th className="p-3">A</th>
                      <th className="p-3">B</th>
                      <th className="p-3">C</th>
                      <th className="p-3">D</th>
                    </>}
                    <th className="p-3 text-[#285C49]">Minterm (SOP)</th>
                    <th className="p-3 text-[#2B6CB0]">Maxterm (POS)</th>
                    <th className="p-3">Select</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DCE7E1]">
                  {currentRows.map((row) => {
                    const isSelected = row.index === selectedRowIndex;
                    return (
                      <tr 
                        key={row.index}
                        onClick={() => setSelectedRowIndex(row.index)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-[#EBF3ED]' : 'hover:bg-[#FAF8F5]'
                        }`}
                      >
                        <td className="p-3 font-bold text-[#293B32]">{row.index}</td>
                        <td className="p-3 font-bold">{row.bin}</td>
                        {activeVarTable === '2var' && <>
                          <td className="p-3">{row.A}</td>
                          <td className="p-3">{row.B}</td>
                        </>}
                        {activeVarTable === '3var' && <>
                          <td className="p-3">{row.A}</td>
                          <td className="p-3">{row.B}</td>
                          <td className="p-3">{row.C}</td>
                        </>}
                        {activeVarTable === '4var' && <>
                          <td className="p-3">{row.A}</td>
                          <td className="p-3">{row.B}</td>
                          <td className="p-3">{row.C}</td>
                          <td className="p-3">{row.D}</td>
                        </>}
                        <td className="p-3 font-bold text-[#285C49]">
                          {row.mintermSymbol} = {row.mintermTerm}
                        </td>
                        <td className="p-3 font-bold text-[#2B6CB0]">
                          {row.maxtermSymbol} = ({row.maxtermTerm})
                        </td>
                        <td className="p-3">
                          <span className={`text-[11px] px-2 py-0.5 rounded font-bold ${
                            isSelected 
                              ? 'bg-[#285C49] text-white' 
                              : 'bg-white border border-[#DCE7E1] text-[#5F6C64]'
                          }`}>
                            {isSelected ? 'Active' : 'Inspect'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: CANONICAL AND STANDARD FORMS                                       */}
      {/* ========================================================================= */}
      {activeTab === 'canonical-forms' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* TERMINOLOGY DEFINITIONS */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#285C49] block mb-1">
                Structural Taxonomy
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#293B32]">
                SOP, POS, Canonical SOP and Canonical POS
              </h3>
              <p className="text-sm text-[#5F6C64] mt-1">
                Distinguish general algebraic expressions from true canonical standard forms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.canonicalForms.terminologyDefinitions.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                  <h4 className="font-editorial text-base font-bold text-[#293B32]">
                    {item.term}
                  </h4>
                  <p className="text-xs text-[#293B32] leading-relaxed">
                    {item.definition}
                  </p>
                  <div className="p-2.5 rounded bg-white border border-[#DCE7E1] font-mono text-xs">
                    <span className="text-[#5F6C64]">Example: </span>
                    <span className="font-bold text-[#285C49]">{item.example}</span>
                  </div>
                  <div className="text-[11px] font-mono text-[#5F6C64]">
                    {item.standardStatus}
                  </div>
                </div>
              ))}
            </div>

            {/* Textbook Note */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border-l-4 border-[#285C49] text-xs text-[#5F6C64] space-y-1">
              <span className="font-mono font-bold text-[#293B32] uppercase tracking-wider block">
                Academic Terminology Clarification
              </span>
              <p className="leading-relaxed">
                {data.canonicalForms.textbookNote}
              </p>
            </div>
          </div>

          {/* CANONICAL VS NON-CANONICAL EXAMPLES */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#285C49] block mb-1">
                Visual Comparison
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#293B32]">
                {data.canonicalForms.canonicalVsNonCanonical.title}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* SOP Comparison */}
              <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-4">
                <span className="font-mono text-xs font-bold text-[#285C49] uppercase tracking-wider block">
                  Sum of Products Comparison (Variables: A, B, C)
                </span>
                
                {/* Non-Canonical SOP */}
                <div className="p-3.5 rounded-lg bg-white border border-red-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-red-700">
                      Non-Canonical (Standard SOP)
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-100 text-red-800">
                      Incomplete Length
                    </span>
                  </div>
                  <div className="font-mono text-sm font-bold text-[#293B32]">
                    {data.canonicalForms.canonicalVsNonCanonical.sop.nonCanonical.expr}
                  </div>
                  <div className="text-xs text-[#5F6C64]">
                    {data.canonicalForms.canonicalVsNonCanonical.sop.nonCanonical.flaw}
                  </div>
                </div>

                {/* Canonical SOP */}
                <div className="p-3.5 rounded-lg bg-white border border-[#285C49] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#285C49]">
                      Canonical SOP (Sum of Minterms)
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EBF3ED] text-[#285C49]">
                      Complete Minterms
                    </span>
                  </div>
                  <div className="font-mono text-xs font-bold text-[#285C49] whitespace-nowrap overflow-x-auto">
                    {data.canonicalForms.canonicalVsNonCanonical.sop.canonical.expr}
                  </div>
                  <div className="text-xs text-[#5F6C64]">
                    {data.canonicalForms.canonicalVsNonCanonical.sop.canonical.merit}
                  </div>
                </div>
              </div>

              {/* POS Comparison */}
              <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-4">
                <span className="font-mono text-xs font-bold text-[#2B6CB0] uppercase tracking-wider block">
                  Product of Sums Comparison (Variables: A, B, C)
                </span>
                
                {/* Non-Canonical POS */}
                <div className="p-3.5 rounded-lg bg-white border border-red-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-red-700">
                      Non-Canonical (Standard POS)
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-100 text-red-800">
                      Incomplete Length
                    </span>
                  </div>
                  <div className="font-mono text-sm font-bold text-[#293B32]">
                    {data.canonicalForms.canonicalVsNonCanonical.pos.nonCanonical.expr}
                  </div>
                  <div className="text-xs text-[#5F6C64]">
                    {data.canonicalForms.canonicalVsNonCanonical.pos.nonCanonical.flaw}
                  </div>
                </div>

                {/* Canonical POS */}
                <div className="p-3.5 rounded-lg bg-white border border-[#2B6CB0] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#2B6CB0]">
                      Canonical POS (Product of Maxterms)
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EBF8FF] text-[#2B6CB0]">
                      Complete Maxterms
                    </span>
                  </div>
                  <div className="font-mono text-xs font-bold text-[#2B6CB0] whitespace-nowrap overflow-x-auto">
                    {data.canonicalForms.canonicalVsNonCanonical.pos.canonical.expr}
                  </div>
                  <div className="text-xs text-[#5F6C64]">
                    {data.canonicalForms.canonicalVsNonCanonical.pos.canonical.merit}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 7-STEP PROCEDURES: CANONICAL SOP & CANONICAL POS */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#285C49] block mb-1">
                Algorithmic Procedures
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#293B32]">
                Converting Truth Tables to Canonical Expressions
              </h3>
              <p className="text-sm text-[#5F6C64] mt-1">
                Follow these precise 7-step checklists to extract exact canonical forms without omissions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* SOP 7-Step Procedure */}
              <div className="p-5 rounded-xl bg-[#EBF3ED]/40 border border-[#285C49]/30 space-y-3">
                <span className="font-mono text-xs font-bold text-[#285C49] uppercase tracking-wider block">
                  Canonical SOP Extraction Algorithm
                </span>
                <div className="space-y-2">
                  {data.canonicalForms.procedures.sopProcedure.map((st) => (
                    <div key={st.step} className="p-2.5 rounded-lg bg-white border border-[#285C49]/20 flex items-start gap-2.5 text-xs">
                      <span className="w-5 h-5 rounded-full bg-[#285C49] text-white font-mono font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
                        {st.step}
                      </span>
                      <div>
                        <strong className="text-[#293B32]">{st.title}: </strong>
                        <span className="text-[#5F6C64]">{st.action}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* POS 7-Step Procedure */}
              <div className="p-5 rounded-xl bg-[#EBF8FF]/40 border border-[#2B6CB0]/30 space-y-3">
                <span className="font-mono text-xs font-bold text-[#2B6CB0] uppercase tracking-wider block">
                  Canonical POS Extraction Algorithm
                </span>
                <div className="space-y-2">
                  {data.canonicalForms.procedures.posProcedure.map((st) => (
                    <div key={st.step} className="p-2.5 rounded-lg bg-white border border-[#2B6CB0]/20 flex items-start gap-2.5 text-xs">
                      <span className="w-5 h-5 rounded-full bg-[#2B6CB0] text-white font-mono font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
                        {st.step}
                      </span>
                      <div>
                        <strong className="text-[#293B32]">{st.title}: </strong>
                        <span className="text-[#5F6C64]">{st.action}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SYNCHRONIZED TRUTH TABLE COMPARISON: F(A, B, C) = C */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#285C49] block mb-1">
                Exemplar Truth Table
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#293B32]">
                {data.canonicalForms.synchronizedTableDemo.title}
              </h3>
              <p className="text-sm text-[#5F6C64] mt-1">
                {data.canonicalForms.synchronizedTableDemo.subtitle}
              </p>
            </div>

            {/* Synchronized Table */}
            <div className="overflow-x-auto rounded-xl border border-[#DCE7E1]">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#FAF8F5] border-b border-[#DCE7E1] text-[#293B32]">
                  <tr>
                    <th className="p-3">Index</th>
                    <th className="p-3">ABC</th>
                    <th className="p-3 font-bold text-center">Output F</th>
                    <th className="p-3">Selected For</th>
                    <th className="p-3">Formulated Term</th>
                    <th className="p-3">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DCE7E1]">
                  {data.canonicalForms.synchronizedTableDemo.rows.map((row) => (
                    <tr 
                      key={row.index}
                      className={row.F === 1 ? 'bg-[#EBF3ED]/60' : 'bg-[#EBF8FF]/60'}
                    >
                      <td className="p-3 font-bold text-[#293B32]">Row {row.index}</td>
                      <td className="p-3">{row.bin}</td>
                      <td className="p-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded font-bold ${
                          row.F === 1 ? 'bg-[#285C49] text-white' : 'bg-[#2B6CB0] text-white'
                        }`}>
                          {row.F}
                        </span>
                      </td>
                      <td className="p-3 font-bold">
                        {row.selectedFor}
                      </td>
                      <td className="p-3 font-bold">
                        <span className={row.F === 1 ? 'text-[#285C49]' : 'text-[#2B6CB0]'}>
                          {row.term}
                        </span>
                      </td>
                      <td className="p-3 text-[#5F6C64]">{row.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Expressions & Proof */}
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-[#EBF3ED]/50 border border-[#285C49]/30">
                <span className="font-bold text-[#285C49] block">Extracted Canonical SOP:</span>
                <span className="text-[#293B32] font-bold text-sm block whitespace-nowrap overflow-x-auto">
                  {data.canonicalForms.synchronizedTableDemo.canonicalSOPResult}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#EBF8FF]/50 border border-[#2B6CB0]/30">
                <span className="font-bold text-[#2B6CB0] block">Extracted Canonical POS:</span>
                <span className="text-[#293B32] font-bold text-sm block whitespace-nowrap overflow-x-auto">
                  {data.canonicalForms.synchronizedTableDemo.canonicalPOSResult}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] font-sans text-xs text-[#5F6C64] leading-relaxed">
                <strong className="text-[#293B32] font-mono block mb-1">Functional Equivalence Verification:</strong>
                {data.canonicalForms.synchronizedTableDemo.simplificationProof}
              </div>
            </div>
          </div>

          {/* COMPLEMENTARY INDEX SETS */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#285C49] block mb-1">
                Set-Theoretic Properties
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#293B32]">
                {data.canonicalForms.complementaryIndexSets.title}
              </h3>
              <p className="text-xs font-mono text-[#5F6C64] mt-1">
                {data.canonicalForms.complementaryIndexSets.universeFormula}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
              {data.canonicalForms.complementaryIndexSets.dualFormulas.map((f, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                  <span className="font-bold text-[#285C49] block text-[11px]">
                    {f.name}
                  </span>
                  <div className="text-sm font-bold text-[#293B32] whitespace-nowrap overflow-x-auto">
                    {f.formula}
                  </div>
                  <p className="text-[11px] font-sans text-[#5F6C64] leading-relaxed">
                    {f.meaning}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{data.canonicalForms.complementaryIndexSets.distinctionWarning}</span>
            </div>
          </div>

          {/* CONSTANT FUNCTIONS & FEATURE COMPARISON */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Constant Functions */}
            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
              <h4 className="font-editorial text-lg font-bold text-[#293B32]">
                {data.canonicalForms.constantFunctions.title}
              </h4>
              
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1">
                  <span className="font-bold text-[#293B32]">Constant 0 (F = 0):</span>
                  <div className="text-[#285C49]">SOP: {data.canonicalForms.constantFunctions.constantZero.mintermSet}</div>
                  <div className="text-[#2B6CB0]">POS: {data.canonicalForms.constantFunctions.constantZero.maxtermSet}</div>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1">
                  <span className="font-bold text-[#293B32]">Constant 1 (F = 1):</span>
                  <div className="text-[#285C49]">SOP: {data.canonicalForms.constantFunctions.constantOne.mintermSet}</div>
                  <div className="text-[#2B6CB0]">POS: {data.canonicalForms.constantFunctions.constantOne.maxtermSet}</div>
                </div>
              </div>

              <p className="text-xs text-[#5F6C64] leading-relaxed">
                {data.canonicalForms.constantFunctions.formalConventions}
              </p>
            </div>

            {/* Feature Comparison Table */}
            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
              <h4 className="font-editorial text-lg font-bold text-[#293B32]">
                Canonical SOP vs Canonical POS Summary
              </h4>

              <div className="overflow-x-auto rounded-xl border border-[#DCE7E1]">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#FAF8F5] border-b border-[#DCE7E1] text-[#293B32]">
                    <tr>
                      <th className="p-2.5">Feature</th>
                      <th className="p-2.5 text-[#285C49]">Canonical SOP</th>
                      <th className="p-2.5 text-[#2B6CB0]">Canonical POS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DCE7E1]">
                    {data.canonicalForms.featureComparisonTable.map((row, idx) => (
                      <tr key={idx}>
                        <td className="p-2.5 font-bold text-[#293B32]">{row.feature}</td>
                        <td className="p-2.5 text-[#285C49]">{row.canonicalSOP}</td>
                        <td className="p-2.5 text-[#2B6CB0]">{row.canonicalPOS}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: WORKED MODELS                                                      */}
      {/* ========================================================================= */}
      {activeTab === 'worked-models' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Header & Filter Controls */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#285C49] block mb-1">
                  Step-by-Step Mastery
                </span>
                <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#293B32]">
                  15 Verified Worked Problem Models
                </h3>
                <p className="text-xs text-[#5F6C64] mt-0.5">
                  14 core syllabus models plus 1 combinatorial challenge problem with full step-by-step transformations.
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] self-start sm:self-auto font-mono text-xs">
                {['All', 'Basic', 'Intermediate', 'Advanced', 'Challenge'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setModelFilter(lvl)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                      modelFilter === lvl
                        ? 'bg-[#285C49] text-white shadow-2xs'
                        : 'text-[#5F6C64] hover:text-[#293B32]'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* List of Models */}
          <div className="space-y-4">
            {filteredModels.map((model) => {
              const isExpanded = !!expandedModels[model.id];
              return (
                <div 
                  key={model.id}
                  className="rounded-2xl bg-white border border-[#DCE7E1] shadow-soft overflow-hidden transition-all"
                >
                  {/* Model Header */}
                  <div 
                    onClick={() => toggleModel(model.id)}
                    className="p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer hover:bg-[#FAF8F5] transition-colors"
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#DCE7E1] text-[#285C49]">
                          {model.id}
                        </span>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          model.level === 'Basic' ? 'bg-[#EBF3ED] text-[#285C49]' :
                          model.level === 'Intermediate' ? 'bg-[#EBF8FF] text-[#2B6CB0]' :
                          model.level === 'Advanced' ? 'bg-[#FEF3C7] text-[#92400E]' :
                          'bg-[#F3E8FF] text-[#6B21A8]'
                        }`}>
                          {model.level}
                        </span>
                        <span className="text-xs font-mono text-[#5F6C64]">
                          Declared: {model.variables}
                        </span>
                      </div>
                      <h4 className="font-editorial text-lg font-bold text-[#293B32]">
                        {model.title}
                      </h4>
                      <p className="text-xs text-[#5F6C64] font-mono">
                        {model.problem}
                      </p>
                    </div>

                    <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] flex items-center justify-center text-[#5F6C64] flex-shrink-0 mt-1">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>

                  {/* Expanded Solution Body */}
                  {isExpanded && (
                    <div className="p-5 sm:p-6 pt-0 border-t border-[#DCE7E1] space-y-5 animate-fadeIn">
                      
                      {/* Solution Steps */}
                      <div className="space-y-2.5 pt-4">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#285C49] block">
                          Numbered Solution Sequence
                        </span>
                        <div className="space-y-2">
                          {model.solutionSteps.map((st) => (
                            <div 
                              key={st.step}
                              className="p-3 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1"
                            >
                              <div className="flex items-center justify-between text-xs font-mono">
                                <span className="font-bold text-[#285C49]">
                                  Step {st.step}: {st.rule}
                                </span>
                              </div>
                              <div className="font-mono text-xs sm:text-sm font-bold text-[#293B32] whitespace-nowrap overflow-x-auto py-0.5">
                                {st.expr}
                              </div>
                              <p className="text-xs text-[#5F6C64] font-sans">
                                {st.reason}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Final Answer Banner */}
                      <div className="p-4 rounded-xl bg-[#EBF3ED] border border-[#285C49]/30 flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#285C49] flex-shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#285C49] block">
                            Verified Academic Result
                          </span>
                          <div className="font-mono text-xs sm:text-sm font-bold text-[#285C49] whitespace-nowrap overflow-x-auto">
                            {model.finalAnswer}
                          </div>
                        </div>
                      </div>

                      {/* Verification & Pitfall */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                        <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1">
                          <span className="font-mono font-bold text-[#293B32] block">
                            Exhaustive Verification:
                          </span>
                          <p className="text-[#5F6C64] leading-relaxed">
                            {model.verification}
                          </p>
                        </div>
                        {model.pitfall && (
                          <div className="p-3.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] space-y-1 text-[#92400E]">
                            <span className="font-mono font-bold block">
                              Watch Out:
                            </span>
                            <p className="leading-relaxed">
                              {model.pitfall}
                            </p>
                          </div>
                        )}
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: CHEAT SHEET & MASTER REFERENCE                                     */}
      {/* ========================================================================= */}
      {activeTab === 'cheat-sheet' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Top Controls with Print */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#285C49] block mb-1">
                Quick Revision
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#293B32]">
                Minterms and Maxterms Master Cheat Sheet
              </h3>
              <p className="text-xs text-[#5F6C64] mt-0.5">
                Essential memory formulas, conversion checklists, and exam trap avoidance.
              </p>
            </div>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#DCE7E1] text-xs font-mono font-bold text-[#285C49] hover:bg-[#EBF3ED] transition-colors cursor-pointer self-start sm:self-auto"
            >
              <Printer className="w-4 h-4" />
              <span>Print Reference</span>
            </button>
          </div>

          {/* ONE-GLANCE MEMORY RULES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.cheatSheet.oneGlanceRules.map((rule, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white border border-[#DCE7E1] shadow-soft space-y-2">
                <span className="text-xs font-mono font-bold text-[#285C49] uppercase tracking-wider block">
                  {rule.concept}
                </span>
                <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] font-mono text-xs font-bold text-[#293B32]">
                  {rule.rule}
                </div>
                <p className="text-xs text-[#5F6C64] leading-relaxed">
                  {rule.tip}
                </p>
              </div>
            ))}
          </div>

          {/* CANONICAL CONVERSION CHECKLIST */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#285C49] block mb-0.5">
                  Pre-Exam Verification
                </span>
                <h4 className="font-editorial text-lg font-bold text-[#293B32]">
                  Canonical Conversion Quality Checklist
                </h4>
              </div>
              <span className="text-xs font-mono text-[#5F6C64]">
                {Object.values(checkedItems).filter(Boolean).length} of {data.cheatSheet.checklist.length} checked
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.cheatSheet.checklist.map((item, idx) => {
                const isChecked = !!checkedItems[idx];
                return (
                  <div 
                    key={idx}
                    onClick={() => toggleChecklist(idx)}
                    className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                      isChecked 
                        ? 'bg-[#EBF3ED]/60 border-[#285C49]' 
                        : 'bg-[#FAF8F5] border-[#DCE7E1] hover:bg-white'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      isChecked ? 'bg-[#285C49] text-white' : 'border border-[#DCE7E1] bg-white'
                    }`}>
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <span className={`text-xs ${isChecked ? 'text-[#293B32] font-medium' : 'text-[#5F6C64]'}`}>
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 10 COMMON EXAM MISTAKES */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#991B1B] block mb-1">
                Examination Traps
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#293B32]">
                10 Common Minterm and Maxterm Mistakes
              </h3>
              <p className="text-sm text-[#5F6C64] mt-1">
                Format: Incorrect Concept {"->"} Correct Formulation {"->"} Why
              </p>
            </div>

            <div className="space-y-3">
              {data.cheatSheet.commonExamMistakes.map((err, idx) => (
                <div 
                  key={err.id}
                  className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#FEE2E2] text-[#991B1B]">
                      Mistake #{idx + 1}
                    </span>
                    <h5 className="font-editorial text-base font-bold text-[#293B32]">
                      {err.title}
                    </h5>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono pt-1">
                    <div className="p-2.5 rounded-lg bg-[#FFF5F5] border border-red-200 text-red-900 space-y-0.5">
                      <span className="font-bold block text-red-700">Incorrect Thinking:</span>
                      <div>{err.incorrect}</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#EBF3ED] border border-[#285C49]/20 text-[#285C49] space-y-0.5">
                      <span className="font-bold block">Correct Academic Approach:</span>
                      <div>{err.correct}</div>
                    </div>
                  </div>

                  <p className="text-xs text-[#5F6C64] font-sans pt-1">
                    <strong>Why: </strong>{err.why}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: PRACTICE LAB                                                       */}
      {/* ========================================================================= */}
      {activeTab === 'practice-lab' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Header & Filter Controls */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#285C49] block mb-1">
                  Independent Verification
                </span>
                <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#293B32]">
                  Practice Lab: 24 Rigorously Verified Exercises
                </h3>
                <p className="text-xs text-[#5F6C64] mt-0.5">
                  6 Basic, 6 Intermediate, 8 Advanced, and 4 Challenge questions with 2-tier hints and full solutions.
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] self-start sm:self-auto font-mono text-xs">
                {['All', 'Basic', 'Intermediate', 'Advanced', 'Challenge'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setPracticeFilter(lvl)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                      practiceFilter === lvl
                        ? 'bg-[#285C49] text-white shadow-2xs'
                        : 'text-[#5F6C64] hover:text-[#293B32]'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Practice Questions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPractice.map((prob) => {
              const isSolutionOpen = !!revealedSolutions[prob.id];
              const isHint1Open = !!revealedHints[`${prob.id}_hint1`];
              const isHint2Open = !!revealedHints[`${prob.id}_hint2`];

              return (
                <div 
                  key={prob.id}
                  className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#DCE7E1] text-[#285C49]">
                          {prob.id}
                        </span>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          prob.difficulty === 'Basic' ? 'bg-[#EBF3ED] text-[#285C49]' :
                          prob.difficulty === 'Intermediate' ? 'bg-[#EBF8FF] text-[#2B6CB0]' :
                          prob.difficulty === 'Advanced' ? 'bg-[#FEF3C7] text-[#92400E]' :
                          'bg-[#F3E8FF] text-[#6B21A8]'
                        }`}>
                          {prob.difficulty}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-[#5F6C64]">
                        Vars: {prob.variables}
                      </span>
                    </div>

                    <p className="font-editorial text-base font-bold text-[#293B32]">
                      {prob.problem}
                    </p>

                    {/* Progressive Hints */}
                    <div className="space-y-2 pt-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => toggleHint(prob.id, 1)}
                          className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] text-[11px] font-mono font-bold text-[#285C49] hover:bg-[#EBF3ED] transition-colors cursor-pointer"
                        >
                          {isHint1Open ? 'Hide Hint 1' : 'Hint 1 (Conceptual)'}
                        </button>
                        <button
                          onClick={() => toggleHint(prob.id, 2)}
                          className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] text-[11px] font-mono font-bold text-[#2B6CB0] hover:bg-[#EBF8FF] transition-colors cursor-pointer"
                        >
                          {isHint2Open ? 'Hide Hint 2' : 'Hint 2 (Operational)'}
                        </button>
                      </div>

                      {isHint1Open && (
                        <div className="p-3 rounded-lg bg-[#EBF3ED]/40 border border-[#285C49]/20 text-xs text-[#285C49] font-sans">
                          <strong>Hint 1: </strong>{prob.hint1}
                        </div>
                      )}

                      {isHint2Open && (
                        <div className="p-3 rounded-lg bg-[#EBF8FF]/40 border border-[#2B6CB0]/20 text-xs text-[#2B6CB0] font-sans">
                          <strong>Hint 2: </strong>{prob.hint2}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Solution Reveal Toggle */}
                  <div className="pt-3 border-t border-[#DCE7E1] space-y-3">
                    <button
                      onClick={() => toggleSolution(prob.id)}
                      className="w-full py-2 px-3 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] text-xs font-mono font-bold text-[#285C49] hover:bg-[#EBF3ED] transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>{isSolutionOpen ? 'Hide Complete Solution' : 'Reveal Step-by-Step Solution'}</span>
                      {isSolutionOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {isSolutionOpen && (
                      <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3 animate-fadeIn">
                        <span className="font-mono text-xs font-bold text-[#285C49] uppercase tracking-wider block">
                          Step-by-Step Derivation
                        </span>
                        
                        <div className="space-y-1.5 font-mono text-xs">
                          {prob.solutionSteps.map((s) => (
                            <div key={s.step} className="p-2 rounded bg-white border border-[#DCE7E1] space-y-0.5">
                              <div className="text-[10px] text-[#5F6C64]">Step {s.step} ({s.law})</div>
                              <div className="font-bold text-[#293B32] whitespace-nowrap overflow-x-auto">
                                {s.expr}
                              </div>
                              <div className="text-[10px] text-[#5F6C64] font-sans">{s.reason}</div>
                            </div>
                          ))}
                        </div>

                        {/* Verified Answer */}
                        <div className="p-2.5 rounded-lg bg-[#EBF3ED] border border-[#285C49]/20 text-xs font-mono">
                          <span className="font-bold text-[#285C49] block text-[10px] uppercase">
                            Verified Result:
                          </span>
                          <span className="font-bold text-[#285C49] whitespace-nowrap overflow-x-auto block">
                            {prob.finalAnswer}
                          </span>
                        </div>

                        {/* Key Takeaway */}
                        <div className="text-[11px] text-[#5F6C64] font-sans">
                          <strong>Takeaway: </strong>{prob.keyTakeaway}
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
};
export default Section23View;
