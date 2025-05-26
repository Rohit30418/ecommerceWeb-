import React from 'react';
import Slider from 'react-slick';
import { useSelector } from 'react-redux';
import Heading from '../utils/Heading';

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
  dots: true,
  infinite: true,
  speed: 700,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2 }
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 1 }
    }
  ]
};

const TopBlogs = () => {
  const color = useSelector((state) => state.color.color);

  return (
    <div className=" mx-auto py-14  px-4">
      <Heading title="Our Top Blogs" />

     <div className='container'>
     <Slider {...settings}>
        {blogData.map((blog, index) => (
          <div key={index} className="p-4">
            <div className="bg-white rounded-xl  overflow-hidden shadow-md h-full flex flex-col">
              <img src={blog.image} alt={blog.title} className="h-48 w-full object-cover" />
              <div className="p-4 h-full min-h-52 flex flex-col justify-between flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{blog.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{blog.snippet}</p>
                <a
                  href={blog.link}
                  className="inline-block mt-auto text-white text-center text-sm bg-black px-4 py-2 rounded-md hover:bg-opacity-80 transition"
                  style={{ backgroundColor: color }}
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </Slider>
     </div>
    </div>
  );
};

export default TopBlogs;
