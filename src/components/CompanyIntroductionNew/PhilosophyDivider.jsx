"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PhilosophyDivider = () => {
  const dividerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const container = dividerRef.current;
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

    // Create dramatic philosophy reveal animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom center+=28%",
        scrub: 1,
        markers: false,
      },
    });

    // Epic entrance with multiple effects
    tl.fromTo(
      text.querySelectorAll(".char-span"),
      {
        opacity: 0,
        y: 80,
        scale: 0.3,
        rotation: 45,
        transformOrigin: "center center",
        filter: "blur(20px) brightness(2)",
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        filter: "blur(0px) brightness(1)",
        duration: 2,
        ease: "expo.out",
        stagger: {
          each: 0.08,
          from: "center",
          grid: "auto",
        },
      }
    );

    // Container glow effect
    gsap.fromTo(
      container,
      {
        opacity: 0,
        scale: 0.9,
        filter: "drop-shadow(0 0 0px rgba(255,255,255,0))",
      },
      {
        opacity: 1,
        scale: 1,
        filter: "drop-shadow(0 0 20px rgba(255,255,255,0.3))",
        duration: 2.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top bottom-=2%",
          end: "top bottom",
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
    <div
      ref={dividerRef}
      className="mt-8 sm:mt-12 md:mt-16 mb-16 sm:mb-20 md:mb-24 philosophy-divider overflow-hidden"
    >
      <p
        ref={textRef}
        className="text-xl sm:text-2xl md:text-4xl leading-7 font-songti tracking-[0.2em] md:tracking-[0.4em] sm:leading-8 text-white/90 max-w-4xl mx-auto transition-all duration-300 text-center px-2"
      >
        破 界 有 光 | 落 地 成 境
      </p>
    </div>
  );
};

export default PhilosophyDivider;
