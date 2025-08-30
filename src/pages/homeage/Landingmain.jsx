import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import LandingPage from './Landingpage';
import MainBody from './MainBody';

gsap.registerPlugin(TextPlugin, ScrollTrigger);

export const LandingMain = () => {
  const hero = useRef(null);
  const modalRef = useRef(null);
  const textRef = useRef(null);
  const words = ["Headphones", "Earbuds", "Speakers", "Soundbars"];
  const [index, setIndex] = useState(0);

  // Fade-up animations for hero and modal
  useEffect(() => {
    gsap.fromTo(
      gsap.utils.toArray('.fade-up'),
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.5, ease: 'power1.out' }
    );

    gsap.fromTo(
      modalRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, delay: 2 }
    );
  }, []);

  // Scroll animation for hero section
  useEffect(() => {
    if (hero.current) {
      gsap.to(hero.current, {
        ease: 'linear',
        scrollTrigger: {
          trigger: hero.current,
          start: 'top 0',
          end: 'bottom 50%',
          scrub: 1
        }
      });
    }
  }, []);

  // GSAP TextPlugin animation for last word
useEffect(() => {
  if (!textRef.current) return; // <--- Add this check

  const animateWord = () => {
    gsap.to(textRef.current, {
      duration: 0.4,
      opacity: 0,
      y: -20,
      scale: 0.8,
      ease: "power1.in",
      onComplete: () => {
        // Change the word
        if (textRef.current) {
          textRef.current.textContent = words[index];

          // Fade in + slide down + scale in
          gsap.fromTo(
            textRef.current,
            { opacity: 0, y: 20, scale: 0.8 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power1.out" }
          );
        }
      },
    });
  };

  animateWord();
}, [index]);


useEffect(() => {
  const interval = setInterval(() => {
    setIndex((prev) => (prev + 1) % words.length);
  }, 2000); // change word every 2 seconds

  return () => clearInterval(interval); // cleanup on unmount
}, []);

  return (
    <div>
      {/* Main hero section */}
      <div className="relative m-5 mt-5 lg:mt-0 py-5 px-0 lg:px-2 dark:bg-gray-500/20 rounded-md bg-gray-100 dark:text-darkText">
        <div ref={hero}>
          <div className="flex flex-wrap items-center pl-5">
            {/* Left side - Text */}
            <div className="w-full md:w-6/12">
              <h1 className="fade-up pb-5 text-3xl lg:text-6xl font-extrabold">
                Premium Sound Experience <span ref={textRef} className="text-brandOrange">{words[0]}</span>
              </h1>

              <p className="fade-up text-sm sm:text-lg dark:text-darkText">
                Discover the perfect blend of cutting-edge technology and
                unmatched comfort with our exclusive range of headphones.
                Whether you're an audiophile, a gamer, or simply enjoy
                high-quality sound, our selection offers something for everyone.
              </p>

              <div className="fade-up mt-5">
                <button className="p-2 sm:p-3 bg-brandOrange rounded-md hover:-translate-y-1 duration-150 transition-all text-white">
                  Explore Now <i className='fa fa-arrow-right'></i>
                </button>
              </div>
            </div>

            {/* Right side - Modal / Product */}
            <div className="w-full md:w-6/12" ref={modalRef}>
              <LandingPage file="gltf/sony_headphone_wh-1000xm4.glb" />
            </div>
          </div>
        </div>
      </div>

      {/* Main body content */}
      <MainBody />
    </div>
  );
};
