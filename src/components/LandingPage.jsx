import React, { lazy, Suspense, useState, useEffect, memo } from "react";
import Navbar from "./ui/Navbar";
import WaveBackground from "./WaveBackground";

const World = lazy(() =>
  import("../components/ui/globe").then((m) => ({ default: m.World }))
);

const LandingPage = memo(() => {
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(null); // Start with empty state
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isUserHovering, setIsUserHovering] = useState(false);
  const [intervalRef, setIntervalRef] = useState(null);

  // Define the three subtitle variations
  const subtitleVariations = [
    {
      line1: "破界有光",
      line1English: "Break Boundaries",
      line2: "Reframe Markets",
      line2Chinese: "落地成境",
    },
    {
      line1: "品牌产品解码重构｜全球顶层战略定位架构",
      line2: "× 独家创新专利技术赋能",
      line3: "× 直通全球顶级零售渠道落地",
    },
    {
      line1: "0-1 助力中国品牌转化为世界品牌",
      line2: "为您构建穿越文化维度｜地理疆域的商业帝国",
      line3: "实现销量与品牌价值双增长",
      line4: "为增长负责，为结果买单",
    },
  ];

  // Auto-cycling functionality
  const startAutoCycle = (startFromIndex = null) => {
    if (intervalRef) {
      clearInterval(intervalRef);
    }

    const newInterval = setInterval(() => {
      if (!isUserHovering) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentSubtitleIndex((prev) => {
            // Cycle through: null -> 0 -> 1 -> 2 -> null -> ...
            if (prev === null) return 0;
            if (prev === 2) return null;
            return prev + 1;
          });
          setIsTransitioning(false);
        }, 300);
      }
    }, 4000);

    setIntervalRef(newInterval);
  };

  // Initialize auto-cycling on mount
  useEffect(() => {
    startAutoCycle();
    return () => {
      if (intervalRef) {
        clearInterval(intervalRef);
      }
    };
  }, []);

  // Handle tab hover
  const handleTabHover = (index) => {
    setIsUserHovering(true);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSubtitleIndex(index);
      setIsTransitioning(false);
    }, 150);
  };

  const handleTabLeave = () => {
    setIsUserHovering(false);
    // Reset auto-cycle from current position
    startAutoCycle(currentSubtitleIndex);
  };

  const globeConfig = {
    pointSize: 5,
    pointStyle: "dot",
    pointOpacity: 1,
    particlesSize: 2,
    hexPolygonColor: "#414141",
    chinaHexPolygonColor: "#ffffff",
    targetingCountriesColor: "#ffffff",
    globeColor: "#ffffff",
    globeOpacity: 0,
    showAtmosphere: false,
    atmosphereColor: "#ffffff",
    atmosphereAltitude: 0.2,
    emissive: "#ffffff",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(0, 121, 145,0.7)",
    ambientLight: "#ffffff",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 1,
    metallicIntensity: 0.9,
    glowIntensity: 0.8,
  };

  const colors = [
    "#A0A0A0", // Medium silver, neutral metallic
    "#E8ECEF", // Very light silver, almost white
    "#6E7B8B", // Dark steel silver with blue undertone
    "#343a40", // Warm silver with golden tint
    "#B0BEC5", // Light blue-gray silver
    "#6c757d", // Deep chrome blue, darker shade
    "#F5F6F5", // Bright, near-white silver
    "#8A8A8A", // Mid-dark silver, cool tone
    "#C7BCA1", // Light bronze-silver mix
    "#5C5C5C", // Dark charcoal silver
    "#A3BFFA", // Pale blue chrome
    "#D9D9D6", // Soft, neutral light silver
  ];

  // Country coordinates
  const chinaLat = 35.8617;
  const chinaLng = 104.1954;
  const usaLat = 39.8283;
  const usaLng = -98.5795;
  const canadaLat = 56.1304;
  const canadaLng = -106.3468;
  const cambodiaLat = 12.5657;
  const cambodiaLng = 104.991;
  const japanLat = 36.2048;
  const japanLng = 138.2529;
  const australiaLat = -25.2744;
  const australiaLng = 133.7751;
  const newZealandLat = -40.9006;
  const newZealandLng = 174.886;

  const sampleArcs = [
    {
      order: 1,
      startLat: chinaLat,
      startLng: chinaLng,
      endLat: usaLat,
      endLng: usaLng,
      arcAlt: 0.3,
      color: colors[0],
    },
    {
      order: 1,
      startLat: chinaLat,
      startLng: chinaLng,
      endLat: canadaLat,
      endLng: canadaLng,
      arcAlt: 0.3,
      color: colors[1],
    },
    {
      order: 1,
      startLat: chinaLat,
      startLng: chinaLng,
      endLat: cambodiaLat,
      endLng: cambodiaLng,
      arcAlt: 0.3,
      color: colors[2],
    },
    {
      order: 1,
      startLat: chinaLat,
      startLng: chinaLng,
      endLat: japanLat,
      endLng: japanLng,
      arcAlt: 0.3,
      color: colors[3],
    },
    {
      order: 1,
      startLat: chinaLat,
      startLng: chinaLng,
      endLat: australiaLat,
      endLng: australiaLng,
      arcAlt: 0.3,
      color: colors[4],
    },
    {
      order: 1,
      startLat: chinaLat,
      startLng: chinaLng,
      endLat: newZealandLat,
      endLng: newZealandLng,
      arcAlt: 0.3,
      color: colors[5],
    },
  ];

  const renderSubtitle = () => {
    // Show empty state when no tab is hovered
    if (currentSubtitleIndex === null) {
      return (
        <div
          className={`transition-all duration-300 ${
            isTransitioning
              ? "opacity-0 transform translate-y-2"
              : "opacity-100 transform translate-y-0"
          }`}
        >
          <div className="text-gray-500 text-2xl font-light tracking-wide leading-relaxed italic">
            {/* Explore our innovative solutions */}
          </div>
        </div>
      );
    }

    const current = subtitleVariations[currentSubtitleIndex];

    if (currentSubtitleIndex === 0) {
      return (
        <div
          className={`transition-all duration-300 ${
            isTransitioning
              ? "opacity-0 transform translate-y-2"
              : "opacity-100 transform translate-y-0"
          }`}
        >
          <div className="flex flex-col lg:space-y-3 space-y-2 lg:items-start items-center">
            <div className="flex lg:w-full w-[95%] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg gap-4 sm:gap-6 lg:gap-12">
              {/* Left Column */}
              <div className="flex flex-col space-y-1 sm:space-y-2 flex-1">
                {/* Chinese text */}
                <h2 className="font-jhenghei text-white text-[clamp(1rem,2.6vw,2.25rem)] font-extralight lg:tracking-[0.15em] tracking-wide">
                  {current.line1} {/* 破界有光 */}
                </h2>
                {/* English text */}
                <span className="font-geniso text-gray-400 text-[clamp(0.875rem,1.6vw,1.8rem)] tracking-wide whitespace-nowrap">
                  {current.line1English} {/* BREAK BOUNDARIES */}
                </span>
              </div>

              {/* Right Column */}
              <div className="flex flex-col space-y-1 sm:space-y-2 flex-1 text-right">
                {/* English text */}
                <span className="font-geniso text-gray-400 text-[clamp(0.875rem,1.6vw,1.8rem)] tracking-wide whitespace-nowrap">
                  {current.line2} {/* REFRAME MARKETS */}
                </span>
                {/* Chinese text */}
                <h2 className="font-jhenghei text-white text-[clamp(1rem,2.6vw,2.25rem)] font-extralight lg:tracking-[0.15em] tracking-wide">
                  {current.line2Chinese} {/* 落地成境 */}
                </h2>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (currentSubtitleIndex === 1) {
      return (
        <div
          className={`transition-all duration-300 ${
            isTransitioning
              ? "opacity-0 transform translate-y-2"
              : "opacity-100 transform translate-y-0"
          }`}
        >
          <div className="space-y-4">
            <div className="font-jhenghei text-white lg:text-2xl text-lg font-light tracking-wide leading-relaxed lg:text-left text-center">
              {current.line1}
            </div>
            <div className="font-jhenghei text-gray-300 lg:text-xl text-base font-light tracking-wide leading-relaxed lg:pl-3 pl-0 lg:text-left text-center">
              {current.line2}
            </div>
            <div className="font-jhenghei text-gray-300 lg:text-xl text-base font-light tracking-wide leading-relaxed lg:pl-3 pl-0 lg:text-left text-center">
              {current.line3}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={`transition-all duration-300 ${
            isTransitioning
              ? "opacity-0 transform translate-y-2"
              : "opacity-100 transform translate-y-0"
          }`}
        >
          <div className="space-y-4">
            <div className="font-jhenghei text-white lg:text-2xl text-lg font-light tracking-wide leading-relaxed lg:text-left text-center">
              {current.line1}
            </div>
            <div className="font-jhenghei text-gray-100 lg:text-xl text-base font-light tracking-wide leading-relaxed lg:text-left text-center">
              {current.line2}
            </div>
            <div className="font-jhenghei text-gray-100 lg:text-xl text-base font-light tracking-wide leading-relaxed lg:text-left text-center">
              {current.line3}
            </div>
            <div className="font-jhenghei text-gray-100 lg:text-xl text-base font-light tracking-wide leading-relaxed lg:text-left text-center">
              {current.line4}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div
      className="w-screen lg:h-screen overflow-hidden relative"
      style={{
        background: `
  radial-gradient(circle at center, #141414 0, #cbcbcb00 100%), linear-gradient(2deg, #c7c7c7, transparent 40%)
  `,
      }}
    >
      {/* Navigation */}
      <Navbar />
      {/* radial-gradient(circle at center, #141414 0, transparent 100%), linear-gradient(
        2deg, #c9c9c9, transparent 40%) */}

      {/* Background gradient */}
      {/* <div 
        className="absolute w-full h-full"
        style={{
          background: `
          radial-gradient(circle, rgb(0, 0, 0) 0px, #01010100 100%),
          linear-gradient(0deg, rgb(191, 191, 189), #000000f0 70%)
        `
        }}
      /> */}

      <div className="relative z-10 flex h-full lg:flex-row flex-col">
        {/* Content Section */}
        <div className="lg:w-1/2 w-full flex flex-col lg:justify-center justify-start lg:pl-24 lg:pr-8 px-6 lg:py-0 py-8 lg:pt-0 pt-35">
          {/* Main Title */}
          <h1 className="text-white lg:mb-12 mb-8 flex justify-center lg:justify-start">
            <img
              src="./img/logos/prism.svg"
              alt="Prism Logo"
              loading="eager"
              className="lg:max-w-none max-w-[300px] w-auto h-auto"
            />
          </h1>

          {/* Morphing Subtitles */}
          <div className="lg:mb-16 mb-8 lg:pl-3 px-0 lg:min-h-[200px] min-h-[150px] flex items-center lg:items-start">
            {renderSubtitle()}
          </div>

          {/* Vertical progress indicators for subtitle transitions */}
          <div className="lg:absolute lg:left-8 lg:top-[43%] lg:h-1/2 lg:flex-col lg:gap-16 static flex flex-row justify-center gap-8 lg:mb-0 mb-8">
            {subtitleVariations.map((_, index) => (
              <div
                key={index}
                className={`lg:w-1 lg:h-24 w-16 h-1 border border-gray-400 transition-all duration-500 cursor-pointer ${
                  index === currentSubtitleIndex
                    ? "shadow-lg shadow-white/80 border-white bg-white"
                    : "border-opacity-30 hover:border-opacity-60 hover:border-gray-300"
                }`}
                onMouseEnter={() => handleTabHover(index)}
                onMouseLeave={handleTabLeave}
              />
            ))}
          </div>
        </div>

        {/* Globe Section */}
        <div className="lg:w-1/2 w-full flex items-center justify-center relative lg:h-auto h-[60vh] min-h-[300px]">
          <div className="w-full h-full flex items-center justify-center">
            <Suspense
              fallback={
                <div className="flex items-center justify-center text-white">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mr-3"></div>
                  Loading Globe...
                </div>
              }
            >
              <World data={sampleArcs} globeConfig={globeConfig} />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Wave Background at the bottom */}
      {/* <WaveBackground /> */}
    </div>
  );
});

LandingPage.displayName = "LandingPage";

export default LandingPage;
