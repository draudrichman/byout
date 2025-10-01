"use client";
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const CompanyDescription = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const leftTexts = container.querySelectorAll('.company-text-left');
    const rightTexts = container.querySelectorAll('.company-text-right');

    // Initial setup - hide all texts
    gsap.set(leftTexts, {
      opacity: 0,
      x: -100
    });

    gsap.set(rightTexts, {
      opacity: 0,
      x: 100
    });

    // Repeatable animations on scroll
    ScrollTrigger.create({
      trigger: container,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => {
        // Animate left texts
        gsap.to(leftTexts, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1
        });

        // Animate right texts
        gsap.to(rightTexts, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1
        });
      },
      onLeave: () => {
        // Reset to initial state when leaving
        gsap.to(leftTexts, {
          opacity: 0,
          x: -100,
          duration: 0.4,
          ease: "power3.in",
          stagger: 0.05
        });

        gsap.to(rightTexts, {
          opacity: 0,
          x: 100,
          duration: 0.4,
          ease: "power3.in",
          stagger: 0.05
        });
      },
      onEnterBack: () => {
        // Animate again when scrolling back up
        gsap.to(leftTexts, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1
        });

        gsap.to(rightTexts, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1
        });
      },
      onLeaveBack: () => {
        // Reset when leaving from top
        gsap.to(leftTexts, {
          opacity: 0,
          x: -100,
          duration: 0.4,
          ease: "power3.in",
          stagger: 0.05
        });

        gsap.to(rightTexts, {
          opacity: 0,
          x: 100,
          duration: 0.4,
          ease: "power3.in",
          stagger: 0.05
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, { scope: containerRef });

  return (
    <div className="my-24 sm:my-28 md:my-32 company-description relative">
      <div className="company-bg-rect absolute inset-0 -mx-4 -my-8">
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/10"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/10"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/10"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/10"></div>
      </div>
      <div ref={containerRef} className="relative">
      
      <p className="text-sm sm:text-base leading-6 sm:leading-7 text-white/80 mb-4 sm:mb-6 max-w-4xl mx-auto font-chinese px-2 company-text-left relative z-10">
        PRISM 瓴境是全球化时代背景下诞生的<strong className="text-white/95">技术驱动型产品渠道全域生态运营商</strong>。
      </p>
      <p className="text-xs sm:text-sm leading-5 sm:leading-6 text-white/70 mb-4 sm:mb-6 max-w-4xl mx-auto font-chinese px-2 company-text-right relative z-10">
        前身为BYOUT 年轻化创新集团，MDL买点论实验室
      </p>
      <p className="text-sm sm:text-base leading-6 sm:leading-7 text-white/80 mb-4 sm:mb-6 max-w-4xl mx-auto font-chinese px-2 company-text-left relative z-10">
        独创从0到1的 产品全球化价值重构 到 全球市场落地的全链路一体化增长方案。
      </p>
      <p className="text-sm sm:text-base leading-6 sm:leading-7 text-white/80 mb-4 sm:mb-6 max-w-4xl mx-auto font-chinese px-2 company-text-right relative z-10">
        通过 <strong className="text-white/95">&ldquo;战略前策 x 技术赋能 x 渠道落地&rdquo;</strong> 的三位一体深度融合，
      </p>
      <p className="text-sm sm:text-base leading-6 sm:leading-7 text-white/80 mb-6 sm:mb-8 max-w-4xl mx-auto font-chinese px-2 company-text-left relative z-10">
        将您的品牌与产品从可持续发展的全球化市场影响力 x 竞争力 x 购买力 的3个维度解构重塑革新
      </p>
      <p className="text-sm sm:text-base leading-6 sm:leading-7 text-white/80 mb-8 sm:mb-12 max-w-4xl mx-auto font-chinese px-2 company-text-right relative z-10">
        将您的企业增长蓝图转化为实实在在的全球市场份额。
      </p>
      </div>
    </div>
  );
};

export default CompanyDescription;
