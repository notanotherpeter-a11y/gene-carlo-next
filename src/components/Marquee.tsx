'use client';

const items = ['Claude', 'Python', 'LangChain', 'n8n', 'OpenAI', 'Agentic Systems', 'Next.js', 'Supabase', 'Vector DBs', 'Automation', 'FastAPI', 'Playwright'];

export default function Marquee() {
  const doubled = [...items, ...items];
  return (
    <section
      aria-label="Tech stack"
      style={{
        overflow: 'hidden',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '1rem 0',
        background: 'var(--bg-secondary)',
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          display: 'flex',
          gap: '2rem',
          whiteSpace: 'nowrap',
          animation: 'marquee 45s linear infinite',
          width: 'max-content',
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '2rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {item}
            </span>
            <span style={{ color: 'var(--accent-blue)', fontSize: '0.5rem' }}>✦</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
