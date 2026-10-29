/**
 * ZeroIndex Subject Resource Manager Service
 * File: src/services/resourceManagerService.js
 * 
 * Provides persistent, secure operations for course subject resources:
 * - Official Syllabus PDF URL and toggle
 * - Prescribed and Reference Textbooks access URLs and toggles
 * - Unit-wise Faculty Study Materials (PDF Materials and PPT Materials)
 * - Curated External Resources (Channels, Websites, Calculators)
 * 
 * Security Guard:
 * - Public/Student queries expose ONLY published resources with valid URLs.
 * - Admin operations require verified owner admin status (public.is_admin()).
 * - Unpublished URLs of disabled resources are never leaked to public consumers.
 * - Fails safely to baseline curriculum without ever presenting blank syllabus or broken routes.
 * 
 * Standard: Strictly zero em-dashes and zero en-dashes across all code and comments.
 */

import { supabase, isSupabaseConfigured } from './supabaseClient.js';
import { dldSyllabus } from '../data/dldSyllabus.js';
import { dldSubjectResourcesData } from '../data/dldSubjectResourcesData.js';

// Session / In-memory storage key for fallback when Supabase table is not yet migrated
const SESSION_RESOURCES_KEY = 'zeroindex_subject_resources_runtime_cache';

/**
 * Detect PostgreSQL or PostgREST missing table errors:
 * - 42P01: relation does not exist (direct PostgreSQL)
 * - PGRST205: Could not find the table in the schema cache (PostgREST / Supabase API)
 */
export function isTableMissingError(error) {
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
 * Validate that a URL is a legitimate HTTP or HTTPS address.
 * Rejects javascript:, data:, file:, and invalid formatting.
 * @param {string} url
 * @returns {boolean}
 */
export function isValidResourceUrl(url) {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (!trimmed) return false;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Validate that a string matches UUID format (v4 or standard 8-4-4-4-12 hex).
 * Prevents PostgreSQL 'invalid input syntax for type uuid' errors.
 * @param {string} val
 * @returns {boolean}
 */
export function isValidUuid(val) {
  if (!val || typeof val !== 'string') return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val.trim());
}

/**
 * Generate baseline seed resources from static curriculum definitions.
 * @param {string} courseId
 * @returns {Array<Object>}
 */
export function getBaselineResources(courseId = 'dld') {
  const items = [];

  // 1. Official Syllabus PDF
  items.push({
    id: 'dld-syllabus-pdf',
    course_id: courseId,
    category: 'syllabus',
    unit_number: null,
    title: 'Official DLD Syllabus PDF',
    description: 'Authoritative two-page course syllabus issued by the Board of Studies (Course Code: 1005261102).',
    resource_type: 'PDF',
    url: dldSyllabus.syllabusPdfUrl || null,
    is_published: Boolean(dldSyllabus.syllabusPdfUrl),
    display_order: 1,
    created_at: new Date('2026-10-28T00:00:00Z').toISOString(),
    updated_at: new Date('2026-10-28T00:00:00Z').toISOString()
  });

  // 2. Prescribed Textbooks (2)
  const textbooks = dldSubjectResourcesData.studyMaterials?.textbooks || [];
  textbooks.forEach((tb) => {
    items.push({
      id: tb.id,
      course_id: courseId,
      category: 'textbooks',
      unit_number: null,
      title: tb.title,
      description: `${tb.authors} · ${tb.edition} (${tb.publisher})`,
      resource_type: 'Book',
      url: tb.driveLink || null,
      is_published: Boolean(tb.driveLink),
      display_order: tb.number || 1,
      created_at: new Date('2026-10-28T00:00:00Z').toISOString(),
      updated_at: new Date('2026-10-28T00:00:00Z').toISOString()
    });
  });

  // 3. Reference Textbooks (3)
  const refBooks = dldSubjectResourcesData.studyMaterials?.referenceBooks || [];
  refBooks.forEach((rb) => {
    items.push({
      id: rb.id,
      course_id: courseId,
      category: 'reference_books',
      unit_number: null,
      title: rb.title,
      description: `${rb.authors} (${rb.publisher})`,
      resource_type: 'Book',
      url: rb.driveLink || null,
      is_published: Boolean(rb.driveLink),
      display_order: rb.number || 1,
      created_at: new Date('2026-10-28T00:00:00Z').toISOString(),
      updated_at: new Date('2026-10-28T00:00:00Z').toISOString()
    });
  });

  // 4. Unit-wise Faculty Study Materials (Units I to V: PDF Materials & PPT Materials)
  const facultyUnits = dldSubjectResourcesData.studyMaterials?.facultyStudyMaterials || [];
  facultyUnits.forEach((u) => {
    (u.pdfMaterials || []).forEach((file, idx) => {
      items.push({
        id: file.id,
        course_id: courseId,
        category: 'pdf_materials',
        unit_number: u.unitNumber,
        title: file.title,
        description: file.description || '',
        resource_type: 'PDF',
        url: file.url || null,
        is_published: Boolean(file.url),
        display_order: idx + 1,
        created_at: new Date('2026-10-28T00:00:00Z').toISOString(),
        updated_at: new Date('2026-10-28T00:00:00Z').toISOString()
      });
    });

    (u.pptMaterials || []).forEach((file, idx) => {
      items.push({
        id: file.id,
        course_id: courseId,
        category: 'ppt_materials',
        unit_number: u.unitNumber,
        title: file.title,
        description: file.description || '',
        resource_type: 'PPT',
        url: file.url || null,
        is_published: Boolean(file.url),
        display_order: idx + 1,
        created_at: new Date('2026-10-28T00:00:00Z').toISOString(),
        updated_at: new Date('2026-10-28T00:00:00Z').toISOString()
      });
    });
  });

  // 5. External Learning Resources (Channels, Websites, Calculators)
  (dldSubjectResourcesData.educationalChannels || []).forEach((ch, idx) => {
    items.push({
      id: ch.id,
      course_id: courseId,
      category: 'educational_channels',
      unit_number: null,
      title: ch.name,
      description: ch.specialty || '',
      resource_type: 'Channel',
      url: ch.url || '',
      is_published: true,
      display_order: idx + 1,
      created_at: new Date('2026-10-28T00:00:00Z').toISOString(),
      updated_at: new Date('2026-10-28T00:00:00Z').toISOString()
    });
  });

  (dldSubjectResourcesData.referenceWebsites || []).forEach((web, idx) => {
    items.push({
      id: web.id,
      course_id: courseId,
      category: 'reference_websites',
      unit_number: null,
      title: web.name,
      description: web.description || '',
      resource_type: 'Website',
      url: web.url || '',
      is_published: true,
      display_order: idx + 1,
      created_at: new Date('2026-10-28T00:00:00Z').toISOString(),
      updated_at: new Date('2026-10-28T00:00:00Z').toISOString()
    });
  });

  (dldSubjectResourcesData.onlineCalculators || []).forEach((calc, idx) => {
    items.push({
      id: calc.id,
      course_id: courseId,
      category: 'online_calculators',
      unit_number: null,
      title: calc.name,
      description: calc.purpose || '',
      resource_type: 'Calculator',
      url: calc.url || '',
      is_published: true,
      display_order: idx + 1,
      created_at: new Date('2026-10-28T00:00:00Z').toISOString(),
      updated_at: new Date('2026-10-28T00:00:00Z').toISOString()
    });
  });

  return items;
}

// In-memory runtime cache for offline/unmigrated fallback
let inMemoryResourcesCache = null;

function getRuntimeCache(courseId = 'dld') {
  if (inMemoryResourcesCache !== null) {
    return inMemoryResourcesCache;
  }
  if (typeof window !== 'undefined' && window.sessionStorage) {
    try {
      const stored = window.sessionStorage.getItem(SESSION_RESOURCES_KEY);
      if (stored) {
        inMemoryResourcesCache = JSON.parse(stored);
        return inMemoryResourcesCache;
      }
    } catch {
      // Ignore session storage errors
    }
  }
  inMemoryResourcesCache = getBaselineResources(courseId);
  return inMemoryResourcesCache;
}

function updateRuntimeCache(newItems) {
  inMemoryResourcesCache = newItems;
  if (typeof window !== 'undefined' && window.sessionStorage) {
    try {
      window.sessionStorage.setItem(SESSION_RESOURCES_KEY, JSON.stringify(newItems));
    } catch {
      // Ignore session storage errors
    }
  }
}

/**
 * Check storage readiness and connection status for Subject Resources.
 * @returns {Promise<{ mode: string, isLiveDb: boolean, unmigrated?: boolean, message: string, error?: string }>}
 */
export async function checkResourceStorageStatus() {
  if (!isSupabaseConfigured()) {
    return {
      mode: 'local_demo',
      isLiveDb: false,
      message: 'Supabase credentials are not configured in environment. Operating in local simulation mode.'
    };
  }

  try {
    const { data, error } = await supabase
      .from('subject_resources')
      .select('id')
      .limit(1);

    if (error) {
      if (isTableMissingError(error)) {
        return {
          mode: 'unmigrated',
          isLiveDb: false,
          unmigrated: true,
          message: 'Supabase connected, but migration 20261028000002_subject_resources_manager.sql has not been executed yet.',
          error: error.message
        };
      }
      return {
        mode: 'error',
        isLiveDb: false,
        message: 'Database check returned an error.',
        error: error.message
      };
    }

    return {
      mode: 'cloud_ready',
      isLiveDb: true,
      message: 'Live Supabase connection active with subject_resources table verified.'
    };
  } catch (err) {
    return {
      mode: 'error',
      isLiveDb: false,
      message: 'Unexpected network exception checking subject_resources storage status.',
      error: err.message
    };
  }
}

/**
 * Fetch all resources for administrator management (includes disabled and draft items).
 * @param {string} courseId
 * @returns {Promise<{ items: Array<Object>, isLiveDb: boolean, unmigrated?: boolean, error?: string }>}
 */
export async function fetchAdminResources(courseId = 'dld') {
  if (!isSupabaseConfigured()) {
    return {
      items: getRuntimeCache(courseId),
      isLiveDb: false,
      message: 'Running in local simulation mode.'
    };
  }

  try {
    const { data, error } = await supabase
      .from('subject_resources')
      .select('*')
      .eq('course_id', courseId)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) {
      if (isTableMissingError(error)) {
        return {
          items: getRuntimeCache(courseId),
          isLiveDb: false,
          unmigrated: true,
          message: 'Table public.subject_resources not found. Run migration 20261028000002_subject_resources_manager.sql in Supabase SQL editor.'
        };
      }
      throw error;
    }

    // If table exists but is currently empty (e.g. freshly migrated), seed initial records
    if (Array.isArray(data) && data.length === 0) {
      const baseline = getBaselineResources(courseId);
      try {
        const { error: seedError } = await supabase
          .from('subject_resources')
          .insert(baseline);
        if (!seedError) {
          updateRuntimeCache(baseline);
          return { items: baseline, isLiveDb: true };
        }
      } catch {
        // Fall through to returning baseline
      }
      return { items: baseline, isLiveDb: true };
    }

    updateRuntimeCache(data);
    return { items: data, isLiveDb: true };
  } catch (err) {
    return {
      items: getRuntimeCache(courseId),
      isLiveDb: false,
      error: err.message
    };
  }
}

/**
 * Fetch published resources for public/student view.
 * Exposes ONLY rows that are enabled (is_published = true) AND have non-empty URLs.
 * Disabled resource URLs are NEVER returned.
 * @param {string} courseId
 * @returns {Promise<{ publishedMap: Record<string, Object>, items: Array<Object>, isLiveDb: boolean }>}
 */
export async function fetchPublishedResources(courseId = 'dld') {
  if (!isSupabaseConfigured()) {
    const cached = getRuntimeCache(courseId);
    const published = cached.filter(r => r.is_published && r.url);
    const map = {};
    published.forEach(p => { map[p.id] = p; });
    return { publishedMap: map, items: published, isLiveDb: false };
  }

  try {
    const { data, error } = await supabase
      .from('subject_resources')
      .select('*')
      .eq('course_id', courseId)
      .eq('is_published', true);

    if (error) {
      if (isTableMissingError(error)) {
        const cached = getRuntimeCache(courseId);
        const published = cached.filter(r => r.is_published && r.url);
        const map = {};
        published.forEach(p => { map[p.id] = p; });
        return { publishedMap: map, items: published, isLiveDb: false };
      }
      throw error;
    }

    const publishedItems = (data || []).filter(r => r.url && r.url.trim().length > 0);
    const map = {};
    publishedItems.forEach(p => { map[p.id] = p; });
    return { publishedMap: map, items: publishedItems, isLiveDb: true };
  } catch (err) {
    // Fail gracefully: fallback to local baseline published items
    const cached = getRuntimeCache(courseId);
    const published = cached.filter(r => r.is_published && r.url);
    const map = {};
    published.forEach(p => { map[p.id] = p; });
    return { publishedMap: map, items: published, isLiveDb: false };
  }
}

/**
 * Save or update a resource document.
 * Requires administrator identity.
 * @param {Object} resource
 * @param {Object} adminSession
 * @returns {Promise<{ success: boolean, item?: Object, error?: string, unmigrated?: boolean }>}
 */
export async function saveResource(resource, adminSession) {
  if (!resource.title || !resource.title.trim()) {
    return { success: false, error: 'Document title cannot be empty.' };
  }

  // Validate URL if provided or if published
  if (resource.url && resource.url.trim()) {
    if (!isValidResourceUrl(resource.url)) {
      return { success: false, error: 'Please enter a valid HTTP or HTTPS URL (e.g. Google Drive sharing link).' };
    }
  }

  // If enabling publication, a valid URL is strictly mandatory
  if (resource.is_published) {
    if (!resource.url || !isValidResourceUrl(resource.url)) {
      return { success: false, error: 'Cannot publish a resource without a valid HTTP or HTTPS URL.' };
    }
  }

  const resourceId = resource.id || `res-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const payload = {
    id: resourceId,
    course_id: resource.course_id || 'dld',
    category: resource.category,
    unit_number: resource.unit_number || null,
    title: resource.title.trim(),
    description: (resource.description || '').trim(),
    resource_type: resource.resource_type || 'PDF',
    url: resource.url ? resource.url.trim() : null,
    is_published: Boolean(resource.is_published),
    display_order: typeof resource.display_order === 'number' ? resource.display_order : 10,
    updated_at: new Date().toISOString(),
    updated_by: isValidUuid(adminSession?.userId) ? adminSession.userId : null
  };

  // 1. Live Supabase update
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('subject_resources')
        .upsert(payload, { onConflict: 'id' })
        .select()
        .single();

      if (error) {
        if (isTableMissingError(error)) {
          return { 
            success: false, 
            error: 'Database storage unavailable: table public.subject_resources is not migrated in Supabase project ruuomptmkabvdmiutxtj. Migration 20261028000002_subject_resources_manager.sql must be executed in the Supabase SQL Editor before changes can be permanently saved.',
            unmigrated: true
          };
        }
        return { success: false, error: error.message };
      }

      // Update runtime cache on genuine database success
      const current = getRuntimeCache(payload.course_id);
      const idx = current.findIndex(r => r.id === data.id);
      let updatedList;
      if (idx >= 0) {
        updatedList = [...current];
        updatedList[idx] = data;
      } else {
        updatedList = [...current, data];
      }
      updateRuntimeCache(updatedList);

      return { success: true, item: data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  // 2. Unconfigured or simulated environment
  if (adminSession?.allowSimulation) {
    const current = getRuntimeCache(payload.course_id);
    const idx = current.findIndex(r => r.id === payload.id);
    let updatedList;
    if (idx >= 0) {
      updatedList = [...current];
      updatedList[idx] = { ...current[idx], ...payload };
    } else {
      updatedList = [...current, payload];
    }
    updateRuntimeCache(updatedList);
    return { success: true, item: payload, isSimulated: true };
  }

  return { 
    success: false, 
    error: 'Database storage unavailable: Supabase credentials are not configured. Persistent writes are disabled to prevent data loss.' 
  };
}

/**
 * Toggle publication status of a resource.
 * @param {string} resourceId
 * @param {boolean} targetPublishedState
 * @param {Object} adminSession
 * @returns {Promise<{ success: boolean, item?: Object, error?: string, unmigrated?: boolean }>}
 */
export async function toggleResourcePublication(resourceId, targetPublishedState, adminSession) {
  const current = getRuntimeCache('dld');
  const existing = current.find(r => r.id === resourceId);

  // If turning ON, ensure URL is present and valid
  if (targetPublishedState) {
    if (!existing || !existing.url || !isValidResourceUrl(existing.url)) {
      return {
        success: false,
        error: 'Cannot publish resource: a valid HTTP or HTTPS URL must be saved before turning the toggle ON.'
      };
    }
  }

  return saveResource({
    ...existing,
    id: resourceId,
    is_published: targetPublishedState
  }, adminSession);
}

/**
 * Delete a resource entry.
 * @param {string} resourceId
 * @param {Object} adminSession
 * @returns {Promise<{ success: boolean, error?: string, unmigrated?: boolean }>}
 */
export async function deleteResource(resourceId, adminSession) {
  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase
        .from('subject_resources')
        .delete()
        .eq('id', resourceId);

      if (error) {
        if (isTableMissingError(error)) {
          return { 
            success: false, 
            error: 'Database storage unavailable: table public.subject_resources is not migrated in Supabase. Delete rejected.', 
            unmigrated: true 
          };
        }
        return { success: false, error: error.message };
      }

      const current = getRuntimeCache('dld');
      const filtered = current.filter(r => r.id !== resourceId);
      updateRuntimeCache(filtered);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  if (adminSession?.allowSimulation) {
    const current = getRuntimeCache('dld');
    const filtered = current.filter(r => r.id !== resourceId);
    updateRuntimeCache(filtered);
    return { success: true, isSimulated: true };
  }

  return { 
    success: false, 
    error: 'Database storage unavailable: Supabase credentials are not configured. Delete rejected.' 
  };
}
