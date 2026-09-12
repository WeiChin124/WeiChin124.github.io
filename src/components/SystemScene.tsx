import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type SystemSceneProps = {
  activeLayer: number;
  onLayerChange: (index: number) => void;
};

const palette = ["#7187ff", "#7c67ff", "#995dff", "#31d8ef", "#75f2c3"];

function StarField() {
  const points = useMemo(() => {
    const positions = new Float32Array(180 * 3);
    for (let index = 0; index < 180; index += 1) {
      positions[index * 3] = (Math.random() - 0.5) * 18;
      positions[index * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[index * 3 + 2] = (Math.random() - 0.5) * 10 - 1;
    }
    return positions;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#8bc8ff" transparent opacity={0.58} sizeAttenuation />
    </points>
  );
}

function ResponsiveCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    camera.position.set(size.width < 760 ? 0 : 0.8, 0.7, size.width < 760 ? 10.5 : 8.3);
  }, [camera, size.width]);

  return null;
}

function Architecture({ activeLayer, onLayerChange }: SystemSceneProps) {
  const assembly = useRef<THREE.Group>(null);
  const orbitA = useRef<THREE.Mesh>(null);
  const orbitB = useRef<THREE.Mesh>(null);
  const scrollProgress = useRef(0);
  const pointerTarget = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updateScroll = () => {
      const range = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current = range > 0 ? window.scrollY / range : 0;
    };
    const updatePointer = (event: PointerEvent) => {
      pointerTarget.current.x = (event.clientX / window.innerWidth - 0.5) * 0.5;
      pointerTarget.current.y = (event.clientY / window.innerHeight - 0.5) * 0.25;
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("pointermove", updatePointer, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("pointermove", updatePointer);
    };
  }, []);

  useFrame((state, delta) => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (assembly.current) {
      const targetRotationY = -0.48 + scrollProgress.current * Math.PI * 1.15 + pointerTarget.current.x;
      const targetRotationX = 0.52 + Math.sin(scrollProgress.current * Math.PI) * 0.18 + pointerTarget.current.y;
      assembly.current.rotation.y = THREE.MathUtils.damp(assembly.current.rotation.y, targetRotationY, 3.4, delta);
      assembly.current.rotation.x = THREE.MathUtils.damp(assembly.current.rotation.x, targetRotationX, 3.4, delta);
      assembly.current.position.y = THREE.MathUtils.damp(
        assembly.current.position.y,
        reduceMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.7) * 0.11 - scrollProgress.current * 0.7,
        3,
        delta,
      );
    }
    if (!reduceMotion && orbitA.current && orbitB.current) {
      orbitA.current.rotation.z += delta * 0.13;
      orbitB.current.rotation.x -= delta * 0.09;
    }
  });

  return (
    <group position={[1.25, 0.1, 0]}>
      <group ref={assembly} rotation={[0.52, -0.48, -0.08]}>
        {palette.map((color, index) => {
          const selected = activeLayer === index;
          return (
            <group key={color} position={[0, (index - 2) * 0.58, 0]}>
              <mesh
                scale={selected ? 1.06 : 1}
                onClick={(event) => {
                  event.stopPropagation();
                  onLayerChange(index);
                }}
                onPointerEnter={() => {
                  document.body.style.cursor = "pointer";
                }}
                onPointerLeave={() => {
                  document.body.style.cursor = "default";
                }}
              >
                <boxGeometry args={[3.8, 0.18, 2.4]} />
                <meshStandardMaterial
                  color={selected ? color : "#111a37"}
                  emissive={color}
                  emissiveIntensity={selected ? 1.25 : 0.2}
                  metalness={0.62}
                  roughness={0.3}
                  transparent
                  opacity={selected ? 0.95 : 0.68}
                />
              </mesh>
              <mesh scale={[1.012, 1.08, 1.012]}>
                <boxGeometry args={[3.8, 0.18, 2.4]} />
                <meshBasicMaterial color={color} wireframe transparent opacity={selected ? 0.55 : 0.17} />
              </mesh>
              {[[-1.45, 0.25], [-0.65, -0.6], [0.55, 0.62], [1.35, -0.28]].map(([x, z], nodeIndex) => (
                <mesh key={nodeIndex} position={[x, 0.15, z]}>
                  <sphereGeometry args={[selected ? 0.07 : 0.045, 12, 12]} />
                  <meshBasicMaterial color={selected ? "#ffffff" : color} />
                </mesh>
              ))}
            </group>
          );
        })}

        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.78, 3.35, 0.78]} />
          <meshStandardMaterial color="#080d22" emissive="#3be7f1" emissiveIntensity={0.42} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh ref={orbitA} rotation={[1.1, 0.2, 0]}>
          <torusGeometry args={[2.55, 0.012, 8, 160]} />
          <meshBasicMaterial color="#64f4ff" transparent opacity={0.45} />
        </mesh>
        <mesh ref={orbitB} rotation={[0.35, 1.2, 0.4]}>
          <torusGeometry args={[2.05, 0.018, 8, 160]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.35} />
        </mesh>
      </group>
    </group>
  );
}

export default function SystemScene(props: SystemSceneProps) {
  return (
    <div className="system-canvas" aria-label="Interactive 3D software architecture">
      <Canvas camera={{ position: [0.8, 0.7, 8.3], fov: 44 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
        <ResponsiveCamera />
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 6, 5]} intensity={2.2} color="#b8f8ff" />
        <pointLight position={[-4, -2, 4]} intensity={22} distance={12} color="#825cff" />
        <StarField />
        <Architecture {...props} />
        <gridHelper args={[22, 32, "#314b88", "#10162d"]} position={[0, -3.35, 0]} />
      </Canvas>
    </div>
  );
}
