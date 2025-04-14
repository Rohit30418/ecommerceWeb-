import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useSelector } from "react-redux";


const PromoMarquee = () => {
const darkColor=useSelector((state)=>state?.DarkColor?.DarkColor);
  const marqueeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".marquee-track", {
        xPercent: -50,
        repeat: -1,
        duration: 20,
        ease: "linear",
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={marqueeRef} style={{"backgroundColor":darkColor}}
      className="relative overflow-hidden flex items-center transform pt-14 pb-12 my-14 "
    >
      <div className="w-full py-3 transform ">
        <div className="marquee-track  flex items-center whitespace-nowrap gap-16 text-lg font-semibold text-black uppercase">
          {Array(6).fill(
            <div className="flex items-center text-white gap-3">
              <span>🔥 Flat 50% Off on Mobiles</span>
              <span className="text-xl">|</span>
              <span>⚡ Limited Time Only</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PromoMarquee;
