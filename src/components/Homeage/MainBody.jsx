import React from 'react'
import { fetchApi } from '../fatchApi/fetchApi'
import { useEffect } from 'react'
import ProductCard from '../Product/ProductCard'
import Cardloader from '../Product/Cardloader'
import Accordion from '../Acoordion/Accordion'
import Testimonial from './Testimonial'
import Timer from '../Timer/Timer'
import Heading from '../utils/Heading';
import BrandLogos from './BrandLogos'
import TopBlogs from './TopBlogs'
import PromoMarquee from './PromoMarquee';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from 'react';
import { toast } from 'react-toastify'
import Chatbot from '../../Chatbot'


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
    }, 10000); // every 10 seconds

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
      <Chatbot></Chatbot>
      <BrandLogos></BrandLogos>

      <div className="relative mt-14 z-[5] ">
        <Heading title={"Feature Products"}></Heading>


        <div className='container  mb-4'>
          <Timer></Timer>
        </div>

        <div ref={cardsContainerRef} className='grid  gap-5 sm:grid-cols-2 xl:grid-cols-4  container'>
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


      <div className="container">
        <div className='flex flex-wrap my-5 px-5 gap-2 md:gap-0'>
          <div className='md:w-5/12'>
            <Heading textAlign={"text-left"} title={"Frequently Asked Questions"}></Heading>
            <p className='dark:text-lightBg'>Got questions? We’ve got answers.
              Find answers to the most common questions about our services, features, and support. If you don’t see your question here, feel free to reach out!</p>
          </div>
          <Accordion></Accordion>
        </div>
      </div>

      <Testimonial></Testimonial>

      <TopBlogs></TopBlogs>


    </div>
  )
}

export default MainBody