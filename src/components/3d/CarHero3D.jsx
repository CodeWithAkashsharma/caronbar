import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { FallbackHero3D } from './FallbackHero3D';
import { Sparkles, RefreshCw, Eye } from 'lucide-react';

// Procedural 3D Luxury Sports Car mesh component
function LuxuryCarMesh({ paintColor = '#15181C', rotSpeed = 0.005 }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotSpeed;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={[1.1, 1.1, 1.1]}>
      {/* Lower Main Chassis */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 0.7, 2.0]} />
        <meshPhysicalMaterial
          color={paintColor}
          metalness={0.9}
          roughness={0.15}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          reflectivity={1.0}
        />
      </mesh>

      {/* Cabin Roof / Windshield Canopy */}
      <mesh position={[-0.2, 1.0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.65, 1.6]} />
        <meshPhysicalMaterial
          color="#0B0D0F"
          metalness={0.2}
          roughness={0.1}
          transmission={0.6}
          thickness={0.5}
        />
      </mesh>

      {/* Hood Slope Accent */}
      <mesh position={[1.4, 0.55, 0]} rotation={[0, 0, -0.15]} castShadow>
        <boxGeometry args={[1.4, 0.35, 1.9]} />
        <meshPhysicalMaterial
          color={paintColor}
          metalness={0.95}
          roughness={0.1}
          clearcoat={1.0}
        />
      </mesh>

      {/* Headlights (Emissive Gold / Xenon Glow) */}
      <mesh position={[2.12, 0.45, 0.7]}>
        <boxGeometry args={[0.08, 0.15, 0.45]} />
        <meshStandardMaterial color="#E6C687" emissive="#F3E5AB" emissiveIntensity={3} />
      </mesh>
      <mesh position={[2.12, 0.45, -0.7]}>
        <boxGeometry args={[0.08, 0.15, 0.45]} />
        <meshStandardMaterial color="#E6C687" emissive="#F3E5AB" emissiveIntensity={3} />
      </mesh>

      {/* Taillights (Emissive Red Bar) */}
      <mesh position={[-2.12, 0.55, 0]}>
        <boxGeometry args={[0.08, 0.12, 1.8]} />
        <meshStandardMaterial color="#EF4444" emissive="#DC2626" emissiveIntensity={4} />
      </mesh>

      {/* Wheels - Front Left */}
      <group position={[1.2, 0.25, 1.05]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.38, 0.38, 0.35, 32]} />
          <meshStandardMaterial color="#090A0F" roughness={0.8} />
        </mesh>
        {/* Rim trim */}
        <mesh position={[0, 0.18, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.02, 16]} />
          <meshStandardMaterial color="#E6C687" metalness={1} roughness={0.1} />
        </mesh>
      </group>

      {/* Wheels - Front Right */}
      <group position={[1.2, 0.25, -1.05]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.38, 0.38, 0.35, 32]} />
          <meshStandardMaterial color="#090A0F" roughness={0.8} />
        </mesh>
        <mesh position={[0, -0.18, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.02, 16]} />
          <meshStandardMaterial color="#E6C687" metalness={1} roughness={0.1} />
        </mesh>
      </group>

      {/* Wheels - Rear Left */}
      <group position={[-1.3, 0.28, 1.05]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.42, 0.42, 0.38, 32]} />
          <meshStandardMaterial color="#090A0F" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.28, 0.28, 0.02, 16]} />
          <meshStandardMaterial color="#E6C687" metalness={1} roughness={0.1} />
        </mesh>
      </group>

      {/* Wheels - Rear Right */}
      <group position={[-1.3, 0.28, -1.05]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.42, 0.42, 0.38, 32]} />
          <meshStandardMaterial color="#090A0F" roughness={0.8} />
        </mesh>
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.28, 0.28, 0.02, 16]} />
          <meshStandardMaterial color="#E6C687" metalness={1} roughness={0.1} />
        </mesh>
      </group>
    </group>
  );
}

class ThreeErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err) {
    console.warn('R3F 3D Canvas error caught, switching to 2D Fallback:', err);
  }
  render() {
    if (this.state.hasError) {
      return <FallbackHero3D />;
    }
    return this.props.children;
  }
}

export const CarHero3D = () => {
  const [paintColor, setPaintColor] = useState('#15181C');
  const [use2DFallback, setUse2DFallback] = useState(false);

  if (use2DFallback) {
    return <FallbackHero3D />;
  }

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl group">
      
      {/* 3D R3F Canvas */}
      <ThreeErrorBoundary>
        <Canvas
          camera={{ position: [5, 2.5, 4.5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 15, 10]} intensity={2.5} color="#FFFFFF" castShadow />
          <directionalLight position={[-10, 10, -10]} intensity={1.2} color="#E6C687" />
          <pointLight position={[0, 5, 0]} intensity={1.5} color="#38BDF8" />

          <Suspense fallback={null}>
            <LuxuryCarMesh paintColor={paintColor} />
            <ContactShadows
              position={[0, -0.21, 0]}
              opacity={0.7}
              scale={10}
              blur={1.5}
              far={4}
            />
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2.1}
            rotateSpeed={0.5}
          />
        </Canvas>
      </ThreeErrorBoundary>

      {/* Floating 3D Control Panel Overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
        
        {/* Paint Color Swatches */}
        <div className="flex items-center gap-2 p-2 rounded-2xl bg-dark-950/80 backdrop-blur-md border border-white/10">
          <span className="text-[10px] uppercase font-mono text-gold-400 px-2 flex items-center gap-1 font-semibold">
            <Sparkles className="w-3 h-3" /> Finish Spec:
          </span>
          {[
            { name: 'Obsidian Black', color: '#15181C' },
            { name: 'Liquid Gold', color: '#8A7036' },
            { name: 'Titanium Silver', color: '#64748B' },
            { name: 'Deep Midnight Blue', color: '#0F172A' },
          ].map((c) => (
            <button
              key={c.color}
              onClick={() => setPaintColor(c.color)}
              className={`w-6 h-6 rounded-full border-2 transition-transform ${
                paintColor === c.color ? 'scale-125 border-gold-400 shadow-gold-glow' : 'border-white/20 hover:scale-110'
              }`}
              style={{ backgroundColor: c.color }}
              title={c.name}
            />
          ))}
        </div>

        {/* Fallback & Hint Buttons */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:flex items-center gap-1 text-[10px] text-silver-400 bg-dark-950/80 px-3 py-1.5 rounded-xl border border-white/10">
            <Eye className="w-3.5 h-3.5 text-gold-400" /> Drag to Rotate 3D Spec
          </span>
          <button
            onClick={() => setUse2DFallback(!use2DFallback)}
            className="p-2 rounded-xl bg-dark-950/80 border border-white/10 text-silver-300 hover:text-gold-400 transition-colors text-[10px] font-mono flex items-center gap-1"
            title="Toggle 2D/3D Mode"
          >
            <RefreshCw className="w-3.5 h-3.5" /> 2D/3D
          </button>
        </div>

      </div>

    </div>
  );
};
