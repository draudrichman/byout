import { useLayoutEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";
import ShinyText from "./ui/shiny-text";

const logos = [
  { name: "Brand 1", url: "/b/b1.svg" },
  { name: "Brand 2", url: "/b/b2.svg" },
  { name: "Brand 3", url: "/b/b3.svg" },
  { name: "Brand 4", url: "/b/b4.svg" },
  { name: "Brand 5", url: "/b/b5.svg" },
  { name: "Brand 6", url: "/b/b6.svg" },
  { name: "Brand 7", url: "/b/b7.svg" },
  { name: "Brand 8", url: "/b/b8.svg" },
  { name: "Brand 9", url: "/b/b9.svg" },
  { name: "Brand 10", url: "/b/b10.svg" },
  { name: "Brand 11", url: "/b/b11.svg" },
  { name: "Brand 12", url: "/b/b12.svg" },
];

export default function BigLogo() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
    rootMargin: "120px 0px",
  });
  // Local ref to the section so we can scope text animations
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  useLayoutEffect(() => {
    if (!inView || hasAnimatedRef.current || !containerRef.current) return;
    hasAnimatedRef.current = true;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      // Fade-in/stagger for heading, subheading and paragraph (batched)
      const sectionEl = sectionRef.current;
      if (sectionEl) {
        const fadeItems = sectionEl.querySelectorAll(".fade-item");
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
            },
          );
        }
      }

      // Logos: initial spiral -> final grid position at origin (batched)
      const nodeList = containerRef.current?.querySelectorAll(".logo-item");
      if (!nodeList || !nodeList.length) return;
      const items = gsap.utils.toArray(nodeList);
      const total = logos.length;

      // Initial state (3D spiral)
      gsap.set(items, {
        x: (i) => {
          const angle = (i / total) * Math.PI * 6;
          const radius = 600 + (i / total) * 400;
          return Math.cos(angle) * radius;
        },
        y: (i) => (i / total) * 1200 - 600,
        z: (i) => {
          const angle = (i / total) * Math.PI * 6;
          const radius = 600 + (i / total) * 400;
          return Math.sin(angle) * radius;
        },
        scale: prefersReduced ? 1 : 0,
        rotationX: prefersReduced ? 0 : () => Math.random() * 360,
        rotationY: prefersReduced ? 0 : () => Math.random() * 360,
        rotationZ: prefersReduced ? 0 : () => Math.random() * 360,
        opacity: prefersReduced ? 1 : 0,
        willChange: "transform, opacity",
        force3D: true,
      });

      if (prefersReduced) {
        gsap.set(items, {
          x: 0,
          y: 0,
          z: 0,
          scale: 1,
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
          opacity: 1,
          clearProps: "willChange",
          force3D: true,
        });
      } else {
        gsap.to(items, {
          x: 0,
          y: 0,
          z: 0,
          scale: 1,
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
          opacity: 1,
          duration: 2.0,
          ease: "power3.out",
          stagger: { each: 0.07, from: 0 },
          force3D: true,
          overwrite: "auto",
          onComplete: () => gsap.set(items, { clearProps: "willChange" }),
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [inView]);

  return (
    <section
      ref={(node) => {
        // attach both the useInView ref and our local ref
        if (typeof ref === "function") ref(node);
        else if (ref && typeof ref === "object") ref.current = node;
        sectionRef.current = node;
      }}
      className="relative w-full min-h-[90vh] flex items-center justify-center py-0 overflow-hidden"
    >
      {/* Main container: column on mobile, row on large screens */}
      <div className="w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row lg:justify-between lg:items-start">
        {/* --- Text Content (Left on desktop, Top on mobile) --- */}
        <div className="lg:w-1/2 lg:pr-12 mb-10 mt-10 lg:mb-0 lg:mt-0 text-center lg:text-left">
          {/* Main Heading: "HONOR GROWTH" */}
          {/* <h1 class="fade-item opacity-0 text-center lg:text-left text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold text-[#efe8e8a4] tracking-tight leading-none">
            HONOR GROWTH
          </h1> */}
          <ShinyText
            text="HONOR GROWTH"
            disabled={false}
            speed={2}
            className="fade-item opacity-0 font-geniso text-center lg:text-left text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold tracking-tight leading-none"
          />
          <p className="fade-item opacity-0 text-center lg:text-left mt-8 md:mt-10 text-lg sm:text-xl lg:text-4xl font-jhenghei font-semibold text-gray-400 leading-relaxed">
            我们是红点、iF、长城奖、
            <br /> TOP Digital等
            <br /> 国内外大奖认可的新一代国际品牌
          </p>

          {/* Subheading in orange */}
          <div className="mt-6 md:mt-8 text-center lg:text-left">
            <p className="fade-item opacity-0 text-lg sm:text-3xl lg:text-4xl text-[#F58220] font-semibold font-geniso tracking-wide leading-tight">
              HONOR THE GROWTH OF A NEW GENERATION OF INTERNATIONAL BRANDS
            </p>
          </div>

          {/* Text in Chinese */}
        </div>

        {/* --- Logos Grid (Right on desktop, Bottom on mobile) --- */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <div
            ref={containerRef}
            // Grid layout: Always 4 columns to achieve 3 rows of 4 logos (12 total)
            className="grid grid-cols-4 gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-20 max-w-lg lg:max-w-none"
            style={{
              perspective: "2000px",
              perspectiveOrigin: "center center",
              transformStyle: "preserve-3d",
            }}
          >
            {logos.map((logo, index) => (
              <div
                key={index}
                className="logo-item relative w-12 h-12 sm:w-16 sm:h-16 md:w-27 md:h-27 flex items-center justify-center"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="relative w-full h-full">
                  {/* White background container for logo visibility */}
                  {/* <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-lg border border-white/20 shadow-lg"></div> */}
                  <div className="absolute inset-0 animate-shine bg-gradient-to-br from-gray-100 via-silver-300 to-gray-400 backdrop-blur-sm rounded-lg border border-white/20 shadow-lg"></div>

                  <div className="relative w-full h-full p-2 flex items-center justify-center">
                    <img
                      // Using a placeholder image for stability since original local file paths might fail
                      src={logo.url}
                      alt={`Brand Logo ${index + 1}`}
                      className="w-full h-full object-contain filter contrast-110 saturate-110"
                      crossOrigin="anonymous"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        // Fallback: hide broken image and optionally show text
                        e.target.style.display = "none";
                        const parent = e.target.closest(".logo-item");
                        if (parent) {
                          parent.textContent = `B${index + 1}`;
                          parent.classList.add(
                            "text-sm",
                            "font-bold",
                            "text-gray-800",
                          );
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
