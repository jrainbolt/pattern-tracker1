import { useEffect, useState } from 'react';
import { ConfidenceRating, UserProgress } from '../types';

const STORAGE_KEY = 'pattern-trainer-progress';

export const defaultProgress: UserProgress = {
  completedLessons: {},
  quizStats: {
    answered: 0,
    correct: 0,
    byPattern: {}
  },
  confidence: {},
  visualizerCompletions: {}
};

const readProgress = (): UserProgress => {
  if (typeof window === 'undefined') return defaultProgress;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) return defaultProgress;

  try {
    return { ...defaultProgress, ...JSON.parse(saved) };
  } catch {
    return defaultProgress;
  }
};

const writeProgress = (progress: UserProgress) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  window.dispatchEvent(new Event('pattern-trainer-progress'));
};

export const getAccuracy = (correct: number, answered: number) => {
  if (answered === 0) return 0;
  return Math.round((correct / answered) * 100);
};

export const useProgress = () => {
  const [progress, setProgress] = useState<UserProgress>(readProgress);

  useEffect(() => {
    const sync = () => setProgress(readProgress());
    window.addEventListener('storage', sync);
    window.addEventListener('pattern-trainer-progress', sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('pattern-trainer-progress', sync);
    };
  }, []);

  const update = (recipe: (current: UserProgress) => UserProgress) => {
    const current = readProgress();
    const next = recipe(current);
    writeProgress(next);
    setProgress(next);
    return next;
  };

  return {
    progress,
    completeLesson: (patternId: string) =>
      update((current) => ({
        ...current,
        completedLessons: { ...current.completedLessons, [patternId]: true }
      })),
    recordQuizAnswer: (questionId: string, patternId: string, isCorrect: boolean, confidence: ConfidenceRating) =>
      update((current) => {
        const patternStats = current.quizStats.byPattern[patternId] ?? { answered: 0, correct: 0 };
        return {
          ...current,
          quizStats: {
            answered: current.quizStats.answered + 1,
            correct: current.quizStats.correct + (isCorrect ? 1 : 0),
            byPattern: {
              ...current.quizStats.byPattern,
              [patternId]: {
                answered: patternStats.answered + 1,
                correct: patternStats.correct + (isCorrect ? 1 : 0)
              }
            }
          },
          confidence: { ...current.confidence, [questionId]: confidence }
        };
      }),
    completeVisualizer: (visualizerId: string) =>
      update((current) => ({
        ...current,
        visualizerCompletions: { ...current.visualizerCompletions, [visualizerId]: true }
      })),
    resetProgress: () => {
      writeProgress(defaultProgress);
      setProgress(defaultProgress);
    }
  };
};
