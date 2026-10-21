import React, { useState, useEffect } from 'react';
import { X, Smartphone, CheckCircle2, AlertCircle, Copy, Check, ShieldCheck } from 'lucide-react';
import { enrollMfaFactor, verifyMfaCode } from '../../services/authService';

export const MfaEnrollModal = ({ isOpen, onClose, onMfaEnrolled }) => {
  const [loading, setLoading] = useState(true);
  const [enrollData, setEnrollData] = useState(null);
  const [code, setCode] = useState('');
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [copiedSecret, setCopiedSecret] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    setCode('');

    enrollMfaFactor().then((res) => {
      setLoading(false);
      if (res.success) {
        setEnrollData(res);
      } else {
        setErrorMessage(res.error || 'Failed to initialize MFA factor.');
      }
    }).catch((err) => {
      setLoading(false);
      setErrorMessage(err.message || 'MFA enrollment error.');
    });
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopySecret = () => {
    if (!enrollData?.secret) return;
    navigator.clipboard.writeText(enrollData.secret).then(() => {
      setCopiedSecret(true);
      setTimeout(() => setCopiedSecret(false), 2000);
    }).catch(() => {});
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    if (code.length !== 6) {
      setErrorMessage('Please enter the full 6-digit code from your authenticator app.');
      return;
    }

    setVerifyLoading(true);
    try {
      const res = await verifyMfaCode(enrollData?.factorId, '', code);
      if (res.success) {
        setSuccessMessage('Multi-Factor Authentication successfully enrolled and verified!');
        setTimeout(() => {
          if (onMfaEnrolled) onMfaEnrolled();
          onClose();
        }, 1500);
      } else {
        setErrorMessage(res.error || 'Invalid verification code. Please check your authenticator clock and try again.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'MFA verification failed.');
    } finally {
      setVerifyLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#25352D]/50 backdrop-blur-xs flex items-center justify-center p-4 text-left"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-lift border border-[#DDE2DA] relative space-y-6 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mfa-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F0F1EB] hover:bg-[#E0EBDF] text-[#25352D] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#285C49]">
            <Smartphone className="w-5 h-5 flex-shrink-0" />
            <span className="font-editorial text-2xl font-bold tracking-tight text-[#293B32]" id="mfa-modal-title">
              Authenticator MFA Setup
            </span>
          </div>
          <p className="font-editorial italic text-xs text-[#5F6C64]">
            Secure administrator writes with time-based one-time password (TOTP)
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-[#FDF2F2] border border-[#F5C2C2] text-xs text-[#9B2C2C] flex items-start gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div className="flex-1">{errorMessage}</div>
          </div>
        )}

        {successMessage && (
          <div className="p-3 rounded-xl bg-[#F2F7F4] border border-[#D5E3DB] text-xs text-[#285C49] flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div className="flex-1 font-bold">{successMessage}</div>
          </div>
        )}

        {loading ? (
          <div className="py-8 text-center text-xs text-[#5F6C64]">
            Generating cryptographic authenticator secret...
          </div>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            
            {/* QR Code / URI */}
            <div className="p-4 rounded-2xl bg-[#F7F5EF] border border-[#DDE2DA] space-y-3 text-center">
              <span className="font-bold text-[#25352D] text-xs block">
                1. Scan in Google Authenticator or Authy
              </span>
              
              {enrollData?.qrCode ? (
                <div className="flex justify-center py-2">
                  <img 
                    src={enrollData.qrCode} 
                    alt="Authenticator QR Code" 
                    className="w-44 h-44 rounded-xl border border-[#DDE2DA] bg-white p-2"
                  />
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-white border border-[#DDE2DA] text-[11px] text-[#5F6C64] space-y-1">
                  <p>Open your authenticator app and choose <strong>Add Account</strong>.</p>
                </div>
              )}

              {/* Secret Key Text Display */}
              <div className="space-y-1">
                <div className="text-[11px] text-[#85928A]">Or enter secret manually:</div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#DDE2DA] font-mono text-[11px] text-[#285C49]">
                  <span className="truncate">{enrollData?.secret || 'SIMULATED-MFA-KEY'}</span>
                  <button
                    type="button"
                    onClick={handleCopySecret}
                    className="ml-2 text-[#5F6C64] hover:text-[#285C49] cursor-pointer"
                  >
                    {copiedSecret ? <Check className="w-3.5 h-3.5 text-[#285C49]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Verification Code Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#25352D]" htmlFor="verify-code">
                2. Enter 6-Digit Code from App
              </label>
              <input
                id="verify-code"
                type="text"
                maxLength={6}
                autoFocus
                required
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                className="w-full text-center tracking-[0.5em] text-lg font-mono py-2.5 rounded-xl border border-[#DDE2DA] focus:border-[#285C49] focus:ring-2 focus:ring-[#285C49]/15 text-[#25352D] bg-[#FBF8F2] outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={verifyLoading || code.length !== 6}
              className="w-full py-3 px-4 rounded-xl bg-[#285C49] hover:bg-[#1E4738] text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {verifyLoading ? (
                <span>Confirming token...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify and Activate MFA</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default MfaEnrollModal;
