import React from 'react';

const STEPS = [
  {
    num: '1',
    color: '#1a5e3a',
    title: 'Familiarize',
    desc: 'Read the passage around 5 times. Let your eyes and tongue grow comfortable with the words.',
  },
  {
    num: '2',
    color: '#1a5c4a',
    title: 'Listen',
    desc: 'Play a master reciter. Train your ear to the correct melody, rhythm, and pronunciation.',
  },
  {
    num: '3',
    color: '#165a58',
    title: 'Understand',
    desc: 'Read the translation and tafsir. Meaning creates emotional anchors for lasting memorization.',
  },
  {
    num: '4',
    color: '#134e6e',
    title: 'Spot the Tajweed rule',
    desc: 'Identify the most repeated Tajweed rule in the passage — a ghunna, a madd, an idgham. This helps you progress in Tajweed step by step.',
    bonus: true,
  },
  {
    num: '5',
    color: '#0f3d7a',
    title: 'Repeat to memorize',
    desc: 'Repeat the passage aloud from memory. Repetition is the proven foundation of solid Hifz.',
  },
];

const TOTAL = STEPS.length;
const GAP_DEG = 4;
const ARC_DEG = 360 / TOTAL - GAP_DEG;
const OUTER_R = 270;
const INNER_R = 210;
const DOT_R = OUTER_R + 38;
const CENTER = 350;
const SVG_SIZE = 700;

function polarToXY(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(cx, cy, outerR, innerR, startDeg, endDeg) {
  const o1 = polarToXY(cx, cy, outerR, startDeg);
  const o2 = polarToXY(cx, cy, outerR, endDeg);
  const i1 = polarToXY(cx, cy, innerR, endDeg);
  const i2 = polarToXY(cx, cy, innerR, startDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return [
    `M ${o1.x} ${o1.y}`,
    `A ${outerR} ${outerR} 0 ${large} 1 ${o2.x} ${o2.y}`,
    `L ${i1.x} ${i1.y}`,
    `A ${innerR} ${innerR} 0 ${large} 0 ${i2.x} ${i2.y}`,
    'Z',
  ].join(' ');
}

const FEATURES = [
  {
    num: '1',
    color: '#1a5e3a',
    title: 'Guided recitation lessons',
    desc: 'Step-by-step lessons with expert reciters walk you through every ayah — from pronunciation to melody.',
  },
  {
    num: '2',
    color: '#1a5c4a',
    title: 'Spaced repetition',
    desc: 'Science-backed review scheduling ensures you never forget an ayah you have already memorized.',
  },
  {
    num: '3',
    color: '#165a58',
    title: 'Streak & milestone system',
    desc: 'Build the daily habit with streaks and meaningful milestones that mark your journey through the Quran.',
  },
  {
    num: '4',
    color: '#134e6e',
    title: 'Tajweed lessons',
    desc: 'Bite-sized rules explained in plain English with audio examples from top reciters.',
  },
  {
    num: '5',
    color: '#0f3d7a',
    title: 'Progress dashboard',
    desc: 'See your memorization heatmap, daily progress, completed Surahs, and weekly goals at a glance.',
  },
  {
    num: '6',
    color: '#0a2d6e',
    title: 'Night mode & offline',
    desc: 'Perfect for late-night revision. Download any Surah and study without an internet connection.',
  },
];

export function HowItWorks() {
  const [active, setActive] = React.useState(null);
  const [locked, setLocked] = React.useState(null);

  const displayed = locked !== null ? locked : active;

  function handleEnter(i) { if (locked === null) setActive(i); }
  function handleLeave() { if (locked === null) setActive(null); }
  function handleClick(i) {
    if (locked === i) { setLocked(null); setActive(null); }
    else { setLocked(i); setActive(i); }
  }

  const step = displayed !== null ? STEPS[displayed] : null;

  return (
    <section className="how-section">
      <div className="section-header">
        <h2 className="section-title">Suggested steps for your Hifz</h2>
        <p className="section-sub">
          A time-tested approach refined by scholars — now structured for the modern learner.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{
          position: 'relative',
          width: 'min(70vw, 700px)',
          height: 'min(70vw, 700px)',
        }}>
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
            style={{ position: 'absolute', inset: 0 }}
          >
            {STEPS.map((s, i) => {
              const startDeg = i * (360 / TOTAL) + GAP_DEG / 2;
              const endDeg = startDeg + ARC_DEG;
              const midDeg = (startDeg + endDeg) / 2;
              const isActive = active === i || locked === i;
              const outerR = isActive ? OUTER_R + 12 : OUTER_R;
              const dot = polarToXY(CENTER, CENTER, DOT_R + (isActive ? 12 : 0), midDeg);

              return (
                <g
                  key={i}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => handleEnter(i)}
                  onMouseLeave={handleLeave}
                  onClick={() => handleClick(i)}
                >
                  <path
                    d={describeArc(CENTER, CENTER, outerR, INNER_R, startDeg, endDeg)}
                    fill={s.color}
                    opacity={isActive ? 1 : 0.72}
                    style={{ transition: 'opacity 0.2s, d 0.2s' }}
                  />
                  <circle
                    cx={dot.x} cy={dot.y} r={isActive ? 28 : 24}
                    fill={s.color}
                    opacity={isActive ? 1 : 0.85}
                    style={{ transition: 'r 0.2s, opacity 0.2s' }}
                  />
                  <text
                    x={dot.x} y={dot.y + 5}
                    fontSize="13"
                    fill="#fff"
                    textAnchor="middle"
                    fontFamily="'DM Serif Display', serif"
                    style={{ pointerEvents: 'none' }}
                  >
                    {s.num}
                  </text>
                </g>
              );
            })}

            <foreignObject
              x={CENTER - INNER_R}
              y={CENTER - INNER_R}
              width={INNER_R * 2}
              height={INNER_R * 2}
            >
              <div xmlns="http://www.w3.org/1999/xhtml" style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: 'var(--teal-900)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                boxSizing: 'border-box',
                textAlign: 'center',
                overflow: 'hidden',
              }}>
                {step ? (
                  <>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: step.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: 10, flexShrink: 0,
                    }}>
                      <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: '#fff', lineHeight: 1 }}>
                        {step.num}
                      </span>
                    </div>
                    <span style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: 23, color: 'var(--white)',
                      lineHeight: 1.2, marginBottom: 8, display: 'block',
                    }}>
                      {step.title}
                      {step.bonus && (
                        <span style={{ display: 'block', fontSize: 11, color: 'var(--gold-300)', fontFamily: "'Lora', serif", fontStyle: 'italic', marginTop: 2 }}>
                          bonus step
                        </span>
                      )}
                    </span>
                    <p style={{
                      fontSize: 17, color: 'var(--teal-200)',
                      lineHeight: 1.6, fontStyle: 'italic',
                      margin: 0, fontFamily: "'Lora', serif",
                    }}>
                      {step.desc}
                    </p>
                  </>
                ) : (
                  <>
                    <span style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: `${INNER_R * 0.85 * 2 / 7}px`,
                      color: 'var(--white)',
                      lineHeight: 1.2,
                      display: 'block',
                      textAlign: 'center',
                    }}>
                      Your Hifz<br />Journey
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--teal-400)', fontStyle: 'italic', fontFamily: "'Lora', serif", marginTop: 8, display: 'block' }}>
                      hover a segment
                    </span>
                  </>
                )}
              </div>
            </foreignObject>
          </svg>
        </div>
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

      <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative', padding: '0 0 0 48px' }}>

        {/* Vertical timeline line */}
        <div style={{
          position: 'absolute',
          left: 15,
          top: 0,
          bottom: 0,
          width: 1.5,
          background: 'linear-gradient(to bottom, transparent, #1a5e3a 8%, #0a2d6e 92%, transparent)',
          zIndex: 0,
        }} />

        {FEATURES.map((f, i) => (
          <div key={i} style={{ position: 'relative', marginBottom: i < FEATURES.length - 1 ? 20 : 0 }}>

            {/* Timeline dot */}
            <div style={{
              position: 'absolute',
              left: -41,
              top: 22,
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: f.color,
              border: '2px solid var(--surface)',
              boxShadow: `0 0 0 2px ${f.color}55`,
              zIndex: 1,
            }} />

            {/* Card */}
            <div style={{
              background: 'var(--white)',
              border: '1px solid var(--border)',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 2px 16px rgba(11,43,46,0.07)',
              transition: 'box-shadow 0.2s, transform 0.2s',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 6px 28px rgba(11,43,46,0.13)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 2px 16px rgba(11,43,46,0.07)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >

              {/* Title tab */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                margin: '16px 0 0 16px',
                background: f.color,
                borderRadius: '8px 24px 24px 8px',
                padding: '7px 22px 7px 14px',
              }}>
                <span style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.95)',
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  fontWeight: 400,
                  lineHeight: 1,
                }}>
                  {f.title}
                </span>
              </div>

              {/* Description */}
              <div style={{ padding: '12px 24px 20px' }}>
                <p style={{
                  margin: 0,
                  fontSize: 14,
                  color: 'var(--muted)',
                  lineHeight: 1.8,
                  fontStyle: 'italic',
                  fontFamily: "'Lora', serif",
                }}>
                  {f.desc}
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}