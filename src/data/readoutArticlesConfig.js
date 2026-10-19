/**
 * Centralized Editorial Configuration for The Readout (Pillar 04)
 * 
 * Defines schema and registry for technical publications, architectural monographs,
 * and scientific dispatches.
 * 
 * IMPORTANT: No articles are published without explicit author review and authorization.
 * Unapproved drafts are archived offline in unpublished-archive/ and must not be published here.
 */

/**
 * @typedef {Object} ArticleSource
 * @property {string} title - Title of referenced book, paper, or specification
 * @property {string} [author] - Author of the reference
 * @property {string} [publisher] - Publisher or conference venue
 * @property {string} [year] - Year of publication
 * @property {string} [url] - Verifiable external URL
 */

/**
 * @typedef {Object} ReadoutArticle
 * @property {string} slug - Unique URL-safe identifier (e.g., 'modern-microarchitecture')
 * @property {string} title - Full article headline
 * @property {string} summary - Concise editorial summary / abstract
 * @property {string} category - Primary domain (e.g., 'Hardware Architecture', 'Systems & C', 'Machine Learning')
 * @property {string} author - Author name
 * @property {string} authorRole - Author academic or professional role
 * @property {string} publishedAt - Formatted publication date (e.g., 'October 2026')
 * @property {string} readTime - Estimated reading time (e.g., '12 min read')
 * @property {'published' | 'draft' | 'under-review'} status - Publication lifecycle state
 * @property {string} content - Full article prose text (markdown or formatted text)
 * @property {ArticleSource[]} [sources] - Formal citations and references
 */

/**
 * Active published articles list.
 * Kept strictly empty until explicit author review and publication approval.
 * @type {ReadoutArticle[]}
 */
export const readoutArticles = [];

/**
 * Retrieve all published articles.
 * @returns {ReadoutArticle[]}
 */
export function getPublishedArticles() {
  return readoutArticles.filter(art => art.status === 'published');
}

/**
 * Retrieve an article by its URL slug.
 * @param {string} slug
 * @returns {ReadoutArticle | undefined}
 */
export function getArticleBySlug(slug) {
  if (!slug) return undefined;
  return readoutArticles.find(art => art.slug === slug.toLowerCase());
}

/**
 * Editorial topic categories for filtering.
 */
export const readoutCategories = [
  { id: 'all', label: 'All Dispatches' },
  { id: 'Hardware Architecture', label: 'Hardware Architecture' },
  { id: 'Systems & C', label: 'Systems & C' },
  { id: 'Machine Learning', label: 'Machine Learning' },
  { id: 'Computing History', label: 'Computing History' }
];
