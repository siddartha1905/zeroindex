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
  AlertTriangle,
  FileText,
  BookOpen,
  Compass,
  Briefcase,
  Radio,
  Folder,
  FolderOpen,
  Check,
  X
} from 'lucide-react';
import { ZeroIndexMark } from '../ZeroIndexMark';
import { logoutAdmin } from '../../services/authService';
import { 
  fetchContentRegistry, 
  updateItemVisibility, 
  fetchUnpublishedDraft 
} from '../../services/contentRegistryService';
import { centralContentRegistry, isItemPubliclyAccessible } from '../../data/centralContentRegistry';
import { getSupabaseConfigStatus } from '../../services/supabaseClient';
import { MfaEnrollModal } from './MfaEnrollModal';
import { AuditLogModal } from './AuditLogModal';
import { SecureDraftPreviewModal } from './SecureDraftPreviewModal';
import { SupabaseSetupModal } from './SupabaseSetupModal';
import { ProjectDeskView } from './ProjectDeskView';
import { ResourceManagerView } from './ResourceManagerView';

export const AdminDashboard = ({ 
  adminSession, 
  onLogout, 
  onNavigatePublicRoute, 
  onNavigateHome,
  onPreviewRoute
}) => {
  const [registry, setRegistry] = useState(() => centralContentRegistry);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [notification, setNotification] = useState({ type: '', message: '' });
  
  // Primary Workspace Mode: 'publishing' | 'project-desk'
  const [workspaceMode, setWorkspaceMode] = useState('publishing');

  // Active Horizontal Pillar Tab: 'workbench' | 'atlas' | 'journal'
  const [activePillarTab, setActivePillarTab] = useState('workbench');

  // Optional Technical Metadata Toggle (Route strings and raw database IDs)
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  // Secondary Diagnostic Drawer for All Registry Records (Collapsed by default)
  const [showOtherRecords, setShowOtherRecords] = useState(false);
  
  // Status Filter: 'all' | 'published' | 'hidden' | 'legacy'
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Expand / collapse states for subdivisions (compact defaults to avoid vertical clutter)
  const [expandedSubdivisions, setExpandedSubdivisions] = useState({
    'workbench-dld': true,
    'dld-unit-1': false,
    'dld-unit-2': true,
    'dld-future-units': false,
    'workbench-tools': false,
    'atlas-learning-paths': true,
    'atlas-ec-activities': false,
    'atlas-other-roadmaps': false,
    'atlas-career-prep': true,
    'journal-insights': true,
    'journal-reflections': true
  });

  // Expand / collapse state for All Registry Items tree
  const [expandedNodes, setExpandedNodes] = useState({
    'pillar-workbench': true,
    'workbench-subject-dld': true,
    'dld-unit-1': false,
    'dld-unit-2': false,
    'pillar-atlas': true,
    'atlas-div-foundations': false,
    'pillar-bridge': false,
    'pillar-readout': false,
    'pillar-folio': false
  });

  // Parent Confirmation Modal State (supports hiding and unhiding safeguards)
  const [parentConfirmModal, setParentConfirmModal] = useState({
    isOpen: false,
    item: null,
    childCount: 0,
    targetState: false,
    mode: 'hide'
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

  // Registry lookup map
  const registryMap = useMemo(() => {
    return new Map(registry.map(item => [item.id, item]));
  }, [registry]);

  // Hierarchical children map
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

  // Count all descendants under a node
  const countDescendants = (nodeId) => {
    let count = 0;
    const subs = childrenMap.get(nodeId) || [];
    count += subs.length;
    subs.forEach(sub => {
      count += countDescendants(sub.id);
    });
    return count;
  };

  // Count published descendants under a node
  const countPublishedDescendants = (nodeId) => {
    let count = 0;
    const subs = childrenMap.get(nodeId) || [];
    subs.forEach(sub => {
      if (sub.isPublic && sub.editorialStatus === 'published') {
        count += 1;
      }
      count += countPublishedDescendants(sub.id);
    });
    return count;
  };

  // Toggle node expansion in raw tree
  const toggleRawNode = (nodeId) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  // Toggle subdivision expansion
  const toggleSubdivision = (subKey) => {
    setExpandedSubdivisions(prev => ({
      ...prev,
      [subKey]: !prev[subKey]
    }));
  };

  const expandAll = () => {
    setExpandedSubdivisions({
      'workbench-dld': true,
      'dld-unit-1': true,
      'dld-unit-2': true,
      'dld-future-units': true,
      'workbench-tools': true,
      'atlas-learning-paths': true,
      'atlas-ec-activities': true,
      'atlas-other-roadmaps': true,
      'atlas-career-prep': true,
      'journal-insights': true,
      'journal-reflections': true
    });
    const allNodes = {};
    registry.forEach(item => { allNodes[item.id] = true; });
    setExpandedNodes(allNodes);
  };

  const collapseAll = () => {
    setExpandedSubdivisions({
      'workbench-dld': false,
      'dld-unit-1': false,
      'dld-unit-2': false,
      'dld-future-units': false,
      'workbench-tools': false,
      'atlas-learning-paths': false,
      'atlas-ec-activities': false,
      'atlas-other-roadmaps': false,
      'atlas-career-prep': false,
      'journal-insights': false,
      'journal-reflections': false
    });
    setExpandedNodes({});
  };

  // Toggle Visibility Handler with Parent Confirmation Guard (Hiding and Publishing)
  const handleToggleClick = (item) => {
    if (item.editorialStatus !== 'published') {
      setNotification({
        type: 'error',
        message: `Cannot publish "${item.title}". Only approved items with status "published" can be made public.`
      });
      return;
    }

    const isDirectlyPublic = Boolean(item.isPublic);
    const children = childrenMap.get(item.id) || [];

    // Guard 1: Hiding a parent item that currently has active children
    if (isDirectlyPublic && children.length > 0) {
      const affectedCount = countDescendants(item.id);
      if (affectedCount > 0) {
        setParentConfirmModal({
          isOpen: true,
          item,
          childCount: affectedCount,
          targetState: false,
          mode: 'hide'
        });
        return;
      }
    }

    // Guard 2: Publishing a parent item that exposes previously published children
    if (!isDirectlyPublic && children.length > 0) {
      const publishedCount = countPublishedDescendants(item.id);
      if (publishedCount > 0) {
        setParentConfirmModal({
          isOpen: true,
          item,
          childCount: publishedCount,
          targetState: true,
          mode: 'unhide'
        });
        return;
      }
    }

    // Leaf item or unhindered toggle: execute directly
    executeToggleVisibility(item, !isDirectlyPublic);
  };

  const executeToggleVisibility = async (item, nextPublicState) => {
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

  // Filter evaluation helper
  const itemMatchesFilter = (item) => {
    if (!item) return false;

    // Search query check
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const displayTitle = (
        item.id === 'pillar-bridge' ? 'career preparation' :
        item.id === 'pillar-readout' ? 'insights' :
        item.id === 'pillar-folio' ? 'reflections' :
        item.title.toLowerCase()
      );
      const match = displayTitle.includes(q) || 
                    item.title.toLowerCase().includes(q) || 
                    item.id.toLowerCase().includes(q) || 
                    (item.route && item.route.toLowerCase().includes(q));
      if (!match) return false;
    }

    // Status filter check
    if (selectedStatus === 'published') {
      return item.editorialStatus === 'published' && Boolean(item.isPublic);
    }
    if (selectedStatus === 'hidden') {
      return item.editorialStatus === 'in_review' || (item.editorialStatus === 'published' && !item.isPublic);
    }
    if (selectedStatus === 'legacy') {
      return item.editorialStatus === 'draft' || item.editorialStatus === 'planned';
    }

    return true;
  };

  // Reusable Content Item Row Component
  const renderContentRow = (item, options = {}) => {
    if (!item) return null;
    const { depth = 0, isSpecialFeatured = false, overrideTitle = null } = options;

    if (!itemMatchesFilter(item)) return null;

    // Map internal legacy identifiers to approved human-readable names
    const displayTitle = overrideTitle || (
      item.id === 'pillar-bridge' ? 'Career Preparation' :
      item.id === 'pillar-readout' ? 'Insights' :
      item.id === 'pillar-folio' ? 'Reflections' :
      item.title
    );

    const isDirectlyPublic = Boolean(item.isPublic);
    const isInheritedActive = isItemPubliclyAccessible(item.id, currentOverrides);
    const isParentHidden = item.parentId && !isItemPubliclyAccessible(item.parentId, currentOverrides);
    const canToggle = item.editorialStatus === 'published';

    return (
      <div 
        key={item.id}
        className={`group flex items-center justify-between p-3 rounded-2xl border transition-all ${
          isSpecialFeatured
            ? 'bg-[#F2F7F4] border-[#C2D8C9] shadow-xs'
            : depth === 0 
              ? 'bg-white border-[#DDE2DA] shadow-xs' 
              : 'bg-[#FBF8F2] border-[#E8ECE5] hover:bg-white'
        }`}
        style={{ marginLeft: `${depth * 16}px` }}
      >
        {/* Left: Icon, Title, Tags, Optional Technical Route/ID */}
        <div className="flex items-center gap-3 min-w-0 flex-1 pr-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`font-bold text-xs truncate ${isSpecialFeatured ? 'text-[#1D4738] text-sm' : 'text-[#25352D]'}`}>
                {displayTitle}
              </span>

              <span className="font-technical text-[10px] text-[#85928A] px-1.5 py-0.5 rounded bg-[#F0F1EB]">
                {item.contentType}
              </span>

              {renderStatusBadge(item.editorialStatus)}

              {/* Active Accessibility Indicator */}
              {item.editorialStatus === 'published' && (
                isDirectlyPublic ? (
                  isInheritedActive ? (
                    <span className="text-[10px] text-[#285C49] font-technical font-semibold bg-[#E0EBDF] px-1.5 py-0.5 rounded">
                      Live Public
                    </span>
                  ) : (
                    <span 
                      className="text-[10px] text-[#956A43] font-technical font-semibold bg-[#FFF9F2] px-1.5 py-0.5 rounded border border-[#F2DEBF]"
                      title="Item flag is public, but an ancestor pillar or unit is hidden, making it inaccessible to visitors."
                    >
                      Inherited Hidden (Parent offline)
                    </span>
                  )
                ) : (
                  <span className="text-[10px] text-[#5F6C64] font-technical bg-[#F0F1EB] px-1.5 py-0.5 rounded">
                    Hidden
                  </span>
                )
              )}
            </div>

            {/* Optional Technical Route and ID: shown only when showTechnicalDetails is toggled on */}
            {showTechnicalDetails && (
              <div className="flex items-center gap-3 mt-1 text-[11px] text-[#85928A] font-mono truncate">
                <span>Route: #{item.route}</span>
                <span className="text-[#A5B3A9]">•</span>
                <span>ID: {item.id}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Visibility Toggle & Actions */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          
          {/* Publication Toggle */}
          {canToggle ? (
            <button
              type="button"
              disabled={updatingId === item.id}
              onClick={() => handleToggleClick(item)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isDirectlyPublic
                  ? 'bg-[#E0EBDF] hover:bg-[#D5E3DB] text-[#285C49]'
                  : 'bg-[#F2E8DC] hover:bg-[#EBDDCF] text-[#956A43]'
              }`}
              title={isDirectlyPublic ? 'Click to hide from public visitors' : 'Click to publish to public visitors'}
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

          {/* Action / Inspection */}
          {item.editorialStatus === 'published' ? (
            (!isDirectlyPublic || isParentHidden) ? (
              <button
                type="button"
                onClick={() => onPreviewRoute ? onPreviewRoute(item.route) : (onNavigatePublicRoute && onNavigatePublicRoute(item.route))}
                className="px-2.5 py-1.5 rounded-xl bg-[#FFF9F2] border border-[#F0DBC5] hover:border-[#C38A63] text-[#956A43] font-bold text-[11px] transition-colors cursor-pointer flex items-center gap-1"
                title="Open authorized administrator preview for offline content"
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
            <div className="flex items-center gap-1.5">
              {Boolean(import.meta.env.DEV && typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && (item.id === 'dld-sec-2.6' || item.id === 'dld-sec-2.7')) && (
                <button
                  type="button"
                  onClick={() => onPreviewRoute ? onPreviewRoute(item.route) : (onNavigatePublicRoute && onNavigatePublicRoute(item.route))}
                  className="px-2.5 py-1.5 rounded-xl bg-[#EBF3ED] border border-[#C2D8C9] hover:bg-[#DCE7E1] text-[#285C49] font-bold text-[11px] transition-colors cursor-pointer flex items-center gap-1"
                  title="Open local draft preview for faculty review"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Preview Locally</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => handleInspectDraft(item.id)}
                className="px-2.5 py-1.5 rounded-xl bg-white border border-[#DDE2DA] hover:border-[#285C49] text-[#285C49] font-bold text-[11px] transition-colors cursor-pointer"
                title="Inspect confidential draft"
              >
                Inspect Draft
              </button>
            </div>
          )}

        </div>
      </div>
    );
  };

  // Recursive Tree Item Renderer for Secondary "All Registry Items" View
  const renderRawTreeItem = (item, level = 0) => {
    const children = childrenMap.get(item.id) || [];
    const hasChildren = children.length > 0;
    const isExpanded = Boolean(expandedNodes[item.id]);

    if (!itemMatchesFilter(item)) {
      const hasMatchingDescendant = (nodeId) => {
        const subs = childrenMap.get(nodeId) || [];
        return subs.some(sub => itemMatchesFilter(sub) || hasMatchingDescendant(sub.id));
      };
      if (!hasMatchingDescendant(item.id)) return null;
    }

    return (
      <div key={item.id} className="space-y-1">
        <div className="flex items-center gap-1">
          {hasChildren ? (
            <button
              type="button"
              onClick={() => toggleRawNode(item.id)}
              className="w-6 h-6 rounded-lg hover:bg-[#F0F1EB] flex items-center justify-center text-[#5F6C64] transition-colors cursor-pointer flex-shrink-0"
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          ) : (
            <div className="w-6 flex-shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            {renderContentRow(item, { depth: level })}
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="space-y-1 pl-4 border-l border-[#E8ECE5] ml-3">
            {children.map(child => renderRawTreeItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  // Resolve Curated Workbench Items
  const workbenchMaster = registryMap.get('pillar-workbench');
  const dldSubject = registryMap.get('workbench-subject-dld');
  const dldUnit1 = registryMap.get('dld-unit-1');
  const dldUnit1Sections = childrenMap.get('dld-unit-1') || [];
  const dldUnit2 = registryMap.get('dld-unit-2');
  const dldUnit2Sections = childrenMap.get('dld-unit-2') || [];
  const dldFutureUnits = ['dld-unit-3', 'dld-unit-4', 'dld-unit-5'].map(id => registryMap.get(id)).filter(Boolean);
  const toolsGroupMaster = registryMap.get('workbench-tools-group');
  const workbenchTools = childrenMap.get('workbench-tools-group') || [
    registryMap.get('workbench-tool-solvers'),
    registryMap.get('workbench-tool-practice'),
    registryMap.get('workbench-tool-resources')
  ].filter(Boolean);

  // Resolve Curated Atlas Items
  const atlasMaster = registryMap.get('pillar-atlas');
  const englishCommItem = registryMap.get('atlas-english-communication');
  const foundationsDivision = registryMap.get('atlas-div-foundations');
  const foundationsRoadmaps = (childrenMap.get('atlas-div-foundations') || []).filter(i => i.id !== 'atlas-english-communication');
  const hardwareRoadmaps = childrenMap.get('atlas-div-hardware') || [];
  const softwareRoadmaps = childrenMap.get('atlas-div-software') || [];
  const bridgeMaster = registryMap.get('pillar-bridge');
  const careerPrepDomains = childrenMap.get('pillar-bridge') || [];

  // Resolve Curated Journal Items
  const readoutMaster = registryMap.get('pillar-readout');
  const readoutArticles = childrenMap.get('pillar-readout') || [];
  const folioMaster = registryMap.get('pillar-folio');
  const folioEssays = childrenMap.get('pillar-folio') || [];

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

        {/* Primary Workspace Mode Switcher: Publishing Controls vs Resource Manager vs Project Desk */}
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
              onClick={() => setWorkspaceMode('resource-manager')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                workspaceMode === 'resource-manager'
                  ? 'bg-white text-[#285C49] shadow-xs'
                  : 'text-[#5F6C64] hover:text-[#25352D]'
              }`}
            >
              <FolderOpen className="w-4 h-4" />
              <span>Resource Manager</span>
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

        {workspaceMode === 'resource-manager' ? (
          <ResourceManagerView adminSession={adminSession} />
        ) : workspaceMode === 'project-desk' ? (
          <ProjectDeskView adminSession={adminSession} />
        ) : (
          <>
            {/* Overview Stats Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-[#DDE2DA] shadow-xs space-y-1">
                <span className="text-[11px] font-technical uppercase tracking-wider text-[#85928A]">
                  Tracked Items
                </span>
                <div className="font-editorial text-2xl font-bold text-[#293B32]">
                  {stats.total}
                </div>
                <p className="text-[11px] text-[#5F6C64]">Across the 3 ZeroIndex pillars</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#DDE2DA] shadow-xs space-y-1">
                <span className="text-[11px] font-technical uppercase tracking-wider text-[#285C49]">
                  Published & Public
                </span>
                <div className="font-editorial text-2xl font-bold text-[#285C49]">
                  {stats.publishedPublic}
                </div>
                <p className="text-[11px] text-[#5F6C64]">Accessible to all visitors</p>
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

            {/* Horizontal Pillar Navigation Bar */}
            <div className="rounded-3xl bg-white border border-[#DDE2DA] shadow-xs p-3 sm:p-4 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                
                {/* Horizontal Pillar Tablist */}
                <div 
                  role="tablist" 
                  aria-label="Publishing Pillars"
                  className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#F0F1EB] overflow-x-auto"
                >
                  {/* Tab 1: The Workbench */}
                  <button
                    role="tab"
                    id="tab-workbench"
                    aria-selected={activePillarTab === 'workbench'}
                    aria-controls="panel-workbench"
                    tabIndex={activePillarTab === 'workbench' ? 0 : -1}
                    type="button"
                    onClick={() => setActivePillarTab('workbench')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#285C49] ${
                      activePillarTab === 'workbench'
                        ? 'bg-white text-[#285C49] shadow-xs border border-[#C2D8C9]'
                        : 'text-[#5F6C64] hover:text-[#25352D]'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${activePillarTab === 'workbench' ? 'bg-[#285C49]' : 'bg-[#85928A]'}`} />
                    <Layers className="w-4 h-4" />
                    <span>The Workbench</span>
                  </button>

                  {/* Tab 2: The Atlas */}
                  <button
                    role="tab"
                    id="tab-atlas"
                    aria-selected={activePillarTab === 'atlas'}
                    aria-controls="panel-atlas"
                    tabIndex={activePillarTab === 'atlas' ? 0 : -1}
                    type="button"
                    onClick={() => setActivePillarTab('atlas')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#496D91] ${
                      activePillarTab === 'atlas'
                        ? 'bg-white text-[#496D91] shadow-xs border border-[#CCDCE8]'
                        : 'text-[#5F6C64] hover:text-[#25352D]'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${activePillarTab === 'atlas' ? 'bg-[#496D91]' : 'bg-[#85928A]'}`} />
                    <Compass className="w-4 h-4" />
                    <span>The Atlas</span>
                  </button>

                  {/* Tab 3: The Journal */}
                  <button
                    role="tab"
                    id="tab-journal"
                    aria-selected={activePillarTab === 'journal'}
                    aria-controls="panel-journal"
                    tabIndex={activePillarTab === 'journal' ? 0 : -1}
                    type="button"
                    onClick={() => setActivePillarTab('journal')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#765C90] ${
                      activePillarTab === 'journal'
                        ? 'bg-white text-[#765C90] shadow-xs border border-[#DDD5E7]'
                        : 'text-[#5F6C64] hover:text-[#25352D]'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${activePillarTab === 'journal' ? 'bg-[#765C90]' : 'bg-[#85928A]'}`} />
                    <BookOpen className="w-4 h-4" />
                    <span>The Journal</span>
                  </button>
                </div>

                {/* Toolbar Quick Actions: Technical IDs toggle, Expand All, Collapse All, Reload */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setShowTechnicalDetails(prev => !prev)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      showTechnicalDetails
                        ? 'bg-[#285C49] text-white shadow-xs'
                        : 'bg-[#F0F1EB] text-[#5F6C64] hover:text-[#25352D]'
                    }`}
                    title="Toggle visibility of route strings and technical database IDs"
                  >
                    <span>Technical IDs</span>
                  </button>

                  <button
                    type="button"
                    onClick={expandAll}
                    className="px-3 py-1.5 rounded-xl bg-[#F7F5EF] hover:bg-[#EAE6DC] text-xs font-bold text-[#25352D] transition-colors cursor-pointer"
                  >
                    Expand All
                  </button>

                  <button
                    type="button"
                    onClick={collapseAll}
                    className="px-3 py-1.5 rounded-xl bg-[#F7F5EF] hover:bg-[#EAE6DC] text-xs font-bold text-[#25352D] transition-colors cursor-pointer"
                  >
                    Collapse All
                  </button>

                  <button
                    type="button"
                    onClick={loadRegistry}
                    className="p-1.5 rounded-xl border border-[#DDE2DA] hover:bg-[#F7F5EF] text-[#5F6C64] transition-colors cursor-pointer"
                    title="Reload registry from database"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                </div>

              </div>

              {/* Search and Status Filters */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#F0F1EB]">
                {/* Search Input */}
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-[#85928A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter items by title or keyword..."
                    className="w-full pl-10 pr-8 py-1.5 rounded-xl border border-[#DDE2DA] focus:border-[#285C49] focus:ring-2 focus:ring-[#285C49]/15 text-xs text-[#25352D] bg-[#FBF8F2] outline-none transition-all"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#85928A] hover:text-[#25352D]"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="text-[#85928A] font-bold text-[11px] mr-1 hidden md:inline">Filter:</span>
                  {[
                    { id: 'all', label: 'All Items' },
                    { id: 'published', label: 'Published & Public' },
                    { id: 'hidden', label: 'Hidden' },
                    { id: 'legacy', label: 'Drafts & Planned' }
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

            {/* Publishing Content Area */}
            {loading ? (
              <div className="py-20 text-center text-xs text-[#5F6C64] bg-white rounded-3xl border border-[#DDE2DA]">
                Loading centralized content registry...
              </div>
            ) : (
              <div className="space-y-6">

                {/* ================================================================== */}
                {/* HORIZONTAL TAB PANEL 1: THE WORKBENCH                             */}
                {/* ================================================================== */}
                {activePillarTab === 'workbench' && (
                  <div id="panel-workbench" role="tabpanel" aria-labelledby="tab-workbench" className="space-y-6 animate-in fade-in duration-150">
                    <div className="rounded-3xl bg-white border border-[#DDE2DA] shadow-xs overflow-hidden">
                      {/* Workbench Master Header */}
                      <div className="p-4 sm:p-5 bg-[#FAF8F5] border-b border-[#E6E8E1] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-[#E0EBDF] flex items-center justify-center text-[#285C49] flex-shrink-0">
                            <Layers className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h2 className="font-editorial text-lg sm:text-xl font-bold text-[#25352D]">
                                The Workbench
                              </h2>
                              <span className="font-technical text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E0EBDF] text-[#285C49] uppercase tracking-wider">
                                Academic Subjects & Tools
                              </span>
                            </div>
                            <p className="text-xs text-[#5F6C64] mt-0.5">
                              Academic curriculum, gate-level theory sections, interactive solvers and practice questions.
                            </p>
                          </div>
                        </div>

                        {workbenchMaster && (
                          <div className="max-w-xs self-end sm:self-auto">
                            {renderContentRow(workbenchMaster, { depth: 0 })}
                          </div>
                        )}
                      </div>

                      <div className="p-4 sm:p-6 space-y-6">
                        {/* Section A: Academic Subjects */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between border-b border-[#F0F1EB] pb-2">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#285C49]" />
                              <h3 className="font-editorial text-base font-bold text-[#25352D]">
                                Section A: Academic Subjects
                              </h3>
                            </div>
                            {dldSubject && (
                              <div className="max-w-xs">
                                {renderContentRow(dldSubject, { depth: 0 })}
                              </div>
                            )}
                          </div>

                          {/* Digital Logic Design (EC201) Units */}
                          <div className="space-y-3 pl-1 sm:pl-3">
                            
                            {/* Unit 1: Binary Systems and Boolean Algebra */}
                            <div className="rounded-2xl border border-[#DDE2DA] bg-[#FBF8F2] overflow-hidden">
                              <div className="p-3 bg-white flex items-center justify-between gap-3 border-b border-[#E8ECE5]">
                                <button
                                  type="button"
                                  onClick={() => toggleSubdivision('dld-unit-1')}
                                  className="flex items-center gap-2 text-xs font-bold text-[#25352D] hover:text-[#285C49] cursor-pointer flex-1 text-left"
                                >
                                  {expandedSubdivisions['dld-unit-1'] ? <ChevronDown className="w-4 h-4 text-[#5F6C64]" /> : <ChevronRight className="w-4 h-4 text-[#5F6C64]" />}
                                  <span>Unit 1: Binary Systems and Boolean Algebra</span>
                                  <span className="font-technical text-[10px] text-[#285C49] bg-[#E0EBDF] px-2 py-0.5 rounded-full font-bold">
                                    7 Sections Complete
                                  </span>
                                </button>
                                {dldUnit1 && (
                                  <div className="max-w-xs">
                                    {renderContentRow(dldUnit1, { depth: 0 })}
                                  </div>
                                )}
                              </div>

                              {expandedSubdivisions['dld-unit-1'] && (
                                <div className="p-3 space-y-1.5 bg-[#FAF8F5]">
                                  {dldUnit1Sections.map(sec => renderContentRow(sec, { depth: 0 }))}
                                </div>
                              )}
                            </div>

                            {/* Unit 2: Gate-Level Minimization */}
                            <div className="rounded-2xl border border-[#DDE2DA] bg-[#FBF8F2] overflow-hidden">
                              <div className="p-3 bg-white flex items-center justify-between gap-3 border-b border-[#E8ECE5]">
                                <button
                                  type="button"
                                  onClick={() => toggleSubdivision('dld-unit-2')}
                                  className="flex items-center gap-2 text-xs font-bold text-[#25352D] hover:text-[#285C49] cursor-pointer flex-1 text-left"
                                >
                                  {expandedSubdivisions['dld-unit-2'] ? <ChevronDown className="w-4 h-4 text-[#5F6C64]" /> : <ChevronRight className="w-4 h-4 text-[#5F6C64]" />}
                                  <span>Unit 2: Gate-Level Minimization</span>
                                  <span className="font-technical text-[10px] text-[#285C49] bg-[#E0EBDF] px-2 py-0.5 rounded-full font-bold">
                                    Sections 2.1 to 2.5 Live
                                  </span>
                                  <span className="font-technical text-[10px] text-[#956A43] bg-[#FFF9F2] px-2 py-0.5 rounded-full font-bold border border-[#F2DEBF]">
                                    2.6 & 2.7 Active Priorities
                                  </span>
                                </button>
                                {dldUnit2 && (
                                  <div className="max-w-xs">
                                    {renderContentRow(dldUnit2, { depth: 0 })}
                                  </div>
                                )}
                              </div>

                              {expandedSubdivisions['dld-unit-2'] && (
                                <div className="p-3 space-y-1.5 bg-[#FAF8F5]">
                                  <div className="text-[11px] text-[#5F6C64] pb-1 px-1 flex items-center justify-between">
                                    <span>Gate minimization sections (Sections 2.6 and 2.7 reflect live database editorial status):</span>
                                  </div>
                                  {dldUnit2Sections.map(sec => renderContentRow(sec, { depth: 0 }))}
                                </div>
                              )}
                            </div>

                            {/* Planned Units 3 to 5 (Compact Collapsible) */}
                            <div className="rounded-2xl border border-[#E8ECE5] bg-white overflow-hidden">
                              <button
                                type="button"
                                onClick={() => toggleSubdivision('dld-future-units')}
                                className="w-full p-3 flex items-center justify-between text-xs font-bold text-[#5F6C64] hover:text-[#25352D] cursor-pointer"
                              >
                                <div className="flex items-center gap-2">
                                  {expandedSubdivisions['dld-future-units'] ? <ChevronDown className="w-4 h-4 text-[#5F6C64]" /> : <ChevronRight className="w-4 h-4 text-[#5F6C64]" />}
                                  <span>Planned Curriculum Units (Units 3, 4 and 5)</span>
                                </div>
                                <span className="font-technical text-[10px] text-[#85928A]">
                                  ({dldFutureUnits.length} Units Planned)
                                </span>
                              </button>

                              {expandedSubdivisions['dld-future-units'] && (
                                <div className="p-3 space-y-1.5 bg-[#FAF8F5] border-t border-[#E8ECE5]">
                                  {dldFutureUnits.map(unit => renderContentRow(unit, { depth: 0 }))}
                                </div>
                              )}
                            </div>

                          </div>
                        </div>

                        {/* Section B: Interactive Tools & Resources */}
                        <div className="space-y-4 pt-4 border-t border-[#F0F1EB]">
                          <div className="flex items-center justify-between border-b border-[#F0F1EB] pb-2">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#285C49]" />
                              <h3 className="font-editorial text-base font-bold text-[#25352D]">
                                Section B: Interactive Tools & Resources
                              </h3>
                            </div>
                            {toolsGroupMaster && (
                              <div className="max-w-xs">
                                {renderContentRow(toolsGroupMaster, { depth: 0 })}
                              </div>
                            )}
                          </div>

                          <div className="space-y-2 pl-1 sm:pl-3">
                            {workbenchTools.map(tool => renderContentRow(tool, { depth: 0 }))}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                )}

                {/* ================================================================== */}
                {/* HORIZONTAL TAB PANEL 2: THE ATLAS                                 */}
                {/* ================================================================== */}
                {activePillarTab === 'atlas' && (
                  <div id="panel-atlas" role="tabpanel" aria-labelledby="tab-atlas" className="space-y-6 animate-in fade-in duration-150">
                    <div className="rounded-3xl bg-white border border-[#DDE2DA] shadow-xs overflow-hidden">
                      {/* Atlas Master Header */}
                      <div className="p-4 sm:p-5 bg-[#FAF8F5] border-b border-[#E6E8E1] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-[#E1EAF2] flex items-center justify-center text-[#496D91] flex-shrink-0">
                            <Compass className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h2 className="font-editorial text-lg sm:text-xl font-bold text-[#25352D]">
                                The Atlas
                              </h2>
                              <span className="font-technical text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E1EAF2] text-[#496D91] uppercase tracking-wider">
                                Paths & Preparation
                              </span>
                            </div>
                            <p className="text-xs text-[#5F6C64] mt-0.5">
                              Foundational Learning Paths and Structured Career Preparation.
                            </p>
                          </div>
                        </div>

                        {atlasMaster && (
                          <div className="max-w-xs self-end sm:self-auto">
                            {renderContentRow(atlasMaster, { depth: 0 })}
                          </div>
                        )}
                      </div>

                      <div className="p-4 sm:p-6 space-y-6">
                        {/* Category A: Learning Paths */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between border-b border-[#F0F1EB] pb-2">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#496D91]" />
                              <h3 className="font-editorial text-base font-bold text-[#25352D]">
                                Category A: Learning Paths
                              </h3>
                            </div>
                            {foundationsDivision && (
                              <span className="font-technical text-[10px] text-[#5F6C64]">
                                Foundations & Essential Skills
                              </span>
                            )}
                          </div>

                          {/* Active Featured Learning Path: English Communication */}
                          {englishCommItem && (
                            <div className="p-4 rounded-2xl bg-[#F4F8FA] border border-[#CCDCE8] space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="font-technical text-[11px] font-bold uppercase tracking-wider text-[#496D91] flex items-center gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#285C49]" />
                                  <span>Active Published Learning Path</span>
                                </span>
                                <span className="text-[11px] font-technical text-[#5F6C64]">
                                  Version 1 (4 Activities Approved)
                                </span>
                              </div>

                              {renderContentRow(englishCommItem, { depth: 0, isSpecialFeatured: true })}

                              {/* 4 Activities Drawer */}
                              <div className="pt-2 border-t border-[#CCDCE8]/60">
                                <button
                                  type="button"
                                  onClick={() => toggleSubdivision('atlas-ec-activities')}
                                  className="flex items-center gap-2 text-xs font-bold text-[#496D91] hover:text-[#25352D] cursor-pointer"
                                >
                                  {expandedSubdivisions['atlas-ec-activities'] ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                                  <span>English Communication Activities (4 Interactive Activities)</span>
                                </button>

                                {expandedSubdivisions['atlas-ec-activities'] && (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-2">
                                    {[
                                      { title: 'Speak Clearly', path: 'atlas/activity/speak-clearly', desc: 'Syllables, stress timing and articulation drills' },
                                      { title: 'Listen & Respond', path: 'atlas/activity/listen-respond', desc: 'Audio active recall and conversational turns' },
                                      { title: 'Express Your Opinion', path: 'atlas/activity/express-your-opinion', desc: 'Structured discourse, nuance and professional points' },
                                      { title: 'Everyday Conversations', path: 'atlas/activity/everyday-conversations', desc: 'Campus scenarios, small talk and idiomatic flow' }
                                    ].map(act => (
                                      <div key={act.path} className="p-2.5 rounded-xl bg-white border border-[#CCDCE8] flex items-center justify-between gap-2">
                                        <div className="min-w-0">
                                          <span className="font-bold text-xs text-[#25352D] block truncate">{act.title}</span>
                                          <span className="text-[10px] text-[#5F6C64] block truncate">{act.desc}</span>
                                        </div>
                                        <button
                                          type="button"
                                          onClick={() => onNavigatePublicRoute ? onNavigatePublicRoute(act.path) : window.open('#' + act.path, '_blank')}
                                          className="p-1.5 rounded-lg hover:bg-[#E1EAF2] text-[#496D91] transition-colors cursor-pointer flex-shrink-0"
                                          title="Open public activity"
                                        >
                                          <ExternalLink className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Collapsible: Other Learning Paths & Roadmaps */}
                          <div className="rounded-2xl border border-[#E8ECE5] bg-white overflow-hidden">
                            <button
                              type="button"
                              onClick={() => toggleSubdivision('atlas-other-roadmaps')}
                              className="w-full p-3 flex items-center justify-between text-xs font-bold text-[#5F6C64] hover:text-[#25352D] cursor-pointer"
                            >
                              <div className="flex items-center gap-2">
                                {expandedSubdivisions['atlas-other-roadmaps'] ? <ChevronDown className="w-4 h-4 text-[#5F6C64]" /> : <ChevronRight className="w-4 h-4 text-[#5F6C64]" />}
                                <span>Other Learning Paths & Curriculum Roadmaps</span>
                              </div>
                              <span className="font-technical text-[10px] text-[#85928A]">
                                ({foundationsRoadmaps.length + hardwareRoadmaps.length + softwareRoadmaps.length} Tracks Under Editorial Review)
                              </span>
                            </button>

                            {expandedSubdivisions['atlas-other-roadmaps'] && (
                              <div className="p-3 space-y-3 bg-[#FAF8F5] border-t border-[#E8ECE5]">
                                {foundationsRoadmaps.length > 0 && (
                                  <div className="space-y-1.5">
                                    <span className="text-[10px] font-technical font-bold text-[#496D91] uppercase tracking-wider block">
                                      Foundations & Engineering Principles:
                                    </span>
                                    {foundationsRoadmaps.map(rm => renderContentRow(rm, { depth: 0 }))}
                                  </div>
                                )}

                                {hardwareRoadmaps.length > 0 && (
                                  <div className="space-y-1.5 pt-2">
                                    <span className="text-[10px] font-technical font-bold text-[#496D91] uppercase tracking-wider block">
                                      Hardware & Silicon Engineering:
                                    </span>
                                    {hardwareRoadmaps.map(rm => renderContentRow(rm, { depth: 0 }))}
                                  </div>
                                )}

                                {softwareRoadmaps.length > 0 && (
                                  <div className="space-y-1.5 pt-2">
                                    <span className="text-[10px] font-technical font-bold text-[#496D91] uppercase tracking-wider block">
                                      Software & Infrastructure Systems:
                                    </span>
                                    {softwareRoadmaps.map(rm => renderContentRow(rm, { depth: 0 }))}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Category B: Career Preparation */}
                        <div className="space-y-4 pt-4 border-t border-[#F0F1EB]">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F0F1EB] pb-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#956A43]" />
                                <h3 className="font-editorial text-base font-bold text-[#25352D]">
                                  Category B: Career Preparation
                                </h3>
                              </div>
                              <p className="text-xs text-[#5F6C64] mt-0.5">
                                Campus placement preparation domains and career readiness tracks.
                              </p>
                            </div>
                            {bridgeMaster && (
                              <div className="max-w-xs self-end sm:self-auto">
                                {renderContentRow(bridgeMaster, { depth: 0, overrideTitle: 'Career Preparation' })}
                              </div>
                            )}
                          </div>

                          {/* 7 Placement Domains */}
                          <div className="space-y-1.5 pl-1 sm:pl-3">
                            {careerPrepDomains.map(domain => renderContentRow(domain, { depth: 0 }))}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                )}

                {/* ================================================================== */}
                {/* HORIZONTAL TAB PANEL 3: THE JOURNAL                               */}
                {/* ================================================================== */}
                {activePillarTab === 'journal' && (
                  <div id="panel-journal" role="tabpanel" aria-labelledby="tab-journal" className="space-y-6 animate-in fade-in duration-150">
                    <div className="rounded-3xl bg-white border border-[#DDE2DA] shadow-xs overflow-hidden">
                      {/* Journal Master Header */}
                      <div className="p-4 sm:p-5 bg-[#FAF8F5] border-b border-[#E6E8E1] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-[#F0EBF5] flex items-center justify-center text-[#765C90] flex-shrink-0">
                            <BookOpen className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h2 className="font-editorial text-lg sm:text-xl font-bold text-[#25352D]">
                                The Journal
                              </h2>
                              <span className="font-technical text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F0EBF5] text-[#765C90] uppercase tracking-wider">
                                Insights & Reflections
                              </span>
                            </div>
                            <p className="text-xs text-[#5F6C64] mt-0.5">
                              Technical Insights and Personal Reflections on engineering, pedagogy and mastery.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 sm:p-6 space-y-6">
                        {/* Category A: Insights */}
                        <div className="space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F0F1EB] pb-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#765C90]" />
                                <h3 className="font-editorial text-base font-bold text-[#25352D]">
                                  Category A: Insights
                                </h3>
                              </div>
                              <p className="text-xs text-[#5F6C64] mt-0.5">
                                Rigorous technical articles, computing monographs and systems observations.
                              </p>
                            </div>
                            {readoutMaster && (
                              <div className="max-w-xs self-end sm:self-auto">
                                {renderContentRow(readoutMaster, { depth: 0, overrideTitle: 'Insights' })}
                              </div>
                            )}
                          </div>

                          <div className="space-y-1.5 pl-1 sm:pl-3">
                            {readoutArticles.length === 0 ? (
                              <div className="p-4 rounded-xl bg-[#FBF8F2] text-xs text-[#5F6C64] text-center">
                                No articles found matching filters.
                              </div>
                            ) : (
                              readoutArticles.map(art => renderContentRow(art, { depth: 0 }))
                            )}
                          </div>
                        </div>

                        {/* Category B: Reflections */}
                        <div className="space-y-4 pt-4 border-t border-[#F0F1EB]">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F0F1EB] pb-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#935F5D]" />
                                <h3 className="font-editorial text-base font-bold text-[#25352D]">
                                  Category B: Reflections
                                </h3>
                              </div>
                              <p className="text-xs text-[#5F6C64] mt-0.5">
                                Personal essays and philosophical reflections on teaching and deliberate practice.
                              </p>
                            </div>
                            {folioMaster && (
                              <div className="max-w-xs self-end sm:self-auto">
                                {renderContentRow(folioMaster, { depth: 0, overrideTitle: 'Reflections' })}
                              </div>
                            )}
                          </div>

                          <div className="space-y-1.5 pl-1 sm:pl-3">
                            {folioEssays.length === 0 ? (
                              <div className="p-4 rounded-xl bg-[#FBF8F2] text-xs text-[#5F6C64] text-center">
                                No essays found matching filters.
                              </div>
                            ) : (
                              folioEssays.map(ess => renderContentRow(ess, { depth: 0 }))
                            )}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                )}

                {/* ================================================================== */}
                {/* SECONDARY DIAGNOSTIC AREA: Other Registry Records                  */}
                {/* ================================================================== */}
                <div className="rounded-3xl bg-white border border-[#DDE2DA] shadow-xs overflow-hidden">
                  <div className="p-4 sm:p-5 bg-[#FAF8F5] border-b border-[#E6E8E1] flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#F0F1EB] flex items-center justify-center text-[#5F6C64] flex-shrink-0">
                        <Folder className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-editorial text-base sm:text-lg font-bold text-[#25352D]">
                            Other Registry Records
                          </h3>
                          <span className="font-technical text-[10px] text-[#85928A] px-2 py-0.5 rounded-full bg-[#F0F1EB]">
                            Technical Diagnostic View
                          </span>
                        </div>
                        <p className="text-xs text-[#5F6C64] mt-0.5">
                          Inspect all {registry.length} canonical records and underlying legacy database identifiers.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowOtherRecords(prev => !prev)}
                      className="px-3 py-1.5 rounded-xl border border-[#DDE2DA] bg-white hover:bg-[#F7F5EF] text-xs font-bold text-[#5F6C64] hover:text-[#25352D] transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span>{showOtherRecords ? 'Hide Raw Registry' : 'View Raw Registry'}</span>
                      {showOtherRecords ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                  </div>

                  {showOtherRecords && (
                    <div className="p-4 sm:p-6 space-y-4 bg-[#FBF8F2]">
                      <div className="text-xs text-[#5F6C64] p-3 rounded-xl bg-[#FFF9F2] border border-[#F2DEBF]">
                        This technical diagnostic tree displays all raw canonical items and legacy database node keys. Everyday publishing controls should be operated using the three horizontal tabs above.
                      </div>
                      <div className="space-y-2">
                        {roots.map(root => renderRawTreeItem(root, 0))}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )}

          </>
        )}

      </main>

      {/* Parent Visibility Confirmation Modal (Safeguard for Hiding and Publishing) */}
      {parentConfirmModal.isOpen && parentConfirmModal.item && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-[#DDE2DA] shadow-xl max-w-md w-full p-6 space-y-4 text-left">
            <div className="flex items-center gap-3 text-[#956A43]">
              <div className="w-10 h-10 rounded-2xl bg-[#FFF9F2] border border-[#F2DEBF] flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-[#956A43]" />
              </div>
              <div>
                <h3 className="font-editorial text-lg font-bold text-[#25352D]">
                  Confirm Visibility Change
                </h3>
                <span className="text-xs text-[#85928A] font-technical">
                  Parent Node: {parentConfirmModal.item.id}
                </span>
              </div>
            </div>

            <div className="text-xs text-[#5F6C64] leading-relaxed space-y-2 bg-[#FBF8F2] p-4 rounded-2xl border border-[#E8ECE5]">
              {parentConfirmModal.mode === 'hide' ? (
                <>
                  <p>
                    You are about to hide <strong className="text-[#25352D]">"{parentConfirmModal.item.title}"</strong>.
                  </p>
                  <p>
                    Hiding this parent item will cause its <strong className="text-[#956A43]">{parentConfirmModal.childCount} child content items</strong> to become inaccessible to public visitors on the website.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    You are about to publish <strong className="text-[#25352D]">"{parentConfirmModal.item.title}"</strong>.
                  </p>
                  <p>
                    Publishing this parent item will restore public access to its <strong className="text-[#285C49]">{parentConfirmModal.childCount} previously published child items</strong> for all visitors on the website.
                  </p>
                </>
              )}
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setParentConfirmModal({ isOpen: false, item: null, childCount: 0, targetState: false, mode: 'hide' })}
                className="px-4 py-2 rounded-xl bg-[#F0F1EB] hover:bg-[#E4E6DE] text-xs font-bold text-[#5F6C64] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const targetItem = parentConfirmModal.item;
                  const nextState = parentConfirmModal.targetState;
                  setParentConfirmModal({ isOpen: false, item: null, childCount: 0, targetState: false, mode: 'hide' });
                  executeToggleVisibility(targetItem, nextState);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold text-white transition-colors cursor-pointer flex items-center gap-1.5 ${
                  parentConfirmModal.targetState
                    ? 'bg-[#285C49] hover:bg-[#1F4738]'
                    : 'bg-[#9B2C2C] hover:bg-[#822424]'
                }`}
              >
                {parentConfirmModal.targetState ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{parentConfirmModal.targetState ? 'Confirm and Publish' : 'Confirm and Hide'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

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
