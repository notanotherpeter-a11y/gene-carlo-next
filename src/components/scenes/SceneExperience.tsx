'use client';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const timeline = [
  { role: 'Founder & Chief AI Strategist', company: 'Syntyx Labs', period: '2022–Present', color: '#4facfe', pos: [-8, 4, 0] as [number, number, number] },
  { role: 'Logistics Coordinator', company: 'Enterprise Logistics', period: '2019–Present', color: '#34d399', pos: [-3, 1, -3] as [number, number, number] },
  { role: 'Real Estate Sales Manager', company: 'Goshen Land Capital', period: '2012–2018', color: '#a78bfa', pos: [3, -1, -1] as [number, number, number] },
  { role: 'Financial Adviser', company: 'AXA Philippines', period: '2010–2012', color: '#f59e0b', pos: [8, -3, -2] as [number, number, number] },
];

function PathTube() {
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      timeline.map(t => new THREE.Vector3(...t.pos))
    );
  }, []);

  const tubeRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!tubeRef.current) return;
    (tubeRef.current.material as THREE.MeshBasicMaterial).opacity =
      0.4 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
  });

  return (
    <mesh ref={tubeRef}>
      <tubeGeometry args={[curve, 64, 0.04, 8, false]} />
      <meshBasicMaterial color="#4facfe" transparent opacity={0.5} />
    </mesh>
  );
}

export default function SceneExperience({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Text
        position={[0, 8, 0]}
        fontSize={0.5}
        color="#4facfe"
        anchorX="center"
        letterSpacing={0.3}
      >
        WORK HISTORY
      </Text>
      <PathTube />
      {timeline.map((item) => (
        <Float key={item.company} speed={1} floatIntensity={0.3}>
          <group position={item.pos}>
            {/* Node sphere */}
            <mesh>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshBasicMaterial color={item.color} />
            </mesh>
            <pointLight color={item.color} intensity={1} distance={5} />
            {/* Card */}
            <Text
              position={[0, 1.2, 0]}
              fontSize={0.28}
              color="#ffffff"
              anchorX="center"
              letterSpacing={0.05}
              maxWidth={6}
              textAlign="center"
            >
              {item.role}
            </Text>
            <Text
              position={[0, 0.7, 0]}
              fontSize={0.2}
              color={item.color}
              anchorX="center"
              letterSpacing={0.1}
            >
              {item.company}
            </Text>
            <Text
              position={[0, 0.3, 0]}
              fontSize={0.16}
              color="#888888"
              anchorX="center"
              letterSpacing={0.05}
            >
              {item.period}
            </Text>
          </group>
        </Float>
      ))}
    </group>
  );
}
