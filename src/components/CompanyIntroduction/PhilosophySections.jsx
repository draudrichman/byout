"use client";
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const PhilosophySections = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const philosophySections = container.querySelectorAll('.philosophy-section');
    const rectangles = container.querySelectorAll('.philosophy-rect');

    gsap.set(philosophySections, {
      opacity: 1,
    });

    gsap.set(rectangles, {
      opacity: 0,
      scale: 0,
      transformOrigin: "center",
    });

    ScrollTrigger.batch(philosophySections, {
      onEnter: (elements) => {
        elements.forEach((element, index) => {
          const rect = element.querySelector('.philosophy-rect');
          
          if (rect) {
            const tl = gsap.timeline({ delay: index * 0.08 });
            tl.fromTo(rect, {
              opacity: 0,
              scale: 0,
              transformOrigin: "center",
            }, {
              opacity: 0.3,
              scale: 1,
              transformOrigin: "center",
              duration: 0.4,
              ease: "power2.out",
            })
            .to(rect, {
              opacity: 0,
              scale: 1.1,
              duration: 0.2,
              ease: "power2.in",
            });
          }
        });
      },
      onLeave: (elements) => {
        elements.forEach((element) => {
          const rect = element.querySelector('.philosophy-rect');
          if (rect) {
            gsap.set(rect, {
              opacity: 0,
              scale: 0,
            });
          }
        });
      },
      onEnterBack: (elements) => {
        elements.forEach((element, index) => {
          const rect = element.querySelector('.philosophy-rect');
          
          if (rect) {
            const tl = gsap.timeline({ delay: index * 0.08 });
            tl.fromTo(rect, {
              opacity: 0,
              scale: 0,
              transformOrigin: "center",
            }, {
              opacity: 0.3,
              scale: 1,
              transformOrigin: "center",
              duration: 0.4,
              ease: "power2.out",
            })
            .to(rect, {
              opacity: 0,
              scale: 1.1,
              duration: 0.2,
              ease: "power2.in",
            });
          }
        });
      },
      onLeaveBack: (elements) => {
        elements.forEach((element) => {
          const rect = element.querySelector('.philosophy-rect');
          if (rect) {
            gsap.set(rect, {
              opacity: 0,
              scale: 0,
            });
          }
        });
      },
      start: "top 85%",
      end: "bottom -10%"
    });

    return () => {
      // Cleanup function
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="mb-12 sm:mb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 items-start philosophy-container">
      {/* 破界 */}
      <div className="px-4 py-4 relative philosophy-section min-h-[120px] sm:min-h-[140px]">
        <div className="philosophy-rect absolute -inset-2 opacity-0 scale-0">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20"></div>
        </div>
        <h3 className="text-base sm:text-lg font-medium text-white/90 mb-3 sm:mb-4 font-chinese relative z-10 leading-tight">
          破界 <span className="text-white/70 text-sm sm:text-base font-normal">(Break Boundaries):</span>
        </h3>
        <p className="text-sm sm:text-base leading-relaxed text-white/80 transition-all duration-300 font-chinese relative z-10">
          破市场之界、技术之界、渠道之界、增长之界。
        </p>
      </div>

      {/* 有光 */}
      <div className="px-4 py-4 relative philosophy-section min-h-[120px] sm:min-h-[140px]">
        <div className="philosophy-rect absolute -inset-2 opacity-0 scale-0">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20"></div>
        </div>
        <h3 className="text-base sm:text-lg font-medium text-white/90 mb-3 sm:mb-4 font-chinese relative z-10 leading-tight">
          有光 <span className="text-white/70 text-sm sm:text-base font-normal">(Guidance Light):</span>
        </h3>
        <p className="text-sm sm:text-base leading-relaxed text-white/80 transition-all duration-300 font-chinese relative z-10">
          以光破界，为破界之路提供指引之光（战略之光、技术之光、方法之光）。
        </p>
      </div>

      {/* 落地 */}
      <div className="px-4 py-4 relative philosophy-section min-h-[120px] sm:min-h-[140px]">
        <div className="philosophy-rect absolute -inset-2 opacity-0 scale-0">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20"></div>
        </div>
        <h3 className="text-base sm:text-lg font-medium text-white/90 mb-3 sm:mb-4 font-chinese relative z-10 leading-tight">
          落地 <span className="text-white/70 text-sm sm:text-base font-normal">(Results Oriented):</span>
        </h3>
        <p className="text-sm sm:text-base leading-relaxed text-white/80 transition-all duration-300 font-chinese relative z-10">
          将全球化资源，认知，洞察转化为一步一脚印的扎实执行，实现知行合一。
        </p>
      </div>

      {/* 成境 */}
      <div className="px-4 py-4 relative philosophy-section min-h-[120px] sm:min-h-[140px]">
        <div className="philosophy-rect absolute -inset-2 opacity-0 scale-0">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20"></div>
        </div>
        <h3 className="text-base sm:text-lg font-medium text-white/90 mb-3 sm:mb-4 font-chinese relative z-10 leading-tight">
          成境 <span className="text-white/70 text-sm sm:text-base font-normal">(Create New Realms):</span>
        </h3>
        <p className="text-sm sm:text-base leading-relaxed text-white/80 transition-all duration-300 font-chinese relative z-10">
          我们最终为品牌开疆扩土，创造出一片可持续增长的新境界、新天地。
        </p>
      </div>
    </div>
  );
};

export default PhilosophySections;
