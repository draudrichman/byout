import { useEffect, useRef } from "react";
import gsap from "gsap";
import ShinyText from "./ui/shiny-text";

const logos = Array.from({ length: 64 }, (_, i) => `/s/s${i + 1}.svg`);

export default function BrandLogosSection() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  const cols = 8;
  const rows = Math.ceil(logos.length / cols);

  // Calculate responsive spacing: equivalent to clamp(50px, 6vw, 80px)
  const getResponsiveSpacing = () => {
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    const spacing = Math.min(Math.max(50, vw * 0.05), 80); // 6vw bounded by 50px and 80px
    return spacing;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;

          // Fade-in text elements
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
                  duration: 1.2,
                  ease: "power3.out",
                  stagger: 0.16,
                  delay: 0.15,
                }
              );
            }
            observer.unobserve(el);
          }

          // Animate logos into 8x8 grid with responsive spacing
          const spacing = getResponsiveSpacing();
          const logoElements =
            containerRef.current.querySelectorAll(".logo-item");
          logoElements.forEach((element, index) => {
            const col = index % 8;
            const row = Math.floor(index / 8);

            // Calculate final grid position
            const gridX = (col - 3.5) * spacing; // Center the grid
            const gridY = (row - 3.5) * spacing; // Center the grid

            // Set initial spiral position
            const angle = (index / logos.length) * Math.PI * 4; // Reduced spiral rotations
            const radius = 500; // Consistent radius for cleaner spiral
            const spiralX = Math.cos(angle) * radius;
            const spiralY = Math.sin(angle) * radius;

            gsap.set(element, {
              x: spiralX,
              y: spiralY,
              scale: 0,
              rotation: Math.random() * 360,
              opacity: 0,
            });

            const delay = index * 0.03; // Faster sequence

            gsap.to(element, {
              x: gridX,
              y: gridY,
              scale: 1,
              rotation: 0,
              opacity: 1,
              duration: 1.5,
              delay,
              ease: "power3.out",
            });
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-[100vh] flex items-center justify-center overflow-hidden mb-20"
    >
      <div className="w-full max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          {/* Text column */}
          <div className="fade-item opacity-0 md:w-1/2 w-full text-center md:text-left flex flex-col justify-between md:min-h-[65vh]">
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
