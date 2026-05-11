import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// ── Data ──────────────────────────────────────────────────────────────────────

const SURAH = {
  num: 2,
  en: 'Al-Baqarah',
  ar: 'البَقَرَة',
  ayahs: [
    { n: 47, ar: 'يَا بَنِي إِسْرَائِيلَ اذْكُرُوا نِعْمَتِيَ الَّتِي أَنْعَمْتُ عَلَيْكُمْ وَأَنِّي فَضَّلْتُكُمْ عَلَى الْعَالَمِينَ', tr: 'O Children of Israel, remember My favor that I bestowed upon you and that I preferred you over the worlds.', tajweed: 'Madd Lazim on نِعْمَتِيَ — elongate 6 counts.' },
    { n: 48, ar: 'وَاتَّقُوا يَوْمًا لَّا تَجْزِي نَفْسٌ عَن نَّفْسٍ شَيْئًا', tr: 'And fear a Day when no soul will suffice for another soul at all.', tajweed: 'Idgham with ghunna on نَّفْسٍ — merge the noon with a nasal hum.' },
    { n: 49, ar: 'وَإِذْ نَجَّيْنَاكُم مِّنْ آلِ فِرْعَوْنَ يَسُومُونَكُمْ سُوءَ الْعَذَابِ', tr: 'And recall when We saved you from the people of Pharaoh, who afflicted you with the worst torment.', tajweed: 'Iqlab on مِّنْ آلِ — convert noon sakinah to meem with ghunna.' },
  ],
};

const STEPS = [
  {
    id: 'familiarize',
    num: '1',
    icon: '👁️',
    title: 'Familiarize',
    desc: 'Read the ayah carefully. Let your eyes and tongue grow comfortable with every word.',
    action: 'Read slowly',
    color: '#1a5e3a',
    bg: 'rgba(26,94,58,0.07)',
    border: 'rgba(26,94,58,0.25)',
  },
  {
    id: 'listen',
    num: '2',
    icon: '🎧',
    title: 'Listen',
    desc: 'Play the recitation and follow along. Train your ear to the rhythm and melody.',
    action: 'Listen & follow',
    color: '#1a5c4a',
    bg: 'rgba(26,92,74,0.07)',
    border: 'rgba(26,92,74,0.25)',
  },
  {
    id: 'understand',
    num: '3',
    icon: '💡',
    title: 'Understand',
    desc: 'Read the translation and absorb the meaning. Meaning creates emotional anchors for lasting memorization.',
    action: 'Read meaning',
    color: '#165a58',
    bg: 'rgba(22,90,88,0.07)',
    border: 'rgba(22,90,88,0.25)',
  },
  {
    id: 'tajweed',
    num: '4',
    icon: '✨',
    title: 'Spot the Tajweed',
    desc: 'Study the highlighted rule for this ayah. One rule at a time builds a lifetime of precision.',
    action: 'Study rule',
    color: '#134e6e',
    bg: 'rgba(19,78,110,0.07)',
    border: 'rgba(19,78,110,0.25)',
    bonus: true,
  },
  {
    id: 'repeat',
    num: '5',
    icon: '🔁',
    title: 'Repeat to Memorize',
    desc: 'Cover the text and recite from memory. Repeat until it flows naturally — this is the heart of Hifz.',
    action: 'Start repeating',
    color: '#0f3d7a',
    bg: 'rgba(15,61,122,0.07)',
    border: 'rgba(15,61,122,0.25)',
  },
];

const DEFAULT_REPS = 7;
const MIN_REPS = 15; // shown in settings as minimum for "advanced"
const BEGINNER_REPS = 7;

// ── Helpers ───────────────────────────────────────────────────────────────────

function ProgressBar({ current, total, label }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div style={{ width: '100%' }}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 11, color: 'var(--teal-400)', fontFamily: "'Lora', serif", letterSpacing: '0.05em', textTransform: 'uppercase' }}>{label}</span>
          <span style={{ fontSize: 11, color: 'var(--teal-300)', fontFamily: "'Lora', serif" }}>{current}/{total}</span>
        </div>
      )}
      <div style={{ height: 5, background: 'rgba(255,255,255,0.08)', borderRadius: 'var(--r-full)', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          background: 'linear-gradient(90deg, var(--teal-400), var(--gold-400))',
          borderRadius: 'var(--r-full)',
          transition: 'width 0.4s ease',
        }} />
      </div>
    </div>
  );
}

function StepDots({ steps, currentStep }) {
  return (
    <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
      {steps.map((s, i) => {
        const done = i < currentStep;
        const active = i === currentStep;
        return (
          <div key={s.id} style={{
            height: 4,
            width: active ? 36 : done ? 24 : 24,
            borderRadius: 'var(--r-full)',
            background: done ? 'var(--gold-500)' : active ? 'var(--teal-400)' : 'rgba(255,255,255,0.12)',
            transition: 'all 0.3s ease',
            flexShrink: 0,
          }} />
        );
      })}
    </div>
  );
}

function RepCircle({ done, total, onTap }) {
  const pct = total > 0 ? (done / total) * 100 : 0;
  const r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);

  return (
    <div
      onClick={onTap}
      style={{
        position: 'relative',
        width: 140,
        height: 140,
        cursor: 'pointer',
        userSelect: 'none',
        filter: 'drop-shadow(0 4px 20px rgba(57,168,181,0.22))',
        transition: 'transform 0.12s',
      }}
      onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
      onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={r} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
        <circle
          cx="70" cy="70" r={r}
          fill="none"
          stroke="url(#repGrad)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          transform="rotate(-90 70 70)"
          style={{ transition: 'stroke-dashoffset 0.35s ease' }}
        />
        <defs>
          <linearGradient id="repGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#39A8B5" />
            <stop offset="100%" stopColor="#E8B430" />
          </linearGradient>
        </defs>
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 2,
      }}>
        <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 38, color: 'var(--gold-300)', lineHeight: 1 }}>{done}</span>
        <span style={{ fontSize: 11, color: 'var(--teal-300)', fontFamily: "'Lora', serif" }}>of {total}</span>
      </div>
    </div>
  );
}

// ── Settings Modal ─────────────────────────────────────────────────────────────

function SettingsModal({ reps, onSave, onClose }) {
  const [val, setVal] = useState(reps);

  const presets = [
    { label: 'Beginner', value: 7, note: 'Recommended to start' },
    { label: 'Intermediate', value: 15, note: 'Minimum for solid retention' },
    { label: 'Scholar', value: 21, note: 'Traditional Hifz standard' },
    { label: 'Custom', value: null, note: 'Set your own count' },
  ];

  const isCustom = !presets.slice(0, 3).some(p => p.value === val);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(11,43,46,0.6)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
    }} onClick={onClose}>
      <div
        style={{
          background: 'var(--teal-900)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 'var(--r-2xl)',
          padding: '36px 32px',
          maxWidth: 420, width: '100%',
          boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, color: 'var(--white)', marginBottom: 6, fontWeight: 400 }}>
          Repetition settings
        </h3>
        <p style={{ fontSize: 13, color: 'var(--teal-300)', fontStyle: 'italic', fontFamily: "'Lora', serif", marginBottom: 28 }}>
          Minimum 15 repetitions recommended for lasting memorization.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {presets.slice(0, 3).map(p => (
            <button
              key={p.label}
              onClick={() => setVal(p.value)}
              style={{
                padding: '14px 16px',
                border: `1.5px solid ${val === p.value ? 'var(--teal-400)' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: 'var(--r-xl)',
                background: val === p.value ? 'rgba(57,168,181,0.15)' : 'rgba(255,255,255,0.04)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s',
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 700, color: val === p.value ? 'var(--teal-200)' : 'var(--white)', fontFamily: "'Lora', serif", marginBottom: 2 }}>{p.label}</div>
              <div style={{ fontSize: 22, fontFamily: "'DM Serif Display', serif", color: 'var(--gold-300)', lineHeight: 1, marginBottom: 4 }}>{p.value}×</div>
              <div style={{ fontSize: 11, color: 'var(--teal-400)', fontStyle: 'italic', fontFamily: "'Lora', serif" }}>{p.note}</div>
            </button>
          ))}
          {/* Custom */}
          <button
            onClick={() => setVal(isCustom ? val : 10)}
            style={{
              padding: '14px 16px',
              border: `1.5px solid ${isCustom ? 'var(--teal-400)' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: 'var(--r-xl)',
              background: isCustom ? 'rgba(57,168,181,0.15)' : 'rgba(255,255,255,0.04)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.15s',
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 700, color: isCustom ? 'var(--teal-200)' : 'var(--white)', fontFamily: "'Lora', serif", marginBottom: 2 }}>Custom</div>
            <div style={{ fontSize: 22, fontFamily: "'DM Serif Display', serif", color: 'var(--gold-300)', lineHeight: 1, marginBottom: 4 }}>{isCustom ? `${val}×` : '?×'}</div>
            <div style={{ fontSize: 11, color: 'var(--teal-400)', fontStyle: 'italic', fontFamily: "'Lora', serif" }}>Set your own</div>
          </button>
        </div>

        {/* Slider */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 12, color: 'var(--teal-300)', fontFamily: "'Lora', serif" }}>Repetitions per ayah</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--gold-300)', fontFamily: "'DM Serif Display', serif" }}>{val}×</span>
          </div>
          <input
            type="range" min={3} max={30} value={val}
            onChange={e => setVal(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--teal-400)', cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', fontFamily: "'Lora', serif" }}>3 min</span>
            {val < 15 && (
              <span style={{ fontSize: 10, color: 'var(--gold-400)', fontStyle: 'italic', fontFamily: "'Lora', serif" }}>
                ⚠ Below recommended minimum (15)
              </span>
            )}
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', fontFamily: "'Lora', serif" }}>30 max</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={onClose}
            style={{
              flex: 1, padding: '12px', border: '1.5px solid rgba(255,255,255,0.12)',
              borderRadius: 'var(--r-lg)', background: 'transparent',
              color: 'var(--teal-200)', fontSize: 14, fontFamily: "'Lora', serif",
              cursor: 'pointer', fontWeight: 600,
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => { onSave(val); onClose(); }}
            style={{
              flex: 2, padding: '12px', border: 'none',
              borderRadius: 'var(--r-lg)',
              background: 'var(--gold-600)',
              boxShadow: '0 4px 0 var(--gold-900)',
              color: 'var(--white)', fontSize: 14, fontFamily: "'Lora', serif",
              cursor: 'pointer', fontWeight: 700,
            }}
          >
            Save settings
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Complete Screen ────────────────────────────────────────────────────────────

function CompleteScreen({ ayahsDone, totalReps, onBack }) {
  const navigate = useNavigate();
  return (
    <div style={{
      minHeight: 'calc(100vh - 68px)',
      background: 'var(--teal-900)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        pointerEvents: 'none',
      }} />

      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, maxWidth: 440 }}>
        <div style={{ fontSize: 72, marginBottom: 20 }}>🏆</div>
        <div style={{
          fontFamily: "'Amiri', serif",
          fontSize: 28, color: 'var(--gold-300)',
          direction: 'rtl', marginBottom: 16, lineHeight: 1.5,
        }}>
          بارك الله فيك
        </div>
        <h2 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 34, color: 'var(--white)',
          fontWeight: 400, marginBottom: 12,
        }}>
          Session Complete
        </h2>
        <p style={{ fontSize: 15, color: 'var(--teal-200)', fontStyle: 'italic', fontFamily: "'Lora', serif", marginBottom: 36, lineHeight: 1.7 }}>
          You studied {ayahsDone} ayah{ayahsDone > 1 ? 's' : ''} with a total of {totalReps} repetitions. Every repetition is an act of worship.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 28, flexWrap: 'wrap' }}>
          {[
            { icon: '📖', label: `${ayahsDone} ayahs`, sub: 'studied' },
            { icon: '🔁', label: `${totalReps}×`, sub: 'repetitions' },
            { icon: '⭐', label: `+${ayahsDone * 50} XP`, sub: 'earned' },
          ].map((s, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 'var(--r-xl)',
              padding: '16px 24px',
              textAlign: 'center',
              minWidth: 100,
            }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: 'var(--gold-300)', lineHeight: 1 }}>{s.label}</div>
              <div style={{ fontSize: 11, color: 'var(--teal-300)', marginTop: 3, fontFamily: "'Lora', serif" }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button
            onClick={onBack}
            style={{
              padding: '14px 28px',
              border: '1.5px solid rgba(255,255,255,0.2)',
              borderRadius: 'var(--r-lg)',
              background: 'transparent',
              color: 'var(--teal-100)',
              fontSize: 15, fontWeight: 600,
              fontFamily: "'Lora', serif",
              cursor: 'pointer',
            }}
          >
            ← Another session
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              padding: '14px 28px',
              border: 'none',
              borderRadius: 'var(--r-lg)',
              background: 'var(--gold-600)',
              boxShadow: '0 4px 0 var(--gold-900)',
              color: 'var(--white)',
              fontSize: 15, fontWeight: 700,
              fontFamily: "'Lora', serif",
              cursor: 'pointer',
            }}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main HifzSession ───────────────────────────────────────────────────────────

export default function HifzSession() {
  const navigate = useNavigate();

  const [ayahIdx, setAyahIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [reps, setReps] = useState(DEFAULT_REPS);
  const [repsDone, setRepsDone] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [totalReps, setTotalReps] = useState(0);
  const [done, setDone] = useState(false);
  const [entering, setEntering] = useState(false);

  const ayah = SURAH.ayahs[ayahIdx];
  const step = STEPS[stepIdx];
  const isRepeatStep = step.id === 'repeat';
  const isUnderstandStep = step.id === 'understand';
  const isTajweedStep = step.id === 'tajweed';
  const totalAyahs = SURAH.ayahs.length;

  // Overall progress: (ayahs fully done + fraction of current) / total
  const overallProgress = (ayahIdx + (stepIdx + (isRepeatStep ? repsDone / reps : 0)) / STEPS.length) / totalAyahs;

  function animateTransition(fn) {
    setEntering(false);
    setTimeout(() => { fn(); setEntering(true); }, 180);
  }

  useEffect(() => { setEntering(true); }, []);

  function handleNextStep() {
    if (stepIdx < STEPS.length - 1) {
      animateTransition(() => {
        setStepIdx(s => s + 1);
        setRepsDone(0);
        setShowTranslation(false);
      });
    } else {
      // move to next ayah
      if (ayahIdx < totalAyahs - 1) {
        animateTransition(() => {
          setAyahIdx(a => a + 1);
          setStepIdx(0);
          setRepsDone(0);
          setShowTranslation(false);
        });
      } else {
        setDone(true);
      }
    }
  }

  function handleRepTap() {
    if (!isRepeatStep) return;
    const next = repsDone + 1;
    setRepsDone(next);
    setTotalReps(t => t + 1);
    if (next >= reps) {
      setTimeout(() => handleNextStep(), 500);
    }
  }

  function handleBack() {
    if (stepIdx > 0) {
      animateTransition(() => { setStepIdx(s => s - 1); setRepsDone(0); setShowTranslation(false); });
    } else if (ayahIdx > 0) {
      animateTransition(() => { setAyahIdx(a => a - 1); setStepIdx(STEPS.length - 1); setRepsDone(0); setShowTranslation(false); });
    }
  }

  if (done) {
    return <CompleteScreen ayahsDone={totalAyahs} totalReps={totalReps} onBack={() => { setDone(false); setAyahIdx(0); setStepIdx(0); setRepsDone(0); setTotalReps(0); }} />;
  }

  return (
    <div style={{
      minHeight: 'calc(100vh - 68px)',
      background: 'var(--teal-900)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}>

      {/* Settings modal */}
      {showSettings && (
        <SettingsModal
          reps={reps}
          onSave={(v) => { setReps(v); setRepsDone(0); }}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* ── Header bar ── */}
      <div style={{
        background: 'rgba(11,43,46,0.8)', backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '14px 24px',
        display: 'flex', alignItems: 'center', gap: 16,
        position: 'sticky', top: 68, zIndex: 10,
      }}>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 'var(--r-md)', padding: '8px 14px',
            color: 'var(--teal-200)', fontSize: 13, fontFamily: "'Lora', serif",
            cursor: 'pointer', flexShrink: 0,
          }}
        >
          ← Exit
        </button>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: 'var(--teal-400)', fontFamily: "'Lora', serif", textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {SURAH.en} · Ayah {ayah.n}
            </span>
            <span style={{ fontSize: 11, color: 'var(--teal-300)', fontFamily: "'Lora', serif" }}>
              {ayahIdx + 1}/{totalAyahs} ayahs · Step {stepIdx + 1}/{STEPS.length}
            </span>
          </div>
          <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--r-full)', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${overallProgress * 100}%`,
              background: 'linear-gradient(90deg, var(--teal-400), var(--gold-400))',
              borderRadius: 'var(--r-full)',
              transition: 'width 0.5s ease',
            }} />
          </div>
        </div>

        <button
          onClick={() => setShowSettings(true)}
          style={{
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 'var(--r-md)', padding: '8px 14px',
            color: 'var(--teal-200)', fontSize: 13, fontFamily: "'Lora', serif",
            cursor: 'pointer', flexShrink: 0,
          }}
        >
          ⚙ {reps}×
        </button>
      </div>

      {/* ── Main content ── */}
      <div style={{
        flex: 1,
        maxWidth: 780, width: '100%',
        margin: '0 auto',
        padding: '32px 24px 48px',
        display: 'flex', flexDirection: 'column', gap: 24,
      }}>

        {/* Step indicator dots */}
        <StepDots steps={STEPS} currentStep={stepIdx} />

        {/* Step label pill */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          justifyContent: 'center',
          opacity: entering ? 1 : 0,
          transform: entering ? 'translateY(0)' : 'translateY(8px)',
          transition: 'all 0.3s ease',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: step.bg,
            border: `1px solid ${step.border}`,
            borderRadius: 'var(--r-full)',
            padding: '8px 20px',
          }}>
            <span style={{ fontSize: 16 }}>{step.icon}</span>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 17, color: 'var(--white)', fontWeight: 400 }}>
              Step {step.num}: {step.title}
            </span>
            {step.bonus && (
              <span style={{
                fontSize: 10, fontFamily: "'Lora', serif", fontStyle: 'italic',
                color: 'var(--gold-300)',
                background: 'rgba(212,151,10,0.15)', padding: '2px 8px',
                borderRadius: 'var(--r-full)',
              }}>bonus</span>
            )}
          </div>
        </div>

        {/* ── Ayah card ── */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 'var(--r-2xl)',
          overflow: 'hidden',
          opacity: entering ? 1 : 0,
          transform: entering ? 'translateY(0)' : 'translateY(12px)',
          transition: 'all 0.35s ease',
        }}>
          {/* Ayah number badge */}
          <div style={{
            padding: '16px 24px',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 'var(--r-md)',
                background: 'var(--gold-600)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'DM Serif Display', serif", fontSize: 14, color: 'var(--white)',
                boxShadow: '0 2px 0 var(--gold-900)',
              }}>
                {ayah.n}
              </div>
              <span style={{ fontSize: 13, color: 'var(--teal-300)', fontFamily: "'Lora', serif" }}>
                {SURAH.en} · Ayah {ayah.n}
              </span>
            </div>
            <span style={{ fontFamily: "'Amiri', serif", fontSize: 16, color: 'var(--teal-400)', direction: 'rtl' }}>
              {SURAH.ar}
            </span>
          </div>

          {/* Arabic text */}
          <div style={{ padding: '32px 28px 24px' }}>
            <p style={{
              fontFamily: "'Amiri', serif",
              fontSize: 'clamp(22px, 3.5vw, 30px)',
              color: 'var(--white)',
              direction: 'rtl',
              textAlign: 'right',
              lineHeight: 2,
              marginBottom: 0,
              filter: isRepeatStep && repsDone === 0 ? 'blur(6px)' : 'none',
              userSelect: isRepeatStep ? 'none' : 'auto',
              transition: 'filter 0.4s ease',
            }}>
              {ayah.ar}
            </p>
            {isRepeatStep && repsDone === 0 && (
              <p style={{ fontSize: 12, color: 'var(--teal-400)', fontStyle: 'italic', fontFamily: "'Lora', serif", textAlign: 'center', marginTop: 8 }}>
                Text hidden — recite from memory
              </p>
            )}
            {isRepeatStep && repsDone > 0 && (
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontStyle: 'italic', fontFamily: "'Lora', serif", textAlign: 'center', marginTop: 8 }}>
                Tap the circle each time you complete a recitation
              </p>
            )}
          </div>

          {/* Translation (toggleable, shown for understand step auto) */}
          {(isUnderstandStep || showTranslation) && (
            <div style={{
              padding: '16px 28px 24px',
              borderTop: '1px solid rgba(255,255,255,0.07)',
              background: 'rgba(255,255,255,0.02)',
            }}>
              <p style={{ fontSize: 11, color: 'var(--teal-400)', fontFamily: "'Lora', serif", textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Translation</p>
              <p style={{ fontSize: 15, color: 'var(--teal-100)', fontStyle: 'italic', fontFamily: "'Lora', serif", lineHeight: 1.8 }}>
                {ayah.tr}
              </p>
            </div>
          )}

          {/* Tajweed note */}
          {isTajweedStep && (
            <div style={{
              padding: '16px 28px 24px',
              borderTop: '1px solid rgba(255,255,255,0.07)',
              background: 'rgba(19,78,110,0.12)',
            }}>
              <p style={{ fontSize: 11, color: 'var(--gold-400)', fontFamily: "'Lora', serif", textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>✨ Tajweed Rule</p>
              <p style={{ fontSize: 15, color: 'var(--white)', fontFamily: "'Lora', serif", lineHeight: 1.8 }}>
                {ayah.tajweed}
              </p>
            </div>
          )}

          {/* Translation toggle button (not for understand step) */}
          {!isUnderstandStep && (
            <div style={{ padding: '12px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowTranslation(v => !v)}
                style={{
                  background: 'none', border: 'none',
                  color: showTranslation ? 'var(--teal-400)' : 'var(--teal-500)',
                  fontSize: 12, fontFamily: "'Lora', serif",
                  cursor: 'pointer', fontStyle: 'italic',
                }}
              >
                {showTranslation ? 'Hide translation ↑' : 'Show translation ↓'}
              </button>
            </div>
          )}
        </div>

        {/* ── Step instruction card ── */}
        <div style={{
          background: step.bg,
          border: `1px solid ${step.border}`,
          borderRadius: 'var(--r-xl)',
          padding: '20px 24px',
          opacity: entering ? 1 : 0,
          transform: entering ? 'translateY(0)' : 'translateY(8px)',
          transition: 'all 0.4s ease 0.05s',
        }}>
          <p style={{ fontSize: 14, color: 'var(--teal-100)', fontStyle: 'italic', fontFamily: "'Lora', serif", lineHeight: 1.8, margin: 0 }}>
            {step.desc}
          </p>
        </div>

        {/* ── Repetition counter (repeat step only) ── */}
        {isRepeatStep && (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
            opacity: entering ? 1 : 0,
            transform: entering ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.4s ease 0.1s',
          }}>
            <p style={{ fontSize: 13, color: 'var(--teal-300)', fontFamily: "'Lora', serif", fontStyle: 'italic' }}>
              Tap the circle after each recitation
            </p>
            <RepCircle done={repsDone} total={reps} onTap={handleRepTap} />

            {/* Rep dots */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', maxWidth: 320 }}>
              {Array.from({ length: reps }).map((_, i) => (
                <div key={i} style={{
                  width: i < repsDone ? 14 : 10,
                  height: i < repsDone ? 14 : 10,
                  borderRadius: '50%',
                  background: i < repsDone ? 'var(--gold-500)' : 'rgba(255,255,255,0.1)',
                  border: `1.5px solid ${i < repsDone ? 'var(--gold-400)' : 'rgba(255,255,255,0.15)'}`,
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                }} />
              ))}
            </div>

            <p style={{ fontSize: 11, color: 'var(--teal-400)', fontFamily: "'Lora', serif" }}>
              {reps - repsDone > 0 ? `${reps - repsDone} repetitions remaining` : 'All done! Moving on…'}
            </p>
          </div>
        )}

        {/* ── Navigation buttons ── */}
        <div style={{
          display: 'flex', gap: 12,
          opacity: entering ? 1 : 0,
          transition: 'all 0.4s ease 0.15s',
        }}>
          <button
            onClick={handleBack}
            disabled={ayahIdx === 0 && stepIdx === 0}
            style={{
              flex: 1, padding: '14px',
              border: '1.5px solid rgba(255,255,255,0.12)',
              borderRadius: 'var(--r-lg)',
              background: 'transparent',
              color: ayahIdx === 0 && stepIdx === 0 ? 'rgba(255,255,255,0.2)' : 'var(--teal-200)',
              fontSize: 15, fontWeight: 600,
              fontFamily: "'Lora', serif",
              cursor: ayahIdx === 0 && stepIdx === 0 ? 'not-allowed' : 'pointer',
              transition: 'all 0.15s',
            }}
          >
            ← Back
          </button>

          {!isRepeatStep && (
            <button
              onClick={handleNextStep}
              style={{
                flex: 2, padding: '14px',
                border: 'none',
                borderRadius: 'var(--r-lg)',
                background: stepIdx === STEPS.length - 1 && ayahIdx === totalAyahs - 1
                  ? 'var(--gold-600)'
                  : 'var(--teal-600)',
                boxShadow: stepIdx === STEPS.length - 1 && ayahIdx === totalAyahs - 1
                  ? '0 4px 0 var(--gold-900)'
                  : '0 4px 0 var(--teal-900)',
                color: 'var(--white)',
                fontSize: 15, fontWeight: 700,
                fontFamily: "'Lora', serif",
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {stepIdx === STEPS.length - 1
                ? ayahIdx === totalAyahs - 1
                  ? 'Finish session →'
                  : `Next ayah (${ayahIdx + 2}/${totalAyahs}) →`
                : `${step.action} — Continue →`}
            </button>
          )}

          {isRepeatStep && (
            <button
              onClick={handleNextStep}
              disabled={repsDone < reps}
              style={{
                flex: 2, padding: '14px',
                border: 'none',
                borderRadius: 'var(--r-lg)',
                background: repsDone >= reps
                  ? ayahIdx === totalAyahs - 1 ? 'var(--gold-600)' : 'var(--teal-600)'
                  : 'rgba(255,255,255,0.08)',
                boxShadow: repsDone >= reps
                  ? ayahIdx === totalAyahs - 1 ? '0 4px 0 var(--gold-900)' : '0 4px 0 var(--teal-900)'
                  : 'none',
                color: repsDone >= reps ? 'var(--white)' : 'rgba(255,255,255,0.25)',
                fontSize: 15, fontWeight: 700,
                fontFamily: "'Lora', serif",
                cursor: repsDone >= reps ? 'pointer' : 'not-allowed',
              }}
            >
              {repsDone >= reps
                ? ayahIdx === totalAyahs - 1 ? 'Finish session →' : `Next ayah →`
                : `Complete all ${reps} repetitions first`}
            </button>
          )}
        </div>

        {/* Ayah progress pills */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          {SURAH.ayahs.map((a, i) => (
            <div key={a.n} style={{
              padding: '5px 14px',
              borderRadius: 'var(--r-full)',
              background: i < ayahIdx
                ? 'var(--gold-600)'
                : i === ayahIdx
                  ? 'rgba(57,168,181,0.2)'
                  : 'rgba(255,255,255,0.05)',
              border: `1px solid ${i < ayahIdx ? 'var(--gold-500)' : i === ayahIdx ? 'var(--teal-500)' : 'rgba(255,255,255,0.08)'}`,
              fontSize: 12,
              color: i < ayahIdx ? 'var(--white)' : i === ayahIdx ? 'var(--teal-200)' : 'rgba(255,255,255,0.25)',
              fontFamily: "'Lora', serif",
              fontWeight: i === ayahIdx ? 700 : 400,
              transition: 'all 0.3s ease',
            }}>
              {i < ayahIdx ? '✓' : ''} Ayah {a.n}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}