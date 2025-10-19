"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BrandPositioning = () => {
  const containerRef = useRef(null);
  const chineseText1Ref = useRef(null);
  const chineseText2Ref = useRef(null);
  const englishText1Ref = useRef(null);
  const englishText2Ref = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Split text function for character-by-character animation
    const splitTextIntoSpans = (element) => {
      if (!element) return;
      const text = element.textContent;
      element.innerHTML = text
        .split("")
        .map(
          (char) =>
            `<span class="inline-block">${
              char === " " ? "&nbsp;" : char
            }</span>`
        )
        .join("");
    };

    // Split all text elements
    splitTextIntoSpans(chineseText1Ref.current);
    splitTextIntoSpans(chineseText2Ref.current);
    splitTextIntoSpans(englishText1Ref.current);
    splitTextIntoSpans(englishText2Ref.current);

    // Animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top bottom-=10%",
        end: "bottom center+=20%",
        scrub: 1,
        markers: true,
      },
    });

    // Chinese text 1 - Elegant fade up with scale
    tl.fromTo(
      chineseText1Ref.current.querySelectorAll("span"),
      {
        opacity: 0,
        y: 60,
        scale: 0.8,
        rotationX: 90,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
        stagger: {
          each: 0.05,
          from: "start",
        },
      },
      0
    );

    // Chinese text 2 - Wave-like entrance
    tl.fromTo(
      chineseText2Ref.current.querySelectorAll("span"),
      {
        opacity: 0,
        y: 40,
        scaleY: 0.3,
        skewX: 15,
      },
      {
        opacity: 1,
        y: 0,
        scaleY: 1,
        skewX: 0,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
        stagger: {
          each: 0.04,
          from: "center",
        },
      },
      0.3
    );

    // English text 1 - Typewriter effect with glow
    tl.fromTo(
      englishText1Ref.current.querySelectorAll("span"),
      {
        opacity: 0,
        x: -20,
        filter: "blur(10px)",
      },
      {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power2.out",
        stagger: {
          each: 0.03,
          from: "start",
        },
      },
      0.6
    );

    // English text 2 - Morphing entrance
    tl.fromTo(
      englishText2Ref.current.querySelectorAll("span"),
      {
        opacity: 0,
        scale: 0,
        rotation: 180,
        transformOrigin: "center center",
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1,
        ease: "back.out(2)",
        stagger: {
          each: 0.06,
          from: "random",
        },
      },
      0.9
    );

    // Container fade-in effect
    gsap.fromTo(
      container,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top bottom-=10%",
          end: "top center",
          scrub: false,
        },
      }
    );

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="mb-8 sm:mb-10 overflow-hidden">
      <p
        ref={chineseText1Ref}
        className="text-base sm:text-lg leading-6 sm:leading-7 text-white/90 mb-1 sm:mb-2 max-w-4xl mx-auto transition-all duration-300 font-chinese font-light"
      >
        品牌全球化价值重塑
      </p>
      <p
        ref={chineseText2Ref}
        className="text-base sm:text-lg leading-6 sm:leading-7 text-white/90 mb-2 sm:mb-3 max-w-4xl mx-auto transition-all duration-300 font-chinese font-light"
      >
        全域增长伙伴
      </p>
      <p
        ref={englishText1Ref}
        className="text-sm sm:text-base leading-5 sm:leading-6 text-white/70 mb-1 sm:mb-2 max-w-4xl mx-auto transition-all duration-300"
      >
        Global Brand Value
      </p>
      <p
        ref={englishText2Ref}
        className="text-sm sm:text-base leading-5 sm:leading-6 text-white/70 mb-12 sm:mb-16 max-w-4xl mx-auto transition-all duration-300"
      >
        Innovation & Growth Partner
      </p>
    </div>
  );
};

export default BrandPositioning;
