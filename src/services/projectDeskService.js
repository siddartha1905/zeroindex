/**
 * ZeroIndex Private Project Desk Service
 * File: src/services/projectDeskService.js
 * 
 * Provides secure, owner-only data operations for the Project Desk:
 * - Ideas, Development Tasks (Now/Next/Later), Decisions, and Teaching Notes
 * - Operational metadata ("Continue Where I Left Off")
 * - Sanitized snapshot compilation (zero credential exposure)
 * - Explicit storage mode detection (cloud vs migration pending vs local mock)
 * - Idempotent baseline initialization
 * 
 * Security Guard:
 * - Read operations require verified owner admin status (is_admin()).
 * - Write operations require Authenticator Assurance Level 2 (AAL2 MFA).
 * - Avoids automatic local-storage duplication of sensitive teaching notes.
 * - Production database errors fail closed and NEVER silently fall back to in-memory storage.
 * 
 * Standard: Strictly zero em-dashes and zero en-dashes across all code and comments.
 */

import { supabase, isSupabaseConfigured } from './supabaseClient.js';
import { initialProjectDeskItems, initialProjectDeskMeta } from '../data/projectDeskSeedData.js';

// In-memory runtime cache for offline or local simulation mode.
// Note: Intentionally NOT written to window.localStorage to protect sensitive notes.
let inMemoryDeskItems = [...initialProjectDeskItems];
let inMemoryDeskMeta = { ...initialProjectDeskMeta };

/**
 * Detect PostgreSQL or PostgREST missing table errors:
 * - 42P01: relation does not exist (direct PostgreSQL)
 * - PGRST205: Could not find the table in the schema cache (PostgREST / Supabase API)
 */
function isTableMissingError(error) {
  if (!error) return false;
  return (
    error.code === 'PGRST205' ||
    error.code === '42P01' ||
    (error.message && (
      error.message.includes('schema cache') ||
      error.message.includes('does not exist') ||
      error.message.includes('Could not find the table')
    ))
  );
}

/**
 * Check storage readiness and connection status.
 * Distinguishes between:
 * - 'cloud_ready': Live Supabase connection with tables verified.
 * - 'unmigrated': Supabase configured, but migration 20261028000001_project_desk_foundation.sql not executed yet.
 * - 'local_demo': Supabase not configured in environment; local in-memory fallback active.
 * - 'unauthorized': RLS or authentication blocked.
 * - 'error': Connection or unexpected error.
 * 
 * @returns {Promise<{ mode: string, isLiveDb: boolean, unmigrated?: boolean, message: string, error?: string }>}
 */
export async function checkProjectDeskStorageStatus() {
  if (!isSupabaseConfigured()) {
    return {
      mode: 'local_demo',
      isLiveDb: false,
      message: 'Supabase credentials not configured. Operating in local in-memory demonstration mode.'
    };
  }

  try {
    const { data, error } = await supabase
      .from('project_desk_items')
      .select('id')
      .limit(1);

    if (error) {
      if (isTableMissingError(error)) {
        return {
          mode: 'unmigrated',
          isLiveDb: false,
          unmigrated: true,
          message: 'Database migration pending: Table public.project_desk_items does not exist yet. Apply migration 20261028000001_project_desk_foundation.sql in Supabase SQL Editor.'
        };
      }

      if (error.code === '42501' || (error.message && error.message.toLowerCase().includes('permission denied'))) {
        return {
          mode: 'unauthorized',
          isLiveDb: true,
          error: error.message,
          message: 'Permission denied: Verified owner authentication with AAL2 MFA is required to access Project Desk.'
        };
      }

      return {
        mode: 'error',
        isLiveDb: true,
        error: error.message,
        message: `Database error: ${error.message}`
      };
    }

    return {
      mode: 'cloud_ready',
      isLiveDb: true,
      message: 'Connected to Supabase. RLS policies and private tables active.'
    };
  } catch (err) {
    return {
      mode: 'error',
      isLiveDb: false,
      error: err.message,
      message: `Failed to connect to storage: ${err.message}`
    };
  }
}

/**
 * Fetch Project Desk items with optional filtering.
 * 
 * @param {Object} [filters]
 * @param {string} [filters.itemType] - 'idea' | 'plan' | 'decision' | 'requirement'
 * @param {string} [filters.category] - 'workbench' | 'atlas' | 'journal' | 'teaching_note' | 'general'
 * @param {string} [filters.pillar] - 'workbench' | 'atlas' | 'journal' | 'general'
 * @param {string} [filters.status] - Item status
 * @param {string} [filters.searchQuery] - Search query matching title, content, or tags
 * @returns {Promise<{ success: boolean, items: Array<Object>, isLiveDb?: boolean, unmigrated?: boolean, isEmptyTable?: boolean, warning?: string, error?: string }>}
 */
export async function fetchProjectDeskItems(filters = {}) {
  const { itemType, category, pillar, status, searchQuery } = filters;

  if (isSupabaseConfigured()) {
    try {
      let query = supabase
        .from('project_desk_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (itemType && itemType !== 'all') {
        query = query.eq('item_type', itemType);
      }
      if (category && category !== 'all') {
        query = query.eq('category', category);
      }
      if (pillar && pillar !== 'all') {
        query = query.eq('pillar', pillar);
      }
      if (status && status !== 'all') {
        query = query.eq('status', status);
      }

      const { data, error } = await query;

      if (error) {
        // Distinguish migration pending from real DB authorization errors
        if (isTableMissingError(error)) {
          let demoItems = [...inMemoryDeskItems];
          if (itemType && itemType !== 'all') demoItems = demoItems.filter(i => i.item_type === itemType);
          if (category && category !== 'all') demoItems = demoItems.filter(i => i.category === category);
          if (pillar && pillar !== 'all') demoItems = demoItems.filter(i => i.pillar === pillar);
          if (status && status !== 'all') demoItems = demoItems.filter(i => i.status === status);
          if (searchQuery && searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim();
            demoItems = demoItems.filter(i => 
              (i.title && i.title.toLowerCase().includes(q)) ||
              (i.content && i.content.toLowerCase().includes(q)) ||
              (Array.isArray(i.tags) && i.tags.some(t => t.toLowerCase().includes(q))) ||
              (i.decision_ref && i.decision_ref.toLowerCase().includes(q))
            );
          }
          return {
            success: true,
            items: demoItems,
            isLiveDb: false,
            unmigrated: true,
            warning: 'Database migration pending: Table public.project_desk_items does not exist yet. Displaying local non-sensitive demonstration fixtures.'
          };
        }

        // Production database errors fail closed and DO NOT silently trigger in-memory fallback
        return { success: false, items: [], error: error.message, isLiveDb: true };
      }

      let items = data || [];

      // Apply client-side search query if specified
      if (searchQuery && searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        items = items.filter(i => 
          (i.title && i.title.toLowerCase().includes(q)) ||
          (i.content && i.content.toLowerCase().includes(q)) ||
          (Array.isArray(i.tags) && i.tags.some(t => t.toLowerCase().includes(q))) ||
          (i.decision_ref && i.decision_ref.toLowerCase().includes(q))
        );
      }

      return {
        success: true,
        items,
        isLiveDb: true,
        isEmptyTable: (data || []).length === 0
      };
    } catch (err) {
      return { success: false, items: [], error: err.message || 'Database query error', isLiveDb: true };
    }
  }

  // Local Simulation / Offline In-Memory Fallback
  let items = [...inMemoryDeskItems];

  if (itemType && itemType !== 'all') {
    items = items.filter(i => i.item_type === itemType);
  }
  if (category && category !== 'all') {
    items = items.filter(i => i.category === category);
  }
  if (pillar && pillar !== 'all') {
    items = items.filter(i => i.pillar === pillar);
  }
  if (status && status !== 'all') {
    items = items.filter(i => i.status === status);
  }
  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    items = items.filter(i => 
      (i.title && i.title.toLowerCase().includes(q)) ||
      (i.content && i.content.toLowerCase().includes(q)) ||
      (Array.isArray(i.tags) && i.tags.some(t => t.toLowerCase().includes(q))) ||
      (i.decision_ref && i.decision_ref.toLowerCase().includes(q))
    );
  }

  return { success: true, items, isLiveDb: false, isLocalDemo: true };
}

/**
 * Normalize and map item fields to ensure full compatibility with database constraints:
 * - item_type: 'idea' | 'plan' | 'decision' | 'requirement'
 * - category: 'workbench' | 'atlas' | 'journal' | 'teaching_note' | 'general'
 * - pillar: 'workbench' | 'atlas' | 'journal' | 'general'
 * - status: 'new' | 'under_review' | 'approved' | 'parked' | 'discarded' | 'now' | 'next' | 'later' | 'completed' | 'active' | 'superseded'
 * - priority: 'low' | 'medium' | 'high' | 'urgent'
 * 
 * Preserves UI classifications ('teaching_note', 'content_idea', 'improvement', 'tech_task')
 * in metadata.classification so that no classification data is lost.
 */
export function normalizeDeskItem(item) {
  const validItemTypes = ['idea', 'plan', 'decision', 'requirement'];
  const validPillars = ['workbench', 'atlas', 'journal', 'general'];
  const validDbCategories = ['workbench', 'atlas', 'journal', 'teaching_note', 'general'];
  const validStatuses = [
    'new', 'under_review', 'approved', 'parked', 'discarded',
    'now', 'next', 'later', 'completed',
    'active', 'superseded'
  ];
  const validPriorities = ['low', 'medium', 'high', 'urgent'];

  // 1. Normalize item_type
  const item_type = validItemTypes.includes(item.item_type) ? item.item_type : 'idea';

  // 2. Normalize pillar
  const pillar = validPillars.includes(item.pillar) ? item.pillar : 'general';

  // 3. Extract classification from category or metadata
  const rawCat = item.category || 'general';
  let classification = item.classification || item.metadata?.classification || null;
  if (['teaching_note', 'content_idea', 'improvement', 'tech_task'].includes(rawCat)) {
    classification = classification || rawCat;
  }

  // 4. Map to database-allowed category
  let category = 'general';
  if (rawCat === 'teaching_note') {
    category = 'teaching_note';
  } else if (validDbCategories.includes(rawCat)) {
    category = rawCat;
  } else if (validPillars.includes(pillar) && pillar !== 'general') {
    category = pillar;
  } else {
    category = 'general';
  }

  // 5. Normalize status
  const defaultStatus = item_type === 'plan' ? 'now' : 'new';
  const status = validStatuses.includes(item.status) ? item.status : defaultStatus;

  // 6. Normalize priority
  const priority = validPriorities.includes(item.priority) ? item.priority : 'medium';

  // 7. Build metadata and tags
  const metadata = {
    ...(item.metadata || {}),
    ...(classification ? { classification } : {})
  };

  let tags = Array.isArray(item.tags) ? [...item.tags] : [];
  if (classification && !tags.includes(classification)) {
    tags.push(classification);
  }

  return {
    item_type,
    category,
    pillar,
    title: (item.title || '').trim(),
    content: (item.content || '').trim(),
    status,
    priority,
    decision_ref: item.decision_ref || null,
    tags,
    metadata
  };
}

/**
 * Create a new Project Desk item.
 * Requires verified owner session and AAL2 assurance when connected to Supabase.
 * 
 * @param {Object} item
 * @param {Object} adminSession
 * @returns {Promise<{ success: boolean, item?: Object, isLiveDb?: boolean, isUnmigrated?: boolean, isLocalDemo?: boolean, requiresAal2?: boolean, warning?: string, error?: string }>}
 */
export async function createProjectDeskItem(item, adminSession) {
  if (!adminSession?.isOwner) {
    return { success: false, error: 'Unauthorized: Owner access required.' };
  }

  if (isSupabaseConfigured() && adminSession?.assuranceLevel && adminSession.assuranceLevel !== 'aal2') {
    return {
      success: false,
      error: 'MFA Verification Required: You are signed in with password only (AAL1). Project Desk write operations require Multi-Factor Authentication (AAL2). Please complete Authenticator verification.',
      requiresAal2: true
    };
  }

  if (!item.title || !item.title.trim()) {
    return { success: false, error: 'Item title is required.' };
  }

  const newItem = normalizeDeskItem(item);

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('project_desk_items')
        .insert([newItem])
        .select()
        .single();

      if (error) {
        if (isTableMissingError(error)) {
          // Migration pending: record in local memory and notify user with warning
          const mockItem = {
            id: 'local-' + Date.now(),
            ...newItem,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
          inMemoryDeskItems.unshift(mockItem);
          return {
            success: true,
            item: mockItem,
            isLiveDb: false,
            isUnmigrated: true,
            warning: 'Saved to temporary session memory: Migration 20261028000001_project_desk_foundation.sql is pending in Supabase. This item will not persist to the database.'
          };
        }

        if (error.code === '42501' || (error.message && error.message.toLowerCase().includes('violates row-level security'))) {
          return {
            success: false,
            error: 'Save blocked by Row Level Security: Multi-Factor Authentication (AAL2) is required to insert records. Please complete Authenticator app verification in the login screen.',
            isLiveDb: true,
            requiresAal2: true
          };
        }

        if (error.code === '23514') {
          return {
            success: false,
            error: `Database constraint violation (${error.message}): Ensure title, classification, and pillar conform to schema rules.`,
            isLiveDb: true
          };
        }

        // Real database error: fail closed
        return { success: false, error: error.message, isLiveDb: true };
      }

      return { success: true, item: data, isLiveDb: true };
    } catch (err) {
      return { success: false, error: err.message || 'Error inserting project desk item', isLiveDb: true };
    }
  }

  // Local Simulation: Insert into in-memory array
  const mockItem = {
    id: 'local-' + Date.now(),
    ...newItem,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  inMemoryDeskItems.unshift(mockItem);
  return { success: true, item: mockItem, isLocalDemo: true };
}

/**
 * Update an existing Project Desk item.
 * 
 * @param {string} id
 * @param {Object} updates
 * @param {Object} adminSession
 * @returns {Promise<{ success: boolean, item?: Object, isLiveDb?: boolean, isUnmigrated?: boolean, isLocalDemo?: boolean, requiresAal2?: boolean, warning?: string, error?: string }>}
 */
export async function updateProjectDeskItem(id, updates, adminSession) {
  if (!adminSession?.isOwner) {
    return { success: false, error: 'Unauthorized: Owner access required.' };
  }

  if (isSupabaseConfigured() && adminSession?.assuranceLevel && adminSession.assuranceLevel !== 'aal2') {
    return {
      success: false,
      error: 'MFA Verification Required: Multi-Factor Authentication (AAL2) is required to update records.',
      requiresAal2: true
    };
  }

  if (!id) {
    return { success: false, error: 'Target item ID is required.' };
  }

  const allowedFields = [
    'title', 'content', 'status', 'priority', 'pillar',
    'category', 'decision_ref', 'tags', 'metadata'
  ];

  const patch = {};
  allowedFields.forEach(field => {
    if (updates[field] !== undefined) {
      patch[field] = updates[field];
    }
  });

  if (patch.title !== undefined) patch.title = patch.title.trim();
  if (patch.content !== undefined) patch.content = patch.content.trim();

  // Normalize category within patch if modified
  const validDbCategories = ['workbench', 'atlas', 'journal', 'teaching_note', 'general'];
  if (patch.category !== undefined) {
    if (patch.category === 'teaching_note') {
      patch.category = 'teaching_note';
      patch.metadata = { ...(patch.metadata || updates.metadata || {}), classification: 'teaching_note' };
    } else if (validDbCategories.includes(patch.category)) {
      // already a valid category
    } else if (['content_idea', 'improvement', 'tech_task'].includes(patch.category)) {
      const cls = patch.category;
      patch.metadata = { ...(patch.metadata || updates.metadata || {}), classification: cls };
      patch.category = (patch.pillar && patch.pillar !== 'general') ? patch.pillar : 'general';
    } else {
      patch.category = 'general';
    }
  }

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('project_desk_items')
        .update(patch)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        if (isTableMissingError(error)) {
          // Migration pending: update in-memory item
          const idx = inMemoryDeskItems.findIndex(i => i.id === id);
          if (idx !== -1) {
            inMemoryDeskItems[idx] = {
              ...inMemoryDeskItems[idx],
              ...patch,
              updated_at: new Date().toISOString()
            };
            return {
              success: true,
              item: inMemoryDeskItems[idx],
              isLiveDb: false,
              isUnmigrated: true,
              warning: 'Updated in temporary session memory: Migration is pending in Supabase.'
            };
          }
          return { success: false, error: 'Item not found in temporary memory.' };
        }

        if (error.code === '42501' || (error.message && error.message.toLowerCase().includes('violates row-level security'))) {
          return {
            success: false,
            error: 'Update blocked by Row Level Security: Multi-Factor Authentication (AAL2) or verified owner privileges required.',
            isLiveDb: true,
            requiresAal2: true
          };
        }

        // Real database error: fail closed
        return { success: false, error: error.message, isLiveDb: true };
      }

      return { success: true, item: data, isLiveDb: true };
    } catch (err) {
      return { success: false, error: err.message || 'Error updating project desk item', isLiveDb: true };
    }
  }

  // Local Simulation: Update in-memory item
  const idx = inMemoryDeskItems.findIndex(i => i.id === id);
  if (idx === -1) {
    return { success: false, error: 'Item not found in memory.' };
  }

  inMemoryDeskItems[idx] = {
    ...inMemoryDeskItems[idx],
    ...patch,
    updated_at: new Date().toISOString()
  };

  return { success: true, item: inMemoryDeskItems[idx], isLocalDemo: true };
}

/**
 * Delete a Project Desk item.
 * 
 * @param {string} id
 * @param {Object} adminSession
 * @returns {Promise<{ success: boolean, isLiveDb?: boolean, isUnmigrated?: boolean, isLocalDemo?: boolean, requiresAal2?: boolean, warning?: string, error?: string }>}
 */
export async function deleteProjectDeskItem(id, adminSession) {
  if (!adminSession?.isOwner) {
    return { success: false, error: 'Unauthorized: Owner access required.' };
  }

  if (isSupabaseConfigured() && adminSession?.assuranceLevel && adminSession.assuranceLevel !== 'aal2') {
    return {
      success: false,
      error: 'MFA Verification Required: Multi-Factor Authentication (AAL2) is required to delete records.',
      requiresAal2: true
    };
  }

  if (!id) {
    return { success: false, error: 'Target item ID is required.' };
  }

  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase
        .from('project_desk_items')
        .delete()
        .eq('id', id);

      if (error) {
        if (isTableMissingError(error)) {
          inMemoryDeskItems = inMemoryDeskItems.filter(i => i.id !== id);
          return {
            success: true,
            isLiveDb: false,
            isUnmigrated: true,
            warning: 'Deleted from temporary session memory: Migration is pending in Supabase.'
          };
        }

        if (error.code === '42501' || (error.message && error.message.toLowerCase().includes('violates row-level security'))) {
          return {
            success: false,
            error: 'Deletion blocked by Row Level Security: Multi-Factor Authentication (AAL2) or verified owner privileges required.',
            isLiveDb: true,
            requiresAal2: true
          };
        }

        // Real database error: fail closed
        return { success: false, error: error.message, isLiveDb: true };
      }

      return { success: true, isLiveDb: true };
    } catch (err) {
      return { success: false, error: err.message || 'Error deleting project desk item', isLiveDb: true };
    }
  }

  // Local Simulation: Remove from in-memory array
  inMemoryDeskItems = inMemoryDeskItems.filter(i => i.id !== id);
  return { success: true, isLocalDemo: true };
}

/**
 * Retrieve operational metadata (e.g. 'continue_where_left_off').
 * 
 * @param {string} [key='continue_where_left_off']
 * @returns {Promise<{ success: boolean, payload: Object | null, isLiveDb?: boolean, unmigrated?: boolean, error?: string }>}
 */
export async function fetchProjectDeskMeta(key = 'continue_where_left_off') {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('project_desk_meta')
        .select('payload')
        .eq('key', key)
        .maybeSingle();

      if (error) {
        if (isTableMissingError(error)) {
          return {
            success: true,
            payload: inMemoryDeskMeta[key] || null,
            isLiveDb: false,
            unmigrated: true
          };
        }
        return { success: false, payload: null, error: error.message, isLiveDb: true };
      }

      const payload = data ? data.payload : (inMemoryDeskMeta[key] || null);
      return { success: true, payload, isLiveDb: true };
    } catch (err) {
      return { success: false, payload: null, error: err.message, isLiveDb: true };
    }
  }

  return { success: true, payload: inMemoryDeskMeta[key] || null, isLiveDb: false, isLocalDemo: true };
}

/**
 * Save operational metadata.
 * 
 * @param {string} key
 * @param {Object} payload
 * @param {Object} adminSession
 * @returns {Promise<{ success: boolean, isLiveDb?: boolean, isUnmigrated?: boolean, isLocalDemo?: boolean, warning?: string, error?: string }>}
 */
export async function saveProjectDeskMeta(key, payload, adminSession) {
  if (!adminSession?.isOwner) {
    return { success: false, error: 'Unauthorized: Owner access required.' };
  }

  if (isSupabaseConfigured() && adminSession?.assuranceLevel && adminSession.assuranceLevel !== 'aal2') {
    return {
      success: false,
      error: 'MFA Verification Required: Multi-Factor Authentication (AAL2) is required to save operational notes.',
      requiresAal2: true
    };
  }

  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase
        .from('project_desk_meta')
        .upsert({
          key,
          payload,
          updated_at: new Date().toISOString()
        });

      if (error) {
        if (isTableMissingError(error)) {
          inMemoryDeskMeta[key] = payload;
          return {
            success: true,
            isLiveDb: false,
            isUnmigrated: true,
            warning: 'Saved to temporary session memory: Migration is pending in Supabase.'
          };
        }

        if (error.code === '42501' || (error.message && error.message.toLowerCase().includes('violates row-level security'))) {
          return {
            success: false,
            error: 'Save blocked by Row Level Security: Multi-Factor Authentication (AAL2) is required to save operational notes.',
            isLiveDb: true,
            requiresAal2: true
          };
        }

        return { success: false, error: error.message, isLiveDb: true };
      }

      return { success: true, isLiveDb: true };
    } catch (err) {
      return { success: false, error: err.message, isLiveDb: true };
    }
  }

  inMemoryDeskMeta[key] = payload;
  return { success: true, isLocalDemo: true };
}

/**
 * Idempotently seed curated initial baseline items (decisions, requirements, tasks)
 * into the Supabase database.
 * If an item with the same decision_ref or title already exists, it is skipped.
 * 
 * @param {Object} adminSession
 * @returns {Promise<{ success: boolean, insertedCount: number, skippedCount: number, error?: string }>}
 */
export async function seedInitialBaselineItems(adminSession) {
  if (!adminSession?.isOwner) {
    return { success: false, insertedCount: 0, skippedCount: 0, error: 'Unauthorized: Owner access required.' };
  }

  if (!isSupabaseConfigured()) {
    return { success: false, insertedCount: 0, skippedCount: 0, error: 'Supabase credentials not configured in environment.' };
  }

  try {
    // 1. Fetch existing items to prevent duplicates
    const { data: existing, error: fetchErr } = await supabase
      .from('project_desk_items')
      .select('title, decision_ref, item_type');

    if (fetchErr) {
      return { success: false, insertedCount: 0, skippedCount: 0, error: fetchErr.message };
    }

    const existingRefs = new Set((existing || []).map(e => `${e.item_type}:${e.decision_ref}`).filter(Boolean));
    const existingTitles = new Set((existing || []).map(e => e.title.toLowerCase().trim()));

    let insertedCount = 0;
    let skippedCount = 0;

    for (const item of initialProjectDeskItems) {
      // Check for duplication
      const refKey = item.decision_ref ? `${item.item_type}:${item.decision_ref}` : null;
      const isRefDuplicate = refKey && existingRefs.has(refKey);
      const isTitleDuplicate = existingTitles.has(item.title.toLowerCase().trim());

      if (isRefDuplicate || isTitleDuplicate) {
        skippedCount++;
        continue;
      }

      const insertRecord = {
        item_type: item.item_type,
        category: item.category,
        pillar: item.pillar,
        title: item.title,
        content: item.content,
        status: item.status,
        priority: item.priority,
        decision_ref: item.decision_ref || null,
        tags: item.tags || [],
        metadata: item.metadata || {}
      };

      const { error: insertErr } = await supabase
        .from('project_desk_items')
        .insert([insertRecord]);

      if (insertErr) {
        return { success: false, insertedCount, skippedCount, error: insertErr.message };
      }

      insertedCount++;
    }

    // Seed meta continue_where_left_off if not exists
    const { data: existingMeta } = await supabase
      .from('project_desk_meta')
      .select('key')
      .eq('key', 'continue_where_left_off')
      .maybeSingle();

    if (!existingMeta && initialProjectDeskMeta.continue_where_left_off) {
      await supabase.from('project_desk_meta').upsert({
        key: 'continue_where_left_off',
        payload: initialProjectDeskMeta.continue_where_left_off,
        updated_at: new Date().toISOString()
      });
    }

    return { success: true, insertedCount, skippedCount };
  } catch (err) {
    return { success: false, insertedCount: 0, skippedCount: 0, error: err.message };
  }
}

/**
 * Generate a clean, sanitized project snapshot export object.
 * Strictly purges any credentials, tokens, or private configuration.
 * 
 * Field Allowlist: id, item_type, category, pillar, title, content,
 * status, priority, decision_ref, tags, metadata, created_at, updated_at.
 * 
 * Excludes: created_by, updated_by, auth tokens, session IDs, internal secrets.
 * 
 * @param {Object} params
 * @param {Array<Object>} params.items - Project desk items
 * @param {Object} params.meta - Project desk metadata
 * @param {string} [params.version='2.0.0'] - Project package version
 * @returns {Object} Clean portable snapshot object
 */
export function generateSanitizedProjectSnapshot({ items = [], meta = {}, version = '2.0.0' } = {}) {
  // Purge any accidental keys or secrets
  const cleanItems = items.map(item => {
    // Sanitize metadata: remove any credential-like or auth properties
    const rawMeta = item.metadata || {};
    const sanitizedMeta = {};
    const sensitiveKeys = ['token', 'secret', 'password', 'key', 'apikey', 'auth', 'hash', 'credential'];
    
    Object.keys(rawMeta).forEach(k => {
      const lower = k.toLowerCase();
      if (!sensitiveKeys.some(sk => lower.includes(sk))) {
        sanitizedMeta[k] = rawMeta[k];
      }
    });

    return {
      id: item.id,
      item_type: item.item_type,
      category: item.category,
      pillar: item.pillar,
      title: item.title,
      content: item.content,
      status: item.status,
      priority: item.priority,
      decision_ref: item.decision_ref,
      tags: item.tags || [],
      metadata: sanitizedMeta,
      created_at: item.created_at,
      updated_at: item.updated_at
    };
  });

  const cleanMeta = {
    continue_where_left_off: meta.continue_where_left_off || inMemoryDeskMeta.continue_where_left_off || null
  };

  return {
    system: 'ZeroIndex Project Desk',
    exportFormatVersion: '1.0.0',
    generatedAt: new Date().toISOString(),
    projectVersion: version,
    includesOwnerAuthoredNotes: true,
    confidentialityNotice: 'This exported snapshot contains private owner-authored project notes, decisions, and development tasks. It is intended strictly for authorized local archival use and should not be published online.',
    securityDisclaimer: 'This snapshot purges database system fields, user IDs, and known credential patterns. However, automated export cannot inspect arbitrary free-form text entered into titles, descriptions, or notes. Ensure that no passwords, API keys, or private student information were typed into free-form fields prior to exporting.',
    statistics: {
      totalItems: cleanItems.length,
      ideasCount: cleanItems.filter(i => i.item_type === 'idea').length,
      planCount: cleanItems.filter(i => i.item_type === 'plan').length,
      decisionsCount: cleanItems.filter(i => i.item_type === 'decision').length,
      requirementsCount: cleanItems.filter(i => i.item_type === 'requirement').length
    },
    meta: cleanMeta,
    items: cleanItems
  };
}

/**
 * Trigger client-side file download of a sanitized snapshot.
 * Operates purely in-memory using Blob URL; no server writes occur.
 * 
 * @param {Object} snapshotData
 * @param {string} [customFilename]
 */
export function triggerSnapshotDownload(snapshotData, customFilename) {
  if (typeof window === 'undefined') return;

  const dateStr = new Date().toISOString().slice(0, 10);
  const filename = customFilename || `zeroindex-project-desk-snapshot-${dateStr}.json`;
  const jsonString = JSON.stringify(snapshotData, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
