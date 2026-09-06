import { useReducer, useCallback, useMemo } from 'react';
import { getQuestionsForRun, calculateScore, TIMER_DURATION, BONUS_TIME_PER_CORRECT, BASE_POINTS, QUESTIONS_PER_RUN } from '../data/game';
import { loadLeaderboard, saveLeaderboard, submitScore } from '../data/leaderboard';

const ACTIONS = {
  START_RUN: 'START_RUN',
  SELECT_ANSWER: 'SELECT_ANSWER',
  TIMEOUT: 'TIMEOUT',
  DISMISS_FEEDBACK: 'DISMISS_FEEDBACK',
  FINISH_RUN: 'FINISH_RUN',
  SUBMIT_SCORE: 'SUBMIT_SCORE',
  RESTART: 'RESTART',
  SET_PLAYER_NAME: 'SET_PLAYER_NAME',
};

const initialState = {
  screen: 'landing',
  playerName: '',
  questions: [],
  currentIndex: 0,
  score: 0,
  streak: 0,
  maxStreak: 0,
  answers: [],
  selectedKey: null,
  feedbackState: null,
  totalTime: 0,
  leaderboard: loadLeaderboard(),
  shields: 0,
  freezes: 0,
  selectedSubjectId: null,
  locale: 'ms',
};

function buildQuestions(subjectId, locale) {
  return getQuestionsForRun(subjectId, locale).slice(0, QUESTIONS_PER_RUN);
}

function gameReducer(state, action) {
  switch (action.type) {
    case ACTIONS.START_RUN: {
      const subjectId = action.payload?.subjectId || null;
      const locale = action.payload?.locale || state.locale || 'ms';
      const qs = buildQuestions(subjectId, locale);
      return {
        ...initialState,
        playerName: state.playerName,
        selectedSubjectId: subjectId,
        locale,
        questions: qs,
        screen: 'playing',
        currentIndex: 0,
        score: 0,
        streak: 0,
        answers: [],
        selectedKey: null,
        totalTime: 0,
        shields: action.payload?.hasShields ? 1 : 0,
        freezes: 0,
        leaderboard: state.leaderboard,
      };
    }

    case ACTIONS.SELECT_ANSWER: {
      const { questions, currentIndex, score, streak, answers } = state;
      const q = questions[currentIndex];
      if (!q) return state;
      const correct = action.payload.key === q.correctKey;
      const newStreak = correct ? streak + 1 : 0;
      const newMaxStreak = Math.max(state.maxStreak, newStreak);
      const pts = correct
        ? calculateScore(BASE_POINTS, newStreak, action.payload.timeLeft, TIMER_DURATION)
        : 0;
      return {
        ...state,
        selectedKey: action.payload.key,
        score: score + pts,
        streak: newStreak,
        maxStreak: newMaxStreak,
        totalTime: state.totalTime + (TIMER_DURATION - action.payload.timeLeft),
        answers: [...answers, { questionIndex: currentIndex, correct, selectedKey: action.payload.key, timeLeft: action.payload.timeLeft }],
        feedbackState: correct ? 'correct' : 'incorrect',
        shields: correct ? state.shields : Math.max(0, state.shields - 1),
      };
    }

    case ACTIONS.TIMEOUT: {
      const { currentIndex, questions, score, answers } = state;
      const q = questions[currentIndex];
      return {
        ...state,
        selectedKey: null,
        streak: 0,
        totalTime: state.totalTime + TIMER_DURATION,
        answers: [...answers, { questionIndex: currentIndex, correct: false, selectedKey: null, timeLeft: 0 }],
        feedbackState: 'timeout',
      };
    }

    case ACTIONS.DISMISS_FEEDBACK: {
      const nextIndex = state.currentIndex + 1;
      if (nextIndex >= state.questions.length) {
        return { ...state, screen: 'ended', feedbackState: null, currentIndex: nextIndex };
      }
      return { ...state, currentIndex: nextIndex, selectedKey: null, feedbackState: null };
    }

    case ACTIONS.FINISH_RUN:
      return { ...state, screen: 'ended', feedbackState: null };

    case ACTIONS.SUBMIT_SCORE: {
      const entry = submitScore(state.playerName, state.score, state.maxStreak, state.totalTime);
      const board = loadLeaderboard();
      return { ...state, leaderboard: board };
    }

    case ACTIONS.SET_PLAYER_NAME:
      return { ...state, playerName: action.payload.slice(0, 24) };

    case ACTIONS.RESTART:
      return { ...initialState, playerName: state.playerName, leaderboard: loadLeaderboard() };

    default:
      return state;
  }
}

export default function useGameEngine() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const startRun = useCallback((hasShields, subjectId, locale) => {
    dispatch({ type: ACTIONS.START_RUN, payload: { hasShields: !!hasShields, subjectId: subjectId || null, locale: locale || 'ms' } });
  }, []);

  const selectAnswer = useCallback((key, timeLeft) => {
    dispatch({ type: ACTIONS.SELECT_ANSWER, payload: { key, timeLeft } });
  }, []);

  const handleTimeout = useCallback(() => {
    dispatch({ type: ACTIONS.TIMEOUT });
  }, []);

  const dismissFeedback = useCallback(() => {
    dispatch({ type: ACTIONS.DISMISS_FEEDBACK });
  }, []);

  const submitPlayerScore = useCallback(() => {
    dispatch({ type: ACTIONS.SUBMIT_SCORE });
  }, []);

  const setPlayerName = useCallback((name) => {
    dispatch({ type: ACTIONS.SET_PLAYER_NAME, payload: name });
  }, []);

  const restart = useCallback(() => {
    dispatch({ type: ACTIONS.RESTART });
  }, []);

  const currentQuestion = useMemo(
    () => state.questions[state.currentIndex] || null,
    [state.questions, state.currentIndex]
  );

  const isLastQuestion = state.currentIndex >= state.questions.length - 1;

  return {
    ...state,
    currentQuestion,
    isLastQuestion,
    startRun,
    selectAnswer,
    handleTimeout,
    dismissFeedback,
    submitPlayerScore,
    setPlayerName,
    restart,
  };
}
