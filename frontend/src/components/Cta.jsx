const TESTIMONIALS = [
  {
    stars: '★★★★★',
    quote: 'I tried many apps but مقرأتي is the only one that actually held me accountable. I finished Al-Baqarah in 8 months — something I could never do before.',
    initials: 'YA',
    bg: '#1D4ED8',
    name: 'Yusuf Ahmed',
    role: 'Completed 3 Juz',
  },
  {
    stars: '★★★★★',
    quote: 'The Tajweed lessons are incredible. I used to think my Makharij was fine — Maqra\'ati showed me exactly where I needed work. My recitation improved in weeks.',
    initials: 'FM',
    bg: '#15803D',
    name: 'Fatima Malik',
    role: 'Hafizah in progress',
  },
  {
    stars: '★★★★★',
    quote: 'My kids are 12 and 14 and they are actually competing with each other to keep their streaks. Maqra\'ati turned Quran memorization into something they look forward to.',
    initials: 'AH',
    bg: '#7C3AED',
    name: 'Amina Hassan',
    role: 'Parent of two students',
  },
];

export function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="section-header">
        <div className="section-tag">Community</div>
        <h2 className="section-title">From learners like you</h2>
        <p className="section-sub">
          Over 120,000 Muslims worldwide are building their Hifz habit with مقرأتي.
        </p>
      </div>
      <div className="testimonials-grid">
        {TESTIMONIALS.map((t, i) => (
          <div className="testimonial-card" key={i}>
            <div className="testimonial-stars">{t.stars}</div>
            <p className="testimonial-quote">"{t.quote}"</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar" style={{ background: t.bg }}>
                {t.initials}
              </div>
              <div>
                <div className="testimonial-name">{t.name}</div>
                <div className="testimonial-role">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CtaSection() {
  return (
    <section className="cta-section">
      <div className="cta-box">
        <div style={{ fontSize: 48, marginBottom: 16 }}>📖</div>
        <h2>Begin your Hifz journey today</h2>
        <p>Free forever for the first Juz. No credit card. No excuses.</p>
        <div className="cta-actions" style={{ marginTop: 28 }}>
          <button className="btn btn-gold" style={{ fontSize: 17, padding: '16px 36px' }}>
            Start for free — it only takes 60 seconds
          </button>
        </div>
        <p style={{ marginTop: 16, fontSize: 13, color: 'var(--teal-300)', fontWeight: 500 }}>
          Join 120,000+ learners · Available on iOS & Android
        </p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <span className="footer-logo-ar">مقرأتي</span>
        Maqra<em>'ati</em>
      </div>
      <div className="footer-tagline">Your sacred space to memorize & recite the Quran.</div>
      <div className="footer-links">
        {['Features', 'Surahs', 'Tajweed Guide', 'Pricing', 'Blog', 'Contact'].map((l) => (
          <a href="#" className="footer-link" key={l}>{l}</a>
        ))}
      </div>
      <div className="footer-sep" />
      <div className="footer-copy">© 2025 Maqra'ati. Built with ❤️ for the Ummah.</div>
    </footer>
  );
}