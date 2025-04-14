import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const AcoordionItem = ({faq,handleClick,id,isActive}) => {

 const [isopen,setisopen]=useState(null); 

 const color=useSelector((state)=>state?.LightColor?.LightColor);
 
function handleSubAccordian(ind) {
  setisopen(prev=>prev==ind?"null":ind)
}
  return (
    <div className='mb-2'>
          <button className='px-2 text-black py-3 text-md flex items-center justify-between gap-3 w-full  text-left rounded-lg  font-medium' onClick={()=>{
            handleClick(id)
          }}   style={{"backgroundColor":`${color}`}} >{faq?.question}  <i className='fa fa-angle-down'></i></button>
        {
             isActive && <div className='shadow-lg py-3 px-1'>
               <p>{faq.answer}</p>
           </div>
        }
    </div>
  )
}

export default AcoordionItem