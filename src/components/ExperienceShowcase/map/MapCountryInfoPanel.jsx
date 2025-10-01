"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { getCountryDescription } from './MapData';

const MapCountryInfoPanel = ({
  isVisible,
  selectedCountry,
  hubPosition,
  onClose: _onClose, // eslint-disable-line @typescript-eslint/no-unused-vars
  mapContainerRef
}) => {
  const panelRef = useRef(null);
  const contentRef = useRef(null);

  // State for dynamic dimensions
  const [panelDimensions, setPanelDimensions] = useState({
    width: 400,
    height: 300
  });

  // Calculate dynamic panel dimensions based on map container size
  const calculatePanelDimensions = useCallback((mapWidth, mapHeight, viewportWidth) => {
    const getScalingFactor = (vw) => {
      if (vw < 640) return 0.35;
      if (vw < 1024) return 0.40;
      if (vw < 1280) return 0.45;
      return 0.50;
    };
    
    const scalingFactor = getScalingFactor(viewportWidth);
    const calculatedWidth = Math.round(mapWidth * scalingFactor);
    
    const minWidth = 350;
    const maxWidth = 650;
    const constrainedWidth = Math.max(minWidth, Math.min(maxWidth, calculatedWidth));
    
    // Use actual map height and extend bottom slightly
    const constrainedHeight = mapHeight + 40;
    
    return {
      width: constrainedWidth,
      height: constrainedHeight
    };
  }, []);

  const countryDescription = getCountryDescription(selectedCountry);

  // Determine the opposite position of hubPosition
  const panelPosition = hubPosition === 'left' ? 'right' : 'left';

  // ResizeObserver to monitor map container size changes
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const updateDimensions = () => {
      if (mapContainerRef.current) {
        const containerWidth = mapContainerRef.current.offsetWidth;
        const containerHeight = mapContainerRef.current.offsetHeight;
        const viewportWidth = window.innerWidth;
        const newDimensions = calculatePanelDimensions(containerWidth, containerHeight, viewportWidth);
        setPanelDimensions(newDimensions);
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
  }, [mapContainerRef, calculatePanelDimensions]);

  useEffect(() => {
    if (!panelRef.current || !contentRef.current) return;

    if (isVisible) {
      const initialX = panelPosition === 'left' ? '-100%' : '100%';
      gsap.set(panelRef.current, { x: initialX, opacity: 0, scale: 0.9 });
      gsap.set(contentRef.current, { opacity: 0, y: 10 });

      panelRef.current.style.display = 'block';

      const tl = gsap.timeline();
      
      tl.to(panelRef.current, {
        x: '0%',
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
          if (panelRef.current) {
            panelRef.current.style.display = 'none';
          }
        }
      });

      const exitX = panelPosition === 'left' ? '-100%' : '100%';
      
      tl.to(contentRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: "power2.in"
      })
      .to(panelRef.current, {
        x: exitX,
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "back.in(1.2)"
      }, "-=0.1");
    }
  }, [isVisible, selectedCountry, panelPosition]);

  if (!isVisible || !countryDescription) {
    return null;
  }

  return (
    <div
      ref={panelRef}
      className={`absolute top-0 ${panelPosition === 'left' ? 'left-4' : 'right-4'} rounded-lg z-50 overflow-hidden`}
      style={{ 
        display: 'none',
        width: `${panelDimensions.width}px`,
        height: `${panelDimensions.height}px`
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div ref={contentRef} className="h-full flex flex-col relative">
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
          {/* Country Name Section */}
          <div className="space-y-2">
            <div className="text-3xl font-bold text-white">
              {selectedCountry}
            </div>
            <div className="text-xl text-white/80 font-chinese">
              {countryDescription.chineseName}
            </div>
          </div>

          {/* Title Section */}
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-white">
              {countryDescription.title}
            </h4>
          </div>

          {/* Description Section */}
          <div className="space-y-3">
            <div className="text-sm text-white/90 leading-relaxed font-chinese whitespace-pre-line">
              {countryDescription.chineseDescription}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapCountryInfoPanel;
