export default function Navbar() {
  return (
    <nav className="navbar">
      <a href="#" className="navbar-logo">
        <div className="navbar-logo-icon">📖</div>
        <div className="navbar-logo-text">
          <span className="navbar-logo-ar">مقرأتي</span>
          Maqra<em>'ati</em>
        </div>
      </a>

      <div className="navbar-links">
        <button className="navbar-link">How it works</button>
        <button className="navbar-link">Features</button>
        <button className="navbar-link">Tajweed</button>
        <button className="navbar-link">Pricing</button>
      </div>

      <div className="navbar-actions">
        <button className="btn btn-ghost btn-sm" style={{ color: 'var(--teal-200)' }}>Sign in</button>
        <button className="btn btn-gold btn-sm">Begin your journey</button>
      </div>
    </nav>
  );
}