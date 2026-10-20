import React, { useState } from 'react';
import { Layers, Grid, CheckCircle2, AlertTriangle, Printer, Sparkles, HelpCircle } from 'lucide-react';

/**
 * Complete Karnaugh Map Cheat Sheet & Revision Component
 * Digital Logic Design (DLD) - Unit 2
 * ZeroIndex Engineering Platform
 * 
 * Strict formatting: Zero em-dashes and zero en-dashes throughout.
 */

export const KMapCheatSheet = ({ onClose = null }) => {
  const [activeTab, setActiveTab] = useState('layouts');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-2xl border border-[#DCE7E1] shadow-sm p-6 space-y-6 text-left">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DCE7E1] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2E6F40]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E6F40]">
              UNIT-II Revision Standard
            </span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#1E293B] mt-1">
            Complete Karnaugh Map Cheat Sheet
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Gray code indexing topography, grouping topologies, literal elimination rules, and examination checklist.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DCE7E1] bg-[#FAF8F5] hover:bg-[#F2F7F4] text-xs font-semibold text-[#1E293B] transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-[#2E6F40]" />
            <span>Print Sheet</span>
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg border border-[#DCE7E1] bg-white hover:bg-[#FAF8F5] text-xs font-semibold text-[#64748B] transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#DCE7E1] pb-2">
        <button
          onClick={() => setActiveTab('layouts')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activeTab === 'layouts'
              ? 'bg-[#2E6F40] text-white'
              : 'text-[#64748B] hover:text-[#1E293B] bg-[#FAF8F5]'
          }`}
        >
          Grid Topographies & Layouts
        </button>
        <button
          onClick={() => setActiveTab('rules')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activeTab === 'rules'
              ? 'bg-[#2E6F40] text-white'
              : 'text-[#64748B] hover:text-[#1E293B] bg-[#FAF8F5]'
          }`}
        >
          Grouping Topologies & Power-of-Two Rules
        </button>
        <button
          onClick={() => setActiveTab('checklist')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activeTab === 'checklist'
              ? 'bg-[#2E6F40] text-white'
              : 'text-[#64748B] hover:text-[#1E293B] bg-[#FAF8F5]'
          }`}
        >
          Examination Procedure & Traps
        </button>
      </div>

      {/* Content Area */}
      {activeTab === 'layouts' && (
        <div className="space-y-6">
          {/* 2-Variable Map */}
          <div className="p-4 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#1E293B]">2-Variable K-Map (2 x 2 = 4 cells)</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white border border-[#DCE7E1] text-[#2E6F40]">
                Rows: A | Cols: B
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="border-collapse text-center text-xs font-mono">
                <thead>
                  <tr>
                    <th className="p-2 border border-[#DCE7E1] bg-[#F2F7F4] text-[#64748B]">A \ B</th>
                    <th className="p-2 border border-[#DCE7E1] bg-white font-bold text-[#2E6F40]">0</th>
                    <th className="p-2 border border-[#DCE7E1] bg-white font-bold text-[#2E6F40]">1</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border border-[#DCE7E1] bg-white font-bold text-[#4F46E5]">0</td>
                    <td className="p-2 border border-[#DCE7E1] bg-white">
                      <span className="font-bold text-[#1E293B]">m0</span>
                      <span className="text-[10px] text-[#64748B] block">A'B' (00)</span>
                    </td>
                    <td className="p-2 border border-[#DCE7E1] bg-white">
                      <span className="font-bold text-[#1E293B]">m1</span>
                      <span className="text-[10px] text-[#64748B] block">A'B (01)</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-[#DCE7E1] bg-white font-bold text-[#4F46E5]">1</td>
                    <td className="p-2 border border-[#DCE7E1] bg-white">
                      <span className="font-bold text-[#1E293B]">m2</span>
                      <span className="text-[10px] text-[#64748B] block">AB' (10)</span>
                    </td>
                    <td className="p-2 border border-[#DCE7E1] bg-white">
                      <span className="font-bold text-[#1E293B]">m3</span>
                      <span className="text-[10px] text-[#64748B] block">AB (11)</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 3-Variable Map */}
          <div className="p-4 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#1E293B]">3-Variable K-Map (2 x 4 = 8 cells)</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white border border-[#DCE7E1] text-[#2E6F40]">
                Rows: A | Cols: BC (Gray Code 00, 01, 11, 10)
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="border-collapse text-center text-xs font-mono">
                <thead>
                  <tr>
                    <th className="p-2 border border-[#DCE7E1] bg-[#F2F7F4] text-[#64748B]">A \ BC</th>
                    <th className="p-2 border border-[#DCE7E1] bg-white font-bold text-[#2E6F40]">00</th>
                    <th className="p-2 border border-[#DCE7E1] bg-white font-bold text-[#2E6F40]">01</th>
                    <th className="p-2 border border-[#DCE7E1] bg-[#FEF3C7] font-bold text-[#92400E]">11</th>
                    <th className="p-2 border border-[#DCE7E1] bg-white font-bold text-[#2E6F40]">10</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border border-[#DCE7E1] bg-white font-bold text-[#4F46E5]">0</td>
                    <td className="p-2 border border-[#DCE7E1] bg-white">
                      <span className="font-bold text-[#1E293B]">m0</span>
                      <span className="text-[10px] text-[#64748B] block">(000)</span>
                    </td>
                    <td className="p-2 border border-[#DCE7E1] bg-white">
                      <span className="font-bold text-[#1E293B]">m1</span>
                      <span className="text-[10px] text-[#64748B] block">(001)</span>
                    </td>
                    <td className="p-2 border border-[#DCE7E1] bg-[#FEF3C7]">
                      <span className="font-bold text-[#92400E]">m3</span>
                      <span className="text-[10px] text-[#92400E] block">(011)</span>
                    </td>
                    <td className="p-2 border border-[#DCE7E1] bg-white">
                      <span className="font-bold text-[#1E293B]">m2</span>
                      <span className="text-[10px] text-[#64748B] block">(010)</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-[#DCE7E1] bg-white font-bold text-[#4F46E5]">1</td>
                    <td className="p-2 border border-[#DCE7E1] bg-white">
                      <span className="font-bold text-[#1E293B]">m4</span>
                      <span className="text-[10px] text-[#64748B] block">(100)</span>
                    </td>
                    <td className="p-2 border border-[#DCE7E1] bg-white">
                      <span className="font-bold text-[#1E293B]">m5</span>
                      <span className="text-[10px] text-[#64748B] block">(101)</span>
                    </td>
                    <td className="p-2 border border-[#DCE7E1] bg-[#FEF3C7]">
                      <span className="font-bold text-[#92400E]">m7</span>
                      <span className="text-[10px] text-[#92400E] block">(111)</span>
                    </td>
                    <td className="p-2 border border-[#DCE7E1] bg-white">
                      <span className="font-bold text-[#1E293B]">m6</span>
                      <span className="text-[10px] text-[#64748B] block">(110)</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-[#64748B]">
              Exam Trap: Notice column 3 is 11 (m3, m7) and column 4 is 10 (m2, m6). Never write 10 before 11!
            </p>
          </div>

          {/* 4-Variable Map */}
          <div className="p-4 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#1E293B]">4-Variable K-Map (4 x 4 = 16 cells)</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white border border-[#DCE7E1] text-[#2E6F40]">
                Rows: AB | Cols: CD (Gray Code 00, 01, 11, 10 for both)
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="border-collapse text-center text-xs font-mono">
                <thead>
                  <tr>
                    <th className="p-2 border border-[#DCE7E1] bg-[#F2F7F4] text-[#64748B]">AB \ CD</th>
                    <th className="p-2 border border-[#DCE7E1] bg-white font-bold text-[#2E6F40]">00</th>
                    <th className="p-2 border border-[#DCE7E1] bg-white font-bold text-[#2E6F40]">01</th>
                    <th className="p-2 border border-[#DCE7E1] bg-[#FEF3C7] font-bold text-[#92400E]">11</th>
                    <th className="p-2 border border-[#DCE7E1] bg-white font-bold text-[#2E6F40]">10</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border border-[#DCE7E1] bg-white font-bold text-[#4F46E5]">00</td>
                    <td className="p-2 border border-[#DCE7E1] bg-[#EEF2FF] font-bold text-[#4F46E5]">m0</td>
                    <td className="p-2 border border-[#DCE7E1] bg-white">m1</td>
                    <td className="p-2 border border-[#DCE7E1] bg-white">m3</td>
                    <td className="p-2 border border-[#DCE7E1] bg-[#EEF2FF] font-bold text-[#4F46E5]">m2</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-[#DCE7E1] bg-white font-bold text-[#4F46E5]">01</td>
                    <td className="p-2 border border-[#DCE7E1] bg-white">m4</td>
                    <td className="p-2 border border-[#DCE7E1] bg-white">m5</td>
                    <td className="p-2 border border-[#DCE7E1] bg-white">m7</td>
                    <td className="p-2 border border-[#DCE7E1] bg-white">m6</td>
                  </tr>
                  <tr className="bg-[#FEF3C7]/40">
                    <td className="p-2 border border-[#DCE7E1] font-bold text-[#92400E]">11</td>
                    <td className="p-2 border border-[#DCE7E1] bg-white">m12</td>
                    <td className="p-2 border border-[#DCE7E1] bg-white">m13</td>
                    <td className="p-2 border border-[#DCE7E1] bg-white">m15</td>
                    <td className="p-2 border border-[#DCE7E1] bg-white">m14</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-[#DCE7E1] bg-white font-bold text-[#4F46E5]">10</td>
                    <td className="p-2 border border-[#DCE7E1] bg-[#EEF2FF] font-bold text-[#4F46E5]">m8</td>
                    <td className="p-2 border border-[#DCE7E1] bg-white">m9</td>
                    <td className="p-2 border border-[#DCE7E1] bg-white">m11</td>
                    <td className="p-2 border border-[#DCE7E1] bg-[#EEF2FF] font-bold text-[#4F46E5]">m10</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-[#64748B]">
              Highlighted blue cells {'{m0, m2, m8, m10}'} form the famous four-corner wraparound quad = B'D'.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'rules' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-4 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] space-y-2">
              <h4 className="text-xs font-bold text-[#2E6F40] uppercase">Literal Elimination Powers</h4>
              <ul className="text-xs text-[#1E293B] space-y-1 font-mono">
                <li>1 Cell (2^0): 0 variables eliminated (n literals)</li>
                <li>2 Cells (2^1, Pair): 1 variable eliminated (n-1 literals)</li>
                <li>4 Cells (2^2, Quad): 2 variables eliminated (n-2 literals)</li>
                <li>8 Cells (2^3, Octet): 3 variables eliminated (n-3 literals)</li>
                <li>16 Cells (2^4): 4 variables eliminated (Constant 1)</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] space-y-2">
              <h4 className="text-xs font-bold text-[#4F46E5] uppercase">SOP vs POS Conventions</h4>
              <ul className="text-xs text-[#1E293B] space-y-1">
                <li><span className="font-bold">SOP:</span> Group cells containing 1. Bit 1 = x, Bit 0 = x'. Product terms ORed.</li>
                <li><span className="font-bold">POS:</span> Group cells containing 0. Bit 0 = x, Bit 1 = x'. Sum terms ANDed.</li>
                <li><span className="font-bold">Don't-cares (X):</span> Treat as 1 (or 0) only if it enlarges an existing group.</li>
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] space-y-2">
            <h4 className="text-xs font-bold text-[#1E293B]">Prime Implicant Hierarchy</h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              <span className="font-bold text-[#1E293B]">Prime Implicant (PI):</span> A group that cannot be combined with any adjacent group to form a larger group.<br />
              <span className="font-bold text-[#2E6F40]">Essential Prime Implicant (EPI):</span> A PI containing at least one 1-cell that is not covered by any other PI. All EPIs MUST be in the final solution.<br />
              <span className="font-bold text-[#DC2626]">Redundant Implicant:</span> A group whose 1-cells are completely covered by other chosen groups. Must be deleted.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'checklist' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-[#DCE7E1] bg-[#F2F7F4] space-y-3">
            <h4 className="text-xs font-bold text-[#2E6F40] uppercase">Step-by-Step Exam Solving Procedure</h4>
            <ol className="text-xs text-[#1E293B] space-y-2 list-decimal list-inside leading-relaxed">
              <li>Draw the K-Map grid with correct Gray code headings (00, 01, 11, 10).</li>
              <li>Plot all given minterms (1), maxterms (0), and don't-cares (X) into their exact decimal index cells.</li>
              <li>Identify any isolated 1-cells (singletons) that have no adjacent neighbors.</li>
              <li>Find all Essential Prime Implicants (look for 1s with only one grouping option).</li>
              <li>Cover any remaining 1s using the largest possible valid groups (powers of two: 8, 4, 2).</li>
              <li>Check edge wrapping: left-right columns wrap; top-bottom rows wrap; four corners wrap into a quad.</li>
              <li>Inspect for redundancy: delete any group whose 1s are fully covered by other selected groups.</li>
              <li>Write the final minimized expression by recording the variables that remain constant in each group.</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

export default KMapCheatSheet;
