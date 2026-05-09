const MILESTONES = [
  { action: 'Complete a recitation lesson', reward: 'Milestone' },
  { action: 'Perfect lesson score', reward: 'Excellence' },
  { action: 'Maintain your streak', reward: 'Daily habit' },
  { action: 'Finish a full Surah', reward: 'Surah complete' },
  { action: 'Review an old ayah', reward: 'Consolidation' },
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

      {/* Scrolling marquee */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...MILESTONES, ...MILESTONES].map((item, i) => (
            <span className="marquee-item" key={i}>
              {item.action} <span className="marquee-dot">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Activity list */}
      <div className="activity-list">
        {MILESTONES.map((item, i) => (
          <div className="activity-row" key={i}>
            <span className="activity-name">{item.action}</span>
            <span className="activity-divider" />
            <span className="activity-reward">{item.reward}</span>
          </div>
        ))}
      </div>
    </section>
  );
}