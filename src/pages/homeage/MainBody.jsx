import React from 'react'
import { fetchApi } from '../../services/fetchApi'
import { useEffect } from 'react'
import ProductCard from '../../components/Product/ProductCard'
import Cardloader from '../../components/Product/Cardloader'
import Accordion from '../../ui/Accordion/Accordion'
import Testimonial from './Testimonial'
import Timer from '../../common/Timer'
import Heading from '../../common/Heading';
import BrandLogos from './BrandLogos'
import TopBlogs from './TopBlogs'
import PromoMarquee from './PromoMarquee';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from 'react';
import { toast } from 'react-toastify'



gsap.registerPlugin(ScrollTrigger);


const MainBody = () => {
  const { loading, response, error, apidata } = fetchApi();
  useEffect(() => {
    apidata("products/category/mobile-accessories/?limit=8");
  }, []);

  const cardsContainerRef = useRef(null);

useEffect(() => {
  if (!cardsContainerRef.current || !response?.products?.length) return;

  const cards = cardsContainerRef.current.children;

  gsap.from(cards, {
    y: 50,
    opacity: 0,
    scale: 0.9,
    duration: 0.8,
    ease: "back.out(1.7)",
    stagger: 0.2,
    scrollTrigger: {
      trigger: cardsContainerRef.current,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });
}, [response?.products]);


  useEffect(() => {
    const messages = [
      "John from New York just bought a Laptop!",
      "Emily from London purchased a Phone Case.",
      "Rajesh from Mumbai ordered a Bluetooth Speaker.",
      "Sophia from Sydney grabbed a pair of Sneakers.",
      "David from Toronto bought a Smartwatch."
    ];

    let index = 0;

    const interval = setInterval(() => {
      toast.success(messages[index], {
         icon: "🛒",
        position: "bottom-left",
        autoClose: 5000,
        className: "bg-brandOrange text-white font-semibold",
      });
      index = (index + 1) % messages.length; // loop through messages
    }, 20000); // every 10 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, []);


  if (loading) {
    return <div className='flex gap-4 flex-wrap'>
      <Cardloader></Cardloader>
      <Cardloader></Cardloader>
      <Cardloader></Cardloader>
      <Cardloader></Cardloader>
      <Cardloader></Cardloader>
      <Cardloader></Cardloader>
      <Cardloader></Cardloader>
    </div>
  }

  return (

    <div className='relative bg-lightBg dark:bg-darkBg'>

      <BrandLogos></BrandLogos>


{/* <div className='grid container grid-cols-2 gap-48'>
  <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/8f04e8224175213.6806b3dde77be.png" className='w-full ' alt='banner'></img>

  <img src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/d8703d224175213.6806b3debdc04.png" alt="banner" srcset="" className='w-full' />
</div> */}


      <div className="relative mt-14 z-[5] ">
        <Heading title={"Feature Products"}></Heading>


        <div className='container  mb-4'>
          <Timer></Timer>
        </div>

        <div ref={cardsContainerRef} className='grid  gap-5 px-5 grid-cols-2 xl:grid-cols-4  container'>
          {
            response?.products?.map((item, ind) => {
              return <ProductCard item={item} id={item.id} key={item.id}></ProductCard>
            })
          }
        </div>
      </div>

      <div>
        <PromoMarquee></PromoMarquee>
      </div>


      <div className='mb-20'>
        <img src="/images/banner1.jpg" alt="" srcset="banner" className='w-full' />
      </div>


      <div>
        {/* <LandingPage file={"gltf/iphone_14_pro.glb"}></LandingPage> */}
      </div>


      <div className="container">
        <div className='flex text-sm sm:text-[16px] flex-wrap my-5 px-5 gap-2 md:gap-0'>
          <div className='md:w-5/12'>
            <Heading textAlign={"text-left"} title={"Frequently Asked Questions"}></Heading>
            <p className='dark:text-lightBg '>Got questions? We’ve got answers.
              Find answers to the most common questions about our services, features, and support. If you don’t see your question here, feel free to reach out!</p>
          </div>
          <Accordion></Accordion>
        </div>
      </div>

      <Testimonial></Testimonial>

      <TopBlogs></TopBlogs>


      <section className="bg-white dark:bg-gray-900">
  <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-md sm:text-center">
        <Heading textAlign="text-center" title="Sign up for our newsletter"></Heading>
       
          <p className="mx-auto mb-8 max-w-2xl font-light text-gray-500 md:mb-12 text-sm sm:text-[16px] dark:text-gray-400">Stay up to date with the roadmap progress, announcements and exclusive discounts feel free to sign up with your email.</p>
          <form action="#">
              <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                  <div className="relative w-full">
                      <label for="email" className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                      </div>
                      <input className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter your email" type="email" id="email" required=""/>
                  </div>
                  <div>
                      <button type="submit" className="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-brandOrange border-primary-600 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Subscribe</button>
                  </div>
              </div>
              <div className="mx-auto max-w-screen-sm text-sm text-left text-gray-500 newsletter-form-footer dark:text-gray-300">We care about the protection of your data. <a href="#" className="font-medium text-primary-600 dark:text-primary-500 hover:underline">Read our Privacy Policy</a>.</div>
          </form>
      </div>
  </div>
</section>


    </div>
  )
}

export default MainBody