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


        <img onClick={()=>{
            setIsOpen(true)
        }} src="https://miro.medium.com/v2/resize:fit:1200/1*9I6EIL5NG20A8se5afVmOg.gif" className='w-[70px] h-[70px] fixed right-2 bottom-8 rounded-full shadow-lg cursor-pointer bg-green-500 mix z-50' alt="" />
    </div>
  )
}

export default ChatBot