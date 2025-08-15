import React, { useState,useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Timer = () => {
  const timeRef=useRef(null);
  const calculateTimeLeft = () => {
    const futureDate = new Date(2025, 10, 12); // November 12, 2025
    const currentDate = new Date();
    const timeDiff = futureDate - currentDate;

    return {
      days: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((timeDiff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((timeDiff / (1000 * 60)) % 60),
      seconds: Math.floor((timeDiff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(()=>{
    if (!timeRef.current) return;
    gsap.from(
    timeRef.current.querySelectorAll("div")
,{      duration: 0.8,
    ease: "back.out(1.7)",
    y:10,
    stagger: 0.1,
       opacity:0,
       scrollTrigger:{
        trigger: timeRef.current,
       
        start: "top 100%",
        toggleActions: "play none none reverse",
         opacity:1,
       }
      }
      
    )
  },[])

  const padTime = (value) => (value < 10 ? `0${value}` : value);

  const timeBoxClass =
    "flex flex-col items-center bg-brandOrange justify-center w-16 h-16 sm:w-16 sm:h-16 rounded-xl text-white shadow-md";
  const labelClass = "text-xs sm:text-sm mt-1 font-medium text-white/80";

  return (
    <div ref={timeRef} className="flex flex-wrap gap-4  mb-6 justify-end sm:justify-end">
      {[
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: padTime(timeLeft.hours) },
        { label: "Minutes", value: padTime(timeLeft.minutes) },
        { label: "Seconds", value: padTime(timeLeft.seconds) },
      ].map((unit) => (
        <div  key={unit.label} className={timeBoxClass}>
          <div className="text-lg sm:text-xl font-semibold">{unit.value}</div>
          <div className={labelClass}>{unit.label}</div>
        </div>
      ))}
    </div>
  );
};

export default Timer;
