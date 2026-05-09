export default function Hero() {
  return (
    <section className="hero">
      <div className="animate-fade-up">
        <div className="hero-badge">
          ✦ A place of recitation, reflection, and growth
        </div>
      </div>

      <span className="hero-arabic-title animate-fade-up delay-1">
        مقرأتي — مكانك لتلاوة القرآن الكريم
      </span>

      <h1 className="animate-fade-up delay-1">
        Your sacred space to<br />
        <span className="accent">memorize & recite</span><br />
        the Quran
      </h1>

      <p className="hero-tagline animate-fade-up delay-2">
        A thoughtfully crafted journey through recitation lessons, Tajweed mastery,
        and meaningful progress — one ayah at a time.
      </p>

      <span className="hero-ayah animate-fade-up delay-3">
        وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا
      </span>
      <span className="hero-ayah-ref animate-fade-up delay-3">
        Surah Al-Muzzammil · 73:4
      </span>

      <div className="hero-actions animate-fade-up delay-3">
        <button className="btn btn-gold" style={{ fontSize: 17, padding: '16px 36px' }}>
          Begin your journey
        </button>
        <button className="btn btn-outline" style={{
          fontSize: 17, padding: '16px 36px',
          color: 'var(--teal-100)',
          boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.25)',
        }}>
          See how it works
        </button>
      </div>

      <div className="hero-stats animate-fade-up delay-4">
        <div className="hstat">
          <div className="hstat-n">120K+</div>
          <div className="hstat-l">Learners worldwide</div>
        </div>
        <div className="hstat-divider" />
        <div className="hstat">
          <div className="hstat-n">114</div>
          <div className="hstat-l">Surahs available</div>
        </div>
        <div className="hstat-divider" />
        <div className="hstat">
          <div className="hstat-n">4.9★</div>
          <div className="hstat-l">App store rating</div>
        </div>
        <div className="hstat-divider" />
        <div className="hstat">
          <div className="hstat-n">30+</div>
          <div className="hstat-l">Tajweed lessons</div>
        </div>
      </div>
    </section>
  );
}