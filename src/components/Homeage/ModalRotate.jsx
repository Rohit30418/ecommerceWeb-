import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
const Model = forwardRef(({ scene, color }, ref) => {
    useEffect(() => {
      if (scene) {
        scene.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material.color.set("orange");
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
      }
    }, [color, scene]);
  
    return (
      <primitive
        ref={ref}
        scale={2}
        dispose={null}
        position={[-1, -1.4, -0.5]}
        rotation={[-0.03, -0.5, -0.02]}
        object={scene}
      />
    );
  });
  

const ModalRotate = () => {
  const { scene } = useGLTF('/gltf/scene.gltf');
  const [color, setColor] = useState('#ffffff'); // Add color state if needed

  return (
    <div style={{ width: '100%', height: '60vh' }}>
      <Canvas
        frameloop='demand'
        style={{ width: '100%', height: '100%' }}
        shadows
        camera={{ position: [20, 3, 10], fov: 25 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <directionalLight position={[10, 50, 50]} intensity={5} />
        <directionalLight position={[-15, -10, -10]} intensity={5} />
        <ambientLight intensity={0.2} />
        <Suspense fallback={null}>
          <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
          <Model scene={scene} color={color} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ModalRotate;
