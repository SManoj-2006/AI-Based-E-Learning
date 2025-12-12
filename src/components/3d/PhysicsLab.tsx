import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Sphere, Torus, Box } from '@react-three/drei';
import * as THREE from 'three';

export const PhysicsLab = () => {
  const pendulumRef = useRef<THREE.Group>(null);
  const atomRef = useRef<THREE.Group>(null);
  const orbitRefs = useRef<THREE.Group[]>([]);

  useFrame((state) => {
    if (pendulumRef.current) {
      pendulumRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.5;
    }
    if (atomRef.current) {
      atomRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
    orbitRefs.current.forEach((orbit, i) => {
      if (orbit) {
        orbit.rotation.x = state.clock.elapsedTime * (1 + i * 0.5);
        orbit.rotation.y = state.clock.elapsedTime * (0.5 + i * 0.3);
      }
    });
  });

  return (
    <group position={[0, -1, 0]}>
      {/* Platform */}
      <RoundedBox args={[5, 0.1, 3]} radius={0.02} position={[0, 0, 0]}>
        <meshStandardMaterial color="#0f0f23" metalness={0.4} roughness={0.6} />
      </RoundedBox>

      {/* Newton's Cradle */}
      <group position={[-1.5, 0.8, 0]}>
        <RoundedBox args={[1.2, 0.05, 0.3]} radius={0.01} position={[0, 0.4, 0]}>
          <meshStandardMaterial color="#2d3436" metalness={0.7} />
        </RoundedBox>
        {[-0.4, -0.2, 0, 0.2, 0.4].map((x, i) => (
          <group 
            key={i} 
            ref={i === 0 ? pendulumRef : undefined}
            position={[x, 0.4, 0]}
            rotation={[0, 0, i === 0 ? 0.5 : 0]}
          >
            <Box args={[0.01, 0.4, 0.01]} position={[0, -0.2, 0]}>
              <meshStandardMaterial color="#888" metalness={0.9} />
            </Box>
            <Sphere args={[0.08]} position={[0, -0.45, 0]}>
              <meshStandardMaterial color="#c0c0c0" metalness={1} roughness={0.1} />
            </Sphere>
          </group>
        ))}
      </group>

      {/* Atom Model */}
      <group ref={atomRef} position={[1.2, 0.8, 0]}>
        {/* Nucleus */}
        <Sphere args={[0.15]}>
          <meshStandardMaterial 
            color="#ff4757"
            emissive="#ff4757"
            emissiveIntensity={0.5}
          />
        </Sphere>
        {/* Electron Orbits */}
        {[0, 1, 2].map((i) => (
          <group 
            key={i} 
            ref={(el) => { if (el) orbitRefs.current[i] = el; }}
            rotation={[i * 0.6, i * 0.8, 0]}
          >
            <Torus args={[0.4 + i * 0.15, 0.01, 8, 64]}>
              <meshStandardMaterial 
                color="#4fc3f7"
                transparent
                opacity={0.5}
              />
            </Torus>
            <Sphere args={[0.04]} position={[0.4 + i * 0.15, 0, 0]}>
              <meshStandardMaterial 
                color="#00d2d3"
                emissive="#00d2d3"
                emissiveIntensity={2}
              />
            </Sphere>
          </group>
        ))}
      </group>

      {/* Prism */}
      <group position={[0, 0.3, 0.8]}>
        <mesh rotation={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.3, 3]} />
          <meshPhysicalMaterial 
            color="#ffffff"
            transparent
            opacity={0.4}
            roughness={0}
            transmission={0.95}
            ior={2.4}
          />
        </mesh>
        {/* Rainbow beams */}
        {['#ff0000', '#ff8800', '#ffff00', '#00ff00', '#0088ff', '#8800ff'].map((color, i) => (
          <mesh key={i} position={[0.3 + i * 0.05, 0, 0.2 + i * 0.1]} rotation={[0, 0, -0.3 - i * 0.05]}>
            <boxGeometry args={[0.8, 0.02, 0.02]} />
            <meshStandardMaterial 
              color={color}
              emissive={color}
              emissiveIntensity={1}
              transparent
              opacity={0.7}
            />
          </mesh>
        ))}
      </group>

      {/* Tesla Coil */}
      <group position={[-0.5, 0.5, -0.8]}>
        <RoundedBox args={[0.3, 0.1, 0.3]} radius={0.02}>
          <meshStandardMaterial color="#2d3436" metalness={0.8} />
        </RoundedBox>
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.08, 0.12, 0.5, 32]} />
          <meshStandardMaterial color="#cd7f32" metalness={0.9} roughness={0.3} />
        </mesh>
        <Torus args={[0.15, 0.03, 16, 32]} position={[0, 0.65, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial 
            color="#c0c0c0"
            metalness={1}
            roughness={0.1}
          />
        </Torus>
        {/* Electric arcs */}
        {[0, 1, 2, 3].map((i) => (
          <mesh 
            key={i} 
            position={[
              Math.cos(i * Math.PI / 2) * 0.25,
              0.75,
              Math.sin(i * Math.PI / 2) * 0.25
            ]}
          >
            <sphereGeometry args={[0.02]} />
            <meshStandardMaterial 
              color="#88ccff"
              emissive="#4fc3f7"
              emissiveIntensity={3}
            />
          </mesh>
        ))}
      </group>

      {/* Floating Equations */}
      <group position={[0, 1.8, -1]}>
        <RoundedBox args={[2, 0.8, 0.02]} radius={0.02}>
          <meshStandardMaterial 
            color="#1a1a2e"
            transparent
            opacity={0.8}
          />
        </RoundedBox>
      </group>
    </group>
  );
};
