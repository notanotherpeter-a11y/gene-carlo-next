'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

/* ─── Aurora shader material ─── */
const AuroraMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorA: new THREE.Color('#2F81F7'),
    uColorB: new THREE.Color('#3FB950'),
    uColorC: new THREE.Color('#8B5CF6'),
  },
  /* vertex */
  `varying vec2 vUv;
   void main() { vUv = uv; gl_Position = vec4(position, 1.0); }`,
  /* fragment */
  `precision highp float;
   varying vec2 vUv;
   uniform float uTime;
   uniform vec3 uColorA;
   uniform vec3 uColorB;
   uniform vec3 uColorC;

   vec2 hash2(vec2 p) {
     p = vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));
     return -1.0 + 2.0*fract(sin(p)*43758.5453);
   }
   float noise(vec2 p) {
     vec2 i=floor(p), f=fract(p);
     vec2 u=f*f*(3.0-2.0*f);
     return mix(mix(dot(hash2(i),f),dot(hash2(i+vec2(1,0)),f-vec2(1,0)),u.x),
                mix(dot(hash2(i+vec2(0,1)),f-vec2(0,1)),dot(hash2(i+vec2(1,1)),f-vec2(1,1)),u.x),u.y);
   }
   float fbm(vec2 p) {
     float v=0.0,a=0.5;
     for(int i=0;i<5;i++){v+=a*noise(p);p=p*2.0+vec2(1.7,9.2);a*=0.5;}
     return v;
   }
   void main() {
     vec2 uv = vUv;
     float t = uTime * 0.18;
     float n = fbm(uv * 2.5 + t * 0.4);
     float n2 = fbm(uv * 1.8 - t * 0.25 + vec2(3.1, 7.4));
     vec3 col = mix(uColorA, uColorB, clamp(n + 0.3, 0.0, 1.0));
     col = mix(col, uColorC, clamp(n2 * 0.6, 0.0, 1.0));
     float alpha = clamp((n + n2) * 0.22 + 0.05, 0.0, 0.35);
     gl_FragColor = vec4(col, alpha);
   }`
);
extend({ AuroraMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    auroraMaterial: any;
  }
}

/* ─── Aurora background plane ─── */
function Aurora() {
  const matRef = useRef<any>(null);
  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.uTime = clock.getElapsedTime();
  });
  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <auroraMaterial ref={matRef} transparent depthWrite={false} />
    </mesh>
  );
}

/* ─── Particle cloud ─── */
function Particles({ count = 800 }) {
  const ref = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 3.5;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 2.5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
    }
    return arr;
  }, [count]);

  useFrame(({ clock, pointer }) => {
    if (!ref.current) return;
    mouse.current.x += (pointer.x - mouse.current.x) * 0.05;
    mouse.current.y += (pointer.y - mouse.current.y) * 0.05;
    ref.current.rotation.y = clock.getElapsedTime() * 0.04 + mouse.current.x * 0.15;
    ref.current.rotation.x = clock.getElapsedTime() * 0.02 + mouse.current.y * 0.1;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#2F81F7"
        size={0.008}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

/* ─── Floating GC monogram ─── */
function GCMonogram() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.3 + pointer.x * 0.3;
    groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.15 + pointer.y * 0.2;
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.04;
  });

  return (
    <group ref={groupRef} position={[0.85, 0, 0]}>
      {/* G letter — torus arc */}
      <mesh>
        <torusGeometry args={[0.22, 0.025, 16, 40, Math.PI * 1.6]} />
        <meshStandardMaterial color="#2F81F7" emissive="#2F81F7" emissiveIntensity={0.6} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* G crossbar */}
      <mesh position={[0.1, -0.02, 0]}>
        <boxGeometry args={[0.1, 0.025, 0.025]} />
        <meshStandardMaterial color="#2F81F7" emissive="#2F81F7" emissiveIntensity={0.6} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* C letter — torus arc */}
      <mesh position={[-0.55, 0, 0]}>
        <torusGeometry args={[0.2, 0.025, 16, 40, Math.PI * 1.7]} />
        <meshStandardMaterial color="#3FB950" emissive="#3FB950" emissiveIntensity={0.6} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Ambient light for scene */}
      <pointLight color="#2F81F7" intensity={1.5} distance={2} />
    </group>
  );
}

/* ─── Exported canvas component ─── */
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 1.5], fov: 50 }}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.3} />
      <Aurora />
      <Particles count={800} />
      <GCMonogram />
    </Canvas>
  );
}
