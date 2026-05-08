const LEADERS = [
  {
    rank: 1,
    rankClass: 'gold',
    initials: 'AK',
    avatarBg: '#1D4ED8',
    name: 'Amira K.',
    sub: '12 day streak',
    xp: '4,210 XP',
    isYou: false,
  },
  {
    rank: 2,
    rankClass: 'silver',
    initials: 'TM',
    avatarBg: '#0F172A',
    name: 'Thomas M.',
    sub: '9 day streak',
    xp: '3,890 XP',
    isYou: false,
  },
  {
    rank: 3,
    rankClass: '',
    initials: 'JS',
    avatarBg: '#2563EB',
    name: 'Jamie S.',
    sub: '12 day streak',
    xp: '2,840 XP',
    isYou: true,
  },
  {
    rank: 4,
    rankClass: 'bronze',
    initials: 'LR',
    avatarBg: '#15803D',
    name: 'Layla R.',
    sub: '7 day streak',
    xp: '2,410 XP',
    isYou: false,
  },
];

function LeaderRow({ entry }) {
  return (
    <div className={`lb-row${entry.isYou ? ' lb-you' : ''}`}>
      <div
        className={`lb-rank${entry.rankClass ? ' ' + entry.rankClass : ''}`}
        style={entry.isYou ? { color: 'var(--blue)', fontWeight: 900 } : {}}
      >
        {entry.rank}
      </div>

      <div className="lb-av" style={{ background: entry.avatarBg }}>
        {entry.initials}
      </div>

      <div className="lb-info">
        <div className="lb-name">
          {entry.name}
          {entry.isYou && (
            <span style={{ fontSize: 10, color: 'var(--blue)', fontWeight: 700, marginLeft: 4 }}>
              (you)
            </span>
          )}
        </div>
        <div className="lb-sub">{entry.sub}</div>
      </div>

      <div className="lb-xp">{entry.xp}</div>
    </div>
  );
}

export default function Leaderboard() {
  return (
    <div className="section" style={{ paddingBottom: 0 }}>
      <div className="section-head">
        <div className="section-title">
          Weekly leaderboard{' '}
          <span style={{ fontSize: 14, color: 'var(--amber)', verticalAlign: -2 }}>🏆</span>
        </div>
        <button className="section-link">Full board</button>
      </div>

      <div className="leaderboard">
        {LEADERS.map((entry) => (
          <LeaderRow key={entry.rank} entry={entry} />
        ))}
      </div>
    </div>
  );
}
