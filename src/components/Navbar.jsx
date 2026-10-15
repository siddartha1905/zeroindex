import React, { useState } from 'react';
import { 
  BookOpen, 
  Cpu, 
  Calculator, 
  CheckCircle2, 
  Compass, 
  Menu, 
  X, 
  ChevronDown, 
  GraduationCap, 
  ExternalLink,
  Sparkles,
  Layers
} from 'lucide-react';
import { ViitCrest } from './ViitCrest';
import { portalConfig } from '../data/portalConfig';

export const Navbar = ({ activeTab, setActiveTab, onSelectSubject }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [subjectsDropdown, setSubjectsDropdown] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Layers },
    { id: 'dld', label: 'DLD Workspace', icon: Cpu, badge: 'Live' },
    { id: 'solvers', label: 'Interactive Solvers', icon: Calculator },
    { id: 'practice', label: 'Practice Arena', icon: CheckCircle2 },
    { id: 'syllabus', label: 'Syllabus & Overview', icon: BookOpen },
    { id: 'roadmaps', label: 'Roadmaps', icon: Compass },
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    setSubjectsDropdown(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#DCE7E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left Brand & VIIT Institutional Crest */}
          <div className="flex items-center gap-3 md:gap-5">
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 group text-left focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-[#2E6F40] text-[#FAF8F5] flex items-center justify-center font-mono font-bold text-base shadow-sm group-hover:scale-105 transition-transform">
                [0]
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight text-[#1E293B] group-hover:text-[#2E6F40] transition-colors">
                  ZeroIndex
                </span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#64748B] hidden sm:block">
                  CS & Data Science
                </span>
              </div>
            </button>

            {/* Institutional Divider */}
            <div className="h-6 w-[1px] bg-[#DCE7E1] hidden sm:block" />

            {/* VIIT Badge / Logo */}
            <div className="hidden sm:flex items-center pl-1">
              <ViitCrest className="w-7 h-7" withText={true} />
            </div>
          </div>

          {/* Center / Right Desktop Navigation Items */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-[#2E6F40] text-[#FAF8F5] shadow-sm font-semibold' 
                      : 'text-[#1E293B] hover:text-[#2E6F40] hover:bg-[#F2F7F4]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-[#2E6F40]/10 text-[#2E6F40]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Action Subjects Dropdown / Faculty Pill */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setSubjectsDropdown(!subjectsDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg border border-[#DCE7E1] bg-white hover:border-[#2E6F40] transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-[#2E6F40] animate-pulse"></span>
                <span>Subjects</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#64748B]" />
              </button>

              {subjectsDropdown && (
                <div className="absolute right-0 mt-2 w-72 rounded-xl bg-white border border-[#DCE7E1] shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-2 border-b border-[#F2F7F4] mb-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">ZeroIndex Curriculum</p>
                  </div>
                  {portalConfig.subjects.map((subj) => (
                    <button
                      key={subj.id}
                      onClick={() => {
                        if (subj.id === 'dld') {
                          handleNavClick('dld');
                        } else {
                          handleNavClick('roadmaps');
                        }
                      }}
                      className="w-full text-left p-2.5 rounded-lg hover:bg-[#F2F7F4] flex items-center justify-between group transition-colors"
                    >
                      <div>
                        <div className="text-xs font-semibold text-[#1E293B] group-hover:text-[#2E6F40]">
                          {subj.title}
                        </div>
                        <div className="text-[10px] text-[#64748B] font-mono">
                          {subj.code} · {subj.yearSem.split(',')[0]}
                        </div>
                      </div>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        subj.status === 'Active' 
                          ? 'bg-[#2E6F40]/10 text-[#2E6F40]' 
                          : 'bg-[#FEF3C7] text-[#D97706]'
                      }`}>
                        {subj.status}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Faculty Attribution Pill: Strictly J. Siddartha Varma and Assistant Professor */}
            <div className="flex flex-col items-end text-right px-3 py-1 rounded-md bg-[#F2F7F4] border border-[#DCE7E1]">
              <span className="font-bold text-[11px] text-[#1E293B] leading-tight">J. Siddartha Varma</span>
              <span className="text-[10px] text-[#2E6F40] font-semibold leading-tight">Assistant Professor</span>
            </div>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#1E293B] hover:bg-[#F2F7F4] focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#DCE7E1] bg-[#FAF8F5] px-4 pt-2 pb-5 space-y-2">
          <div className="flex items-center gap-2 pb-3 mb-2 border-b border-[#DCE7E1]/60">
            <ViitCrest className="w-6 h-6" withText={true} />
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-[#2E6F40] text-[#FAF8F5]'
                    : 'text-[#1E293B] hover:bg-[#F2F7F4]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-[#DCE7E1]/60">
            <div className="text-[11px] text-[#64748B] mb-2 font-mono">CURATED BY</div>
            <div className="text-xs font-semibold text-[#1E293B]">J. Siddartha Varma, Assistant Professor</div>
            <div className="text-[11px] text-[#2E6F40]">Vignan’s Institute of Information Technology (A)</div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
