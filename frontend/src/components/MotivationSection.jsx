const ITEMS = [
  'Enhance your Hifz with quizzes',
  'Improve your recitation',
  'Maintain your streak',
  'Finish a full Surah',
];

export default function MotivationSection() {
  return (
    <section className="motivation-section">
      <div className="section-header">
        <h2 className="section-title">Stay motivated. Build the habit of a lifetime.</h2>
        <p className="section-sub">
          Streaks and milestones aren't just encouraging — they're proven to build the daily
          habit that Hifz requires. Every ayah brings you closer.
        </p>
      </div>

      <div style={{
        overflow: 'hidden',
        width: '100%',
        marginTop: 32,
        maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
      }}>
        <div style={{
          display: 'flex',
          width: 'max-content',
          animation: 'marqueeScroll 40s linear infinite',
        }}>
          {[...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
            <span key={i} style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontSize: 15,
              color: 'var(--teal-200)',
              fontStyle: 'italic',
              fontFamily: "'Lora', serif",
              whiteSpace: 'nowrap',
              paddingRight: 48,
            }}>
              {item}
              <span style={{ color: 'var(--gold-400)', marginLeft: 48, fontSize: 8, verticalAlign: 'middle' }}>◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}