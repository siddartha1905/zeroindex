import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Clock, 
  RotateCcw, 
  Sparkles, 
  Lightbulb, 
  FileEdit, 
  ChevronDown, 
  ChevronUp, 
  Award, 
  TrendingUp, 
  Layers, 
  Cpu, 
  Calculator, 
  HelpCircle, 
  Check, 
  Shuffle, 
  BarChart2,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Zap,
  Target
} from 'lucide-react';
import { unit1QuizBank, quizTracks } from '../data/unit1QuizBank';
import { normalizeStudentAnswer, gradeStudentAnswer } from '../utils/quizGrading';

export const PracticeArena = ({ onNavigate }) => {
  // Navigation Track State (6 Tracks)
  const [activeTrack, setActiveTrack] = useState('all');

  // Control & Filter Bar States
  const [activeSet, setActiveSet] = useState('set1'); // 'set1' | 'set2' | 'random10'
  const [activeDifficulty, setActiveDifficulty] = useState('All'); // 'All' | 'Easy' | 'Medium' | 'Hard'
  const [inputMode, setInputMode] = useState('hybrid'); // 'hybrid' | 'direct' | 'mcq'

  // Student Responses State
  const [userAnswers, setUserAnswers] = useState({});
  const [userSelectedOption, setUserSelectedOption] = useState({});
  const [scratchpads, setScratchpads] = useState({});
  const [scratchpadOpen, setScratchpadOpen] = useState({});
  const [hintsOpen, setHintsOpen] = useState({});
  const [showMcqOptions, setShowMcqOptions] = useState({});

  // Submission & Post-Quiz Review State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reviewFilter, setReviewFilter] = useState('all'); // 'all' | 'wrong' | 'skipped' | 'correct'
  const [randomSeed, setRandomSeed] = useState(1);

  // Timer State
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  const timerRef = useRef(null);

  // Elapsed Timer effect
  useEffect(() => {
    if (timerActive && !isSubmitted) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerActive, isSubmitted]);

  // Format Elapsed Time as MM:SS
  const formattedTime = useMemo(() => {
    const mins = Math.floor(elapsedSeconds / 60);
    const secs = elapsedSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }, [elapsedSeconds]);

  // Track Question Counts
  const trackCounts = useMemo(() => {
    const counts = { all: unit1QuizBank.length };
    quizTracks.forEach(t => {
      if (t.id !== 'all') {
        counts[t.id] = unit1QuizBank.filter(q => q.trackId === t.id).length;
      }
    });
    return counts;
  }, []);

  // Filter Active Question List
  const activeQuestions = useMemo(() => {
    let list = unit1QuizBank;

    // Filter by Track
    if (activeTrack !== 'all') {
      list = list.filter(q => q.trackId === activeTrack);
    }

    // Filter by Set (if not random10)
    if (activeSet === 'set1') {
      list = list.filter(q => q.set === 'set1');
    } else if (activeSet === 'set2') {
      list = list.filter(q => q.set === 'set2');
    } else if (activeSet === 'random10') {
      // Deterministic pseudorandom shuffle based on randomSeed and track
      const copy = [...list];
      let seed = randomSeed * 9301 + 49297;
      for (let i = copy.length - 1; i > 0; i--) {
        seed = (seed * 9301 + 49297) % 233280;
        const j = Math.floor((seed / 233280) * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      list = copy.slice(0, Math.min(10, copy.length));
    }

    // Filter by Difficulty
    if (activeDifficulty !== 'All') {
      list = list.filter(q => q.difficulty === activeDifficulty);
    }

    return list;
  }, [activeTrack, activeSet, activeDifficulty, randomSeed]);

  // Handle Input Changes
  const handleInputChange = (questionId, value) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  // Handle MCQ Option Selection
  const handleOptionSelect = (questionId, option) => {
    setUserSelectedOption(prev => ({
      ...prev,
      [questionId]: option.label
    }));
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: option.text
    }));
  };

  // Toggle Scratchpad
  const toggleScratchpad = (questionId) => {
    setScratchpadOpen(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  // Update Scratchpad Content
  const handleScratchpadChange = (questionId, text) => {
    setScratchpads(prev => ({ ...prev, [questionId]: text }));
  };

  // Toggle Hints
  const toggleHint = (questionId, hintKey) => {
    setHintsOpen(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [hintKey]: !prev[questionId]?.[hintKey]
      }
    }));
  };

  // Toggle MCQ view in Hybrid Mode
  const toggleMcqView = (questionId) => {
    setShowMcqOptions(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  // Reset Quiz
  const handleResetQuiz = () => {
    if (window.confirm("Are you sure you want to reset this quiz? All current answers will be cleared.")) {
      setUserAnswers({});
      setUserSelectedOption({});
      setScratchpads({});
      setScratchpadOpen({});
      setHintsOpen({});
      setShowMcqOptions({});
      setIsSubmitted(false);
      setElapsedSeconds(0);
      setTimerActive(true);
      setReviewFilter('all');
    }
  };

  // Calculate Progress
  const answeredCount = useMemo(() => {
    return activeQuestions.filter(q => {
      const typed = userAnswers[q.id]?.trim();
      const opt = userSelectedOption[q.id];
      return !!typed || !!opt;
    }).length;
  }, [activeQuestions, userAnswers, userSelectedOption]);

  // Post-submission Score Calculation
  const evaluationResults = useMemo(() => {
    let score = 0;
    const detail = {};

    activeQuestions.forEach(q => {
      const userAns = userAnswers[q.id];
      const selectedOpt = userSelectedOption[q.id];
      const grade = gradeStudentAnswer(userAns, q, selectedOpt);
      detail[q.id] = grade;
      if (grade.isCorrect) {
        score += 1;
      }
    });

    const total = activeQuestions.length;
    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

    // Topic-by-Topic Mastery Breakdown
    const topicStats = {};
    activeQuestions.forEach(q => {
      if (!topicStats[q.trackId]) {
        topicStats[q.trackId] = { correct: 0, total: 0, title: q.trackTitle };
      }
      topicStats[q.trackId].total += 1;
      if (detail[q.id]?.isCorrect) {
        topicStats[q.trackId].correct += 1;
      }
    });

    return {
      score,
      total,
      percentage,
      detail,
      topicStats
    };
  }, [activeQuestions, userAnswers, userSelectedOption]);

  // Questions displayed based on post-submission filter
  const displayedQuestions = useMemo(() => {
    if (!isSubmitted || reviewFilter === 'all') {
      return activeQuestions;
    }
    return activeQuestions.filter(q => {
      const res = evaluationResults.detail[q.id];
      if (reviewFilter === 'wrong') return res?.isAnswered && !res.isCorrect;
      if (reviewFilter === 'skipped') return !res?.isAnswered;
      if (reviewFilter === 'correct') return res?.isCorrect;
      return true;
    });
  }, [activeQuestions, isSubmitted, reviewFilter, evaluationResults]);

  // Submission Handler
  const handleSubmitQuiz = () => {
    setIsSubmitted(true);
    setTimerActive(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Renders Individual Visual Solution Steps
  const renderSolutionStep = (step, sIdx) => {
    if (step.type === 'ladder') {
      return (
        <div key={sIdx} className="mb-4 bg-white rounded-lg border border-slate-200 p-3 shadow-sm">
          <div className="font-semibold text-xs uppercase tracking-wider text-slate-700 mb-2 flex items-center justify-between">
            <span>{step.title}</span>
            <span className="text-[11px] font-normal text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Division Ladder
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                  {step.headers.map((h, hIdx) => (
                    <th key={hIdx} className="py-1.5 px-3 text-left font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {step.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="border-b border-slate-100 hover:bg-slate-50/70">
                    {row.map((cell, cIdx) => (
                      <td 
                        key={cIdx} 
                        className={`py-1.5 px-3 ${cIdx === 2 ? 'font-bold text-emerald-700 bg-emerald-50/50' : 'text-slate-800'}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {step.readDirection && (
            <div className="mt-2 text-xs font-medium text-emerald-800 bg-emerald-50/80 px-2.5 py-1 rounded border border-emerald-200 flex items-center gap-1.5">
              <ArrowUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>{step.readDirection}</span>
            </div>
          )}
        </div>
      );
    }

    if (step.type === 'matrix') {
      return (
        <div key={sIdx} className="mb-4 bg-white rounded-lg border border-slate-200 p-3 shadow-sm">
          <div className="font-semibold text-xs uppercase tracking-wider text-slate-700 mb-2 flex items-center justify-between">
            <span>{step.title}</span>
            <span className="text-[11px] font-normal text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
              Positional Weight Matrix
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono border-collapse text-center">
              <thead>
                <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                  {step.headers.map((h, hIdx) => (
                    <th key={hIdx} className={`py-1.5 px-2 font-semibold ${h === '.' ? 'bg-amber-100 text-amber-900 w-4' : ''}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {step.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="border-b border-slate-100 hover:bg-slate-50/70">
                    {row.map((cell, cIdx) => (
                      <td 
                        key={cIdx} 
                        className={`py-1.5 px-2 ${
                          cIdx === 0 ? 'text-left font-semibold text-slate-600 bg-slate-50/80' : 
                          cell === '.' ? 'font-bold text-amber-700 bg-amber-50' : 
                          rIdx === 0 ? 'font-bold text-emerald-700' : 'text-slate-800'
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (step.type === 'grid') {
      return (
        <div key={sIdx} className="mb-4 bg-white rounded-lg border border-slate-200 p-3 shadow-sm">
          <div className="font-semibold text-xs uppercase tracking-wider text-slate-700 mb-2 flex items-center justify-between">
            <span>{step.title}</span>
            <span className="text-[11px] font-normal text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Column-Aligned Arithmetic Grid
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono border-collapse text-center">
              <thead>
                <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                  {step.headers.map((h, hIdx) => (
                    <th key={hIdx} className={`py-1.5 px-2 font-semibold ${hIdx === 0 ? 'text-left' : ''}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {step.rows.map((row, rIdx) => {
                  const isCarryRow = row[0]?.toLowerCase().includes('carry') || row[0]?.toLowerCase().includes('borrow');
                  const isResultRow = row[0]?.toLowerCase().includes('sum') || row[0]?.toLowerCase().includes('diff') || row[0]?.toLowerCase().includes('raw');
                  return (
                    <tr 
                      key={rIdx} 
                      className={`border-b ${isResultRow ? 'border-t-2 border-slate-400 bg-emerald-50/40 font-bold' : 'border-slate-100'}`}
                    >
                      {row.map((cell, cIdx) => (
                        <td 
                          key={cIdx} 
                          className={`py-1.5 px-2 ${
                            cIdx === 0 ? 'text-left font-semibold text-slate-600 bg-slate-50/50' : 
                            isCarryRow && cell && cell !== '0' ? 'text-amber-700 font-bold bg-amber-50/60' :
                            isResultRow ? 'text-emerald-800' : 'text-slate-800'
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (step.type === 'table') {
      return (
        <div key={sIdx} className="mb-4 bg-white rounded-lg border border-slate-200 p-3 shadow-sm">
          <div className="font-semibold text-xs uppercase tracking-wider text-slate-700 mb-2 flex items-center justify-between">
            <span>{step.title}</span>
            <span className="text-[11px] font-normal text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              Data Matrix
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono border-collapse text-left">
              <thead>
                <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                  {step.headers.map((h, hIdx) => (
                    <th key={hIdx} className="py-1.5 px-3 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {step.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="border-b border-slate-100 hover:bg-slate-50/70">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="py-1.5 px-3 text-slate-800">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {step.readDirection && (
            <div className="mt-2 text-xs font-medium text-indigo-800 bg-indigo-50/80 px-2.5 py-1 rounded border border-indigo-200 flex items-center gap-1.5">
              <ArrowDown className="w-3.5 h-3.5 text-indigo-600" />
              <span>{step.readDirection}</span>
            </div>
          )}
        </div>
      );
    }

    // Default: summary step
    return (
      <div key={sIdx} className="mb-3 bg-slate-50 rounded-lg border border-slate-200/90 p-3 text-xs text-slate-800">
        <div className="font-semibold text-slate-900 mb-1">{step.title}</div>
        <div className="font-mono whitespace-pre-wrap text-slate-700 leading-relaxed">
          {step.content}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">

      {/* =========================================================================
          TOP QUIZ TRACK SELECTOR (6 TRACK TABS)
      ========================================================================= */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2 md:p-3">
        <div className="flex items-center justify-between mb-2 px-2">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Unit 1 Interactive Quiz & Practice Arena
            </h2>
          </div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
            {unit1QuizBank.length} Total Questions
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {quizTracks.map((track) => {
            const isSelected = activeTrack === track.id;
            const count = trackCounts[track.id] || 0;
            return (
              <button
                key={track.id}
                onClick={() => {
                  setActiveTrack(track.id);
                  setReviewFilter('all');
                }}
                className={`flex flex-col items-start p-2.5 rounded-xl text-left transition-all ${
                  isSelected
                    ? 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-600/20 ring-2 ring-emerald-500'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {track.id === 'all' ? 'FULL' : `TOPIC ${track.id.slice(0, 4).toUpperCase()}`}
                  </span>
                  <span className={`text-xs font-bold px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-emerald-900/40 text-emerald-100' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {count} Qs
                  </span>
                </div>
                <span className="text-xs font-bold leading-tight line-clamp-2">
                  {track.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          QUIZ CONTROL & FILTER BAR
      ========================================================================= */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">

          {/* 1. Question Set Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <span className="text-[11px] font-semibold text-slate-500 px-2">Set:</span>
            <button
              onClick={() => setActiveSet('set1')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeSet === 'set1'
                  ? 'bg-white text-emerald-700 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Set 1 (Standard Exam)
            </button>
            <button
              onClick={() => setActiveSet('set2')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeSet === 'set2'
                  ? 'bg-white text-emerald-700 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Set 2 (Advanced & Fractional)
            </button>
            <button
              onClick={() => {
                setActiveSet('random10');
                setRandomSeed(prev => prev + 1);
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 transition-all ${
                activeSet === 'random10'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Random 10 Qs</span>
            </button>
          </div>

          {/* 2. Difficulty Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <span className="text-[11px] font-semibold text-slate-500 px-2">Difficulty:</span>
            {['All', 'Easy', 'Medium', 'Hard'].map(diff => (
              <button
                key={diff}
                onClick={() => setActiveDifficulty(diff)}
                className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all ${
                  activeDifficulty === diff
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {diff === 'All' ? 'All Levels' : diff}
              </button>
            ))}
          </div>

          {/* 3. Input Mode Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <span className="text-[11px] font-semibold text-slate-500 px-2">Input Mode:</span>
            <button
              onClick={() => setInputMode('hybrid')}
              className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all ${
                inputMode === 'hybrid'
                  ? 'bg-white text-indigo-700 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hybrid (Direct + MCQ)
            </button>
            <button
              onClick={() => setInputMode('direct')}
              className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all ${
                inputMode === 'direct'
                  ? 'bg-white text-indigo-700 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Rough-Paper Direct
            </button>
            <button
              onClick={() => setInputMode('mcq')}
              className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all ${
                inputMode === 'mcq'
                  ? 'bg-white text-indigo-700 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              4-Option MCQ
            </button>
          </div>

        </div>

        {/* Live Progress & Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Answered: {answeredCount} / {activeQuestions.length}</span>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>Time: {formattedTime}</span>
            </div>

            <button
              onClick={handleResetQuiz}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Quiz</span>
            </button>
          </div>

          <div>
            {!isSubmitted ? (
              <button
                onClick={handleSubmitQuiz}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Sparkles className="w-4 h-4" />
                <span>Submit Quiz & Check Detailed Solutions</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setTimerActive(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs rounded-xl transition-all"
              >
                <FileEdit className="w-3.5 h-3.5" />
                <span>Return to Active Edit Mode</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================================
          POST-SUBMISSION PERFORMANCE & DIAGNOSTIC DASHBOARD
      ========================================================================= */}
      {isSubmitted && (
        <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-indigo-950 text-white rounded-2xl p-6 shadow-xl border border-slate-700 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-700/80">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Award className="w-4 h-4" />
                <span>Diagnostic Assessment Results</span>
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight">
                Unit 1 Mastery Performance Report
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                Classroom evaluation completed across {evaluationResults.total} problems in {formattedTime}. Review graphical step-by-step solutions below.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <div className="text-center">
                <div className="text-3xl font-black text-emerald-400">
                  {evaluationResults.score} <span className="text-lg font-normal text-slate-400">/ {evaluationResults.total}</span>
                </div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Raw Score
                </div>
              </div>

              <div className="h-10 w-px bg-slate-700" />

              <div className="text-center">
                <div className="text-3xl font-black text-white">
                  {evaluationResults.percentage}%
                </div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Accuracy
                </div>
              </div>

              <div className="h-10 w-px bg-slate-700" />

              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                  evaluationResults.percentage >= 85
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : evaluationResults.percentage >= 70
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                }`}>
                  {evaluationResults.percentage >= 85 ? 'Mastery Level' : evaluationResults.percentage >= 70 ? 'Proficient' : 'Needs Practice'}
                </span>
              </div>
            </div>
          </div>

          {/* Topic-by-Topic Mastery Breakdown */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
              <BarChart2 className="w-4 h-4 text-emerald-400" />
              <span>Topic-by-Topic Syllabus Mastery Breakdown</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(evaluationResults.topicStats).map(([tId, stat]) => {
                const pct = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
                return (
                  <div key={tId} className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/80">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-slate-200 truncate pr-2">{stat.title}</span>
                      <span className="font-mono font-bold text-emerald-400">{stat.correct}/{stat.total} ({pct}%)</span>
                    </div>
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          pct >= 80 ? 'bg-emerald-500' : pct >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Filter Solutions View */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-semibold">Review Filter:</span>
              <button
                onClick={() => setReviewFilter('all')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  reviewFilter === 'all'
                    ? 'bg-white text-slate-900'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                All Solutions ({activeQuestions.length})
              </button>
              <button
                onClick={() => setReviewFilter('wrong')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  reviewFilter === 'wrong'
                    ? 'bg-rose-500 text-white'
                    : 'bg-slate-800 text-rose-300 hover:bg-slate-700'
                }`}
              >
                Wrong Answers Only
              </button>
              <button
                onClick={() => setReviewFilter('skipped')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  reviewFilter === 'skipped'
                    ? 'bg-amber-500 text-slate-900'
                    : 'bg-slate-800 text-amber-300 hover:bg-slate-700'
                }`}
              >
                Skipped Questions
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setActiveSet(activeSet === 'set1' ? 'set2' : 'set1');
                  setUserAnswers({});
                  setUserSelectedOption({});
                  setIsSubmitted(false);
                  setTimerActive(true);
                  setElapsedSeconds(0);
                }}
                className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 font-semibold transition-all"
              >
                {activeSet === 'set1' ? 'Try Set 2 (Advanced & Fractional)' : 'Try Set 1 (Standard Exam)'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          QUESTION CARDS LIST
      ========================================================================= */}
      <div className="space-y-6">
        {displayedQuestions.map((q, qIndex) => {
          const userAns = userAnswers[q.id] || "";
          const selectedOpt = userSelectedOption[q.id];
          const isPadOpen = !!scratchpadOpen[q.id];
          const padText = scratchpads[q.id] || "";
          const h1Open = !!hintsOpen[q.id]?.hint1;
          const h2Open = !!hintsOpen[q.id]?.hint2;
          const isMcqVisible = inputMode === 'mcq' || (inputMode === 'hybrid' && showMcqOptions[q.id]);

          // Grading evaluation for this question
          const evalResult = evaluationResults.detail[q.id] || { isAnswered: false, isCorrect: false };

          // Difficulty styling
          const diffBadge = 
            q.difficulty === 'Easy' 
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : q.difficulty === 'Medium'
              ? 'bg-amber-50 text-amber-800 border-amber-200'
              : 'bg-rose-50 text-rose-800 border-rose-200';

          // Post-submission border styling
          let cardBorder = 'border-slate-200 hover:border-slate-300';
          if (isSubmitted) {
            if (evalResult.isCorrect) {
              cardBorder = 'border-emerald-500 ring-1 ring-emerald-500 bg-emerald-50/10';
            } else if (evalResult.isAnswered && !evalResult.isCorrect) {
              cardBorder = 'border-rose-500 ring-1 ring-rose-500 bg-rose-50/10';
            } else {
              cardBorder = 'border-amber-400 bg-amber-50/10';
            }
          }

          return (
            <div 
              key={q.id} 
              id={q.id}
              className={`bg-white rounded-2xl shadow-sm border p-5 md:p-6 transition-all ${cardBorder}`}
            >
              {/* Question Card Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-black text-sm text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg">
                    Q{qIndex + 1}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {q.topicBadge}
                  </span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${diffBadge}`}>
                    {q.difficulty}
                  </span>
                </div>

                {/* Post-submission Status Badge */}
                {isSubmitted && (
                  <div>
                    {evalResult.isCorrect ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Correct (+1 Pt)</span>
                      </span>
                    ) : evalResult.isAnswered ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-rose-800 bg-rose-100 px-3 py-1 rounded-full border border-rose-300">
                        <XCircle className="w-3.5 h-3.5 text-rose-600" />
                        <span>Incorrect (0 Pts)</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                        <span>Skipped (0 Pts)</span>
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Question Statement */}
              <div className="space-y-1.5 mb-4">
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {q.question}
                </h3>
                {q.promptDetail && (
                  <p className="text-xs text-slate-500 font-mono">
                    {q.promptDetail}
                  </p>
                )}
              </div>

              {/* Collapsible Rough-Paper Scratchpad */}
              <div className="mb-4">
                <button
                  type="button"
                  onClick={() => toggleScratchpad(q.id)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
                >
                  <FileEdit className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{isPadOpen ? 'Close Rough Work Pad' : 'Open Rough Work Pad'}</span>
                  {padText && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                </button>

                {isPadOpen && (
                  <div className="mt-2 p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5 font-mono">
                      <span>Rough Scratchpad (Type intermediate carries, remainders, or inversions):</span>
                      <button 
                        onClick={() => handleScratchpadChange(q.id, "")}
                        className="text-slate-500 hover:text-rose-400"
                      >
                        Clear
                      </button>
                    </div>
                    <textarea
                      rows={3}
                      value={padText}
                      onChange={(e) => handleScratchpadChange(q.id, e.target.value)}
                      placeholder="e.g., M = 110101, 1's comp N = 100101, Carry out = 1..."
                      className="w-full bg-slate-950 text-emerald-400 font-mono text-xs p-2.5 rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500 resize-y"
                    />
                  </div>
                )}
              </div>

              {/* Answer Entry Area */}
              <div className="space-y-3 mb-4">
                {/* Direct Monospace Input Box (for Hybrid and Direct Mode) */}
                {inputMode !== 'mcq' && (
                  <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-200">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Direct Student Answer Input:
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        disabled={isSubmitted}
                        value={userAns}
                        onChange={(e) => handleInputChange(q.id, e.target.value)}
                        placeholder="Type exact answer here..."
                        className="flex-1 bg-white border border-slate-300 font-mono text-sm px-3 py-2 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-100 disabled:text-slate-600"
                      />
                      {inputMode === 'hybrid' && (
                        <button
                          type="button"
                          onClick={() => toggleMcqView(q.id)}
                          className="text-xs font-semibold px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg transition-colors whitespace-nowrap"
                        >
                          {showMcqOptions[q.id] ? 'Hide Options' : 'View 4 MCQ Options'}
                        </button>
                      )}
                    </div>
                    {q.inputFormatHint && (
                      <p className="text-[11px] text-slate-500 mt-1 font-mono">
                        Format Hint: {q.inputFormatHint}
                      </p>
                    )}
                  </div>
                )}

                {/* 4-Option MCQ Cards (for MCQ Mode and expanded Hybrid Mode) */}
                {isMcqVisible && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                    {q.options.map((opt) => {
                      const isOptionSelected = selectedOpt === opt.label || userAns.trim() === opt.text.trim();
                      let optStyle = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800';

                      if (isSubmitted) {
                        if (opt.isCorrect) {
                          optStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold ring-1 ring-emerald-500';
                        } else if (isOptionSelected && !opt.isCorrect) {
                          optStyle = 'bg-rose-50 border-rose-500 text-rose-900 line-through';
                        } else {
                          optStyle = 'bg-slate-50/70 border-slate-200 text-slate-500 opacity-70';
                        }
                      } else if (isOptionSelected) {
                        optStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold ring-2 ring-emerald-500/20';
                      }

                      return (
                        <button
                          key={opt.label}
                          type="button"
                          disabled={isSubmitted}
                          onClick={() => handleOptionSelect(q.id, opt)}
                          className={`flex items-start gap-2.5 p-3 rounded-xl border text-left transition-all ${optStyle}`}
                        >
                          <span className={`w-6 h-6 rounded-lg font-mono font-bold text-xs flex items-center justify-center shrink-0 ${
                            isOptionSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {opt.label}
                          </span>
                          <div className="flex-1">
                            <div className="font-mono text-xs font-semibold">{opt.text}</div>
                            {isSubmitted && opt.distractorReason && !opt.isCorrect && (
                              <div className="text-[10px] text-rose-700 mt-1">
                                Trap: {opt.distractorReason}
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Progressive 2-Level Hint System (Accessible Before & After Submitting) */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleHint(q.id, 'hint1')}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
                      h1Open 
                        ? 'bg-indigo-600 text-white border-indigo-600' 
                        : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-200'
                    }`}
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>{h1Open ? 'Hide Hint 1' : 'Hint 1: Formula & Rule'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleHint(q.id, 'hint2')}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
                      h2Open 
                        ? 'bg-amber-600 text-white border-amber-600' 
                        : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border-amber-200'
                    }`}
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{h2Open ? 'Hide Hint 2' : 'Hint 2: First Step & Trap'}</span>
                  </button>
                </div>

                {h1Open && (
                  <div className="bg-indigo-50/90 border border-indigo-200 text-indigo-950 p-3 rounded-xl text-xs leading-relaxed">
                    <span className="font-bold text-indigo-900 block mb-0.5">Governing Rule / Formula:</span>
                    {q.hint1}
                  </div>
                )}

                {h2Open && (
                  <div className="bg-amber-50/90 border border-amber-200 text-amber-950 p-3 rounded-xl text-xs leading-relaxed">
                    <span className="font-bold text-amber-900 block mb-0.5">First Step & Classic Exam Trap:</span>
                    {q.hint2}
                  </div>
                )}
              </div>

              {/* =========================================================================
                  FULL GRAPHICAL STEP-BY-STEP CLASSROOM SOLUTION (UPON SUBMISSION)
              ========================================================================= */}
              {isSubmitted && (
                <div className="mt-5 pt-5 border-t-2 border-slate-200 space-y-4">
                  {/* Result Comparison Strip */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="text-slate-500 font-semibold block">Your Answer:</span>
                      <span className={`font-mono font-bold text-sm ${evalResult.isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {userAns || '(Skipped / Blank)'}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 font-semibold block">Correct Canonical Answer:</span>
                      <span className="font-mono font-bold text-sm text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 inline-block">
                        {q.correctAnswer}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 font-semibold block">Full Answer Form:</span>
                      <span className="font-mono font-bold text-slate-800">
                        {q.solution.finalAnswer}
                      </span>
                    </div>
                  </div>

                  {/* Step-by-Step Graphical Visual Solutions */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                      <Target className="w-4 h-4 text-emerald-600" />
                      <span>Classroom Step-by-Step Graphical Solution</span>
                    </h4>

                    {q.solution.steps.map((step, sIdx) => renderSolutionStep(step, sIdx))}
                  </div>

                  {/* 3-Second Fast Inspection Shortcut */}
                  {q.solution.fastShortcut && (
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-3 text-xs text-indigo-950 flex items-start gap-2.5">
                      <Zap className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-indigo-900 block mb-0.5">3-Second Inspection Shortcut:</span>
                        <span className="font-mono text-indigo-900">{q.solution.fastShortcut}</span>
                      </div>
                    </div>
                  )}

                  {/* 5-Second Base-10 Verification Bar */}
                  {q.solution.verification && (
                    <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-950 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-emerald-900 block mb-0.5">5-Second Base 10 Verification:</span>
                        <span className="font-mono text-emerald-900">{q.solution.verification}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};

export default PracticeArena;
