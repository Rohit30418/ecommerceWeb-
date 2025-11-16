import React from 'react';
import Slider from 'react-slick';
import { useSelector } from 'react-redux';

const logos = [
  { name: "Amazon", src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Apple", src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { name: "Nike", src: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
  { name: "Samsung", src: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" },
  { name: "PayPal", src: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" },
  { name: "Google", src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Microsoft", src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { name: "Adidas", src: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
];

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 0, // continuous
  speed: 4000, // slow and smooth
  cssEase: 'linear', // linear easing
  slidesToShow: 6,
  slidesToScroll: 1,
  pauseOnHover: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2
      }
    }
  ]
};

const BrandLogos = () => {

  return (
    <div className="mx-auto px-4  bg-brandOrange">
      <Slider {...settings}>
        {logos.map((brand, index) => (
          <div
            key={index}
            className="p-4 flex justify-center  items-center"
            
          >
            <div className="h-28 flex p-3 items-center bg-gray-200 dark:bg-gray-400/20 rounded-md py-8 justify-center w-full">
              <img
                src={brand.src}
                alt={brand.name}
                className="h-full w-full object-contain "
                title={brand.name}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BrandLogos;
