import { NavLink, Outlet } from 'react-router-dom';
import { BarChart3, Brain, Home, Layers3, Network, Sparkles } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/learn', label: 'Learn', icon: Brain },
  { to: '/quiz', label: 'Quiz', icon: Sparkles },
  { to: '/visualizers', label: 'Visuals', icon: Layers3 },
  { to: '/progress', label: 'Progress', icon: BarChart3 },
  { to: '/system-design', label: 'Design', icon: Network }
];

export function AppLayout() {
  return (
    <div className="appShell">
      <header className="topBar">
        <NavLink className="brand" to="/">
          <span className="brandMark">PT</span>
          <span>Pattern Trainer</span>
        </NavLink>
      </header>
      <main className="mainContent">
        <Outlet />
      </main>
      <nav className="bottomNav" aria-label="Primary navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink className="navItem" end={item.to === '/'} key={item.to} to={item.to}>
              <Icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
