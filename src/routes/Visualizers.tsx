import { Link } from 'react-router-dom';
import { CheckCircle2, Play } from 'lucide-react';
import { visualizers } from '../data/visualizers';
import { useProgress } from '../hooks/useProgress';

export function Visualizers() {
  const { progress } = useProgress();

  return (
    <section className="pageStack">
      <div className="pageHeader">
        <span className="eyebrow">Java algorithm visualizers</span>
        <h1>Step Through the Pattern</h1>
        <p>Scripted walkthroughs show code, variables, and data structures changing together.</p>
      </div>

      <div className="patternGrid">
        {visualizers.map((visualizer) => (
          <Link className="patternCard visualizerCard" key={visualizer.id} to={`/visualizers/${visualizer.id}`}>
            <div>
              <span className="eyebrow">{visualizer.pattern}</span>
              <h3>{visualizer.title}</h3>
              <p>{visualizer.summary}</p>
            </div>
            <div className="cardFooter">
              <span>{visualizer.steps.length} steps</span>
              {progress.visualizerCompletions[visualizer.id] ? <CheckCircle2 className="successIcon" /> : <Play size={22} />}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
