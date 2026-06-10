import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { QuizQuestion, ConfidenceRating } from '../types';

type QuizCardProps = {
  question: QuizQuestion;
  onRate: (isCorrect: boolean, confidence: ConfidenceRating) => void;
};

const ratings: ConfidenceRating[] = ['Again', 'Hard', 'Good', 'Easy'];

export function QuizCard({ question, onRate }: QuizCardProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const isAnswered = selected !== null;
  const isCorrect = selected === question.correctAnswer;

  return (
    <article className="quizCard">
      <span className="eyebrow">{question.type}</span>
      <p className="scenario">{question.scenario}</p>
      <h2>{question.question}</h2>
      <div className="answerGrid">
        {question.answers.map((answer) => (
          <button
            className={[
              'answerButton',
              selected === answer ? 'selected' : '',
              isAnswered && answer === question.correctAnswer ? 'correct' : '',
              selected === answer && selected !== question.correctAnswer ? 'wrong' : ''
            ].join(' ')}
            disabled={isAnswered}
            key={answer}
            onClick={() => setSelected(answer)}
            type="button"
          >
            {answer}
          </button>
        ))}
      </div>

      {isAnswered ? (
        <div className={isCorrect ? 'feedback correctText' : 'feedback wrongText'}>
          {isCorrect ? <CheckCircle2 /> : <XCircle />}
          <div>
            <strong>{isCorrect ? 'Correct' : 'Not quite'}</strong>
            <p>{question.explanation}</p>
          </div>
        </div>
      ) : null}

      {isAnswered ? (
        <div className="confidenceBlock">
          <span>How did it feel?</span>
          <div className="ratingGrid">
            {ratings.map((rating) => (
              <button key={rating} onClick={() => onRate(isCorrect, rating)} type="button">
                {rating}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </article>
  );
}
