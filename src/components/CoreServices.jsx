import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import SplitType from "split-type";
// import ShaderBackground from "./ShaderBackground";
// import "./css/CoverPageTransition.css";
import CircularGallery from "./CircularGallery";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger, SplitText);

// Animation utilities
const useTextAnimation = (ref, options = {}) => {
  useEffect(() => {
    if (!ref.current) return;

    const split = new SplitText(ref.current, { type: "words, chars" });

    gsap.set(split.chars, {
      opacity: 0,
      y: 50,
      rotationX: 90,
      transformOrigin: "0% 50% -50px",
    });

    split.chars.forEach((char, index) => {
      const progress = index / (split.chars.length - 1);
      const color = getGradientColor(progress);
      char.style.color = color;
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        ...options,
      },
    });

    tl.to(split.chars, {
      duration: 1,
      opacity: 1,
      y: 0,
      rotationX: 0,
      stagger: 0.02,
      ease: "back.out(1.7)",
    });

    return () => {
      tl.kill();
      split.revert();
    };
  }, []);
};

const getGradientColor = (progress) => {
  if (progress <= 0.5) {
    const factor = progress * 2;
    const gray = Math.round(68 + (255 - 68) * factor);
    return `rgb(${gray}, ${gray}, ${gray})`;
  } else {
    const factor = (progress - 0.5) * 2;
    const gray = Math.round(255 - (255 - 68) * factor);
    return `rgb(${gray}, ${gray}, ${gray})`;
  }
};

const useScrollReveal = (elements) => {
  useEffect(() => {
    if (!elements.length) return;

    const animations = elements.map((element, index) => {
      if (!element) return null;

      gsap.set(element, {
        opacity: 0,
        y: 50,
        scale: 0.95,
      });

      return gsap.to(element, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
        },
        delay: index * 0.1,
      });
    });

    return () => {
      animations.forEach((animation) => animation?.kill());
      ScrollTrigger.getAll().forEach((trigger) => {
        if (elements.includes(trigger.trigger)) {
          trigger.kill();
        }
      });
    };
  }, [elements]);
};

// Service card data
const serviceData = [
  {
    name: "Brand Development",
    description: "Comprehensive brand strategy and identity development",
    image:
      "https://burst.shopifycdn.com/photos/macbook-air-on-desk.jpg?width=1000&format=pjpg&exif=0&iptc=0",
    bigImage:
      "https://burst.shopifycdn.com/photos/macbook-air-on-desk.jpg?width=1000&format=pjpg&exif=0&iptc=0",
    location:
      "And if it rains, a closed car at four. And we shall play a game of chess, pressing lidless eyes and waiting for a knock upon the door.",
    material:
      "At the violet hour, when the eyes and back, turn upward from the desk, when the human engine waits.",
  },
  {
    name: "Technology",
    description: "Cutting-edge technology solutions and digital transformation",
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1640&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bigImage:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1640&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location:
      "And if it rains, a closed car at four. And we shall play a game of chess, pressing lidless eyes and waiting for a knock upon the door.",
    material:
      "At the violet hour, when the eyes and back, turn upward from the desk, when the human engine waits.",
  },
  {
    name: "Retail Operations",
    description: "End-to-end retail solutions and channel optimization",
    image:
      "https://images.unsplash.com/photo-1644088379091-d574269d422f?q=80&w=2186&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bigImage:
      "https://images.unsplash.com/photo-1644088379091-d574269d422f?q=80&w=2186&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location:
      "And if it rains, a closed car at four. And we shall play a game of chess, pressing lidless eyes and waiting for a knock upon the door.",
    material:
      "At the violet hour, when the eyes and back, turn upward from the desk, when the human engine waits.",
  },
];

// Main CoreServices component
const CoreServices = () => {
  const [currentPreview, setCurrentPreview] = useState(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  // Refs for animations
  const titleRef = useRef(null);
  const descriptiveTextRef = useRef([]);
  const chineseCharsRef = useRef([]);
  const overlayRowsRef = useRef([]);
  const previewsRef = useRef([]);
  const galleryCardsRef = useRef([]);
  const galleryContainerRef = useRef(null);

  // Custom hooks for animations
  useTextAnimation(titleRef);
  useScrollReveal(descriptiveTextRef.current);
  useScrollReveal(chineseCharsRef.current);

  // Gallery cards scroll animation
  useEffect(() => {
    const cards = galleryCardsRef.current.filter(Boolean);
    const container = galleryContainerRef.current;
    if (!cards.length || !container) return;

    // Set initial state - cards off-screen to the right
    gsap.set(cards, {
      x: 300,
      opacity: 0,
    });

    // Create scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 75%",
        end: "bottom 25%",
        toggleActions: "play none none reverse",
        // markers: true, // Enable to debug
      },
    });

    // Animate cards in with stagger
    tl.to(cards, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.2, // 0.2s delay between each card
    });

    return () => {
      tl.kill();
    };
  }, []);

  // Navigation handler
  const handleItemClick = useCallback((index) => {
    // Route to specific pages for Technology and Retail
    if (index === 1) {
      window.location.href = "/tech";
      return;
    }
    if (index === 2) {
      window.location.href = "/retail";
      return;
    }
    // Open preview for Brand Development
    openItem(index);
  }, []);

  // Preview animations
  const openItem = useCallback((index) => {
    const preview = previewsRef.current[index];
    if (!preview) return;

    setIsPreviewVisible(true);
    setCurrentPreview(index);

    const timeline = gsap.timeline({
      defaults: { duration: 1, ease: "power3.inOut" },
    });

    timeline
      .set(
        [
          preview.querySelectorAll(".oh__inner"),
          preview.querySelector(".preview__back"),
        ],
        {
          opacity: 0,
        }
      )
      .to(overlayRowsRef.current, { scaleY: 1 })
      .add(() => {
        document.body.classList.add("preview-visible");
        const previewsContainer = document.querySelector(".previews");
        if (previewsContainer) {
          previewsContainer.classList.add("active");
        }
      })
      .to(
        [
          preview.querySelector(".preview__img"),
          preview.querySelector(".preview__img-inner"),
        ],
        {
          startAt: { y: (pos) => (pos ? "101%" : "-101%") },
          y: "0%",
        }
      )
      .to(preview.querySelectorAll(".oh__inner"), {
        ease: "expo",
        startAt: { yPercent: 101 },
        yPercent: 0,
        opacity: 1,
      })
      .to(preview.querySelector(".preview__back"), { opacity: 1 }, "-=0.3");
  }, []);

  const closeItem = useCallback((index) => {
    const preview = previewsRef.current[index];
    if (!preview) return;

    const timeline = gsap.timeline({
      defaults: { duration: 1, ease: "power3.inOut" },
    });

    timeline
      .to(preview.querySelectorAll(".oh__inner"), {
        yPercent: -101,
        opacity: 0,
      })
      .to(preview.querySelector(".preview__back"), { opacity: 0 }, 0)
      .to(preview.querySelector(".preview__img"), { y: "101%" }, 0)
      .to(preview.querySelector(".preview__img-inner"), { y: "-101%" }, 0)
      .to(overlayRowsRef.current, {
        scaleY: 0,
        onComplete: () => {
          setIsPreviewVisible(false);
          setCurrentPreview(null);
          document.body.classList.remove("preview-visible");
          const previewsContainer = document.querySelector(".previews");
          if (previewsContainer) {
            previewsContainer.classList.remove("active");
          }
        },
      });
  }, []);

  return (
    <main className={`relative ${isPreviewVisible ? "preview-visible" : ""}`}>
      {/* Column Layout: Left 1/3 Content + Right 2/3 Gallery */}
      <section className="w-full h-screen flex flex-col md:flex-row">
        {/* Left Column - Core Services Content (1/3) */}
        <div className="w-full md:w-1/3 h-2/5 md:h-full flex flex-col justify-center items-center px-8">
          <div className="max-w-md text-center">
            {/* Core Services Title */}
            <h1
              ref={titleRef}
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold mb-6 md:mb-8 text-white leading-tight"
            >
              CORE SERVICES
            </h1>

            {/* Four Lines of Chinese Text */}
            <div className="text-white space-y-3 md:space-y-4 text-sm md:text-base lg:text-lg font-medium font-songti leading-relaxed mb-6 md:mb-8">
              <p
                ref={(el) => (descriptiveTextRef.current[0] = el)}
                className="tracking-wider"
              >
                以"光"为引的「穿越化」买点论 ( Prismaeon™ )
              </p>
              <p
                className="tracking-wider"
                ref={(el) => (descriptiveTextRef.current[1] = el)}
              >
                开创前策 x 科技 x 渠道落地的三位一体服务
              </p>
              <p
                className="tracking-wider"
                ref={(el) => (descriptiveTextRef.current[2] = el)}
              >
                突破文化·国界·时间周期的市场及维度局限
              </p>
              <p
                className="tracking-wider"
                ref={(el) => (descriptiveTextRef.current[3] = el)}
              >
                打造具备穿越化性质的超级品牌&产品
              </p>
            </div>

            {/* Symbol/Icon */}
            <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto">
              {/* Center Icon */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="relative scale-[600%] md:scale-[800%]">
                  <div className="relative">
                    <div className="absolute inset-0 opacity-80 animate-pulse">
                      <div
                        className="w-full h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
                        style={{
                          maskImage: "url(/img/logos/icon.svg)",
                          WebkitMaskImage: "url(/img/logos/icon.svg)",
                          maskSize: "contain",
                          WebkitMaskSize: "contain",
                          maskRepeat: "no-repeat",
                          WebkitMaskRepeat: "no-repeat",
                          maskPosition: "center",
                          WebkitMaskPosition: "center",
                          animation:
                            "gradientShift 3s ease-in-out infinite alternate",
                        }}
                      />
                    </div>
                    <img
                      src="/img/logos/icon.svg"
                      alt="Core Services Icon"
                      className="relative z-10 opacity-90 filter brightness-110 contrast-105 drop-shadow-[0_0_15px_rgba(147,51,234,0.7)] w-8 h-8"
                    />
                  </div>
                </div>
              </div>

              {/* Character grid */}
              <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
                <div className="flex items-center justify-center pr-1 pb-1">
                  <span
                    ref={(el) => (chineseCharsRef.current[0] = el)}
                    className="text-2xl md:text-3xl font-bold text-white"
                  >
                    核
                  </span>
                </div>
                <div className="flex items-center justify-center pl-1 pb-1">
                  <span
                    ref={(el) => (chineseCharsRef.current[1] = el)}
                    className="text-2xl md:text-3xl font-bold text-white"
                  >
                    心
                  </span>
                </div>
                <div className="flex items-center justify-center pr-1 pt-1">
                  <span
                    ref={(el) => (chineseCharsRef.current[2] = el)}
                    className="text-2xl md:text-3xl font-bold text-white"
                  >
                    服
                  </span>
                </div>
                <div className="flex items-center justify-center pl-1 pt-1">
                  <span
                    ref={(el) => (chineseCharsRef.current[3] = el)}
                    className="text-2xl md:text-3xl font-bold text-white"
                  >
                    务
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Art Gallery Hover Cards (2/3) */}
        <div className="ml-10 flex-1 flex" ref={galleryContainerRef}>
          <div className="w-full h-full flex flex-col md:flex-row">
            <div
              className="relative w-full md:w-1/3 h-1/3 md:h-full overflow-hidden transition-all duration-700 ease-out hover:h-3/5 md:hover:h-full md:hover:w-2/3 group"
              style={{ transform: "skewX(-25deg)" }}
              ref={(el) => (galleryCardsRef.current[0] = el)}
            >
              <div
                className="gallery-item-wrapper relative w-full h-full cursor-pointer"
                style={{ transform: "skewX(25deg)" }}
                onClick={() => handleItemClick(0)}
              >
                <img
                  src={serviceData[0].image || "/placeholder.svg"}
                  alt={serviceData[0].name}
                  className="absolute w-full h-full object-cover transform scale-250 transition-transform duration-1000 ease-out group-hover:scale-175 grayscale group-hover:grayscale-0"
                />
                <div className="absolute w-full h-full top-0 left-0 bg-black/60 transition-all duration-1000 ease-out z-10 group-hover:-top-[250%] transform scale-250"></div>
                <div className="absolute w-full h-full flex flex-col justify-center items-center px-4 md:px-8 py-8 md:py-16 font-inherit uppercase leading-tight text-white z-20 transition-colors duration-300 ease-out">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-400 mb-2 md:mb-4">
                      01
                    </div>
                    <div className="text-base md:text-lg lg:text-xl xl:text-2xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-white group-hover:to-gray-100">
                      {serviceData[0].name}
                      <span className="block text-xs md:text-sm lg:text-base normal-case mt-2 md:mt-4 text-gray-300 font-normal leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity group-hover:duration-500 duration-0 group-hover:delay-0 delay-0 ease-out">
                        {serviceData[0].description}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/10 to-transparent opacity-0 transition-opacity duration-500 ease-out z-10 group-hover:opacity-100 transform scale-250"></div>
              </div>
            </div>

            {/* <div className="w-full md:w-px h-px md:h-full bg-white/10"></div> */}

            <div
              className="relative w-full md:w-1/3 h-1/3 md:h-full overflow-hidden transition-all duration-700 ease-out hover:h-3/5 md:hover:h-full md:hover:w-2/3 group"
              style={{ transform: "skewX(-25deg)" }}
              ref={(el) => (galleryCardsRef.current[1] = el)}
            >
              <div
                className="gallery-item-wrapper relative w-full h-full cursor-pointer"
                style={{ transform: "skewX(25deg)" }}
                onClick={() => handleItemClick(1)}
              >
                <img
                  src={serviceData[1].image || "/placeholder.svg"}
                  alt={serviceData[1].name}
                  className="absolute w-full h-full object-cover transform scale-250 transition-transform duration-1000 ease-out group-hover:scale-175 grayscale group-hover:grayscale-0"
                />
                <div className="absolute w-full h-full top-0 left-0 bg-black/60 transition-all duration-1000 ease-out z-10 group-hover:-top-[250%] transform scale-250"></div>
                <div className="absolute w-full h-full flex flex-col justify-center items-center px-4 md:px-8 py-8 md:py-16 font-inherit uppercase leading-tight text-white z-20 transition-colors duration-300 ease-out">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-400 mb-2 md:mb-4">
                      02
                    </div>
                    <div className="text-base md:text-lg lg:text-xl xl:text-2xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-white group-hover:to-gray-100">
                      {serviceData[1].name}
                      <span className="block text-xs md:text-sm lg:text-base normal-case mt-2 md:mt-4 text-gray-300 font-normal leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity group-hover:duration-500 duration-0 group-hover:delay-0 delay-0 ease-out">
                        {serviceData[1].description}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/10 to-transparent opacity-0 transition-opacity duration-500 ease-out z-10 group-hover:opacity-100 transform scale-250"></div>
              </div>
            </div>

            {/* <div className="w-full md:w-px h-px md:h-full bg-white/10"></div> */}

            <div
              className="relative w-full md:w-1/3 h-1/3 md:h-full overflow-hidden transition-all duration-700 ease-out hover:h-3/5 md:hover:h-full md:hover:w-2/3 group"
              style={{ transform: "skewX(-25deg)" }}
              ref={(el) => (galleryCardsRef.current[2] = el)}
            >
              <div
                className="gallery-item-wrapper relative w-full h-full cursor-pointer"
                style={{ transform: "skewX(25deg)" }}
                onClick={() => handleItemClick(2)}
              >
                <img
                  src={serviceData[2].image || "/placeholder.svg"}
                  alt={serviceData[2].name}
                  className="absolute w-full h-full object-cover transform scale-250 transition-transform duration-1000 ease-out group-hover:scale-175 grayscale group-hover:grayscale-0"
                />
                <div className="absolute w-full h-full top-0 left-0 bg-black/60 transition-all duration-1000 ease-out z-10 group-hover:-top-[250%] transform scale-250"></div>
                <div className="absolute w-full h-full flex flex-col justify-center items-center px-4 md:px-8 py-8 md:py-16 font-inherit uppercase leading-tight text-white z-20 transition-colors duration-300 ease-out">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-400 mb-2 md:mb-4">
                      03
                    </div>
                    <div className="text-base md:text-lg lg:text-xl xl:text-2xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-white group-hover:to-gray-100">
                      {serviceData[2].name}
                      <span className="block text-xs md:text-sm lg:text-base normal-case mt-2 md:mt-4 text-gray-300 font-normal leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity group-hover:duration-500 duration-0 group-hover:delay-0 delay-0 ease-out">
                        {serviceData[2].description}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/10 to-transparent opacity-0 transition-opacity duration-500 ease-out z-10 group-hover:opacity-100 transform scale-250"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CoreServices;
