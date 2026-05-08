const DAYS = [
  { label: 'Mon', state: 'done' },
  { label: 'Tue', state: 'done' },
  { label: 'Wed', state: 'done' },
  { label: 'Thu', state: 'done' },
  { label: 'Fri', state: 'today' },
  { label: 'Sat', state: '' },
  { label: 'Sun', state: '' },
];

function DayDot({ state }) {
  const cls = `day-dot${state ? ' ' + state : ''}`;
  if (state === 'done')  return <div className={cls}>✓</div>;
  if (state === 'today') return <div className={cls}>!</div>;
  return <div className={cls} />;
}

export default function DailyBar() {
  return (
    <div className="daily-bar">
      <div className="daily-label">
        📅 This week
      </div>

      <div className="days">
        {DAYS.map((d) => (
          <div className="day" key={d.label}>
            <DayDot state={d.state} />
            <div className="day-lbl">{d.label}</div>
          </div>
        ))}
      </div>

      <div className="xp-total">+420 XP</div>
    </div>
  );
}
