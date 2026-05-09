const STEPS = [
  {
    num: '1',
    title: 'Pick your Surah',
    desc: 'Choose from all 114 Surahs. We recommend starting with Juz Amma for beginners.',
  },
  {
    num: '2',
    title: 'Listen & learn',
    desc: 'Hear a master reciter, follow along with color-coded Tajweed markup — lesson by lesson.',
  },
  {
    num: '3',
    title: 'Practice with lessons',
    desc: 'Structured recitation lessons guide you through each ayah with expert pronunciation guidance.',
  },
  {
    num: '4',
    title: 'Repeat & memorize',
    desc: 'Spaced repetition reminds you at the perfect moment to review and solidify your memorization.',
  },
];

const FEATURES = [
  {
    title: 'Guided recitation lessons',
    desc: 'Step-by-step lessons with expert reciters walk you through every ayah — from pronunciation to melody.',
  },
  {
    title: 'Spaced repetition',
    desc: 'Science-backed review scheduling ensures you never forget an ayah you have already memorized.',
  },
  {
    title: 'Streak & milestone system',
    desc: 'Build the daily habit with streaks and meaningful milestones that mark your journey through the Quran.',
  },
  {
    title: 'Tajweed lessons',
    desc: 'Bite-sized rules explained in plain English with audio examples from top reciters.',
  },
  {
    title: 'Progress dashboard',
    desc: 'See your memorization heatmap, daily progress, completed Surahs, and weekly goals at a glance.',
  },
  {
    title: 'Night mode & offline',
    desc: 'Perfect for late-night revision. Download any Surah and study without an internet connection.',
  },
];

export function HowItWorks() {
  return (
    <section className="how-section">
      <div className="section-header">
        <h2 className="section-title">Four steps to your Hifz</h2>
        <p className="section-sub">
          A structured path that mirrors how traditional scholars memorized — now enriched with thoughtful technology.
        </p>
      </div>
      <div className="steps-timeline">
        {STEPS.map((s, i) => (
          <div className="timeline-row" key={s.num}>
            <div className="timeline-left">
              <div className="timeline-num">{s.num}</div>
              {i < STEPS.length - 1 && <div className="timeline-line" />}
            </div>
            <div className="timeline-body">
              <div className="timeline-title">{s.title}</div>
              <p className="timeline-desc">{s.desc}</p>
            </div>
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
        <h2 className="section-title">Everything you need to memorize</h2>
        <p className="section-sub">
          Built by learners, for learners — every feature exists to make Hifz more achievable.
        </p>
      </div>
      <div className="features-list">
        {FEATURES.map((f, i) => (
          <div className={`feature-row ${i % 2 === 1 ? 'feature-row--reverse' : ''}`} key={i}>
            <div className="feature-row-title">{f.title}</div>
            <div className="feature-row-divider" />
            <p className="feature-row-desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}