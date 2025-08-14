import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const AcoordionItem = ({faq,handleClick,id,isActive}) => {

 const [isopen,setisopen]=useState(null); 

 
function handleSubAccordian(ind) {
  setisopen(prev=>prev==ind?"null":ind)
}
  return (
    <div className='mb-2'>
          <button className='px-2 py-3 text-md flex items-center justify-between gap-3 w-full  text-left rounded-lg  font-medium transition-all duration-150 dark:bg-gray-400/20 bg-gray-200 hover:bg-brandOrange hover:text-white dark:text-white' onClick={()=>{
            handleClick(id)
          }}   >{faq?.question}  <i className={`fa fa-angle-down`}></i></button>
        {
             isActive && <div className='shadow-lg py-3 px-1'>
               <p className='dark:text-darkText'>{faq.answer}</p>
           </div>
        }
    </div>
  )
}

export default AcoordionItem