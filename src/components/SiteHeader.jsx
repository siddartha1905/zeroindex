import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Compass, 
  Briefcase, 
  Radio, 
  FileText, 
  Smartphone, 
  Clock, 
  Menu, 
  X,
  ExternalLink,
  Info
} from 'lucide-react';
import { ZeroIndexMark } from './ZeroIndexMark';
import { isItemPubliclyAccessible } from '../data/centralContentRegistry';

export const SiteHeader = ({ 
  currentSection = 'home', 
  onNavigate,
  onOpenInstallModal,
  onOpenAboutModal,
  contentOverrides = {},
  isRegistryLoaded = true
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Listen for scroll to apply subtle sticky border & background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Live Clock (compact, quiet)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString('en-IN', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Kolkata'
  });

  const allNavigationItems = [
    { id: 'workbench', label: 'The Workbench', number: '01', color: '#285C49' },
    { id: 'atlas', label: 'The Atlas', number: '02', color: '#496D91' },
    { id: 'bridge', label: 'The Bridge', number: '03', color: '#C38A63' },
    { id: 'readout', label: 'The Readout', number: '04', color: '#765C90' },
    { id: 'folio', label: 'The Folio', number: '05', color: '#935F5D' },
  ];

  // Only render pillars that are verified publicly visible
  const navigationItems = isRegistryLoaded
    ? allNavigationItems.filter(item => isItemPubliclyAccessible('pillar-' + item.id, contentOverrides))
    : [];

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-200 ${
        isScrolled 
          ? 'bg-[#FBF8F2]/95 backdrop-blur-md border-b border-[#DDE2DA] shadow-xs' 
          : 'bg-[#FBF8F2] border-b border-[#E6E8E1]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: ZeroIndex Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#285C49] rounded-lg px-1 py-0.5"
            aria-label="ZeroIndex Home"
          >
            {/* Custom Zero Glyph Mark with Knowledge Tree branching */}
            <ZeroIndexMark className="w-7 h-7 flex-shrink-0 group-hover:opacity-90 transition-opacity" size={28} />
            <span className="font-editorial text-2xl font-bold tracking-tight text-[#293B32] group-hover:text-[#285C49] transition-colors leading-none">
              ZeroIndex
            </span>
          </button>
        </div>

        {/* Center: Desktop Navigation Bar for the 5 Pillars */}
        <nav className="hidden lg:flex items-center gap-1">
          {navigationItems.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white text-[#25352D] font-semibold border border-[#DDE2DA] shadow-2xs'
                    : 'text-[#5F6C64] hover:text-[#25352D] hover:bg-white/60'
                }`}
              >
                <span 
                  className="font-technical text-[10px] opacity-70"
                  style={{ color: isActive ? item.color : undefined }}
                >
                  {item.number}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Calm Utility Area */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Discreet Monospace Clock */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F0F1EB] border border-[#DDE2DA] font-technical text-[11px] text-[#5F6C64]">
            <Clock className="w-3 h-3 text-[#285C49]" />
            <span>{formattedTime} IST</span>
          </div>

          {/* About / Project Trigger */}
          <button
            onClick={onOpenAboutModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#5F6C64] hover:text-[#25352D] hover:bg-white border border-transparent hover:border-[#DDE2DA] transition-all cursor-pointer"
          >
            <Info className="w-3.5 h-3.5" />
            <span>About</span>
          </button>

          {/* Install as App Trigger */}
          <button
            onClick={onOpenInstallModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#F0F1EB] text-[#285C49] border border-[#DDE2DA] text-xs font-medium transition-colors shadow-2xs cursor-pointer"
            aria-label="Install as Progressive Web App"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#285C49]" />
            <span className="hidden sm:inline">Install App</span>
            <span className="sm:hidden">App</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#25352D] hover:bg-white border border-[#DDE2DA] cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Accessible Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#DDE2DA] shadow-md animate-in slide-in-from-top-2 duration-150">
          <div className="px-4 py-4 space-y-2">
            <div className="text-[11px] font-technical text-[#69766D] uppercase tracking-wider px-2 pb-1">
              Primary Destinations
            </div>
            {navigationItems.map((item) => {
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-[#F0F1EB] text-[#25352D] font-bold border border-[#DDE2DA]'
                      : 'text-[#5F6C64] hover:bg-[#F7F5EF]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-technical text-xs" style={{ color: item.color }}>
                      {item.number}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#285C49]" />}
                </button>
              );
            })}

            <div className="pt-3 border-t border-[#E6E8E1] flex items-center justify-between text-xs px-2 text-[#5F6C64]">
              <button
                onClick={() => {
                  if (onOpenAboutModal) onOpenAboutModal();
                  setMobileMenuOpen(false);
                }}
                className="font-medium text-[#285C49] hover:underline"
              >
                About ZeroIndex
              </button>
              <span className="font-technical">{formattedTime} IST</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
