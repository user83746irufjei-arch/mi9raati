import { useState } from 'react';

const tabs = ['Home', 'Courses', 'Practice'];

export default function Navbar() {
  const [active, setActive] = useState('Home');

  return (
    <nav className="nav">
      <div className="logo">
        Learn<em>Flow</em>
      </div>

      <div className="nav-pills">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`nav-pill${active === tab ? ' active' : ''}`}
            onClick={() => setActive(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="nav-right">
        <div className="streak-badge">
          🔥 12
        </div>
        <div className="xp-badge">
          ⚡ 2,840
        </div>
        <div className="avatar" title="Jamie S.">JS</div>
      </div>
    </nav>
  );
}
