'use client';

export default function Contact() {
  return (
    <section id="contact" style={{ padding: '6rem 0', background: 'var(--bg-primary)' }}>
      <div className="container">
        <div className="section-label">[ 07 ] Contact</div>
        <h2 className="section-title">Let's Build Something</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 560, marginBottom: '3rem', lineHeight: 1.7 }}>
          Open to AI strategy, automation, and custom software projects. Reach out — I respond within 24 hours.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
          {/* Form */}
          <form
            action="https://formspree.io/f/your-form-id"
            method="POST"
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            {['Name', 'Email'].map((label) => (
              <input
                key={label}
                type={label === 'Email' ? 'email' : 'text'}
                name={label.toLowerCase()}
                placeholder={label}
                required
                style={{
                  padding: '0.85rem 1rem',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  fontFamily: 'inherit',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent-blue)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
              />
            ))}
            <select
              name="subject"
              required
              style={{ padding: '0.85rem 1rem', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text-secondary)', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit' }}
            >
              <option value="">Select Subject</option>
              <option value="AI Project">AI Project</option>
              <option value="Automation">Automation</option>
              <option value="Web App">Web App</option>
              <option value="General">General</option>
            </select>
            <textarea
              name="message"
              placeholder="Message"
              rows={6}
              required
              style={{ padding: '0.85rem 1rem', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '0.9rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit', transition: 'border-color 0.2s' }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent-blue)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
            />
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Send Message →
            </button>
          </form>

          {/* Contact info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { label: 'Email', value: 'genecarlogallardo@gmail.com', href: 'mailto:genecarlogallardo@gmail.com' },
              { label: 'Phone', value: '0420 418 888', href: 'tel:+61420418888' },
              { label: 'Location', value: 'Melbourne, VIC, Australia', href: null },
            ].map((item) => (
              <div key={item.label}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent-blue)', marginBottom: '0.35rem' }}>
                  {item.label}
                </div>
                {item.href ? (
                  <a href={item.href} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--accent-blue)')}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--text-primary)')}
                  >
                    {item.value}
                  </a>
                ) : (
                  <span style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>{item.value}</span>
                )}
              </div>
            ))}
            <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
              <a
                href="https://linkedin.com/in/gene-carlo-gallardo"
                target="_blank"
                rel="noopener"
                className="btn btn-secondary"
                style={{ width: 'fit-content' }}
              >
                💼 LinkedIn Profile
              </a>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          #contact > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
