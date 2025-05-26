import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import LandingPage from './Landingpage';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../Header';
import MainBody from './MainBody';
import { useSelector } from 'react-redux';
gsap.registerPlugin(ScrollTrigger);

export const LandingMain = () => {
 
    const lightColor = useSelector((state) => state?.LightColor?.LightColor);
    const darkColor = useSelector((state) => state?.DarkColor?.DarkColor);
  // const title1=useRef(null);
  const hero=useRef(null)

  useEffect(() => {
    // const element = scrollRef.current;
    // const width = element.scrollWidth / 2;
    // gsap.to(element, {
    //   x: -width,
    //   duration: 80,
    //   ease: 'linear',
    //   repeat: -1,
    //   modifiers: {
    //     x: gsap.utils.unitize(x => parseFloat(x) % width)
    //   }
    // });

    // const element2 = scrollRef2.current;
    // const width2 = element2.scrollWidth / 2;
    // gsap.to(element2, {
    //   x: width2,
    //   duration: 80,
    //   ease: 'linear',
    //   repeat: -1,
    //   modifiers: {
    //     x: gsap.utils.unitize(x => (parseFloat(x) - width2) % width2)
    //   }
    // });


    // gsap.to(title1.current.querySelector('h1'), {
    //   x: -500,
    //   duration: 10,
    //   ease: 'linear',
    //   scrollTrigger: {
    //     trigger: title1.current,
    //     start: 'top top',
    //     end: 'bottom bottom',
    //     scrub: 2,
    //     // pin:true,
    //     markers: true, // Enable markers for debugging
    //   },
    // });
    

   const element3=hero.current;
   

   gsap.to(element3, {
    // y:500,
    ease: 'linear',
    scrollTrigger: {
      trigger: element3.current,
      start: 'top 0',
      end: 'bottom 50%',
      scrub: 1,

      
    },
  });


  }, []);

  return (
    <>
    <div>
 

<div style={{"backgroundColor":`${lightColor}`}} className='relative py-5 px-2'>
<div ref={hero}>
{/* <div className="layer"></div>
<div className="layer"></div>
<div className="layer"></div> */}
      <div className='flex flex-wrap  items-center pl-5'>
        <div className='w-12/12 md:w-6/12'>
          <h1 className={`pb-5 text-[${darkColor}] text-4xl md:text-6xl  lg:text-8xl font-extrabold`}>Premium Sound Experience</h1>
          <p className='text-[#656565]'>
            Discover the perfect blend of cutting-edge technology and unmatched comfort with our exclusive range of headphones. Whether you're an audiophile, a gamer, or simply enjoy high-quality sound, our selection offers something for everyone.
          </p>

            <div className='mt-5'>
          <button style={{backgroundColor:darkColor}} className='p-3 text-white'>Explore Now</button>
         </div>
         
        </div>
        <div className='w-full md:w-6/12'>
          <LandingPage />
        </div>
      </div>

      {/* <div className='w-full my-5 hidden'>
    
        <div ref={title1} className='w-full md:w-12/12'>
          <ModalSpin></ModalSpin>
       <h1 className='absolute top-5 text-5xl' >Best sound quality</h1> 
      </div> 

      </div> */}

      {/* <div className='relative  overflow-hidden'>
        <div className='overflow-hidden whitespace-nowrap absolute top-8 hidden'>
          <div ref={scrollRef} className='inline-block'>
            <span className='text-white text-8xl uppercase opacity-55 px-4'>Premium Sound Experience</span>
            <span className='text-white text-8xl uppercase opacity-55 px-4'>Premium Sound Experience</span>
            <span className='text-white text-8xl uppercase opacity-55 px-4'>Premium Sound Experience</span>
            <span className='text-white text-8xl uppercase opacity-55 px-4'>Premium Sound Experience</span>
            <span className='text-white text-8xl uppercase opacity-55 px-4'>Premium Sound Experience</span>
            <span className='text-white text-8xl uppercase opacity-55 px-4'>Premium Sound Experience</span>
            <span className='text-white text-8xl uppercase opacity-55 px-4'>Premium Sound Experience</span>
            <span className='text-white text-8xl uppercase opacity-55 px-4'>Premium Sound Experience</span>
          </div>
        </div> */}


        {/* <div className='overflow-hidden whitespace-nowrap absolute bottom-8 hidden'>
          <div ref={scrollRef2} className='inline-block'>
            <span className='text-white text-8xl uppercase opacity-55 px-4'>Premium Sound Experience</span>
            <span className='text-white text-8xl uppercase opacity-55 px-4'>Premium Sound Experience</span>
            <span className='text-white text-8xl uppercase opacity-55 px-4'>Premium Sound Experience</span>
            <span className='text-white text-8xl uppercase opacity-55 px-4'>Premium Sound Experience</span>
            <span className='text-white text-8xl uppercase opacity-55 px-4'>Premium Sound Experience</span>
            <span className='text-white text-8xl uppercase opacity-55 px-4'>Premium Sound Experience</span>
            <span className='text-white text-8xl uppercase opacity-55 px-4'>Premium Sound Experience</span>
            <span className='text-white text-8xl uppercase opacity-55 px-4'>Premium Sound Experience</span>
          </div>
        </div>
      </div> */}

     

    </div>

</div>
    <MainBody></MainBody>
   
   
   </div>
    </>
  );
};


