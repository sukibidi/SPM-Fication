import { SUBJECT_ORDER } from './subjects';
import { QUESTION_BANK } from './questions';

export const TIMER_DURATION = 10;
export const BONUS_TIME_PER_CORRECT = 0.5;
export const QUESTIONS_PER_RUN = 5;
export const BASE_POINTS = 100;
export const STREAK_MULTIPLIERS = [1, 1, 1.5, 2, 3, 5];
export const POWERUP_SHIELD_MAX = 1;
export const POWERUP_FREEZE_MAX = 1;

export const RANK_THRESHOLDS = [
  { label: 'Novice', minScore: 0 },
  { label: 'Cadet', minScore: 1000 },
  { label: 'Strategist', minScore: 2500 },
  { label: 'Elite', minScore: 4500 },
  { label: 'Grandmaster', minScore: 7000 },
];

export function getQuestionsForRun(subjectId, locale) {
  const targetLocale = locale || 'ms';
  const pool = QUESTION_BANK.filter((q) => q.locale === targetLocale);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);

  if (subjectId) {
    const subjectPool = shuffled.filter((q) => q.subjectId === subjectId);
    const count = Math.min(QUESTIONS_PER_RUN, subjectPool.length);
    return subjectPool.slice(0, count);
  }

  return SUBJECT_ORDER.map((subjId, index) => {
    const subjPool = shuffled.filter((q) => q.subjectId === subjId);
    return subjPool[index % subjPool.length] || shuffled[Math.floor(Math.random() * shuffled.length)];
  });
}

export function calculateScore(basePoints, streak, timeLeft, totalTime) {
  const multiplier = STREAK_MULTIPLIERS[Math.min(streak, STREAK_MULTIPLIERS.length - 1)];
  const timeBonus = 1 + (timeLeft / totalTime) * 0.5;
  return Math.round(basePoints * multiplier * timeBonus);
}

export function getRank(score) {
  let rank = RANK_THRESHOLDS[0];
  for (const r of RANK_THRESHOLDS) {
    if (score >= r.minScore) rank = r;
  }
  return rank;
}