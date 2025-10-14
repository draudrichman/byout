"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ValueProposition = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const point1Ref = useRef(null);
  const point2Ref = useRef(null);
  const point3Ref = useRef(null);

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

    // Split all text elements
    splitTextIntoSpans(titleRef.current);
    splitTextIntoSpans(point1Ref.current);
    splitTextIntoSpans(point2Ref.current);
    splitTextIntoSpans(point3Ref.current);

    // Main timeline for sequential animations
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top bottom-=10%",
        end: "bottom center",
        scrub: 1,
        markers: false,
      },
    });

    // Title - Elegant scale entrance
    mainTl.fromTo(
      titleRef.current.querySelectorAll(".char-span"),
      {
        opacity: 0,
        scale: 0,
        y: 30,
        rotationX: -90,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        rotationX: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
        stagger: {
          each: 0.05,
          from: "center",
        },
      },
      0
    );

    // Point 1 - Tech-driven slide from left
    mainTl.fromTo(
      point1Ref.current.querySelectorAll(".char-span"),
      {
        opacity: 0,
        x: -60,
        rotationY: -90,
        transformOrigin: "0% 50%",
      },
      {
        opacity: 1,
        x: 0,
        rotationY: 0,
        duration: 1,
        ease: "power3.out",
        stagger: {
          each: 0.03,
          from: "start",
        },
      },
      0.4
    );

    // Point 2 - Wave entrance with elastic bounce
    mainTl.fromTo(
      point2Ref.current.querySelectorAll(".char-span"),
      {
        opacity: 0,
        y: 50,
        scaleY: 0.3,
        skewX: 20,
      },
      {
        opacity: 1,
        y: 0,
        scaleY: 1,
        skewX: 0,
        duration: 1.1,
        ease: "elastic.out(1, 0.4)",
        stagger: {
          each: 0.04,
          from: "start",
        },
      },
      0.8
    );

    // Point 3 - Dramatic morphing entrance
    mainTl.fromTo(
      point3Ref.current.querySelectorAll(".char-span"),
      {
        opacity: 0,
        scale: 0.2,
        rotation: 180,
        y: 40,
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        y: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: {
          each: 0.04,
          from: "start",
        },
      },
      1.2
    );

    // Container entrance animation
    gsap.fromTo(
      container,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
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
    <div ref={containerRef} className="mb-12 sm:mb-16 overflow-hidden">
      <p
        ref={titleRef}
        className="text-base sm:text-lg leading-7 sm:leading-8 text-white/90 mb-6 sm:mb-8 max-w-4xl mx-auto transition-all duration-300 font-chinese text-center px-2"
      >
        PRISM瓴境 的独到价值在于：
      </p>

      <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto px-2">
        <div className="transition-all duration-300">
          <p
            ref={point1Ref}
            className="text-sm sm:text-base leading-6 sm:leading-7 text-white/80 font-chinese"
          >
            - 我们不止是咨询顾问，而是
            <strong className="text-white/95">共建者</strong>
            ：深度介入产品优化、技术赋能与渠道谈判，与品牌深度绑定，共担风险、共享成果；
          </p>
        </div>

        <div className="transition-all duration-300">
          <p
            ref={point2Ref}
            className="text-sm sm:text-base leading-6 sm:leading-7 text-white/80 font-chinese"
          >
            - 我们不止是资源中介，而是
            <strong className="text-white/95">系统构建者</strong>
            ：从海外零售商超的货架到消费者的心智，我们打通完整的价值链；
          </p>
        </div>

        <div className="transition-all duration-300">
          <p
            ref={point3Ref}
            className="text-sm sm:text-base leading-6 sm:leading-7 text-white/80 font-chinese"
          >
            - 我们不止提供方案，更
            <strong className="text-white/95">交付确定性</strong>
            ：通过技术手段降低损耗、延长保鲜、革命产品力，攻破并优化产品出海的各阶段痛点。
          </p>
        </div>
      </div>
    </div>
  );
};

export default ValueProposition;
