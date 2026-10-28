import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  CheckCircle2, 
  Circle, 
  BookOpen, 
  ShieldCheck, 
  MessageSquare,
  Lightbulb,
  Check,
  Sparkles,
  HelpCircle,
  Target,
  ArrowRight
} from 'lucide-react';
import { SPEAK_CLEARLY_ACTIVITY } from '../../data/atlasActivitiesData';
import { LearningNudge } from './LearningNudge';

export const SpeakClearlyActivity = ({ 
  onBack,
  activity = SPEAK_CLEARLY_ACTIVITY 
}) => {
  // Movement navigation: 'start' | 'try' | 'next'
  const [activeMovement, setActiveMovement] = useState('start');

  // Selected prompt state
  // Selected prompt state
  const [selectedPromptId, setSelectedPromptId] = useState(activity.try.prompts[0].id);
  const selectedPrompt = activity.try.prompts.find(p => p.id === selectedPromptId) || activity.try.prompts[0];

  // Custom topic input for "My Choice"
  const [customTopic, setCustomTopic] = useState('');

  // Notes state (preserved across tab switching)
  const [notes, setNotes] = useState('');

  // 60-Second Timer State
  const TOTAL_SECONDS = 60;
  const [secondsRemaining, setSecondsRemaining] = useState(TOTAL_SECONDS);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);
  const timerRef = useRef(null);

  // Clean up timer on unmount or pause
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsTimerRunning(false);
            setTimerFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isTimerRunning]);

  // Clean timer when switching prompts
  const handleSelectPrompt = (promptId) => {
    setSelectedPromptId(promptId);
    handleResetTimer();
  };

  const handleStartTimer = () => {
    if (secondsRemaining === 0) {
      setSecondsRemaining(TOTAL_SECONDS);
      setTimerFinished(false);
    }
    setIsTimerRunning(true);
  };

  const handlePauseTimer = () => {
    setIsTimerRunning(false);
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setSecondsRemaining(TOTAL_SECONDS);
    setTimerFinished(false);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Insert 4-part outline template
  const handleInsertTemplate = () => {
    const template = `Opening (10s): \nMain Idea (20s): \nExample / Reason (20s): \nConclusion (10s): `;
    setNotes(template);
  };

  // Self-check state
  const [selfCheckAnswers, setSelfCheckAnswers] = useState({});
  const toggleSelfCheck = (id) => {
    setSelfCheckAnswers(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Selected one improvement focus for next attempt
  const [selectedImprovement, setSelectedImprovement] = useState('calmer-pace');

  // Practise Again action: returns to TRY with same topic and reset timer, preserving notes
  const handlePractiseAgain = () => {
    handleResetTimer();
    setActiveMovement('try');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Practise Another Topic action: advances to next topic, resets timer and clears notes
  const handlePractiseAnotherTopic = () => {
    handleResetTimer();
    const currentIndex = activity.try.prompts.findIndex(p => p.id === selectedPromptId);
    const nextIndex = (currentIndex + 1) % activity.try.prompts.length;
    setSelectedPromptId(activity.try.prompts[nextIndex].id);
    setNotes('');
    setCustomTopic('');
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
              <span>Back to Atlas</span>
            </button>
            <span className="text-[#DDE2DA]">/</span>
            <span className="text-[#496D91] font-bold">English Communication</span>
            <span className="text-[#DDE2DA]">/</span>
            <span className="text-[#25352D] font-bold">Speak Clearly</span>
          </nav>

          <div className="flex items-center gap-2 font-technical text-[11px] text-[#5F6C64]">
            <span className="px-2.5 py-0.5 rounded-full bg-[#E1EAF2] text-[#496D91] font-bold">
              {activity.estimatedTime}
            </span>
            <span className="flex items-center gap-1 text-[#285C49]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Private</span>
            </span>
          </div>
        </div>

        {/* Title Spread */}
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E1EAF2] border border-[#496D91]/30 text-xs font-technical font-bold text-[#496D91]">
            <span>SPEAKING PRACTICE</span>
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
                title="Speaking Tip"
                text="One thought at a time is enough."
                detail="Finish one sentence before starting the next. Rushing makes ideas feel crowded."
                tone="blue"
                icon="speak"
              />
              <LearningNudge
                title="Remember This"
                text="A short pause is better than rushing."
                detail="Taking a calm breath gives your listener time to understand your message."
                tone="amber"
                icon="pause"
              />
            </div>

            {/* 3-Step Sequence Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft space-y-6">
                <div className="space-y-2">
                  <span className="font-technical text-xs font-bold uppercase tracking-wider text-[#496D91]">
                    START · Understand
                  </span>
                  <h2 className="font-editorial text-2xl font-bold text-[#25352D]">
                    {activity.start.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5F6C64] leading-relaxed max-w-2xl">
                    {activity.start.description}
                  </p>
                </div>

              {/* 3 Steps Detailed Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {activity.start.steps.map((st) => (
                  <div key={st.number} className="p-4 rounded-2xl bg-[#FBF8F2] border border-[#E6E8E1] space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-technical text-xs font-bold px-2 py-0.5 rounded-full bg-[#E1EAF2] text-[#496D91]">
                          Step {st.number}
                        </span>
                        <h3 className="font-editorial text-base font-bold text-[#25352D]">
                          {st.label}
                        </h3>
                      </div>
                      
                      <div className="space-y-1 text-xs">
                        <p className="text-[#5F6C64]">
                          <strong className="text-[#25352D]">Think:</strong> {st.thinkAbout}
                        </p>
                        <p className="text-[#5F6C64]">
                          <strong className="text-[#25352D]">Say:</strong> {st.whatToSay}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#E6E8E1] space-y-1 text-[11px]">
                      <p className="text-[#496D91] font-semibold">
                        Begin with: <span className="font-normal italic text-[#5F6C64]">{st.beginWith}</span>
                      </p>
                      <p className="p-2 rounded-lg bg-white border border-[#E6E8E1] text-[#25352D] italic">
                        "{st.example}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 60-Second Speaking Plan (4-Part Timeline) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft space-y-5">
              <div className="space-y-1 pb-3 border-b border-[#E6E8E1]">
                <div className="flex items-center gap-2 text-[#496D91]">
                  <Clock className="w-4 h-4" />
                  <span className="font-technical text-xs font-bold uppercase tracking-wider">
                    {activity.start.timingPlan.title}
                  </span>
                </div>
                <p className="text-xs text-[#5F6C64]">
                  {activity.start.timingPlan.note}
                </p>
              </div>

              {/* Horizontal Visual Timeline Bar */}
              <div className="w-full h-3 rounded-full bg-[#E6E8E1] flex overflow-hidden shadow-inner">
                <div className="bg-[#496D91] h-full" style={{ width: '16.7%' }} title="Opening: 10s" />
                <div className="bg-[#285C49] h-full" style={{ width: '33.3%' }} title="Main Idea: 20s" />
                <div className="bg-[#956A43] h-full" style={{ width: '33.3%' }} title="Example: 20s" />
                <div className="bg-[#765C90] h-full" style={{ width: '16.7%' }} title="Conclusion: 10s" />
              </div>

              {/* 4 Timing Blocks Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {activity.start.timingPlan.blocks.map((b) => (
                  <div key={b.id} className={`p-3.5 rounded-2xl border ${b.borderColor}/40 bg-[#FAF8F5] space-y-1.5`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-[11px] font-technical font-bold px-2 py-0.5 rounded-md ${b.accentBg} ${b.accentText}`}>
                        {b.duration}
                      </span>
                      <span className="text-[10px] font-technical font-semibold text-[#85928A] uppercase">
                        Part {b.id === 'opening' ? '1' : b.id === 'main-idea' ? '2' : b.id === 'example' ? '3' : '4'}
                      </span>
                    </div>
                    <h4 className="font-editorial text-sm font-bold text-[#25352D]">
                      {b.label}
                    </h4>
                    <p className="text-xs text-[#5F6C64] leading-relaxed">
                      {b.purpose}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Beginner-friendly Everyday Worked Example (Evening Walk) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#E6E8E1]">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#496D91]" />
                  <span className="font-technical text-xs font-bold uppercase tracking-wider text-[#496D91]">
                    Everyday Worked Example: {activity.start.example.topic}
                  </span>
                </div>
                <span className="font-technical text-[11px] text-[#5F6C64]">
                  Paced for 60 seconds
                </span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                {activity.start.example.parts.map((part) => {
                  const borderClasses = {
                    blue: 'border-l-4 border-l-[#496D91] bg-[#F7F9FB]',
                    green: 'border-l-4 border-l-[#285C49] bg-[#F6F9F7]',
                    amber: 'border-l-4 border-l-[#956A43] bg-[#FAF7F3]',
                    purple: 'border-l-4 border-l-[#765C90] bg-[#FAF8FB]'
                  }[part.color];

                  const badgeClasses = {
                    blue: 'text-[#496D91]',
                    green: 'text-[#285C49]',
                    amber: 'text-[#956A43]',
                    purple: 'text-[#765C90]'
                  }[part.color];

                  return (
                    <div key={part.blockId} className={`p-4 rounded-xl border border-[#E6E8E1] ${borderClasses} space-y-1`}>
                      <span className={`font-technical text-[11px] font-bold uppercase tracking-wider ${badgeClasses} block`}>
                        {part.label}
                      </span>
                      <p className="text-[#25352D] leading-relaxed">
                        "{part.text}"
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Preparation Sequence: THINK -> PLAN -> SPEAK */}
            <div className="p-6 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft space-y-4">
              <div className="flex items-center gap-2 text-[#496D91]">
                <Lightbulb className="w-4 h-4" />
                <span className="font-technical text-xs font-bold uppercase tracking-wider">
                  {activity.start.prepSequence.title}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {activity.start.prepSequence.steps.map((st, idx) => (
                  <div key={st.tag} className="p-3.5 rounded-2xl bg-[#FBF8F2] border border-[#E6E8E1] space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-technical text-xs font-bold px-2 py-0.5 rounded-md bg-[#E1EAF2] text-[#496D91]">
                        {st.tag}
                      </span>
                      <span className="text-xs font-bold text-[#25352D]">{st.label}</span>
                    </div>
                    <p className="text-xs text-[#5F6C64] leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveMovement('try')}
                  className="px-6 py-2.5 rounded-xl bg-[#496D91] hover:bg-[#3B5B7D] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-2"
                >
                  <span>Proceed to Practise</span>
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
                title="Speaking Tip"
                text="Clear speaking grows with regular practice."
                detail="Even two minutes of speaking about your day helps you build confidence."
                tone="green"
                icon="smile"
              />
              <LearningNudge
                title="Quick Thought"
                text="Simple words can express strong ideas."
                detail="Everyday words you know well are easier to follow than memorised complex phrases."
                tone="blue"
                icon="think"
              />
            </div>

            {/* Prompt Selector */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft space-y-5">
                <div className="space-y-1 pb-3 border-b border-[#E6E8E1]">
                  <span className="font-technical text-xs font-bold uppercase tracking-wider text-[#496D91]">
                    TRY · Practise
                  </span>
                  <h2 className="font-editorial text-2xl font-bold text-[#25352D]">
                    {activity.try.title}
                  </h2>
                  <p className="text-xs text-[#5F6C64] leading-relaxed">
                    {activity.try.instructions}
                  </p>
                </div>

              {/* 5 Topic Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                {activity.try.prompts.map((pr) => {
                  const isSelected = pr.id === selectedPromptId;
                  return (
                    <button
                      key={pr.id}
                      onClick={() => handleSelectPrompt(pr.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                        isSelected
                          ? 'bg-[#E1EAF2] border-[#496D91] shadow-xs'
                          : 'bg-[#FBF8F2] border-[#DDE2DA] hover:border-[#496D91]/50 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-technical uppercase font-bold text-[#496D91]">
                          {pr.category}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#496D91]" />}
                      </div>
                      <span className="text-xs font-bold text-[#25352D] leading-tight">
                        {pr.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Prompt Details with Guiding Questions */}
              <div className="p-5 rounded-2xl bg-[#F7F5EF] border border-[#E6E8E1] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-technical text-[11px] font-bold text-[#496D91] uppercase tracking-wider block">
                    Active Topic: {selectedPrompt.title}
                  </span>
                  <span className="font-technical text-[10px] text-[#69766D] bg-white px-2 py-0.5 rounded-md border border-[#DDE2DA]">
                    Category: {selectedPrompt.category}
                  </span>
                </div>
                
                <p className="font-editorial text-lg font-bold text-[#25352D]">
                  "{selectedPrompt.question}"
                </p>

                {/* Guiding Questions */}
                <div className="space-y-1.5 pt-1">
                  <span className="font-technical text-[11px] text-[#496D91] font-semibold flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Guiding Questions to Think About:</span>
                  </span>
                  <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1 text-xs text-[#5F6C64]">
                    {selectedPrompt.guidingQuestions.map((gq, idx) => (
                      <li key={idx} className="p-2 rounded-xl bg-white border border-[#E6E8E1] flex items-start gap-1.5">
                        <span className="text-[#496D91] font-bold">·</span>
                        <span>{gq}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Custom Topic Input for My Choice */}
                {selectedPrompt.id === 'my-choice' && (
                  <div className="pt-2 pb-1 space-y-1">
                    <label htmlFor="custom-topic-input" className="block text-xs font-technical font-semibold text-[#496D91]">
                      Specify Your Chosen Topic:
                    </label>
                    <input
                      id="custom-topic-input"
                      type="text"
                      value={customTopic}
                      onChange={(e) => setCustomTopic(e.target.value)}
                      placeholder="e.g. A favourite book, a memorable trip, or an interesting invention"
                      className="w-full p-2.5 rounded-xl border border-[#DDE2DA] bg-white text-xs text-[#25352D] focus:outline-none focus:ring-1 focus:ring-[#496D91]"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Preparation Notes & 60-Second Speaking Timer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Outline Preparation (7 cols) */}
              <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft space-y-4 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-technical text-xs font-bold uppercase tracking-wider text-[#496D91]">
                      1. Prepare Your Keywords
                    </span>
                    <button
                      onClick={handleInsertTemplate}
                      className="text-[11px] font-technical text-[#496D91] font-semibold hover:underline cursor-pointer"
                    >
                      + Insert 4-Part Structure
                    </button>
                  </div>
                  <p className="text-xs text-[#5F6C64] leading-relaxed">
                    Jot down two or three keywords for each part. Avoid typing a full speech: speak naturally using your notes as signposts.
                  </p>
                </div>

                <div className="space-y-1.5 flex-1">
                  <textarea
                    rows={7}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Opening (10s): How will you begin?&#10;Main Idea (20s): What is your key thought?&#10;Example / Reason (20s): One detail or memory&#10;Conclusion (10s): One clean closing sentence"
                    className="w-full p-3.5 rounded-xl border border-[#DDE2DA] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#496D91] text-xs font-mono leading-relaxed text-[#25352D] resize-none"
                    aria-label="Preparation notes for speaking practice"
                  />
                  <div className="flex items-center justify-between text-[11px] font-technical text-[#69766D]">
                    <span>Character count: {notes.length}</span>
                    {notes && (
                      <button
                        onClick={() => setNotes('')}
                        className="text-amber-700 hover:underline cursor-pointer"
                      >
                        Clear Notes
                      </button>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E6E8E1] text-[11px] text-[#5F6C64]">
                  <span>💡 Tip: Take 30 seconds to think quietly, then click Start below.</span>
                </div>
              </div>

              {/* Right Column: 60-Second Timer (5 cols) */}
              <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft space-y-5 text-center flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="font-technical text-xs font-bold uppercase tracking-wider text-[#496D91]">
                    2. 60-Second Speaking Practice
                  </span>
                  <p className="text-xs text-[#5F6C64]">
                    Speak aloud at an easy, natural pace until the timer reaches zero.
                  </p>
                </div>

                {/* Clock Face Display */}
                <div className="py-4 space-y-2">
                  <div className={`w-36 h-36 mx-auto rounded-full border-4 flex flex-col items-center justify-center transition-all ${
                    timerFinished
                      ? 'border-emerald-500 bg-emerald-50/50 text-emerald-800'
                      : isTimerRunning
                      ? 'border-[#496D91] bg-[#E1EAF2]/30 text-[#496D91] scale-105'
                      : 'border-[#DDE2DA] bg-[#FAF8F5] text-[#25352D]'
                  }`}>
                    <Clock className={`w-5 h-5 mb-1 ${isTimerRunning ? 'animate-pulse text-[#496D91]' : 'text-[#69766D]'}`} />
                    <span className="font-mono text-3xl font-bold tracking-tight">
                      {formatTime(secondsRemaining)}
                    </span>
                    <span className="text-[10px] font-technical text-[#5F6C64] uppercase tracking-wider">
                      {timerFinished ? 'Complete' : isTimerRunning ? 'Speaking...' : 'Ready'}
                    </span>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="w-48 mx-auto h-1.5 rounded-full bg-[#E6E8E1] overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${timerFinished ? 'bg-emerald-500' : 'bg-[#496D91]'}`}
                      style={{ width: `${((TOTAL_SECONDS - secondsRemaining) / TOTAL_SECONDS) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Timer Controls */}
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    {!isTimerRunning ? (
                      <button
                        onClick={handleStartTimer}
                        className="px-5 py-2.5 rounded-xl bg-[#496D91] hover:bg-[#3B5B7D] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                        aria-label="Start 60-second speaking timer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>{secondsRemaining === 0 ? 'Speak Again' : secondsRemaining < TOTAL_SECONDS ? 'Resume' : 'Start 60s'}</span>
                      </button>
                    ) : (
                      <button
                        onClick={handlePauseTimer}
                        className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                        aria-label="Pause speaking timer"
                      >
                        <Pause className="w-3.5 h-3.5 fill-current" />
                        <span>Pause</span>
                      </button>
                    )}

                    <button
                      onClick={handleResetTimer}
                      className="px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#EBE5F0] border border-[#DDE2DA] text-[#5F6C64] hover:text-[#25352D] text-xs font-bold transition-all cursor-pointer"
                      title="Reset Timer"
                      aria-label="Reset timer to 60 seconds"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {timerFinished && (
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium">
                      ✓ 60 seconds complete! Move to the next tab to review your attempt.
                    </div>
                  )}
                </div>

                {/* Privacy Assurance */}
                <p className="text-[10px] text-[#69766D] pt-2 border-t border-[#E6E8E1]">
                  🔒 {activity.try.privacyNote}
                </p>
              </div>
            </div>

              {/* Next Movement Trigger */}
              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => setActiveMovement('start')}
                  className="text-xs font-technical text-[#5F6C64] hover:underline cursor-pointer"
                >
                  ← Back to Pattern
                </button>

                <button
                  onClick={() => setActiveMovement('next')}
                  className="px-6 py-2.5 rounded-xl bg-[#496D91] hover:bg-[#3B5B7D] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-2"
                >
                  <span>Proceed to Review</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

          </div>
        )}

        {/* NEXT · Improve */}
        {activeMovement === 'next' && (
          <div className="space-y-6 animate-in fade-in duration-150 text-left">
            {/* Horizontal LearningNudge Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <LearningNudge
                title="Remember This"
                text="Progress is about steady practice."
                detail="Notice one thing to do better on your next attempt, whether it is pausing calmly or opening clearly."
                tone="purple"
                icon="heart"
              />
              <LearningNudge
                title="Speaking Tip"
                text="One thought at a time is enough."
                detail="Finish one idea before starting the next. Steady pacing creates calm confidence."
                tone="blue"
                icon="speak"
              />
            </div>

            {/* 4-Point Self-Check */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft space-y-5">
                <div className="space-y-1 pb-3 border-b border-[#E6E8E1]">
                  <div className="flex items-center justify-between">
                    <span className="font-technical text-xs font-bold uppercase tracking-wider text-[#496D91]">
                      NEXT · Improve
                    </span>
                    <span className="font-technical text-xs text-[#285C49] font-bold">
                      {Object.values(selfCheckAnswers).filter(Boolean).length} of {activity.next.selfCheckQuestions.length} Checked
                    </span>
                  </div>
                <h2 className="font-editorial text-2xl font-bold text-[#25352D]">
                  {activity.next.title}
                </h2>
                <p className="text-xs text-[#5F6C64] leading-relaxed">
                  Reflect on how your 60 seconds went. Tick the points you felt confident about:
                </p>
              </div>

              {/* 4 Questions Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activity.next.selfCheckQuestions.map((q) => {
                  const isChecked = Boolean(selfCheckAnswers[q.id]);
                  return (
                    <div
                      key={q.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => toggleSelfCheck(q.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleSelfCheck(q.id);
                        }
                      }}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                        isChecked
                          ? 'bg-[#E1EAF2]/50 border-[#496D91]'
                          : 'bg-[#FBF8F2] border-[#DDE2DA] hover:bg-white hover:border-[#496D91]/50'
                      }`}
                    >
                      <div className="pt-0.5 shrink-0 text-[#496D91]">
                        {isChecked ? (
                          <CheckCircle2 className="w-5 h-5 fill-[#496D91] text-white" />
                        ) : (
                          <Circle className="w-5 h-5 text-[#88998F]" />
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <p className={`text-xs font-bold ${isChecked ? 'text-[#496D91]' : 'text-[#25352D]'}`}>
                          {q.question}
                        </p>
                        <p className="text-[11px] text-[#5F6C64] leading-relaxed">
                          {q.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Common Speaking Difficulties with Advice (4 Situations) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft space-y-5">
              <div className="space-y-1 pb-2 border-b border-[#E6E8E1]">
                <div className="flex items-center gap-2 text-[#496D91]">
                  <HelpCircle className="w-4 h-4" />
                  <span className="font-technical text-xs font-bold uppercase tracking-wider">
                    Common Speaking Difficulties and How to Handle Them
                  </span>
                </div>
                <p className="text-xs text-[#5F6C64]">
                  Every speaker experiences these moments. Here is what to do when they happen:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {activity.next.commonDifficulties.map((diff) => (
                  <div key={diff.id} className="p-4 rounded-2xl bg-[#FBF8F2] border border-[#E6E8E1] space-y-1.5">
                    <p className="text-xs font-bold text-[#956A43] flex items-center gap-1.5">
                      <span>Situation:</span>
                      <span className="italic font-editorial text-[#25352D]">"{diff.situation}"</span>
                    </p>
                    <p className="text-xs text-[#5F6C64] leading-relaxed">
                      <strong className="text-[#285C49]">Advice:</strong> {diff.advice}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Simple Connecting Expressions */}
            <div className="p-6 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft space-y-4">
              <div className="flex items-center gap-2 text-[#496D91]">
                <MessageSquare className="w-4 h-4" />
                <span className="font-technical text-xs font-bold uppercase tracking-wider">
                  Useful Connecting Words to Help Your Flow
                </span>
              </div>
              <p className="text-xs text-[#5F6C64] leading-relaxed">
                Simple words make your ideas easy to follow. You do not need complicated vocabulary to speak clearly:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {activity.next.connectingExpressions.map((conn) => (
                  <div key={conn.word} className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E6E8E1] space-y-1">
                    <span className="font-technical text-xs font-bold text-[#496D91] block">
                      "{conn.word}"
                    </span>
                    <span className="text-[10px] text-[#85928A] uppercase font-technical block">
                      {conn.purpose}
                    </span>
                    <p className="text-[11px] text-[#25352D] italic pt-1 border-t border-[#E6E8E1]">
                      "{conn.example}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Choose ONE Improvement for Next Attempt */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft space-y-5">
              <div className="space-y-1 pb-2 border-b border-[#E6E8E1]">
                <div className="flex items-center gap-2 text-[#496D91]">
                  <Target className="w-4 h-4" />
                  <span className="font-technical text-xs font-bold uppercase tracking-wider">
                    One Improvement at a Time
                  </span>
                </div>
                <p className="text-xs text-[#5F6C64]">
                  Do not attempt to fix everything simultaneously. Choose ONE point to focus on during your next trial:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {activity.next.improvementChoices.map((imp) => {
                  const isSelected = imp.id === selectedImprovement;
                  return (
                    <button
                      key={imp.id}
                      onClick={() => setSelectedImprovement(imp.id)}
                      className={`p-3.5 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer flex items-center justify-between gap-2 ${
                        isSelected
                          ? 'bg-[#E1EAF2] border-[#496D91] text-[#496D91] font-bold shadow-xs'
                          : 'bg-[#FBF8F2] border-[#DDE2DA] text-[#25352D] hover:bg-white hover:border-[#496D91]/50'
                      }`}
                    >
                      <span>{imp.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#496D91] shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Practise Again Invitation */}
              <div className="p-4 rounded-2xl bg-[#F7F5EF] border border-[#E6E8E1] space-y-2">
                <span className="font-technical text-xs font-bold text-[#285C49] uppercase tracking-wider block">
                  {activity.next.nextExercise.title}
                </span>
                <p className="text-xs text-[#25352D] leading-relaxed">
                  {activity.next.nextExercise.instruction}
                </p>
              </div>

              {/* Honest Faculty Disclaimer */}
              <div className="p-3.5 rounded-xl bg-[#FFF9F2] border border-[#956A43]/20 text-[11px] text-[#956A43] leading-relaxed">
                💡 {activity.next.disclaimer}
              </div>

              {/* Action Buttons: Practise Again / Practise Another Topic / Return */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handlePractiseAgain}
                    className="px-6 py-2.5 rounded-xl bg-[#496D91] hover:bg-[#3B5B7D] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Practise Again</span>
                  </button>

                  <button
                    onClick={handlePractiseAnotherTopic}
                    className="px-5 py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#EBE5F0] border border-[#DDE2DA] text-[#5F6C64] hover:text-[#25352D] text-xs font-bold transition-all cursor-pointer"
                  >
                    <span>Practise Another Topic</span>
                  </button>
                </div>

                  <button
                    onClick={onBack}
                    className="px-5 py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#EBE5F0] border border-[#DDE2DA] text-[#5F6C64] hover:text-[#25352D] text-xs font-bold transition-all cursor-pointer"
                  >
                    Return to The Atlas
                  </button>
                </div>
              </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default SpeakClearlyActivity;
