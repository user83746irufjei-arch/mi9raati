export default function Navbar() {
  return (
    <nav className="navbar">
      <a href="#" className="navbar-logo">
        <div className="navbar-logo-icon">🌙</div>
        <div>
          <span className="navbar-logo-ar">مقرأتي</span>
          <span className="navbar-logo-text">Miqra<em>'ati</em></span>
        </div>
      </a>

      <div className="navbar-links">
        <button className="navbar-link" onClick={() => document.querySelector('.how-section').scrollIntoView({ behavior: 'smooth' })}>How it works</button>
        <button className="navbar-link" onClick={() => document.querySelector('.features-section').scrollIntoView({ behavior: 'smooth' })}>Features</button>
        <button className="navbar-link" onClick={() => document.querySelector('.tajweed-section').scrollIntoView({ behavior: 'smooth' })}>Tajweed</button>
        <button className="navbar-link" onClick={() => document.querySelector('.testimonials-section').scrollIntoView({ behavior: 'smooth' })}>Community</button>
      </div>

      <div className="navbar-actions">
        <button className="btn btn-ghost btn-sm" style={{ color: 'var(--teal-200)' }}>Sign in</button>
        <button className="btn btn-gold btn-sm">Begin your journey</button>
      </div>
    </nav>
  );
}