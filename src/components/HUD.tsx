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
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setProgress(p);
      let current = sections[0].name;
      for (const s of sections) {
        if (p >= s.progress) current = s.name;
      }
      setCurrentSection(current);
      if (menuOpen) setMenuOpen(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  const scrollToProgress = (p: number) => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: total * p, behavior: 'smooth' });
    setMenuOpen(false);
  };

  const mono: React.CSSProperties = {
    fontFamily: 'var(--font-geist-mono, monospace)',
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 10, pointerEvents: 'none' }}>

      {/* Top left — logo */}
      <div style={{
        position: 'absolute', top: '1.1rem', left: '1.25rem',
      }}>
        <img src="/syntyx-logo.png" alt="Syntyx Labs" style={{ height: '32px', width: 'auto', opacity: 0.95 }} />
      </div>

      {/* ── DESKTOP nav ── */}
      {!isMobile && (
        <nav style={{
          position: 'absolute', top: '1.25rem', right: '1.5rem',
          display: 'flex', gap: '1.75rem', pointerEvents: 'all',
        }}>
          {sections.map((s) => (
            <button key={s.name} onClick={() => scrollToProgress(s.progress)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              ...mono, fontSize: '0.6rem',
              color: currentSection === s.name ? '#4facfe' : 'rgba(255,255,255,0.35)',
              transition: 'color 0.3s', padding: '0.25rem 0',
            }}>
              {s.name}
            </button>
          ))}
        </nav>
      )}

      {/* ── MOBILE hamburger button ── */}
      {isMobile && (
        <button
          onClick={() => setMenuOpen(o => !o)}
          style={{
            position: 'absolute', top: '0.9rem', right: '1.25rem',
            background: 'none', border: '1px solid rgba(79,172,254,0.3)',
            borderRadius: '6px', cursor: 'pointer', pointerEvents: 'all',
            padding: '0.4rem 0.6rem', color: 'rgba(255,255,255,0.7)',
            fontSize: '0.75rem', lineHeight: 1,
          }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      )}

      {/* ── MOBILE dropdown menu ── */}
      {isMobile && menuOpen && (
        <nav style={{
          position: 'absolute', top: '3rem', right: '1.25rem',
          background: 'rgba(2,4,8,0.92)',
          border: '1px solid rgba(79,172,254,0.2)',
          borderRadius: '8px',
          backdropFilter: 'blur(12px)',
          padding: '0.5rem 0',
          pointerEvents: 'all',
          minWidth: '130px',
        }}>
          {sections.map((s) => (
            <button key={s.name} onClick={() => scrollToProgress(s.progress)} style={{
              display: 'block', width: '100%', background: 'none', border: 'none',
              cursor: 'pointer', textAlign: 'left',
              padding: '0.6rem 1.25rem',
              ...mono, fontSize: '0.62rem',
              color: currentSection === s.name ? '#4facfe' : 'rgba(255,255,255,0.55)',
              transition: 'color 0.2s',
            }}>
              {s.name}
            </button>
          ))}
        </nav>
      )}

      {/* Bottom progress bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '2px', background: 'rgba(255,255,255,0.05)',
      }}>
        <div style={{
          height: '100%',
          background: 'linear-gradient(90deg, #4facfe, #00f2fe)',
          width: `${progress * 100}%`,
          transition: 'width 0.1s',
        }} />
      </div>

      {/* Bottom right — section label */}
      <div style={{
        position: 'absolute', bottom: '1.25rem', right: '1.25rem',
        ...mono, fontSize: '0.6rem',
        color: 'rgba(255,255,255,0.25)',
      }}>
        {currentSection}
      </div>

      {/* Scroll hint */}
      {progress < 0.02 && (
        <div style={{
          position: 'absolute', bottom: '3rem', left: '50%',
          transform: 'translateX(-50%)',
          ...mono, fontSize: '0.55rem',
          color: 'rgba(255,255,255,0.25)',
          animation: 'pulse 2s infinite',
          whiteSpace: 'nowrap',
        }}>
          Scroll to explore
        </div>
      )}
    </div>
  );
}
