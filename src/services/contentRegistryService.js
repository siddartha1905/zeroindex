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
              editorialStatus: dbRow.editorial_status || item.editorialStatus,
              updatedAt: dbRow.updated_at
            };
          }
          return item;
        });
      }
    } catch {
      // Fallback to local configuration on network error
    }
  }

  // 2. Local Simulation Mode / Baseline Fallback
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
  if (isSupabaseConfigured() && !adminSession.isSimulated) {
    try {
      const { error: updateError } = await supabase
        .from('content_registry')
        .update({
          is_public: isPublic,
          updated_at: new Date().toISOString(),
          updated_by: adminSession.userId
        })
        .eq('id', itemId);

      if (updateError) {
        return { success: false, error: updateError.message };
      }

      // Record audit log entry in Supabase
      await supabase.from('admin_audit_logs').insert({
        user_id: adminSession.userId,
        action: isPublic ? 'PUBLISH' : 'HIDE',
        target_id: itemId,
        previous_state: { is_public: !isPublic },
        new_state: { is_public: isPublic }
      }).catch(() => {});

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

  // 2. Offline Reference Archive (Readout & Folio Drafts)
  // These drafts are securely inspected by the administrator
  const archivedReadouts = {
    'readout-article-relays-to-tensors': {
      id: 'readout-article-relays-to-tensors',
      title: 'From Relays to Tensors: The Long Arc of Computing Hardware',
      pillar: 'readout',
      category: 'Hardware Architecture',
      readTime: '7 min read',
      date: '12 Oct 2026',
      abstract: 'How physical voltage differentials and mechanical relay logic evolved through discrete semiconductors into today massively parallel systolic tensor arrays.',
      content: 'The fundamental question of computer hardware has remained invariant for nearly a century: how can we represent symbolic truth states using physical phenomena?\n\nIn Claude Shannon 1937 master thesis, the breakthrough was demonstrating that electrical switches arranged in series and parallel were isomorphic to the Boolean algebraic operations of AND and OR. A physical circuit was no longer merely a conduit for electrical power; it was an apparatus capable of formal logical deduction.\n\nWhen we examine modern tensor processing units (TPUs) and systolic arrays, the underlying premise has not changed. An 8-bit multiplier-accumulator cell is fundamentally composed of full adders and Boolean gates, exactly as studied in introductory Digital Logic Design. Understanding computing from index zero ensures that modern hardware abstractions remain transparent rather than magical.',
      archivedReason: 'Unpublished Phase 1A: Not authored or approved by faculty lead. Stored for developer reference only.'
    },
    'readout-article-zero-based-indexing': {
      id: 'readout-article-zero-based-indexing',
      title: 'Why Zero-Based Indexing Matters in Memory Architecture',
      pillar: 'readout',
      category: 'Systems & C',
      readTime: '5 min read',
      date: '28 Sep 2026',
      abstract: 'An architectural examination of pointer arithmetic: why indexing at zero minimizes CPU machine instruction cycles and directly matches contiguous memory offsets.',
      content: 'Students frequently ask why programming languages count array elements starting at index zero instead of one. In C, an array identifier acts as a constant pointer to the memory location of its initial element. When a program accesses arr[i], the hardware evaluates: Address = Base + i * sizeof(Type).\n\nIf indexing were one-based, the CPU would be required to execute a subtraction instruction on every single array dereference: Base + (i - 1) * sizeof(Type). By defining the initial element at offset zero, the offset becomes precisely zero, saving millions of CPU arithmetic cycles in nested loops. Index zero is an architectural optimization.',
      archivedReason: 'Unpublished Phase 1A: Not authored or approved by faculty lead. Stored for developer reference only.'
    },
    'readout-article-attention-geometry': {
      id: 'readout-article-attention-geometry',
      title: 'The Geometry of Attention Mechanisms: A First-Principles Intuition',
      pillar: 'readout',
      category: 'Machine Learning',
      readTime: '9 min read',
      date: '14 Sep 2026',
      abstract: 'Deconstructing dot-product attention as an angle-based similarity lookup in high-dimensional vector spaces, stripped of hype and marketing vocabulary.',
      content: 'At the heart of the modern transformer architecture lies scaled dot-product attention: Attention(Q, K, V) = softmax((Q * K^T) / sqrt(d_k)) * V.\n\nDespite anthropomorphic language, attention is fundamentally an exercise in linear algebra and high-dimensional geometry. When two normalized vectors have a small angle between them, their dot product approaches unity. When orthogonal, their dot product is zero.\n\nBy computing pairwise dot products between query and key projections, the model constructs a dynamic, data-dependent weighting matrix.',
      archivedReason: 'Unpublished Phase 1A: Not authored or approved by faculty lead. Stored for developer reference only.'
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
      abstract: 'Why cognitive overload happens when textbooks skip foundational assumptions, and how deliberate first-principles instruction rebuilds academic confidence.',
      content: 'One of the most persistent observations in my classroom over the years is how frequently student anxiety originates not from intrinsic mathematical difficulty, but from unstated prerequisites.\n\nIn traditional curricula, textbooks routinely present high-level algorithms or circuit syntheses as self-evident facts. In computer science, index zero signifies the memory location where an array actually begins. In academic instruction, index zero means refusing to leave gaps in the foundation. When we take the time to trace an idea from basic voltage levels to Boolean gates before introducing complex sequential systems, students develop intellectual sovereignty over the subject.',
      archivedReason: 'Unpublished Phase 1A: Not authored or approved by faculty lead. Stored for developer reference only.'
    },
    'folio-essay-quiet-craft-engineering': {
      id: 'folio-essay-quiet-craft-engineering',
      title: 'The Quiet Craft of Classroom Engineering',
      pillar: 'folio',
      topic: 'Faculty Reflections',
      readTime: '5 min read',
      date: '18 Sep 2026',
      abstract: 'Observations on preparing lecture models, drawing circuit schematics by hand on the blackboard, and resisting the rush toward superficial automation.',
      content: 'There is a distinct, understated craftsmanship in drawing an electrical logic diagram on a physical blackboard. As the chalk moves across the slate, establishing wire runs and gate bodies, the pacing naturally synchronizes with human cognition.\n\nZeroIndex is an attempt to synthesize the best of both worlds: digital tools that preserve the contemplative, paced dignity of a chalkboard derivation, paired with interactive visual solvers that let students verify their derivations on their own time.',
      archivedReason: 'Unpublished Phase 1A: Not authored or approved by faculty lead. Stored for developer reference only.'
    },
    'folio-essay-deep-reading-summaries': {
      id: 'folio-essay-deep-reading-summaries',
      title: 'On Reading Deeply in an Era of Summary Feeds',
      pillar: 'folio',
      topic: 'Books & Mindset',
      readTime: '7 min read',
      date: '22 Aug 2026',
      abstract: 'Why engineering students must cultivate the endurance to read primary textbooks and papers rather than relying exclusively on cheat sheets and video snippets.',
      content: 'In technical education today, there is a dangerous temptation to substitute concise summaries for foundational reading. While summaries are valuable for rapid recall, they cannot build architectural intuition. When an engineer encounters an unprecedented production bug, there is no prefabricated summary available. Reading technical prose deeply is a muscle that must be exercised deliberately.',
      archivedReason: 'Unpublished Phase 1A: Not authored or approved by faculty lead. Stored for developer reference only.'
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
