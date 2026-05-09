const STRIP_ITEMS = [
  { emoji: '🔥', label: 'Daily streaks' },
  { emoji: '⭐', label: 'XP rewards' },
  { emoji: '🎙️', label: 'Voice recitation' },
  { emoji: '📿', label: 'Tajweed rules' },
  { emoji: '🏆', label: 'Leaderboards' },
  { emoji: '📊', label: 'Progress tracking' },
];

const STEPS = [
  {
    num: '1', emoji: '🎯',
    title: 'Pick your Surah',
    desc: 'Choose from all 114 Surahs. We recommend starting with Juz Amma for beginners.',
  },
  {
    num: '2', emoji: '👂',
    title: 'Listen & learn',
    desc: 'Hear a master reciter, follow along with color-coded Tajweed markup.',
  },
  {
    num: '3', emoji: '🗣️',
    title: 'Recite aloud',
    desc: 'Our AI listens to your recitation and gives instant feedback on pronunciation.',
  },
  {
    num: '4', emoji: '🔁',
    title: 'Repeat & memorize',
    desc: 'Spaced repetition reminds you at the perfect moment to review and solidify.',
  },
];

const FEATURES = [
  {
    icon: '🎙️',
    bg: 'var(--blue-50)',
    title: 'AI Tajweed feedback',
    desc: 'Recite and get instant pronunciation scores. Our model knows every rule — from Ghunnah to Qalqalah.',
  },
  {
    icon: '🧠',
    bg: '#FEF3C7',
    title: 'Spaced repetition',
    desc: 'Science-backed review scheduling ensures you never forget an ayah you have already memorized.',
  },
  {
    icon: '🔥',
    bg: '#FFF7ED',
    title: 'Streak & XP system',
    desc: 'Earn XP for every session, keep your streak alive, and compete with friends on the leaderboard.',
  },
  {
    icon: '📿',
    bg: 'var(--green-light)',
    title: 'Tajweed lessons',
    desc: 'Bite-sized rules explained in plain English with audio examples from top reciters.',
  },
  {
    icon: '📊',
    bg: 'var(--blue-50)',
    title: 'Progress dashboard',
    desc: 'See your memorization heatmap, daily XP, completed Surahs, and weekly goals at a glance.',
  },
  {
    icon: '🌙',
    bg: '#F0FDF4',
    title: 'Night mode & offline',
    desc: 'Perfect for late-night revision. Download any Surah and study without an internet connection.',
  },
];

export function FeaturesStrip() {
  return (
    <div className="features-strip">
      {STRIP_ITEMS.map((item, i) => (
        <div className="fstrip-item" key={i}>
          <span>{item.emoji}</span>
          {item.label}
        </div>
      ))}
    </div>
  );
}

export function HowItWorks() {
  return (
    <section className="how-section">
      <div className="section-header">
        <div className="section-tag">How it works</div>
        <h2 className="section-title">Four steps to your Hifz</h2>
        <p className="section-sub">
          A structured path that mirrors how traditional scholars memorized — now supercharged with technology.
        </p>
      </div>
      <div className="steps-grid">
        {STEPS.map((s) => (
          <div className="step-card" key={s.num}>
            <div className="step-num">{s.num}</div>
            <div className="step-emoji">{s.emoji}</div>
            <div className="step-title">{s.title}</div>
            <p className="step-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FeatureCards() {
  return (
    <section className="features-section">
      <div className="section-header">
        <div className="section-tag">Features</div>
        <h2 className="section-title">Everything you need to memorize</h2>
        <p className="section-sub">
          Built by learners, for learners — every feature exists to make Hifz more achievable.
        </p>
      </div>
      <div className="features-grid">
        {FEATURES.map((f, i) => (
          <div className="feature-card" key={i}>
            <div className="feature-icon" style={{ background: f.bg }}>
              {f.icon}
            </div>
            <div className="feature-title">{f.title}</div>
            <p className="feature-desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
