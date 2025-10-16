import React, { lazy, Suspense, useState, useEffect, memo } from "react";
import Navbar from "./ui/Navbar";
import WaveBackground from "./WaveBackground";

const World = lazy(() =>
  import("../components/ui/globe").then((m) => ({ default: m.World }))
);

const LandingPage = memo(() => {
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  // Auto-transition between subtitles
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSubtitleIndex(
          (prev) => (prev + 1) % subtitleVariations.length
        );
        setIsTransitioning(false);
      }, 300);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

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
          <div className="flex flex-col space-y-2">
            <div className="flex items-baseline space-x-6">
              <h2 className="text-white text-[2vw] font-extralight tracking-[0.2em]">
                {current.line1}
              </h2>
              <span
                className="text-gray-400 text-4xl font-extralight tracking-widest"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                {current.line1English}
              </span>
            </div>
            <div className="flex items-baseline space-x-6 pl-12">
              <span
                className="text-gray-400 text-4xl font-extralight tracking-widest"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                {current.line2}
              </span>
              <h2 className="text-white text-[2vw] font-extralight tracking-[0.2em]">
                {current.line2Chinese}
              </h2>
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
          <div className="space-y-6">
            <div className="text-white text-4xl font-light tracking-wide leading-relaxed">
              {current.line1}
            </div>
            <div className="text-gray-300 text-3xl font-light tracking-wide leading-relaxed pl-4">
              {current.line2}
            </div>
            <div className="text-gray-300 text-3xl font-light tracking-wide leading-relaxed pl-4">
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
          <div className="space-y-6">
            <div className="text-white text-4xl font-light tracking-wide leading-relaxed">
              {current.line1}
            </div>
            <div className="text-gray-100 text-3xl font-light tracking-wide leading-relaxed">
              {current.line2}
            </div>
            <div className="text-gray-100 text-3xl font-light tracking-wide leading-relaxed">
              {current.line3}
            </div>
            <div className="text-gray-100 text-3xl font-light tracking-wide leading-relaxed">
              {current.line4}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div
      className="w-screen h-screen overflow-hidden relative"
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

      <div className="relative z-10 flex h-full">
        {/* Content Section */}
        <div className="w-1/2 flex flex-col justify-center pl-24 pr-8">
          {/* Main Title */}
          <h1 className="text-white mb-12">
            <img src="./img/logos/prism.svg" alt="Prism Logo" loading="eager" />
          </h1>

          {/* Morphing Subtitles */}
          <div className="mb-16 pl-3 min-h-[200px]">{renderSubtitle()}</div>

          {/* Vertical progress indicators for subtitle transitions */}
          <div className="absolute left-8 top-[43%] h-1/2 flex flex-col gap-16">
            {subtitleVariations.map((_, index) => (
              <div
                key={index}
                className={`w-1 h-24 border border-gray-400 transition-all duration-500 ${
                  index === currentSubtitleIndex
                    ? "shadow-lg shadow-white/80 border-white bg-white"
                    : "border-opacity-30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Globe Section */}
        <div className="w-1/2 flex items-center justify-center relative">
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
