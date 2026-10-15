import React from 'react';
import { Home, Cpu, Calculator, CheckCircle2, Compass } from 'lucide-react';

export const BottomNav = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dld', label: 'DLD Units', icon: Cpu, badge: 'Live' },
    { id: 'solvers', label: 'Solvers', icon: Calculator },
    { id: 'practice', label: 'Practice', icon: CheckCircle2 },
    { id: 'roadmaps', label: 'Roadmaps', icon: Compass },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-lg border-t border-[#DCE7E1] px-2 py-1.5 safe-area-bottom shadow-lg">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all relative ${
                isActive ? 'text-[#2E6F40]' : 'text-[#64748B] hover:text-[#1E293B]'
              }`}
            >
              <div className={`p-1.5 rounded-lg transition-transform ${
                isActive ? 'bg-[#F2F7F4] scale-110' : ''
              }`}>
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] tracking-tight mt-0.5 ${
                isActive ? 'font-bold text-[#2E6F40]' : 'font-medium'
              }`}>
                {tab.label}
              </span>

              {tab.badge && (
                <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-[#2E6F40] ring-2 ring-[#FAF8F5]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
