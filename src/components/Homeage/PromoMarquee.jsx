import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useSelector } from "react-redux";

const PromoMarquee = () => {
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
      ref={marqueeRef}
     
      className="relative bg-gray-200 my-24 dark:bg-gray-400/10  overflow-hidden flex items-center transform pt-14 pb-12 "
    >
      <div className="w-full py-3 transform">
        <div className="marquee-track flex items-center whitespace-nowrap gap-16 text-2xl font-bold text-black uppercase">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex items-center dark:text-white gap-3">
              <span>🔥 Flat 50% Off on Mobiles</span>
              <span className="text-xl">|</span>
              <span>⚡ Limited Time Only</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoMarquee;
