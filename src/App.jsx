import React, { useState, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { antdThemeConfig } from './theme/pastelTheme';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { MainHome } from './components/MainHome';
import { WorkbenchLanding } from './components/WorkbenchLanding';
import { AtlasLanding } from './components/AtlasLanding';
import { BridgeLanding } from './components/BridgeLanding';
import { ReadoutLanding } from './components/ReadoutLanding';
import { FolioLanding } from './components/FolioLanding';
import { DldSubjectHome } from './components/DldSubjectHome';
import { DldWorkspace } from './components/DldWorkspace';
import { AboutModal } from './components/AboutModal';
import { InstallModal } from './components/InstallModal';

export function App() {
  // Navigation Section State:
  // 'home' | 'workbench' | 'atlas' | 'bridge' | 'readout' | 'folio' | 'dld-home' | 'dld-workspace'
  const [currentSection, setCurrentSection] = useState('home');
  const [workspaceTab, setWorkspaceTab] = useState('units');

  // Modals state
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  // Sync hash routing on initial load and popstate
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['workbench', 'atlas', 'bridge', 'readout', 'folio', 'home'].includes(hash)) {
        setCurrentSection(hash);
      } else if (hash === 'dld' || hash === 'dld-home') {
        setCurrentSection('dld-home');
      } else if (hash.startsWith('workspace')) {
        const parts = hash.split('/');
        if (parts[1]) setWorkspaceTab(parts[1]);
        setCurrentSection('dld-workspace');
      } else if (hash === 'roadmaps') {
        setCurrentSection('atlas');
      }
    };

    handleHashChange();
    window.addEventListener('popstate', handleHashChange);
    return () => window.removeEventListener('popstate', handleHashChange);
  }, []);

  const navigateTo = (section) => {
    setCurrentSection(section);
    window.location.hash = section === 'home' ? '' : section;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToDldHome = () => {
    setCurrentSection('dld-home');
    window.location.hash = 'dld';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToDldWorkspace = (tab = 'units') => {
    setWorkspaceTab(tab);
    setCurrentSection('dld-workspace');
    window.location.hash = `workspace/${tab}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isDldView = currentSection === 'dld-home' || currentSection === 'dld-workspace';

  return (
    <ConfigProvider theme={antdThemeConfig}>
      <div className="min-h-screen bg-[#F7F5EF] text-[#25352D] font-sans flex flex-col justify-between selection:bg-[#28755E]/15 selection:text-[#245B4B]">
        
        {/* Render SiteHeader on all top-level public pages (Home & 5 Pillars) */}
        {!isDldView && (
          <SiteHeader 
            currentSection={currentSection}
            onNavigate={navigateTo}
            onOpenInstallModal={() => setIsInstallModalOpen(true)}
            onOpenAboutModal={() => setIsAboutModalOpen(true)}
          />
        )}

        {/* =====================================================================
            PRIMARY VIEW ROUTER
        ===================================================================== */}
        <main className="flex-1">
          
          {/* 00. Homepage (Clean Editorial Front Door) */}
          {currentSection === 'home' && (
            <MainHome 
              onNavigate={navigateTo}
              onOpenAboutModal={() => setIsAboutModalOpen(true)}
              onOpenInstallModal={() => setIsInstallModalOpen(true)}
            />
          )}

          {/* 01. Pillar 1: The Workbench */}
          {currentSection === 'workbench' && (
            <WorkbenchLanding 
              onNavigateHome={() => navigateTo('home')}
              onSelectDld={goToDldHome}
              onOpenWorkspaceTab={goToDldWorkspace}
            />
          )}

          {/* 02. Pillar 2: The Atlas */}
          {currentSection === 'atlas' && (
            <AtlasLanding 
              onNavigateHome={() => navigateTo('home')}
              onNavigateWorkbench={() => navigateTo('workbench')}
            />
          )}

          {/* 03. Pillar 3: The Bridge */}
          {currentSection === 'bridge' && (
            <BridgeLanding 
              onNavigateHome={() => navigateTo('home')}
            />
          )}

          {/* 04. Pillar 4: The Readout */}
          {currentSection === 'readout' && (
            <ReadoutLanding 
              onNavigateHome={() => navigateTo('home')}
            />
          )}

          {/* 05. Pillar 5: The Folio */}
          {currentSection === 'folio' && (
            <FolioLanding 
              onNavigateHome={() => navigateTo('home')}
            />
          )}

          {/* INTERNAL COURSE: Digital Logic Design Subject Home Page */}
          {currentSection === 'dld-home' && (
            <DldSubjectHome 
              onBackToPortal={() => navigateTo('workbench')}
              onOpenWorkspaceTab={goToDldWorkspace}
            />
          )}

          {/* INTERNAL WORKSPACE: Units, Solvers, Quiz Arena, Subject Resources */}
          {currentSection === 'dld-workspace' && (
            <DldWorkspace 
              onBackToDldHome={goToDldHome}
              initialTab={workspaceTab}
            />
          )}

        </main>

        {/* Render SiteFooter on all top-level public pages */}
        {!isDldView && (
          <SiteFooter 
            onNavigate={navigateTo}
            onOpenAboutModal={() => setIsAboutModalOpen(true)}
          />
        )}

        {/* Global Modals */}
        <AboutModal 
          isOpen={isAboutModalOpen}
          onClose={() => setIsAboutModalOpen(false)}
        />

        <InstallModal 
          isOpen={isInstallModalOpen}
          onClose={() => setIsInstallModalOpen(false)}
        />

      </div>
    </ConfigProvider>
  );
}

export default App;
