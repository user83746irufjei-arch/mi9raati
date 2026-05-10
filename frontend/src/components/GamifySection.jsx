const GAMIFY_STATS = [
  { icon: '🔥', num: '30', label: 'Day streak' },
  { icon: '⭐', num: '4,200', label: 'Total XP earned' },
  { icon: '📖', num: '18', label: 'Surahs memorized' },
  { icon: '🏆', num: '#3', label: 'Weekly rank' },
];

const XP_ITEMS = [
  { action: 'Complete a lesson', xp: '+50 XP' },
  { action: 'Perfect recitation score', xp: '+100 XP' },
  { action: 'Maintain your streak', xp: '+20 XP / day' },
  { action: 'Finish a full Surah', xp: '+500 XP' },
  { action: 'Review an old ayah', xp: '+30 XP' },
];

export default function GamifySection() {
  return (
    <section className="gamify-section">
      <div className="section-inner">
        <div className="section-header">
          <div className="section-tag">Gamification</div>
          <h2 className="section-title">Learn like it's a game. Memorize like a scholar.</h2>
          <p className="section-sub">
            Streaks, XP, and leaderboards aren't just fun — they're proven to build the daily
            habit that Hifz requires.
          </p>
        </div>

        {/* Stats cards */}
        <div className="gamify-cards">
          {GAMIFY_STATS.map((s, i) => (
            <div className="gamify-card" key={i}>
              <div className="gamify-icon">{s.icon}</div>
              <div className="gamify-num">{s.num}</div>
              <div className="gamify-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* XP table */}
        <div style={{
          maxWidth: 480, margin: '40px auto 0',
          background: 'var(--teal-800)',
          border: '1px solid var(--teal-600)',
          borderRadius: 'var(--r-xl)',
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '14px 20px',
            borderBottom: '1px solid var(--teal-700)',
            fontSize: 13, fontWeight: 800, color: 'var(--teal-200)',
            display: 'flex', justifyContent: 'space-between',
          }}>
            <span>Action</span>
            <span>Reward</span>
          </div>
          {XP_ITEMS.map((item, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '12px 20px',
              borderBottom: i < XP_ITEMS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}>
              <span style={{ fontSize: 14, color: 'var(--teal-100)', fontWeight: 500 }}>
                {item.action}
              </span>
              <span style={{
                fontSize: 12, fontWeight: 700,
                color: 'var(--gold-300)',
                background: 'rgba(212,151,10,0.15)',
                padding: '3px 12px', borderRadius: 'var(--r-full)',
              }}>
                {item.xp}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
