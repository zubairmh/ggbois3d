import { extend } from '@react-three/fiber'
// import { CanvasTexture} from 'three-stdlib'
import { CanvasTexture, MeshBasicMaterial, PlaneGeometry,Mesh,MeshPhysicalMaterial,SphereBufferGeometry,MeshStandardMaterial,BoxBufferGeometry,Group,DirectionalLight,PointLight, AmbientLight } from 'three';
import { motion, MotionCanvas, LayoutCamera } from "framer-motion-3d";
import { Shadow, SoftShadows, Stats } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { degToRad } from "three/src/math/MathUtils";

extend({ CanvasTexture,MeshBasicMaterial,PlaneGeometry,Mesh,MeshPhysicalMaterial,SphereBufferGeometry,MeshStandardMaterial,BoxBufferGeometry,Group,DirectionalLight, PointLight, AmbientLight })
export function Scene({ isFullscreen }) {
  return (
    <MotionCanvas dpr={[1, 2]} shadows>
      <LayoutCamera
        initial={false}
        animate={
          isFullscreen
            ? {
                x: 10,
                y: 5,
                z: 10,
                rotateY: degToRad(90),
                fov: 30
              }
            : { x: 15, y: 0.25, z: 0, fov: 10 }
        }
      />
      <Lights isFullscreen={isFullscreen} />
      <Geometry />
    </MotionCanvas>
  );
}

function Lights({ isFullscreen }) {
  const three = useThree();
  useFrame(() => {
    three.camera.lookAt(0, 0, 0);
  });
  return (
    <>
      <SoftShadows/>
      <Stats />
      <ambientLight intensity={0.2} />
      <pointLight position={[-10, -10, 10]} intensity={2} color="#ff20f0" />
      <pointLight
        position={[0, 0.5, -1]}
        distance={1}
        intensity={2}
        color="#e4be00"
      />
      <motion.directionalLight
        castShadow
        intensity={1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={20}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        initial={false}
        animate={isFullscreen ? { x: 0, y: 8, z: 5 } : { x: 4, y: 3, z: 3 }}
      />
    </>
  );
}

function Geometry() {
  return (
    <>
      <group position={[0, -0.9, -3]}>
        <mesh
          receiveShadow
          castShadow
          rotation-x={-Math.PI / 2}
          position-z={2}
          scale={[4, 20, 0.2]}
        >
          <boxBufferGeometry />
          <meshStandardMaterial color="hotpink" />
        </mesh>
        <mesh
          receiveShadow
          castShadow
          rotation-x={-Math.PI / 2}
          position-y={1}
          scale={[4.2, 0.2, 4]}
        >
          <boxBufferGeometry />
          <meshStandardMaterial color="#e4be00" />
        </mesh>
        <mesh
          receiveShadow
          castShadow
          rotation-x={-Math.PI / 2}
          position={[-1.7, 1, 3.5]}
          scale={[0.5, 4, 4]}
        >
          <boxBufferGeometry />
          <meshStandardMaterial color="#736fbd" />
        </mesh>
        <mesh
          receiveShadow
          castShadow
          rotation-x={-Math.PI / 2}
          position={[0, 4.5, 3]}
          scale={[2, 0.03, 4]}
        >
          <boxBufferGeometry />
          <meshStandardMaterial color="white" />
        </mesh>
      </group>
      <mesh receiveShadow castShadow>
        <sphereBufferGeometry args={[0.75, 64, 64]} />
        <meshPhysicalMaterial
          color="#e7b056"
          clearcoat={1}
          clearcoatRoughness={0}
        />
        <Shadow
          position-y={-0.79}
          rotation-x={-Math.PI / 2}
          opacity={0.6}
          scale={[0.8, 0.8, 1]}
        />
      </mesh>
    </>
  );
}
