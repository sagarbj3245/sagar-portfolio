"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const GALAXY_COUNT = 6500;
const STAR_COUNT = 1100;
const BRANCHES = 4;
const RADIUS = 5.5;
const SPIN = 1.1;
const RANDOMNESS = 0.42;
const RANDOM_POWER = 2.6;

const INSIDE_COLOR = "#eabe7c"; // amber core
const MID_COLOR = "#c98f5a";
const OUTSIDE_COLOR = "#23967f"; // teal rim

function Galaxy() {
  const group = useRef<THREE.Group>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(GALAXY_COUNT * 3);
    const col = new Float32Array(GALAXY_COUNT * 3);
    const inside = new THREE.Color(INSIDE_COLOR);
    const mid = new THREE.Color(MID_COLOR);
    const outside = new THREE.Color(OUTSIDE_COLOR);

    for (let i = 0; i < GALAXY_COUNT; i++) {
      const radius = Math.pow(Math.random(), 1.4) * RADIUS;
      const branchAngle = ((i % BRANCHES) / BRANCHES) * Math.PI * 2;
      const spinAngle = radius * SPIN;

      const randX =
        Math.pow(Math.random(), RANDOM_POWER) * (Math.random() < 0.5 ? 1 : -1) * RANDOMNESS * radius;
      const randY =
        Math.pow(Math.random(), RANDOM_POWER) * (Math.random() < 0.5 ? 1 : -1) * RANDOMNESS * radius * 0.35;
      const randZ =
        Math.pow(Math.random(), RANDOM_POWER) * (Math.random() < 0.5 ? 1 : -1) * RANDOMNESS * radius;

      pos[i * 3] = Math.cos(branchAngle + spinAngle) * radius + randX;
      pos[i * 3 + 1] = randY;
      pos[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randZ;

      const t = radius / RADIUS;
      const c = t < 0.5 ? inside.clone().lerp(mid, t * 2) : mid.clone().lerp(outside, (t - 0.5) * 2);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  const starPositions = useMemo(() => {
    const arr = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += delta * 0.035;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -0.55 + state.pointer.y * 0.1, 0.04);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, -state.pointer.x * 0.07, 0.04);
  });

  return (
    <>
      <group ref={group} position={[1.6, 0.4, 0]}>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.032}
            vertexColors
            transparent
            opacity={0.85}
            sizeAttenuation
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#8a8a92"
          transparent
          opacity={0.5}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </>
  );
}

export default function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 1.2, 7], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
    >
      <Galaxy />
    </Canvas>
  );
}
