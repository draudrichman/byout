"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PhilosophySections = () => {
  const containerRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const title3Ref = useRef(null);
  const title4Ref = useRef(null);
  const desc1Ref = useRef(null);
  const desc2Ref = useRef(null);
  const desc3Ref = useRef(null);
  const desc4Ref = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Split text function for character-by-character animation
    const splitTextIntoSpans = (element) => {
      if (!element) return;
      const text = element.innerHTML;

      // Replace text content while preserving HTML tags like <span>
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = text;

      const processNode = (node) => {
        if (node.nodeType === 3) {
          // Text node
          const chars = node.textContent.split("");
          const fragment = document.createDocumentFragment();
          chars.forEach((char) => {
            const span = document.createElement("span");
            span.className = "inline-block char-span";
            span.textContent = char === " " ? "\u00A0" : char;
            fragment.appendChild(span);
          });
          return fragment;
        } else if (node.nodeType === 1) {
          // Element node
          const newElement = node.cloneNode(false);
          Array.from(node.childNodes).forEach((child) => {
            newElement.appendChild(processNode(child));
          });
          return newElement;
        }
        return node;
      };

      const processedContent = document.createDocumentFragment();
      Array.from(tempDiv.childNodes).forEach((child) => {
        processedContent.appendChild(processNode(child));
      });

      element.innerHTML = "";
      element.appendChild(processedContent);
    };

    // Split all text elements
    const titles = [
      title1Ref.current,
      title2Ref.current,
      title3Ref.current,
      title4Ref.current,
    ];
    const descriptions = [
      desc1Ref.current,
      desc2Ref.current,
      desc3Ref.current,
      desc4Ref.current,
    ];
    const sections = [
      section1Ref.current,
      section2Ref.current,
      section3Ref.current,
      section4Ref.current,
    ];

    titles.forEach((title) => {
      if (title) splitTextIntoSpans(title);
    });

    descriptions.forEach((desc) => {
      if (desc) splitTextIntoSpans(desc);
    });

    // Main timeline for sequential section animations
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top bottom-=2%",
        end: "bottom center+=25%",
        scrub: 1,
        markers: false,
      },
    });

    // Section border animations
    sections.forEach((section, index) => {
      if (!section) return;

      const borders = section.querySelector(".philosophy-rect");
      if (borders) {
        gsap.fromTo(
          borders,
          {
            opacity: 0,
            scale: 0,
            rotation: 45,
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1,
            ease: "back.out(2)",
            delay: index * 0.2,
            scrollTrigger: {
              trigger: section,
              start: "top bottom-=20%",
              end: "top center+=20%",
              scrub: false,
            },
          }
        );
      }
    });

    // Philosophy 1: 破界 (Break Boundaries) - Explosive entrance
    if (title1Ref.current && desc1Ref.current) {
      mainTl
        .fromTo(
          title1Ref.current.querySelectorAll(".char-span"),
          {
            opacity: 0,
            x: -80,
            rotationY: -180,
            transformOrigin: "0% 50%",
          },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 1.2,
            ease: "expo.out",
            stagger: {
              each: 0.08,
              from: "start",
            },
          },
          0
        )
        .fromTo(
          desc1Ref.current.querySelectorAll(".char-span"),
          {
            opacity: 0,
            y: 60,
            scale: 0.3,
            skewX: 45,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            skewX: 0,
            duration: 1,
            ease: "back.out(1.7)",
            stagger: {
              each: 0.03,
              from: "start",
            },
          },
          0.3
        );
    }

    // Philosophy 2: 有光 (Guidance Light) - Illuminating entrance
    if (title2Ref.current && desc2Ref.current) {
      mainTl
        .fromTo(
          title2Ref.current.querySelectorAll(".char-span"),
          {
            opacity: 0,
            y: -50,
            filter: "blur(20px) brightness(3)",
            scale: 0.5,
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px) brightness(1)",
            scale: 1,
            duration: 1.3,
            ease: "power3.out",
            stagger: {
              each: 0.06,
              from: "center",
            },
          },
          0.4
        )
        .fromTo(
          desc2Ref.current.querySelectorAll(".char-span"),
          {
            opacity: 0,
            y: 40,
            rotationX: 90,
            transformOrigin: "50% 0%",
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1.1,
            ease: "elastic.out(1, 0.4)",
            stagger: {
              each: 0.04,
              from: "start",
            },
          },
          0.7
        );
    }

    // Philosophy 3: 落地 (Results Oriented) - Grounding entrance
    if (title3Ref.current && desc3Ref.current) {
      mainTl
        .fromTo(
          title3Ref.current.querySelectorAll(".char-span"),
          {
            opacity: 0,
            y: 80,
            rotationZ: 45,
            scale: 0,
          },
          {
            opacity: 1,
            y: 0,
            rotationZ: 0,
            scale: 1,
            duration: 1.1,
            ease: "bounce.out",
            stagger: {
              each: 0.07,
              from: "end",
            },
          },
          0.8
        )
        .fromTo(
          desc3Ref.current.querySelectorAll(".char-span"),
          {
            opacity: 0,
            x: 60,
            scaleY: 0.2,
            skewY: 15,
          },
          {
            opacity: 1,
            x: 0,
            scaleY: 1,
            skewY: 0,
            duration: 1,
            ease: "power4.out",
            stagger: {
              each: 0.03,
              from: "start",
            },
          },
          1.1
        );
    }

    // Philosophy 4: 成境 (Create New Realms) - Realm-creating entrance
    if (title4Ref.current && desc4Ref.current) {
      mainTl
        .fromTo(
          title4Ref.current.querySelectorAll(".char-span"),
          {
            opacity: 0,
            scale: 0,
            rotation: 360,
            filter: "hue-rotate(180deg)",
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            filter: "hue-rotate(0deg)",
            duration: 1.4,
            ease: "expo.out",
            stagger: {
              each: 0.1,
              from: "random",
            },
          },
          1.2
        )
        .fromTo(
          desc4Ref.current.querySelectorAll(".char-span"),
          {
            opacity: 0,
            y: -40,
            rotationY: 180,
            transformOrigin: "50% 50%",
          },
          {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 1.2,
            ease: "back.out(2)",
            stagger: {
              each: 0.04,
              from: "start",
            },
          },
          1.5
        );
    }

    // Container entrance animation
    gsap.fromTo(
      container,
      {
        opacity: 0,
        y: 60,
      },
      {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top bottom-=5%",
          end: "top center+=20%",
          scrub: false,
        },
      }
    );

    // Individual section entrance animations
    sections.forEach((section, index) => {
      if (section) {
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 40,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
            delay: index * 0.15,
            scrollTrigger: {
              trigger: section,
              start: "top bottom-=10%",
              end: "top center+=15%",
              scrub: false,
            },
          }
        );
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
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
        <div className="philosophy-rect absolute -inset-2 opacity-0 scale-0">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20"></div>
        </div>
        <h3
          ref={title1Ref}
          className="text-base sm:text-lg font-medium text-white/90 mb-3 sm:mb-4 font-chinese relative z-10 leading-tight"
        >
          破界{" "}
          <span className="text-white/70 text-sm sm:text-base font-normal">
            (Break Boundaries):
          </span>
        </h3>
        <p
          ref={desc1Ref}
          className="text-sm sm:text-base leading-relaxed text-white/80 transition-all duration-300 font-chinese relative z-10"
        >
          破市场之界、技术之界、渠道之界、增长之界。
        </p>
      </div>

      {/* 有光 */}
      <div
        ref={section2Ref}
        className="px-4 py-4 relative philosophy-section min-h-[120px] sm:min-h-[140px]"
      >
        <div className="philosophy-rect absolute -inset-2 opacity-0 scale-0">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20"></div>
        </div>
        <h3
          ref={title2Ref}
          className="text-base sm:text-lg font-medium text-white/90 mb-3 sm:mb-4 font-chinese relative z-10 leading-tight"
        >
          有光{" "}
          <span className="text-white/70 text-sm sm:text-base font-normal">
            (Guidance Light):
          </span>
        </h3>
        <p
          ref={desc2Ref}
          className="text-sm sm:text-base leading-relaxed text-white/80 transition-all duration-300 font-chinese relative z-10"
        >
          以光破界，为破界之路提供指引之光（战略之光、技术之光、方法之光）。
        </p>
      </div>

      {/* 落地 */}
      <div
        ref={section3Ref}
        className="px-4 py-4 relative philosophy-section min-h-[120px] sm:min-h-[140px]"
      >
        <div className="philosophy-rect absolute -inset-2 opacity-0 scale-0">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20"></div>
        </div>
        <h3
          ref={title3Ref}
          className="text-base sm:text-lg font-medium text-white/90 mb-3 sm:mb-4 font-chinese relative z-10 leading-tight"
        >
          落地{" "}
          <span className="text-white/70 text-sm sm:text-base font-normal">
            (Results Oriented):
          </span>
        </h3>
        <p
          ref={desc3Ref}
          className="text-sm sm:text-base leading-relaxed text-white/80 transition-all duration-300 font-chinese relative z-10"
        >
          将全球化资源，认知，洞察转化为一步一脚印的扎实执行，实现知行合一。
        </p>
      </div>

      {/* 成境 */}
      <div
        ref={section4Ref}
        className="px-4 py-4 relative philosophy-section min-h-[120px] sm:min-h-[140px]"
      >
        <div className="philosophy-rect absolute -inset-2 opacity-0 scale-0">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20"></div>
        </div>
        <h3
          ref={title4Ref}
          className="text-base sm:text-lg font-medium text-white/90 mb-3 sm:mb-4 font-chinese relative z-10 leading-tight"
        >
          成境{" "}
          <span className="text-white/70 text-sm sm:text-base font-normal">
            (Create New Realms):
          </span>
        </h3>
        <p
          ref={desc4Ref}
          className="text-sm sm:text-base leading-relaxed text-white/80 transition-all duration-300 font-chinese relative z-10"
        >
          我们最终为品牌开疆扩土，创造出一片可持续增长的新境界、新天地。
        </p>
      </div>
    </div>
  );
};

export default PhilosophySections;
