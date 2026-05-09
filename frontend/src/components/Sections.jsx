const STRIP_ITEMS = [
  { emoji: '🌟', label: 'Daily streaks' },
  { emoji: '📿', label: 'Tajweed rules' },
  { emoji: '🎙️', label: 'Recitation lessons' },
  { emoji: '📖', label: 'Structured Hifz path' },
  { emoji: '🕌', label: 'Scholar-approved method' },
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
    desc: 'Hear a master reciter, follow along with color-coded Tajweed markup — lesson by lesson.',
  },
  {
    num: '3', emoji: '🗣️',
    title: 'Practice with lessons',
    desc: 'Structured recitation lessons guide you through each ayah with expert pronunciation guidance.',
  },
  {
    num: '4', emoji: '🔁',
    title: 'Repeat & memorize',
    desc: 'Spaced repetition reminds you at the perfect moment to review and solidify your memorization.',
  },
];

const FEATURES = [
  {
    icon: '🎙️',
    bg: 'var(--blue-50)',
    title: 'Guided recitation lessons',
    desc: 'Step-by-step lessons with expert reciters walk you through every ayah — from pronunciation to melody.',
  },
  {
    icon: '🧠',
    bg: '#FEF3C7',
    title: 'Spaced repetition',
    desc: 'Science-backed review scheduling ensures you never forget an ayah you have already memorized.',
  },
  {
    icon: '🌟',
    bg: '#FFF7ED',
    title: 'Streak & milestone system',
    desc: 'Build the daily habit with streaks and meaningful milestones that mark your journey through the Quran.',
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
    desc: 'See your memorization heatmap, daily progress, completed Surahs, and weekly goals at a glance.',
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
          A structured path that mirrors how traditional scholars memorized — now enriched with thoughtful technology.
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