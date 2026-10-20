import React from 'react';
import { Calculator, CheckCircle2, BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import { dldSubjectResourcesData } from '../data/dldSubjectResourcesData';

/**
 * ContextualLearningStrip
 * ZeroIndex Engineering Platform - Digital Logic Design
 * Renders an unobtrusive action strip connecting:
 * LEARN -> EXPERIMENT (Solver) -> PRACTISE (Arena) -> REVISE (Formula Sheet)
 * Strictly zero em-dashes and zero en-dashes.
 */
export const ContextualLearningStrip = ({ 
  sectionId, 
  onNavigate,
  className = "" 
}) => {
  const linkConfig = dldSubjectResourcesData.contextualLearningMap[sectionId];
  if (!linkConfig) return null;

  const handleAction = (target) => {
    if (onNavigate && target) {
      onNavigate(target);
    }
  };

  return (
    <div className={`p-4 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Learning Loop Header */}
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-[#EBF3ED] text-[#285C49] flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#285C49] block">
              Connected Learning Loop
            </span>
            <span className="text-xs font-bold text-[#1E293B]">
              Master {linkConfig.title}: Experiment, Practise &amp; Revise
            </span>
          </div>
        </div>

        {/* Right: Three Contextual Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {linkConfig.solverTarget && (
            <button
              onClick={() => handleAction(linkConfig.solverTarget)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#F2F7F4] border border-[#DCE7E1] hover:border-[#285C49] text-xs font-semibold text-[#1E293B] hover:text-[#285C49] transition-all shadow-2xs"
              title={linkConfig.solverTarget.label}
            >
              <Calculator className="w-3.5 h-3.5 text-[#285C49]" />
              <span>{linkConfig.solverTarget.label}</span>
            </button>
          )}

          {linkConfig.practiceTarget && (
            <button
              onClick={() => handleAction(linkConfig.practiceTarget)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#F2F7F4] border border-[#DCE7E1] hover:border-[#285C49] text-xs font-semibold text-[#1E293B] hover:text-[#285C49] transition-all shadow-2xs"
              title={linkConfig.practiceTarget.label}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#285C49]" />
              <span>{linkConfig.practiceTarget.label}</span>
            </button>
          )}

          {linkConfig.resourceTarget && (
            <button
              onClick={() => handleAction(linkConfig.resourceTarget)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#F2F7F4] border border-[#DCE7E1] hover:border-[#285C49] text-xs font-semibold text-[#1E293B] hover:text-[#285C49] transition-all shadow-2xs"
              title={linkConfig.resourceTarget.label}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#285C49]" />
              <span>{linkConfig.resourceTarget.label}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContextualLearningStrip;
