
export default function TajweedSection() {
  return (
    <section className="tajweed-section">
      <div className="section-header">
        <h2 className="section-title">Master Tajweed, one rule at a time</h2>
        <p className="section-sub">
          Structured video lessons, classical text explanations, and curated recitations —
          everything you need to recite with precision and beauty.
        </p>
      </div>

      <div className="tajweed-cards-grid">

        {/* Card 1 — Video */}
        <div className="tajweed-card tajweed-card--video">
          <div className="tajweed-video-thumb">
            <div style={{
              width: '100%',
              minHeight: 260,
              background: 'linear-gradient(135deg, var(--teal-900) 0%, var(--teal-700) 60%, var(--teal-600) 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
            }}>
              <div style={{
                fontFamily: "'Amiri', serif",
                fontSize: 32,
                color: 'var(--gold-300)',
                direction: 'rtl',
              }}>تجويد</div>
              <div style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 28,
                color: 'var(--white)',
                letterSpacing: '-0.5px',
              }}>Lesson 1</div>
              <div style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--teal-300)',
                fontFamily: "'Lora', serif",
              }}>Introduction to Tajweed</div>
            </div>
            <div className="tajweed-play-btn">
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                <path d="M1 1.5L17 10L1 18.5V1.5Z" fill="var(--gold-500)" stroke="var(--gold-500)" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="tajweed-video-label">
              <span className="tajweed-video-title">Tajweed lessons</span>
              <span className="tajweed-video-tag">Video Lesson</span>
            </div>
          </div>
        </div>

        {/* Card 2 — Explanation */}
        <div className="tajweed-card">
          <div className="tajweed-card-icon">📖</div>
          <div className="tajweed-card-ar">شرح تحفة الأطفال</div>
          <div className="tajweed-card-subtitle">Explanation of Tuḥfat al-Aṭfāl</div>
          <p className="tajweed-card-desc">
            The classical beginner's poem on Tajweed rules — broken down verse by verse
            with examples and audio.
          </p>
          <button className="tajweed-card-link">Read explanation →</button>
        </div>

        {/* Card 3 — Listening */}
        <div className="tajweed-card">
          <div className="tajweed-card-icon">🎧</div>
          <div className="tajweed-card-title-main">Listen: Al-Fatiha</div>
          <div className="tajweed-card-ar" style={{ fontSize: 17 }}>رواية ورش عن نافع</div>
          <div className="tajweed-card-subtitle">Riwāyat Warsh ʿan Nāfiʿ</div>
          <p className="tajweed-card-desc">
            Train your ear to the Warsh recitation — one of the oldest and most melodious
            transmissions of the Quran.
          </p>
          <button className="tajweed-card-link">Listen now →</button>
        </div>

      </div>
    </section>
  );
}
