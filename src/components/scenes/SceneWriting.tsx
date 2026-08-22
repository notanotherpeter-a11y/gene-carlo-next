'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const posts = [
  { title: 'ERP for a Chicken Business', category: 'Case Study', color: '#4facfe' },
  { title: 'Custom Software ROI', category: 'Insights', color: '#a78bfa' },
  { title: 'Cloudflare Workers Cron', category: 'Technical', color: '#34d399' },
  { title: 'AI Agents in Production', category: 'Deep Dive', color: '#f59e0b' },
  { title: 'Melbourne Tech Scene', category: 'Industry', color: '#ec4899' },
  { title: 'Prompt Engineering 101', category: 'Tutorial', color: '#00f2fe' },
];

type Post = typeof posts[0];

function HolographicPanel({ post, position, index }: { post: Post; position: [number, number, number]; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    (meshRef.current.material as THREE.MeshBasicMaterial).opacity =
      0.08 + Math.sin(state.clock.elapsedTime * 1.5 + index) * 0.02;
  });

  return (
    <Float speed={1 + index * 0.2} floatIntensity={0.4} rotationIntensity={0.1}>
      <group position={position}>
        {/* Panel */}
        <mesh ref={meshRef}>
          <planeGeometry args={[4, 2.5]} />
          <meshBasicMaterial color={post.color} transparent opacity={0.08} side={THREE.DoubleSide} />
        </mesh>
        {/* Border */}
        <mesh>
          <planeGeometry args={[4.02, 2.52]} />
          <meshBasicMaterial color={post.color} transparent opacity={0.3} wireframe />
        </mesh>
        {/* Text content */}
        <Text
          position={[0, 0.4, 0.01]}
          fontSize={0.28}
          color="#ffffff"
          anchorX="center"
          maxWidth={3.5}
          textAlign="center"
          letterSpacing={0.05}
        >
          {post.title}
        </Text>
        <Text
          position={[0, -0.5, 0.01]}
          fontSize={0.18}
          color={post.color}
          anchorX="center"
          letterSpacing={0.15}
        >
          {post.category}
        </Text>
        <pointLight color={post.color} intensity={0.3} distance={4} />
      </group>
    </Float>
  );
}

const positions: [number, number, number][] = [
  [-8, 3, 0], [-4, 3, -2], [0, 3, -1], [4, 3, -2], [8, 3, 0],
  [-4, -2, -1], [4, -2, -1],
];

export default function SceneWriting({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Text
        position={[0, 8, 0]}
        fontSize={0.5}
        color="#4facfe"
        anchorX="center"
        letterSpacing={0.3}
      >
        NOTES & WRITING
      </Text>
      {posts.map((post, i) => (
        <HolographicPanel
          key={post.title}
          post={post}
          position={positions[i] || [0, 0, 0]}
          index={i}
        />
      ))}
    </group>
  );
}
