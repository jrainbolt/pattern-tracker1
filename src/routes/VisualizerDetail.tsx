import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { CodeBlock } from '../components/CodeBlock';
import { DataStructureView } from '../components/DataStructureView';
import { ProgressBar } from '../components/ProgressBar';
import { getVisualizerById } from '../data/visualizers';
import { useProgress } from '../hooks/useProgress';

export function VisualizerDetail() {
  const { visualizerId } = useParams();
  const visualizer = visualizerId ? getVisualizerById(visualizerId) : undefined;
  const [stepIndex, setStepIndex] = useState(0);
  const { completeVisualizer, progress } = useProgress();

  if (!visualizer) return <Navigate to="/visualizers" replace />;

  const step = visualizer.steps[stepIndex];
  const progressValue = ((stepIndex + 1) / visualizer.steps.length) * 100;

  return (
    <section className="pageStack">
      <div className="pageHeader compact">
        <span className="eyebrow">{visualizer.pattern}</span>
        <h1>{visualizer.title}</h1>
        <p>{visualizer.summary}</p>
        <ProgressBar value={progressValue} label={`Step ${stepIndex + 1} of ${visualizer.steps.length}`} />
      </div>

      <div className="visualizerLayout">
        <article className="contentCard codeCard">
          <h2>Java code</h2>
          <CodeBlock code={visualizer.javaCode} highlightedLine={step.line} />
        </article>

        <div className="visualizerSide">
          <article className="contentCard">
            <h2>Data structure state</h2>
            <DataStructureView step={step} />
          </article>

          <article className="contentCard">
            <h2>Variables</h2>
            <div className="variableGrid">
              {Object.entries(step.variables).map(([key, value]) => (
                <div className="variableItem" key={key}>
                  <span>{key}</span>
                  <strong>{String(value)}</strong>
                </div>
              ))}
            </div>
          </article>

          <article className="contentCard explanationCard">
            <h2>Explanation</h2>
            <p>{step.explanation}</p>
          </article>

          <div className="controlBar">
            <button className="secondaryButton" disabled={stepIndex === 0} onClick={() => setStepIndex((value) => value - 1)} type="button">
              Back
            </button>
            <button
              className="primaryButton"
              disabled={stepIndex === visualizer.steps.length - 1}
              onClick={() => setStepIndex((value) => value + 1)}
              type="button"
            >
              Next
            </button>
            <button className="secondaryButton" onClick={() => completeVisualizer(visualizer.id)} type="button">
              <CheckCircle2 size={18} />
              {progress.visualizerCompletions[visualizer.id] ? 'Complete' : 'Mark Complete'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
