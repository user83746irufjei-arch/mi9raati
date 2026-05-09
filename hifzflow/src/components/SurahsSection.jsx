const SURAHS = [
  { num: 114, en: 'An-Nas', ar: 'النَّاس', meta: '6 ayahs · Makki', xp: '+100 XP' },
  { num: 113, en: 'Al-Falaq', ar: 'الفَلَق', meta: '5 ayahs · Makki', xp: '+100 XP' },
  { num: 112, en: 'Al-Ikhlas', ar: 'الإِخلاص', meta: '4 ayahs · Makki', xp: '+120 XP' },
  { num: 111, en: 'Al-Masad', ar: 'المَسَد', meta: '5 ayahs · Makki', xp: '+100 XP' },
  { num: 110, en: 'An-Nasr', ar: 'النَّصر', meta: '3 ayahs · Madani', xp: '+80 XP' },
  { num: 1, en: 'Al-Fatiha', ar: 'الفَاتِحَة', meta: '7 ayahs · Makki', xp: '+200 XP' },
];

export default function SurahsSection() {
  return (
    <section className="surahs-section">
      <div className="section-header">
        <div className="section-tag">Content</div>
        <h2 className="section-title">Start with Juz Amma</h2>
        <p className="section-sub">
          We recommend beginners start from the last Juz — shorter Surahs, big rewards.
        </p>
      </div>

      <div className="surah-list">
        {SURAHS.map((s) => (
          <div className="surah-row" key={s.num}>
            <div className="surah-num">{s.num}</div>
            <div className="surah-info">
              <div className="surah-name-en">{s.en}</div>
              <div className="surah-meta">{s.meta}</div>
            </div>
            <div className="surah-name-ar">{s.ar}</div>
            <div className="surah-xp">{s.xp}</div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 28 }}>
        <button className="btn btn-outline">
          Browse all 114 Surahs →
        </button>
      </div>
    </section>
  );
}
