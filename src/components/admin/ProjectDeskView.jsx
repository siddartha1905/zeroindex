import React, { useState, useEffect, useMemo } from 'react';
import { 
  Inbox, 
  ListTodo, 
  BookOpen, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Download, 
  Compass, 
  Layers, 
  Radio, 
  Sparkles, 
  FileText, 
  ShieldCheck, 
  ChevronDown, 
  ChevronRight, 
  Archive, 
  Clock,
  ExternalLink
} from 'lucide-react';
import { 
  fetchProjectDeskItems, 
  createProjectDeskItem, 
  updateProjectDeskItem, 
  deleteProjectDeskItem, 
  fetchProjectDeskMeta, 
  saveProjectDeskMeta, 
  generateSanitizedProjectSnapshot, 
  triggerSnapshotDownload,
  checkProjectDeskStorageStatus,
  seedInitialBaselineItems
} from '../../services/projectDeskService';
import { initialProjectDeskItems, initialProjectDeskMeta } from '../../data/projectDeskSeedData';

export const ProjectDeskView = ({ adminSession, initialTab = 'desk' }) => {
  // Main Navigation Tab: 'inbox' | 'desk' | 'memory'
  const [activeTab, setActiveTab] = useState(initialTab);
  
  // Data states initialized with seed data for zero layout shift and clean SSR
  const [items, setItems] = useState(initialProjectDeskItems || []);
  const [meta, setMeta] = useState(initialProjectDeskMeta.continue_where_left_off || null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [notification, setNotification] = useState({ type: '', message: '' });
  const [storageStatus, setStorageStatus] = useState({
    mode: 'checking',
    isLiveDb: false,
    unmigrated: false,
    message: ''
  });

  // Continue Where I Left Off Editing State
  const [isEditingContinueNote, setIsEditingContinueNote] = useState(false);
  const [continueNoteDraft, setContinueNoteDraft] = useState(initialProjectDeskMeta.continue_where_left_off?.note || '');
  const [continueMilestoneDraft, setContinueMilestoneDraft] = useState(initialProjectDeskMeta.continue_where_left_off?.activeMilestone || '');
  const [continueNextActionDraft, setContinueNextActionDraft] = useState(initialProjectDeskMeta.continue_where_left_off?.nextAction || '');

  // Idea Inbox State
  const [ideaSearch, setIdeaSearch] = useState('');
  const [ideaCategoryFilter, setIdeaCategoryFilter] = useState('all');
  const [ideaPillarFilter, setIdeaPillarFilter] = useState('all');
  const [isAddIdeaOpen, setIsAddIdeaOpen] = useState(false);
  const [newIdeaTitle, setNewIdeaTitle] = useState('');
  const [newIdeaContent, setNewIdeaContent] = useState('');
  const [newIdeaCategory, setNewIdeaCategory] = useState('content_idea');
  const [newIdeaPillar, setNewIdeaPillar] = useState('workbench');
  const [ideaFormError, setIdeaFormError] = useState('');

  // Development Desk State
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [targetColumnForNewTask, setTargetColumnForNewTask] = useState('now');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskContent, setNewTaskContent] = useState('');
  const [newTaskPillar, setNewTaskPillar] = useState('workbench');
  const [newTaskPriority, setNewTaskPriority] = useState('high');
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);

  // Completion Note Modal State
  const [completingTaskId, setCompletingTaskId] = useState(null);
  const [completionNoteText, setCompletionNoteText] = useState('');

  // Edit Item Modal State
  const [editingItem, setEditingItem] = useState(null);

  // Project Memory Filter State
  const [memoryFilter, setMemoryFilter] = useState('all'); // 'all' | 'active' | 'superseded'
  const [memorySearch, setMemorySearch] = useState('');

  // Load all desk data
  const loadDeskData = async () => {
    setLoading(true);
    try {
      const [statusRes, itemsRes, metaRes] = await Promise.all([
        checkProjectDeskStorageStatus(),
        fetchProjectDeskItems(),
        fetchProjectDeskMeta('continue_where_left_off')
      ]);

      if (statusRes) {
        setStorageStatus(statusRes);
      }

      if (itemsRes.success) {
        setItems(itemsRes.items || []);
      } else {
        setNotification({ type: 'error', message: itemsRes.error || 'Failed to load desk items.' });
      }

      if (metaRes.success && metaRes.payload) {
        setMeta(metaRes.payload);
        setContinueNoteDraft(metaRes.payload.note || '');
        setContinueMilestoneDraft(metaRes.payload.activeMilestone || '');
        setContinueNextActionDraft(metaRes.payload.nextAction || '');
      }
    } catch (err) {
      setNotification({ type: 'error', message: err.message || 'Error loading Project Desk.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDeskData();
  }, []);

  // Idempotently seed curated initial baseline
  const handleSeedBaseline = async () => {
    setSeeding(true);
    try {
      const res = await seedInitialBaselineItems(adminSession);
      if (res.success) {
        showNotify('success', `Initialized baseline: ${res.insertedCount} records inserted (${res.skippedCount} skipped).`);
        await loadDeskData();
      } else {
        showNotify('error', res.error || 'Failed to initialize baseline items.');
      }
    } catch (err) {
      showNotify('error', err.message || 'Error initializing baseline.');
    } finally {
      setSeeding(false);
    }
  };

  // Show temporary notification
  const showNotify = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification({ type: '', message: '' });
    }, 4000);
  };

  // Save Continue Where I Left Off Note
  const handleSaveContinueNote = async () => {
    if (!continueNoteDraft.trim()) return;
    setSaving(true);
    try {
      const updatedPayload = {
        note: continueNoteDraft.trim(),
        activeMilestone: continueMilestoneDraft.trim(),
        nextAction: continueNextActionDraft.trim(),
        lastEdited: new Date().toISOString()
      };

      const res = await saveProjectDeskMeta('continue_where_left_off', updatedPayload, adminSession);
      if (res.success) {
        setMeta(updatedPayload);
        setIsEditingContinueNote(false);
        showNotify('success', 'Continue note updated successfully.');
      } else {
        showNotify('error', res.error || 'Failed to save continue note.');
      }
    } catch (err) {
      showNotify('error', err.message || 'Error saving continue note.');
    } finally {
      setSaving(false);
    }
  };

  // Handle Quick Add Idea
  const handleCreateIdea = async (e) => {
    e.preventDefault();
    if (!newIdeaTitle.trim()) return;

    if (storageStatus.isLiveDb && adminSession?.isOwner && adminSession?.assuranceLevel === 'aal1') {
      const aal1Msg = 'MFA Verification Required: You are signed in with password only (AAL1). Project Desk write operations require Multi-Factor Authentication (AAL2). Please complete Authenticator verification.';
      setIdeaFormError(aal1Msg);
      showNotify('error', aal1Msg);
      return;
    }

    setSaving(true);
    setIdeaFormError('');
    try {
      const classification = newIdeaCategory;
      const validDbCategory = classification === 'teaching_note' 
        ? 'teaching_note' 
        : (newIdeaPillar && ['workbench', 'atlas', 'journal'].includes(newIdeaPillar) ? newIdeaPillar : 'general');

      const res = await createProjectDeskItem({
        title: newIdeaTitle.trim(),
        content: newIdeaContent.trim(),
        item_type: 'idea',
        category: validDbCategory,
        pillar: newIdeaPillar,
        status: 'new',
        priority: 'medium',
        metadata: {
          classification
        },
        tags: [classification]
      }, adminSession);

      if (res.success && res.item) {
        setItems(prev => [res.item, ...prev.filter(i => i.id !== res.item.id)]);
        setNewIdeaTitle('');
        setNewIdeaContent('');
        setIsAddIdeaOpen(false);
        setIdeaFormError('');

        // Reset filter if new idea would be hidden
        if (ideaCategoryFilter !== 'all' && ideaCategoryFilter !== classification) {
          setIdeaCategoryFilter('all');
        }
        if (ideaPillarFilter !== 'all' && ideaPillarFilter !== newIdeaPillar) {
          setIdeaPillarFilter('all');
        }
        if (ideaSearch.trim()) {
          setIdeaSearch('');
        }

        showNotify('success', 'New idea successfully saved to Supabase.');
      } else {
        const errorMsg = res.error || 'Failed to add idea.';
        setIdeaFormError(errorMsg);
        showNotify('error', errorMsg);
      }
    } catch (err) {
      const errorMsg = err.message || 'Error creating idea.';
      setIdeaFormError(errorMsg);
      showNotify('error', errorMsg);
    } finally {
      setSaving(false);
    }
  };

  // Move Idea into Development Plan (Now, Next, or Later)
  const handleMoveIdeaToPlan = async (ideaItem, targetColumn) => {
    setSaving(true);
    try {
      const res = await updateProjectDeskItem(ideaItem.id, {
        item_type: 'plan',
        status: targetColumn,
        priority: 'high'
      }, adminSession);

      if (res.success && res.item) {
        setItems(prev => prev.map(i => i.id === ideaItem.id ? res.item : i));
        showNotify('success', `Moved "${ideaItem.title}" to Development Plan (${targetColumn.toUpperCase()}).`);
      } else {
        showNotify('error', res.error || 'Failed to move idea.');
      }
    } catch (err) {
      showNotify('error', err.message || 'Error moving idea.');
    } finally {
      setSaving(false);
    }
  };

  // Toggle Idea Park status
  const handleToggleParkIdea = async (ideaItem) => {
    const nextStatus = ideaItem.status === 'parked' ? 'new' : 'parked';
    setSaving(true);
    try {
      const res = await updateProjectDeskItem(ideaItem.id, {
        status: nextStatus
      }, adminSession);

      if (res.success && res.item) {
        setItems(prev => prev.map(i => i.id === ideaItem.id ? res.item : i));
        showNotify('success', `Item marked as ${nextStatus}.`);
      } else {
        showNotify('error', res.error || 'Failed to update item status.');
      }
    } catch (err) {
      showNotify('error', err.message || 'Error updating item.');
    } finally {
      setSaving(false);
    }
  };

  // Delete Item
  const handleDeleteItem = async (itemId, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    setSaving(true);
    try {
      const res = await deleteProjectDeskItem(itemId, adminSession);
      if (res.success) {
        setItems(prev => prev.filter(i => i.id !== itemId));
        showNotify('success', `Deleted "${title}".`);
      } else {
        showNotify('error', res.error || 'Failed to delete item.');
      }
    } catch (err) {
      showNotify('error', err.message || 'Error deleting item.');
    } finally {
      setSaving(false);
    }
  };

  // Create Task in Development Desk
  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    setSaving(true);
    try {
      const res = await createProjectDeskItem({
        title: newTaskTitle.trim(),
        content: newTaskContent.trim(),
        item_type: 'plan',
        category: 'general',
        pillar: newTaskPillar,
        status: targetColumnForNewTask,
        priority: newTaskPriority
      }, adminSession);

      if (res.success && res.item) {
        setItems(prev => [res.item, ...prev]);
        setNewTaskTitle('');
        setNewTaskContent('');
        setIsAddTaskOpen(false);
        showNotify('success', `Created task in ${targetColumnForNewTask.toUpperCase()}.`);
      } else {
        showNotify('error', res.error || 'Failed to create task.');
      }
    } catch (err) {
      showNotify('error', err.message || 'Error creating task.');
    } finally {
      setSaving(false);
    }
  };

  // Move Task Between Columns (Now, Next, Later)
  const handleMoveTaskColumn = async (taskItem, nextColumn) => {
    setSaving(true);
    try {
      const res = await updateProjectDeskItem(taskItem.id, {
        status: nextColumn
      }, adminSession);

      if (res.success && res.item) {
        setItems(prev => prev.map(i => i.id === taskItem.id ? res.item : i));
        showNotify('success', `Moved to ${nextColumn.toUpperCase()}.`);
      } else {
        showNotify('error', res.error || 'Failed to move task.');
      }
    } catch (err) {
      showNotify('error', err.message || 'Error moving task.');
    } finally {
      setSaving(false);
    }
  };

  // Complete Task with Completion Note
  const handleConfirmCompleteTask = async () => {
    if (!completingTaskId) return;

    setSaving(true);
    try {
      const existing = items.find(i => i.id === completingTaskId);
      const res = await updateProjectDeskItem(completingTaskId, {
        status: 'completed',
        metadata: {
          ...(existing?.metadata || {}),
          completionNote: completionNoteText.trim(),
          completedDate: new Date().toISOString()
        }
      }, adminSession);

      if (res.success && res.item) {
        setItems(prev => prev.map(i => i.id === completingTaskId ? res.item : i));
        setCompletingTaskId(null);
        setCompletionNoteText('');
        showNotify('success', 'Task marked as completed.');
      } else {
        showNotify('error', res.error || 'Failed to complete task.');
      }
    } catch (err) {
      showNotify('error', err.message || 'Error completing task.');
    } finally {
      setSaving(false);
    }
  };

  // Save Item Edit
  const handleSaveItemEdit = async () => {
    if (!editingItem || !editingItem.title.trim()) return;

    setSaving(true);
    try {
      const res = await updateProjectDeskItem(editingItem.id, {
        title: editingItem.title.trim(),
        content: editingItem.content ? editingItem.content.trim() : '',
        pillar: editingItem.pillar,
        category: editingItem.category,
        priority: editingItem.priority,
        status: editingItem.status,
        decision_ref: editingItem.decision_ref
      }, adminSession);

      if (res.success && res.item) {
        setItems(prev => prev.map(i => i.id === editingItem.id ? res.item : i));
        setEditingItem(null);
        showNotify('success', 'Changes saved successfully.');
      } else {
        showNotify('error', res.error || 'Failed to save item changes.');
      }
    } catch (err) {
      showNotify('error', err.message || 'Error updating item.');
    } finally {
      setSaving(false);
    }
  };

  // Download Sanitized Snapshot
  const handleExportSnapshot = () => {
    const snapshotData = generateSanitizedProjectSnapshot({
      items,
      meta: { continue_where_left_off: meta },
      version: '2.0.0'
    });
    triggerSnapshotDownload(snapshotData);
    showNotify('success', 'Sanitized project snapshot downloaded.');
  };

  // Resolve idea classification from metadata, category, or tags
  const getIdeaClassification = (item) => {
    return (
      item?.metadata?.classification ||
      (item?.category === 'teaching_note' ? 'teaching_note' : null) ||
      (['content_idea', 'improvement', 'tech_task'].includes(item?.category) ? item?.category : null) ||
      (Array.isArray(item?.tags) && item.tags.find(t => ['teaching_note', 'content_idea', 'improvement', 'tech_task'].includes(t))) ||
      'content_idea'
    );
  };

  // Filtered Ideas
  const filteredIdeas = useMemo(() => {
    return items.filter(item => {
      if (item.item_type !== 'idea') return false;
      const classification = getIdeaClassification(item);
      if (ideaCategoryFilter !== 'all' && classification !== ideaCategoryFilter && item.category !== ideaCategoryFilter) {
        return false;
      }
      if (ideaPillarFilter !== 'all' && item.pillar !== ideaPillarFilter) {
        return false;
      }
      if (ideaSearch.trim()) {
        const q = ideaSearch.toLowerCase().trim();
        return (
          (item.title && item.title.toLowerCase().includes(q)) ||
          (item.content && item.content.toLowerCase().includes(q)) ||
          (Array.isArray(item.tags) && item.tags.some(t => t.toLowerCase().includes(q)))
        );
      }
      return true;
    });
  }, [items, ideaCategoryFilter, ideaPillarFilter, ideaSearch]);

  // Development Tasks by Column
  const nowTasks = useMemo(() => items.filter(i => i.item_type === 'plan' && i.status === 'now'), [items]);
  const nextTasks = useMemo(() => items.filter(i => i.item_type === 'plan' && i.status === 'next'), [items]);
  const laterTasks = useMemo(() => items.filter(i => i.item_type === 'plan' && i.status === 'later'), [items]);
  const completedTasks = useMemo(() => items.filter(i => i.item_type === 'plan' && i.status === 'completed'), [items]);

  // Project Memory Items (Decisions & Requirements)
  const memoryItems = useMemo(() => {
    return items.filter(item => {
      if (item.item_type !== 'decision' && item.item_type !== 'requirement') return false;
      if (memoryFilter === 'active' && item.status !== 'active') return false;
      if (memoryFilter === 'superseded' && item.status !== 'superseded') return false;
      if (memorySearch.trim()) {
        const q = memorySearch.toLowerCase().trim();
        return (
          item.title.toLowerCase().includes(q) ||
          item.content.toLowerCase().includes(q) ||
          (item.decision_ref && item.decision_ref.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [items, memoryFilter, memorySearch]);

  // Pillar badge resolver
  const renderPillarBadge = (pillar) => {
    switch (pillar) {
      case 'workbench':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#E0EBDF] text-[#285C49] text-[10px] font-bold">
            <Layers className="w-3 h-3" />
            <span>Workbench</span>
          </span>
        );
      case 'atlas':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#E6EEF5] text-[#345B82] text-[10px] font-bold">
            <Compass className="w-3 h-3" />
            <span>Atlas</span>
          </span>
        );
      case 'journal':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F4ECF5] text-[#734A7B] text-[10px] font-bold">
            <Radio className="w-3 h-3" />
            <span>Journal</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F0F1EB] text-[#5F6C64] text-[10px] font-bold">
            <Sparkles className="w-3 h-3" />
            <span>General</span>
          </span>
        );
    }
  };

  // Category badge resolver
  const renderCategoryBadge = (categoryOrItem) => {
    const cat = typeof categoryOrItem === 'object' && categoryOrItem !== null
      ? getIdeaClassification(categoryOrItem)
      : (categoryOrItem || 'content_idea');

    switch (cat) {
      case 'teaching_note':
        return (
          <span className="px-2 py-0.5 rounded-md bg-[#FFF7ED] text-[#C2410C] border border-[#FED7AA] text-[10px] font-bold">
            Teaching Note
          </span>
        );
      case 'content_idea':
        return (
          <span className="px-2 py-0.5 rounded-md bg-[#F0FDF4] text-[#15803D] text-[10px] font-bold">
            Content Idea
          </span>
        );
      case 'improvement':
        return (
          <span className="px-2 py-0.5 rounded-md bg-[#EFF6FF] text-[#1D4ED8] text-[10px] font-bold">
            Improvement
          </span>
        );
      case 'tech_task':
        return (
          <span className="px-2 py-0.5 rounded-md bg-[#F5F3FF] text-[#6D28D9] text-[10px] font-bold">
            Tech Task
          </span>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center space-y-3">
        <RefreshCw className="w-6 h-6 animate-spin text-[#285C49] mx-auto" />
        <p className="text-xs text-[#5F6C64] font-medium">Loading private Project Desk records...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Notification Toast */}
      {notification.message && (
        <div className={`p-4 rounded-2xl border text-xs flex items-start gap-3 transition-all ${
          notification.type === 'error'
            ? 'bg-[#FDF2F2] border-[#F5C2C2] text-[#9B2C2C]'
            : notification.type === 'warning'
            ? 'bg-[#FFFBEB] border-[#FDE68A] text-[#92400E]'
            : 'bg-[#F2F7F4] border-[#D5E3DB] text-[#285C49]'
        }`}>
          {notification.type === 'error' ? (
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          ) : notification.type === 'warning' ? (
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
          ) : (
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
          )}
          <div className="flex-1 font-bold">{notification.message}</div>
        </div>
      )}

      {/* Storage Mode Banner */}
      {storageStatus.unmigrated && (
        <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] shadow-xs space-y-1.5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 font-bold text-xs">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Database Migration Pending (Local Demonstration Mode)</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-[10px] font-mono text-amber-800">
              Table public.project_desk_items Pending
            </span>
          </div>
          <p className="text-[11px] text-[#78350F] leading-relaxed">
            The private database table is not yet created in Supabase. You are previewing local non-sensitive demonstration fixtures. Any items added, edited, or deleted in this session will operate in temporary memory and will <strong>not</strong> persist to cloud storage until migration <code className="px-1.5 py-0.5 rounded bg-amber-100/90 font-mono text-[10px]">20261028000001_project_desk_foundation.sql</code> is executed in your Supabase SQL Editor.
          </p>
        </div>
      )}

      {/* AAL1 MFA Warning Banner */}
      {storageStatus.isLiveDb && adminSession?.isOwner && adminSession?.assuranceLevel === 'aal1' && (
        <div className="p-4 rounded-2xl bg-[#FFF7ED] border border-[#FED7AA] text-[#9A3412] shadow-xs space-y-2 animate-in fade-in">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 font-bold text-xs">
              <AlertCircle className="w-4 h-4 text-orange-600 shrink-0" />
              <span>Multi-Factor Authentication (AAL2) Required for Writing</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-orange-100 text-[10px] font-mono text-orange-800">
              Session Assurance: AAL1 (Read-Only)
            </span>
          </div>
          <p className="text-[11px] text-[#7C2D12] leading-relaxed">
            You are signed in with primary password authentication (AAL1). Supabase Row Level Security requires <strong>Authenticator TOTP verification (AAL2)</strong> to create, edit, or delete Project Desk items. Please complete your 6-digit Authenticator verification to enable saving.
          </p>
          <div className="pt-1">
            <button
              type="button"
              onClick={() => { window.location.hash = '#admin-login'; }}
              className="px-3.5 py-1.5 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Verify Authenticator Code (AAL2)
            </button>
          </div>
        </div>
      )}

      {storageStatus.isLiveDb && !storageStatus.unmigrated && adminSession?.assuranceLevel !== 'aal1' && (
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F4F8F5] border border-[#D5E3DB] text-xs">
          <div className="flex items-center gap-2 text-[#285C49]">
            <ShieldCheck className="w-4 h-4 text-[#285C49]" />
            <span className="font-bold text-[11px]">Cloud Persistence Active</span>
            <span className="text-[10px] text-[#5F6C64]">Protected by PostgreSQL Row Level Security and AAL2 MFA</span>
          </div>
          {items.length === 0 && (
            <button
              type="button"
              onClick={handleSeedBaseline}
              disabled={seeding}
              className="px-3 py-1.5 rounded-xl bg-[#285C49] text-white text-[11px] font-bold hover:bg-[#20493A] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              {seeding ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
              <span>Initialize Baseline Decisions & Tasks</span>
            </button>
          )}
        </div>
      )}

      {/* CONTINUE WHERE I LEFT OFF STATUS STRIP */}
      <div className="p-5 rounded-3xl bg-white border border-[#DDE2DA] shadow-xs space-y-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#285C49] animate-pulse" />
            <span className="text-[11px] font-technical uppercase tracking-wider font-bold text-[#285C49]">
              Continue Where I Left Off
            </span>
            {meta?.lastEdited && (
              <span className="text-[10px] text-[#85928A] font-mono">
                Last edited {new Date(meta.lastEdited).toLocaleDateString()}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isEditingContinueNote ? (
              <button
                type="button"
                onClick={handleSaveContinueNote}
                disabled={saving}
                className="px-3 py-1.5 rounded-xl bg-[#285C49] text-white text-xs font-bold hover:bg-[#20493A] transition-colors cursor-pointer flex items-center gap-1"
              >
                {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                <span>Save Note</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditingContinueNote(true)}
                className="px-3 py-1.5 rounded-xl bg-[#FBF8F2] hover:bg-[#F0ECE1] text-[#25352D] text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Status Note</span>
              </button>
            )}
          </div>
        </div>

        {isEditingContinueNote ? (
          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-[11px] font-bold text-[#5F6C64] mb-1">
                Current Working Note
              </label>
              <textarea
                value={continueNoteDraft}
                onChange={(e) => setContinueNoteDraft(e.target.value)}
                rows={2}
                className="w-full p-2.5 rounded-xl border border-[#DDE2DA] text-xs focus:outline-hidden focus:ring-2 focus:ring-[#285C49] bg-[#FBF8F2]"
                placeholder="What were you actively doing when you left?"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[#5F6C64] mb-1">
                  Active Milestone
                </label>
                <input
                  type="text"
                  value={continueMilestoneDraft}
                  onChange={(e) => setContinueMilestoneDraft(e.target.value)}
                  className="w-full p-2 rounded-xl border border-[#DDE2DA] text-xs focus:outline-hidden focus:ring-2 focus:ring-[#285C49] bg-[#FBF8F2]"
                  placeholder="e.g. Project Desk Phase 2: Minimal Admin Interface"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#5F6C64] mb-1">
                  Immediate Next Action
                </label>
                <input
                  type="text"
                  value={continueNextActionDraft}
                  onChange={(e) => setContinueNextActionDraft(e.target.value)}
                  className="w-full p-2 rounded-xl border border-[#DDE2DA] text-xs focus:outline-hidden focus:ring-2 focus:ring-[#285C49] bg-[#FBF8F2]"
                  placeholder="e.g. Review database migration in Supabase SQL editor"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-xs text-[#25352D] font-medium leading-relaxed">
              {meta?.note || 'No active continuation note recorded yet.'}
            </p>

            {(meta?.activeMilestone || meta?.nextAction) && (
              <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-[#5F6C64]">
                {meta?.activeMilestone && (
                  <span className="inline-flex items-center gap-1 font-technical">
                    <span className="font-bold text-[#285C49]">Milestone:</span> {meta.activeMilestone}
                  </span>
                )}
                {meta?.nextAction && (
                  <span className="inline-flex items-center gap-1 font-technical">
                    <span className="font-bold text-[#956A43]">Next:</span> {meta.nextAction}
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* PROJECT DESK SUB-NAVIGATION TABS */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DDE2DA] pb-3">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#F0F1EB]">
          <button
            type="button"
            onClick={() => setActiveTab('desk')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'desk'
                ? 'bg-white text-[#285C49] shadow-xs'
                : 'text-[#5F6C64] hover:text-[#25352D]'
            }`}
          >
            <ListTodo className="w-4 h-4" />
            <span>Development Desk</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#E0EBDF] text-[10px] text-[#285C49]">
              {nowTasks.length + nextTasks.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('inbox')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'inbox'
                ? 'bg-white text-[#285C49] shadow-xs'
                : 'text-[#5F6C64] hover:text-[#25352D]'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Idea Inbox</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#E0EBDF] text-[10px] text-[#285C49]">
              {filteredIdeas.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('memory')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'memory'
                ? 'bg-white text-[#285C49] shadow-xs'
                : 'text-[#5F6C64] hover:text-[#25352D]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Project Memory</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#E0EBDF] text-[10px] text-[#285C49]">
              {memoryItems.length}
            </span>
          </button>
        </div>

        {/* Snapshot Download Button */}
        <button
          type="button"
          onClick={handleExportSnapshot}
          className="px-3.5 py-2 rounded-xl bg-white border border-[#DDE2DA] hover:border-[#285C49] text-[#285C49] text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
          title="Export sanitized snapshot without private credentials"
        >
          <Download className="w-4 h-4" />
          <span>Export Clean Snapshot</span>
        </button>
      </div>

      {/* =========================================================================
          AREA A: IDEA INBOX
          ========================================================================= */}
      {activeTab === 'inbox' && (
        <div className="space-y-4">
          
          {/* Top Controls: Search, Filters, and New Idea Trigger */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#85928A]" />
                <input
                  type="text"
                  value={ideaSearch}
                  onChange={(e) => setIdeaSearch(e.target.value)}
                  placeholder="Search ideas and teaching notes..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#DDE2DA] bg-white text-xs focus:outline-hidden focus:ring-2 focus:ring-[#285C49]"
                />
              </div>

              <select
                value={ideaCategoryFilter}
                onChange={(e) => setIdeaCategoryFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-[#DDE2DA] bg-white text-xs text-[#25352D] focus:outline-hidden cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="teaching_note">Teaching Notes</option>
                <option value="content_idea">Content Ideas</option>
                <option value="improvement">Improvements</option>
                <option value="tech_task">Tech Tasks</option>
              </select>

              <select
                value={ideaPillarFilter}
                onChange={(e) => setIdeaPillarFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-[#DDE2DA] bg-white text-xs text-[#25352D] focus:outline-hidden cursor-pointer"
              >
                <option value="all">All Pillars</option>
                <option value="workbench">Workbench</option>
                <option value="atlas">Atlas</option>
                <option value="journal">Journal</option>
                <option value="general">General</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => setIsAddIdeaOpen(!isAddIdeaOpen)}
              className="px-4 py-2 rounded-xl bg-[#285C49] hover:bg-[#20493A] text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>{isAddIdeaOpen ? 'Cancel' : 'Quick Add Idea'}</span>
            </button>
          </div>

          {/* Quick Add Idea Form */}
          {isAddIdeaOpen && (
            <form onSubmit={handleCreateIdea} className="p-5 rounded-3xl bg-white border border-[#DDE2DA] shadow-sm space-y-4 animate-in fade-in duration-200">
              <h3 className="font-editorial text-sm font-bold text-[#25352D]">
                Capture New Idea or Teaching Note
              </h3>

              {ideaFormError && (
                <div className="p-3 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span>{ideaFormError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-[#5F6C64] mb-1">
                    Title / Topic *
                  </label>
                  <input
                    type="text"
                    required
                    value={newIdeaTitle}
                    onChange={(e) => setNewIdeaTitle(e.target.value)}
                    placeholder="e.g. Radix complement formula student retention note"
                    className="w-full p-2.5 rounded-xl border border-[#DDE2DA] bg-[#FBF8F2] text-xs focus:outline-hidden focus:ring-2 focus:ring-[#285C49]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#5F6C64] mb-1">
                    Classification
                  </label>
                  <select
                    value={newIdeaCategory}
                    onChange={(e) => setNewIdeaCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#DDE2DA] bg-[#FBF8F2] text-xs focus:outline-hidden cursor-pointer"
                  >
                    <option value="teaching_note">Teaching Note (Classroom Insight)</option>
                    <option value="content_idea">Content Idea (New Lesson)</option>
                    <option value="improvement">Improvement (Refinement)</option>
                    <option value="tech_task">Technical Task (Architecture)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-[#5F6C64] mb-1">
                    Notes / Classroom Derivations (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={newIdeaContent}
                    onChange={(e) => setNewIdeaContent(e.target.value)}
                    placeholder="Short observations, board formulas, or requirements..."
                    className="w-full p-2.5 rounded-xl border border-[#DDE2DA] bg-[#FBF8F2] text-xs focus:outline-hidden focus:ring-2 focus:ring-[#285C49]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#5F6C64] mb-1">
                    Pillar Alignment
                  </label>
                  <select
                    value={newIdeaPillar}
                    onChange={(e) => setNewIdeaPillar(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#DDE2DA] bg-[#FBF8F2] text-xs focus:outline-hidden cursor-pointer"
                  >
                    <option value="workbench">The Workbench (Academics & Solvers)</option>
                    <option value="atlas">The Atlas (Roadmaps & Placement)</option>
                    <option value="journal">The Journal (Dispatches & Essays)</option>
                    <option value="general">General Platform Architecture</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAddIdeaOpen(false)}
                  className="px-3.5 py-1.5 rounded-xl hover:bg-[#F0F1EB] text-xs font-bold text-[#5F6C64] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || !newIdeaTitle.trim() || (storageStatus.isLiveDb && adminSession?.assuranceLevel === 'aal1')}
                  className="px-4 py-2 rounded-xl bg-[#285C49] hover:bg-[#20493A] text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving to Supabase...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Inbox</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Ideas List Grid */}
          {filteredIdeas.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white border border-[#DDE2DA] text-[#5F6C64] space-y-2">
              <Inbox className="w-8 h-8 mx-auto text-[#85928A]" />
              <p className="text-xs font-bold">No ideas found matching current filters.</p>
              <p className="text-[11px] text-[#85928A]">Use Quick Add Idea to capture your first thought or teaching note.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredIdeas.map((idea) => {
                const isParked = idea.status === 'parked';
                return (
                  <div 
                    key={idea.id} 
                    className={`p-4 rounded-2xl border transition-all space-y-2.5 ${
                      isParked 
                        ? 'bg-[#F9FAF8] border-[#E5E9E1] opacity-75' 
                        : 'bg-white border-[#DDE2DA] shadow-2xs hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {renderPillarBadge(idea.pillar)}
                        {renderCategoryBadge(idea)}
                        {isParked && (
                          <span className="px-2 py-0.5 rounded-md bg-[#F3F4F6] text-[#6B7280] text-[10px] font-bold">
                            Parked
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => setEditingItem(idea)}
                          className="p-1.5 rounded-lg hover:bg-[#F0F1EB] text-[#5F6C64] hover:text-[#285C49] transition-colors cursor-pointer"
                          title="Edit idea"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteItem(idea.id, idea.title)}
                          className="p-1.5 rounded-lg hover:bg-[#FDF2F2] text-[#85928A] hover:text-[#9B2C2C] transition-colors cursor-pointer"
                          title="Delete idea"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-[#25352D] leading-snug">
                        {idea.title}
                      </h4>
                      {idea.content && (
                        <p className="text-[11px] text-[#5F6C64] leading-relaxed mt-1 line-clamp-3">
                          {idea.content}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#F0F1EB]">
                      <button
                        type="button"
                        onClick={() => handleToggleParkIdea(idea)}
                        className="text-[10px] font-bold text-[#85928A] hover:text-[#25352D] transition-colors cursor-pointer"
                      >
                        {isParked ? 'Unpark Item' : 'Park for Later'}
                      </button>

                      {/* Move to Plan Action Buttons */}
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-[#85928A] font-technical mr-1">Move to:</span>
                        <button
                          type="button"
                          onClick={() => handleMoveIdeaToPlan(idea, 'now')}
                          className="px-2 py-1 rounded-lg bg-[#E0EBDF] hover:bg-[#D3E3D1] text-[#285C49] text-[10px] font-bold cursor-pointer transition-colors"
                          title="Move to NOW task"
                        >
                          Now
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveIdeaToPlan(idea, 'next')}
                          className="px-2 py-1 rounded-lg bg-[#F0F1EB] hover:bg-[#E4E6DE] text-[#25352D] text-[10px] font-bold cursor-pointer transition-colors"
                          title="Move to NEXT priority"
                        >
                          Next
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveIdeaToPlan(idea, 'later')}
                          className="px-2 py-1 rounded-lg bg-[#F0F1EB] hover:bg-[#E4E6DE] text-[#5F6C64] text-[10px] font-bold cursor-pointer transition-colors"
                          title="Move to LATER backlog"
                        >
                          Later
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

      {/* =========================================================================
          AREA B: DEVELOPMENT DESK (NOW | NEXT | LATER)
          ========================================================================= */}
      {activeTab === 'desk' && (
        <div className="space-y-6">

          {/* Quick Notice: Single Active Task Policy */}
          <div className="flex items-center justify-between gap-3 text-xs text-[#5F6C64] px-1">
            <span className="font-technical text-[11px]">
              Active policy: Exactly one primary focus task in <strong>NOW</strong> is recommended.
            </span>

            <button
              type="button"
              onClick={() => {
                setTargetColumnForNewTask('now');
                setIsAddTaskOpen(true);
              }}
              className="px-3 py-1.5 rounded-xl bg-[#285C49] hover:bg-[#20493A] text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Plan Task</span>
            </button>
          </div>

          {/* Quick Add Task Modal / Form */}
          {isAddTaskOpen && (
            <form onSubmit={handleCreateTask} className="p-5 rounded-3xl bg-white border border-[#DDE2DA] shadow-sm space-y-4 animate-in fade-in duration-200">
              <h3 className="font-editorial text-sm font-bold text-[#25352D]">
                Add Development Plan Task
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-[#5F6C64] mb-1">
                    Task Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="e.g. DLD Unit 2 Section 2.6 Don't Care condition derivations"
                    className="w-full p-2.5 rounded-xl border border-[#DDE2DA] bg-[#FBF8F2] text-xs focus:outline-hidden focus:ring-2 focus:ring-[#285C49]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#5F6C64] mb-1">
                    Target Column
                  </label>
                  <select
                    value={targetColumnForNewTask}
                    onChange={(e) => setTargetColumnForNewTask(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#DDE2DA] bg-[#FBF8F2] text-xs focus:outline-hidden cursor-pointer"
                  >
                    <option value="now">NOW (Immediate Active Task)</option>
                    <option value="next">NEXT (Queued Priority)</option>
                    <option value="later">LATER (Future Roadmap)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-[#5F6C64] mb-1">
                    Details / Deliverables
                  </label>
                  <textarea
                    rows={2}
                    value={newTaskContent}
                    onChange={(e) => setNewTaskContent(e.target.value)}
                    placeholder="Clear bullet points or deliverables..."
                    className="w-full p-2.5 rounded-xl border border-[#DDE2DA] bg-[#FBF8F2] text-xs focus:outline-hidden focus:ring-2 focus:ring-[#285C49]"
                  />
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="block text-[11px] font-bold text-[#5F6C64] mb-1">
                      Pillar
                    </label>
                    <select
                      value={newTaskPillar}
                      onChange={(e) => setNewTaskPillar(e.target.value)}
                      className="w-full p-2 rounded-xl border border-[#DDE2DA] bg-[#FBF8F2] text-xs focus:outline-hidden cursor-pointer"
                    >
                      <option value="workbench">The Workbench</option>
                      <option value="atlas">The Atlas</option>
                      <option value="journal">The Journal</option>
                      <option value="general">General</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#5F6C64] mb-1">
                      Priority
                    </label>
                    <select
                      value={newTaskPriority}
                      onChange={(e) => setNewTaskPriority(e.target.value)}
                      className="w-full p-2 rounded-xl border border-[#DDE2DA] bg-[#FBF8F2] text-xs focus:outline-hidden cursor-pointer"
                    >
                      <option value="urgent">Urgent</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAddTaskOpen(false)}
                  className="px-3.5 py-1.5 rounded-xl hover:bg-[#F0F1EB] text-xs font-bold text-[#5F6C64]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || !newTaskTitle.trim()}
                  className="px-4 py-2 rounded-xl bg-[#285C49] hover:bg-[#20493A] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  {saving ? 'Creating...' : 'Create Task'}
                </button>
              </div>
            </form>
          )}

          {/* THREE-COLUMN DESK (NOW | NEXT | LATER) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* COLUMN 1: NOW */}
            <div className="p-4 rounded-3xl bg-[#F4F7F4] border-2 border-[#D5E3DB] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#D5E3DB]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#285C49]" />
                  <h3 className="font-editorial text-sm font-bold text-[#285C49]">
                    NOW
                  </h3>
                  <span className="px-1.5 py-0.2 rounded-full bg-[#E0EBDF] text-[10px] font-bold text-[#285C49]">
                    {nowTasks.length}
                  </span>
                </div>
                <span className="text-[10px] font-technical uppercase tracking-wider text-[#285C49] font-bold">
                  Active Sprint
                </span>
              </div>

              {nowTasks.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#85928A] border-2 border-dashed border-[#D5E3DB] rounded-2xl">
                  No active task in NOW. Move an item from NEXT or Inbox.
                </div>
              ) : (
                <div className="space-y-3">
                  {nowTasks.map(task => (
                    <div 
                      key={task.id}
                      className="p-3.5 rounded-2xl bg-white border border-[#D5E3DB] shadow-xs space-y-2 relative"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          {renderPillarBadge(task.pillar)}
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${
                            task.priority === 'urgent' ? 'bg-[#FDF2F2] text-[#9B2C2C]' : 'bg-[#FFF9F2] text-[#956A43]'
                          }`}>
                            {task.priority}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setEditingItem(task)}
                            className="p-1 rounded-md hover:bg-[#F0F1EB] text-[#85928A] hover:text-[#285C49]"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <h4 className="text-xs font-bold text-[#25352D] leading-snug">
                        {task.title}
                      </h4>

                      {task.content && (
                        <p className="text-[11px] text-[#5F6C64] leading-relaxed line-clamp-3">
                          {task.content}
                        </p>
                      )}

                      <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#F0F1EB]">
                        <button
                          type="button"
                          onClick={() => setCompletingTaskId(task.id)}
                          className="px-2.5 py-1 rounded-lg bg-[#E0EBDF] hover:bg-[#D3E3D1] text-[#285C49] text-[10px] font-bold cursor-pointer transition-colors flex items-center gap-1"
                        >
                          <Check className="w-3 h-3" />
                          <span>Complete</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleMoveTaskColumn(task, 'next')}
                          className="text-[10px] font-bold text-[#5F6C64] hover:text-[#25352D] flex items-center gap-1 cursor-pointer"
                        >
                          <span>Move Next</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* COLUMN 2: NEXT */}
            <div className="p-4 rounded-3xl bg-white border border-[#DDE2DA] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#DDE2DA]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#956A43]" />
                  <h3 className="font-editorial text-sm font-bold text-[#293B32]">
                    NEXT
                  </h3>
                  <span className="px-1.5 py-0.2 rounded-full bg-[#F0F1EB] text-[10px] font-bold text-[#5F6C64]">
                    {nextTasks.length}
                  </span>
                </div>
                <span className="text-[10px] font-technical uppercase tracking-wider text-[#85928A]">
                  Queued Priorities
                </span>
              </div>

              {nextTasks.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#85928A] border-2 border-dashed border-[#E8ECE5] rounded-2xl">
                  No tasks queued in NEXT.
                </div>
              ) : (
                <div className="space-y-3">
                  {nextTasks.map(task => (
                    <div 
                      key={task.id}
                      className="p-3.5 rounded-2xl bg-[#FBF8F2] border border-[#E8ECE5] space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          {renderPillarBadge(task.pillar)}
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setEditingItem(task)}
                            className="p-1 rounded-md hover:bg-[#E8ECE5] text-[#85928A] hover:text-[#285C49]"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <h4 className="text-xs font-bold text-[#25352D] leading-snug">
                        {task.title}
                      </h4>

                      {task.content && (
                        <p className="text-[11px] text-[#5F6C64] leading-relaxed line-clamp-3">
                          {task.content}
                        </p>
                      )}

                      <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#E8ECE5]">
                        <button
                          type="button"
                          onClick={() => handleMoveTaskColumn(task, 'now')}
                          className="text-[10px] font-bold text-[#285C49] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <ArrowLeft className="w-3 h-3" />
                          <span>Promote Now</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleMoveTaskColumn(task, 'later')}
                          className="text-[10px] font-bold text-[#5F6C64] hover:text-[#25352D] flex items-center gap-1 cursor-pointer"
                        >
                          <span>Move Later</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* COLUMN 3: LATER */}
            <div className="p-4 rounded-3xl bg-white border border-[#DDE2DA] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#DDE2DA]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#85928A]" />
                  <h3 className="font-editorial text-sm font-bold text-[#293B32]">
                    LATER
                  </h3>
                  <span className="px-1.5 py-0.2 rounded-full bg-[#F0F1EB] text-[10px] font-bold text-[#5F6C64]">
                    {laterTasks.length}
                  </span>
                </div>
                <span className="text-[10px] font-technical uppercase tracking-wider text-[#85928A]">
                  Future Backlog
                </span>
              </div>

              {laterTasks.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#85928A] border-2 border-dashed border-[#E8ECE5] rounded-2xl">
                  No tasks in LATER backlog.
                </div>
              ) : (
                <div className="space-y-3">
                  {laterTasks.map(task => (
                    <div 
                      key={task.id}
                      className="p-3.5 rounded-2xl bg-[#FBF8F2] border border-[#E8ECE5] space-y-2 opacity-90"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          {renderPillarBadge(task.pillar)}
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setEditingItem(task)}
                            className="p-1 rounded-md hover:bg-[#E8ECE5] text-[#85928A] hover:text-[#285C49]"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <h4 className="text-xs font-bold text-[#25352D] leading-snug">
                        {task.title}
                      </h4>

                      {task.content && (
                        <p className="text-[11px] text-[#5F6C64] leading-relaxed line-clamp-3">
                          {task.content}
                        </p>
                      )}

                      <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#E8ECE5]">
                        <button
                          type="button"
                          onClick={() => handleMoveTaskColumn(task, 'next')}
                          className="text-[10px] font-bold text-[#285C49] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <ArrowLeft className="w-3 h-3" />
                          <span>Move Next</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteItem(task.id, task.title)}
                          className="text-[10px] font-bold text-[#85928A] hover:text-[#9B2C2C] cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* COMPLETED TASKS ARCHIVE (Collapsible) */}
          <div className="p-4 rounded-3xl bg-white border border-[#DDE2DA] shadow-2xs space-y-3">
            <button
              type="button"
              onClick={() => setShowCompletedTasks(!showCompletedTasks)}
              className="w-full flex items-center justify-between text-left cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#285C49]" />
                <span className="font-editorial text-xs font-bold text-[#25352D]">
                  Completed Deliverables Archive
                </span>
                <span className="px-1.5 py-0.2 rounded-full bg-[#E0EBDF] text-[10px] font-bold text-[#285C49]">
                  {completedTasks.length}
                </span>
              </div>
              {showCompletedTasks ? <ChevronDown className="w-4 h-4 text-[#5F6C64]" /> : <ChevronRight className="w-4 h-4 text-[#5F6C64]" />}
            </button>

            {showCompletedTasks && (
              <div className="space-y-2 pt-2 border-t border-[#F0F1EB]">
                {completedTasks.length === 0 ? (
                  <p className="text-xs text-[#85928A] py-2">No completed tasks recorded yet.</p>
                ) : (
                  completedTasks.map(task => (
                    <div key={task.id} className="p-3 rounded-xl bg-[#FBF8F2] border border-[#E8ECE5] flex items-center justify-between gap-3 text-xs">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-[#25352D] line-through opacity-80">{task.title}</span>
                          {renderPillarBadge(task.pillar)}
                        </div>
                        {task.metadata?.completionNote && (
                          <p className="text-[11px] text-[#285C49] font-medium mt-0.5">
                            Note: {task.metadata.completionNote}
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleMoveTaskColumn(task, 'now')}
                        className="text-[10px] font-bold text-[#5F6C64] hover:text-[#285C49] cursor-pointer flex-shrink-0"
                      >
                        Reopen Task
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

        </div>
      )}

      {/* =========================================================================
          AREA C: PROJECT MEMORY (VISION, REQUIREMENTS, DECISIONS, HISTORY)
          ========================================================================= */}
      {activeTab === 'memory' && (
        <div className="space-y-6">

          {/* Section 1: Vision & Principles Banner */}
          <div className="p-6 rounded-3xl bg-white border border-[#DDE2DA] shadow-xs space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-technical uppercase tracking-wider text-[#285C49] font-bold">
                  Institutional Identity & Philosophy
                </span>
                <h3 className="font-editorial text-lg font-bold text-[#25352D] mt-0.5">
                  ZeroIndex: Beginning from Index Zero
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#E0EBDF] text-[#285C49] text-[10px] font-technical font-bold uppercase tracking-wider">
                Active Vision
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              <div className="p-3.5 rounded-2xl bg-[#FBF8F2] border border-[#E8ECE5] space-y-1">
                <h4 className="text-xs font-bold text-[#25352D]">WHY-FIRST Pedagogy</h4>
                <p className="text-[11px] text-[#5F6C64] leading-relaxed">
                  Every concept follows: WHY &rarr; WHERE &rarr; WHAT &rarr; HOW &rarr; TRY &rarr; CONNECT. Students grasp motivation before mechanics.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FBF8F2] border border-[#E8ECE5] space-y-1">
                <h4 className="text-xs font-bold text-[#25352D]">Three-Pillar Consolidation</h4>
                <p className="text-[11px] text-[#5F6C64] leading-relaxed">
                  The Workbench (Academics), The Atlas (Roadmaps & Placement), and The Journal (Dispatches & Essays) create a focused, sustainable ecosystem.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FBF8F2] border border-[#E8ECE5] space-y-1">
                <h4 className="text-xs font-bold text-[#25352D]">Sunlit Editorial Aesthetic</h4>
                <p className="text-[11px] text-[#5F6C64] leading-relaxed">
                  Warm ivory surfaces (#FBF8F2), serif typography, restrained forest-green accents, and strictly zero em/en-dashes.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Decisions & Requirements Register */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-editorial text-sm font-bold text-[#25352D]">
                  Curated Decision & Requirement Register
                </h3>
                <p className="text-[11px] text-[#5F6C64]">
                  Authoritative institutional record separating active standards from superseded architectures.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#85928A]" />
                  <input
                    type="text"
                    value={memorySearch}
                    onChange={(e) => setMemorySearch(e.target.value)}
                    placeholder="Search decisions (e.g. D-040)..."
                    className="pl-8 pr-3 py-1.5 rounded-xl border border-[#DDE2DA] bg-white text-xs focus:outline-hidden"
                  />
                </div>

                <select
                  value={memoryFilter}
                  onChange={(e) => setMemoryFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-[#DDE2DA] bg-white text-xs text-[#25352D] focus:outline-hidden cursor-pointer"
                >
                  <option value="all">All Records</option>
                  <option value="active">Active Only</option>
                  <option value="superseded">Superseded Only</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {memoryItems.map((item) => {
                const isActive = item.status === 'active';
                return (
                  <div 
                    key={item.id}
                    className={`p-4 rounded-2xl border transition-all space-y-2 ${
                      isActive 
                        ? 'bg-white border-[#DDE2DA] shadow-xs' 
                        : 'bg-[#F9FAF8] border-[#E8ECE5] opacity-80'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        {item.decision_ref && (
                          <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#F0F1EB] text-[#25352D]">
                            {item.decision_ref}
                          </span>
                        )}
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          isActive 
                            ? 'bg-[#E0EBDF] text-[#285C49]' 
                            : 'bg-[#F3F4F6] text-[#6B7280]'
                        }`}>
                          {item.status}
                        </span>
                        {renderPillarBadge(item.pillar)}
                      </div>

                      <button
                        type="button"
                        onClick={() => setEditingItem(item)}
                        className="p-1 rounded-md hover:bg-[#F0F1EB] text-[#85928A] hover:text-[#285C49]"
                        title="Edit decision details"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4 className="text-xs font-bold text-[#25352D]">
                      {item.title}
                    </h4>

                    <p className="text-[11px] text-[#5F6C64] leading-relaxed">
                      {item.content}
                    </p>

                    {item.metadata?.supersededBy && (
                      <p className="text-[10px] text-[#956A43] font-technical bg-[#FFF9F2] px-2 py-1 rounded-lg border border-[#F2DEBF]">
                        Superseded by: {item.metadata.supersededBy}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Academic Presentation Standards & Snapshot Export */}
          <div className="p-6 rounded-3xl bg-[#FBF8F2] border border-[#DDE2DA] space-y-4">
            <h3 className="font-editorial text-sm font-bold text-[#25352D]">
              Permanent Academic Presentation Conventions
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#5F6C64]">
              <div className="p-3 rounded-xl bg-white border border-[#E8ECE5] space-y-1">
                <span className="font-bold text-[#285C49]">1. Introductory Bullets</span>
                <p className="text-[11px]">4 to 6 structured bullet points (WHY, WHERE, WHAT, HOW, WHY CHOSEN, REMEMBER) lead every lesson.</p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#E8ECE5] space-y-1">
                <span className="font-bold text-[#285C49]">2. Mandatory Unicode Symbols</span>
                <p className="text-[11px]">Render real Unicode &#931; (\u03A3) and &#928; (\u03A0) in all canonical minterm and maxterm expressions.</p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#E8ECE5] space-y-1">
                <span className="font-bold text-[#285C49]">3. Faculty-First Natural Integration</span>
                <p className="text-[11px]">Faculty formulas (r^n - N - 1) integrate naturally into existing cards without promotional badges.</p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#E8ECE5] space-y-1">
                <span className="font-bold text-[#285C49]">4. Zero-Dash Standard</span>
                <p className="text-[11px]">Strictly zero em-dashes and zero en-dashes across all code, content, and documentation.</p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E8ECE5] flex items-center justify-between gap-3 flex-wrap">
              <div className="space-y-0.5 max-w-xl">
                <span className="text-[11px] font-bold text-[#25352D] block">
                  Sanitized Project Snapshot Export (Allowlist Protected)
                </span>
                <span className="text-[10px] text-[#85928A] leading-relaxed block">
                  Exports approved decisions, development tasks, and operational notes locally to your device. Purges credentials, user IDs, and auth tokens. Notes are exported as written; never enter passwords or secrets into free-form fields.
                </span>
              </div>
              <button
                type="button"
                onClick={handleExportSnapshot}
                className="px-4 py-2 rounded-xl bg-[#285C49] text-white text-xs font-bold hover:bg-[#20493A] transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Sanitized Snapshot (.json)</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
          MODAL: COMPLETE TASK NOTE PROMPT
          ========================================================================= */}
      {completingTaskId && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-[#DDE2DA] shadow-xl space-y-4 animate-in zoom-in-95 duration-150">
            <h3 className="font-editorial text-base font-bold text-[#25352D]">
              Complete Development Task
            </h3>
            <p className="text-xs text-[#5F6C64]">
              Optionally record a brief completion note or verification summary for institutional history.
            </p>

            <textarea
              rows={3}
              value={completionNoteText}
              onChange={(e) => setCompletionNoteText(e.target.value)}
              placeholder="e.g. Verified with 48 automated test assertions and built production bundle."
              className="w-full p-2.5 rounded-xl border border-[#DDE2DA] bg-[#FBF8F2] text-xs focus:outline-hidden focus:ring-2 focus:ring-[#285C49]"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setCompletingTaskId(null);
                  setCompletionNoteText('');
                }}
                className="px-4 py-2 rounded-xl hover:bg-[#F0F1EB] text-xs font-bold text-[#5F6C64]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmCompleteTask}
                disabled={saving}
                className="px-4 py-2 rounded-xl bg-[#285C49] hover:bg-[#20493A] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                {saving ? 'Completing...' : 'Mark Completed'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: EDIT DESK ITEM
          ========================================================================= */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-[#DDE2DA] shadow-xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-[#DDE2DA]">
              <h3 className="font-editorial text-base font-bold text-[#25352D]">
                Edit Item Details
              </h3>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="p-1 rounded-lg hover:bg-[#F0F1EB] text-[#5F6C64]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-[#5F6C64] mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#DDE2DA] bg-[#FBF8F2] text-xs focus:outline-hidden focus:ring-2 focus:ring-[#285C49]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#5F6C64] mb-1">
                  Content / Notes
                </label>
                <textarea
                  rows={3}
                  value={editingItem.content || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#DDE2DA] bg-[#FBF8F2] text-xs focus:outline-hidden focus:ring-2 focus:ring-[#285C49]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#5F6C64] mb-1">
                    Pillar
                  </label>
                  <select
                    value={editingItem.pillar || 'general'}
                    onChange={(e) => setEditingItem({ ...editingItem, pillar: e.target.value })}
                    className="w-full p-2 rounded-xl border border-[#DDE2DA] bg-[#FBF8F2] text-xs focus:outline-hidden"
                  >
                    <option value="workbench">The Workbench</option>
                    <option value="atlas">The Atlas</option>
                    <option value="journal">The Journal</option>
                    <option value="general">General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#5F6C64] mb-1">
                    Priority
                  </label>
                  <select
                    value={editingItem.priority || 'medium'}
                    onChange={(e) => setEditingItem({ ...editingItem, priority: e.target.value })}
                    className="w-full p-2 rounded-xl border border-[#DDE2DA] bg-[#FBF8F2] text-xs focus:outline-hidden"
                  >
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              {editingItem.item_type === 'decision' && (
                <div>
                  <label className="block text-[11px] font-bold text-[#5F6C64] mb-1">
                    Decision Status
                  </label>
                  <select
                    value={editingItem.status}
                    onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value })}
                    className="w-full p-2 rounded-xl border border-[#DDE2DA] bg-[#FBF8F2] text-xs focus:outline-hidden"
                  >
                    <option value="active">Active Decision</option>
                    <option value="superseded">Superseded Decision</option>
                  </select>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#DDE2DA]">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 rounded-xl hover:bg-[#F0F1EB] text-xs font-bold text-[#5F6C64]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveItemEdit}
                disabled={saving}
                className="px-4 py-2 rounded-xl bg-[#285C49] hover:bg-[#20493A] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
