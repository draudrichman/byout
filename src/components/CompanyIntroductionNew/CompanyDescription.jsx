"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const CompanyDescription = () => {
  const containerRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set initial states
    gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], {
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
            tl.to(line1Ref.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
            })
              .to(
                line2Ref.current,
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  ease: "power2.out",
                },
                "-=0.3"
              )
              .to(
                line3Ref.current,
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
            gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], {
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
      <div className="space-y-6 sm:space-y-8 md:space-y-10 max-w-5xl mx-auto px-4">
        <p
          ref={line1Ref}
          className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-white/85 font-songti tracking-widest font-light"
        >
          我们始于战略的顶层设计 · 精于技术的深度赋能 · 成于渠道的精准落地
        </p>
        <p
          ref={line2Ref}
          className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-white/85 font-songti tracking-widest font-light"
        >
          旨在解构并重塑您品牌与产品的全球影响力 · 行业竞争力 · 终端购买力
        </p>
        <p
          ref={line3Ref}
          className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-white/85 font-songti tracking-widest font-light"
        >
          将您的企业增长蓝图转化为实实在在的全球市场份额
        </p>
      </div>
    </div>
  );
};

export default CompanyDescription;
