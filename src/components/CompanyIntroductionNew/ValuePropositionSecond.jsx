"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const bullets = [
  {
    title: "TOP1",
    text: "全球买点论品类创新理论体系开创者",
  },
  {
    title: "TOP1",
    text: "致力于成为全球顶尖买点论品牌赋渠道终局的超甲方集团公司",
  },
  {
    title: "1-18个月",
    text: "系统性实现从新物种定义到全球高超渠道上架的完整周期",
  },
  {
    title: "4A",
    text: "我们是创新赛道、耕耘时间最久、专注度最深、辐射行业最广的(4A升级)大型机构",
  },
];

const metrics = [
  { value: "10 亿+", label: "我们的买点论销售额过 10 亿+" },
  { value: "30+", label: "深度分销快消品增长全球渠道 30+" },
  { value: "15+", label: "拥有 15 年+ 实战总结" },
  { value: "100+", label: "超过 100+ 专业团队" },
  { value: "300+", label: "服务品牌创新与增长案例 300+ 遍布全球" },
];

const ValuePropositionSecond = () => {
  const containerRef = useRef(null);
  const bulletsRefs = useRef([]);
  const metricsRefs = useRef([]);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const bulletsEls = bulletsRefs.current.filter(Boolean);
    const metricsEls = metricsRefs.current.filter(Boolean);

    // initial state
    gsap.set([...bulletsEls, ...metricsEls], {
      opacity: 0,
      y: 20,
      autoAlpha: 0,
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio > 0.35 &&
            !hasAnimatedRef.current
          ) {
            hasAnimatedRef.current = true;

            const tl = gsap.timeline();
            tl.to(bulletsEls, {
              opacity: 1,
              y: 0,
              duration: 0.45,
              ease: "power2.out",
              stagger: 0.12,
              autoAlpha: 1,
            }).to(
              metricsEls,
              {
                opacity: 1,
                y: 0,
                duration: 0.45,
                ease: "power2.out",
                stagger: 0.12,
                autoAlpha: 1,
              },
              "-=-0.2"
            );
          } else if (!entry.isIntersecting && entry.intersectionRatio < 0.1) {
            hasAnimatedRef.current = false;
            gsap.set([...bulletsEls, ...metricsEls], {
              opacity: 0,
              y: 20,
              autoAlpha: 0,
            });
          }
        });
      },
      { threshold: [0, 0.1, 0.35, 0.6, 1] }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="mb-12 sm:mb-16 md:mb-20 max-w-7xl mx-auto px-6"
      style={{
        paddingTop: "clamp(1.5rem, 4vw, 3.5rem)",
        paddingBottom: "clamp(1.5rem, 4vw, 3.5rem)",
      }}
    >
      <div className="bg-gradient-to-b from-white/3 to-transparent p-8 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start">
          <div>
            <h3
              className="text-lg sm:text-xl text-white/95 font-semibold mb-4"
              style={{ fontSize: "clamp(1.125rem, 2.2vw, 1.75rem)" }}
            >
              核心宣言
            </h3>
            <div className="space-y-4">
              {bullets.map((b, i) => (
                <div
                  key={i}
                  ref={(el) => (bulletsRefs.current[i] = el)}
                  className="flex gap-3"
                >
                  <div className="flex-shrink-0 text-white/90 font-songti text-3xl">
                    •
                  </div>
                  <div className="text-left">
                    <div className="text-base sm:text-lg text-white/95 font-medium">
                      {b.title}
                    </div>
                    <div className="text-sm sm:text-base text-white/75">
                      {b.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3
              className="text-lg sm:text-xl text-white/95 font-semibold mb-4"
              style={{ fontSize: "clamp(1.125rem, 2.2vw, 1.75rem)" }}
            >
              关键指标
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {metrics.map((m, i) => (
                <div
                  key={i}
                  ref={(el) => (metricsRefs.current[i] = el)}
                  className="flex flex-col p-6 bg-white/3 rounded-lg border border-white/6"
                >
                  <div
                    className="text-3xl sm:text-4xl font-extrabold text-white"
                    style={{ fontSize: "clamp(1.5rem, 3.4vw, 2.5rem)" }}
                  >
                    {m.value}
                  </div>
                  <div className="text-sm text-white/70 mt-2">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 text-sm text-white/60">
          注：以上为公司定位与历史业绩摘要，旨在展示资质与能力。
        </div>
      </div>
    </section>
  );
};

export default ValuePropositionSecond;
