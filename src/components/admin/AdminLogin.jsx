import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  KeyRound, 
  AlertCircle, 
  ArrowLeft, 
  HelpCircle, 
  CheckCircle2, 
  Server,
  Sparkles,
  Smartphone
} from 'lucide-react';
import { ZeroIndexMark } from '../ZeroIndexMark';
import { loginAdmin, verifyMfaCode } from '../../services/authService';
import { getSupabaseConfigStatus } from '../../services/supabaseClient';
import { SupabaseSetupModal } from './SupabaseSetupModal';

export const AdminLogin = ({ onLoginSuccess, onNavigateHome }) => {
  const [email, setEmail] = useState('jampana13411@gmail.com');
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [step, setStep] = useState('credentials'); // 'credentials' | 'mfa'
  const [mfaDetails, setMfaDetails] = useState({ factorId: '', challengeId: '' });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);

  const configStatus = getSupabaseConfigStatus();

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email.trim() || !password) {
      setErrorMessage('Please provide both administrator email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await loginAdmin(email, password);
      if (res.needsMfa) {
        setMfaDetails({ factorId: res.factorId, challengeId: res.challengeId });
        setStep('mfa');
      } else if (res.success) {
        if (onLoginSuccess) onLoginSuccess();
      } else {
        setErrorMessage(res.error || 'Authentication failed. Please check your credentials.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'An unexpected error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  const handleMfaSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!mfaCode.trim() || mfaCode.trim().length !== 6) {
      setErrorMessage('Please enter the 6-digit code from your Authenticator app.');
      return;
    }

    setLoading(true);
    try {
      const res = await verifyMfaCode(mfaDetails.factorId, mfaDetails.challengeId, mfaCode);
      if (res.success) {
        if (onLoginSuccess) onLoginSuccess();
      } else {
        setErrorMessage(res.error || 'Invalid verification code. Please try again.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickSimulationLogin = () => {
    setEmail('jampana13411@gmail.com');
    setPassword('admin123');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-[#FBF8F2] flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 text-[#293B32]">
      
      {/* Top Bar with Back Link */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#5F6C64] hover:text-[#285C49] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Public Site</span>
        </button>

        <span className="font-technical text-[11px] text-[#85928A] uppercase tracking-wider">
          Owner Portal
        </span>
      </div>

      {/* Main Card Container */}
      <div className="max-w-md w-full mx-auto my-auto space-y-6">
        
        {/* Supabase Configuration Status Notice (if not yet configured) */}
        {!configStatus.isConfigured && (
          <div className="p-4 rounded-2xl bg-[#FFF9F2] border border-[#F2DEBF] space-y-2 text-left">
            <div className="flex items-start gap-2.5">
              <Server className="w-5 h-5 text-[#956A43] flex-shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <div className="font-bold text-[#25352D]">
                  Supabase Backend Configuration Required
                </div>
                <p className="text-[#5F6C64] leading-relaxed">
                  Live Supabase credentials are not set in environment variables. You can view setup steps or test in local simulation mode.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsSetupModalOpen(true)}
                    className="px-3 py-1.5 rounded-lg bg-[#956A43] hover:bg-[#7D5634] text-white font-bold text-[11px] transition-colors cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Setup Instructions</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleQuickSimulationLogin}
                    className="px-3 py-1.5 rounded-lg bg-white border border-[#DDE2DA] hover:border-[#285C49] text-[#285C49] font-bold text-[11px] transition-colors cursor-pointer"
                  >
                    Fill Simulation Credentials
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Login Box */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lift border border-[#DDE2DA] space-y-6 text-left">
          
          {/* Header */}
          <div className="space-y-2 text-center">
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-2xl bg-[#E0EBDF] flex items-center justify-center text-[#285C49]">
                <ShieldCheck className="w-6 h-6" />
              </div>
            </div>
            <h1 className="font-editorial text-2xl font-bold text-[#293B32]">
              {step === 'credentials' ? 'Owner Administration' : 'Two-Factor Authentication'}
            </h1>
            <p className="font-editorial italic text-xs text-[#5F6C64]">
              {step === 'credentials' 
                ? 'Sign in with your verified administrator account'
                : 'Enter the 6-digit verification code from your Authenticator app'}
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-[#FDF2F2] border border-[#F5C2C2] text-xs text-[#9B2C2C] flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div className="flex-1">{errorMessage}</div>
            </div>
          )}

          {/* Step 1: Credentials Form */}
          {step === 'credentials' && (
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#25352D]" htmlFor="admin-email">
                  Administrator Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#85928A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="admin-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jampana13411@gmail.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#DDE2DA] focus:border-[#285C49] focus:ring-2 focus:ring-[#285C49]/15 text-xs text-[#25352D] bg-[#FBF8F2] outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-[#25352D]" htmlFor="admin-password">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#85928A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="admin-password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#DDE2DA] focus:border-[#285C49] focus:ring-2 focus:ring-[#285C49]/15 text-xs text-[#25352D] bg-[#FBF8F2] outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-[#285C49] hover:bg-[#1E4738] text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span>Verifying credentials...</span>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Sign In to Admin Panel</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Step 2: MFA Code Verification Form */}
          {step === 'mfa' && (
            <form onSubmit={handleMfaSubmit} className="space-y-4">
              <div className="p-3 rounded-xl bg-[#F2F7F4] border border-[#D5E3DB] flex items-center gap-2.5 text-xs text-[#285C49]">
                <Smartphone className="w-4 h-4 flex-shrink-0" />
                <span>Authenticator verification required for owner security.</span>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#25352D]" htmlFor="mfa-code">
                  6-Digit Verification Code
                </label>
                <input
                  id="mfa-code"
                  type="text"
                  maxLength={6}
                  autoFocus
                  required
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="000000"
                  className="w-full text-center tracking-[0.5em] text-lg font-mono py-2.5 rounded-xl border border-[#DDE2DA] focus:border-[#285C49] focus:ring-2 focus:ring-[#285C49]/15 text-[#25352D] bg-[#FBF8F2] outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading || mfaCode.length !== 6}
                className="w-full py-3 px-4 rounded-xl bg-[#285C49] hover:bg-[#1E4738] text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span>Verifying code...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm and Enter Dashboard</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep('credentials');
                  setMfaCode('');
                  setErrorMessage('');
                }}
                className="w-full text-center text-xs text-[#5F6C64] hover:text-[#285C49] transition-colors"
              >
                Cancel and return to password
              </button>
            </form>
          )}

          {/* Notice on Single Owner Policy */}
          <div className="pt-4 border-t border-[#F0F1EB] text-center text-[11px] text-[#85928A] space-y-1">
            <p>Access is restricted strictly to the verified faculty administrator.</p>
            <p>Public registration is permanently disabled.</p>
          </div>

        </div>

      </div>

      {/* Footer Branding */}
      <div className="text-center text-xs text-[#85928A] flex items-center justify-center gap-2">
        <ZeroIndexMark size={16} />
        <span>ZeroIndex Educational Architecture</span>
      </div>

      {/* Supabase Setup Modal */}
      <SupabaseSetupModal 
        isOpen={isSetupModalOpen}
        onClose={() => setIsSetupModalOpen(false)}
      />

    </div>
  );
};

export default AdminLogin;
