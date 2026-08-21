'use client';

const projects = [
  { num: '01', title: 'Enterprise AI Transformation: Multi-Business Automation Platform', desc: 'Led AI transformation for 5+ businesses simultaneously, deploying autonomous agents that handle customer service, lead generation, and business intelligence across diverse industries.', tags: ['Enterprise AI', 'Multi-Tenant Architecture', 'AI Strategy'], status: 'Deployed' },
  { num: '02', title: '3000 Auto Spa: On-Demand Service Marketplace', desc: 'A complete on-demand mobile detailing platform connecting customers and service providers, with centralised admin dashboard and intelligent routing.', tags: ['Mobile Apps', 'Admin Dashboard', 'Real-time Routing'], status: 'Built' },
  { num: '03', title: 'Autonomous AI Customer Service Agent', desc: 'An intelligent AI agent that handles inbound enquiries, books appointments, and manages follow-up communications across multiple business contexts.', tags: ['LLM APIs', 'Conversational AI', 'Multi-client'], status: 'Deployed' },
  { num: '04', title: 'Tax and Invoice Management System', desc: 'A smart financial platform for small business invoicing, GST tracking, and automated reporting with document parsing and data extraction.', tags: ['Financial Systems', 'Document Parsing', 'Automation'], status: 'Deployed' },
  { num: '05', title: 'Lead Generation and Directory Engine', desc: 'An automated pipeline that harvests structured business intelligence from public directories at scale, with deduplication and CRM-ready output.', tags: ['Data Pipelines', 'Automation', 'CRM Integration'], status: 'Deployed' },
  { num: '06', title: 'Syntyx Labs: AI SaaS Product Studio', desc: "Gene's software studio, building, testing, and delivering AI-powered tools and automation platforms for small and medium businesses.", tags: ['Full Stack', 'AI Products', 'SaaS'], status: 'Active' },
];

const statusColor: Record<string, string> = {
  Deployed: 'var(--accent-emerald)',
  Built: 'var(--accent-blue)',
  Active: 'var(--accent-amber)',
};

export default function Projects() {
  return (
    <section id="projects" style={{ padding: '6rem 0', background: 'var(--bg-primary)' }}>
      <div className="container">
        <div className="section-label">[ 04 ] Projects</div>
        <h2 className="section-title">Selected Work</h2>
        <div className="scroll-stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem', marginTop: '2rem' }}>
          {projects.map((p) => (
            <div
              key={p.num}
              style={{
                padding: '1.75rem',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                transition: 'border-color 0.2s, transform 0.2s',
                cursor: 'default',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-blue)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.4 }}>{p.title}</h3>
                <span style={{ flexShrink: 0, padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.7rem', fontFamily: 'var(--font-mono)', background: `${statusColor[p.status]}20`, color: statusColor[p.status], border: `1px solid ${statusColor[p.status]}40` }}>
                  {p.status}
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{p.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: 'auto' }}>
                {p.tags.map((t) => (
                  <span key={t} className="tech-chip">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
