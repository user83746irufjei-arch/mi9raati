import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import quranData from '../data/quran.json';

// ── Constants ─────────────────────────────────────────────────────────────────

const PAGE_AYAH_TARGET = 15; // ~half page goal
const DEFAULT_REPS = 7;
// Audio: everyayah.com pattern (Mishary Rashid, reliable CORS-free)
function audioUrl(surah, ayah) {
  const s = String(surah).padStart(3, '0');
  const a = String(ayah).padStart(3, '0');
  return `https://everyayah.com/data/Alafasy_128kbps/${s}${a}.mp3`;
}

// ── Steps (4 now: Familiarize+Listen merged, Understand, Tajweed, Repeat) ─────

const STEPS = [
  {
    id: 'familiarize',
    num: '1',
    icon: '👁️🎧',
    title: 'Familiarize & Listen',
    desc: 'Read the highlighted part carefully and listen to the recitation. Follow along — let your eyes and ears work together.',
    color: '#1a5e3a',
    bg: 'rgba(26,94,58,0.09)',
    border: 'rgba(26,94,58,0.28)',
  },
  {
    id: 'understand',
    num: '2',
    icon: '💡',
    title: 'Understand',
    desc: 'Read the translation and absorb the meaning. Meaning creates emotional anchors for lasting memorization.',
    color: '#165a58',
    bg: 'rgba(22,90,88,0.09)',
    border: 'rgba(22,90,88,0.28)',
  },
  {
    id: 'tajweed',
    num: '3',
    icon: '✨',
    title: 'Spot the Tajweed',
    desc: 'Study the highlighted rule for this section. One rule at a time builds a lifetime of precision.',
    color: '#134e6e',
    bg: 'rgba(19,78,110,0.09)',
    border: 'rgba(19,78,110,0.28)',
    bonus: true,
  },
  {
    id: 'repeat',
    num: '4',
    icon: '🔁',
    title: 'Repeat to Memorize',
    desc: 'Cover the text and recite from memory. Tap the circle each time you complete a full recitation of the section.',
    color: '#0f3d7a',
    bg: 'rgba(15,61,122,0.09)',
    border: 'rgba(15,61,122,0.28)',
  },
];

// ── Sample data (fallback while API loads) ────────────────────────────────────

const FALLBACK_AYAHS = Array.from({ length: 15 }, (_, i) => ({
  n: 47 + i,
  ar: 'يَا بَنِي إِسْرَائِيلَ اذْكُرُوا نِعْمَتِيَ الَّتِي أَنْعَمْتُ عَلَيْكُمْ',
  tr: 'O Children of Israel, remember My favor that I bestowed upon you.',
  tl: 'Yaa Banee Israa\'eelad kuroo ni\'matiyal latee an\'amtu \'alaykum',
  tajweed: 'Madd Lazim on نِعْمَتِيَ — elongate 6 counts.',
}));

// ── Helpers ───────────────────────────────────────────────────────────────────

function cls(...args) { return args.filter(Boolean).join(' '); }

function RepCircle({ done, total, onTap }) {
  const pct = total > 0 ? (done / total) * 100 : 0;
  const r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);
  return (
    <div
      onClick={onTap}
      style={{
        position: 'relative', width: 148, height: 148,
        cursor: 'pointer', userSelect: 'none',
        filter: 'drop-shadow(0 4px 24px rgba(57,168,181,0.25))',
        transition: 'transform 0.12s',
      }}
      onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.94)'; }}
      onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
    >
      <svg width="148" height="148" viewBox="0 0 148 148">
        <circle cx="74" cy="74" r={r} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="9" />
        <circle cx="74" cy="74" r={r} fill="none" stroke="url(#rg)" strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          transform="rotate(-90 74 74)"
          style={{ transition: 'stroke-dashoffset 0.35s ease' }}
        />
        <defs>
          <linearGradient id="rg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#39A8B5" />
            <stop offset="100%" stopColor="#E8B430" />
          </linearGradient>
        </defs>
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
      }}>
        <span style={{ fontFamily: "'DM Serif Display',serif", fontSize: 40, color: 'var(--gold-300)', lineHeight: 1 }}>{done}</span>
        <span style={{ fontSize: 11, color: 'var(--teal-300)', fontFamily: "'Lora',serif" }}>of {total}</span>
      </div>
    </div>
  );
}

function StepDots({ steps, current }) {
  return (
    <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
      {steps.map((s, i) => (
        <div key={s.id} style={{
          height: 4,
          width: i === current ? 40 : i < current ? 28 : 28,
          borderRadius: 999,
          background: i < current ? 'var(--gold-500)' : i === current ? 'var(--teal-400)' : 'rgba(255,255,255,0.12)',
          transition: 'all 0.3s ease',
          flexShrink: 0,
        }} />
      ))}
    </div>
  );
}

// ── Audio Player ──────────────────────────────────────────────────────────────

function AudioPlayer({ surahNum, ayahNums }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loop, setLoop] = useState(false);
  const audioRef = useRef(null);

  const currentAyah = ayahNums[currentIdx];

  useEffect(() => {
    setCurrentIdx(0);
    setPlaying(false);
  }, [surahNum, JSON.stringify(ayahNums)]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.src = audioUrl(surahNum, currentAyah);
    if (playing) { setLoading(true); a.play().catch(() => setPlaying(false)); }
  }, [currentIdx, surahNum]);

  function togglePlay() {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else {
      a.src = audioUrl(surahNum, currentAyah);
      setLoading(true);
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }

  function handleEnded() {
    if (loop) { audioRef.current.play(); return; }
    if (currentIdx < ayahNums.length - 1) setCurrentIdx(i => i + 1);
    else setPlaying(false);
  }

  return (
    <div style={{
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.13)',
      borderRadius: 'var(--r-xl)',
      padding: '14px 20px',
      display: 'flex', alignItems: 'center', gap: 14,
      flexWrap: 'wrap',
    }}>
      <audio ref={audioRef}
        onCanPlay={() => setLoading(false)}
        onEnded={handleEnded}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {/* Play/Pause */}
      <button onClick={togglePlay} style={{
        width: 44, height: 44, borderRadius: '50%',
        background: playing ? 'rgba(57,168,181,0.25)' : 'var(--teal-600)',
        border: `2px solid ${playing ? 'var(--teal-400)' : 'transparent'}`,
        color: 'var(--white)', fontSize: 16,
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, transition: 'all 0.18s',
        boxShadow: playing ? 'none' : '0 3px 0 var(--teal-900)',
      }}>
        {loading ? '⟳' : playing ? '⏸' : '▶'}
      </button>

      {/* Ayah info */}
      <div style={{ flex: 1, minWidth: 120 }}>
        <div style={{ fontSize: 12, color: 'var(--teal-300)', fontFamily: "'Lora',serif", marginBottom: 2 }}>
          🎧 Recitation — Ayah {currentAyah}
        </div>
        {/* Mini progress dots */}
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {ayahNums.map((n, i) => (
            <button key={n} onClick={() => { setCurrentIdx(i); setPlaying(false); }} style={{
              width: 7, height: 7, borderRadius: '50%', border: 'none', cursor: 'pointer', padding: 0,
              background: i < currentIdx
                ? 'var(--gold-500)'
                : i === currentIdx
                  ? 'var(--teal-400)'
                  : 'rgba(255,255,255,0.15)',
              transition: 'all 0.2s',
            }} />
          ))}
        </div>
      </div>

      {/* Prev / Next */}
      <div style={{ display: 'flex', gap: 6 }}>
        <button onClick={() => setCurrentIdx(i => Math.max(0, i - 1))} disabled={currentIdx === 0} style={{
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 'var(--r-md)', width: 34, height: 34, cursor: 'pointer',
          color: currentIdx === 0 ? 'rgba(255,255,255,0.2)' : 'var(--teal-200)', fontSize: 14,
        }}>‹</button>
        <button onClick={() => setCurrentIdx(i => Math.min(ayahNums.length - 1, i + 1))} disabled={currentIdx === ayahNums.length - 1} style={{
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 'var(--r-md)', width: 34, height: 34, cursor: 'pointer',
          color: currentIdx === ayahNums.length - 1 ? 'rgba(255,255,255,0.2)' : 'var(--teal-200)', fontSize: 14,
        }}>›</button>

        {/* Loop toggle */}
        <button onClick={() => setLoop(l => !l)} title="Loop current ayah" style={{
          background: loop ? 'rgba(57,168,181,0.2)' : 'rgba(255,255,255,0.06)',
          border: `1px solid ${loop ? 'var(--teal-400)' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: 'var(--r-md)', width: 34, height: 34, cursor: 'pointer',
          color: loop ? 'var(--teal-300)' : 'rgba(255,255,255,0.35)', fontSize: 14,
        }}>🔁</button>
      </div>

      {/* Reciter label */}
      <div style={{
        width: '100%', fontSize: 10, color: 'rgba(255,255,255,0.3)',
        fontFamily: "'Lora',serif", fontStyle: 'italic', marginTop: -4,
      }}>
        Mishary Rashid Al-Afasy · Tap a dot to jump to any ayah
      </div>
    </div>
  );
}

// ── Quran Page View ───────────────────────────────────────────────────────────

function QuranPage({ ayahs, focusRange, step, showTranslation, showTranslit }) {
  const isRepeat = step.id === 'repeat';

  return (
    <div style={{
      background: 'rgba(255,255,255,0.035)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 'var(--r-2xl)',
      padding: '28px 24px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative top line */}
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: 2,
        background: 'linear-gradient(90deg, transparent, var(--gold-600), transparent)',
        borderRadius: 999,
      }} />

      {/* Ayahs list */}
      <div style={{
        direction: 'rtl',
        fontFamily: "'Amiri',serif",
        lineHeight: 2.2,
        textAlign: 'justify',
      }}>
        {ayahs.map((ayah, idx) => {
          const isFocus = idx >= focusRange[0] && idx <= focusRange[1];
          const isBlurred = isRepeat && !isFocus;

          return (
            <span key={ayah.n} style={{ display: 'inline' }}>
              {/* Ayah text */}
              <span style={{
                fontSize: 'clamp(19px, 2.8vw, 26px)',
                color: isFocus
                  ? 'var(--white)'
                  : 'rgba(255,255,255,0.28)',
                filter: isBlurred ? 'blur(4px)' : 'none',
                transition: 'all 0.4s ease',
                position: 'relative',
                // Soft highlight glow behind focused section
                textShadow: isFocus
                  ? '0 0 40px rgba(57,168,181,0.18)'
                  : 'none',
              }}>
                {isRepeat && isFocus && ayah.ar.split(' ').map((word, wi) => (
                  <span key={wi} style={{
                    display: 'inline-block',
                    marginLeft: 4,
                    opacity: 1,
                    filter: 'blur(5px)',
                    transition: 'filter 0.3s ease',
                    cursor: 'pointer',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.filter = 'blur(0)'; }}
                    onMouseLeave={e => { e.currentTarget.style.filter = 'blur(5px)'; }}
                    title="Hover to peek"
                  >
                    {word}
                  </span>
                ))}
                {(!isRepeat || !isFocus) && ayah.ar}
              </span>

              {/* Ayah number badge */}
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 26, height: 26, borderRadius: '50%',
                background: isFocus ? 'var(--gold-600)' : 'rgba(255,255,255,0.08)',
                border: `1px solid ${isFocus ? 'var(--gold-500)' : 'rgba(255,255,255,0.12)'}`,
                fontSize: 10, color: isFocus ? 'var(--white)' : 'rgba(255,255,255,0.3)',
                fontFamily: "'Lora',serif",
                marginRight: 6, marginLeft: 2,
                verticalAlign: 'middle',
                flexShrink: 0,
                direction: 'ltr',
                transition: 'all 0.3s ease',
              }}>
                {ayah.n}
              </span>
            </span>
          );
        })}
      </div>

      {/* Transliteration band (only for focused ayahs, ltr) */}
      {showTranslit && (
        <div style={{
          marginTop: 20, direction: 'ltr',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: 14,
        }}>
          <p style={{
            fontSize: 10, color: 'var(--teal-400)', fontFamily: "'Lora',serif",
            textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10,
          }}>
            Pronunciation (transliteration) — focused section only
          </p>
          {ayahs.slice(focusRange[0], focusRange[1] + 1).map(a => (
            <div key={a.n} style={{
              display: 'flex', gap: 10, alignItems: 'flex-start',
              marginBottom: 6,
            }}>
              <span style={{
                fontSize: 10, background: 'var(--gold-600)', color: 'var(--white)',
                padding: '2px 7px', borderRadius: 'var(--r-full)',
                fontFamily: "'Lora',serif", flexShrink: 0, marginTop: 1,
              }}>{a.n}</span>
              <p style={{
                fontSize: 13, color: 'var(--teal-100)',
                fontFamily: "'Lora',serif", fontStyle: 'italic',
                lineHeight: 1.7, margin: 0, letterSpacing: '0.02em',
              }}>{a.tl}</p>
            </div>
          ))}
        </div>
      )}

      {/* Translation band */}
      {showTranslation && (
        <div style={{
          marginTop: 16, direction: 'ltr',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: 14,
        }}>
          <p style={{
            fontSize: 10, color: 'var(--teal-400)', fontFamily: "'Lora',serif",
            textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10,
          }}>
            Translation — focused section
          </p>
          {ayahs.slice(focusRange[0], focusRange[1] + 1).map(a => (
            <div key={a.n} style={{
              display: 'flex', gap: 10, alignItems: 'flex-start',
              marginBottom: 6,
            }}>
              <span style={{
                fontSize: 10, background: 'rgba(57,168,181,0.3)', color: 'var(--teal-100)',
                padding: '2px 7px', borderRadius: 'var(--r-full)',
                fontFamily: "'Lora',serif", flexShrink: 0, marginTop: 1,
              }}>{a.n}</span>
              <p style={{
                fontSize: 13, color: 'var(--teal-100)',
                fontFamily: "'Lora',serif", fontStyle: 'italic',
                lineHeight: 1.7, margin: 0,
              }}>{a.tr}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Settings Modal ────────────────────────────────────────────────────────────

function SettingsModal({ reps, onSave, onClose }) {
  const [val, setVal] = useState(reps);
  const presets = [
    { label: 'Beginner', value: 7, note: 'Good to start' },
    { label: 'Intermediate', value: 15, note: 'Recommended minimum' },
    { label: 'Scholar', value: 21, note: 'Traditional standard' },
  ];
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(11,43,46,0.65)', backdropFilter: 'blur(7px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }} onClick={onClose}>
      <div style={{
        background: 'var(--teal-900)', border: '1px solid rgba(255,255,255,0.13)',
        borderRadius: 'var(--r-2xl)', padding: '36px 32px',
        maxWidth: 420, width: '100%',
        boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
      }} onClick={e => e.stopPropagation()}>
        <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 24, color: 'var(--white)', marginBottom: 6, fontWeight: 400 }}>
          Repetition settings
        </h3>
        <p style={{ fontSize: 13, color: 'var(--teal-300)', fontStyle: 'italic', fontFamily: "'Lora',serif", marginBottom: 24 }}>
          Minimum 15 repetitions recommended for lasting memorization.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 22 }}>
          {presets.map(p => (
            <button key={p.label} onClick={() => setVal(p.value)} style={{
              padding: '14px 12px',
              border: `1.5px solid ${val === p.value ? 'var(--teal-400)' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: 'var(--r-xl)',
              background: val === p.value ? 'rgba(57,168,181,0.15)' : 'rgba(255,255,255,0.04)',
              cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: val === p.value ? 'var(--teal-200)' : 'var(--white)', fontFamily: "'Lora',serif", marginBottom: 2 }}>{p.label}</div>
              <div style={{ fontSize: 22, fontFamily: "'DM Serif Display',serif", color: 'var(--gold-300)', lineHeight: 1, marginBottom: 4 }}>{p.value}×</div>
              <div style={{ fontSize: 10, color: 'var(--teal-400)', fontStyle: 'italic', fontFamily: "'Lora',serif" }}>{p.note}</div>
            </button>
          ))}
        </div>
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 12, color: 'var(--teal-300)', fontFamily: "'Lora',serif" }}>Custom</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--gold-300)', fontFamily: "'DM Serif Display',serif" }}>{val}×</span>
          </div>
          <input type="range" min={3} max={30} value={val} onChange={e => setVal(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--teal-400)', cursor: 'pointer' }} />
          {val < 15 && (
            <p style={{ fontSize: 11, color: 'var(--gold-400)', fontStyle: 'italic', fontFamily: "'Lora',serif", marginTop: 6 }}>
              ⚠ Below recommended minimum (15)
            </p>
          )}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: '12px', border: '1.5px solid rgba(255,255,255,0.12)',
            borderRadius: 'var(--r-lg)', background: 'transparent',
            color: 'var(--teal-200)', fontSize: 14, fontFamily: "'Lora',serif", cursor: 'pointer', fontWeight: 600,
          }}>Cancel</button>
          <button onClick={() => { onSave(val); onClose(); }} style={{
            flex: 2, padding: '12px', border: 'none', borderRadius: 'var(--r-lg)',
            background: 'var(--gold-600)', boxShadow: '0 4px 0 var(--gold-900)',
            color: 'var(--white)', fontSize: 14, fontFamily: "'Lora',serif", cursor: 'pointer', fontWeight: 700,
          }}>Save settings</button>
        </div>
      </div>
    </div>
  );
}

// ── Complete Screen ───────────────────────────────────────────────────────────

function CompleteScreen({ pagesDone, totalReps, onBack }) {
  const navigate = useNavigate();
  return (
    <div style={{
      minHeight: 'calc(100vh - 68px)', background: 'var(--teal-900)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, maxWidth: 440 }}>
        <div style={{ fontSize: 72, marginBottom: 20 }}>🏆</div>
        <div style={{ fontFamily: "'Amiri',serif", fontSize: 28, color: 'var(--gold-300)', direction: 'rtl', marginBottom: 12, lineHeight: 1.5 }}>
          بارك الله فيك
        </div>
        <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 34, color: 'var(--white)', fontWeight: 400, marginBottom: 12 }}>
          Session Complete
        </h2>
        <p style={{ fontSize: 15, color: 'var(--teal-200)', fontStyle: 'italic', fontFamily: "'Lora',serif", marginBottom: 36, lineHeight: 1.7 }}>
          You completed {pagesDone} page section{pagesDone > 1 ? 's' : ''} with {totalReps} total repetitions. Every repetition is an act of worship.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 28, flexWrap: 'wrap' }}>
          {[
            { icon: '📄', label: `${pagesDone} sections`, sub: 'completed' },
            { icon: '🔁', label: `${totalReps}×`, sub: 'repetitions' },
            { icon: '⭐', label: `+${pagesDone * 100} XP`, sub: 'earned' },
          ].map((s, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 'var(--r-xl)', padding: '16px 24px', textAlign: 'center', minWidth: 100,
            }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 22, color: 'var(--gold-300)', lineHeight: 1 }}>{s.label}</div>
              <div style={{ fontSize: 11, color: 'var(--teal-300)', marginTop: 3, fontFamily: "'Lora',serif" }}>{s.sub}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button onClick={onBack} style={{
            padding: '14px 28px', border: '1.5px solid rgba(255,255,255,0.2)',
            borderRadius: 'var(--r-lg)', background: 'transparent',
            color: 'var(--teal-100)', fontSize: 15, fontWeight: 600,
            fontFamily: "'Lora',serif", cursor: 'pointer',
          }}>← Another session</button>
          <button onClick={() => navigate('/dashboard')} style={{
            padding: '14px 28px', border: 'none', borderRadius: 'var(--r-lg)',
            background: 'var(--gold-600)', boxShadow: '0 4px 0 var(--gold-900)',
            color: 'var(--white)', fontSize: 15, fontWeight: 700,
            fontFamily: "'Lora',serif", cursor: 'pointer',
          }}>Back to Dashboard</button>
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function HifzSession() {
  const navigate = useNavigate();

  // ── Session config ──────────────────────────────────────────────────────────
  // In production these would come from the user's profile / route params.
  // Here we demo Surah 2 (Al-Baqarah) starting from ayah 47.
  const SURAH_NUM = 2;
  const SURAH_EN = 'Al-Baqarah';
  const SURAH_AR = 'البَقَرَة';
  const START_AYAH = 47;
  const TOTAL_PAGE_AYAHS = 15; // ~half a page

  // ── State ───────────────────────────────────────────────────────────────────
  const [ayahs, setAyahs] = useState(FALLBACK_AYAHS);
  const [apiLoaded, setApiLoaded] = useState(false);

  const [stepIdx, setStepIdx] = useState(0);
  // focusStart: the first ayah index (in the ayahs array) of the current chunk
  const [focusStart, setFocusStart] = useState(0);
  const [reps, setReps] = useState(DEFAULT_REPS);
  const [repsDone, setRepsDone] = useState(0);
  const [totalReps, setTotalReps] = useState(0);
  const [done, setDone] = useState(false);
  const [entering, setEntering] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showTranslit, setShowTranslit] = useState(false);
  const [pagesDone, setPagesDone] = useState(0);

  // ── Computed ────────────────────────────────────────────────────────────────
  // Split the full ~15-ayah page into 3 chunks of ~5 each for progressive focus
  const CHUNK_SIZE = 5;
  const chunkCount = Math.ceil(TOTAL_PAGE_AYAHS / CHUNK_SIZE);
  const chunkIdx = Math.floor(focusStart / CHUNK_SIZE);
  const focusEnd = Math.min(focusStart + CHUNK_SIZE - 1, ayahs.length - 1);
  const focusRange = [focusStart, focusEnd];
  const step = STEPS[stepIdx];
  const isRepeatStep = step.id === 'repeat';
  const isUnderstandStep = step.id === 'understand';
  const isTajweedStep = step.id === 'tajweed';
  const isFamiliarize = step.id === 'familiarize';

  // Overall progress
  const overallPct = ((chunkIdx * STEPS.length + stepIdx) / (chunkCount * STEPS.length)) * 100;

  const focusedAyahNums = ayahs.slice(focusRange[0], focusRange[1] + 1).map(a => a.n);

  useEffect(() => {
    function loadLocal() {
      try {
        const surahKey = String(SURAH_NUM);
        const startIdx = START_AYAH - 1;
        const endIdx = startIdx + TOTAL_PAGE_AYAHS;

        const verses = quranData[surahKey]?.verses || [];
        const sliced = verses.slice(startIdx, endIdx);

        const merged = sliced.map((v, i) => {
          return {
            n: v.n,
            ar: v.ar || FALLBACK_AYAHS[i]?.ar || '',
            tr: v.tr || FALLBACK_AYAHS[i]?.tr || '',
            tl: v.tl || FALLBACK_AYAHS[i]?.tl || '',
            tajweed: FALLBACK_AYAHS[i]?.tajweed || 'Study the pronunciation of each word carefully.',
          };
        });

        setAyahs(merged);
        setApiLoaded(true);
      } catch (e) {
        console.error('Error loading local Quran data:', e);
        setApiLoaded(false);
      }
    }
    loadLocal();
  }, [SURAH_NUM, START_AYAH, TOTAL_PAGE_AYAHS]);

  // ── Navigation helpers ──────────────────────────────────────────────────────
  function animateTransition(fn) {
    setEntering(false);
    setTimeout(() => { fn(); setEntering(true); }, 160);
  }

  function nextStep() {
    if (stepIdx < STEPS.length - 1) {
      animateTransition(() => {
        setStepIdx(s => s + 1);
        setRepsDone(0);
        setShowTranslation(false);
        setShowTranslit(false);
      });
    } else {
      // Done with all 4 steps for this chunk
      const nextFocus = focusStart + CHUNK_SIZE;
      if (nextFocus < ayahs.length) {
        animateTransition(() => {
          setFocusStart(nextFocus);
          setStepIdx(0);
          setRepsDone(0);
          setShowTranslation(false);
          setShowTranslit(false);
        });
      } else {
        setPagesDone(p => p + 1);
        setDone(true);
      }
    }
  }

  function prevStep() {
    if (stepIdx > 0) {
      animateTransition(() => { setStepIdx(s => s - 1); setRepsDone(0); setShowTranslit(false); setShowTranslation(false); });
    } else if (focusStart > 0) {
      animateTransition(() => {
        setFocusStart(f => Math.max(0, f - CHUNK_SIZE));
        setStepIdx(STEPS.length - 1);
        setRepsDone(0);
      });
    }
  }

  function handleRepTap() {
    if (!isRepeatStep) return;
    const next = repsDone + 1;
    setRepsDone(next);
    setTotalReps(t => t + 1);
    if (next >= reps) setTimeout(() => nextStep(), 500);
  }

  if (done) {
    return (
      <CompleteScreen
        pagesDone={pagesDone}
        totalReps={totalReps}
        onBack={() => { setDone(false); setFocusStart(0); setStepIdx(0); setRepsDone(0); setTotalReps(0); setPagesDone(0); }}
      />
    );
  }

  // ── Tajweed rule for current chunk ──────────────────────────────────────────
  const chunkTajweed = ayahs[focusStart]?.tajweed || '';

  return (
    <div style={{ minHeight: 'calc(100vh - 68px)', background: 'var(--teal-900)', display: 'flex', flexDirection: 'column' }}>

      {showSettings && (
        <SettingsModal reps={reps} onSave={v => { setReps(v); setRepsDone(0); }} onClose={() => setShowSettings(false)} />
      )}

      {/* ── Sticky header ─────────────────────────────────────────────────── */}
      <div style={{
        background: 'rgba(11,43,46,0.85)', backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '12px 24px',
        display: 'flex', alignItems: 'center', gap: 16,
        position: 'sticky', top: 68, zIndex: 10,
      }}>
        <button onClick={() => navigate('/dashboard')} style={{
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 'var(--r-md)', padding: '7px 14px',
          color: 'var(--teal-200)', fontSize: 13, fontFamily: "'Lora',serif",
          cursor: 'pointer', flexShrink: 0,
        }}>← Exit</button>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <span style={{ fontSize: 11, color: 'var(--teal-400)', fontFamily: "'Lora',serif", textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {SURAH_EN} · Ayahs {START_AYAH}–{START_AYAH + TOTAL_PAGE_AYAHS - 1}
            </span>
            <span style={{ fontSize: 11, color: 'var(--teal-300)', fontFamily: "'Lora',serif" }}>
              Section {chunkIdx + 1}/{chunkCount} · Step {stepIdx + 1}/{STEPS.length}
            </span>
          </div>
          {/* Full session progress bar */}
          <div style={{ height: 4, background: 'rgba(255,255,255,0.07)', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: `${overallPct}%`,
              background: 'linear-gradient(90deg, var(--teal-400), var(--gold-400))',
              borderRadius: 999, transition: 'width 0.5s ease',
            }} />
          </div>
        </div>

        <button onClick={() => setShowSettings(true)} style={{
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 'var(--r-md)', padding: '7px 14px',
          color: 'var(--teal-200)', fontSize: 13, fontFamily: "'Lora',serif",
          cursor: 'pointer', flexShrink: 0,
        }}>⚙ {reps}×</button>
      </div>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <div style={{
        flex: 1, maxWidth: 820, width: '100%', margin: '0 auto',
        padding: '28px 24px 56px',
        display: 'flex', flexDirection: 'column', gap: 20,
      }}>

        {/* Step dots */}
        <StepDots steps={STEPS} current={stepIdx} />

        {/* Step pill */}
        <div style={{
          display: 'flex', justifyContent: 'center',
          opacity: entering ? 1 : 0, transform: entering ? 'translateY(0)' : 'translateY(8px)',
          transition: 'all 0.3s ease',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: step.bg, border: `1px solid ${step.border}`,
            borderRadius: 999, padding: '8px 22px',
          }}>
            <span style={{ fontSize: 16 }}>{step.icon}</span>
            <span style={{ fontFamily: "'DM Serif Display',serif", fontSize: 17, color: 'var(--white)', fontWeight: 400 }}>
              Step {step.num}: {step.title}
            </span>
            {step.bonus && (
              <span style={{
                fontSize: 10, fontFamily: "'Lora',serif", fontStyle: 'italic',
                color: 'var(--gold-300)', background: 'rgba(212,151,10,0.15)',
                padding: '2px 8px', borderRadius: 999,
              }}>bonus</span>
            )}
          </div>
        </div>

        {/* Section & chunk indicator */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', flexWrap: 'wrap',
          opacity: entering ? 1 : 0, transition: 'all 0.3s ease 0.04s',
        }}>
          {Array.from({ length: chunkCount }).map((_, i) => (
            <div key={i} style={{
              padding: '4px 14px', borderRadius: 999, fontSize: 11,
              background: i < chunkIdx
                ? 'var(--gold-600)'
                : i === chunkIdx
                  ? 'rgba(57,168,181,0.22)'
                  : 'rgba(255,255,255,0.05)',
              border: `1px solid ${i < chunkIdx ? 'var(--gold-500)' : i === chunkIdx ? 'var(--teal-500)' : 'rgba(255,255,255,0.08)'}`,
              color: i < chunkIdx ? 'var(--white)' : i === chunkIdx ? 'var(--teal-200)' : 'rgba(255,255,255,0.25)',
              fontFamily: "'Lora',serif", fontWeight: i === chunkIdx ? 700 : 400,
              transition: 'all 0.3s ease',
            }}>
              {i < chunkIdx ? '✓ ' : ''}Section {i + 1} · Ayahs {START_AYAH + i * CHUNK_SIZE}–{START_AYAH + Math.min((i + 1) * CHUNK_SIZE, TOTAL_PAGE_AYAHS) - 1}
            </div>
          ))}
          {!apiLoaded && (
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: "'Lora',serif", fontStyle: 'italic' }}>
              (demo text — fetching from Quran.com…)
            </span>
          )}
        </div>

        {/* ── Quran page view ─────────────────────────────────────────────── */}
        <div style={{
          opacity: entering ? 1 : 0, transform: entering ? 'translateY(0)' : 'translateY(12px)',
          transition: 'all 0.35s ease 0.05s',
        }}>
          <QuranPage
            ayahs={ayahs}
            focusRange={focusRange}
            step={step}
            showTranslation={showTranslation || isUnderstandStep}
            showTranslit={showTranslit}
          />
        </div>

        {/* ── Toolbar row: toggles + audio ─────────────────────────────────── */}
        <div style={{
          display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center',
          opacity: entering ? 1 : 0, transition: 'all 0.35s ease 0.08s',
        }}>
          {/* Transliteration toggle */}
          <button onClick={() => setShowTranslit(v => !v)} style={{
            background: showTranslit ? 'rgba(57,168,181,0.18)' : 'rgba(255,255,255,0.06)',
            border: `1px solid ${showTranslit ? 'var(--teal-400)' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: 'var(--r-md)', padding: '8px 16px',
            color: showTranslit ? 'var(--teal-200)' : 'rgba(255,255,255,0.5)',
            fontSize: 12, fontFamily: "'Lora',serif", cursor: 'pointer',
            transition: 'all 0.18s', flexShrink: 0,
          }}>
            🔤 {showTranslit ? 'Hide' : 'Show'} Transliteration
          </button>

          {/* Translation toggle (not auto-shown unless understand step) */}
          {!isUnderstandStep && (
            <button onClick={() => setShowTranslation(v => !v)} style={{
              background: showTranslation ? 'rgba(57,168,181,0.18)' : 'rgba(255,255,255,0.06)',
              border: `1px solid ${showTranslation ? 'var(--teal-400)' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: 'var(--r-md)', padding: '8px 16px',
              color: showTranslation ? 'var(--teal-200)' : 'rgba(255,255,255,0.5)',
              fontSize: 12, fontFamily: "'Lora',serif", cursor: 'pointer',
              transition: 'all 0.18s', flexShrink: 0,
            }}>
              📝 {showTranslation ? 'Hide' : 'Show'} Translation
            </button>
          )}
        </div>

        {/* Audio player (familiarize step) */}
        {isFamiliarize && (
          <div style={{
            opacity: entering ? 1 : 0, transition: 'all 0.35s ease 0.1s',
          }}>
            <AudioPlayer surahNum={SURAH_NUM} ayahNums={focusedAyahNums} />
          </div>
        )}

        {/* Step instruction card */}
        <div style={{
          background: step.bg, border: `1px solid ${step.border}`,
          borderRadius: 'var(--r-xl)', padding: '18px 22px',
          opacity: entering ? 1 : 0, transition: 'all 0.4s ease 0.1s',
        }}>
          {isTajweedStep && (
            <div style={{ marginBottom: 12 }}>
              <p style={{ fontSize: 10, color: 'var(--gold-400)', fontFamily: "'Lora',serif", textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>✨ Tajweed Rule for this section</p>
              <p style={{ fontSize: 14, color: 'var(--white)', fontFamily: "'Lora',serif", lineHeight: 1.75 }}>{chunkTajweed}</p>
            </div>
          )}
          <p style={{ fontSize: 13.5, color: 'var(--teal-100)', fontStyle: 'italic', fontFamily: "'Lora',serif", lineHeight: 1.8, margin: 0 }}>
            {step.desc}
          </p>
        </div>

        {/* ── Repetition UI (repeat step) ─────────────────────────────────── */}
        {isRepeatStep && (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
            opacity: entering ? 1 : 0, transition: 'all 0.4s ease 0.12s',
          }}>
            <p style={{ fontSize: 13, color: 'var(--teal-300)', fontFamily: "'Lora',serif", fontStyle: 'italic' }}>
              Cover the text above if you can. Tap the circle after each full recitation.
            </p>
            <RepCircle done={repsDone} total={reps} onTap={handleRepTap} />
            {/* Rep dots */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', maxWidth: 320 }}>
              {Array.from({ length: reps }).map((_, i) => (
                <div key={i} style={{
                  width: i < repsDone ? 14 : 10, height: i < repsDone ? 14 : 10,
                  borderRadius: '50%',
                  background: i < repsDone ? 'var(--gold-500)' : 'rgba(255,255,255,0.1)',
                  border: `1.5px solid ${i < repsDone ? 'var(--gold-400)' : 'rgba(255,255,255,0.15)'}`,
                  transition: 'all 0.2s ease', flexShrink: 0,
                }} />
              ))}
            </div>
            <p style={{ fontSize: 11, color: 'var(--teal-400)', fontFamily: "'Lora',serif" }}>
              {reps - repsDone > 0 ? `${reps - repsDone} remaining` : '✓ All done! Moving on…'}
            </p>
          </div>
        )}

        {/* ── Navigation ──────────────────────────────────────────────────── */}
        <div style={{
          display: 'flex', gap: 12,
          opacity: entering ? 1 : 0, transition: 'all 0.4s ease 0.15s',
        }}>
          <button onClick={prevStep}
            disabled={focusStart === 0 && stepIdx === 0}
            style={{
              flex: 1, padding: '14px',
              border: '1.5px solid rgba(255,255,255,0.12)', borderRadius: 'var(--r-lg)',
              background: 'transparent',
              color: focusStart === 0 && stepIdx === 0 ? 'rgba(255,255,255,0.18)' : 'var(--teal-200)',
              fontSize: 15, fontWeight: 600, fontFamily: "'Lora',serif",
              cursor: focusStart === 0 && stepIdx === 0 ? 'not-allowed' : 'pointer',
              transition: 'all 0.15s',
            }}>← Back</button>

          {!isRepeatStep && (
            <button onClick={nextStep} style={{
              flex: 2, padding: '14px', border: 'none', borderRadius: 'var(--r-lg)',
              background: stepIdx === STEPS.length - 1 && focusStart + CHUNK_SIZE >= ayahs.length
                ? 'var(--gold-600)' : 'var(--teal-600)',
              boxShadow: stepIdx === STEPS.length - 1 && focusStart + CHUNK_SIZE >= ayahs.length
                ? '0 4px 0 var(--gold-900)' : '0 4px 0 var(--teal-900)',
              color: 'var(--white)', fontSize: 15, fontWeight: 700,
              fontFamily: "'Lora',serif", cursor: 'pointer', transition: 'all 0.15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {stepIdx === STEPS.length - 1
                ? focusStart + CHUNK_SIZE >= ayahs.length
                  ? 'Finish session →'
                  : `Next section →`
                : `${step.id === 'familiarize' ? 'Done listening' : step.id === 'understand' ? 'Understood' : step.id === 'tajweed' ? 'Got it'  : 'Continue'} →`}
            </button>
          )}

          {isRepeatStep && (
            <button onClick={nextStep} disabled={repsDone < reps} style={{
              flex: 2, padding: '14px', border: 'none', borderRadius: 'var(--r-lg)',
              background: repsDone >= reps
                ? focusStart + CHUNK_SIZE >= ayahs.length ? 'var(--gold-600)' : 'var(--teal-600)'
                : 'rgba(255,255,255,0.07)',
              boxShadow: repsDone >= reps
                ? focusStart + CHUNK_SIZE >= ayahs.length ? '0 4px 0 var(--gold-900)' : '0 4px 0 var(--teal-900)'
                : 'none',
              color: repsDone >= reps ? 'var(--white)' : 'rgba(255,255,255,0.22)',
              fontSize: 15, fontWeight: 700, fontFamily: "'Lora',serif",
              cursor: repsDone >= reps ? 'pointer' : 'not-allowed',
            }}>
              {repsDone >= reps
                ? focusStart + CHUNK_SIZE >= ayahs.length ? 'Finish session →' : 'Next section →'
                : `Complete all ${reps} repetitions first`}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}