/**
 * Authentication and Owner Authorization Service
 * 
 * Implements single-owner authentication for ZeroIndex with Supabase Auth:
 * - Email and password authentication
 * - Admin table verification (verifies user is registered in public.admin_users)
 * - Authenticator-app Multi-Factor Authentication (TOTP MFA via Supabase MFA API)
 * - Session persistence and verification
 * - Local simulation fallback when live Supabase credentials are not yet configured
 * 
 * Security Guard:
 * - Public registration and anonymous account creation are rejected.
 * - Admin permissions cannot be self-assigned.
 * - MFA assurance (AAL2) is required for write operations when enrolled.
 * 
 * Zero-Dash Standard: Zero em-dashes and zero en-dashes across all code and comments.
 */

import { supabase, isSupabaseConfigured } from './supabaseClient.js';

const SIMULATED_OWNER_EMAIL = 'jampana13411@gmail.com';
const SIMULATED_SESSION_KEY = 'zeroindex_simulated_admin_session';

/**
 * @typedef {Object} AdminAuthSession
 * @property {boolean} isAuthenticated - Whether a valid session exists
 * @property {boolean} isOwner - Whether the user is the verified owner
 * @property {string} email - Authenticated user email
 * @property {string} userId - User UUID
 * @property {'aal1' | 'aal2'} assuranceLevel - Current authentication assurance level
 * @property {boolean} hasMfaEnrolled - Whether TOTP MFA is enrolled
 * @property {boolean} isSimulated - Whether running in local simulation mode
 */

/**
 * Retrieve current active admin session if valid and verified.
 * @returns {Promise<AdminAuthSession>}
 */
export async function getAdminSession() {
  // 1. Live Supabase Connection
  if (isSupabaseConfigured()) {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session?.user) {
        return {
          isAuthenticated: false,
          isOwner: false,
          email: '',
          userId: '',
          assuranceLevel: 'aal1',
          hasMfaEnrolled: false,
          isSimulated: false
        };
      }

      const user = session.user;

      // Verify that this user ID exists in the admin_users table
      const { data: adminRecord, error: adminError } = await supabase
        .from('admin_users')
        .select('role')
        .eq('id', user.id)
        .single();

      if (adminError || !adminRecord || adminRecord.role !== 'owner') {
        return {
          isAuthenticated: false,
          isOwner: false,
          email: user.email || '',
          userId: user.id,
          assuranceLevel: 'aal1',
          hasMfaEnrolled: false,
          isSimulated: false
        };
      }

      // Check MFA Assurance Level
      let assuranceLevel = 'aal1';
      let hasMfaEnrolled = false;
      try {
        const { data: mfaData, error: mfaError } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
        if (!mfaError && mfaData) {
          assuranceLevel = mfaData.currentLevel || 'aal1';
        }

        const { data: factorsData, error: factorsError } = await supabase.auth.mfa.listFactors();
        if (!factorsError && factorsData?.totp?.length > 0) {
          hasMfaEnrolled = factorsData.totp.some(f => f.status === 'verified');
        }
      } catch {
        // MFA API unavailable or unconfigured
      }

      return {
        isAuthenticated: true,
        isOwner: true,
        email: user.email || '',
        userId: user.id,
        assuranceLevel,
        hasMfaEnrolled,
        isSimulated: false
      };
    } catch {
      return {
        isAuthenticated: false,
        isOwner: false,
        email: '',
        userId: '',
        assuranceLevel: 'aal1',
        hasMfaEnrolled: false,
        isSimulated: false
      };
    }
  }

  // 2. Local Simulation Mode (when Supabase credentials are not configured in .env)
  try {
    const rawStored = localStorage.getItem(SIMULATED_SESSION_KEY);
    if (rawStored) {
      const parsed = JSON.parse(rawStored);
      if (parsed?.isAuthenticated && parsed?.email === SIMULATED_OWNER_EMAIL) {
        return {
          isAuthenticated: true,
          isOwner: true,
          email: parsed.email,
          userId: 'simulated-owner-uuid-0001',
          assuranceLevel: parsed.assuranceLevel || 'aal2',
          hasMfaEnrolled: Boolean(parsed.hasMfaEnrolled),
          isSimulated: true
        };
      }
    }
  } catch {
    // Storage access error
  }

  return {
    isAuthenticated: false,
    isOwner: false,
    email: '',
    userId: '',
    assuranceLevel: 'aal1',
    hasMfaEnrolled: false,
    isSimulated: true
  };
}

/**
 * Sign in with email and password.
 * 
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ success: boolean, needsMfa?: boolean, challengeId?: string, factorId?: string, error?: string }>}
 */
export async function loginAdmin(email, password) {
  const cleanEmail = (email || '').trim().toLowerCase();

  // 1. Live Supabase Authentication
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password
      });

      if (error) {
        return { success: false, error: error.message };
      }

      const user = data.user;
      if (!user) {
        return { success: false, error: 'Authentication failed: User profile not returned.' };
      }

      // Check admin_users authorization
      const { data: adminRecord, error: adminError } = await supabase
        .from('admin_users')
        .select('role')
        .eq('id', user.id)
        .single();

      if (adminError || !adminRecord || adminRecord.role !== 'owner') {
        // Force sign out unauthorized account
        await supabase.auth.signOut();
        return {
          success: false,
          error: 'Access Denied: You are not authorized as an administrator.'
        };
      }

      // Check if MFA challenge is needed
      const { data: mfaData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
      const { data: factorsData } = await supabase.auth.mfa.listFactors();
      
      const verifiedTotp = factorsData?.totp?.find(f => f.status === 'verified');
      if (verifiedTotp && mfaData?.currentLevel === 'aal1') {
        // Create challenge
        const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
          factorId: verifiedTotp.id
        });

        if (challengeError) {
          return { success: false, error: `MFA Challenge Failed: ${challengeError.message}` };
        }

        return {
          success: false,
          needsMfa: true,
          factorId: verifiedTotp.id,
          challengeId: challengeData.id
        };
      }

      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Unexpected login error.' };
    }
  }

  // 2. Local Simulation Mode
  if (cleanEmail === SIMULATED_OWNER_EMAIL && password.length >= 6) {
    const simulated = {
      isAuthenticated: true,
      email: cleanEmail,
      assuranceLevel: 'aal2',
      hasMfaEnrolled: true,
      timestamp: Date.now()
    };
    try {
      localStorage.setItem(SIMULATED_SESSION_KEY, JSON.stringify(simulated));
    } catch {
      // Storage unavailable
    }
    return { success: true };
  }

  return {
    success: false,
    error: 'Invalid owner credentials for local simulation mode. Expected owner address: ' + SIMULATED_OWNER_EMAIL
  };
}

/**
 * Verify TOTP Multi-Factor Authentication Code.
 * 
 * @param {string} factorId
 * @param {string} challengeId
 * @param {string} code - 6-digit TOTP code
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function verifyMfaCode(factorId, challengeId, code) {
  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase.auth.mfa.verify({
        factorId,
        challengeId,
        code: (code || '').trim()
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'MFA verification failed.' };
    }
  }

  // Local simulation mode
  if (/^\d{6}$/.test((code || '').trim())) {
    return { success: true };
  }

  return { success: false, error: 'Please enter a valid 6-digit verification code.' };
}

/**
 * Enroll a new TOTP Multi-Factor Authentication Factor.
 * Returns QR code URI and secret for Google Authenticator or Authy.
 * 
 * @returns {Promise<{ success: boolean, factorId?: string, qrCode?: string, secret?: string, uri?: string, error?: string }>}
 */
export async function enrollMfaFactor() {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        issuer: 'ZeroIndex'
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return {
        success: true,
        factorId: data.id,
        qrCode: data.totp.qr_code,
        secret: data.totp.secret,
        uri: data.totp.uri
      };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to enroll MFA.' };
    }
  }

  // Simulation mode
  return {
    success: true,
    factorId: 'simulated-totp-factor-001',
    qrCode: '',
    secret: 'ZEROINDEXMFAEXAMPLERANDOMSECRETKEY2026',
    uri: 'otpauth://totp/ZeroIndex:jampana13411@gmail.com?secret=ZEROINDEXMFAEXAMPLERANDOMSECRETKEY2026&issuer=ZeroIndex'
  };
}

/**
 * Sign out of active admin session.
 * @returns {Promise<void>}
 */
export async function logoutAdmin() {
  if (isSupabaseConfigured()) {
    try {
      await supabase.auth.signOut();
    } catch {
      // Ignore sign-out error
    }
  }
  try {
    localStorage.removeItem(SIMULATED_SESSION_KEY);
  } catch {
    // Ignore storage error
  }
}
