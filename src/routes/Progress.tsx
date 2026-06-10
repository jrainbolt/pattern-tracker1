import { codingPatterns } from '../data/patterns';
import { visualizers } from '../data/visualizers';
import { getAccuracy, useProgress } from '../hooks/useProgress';
import { ProgressBar } from '../components/ProgressBar';
import { StatCard } from '../components/StatCard';

export function Progress() {
  const { progress, resetProgress } = useProgress();
  const completedLessons = Object.values(progress.completedLessons).filter(Boolean).length;
  const completedVisualizers = Object.values(progress.visualizerCompletions).filter(Boolean).length;
  const accuracy = getAccuracy(progress.quizStats.correct, progress.quizStats.answered);

  return (
    <section className="pageStack">
      <div className="pageHeader">
        <span className="eyebrow">Local progress</span>
        <h1>Your Training Stats</h1>
        <p>Progress is stored in this browser with localStorage.</p>
      </div>

      <div className="statsGrid">
        <StatCard label="Quiz Answered" value={progress.quizStats.answered} />
        <StatCard label="Accuracy" value={`${accuracy}%`} hint={`${progress.quizStats.correct} correct`} />
        <StatCard label="Lessons" value={`${completedLessons}/${codingPatterns.length}`} />
        <StatCard label="Visualizers" value={`${completedVisualizers}/${visualizers.length}`} />
      </div>

      <article className="contentCard">
        <h2>Accuracy by pattern</h2>
        <div className="progressList">
          {codingPatterns.map((pattern) => {
            const stats = progress.quizStats.byPattern[pattern.id] ?? { answered: 0, correct: 0 };
            const patternAccuracy = getAccuracy(stats.correct, stats.answered);
            return (
              <div className="progressRow" key={pattern.id}>
                <div>
                  <strong>{pattern.name}</strong>
                  <span>{stats.answered} answered</span>
                </div>
                <ProgressBar value={patternAccuracy} label={`${patternAccuracy}%`} />
              </div>
            );
          })}
        </div>
      </article>

      <article className="contentCard">
        <h2>Completed lessons</h2>
        <div className="chipGrid">
          {codingPatterns.map((pattern) => (
            <span className={progress.completedLessons[pattern.id] ? 'stateChip done' : 'stateChip'} key={pattern.id}>
              {pattern.name}
            </span>
          ))}
        </div>
      </article>

      <article className="contentCard">
        <h2>Completed visualizers</h2>
        <div className="chipGrid">
          {visualizers.map((visualizer) => (
            <span className={progress.visualizerCompletions[visualizer.id] ? 'stateChip done' : 'stateChip'} key={visualizer.id}>
              {visualizer.title}
            </span>
          ))}
        </div>
      </article>

      <button className="dangerButton" onClick={resetProgress} type="button">
        Reset Progress
      </button>
    </section>
  );
}
