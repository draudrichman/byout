import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import ShinyText from "./ui/shiny-text";

const logos = Array.from({ length: 64 }, (_, i) => `/s/s${i + 1}.svg`);
const moreLogos = Array.from({ length: 68 }, (_, i) => `/s/new/sn${i + 1}.jpg`);
logos.push(...moreLogos);

export default function BrandLogosSection() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  const [page, setPage] = useState(0);
  const pageSize = 36; // 6 x 6 grid

  // chunk logos into pages of 36 (last page may be shorter)
  const pages = [];
  for (let i = 0; i < logos.length; i += pageSize) {
    pages.push(logos.slice(i, i + pageSize));
  }
  const currentLogos = pages[page] || [];
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

            // Animate current page logos with a simple fade/scale stagger
            const logoNodeList =
              containerRef.current?.querySelectorAll(".logo-item");
            if (!logoNodeList || !logoNodeList.length) return;

            const logosArr = gsap.utils.toArray(logoNodeList);
            if (prefersReduced) {
              gsap.set(logosArr, {
                opacity: 1,
                scale: 1,
                clearProps: "willChange",
              });
            } else {
              gsap.fromTo(
                logosArr,
                { y: 30, opacity: 0, scale: 0.9 },
                {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  duration: 0.8,
                  ease: "power3.out",
                  stagger: 0.03,
                  overwrite: "auto",
                }
              );
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

  // Rotate pages every 5 seconds
  useEffect(() => {
    if (!pages.length) return;
    const id = setInterval(() => {
      setPage((p) => (p + 1) % pages.length);
    }, 5000);
    return () => clearInterval(id);
  }, [pages.length]);

  // Animate logos on page change
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const logoNodeList = containerRef.current?.querySelectorAll(".logo-item");
    if (!logoNodeList || !logoNodeList.length) return;
    const logosArr = gsap.utils.toArray(logoNodeList);
    if (prefersReduced) {
      gsap.set(logosArr, { opacity: 1, scale: 1, clearProps: "willChange" });
    } else {
      gsap.fromTo(
        logosArr,
        { y: 20, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.02,
        }
      );
    }
  }, [page]);

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
              <div className="grid grid-cols-4 lg:grid-cols-6 gap-3">
                {currentLogos.map((url, idx) => (
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
                  display: "grid",
                  gridTemplateColumns: "repeat(6, 1fr)",
                  gap: "clamp(8px, 2vw, 28px)",
                  alignItems: "center",
                  justifyItems: "center",
                  width: "clamp(480px, 80%, 720px)",
                  height: "clamp(480px, 80%, 720px)",
                }}
                className=""
              >
                {currentLogos.map((url, index) => (
                  <div
                    key={index}
                    className="logo-item transition-none"
                    style={{ transformStyle: "preserve-3d" }}
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
