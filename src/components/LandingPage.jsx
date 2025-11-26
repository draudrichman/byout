import React, { Suspense, useState, useEffect, memo, useRef } from "react";
import Navbar from "./ui/Navbar";
import { AuroraBackground } from "./ui/aurora-background";
import RotatingEarth from "./ui/globe2";

const LandingPage = memo(({ isLoaded }) => {
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(null); // Start with empty state
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isUserHovering, setIsUserHovering] = useState(false);
  const [shouldLoadGlobe, setShouldLoadGlobe] = useState(false);
  const timeoutRef = useRef(null);

  // Delay Globe loading to prevent initial lag
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldLoadGlobe(true);
    }, 19000); // Wait 3 seconds before loading the heavy Globe component

    return () => clearTimeout(timer);
  }, []);

  // Define the three subtitle variations
  const subtitleVariations = [
    {
      line1: "破界有光",
      line1English: "Reframe Markets",
      line2: "Break Boundaries",
      line2Chinese: "落地成境",
    },
    {
      line1: "品牌产品解码重构｜全球顶层战略定位架构",
      line2: "-   独家创新专利技术赋能",
      line3: "-   直通全球顶级零售渠道落地",
    },
    {
      line1: "0-1 助力中国品牌转化为世界品牌",
      line2: "为您构建穿越文化维度｜地理疆域的商业帝国",
      line3: "实现销量与品牌价值双增长",
      line4: "为增长负责，为结果买单",
    },
  ];

  const slideDurations = {
    0: 3000, // 1st slide
    1: 4000, // 2nd slide
    2: 5000, // 3rd slide
    null: 1000, // empty slide
  };

  useEffect(() => {
    const scheduleTransition = () => {
      if (isUserHovering) return;

      const duration =
        slideDurations[
          currentSubtitleIndex === null ? "null" : currentSubtitleIndex
        ];

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentSubtitleIndex((prev) => {
            // Cycle through: null -> 0 -> 1 -> 2 -> null -> ...
            if (prev === null) return 0;
            if (prev === 2) return null;
            return prev + 1;
          });
          setIsTransitioning(false);
        }, 300); // Transition animation time
      }, duration);
    };

    scheduleTransition();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentSubtitleIndex, isUserHovering]);

  // Handle tab hover
  const handleTabHover = (index) => {
    setIsUserHovering(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSubtitleIndex(index);
      setIsTransitioning(false);
    }, 150);
  };

  const handleTabLeave = () => {
    setIsUserHovering(false);
    // useEffect will handle restarting the timer
  };

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
                <h2 className="font-jhenghei text-gray-300 text-[clamp(1rem,2.6vw,2.25rem)] font-extralight lg:tracking-[0.35em] tracking-widest">
                  {current.line1} {/* 破界有光 */}
                </h2>
                {/* English text */}
                <span className="font-geniso text-gray-300 [word-spacing:0.5em] text-[clamp(0.875rem,1.6vw,1.5rem)] font-semibold tracking-[0.15em] whitespace-nowrap">
                  {current.line1English} {/* BREAK BOUNDARIES */}
                </span>
              </div>

              {/* Right Column */}
              <div className="flex flex-col space-y-1 sm:space-y-2 flex-1 text-right">
                {/* English text */}
                <span className="font-geniso [word-spacing:0.5em] text-gray-300 text-[clamp(0.875rem,1.6vw,1.5rem)] font-semibold tracking-[0.15em] whitespace-nowrap">
                  {current.line2} {/* REFRAME MARKETS */}
                </span>
                {/* Chinese text */}
                <h2 className="font-jhenghei text-gray-300 text-[clamp(1rem,2.6vw,2.25rem)] font-extralight lg:tracking-[0.35em] tracking-widest">
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
            <div className="font-jhenghei text-gray-300 lg:text-2xl text-lg font-light tracking-[0.24em] leading-relaxed lg:text-left text-center">
              {current.line1}
            </div>
            <div className="font-jhenghei text-gray-300 lg:text-xl text-md font-light tracking-[0.16em] leading-relaxed pl-0 lg:text-left text-center">
              {current.line2}
            </div>
            <div className="font-jhenghei text-gray-300 lg:text-xl text-md font-light tracking-[0.16em] leading-relaxed pl-0 lg:text-left text-center">
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
            <div className="font-jhenghei text-gray-100 lg:text-3xl text-lg font-light tracking-[0.25em] leading-relaxed lg:text-left text-center">
              {current.line1}
            </div>
            <div className="font-jhenghei text-gray-100 lg:text-xl text-base font-extralight tracking-widest leading-relaxed lg:text-left text-center">
              {current.line2}
            </div>
            <div className="font-jhenghei text-gray-100 lg:text-xl text-base font-extralight tracking-widest leading-relaxed lg:text-left text-center">
              {current.line3}
            </div>
            <div className="font-jhenghei text-gray-100 lg:text-xl text-base font-extralight tracking-widest leading-relaxed lg:text-left text-center">
              {current.line4}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    // <AuroraBackground>
    <>
      <div className="absolute inset-0 w-full h-full bg-black -z-1" />
      <div
        className="w-screen lg:h-screen overflow-hidden relative z-10"
        style={{
          background: `
              radial-gradient(circle at center, #000000 0, #cbcbcb00 100%), linear-gradient(2deg, #c7c7c7, transparent 40%)
              `,
        }}
      >
        {/* Hero fade-in animation styles */}
        <style jsx>{`
          @keyframes show-hero {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
        `}</style>

        {/* Navigation */}
        <Navbar isLoaded={isLoaded} />

        {/* Globe Background Section */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-full h-full flex items-end justify-center opacity-0 pb-[0%]"
            style={{ animation: "show-hero 1s ease-in 7s forwards" }}
          >
            {shouldLoadGlobe ? (
              <Suspense
                fallback={
                  <div className="flex items-center justify-center text-white">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mr-3"></div>
                    Loading Globe...
                  </div>
                }
              >
                {/* <World data={sampleArcs} globeConfig={globeConfig} /> */}
                <RotatingEarth width={1650} height={1650} />
              </Suspense>
            ) : (
              <div className="flex items-center justify-center text-transparent">
                {/* Empty placeholder during initial load */}
              </div>
            )}
          </div>
        </div>

        <div
          className="relative z-10 flex h-full lg:flex-row flex-col opacity-0"
          style={{ animation: "show-hero 1s ease-in 7s forwards" }}
        >
          {/* Content Section */}
          <div className="lg:w-1/2 w-full flex flex-col lg:justify-center justify-start lg:pl-24 lg:pr-8 px-6 lg:py-0 py-8 lg:pt-0 pt-35">
            {/* Morphing Subtitles */}
            <div className="lg:mb-16 mb-8 lg:pl-3 px-0 lg:min-h-[200px] min-h-[150px] flex items-center lg:items-start">
              {renderSubtitle()}
            </div>

            {/* Vertical progress indicators for subtitle transitions */}
            <div className="lg:absolute lg:left-8 lg:top-[43%] lg:h-1/2 lg:flex-col lg:gap-12 static flex flex-row justify-center lg:justify-start gap-8 lg:mb-0 mb-8">
              {subtitleVariations.map((_, index) => (
                <div
                  key={index}
                  className={`lg:w-1 lg:h-16 w-16 h-1 border border-gray-400 transition-all duration-500 cursor-pointer ${
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

          {/* Right section with Prism Logo */}
          <div className="lg:w-1/2 w-full flex flex-col lg:justify-center justify-start lg:pl-8 lg:pr-24 px-6 lg:py-0 py-8">
            <h1 className="text-white flex justify-center lg:justify-end">
              <img
                src="./img/logos/prism.svg"
                alt="Prism Logo"
                loading="eager"
                className="lg:max-w-[570px] max-w-[300px] w-auto h-auto"
              />
            </h1>
          </div>
        </div>
      </div>
    </>

    // </AuroraBackground>
  );
});

LandingPage.displayName = "LandingPage";

export default LandingPage;
