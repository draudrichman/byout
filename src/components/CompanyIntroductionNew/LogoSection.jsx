"use client";
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const LogoSection = () => {
  const logoContainerRef = useRef(null);
  const logoRef = useRef(null);
  const imageRef = useRef(null);
  const displacementMapRef = useRef(null);

  useGSAP(() => {
    if (!logoContainerRef.current) return;

    const container = logoContainerRef.current;
    const logo = logoRef.current;

    gsap.set(logo, {
      opacity: 0,
      scale: 0.6,
      transformOrigin: "center",
    });

    const tl = gsap.timeline({
      onComplete: () => {
        startPrismaticAnimations();
      },
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play reverse play reverse"
      }
    });

    tl.to(logo, {
      opacity: 1,
      scale: 1,
      transformOrigin: "center",
      duration: 0.6,
      ease: "power3.out",
    });

    function startPrismaticAnimations() {
      gsap.to(logo, {
        filter: "url(#displacementFilter) hue-rotate(60deg) drop-shadow(0 0 8px rgba(255,255,255,0.3))",
        duration: 8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(logo, {
        filter: "url(#displacementFilter) hue-rotate(60deg) drop-shadow(0 0 20px rgba(255,255,255,0.6)) drop-shadow(0 0 40px rgba(200,200,255,0.4))",
        duration: 5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Animate displacement image and scale over time
      if (imageRef.current && displacementMapRef.current) {
        // Gradually fade out the displacement image
        gsap.to(imageRef.current, {
          attr: { opacity: "0" },
          duration: 1.5,
          ease: "power3.out",
        });

        // Also gradually reduce displacement scale (amplitude)
        gsap.to(displacementMapRef.current, {
          attr: { scale: "0" },
          duration: 1.5,
          ease: "power3.out",
        });
      }
    }

    return () => {
      // Cleanup function
    };
  }, { scope: logoContainerRef });

  return (
    <div className="py-8">
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="displacementFilter" x="-50%" y="-50%" width="200%" height="200%">
            <feImage
              ref={imageRef}
              href="/Filter/filtertest3.png"
              result="displacementImage"
              opacity="1"
            />
            <feDisplacementMap
              ref={displacementMapRef}
              in="SourceGraphic"
              in2="displacementImage"
              scale="25"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <div
        ref={logoContainerRef}
        className="relative inline-block select-none mb-8 sm:mb-12 text-center w-80 h-80 sm:w-96 sm:h-88 md:w-[450px] md:h-96 lg:w-[500px] lg:h-[26rem]"
      >
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <img
            ref={logoRef}
            src="/logo.svg"
            alt="PRISM 瓴境"
            className="w-full h-auto max-w-[320px] sm:max-w-[380px] md:max-w-[450px] lg:max-w-[500px] object-contain"
            style={{
              filter: 'url(#displacementFilter) drop-shadow(0 0 8px rgba(255,255,255,0.3))',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LogoSection;
