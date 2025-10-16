"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const BrandPositioning = () => {
  const containerRef = useRef(null);
  const chineseText1Ref = useRef(null);
  const chineseText2Ref = useRef(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set initial states
    gsap.set([chineseText1Ref.current, chineseText2Ref.current], {
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

            // Animate lines one by one from bottom
            const tl = gsap.timeline();
            tl.to(chineseText1Ref.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
            }).to(
              chineseText2Ref.current,
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
              },
              "-=0.3"
            );
          }
          // Reset animation when panel is not visible
          else if (!entry.isIntersecting && entry.intersectionRatio < 0.1) {
            hasAnimatedRef.current = false;
            gsap.set([chineseText1Ref.current, chineseText2Ref.current], {
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
      className="mb-12 sm:mb-16 md:mb-20 overflow-hidden text-center"
    >
      <div className="space-y-4 sm:space-y-6 md:space-y-8">
        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          <p
            ref={chineseText1Ref}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-relaxed text-white/90 max-w-6xl mx-auto transition-all duration-300 font-chinese font-light"
          >
            品牌全球化价值重塑
          </p>
          <p
            ref={chineseText2Ref}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-relaxed text-white/90 max-w-6xl mx-auto transition-all duration-300 font-chinese font-light"
          >
            全域增长伙伴
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrandPositioning;
