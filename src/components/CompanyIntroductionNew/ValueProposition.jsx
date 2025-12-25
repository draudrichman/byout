"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const ValueProposition = () => {
  const containerRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const line4Ref = useRef(null);
  const line5Ref = useRef(null);
  const line6Ref = useRef(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set initial states
    gsap.set(
      [
        line1Ref.current,
        line2Ref.current,
        line3Ref.current,
        line4Ref.current,
        line5Ref.current,
        line6Ref.current,
      ],
      {
        opacity: 0,
        y: 30,
      }
    );

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

            // Animate lines one by one from bottom
            const tl = gsap.timeline();
            tl.to(line1Ref.current, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
            })
              .to(
                line2Ref.current,
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  ease: "power2.out",
                },
                "-=0.3"
              )
              .to(
                line3Ref.current,
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  ease: "power2.out",
                },
                "-=0.3"
              )
              .to(
                line4Ref.current,
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  ease: "power2.out",
                },
                "-=0.3"
              )
              .to(
                line5Ref.current,
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  ease: "power2.out",
                },
                "-=0.3"
              )
              .to(
                line6Ref.current,
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  ease: "power2.out",
                },
                "-=0.3"
              );
          }
          // Reset animation when panel is not visible
          else if (!entry.isIntersecting && entry.intersectionRatio < 0.1) {
            hasAnimatedRef.current = false;
            gsap.set(
              [
                line1Ref.current,
                line2Ref.current,
                line3Ref.current,
                line4Ref.current,
                line5Ref.current,
                line6Ref.current,
              ],
              {
                opacity: 0,
                y: 30,
              }
            );
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
    <div ref={containerRef} className="mb-12 sm:mb-16 md:mb-20 overflow-hidden">
      <div className="space-y-6 sm:space-y-8 md:space-y-10 max-w-5xl mx-auto px-4 text-left">
        <div className="flex gap-3 sm:gap-4">
          <span className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-songti font-normal flex-shrink-0">
            •
          </span>
          <div className="space-y-2 sm:space-y-3">
            <p
              ref={line1Ref}
              className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-white/90 font-songti font-normal tracking-wide"
            >
              我们不止是「咨询顾问」,而是「共建者」
            </p>
            <p
              ref={line2Ref}
              className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-white/75 font-songti font-light tracking-wide"
            >
              深度介入产品优化, 技术赋能 与 渠道谈判,
              与品牌深度绑定,共担风险,共享成果
            </p>
          </div>
        </div>

        <div className="flex gap-3 sm:gap-4">
          <span className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-songti font-normal flex-shrink-0">
            •
          </span>
          <div className="space-y-2 sm:space-y-3">
            <p
              ref={line3Ref}
              className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-white/90 font-songti font-normal tracking-wide"
            >
              我们不止是「资源中介」，而是「系统构建者」
            </p>
            <p
              ref={line4Ref}
              className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-white/75 font-songti font-light tracking-wide"
            >
              海内外零售商超的货架到消费者的心智，我们打通完整的价值链
            </p>
          </div>
        </div>

        <div className="flex gap-3 sm:gap-4">
          <span className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-songti font-normal flex-shrink-0">
            •
          </span>
          <div className="space-y-2 sm:space-y-3">
            <p
              ref={line5Ref}
              className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-white/90 font-songti font-normal tracking-wide"
            >
              我们不止提供「方案」，更交付「确定性」
            </p>
            <p
              ref={line6Ref}
              className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-white/75 font-songti font-light tracking-wide"
            >
              通过技术手段降低损耗、延长保鲜、革命产品力,攻破并优化产品出海的各阶段痛点
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueProposition;
