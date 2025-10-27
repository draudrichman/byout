import React, { useRef } from "react";

const CoreServicesNew = () => {
  const titleRef = useRef(null);
  const descriptiveTextRef = useRef([]);
  const chineseCharsRef = useRef([]);

  return (
    <div className="flex h-screen w-screen bg-black font-sans overflow-hidden">
      {/* Left Column - Core Services Content (1/3) */}
      <div className="w-1/3 h-full flex flex-col justify-center items-center px-8 bg-black">
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

      {/* Right Section - Three Slanted Columns (2/3) */}
      <div className="ml-80 flex-1 flex">
        <div
          className="flex-1 relative overflow-hidden -skew-x-[30deg] origin-top-left transition-all duration-400 ease-in-out hover:flex-[2.5] border-2 border-white"
          style={{
            backgroundImage:
              "ur[](https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1640&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#facc15", // Fallback color (yellow-300)
          }}
        >
          <div className="skew-x-[30deg] w-full h-full"></div>
        </div>
        <div
          className="flex-1 relative overflow-hidden -skew-x-[30deg] origin-top-left transition-all duration-400 ease-in-out hover:flex-[2.5] border-2 border-white"
          style={{
            backgroundImage:
              "ur[](https://images.unsplash.com/photo-1519046904884-53103b34b206)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundColor: "red", // Fallback color (gray-900)
          }}
        >
          <div className="skew-x-[30deg] w-full h-full"></div>
        </div>
        <div
          className="flex-1 relative overflow-hidden -skew-x-[30deg] origin-top-left transition-all duration-400 ease-in-out hover:flex-[2.5] border-2 border-white"
          style={{
            backgroundImage:
              "ur[](https://images.unsplash.com/photo-1471922694854-ff1b63b20054)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundColor: "blue", // Fallback color (gray-700)
          }}
        >
          <div className="skew-x-[30deg] w-full h-full"></div>
        </div>
      </div>
    </div>
  );
};

export default CoreServicesNew;
