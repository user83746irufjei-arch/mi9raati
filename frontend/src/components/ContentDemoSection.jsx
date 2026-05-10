export default function ContentDemoSection() {
  return (
    <section className="preview-section">
      <div className="section-header">
        <h2 className="section-title">Experience the journey</h2>
        <p className="section-sub">
          A glimpse of how Miqra'ati guides you — lesson by lesson, ayah by ayah — through the Quran.
        </p>
      </div>

      <div className="preview-mockup">
        <div className="mockup-header">
          <div className="mockup-dots">
            <div className="mockup-dot" style={{ background: '#EF4444' }}></div>
            <div className="mockup-dot" style={{ background: '#F59E0B' }}></div>
            <div className="mockup-dot" style={{ background: '#22C55E' }}></div>
          </div>
          <div className="mockup-title">Surah Al-Fatiha</div>
        </div>
        <div className="mockup-body">
          <div className="mockup-surah-header">
            <div className="mockup-surah-ar">الفاتحة</div>
            <div className="mockup-surah-en">The Opening — Al-Fatiha</div>
          </div>
          {[
            { n: 1, ar: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', tr: 'Bismillāhir-raḥmānir-raḥīm' },
            { n: 2, ar: 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ', tr: 'Al-ḥamdu lillāhi rabbi l-ʿālamīn' },
            { n: 3, ar: 'ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', tr: 'Ar-raḥmānir-raḥīm' },
          ].map(ayah => (
            <div className="mockup-ayah-row" key={ayah.n}>
              <div className="mockup-ayah-num">{ayah.n}</div>
              <div style={{ flex: 1 }}>
                <div className="mockup-ayah-ar">{ayah.ar}</div>
                <div className="mockup-ayah-tr">{ayah.tr}</div>
              </div>
            </div>
          ))}
          <div className="mockup-progress-bar">
            <div className="mockup-progress-fill"></div>
          </div>
        </div>
      </div>

      <p className="preview-label">
        Color-coded Tajweed markup · Structured lesson path · Expert reciter audio
      </p>

      <div style={{ textAlign: 'center', marginTop: 28 }}>
        <button className="btn btn-primary">
          Explore all 114 Surahs →
        </button>
      </div>
    </section>
  );
}