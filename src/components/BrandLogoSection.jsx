import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

const logos = Array.from({ length: 64 }, (_, i) => `/s/s${i + 1}.svg`);

export default function BrandLogosSection() {
  const sectionRef = useRef(null);
  const [logoStates, setLogoStates] = useState([]);
  const animationFrameRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const hasPlayedRef = useRef(false);
  const cols = 8;
  const rows = Math.ceil(logos.length / cols);
  const [spacing, setSpacing] = useState(80);

  const updateResponsiveMetrics = useCallback(() => {
    const vw = Math.max(
      window.innerWidth || 0,
      document.documentElement.clientWidth || 0
    );
    // Spacing scales with viewport width, but clamped for stability
    const newSpacing = Math.max(40, Math.min(75, vw * 0.06));
    setSpacing(newSpacing);
  }, []);

  useEffect(() => {
    updateResponsiveMetrics();
    window.addEventListener("resize", updateResponsiveMetrics);
    return () => window.removeEventListener("resize", updateResponsiveMetrics);
  }, [updateResponsiveMetrics]);

  const startAnimation = useCallback(() => {
    const spiralPhase1Duration = 2500;
    const settleDuration = 1000;
    const delayBetweenLogos = 40;
    const startTime = Date.now();

    // use component-level grid constants
    const gridYOffsetAnim = spacing * 1.25; // ~100 when spacing is 80

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newStates = [];

      logos.forEach((url, index) => {
        const logoStartTime = index * delayBetweenLogos;
        const logoElapsed = Math.max(0, elapsed - logoStartTime);

        if (logoElapsed === 0) {
          newStates.push({
            id: index,
            url,
            x: 0,
            y: -100,
            z: 0,
            rotation: 0,
            scale: 0,
            opacity: 0,
            isFalling: false,
          });
          return;
        }

        const spiralProgress = Math.min(logoElapsed / spiralPhase1Duration, 1);

        if (spiralProgress < 1) {
          const angle = spiralProgress * Math.PI * 6;
          const radius = spiralProgress * 300;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius - 100 * (1 - spiralProgress);
          const z = Math.sin(spiralProgress * Math.PI * 3) * 200;

          newStates.push({
            id: index,
            url,
            x,
            y,
            z,
            rotation: spiralProgress * 720,
            scale: Math.min(spiralProgress * 1.5, 1),
            opacity: Math.min(spiralProgress * 2, 1),
            isFalling: false,
          });
        } else {
          const settleProgress = Math.min(
            (logoElapsed - spiralPhase1Duration) / settleDuration,
            1
          );
          const angle = 1 * Math.PI * 6;
          const radius = 1 * 300;
          const spiralEndX = Math.cos(angle) * radius;
          const spiralEndY = Math.sin(angle) * radius;
          const spiralEndZ = Math.sin(1 * Math.PI * 3) * 200;

          const col = index % cols;
          const row = Math.floor(index / cols);
          const gridX = (col - (cols - 1) / 2) * spacing;
          const gridY = (row - (rows - 1) / 2) * spacing + gridYOffsetAnim;
          const gridZ = 0;

          const easeProgress =
            settleProgress < 0.5
              ? 2 * settleProgress * settleProgress
              : 1 - Math.pow(-2 * settleProgress + 2, 2) / 2;

          newStates.push({
            id: index,
            url,
            x: spiralEndX + (gridX - spiralEndX) * easeProgress,
            y: spiralEndY + (gridY - spiralEndY) * easeProgress,
            z: spiralEndZ + (gridZ - spiralEndZ) * easeProgress,
            rotation: 720 * (1 - easeProgress),
            scale: 1,
            opacity: 1,
            isFalling: true,
          });
        }
      });

      setLogoStates(newStates);

      const allSettled = newStates.every((state) => {
        if (!state.isFalling) return false;
        const settleTime =
          state.id * delayBetweenLogos + spiralPhase1Duration + settleDuration;
        return elapsed >= settleTime;
      });

      if (!allSettled) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Cancel any further animation frames
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
        // Set final logo states only once
        setLogoStates((prevStates) => {
          // If already in final state, do nothing
          if (
            prevStates.every(
              (state) => state.scale === 1 && state.opacity === 1
            )
          ) {
            return prevStates;
          }
          return logos.map((url, index) => {
            const col = index % cols;
            const row = Math.floor(index / cols);
            const gridX = (col - (cols - 1) / 2) * spacing;
            const gridY = (row - (rows - 1) / 2) * spacing + 100;
            return {
              id: index,
              url,
              x: gridX,
              y: gridY,
              z: 0,
              rotation: 0,
              scale: 1,
              opacity: 1,
              isFalling: true,
            };
          });
        });
        isAnimatingRef.current = false;
        hasPlayedRef.current = true;
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [cols, rows, spacing]);

  useEffect(() => {
    // Initialize logo states
    setLogoStates(
      logos.map((url, index) => ({
        id: index,
        url,
        x: 0,
        y: -100,
        z: 0,
        rotation: 0,
        scale: 0,
        opacity: 0,
        isFalling: false,
      }))
    );

    const el = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isAnimatingRef.current &&
          !hasPlayedRef.current
        ) {
          isAnimatingRef.current = true;
          // Play fade animation for text elements (once) when section comes into view
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
          startAnimation();
        }
      },
      { threshold: 0.3 }
    );

    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) {
        observer.unobserve(el);
      }
      isAnimatingRef.current = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [startAnimation]);

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-[100vh] flex items-center justify-center overflow-hidden mb-20"
    >
      <div className="w-full max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          {/* Text column */}
          <div className="fade-item opacity-0 md:w-1/2 w-full text-center md:text-left flex flex-col justify-between md:min-h-[65vh]">
            {" "}
            {/* Added: flex flex-col justify-between h-screen */}
            <p className="mt-2 text-lg sm:text-xl md:text-3xl text-gray-700 leading-relaxed self-center md:self-start">
              {" "}
              {/* Added: self-start to align left if needed */}
              我们是实战服务超过100家品牌的
              <br />
              专业品牌创意增量供应商
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-[#3F0F6B] tracking-tight leading-none self-center md:self-start">
              {" "}
              {/* Adjusted: removed mt-6, added self-center for centering on small screens, self-start for larger */}
              BRANDS 100+
            </h1>
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
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md flex items-center justify-center">
                      <img
                        src={url}
                        alt={`logo-${idx}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop animated layout: centered and symmetric */}
            <div
              className="hidden md:flex w-full relative items-center justify-center"
              style={{ height: "clamp(320px, 45vh, 560px)" }}
            >
              <div
                style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
                className="w-full h-full relative"
              >
                {logos.map((url, index) => {
                  const state = logoStates[index];
                  const col = index % cols;
                  const row = Math.floor(index / cols);
                  const gridX = (col - (cols - 1) / 2) * spacing;
                  const gridY =
                    (row - (rows - 1) / 2) * spacing + spacing * 0.625; // ~50 when spacing is 80
                  const finalState = {
                    id: index,
                    url,
                    x: gridX,
                    y: gridY,
                    z: 0,
                    rotation: 0,
                    scale: 1,
                    opacity: 1,
                    isFalling: true,
                  };
                  const renderState = state || finalState;
                  return (
                    <div
                      key={renderState.id}
                      className="absolute transition-none"
                      style={{
                        left: "50%",
                        top: "50%",
                        transform: `translate3d(calc(-50% + ${renderState.x}px), calc(-50% + ${renderState.y}px), ${renderState.z}px) rotateZ(${renderState.rotation}deg) scale(${renderState.scale})`,
                        opacity: renderState.opacity,
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <div
                        style={{
                          width: "clamp(40px, 3.8vw, 64px)",
                          height: "clamp(40px, 3.8vw, 64px)",
                        }}
                      >
                        <img
                          src={renderState.url}
                          alt={`logo-${index}`}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
