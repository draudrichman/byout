"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import StatisticsDisplay from './StatisticsDisplay';
import { getCountryValues, getCountryDescription } from './MapData';

const MapHUD = ({
  isVisible,
  selectedCountry,
  currentLogos,
  shouldUseStaticGrid,
  logoGroups,
  hubPosition,
  onClose,
  mapContainerRef
}) => {
  const hudRef = useRef(null);
  const contentRef = useRef(null);
  const isMountedRef = useRef(true);
  const currentTimelineRef = useRef(null);

  // State for dynamic dimensions
  const [hudDimensions, setHudDimensions] = useState({
    width: 400,
    height: 300
  });

  // Calculate dynamic HUD dimensions based on map container size
  const calculateHudDimensions = useCallback((mapWidth, mapHeight) => {
    // Use full map width for the unified HUD
    const constrainedWidth = mapWidth;
    
    // Use actual map height and extend bottom slightly
    const constrainedHeight = mapHeight + 40;
    
    return {
      width: constrainedWidth,
      height: constrainedHeight
    };
  }, []);

  const countryInfo = getCountryValues(selectedCountry);
  const values = countryInfo?.values || [2.5, 82];
  const countryDescription = getCountryDescription(selectedCountry);

  const getCountryChineseName = (country) => {
    const nameMap = {
      "Canada": "加拿大",
      "United States": "美国", 
      "Cambodia": "柬埔寨",
      "China": "中国",
      "Australia": "澳大利亚",
      "New Zealand": "新西兰"
    };
    return nameMap[country] || country;
  };

  const getCurrency = (country) => {
    if (country === "United States") return "美金";
    if (country === "China") return "人民币";
    return "美金";
  };

  const chineseName = getCountryChineseName(selectedCountry);
  const currency = getCurrency(selectedCountry);

  const statisticsData = [
    {
      value: `${values[0]}万亿${currency}`,
      chineseLabel: `2024年${chineseName}全年零售总额`,
      englishLabel: `2024 ${selectedCountry} Annual Retail Total`
    },
    {
      value: `${values[1]}%+`,
      chineseLabel: "线下实体零售占比", 
      englishLabel: "Offline Physical Retail Share"
    }
  ];

  // ResizeObserver to monitor map container size changes
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const updateDimensions = () => {
      if (mapContainerRef.current) {
        // Use the container's outer dimensions
        const containerWidth = mapContainerRef.current.offsetWidth;
        const containerHeight = mapContainerRef.current.offsetHeight;
        const newDimensions = calculateHudDimensions(containerWidth, containerHeight);
        setHudDimensions(newDimensions);
      }
    };

    updateDimensions();

    if (!window.ResizeObserver) {
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
    }

    const observer = new ResizeObserver(updateDimensions);
    observer.observe(mapContainerRef.current);
    window.addEventListener("resize", updateDimensions);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateDimensions);
    };
  }, [mapContainerRef, calculateHudDimensions]);

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      // Kill any active timelines
      if (currentTimelineRef.current) {
        currentTimelineRef.current.kill();
        currentTimelineRef.current = null;
      }
      // Kill all GSAP animations on these elements
      if (hudRef.current) {
        gsap.killTweensOf(hudRef.current);
      }
      if (contentRef.current) {
        gsap.killTweensOf(contentRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!hudRef.current || !contentRef.current || !isMountedRef.current) return;

    // Kill previous timeline before starting new one
    if (currentTimelineRef.current) {
      currentTimelineRef.current.kill();
      currentTimelineRef.current = null;
    }

    if (isVisible) {
      // Only set initial states if elements exist
      if (hudRef.current && contentRef.current) {
        gsap.set(hudRef.current, { y: '-100%', opacity: 0, scale: 0.9 });
        gsap.set(contentRef.current, { opacity: 0, y: 10 });
        hudRef.current.style.display = 'block';
      }

      const tl = gsap.timeline({
        onComplete: () => {
          currentTimelineRef.current = null;
        }
      });
      
      currentTimelineRef.current = tl;
      
      tl.to(hudRef.current, {
        y: '0%',
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.5)"
      })
      .to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      }, "-=0.2");
    } else {
      const tl = gsap.timeline({
        onComplete: () => {
          if (isMountedRef.current && hudRef.current) {
            hudRef.current.style.display = 'none';
          }
          currentTimelineRef.current = null;
        }
      });
      
      currentTimelineRef.current = tl;
      
      tl.to(contentRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: "power2.in"
      })
      .to(hudRef.current, {
        y: '-100%',
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "back.in(1.2)"
      }, "-=0.1");
    }
  }, [isVisible, selectedCountry, hubPosition]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={hudRef}
      className="absolute top-0 left-0 right-0 rounded-lg z-40 overflow-hidden"
      style={{ 
        display: 'none',
        width: `${hudDimensions.width}px`,
        height: `${hudDimensions.height}px`,
        margin: '0 auto'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Background Overlay - Solid on mobile, gradient on desktop */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-black/50 md:bg-transparent"></div>
      <div 
        className="absolute inset-0 pointer-events-none z-0 hidden md:block"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
        }}
      />
      
      {/* Close Button for entire panel */}
      <div className="absolute top-3 right-3 z-20">
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200 text-white"
          aria-label="Close HUD"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div ref={contentRef} className="h-full flex flex-col md:flex-row relative z-10">
        {(() => {
          // Country Info Component
          const CountryInfoSection = () => {
            const alignmentClass = hubPosition === 'left' ? 'text-left md:text-right' : 'text-left';
            // Countries in lower part of map (Australia, New Zealand) should align to top
            const isLowerCountry = selectedCountry === 'Australia' || selectedCountry === 'New Zealand';
            const verticalAlignment = isLowerCountry ? 'justify-start' : 'justify-end';
            
            return (
              <div className={`w-full md:w-1/2 pt-16 p-4 flex flex-col ${verticalAlignment}`}>
                <div className="space-y-4">
                  {/* Country Name Section */}
                  <div 
                    className={`space-y-2 ${alignmentClass}`}
                  >
                    <div className="text-2xl font-bold text-white">
                      {countryDescription?.chineseName}
                    </div>
                  </div>

                  {/* Description Section */}
                  {countryDescription && (
                    <div className={`space-y-3 ${alignmentClass} ${hubPosition === 'left' ? 'items-end' : 'items-start'} flex flex-col`}>
                      <div className="text-sm text-white/90 leading-relaxed font-chinese whitespace-pre-line max-w-sm">
                        {countryDescription.chineseDescription}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          };

          // Market Data Component
          const MarketDataSection = () => (
            <div className="w-full md:w-1/2 flex flex-col relative">
              {/* Market Data Gradient Overlay */}
              <div 
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                  background: hubPosition === 'left' 
                    ? 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
                    : 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
                }}
              />
              

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-3 space-y-4 scrollbar-hide relative z-10" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                {/* Metrics Section */}
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-white/80 uppercase tracking-wider text-left">
                    Market Data
                  </h4>
                  <StatisticsDisplay data={statisticsData} />
                </div>

                {/* Logos Section */}
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-white/80 uppercase tracking-wider text-left">
                    Partners
                  </h4>
                  
                  <div className="bg-white/10 rounded-lg p-2">
                    {(() => {
                      let allLogos = [];
                      
                      if (shouldUseStaticGrid) {
                        allLogos = currentLogos;
                      } else if (logoGroups.useOneGroup) {
                        allLogos = logoGroups.group1;
                      } else {
                        allLogos = [
                          ...logoGroups.group1,
                          ...logoGroups.group2,
                          ...(logoGroups.useTwoGroups ? [] : logoGroups.group3)
                        ];
                      }
                      
                      return (
                        <div className="grid grid-cols-4 gap-2 justify-items-center items-center">
                          {allLogos.map((logo, index) => (
                            <div
                              key={`${selectedCountry}-${index}`}
                              className="bg-white/40 border border-white/30 rounded-md p-1 hover:scale-105 hover:border-white/50 transition-all duration-200 w-full h-16 flex items-center justify-center"
                            >
                              <img
                                src={logo.src}
                                alt={logo.title}
                                className="h-10 w-auto object-contain max-w-full grayscale contrast-150 brightness-110 hover:grayscale-0 hover:contrast-100 hover:brightness-100 transition-all duration-300"
                                onError={(e) => {
                                  console.error(`Failed to load logo: ${logo.src}`);
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
          );

          // On mobile: always country info on top
          // On desktop: conditional layout based on hubPosition
          return (
            <>
              {/* Mobile: Country info always first, Desktop: conditional order */}
              <div className="block md:hidden w-full">
                <CountryInfoSection />
              </div>
              <div className="block md:hidden w-full">
                <MarketDataSection />
              </div>
              
              {/* Desktop: Conditional layout based on hubPosition */}
              <div className="hidden md:flex w-full">
                {hubPosition === 'left' ? (
                  // Left side countries: Market data on left, country info on right
                  <>
                    <MarketDataSection />
                    <CountryInfoSection />
                  </>
                ) : (
                  // Right side countries: Country info on left, market data on right
                  <>
                    <CountryInfoSection />
                    <MarketDataSection />
                  </>
                )}
              </div>
            </>
          );
        })()}
      </div>
    </div>
  );
};

export default MapHUD;
