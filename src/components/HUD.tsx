'use client';
import { useEffect, useState } from 'react';

const sections = [
  { name: 'Home', progress: 0 },
  { name: 'Skills', progress: 0.22 },
  { name: 'Projects', progress: 0.42 },
  { name: 'Experience', progress: 0.62 },
  { name: 'Writing', progress: 0.78 },
  { name: 'Contact', progress: 0.92 },
];

export default function HUD() {
  const [progress, setProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState('Home');

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setProgress(p);
      // Determine current section
      let current = sections[0].name;
      for (const s of sections) {
        if (p >= s.progress) current = s.name;
      }
      setCurrentSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToProgress = (p: number) => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: total * p, behavior: 'smooth' });
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 10, pointerEvents: 'none' }}>
      {/* Top left */}
      <div style={{
        position: 'absolute', top: '1.5rem', left: '2rem',
        fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.7rem',
        color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em',
        textTransform: 'uppercase',
      }}>
        GCG · APPLIED AI
      </div>

      {/* Top right nav */}
      <nav style={{
        position: 'absolute', top: '1.5rem', right: '2rem',
        display: 'flex', gap: '2rem', pointerEvents: 'all',
      }}>
        {sections.map((s) => (
          <button
            key={s.name}
            onClick={() => scrollToProgress(s.progress)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.65rem',
              color: currentSection === s.name ? '#4facfe' : 'rgba(255,255,255,0.4)',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              transition: 'color 0.3s',
              padding: '0.25rem 0',
            }}
          >
            {s.name}
          </button>
        ))}
      </nav>

      {/* Bottom progress bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '2px', background: 'rgba(255,255,255,0.05)',
      }}>
        <div style={{
          height: '100%', background: 'linear-gradient(90deg, #4facfe, #00f2fe)',
          width: `${progress * 100}%`, transition: 'width 0.1s',
        }} />
      </div>

      {/* Bottom right section name */}
      <div style={{
        position: 'absolute', bottom: '1.5rem', right: '2rem',
        fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.65rem',
        color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase',
      }}>
        {currentSection}
      </div>

      {/* Scroll hint (only at top) */}
      {progress < 0.02 && (
        <div style={{
          position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)',
          fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.6rem',
          color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em',
          textTransform: 'uppercase', animation: 'pulse 2s infinite',
        }}>
          Scroll to explore
        </div>
      )}
    </div>
  );
}
