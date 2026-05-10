import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const STEPS = [
  { id: 'account', label: 'Account' },
  { id: 'location', label: 'Location' },
  { id: 'goals', label: 'Goals' },
  { id: 'progress', label: 'Progress' },
  { id: 'features', label: 'Features' },
  { id: 'start', label: 'Start' },
  { id: 'background', label: 'Background' },
];

const COUNTRIES = [
  'Algeria', 'Australia', 'Bangladesh', 'Canada', 'Egypt', 'France',
  'Germany', 'India', 'Indonesia', 'Jordan', 'Kuwait', 'Lebanon',
  'Libya', 'Malaysia', 'Morocco', 'Netherlands', 'Nigeria', 'Oman',
  'Pakistan', 'Qatar', 'Saudi Arabia', 'Senegal', 'Somalia', 'Sudan',
  'Syria', 'Tunisia', 'Turkey', 'UAE', 'United Kingdom', 'United States',
  'Yemen', 'Other',
];

const GOALS = [
  { id: 'memorize', emoji: '🧠', label: 'Full Hifz', desc: 'Memorize the entire Quran' },
  { id: 'partial', emoji: '📖', label: 'Partial Hifz', desc: 'Memorize selected Surahs or Juz' },
  { id: 'recitation', emoji: '🎙️', label: 'Better recitation', desc: 'Improve pronunciation and fluency' },
  { id: 'tajweed', emoji: '✨', label: 'Learn Tajweed', desc: 'Master the rules of recitation' },
  { id: 'daily', emoji: '🌙', label: 'Daily reading', desc: 'Build a consistent reading habit' },
];

const MEMORIZED_OPTIONS = [
  { id: 'none', label: 'Nothing yet', desc: 'I am starting from scratch' },
  { id: 'lessthanejuz', label: 'Less than one Juz', desc: 'A few Surahs here and there' },
  { id: 'onejuz', label: 'One Juz', desc: 'A complete Juz memorized' },
  { id: 'severaljuz', label: 'Several Juz', desc: 'More than one complete Juz' },
  { id: 'half', label: 'Half the Quran', desc: 'Around 15 Juz or more' },
  { id: 'most', label: 'Most of the Quran', desc: '25 Juz or more' },
  { id: 'full', label: 'The entire Quran', desc: 'I have memorized the complete Quran' },
];

const FEATURES_OPTIONS = [
  { id: 'memorization', emoji: '🧠', label: 'Help with memorization', desc: 'Spaced repetition, revision schedules' },
  { id: 'tajweed', emoji: '✨', label: 'Tajweed lessons', desc: 'Rules, pronunciation, makharij' },
  { id: 'recitation', emoji: '🎙️', label: 'Recitation practice', desc: 'Listen, repeat, get feedback' },
  { id: 'progress', emoji: '📊', label: 'Progress tracking', desc: 'Streaks, milestones, heatmap' },
  { id: 'community', emoji: '🤝', label: 'Community & accountability', desc: 'Learn with others' },
  { id: 'translation', emoji: '📝', label: 'Translation & tafsir', desc: 'Understand what you recite' },
];

const START_OPTIONS = [
  { id: 'bottom', emoji: '⬇️', label: 'From the bottom', desc: 'Start with Juz Amma — shorter Surahs, great for beginners' },
  { id: 'top', emoji: '⬆️', label: 'From the top', desc: 'Start from Al-Fatiha and Al-Baqarah' },
  { id: 'where_left', emoji: '📍', label: 'Where I left off', desc: 'Continue from what I already know' },
  { id: 'custom', emoji: '🎯', label: 'A specific Surah', desc: 'I have a particular Surah in mind' },
];

const BACKGROUND_OPTIONS = [
  { id: 'mosque', emoji: '🕌', label: 'In a mosque', desc: 'With an imam or Quran circle' },
  { id: 'teacher', emoji: '📜', label: 'With a private teacher', desc: 'One-on-one instruction' },
  { id: 'friends', emoji: '👥', label: 'With friends or family', desc: 'Informal group learning' },
  { id: 'self', emoji: '📱', label: 'Self-taught', desc: 'Self effort' },
  { id: 'first', emoji: '🌱', label: 'This is my first time', desc: 'I have never studied Quran before' },
];

function StepIndicator({ current, total }) {
  return (
    <div className="signup-steps">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`signup-step-dot ${i < current ? 'done' : ''} ${i === current ? 'active' : ''}`}
        />
      ))}
    </div>
  );
}

function OptionsGrid({ options, selected, onSelect, multi = false }) {
  const isOdd = options.length % 2 !== 0;
  return (
    <div className="signup-options-grid">
      {options.map((o, i) => {
        const isLast = i === options.length - 1;
        const isSel = multi ? selected.includes(o.id) : selected === o.id;
        return (
          <div
            key={o.id}
            style={isOdd && isLast ? { gridColumn: '1 / -1', maxWidth: '50%', margin: '0 auto', width: '100%' } : {}}
          >
            <button
              className={`signup-option-card ${isSel ? 'selected' : ''}`}
              onClick={() => onSelect(o.id)}
              type="button"
              style={{ width: '100%' }}
            >
              {o.emoji && <span className="signup-option-emoji">{o.emoji}</span>}
              <span className="signup-option-label">{o.label}</span>
              {o.desc && <span className="signup-option-desc">{o.desc}</span>}
              {isSel && <span className="signup-option-check">✓</span>}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default function SignUp() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    country: '',
    goal: '',
    memorized: '',
    features: [],
    startFrom: '',
    background: '',
  });

  function next() { setStep(s => Math.min(s + 1, STEPS.length - 1)); }
  function back() { setStep(s => Math.max(s - 1, 0)); }

  function setField(key, value) {
    setForm(f => ({ ...f, [key]: value }));
  }

  function toggleFeature(id) {
    setForm(f => ({
      ...f,
      features: f.features.includes(id)
        ? f.features.filter(x => x !== id)
        : [...f.features, id],
    }));
  }

  const sideQuotes = [
    { ar: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', ref: 'Al-Fatiha · 1:1', en: 'In the name of Allah, the Most Gracious, the Most Merciful.' },
    { ar: 'إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ', ref: 'Al-Hijr · 15:9', en: 'Indeed, it is We who sent down the Quran and indeed, We will be its guardian.' },
    { ar: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ', ref: 'Hadith · Bukhari', en: 'The best among you are those who learn the Quran and teach it.' },
    { ar: 'وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ', ref: 'Al-Qamar · 54:17', en: 'And We have certainly made the Quran easy for remembrance.' },
    { ar: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ', ref: 'Al-Alaq · 96:1', en: 'Read in the name of your Lord who created.' },
    { ar: 'وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا', ref: 'Al-Muzzammil · 73:4', en: 'Recite the Quran with measured recitation.' },
    { ar: 'إِنَّ هَٰذَا الْقُرْآنَ يَهْدِي لِلَّتِي هِيَ أَقْوَمُ', ref: 'Al-Isra · 17:9', en: 'Indeed, this Quran guides to that which is most suitable.' },
  ];

  const quote = sideQuotes[step] || sideQuotes[0];

  return (
    <div className="auth-page">

      <div className="auth-card signup-card">
        <StepIndicator current={step} total={STEPS.length} />

        {/* ── Step 0: Account ── */}
        {step === 0 && (
          <div className="signup-step-content">
            <span className="auth-arabic">مقرأتي</span>
            <h2 className="auth-title">Create your account</h2>
            <p className="auth-sub">Your sacred space begins here</p>

            <div className="auth-form" style={{ marginTop: 28 }}>
              <div className="auth-field">
                <label className="auth-label">Full name</label>
                <input
                  type="text"
                  className="auth-input"
                  placeholder="Your name"
                  value={form.name}
                  onChange={e => setField('name', e.target.value)}
                />
              </div>
              <div className="auth-field">
                <label className="auth-label">Email address</label>
                <input
                  type="email"
                  className="auth-input"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setField('email', e.target.value)}
                />
              </div>
              <div className="auth-field">
                <label className="auth-label">Password</label>
                <input
                  type="password"
                  className="auth-input"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setField('password', e.target.value)}
                />
              </div>

              <button className="btn btn-gold" style={{ width: '100%', fontSize: 16, padding: '14px' }} onClick={next}>
                Continue →
              </button>

              <div className="auth-divider"><span>or</span></div>

              <button className="auth-social-btn">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
            </div>

            <p className="auth-switch">
              Already have an account?{' '}
              <button className="auth-switch-link" onClick={() => navigate('/signin')}>Sign in</button>
            </p>
          </div>
        )}

        {/* ── Step 1: Country ── */}
        {step === 1 && (
          <div className="signup-step-content">
            <span className="signup-step-emoji">🌍</span>
            <h2 className="auth-title">Where are you from?</h2>
            <p className="auth-sub">We'll tailor your experience to your region</p>
            <div className="auth-form" style={{ marginTop: 28 }}>
              <div className="auth-field">
                <label className="auth-label">Country</label>
                <select
                  className="auth-input auth-select"
                  value={form.country}
                  onChange={e => setField('country', e.target.value)}
                >
                  <option value="">Select your country</option>
                  {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="signup-nav">
              <button className="btn btn-outline" onClick={back}>← Back</button>
              <button className="btn btn-gold" onClick={next}>Continue →</button>
            </div>
          </div>
        )}

        {/* ── Step 2: Goal ── */}
        {step === 2 && (
          <div className="signup-step-content">
            <span className="signup-step-emoji">🎯</span>
            <h2 className="auth-title">What is your main goal?</h2>
            <p className="auth-sub">Choose the one that fits you best</p>
            <div style={{ marginTop: 24, width: '100%' }}>
              <OptionsGrid options={GOALS} selected={form.goal} onSelect={v => setField('goal', v)} />
            </div>
            <div className="signup-nav">
              <button className="btn btn-outline" onClick={back}>← Back</button>
              <button className="btn btn-gold" onClick={next} disabled={!form.goal}>Continue →</button>
            </div>
          </div>
        )}

        {/* ── Step 3: Current progress ── */}
        {step === 3 && (
          <div className="signup-step-content">
            <span className="signup-step-emoji">📖</span>
            <h2 className="auth-title">What have you memorized so far?</h2>
            <p className="auth-sub">Be honest — there is no wrong answer</p>
            <div style={{ marginTop: 24, width: '100%' }}>
              <OptionsGrid options={MEMORIZED_OPTIONS} selected={form.memorized} onSelect={v => setField('memorized', v)} />
            </div>
            <div className="signup-nav">
              <button className="btn btn-outline" onClick={back}>← Back</button>
              <button className="btn btn-gold" onClick={next} disabled={!form.memorized}>Continue →</button>
            </div>
          </div>
        )}

        {/* ── Step 4: Features ── */}
        {step === 4 && (
          <div className="signup-step-content">
            <span className="signup-step-emoji">✨</span>
            <h2 className="auth-title">What matters most to you?</h2>
            <p className="auth-sub">Select everything that applies</p>
            <div style={{ marginTop: 24, width: '100%' }}>
              <OptionsGrid options={FEATURES_OPTIONS} selected={form.features} onSelect={toggleFeature} multi />
            </div>
            <div className="signup-nav">
              <button className="btn btn-outline" onClick={back}>← Back</button>
              <button className="btn btn-gold" onClick={next} disabled={form.features.length === 0}>Continue →</button>
            </div>
          </div>
        )}

        {/* ── Step 5: Where to start ── */}
        {step === 5 && (
          <div className="signup-step-content">
            <span className="signup-step-emoji">🧭</span>
            <h2 className="auth-title">Where do you want to start?</h2>
            <p className="auth-sub">We'll build your path from there</p>
            <div style={{ marginTop: 24, width: '100%' }}>
              <OptionsGrid options={START_OPTIONS} selected={form.startFrom} onSelect={v => setField('startFrom', v)} />
            </div>
            <div className="signup-nav">
              <button className="btn btn-outline" onClick={back}>← Back</button>
              <button className="btn btn-gold" onClick={next} disabled={!form.startFrom}>Continue →</button>
            </div>
          </div>
        )}

        {/* ── Step 6: Background ── */}
        {step === 6 && (
          <div className="signup-step-content">
            <span className="signup-step-emoji">🕌</span>
            <h2 className="auth-title">Have you studied the Quran before?</h2>
            <p className="auth-sub">This helps us personalize your lessons</p>
            <div style={{ marginTop: 24, width: '100%' }}>
              <OptionsGrid options={BACKGROUND_OPTIONS} selected={form.background} onSelect={v => setField('background', v)} />
            </div>
            <div className="signup-nav">
              <button className="btn btn-outline" onClick={back}>← Back</button>
              <button
                className="btn btn-gold"
                onClick={() => navigate('/')}
                disabled={!form.background}
              >
                Begin my journey →
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Side panel */}
      <div className="auth-side">
        <div className="auth-side-inner">
          <span className="auth-side-ar">{quote.ar}</span>
          <p className="auth-side-ref">{quote.ref}</p>
          <p className="auth-side-quote">"{quote.en}"</p>
          <div className="auth-side-stats">
            <div className="auth-side-stat">
              <span className="auth-side-stat-n">120K+</span>
              <span className="auth-side-stat-l">Learners worldwide</span>
            </div>
            <div className="auth-side-stat-divider" />
            <div className="auth-side-stat">
              <span className="auth-side-stat-n">114</span>
              <span className="auth-side-stat-l">Surahs available</span>
            </div>
            <div className="auth-side-stat-divider" />
            <div className="auth-side-stat">
              <span className="auth-side-stat-n">4.9★</span>
              <span className="auth-side-stat-l">App store rating</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
