import React, { useState, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { antdThemeConfig } from './theme/pastelTheme';
import { AlertCircle } from 'lucide-react';
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
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { getAdminSession } from './services/authService';
import { fetchContentRegistry } from './services/contentRegistryService';
import { isItemPubliclyAccessible, isRoutePubliclyAccessible } from './data/centralContentRegistry';

export function App() {
  // Navigation Section State:
  // 'home' | 'workbench' | 'atlas' | 'bridge' | 'readout' | 'folio' | 'dld-home' | 'dld-workspace' | 'admin-dashboard' | 'admin-login'
  const [currentSection, setCurrentSection] = useState('home');
  const [workspaceTab, setWorkspaceTab] = useState('units');
  const [workspaceSubId, setWorkspaceSubId] = useState('1.1');
  const [readoutSlug, setReadoutSlug] = useState(null);
  const [folioSlug, setFolioSlug] = useState(null);

  // Administrator authentication and content overrides state
  const [adminSession, setAdminSession] = useState({
    isAuthenticated: false,
    isOwner: false,
    email: '',
    userId: '',
    assuranceLevel: 'aal1',
    hasMfaEnrolled: false,
    isSimulated: false
  });
  const [contentOverrides, setContentOverrides] = useState({});

  // Modals state
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  // Initialize and check admin session & content registry overrides
  const refreshAdminState = async () => {
    try {
      const session = await getAdminSession();
      setAdminSession(session);
      const registryItems = await fetchContentRegistry();
      const overridesMap = {};
      registryItems.forEach(item => {
        overridesMap[item.id] = item.isPublic;
      });
      setContentOverrides(overridesMap);
    } catch {
      // Ignore initial load error
    }
  };

  useEffect(() => {
    refreshAdminState();
  }, []);

  // Sync hash routing on initial load, hashchange, and popstate
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace(/^#\/?/, '').trim();
      const lowerHash = rawHash.toLowerCase();

      if (!lowerHash || lowerHash === 'home') {
        setCurrentSection('home');
        setReadoutSlug(null);
        setFolioSlug(null);
      } else if (lowerHash === 'admin' || lowerHash === 'admin/dashboard' || lowerHash === 'admin-dashboard') {
        setCurrentSection('admin-dashboard');
      } else if (lowerHash === 'admin/login' || lowerHash === 'admin-login') {
        setCurrentSection('admin-login');
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
      } else if (lowerHash.startsWith('dld/') || lowerHash.startsWith('dld-u') || lowerHash.startsWith('unit') || /^(?:sec(?:tion)?[-_]?)?([1-5]\.[1-7])$/i.test(lowerHash)) {
        setCurrentSection('dld-workspace');
        setWorkspaceTab('units');
        const match = lowerHash.match(/([1-5]\.[1-7])/);
        if (match) {
          setWorkspaceSubId(match[1]);
        } else if (lowerHash.includes('2')) {
          setWorkspaceSubId('2.2');
        } else {
          setWorkspaceSubId('1.1');
        }
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
        } else if (rawTab === 'dld-u1' || rawTab === '1') {
          normalizedTab = 'units';
          subId = parts[2] || '1.1';
        } else if (rawTab === 'dld-u2' || rawTab === '2') {
          normalizedTab = 'units';
          subId = parts[2] || '2.2';
        } else if (rawTab === 'dld' || rawTab === 'theory' || rawTab === 'notes' || rawTab === 'units') {
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
  const isAdminView = currentSection === 'admin-dashboard' || currentSection === 'admin-login';

  const renderOfflinePillarNotice = (pillarTitle) => (
    <div className="min-h-[70vh] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#DDE2DA] shadow-xs space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-[#FFF9F2] text-[#956A43] flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h2 className="font-editorial text-xl font-bold text-[#293B32]">
            {pillarTitle} is Temporarily Offline
          </h2>
          <p className="text-xs text-[#5F6C64] leading-relaxed">
            This section has been taken offline by the administrator for curriculum maintenance or review.
          </p>
        </div>
        <button
          onClick={() => navigateTo('home')}
          className="px-5 py-2.5 rounded-xl bg-[#285C49] hover:bg-[#1E4738] text-white text-xs font-bold transition-colors cursor-pointer"
        >
          Return to ZeroIndex Home
        </button>
      </div>
    </div>
  );

  return (
    <ConfigProvider theme={antdThemeConfig}>
      <div className="min-h-screen bg-[#FBF8F2] text-[#293B32] font-sans flex flex-col justify-between selection:bg-[#285C49]/15 selection:text-[#285C49]">
        
        {/* Accessible Keyboard Skip to Main Content Link */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#285C49] focus:text-white focus:rounded-lg focus:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#285C49] text-xs font-technical font-semibold"
        >
          Skip to main content
        </a>

        {/* Render SiteHeader on all top-level public pages (Home & 5 Pillars) */}
        {!isDldView && !isAdminView && (
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
          
          {/* Admin Login Route */}
          {currentSection === 'admin-login' && (
            <AdminLogin 
              onLoginSuccess={() => {
                refreshAdminState();
                navigateTo('admin-dashboard');
              }}
              onNavigateHome={() => navigateTo('home')}
            />
          )}

          {/* Admin Dashboard Route */}
          {currentSection === 'admin-dashboard' && (
            adminSession.isAuthenticated && adminSession.isOwner ? (
              <AdminDashboard 
                adminSession={adminSession}
                onLogout={() => {
                  refreshAdminState();
                  navigateTo('home');
                }}
                onNavigatePublicRoute={handleGenericSectionRoute}
                onNavigateHome={() => navigateTo('home')}
              />
            ) : (
              <AdminLogin 
                onLoginSuccess={() => {
                  refreshAdminState();
                  navigateTo('admin-dashboard');
                }}
                onNavigateHome={() => navigateTo('home')}
              />
            )
          )}

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
            isItemPubliclyAccessible('pillar-workbench', contentOverrides) ? (
              <WorkbenchLanding 
                onNavigateHome={() => navigateTo('home')}
                onSelectDld={goToDldHome}
                onOpenWorkspaceTab={goToDldWorkspace}
              />
            ) : (
              renderOfflinePillarNotice('The Workbench')
            )
          )}

          {/* 02. Pillar 2: The Atlas */}
          {currentSection === 'atlas' && (
            isItemPubliclyAccessible('pillar-atlas', contentOverrides) ? (
              <AtlasLanding 
                onNavigateHome={() => navigateTo('home')}
                onNavigateWorkbench={() => navigateTo('workbench')}
                onNavigateSection={handleGenericSectionRoute}
              />
            ) : (
              renderOfflinePillarNotice('The Atlas')
            )
          )}

          {/* 03. Pillar 3: The Bridge */}
          {currentSection === 'bridge' && (
            isItemPubliclyAccessible('pillar-bridge', contentOverrides) ? (
              <BridgeLanding 
                onNavigateHome={() => navigateTo('home')}
                onNavigateWorkbench={() => navigateTo('workbench')}
                onNavigateSection={handleGenericSectionRoute}
              />
            ) : (
              renderOfflinePillarNotice('The Bridge')
            )
          )}

          {/* 04. Pillar 4: The Readout */}
          {currentSection === 'readout' && (
            isItemPubliclyAccessible('pillar-readout', contentOverrides) ? (
              <ReadoutLanding 
                onNavigateHome={() => navigateTo('home')}
                activeSlug={readoutSlug}
                onSelectArticle={handleSelectReadoutArticle}
              />
            ) : (
              renderOfflinePillarNotice('The Readout')
            )
          )}

          {/* 05. Pillar 5: The Folio */}
          {currentSection === 'folio' && (
            isItemPubliclyAccessible('pillar-folio', contentOverrides) ? (
              <FolioLanding 
                onNavigateHome={() => navigateTo('home')}
                activeSlug={folioSlug}
                onSelectEssay={handleSelectFolioEssay}
              />
            ) : (
              renderOfflinePillarNotice('The Folio')
            )
          )}

          {/* INTERNAL COURSE: Digital Logic Design Subject Home Page */}
          {currentSection === 'dld-home' && (
            isItemPubliclyAccessible('workbench-subject-dld', contentOverrides) && isItemPubliclyAccessible('pillar-workbench', contentOverrides) ? (
              <DldSubjectHome 
                onBackToPortal={() => navigateTo('workbench')}
                onOpenWorkspaceTab={goToDldWorkspace}
              />
            ) : (
              renderOfflinePillarNotice('Digital Logic Design')
            )
          )}

          {/* INTERNAL WORKSPACE: Units, Solvers, Quiz Arena, Subject Resources */}
          {currentSection === 'dld-workspace' && (
            isItemPubliclyAccessible('workbench-subject-dld', contentOverrides) && isItemPubliclyAccessible('pillar-workbench', contentOverrides) ? (
              <DldWorkspace 
                onBackToDldHome={goToDldHome}
                initialTab={workspaceTab}
                initialSubModuleId={workspaceSubId}
              />
            ) : (
              renderOfflinePillarNotice('Digital Logic Design Workspace')
            )
          )}

        </main>

        {/* Render SiteFooter on all top-level public pages */}
        {!isDldView && !isAdminView && (
          <SiteFooter 
            onNavigate={navigateTo}
            onOpenAboutModal={() => setIsAboutModalOpen(true)}
          />
        )}

        {/* Global Modals */}
        <AboutModal 
          isOpen={isAboutModalOpen}
          onClose={() => setIsAboutModalOpen(false)}
          isAdmin={adminSession.isAuthenticated && adminSession.isOwner}
          onOpenAdmin={() => navigateTo('admin-dashboard')}
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
