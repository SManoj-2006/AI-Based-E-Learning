import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stars, Float, Text3D, Center } from '@react-three/drei';
import { Suspense, ReactNode } from 'react';

interface Scene3DProps {
  children: ReactNode;
  showStars?: boolean;
}

const LoadingFallback = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#4fc3f7" wireframe />
  </mesh>
);

export const Scene3D = ({ children, showStars = true }: Scene3DProps) => {
  return (
    <div className="w-full h-full min-h-[500px] rounded-2xl overflow-hidden bg-gradient-to-b from-background to-background/80">
      <Canvas
        camera={{ position: [3, 2, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={<LoadingFallback />}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4fc3f7" />
          <spotLight
            position={[0, 10, 0]}
            angle={0.3}
            penumbra={1}
            intensity={1}
            color="#8855ff"
          />

          {/* Environment */}
          {showStars && (
            <Stars
              radius={100}
              depth={50}
              count={3000}
              factor={4}
              saturation={0}
              fade
              speed={1}
            />
          )}

          {/* Main Content */}
          {children}

          {/* Controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={3}
            maxDistance={10}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
