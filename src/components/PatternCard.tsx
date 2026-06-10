import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { CodingPattern } from '../types';

type PatternCardProps = {
  pattern: CodingPattern;
  completed?: boolean;
};

export function PatternCard({ pattern, completed }: PatternCardProps) {
  return (
    <Link className="patternCard" to={`/learn/${pattern.id}`}>
      <div>
        <span className="eyebrow">{pattern.category}</span>
        <h3>{pattern.name}</h3>
        <p>{pattern.summary}</p>
      </div>
      <div className="cardFooter">
        <span>{pattern.exampleProblems.length} examples</span>
        {completed ? <CheckCircle2 className="successIcon" aria-label="Completed" /> : null}
      </div>
    </Link>
  );
}
