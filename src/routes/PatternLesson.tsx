import { Link, Navigate, useParams } from 'react-router-dom';
import { CheckCircle2, ExternalLink } from 'lucide-react';
import { CodeBlock } from '../components/CodeBlock';
import { getPatternById } from '../data/patterns';
import { useProgress } from '../hooks/useProgress';

export function PatternLesson() {
  const { patternId } = useParams();
  const pattern = patternId ? getPatternById(patternId) : undefined;
  const { completeLesson, progress } = useProgress();

  if (!pattern) return <Navigate to="/learn" replace />;

  return (
    <section className="pageStack">
      <div className="lessonHero">
        <span className="eyebrow">{pattern.category}</span>
        <h1>{pattern.name}</h1>
        <p>{pattern.summary}</p>
        <div className="actionRow">
          <button className="primaryButton" onClick={() => completeLesson(pattern.id)} type="button">
            <CheckCircle2 size={20} />
            {progress.completedLessons[pattern.id] ? 'Completed' : 'Mark Lesson Complete'}
          </button>
          <Link className="secondaryButton" to="/quiz">
            Start Quiz
          </Link>
        </div>
      </div>

      <div className="lessonGrid">
        <article className="contentCard">
          <h2>When to use it</h2>
          <ul>{pattern.whenToUse.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <article className="contentCard">
          <h2>Recognition clues</h2>
          <ul>{pattern.clues.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <article className="contentCard">
          <h2>Common data structures</h2>
          <div className="chipGrid">
            {pattern.commonDataStructures.map((item) => (
              <span className="stateChip" key={item}>{item}</span>
            ))}
          </div>
        </article>
        <article className="contentCard">
          <h2>Pitfalls</h2>
          <ul>{pattern.pitfalls.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
      </div>

      <article className="contentCard">
        <h2>Java template</h2>
        <CodeBlock code={pattern.javaTemplate} />
      </article>

      <article className="contentCard">
        <h2>Original example prompts</h2>
        <div className="exampleList">
          {pattern.exampleProblems.map((problem) => (
            <div className="exampleItem" key={problem.title}>
              <div>
                <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span>
                <h3>{problem.title}</h3>
                <p>{problem.originalSummary}</p>
              </div>
              {problem.externalUrl ? (
                <a href={problem.externalUrl} rel="noreferrer" target="_blank" aria-label={`${problem.title} external problem`}>
                  <ExternalLink size={20} />
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
