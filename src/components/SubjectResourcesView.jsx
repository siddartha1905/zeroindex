import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  ExternalLink, 
  GraduationCap, 
  Award, 
  FileText, 
  Video, 
  Globe, 
  Calculator, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Clock, 
  ChevronDown, 
  ChevronRight, 
  FolderOpen,
  ArrowUpRight
} from 'lucide-react';
import { dldSyllabus } from '../data/dldSyllabus';
import { dldSubjectResourcesData, dldFacultyStudyMaterials } from '../data/dldSubjectResourcesData';
import { ViitCrest } from './ViitCrest';
import { fetchPublishedResources } from '../services/resourceManagerService';

/**
 * SubjectResourcesView
 * ZeroIndex Engineering Platform - Digital Logic Design (DLD)
 * Phase 5B.11 Professional Academic Resource Library
 * Exactly 5 Tabs: Curriculum & Syllabus, Textbooks & Materials, Channels, Websites, Calculators.
 * Strictly zero em-dashes and zero en-dashes throughout.
 * Mandatory Unicode Sigma (\u03A3) and Pi (\u03A0).
 */
export const SubjectResourcesView = () => {
  const [activeTab, setActiveTab] = useState('curriculum-syllabus');
  const [selectedFacultyUnit, setSelectedFacultyUnit] = useState(1);
  const [expandedSyllabusUnits, setExpandedSyllabusUnits] = useState({
    1: true,
    2: true,
    3: false,
    4: false,
    5: false
  });

  // Dynamic published resources loaded from persistent store / session cache
  const [publishedResources, setPublishedResources] = useState({
    publishedMap: {},
    items: [],
    isLoaded: false
  });

  useEffect(() => {
    let isMounted = true;
    async function loadPublished() {
      try {
        const res = await fetchPublishedResources('dld');
        if (isMounted) {
          setPublishedResources({
            publishedMap: res.publishedMap || {},
            items: res.items || [],
            isLoaded: true
          });
        }
      } catch {
        if (isMounted) {
          setPublishedResources(prev => ({ ...prev, isLoaded: true }));
        }
      }
    }
    loadPublished();
    return () => { isMounted = false; };
  }, []);

  const toggleSyllabusUnit = (unitNum) => {
    setExpandedSyllabusUnits(prev => ({
      ...prev,
      [unitNum]: !prev[unitNum]
    }));
  };

  const resourceTabs = [
    { id: 'curriculum-syllabus', label: '1. Curriculum & Syllabus', icon: Award },
    { id: 'textbooks-materials', label: '2. Textbooks & Study Materials', icon: GraduationCap },
    { id: 'educational-channels', label: '3. Educational Channels', icon: Video },
    { id: 'reference-websites', label: '4. Reference Websites', icon: Globe },
    { id: 'online-calculators', label: '5. Online Calculators', icon: Calculator }
  ];

  const { studyMaterials, educationalChannels, referenceWebsites, onlineCalculators } = dldSubjectResourcesData;
  const facultyUnits = dldFacultyStudyMaterials || studyMaterials.facultyStudyMaterials || [];
  const currentFacultyUnitData = facultyUnits.find(u => u.unitNumber === selectedFacultyUnit) || facultyUnits[0];

  // Helper to extract published PDF materials for a specific unit (supports dynamic N files)
  const getUnitPdfs = (unitNum) => {
    if (publishedResources.isLoaded) {
      return publishedResources.items.filter(
        r => r.category === 'pdf_materials' && Number(r.unit_number) === Number(unitNum)
      );
    }
    const staticUnit = facultyUnits.find(fu => fu.unitNumber === unitNum);
    return (staticUnit?.pdfMaterials || []).filter(f => f.url);
  };

  // Helper to extract published PPT materials for a specific unit (supports dynamic N files)
  const getUnitPpts = (unitNum) => {
    if (publishedResources.isLoaded) {
      return publishedResources.items.filter(
        r => r.category === 'ppt_materials' && Number(r.unit_number) === Number(unitNum)
      );
    }
    const staticUnit = facultyUnits.find(fu => fu.unitNumber === unitNum);
    return (staticUnit?.pptMaterials || []).filter(f => f.url);
  };

  // Dynamic official syllabus PDF link (admin managed)
  const officialSyllabusDoc = publishedResources.publishedMap['dld-syllabus-pdf'];
  const officialSyllabusUrl = officialSyllabusDoc?.url || dldSyllabus.syllabusPdfUrl;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 text-slate-800 text-left animate-in fade-in duration-150">
      
      {/* 1. ACADEMIC HEADER BANNER */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs relative overflow-hidden space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ViitCrest className="w-6 h-6 flex-shrink-0" />
            <span className="text-xs font-bold text-[#285C49]">Vignan's Institute of Information Technology (Autonomous)</span>
            <span className="text-xs text-[#64748B]">Curriculum Resource Library</span>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#F2F7F4] text-[#285C49] border border-[#DCE7E1]">
              Course Code: {dldSyllabus.courseCode}
            </span>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#FAF8F5] text-[#1E293B] border border-[#DCE7E1]">
              {dldSyllabus.ltpc}
            </span>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#FAF8F5] text-[#1E293B] border border-[#DCE7E1]">
              {dldSyllabus.credits} Credits
            </span>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#FAF8F5] text-[#285C49] border border-[#DCE7E1]">
              Regulation: {dldSyllabus.curriculum || "VR23"}
            </span>
          </div>
        </div>

        <div className="max-w-4xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase text-[#285C49] bg-[#EBF3ED] px-2 py-0.5 rounded">
              Academic Library
            </span>
            <span className="text-xs text-[#64748B]">Digital Logic Design Official Repository</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] tracking-tight">
            {dldSyllabus.courseTitle}
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] font-mono">
            {dldSyllabus.yearSem} · {dldSyllabus.branch}
          </p>
          <div className="pt-2">
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed bg-[#FAF8F5] p-3.5 rounded-xl border border-[#DCE7E1]">
              {dldSyllabus.overview}
            </p>
          </div>
        </div>
      </div>

      {/* 2. RESPONSIVE FIVE-TAB NAVIGATION BAR (0 horizontal dragging on mobile) */}
      <nav 
        aria-label="Subject Resources Navigation"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5 p-1.5 bg-[#FAF8F5] border border-[#DCE7E1] rounded-2xl shadow-2xs"
      >
        {resourceTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center gap-1.5 px-2.5 py-2.5 rounded-xl font-mono text-xs font-semibold text-center transition-all cursor-pointer leading-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-[#285C49] ${
                isActive
                  ? 'bg-white text-[#285C49] shadow-xs border border-[#DCE7E1] font-bold ring-1 ring-[#285C49]/20'
                  : 'text-[#5F6C64] hover:text-[#1E293B] hover:bg-white/60'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-[#285C49]' : 'text-[#8C9A90]'}`} />
              <span className="text-center">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* ==================================================================== */}
      {/* TAB 1: CURRICULUM & SYLLABUS                                         */}
      {/* ==================================================================== */}
      {activeTab === 'curriculum-syllabus' && (
        <div className="space-y-6">
          
          {/* Official Syllabus Document Card */}
          <div className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F2F7F4]">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#285C49]" />
                <div>
                  <h2 className="text-base font-bold text-[#1E293B]">Official Curriculum Syllabus Document</h2>
                  <p className="text-xs text-[#64748B]">Department of Computer Science and Engineering / Data Science</p>
                </div>
              </div>
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold ${
                officialSyllabusUrl
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-[#FAF8F5] text-slate-600 border border-[#DCE7E1]'
              }`}>
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>{officialSyllabusUrl ? 'Official PDF Available' : 'Link not yet added'}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              The official two-page course syllabus issued by the Board of Studies (Course Code: {dldSyllabus.courseCode}) serves as the authoritative academic blueprint. When the verified Google Drive sharing URL is supplied by the faculty owner, direct PDF access will be enabled below.
            </p>

            <div className="pt-1">
              {officialSyllabusUrl ? (
                <a
                  href={officialSyllabusUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#285C49] hover:bg-[#1E4738] text-white text-xs font-bold transition-all shadow-2xs"
                >
                  <FileText className="w-4 h-4" />
                  <span>View Official Syllabus PDF</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] text-xs font-mono text-slate-600">
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span className="font-semibold text-slate-700">View Official Syllabus PDF:</span>
                  <span className="text-slate-500">Link not yet added</span>
                </div>
              )}
            </div>
          </div>

          {/* Course Objectives Card */}
          <div className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#285C49]" />
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#285C49]">
                Course Educational Objectives
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {dldSyllabus.objectives.map((obj, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1.5">
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[#EBF3ED] text-[#285C49]">
                    Objective {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-snug">
                    {obj}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-[11px] font-mono text-slate-500 pt-1">
              Authoritative course objectives sourced directly from the official DLD syllabus document.
            </p>
          </div>

          {/* Course Outcomes (COs) Card */}
          <div className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#285C49]" />
                <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#285C49]">
                  Course Outcomes (COs)
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-500">Bloom's Taxonomy Aligned</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {dldSyllabus.outcomes.map((co) => (
                <div key={co.code} className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#285C49] text-white">
                      {co.code}
                    </span>
                    <span className="text-[11px] font-mono text-[#64748B]">
                      {co.targetUnit}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-snug">
                    {co.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Unit-wise Detailed Syllabus (Units I through V) */}
          <div className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#285C49]" />
                <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#285C49]">
                  Unit-Wise Syllabus (Units I to V)
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-500">Autonomous 45-Hour Lecture Model</span>
            </div>

            <div className="space-y-3">
              {dldSyllabus.units.map((unit) => {
                const isExpanded = expandedSyllabusUnits[unit.unitNumber];
                return (
                  <div 
                    key={unit.unitNumber}
                    className="rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => toggleSyllabusUnit(unit.unitNumber)}
                      className="w-full flex items-center justify-between p-3.5 text-left cursor-pointer hover:bg-white/80 transition-colors"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#285C49] text-white">
                          {unit.roman}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-[#1E293B]">
                          {unit.title}
                        </span>
                        <span className="text-[11px] font-mono text-[#64748B]">
                          ({unit.hours} · {unit.courseOutcome})
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-white text-slate-600 border border-[#DCE7E1]">
                          {unit.topics.length} Topics
                        </span>
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-slate-500" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-slate-500" />
                        )}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="p-4 bg-white border-t border-[#DCE7E1] space-y-3">
                        <p className="text-xs text-slate-600 leading-relaxed italic">
                          Summary: {unit.summary}
                        </p>
                        <div>
                          <span className="text-[11px] font-mono font-bold uppercase text-slate-500 block mb-1.5">
                            Curriculum Topics:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {unit.topics.map((topic, tIdx) => (
                              <div 
                                key={tIdx}
                                className="flex items-start gap-1.5 p-2 rounded-lg bg-[#FAF8F5] border border-[#E5ECE8] text-xs text-slate-700"
                              >
                                <span className="font-mono text-[#285C49] text-[10px] mt-0.5">•</span>
                                <span className="leading-snug">{topic}</span>
                              </div>
                            ))}
                          </div>
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

      {/* ==================================================================== */}
      {/* TAB 2: TEXTBOOKS & STUDY MATERIALS                                   */}
      {/* ==================================================================== */}
      {activeTab === 'textbooks-materials' && (
        <div className="space-y-6">
          
          {/* DIVISION A: TEXTBOOKS */}
          <div className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-5">
            <div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#285C49]" />
                <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#285C49]">
                  Division A: Prescribed &amp; Reference Textbooks
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Verified bibliographic information from curriculum blueprints. Final lists subject to confirmation against the official syllabus document.
              </p>
            </div>

            {/* Prescribed Textbooks */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#285C49]" />
                <span>Prescribed Textbooks (Autonomous Blueprint)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {studyMaterials.textbooks.map((tb) => {
                  const publishedTb = publishedResources.publishedMap[tb.id];
                  const tbUrl = publishedTb?.url || tb.driveLink;
                  const isTbAvailable = Boolean(tbUrl);
                  return (
                    <div key={tb.id} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[#EBF3ED] text-[#285C49]">
                            Prescribed #{tb.number}
                          </span>
                          <span className="text-[11px] font-mono text-slate-500">
                            {tb.edition} {tb.year ? `· ${tb.year}` : ''}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-[#1E293B] leading-snug">
                          {tb.title}
                        </h4>
                        <p className="text-xs font-medium text-slate-700">
                          Authors: {tb.authors}
                        </p>
                        <p className="text-xs text-slate-500 font-mono">
                          Publisher: {tb.publisher} {tb.isbn ? `· ISBN: ${tb.isbn}` : ''}
                        </p>
                        <p className="text-xs text-slate-600 leading-relaxed pt-1">
                          {tb.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[#E5ECE8] flex items-center justify-between">
                        <span className="text-[11px] font-mono text-slate-500 font-medium">
                          {isTbAvailable ? 'Official Textbook Access' : (tb.statusText || 'Link not yet added')}
                        </span>
                        {isTbAvailable ? (
                          <a
                            href={tbUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#285C49] hover:bg-[#1E4738] text-white text-xs font-bold transition-all shadow-2xs"
                          >
                            <span>Open Textbook</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <span className="text-[11px] font-mono text-slate-400">
                            Authorized link pending
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reference Textbooks */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                <span>Reference Textbooks &amp; Supplementary Literature</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {studyMaterials.referenceBooks.map((rb) => {
                  const publishedRb = publishedResources.publishedMap[rb.id];
                  const rbUrl = publishedRb?.url || rb.driveLink;
                  const isRbAvailable = Boolean(rbUrl);
                  return (
                    <div key={rb.id} className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white text-slate-600 border border-[#DCE7E1]">
                            Reference #{rb.number}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {rb.edition || 'Standard Reference'}
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#1E293B] leading-snug">
                          {rb.title}
                        </h4>
                        <p className="text-[11px] text-slate-600">
                          {rb.authors}
                        </p>
                        <p className="text-[11px] font-mono text-slate-500">
                          Publisher: {rb.publisher}
                        </p>
                        <p className="text-[11px] text-slate-600 leading-tight">
                          {rb.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[#E5ECE8] flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-400">
                          {isRbAvailable ? 'Digital Copy Available' : 'Reference in Library'}
                        </span>
                        {isRbAvailable && (
                          <a
                            href={rbUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#285C49] hover:bg-[#1E4738] text-white text-[11px] font-bold transition-all shadow-2xs"
                          >
                            <span>Open Book</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* DIVISION B: FACULTY STUDY MATERIALS (TWO CATEGORY CARDS PER UNIT) */}
          <div className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-5">
            <div>
              <div className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-[#285C49]" />
                <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#285C49]">
                  Division B: Faculty Study Materials (Google Drive Hosted)
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Unit-wise classroom documentation. Exactly two material categories per unit: PDF Materials and PPT Materials. All links are managed centrally.
              </p>
            </div>

            {/* Unit Selector Strip */}
            <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-[#F2F7F4]">
              {facultyUnits.map((u) => {
                const isSelected = selectedFacultyUnit === u.unitNumber;
                const unitPdfs = getUnitPdfs(u.unitNumber);
                const unitPpts = getUnitPpts(u.unitNumber);
                const fileCount = unitPdfs.length + unitPpts.length;
                return (
                  <button
                    key={u.unitNumber}
                    onClick={() => setSelectedFacultyUnit(u.unitNumber)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#285C49] text-white shadow-2xs'
                        : 'bg-[#FAF8F5] border border-[#DCE7E1] text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>{u.roman}</span>
                    <span className={`text-[10px] px-1 py-0.2 rounded font-normal ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {fileCount} {fileCount === 1 ? 'File' : 'Files'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Unit Resource Grid: Exactly TWO Category Cards per Unit */}
            {currentFacultyUnitData && (() => {
              const activePdfs = getUnitPdfs(selectedFacultyUnit);
              const activePpts = getUnitPpts(selectedFacultyUnit);

              return (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1]">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#285C49] text-white">
                          {currentFacultyUnitData.roman}
                        </span>
                        <h3 className="text-sm font-bold text-[#1E293B]">
                          {currentFacultyUnitData.title}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {currentFacultyUnitData.notice}
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">
                      Host: Google Drive
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Category Card 1: PDF Materials */}
                    <div className="p-5 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4 flex flex-col justify-between hover:border-[#285C49]/40 transition-colors">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between pb-3 border-b border-[#F2F7F4]">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#285C49]" />
                            <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-[#1E293B]">
                              PDF Materials
                            </h4>
                          </div>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#EBF3ED] text-[#285C49] font-bold">
                            {activePdfs.length} {activePdfs.length === 1 ? 'File' : 'Files'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600">
                          Official lecture notes and supplementary PDF documents for {currentFacultyUnitData.roman}.
                        </p>

                        {/* PDF Documents List (Supports dynamic published entries or concise empty notice) */}
                        {activePdfs.length > 0 ? (
                          <div className="space-y-3 pt-1">
                            {activePdfs.map((file) => (
                              <div 
                                key={file.id}
                                className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2.5"
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#EBF3ED] text-[#285C49]">
                                        PDF
                                      </span>
                                      <h5 className="text-xs sm:text-sm font-bold text-[#1E293B]">
                                        {file.title}
                                      </h5>
                                    </div>
                                    {file.description && (
                                      <p className="text-xs text-slate-600 leading-snug">
                                        {file.description}
                                      </p>
                                    )}
                                  </div>
                                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded flex-shrink-0 bg-emerald-100 text-emerald-800">
                                    Available
                                  </span>
                                </div>

                                <div className="pt-2 border-t border-[#E5ECE8] flex items-center justify-between">
                                  <span className="text-[11px] font-mono text-slate-400">
                                    Host: Google Drive
                                  </span>
                                  <a
                                    href={file.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#285C49] hover:bg-[#1E4738] text-white text-xs font-bold transition-all shadow-2xs"
                                  >
                                    <span>Open PDF</span>
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </a>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-6 rounded-xl bg-[#FAF8F5] border border-dashed border-[#DCE7E1] text-center space-y-1.5 my-auto">
                            <FileText className="w-6 h-6 text-slate-400 mx-auto" />
                            <p className="text-xs font-semibold text-slate-700">
                              Materials will be added soon
                            </p>
                            <p className="text-[11px] font-mono text-slate-500">
                              Official PDF lecture materials for {currentFacultyUnitData.roman} will appear here once published by faculty.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Category Card 2: PPT Materials */}
                    <div className="p-5 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4 flex flex-col justify-between hover:border-[#285C49]/40 transition-colors">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between pb-3 border-b border-[#F2F7F4]">
                          <div className="flex items-center gap-2">
                            <Layers className="w-4 h-4 text-[#A05E26]" />
                            <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-[#1E293B]">
                              PPT Materials
                            </h4>
                          </div>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#FAF2EB] text-[#A05E26] font-bold">
                            {activePpts.length} {activePpts.length === 1 ? 'File' : 'Files'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600">
                          Classroom presentation slides and visual decks for {currentFacultyUnitData.roman}.
                        </p>

                        {/* PPT Documents List (Supports dynamic published entries or concise empty notice) */}
                        {activePpts.length > 0 ? (
                          <div className="space-y-3 pt-1">
                            {activePpts.map((file) => (
                              <div 
                                key={file.id}
                                className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2.5"
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#FAF2EB] text-[#A05E26]">
                                        PPT
                                      </span>
                                      <h5 className="text-xs sm:text-sm font-bold text-[#1E293B]">
                                        {file.title}
                                      </h5>
                                    </div>
                                    {file.description && (
                                      <p className="text-xs text-slate-600 leading-snug">
                                        {file.description}
                                      </p>
                                    )}
                                  </div>
                                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded flex-shrink-0 bg-emerald-100 text-emerald-800">
                                    Available
                                  </span>
                                </div>

                                <div className="pt-2 border-t border-[#E5ECE8] flex items-center justify-between">
                                  <span className="text-[11px] font-mono text-slate-400">
                                    Host: Google Drive
                                  </span>
                                  <a
                                    href={file.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#285C49] hover:bg-[#1E4738] text-white text-xs font-bold transition-all shadow-2xs"
                                  >
                                    <span>Open PPT</span>
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </a>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-6 rounded-xl bg-[#FAF8F5] border border-dashed border-[#DCE7E1] text-center space-y-1.5 my-auto">
                            <Layers className="w-6 h-6 text-[#A05E26]/50 mx-auto" />
                            <p className="text-xs font-semibold text-slate-700">
                              Materials will be added soon
                            </p>
                            <p className="text-[11px] font-mono text-slate-500">
                              Classroom presentation slides for {currentFacultyUnitData.roman} will appear here once published by faculty.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 3: EDUCATIONAL CHANNELS                                          */}
      {/* ==================================================================== */}
      {activeTab === 'educational-channels' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-[#285C49]" />
                <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#285C49]">
                  Curated Educational Channels (No Video Embeds)
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Verified educational YouTube channels for supplementary revision and diverse teaching styles. Zero embedded tracking or autoplaying video feeds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {educationalChannels.map((channel) => (
                <div 
                  key={channel.id}
                  className="p-5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base font-bold text-[#1E293B]">
                        {channel.name}
                      </h3>
                      <div className="flex items-center gap-1 font-mono text-[11px] text-[#285C49] bg-[#EBF3ED] px-2 py-0.5 rounded font-bold">
                        {channel.relevantUnits.join(", ")}
                      </div>
                    </div>

                    <div className="text-xs font-mono text-slate-600 font-semibold">
                      Specialty: {channel.specialty}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {channel.reason}
                    </p>

                    <div>
                      <span className="text-[11px] font-mono font-bold uppercase text-slate-500 block mb-1">
                        Core Topics:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {channel.topicsCovered.map((topic, tIdx) => (
                          <span 
                            key={tIdx}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-white border border-[#DCE7E1] text-slate-600"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E5ECE8] flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-mono">
                      Query: {channel.searchQuery}
                    </span>
                    {(() => {
                      const publishedCh = publishedResources.publishedMap[channel.id];
                      const chUrl = publishedResources.isLoaded ? (publishedCh?.url || null) : channel.url;
                      return chUrl ? (
                        <a
                          href={chUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#DCE7E1] hover:border-[#285C49] hover:text-[#285C49] text-xs font-bold text-slate-700 transition-all shadow-2xs"
                        >
                          <span>Visit Channel</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="text-xs text-slate-400 font-mono">Channel unavailable</span>
                      );
                    })()}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] text-xs text-slate-600 leading-relaxed">
              Academic Note: ZeroIndex is designed as the student's self-contained learning environment. External YouTube channels are listed solely as supplementary revision aids.
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 4: REFERENCE WEBSITES                                            */}
      {/* ==================================================================== */}
      {activeTab === 'reference-websites' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#285C49]" />
                <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#285C49]">
                  Academic Reference Websites
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Curated open-access university portals, digital textbooks, and engineering documentation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {referenceWebsites.map((site) => (
                <div 
                  key={site.id}
                  className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#EBF3ED] text-[#285C49]">
                        {site.accessType}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {site.relevantUnits.join(", ")}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-[#1E293B] leading-snug">
                      {site.name}
                    </h3>

                    <p className="text-xs font-mono text-[#285C49]">
                      Topics: {site.topics}
                    </p>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {site.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E5ECE8]">
                    {(() => {
                      const publishedWeb = publishedResources.publishedMap[site.id];
                      const webUrl = publishedResources.isLoaded ? (publishedWeb?.url || null) : site.url;
                      return webUrl ? (
                        <a
                          href={webUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-white border border-[#DCE7E1] hover:border-[#285C49] hover:text-[#285C49] text-xs font-bold text-slate-700 transition-all shadow-2xs"
                        >
                          <span className="truncate font-mono text-[11px]">{site.displayUrl}</span>
                          <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 ml-1.5" />
                        </a>
                      ) : (
                        <div className="px-3 py-2 rounded-lg bg-white border border-[#DCE7E1] text-xs font-mono text-slate-400 text-center">
                          Resource link unavailable
                        </div>
                      );
                    })()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 5: ONLINE CALCULATORS                                            */}
      {/* ==================================================================== */}
      {activeTab === 'online-calculators' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-[#285C49]" />
                <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#285C49]">
                  External Online Calculators &amp; Solvers
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Verified external utilities for homework verification and numerical checks. For examinations, use standard ZeroIndex classroom derivations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {onlineCalculators.map((calc) => (
                <div 
                  key={calc.id}
                  className="p-5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#EBF3ED] text-[#285C49]">
                        {calc.category}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        {calc.relevantUnits.join(", ")}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#1E293B]">
                      {calc.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-700 leading-snug">
                      {calc.purpose}
                    </p>

                    <div className="p-2.5 rounded-lg bg-white border border-[#E5ECE8] space-y-1">
                      <span className="text-[10px] font-mono font-bold uppercase text-slate-500 block">
                        Syntax Guide:
                      </span>
                      <p className="text-xs font-mono text-slate-700">
                        {calc.syntaxNote}
                      </p>
                    </div>

                    <p className="text-[11px] text-slate-500 italic leading-snug">
                      Disclaimer: {calc.disclaimer}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E5ECE8]">
                    {(() => {
                      const publishedCalc = publishedResources.publishedMap[calc.id];
                      const calcUrl = publishedResources.isLoaded ? (publishedCalc?.url || null) : calc.url;
                      return calcUrl ? (
                        <a
                          href={calcUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-white border border-[#DCE7E1] hover:border-[#285C49] hover:text-[#285C49] text-xs font-bold text-slate-700 transition-all shadow-2xs"
                        >
                          <span className="font-mono text-[11px]">{calc.displayUrl}</span>
                          <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 ml-1.5" />
                        </a>
                      ) : (
                        <div className="px-3 py-2 rounded-lg bg-white border border-[#DCE7E1] text-xs font-mono text-slate-400 text-center">
                          Calculator link unavailable
                        </div>
                      );
                    })()}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <span>
                Examination Guidance: External tools employ different minimization heuristics and ASCII syntax conventions. For academic homework and examinations, always adhere to the standard Huntington theorems and K-Map grouping criteria taught in ZeroIndex.
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SubjectResourcesView;
