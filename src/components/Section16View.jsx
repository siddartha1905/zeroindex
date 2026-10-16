import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Cpu, 
  ArrowRight,
  BookOpen,
  Sparkles,
  HelpCircle,
  Layers,
  ShieldCheck,
  Eye,
  EyeOff,
  Binary,
  Hash,
  CornerDownRight,
  Calculator,
  Zap,
  Info
} from 'lucide-react';
import { 
  Register8BitStrip, 
  StackedSignedTransformationCard,
  LeadingZeroMisconceptionCard,
  OperandPrepCard,
  BitAlignedSignedAdditionGrid, 
  OverflowDetectorDiagram, 
  SignExtensionVisualizer, 
  FourBitMasterTable,
  ClassroomFlowchart3StepsSigned 
} from './Section16Components';

/**
 * Section 1.6: Signed Binary Numbers (Representation of Positive and Negative Numbers)
 * Full 6-Tab View
 * Strict formatting: ZERO em-dashes (\u2014) and ZERO en-dashes (\u2013).
 */
export const Section16View = ({ section }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [subTab16A, setSubTab16A] = useState("twos");
  const [activeMixedFilter, setActiveMixedFilter] = useState("all");
  const [revealedSolutions, setRevealedSolutions] = useState({});

  const toggleSolution = (id) => {
    setRevealedSolutions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const mixedQuestions = section.mixedPracticeQuestions || [];
  const filteredMixedQuestions = mixedQuestions.filter(q => {
    if (activeMixedFilter === "all") return true;
    return q.difficulty.toLowerCase() === activeMixedFilter.toLowerCase();
  });

  return (
    <div className="space-y-8">
      {/* ===================================================================== */}
      {/* SECTION 1.6 TOP 6-TAB NAVIGATION BAR                                  */}
      {/* ===================================================================== */}
      <div className="p-4 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E6F40]">
            Signed Binary Interactive Engineering Track
          </span>
          <span className="text-xs text-[#64748B]">Select a Module or Arena:</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`p-2.5 rounded-xl text-xs font-mono font-bold transition-all text-center ${
              activeTab === "overview"
                ? 'bg-[#2E6F40] text-white shadow-sm'
                : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]'
            }`}
          >
            Overview &amp; Sign Bit
          </button>
          <button
            onClick={() => setActiveTab("1.6A")}
            className={`p-2.5 rounded-xl text-xs font-mono font-bold transition-all text-center ${
              activeTab === "1.6A"
                ? 'bg-[#2E6F40] text-white shadow-sm'
                : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]'
            }`}
          >
            1.6A: 3 Signed Forms
          </button>
          <button
            onClick={() => setActiveTab("1.6B")}
            className={`p-2.5 rounded-xl text-xs font-mono font-bold transition-all text-center ${
              activeTab === "1.6B"
                ? 'bg-[#2E6F40] text-white shadow-sm'
                : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]'
            }`}
          >
            1.6B: Signed 2's Add
          </button>
          <button
            onClick={() => setActiveTab("1.6C")}
            className={`p-2.5 rounded-xl text-xs font-mono font-bold transition-all text-center ${
              activeTab === "1.6C"
                ? 'bg-[#2E6F40] text-white shadow-sm'
                : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]'
            }`}
          >
            1.6C: Overflow &amp; Ext
          </button>
          <button
            onClick={() => setActiveTab("cheat-sheet")}
            className={`p-2.5 rounded-xl text-xs font-mono font-bold transition-all text-center ${
              activeTab === "cheat-sheet"
                ? 'bg-[#2E6F40] text-white shadow-sm'
                : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]'
            }`}
          >
            Cheat Sheet
          </button>
          <button
            onClick={() => setActiveTab("mixed")}
            className={`p-2.5 rounded-xl text-xs font-mono font-bold transition-all text-center ${
              activeTab === "mixed"
                ? 'bg-[#2E6F40] text-white shadow-sm'
                : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]'
            }`}
          >
            Mixed Challenge (15)
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: OVERVIEW & THE SIGN-BIT RULE                                   */}
      {/* ===================================================================== */}
      {activeTab === "overview" && section.overviewSignBit && (
        <div className="space-y-6">
          {/* Header Card */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4 font-mono">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#DCE7E1]">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-[#DCFCE7] border border-[#86EFAC] flex items-center justify-center text-[#15803D]">
                  <Cpu className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-[#1E293B]">{section.overviewSignBit.title}</h3>
                  <span className="text-[11px] text-[#64748B]">{section.overviewSignBit.subtitle}</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] text-[10px] font-bold uppercase text-[#2E6F40]">
                Fundamental Principle
              </span>
            </div>

            {/* Human Paper vs Silicon Hardware */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2 text-xs">
                <span className="font-bold text-[#1E293B] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#D97706]" />
                  Human Convention (Paper Math):
                </span>
                <p className="text-[#475569] leading-relaxed">
                  {section.overviewSignBit.humanVsSilicon.human}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2 text-xs">
                <span className="font-bold text-[#1E293B] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#2E6F40]" />
                  Silicon Reality (Registers &amp; Flip-Flops):
                </span>
                <p className="text-[#475569] leading-relaxed">
                  {section.overviewSignBit.humanVsSilicon.hardware}
                </p>
              </div>
            </div>

            {/* Universal Sign-Bit Convention Rule Box */}
            <div className="p-4 rounded-xl bg-[#EEF2FF] border border-[#C7D2FE] space-y-2 text-xs text-[#3730A3]">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#312E81]">
                  {section.overviewSignBit.universalRule.name}
                </span>
                <span className="px-2 py-0.5 rounded bg-white text-[#4338CA] text-[10px] font-bold border border-[#C7D2FE]">
                  Silicon Standard
                </span>
              </div>
              <p className="text-xs text-[#4338CA] leading-relaxed">
                {section.overviewSignBit.universalRule.rule}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-bold text-center">
                <div className="p-2 rounded-lg bg-white border border-[#C7D2FE] text-[#15803D]">
                  {section.overviewSignBit.universalRule.positiveBit}
                </div>
                <div className="p-2 rounded-lg bg-white border border-[#C7D2FE] text-[#DC2626]">
                  {section.overviewSignBit.universalRule.negativeBit}
                </div>
              </div>
            </div>

            {/* Golden Rule for All Positive Numbers */}
            <div className="p-4 rounded-xl bg-[#F0FDF4] border-2 border-[#86EFAC] flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-xs uppercase tracking-wide text-[#166534] block">
                  The Golden Rule for All Positive Numbers
                </span>
                <p className="text-xs text-[#14532D] leading-relaxed font-semibold">
                  {section.overviewSignBit.universalRule.positiveHighlight}
                </p>
              </div>
            </div>
          </div>

          {/* Graphical Register Comparison: Unsigned vs Signed 8-Bit */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Unsigned Register */}
            <div className="space-y-2 font-mono">
              <Register8BitStrip 
                bits={["1", "1", "1", "1", "1", "1", "1", "1"]}
                mode="unsigned"
                label={section.overviewSignBit.registerComparison.unsigned.title}
                sublabel={section.overviewSignBit.registerComparison.unsigned.bitRange}
                highlightSign={false}
                decodedValue={section.overviewSignBit.registerComparison.unsigned.range8Bit}
              />
              <div className="p-3.5 rounded-xl bg-white border border-[#DCE7E1] text-xs space-y-1">
                <span className="font-bold text-[#1E293B] block">Register Characteristics:</span>
                <div className="text-[#475569]">Weights: {section.overviewSignBit.registerComparison.unsigned.weights}</div>
                <div className="text-[#2E6F40] font-bold">{section.overviewSignBit.registerComparison.unsigned.formula}</div>
                <div className="text-[#64748B] text-[11px]">Distinct States: {section.overviewSignBit.registerComparison.unsigned.distinctValues}</div>
              </div>
            </div>

            {/* Signed Register */}
            <div className="space-y-2 font-mono">
              <Register8BitStrip 
                bits={["1", "0", "0", "0", "0", "0", "0", "0"]}
                mode="twos"
                label={section.overviewSignBit.registerComparison.signed.title}
                sublabel={section.overviewSignBit.registerComparison.signed.bitRange}
                highlightSign={true}
                decodedValue={section.overviewSignBit.registerComparison.signed.range8Bit}
              />
              <div className="p-3.5 rounded-xl bg-white border border-[#DCE7E1] text-xs space-y-1">
                <span className="font-bold text-[#1E293B] block">Register Characteristics:</span>
                <div className="text-[#475569]">Weights: {section.overviewSignBit.registerComparison.signed.weights}</div>
                <div className="text-[#2E6F40] font-bold">{section.overviewSignBit.registerComparison.signed.formula}</div>
                <div className="text-[#64748B] text-[11px]">Distinct States: {section.overviewSignBit.registerComparison.signed.distinctValues}</div>
              </div>
            </div>
          </div>

          {/* Master 4-Bit Table (+7 to -8) */}
          <FourBitMasterTable tableData={section.overviewSignBit.master4BitTable} />
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: 1.6A THE THREE SIGNED REPRESENTATIONS                          */}
      {/* ===================================================================== */}
      {activeTab === "1.6A" && section.threeRepresentations && (
        <div className="space-y-6">
          {/* High-Impact Callout: Leading Zero Rule (Why is b6 = 1 in -45?) */}
          <LeadingZeroMisconceptionCard data={section.threeRepresentations.leadingZeroRule} />

          {/* Inner 3-Tab Switcher */}
          <div className="flex border-b border-[#DCE7E1] gap-4">
            <button
              onClick={() => setSubTab16A("twos")}
              className={`pb-2.5 text-xs font-mono font-bold transition-all relative ${
                subTab16A === "twos"
                  ? "text-[#2E6F40] border-b-2 border-[#2E6F40]"
                  : "text-[#64748B] hover:text-[#1E293B]"
              }`}
            >
              1. Signed 2's Complement (CPU Standard)
            </button>
            <button
              onClick={() => setSubTab16A("signmag")}
              className={`pb-2.5 text-xs font-mono font-bold transition-all relative ${
                subTab16A === "signmag"
                  ? "text-[#2E6F40] border-b-2 border-[#2E6F40]"
                  : "text-[#64748B] hover:text-[#1E293B]"
              }`}
            >
              2. Sign-Magnitude Form
            </button>
            <button
              onClick={() => setSubTab16A("ones")}
              className={`pb-2.5 text-xs font-mono font-bold transition-all relative ${
                subTab16A === "ones"
                  ? "text-[#2E6F40] border-b-2 border-[#2E6F40]"
                  : "text-[#64748B] hover:text-[#1E293B]"
              }`}
            >
              3. Signed 1's Complement Form
            </button>
          </div>

          {/* SUB-TAB 1: SIGNED 2's COMPLEMENT (CPU STANDARD) */}
          {subTab16A === "twos" && section.threeRepresentations.signedTwos && (
            <div className="space-y-6">
              {/* Stage 1: Mathematical Definition & Populated Formula Box */}
              <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-5 font-mono">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#DCE7E1]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2E6F40] flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#2E6F40]" />
                    {section.threeRepresentations.signedTwos.stage1.title}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#DCFCE7] text-[#15803D] border border-[#86EFAC]">
                    Universal CPU Standard
                  </span>
                </div>

                {/* Populated Formula Boxes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Range Box */}
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                    <span className="text-[11px] font-bold text-[#64748B] uppercase block">
                      Range Formula (n-bit register):
                    </span>
                    <div className="p-3 rounded-lg bg-white border border-[#CBD5E1] text-[#1E293B] font-mono text-sm font-bold shadow-2xs">
                      Range = -2<sup>n-1</sup> to +(2<sup>n-1</sup> - 1)
                    </div>
                    <div className="text-xs text-[#2E6F40] font-bold pt-1">
                      For 8 Bits (n = 8): {section.threeRepresentations.signedTwos.stage1.range8Bit}
                    </div>
                    <span className="text-[11px] text-[#64748B] block">
                      Notice: -128 is supported, while +128 cannot fit!
                    </span>
                  </div>

                  {/* Negative MSB Weight Formula Box */}
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                    <span className="text-[11px] font-bold text-[#64748B] uppercase block">
                      Negative MSB Weight Formula:
                    </span>
                    <div className="p-3 rounded-lg bg-white border border-[#CBD5E1] text-[#1E293B] font-mono text-sm font-bold shadow-2xs">
                      V = -b<sub>n-1</sub> · 2<sup>n-1</sup> + &sum;<sub>i=0</sub><sup>n-2</sup> b<sub>i</sub> · 2<sup>i</sup>
                    </div>
                    <div className="text-xs text-[#4F46E5] font-bold pt-1">
                      b7 carries weight -128, while b6..b0 carry +64, +32, ..., +1
                    </div>
                    <span className="text-[11px] text-[#64748B] block">
                      Zero Representation: {section.threeRepresentations.signedTwos.stage1.zeroRepresentation}
                    </span>
                  </div>
                </div>

                {/* Variable Legend */}
                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2 text-xs">
                  <span className="text-[10px] font-bold uppercase text-[#64748B] block">
                    Register Mathematical Variables:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {section.threeRepresentations.signedTwos.stage1.variables.map((v, i) => (
                      <div key={i} className="p-2 rounded-lg bg-white border border-[#DCE7E1] flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-[#EEF2FF] text-[#4F46E5] font-black border border-[#C7D2FE] text-[11px]">
                          {v.symbol}
                        </span>
                        <span className="text-[#334155] text-[11px]">{v.meaning}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stage 2: Standard Classroom Flowchart */}
              <ClassroomFlowchart3StepsSigned stageData={section.threeRepresentations.signedTwos.stage2} />

              {/* Stage 3: The 3-Second Shortcut */}
              <div className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-3 font-mono">
                <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#4F46E5]" />
                    {section.threeRepresentations.signedTwos.stage3.title}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]">
                    Exam Speed Hack
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#EEF2FF] border border-[#C7D2FE] space-y-1 text-xs">
                  <strong className="text-[#3730A3] block">Negative MSB Weight Rule:</strong>
                  <p className="text-[#4338CA] leading-relaxed">
                    {section.threeRepresentations.signedTwos.stage3.rule}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] text-xs text-[#475569]">
                  <strong className="text-[#1E293B]">Why it works in Silicon: </strong>
                  <span>{section.threeRepresentations.signedTwos.stage3.whyItWorks}</span>
                </div>
              </div>

              {/* 4 Worked Models for 2's Complement */}
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E6F40]">
                    Worked Engineering Models: Signed 2's Complement
                  </h4>
                  <span className="text-[10px] font-mono text-[#64748B]">
                    Question &rarr; Stacked Registers &rarr; Derivation &rarr; Verification
                  </span>
                </div>

                {section.threeRepresentations.signedTwos.models.map((model) => (
                  model.posBits && model.negBits ? (
                    <StackedSignedTransformationCard key={model.id} model={model} scheme="twos" />
                  ) : (
                    <div key={model.id} className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4 font-mono">
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#DCE7E1]">
                        <span className="text-xs font-bold text-[#1E293B] flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#2E6F40]" />
                          {model.question}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]">
                          {model.conceptTag}
                        </span>
                      </div>

                      <Register8BitStrip 
                        bits={model.registerBits}
                        mode="twos"
                        label="8-Bit Register Layout"
                        sublabel={model.finalValue}
                        highlightSign={true}
                        decodedValue={model.finalValue}
                      />

                      <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2 text-xs">
                        <span className="text-[10px] font-bold uppercase text-[#64748B] block">
                          Step-by-Step Silicon Derivation:
                        </span>
                        {model.stepByStep.map((st, i) => (
                          <div key={i} className="text-[#334155] leading-relaxed">
                            {st}
                          </div>
                        ))}
                      </div>

                      <div className="p-3 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center gap-2.5 text-xs text-[#166534]">
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-[#16A34A]" />
                        <div>
                          <strong className="font-bold">5-Second Verification: </strong>
                          <span>{model.verification}</span>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* SUB-TAB 2: SIGN-MAGNITUDE FORM */}
          {subTab16A === "signmag" && section.threeRepresentations.signMagnitude && (
            <div className="space-y-6">
              {/* Stage 1: Mathematical Definition */}
              <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-5 font-mono">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#DCE7E1]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D97706] flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#D97706]" />
                    {section.threeRepresentations.signMagnitude.stage1.title}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FEF3C7] text-[#92400E] border border-[#FCD34D]">
                    Sign-Magnitude
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                    <span className="text-[11px] font-bold text-[#64748B] uppercase block">
                      Range Formula (n-bit register):
                    </span>
                    <div className="p-3 rounded-lg bg-white border border-[#CBD5E1] text-[#1E293B] font-mono text-sm font-bold shadow-2xs">
                      Range = -(2<sup>n-1</sup> - 1) to +(2<sup>n-1</sup> - 1)
                    </div>
                    <div className="text-xs text-[#D97706] font-bold pt-1">
                      For 8 Bits (n = 8): {section.threeRepresentations.signMagnitude.stage1.range8Bit}
                    </div>
                    <span className="text-[11px] text-[#64748B] block">
                      Zero Representation: {section.threeRepresentations.signMagnitude.stage1.zeroRepresentation}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                    <span className="text-[11px] font-bold text-[#64748B] uppercase block">
                      Value Calculation Formula:
                    </span>
                    <div className="p-3 rounded-lg bg-white border border-[#CBD5E1] text-[#1E293B] font-mono text-sm font-bold shadow-2xs">
                      V = (-1)<sup>b<sub>n-1</sub></sup> &times; &sum;<sub>i=0</sub><sup>n-2</sup> b<sub>i</sub> · 2<sup>i</sup>
                    </div>
                    <div className="text-xs text-[#4F46E5] font-bold pt-1">
                      b7 is pure sign (0 = +, 1 = -); b6..b0 represent absolute magnitude |N|
                    </div>
                  </div>
                </div>
              </div>

              {/* Stage 2 Flowchart */}
              <ClassroomFlowchart3StepsSigned stageData={section.threeRepresentations.signMagnitude.stage2} />

              {/* Stage 3 Shortcut & Hardware Drawback */}
              <div className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-3 font-mono">
                <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5] block">
                  {section.threeRepresentations.signMagnitude.stage3.title}
                </span>
                <p className="text-xs text-[#334155] leading-relaxed">
                  {section.threeRepresentations.signMagnitude.stage3.rule}
                </p>
                <div className="p-3 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] text-xs text-[#991B1B]">
                  <strong>Hardware Drawback: </strong>
                  <span>{section.threeRepresentations.signMagnitude.stage3.drawback}</span>
                </div>
              </div>

              {/* 4 Worked Models for Sign-Magnitude */}
              <div className="space-y-6">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E6F40]">
                  Worked Engineering Models: Sign-Magnitude
                </h4>
                {section.threeRepresentations.signMagnitude.models.map((model) => (
                  model.posBits && model.negBits ? (
                    <StackedSignedTransformationCard key={model.id} model={model} scheme="signmag" />
                  ) : (
                    <div key={model.id} className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4 font-mono">
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#DCE7E1]">
                        <span className="text-xs font-bold text-[#1E293B] flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#D97706]" />
                          {model.question}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#FEF3C7] text-[#92400E] border border-[#FCD34D]">
                          {model.conceptTag}
                        </span>
                      </div>

                      <Register8BitStrip 
                        bits={model.registerBits}
                        mode="signmag"
                        label="Sign-Magnitude Register"
                        sublabel={model.finalValue}
                        highlightSign={true}
                        decodedValue={model.finalValue}
                      />

                      <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2 text-xs">
                        <span className="text-[10px] font-bold uppercase text-[#64748B] block">
                          Derivation Steps:
                        </span>
                        {model.stepByStep.map((st, i) => (
                          <div key={i} className="text-[#334155] leading-relaxed">{st}</div>
                        ))}
                      </div>

                      <div className="p-3 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center gap-2.5 text-xs text-[#166534]">
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-[#16A34A]" />
                        <span>{model.verification}</span>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* SUB-TAB 3: SIGNED 1's COMPLEMENT FORM */}
          {subTab16A === "ones" && section.threeRepresentations.signedOnes && (
            <div className="space-y-6">
              {/* Stage 1: Mathematical Definition */}
              <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-5 font-mono">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#DCE7E1]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5] flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#4F46E5]" />
                    {section.threeRepresentations.signedOnes.stage1.title}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]">
                    Signed 1's Complement
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                    <span className="text-[11px] font-bold text-[#64748B] uppercase block">
                      Range Formula (n-bit register):
                    </span>
                    <div className="p-3 rounded-lg bg-white border border-[#CBD5E1] text-[#1E293B] font-mono text-sm font-bold shadow-2xs">
                      Range = -(2<sup>n-1</sup> - 1) to +(2<sup>n-1</sup> - 1)
                    </div>
                    <div className="text-xs text-[#4F46E5] font-bold pt-1">
                      For 8 Bits (n = 8): {section.threeRepresentations.signedOnes.stage1.range8Bit}
                    </div>
                    <span className="text-[11px] text-[#64748B] block">
                      Zero Representation: {section.threeRepresentations.signedOnes.stage1.zeroRepresentation}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                    <span className="text-[11px] font-bold text-[#64748B] uppercase block">
                      Value Formula:
                    </span>
                    <div className="p-3 rounded-lg bg-white border border-[#CBD5E1] text-[#1E293B] font-mono text-sm font-bold shadow-2xs">
                      V = -b<sub>n-1</sub>(2<sup>n-1</sup> - 1) + &sum;<sub>i=0</sub><sup>n-2</sup> b<sub>i</sub> · 2<sup>i</sup>
                    </div>
                    <div className="text-xs text-[#4F46E5] font-bold pt-1">
                      b7 carries weight -127; bit inversion for negative numbers
                    </div>
                  </div>
                </div>
              </div>

              {/* Stage 2 Flowchart */}
              <ClassroomFlowchart3StepsSigned stageData={section.threeRepresentations.signedOnes.stage2} />

              {/* 4 Worked Models for 1's Complement */}
              <div className="space-y-6">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E6F40]">
                  Worked Engineering Models: Signed 1's Complement
                </h4>
                {section.threeRepresentations.signedOnes.models.map((model) => (
                  model.posBits && model.negBits ? (
                    <StackedSignedTransformationCard key={model.id} model={model} scheme="ones" />
                  ) : (
                    <div key={model.id} className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4 font-mono">
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#DCE7E1]">
                        <span className="text-xs font-bold text-[#1E293B] flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#4F46E5]" />
                          {model.question}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]">
                          {model.conceptTag}
                        </span>
                      </div>

                      <Register8BitStrip 
                        bits={model.registerBits}
                        mode="ones"
                        label="1's Complement Register"
                        sublabel={model.finalValue}
                        highlightSign={true}
                        decodedValue={model.finalValue}
                      />

                      <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2 text-xs">
                        <span className="text-[10px] font-bold uppercase text-[#64748B] block">
                          Derivation Steps:
                        </span>
                        {model.stepByStep.map((st, i) => (
                          <div key={i} className="text-[#334155] leading-relaxed">{st}</div>
                        ))}
                      </div>

                      <div className="p-3 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center gap-2.5 text-xs text-[#166534]">
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-[#16A34A]" />
                        <span>{model.verification}</span>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Targeted Practice Set for 1.6A */}
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E6F40]">
                Targeted Practice Set: 3 Signed Representations
              </span>
              <span className="text-[10px] font-mono text-[#64748B]">6 Graded Problems</span>
            </div>

            <div className="space-y-3">
              {section.threeRepresentations.practiceQuestions.map((q) => (
                <div key={q.id} className="p-4 rounded-xl bg-white border border-[#DCE7E1] space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-[#1E293B]">{q.question}</span>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FAF8F5] text-[#64748B] border border-[#DCE7E1]">
                        {q.difficulty}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]">
                        {q.conceptTag}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleSolution(q.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#2E6F40] hover:text-[#1F4A2B]"
                  >
                    {revealedSolutions[q.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{revealedSolutions[q.id] ? "Hide Solution" : "Reveal Graphical Solution"}</span>
                  </button>

                  {revealedSolutions[q.id] && (
                    <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2 font-mono text-xs">
                      {q.solution.steps.map((st, sIdx) => (
                        <div key={sIdx} className="text-[#334155]">{st}</div>
                      ))}
                      <div className="pt-2 border-t border-[#DCE7E1] font-bold text-[#1E293B]">
                        Answer: {q.solution.final}
                      </div>
                      <div className="flex items-center gap-2 text-[#166534] pt-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verification: {q.solution.verification}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: 1.6B SIGNED 2'S COMPLEMENT ARITHMETIC (4 CASES)                */}
      {/* ===================================================================== */}
      {activeTab === "1.6B" && section.signedArithmetic && (
        <div className="space-y-6">
          {/* Hardware Blueprint Card */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-3 font-mono">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#DCE7E1]">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-[#DCFCE7] border border-[#86EFAC] flex items-center justify-center text-[#15803D]">
                  <Cpu className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-[#1E293B]">{section.signedArithmetic.title}</h3>
                  <span className="text-[11px] text-[#64748B]">{section.signedArithmetic.subtitle}</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] text-[10px] font-bold uppercase text-[#2E6F40]">
                Unified ALU Architecture
              </span>
            </div>

            <p className="text-xs text-[#475569] leading-relaxed">
              {section.signedArithmetic.hardwarePrinciple}
            </p>
          </div>

          {/* 4 Complete Full-Width Worked Models */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E6F40]">
                The Four Sign Combination Models (Classic CPU Addition)
              </h4>
              <span className="text-[10px] font-mono text-[#64748B]">All 4 Sign Cases</span>
            </div>

            {section.signedArithmetic.fourCases.map((cs) => (
              <div key={cs.id} className="space-y-3 font-mono">
                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1E293B]">{cs.label}</span>
                  <span className="text-[#2E6F40] font-bold">{cs.example}</span>
                </div>

                {/* Step 1: 8-Bit Operand Preparation */}
                {cs.model.operandPrep && (
                  <OperandPrepCard operandPrep={cs.model.operandPrep} />
                )}

                {/* Addition Grid */}
                <BitAlignedSignedAdditionGrid model={cs.model} />

                {/* Step-by-Step Derivation */}
                <div className="p-4 rounded-xl bg-white border border-[#DCE7E1] space-y-2 text-xs">
                  <span className="text-[10px] font-bold uppercase text-[#64748B] block">
                    Execution Steps:
                  </span>
                  {cs.model.stepByStep.map((st, i) => (
                    <div key={i} className="text-[#334155] leading-relaxed">{st}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Targeted Practice Set for 1.6B */}
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E6F40]">
                Targeted Practice Set: 2's Complement Addition
              </span>
              <span className="text-[10px] font-mono text-[#64748B]">6 Graded Problems</span>
            </div>

            <div className="space-y-3">
              {section.signedArithmetic.practiceQuestions.map((q) => (
                <div key={q.id} className="p-4 rounded-xl bg-white border border-[#DCE7E1] space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-[#1E293B]">{q.question}</span>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FAF8F5] text-[#64748B] border border-[#DCE7E1]">
                        {q.difficulty}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]">
                        {q.conceptTag}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleSolution(q.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#2E6F40] hover:text-[#1F4A2B]"
                  >
                    {revealedSolutions[q.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{revealedSolutions[q.id] ? "Hide Solution" : "Reveal Graphical Solution"}</span>
                  </button>

                  {revealedSolutions[q.id] && (
                    <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2 font-mono text-xs">
                      {q.solution.steps.map((st, sIdx) => (
                        <div key={sIdx} className="text-[#334155]">{st}</div>
                      ))}
                      <div className="pt-2 border-t border-[#DCE7E1] font-bold text-[#1E293B]">
                        Final Result: {q.solution.final}
                      </div>
                      <div className="flex items-center gap-2 text-[#166534] pt-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verification: {q.solution.verification}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 4: 1.6C OVERFLOW DETECTION & SIGN EXTENSION                       */}
      {/* ===================================================================== */}
      {activeTab === "1.6C" && section.overflowSignExtension && (
        <div className="space-y-6">
          {/* Header Card */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4 font-mono">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#DCE7E1]">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-[#FEE2E2] border border-[#FCA5A5] flex items-center justify-center text-[#DC2626]">
                  <AlertTriangle className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-[#1E293B]">{section.overflowSignExtension.title}</h3>
                  <span className="text-[11px] text-[#64748B]">{section.overflowSignExtension.subtitle}</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] text-[10px] font-bold uppercase text-[#DC2626]">
                Silicon Guardrails
              </span>
            </div>

            <p className="text-xs text-[#475569] leading-relaxed">
              {section.overflowSignExtension.overflowConcept.explanation}
            </p>

            {/* 3 Important Overflow Rules Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              {section.overflowSignExtension.overflowConcept.threeRules.map((r, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-lg bg-[#DC2626] text-white flex items-center justify-center text-xs font-bold">
                      {r.number}
                    </span>
                    <span className="text-[10px] font-bold uppercase text-[#94A3B8]">Rule {r.number}</span>
                  </div>
                  <strong className="text-[#1E293B] block pt-1">{r.title}</strong>
                  <p className="text-[11px] text-[#475569] leading-relaxed">{r.rule}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hardware Overflow Detector Diagram */}
          <OverflowDetectorDiagram />

          {/* Upgraded Sign Extension Visualizer */}
          <SignExtensionVisualizer />

          {/* 4 Worked Models for Overflow & Sign Extension */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E6F40]">
                Worked Engineering Models: Overflow Tracing &amp; Sign-Bit Extension
              </h4>
              <span className="text-[10px] font-mono text-[#64748B]">Cin ⊕ Cout &amp; Sign Extension</span>
            </div>

            {section.overflowSignExtension.models.map((model) => (
              <div key={model.id} className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4 font-mono">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#DCE7E1]">
                  <span className="text-xs font-bold text-[#1E293B] flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${model.overflow ? "bg-[#DC2626]" : "bg-[#2E6F40]"}`} />
                    {model.question}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                    model.overflow ? "bg-[#FEE2E2] text-[#DC2626] border-[#FCA5A5]" : "bg-[#DCFCE7] text-[#15803D] border-[#86EFAC]"
                  }`}>
                    {model.conceptTag}
                  </span>
                </div>

                {/* If it has carryRow, render grid */}
                {model.carryRow && (
                  <BitAlignedSignedAdditionGrid model={{
                    aDec: model.aDec,
                    aBin: model.aBin,
                    bDec: model.bDec,
                    bBin: model.bBin,
                    carryRow: model.carryRow,
                    carryOut: model.cOut,
                    sumBin: model.sumBin,
                    sumDec: model.sumDec,
                    signBit: model.sumBin ? model.sumBin[0] : "0",
                    overflow: model.overflow,
                    discardCarry: model.cOut === "1" ? "Carry out C8 = 1 is discarded." : "Carry out C8 = 0.",
                    verification: model.verification
                  }} />
                )}

                {/* Derivation Steps */}
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2 text-xs">
                  <span className="text-[10px] font-bold uppercase text-[#64748B] block">
                    Silicon Verification Steps:
                  </span>
                  {model.stepByStep.map((st, i) => (
                    <div key={i} className="text-[#334155] leading-relaxed">{st}</div>
                  ))}
                </div>

                {/* 5-Second Verification */}
                <div className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs ${
                  model.overflow ? "bg-[#FEF2F2] border-[#FCA5A5] text-[#991B1B]" : "bg-[#F0FDF4] border-[#BBF7D0] text-[#166534]"
                }`}>
                  {model.overflow ? <AlertTriangle className="w-4 h-4 shrink-0 text-[#DC2626]" /> : <CheckCircle2 className="w-4 h-4 shrink-0 text-[#16A34A]" />}
                  <div>
                    <strong className="font-bold">5-Second Verification: </strong>
                    <span>{model.verification}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Targeted Practice Set for 1.6C */}
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E6F40]">
                Targeted Practice Set: Overflow &amp; Sign Extension
              </span>
              <span className="text-[10px] font-mono text-[#64748B]">6 Graded Problems</span>
            </div>

            <div className="space-y-3">
              {section.overflowSignExtension.practiceQuestions.map((q) => (
                <div key={q.id} className="p-4 rounded-xl bg-white border border-[#DCE7E1] space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-[#1E293B]">{q.question}</span>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FAF8F5] text-[#64748B] border border-[#DCE7E1]">
                        {q.difficulty}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]">
                        {q.conceptTag}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleSolution(q.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#2E6F40] hover:text-[#1F4A2B]"
                  >
                    {revealedSolutions[q.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{revealedSolutions[q.id] ? "Hide Solution" : "Reveal Graphical Solution"}</span>
                  </button>

                  {revealedSolutions[q.id] && (
                    <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2 font-mono text-xs">
                      {q.solution.steps.map((st, sIdx) => (
                        <div key={sIdx} className="text-[#334155]">{st}</div>
                      ))}
                      <div className="pt-2 border-t border-[#DCE7E1] font-bold text-[#1E293B]">
                        Final Result: {q.solution.final}
                      </div>
                      <div className="flex items-center gap-2 text-[#166534] pt-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verification: {q.solution.verification}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 5: CHEAT SHEET (EXCLUSIVE RULES & SPEED SHORTCUTS)                */}
      {/* ===================================================================== */}
      {activeTab === "cheat-sheet" && section.cheatSheet && (
        <div className="space-y-6 font-mono">
          {/* Hero Banner */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-[#EEF2FF] border border-[#C7D2FE] flex items-center justify-center text-[#4F46E5]">
                  <Zap className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-[#1E293B]">{section.cheatSheet.heroTitle}</h3>
                  <span className="text-[11px] text-[#64748B]">{section.cheatSheet.heroSubtitle}</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] text-[10px] font-bold uppercase text-[#2E6F40]">
                Exam High-Yield
              </span>
            </div>
          </div>

          {/* Master Comparison Matrix */}
          <div className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2E6F40] block">
              Master Signed Representations Comparison Matrix
            </span>
            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse text-xs">
                <thead>
                  <tr className="bg-[#FAF8F5] text-[#475569] border-b border-[#CBD5E1]">
                    <th className="py-2.5 px-3 text-left font-bold">Architectural Feature</th>
                    <th className="py-2.5 px-3 font-bold">Sign-Magnitude Form</th>
                    <th className="py-2.5 px-3 font-bold">Signed 1's Complement</th>
                    <th className="py-2.5 px-3 font-bold bg-[#DCFCE7] text-[#15803D]">Signed 2's Complement (CPU Standard)</th>
                  </tr>
                </thead>
                <tbody>
                  {section.cheatSheet.comparisonMatrix.map((row, idx) => (
                    <tr key={idx} className="border-b border-[#F1F5F9] hover:bg-[#FAF8F5]">
                      <td className="py-2.5 px-3 text-left font-bold text-[#1E293B]">{row.feature}</td>
                      <td className="py-2.5 px-3 text-[#334155]">{row.signMag}</td>
                      <td className="py-2.5 px-3 text-[#334155]">{row.onesComp}</td>
                      <td className="py-2.5 px-3 font-bold bg-[#DCFCE7] text-[#15803D]">{row.twosComp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 4 Exclusive 5-Second Exam Speed Shortcuts */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#4F46E5] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#4F46E5]" />
                Four Exclusive 5-Second Exam Speed Shortcuts
              </h4>
              <span className="text-[10px] text-[#64748B]">Zero Duplicated Questions</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.cheatSheet.speedShortcuts.map((sc) => (
                <div key={sc.id} className="p-4 rounded-xl bg-white border border-[#DCE7E1] shadow-soft space-y-2">
                  <div className="flex items-center justify-between pb-1 border-b border-[#DCE7E1]">
                    <span className="text-xs font-bold text-[#1E293B]">{sc.title}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]">
                      {sc.badge}
                    </span>
                  </div>
                  <p className="text-xs text-[#475569] leading-relaxed">{sc.rule}</p>
                  <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] text-[11px] text-[#2E6F40] font-semibold">
                    {sc.example}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top 3 Exam Pitfalls */}
          <div className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626] flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-[#DC2626]" />
              Top 3 Exam Traps &amp; How to Avoid Them
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {section.cheatSheet.topMistakes.map((tm) => (
                <div key={tm.id} className="p-3.5 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] space-y-1.5 text-xs">
                  <strong className="text-[#991B1B] block">{tm.mistake}</strong>
                  <p className="text-[11px] text-[#7F1D1D] leading-relaxed">{tm.consequence}</p>
                  <div className="pt-1.5 border-t border-[#FCA5A5] text-[#166534] font-semibold text-[11px]">
                    Solution: {tm.fix}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 6: MIXED EXAM CHALLENGE (15 QUESTIONS)                            */}
      {/* ===================================================================== */}
      {activeTab === "mixed" && (
        <div className="space-y-6 font-mono">
          {/* Header & Filter Bar */}
          <div className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#DCE7E1]">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-[#DCFCE7] border border-[#86EFAC] flex items-center justify-center text-[#15803D]">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-[#1E293B]">
                    Mixed Exam Challenge Arena (15 Non-Repeating Problems)
                  </h3>
                  <span className="text-[11px] text-[#64748B]">
                    3-Scheme Conversions, 4-Case Arithmetic, Overflow Tracing &amp; Sign Extension
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] text-[10px] font-bold uppercase text-[#2E6F40]">
                Showing {filteredMixedQuestions.length} of {mixedQuestions.length}
              </span>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-[#64748B] font-bold mr-2">Filter by Difficulty:</span>
              {["all", "easy", "medium", "hard"].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setActiveMixedFilter(diff)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-all ${
                    activeMixedFilter === diff
                      ? "bg-[#2E6F40] text-white shadow-xs"
                      : "bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]"
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* 15 Mixed Question Cards */}
          <div className="space-y-4">
            {filteredMixedQuestions.map((q, idx) => (
              <div key={q.id} className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#2E6F40] text-white flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-[#1E293B]">
                      {q.question}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      q.difficulty === "Easy" ? "bg-[#DCFCE7] text-[#15803D] border border-[#86EFAC]" :
                      q.difficulty === "Medium" ? "bg-[#FEF3C7] text-[#92400E] border border-[#FCD34D]" :
                      "bg-[#FEE2E2] text-[#DC2626] border border-[#FCA5A5]"
                    }`}>
                      {q.difficulty}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]">
                      {q.conceptTag}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleSolution(q.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#2E6F40] hover:text-[#1F4A2B]"
                >
                  {revealedSolutions[q.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{revealedSolutions[q.id] ? "Hide Solution" : "Reveal Graphical Solution"}</span>
                </button>

                {revealedSolutions[q.id] && (
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3 font-mono text-xs">
                    <span className="text-[10px] font-bold uppercase text-[#64748B] block">
                      Classroom Derivation &amp; Verification:
                    </span>
                    <div className="space-y-1.5">
                      {q.solution.steps.map((st, sIdx) => (
                        <div key={sIdx} className="text-[#334155] leading-relaxed">
                          {st}
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-[#DCE7E1] font-bold text-[#1E293B]">
                      Final Result: {q.solution.final}
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] flex items-center gap-2 text-[#166534]">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-[#16A34A]" />
                      <span>{q.solution.verification}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
