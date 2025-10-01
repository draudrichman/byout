"use client";

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { getCountryTextData } from './MapData';


const MapInfoPanel = ({
  selectedCountry
}) => {
  const textContentRef = useRef(null);
  const containerRef = useRef(null);
  
  // Get country-specific text data
  const textData = getCountryTextData(selectedCountry);

  useEffect(() => {
    if (!containerRef.current || !textContentRef.current) return;

    // Set initial states
    gsap.set(containerRef.current, { opacity: 0, scaleX: 0 });

    // Create timeline for entrance animation
    const tl = gsap.timeline({ delay: 0.6 });
    
    tl.to(containerRef.current, {
      opacity: 1,
      scaleX: 1,
      duration: 0.2,
      ease: "back.out(0.5)",
    });

  }, [selectedCountry]);

  return (
    <div 
      ref={containerRef}
      className="mt-8 mb-12 min-h-[340px] sm:min-h-[240px] flex items-center"
      data-map-info-panel="true"
    >
      <div className="w-full px-4 sm:px-8">
        <div ref={textContentRef} className="relative grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 text-center text-white">
          {/* Section 1 */}
          <div className="space-y-2">
            <div className="text-3xl sm:text-4xl font-bold text-white">
              {textData?.section1.value || "3万+ 门店"}
            </div>
            <div className="text-sm font-chinese text-white/80">
              {textData?.section1.chineseLabel || "线下零售总门店数"}
            </div>
            <div className="text-xs text-white/60">
              {textData?.section1.englishLabel || "Total Retail locations"}
            </div>
          </div>
          
          {/* Separator 1 */}
          <div className="hidden sm:block absolute left-1/3 top-1/2 transform -translate-y-1/2 w-px h-16 bg-white/20"></div>
          
          {/* Section 2 */}
          <div className="space-y-2">
            <div className="text-3xl sm:text-4xl font-bold text-white">
              {textData?.section2.value || "30+"}
            </div>
            <div className="text-sm font-chinese text-white/80">
              {textData?.section2.chineseLabel || "成功入驻品类"}
            </div>
            <div className="text-xs text-white/60">
              {textData?.section2.englishLabel || "Onboard products"}
            </div>
          </div>
          
          {/* Separator 2 */}
          <div className="hidden sm:block absolute left-2/3 top-1/2 transform -translate-y-1/2 w-px h-16 bg-white/20"></div>
          
          {/* Section 3 */}
          <div className="space-y-2">
            <div className="text-3xl sm:text-4xl font-bold text-white">
              {textData?.section3.value || "7%"}
            </div>
            <div className="text-sm font-chinese text-white/80">
              {textData?.section3.chineseLabel || "品牌年增长率"}
            </div>
            <div className="text-xs text-white/60">
              {textData?.section3.englishLabel || "Annual Growth Rate"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapInfoPanel;
