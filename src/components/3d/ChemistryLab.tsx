import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Cylinder, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const ChemistryLab = () => {
  const beakerRef = useRef<THREE.Group>(null);
  const liquidRef = useRef<THREE.Mesh>(null);
  const bubblesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (liquidRef.current) {
      liquidRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.02 + 0.3;
    }
    if (bubblesRef.current) {
      bubblesRef.current.children.forEach((bubble, i) => {
        bubble.position.y = ((state.clock.elapsedTime * 0.5 + i * 0.3) % 1) * 0.8;
        bubble.scale.setScalar(Math.sin((state.clock.elapsedTime + i) * 2) * 0.02 + 0.05);
      });
    }
  });

  return (
    <group position={[0, -1, 0]}>
      {/* Lab Table */}
      <RoundedBox args={[4, 0.1, 2]} radius={0.02} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.7} />
      </RoundedBox>
      
      {/* Table Legs */}
      {[[-1.8, -0.5, 0.8], [1.8, -0.5, 0.8], [-1.8, -0.5, -0.8], [1.8, -0.5, -0.8]].map((pos, i) => (
        <Cylinder key={i} args={[0.05, 0.05, 1]} position={pos as [number, number, number]}>
          <meshStandardMaterial color="#16213e" metalness={0.5} />
        </Cylinder>
      ))}

      {/* Beaker 1 */}
      <group ref={beakerRef} position={[-1, 0.4, 0]}>
        <Cylinder args={[0.2, 0.15, 0.6, 32]} position={[0, 0, 0]}>
          <meshPhysicalMaterial 
            color="#88ccff"
            transparent
            opacity={0.3}
            roughness={0}
            metalness={0.1}
            transmission={0.9}
          />
        </Cylinder>
        {/* Liquid */}
        <mesh ref={liquidRef} position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.18, 0.13, 0.4, 32]} />
          <MeshDistortMaterial 
            color="#00ff88"
            emissive="#00ff88"
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
            distort={0.2}
            speed={2}
          />
        </mesh>
        {/* Bubbles */}
        <group ref={bubblesRef}>
          {[...Array(5)].map((_, i) => (
            <Sphere key={i} args={[0.03]} position={[(Math.random() - 0.5) * 0.2, 0.2, (Math.random() - 0.5) * 0.2]}>
              <meshStandardMaterial color="#00ffaa" emissive="#00ff88" emissiveIntensity={2} transparent opacity={0.6} />
            </Sphere>
          ))}
        </group>
      </group>

      {/* Beaker 2 - Purple */}
      <group position={[0, 0.4, 0]}>
        <Cylinder args={[0.25, 0.2, 0.7, 32]}>
          <meshPhysicalMaterial 
            color="#aa88ff"
            transparent
            opacity={0.3}
            roughness={0}
            transmission={0.9}
          />
        </Cylinder>
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.23, 0.18, 0.5, 32]} />
          <MeshDistortMaterial 
            color="#8855ff"
            emissive="#8855ff"
            emissiveIntensity={0.4}
            transparent
            opacity={0.85}
            distort={0.15}
            speed={1.5}
          />
        </mesh>
      </group>

      {/* Test Tube Rack */}
      <group position={[1.2, 0.3, 0]}>
        <RoundedBox args={[0.6, 0.1, 0.15]} radius={0.02}>
          <meshStandardMaterial color="#2d3436" />
        </RoundedBox>
        {[-0.2, 0, 0.2].map((x, i) => (
          <group key={i} position={[x, 0.25, 0]}>
            <Cylinder args={[0.04, 0.04, 0.4, 16]}>
              <meshPhysicalMaterial 
                color="#ffffff"
                transparent
                opacity={0.2}
                transmission={0.95}
              />
            </Cylinder>
            <mesh position={[0, -0.05, 0]}>
              <cylinderGeometry args={[0.035, 0.035, 0.25, 16]} />
              <meshStandardMaterial 
                color={['#ff6b6b', '#ffd93d', '#6bcb77'][i]}
                emissive={['#ff6b6b', '#ffd93d', '#6bcb77'][i]}
                emissiveIntensity={0.3}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* Bunsen Burner */}
      <group position={[-0.5, 0.2, 0.6]}>
        <Cylinder args={[0.08, 0.1, 0.15, 16]}>
          <meshStandardMaterial color="#333" metalness={0.8} />
        </Cylinder>
        <Cylinder args={[0.03, 0.03, 0.2, 16]} position={[0, 0.15, 0]}>
          <meshStandardMaterial color="#444" metalness={0.9} />
        </Cylinder>
        {/* Flame */}
        <mesh position={[0, 0.35, 0]}>
          <coneGeometry args={[0.05, 0.15, 16]} />
          <MeshDistortMaterial 
            color="#ff8844"
            emissive="#ff4400"
            emissiveIntensity={2}
            transparent
            opacity={0.9}
            distort={0.4}
            speed={5}
          />
        </mesh>
      </group>

      {/* Microscope */}
      <group position={[1, 0.3, -0.5]}>
        <Cylinder args={[0.15, 0.18, 0.05, 16]}>
          <meshStandardMaterial color="#1a1a2e" metalness={0.7} />
        </Cylinder>
        <Cylinder args={[0.03, 0.03, 0.5, 16]} position={[0, 0.25, 0]}>
          <meshStandardMaterial color="#2d3436" metalness={0.8} />
        </Cylinder>
        <Cylinder args={[0.05, 0.04, 0.15, 16]} position={[0, 0.55, 0]} rotation={[0.3, 0, 0]}>
          <meshStandardMaterial color="#16213e" metalness={0.6} />
        </Cylinder>
        <Sphere args={[0.03]} position={[0, 0.65, 0.02]}>
          <meshStandardMaterial color="#4fc3f7" emissive="#4fc3f7" emissiveIntensity={0.5} />
        </Sphere>
      </group>
    </group>
  );
};
