import React from 'react';
import Slider from 'react-slick';
import Heading from '../../common/Heading';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const blogData = [
  {
    title: "5 Tips to Boost Your Online Sales",
    image: "https://images.unsplash.com/photo-1688561808434-886a6dd97b8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    snippet: "Discover easy and effective strategies to drive more sales and improve customer engagement on your store.",
    link: "#"
  },
  {
    title: "How to Create a Killer Product Page",
    image: "https://images.unsplash.com/photo-1688561808434-886a6dd97b8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    snippet: "Product pages are make-or-break. Here’s how to make them look irresistible to your buyers.",
    link: "#"
  },
  {
    title: "Top 10 Trending Products in 2025",
    image: "https://images.unsplash.com/photo-1688561808434-886a6dd97b8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    snippet: "Stay ahead of the market with this curated list of products customers are loving right now.",
    link: "#"
  },
  {
    title: "Why Customer Reviews Are Crucial",
    image: "https://images.unsplash.com/photo-1688561808434-886a6dd97b8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    snippet: "Social proof can skyrocket your conversions. Learn how to encourage and manage reviews effectively.",
    link: "#"
  },
  {
    title: "Guide to Building Brand Loyalty",
    image: "https://images.unsplash.com/photo-1688561808434-886a6dd97b8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    snippet: "Loyal customers spend more and refer others. Here's how to keep them coming back.",
    link: "#"
  }
];

const settings = {
  infinite: true,
  speed: 700,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 768, settings: { slidesToShow: 1 } }
  ]
};

const TopBlogs = () => {
  return (
    <div className="mx-auto py-14 px-4">
      <Heading title="Our Top Blogs" />
      <div className="container">
        <Slider {...settings}>
          {blogData.map((blog, index) => {
            const overlayRef = React.useRef(null);

            const handleMouseEnter = () => {
              if (!overlayRef.current) return;
              gsap.to(overlayRef.current, { y: '0%', opacity: 0.8, duration: 0.5, ease: "power1.out" });
            };

            const handleMouseLeave = () => {
              if (!overlayRef.current) return;
              gsap.to(overlayRef.current, { y: '-100%', opacity: 0, duration: 0.5, ease: "power1.in" });
            };

            return (
              <div
                key={index}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="p-4"
              >
                <div className="bg-gray-400/20 rounded-xl p-4 dark:text-white overflow-hidden shadow-md h-full flex flex-col">
                  <div className='h-[200px] relative overflow-hidden rounded-md bg-red-500'>
                    <span
                      ref={overlayRef}
                      className='absolute w-full h-full top-0 left-0 bg-white opacity-0'
                      style={{ transform: 'translateY(-100%)' }}
                    ></span>
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="h-full rounded-md w-full object-cover"
                    />
                  </div>
                  <div className="h-full mt-4 min-h-40 flex flex-col justify-between flex-grow">
                    <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                    <p className="mb-4 text-sm">{blog.snippet}</p>
                    <a
                      href={blog.link}
                      className="inline-block mt-auto text-white text-center text-sm bg-brandOrange px-4 py-2 rounded-md hover:bg-opacity-80 transition"
                      aria-label='Read more about the blog'
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </Slider>
      </div>
    </div>
  );
};

export default TopBlogs;
