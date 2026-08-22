'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const COUNT = 2000;

export default function SceneContact({ position }: { position: [number, number, number] }) {
  const pointsRef = useRef<THREE.Points>(null);
  const time = useRef(0);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 * (0.7 + Math.random() * 0.6);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      // Warm gold/teal palette for contact
      colors[i * 3] = 0.3 + Math.random() * 0.4;
      colors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
      colors[i * 3 + 2] = 0.6 + Math.random() * 0.4;
    }
    return { positions, colors };
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    time.current += 0.004;
    pointsRef.current.rotation.y = time.current * 0.4;
    pointsRef.current.rotation.x = Math.sin(time.current * 0.3) * 0.1;
  });

  return (
    <group position={position}>
      {/* Reformed particle core */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* The question */}
      <Text
        position={[0, -5.5, 0]}
        fontSize={0.6}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={14}
        textAlign="center"
        letterSpacing={0.05}
      >
        What shall we build together?
      </Text>
      <Text
        position={[0, -7, 0]}
        fontSize={0.25}
        color="#4facfe"
        anchorX="center"
        letterSpacing={0.1}
      >
        syntyxlabs@gmail.com
      </Text>
      <Text
        position={[0, -7.6, 0]}
        fontSize={0.2}
        color="#666666"
        anchorX="center"
        letterSpacing={0.15}
      >
        MELBOURNE, AUSTRALIA
      </Text>

      {/* Orbital ring */}
      <Float speed={0.8} rotationIntensity={0.3}>
        <mesh rotation={[Math.PI / 2 + 0.5, 0, 0]}>
          <torusGeometry args={[5, 0.015, 8, 200]} />
          <meshBasicMaterial color="#34d399" transparent opacity={0.4} />
        </mesh>
      </Float>
    </group>
  );
}
