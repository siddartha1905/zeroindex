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
  ToggleLeft,
  Search,
  Eye,
  Check,
  Compass,
  FileText,
  Printer
} from 'lucide-react';
import { dldSection21Data } from '../data/dldSection21Data';
import { CuratedVideoCard } from './CuratedVideoCard';

export const Section21View = () => {
  const [activeTab, setActiveTab] = useState('start-here');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedProofs, setExpandedProofs] = useState({ 'proof-4': true, 'proof-5': true });
  const [expandedAlgebraicProofs, setExpandedAlgebraicProofs] = useState({});
  const [revealedExamples, setRevealedExamples] = useState({ 'ex-1': true, 'ex-5': true });
  const [cheatSearch, setCheatSearch] = useState('');

  const data = dldSection21Data;

  const toggleProof = (id) => {
    setExpandedProofs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleAlgebraic = (id) => {
    setExpandedAlgebraicProofs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleExample = (id) => {
    setRevealedExamples(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredLaws = selectedCategory === 'all' 
    ? data.allLaws.lawsList 
    : data.allLaws.lawsList.filter(l => l.category === selectedCategory);

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

        {/* Five Responsive Navigation Tabs (Task 6 Refinement: Zero Desktop Clipping) */}
        <div className="pt-2 border-t border-[#DCE7E1]">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {[
              { id: 'start-here', label: '1. Start Here', icon: Compass },
              { id: 'all-laws', label: '2. All Laws', icon: BookOpen },
              { id: 'see-prove', label: '3. See & Prove', icon: Eye },
              { id: 'worked-examples', label: '4. Worked Examples', icon: CheckCircle2 },
              { id: 'cheat-sheet', label: '5. Cheat Sheet', icon: FileText }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all duration-150 cursor-pointer text-center ${
                    isActive
                      ? 'bg-[#285C49] text-white shadow-xs'
                      : 'bg-[#FAF8F5] text-[#5F6C64] hover:text-[#293B32] hover:bg-[#F0EEEA] border border-[#DCE7E1]'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
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
          
          {/* WHY DO WE LEARN BOOLEAN ALGEBRA? */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#DCE7E1]">
              <Sparkles className="w-5 h-5 text-[#285C49]" />
              <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#293B32]">
                {data.startHere.whyLearn.headline}
              </h2>
            </div>

            <div className="space-y-3 text-sm text-[#293B32] leading-relaxed font-normal">
              {data.startHere.whyLearn.paragraphs.map((p, idx) => (
                <p key={idx} className={idx === 2 ? "font-bold text-[#285C49] text-base p-3 bg-[#EBF3ED] rounded-xl border border-[#285C49]/20" : ""}>
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* TASK 1: COMPACT VISUAL SUMMARY - WHY DO WE SIMPLIFY BOOLEAN EXPRESSIONS */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-[#EBF3ED] text-[#285C49] border border-[#285C49]/20">
                  Core Engineering Rationale
                </span>
              </div>
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#293B32] mt-2">
                {data.startHere.whySimplify.heading}
              </h3>
              <p className="text-sm text-[#5F6C64] mt-1 leading-relaxed">
                {data.startHere.whySimplify.subheading}
              </p>
            </div>

            {/* 4 Distinct Educational Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {data.startHere.whySimplify.points.map((pt, pIdx) => {
                const icons = [Layers, Cpu, Zap, Clock];
                const IconComponent = icons[pIdx] || Layers;
                return (
                  <div key={pt.id} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="w-8 h-8 rounded-lg bg-[#EBF3ED] text-[#285C49] flex items-center justify-center">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h4 className="font-mono text-xs font-bold text-[#293B32] tracking-wide">
                        {pt.title}
                      </h4>
                      <p className="text-xs text-[#5F6C64] leading-relaxed">
                        {pt.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Visual Flow Banner */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#285C49] block">
                Engineering Transformation Pipeline
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-center">
                {data.startHere.whySimplify.visualFlow.map((step, sIdx) => (
                  <React.Fragment key={sIdx}>
                    <div className="p-2.5 rounded-lg bg-white border border-[#DCE7E1] text-center space-y-0.5 shadow-2xs">
                      <span className="font-mono text-[11px] font-bold text-[#293B32] block">
                        {step.label}
                      </span>
                      <span className="text-[10px] text-[#5F6C64] block">
                        {step.note}
                      </span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Engineering Distinction Callout */}
            <div className="p-3.5 rounded-xl bg-[#EBF3ED] border border-[#285C49]/20 text-xs text-[#285C49] flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#285C49]" />
              <p className="leading-relaxed">
                <span className="font-bold">Engineering Distinction: </span>
                {data.startHere.whySimplify.engineeringNote}
              </p>
            </div>
          </div>

          {/* MAIN VISUAL: BEFORE AND AFTER SIMPLIFICATION */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-[#EBF3ED] text-[#285C49] border border-[#285C49]/20">
                  Visual Demonstration
                </span>
                <span className="font-mono text-xs font-bold text-[#285C49]">
                  {data.startHere.visualDemonstration.subtitle}
                </span>
              </div>
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#293B32] mt-1">
                {data.startHere.visualDemonstration.title}
              </h3>
            </div>

            {/* Before vs After Visual Comparison Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Before Card */}
              <div className="p-5 rounded-2xl bg-[#FFF8F5] border border-[#FCD9BD] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#FBE5D8] text-[#C05621]">
                    BEFORE SIMPLIFICATION
                  </span>
                  <span className="font-mono text-xs text-[#C05621] font-bold">
                    4 Gates / 4 Literals
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#FCD9BD] text-center font-mono text-base font-bold text-[#293B32]">
                  F = AB + AB'
                </div>

                {/* SVG Circuit Diagram Before (Corrected Wire-to-Pin Connectivity) */}
                <div className="p-4 bg-white rounded-xl border border-[#FCD9BD] flex flex-col items-center justify-center">
                  <svg viewBox="0 0 350 145" className="w-full max-w-[340px] h-auto">
                    {/* Signal Input Labels */}
                    <text x="10" y="29" fontFamily="monospace" fontSize="12" fontWeight="bold" fill="#293B32">A</text>
                    <text x="10" y="49" fontFamily="monospace" fontSize="12" fontWeight="bold" fill="#293B32">B</text>

                    {/* Input Wire A: Enters at (24, 25), feeds Upper AND pin 1 at (120, 25) */}
                    <line x1="24" y1="25" x2="120" y2="25" stroke="#285C49" strokeWidth="2" />
                    {/* Input A Branch Junction Dot at (45, 25) */}
                    <circle cx="45" cy="25" r="3" fill="#285C49" />
                    {/* Input A Branch down to y=85 */}
                    <line x1="45" y1="25" x2="45" y2="85" stroke="#285C49" strokeWidth="2" />
                    {/* Input A Wire to Lower AND pin 1 at (120, 85) */}
                    <line x1="45" y1="85" x2="120" y2="85" stroke="#285C49" strokeWidth="2" />

                    {/* Input Wire B: Enters at (24, 45), feeds Upper AND pin 2 at (120, 45) */}
                    {/* Clean wire crossing at (45, 45) over line A without dot */}
                    <line x1="24" y1="45" x2="120" y2="45" stroke="#285C49" strokeWidth="2" />
                    {/* Input B Branch Junction Dot at (68, 45) */}
                    <circle cx="68" cy="45" r="3" fill="#285C49" />
                    {/* Input B Branch down to y=105 */}
                    <line x1="68" y1="45" x2="68" y2="105" stroke="#285C49" strokeWidth="2" />
                    {/* Wire to NOT gate input pin at (82, 105) */}
                    <line x1="68" y1="105" x2="82" y2="105" stroke="#285C49" strokeWidth="2" />

                    {/* Inverter (NOT Gate) for B' */}
                    {/* Triangle body from x=82 to x=98 */}
                    <polygon points="82,97 82,113 98,105" fill="#FAF8F5" stroke="#285C49" strokeWidth="1.8" />
                    {/* Inversion Bubble at (101.5, 105) */}
                    <circle cx="101.5" cy="105" r="3" fill="#FAF8F5" stroke="#285C49" strokeWidth="1.8" />
                    {/* Inverter output wire from bubble right edge (104.5, 105) to Lower AND pin 2 at (120, 105) */}
                    <line x1="104.5" y1="105" x2="120" y2="105" stroke="#285C49" strokeWidth="2" />
                    {/* Label B' */}
                    <text x="105" y="118" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="#285C49">B'</text>

                    {/* Upper AND Gate (AB): Inputs at y=25 and y=45 */}
                    <path d="M 120,17 L 133,17 A 18,18 0 0 1 133,53 L 120,53 Z" fill="#EBF3ED" stroke="#285C49" strokeWidth="2" />
                    <text x="126" y="38" fontFamily="monospace" fontSize="9" fontWeight="bold" fill="#285C49">AND</text>
                    {/* Upper AND Output at (151, 35) to OR input at (194, 56) */}
                    <line x1="151" y1="35" x2="188" y2="35" stroke="#285C49" strokeWidth="2" />
                    <line x1="188" y1="35" x2="188" y2="56" stroke="#285C49" strokeWidth="2" />
                    <line x1="188" y1="56" x2="194" y2="56" stroke="#285C49" strokeWidth="2" />
                    <text x="154" y="30" fontFamily="monospace" fontSize="9" fontWeight="bold" fill="#285C49">AB</text>

                    {/* Lower AND Gate (AB'): Inputs at y=85 and y=105 */}
                    <path d="M 120,77 L 133,77 A 18,18 0 0 1 133,113 L 120,113 Z" fill="#EBF3ED" stroke="#285C49" strokeWidth="2" />
                    <text x="126" y="98" fontFamily="monospace" fontSize="9" fontWeight="bold" fill="#285C49">AND</text>
                    {/* Lower AND Output at (151, 95) to OR input at (194, 74) */}
                    <line x1="151" y1="95" x2="188" y2="95" stroke="#285C49" strokeWidth="2" />
                    <line x1="188" y1="95" x2="188" y2="74" stroke="#285C49" strokeWidth="2" />
                    <line x1="188" y1="74" x2="194" y2="74" stroke="#285C49" strokeWidth="2" />
                    <text x="154" y="106" fontFamily="monospace" fontSize="9" fontWeight="bold" fill="#285C49">AB'</text>

                    {/* OR Gate: Inputs at y=56 and y=74 */}
                    <path d="M 190,48 Q 202,65 190,82 Q 220,82 232,65 Q 220,48 190,48 Z" fill="#FEF3C7" stroke="#92400E" strokeWidth="2" />
                    <text x="201" y="69" fontFamily="monospace" fontSize="9" fontWeight="bold" fill="#92400E">OR</text>

                    {/* OR Output at (232, 65) to output terminal F */}
                    <line x1="232" y1="65" x2="280" y2="65" stroke="#285C49" strokeWidth="2" />
                    <circle cx="280" cy="65" r="3" fill="#285C49" />
                    <text x="288" y="69" fontFamily="monospace" fontSize="12" fontWeight="bold" fill="#285C49">F</text>
                  </svg>
                  <p className="text-[11px] text-[#5F6C64] mt-2 font-mono">
                    Discrete gate implementation: 2 AND gates, 1 Inverter, 1 OR gate (4 gates total)
                  </p>
                </div>

                <p className="text-xs text-[#5F6C64] leading-relaxed">
                  {data.startHere.visualDemonstration.before.circuitDescription}
                </p>
              </div>

              {/* After Card */}
              <div className="p-5 rounded-2xl bg-[#EBF3ED] border border-[#285C49]/30 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#285C49] text-white">
                    AFTER SIMPLIFICATION
                  </span>
                  <span className="font-mono text-xs text-[#285C49] font-bold">
                    0 Gates / 1 Literal
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#285C49]/20 text-center font-mono text-base font-bold text-[#285C49]">
                  F = A
                </div>

                {/* SVG Circuit Diagram After */}
                <div className="p-4 bg-white rounded-xl border border-[#285C49]/20 flex flex-col items-center justify-center min-h-[160px]">
                  <svg viewBox="0 0 350 145" className="w-full max-w-[340px] h-auto">
                    {/* Signal Input Label */}
                    <text x="15" y="69" fontFamily="monospace" fontSize="12" fontWeight="bold" fill="#293B32">Input A</text>
                    <circle cx="70" cy="65" r="3.5" fill="#285C49" />

                    {/* Direct Conductor Line */}
                    <line x1="70" y1="65" x2="235" y2="65" stroke="#285C49" strokeWidth="2.5" />
                    <circle cx="235" cy="65" r="3.5" fill="#285C49" />

                    {/* Output Label */}
                    <text x="245" y="69" fontFamily="monospace" fontSize="13" fontWeight="bold" fill="#285C49">Output F = A</text>

                    {/* Technical Specification Badge */}
                    <rect x="55" y="94" width="240" height="32" rx="8" fill="#EBF3ED" stroke="#285C49" strokeWidth="1" />
                    <text x="75" y="108" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="#285C49">
                      Discrete Gate Count: 0 Gates
                    </text>
                    <text x="75" y="120" fontFamily="monospace" fontSize="9" fill="#5F6C64">
                      Input B has no physical effect on output
                    </text>
                  </svg>
                  <p className="text-[11px] text-[#285C49] mt-2 font-mono font-bold">
                    Direct conductor connection: Input B is completely eliminated from the circuit.
                  </p>
                </div>

                <p className="text-xs text-[#285C49] leading-relaxed">
                  {data.startHere.visualDemonstration.after.circuitDescription}
                </p>
              </div>
            </div>

            {/* Step-by-Step Derivation */}
            <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#285C49]">
                Step-by-Step Mathematical Derivation
              </h4>
              <div className="space-y-2">
                {data.startHere.visualDemonstration.derivationSteps.map((s) => (
                  <div key={s.step} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-white border border-[#DCE7E1] gap-2">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#EBF3ED] text-[#285C49] font-mono text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {s.step}
                      </span>
                      <span className="font-mono text-sm font-bold text-[#293B32]">
                        {s.expression}
                      </span>
                    </div>
                    <div className="text-right sm:text-right">
                      <span className="font-mono text-xs font-bold text-[#285C49] bg-[#EBF3ED] px-2 py-0.5 rounded">
                        {s.rule}
                      </span>
                      <p className="text-[11px] text-[#5F6C64] mt-0.5">
                        {s.reason}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Truth Table Verification */}
            <div className="space-y-2">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#285C49]">
                Truth Table Proof of Equivalence
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse border border-[#DCE7E1]">
                  <thead>
                    <tr className="bg-[#FAF8F5]">
                      {data.startHere.visualDemonstration.truthTable.headers.map((h, i) => (
                        <th key={i} className="p-2.5 font-mono font-bold text-[#293B32] border border-[#DCE7E1]">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.startHere.visualDemonstration.truthTable.rows.map((row, rIdx) => (
                      <tr key={rIdx} className={row[6] === 1 ? "bg-[#F4F8F5]" : "bg-white"}>
                        {row.map((val, cIdx) => (
                          <td 
                            key={cIdx} 
                            className={`p-2.5 font-mono border border-[#DCE7E1] ${
                              cIdx === 5 || cIdx === 6 ? "font-bold text-[#285C49] bg-[#EBF3ED]/40" : ""
                            } ${cIdx === 7 ? "text-[#285C49] font-bold" : ""}`}
                          >
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* UNIT 2 LEARNING JOURNEY */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
            <div>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#FAF8F5] text-[#285C49] border border-[#DCE7E1]">
                Curricular Progression
              </span>
              <h3 className="font-editorial text-xl font-bold text-[#293B32] mt-1">
                The Unit 2 Learning Journey
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {data.startHere.journeySteps.map((step) => (
                <div key={step.step} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#285C49] text-white font-mono text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {step.step}
                    </span>
                    <h4 className="font-editorial text-sm font-bold text-[#293B32]">
                      {step.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#5F6C64] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ESSENTIAL BOOLEAN ALGEBRA FUNDAMENTALS */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-[#DCE7E1]">
              <BookOpen className="w-5 h-5 text-[#285C49]" />
              <h2 className="font-editorial text-xl font-bold text-[#293B32]">
                Essential Boolean Algebra Fundamentals
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.startHere.fundamentals.map((f, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] font-bold text-[#285C49] uppercase tracking-wider">
                      Concept 0{idx + 1}
                    </span>
                    <h4 className="font-editorial text-base font-bold text-[#293B32]">
                      {f.term}
                    </h4>
                    <p className="text-xs text-[#5F6C64] leading-relaxed">
                      {f.definition}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-[#DCE7E1] text-[11px] text-[#285C49] font-medium">
                    <span className="font-bold">Intuition: </span>{f.plainEnglish}
                  </div>
                </div>
              ))}
            </div>

            {/* Basic Operators & Truth Tables */}
            <div className="space-y-3 pt-2">
              <h3 className="font-editorial text-lg font-bold text-[#293B32]">
                The Three Fundamental Operators
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.startHere.basicOperators.map((op, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white border border-[#DCE7E1] space-y-3">
                    <div>
                      <span className="font-mono text-[10px] font-bold text-[#285C49] uppercase">
                        {op.symbol}
                      </span>
                      <h4 className="font-editorial text-base font-bold text-[#293B32]">
                        {op.name}
                      </h4>
                      <p className="text-xs text-[#5F6C64] mt-1">
                        {op.meaning}
                      </p>
                    </div>

                    <table className="w-full text-center text-xs border-collapse border border-[#DCE7E1]">
                      <thead>
                        <tr className="bg-[#FAF8F5]">
                          <th className="p-1.5 font-mono border border-[#DCE7E1]">A</th>
                          {op.table[0].b !== undefined && (
                            <th className="p-1.5 font-mono border border-[#DCE7E1]">B</th>
                          )}
                          <th className="p-1.5 font-mono border border-[#DCE7E1] text-[#285C49]">Output</th>
                        </tr>
                      </thead>
                      <tbody>
                        {op.table.map((row, rIdx) => (
                          <tr key={rIdx} className="bg-white">
                            <td className="p-1.5 font-mono border border-[#DCE7E1]">{row.a}</td>
                            {row.b !== undefined && (
                              <td className="p-1.5 font-mono border border-[#DCE7E1]">{row.b}</td>
                            )}
                            <td className="p-1.5 font-mono font-bold text-[#285C49] border border-[#DCE7E1] bg-[#EBF3ED]/30">
                              {row.out}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>

            {/* Arithmetic vs Boolean Comparison */}
            <div className="space-y-3 pt-2">
              <h3 className="font-editorial text-lg font-bold text-[#293B32]">
                Ordinary Arithmetic vs Boolean Algebra
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse border border-[#DCE7E1]">
                  <thead>
                    <tr className="bg-[#FAF8F5]">
                      <th className="p-3 font-mono font-bold text-[#293B32] border border-[#DCE7E1] w-1/4">Feature</th>
                      <th className="p-3 font-mono font-bold text-[#5F6C64] border border-[#DCE7E1] w-3/8">Ordinary Arithmetic</th>
                      <th className="p-3 font-mono font-bold text-[#285C49] border border-[#DCE7E1] w-3/8 bg-[#EBF3ED]/50">Boolean Algebra</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.startHere.arithmeticVsBoolean.map((row, idx) => (
                      <tr key={idx} className="bg-white">
                        <td className="p-3 font-mono font-bold text-[#293B32] border border-[#DCE7E1]">
                          {row.property}
                        </td>
                        <td className="p-3 text-[#5F6C64] border border-[#DCE7E1]">
                          {row.arithmetic}
                        </td>
                        <td className="p-3 font-medium text-[#293B32] border border-[#DCE7E1] bg-[#EBF3ED]/20">
                          {row.boolean}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Operator Precedence */}
            <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#EBF3ED] text-[#285C49]">
                  Standard Evaluation Rule
                </span>
                <h4 className="font-editorial text-base font-bold text-[#293B32]">
                  {data.startHere.operatorPrecedence.title}
                </h4>
              </div>
              <p className="text-xs text-[#5F6C64]">
                {data.startHere.operatorPrecedence.rule}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                {data.startHere.operatorPrecedence.levels.map((lvl) => (
                  <div key={lvl.rank} className="p-3 rounded-lg bg-white border border-[#DCE7E1] space-y-1">
                    <span className="font-mono text-[10px] font-bold text-[#285C49]">
                      Priority {lvl.rank}
                    </span>
                    <h5 className="font-mono text-xs font-bold text-[#293B32]">
                      {lvl.name}
                    </h5>
                    <p className="text-[11px] text-[#5F6C64]">
                      {lvl.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-lg bg-[#EBF3ED] border border-[#285C49]/20 text-xs text-[#293B32] space-y-1">
                <span className="font-bold text-[#285C49]">Evaluation Example: </span>
                <span>{data.startHere.operatorPrecedence.workedExample.evaluation}</span>
              </div>
            </div>
          </div>

          {/* Curated Video Lesson for Tab 1 */}
          <div className="pt-2">
            <CuratedVideoCard videoKey="boolean-intro" />
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: ALL BOOLEAN LAWS                                                   */}
      {/* ========================================================================= */}
      {activeTab === 'all-laws' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Why We Need Laws */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-3">
            <h2 className="font-editorial text-xl font-bold text-[#293B32]">
              {data.allLaws.intro.headline}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-[#5F6C64]">
              {data.allLaws.intro.points.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-[#FAF8F5]">
                  <Check className="w-3.5 h-3.5 text-[#285C49] flex-shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {data.allLaws.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#285C49] text-white shadow-xs'
                    : 'bg-white text-[#5F6C64] hover:text-[#293B32] border border-[#DCE7E1]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Laws Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLaws.map((law) => (
              <div 
                key={law.id} 
                className={`p-5 rounded-2xl bg-white border transition-all space-y-4 flex flex-col justify-between ${
                  law.number === 8 || law.number === 12 || law.number === 13
                    ? 'border-[#285C49]/50 shadow-soft'
                    : 'border-[#DCE7E1] shadow-2xs'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#FAF8F5] text-[#285C49] border border-[#DCE7E1]">
                      Law 0{law.number}
                    </span>
                    <span className="font-mono text-[10px] text-[#5F6C64] uppercase tracking-wider">
                      {law.category}
                    </span>
                  </div>

                  <h3 className="font-editorial text-lg font-bold text-[#293B32]">
                    {law.name}
                  </h3>

                  {/* Side-by-Side Dual Forms */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-lg bg-[#EBF3ED] border border-[#285C49]/20">
                      <span className="text-[10px] font-mono text-[#285C49] font-bold block uppercase">OR Form</span>
                      <span className="font-mono text-xs font-bold text-[#293B32]">{law.orForm}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#FEF3C7]/40 border border-[#FDE68A]">
                      <span className="text-[10px] font-mono text-[#92400E] font-bold block uppercase">AND / Dual Form</span>
                      <span className="font-mono text-xs font-bold text-[#293B32]">{law.andForm}</span>
                    </div>
                  </div>

                  {/* Explanations */}
                  <div className="space-y-1.5 text-xs text-[#5F6C64]">
                    <p><span className="font-bold text-[#293B32]">What it means: </span>{law.whatItMeans}</p>
                    <p><span className="font-bold text-[#293B32]">Why it is true: </span>{law.whyTrue}</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#DCE7E1]/60">
                  <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] font-mono text-xs text-[#293B32]">
                    <span className="text-[#5F6C64] font-normal">Example: </span>{law.quickExample}
                  </div>
                  <div className="text-[11px] text-[#285C49] font-mono font-medium flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Tip: {law.rememberThis}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Curated Video Lesson for Tab 2 */}
          <div className="pt-2">
            <CuratedVideoCard videoKey="boolean-laws" />
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: SEE & PROVE                                                        */}
      {/* ========================================================================= */}
      {activeTab === 'see-prove' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-2">
            <h2 className="font-editorial text-xl font-bold text-[#293B32]">
              Visual Demonstrations and Truth Table Proofs
            </h2>
            <p className="text-xs text-[#5F6C64]">
              In Boolean algebra, two expressions are mathematically identical if and only if their outputs match for every possible input combination. Here are the 8 key proofs that establish the validity of our simplification rules.
            </p>
          </div>

          <div className="space-y-4">
            {data.seeAndProve.map((proof) => {
              const isOpen = expandedProofs[proof.id];
              return (
                <div key={proof.id} className="rounded-2xl bg-white border border-[#DCE7E1] shadow-soft overflow-hidden">
                  <button
                    onClick={() => toggleProof(proof.id)}
                    className="w-full p-5 flex items-center justify-between text-left hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                  >
                    <div>
                      <span className="font-mono text-xs font-bold text-[#285C49] uppercase tracking-wider block">
                        {proof.theorem}
                      </span>
                      <h3 className="font-editorial text-lg font-bold text-[#293B32] mt-0.5">
                        {proof.title}
                      </h3>
                    </div>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-[#5F6C64]" /> : <ChevronDown className="w-5 h-5 text-[#5F6C64]" />}
                  </button>

                  {isOpen && (
                    <div className="p-5 pt-0 border-t border-[#DCE7E1] space-y-4 bg-[#FAF8F5]/30">
                      <div className="overflow-x-auto pt-4">
                        <table className="w-full text-center text-xs border-collapse border border-[#DCE7E1] bg-white">
                          <thead>
                            <tr className="bg-[#FAF8F5]">
                              {proof.truthTable.headers.map((h, i) => (
                                <th key={i} className="p-2 font-mono font-bold text-[#293B32] border border-[#DCE7E1]">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {proof.truthTable.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-[#F4F8F5]">
                                {row.map((val, cIdx) => (
                                  <td 
                                    key={cIdx} 
                                    className={`p-2 font-mono border border-[#DCE7E1] ${
                                      cIdx >= row.length - 2 ? "font-bold text-[#285C49] bg-[#EBF3ED]/40" : ""
                                    }`}
                                  >
                                    {val}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#EBF3ED] border border-[#285C49]/20 text-xs text-[#285C49] font-medium flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#285C49]" />
                        <span>{proof.conclusion}</span>
                      </div>

                      {/* Optional Expandable Symbolic Algebraic Proof (Task 3) */}
                      {proof.algebraicProof && (
                        <div className="pt-2 border-t border-[#DCE7E1]">
                          <button
                            onClick={() => toggleAlgebraic(proof.id)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#EBF3ED] border border-[#DCE7E1] text-xs font-mono font-bold text-[#285C49] transition-colors cursor-pointer shadow-2xs"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-[#285C49]" />
                            <span>{expandedAlgebraicProofs[proof.id] ? "Hide Algebraic Proof" : "Show Algebraic Proof"}</span>
                            {expandedAlgebraicProofs[proof.id] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>

                          {expandedAlgebraicProofs[proof.id] && (
                            <div className="mt-3 p-4 sm:p-5 rounded-xl bg-white border border-[#DCE7E1] space-y-4 shadow-soft animate-fadeIn">
                              <div>
                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#285C49] bg-[#EBF3ED] px-2 py-0.5 rounded">
                                  Symbolic Mathematical Derivation
                                </span>
                                <h4 className="font-editorial text-base sm:text-lg font-bold text-[#293B32] mt-1">
                                  {proof.algebraicProof.title}
                                </h4>
                                <p className="text-xs text-[#5F6C64] mt-0.5 font-mono">
                                  {proof.algebraicProof.statement}
                                </p>
                              </div>

                              {/* Single Linear Steps Proof (Absorption, Distributive, Consensus) */}
                              {proof.algebraicProof.steps && (
                                <div className="space-y-2.5">
                                  {proof.algebraicProof.steps.map((st) => (
                                    <div key={st.step} className="p-3 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                                      <div className="flex items-center gap-2.5">
                                        <span className="w-5 h-5 rounded-full bg-[#EBF3ED] text-[#285C49] font-mono text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                                          {st.step}
                                        </span>
                                        <span className="font-mono font-bold text-[#293B32]">
                                          {st.expr}
                                        </span>
                                      </div>
                                      <div className="text-left sm:text-right">
                                        <span className="font-mono text-[11px] font-bold text-[#285C49] bg-[#EBF3ED] px-2 py-0.5 rounded">
                                          {st.law}
                                        </span>
                                        <p className="text-[11px] text-[#5F6C64] mt-0.5">{st.reason}</p>
                                      </div>
                                    </div>
                                  ))}
                                  <div className="p-3 rounded-lg bg-[#EBF3ED] border border-[#285C49]/20 text-xs font-mono font-bold text-[#285C49]">
                                    {proof.algebraicProof.conclusion}
                                  </div>
                                </div>
                              )}

                              {/* De Morgan's Two-Part Proof via Uniqueness of Complements */}
                              {proof.algebraicProof.partA && proof.algebraicProof.partB && (
                                <div className="space-y-5">
                                  {/* Part A */}
                                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3">
                                    <div className="flex items-center justify-between">
                                      <h5 className="font-editorial text-sm font-bold text-[#285C49]">
                                        {proof.algebraicProof.partA.identity}
                                      </h5>
                                      <span className="text-[10px] font-mono font-bold text-[#285C49] bg-[#EBF3ED] px-2 py-0.5 rounded">
                                        Part 1
                                      </span>
                                    </div>
                                    <p className="text-xs text-[#5F6C64] leading-relaxed">
                                      {proof.algebraicProof.partA.explanation}
                                    </p>
                                    
                                    <div className="space-y-2">
                                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#285C49] block">
                                        Condition 1: Product Test (XY = 0)
                                      </span>
                                      {proof.algebraicProof.partA.productProof.map((st) => (
                                        <div key={st.step} className="p-2.5 rounded-lg bg-white border border-[#DCE7E1] flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                                          <div className="flex items-center gap-2">
                                            <span className="text-[#5F6C64] font-mono text-[10px]">{st.step}.</span>
                                            <span className="font-mono font-bold text-[#293B32]">{st.expr}</span>
                                          </div>
                                          <span className="font-mono text-[10px] text-[#285C49] bg-[#EBF3ED] px-1.5 py-0.5 rounded">{st.law}</span>
                                        </div>
                                      ))}
                                    </div>

                                    <div className="space-y-2 pt-1">
                                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#285C49] block">
                                        Condition 2: Sum Test (X + Y = 1)
                                      </span>
                                      {proof.algebraicProof.partA.sumProof.map((st) => (
                                        <div key={st.step} className="p-2.5 rounded-lg bg-white border border-[#DCE7E1] flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                                          <div className="flex items-center gap-2">
                                            <span className="text-[#5F6C64] font-mono text-[10px]">{st.step}.</span>
                                            <span className="font-mono font-bold text-[#293B32]">{st.expr}</span>
                                          </div>
                                          <span className="font-mono text-[10px] text-[#285C49] bg-[#EBF3ED] px-1.5 py-0.5 rounded">{st.law}</span>
                                        </div>
                                      ))}
                                    </div>

                                    <div className="p-2.5 rounded-lg bg-[#EBF3ED] border border-[#285C49]/20 text-xs font-mono font-bold text-[#285C49]">
                                      {proof.algebraicProof.partA.conclusion}
                                    </div>
                                  </div>

                                  {/* Part B */}
                                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3">
                                    <div className="flex items-center justify-between">
                                      <h5 className="font-editorial text-sm font-bold text-[#285C49]">
                                        {proof.algebraicProof.partB.identity}
                                      </h5>
                                      <span className="text-[10px] font-mono font-bold text-[#285C49] bg-[#EBF3ED] px-2 py-0.5 rounded">
                                        Part 2
                                      </span>
                                    </div>
                                    <p className="text-xs text-[#5F6C64] leading-relaxed">
                                      {proof.algebraicProof.partB.explanation}
                                    </p>
                                    
                                    <div className="space-y-2">
                                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#285C49] block">
                                        Condition 1: Product Test (XY = 0)
                                      </span>
                                      {proof.algebraicProof.partB.productProof.map((st) => (
                                        <div key={st.step} className="p-2.5 rounded-lg bg-white border border-[#DCE7E1] flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                                          <div className="flex items-center gap-2">
                                            <span className="text-[#5F6C64] font-mono text-[10px]">{st.step}.</span>
                                            <span className="font-mono font-bold text-[#293B32]">{st.expr}</span>
                                          </div>
                                          <span className="font-mono text-[10px] text-[#285C49] bg-[#EBF3ED] px-1.5 py-0.5 rounded">{st.law}</span>
                                        </div>
                                      ))}
                                    </div>

                                    <div className="space-y-2 pt-1">
                                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#285C49] block">
                                        Condition 2: Sum Test (X + Y = 1)
                                      </span>
                                      {proof.algebraicProof.partB.sumProof.map((st) => (
                                        <div key={st.step} className="p-2.5 rounded-lg bg-white border border-[#DCE7E1] flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                                          <div className="flex items-center gap-2">
                                            <span className="text-[#5F6C64] font-mono text-[10px]">{st.step}.</span>
                                            <span className="font-mono font-bold text-[#293B32]">{st.expr}</span>
                                          </div>
                                          <span className="font-mono text-[10px] text-[#285C49] bg-[#EBF3ED] px-1.5 py-0.5 rounded">{st.law}</span>
                                        </div>
                                      ))}
                                    </div>

                                    <div className="p-2.5 rounded-lg bg-[#EBF3ED] border border-[#285C49]/20 text-xs font-mono font-bold text-[#285C49]">
                                      {proof.algebraicProof.partB.conclusion}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Curated Video in See & Prove if proof has videoKey */}
                      {proof.videoKey && (
                        <div className="pt-2">
                          <CuratedVideoCard videoKey={proof.videoKey} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: WORKED EXAMPLES                                                    */}
      {/* ========================================================================= */}
      {activeTab === 'worked-examples' && (
        <div className="space-y-8 animate-fadeIn">
          
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-2">
            <h2 className="font-editorial text-xl font-bold text-[#293B32]">
              Introductory Worked Models
            </h2>
            <p className="text-xs text-[#5F6C64]">
              These 10 progressive models illustrate the practical application of each Boolean law. Study each step, note the cited law, and check the common mistake warnings before moving on to multi-step expression simplification in Section 2.2.
            </p>
          </div>

          {/* 10 Worked Examples List */}
          <div className="space-y-4">
            {data.workedExamples.map((ex) => {
              const isRevealed = revealedExamples[ex.id];
              return (
                <div key={ex.id} className="p-5 sm:p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#DCE7E1]">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#285C49] text-white font-mono text-xs font-bold flex items-center justify-center">
                        {ex.number}
                      </span>
                      <h3 className="font-editorial text-lg font-bold text-[#293B32]">
                        {ex.title}
                      </h3>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#285C49] bg-[#EBF3ED] px-2.5 py-0.5 rounded-full">
                      {ex.concept}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] text-xs text-[#293B32] space-y-1">
                    <span className="font-bold text-[#285C49]">Problem Statement: </span>
                    <span>{ex.problemStatement}</span>
                  </div>

                  <button
                    onClick={() => toggleExample(ex.id)}
                    className="flex items-center gap-2 text-xs font-mono font-bold text-[#285C49] hover:underline cursor-pointer"
                  >
                    <span>{isRevealed ? "Hide Step-by-Step Solution" : "Reveal Step-by-Step Solution"}</span>
                    {isRevealed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {isRevealed && (
                    <div className="space-y-3 pt-2">
                      <div className="space-y-2">
                        {ex.steps.map((st) => (
                          <div key={st.stepNumber} className="p-3 rounded-lg bg-white border border-[#DCE7E1] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                            <div className="flex items-center gap-2.5">
                              <span className="font-mono font-bold text-[#5F6C64]">Step {st.stepNumber}:</span>
                              <span className="font-mono font-bold text-[#293B32]">{st.expression}</span>
                            </div>
                            <div className="text-right sm:text-right">
                              <span className="font-mono text-[11px] font-bold text-[#285C49] bg-[#EBF3ED] px-2 py-0.5 rounded">
                                {st.law}
                              </span>
                              <p className="text-[11px] text-[#5F6C64] mt-0.5">{st.reason}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-[#EBF3ED] border border-[#285C49]/20 gap-2">
                        <div>
                          <span className="text-[10px] font-mono text-[#285C49] font-bold uppercase tracking-wider block">Final Simplified Result</span>
                          <span className="font-mono text-sm font-bold text-[#293B32]">{ex.finalAnswer}</span>
                        </div>
                        <div className="text-xs text-[#5F6C64] max-w-sm">
                          {ex.verificationNote}
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-[#FFF8F5] border border-[#FCD9BD] text-xs text-[#C05621] flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold">Common Pitfall: </span>
                          <span>{ex.commonMistake}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Integrated Common Mistakes Panel */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#DCE7E1]">
              <AlertTriangle className="w-5 h-5 text-[#C05621]" />
              <h3 className="font-editorial text-xl font-bold text-[#293B32]">
                Top Misconceptions and Exam Pitfalls
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.commonMistakes.map((m) => (
                <div key={m.id} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#C05621]">
                    <span className="w-2 h-2 rounded-full bg-[#C05621]" />
                    <span>Common Mistake</span>
                  </div>
                  <p className="text-xs font-bold text-[#293B32]">
                    {m.mistake}
                  </p>
                  <div className="p-2.5 rounded-lg bg-[#EBF3ED] text-xs text-[#285C49] font-mono font-medium">
                    <span className="font-bold">Correct Method: </span>{m.correctMethod}
                  </div>
                  <p className="text-[11px] text-[#5F6C64] leading-relaxed">
                    <span className="font-bold text-[#293B32]">Why: </span>{m.why}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: CHEAT SHEET                                                        */}
      {/* ========================================================================= */}
      {activeTab === 'cheat-sheet' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#285C49]" />
                <h2 className="font-editorial text-xl font-bold text-[#293B32]">
                  {data.cheatSheet.title}
                </h2>
              </div>
              <p className="text-xs text-[#5F6C64] mt-1">
                {data.cheatSheet.description}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#5F6C64]" />
                <input
                  type="text"
                  placeholder="Search laws..."
                  value={cheatSearch}
                  onChange={(e) => setCheatSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] text-xs font-mono text-[#293B32] focus:outline-none focus:border-[#285C49]"
                />
              </div>
              <button
                onClick={() => window.print()}
                className="p-2 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] text-[#5F6C64] hover:text-[#285C49] transition-colors cursor-pointer"
                title="Print Cheat Sheet"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cheat Sheet Table View */}
          <div className="space-y-6">
            {data.cheatSheet.groups.map((grp, gIdx) => {
              if (grp.isComplementGroup) {
                const matchingLaws = cheatSearch.trim() === ''
                  ? grp.laws
                  : grp.laws.filter(l => 
                      l.name.toLowerCase().includes(cheatSearch.toLowerCase()) ||
                      l.identity.toLowerCase().includes(cheatSearch.toLowerCase()) ||
                      (l.tip && l.tip.toLowerCase().includes(cheatSearch.toLowerCase()))
                    );

                if (matchingLaws.length === 0) return null;

                return (
                  <div key={gIdx} className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-3">
                    <div className="flex items-center justify-between border-b border-[#DCE7E1] pb-2">
                      <h3 className="font-editorial text-base font-bold text-[#293B32]">
                        {grp.name}
                      </h3>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#285C49] bg-[#EBF3ED] px-2 py-0.5 rounded">
                        Specialized Single Inversion & Involution
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-[#DCE7E1] text-[#5F6C64] font-mono">
                            <th className="py-2 px-3 font-bold w-1/3">Property Name</th>
                            <th className="py-2 px-3 font-bold w-1/3">Identity / Form</th>
                            <th className="py-2 px-3 font-bold w-1/3">When to Use / Meaning</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#DCE7E1]">
                          {matchingLaws.map((law, lIdx) => (
                            <tr key={lIdx} className="hover:bg-[#FAF8F5]/80">
                              <td className="py-2.5 px-3 font-editorial font-bold text-[#293B32]">
                                {law.name}
                              </td>
                              <td className="py-2.5 px-3 font-mono font-bold text-[#285C49] bg-[#EBF3ED]/30">
                                {law.identity}
                              </td>
                              <td className="py-2.5 px-3 text-[#5F6C64]">
                                {law.tip}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              }

              const matchingLaws = cheatSearch.trim() === ''
                ? grp.laws
                : grp.laws.filter(l => 
                    l.name.toLowerCase().includes(cheatSearch.toLowerCase()) ||
                    (l.orForm && l.orForm.toLowerCase().includes(cheatSearch.toLowerCase())) ||
                    (l.andForm && l.andForm.toLowerCase().includes(cheatSearch.toLowerCase()))
                  );

              if (matchingLaws.length === 0) return null;

              return (
                <div key={gIdx} className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-3">
                  <h3 className="font-editorial text-base font-bold text-[#293B32] border-b border-[#DCE7E1] pb-2">
                    {grp.name}
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-[#DCE7E1] text-[#5F6C64] font-mono">
                          <th className="py-2 px-3 font-bold w-1/4">Law Name</th>
                          <th className="py-2 px-3 font-bold w-1/4">OR Form</th>
                          <th className="py-2 px-3 font-bold w-1/4">AND / Dual Form</th>
                          <th className="py-2 px-3 font-bold w-1/4">When to Use</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#DCE7E1]">
                        {matchingLaws.map((law, lIdx) => (
                          <tr key={lIdx} className="hover:bg-[#FAF8F5]/80">
                            <td className="py-2.5 px-3 font-editorial font-bold text-[#293B32]">
                              {law.name}
                            </td>
                            <td className="py-2.5 px-3 font-mono font-bold text-[#285C49] bg-[#EBF3ED]/30">
                              {law.orForm}
                            </td>
                            <td className="py-2.5 px-3 font-mono font-bold text-[#92400E] bg-[#FEF3C7]/20">
                              {law.andForm}
                            </td>
                            <td className="py-2.5 px-3 text-[#5F6C64]">
                              {law.tip}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
