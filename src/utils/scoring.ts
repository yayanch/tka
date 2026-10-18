import { Question, QuestionState, UserAnswerValue } from '../types/quiz';

/**
 * Calculates score and correctness for a single question based on user input.
 * Returns scoreEarned (0.0 to 1.0) and isCorrect (boolean).
 */
export function evaluateAnswer(
  question: Question,
  userAnswer?: UserAnswerValue
): { isCorrect: boolean; scoreEarned: number } {
  if (userAnswer === undefined || userAnswer === null) {
    return { isCorrect: false, scoreEarned: 0 };
  }

  if (question.type === 'PG') {
    const isCorrect = userAnswer === question.correctOptionIndex;
    return {
      isCorrect,
      scoreEarned: isCorrect ? 1 : 0,
    };
  }

  if (question.type === 'PGK_KATEGORI') {
    const userMap = userAnswer as Record<string, 'Benar' | 'Salah'>;
    if (!userMap || !question.statements || question.statements.length === 0) {
      return { isCorrect: false, scoreEarned: 0 };
    }

    let correctCount = 0;
    const total = question.statements.length;

    for (const stmt of question.statements) {
      if (userMap[stmt.id] === stmt.answer) {
        correctCount += 1;
      }
    }

    const scoreEarned = Number((correctCount / total).toFixed(2));
    const isCorrect = correctCount === total;
    return { isCorrect, scoreEarned };
  }

  if (question.type === 'PGK_MCMA') {
    const selectedIndices = (userAnswer as number[]) || [];
    const correctIndices = question.correctMcmaIndices || [0, 1, 2];

    if (selectedIndices.length === 0) {
      return { isCorrect: false, scoreEarned: 0 };
    }

    let correctPicks = 0;
    let wrongPicks = 0;

    for (const idx of selectedIndices) {
      if (correctIndices.includes(idx)) {
        correctPicks += 1;
      } else {
        wrongPicks += 1;
      }
    }

    // Exact match for full isCorrect
    const isCorrect =
      correctPicks === correctIndices.length && wrongPicks === 0;

    // Partial scoring formula: (correctPicks - wrongPicks) / totalCorrect
    const rawScore = (correctPicks - wrongPicks) / correctIndices.length;
    const scoreEarned = Number(Math.max(0, Math.min(1, rawScore)).toFixed(2));

    return { isCorrect, scoreEarned };
  }

  return { isCorrect: false, scoreEarned: 0 };
}

/**
 * Calculates session summary statistics and real-time score.
 */
export function calculateSessionSummary(
  questions: Question[],
  answers: Record<string, QuestionState>
) {
  let totalScoreEarned = 0;
  let correctCount = 0;
  let partialCount = 0;
  let wrongCount = 0;
  let answeredCount = 0;
  let flaggedCount = 0;

  for (const q of questions) {
    const state = answers[q.id];
    if (state?.isFlagged) {
      flaggedCount += 1;
    }

    if (state && state.answered && state.value !== undefined) {
      answeredCount += 1;
      const { isCorrect, scoreEarned } = evaluateAnswer(q, state.value);
      totalScoreEarned += scoreEarned;

      if (isCorrect) {
        correctCount += 1;
      } else if (scoreEarned > 0) {
        partialCount += 1;
      } else {
        wrongCount += 1;
      }
    }
  }

  const totalQuestions = questions.length;
  const unansweredCount = totalQuestions - answeredCount;
  
  // Real-time score scale 0-100 relative to total questions in the test
  const finalScore = totalQuestions > 0 
    ? Number(((totalScoreEarned / totalQuestions) * 100).toFixed(1))
    : 0;

  // Accuracy relative to answered questions
  const accuracyRate = answeredCount > 0 
    ? Number(((totalScoreEarned / answeredCount) * 100).toFixed(1))
    : 0;

  return {
    totalQuestions,
    answeredCount,
    unansweredCount,
    flaggedCount,
    totalScoreEarned: Number(totalScoreEarned.toFixed(2)),
    correctCount,
    partialCount,
    wrongCount,
    finalScore,
    accuracyRate,
  };
}
