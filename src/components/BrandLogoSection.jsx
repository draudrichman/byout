import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ShinyText from "./ui/shiny-text";

const logos = Array.from({ length: 64 }, (_, i) => `/s/s${i + 1}.svg`);
const moreLogos = Array.from({ length: 68 }, (_, i) => `/s/new/sn${i + 1}.jpg`);
const allLogos = [...logos, ...moreLogos];

// Create 4 rows with different logo sets
const createRows = () => {
  const shuffled = [...allLogos].sort(() => Math.random() - 0.5);
  const rowSize = Math.ceil(shuffled.length / 4);
  return [
    shuffled.slice(0, rowSize),
    shuffled.slice(rowSize, rowSize * 2),
    shuffled.slice(rowSize * 2, rowSize * 3),
    shuffled.slice(rowSize * 3),
  ];
};

const MarqueeRow = ({ logos, direction = "left", speed = 40, delay = 0 }) => {
  const rowRef = useRef(null);

  useLayoutEffect(() => {
    if (!rowRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const row = rowRef.current;
    const firstSet = row.querySelector(".marquee-set");
    if (!firstSet) return;

    const width = firstSet.offsetWidth;
    const duration = width / speed;

    // Set initial position for right-scrolling rows
    if (direction === "right") {
      gsap.set(row.querySelectorAll(".marquee-set"), { x: -width });
    }

    const animation = gsap.to(row.querySelectorAll(".marquee-set"), {
      x: direction === "left" ? -width : 0,
      duration: duration,
      ease: "none",
      repeat: -1,
      delay: delay,
    });

    return () => animation.kill();
  }, [direction, speed, delay]);

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <div className="marquee-row overflow-hidden py-4">
      <div ref={rowRef} className="flex gap-6">
        {/* First set */}
        <div className="marquee-set flex gap-6 shrink-0">
          {duplicatedLogos.map((url, idx) => (
            <div
              key={`set1-${url}-${idx}`}
              className="logo-item shrink-0 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-white/95 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center p-3"
            >
              <img
                src={url}
                alt={`Brand logo ${idx}`}
                className="w-full h-full object-contain filter contrast-110 saturate-110"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
        {/* Second set for seamless loop */}
        <div className="marquee-set flex gap-6 shrink-0">
          {duplicatedLogos.map((url, idx) => (
            <div
              key={`set2-${url}-${idx}`}
              className="logo-item shrink-0 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-white/95 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center p-3"
            >
              <img
                src={url}
                alt={`Brand logo ${idx}`}
                className="w-full h-full object-contain filter contrast-110 saturate-110"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function BrandLogosSection() {
  const sectionRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  const rows = createRows();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;

            const el = sectionRef.current;
            if (el) {
              const fadeItems = el.querySelectorAll(".fade-item");
              if (fadeItems && fadeItems.length) {
                gsap.fromTo(
                  fadeItems,
                  { y: -40, opacity: 0 },
                  {
                    y: 0,
                    opacity: 1,
                    duration: 1.0,
                    ease: "power3.out",
                    stagger: 0.2,
                    delay: 0.1,
                  }
                );
              }
              observer.unobserve(el);
            }
          }
        },
        { threshold: 0.1, rootMargin: "100px 0px" }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      };
    }, [sectionRef]);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 mb-20"
    >
      {/* Heading Section - Moved to Top */}
      <div className="w-full max-w-7xl mx-auto px-6 mb-16 text-center">
        <div className="flex flex-col items-center gap-6">
          <p className="fade-item opacity-0 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-400 font-jhenghei font-semibold leading-relaxed">
            我们是实战服务超过100家品牌的
            <br />
            专业品牌创意增量供应商
          </p>
          <div className="fade-item opacity-0">
            <ShinyText
              text="BRANDS 100+"
              disabled={false}
              speed={2}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-geniso font-bold tracking-tight leading-none"
            />
          </div>
        </div>
      </div>

      {/* Marquee Rows Section */}
      <div className="w-full space-y-2">
        {/* Row 1 - Left to Right, Fast */}
        <MarqueeRow logos={rows[0]} direction="left" speed={50} delay={0} />

        {/* Row 2 - Right to Left, Medium */}
        <MarqueeRow logos={rows[1]} direction="right" speed={35} delay={0.5} />

        {/* Row 3 - Left to Right, Slow */}
        <MarqueeRow logos={rows[2]} direction="left" speed={30} delay={1} />

        {/* Row 4 - Right to Left, Medium-Fast */}
        <MarqueeRow logos={rows[3]} direction="right" speed={45} delay={1.5} />
      </div>
    </div>
  );
}
