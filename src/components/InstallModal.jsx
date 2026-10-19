import React, { useState, useEffect } from 'react';
import { X, Smartphone, Check } from 'lucide-react';

export const InstallModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('android');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#25352D]/50 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-lift border border-[#DDE2DA] relative animate-in fade-in zoom-in-95 duration-150 text-left space-y-5"
        role="dialog"
        aria-modal="true"
        aria-labelledby="install-title"
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
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E0EBDF] border border-[#346C53]/30 flex items-center justify-center text-[#346C53]">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-editorial text-xl font-bold text-[#25352D]" id="install-title">
              Install ZeroIndex App
            </h3>
            <p className="text-xs text-[#5F6C64]">
              Add to your phone for instant, full-screen offline access
            </p>
          </div>
        </div>

        {/* OS Selector Tabs */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#F0F1EB] rounded-xl font-technical text-xs font-bold">
          <button
            onClick={() => setActiveTab('android')}
            className={`py-2 rounded-lg transition-all cursor-pointer ${
              activeTab === 'android'
                ? 'bg-white text-[#25352D] shadow-2xs'
                : 'text-[#5F6C64] hover:text-[#25352D]'
            }`}
          >
            Android (Chrome)
          </button>
          <button
            onClick={() => setActiveTab('ios')}
            className={`py-2 rounded-lg transition-all cursor-pointer ${
              activeTab === 'ios'
                ? 'bg-white text-[#25352D] shadow-2xs'
                : 'text-[#5F6C64] hover:text-[#25352D]'
            }`}
          >
            iPhone (Safari)
          </button>
        </div>

        {/* Step-by-Step Instructions */}
        {activeTab === 'android' ? (
          <div className="p-4 bg-[#F7F5EF] rounded-2xl border border-[#DDE2DA] space-y-3 text-xs text-[#5F6C64]">
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#245B4B] text-white font-technical font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
              <p>Open <strong>Chrome</strong> on your Android phone and navigate to <strong>zeroindex.edu</strong>.</p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#245B4B] text-white font-technical font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
              <p>Tap the <strong>three vertical dots (⋮)</strong> in the top-right corner.</p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#245B4B] text-white font-technical font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
              <p>Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</p>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-[#F7F5EF] rounded-2xl border border-[#DDE2DA] space-y-3 text-xs text-[#5F6C64]">
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#245B4B] text-white font-technical font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
              <p>Open <strong>Safari</strong> on your iPhone or iPad and navigate to <strong>zeroindex.edu</strong>.</p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#245B4B] text-white font-technical font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
              <p>Tap the <strong>Share button (box with upward arrow)</strong> on the bottom toolbar.</p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#245B4B] text-white font-technical font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
              <p>Scroll down and select <strong>"Add to Home Screen" (+)</strong>.</p>
            </div>
          </div>
        )}

        <div className="p-3 bg-[#E0EBDF]/60 border border-[#346C53]/30 rounded-xl text-xs text-[#346C53]">
          Once installed, ZeroIndex runs as an app without browser URL bars and launches instantly from your home screen.
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-[#245B4B] hover:bg-[#28755E] text-white font-bold text-xs transition-colors cursor-pointer"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default InstallModal;
