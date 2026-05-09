export default function ContentDemoSection() {
  return (
    <section className="preview-section">
      <div className="section-header">
        <h2 className="section-title">Experience the journey</h2>
        <p className="section-sub">
          A glimpse of how Miqra'ati guides you — lesson by lesson, ayah by ayah — through the Quran.
        </p>
      </div>

      <div style={{
        width: '100%',
        maxWidth: 700,
        margin: '0 auto',
        height: 320,
        background: '#164e55',
        borderRadius: 20,
      }} />

      <p className="preview-label">
        Color-coded Tajweed markup · Structured lesson path · Expert reciter audio
      </p>

      <div style={{ textAlign: 'center', marginTop: 28 }}>
        <button className="btn btn-primary">
          Explore all 114 Surahs →
        </button>
      </div>
    </section>
  );
}