import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Volume2, 
  Square, 
  RotateCcw, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Circle, 
  ShieldCheck, 
  Lightbulb, 
  MessageSquare, 
  Sparkles, 
  HelpCircle, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { LISTEN_RESPOND_ACTIVITY } from '../../data/atlasActivitiesData';
import { LearningNudge } from './LearningNudge';

export const ListenRespondActivity = ({ 
  onBack,
  activity = LISTEN_RESPOND_ACTIVITY 
}) => {
  // Movement navigation: 'start' | 'try' | 'next'
  const [activeMovement, setActiveMovement] = useState('start');

  // Selected situation in TRY movement
  const [selectedSituationId, setSelectedSituationId] = useState(activity.try.situations[0].id);
  const selectedSituation = activity.try.situations.find(s => s.id === selectedSituationId) || activity.try.situations[0];

  // Learner response notes (learnerNotes) stored per situation
  const [notesBySituation, setNotesBySituation] = useState({});
  const currentNotes = notesBySituation[selectedSituationId] || '';
  const learnerNotes = currentNotes;

  // Transcript visibility toggle
  const [showTranscript, setShowTranscript] = useState(false);

  // Model response reveal toggle
  const [showModelResponse, setShowModelResponse] = useState(false);

  // Speech synthesis playback state
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasPlayedAudio, setHasPlayedAudio] = useState(false);
  const [audioError, setAudioError] = useState(null);

  // Self-reflection checklist answers
  const [reflectionAnswers, setReflectionAnswers] = useState({});

  // Check speech synthesis support on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && typeof window.SpeechSynthesisUtterance !== 'undefined') {
      setIsSpeechSupported(true);
    } else {
      setIsSpeechSupported(false);
    }

    // Cancel any active speech on unmount
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
        } catch {}
      }
    };
  }, []);

  // Cancel speech when switching movement tabs
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
    setIsSpeaking(false);
  }, [activeMovement]);

  // Audio playback handler
  const handlePlayAudio = () => {
    if (!isSpeechSupported) {
      setAudioError('Speech playback is not supported by your browser. You can read the question text below to practise.');
      return;
    }

    try {
      window.speechSynthesis.cancel();
      setAudioError(null);

      const utterance = new window.SpeechSynthesisUtterance(selectedSituation.spokenText);
      utterance.rate = 0.88; // Calm, steady pace suitable for beginners
      utterance.pitch = 1.0;
      utterance.lang = 'en-GB';

      // Pick preferred English voice if available
      const voices = window.speechSynthesis.getVoices ? window.speechSynthesis.getVoices() : [];
      if (voices && voices.length > 0) {
        const preferredVoice = voices.find(v => v.lang === 'en-GB' || v.lang === 'en_GB') ||
                               voices.find(v => v.lang.startsWith('en')) ||
                               voices[0];
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        setHasPlayedAudio(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = (e) => {
        setIsSpeaking(false);
        if (e.error !== 'canceled' && e.error !== 'interrupted') {
          setAudioError('Audio playback was interrupted. You can try listening again or read the question text below.');
        }
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      setIsSpeaking(false);
      setAudioError('Unable to play audio. You can read the question text using the button below.');
    }
  };

  const handleStopAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
    setIsSpeaking(false);
  };

  // Change situation: cancel speech, reset audio states and transcript
  const handleSelectSituation = (situationId) => {
    handleStopAudio();
    setSelectedSituationId(situationId);
    setShowTranscript(false);
    setShowModelResponse(false);
    setAudioError(null);
  };

  // Update learner notes
  const handleUpdateNotes = (text) => {
    setNotesBySituation(prev => ({
      ...prev,
      [selectedSituationId]: text
    }));
  };

  // Toggle self-reflection checkbox
  const handleToggleReflection = (id) => {
    setReflectionAnswers(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Practise Again action: keep situation, reset playback, jump to TRY
  const handlePractiseAgain = () => {
    handleStopAudio();
    setShowTranscript(false);
    setShowModelResponse(false);
    setActiveMovement('try');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Practise Another Situation action: advance to next situation in sequence
  const handlePractiseAnother = () => {
    handleStopAudio();
    const currentIndex = activity.try.situations.findIndex(s => s.id === selectedSituationId);
    const nextIndex = (currentIndex + 1) % activity.try.situations.length;
    setSelectedSituationId(activity.try.situations[nextIndex].id);
    setShowTranscript(false);
    setShowModelResponse(false);
    setActiveMovement('try');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#25352D] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DDE2DA]">
          <nav className="flex items-center gap-2 text-xs font-technical text-[#5F6C64] flex-wrap">
            <button 
              onClick={onBack}
              className="hover:text-[#245B4B] transition-colors cursor-pointer flex items-center gap-1 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to English Communication</span>
            </button>
            <span className="text-[#DDE2DA]">/</span>
            <span className="text-[#496D91] font-bold">English Communication</span>
            <span className="text-[#DDE2DA]">/</span>
            <span className="text-[#25352D] font-bold">Listen &amp; Respond</span>
          </nav>

          <div className="flex items-center gap-2 font-technical text-[11px] text-[#5F6C64]">
            <span className="px-2.5 py-0.5 rounded-full bg-[#E1EAF2] text-[#496D91] font-bold">
              {activity.estimatedTime}
            </span>
            <span className="flex items-center gap-1 text-[#285C49]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Private · Zero Audio Upload</span>
            </span>
          </div>
        </div>

        {/* Title Spread */}
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E1EAF2] border border-[#496D91]/30 text-xs font-technical font-bold text-[#496D91]">
            <span>LISTENING WORKSHOP</span>
            <span>·</span>
            <span>BEGINNER TO ADVANCED</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#25352D]">
            {activity.title}
          </h1>
          <p className="font-editorial italic text-base sm:text-lg text-[#5F6C64] max-w-2xl leading-relaxed">
            "{activity.subtitle}"
          </p>
          <p className="text-xs sm:text-sm text-[#5F6C64] max-w-2xl leading-relaxed">
            {activity.objective}
          </p>
        </div>

        {/* Movement Step Navigation Pill Tabs */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-[#DDE2DA] shadow-xs">
          <button
            onClick={() => setActiveMovement('start')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-technical font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeMovement === 'start'
                ? 'bg-[#496D91] text-white shadow-soft'
                : 'text-[#5F6C64] hover:text-[#25352D] hover:bg-[#F7F5EF]'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">1</span>
            <span>START · Understand</span>
          </button>
          
          <button
            onClick={() => setActiveMovement('try')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-technical font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeMovement === 'try'
                ? 'bg-[#496D91] text-white shadow-soft'
                : 'text-[#5F6C64] hover:text-[#25352D] hover:bg-[#F7F5EF]'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">2</span>
            <span>TRY · Practise</span>
          </button>
          
          <button
            onClick={() => setActiveMovement('next')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-technical font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeMovement === 'next'
                ? 'bg-[#496D91] text-white shadow-soft'
                : 'text-[#5F6C64] hover:text-[#25352D] hover:bg-[#F7F5EF]'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">3</span>
            <span>NEXT · Improve</span>
          </button>
        </div>

        {/* START · Understand */}
        {activeMovement === 'start' && (
          <div className="space-y-6 animate-in fade-in duration-150 text-left">
            {/* Horizontal LearningNudge Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <LearningNudge
                title="Listening Nudge"
                text="Listen to understand, not just to reply."
                detail="Pay attention to the full question before deciding what you want to say."
                tone="blue"
                icon="listen"
              />
              <LearningNudge
                title="Quick Thought"
                text="Listen first. Your answer can wait a moment."
                detail="A two-second pause before answering helps you organise a thoughtful response."
                tone="amber"
                icon="pause"
              />
            </div>

            {/* The 3-Step Method Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft text-left space-y-6">
              <div className="space-y-1">
                <span className="font-technical text-xs font-bold text-[#496D91] uppercase tracking-wider block">
                  The Core Method: LISTEN {'->'} THINK {'->'} RESPOND
                </span>
                <h2 className="font-editorial text-2xl font-bold text-[#25352D]">
                  {activity.start.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#5F6C64] leading-relaxed">
                  {activity.start.description}
                </p>
              </div>

              {/* 3 Steps Flow */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activity.start.steps.map((step) => (
                  <div 
                    key={step.number}
                    className="p-5 rounded-2xl bg-[#FBF8F2] border border-[#E6E8E1] space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-technical text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#E1EAF2] text-[#496D91]">
                          Step {step.number}
                        </span>
                        <span className="font-technical text-[10px] font-bold text-[#5F6C64] uppercase tracking-wider">
                          {step.label}
                        </span>
                      </div>
                      <h3 className="font-editorial text-lg font-bold text-[#25352D]">
                        {step.heading}
                      </h3>
                      <p className="text-xs text-[#25352D] font-medium leading-relaxed">
                        {step.action}
                      </p>
                      <p className="text-xs text-[#5F6C64] leading-relaxed">
                        {step.focus}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#E6E8E1] text-[11px] text-[#496D91] font-technical italic">
                      {step.keyPrompt}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Everyday Worked Example */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#496D91]/30 shadow-soft text-left space-y-5">
              <div className="space-y-1">
                <span className="font-technical text-xs font-bold text-[#496D91] uppercase tracking-wider block">
                  Everyday Worked Example
                </span>
                <h3 className="font-editorial text-xl font-bold text-[#25352D]">
                  Question: "{activity.start.workedExample.question}"
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Incomplete response */}
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E6E8E1] space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#956A43]" />
                    <span className="font-technical text-xs font-bold text-[#956A43] uppercase tracking-wider">
                      Incomplete Response
                    </span>
                  </div>
                  <p className="font-editorial text-base text-[#25352D] font-bold">
                    "{activity.start.workedExample.incompleteResponse.text}"
                  </p>
                  <p className="text-xs text-[#5F6C64] leading-relaxed">
                    {activity.start.workedExample.incompleteResponse.critique}
                  </p>
                </div>

                {/* Clearer response */}
                <div className="p-5 rounded-2xl bg-[#DDEADD]/40 border border-[#285C49]/30 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#285C49]" />
                    <span className="font-technical text-xs font-bold text-[#285C49] uppercase tracking-wider">
                      Clearer Response
                    </span>
                  </div>
                  <p className="font-editorial text-base text-[#25352D] font-bold">
                    "{activity.start.workedExample.clearerResponse.text}"
                  </p>
                  <p className="text-xs text-[#285C49] leading-relaxed">
                    {activity.start.workedExample.clearerResponse.critique}
                  </p>
                </div>
              </div>

              {/* Takeaway banner */}
              <div className="p-4 rounded-xl bg-[#E1EAF2] border border-[#496D91]/30 text-xs text-[#25352D] font-medium flex items-center justify-between">
                <span>{activity.start.workedExample.summaryNote}</span>
                <button
                  onClick={() => setActiveMovement('try')}
                  className="px-4 py-1.5 rounded-lg bg-[#496D91] hover:bg-[#3B5B7D] text-white text-xs font-bold transition-all shadow-xs cursor-pointer inline-flex items-center gap-1 shrink-0 ml-3"
                >
                  <span>Ready to Practise</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* TRY · Practise */}
        {activeMovement === 'try' && (
          <div className="space-y-6 animate-in fade-in duration-150 text-left">
            {/* Horizontal LearningNudge Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <LearningNudge
                title="Listening Nudge"
                text="Understanding the question matters more than answering quickly."
                detail="Notice question words like what, why, when or how to keep your reply relevant."
                tone="green"
                icon="listen"
              />
              <LearningNudge
                title="Remember This"
                text="Not sure? Ask again. That is good communication."
                detail="Asking for clarification shows you value accurate understanding."
                tone="blue"
                icon="think"
              />
            </div>

            {/* Situation Selector Bar */}
            <div className="space-y-2 text-left">
              <span className="font-technical text-xs font-bold text-[#496D91] uppercase tracking-wider block">
                Choose a Listening Situation
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {activity.try.situations.map((sit) => {
                  const isSelected = sit.id === selectedSituationId;
                  return (
                    <button
                      key={sit.id}
                      onClick={() => handleSelectSituation(sit.id)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#496D91] text-white border-[#496D91] shadow-soft'
                          : 'bg-white text-[#5F6C64] hover:text-[#25352D] hover:bg-[#FAF8F5] border-[#DDE2DA]'
                      }`}
                    >
                      <span className={`font-technical text-[10px] font-bold block uppercase ${
                        isSelected ? 'text-white/80' : 'text-[#496D91]'
                      }`}>
                        Situation {sit.number}
                      </span>
                      <span className="font-editorial text-xs sm:text-sm font-bold line-clamp-1 block">
                        {sit.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Listening Studio Main Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft text-left space-y-6">
              {/* Situation Header */}
              <div className="space-y-1.5 border-b border-[#E6E8E1] pb-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-technical text-xs font-bold px-2.5 py-0.5 rounded-md bg-[#E1EAF2] text-[#496D91]">
                    Situation {selectedSituation.number}
                  </span>
                  <span className="font-technical text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#FAF8F5] border border-[#DDE2DA] text-[#5F6C64] uppercase tracking-wider">
                    {selectedSituation.category}
                  </span>
                </div>
                <h2 className="font-editorial text-2xl font-bold text-[#25352D]">
                  {selectedSituation.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#5F6C64] leading-relaxed">
                  {selectedSituation.context}
                </p>
              </div>

              {/* Audio Playback Control Center */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#F7F5EF] border border-[#E6E8E1] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="font-technical text-xs font-bold text-[#25352D] uppercase tracking-wider block">
                      Audio Playback
                    </span>
                    <p className="text-xs text-[#5F6C64]">
                      {isSpeaking 
                        ? 'Playing spoken question audio...'
                        : hasPlayedAudio 
                          ? 'Audio finished. You may listen again or proceed with your response.'
                          : 'Select the button to listen to the spoken question at a calm pace.'
                      }
                    </p>
                  </div>

                  {/* Play / Stop / Repeat Controls */}
                  <div className="flex items-center gap-2 shrink-0">
                    {isSpeaking ? (
                      <button
                        onClick={handleStopAudio}
                        className="px-5 py-2.5 rounded-xl bg-[#956A43] hover:bg-[#7D5734] text-white text-xs font-bold transition-all shadow-xs cursor-pointer inline-flex items-center gap-2"
                      >
                        <Square className="w-3.5 h-3.5 fill-current" />
                        <span>Stop Audio</span>
                      </button>
                    ) : hasPlayedAudio ? (
                      <button
                        onClick={handlePlayAudio}
                        className="px-5 py-2.5 rounded-xl bg-[#496D91] hover:bg-[#3B5B7D] text-white text-xs font-bold transition-all shadow-xs cursor-pointer inline-flex items-center gap-2"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Listen Again</span>
                      </button>
                    ) : (
                      <button
                        onClick={handlePlayAudio}
                        className="px-5 py-2.5 rounded-xl bg-[#496D91] hover:bg-[#3B5B7D] text-white text-xs font-bold transition-all shadow-xs cursor-pointer inline-flex items-center gap-2"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>Listen to Question</span>
                      </button>
                    )}

                    {/* Show/Hide Question Text Button */}
                    <button
                      onClick={() => setShowTranscript(prev => !prev)}
                      className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-[#FAF8F5] border border-[#DDE2DA] text-[#5F6C64] hover:text-[#25352D] text-xs font-technical font-semibold transition-all cursor-pointer inline-flex items-center gap-1.5"
                    >
                      {showTranscript ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{showTranscript ? 'Hide Text' : 'Show Text'}</span>
                    </button>
                  </div>
                </div>

                {/* Speech Synthesis Fallback / Error Alert */}
                {audioError && (
                  <div className="p-3.5 rounded-xl bg-[#F5EBE1] border border-[#956A43]/30 text-xs text-[#956A43] leading-relaxed">
                    {audioError}
                  </div>
                )}

                {/* Optional Transcript Display */}
                {showTranscript && (
                  <div className="p-4 rounded-xl bg-white border border-[#496D91]/30 space-y-1.5 animate-in fade-in duration-100">
                    <span className="font-technical text-[10px] font-bold text-[#496D91] uppercase tracking-wider block">
                      Spoken Question Text
                    </span>
                    <p className="font-editorial text-lg sm:text-xl font-bold text-[#25352D]">
                      "{selectedSituation.spokenText}"
                    </p>
                    <p className="text-[11px] text-[#5F6C64] italic">
                      Reading helps when needed, but real-world practice relies on listening carefully without reading first.
                    </p>
                  </div>
                )}
              </div>

              {/* Helpful Learner Guidance Box */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E6E8E1] space-y-2">
                <div className="flex items-center gap-2 text-xs font-technical font-bold text-[#25352D] uppercase tracking-wider">
                  <Lightbulb className="w-3.5 h-3.5 text-[#496D91]" />
                  <span>Before You Respond:</span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#5F6C64]">
                  {activity.try.guidance.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="font-technical text-[11px] font-bold text-[#496D91] shrink-0">{idx + 1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Response Preparation Area */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="response-notes" className="font-technical text-xs font-bold text-[#25352D] uppercase tracking-wider">
                    Your Response Notes or Keywords (Optional)
                  </label>
                  <span className="text-[11px] text-[#5F6C64] italic">
                    Hint: {selectedSituation.hint}
                  </span>
                </div>

                <textarea
                  id="response-notes"
                  value={currentNotes}
                  onChange={(e) => handleUpdateNotes(e.target.value)}
                  placeholder="Jot down keywords or your main idea here... (e.g. favourite park / peaceful trees / read quiet)"
                  rows={3}
                  className="w-full p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DDE2DA] focus:bg-white focus:border-[#496D91] focus:ring-1 focus:ring-[#496D91] text-xs sm:text-sm text-[#25352D] placeholder-[#9BA59E] transition-all resize-none outline-none font-sans"
                />

                {/* Say It Aloud Instruction Card */}
                <div className="p-4 rounded-2xl bg-[#DDEADD]/40 border border-[#285C49]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#285C49]" />
                      <span className="font-technical text-xs font-bold text-[#285C49] uppercase tracking-wider">
                        Now Say It Aloud
                      </span>
                    </div>
                    <p className="text-xs text-[#25352D] leading-relaxed">
                      Speak your response aloud with a calm, steady voice. Aim for one direct answer sentence and one helpful detail.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowModelResponse(prev => !prev)}
                    className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#FAF8F5] border border-[#285C49]/40 text-[#285C49] text-xs font-bold transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
                  >
                    <span>{showModelResponse ? 'Hide Model Response' : 'Compare with a Model Response'}</span>
                  </button>
                </div>

                {/* Model Response Accordion */}
                {showModelResponse && (
                  <div className="p-5 rounded-2xl bg-white border border-[#496D91]/40 shadow-xs space-y-2 animate-in fade-in duration-100">
                    <span className="font-technical text-[10px] font-bold text-[#496D91] uppercase tracking-wider block">
                      Sample Model Response
                    </span>
                    <p className="font-editorial text-base sm:text-lg font-bold text-[#25352D]">
                      "{selectedSituation.modelResponse}"
                    </p>
                    <p className="text-xs text-[#5F6C64] leading-relaxed">
                      Notice that this response is simple and direct. Multiple different answers can be just as good. What matters is answering directly and adding one thoughtful detail.
                    </p>
                  </div>
                )}
              </div>

              {/* Advance to NEXT button */}
              <div className="pt-2 border-t border-[#E6E8E1] flex items-center justify-between">
                <span className="text-xs text-[#5F6C64]">
                  Ready to review common listening challenges?
                </span>
                <button
                  onClick={() => {
                    handleStopAudio();
                    setActiveMovement('next');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#496D91] hover:bg-[#3B5B7D] text-white text-xs font-bold transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>Proceed to Review</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* NEXT · Improve */}
        {activeMovement === 'next' && (
          <div className="space-y-6 animate-in fade-in duration-150 text-left">
            {/* Horizontal LearningNudge Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <LearningNudge
                title="Speaking Tip"
                text="When you listen carefully, your reply becomes more relevant."
                detail="Direct answer first, followed by one helpful detail or reason."
                tone="purple"
                icon="heart"
              />
              <LearningNudge
                title="Listening Nudge"
                text="Listen to understand, not just to reply."
                detail="Take in the full message before choosing how to respond."
                tone="blue"
                icon="listen"
              />
            </div>

            {/* Common Difficulties Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft text-left space-y-6">
              <div className="space-y-1">
                <span className="font-technical text-xs font-bold text-[#496D91] uppercase tracking-wider block">
                  Practical Guidance
                </span>
                <h2 className="font-editorial text-2xl font-bold text-[#25352D]">
                  {activity.next.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#5F6C64] leading-relaxed">
                  Learn to recognise common listening difficulties and respond with calm confidence. {activity.next.description}
                </p>
              </div>

              {/* 4 Difficulties Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activity.next.commonDifficulties.map((diff) => (
                  <div 
                    key={diff.id}
                    className="p-4 sm:p-5 rounded-2xl bg-[#FBF8F2] border border-[#E6E8E1] space-y-2 text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-technical text-xs font-bold px-2 py-0.5 rounded-full bg-[#E1EAF2] text-[#496D91]">
                        Situation {diff.letter}
                      </span>
                    </div>
                    <h3 className="font-editorial text-base font-bold text-[#25352D]">
                      "{diff.situation}"
                    </h3>
                    <p className="text-xs text-[#5F6C64] leading-relaxed">
                      {diff.advice}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Polite Clarification Phrases Toolkit */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#496D91]/30 shadow-soft text-left space-y-5">
              <div className="space-y-1">
                <span className="font-technical text-xs font-bold text-[#496D91] uppercase tracking-wider block">
                  Helpful Clarification Toolkit
                </span>
                <h3 className="font-editorial text-xl font-bold text-[#25352D]">
                  Polite Phrases When You Need Someone to Repeat
                </h3>
                <p className="text-xs sm:text-sm text-[#5F6C64] leading-relaxed">
                  Confident speakers ask for repetition every day. Use these polite phrases whenever you miss a word:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activity.next.politePhrases.map((phraseItem, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E6E8E1] space-y-1 text-left"
                  >
                    <p className="font-editorial text-sm sm:text-base font-bold text-[#25352D]">
                      "{phraseItem.phrase}"
                    </p>
                    <p className="text-[11px] text-[#5F6C64] leading-relaxed">
                      {phraseItem.context}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Self-Reflection Checklist */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft text-left space-y-5">
              <div className="space-y-1">
                <span className="font-technical text-xs font-bold text-[#496D91] uppercase tracking-wider block">
                  Self-Reflection
                </span>
                <h3 className="font-editorial text-xl font-bold text-[#25352D]">
                  Quick 3-Point Reflection
                </h3>
                <p className="text-xs text-[#5F6C64]">
                  Reflect honestly on your response attempt to notice where to focus next:
                </p>
              </div>

              <div className="space-y-2.5">
                {activity.next.selfReflectionQuestions.map((q) => {
                  const isChecked = Boolean(reflectionAnswers[q.id]);
                  return (
                    <button
                      key={q.id}
                      onClick={() => handleToggleReflection(q.id)}
                      className={`w-full p-3.5 rounded-xl border text-left flex items-start gap-3 transition-colors cursor-pointer ${
                        isChecked 
                          ? 'bg-[#DDEADD]/40 border-[#285C49]/40 text-[#25352D]' 
                          : 'bg-[#FAF8F5] border-[#E6E8E1] text-[#5F6C64] hover:bg-white'
                      }`}
                    >
                      {isChecked ? (
                        <CheckCircle2 className="w-4 h-4 text-[#285C49] shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-4 h-4 text-[#9BA59E] shrink-0 mt-0.5" />
                      )}
                      <span className="text-xs sm:text-sm font-medium leading-relaxed">
                        {q.question}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Practice Again / Another Situation actions */}
              <div className="pt-4 border-t border-[#E6E8E1] flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-[#5F6C64] italic">
                  {activity.next.modelResponseNote}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePractiseAgain}
                    className="px-4 py-2 rounded-xl bg-white hover:bg-[#FAF8F5] border border-[#DDE2DA] text-[#25352D] text-xs font-bold transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Practise Again with This Situation</span>
                  </button>

                  <button
                    onClick={handlePractiseAnother}
                    className="px-4 py-2 rounded-xl bg-[#496D91] hover:bg-[#3B5B7D] text-white text-xs font-bold transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>Practise Another Situation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
