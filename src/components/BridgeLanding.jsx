import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Briefcase, 
  Calculator, 
  CheckCircle2, 
  FileText, 
  Code2, 
  BrainCircuit, 
  HelpCircle,
  ExternalLink,
  BookOpen,
  CheckSquare,
  Square,
  Sparkles,
  ChevronRight,
  Target,
  GraduationCap
} from 'lucide-react';
import { 
  bridgePlacementDomains, 
  BRIDGE_DOMAIN_REGISTRY_MAP, 
  BRIDGE_SUBPATH_TO_DOMAIN_ID 
} from '../data/bridgePlacementConfig';
import { isItemPubliclyAccessible } from '../data/centralContentRegistry';

export const BridgeLanding = ({ 
  onNavigateHome, 
  onNavigateWorkbench,
  onNavigateSection,
  contentOverrides = {},
  isAdminPreview = false,
  initialDomainId = null
}) => {
  // Helper to determine whether an individual domain is accessible
  const isDomainAccessible = (dom) => {
    if (isAdminPreview) return true;
    const regId = dom.registryId || BRIDGE_DOMAIN_REGISTRY_MAP[dom.id];
    return isItemPubliclyAccessible(regId, contentOverrides);
  };

  // Helper to resolve an incoming slug or short alias to canonical domain id
  const resolveDomainId = (rawId) => {
    if (!rawId) return null;
    const clean = rawId.toLowerCase().trim();
    if (bridgePlacementDomains.some(d => d.id === clean)) return clean;
    if (BRIDGE_SUBPATH_TO_DOMAIN_ID[clean]) return BRIDGE_SUBPATH_TO_DOMAIN_ID[clean];
    return null;
  };

  // Filter accessible domains based on live Supabase / registry permissions
  const accessibleDomains = bridgePlacementDomains.filter(dom => isDomainAccessible(dom));

  // Initialize active domain to first publicly accessible domain
  const [activeDomainId, setActiveDomainId] = useState(() => {
    const resolved = resolveDomainId(initialDomainId);
    if (resolved) {
      const dom = bridgePlacementDomains.find(d => d.id === resolved);
      if (dom && isDomainAccessible(dom)) {
        return resolved;
      }
    }
    const firstValid = accessibleDomains[0];
    return firstValid ? firstValid.id : null;
  });
  
  // Track completed checklist items by domain in state (backed by localStorage if available)
  const [completedItems, setCompletedItems] = useState(() => {
    try {
      const saved = localStorage.getItem('zeroindex_bridge_checklist');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Ensure activeDomainId always remains valid and resets if active domain becomes hidden
  useEffect(() => {
    const resolved = resolveDomainId(initialDomainId);
    if (resolved) {
      const dom = bridgePlacementDomains.find(d => d.id === resolved);
      if (dom && isDomainAccessible(dom)) {
        setActiveDomainId(resolved);
        return;
      }
    }
    const currentDom = bridgePlacementDomains.find(d => d.id === activeDomainId);
    if (!currentDom || !isDomainAccessible(currentDom)) {
      if (accessibleDomains.length > 0) {
        setActiveDomainId(accessibleDomains[0].id);
      } else {
        setActiveDomainId(null);
      }
    }
  }, [initialDomainId, accessibleDomains, contentOverrides, isAdminPreview]);

  const toggleChecklistItem = (domainId, itemIndex) => {
    setCompletedItems(prev => {
      const domainKey = domainId;
      const currentList = prev[domainKey] || [];
      const updatedList = currentList.includes(itemIndex)
        ? currentList.filter(i => i !== itemIndex)
        : [...currentList, itemIndex];
      
      const newState = { ...prev, [domainKey]: updatedList };
      try {
        localStorage.setItem('zeroindex_bridge_checklist', JSON.stringify(newState));
      } catch {}
      return newState;
    });
  };

  const handleSelectDomain = (domainId) => {
    const dom = bridgePlacementDomains.find(d => d.id === domainId);
    if (dom && isDomainAccessible(dom)) {
      setActiveDomainId(domainId);
    }
  };

  const currentDomain = accessibleDomains.find(d => d.id === activeDomainId) || accessibleDomains[0] || null;

  const domainCompletedIndices = currentDomain ? (completedItems[currentDomain.id] || []) : [];
  const completedCount = domainCompletedIndices.length;
  const totalCount = currentDomain ? currentDomain.checklist.length : 0;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleWorkbenchLink = (route) => {
    if (route && onNavigateWorkbench) {
      if (route.startsWith('workspace') && onNavigateSection) {
        onNavigateSection(route);
      } else {
        onNavigateWorkbench();
      }
    }
  };

  // Clean Empty State when all 7 domains are hidden while Bridge pillar remains Public
  if (accessibleDomains.length === 0 && !isAdminPreview) {
    return (
      <div className="min-h-screen bg-[#F7F5EF] text-[#25352D] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          
          {/* Breadcrumb Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DDE2DA]">
            <nav className="flex items-center gap-2 text-xs font-technical text-[#5F6C64]">
              <button 
                onClick={onNavigateHome}
                className="hover:text-[#245B4B] transition-colors cursor-pointer flex items-center gap-1 font-semibold"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>ZeroIndex</span>
              </button>
              <span className="text-[#DDE2DA]">/</span>
              <span className="text-[#956A43] font-bold">03 The Bridge</span>
            </nav>

            <span className="font-technical text-[11px] text-[#5F6C64]">
              Training, Placements &amp; Professional Readiness
            </span>
          </div>

          {/* Section Header */}
          <div className="space-y-3 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1E5D9] border border-[#956A43]/30 text-xs font-technical font-bold text-[#956A43]">
              <span>PILLAR 03</span>
              <span>·</span>
              <span>CAREER READINESS</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl font-bold tracking-tight text-[#25352D]">
              The Bridge
            </h1>
            <p className="font-editorial italic text-lg sm:text-xl text-[#5F6C64] max-w-2xl leading-relaxed">
              "Practice and preparation for the move into professional work."
            </p>
          </div>

          {/* Empty State Card */}
          <div className="bg-white rounded-3xl border border-[#DDE2DA] shadow-soft p-10 sm:p-14 text-center space-y-6 max-w-2xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-[#F1E5D9] text-[#956A43] flex items-center justify-center mx-auto">
              <Briefcase className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h2 className="font-editorial text-2xl font-bold text-[#25352D]">
                Career Readiness Modules Under Review
              </h2>
              <p className="text-sm text-[#5F6C64] leading-relaxed max-w-lg mx-auto">
                The preparation domains in this section are currently being updated by faculty. Please check back soon or explore our foundational subjects on The Workbench.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={onNavigateWorkbench}
                className="px-4 py-2.5 rounded-xl bg-[#245B4B] hover:bg-[#28755E] text-white text-xs font-technical font-semibold transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <span>Explore The Workbench</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onNavigateHome}
                className="px-4 py-2.5 rounded-xl bg-[#F0F1EB] hover:bg-[#E5E7DF] text-[#25352D] text-xs font-technical font-semibold transition-all cursor-pointer"
              >
                Return to ZeroIndex Home
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#25352D] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Admin Preview Mode Notice Banner */}
        {isAdminPreview && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-technical flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
              <span>
                <strong>Admin Preview Mode:</strong> Viewing all {bridgePlacementDomains.length} domains including hidden tracks. Public visitors see only the {accessibleDomains.length} published domains.
              </span>
            </div>
            <span className="text-[11px] text-amber-700 bg-amber-100/70 px-2.5 py-1 rounded-md shrink-0 self-start sm:self-auto">
              AAL2 Verified Session
            </span>
          </div>
        )}

        {/* Breadcrumb Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DDE2DA]">
          <nav className="flex items-center gap-2 text-xs font-technical text-[#5F6C64]">
            <button 
              onClick={onNavigateHome}
              className="hover:text-[#245B4B] transition-colors cursor-pointer flex items-center gap-1 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>ZeroIndex</span>
            </button>
            <span className="text-[#DDE2DA]">/</span>
            <span className="text-[#956A43] font-bold">03 The Bridge</span>
            {currentDomain && (
              <>
                <span className="text-[#DDE2DA]">/</span>
                <span className="text-[#5F6C64] truncate max-w-[200px]">
                  {currentDomain.shortTitle}
                </span>
              </>
            )}
          </nav>

          <span className="font-technical text-[11px] text-[#5F6C64]">
            Training, Placements &amp; Professional Readiness
          </span>
        </div>

        {/* Section Header */}
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1E5D9] border border-[#956A43]/30 text-xs font-technical font-bold text-[#956A43]">
            <span>PILLAR 03</span>
            <span>·</span>
            <span>CAREER READINESS</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold tracking-tight text-[#25352D]">
            The Bridge
          </h1>
          <p className="font-editorial italic text-lg sm:text-xl text-[#5F6C64] max-w-2xl leading-relaxed">
            "Practice and preparation for the move into professional work."
          </p>
        </div>

        {/* Dynamic Preparation Domains Tab Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 text-left">
          {accessibleDomains.map((dom, idx) => {
            const isSelected = activeDomainId === dom.id;
            const domainDone = (completedItems[dom.id] || []).length;
            const domainTotal = dom.checklist.length;
            const isDomainPublic = isItemPubliclyAccessible(dom.registryId, contentOverrides);

            return (
              <button
                key={dom.id}
                onClick={() => handleSelectDomain(dom.id)}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#956A43] shadow-soft ring-1 ring-[#956A43]'
                    : 'bg-white/70 hover:bg-white border-[#DDE2DA] text-[#5F6C64]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-technical text-[10px] font-bold uppercase tracking-wider text-[#956A43]">
                      Domain 0{idx + 1}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {isAdminPreview && (
                        <span className={`text-[9px] font-technical px-1.5 py-0.5 rounded ${
                          isDomainPublic 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-amber-100 text-amber-800 font-semibold'
                        }`}>
                          {isDomainPublic ? 'Public' : 'Hidden'}
                        </span>
                      )}
                      <span className="text-[10px] font-technical px-2 py-0.5 rounded-full bg-[#F0F1EB] text-[#5F6C64]">
                        {domainDone}/{domainTotal} done
                      </span>
                    </div>
                  </div>

                  <h3 className="font-editorial text-sm sm:text-base font-bold text-[#25352D] mb-1 line-clamp-1">
                    {dom.shortTitle}
                  </h3>

                  <p className="text-[11px] text-[#5F6C64] line-clamp-2 leading-relaxed">
                    {dom.summary}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#E6E8E1] text-xs font-semibold text-[#956A43] flex items-center justify-between">
                  <span className="text-[11px] font-technical">{dom.badge}</span>
                  <span className="text-[11px] font-bold">
                    {isSelected ? 'Active ●' : 'Select →'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Domain Workspace */}
        {currentDomain && (
          <div className="bg-white rounded-3xl border border-[#DDE2DA] shadow-soft p-6 sm:p-10 space-y-8 text-left">
            
            {/* Admin Notice for Hidden Domain inside Preview */}
            {isAdminPreview && !isItemPubliclyAccessible(currentDomain.registryId, contentOverrides) && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-technical flex items-center gap-2">
                <span className="font-bold">Hidden Domain Notice:</span>
                <span>"{currentDomain.shortTitle}" is currently Hidden in the Admin Dashboard and inaccessible to public visitors.</span>
              </div>
            )}
            
            {/* Domain Header & Overview */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E6E8E1]">
              <div className="space-y-2 max-w-3xl">
                <span className="font-technical text-xs font-bold text-[#956A43] uppercase tracking-wider block">
                  Campus Placement Preparation Guide · {currentDomain.category}
                </span>
                <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-[#25352D]">
                  {currentDomain.title}
                </h2>
                <p className="text-sm sm:text-base text-[#5F6C64] leading-relaxed">
                  {currentDomain.overview}
                </p>
              </div>

              {/* Preparation Progress Widget */}
              <div className="p-4 rounded-2xl bg-[#F7F5EF] border border-[#DDE2DA] font-technical text-xs space-y-2 lg:text-right shrink-0 min-w-[200px]">
                <div className="flex items-center justify-between lg:justify-end gap-2">
                  <span className="text-[#5F6C64]">Checklist Progress:</span>
                  <strong className="text-[#956A43]">{completedCount} of {totalCount}</strong>
                </div>
                <div className="w-full bg-[#E6E8E1] h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#956A43] h-full transition-all duration-300" 
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="text-[10px] text-[#69766D] block">
                  {progressPercent}% preparation milestones completed
                </span>
              </div>
            </div>

          {/* Section 1: Core Competency Breakdown */}
          <div className="space-y-4">
            <h3 className="font-technical text-xs font-bold uppercase tracking-wider text-[#956A43]">
              Key Competency Tracks ({currentDomain.competencyTracks.length} Areas)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentDomain.competencyTracks.map((tr, tIdx) => (
                <div 
                  key={tIdx}
                  className="p-4 sm:p-5 rounded-2xl bg-[#F7F5EF] border border-[#DDE2DA] space-y-2 hover:border-[#956A43]/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-white border border-[#DDE2DA] flex items-center justify-center font-technical text-[10px] text-[#956A43] font-bold shrink-0">
                      {tIdx + 1}
                    </span>
                    <h4 className="font-editorial text-base font-bold text-[#25352D]">
                      {tr.trackName}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[#5F6C64] leading-relaxed pl-7">
                    {tr.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Formulas, Cheat Sheets & Rules of Thumb */}
          {currentDomain.formulasAndRules && currentDomain.formulasAndRules.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-[#E6E8E1]">
              <h3 className="font-technical text-xs font-bold uppercase tracking-wider text-[#956A43]">
                High-Yield Formulas &amp; Frameworks
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentDomain.formulasAndRules.map((f, fIdx) => (
                  <div 
                    key={fIdx}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DDE2DA] space-y-2.5 shadow-2xs"
                  >
                    <span className="font-technical text-xs font-bold text-[#25352D] block">
                      {f.ruleTitle}
                    </span>
                    <div className="p-3 rounded-xl bg-[#F7F5EF] border border-[#E6E8E1] font-technical text-xs text-[#956A43] font-semibold break-words">
                      {f.ruleFormula}
                    </div>
                    <p className="text-xs text-[#5F6C64] leading-relaxed">
                      {f.ruleNote}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 3: Interactive Practice & Readiness Checklist */}
          <div className="space-y-4 pt-4 border-t border-[#E6E8E1]">
            <div className="flex items-center justify-between">
              <h3 className="font-technical text-xs font-bold uppercase tracking-wider text-[#956A43]">
                Practical Preparation Checklist
              </h3>
              <span className="font-technical text-[11px] text-[#5F6C64]">
                Click items to toggle completion
              </span>
            </div>

            <div className="space-y-2">
              {currentDomain.checklist.map((item, idx) => {
                const isChecked = domainCompletedIndices.includes(idx);
                return (
                  <div 
                    key={idx}
                    onClick={() => toggleChecklistItem(currentDomain.id, idx)}
                    className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                      isChecked
                        ? 'bg-[#E0EBDF]/40 border-[#245B4B]/30 text-[#25352D]'
                        : 'bg-[#F7F5EF] hover:bg-white border-[#DDE2DA] text-[#5F6C64]'
                    }`}
                  >
                    <div className="pt-0.5 shrink-0 text-[#956A43]">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-[#245B4B]" />
                      ) : (
                        <Square className="w-4 h-4 text-[#DDE2DA]" />
                      )}
                    </div>
                    <span className={`text-xs sm:text-sm leading-relaxed ${
                      isChecked ? 'line-through text-[#69766D]' : 'text-[#25352D]'
                    }`}>
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 4: ZeroIndex Cross-Link Area */}
          {currentDomain.zeroIndexLink && (
            <div className="pt-4 border-t border-[#E6E8E1] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-technical text-xs">
              <div className="text-[#5F6C64]">
                <span>Correlated ZeroIndex Subject: </span>
                <strong className={currentDomain.zeroIndexLink.available ? 'text-[#245B4B]' : 'text-[#64748B]'}>
                  {currentDomain.zeroIndexLink.label}
                </strong>
              </div>

              {currentDomain.zeroIndexLink.available && currentDomain.zeroIndexLink.sectionRoute ? (
                <button
                  onClick={() => handleWorkbenchLink(currentDomain.zeroIndexLink.sectionRoute)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#245B4B] hover:bg-[#28755E] text-white font-semibold transition-all inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shadow-2xs"
                >
                  <span>Open Workbench Subject</span>
                  <span>→</span>
                </button>
              ) : (
                <span className="text-[11px] text-[#64748B] italic">
                  Additional practice modules planned
                </span>
              )}
            </div>
          )}

        </div>
      )}

      </div>
    </div>
  );
};

export default BridgeLanding;
