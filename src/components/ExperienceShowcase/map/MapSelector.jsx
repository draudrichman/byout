"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPoint } from './MapPoint';
import { mapPoints } from './MapData';

export const MapSelector = ({
  flagItems,
  autoRotateInterval = 3000,
  pauseOnHover = true,
  className = "",
  onCountryChange,
  selectedIndex = 0
}) => {
  const currentIndex = selectedIndex;
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);
  const mapContainerRef = useRef(null);
  const mapImageRef = useRef(null);
  const mapPointsRef = useRef(null);

  const goToNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % flagItems.length;
    // Pass false to indicate this is auto-rotation, not a user click
    onCountryChange?.(flagItems[nextIndex].country, nextIndex, false);
  }, [currentIndex, onCountryChange, flagItems]);

  const goToIndex = useCallback((index, isUserClick = true) => {
    if (index >= 0 && index < flagItems.length) {
      // Pass isUserClick flag to indicate if this was triggered by user interaction
      onCountryChange?.(flagItems[index].country, index, isUserClick);
    }
  }, [onCountryChange, flagItems]);


  // Initialize GSAP ScrollTrigger
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Add delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (mapImageRef.current && mapPointsRef.current && mapContainerRef.current) {
        try {
          // Initial state - map and points are scaled down and faded
          gsap.set([mapImageRef.current, mapPointsRef.current], {
            scale: 0.8,
            opacity: 0.3,
            y: 30,
            transformOrigin: "center center"
          });

          // Create scroll-triggered animation for both map and points
          gsap.to([mapImageRef.current, mapPointsRef.current], {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: mapContainerRef.current,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 1,
              toggleActions: "play none none reverse"
            }
          });
        } catch (error) {
          console.warn('Error initializing GSAP ScrollTrigger:', error);
        }
      }
    }, 50);

    return () => {
      clearTimeout(timer);
      try {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      } catch (error) {
        console.warn('Error cleaning up ScrollTrigger:', error);
      }
      // Kill any remaining animations
      if (mapImageRef.current) gsap.killTweensOf(mapImageRef.current);
      if (mapPointsRef.current) gsap.killTweensOf(mapPointsRef.current);
    };
  }, []);

  // Auto-rotation logic
  useEffect(() => {
    if (!pauseOnHover || !isHovered) {
      intervalRef.current = setInterval(goToNext, autoRotateInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [goToNext, autoRotateInterval, isHovered, pauseOnHover]);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      setIsHovered(true);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      setIsHovered(false);
    }
  }, [pauseOnHover]);

  const handlePointClick = useCallback((country) => {
    if (!country || !flagItems) return;
    const flagIndex = flagItems.findIndex(flag => flag?.country === country);
    if (flagIndex !== -1) {
      goToIndex(flagIndex);
    }
  }, [flagItems, goToIndex]);

  const handlePointHover = useCallback((country) => {
    if (!country || !flagItems) return;
    if (pauseOnHover && isHovered) {
      const flagIndex = flagItems.findIndex(flag => flag?.country === country);
      if (flagIndex !== -1) {
        goToIndex(flagIndex);
      }
    }
  }, [flagItems, goToIndex, pauseOnHover, isHovered]);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      const prevIndex = (currentIndex - 1 + flagItems.length) % flagItems.length;
      goToIndex(prevIndex);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      const nextIndex = (currentIndex + 1) % flagItems.length;
      goToIndex(nextIndex);
    }
  }, [goToIndex, currentIndex, flagItems.length]);

  const selectedCountry = flagItems[currentIndex]?.country || "Canada";

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="tablist"
      aria-label="Interactive country selection map"
    >
      {/* Map Image */}
      <div ref={mapContainerRef} className="py-64 sm:py-24 md:py-18 lg:py-8 relative">
        <img 
          ref={mapImageRef}
          src="/Map/Map.png"
          alt="Interactive Geographic Map"
          className="w-full h-auto object-contain"
          style={{
            maxWidth: "100%",
            height: "auto",
            width: "100%",
            filter: "invert(1) brightness(0.8)",
            opacity: 0.6
          }}
        />
        
        {/* Dynamic Map Points */}
        <div 
          ref={mapPointsRef} 
          className="absolute inset-0"
          style={{ zIndex: 60 }}
        >
          {mapPoints && mapPoints.map((point) => point && point.country && (
            <MapPoint
              key={point.country}
              point={point}
              isActive={selectedCountry === point.country}
              onClick={() => handlePointClick(point.country)}
              onMouseEnter={() => handlePointHover(point.country)}
              radarIntensity={0.8}
              radarSpeed={1}
              radarFrequency={0.1}
              hasActivePoint={true}
              containerRef={mapContainerRef}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
