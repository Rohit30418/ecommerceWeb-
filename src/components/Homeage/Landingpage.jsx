import { useEffect, useRef, forwardRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDispatch, useSelector } from 'react-redux';
import { addColor } from '../Redux/ColorSlice';

gsap.registerPlugin(ScrollTrigger);

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
  }, [scene, color]);

  return (
    <primitive
      ref={ref}
      scale={1.8}
      dispose={null}
      position={[-1, -1.4, -0.5]}
      // Don't set rotation here, let GSAP control it
      object={scene}
    />
  );
});

const LandingPage = () => {
  const { scene } = useGLTF('gltf/sony_headphone_wh-1000xm4.glb');
  const modelRef = useRef(null);
  const containerRef = useRef(null);
  const controlsRef = useRef(null);
  const dispatch = useDispatch();
  const colorType = useSelector((state) => state.color.color);

  const colorOptions = [
    '#000000',
    '#2a3c29',
    '#613e3e',
    '#071f3f',
    '#ffdbae',
  ];

  // Wait for refs and scene to be ready, then setup GSAP
  useEffect(() => {
    let animation;
    let checkReadyId;

    function setupAnimation() {
      if (modelRef.current && containerRef.current) {
        // Reset rotation to initial value
        modelRef.current.rotation.set(-0.03, -0.5, -0.02);

        animation = gsap.to(modelRef.current.rotation, {
          y: 4 * Math.PI,
          duration: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 5,
            markers: false,
          },
        });
      } else {
        // Poll until refs are ready
        checkReadyId = requestAnimationFrame(setupAnimation);
      }
    }

    if (scene) {
      setupAnimation();
    }

    return () => {
      if (animation) {
        animation.kill();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
      if (checkReadyId) cancelAnimationFrame(checkReadyId);
    };
  }, [scene]);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    controls.enableZoom = false;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = Math.PI / 2;

    const domElement = controls.domElement;

    let startX = 0;
    let startY = 0;

    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 1) {
        const dx = e.touches[0].clientX - startX;
        const dy = e.touches[0].clientY - startY;

        if (Math.abs(dx) > Math.abs(dy)) {
          // Horizontal movement: prevent scroll, allow rotation
          e.preventDefault();
        }
        // else: vertical movement — allow page to scroll
      }
    };

    domElement.addEventListener('touchstart', handleTouchStart, {
      passive: true,
    });
    domElement.addEventListener('touchmove', handleTouchMove, {
      passive: false,
    });

    return () => {
      domElement.removeEventListener('touchstart', handleTouchStart);
      domElement.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '80vh', position: 'relative' }}
      aria-label="3D headphone model viewer"
      role="region"
    >
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
          intensity={colorType === '#000000' ? 10 : 15}
        />
        <ambientLight intensity={5} />
        <Suspense fallback={null}>
          <OrbitControls ref={controlsRef} />
          <Model ref={modelRef} scene={scene} color={colorType} />
        </Suspense>
      </Canvas>

      <div
        className="flex gap-2 rounded-lg justify-center px-3 py-2 items-center bg-slate-400 absolute bottom-[20px] left-1/2 transform -translate-x-1/2"
        role="group"
        aria-label="Color selection"
      >
        {colorOptions.map((clr) => (
          <button
            key={clr}
            onClick={() => dispatch(addColor(clr))}
            className="w-5 h-5 rounded-full"
            style={{ backgroundColor: clr }}
            aria-label={`Select color ${clr}`}
            aria-pressed={colorType === clr}
            tabIndex={0}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;