"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ClosingStatement = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    // Split text function for character-by-character animation
    const splitTextIntoSpans = (element) => {
      if (!element) return;
      const textContent = element.textContent;
      element.innerHTML = textContent
        .split("")
        .map(
          (char) =>
            `<span class="inline-block char-span">${
              char === " " ? "&nbsp;" : char
            }</span>`
        )
        .join("");
    };

    splitTextIntoSpans(text);

    // Create grand finale animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top bottom-=15%",
        end: "bottom center+=25%",
        scrub: 1,
        markers: false,
      },
    });

    // Majestic final statement entrance
    tl.fromTo(
      text.querySelectorAll(".char-span"),
      {
        opacity: 0,
        y: 100,
        scale: 0,
        rotationY: 180,
        transformOrigin: "center center",
        filter: "blur(30px) hue-rotate(90deg)",
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        filter: "blur(0px) hue-rotate(0deg)",
        duration: 2.5,
        ease: "expo.out",
        stagger: {
          each: 0.12,
          from: "center",
        },
      }
    );

    // Container magnificent entrance with glow
    gsap.fromTo(
      container,
      {
        opacity: 0,
        scale: 0.8,
        y: 60,
        filter: "drop-shadow(0 0 0px rgba(255,255,255,0)) brightness(0.5)",
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "drop-shadow(0 0 40px rgba(255,255,255,0.4)) brightness(1)",
        duration: 3,
        ease: "power4.out",
        scrollTrigger: {
          trigger: container,
          start: "top bottom-=10%",
          end: "top center+=30%",
          scrub: false,
        },
      }
    );

    // Pulsing glow effect
    gsap.to(container, {
      filter: "drop-shadow(0 0 60px rgba(255,255,255,0.6)) brightness(1.1)",
      duration: 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      scrollTrigger: {
        trigger: container,
        start: "top center",
        end: "bottom top",
        scrub: false,
      },
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="mt-8 sm:mt-12 md:mt-16 mb-12 sm:mb-16 md:mb-20 overflow-hidden"
    >
      <p
        ref={textRef}
        className="text-xl sm:text-2xl md:text-3xl leading-7 sm:leading-8 text-white/90 max-w-4xl mx-auto transition-all duration-300 font-chinese text-center tracking-widest px-2"
      >
        与 光 同 行 | 破 界 升 维
      </p>
    </div>
  );
};

export default ClosingStatement;
