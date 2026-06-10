import { Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { Home } from './routes/Home';
import { Learn } from './routes/Learn';
import { PatternLesson } from './routes/PatternLesson';
import { Quiz } from './routes/Quiz';
import { Visualizers } from './routes/Visualizers';
import { VisualizerDetail } from './routes/VisualizerDetail';
import { Progress } from './routes/Progress';
import { SystemDesign } from './routes/SystemDesign';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route element={<Home />} path="/" />
        <Route element={<Learn />} path="/learn" />
        <Route element={<PatternLesson />} path="/learn/:patternId" />
        <Route element={<Quiz />} path="/quiz" />
        <Route element={<Visualizers />} path="/visualizers" />
        <Route element={<VisualizerDetail />} path="/visualizers/:visualizerId" />
        <Route element={<Progress />} path="/progress" />
        <Route element={<SystemDesign />} path="/system-design" />
      </Route>
    </Routes>
  );
}
