import React, { useState } from 'react';
import { 
  Download, 
  ExternalLink, 
  GraduationCap, 
  Award, 
  BookOpen
} from 'lucide-react';
import { dldSyllabus } from '../data/dldSyllabus';
import { dldResourceConfig } from '../data/dldResourceConfig';
import { ViitCrest } from './ViitCrest';

export const SyllabusView = ({ onNavigate }) => {
  const [selectedUnit, setSelectedUnit] = useState(1);
  const unit1Resource = dldResourceConfig.units[1];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 animate-in fade-in duration-150">
      
      {/* Subject Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <ViitCrest className="w-6 h-6" />
            <span className="text-xs font-bold text-[#2E6F40]">Vignan's Institute of Information Technology (A)</span>
            <span className="text-xs text-[#64748B]">Autonomous Curriculum</span>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#F2F7F4] text-[#2E6F40] border border-[#DCE7E1]">
              Course Code: {dldSyllabus.courseCode}
            </span>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#FAF8F5] text-[#1E293B] border border-[#DCE7E1]">
              {dldSyllabus.ltpc}
            </span>
            {/* Google Drive Study Materials Resource */}
            {unit1Resource?.driveUrl ? (
              <a
                href={unit1Resource.driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#2E6F40] text-white hover:bg-[#255A34] text-xs font-semibold shadow-sm transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{unit1Resource.resourceName}</span>
              </a>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FAF8F5] text-[#64748B] border border-[#DCE7E1] text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span className="font-semibold text-[#1E293B]">{unit1Resource?.resourceName || 'Google Drive Study Materials'}:</span>
                <span>{unit1Resource?.statusText || 'Material link will be added soon.'}</span>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-3xl">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">
            {dldSyllabus.courseTitle}
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1 font-mono">
            {dldSyllabus.yearSem} · {dldSyllabus.branch} · {dldSyllabus.credits} Credits
          </p>
          <div className="mt-4 p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1]">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E6F40] block mb-1">
              Course Overview
            </span>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              {dldSyllabus.overview}
            </p>
          </div>
        </div>
      </div>

      {/* Course Objectives & Outcomes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Objectives (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#2E6F40]">
            <GraduationCap className="w-4 h-4" />
            <span>Course Objectives</span>
          </div>
          <div className="space-y-3">
            {dldSyllabus.objectives.map((obj, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1]">
                <span className="w-5 h-5 rounded-full bg-[#2E6F40] text-white flex items-center justify-center font-mono text-[10px] flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-xs text-[#1E293B] leading-relaxed font-medium">{obj}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Outcomes CO1 to CO5 (7 cols) - STRICTLY NO BLOOM'S TAXONOMY COLUMN */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#4F46E5]">
            <Award className="w-4 h-4" />
            <span>Course Outcomes (CO1 to CO5)</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-[#DCE7E1] font-mono text-[#64748B] uppercase">
                  <th className="py-2.5 px-3 w-16">CO</th>
                  <th className="py-2.5 px-3">Course Outcome Statement</th>
                  <th className="py-2.5 px-3 w-24 text-right">Unit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2F7F4]">
                {dldSyllabus.outcomes.map((co) => (
                  <tr key={co.code} className="hover:bg-[#F2F7F4]/50">
                    <td className="py-3 px-3 font-mono font-bold text-[#2E6F40]">{co.code}</td>
                    <td className="py-3 px-3 text-[#1E293B] leading-relaxed">{co.description}</td>
                    <td className="py-3 px-3 font-mono text-[#64748B] whitespace-nowrap text-right">{co.targetUnit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* 5-Unit Syllabus Breakdown */}
      <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase text-[#2E6F40] bg-[#F2F7F4] px-2 py-0.5 rounded">
                Official Curriculum
              </span>
              <span className="text-xs text-[#64748B]">Units I through V</span>
            </div>
            <h2 className="text-xl font-bold text-[#1E293B] mt-1">Prescribed 5-Unit Syllabus Breakdown</h2>
          </div>

          {/* Quick Unit Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {dldSyllabus.units.map((unit) => (
              <button
                key={unit.unitNumber}
                onClick={() => setSelectedUnit(unit.unitNumber)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                  selectedUnit === unit.unitNumber
                    ? 'bg-[#2E6F40] text-white shadow-sm'
                    : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]'
                }`}
              >
                {unit.roman}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Unit Details Card */}
        {(() => {
          const unit = dldSyllabus.units.find(u => u.unitNumber === selectedUnit);
          return (
            <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#DCE7E1]">
                <div>
                  <span className="text-xs font-mono text-[#64748B]">{unit.roman} · {unit.hours}</span>
                  <h3 className="text-lg font-bold text-[#1E293B]">{unit.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#F2F7F4] text-[#2E6F40] border border-[#DCE7E1]">
                    Outcome: {unit.courseOutcome}
                  </span>
                  {unit.unitNumber === 1 ? (
                    <button
                      onClick={() => onNavigate && onNavigate('units')}
                      className="px-3 py-1 rounded-lg bg-[#2E6F40] text-white text-xs font-semibold hover:bg-[#255A34]"
                    >
                      Open Live Notes
                    </button>
                  ) : (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#D97706]">
                      Notes Coming Soon
                    </span>
                  )}
                </div>
              </div>

              {/* Exact official syllabus text block */}
              <div className="p-3.5 rounded-lg bg-white border border-[#DCE7E1]">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B] block mb-1">
                  Official Prescribed Text (Word-for-Word)
                </span>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  {unit.summary}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] mb-2">
                  Prescribed Topic Breakdown
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {unit.topics.map((topic, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-[#DCE7E1] text-xs text-[#1E293B]">
                      <span className="w-5 h-5 rounded-full bg-[#FAF8F5] border border-[#DCE7E1] flex items-center justify-center font-mono text-[10px] text-[#2E6F40] flex-shrink-0">
                        {i + 1}
                      </span>
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Textbooks & Reference Books Section */}
      <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase text-[#2E6F40] bg-[#F2F7F4] px-2 py-0.5 rounded">
              Readings & Literature
            </span>
            <span className="text-xs text-[#64748B]">Official Prescribed Curriculum Books</span>
          </div>
          <h2 className="text-xl font-bold text-[#1E293B] mt-1">Text Books and Reference Books</h2>
        </div>

        {/* Textbooks */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E6F40]">
            Text Books
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dldSyllabus.textbooks.map((book) => (
              <div key={book.id} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-[#2E6F40]">Book {book.number}</span>
                    <span className="text-[10px] text-[#64748B] font-mono">{book.publisher}</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#1E293B]">
                    {book.title}, {book.edition}
                  </h4>
                  <p className="text-xs text-[#475569] mt-0.5 font-medium">{book.authors}, {book.publisher}.</p>
                  <p className="text-xs text-[#64748B] mt-2 leading-relaxed">{book.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#DCE7E1] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#64748B]">VIIT Library Copy</span>
                  {book.driveLink ? (
                    <a
                      href={book.driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#DCE7E1] hover:border-[#2E6F40] text-xs font-semibold text-[#2E6F40] transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Access on Drive</span>
                    </a>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF8F5] border border-[#DCE7E1] text-[11px] font-medium text-[#64748B]">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>{book.statusText || 'Material link will be added soon.'}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reference Books */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B]">
            Reference Books
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {dldSyllabus.referenceBooks.map((ref) => (
              <div key={ref.id} className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#4F46E5] block mb-1">Reference {ref.number}</span>
                  <h4 className="text-xs font-bold text-[#1E293B] mb-1">{ref.title}</h4>
                  <p className="text-[11px] text-[#475569]">{ref.authors}, {ref.publisher}.</p>
                </div>
                <div className="mt-3 pt-2 border-t border-[#DCE7E1]/60 flex items-center justify-end">
                  {ref.driveLink ? (
                    <a
                      href={ref.driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#4F46E5] hover:underline"
                    >
                      <span>Drive Copy</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white border border-[#DCE7E1] text-[10px] font-medium text-[#64748B]">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>{ref.statusText || 'Material link will be added soon.'}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default SyllabusView;
