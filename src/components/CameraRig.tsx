'use client';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Camera path control points
const CAMERA_POINTS = [
  [0, 2, 12],
  [0, 1, 6],
  [0, 0, 0],      // Hero center
  [3, 1, -30],
  [0, 2, -55],
  [0, 0, -65],    // Skills
  [-4, -1, -90],
  [0, 1, -115],
  [0, 0, -125],   // Projects
  [4, 2, -150],
  [0, 0, -175],
  [0, 0, -185],   // Experience
  [-3, 1, -210],
  [0, 0, -235],
  [0, 0, -245],   // Writing
  [2, -1, -270],
  [0, 0, -295],
  [0, 0, -305],   // Contact
].map(([x, y, z]) => new THREE.Vector3(x, y, z));

const LOOKAT_POINTS = [
  [0, 0, 4],
  [0, 0, 0],
  [0, 0, -10],
  [0, 0, -40],
  [0, 0, -60],
  [0, 0, -70],
  [0, 0, -100],
  [0, 0, -120],
  [0, 0, -130],
  [0, 0, -160],
  [0, 0, -180],
  [0, 0, -190],
  [0, 0, -220],
  [0, 0, -240],
  [0, 0, -250],
  [0, 0, -280],
  [0, 0, -300],
  [0, 0, -310],
].map(([x, y, z]) => new THREE.Vector3(x, y, z));

const camCurve = new THREE.CatmullRomCurve3(CAMERA_POINTS, false, 'catmullrom', 0.5);
const lookCurve = new THREE.CatmullRomCurve3(LOOKAT_POINTS, false, 'catmullrom', 0.5);

export default function CameraRig() {
  const { camera } = useThree();
  const progress = useRef(0);
  const targetProgress = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      targetProgress.current = Math.max(0, Math.min(1, scrolled / total));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useFrame(() => {
    // Smooth lerp
    progress.current += (targetProgress.current - progress.current) * 0.05;
    const t = progress.current;

    const camPos = camCurve.getPointAt(t);
    const lookAt = lookCurve.getPointAt(t);

    camera.position.lerp(camPos, 0.1);
    const target = new THREE.Vector3();
    target.copy(lookAt);
    camera.lookAt(target);
  });

  return null;
}
