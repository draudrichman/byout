"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CompanyDescription = () => {
  const containerRef = useRef(null);
  const paragraph1Ref = useRef(null);
  const paragraph2Ref = useRef(null);
  const paragraph3Ref = useRef(null);
  const paragraph4Ref = useRef(null);
  const paragraph5Ref = useRef(null);
  const paragraph6Ref = useRef(null);
  const cornersRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Split text function for character-by-character animation
    const splitTextIntoSpans = (element) => {
      if (!element) return;
      const text = element.innerHTML;

      // Replace text content while preserving HTML tags like <strong>
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

    // Split all paragraph text elements
    const paragraphs = [
      paragraph1Ref.current,
      paragraph2Ref.current,
      paragraph3Ref.current,
      paragraph4Ref.current,
      paragraph5Ref.current,
      paragraph6Ref.current,
    ];

    paragraphs.forEach((paragraph) => {
      if (paragraph) splitTextIntoSpans(paragraph);
    });

    // Main timeline for sequential paragraph animations
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top bottom-=10%",
        end: "bottom center",
        scrub: 1,
        markers: false,
      },
    });

    // Corner decorations animation
    const corners = cornersRef.current?.querySelectorAll("div");
    if (corners) {
      gsap.fromTo(
        corners,
        {
          scale: 0,
          rotation: 45,
          opacity: 0,
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 1.5,
          ease: "back.out(2)",
          stagger: 0.2,
          scrollTrigger: {
            trigger: container,
            start: "top bottom-=20%",
            end: "top center",
            scrub: false,
          },
        }
      );
    }

    // Paragraph 1 - Tech-driven entrance
    if (paragraph1Ref.current) {
      mainTl.fromTo(
        paragraph1Ref.current.querySelectorAll(".char-span"),
        {
          opacity: 0,
          y: 50,
          rotationX: -90,
          transformOrigin: "50% 0%",
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: {
            each: 0.03,
            from: "start",
          },
        },
        0
      );
    }

    // Paragraph 2 - Subtitle fade with blur
    if (paragraph2Ref.current) {
      mainTl.fromTo(
        paragraph2Ref.current.querySelectorAll(".char-span"),
        {
          opacity: 0,
          x: 30,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
          stagger: {
            each: 0.02,
            from: "start",
          },
        },
        0.3
      );
    }

    // Paragraph 3 - Wave entrance from center
    if (paragraph3Ref.current) {
      mainTl.fromTo(
        paragraph3Ref.current.querySelectorAll(".char-span"),
        {
          opacity: 0,
          y: 40,
          scaleY: 0.3,
          skewY: 10,
        },
        {
          opacity: 1,
          y: 0,
          scaleY: 1,
          skewY: 0,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
          stagger: {
            each: 0.04,
            from: "center",
          },
        },
        0.6
      );
    }

    // Paragraph 4 - Strategic emphasis with scale
    if (paragraph4Ref.current) {
      mainTl.fromTo(
        paragraph4Ref.current.querySelectorAll(".char-span"),
        {
          opacity: 0,
          scale: 0,
          rotation: 180,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "back.out(1.7)",
          stagger: {
            each: 0.05,
            from: "random",
          },
        },
        0.9
      );
    }

    // Paragraph 5 - Morphing text reveal
    if (paragraph5Ref.current) {
      mainTl.fromTo(
        paragraph5Ref.current.querySelectorAll(".char-span"),
        {
          opacity: 0,
          y: -30,
          rotationY: 90,
          transformOrigin: "50% 50%",
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 1.1,
          ease: "power4.out",
          stagger: {
            each: 0.03,
            from: "end",
          },
        },
        1.2
      );
    }

    // Paragraph 6 - Final statement with dramatic entrance
    if (paragraph6Ref.current) {
      mainTl.fromTo(
        paragraph6Ref.current.querySelectorAll(".char-span"),
        {
          opacity: 0,
          y: 60,
          scale: 0.5,
          rotationZ: -45,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationZ: 0,
          duration: 1.3,
          ease: "expo.out",
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
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top bottom-=5%",
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
    <div className="my-24 sm:my-28 md:my-32 company-description relative overflow-hidden">
      <div
        ref={cornersRef}
        className="company-bg-rect absolute inset-0 -mx-4 -my-8"
      >
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/10"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/10"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/10"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/10"></div>
      </div>
      <div ref={containerRef} className="relative">
        <p
          ref={paragraph1Ref}
          className="text-sm sm:text-base leading-6 sm:leading-7 text-white/80 mb-4 sm:mb-6 max-w-4xl mx-auto font-chinese px-2 company-text-left relative z-10"
        >
          PRISM 瓴境是全球化时代背景下诞生的
          <strong className="text-white/95">
            技术驱动型产品渠道全域生态运营商
          </strong>
          。
        </p>
        <p
          ref={paragraph2Ref}
          className="text-xs sm:text-sm leading-5 sm:leading-6 text-white/70 mb-4 sm:mb-6 max-w-4xl mx-auto font-chinese px-2 company-text-right relative z-10"
        >
          前身为BYOUT 年轻化创新集团，MDL买点论实验室
        </p>
        <p
          ref={paragraph3Ref}
          className="text-sm sm:text-base leading-6 sm:leading-7 text-white/80 mb-4 sm:mb-6 max-w-4xl mx-auto font-chinese px-2 company-text-left relative z-10"
        >
          独创从0到1的 产品全球化价值重构 到
          全球市场落地的全链路一体化增长方案。
        </p>
        <p
          ref={paragraph4Ref}
          className="text-sm sm:text-base leading-6 sm:leading-7 text-white/80 mb-4 sm:mb-6 max-w-4xl mx-auto font-chinese px-2 company-text-right relative z-10"
        >
          通过{" "}
          <strong className="text-white/95">
            &ldquo;战略前策 x 技术赋能 x 渠道落地&rdquo;
          </strong>{" "}
          的三位一体深度融合，
        </p>
        <p
          ref={paragraph5Ref}
          className="text-sm sm:text-base leading-6 sm:leading-7 text-white/80 mb-6 sm:mb-8 max-w-4xl mx-auto font-chinese px-2 company-text-left relative z-10"
        >
          将您的品牌与产品从可持续发展的全球化市场影响力 x 竞争力 x 购买力
          的3个维度解构重塑革新
        </p>
        <p
          ref={paragraph6Ref}
          className="text-sm sm:text-base leading-6 sm:leading-7 text-white/80 mb-8 sm:mb-12 max-w-4xl mx-auto font-chinese px-2 company-text-right relative z-10"
        >
          将您的企业增长蓝图转化为实实在在的全球市场份额。
        </p>
      </div>
    </div>
  );
};

export default CompanyDescription;
