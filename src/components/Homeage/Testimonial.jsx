import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Heading from '../utils/Heading';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "I recently purchased a new laptop from this e-commerce site...",
    name: "Jane D.",
    role: "Verified Buyer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5
  },
  {
    quote: "Been shopping here for over a year. Love the variety and prices.",
    name: "Mark S.",
    role: "Loyal Customer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.5
  },
  {
    quote: "Best shopping experience. Smooth checkout and fast delivery!",
    name: "Emily R.",
    role: "Satisfied Shopper",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
    rating: 5
  },
  {
    quote: "Great deals! Saved a lot on home appliances. Super happy!",
    name: "Alex P.",
    role: "Bargain Hunter",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: 4
  },
  {
    quote: "Great deals! Saved a lot on home appliances. Super happy!",
    name: "Alex P.",
    role: "Bargain Hunter",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: 4
  },{
    quote: "Great deals! Saved a lot on home appliances. Super happy!",
    name: "Alex P.",
    role: "Bargain Hunter",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: 4
  }
];

// Render Font Awesome stars
const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<i key={i} className="fas fa-star text-brandOrange"></i>);
    } else if (rating >= i - 0.5) {
      stars.push(<i key={i} className="fas fa-star-half-alt text-brandOrange"></i>);
    } else {
      stars.push(<i key={i} className="far fa-star text-brandOrange"></i>);
    }
  }
  return stars;
};

const Testimonial = () => {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const cardsRef = useRef([]);

 useEffect(() => {
  cardsRef.current.forEach((card) => {
    gsap.from(card, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  });
}, []);


  const handleMouseEnter = (e) => {
    const cardRect = e.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    gsap.to(bgRef.current, {
      top: cardRect.top - containerRect.top,
      left: cardRect.left - containerRect.left,
      width: cardRect.width,
      height: cardRect.height,
      duration: 0.5,
      ease: "power3.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(bgRef.current, {
      width: 0,
      height: 0,
      duration: 0.3,
      ease: "power3.out"
    });
  };

  return (
    <div className="w-full bg-white dark:bg-darkBg dark:text-white text-black">
      <div className="max-w-7xl mx-auto py-14 px-4 relative" ref={containerRef}>
        <Heading title={"What Our Customers Say"} />

        {/* Shared hover background */}
        <div
          ref={bgRef}
          className="absolute bg-brandOrange/30 rounded-2xl z-0 pointer-events-none"
          style={{ width: 0, height: 0, top: 0, left: 0 }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="dark:bg-gray-400/20  p-6 rounded-2xl h-full transition-all  flex flex-col justify-between border"
            
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex flex-col items-center text-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full object-cover border-2"
                  
                />
                <p className="italic text-sm">"{testimonial.quote}"</p>
                <div className="flex gap-1">{renderStars(testimonial.rating)}</div>
                <div>
                  <p className="font-semibold text-lg text-gray-800 dark:text-white">{testimonial.name}</p>
                  <p className="text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
