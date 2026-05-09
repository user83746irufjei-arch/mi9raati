import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <a href="#" className="navbar-logo">
        <div className="navbar-logo-icon">📖</div>
        <div className="navbar-logo-text">Hifz<em>Flow</em></div>
      </a>

      <div className="navbar-links">
        <button className="navbar-link">Features</button>
        <button className="navbar-link">Surahs</button>
        <button className="navbar-link">Leaderboard</button>
        <button className="navbar-link">Pricing</button>
      </div>

      <div className="navbar-actions">
        <button className="btn btn-ghost btn-sm">Sign in</button>
        <button className="btn btn-primary btn-sm">Start for free</button>
      </div>
    </nav>
  );
}
