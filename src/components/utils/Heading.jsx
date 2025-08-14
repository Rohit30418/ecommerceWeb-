import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(TextPlugin, ScrollTrigger);

const Heading = ({ title, textAlign }) => {
  const headingRef = useRef(null);

  useEffect(() => {
    const letters = headingRef?.current.querySelectorAll("span");

    gsap.fromTo(
      letters,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.05, // creates wave effect
        scrollTrigger: {
          trigger: headingRef.current,
          // start: "top -0%",
          // end: "bottom 30%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <h2
  ref={headingRef}
  className={`${textAlign === "text-left" ? "text-left" : "text-center"} text-lightText dark:text-darkText mb-8 lg:mb-16 font-bold text-4xl tinos-regular`}
>
  {title.split(" ").map((word, wi) => (
    <span key={wi} className="inline-block mr-2">
      {word.split("").map((char, ci) => (
        <span key={ci} className="inline-block">
          {char}
        </span>
      ))}
    </span>
  ))}
</h2>

  );
};

export default Heading;
