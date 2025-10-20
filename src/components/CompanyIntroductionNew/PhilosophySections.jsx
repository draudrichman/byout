"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const PhilosophySections = () => {
  const containerRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = [
      section1Ref.current,
      section2Ref.current,
      section3Ref.current,
      section4Ref.current,
    ];

    // Set initial states for all sections
    gsap.set(sections, {
      opacity: 0,
      y: 30,
    });

    // Use IntersectionObserver to detect when panel becomes visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When panel becomes visible and hasn't animated yet
          if (
            entry.isIntersecting &&
            entry.intersectionRatio > 0.5 &&
            !hasAnimatedRef.current
          ) {
            hasAnimatedRef.current = true;

            // Animate sections one by one
            const tl = gsap.timeline();
            sections.forEach((section, index) => {
              tl.to(
                section,
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  ease: "power2.out",
                },
                index === 0 ? 0 : "-=0.3"
              );
            });
          }
          // Reset animation when panel is not visible
          else if (!entry.isIntersecting && entry.intersectionRatio < 0.1) {
            hasAnimatedRef.current = false;
            gsap.set(sections, {
              opacity: 0,
              y: 30,
            });
          }
        });
      },
      {
        threshold: [0, 0.1, 0.5, 1],
      }
    );

    observer.observe(container);

    // Cleanup function
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="mb-12 sm:mb-16 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 items-start philosophy-container overflow-hidden"
    >
      {/* 破界 */}
      <div
        ref={section1Ref}
        className="px-0 py-4 relative philosophy-section min-h-[120px] sm:min-h-[140px]"
      >
        {/* <div className="absolute -inset-2">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20"></div>
        </div> */}
        <h2 className="text-3xl font-medium text-white mb-2 relative z-10 tracking-wider font-songti">
          破 界
        </h2>
        <p className="text-md text-white/80 mb-6 relative z-10">
          「Break Boundaries」
        </p>
        <div className="text-white/90 relative z-10 space-y-1 text-sm tracking-[0.2em] font-songti">
          <p>市场之界・技术之界</p>
          <p>渠道之界・增长之界</p>
        </div>
      </div>

      {/* 有光 */}
      <div
        ref={section2Ref}
        className="px-0 py-4 relative philosophy-section min-h-[120px] sm:min-h-[140px]"
      >
        {/* <div className="absolute -inset-2">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20"></div>
        </div> */}
        <h2 className="text-3xl font-medium text-white mb-2 relative z-10 tracking-wider font-songti">
          有 光
        </h2>
        <p className="text-md text-white/80 mb-6 relative z-10">
          「Guidance Light」
        </p>
        <div className="text-white/90 relative z-10 space-y-1 text-sm tracking-[0.2em] font-songti">
          <p>以光破界</p>
          <p>破界之路的指引之光</p>
          <p>战略之光・技术之光・方法之光</p>
        </div>
      </div>

      {/* 落地 */}
      <div
        ref={section3Ref}
        className="px-0 py-4 relative philosophy-section min-h-[120px] sm:min-h-[140px]"
      >
        {/* <div className="absolute -inset-2">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20"></div>
        </div> */}
        <h2 className="text-3xl font-medium text-white mb-2 relative z-10 tracking-wider font-songti">
          落 地
        </h2>
        <p className="text-md text-white/80 mb-6 relative z-10">
          「Results Oriented」
        </p>
        <div className="text-white/90 relative z-10 space-y-1 text-sm tracking-[0.2em] font-songti">
          <p>将全球化资源・认知・洞察</p>
          <p>转化为一步一脚印的扎实执行</p>
          <p>实现知行合一</p>
        </div>
      </div>

      {/* 成境 */}
      <div
        ref={section4Ref}
        className="px-0 py-4 relative philosophy-section min-h-[120px] sm:min-h-[140px]"
      >
        {/* <div className="absolute -inset-2">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20"></div>
        </div> */}
        <h2 className="text-3xl font-medium text-white mb-2 relative z-10 tracking-wider font-songti">
          成 境
        </h2>
        <p className="text-md text-white/80 mb-6 relative z-10">
          「New Realms」
        </p>
        <div className="text-white/90 relative z-10 space-y-1 text-sm tracking-[0.2em] font-songti">
          <p>我们最终为品牌开疆扩土</p>
          <p>创造出一片可持续增长的</p>
          <p>新境界・新天地</p>
        </div>
      </div>
    </div>
  );
};

export default PhilosophySections;
