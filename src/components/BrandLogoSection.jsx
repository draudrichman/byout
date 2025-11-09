import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ShinyText from "./ui/shiny-text";

const logos = Array.from({ length: 64 }, (_, i) => `/s/s${i + 1}.svg`);

export default function BrandLogosSection() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  // const cols = 8; // no longer needed after batching tweens

  // Calculate responsive spacing: equivalent to clamp(50px, 6vw, 80px)
  const getResponsiveSpacing = () => {
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    const spacing = Math.min(Math.max(50, vw * 0.05), 80); // 6vw bounded by 50px and 80px
    return spacing;
  };

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;

            // Fade-in text elements (batched)
            const el = sectionRef.current;
            if (el) {
              const fadeItems = el.querySelectorAll(".fade-item");
              if (fadeItems && fadeItems.length) {
                gsap.fromTo(
                  fadeItems,
                  { x: -60, opacity: 0 },
                  {
                    x: 0,
                    opacity: 1,
                    duration: 1.0,
                    ease: "power3.out",
                    stagger: 0.16,
                    delay: 0.1,
                    overwrite: "auto",
                  }
                );
              }
              observer.unobserve(el);
            }

            // Animate logos into 8x8 grid with responsive spacing (single batched tween)
            const spacing = getResponsiveSpacing();
            const logoNodeList =
              containerRef.current?.querySelectorAll(".logo-item");
            if (!logoNodeList || !logoNodeList.length) return;

            const logosArr = gsap.utils.toArray(logoNodeList);
            const colsLocal = 8;

            // Initial state: spiral
            gsap.set(logosArr, {
              x: (i) => {
                const angle = (i / logos.length) * Math.PI * 4; // 2 revolutions
                const radius = 500;
                return Math.cos(angle) * radius;
              },
              y: (i) => {
                const angle = (i / logos.length) * Math.PI * 4;
                const radius = 500;
                return Math.sin(angle) * radius;
              },
              scale: prefersReduced ? 1 : 0,
              rotation: prefersReduced ? 0 : () => Math.random() * 360,
              opacity: prefersReduced ? 1 : 0,
              willChange: "transform, opacity",
              force3D: true,
            });

            const gridX = (i) => ((i % colsLocal) - 3.5) * spacing;
            const gridY = (i) => (Math.floor(i / colsLocal) - 3.5) * spacing;

            if (prefersReduced) {
              // No animation: jump to final grid positions and clear will-change
              gsap.set(logosArr, {
                x: gridX,
                y: gridY,
                scale: 1,
                rotation: 0,
                opacity: 1,
                clearProps: "willChange",
                force3D: true,
              });
            } else {
              gsap.to(logosArr, {
                x: gridX,
                y: gridY,
                scale: 1,
                rotation: 0,
                opacity: 1,
                duration: 1.5,
                ease: "power3.out",
                stagger: { each: 0.03, from: 0 },
                force3D: true,
                overwrite: "auto",
                onComplete: () => {
                  gsap.set(logosArr, { clearProps: "willChange" });
                },
              });
            }
          }
        },
        { threshold: 0.25, rootMargin: "120px 0px" }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      };
    }, [sectionRef, containerRef]);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-[100vh] flex items-center justify-center overflow-hidden mb-20"
    >
      <div className="w-full max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row items-center md:items-stretch gap-10">
          {/* Text column */}
          <div className="fade-item opacity-0 md:w-1/2 w-full text-center md:text-left flex flex-col justify-between">
            <p className="mt-2 text-lg sm:text-xl md:text-4xl text-gray-400 font-jhenghei font-semibold leading-relaxed self-center md:self-start">
              我们是实战服务超过100家品牌的
              <br />
              专业品牌创意增量供应商
            </p>
            {/* <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-[#3F0F6B] tracking-tight leading-none self-center md:self-start">
              BRANDS 100+
            </h1> */}
            <ShinyText
              text="BRANDS 100+"
              disabled={false}
              speed={2}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-geniso font-bold tracking-tight leading-none self-center md:self-start"
            />
          </div>

          {/* Logos column: mobile = stacked grid under text, desktop = animated absolute layout centered */}
          <div className="md:w-1/2 w-full">
            {/* Mobile grid: shown on small screens, logos appear under the text */}
            <div className="block md:hidden">
              <div className="grid grid-cols-4 lg:grid-cols-8 gap-3">
                {logos.map((url, idx) => (
                  <div
                    key={idx}
                    className="w-full flex items-center justify-center p-1"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md flex items-center justify-center animate-shine bg-gradient-to-br from-gray-100 via-silver-300 to-gray-400 backdrop-blur-sm border border-white/20 shadow-lg">
                      <div className="w-full h-full p-1 flex items-center justify-center">
                        <img
                          src={url}
                          alt={`logo-${idx}`}
                          className="w-full h-full object-contain filter contrast-110 saturate-110"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop animated layout: centered and symmetric */}
            <div
              className="hidden md:flex w-full relative items-center justify-center"
              style={{ height: "clamp(520px, 60vh, 720px)" }}
            >
              <div
                ref={containerRef}
                style={{
                  perspective: "1000px",
                  transformStyle: "preserve-3d",
                  position: "relative",
                  width: "clamp(480px, 80%, 720px)",
                  height: "clamp(480px, 80%, 720px)",
                }}
                className="relative"
              >
                {logos.map((url, index) => (
                  <div
                    key={index}
                    className="logo-item absolute transition-none"
                    style={{
                      left: "50%",
                      top: "50%",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div
                      style={{
                        width: "clamp(32px, 3vw, 48px)",
                        height: "clamp(32px, 3vw, 48px)",
                      }}
                      className="bg-white/95 backdrop-blur-sm rounded-lg border border-white/20 shadow-lg flex items-center justify-center"
                    >
                      <div className="w-full h-full p-1 flex items-center justify-center">
                        <img
                          src={url}
                          alt={`logo-${index}`}
                          className="w-full h-full object-contain filter contrast-110 saturate-110"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
