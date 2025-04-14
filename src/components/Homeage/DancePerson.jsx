import React, { useRef, useEffect } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { FBXLoader } from 'three-stdlib';
import * as THREE from 'three';

const FbxModel = () => {
  const fbx = useLoader(FBXLoader, 'Dance.fbx');
  const modelRef = useRef();
  const mixerRef = useRef();

  useEffect(() => {
    if (fbx) {
      fbx.scale.set(0.01, 0.01, 0.01); // Adjust scale as needed
      fbx.position.set(0, 0, 0); // Adjust position as needed

      // Initialize AnimationMixer
      mixerRef.current = new THREE.AnimationMixer(fbx);
      const action = mixerRef.current.clipAction(fbx.animations[0]);
      action.play();

      if (modelRef.current) {
        modelRef.current.add(fbx);
      }
    }
  }, [fbx]);

  useFrame((state, delta) => {
    // Update the animation mixer
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  return <primitive scale={4} position={[0, -3, 0.5]} ref={modelRef} object={new THREE.Group()} />;
};

const DancePerson = () => {
  return (
    <div style={{ width: '100%', height: '70vh' }} className='relative z-[500]'>
      <Canvas shadows camera={{ position: [20, 3, 10], fov: 25 }} gl={{ preserveDrawingBuffer: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 50, 50]} intensity={15} />
        <directionalLight position={[-15, -10, -10]} intensity={2} />
        <FbxModel />
        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
      </Canvas>
    </div>
  );
};

export default DancePerson;
