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
 * Follows the official Supabase challenge and verify sequence.
 * Never submits an empty factor ID or empty challenge ID.
 * 
 * @param {string} factorId
 * @param {string} [challengeId]
 * @param {string} code - 6-digit TOTP code
 * @returns {Promise<{ success: boolean, assuranceLevel?: string, error?: string }>}
 */
export async function verifyMfaCode(factorId, challengeId, code) {
  const cleanFactorId = (factorId || '').trim();
  const cleanCode = (code || '').trim();
  let cleanChallengeId = (challengeId || '').trim();

  // Validate factor ID
  if (!cleanFactorId) {
    return {
      success: false,
      error: 'Invalid MFA Factor: Factor ID is missing or empty. Please initialize a fresh enrollment.'
    };
  }

  // Validate 6-digit numeric format
  if (!/^\d{6}$/.test(cleanCode)) {
    return {
      success: false,
      error: 'Please enter a valid 6-digit verification code.'
    };
  }

  // 1. Live Supabase Connection
  if (isSupabaseConfigured()) {
    try {
      // Step A: If no challenge ID is provided, create a real challenge first
      if (!cleanChallengeId) {
        // Try challengeAndVerify if available on the client
        if (typeof supabase.auth.mfa.challengeAndVerify === 'function') {
          const { error: cvError } = await supabase.auth.mfa.challengeAndVerify({
            factorId: cleanFactorId,
            code: cleanCode
          });

          if (!cvError) {
            // Refresh session so the JWT receives the updated AAL2 claim
            await supabase.auth.refreshSession().catch(() => {});
            const { data: aalData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
            return {
              success: true,
              assuranceLevel: aalData?.currentLevel || 'aal2'
            };
          }

          // If challengeAndVerify failed with a regular verification error, return it
          if (cvError.message && !cvError.message.toLowerCase().includes('not implemented')) {
            return { success: false, error: cvError.message };
          }
        }

        // Fallback to explicit challenge creation
        const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
          factorId: cleanFactorId
        });

        if (challengeError || !challengeData?.id) {
          return {
            success: false,
            error: challengeError?.message || 'Failed to initiate MFA challenge.'
          };
        }

        cleanChallengeId = challengeData.id;
      }

      // Step B: Verify the code with the valid challenge ID
      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId: cleanFactorId,
        challengeId: cleanChallengeId,
        code: cleanCode
      });

      if (verifyError) {
        return { success: false, error: verifyError.message };
      }

      // Step C: Refresh session so active JWT is upgraded to AAL2
      await supabase.auth.refreshSession().catch(() => {});
      const { data: aalData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

      return {
        success: true,
        assuranceLevel: aalData?.currentLevel || 'aal2'
      };
    } catch (err) {
      return { success: false, error: err.message || 'MFA verification failed.' };
    }
  }

  // 2. Simulation mode (strictly only when Supabase credentials are NOT configured)
  return { success: true, assuranceLevel: 'aal2' };
}

/**
 * Enroll a new TOTP Multi-Factor Authentication Factor.
 * Cleans up any abandoned unverified factors (ensuring exposed secrets are discarded),
 * and requests a fresh Supabase-generated QR code and secret.
 * Never removes any existing verified factors.
 * 
 * @returns {Promise<{ success: boolean, factorId?: string, qrCode?: string, secret?: string, uri?: string, error?: string }>}
 */
export async function enrollMfaFactor() {
  if (isSupabaseConfigured()) {
    try {
      // Step A: Discard any abandoned, unverified factors
      const { data: factorsData, error: listError } = await supabase.auth.mfa.listFactors();
      if (!listError && factorsData) {
        const factorList = [
          ...(factorsData.all || []),
          ...(factorsData.totp || [])
        ];
        const seenIds = new Set();
        const unverified = factorList.filter(f => {
          if (!f?.id || seenIds.has(f.id)) return false;
          seenIds.add(f.id);
          return f.status === 'unverified';
        });

        for (const factor of unverified) {
          await supabase.auth.mfa.unenroll({ factorId: factor.id }).catch(() => {});
        }
      }

      // Step B: Request completely new Supabase-generated factor
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        issuer: 'ZeroIndex'
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (!data?.id || !data?.totp?.qr_code || !data?.totp?.secret) {
        return {
          success: false,
          error: 'Supabase MFA enrollment failed: Incomplete factor details returned.'
        };
      }

      return {
        success: true,
        factorId: data.id,
        qrCode: data.totp.qr_code,
        secret: data.totp.secret,
        uri: data.totp.uri
      };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to initialize MFA factor with Supabase.' };
    }
  }

  // Simulation mode (strictly only when Supabase credentials are NOT configured)
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
