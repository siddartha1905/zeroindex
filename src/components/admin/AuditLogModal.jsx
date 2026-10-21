import React, { useState, useEffect } from 'react';
import { X, History, Shield, CheckCircle2, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { fetchAuditLogs } from '../../services/contentRegistryService';

export const AuditLogModal = ({ isOpen, onClose }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadLogs = async () => {
    setLoading(true);
    try {
      const data = await fetchAuditLogs();
      setLogs(data || []);
    } catch {
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadLogs();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#25352D]/50 backdrop-blur-xs flex items-center justify-center p-4 text-left"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-lift border border-[#DDE2DA] relative max-h-[85vh] overflow-y-auto space-y-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="audit-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F0F1EB] hover:bg-[#E0EBDF] text-[#25352D] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between pr-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#285C49]">
              <History className="w-5 h-5 flex-shrink-0" />
              <span className="font-editorial text-2xl font-bold tracking-tight text-[#293B32]" id="audit-modal-title">
                Publishing Audit Trail
              </span>
            </div>
            <p className="font-editorial italic text-xs text-[#5F6C64]">
              Immutable log of content visibility changes and administrative writes
            </p>
          </div>

          <button
            onClick={loadLogs}
            disabled={loading}
            className="p-2 rounded-xl border border-[#DDE2DA] hover:bg-[#F7F5EF] text-[#5F6C64] transition-colors cursor-pointer"
            title="Refresh logs"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Logs List */}
        <div className="space-y-3">
          {loading ? (
            <div className="py-12 text-center text-xs text-[#5F6C64]">
              Loading audit logs...
            </div>
          ) : logs.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#5F6C64] bg-[#F7F5EF] rounded-2xl border border-[#DDE2DA]">
              No publishing actions recorded yet.
            </div>
          ) : (
            <div className="space-y-2.5">
              {logs.map((log) => {
                const isPublish = log.action === 'PUBLISH';
                return (
                  <div 
                    key={log.id} 
                    className="p-3.5 rounded-2xl bg-[#F7F5EF] border border-[#DDE2DA] flex items-center justify-between gap-4 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isPublish ? 'bg-[#E0EBDF] text-[#285C49]' : 'bg-[#F2E8DC] text-[#956A43]'
                      }`}>
                        {isPublish ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className={`font-technical font-bold text-[11px] uppercase ${
                            isPublish ? 'text-[#285C49]' : 'text-[#956A43]'
                          }`}>
                            {log.action}
                          </span>
                          <span className="font-bold text-[#25352D]">
                            {log.targetTitle || log.target_id || log.targetId}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#85928A] font-mono">
                          ID: {log.target_id || log.targetId}
                        </div>
                      </div>
                    </div>

                    <div className="text-right text-[11px] text-[#85928A] flex-shrink-0 font-mono">
                      {log.created_at ? new Date(log.created_at).toLocaleString() : log.timestamp ? new Date(log.timestamp).toLocaleString() : 'Just now'}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end border-t border-[#DDE2DA]">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#285C49] hover:bg-[#1E4738] text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default AuditLogModal;
