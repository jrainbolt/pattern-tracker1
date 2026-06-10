import { VisualizerStep } from '../types';

type DataStructureViewProps = {
  step: VisualizerStep;
};

export function DataStructureView({ step }: DataStructureViewProps) {
  return (
    <div className="vizPanel">
      {step.arrayState ? (
        <div className="arrayView">
          {step.arrayState.values.map((value, index) => {
            const active = step.arrayState?.activeIndices?.includes(index);
            const inWindow =
              step.arrayState?.window && index >= step.arrayState.window[0] && index <= step.arrayState.window[1];
            return (
              <div className={['arrayCell', active ? 'active' : '', inWindow ? 'inWindow' : ''].join(' ')} key={`${value}-${index}`}>
                <strong>{value}</strong>
                <span>{index}</span>
              </div>
            );
          })}
        </div>
      ) : null}

      {step.mapState ? (
        <div className="structureBlock">
          <h3>Map / Set</h3>
          <div className="chipGrid">
            {Object.entries(step.mapState).length === 0 ? <span className="muted">empty</span> : null}
            {Object.entries(step.mapState).map(([key, value]) => (
              <span className="stateChip" key={key}>
                {key} {'->'} {value}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {step.stackState ? (
        <div className="structureBlock">
          <h3>Stack</h3>
          <div className="stackView">
            {step.stackState.length === 0 ? <span className="muted">empty</span> : null}
            {[...step.stackState].reverse().map((item, index) => (
              <span className="stackItem" key={`${item}-${index}`}>
                {item}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {step.queueState ? (
        <div className="structureBlock">
          <h3>Queue</h3>
          <div className="queueView">
            {step.queueState.length === 0 ? <span className="muted">empty</span> : null}
            {step.queueState.map((item, index) => (
              <span className={index === 0 ? 'queueItem front' : 'queueItem'} key={`${item}-${index}`}>
                {item}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {step.result ? <div className="resultPill">Result: {step.result}</div> : null}
    </div>
  );
}
