import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const USER = {
  name: 'Yusuf',
  streak: 12,
  xp: 3240,
  xpToNext: 500,
  xpProgress: 240,
  todayAyahs: 7,
  todayGoal: 20,
  weeklyGoal: 5,
  weeklyDone: 3,
};

const TIPS = [
  "The most important thing is to keep going — even one ayah a day is progress.",
  "Every ayah you memorize is recorded. Allah does not let any effort go to waste.",
  "Do not aim for perfection today. Aim for consistency across a lifetime.",
  "The Prophet ﷺ said: the best of you are those who learn the Quran and teach it.",
  "A small revision today protects weeks of memorization. Open the app and review.",
  "Your streak is a sign of sincerity. Protect it — but if you miss a day, just return.",
  "Each sitting with the Quran is an act of worship, regardless of how much you cover.",
];

const WEEK_DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const WEEK_DONE = [true, true, true, false, false, false, false];

const CURRENT_SURAH = {
  num: 2,
  en: 'Al-Baqarah',
  ar: 'البَقَرَة',
  totalAyahs: 286,
  memorized: 47,
  lastAyah: 'وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ',
  lastAyahTr: 'And establish prayer and give zakah.',
};

const REVIEW_ITEMS = [
  { label: 'Juz 30 · Al-A\'lā → Al-Sharh', ayahs: 30, due: 'Due now', urgent: true },
  { label: 'Juz 30 · Al-Sharh → An-Nās', ayahs: 28, due: 'Due today', urgent: false },
  { label: 'Juz 29 · Al-Mulk → Al-Jinn', ayahs: 44, due: 'Tomorrow', urgent: false },
];

const QUICK_ACTIONS = [
  { icon: '▶', label: 'Continue lesson', sub: 'Al-Baqarah · Ayah 48', color: 'var(--teal-700)', shadow: 'var(--teal-900)', primary: true },
  { icon: '🔁', label: 'Daily review', sub: '3 sessions due', color: 'var(--gold-600)', shadow: 'var(--gold-900)', primary: false },
  { icon: '📖', label: 'Browse surahs', sub: 'All 114 available', color: 'var(--teal-600)', shadow: 'var(--teal-800)', primary: false },
  { icon: '✨', label: 'Tajweed lesson', sub: 'Lesson 3 unlocked', color: 'var(--teal-600)', shadow: 'var(--teal-800)', primary: false },
];

const LEADERBOARD = [
  { rank: 1, name: 'Fatima M.', xp: 5800, you: false },
  { rank: 2, name: 'Omar K.', xp: 4950, you: false },
  { rank: 3, name: 'You', xp: 3240, you: true },
  { rank: 4, name: 'Amina H.', xp: 2900, you: false },
  { rank: 5, name: 'Ibrahim S.', xp: 2100, you: false },
];

const MILESTONES = [
  { icon: '🌟', label: 'First Surah', done: true },
  { icon: '🔥', label: '7-day streak', done: true },
  { icon: '📖', label: '3 Surahs', done: false },
  { icon: '🏆', label: 'Top 10', done: false },
];

export default function Dashboard() {
  const tip = useMemo(() => TIPS[Math.floor(Math.random() * TIPS.length)], []);
  const xpPct = Math.round((USER.xpProgress / USER.xpToNext) * 100);
  const surahPct = Math.round((CURRENT_SURAH.memorized / CURRENT_SURAH.totalAyahs) * 100);
  const goalPct = Math.min(Math.round((USER.todayAyahs / USER.todayGoal) * 100), 100);

  return (
    <div style={{ minHeight: 'calc(100vh - 68px)', background: 'var(--parchment)', display: 'flex', flexDirection: 'column' }}>

      {/* ── Top greeting bar ── */}
      <div style={{
        background: 'var(--teal-900)',
        padding: '32px 32px 56px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 960, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>

            {/* Greeting + tip */}
            <div style={{ maxWidth: 520 }}>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: 'var(--white)', fontWeight: 400, marginBottom: 12 }}>
                Welcome back, {USER.name}
              </h2>
              <div style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 'var(--r-lg)', padding: '12px 16px',
              }}>
                <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>🕌</span>
                <p style={{
                  fontSize: 14, color: 'var(--teal-100)',
                  fontStyle: 'italic', fontFamily: "'Lora', serif",
                  lineHeight: 1.65, margin: 0,
                }}>
                  {tip}
                </p>
              </div>
            </div>

            {/* Streak + XP */}
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.13)',
                borderRadius: 'var(--r-xl)', padding: '12px 22px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>🔥</div>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: 'var(--gold-300)', lineHeight: 1 }}>{USER.streak}</div>
                <div style={{ fontSize: 11, color: 'var(--teal-300)', marginTop: 3, fontFamily: "'Lora', serif" }}>day streak</div>
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.13)',
                borderRadius: 'var(--r-xl)', padding: '12px 22px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>⭐</div>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: 'var(--gold-300)', lineHeight: 1 }}>{USER.xp.toLocaleString()}</div>
                <div style={{ fontSize: 11, color: 'var(--teal-300)', marginTop: 3, fontFamily: "'Lora', serif" }}>total XP</div>
              </div>
            </div>
          </div>

          {/* XP progress */}
          <div style={{ marginTop: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
              <span style={{ fontSize: 12, color: 'var(--teal-400)', fontFamily: "'Lora', serif" }}>XP progress</span>
              <span style={{ fontSize: 12, color: 'var(--gold-300)', fontFamily: "'Lora', serif" }}>{USER.xpProgress} / {USER.xpToNext} XP until next reward</span>
            </div>
            <div style={{ height: 7, background: 'rgba(255,255,255,0.1)', borderRadius: 'var(--r-full)', overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: `${xpPct}%`,
                background: 'linear-gradient(90deg, var(--teal-400), var(--gold-400))',
                borderRadius: 'var(--r-full)',
              }} />
            </div>
          </div>

          {/* Week tracker */}
          <div style={{ display: 'flex', gap: 8, marginTop: 20, alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: 'var(--teal-400)', fontFamily: "'Lora', serif", marginRight: 4 }}>This week:</span>
            {WEEK_DAYS.map((d, i) => (
              <div key={i} style={{
                width: 32, height: 32, borderRadius: '50%',
                background: WEEK_DONE[i] ? 'var(--gold-500)' : 'rgba(255,255,255,0.07)',
                border: `1.5px solid ${WEEK_DONE[i] ? 'var(--gold-400)' : 'rgba(255,255,255,0.12)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 600,
                color: WEEK_DONE[i] ? 'var(--white)' : 'var(--teal-400)',
                fontFamily: "'Lora', serif",
              }}>
                {WEEK_DONE[i] ? '✓' : d}
              </div>
            ))}
            <span style={{ fontSize: 12, color: 'var(--teal-400)', marginLeft: 4, fontFamily: "'Lora', serif" }}>{USER.weeklyDone}/{USER.weeklyGoal} days</span>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{ flex: 1, maxWidth: 960, margin: '-24px auto 0', width: '100%', padding: '0 24px 64px', position: 'relative', zIndex: 1 }}>

        {/* Quick actions row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 28 }}>
          {QUICK_ACTIONS.map((a, i) => (
            <button key={i} style={{
              background: a.primary ? a.color : 'var(--white)',
              border: a.primary ? 'none' : '1.5px solid var(--border)',
              borderRadius: 'var(--r-xl)',
              padding: '16px 18px',
              cursor: 'pointer',
              textAlign: 'left',
              boxShadow: a.primary ? `0 4px 0 ${a.shadow}` : 'var(--shadow-sm)',
              transition: 'all 0.18s ease',
              fontFamily: "'Lora', serif",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ fontSize: 22, marginBottom: 8 }}>{a.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: a.primary ? 'var(--white)' : 'var(--ink)', marginBottom: 3 }}>{a.label}</div>
              <div style={{ fontSize: 12, color: a.primary ? 'rgba(255,255,255,0.72)' : 'var(--muted)', fontStyle: 'italic' }}>{a.sub}</div>
            </button>
          ))}
        </div>

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'start' }}>

          {/* ── Left column ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Currently memorizing */}
            <div style={{
              background: 'var(--white)', border: '1.5px solid var(--border)',
              borderRadius: 'var(--r-2xl)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{
                background: 'var(--teal-900)', padding: '18px 24px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div>
                  <p style={{ fontSize: 11, color: 'var(--teal-400)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'Lora', serif", marginBottom: 4 }}>Currently memorizing</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: 'var(--white)' }}>
                      {CURRENT_SURAH.num}. {CURRENT_SURAH.en}
                    </span>
                    <span style={{ fontFamily: "'Amiri', serif", fontSize: 22, color: 'var(--gold-300)', direction: 'rtl' }}>
                      {CURRENT_SURAH.ar}
                    </span>
                  </div>
                </div>
                <button style={{
                  background: 'var(--gold-600)', color: 'var(--white)',
                  border: 'none', borderRadius: 'var(--r-lg)',
                  padding: '9px 20px', fontSize: 13, fontWeight: 700,
                  cursor: 'pointer', fontFamily: "'Lora', serif",
                  boxShadow: '0 3px 0 var(--gold-900)', flexShrink: 0,
                }}>
                  Continue ▶
                </button>
              </div>
              <div style={{ padding: '20px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ fontSize: 13, color: 'var(--muted)', fontFamily: "'Lora', serif" }}>
                    {CURRENT_SURAH.memorized} of {CURRENT_SURAH.totalAyahs} ayahs memorized
                  </span>
                </div>
                <div style={{ height: 6, background: 'var(--border)', borderRadius: 'var(--r-full)', overflow: 'hidden', marginBottom: 18 }}>
                  <div style={{
                    height: '100%',
                    width: `${surahPct}%`,
                    background: 'linear-gradient(90deg, var(--teal-500), var(--gold-500))',
                    borderRadius: 'var(--r-full)',
                  }} />
                </div>
                <div style={{
                  background: 'var(--teal-50)', border: '1px solid var(--teal-100)',
                  borderRadius: 'var(--r-lg)', padding: '14px 18px',
                }}>
                  <p style={{ fontSize: 11, color: 'var(--teal-500)', fontFamily: "'Lora', serif", marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Last studied ayah</p>
                  <p style={{ fontFamily: "'Amiri', serif", fontSize: 22, color: 'var(--teal-800)', direction: 'rtl', marginBottom: 5, lineHeight: 1.6 }}>{CURRENT_SURAH.lastAyah}</p>
                  <p style={{ fontSize: 12, color: 'var(--muted)', fontStyle: 'italic', fontFamily: "'Lora', serif" }}>{CURRENT_SURAH.lastAyahTr}</p>
                </div>
              </div>
            </div>

            {/* Review queue */}
            <div style={{
              background: 'var(--white)', border: '1.5px solid var(--border)',
              borderRadius: 'var(--r-2xl)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: 'var(--ink)', marginBottom: 2 }}>Review queue</h3>
                  <p style={{ fontSize: 13, color: 'var(--muted)', fontStyle: 'italic', fontFamily: "'Lora', serif" }}>Spaced repetition — don't let them fade</p>
                </div>
                <span style={{
                  background: 'rgba(239,68,68,0.09)', color: '#DC2626',
                  fontSize: 11, fontWeight: 700, padding: '3px 10px',
                  borderRadius: 'var(--r-full)', fontFamily: "'Lora', serif",
                }}>
                  {REVIEW_ITEMS.filter(r => r.urgent).length} urgent
                </span>
              </div>
              {REVIEW_ITEMS.map((r, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '16px 24px',
                  borderBottom: i < REVIEW_ITEMS.length - 1 ? '1px solid var(--border)' : 'none',
                  cursor: 'pointer', transition: 'background 0.15s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--teal-50)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{
                    width: 38, height: 38, borderRadius: 'var(--r-md)', flexShrink: 0,
                    background: r.urgent ? '#FEF2F2' : 'var(--teal-50)',
                    border: `1.5px solid ${r.urgent ? '#FECACA' : 'var(--teal-100)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16,
                  }}>
                    {r.urgent ? '⚠️' : '📖'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', fontFamily: "'Lora', serif", marginBottom: 2 }}>{r.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', fontStyle: 'italic', fontFamily: "'Lora', serif" }}>{r.ayahs} ayahs</div>
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 'var(--r-full)',
                    background: r.urgent ? 'rgba(239,68,68,0.09)' : 'rgba(57,168,181,0.1)',
                    color: r.urgent ? '#DC2626' : 'var(--teal-600)',
                    fontFamily: "'Lora', serif", flexShrink: 0,
                  }}>{r.due}</span>
                  <span style={{ color: 'var(--muted)', fontSize: 16 }}>›</span>
                </div>
              ))}
              <div style={{ padding: '14px 24px', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
                <button style={{
                  background: 'none', border: 'none', color: 'var(--teal-600)',
                  fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'Lora', serif",
                }}>Start all reviews →</button>
              </div>
            </div>

            {/* Weekly leaderboard — full width in left column */}
            <div style={{
              background: 'var(--white)', border: '1.5px solid var(--border)',
              borderRadius: 'var(--r-2xl)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border)' }}>
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: 'var(--ink)', marginBottom: 2 }}>This week's top</h3>
                <p style={{ fontSize: 13, color: 'var(--muted)', fontStyle: 'italic', fontFamily: "'Lora', serif" }}>XP earned across the community this week</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
                {LEADERBOARD.map((l, i) => (
                  <div key={i} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    padding: '20px 12px',
                    borderRight: i < LEADERBOARD.length - 1 ? '1px solid var(--border)' : 'none',
                    background: l.you ? 'var(--teal-50)' : 'transparent',
                    position: 'relative',
                  }}>
                    {l.you && (
                      <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0,
                        height: 3,
                        background: 'linear-gradient(90deg, var(--teal-400), var(--gold-400))',
                      }} />
                    )}
                    <span style={{ fontSize: 22, marginBottom: 8 }}>
                      {l.rank === 1 ? '🥇' : l.rank === 2 ? '🥈' : l.rank === 3 ? '🥉' : `#${l.rank}`}
                    </span>
                    <span style={{
                      fontSize: 13, fontFamily: "'Lora', serif",
                      fontWeight: l.you ? 700 : 500,
                      color: l.you ? 'var(--teal-700)' : 'var(--ink)',
                      textAlign: 'center', marginBottom: 6,
                    }}>
                      {l.name}
                    </span>
                    <span style={{
                      fontSize: 12, color: 'var(--gold-600)', fontWeight: 700,
                      fontFamily: "'Lora', serif",
                      background: 'rgba(212,151,10,0.1)',
                      padding: '2px 8px', borderRadius: 'var(--r-full)',
                    }}>
                      {l.xp.toLocaleString()}
                    </span>
                    {l.you && (
                      <span style={{ fontSize: 10, color: 'var(--teal-400)', marginTop: 4, fontFamily: "'Lora', serif" }}>you</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── Right column ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Today's memorization goal */}
            <div style={{
              background: 'var(--teal-900)', borderRadius: 'var(--r-2xl)',
              padding: '24px 22px', boxShadow: 'var(--shadow-md)', textAlign: 'center',
            }}>
              <p style={{ fontSize: 11, color: 'var(--teal-400)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'Lora', serif", marginBottom: 16 }}>Today's memorization goal</p>
              <div style={{ position: 'relative', width: 110, height: 110, margin: '0 auto 16px' }}>
                <svg width="110" height="110" viewBox="0 0 110 110">
                  <circle cx="55" cy="55" r="46" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="9" />
                  <circle
                    cx="55" cy="55" r="46" fill="none"
                    stroke="url(#goalGrad)" strokeWidth="9"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 46}`}
                    strokeDashoffset={`${2 * Math.PI * 46 * (1 - goalPct / 100)}`}
                    transform="rotate(-90 55 55)"
                  />
                  <defs>
                    <linearGradient id="goalGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#39A8B5" />
                      <stop offset="100%" stopColor="#E8B430" />
                    </linearGradient>
                  </defs>
                </svg>
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: 'var(--gold-300)', lineHeight: 1 }}>{USER.todayAyahs}</span>
                  <span style={{ fontSize: 11, color: 'var(--teal-300)', fontFamily: "'Lora', serif" }}>/ {USER.todayGoal} ayahs</span>
                </div>
              </div>
              <p style={{ fontSize: 13, color: 'var(--teal-200)', fontStyle: 'italic', fontFamily: "'Lora', serif" }}>
                {USER.todayGoal - USER.todayAyahs} ayahs left to reach your goal
              </p>
            </div>

            {/* Milestones */}
            <div style={{
              background: 'var(--white)', border: '1.5px solid var(--border)',
              borderRadius: 'var(--r-2xl)', padding: '20px 22px', boxShadow: 'var(--shadow-sm)',
            }}>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 17, color: 'var(--ink)', marginBottom: 14 }}>Milestones</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {MILESTONES.map((m, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '11px 14px', borderRadius: 'var(--r-lg)',
                    background: m.done ? 'var(--teal-50)' : 'var(--surface)',
                    border: `1.5px solid ${m.done ? 'var(--teal-200)' : 'var(--border)'}`,
                    opacity: m.done ? 1 : 0.55,
                  }}>
                    <span style={{ fontSize: 18 }}>{m.icon}</span>
                    <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: m.done ? 'var(--teal-700)' : 'var(--muted)', fontFamily: "'Lora', serif" }}>{m.label}</span>
                    {m.done && <span style={{ fontSize: 12, color: 'var(--teal-500)' }}>✓</span>}
                    {!m.done && <span style={{ fontSize: 11, color: 'var(--muted-light)', fontFamily: "'Lora', serif" }}>locked</span>}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
