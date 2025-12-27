"use client";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const LogoSection = () => {
  const logoContainerRef = useRef(null);
  const logoRef = useRef(null);
  const imageRef = useRef(null);
  const displacementMapRef = useRef(null);
  const lineRef = useRef(null);
  const textContainerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);

  useGSAP(
    () => {
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
          toggleActions: "play reverse play reverse",
        },
      });

      tl.to(logo, {
        opacity: 1,
        scale: 1,
        transformOrigin: "center",
        duration: 0.6,
        ease: "power3.out",
      });

      // Animate the horizontal line and text
      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: textContainerRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Set initial states for text lines
      gsap.set([text1Ref.current, text2Ref.current, text3Ref.current], {
        opacity: 0,
        y: 20,
      });

      gsap.set(lineRef.current, {
        scaleX: 0,
      });

      // Animate line from center
      textTl
        .to(lineRef.current, {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.out",
        })
        // Animate text lines one by one
        .to(
          text1Ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.2"
        )
        .to(
          text2Ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.2"
        )
        .to(
          text3Ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.2"
        );

      function startPrismaticAnimations() {
        gsap.to(logo, {
          filter:
            "url(#displacementFilter) hue-rotate(60deg) drop-shadow(0 0 8px rgba(255,255,255,0.3))",
          duration: 8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        gsap.to(logo, {
          filter:
            "url(#displacementFilter) hue-rotate(60deg) drop-shadow(0 0 20px rgba(255,255,255,0.6)) drop-shadow(0 0 40px rgba(200,200,255,0.4))",
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
    },
    { scope: logoContainerRef }
  );

  return (
    <div className="py-8">
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter
            id="displacementFilter"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
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
        className="relative inline-block select-none mb-8 sm:mb-12 text-center w-80 h-20 sm:w-96 md:w-[450px] lg:w-[500px]"
      >
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <img
            ref={logoRef}
            src="/logo.svg"
            alt="PRISM 瓴境"
            className="w-full h-auto max-w-[320px] sm:max-w-[380px] md:max-w-[450px] lg:max-w-[500px] object-contain"
            style={{
              filter:
                "url(#displacementFilter) drop-shadow(0 0 8px rgba(255,255,255,0.3))",
            }}
          />
        </div>
      </div>

      {/* Animated horizontal line and text section */}
      <div
        ref={textContainerRef}
        className="w-full flex flex-col items-center px-4"
      >
        {/* Horizontal line */}
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl flex justify-center mb-8 sm:mb-10">
          <div
            ref={lineRef}
            className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
            style={{ transformOrigin: "center" }}
          />
        </div>

        {/* Text lines */}
        <div className="space-y-4 sm:space-y-5 md:space-y-6 text-center max-w-5xl">
          <p
            ref={text1Ref}
            className="font-songti text-xl sm:text-sm md:text-base lg:text-lg text-white/80 font-light tracking-widest"
          >
            前身为 BY 年轻化创新集团 | MDL买点论实验室
          </p>
          <p
            ref={text2Ref}
            className="max-w-[800px] text-justify font-songti text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-normal tracking-widest leading-relaxed"
          >
            PRïSM瓴境 诞生于全球化的时代背景下 基于独创的「买点论」体系
            驱动增长的快消品品牌创新集团。 为快消品行业提供从 品类创新 到
            全球渠道交付 的全链路智解方案
            赋能品牌方创造前所未有的产品价值与市场增长
            共同孵化定义未来的一体化增长新境界。
          </p>
          {/* <p
            ref={text3Ref}
            className="font-songti text-sm sm:text-base md:text-lg lg:text-xl text-white/85 font-light tracking-widest leading-relaxed mt-4" // added mt-4 for spacing between paragraphs
          >
            为快消品行业提供从 品类创新 到 全球渠道交付
            的全链路智解方案<br />赋能品牌方创造前所未有的产品价值与市场增长<br />共同孵化定义未来的一体化增长新境界。
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default LogoSection;
