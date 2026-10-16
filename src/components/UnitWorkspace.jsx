import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  Video, 
  Clock, 
  CheckCircle2, 
  Layers,
  ArrowRight,
  Cpu,
  Zap,
  Binary,
  Hash,
  Thermometer,
  Mic,
  Gauge,
  Sliders,
  Watch,
  Smartphone,
  Keyboard,
  ToggleLeft,
  Calculator,
  Repeat,
  ShieldCheck,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  ArrowDownRight,
  ArrowLeft,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { Section15View } from './Section15View';

// Dedicated Pedagogical Components for Section 1.3A Conversions
const StepByStepDivisionViewer = ({ stage }) => {
  if (!stage) return null;
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between pb-1 border-b border-[#DCE7E1]">
        <span className="text-xs font-mono font-bold text-[#1E293B] flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#2E6F40]" />
          {stage.title}
        </span>
        <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider">Successive Division Ladder</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-stretch">
        {/* Division Table */}
        <div className="flex-1 overflow-x-auto border border-[#DCE7E1] rounded-xl bg-white shadow-xs">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#DCE7E1] font-mono text-[#1E293B]">
                <th className="py-2.5 px-3">Step</th>
                <th className="py-2.5 px-3">Operation</th>
                <th className="py-2.5 px-3">New Quotient <span className="text-[10px] text-[#4F46E5] font-normal">(passes ⤵)</span></th>
                <th className="py-2.5 px-3">Remainder Extracted</th>
                <th className="py-2.5 px-3">Position / Exam Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2F7F4] font-mono">
              {stage.rows.map((r) => {
                const isHexSub = r.hexSymbol && r.hexSymbol !== r.remainder;
                return (
                  <tr key={r.step} className="hover:bg-[#FAF8F5]/60 transition-colors">
                    <td className="py-2.5 px-3 text-[#64748B] font-medium">Step {r.step}</td>
                    <td className="py-2.5 px-3 font-bold text-[#1E293B]">{r.op}</td>
                    <td className="py-2.5 px-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#EEF2FF] text-[#4F46E5] font-bold text-xs border border-[#C7D2FE]">
                        {r.quotient}
                        <span className="text-[#6366F1] font-bold text-sm leading-none" title="Passes down to next division step">&#x21B3;</span>
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      {isHexSub ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FEF3C7] text-[#92400E] font-extrabold text-xs border border-[#FDE68A]">
                          {r.remainder} &rarr; <span className="bg-[#D97706] text-white px-1.5 py-0.5 rounded text-xs font-bold">{r.hexSymbol}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#ECFDF5] text-[#065F46] font-extrabold text-xs border border-[#A7F3D0]">
                          {r.remainder}
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-[11px] text-[#64748B]">{r.note}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Tall Vertical Directional Arrow Box */}
        <div className="w-full sm:w-36 flex sm:flex-col items-center justify-between p-3.5 rounded-xl bg-[#F2F7F4] border-2 border-[#2E6F40]/30 text-center shadow-xs">
          <span className="text-[10px] font-mono font-bold text-[#2E6F40] uppercase leading-tight">
            LSB / LSD<br/><span className="text-[9px] text-[#64748B] font-normal">(First Rem.)</span>
          </span>
          <div className="flex sm:flex-col items-center justify-center my-2 gap-1.5">
            <ArrowUp className="w-5 h-5 text-[#2E6F40] animate-bounce" />
            <span className="text-[9px] font-mono font-extrabold text-[#2E6F40] uppercase tracking-widest sm:[writing-mode:vertical-lr] sm:rotate-180">
              READ UPWARDS
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold text-[#2E6F40] uppercase leading-tight">
            MSB / MSD<br/><span className="text-[9px] text-[#64748B] font-normal">(Last Rem.)</span>
          </span>
        </div>
      </div>

      {stage.reading && (
        <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] text-xs font-mono text-[#2E6F40] flex items-center justify-between">
          <span>&uarr; {stage.reading}</span>
          <span className="font-bold text-[#1E293B] bg-white px-2 py-0.5 rounded border border-[#DCE7E1] shadow-2xs">{stage.result}</span>
        </div>
      )}
    </div>
  );
};

const StepByStepFractionViewer = ({ stage }) => {
  if (!stage) return null;
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between pb-1 border-b border-[#DCE7E1]">
        <span className="text-xs font-mono font-bold text-[#1E293B] flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#4F46E5]" />
          {stage.title}
        </span>
        <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider">Successive Multiplication Chain</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-stretch">
        {/* Fraction Multiplication Table */}
        <div className="flex-1 overflow-x-auto border border-[#DCE7E1] rounded-xl bg-white shadow-xs">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#DCE7E1] font-mono text-[#1E293B]">
                <th className="py-2.5 px-3">Step</th>
                <th className="py-2.5 px-3">Fraction &times; Base</th>
                <th className="py-2.5 px-3">Product</th>
                <th className="py-2.5 px-3">New Frac <span className="text-[10px] text-[#4F46E5] font-normal">(passes ⤵)</span></th>
                <th className="py-2.5 px-3">Carry Extracted</th>
                <th className="py-2.5 px-3">Position / Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2F7F4] font-mono">
              {stage.rows.map((r) => {
                const isHexSub = r.hexSymbol && r.hexSymbol !== r.carry;
                return (
                  <tr key={r.step} className="hover:bg-[#FAF8F5]/60 transition-colors">
                    <td className="py-2.5 px-3 text-[#64748B] font-medium">Step {r.step}</td>
                    <td className="py-2.5 px-3 font-bold text-[#1E293B]">{r.op}</td>
                    <td className="py-2.5 px-3 text-[#475569]">{r.product}</td>
                    <td className="py-2.5 px-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#EEF2FF] text-[#4F46E5] font-bold text-xs border border-[#C7D2FE]">
                        {r.nextFrac}
                        <span className="text-[#6366F1] font-bold text-sm leading-none" title="Passes down to next multiplication step">&#x21B3;</span>
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      {isHexSub ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FEF3C7] text-[#92400E] font-extrabold text-xs border border-[#FDE68A]">
                          {r.carry} &rarr; <span className="bg-[#D97706] text-white px-1.5 py-0.5 rounded text-xs font-bold">{r.hexSymbol}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#EEF2FF] text-[#3730A3] font-extrabold text-xs border border-[#C7D2FE]">
                          {r.carry}
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-[11px] text-[#64748B]">{r.note}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Tall Vertical Directional Arrow Box */}
        <div className="w-full sm:w-36 flex sm:flex-col items-center justify-between p-3.5 rounded-xl bg-[#EEF2FF] border-2 border-[#4F46E5]/30 text-center shadow-xs">
          <span className="text-[10px] font-mono font-bold text-[#4F46E5] uppercase leading-tight">
            First Bit<br/><span className="text-[9px] text-[#64748B] font-normal">(r⁻¹)</span>
          </span>
          <div className="flex sm:flex-col items-center justify-center my-2 gap-1.5">
            <span className="text-[9px] font-mono font-extrabold text-[#4F46E5] uppercase tracking-widest sm:[writing-mode:vertical-lr]">
              READ DOWNWARDS
            </span>
            <ArrowDown className="w-5 h-5 text-[#4F46E5] animate-bounce" />
          </div>
          <span className="text-[10px] font-mono font-bold text-[#4F46E5] uppercase leading-tight">
            Last Bit<br/><span className="text-[9px] text-[#64748B] font-normal">(Stop / Prec.)</span>
          </span>
        </div>
      </div>

      {stage.loopAlert && (
        <div className="p-3.5 rounded-xl bg-[#FFFBEB] border-2 border-[#D97706]/40 flex items-start gap-2.5 text-xs text-[#92400E]">
          <AlertCircle className="w-4 h-4 text-[#D97706] flex-shrink-0 mt-0.5" />
          <span className="leading-relaxed font-medium">{stage.loopAlert}</span>
        </div>
      )}

      {stage.reading && (
        <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] text-xs font-mono text-[#4F46E5] flex items-center justify-between">
          <span>&darr; {stage.reading}</span>
          <span className="font-bold text-[#1E293B] bg-white px-2 py-0.5 rounded border border-[#DCE7E1] shadow-2xs">{stage.result}</span>
        </div>
      )}
    </div>
  );
};

// Dedicated Pedagogical Components for Section 1.3B (Horizontal Positional Weight Matrix)
const HorizontalWeightMatrix = ({ model }) => {
  if (!model) return null;
  const radix = model.radix || 2;

  // Determine integer and fractional term arrays
  let intTerms = [];
  let fracTerms = [];

  if (model.integerTerms && model.fractionTerms) {
    intTerms = model.integerTerms;
    fracTerms = model.fractionTerms;
  } else if (model.fractionTerms && !model.integerTerms) {
    fracTerms = model.fractionTerms;
  } else if (model.weightTerms) {
    intTerms = model.weightTerms.filter((t) => t.power >= 0);
    fracTerms = model.weightTerms.filter((t) => t.power < 0);
  }

  const hasIntegers = intTerms.length > 0;
  const hasFractions = fracTerms.length > 0;
  const hasBoth = hasIntegers && hasFractions;

  // Multiplier cleaner helper
  const cleanMultiplier = (val) => {
    if (!val) return "";
    if (val.includes(" = ")) {
      return val.split(" = ")[1];
    }
    return val;
  };

  // Product cleaner helper
  const cleanProduct = (p) => {
    if (!p) return "0";
    if (p.includes(" = ")) {
      const parts = p.split(" = ");
      return parts[parts.length - 1];
    }
    return p;
  };

  return (
    <div className="space-y-4">
      {model.formulaCard && (
        <div className="p-3.5 rounded-xl bg-[#EEF2FF] border border-[#C7D2FE] flex items-center gap-3">
          <Sparkles className="w-4 h-4 text-[#4F46E5] flex-shrink-0" />
          <span className="text-xs font-mono font-medium text-[#3730A3]">
            {model.formulaCard}
          </span>
        </div>
      )}

      {/* Main Full-Width Horizontal Bit/Digit Strip Table Container */}
      <div className="overflow-x-auto border border-[#DCE7E1] rounded-2xl bg-white shadow-soft">
        
        {/* Top Directional Banner */}
        <div className="flex border-b border-[#DCE7E1] font-mono text-[11px] font-bold text-center">
          {hasIntegers && (
            <div 
              style={{ flex: intTerms.length }} 
              className="bg-[#ECFDF5] text-[#065F46] py-2 px-3 border-r border-[#A7F3D0] flex items-center justify-center gap-1.5"
            >
              <span>&larr; INTEGER PART</span>
              <span className="text-[10px] font-normal text-[#047857] hidden sm:inline">(Powers increase Right-to-Left: {radix}⁰, {radix}¹, {radix}²...)</span>
            </div>
          )}

          {hasBoth && (
            <div className="w-14 bg-[#FEF3C7] text-[#92400E] py-2 font-black flex items-center justify-center border-r border-[#FDE68A] text-xs">
              RADIX
            </div>
          )}

          {hasFractions && (
            <div 
              style={{ flex: fracTerms.length }} 
              className="bg-[#EEF2FF] text-[#3730A3] py-2 px-3 flex items-center justify-center gap-1.5"
            >
              <span>FRACTIONAL PART &rarr;</span>
              <span className="text-[10px] font-normal text-[#4338CA] hidden sm:inline">(Negative Powers move Left-to-Right: {radix}⁻¹, {radix}⁻²...)</span>
            </div>
          )}
        </div>

        {/* 5 Horizontally Aligned Rows Table */}
        <table className="w-full text-center border-collapse">
          <tbody>
            
            {/* ROW 1: Position Index (i) */}
            <tr className="border-b border-[#F1F5F9] bg-[#FAF8F5]">
              <th className="py-2.5 px-3 text-left font-mono text-[11px] font-bold text-[#64748B] uppercase tracking-wider w-36 whitespace-nowrap bg-[#F8FAFC]">
                Row 1: Position (i)
              </th>
              {intTerms.map((t, idx) => (
                <td key={`i-idx-${idx}`} className="py-2.5 px-2 font-mono text-xs font-bold text-[#065F46] min-w-[70px]">
                  i = {t.power >= 0 ? `+${t.power}` : t.power}
                </td>
              ))}
              {hasBoth && (
                <td className="py-2.5 px-2 font-mono text-xs font-bold text-[#92400E] bg-[#FEF3C7]/40 w-14">
                  pt
                </td>
              )}
              {fracTerms.map((t, idx) => (
                <td key={`f-idx-${idx}`} className="py-2.5 px-2 font-mono text-xs font-bold text-[#3730A3] min-w-[70px]">
                  i = {t.power}
                </td>
              ))}
            </tr>

            {/* ROW 2: Given Digit / Bit (d_i) */}
            <tr className="border-b border-[#F1F5F9] bg-white">
              <th className="py-3 px-3 text-left font-mono text-[11px] font-bold text-[#1E293B] uppercase tracking-wider w-36 whitespace-nowrap bg-[#F8FAFC]">
                Row 2: Given Digit (dᵢ)
              </th>
              {intTerms.map((t, idx) => {
                const isHex = Boolean(t.hexVal);
                return (
                  <td key={`i-dig-${idx}`} className="py-3 px-2">
                    {isHex ? (
                      <span className="inline-flex flex-col items-center justify-center px-2 py-1 rounded-lg bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] shadow-xs">
                        <span className="font-mono font-extrabold text-sm">{t.symbol}</span>
                        <span className="text-[10px] font-mono text-[#B45309]">({t.hexVal})</span>
                      </span>
                    ) : (
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg font-mono font-bold text-sm shadow-xs ${
                        t.active
                          ? 'bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]'
                          : 'bg-[#F1F5F9] text-[#94A3B8] border border-[#E2E8F0] opacity-50'
                      }`}>
                        {t.symbol}
                      </span>
                    )}
                  </td>
                );
              })}
              {hasBoth && (
                <td className="py-3 px-2 bg-[#FEF3C7]/40">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#D97706] text-white font-mono font-black text-lg shadow-xs">
                    .
                  </span>
                </td>
              )}
              {fracTerms.map((t, idx) => {
                const isHex = Boolean(t.hexVal);
                return (
                  <td key={`f-dig-${idx}`} className="py-3 px-2">
                    {isHex ? (
                      <span className="inline-flex flex-col items-center justify-center px-2 py-1 rounded-lg bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] shadow-xs">
                        <span className="font-mono font-extrabold text-sm">{t.symbol}</span>
                        <span className="text-[10px] font-mono text-[#B45309]">({t.hexVal})</span>
                      </span>
                    ) : (
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg font-mono font-bold text-sm shadow-xs ${
                        t.active
                          ? 'bg-[#EEF2FF] text-[#3730A3] border border-[#C7D2FE]'
                          : 'bg-[#F1F5F9] text-[#94A3B8] border border-[#E2E8F0] opacity-50'
                      }`}>
                        {t.symbol}
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* ROW 3: Positional Weight (r^i) */}
            <tr className="border-b border-[#F1F5F9] bg-[#FAF8F5]">
              <th className="py-2.5 px-3 text-left font-mono text-[11px] font-bold text-[#64748B] uppercase tracking-wider w-36 whitespace-nowrap bg-[#F8FAFC]">
                Row 3: Weight (rⁱ)
              </th>
              {intTerms.map((t, idx) => (
                <td key={`i-wt-${idx}`} className="py-2.5 px-2 font-mono text-xs font-semibold text-[#1E293B]">
                  {radix}<sup>{t.power}</sup>
                </td>
              ))}
              {hasBoth && (
                <td className="py-2.5 px-2 font-mono text-xs font-bold text-[#92400E] bg-[#FEF3C7]/40">
                  .
                </td>
              )}
              {fracTerms.map((t, idx) => (
                <td key={`f-wt-${idx}`} className="py-2.5 px-2 font-mono text-xs font-semibold text-[#1E293B]">
                  {radix}<sup>{t.power}</sup>
                </td>
              ))}
            </tr>

            {/* ROW 4: Multiplier Value */}
            <tr className="border-b border-[#F1F5F9] bg-white">
              <th className="py-2.5 px-3 text-left font-mono text-[11px] font-bold text-[#64748B] uppercase tracking-wider w-36 whitespace-nowrap bg-[#F8FAFC]">
                Row 4: Multiplier
              </th>
              {intTerms.map((t, idx) => (
                <td key={`i-mult-${idx}`} className="py-2.5 px-2 font-mono text-xs text-[#475569]">
                  {cleanMultiplier(t.weightVal)}
                </td>
              ))}
              {hasBoth && (
                <td className="py-2.5 px-2 font-mono text-xs font-bold text-[#92400E] bg-[#FEF3C7]/40">
                  .
                </td>
              )}
              {fracTerms.map((t, idx) => (
                <td key={`f-mult-${idx}`} className="py-2.5 px-2 font-mono text-xs text-[#475569]">
                  {cleanMultiplier(t.weightVal)}
                </td>
              ))}
            </tr>

            {/* ROW 5: Term Product (d_i × r^i) */}
            <tr className="bg-[#FAF8F5]">
              <th className="py-3 px-3 text-left font-mono text-[11px] font-bold text-[#1E293B] uppercase tracking-wider w-36 whitespace-nowrap bg-[#F8FAFC]">
                Row 5: Term Product
              </th>
              {intTerms.map((t, idx) => (
                <td key={`i-prod-${idx}`} className="py-3 px-2">
                  {t.active ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#ECFDF5] text-[#065F46] font-mono font-bold text-xs border border-[#A7F3D0]">
                      {cleanProduct(t.product)}
                    </span>
                  ) : (
                    <span className="font-mono text-xs text-[#94A3B8] italic opacity-60">
                      0
                    </span>
                  )}
                </td>
              ))}
              {hasBoth && (
                <td className="py-3 px-2 font-mono font-extrabold text-[#D97706] bg-[#FEF3C7]/40 text-sm">
                  +
                </td>
              )}
              {fracTerms.map((t, idx) => (
                <td key={`f-prod-${idx}`} className="py-3 px-2">
                  {t.active ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#EEF2FF] text-[#3730A3] font-mono font-bold text-xs border border-[#C7D2FE]">
                      {cleanProduct(t.product)}
                    </span>
                  ) : (
                    <span className="font-mono text-xs text-[#94A3B8] italic opacity-60">
                      0
                    </span>
                  )}
                </td>
              ))}
            </tr>

          </tbody>
        </table>
      </div>

      {/* Horizontal Summation Bar */}
      <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#F8FAFC] via-[#F2F7F4] to-[#FAF8F5] border border-[#DCE7E1] flex flex-wrap items-center justify-between gap-3 text-xs font-mono shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[#64748B] font-bold">Summation Bar:</span>
          {hasBoth ? (
            <div className="flex flex-wrap items-center gap-1.5 font-semibold">
              <span className="px-2 py-0.5 rounded bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                Integer Sum: {model.integerSum}
              </span>
              <span className="text-[#94A3B8] font-bold">+</span>
              <span className="px-2 py-0.5 rounded bg-[#EEF2FF] text-[#3730A3] border border-[#C7D2FE]">
                Fraction Sum: {model.fractionSum}
              </span>
              <span className="text-[#94A3B8] font-bold">=</span>
            </div>
          ) : (
            <span className="text-[#1E293B] font-medium">
              {model.sumExpression}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[#64748B] text-[11px]">Final Decimal Value:</span>
          <span className="font-bold text-[#166534] bg-[#ECFDF5] px-3 py-1 rounded-lg border border-[#86EFAC] text-sm shadow-xs">
            {model.result}
          </span>
        </div>
      </div>

      {model.tip && (
        <div className="p-3 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-xs font-mono text-[#92400E] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#D97706] flex-shrink-0" />
          <span>{model.tip}</span>
        </div>
      )}
    </div>
  );
};

// Graded Practice Questions Component (Targeted Practice Set per Conversion)
const TargetedPracticeSet = ({ problems, conversionTitle }) => {
  const [diffFilter, setDiffFilter] = useState("all");
  const [revealedSolutions, setRevealedSolutions] = useState({});

  if (!problems || problems.length === 0) return null;

  const toggleSolution = (id) => {
    setRevealedSolutions((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredProblems = diffFilter === "all" 
    ? problems 
    : problems.filter((p) => p.difficulty.toLowerCase().includes(diffFilter.toLowerCase()));

  const getDifficultyBadge = (diff) => {
    if (diff.includes("Easy")) {
      return "bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]";
    }
    if (diff.includes("Medium")) {
      return "bg-[#EEF2FF] text-[#3730A3] border-[#C7D2FE]";
    }
    return "bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]";
  };

  return (
    <div className="mt-8 pt-6 border-t-2 border-[#E2E8F0] space-y-5">
      {/* Header and Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FAF8F5] p-4 rounded-2xl border border-[#DCE7E1]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2E6F40] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0]">
              Targeted Practice Set
            </span>
            <span className="text-xs font-mono font-bold text-[#64748B]">
              {problems.length} Exam Problems
            </span>
          </div>
          <h4 className="text-sm font-bold text-[#1E293B] mt-1">
            Targeted Practice Set for {conversionTitle ? conversionTitle.split(':')[0] : 'This Conversion'}
          </h4>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-white p-1 rounded-xl border border-[#DCE7E1]">
          {[
            { id: "all", label: `All (${problems.length})` },
            { id: "easy", label: "Easy" },
            { id: "medium", label: "Medium" },
            { id: "hard", label: "Hard" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setDiffFilter(tab.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                diffFilter === tab.id
                  ? 'bg-[#2E6F40] text-white shadow-xs'
                  : 'text-[#64748B] hover:text-[#1E293B] hover:bg-[#FAF8F5]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredProblems.map((prob, idx) => {
          const isRevealed = Boolean(revealedSolutions[prob.id]);
          return (
            <div 
              key={prob.id || idx}
              className="p-5 rounded-2xl bg-white border border-[#DCE7E1] hover:border-[#CBD5E1] transition-all shadow-xs space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#2E6F40] bg-[#F2F7F4] px-2 py-0.5 rounded">
                    Q{idx + 1}
                  </span>
                  <span className="text-xs font-bold text-[#1E293B]">
                    {prob.title}
                  </span>
                </div>
                <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md border ${getDifficultyBadge(prob.difficulty)}`}>
                  {prob.difficulty}
                </span>
              </div>

              {/* Problem statement */}
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E2E8F0] font-mono text-sm font-semibold text-[#1E293B]">
                {prob.problem}
              </div>

              {prob.hint && (
                <div className="flex items-center gap-2 text-xs text-[#64748B] font-mono">
                  <span className="font-bold text-[#D97706] bg-[#FEF3C7] px-1.5 py-0.5 rounded text-[10px]">HINT</span>
                  <span>{prob.hint}</span>
                </div>
              )}

              {/* Reveal Solution Button */}
              <div className="pt-1">
                <button
                  onClick={() => toggleSolution(prob.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                    isRevealed
                      ? 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
                      : 'bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0] hover:bg-[#D1FAE5]'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{isRevealed ? "Hide Step-by-Step Solution" : "Reveal Step-by-Step Solution"}</span>
                </button>
              </div>

              {/* Collapsible Solution Content */}
              {isRevealed && (
                <div className="mt-3 p-4 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] space-y-3 text-xs font-mono">
                  <span className="text-[11px] font-bold text-[#475569] uppercase tracking-wider block">
                    Step-by-Step Solution:
                  </span>
                  <div className="space-y-1.5 pl-2.5 border-l-2 border-[#94A3B8]">
                    {prob.steps.map((st, sIdx) => (
                      <p key={sIdx} className="text-[#334155] leading-relaxed">
                        {st}
                      </p>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between flex-wrap gap-2">
                    <span className="text-[#64748B] font-bold">Final Answer:</span>
                    <span className="font-bold text-[#166534] bg-[#ECFDF5] px-3 py-1 rounded-lg border border-[#86EFAC] text-sm">
                      {prob.answer}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Mixed Practice Arena Component (20 Mixed Exam Questions)
const MixedPracticeArena = ({ questions }) => {
  const [diffFilter, setDiffFilter] = useState("all");
  const [revealedSolutions, setRevealedSolutions] = useState({});

  if (!questions || questions.length === 0) return null;

  const toggleSolution = (id) => {
    setRevealedSolutions((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredQuestions = diffFilter === "all"
    ? questions
    : questions.filter((q) => q.difficulty.toLowerCase().includes(diffFilter.toLowerCase()));

  const getDifficultyBadge = (diff) => {
    if (diff.includes("Easy")) {
      return "bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]";
    }
    if (diff.includes("Medium")) {
      return "bg-[#EEF2FF] text-[#3730A3] border-[#C7D2FE]";
    }
    return "bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]";
  };

  return (
    <div className="p-6 rounded-2xl bg-white border-2 border-[#D97706]/40 shadow-soft space-y-6">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[#DCE7E1]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase text-[#D97706] bg-[#FEF3C7] px-2 py-0.5 rounded border border-[#FDE68A]">
              Mixed Practice Arena
            </span>
            <span className="text-xs font-mono font-bold text-[#64748B]">
              20 University Exam Questions (All 12 Paths)
            </span>
          </div>
          <h2 className="text-lg font-bold text-[#1E293B] mt-1">
            Comprehensive Multi-Base Exam Challenge
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Real university exam problems testing multi-base chained conversions, mixed-base arithmetic equations, and unknown radix polynomials.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 self-start md:self-auto bg-[#FAF8F5] p-1.5 rounded-xl border border-[#DCE7E1]">
          {[
            { id: "all", label: `All (${questions.length})` },
            { id: "easy", label: "Easy" },
            { id: "medium", label: "Medium" },
            { id: "hard", label: "Hard" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setDiffFilter(tab.id)}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                diffFilter === tab.id
                  ? 'bg-[#D97706] text-white shadow-xs'
                  : 'text-[#64748B] hover:text-[#1E293B] hover:bg-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Questions Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredQuestions.map((prob) => {
          const isRevealed = Boolean(revealedSolutions[prob.id]);
          return (
            <div
              key={prob.id}
              className="p-5 rounded-2xl bg-white border border-[#DCE7E1] hover:border-[#CBD5E1] transition-all shadow-xs space-y-3.5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#D97706] bg-[#FEF3C7] px-2.5 py-0.5 rounded-md border border-[#FDE68A]">
                    Q{prob.id}
                  </span>
                  <span className="text-xs font-bold text-[#1E293B]">
                    {prob.title}
                  </span>
                  {prob.category && (
                    <span className="text-[10px] font-mono text-[#475569] bg-[#F1F5F9] px-2 py-0.5 rounded">
                      {prob.category}
                    </span>
                  )}
                </div>
                <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md border ${getDifficultyBadge(prob.difficulty)}`}>
                  {prob.difficulty}
                </span>
              </div>

              {/* Problem statement */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E2E8F0] font-mono text-sm font-semibold text-[#1E293B]">
                {prob.problem}
              </div>

              {prob.hint && (
                <div className="flex items-center gap-2 text-xs text-[#64748B] font-mono">
                  <span className="font-bold text-[#D97706] bg-[#FEF3C7] px-1.5 py-0.5 rounded text-[10px]">EXAM HINT</span>
                  <span>{prob.hint}</span>
                </div>
              )}

              {/* Reveal Solution Button */}
              <div>
                <button
                  onClick={() => toggleSolution(prob.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                    isRevealed
                      ? 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
                      : 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] hover:bg-[#FDE68A]'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{isRevealed ? "Hide Step-by-Step Solution" : "Reveal Step-by-Step Solution"}</span>
                </button>
              </div>

              {/* Solution breakdown */}
              {isRevealed && (
                <div className="mt-3 p-4 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] space-y-3 text-xs font-mono">
                  <span className="text-[11px] font-bold text-[#475569] uppercase tracking-wider block">
                    Step-by-Step Mathematical Solution:
                  </span>
                  <div className="space-y-1.5 pl-2.5 border-l-2 border-[#D97706]">
                    {prob.steps.map((st, sIdx) => (
                      <p key={sIdx} className="text-[#334155] leading-relaxed">
                        {st}
                      </p>
                    ))}
                  </div>
                  <div className="pt-2.5 border-t border-[#E2E8F0] flex items-center justify-between flex-wrap gap-2">
                    <span className="text-[#64748B] font-bold">Final Verified Answer:</span>
                    <span className="font-bold text-[#166534] bg-[#ECFDF5] px-3.5 py-1 rounded-lg border border-[#86EFAC] text-sm">
                      {prob.answer}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Dedicated Pedagogical Components for Section 1.3C (Bit Grouping & Expansion)
const VisualBitGrouper = ({ model, conversion }) => {
  if (!model) return null;
  const isGrouping = conversion.type === "grouping";

  return (
    <div className="space-y-4">
      {model.note && (
        <div className="p-3 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E] flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-[#D97706] flex-shrink-0 mt-0.5" />
          <span className="leading-relaxed font-mono">{model.note}</span>
        </div>
      )}

      {isGrouping ? (
        <div className="space-y-4">
          {model.groups ? (
            /* Pure integer groups */
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3">
              <div className="text-[11px] font-mono font-bold text-[#64748B] uppercase tracking-wider">
                Bit Grouping & Target Digit Mapping:
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {model.groups.map((grp, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs">
                    <div className="font-mono text-sm font-extrabold flex items-center gap-0.5">
                      <span className="text-[#94A3B8] font-light">[</span>
                      {grp.paddedZeros > 0 ? (
                        <>
                          <span className="text-[#D97706] bg-[#FEF3C7] px-1 rounded text-xs" title="Padded Zero">
                            {grp.bits.slice(0, grp.paddedZeros)}
                          </span>
                          <span className="text-[#1E293B]">{grp.bits.slice(grp.paddedZeros)}</span>
                        </>
                      ) : (
                        <span className="text-[#1E293B]">{grp.bits}</span>
                      )}
                      <span className="text-[#94A3B8] font-light">]</span>
                    </div>
                    <ArrowDown className="w-3.5 h-3.5 text-[#64748B]" />
                    <span className="font-mono text-sm font-black px-2.5 py-0.5 rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#86EFAC]">
                      {grp.digit}
                      {grp.decVal && <span className="text-[9px] text-[#64748B] font-normal block text-center font-sans">({grp.decVal})</span>}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Combined Integer and Fraction Groups */
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3">
                <div className="text-[11px] font-mono font-bold text-[#64748B] uppercase tracking-wider">
                  Integer Part (Moving Left from Radix Point &larr;):
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {model.integerGroups.map((grp, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs">
                      <div className="font-mono text-sm font-extrabold flex items-center gap-0.5">
                        <span className="text-[#94A3B8] font-light">[</span>
                        {grp.paddedZeros > 0 ? (
                          <>
                            <span className="text-[#D97706] bg-[#FEF3C7] px-1 rounded text-xs" title="Padded Leading Zero">
                              {grp.bits.slice(0, grp.paddedZeros)}
                            </span>
                            <span className="text-[#1E293B]">{grp.bits.slice(grp.paddedZeros)}</span>
                          </>
                        ) : (
                          <span className="text-[#1E293B]">{grp.bits}</span>
                        )}
                        <span className="text-[#94A3B8] font-light">]</span>
                      </div>
                      <ArrowDown className="w-3.5 h-3.5 text-[#64748B]" />
                      <span className="font-mono text-sm font-black px-2.5 py-0.5 rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#86EFAC]">
                        {grp.digit}
                      </span>
                    </div>
                  ))}
                  <span className="font-mono text-2xl font-black text-[#1E293B] px-1">.</span>
                  {model.fractionGroups.map((grp, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs">
                      <div className="font-mono text-sm font-extrabold flex items-center gap-0.5">
                        <span className="text-[#94A3B8] font-light">[</span>
                        {grp.paddedZeros > 0 ? (
                          <>
                            <span className="text-[#1E293B]">{grp.bits.slice(0, grp.bits.length - grp.paddedZeros)}</span>
                            <span className="text-[#D97706] bg-[#FEF3C7] px-1 rounded text-xs" title="Padded Trailing Zero">
                              {grp.bits.slice(grp.bits.length - grp.paddedZeros)}
                            </span>
                          </>
                        ) : (
                          <span className="text-[#1E293B]">{grp.bits}</span>
                        )}
                        <span className="text-[#94A3B8] font-light">]</span>
                      </div>
                      <ArrowDown className="w-3.5 h-3.5 text-[#64748B]" />
                      <span className="font-mono text-sm font-black px-2.5 py-0.5 rounded-lg bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]">
                        {grp.digit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Expansion from Digit to Bits */
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3">
            <div className="text-[11px] font-mono font-bold text-[#64748B] uppercase tracking-wider">
              Digit-by-Digit Expansion into Binary:
            </div>
            {model.expansions ? (
              <div className="flex flex-wrap items-center gap-3">
                {model.expansions.map((exp, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs">
                    <span className="font-mono text-sm font-black px-3 py-1 rounded-lg bg-[#FAF8F5] text-[#1E293B] border border-[#DCE7E1]">
                      {exp.digit}
                      {exp.note && <span className="text-[9px] text-[#64748B] block text-center font-normal">({exp.note})</span>}
                    </span>
                    <ArrowDown className="w-3.5 h-3.5 text-[#64748B]" />
                    <span className={`font-mono text-xs font-black px-2.5 py-1 rounded-md border ${
                      exp.alert 
                        ? 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]' 
                        : 'bg-[#F0FDF4] text-[#15803D] border-[#86EFAC]'
                    }`}>
                      [{exp.bits}]
                    </span>
                    {exp.alert && (
                      <span className="text-[9px] font-mono text-[#D97706] font-bold text-center max-w-[100px] leading-tight">
                        {exp.alert}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              /* Combined Integer + Fraction Expansions */
              <div className="flex flex-wrap items-center gap-3">
                {model.integerExpansions.map((exp, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs">
                    <span className="font-mono text-sm font-black px-3 py-1 rounded-lg bg-[#FAF8F5] text-[#1E293B] border border-[#DCE7E1]">
                      {exp.digit}
                    </span>
                    <ArrowDown className="w-3.5 h-3.5 text-[#64748B]" />
                    <span className="font-mono text-xs font-black px-2.5 py-1 rounded-md bg-[#F0FDF4] text-[#15803D] border border-[#86EFAC]">
                      [{exp.bits}]
                    </span>
                  </div>
                ))}
                <span className="font-mono text-2xl font-black text-[#1E293B] px-1">.</span>
                {model.fractionExpansions.map((exp, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs">
                    <span className="font-mono text-sm font-black px-3 py-1 rounded-lg bg-[#FAF8F5] text-[#1E293B] border border-[#DCE7E1]">
                      {exp.digit}
                    </span>
                    <ArrowDown className="w-3.5 h-3.5 text-[#64748B]" />
                    <span className="font-mono text-xs font-black px-2.5 py-1 rounded-md bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]">
                      [{exp.bits}]
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Dedicated Component for Bit-Aligned Arithmetic (Addition and Subtraction)
const BitAlignedArithmeticGrid = ({
  problem,
  op = "+",
  gridColumns = [],
  multiOperands,
  multiCarries,
  steps = [],
  verification,
  result,
  octalExample,
  hexExample
}) => {
  return (
    <div className="space-y-5">
      {/* Arithmetic Problem & Answer Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-white border border-[#DCE7E1]">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-bold uppercase text-[#64748B]">Problem:</span>
          <span className="font-mono text-sm font-bold text-[#1E293B]">{problem}</span>
        </div>
        {result && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase text-[#2E6F40]">Final Result:</span>
            <span className="font-mono text-sm font-bold px-2.5 py-1 rounded-md bg-[#F0FDF4] text-[#15803D] border border-[#86EFAC]">
              {result}
            </span>
          </div>
        )}
      </div>

      {/* Grid Display for 2 Operands */}
      {gridColumns && gridColumns.length > 0 && (
        <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#1E293B] uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2E6F40]" />
              Graphical Column-by-Column Bit Alignment Grid
            </span>
            <span className="text-[11px] font-mono text-[#64748B]">
              Aligned along Radix Point / LSB
            </span>
          </div>

          <div className="overflow-x-auto pb-2">
            <div className="inline-flex flex-col min-w-full">
              {/* Header: Column labels */}
              <div className="flex items-center gap-1.5 pb-1">
                <div className="w-10 flex-shrink-0 text-right pr-2 text-[10px] font-mono text-[#64748B] font-semibold">Bit</div>
                {gridColumns.map((col, idx) => (
                  <div key={idx} className={`flex-shrink-0 text-center font-mono text-[11px] font-bold text-[#64748B] ${col.isRadix ? 'w-4' : 'w-10 sm:w-12'}`}>
                    {col.colLabel}
                  </div>
                ))}
              </div>

              {/* Row 1: Carry / Borrow Track */}
              <div className="flex items-center gap-1.5 py-1 min-h-[36px]">
                <div className="w-10 flex-shrink-0 text-right pr-2 text-[10px] font-mono text-amber-700 font-bold">
                  {op === "+" ? "Carry" : "Borrow"}
                </div>
                {gridColumns.map((col, idx) => (
                  <div key={idx} className={`flex-shrink-0 flex items-center justify-center ${col.isRadix ? 'w-4' : 'w-10 sm:w-12'}`}>
                    {col.carry && col.carry !== "0" && (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] shadow-2xs">
                        +{col.carry}
                      </span>
                    )}
                    {col.borrow && (
                      <div className="flex flex-col items-center leading-none">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FFE4E6] text-[#BE123C] border border-[#FECDD3]">
                          {col.borrow.current}
                        </span>
                        {col.borrow.crossed && (
                          <span className="line-through text-rose-400 text-[9px] font-mono -mt-0.5">
                            {col.borrow.original}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Row 2: Operand A */}
              <div className="flex items-center gap-1.5 py-1">
                <div className="w-10 flex-shrink-0 text-right pr-2 text-[10px] font-mono text-[#64748B]">A</div>
                {gridColumns.map((col, idx) => (
                  <div key={idx} className={`flex-shrink-0 flex items-center justify-center ${col.isRadix ? 'w-4' : 'w-10 sm:w-12'}`}>
                    {col.isRadix ? (
                      <span className="font-mono text-2xl font-black text-[#1E293B]">·</span>
                    ) : (
                      <div className={`w-10 sm:w-12 h-10 flex flex-col items-center justify-center font-mono font-bold text-sm sm:text-base rounded-xl border ${
                        col.isPaddedA 
                          ? 'bg-[#FEF3C7]/60 text-[#92400E] border-dashed border-[#F59E0B]' 
                          : 'bg-white text-[#1E293B] border-[#DCE7E1]'
                      }`}>
                        <span>{col.a}</span>
                        {col.isPaddedA && <span className="text-[8px] font-mono text-[#D97706] -mt-1 font-normal">pad 0</span>}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Row 3: Operand B */}
              <div className="flex items-center gap-1.5 py-1">
                <div className="w-10 flex-shrink-0 text-right pr-2">
                  <span className={`inline-flex items-center justify-center w-5 h-5 rounded-md font-mono font-black text-xs ${
                    op === "+" ? "bg-[#F0FDF4] text-[#15803D] border border-[#86EFAC]" : "bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]"
                  }`}>
                    {op}
                  </span>
                </div>
                {gridColumns.map((col, idx) => (
                  <div key={idx} className={`flex-shrink-0 flex items-center justify-center ${col.isRadix ? 'w-4' : 'w-10 sm:w-12'}`}>
                    {col.isRadix ? (
                      <span className="font-mono text-2xl font-black text-[#1E293B]">·</span>
                    ) : (
                      <div className={`w-10 sm:w-12 h-10 flex flex-col items-center justify-center font-mono font-bold text-sm sm:text-base rounded-xl border ${
                        col.isPaddedB 
                          ? 'bg-[#FEF3C7]/60 text-[#92400E] border-dashed border-[#F59E0B]' 
                          : 'bg-white text-[#1E293B] border-[#DCE7E1]'
                      }`}>
                        <span>{col.b}</span>
                        {col.isPaddedB && <span className="text-[8px] font-mono text-[#D97706] -mt-1 font-normal">pad 0</span>}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Solid Divider Bar */}
              <div className="my-1 border-b-2 border-[#1E293B] ml-11" />

              {/* Row 4: Result */}
              <div className="flex items-center gap-1.5 py-1">
                <div className="w-10 flex-shrink-0 text-right pr-2 text-[10px] font-mono text-[#15803D] font-bold">
                  {op === "+" ? "Sum" : "Diff"}
                </div>
                {gridColumns.map((col, idx) => (
                  <div key={idx} className={`flex-shrink-0 flex items-center justify-center ${col.isRadix ? 'w-4' : 'w-10 sm:w-12'}`}>
                    {col.isRadix ? (
                      <span className="font-mono text-2xl font-black text-[#1E293B]">·</span>
                    ) : (
                      <div className="w-10 sm:w-12 h-10 flex items-center justify-center font-mono font-black text-sm sm:text-base bg-[#F0FDF4] text-[#15803D] border-2 border-[#86EFAC] rounded-xl shadow-2xs">
                        {col.res}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Multi-Operand Addition Grid (Model 1D) */}
      {multiOperands && (
        <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#1E293B] uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4F46E5]" />
              Multi-Number Parallel Addition Architecture
            </span>
            <span className="text-[11px] font-mono text-[#64748B]">
              Sum of 1s in column &rarr; Convert to Binary &rarr; Multi-Column Carries
            </span>
          </div>

          <div className="overflow-x-auto pb-2">
            <table className="w-full text-xs font-mono text-center border-collapse">
              <thead>
                <tr className="bg-white border-b border-[#DCE7E1]">
                  <th className="py-2 px-3 text-left text-[#64748B]">Operand</th>
                  <th className="py-2 px-3 text-[#1E293B]">b₃ (Weight 8)</th>
                  <th className="py-2 px-3 text-[#1E293B]">b₂ (Weight 4)</th>
                  <th className="py-2 px-3 text-[#1E293B]">b₁ (Weight 2)</th>
                  <th className="py-2 px-3 text-[#1E293B]">b₀ (Weight 1)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2F7F4] bg-white">
                {multiOperands.map((opRow, idx) => (
                  <tr key={idx}>
                    <td className="py-2 px-3 text-left font-bold text-[#64748B]">{opRow.label}</td>
                    {opRow.bits.map((b, bIdx) => (
                      <td key={bIdx} className="py-2 px-3 font-bold text-[#1E293B]">{b}</td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-[#FAF8F5] font-bold border-t-2 border-[#1E293B]">
                  <td className="py-2.5 px-3 text-left text-[#15803D]">Result</td>
                  <td colSpan={4} className="py-2.5 px-3 text-center text-sm text-[#15803D] font-black tracking-widest">
                    (110001)₂ = 49₁₀
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Multi-Carries Tracking Table */}
          {multiCarries && (
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold text-[#64748B] uppercase">Column-by-Column 1s Counting Breakdown:</span>
              <div className="overflow-x-auto border border-[#DCE7E1] rounded-xl bg-white">
                <table className="w-full text-[11px] font-mono text-left border-collapse">
                  <thead>
                    <tr className="bg-[#FAF8F5] border-b border-[#DCE7E1] text-[#1E293B]">
                      <th className="py-2 px-3">Column</th>
                      <th className="py-2 px-3">1s Count</th>
                      <th className="py-2 px-3">Decimal Sum</th>
                      <th className="py-2 px-3">Binary Value</th>
                      <th className="py-2 px-3 text-[#15803D]">Sum Bit</th>
                      <th className="py-2 px-3 text-[#D97706]">Carry to i+1</th>
                      <th className="py-2 px-3 text-[#4F46E5]">Carry to i+2</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2F7F4]">
                    {multiCarries.map((mc, idx) => (
                      <tr key={idx} className="hover:bg-[#FAF8F5]/60">
                        <td className="py-2 px-3 font-bold text-[#1E293B]">{mc.col}</td>
                        <td className="py-2 px-3">{mc.count1s}</td>
                        <td className="py-2 px-3 font-semibold">{mc.decSum}</td>
                        <td className="py-2 px-3 font-bold text-[#2E6F40]">({mc.binSum})₂</td>
                        <td className="py-2 px-3 font-black text-[#15803D]">{mc.sumBit}</td>
                        <td className="py-2 px-3 font-bold text-[#D97706]">{mc.carryToNext}</td>
                        <td className="py-2 px-3 font-bold text-[#4F46E5]">{mc.carryToNext2}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Octal & Hex Non-Decimal Base Sub-Display (Model 1E & 2E) */}
      {(octalExample || hexExample) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {octalExample && (
            <div className="p-4 rounded-xl bg-white border border-[#DCE7E1] space-y-3 shadow-2xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
                <span className="text-xs font-mono font-bold text-[#D97706] uppercase">Octal (Base 8) Model</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FEF3C7] text-[#92400E] font-bold">Base 8 Modulo</span>
              </div>
              <div className="font-mono text-xs font-bold text-[#1E293B]">Problem: {octalExample.problem}</div>
              <ul className="space-y-1.5 text-xs text-[#475569]">
                {octalExample.steps.map((st, i) => (
                  <li key={i} className="flex items-start gap-1.5 font-mono text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] mt-1.5 flex-shrink-0" />
                    <span>{st}</span>
                  </li>
                ))}
              </ul>
              <div className="p-2 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] text-[11px] font-mono text-[#15803D] font-bold">
                {octalExample.verification}
              </div>
            </div>
          )}
          {hexExample && (
            <div className="p-4 rounded-xl bg-white border border-[#DCE7E1] space-y-3 shadow-2xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
                <span className="text-xs font-mono font-bold text-[#4F46E5] uppercase">Hexadecimal (Base 16) Model</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EEF2FF] text-[#4338CA] font-bold">Base 16 Modulo</span>
              </div>
              <div className="font-mono text-xs font-bold text-[#1E293B]">Problem: {hexExample.problem}</div>
              <ul className="space-y-1.5 text-xs text-[#475569]">
                {hexExample.steps.map((st, i) => (
                  <li key={i} className="flex items-start gap-1.5 font-mono text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] mt-1.5 flex-shrink-0" />
                    <span>{st}</span>
                  </li>
                ))}
              </ul>
              <div className="p-2 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] text-[11px] font-mono text-[#15803D] font-bold">
                {hexExample.verification}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step-by-Step Breakdown List */}
      {steps && steps.length > 0 && (
        <div className="p-4 rounded-xl bg-white border border-[#DCE7E1] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
            <span className="text-xs font-mono font-bold text-[#1E293B] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#2E6F40]" />
              Step-by-Step Column Arithmetic Breakdown
            </span>
            <span className="text-[10px] font-mono text-[#64748B]">Rigorous Hardware Trace</span>
          </div>
          <ul className="space-y-1.5">
            {steps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs font-mono text-[#334155] leading-relaxed">
                <span className="px-1.5 py-0.5 rounded bg-[#FAF8F5] border border-[#DCE7E1] text-[10px] font-bold text-[#64748B] flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 5-Second Decimal Verification Bar */}
      {verification && (
        <div className="p-3.5 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center gap-2.5 shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-[#15803D] flex-shrink-0" />
          <div className="text-xs font-mono text-[#166534]">
            <span className="font-bold mr-1.5">5-Second Decimal Verification:</span>
            <span>{verification}</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Dedicated Component for Graphical Binary Multiplication Matrix (Shift-and-Add)
const GraphicalMultiplicationGrid = ({
  problem,
  colHeaders = [],
  operands,
  rows = [],
  finalSum,
  steps = [],
  verification
}) => {
  return (
    <div className="space-y-5">
      {/* Arithmetic Problem & Answer Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-white border border-[#DCE7E1]">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-bold uppercase text-[#64748B]">Problem:</span>
          <span className="font-mono text-sm font-bold text-[#1E293B]">{problem}</span>
        </div>
        {finalSum && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase text-[#4F46E5]">Product:</span>
            <span className="font-mono text-sm font-bold px-2.5 py-1 rounded-md bg-[#EEF2FF] text-[#4338CA] border border-[#C7D2FE]">
              {finalSum.val || finalSum.label}
            </span>
          </div>
        )}
      </div>

      {/* Graphical Shift-and-Add Bit Matrix */}
      {rows && rows.length > 0 && (
        <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#1E293B] uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4F46E5]" />
              Graphical Shift-and-Add Bit Matrix
            </span>
            <span className="text-[11px] font-mono text-[#64748B]">
              Staircase Left Shift by Bit Weight
            </span>
          </div>

          <div className="overflow-x-auto pb-2">
            <div className="inline-flex flex-col min-w-full">
              {/* Header: Column labels (e.g. b7 down to b0) */}
              {colHeaders && colHeaders.length > 0 && (
                <div className="flex items-center gap-1.5 pb-1">
                  <div className="w-12 sm:w-14 flex-shrink-0 text-right pr-2 text-[10px] font-mono text-[#64748B] font-semibold">Bit</div>
                  {colHeaders.map((col, idx) => (
                    <div key={idx} className="w-9 sm:w-11 flex-shrink-0 text-center font-mono text-[11px] font-bold text-[#64748B]">
                      {col}
                    </div>
                  ))}
                  <div className="pl-4 text-[10px] font-mono text-[#64748B] font-semibold">Row Operation</div>
                </div>
              )}

              {/* Operand A (Multiplicand) */}
              {operands?.a && (
                <div className="flex items-center gap-1.5 py-1">
                  <div className="w-12 sm:w-14 flex-shrink-0 text-right pr-2 text-[10px] font-mono text-[#64748B]">A</div>
                  {operands.a.bits.map((bit, idx) => (
                    <div key={idx} className="w-9 sm:w-11 flex-shrink-0 flex items-center justify-center">
                      {bit.trim() ? (
                        <div className="w-9 sm:w-11 h-9 sm:h-10 flex items-center justify-center font-mono font-bold text-sm bg-white text-[#1E293B] border border-[#DCE7E1] rounded-xl shadow-2xs">
                          {bit}
                        </div>
                      ) : (
                        <div className="w-9 sm:w-11 h-9 sm:h-10" />
                      )}
                    </div>
                  ))}
                  <div className="pl-4 text-xs font-mono font-medium text-[#475569]">
                    {operands.a.label}
                  </div>
                </div>
              )}

              {/* Operand B (Multiplier) */}
              {operands?.b && (
                <div className="flex items-center gap-1.5 py-1">
                  <div className="w-12 sm:w-14 flex-shrink-0 text-right pr-2">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-md font-mono font-black text-xs bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]">
                      ×
                    </span>
                  </div>
                  {operands.b.bits.map((bit, idx) => (
                    <div key={idx} className="w-9 sm:w-11 flex-shrink-0 flex items-center justify-center">
                      {bit.trim() ? (
                        <div className="w-9 sm:w-11 h-9 sm:h-10 flex items-center justify-center font-mono font-bold text-sm bg-white text-[#1E293B] border border-[#DCE7E1] rounded-xl shadow-2xs">
                          {bit}
                        </div>
                      ) : (
                        <div className="w-9 sm:w-11 h-9 sm:h-10" />
                      )}
                    </div>
                  ))}
                  <div className="pl-4 text-xs font-mono font-medium text-[#475569]">
                    {operands.b.label}
                  </div>
                </div>
              )}

              {/* Solid Divider Bar */}
              <div className="my-1 border-b-2 border-[#1E293B] ml-14 max-w-fit" />

              {/* Partial Product Rows */}
              {rows.map((row, rIdx) => (
                <div key={rIdx} className="flex items-center gap-1.5 py-1">
                  <div className="w-12 sm:w-14 flex-shrink-0 text-right pr-2 text-[10px] font-mono font-bold text-[#64748B]">
                    {row.bitLabel || `P${rIdx}`}
                  </div>
                  {row.cells.map((cell, cIdx) => (
                    <div key={cIdx} className="w-9 sm:w-11 flex-shrink-0 flex items-center justify-center">
                      {cell.val.trim() ? (
                        <div className={`w-9 sm:w-11 h-9 sm:h-10 flex flex-col items-center justify-center font-mono font-bold text-sm rounded-xl border ${
                          cell.isShiftZero
                            ? 'bg-[#FEF3C7] text-[#D97706] border-dashed border-[#F59E0B]'
                            : 'bg-white text-[#1E293B] border-[#DCE7E1] shadow-2xs'
                        }`}>
                          <span>{cell.val}</span>
                          {cell.isShiftZero && (
                            <span className="text-[7px] font-mono text-[#B45309] -mt-1 font-semibold">shift</span>
                          )}
                        </div>
                      ) : (
                        <div className="w-9 sm:w-11 h-9 sm:h-10" />
                      )}
                    </div>
                  ))}
                  <div className="pl-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#EEF2FF] text-[#4338CA] border border-[#C7D2FE]">
                      {row.callout}
                    </span>
                  </div>
                </div>
              ))}

              {/* Double Divider Bar */}
              <div className="my-1.5 border-b-2 border-double border-[#1E293B] ml-14 max-w-fit" />

              {/* Final Sum Row */}
              {finalSum && (
                <div className="flex items-center gap-1.5 py-1">
                  <div className="w-12 sm:w-14 flex-shrink-0 text-right pr-2 text-[10px] font-mono text-[#15803D] font-bold">
                    Sum
                  </div>
                  {finalSum.bits.map((bit, idx) => (
                    <div key={idx} className="w-9 sm:w-11 flex-shrink-0 flex items-center justify-center">
                      <div className="w-9 sm:w-11 h-9 sm:h-10 flex items-center justify-center font-mono font-black text-sm sm:text-base bg-[#F0FDF4] text-[#15803D] border-2 border-[#86EFAC] rounded-xl shadow-2xs">
                        {bit}
                      </div>
                    </div>
                  ))}
                  <div className="pl-4 text-xs font-mono font-bold text-[#15803D]">
                    {finalSum.val}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Step-by-Step Breakdown List */}
      {steps && steps.length > 0 && (
        <div className="p-4 rounded-xl bg-white border border-[#DCE7E1] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
            <span className="text-xs font-mono font-bold text-[#1E293B] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#4F46E5]" />
              Step-by-Step Multiplication Trace
            </span>
            <span className="text-[10px] font-mono text-[#64748B]">Accumulator & Shift Loop</span>
          </div>
          <ul className="space-y-1.5">
            {steps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs font-mono text-[#334155] leading-relaxed">
                <span className="px-1.5 py-0.5 rounded bg-[#FAF8F5] border border-[#DCE7E1] text-[10px] font-bold text-[#64748B] flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 5-Second Decimal Verification */}
      {verification && (
        <div className="p-3.5 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center gap-2.5 shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-[#15803D] flex-shrink-0" />
          <div className="text-xs font-mono text-[#166534]">
            <span className="font-bold mr-1.5">5-Second Decimal Verification:</span>
            <span>{verification}</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Dedicated Component for Visual Restoring Long-Division Ladder
const GraphicalDivisionLadder = ({
  problem,
  dividend,
  divisor,
  quotient,
  remainder,
  bracket,
  cycles = [],
  steps = [],
  verification
}) => {
  return (
    <div className="space-y-5">
      {/* Problem & Answer Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-white border border-[#DCE7E1]">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-bold uppercase text-[#64748B]">Problem:</span>
          <span className="font-mono text-sm font-bold text-[#1E293B]">{problem}</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {quotient && (
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-mono font-bold uppercase text-[#059669]">Quotient:</span>
              <span className="font-mono text-xs sm:text-sm font-bold px-2 py-0.5 rounded bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]">
                {quotient}
              </span>
            </div>
          )}
          {remainder !== undefined && (
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-mono font-bold uppercase text-[#D97706]">Rem:</span>
              <span className="font-mono text-xs sm:text-sm font-bold px-2 py-0.5 rounded bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
                {remainder}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Visual Long-Division Bracket */}
      {bracket && (
        <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#1E293B] uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#059669]" />
              Classic Long-Division Bracket Representation
            </span>
            <span className="text-[11px] font-mono text-[#64748B]">Divisor ) Dividend ( Quotient</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 p-4 rounded-xl bg-white border border-[#DCE7E1]">
            {/* Divisor */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-mono font-bold uppercase text-[#64748B] mr-1">Divisor:</span>
              <span className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] font-mono font-bold text-base text-[#1E293B]">
                {bracket.divisor}
              </span>
            </div>

            {/* Right parenthesis separator */}
            <span className="text-2xl font-mono font-light text-[#94A3B8]">)</span>

            {/* Dividend */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-mono font-bold uppercase text-[#64748B] mr-1">Dividend:</span>
              <span className="px-3 py-1.5 rounded-lg bg-[#F1F5F9] border border-[#CBD5E1] font-mono font-bold text-base text-[#0F172A]">
                {bracket.dividend}
              </span>
            </div>

            {/* Left parenthesis separator */}
            <span className="text-2xl font-mono font-light text-[#94A3B8]">(</span>

            {/* Quotient Bits */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-mono font-bold uppercase text-[#059669] mr-1">Quotient:</span>
              <div className="flex items-center gap-1">
                {bracket.quotientBits.map((qb, i) => (
                  <span
                    key={i}
                    className={`px-2 py-1 rounded-md font-mono font-black text-sm ${
                      qb.color === "green"
                        ? "bg-[#DCFCE7] text-[#15803D] border border-[#86EFAC]"
                        : qb.color === "amber"
                        ? "bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]"
                        : "text-[#64748B]"
                    }`}
                  >
                    {qb.bit}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Visual Restoring Cycles Ladder */}
      {cycles && cycles.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#1E293B] uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#059669]" />
              Cycle-by-Cycle Restoring Ladder Trace
            </span>
            <span className="text-[10px] font-mono text-[#64748B]">Compare &rarr; Subtract &rarr; Bring Down</span>
          </div>

          <div className="space-y-3">
            {cycles.map((cyc) => (
              <div key={cyc.cycleNum} className="p-4 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#F1F5F9]">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-[#FAF8F5] border border-[#DCE7E1] text-[#475569]">
                      Cycle {cyc.cycleNum}
                    </span>
                    <span className="text-xs font-mono text-[#64748B]">
                      Active Slice: <strong className="text-[#1E293B]">({cyc.slice})₂</strong> vs Divisor <strong className="text-[#1E293B]">({cyc.divisor})₂</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase text-[#64748B]">Quotient Bit:</span>
                    <span className={`px-2 py-0.5 rounded font-mono font-black text-xs ${
                      cyc.qBitColor === "green"
                        ? "bg-[#DCFCE7] text-[#15803D] border border-[#86EFAC]"
                        : "bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]"
                    }`}>
                      q = {cyc.qBit}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E2E8F0] space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#64748B] block">1. Compare</span>
                    <span className="font-semibold text-[#1E293B]">{cyc.comp}</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E2E8F0] space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#64748B] block">2. Action / Subtraction</span>
                    <span className="font-semibold text-[#1E293B]">{cyc.action}</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#1D4ED8] block">3. Bring Down & Next Slice</span>
                    {cyc.bringDown ? (
                      <span className="font-bold text-[#1E40AF] flex items-center gap-1">
                        &darr; Bring down '{cyc.bringDown}' &rarr; Slice: {cyc.nextSlice}
                      </span>
                    ) : (
                      <span className="text-[#64748B] font-semibold">{cyc.note || "Cycle finished."}</span>
                    )}
                  </div>
                </div>

                {cyc.note && cyc.bringDown && (
                  <div className="text-[11px] font-mono text-[#64748B] pl-1">
                    {cyc.note}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step-by-Step Breakdown List */}
      {steps && steps.length > 0 && (
        <div className="p-4 rounded-xl bg-white border border-[#DCE7E1] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
            <span className="text-xs font-mono font-bold text-[#1E293B] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#059669]" />
              Step-by-Step Division Trace
            </span>
            <span className="text-[10px] font-mono text-[#64748B]">Restoring Register Simulation</span>
          </div>
          <ul className="space-y-1.5">
            {steps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs font-mono text-[#334155] leading-relaxed">
                <span className="px-1.5 py-0.5 rounded bg-[#FAF8F5] border border-[#DCE7E1] text-[10px] font-bold text-[#64748B] flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 5-Second Decimal Verification */}
      {verification && (
        <div className="p-3.5 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center gap-2.5 shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-[#15803D] flex-shrink-0" />
          <div className="text-xs font-mono text-[#166534]">
            <span className="font-bold mr-1.5">5-Second Decimal Verification:</span>
            <span>{verification}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export const UnitWorkspace = ({ section, overleafPdfLink }) => {
  const [revealedQuestions, setRevealedQuestions] = useState({});
  const [activeSubTab13, setActiveSubTab13] = useState("overview");
  const [activeConv13A, setActiveConv13A] = useState("Conversion 1");
  const [activeModelFilter13A, setActiveModelFilter13A] = useState("all");
  const [activeConv13B, setActiveConv13B] = useState("Conversion 4");
  const [activeModelFilter13B, setActiveModelFilter13B] = useState("all");
  const [activeConv13C, setActiveConv13C] = useState("Conversion 7");
  const [activeModelFilter13C, setActiveModelFilter13C] = useState("all");
  const [activeConv13D, setActiveConv13D] = useState("Conversion 11");
  const [activeModelFilter13D, setActiveModelFilter13D] = useState("all");

  // Section 1.4 States
  const [activeSubTab14, setActiveSubTab14] = useState("overview");
  const [activeModelFilter14A, setActiveModelFilter14A] = useState("all");
  const [activeModelFilter14B, setActiveModelFilter14B] = useState("all");
  const [subTab14C, setSubTab14C] = useState("multiplication");
  const [activeMixedFilter14, setActiveMixedFilter14] = useState("all");

  useEffect(() => {
    if (section?.id === "1.3") {
      setActiveSubTab13("overview");
      setActiveConv13A("Conversion 1");
      setActiveModelFilter13A("all");
      setActiveConv13B("Conversion 4");
      setActiveModelFilter13B("all");
      setActiveConv13C("Conversion 7");
      setActiveModelFilter13C("all");
      setActiveConv13D("Conversion 11");
      setActiveModelFilter13D("all");
    }
    if (section?.id === "1.4") {
      setActiveSubTab14("overview");
      setActiveModelFilter14A("all");
      setActiveModelFilter14B("all");
      setSubTab14C("multiplication");
      setActiveMixedFilter14("all");
    }
  }, [section?.id]);

  const toggleQuestion = (idx) => {
    setRevealedQuestions(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  // Helper map for icons in Section 1.1 Everyday Examples
  const getExampleIcon = (item) => {
    switch (item) {
      case "Classic Wall Clock": return <Clock className="w-4 h-4 text-[#D97706]" />;
      case "Mercury Thermometer": return <Thermometer className="w-4 h-4 text-[#D97706]" />;
      case "Human Voice in Air": return <Mic className="w-4 h-4 text-[#D97706]" />;
      case "Mechanical Bike Speedometer": return <Gauge className="w-4 h-4 text-[#D97706]" />;
      case "Ceiling Fan Dimmer Knob": return <Sliders className="w-4 h-4 text-[#D97706]" />;
      case "Digital Wristwatch": return <Watch className="w-4 h-4 text-[#2E6F40]" />;
      case "Smartphone Display": return <Smartphone className="w-4 h-4 text-[#2E6F40]" />;
      case "Laptop Keyboard Key": return <Keyboard className="w-4 h-4 text-[#2E6F40]" />;
      case "Room Light Switch": return <ToggleLeft className="w-4 h-4 text-[#2E6F40]" />;
      case "Electronic Pocket Calculator": return <Calculator className="w-4 h-4 text-[#2E6F40]" />;
      default: return <Sparkles className="w-4 h-4 text-[#2E6F40]" />;
    }
  };

  if (!section) return null;

  return (
    <article className="space-y-8 animate-in fade-in duration-200">
      
      {/* 1. TOP HEADER & DATA SCIENCE CONNECTION BANNER */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-[#2E6F40] text-white">
              Section {section.number}
            </span>
            <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-[#F2F7F4] text-[#2E6F40] border border-[#DCE7E1]">
              {section.badge}
            </span>
            {section.estimatedReadTime && (
              <span className="text-xs font-mono text-[#64748B] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {section.estimatedReadTime}
              </span>
            )}
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] tracking-tight">
            {section.title}
          </h1>
          {typeof section.overview === "string" && (
            <p className="text-sm text-[#475569] mt-2 leading-relaxed">
              {section.overview}
            </p>
          )}
        </div>

        {/* Data Science Connection Callout Box */}
        {section.dataScienceConnection && (
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#FAF8F5] to-[#F2F7F4] border border-[#DCE7E1] flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#2E6F40]/10 text-[#2E6F40] flex-shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E6F40]">
                Data Science and AI Connection
              </span>
              <p className="text-xs sm:text-sm text-[#1E293B] leading-relaxed">
                {section.dataScienceConnection}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1.1: DIGITAL SYSTEMS, COMPUTERS & ANALOG VS DIGITAL               */}
      {/* ========================================================================= */}
      {section.id === "1.1" && (
        <div className="space-y-8">
          
          {/* A. Core Theory in Crisp Bullet Points */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase text-[#2E6F40] bg-[#F2F7F4] px-2 py-0.5 rounded">
                Part A
              </span>
              <h2 className="text-lg font-bold text-[#1E293B]">Foundational Concepts (Signals and Systems)</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {section.theoryBullets && section.theoryBullets.map((group, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E6F40]">
                    {group.title}
                  </h3>
                  <ul className="space-y-2">
                    {group.points.map((pt, pIdx) => (
                      <li key={pIdx} className="text-xs text-[#475569] leading-relaxed flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2E6F40] flex-shrink-0 mt-1.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* SVG Waveform Illustration: Analog Sine Wave vs Digital Clock Pulse with Noise Margins */}
            <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
                <span className="text-xs font-mono font-bold uppercase text-[#2E6F40]">
                  Visual Waveform Comparison & Voltage Noise Margins
                </span>
                <span className="text-[10px] font-mono text-[#64748B]">Continuous v(t) vs. Quantized Bits</span>
              </div>

              <div className="w-full overflow-x-auto py-2">
                <svg viewBox="0 0 760 210" className="w-full min-w-[650px] max-w-[760px] mx-auto text-xs font-sans">
                  {/* Left: Analog Signal Waveform */}
                  <rect x="15" y="15" width="225" height="175" rx="8" fill="#FFFFFF" stroke="#DCE7E1" />
                  <text x="127" y="36" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#D97706">
                    Continuous Analog Signal v(t)
                  </text>
                  <line x1="35" y1="110" x2="225" y2="110" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="45" y1="45" x2="45" y2="175" stroke="#94A3B8" strokeWidth="1.5" />
                  <path d="M 45 110 Q 75 45 105 110 T 165 110 T 225 110" fill="none" stroke="#D97706" strokeWidth="2.5" />
                  <text x="50" y="55" fontSize="9" fill="#64748B">Voltage</text>
                  <text x="205" y="125" fontSize="9" fill="#64748B">Time (t)</text>
                  <text x="127" y="172" textAnchor="middle" fontSize="10" fill="#64748B">
                    Infinite continuous values between any two points
                  </text>

                  {/* Middle: Digital Signal Waveform */}
                  <rect x="255" y="15" width="235" height="175" rx="8" fill="#FFFFFF" stroke="#DCE7E1" />
                  <text x="372" y="36" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#2E6F40">
                    Quantized Digital Waveform (Bits)
                  </text>
                  <line x1="275" y1="150" x2="475" y2="150" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="285" y1="45" x2="285" y2="175" stroke="#94A3B8" strokeWidth="1.5" />
                  {/* Square wave */}
                  <path d="M 285 150 L 320 150 L 320 70 L 360 70 L 360 150 L 400 150 L 400 70 L 440 70 L 440 150 L 475 150" fill="none" stroke="#2E6F40" strokeWidth="2.5" />
                  <text x="340" y="62" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#2E6F40">Logic 1</text>
                  <text x="380" y="165" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#64748B">Logic 0</text>
                  <text x="372" y="180" textAnchor="middle" fontSize="10" fill="#64748B">
                    Only two valid states: HIGH (3.3V/5V) or LOW (0V)
                  </text>

                  {/* Right: Voltage Thresholds & Noise Margin Diagram */}
                  <rect x="505" y="15" width="240" height="175" rx="8" fill="#FFFFFF" stroke="#DCE7E1" />
                  <text x="625" y="36" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#4F46E5">
                    TTL Voltage Threshold Bands
                  </text>
                  
                  {/* Logic 1 Band (2.0V to 5.0V) */}
                  <rect x="535" y="48" width="180" height="26" fill="#F2F7F4" stroke="#2E6F40" strokeWidth="1" />
                  <text x="625" y="65" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#2E6F40">
                    Logic 1 Region (2.0V to 5.0V)
                  </text>
                  <text x="525" y="55" fontSize="8" fill="#64748B">5.0V</text>
                  <text x="525" y="75" fontSize="8" fill="#64748B">V_IH = 2.0V</text>

                  {/* Forbidden Region (0.8V to 2.0V) */}
                  <rect x="535" y="78" width="180" height="34" fill="#FEF2F2" stroke="#DC2626" strokeWidth="1" strokeDasharray="3 2" />
                  <text x="625" y="99" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#DC2626">
                    Forbidden Transition Zone
                  </text>
                  <text x="525" y="113" fontSize="8" fill="#64748B">V_IL = 0.8V</text>

                  {/* Logic 0 Band (0V to 0.8V) */}
                  <rect x="535" y="116" width="180" height="26" fill="#F8FAFC" stroke="#64748B" strokeWidth="1" />
                  <text x="625" y="133" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#475569">
                    Logic 0 Region (0V to 0.8V)
                  </text>
                  <text x="525" y="143" fontSize="8" fill="#64748B">0.0V</text>

                  {/* Noise Margin Note */}
                  <text x="625" y="172" textAnchor="middle" fontSize="9" fill="#4F46E5" fontWeight="bold">
                    Noise Margins protect data from thermal interference
                  </text>
                </svg>
              </div>
            </div>
          </div>

          {/* B. Everyday Real-Life Examples (with Visual Icons / Badges) */}
          {section.realLifeExamples && (
            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase text-[#4F46E5] bg-[#F2F7F4] px-2 py-0.5 rounded">
                  Part B
                </span>
                <h2 className="text-lg font-bold text-[#1E293B]">Relatable Everyday Examples</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Analog Examples Card */}
                <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
                    <span className="text-xs font-mono font-bold uppercase text-[#D97706] flex items-center gap-1.5">
                      <Gauge className="w-4 h-4" />
                      <span>Analog Everyday Examples (Continuous)</span>
                    </span>
                    <span className="text-[10px] font-mono text-[#64748B]">Infinite Values</span>
                  </div>
                  <div className="space-y-2.5">
                    {section.realLifeExamples.analog.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-white border border-[#DCE7E1] flex items-start gap-3 text-xs shadow-xs hover:border-[#D97706]/50 transition-colors">
                        <div className="p-2 rounded-md bg-[#D97706]/10 flex-shrink-0 mt-0.5">
                          {getExampleIcon(item.item)}
                        </div>
                        <div>
                          <span className="font-bold text-[#1E293B] block text-xs">{item.item}</span>
                          <span className="text-[#64748B] mt-0.5 block leading-relaxed text-[11px]">{item.detail}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Digital Examples Card */}
                <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
                    <span className="text-xs font-mono font-bold uppercase text-[#2E6F40] flex items-center gap-1.5">
                      <Binary className="w-4 h-4" />
                      <span>Digital Everyday Examples (Discrete)</span>
                    </span>
                    <span className="text-[10px] font-mono text-[#64748B]">0 and 1 States</span>
                  </div>
                  <div className="space-y-2.5">
                    {section.realLifeExamples.digital.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-white border border-[#DCE7E1] flex items-start gap-3 text-xs shadow-xs hover:border-[#2E6F40]/50 transition-colors">
                        <div className="p-2 rounded-md bg-[#2E6F40]/10 flex-shrink-0 mt-0.5">
                          {getExampleIcon(item.item)}
                        </div>
                        <div>
                          <span className="font-bold text-[#1E293B] block text-xs">{item.item}</span>
                          <span className="text-[#64748B] mt-0.5 block leading-relaxed text-[11px]">{item.detail}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* C. Engineering Enrichment: Information Quantization & Error Vulnerability */}
          {section.informationQuantization && (
            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase text-[#4F46E5] bg-[#F2F7F4] px-2 py-0.5 rounded">
                    Engineering Enrichment
                  </span>
                  <span className="text-xs text-[#64748B]">Transmission Reliability</span>
                </div>
                <h2 className="text-lg font-bold text-[#1E293B] mt-1">{section.informationQuantization.title}</h2>
                <p className="text-xs text-[#475569] mt-0.5 leading-relaxed">
                  {section.informationQuantization.subtitle}
                </p>
              </div>

              {/* Analog Dilemma vs Digital Regeneration Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Analog Noise Trap */}
                <div className="p-5 rounded-xl bg-[#FEF2F2]/60 border border-[#FECACA] space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-[#FECACA]">
                    <AlertTriangle className="w-4 h-4 text-[#DC2626]" />
                    <h3 className="text-xs font-bold text-[#991B1B]">
                      {section.informationQuantization.analogDilemma.title}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {section.informationQuantization.analogDilemma.points.map((pt, pIdx) => (
                      <li key={pIdx} className="text-xs text-[#7F1D1D] leading-relaxed flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] flex-shrink-0 mt-1.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Digital Regeneration Advantage */}
                <div className="p-5 rounded-xl bg-[#F0FDF4]/70 border border-[#BBF7D0] space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-[#BBF7D0]">
                    <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                    <h3 className="text-xs font-bold text-[#166534]">
                      {section.informationQuantization.digitalAdvantage.title}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {section.informationQuantization.digitalAdvantage.points.map((pt, pIdx) => (
                      <li key={pIdx} className="text-xs text-[#14532D] leading-relaxed flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] flex-shrink-0 mt-1.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Repeater Comparison Diagram */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1]">
                <div className="text-xs font-mono font-bold text-[#1E293B] mb-2 text-center">
                  Repeater Comparison: Analog Amplifier vs. Digital Regenerator
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 rounded-lg bg-white border border-[#DCE7E1] space-y-1">
                    <span className="font-bold text-[#DC2626] block">Analog Repeater (Linear Amplifier):</span>
                    <p className="text-[#64748B] text-[11px] leading-relaxed">
                      Input: Signal + Noise &rarr; Amplifier multiplies both by gain factor A &rarr; Output: A &times; (Signal + Noise). Noise builds up at every repeater stage until audio or data becomes unreadable.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-[#DCE7E1] space-y-1">
                    <span className="font-bold text-[#16A34A] block">Digital Repeater (Regenerative Switch):</span>
                    <p className="text-[#64748B] text-[11px] leading-relaxed">
                      Input: Noisy 0 or 1 &rarr; Threshold Detector samples voltage &rarr; Slices into binary state &rarr; Output: A brand-new, perfect square pulse. Complete noise elimination at every hop.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* D. Dedicated Section: "Why Digital Systems?" (6-Point Grid) */}
          {section.whyDigitalCards && (
            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase text-[#2E6F40] bg-[#F2F7F4] px-2 py-0.5 rounded">
                    Part D
                  </span>
                  <span className="text-xs text-[#64748B]">Engineering Motivation</span>
                </div>
                <h2 className="text-lg font-bold text-[#1E293B] mt-1">Why Did Modern Engineering Move to Digital Systems?</h2>
                <p className="text-xs text-[#64748B] mt-1">
                  Six decisive technological advantages that made digital computing replace analog circuits worldwide:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.whyDigitalCards.map((card) => (
                  <div key={card.number} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#2E6F40] text-white flex items-center justify-center font-mono text-[10px] font-bold">
                          {card.number}
                        </span>
                        <h3 className="text-xs font-bold text-[#1E293B]">{card.title}</h3>
                      </div>
                      <p className="text-xs text-[#475569] leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* E. Neatly Aligned Comparison Table (Analog vs. Digital Systems) */}
          {section.comparisonTable && (
            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase text-[#2E6F40] bg-[#F2F7F4] px-2 py-0.5 rounded">
                  Part E
                </span>
                <h2 className="text-lg font-bold text-[#1E293B]">Comprehensive Comparison: Analog Systems vs. Digital Systems</h2>
              </div>

              <div className="overflow-x-auto border border-[#DCE7E1] rounded-xl">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-[#FAF8F5] border-b border-[#DCE7E1] font-mono text-[#1E293B]">
                      {section.comparisonTable.headers.map((h, i) => (
                        <th key={i} className="py-3 px-4 font-bold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2F7F4]">
                    {section.comparisonTable.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-[#FAF8F5]/60 transition-colors">
                        <td className="py-3 px-4 font-mono font-semibold text-[#1E293B] bg-[#FAF8F5]/40">{row[0]}</td>
                        <td className="py-3 px-4 text-[#475569]">{row[1]}</td>
                        <td className="py-3 px-4 text-[#2E6F40] font-medium bg-[#F2F7F4]/30">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* F. Digital Computer Block Diagram & Point-by-Point Explanation */}
          {section.computerArchitecture && (
            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase text-[#2E6F40] bg-[#F2F7F4] px-2 py-0.5 rounded">
                    Part F
                  </span>
                  <span className="text-xs text-[#64748B]">Hardware Architecture</span>
                </div>
                <h2 className="text-lg font-bold text-[#1E293B] mt-1">{section.computerArchitecture.title}</h2>
                <p className="text-xs text-[#475569] mt-1 leading-relaxed">
                  {section.computerArchitecture.summary}
                </p>
              </div>

              {/* Clean SVG Block Diagram */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] flex flex-col items-center">
                <div className="w-full overflow-x-auto py-2">
                  <svg viewBox="0 0 760 270" className="w-full min-w-[650px] max-w-[760px] mx-auto text-xs font-sans">
                    <defs>
                      <marker id="arrowSolid" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                        <path d="M0,0 L6,3 L0,6 Z" fill="#2E6F40" />
                      </marker>
                    </defs>

                    {/* Input Unit Box */}
                    <rect x="20" y="90" width="120" height="80" rx="8" fill="#FFFFFF" stroke="#2E6F40" strokeWidth="2" />
                    <text x="80" y="125" textAnchor="middle" fontWeight="bold" fill="#1E293B" fontSize="12">INPUT UNIT</text>
                    <text x="80" y="145" textAnchor="middle" fill="#64748B" fontSize="9">Keyboard / Sensors</text>

                    {/* Arrow: Input -> CPU */}
                    <line x1="140" y1="130" x2="200" y2="130" stroke="#2E6F40" strokeWidth="2" markerEnd="url(#arrowSolid)" />

                    {/* Central CPU Container */}
                    <rect x="210" y="20" width="320" height="230" rx="12" fill="#F8FAFC" stroke="#4F46E5" strokeWidth="2" strokeDasharray="4 4" />
                    <text x="370" y="42" textAnchor="middle" fontWeight="bold" fill="#4F46E5" fontSize="11" letterSpacing="1">CENTRAL PROCESSING UNIT (CPU)</text>

                    {/* Control Unit */}
                    <rect x="230" y="60" width="280" height="45" rx="6" fill="#FFFFFF" stroke="#DCE7E1" strokeWidth="1.5" />
                    <text x="370" y="87" textAnchor="middle" fontWeight="bold" fill="#1E293B" fontSize="11">Control Unit (CU)</text>

                    {/* ALU */}
                    <rect x="230" y="118" width="280" height="45" rx="6" fill="#FFFFFF" stroke="#DCE7E1" strokeWidth="1.5" />
                    <text x="370" y="145" textAnchor="middle" fontWeight="bold" fill="#1E293B" fontSize="11">Arithmetic & Logic Unit (ALU)</text>

                    {/* Registers */}
                    <rect x="230" y="176" width="280" height="50" rx="6" fill="#FFFFFF" stroke="#DCE7E1" strokeWidth="1.5" />
                    <text x="370" y="198" textAnchor="middle" fontWeight="bold" fill="#1E293B" fontSize="11">Internal CPU Registers</text>
                    <text x="370" y="214" textAnchor="middle" fill="#64748B" fontSize="9">Accumulator · Program Counter · IR</text>

                    {/* Arrow: CPU -> Output */}
                    <line x1="530" y1="130" x2="600" y2="130" stroke="#2E6F40" strokeWidth="2" markerEnd="url(#arrowSolid)" />

                    {/* Output Unit Box */}
                    <rect x="610" y="90" width="130" height="80" rx="8" fill="#FFFFFF" stroke="#2E6F40" strokeWidth="2" />
                    <text x="675" y="125" textAnchor="middle" fontWeight="bold" fill="#1E293B" fontSize="12">OUTPUT UNIT</text>
                    <text x="675" y="145" textAnchor="middle" fill="#64748B" fontSize="9">Display / Actuators</text>
                  </svg>
                </div>
                <div className="flex items-center gap-6 text-[11px] font-mono mt-2 text-[#64748B]">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-0.5 bg-[#2E6F40]" />
                    <span>Solid Green Line: Data Bus</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-0.5 bg-[#4F46E5] border-t border-dashed" />
                    <span>Dashed Indigo Box: CPU Boundary</span>
                  </div>
                </div>
              </div>

              {/* Point-by-Point Functional Roles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.computerArchitecture.blocks.map((b, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-[#2E6F40]" />
                      <h4 className="text-xs font-bold text-[#1E293B]">{b.name}</h4>
                    </div>
                    <p className="text-xs text-[#475569] leading-relaxed">{b.role}</p>
                    {b.subBlocks && (
                      <div className="space-y-1.5 pt-2 border-t border-[#DCE7E1]">
                        {b.subBlocks.map((sb, sIdx) => (
                          <div key={sIdx} className="text-xs text-[#475569]">
                            <span className="font-bold text-[#1E293B]">{sb.name}: </span>
                            <span>{sb.desc}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 1.2: DECIMAL, BINARY, OCTAL & HEXADECIMAL NUMBER SYSTEMS          */}
      {/* ========================================================================= */}
      {section.id === "1.2" && (
        <div className="space-y-8">
          
          {/* A. Properly Aligned Mathematical Equation Box */}
          {section.generalFormula && (
            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase text-[#2E6F40] bg-[#F2F7F4] px-2 py-0.5 rounded">
                  Part A
                </span>
                <h2 className="text-lg font-bold text-[#1E293B]">{section.generalFormula.title}</h2>
              </div>

              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                {section.generalFormula.explanation}
              </p>

              {/* Typeset Equation Box */}
              <div className="p-6 rounded-xl bg-gradient-to-r from-[#FAF8F5] via-white to-[#FAF8F5] border-2 border-[#2E6F40]/30 shadow-sm text-center">
                <div className="text-sm sm:text-base font-serif text-[#1E293B] tracking-wide inline-block">
                  <span className="font-bold font-mono">(N)<sub>r</sub></span> = &nbsp;
                  d<sub>n-1</sub> · r<sup>n-1</sup> + d<sub>n-2</sub> · r<sup>n-2</sup> + ··· + d<sub>1</sub> · r<sup>1</sup> + d<sub>0</sub> · r<sup>0</sup>
                  &nbsp;+&nbsp;
                  <span className="text-[#2E6F40] font-bold">[Radix Point]</span>
                  &nbsp;+&nbsp;
                  d<sub>-1</sub> · r<sup>-1</sup> + d<sub>-2</sub> · r<sup>-2</sup> + ··· + d<sub>-m</sub> · r<sup>-m</sup>
                </div>
              </div>

              {/* Variable Definitions Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
                {section.generalFormula.terms.map((t, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] text-center">
                    <span className="text-xs font-mono font-bold text-[#2E6F40] block">{t.symbol}</span>
                    <span className="text-[11px] font-bold text-[#1E293B] block mt-0.5">{t.name}</span>
                    <span className="text-[10px] text-[#64748B] mt-1 block leading-tight">{t.desc}</span>
                  </div>
                ))}
              </div>

              {/* Visual Place-Value Breakdown Diagram (STACKED VERTICALLY IN HORIZONTAL CARDS) */}
              {section.placeValueBreakdowns && (
                <div className="pt-4 border-t border-[#DCE7E1] space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B]">
                      Visual Place-Value Weight Breakdown (Stacked Horizontal Cards)
                    </h3>
                    <span className="text-[10px] font-mono text-[#2E6F40]">Digit &times; Weight = Decimal Value</span>
                  </div>
                  
                  {/* Vertical stack: Card 1 above Card 2 */}
                  <div className="space-y-4">
                    {section.placeValueBreakdowns.map((bd, bIdx) => (
                      <div key={bIdx} className="p-5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-4">
                        <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-mono font-bold text-[#1E293B]">{bd.number}</span>
                            <span className="text-xs text-[#64748B]">in {bd.base}</span>
                          </div>
                          <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-[#2E6F40] text-white">
                            Polynomial Model
                          </span>
                        </div>

                        {/* Top-and-Bottom Stacked Structure: Horizontal grid with all rows visible */}
                        <div className="overflow-x-auto">
                          <table className="w-full text-center border-collapse">
                            <tbody>
                              {/* Row 1: The Number Digits */}
                              <tr className="border-b border-[#DCE7E1]/60">
                                <td className="py-2 px-3 text-left font-mono font-bold text-[#64748B] text-[11px] w-36">
                                  Digit (d<sub>i</sub>):
                                </td>
                                {bd.parts.map((p, pIdx) => (
                                  <td 
                                    key={pIdx} 
                                    className={`py-2 px-3 font-mono font-bold text-sm ${
                                      p.digit === '.' 
                                        ? 'text-[#2E6F40] bg-[#2E6F40]/10 rounded' 
                                        : 'text-[#1E293B] bg-white rounded border border-[#DCE7E1]/50'
                                    }`}
                                  >
                                    {p.digit}
                                  </td>
                                ))}
                              </tr>

                              {/* Row 2: The Positional Weights */}
                              <tr className="border-b border-[#DCE7E1]/60">
                                <td className="py-2 px-3 text-left font-mono font-semibold text-[#64748B] text-[11px]">
                                  Weight (r<sup>i</sup>):
                                </td>
                                {bd.parts.map((p, pIdx) => (
                                  <td key={pIdx} className="py-2 px-3 font-mono text-xs text-[#4F46E5] font-semibold">
                                    {p.weight}
                                  </td>
                                ))}
                              </tr>

                              {/* Row 3: Decimal Position Value */}
                              <tr className="border-b border-[#DCE7E1]/60">
                                <td className="py-2 px-3 text-left font-mono font-semibold text-[#64748B] text-[11px]">
                                  Position Value:
                                </td>
                                {bd.parts.map((p, pIdx) => (
                                  <td key={pIdx} className="py-2 px-3 font-mono font-bold text-xs text-[#2E6F40]">
                                    {p.value}
                                  </td>
                                ))}
                              </tr>

                              {/* Row 4: Role / Significance Label */}
                              <tr>
                                <td className="py-2 px-3 text-left font-mono text-[#64748B] text-[10px]">
                                  Significance:
                                </td>
                                {bd.parts.map((p, pIdx) => (
                                  <td key={pIdx} className="py-2 px-3 font-mono text-[10px] text-[#64748B]">
                                    {p.label}
                                  </td>
                                ))}
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        {/* Summation Formula Banner */}
                        <div className="p-3 rounded-lg bg-white border border-[#DCE7E1] text-xs font-mono text-center text-[#1E293B] font-semibold">
                          Total Value: {bd.totalExpansion}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* B. The Four Primary Computing Bases (4 Structured Cards) */}
          {section.computingBases && (
            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase text-[#2E6F40] bg-[#F2F7F4] px-2 py-0.5 rounded">
                  Part B
                </span>
                <h2 className="text-lg font-bold text-[#1E293B]">The Four Primary Computing Bases</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.computingBases.map((base) => (
                  <div key={base.id} className="p-5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#DCE7E1]">
                        <div>
                          <h3 className="text-sm font-bold text-[#1E293B]">{base.name}</h3>
                          <span className="text-[10px] text-[#64748B] font-mono">{base.purpose}</span>
                        </div>
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#2E6F40] text-white">
                          Base r = {base.radix}
                        </span>
                      </div>

                      {/* Digit Set Badge */}
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-mono text-[#64748B] text-[11px]">Symbols:</span>
                        <code className="px-2 py-0.5 rounded bg-white border border-[#DCE7E1] font-mono text-[11px] text-[#2E6F40] font-bold">
                          {base.symbolSet}
                        </code>
                      </div>

                      {/* Horizontal Place-Value Weight Strip */}
                      <div>
                        <span className="text-[10px] font-mono uppercase text-[#64748B] block mb-1">
                          Positional Weight Strip
                        </span>
                        <div className="flex items-center gap-1 overflow-x-auto pb-1">
                          {base.weightStrip.map((ws, wIdx) => (
                            <div key={wIdx} className="p-1.5 rounded bg-white border border-[#DCE7E1] text-center min-w-[46px] flex-shrink-0">
                              <span className="text-[10px] font-mono font-bold text-[#1E293B] block">{ws.power}</span>
                              <span className="text-[9px] font-mono text-[#2E6F40] block">{ws.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Notes / Bullet points */}
                      <ul className="space-y-1.5 pt-2 border-t border-[#DCE7E1]/80">
                        {base.notes.map((note, nIdx) => (
                          <li key={nIdx} className="text-xs text-[#475569] leading-relaxed flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2E6F40] flex-shrink-0 mt-1.5" />
                            <span>{note}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* C. Clean Master Reference Table (0 to 16 across Decimal, Binary, Octal, Hex) */}
          {section.referenceTable && (
            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase text-[#2E6F40] bg-[#F2F7F4] px-2 py-0.5 rounded">
                  Part C
                </span>
                <h2 className="text-lg font-bold text-[#1E293B]">Master Computing Bases Lookup Table (Values 0 to 16)</h2>
              </div>
              <p className="text-xs text-[#64748B]">
                Memorize these 16 equivalents to perform binary, octal, and hexadecimal grouping instantaneously during exams:
              </p>

              <div className="overflow-x-auto border border-[#DCE7E1] rounded-xl">
                <table className="w-full text-xs text-center border-collapse">
                  <thead>
                    <tr className="bg-[#FAF8F5] border-b border-[#DCE7E1] font-mono text-[#1E293B]">
                      <th className="py-2.5 px-3">Decimal (r=10)</th>
                      <th className="py-2.5 px-3">Binary 4-bit (r=2)</th>
                      <th className="py-2.5 px-3">Octal (r=8)</th>
                      <th className="py-2.5 px-3">Hexadecimal (r=16)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2F7F4] font-mono">
                    {section.referenceTable.map((row) => (
                      <tr key={row.dec} className="hover:bg-[#FAF8F5]/60 transition-colors">
                        <td className="py-2 px-3 font-bold text-[#1E293B]">{row.dec}</td>
                        <td className="py-2 px-3 text-[#2E6F40] font-bold">{row.bin}</td>
                        <td className="py-2 px-3 text-[#D97706] font-semibold">{row.oct}</td>
                        <td className="py-2 px-3 text-[#4F46E5] font-bold">{row.hex}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* D. Fundamental Concept Examples */}
          {section.fundamentalConcepts && (
            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase text-[#2E6F40] bg-[#F2F7F4] px-2 py-0.5 rounded">
                  Part D
                </span>
                <h2 className="text-lg font-bold text-[#1E293B]">Fundamental Examination Concepts</h2>
              </div>

              <div className="space-y-4">
                {section.fundamentalConcepts.map((fc, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3">
                    <h3 className="text-xs font-bold text-[#1E293B] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2E6F40]" />
                      <span>{fc.title}</span>
                    </h3>
                    <p className="text-xs text-[#475569] leading-relaxed">{fc.desc}</p>
                    
                    {/* Examples list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {fc.examples.map((ex, eIdx) => (
                        <div key={eIdx} className="p-2.5 rounded-lg bg-white border border-[#DCE7E1] text-xs">
                          {ex.number && (
                            <div className="flex items-center justify-between font-mono mb-1">
                              <span className="font-bold text-[#1E293B]">{ex.number}</span>
                              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${ex.valid ? 'bg-[#F2F7F4] text-[#2E6F40]' : 'bg-[#FEF2F2] text-[#DC2626]'}`}>
                                {ex.valid ? 'VALID' : 'INVALID'}
                              </span>
                            </div>
                          )}
                          {ex.base && (
                            <span className="text-[11px] font-mono font-bold text-[#4F46E5] block mb-1">{ex.base}</span>
                          )}
                          {ex.question && (
                            <span className="text-[#1E293B] font-medium block">{ex.question}</span>
                          )}
                          {ex.solution && (
                            <span className="text-[#2E6F40] mt-1 block font-mono text-[11px]">{ex.solution}</span>
                          )}
                          {ex.reason && (
                            <span className="text-[#64748B] block mt-0.5">{ex.reason}</span>
                          )}
                          {ex.entity && (
                            <div>
                              <span className="font-bold text-[#1E293B] block">{ex.entity}</span>
                              <span className="text-[11px] font-mono text-[#2E6F40] block">{ex.combinations}</span>
                              <span className="text-[10px] text-[#64748B] font-mono block">Range: {ex.range}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 1.3: ALL 12 NUMBER SYSTEM CONVERSIONS MASTER GUIDE                 */}
      {/* ========================================================================= */}
      {section.id === "1.3" && (
        <div className="space-y-8">
          
          {/* Sub-Navigation Tabs for the 4 Master Groups + Part 5 Cheat Sheet */}
          <div className="p-4 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E6F40]">
                12-Path Master Conversion Highway
              </span>
              <span className="text-xs text-[#64748B]">Select a Conversion Group to Study:</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              <button
                onClick={() => setActiveSubTab13("overview")}
                className={`p-2 rounded-xl text-xs font-mono font-bold transition-all text-center ${
                  activeSubTab13 === "overview"
                    ? 'bg-[#2E6F40] text-white shadow-sm'
                    : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]'
                }`}
              >
                Overview & Maps
              </button>
              <button
                onClick={() => setActiveSubTab13("1.3A")}
                className={`p-2 rounded-xl text-xs font-mono font-bold transition-all text-center ${
                  activeSubTab13 === "1.3A"
                    ? 'bg-[#2E6F40] text-white shadow-sm'
                    : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]'
                }`}
              >
                1.3A: From Decimal
              </button>
              <button
                onClick={() => setActiveSubTab13("1.3B")}
                className={`p-2 rounded-xl text-xs font-mono font-bold transition-all text-center ${
                  activeSubTab13 === "1.3B"
                    ? 'bg-[#2E6F40] text-white shadow-sm'
                    : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]'
                }`}
              >
                1.3B: To Decimal
              </button>
              <button
                onClick={() => setActiveSubTab13("1.3C")}
                className={`p-2 rounded-xl text-xs font-mono font-bold transition-all text-center ${
                  activeSubTab13 === "1.3C"
                    ? 'bg-[#2E6F40] text-white shadow-sm'
                    : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]'
                }`}
              >
                1.3C: Grouping
              </button>
              <button
                onClick={() => setActiveSubTab13("1.3D")}
                className={`p-2 rounded-xl text-xs font-mono font-bold transition-all text-center ${
                  activeSubTab13 === "1.3D"
                    ? 'bg-[#2E6F40] text-white shadow-sm'
                    : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]'
                }`}
              >
                1.3D: Oct-Hex & Radix
              </button>
              <button
                onClick={() => setActiveSubTab13("cheatSheet")}
                className={`p-2 rounded-xl text-xs font-mono font-bold transition-all text-center ${
                  activeSubTab13 === "cheatSheet"
                    ? 'bg-[#4F46E5] text-white shadow-sm'
                    : 'bg-[#FAF8F5] text-[#4F46E5] hover:bg-[#EEF2FF] border border-[#DCE7E1]'
                }`}
              >
                Cheat Sheet
              </button>
              <button
                onClick={() => setActiveSubTab13("examChallenge")}
                className={`p-2 rounded-xl text-xs font-mono font-bold transition-all text-center ${
                  activeSubTab13 === "examChallenge"
                    ? 'bg-[#D97706] text-white shadow-sm'
                    : 'bg-[#FAF8F5] text-[#D97706] hover:bg-[#FEF3C7] border border-[#DCE7E1]'
                }`}
              >
                Mixed Exam Practice (20 Qs)
              </button>
            </div>
          </div>

          {/* Master Flowcharts & Tree Diagrams Block (Shown ONLY when Overview & Maps is selected) */}
          {activeSubTab13 === "overview" && (
            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase text-[#2E6F40] bg-[#F2F7F4] px-2 py-0.5 rounded">
                  Conversion Maps
                </span>
                <h2 className="text-lg font-bold text-[#1E293B]">Master Highway Map & Successive Tree Architecture</h2>
              </div>

              {/* Diagram 1: Master 12-Path Highway Map */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] flex flex-col items-center">
                <span className="text-xs font-mono font-bold text-[#1E293B] mb-2">
                  The Master 12-Path Conversion Highway Map
                </span>
                <div className="w-full overflow-x-auto py-2">
                  <svg viewBox="0 0 760 300" className="w-full min-w-[680px] max-w-[760px] mx-auto text-xs font-sans">
                    <defs>
                      <marker id="arrowGreen" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                        <path d="M0,0 L5,3 L0,6 Z" fill="#2E6F40" />
                      </marker>
                      <marker id="arrowDark" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                        <path d="M0,0 L5,3 L0,6 Z" fill="#1E293B" />
                      </marker>
                      <marker id="arrowAmber" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                        <path d="M0,0 L5,3 L0,6 Z" fill="#D97706" />
                      </marker>
                      <marker id="arrowBlue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                        <path d="M0,0 L5,3 L0,6 Z" fill="#4F46E5" />
                      </marker>
                      <marker id="arrowSlate" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                        <path d="M0,0 L5,3 L0,6 Z" fill="#64748B" />
                      </marker>
                      <marker id="arrowSlateRev" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
                        <path d="M5,0 L0,3 L5,6 Z" fill="#64748B" />
                      </marker>
                    </defs>

                    {/* DECIMAL HUB */}
                    <rect x="290" y="15" width="180" height="52" rx="8" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
                    <text x="380" y="36" textAnchor="middle" fontWeight="bold" fill="#1E293B" fontSize="12">DECIMAL (Base 10)</text>
                    <text x="380" y="52" textAnchor="middle" fill="#64748B" fontSize="9">Human Daily Positional Arithmetic</text>

                    {/* BINARY HUB (CENTRAL SUPER-HIGHWAY) */}
                    <rect x="290" y="150" width="180" height="54" rx="8" fill="#F2F7F4" stroke="#2E6F40" strokeWidth="2.5" />
                    <text x="380" y="172" textAnchor="middle" fontWeight="bold" fill="#2E6F40" fontSize="13">BINARY (Base 2)</text>
                    <text x="380" y="190" textAnchor="middle" fill="#2E6F40" fontSize="9" fontWeight="bold">Central Bridge Highway</text>

                    {/* OCTAL HUB */}
                    <rect x="35" y="150" width="150" height="54" rx="8" fill="#FFFFFF" stroke="#D97706" strokeWidth="2" />
                    <text x="110" y="172" textAnchor="middle" fontWeight="bold" fill="#D97706" fontSize="12">OCTAL (Base 8)</text>
                    <text x="110" y="190" textAnchor="middle" fill="#64748B" fontSize="9">Compact 3-Bit Groups</text>

                    {/* HEXADECIMAL HUB */}
                    <rect x="575" y="150" width="150" height="54" rx="8" fill="#FFFFFF" stroke="#4F46E5" strokeWidth="2" />
                    <text x="650" y="172" textAnchor="middle" fontWeight="bold" fill="#4F46E5" fontSize="12">HEXADECIMAL (Base 16)</text>
                    <text x="650" y="190" textAnchor="middle" fill="#64748B" fontSize="9">Compact 4-Bit Nibbles</text>

                    {/* Dec <-> Bin vertical arrows with clear separation */}
                    {/* Left downward arrow: Dec -> Bin */}
                    <line x1="335" y1="67" x2="335" y2="148" stroke="#2E6F40" strokeWidth="2" markerEnd="url(#arrowGreen)" />
                    <text x="325" y="104" fontSize="10" fontWeight="bold" fill="#2E6F40" textAnchor="end">Div / Mul by 2</text>
                    <text x="325" y="117" fontSize="8" fill="#64748B" textAnchor="end">Successive Div / Mul</text>

                    {/* Right upward arrow: Bin -> Dec */}
                    <line x1="425" y1="148" x2="425" y2="67" stroke="#1E293B" strokeWidth="2" markerEnd="url(#arrowDark)" />
                    <text x="435" y="104" fontSize="10" fontWeight="bold" fill="#1E293B" textAnchor="start">Weight Sum ∑ d·2ⁱ</text>
                    <text x="435" y="117" fontSize="8" fill="#64748B" textAnchor="start">Positional Expansion</text>

                    {/* Oct <-> Bin horizontal arrows (Direct 3-bit) */}
                    <line x1="185" y1="168" x2="288" y2="168" stroke="#D97706" strokeWidth="2" markerEnd="url(#arrowAmber)" />
                    <line x1="288" y1="188" x2="187" y2="188" stroke="#D97706" strokeWidth="2" markerEnd="url(#arrowAmber)" />
                    <text x="237" y="162" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#D97706">Direct 3-Bit Groups</text>

                    {/* Bin <-> Hex horizontal arrows (Direct 4-bit) */}
                    <line x1="470" y1="168" x2="573" y2="168" stroke="#4F46E5" strokeWidth="2" markerEnd="url(#arrowBlue)" />
                    <line x1="573" y1="188" x2="472" y2="188" stroke="#4F46E5" strokeWidth="2" markerEnd="url(#arrowBlue)" />
                    <text x="522" y="162" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#4F46E5">Direct 4-Bit Nibbles</text>

                    {/* Oct <-> Hex shortcut bridge underneath with protective solid pill */}
                    <path d="M 110 204 C 110 286, 650 286, 650 204" fill="none" stroke="#64748B" strokeWidth="1.75" strokeDasharray="5 4" markerStart="url(#arrowSlateRev)" markerEnd="url(#arrowSlate)" />
                    <rect x="145" y="248" width="470" height="28" rx="14" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />
                    <text x="380" y="266" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#334155">
                      Octal ↔ Hexadecimal Bridge (Always via 3-bit ↔ 4-bit Binary)
                    </text>
                  </svg>
                </div>
              </div>

              {/* Diagram 2: Visual Successive Division & Multiplication Tree */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] flex flex-col items-center">
                <span className="text-xs font-mono font-bold text-[#1E293B] mb-2">
                  Successive Division & Multiplication Architecture: (45.625)₁₀ &rarr; Binary
                </span>
                <div className="w-full overflow-x-auto py-2">
                  <svg viewBox="0 0 740 240" className="w-full min-w-[650px] max-w-[740px] mx-auto text-xs font-sans">
                    {/* Left: Integer Part 45 via Successive Division */}
                    <rect x="10" y="10" width="350" height="220" rx="8" fill="#FFFFFF" stroke="#DCE7E1" />
                    <text x="25" y="32" fontSize="11" fontWeight="bold" fill="#1E293B">Integer 45 &divide; 2 (Read Upwards &uarr;)</text>
                    
                    <text x="40" y="60" fontSize="11" fill="#1E293B">45 &divide; 2 = 22 with Remainder: <tspan fill="#2E6F40" fontWeight="bold">1</tspan> (LSB)</text>
                    <text x="40" y="85" fontSize="11" fill="#1E293B">22 &divide; 2 = 11 with Remainder: <tspan fill="#1E293B" fontWeight="bold">0</tspan></text>
                    <text x="40" y="110" fontSize="11" fill="#1E293B">11 &divide; 2 = 5 with Remainder: <tspan fill="#1E293B" fontWeight="bold">1</tspan></text>
                    <text x="40" y="135" fontSize="11" fill="#1E293B">5 &divide; 2 = 2 with Remainder: <tspan fill="#1E293B" fontWeight="bold">1</tspan></text>
                    <text x="40" y="160" fontSize="11" fill="#1E293B">2 &divide; 2 = 1 with Remainder: <tspan fill="#1E293B" fontWeight="bold">0</tspan></text>
                    <text x="40" y="185" fontSize="11" fill="#1E293B">1 &divide; 2 = 0 with Remainder: <tspan fill="#2E6F40" fontWeight="bold">1</tspan> (MSB)</text>

                    {/* Upward reading arrow */}
                    <line x1="280" y1="185" x2="280" y2="60" stroke="#2E6F40" strokeWidth="2.5" />
                    <polygon points="280,52 274,62 286,62" fill="#2E6F40" />
                    <text x="292" y="125" fontSize="10" fill="#2E6F40" fontWeight="bold">Read Up</text>
                    <text x="40" y="215" fontSize="11" fill="#2E6F40" fontWeight="bold">(45)₁₀ = (101101)₂</text>

                    {/* Right: Fractional Part 0.625 via Successive Multiplication */}
                    <rect x="380" y="10" width="350" height="220" rx="8" fill="#FFFFFF" stroke="#DCE7E1" />
                    <text x="395" y="32" fontSize="11" fontWeight="bold" fill="#1E293B">Fraction 0.625 &times; 2 (Read Downwards &darr;)</text>

                    <text x="410" y="65" fontSize="11" fill="#1E293B">0.625 &times; 2 = <tspan fill="#4F46E5" fontWeight="bold">1</tspan>.25 &rarr; Carry: <tspan fill="#4F46E5" fontWeight="bold">1</tspan> (First bit)</text>
                    <text x="410" y="100" fontSize="11" fill="#1E293B">0.250 &times; 2 = <tspan fill="#1E293B" fontWeight="bold">0</tspan>.50 &rarr; Carry: <tspan fill="#1E293B" fontWeight="bold">0</tspan></text>
                    <text x="410" y="135" fontSize="11" fill="#1E293B">0.500 &times; 2 = <tspan fill="#4F46E5" fontWeight="bold">1</tspan>.00 &rarr; Carry: <tspan fill="#4F46E5" fontWeight="bold">1</tspan> (Fraction = 0, Stop!)</text>

                    {/* Downward reading arrow */}
                    <line x1="650" y1="65" x2="650" y2="135" stroke="#4F46E5" strokeWidth="2.5" />
                    <polygon points="650,143 644,133 656,133" fill="#4F46E5" />
                    <text x="660" y="105" fontSize="10" fill="#4F46E5" fontWeight="bold">Read Down</text>

                    <text x="410" y="175" fontSize="11" fill="#4F46E5" fontWeight="bold">(0.625)₁₀ = (0.101)₂</text>
                    <rect x="405" y="190" width="300" height="28" rx="4" fill="#F2F7F4" stroke="#2E6F40" />
                    <text x="555" y="209" textAnchor="middle" fontSize="11" fill="#2E6F40" fontWeight="bold">Combined: (45.625)₁₀ = (101101.101)₂</text>
                  </svg>
                </div>
              </div>

              {/* Brief 4-Technique Orientation Guide */}
              <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-[#DCE7E1]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase text-[#2E6F40] bg-[#F2F7F4] px-2 py-0.5 rounded">
                      Orientation Guide
                    </span>
                    <h3 className="text-sm font-bold text-[#1E293B]">
                      The 4 Universal Techniques Behind All 12 Conversions
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-[#64748B]">Click any card to inspect worked models</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* Technique 1 */}
                  <div 
                    onClick={() => setActiveSubTab13("1.3A")}
                    className="p-3.5 rounded-xl bg-white border border-[#DCE7E1] hover:border-[#2E6F40] hover:shadow-sm cursor-pointer transition-all space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase text-[#2E6F40] bg-[#F2F7F4] px-1.5 py-0.5 rounded">
                        Group 1.3A
                      </span>
                      <span className="text-[10px] font-mono font-bold text-[#64748B]">Conversions 1, 2, 3</span>
                    </div>
                    <h4 className="text-xs font-bold text-[#1E293B] group-hover:text-[#2E6F40] transition-colors">Decimal to Any Base r</h4>
                    <p className="text-[11px] text-[#475569] leading-relaxed">
                      Successive division by radix <span className="font-mono font-bold text-[#1E293B]">r</span> for integer part (remainders read upward &uarr;). Successive multiplication by <span className="font-mono font-bold text-[#1E293B]">r</span> for fractional part (carries read downward &darr;).
                    </p>
                    <div className="text-[10px] font-mono font-bold text-[#2E6F40] pt-1">Study 1.3A &rarr;</div>
                  </div>

                  {/* Technique 2 */}
                  <div 
                    onClick={() => setActiveSubTab13("1.3B")}
                    className="p-3.5 rounded-xl bg-white border border-[#DCE7E1] hover:border-[#4F46E5] hover:shadow-sm cursor-pointer transition-all space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase text-[#4F46E5] bg-[#EEF2FF] px-1.5 py-0.5 rounded">
                        Group 1.3B
                      </span>
                      <span className="text-[10px] font-mono font-bold text-[#64748B]">Conversions 4, 5, 6</span>
                    </div>
                    <h4 className="text-xs font-bold text-[#1E293B] group-hover:text-[#4F46E5] transition-colors">Any Base r to Decimal</h4>
                    <p className="text-[11px] text-[#475569] leading-relaxed">
                      Positional weight sum expansion: <span className="font-mono font-bold text-[#4F46E5]">∑ d·rⁱ</span>. Multiply each digit by its integer or fractional positional weight of <span className="font-mono font-bold text-[#1E293B]">r</span> and sum the products.
                    </p>
                    <div className="text-[10px] font-mono font-bold text-[#4F46E5] pt-1">Study 1.3B &rarr;</div>
                  </div>

                  {/* Technique 3 */}
                  <div 
                    onClick={() => setActiveSubTab13("1.3C")}
                    className="p-3.5 rounded-xl bg-white border border-[#DCE7E1] hover:border-[#D97706] hover:shadow-sm cursor-pointer transition-all space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase text-[#D97706] bg-[#FFFBEB] px-1.5 py-0.5 rounded">
                        Group 1.3C
                      </span>
                      <span className="text-[10px] font-mono font-bold text-[#64748B]">Conversions 7, 8, 9, 10</span>
                    </div>
                    <h4 className="text-xs font-bold text-[#1E293B] group-hover:text-[#D97706] transition-colors">Direct Bit Grouping</h4>
                    <p className="text-[11px] text-[#475569] leading-relaxed">
                      Powers of 2: Octal (<span className="font-mono font-bold">2³ = 8</span>) maps directly to 3-bit triplets; Hexadecimal (<span className="font-mono font-bold">2⁴ = 16</span>) maps directly to 4-bit nibbles without decimal arithmetic.
                    </p>
                    <div className="text-[10px] font-mono font-bold text-[#D97706] pt-1">Study 1.3C &rarr;</div>
                  </div>

                  {/* Technique 4 */}
                  <div 
                    onClick={() => setActiveSubTab13("1.3D")}
                    className="p-3.5 rounded-xl bg-white border border-[#DCE7E1] hover:border-[#0284C7] hover:shadow-sm cursor-pointer transition-all space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase text-[#0284C7] bg-[#F0F9FF] px-1.5 py-0.5 rounded">
                        Group 1.3D
                      </span>
                      <span className="text-[10px] font-mono font-bold text-[#64748B]">Conversions 11, 12 & Radix</span>
                    </div>
                    <h4 className="text-xs font-bold text-[#1E293B] group-hover:text-[#0284C7] transition-colors">Bridge & Arbitrary Radix</h4>
                    <p className="text-[11px] text-[#475569] leading-relaxed">
                      Never convert Octal directly to Hexadecimal. Bridge via Binary (<span className="font-mono font-bold">8 ↔ 2 ↔ 16</span>). For arbitrary base conversions (<span className="font-mono font-bold">r₁ &rarr; r₂</span>), bridge via Decimal.
                    </p>
                    <div className="text-[10px] font-mono font-bold text-[#0284C7] pt-1">Study 1.3D &rarr;</div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Render Subsections 1.3A to 1.3D (Shown ONLY when the corresponding sub-tab is selected) */}
          {section.subSections && section.subSections.map((sub) => {
            if (activeSubTab13 !== sub.id) {
              return null;
            }

            return (
              <div key={sub.id} className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
                
                {/* Subsection Header */}
                <div className="pb-3 border-b border-[#DCE7E1] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase text-[#2E6F40] bg-[#F2F7F4] px-2 py-0.5 rounded">
                      {sub.id}
                    </span>
                    <h2 className="text-lg font-bold text-[#1E293B] mt-1">{sub.title}</h2>
                  </div>
                  <span className="text-xs font-mono text-[#64748B]">Select active conversion / model:</span>
                </div>

                {/* Conversion Cards inside this subsection */}
                {sub.id === "1.3A" ? (() => {
                  const currentConv = sub.conversions.find(c => c.number === activeConv13A) || sub.conversions[0];
                  const targetBase = currentConv.targetBase || (currentConv.number === "Conversion 1" ? 2 : currentConv.number === "Conversion 2" ? 8 : 16);
                  const displayedModels = currentConv.models.filter((_, idx) => {
                    if (activeModelFilter13A === "all") return true;
                    return activeModelFilter13A === String(idx);
                  });

                  return (
                    <div className="space-y-6">
                      
                      {/* 1. Sleek 3-Tab Conversion Switcher Bar */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                        {sub.conversions.map((conv) => {
                          const isActive = activeConv13A === conv.number;
                          const badgeText = conv.targetBase === 2 ? "÷ 2 / × 2" : conv.targetBase === 8 ? "÷ 8 / × 8" : "÷ 16 / × 16";
                          const targetName = conv.targetBase === 2 ? "Binary (Base 2)" : conv.targetBase === 8 ? "Octal (Base 8)" : "Hexadecimal (Base 16)";
                          return (
                            <button
                              key={conv.number}
                              onClick={() => {
                                setActiveConv13A(conv.number);
                                setActiveModelFilter13A("all");
                              }}
                              className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between gap-2 ${
                                isActive
                                  ? 'bg-[#2E6F40] text-white border-[#2E6F40] shadow-sm'
                                  : 'bg-white hover:bg-[#FAF8F5] text-[#1E293B] border-[#DCE7E1]'
                              }`}
                            >
                              <div>
                                <span className={`text-[10px] font-mono font-bold block ${isActive ? 'text-[#86EFAC]' : 'text-[#2E6F40]'}`}>
                                  {conv.number}
                                </span>
                                <span className="text-xs font-bold block">
                                  Decimal &rarr; {targetName}
                                </span>
                              </div>
                              <span className={`text-xs font-mono font-extrabold px-2.5 py-1 rounded-md border ${
                                isActive
                                  ? 'bg-white/20 text-white border-white/30'
                                  : 'bg-[#F2F7F4] text-[#2E6F40] border-[#2E6F40]/20'
                              }`}>
                                {badgeText}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* 2. Visual Split-and-Conquer Conversion Blueprint */}
                      <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#DCE7E1]">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold uppercase text-[#2E6F40] bg-[#F2F7F4] px-2.5 py-0.5 rounded">
                              Visual Blueprint
                            </span>
                            <h3 className="text-sm font-bold text-[#1E293B]">
                              Split-and-Conquer Architecture: Decimal &rarr; Base {targetBase}
                            </h3>
                          </div>
                          <span className="text-xs font-mono font-bold text-[#4F46E5] bg-[#EEF2FF] px-2.5 py-1 rounded-full border border-[#C7D2FE] self-start sm:self-auto">
                            Target Radix r = {targetBase}
                          </span>
                        </div>

                        {/* Top Visual Split Node */}
                        <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] flex flex-col items-center text-center space-y-2">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
                            Sample Decimal Input Split
                          </span>
                          <div className="inline-flex items-center gap-1 font-mono text-xl sm:text-2xl font-black bg-white px-4 py-2 rounded-xl border border-[#DCE7E1] shadow-2xs">
                            <span className="text-[#15803D] bg-[#F0FDF4] px-2.5 py-0.5 rounded-lg border border-[#86EFAC]/50">45</span>
                            <span className="text-[#1E293B] px-0.5">.</span>
                            <span className="text-[#4338CA] bg-[#EEF2FF] px-2.5 py-0.5 rounded-lg border border-[#A5B4FC]/50">625</span>
                            <sub className="text-xs text-[#64748B] font-bold ml-1">10</sub>
                          </div>
                          <div className="w-full max-w-md flex items-center justify-between px-6 text-xs font-mono font-bold pt-1">
                            <span className="text-[#15803D] flex items-center gap-1">&larr; Left: Integer (45)</span>
                            <span className="text-[#4338CA] flex items-center gap-1">Right: Fraction (.625) &rarr;</span>
                          </div>
                        </div>

                        {/* Two Branch Cards: Left (Integer) & Right (Fraction) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Left Branch Card */}
                          <div className="p-4 rounded-xl bg-[#F0FDF4]/70 border-2 border-[#86EFAC] space-y-3 shadow-2xs">
                            <div className="flex items-center justify-between pb-1.5 border-b border-[#BBF7D0]">
                              <span className="text-xs font-mono font-bold uppercase text-[#166534] bg-[#DCFCE7] px-2 py-0.5 rounded">
                                Path A: Integer Part
                              </span>
                              <span className="text-xs font-mono font-bold text-[#15803D] bg-white px-2 py-0.5 rounded border border-[#86EFAC]">
                                Integer &divide; {targetBase}
                              </span>
                            </div>

                            <div className="p-2.5 rounded-lg bg-white border border-[#86EFAC] text-center font-mono font-bold text-xs text-[#15803D] shadow-2xs">
                              Repeated Division: Integer &divide; {targetBase} &rarr; Collect Remainders
                            </div>

                            <div className="space-y-1.5 text-xs text-[#374151]">
                              <div className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] mt-1.5 flex-shrink-0" />
                                <span>Divide repeatedly by <strong className="font-mono text-[#15803D]">{targetBase}</strong> until <strong className="font-mono text-[#15803D]">Quotient = 0</strong>.</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] mt-1.5 flex-shrink-0" />
                                <span>First Remainder = <strong className="text-[#15803D]">LSB / LSD</strong> (right next to radix point).</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] mt-1.5 flex-shrink-0" />
                                <span>Last Remainder = <strong className="text-[#15803D]">MSB / MSD</strong> (leftmost leading digit).</span>
                              </div>
                            </div>

                            <div className="p-2.5 rounded-lg bg-[#DCFCE7] border border-[#86EFAC] flex items-center justify-center gap-2 text-xs font-mono font-extrabold text-[#15803D] shadow-2xs">
                              <ArrowUp className="w-4 h-4 animate-bounce" />
                              <span>READ REMAINDERS UPWARD (&uarr; BOTTOM TO TOP)</span>
                            </div>
                          </div>

                          {/* Right Branch Card */}
                          <div className="p-4 rounded-xl bg-[#EEF2FF]/70 border-2 border-[#A5B4FC] space-y-3 shadow-2xs">
                            <div className="flex items-center justify-between pb-1.5 border-b border-[#C7D2FE]">
                              <span className="text-xs font-mono font-bold uppercase text-[#3730A3] bg-[#E0E7FF] px-2 py-0.5 rounded">
                                Path B: Fractional Part
                              </span>
                              <span className="text-xs font-mono font-bold text-[#4338CA] bg-white px-2 py-0.5 rounded border border-[#A5B4FC]">
                                Fraction &times; {targetBase}
                              </span>
                            </div>

                            <div className="p-2.5 rounded-lg bg-white border border-[#A5B4FC] text-center font-mono font-bold text-xs text-[#4338CA] shadow-2xs">
                              Repeated Multiplication: Fraction &times; {targetBase} &rarr; Extract Integer Carries
                            </div>

                            <div className="space-y-1.5 text-xs text-[#374151]">
                              <div className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1] mt-1.5 flex-shrink-0" />
                                <span>Multiply only fractional portion by <strong className="font-mono text-[#4338CA]">{targetBase}</strong>. Record carry.</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1] mt-1.5 flex-shrink-0" />
                                <span>Stop when fraction reaches <strong className="font-mono text-[#4338CA]">0.000</strong> (or 4 to 5 steps if repeating).</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1] mt-1.5 flex-shrink-0" />
                                <span>First Carry = <strong className="text-[#4338CA]">MSD</strong> (first digit immediately after radix point).</span>
                              </div>
                            </div>

                            <div className="p-2.5 rounded-lg bg-[#E0E7FF] border border-[#A5B4FC] flex items-center justify-center gap-2 text-xs font-mono font-extrabold text-[#4338CA] shadow-2xs">
                              <span>READ CARRIES DOWNWARD (&darr; TOP TO BOTTOM)</span>
                              <ArrowDown className="w-4 h-4 animate-bounce" />
                            </div>
                          </div>
                        </div>

                        {/* Bottom Convergence Bar */}
                        <div className="p-3.5 rounded-xl bg-[#1E293B] text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#94A3B8]">
                            Final Radix Merge
                          </span>
                          <div className="font-mono text-xs sm:text-sm font-extrabold tracking-wide flex items-center gap-1.5">
                            <span className="text-[#4ADE80] bg-[#14532D]/80 px-2.5 py-1 rounded-md border border-[#22C55E]/40">
                              [ MSB ... LSB (&uarr;) ]
                            </span>
                            <span className="text-white text-base font-black px-0.5">.</span>
                            <span className="text-[#818CF8] bg-[#312E81]/80 px-2.5 py-1 rounded-md border border-[#6366F1]/40">
                              [ (&darr;) First Carry ... Last Carry ]
                            </span>
                            <sub className="text-xs text-[#94A3B8] font-bold ml-1">base {targetBase}</sub>
                          </div>
                        </div>

                        {/* Contextual Octal Calculator Trick */}
                        {targetBase === 8 && (
                          <div className="p-3 rounded-xl bg-[#FFFBEB] border-2 border-[#D97706]/40 flex items-center gap-2.5 text-xs text-[#92400E]">
                            <Calculator className="w-4 h-4 text-[#D97706] flex-shrink-0" />
                            <span><strong>Calculator Remainder Trick:</strong> Decimal fraction of quotient &times; 8 = Exact Remainder (e.g. 394 &divide; 8 = 49.25 &rarr; 0.25 &times; 8 = 2).</span>
                          </div>
                        )}

                        {/* Contextual Hex Remainder Ribbon */}
                        {targetBase === 16 && (
                          <div className="p-3.5 rounded-xl bg-[#FFFBEB] border-2 border-[#D97706]/40 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono font-bold uppercase text-[#D97706]">
                                Hex Remainder Ribbon
                              </span>
                              <span className="text-[11px] font-medium text-[#B45309]">
                                Substitute remainders 10 through 15 immediately
                              </span>
                            </div>
                            <div className="grid grid-cols-6 gap-2 text-center font-mono text-xs">
                              {[
                                { dec: 10, hex: "A" },
                                { dec: 11, hex: "B" },
                                { dec: 12, hex: "C" },
                                { dec: 13, hex: "D" },
                                { dec: 14, hex: "E" },
                                { dec: 15, hex: "F" }
                              ].map((item) => (
                                <div key={item.dec} className="p-1.5 rounded-lg bg-white border border-[#FDE68A] shadow-2xs">
                                  <div className="text-[#64748B] text-[10px]">{item.dec}</div>
                                  <div className="text-[10px] font-bold text-[#D97706]">&darr;</div>
                                  <div className="text-sm font-extrabold text-[#1E293B] bg-[#FEF3C7] rounded py-0.5">{item.hex}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      </div>

                      {/* 3. Quick Model Jump Pills Filter Bar */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1E293B]">
                            Jump to Model:
                          </span>
                          <span className="text-[11px] font-mono text-[#64748B]">({displayedModels.length} of {currentConv.models.length} shown)</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5">
                          {[
                            { id: "all", label: "All 4 Models" },
                            { id: "0", label: "Model A: Pure Integer" },
                            { id: "1", label: targetBase === 8 ? "Model B: 4-Digit Integer" : "Model B: Pure Fraction" },
                            { id: "2", label: "Model C: Integer + Fraction" },
                            { id: "3", label: targetBase === 2 ? "Model D: Repeating Loop" : targetBase === 8 ? "Model D: 4-Place Octal" : "Model D: Multi-Step Hex" }
                          ].map((pill) => (
                            <button
                              key={pill.id}
                              onClick={() => setActiveModelFilter13A(pill.id)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                                activeModelFilter13A === pill.id
                                  ? 'bg-[#2E6F40] text-white shadow-xs'
                                  : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]'
                              }`}
                            >
                              {pill.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 4. Filtered Worked Models Stack */}
                      <div className="space-y-6">
                        {displayedModels.map((mod) => (
                          <div key={mod.id} className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-5 shadow-xs">
                            {/* Model Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-[#DCE7E1]">
                              <div>
                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#4F46E5] bg-[#EEF2FF] px-2 py-0.5 rounded">
                                  {mod.type}
                                </span>
                                <h4 className="text-sm font-bold text-[#1E293B] mt-1">{mod.problem}</h4>
                              </div>
                              {mod.note && (
                                <span className="text-xs font-mono text-[#D97706] bg-[#FFFBEB] px-2.5 py-1 rounded border border-[#D97706]/30 self-start sm:self-auto">
                                  {mod.note}
                                </span>
                              )}
                            </div>

                            {/* Integer Stage Division Ladder */}
                            {mod.integerStage && (
                              <StepByStepDivisionViewer stage={mod.integerStage} />
                            )}

                            {/* Fractional Stage Multiplication Chain */}
                            {mod.fractionStage && (
                              <StepByStepFractionViewer stage={mod.fractionStage} />
                            )}

                            {/* Final Answer Assembly Banner with 5-Second Exam Self-Check */}
                            <div className="p-4 rounded-xl bg-gradient-to-r from-[#F0FDF4] via-white to-[#EEF2FF] border-2 border-[#2E6F40]/30 shadow-xs space-y-3">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                                <div className="space-y-1">
                                  <span className="text-[10px] font-mono font-bold uppercase text-[#2E6F40] bg-[#F2F7F4] px-2 py-0.5 rounded">
                                    Final Assembled Answer
                                  </span>
                                  <div className="text-xs text-[#475569] font-mono">
                                    {mod.integerStage && <span>Integer: <strong className="text-[#2E6F40]">{mod.integerStage.result}</strong> (read &uarr;)</span>}
                                    {mod.integerStage && mod.fractionStage && <span className="font-bold text-[#1E293B]"> + </span>}
                                    {mod.fractionStage && <span>Fraction: <strong className="text-[#4F46E5]">{mod.fractionStage.result}</strong> (read &darr;)</span>}
                                  </div>
                                </div>

                                <div className="p-3 rounded-lg bg-white border-2 border-[#2E6F40] shadow-sm text-center self-start md:self-auto">
                                  <span className="text-[10px] font-mono uppercase text-[#64748B] block">Result</span>
                                  <span className="text-sm sm:text-base font-mono font-extrabold text-[#1E293B] tracking-wide">
                                    {mod.finalResult}
                                  </span>
                                </div>
                              </div>

                              {/* 1-Line Exam Self-Check Box */}
                              <div className="pt-2.5 border-t border-[#DCE7E1]/80 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                                <span className="inline-flex items-center gap-1.5 font-bold text-[#15803D]">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                                  5-Second Exam Self-Check:
                                </span>
                                <span className="text-[#166534] bg-[#F0FDF4] px-2.5 py-1 rounded-md border border-[#BBF7D0]">
                                  {mod.verification || "Expand back to Base 10 to confirm exact equality"}
                                </span>
                              </div>
                            </div>

                          </div>
                        ))}
                      </div>

                      {/* Graded Practice Problems for This Conversion */}
                      {currentConv.practiceProblems && (
                        <TargetedPracticeSet
                          problems={currentConv.practiceProblems}
                          conversionTitle={currentConv.title}
                        />
                      )}

                    </div>
                  );
                })() : sub.id === "1.3B" ? (() => {
                  const currentConv = sub.conversions.find(c => c.number === activeConv13B) || sub.conversions[0];
                  const sourceBase = currentConv.sourceBase || (currentConv.number === "Conversion 4" ? 2 : currentConv.number === "Conversion 5" ? 8 : 16);
                  const displayedModels = currentConv.models.filter((_, idx) => {
                    if (activeModelFilter13B === "all") return true;
                    return activeModelFilter13B === String(idx);
                  });

                  return (
                    <div className="space-y-6">
                      {/* 1. Sleek 3-Tab Conversion Switcher Bar */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                        {sub.conversions.map((conv) => {
                          const isActive = activeConv13B === conv.number;
                          const badgeText = conv.sourceBase === 2 ? "∑ bit × 2ⁱ" : conv.sourceBase === 8 ? "∑ digit × 8ⁱ" : "∑ digit × 16ⁱ";
                          const sourceName = conv.sourceBase === 2 ? "Binary (Base 2)" : conv.sourceBase === 8 ? "Octal (Base 8)" : "Hexadecimal (Base 16)";
                          return (
                            <button
                              key={conv.number}
                              onClick={() => {
                                setActiveConv13B(conv.number);
                                setActiveModelFilter13B("all");
                              }}
                              className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between gap-2 ${
                                isActive
                                  ? 'bg-[#2E6F40] text-white border-[#2E6F40] shadow-sm'
                                  : 'bg-white hover:bg-[#FAF8F5] text-[#1E293B] border-[#DCE7E1]'
                              }`}
                            >
                              <div>
                                <span className={`text-[10px] font-mono font-bold block ${isActive ? 'text-[#86EFAC]' : 'text-[#2E6F40]'}`}>
                                  {conv.number}
                                </span>
                                <span className="text-xs font-bold block">
                                  {sourceName} &rarr; Decimal
                                </span>
                              </div>
                              <span className={`text-xs font-mono font-extrabold px-2.5 py-1 rounded-md border ${
                                isActive
                                  ? 'bg-white/20 text-white border-white/30'
                                  : 'bg-[#F2F7F4] text-[#2E6F40] border-[#2E6F40]/20'
                              }`}>
                                {badgeText}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* 2. Visual Positional Weight Mapping Blueprint */}
                      <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#DCE7E1]">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold uppercase text-[#2E6F40] bg-[#F2F7F4] px-2.5 py-0.5 rounded">
                              Visual Blueprint
                            </span>
                            <h3 className="text-sm font-bold text-[#1E293B]">
                              The Positional Weight Mapping Architecture: Base {sourceBase} &rarr; Decimal
                            </h3>
                          </div>
                          <span className="text-xs font-mono font-bold text-[#4F46E5] bg-[#EEF2FF] px-2.5 py-1 rounded-full border border-[#C7D2FE] self-start sm:self-auto">
                            Source Radix r = {sourceBase}
                          </span>
                        </div>

                        {/* Center Radix Point Anchor & Tracks */}
                        <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-4">
                          <div className="text-center space-y-1">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
                              Positional Index & Weight Alignment Relative to Radix Point
                            </span>
                            <div className="inline-flex items-center gap-2 font-mono text-base sm:text-lg font-black bg-white px-4 py-1.5 rounded-xl border border-[#DCE7E1] shadow-2xs">
                              <span className="text-[#15803D]">d₃ · r³ + d₂ · r² + d₁ · r¹ + d₀ · r⁰</span>
                              <span className="text-[#1E293B] text-xl">.</span>
                              <span className="text-[#4338CA]">d₋₁ · r⁻¹ + d₋₂ · r⁻² + d₋₃ · r⁻³</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                            {/* Leftward Integer Track */}
                            <div className="p-4 rounded-xl bg-[#F0FDF4]/70 border-2 border-[#86EFAC] space-y-2.5">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-mono font-bold text-[#166534] flex items-center gap-1.5">
                                  <ArrowLeft className="w-4 h-4 text-[#16A34A]" />
                                  Integer Track (Leftward Expansion)
                                </span>
                                <span className="text-[10px] font-mono font-bold text-[#15803D] bg-white px-2 py-0.5 rounded border border-[#86EFAC]">
                                  Powers r⁰, r¹, r²...
                                </span>
                              </div>
                              <p className="text-[11px] text-[#166534] leading-relaxed">
                                Starting immediately left of the radix point at index <strong>i = 0</strong>, positional powers increase to the left:
                              </p>
                              <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs font-bold">
                                <span className="bg-white px-2 py-1 rounded border border-[#86EFAC] text-[#15803D]">{sourceBase}³ = {Math.pow(sourceBase, 3)}</span>
                                <span className="bg-white px-2 py-1 rounded border border-[#86EFAC] text-[#15803D]">{sourceBase}² = {Math.pow(sourceBase, 2)}</span>
                                <span className="bg-white px-2 py-1 rounded border border-[#86EFAC] text-[#15803D]">{sourceBase}¹ = {sourceBase}</span>
                                <span className="bg-white px-2 py-1 rounded border border-[#86EFAC] text-[#15803D]">{sourceBase}⁰ = 1</span>
                              </div>
                            </div>

                            {/* Rightward Fractional Track */}
                            <div className="p-4 rounded-xl bg-[#EEF2FF]/70 border-2 border-[#A5B4FC] space-y-2.5">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-mono font-bold text-[#3730A3] flex items-center gap-1.5">
                                  Fractional Track (Rightward Expansion)
                                  <ArrowRight className="w-4 h-4 text-[#4F46E5]" />
                                </span>
                                <span className="text-[10px] font-mono font-bold text-[#4338CA] bg-white px-2 py-0.5 rounded border border-[#A5B4FC]">
                                  Powers r⁻¹, r⁻²...
                                </span>
                              </div>
                              <p className="text-[11px] text-[#3730A3] leading-relaxed">
                                Starting immediately right of the radix point at index <strong>i = -1</strong>, negative powers decrease to the right:
                              </p>
                              <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs font-bold">
                                {sourceBase === 2 && (
                                  <>
                                    <span className="bg-white px-2 py-1 rounded border border-[#A5B4FC] text-[#4338CA]">2⁻¹ = 0.5</span>
                                    <span className="bg-white px-2 py-1 rounded border border-[#A5B4FC] text-[#4338CA]">2⁻² = 0.25</span>
                                    <span className="bg-white px-2 py-1 rounded border border-[#A5B4FC] text-[#4338CA]">2⁻³ = 0.125</span>
                                    <span className="bg-white px-2 py-1 rounded border border-[#A5B4FC] text-[#4338CA]">2⁻⁴ = 0.0625</span>
                                  </>
                                )}
                                {sourceBase === 8 && (
                                  <>
                                    <span className="bg-white px-2 py-1 rounded border border-[#A5B4FC] text-[#4338CA]">8⁻¹ = 0.125</span>
                                    <span className="bg-white px-2 py-1 rounded border border-[#A5B4FC] text-[#4338CA]">8⁻² = 0.015625</span>
                                    <span className="bg-white px-2 py-1 rounded border border-[#A5B4FC] text-[#4338CA]">8⁻³ = 0.001953</span>
                                  </>
                                )}
                                {sourceBase === 16 && (
                                  <>
                                    <span className="bg-white px-2 py-1 rounded border border-[#A5B4FC] text-[#4338CA]">16⁻¹ = 0.0625</span>
                                    <span className="bg-white px-2 py-1 rounded border border-[#A5B4FC] text-[#4338CA]">16⁻² = 0.00390625</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Bottom Summation Rule Bar */}
                          <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono">
                            <span className="text-[#64748B] flex items-center gap-1.5">
                              <Calculator className="w-3.5 h-3.5 text-[#2E6F40]" />
                              <strong>Summation Rule:</strong> Multiply each digit by its positional weight and sum all non-zero terms.
                            </span>
                            <span className="font-bold text-[#1E293B] bg-white px-2.5 py-1 rounded border border-[#DCE7E1]">
                              Value = &sum; (d<sub>i</sub> &times; {sourceBase}<sup>i</sup>)
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 3. Model Filter Jump Pills */}
                      <div className="flex flex-wrap items-center gap-2 pt-1 pb-1">
                        <span className="text-xs font-mono font-bold text-[#64748B] mr-1">Filter Models:</span>
                        <button
                          onClick={() => setActiveModelFilter13B("all")}
                          className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all border ${
                            activeModelFilter13B === "all"
                              ? 'bg-[#2E6F40] text-white border-[#2E6F40] shadow-2xs'
                              : 'bg-white text-[#475569] border-[#DCE7E1] hover:bg-[#FAF8F5]'
                          }`}
                        >
                          All {currentConv.models.length} Models
                        </button>
                        {currentConv.models.map((mod, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveModelFilter13B(String(idx))}
                            className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all border ${
                              activeModelFilter13B === String(idx)
                                ? 'bg-[#2E6F40] text-white border-[#2E6F40] shadow-2xs'
                                : 'bg-white text-[#475569] border-[#DCE7E1] hover:bg-[#FAF8F5]'
                            }`}
                          >
                            {mod.type.split(':')[0]}
                          </button>
                        ))}
                      </div>

                      {/* 4. Full-Width Worked Models */}
                      <div className="grid grid-cols-1 gap-6">
                        {displayedModels.map((mod, mIdx) => (
                          <div key={mIdx} className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-5">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#DCE7E1]">
                              <div>
                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#4F46E5] bg-[#EEF2FF] px-2 py-0.5 rounded">
                                  {mod.type}
                                </span>
                                <h4 className="text-sm font-bold text-[#1E293B] mt-1">{mod.problem}</h4>
                              </div>
                              <span className="text-xs font-mono text-[#64748B] self-start sm:self-auto">
                                Positional Weight Matrix Breakdown
                              </span>
                            </div>

                            {/* Horizontal Positional Weight Matrix */}
                            <HorizontalWeightMatrix model={mod} />

                            {/* Final Answer Banner */}
                            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                                <div className="space-y-1">
                                  <span className="text-[10px] font-mono font-bold uppercase text-[#2E6F40] bg-[#F2F7F4] px-2 py-0.5 rounded">
                                    Final Decimal Value
                                  </span>
                                  <div className="text-xs text-[#475569] font-mono">
                                    Calculated by summing all positional products
                                  </div>
                                </div>

                                <div className="p-3 rounded-lg bg-white border-2 border-[#2E6F40] shadow-sm text-center self-start md:self-auto">
                                  <span className="text-[10px] font-mono uppercase text-[#64748B] block">Result</span>
                                  <span className="text-sm sm:text-base font-mono font-extrabold text-[#1E293B] tracking-wide">
                                    {mod.result}
                                  </span>
                                </div>
                              </div>

                              {/* 1-Line Exam Self-Check Box */}
                              <div className="pt-2.5 border-t border-[#DCE7E1]/80 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                                <span className="inline-flex items-center gap-1.5 font-bold text-[#15803D]">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                                  5-Second Exam Verification:
                                </span>
                                <span className="text-[#166534] bg-[#F0FDF4] px-2.5 py-1 rounded-md border border-[#BBF7D0]">
                                  {mod.verification || "Verify sum of components matches decimal value ✓"}
                                </span>
                              </div>
                            </div>

                          </div>
                        ))}
                      </div>

                      {/* Graded Practice Problems for This Conversion */}
                      {currentConv.practiceProblems && (
                        <TargetedPracticeSet
                          problems={currentConv.practiceProblems}
                          conversionTitle={currentConv.title}
                        />
                      )}

                    </div>
                  );
                })() : sub.id === "1.3C" ? (() => {
                  const currentConv = sub.conversions.find(c => c.number === activeConv13C) || sub.conversions[0];
                  const displayedModels = currentConv.models.filter((_, idx) => {
                    if (activeModelFilter13C === "all") return true;
                    return activeModelFilter13C === String(idx);
                  });

                  return (
                    <div className="space-y-6">
                      {/* 1. Sleek 4-Tab Conversion Switcher Bar */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                        {sub.conversions.map((conv) => {
                          const isActive = activeConv13C === conv.number;
                          return (
                            <button
                              key={conv.number}
                              onClick={() => {
                                setActiveConv13C(conv.number);
                                setActiveModelFilter13C("all");
                              }}
                              className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-2 ${
                                isActive
                                  ? 'bg-[#2E6F40] text-white border-[#2E6F40] shadow-sm'
                                  : 'bg-white hover:bg-[#FAF8F5] text-[#1E293B] border-[#DCE7E1]'
                              }`}
                            >
                              <div>
                                <span className={`text-[10px] font-mono font-bold block ${isActive ? 'text-[#86EFAC]' : 'text-[#2E6F40]'}`}>
                                  {conv.number}
                                </span>
                                <span className="text-xs font-bold block">
                                  {conv.title.split(':')[0]}
                                </span>
                              </div>
                              <span className={`text-[11px] font-mono font-extrabold px-2 py-0.5 rounded-md border ${
                                isActive
                                  ? 'bg-white/20 text-white border-white/30'
                                  : 'bg-[#F2F7F4] text-[#2E6F40] border-[#2E6F40]/20'
                              }`}>
                                {conv.badge}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* 2. Visual Radix-Point Outward Grouping Blueprint */}
                      <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#DCE7E1]">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold uppercase text-[#2E6F40] bg-[#F2F7F4] px-2.5 py-0.5 rounded">
                              Visual Blueprint
                            </span>
                            <h3 className="text-sm font-bold text-[#1E293B]">
                              The Radix-Point Outward Grouping Architecture (Exact Powers of 2)
                            </h3>
                          </div>
                          <span className="text-xs font-mono font-bold text-[#4F46E5] bg-[#EEF2FF] px-2.5 py-1 rounded-full border border-[#C7D2FE] self-start sm:self-auto">
                            {currentConv.groupSize === 3 ? "8 = 2³ (3 Bits per Digit)" : "16 = 2⁴ (4 Bits per Digit)"}
                          </span>
                        </div>

                        {/* Why Powers of 2 Direct Grouping Works */}
                        <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3">
                          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-2 border-b border-[#DCE7E1]">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono font-bold text-[#1E293B]">Fundamental Mathematical Law:</span>
                              <span className="text-xs font-mono bg-white px-2 py-0.5 rounded border border-[#DCE7E1] text-[#2E6F40] font-bold">
                                8 = 2³ &harr; 3 bits &nbsp;|&nbsp; 16 = 2⁴ &harr; 4 bits (1 Nibble)
                              </span>
                            </div>
                            <span className="text-[11px] text-[#DC2626] font-mono font-bold bg-[#FEF2F2] px-2 py-0.5 rounded border border-[#FECACA]">
                              NEVER convert through Decimal
                            </span>
                          </div>

                          {/* Golden Grouping Rule Diagram */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                            <div className="p-3.5 rounded-lg bg-[#F0FDF4] border border-[#86EFAC] space-y-1.5">
                              <span className="text-xs font-mono font-bold text-[#166534] flex items-center gap-1.5">
                                <ArrowLeft className="w-4 h-4 text-[#16A34A]" />
                                Integer Side: Move Left from Radix Point (&larr;)
                              </span>
                              <p className="text-[11px] text-[#166534] leading-relaxed">
                                Group bits in sets of {currentConv.groupSize} moving right-to-left away from the radix point. Pad missing leftmost bits with <strong>Amber Leading Zeros [0]</strong>.
                              </p>
                            </div>
                            <div className="p-3.5 rounded-lg bg-[#EEF2FF] border border-[#C7D2FE] space-y-1.5">
                              <span className="text-xs font-mono font-bold text-[#3730A3] flex items-center gap-1.5">
                                Fractional Side: Move Right from Radix Point (&rarr;)
                                <ArrowRight className="w-4 h-4 text-[#4F46E5]" />
                              </span>
                              <p className="text-[11px] text-[#3730A3] leading-relaxed">
                                Group bits in sets of {currentConv.groupSize} moving left-to-right away from the radix point. Pad missing rightmost bits with <strong>Amber Trailing Zeros [0]</strong>.
                              </p>
                            </div>
                          </div>

                          {/* Compact Lookup Ribbon */}
                          <div className="pt-2 border-t border-[#DCE7E1]">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B] block mb-1.5">
                              {currentConv.groupSize === 3 ? "3-Bit Octal Equivalence Ribbon (0 to 7):" : "4-Bit Hexadecimal Equivalence Ribbon (0 to F):"}
                            </span>
                            <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
                              {currentConv.groupSize === 3 ? (
                                <>
                                  {["000=0", "001=1", "010=2", "011=3", "100=4", "101=5", "110=6", "111=7"].map((item, idx) => (
                                    <span key={idx} className="bg-white px-2 py-0.5 rounded border border-[#DCE7E1] text-[#1E293B]">
                                      <strong className="text-[#4F46E5]">{item.split('=')[0]}</strong> = {item.split('=')[1]}
                                    </span>
                                  ))}
                                </>
                              ) : (
                                <>
                                  {["0000=0", "0001=1", "0010=2", "0011=3", "0100=4", "0101=5", "0110=6", "0111=7", "1000=8", "1001=9", "1010=A", "1011=B", "1100=C", "1101=D", "1110=E", "1111=F"].map((item, idx) => (
                                    <span key={idx} className="bg-white px-1.5 py-0.5 rounded border border-[#DCE7E1] text-[#1E293B]">
                                      <strong className="text-[#4F46E5]">{item.split('=')[0]}</strong>={item.split('=')[1]}
                                    </span>
                                  ))}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 3. Model Filter Jump Pills */}
                      <div className="flex flex-wrap items-center gap-2 pt-1 pb-1">
                        <span className="text-xs font-mono font-bold text-[#64748B] mr-1">Filter Models:</span>
                        <button
                          onClick={() => setActiveModelFilter13C("all")}
                          className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all border ${
                            activeModelFilter13C === "all"
                              ? 'bg-[#2E6F40] text-white border-[#2E6F40] shadow-2xs'
                              : 'bg-white text-[#475569] border-[#DCE7E1] hover:bg-[#FAF8F5]'
                          }`}
                        >
                          All {currentConv.models.length} Models
                        </button>
                        {currentConv.models.map((mod, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveModelFilter13C(String(idx))}
                            className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all border ${
                              activeModelFilter13C === String(idx)
                                ? 'bg-[#2E6F40] text-white border-[#2E6F40] shadow-2xs'
                                : 'bg-white text-[#475569] border-[#DCE7E1] hover:bg-[#FAF8F5]'
                            }`}
                          >
                            {mod.type.split(':')[0]}
                          </button>
                        ))}
                      </div>

                      {/* 4. Full-Width Worked Models */}
                      <div className="grid grid-cols-1 gap-6">
                        {displayedModels.map((mod, mIdx) => (
                          <div key={mIdx} className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-5">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#DCE7E1]">
                              <div>
                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#4F46E5] bg-[#EEF2FF] px-2 py-0.5 rounded">
                                  {mod.type}
                                </span>
                                <h4 className="text-sm font-bold text-[#1E293B] mt-1">{mod.problem}</h4>
                              </div>
                              <span className="text-xs font-mono text-[#64748B] self-start sm:self-auto">
                                {currentConv.type === "grouping" ? "Visual Bracket Box Grouping" : "Direct Binary Nibble Expansion"}
                              </span>
                            </div>

                            {/* Visual Bit Grouper Component */}
                            <VisualBitGrouper model={mod} conversion={currentConv} />

                            {/* Final Answer Banner */}
                            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                                <div className="space-y-1">
                                  <span className="text-[10px] font-mono font-bold uppercase text-[#2E6F40] bg-[#F2F7F4] px-2 py-0.5 rounded">
                                    Final Converted Result
                                  </span>
                                  <div className="text-xs text-[#475569] font-mono">
                                    Directly mapped without decimal conversion errors
                                  </div>
                                </div>

                                <div className="p-3 rounded-lg bg-white border-2 border-[#2E6F40] shadow-sm text-center self-start md:self-auto">
                                  <span className="text-[10px] font-mono uppercase text-[#64748B] block">Result</span>
                                  <span className="text-sm sm:text-base font-mono font-extrabold text-[#1E293B] tracking-wide">
                                    {mod.result}
                                  </span>
                                </div>
                              </div>

                              {/* 1-Line Exam Self-Check Box */}
                              <div className="pt-2.5 border-t border-[#DCE7E1]/80 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                                <span className="inline-flex items-center gap-1.5 font-bold text-[#15803D]">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                                  5-Second Exam Verification:
                                </span>
                                <span className="text-[#166534] bg-[#F0FDF4] px-2.5 py-1 rounded-md border border-[#BBF7D0]">
                                  {mod.verification || "Grouping counts match total bit length ✓"}
                                </span>
                              </div>
                            </div>

                          </div>
                        ))}
                      </div>

                      {/* Graded Practice Problems for This Conversion */}
                      {currentConv.practiceProblems && (
                        <TargetedPracticeSet
                          problems={currentConv.practiceProblems}
                          conversionTitle={currentConv.title}
                        />
                      )}

                    </div>
                  );
                })() : (() => {
                  /* Sub-Section 1.3D: Octal <-> Hexadecimal Bridge & Arbitrary / Unknown Base Models */
                  const currentConv = sub.conversions.find(c => c.number === activeConv13D) || sub.conversions[0];
                  const displayedModels = currentConv.models.filter((_, idx) => {
                    if (activeModelFilter13D === "all") return true;
                    return activeModelFilter13D === String(idx);
                  });

                  return (
                    <div className="space-y-6">
                      {/* 1. Sleek 4-Tab Conversion Switcher Bar */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                        {sub.conversions.map((conv) => {
                          const isActive = activeConv13D === conv.number;
                          return (
                            <button
                              key={conv.number}
                              onClick={() => {
                                setActiveConv13D(conv.number);
                                setActiveModelFilter13D("all");
                              }}
                              className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-2 ${
                                isActive
                                  ? 'bg-[#2E6F40] text-white border-[#2E6F40] shadow-sm'
                                  : 'bg-white hover:bg-[#FAF8F5] text-[#1E293B] border-[#DCE7E1]'
                              }`}
                            >
                              <div>
                                <span className={`text-[10px] font-mono font-bold block ${isActive ? 'text-[#86EFAC]' : 'text-[#2E6F40]'}`}>
                                  {conv.number}
                                </span>
                                <span className="text-xs font-bold block">
                                  {conv.title.split(':')[0]}
                                </span>
                              </div>
                              <span className={`text-[11px] font-mono font-extrabold px-2 py-0.5 rounded-md border ${
                                isActive
                                  ? 'bg-white/20 text-white border-white/30'
                                  : 'bg-[#F2F7F4] text-[#2E6F40] border-[#2E6F40]/20'
                              }`}>
                                {conv.badge}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* 2. Visual Graphical Blueprint adapting to the active tab */}
                      <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#DCE7E1]">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold uppercase text-[#2E6F40] bg-[#F2F7F4] px-2.5 py-0.5 rounded">
                              Visual Blueprint
                            </span>
                            <h3 className="text-sm font-bold text-[#1E293B]">
                              {currentConv.number === "Conversion 11" || currentConv.number === "Conversion 12" 
                                ? "The Two-Hop Binary Bridge Highway (Base 8 ↔ Base 2 ↔ Base 16)"
                                : currentConv.number === "Model 13"
                                ? "The Arbitrary Base Decimal Bridge Architecture (Base r₁ → Base 10 → Base r₂)"
                                : "The 3-Step Unknown Radix Algebraic Method"}
                            </h3>
                          </div>
                          <span className="text-xs font-mono font-bold text-[#4F46E5] bg-[#EEF2FF] px-2.5 py-1 rounded-full border border-[#C7D2FE] self-start sm:self-auto">
                            {currentConv.number === "Conversion 11" || currentConv.number === "Conversion 12"
                              ? "Hop Principle: 8 = 2³ and 16 = 2⁴"
                              : currentConv.number === "Model 13"
                              ? "Decimal Intermediate Bridge"
                              : "Algebraic Polynomial Equation"}
                          </span>
                        </div>

                        {/* Blueprint content depending on tab */}
                        {(currentConv.number === "Conversion 11" || currentConv.number === "Conversion 12") ? (
                          <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-4">
                            <div className="p-3 rounded-lg bg-[#FEF2F2] border border-[#FECACA] flex items-center justify-between gap-2 text-xs font-mono">
                              <span className="text-[#991B1B] font-bold flex items-center gap-1.5">
                                <AlertTriangle className="w-4 h-4 text-[#DC2626]" />
                                Crucial Exam Tip:
                              </span>
                              <span className="text-[#7F1D1D]">
                                NEVER convert Octal &harr; Hexadecimal via Decimal! It takes 3x longer and risks arithmetic errors.
                              </span>
                            </div>

                            {/* Visual Two-Hop Flowchart */}
                            <div className="p-4 rounded-xl bg-white border border-[#DCE7E1] space-y-3">
                              <span className="text-[10px] font-mono font-bold uppercase text-[#64748B] block">
                                {currentConv.number === "Conversion 11" ? "Two-Hop Flow: Octal &rarr; Binary &rarr; Hexadecimal" : "Two-Hop Flow: Hexadecimal &rarr; Binary &rarr; Octal"}
                              </span>
                              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 font-mono text-xs">
                                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] text-center min-w-[130px]">
                                  <span className="text-[10px] text-[#64748B] block font-sans">Start Value</span>
                                  <span className="text-sm font-bold text-[#1E293B]">
                                    {currentConv.number === "Conversion 11" ? "Octal (Base 8)" : "Hex (Base 16)"}
                                  </span>
                                </div>
                                <div className="flex flex-col items-center">
                                  <span className="text-[9px] text-[#4F46E5] font-bold">
                                    {currentConv.number === "Conversion 11" ? "Expand 1 digit &rarr; 3 bits" : "Expand 1 digit &rarr; 4 bits"}
                                  </span>
                                  <ArrowRight className="w-5 h-5 text-[#4F46E5] my-0.5" />
                                  <span className="text-[9px] text-[#64748B]">Hop 1</span>
                                </div>
                                <div className="p-3 rounded-xl bg-[#EEF2FF] border-2 border-[#6366F1] text-center min-w-[150px] shadow-xs">
                                  <span className="text-[10px] text-[#4F46E5] block font-sans font-bold">Bridge (Base 2)</span>
                                  <span className="text-sm font-black text-[#3730A3]">Binary Bitstream</span>
                                  <span className="text-[9px] text-[#6366F1] block mt-0.5 font-sans font-medium">Regroup from radix pt</span>
                                </div>
                                <div className="flex flex-col items-center">
                                  <span className="text-[9px] text-[#15803D] font-bold">
                                    {currentConv.number === "Conversion 11" ? "Regroup into 4-bit nibbles" : "Regroup into 3-bit groups"}
                                  </span>
                                  <ArrowRight className="w-5 h-5 text-[#15803D] my-0.5" />
                                  <span className="text-[9px] text-[#64748B]">Hop 2</span>
                                </div>
                                <div className="p-3 rounded-xl bg-[#F0FDF4] border-2 border-[#86EFAC] text-center min-w-[130px]">
                                  <span className="text-[10px] text-[#15803D] block font-sans">Final Target</span>
                                  <span className="text-sm font-bold text-[#15803D]">
                                    {currentConv.number === "Conversion 11" ? "Hex (Base 16)" : "Octal (Base 8)"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : currentConv.number === "Model 13" ? (
                          <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-4">
                            <p className="text-xs text-[#475569] leading-relaxed">
                              When converting between two arbitrary bases <strong className="font-mono text-[#1E293B]">r₁</strong> and <strong className="font-mono text-[#1E293B]">r₂</strong> where neither is a power of 2, Decimal (Base 10) serves as the universal mathematical bridge:
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 font-mono text-xs">
                              <div className="p-3 rounded-xl bg-white border border-[#DCE7E1] text-center min-w-[130px]">
                                <span className="text-[10px] text-[#64748B] block font-sans">Source Base</span>
                                <span className="text-sm font-bold text-[#1E293B]">(N)<sub>r₁</sub></span>
                              </div>
                              <div className="flex flex-col items-center">
                                <span className="text-[9px] text-[#2E6F40] font-bold">Phase 1: &sum; d<sub>i</sub> &times; r₁<sup>i</sup></span>
                                <ArrowRight className="w-5 h-5 text-[#2E6F40] my-0.5" />
                                <span className="text-[9px] text-[#64748B]">Expand to Decimal</span>
                              </div>
                              <div className="p-3.5 rounded-xl bg-[#F0FDF4] border-2 border-[#86EFAC] text-center min-w-[140px] shadow-xs">
                                <span className="text-[10px] text-[#15803D] block font-sans font-bold">Universal Bridge</span>
                                <span className="text-sm font-black text-[#15803D]">(Decimal)₁₀</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <span className="text-[9px] text-[#4F46E5] font-bold">Phase 2: &divide; r₂ (Int) & &times; r₂ (Frac)</span>
                                <ArrowRight className="w-5 h-5 text-[#4F46E5] my-0.5" />
                                <span className="text-[9px] text-[#64748B]">Convert to Target</span>
                              </div>
                              <div className="p-3 rounded-xl bg-white border border-[#DCE7E1] text-center min-w-[130px]">
                                <span className="text-[10px] text-[#64748B] block font-sans">Target Base</span>
                                <span className="text-sm font-bold text-[#1E293B]">(N)<sub>r₂</sub></span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          /* Model 14: Unknown Radix Solver Blueprint */
                          <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <div className="p-3 rounded-xl bg-white border border-[#DCE7E1] space-y-1">
                                <span className="text-xs font-mono font-bold text-[#D97706] flex items-center gap-1">
                                  1. Physical Constraint
                                </span>
                                <p className="text-[11px] text-[#475569] leading-relaxed">
                                  Identify the largest digit in the problem. The radix must be strictly greater: <strong>r &gt; max(digit)</strong>.
                                </p>
                              </div>
                              <div className="p-3 rounded-xl bg-white border border-[#DCE7E1] space-y-1">
                                <span className="text-xs font-mono font-bold text-[#4F46E5] flex items-center gap-1">
                                  2. Decimal Polynomials
                                </span>
                                <p className="text-[11px] text-[#475569] leading-relaxed">
                                  Expand both sides of the equation in powers of r: <strong>d₂·r² + d₁·r + d₀</strong>.
                                </p>
                              </div>
                              <div className="p-3 rounded-xl bg-white border border-[#DCE7E1] space-y-1">
                                <span className="text-xs font-mono font-bold text-[#15803D] flex items-center gap-1">
                                  3. Solve & Reject Roots
                                </span>
                                <p className="text-[11px] text-[#475569] leading-relaxed">
                                  Solve for r. Reject negative or non-integer roots since a number base must be a positive integer &ge; 2.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 3. Model Filter Jump Pills */}
                      <div className="flex flex-wrap items-center gap-2 pt-1 pb-1">
                        <span className="text-xs font-mono font-bold text-[#64748B] mr-1">Filter Models:</span>
                        <button
                          onClick={() => setActiveModelFilter13D("all")}
                          className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all border ${
                            activeModelFilter13D === "all"
                              ? 'bg-[#2E6F40] text-white border-[#2E6F40] shadow-2xs'
                              : 'bg-white text-[#475569] border-[#DCE7E1] hover:bg-[#FAF8F5]'
                          }`}
                        >
                          All {currentConv.models.length} Models
                        </button>
                        {currentConv.models.map((mod, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveModelFilter13D(String(idx))}
                            className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all border ${
                              activeModelFilter13D === String(idx)
                                ? 'bg-[#2E6F40] text-white border-[#2E6F40] shadow-2xs'
                                : 'bg-white text-[#475569] border-[#DCE7E1] hover:bg-[#FAF8F5]'
                            }`}
                          >
                            {mod.type.split(':')[0]}
                          </button>
                        ))}
                      </div>

                      {/* 4. Full-Width Worked Models */}
                      <div className="grid grid-cols-1 gap-6">
                        {displayedModels.map((mod, mIdx) => (
                          <div key={mIdx} className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-5">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#DCE7E1]">
                              <div>
                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#4F46E5] bg-[#EEF2FF] px-2 py-0.5 rounded">
                                  {mod.type}
                                </span>
                                <h4 className="text-sm font-bold text-[#1E293B] mt-1">{mod.problem}</h4>
                              </div>
                              {mod.constraint && (
                                <span className="text-xs font-mono font-bold text-[#92400E] bg-[#FEF3C7] px-2.5 py-0.5 rounded border border-[#FDE68A] self-start sm:self-auto">
                                  {mod.constraint}
                                </span>
                              )}
                            </div>

                            {/* Model Card Body depending on conversion type */}
                            {(currentConv.number === "Conversion 11" || currentConv.number === "Conversion 12") ? (
                              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3 font-mono text-xs">
                                <div className="p-3 rounded-lg bg-white border border-[#DCE7E1] space-y-1">
                                  <span className="text-[11px] font-bold text-[#4F46E5] uppercase tracking-wider block">
                                    Step 1: Expand into Binary Stream
                                  </span>
                                  <div className="text-xs font-bold text-[#1E293B]">{mod.step1_expansion}</div>
                                </div>
                                <div className="p-3 rounded-lg bg-white border border-[#DCE7E1] space-y-1">
                                  <span className="text-[11px] font-bold text-[#D97706] uppercase tracking-wider block">
                                    Step 2: Regroup outward from Radix Point
                                  </span>
                                  <div className="text-xs font-bold text-[#1E293B]">{mod.step2_regroup}</div>
                                </div>
                                <div className="p-3 rounded-lg bg-white border border-[#DCE7E1] space-y-1">
                                  <span className="text-[11px] font-bold text-[#15803D] uppercase tracking-wider block">
                                    Step 3: Convert Groups to Target Symbols
                                  </span>
                                  <div className="text-xs font-bold text-[#1E293B]">{mod.step3_hex || mod.step3_octal}</div>
                                </div>
                              </div>
                            ) : currentConv.number === "Model 13" ? (
                              /* Model 13 Arbitrary Base Stages */
                              <div className="space-y-4">
                                {mod.stages && mod.stages.map((stg, sIdx) => (
                                  <div key={sIdx} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                                    <div className="flex items-center justify-between pb-1 border-b border-[#DCE7E1]">
                                      <span className="text-xs font-mono font-bold text-[#1E293B]">{stg.phase}</span>
                                      <span className="text-xs font-mono font-bold text-[#2E6F40] bg-white px-2 py-0.5 rounded border border-[#DCE7E1]">
                                        Result: {stg.result}
                                      </span>
                                    </div>
                                    <div className="space-y-1 font-mono text-xs text-[#475569]">
                                      {stg.steps.map((st, i) => (
                                        <div key={i}>{st}</div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              /* Model 14 Algebraic Steps */
                              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2 font-mono text-xs text-[#334155]">
                                {mod.algebraicSteps && mod.algebraicSteps.map((step, idx) => (
                                  <div key={idx} className={step.startsWith("Step") ? "font-bold text-[#1E293B] pt-1" : "pl-3 text-[#475569]"}>
                                    {step}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Final Answer Banner */}
                            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                                <div className="space-y-1">
                                  <span className="text-[10px] font-mono font-bold uppercase text-[#2E6F40] bg-[#F2F7F4] px-2 py-0.5 rounded">
                                    Final Result
                                  </span>
                                  <div className="text-xs text-[#475569] font-mono">
                                    Verified through two-way mathematical consistency
                                  </div>
                                </div>

                                <div className="p-3 rounded-lg bg-white border-2 border-[#2E6F40] shadow-sm text-center self-start md:self-auto">
                                  <span className="text-[10px] font-mono uppercase text-[#64748B] block">Result</span>
                                  <span className="text-sm sm:text-base font-mono font-extrabold text-[#1E293B] tracking-wide">
                                    {mod.result}
                                  </span>
                                </div>
                              </div>

                              {/* 1-Line Exam Self-Check Box */}
                              <div className="pt-2.5 border-t border-[#DCE7E1]/80 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                                <span className="inline-flex items-center gap-1.5 font-bold text-[#15803D]">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                                  5-Second Exam Verification:
                                </span>
                                <span className="text-[#166534] bg-[#F0FDF4] px-2.5 py-1 rounded-md border border-[#BBF7D0]">
                                  {mod.verification || "Expand back to verify mathematical identity ✓"}
                                </span>
                              </div>
                            </div>

                          </div>
                        ))}
                      </div>

                      {/* Graded Practice Problems for This Conversion */}
                      {currentConv.practiceProblems && (
                        <TargetedPracticeSet
                          problems={currentConv.practiceProblems}
                          conversionTitle={currentConv.title}
                        />
                      )}

                    </div>
                  );
                })()}

              </div>
            );
          })}

          {/* PART 5: AT-A-GLANCE CONVERSION CHEAT SHEET (Shown ONLY when cheatSheet tab is selected) */}
          {activeSubTab13 === "cheatSheet" && section.cheatSheet && (
            <div className="p-6 rounded-2xl bg-white border-2 border-[#4F46E5]/40 shadow-soft space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#DCE7E1]">
                <div>
                  <span className="text-xs font-mono font-bold uppercase text-[#4F46E5] bg-[#EEF2FF] px-2.5 py-0.5 rounded border border-[#C7D2FE]">
                    Section 1.3 Quick Reference
                  </span>
                  <h2 className="text-lg font-bold text-[#1E293B] mt-1">{section.cheatSheet.title}</h2>
                  <p className="text-xs text-[#64748B] mt-0.5">{section.cheatSheet.overview}</p>
                </div>
              </div>

              {/* 1. Visual Color-Coded Direction Compass */}
              {section.cheatSheet.compass && (
                <div className="space-y-3">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#4F46E5] flex items-center gap-2">
                    <span>1. {section.cheatSheet.compass.title}</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {section.cheatSheet.compass.techniques.map((tech, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-[#1E293B]">{tech.name}</span>
                          <span className="text-[10px] font-mono text-[#64748B]">{tech.conversions}</span>
                        </div>
                        <div className="space-y-2 text-xs font-mono">
                          <div className="p-2 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] flex items-start gap-2">
                            <ArrowUp className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#10B981]" />
                            <div>
                              <span className="font-bold block">Integer:</span>
                              <span>{tech.integerRule}</span>
                            </div>
                          </div>
                          <div className="p-2 rounded-lg bg-[#EEF2FF] border border-[#C7D2FE] text-[#3730A3] flex items-start gap-2">
                            <ArrowDown className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#6366F1]" />
                            <div>
                              <span className="font-bold block">Fraction:</span>
                              <span>{tech.fractionRule}</span>
                            </div>
                          </div>
                          <div className="p-2 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] text-[11px]">
                            <span className="font-bold">Crucial: </span>
                            <span>{tech.crucialTip}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Side-by-Side Fast Lookup Cards */}
              {section.cheatSheet.lookupCards && (
                <div className="space-y-4 pt-4 border-t border-[#DCE7E1]">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E6F40] flex items-center gap-2">
                    <span>2. Side-by-Side Fast Lookup Cards</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Octal 3-Bit Card */}
                    <div className="p-4 rounded-xl border border-[#DCE7E1] bg-white space-y-2">
                      <span className="text-xs font-mono font-bold text-[#2E6F40] block">
                        Octal 3-Bit Grouping (4 - 2 - 1 Weight Strip)
                      </span>
                      <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 font-mono text-center">
                        {section.cheatSheet.lookupCards.octal3Bit.map((item) => (
                          <div key={item.oct} className="p-2 rounded-lg bg-[#F2F7F4] border border-[#DCE7E1]">
                            <span className="text-xs font-bold text-[#1E293B] block">{item.oct}</span>
                            <span className="text-[11px] font-bold text-[#2E6F40] block">{item.bin}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Fractional Powers of 2 Quick Strip */}
                    <div className="p-4 rounded-xl border border-[#DCE7E1] bg-white space-y-2">
                      <span className="text-xs font-mono font-bold text-[#4F46E5] block">
                        Fractional Powers of 2 Quick Strip (Decimal Multipliers)
                      </span>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 font-mono text-center">
                        {section.cheatSheet.lookupCards.fractionalPowersOf2.map((item) => (
                          <div key={item.power} className="p-2 rounded-lg bg-[#EEF2FF] border border-[#C7D2FE]">
                            <span className="text-xs font-bold text-[#3730A3] block">{item.power}</span>
                            <span className="text-[10px] font-bold text-[#4338CA] block">{item.val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Hex 4-Bit Card (Full Width) */}
                  <div className="p-4 rounded-xl border border-[#DCE7E1] bg-white space-y-2">
                    <span className="text-xs font-mono font-bold text-[#D97706] block">
                      Hexadecimal 4-Bit Grouping (8 - 4 - 2 - 1 Weight Strip) with A-F Amber Highlights
                    </span>
                    <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-16 gap-1.5 font-mono text-center">
                      {section.cheatSheet.lookupCards.hex4Bit.map((item) => {
                        const isLetter = ["A", "B", "C", "D", "E", "F"].includes(item.hex);
                        return (
                          <div 
                            key={item.hex} 
                            className={`p-2 rounded-lg border ${
                              isLetter 
                                ? 'bg-[#FEF3C7] border-[#FDE68A] text-[#92400E]' 
                                : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#1E293B]'
                            }`}
                          >
                            <span className="text-xs font-bold block">{item.hex}</span>
                            <span className="text-[10px] text-[#64748B] block">{item.dec}</span>
                            <span className={`text-[10px] font-bold block ${isLetter ? 'text-[#B45309]' : 'text-[#2E6F40]'}`}>
                              {item.bin}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* 3. All 12 Conversions Master Matrix Table */}
              {section.cheatSheet.master12Matrix && (
                <div className="space-y-3 pt-4 border-t border-[#DCE7E1]">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E6F40]">
                    3. All 12 Conversions Master Matrix Table
                  </h3>
                  <div className="overflow-x-auto border border-[#DCE7E1] rounded-xl">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="bg-[#FAF8F5] border-b border-[#DCE7E1] font-mono text-[#1E293B]">
                          <th className="py-2.5 px-3">#</th>
                          <th className="py-2.5 px-3">Path</th>
                          <th className="py-2.5 px-3">Technique Family</th>
                          <th className="py-2.5 px-3">Governing Operation</th>
                          <th className="py-2.5 px-3">Direction Rule</th>
                          <th className="py-2.5 px-3">Mini Example</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F2F7F4] font-mono">
                        {section.cheatSheet.master12Matrix.map((row) => {
                          const tech = row.technique || row.family;
                          const badgeStyle = tech.includes("Successive")
                            ? 'bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]'
                            : tech.includes("Positional")
                            ? 'bg-[#EEF2FF] text-[#3730A3] border border-[#C7D2FE]'
                            : tech.includes("Powers")
                            ? 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]'
                            : 'bg-[#FDF4FF] text-[#86198F] border border-[#F5D0FE]';

                          return (
                            <tr key={row.num} className="hover:bg-[#FAF8F5]/60 transition-colors">
                              <td className="py-2.5 px-3 font-bold text-[#2E6F40]">{row.num}</td>
                              <td className="py-2.5 px-3 font-bold text-[#1E293B] whitespace-nowrap">{row.path}</td>
                              <td className="py-2.5 px-3">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold inline-block ${badgeStyle}`}>
                                  {tech}
                                </span>
                              </td>
                              <td className="py-2.5 px-3 text-[#334155] font-medium">{row.operation}</td>
                              <td className="py-2.5 px-3 text-[#D97706] font-semibold whitespace-nowrap">{row.directionRule}</td>
                              <td className="py-2.5 px-3 text-[#166534] font-bold bg-[#F0FDF4]/60">{row.example || row.miniEx}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 4. Top 5 Exam Mistakes to Avoid Callout Grid */}
              {section.cheatSheet.top5Mistakes && (
                <div className="space-y-3 pt-4 border-t border-[#DCE7E1]">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#DC2626] flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-[#DC2626]" />
                    <span>4. Top 5 High-Frequency Exam Traps to Avoid</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {section.cheatSheet.top5Mistakes.map((m) => (
                      <div key={m.id} className="p-4 rounded-xl border border-[#FECACA] bg-[#FEF2F2]/60 space-y-2">
                        <span className="text-xs font-mono font-bold text-[#991B1B] block">
                          Trap {m.id}: {m.title}
                        </span>
                        <div className="space-y-1 font-mono text-[11px]">
                          <div className="p-1.5 rounded bg-white/80 border border-[#FCA5A5] text-[#DC2626]">
                            <span className="font-bold">Incorrect: </span>
                            <span>{m.badExample}</span>
                          </div>
                          <div className="p-1.5 rounded bg-white/80 border border-[#86EFAC] text-[#166534]">
                            <span className="font-bold">Correct: </span>
                            <span>{m.goodExample}</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-[#7F1D1D] leading-relaxed pt-1">
                          {m.whyItMatters}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. 5-Second Exam Speed Shortcuts & Sanity Checks */}
              {section.cheatSheet.speedShortcuts && (
                <div className="space-y-4 pt-4 border-t border-[#DCE7E1]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[#D97706] fill-[#FDE68A]" />
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#D97706]">
                        5. 5-Second Exam Speed Shortcuts & Sanity Checks (Not Covered in Standard Steps)
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono text-[#64748B] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#DCE7E1]">
                      5 High-Yield Mental Tricks
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.cheatSheet.speedShortcuts.map((sc) => (
                      <div 
                        key={sc.id} 
                        className={`p-4 rounded-xl border bg-white shadow-xs space-y-3 ${
                          sc.id === 5 ? 'md:col-span-2' : ''
                        } ${
                          sc.id === 1 ? 'border-[#A7F3D0] hover:border-[#059669]' :
                          sc.id === 2 ? 'border-[#C7D2FE] hover:border-[#4F46E5]' :
                          sc.id === 3 ? 'border-[#FECDD3] hover:border-[#E11D48]' :
                          sc.id === 4 ? 'border-[#FDE68A] hover:border-[#D97706]' :
                          'border-[#E9D5FF] hover:border-[#9333EA]'
                        } transition-colors`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#F1F5F9]">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            sc.id === 1 ? 'bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]' :
                            sc.id === 2 ? 'bg-[#EEF2FF] text-[#3730A3] border border-[#C7D2FE]' :
                            sc.id === 3 ? 'bg-[#FFF1F2] text-[#9F1239] border border-[#FECDD3]' :
                            sc.id === 4 ? 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]' :
                            'bg-[#FAF5FF] text-[#6B21A8] border border-[#E9D5FF]'
                          }`}>
                            {sc.badge}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-[#64748B]">
                            Trick #{sc.id}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-xs font-bold text-[#1E293B] leading-snug">
                            {sc.title}
                          </h4>
                          <p className="text-[11px] text-[#475569] leading-relaxed mt-1">
                            {sc.rule}
                          </p>
                        </div>

                        {/* Working Box */}
                        <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#E2E8F0] space-y-1.5 font-mono text-[11px]">
                          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">
                            {sc.exampleHeading}
                          </span>
                          <div className="space-y-0.5 text-[#334155]">
                            {sc.exampleSteps.map((step, sIdx) => (
                              <div key={sIdx} className="leading-relaxed">
                                {step}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Takeaway / Result Banner */}
                        <div className="p-2 rounded-lg bg-[#F0FDF4] border border-[#86EFAC]/60 flex items-center gap-2 text-xs font-mono font-bold text-[#166534]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                          <span>{sc.examTakeaway}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* COMPREHENSIVE MULTI-BASE EXAM CHALLENGE (20 University Exam Questions) */}
          {/* Rendered ONLY when the dedicated Mixed Exam Practice tab is selected */}
          {activeSubTab13 === "examChallenge" && section.mixedPracticeArena && (
            <div className="pt-2">
              <MixedPracticeArena questions={section.mixedPracticeArena} />
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* SECTION 1.4: BINARY ARITHMETIC (ADDITION, SUBTRACTION, MUL & DIV)         */}
      {/* ========================================================================= */}
      {section.id === "1.4" && (
        <div className="space-y-8">
          
          {/* Horizontal 6-Tab Navigation Bar */}
          <div className="p-4 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E6F40]">
                Binary Arithmetic Interactive Study Track
              </span>
              <span className="text-xs text-[#64748B]">Select an Operation or Challenge:</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              <button
                onClick={() => setActiveSubTab14("overview")}
                className={`p-2.5 rounded-xl text-xs font-mono font-bold transition-all text-center ${
                  activeSubTab14 === "overview"
                    ? 'bg-[#2E6F40] text-white shadow-sm'
                    : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]'
                }`}
              >
                Overview & Rules
              </button>
              <button
                onClick={() => setActiveSubTab14("1.4A")}
                className={`p-2.5 rounded-xl text-xs font-mono font-bold transition-all text-center ${
                  activeSubTab14 === "1.4A"
                    ? 'bg-[#2E6F40] text-white shadow-sm'
                    : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]'
                }`}
              >
                1.4A: Addition
              </button>
              <button
                onClick={() => setActiveSubTab14("1.4B")}
                className={`p-2.5 rounded-xl text-xs font-mono font-bold transition-all text-center ${
                  activeSubTab14 === "1.4B"
                    ? 'bg-[#2E6F40] text-white shadow-sm'
                    : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]'
                }`}
              >
                1.4B: Subtraction
              </button>
              <button
                onClick={() => setActiveSubTab14("1.4C")}
                className={`p-2.5 rounded-xl text-xs font-mono font-bold transition-all text-center ${
                  activeSubTab14 === "1.4C"
                    ? 'bg-[#2E6F40] text-white shadow-sm'
                    : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]'
                }`}
              >
                1.4C: Mul & Div
              </button>
              <button
                onClick={() => setActiveSubTab14("cheatSheet")}
                className={`p-2.5 rounded-xl text-xs font-mono font-bold transition-all text-center ${
                  activeSubTab14 === "cheatSheet"
                    ? 'bg-[#2E6F40] text-white shadow-sm'
                    : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]'
                }`}
              >
                Cheat Sheet
              </button>
              <button
                onClick={() => setActiveSubTab14("mixedPractice")}
                className={`p-2.5 rounded-xl text-xs font-mono font-bold transition-all text-center ${
                  activeSubTab14 === "mixedPractice"
                    ? 'bg-[#2E6F40] text-white shadow-sm'
                    : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]'
                }`}
              >
                Mixed Exam (15 Qs)
              </button>
            </div>
          </div>

          {/* TAB 1: OVERVIEW & RULES */}
          {activeSubTab14 === "overview" && (section.overviewRules || (section.overview && typeof section.overview === "object")) && (() => {
            const ovData = section.overviewRules || section.overview;
            return (
              <div className="space-y-6">
                {/* Visual Blueprint: Base-10 vs Base-2 Carry and Borrow */}
                <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase text-[#2E6F40] bg-[#F2F7F4] px-2 py-0.5 rounded">Blueprint</span>
                    <h2 className="text-lg font-bold text-[#1E293B]">{ovData.heroTitle}</h2>
                  </div>
                  <p className="text-xs text-[#475569] leading-relaxed">
                    {ovData.heroSubtitle}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {ovData.carryBorrowComparison && ovData.carryBorrowComparison.map((item, idx) => (
                      <div key={idx} className="p-5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
                          <span className="text-xs font-mono font-bold text-[#1E293B] uppercase">{item.feature}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#2E6F40]/10 text-[#2E6F40] font-bold">Positional Math</span>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="p-2.5 rounded-lg bg-white border border-[#DCE7E1] space-y-1">
                            <span className="font-mono text-[10px] font-bold uppercase text-[#64748B] block">Decimal (Base 10) Mechanism:</span>
                            <p className="text-[#334155]">{item.decimal}</p>
                          </div>
                          <div className="p-2.5 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] space-y-1">
                            <span className="font-mono text-[10px] font-bold uppercase text-[#15803D] block">Binary (Base 2) Mechanism:</span>
                            <p className="text-[#166534] font-medium">{item.binary}</p>
                          </div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-[#FEF3C7] border border-[#FDE68A] text-[11px] font-mono text-[#92400E] font-bold">
                          {item.highlight}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Side-by-Side 4 Elementary Rules Tables */}
                {ovData.rulesTables && (
                  <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
                    <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E6F40]">
                        Elementary Truth Tables & Governing Rules (All 4 Operations)
                      </span>
                      <span className="text-[11px] font-mono text-[#64748B]">Fundamental Axioms</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Binary Addition Table */}
                      {ovData.rulesTables.addition && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#2E6F40]" />
                            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E6F40]">Binary Addition Rules</h3>
                          </div>
                          <div className="overflow-x-auto border border-[#DCE7E1] rounded-xl">
                            <table className="w-full text-xs text-center border-collapse font-mono">
                              <thead>
                                <tr className="bg-[#FAF8F5] border-b border-[#DCE7E1] text-[#1E293B]">
                                  <th className="py-2 px-3">A</th>
                                  <th className="py-2 px-3">B</th>
                                  <th className="py-2 px-3 text-[#15803D]">Sum</th>
                                  <th className="py-2 px-3 text-[#D97706]">Carry</th>
                                  <th className="py-2 px-3 text-left text-[#64748B]">Dec Equivalent</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-[#F2F7F4] bg-white">
                                {ovData.rulesTables.addition.map((r, i) => (
                                  <tr key={i} className="hover:bg-[#FAF8F5]/60">
                                    <td className="py-2 px-3 font-bold">{r.a}</td>
                                    <td className="py-2 px-3 font-bold">{r.b}</td>
                                    <td className="py-2 px-3 font-black text-[#15803D]">{r.sum}</td>
                                    <td className="py-2 px-3 font-bold text-[#D97706]">{r.carryOut}</td>
                                    <td className="py-2 px-3 text-left text-[11px] text-[#64748B]">{r.decimalCheck}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Binary Subtraction Table */}
                      {ovData.rulesTables.subtraction && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]" />
                            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#DC2626]">Binary Subtraction Rules</h3>
                          </div>
                          <div className="overflow-x-auto border border-[#DCE7E1] rounded-xl">
                            <table className="w-full text-xs text-center border-collapse font-mono">
                              <thead>
                                <tr className="bg-[#FAF8F5] border-b border-[#DCE7E1] text-[#1E293B]">
                                  <th className="py-2 px-3">A</th>
                                  <th className="py-2 px-3">B</th>
                                  <th className="py-2 px-3 text-[#D97706]">Diff</th>
                                  <th className="py-2 px-3 text-[#DC2626]">Borrow</th>
                                  <th className="py-2 px-3 text-left text-[#64748B]">Dec Equivalent</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-[#F2F7F4] bg-white">
                                {ovData.rulesTables.subtraction.map((r, i) => (
                                  <tr key={i} className="hover:bg-[#FAF8F5]/60">
                                    <td className="py-2 px-3 font-bold">{r.a}</td>
                                    <td className="py-2 px-3 font-bold">{r.b}</td>
                                    <td className="py-2 px-3 font-black text-[#D97706]">{r.diff}</td>
                                    <td className="py-2 px-3 font-bold text-[#DC2626]">{r.borrow}</td>
                                    <td className="py-2 px-3 text-left text-[11px] text-[#64748B]">{r.decimalCheck}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Binary Multiplication Table */}
                      {ovData.rulesTables.multiplication && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#4F46E5]" />
                            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#4F46E5]">Binary Multiplication Rules</h3>
                          </div>
                          <div className="overflow-x-auto border border-[#DCE7E1] rounded-xl">
                            <table className="w-full text-xs text-center border-collapse font-mono">
                              <thead>
                                <tr className="bg-[#FAF8F5] border-b border-[#DCE7E1] text-[#1E293B]">
                                  <th className="py-2 px-3">A</th>
                                  <th className="py-2 px-3">B</th>
                                  <th className="py-2 px-3 text-[#4F46E5]">Product</th>
                                  <th className="py-2 px-3 text-left text-[#64748B]">Logic Rule</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-[#F2F7F4] bg-white">
                                {ovData.rulesTables.multiplication.map((r, i) => (
                                  <tr key={i} className="hover:bg-[#FAF8F5]/60">
                                    <td className="py-2 px-3 font-bold">{r.a}</td>
                                    <td className="py-2 px-3 font-bold">{r.b}</td>
                                    <td className="py-2 px-3 font-black text-[#4F46E5]">{r.product}</td>
                                    <td className="py-2 px-3 text-left text-[11px] text-[#64748B]">{r.rule}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Binary Division Table */}
                      {ovData.rulesTables.division && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#059669]" />
                            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#059669]">Binary Division Rules</h3>
                          </div>
                          <div className="overflow-x-auto border border-[#DCE7E1] rounded-xl bg-white p-3 space-y-2">
                            {ovData.rulesTables.division.map((r, i) => (
                              <div key={i} className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono">
                                <span className="font-bold text-[#1E293B]">{r.expression}</span>
                                <span className="text-[11px] text-[#64748B]">{r.rule}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {/* TAB 2: 1.4A BINARY ADDITION (DEEP DIVE) */}
          {activeSubTab14 === "1.4A" && section.additionDeepDive && (
            <div className="space-y-8">
              {/* Visual Blueprint Card: 5 Core Addition Cases & Multi-Number Engine */}
              <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase text-[#2E6F40] bg-[#F2F7F4] px-2 py-0.5 rounded">Blueprint</span>
                  <h2 className="text-lg font-bold text-[#1E293B]">The Binary Addition & Multi-Carry Engine</h2>
                </div>
                <p className="text-xs text-[#475569] leading-relaxed">
                  {section.additionDeepDive.subtitle}
                </p>

                {/* 5 Core Cases Visual Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {section.additionDeepDive.coreCases.map((c, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2 shadow-2xs">
                      <div className="flex items-center justify-between pb-1.5 border-b border-[#DCE7E1]">
                        <span className="text-[10px] font-mono font-bold text-[#64748B]">{c.caseLabel}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white text-[#2E6F40] border border-[#DCE7E1] font-bold">{c.expr}</span>
                      </div>
                      <div className="flex items-center justify-around py-1 font-mono">
                        <div className="text-center">
                          <span className="text-[9px] text-[#64748B] block">Sum</span>
                          <span className="text-sm font-black text-[#15803D]">{c.sum}</span>
                        </div>
                        <div className="text-center">
                          <span className="text-[9px] text-[#64748B] block">Carry</span>
                          <span className={`text-sm font-black ${c.carry === "1" ? "text-[#D97706]" : "text-[#64748B]"}`}>{c.carry}</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-[#64748B] leading-tight">{c.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Universal Multi-Operand Rule Card */}
                <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#15803D]" />
                    <span className="text-xs font-mono font-bold text-[#166534] uppercase">{section.additionDeepDive.multiNumberRule.title}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs text-[#166534]">
                    <div className="p-2.5 rounded-lg bg-white border border-[#BBF7D0] space-y-1">
                      <span className="font-mono text-[10px] font-bold block text-[#15803D]">Step 1: Count</span>
                      <p className="text-[11px] leading-snug">{section.additionDeepDive.multiNumberRule.step1}</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white border border-[#BBF7D0] space-y-1">
                      <span className="font-mono text-[10px] font-bold block text-[#15803D]">Step 2: Convert</span>
                      <p className="text-[11px] leading-snug">{section.additionDeepDive.multiNumberRule.step2}</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white border border-[#BBF7D0] space-y-1">
                      <span className="font-mono text-[10px] font-bold block text-[#15803D]">Step 3: Sum Bit</span>
                      <p className="text-[11px] leading-snug">{section.additionDeepDive.multiNumberRule.step3}</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white border border-[#BBF7D0] space-y-1">
                      <span className="font-mono text-[10px] font-bold block text-[#15803D]">Step 4: Carry Left</span>
                      <p className="text-[11px] leading-snug">{section.additionDeepDive.multiNumberRule.step4}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Model Filter Pills */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-white border border-[#DCE7E1]">
                <span className="text-xs font-mono font-bold uppercase text-[#64748B]">Filter Addition Models:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: "all", label: "All Models (5)" },
                    { id: "integer", label: "Standard 6-Bit (1A)" },
                    { id: "ripple", label: "Ripple Carry (1B)" },
                    { id: "fractional", label: "Fractional Radix (1C)" },
                    { id: "multi", label: "Multi-Operand (1D)" },
                    { id: "otherBases", label: "Octal & Hex (1E)" }
                  ].map(pill => (
                    <button
                      key={pill.id}
                      onClick={() => setActiveModelFilter14A(pill.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                        activeModelFilter14A === pill.id
                          ? 'bg-[#2E6F40] text-white shadow-2xs'
                          : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]'
                      }`}
                    >
                      {pill.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Full-Width Worked Models */}
              <div className="space-y-6">
                {section.additionDeepDive.models
                  .filter(m => activeModelFilter14A === "all" || m.filterTag === activeModelFilter14A)
                  .map(model => (
                    <div key={model.id} className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase text-[#2E6F40] bg-[#F2F7F4] px-2 py-0.5 rounded">
                          {model.title}
                        </span>
                        <h3 className="text-base font-bold text-[#1E293B] mt-1.5">{model.subtitle}</h3>
                      </div>
                      <BitAlignedArithmeticGrid {...model} />
                    </div>
                  ))}
              </div>

              {/* Targeted Practice Set for 1.4A */}
              <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2E6F40]" />
                    <h3 className="text-sm font-mono font-bold uppercase text-[#1E293B]">
                      1.4A Targeted Exam Practice Set (6 Graded Questions)
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-[#64748B]">Click to Reveal Solutions</span>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  {section.additionDeepDive.practiceQuestions.map(pq => {
                    const isRevealed = !!revealedQuestions[pq.id];
                    return (
                      <div key={pq.id} className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-4 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                            pq.difficulty === "Easy" ? "bg-[#DCFCE7] text-[#15803D]" :
                            pq.difficulty === "Medium" ? "bg-[#FEF3C7] text-[#92400E]" : "bg-[#FEE2E2] text-[#B91C1C]"
                          }`}>
                            {pq.difficulty}
                          </span>
                          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-white border border-[#DCE7E1] text-[#475569]">
                            {pq.examTag}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-[#1E293B] leading-relaxed">{pq.question}</p>
                        <button
                          onClick={() => toggleQuestion(pq.id)}
                          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#2E6F40] hover:text-[#1E293B] transition-colors"
                        >
                          {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          <span>{isRevealed ? "Hide Solution" : "Reveal Step-by-Step Solution"}</span>
                        </button>
                        {isRevealed && (
                          <div className="p-5 rounded-2xl bg-white border border-[#DCE7E1] space-y-4 shadow-2xs">
                            {(pq.gridColumns || pq.multiOperands || pq.octalExample || pq.hexExample) && (
                              <BitAlignedArithmeticGrid
                                problem={pq.question}
                                op={pq.op || "+"}
                                gridColumns={pq.gridColumns}
                                multiOperands={pq.multiOperands}
                                multiCarries={pq.multiCarries}
                                result={pq.result}
                                verification={pq.verification}
                                octalExample={pq.octalExample}
                                hexExample={pq.hexExample}
                              />
                            )}
                            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] text-xs font-mono text-[#334155] whitespace-pre-line leading-relaxed">
                              <span className="text-[10px] font-mono font-bold uppercase text-[#64748B] block mb-1">
                                Step-by-Step Hardware Explanation:
                              </span>
                              {pq.solution}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 1.4B DIRECT BINARY SUBTRACTION (DEEP DIVE) */}
          {activeSubTab14 === "1.4B" && section.subtractionDeepDive && (
            <div className="space-y-8">
              {/* Visual Blueprint Card: Borrow Mechanics & Zero-Bridge Architecture */}
              <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase text-[#DC2626] bg-[#FEF2F2] px-2 py-0.5 rounded">Blueprint</span>
                  <h2 className="text-lg font-bold text-[#1E293B]">The Borrow Propagation & Zero-Bridge Blueprint</h2>
                </div>
                <p className="text-xs text-[#475569] leading-relaxed">
                  {section.subtractionDeepDive.subtitle}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3">
                    <span className="text-xs font-mono font-bold text-[#DC2626] uppercase block">Why Borrow Adds 2₁₀ = (10)₂</span>
                    <p className="text-xs text-[#334155] leading-relaxed">
                      {section.subtractionDeepDive.borrowMechanicsBlueprint.coreRule}
                    </p>
                    <div className="p-3 rounded-lg bg-white border border-[#DCE7E1] text-xs font-mono text-[#1E293B]">
                      {section.subtractionDeepDive.borrowMechanicsBlueprint.valueAdded}
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] space-y-3">
                    <div className="flex items-center justify-between pb-1.5 border-b border-[#FDE68A]">
                      <span className="text-xs font-mono font-bold text-[#92400E] uppercase">The Zero-Bridge 4-Step Rule</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-[#D97706] font-bold">#1 Exam Secret</span>
                    </div>
                    <ul className="space-y-1.5 text-xs font-mono text-[#92400E]">
                      {section.subtractionDeepDive.borrowMechanicsBlueprint.zeroBridgeRule.map((r, i) => (
                        <li key={i} className="leading-snug">{r}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Model Filter Pills */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-white border border-[#DCE7E1]">
                <span className="text-xs font-mono font-bold uppercase text-[#64748B]">Filter Subtraction Models:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: "all", label: "All Models (5)" },
                    { id: "singleBorrow", label: "Single Borrow (2A)" },
                    { id: "zeroBridge", label: "Zero-Bridge (2B)" },
                    { id: "fractional", label: "Fractional Radix (2C)" },
                    { id: "negative", label: "A < B Negative (2D)" },
                    { id: "otherBases", label: "Octal & Hex (2E)" }
                  ].map(pill => (
                    <button
                      key={pill.id}
                      onClick={() => setActiveModelFilter14B(pill.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                        activeModelFilter14B === pill.id
                          ? 'bg-[#2E6F40] text-white shadow-2xs'
                          : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]'
                      }`}
                    >
                      {pill.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Full-Width Worked Models */}
              <div className="space-y-6">
                {section.subtractionDeepDive.models
                  .filter(m => activeModelFilter14B === "all" || m.filterTag === activeModelFilter14B)
                  .map(model => (
                    <div key={model.id} className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase text-[#DC2626] bg-[#FEF2F2] px-2 py-0.5 rounded">
                          {model.title}
                        </span>
                        <h3 className="text-base font-bold text-[#1E293B] mt-1.5">{model.subtitle}</h3>
                      </div>
                      <BitAlignedArithmeticGrid {...model} />
                    </div>
                  ))}
              </div>

              {/* Targeted Practice Set for 1.4B */}
              <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]" />
                    <h3 className="text-sm font-mono font-bold uppercase text-[#1E293B]">
                      1.4B Targeted Exam Practice Set (6 Graded Questions)
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-[#64748B]">Click to Reveal Solutions</span>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  {section.subtractionDeepDive.practiceQuestions.map(pq => {
                    const isRevealed = !!revealedQuestions[pq.id];
                    return (
                      <div key={pq.id} className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-4 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                            pq.difficulty === "Easy" ? "bg-[#DCFCE7] text-[#15803D]" :
                            pq.difficulty === "Medium" ? "bg-[#FEF3C7] text-[#92400E]" : "bg-[#FEE2E2] text-[#B91C1C]"
                          }`}>
                            {pq.difficulty}
                          </span>
                          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-white border border-[#DCE7E1] text-[#475569]">
                            {pq.examTag}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-[#1E293B] leading-relaxed">{pq.question}</p>
                        <button
                          onClick={() => toggleQuestion(pq.id)}
                          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#2E6F40] hover:text-[#1E293B] transition-colors"
                        >
                          {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          <span>{isRevealed ? "Hide Solution" : "Reveal Step-by-Step Solution"}</span>
                        </button>
                        {isRevealed && (
                          <div className="p-5 rounded-2xl bg-white border border-[#DCE7E1] space-y-4 shadow-2xs">
                            {(pq.gridColumns || pq.multiOperands || pq.octalExample || pq.hexExample) && (
                              <BitAlignedArithmeticGrid
                                problem={pq.question}
                                op={pq.op || "-"}
                                gridColumns={pq.gridColumns}
                                multiOperands={pq.multiOperands}
                                multiCarries={pq.multiCarries}
                                result={pq.result}
                                verification={pq.verification}
                                octalExample={pq.octalExample}
                                hexExample={pq.hexExample}
                              />
                            )}
                            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] text-xs font-mono text-[#334155] whitespace-pre-line leading-relaxed">
                              <span className="text-[10px] font-mono font-bold uppercase text-[#64748B] block mb-1">
                                Step-by-Step Hardware Explanation:
                              </span>
                              {pq.solution}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: 1.4C MULTIPLICATION & DIVISION (COMPLETELY REDESIGNED) */}
          {activeSubTab14 === "1.4C" && section.mulDivGuide && (
            <div className="space-y-8">
              {/* Inner 2-Tab Switcher */}
              <div className="p-2 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs">
                <div className="flex flex-wrap items-center gap-2 p-1 rounded-xl bg-[#FAF8F5] border border-[#E2E8F0]">
                  <button
                    onClick={() => setSubTab14C("multiplication")}
                    className={`flex-1 min-w-[260px] py-3 px-4 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-2.5 ${
                      subTab14C === "multiplication"
                        ? "bg-white text-[#4F46E5] shadow-xs border border-[#C7D2FE]"
                        : "text-[#64748B] hover:text-[#1E293B]"
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4F46E5]" />
                    <span>Binary Multiplication (Shift-and-Add Visual Matrix)</span>
                  </button>
                  <button
                    onClick={() => setSubTab14C("division")}
                    className={`flex-1 min-w-[260px] py-3 px-4 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-2.5 ${
                      subTab14C === "division"
                        ? "bg-white text-[#059669] shadow-xs border border-[#A7F3D0]"
                        : "text-[#64748B] hover:text-[#1E293B]"
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#059669]" />
                    <span>Binary Division (Visual Restoring Long-Division Ladder)</span>
                  </button>
                </div>
              </div>

              {/* TAB 1 CONTENT: BINARY MULTIPLICATION */}
              {subTab14C === "multiplication" && (
                <div className="space-y-8">
                  {/* Visual Blueprint Card: Shift-and-Add Matrix Architecture */}
                  <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold uppercase text-[#4F46E5] bg-[#EEF2FF] px-2 py-0.5 rounded">
                        Visual Blueprint
                      </span>
                      <h2 className="text-lg font-bold text-[#1E293B]">
                        {section.mulDivGuide.multiplication.blueprint?.title || "The 2 Core Shift-and-Add Multiplication Rules"}
                      </h2>
                    </div>
                    <p className="text-xs text-[#475569] leading-relaxed">
                      {section.mulDivGuide.multiplication.concept}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-md bg-[#EEF2FF] text-[#4F46E5] font-mono font-black text-xs flex items-center justify-center">
                            1
                          </span>
                          <span className="text-xs font-mono font-bold text-[#1E293B]">If Multiplier Bit = 1</span>
                        </div>
                        <p className="text-xs font-mono text-[#334155] leading-relaxed pl-8">
                          {section.mulDivGuide.multiplication.blueprint?.rule1}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-md bg-[#FEF3C7] text-[#92400E] font-mono font-black text-xs flex items-center justify-center">
                            0
                          </span>
                          <span className="text-xs font-mono font-bold text-[#1E293B]">If Multiplier Bit = 0</span>
                        </div>
                        <p className="text-xs font-mono text-[#334155] leading-relaxed pl-8">
                          {section.mulDivGuide.multiplication.blueprint?.rule2}
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-mono text-[#475569] flex items-center gap-2">
                      <span className="font-bold text-[#1E293B]">Hardware Blueprint:</span>
                      <span>{section.mulDivGuide.multiplication.blueprint?.hardwareNote}</span>
                    </div>
                  </div>

                  {/* Worked Multiplication Models with Graphical Matrix */}
                  <div className="space-y-6">
                    {section.mulDivGuide.multiplication.models.map(model => (
                      <div key={model.id} className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#F1F5F9]">
                          <div>
                            <span className="text-[10px] font-mono font-bold uppercase text-[#4F46E5] bg-[#EEF2FF] px-2 py-0.5 rounded">
                              {model.title}
                            </span>
                            <h3 className="text-base font-bold text-[#1E293B] mt-1.5">{model.subtitle}</h3>
                          </div>
                          <span className="font-mono text-xs font-bold text-[#4F46E5] bg-[#EEF2FF] px-2.5 py-1 rounded-md border border-[#C7D2FE]">
                            {model.problem}
                          </span>
                        </div>
                        <GraphicalMultiplicationGrid {...model} />
                      </div>
                    ))}
                  </div>

                  {/* Targeted Practice Set for Multiplication */}
                  <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#4F46E5]" />
                        <h3 className="text-sm font-mono font-bold uppercase text-[#1E293B]">
                          Targeted Exam Practice Set (Shift-and-Add Multiplication)
                        </h3>
                      </div>
                      <span className="text-[11px] font-mono text-[#64748B]">Click to Reveal Solutions</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {section.mulDivGuide.practiceQuestions
                        .filter(pq => pq.id === "p14c-1" || pq.id === "p14c-3" || pq.id === "p14c-5")
                        .map(pq => {
                          const isRevealed = !!revealedQuestions[pq.id];
                          return (
                            <div key={pq.id} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3 flex flex-col justify-between shadow-2xs">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                                    pq.difficulty === "Easy" ? "bg-[#DCFCE7] text-[#15803D]" :
                                    pq.difficulty === "Medium" ? "bg-[#FEF3C7] text-[#92400E]" : "bg-[#FEE2E2] text-[#B91C1C]"
                                  }`}>
                                    {pq.difficulty}
                                  </span>
                                  <span className="text-[10px] font-mono text-[#475569] font-semibold">{pq.examTag}</span>
                                </div>
                                <p className="text-xs font-semibold text-[#1E293B] leading-relaxed">{pq.question}</p>
                              </div>

                              <div className="space-y-3 pt-2">
                                <button
                                  onClick={() => toggleQuestion(pq.id)}
                                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#4F46E5] hover:text-[#1E293B] transition-colors"
                                >
                                  {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                  <span>{isRevealed ? "Hide Solution" : "Reveal Step-by-Step Solution"}</span>
                                </button>
                                {isRevealed && (
                                  <div className="p-3.5 rounded-lg bg-white border border-[#DCE7E1] text-xs font-mono text-[#334155] whitespace-pre-line leading-relaxed shadow-2xs">
                                    <span className="text-[10px] font-mono font-bold uppercase text-[#64748B] block mb-1">
                                      Step-by-Step Trace:
                                    </span>
                                    {pq.solution}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2 CONTENT: BINARY DIVISION */}
              {subTab14C === "division" && (
                <div className="space-y-8">
                  {/* Visual Blueprint Card: 3-Step Compare-Subtract-BringDown Loop */}
                  <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold uppercase text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded">
                        Visual Blueprint
                      </span>
                      <h2 className="text-lg font-bold text-[#1E293B]">
                        {section.mulDivGuide.division.blueprint?.title || "The 3-Step Compare-Subtract-BringDown Loop"}
                      </h2>
                    </div>
                    <p className="text-xs text-[#475569] leading-relaxed">
                      {section.mulDivGuide.division.concept}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-md bg-[#DCFCE7] text-[#15803D] font-mono font-black text-xs flex items-center justify-center">
                            1
                          </span>
                          <span className="text-xs font-mono font-bold text-[#1E293B]">Step 1: Compare</span>
                        </div>
                        <p className="text-xs font-mono text-[#334155] leading-relaxed pl-8">
                          {section.mulDivGuide.division.blueprint?.step1}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-md bg-[#FEF3C7] text-[#92400E] font-mono font-black text-xs flex items-center justify-center">
                            2
                          </span>
                          <span className="text-xs font-mono font-bold text-[#1E293B]">Step 2: Subtract</span>
                        </div>
                        <p className="text-xs font-mono text-[#334155] leading-relaxed pl-8">
                          {section.mulDivGuide.division.blueprint?.step2}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-md bg-[#DBEAFE] text-[#1D4ED8] font-mono font-black text-xs flex items-center justify-center">
                            3
                          </span>
                          <span className="text-xs font-mono font-bold text-[#1D4ED8]">Step 3: Bring Down (&darr;)</span>
                        </div>
                        <p className="text-xs font-mono text-[#1E40AF] leading-relaxed pl-8">
                          {section.mulDivGuide.division.blueprint?.step3}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Worked Division Models with Graphical Ladder */}
                  <div className="space-y-6">
                    {section.mulDivGuide.division.models.map(model => (
                      <div key={model.id} className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#F1F5F9]">
                          <div>
                            <span className="text-[10px] font-mono font-bold uppercase text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded">
                              {model.title}
                            </span>
                            <h3 className="text-base font-bold text-[#1E293B] mt-1.5">{model.subtitle}</h3>
                          </div>
                          <span className="font-mono text-xs font-bold text-[#059669] bg-[#ECFDF5] px-2.5 py-1 rounded-md border border-[#A7F3D0]">
                            {model.problem}
                          </span>
                        </div>
                        <GraphicalDivisionLadder {...model} />
                      </div>
                    ))}
                  </div>

                  {/* Targeted Practice Set for Division */}
                  <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#059669]" />
                        <h3 className="text-sm font-mono font-bold uppercase text-[#1E293B]">
                          Targeted Exam Practice Set (Restoring Long Division)
                        </h3>
                      </div>
                      <span className="text-[11px] font-mono text-[#64748B]">Click to Reveal Solutions</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {section.mulDivGuide.practiceQuestions
                        .filter(pq => pq.id === "p14c-2" || pq.id === "p14c-4" || pq.id === "p14c-6")
                        .map(pq => {
                          const isRevealed = !!revealedQuestions[pq.id];
                          return (
                            <div key={pq.id} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3 flex flex-col justify-between shadow-2xs">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                                    pq.difficulty === "Easy" ? "bg-[#DCFCE7] text-[#15803D]" :
                                    pq.difficulty === "Medium" ? "bg-[#FEF3C7] text-[#92400E]" : "bg-[#FEE2E2] text-[#B91C1C]"
                                  }`}>
                                    {pq.difficulty}
                                  </span>
                                  <span className="text-[10px] font-mono text-[#475569] font-semibold">{pq.examTag}</span>
                                </div>
                                <p className="text-xs font-semibold text-[#1E293B] leading-relaxed">{pq.question}</p>
                              </div>

                              <div className="space-y-3 pt-2">
                                <button
                                  onClick={() => toggleQuestion(pq.id)}
                                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#059669] hover:text-[#1E293B] transition-colors"
                                >
                                  {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                  <span>{isRevealed ? "Hide Solution" : "Reveal Step-by-Step Solution"}</span>
                                </button>
                                {isRevealed && (
                                  <div className="p-3.5 rounded-lg bg-white border border-[#DCE7E1] text-xs font-mono text-[#334155] whitespace-pre-line leading-relaxed shadow-2xs">
                                    <span className="text-[10px] font-mono font-bold uppercase text-[#64748B] block mb-1">
                                      Step-by-Step Trace:
                                    </span>
                                    {pq.solution}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: CHEAT SHEET (EXCLUSIVE SHORTCUTS, MATRIX & RULES) */}
          {activeSubTab14 === "cheatSheet" && section.cheatSheet && (
            <div className="space-y-8">
              {/* Header */}
              <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase text-[#D97706] bg-[#FFFBEB] px-2 py-0.5 rounded">Cheat Sheet</span>
                  <h2 className="text-lg font-bold text-[#1E293B]">{section.cheatSheet.title}</h2>
                </div>
                <p className="text-xs text-[#475569] leading-relaxed">
                  {section.cheatSheet.subtitle}
                </p>
              </div>

              {/* 1. Master 4-Operation Arithmetic Matrix */}
              {section.cheatSheet.masterMatrix && (
                <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2E6F40]" />
                      <h3 className="text-sm font-mono font-bold uppercase text-[#1E293B]">
                        1. All 4 Binary Arithmetic Operations Master Comparison Matrix
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-[#64748B]">At-a-Glance Summary</span>
                  </div>

                  <div className="overflow-x-auto border border-[#DCE7E1] rounded-xl bg-white">
                    <table className="w-full text-xs font-mono text-left border-collapse">
                      <thead>
                        <tr className="bg-[#FAF8F5] border-b border-[#DCE7E1] text-[#1E293B]">
                          <th className="py-2.5 px-3 font-bold">Operation</th>
                          <th className="py-2.5 px-3 font-bold">Identity</th>
                          <th className="py-2.5 px-3 font-bold">Carry / Borrow Rule</th>
                          <th className="py-2.5 px-3 font-bold text-[#B91C1C]">Key Constraint / Sign</th>
                          <th className="py-2.5 px-3 font-bold text-[#15803D]">5-Second Speed Trick</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F2F7F4]">
                        {section.cheatSheet.masterMatrix.map((row, idx) => (
                          <tr key={idx} className="hover:bg-[#FAF8F5]/60">
                            <td className="py-2.5 px-3 font-bold text-[#1E293B]">{row.op}</td>
                            <td className="py-2.5 px-3 font-mono text-[#4F46E5]">{row.identity}</td>
                            <td className="py-2.5 px-3 text-[#475569]">{row.carryBorrow}</td>
                            <td className="py-2.5 px-3 text-[#B91C1C] font-semibold">{row.keyConstraint}</td>
                            <td className="py-2.5 px-3 text-[#15803D] font-bold">{row.speedTrick}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 2. 5-Second Exam Speed Shortcuts Grid */}
              {section.cheatSheet.shortcuts && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" />
                      <h3 className="text-sm font-mono font-bold uppercase text-[#1E293B]">
                        2. 5-Second Exam Speed Shortcuts & Sanity Checks
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-[#64748B]">Mental Calculation Hacks</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {section.cheatSheet.shortcuts.map(sc => (
                      <div key={sc.id} className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-3.5 flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
                            <h3 className="text-sm font-bold text-[#1E293B]">{sc.title}</h3>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#2E6F40]/10 text-[#2E6F40] font-bold">
                              {sc.badge || "Speed Trick"}
                            </span>
                          </div>

                          {sc.concept && (
                            <p className="text-xs text-[#475569] leading-relaxed">{sc.concept}</p>
                          )}

                          {sc.formula && (
                            <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#2E6F40]/30 text-center font-mono font-bold text-xs text-[#2E6F40]">
                              {sc.formula}
                            </div>
                          )}

                          {sc.rule && (
                            <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] text-xs font-mono text-[#334155] leading-relaxed">
                              <span className="font-bold text-[#1E293B] block mb-1">Shortcut Rule:</span>
                              {sc.rule}
                            </div>
                          )}

                          {sc.example && (
                            <div className="p-2.5 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-mono text-[#1E40AF]">
                              <span className="font-bold block text-[#1D4ED8] mb-0.5">Rapid Example:</span>
                              {sc.example}
                            </div>
                          )}

                          {sc.explanation && (
                            <p className="text-xs font-mono text-[#64748B] leading-relaxed">
                              {sc.explanation}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Top 5 Exam Mistakes in Binary Arithmetic */}
              {section.cheatSheet.topMistakes && (
                <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase text-[#DC2626] bg-[#FEF2F2] px-2 py-0.5 rounded">High-Yield Caution</span>
                    <h3 className="text-base font-bold text-[#1E293B]">3. Top 5 Exam Mistakes in Binary Arithmetic (And How to Avoid Them)</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {section.cheatSheet.topMistakes.map(tm => (
                      <div key={tm.rank} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2.5 flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-[#DC2626] text-white flex items-center justify-center font-mono text-xs font-bold flex-shrink-0">
                              {tm.rank}
                            </span>
                            <h4 className="text-xs font-bold text-[#1E293B] leading-snug">{tm.mistake}</h4>
                          </div>
                          <p className="text-[11px] text-[#64748B] leading-relaxed">{tm.why}</p>
                        </div>
                        <div className="p-2.5 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] text-[11px] font-mono text-[#15803D]">
                          <span className="font-bold block">Sanity Check Fix:</span>
                          <span>{tm.fix}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: MIXED EXAM CHALLENGE (15 DISTINCT QUESTIONS) */}
          {activeSubTab14 === "mixedPractice" && section.mixedExamChallenge && (
            <div className="space-y-6">
              {/* Header & Difficulty Filter Pills */}
              <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase text-[#2E6F40] bg-[#F2F7F4] px-2 py-0.5 rounded">Exam Arena</span>
                    <h2 className="text-lg font-bold text-[#1E293B] mt-1">Section 1.4 Mixed Exam Challenge (15 Questions)</h2>
                    <p className="text-xs text-[#64748B]">Rigorous university exam problems testing addition, multi-zero borrows, multiplication, division, and octal/hex arithmetic.</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: "all", label: "All (15)" },
                      { id: "Easy", label: "Easy (4)" },
                      { id: "Medium", label: "Medium (6)" },
                      { id: "Hard", label: "Hard (5)" }
                    ].map(f => (
                      <button
                        key={f.id}
                        onClick={() => setActiveMixedFilter14(f.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                          activeMixedFilter14 === f.id
                            ? 'bg-[#2E6F40] text-white shadow-2xs'
                            : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 15 Question Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.mixedExamChallenge
                  .filter(q => activeMixedFilter14 === "all" || q.difficulty === activeMixedFilter14)
                  .map(q => {
                    const isRevealed = !!revealedQuestions[q.id];
                    return (
                      <div key={q.id} className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-3 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                                q.difficulty === "Easy" ? "bg-[#DCFCE7] text-[#15803D]" :
                                q.difficulty === "Medium" ? "bg-[#FEF3C7] text-[#92400E]" : "bg-[#FEE2E2] text-[#B91C1C]"
                              }`}>
                                {q.difficulty}
                              </span>
                              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#F2F7F4] text-[#2E6F40] border border-[#DCE7E1]">
                                {q.topic}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono text-[#64748B]">{q.examTag}</span>
                          </div>
                          <p className="text-xs font-medium text-[#1E293B] leading-relaxed">{q.question}</p>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-[#F2F7F4]">
                          <button
                            onClick={() => toggleQuestion(q.id)}
                            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#2E6F40] hover:text-[#1E293B] transition-colors"
                          >
                            {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            <span>{isRevealed ? "Hide Solution" : "Reveal Step-by-Step Solution"}</span>
                          </button>
                          {isRevealed && (
                            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] text-xs font-mono text-[#334155] whitespace-pre-line leading-relaxed">
                              {q.solution}
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
      )}

      {/* ========================================================================= */}
      {/* SECTION 1.5: COMPLEMENTS (1's, 2's, 9's & 10's COMPLEMENTS)               */}
      {/* ========================================================================= */}
      {section.id === "1.5" && (
        <Section15View section={section} />
      )}

      {/* ========================================================================= */}
      {/* SECTION 1.6: SIGNED BINARY NUMBERS                                        */}
      {/* ========================================================================= */}
      {section.id === "1.6" && (
        <div className="space-y-8">

          {/* PART A: Sign Bit Concept + SVG Register Diagram */}
          {section.signBitConcept && (
            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase text-[#2E6F40] bg-[#F2F7F4] px-2 py-0.5 rounded">Part A</span>
                <h2 className="text-lg font-bold text-[#1E293B]">Unsigned vs. Signed Binary Numbers and the Sign Bit Rule</h2>
              </div>
              <ul className="space-y-2">
                {section.signBitConcept.bullets.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#475569] leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2E6F40] flex-shrink-0 mt-1.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              {/* SVG 8-Bit Register */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1]">
                <span className="text-xs font-mono font-bold text-[#1E293B] block mb-3">8-Bit Signed Register Bit Layout</span>
                <div className="w-full overflow-x-auto">
                  <svg viewBox="0 0 640 110" className="w-full min-w-[500px] max-w-[640px] mx-auto">
                    {/* Sign Bit box */}
                    <rect x="10" y="20" width="70" height="50" rx="4" fill="#FEF2F2" stroke="#DC2626" strokeWidth="2"/>
                    <text x="45" y="42" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#DC2626">b7 (MSB)</text>
                    <text x="45" y="56" textAnchor="middle" fontSize="9" fill="#DC2626">SIGN BIT</text>
                    <text x="45" y="68" textAnchor="middle" fontSize="8" fill="#991B1B">0=Pos 1=Neg</text>
                    {/* Remaining 7 bits */}
                    {["b6","b5","b4","b3","b2","b1","b0 (LSB)"].map((b, i) => (
                      <g key={b}>
                        <rect x={88 + i*79} y="20" width={i === 6 ? 85 : 75} height="50" rx="4" fill="#F2F7F4" stroke="#2E6F40" strokeWidth="1.5"/>
                        <text x={88 + i*79 + (i===6?42:37)} y="42" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1E293B">{b}</text>
                        <text x={88 + i*79 + (i===6?42:37)} y="56" textAnchor="middle" fontSize="9" fill="#2E6F40">{i===6 ? "2\u2070=1" : "2" + ["\u2076","\u2075","\u2074","\u00B3","\u00B2","\u00B9"][i]}</text>
                        <text x={88 + i*79 + (i===6?42:37)} y="68" textAnchor="middle" fontSize="8" fill="#64748B">Value bit</text>
                      </g>
                    ))}
                    <text x="45" y="95" textAnchor="middle" fontSize="9" fill="#DC2626" fontWeight="bold">Sign</text>
                    <text x="390" y="95" textAnchor="middle" fontSize="9" fill="#2E6F40" fontWeight="bold">7 Magnitude / Value Bits</text>
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* PART B: Three Signed Representation Scheme Cards */}
          {section.signedSchemes && (
            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase text-[#4F46E5] bg-[#EEF2FF] px-2 py-0.5 rounded">Part B</span>
                <h2 className="text-lg font-bold text-[#1E293B]">The 3 Signed Representation Schemes</h2>
                <span className="text-xs text-[#64748B]">Running Example: +45 and -45 in 8 bits</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {section.signedSchemes.map((scheme) => (
                  <div key={scheme.id} className="p-5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-4 flex flex-col">
                    <div className="flex items-center gap-2 pb-2 border-b border-[#DCE7E1]">
                      <span className="w-6 h-6 rounded-full bg-[#2E6F40] text-white flex items-center justify-center font-mono text-xs font-bold">{scheme.cardNumber}</span>
                      <h3 className="text-xs font-bold text-[#1E293B] flex-1">{scheme.name}</h3>
                    </div>
                    <p className="text-[11px] text-[#475569] leading-relaxed">{scheme.rule}</p>
                    {/* Bit Display */}
                    <div className="space-y-2">
                      <div className="p-2.5 rounded-lg bg-white border border-[#DCE7E1] font-mono text-xs">
                        <span className="text-[#2E6F40] font-bold block">{scheme.positiveExample.decimal}</span>
                        <code className="text-[#1E293B] text-sm font-bold tracking-widest">{scheme.positiveExample.binary8}</code>
                        <span className="text-[10px] text-[#64748B] block mt-0.5">{scheme.positiveExample.breakdown}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white border border-[#DCE7E1] font-mono text-xs">
                        <span className="text-[#DC2626] font-bold block">{scheme.negativeExample.decimal}</span>
                        <code className="text-[#1E293B] text-sm font-bold tracking-widest">{scheme.negativeExample.binary8}</code>
                        <span className="text-[10px] text-[#64748B] block mt-0.5">{scheme.negativeExample.breakdown}</span>
                      </div>
                      {scheme.verification && (
                        <div className="p-2 rounded-lg bg-[#F2F7F4] text-[10px] font-mono text-[#2E6F40]">Verify: {scheme.verification}</div>
                      )}
                    </div>
                    <div className="p-2 rounded-lg bg-white border border-[#DCE7E1] text-[10px] space-y-1">
                      <span className="font-bold text-[#1E293B] block">Range ({scheme.rangeFormula}):</span>
                      <span className="font-mono text-[#4F46E5] font-bold">{scheme.range8bit}</span>
                    </div>
                    {scheme.drawback && (
                      <div className="p-2 rounded-lg bg-[#FEF2F2] border border-[#FECACA] text-[10px] text-[#991B1B]">
                        <span className="font-bold">Drawback: </span>{scheme.drawback}
                      </div>
                    )}
                    {scheme.advantage && (
                      <div className="p-2 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] text-[10px] text-[#166534]">
                        <span className="font-bold">Advantage: </span>{scheme.advantage}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PART C: 4-Bit Master Reference Table */}
          {section.fourBitTable && (
            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase text-[#2E6F40] bg-[#F2F7F4] px-2 py-0.5 rounded">Part C</span>
                <h2 className="text-lg font-bold text-[#1E293B]">4-Bit Master Reference Table + Overflow Detection</h2>
              </div>
              <div className="overflow-x-auto border border-[#DCE7E1] rounded-xl">
                <table className="w-full text-xs text-center border-collapse font-mono">
                  <thead>
                    <tr className="bg-[#FAF8F5] border-b border-[#DCE7E1]">
                      {section.fourBitTable.headers.map((h, i) => (
                        <th key={i} className="py-2.5 px-3 font-bold text-[#1E293B]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2F7F4]">
                    {section.fourBitTable.rows.map((r, i) => (
                      <tr key={i} className={`hover:bg-[#FAF8F5]/60 ${r.pattern.startsWith('1') ? 'bg-[#FEF2F2]/30' : ''}`}>
                        <td className="py-2 px-3 font-bold text-[#1E293B] tracking-widest">{r.pattern}</td>
                        <td className="py-2 px-3 text-[#64748B]">{r.unsigned}</td>
                        <td className="py-2 px-3 text-[#D97706] font-semibold">{r.signMag}</td>
                        <td className="py-2 px-3 text-[#4F46E5] font-semibold">{r.onesComp}</td>
                        <td className="py-2 px-3 text-[#2E6F40] font-bold">{r.twosComp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {section.fourBitTable.overflowRule && (
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                  <h3 className="text-xs font-bold text-[#DC2626]">{section.fourBitTable.overflowRule.title}</h3>
                  <div className="p-3 rounded-lg bg-white border-2 border-[#DC2626]/30 text-center">
                    <span className="font-mono font-bold text-[#DC2626]">{section.fourBitTable.overflowRule.formula}</span>
                  </div>
                  <p className="text-xs text-[#475569] leading-relaxed">{section.fourBitTable.overflowRule.simpleRule}</p>
                </div>
              )}
            </div>
          )}

          {/* PART D: Worked Exam Models for Signed Arithmetic */}
          {section.signedArithmeticModels && (
            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase text-[#D97706] bg-[#FFFBEB] px-2 py-0.5 rounded">Part D</span>
                <h2 className="text-lg font-bold text-[#1E293B]">Worked Exam Models: All 4 Combinations in 8-bit 2's Complement</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.signedArithmeticModels.map((model, mIdx) => (
                  <div key={mIdx} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#4F46E5] block">{model.label}</span>
                    <div className="p-3 rounded-lg bg-white border border-[#DCE7E1] font-mono text-[11px] text-[#334155] space-y-0.5">
                      {model.steps.map((st, si) => (
                        <div key={si} className={
                          st.includes("OVERFLOW") ? "text-[#DC2626] font-bold" :
                          st.startsWith("Result") || st.includes("Verify:") ? "text-[#2E6F40] font-bold" :
                          st.includes("discard") || st.includes("Discard") ? "text-[#D97706] font-semibold" : ""
                        }>{st}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 1.7: LOGIC GATES                                                  */}
      {/* ========================================================================= */}
      {section.id === "1.7" && (
        <div className="space-y-8">

          {/* PART A: Gate Atlas - All 7 Gates in 3 Categories */}
          {section.gateCategories && (
            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-8">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase text-[#2E6F40] bg-[#F2F7F4] px-2 py-0.5 rounded">Part A</span>
                <h2 className="text-lg font-bold text-[#1E293B]">Complete Atlas of the 7 Logic Gates (3 Categories)</h2>
              </div>

              {section.gateCategories.map((cat, catIdx) => (
                <div key={catIdx} className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: cat.categoryColor}} />
                    <h3 className="text-sm font-bold" style={{color: cat.categoryColor}}>{cat.category}</h3>
                    {cat.gates.some(g => g.isUniversal) && (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#4F46E5] text-white">UNIVERSAL</span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {cat.gates.map((gate) => (
                      <div key={gate.id} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-4 flex flex-col">
                        {/* Gate Header */}
                        <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
                          <div>
                            <h4 className="text-xs font-bold text-[#1E293B]">{gate.name}</h4>
                            <span className="text-[10px] font-mono text-[#64748B]">{gate.ic}</span>
                          </div>
                          {gate.isUniversal && (
                            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#4F46E5] text-white">UNIVERSAL</span>
                          )}
                        </div>

                        {/* SVG Gate Symbol */}
                        <div className="flex items-center justify-center py-2">
                          {gate.id === "NOT" && (
                            <svg viewBox="0 0 100 60" className="h-12 w-24">
                              <line x1="5" y1="30" x2="25" y2="30" stroke="#2E6F40" strokeWidth="2"/>
                              <polygon points="25,10 70,30 25,50" fill="none" stroke="#2E6F40" strokeWidth="2"/>
                              <circle cx="74" cy="30" r="5" fill="none" stroke="#2E6F40" strokeWidth="2"/>
                              <line x1="79" y1="30" x2="95" y2="30" stroke="#2E6F40" strokeWidth="2"/>
                              <text x="8" y="27" fontSize="8" fill="#64748B">A</text>
                              <text x="82" y="27" fontSize="8" fill="#64748B">Y</text>
                            </svg>
                          )}
                          {gate.id === "AND" && (
                            <svg viewBox="0 0 110 70" className="h-12 w-28">
                              <line x1="5" y1="20" x2="25" y2="20" stroke="#2E6F40" strokeWidth="2"/>
                              <line x1="5" y1="50" x2="25" y2="50" stroke="#2E6F40" strokeWidth="2"/>
                              <line x1="25" y1="10" x2="25" y2="60" stroke="#2E6F40" strokeWidth="2"/>
                              <line x1="25" y1="10" x2="55" y2="10" stroke="#2E6F40" strokeWidth="2"/>
                              <line x1="25" y1="60" x2="55" y2="60" stroke="#2E6F40" strokeWidth="2"/>
                              <path d="M55 10 Q85 10 85 35 Q85 60 55 60" fill="none" stroke="#2E6F40" strokeWidth="2"/>
                              <line x1="85" y1="35" x2="105" y2="35" stroke="#2E6F40" strokeWidth="2"/>
                              <text x="2" y="18" fontSize="8" fill="#64748B">A</text>
                              <text x="2" y="53" fontSize="8" fill="#64748B">B</text>
                              <text x="91" y="38" fontSize="8" fill="#64748B">Y</text>
                            </svg>
                          )}
                          {gate.id === "OR" && (
                            <svg viewBox="0 0 110 70" className="h-12 w-28">
                              <line x1="5" y1="20" x2="25" y2="20" stroke="#D97706" strokeWidth="2"/>
                              <line x1="5" y1="50" x2="25" y2="50" stroke="#D97706" strokeWidth="2"/>
                              <path d="M20 10 Q35 10 55 35 Q35 60 20 60 Q30 35 20 10" fill="none" stroke="#D97706" strokeWidth="2"/>
                              <path d="M20 10 L55 10" fill="none" stroke="none"/>
                              <path d="M55 10 Q80 15 85 35 Q80 55 55 60" fill="none" stroke="#D97706" strokeWidth="2"/>
                              <path d="M20,10 Q45,10 55,10" fill="none" stroke="#D97706" strokeWidth="0"/>
                              <line x1="85" y1="35" x2="105" y2="35" stroke="#D97706" strokeWidth="2"/>
                              <text x="2" y="18" fontSize="8" fill="#64748B">A</text>
                              <text x="2" y="53" fontSize="8" fill="#64748B">B</text>
                              <text x="91" y="38" fontSize="8" fill="#64748B">Y</text>
                            </svg>
                          )}
                          {gate.id === "NAND" && (
                            <svg viewBox="0 0 120 70" className="h-12 w-28">
                              <line x1="5" y1="20" x2="25" y2="20" stroke="#4F46E5" strokeWidth="2"/>
                              <line x1="5" y1="50" x2="25" y2="50" stroke="#4F46E5" strokeWidth="2"/>
                              <line x1="25" y1="10" x2="25" y2="60" stroke="#4F46E5" strokeWidth="2"/>
                              <line x1="25" y1="10" x2="55" y2="10" stroke="#4F46E5" strokeWidth="2"/>
                              <line x1="25" y1="60" x2="55" y2="60" stroke="#4F46E5" strokeWidth="2"/>
                              <path d="M55 10 Q85 10 85 35 Q85 60 55 60" fill="none" stroke="#4F46E5" strokeWidth="2"/>
                              <circle cx="90" cy="35" r="5" fill="none" stroke="#4F46E5" strokeWidth="2"/>
                              <line x1="95" y1="35" x2="115" y2="35" stroke="#4F46E5" strokeWidth="2"/>
                              <text x="2" y="18" fontSize="8" fill="#64748B">A</text>
                              <text x="2" y="53" fontSize="8" fill="#64748B">B</text>
                              <text x="101" y="38" fontSize="8" fill="#64748B">Y</text>
                            </svg>
                          )}
                          {gate.id === "NOR" && (
                            <svg viewBox="0 0 120 70" className="h-12 w-28">
                              <line x1="5" y1="20" x2="22" y2="20" stroke="#4F46E5" strokeWidth="2"/>
                              <line x1="5" y1="50" x2="22" y2="50" stroke="#4F46E5" strokeWidth="2"/>
                              <path d="M18 10 Q33 10 53 35 Q33 60 18 60 Q28 35 18 10" fill="none" stroke="#4F46E5" strokeWidth="2"/>
                              <path d="M53 10 Q78 15 83 35 Q78 55 53 60" fill="none" stroke="#4F46E5" strokeWidth="2"/>
                              <circle cx="88" cy="35" r="5" fill="none" stroke="#4F46E5" strokeWidth="2"/>
                              <line x1="93" y1="35" x2="115" y2="35" stroke="#4F46E5" strokeWidth="2"/>
                              <text x="2" y="18" fontSize="8" fill="#64748B">A</text>
                              <text x="2" y="53" fontSize="8" fill="#64748B">B</text>
                              <text x="99" y="38" fontSize="8" fill="#64748B">Y</text>
                            </svg>
                          )}
                          {gate.id === "XOR" && (
                            <svg viewBox="0 0 120 70" className="h-12 w-28">
                              <line x1="5" y1="20" x2="26" y2="20" stroke="#D97706" strokeWidth="2"/>
                              <line x1="5" y1="50" x2="26" y2="50" stroke="#D97706" strokeWidth="2"/>
                              <path d="M14 10 Q22 35 14 60" fill="none" stroke="#D97706" strokeWidth="2"/>
                              <path d="M20 10 Q35 10 55 35 Q35 60 20 60 Q30 35 20 10" fill="none" stroke="#D97706" strokeWidth="2"/>
                              <path d="M55 10 Q80 15 85 35 Q80 55 55 60" fill="none" stroke="#D97706" strokeWidth="2"/>
                              <line x1="85" y1="35" x2="115" y2="35" stroke="#D97706" strokeWidth="2"/>
                              <text x="2" y="18" fontSize="8" fill="#64748B">A</text>
                              <text x="2" y="53" fontSize="8" fill="#64748B">B</text>
                              <text x="100" y="38" fontSize="8" fill="#64748B">Y</text>
                            </svg>
                          )}
                          {gate.id === "XNOR" && (
                            <svg viewBox="0 0 130 70" className="h-12 w-32">
                              <line x1="5" y1="20" x2="26" y2="20" stroke="#D97706" strokeWidth="2"/>
                              <line x1="5" y1="50" x2="26" y2="50" stroke="#D97706" strokeWidth="2"/>
                              <path d="M14 10 Q22 35 14 60" fill="none" stroke="#D97706" strokeWidth="2"/>
                              <path d="M20 10 Q35 10 55 35 Q35 60 20 60 Q30 35 20 10" fill="none" stroke="#D97706" strokeWidth="2"/>
                              <path d="M55 10 Q80 15 85 35 Q80 55 55 60" fill="none" stroke="#D97706" strokeWidth="2"/>
                              <circle cx="90" cy="35" r="5" fill="none" stroke="#D97706" strokeWidth="2"/>
                              <line x1="95" y1="35" x2="125" y2="35" stroke="#D97706" strokeWidth="2"/>
                              <text x="2" y="18" fontSize="8" fill="#64748B">A</text>
                              <text x="2" y="53" fontSize="8" fill="#64748B">B</text>
                              <text x="110" y="38" fontSize="8" fill="#64748B">Y</text>
                            </svg>
                          )}
                        </div>

                        {/* Boolean Expression */}
                        <div className="p-2 rounded-lg bg-white border border-[#DCE7E1] text-xs font-mono text-center font-bold text-[#1E293B]">
                          {gate.expression}
                        </div>

                        {/* Truth Table */}
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs text-center border-collapse font-mono">
                            <thead>
                              <tr className="bg-white border-b border-[#DCE7E1]">
                                {gate.inputs === 2 ? (
                                  <>
                                    <th className="py-1 px-2 font-bold text-[#1E293B]">A</th>
                                    <th className="py-1 px-2 font-bold text-[#1E293B]">B</th>
                                  </>
                                ) : (
                                  <th className="py-1 px-2 font-bold text-[#1E293B]">A</th>
                                )}
                                <th className="py-1 px-2 font-bold text-[#2E6F40]">Y</th>
                              </tr>
                            </thead>
                            <tbody>
                              {gate.truthTable.map((row, ri) => (
                                <tr key={ri} className={row.y === "1" ? "bg-[#F2F7F4]" : ""}>
                                  {gate.inputs === 2 ? (
                                    <>
                                      <td className="py-1 px-2 font-bold">{row.a}</td>
                                      <td className="py-1 px-2 font-bold">{row.b}</td>
                                    </>
                                  ) : (
                                    <td className="py-1 px-2 font-bold">{row.a}</td>
                                  )}
                                  <td className={`py-1 px-2 font-bold ${row.y === "1" ? "text-[#2E6F40]" : "text-[#DC2626]"}`}>{row.y}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Bullet info */}
                        <div className="space-y-1.5 text-[10px] text-[#64748B] flex-1">
                          <div className="flex items-start gap-1.5"><span className="w-1 h-1 rounded-full bg-[#64748B] flex-shrink-0 mt-1.5"/><span><strong>Rule:</strong> {gate.rule}</span></div>
                          <div className="flex items-start gap-1.5"><span className="w-1 h-1 rounded-full bg-[#64748B] flex-shrink-0 mt-1.5"/><span><strong>Switch:</strong> {gate.switchAnalogy}</span></div>
                          <div className="flex items-start gap-1.5"><span className="w-1 h-1 rounded-full bg-[#64748B] flex-shrink-0 mt-1.5"/><span><strong>Timing:</strong> {gate.timingNote}</span></div>
                          {gate.universalReason && (
                            <div className="flex items-start gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-[#4F46E5] flex-shrink-0 mt-1.5"/>
                              <span className="text-[#4F46E5]"><strong>Universal:</strong> {gate.universalReason}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PART B: Universal Gate Realizations */}
          {section.universalGateRealizations && (
            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase text-[#4F46E5] bg-[#EEF2FF] px-2 py-0.5 rounded">Part B</span>
                <h2 className="text-lg font-bold text-[#1E293B]">Why NAND and NOR Are Called "Universal Gates"</h2>
              </div>
              <p className="text-xs text-[#475569]">This is a classic 10-mark university exam question. Both NAND and NOR are individually <strong>functionally complete</strong>: any Boolean logic circuit can be built using ONLY one type of universal gate.</p>

              {/* Summary Count Table */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase text-[#2E6F40]">Minimum Universal Gate Count Reference Table (Classic Exam Table)</h3>
                <div className="overflow-x-auto border border-[#DCE7E1] rounded-xl">
                  <table className="w-full text-xs text-center border-collapse font-mono">
                    <thead>
                      <tr className="bg-[#F2F7F4] border-b border-[#DCE7E1]">
                        <th className="py-2.5 px-4 font-bold text-[#1E293B]">Target Gate</th>
                        <th className="py-2.5 px-4 font-bold text-[#4F46E5]">NAND Gates Required</th>
                        <th className="py-2.5 px-4 font-bold text-[#2E6F40]">NOR Gates Required</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F2F7F4]">
                      {section.universalGateRealizations.universalGateSummaryTable.map((r, i) => (
                        <tr key={i} className="hover:bg-[#FAF8F5]/60">
                          <td className="py-2 px-4 font-bold text-[#1E293B]">{r.targetGate}</td>
                          <td className="py-2 px-4 text-[#4F46E5] font-bold">{r.nandCount}</td>
                          <td className="py-2 px-4 text-[#2E6F40] font-bold">{r.norCount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* NAND Realizations */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono font-bold uppercase text-[#4F46E5]">Realizing All Gates from NAND Only</h3>
                  <div className="space-y-2">
                    {section.universalGateRealizations.nandRealizations.map((r, i) => (
                      <div key={i} className="p-3 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#4F46E5] text-white flex items-center justify-center font-mono text-[9px] font-bold">{r.gateCount}</span>
                          <span className="text-xs font-bold text-[#1E293B]">{r.gate}</span>
                        </div>
                        <p className="text-[11px] text-[#475569] leading-relaxed">{r.derivation}</p>
                        <code className="text-[10px] font-mono text-[#4F46E5] block bg-white px-2 py-1 rounded border border-[#DCE7E1]">{r.algebraicProof}</code>
                      </div>
                    ))}
                  </div>
                </div>

                {/* NOR Realizations */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono font-bold uppercase text-[#2E6F40]">Realizing All Gates from NOR Only</h3>
                  <div className="space-y-2">
                    {section.universalGateRealizations.norRealizations.map((r, i) => (
                      <div key={i} className="p-3 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#2E6F40] text-white flex items-center justify-center font-mono text-[9px] font-bold">{r.gateCount}</span>
                          <span className="text-xs font-bold text-[#1E293B]">{r.gate}</span>
                        </div>
                        <p className="text-[11px] text-[#475569] leading-relaxed">{r.derivation}</p>
                        <code className="text-[10px] font-mono text-[#2E6F40] block bg-white px-2 py-1 rounded border border-[#DCE7E1]">{r.algebraicProof}</code>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PART C: Worked Examples */}
          {section.workedExamples && (
            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase text-[#D97706] bg-[#FFFBEB] px-2 py-0.5 rounded">Part C</span>
                <h2 className="text-lg font-bold text-[#1E293B]">Worked Examples: Gate Evaluation, Timing, Enable/Inhibit, and Proofs</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.workedExamples.map((ex, i) => (
                  <div key={i} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#4F46E5] block">{ex.label}</span>
                    <div className="p-2 rounded-lg bg-white border border-[#DCE7E1] text-xs">
                      <span className="font-bold text-[#1E293B]">Problem: </span>
                      <span className="text-[#475569]">{ex.problem}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-white border border-[#DCE7E1] font-mono text-[11px] text-[#334155] space-y-0.5">
                      {ex.steps.map((st, si) => (
                        <div key={si} className={
                          st.includes("VERIFIED") || st.includes("verified") ? "text-[#2E6F40] font-bold" :
                          st.startsWith("Final") || st.startsWith("Therefore") ? "text-[#2E6F40] font-bold border-t border-[#DCE7E1] pt-1 mt-1" : ""
                        }>{st}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PART D: Logic Gates Cheat Sheet */}
          {section.cheatSheet && (
            <div className="p-6 rounded-2xl bg-white border-2 border-[#4F46E5]/30 shadow-soft space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase text-[#4F46E5] bg-[#EEF2FF] px-2 py-0.5 rounded">Part D</span>
                <h2 className="text-lg font-bold text-[#1E293B]">{section.cheatSheet.title}</h2>
              </div>
              <div className="overflow-x-auto border border-[#DCE7E1] rounded-xl">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-[#FAF8F5] border-b border-[#DCE7E1] font-mono">
                      <th className="py-2.5 px-3 font-bold text-[#1E293B]">Gate</th>
                      <th className="py-2.5 px-3 font-bold text-[#1E293B]">Expression</th>
                      <th className="py-2.5 px-3 font-bold text-[#1E293B]">IC</th>
                      <th className="py-2.5 px-3 font-bold text-[#2E6F40]">Output HIGH When</th>
                      <th className="py-2.5 px-3 font-bold text-[#DC2626]">Output LOW When</th>
                      <th className="py-2.5 px-3 font-bold text-[#4F46E5]">Universal?</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2F7F4]">
                    {section.cheatSheet.gateRows.map((r, i) => (
                      <tr key={i} className="hover:bg-[#FAF8F5]/60">
                        <td className="py-2 px-3 font-bold text-[#1E293B] font-mono">{r.gate}</td>
                        <td className="py-2 px-3 font-mono text-[11px] text-[#475569]">{r.symbol}</td>
                        <td className="py-2 px-3 font-mono text-[#64748B]">{r.ic}</td>
                        <td className="py-2 px-3 text-[#16A34A] font-medium text-[11px]">{r.highWhen}</td>
                        <td className="py-2 px-3 text-[#DC2626] font-medium text-[11px]">{r.lowWhen}</td>
                        <td className={`py-2 px-3 font-bold text-center ${r.universal === 'YES' ? 'text-[#4F46E5]' : 'text-[#64748B]'}`}>{r.universal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="space-y-2 pt-3 border-t border-[#DCE7E1]">
                <h3 className="text-xs font-mono font-bold uppercase text-[#2E6F40]">Key Facts and Exam Reminders</h3>
                <ul className="space-y-1.5">
                  {section.cheatSheet.keyFacts.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#475569]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] flex-shrink-0 mt-1.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* PRACTICE QUESTIONS & CURATED VIDEO SECTION (SHOWN ACROSS ALL SECTIONS)    */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Practice Questions (7 cols, hidden for Section 1.3 as it has the Comprehensive Challenge) */}
        {section.id !== "1.3" && section.practiceQuestions && (
          <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#2E6F40]" />
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1E293B]">
                  Quick Check Practice Problems
                </h3>
              </div>
              <span className="text-[11px] font-mono text-[#64748B]">
                {section.practiceQuestions.length} Questions
              </span>
            </div>

            <div className="space-y-2.5">
              {section.practiceQuestions.map((pq, idx) => {
                const isRevealed = revealedQuestions[idx];
                return (
                  <div key={idx} className="p-3 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                    <div 
                      onClick={() => toggleQuestion(idx)}
                      className="flex items-start justify-between gap-3 cursor-pointer select-none"
                    >
                      <div className="flex items-start gap-2">
                        <span className="font-mono text-xs font-bold text-[#2E6F40] mt-0.5">Q{idx + 1}.</span>
                        <p className="text-xs font-medium text-[#1E293B] leading-relaxed">{pq.q}</p>
                      </div>
                      <span className="text-[#64748B] hover:text-[#1E293B] transition-colors p-1">
                        {isRevealed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </span>
                    </div>

                    {isRevealed && (
                      <div className="pt-2 border-t border-[#DCE7E1] text-xs text-[#2E6F40] bg-[#F2F7F4]/50 p-2.5 rounded-lg font-mono">
                        <span className="font-bold text-[#1E293B] block mb-1">Answer / Working:</span>
                        <p className="whitespace-pre-line leading-relaxed">{pq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Curated YouTube Video Card (5 cols or 12 cols for 1.3 / 1.4) */}
        {section.youtubeResource && (
          <div className={`${(section.id === "1.3" || section.id === "1.4") ? "lg:col-span-12" : "lg:col-span-5"} p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4`}>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#DC2626]">
              <Video className="w-4 h-4" />
              <span>Curated Video Lecture</span>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3">
              <div>
                <span className="text-[10px] font-mono text-[#64748B] uppercase block">
                  {section.youtubeResource.channel} · {section.youtubeResource.duration}
                </span>
                <h4 className="text-sm font-bold text-[#1E293B] mt-0.5">
                  {section.youtubeResource.title}
                </h4>
              </div>

              <p className="text-xs text-[#475569] leading-relaxed">
                {section.youtubeResource.topicsCovered}
              </p>

              <a
                href={section.youtubeResource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold shadow-sm transition-all"
              >
                <Video className="w-4 h-4" />
                <span>Watch on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>

              {section.youtubeResource.secondaryUrl && (
                <a
                  href={section.youtubeResource.secondaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 p-2 rounded-lg bg-white hover:bg-[#FEE2E2] text-[#DC2626] border border-[#FCA5A5] text-xs font-semibold shadow-2xs transition-all mt-2"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>{section.youtubeResource.secondaryTitle || "Supplementary Deep Dive"}</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              )}
            </div>
          </div>
        )}

      </div>

    </article>
  );
};

export default UnitWorkspace;
