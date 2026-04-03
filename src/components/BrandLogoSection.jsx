import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ShinyText from "./ui/shiny-text";

const logos = Array.from({ length: 64 }, (_, i) => `/s/s${i + 1}.svg`);
const moreLogos = Array.from({ length: 68 }, (_, i) => `/s/new/sn${i + 1}.jpg`);
const allLogos = [...logos, ...moreLogos];

// Stable shuffle — computed once at module level, never on each render
const shuffleOnce = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const shuffled = shuffleOnce(allLogos);
const rowSize = Math.ceil(shuffled.length / 3);

// Pre-built, stable rows — created once at module load, never recreated
const ROWS = [
  shuffled.slice(0, rowSize),
  shuffled.slice(rowSize, rowSize * 2),
  shuffled.slice(rowSize * 2),
];

const MarqueeRow = ({ logos, direction = "left", speed = 40, delay = 0 }) => {
  const rowRef = useRef(null);

  useLayoutEffect(() => {
    if (!rowRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const row = rowRef.current;
    const firstSet = row.querySelector(".marquee-set");
    if (!firstSet) return;

    const width = firstSet.offsetWidth;
    const duration = width / speed;

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

  return (
    <div className="marquee-row overflow-hidden py-4">
      {/* will-change on the track, not on each card */}
      <div ref={rowRef} className="flex gap-6" style={{ willChange: "transform" }}>
        {/* First set */}
        <div className="marquee-set flex gap-6 shrink-0">
          {logos.map((url, idx) => (
            <div
              key={`set1-${idx}`}
              className="logo-item shrink-0 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-white/95 rounded-xl border border-white/20 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center p-3"
            >
              <img
                src={url}
                alt={`Brand logo ${idx + 1}`}
                className="w-full h-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
        {/* Second set for seamless loop */}
        <div className="marquee-set flex gap-6 shrink-0">
          {logos.map((url, idx) => (
            <div
              key={`set2-${idx}`}
              className="logo-item shrink-0 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-white/95 rounded-xl border border-white/20 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center p-3"
            >
              <img
                src={url}
                alt={`Brand logo ${idx + 1}`}
                className="w-full h-full object-contain"
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
                  },
                );
              }
              observer.unobserve(el);
            }
          }
        },
        { threshold: 0.1, rootMargin: "100px 0px" },
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
      style={{ contain: "content" }}
    >
      {/* Heading Section */}
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
        {/* Row 1 - Left */}
        <MarqueeRow logos={ROWS[0]} direction="left" speed={50} delay={0} />

        {/* Row 2 - Right */}
        <MarqueeRow logos={ROWS[1]} direction="right" speed={35} delay={0.5} />

        {/* Row 3 - Left */}
        <MarqueeRow logos={ROWS[2]} direction="left" speed={40} delay={1} />
      </div>
    </div>
  );
}
