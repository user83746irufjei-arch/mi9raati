export default function Hero() {
  return (
    <section className="hero">
      {/* Soft background blobs */}
      <div style={{
        position: 'absolute', top: -80, right: -80,
        width: 400, height: 400, borderRadius: '50%',
        background: 'var(--blue-100)', filter: 'blur(80px)',
        opacity: 0.5, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -60, left: -60,
        width: 300, height: 300, borderRadius: '50%',
        background: 'var(--blue-200)', filter: 'blur(80px)',
        opacity: 0.3, pointerEvents: 'none',
      }} />

      {/* Mascot */}
      <div className="mascot-ring animate-float" style={{ position: 'relative', zIndex: 1 }}>
        📖
        {/* Streak badge */}
        <div style={{
          position: 'absolute', top: -8, right: -8,
          background: 'var(--gold)', color: 'white',
          borderRadius: 'var(--r-full)', padding: '2px 8px',
          fontSize: 12, fontWeight: 800,
          border: '2px solid white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}>
          🔥 30
        </div>
      </div>

      <div className="hero-tag animate-fade-up">
        ✨ Memorize the Quran — one ayah at a time
      </div>

      <h1 className="animate-fade-up delay-1">
        Your journey to <span className="accent">Hifz</span> starts here.
        <span className="arabic-hero">رَبِّ زِدْنِي عِلْمًا</span>
      </h1>

      <p className="hero-sub animate-fade-up delay-2">
        Learn Tajweed, memorize Surahs, and maintain your streak — all in one
        gamified platform built for serious learners.
      </p>

      <div className="hero-actions animate-fade-up delay-3">
        <button className="btn btn-primary" style={{ fontSize: 17, padding: '16px 36px' }}>
          Start learning — it's free
        </button>
        <button className="btn btn-outline" style={{ fontSize: 17, padding: '16px 36px' }}>
          How it works
        </button>
      </div>

      <div className="hero-stats animate-fade-up delay-4">
        <div className="hstat">
          <div className="hstat-n">120K+</div>
          <div className="hstat-l">Active learners</div>
        </div>
        <div style={{ width: 1, height: 40, background: 'var(--gray-100)' }} />
        <div className="hstat">
          <div className="hstat-n">114</div>
          <div className="hstat-l">Surahs available</div>
        </div>
        <div style={{ width: 1, height: 40, background: 'var(--gray-100)' }} />
        <div className="hstat">
          <div className="hstat-n">4.9★</div>
          <div className="hstat-l">App store rating</div>
        </div>
        <div style={{ width: 1, height: 40, background: 'var(--gray-100)' }} />
        <div className="hstat">
          <div className="hstat-n">98%</div>
          <div className="hstat-l">Completion rate</div>
        </div>
      </div>
    </section>
  );
}
