'use client';

import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

const chips = [
  { num: '01', label: 'Agentic Systems' },
  { num: '02', label: 'LLM Orchestration' },
  { num: '03', label: 'Automation' },
  { num: '04', label: 'Enterprise AI' },
];

export default function Hero() {
  const [clock, setClock] = useState('—');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const tick = () => {
      setClock(
        new Intl.DateTimeFormat('en-AU', {
          timeZone: 'Australia/Melbourne',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date())
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'var(--bg-primary)',
      }}
    >
      {/* R3F canvas background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <HeroScene />
      </div>

      {/* Subtle gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, var(--bg-primary) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '5rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '3rem',
            alignItems: 'center',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          {/* Left: text */}
          <div>
            {/* Status bar */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.3rem 0.9rem',
                background: 'rgba(47,129,247,0.1)',
                border: '1px solid rgba(47,129,247,0.25)',
                borderRadius: '20px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                letterSpacing: '0.1em',
                color: 'var(--text-secondary)',
                marginBottom: '2rem',
                textTransform: 'uppercase',
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent-emerald)', boxShadow: '0 0 8px var(--accent-emerald)', flexShrink: 0 }} />
              <span>STATUS OPEN</span>
              <span style={{ color: 'var(--text-muted)' }}>·</span>
              <span style={{ fontVariantNumeric: 'tabular-nums' }}>{clock}</span>
              <span style={{ color: 'var(--text-muted)' }}>·</span>
              <span>MELBOURNE, AU</span>
            </div>

            {/* Display name */}
            <h1
              style={{
                fontFamily: 'var(--font-geist-sans)',
                fontSize: 'clamp(3rem, 8vw, 6.5rem)',
                fontWeight: 900,
                color: 'var(--text-primary)',
                letterSpacing: '-0.045em',
                lineHeight: 0.95,
                marginBottom: '1rem',
                textTransform: 'uppercase',
              }}
            >
              <span style={{ display: 'block' }}>APPLIED AI</span>
              <span style={{ display: 'block', color: 'transparent', WebkitTextStroke: '1px var(--text-primary)' }}>
                ENGINEER
              </span>
            </h1>

            {/* Meta */}
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
                display: 'flex',
                gap: '1rem',
              }}
            >
              <span style={{ color: 'var(--accent-blue)' }}>[ INDEX / 00 ]</span>
              <span>Gene Carlo Gallardo</span>
            </div>

            <p
              style={{
                fontSize: '1.05rem',
                color: 'var(--text-secondary)',
                maxWidth: 520,
                marginBottom: '2rem',
                lineHeight: 1.7,
              }}
            >
              Enterprise AI Strategist &amp; Business Transformation Lead.
              I architect AI systems that drive measurable value at scale.
            </p>

            {/* Chips */}
            <ul
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', listStyle: 'none', marginBottom: '2.5rem' }}
            >
              {chips.map((c) => (
                <li
                  key={c.num}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.35rem 0.9rem',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <span style={{ color: 'var(--accent-blue)' }}>[ {c.num} ]</span>
                  {c.label}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#projects" className="btn btn-primary">View My Work →</a>
              <a href="#contact" className="btn btn-secondary">Get In Touch</a>
            </div>
          </div>

          {/* Right: portrait */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div
              style={{
                width: 260,
                height: 320,
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid var(--border)',
                position: 'relative',
                boxShadow: '0 0 60px rgba(47,129,247,0.15)',
              }}
            >
              {/* Glow ring */}
              <div
                style={{
                  position: 'absolute',
                  inset: -1,
                  borderRadius: 17,
                  background: 'linear-gradient(135deg, rgba(47,129,247,0.4), rgba(63,185,80,0.2), rgba(139,92,246,0.3))',
                  zIndex: 0,
                }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/gene-portrait.jpg"
                alt="Gene Carlo Gallardo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: '50% 22%',
                  position: 'relative',
                  zIndex: 1,
                  display: 'block',
                }}
              />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Scroll</span>
          <div
            style={{
              width: 1,
              height: 40,
              background: 'linear-gradient(to bottom, var(--accent-blue), transparent)',
              animation: 'scrollPulse 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.2); }
        }
        @media (max-width: 768px) {
          #hero > div > div { grid-template-columns: 1fr !important; }
          #hero > div > div > div:last-child { display: none; }
        }
      `}</style>
    </section>
  );
}
