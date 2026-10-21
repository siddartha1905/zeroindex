import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Clock, 
  RotateCcw, 
  Sparkles, 
  Lightbulb, 
  Award, 
  Play,
  Pause,
  Shuffle, 
  BarChart2,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Zap,
  Target,
  FileText,
  Calculator,
  PenTool,
  HelpCircle,
  Settings,
  RefreshCw
} from 'lucide-react';
import { unit1QuizBank, quizTracks } from '../data/unit1QuizBank';
import { unit2QuizBank, unit2QuizTracks } from '../data/unit2QuizBank';
import { normalizeStudentAnswer, gradeStudentAnswer } from '../utils/quizGrading';

// Question Paper Generator based on track, mode, and difficulty
function generateQuestionPaper(allBank, trackId, mode, difficultyMix) {
  let pool = allBank;

  // 1. Filter by Track if not 'all'
  if (trackId !== 'all') {
    pool = pool.filter(q => q.trackId === trackId);
  }

  // 2. Filter by Mode / Paper Type
  if (mode === 'theory') {
    pool = pool.filter(q => q.questionType === 'fill_blank' || q.questionType === 'conceptual_mcq');
  } else if (mode === 'setA') {
    pool = pool.filter(q => q.set === 'setA');
  } else if (mode === 'setB') {
    pool = pool.filter(q => q.set === 'setB');
  }

  // 3. Filter by Difficulty if not 'balanced'
  if (difficultyMix !== 'balanced') {
    const diffPool = pool.filter(q => q.difficulty === difficultyMix);
    if (diffPool.length > 0) pool = diffPool;
  }

  // 4. Sample required number of questions
  let targetCount = 10;
  if (mode === 'random20') targetCount = 20;
  else if (mode === 'setA' || mode === 'setB' || mode === 'theory') targetCount = 15;

  const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

  // If track is 'all', draw balanced distribution across sections/topics
  if (trackId === 'all') {
    const isUnit2 = pool.some(q => q.trackId && q.trackId.startsWith('sec2'));
    if (isUnit2) {
      const s21 = pool.filter(q => q.trackId === 'sec21');
      const s22 = pool.filter(q => q.trackId === 'sec22');
      const s23 = pool.filter(q => q.trackId === 'sec23');
      const s24 = pool.filter(q => q.trackId === 'sec24');
      const s25 = pool.filter(q => q.trackId === 'sec25');

      if (mode === 'random10') {
        // Balanced 2 questions from each of the 5 sections = 10 questions
        return [
          ...shuffle(s21).slice(0, 2),
          ...shuffle(s22).slice(0, 2),
          ...shuffle(s23).slice(0, 2),
          ...shuffle(s24).slice(0, 2),
          ...shuffle(s25).slice(0, 2),
        ];
      } else if (mode === 'random20') {
        // Balanced 4 questions from each of the 5 sections = 20 questions
        return [
          ...shuffle(s21).slice(0, 4),
          ...shuffle(s22).slice(0, 4),
          ...shuffle(s23).slice(0, 4),
          ...shuffle(s24).slice(0, 4),
          ...shuffle(s25).slice(0, 4),
        ];
      } else if (mode === 'setA' || mode === 'setB') {
        // 3 questions from each of the 5 sections = 15 questions
        return [
          ...shuffle(s21).slice(0, 3),
          ...shuffle(s22).slice(0, 3),
          ...shuffle(s23).slice(0, 3),
          ...shuffle(s24).slice(0, 3),
          ...shuffle(s25).slice(0, 3),
        ];
      }
    } else if (mode === 'random10' || mode === 'random20') {
      // Unit 1 tracks (5 balanced topics)
      const tConv = pool.filter(q => q.trackId === 'conversions');
      const tArith = pool.filter(q => q.trackId === 'arithmetic');
      const tComp = pool.filter(q => q.trackId === 'complements');
      const tSigned = pool.filter(q => q.trackId === 'signed');
      const tGates = pool.filter(q => q.trackId === 'gates');

      if (mode === 'random10') {
        return [
          ...shuffle(tConv).slice(0, 2),
          ...shuffle(tArith).slice(0, 2),
          ...shuffle(tComp).slice(0, 2),
          ...shuffle(tSigned).slice(0, 2),
          ...shuffle(tGates).slice(0, 2),
        ];
      } else {
        return [
          ...shuffle(tConv).slice(0, 4),
          ...shuffle(tArith).slice(0, 4),
          ...shuffle(tComp).slice(0, 4),
          ...shuffle(tSigned).slice(0, 4),
          ...shuffle(tGates).slice(0, 4),
        ];
      }
    }
  }

  // General random sampling
  const shuffled = shuffle(pool);
  return shuffled.slice(0, Math.min(targetCount, shuffled.length));
}

export const PracticeArena = ({ 
  onNavigate, 
  defaultUnit = 1, 
  initialTrack = 'all',
  isUnit2Accessible = true 
}) => {
  // Unit Partition: 1 | 2 | 3 | 4 | 5 | 'all'
  const [activeQuizUnit, setActiveQuizUnit] = useState(() => {
    if (!isUnit2Accessible) return 1;
    return defaultUnit || 1;
  });

  // Dynamic quiz bank and tracks selection
  const currentBank = (activeQuizUnit === 2 && isUnit2Accessible) ? unit2QuizBank : unit1QuizBank;
  const currentTracks = (activeQuizUnit === 2 && isUnit2Accessible) ? unit2QuizTracks : quizTracks;

  // State Machine: 'lobby' | 'active' | 'submitted'
  const [quizState, setQuizState] = useState('lobby');

  // Lobby Configuration States
  const [selectedTrack, setSelectedTrack] = useState(initialTrack || 'all');
  const [selectedMode, setSelectedMode] = useState('random10'); // 'random10' | 'random20' | 'setA' | 'setB' | 'theory'
  const [selectedDifficulty, setSelectedDifficulty] = useState('balanced'); // 'balanced' | 'Easy' | 'Medium' | 'Hard'
  const [selectedInputFormat, setSelectedInputFormat] = useState('hybrid'); // 'hybrid' | 'mcq' | 'direct'

  useEffect(() => {
    if (!isUnit2Accessible && (activeQuizUnit === 2 || activeQuizUnit === 'all')) {
      setActiveQuizUnit(1);
      return;
    }
    if (defaultUnit) {
      if (defaultUnit === 2 && !isUnit2Accessible) {
        setActiveQuizUnit(1);
      } else {
        setActiveQuizUnit(defaultUnit);
      }
    }
  }, [defaultUnit, isUnit2Accessible]);

  useEffect(() => {
    if (initialTrack) setSelectedTrack(initialTrack);
  }, [initialTrack]);

  // Active Quiz Session States
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [userSelectedOption, setUserSelectedOption] = useState({});
  const [hintsOpen, setHintsOpen] = useState({});
  const [showMcqOptions, setShowMcqOptions] = useState({});

  // Timer States
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const timerRef = useRef(null);

  // Post-Submission States
  const [reviewFilter, setReviewFilter] = useState('all'); // 'all' | 'wrong' | 'skipped' | 'correct'

  // Track Question Counts for Lobby
  const trackCounts = useMemo(() => {
    const counts = { all: currentBank.length };
    currentTracks.forEach(t => {
      if (t.id !== 'all') {
        counts[t.id] = currentBank.filter(q => q.trackId === t.id).length;
      }
    });
    return counts;
  }, [currentBank, currentTracks]);

  // Reset selected track and state when switching units
  useEffect(() => {
    setSelectedTrack('all');
    setQuizState('lobby');
    setElapsedSeconds(0);
    setIsTimerPaused(false);
  }, [activeQuizUnit]);

  // Timer Tick
  useEffect(() => {
    if (quizState === 'active' && !isTimerPaused) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [quizState, isTimerPaused]);

  // Formatted Timer MM:SS
  const formattedTime = useMemo(() => {
    const mins = Math.floor(elapsedSeconds / 60);
    const secs = elapsedSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }, [elapsedSeconds]);

  // Start Quiz Handler (Timer starts on click)
  const handleStartQuiz = (customPaper = null) => {
    const paper = customPaper || generateQuestionPaper(currentBank, selectedTrack, selectedMode, selectedDifficulty);
    setActiveQuestions(paper);
    setUserAnswers({});
    setUserSelectedOption({});
    setHintsOpen({});
    setShowMcqOptions({});
    setElapsedSeconds(0);
    setIsTimerPaused(false);
    setReviewFilter('all');
    setQuizState('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Return to Lobby with Confirmation
  const handleQuitToLobby = () => {
    if (quizState === 'active') {
      const confirmQuit = window.confirm("Return to Quiz Setup Lobby? Your current active quiz progress will be reset.");
      if (!confirmQuit) return;
    }
    setQuizState('lobby');
    setElapsedSeconds(0);
    if (timerRef.current) clearInterval(timerRef.current);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submit Quiz Handler
  const handleSubmitQuiz = () => {
    setQuizState('submitted');
    if (timerRef.current) clearInterval(timerRef.current);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Input Changes
  const handleInputChange = (questionId, value) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  // Handle Option Selection
  const handleOptionSelect = (questionId, option) => {
    setUserSelectedOption(prev => ({ ...prev, [questionId]: option.label }));
    setUserAnswers(prev => ({ ...prev, [questionId]: option.text }));
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

  // Toggle MCQ Option View in Hybrid Mode
  const toggleMcqView = (questionId) => {
    setShowMcqOptions(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  // Answered Count
  const answeredCount = useMemo(() => {
    return activeQuestions.filter(q => {
      const typed = userAnswers[q.id]?.trim();
      const opt = userSelectedOption[q.id];
      return !!typed || !!opt;
    }).length;
  }, [activeQuestions, userAnswers, userSelectedOption]);

  // Score Calculation
  const evaluationResults = useMemo(() => {
    let score = 0;
    const detail = {};

    activeQuestions.forEach(q => {
      const userAns = userAnswers[q.id];
      const selectedOpt = userSelectedOption[q.id];
      const grade = gradeStudentAnswer(userAns, q, selectedOpt);
      detail[q.id] = grade;
      if (grade.isCorrect) score += 1;
    });

    const total = activeQuestions.length;
    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

    // Topic-wise accuracy breakdown
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

    return { score, total, percentage, detail, topicStats };
  }, [activeQuestions, userAnswers, userSelectedOption]);

  // Retry Incorrect Questions
  const handleRetryIncorrect = () => {
    const wrongOrSkipped = activeQuestions.filter(q => !evaluationResults.detail[q.id]?.isCorrect);
    if (wrongOrSkipped.length === 0) {
      alert("Congratulations! You answered all questions correctly. Generating a fresh set of questions.");
      handleStartQuiz();
      return;
    }
    handleStartQuiz(wrongOrSkipped);
  };

  // Filter Displayed Questions in Review Mode
  const displayedQuestions = useMemo(() => {
    if (quizState !== 'submitted' || reviewFilter === 'all') {
      return activeQuestions;
    }
    return activeQuestions.filter(q => {
      const res = evaluationResults.detail[q.id];
      if (reviewFilter === 'wrong') return res?.isAnswered && !res.isCorrect;
      if (reviewFilter === 'skipped') return !res?.isAnswered;
      if (reviewFilter === 'correct') return res?.isCorrect;
      return true;
    });
  }, [activeQuestions, quizState, reviewFilter, evaluationResults]);

  // Render Graphical Classroom Solution Steps
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

  const practiceUnits = [
    {
      id: 1,
      title: "Unit 1 Quiz Arena",
      shortTitle: "Unit 1: Number Systems & Arithmetic",
      badge: "110 Qs Live",
      badgeColor: "bg-[#2E6F40] text-white",
      description: "Conversions, Binary Arithmetic, Complements & Subtraction, Signed Numbers & Unit 1 Theory",
      disabled: false
    },
    {
      id: 2,
      title: "Unit 2 Quiz Arena",
      shortTitle: "Unit 2: Boolean & K-Maps",
      badge: isUnit2Accessible ? "125 Qs Live" : "Under Review",
      badgeColor: isUnit2Accessible ? "bg-[#2E6F40] text-white" : "bg-slate-100 text-slate-500",
      description: "Boolean Algebra Axioms, 3/4-Var K-Maps, Canonical SOP/POS, Universal NAND/NOR",
      disabled: !isUnit2Accessible
    },
    {
      id: 3,
      title: "Unit 3 Quiz Arena",
      shortTitle: "Unit 3: Combinational Logic",
      badge: "Upcoming",
      badgeColor: "bg-amber-100 text-amber-800 border border-amber-200",
      description: "Adders, Subtractors, Look-Ahead Carry, Decoders, Encoders & Multiplexers",
      disabled: true
    },
    {
      id: 4,
      title: "Unit 4 Quiz Arena",
      shortTitle: "Unit 4: Sequential Logic",
      badge: "Upcoming",
      badgeColor: "bg-amber-100 text-amber-800 border border-amber-200",
      description: "Latches, Flip-Flops (SR, JK, D, T), Race-Around & State Transition Tables",
      disabled: true
    },
    {
      id: 5,
      title: "Unit 5 Quiz Arena",
      shortTitle: "Unit 5: Registers & Counters",
      badge: "Upcoming",
      badgeColor: "bg-amber-100 text-amber-800 border border-amber-200",
      description: "Shift Registers (SISO, SIPO, PISO, PIPO), Ripple & Synchronous Mod-N Counters",
      disabled: true
    },
    {
      id: 'all',
      title: "All Units (1-5) Grand Mock Exam",
      shortTitle: "All Units (1-5) Grand Mock",
      badge: isUnit2Accessible ? "Sem Exam" : "Requires Unit 2",
      badgeColor: isUnit2Accessible ? "bg-indigo-100 text-indigo-800 border border-indigo-200" : "bg-slate-100 text-slate-400 border border-slate-200",
      description: "Comprehensive end-of-semester exam practice across all 5 syllabus units",
      disabled: !isUnit2Accessible
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">

      {/* Top Unit Selector Bar (Unit 1 to Unit 5 + All Units Grand Mock) */}
      {quizState !== 'active' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-3">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 px-1">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600">
                Course Practice Arena Units
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-500">
              Select a Unit Quiz Arena or the Semester Grand Mock Exam
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {practiceUnits.map((u) => {
              const isActive = activeQuizUnit === u.id;
              return (
                <button
                  key={u.id}
                  disabled={u.disabled}
                  onClick={() => {
                    if (!u.disabled) setActiveQuizUnit(u.id);
                  }}
                  className={`p-3 rounded-xl text-left transition-all flex flex-col justify-between ${
                    u.disabled
                      ? "bg-slate-50/50 text-slate-400 border border-slate-200/50 opacity-60 cursor-not-allowed"
                      : isActive
                        ? "bg-[#2E6F40] text-white shadow-md ring-2 ring-[#2E6F40]/30"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                      isActive ? "bg-white/20 text-white" : "bg-white text-slate-600 border border-slate-200"
                    }`}>
                      {u.id === 'all' ? 'MOCK' : `Unit ${u.id}`}
                    </span>
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full ${
                      isActive ? "bg-emerald-900/40 text-emerald-100" : u.badgeColor
                    }`}>
                      {u.badge}
                    </span>
                  </div>
                  <span className="text-xs font-bold leading-tight mt-1">
                    {u.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          UNIT 1 OR UNIT 2 QUIZ ARENA (ACTIVE)
      ========================================================================= */}
      {(activeQuizUnit === 1 || activeQuizUnit === 2) && (
        <>
      {/* =========================================================================
          STATE 1: PRE-QUIZ LOBBY & SETUP DASHBOARD
      ========================================================================= */}
      {quizState === 'lobby' && (
        <div className="space-y-6">
          
          {/* Top 5 Topic Track Selector Cards */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                <h2 className="text-base font-bold text-slate-900 tracking-tight">
                  {activeQuizUnit === 2 ? "Unit 2 Practice Quiz Arena - Question Bank Selector" : "Unit 1 Practice Quiz Arena - Question Bank Selector"}
                </h2>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                {currentBank.length} Total Verified Questions
              </span>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-3 ${currentTracks.length >= 6 ? 'lg:grid-cols-6' : 'lg:grid-cols-5'} gap-3`}>
              {currentTracks.map((track) => {
                const isSelected = selectedTrack === track.id;
                const pool = trackCounts[track.id] || 0;
                return (
                  <button
                    key={track.id}
                    onClick={() => setSelectedTrack(track.id)}
                    className={`flex flex-col items-start p-3 rounded-xl text-left transition-all ${
                      isSelected
                        ? 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-600/20 ring-2 ring-emerald-500'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {track.id === 'all'
                          ? 'MIXED'
                          : track.id.startsWith('sec')
                            ? `SEC ${track.id.replace('sec', '2.')}`
                            : `TOPIC ${track.id.toUpperCase()}`}
                      </span>
                      <span className={`text-xs font-bold px-1.5 py-0.2 rounded-full ${
                        isSelected ? 'bg-emerald-900/40 text-emerald-100' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {pool} Qs
                      </span>
                    </div>
                    <span className="text-xs font-bold leading-tight line-clamp-2 mt-1">
                      {track.label}
                    </span>
                    <span className={`text-[11px] mt-1.5 line-clamp-2 leading-snug ${
                      isSelected ? 'text-emerald-100' : 'text-slate-500'
                    }`}>
                      {track.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Physical Rough Sheet Note Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-center gap-3 text-amber-900 text-xs">
            <PenTool className="w-4 h-4 text-amber-600 shrink-0" />
            <p className="font-medium">
              <span className="font-bold">Exam Preparation Tip:</span> {activeQuizUnit === 2 ? "Keep a physical rough sheet and pen ready to draw K-map grids, group adjacent 1s, and trace Boolean algebraic consensus terms before selecting your answer." : "Keep a physical rough sheet and pen ready to work out conversions, carries, and complements before entering your answers."}
            </p>
          </div>

          {/* Quiz Customization Configuration Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Settings className="w-4 h-4 text-indigo-600" />
                <span>Configure Your Practice Session</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Select your question set, difficulty mix, and input format. The timer will only start when you click Start Quiz Now.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* 1. Select Quiz Set / Mode */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  1. Question Set & Mode
                </label>
                <div className="space-y-1.5 text-xs">
                  {[
                    {
                      id: 'random10',
                      title: 'Random 10 Questions',
                      desc: activeQuizUnit === 2 ? 'Quick 10-Question Balanced Diagnostic (2 from each Sec 2.1-2.5)' : 'Quick 10-Question Balanced Diagnostic'
                    },
                    {
                      id: 'random20',
                      title: 'Random 20 Questions',
                      desc: activeQuizUnit === 2 ? 'Comprehensive Unit 2 Mock Exam (4 from each Sec 2.1-2.5)' : 'Comprehensive Unit 1 Mock Exam'
                    },
                    {
                      id: 'setA',
                      title: 'Set A: Standard Paper (15 Qs)',
                      desc: activeQuizUnit === 2 ? 'Core Boolean theorems, SOP/POS and 3-variable K-maps' : 'Fundamental conversions and complement math'
                    },
                    {
                      id: 'setB',
                      title: 'Set B: Advanced Paper (15 Qs)',
                      desc: activeQuizUnit === 2 ? 'Corner loops, don\'t cares, XOR synthesis and 4-variable K-maps' : 'Zero-bridge borrows and fractional points'
                    },
                    {
                      id: 'theory',
                      title: 'Theory & Conceptual Only (15 Qs)',
                      desc: activeQuizUnit === 2 ? 'Boolean postulates, canonical forms and prime implicant theory' : 'Core axioms, rules and fill-in-the-blanks'
                    }
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMode(m.id)}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all ${
                        selectedMode === m.id
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-1 ring-emerald-500'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="font-bold">{m.title}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{m.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Select Difficulty Mix */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  2. Difficulty Mix
                </label>
                <div className="space-y-1.5 text-xs">
                  {[
                    { id: 'balanced', title: 'Balanced Exam Mix', desc: 'Standard blend of Easy, Medium, and Hard problems' },
                    { id: 'Easy', title: 'Easy Only', desc: 'Confidence builder focusing on fundamental conversions' },
                    { id: 'Medium', title: 'Medium Only', desc: 'Standard classroom questions with carries & borrows' },
                    { id: 'Hard', title: 'Hard Only', desc: 'Advanced fractional points & Zero-Bridge borrows' }
                  ].map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setSelectedDifficulty(d.id)}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all ${
                        selectedDifficulty === d.id
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-950 font-semibold ring-1 ring-indigo-500'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="font-bold">{d.title}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{d.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Select Answer Format */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  3. Answer Input Format
                </label>
                <div className="space-y-1.5 text-xs">
                  {[
                    { id: 'hybrid', title: 'Hybrid Mode (Recommended)', desc: 'Direct input on calculations + clean MCQs on theory' },
                    { id: 'mcq', title: '4-Option MCQ for All Questions', desc: 'Multiple-choice cards with diagnostic distractor traps' },
                    { id: 'direct', title: 'Direct Answer / Fill-in-the-Blank', desc: 'Type normalized values directly from rough sheet math' }
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedInputFormat(f.id)}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all ${
                        selectedInputFormat === f.id
                          ? 'bg-amber-50 border-amber-500 text-amber-950 font-semibold ring-1 ring-amber-500'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="font-bold">{f.title}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{f.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Launch Banner & Start Button */}
            <div className="pt-4 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-600">
                <span className="font-bold text-slate-900">Current Setup: </span>
                <span className="text-emerald-700 font-semibold">{currentTracks.find(t => t.id === selectedTrack)?.label}</span>
                <span> • </span>
                <span className="text-indigo-700 font-semibold">{selectedMode === 'random10' ? '10 Qs' : selectedMode === 'random20' ? '20 Qs' : '15 Qs'}</span>
                <span> • </span>
                <span className="text-amber-700 font-semibold">{selectedDifficulty} Difficulty</span>
              </div>

              <button
                onClick={() => handleStartQuiz()}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start Quiz Now (Timer Starts on Click)</span>
              </button>
            </div>

          </div>

        </div>
      )}

      {/* =========================================================================
          STATE 2: ACTIVE QUIZ VIEW (CLEAN VIEW - NO ROUGH WORK PAD)
      ========================================================================= */}
      {quizState === 'active' && (
        <div className="space-y-6">

          {/* Sticky Top Quiz Control Bar */}
          <div className="sticky top-2 z-30 bg-white/95 backdrop-blur-md rounded-2xl shadow-md border border-slate-200 p-3.5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 border border-emerald-200 truncate max-w-xs md:max-w-md">
                  {currentTracks.find(t => t.id === selectedTrack)?.label}
                </span>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Answered: {answeredCount} / {activeQuestions.length}</span>
                </div>

                <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200 text-xs font-mono font-bold text-indigo-900">
                  <Clock className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{formattedTime}</span>
                  <button
                    onClick={() => setIsTimerPaused(!isTimerPaused)}
                    className="ml-1 text-[10px] text-slate-500 hover:text-indigo-600 underline"
                  >
                    {isTimerPaused ? 'Resume' : 'Pause'}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleQuitToLobby}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 text-xs font-semibold border border-slate-200 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Quit to Lobby</span>
                </button>

                <button
                  onClick={handleSubmitQuiz}
                  className="flex items-center gap-2 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/30 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Submit Quiz & View Detailed Solutions</span>
                </button>
              </div>
            </div>

            {/* Question Number Quick Jump Strip */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-0.5 border-t border-slate-100 text-xs">
              <span className="text-[11px] font-semibold text-slate-400 shrink-0 mr-1">Questions:</span>
              {activeQuestions.map((q, idx) => {
                const isAnswered = !!(userAnswers[q.id]?.trim() || userSelectedOption[q.id]);
                return (
                  <a
                    key={q.id}
                    href={`#q-${q.id}`}
                    className={`w-7 h-7 rounded-lg font-mono font-bold text-xs flex items-center justify-center shrink-0 transition-all ${
                      isAnswered
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {idx + 1}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Question Cards (NO ON-SCREEN ROUGH WORK PAD) */}
          <div className="space-y-6">
            {activeQuestions.map((q, qIndex) => {
              const userAns = userAnswers[q.id] || "";
              const selectedOpt = userSelectedOption[q.id];
              const h1Open = !!hintsOpen[q.id]?.hint1;
              const h2Open = !!hintsOpen[q.id]?.hint2;

              // Determine whether to show 4 MCQ options in hybrid mode
              const isMcqVisible = 
                selectedInputFormat === 'mcq' || 
                (selectedInputFormat === 'hybrid' && (q.questionType === 'conceptual_mcq' || showMcqOptions[q.id]));

              // Type Badge
              const typeBadge = 
                q.questionType === 'free_response'
                  ? { label: 'Free-Response Assessment', color: 'bg-emerald-50 text-emerald-800 border-emerald-200', icon: PenTool }
                  : q.questionType === 'fill_blank' 
                  ? { label: 'Fill in the Blank', color: 'bg-amber-50 text-amber-800 border-amber-200', icon: PenTool }
                  : q.questionType === 'conceptual_mcq'
                  ? { label: 'Conceptual Theory MCQ', color: 'bg-purple-50 text-purple-800 border-purple-200', icon: Lightbulb }
                  : { label: 'Numerical Problem', color: 'bg-indigo-50 text-indigo-800 border-indigo-200', icon: Calculator };

              const diffBadge = 
                q.difficulty === 'Easy' 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : q.difficulty === 'Medium'
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-rose-50 text-rose-800 border-rose-200';

              const TypeIcon = typeBadge.icon;

              return (
                <div 
                  key={q.id} 
                  id={`q-${q.id}`}
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:border-slate-300 p-5 md:p-6 transition-all"
                >
                  {/* Header Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-sm text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg">
                        Q{qIndex + 1}
                      </span>
                      <span className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md border ${typeBadge.color}`}>
                        <TypeIcon className="w-3 h-3" />
                        <span>{typeBadge.label}</span>
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-50 text-slate-700 border border-slate-200">
                        {q.topicBadge}
                      </span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${diffBadge}`}>
                        {q.difficulty}
                      </span>
                    </div>
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

                  {/* Answer Entry Area */}
                  <div className="space-y-3 mb-4">
                    {/* Direct Monospace Input Box */}
                    {selectedInputFormat !== 'mcq' && (
                      <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-200">
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Direct Student Answer Input:
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={userAns}
                            onChange={(e) => handleInputChange(q.id, e.target.value)}
                            placeholder="Type exact answer here..."
                            className="flex-1 bg-white border border-slate-300 font-mono text-sm px-3 py-2 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                          {selectedInputFormat === 'hybrid' && q.questionType !== 'conceptual_mcq' && (
                            <button
                              type="button"
                              onClick={() => toggleMcqView(q.id)}
                              className="text-xs font-semibold px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg transition-colors whitespace-nowrap"
                            >
                              {showMcqOptions[q.id] ? 'Hide Options' : 'View 4 Options'}
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

                    {/* 4-Option Multiple Choice Cards */}
                    {isMcqVisible && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                        {q.options.map((opt) => {
                          const isOptionSelected = selectedOpt === opt.label || userAns.trim() === opt.text.trim();
                          return (
                            <button
                              key={opt.label}
                              type="button"
                              onClick={() => handleOptionSelect(q.id, opt)}
                              className={`flex items-start gap-2.5 p-3 rounded-xl border text-left transition-all ${
                                isOptionSelected
                                  ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold ring-2 ring-emerald-500/20'
                                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                              }`}
                            >
                              <span className={`w-6 h-6 rounded-lg font-mono font-bold text-xs flex items-center justify-center shrink-0 ${
                                isOptionSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                              }`}>
                                {opt.label}
                              </span>
                              <div className="flex-1">
                                <div className="font-mono text-xs font-semibold">{opt.text}</div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* 2-Tier Progressive Hints */}
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
                        <span>{h1Open ? 'Hide Hint 1' : 'Hint 1: Formula / Rule'}</span>
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
                        <span>{h2Open ? 'Hide Hint 2' : 'Hint 2: Starting Step'}</span>
                      </button>
                    </div>

                    {h1Open && (
                      <div className="bg-indigo-50/90 border border-indigo-200 text-indigo-950 p-3 rounded-xl text-xs leading-relaxed">
                        <span className="font-bold text-indigo-900 block mb-0.5">Governing Formula / Rule:</span>
                        {q.hint1}
                      </div>
                    )}

                    {h2Open && (
                      <div className="bg-amber-50/90 border border-amber-200 text-amber-950 p-3 rounded-xl text-xs leading-relaxed">
                        <span className="font-bold text-amber-900 block mb-0.5">Starting Step & Trap Warning:</span>
                        {q.hint2}
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

          {/* Bottom Submit Action Bar */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-slate-600">
              <span>Ready to submit? You have answered </span>
              <span className="font-bold text-slate-900">{answeredCount} of {activeQuestions.length}</span>
              <span> questions.</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleQuitToLobby}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200"
              >
                Cancel & Exit
              </button>

              <button
                onClick={handleSubmitQuiz}
                className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-600/30 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Submit Quiz & View Detailed Solutions</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
          STATE 3: POST-SUBMISSION DETAILED SCORECARD & GRAPHICAL SOLUTIONS
      ========================================================================= */}
      {quizState === 'submitted' && (
        <div className="space-y-6">

          {/* Comprehensive Scorecard Banner */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-indigo-950 text-white rounded-2xl p-6 shadow-xl border border-slate-700 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-700/80">
              <div>
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <Award className="w-4 h-4" />
                  <span>Classroom Diagnostic Evaluation</span>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  Unit 1 Examination Performance Report
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-xl">
                  Completed in {formattedTime}. Review complete graphical step-by-step classroom solutions and exam verification checks below.
                </p>
              </div>

              <div className="flex items-center gap-4 bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                <div className="text-center">
                  <div className="text-3xl font-black text-emerald-400">
                    {evaluationResults.score} <span className="text-lg font-normal text-slate-400">/ {evaluationResults.total}</span>
                  </div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Score
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

            {/* Topic-Wise Accuracy Breakdown */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
                <BarChart2 className="w-4 h-4 text-emerald-400" />
                <span>Topic-by-Topic Syllabus Accuracy Breakdown</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
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

            {/* Scorecard Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-semibold">Review:</span>
                <button
                  onClick={() => setReviewFilter('all')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                    reviewFilter === 'all'
                      ? 'bg-white text-slate-900'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  All ({activeQuestions.length})
                </button>
                <button
                  onClick={() => setReviewFilter('wrong')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                    reviewFilter === 'wrong'
                      ? 'bg-rose-500 text-white'
                      : 'bg-slate-800 text-rose-300 hover:bg-slate-700'
                  }`}
                >
                  Incorrect Only
                </button>
                <button
                  onClick={() => setReviewFilter('skipped')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                    reviewFilter === 'skipped'
                      ? 'bg-amber-500 text-slate-900'
                      : 'bg-slate-800 text-amber-300 hover:bg-slate-700'
                  }`}
                >
                  Skipped Only
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRetryIncorrect}
                  className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-semibold flex items-center gap-1.5 transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retry Incorrect Questions</span>
                </button>

                <button
                  onClick={() => handleStartQuiz()}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>Start New Random Quiz</span>
                </button>

                <button
                  onClick={handleQuitToLobby}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Back to Quiz Setup Lobby</span>
                </button>
              </div>
            </div>
          </div>

          {/* Question-by-Question Detailed Solutions Review */}
          <div className="space-y-6">
            {displayedQuestions.map((q, qIndex) => {
              const userAns = userAnswers[q.id] || "";
              const selectedOpt = userSelectedOption[q.id];
              const evalResult = evaluationResults.detail[q.id] || { isAnswered: false, isCorrect: false };

              let cardBorder = 'border-amber-400 bg-amber-50/10';
              if (evalResult.isCorrect) {
                cardBorder = 'border-emerald-500 ring-1 ring-emerald-500 bg-emerald-50/10';
              } else if (evalResult.isAnswered && !evalResult.isCorrect) {
                cardBorder = 'border-rose-500 ring-1 ring-rose-500 bg-rose-50/10';
              }

              return (
                <div 
                  key={q.id}
                  className={`bg-white rounded-2xl shadow-sm border p-5 md:p-6 transition-all ${cardBorder}`}
                >
                  {/* Header Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-sm text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg">
                        Q{qIndex + 1}
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-50 text-slate-700 border border-slate-200">
                        {q.topicBadge}
                      </span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full border bg-slate-50 text-slate-700 border-slate-200">
                        {q.difficulty}
                      </span>
                    </div>

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
                          <span>Unanswered (0 Pts)</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Question Statement */}
                  <div className="space-y-1 mb-4">
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {q.question}
                    </h3>
                    {q.promptDetail && (
                      <p className="text-xs text-slate-500 font-mono">
                        {q.promptDetail}
                      </p>
                    )}
                  </div>

                  {/* Answer Comparison Strip */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs mb-4">
                    <div>
                      <span className="text-slate-500 font-semibold block">Your Answer:</span>
                      <span className={`font-mono font-bold text-sm ${evalResult.isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {userAns || '(Unanswered / Blank)'}
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

                  {/* MCQ Option Review Strip (if applicable) */}
                  {q.options && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                      {q.options.map((opt) => {
                        const isStudentChoice = selectedOpt === opt.label || userAns.trim() === opt.text.trim();
                        let optStyle = 'bg-slate-50/70 border-slate-200 text-slate-500 opacity-70';

                        if (opt.isCorrect) {
                          optStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold ring-1 ring-emerald-500';
                        } else if (isStudentChoice && !opt.isCorrect) {
                          optStyle = 'bg-rose-50 border-rose-500 text-rose-900 line-through';
                        }

                        return (
                          <div 
                            key={opt.label}
                            className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs ${optStyle}`}
                          >
                            <span className={`w-5 h-5 rounded-md font-mono font-bold text-[11px] flex items-center justify-center shrink-0 ${
                              opt.isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                            }`}>
                              {opt.label}
                            </span>
                            <div className="flex-1">
                              <div className="font-mono">{opt.text}</div>
                              {opt.distractorReason && !opt.isCorrect && (
                                <div className="text-[10px] text-rose-700 mt-0.5">
                                  Trap: {opt.distractorReason}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Graphical Step-by-Step Classroom Solution */}
                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                      <Target className="w-4 h-4 text-emerald-600" />
                      <span>Classroom Step-by-Step Graphical Solution</span>
                    </h4>

                    {q.solution.steps.map((step, sIdx) => renderSolutionStep(step, sIdx))}
                  </div>

                  {/* 3-Second Fast Inspection Shortcut */}
                  {q.solution.fastShortcut && (
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-3 text-xs text-indigo-950 flex items-start gap-2.5 mt-3">
                      <Zap className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-indigo-900 block mb-0.5">3-Second Inspection Shortcut:</span>
                        <span className="font-mono text-indigo-900">{q.solution.fastShortcut}</span>
                      </div>
                    </div>
                  )}

                  {/* 5-Second Base-10 Verification Bar */}
                  {q.solution.verification && (
                    <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-950 flex items-start gap-2.5 mt-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-emerald-900 block mb-0.5">5-Second Base 10 Verification:</span>
                        <span className="font-mono text-emerald-900">{q.solution.verification}</span>
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>
      )}
        </>
      )}

      {/* =========================================================================
          UNIT 3 QUIZ ARENA (UPCOMING)
      ========================================================================= */}
      {activeQuizUnit === 3 && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="p-2.5 rounded-xl bg-teal-50 text-teal-700">
                  <Award className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-700">
                    Unit 3 Quiz Arena · Combinational Logic Design
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    Combinational Logic Quiz Arena
                  </h2>
                </div>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
                100+ Question Bank in Staging
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed max-w-4xl">
              Unit 3 questions cover binary adders, subtractors, decoders, priority encoders, and multiplexers with full
              gate-level propagation delay analysis.
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-teal-700">Track 1</span>
                <h3 className="text-sm font-bold text-slate-900">Half &amp; Full Adders / Subtractors</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Sum, Difference, Carry, and Borrow logic implementations using basic and universal gates.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-teal-700">Track 2</span>
                <h3 className="text-sm font-bold text-slate-900">Ripple Carry &amp; Carry Look-Ahead</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  4-bit parallel adder/subtractor, overflow flags, carry generate (Gi) and propagate (Pi) algebra.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-teal-700">Track 3</span>
                <h3 className="text-sm font-bold text-slate-900">Decoders &amp; Demultiplexers</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  2:4 and 3:8 decoders with active-low enables, minterm generation, and logic expansion trees.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-teal-700">Track 4</span>
                <h3 className="text-sm font-bold text-slate-900">Encoders &amp; Priority Encoders</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Octal-to-binary encoders, 8:3 priority encoders with valid output bit conditions.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-teal-700">Track 5</span>
                <h3 className="text-sm font-bold text-slate-900">Multiplexers (2:1, 4:1, 8:1)</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Boolean function realization using MUX without additional logic gates.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-emerald-800">Available Practice Arenas</span>
                  <h3 className="text-sm font-bold text-emerald-950 mt-1">Practice Unit 1 or Unit 2</h3>
                  <p className="text-xs text-emerald-800 leading-relaxed mt-1">
                    Try the 110-question pool for Unit 1 or the 125-question verified bank for Unit 2.
                  </p>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => setActiveQuizUnit(1)}
                    className="flex-1 px-3 py-1.5 bg-[#2E6F40] text-white rounded-lg text-xs font-semibold hover:bg-[#255A34] transition-colors text-center"
                  >
                    Unit 1 (110 Qs)
                  </button>
                  <button
                    onClick={() => setActiveQuizUnit(2)}
                    className="flex-1 px-3 py-1.5 bg-[#1B4D3E] text-white rounded-lg text-xs font-semibold hover:bg-[#153e32] transition-colors text-center"
                  >
                    Unit 2 (125 Qs)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          UNIT 4 QUIZ ARENA (UPCOMING)
      ========================================================================= */}
      {activeQuizUnit === 4 && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="p-2.5 rounded-xl bg-purple-50 text-purple-700">
                  <Award className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-700">
                    Unit 4 Quiz Arena · Clocked Sequential Circuits
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    Sequential Logic &amp; Flip-Flops Quiz Arena
                  </h2>
                </div>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
                100+ Question Bank in Staging
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed max-w-4xl">
              Unit 4 questions focus on latch/flip-flop operation, race-around prevention, excitation table lookups,
              and clocked sequential state machine analysis.
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-purple-700">Track 1</span>
                <h3 className="text-sm font-bold text-slate-900">Latches vs Clocked Flip-Flops</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  SR NAND/NOR latches, forbidden states (S=1, R=1), clocked SR and D flip-flops.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-purple-700">Track 2</span>
                <h3 className="text-sm font-bold text-slate-900">Excitation &amp; Characteristic Tables</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Characteristic equations (Qnext) and excitation tables for SR, JK, D, and T flip-flops.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-purple-700">Track 3</span>
                <h3 className="text-sm font-bold text-slate-900">Master-Slave JK &amp; Race-Around</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Race-around condition analysis, propagation delay vs pulse width, two-phase clocking.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-purple-700">Track 4</span>
                <h3 className="text-sm font-bold text-slate-900">Flip-Flop Conversions</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Converting between SR, JK, D, and T flip-flops with conversion logic truth tables.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-purple-700">Track 5</span>
                <h3 className="text-sm font-bold text-slate-900">State Diagrams &amp; FSMs</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Mealy and Moore models, state transition tables, state reduction, and next-state equations.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-emerald-800">Available Practice Arenas</span>
                  <h3 className="text-sm font-bold text-emerald-950 mt-1">Practice Unit 1 or Unit 2</h3>
                  <p className="text-xs text-emerald-800 leading-relaxed mt-1">
                    Try the 110-question pool for Unit 1 or the 125-question verified bank for Unit 2.
                  </p>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => setActiveQuizUnit(1)}
                    className="flex-1 px-3 py-1.5 bg-[#2E6F40] text-white rounded-lg text-xs font-semibold hover:bg-[#255A34] transition-colors text-center"
                  >
                    Unit 1 (110 Qs)
                  </button>
                  <button
                    onClick={() => setActiveQuizUnit(2)}
                    className="flex-1 px-3 py-1.5 bg-[#1B4D3E] text-white rounded-lg text-xs font-semibold hover:bg-[#153e32] transition-colors text-center"
                  >
                    Unit 2 (125 Qs)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          UNIT 5 QUIZ ARENA (UPCOMING)
      ========================================================================= */}
      {activeQuizUnit === 5 && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="p-2.5 rounded-xl bg-blue-50 text-blue-700">
                  <Award className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700">
                    Unit 5 Quiz Arena · Registers &amp; Counters
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    Registers &amp; Counters Quiz Arena
                  </h2>
                </div>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
                100+ Question Bank in Staging
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed max-w-4xl">
              Unit 5 questions analyze clocked register bit propagation (SISO, SIPO, PISO, PIPO), mode selections in IC 74194,
              and state decoding in ripple and synchronous Mod-N binary counters.
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-blue-700">Track 1</span>
                <h3 className="text-sm font-bold text-slate-900">Shift Register Topologies</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Serial-In Serial-Out, Serial-In Parallel-Out, Parallel-In Serial-Out, and Parallel-In Parallel-Out.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-blue-700">Track 2</span>
                <h3 className="text-sm font-bold text-slate-900">Universal Shift Register (IC 74194)</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Mode control inputs (S1, S0), parallel load, bidirectional shift right and shift left logic.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-blue-700">Track 3</span>
                <h3 className="text-sm font-bold text-slate-900">Ripple (Asynchronous) Counters</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Up/down ripple counters, cumulative propagation delay limitations, and Mod-N truncation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-blue-700">Track 4</span>
                <h3 className="text-sm font-bold text-slate-900">Synchronous Mod-N Binary Counters</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Synchronous clocking, excitation K-maps for T and JK flip-flops, and lock-out state avoidance.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-blue-700">Track 5</span>
                <h3 className="text-sm font-bold text-slate-900">Ring &amp; Johnson Counters</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  N-state ring counter sequences, 2N-state Johnson (twisted ring) counter decoding and unused state recovery.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-emerald-800">Available Practice Arenas</span>
                  <h3 className="text-sm font-bold text-emerald-950 mt-1">Practice Unit 1 or Unit 2</h3>
                  <p className="text-xs text-emerald-800 leading-relaxed mt-1">
                    Try the 110-question pool for Unit 1 or the 125-question verified bank for Unit 2.
                  </p>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => setActiveQuizUnit(1)}
                    className="flex-1 px-3 py-1.5 bg-[#2E6F40] text-white rounded-lg text-xs font-semibold hover:bg-[#255A34] transition-colors text-center"
                  >
                    Unit 1 (110 Qs)
                  </button>
                  <button
                    onClick={() => setActiveQuizUnit(2)}
                    className="flex-1 px-3 py-1.5 bg-[#1B4D3E] text-white rounded-lg text-xs font-semibold hover:bg-[#153e32] transition-colors text-center"
                  >
                    Unit 2 (125 Qs)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          ALL UNITS (1-5) GRAND MOCK EXAM
      ========================================================================= */}
      {activeQuizUnit === 'all' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="p-2.5 rounded-xl bg-indigo-50 text-indigo-700">
                  <Award className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-700">
                    Comprehensive Semester Simulator · Units 1 through 5
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    All Units (1-5) Grand Mock Exam
                  </h2>
                </div>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-200">
                60 Questions · 90 Minutes Timed
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed max-w-4xl">
              The Grand Mock Exam is the ultimate end-of-semester examination simulator. It samples a balanced, syllabus-weighted
              mix of 60 questions evenly partitioned across all five course units to assess overall semester mastery.
            </p>

            {/* Exam Blueprint Matrix */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase">Unit 1 (12 Qs)</span>
                <div className="font-bold text-xs text-slate-900 mt-1">Number Systems</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Conversions, Arithmetic, Complements</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-mono font-bold text-indigo-700 uppercase">Unit 2 (12 Qs)</span>
                <div className="font-bold text-xs text-slate-900 mt-1">Boolean Algebra</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Theorems, 3/4-Var K-Maps, NAND/NOR</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-mono font-bold text-teal-700 uppercase">Unit 3 (12 Qs)</span>
                <div className="font-bold text-xs text-slate-900 mt-1">Combinational Logic</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Adders, CLA, Decoders, Multiplexers</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-mono font-bold text-purple-700 uppercase">Unit 4 (12 Qs)</span>
                <div className="font-bold text-xs text-slate-900 mt-1">Sequential Logic</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Flip-Flops, Excitation, State Tables</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-mono font-bold text-blue-700 uppercase">Unit 5 (12 Qs)</span>
                <div className="font-bold text-xs text-slate-900 mt-1">Registers &amp; Counters</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Shift Registers, Synchronous Mod-N</div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-700">
                <span className="font-bold block text-slate-900 mb-0.5">Status: Grand Mock Simulator Pipeline</span>
                <span>Unit 1 (125 Qs) and Unit 2 (125 Qs) question pools are 100% verified. Units 3 through 5 are in development. The full 60-question simulator unlocks upon completion of all units.</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveQuizUnit(1)}
                  className="whitespace-nowrap px-3.5 py-2 bg-[#2E6F40] text-white rounded-xl text-xs font-bold hover:bg-[#255A34] transition-colors"
                >
                  Practice Unit 1 (125 Qs)
                </button>
                <button
                  onClick={() => setActiveQuizUnit(2)}
                  className="whitespace-nowrap px-3.5 py-2 bg-[#1B4D3E] text-white rounded-xl text-xs font-bold hover:bg-[#153e32] transition-colors"
                >
                  Practice Unit 2 (125 Qs)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PracticeArena;
