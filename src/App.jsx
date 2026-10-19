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
  const [workspaceSubId, setWorkspaceSubId] = useState('1.1');
  const [readoutSlug, setReadoutSlug] = useState(null);
  const [folioSlug, setFolioSlug] = useState(null);

  // Modals state
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  // Sync hash routing on initial load, hashchange, and popstate
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace(/^#\/?/, '').trim();
      const lowerHash = rawHash.toLowerCase();

      if (!lowerHash || lowerHash === 'home') {
        setCurrentSection('home');
        setReadoutSlug(null);
        setFolioSlug(null);
      } else if (lowerHash === 'workbench') {
        setCurrentSection('workbench');
      } else if (lowerHash === 'atlas' || lowerHash === 'roadmaps') {
        setCurrentSection('atlas');
      } else if (lowerHash === 'bridge' || lowerHash === 'placements') {
        setCurrentSection('bridge');
      } else if (lowerHash.startsWith('readout')) {
        const parts = rawHash.split('/');
        setCurrentSection('readout');
        setReadoutSlug(parts[1] ? decodeURIComponent(parts[1]) : null);
      } else if (lowerHash.startsWith('folio')) {
        const parts = rawHash.split('/');
        setCurrentSection('folio');
        setFolioSlug(parts[1] ? decodeURIComponent(parts[1]) : null);
      } else if (lowerHash === 'dld' || lowerHash === 'dld-home') {
        setCurrentSection('dld-home');
      } else if (lowerHash.startsWith('workspace')) {
        const parts = rawHash.split('/');
        setCurrentSection('dld-workspace');
        const rawTab = (parts[1] || 'units').toLowerCase();
        let normalizedTab = 'units';
        let subId = parts[2] || null;

        if (rawTab === 'solvers' || rawTab === 'solver') {
          normalizedTab = 'solvers';
        } else if (rawTab === 'practice' || rawTab === 'quiz' || rawTab === 'arena') {
          normalizedTab = 'practice';
        } else if (rawTab === 'syllabus' || rawTab === 'resources') {
          normalizedTab = 'syllabus';
        } else if (rawTab === 'dld-u1' || rawTab === 'dld' || rawTab === 'theory' || rawTab === 'notes' || rawTab === 'units' || rawTab === '1') {
          normalizedTab = 'units';
          if (parts[2]) subId = parts[2];
        } else if (/^\d+\.\d+$/.test(rawTab)) {
          normalizedTab = 'units';
          subId = rawTab;
        }

        setWorkspaceTab(normalizedTab);
        if (subId) setWorkspaceSubId(subId);
      } else {
        // Fallback for unknown hash: keep calm and default to home
        setCurrentSection('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const navigateTo = (section) => {
    setCurrentSection(section);
    if (section === 'home') {
      window.location.hash = '';
    } else {
      window.location.hash = section;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToDldHome = () => {
    setCurrentSection('dld-home');
    window.location.hash = 'dld';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToDldWorkspace = (tab = 'units', subId = null) => {
    let normalizedTab = 'units';
    const rawTab = (tab || 'units').toLowerCase();
    let normalizedSubId = subId;

    if (rawTab === 'solvers' || rawTab === 'solver') {
      normalizedTab = 'solvers';
    } else if (rawTab === 'practice' || rawTab === 'quiz' || rawTab === 'arena') {
      normalizedTab = 'practice';
    } else if (rawTab === 'syllabus' || rawTab === 'resources') {
      normalizedTab = 'syllabus';
    } else if (rawTab === 'theory' || rawTab === 'notes' || rawTab === 'dld-u1' || rawTab === 'dld' || rawTab === 'units' || rawTab === '1') {
      normalizedTab = 'units';
    } else if (/^\d+\.\d+$/.test(rawTab)) {
      normalizedTab = 'units';
      normalizedSubId = rawTab;
    }

    setWorkspaceTab(normalizedTab);
    if (normalizedSubId) setWorkspaceSubId(normalizedSubId);
    setCurrentSection('dld-workspace');
    window.location.hash = normalizedSubId ? `workspace/${normalizedTab}/${normalizedSubId}` : `workspace/${normalizedTab}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectReadoutArticle = (slug) => {
    setReadoutSlug(slug);
    if (slug) {
      window.location.hash = `readout/${slug}`;
    } else {
      window.location.hash = 'readout';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectFolioEssay = (slug) => {
    setFolioSlug(slug);
    if (slug) {
      window.location.hash = `folio/${slug}`;
    } else {
      window.location.hash = 'folio';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenericSectionRoute = (route) => {
    if (!route) return;
    if (route.startsWith('workspace')) {
      const parts = route.split('/');
      goToDldWorkspace(parts[1] || 'units', parts[2] || null);
    } else if (route === 'bridge') {
      navigateTo('bridge');
    } else if (route === 'atlas') {
      navigateTo('atlas');
    } else if (route === 'dld') {
      goToDldHome();
    } else {
      navigateTo(route);
    }
  };

  const isDldView = currentSection === 'dld-home' || currentSection === 'dld-workspace';

  return (
    <ConfigProvider theme={antdThemeConfig}>
      <div className="min-h-screen bg-[#F7F5EF] text-[#25352D] font-sans flex flex-col justify-between selection:bg-[#28755E]/15 selection:text-[#245B4B]">
        
        {/* Accessible Keyboard Skip to Main Content Link */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#245B4B] focus:text-white focus:rounded-lg focus:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#28755E] text-xs font-technical font-semibold"
        >
          Skip to main content
        </a>

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
        <main id="main-content" tabIndex="-1" className="flex-1 outline-none">
          
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
              onNavigateSection={handleGenericSectionRoute}
            />
          )}

          {/* 03. Pillar 3: The Bridge */}
          {currentSection === 'bridge' && (
            <BridgeLanding 
              onNavigateHome={() => navigateTo('home')}
              onNavigateWorkbench={() => navigateTo('workbench')}
              onNavigateSection={handleGenericSectionRoute}
            />
          )}

          {/* 04. Pillar 4: The Readout */}
          {currentSection === 'readout' && (
            <ReadoutLanding 
              onNavigateHome={() => navigateTo('home')}
              activeSlug={readoutSlug}
              onSelectArticle={handleSelectReadoutArticle}
            />
          )}

          {/* 05. Pillar 5: The Folio */}
          {currentSection === 'folio' && (
            <FolioLanding 
              onNavigateHome={() => navigateTo('home')}
              activeSlug={folioSlug}
              onSelectEssay={handleSelectFolioEssay}
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
              initialSubModuleId={workspaceSubId}
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
