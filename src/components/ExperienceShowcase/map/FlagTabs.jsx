"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export const FlagTabs = ({
  autoRotateInterval = 3000,
  pauseOnHover = true,
  className = "",
  onCountryChange,
  flagItems,
  selectedIndex = 0
}) => {
  // Use controlled selectedIndex instead of internal state
  const currentIndex = selectedIndex;
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);
  const tabsRef = useRef(null);
  const indicatorRef = useRef(null);
  const tabRefs = useRef([]);

  const goToNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % flagItems.length;
    onCountryChange?.(flagItems[nextIndex].country, nextIndex);
  }, [currentIndex, onCountryChange, flagItems]);

  const goToIndex = useCallback((index) => {
    if (index >= 0 && index < flagItems.length) {
      onCountryChange?.(flagItems[index].country, index);
    }
  }, [onCountryChange, flagItems]);

  // Update sliding indicator position
  const updateIndicator = useCallback(() => {
    const currentTab = tabRefs.current[currentIndex];
    const indicator = indicatorRef.current;
    
    if (currentTab && indicator) {
      const tabRect = currentTab.getBoundingClientRect();
      const containerRect = tabsRef.current?.getBoundingClientRect();
      
      if (containerRect) {
        const relativeLeft = tabRect.left - containerRect.left;
        const width = tabRect.width;
        
        gsap.to(indicator, {
          x: relativeLeft,
          width: width,
          duration: 0.2,
          ease: "power2.out"
        });
      }
    }
  }, [currentIndex]);

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

  // Enhanced tab animations
  useEffect(() => {
    const tabs = tabsRef.current?.querySelectorAll('.flag-tab');
    if (tabs && tabs.length > 0) {
      tabs.forEach((tab, index) => {
        if (index === currentIndex) {
          // Active tab animation
          gsap.to(tab, {
            scale: 1.1,
            opacity: 1,
            y: -2,
            duration: 0.2,
            ease: "back.out(1.2)"
          });
        } else {
          // Inactive tab animation
          gsap.to(tab, {
            scale: 1,
            opacity: 0.7,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
    }
    
    // Update indicator position after a slight delay to ensure DOM updates
    const timer = setTimeout(updateIndicator, 50);
    return () => clearTimeout(timer);
  }, [currentIndex, updateIndicator]);

  // Initialize indicator position on mount
  useEffect(() => {
    const timer = setTimeout(updateIndicator, 100);
    return () => clearTimeout(timer);
  }, [updateIndicator]);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      setIsHovered(true);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [pauseOnHover]);

  const handleTabHover = useCallback((index) => {
    goToIndex(index);
  }, [goToIndex]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      setIsHovered(false);
    }
  }, [pauseOnHover]);

  const handleKeyDown = useCallback((event, index) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      goToIndex(index);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      const prevIndex = (currentIndex - 1 + flagItems.length) % flagItems.length;
      goToIndex(prevIndex);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      const nextIndex = (currentIndex + 1) % flagItems.length;
      goToIndex(nextIndex);
    }
  }, [goToIndex, currentIndex, flagItems.length]);

  return (
    <div
      ref={tabsRef}
      className={`relative flex items-center justify-center space-x-4 p-4 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="tablist"
      aria-label="Country flags navigation"
    >
      {/* Sci-fi panel indicator */}
      <div
        ref={indicatorRef}
        className="absolute top-0 left-0 -z-10"
        style={{
          transform: 'translateX(0px)',
          width: '0px',
          height: '100%'
        }}
      >
      </div>
      
      {flagItems.map((item, index) => (
        <div
          key={item.country}
          ref={(el) => { tabRefs.current[index] = el; }}
          className={`cursor-target flag-tab flex flex-col items-center cursor-pointer transition-all duration-300 p-3 rounded-lg focus:outline-none relative z-10`}
          onMouseEnter={() => handleTabHover(index)}
          onClick={() => goToIndex(index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          tabIndex={0}
          role="tab"
          aria-selected={index === currentIndex}
          aria-label={`${item.country} flag`}
        >
          <div className="text-4xl mb-2 select-none transition-transform duration-300">
            {item.flag}
          </div>
          <div className={`text-sm font-medium text-center min-w-max transition-all duration-300 ${
            index === currentIndex ? 'text-white' : 'text-gray-400'
          }`}>
            {item.country}
          </div>
        </div>
      ))}
      
    </div>
  );
};

export default FlagTabs;
