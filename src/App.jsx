import React, { useState, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { antdThemeConfig } from './theme/pastelTheme';
import { AlertCircle } from 'lucide-react';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { MainHome } from './components/MainHome';
import { WorkbenchLanding } from './components/WorkbenchLanding';
import { AtlasLanding } from './components/AtlasLanding';
import { JournalLanding } from './components/JournalLanding';
import { DldSubjectHome } from './components/DldSubjectHome';
import { DldWorkspace } from './components/DldWorkspace';
import { AboutModal } from './components/AboutModal';
import { InstallModal } from './components/InstallModal';

// Code-split admin workspace to ensure private desk code and seed data are never downloaded by public visitors
const AdminLogin = React.lazy(() => import('./components/admin/AdminLogin').then(m => ({ default: m.AdminLogin })));
const AdminDashboard = React.lazy(() => import('./components/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
import { getAdminSession } from './services/authService';
import { fetchContentRegistry } from './services/contentRegistryService';
import { 
  isItemPubliclyAccessible, 
  isRoutePubliclyAccessible,
  getRegistryItemById,
  getUnitRegistryId,
  getSectionRegistryId,
  getWorkspaceTabRegistryId
} from './data/centralContentRegistry';

class RouteErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('RouteErrorBoundary caught an error:', error, errorInfo);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.section !== this.props.section && this.state.hasError) {
      this.setState({ hasError: false, error: null });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-2xl mx-auto my-16 p-8 bg-white border border-[#DDE2DA] rounded-3xl shadow-soft text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto text-xl font-bold font-mono">
            !
          </div>
          <div className="space-y-1">
            <h2 className="font-editorial text-2xl font-bold text-[#25352D]">
              This section encountered an unexpected display issue
            </h2>
            <p className="text-xs text-[#5F6C64] leading-relaxed max-w-md mx-auto">
              A temporary issue occurred while rendering this view. You can return to the ZeroIndex homepage or explore another section.
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                if (this.props.onReset) this.props.onReset();
              }}
              className="px-5 py-2.5 rounded-xl bg-[#245B4B] hover:bg-[#28755E] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export function App() {
  // Navigation Section State:
  // 'home' | 'workbench' | 'atlas' | 'bridge' | 'readout' | 'folio' | 'dld-home' | 'dld-workspace' | 'admin-dashboard' | 'admin-login'
  const [currentSection, setCurrentSection] = useState('home');
  const [workspaceTab, setWorkspaceTab] = useState('units');
  const [workspaceSubId, setWorkspaceSubId] = useState('1.1');
  const [readoutSlug, setReadoutSlug] = useState(null);
  const [folioSlug, setFolioSlug] = useState(null);
  const [bridgeDomainSlug, setBridgeDomainSlug] = useState(null);
  const [atlasSlug, setAtlasSlug] = useState(null);
  const [atlasTab, setAtlasTab] = useState('learning-paths');
  const [journalCategory, setJournalCategory] = useState('insights');
  const [journalSlug, setJournalSlug] = useState(null);

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
  const [isRegistryLoaded, setIsRegistryLoaded] = useState(false);
  const [adminPreviewSection, setAdminPreviewSection] = useState(null);

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
      // Fail closed on unhandled error
    } finally {
      setIsRegistryLoaded(true);
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
        setBridgeDomainSlug(null);
        setAtlasSlug(null);
        setAtlasTab('learning-paths');
        setJournalCategory('insights');
        setJournalSlug(null);
      } else if (lowerHash === 'admin' || lowerHash === 'admin/dashboard' || lowerHash === 'admin-dashboard') {
        setCurrentSection('admin-dashboard');
      } else if (lowerHash === 'admin/login' || lowerHash === 'admin-login') {
        setCurrentSection('admin-login');
      } else if (lowerHash === 'workbench' || lowerHash.startsWith('workbench/')) {
        setCurrentSection('workbench');
      } else if (lowerHash === 'journal' || lowerHash.startsWith('journal/')) {
        setCurrentSection('journal');
        const parts = rawHash.split('/');
        const sub = parts[1] ? decodeURIComponent(parts[1]).toLowerCase() : 'insights';
        if (sub === 'reflections' || sub === 'folio') {
          setJournalCategory('reflections');
          const slug = parts[2] ? decodeURIComponent(parts[2]) : null;
          setJournalSlug(slug);
          setFolioSlug(slug);
        } else {
          setJournalCategory('insights');
          const slug = parts[2] ? decodeURIComponent(parts[2]) : null;
          setJournalSlug(slug);
          setReadoutSlug(slug);
        }
      } else if (lowerHash.startsWith('readout')) {
        const parts = rawHash.split('/');
        setCurrentSection('journal');
        setJournalCategory('insights');
        const slug = parts[1] ? decodeURIComponent(parts[1]) : null;
        setJournalSlug(slug);
        setReadoutSlug(slug);
      } else if (lowerHash.startsWith('folio')) {
        const parts = rawHash.split('/');
        setCurrentSection('journal');
        setJournalCategory('reflections');
        const slug = parts[1] ? decodeURIComponent(parts[1]) : null;
        setJournalSlug(slug);
        setFolioSlug(slug);
      } else if (lowerHash === 'atlas' || lowerHash === 'roadmaps' || lowerHash.startsWith('atlas/') || lowerHash.startsWith('roadmaps/')) {
        setCurrentSection('atlas');
        const parts = rawHash.split('/');
        const sub = parts[1] ? decodeURIComponent(parts[1]).toLowerCase() : null;
        if (sub === 'career-prep' || sub === 'bridge' || sub === 'placements') {
          setAtlasTab('career-prep');
          const domain = parts[2] ? decodeURIComponent(parts[2]).toLowerCase() : null;
          setAtlasSlug(domain);
          setBridgeDomainSlug(domain);
        } else if (sub === 'learning-paths') {
          setAtlasTab('learning-paths');
          const roadmap = parts[2] ? decodeURIComponent(parts[2]).toLowerCase() : null;
          setAtlasSlug(roadmap);
        } else if (sub === 'activity' || sub === 'preview' || sub === 'practice') {
          setAtlasTab('learning-paths');
          const act = parts[2] ? decodeURIComponent(parts[2]).toLowerCase() : 'speak-clearly';
          setAtlasSlug(act);
        } else {
          setAtlasTab('learning-paths');
          setAtlasSlug(sub);
        }
      } else if (lowerHash === 'bridge' || lowerHash === 'placements' || lowerHash.startsWith('bridge/') || lowerHash.startsWith('placements/')) {
        setCurrentSection('atlas');
        setAtlasTab('career-prep');
        const parts = rawHash.split('/');
        const domain = parts[1] ? decodeURIComponent(parts[1]).toLowerCase() : null;
        setAtlasSlug(domain);
        setBridgeDomainSlug(domain);
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
    let targetSection = section;
    let targetHash = section;

    if (section === 'admin-dashboard' || section === 'admin/dashboard' || section === 'admin') {
      targetSection = 'admin-dashboard';
      targetHash = 'admin/dashboard';
    } else if (section === 'admin-login' || section === 'admin/login') {
      targetSection = 'admin-login';
      targetHash = 'admin/login';
    } else if (section === 'home') {
      targetSection = 'home';
      targetHash = '';
    } else if (section === 'bridge') {
      targetSection = 'atlas';
      targetHash = 'atlas/career-prep';
      setAtlasTab('career-prep');
    } else if (section === 'readout') {
      targetSection = 'journal';
      targetHash = 'journal/insights';
      setJournalCategory('insights');
    } else if (section === 'folio') {
      targetSection = 'journal';
      targetHash = 'journal/reflections';
      setJournalCategory('reflections');
    } else if (section === 'atlas') {
      targetSection = 'atlas';
      targetHash = 'atlas';
    } else if (section === 'journal') {
      targetSection = 'journal';
      targetHash = 'journal';
    }

    setCurrentSection(targetSection);
    window.location.hash = targetHash;
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
    setJournalSlug(slug);
    setJournalCategory('insights');
    if (slug) {
      window.location.hash = `journal/insights/${slug}`;
    } else {
      window.location.hash = 'journal/insights';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectFolioEssay = (slug) => {
    setFolioSlug(slug);
    setJournalSlug(slug);
    setJournalCategory('reflections');
    if (slug) {
      window.location.hash = `journal/reflections/${slug}`;
    } else {
      window.location.hash = 'journal/reflections';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenericSectionRoute = (route) => {
    if (!route) return;
    if (route.startsWith('workspace')) {
      const parts = route.split('/');
      goToDldWorkspace(parts[1] || 'units', parts[2] || null);
    } else if (route === 'bridge') {
      setAtlasTab('career-prep');
      navigateTo('atlas');
    } else if (route === 'readout') {
      setJournalCategory('insights');
      navigateTo('journal');
    } else if (route === 'folio') {
      setJournalCategory('reflections');
      navigateTo('journal');
    } else if (route === 'atlas') {
      navigateTo('atlas');
    } else if (route === 'journal') {
      navigateTo('journal');
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

  const renderOfflineContentNotice = (title, message = 'This curriculum content has been taken offline by the administrator for review.', fallbackRoute = 'workspace/units/1.1', fallbackLabel = 'Return to Available Course Content') => (
    <div className="min-h-[70vh] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#DDE2DA] shadow-xs space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-[#FFF9F2] text-[#956A43] flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h2 className="font-editorial text-xl font-bold text-[#293B32]">
            {title} is Temporarily Unavailable
          </h2>
          <p className="text-xs text-[#5F6C64] leading-relaxed">
            {message}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
          <button
            onClick={() => handleGenericSectionRoute(fallbackRoute)}
            className="px-5 py-2.5 rounded-xl bg-[#285C49] hover:bg-[#1E4738] text-white text-xs font-bold transition-colors cursor-pointer w-full sm:w-auto"
          >
            {fallbackLabel}
          </button>
          <button
            onClick={() => navigateTo('home')}
            className="px-5 py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#EBE5F0] border border-[#DDE2DA] text-[#5F6C64] hover:text-[#25352D] text-xs font-bold transition-colors cursor-pointer w-full sm:w-auto"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );

  const renderLoadingNotice = () => (
    <div className="min-h-[70vh] flex items-center justify-center p-6 text-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#285C49] border-t-transparent animate-spin" />
        <span className="font-technical text-xs text-[#5F6C64]">Verifying publication status...</span>
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

        {/* Administrator Preview Notification Banner */}
        {adminPreviewSection && adminSession.isAuthenticated && adminSession.isOwner && (
          <div className="bg-[#FFF9F2] border-b border-[#F0DBC5] px-4 py-2.5 text-xs font-technical flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[#956A43] sticky top-16 z-30 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C38A63] animate-pulse" />
              <span className="font-bold">AUTHORIZED ADMIN PREVIEW:</span>
              <span>Inspecting restricted section as verified owner. Anonymous visitors see offline notice.</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setAdminPreviewSection(null);
                  navigateTo('admin-dashboard');
                }}
                className="px-3 py-1 rounded-lg bg-white border border-[#F0DBC5] hover:bg-[#FDF3E7] text-[#956A43] font-bold transition-colors cursor-pointer"
              >
                Return to Admin Dashboard
              </button>
              <button
                onClick={() => {
                  setAdminPreviewSection(null);
                  navigateTo('home');
                }}
                className="px-3 py-1 rounded-lg bg-[#285C49] hover:bg-[#1E4738] text-white font-bold transition-colors cursor-pointer"
              >
                Exit to Public Site
              </button>
            </div>
          </div>
        )}

        {/* Render SiteHeader on all top-level public pages (Home & 5 Pillars) */}
        {!isDldView && !isAdminView && (
          <SiteHeader 
            currentSection={currentSection}
            onNavigate={(sec) => {
              setAdminPreviewSection(null);
              navigateTo(sec);
            }}
            onOpenInstallModal={() => setIsInstallModalOpen(true)}
            onOpenAboutModal={() => setIsAboutModalOpen(true)}
            contentOverrides={contentOverrides}
            isRegistryLoaded={isRegistryLoaded}
          />
        )}

        {/* =====================================================================
            PRIMARY VIEW ROUTER
        ===================================================================== */}
        <main id="main-content" tabIndex="-1" className="flex-1 outline-none">
          <RouteErrorBoundary section={currentSection} onReset={() => navigateTo('home')}>
          
          {/* Admin Login Route */}
          {currentSection === 'admin-login' && (
            <React.Suspense fallback={<div className="py-24 text-center text-xs text-[#5F6C64]">Loading Owner Workspace...</div>}>
              <AdminLogin 
                onLoginSuccess={() => {
                  refreshAdminState();
                  navigateTo('admin-dashboard');
                }}
                onNavigateHome={() => navigateTo('home')}
              />
            </React.Suspense>
          )}

          {/* Admin Dashboard Route */}
          {currentSection === 'admin-dashboard' && (
            <React.Suspense fallback={<div className="py-24 text-center text-xs text-[#5F6C64]">Loading Owner Workspace...</div>}>
              {adminSession.isAuthenticated && adminSession.isOwner ? (
                <AdminDashboard 
                  adminSession={adminSession}
                  onLogout={() => {
                    setAdminPreviewSection(null);
                    refreshAdminState();
                    navigateTo('home');
                  }}
                  onNavigatePublicRoute={handleGenericSectionRoute}
                  onPreviewRoute={(route) => {
                    setAdminPreviewSection(route);
                    navigateTo(route);
                  }}
                  onNavigateHome={() => {
                    setAdminPreviewSection(null);
                    navigateTo('home');
                  }}
                />
              ) : (
                <AdminLogin 
                  onLoginSuccess={() => {
                    refreshAdminState();
                    navigateTo('admin-dashboard');
                  }}
                  onNavigateHome={() => navigateTo('home')}
                />
              )}
            </React.Suspense>
          )}

          {/* 00. Homepage (Clean Editorial Front Door) */}
          {currentSection === 'home' && (
            <MainHome 
              onNavigate={navigateTo}
              onOpenAboutModal={() => setIsAboutModalOpen(true)}
              onOpenInstallModal={() => setIsInstallModalOpen(true)}
              contentOverrides={contentOverrides}
              isRegistryLoaded={isRegistryLoaded}
            />
          )}

          {/* 01. Pillar 1: The Workbench */}
          {currentSection === 'workbench' && (
            !isRegistryLoaded ? (
              renderLoadingNotice()
            ) : (adminPreviewSection === 'workbench' && adminSession.isAuthenticated && adminSession.isOwner) ? (
              <WorkbenchLanding 
                onNavigateHome={() => {
                  setAdminPreviewSection(null);
                  navigateTo('home');
                }}
                onSelectDld={goToDldHome}
                onOpenWorkspaceTab={goToDldWorkspace}
                contentOverrides={contentOverrides}
                isAdminPreview={true}
              />
            ) : isItemPubliclyAccessible('pillar-workbench', contentOverrides) ? (
              <WorkbenchLanding 
                onNavigateHome={() => navigateTo('home')}
                onSelectDld={goToDldHome}
                onOpenWorkspaceTab={goToDldWorkspace}
                contentOverrides={contentOverrides}
                isAdminPreview={false}
              />
            ) : (
              renderOfflinePillarNotice('The Workbench')
            )
          )}

          {/* 02. Pillar 2: The Atlas */}
          {(currentSection === 'atlas' || currentSection === 'bridge') && (
            !isRegistryLoaded ? (
              renderLoadingNotice()
            ) : (adminSession.isAuthenticated && adminSession.isOwner) ? (
              <AtlasLanding 
                onNavigateHome={() => {
                  setAdminPreviewSection(null);
                  navigateTo('home');
                }}
                onNavigateWorkbench={() => navigateTo('workbench')}
                onNavigateSection={handleGenericSectionRoute}
                contentOverrides={contentOverrides}
                isAdminPreview={true}
                initialTab={atlasTab}
                initialSubId={atlasSlug || bridgeDomainSlug}
                initialDomainId={bridgeDomainSlug}
                initialMapId={atlasSlug}
              />
            ) : (!isItemPubliclyAccessible('pillar-atlas', contentOverrides) && !isItemPubliclyAccessible('pillar-bridge', contentOverrides)) ? (
              renderOfflinePillarNotice('The Atlas')
            ) : (atlasTab === 'career-prep' && bridgeDomainSlug && !isRoutePubliclyAccessible(`atlas/career-prep/${bridgeDomainSlug}`, contentOverrides) && !isRoutePubliclyAccessible(`bridge/${bridgeDomainSlug}`, contentOverrides)) ? (
              renderOfflineContentNotice(
                'The Career Preparation Track',
                'This placement preparation track has not been published or has been placed offline by the administrator.',
                'atlas/career-prep',
                'Return to Career Preparation'
              )
            ) : (atlasTab === 'learning-paths' && atlasSlug && (() => {
              const isActivity = ['speak-clearly', 'speak-clearly-60s', 'listen-respond', 'express-your-opinion', 'express-opinion', 'everyday-conversations', 'everyday-conversation'].includes(atlasSlug);
              if (isActivity) {
                return !isRoutePubliclyAccessible(`atlas/activity/${atlasSlug}`, contentOverrides);
              }
              return !isRoutePubliclyAccessible(`atlas/${atlasSlug}`, contentOverrides) && !isRoutePubliclyAccessible(`atlas/learning-paths/${atlasSlug}`, contentOverrides);
            })()) ? (
              renderOfflineContentNotice(
                ['speak-clearly', 'speak-clearly-60s', 'listen-respond', 'express-your-opinion', 'express-opinion', 'everyday-conversations', 'everyday-conversation'].includes(atlasSlug)
                  ? 'The Atlas Learning Activity'
                  : 'The Atlas Learning Path',
                ['speak-clearly', 'speak-clearly-60s', 'listen-respond', 'express-your-opinion', 'express-opinion', 'everyday-conversations', 'everyday-conversation'].includes(atlasSlug)
                  ? 'This learning activity is currently under faculty review and has not yet been published.'
                  : 'This learning roadmap has not been published or has been placed offline by the administrator.',
                'atlas/learning-paths',
                'Return to The Atlas'
              )
            ) : (
              <AtlasLanding 
                onNavigateHome={() => navigateTo('home')}
                onNavigateWorkbench={() => navigateTo('workbench')}
                onNavigateSection={handleGenericSectionRoute}
                contentOverrides={contentOverrides}
                isAdminPreview={false}
                initialTab={atlasTab}
                initialSubId={atlasSlug || bridgeDomainSlug}
                initialDomainId={bridgeDomainSlug}
                initialMapId={atlasSlug}
              />
            )
          )}

          {/* 03. Pillar 3: The Journal */}
          {(currentSection === 'journal' || currentSection === 'readout' || currentSection === 'folio') && (
            !isRegistryLoaded ? (
              renderLoadingNotice()
            ) : (adminPreviewSection === 'journal' || adminPreviewSection === 'readout' || adminPreviewSection === 'folio') && adminSession.isAuthenticated && adminSession.isOwner ? (
              <JournalLanding 
                onNavigateHome={() => {
                  setAdminPreviewSection(null);
                  navigateTo('home');
                }}
                onNavigateWorkbench={() => navigateTo('workbench')}
                contentOverrides={contentOverrides}
                isAdminPreview={true}
                initialCategory={journalCategory}
                initialSlug={journalSlug}
              />
            ) : (!isItemPubliclyAccessible('pillar-readout', contentOverrides) && !isItemPubliclyAccessible('pillar-folio', contentOverrides)) ? (
              renderOfflinePillarNotice('The Journal')
            ) : (journalSlug && journalCategory === 'insights' && !isRoutePubliclyAccessible(`journal/insights/${journalSlug}`, contentOverrides) && !isRoutePubliclyAccessible(`readout/${journalSlug}`, contentOverrides)) ? (
              renderOfflineContentNotice(
                'The Journal Article',
                'This article has not been published or has been placed offline by the administrator.',
                'journal/insights',
                'Return to The Journal'
              )
            ) : (journalSlug && journalCategory === 'reflections' && !isRoutePubliclyAccessible(`journal/reflections/${journalSlug}`, contentOverrides) && !isRoutePubliclyAccessible(`folio/${journalSlug}`, contentOverrides)) ? (
              renderOfflineContentNotice(
                'The Journal Reflection',
                'This reflection has not been published or has been placed offline by the administrator.',
                'journal/reflections',
                'Return to The Journal'
              )
            ) : (
              <JournalLanding 
                onNavigateHome={() => navigateTo('home')}
                onNavigateWorkbench={() => navigateTo('workbench')}
                contentOverrides={contentOverrides}
                isAdminPreview={false}
                initialCategory={journalCategory}
                initialSlug={journalSlug}
              />
            )
          )}

          {/* INTERNAL COURSE: Digital Logic Design Subject Home Page */}
          {currentSection === 'dld-home' && (
            !isRegistryLoaded ? (
              renderLoadingNotice()
            ) : !isItemPubliclyAccessible('pillar-workbench', contentOverrides) ? (
              renderOfflinePillarNotice('The Workbench')
            ) : !isItemPubliclyAccessible('workbench-subject-dld', contentOverrides) && !(adminPreviewSection === 'dld' && adminSession.isAuthenticated && adminSession.isOwner) ? (
              renderOfflinePillarNotice('Digital Logic Design')
            ) : (
              <DldSubjectHome 
                onBackToPortal={() => navigateTo('workbench')}
                onOpenWorkspaceTab={goToDldWorkspace}
                contentOverrides={contentOverrides}
                isAdminPreview={adminPreviewSection === 'dld' && adminSession.isAuthenticated && adminSession.isOwner}
              />
            )
          )}

          {/* INTERNAL WORKSPACE: Units, Solvers, Quiz Arena, Subject Resources */}
          {currentSection === 'dld-workspace' && (
            !isRegistryLoaded ? (
              renderLoadingNotice()
            ) : !isItemPubliclyAccessible('pillar-workbench', contentOverrides) ? (
              renderOfflinePillarNotice('The Workbench')
            ) : !isItemPubliclyAccessible('workbench-subject-dld', contentOverrides) ? (
              renderOfflinePillarNotice('Digital Logic Design')
            ) : (() => {
              const isAdminPreview = Boolean(
                adminPreviewSection &&
                adminSession.isAuthenticated &&
                adminSession.isOwner
              );

              // Safe development-only preview for faculty review of Sections 2.6 and 2.7
              const isLocalFacultyReviewRoute = Boolean(
                import.meta.env.DEV &&
                (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) &&
                workspaceTab === 'units' &&
                (workspaceSubId === '2.6' || workspaceSubId === '2.7')
              );

              // Validate route-level accessibility for active tab and section
              const activeRoute = workspaceTab === 'units'
                ? `workspace/units/${workspaceSubId}`
                : `workspace/${workspaceTab}`;

              const isCurrentRouteAccessible = isAdminPreview || isLocalFacultyReviewRoute || isRoutePubliclyAccessible(activeRoute, contentOverrides);

              if (!isCurrentRouteAccessible) {
                if (workspaceTab === 'units') {
                  const unitNum = workspaceSubId ? workspaceSubId.split('.')[0] : '1';
                  const unitItem = getRegistryItemById(getUnitRegistryId(unitNum));
                  const sectionItem = getRegistryItemById(getSectionRegistryId(workspaceSubId));
                  const title = sectionItem?.title || unitItem?.title || `Section ${workspaceSubId}`;
                  return renderOfflineContentNotice(
                    title,
                    'This curriculum unit or section has been taken offline by the administrator for review.',
                    'workspace/units/1.1',
                    'Return to Unit I (Available)'
                  );
                } else if (workspaceTab === 'solvers') {
                  return renderOfflineContentNotice(
                    'Interactive Visual Solvers',
                    'The visual computing solvers suite has been taken offline by the administrator for review.',
                    'workspace/units/1.1',
                    'Go to Available Course Units'
                  );
                } else if (workspaceTab === 'practice') {
                  return renderOfflineContentNotice(
                    'Practice Arena',
                    'The self-assessment practice arena has been taken offline by the administrator for review.',
                    'workspace/units/1.1',
                    'Go to Available Course Units'
                  );
                } else if (workspaceTab === 'syllabus') {
                  return renderOfflineContentNotice(
                    'Subject Resources',
                    'The subject resources and reference materials have been taken offline by the administrator for review.',
                    'workspace/units/1.1',
                    'Go to Available Course Units'
                  );
                }
              }

              return (
                <DldWorkspace 
                  onBackToDldHome={goToDldHome}
                  initialTab={workspaceTab}
                  initialSubModuleId={workspaceSubId}
                  contentOverrides={contentOverrides}
                  isAdminPreview={isAdminPreview}
                  isLocalFacultyReview={isLocalFacultyReviewRoute}
                />
              );
            })()
          )}

          </RouteErrorBoundary>
        </main>

        {/* Render SiteFooter on all top-level public pages */}
        {!isDldView && !isAdminView && (
          <SiteFooter 
            onNavigate={(sec) => {
              setAdminPreviewSection(null);
              navigateTo(sec);
            }}
            onOpenAboutModal={() => setIsAboutModalOpen(true)}
            contentOverrides={contentOverrides}
            isRegistryLoaded={isRegistryLoaded}
          />
        )}

        {/* Global Modals */}
        <AboutModal 
          isOpen={isAboutModalOpen}
          onClose={() => setIsAboutModalOpen(false)}
          isAdmin={adminSession.isAuthenticated && adminSession.isOwner}
          onOpenAdmin={() => navigateTo('admin/dashboard')}
          onOpenLogin={() => navigateTo('admin/login')}
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
