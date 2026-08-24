'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTED = [
  'What does Gene Carlo do?',
  'What projects has he built?',
  'How can I hire him?',
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm Gene Carlo's AI assistant. Ask me anything about his work, skills, or how to get in touch. 👋" },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuggested, setShowSuggested] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [open, messages]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    setShowSuggested(false);
    const userMsg: Message = { role: 'user', content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.map(m => ({ role: m.role, content: m.content })) }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply || data.error || 'Sorry, something went wrong.' }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Bubble button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Open chat"
        style={{
          position: 'fixed',
          bottom: '1.75rem',
          right: '1.75rem',
          zIndex: 1000,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'var(--accent-blue)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(47,129,247,0.45)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          fontSize: '1.35rem',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {open ? '✕' : '💬'}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: '5.5rem',
            right: '1.75rem',
            zIndex: 999,
            width: 360,
            maxWidth: 'calc(100vw - 2rem)',
            background: 'var(--bg-primary)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.45)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            maxHeight: '70vh',
          }}
        >
          {/* Header */}
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>🤖</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>GCG Assistant</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>● Online</div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div
                  style={{
                    maxWidth: '82%',
                    padding: '0.65rem 0.9rem',
                    borderRadius: m.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                    background: m.role === 'user' ? 'var(--accent-blue)' : 'var(--bg-secondary)',
                    color: m.role === 'user' ? '#fff' : 'var(--text-primary)',
                    fontSize: '0.85rem',
                    lineHeight: 1.55,
                    border: m.role === 'assistant' ? '1px solid var(--border)' : 'none',
                  }}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ padding: '0.65rem 0.9rem', borderRadius: '12px 12px 12px 2px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <span style={{ animation: 'pulse 1.2s infinite' }}>Thinking…</span>
                </div>
              </div>
            )}

            {/* Suggested questions */}
            {showSuggested && messages.length === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.25rem' }}>
                {SUGGESTED.map(q => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    style={{
                      textAlign: 'left',
                      padding: '0.5rem 0.75rem',
                      background: 'transparent',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      color: 'var(--text-secondary)',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      transition: 'border-color 0.2s, color 0.2s',
                      fontFamily: 'inherit',
                    }}
                    onMouseEnter={e => { (e.currentTarget.style.borderColor = 'var(--accent-blue)'); (e.currentTarget.style.color = 'var(--text-primary)'); }}
                    onMouseLeave={e => { (e.currentTarget.style.borderColor = 'var(--border)'); (e.currentTarget.style.color = 'var(--text-secondary)'); }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '0.75rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '0.5rem', background: 'var(--bg-secondary)' }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send(input)}
              placeholder="Ask me anything…"
              disabled={loading}
              style={{
                flex: 1,
                padding: '0.6rem 0.85rem',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                outline: 'none',
                fontFamily: 'inherit',
              }}
            />
            <button
              onClick={() => send(input)}
              disabled={loading || !input.trim()}
              style={{
                padding: '0.6rem 1rem',
                background: 'var(--accent-blue)',
                border: 'none',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '0.85rem',
                cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                opacity: loading || !input.trim() ? 0.5 : 1,
                transition: 'opacity 0.2s',
                fontFamily: 'inherit',
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </>
  );
}
