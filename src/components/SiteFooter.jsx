import React from 'react';
import { ViitCrest } from './ViitCrest';
import { ZeroIndexMark } from './ZeroIndexMark';

export const SiteFooter = ({ onNavigate, onOpenAboutModal }) => {
  const pillars = [
    { id: 'workbench', name: 'The Workbench', number: '01', color: '#285C49' },
    { id: 'atlas', name: 'The Atlas', number: '02', color: '#496D91' },
    { id: 'bridge', name: 'The Bridge', number: '03', color: '#C38A63' },
    { id: 'readout', name: 'The Readout', number: '04', color: '#765C90' },
    { id: 'folio', name: 'The Folio', number: '05', color: '#935F5D' },
  ];

  return (
    <footer className="w-full bg-[#F5F2EB] border-t border-[#DDE2DA] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Main Footer Spread: 3 Balanced Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-[#DDE2DA]">
          
          {/* Column 1: ZeroIndex (5 cols) */}
          <div className="md:col-span-5 space-y-3.5 text-left">
            <div className="flex items-center gap-2.5">
              <ZeroIndexMark className="w-6 h-6 flex-shrink-0" size={24} />
              <span className="font-editorial text-xl font-bold tracking-tight text-[#293B32]">
                ZeroIndex
              </span>
            </div>

            <p className="font-editorial italic text-base text-[#5F6C64] leading-relaxed max-w-sm">
              From first principles to fresh perspectives.
            </p>

            <p className="text-xs text-[#5F6C64] leading-relaxed max-w-md font-normal">
              An independent space for learning, career preparation, technology and personal writing.
            </p>
          </div>

          {/* Column 2: Explore (3 cols) */}
          <div className="md:col-span-3 space-y-3 text-left">
            <h4 className="font-technical text-xs font-bold uppercase tracking-wider text-[#293B32]">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-[#5F6C64]">
              {pillars.map((pillar) => (
                <li key={pillar.id}>
                  <button
                    onClick={() => onNavigate(pillar.id)}
                    className="hover:text-[#285C49] transition-colors cursor-pointer text-left flex items-center gap-2"
                  >
                    <span className="font-technical text-[11px]" style={{ color: pillar.color }}>
                      {pillar.number}
                    </span>
                    <span>{pillar.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Author and Affiliation (4 cols) */}
          <div className="md:col-span-4 space-y-3 text-left">
            <h4 className="font-technical text-xs font-bold uppercase tracking-wider text-[#293B32]">
              Author and Affiliation
            </h4>

            <div className="p-4 rounded-2xl bg-white border border-[#DDE2DA] space-y-3 shadow-2xs">
              {/* Author Identification */}
              <div className="space-y-0.5">
                <p className="text-sm font-bold text-[#293B32]">
                  J. Siddartha Varma
                </p>
                <p className="text-xs text-[#5F6C64]">
                  Assistant Professor
                </p>
                <p className="text-[11px] text-[#69766D] font-medium">
                  Department of CSE (Data Science)
                </p>
              </div>

              {/* Institutional Affiliation with Small Crest */}
              <div className="pt-2.5 border-t border-[#E6E8E1] flex items-center gap-2.5">
                <ViitCrest className="w-5 h-5 flex-shrink-0" />
                <span className="text-[11px] text-[#5F6C64] leading-tight">
                  Vignan's Institute of Information Technology (Autonomous), Visakhapatnam
                </span>
              </div>
            </div>

            <div className="pt-1">
              <button
                onClick={onOpenAboutModal}
                className="text-xs font-medium text-[#285C49] hover:underline cursor-pointer"
              >
                About the author and platform
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Simple Copyright Line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#69766D] text-center sm:text-left">
          <p>
            © 2026 ZeroIndex
          </p>
        </div>

      </div>
    </footer>
  );
};

export default SiteFooter;
