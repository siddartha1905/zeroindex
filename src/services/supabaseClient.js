/**
 * Supabase Client Initialization and Configuration Service
 * 
 * Provides authenticated Supabase connectivity for the ZeroIndex Admin System.
 * Inspects runtime environment variables:
 * - VITE_SUPABASE_URL
 * - VITE_SUPABASE_ANON_KEY
 * 
 * If environment variables are not yet configured, provides honest status detection
 * and prevents false success or runtime crashes.
 * 
 * Zero-Dash Standard: Zero em-dashes and zero en-dashes across all code and comments.
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env?.VITE_SUPABASE_ANON_KEY || '';

/**
 * Determine whether valid live Supabase credentials are provided.
 * @returns {boolean}
 */
export function isSupabaseConfigured() {
  if (!supabaseUrl || !supabaseKey) {
    return false;
  }
  // Basic validation for well-formed HTTPS Supabase project URL
  if (!supabaseUrl.startsWith('https://') || !supabaseUrl.includes('supabase.co')) {
    return false;
  }
  // Check for placeholder strings or insufficient key length
  if (
    supabaseUrl.includes('your-project') || 
    supabaseKey.includes('your-anon-key') ||
    supabaseKey.includes('your-publishable-key') ||
    supabaseKey.length < 20
  ) {
    return false;
  }
  return true;
}

/**
 * Return detailed configuration status and diagnostics.
 * @returns {{ isConfigured: boolean, urlSet: boolean, keySet: boolean, maskedUrl: string }}
 */
export function getSupabaseConfigStatus() {
  const isConfigured = isSupabaseConfigured();
  const urlSet = Boolean(supabaseUrl && supabaseUrl.startsWith('https://'));
  const keySet = Boolean(supabaseKey && supabaseKey.length >= 20);
  
  let maskedUrl = 'Unconfigured';
  if (supabaseUrl) {
    try {
      const parsed = new URL(supabaseUrl);
      maskedUrl = parsed.hostname;
    } catch {
      maskedUrl = 'Invalid URL format';
    }
  }

  return {
    isConfigured,
    urlSet,
    keySet,
    maskedUrl
  };
}

/**
 * Initialize and export the Supabase client instance.
 * When unconfigured, a dummy fallback client is created with fallback storage to prevent runtime errors.
 */
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storage: window.localStorage
      }
    })
  : createClient('https://unconfigured-zeroindex.supabase.co', 'dummy-anon-key', {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      }
    });

export default supabase;
