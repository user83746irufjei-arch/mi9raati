const courses = [
  {
    id: 1,
    icon: '🐍',
    name: 'Python for Data Science',
    sub: 'Lesson 14 of 32 · Functions & Modules',
    pct: 44,
    barColor: 'var(--blue)',
    pctColor: 'var(--blue)',
    xp: '+80 XP',
  },
  {
    id: 2,
    icon: '🎨',
    name: 'UI/UX Design Fundamentals',
    sub: 'Lesson 8 of 20 · Typography',
    pct: 38,
    barColor: 'var(--green)',
    pctColor: 'var(--green)',
    xp: '+60 XP',
  },
];

function ProgressCard({ course }) {
  return (
    <div className="progress-card">
      <div className="prog-icon">{course.icon}</div>

      <div className="prog-info">
        <div className="prog-name">{course.name}</div>
        <div className="prog-sub">{course.sub}</div>
        <div className="prog-bar-wrap">
          <div
            className="prog-bar"
            style={{ width: `${course.pct}%`, background: course.barColor }}
          />
        </div>
      </div>

      <div className="prog-right">
        <div className="prog-pct" style={{ color: course.pctColor }}>
          {course.pct}%
        </div>
        <div className="prog-pct-l">complete</div>
        <div className="prog-xp">{course.xp}</div>
      </div>
    </div>
  );
}

export default function ContinueLearning() {
  return (
    <div className="section">
      <div className="section-head">
        <div className="section-title">Continue learning</div>
        <button className="section-link">See all</button>
      </div>

      {courses.map((c) => (
        <ProgressCard key={c.id} course={c} />
      ))}
    </div>
  );
}
