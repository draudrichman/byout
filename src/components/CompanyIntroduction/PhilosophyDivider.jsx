"use client";
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const PhilosophyDivider = () => {
  const dividerRef = useRef(null);

  useGSAP(() => {
    if (!dividerRef.current) return;

    const philosophyDivider = dividerRef.current;

    gsap.set(philosophyDivider, {
      opacity: 0,
      scale: 0.7,
      transformOrigin: "center",
    });

    ScrollTrigger.create({
      trigger: philosophyDivider,
      start: "top 85%",
      end: "bottom -10%",
      onEnter: () => {
        gsap.to(philosophyDivider, {
          opacity: 1,
          scale: 1,
          transformOrigin: "center",
          duration: 0.6,
          ease: "power3.out",
        });
      },
      onLeave: () => {
        // Keep it visible when leaving
      },
      onEnterBack: () => {
        gsap.to(philosophyDivider, {
          opacity: 1,
          scale: 1,
          transformOrigin: "center",
          duration: 0.6,
          ease: "power3.out",
        });
      },
      onLeaveBack: () => {
        gsap.to(philosophyDivider, {
          opacity: 0,
          scale: 0.7,
          transformOrigin: "center",
          duration: 0.3,
          ease: "power3.in",
        });
      }
    });

    const philosophyText = philosophyDivider.querySelector('.tracking-widest');
    if (philosophyText && philosophyText.textContent?.includes('破界有光')) {
      gsap.to(philosophyText, {
        textShadow: "0 0 30px rgba(255,255,255,0.6), 0 0 60px rgba(200,200,255,0.4)",
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }

    return () => {
      // Cleanup function
    };
  }, { scope: dividerRef });

  return (
    <div ref={dividerRef} className="mt-8 sm:mt-12 md:mt-16 mb-16 sm:mb-20 md:mb-24 philosophy-divider">
      <p className="text-xl sm:text-2xl md:text-3xl leading-7 sm:leading-8 text-white/90 max-w-4xl mx-auto transition-all duration-300 font-chinese text-center tracking-widest px-2">
        破界有光 | 落地成境
      </p>
    </div>
  );
};

export default PhilosophyDivider;
