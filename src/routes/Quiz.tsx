import { useMemo, useState } from 'react';
import { QuizCard } from '../components/QuizCard';
import { ProgressBar } from '../components/ProgressBar';
import { codingPatterns } from '../data/patterns';
import { quizQuestions } from '../data/quizQuestions';
import { useProgress } from '../hooks/useProgress';
import { ConfidenceRating } from '../types';

export function Quiz() {
  const [index, setIndex] = useState(0);
  const [sessionAnswered, setSessionAnswered] = useState(0);
  const { recordQuizAnswer } = useProgress();
  const question = quizQuestions[index % quizQuestions.length];
  const pattern = useMemo(() => codingPatterns.find((item) => item.id === question.patternId), [question.patternId]);
  const progressValue = ((index % quizQuestions.length) / quizQuestions.length) * 100;

  const handleRate = (isCorrect: boolean, confidence: ConfidenceRating) => {
    recordQuizAnswer(question.id, question.patternId, isCorrect, confidence);
    setSessionAnswered((count) => count + 1);
    setIndex((current) => current + 1);
  };

  return (
    <section className="pageStack quizPage">
      <div className="pageHeader compact">
        <span className="eyebrow">{pattern?.name ?? 'Pattern'} flashcard</span>
        <h1>Quiz</h1>
        <ProgressBar value={progressValue} label={`${sessionAnswered} reviewed this session`} />
      </div>
      <QuizCard key={question.id} onRate={handleRate} question={question} />
    </section>
  );
}
