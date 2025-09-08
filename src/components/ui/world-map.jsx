"use client";;
import { useRef, useEffect, useState, useMemo } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";

export function WorldMap({
  dots = [],
  lineColor = "#0ea5e9"
}) {
  const svgRef = useRef(null);
  const [isDark, setIsDark] = useState(false);
  
  // Memoize the map creation to prevent recreation on every render
  const map = useMemo(() => new DottedMap({ height: 100, grid: "diagonal" }), []);

  // Simple dark mode detection
  useEffect(() => {
    const checkDarkMode = () => {
      const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches ||
                      document.documentElement.classList.contains('dark');
      setIsDark(darkMode);
    };

    checkDarkMode();
    
    // Listen for changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const observer = new MutationObserver(checkDarkMode);
    
    mediaQuery.addEventListener('change', checkDarkMode);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });

    return () => {
      mediaQuery.removeEventListener('change', checkDarkMode);
      observer.disconnect();
    };
  }, []);

  // Memoize the SVG map generation
  const svgMap = useMemo(() => {
    return map.getSVG({
      radius: 0.22,
      color: isDark ? "#FFFFFF40" : "#00000040",
      shape: "circle",
      backgroundColor: "transparent",
    });
  }, [map, isDark]);

  const projectPoint = useMemo(() => (lat, lng) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  }, []);

  const createCurvedPath = useMemo(() => (start, end) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  }, []);

  // Memoize projected points to avoid recalculation
  const projectedDots = useMemo(() => {
    return dots.map(dot => ({
      ...dot,
      startPoint: projectPoint(dot.start.lat, dot.start.lng),
      endPoint: projectPoint(dot.end.lat, dot.end.lng),
    }));
  }, [dots, projectPoint]);

  return (
    <div className="w-full aspect-[2/1] bg-transparent relative font-sans">
      {/* Holographic Glow Background */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-pink-500/10 blur-xl"></div>
      <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-blue-500/5 via-transparent to-green-500/5"></div>
      
      {/* Retro Grid Lines */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `
          linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }}></div>
      
      {/* Main Container with Retro Border */}
      <div className="relative border border-cyan-400/30 rounded-lg bg-black/20 backdrop-blur-sm overflow-hidden">
        {/* Animated Border Glow */}
        <div className="absolute inset-0 rounded-lg">
          <div className="absolute inset-0 rounded-lg border border-cyan-400/50 animate-pulse"></div>
          <div className="absolute inset-0 rounded-lg border border-purple-400/30 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
          className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none relative z-10 filter brightness-150 contrast-125"
          alt="world map"
          height="495"
          width="1056"
          draggable={false} />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none">
        {projectedDots.map((dot, i) => (
          <g key={`path-group-${i}`}>
            <motion.path
              d={createCurvedPath(dot.startPoint, dot.endPoint)}
              fill="none"
              stroke="url(#path-gradient)"
              strokeWidth="1"
              initial={{
                pathLength: 0,
              }}
              animate={{
                pathLength: 1,
              }}
              transition={{
                duration: 1.5,
                delay: 0.3 * i,
                ease: "easeInOut",
              }}
            />
          </g>
        ))}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {projectedDots.map((dot, i) => (
          <g key={`points-group-${i}`}>
            <g key={`start-${i}`}>
              <circle
                cx={dot.startPoint.x}
                cy={dot.startPoint.y}
                r="2"
                fill={lineColor} 
              />
              <motion.circle
                cx={dot.startPoint.x}
                cy={dot.startPoint.y}
                r="2"
                fill={lineColor}
                initial={{ r: 2, opacity: 0.5 }}
                animate={{ r: 8, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            </g>
            <g key={`end-${i}`}>
              <circle
                cx={dot.endPoint.x}
                cy={dot.endPoint.y}
                r="2"
                fill={lineColor} 
              />
              <motion.circle
                cx={dot.endPoint.x}
                cy={dot.endPoint.y}
                r="2"
                fill={lineColor}
                initial={{ r: 2, opacity: 0.5 }}
                animate={{ r: 8, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.2
                }}
              />
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
