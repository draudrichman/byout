import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import SplitType from "split-type";
// import ShaderBackground from "./ShaderBackground";
// import "./css/CoverPageTransition.css";
import Button from "./Button";

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
    image: "",
    bigImage: "/core/image1b.png",
    location:
      "And if it rains, a closed car at four. And we shall play a game of chess, pressing lidless eyes and waiting for a knock upon the door.",
    material:
      "At the violet hour, when the eyes and back, turn upward from the desk, when the human engine waits.",
  },
  {
    name: "Technology",
    description: "Cutting-edge technology solutions and digital transformation",
    image: "/core/2b.png",
    bigImage: "/core/image2b.png",
    location:
      "And if it rains, a closed car at four. And we shall play a game of chess, pressing lidless eyes and waiting for a knock upon the door.",
    material:
      "At the violet hour, when the eyes and back, turn upward from the desk, when the human engine waits.",
  },
  {
    name: "Retail Operations",
    description: "End-to-end retail solutions and channel optimization",
    image: "/core/3.webp",
    bigImage: "/core/image3b.png",
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
      <section className="w-full h-screen lg:h-screen flex flex-col lg:flex-row">
        {/* Left Column - Core Services Content (1/3) */}
        <div className="w-full lg:w-1/3 h-2/5 lg:h-full flex flex-col justify-center items-center lg:items-end px-8">
          <div className="max-w-md text-left">
            {/* Chinese Characters */}
            <div
              className="text-white font-jhenghei font-medium mb-4 tracking-[0.30em]"
              style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}
            >
              核 心 服 务
            </div>

            {/* Core Services Title */}
            <h1
              ref={titleRef}
              className="font-light mb-6 lg:mb-8 text-white leading-tight"
              style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}
            >
              CORE SERVICES
            </h1>

            {/* SVG Logos */}
            <div className="flex justify-start items-center gap-6 mb-6">
              <img
                src="/Logos/coreservices/22.svg"
                alt="Logo 22"
                style={{
                  width: "clamp(2rem, 4vw, 4rem)",
                  height: "clamp(2rem, 4vw, 4rem)",
                }}
              />
              <img
                src="/Logos/coreservices/58.svg"
                alt="Logo 58"
                style={{
                  width: "clamp(2rem, 4vw, 4rem)",
                  height: "clamp(2rem, 4vw, 4rem)",
                }}
              />
            </div>

            {/* Divider Line */}
            <div className="w-full h-px bg-white/30 mb-6 lg:mb-8"></div>

            {/* Four Lines of Chinese Text */}
            <div
              className="text-white space-y-3 lg:space-y-4 font-medium font-jhenghei leading-relaxed mb-6 lg:mb-8 text-left"
              style={{ fontSize: "clamp(0.875rem, 2.5vw, 1.125rem)" }}
            >
              <p
                ref={(el) => (descriptiveTextRef.current[0] = el)}
                className="tracking-widest whitespace-nowrap"
              >
                以"光"为引的「穿越化」买点论 ( Prismaeon )
              </p>
              <p
                className="tracking-widest whitespace-nowrap"
                ref={(el) => (descriptiveTextRef.current[1] = el)}
              >
                开创前策x科技x渠道落地的三位一体服务突破
              </p>
              <p
                className="tracking-widest whitespace-nowrap"
                ref={(el) => (descriptiveTextRef.current[2] = el)}
              >
                文化·国界·时间周期的市场及维度局限
              </p>
              <p
                className="tracking-widest whitespace-nowrap"
                ref={(el) => (descriptiveTextRef.current[3] = el)}
              >
                打造具备 穿越化 性质的
              </p>
              <p
                className="tracking-widest whitespace-nowrap"
                ref={(el) => (descriptiveTextRef.current[4] = el)}
              >
                超级品牌 & 产品
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Art Gallery Hover Cards (2/3) */}
        <div className="ml-0 lg:ml-60 flex-1 flex" ref={galleryContainerRef}>
          <div className="w-full h-full flex flex-col lg:flex-row">
            <div
              className="relative w-full lg:w-[28%] h-1/3 lg:h-full overflow-hidden transition-all duration-700 ease-out hover:h-3/5 lg:hover:h-full lg:hover:w-2/3 group lg:[transform:skewX(-30deg)]"
              ref={(el) => (galleryCardsRef.current[0] = el)}
            >
              <div
                className="gallery-item-wrapper relative w-full h-full cursor-pointer lg:[transform:skewX(30deg)]"
                onClick={() => handleItemClick(0)}
              >
                <img
                  src={serviceData[0].bigImage || "/placeholder.svg"}
                  alt={serviceData[0].name}
                  className="absolute w-full h-full object-cover transform scale-100 lg:[transform:skewX(-30deg)] transition-transform duration-1000 ease-out grayscale group-hover:grayscale-0"
                />
                <div className="absolute  w-full h-full top-0 left-0 bg-black/60 transition-all duration-1000 ease-out z-10 group-hover:-top-[350%] transform scale-500"></div>
                {/* Inner left shadow */}
                <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-black/40 to-transparent z-15 pointer-events-none lg:[transform:skewX(-30deg)]"></div>
                {/* Content */}
                <div className="absolute w-full h-full flex flex-col justify-center items-center px-4 lg:px-8 py-8 lg:py-16 font-inherit uppercase leading-tight text-white z-20 transition-colors duration-300 ease-out">
                  <div className="relative text-left -ml-6">
                    <div className="lg:[transform:skewX(-30deg)] absolute inset-0 -left-10 -right-15 backdrop-blur-sm bg-black/20 border border-white/10 shadow-lg rounded-lg p-4 lg:p-6"></div>
                    <div className="relative p-4 lg:p-6 ml-5">
                      <div
                        className="font-bnkgothl font-medium text-gray-100 mb-2 lg:mb-0 lg:-ml-3"
                        style={{
                          fontSize: "clamp(1.5rem, 6vw, 4.5rem)",
                          transform: "scaleY(1.3)",
                        }}
                      >
                        01
                      </div>
                      <div
                        className="tracking-[0.2em] whitespace-nowrap font-jhenghei font-medium"
                        style={{ fontSize: "clamp(1rem, 3vw, 2.5rem)" }}
                      >
                        品牌策划
                      </div>
                      <div
                        className="font-bnkgothl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-white group-hover:to-gray-100 mb-4"
                        style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
                      >
                        Brnd Dev
                      </div>
                      <Button
                        text="查看详情  "
                        onClick={(e) => {
                          e.stopPropagation();
                          handleItemClick(0);
                        }}
                        className="text-xs"
                      />
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/10 to-transparent opacity-0 transition-opacity duration-500 ease-out z-10 group-hover:opacity-100 transform scale-250"></div>
                <div className="absolute bottom-0 -left-50 right-0 h-1/3 bg-gradient-to-t from-gray-600 via-gray-300 to-transparent opacity-0 translate-y-full transition-all duration-700 delay-300 ease-out z-10 group-hover:opacity-100 group-hover:translate-y-0 lg:[transform:skewX(-30deg)]"></div>
              </div>
            </div>

            <div
              className="relative w-full lg:w-[28%] h-1/3 lg:h-full overflow-hidden transition-all duration-700 ease-out hover:h-3/5 lg:hover:h-full lg:hover:w-2/3 group lg:[transform:skewX(-30deg)]"
              ref={(el) => (galleryCardsRef.current[1] = el)}
            >
              <div
                className="gallery-item-wrapper relative w-full h-full cursor-pointer lg:[transform:skewX(30deg)]"
                onClick={() => handleItemClick(1)}
              >
                <img
                  src={serviceData[1].bigImage || "/placeholder.svg"}
                  alt={serviceData[1].name}
                  className="absolute w-full h-full object-cover transform lg:[transform:skewX(-30deg)] scale-100 transition-transform duration-1000 ease-out grayscale group-hover:grayscale-0"
                />
                <div className="absolute w-full h-full top-0 left-0 bg-black/60 transition-all duration-1000 ease-out z-10 group-hover:-top-[350%] transform scale-500"></div>
                {/* Inner left shadow */}
                <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-black/40 to-transparent z-15 pointer-events-none lg:[transform:skewX(-30deg)]"></div>
                <div className="absolute w-full h-full flex flex-col justify-center items-center px-4 lg:px-8 py-8 lg:py-16 font-inherit uppercase leading-tight text-white z-20 transition-colors duration-300 ease-out">
                  <div className="relative text-left -ml-6">
                    <div className="lg:[transform:skewX(-30deg)] absolute inset-0 -left-10 -right-15 backdrop-blur-sm bg-black/20 border border-white/10 shadow-lg rounded-lg p-4 lg:p-6"></div>
                    <div className="relative p-4 lg:p-6 ml-5">
                      <div
                        className="font-bnkgothl font-medium text-gray-100 mb-2 lg:mb-0 lg:-ml-3"
                        style={{
                          fontSize: "clamp(1.5rem, 6vw, 4.5rem)",
                          transform: "scaleY(1.3)",
                        }}
                      >
                        02
                      </div>
                      <div
                        className="tracking-[0.2em] whitespace-nowrap font-jhenghei font-medium"
                        style={{ fontSize: "clamp(1rem, 3vw, 2.5rem)" }}
                      >
                        技术赋能
                      </div>
                      <div
                        className="font-bnkgothl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-white group-hover:to-gray-100 mb-4"
                        style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
                      >
                        Technology
                      </div>
                      <Button
                        text="查看详情"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleItemClick(1);
                        }}
                        className="text-xs"
                      />
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/10 to-transparent opacity-0 transition-opacity duration-500 ease-out z-10 group-hover:opacity-100 transform scale-250"></div>
                {/* Yellow accent at bottom third */}
                <div className="absolute bottom-0 -left-50 right-0 h-1/3 bg-gradient-to-t from-gray-600 via-gray-300 to-transparent opacity-0 translate-y-full transition-all duration-700 delay-300 ease-out z-10 group-hover:opacity-100 group-hover:translate-y-0 lg:[transform:skewX(-30deg)]"></div>
              </div>
            </div>

            <div
              className="relative w-full lg:w-[28%] h-1/3 lg:h-full overflow-hidden transition-all duration-700 ease-out hover:h-3/5 lg:hover:h-full lg:hover:w-2/3 group lg:[transform:skewX(-30deg)]"
              ref={(el) => (galleryCardsRef.current[2] = el)}
            >
              <div
                className="gallery-item-wrapper relative w-full h-full cursor-pointer lg:[transform:skewX(30deg)]"
                onClick={() => handleItemClick(2)}
              >
                <img
                  src={serviceData[2].bigImage || "/placeholder.svg"}
                  alt={serviceData[2].name}
                  className="absolute w-full h-full object-cover transform scale-100 lg:[transform:skewX(-30deg)] transition-transform duration-1000 ease-out grayscale group-hover:grayscale-0"
                />
                <div className="absolute w-full h-full top-0 left-0 bg-black/60 transition-all duration-1000 ease-out z-10 group-hover:-top-[350%] transform scale-500"></div>
                {/* Inner left shadow */}
                <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-black/80 to-transparent z-15 pointer-events-none lg:[transform:skewX(-30deg)]"></div>
                <div className="absolute w-full h-full flex flex-col justify-center items-center px-4 lg:px-8 py-8 lg:py-16 font-inherit uppercase leading-tight text-white z-20 transition-colors duration-300 ease-out">
                  <div className="relative text-left -ml-6">
                    <div className="lg:[transform:skewX(-30deg)] absolute inset-0 -left-10 -right-15 backdrop-blur-sm bg-black/20 border border-white/10 shadow-lg rounded-lg p-4 lg:p-6"></div>
                    <div className="relative p-4 lg:p-6 ml-5">
                      <div
                        className="font-bnkgothl font-medium text-gray-100 mb-2 lg:mb-0 lg:-ml-3"
                        style={{
                          fontSize: "clamp(1.5rem, 6vw, 4.5rem)",
                          transform: "scaleY(1.3)",
                        }}
                      >
                        03
                      </div>
                      <div
                        className="tracking-[0.2em] whitespace-nowrap font-jhenghei font-medium"
                        style={{ fontSize: "clamp(1rem, 3vw, 2.5rem)" }}
                      >
                        渠道入驻
                      </div>
                      <div
                        className="font-bnkgothl font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-white group-hover:to-gray-100 mb-4"
                        style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
                      >
                        Retail Ops
                      </div>
                      <Button
                        text="查看详情"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleItemClick(2);
                        }}
                        className="text-xs"
                      />
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/10 to-transparent opacity-0 transition-opacity duration-500 ease-out z-10 group-hover:opacity-100 transform scale-250"></div>
                <div className="absolute bottom-0 -left-50 right-0 h-1/3 bg-gradient-to-t from-gray-600 via-gray-300 to-transparent opacity-0 translate-y-full transition-all duration-700 delay-300 ease-out z-10 group-hover:opacity-100 group-hover:translate-y-0 lg:[transform:skewX(-30deg)]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CoreServices;
