const DEMO_AYAHS = [
  {
    ar: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    tr: 'In the name of Allah, the Most Gracious, the Most Merciful.',
    num: 1,
    lesson: 'Lesson 1 · Pronunciation & Basmala',
    progress: 100,
  },
  {
    ar: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    tr: 'All praise is due to Allah, Lord of all the worlds.',
    num: 2,
    lesson: 'Lesson 2 · Al-hamdu & rhythm',
    progress: 75,
  },
  {
    ar: 'الرَّحْمَٰنِ الرَّحِيمِ',
    tr: 'The Most Gracious, the Most Merciful.',
    num: 3,
    lesson: 'Lesson 3 · The attributes of Allah',
    progress: 30,
  },
];

const TAJWEED_RULES = [
  { color: '#4ADE80', label: 'Madd (elongation)' },
  { color: '#FCD34D', label: 'Ghunnah (nasalization)' },
  { color: '#F87171', label: 'Qalqalah (echo)' },
  { color: '#60A5FA', label: 'Idghaam (merging)' },
];

export default function ContentDemoSection() {
  return (
    <section className="preview-section">
      <div className="section-header">
        <div className="section-tag">Content</div>
        <h2 className="section-title">Experience the journey</h2>
        <p className="section-sub">
          A glimpse of how مقرأتي guides you — lesson by lesson, ayah by ayah — through the Quran.
        </p>
      </div>

      <div className="preview-mockup">
        {/* Mockup header bar */}
        <div className="mockup-header">
          <div className="mockup-dots">
            <div className="mockup-dot" style={{ background: '#F87171' }} />
            <div className="mockup-dot" style={{ background: '#FCD34D' }} />
            <div className="mockup-dot" style={{ background: '#4ADE80' }} />
          </div>
          <div className="mockup-title">Surah Al-Fatiha · Recitation Lessons</div>
          <div style={{ fontSize: 11, color: 'var(--teal-300)', fontWeight: 500 }}>3 / 7 ayahs</div>
        </div>

        <div className="mockup-body">
          {/* Surah header */}
          <div className="mockup-surah-header">
            <div className="mockup-surah-ar">سُورَةُ الْفَاتِحَة</div>
            <div className="mockup-surah-en">Al-Fatiha · The Opening · Makki · 7 ayahs</div>
          </div>

          {/* Tajweed colour legend */}
          <div style={{
            display: 'flex', gap: 12, flexWrap: 'wrap',
            marginBottom: 20, padding: '10px 0',
            borderBottom: '1px solid var(--border)',
          }}>
            {TAJWEED_RULES.map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: 10, height: 10, borderRadius: 2,
                  background: r.color, flexShrink: 0,
                }} />
                <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'Lora, serif' }}>
                  {r.label}
                </span>
              </div>
            ))}
          </div>

          {/* Ayah rows */}
          {DEMO_AYAHS.map((ayah) => (
            <div key={ayah.num} className="mockup-ayah-row">
              <div className="mockup-ayah-num">{ayah.num}</div>
              <div style={{ flex: 1 }}>
                <div className="mockup-ayah-ar">{ayah.ar}</div>
                <div className="mockup-ayah-tr">{ayah.tr}</div>
                <div style={{
                  marginTop: 8, display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <div style={{
                    flex: 1, background: 'var(--border)', borderRadius: 999,
                    height: 4, overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${ayah.progress}%`, height: '100%',
                      background: ayah.progress === 100
                        ? 'var(--teal-500)'
                        : 'linear-gradient(90deg, var(--teal-500), var(--gold-400))',
                      borderRadius: 999, transition: 'width 1s ease',
                    }} />
                  </div>
                  <span style={{
                    fontSize: 11, color: 'var(--muted)', whiteSpace: 'nowrap',
                    fontFamily: 'Lora, serif', fontStyle: 'italic',
                  }}>
                    {ayah.lesson}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Overall progress */}
          <div style={{
            marginTop: 20, padding: '14px 0 0',
            borderTop: '1.5px solid var(--border)',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              fontSize: 12, color: 'var(--muted)', marginBottom: 8,
              fontFamily: 'Lora, serif',
            }}>
              <span>Your progress in Al-Fatiha</span>
              <span style={{ fontWeight: 600, color: 'var(--teal-600)' }}>3 of 7 ayahs</span>
            </div>
            <div className="mockup-progress-bar">
              <div className="mockup-progress-fill" />
            </div>
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