import React, { useState, useEffect, useMemo } from 'react';
import { 
  FolderOpen, 
  FileText, 
  Layers, 
  BookOpen, 
  Globe, 
  ExternalLink, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  AlertCircle, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Database, 
  Save, 
  Copy, 
  Eye, 
  EyeOff, 
  HelpCircle,
  Video,
  Calculator,
  ArrowRight
} from 'lucide-react';
import { 
  fetchAdminResources, 
  saveResource, 
  toggleResourcePublication, 
  deleteResource, 
  checkResourceStorageStatus,
  isValidResourceUrl
} from '../../services/resourceManagerService';
import { dldSyllabus } from '../../data/dldSyllabus';

/**
 * ResourceManagerView
 * ZeroIndex Engineering Platform - Digital Logic Design
 * Administrator Subject Resource Manager
 * Strictly zero em-dashes and zero en-dashes throughout.
 */
export const ResourceManagerView = ({ adminSession }) => {
  const [activeSection, setActiveSection] = useState('unit_materials');
  const [selectedUnit, setSelectedUnit] = useState(1);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [storageStatus, setStorageStatus] = useState(null);
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  
  // URL input local draft states keyed by resource id
  const [urlDrafts, setUrlDrafts] = useState({});
  const [titleDrafts, setTitleDrafts] = useState({});

  // Add / Edit Modal state
  const [editModal, setEditModal] = useState({
    isOpen: false,
    isNew: false,
    resource: null
  });

  // Delete confirmation modal state
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    resource: null
  });

  // SQL Migration view modal state
  const [isMigrationModalOpen, setIsMigrationModalOpen] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  // Load storage status and resources
  const loadData = async () => {
    setLoading(true);
    try {
      const status = await checkResourceStorageStatus();
      setStorageStatus(status);

      const res = await fetchAdminResources('dld');
      setResources(res.items || []);

      // Initialize draft URL and title states
      const initialUrls = {};
      const initialTitles = {};
      (res.items || []).forEach(r => {
        initialUrls[r.id] = r.url || '';
        initialTitles[r.id] = r.title || '';
      });
      setUrlDrafts(initialUrls);
      setTitleDrafts(initialTitles);
    } catch (err) {
      setFeedback({ type: 'error', message: 'Failed to load resources: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtered views
  const syllabusResources = useMemo(() => 
    resources.filter(r => r.category === 'syllabus'),
    [resources]
  );

  const prescribedBooks = useMemo(() => 
    resources.filter(r => r.category === 'textbooks'),
    [resources]
  );

  const referenceBooks = useMemo(() => 
    resources.filter(r => r.category === 'reference_books'),
    [resources]
  );

  const unitPdfMaterials = useMemo(() => 
    resources.filter(r => r.category === 'pdf_materials' && r.unit_number === selectedUnit),
    [resources, selectedUnit]
  );

  const unitPptMaterials = useMemo(() => 
    resources.filter(r => r.category === 'ppt_materials' && r.unit_number === selectedUnit),
    [resources, selectedUnit]
  );

  const externalChannels = useMemo(() => 
    resources.filter(r => r.category === 'educational_channels'),
    [resources]
  );

  const externalWebsites = useMemo(() => 
    resources.filter(r => r.category === 'reference_websites'),
    [resources]
  );

  const externalCalculators = useMemo(() => 
    resources.filter(r => r.category === 'online_calculators'),
    [resources]
  );

  const isStorageUnavailable = Boolean(!storageStatus?.isLiveDb || storageStatus?.unmigrated);

  // Quick save URL and title from row
  const handleQuickSave = async (resource) => {
    if (isStorageUnavailable) {
      setFeedback({ 
        type: 'error', 
        message: 'Write action blocked: Database storage is unavailable. Table public.subject_resources has not been migrated in Supabase project ruuomptmkabvdmiutxtj. Please run migration 20261028000002_subject_resources_manager.sql in the Supabase SQL Editor first.' 
      });
      return;
    }

    const newUrl = (urlDrafts[resource.id] || '').trim();
    const newTitle = (titleDrafts[resource.id] || resource.title || '').trim();

    if (!newTitle) {
      setFeedback({ type: 'error', message: 'Resource title cannot be empty.' });
      return;
    }

    if (newUrl && !isValidResourceUrl(newUrl)) {
      setFeedback({ type: 'error', message: 'Invalid URL format. Please enter a valid HTTP or HTTPS address.' });
      return;
    }

    setSavingId(resource.id);
    setFeedback({ type: '', message: '' });

    try {
      const res = await saveResource({
        ...resource,
        title: newTitle,
        url: newUrl || null,
        // If the URL was cleared, automatically disable publication to protect students
        is_published: newUrl ? resource.is_published : false
      }, adminSession);

      if (res.success) {
        setResources(prev => prev.map(r => r.id === resource.id ? res.item : r));
        setFeedback({ 
          type: res.unmigrated ? 'warning' : 'success', 
          message: res.unmigrated 
            ? 'Saved in local runtime session. Note: Run migration SQL in Supabase for cross-device persistence.'
            : `Successfully saved "${newTitle}".`
        });
      } else {
        setFeedback({ type: 'error', message: res.error || 'Failed to save resource.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    } finally {
      setSavingId(null);
    }
  };

  // Toggle publication switch
  const handleTogglePublication = async (resource) => {
    if (isStorageUnavailable) {
      setFeedback({ 
        type: 'error', 
        message: 'Publication toggle blocked: Database storage is unavailable. Table public.subject_resources has not been migrated in Supabase project ruuomptmkabvdmiutxtj. Please run migration 20261028000002_subject_resources_manager.sql in the Supabase SQL Editor first.' 
      });
      return;
    }

    const targetState = !resource.is_published;
    const currentUrl = (urlDrafts[resource.id] || resource.url || '').trim();

    if (targetState && (!currentUrl || !isValidResourceUrl(currentUrl))) {
      setFeedback({ 
        type: 'error', 
        message: 'Cannot publish: Please paste and save a valid HTTP or HTTPS Google Drive URL first.' 
      });
      return;
    }

    setSavingId(resource.id);
    setFeedback({ type: '', message: '' });

    try {
      const res = await toggleResourcePublication(resource.id, targetState, adminSession);
      if (res.success) {
        setResources(prev => prev.map(r => r.id === resource.id ? res.item : r));
        setFeedback({ 
          type: res.unmigrated ? 'warning' : 'success', 
          message: targetState 
            ? `Published "${resource.title}". This link is now visible to students.`
            : `Disabled "${resource.title}". Students now see a neutral "Link not yet added" placeholder.`
        });
      } else {
        setFeedback({ type: 'error', message: res.error || 'Failed to toggle publication.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    } finally {
      setSavingId(null);
    }
  };

  // Open Add modal with sensible defaults
  const handleOpenAddModal = (category, unitNum = null, defaultType = 'PDF') => {
    setEditModal({
      isOpen: true,
      isNew: true,
      resource: {
        id: `res-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        course_id: 'dld',
        category,
        unit_number: unitNum,
        title: '',
        description: '',
        resource_type: defaultType,
        url: '',
        is_published: false,
        display_order: 10
      }
    });
  };

  // Save from Modal
  const handleModalSave = async (e) => {
    e.preventDefault();
    if (isStorageUnavailable) {
      setFeedback({ 
        type: 'error', 
        message: 'Saving blocked: Database storage is unavailable. Table public.subject_resources has not been migrated in Supabase project ruuomptmkabvdmiutxtj. Please run migration 20261028000002_subject_resources_manager.sql in the Supabase SQL Editor first.' 
      });
      return;
    }

    const item = editModal.resource;
    if (!item.title.trim()) {
      setFeedback({ type: 'error', message: 'Document title cannot be empty.' });
      return;
    }

    if (item.url && !isValidResourceUrl(item.url)) {
      setFeedback({ type: 'error', message: 'Invalid URL. Please enter a valid HTTP or HTTPS address.' });
      return;
    }

    if (item.is_published && (!item.url || !isValidResourceUrl(item.url))) {
      setFeedback({ type: 'error', message: 'Cannot publish without a valid URL.' });
      return;
    }

    setSavingId('modal-save');
    try {
      const res = await saveResource(item, adminSession);
      if (res.success) {
        if (editModal.isNew) {
          setResources(prev => [...prev, res.item]);
        } else {
          setResources(prev => prev.map(r => r.id === res.item.id ? res.item : r));
        }
        setUrlDrafts(prev => ({ ...prev, [res.item.id]: res.item.url || '' }));
        setTitleDrafts(prev => ({ ...prev, [res.item.id]: res.item.title || '' }));
        setEditModal({ isOpen: false, isNew: false, resource: null });
        setFeedback({ 
          type: res.unmigrated ? 'warning' : 'success', 
          message: `Successfully saved "${res.item.title}".` 
        });
      } else {
        setFeedback({ type: 'error', message: res.error || 'Failed to save resource.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    } finally {
      setSavingId(null);
    }
  };

  // Delete Resource confirmation
  const handleConfirmDelete = async () => {
    if (!deleteModal.resource) return;
    if (isStorageUnavailable) {
      setFeedback({ 
        type: 'error', 
        message: 'Deletion blocked: Database storage is unavailable. Table public.subject_resources has not been migrated in Supabase project ruuomptmkabvdmiutxtj. Please run migration 20261028000002_subject_resources_manager.sql in the Supabase SQL Editor first.' 
      });
      return;
    }

    const resId = deleteModal.resource.id;
    setSavingId(resId);
    try {
      const res = await deleteResource(resId, adminSession);
      if (res.success) {
        setResources(prev => prev.filter(r => r.id !== resId));
        setFeedback({ type: 'success', message: `Deleted "${deleteModal.resource.title}".` });
      } else {
        setFeedback({ type: 'error', message: res.error || 'Failed to delete resource.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    } finally {
      setSavingId(null);
      setDeleteModal({ isOpen: false, resource: null });
    }
  };

  const migrationSqlText = `-- =========================================================================
-- ZEROINDEX: SUBJECT RESOURCES MANAGER SECURE FOUNDATION
-- Migration: 20261028000002_subject_resources_manager.sql
-- Target Supabase Project: ruuomptmkabvdmiutxtj
-- =========================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

CREATE TABLE IF NOT EXISTS public.subject_resources (
  id TEXT PRIMARY KEY,
  course_id TEXT NOT NULL DEFAULT 'dld',
  category TEXT NOT NULL CHECK (
    category IN (
      'syllabus',
      'textbooks',
      'reference_books',
      'pdf_materials',
      'ppt_materials',
      'educational_channels',
      'reference_websites',
      'online_calculators'
    )
  ),
  unit_number INTEGER CHECK (unit_number BETWEEN 1 AND 5),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  resource_type TEXT NOT NULL DEFAULT 'PDF' CHECK (
    resource_type IN ('PDF', 'PPT', 'Book', 'Channel', 'Website', 'Calculator', 'Other')
  ),
  url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_subject_resources_course_cat ON public.subject_resources(course_id, category);
CREATE INDEX IF NOT EXISTS idx_subject_resources_unit ON public.subject_resources(course_id, unit_number);
CREATE INDEX IF NOT EXISTS idx_subject_resources_pub ON public.subject_resources(is_published);
CREATE INDEX IF NOT EXISTS idx_subject_resources_order ON public.subject_resources(display_order, created_at);

ALTER TABLE public.subject_resources ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view published subject resources" ON public.subject_resources;
CREATE POLICY "Public can view published subject resources"
  ON public.subject_resources
  FOR SELECT
  TO anon, authenticated
  USING (
    is_published = true 
    AND url IS NOT NULL 
    AND length(trim(url)) > 0
  );

DROP POLICY IF EXISTS "Admins can view all subject resources" ON public.subject_resources;
CREATE POLICY "Admins can view all subject resources"
  ON public.subject_resources
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can insert subject resources" ON public.subject_resources;
CREATE POLICY "Admins can insert subject resources"
  ON public.subject_resources
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can update subject resources" ON public.subject_resources;
CREATE POLICY "Admins can update subject resources"
  ON public.subject_resources
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete subject resources" ON public.subject_resources;
CREATE POLICY "Admins can delete subject resources"
  ON public.subject_resources
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

GRANT SELECT ON public.subject_resources TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.subject_resources TO authenticated;
GRANT ALL ON public.subject_resources TO service_role;`;

  return (
    <div className="space-y-6 text-slate-800 text-left animate-in fade-in duration-150">
      
      {/* 1. HEADER BANNER */}
      <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase text-[#285C49] bg-[#EBF3ED] px-2.5 py-0.5 rounded">
                Admin Center
              </span>
              <span className="text-xs text-slate-500 font-mono">
                Course: Digital Logic Design (1005261102)
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#1E293B] tracking-tight">
              Subject Resource Manager
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Manage Google Drive links, PDF/PPT materials, textbooks, and syllabus documents. All published links immediately appear on the student-facing Subject Resources tab.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Storage Status Pill */}
            {storageStatus?.mode === 'cloud_ready' && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-semibold">
                <Database className="w-3.5 h-3.5 text-emerald-600" />
                <span>Cloud Storage Active</span>
              </div>
            )}

            {storageStatus?.unmigrated && (
              <button
                type="button"
                onClick={() => setIsMigrationModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100 text-xs font-mono font-semibold transition-colors cursor-pointer"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Migration Required (Click to View SQL)</span>
              </button>
            )}

            {storageStatus?.mode === 'local_demo' && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-300 text-xs font-mono font-semibold">
                <Database className="w-3.5 h-3.5 text-slate-500" />
                <span>Local Session Cache</span>
              </div>
            )}

            <button
              type="button"
              onClick={loadData}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] hover:bg-white text-slate-700 text-xs font-semibold transition-all cursor-pointer"
              title="Refresh resources from storage"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback.message && (
          <div className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 transition-all ${
            feedback.type === 'error' 
              ? 'bg-rose-50 border border-rose-200 text-rose-800' 
              : feedback.type === 'warning'
              ? 'bg-amber-50 border border-amber-200 text-amber-800'
              : 'bg-emerald-50 border border-emerald-200 text-emerald-800'
          }`}>
            {feedback.type === 'error' ? (
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            ) : feedback.type === 'warning' ? (
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1 font-medium leading-snug">{feedback.message}</div>
            <button 
              type="button" 
              onClick={() => setFeedback({ type: '', message: '' })}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Prominent Database Storage Unavailable Warning Banner */}
        {isStorageUnavailable && (
          <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-300 text-amber-900 text-xs space-y-2.5">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-1 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-bold text-sm text-amber-950">
                    Database Storage Unavailable: Supabase Migration Required
                  </h4>
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-amber-200/80 text-amber-900 font-semibold">
                    Target Project: ruuomptmkabvdmiutxtj
                  </span>
                </div>
                <p className="text-amber-800 leading-relaxed">
                  Table <code className="font-mono font-bold bg-amber-100 px-1 py-0.5 rounded">public.subject_resources</code> has not been created in Supabase project <code className="font-mono font-bold bg-amber-100 px-1 py-0.5 rounded">ruuomptmkabvdmiutxtj</code>.
                  Resource changes cannot be permanently saved to cloud storage until migration <code className="font-mono font-bold bg-amber-100 px-1 py-0.5 rounded">20261028000002_subject_resources_manager.sql</code> is executed in the Supabase SQL Editor.
                </p>
                <p className="text-amber-900 leading-relaxed font-semibold">
                  Production write actions (Save, Publish Toggle, Add Document, Delete) are disabled while database storage is unavailable to prevent silent data loss. Student syllabus, curriculum breakdown, and static bibliography remain fully readable.
                </p>
              </div>
            </div>
            <div className="pt-2 border-t border-amber-200 flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setIsMigrationModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold transition-colors cursor-pointer shadow-2xs"
              >
                <Database className="w-3.5 h-3.5" />
                <span>View and Copy Migration SQL for Project ruuomptmkabvdmiutxtj</span>
              </button>
              <span className="text-[11px] font-mono text-amber-800">
                Read-only fallback active. Execute migration in Supabase SQL Editor to enable live database writes.
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 2. CATEGORY NAVIGATION TABS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5 p-1.5 bg-[#FAF8F5] border border-[#DCE7E1] rounded-2xl shadow-2xs">
        {[
          { id: 'unit_materials', label: 'Unit Materials (PDF & PPT)', icon: Layers },
          { id: 'syllabus', label: 'Official Syllabus', icon: FileText },
          { id: 'textbooks', label: 'Prescribed Textbooks (2)', icon: BookOpen },
          { id: 'reference_books', label: 'Reference Books (3)', icon: BookOpen },
          { id: 'external', label: 'External Resources', icon: Globe }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSection(tab.id)}
              className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl font-mono text-xs font-semibold text-center transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-[#285C49] shadow-xs border border-[#DCE7E1] font-bold ring-1 ring-[#285C49]/20'
                  : 'text-[#5F6C64] hover:text-[#1E293B] hover:bg-white/60'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-[#285C49]' : 'text-[#8C9A90]'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ==================================================================== */}
      {/* SECTION D: UNIT-WISE MATERIALS (PDF & PPT)                           */}
      {/* ==================================================================== */}
      {activeSection === 'unit_materials' && (
        <div className="space-y-5">
          
          {/* Unit Selector Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase text-slate-500">Select Unit:</span>
              <div className="flex flex-wrap items-center gap-1.5">
                {[1, 2, 3, 4, 5].map(uNum => {
                  const isSelected = selectedUnit === uNum;
                  return (
                    <button
                      key={uNum}
                      type="button"
                      onClick={() => setSelectedUnit(uNum)}
                      className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#285C49] text-white shadow-xs'
                          : 'bg-[#FAF8F5] border border-[#DCE7E1] text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Unit {uNum}
                    </button>
                  );
                })}
              </div>
            </div>

            <span className="text-xs text-slate-500 font-mono">
              Unit {selectedUnit}: Exactly two categories (PDF &amp; PPT)
            </span>
          </div>

          {/* TWO CATEGORY PANELS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* 1. PDF Materials Category Panel */}
            <div className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F2F7F4]">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#285C49]" />
                  <div>
                    <h3 className="text-base font-bold text-[#1E293B]">PDF Materials</h3>
                    <p className="text-xs text-slate-500">Lecture notes and tutorial sheets for Unit {selectedUnit}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenAddModal('pdf_materials', selectedUnit, 'PDF')}
                  disabled={isStorageUnavailable}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#DCE7E1] text-xs font-bold transition-all shadow-2xs ${
                    isStorageUnavailable
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-60'
                      : 'bg-[#EBF3ED] hover:bg-[#285C49] text-[#285C49] hover:text-white cursor-pointer'
                  }`}
                  title={isStorageUnavailable ? 'Disabled: Database migration required in Supabase project ruuomptmkabvdmiutxtj' : 'Add PDF'}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add PDF</span>
                </button>
              </div>

              {unitPdfMaterials.length === 0 ? (
                <div className="p-6 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] text-center text-xs text-slate-500 font-mono">
                  No PDF documents registered yet. Click &ldquo;Add PDF&rdquo; above.
                </div>
              ) : (
                <div className="space-y-3.5">
                  {unitPdfMaterials.map(res => (
                    <ResourceRowCard
                      key={res.id}
                      resource={res}
                      urlDraft={urlDrafts[res.id] || ''}
                      titleDraft={titleDrafts[res.id] || res.title}
                      onUrlChange={(val) => setUrlDrafts(prev => ({ ...prev, [res.id]: val }))}
                      onTitleChange={(val) => setTitleDrafts(prev => ({ ...prev, [res.id]: val }))}
                      onSave={() => handleQuickSave(res)}
                      onToggle={() => handleTogglePublication(res)}
                      onEdit={() => setEditModal({ isOpen: true, isNew: false, resource: res })}
                      onDelete={() => setDeleteModal({ isOpen: true, resource: res })}
                      saving={savingId === res.id}
                      isStorageUnavailable={isStorageUnavailable}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* 2. PPT Materials Category Panel */}
            <div className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F2F7F4]">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#A05E26]" />
                  <div>
                    <h3 className="text-base font-bold text-[#1E293B]">PPT Materials</h3>
                    <p className="text-xs text-slate-500">Presentation decks and visual slides for Unit {selectedUnit}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenAddModal('ppt_materials', selectedUnit, 'PPT')}
                  disabled={isStorageUnavailable}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#DCE7E1] text-xs font-bold transition-all shadow-2xs ${
                    isStorageUnavailable
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-60'
                      : 'bg-[#FAF2EB] hover:bg-[#A05E26] text-[#A05E26] hover:text-white cursor-pointer'
                  }`}
                  title={isStorageUnavailable ? 'Disabled: Database migration required in Supabase project ruuomptmkabvdmiutxtj' : 'Add PPT'}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add PPT</span>
                </button>
              </div>

              {unitPptMaterials.length === 0 ? (
                <div className="p-6 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] text-center text-xs text-slate-500 font-mono">
                  No PPT presentations registered yet. Click &ldquo;Add PPT&rdquo; above.
                </div>
              ) : (
                <div className="space-y-3.5">
                  {unitPptMaterials.map(res => (
                    <ResourceRowCard
                      key={res.id}
                      resource={res}
                      urlDraft={urlDrafts[res.id] || ''}
                      titleDraft={titleDrafts[res.id] || res.title}
                      onUrlChange={(val) => setUrlDrafts(prev => ({ ...prev, [res.id]: val }))}
                      onTitleChange={(val) => setTitleDrafts(prev => ({ ...prev, [res.id]: val }))}
                      onSave={() => handleQuickSave(res)}
                      onToggle={() => handleTogglePublication(res)}
                      onEdit={() => setEditModal({ isOpen: true, isNew: false, resource: res })}
                      onDelete={() => setDeleteModal({ isOpen: true, resource: res })}
                      saving={savingId === res.id}
                      isStorageUnavailable={isStorageUnavailable}
                    />
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SECTION A: OFFICIAL SYLLABUS MANAGEMENT                              */}
      {/* ==================================================================== */}
      {activeSection === 'syllabus' && (
        <div className="space-y-5">
          <div className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#F2F7F4]">
              <FileText className="w-5 h-5 text-[#285C49]" />
              <div>
                <h3 className="text-base font-bold text-[#1E293B]">Official Curriculum Syllabus Document</h3>
                <p className="text-xs text-slate-500">Autonomous VR23 Scheme | Course Code: {dldSyllabus.courseCode}</p>
              </div>
            </div>

            {syllabusResources.map(res => (
              <div key={res.id} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-[#1E293B]">{res.title}</h4>
                    <p className="text-xs text-slate-600">{res.description}</p>
                  </div>
                  <PublicationToggleBadge
                    isPublished={res.is_published}
                    hasUrl={Boolean(urlDrafts[res.id] || res.url)}
                    onToggle={() => handleTogglePublication(res)}
                    saving={savingId === res.id}
                    isStorageUnavailable={isStorageUnavailable}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono font-bold uppercase text-slate-500 block">
                    Google Drive Sharing URL:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      value={urlDrafts[res.id] || ''}
                      onChange={(e) => setUrlDrafts(prev => ({ ...prev, [res.id]: e.target.value }))}
                      placeholder="https://drive.google.com/file/d/..."
                      className="flex-1 px-3 py-2 rounded-xl bg-white border border-[#DCE7E1] text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#285C49]"
                    />
                    <button
                      type="button"
                      onClick={() => handleQuickSave(res)}
                      disabled={savingId === res.id || isStorageUnavailable}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs font-bold transition-all shadow-2xs ${
                        isStorageUnavailable
                          ? 'bg-slate-400 cursor-not-allowed opacity-60'
                          : 'bg-[#285C49] hover:bg-[#1E4738] cursor-pointer'
                      }`}
                      title={isStorageUnavailable ? 'Disabled: Database migration required in Supabase project ruuomptmkabvdmiutxtj' : 'Save URL'}
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{savingId === res.id ? 'Saving...' : 'Save URL'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#E5ECE8] text-[11px] font-mono text-slate-500">
                  <span>Student View: {res.is_published && res.url ? 'Clickable "View Official Syllabus PDF" active' : 'Neutral "Link not yet added" placeholder displayed'}</span>
                  {res.url && (
                    <a href={res.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#285C49] hover:underline font-bold">
                      <span>Test URL</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SECTION B: PRESCRIBED TEXTBOOKS (2)                                  */}
      {/* ==================================================================== */}
      {activeSection === 'textbooks' && (
        <div className="space-y-5">
          <div className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <div className="pb-3 border-b border-[#F2F7F4]">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#285C49]" />
                <h3 className="text-base font-bold text-[#1E293B]">Prescribed Textbooks (Exactly 2 Books)</h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                From official syllabus: Mano &amp; Ciletti (PEA) and Charles H. Roth (Cengage). Bibliographic details are permanent; manage external authorized access URLs below.
              </p>
            </div>

            <div className="space-y-3.5">
              {prescribedBooks.map(res => (
                <ResourceRowCard
                  key={res.id}
                  resource={res}
                  urlDraft={urlDrafts[res.id] || ''}
                  titleDraft={titleDrafts[res.id] || res.title}
                  onUrlChange={(val) => setUrlDrafts(prev => ({ ...prev, [res.id]: val }))}
                  onTitleChange={(val) => setTitleDrafts(prev => ({ ...prev, [res.id]: val }))}
                  onSave={() => handleQuickSave(res)}
                  onToggle={() => handleTogglePublication(res)}
                  onEdit={() => setEditModal({ isOpen: true, isNew: false, resource: res })}
                  onDelete={null} // Prescribed books cannot be deleted
                  saving={savingId === res.id}
                  isStorageUnavailable={isStorageUnavailable}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SECTION C: REFERENCE TEXTBOOKS (3)                                   */}
      {/* ==================================================================== */}
      {activeSection === 'reference_books' && (
        <div className="space-y-5">
          <div className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <div className="pb-3 border-b border-[#F2F7F4]">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-slate-600" />
                <h3 className="text-base font-bold text-[#1E293B]">Reference Textbooks (Exactly 3 Books)</h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                From official syllabus: Mano (PEA), Leach/Malvino/Saha (TMH), and R.P. Jain (TMH). Non-syllabus titles (Kohavi, Floyd) were removed.
              </p>
            </div>

            <div className="space-y-3.5">
              {referenceBooks.map(res => (
                <ResourceRowCard
                  key={res.id}
                  resource={res}
                  urlDraft={urlDrafts[res.id] || ''}
                  titleDraft={titleDrafts[res.id] || res.title}
                  onUrlChange={(val) => setUrlDrafts(prev => ({ ...prev, [res.id]: val }))}
                  onTitleChange={(val) => setTitleDrafts(prev => ({ ...prev, [res.id]: val }))}
                  onSave={() => handleQuickSave(res)}
                  onToggle={() => handleTogglePublication(res)}
                  onEdit={() => setEditModal({ isOpen: true, isNew: false, resource: res })}
                  onDelete={null} // Reference books cannot be deleted
                  saving={savingId === res.id}
                  isStorageUnavailable={isStorageUnavailable}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SECTION E: EXTERNAL LEARNING RESOURCES                               */}
      {/* ==================================================================== */}
      {activeSection === 'external' && (
        <div className="space-y-6">
          
          {/* 1. Educational Channels */}
          <div className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F2F7F4]">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-[#285C49]" />
                <h3 className="text-base font-bold text-[#1E293B]">Educational Channels (YouTube)</h3>
              </div>
              <button
                type="button"
                onClick={() => handleOpenAddModal('educational_channels', null, 'Channel')}
                disabled={isStorageUnavailable}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#DCE7E1] text-xs font-bold transition-all shadow-2xs ${
                  isStorageUnavailable
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-60'
                    : 'bg-[#EBF3ED] hover:bg-[#285C49] text-[#285C49] hover:text-white cursor-pointer'
                }`}
                title={isStorageUnavailable ? 'Disabled: Database migration required in Supabase project ruuomptmkabvdmiutxtj' : 'Add Channel'}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Channel</span>
              </button>
            </div>

            <div className="space-y-3.5">
              {externalChannels.map(res => (
                <ResourceRowCard
                  key={res.id}
                  resource={res}
                  urlDraft={urlDrafts[res.id] || ''}
                  titleDraft={titleDrafts[res.id] || res.title}
                  onUrlChange={(val) => setUrlDrafts(prev => ({ ...prev, [res.id]: val }))}
                  onTitleChange={(val) => setTitleDrafts(prev => ({ ...prev, [res.id]: val }))}
                  onSave={() => handleQuickSave(res)}
                  onToggle={() => handleTogglePublication(res)}
                  onEdit={() => setEditModal({ isOpen: true, isNew: false, resource: res })}
                  onDelete={() => setDeleteModal({ isOpen: true, resource: res })}
                  saving={savingId === res.id}
                  isStorageUnavailable={isStorageUnavailable}
                />
              ))}
            </div>
          </div>

          {/* 2. Reference Websites */}
          <div className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F2F7F4]">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#285C49]" />
                <h3 className="text-base font-bold text-[#1E293B]">Reference Websites</h3>
              </div>
              <button
                type="button"
                onClick={() => handleOpenAddModal('reference_websites', null, 'Website')}
                disabled={isStorageUnavailable}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#DCE7E1] text-xs font-bold transition-all shadow-2xs ${
                  isStorageUnavailable
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-60'
                    : 'bg-[#EBF3ED] hover:bg-[#285C49] text-[#285C49] hover:text-white cursor-pointer'
                }`}
                title={isStorageUnavailable ? 'Disabled: Database migration required in Supabase project ruuomptmkabvdmiutxtj' : 'Add Website'}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Website</span>
              </button>
            </div>

            <div className="space-y-3.5">
              {externalWebsites.map(res => (
                <ResourceRowCard
                  key={res.id}
                  resource={res}
                  urlDraft={urlDrafts[res.id] || ''}
                  titleDraft={titleDrafts[res.id] || res.title}
                  onUrlChange={(val) => setUrlDrafts(prev => ({ ...prev, [res.id]: val }))}
                  onTitleChange={(val) => setTitleDrafts(prev => ({ ...prev, [res.id]: val }))}
                  onSave={() => handleQuickSave(res)}
                  onToggle={() => handleTogglePublication(res)}
                  onEdit={() => setEditModal({ isOpen: true, isNew: false, resource: res })}
                  onDelete={() => setDeleteModal({ isOpen: true, resource: res })}
                  saving={savingId === res.id}
                  isStorageUnavailable={isStorageUnavailable}
                />
              ))}
            </div>
          </div>

          {/* 3. Online Calculators */}
          <div className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F2F7F4]">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#285C49]" />
                <h3 className="text-base font-bold text-[#1E293B]">Online Calculators</h3>
              </div>
              <button
                type="button"
                onClick={() => handleOpenAddModal('online_calculators', null, 'Calculator')}
                disabled={isStorageUnavailable}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#DCE7E1] text-xs font-bold transition-all shadow-2xs ${
                  isStorageUnavailable
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-60'
                    : 'bg-[#EBF3ED] hover:bg-[#285C49] text-[#285C49] hover:text-white cursor-pointer'
                }`}
                title={isStorageUnavailable ? 'Disabled: Database migration required in Supabase project ruuomptmkabvdmiutxtj' : 'Add Calculator'}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Calculator</span>
              </button>
            </div>

            <div className="space-y-3.5">
              {externalCalculators.map(res => (
                <ResourceRowCard
                  key={res.id}
                  resource={res}
                  urlDraft={urlDrafts[res.id] || ''}
                  titleDraft={titleDrafts[res.id] || res.title}
                  onUrlChange={(val) => setUrlDrafts(prev => ({ ...prev, [res.id]: val }))}
                  onTitleChange={(val) => setTitleDrafts(prev => ({ ...prev, [res.id]: val }))}
                  onSave={() => handleQuickSave(res)}
                  onToggle={() => handleTogglePublication(res)}
                  onEdit={() => setEditModal({ isOpen: true, isNew: false, resource: res })}
                  onDelete={() => setDeleteModal({ isOpen: true, resource: res })}
                  saving={savingId === res.id}
                  isStorageUnavailable={isStorageUnavailable}
                />
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ==================================================================== */}
      {/* ADD / EDIT RESOURCE MODAL                                            */}
      {/* ==================================================================== */}
      {editModal.isOpen && editModal.resource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-2xl bg-white border border-[#DCE7E1] shadow-2xl p-6 space-y-4 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE7E1]">
              <h3 className="text-base font-bold text-[#1E293B]">
                {editModal.isNew ? 'Add New Resource' : 'Edit Resource Details'}
              </h3>
              <button
                type="button"
                onClick={() => setEditModal({ isOpen: false, isNew: false, resource: null })}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleModalSave} className="space-y-4">
              <div>
                <label className="text-xs font-mono font-bold uppercase text-slate-600 block mb-1">
                  Resource Title *
                </label>
                <input
                  type="text"
                  required
                  value={editModal.resource.title}
                  onChange={(e) => setEditModal(prev => ({
                    ...prev,
                    resource: { ...prev.resource, title: e.target.value }
                  }))}
                  placeholder="e.g. PDF 1: Unit I Notes"
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#285C49]"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-bold uppercase text-slate-600 block mb-1">
                  Optional Description
                </label>
                <textarea
                  rows={2}
                  value={editModal.resource.description || ''}
                  onChange={(e) => setEditModal(prev => ({
                    ...prev,
                    resource: { ...prev.resource, description: e.target.value }
                  }))}
                  placeholder="Brief context or summary for students"
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#285C49]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono font-bold uppercase text-slate-600 block mb-1">
                    Resource Type
                  </label>
                  <select
                    value={editModal.resource.resource_type}
                    onChange={(e) => setEditModal(prev => ({
                      ...prev,
                      resource: { ...prev.resource, resource_type: e.target.value }
                    }))}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#285C49]"
                  >
                    <option value="PDF">PDF Document</option>
                    <option value="PPT">PPT Slide Deck</option>
                    <option value="Book">Prescribed / Reference Book</option>
                    <option value="Channel">Educational Channel</option>
                    <option value="Website">Reference Website</option>
                    <option value="Calculator">Online Calculator</option>
                  </select>
                </div>

                {editModal.resource.unit_number && (
                  <div>
                    <label className="text-xs font-mono font-bold uppercase text-slate-600 block mb-1">
                      Curriculum Unit
                    </label>
                    <select
                      value={editModal.resource.unit_number}
                      onChange={(e) => setEditModal(prev => ({
                        ...prev,
                        resource: { ...prev.resource, unit_number: Number(e.target.value) }
                      }))}
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#285C49]"
                    >
                      <option value={1}>Unit I</option>
                      <option value={2}>Unit II</option>
                      <option value={3}>Unit III</option>
                      <option value={4}>Unit IV</option>
                      <option value={5}>Unit V</option>
                    </select>
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-mono font-bold uppercase text-slate-600 block mb-1">
                  Google Drive / External URL
                </label>
                <input
                  type="url"
                  value={editModal.resource.url || ''}
                  onChange={(e) => setEditModal(prev => ({
                    ...prev,
                    resource: { ...prev.resource, url: e.target.value }
                  }))}
                  placeholder="https://drive.google.com/file/d/..."
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#285C49]"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1]">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Publication Toggle</span>
                  <span className="text-[11px] text-slate-500 font-mono">Make immediately visible to students</span>
                </div>
                <input
                  type="checkbox"
                  checked={editModal.resource.is_published}
                  onChange={(e) => setEditModal(prev => ({
                    ...prev,
                    resource: { ...prev.resource, is_published: e.target.checked }
                  }))}
                  className="w-4 h-4 rounded text-[#285C49] focus:ring-[#285C49]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#DCE7E1]">
                <button
                  type="button"
                  onClick={() => setEditModal({ isOpen: false, isNew: false, resource: null })}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingId === 'modal-save' || isStorageUnavailable}
                  className={`px-4 py-2 rounded-xl text-white text-xs font-bold transition-all shadow-2xs ${
                    isStorageUnavailable
                      ? 'bg-slate-400 cursor-not-allowed opacity-60'
                      : 'bg-[#285C49] hover:bg-[#1E4738] cursor-pointer'
                  }`}
                  title={isStorageUnavailable ? 'Disabled: Database migration required in Supabase project ruuomptmkabvdmiutxtj' : 'Save Resource'}
                >
                  {savingId === 'modal-save' ? 'Saving...' : 'Save Resource'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* DELETE CONFIRMATION MODAL                                            */}
      {/* ==================================================================== */}
      {deleteModal.isOpen && deleteModal.resource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-md rounded-2xl bg-white border border-rose-200 shadow-2xl p-6 space-y-4 text-left">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertCircle className="w-6 h-6 flex-shrink-0" />
              <h3 className="text-base font-bold text-slate-900">
                Confirm Resource Deletion
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Are you sure you want to delete <span className="font-bold text-slate-900">&ldquo;{deleteModal.resource.title}&rdquo;</span>? This will permanently remove this entry. (To temporarily hide it without deleting, switch the publication toggle OFF instead.)
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteModal({ isOpen: false, resource: null })}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={savingId === deleteModal.resource.id || isStorageUnavailable}
                className={`px-4 py-2 rounded-xl text-white text-xs font-bold transition-all shadow-2xs ${
                  isStorageUnavailable
                    ? 'bg-slate-400 cursor-not-allowed opacity-60'
                    : 'bg-rose-600 hover:bg-rose-700 cursor-pointer'
                }`}
                title={isStorageUnavailable ? 'Disabled: Database migration required in Supabase project ruuomptmkabvdmiutxtj' : 'Delete Permanently'}
              >
                {savingId === deleteModal.resource.id ? 'Deleting...' : 'Delete Permanently'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SQL MIGRATION MODAL                                                  */}
      {/* ==================================================================== */}
      {isMigrationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white border border-[#DCE7E1] shadow-2xl p-6 space-y-4 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE7E1]">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-[#285C49]" />
                <h3 className="text-base font-bold text-[#1E293B]">
                  Supabase Database Migration SQL
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsMigrationModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              To persist subject resource links across all devices and browsers, copy this SQL and run it in your <strong>Supabase Dashboard &gt; SQL Editor</strong>. Migration file: <code className="font-mono text-[#285C49]">supabase/migrations/20261028000002_subject_resources_manager.sql</code>.
            </p>

            <div className="relative">
              <pre className="p-3.5 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] overflow-x-auto max-h-72 leading-relaxed">
                {migrationSqlText}
              </pre>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(migrationSqlText);
                  setCopiedSql(true);
                  setTimeout(() => setCopiedSql(false), 2000);
                }}
                className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-semibold transition-colors cursor-pointer"
              >
                {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSql ? 'Copied' : 'Copy SQL'}</span>
              </button>
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                type="button"
                onClick={() => setIsMigrationModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#285C49] hover:bg-[#1E4738] text-white text-xs font-bold transition-all cursor-pointer shadow-2xs"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

/**
 * Single Resource Row Card
 */
const ResourceRowCard = ({
  resource,
  urlDraft,
  titleDraft,
  onUrlChange,
  onTitleChange,
  onSave,
  onToggle,
  onEdit,
  onDelete,
  saving,
  isStorageUnavailable
}) => {
  const isPublished = Boolean(resource.is_published);
  const hasUrl = Boolean(urlDraft && urlDraft.trim());

  return (
    <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3 transition-colors hover:border-[#285C49]/40">
      
      {/* Top Header: Title, Type badge, Publication Toggle Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
            resource.resource_type === 'PDF' 
              ? 'bg-[#EBF3ED] text-[#285C49]' 
              : resource.resource_type === 'PPT'
              ? 'bg-[#FAF2EB] text-[#A05E26]'
              : 'bg-white border border-[#DCE7E1] text-slate-600'
          }`}>
            {resource.resource_type}
          </span>
          <input
            type="text"
            value={titleDraft}
            onChange={(e) => onTitleChange(e.target.value)}
            className="text-xs sm:text-sm font-bold text-[#1E293B] bg-transparent border-b border-transparent hover:border-[#DCE7E1] focus:border-[#285C49] focus:outline-none px-1 py-0.5"
            placeholder="Document title"
          />
        </div>

        <div className="flex items-center gap-3">
          <PublicationToggleBadge
            isPublished={isPublished}
            hasUrl={hasUrl}
            onToggle={onToggle}
            saving={saving}
            isStorageUnavailable={isStorageUnavailable}
          />

          <div className="flex items-center gap-1 border-l border-[#DCE7E1] pl-2">
            <button
              type="button"
              onClick={onEdit}
              disabled={isStorageUnavailable}
              className={`p-1 rounded-lg text-slate-500 transition-colors ${
                isStorageUnavailable ? 'opacity-40 cursor-not-allowed' : 'hover:text-slate-800 hover:bg-white cursor-pointer'
              }`}
              title={isStorageUnavailable ? 'Disabled: Database migration required in Supabase project ruuomptmkabvdmiutxtj' : 'Edit details'}
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            {onDelete && (
              <button
                type="button"
                onClick={onDelete}
                disabled={isStorageUnavailable}
                className={`p-1 rounded-lg text-rose-500 transition-colors ${
                  isStorageUnavailable ? 'opacity-40 cursor-not-allowed' : 'hover:text-rose-700 hover:bg-rose-50 cursor-pointer'
                }`}
                title={isStorageUnavailable ? 'Disabled: Database migration required in Supabase project ruuomptmkabvdmiutxtj' : 'Delete document'}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Description if present */}
      {resource.description && (
        <p className="text-xs text-slate-600 leading-snug pl-1">
          {resource.description}
        </p>
      )}

      {/* URL Input and Quick Save */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="url"
            value={urlDraft}
            onChange={(e) => onUrlChange(e.target.value)}
            placeholder="Paste Google Drive URL (https://drive.google.com/...)"
            className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#DCE7E1] text-xs font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#285C49]"
          />
        </div>

        <button
          type="button"
          onClick={onSave}
          disabled={saving || isStorageUnavailable}
          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-white text-xs font-bold transition-all shadow-2xs flex-shrink-0 ${
            isStorageUnavailable
              ? 'bg-slate-400 cursor-not-allowed opacity-60'
              : 'bg-[#285C49] hover:bg-[#1E4738] cursor-pointer'
          }`}
          title={isStorageUnavailable ? 'Disabled: Database migration required in Supabase project ruuomptmkabvdmiutxtj' : 'Save'}
        >
          <Save className="w-3 h-3" />
          <span>{saving ? 'Saving...' : 'Save'}</span>
        </button>

        {urlDraft && isValidResourceUrl(urlDraft) && (
          <a
            href={urlDraft}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-white border border-[#DCE7E1] text-slate-600 hover:text-[#285C49] transition-colors cursor-pointer flex-shrink-0"
            title="Open link in new tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

      {/* Status Footer */}
      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1 border-t border-[#E5ECE8]">
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${isPublished && hasUrl ? 'bg-emerald-500' : 'bg-slate-300'}`} />
          <span>Student View: {isPublished && hasUrl ? 'Visible (Active Button)' : 'Hidden (Neutral "Link not yet added" state)'}</span>
        </div>
        <span className="text-slate-400">ID: {resource.id}</span>
      </div>

    </div>
  );
};

/**
 * Publication Toggle Switch with explicit status label
 */
const PublicationToggleBadge = ({ isPublished, hasUrl, onToggle, saving, isStorageUnavailable }) => {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        role="switch"
        aria-checked={isPublished}
        onClick={onToggle}
        disabled={saving || isStorageUnavailable}
        className={`relative inline-flex h-5 w-9 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#285C49] ${
          isStorageUnavailable ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        } ${
          isPublished ? 'bg-[#285C49]' : 'bg-slate-300'
        }`}
        title={
          isStorageUnavailable 
            ? 'Disabled: Database migration required in Supabase project ruuomptmkabvdmiutxtj'
            : (isPublished ? 'Click to hide from students' : 'Click to publish to students')
        }
      >
        <span
          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
            isPublished ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </button>

      <span className={`text-[11px] font-mono font-semibold ${
        isPublished ? 'text-emerald-700' : 'text-slate-500'
      }`}>
        {isPublished ? 'Published' : 'Draft / Hidden'}
      </span>
    </div>
  );
};

export default ResourceManagerView;
