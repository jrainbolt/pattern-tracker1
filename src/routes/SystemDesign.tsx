const commonDesigns = ['URL shortener', 'Chat system', 'News feed', 'Rate limiter', 'Video platform', 'Ticket booking', 'Payment system'];
const patterns = ['caching', 'queues', 'sharding', 'replication', 'consistency', 'fanout', 'indexing', 'observability'];

export function SystemDesign() {
  return (
    <section className="pageStack">
      <div className="lessonHero systemHero">
        <span className="eyebrow">Future phase</span>
        <h1>System Design Trainer</h1>
        <p>
          A future module for practicing the interview method, recognizing architecture patterns, and making clear tradeoffs under pressure.
        </p>
      </div>

      <div className="lessonGrid">
        <article className="contentCard">
          <h2>Planned drills</h2>
          <ul>
            <li>Methodology for approaching any system design interview</li>
            <li>Requirement clarification drills</li>
            <li>Capacity estimation practice</li>
            <li>Architecture pattern recognition</li>
            <li>Tradeoff quizzes</li>
          </ul>
        </article>

        <article className="contentCard">
          <h2>Common designs</h2>
          <div className="chipGrid">
            {commonDesigns.map((item) => (
              <span className="stateChip" key={item}>{item}</span>
            ))}
          </div>
        </article>

        <article className="contentCard">
          <h2>Reusable patterns</h2>
          <div className="chipGrid">
            {patterns.map((item) => (
              <span className="stateChip" key={item}>{item}</span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
