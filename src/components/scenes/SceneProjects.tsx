'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const projects = [
  { title: 'Enterprise AI\nTransformation', tag: 'Deployed', color: '#4facfe', x: -12, z: 0 },
  { title: '3000 Auto Spa\nMarketplace', tag: 'Built', color: '#a78bfa', x: -6, z: -2 },
  { title: 'AI Customer\nService Agent', tag: 'Deployed', color: '#34d399', x: 0, z: -1 },
  { title: 'Tax & Invoice\nPlatform', tag: 'Deployed', color: '#f59e0b', x: 6, z: -2 },
  { title: 'Lead Generation\nEngine', tag: 'Deployed', color: '#ec4899', x: 12, z: 0 },
  { title: 'Syntyx Labs\nAI Studio', tag: 'Active', color: '#00f2fe', x: 0, z: 8 },
];

type Project = typeof projects[0];

function Monolith({ project, index }: { project: Project; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2 + index) * 0.05;
  });

  return (
    <Float speed={0.8} floatIntensity={0.3} rotationIntensity={0.05}>
      <group position={[project.x, 0, project.z]}>
        {/* Glass monolith — lightweight material, mobile safe */}
        <mesh ref={meshRef}>
          <boxGeometry args={[2.5, 8, 0.4]} />
          <meshPhysicalMaterial
            color={project.color}
            transparent
            opacity={0.12}
            roughness={0.05}
            metalness={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Edge glow */}
        <mesh>
          <boxGeometry args={[2.52, 8.02, 0.42]} />
          <meshBasicMaterial color={project.color} transparent opacity={0.1} wireframe />
        </mesh>
        {/* Project title inside monolith */}
        <Text
          position={[0, 0, 0.3]}
          fontSize={0.28}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.2}
          textAlign="center"
          letterSpacing={0.05}
        >
          {project.title}
        </Text>
        {/* Status tag */}
        <Text
          position={[0, -2.5, 0.3]}
          fontSize={0.18}
          color={project.color}
          anchorX="center"
          letterSpacing={0.15}
        >
          {project.tag}
        </Text>
        {/* Bottom glow */}
        <pointLight position={[0, -5, 0]} color={project.color} intensity={0.8} distance={6} />
      </group>
    </Float>
  );
}

export default function SceneProjects({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Text
        position={[0, 8, 0]}
        fontSize={0.5}
        color="#4facfe"
        anchorX="center"
        letterSpacing={0.3}
      >
        SELECTED WORK
      </Text>
      {projects.map((p, i) => (
        <Monolith key={p.title} project={p} index={i} />
      ))}
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
        <planeGeometry args={[60, 30]} />
        <meshBasicMaterial color="#020408" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}
