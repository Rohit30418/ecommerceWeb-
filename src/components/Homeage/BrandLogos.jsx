import React from 'react';
import Slider from 'react-slick';
import { useSelector } from 'react-redux';
import Heading from '../utils/Heading';

const logos = [
  { name: "Amazon", src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Apple", src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { name: "Nike", src: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
  { name: "Samsung", src: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" },
  { name: "PayPal", src: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" },
  { name: "Sony", src: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Sony_logo.svg" },
];

const settings = {
  dots: false,
  infinite: true,
  speed: 800,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 5,
  slidesToScroll: 1,
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
  const LightColor = useSelector((state) => state.LightColor.LightColor);

  return (
    <div className="max-w-7xl mx-auto py-14 px-4" >
      <Heading title={"Trusted By Top Brands"} />
      <Slider {...settings}>
        {logos.map((brand, index) => (
          <div key={index} className="p-4 flex justify-center items-center" style={{ backgroundColor: LightColor }}>
            <img
              src={brand.src}
              alt={brand.name}
              className="h-12 object-contain grayscale hover:grayscale-0 transition duration-300"
              title={brand.name}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BrandLogos;
