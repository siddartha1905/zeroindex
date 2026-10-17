import React from 'react';
import { ViitCrest } from './ViitCrest';

export const SiteFooter = ({ onNavigate, onOpenAboutModal }) => {
  return (
    <footer className="w-full bg-[#F0F1EB] border-t border-[#DDE2DA] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Main Footer Spread */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-[#DDE2DA]">
          
          {/* Column 1: ZeroIndex Philosophy & Wordmark (5 cols) */}
          <div className="md:col-span-5 space-y-4 text-left">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded border border-[#DDE2DA] bg-white flex items-center justify-center font-technical text-xs font-bold text-[#245B4B]">
                0
              </span>
              <span className="font-editorial text-xl font-bold tracking-tight text-[#25352D]">
                ZeroIndex
              </span>
            </div>

            <p className="font-editorial italic text-base text-[#5F6C64] leading-relaxed max-w-sm">
              "Every meaningful learning journey in computing and engineering begins from index zero."
            </p>

            <p className="text-xs text-[#5F6C64] leading-relaxed max-w-md">
              A personal academic and intellectual platform for engineering students and independent learners, bringing together core coursework, learning roadmaps, placement practice, and scientific writing.
            </p>
          </div>

          {/* Column 2: Five Primary Destinations (4 cols) */}
          <div className="md:col-span-4 space-y-3 text-left">
            <h4 className="font-technical text-xs font-bold uppercase tracking-wider text-[#25352D]">
              Five Pillars
            </h4>
            <ul className="space-y-2 text-sm text-[#5F6C64]">
              <li>
                <button
                  onClick={() => onNavigate('workbench')}
                  className="hover:text-[#245B4B] transition-colors cursor-pointer text-left flex items-center gap-2"
                >
                  <span className="font-technical text-[11px] text-[#346C53]">01</span>
                  <span>The Workbench (Academic Subjects)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('atlas')}
                  className="hover:text-[#245B4B] transition-colors cursor-pointer text-left flex items-center gap-2"
                >
                  <span className="font-technical text-[11px] text-[#496D91]">02</span>
                  <span>The Atlas (Learning Roadmaps)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('bridge')}
                  className="hover:text-[#245B4B] transition-colors cursor-pointer text-left flex items-center gap-2"
                >
                  <span className="font-technical text-[11px] text-[#956A43]">03</span>
                  <span>The Bridge (Career &amp; Placements)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('readout')}
                  className="hover:text-[#245B4B] transition-colors cursor-pointer text-left flex items-center gap-2"
                >
                  <span className="font-technical text-[11px] text-[#765C90]">04</span>
                  <span>The Readout (Technology &amp; Science)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('folio')}
                  className="hover:text-[#245B4B] transition-colors cursor-pointer text-left flex items-center gap-2"
                >
                  <span className="font-technical text-[11px] text-[#935F5D]">05</span>
                  <span>The Folio (Essays &amp; Writing)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Institutional Authorship (3 cols) */}
          <div className="md:col-span-3 space-y-3 text-left">
            <h4 className="font-technical text-xs font-bold uppercase tracking-wider text-[#25352D]">
              Authorship &amp; Affiliation
            </h4>

            <div className="p-3.5 rounded-xl bg-white border border-[#DDE2DA] space-y-2">
              <div className="flex items-start gap-2.5">
                <ViitCrest className="w-7 h-7 flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5 leading-snug">
                  <p className="text-xs font-bold text-[#25352D]">
                    J. Siddartha Varma
                  </p>
                  <p className="text-[11px] text-[#5F6C64]">
                    Assistant Professor
                  </p>
                  <p className="text-[10px] text-[#69766D] font-medium">
                    Dept. of CSE (Data Science)
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E6E8E1] text-[10px] text-[#5F6C64] leading-tight">
                Vignan's Institute of Information Technology (Autonomous), Visakhapatnam
              </div>
            </div>

            <div className="pt-1">
              <button
                onClick={onOpenAboutModal}
                className="text-xs font-medium text-[#245B4B] hover:underline cursor-pointer"
              >
                About the author and platform
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Clean Copyright & Colophon */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#69766D] text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} ZeroIndex. Designed as an independent academic publication.
          </p>
          <div className="flex items-center gap-4 text-[11px] font-technical">
            <span>Autonomous Curriculum VR23</span>
            <span>·</span>
            <span>Pure HTML &amp; CSS</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default SiteFooter;
