import React, { useState } from 'react';
import { ConfigProvider } from 'antd';
import { antdThemeConfig } from './theme/pastelTheme';
import { MainHome } from './components/MainHome';
import { DldSubjectHome } from './components/DldSubjectHome';
import { DldWorkspace } from './components/DldWorkspace';
import { RoadmapsView } from './components/RoadmapsView';
import { ArrowLeft } from 'lucide-react';

export function App() {
  // 3-Level Hierarchy State:
  // Level 1: 'portal'
  // Level 2: 'dld-home'
  // Level 3: 'dld-workspace'
  // Auxiliary: 'roadmaps'
  const [currentLevel, setCurrentLevel] = useState('portal');
  const [workspaceTab, setWorkspaceTab] = useState('units');

  const goToPortal = () => {
    setCurrentLevel('portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToDldHome = () => {
    setCurrentLevel('dld-home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToDldWorkspace = (tab = 'units') => {
    setWorkspaceTab(tab);
    setCurrentLevel('dld-workspace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToRoadmaps = () => {
    setCurrentLevel('roadmaps');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ConfigProvider theme={antdThemeConfig}>
      <div className="min-h-screen bg-[#FAF8F5] text-[#1E293B] font-sans selection:bg-[#2E6F40]/20 selection:text-[#2E6F40]">
        
        {/* LEVEL 1: ZeroIndex Main Portal Landing Page */}
        {currentLevel === 'portal' && (
          <MainHome 
            onSelectDld={goToDldHome}
            onSelectRoadmaps={goToRoadmaps}
            onOpenWorkspaceTab={goToDldWorkspace}
          />
        )}

        {/* LEVEL 2: Digital Logic Design Subject Home Page */}
        {currentLevel === 'dld-home' && (
          <DldSubjectHome 
            onBackToPortal={goToPortal}
            onOpenWorkspaceTab={goToDldWorkspace}
          />
        )}

        {/* LEVEL 3: Clean Inside Workspace */}
        {currentLevel === 'dld-workspace' && (
          <DldWorkspace 
            onBackToDldHome={goToDldHome}
            initialTab={workspaceTab}
          />
        )}

        {/* Auxiliary Roadmaps View */}
        {currentLevel === 'roadmaps' && (
          <div className="min-h-screen bg-[#FAF8F5] py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
              <button
                onClick={goToPortal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DCE7E1] bg-white hover:bg-[#F2F7F4] text-xs font-semibold text-[#1E293B] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>← Back to ZeroIndex</span>
              </button>
            </div>
            <RoadmapsView onNavigate={goToPortal} />
          </div>
        )}

      </div>
    </ConfigProvider>
  );
}

export default App;
