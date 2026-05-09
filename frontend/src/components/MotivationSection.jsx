const MOTIVATION_STATS = [
  { icon: '🔥', num: '30', label: 'Day streak' },
  { icon: '📖', num: '18', label: 'Surahs memorized' },
  { icon: '⏱️', num: '142', label: 'Days on journey' },
  { icon: '🏅', label: 'Weekly leader', num: 'Top 3' },
];

const MILESTONES = [
  { action: 'Complete a recitation lesson', reward: '🌟 Milestone' },
  { action: 'Perfect lesson score', reward: '✨ Excellence' },
  { action: 'Maintain your streak', reward: '🔥 Daily habit' },
  { action: 'Finish a full Surah', reward: '📖 Surah complete' },
  { action: 'Review an old ayah', reward: '🔁 Consolidation' },
];

export default function MotivationSection() {
  return (
    <section className="gamify-section">
      <div className="section-header">
        <div className="section-tag">Your journey</div>
        <h2 className="section-title">Stay motivated. Build the habit of a lifetime.</h2>
        <p className="section-sub">
          Streaks and milestones aren't just encouraging — they're proven to build the daily
          habit that Hifz requires. Every ayah brings you closer.
        </p>
      </div>

      {/* Stats cards */}
      <div className="gamify-cards">
        {MOTIVATION_STATS.map((s, i) => (
          <div className="gamify-card" key={i}>
            <div className="gamify-icon">{s.icon}</div>
            <div className="gamify-num">{s.num}</div>
            <div className="gamify-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Milestones table */}
      <div style={{
        maxWidth: 480, margin: '40px auto 0',
        background: 'var(--blue-800)',
        border: '2px solid var(--blue-600)',
        borderRadius: 'var(--r-xl)',
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '14px 20px',
          borderBottom: '1px solid var(--blue-700)',
          fontSize: 13, fontWeight: 800, color: 'var(--blue-200)',
          display: 'flex', justifyContent: 'space-between',
        }}>
          <span>Activity</span>
          <span>Recognition</span>
        </div>
        {MILESTONES.map((item, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '12px 20px',
            borderBottom: i < MILESTONES.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
          }}>
            <span style={{ fontSize: 14, color: 'var(--blue-100)', fontWeight: 500 }}>
              {item.action}
            </span>
            <span style={{
              fontSize: 13, fontWeight: 800,
              background: 'rgba(245,158,11,0.18)',
              color: '#FCD34D',
              padding: '3px 10px', borderRadius: 'var(--r-full)',
            }}>
              {item.reward}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}