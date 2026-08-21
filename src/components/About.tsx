'use client';

const facts = [
  { icon: '🌏', title: 'Based in Melbourne', sub: 'Victoria, Australia' },
  { icon: '🏢', title: 'Founder', sub: 'Syntyx Labs Pty Ltd' },
  { icon: '⚡', title: '15+ Years', sub: 'Cross-domain experience' },
  { icon: '🌐', title: 'Languages', sub: 'English & Filipino' },
];

export default function About() {
  return (
    <section id="about" style={{ padding: '6rem 0', background: 'var(--bg-primary)' }}>
      <div className="container">
        <div className="section-label">[ 01 ] About</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
          <div>
            <h2 className="section-title">Applied AI Engineer & Enterprise Strategist</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
              I'm an Applied AI Engineer and Enterprise AI Strategist based in Melbourne, Australia.
              As founder of Syntyx Labs Pty Ltd, I architect AI transformation initiatives that bridge
              technical innovation with strategic business value. My 15+ years across logistics,
              healthcare, finance, and real estate provides deep operational insight into where AI
              creates genuine competitive advantage.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="/cv.pdf" download className="btn btn-primary">Download CV</a>
              <a href="https://linkedin.com/in/gene-carlo-gallardo" className="btn btn-secondary" target="_blank" rel="noopener">LinkedIn Profile</a>
            </div>
          </div>
          <div className="scroll-stagger" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {facts.map((f) => (
              <div
                key={f.title}
                style={{
                  padding: '1.25rem',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  display: 'flex',
                  gap: '0.75rem',
                  alignItems: 'flex-start',
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{f.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>{f.title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{f.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          #about > div > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
