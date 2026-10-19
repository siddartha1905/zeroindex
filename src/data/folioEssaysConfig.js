/**
 * Centralized Editorial Configuration for The Folio (Pillar 05)
 * 
 * Defines schema and registry for personal essays, pedagogical reflections,
 * and intellectual writing by the author.
 * 
 * IMPORTANT: No essays are published without explicit author review and authorization.
 * Unapproved drafts are archived offline in unpublished-archive/ and must not be published here.
 */

/**
 * @typedef {Object} FolioEssay
 * @property {string} slug - Unique URL-safe identifier
 * @property {string} title - Full essay title
 * @property {string} summary - Short reflective abstract
 * @property {string} category - Topic area (e.g., 'Pedagogy', 'Engineering Ethics', 'Perspectives')
 * @property {string} author - Faculty author name
 * @property {string} authorRole - Author role
 * @property {string} publishedAt - Formatted date string
 * @property {string} readTime - Reading duration
 * @property {'published' | 'draft' | 'under-review'} status - Lifecycle state
 * @property {string} content - Full essay body text
 */

/**
 * Active published essays list.
 * Kept strictly empty until explicit author authorization.
 * @type {FolioEssay[]}
 */
export const folioEssays = [];

/**
 * Retrieve all published essays.
 * @returns {FolioEssay[]}
 */
export function getPublishedEssays() {
  return folioEssays.filter(ess => ess.status === 'published');
}

/**
 * Retrieve an essay by its URL slug.
 * @param {string} slug
 * @returns {FolioEssay | undefined}
 */
export function getEssayBySlug(slug) {
  if (!slug) return undefined;
  return folioEssays.find(ess => ess.slug === slug.toLowerCase());
}

/**
 * Essay topic categories.
 */
export const folioCategories = [
  { id: 'all', label: 'All Essays' },
  { id: 'Pedagogy', label: 'Pedagogy & Teaching' },
  { id: 'Philosophy of Computing', label: 'Philosophy of Computing' },
  { id: 'Engineering Craft', label: 'Engineering Craft' }
];
