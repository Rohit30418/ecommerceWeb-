import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useLayoutEffect,
  Suspense
} from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDispatch, useSelector } from 'react-redux';
import { addColor } from '../Redux/ColorSlice';

gsap.registerPlugin(ScrollTrigger);

// Model component
const Model = forwardRef(({ scene, color }, ref) => {
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.color.set(color);
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene, color]);

  return (
    <primitive
      ref={ref}
      scale={1.8}
      dispose={null}
      position={[-1, -1.4, -0.5]}
      rotation={[-0.03, -0.5, -0.02]}
      object={scene}
    />
  );
});

const LandingPage = () => {
  const { scene } = useGLTF('gltf/sony_headphone_wh-1000xm4.glb');
  const modelRef = useRef(null);
  const dispatch = useDispatch();
  const colorType = useSelector((state) => state.color.color);

  useLayoutEffect(() => {
    if (scene && modelRef.current) {
      const rotationAnimation = gsap.to(modelRef.current.rotation, {
        y: 4 * Math.PI,
        duration: 10,
        ease: 'linear',
        scrollTrigger: {
          trigger: '#modalCont',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 5,
        },
      });

      return () => {
        rotationAnimation.kill();
      };
    }
  }, [scene]);

  const colorOptions = [
    '#000000',
    '#2a3c29',
    '#613e3e',
    '#071f3f',
    '#ffdbae'
  ];

  return (
    <div id="modalCont" style={{ width: '100%', height: '90vh' }}>
      <Canvas
        style={{ width: '100%', height: '100%' }}
        shadows
        camera={{ position: [20, 3, 10], fov: 25 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <directionalLight
          position={[25, 25, 35]}
          intensity={colorType === '#000000' ? 14 : 12}
        />
        <directionalLight
          position={[-5, -35, -35]}
          intensity={colorType === '#000000' ? 14 : 15}
        />
        <ambientLight intensity={0} />
        <Suspense fallback={null}>
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <Model ref={modelRef} scene={scene} color={colorType} />
        </Suspense>
      </Canvas>

      {/* Color Selection Buttons */}
      <div className="flex gap-2 rounded-lg justify-center px-3 py-2 items-center bg-slate-400 absolute bottom-[80px] left-1/2 transform -translate-x-1/2">
        {colorOptions.map((clr) => (
          <button
            key={clr}
            onClick={() => dispatch(addColor(clr))}
            className="w-5 h-5 rounded-full"
            style={{ backgroundColor: clr }}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
