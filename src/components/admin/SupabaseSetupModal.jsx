import React, { useState } from 'react';
import { X, Copy, Check, Server, ShieldCheck, Database, KeyRound, ExternalLink } from 'lucide-react';

export const SupabaseSetupModal = ({ isOpen, onClose }) => {
  const [copiedEnv, setCopiedEnv] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  if (!isOpen) return null;

  const envTemplate = `# ZeroIndex Supabase Production Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key-here`;

  const ownerSqlTemplate = `-- Provision single owner in public.admin_users
INSERT INTO public.admin_users (id, email, role)
VALUES ('PASTE_USER_UUID_FROM_AUTH_USERS', 'jampana13411@gmail.com', 'owner')
ON CONFLICT (id) DO UPDATE SET role = 'owner';`;

  const handleCopyEnv = () => {
    navigator.clipboard.writeText(envTemplate).then(() => {
      setCopiedEnv(true);
      setTimeout(() => setCopiedEnv(false), 2000);
    }).catch(() => {});
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(ownerSqlTemplate).then(() => {
      setCopiedSql(true);
      setTimeout(() => setCopiedSql(false), 2000);
    }).catch(() => {});
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#25352D]/50 backdrop-blur-xs flex items-center justify-center p-4 text-left"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-lift border border-[#DDE2DA] relative max-h-[90vh] overflow-y-auto space-y-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="setup-title"
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
          <div className="flex items-center gap-2 text-[#956A43]">
            <Server className="w-5 h-5 flex-shrink-0" />
            <span className="font-editorial text-2xl font-bold tracking-tight text-[#293B32]" id="setup-title">
              Supabase Backend Setup
            </span>
          </div>
          <p className="font-editorial italic text-xs text-[#5F6C64]">
            Straightforward instructions to connect live PostgreSQL and Auth
          </p>
        </div>

        {/* Steps List */}
        <div className="space-y-5 text-xs text-[#5F6C64] leading-relaxed">
          
          {/* Step 1 */}
          <div className="p-4 rounded-2xl bg-[#F7F5EF] border border-[#DDE2DA] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#25352D] text-xs">
                Step 1: Create Supabase Project and Environment Variables
              </span>
              <button
                type="button"
                onClick={handleCopyEnv}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#285C49] hover:text-[#1E4738] cursor-pointer"
              >
                {copiedEnv ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEnv ? 'Copied' : 'Copy .env'}</span>
              </button>
            </div>
            <p>Create a project at supabase.com. Add the project URL and anon public key to .env.local:</p>
            <pre className="p-3 rounded-xl bg-white border border-[#DDE2DA] font-mono text-[11px] text-[#25352D] overflow-x-auto">
              {envTemplate}
            </pre>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-2xl bg-[#F7F5EF] border border-[#DDE2DA] space-y-2">
            <span className="font-bold text-[#25352D] text-xs block">
              Step 2: Run SQL Schema Migration
            </span>
            <p>
              In your Supabase Dashboard, open the <strong>SQL Editor</strong>, open the file:
            </p>
            <p className="font-mono text-[11px] bg-white p-2 rounded-lg border border-[#DDE2DA] text-[#285C49]">
              supabase/migrations/20261021000001_admin_content_system.sql
            </p>
            <p>
              Paste its entire content into the SQL Editor and click <strong>Run</strong>. This creates the admin_users table, content_registry, audit logs, and Row Level Security policies.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-2xl bg-[#F7F5EF] border border-[#DDE2DA] space-y-2">
            <span className="font-bold text-[#25352D] text-xs block">
              Step 3: Disable Public Registration (Mandatory Security)
            </span>
            <p>
              In Supabase Dashboard, go to <strong>Authentication &rarr; Providers &rarr; Email</strong> and turn <strong>Enable Signups</strong> to <strong>OFF</strong>. Public visitor registration must remain permanently disabled.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-2xl bg-[#F7F5EF] border border-[#DDE2DA] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#25352D] text-xs">
                Step 4: Provision Owner Administrator
              </span>
              <button
                type="button"
                onClick={handleCopySql}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#285C49] hover:text-[#1E4738] cursor-pointer"
              >
                {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSql ? 'Copied' : 'Copy SQL'}</span>
              </button>
            </div>
            <p>
              In <strong>Authentication &rarr; Users</strong>, click <strong>Add User</strong> for email <code>jampana13411@gmail.com</code> with Auto Confirm. Copy the user UUID, then run in the SQL Editor:
            </p>
            <pre className="p-3 rounded-xl bg-white border border-[#DDE2DA] font-mono text-[11px] text-[#25352D] overflow-x-auto">
              {ownerSqlTemplate}
            </pre>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#285C49] hover:bg-[#1E4738] text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Understood
          </button>
        </div>

      </div>
    </div>
  );
};

export default SupabaseSetupModal;
