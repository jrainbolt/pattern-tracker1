export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type CodingPattern = {
  id: string;
  name: string;
  category: string;
  summary: string;
  whenToUse: string[];
  clues: string[];
  commonDataStructures: string[];
  javaTemplate: string;
  pitfalls: string[];
  exampleProblems: {
    title: string;
    originalSummary: string;
    difficulty: Difficulty;
    externalUrl?: string;
  }[];
};

export type QuizQuestionType =
  | 'Identify the pattern'
  | 'Choose the best data structure'
  | 'Choose the expected time complexity'
  | 'Pick the next step in the approach';

export type QuizQuestion = {
  id: string;
  patternId: string;
  type: QuizQuestionType;
  scenario: string;
  question: string;
  answers: string[];
  correctAnswer: string;
  explanation: string;
};

export type ConfidenceRating = 'Again' | 'Hard' | 'Good' | 'Easy';

export type UserProgress = {
  completedLessons: Record<string, boolean>;
  quizStats: {
    answered: number;
    correct: number;
    byPattern: Record<
      string,
      {
        answered: number;
        correct: number;
      }
    >;
  };
  confidence: Record<string, ConfidenceRating>;
  visualizerCompletions: Record<string, boolean>;
};

export type VisualizerStep = {
  line: number;
  explanation: string;
  variables: Record<string, string | number | boolean | null>;
  arrayState?: {
    values: number[] | string[];
    activeIndices?: number[];
    window?: [number, number];
  };
  mapState?: Record<string, string | number>;
  stackState?: string[];
  queueState?: string[];
  result?: string;
};

export type AlgorithmVisualizer = {
  id: string;
  title: string;
  patternId: string;
  pattern: string;
  summary: string;
  javaCode: string;
  steps: VisualizerStep[];
};
