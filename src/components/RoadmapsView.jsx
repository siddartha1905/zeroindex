import React from 'react';
import { 
  Compass, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Award, 
  Terminal, 
  Database, 
  Code2, 
  Layers, 
  BookOpen 
} from 'lucide-react';
import { portalConfig } from '../data/portalConfig';

export const RoadmapsView = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono font-bold uppercase text-[#4F46E5] bg-[#EEF2FF] px-2.5 py-1 rounded-full">
            ZeroIndex Curriculum Blueprint
          </span>
          <span className="text-xs text-[#64748B]">Future Tracks & Career Roadmaps</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">
          Long-Term Engineering & Career Roadmaps
        </h1>
        <p className="text-sm text-[#475569] mt-2 max-w-3xl leading-relaxed">
          ZeroIndex is structured as an extensible multi-subject ecosystem. While <strong className="text-[#2E6F40]">Digital Logic Design</strong> is our active primary course, explore our upcoming specialization roadmaps curated for students heading into Data Science and Software Engineering.
        </p>
      </div>

      {/* 3 Career Roadmaps Cards */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#1E293B]">Specialization Career Roadmaps</h2>
          <span className="text-xs font-mono text-[#64748B]">Stage 2 Registry Preview</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {portalConfig.roadmaps.map((map) => {
            return (
              <div
                key={map.id}
                className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft flex flex-col justify-between space-y-5"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-[#4F46E5] bg-[#EEF2FF] px-2.5 py-0.5 rounded">
                      {map.timeline}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#D97706]">
                      {map.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1E293B] mb-1">{map.title}</h3>
                  <p className="text-xs text-[#64748B] mb-2 font-mono">
                    Target: {map.targetRoles}
                  </p>
                  <p className="text-xs text-[#475569] leading-relaxed mb-4">
                    {map.description}
                  </p>

                  {/* Steps Roadmap Pipeline */}
                  <div className="space-y-2 pt-2 border-t border-[#F2F7F4]">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
                      Curriculum Phases:
                    </span>
                    <div className="space-y-1.5">
                      {map.steps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-[#FAF8F5] text-xs text-[#1E293B] border border-[#DCE7E1]">
                          <span className="w-4 h-4 rounded-full bg-[#2E6F40]/10 text-[#2E6F40] flex items-center justify-center font-mono text-[9px] font-bold flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="text-[11px] leading-tight">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F2F7F4] flex items-center justify-between text-xs text-[#64748B]">
                  <span>Data-driven registry ready</span>
                  <span className="text-[#2E6F40] font-semibold">Active in future stages</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Future Subjects Shelf */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-[#2E6F40] bg-[#F2F7F4] px-2 py-0.5 rounded">
              Academic Subjects Pipeline
            </span>
            <span className="text-xs text-[#64748B]">VR23 Computer Science & Data Science</span>
          </div>
          <h2 className="text-xl font-bold text-[#1E293B]">Upcoming Subject Modules on ZeroIndex</h2>
          <p className="text-xs text-[#64748B] mt-1">
            As students advance through semesters, each of these subjects will feature its own dedicated interactive workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {portalConfig.subjects.map((subj) => {
            const isActive = subj.id === 'dld';
            return (
              <div
                key={subj.id}
                className={`p-4 rounded-xl border transition-all ${
                  isActive 
                    ? 'bg-[#F2F7F4] border-[#2E6F40] shadow-sm' 
                    : 'bg-[#FAF8F5] border-[#DCE7E1]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#1E293B]">{subj.code}</span>
                    <span className="text-xs text-[#64748B]">· {subj.yearSem}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-[#2E6F40] text-white' : 'bg-[#FEF3C7] text-[#D97706]'
                  }`}>
                    {subj.badgeText}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#1E293B] mb-1">{subj.title}</h3>
                <p className="text-xs text-[#475569] leading-relaxed mb-3">{subj.description}</p>

                <div className="flex items-center justify-between pt-2 border-t border-[#DCE7E1]/50 text-xs">
                  <span className="text-[#64748B] font-mono">{subj.ltpc}</span>
                  {isActive ? (
                    <button
                      onClick={() => onNavigate('dld')}
                      className="text-xs font-bold text-[#2E6F40] hover:underline"
                    >
                      Enter Live Workspace →
                    </button>
                  ) : (
                    <span className="text-[11px] font-mono text-[#D97706]">Configured in portalConfig.js</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default RoadmapsView;
