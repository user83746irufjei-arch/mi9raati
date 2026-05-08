export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-deco" aria-hidden="true" />
      <div className="hero-deco2" aria-hidden="true" />

      <div className="hero-tag">
        <span style={{ fontSize: 12 }}>⚡</span> Daily goal active
      </div>

      <h1>
        Keep your <span>streak alive,</span>
        <br />Jamie. Day 12!
      </h1>

      <p>
        You're on fire! Complete today's lesson to maintain your streak and
        earn bonus XP.
      </p>

      <div className="hero-actions">
        <button className="btn-primary">Continue learning ↗</button>
        <button className="btn-outline">View progress</button>
      </div>

      <div className="hero-stats">
        <div className="hstat">
          <div className="hstat-n">12</div>
          <div className="hstat-l">Day streak</div>
        </div>
        <div className="hstat">
          <div className="hstat-n">2,840</div>
          <div className="hstat-l">Total XP</div>
        </div>
        <div className="hstat">
          <div className="hstat-n">3</div>
          <div className="hstat-l">Courses</div>
        </div>
        <div className="hstat">
          <div className="hstat-n">68%</div>
          <div className="hstat-l">Avg. progress</div>
        </div>
      </div>
    </div>
  );
}
