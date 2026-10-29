/**
 * Central Content Registry Service and Visibility Management
 * 
 * Provides:
 * - Real-time and persisted content visibility controls
 * - Strict publication rule enforcement (drafts and in-review items can NEVER be made public)
 * - Hierarchical ancestry checks
 * - Integration with Supabase PostgreSQL content_registry table
 * - Secure admin-only unpublished draft retrieval for preview
 * - Actionable audit logging
 * 
 * Zero-Dash Standard: Zero em-dashes and zero en-dashes across all code and comments.
 */

import { supabase, isSupabaseConfigured } from './supabaseClient.js';
import { centralContentRegistry, getRegistryItemById } from '../data/centralContentRegistry.js';

const LOCAL_VISIBILITY_KEY = 'zeroindex_content_visibility_overrides';
const LOCAL_AUDIT_LOG_KEY = 'zeroindex_simulated_audit_logs';

/**
 * Load all visibility overrides from local storage (used in local simulation or offline fallback).
 * @returns {Record<string, boolean>}
 */
function getLocalVisibilityOverrides() {
  try {
    const raw = localStorage.getItem(LOCAL_VISIBILITY_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/**
 * Save visibility override to local storage.
 * @param {string} itemId
 * @param {boolean} isPublic
 */
function setLocalVisibilityOverride(itemId, isPublic) {
  try {
    const current = getLocalVisibilityOverrides();
    current[itemId] = isPublic;
    localStorage.setItem(LOCAL_VISIBILITY_KEY, JSON.stringify(current));
  } catch {
    // Ignore storage errors
  }
}

/**
 * Append an entry to the simulated audit log.
 * @param {Object} logEntry
 */
function recordLocalAuditLog(logEntry) {
  try {
    const raw = localStorage.getItem(LOCAL_AUDIT_LOG_KEY);
    const logs = raw ? JSON.parse(raw) : [];
    logs.unshift({
      id: 'audit-' + Date.now(),
      timestamp: new Date().toISOString(),
      ...logEntry
    });
    // Keep last 50 entries
    localStorage.setItem(LOCAL_AUDIT_LOG_KEY, JSON.stringify(logs.slice(0, 50)));
  } catch {
    // Ignore storage errors
  }
}

/**
 * Fetch the complete content registry.
 * Merges authoritative configuration with live Supabase database records or local overrides.
 * 
 * @returns {Promise<Array<Object>>}
 */
export async function fetchContentRegistry() {
  // 1. Live Supabase PostgreSQL query
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('content_registry')
        .select('*');

      if (!error && Array.isArray(data) && data.length > 0) {
        // Merge database records with baseline registry
        const dbMap = new Map(data.map(row => [row.id, row]));

        return centralContentRegistry.map(item => {
          const dbRow = dbMap.get(item.id);
          if (dbRow) {
            return {
              ...item,
              isPublic: Boolean(dbRow.is_public),
              editorialStatus: item.editorialStatus === 'published' ? 'published' : (dbRow.editorial_status || item.editorialStatus),
              updatedAt: dbRow.updated_at
            };
          }
          // Fail closed for drafts and planned items; preserve published status for approved curriculum
          return {
            ...item,
            isPublic: item.editorialStatus === 'published' && Boolean(item.isPublic)
          };
        });
      }

      // If anon direct SELECT encountered a policy restriction, evaluate live access via RPC
      const rpcResults = await Promise.all(
        centralContentRegistry.map(async item => {
          try {
            const { data: isAcc } = await supabase.rpc('is_content_item_accessible', { item_id: item.id });
            return { id: item.id, isAccessible: Boolean(isAcc) };
          } catch {
            return { id: item.id, isAccessible: false };
          }
        })
      );

      const rpcMap = new Map(rpcResults.map(r => [r.id, r.isAccessible]));
      return centralContentRegistry.map(item => ({
        ...item,
        isPublic: Boolean(rpcMap.get(item.id))
      }));
    } catch {
      // Supabase is configured but query threw network error.
      // Fail closed: Do not expose restricted content through static fallback.
      return centralContentRegistry.map(item => {
        const isCoreApproved = item.id === 'pillar-workbench' || item.id === 'workbench-subject-dld';
        return {
          ...item,
          isPublic: isCoreApproved && item.editorialStatus === 'published'
        };
      });
    }
  }

  // 2. Local Simulation Mode (only active when Supabase credentials are absent)
  const localOverrides = getLocalVisibilityOverrides();
  return centralContentRegistry.map(item => {
    if (Object.prototype.hasOwnProperty.call(localOverrides, item.id)) {
      // Only allow override if the item is published
      if (item.editorialStatus === 'published') {
        return {
          ...item,
          isPublic: Boolean(localOverrides[item.id])
        };
      }
    }
    return item;
  });
}

/**
 * Update the public visibility setting of a content item.
 * 
 * Strict Publishing Safeguards:
 * 1. Administrator identity must be verified.
 * 2. If MFA is enrolled, MFA assurance (AAL2) is verified.
 * 3. Item must have editorialStatus === 'published'. Drafts and in-review items CANNOT be published.
 * 
 * @param {Object} params
 * @param {string} params.itemId
 * @param {boolean} params.isPublic
 * @param {Object} params.adminSession
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function updateItemVisibility({ itemId, isPublic, adminSession }) {
  // Authorization Check
  if (!adminSession?.isAuthenticated || !adminSession?.isOwner) {
    return {
      success: false,
      error: 'Unauthorized: Only the verified owner can change content visibility.'
    };
  }

  // MFA Assurance Check
  if (adminSession.hasMfaEnrolled && adminSession.assuranceLevel !== 'aal2') {
    return {
      success: false,
      error: 'MFA Verification Required: You must verify your Authenticator code before publishing writes.'
    };
  }

  // Inspect target item
  const item = getRegistryItemById(itemId);
  if (!item) {
    return {
      success: false,
      error: `Item with identifier "${itemId}" was not found in the content registry.`
    };
  }

  // Mandatory Safeguard: Drafts, Planned, or In Review items can NEVER be made public
  if (isPublic && item.editorialStatus !== 'published') {
    return {
      success: false,
      error: `Cannot publish "${item.title}". Only approved items with status "published" can be made public. Current status: "${item.editorialStatus}".`
    };
  }

  // 1. Live Supabase Update
  if (isSupabaseConfigured()) {
    if (adminSession.isSimulated) {
      return {
        success: false,
        error: 'Forbidden: Local simulation cannot perform publishing writes when a live Supabase project is connected.'
      };
    }

    try {
      const updatePayload = {
        is_public: isPublic,
        updated_at: new Date().toISOString()
      };
      if (item.editorialStatus === 'published') {
        updatePayload.editorial_status = 'published';
      }
      if (adminSession.userId && typeof adminSession.userId === 'string' && adminSession.userId.length > 20) {
        updatePayload.updated_by = adminSession.userId;
      }

      const { error: updateError } = await supabase
        .from('content_registry')
        .update(updatePayload)
        .eq('id', itemId);

      if (updateError) {
        return { success: false, error: updateError.message };
      }

      // Note: Publishing audit logs are automatically and atomically recorded
      // by PostgreSQL trigger trg_audit_content_registry AFTER UPDATE on content_registry.
      // Client-side insertion is neither needed nor allowed.

      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Database update failed.' };
    }
  }

  // 2. Local Simulation Storage
  setLocalVisibilityOverride(itemId, isPublic);
  recordLocalAuditLog({
    action: isPublic ? 'PUBLISH' : 'HIDE',
    targetId: itemId,
    targetTitle: item.title,
    userEmail: adminSession.email,
    isSimulated: true
  });

  return { success: true };
}

/**
 * Retrieve recent audit logs for the owner dashboard.
 * @returns {Promise<Array<Object>>}
 */
export async function fetchAuditLogs() {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('admin_audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(25);

      if (!error && Array.isArray(data)) {
        return data;
      }
    } catch {
      // Fallback
    }
  }

  try {
    const raw = localStorage.getItem(LOCAL_AUDIT_LOG_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Securely fetch unpublished draft content for admin preview.
 * Ensures unpublished content is only provided to the authenticated owner.
 * 
 * @param {string} draftId
 * @param {Object} adminSession
 * @returns {Promise<{ success: boolean, draft?: Object, error?: string }>}
 */
export async function fetchUnpublishedDraft(draftId, adminSession) {
  if (!adminSession?.isAuthenticated || !adminSession?.isOwner) {
    return {
      success: false,
      error: 'Access Denied: Draft preview is restricted to the authenticated administrator.'
    };
  }

  // 1. Try Supabase unpublished_drafts table if configured
  if (isSupabaseConfigured() && !adminSession.isSimulated) {
    try {
      const { data, error } = await supabase
        .from('unpublished_drafts')
        .select('*')
        .eq('id', draftId)
        .single();

      if (!error && data) {
        return {
          success: true,
          draft: {
            id: data.id,
            title: data.title,
            pillar: data.pillar,
            content: data.content_body,
            notes: data.draft_notes,
            updatedAt: data.updated_at
          }
        };
      }
    } catch {
      // Fallback
    }
  }

  // 2. Offline Reference Archive (Simulation Test Harness)
  // Ensures zero generated faculty prose is bundled into the client build
  const archivedReadouts = {
    'readout-article-relays-to-tensors': {
      id: 'readout-article-relays-to-tensors',
      title: 'From Relays to Tensors: The Long Arc of Computing Hardware',
      pillar: 'readout',
      category: 'Hardware Architecture',
      readTime: '7 min read',
      date: '12 Oct 2026',
      abstract: 'How physical voltage differentials and relay logic evolved into systolic tensor arrays.',
      content: 'Confidential faculty draft. Full manuscript is stored securely in Supabase unpublished_drafts.',
      archivedReason: 'Unpublished Phase 1A: Not authored or approved by faculty lead.'
    },
    'readout-article-zero-based-indexing': {
      id: 'readout-article-zero-based-indexing',
      title: 'Why Zero-Based Indexing Matters in Memory Architecture',
      pillar: 'readout',
      category: 'Systems & C',
      readTime: '5 min read',
      date: '28 Sep 2026',
      abstract: 'An architectural examination of pointer arithmetic and contiguous memory offsets.',
      content: 'Confidential faculty draft. Full manuscript is stored securely in Supabase unpublished_drafts.',
      archivedReason: 'Unpublished Phase 1A: Not authored or approved by faculty lead.'
    },
    'readout-article-attention-geometry': {
      id: 'readout-article-attention-geometry',
      title: 'The Geometry of Attention Mechanisms: A First-Principles Intuition',
      pillar: 'readout',
      category: 'Machine Learning',
      readTime: '9 min read',
      date: '14 Sep 2026',
      abstract: 'Deconstructing dot-product attention as an angle-based similarity lookup in vector spaces.',
      content: 'Confidential faculty draft. Full manuscript is stored securely in Supabase unpublished_drafts.',
      archivedReason: 'Unpublished Phase 1A: Not authored or approved by faculty lead.'
    }
  };

  const archivedFolios = {
    'folio-essay-teaching-from-index-zero': {
      id: 'folio-essay-teaching-from-index-zero',
      title: 'On Teaching from Index Zero: Why Every Concept Deserves a Clean Starting Point',
      pillar: 'folio',
      topic: 'Pedagogy & Foundations',
      readTime: '6 min read',
      date: '04 Oct 2026',
      abstract: 'Why cognitive overload happens when textbooks skip foundational assumptions.',
      content: 'Confidential faculty draft. Full essay text is stored securely in Supabase unpublished_drafts.',
      archivedReason: 'Unpublished Phase 1A: Not authored or approved by faculty lead.'
    },
    'folio-essay-quiet-craft-engineering': {
      id: 'folio-essay-quiet-craft-engineering',
      title: 'The Quiet Craft of Classroom Engineering',
      pillar: 'folio',
      topic: 'Faculty Reflections',
      readTime: '5 min read',
      date: '18 Sep 2026',
      abstract: 'Observations on preparing lecture models and drawing circuit schematics by hand.',
      content: 'Confidential faculty draft. Full essay text is stored securely in Supabase unpublished_drafts.',
      archivedReason: 'Unpublished Phase 1A: Not authored or approved by faculty lead.'
    },
    'folio-essay-deep-reading-summaries': {
      id: 'folio-essay-deep-reading-summaries',
      title: 'On Reading Deeply in an Era of Summary Feeds',
      pillar: 'folio',
      topic: 'Books & Mindset',
      readTime: '7 min read',
      date: '22 Aug 2026',
      abstract: 'Why engineering students must cultivate the endurance to read primary textbooks.',
      content: 'Confidential faculty draft. Full essay text is stored securely in Supabase unpublished_drafts.',
      archivedReason: 'Unpublished Phase 1A: Not authored or approved by faculty lead.'
    }
  };

  const draft = archivedReadouts[draftId] || archivedFolios[draftId];
  if (draft) {
    return { success: true, draft };
  }

  return {
    success: false,
    error: `Draft content for "${draftId}" is not present in local or remote archive.`
  };
}
