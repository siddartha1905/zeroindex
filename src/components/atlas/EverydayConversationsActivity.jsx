import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Circle, 
  ShieldCheck, 
  Lightbulb, 
  MessageSquare, 
  Sparkles, 
  HelpCircle, 
  RotateCcw, 
  BookOpen,
  Volume2,
  Square,
  Users,
  CheckSquare,
  MessageCircle,
  ThumbsUp
} from 'lucide-react';
import { EVERYDAY_CONVERSATIONS_ACTIVITY } from '../../data/atlasActivitiesData';
import { LearningNudge } from './LearningNudge';

export const EverydayConversationsActivity = ({ 
  onBack,
  activity = EVERYDAY_CONVERSATIONS_ACTIVITY 
}) => {
  // Movement navigation: 'start' | 'try' | 'next'
  const [activeMovement, setActiveMovement] = useState('start');

  // Selected situation in TRY movement
  const [selectedSituationId, setSelectedSituationId] = useState(activity.try.situations[0].id);
  const selectedSituation = activity.try.situations.find(s => s.id === selectedSituationId) || activity.try.situations[0];

  // Current stage in conversation: 1, 2, 3 (or 4 for completed summary)
  const [currentStageNumber, setCurrentStageNumber] = useState(1);
  const currentStage = selectedSituation.stages.find(st => st.stageNumber === currentStageNumber) || selectedSituation.stages[0];

  // Learner choices and inputs per situation:
  // { [situationId]: { stage1: { optionId, customText, isCustom }, stage2: ..., stage3: ... } }
  const [conversationHistory, setConversationHistory] = useState({});

  // Input mode per stage: 'guided' | 'custom'
  const [inputMode, setInputMode] = useState('guided');
  const [customReplyText, setCustomReplyText] = useState('');

  // Selected option for current stage
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  // Self-reflection checklist answers
  const [reflectionAnswers, setReflectionAnswers] = useState({});

  // NEXT movement: Selected single improvement focus
  const [selectedImprovement, setSelectedImprovement] = useState('start-more-naturally');

  // Speech synthesis states
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioError, setAudioError] = useState(null);

  // Check speech synthesis on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && typeof window.SpeechSynthesisUtterance !== 'undefined') {
      setIsSpeechSupported(true);
    } else {
      setIsSpeechSupported(false);
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
        } catch {}
      }
    };
  }, []);

  // Cancel speech on movement or situation change
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
    setIsSpeaking(false);
    setAudioError(null);
  }, [activeMovement, selectedSituationId, currentStageNumber]);

  const handlePlayAudio = (text) => {
    if (!isSpeechSupported) {
      setAudioError('Speech playback is not supported by your browser. You can read the dialogue text directly.');
      return;
    }

    try {
      window.speechSynthesis.cancel();
      setAudioError(null);

      const utterance = new window.SpeechSynthesisUtterance(text);
      utterance.rate = 0.88;
      utterance.pitch = 1.0;
      utterance.lang = 'en-GB';

      const voices = window.speechSynthesis.getVoices ? window.speechSynthesis.getVoices() : [];
      if (voices && voices.length > 0) {
        const preferredVoice = voices.find(v => v.lang === 'en-GB' || v.lang === 'en_GB') ||
                               voices.find(v => v.lang.startsWith('en')) ||
                               voices[0];
        if (preferredVoice) utterance.voice = preferredVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => {
        setIsSpeaking(false);
        setAudioError('Speech playback encountered an error. You can continue reading.');
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      setIsSpeaking(false);
      setAudioError('Speech playback could not be initiated.');
    }
  };

  const handleSelectSituation = (id) => {
    setSelectedSituationId(id);
    setCurrentStageNumber(1);
    setSelectedOptionId(null);
    setCustomReplyText('');
    setInputMode('guided');
  };

  const handleSelectOption = (optionId) => {
    setSelectedOptionId(optionId);
    setInputMode('guided');
  };

  const handleAdvanceStage = () => {
    const sitHistory = conversationHistory[selectedSituationId] || {};
    const chosenOption = currentStage.options.find(o => o.id === selectedOptionId);
    
    const stageRecord = inputMode === 'custom' && customReplyText.trim()
      ? { isCustom: true, text: customReplyText.trim(), quality: 'Independent Response' }
      : { isCustom: false, optionId: selectedOptionId, text: chosenOption?.text || '', quality: chosenOption?.quality || '' };

    setConversationHistory(prev => ({
      ...prev,
      [selectedSituationId]: {
        ...sitHistory,
        [`stage${currentStageNumber}`]: stageRecord
      }
    }));

    if (currentStageNumber < 3) {
      setCurrentStageNumber(prev => prev + 1);
      setSelectedOptionId(null);
      setCustomReplyText('');
      setInputMode('guided');
    } else {
      // Completed all 3 stages
      setCurrentStageNumber(4);
    }
  };

  const handleResetCurrentSituation = () => {
    setConversationHistory(prev => {
      const copy = { ...prev };
      delete copy[selectedSituationId];
      return copy;
    });
    setCurrentStageNumber(1);
    setSelectedOptionId(null);
    setCustomReplyText('');
    setInputMode('guided');
  };

  const handleToggleReflection = (id) => {
    setReflectionAnswers(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handlePractiseAgain = () => {
    handleResetCurrentSituation();
    setActiveMovement('try');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChooseAnotherSituation = () => {
    const currentIndex = activity.try.situations.findIndex(s => s.id === selectedSituationId);
    const nextIndex = (currentIndex + 1) % activity.try.situations.length;
    const nextSituation = activity.try.situations[nextIndex];

    handleSelectSituation(nextSituation.id);
    setActiveMovement('try');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentSitHistory = conversationHistory[selectedSituationId] || {};
  const selectedOption = currentStage?.options?.find(o => o.id === selectedOptionId);
  const isAdvanceDisabled = inputMode === 'guided' ? !selectedOptionId : !customReplyText.trim();

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#25352D] py-6 sm:py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Top Header / Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DDE2DA]">
          <nav className="flex items-center gap-2 text-xs font-technical text-[#5F6C64] flex-wrap">
            <button 
              onClick={onBack}
              className="hover:text-[#496D91] transition-colors cursor-pointer flex items-center gap-1 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to English Communication</span>
            </button>
            <span className="text-[#DDE2DA]">/</span>
            <span className="text-[#496D91] font-semibold">Everyday Conversations</span>
          </nav>

          <div className="flex items-center gap-2">
            <span className="font-technical text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-[#FAF8F5] border border-[#DDE2DA] text-[#5F6C64]">
              Owner Preview
            </span>
            <span className="font-technical text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#E1EAF2] text-[#496D91]">
              Activity 04
            </span>
            <span className="font-technical text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-[#FAF8F5] border border-[#DDE2DA] text-[#5F6C64]">
              {activity.estimatedTime}
            </span>
          </div>
        </div>

        {/* Hero Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#496D91]/30 shadow-soft text-left space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E1EAF2] border border-[#496D91]/30 text-xs font-technical font-bold text-[#496D91]">
            <Users className="w-3.5 h-3.5" />
            <span>LEARNING ACTIVITY 04</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-[#25352D]">
            {activity.title}
          </h1>
          <p className="font-editorial italic text-base sm:text-lg text-[#496D91] font-medium">
            "{activity.subtitle}"
          </p>
          <p className="text-xs sm:text-sm text-[#5F6C64] leading-relaxed max-w-3xl">
            {activity.objective} {activity.targetAudience}
          </p>
        </div>

        {/* Movement Selector Tabs: START · TRY · NEXT */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-[#DDE2DA] shadow-xs">
          <button
            onClick={() => setActiveMovement('start')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-technical font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeMovement === 'start'
                ? 'bg-[#E1EAF2] text-[#496D91] shadow-xs'
                : 'text-[#5F6C64] hover:text-[#25352D] hover:bg-[#FAF8F5]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#496D91]" />
            <span>START · Understand</span>
          </button>

          <button
            onClick={() => setActiveMovement('try')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-technical font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeMovement === 'try'
                ? 'bg-[#DDEADD] text-[#285C49] shadow-xs'
                : 'text-[#5F6C64] hover:text-[#25352D] hover:bg-[#FAF8F5]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#285C49]" />
            <span>TRY · Practise</span>
          </button>

          <button
            onClick={() => setActiveMovement('next')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-technical font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeMovement === 'next'
                ? 'bg-[#F5EBE1] text-[#956A43] shadow-xs'
                : 'text-[#5F6C64] hover:text-[#25352D] hover:bg-[#FAF8F5]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#956A43]" />
            <span>NEXT · Improve</span>
          </button>
        </div>

        {/* =====================================================================
            MOVEMENT 1: START (Understand)
        ===================================================================== */}
        {activeMovement === 'start' && (
          <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-150 text-left">
            {/* Horizontal LearningNudge Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <LearningNudge 
                icon="dialogue" 
                tone="blue" 
                tag="Conversation Tip" 
                title="Room to Speak" 
                text="A good conversation gives both people room to speak. Keep turns balanced." 
              />
              <LearningNudge 
                icon="listen" 
                tone="green" 
                tag="Listening Nudge" 
                title="Active Listening" 
                text="Listening is part of every good conversation. Understand their thought before drafting your reply." 
              />
            </div>
            
            {/* The 3-Part Conversation Method: OPEN -> CONNECT -> CLOSE */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft text-left space-y-6">
              <div className="space-y-1">
                <span className="font-technical text-xs font-bold text-[#496D91] uppercase tracking-wider block">
                  Conversational Architecture
                </span>
                <h2 className="font-editorial text-2xl font-bold text-[#25352D]">
                  {activity.start.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#5F6C64] leading-relaxed">
                  {activity.start.description}
                </p>
              </div>

              {/* Method Sequence Card Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activity.start.methodSteps.map((st) => (
                  <div 
                    key={st.tag}
                    className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#DDE2DA] space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-technical text-xs font-bold px-2 py-0.5 rounded-md bg-[#E1EAF2] text-[#496D91]">
                          Step {st.number}
                        </span>
                        <span className="font-technical text-xs font-bold text-[#25352D]">
                          {st.tag}
                        </span>
                      </div>

                      <h3 className="font-editorial text-lg font-bold text-[#25352D]">
                        {st.title}
                      </h3>

                      <p className="text-xs font-semibold text-[#496D91] leading-snug">
                        {st.heading}
                      </p>

                      <p className="text-xs text-[#5F6C64] leading-relaxed">
                        {st.summary}
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-3 border-t border-[#E6E8E1]">
                      <span className="text-[10px] font-technical uppercase font-bold text-[#717E76] block">
                        Natural Examples:
                      </span>
                      <div className="space-y-1">
                        {st.examples.map((ex, exIdx) => (
                          <div key={exIdx} className="text-[11px] font-mono text-[#25352D] bg-white p-2 rounded-lg border border-[#E6E8E1]">
                            "{ex}"
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Worked Conversation Example */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft text-left space-y-6">
              <div className="space-y-1">
                <span className="font-technical text-xs font-bold text-[#496D91] uppercase tracking-wider block">
                  Worked Example Dialogue
                </span>
                <h2 className="font-editorial text-2xl font-bold text-[#25352D]">
                  {activity.start.workedExample.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#5F6C64] leading-relaxed">
                  {activity.start.workedExample.context}
                </p>
              </div>

              {/* Dialogue Transcript Flow */}
              <div className="p-4 sm:p-6 rounded-2xl bg-[#FAF8F5] border border-[#DDE2DA] space-y-4">
                {activity.start.workedExample.turns.map((turn, tIdx) => {
                  const isAlex = turn.speaker === 'Alex';

                  return (
                    <div 
                      key={tIdx} 
                      className={`flex flex-col ${isAlex ? 'items-start' : 'items-end'} space-y-1`}
                    >
                      <div className="flex items-center gap-2 px-1">
                        <span className="font-technical text-[11px] font-bold text-[#25352D]">
                          {turn.speaker} ({turn.speakerRole})
                        </span>
                        <span className="font-technical text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#E1EAF2] text-[#496D91]">
                          {turn.badgeText}
                        </span>
                      </div>

                      <div 
                        className={`max-w-xl p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed border ${
                          isAlex 
                            ? 'bg-white border-[#DDE2DA] text-[#25352D] rounded-tl-sm' 
                            : 'bg-[#E1EAF2] border-[#496D91]/30 text-[#25352D] rounded-tr-sm'
                        }`}
                      >
                        "{turn.speech}"
                      </div>

                      <span className="text-[11px] text-[#717E76] italic px-1">
                        {turn.annotation}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Conversational Insight Banner */}
              <div className="p-4 rounded-xl bg-white border border-[#496D91]/40 flex items-start gap-3">
                <Lightbulb className="w-4 h-4 text-[#496D91] shrink-0 mt-0.5" />
                <span className="text-xs text-[#25352D] leading-relaxed font-medium">
                  {activity.start.workedExample.takeaway}
                </span>
              </div>

              {/* Advance to TRY button */}
              <div className="pt-2 border-t border-[#E6E8E1] flex justify-end">
                <button
                  onClick={() => {
                    setActiveMovement('try');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#496D91] hover:bg-[#3B5B7D] text-white text-xs font-bold transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>Proceed to Practise</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* =====================================================================
            MOVEMENT 2: TRY (Practise Real Conversations)
        ===================================================================== */}
        {activeMovement === 'try' && (
          <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-150 text-left">
            {/* Horizontal LearningNudge Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <LearningNudge 
                icon="think" 
                tone="amber" 
                tag="Conversation Tip" 
                title="Follow-up Questions" 
                text="One small follow-up question keeps things going naturally without feeling forced." 
              />
              <LearningNudge 
                icon="smile" 
                tone="blue" 
                tag="Quick Thought" 
                title="Simple Words Work" 
                text="You do not need impressive words to connect with someone. Sincerity and clarity matter most." 
              />
            </div>
            
            {/* Situation Selector Pills */}
            <div className="space-y-2 text-left">
              <span className="font-technical text-xs font-bold uppercase tracking-wider text-[#5F6C64] block px-1">
                Select an Everyday Conversation Situation:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                {activity.try.situations.map((sit) => {
                  const isSelected = sit.id === selectedSituationId;
                  const isCompleted = conversationHistory[sit.id]?.stage3;

                  return (
                    <button
                      key={sit.id}
                      onClick={() => handleSelectSituation(sit.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                        isSelected
                          ? 'bg-white border-[#496D91] shadow-soft ring-1 ring-[#496D91]'
                          : 'bg-[#FAF8F5] border-[#DDE2DA] hover:bg-white hover:border-[#496D91]/40'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className={`font-technical text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            isSelected ? 'bg-[#E1EAF2] text-[#496D91]' : 'bg-[#E6E8E1] text-[#5F6C64]'
                          }`}>
                            Situation {sit.number}
                          </span>
                          {isCompleted && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#285C49]" title="Exchange completed" />
                          )}
                        </div>
                        <h3 className="font-editorial text-xs sm:text-sm font-bold text-[#25352D] line-clamp-2">
                          {sit.title}
                        </h3>
                      </div>
                      <span className="text-[10px] font-technical text-[#717E76]">
                        {sit.category}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Conversation Workspace Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft text-left space-y-6">
              
              {/* Situation Header */}
              <div className="space-y-2 border-b border-[#E6E8E1] pb-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-technical text-xs font-bold px-2 py-0.5 rounded-md bg-[#E1EAF2] text-[#496D91]">
                      Situation {selectedSituation.number}
                    </span>
                    <span className="text-xs font-technical text-[#717E76]">
                      {selectedSituation.category}
                    </span>
                  </div>

                  {/* Stage indicator pills */}
                  <div className="flex items-center gap-1.5 text-xs font-technical">
                    <span className={`px-2 py-0.5 rounded-md ${
                      currentStageNumber === 1 ? 'bg-[#496D91] text-white font-bold' : currentStageNumber > 1 ? 'bg-[#DDEADD] text-[#285C49]' : 'bg-[#FAF8F5] text-[#717E76] border'
                    }`}>
                      1. OPEN
                    </span>
                    <span className="text-[#A5B3A9]">{'->'}</span>
                    <span className={`px-2 py-0.5 rounded-md ${
                      currentStageNumber === 2 ? 'bg-[#496D91] text-white font-bold' : currentStageNumber > 2 ? 'bg-[#DDEADD] text-[#285C49]' : 'bg-[#FAF8F5] text-[#717E76] border'
                    }`}>
                      2. CONNECT
                    </span>
                    <span className="text-[#A5B3A9]">{'->'}</span>
                    <span className={`px-2 py-0.5 rounded-md ${
                      currentStageNumber === 3 ? 'bg-[#496D91] text-white font-bold' : currentStageNumber > 3 ? 'bg-[#DDEADD] text-[#285C49]' : 'bg-[#FAF8F5] text-[#717E76] border'
                    }`}>
                      3. CLOSE
                    </span>
                  </div>
                </div>

                <h2 className="font-editorial text-2xl font-bold text-[#25352D]">
                  {selectedSituation.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#5F6C64] leading-relaxed">
                  {selectedSituation.context}
                </p>
              </div>

              {/* Conversation History / Prior Turns */}
              {currentStageNumber > 1 && (
                <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#DDE2DA] space-y-3">
                  <span className="font-technical text-[10px] font-bold text-[#717E76] uppercase tracking-wider block">
                    Conversation Progress So Far:
                  </span>
                  
                  {/* Stage 1 History */}
                  {currentSitHistory.stage1 && (
                    <div className="space-y-2 border-b border-[#E6E8E1] pb-2 text-xs">
                      <div className="text-[11px] font-technical font-semibold text-[#496D91]">
                        Turn 1 · OPEN:
                      </div>
                      <div className="pl-2 border-l-2 border-[#DDE2DA] space-y-1">
                        <p className="text-[#5F6C64]">
                          <strong>{selectedSituation.stages[0].partnerName}: </strong>
                          "{selectedSituation.stages[0].partnerSpeech}"
                        </p>
                        <p className="text-[#25352D]">
                          <strong>You: </strong>
                          "{currentSitHistory.stage1.text}"
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Stage 2 History */}
                  {currentSitHistory.stage2 && (
                    <div className="space-y-2 border-b border-[#E6E8E1] pb-2 text-xs">
                      <div className="text-[11px] font-technical font-semibold text-[#496D91]">
                        Turn 2 · CONNECT:
                      </div>
                      <div className="pl-2 border-l-2 border-[#DDE2DA] space-y-1">
                        <p className="text-[#5F6C64]">
                          <strong>{selectedSituation.stages[1].partnerName}: </strong>
                          "{selectedSituation.stages[1].partnerSpeech}"
                        </p>
                        <p className="text-[#25352D]">
                          <strong>You: </strong>
                          "{currentSitHistory.stage2.text}"
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* CURRENT ACTIVE STAGE (Stages 1, 2, or 3) */}
              {currentStageNumber <= 3 ? (
                <div className="space-y-5 animate-in fade-in duration-150">
                  
                  {/* Partner Conversational Turn Bubble */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#E1EAF2]/30 border border-[#496D91]/30 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-[#496D91]" />
                        <span className="font-technical text-xs font-bold text-[#496D91] uppercase tracking-wider">
                          {currentStage.phaseLabel}
                        </span>
                      </div>

                      <button
                        onClick={() => handlePlayAudio(currentStage.partnerSpeech)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-technical font-semibold transition-all cursor-pointer inline-flex items-center gap-1.5 self-start sm:self-auto ${
                          isSpeaking 
                            ? 'bg-[#496D91] text-white border-[#496D91]' 
                            : 'bg-white hover:bg-[#FAF8F5] text-[#496D91] border-[#496D91]/40 shadow-xs'
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{isSpeaking ? 'Playing...' : 'Hear This Line'}</span>
                      </button>
                    </div>

                    <p className="text-xs text-[#5F6C64] italic">
                      {currentStage.promptDescription}
                    </p>

                    <div className="p-4 rounded-xl bg-white border border-[#496D91]/20 space-y-1">
                      <span className="font-technical text-[10px] font-bold text-[#717E76] uppercase">
                        {currentStage.partnerName} says:
                      </span>
                      <p className="font-editorial text-lg sm:text-xl font-bold text-[#25352D]">
                        "{currentStage.partnerSpeech}"
                      </p>
                    </div>

                    {audioError && (
                      <p className="text-xs text-[#8C3A3A] italic">
                        {audioError}
                      </p>
                    )}
                  </div>

                  {/* Mode Toggle: Choose Guided Reply vs Write Own Reply */}
                  <div className="flex items-center justify-between pt-1">
                    <label className="font-technical text-xs font-bold uppercase tracking-wider text-[#25352D]">
                      Your Response:
                    </label>

                    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#FAF8F5] border border-[#DDE2DA]">
                      <button
                        onClick={() => setInputMode('guided')}
                        className={`px-3 py-1 rounded-lg text-xs font-technical font-bold transition-all cursor-pointer ${
                          inputMode === 'guided' 
                            ? 'bg-[#496D91] text-white shadow-xs' 
                            : 'text-[#5F6C64] hover:text-[#25352D]'
                        }`}
                      >
                        Choose Guided Reply
                      </button>
                      <button
                        onClick={() => setInputMode('custom')}
                        className={`px-3 py-1 rounded-lg text-xs font-technical font-bold transition-all cursor-pointer ${
                          inputMode === 'custom' 
                            ? 'bg-[#496D91] text-white shadow-xs' 
                            : 'text-[#5F6C64] hover:text-[#25352D]'
                        }`}
                      >
                        Write Your Own
                      </button>
                    </div>
                  </div>

                  {/* Option Mode 1: Guided Options */}
                  {inputMode === 'guided' && (
                    <div className="space-y-3">
                      {currentStage.options.map((opt) => {
                        const isSelected = selectedOptionId === opt.id;

                        return (
                          <div
                            key={opt.id}
                            onClick={() => handleSelectOption(opt.id)}
                            className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer text-left space-y-2 ${
                              isSelected
                                ? 'bg-white border-[#496D91] shadow-soft ring-1 ring-[#496D91]'
                                : 'bg-[#FAF8F5] border-[#DDE2DA] hover:bg-white hover:border-[#496D91]/40'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {isSelected ? (
                                  <CheckCircle2 className="w-4 h-4 text-[#496D91]" />
                                ) : (
                                  <Circle className="w-4 h-4 text-[#717E76]" />
                                )}
                                <span className={`font-technical text-xs font-bold px-2 py-0.5 rounded-md ${
                                  opt.isRecommended ? 'bg-[#DDEADD] text-[#285C49]' : 'bg-[#E6E8E1] text-[#5F6C64]'
                                }`}>
                                  {opt.quality}
                                </span>
                              </div>
                            </div>

                            <p className="font-editorial text-base sm:text-lg font-bold text-[#25352D]">
                              "{opt.text}"
                            </p>

                            {/* Pedagogical Feedback */}
                            {isSelected && (
                              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E6E8E1] text-xs text-[#5F6C64] leading-relaxed animate-in fade-in duration-100">
                                <strong className="text-[#25352D] font-semibold">Conversational Insight: </strong>
                                {opt.feedback}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Option Mode 2: Write Own Reply */}
                  {inputMode === 'custom' && (
                    <div className="space-y-3">
                      <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DDE2DA] text-xs text-[#5F6C64] leading-relaxed">
                        <strong className="text-[#25352D] font-semibold">Independent practice: </strong>
                        Draft your reply in your own words. You can compare it with the guided options afterward. Antigravity does not automatically assess free-form text.
                      </div>

                      <textarea
                        value={customReplyText}
                        onChange={(e) => setCustomReplyText(e.target.value)}
                        placeholder={currentStage.freeTextPlaceholder}
                        rows={3}
                        className="w-full p-3.5 rounded-xl bg-white border border-[#DDE2DA] focus:border-[#496D91] focus:ring-1 focus:ring-[#496D91] text-xs sm:text-sm text-[#25352D] placeholder-[#9BA59E] transition-all resize-none outline-none font-sans"
                      />

                      {customReplyText.trim() && (
                        <div className="p-3.5 rounded-xl bg-[#DDEADD]/30 border border-[#285C49]/30 text-xs text-[#285C49] font-medium">
                          Your response is ready. Say it aloud before continuing to the next turn!
                        </div>
                      )}
                    </div>
                  )}

                  {/* Say it aloud instruction */}
                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DDE2DA] flex items-center justify-between text-xs text-[#5F6C64]">
                    <span>
                      <strong className="text-[#25352D]">Speaking Tip: </strong>
                      Say your chosen reply aloud with natural eye contact and friendly rhythm.
                    </span>
                    <ShieldCheck className="w-4 h-4 text-[#285C49] shrink-0 ml-2" />
                  </div>

                  {/* Navigation to next turn */}
                  <div className="pt-3 border-t border-[#E6E8E1] flex items-center justify-between">
                    <button
                      onClick={handleResetCurrentSituation}
                      className="text-xs font-technical text-[#717E76] hover:text-[#8C3A3A] transition-colors cursor-pointer inline-flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Start situation over</span>
                    </button>

                    <button
                      onClick={handleAdvanceStage}
                      disabled={isAdvanceDisabled}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs inline-flex items-center gap-1.5 ${
                        isAdvanceDisabled
                          ? 'bg-[#E6E8E1] text-[#A5B3A9] cursor-not-allowed'
                          : 'bg-[#496D91] hover:bg-[#3B5B7D] text-white cursor-pointer'
                      }`}
                    >
                      <span>{currentStageNumber === 3 ? 'Complete Conversation' : 'Continue to Next Turn'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              ) : (
                /* STAGE 4: COMPLETED EXCHANGE SUMMARY */
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#DDEADD]/40 border border-[#285C49]/30 space-y-2 text-left">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#285C49]" />
                      <h3 className="font-editorial text-xl font-bold text-[#285C49]">
                        Conversation Successfully Completed!
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-[#25352D] leading-relaxed">
                      You guided this exchange through OPEN, CONNECT, and CLOSE. Notice how each turn kept the communication positive, respectful, and balanced.
                    </p>
                  </div>

                  {/* Full conversation transcript summary */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F5] border border-[#DDE2DA] space-y-4">
                    <span className="font-technical text-xs font-bold uppercase tracking-wider text-[#496D91] block">
                      Full Conversation Transcript
                    </span>

                    {selectedSituation.stages.map((st, idx) => {
                      const userTurn = currentSitHistory[`stage${st.stageNumber}`];

                      return (
                        <div key={idx} className="space-y-2.5 pb-4 border-b border-[#E6E8E1] last:border-b-0 last:pb-0">
                          <span className="font-technical text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#E1EAF2] text-[#496D91] inline-block">
                            {st.phaseLabel}
                          </span>

                          <div className="space-y-2 pl-3 border-l-2 border-[#496D91]/30 text-xs sm:text-sm leading-relaxed">
                            <p className="text-[#5F6C64]">
                              <strong className="text-[#25352D]">{st.partnerName}: </strong>
                              "{st.partnerSpeech}"
                            </p>
                            <p className="text-[#25352D] bg-white p-3 rounded-xl border border-[#E6E8E1]">
                              <strong className="text-[#496D91]">You: </strong>
                              "{userTurn?.text || 'No response recorded'}"
                              <span className="block text-[11px] text-[#717E76] font-technical mt-1">
                                {userTurn?.quality}
                              </span>
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Action buttons after completion */}
                  <div className="pt-2 border-t border-[#E6E8E1] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <button
                      onClick={handleResetCurrentSituation}
                      className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#FAF8F5] border border-[#DDE2DA] text-xs font-bold text-[#5F6C64] transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5 self-start sm:self-auto"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Practise This Situation Again</span>
                    </button>

                    <button
                      onClick={() => {
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
              )}

            </div>

          </div>
        )}

        {/* =====================================================================
            MOVEMENT 3: NEXT (Improve)
        ===================================================================== */}
        {activeMovement === 'next' && (
          <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-150 text-left">
            {/* Horizontal LearningNudge Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <LearningNudge 
                icon="heart" 
                tone="purple" 
                tag="Speaking Tip" 
                title="Warm Closings" 
                text="Polite closings leave a lasting positive impression. A simple thank you or well-wish goes a long way." 
              />
              <LearningNudge 
                icon="pause" 
                tone="green" 
                tag="Quick Thought" 
                title="Natural Pace" 
                text="A natural pause gives the other person a chance to add something if they wish." 
              />
            </div>
            
            {/* Practical Guidance on 4 Difficulties */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft text-left space-y-6">
              <div className="space-y-1">
                <span className="font-technical text-xs font-bold text-[#496D91] uppercase tracking-wider block">
                  Practical Guidance
                </span>
                <h2 className="font-editorial text-2xl font-bold text-[#25352D]">
                  {activity.next.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#5F6C64] leading-relaxed">
                  Learn to recognise common conversational hurdles and keep interactions friendly and balanced. {activity.next.description}
                </p>
              </div>

              {/* 4 Difficulties Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activity.next.commonDifficulties.map((diff) => (
                  <div 
                    key={diff.id}
                    className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#DDE2DA] space-y-2 text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-technical text-xs font-bold px-2 py-0.5 rounded-md bg-[#E1EAF2] text-[#496D91]">
                        Challenge {diff.letter}
                      </span>
                    </div>

                    <h3 className="font-editorial text-base font-bold text-[#25352D]">
                      "{diff.situation}"
                    </h3>

                    <p className="text-xs sm:text-sm text-[#5F6C64] leading-relaxed">
                      <strong className="text-[#25352D] font-semibold">Advice: </strong>
                      {diff.advice}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Conversation Toolkit */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft text-left space-y-6">
              <div className="space-y-1">
                <span className="font-technical text-xs font-bold text-[#496D91] uppercase tracking-wider block">
                  Toolkit of Useful Phrases
                </span>
                <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#25352D]">
                  Everyday Conversational Expressions
                </h2>
                <p className="text-xs sm:text-sm text-[#5F6C64] leading-relaxed">
                  Keep these simple sentence starters handy for daily conversations:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {activity.next.toolkitCategories.map((cat, cIdx) => (
                  <div key={cIdx} className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#DDE2DA] space-y-2">
                    <span className="font-technical text-xs font-bold text-[#496D91] uppercase tracking-wider block">
                      {cat.title}
                    </span>
                    <div className="space-y-1.5">
                      {cat.phrases.map((phrase, pIdx) => (
                        <div key={pIdx} className="text-[11px] font-mono text-[#25352D] bg-white p-2 rounded-lg border border-[#E6E8E1]">
                          "{phrase}"
                        </div>
                      ))}
                    </div>
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
                <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#25352D]">
                  Did You Participate Naturally?
                </h2>
                <p className="text-xs sm:text-sm text-[#5F6C64] leading-relaxed">
                  Reflect on your conversation. Check off each quality you applied:
                </p>
              </div>

              <div className="space-y-2.5">
                {activity.next.selfReflectionQuestions.map((q) => {
                  const isChecked = Boolean(reflectionAnswers[q.id]);

                  return (
                    <button
                      key={q.id}
                      onClick={() => handleToggleReflection(q.id)}
                      className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isChecked
                          ? 'bg-[#DDEADD]/30 border-[#285C49]/40 text-[#25352D]'
                          : 'bg-[#FAF8F5] border-[#DDE2DA] text-[#5F6C64] hover:bg-white'
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-medium">
                        {q.question}
                      </span>
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-[#285C49] shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-[#717E76] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* One Improvement at a Time Selection */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft text-left space-y-5">
              <div className="space-y-1">
                <span className="font-technical text-xs font-bold text-[#496D91] uppercase tracking-wider block">
                  Focused Improvement
                </span>
                <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#25352D]">
                  Choose ONE Focus for Your Next Conversation
                </h2>
                <p className="text-xs sm:text-sm text-[#5F6C64] leading-relaxed">
                  Real conversational ease comes from steady practice and one small adjustment at a time:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {activity.next.improvementChoices.map((choice) => {
                  const isSelected = selectedImprovement === choice.id;

                  return (
                    <button
                      key={choice.id}
                      onClick={() => setSelectedImprovement(choice.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                        isSelected
                          ? 'bg-[#E1EAF2] border-[#496D91] text-[#25352D] font-semibold shadow-xs ring-1 ring-[#496D91]'
                          : 'bg-[#FAF8F5] border-[#DDE2DA] text-[#5F6C64] hover:bg-white hover:text-[#25352D]'
                      }`}
                    >
                      {isSelected ? (
                        <CheckCircle2 className="w-4 h-4 text-[#496D91] shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-[#717E76] shrink-0" />
                      )}
                      <span className="text-xs">{choice.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons: Practise Again / Choose Another Situation */}
              <div className="pt-4 border-t border-[#E6E8E1] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs text-[#5F6C64]">
                  Practice real exchanges with calm presence and active curiosity.
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={handlePractiseAgain}
                    className="px-4 py-2.5 rounded-xl bg-[#496D91] hover:bg-[#3B5B7D] text-white text-xs font-bold transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Practise Again</span>
                  </button>

                  <button
                    onClick={handleChooseAnotherSituation}
                    className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#FAF8F5] border border-[#496D91]/40 text-[#496D91] text-xs font-bold transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>Choose Another Situation</span>
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
