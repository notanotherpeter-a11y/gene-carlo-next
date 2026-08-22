'use client';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Stars } from '@react-three/drei';
import CameraRig from './CameraRig';
import SceneHero from './scenes/SceneHero';
import SceneSkills from './scenes/SceneSkills';
import SceneProjects from './scenes/SceneProjects';
import SceneExperience from './scenes/SceneExperience';
import SceneWriting from './scenes/SceneWriting';
import SceneContact from './scenes/SceneContact';

export default function World() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      gl={{ antialias: true, alpha: false }}
      style={{ background: '#020408' }}
      dpr={[1, 2]}
    >
      <color attach="background" args={['#020408']} />
      <fog attach="fog" args={['#020408', 30, 200]} />
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 20, 0]} intensity={1} color="#4facfe" />
      <Stars radius={300} depth={60} count={4000} factor={4} fade speed={0.5} />
      <Suspense fallback={null}>
        <SceneHero position={[0, 0, 0]} />
        <SceneSkills position={[0, 0, -60]} />
        <SceneProjects position={[0, 0, -120]} />
        <SceneExperience position={[0, 0, -180]} />
        <SceneWriting position={[0, 0, -240]} />
        <SceneContact position={[0, 0, -300]} />
      </Suspense>
      <CameraRig />
    </Canvas>
  );
}
