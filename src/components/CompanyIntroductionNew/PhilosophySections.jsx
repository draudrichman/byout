"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const PhilosophySections = () => {
  const containerRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = [
      section1Ref.current,
      section2Ref.current,
      section3Ref.current,
      section4Ref.current,
    ];

    // Set initial states for all sections
    gsap.set(sections, {
      opacity: 0,
      y: 30,
    });

    // Use IntersectionObserver to detect when panel becomes visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When panel becomes visible and hasn't animated yet
          if (
            entry.isIntersecting &&
            entry.intersectionRatio > 0.5 &&
            !hasAnimatedRef.current
          ) {
            hasAnimatedRef.current = true;

            // Animate sections one by one
            const tl = gsap.timeline();
            sections.forEach((section, index) => {
              tl.to(
                section,
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  ease: "power2.out",
                },
                index === 0 ? 0 : "-=0.3"
              );
            });
          }
          // Reset animation when panel is not visible
          else if (!entry.isIntersecting && entry.intersectionRatio < 0.1) {
            hasAnimatedRef.current = false;
            gsap.set(sections, {
              opacity: 0,
              y: 30,
            });
          }
        });
      },
      {
        threshold: [0, 0.1, 0.5, 1],
      }
    );

    observer.observe(container);

    // Cleanup function
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="mb-12 sm:mb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 items-start philosophy-container overflow-hidden"
    >
      {/* 破界 */}
      <div
        ref={section1Ref}
        className="px-4 py-4 relative philosophy-section min-h-[120px] sm:min-h-[140px]"
      >
        <div className="philosophy-rect absolute -inset-2">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20"></div>
        </div>
        <h3 className="text-base sm:text-lg font-medium text-white/90 mb-3 sm:mb-4 font-songti relative z-10 leading-tight">
          破界{" "}
          <span className="text-white/70 text-sm sm:text-base font-normal">
            (Break Boundaries):
          </span>
        </h3>
        <p className="text-sm sm:text-base leading-relaxed text-white/80 transition-all duration-300 font-songti relative z-10">
          破市场之界、技术之界、渠道之界、增长之界。
        </p>
      </div>

      {/* 有光 */}
      <div
        ref={section2Ref}
        className="px-4 py-4 relative philosophy-section min-h-[120px] sm:min-h-[140px]"
      >
        <div className="philosophy-rect absolute -inset-2">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20"></div>
        </div>
        <h3 className="text-base sm:text-lg font-medium text-white/90 mb-3 sm:mb-4 font-songti relative z-10 leading-tight">
          有光{" "}
          <span className="text-white/70 text-sm sm:text-base font-normal">
            (Guidance Light):
          </span>
        </h3>
        <p className="text-sm sm:text-base leading-relaxed text-white/80 transition-all duration-300 font-songti relative z-10">
          以光破界，为破界之路提供指引之光（战略之光、技术之光、方法之光）。
        </p>
      </div>

      {/* 落地 */}
      <div
        ref={section3Ref}
        className="px-4 py-4 relative philosophy-section min-h-[120px] sm:min-h-[140px]"
      >
        <div className="philosophy-rect absolute -inset-2">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20"></div>
        </div>
        <h3 className="text-base sm:text-lg font-medium text-white/90 mb-3 sm:mb-4 font-songti relative z-10 leading-tight">
          落地{" "}
          <span className="text-white/70 text-sm sm:text-base font-normal">
            (Results Oriented):
          </span>
        </h3>
        <p className="text-sm sm:text-base leading-relaxed text-white/80 transition-all duration-300 font-songti relative z-10">
          将全球化资源，认知，洞察转化为一步一脚印的扎实执行，实现知行合一。
        </p>
      </div>

      {/* 成境 */}
      <div
        ref={section4Ref}
        className="px-4 py-4 relative philosophy-section min-h-[120px] sm:min-h-[140px]"
      >
        <div className="philosophy-rect absolute -inset-2">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20"></div>
        </div>
        <h3 className="text-base sm:text-lg font-medium text-white/90 mb-3 sm:mb-4 font-songti relative z-10 leading-tight">
          成境{" "}
          <span className="text-white/70 text-sm sm:text-base font-normal">
            (New Realms):
          </span>
        </h3>
        <p className="text-sm sm:text-base leading-relaxed text-white/80 transition-all duration-300 font-songti relative z-10">
          我们最终为品牌开疆扩土，创造出一片可持续增长的新境界、新天地。
        </p>
      </div>
    </div>
  );
};

export default PhilosophySections;
