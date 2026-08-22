'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const skills = [
  { label: 'AI Strategy', sub: 'LLM · Agents · Copilots', color: '#4facfe', shape: 'icosahedron', pos: [-5, 2, 0] as [number, number, number] },
  { label: 'Python', sub: 'FastAPI · Automation', color: '#00f2fe', shape: 'octahedron', pos: [5, 1, -2] as [number, number, number] },
  { label: 'TypeScript', sub: 'Next.js · React · Node', color: '#a78bfa', shape: 'dodecahedron', pos: [-4, -2, 3] as [number, number, number] },
  { label: 'Enterprise AI', sub: 'Transformation · ROI', color: '#34d399', shape: 'tetrahedron', pos: [4, -2, 2] as [number, number, number] },
  { label: 'Cloud & DevOps', sub: 'AWS · GCP · CF · Docker', color: '#f59e0b', shape: 'icosahedron', pos: [0, 3, -4] as [number, number, number] },
  { label: 'Data & BI', sub: 'Pipelines · Analytics', color: '#ec4899', shape: 'octahedron', pos: [0, -4, 1] as [number, number, number] },
];

type SkillItem = typeof skills[0];

function SkillObject({ skill, index }: { skill: SkillItem; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.3 + index;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5 + index * 0.7;
  });

  const geo = skill.shape === 'icosahedron'
    ? <icosahedronGeometry args={[0.8, 1]} />
    : skill.shape === 'octahedron'
    ? <octahedronGeometry args={[0.8]} />
    : skill.shape === 'dodecahedron'
    ? <dodecahedronGeometry args={[0.7]} />
    : <tetrahedronGeometry args={[0.9]} />;

  return (
    <Float speed={1.5 + index * 0.3} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={skill.pos}>
        {/* Wireframe shell */}
        <mesh ref={meshRef}>
          {geo}
          <meshBasicMaterial color={skill.color} wireframe transparent opacity={0.6} />
        </mesh>
        {/* Solid inner */}
        <mesh scale={0.85}>
          {geo}
          <meshBasicMaterial color={skill.color} transparent opacity={0.05} />
        </mesh>
        {/* Label */}
        <Text position={[0, -1.4, 0]} fontSize={0.3} color="#ffffff" anchorX="center" letterSpacing={0.1}>
          {skill.label}
        </Text>
        <Text position={[0, -1.8, 0]} fontSize={0.18} color={skill.color} anchorX="center" letterSpacing={0.05}>
          {skill.sub}
        </Text>
        {/* Glow point */}
        <pointLight color={skill.color} intensity={0.5} distance={4} />
      </group>
    </Float>
  );
}

export default function SceneSkills({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Text
        position={[0, 7, 0]}
        fontSize={0.5}
        color="#4facfe"
        anchorX="center"
        letterSpacing={0.3}
      >
        CAPABILITIES
      </Text>
      <Text
        position={[0, 6, 0]}
        fontSize={0.25}
        color="#ffffff"
        anchorX="center"
        letterSpacing={0.1}
        maxWidth={12}
        textAlign="center"
      >
        The tools I wield in the field
      </Text>
      {skills.map((skill, i) => (
        <SkillObject key={skill.label} skill={skill} index={i} />
      ))}
    </group>
  );
}
