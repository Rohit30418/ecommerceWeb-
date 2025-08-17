import React from 'react'
import { useState } from 'react'

const ChatBot = () => {
const [isOpen,setIsOpen]=useState(false);
  return (
    <div>
       
      {isOpen &&  <div className='hidden shadow-md fixed bottom-[100px] right-2 cursor-pointer z-10 bg-green-500 rounded-md h-72 w-80'>
        <span onClick={()=>{
            setIsOpen(false)
        }}><i className='fa fa-times absolute right-5 flex justify-center items-center bg-red-600 text-white w-7 h-7 rounded-full '></i></span>
       <embed src="https://www.hrani.net.in/mobileApp/virtual-assistance.html" type="" className='w-full h-full' />
       </div>}


      
    </div>
  )
}

export default ChatBot