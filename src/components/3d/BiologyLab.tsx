import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Torus, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export const BiologyLab = () => {
  const dnaRef = useRef<THREE.Group>(null);
  const cellRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (dnaRef.current) {
      dnaRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
    if (cellRef.current) {
      cellRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      cellRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  // DNA Helix points
  const createDNAPoints = () => {
    const points: { pos: [number, number, number]; color: string }[] = [];
    for (let i = 0; i < 20; i++) {
      const t = i * 0.3;
      const radius = 0.2;
      // Strand 1
      points.push({
        pos: [Math.cos(t) * radius, t * 0.15 - 1.5, Math.sin(t) * radius],
        color: '#ff6b6b'
      });
      // Strand 2
      points.push({
        pos: [Math.cos(t + Math.PI) * radius, t * 0.15 - 1.5, Math.sin(t + Math.PI) * radius],
        color: '#4fc3f7'
      });
    }
    return points;
  };

  const dnaPoints = createDNAPoints();

  return (
    <group position={[0, -1, 0]}>
      {/* Platform */}
      <RoundedBox args={[5, 0.1, 3]} radius={0.02} position={[0, 0, 0]}>
        <meshStandardMaterial color="#0a1628" metalness={0.3} roughness={0.7} />
      </RoundedBox>

      {/* DNA Double Helix */}
      <group ref={dnaRef} position={[-1.2, 1.2, 0]}>
        {dnaPoints.map((point, i) => (
          <Sphere key={i} args={[0.05]} position={point.pos}>
            <meshStandardMaterial 
              color={point.color}
              emissive={point.color}
              emissiveIntensity={0.5}
            />
          </Sphere>
        ))}
        {/* Connecting bars */}
        {[...Array(10)].map((_, i) => (
          <mesh key={`bar-${i}`} position={[0, i * 0.3 - 1.5, 0]}>
            <boxGeometry args={[0.4, 0.02, 0.02]} />
            <meshStandardMaterial 
              color="#ffd93d"
              emissive="#ffd93d"
              emissiveIntensity={0.3}
            />
          </mesh>
        ))}
      </group>

      {/* Cell Model */}
      <group ref={cellRef} position={[1, 1, 0]}>
        {/* Cell membrane */}
        <Sphere args={[0.6, 32, 32]}>
          <meshPhysicalMaterial 
            color="#88ff88"
            transparent
            opacity={0.3}
            roughness={0.2}
            transmission={0.6}
          />
        </Sphere>
        {/* Nucleus */}
        <Sphere args={[0.25]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#ff8855"
            emissive="#ff6600"
            emissiveIntensity={0.3}
          />
        </Sphere>
        {/* Nucleolus */}
        <Sphere args={[0.1]} position={[0.08, 0.05, 0]}>
          <meshStandardMaterial 
            color="#ff4444"
            emissive="#ff0000"
            emissiveIntensity={0.4}
          />
        </Sphere>
        {/* Mitochondria */}
        {[
          [0.35, 0.2, 0.1],
          [-0.3, -0.25, 0.2],
          [0.15, -0.35, -0.2]
        ].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]} rotation={[Math.random(), Math.random(), 0]}>
            <capsuleGeometry args={[0.05, 0.12, 8, 16]} />
            <meshStandardMaterial 
              color="#ff6b6b"
              emissive="#ff4444"
              emissiveIntensity={0.3}
            />
          </mesh>
        ))}
        {/* Endoplasmic Reticulum */}
        {[...Array(3)].map((_, i) => (
          <Torus 
            key={i} 
            args={[0.35 + i * 0.05, 0.02, 8, 32]} 
            position={[-0.1, 0, 0]}
            rotation={[Math.PI / 2 + i * 0.2, i * 0.3, 0]}
          >
            <meshStandardMaterial 
              color="#8855ff"
              transparent
              opacity={0.6}
            />
          </Torus>
        ))}
        {/* Ribosomes */}
        {[...Array(15)].map((_, i) => {
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.random() * Math.PI;
          const r = 0.45;
          return (
            <Sphere 
              key={i} 
              args={[0.02]} 
              position={[
                r * Math.sin(phi) * Math.cos(theta),
                r * Math.sin(phi) * Math.sin(theta),
                r * Math.cos(phi)
              ]}
            >
              <meshStandardMaterial color="#ffd93d" />
            </Sphere>
          );
        })}
      </group>

      {/* Petri Dishes */}
      <group position={[-0.3, 0.15, 0.8]}>
        <mesh>
          <cylinderGeometry args={[0.25, 0.25, 0.05, 32]} />
          <meshPhysicalMaterial 
            color="#ffffff"
            transparent
            opacity={0.3}
            transmission={0.8}
          />
        </mesh>
        {/* Culture */}
        <mesh position={[0, 0.01, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.03, 32]} />
          <meshStandardMaterial 
            color="#88ff88"
            emissive="#44ff44"
            emissiveIntensity={0.2}
          />
        </mesh>
        {/* Colonies */}
        {[...Array(8)].map((_, i) => (
          <Sphere 
            key={i} 
            args={[0.03 + Math.random() * 0.02]} 
            position={[
              (Math.random() - 0.5) * 0.35,
              0.04,
              (Math.random() - 0.5) * 0.35
            ]}
          >
            <meshStandardMaterial 
              color={['#ff6b6b', '#ffd93d', '#4fc3f7'][i % 3]}
            />
          </Sphere>
        ))}
      </group>

      {/* Molecular Structure Display */}
      <group position={[0, 1.8, -1]}>
        <RoundedBox args={[2.5, 1, 0.05]} radius={0.02}>
          <meshStandardMaterial 
            color="#0f0f23"
            transparent
            opacity={0.9}
            emissive="#1a1a3e"
            emissiveIntensity={0.2}
          />
        </RoundedBox>
      </group>
    </group>
  );
};
