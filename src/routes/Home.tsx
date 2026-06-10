import { Link } from 'react-router-dom';
import { BarChart3, Brain, Code2, Layers3, Network, Sparkles } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { getAccuracy, useProgress } from '../hooks/useProgress';
import { codingPatterns } from '../data/patterns';
import { visualizers } from '../data/visualizers';

const cards = [
  { to: '/learn', title: 'Learn Patterns', copy: 'Study Java-first recognition guides.', icon: Brain },
  { to: '/quiz', title: 'Quiz', copy: 'Flashcards that reinforce pattern choice.', icon: Sparkles },
  { to: '/visualizers', title: 'Visualizers', copy: 'Step through algorithms line by line.', icon: Layers3 },
  { to: '/progress', title: 'Progress', copy: 'See lessons, accuracy, and completions.', icon: BarChart3 },
  { to: '/system-design', title: 'System Design', copy: 'Preview the future design trainer.', icon: Network }
];

export function Home() {
  const { progress } = useProgress();
  const completedLessons = Object.values(progress.completedLessons).filter(Boolean).length;
  const completedVisualizers = Object.values(progress.visualizerCompletions).filter(Boolean).length;
  const accuracy = getAccuracy(progress.quizStats.correct, progress.quizStats.answered);

  return (
    <section className="pageStack heroPage">
      <div className="hero">
        <div className="heroIcon">
          <Code2 />
        </div>
        <span className="eyebrow">Java interview prep</span>
        <h1>Pattern Trainer</h1>
        <p>Learn coding patterns. Visualize Java solutions. Review until it sticks.</p>
      </div>

      <div className="statsGrid">
        <StatCard label="Lessons" value={`${completedLessons}/${codingPatterns.length}`} hint="completed" />
        <StatCard label="Quiz Accuracy" value={`${accuracy}%`} hint={`${progress.quizStats.answered} answered`} />
        <StatCard label="Visualizers" value={`${completedVisualizers}/${visualizers.length}`} hint="completed" />
      </div>

      <div className="homeGrid">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link className="featureCard" key={card.to} to={card.to}>
              <Icon />
              <div>
                <h2>{card.title}</h2>
                <p>{card.copy}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
