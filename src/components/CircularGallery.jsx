import { useEffect, useRef, useState, useCallback } from "react";

// Utility functions
function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Card Component - Easy to customize
function Card({ data, isActive }) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* Background geometric pattern */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 400 400">
          {/* Grid pattern */}
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-slate-500"
              />
            </pattern>
          </defs>
          <rect width="400" height="400" fill="url(#grid)" />

          {/* Geometric star */}
          <g transform="translate(200, 200)">
            {[...Array(8)].map((_, i) => {
              const angle = (i * 45 * Math.PI) / 180;
              const x1 = Math.cos(angle) * 60;
              const y1 = Math.sin(angle) * 60;
              const x2 = Math.cos(angle + Math.PI / 8) * 120;
              const y2 = Math.sin(angle + Math.PI / 8) * 120;
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-slate-400"
                />
              );
            })}
          </g>
        </svg>
      </div>

      {/* Border frame */}
      <div
        className={
          `absolute inset-4 border-2 ` +
          (isActive
            ? "border-slate-200/90 shadow-[0_0_20px_rgba(200,200,210,0.35)]"
            : "border-gray-600")
        }
      >
        {/* Corner decorations */}
        <div
          className={
            `absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 ` +
            (isActive ? "border-slate-200" : "border-slate-400")
          }
        />
        <div
          className={
            `absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 ` +
            (isActive ? "border-slate-200" : "border-slate-400")
          }
        />
        <div
          className={
            `absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 ` +
            (isActive ? "border-slate-200" : "border-slate-400")
          }
        />
        <div
          className={
            `absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 ` +
            (isActive ? "border-slate-200" : "border-slate-400")
          }
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <div className="text-6xl font-bold text-gray-300 mb-4 font-mono tracking-wider">
          {data.number}
        </div>
        <div className="bg-white text-black px-4 py-1 inline-block font-bold text-sm tracking-widest">
          {data.title}
        </div>
      </div>

      {/* Active indicator */}
      {isActive && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-2.5 h-2.5 bg-slate-300 rounded-full animate-pulse shadow-[0_0_12px_rgba(200,200,210,0.7)]" />
        </div>
      )}
    </div>
  );
}

// Gallery Component
export default function MilitaryGallery() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const scrollRef = useRef({
    current: 0,
    target: 0,
    last: 0,
    ease: 0.08,
    isDown: false,
    start: 0,
    stop: 0,
    position: 0,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const cards = [
    { number: "01", title: "Brand Development" },
    { number: "02", title: "Technology" },
    { number: "03", title: "Retail Operations" },
  ];

  const cardWidth = 400;
  const cardGap = 100;

  // Snap to nearest card
  const snapToNearest = useRef(
    debounce(() => {
      const scroll = scrollRef.current;
      const itemIndex = Math.round(
        Math.abs(scroll.current) / (cardWidth + cardGap)
      );
      const targetPosition = itemIndex * (cardWidth + cardGap);
      const sign = scroll.current < 0 ? -1 : 1;
      scroll.target = sign * targetPosition;
    }, 120)
  ).current;

  // Snap to nearest card (simplified like test.html)
  const snapToNearestCard = () => {
    const scroll = scrollRef.current;
    const itemWidth = cardWidth + cardGap;
    const itemIndex = Math.round(Math.abs(scroll.target) / itemWidth);
    const newTarget = itemWidth * itemIndex;
    scroll.target = scroll.target < 0 ? -newTarget : newTarget;
  };

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Animation loop (simplified like test.html)
  useEffect(() => {
    let rafId;
    const animate = () => {
      const scroll = scrollRef.current;

      // Smooth lerp animation
      scroll.current = lerp(scroll.current, scroll.target, scroll.ease);

      // Determine direction
      const direction = scroll.current > scroll.last ? "right" : "left";

      // Update each card with infinite loop logic
      cardsRef.current.forEach((cardEl, index) => {
        if (!cardEl) return;

        const cardPosition = index * (cardWidth + cardGap);
        let x = cardPosition - scroll.current;

        // Infinite loop wrapping
        const viewportHalf = dimensions.width / 2;
        const totalWidth = (cardWidth + cardGap) * cards.length;

        if (direction === "right" && x + cardWidth / 2 < -viewportHalf) {
          x += totalWidth;
        }
        if (direction === "left" && x - cardWidth / 2 > viewportHalf) {
          x -= totalWidth;
        }

        cardEl.style.transform = `translateX(${x}px)`;
      });

      // Update active card based on center position
      const centerIndex =
        Math.round(Math.abs(scroll.current) / (cardWidth + cardGap)) %
        cards.length;
      setActiveIndex(centerIndex);

      scroll.last = scroll.current;
      rafId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(rafId);
  }, [dimensions.width, cards.length]);

  // Drag handlers (exact copy from test.html)
  const onTouchDown = useCallback((event) => {
    const scroll = scrollRef.current;
    scroll.isDown = true;
    scroll.position = scroll.current;
    scroll.start = event.touches ? event.touches[0].clientX : event.clientX;
    scroll.stop = scroll.start;
  }, []);

  const onTouchMove = useCallback((event) => {
    const scroll = scrollRef.current;
    if (!scroll.isDown) return;
    scroll.stop = event.touches ? event.touches[0].clientX : event.clientX;
    const distance = scroll.start - scroll.stop;
    scroll.target = scroll.position + distance;
  }, []);

  const onTouchUp = useCallback(() => {
    const scroll = scrollRef.current;
    scroll.isDown = false;
    snapToNearestCard();
  }, []);

  // Click prevention when dragging (from test.html)
  const handleClick = useCallback((event) => {
    const scroll = scrollRef.current;
    const dragDistance = Math.abs(scroll.start - scroll.stop);
    if (dragDistance > 10) {
      event.preventDefault();
    }
  }, []);

  // Global event listeners (exact copy from test.html)
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      onTouchMove(e);
    };

    const handleGlobalMouseUp = (e) => {
      onTouchUp(e);
    };

    const handleGlobalTouchMove = (e) => {
      onTouchMove(e);
    };

    const handleGlobalTouchUp = (e) => {
      onTouchUp(e);
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("touchmove", handleGlobalTouchMove);
    window.addEventListener("touchend", handleGlobalTouchUp);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("touchmove", handleGlobalTouchMove);
      window.removeEventListener("touchend", handleGlobalTouchUp);
    };
  }, [onTouchMove, onTouchUp]);

  const handleWheel = (e) => {
    const delta = e.deltaY || e.wheelDelta || e.detail;
    scrollRef.current.target += delta * 0.5;
    snapToNearest();
  };

  return (
    <div className="w-full h-[70vh] overflow-hidden">
      {/* Top right corner decoration */}

      {/* Gallery container */}
      <div
        ref={containerRef}
        className="relative w-full h-full select-none"
        onMouseDown={onTouchDown}
        onTouchStart={onTouchDown}
        onWheel={handleWheel}
        onClick={handleClick}
      >
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2">
          {cards.map((card, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={
                `absolute top-0 flex-shrink-0 cursor-grab active:cursor-grabbing backdrop-blur-sm ` +
                (index === activeIndex
                  ? "border border-slate-200 ring-1 ring-slate-200/60 shadow-[0_0_25px_rgba(200,200,210,0.45),0_0_50px_rgba(200,200,210,0.25)]"
                  : "border border-gray-700")
              }
              style={{
                width: `${cardWidth}px`,
                height: `${cardWidth}px`,
                left: `-${cardWidth / 2}px`,
                top: `-${cardWidth / 2}px`,
                willChange: "transform",
              }}
            >
              <div
                className={
                  `h-full w-full transition-transform duration-300 ease-out ` +
                  (index === activeIndex ? "scale-105" : "scale-[0.97]")
                }
              >
                <Card data={card} isActive={index === activeIndex} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              scrollRef.current.target = index * (cardWidth + cardGap);
            }}
            className={`text-xs font-mono transition-all ${
              index === activeIndex
                ? "text-slate-200 scale-125"
                : "text-gray-600 hover:text-gray-400"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </button>
        ))}
      </div>
    </div>
  );
}
