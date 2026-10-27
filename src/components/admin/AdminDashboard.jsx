import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Search, 
  ChevronRight, 
  ChevronDown, 
  Eye, 
  EyeOff, 
  Lock, 
  LogOut, 
  ExternalLink, 
  RefreshCw, 
  Smartphone, 
  History, 
  HelpCircle, 
  Server, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Sliders,
  Sparkles,
  BookOpen,
  Compass,
  Briefcase,
  Radio
} from 'lucide-react';
import { ZeroIndexMark } from '../ZeroIndexMark';
import { logoutAdmin } from '../../services/authService';
import { 
  fetchContentRegistry, 
  updateItemVisibility, 
  fetchUnpublishedDraft 
} from '../../services/contentRegistryService';
import { isItemPubliclyAccessible } from '../../data/centralContentRegistry';
import { getSupabaseConfigStatus } from '../../services/supabaseClient';
import { MfaEnrollModal } from './MfaEnrollModal';
import { AuditLogModal } from './AuditLogModal';
import { SecureDraftPreviewModal } from './SecureDraftPreviewModal';
import { SupabaseSetupModal } from './SupabaseSetupModal';
import { ProjectDeskView } from './ProjectDeskView';

export const AdminDashboard = ({ 
  adminSession, 
  onLogout, 
  onNavigatePublicRoute, 
  onNavigateHome,
  onPreviewRoute
}) => {
  const [registry, setRegistry] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [notification, setNotification] = useState({ type: '', message: '' });
  
  // Primary Workspace Mode: 'publishing' | 'project-desk'
  const [workspaceMode, setWorkspaceMode] = useState('publishing');
  
  // Search & Filter state
  const [selectedPillar, setSelectedPillar] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNodes, setExpandedNodes] = useState({
    'pillar-workbench': true,
    'workbench-subject-dld': true,
    'dld-unit-1': true,
    'dld-unit-2': true,
    'pillar-atlas': true,
    'atlas-div-foundations': true,
    'pillar-bridge': true,
    'pillar-readout': true,
    'pillar-folio': true
  });

  // Modals state
  const [isMfaModalOpen, setIsMfaModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [previewDraft, setPreviewDraft] = useState(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const configStatus = getSupabaseConfigStatus();

  // Load registry items
  const loadRegistry = async () => {
    setLoading(true);
    try {
      const items = await fetchContentRegistry();
      setRegistry(items || []);
    } catch (err) {
      setNotification({ type: 'error', message: 'Failed to load content registry: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRegistry();
  }, []);

  // Compute visibility overrides map for ancestry check
  const currentOverrides = useMemo(() => {
    const map = {};
    registry.forEach(item => {
      map[item.id] = item.isPublic;
    });
    return map;
  }, [registry]);

  // Compute hierarchical tree
  const { roots, childrenMap } = useMemo(() => {
    const rootsList = [];
    const map = new Map();

    registry.forEach(item => {
      if (!item.parentId) {
        rootsList.push(item);
      } else {
        if (!map.has(item.parentId)) {
          map.set(item.parentId, []);
        }
        map.get(item.parentId).push(item);
      }
    });

    return { roots: rootsList, childrenMap: map };
  }, [registry]);

  // Toggle node expansion
  const toggleNode = (nodeId) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  const expandAll = () => {
    const all = {};
    registry.forEach(item => { all[item.id] = true; });
    setExpandedNodes(all);
  };

  const collapseAll = () => {
    setExpandedNodes({});
  };

  // Toggle Visibility Handler
  const handleToggleVisibility = async (item) => {
    if (item.editorialStatus !== 'published') {
      setNotification({
        type: 'error',
        message: `Cannot publish "${item.title}". Only approved items with status "published" can be made public.`
      });
      return;
    }

    const nextPublicState = !item.isPublic;
    setUpdatingId(item.id);
    setNotification({ type: '', message: '' });

    try {
      const res = await updateItemVisibility({
        itemId: item.id,
        isPublic: nextPublicState,
        adminSession
      });

      if (res.success) {
        setRegistry(prev => prev.map(i => i.id === item.id ? { ...i, isPublic: nextPublicState } : i));
        setNotification({
          type: 'success',
          message: `Successfully ${nextPublicState ? 'published' : 'hidden'} "${item.title}".`
        });
        setTimeout(() => setNotification({ type: '', message: '' }), 4000);
      } else {
        setNotification({ type: 'error', message: res.error || 'Failed to update visibility.' });
      }
    } catch (err) {
      setNotification({ type: 'error', message: err.message || 'Error updating visibility.' });
    } finally {
      setUpdatingId(null);
    }
  };

  // Inspect draft content
  const handleInspectDraft = async (draftId) => {
    try {
      const res = await fetchUnpublishedDraft(draftId, adminSession);
      if (res.success) {
        setPreviewDraft(res.draft);
        setIsPreviewModalOpen(true);
      } else {
        setNotification({ type: 'error', message: res.error || 'Unable to load draft content.' });
      }
    } catch (err) {
      setNotification({ type: 'error', message: err.message || 'Error loading draft.' });
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    await logoutAdmin();
    if (onLogout) onLogout();
  };

  // Stats calculation
  const stats = useMemo(() => {
    const total = registry.length;
    let publishedPublic = 0;
    let publishedHidden = 0;
    let protectedDrafts = 0;

    registry.forEach(item => {
      if (item.editorialStatus === 'published') {
        const isPubliclyActive = isItemPubliclyAccessible(item.id, currentOverrides);
        if (isPubliclyActive) {
          publishedPublic += 1;
        } else {
          publishedHidden += 1;
        }
      } else {
        protectedDrafts += 1;
      }
    });

    return { total, publishedPublic, publishedHidden, protectedDrafts };
  }, [registry, currentOverrides]);

  // Pillar icon resolver
  const getPillarIcon = (pillar) => {
    switch (pillar) {
      case 'workbench': return <Layers className="w-4 h-4 text-[#346C53]" />;
      case 'atlas': return <Compass className="w-4 h-4 text-[#496D91]" />;
      case 'bridge': return <Briefcase className="w-4 h-4 text-[#956A43]" />;
      case 'readout': return <Radio className="w-4 h-4 text-[#765C90]" />;
      case 'folio': return <FileText className="w-4 h-4 text-[#935F5D]" />;
      default: return <BookOpen className="w-4 h-4 text-[#285C49]" />;
    }
  };

  // Status badge styling
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'published':
        return (
          <span className="px-2 py-0.5 rounded-full bg-[#E0EBDF] text-[#285C49] font-technical text-[10px] font-bold uppercase tracking-wider">
            Published
          </span>
        );
      case 'in_review':
        return (
          <span className="px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E] font-technical text-[10px] font-bold uppercase tracking-wider">
            In Review
          </span>
        );
      case 'draft':
        return (
          <span className="px-2 py-0.5 rounded-full bg-[#E0E7FF] text-[#3730A3] font-technical text-[10px] font-bold uppercase tracking-wider">
            Draft
          </span>
        );
      case 'planned':
      default:
        return (
          <span className="px-2 py-0.5 rounded-full bg-[#F0F1EB] text-[#5F6C64] font-technical text-[10px] font-bold uppercase tracking-wider">
            Planned
          </span>
        );
    }
  };

  // Recursive Tree Row Renderer
  const renderTreeItem = (item, level = 0) => {
    const children = childrenMap.get(item.id) || [];
    const hasChildren = children.length > 0;
    const isExpanded = Boolean(expandedNodes[item.id]);

    // Apply Filters
    if (selectedPillar !== 'all' && item.pillar !== selectedPillar) {
      // Check if any descendant matches
      const hasMatchingDescendant = (nodeId) => {
        const subs = childrenMap.get(nodeId) || [];
        return subs.some(sub => sub.pillar === selectedPillar || hasMatchingDescendant(sub.id));
      };
      if (!hasMatchingDescendant(item.id)) return null;
    }

    if (selectedStatus !== 'all' && item.editorialStatus !== selectedStatus) {
      // If item itself doesn't match status, only render if a child matches
      const hasMatchingStatus = (nodeId) => {
        const subs = childrenMap.get(nodeId) || [];
        return subs.some(sub => sub.editorialStatus === selectedStatus || hasMatchingStatus(sub.id));
      };
      if (!hasMatchingStatus(item.id)) return null;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesSelf = item.title.toLowerCase().includes(q) || 
                          item.id.toLowerCase().includes(q) || 
                          item.route.toLowerCase().includes(q);
      const hasMatchingSearch = (nodeId) => {
        const subs = childrenMap.get(nodeId) || [];
        return subs.some(sub => 
          sub.title.toLowerCase().includes(q) || 
          sub.id.toLowerCase().includes(q) || 
          sub.route.toLowerCase().includes(q) || 
          hasMatchingSearch(sub.id)
        );
      };
      if (!matchesSelf && !hasMatchingSearch(item.id)) return null;
    }

    const isDirectlyPublic = Boolean(item.isPublic);
    const isInheritedActive = isItemPubliclyAccessible(item.id, currentOverrides);
    const isParentHidden = item.parentId && !isItemPubliclyAccessible(item.parentId, currentOverrides);
    const canToggle = item.editorialStatus === 'published';

    return (
      <div key={item.id} className="space-y-1">
        <div 
          className={`group flex items-center justify-between p-3 rounded-2xl border transition-all ${
            level === 0 
              ? 'bg-white border-[#DDE2DA] shadow-xs' 
              : 'bg-[#FBF8F2] border-[#E8ECE5] hover:bg-white'
          }`}
          style={{ marginLeft: `${level * 20}px` }}
        >
          {/* Left: Expansion Carat, Icon, Title, and ID */}
          <div className="flex items-center gap-3 min-w-0 flex-1 pr-4">
            {hasChildren ? (
              <button
                type="button"
                onClick={() => toggleNode(item.id)}
                className="w-6 h-6 rounded-lg hover:bg-[#F0F1EB] flex items-center justify-center text-[#5F6C64] transition-colors cursor-pointer flex-shrink-0"
                aria-label={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            ) : (
              <div className="w-6 flex-shrink-0" />
            )}

            <div className="flex-shrink-0">
              {getPillarIcon(item.pillar)}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-xs text-[#25352D] truncate">
                  {item.title}
                </span>

                <span className="font-technical text-[10px] text-[#85928A] px-1.5 py-0.5 rounded bg-[#F0F1EB]">
                  {item.contentType}
                </span>

                {renderStatusBadge(item.editorialStatus)}

                {isParentHidden && item.editorialStatus === 'published' && (
                  <span className="text-[10px] text-[#956A43] font-technical bg-[#FFF9F2] px-1.5 py-0.5 rounded border border-[#F2DEBF]">
                    Inherited Hidden
                  </span>
                )}
              </div>

              <div className="text-[11px] text-[#85928A] font-mono truncate mt-0.5">
                Route: #{item.route}
              </div>
            </div>
          </div>

          {/* Right: Visibility Switch and Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            
            {/* Visibility Toggle */}
            {canToggle ? (
              <button
                type="button"
                disabled={updatingId === item.id}
                onClick={() => handleToggleVisibility(item)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isDirectlyPublic
                    ? 'bg-[#E0EBDF] hover:bg-[#D5E3DB] text-[#285C49]'
                    : 'bg-[#F2E8DC] hover:bg-[#EBDDCF] text-[#956A43]'
                }`}
                title={isDirectlyPublic ? 'Click to hide from public' : 'Click to make publicly visible'}
              >
                {updatingId === item.id ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : isDirectlyPublic ? (
                  <Eye className="w-3.5 h-3.5" />
                ) : (
                  <EyeOff className="w-3.5 h-3.5" />
                )}
                <span>{isDirectlyPublic ? 'Public' : 'Hidden'}</span>
              </button>
            ) : (
              <div 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F0F1EB] text-[#85928A] text-xs font-medium cursor-not-allowed"
                title="Drafts and planned tracks cannot be made public until approved and published."
              >
                <Lock className="w-3 h-3" />
                <span>Restricted</span>
              </div>
            )}

            {/* Inspect / Preview Button */}
            {item.editorialStatus === 'published' ? (
              (!isDirectlyPublic || isParentHidden) ? (
                <button
                  type="button"
                  onClick={() => onPreviewRoute ? onPreviewRoute(item.route) : (onNavigatePublicRoute && onNavigatePublicRoute(item.route))}
                  className="px-2.5 py-1.5 rounded-xl bg-[#FFF9F2] border border-[#F0DBC5] hover:border-[#C38A63] text-[#956A43] font-bold text-[11px] transition-colors cursor-pointer flex items-center gap-1"
                  title="Open authorized administrator preview for hidden content"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Admin Preview</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onNavigatePublicRoute ? onNavigatePublicRoute(item.route) : window.open('#' + item.route, '_blank')}
                  className="p-2 rounded-xl hover:bg-[#F0F1EB] text-[#5F6C64] hover:text-[#285C49] transition-colors cursor-pointer"
                  title="View on live website"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              )
            ) : (
              <button
                type="button"
                onClick={() => handleInspectDraft(item.id)}
                className="px-2.5 py-1.5 rounded-xl bg-white border border-[#DDE2DA] hover:border-[#285C49] text-[#285C49] font-bold text-[11px] transition-colors cursor-pointer"
                title="Inspect confidential draft"
              >
                Inspect Draft
              </button>
            )}

          </div>
        </div>

        {/* Children Render */}
        {hasChildren && isExpanded && (
          <div className="space-y-1">
            {children.map(child => renderTreeItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FBF8F2] text-[#293B32] pb-16 text-left">
      
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#DDE2DA] px-4 sm:px-6 lg:px-8 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Brand & Owner Profile */}
          <div className="flex items-center gap-3.5">
            <ZeroIndexMark size={28} className="flex-shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-editorial text-lg font-bold text-[#293B32]">
                  ZeroIndex Owner Control Center
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#E0EBDF] text-[#285C49] text-[10px] font-technical font-bold uppercase tracking-wider">
                  Owner
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#5F6C64]">
                <span className="font-mono">{adminSession.email || 'jampana13411@gmail.com'}</span>
                
                {/* MFA Badge */}
                {adminSession.hasMfaEnrolled ? (
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#285C49] font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>AAL2 Verified</span>
                  </span>
                ) : (
                  <button
                    onClick={() => setIsMfaModalOpen(true)}
                    className="inline-flex items-center gap-1 text-[11px] text-[#956A43] font-bold hover:underline cursor-pointer"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Setup MFA</span>
                  </button>
                )}

                {/* Connection Status Badge */}
                <span className="inline-flex items-center gap-1 text-[11px] text-[#85928A]">
                  <Server className="w-3.5 h-3.5" />
                  <span>{configStatus.isConfigured ? 'Supabase Connected' : 'Local Simulation'}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsAuditModalOpen(true)}
              className="px-3 py-2 rounded-xl bg-[#F7F5EF] hover:bg-[#EAE6DC] text-[#25352D] text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <History className="w-4 h-4 text-[#5F6C64]" />
              <span>Audit Log</span>
            </button>

            {!configStatus.isConfigured && (
              <button
                onClick={() => setIsSetupModalOpen(true)}
                className="px-3 py-2 rounded-xl bg-[#FFF9F2] border border-[#F2DEBF] hover:bg-[#FCEFE3] text-[#956A43] text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Supabase Setup</span>
              </button>
            )}

            <button
              onClick={onNavigateHome}
              className="px-3 py-2 rounded-xl bg-[#F7F5EF] hover:bg-[#EAE6DC] text-[#25352D] text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <ExternalLink className="w-4 h-4 text-[#5F6C64]" />
              <span>View Public Site</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-xl bg-[#FDF2F2] hover:bg-[#FBE8E8] text-[#9B2C2C] text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Notification Alert */}
        {notification.message && (
          <div className={`p-4 rounded-2xl border text-xs flex items-start gap-3 animate-in fade-in duration-200 ${
            notification.type === 'error'
              ? 'bg-[#FDF2F2] border-[#F5C2C2] text-[#9B2C2C]'
              : 'bg-[#F2F7F4] border-[#D5E3DB] text-[#285C49]'
          }`}>
            {notification.type === 'error' ? (
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1 font-bold">{notification.message}</div>
          </div>
        )}

        {/* Workspace Mode Switcher: Publishing Controls vs Project Desk */}
        <div className="flex items-center justify-start border-b border-[#DDE2DA] pb-4">
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#F0F1EB]">
            <button
              type="button"
              onClick={() => setWorkspaceMode('publishing')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                workspaceMode === 'publishing'
                  ? 'bg-white text-[#285C49] shadow-xs'
                  : 'text-[#5F6C64] hover:text-[#25352D]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Publishing Controls</span>
            </button>

            <button
              type="button"
              onClick={() => setWorkspaceMode('project-desk')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                workspaceMode === 'project-desk'
                  ? 'bg-white text-[#285C49] shadow-xs'
                  : 'text-[#5F6C64] hover:text-[#25352D]'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Project Desk</span>
              <span className="px-1.5 py-0.2 rounded-full bg-[#E0EBDF] text-[10px] text-[#285C49]">
                Private
              </span>
            </button>
          </div>
        </div>

        {workspaceMode === 'project-desk' ? (
          <ProjectDeskView adminSession={adminSession} />
        ) : (
          <>
            {/* Overview Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-[#DDE2DA] shadow-xs space-y-1">
            <span className="text-[11px] font-technical uppercase tracking-wider text-[#85928A]">
              Total Tracked Items
            </span>
            <div className="font-editorial text-2xl font-bold text-[#293B32]">
              {stats.total}
            </div>
            <p className="text-[11px] text-[#5F6C64]">Across all 5 ZeroIndex pillars</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#DDE2DA] shadow-xs space-y-1">
            <span className="text-[11px] font-technical uppercase tracking-wider text-[#285C49]">
              Published & Public
            </span>
            <div className="font-editorial text-2xl font-bold text-[#285C49]">
              {stats.publishedPublic}
            </div>
            <p className="text-[11px] text-[#5F6C64]">Accessible to all students</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#DDE2DA] shadow-xs space-y-1">
            <span className="text-[11px] font-technical uppercase tracking-wider text-[#956A43]">
              Hidden by Admin
            </span>
            <div className="font-editorial text-2xl font-bold text-[#956A43]">
              {stats.publishedHidden}
            </div>
            <p className="text-[11px] text-[#5F6C64]">Approved but offline</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#DDE2DA] shadow-xs space-y-1">
            <span className="text-[11px] font-technical uppercase tracking-wider text-[#5F6C64]">
              Protected Drafts
            </span>
            <div className="font-editorial text-2xl font-bold text-[#5F6C64]">
              {stats.protectedDrafts}
            </div>
            <p className="text-[11px] text-[#5F6C64]">Drafts, in review & planned</p>
          </div>
        </div>

        {/* Search, Filter, and Controls Bar */}
        <div className="p-4 rounded-3xl bg-white border border-[#DDE2DA] shadow-xs space-y-4">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#85928A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, ID, or route..."
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#DDE2DA] focus:border-[#285C49] focus:ring-2 focus:ring-[#285C49]/15 text-xs text-[#25352D] bg-[#FBF8F2] outline-none transition-all"
              />
            </div>

            {/* Expand / Collapse Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={expandAll}
                className="px-3 py-2 rounded-xl bg-[#F7F5EF] hover:bg-[#EAE6DC] text-xs font-bold text-[#25352D] transition-colors cursor-pointer"
              >
                Expand All
              </button>
              <button
                type="button"
                onClick={collapseAll}
                className="px-3 py-2 rounded-xl bg-[#F7F5EF] hover:bg-[#EAE6DC] text-xs font-bold text-[#25352D] transition-colors cursor-pointer"
              >
                Collapse All
              </button>
              <button
                type="button"
                onClick={loadRegistry}
                className="p-2 rounded-xl border border-[#DDE2DA] hover:bg-[#F7F5EF] text-[#5F6C64] transition-colors cursor-pointer"
                title="Reload from database"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>

          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#F0F1EB] text-xs">
            
            {/* Pillar Filter */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[#85928A] font-bold text-[11px] mr-1">Pillar:</span>
              {[
                { id: 'all', label: 'All Pillars' },
                { id: 'workbench', label: 'Workbench' },
                { id: 'atlas', label: 'Atlas' },
                { id: 'bridge', label: 'Bridge' },
                { id: 'readout', label: 'Readout' },
                { id: 'folio', label: 'Folio' }
              ].map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPillar(p.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedPillar === p.id
                      ? 'bg-[#285C49] text-white shadow-xs'
                      : 'bg-[#F7F5EF] hover:bg-[#EAE6DC] text-[#5F6C64]'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[#85928A] font-bold text-[11px] mr-1">Status:</span>
              {[
                { id: 'all', label: 'All Statuses' },
                { id: 'published', label: 'Published' },
                { id: 'in_review', label: 'In Review' },
                { id: 'draft', label: 'Draft' },
                { id: 'planned', label: 'Planned' }
              ].map(s => (
                <button
                  key={s.id}
                  onClick={() => setSelectedStatus(s.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedStatus === s.id
                      ? 'bg-[#285C49] text-white shadow-xs'
                      : 'bg-[#F7F5EF] hover:bg-[#EAE6DC] text-[#5F6C64]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

          </div>

        </div>

        {/* Hierarchical Content Tree */}
        <div className="space-y-3">
          {loading ? (
            <div className="py-20 text-center text-xs text-[#5F6C64] bg-white rounded-3xl border border-[#DDE2DA]">
              Loading centralized content registry...
            </div>
          ) : roots.length === 0 ? (
            <div className="py-20 text-center text-xs text-[#5F6C64] bg-white rounded-3xl border border-[#DDE2DA]">
              No content items found matching current filters.
            </div>
          ) : (
            roots.map(root => renderTreeItem(root, 0))
          )}
        </div>

          </>
        )}

      </main>

      {/* Modals */}
      <MfaEnrollModal 
        isOpen={isMfaModalOpen}
        onClose={() => setIsMfaModalOpen(false)}
        onMfaEnrolled={loadRegistry}
      />

      <AuditLogModal 
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
      />

      <SecureDraftPreviewModal 
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        draft={previewDraft}
      />

      <SupabaseSetupModal 
        isOpen={isSetupModalOpen}
        onClose={() => setIsSetupModalOpen(false)}
      />

    </div>
  );
};

export default AdminDashboard;
