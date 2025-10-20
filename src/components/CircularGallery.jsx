import { useEffect, useRef, useState } from "react";

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
                className="text-amber-500"
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
                  className="text-amber-500"
                />
              );
            })}
          </g>
        </svg>
      </div>

      {/* Border frame */}
      <div className="absolute inset-4 border-2 border-gray-600">
        {/* Corner decorations */}
        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-amber-500" />
        <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-amber-500" />
        <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-amber-500" />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-amber-500" />
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
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
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
    isDragging: false,
    startX: 0,
    dragStart: 0,
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
  const scrollSpeed = 2.5;

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

  // Snap with momentum (for drag end)
  const snapWithMomentum = () => {
    const scroll = scrollRef.current;
    const currentPos = Math.abs(scroll.current);
    const targetPos = Math.abs(scroll.target);
    const currentIndex = currentPos / (cardWidth + cardGap);
    const delta = targetPos - currentPos;

    let itemIndex;
    if (Math.abs(delta) > (cardWidth + cardGap) * 0.15) {
      itemIndex =
        delta > 0 ? Math.ceil(currentIndex) : Math.floor(currentIndex);
    } else {
      itemIndex = Math.round(currentIndex);
    }

    const targetPosition = itemIndex * (cardWidth + cardGap);
    const sign = scroll.current < 0 ? -1 : 1;
    scroll.target = sign * targetPosition;
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

  // Animation loop
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

  // Mouse/Touch handlers
  const handleStart = (clientX) => {
    scrollRef.current.isDragging = true;
    scrollRef.current.startX = clientX;
    scrollRef.current.dragStart = scrollRef.current.target;
  };

  const handleMove = (clientX) => {
    if (!scrollRef.current.isDragging) return;
    const delta = (scrollRef.current.startX - clientX) * 0.025 * scrollSpeed;
    scrollRef.current.target = scrollRef.current.dragStart + delta;
  };

  const handleEnd = () => {
    if (!scrollRef.current.isDragging) return;
    scrollRef.current.isDragging = false;
    snapWithMomentum();
  };

  const handleWheel = (e) => {
    const delta = e.deltaY || e.wheelDelta || e.detail;
    scrollRef.current.target += (delta > 0 ? scrollSpeed : -scrollSpeed) * 0.2;
    snapToNearest();
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      {/* Header */}
      <div className="absolute top-8 left-8 z-20 flex items-center gap-4">
        <div className="text-2xl font-bold tracking-widest text-gray-300">
          STEM
        </div>
        <div className="px-3 py-1 bg-gray-700 text-gray-300 text-xs font-bold tracking-wider">
          U.S. ARMY
        </div>
      </div>

      {/* Top right corner decoration */}
      <div className="absolute top-8 right-8 z-20">
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle
            cx="20"
            cy="20"
            r="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-600"
          />
          {[...Array(8)].map((_, i) => (
            <circle
              key={i}
              cx={20 + Math.cos((i * Math.PI) / 4) * 18}
              cy={20 + Math.sin((i * Math.PI) / 4) * 18}
              r="2"
              fill="currentColor"
              className="text-gray-600"
            />
          ))}
        </svg>
      </div>

      {/* Gallery container */}
      <div
        ref={containerRef}
        className="relative w-full h-full"
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
        onWheel={handleWheel}
      >
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2">
          {cards.map((card, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="absolute top-0 flex-shrink-0 cursor-grab active:cursor-grabbing backdrop-blur-sm border border-gray-700"
              style={{
                width: `${cardWidth}px`,
                height: `${cardWidth}px`,
                left: `-${cardWidth / 2}px`,
                top: `-${cardWidth / 2}px`,
              }}
            >
              <Card data={card} isActive={index === activeIndex} />
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
                ? "text-amber-500 scale-125"
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
