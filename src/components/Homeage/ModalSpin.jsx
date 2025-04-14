import React, { useState, useRef, forwardRef, Suspense, useLayoutEffect, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Model = forwardRef(({ scene, color }, ref) => {
  useLayoutEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.color.set(color);
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
      object={scene}
    />
  );
});

const ModalSpin = () => {
  const { scene } = useGLTF('/gltf/scene2.gltf');
  const [color, setColor] = useState('#ffffff');
  const modelRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (scene && modelRef.current) {
      setIsLoaded(true);
    }
  }, [scene]);

  useEffect(() => {
    if (isLoaded && modelRef.current) {
      gsap.to(modelRef.current.rotation, {
        y: 5*Math.PI / 2,
      //  y: 1,
        z:-1,
        scrollTrigger: {
          trigger: "#scroll-container",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin:true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isLoaded]);

  return (
    <div id="scroll-container" className="bg-blue-900" style={{ width: '100%', height: '100vh' }}>
      <div style={{ width: '100%', height: '100vh' }}>
        <Canvas
          style={{ width: '100%', height: '100%' }}
          shadows
          camera={{ position: [25, 3, 10], fov: 25 }}
          gl={{ preserveDrawingBuffer: true }}
        >
          <directionalLight position={[10, 50, 50]} intensity={5} />
          <directionalLight position={[-15, -10, -10]} intensity={5} />
          <ambientLight intensity={0.2} />
          <Suspense fallback={null}>
            <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
            <Model ref={modelRef} scene={scene} color={color} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default ModalSpin;
