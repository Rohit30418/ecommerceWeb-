import React from 'react'
import Slider from 'react-slick';
const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    
  <div className="slider-container">
      <Slider {...settings}>
        <div>
          <div><img src="/images/banner1.jpg" alt="" srcset="" /></div>
        </div>
        <div>
        <div>
        <img src="/images/banner1.jpg" alt="" srcset="" />
        </div>
        </div>
        <div>
          <div>
          <img src="/images/banner1.jpg" alt="" srcset="" />
          </div>
        </div>
      </Slider>
    </div>
  )
}

export default Banner