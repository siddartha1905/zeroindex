import React, { useEffect } from 'react';
import { X, BookOpen, Compass, Briefcase, Radio, FileText, Heart, ShieldCheck } from 'lucide-react';
import { ViitCrest } from './ViitCrest';

export const AboutModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#25352D]/50 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-lift border border-[#DDE2DA] relative animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto text-left space-y-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F0F1EB] hover:bg-[#E0EBDF] text-[#25352D] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded border border-[#DDE2DA] bg-[#F7F5EF] flex items-center justify-center font-technical text-xs font-bold text-[#245B4B]">
              0
            </span>
            <span className="font-editorial text-2xl font-bold tracking-tight text-[#25352D]" id="about-title">
              About ZeroIndex
            </span>
          </div>
          <p className="font-editorial italic text-sm text-[#5F6C64]">
            An independent academic and intellectual publication
          </p>
        </div>

        {/* Project Philosophy */}
        <div className="space-y-3 text-sm text-[#5F6C64] leading-relaxed">
          <p>
            ZeroIndex was founded on a simple observation: in technical education, confusion rarely comes from complex ideas; it comes from unstated prerequisites and skipped fundamentals.
          </p>
          <p>
            In computer programming and systems architecture, index zero marks the origin where an array begins in memory. On this platform, index zero represents an educational philosophy: every subject, from a basic Boolean logic gate to an attention tensor, deserves to be taught from first principles with clarity and patience.
          </p>
        </div>

        {/* Five Destinations Overview */}
        <div className="p-4 rounded-2xl bg-[#F7F5EF] border border-[#DDE2DA] space-y-3">
          <h4 className="font-technical text-xs font-bold uppercase tracking-wider text-[#25352D]">
            The Five Pillars
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#5F6C64]">
            <div className="flex items-start gap-2">
              <span className="font-technical font-bold text-[#346C53]">01</span>
              <span><strong className="text-[#25352D]">The Workbench:</strong> Classroom subjects, visual solvers, and quiz arenas.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-technical font-bold text-[#496D91]">02</span>
              <span><strong className="text-[#25352D]">The Atlas:</strong> Structured roadmap guides for self-directed technical learning.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-technical font-bold text-[#956A43]">03</span>
              <span><strong className="text-[#25352D]">The Bridge:</strong> Core interview patterns and engineering placement practice.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-technical font-bold text-[#765C90]">04</span>
              <span><strong className="text-[#25352D]">The Readout:</strong> Technical field notes on computing, AI, and systems science.</span>
            </div>
            <div className="flex items-start gap-2 sm:col-span-2">
              <span className="font-technical font-bold text-[#935F5D]">05</span>
              <span><strong className="text-[#25352D]">The Folio:</strong> Personal essays on pedagogy, teaching craft, and deep focus.</span>
            </div>
          </div>
        </div>

        {/* Faculty Author & Institution Profile */}
        <div className="p-4 rounded-2xl bg-white border border-[#DDE2DA] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ViitCrest className="w-10 h-10 flex-shrink-0" />
            <div className="text-left space-y-0.5">
              <h5 className="text-sm font-bold text-[#25352D]">
                J. Siddartha Varma
              </h5>
              <p className="text-xs text-[#5F6C64]">
                Assistant Professor, Dept. of CSE (Data Science)
              </p>
              <p className="text-[11px] text-[#69766D] font-technical">
                Vignan's Institute of Information Technology (Autonomous), Visakhapatnam
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#245B4B] hover:bg-[#28755E] text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;
