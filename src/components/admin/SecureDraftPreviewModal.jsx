import React from 'react';
import { X, ShieldAlert, FileText, Calendar, Clock, Tag, BookOpen, AlertTriangle } from 'lucide-react';

export const SecureDraftPreviewModal = ({ isOpen, onClose, draft }) => {
  if (!isOpen || !draft) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#25352D]/60 backdrop-blur-xs flex items-center justify-center p-4 text-left"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-lift border border-[#DDE2DA] relative max-h-[90vh] overflow-y-auto space-y-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="draft-preview-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F0F1EB] hover:bg-[#E0EBDF] text-[#25352D] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Security Banner */}
        <div className="p-3.5 rounded-2xl bg-[#FFF9F2] border border-[#F2DEBF] flex items-start gap-3 text-xs text-[#956A43]">
          <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-[#25352D]">
              Confidential Draft Preview (Administrator Eyes Only)
            </span>
            <p className="text-[#5F6C64]">
              This unapproved draft is stored in secure backend storage and is excluded from the public frontend JavaScript bundle.
            </p>
          </div>
        </div>

        {/* Header Metadata */}
        <div className="space-y-3 border-b border-[#DDE2DA] pb-5">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-technical">
            <span className="px-2.5 py-1 rounded-full bg-[#E0EBDF] text-[#285C49] font-bold uppercase tracking-wider">
              {draft.pillar ? draft.pillar.toUpperCase() : 'DRAFT'}
            </span>
            {draft.category && (
              <span className="px-2.5 py-1 rounded-full bg-[#F0F1EB] text-[#5F6C64]">
                {draft.category}
              </span>
            )}
            {draft.topic && (
              <span className="px-2.5 py-1 rounded-full bg-[#F0F1EB] text-[#5F6C64]">
                {draft.topic}
              </span>
            )}
            {draft.date && (
              <span className="flex items-center gap-1 text-[#85928A]">
                <Calendar className="w-3.5 h-3.5" />
                <span>{draft.date}</span>
              </span>
            )}
            {draft.readTime && (
              <span className="flex items-center gap-1 text-[#85928A]">
                <Clock className="w-3.5 h-3.5" />
                <span>{draft.readTime}</span>
              </span>
            )}
          </div>

          <h2 className="font-editorial text-2xl font-bold text-[#293B32]" id="draft-preview-title">
            {draft.title}
          </h2>

          {draft.abstract && (
            <p className="font-editorial italic text-sm text-[#5F6C64] leading-relaxed">
              {draft.abstract}
            </p>
          )}
        </div>

        {/* Content Body */}
        <div className="space-y-4 text-xs sm:text-sm text-[#25352D] leading-relaxed font-sans whitespace-pre-line">
          {draft.content}
        </div>

        {/* Archival Reason */}
        {draft.archivedReason && (
          <div className="p-3 rounded-xl bg-[#F0F1EB] border border-[#DDE2DA] text-[11px] text-[#5F6C64] space-y-1">
            <span className="font-bold text-[#25352D]">Archival Status Note:</span>
            <p>{draft.archivedReason}</p>
          </div>
        )}

        {/* Footer */}
        <div className="pt-2 flex items-center justify-between border-t border-[#DDE2DA]">
          <span className="text-[11px] text-[#85928A]">
            Stable ID: {draft.id}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#285C49] hover:bg-[#1E4738] text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Close Preview
          </button>
        </div>

      </div>
    </div>
  );
};

export default SecureDraftPreviewModal;
