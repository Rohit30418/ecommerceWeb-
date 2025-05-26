import React, { useState,useEffect } from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const RangeSlider = ({handalerangeVal,min,max}) => {



 const [range, setRange] = useState([min, max]);

  const handleSliderChange = (value) => {
    setRange(value);
    handalerangeVal(value);
  };


  useEffect(() => {
   setRange([min,max])
  }, [min,max])
  
 



  return (
    <div>

     <div className='flex items-center gap-3 w-full'>
      <div>
        <label>Min</label>
        <input value={range[0]} readOnly  className='ring-1 w-full text-center ring-slate-500 rounded-sm p-1 outline-none' type="text" />
      </div>

      -
      <div>
        <label>Max</label>
        <input value={range[1]} readOnly className='ring-1 w-full text-center ring-slate-500 rounded-sm p-1 outline-none' type="text" />
        </div>
     </div>


     <div className='w-full my-5 mx-1'>
      <Slider
        min={min}
        max={max}
        value={range}
        onChange={handleSliderChange}
        range
      />
    </div>
    </div>
  )
}

export default RangeSlider