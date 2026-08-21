'use client';

const timeline = [
  {
    role: 'Founder & Chief AI Strategist',
    company: 'Syntyx Labs Pty Ltd',
    location: 'Melbourne, VIC',
    period: '2022 – Present',
    points: [
      'Lead AI transformation initiatives for 5+ enterprise clients, delivering measurable business value and operational efficiency gains',
      'Architect and deploy autonomous AI systems including conversational agents, intelligent automation platforms, and business intelligence solutions',
      'Develop AI strategies that align technical capabilities with business objectives, ensuring sustainable ROI and competitive advantage',
    ],
  },
  {
    role: 'Logistics Coordinator and Client Relations',
    company: 'Enterprise Logistics Solutions',
    location: 'Melbourne, VIC',
    period: '2019 – Present',
    points: [
      'Coordinate complex logistics operations and supply chain management',
      'Manage client relationships and communication workflows',
      'Optimize operational processes through systematic analysis and improvement',
    ],
  },
  {
    role: 'Real Estate Sales Manager',
    company: 'Goshen Land Capital Realty and Development',
    location: 'Philippines',
    period: '2012 – 2018',
    points: [
      'Managed sales team and developed client acquisition strategies',
      'Built and maintained client relationships across property development projects',
      'Achieved consistent sales targets through systematic process optimization',
    ],
  },
  {
    role: 'Financial Adviser',
    company: 'AXA Philippines and Philam Life Insurance',
    location: 'Philippines',
    period: '2010 – 2012',
    points: [
      'Provided financial planning and insurance consultation services',
      'Developed comprehensive financial strategies for individual and corporate clients',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" style={{ padding: '6rem 0', background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-label">[ 05 ] Experience</div>
        <h2 className="section-title">Work History</h2>
        <div style={{ position: 'relative', marginTop: '2.5rem', paddingLeft: '2rem' }}>
          {/* Vertical line */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 1, background: 'var(--border)' }} />
          <div className="scroll-stagger" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {timeline.map((item, i) => (
              <div key={i} style={{ position: 'relative' }}>
                {/* Dot */}
                <div style={{ position: 'absolute', left: '-2.375rem', top: '0.4rem', width: 10, height: 10, borderRadius: '50%', background: 'var(--accent-blue)', border: '2px solid var(--bg-secondary)', boxShadow: '0 0 10px rgba(47,129,247,0.5)' }} />
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>{item.period}</div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{item.role}</h3>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  {item.company} · {item.location}
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {item.points.map((pt, j) => (
                    <li key={j} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      <span style={{ color: 'var(--accent-blue)', flexShrink: 0, marginTop: '0.15rem' }}>→</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
