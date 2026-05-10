import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLanding = location.pathname === '/';

  function scrollTo(selector) {
    if (!isLanding) {
      navigate('/');
      setTimeout(() => {
        document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <nav className="navbar">
      <a href="/" className="navbar-logo" onClick={e => { e.preventDefault(); navigate('/'); }}>
        <div className="navbar-logo-icon">🌙</div>
        <div>
          <span className="navbar-logo-ar">مقرأتي</span>
          <span className="navbar-logo-text">Miqra<em>'ati</em></span>
        </div>
      </a>

      <div className="navbar-links">
        <button className="navbar-link" onClick={() => scrollTo('.how-section')}>How it works</button>
        <button className="navbar-link" onClick={() => scrollTo('.features-section')}>Features</button>
        <button className="navbar-link" onClick={() => scrollTo('.tajweed-section')}>Tajweed</button>
        <button className="navbar-link" onClick={() => scrollTo('.testimonials-section')}>Community</button>
      </div>

      <div className="navbar-actions">
        <button
          className="btn btn-ghost btn-sm"
          style={{ color: 'var(--teal-200)' }}
          onClick={() => navigate('/signin')}
        >
          Sign in
        </button>
        <button
          className="btn btn-gold btn-sm"
          onClick={() => navigate('/signup')}
        >
          Begin your journey
        </button>
      </div>
    </nav>
  );
}