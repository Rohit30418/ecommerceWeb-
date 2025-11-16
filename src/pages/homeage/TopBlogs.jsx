import React from 'react';
import Slider from 'react-slick';
import Heading from '../../common/Heading';
import LazyImg from '../../common/LazyImg';

const blogData = [
  {
    title: "5 Tips to Boost Your Online Sales",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop",
    snippet: "Discover easy and effective strategies to drive more sales and improve customer engagement on your store.",
    link: "#"
  },
  {
    title: "How to Create a Killer Product Page",
    image: "https://images.unsplash.com/photo-1611078489935-c31a92f9e480?q=80&w=2070&auto=format&fit=crop",
    snippet: "Product pages are make-or-break. Here’s how to make them look irresistible to your buyers.",
    link: "#"
  },
  {
    title: "Top 10 Trending Products in 2025",
    image: "https://images.unsplash.com/photo-1607083209539-3e1e0b1b9d7c?q=80&w=2070&auto=format&fit=crop",
    snippet: "Stay ahead of the market with this curated list of products customers are loving right now.",
    link: "#"
  },
  {
    title: "Why Customer Reviews Are Crucial",
    image: "https://images.unsplash.com/photo-1581093588401-22f0641c14a3?q=80&w=2070&auto=format&fit=crop",
    snippet: "Social proof can skyrocket your conversions. Learn how to encourage and manage reviews effectively.",
    link: "#"
  },
  {
    title: "Guide to Building Brand Loyalty",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
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
          {blogData.map((blog, index) => (
            <div key={index} className="p-4">
              <div className="rounded-xl p-4 dark:text-white overflow-hidden shadow-md h-full flex flex-col transition-transform hover:scale-[1.02] duration-300">
                <div className="h-[200px] relative overflow-hidden rounded-md">
                  <LazyImg
                    alt={blog.title}
                    src={blog.image}
                    className="h-full w-full object-cover rounded-md"
                  />
                </div>
                <div className="h-full mt-4 min-h-40 flex flex-col justify-between flex-grow">
                  <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">{blog.snippet}</p>
                  <a
                    href={blog.link}
                    className="inline-block mt-auto text-white text-center text-sm bg-brandOrange px-4 py-2 rounded-md hover:bg-opacity-90 transition duration-300"
                    aria-label={`Read more about ${blog.title}`}
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
