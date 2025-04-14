import React from 'react'
import { useSelector } from 'react-redux';

export const Starrate = ({rating}) => {
    const darkColor=useSelector((state)=>state?.DarkColor?.DarkColor);
    console.log();
    
  const element=[];
  for (let index = 0; index <= 4; index++) {
    element.push( <i
      className="fa fa-star"
      style={{ color: index >= rating ? "#565656" : darkColor }} // #d1d5db = tailwind's text-gray-400
    ></i>
    )
  }

  return (
    <div>
    
     {
      element
     }

    </div>
  )
}
