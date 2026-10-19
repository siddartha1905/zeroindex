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
  Filter
} from 'lucide-react';
import KMapCheatSheet from './KMapCheatSheet';

/**
 * Section 2.5 View: Complete Karnaugh Map Module
 * Strictly zero em-dashes and zero en-dashes throughout.
 */

export const Section25View = ({ section }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showCheatSheet, setShowCheatSheet] = useState(false);
  const [previewMapSize, setPreviewMapSize] = useState('4var');

  if (!section) return null;

  const categories = [
    'All',
    '2-Variable K-Map',
    '3-Variable K-Map',
    '4-Variable K-Map',
    'Don\'t-Care Minimization',
    'Special Cases'
  ];

  const filteredModels = activeCategory === 'All'
    ? section.workedModels
    : section.workedModels.filter(m => m.category === activeCategory);

  return (
    <div className="space-y-8 text-left">
      {/* 1. Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-[#EBF3ED] text-[#285C49] border border-[#285C49]/20">
              Section {section.number}
            </span>
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
              {section.badge}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#5F6C64]">
            <Clock className="w-3.5 h-3.5" />
            <span>{section.estimatedReadTime}</span>
          </div>
        </div>

        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#293B32] leading-tight">
            {section.title}
          </h1>
          <p className="text-sm text-[#5F6C64] mt-2 leading-relaxed font-normal">
            {section.overview}
          </p>
        </div>

        {/* Data Science Callout */}
        <div className="p-4 rounded-xl bg-[#F4F7F4] border border-[#DCE7E1] flex items-start gap-3">
          <div className="p-2 rounded-lg bg-[#285C49] text-white flex-shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#285C49]">
              Feature Space Geometry & Dimensionality Reduction Context
            </h4>
            <p className="text-xs text-[#293B32]/90 leading-relaxed font-normal">
              {section.dataScienceConnection}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Interactive Map Geometry Preview */}
      <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#F2F7F4]">
          <div className="flex items-center gap-2">
            <Grid className="w-4 h-4 text-[#2E6F40]" />
            <h3 className="font-editorial text-lg font-bold text-[#1E293B]">
              1. Geometric Topography & Gray Code Adjacency
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-xl border border-[#DCE7E1]">
              {['2var', '3var', '4var'].map(size => (
                <button
                  key={size}
                  onClick={() => setPreviewMapSize(size)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    previewMapSize === size
                      ? 'bg-white text-[#2E6F40] shadow-xs'
                      : 'text-[#64748B] hover:text-[#1E293B]'
                  }`}
                >
                  {size === '2var' ? '2-Var (4 cells)' : size === '3var' ? '3-Var (8 cells)' : '4-Var (16 cells)'}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowCheatSheet(!showCheatSheet)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DCE7E1] bg-[#FAF8F5] hover:bg-[#F2F7F4] text-xs font-semibold text-[#2E6F40] transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{showCheatSheet ? 'Hide Cheat Sheet' : 'K-Map Cheat Sheet'}</span>
            </button>
          </div>
        </div>

        {showCheatSheet && (
          <KMapCheatSheet onClose={() => setShowCheatSheet(false)} />
        )}

        {/* Visual Matrix Display */}
        <div className="overflow-x-auto p-4 bg-[#FAF8F5] rounded-xl border border-[#DCE7E1]">
          {previewMapSize === '2var' && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#2E6F40]">2-Variable Map: Row A, Column B</span>
              <table className="border-collapse text-center text-xs font-mono">
                <thead>
                  <tr>
                    <th className="p-2 border border-[#DCE7E1] bg-white text-[#64748B]">A \ B</th>
                    <th className="p-2 border border-[#DCE7E1] bg-white text-[#2E6F40]">0</th>
                    <th className="p-2 border border-[#DCE7E1] bg-white text-[#2E6F40]">1</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border border-[#DCE7E1] bg-white font-bold text-[#4F46E5]">0</td>
                    <td className="p-3 border border-[#DCE7E1] bg-white font-bold">m0 (00)</td>
                    <td className="p-3 border border-[#DCE7E1] bg-white font-bold">m1 (01)</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-[#DCE7E1] bg-white font-bold text-[#4F46E5]">1</td>
                    <td className="p-3 border border-[#DCE7E1] bg-white font-bold">m2 (10)</td>
                    <td className="p-3 border border-[#DCE7E1] bg-white font-bold">m3 (11)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {previewMapSize === '3var' && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#2E6F40]">3-Variable Map: Row A, Columns BC (Gray Code: 00, 01, 11, 10)</span>
              <table className="border-collapse text-center text-xs font-mono">
                <thead>
                  <tr>
                    <th className="p-2 border border-[#DCE7E1] bg-white text-[#64748B]">A \ BC</th>
                    <th className="p-2 border border-[#DCE7E1] bg-white text-[#2E6F40]">00</th>
                    <th className="p-2 border border-[#DCE7E1] bg-white text-[#2E6F40]">01</th>
                    <th className="p-2 border border-[#DCE7E1] bg-[#FEF3C7] text-[#92400E]">11</th>
                    <th className="p-2 border border-[#DCE7E1] bg-white text-[#2E6F40]">10</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border border-[#DCE7E1] bg-white font-bold text-[#4F46E5]">0</td>
                    <td className="p-3 border border-[#DCE7E1] bg-white font-bold">m0 (000)</td>
                    <td className="p-3 border border-[#DCE7E1] bg-white font-bold">m1 (001)</td>
                    <td className="p-3 border border-[#DCE7E1] bg-[#FEF3C7] font-bold text-[#92400E]">m3 (011)</td>
                    <td className="p-3 border border-[#DCE7E1] bg-white font-bold">m2 (010)</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-[#DCE7E1] bg-white font-bold text-[#4F46E5]">1</td>
                    <td className="p-3 border border-[#DCE7E1] bg-white font-bold">m4 (100)</td>
                    <td className="p-3 border border-[#DCE7E1] bg-white font-bold">m5 (101)</td>
                    <td className="p-3 border border-[#DCE7E1] bg-[#FEF3C7] font-bold text-[#92400E]">m7 (111)</td>
                    <td className="p-3 border border-[#DCE7E1] bg-white font-bold">m6 (110)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {previewMapSize === '4var' && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#2E6F40]">4-Variable Map: Rows AB, Columns CD (Gray Code in both dimensions)</span>
              <table className="border-collapse text-center text-xs font-mono">
                <thead>
                  <tr>
                    <th className="p-2 border border-[#DCE7E1] bg-white text-[#64748B]">AB \ CD</th>
                    <th className="p-2 border border-[#DCE7E1] bg-white text-[#2E6F40]">00</th>
                    <th className="p-2 border border-[#DCE7E1] bg-white text-[#2E6F40]">01</th>
                    <th className="p-2 border border-[#DCE7E1] bg-[#FEF3C7] text-[#92400E]">11</th>
                    <th className="p-2 border border-[#DCE7E1] bg-white text-[#2E6F40]">10</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border border-[#DCE7E1] bg-white font-bold text-[#4F46E5]">00</td>
                    <td className="p-3 border border-[#DCE7E1] bg-[#EEF2FF] font-bold text-[#4F46E5]">m0 (0000)</td>
                    <td className="p-3 border border-[#DCE7E1] bg-white font-bold">m1 (0001)</td>
                    <td className="p-3 border border-[#DCE7E1] bg-white font-bold">m3 (0011)</td>
                    <td className="p-3 border border-[#DCE7E1] bg-[#EEF2FF] font-bold text-[#4F46E5]">m2 (0010)</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-[#DCE7E1] bg-white font-bold text-[#4F46E5]">01</td>
                    <td className="p-3 border border-[#DCE7E1] bg-white font-bold">m4 (0100)</td>
                    <td className="p-3 border border-[#DCE7E1] bg-white font-bold">m5 (0101)</td>
                    <td className="p-3 border border-[#DCE7E1] bg-white font-bold">m7 (0111)</td>
                    <td className="p-3 border border-[#DCE7E1] bg-white font-bold">m6 (0110)</td>
                  </tr>
                  <tr className="bg-[#FEF3C7]/30">
                    <td className="p-2 border border-[#DCE7E1] font-bold text-[#92400E]">11</td>
                    <td className="p-3 border border-[#DCE7E1] bg-white font-bold">m12 (1100)</td>
                    <td className="p-3 border border-[#DCE7E1] bg-white font-bold">m13 (1101)</td>
                    <td className="p-3 border border-[#DCE7E1] bg-white font-bold">m15 (1111)</td>
                    <td className="p-3 border border-[#DCE7E1] bg-white font-bold">m14 (1110)</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-[#DCE7E1] bg-white font-bold text-[#4F46E5]">10</td>
                    <td className="p-3 border border-[#DCE7E1] bg-[#EEF2FF] font-bold text-[#4F46E5]">m8 (1000)</td>
                    <td className="p-3 border border-[#DCE7E1] bg-white font-bold">m9 (1001)</td>
                    <td className="p-3 border border-[#DCE7E1] bg-white font-bold">m11 (1011)</td>
                    <td className="p-3 border border-[#DCE7E1] bg-[#EEF2FF] font-bold text-[#4F46E5]">m10 (1010)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* 3. Mandatory Grouping Rules */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#DCE7E1]">
          <BookOpen className="w-4 h-4 text-[#2E6F40]" />
          <h2 className="font-editorial text-xl font-bold text-[#1E293B]">
            2. Eight Mandatory Grouping Axioms
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {section.groupingRules?.map((gr) => (
            <div key={gr.rule} className="p-4 rounded-xl border border-[#DCE7E1] bg-white shadow-2xs space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#2E6F40] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#DCE7E1]">
                  Rule 0{gr.rule}
                </span>
                <span className="text-xs font-bold text-[#1E293B]">{gr.name}</span>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed pt-1">
                {gr.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Progressive Worked Models Collection */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#DCE7E1]">
          <div>
            <h2 className="font-editorial text-xl font-bold text-[#1E293B]">
              3. 20 Progressive Solved K-Map Models
            </h2>
            <p className="text-xs text-[#64748B]">
              Covering 2-, 3-, and 4-variable maps, wrapping, don't-cares, and multiple minimal covers.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-1 bg-[#FAF8F5] p-1 rounded-xl border border-[#DCE7E1]">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-white text-[#2E6F40] shadow-xs'
                    : 'text-[#64748B] hover:text-[#1E293B]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredModels.map((wm) => (
            <div
              key={wm.id}
              className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#FAF8F5] text-[#2E6F40] border border-[#DCE7E1]">
                    {wm.id}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAF8F5] text-[#64748B] border border-[#DCE7E1]">
                    {wm.category}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    wm.difficulty === 'Basic'
                      ? 'bg-[#EBF3ED] text-[#2E6F40]'
                      : wm.difficulty === 'Intermediate'
                      ? 'bg-[#FEF3C7] text-[#92400E]'
                      : 'bg-[#FEE2E2] text-[#DC2626]'
                  }`}>
                    {wm.difficulty}
                  </span>
                </div>

                <div className="font-mono text-xs font-bold text-[#2E6F40]">
                  Result: {wm.finalResult}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold font-mono text-[#1E293B]">{wm.target}</h4>
                <span className="text-[11px] text-[#64748B]">Topology: {wm.mapDimensions}</span>
              </div>

              {/* Grouping Steps Table */}
              <div className="overflow-x-auto rounded-xl border border-[#DCE7E1]">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="bg-[#FAF8F5] border-b border-[#DCE7E1] text-[#64748B]">
                      <th className="p-2.5">Group ID</th>
                      <th className="p-2.5">Cells Covered</th>
                      <th className="p-2.5">Size</th>
                      <th className="p-2.5 text-[#2E6F40]">Derived Term</th>
                      <th className="p-2.5 font-sans">Elimination Rationale</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2F7F4]">
                    {wm.groupingSteps.map((gs, idx) => (
                      <tr key={idx}>
                        <td className="p-2.5 font-bold">{gs.group}</td>
                        <td className="p-2.5">{Array.isArray(gs.cells) ? `{${gs.cells.join(', ')}}` : gs.cells}</td>
                        <td className="p-2.5 font-bold text-[#4F46E5]">{gs.size}</td>
                        <td className="p-2.5 font-bold text-[#2E6F40]">{gs.term}</td>
                        <td className="p-2.5 font-sans text-[#64748B] text-[11px]">{gs.explanation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-3 rounded-xl bg-[#F2F7F4] border border-[#DCE7E1] text-[11px] text-[#64748B]">
                <span className="font-bold text-[#2E6F40]">Verification Note: </span>
                {wm.verificationNote}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Exam Checklist */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#DCE7E1]">
          <CheckCircle2 className="w-4 h-4 text-[#2E6F40]" />
          <h2 className="font-editorial text-xl font-bold text-[#1E293B]">
            4. Examination Solving Checklist
          </h2>
        </div>

        <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
          {section.examChecklist?.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-[#1E293B]">
              <span className="w-4 h-4 rounded-full bg-[#2E6F40] text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section25View;
