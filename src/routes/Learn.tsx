import { PatternCard } from '../components/PatternCard';
import { codingPatterns } from '../data/patterns';
import { useProgress } from '../hooks/useProgress';

export function Learn() {
  const { progress } = useProgress();

  return (
    <section className="pageStack">
      <div className="pageHeader">
        <span className="eyebrow">Coding Patterns MVP</span>
        <h1>Pattern Library</h1>
        <p>Build fast recognition for the patterns that show up again and again in Java interviews.</p>
      </div>

      <div className="patternGrid">
        {codingPatterns.map((pattern) => (
          <PatternCard completed={progress.completedLessons[pattern.id]} key={pattern.id} pattern={pattern} />
        ))}
      </div>
    </section>
  );
}
