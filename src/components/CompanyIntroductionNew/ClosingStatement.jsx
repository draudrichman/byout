"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const ClosingStatement = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    // Set initial state
    gsap.set(text, {
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

            // Animate text
            gsap.to(text, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            });
          }
          // Reset animation when panel is not visible
          else if (!entry.isIntersecting && entry.intersectionRatio < 0.1) {
            hasAnimatedRef.current = false;
            gsap.set(text, {
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
      className="mt-8 sm:mt-12 md:mt-16 mb-12 sm:mb-16 md:mb-20 overflow-hidden"
    >
      <p
        ref={textRef}
        className="text-xl sm:text-2xl md:text-3xl leading-7 sm:leading-8 text-white/90 max-w-4xl mx-auto transition-all duration-300 font-songti text-center tracking-[0.2em] md:tracking-[0.4em] px-2"
      >
        与 光 同 行 | 破 界 升 维
      </p>
    </div>
  );
};

export default ClosingStatement;
