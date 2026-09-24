import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import { useRef } from 'react'; import type { Mesh } from 'three';
function Core(){ const ref=useRef<Mesh>(null!); useFrame((s)=>{ref.current.rotation.x=s.clock.elapsedTime*.18;ref.current.rotation.y=s.clock.elapsedTime*.25}); return <Float speed={1.4} rotationIntensity={.4}><mesh ref={ref}><icosahedronGeometry args={[1.35,2]}/><meshStandardMaterial color="#8b5cf6" wireframe emissive="#312e81" emissiveIntensity={.35}/></mesh></Float> }
export default function HeroScene(){ return <Canvas camera={{position:[0,0,4.5],fov:48}} dpr={[1,1.5]}><ambientLight intensity={.8}/><pointLight position={[3,3,3]} intensity={20} color="#67e8f9"/><pointLight position={[-3,-2,2]} intensity={12} color="#a78bfa"/><Core/><OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={.55}/></Canvas> }
