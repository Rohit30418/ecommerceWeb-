import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Timer = () => {
  const darkColor = useSelector((state) => state?.DarkColor?.DarkColor);

  const calculateTimeLeft = () => {
    const futureDate = new Date(2025, 10, 12); // November 12, 2025
    const currentDate = new Date();

    const timeDiff = futureDate - currentDate;

    let days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup
  }, []);

  const boxStyle = {
    backgroundColor: darkColor,
  };

  const timeUnitClass = "w-14 h-14  flex items-center justify-center rounded-md text-white";

  return (
    <div className="flex px-5 mb-4 justify-end text-center items-center gap-5">
      <small className={timeUnitClass} style={boxStyle}>
        {timeLeft.days} Days
      </small>
      <small className={timeUnitClass} style={boxStyle}>
        {timeLeft.hours <= 9 && timeLeft.hours >= 0 ? '0' + timeLeft.hours : timeLeft.hours} Hours
      </small>
      <small className={timeUnitClass} style={boxStyle}>
        {timeLeft.minutes <= 9 && timeLeft.minutes >= 0 ? '0' + timeLeft.minutes : timeLeft.minutes} Minutes
      </small>
      <small className={timeUnitClass} style={boxStyle}>
        {timeLeft.seconds <= 9 && timeLeft.seconds >= 0 ? '0' + timeLeft.seconds : timeLeft.seconds} Seconds
      </small>
    </div>
  );
};

export default Timer;
