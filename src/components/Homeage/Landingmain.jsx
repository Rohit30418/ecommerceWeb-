import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSelector } from 'react-redux';

import LandingPage from './Landingpage';
import Header from '../Header';
import MainBody from './MainBody';

gsap.registerPlugin(ScrollTrigger);

export const LandingMain = () => {
  const lightColor = useSelector((state) => state?.LightColor?.LightColor);
  const darkColor = useSelector((state) => state?.DarkColor?.DarkColor);

  const hero = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    // Animate text and button
    gsap.fromTo(
      gsap.utils.toArray('.fade-up'),
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.5, ease: 'power1.out' }
    );

    // Animate modal
    gsap.fromTo(
      modalRef.current,
      { x: 100, opacity: 0, duration: 2 },
      { x: 0, opacity: 1, delay: 2 }
    );
  }, []);

  useEffect(() => {
    // Scroll animation for hero section
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

  return (
    <div>
      {/* Main hero section */}
      <div
        // style={{ backgroundColor: lightColor }}
        className="relative  m-5 px-2 dark:bg-gray-500/20 rounded-md bg-gray-300 dark:text-darkText"
      >
        <div ref={hero}>
          <div className="flex flex-wrap items-center pl-5">
            {/* Left side - Text */}
            <div className="w-full md:w-6/12">
              <h1
                className="fade-up pb-5 text-4xl md:text-6xl lg:text-6xl font-extrabold"
               
              >
                Premium Sound Experience
              </h1>

              <p className="fade-up text-[#656565]">
                Discover the perfect blend of cutting-edge technology and
                unmatched comfort with our exclusive range of headphones.
                Whether you're an audiophile, a gamer, or simply enjoy
                high-quality sound, our selection offers something for everyone.
              </p>

              <div className="fade-up mt-5">
                <button
                 
                  className="p-3 bg-brandOrange rounded-md hover:-translate-y-1 duration-150 transition-all text-white"
                >
                  Explore Now <i className='fa fa-arrow-right'></i>
                </button>
              </div>
            </div>

            {/* Right side - Modal / Product */}
            <div className="w-full md:w-6/12" ref={modalRef}>
              <LandingPage />
            </div>
          </div>
        </div>
      </div>

      {/* Main body content */}
      <MainBody />
    </div>
  );
};
