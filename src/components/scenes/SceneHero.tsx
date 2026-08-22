'use client';
import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const COUNT = 2500;

function generateSpherePositions(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = radius * (0.8 + Math.random() * 0.4);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

function generateScatterPositions(count: number, range: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * range;
    positions[i * 3 + 1] = (Math.random() - 0.5) * range;
    positions[i * 3 + 2] = (Math.random() - 0.5) * range;
  }
  return positions;
}

export default function SceneHero({ position }: { position: [number, number, number] }) {
  const pointsRef = useRef<THREE.Points>(null);
  const assembleProgress = useRef(0);
  const time = useRef(0);

  const { scattered, sphere, colors } = useMemo(() => {
    const scattered = generateScatterPositions(COUNT, 20);
    const sphere = generateSpherePositions(COUNT, 3);
    const colors = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      // Blue to cyan gradient
      colors[i * 3] = 0.2 + Math.random() * 0.3;
      colors[i * 3 + 1] = 0.6 + Math.random() * 0.4;
      colors[i * 3 + 2] = 1.0;
    }
    return { scattered, sphere, colors };
  }, []);

  const currentPositions = useMemo(() => new Float32Array(COUNT * 3), []);

  // Start assembling on mount
  useEffect(() => {
    // Copy scatter to current
    currentPositions.set(scattered);
    // Animate assembly over 3 seconds
    let start: number | null = null;
    const duration = 3000;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const t = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      assembleProgress.current = ease;
      if (t < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [currentPositions, scattered]);

  useFrame(() => {
    if (!pointsRef.current) return;
    time.current += 0.005;
    const p = assembleProgress.current;
    const geo = pointsRef.current.geometry;
    const pos = geo.attributes.position.array as Float32Array;

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      // Lerp from scatter to sphere
      pos[i3]     = scattered[i3]     + (sphere[i3]     - scattered[i3])     * p;
      pos[i3 + 1] = scattered[i3 + 1] + (sphere[i3 + 1] - scattered[i3 + 1]) * p + Math.sin(time.current * 2 + i * 0.01) * 0.02 * p;
      pos[i3 + 2] = scattered[i3 + 2] + (sphere[i3 + 2] - scattered[i3 + 2]) * p;
    }
    geo.attributes.position.needsUpdate = true;
    // Slowly rotate the core
    pointsRef.current.rotation.y = time.current * 0.3;
  });

  return (
    <group position={position}>
      {/* Particle core */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(COUNT * 3), 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Glow sphere behind particles */}
      <mesh>
        <sphereGeometry args={[2.8, 32, 32]} />
        <meshBasicMaterial color="#0a4fff" transparent opacity={0.03} />
      </mesh>

      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshBasicMaterial color="#4facfe" transparent opacity={0.06} />
      </mesh>

      {/* Text — name */}
      <Text
        position={[0, -5, 0]}
        fontSize={0.6}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.12}
        maxWidth={7}
        textAlign="center"
      >
        GENE CARLO GALLARDO
      </Text>
      <Text
        position={[0, -6.0, 0]}
        fontSize={0.28}
        color="#4facfe"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.15}
        maxWidth={7}
        textAlign="center"
      >
        APPLIED AI ENGINEER · MELBOURNE
      </Text>

      {/* Orbital ring */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.1}>
        <mesh rotation={[Math.PI / 2 + 0.3, 0.3, 0]}>
          <torusGeometry args={[4, 0.01, 8, 128]} />
          <meshBasicMaterial color="#4facfe" transparent opacity={0.3} />
        </mesh>
        <mesh rotation={[Math.PI / 2 - 0.5, 0.8, 0.5]}>
          <torusGeometry args={[3.5, 0.008, 8, 128]} />
          <meshBasicMaterial color="#00f2fe" transparent opacity={0.2} />
        </mesh>
      </Float>
    </group>
  );
}
