import React, { useState } from 'react';
import { BookOpen, Check, Search, Copy, Printer, Sparkles, Shield, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * Comprehensive Boolean Algebra Cheat Sheet Component
 * Digital Logic Design (DLD) - Unit 2
 * ZeroIndex Engineering Platform
 * 
 * Strict formatting: Zero em-dashes and zero en-dashes throughout.
 */

export const BOOLEAN_LAWS_CATEGORIES = [
  {
    category: "Fundamental Postulates & Basic Operations",
    description: "Axiomatic baseline defined by the Huntington postulates.",
    laws: [
      {
        name: "Identity Laws",
        orForm: "A + 0 = A",
        andForm: "A · 1 = A",
        explanation: "ORing with 0 or ANDing with 1 preserves the variable literal without change.",
        category: "Postulates"
      },
      {
        name: "Null / Domination Laws",
        orForm: "A + 1 = 1",
        andForm: "A · 0 = 0",
        explanation: "1 dominates OR (forcing output to 1); 0 dominates AND (forcing output to 0).",
        category: "Postulates"
      },
      {
        name: "Idempotent Laws",
        orForm: "A + A = A",
        andForm: "A · A = A",
        explanation: "Combining an element with itself yields itself. There are no coefficients or exponents.",
        category: "Postulates"
      },
      {
        name: "Complement Laws",
        orForm: "A + A' = 1",
        andForm: "A · A' = 0",
        explanation: "A variable combined with its complement spans the entire binary universe or collapses to 0.",
        category: "Postulates"
      },
      {
        name: "Involution Law",
        orForm: "(A')' = A",
        andForm: "-",
        explanation: "Double complementation restores the original variable literal.",
        category: "Postulates"
      },
      {
        name: "Constants Complements",
        orForm: "0' = 1",
        andForm: "1' = 0",
        explanation: "Complement of ground is VCC; complement of VCC is ground.",
        category: "Postulates"
      }
    ]
  },
  {
    category: "Algebraic Structure & Symmetries",
    description: "Properties governing term ordering, grouping, and distribution.",
    laws: [
      {
        name: "Commutative Laws",
        orForm: "A + B = B + A",
        andForm: "AB = BA",
        explanation: "The order of operands does not affect the logical outcome.",
        category: "Structure"
      },
      {
        name: "Associative Laws",
        orForm: "(A + B) + C = A + (B + C)",
        andForm: "(AB)C = A(BC)",
        explanation: "Grouping order in multi-input OR or AND gates is irrelevant.",
        category: "Structure"
      },
      {
        name: "Distributive Laws",
        orForm: "A(B + C) = AB + AC",
        andForm: "A + BC = (A + B)(A + C)",
        explanation: "AND distributes over OR, AND OR distributes over AND (unique to Boolean algebra!).",
        category: "Structure"
      }
    ]
  },
  {
    category: "Reduction, Absorption & Redundancy Laws",
    description: "The primary identities used for hardware simplification.",
    laws: [
      {
        name: "Absorption Law 1",
        orForm: "A + AB = A",
        andForm: "A(A + B) = A",
        explanation: "The single literal absorbs the longer product or sum term.",
        category: "Reduction"
      },
      {
        name: "Absorption Law 2 (Redundancy)",
        orForm: "A + A'B = A + B",
        andForm: "A(A' + B) = AB",
        explanation: "The complement literal in the compound term is eliminated.",
        category: "Reduction"
      },
      {
        name: "Combining / Adjacency Law",
        orForm: "AB + AB' = A",
        andForm: "(A + B)(A + B') = A",
        explanation: "Two adjacent terms differing by one variable eliminate that variable.",
        category: "Reduction"
      },
      {
        name: "De Morgan's Theorems",
        orForm: "(A + B)' = A'B'",
        andForm: "(AB)' = A' + B'",
        explanation: "The complement of a sum is a product of complements, and vice versa.",
        category: "DeMorgan"
      },
      {
        name: "Generalized De Morgan (n vars)",
        orForm: "(A1 + A2 + ... + An)' = A1'A2'...An'",
        andForm: "(A1A2...An)' = A1' + A2' + ... + An'",
        explanation: "Applies across any number of inputs. Swaps all operators and complements all literals.",
        category: "DeMorgan"
      },
      {
        name: "Consensus Theorem",
        orForm: "AB + A'C + BC = AB + A'C",
        andForm: "(A+B)(A'+C)(B+C) = (A+B)(A'+C)",
        explanation: "The consensus term BC is completely redundant and can be deleted.",
        category: "Reduction"
      }
    ]
  }
];

export const BooleanLawsCheatSheet = ({ onClose = null }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedLaw, setCopiedLaw] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedLaw(id);
    setTimeout(() => setCopiedLaw(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredCategories = BOOLEAN_LAWS_CATEGORIES.map(cat => {
    const filteredLaws = cat.laws.filter(law => 
      law.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      law.orForm.toLowerCase().includes(searchTerm.toLowerCase()) ||
      law.andForm.toLowerCase().includes(searchTerm.toLowerCase()) ||
      law.explanation.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return { ...cat, laws: filteredLaws };
  }).filter(cat => cat.laws.length > 0);

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
            Complete Boolean Algebra Cheat Sheet
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Axiomatic laws, dual forms, and reduction identities for instant examination lookup.
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

      {/* Search and Filter */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by law name, formula (e.g. A + AB), or keywords..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2E6F40] focus:bg-white transition-all"
        />
      </div>

      {/* Laws List */}
      <div className="space-y-6">
        {filteredCategories.map((cat, catIdx) => (
          <div key={catIdx} className="space-y-3">
            <div className="border-b border-[#F2F7F4] pb-1.5">
              <h3 className="text-sm font-bold text-[#1E293B] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E6F40]" />
                {cat.category}
              </h3>
              <p className="text-[11px] text-[#64748B]">{cat.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cat.laws.map((law, lawIdx) => {
                const lawId = `${catIdx}-${lawIdx}`;
                const isCopied = copiedLaw === lawId;
                const isExpanded = expandedCard === lawId;

                return (
                  <div
                    key={lawIdx}
                    className="p-4 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] hover:border-[#2E6F40]/40 transition-all space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1E293B]">{law.name}</span>
                      <button
                        onClick={() => handleCopy(`${law.name}: ${law.orForm} | Dual: ${law.andForm}`, lawId)}
                        className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-[#64748B] hover:text-[#2E6F40] transition-colors"
                        title="Copy formula"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3 h-3 text-[#2E6F40]" />
                            <span className="text-[#2E6F40]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Dual Columns */}
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div className="p-2 rounded-lg bg-white border border-[#DCE7E1]">
                        <span className="text-[10px] uppercase font-bold text-[#2E6F40] block mb-0.5">OR Form (+)</span>
                        <span className="text-[#1E293B] font-semibold">{law.orForm}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-white border border-[#DCE7E1]">
                        <span className="text-[10px] uppercase font-bold text-[#4F46E5] block mb-0.5">Dual Form (·)</span>
                        <span className="text-[#1E293B] font-semibold">{law.andForm}</span>
                      </div>
                    </div>

                    {/* Explanation */}
                    <p className="text-[11px] text-[#64748B] leading-relaxed">
                      {law.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Duality Reminder Footer */}
      <div className="p-4 rounded-xl bg-[#F2F7F4] border border-[#DCE7E1] text-xs text-[#2E6F40] flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block">Principle of Duality Reminder</span>
          <span className="text-[#64748B] text-[11px] leading-relaxed block mt-0.5">
            To construct the dual of any valid Boolean equality: Interchange all (+) with (·), interchange all 0 with 1, and leave all variable literals and complements strictly unchanged.
          </span>
        </div>
      </div>
    </div>
  );
};

export default BooleanLawsCheatSheet;
