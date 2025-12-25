import React, { Suspense, useState, useEffect, memo, useRef } from "react";
import { AuroraBackground } from "./ui/aurora-background";
import RotatingEarth from "./ui/globe2";
import Odometer from "react-odometerjs";
import { BorderBeam } from "./ui/border-beam";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@studio-freight/react-lenis";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const HeroSection = memo(() => {
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(null); // Start with empty state
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isUserHovering, setIsUserHovering] = useState(false);
  // Load globe immediately on first paint
  const [shouldLoadGlobe] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0); // 0 = hero, 1 = stats
  const timeoutRef = useRef(null);
  const contentContainerRef = useRef(null);
  const heroSectionRef = useRef(null);
  const lenis = useLenis();
  const [stats, setStats] = useState([
    {
      value: 0,
      target: 100,
      label: "服务品牌",
      description: "Brands Served",
      suffix: "+",
    },
    {
      value: 0,
      target: 7,
      label: "渠道覆盖国家",
      description: "Countries with Retail Channels Coverage",
      suffix: "",
    },
    {
      value: 0,
      target: 11,
      label: "累计销售额",
      description: "Cumulative Sales",
      suffix: "亿",
    },
    {
      value: 0,
      target: 91,
      label: "成功入驻产品",
      description: "Products Listed",
      suffix: "+",
    },
  ]);

  // Scroll-based slide transition with snap
  useEffect(() => {
    if (!heroSectionRef.current || !contentContainerRef.current) return;

    // Configure ScrollTrigger to work with Lenis
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.lagSmoothing(0);
    }

    // Create timeline for smooth vertical slide animation
    const scrollDistance = window.innerHeight * 2; // 3x viewport height for good scroll length

    const scrollTrigger = ScrollTrigger.create({
      trigger: heroSectionRef.current,
      start: "top top",
      end: `+=${scrollDistance}`,
      scrub: 1, // Smooth scrubbing
      pin: true,
      // Do NOT add extra spacer height; let the rest of the page layout remain unchanged
      pinSpacing: false,
      anticipatePin: 0,
      invalidateOnRefresh: true,
      scroller: lenis ? document.body : window,
      markers: false, // Set to true for debugging
      onUpdate: (self) => {
        const progress = self.progress;
        // Switch to stats slide when scroll progress is > 0.5
        const newSlide = progress > 0.5 ? 1 : 0;
        if (newSlide !== currentSlide) {
          setCurrentSlide(newSlide);
        }

        // Animate vertical slide position - only the content slides
        gsap.set(contentContainerRef.current, {
          y: `-${progress * 100}%`,
        });
      },
    });

    return () => {
      scrollTrigger.kill();
      if (lenis) {
        lenis.off("scroll", ScrollTrigger.update);
      }
    };
  }, [currentSlide, lenis]);

  // Stats animation triggered when stats slide becomes active
  useEffect(() => {
    if (currentSlide === 1) {
      setStats((prevStats) =>
        prevStats.map((stat) => ({
          ...stat,
          value: stat.target,
        }))
      );
    } else {
      setStats((prevStats) =>
        prevStats.map((stat) => ({
          ...stat,
          value: 0,
        }))
      );
    }
  }, [currentSlide]);

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
      line2: "-   全球化破圈和颠覆的创新大脑",
      line3: "-   独家创新NNP全营养 + 鲜到鲜专利技术赋能",
      line4: "-   直通全球顶级零售渠道落地",
    },
    {
      line1: "0-1 助力中国品牌转化为世界品牌",
      line2: "为您构建穿越文化维度｜地理疆域的商业帝国",
      line3: "实现销量与品牌价值双增长",
      line4: "为增长负责，为结果买单",
    },
  ];

  useEffect(() => {
    const slideDurations = {
      0: 3000, // 1st slide
      1: 4000, // 2nd slide
      2: 5000, // 3rd slide
      null: 1000, // empty slide
    };

    const scheduleTransition = () => {
      if (isUserHovering || currentSlide !== 0) return; // Only auto-transition on hero slide

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
  }, [currentSubtitleIndex, isUserHovering, currentSlide]);

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
          className={`transition-all duration-300 lg:pt-18 ${
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
          className={`transition-all duration-300 lg:pt-18 ${
            isTransitioning
              ? "opacity-0 transform translate-y-2"
              : "opacity-100 transform translate-y-0"
          }`}
        >
          <div className="flex flex-col lg:space-y-3 space-y-2 lg:items-start items-center">
            <div className="grid grid-cols-2 lg:w-full w-[95%] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg gap-x-4 sm:gap-x-6 lg:gap-x-12 gap-y-3">
              {/* Top Left */}
              <div className="flex flex-col space-y-1 sm:space-y-2">
                {/* Chinese text */}
                <h2 className="-mt-2 font-jhenghei text-gray-300 text-[clamp(1rem,2.6vw,2.25rem)] font-extralight lg:tracking-[0.35em] tracking-widest ">
                  {current.line1} {/* 破界有光 */}
                </h2>
              </div>

              {/* Top Right */}
              <div className="flex flex-col space-y-1 sm:space-y-2 text-right">
                {/* English text */}
                <span className="-mt-2 font-geniso [word-spacing:0.5em] text-gray-300 text-[clamp(0.875rem,1.6vw,1.5rem)] font-semibold tracking-[0.15em] whitespace-nowrap">
                  {current.line2} {/* REFRAME MARKETS */}
                </span>
              </div>

              {/* Bottom Left */}
              <div className="flex flex-col space-y-1 sm:space-y-2">
                {/* English text */}
                <span className="-mt-2 font-geniso text-gray-300 [word-spacing:0.5em] text-[clamp(0.875rem,1.6vw,1.5rem)] font-semibold tracking-[0.15em] whitespace-nowrap">
                  {current.line1English} {/* BREAK BOUNDARIES */}
                </span>
              </div>

              {/* Bottom Right */}
              <div className="flex flex-col space-y-1 sm:space-y-2 text-right">
                {/* Chinese text */}
                <h2 className="-mt-2 font-jhenghei text-gray-300 text-[clamp(1rem,2.6vw,2.25rem)] font-extralight ml-16 lg:tracking-[0.35em] tracking-widest whitespace-nowrap">
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
          className={`transition-all duration-300 lg:pt-18 ${
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
            <div className="font-jhenghei text-gray-300 lg:text-xl text-md font-light tracking-[0.16em] leading-relaxed pl-0 lg:text-left text-center">
              {current.line4}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={`transition-all duration-300 lg:pt-25 ${
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

  const renderStatsContent = () => {
    return (
      <div className="w-screen h-full flex-shrink-0 flex items-center justify-center px-4">
        <div className="container mx-auto px-4 relative z-10 w-full">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-7xl md:text-9xl font-bold mb-6 relative overflow-hidden">
              <span className="text-white block">成就达成</span>
            </h2>
          </div>

          {/* Horizontal Stats Cards */}
          <div className="w-full p-10 rounded-lg">
            <div className="flex flex-col md:flex-row gap-32 max-w-screen mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group relative flex-1"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Card */}
                  <div className="relative bg-black/40 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl h-72 flex flex-col justify-between">
                    {/* Stat Value - Fixed height container */}
                    <div className="flex items-center justify-center h-16 mb-4">
                      <Odometer
                        value={stat.value}
                        format="d"
                        className="text-4xl md:text-5xl font-bold text-white"
                      />
                      {stat.suffix && (
                        <span className="text-4xl md:text-5xl font-bold text-white ml-1">
                          {stat.suffix}
                        </span>
                      )}
                    </div>

                    {/* Middle section with fixed spacing */}
                    <div className="flex-1 flex flex-col justify-center">
                      {/* Stat Label */}
                      <h3 className="text-lg font-semibold text-white mb-3 h-12 flex items-center justify-center">
                        {stat.label}
                      </h3>

                      {/* Stat Description */}
                      <p className="text-white/80 text-sm leading-relaxed h-10 flex items-center justify-center">
                        {stat.description}
                      </p>
                    </div>

                    {/* Bottom spacer to maintain consistent bottom spacing */}
                    <div className="h-6"></div>

                    {/* Hover effect indicator */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-[#d1d1d1] to-[#2a2a2b] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <BorderBeam
                      duration={6}
                      delay={3}
                      size={400}
                      borderWidth={1}
                      className="from-transparent via-white to-transparent"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={heroSectionRef}
      className="relative w-screen h-screen"
      style={{ zIndex: 20 }}
    >
      <AuroraBackground>
        <div className="absolute inset-0 w-full h-full bg-black -z-1" />
        <div
          className="w-full h-full overflow-hidden relative"
          style={{
            background: `
                radial-gradient(circle at center, #000000 0, #A68B5B00 100%), linear-gradient(2deg, #fbe9cd, transparent 40%)
                `,
          }}
        >
          {/* Globe Background Section - Fixed position, always visible */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="w-full h-full flex items-end justify-center pb-[0%]">
              {shouldLoadGlobe ? (
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center text-white">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mr-3"></div>
                      Loading Globe...
                    </div>
                  }
                >
                  <RotatingEarth width={1650} height={1650} />
                </Suspense>
              ) : (
                <div className="flex items-center justify-center text-transparent">
                  {/* Empty placeholder during initial load */}
                </div>
              )}
            </div>
          </div>

          {/* Sliding Content Container - Only content slides, background stays fixed */}
          <div
            ref={contentContainerRef}
            className="flex flex-col h-[100%] w-full relative z-10"
            style={{ willChange: "transform" }}
          >
            {/* Slide 1: Hero Content */}
            <div className="w-full h-screen flex-shrink-0 flex items-center">
              <div className="relative z-10 flex h-full w-full lg:flex-row flex-col">
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

            {/* Slide 2: Stats Content - Same background, just content slides */}
            <div className="w-full h-screen flex-shrink-0">
              {renderStatsContent()}
            </div>
          </div>
        </div>
      </AuroraBackground>
    </div>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
