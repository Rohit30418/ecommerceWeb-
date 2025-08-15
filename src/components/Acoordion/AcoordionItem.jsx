import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux';
import gsap from 'gsap';

const AcoordionItem = ({faq,handleClick,id,isActive}) => {
  const answerRef = useRef(null);

  useEffect(() => {
    if (!answerRef.current) return;

    if (isActive) {
      gsap.fromTo(
        answerRef.current,
        { height: 0, opacity: 0 },
        {
          height: answerRef.current.scrollHeight,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
          onComplete: () => {
            gsap.set(answerRef.current, { height: 'auto' });
          }
        }
      );
    } else {
      gsap.to(answerRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  }, [isActive]);

  return (
    <div className='mb-2'>
      <button
        className='px-2 py-3 text-md flex items-center justify-between gap-3 w-full text-left rounded-lg font-medium transition-all duration-150 dark:bg-gray-400/20 bg-gray-200 hover:bg-brandOrange hover:text-white dark:text-white'
        onClick={() => handleClick(id)}
      >
        {faq?.question} <i className={`fa fa-angle-down`}></i>
      </button>
      <div
        ref={answerRef}
        style={{ overflow: 'hidden', opacity: isActive ? 1 : 0 }}
      >
        {isActive && (
          <div className='shadow-lg py-3 px-1'>
            <p className='dark:text-darkText'>{faq.answer}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AcoordionItem