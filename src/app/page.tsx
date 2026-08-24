'use client';
import dynamic from 'next/dynamic';
import HUD from '@/components/HUD';
import ChatWidget from '@/components/ChatWidget';

const World = dynamic(() => import('@/components/World'), { ssr: false });

export default function Home() {
  return (
    <div style={{ position: 'relative' }}>
      {/* Fixed canvas */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <World />
      </div>
      {/* Scroll proxy - gives the page scrollable height */}
      <div style={{ height: '700vh', position: 'relative', zIndex: 1, pointerEvents: 'none' }} />
      {/* HUD overlay */}
      <HUD />
      {/* Chat widget */}
      <ChatWidget />
    </div>
  );
}
