// Smart Answer Normalizer for student rough-paper inputs
export function normalizeStudentAnswer(raw) {
  if (raw === undefined || raw === null) return "";
  let s = String(raw).trim();
  if (!s) return "";

  // Strip trailing subscript notation like _2, _10, _16, _8, or Unicode subscripts ₂, ₁₀, ₈, ₁₆
  s = s.replace(/(_(2|8|10|16)|[₂₁₀₈₁₆]+)$/i, "");

  // Strip wrapping parentheses with optional trailing base: e.g. (101101) or (101101)2
  const parenMatch = s.match(/^\(([^)]+)\)(2|8|10|16)?$/i);
  if (parenMatch) {
    s = parenMatch[1].trim();
  }

  // Strip leading plus on positive numbers: e.g. +01101 -> 01101, +424 -> 424
  if (s.startsWith("+") && s.length > 1) {
    s = s.slice(1);
  }

  // Lowercase and normalize whitespace
  return s.trim().toLowerCase();
}

// Robust Answer Evaluation Function
export function gradeStudentAnswer(userAns, question, selectedOptLabel) {
  if (!userAns && !selectedOptLabel) {
    return { isAnswered: false, isCorrect: false, selectedOption: null };
  }

  // Check if student selected an option card explicitly
  if (selectedOptLabel) {
    const opt = question.options.find(o => o.label === selectedOptLabel);
    if (opt) {
      return { isAnswered: true, isCorrect: !!opt.isCorrect, selectedOption: opt.label };
    }
  }

  const rawInput = (userAns || "").trim();
  if (!rawInput) {
    return { isAnswered: false, isCorrect: false, selectedOption: null };
  }

  // Check if student typed an option label ("A", "B", "C", "D")
  const directOpt = question.options.find(
    o => o.label.toLowerCase() === rawInput.toLowerCase()
  );
  if (directOpt) {
    return { isAnswered: true, isCorrect: !!directOpt.isCorrect, selectedOption: directOpt.label };
  }

  // Check normalized typed input against correct answer
  const normUser = normalizeStudentAnswer(rawInput);
  const normCorrect = normalizeStudentAnswer(question.correctAnswer);

  if (normUser === normCorrect) {
    return { isAnswered: true, isCorrect: true, selectedOption: null };
  }

  // Check against accepted answers
  if (question.acceptedAnswers && question.acceptedAnswers.length > 0) {
    const matchAccepted = question.acceptedAnswers.some(ans => {
      const normA = normalizeStudentAnswer(ans);
      if (normA === normUser) return true;
      // Also match without any inner spaces (e.g. "1 0 1 0 0 1" vs "101001")
      const noSpaceUser = normUser.replace(/\s+/g, '');
      const noSpaceA = normA.replace(/\s+/g, '');
      return noSpaceUser === noSpaceA;
    });
    if (matchAccepted) {
      return { isAnswered: true, isCorrect: true, selectedOption: null };
    }
  }

  // Check if typed text matches the text of the correct option
  const correctOption = question.options.find(o => o.isCorrect);
  if (correctOption) {
    const normOptText = normalizeStudentAnswer(correctOption.text);
    if (normOptText === normUser) {
      return { isAnswered: true, isCorrect: true, selectedOption: correctOption.label };
    }
  }

  return { isAnswered: true, isCorrect: false, selectedOption: null };
}
