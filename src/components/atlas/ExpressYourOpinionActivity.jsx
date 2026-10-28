import React, { useState } from 'react';
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
  Scale,
  Smile,
  Compass,
  CheckSquare,
  Square
} from 'lucide-react';
import { EXPRESS_YOUR_OPINION_ACTIVITY } from '../../data/atlasActivitiesData';
import { LearningNudge } from './LearningNudge';

export const ExpressYourOpinionActivity = ({ 
  onBack,
  activity = EXPRESS_YOUR_OPINION_ACTIVITY 
}) => {
  // Movement navigation: 'start' | 'try' | 'next'
  const [activeMovement, setActiveMovement] = useState('start');

  // Selected topic in TRY movement
  const [selectedTopicId, setSelectedTopicId] = useState(activity.try.topics[0].id);
  const selectedTopic = activity.try.topics.find(t => t.id === selectedTopicId) || activity.try.topics[0];

  // Selected stance per topic: { [topicId]: 'Agree' | 'Disagree' | 'It Depends' | null }
  const [selectedStances, setSelectedStances] = useState({});
  const currentStance = selectedStances[selectedTopicId] || null;

  // Learner response outline notes (stored per topic)
  const [notesByTopic, setNotesByTopic] = useState({});
  const currentNotes = notesByTopic[selectedTopicId] || '';
  const learnerNotes = currentNotes;

  // Example response reveal toggle
  const [showExampleResponse, setShowExampleResponse] = useState(false);

  // START movement active viewpoint tab ('A' or 'B')
  const [activeWorkedViewpoint, setActiveWorkedViewpoint] = useState('A');

  // NEXT movement: Self-reflection checklist answers
  const [reflectionAnswers, setReflectionAnswers] = useState({});

  // NEXT movement: Selected single improvement focus
  const [selectedImprovement, setSelectedImprovement] = useState('clearer-opinion');

  const handleSelectStance = (stance) => {
    setSelectedStances(prev => ({
      ...prev,
      [selectedTopicId]: prev[selectedTopicId] === stance ? null : stance
    }));
  };

  const handleUpdateNotes = (text) => {
    setNotesByTopic(prev => ({
      ...prev,
      [selectedTopicId]: text
    }));
  };

  const handleInsertTemplate = () => {
    const template = `My opinion: \nMy reason: \nMy example: \nAnother viewpoint I can acknowledge (optional): `;
    if (!currentNotes.trim()) {
      handleUpdateNotes(template);
    } else {
      handleUpdateNotes(`${currentNotes}\n\n${template}`);
    }
  };

  const handleToggleReflection = (id) => {
    setReflectionAnswers(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handlePractiseAgain = () => {
    setShowExampleResponse(false);
    setActiveMovement('try');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChooseAnotherTopic = () => {
    const currentIndex = activity.try.topics.findIndex(t => t.id === selectedTopicId);
    const nextIndex = (currentIndex + 1) % activity.try.topics.length;
    const nextTopic = activity.try.topics[nextIndex];
    
    setSelectedTopicId(nextTopic.id);
    setShowExampleResponse(false);
    setActiveMovement('try');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
            <span className="text-[#496D91] font-semibold">Express Your Opinion</span>
          </nav>

          <div className="flex items-center gap-2">
            <span className="font-technical text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-[#FAF8F5] border border-[#DDE2DA] text-[#5F6C64]">
              Owner Preview
            </span>
            <span className="font-technical text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#E1EAF2] text-[#496D91]">
              Activity 03
            </span>
            <span className="font-technical text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-[#FAF8F5] border border-[#DDE2DA] text-[#5F6C64]">
              {activity.estimatedTime}
            </span>
          </div>
        </div>

        {/* Hero Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#496D91]/30 shadow-soft text-left space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E1EAF2] border border-[#496D91]/30 text-xs font-technical font-bold text-[#496D91]">
            <Scale className="w-3.5 h-3.5" />
            <span>LEARNING ACTIVITY 03</span>
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

        {/* START · Understand */}
        {activeMovement === 'start' && (
          <div className="space-y-6 animate-in fade-in duration-150 text-left">
            {/* Horizontal LearningNudge Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <LearningNudge
                title="Remember This"
                text="An opinion becomes clearer when you explain why."
                detail="A single honest reason with 'because' gives your viewpoint real weight."
                tone="blue"
                icon="think"
              />
              <LearningNudge
                title="Quick Thought"
                text="You can disagree without being unkind."
                detail="Challenging an idea politely keeps conversations open and respectful."
                tone="green"
                icon="heart"
              />
            </div>

            {/* Stating vs Supporting an Opinion */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft text-left space-y-6">
              <div className="space-y-1">
                <span className="font-technical text-xs font-bold text-[#496D91] uppercase tracking-wider block">
                  Core Foundation
                </span>
                <h2 className="font-editorial text-2xl font-bold text-[#25352D]">
                  {activity.start.contrastExample.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#5F6C64] leading-relaxed">
                  {activity.start.description}
                </p>
              </div>

              {/* Side-by-side Comparison Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Basic Statement */}
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#DDE2DA] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-technical text-xs font-bold px-2 py-0.5 rounded-md bg-[#F1E5E5] text-[#8C3A3A]">
                      Basic Statement
                    </span>
                    <span className="text-[11px] font-technical text-[#717E76]">Needs Support</span>
                  </div>
                  <p className="font-editorial text-base sm:text-lg font-bold text-[#25352D] italic">
                    "{activity.start.contrastExample.basicStatement.text}"
                  </p>
                  <p className="text-xs text-[#5F6C64] leading-relaxed border-t border-[#E6E8E1] pt-2">
                    {activity.start.contrastExample.basicStatement.critique}
                  </p>
                </div>

                {/* Improved Statement */}
                <div className="p-5 rounded-2xl bg-[#E1EAF2]/30 border border-[#496D91]/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-technical text-xs font-bold px-2 py-0.5 rounded-md bg-[#DDEADD] text-[#285C49]">
                      Improved Statement
                    </span>
                    <span className="text-[11px] font-technical text-[#285C49] font-medium">Thoughtful and Clear</span>
                  </div>
                  <p className="font-editorial text-base sm:text-lg font-bold text-[#25352D] italic">
                    "{activity.start.contrastExample.improvedStatement.text}"
                  </p>
                  <p className="text-xs text-[#5F6C64] leading-relaxed border-t border-[#E6E8E1] pt-2">
                    {activity.start.contrastExample.improvedStatement.critique}
                  </p>
                </div>
              </div>

              {/* Takeaway banner */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DDE2DA] flex items-start gap-3">
                <Lightbulb className="w-4 h-4 text-[#496D91] shrink-0 mt-0.5" />
                <span className="text-xs text-[#25352D] leading-relaxed font-medium">
                  {activity.start.contrastExample.takeaway}
                </span>
              </div>
            </div>

            {/* Visual Teaching Element: Flow Diagram */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft text-left space-y-6">
              <div className="space-y-1">
                <span className="font-technical text-xs font-bold text-[#496D91] uppercase tracking-wider block">
                  Flow Diagram
                </span>
                <h2 className="font-editorial text-2xl font-bold text-[#25352D]">
                  {activity.start.flowDiagram.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#5F6C64] leading-relaxed">
                  Use this four-step sequence to organise any opinion. You do not need to memorize every sentence, just follow the natural flow:
                </p>
              </div>

              {/* Flow Steps: OPINION -> REASON -> EXAMPLE -> RESPECT */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {activity.start.flowDiagram.steps.map((st, idx) => (
                  <div 
                    key={st.tag} 
                    className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#DDE2DA] space-y-3 relative flex flex-col justify-between"
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
                      
                      <h3 className="font-editorial text-base font-bold text-[#25352D]">
                        {st.label}
                      </h3>
                      
                      <p className="text-xs text-[#5F6C64] leading-relaxed">
                        {st.summary}
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-[#E6E8E1]">
                      <span className="text-[10px] font-technical uppercase font-bold text-[#717E76] block">
                        Sentence Starters:
                      </span>
                      <div className="space-y-1">
                        {st.sentenceStarters.slice(0, 2).map((starter, sIdx) => (
                          <span key={sIdx} className="block text-[11px] font-mono text-[#496D91] bg-white px-2 py-0.5 rounded border border-[#E6E8E1]">
                            {starter}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Everyday Worked Example Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft text-left space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="font-technical text-xs font-bold text-[#496D91] uppercase tracking-wider block">
                    Worked Example
                  </span>
                  <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#25352D]">
                    "{activity.start.workedExample.topic}"
                  </h2>
                </div>

                {/* Perspective Toggle Buttons */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#FAF8F5] border border-[#DDE2DA] shrink-0 self-start sm:self-auto">
                  <button
                    onClick={() => setActiveWorkedViewpoint('A')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-technical font-bold transition-all cursor-pointer ${
                      activeWorkedViewpoint === 'A'
                        ? 'bg-[#496D91] text-white shadow-xs'
                        : 'text-[#5F6C64] hover:text-[#25352D]'
                    }`}
                  >
                    Viewpoint A (With Friend)
                  </button>
                  <button
                    onClick={() => setActiveWorkedViewpoint('B')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-technical font-bold transition-all cursor-pointer ${
                      activeWorkedViewpoint === 'B'
                        ? 'bg-[#496D91] text-white shadow-xs'
                        : 'text-[#5F6C64] hover:text-[#25352D]'
                    }`}
                  >
                    Viewpoint B (Alone)
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#5F6C64] leading-relaxed">
                {activity.start.workedExample.explanation}
              </p>

              {/* Active Viewpoint Breakdown */}
              {activeWorkedViewpoint === 'A' ? (
                <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F5] border border-[#496D91]/30 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="font-technical text-xs font-bold px-2 py-0.5 rounded-md bg-[#E1EAF2] text-[#496D91]">
                      Perspective A
                    </span>
                    <span className="text-xs font-bold text-[#25352D]">
                      {activity.start.workedExample.viewpointA.stance}
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs sm:text-sm leading-relaxed text-[#25352D]">
                    <p><strong className="text-[#496D91] font-semibold">1. Opinion: </strong>"{activity.start.workedExample.viewpointA.opinion}"</p>
                    <p><strong className="text-[#285C49] font-semibold">2. Reason: </strong>"{activity.start.workedExample.viewpointA.reason}"</p>
                    <p><strong className="text-[#956A43] font-semibold">3. Example: </strong>"{activity.start.workedExample.viewpointA.example}"</p>
                    <p><strong className="text-[#5F6C64] font-semibold">4. Respect: </strong>"{activity.start.workedExample.viewpointA.respect}"</p>
                  </div>
                </div>
              ) : (
                <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F5] border border-[#496D91]/30 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="font-technical text-xs font-bold px-2 py-0.5 rounded-md bg-[#E1EAF2] text-[#496D91]">
                      Perspective B
                    </span>
                    <span className="text-xs font-bold text-[#25352D]">
                      {activity.start.workedExample.viewpointB.stance}
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs sm:text-sm leading-relaxed text-[#25352D]">
                    <p><strong className="text-[#496D91] font-semibold">1. Opinion: </strong>"{activity.start.workedExample.viewpointB.opinion}"</p>
                    <p><strong className="text-[#285C49] font-semibold">2. Reason: </strong>"{activity.start.workedExample.viewpointB.reason}"</p>
                    <p><strong className="text-[#956A43] font-semibold">3. Example: </strong>"{activity.start.workedExample.viewpointB.example}"</p>
                    <p><strong className="text-[#5F6C64] font-semibold">4. Respect: </strong>"{activity.start.workedExample.viewpointB.respect}"</p>
                  </div>
                </div>
              )}

              {/* Key takeaway */}
              <div className="p-4 rounded-xl bg-white border border-[#DDE2DA] flex items-center justify-between text-xs text-[#5F6C64]">
                <span>{activity.start.workedExample.keyRule}</span>
                <span className="font-technical text-[11px] text-[#496D91] font-bold shrink-0 ml-3">Both Valid</span>
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

        {/* TRY · Practise */}
        {activeMovement === 'try' && (
          <div className="space-y-6 animate-in fade-in duration-150 text-left">
            {/* Horizontal LearningNudge Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <LearningNudge
                title="Friendly Tip"
                text="Simple reasons are often enough."
                detail="You do not need a debate speech. One clear reason and a relatable example are plenty."
                tone="amber"
                icon="speak"
              />
              <LearningNudge
                title="Quick Thought"
                text="It is okay to change your mind."
                detail="Sharing opinions is about exploring thoughts together, not winning a contest."
                tone="blue"
                icon="smile"
              />
            </div>

            {/* Topic Selector Tabs */}
            <div className="space-y-2 text-left">
              <span className="font-technical text-xs font-bold uppercase tracking-wider text-[#5F6C64] block px-1">
                Select an Everyday Situation to Practise:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                {activity.try.topics.map((top) => {
                  const isSelected = top.id === selectedTopicId;
                  const hasNotes = Boolean(notesByTopic[top.id]?.trim());

                  return (
                    <button
                      key={top.id}
                      onClick={() => {
                        setSelectedTopicId(top.id);
                        setShowExampleResponse(false);
                      }}
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
                            Topic {top.number}
                          </span>
                          {hasNotes && (
                            <span className="w-2 h-2 rounded-full bg-[#285C49]" title="Notes prepared" />
                          )}
                        </div>
                        <h3 className="font-editorial text-xs sm:text-sm font-bold text-[#25352D] line-clamp-2">
                          {top.title}
                        </h3>
                      </div>
                      <span className="text-[10px] font-technical text-[#717E76]">
                        {top.category}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Topic Interactive Workspace Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft text-left space-y-6">
              
              {/* Question Banner */}
              <div className="space-y-2 border-b border-[#E6E8E1] pb-5">
                <div className="flex items-center gap-2">
                  <span className="font-technical text-xs font-bold px-2 py-0.5 rounded-md bg-[#E1EAF2] text-[#496D91]">
                    Topic {selectedTopic.number}
                  </span>
                  <span className="text-xs font-technical text-[#717E76]">
                    {selectedTopic.category}
                  </span>
                </div>

                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#25352D]">
                  "{selectedTopic.question}"
                </h2>

                <p className="text-xs sm:text-sm text-[#5F6C64] leading-relaxed">
                  {selectedTopic.context}
                </p>
              </div>

              {/* Guiding Questions Helper */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#DDE2DA] space-y-2">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-3.5 h-3.5 text-[#496D91]" />
                  <span className="font-technical text-xs font-bold text-[#496D91] uppercase tracking-wider">
                    Guiding Questions to Shape Your Thinking
                  </span>
                </div>
                <ul className="space-y-1.5 pl-5 list-disc text-xs sm:text-sm text-[#5F6C64] leading-relaxed">
                  {selectedTopic.guidingQuestions.map((q, idx) => (
                    <li key={idx}>{q}</li>
                  ))}
                </ul>
              </div>

              {/* Stance Selector (Optional: Agree / Disagree / It Depends) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-technical text-xs font-bold uppercase tracking-wider text-[#25352D] block">
                    Choose Your Perspective (Optional):
                  </label>
                  <span className="text-[11px] font-technical text-[#717E76]">
                    You may also write an independent view
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {['Agree', 'Disagree', 'It Depends'].map((stance) => {
                    const isStanceSelected = currentStance === stance;
                    return (
                      <button
                        key={stance}
                        onClick={() => handleSelectStance(stance)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-technical font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                          isStanceSelected
                            ? 'bg-[#496D91] text-white shadow-xs'
                            : 'bg-[#FAF8F5] text-[#5F6C64] hover:text-[#25352D] border border-[#DDE2DA]'
                        }`}
                      >
                        {isStanceSelected ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                        ) : (
                          <Circle className="w-3.5 h-3.5 text-[#717E76]" />
                        )}
                        <span>{stance}</span>
                      </button>
                    );
                  })}
                  {currentStance && (
                    <button
                      onClick={() => handleSelectStance(currentStance)}
                      className="text-[11px] font-technical text-[#717E76] hover:text-[#8C3A3A] underline cursor-pointer ml-1"
                    >
                      Clear stance
                    </button>
                  )}
                </div>
              </div>

              {/* Outline Preparation Helper & Textarea */}
              <div className="space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <label htmlFor="opinion-outline" className="font-technical text-xs font-bold uppercase tracking-wider text-[#25352D] block">
                    Your Response Outline and Keywords:
                  </label>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleInsertTemplate}
                      className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] hover:bg-[#E1EAF2] border border-[#DDE2DA] text-[11px] font-technical font-semibold text-[#496D91] transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-[#496D91]" />
                      <span>Insert 4-Part Outline</span>
                    </button>

                    {currentNotes && (
                      <button
                        onClick={() => handleUpdateNotes('')}
                        className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] hover:bg-[#F1E5E5] border border-[#DDE2DA] text-[11px] font-technical font-semibold text-[#8C3A3A] transition-all cursor-pointer flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Clear</span>
                      </button>
                    )}
                  </div>
                </div>

                <textarea
                  id="opinion-outline"
                  value={currentNotes}
                  onChange={(e) => handleUpdateNotes(e.target.value)}
                  placeholder="My opinion: I think...&#10;My reason: Because...&#10;My example: For instance...&#10;Another viewpoint (optional): While some might say..."
                  rows={4}
                  className="w-full p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DDE2DA] focus:bg-white focus:border-[#496D91] focus:ring-1 focus:ring-[#496D91] text-xs sm:text-sm text-[#25352D] placeholder-[#9BA59E] transition-all resize-none outline-none font-sans"
                />
              </div>

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
                    Say your opinion aloud at a steady, natural pace. Aim for one clear opinion, one reason, and one brief example.
                  </p>
                </div>

                <button
                  onClick={() => setShowExampleResponse(prev => !prev)}
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#FAF8F5] border border-[#285C49]/40 text-[#285C49] text-xs font-bold transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
                >
                  <span>{showExampleResponse ? 'Hide Example' : 'See an Example Response'}</span>
                </button>
              </div>

              {/* Optional Example Response Accordion */}
              {showExampleResponse && (
                <div className="p-5 rounded-2xl bg-white border border-[#496D91]/40 shadow-xs space-y-3 animate-in fade-in duration-100">
                  <div className="flex items-center justify-between">
                    <span className="font-technical text-[10px] font-bold text-[#496D91] uppercase tracking-wider block">
                      Sample Thoughtful Response
                    </span>
                    <span className="text-[11px] font-technical text-[#717E76]">One of many valid responses</span>
                  </div>
                  <p className="font-editorial text-base sm:text-lg font-bold text-[#25352D]">
                    "{selectedTopic.exampleResponse}"
                  </p>
                  <p className="text-xs text-[#5F6C64] leading-relaxed border-t border-[#E6E8E1] pt-2">
                    <strong className="text-[#25352D] font-semibold">Why this works: </strong>
                    {selectedTopic.whyItWorks}
                  </p>
                </div>
              )}

              {/* Thoughtful Disagreement Mini-Guide */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#DDE2DA] space-y-3 text-left">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-[#496D91]" />
                  <span className="font-technical text-xs font-bold text-[#496D91] uppercase tracking-wider">
                    {activity.try.disagreementComparison.title}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-white border border-[#E6E8E1] space-y-1">
                    <span className="font-technical text-[10px] font-bold text-[#8C3A3A] uppercase tracking-wider block">
                      Unhelpful
                    </span>
                    <p className="font-mono text-xs text-[#25352D]">
                      "{activity.try.disagreementComparison.unhelpful.quote}"
                    </p>
                    <p className="text-[11px] text-[#717E76] leading-relaxed">
                      {activity.try.disagreementComparison.unhelpful.note}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#E1EAF2]/30 border border-[#496D91]/30 space-y-1">
                    <span className="font-technical text-[10px] font-bold text-[#285C49] uppercase tracking-wider block">
                      Better
                    </span>
                    <p className="font-mono text-xs text-[#25352D]">
                      "{activity.try.disagreementComparison.better.quote}"
                    </p>
                    <p className="text-[11px] text-[#5F6C64] leading-relaxed">
                      {activity.try.disagreementComparison.better.note}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[#5F6C64] leading-relaxed pt-1">
                  {activity.try.disagreementComparison.insight}
                </p>
              </div>

              {/* Privacy Guarantee Note */}
              <div className="flex items-center gap-2 text-xs text-[#717E76] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#285C49] shrink-0" />
                <span>{activity.try.privacyNote}</span>
              </div>

              {/* Advance to NEXT button */}
              <div className="pt-2 border-t border-[#E6E8E1] flex items-center justify-between">
                <span className="text-xs text-[#5F6C64]">
                  Practised your spoken response?
                </span>
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

          </div>
        )}

        {/* NEXT · Improve */}
        {activeMovement === 'next' && (
          <div className="space-y-6 animate-in fade-in duration-150 text-left">
            {/* Horizontal LearningNudge Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <LearningNudge
                title="Remember This"
                text="Respectful dialogue builds connection."
                detail="Listening to other viewpoints helps you refine and understand your own thoughts."
                tone="purple"
                icon="heart"
              />
              <LearningNudge
                title="Quick Thought"
                text="It is okay to change your mind."
                detail="Sharing viewpoints is about exploring ideas together, not defending a position at all costs."
                tone="green"
                icon="smile"
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
                  Learn to recognise common difficulties when expressing opinions and respond with calm confidence. {activity.next.description}
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
                        Situation {diff.letter}
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

            {/* Self-Reflection Checklist */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft text-left space-y-5">
              <div className="space-y-1">
                <span className="font-technical text-xs font-bold text-[#496D91] uppercase tracking-wider block">
                  Self-Reflection
                </span>
                <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#25352D]">
                  Did You Communicate Your Thinking Well?
                </h2>
                <p className="text-xs sm:text-sm text-[#5F6C64] leading-relaxed">
                  Reflect on your attempt. Check off each quality you noticed in your spoken response:
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
                  Choose ONE Focus for Your Next Attempt
                </h2>
                <p className="text-xs sm:text-sm text-[#5F6C64] leading-relaxed">
                  Real communication improves by making one clear adjustment at a time:
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

              {/* Action Buttons: Practise Again / Choose Another Topic */}
              <div className="pt-4 border-t border-[#E6E8E1] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs text-[#5F6C64]">
                  Keep practising with calm focus and natural repetition.
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
                    onClick={handleChooseAnotherTopic}
                    className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#FAF8F5] border border-[#496D91]/40 text-[#496D91] text-xs font-bold transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>Choose Another Topic</span>
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
