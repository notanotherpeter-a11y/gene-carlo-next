'use client';

const groups = [
  {
    title: 'AI Strategy & Enterprise Transformation',
    pills: ['AI Strategy Development', 'Enterprise AI Architecture', 'Business Process Transformation', 'AI Copilot Development', 'LLM Integration', 'Conversational AI', 'Agent Orchestration', 'AI ROI Measurement'],
  },
  {
    title: 'Software & Systems Development',
    pills: ['Python', 'TypeScript', 'Mobile App Dev', 'Web App Dev', 'REST APIs', 'UI/UX Design', 'Multi-user Platforms', 'Admin Dashboards', 'Data Pipelines', 'System Architecture', 'Docker', 'AWS/GCP'],
  },
  {
    title: 'Strategic Leadership & Business Transformation',
    pills: ['Digital Transformation Strategy', 'AI Business Case Development', 'Cross-functional Team Leadership', 'Stakeholder Management', 'Change Management', 'Process Optimization', 'Business Intelligence', 'Enterprise Integration', 'AI Governance'],
  },
];

export default function Skills() {
  return (
    <section id="skills" style={{ padding: '6rem 0', background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-label">[ 02 ] Skills</div>
        <h2 className="section-title">What I Bring</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {groups.map((g) => (
            <div key={g.title}>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-blue)', marginBottom: '1rem' }}>
                {g.title}
              </h3>
              <div className="skill-group-inner" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {g.pills.map((p) => (
                  <span
                    key={p}
                    style={{
                      padding: '0.35rem 0.85rem',
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      fontSize: '0.82rem',
                      color: 'var(--text-secondary)',
                      transition: 'border-color 0.2s, color 0.2s',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-blue)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
