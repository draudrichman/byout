"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';

export const MapPoint = ({
  point,
  isActive,
  onClick,
  onMouseEnter,
  radarIntensity = 0.8,
  radarSpeed = 1,
  radarFrequency = 0.1,
  hasActivePoint = false,
  containerRef
}) => {
  const pointRef = useRef(null);
  const radarRef1 = useRef(null);
  const radarRef2 = useRef(null);
  const radarRef3 = useRef(null);
  const [position, setPosition] = useState({ left: `${point.x}%`, top: `${point.y}%` });

  // Calculate adjusted position accounting for container padding
  const calculateAdjustedPosition = useCallback(() => {
    // If no container ref, use original position
    if (!containerRef?.current) {
      return { left: `${point.x}%`, top: `${point.y}%` };
    }
    
    const container = containerRef.current;
    const computedStyles = window.getComputedStyle(container);
    
    // Get actual padding values from computed styles
    const paddingTop = parseFloat(computedStyles.paddingTop);
    const paddingBottom = parseFloat(computedStyles.paddingBottom);
    
    // If no padding, use original position
    if (paddingTop === 0 && paddingBottom === 0) {
      return { left: `${point.x}%`, top: `${point.y}%` };
    }
    
    // Get container dimensions
    const containerHeight = container.offsetHeight;
    const effectiveMapHeight = containerHeight - paddingTop - paddingBottom;
    
    // Calculate adjusted Y position
    // Map the point.y (0-100% of map) to the effective area within the container
    const adjustedYPixels = paddingTop + (point.y / 100) * effectiveMapHeight;
    const adjustedYPercent = (adjustedYPixels / containerHeight) * 100;
    
    return {
      left: `${point.x}%`,
      top: `${adjustedYPercent}%`
    };
  }, [containerRef, point.x, point.y]);

  // Update position when container changes or on mount/resize
  useEffect(() => {
    const updatePosition = () => {
      setPosition(calculateAdjustedPosition());
    };

    // Initial calculation
    updatePosition();

    // Update on window resize
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, [containerRef, point.x, point.y, calculateAdjustedPosition]);

  useEffect(() => {
    const radarRefs = [radarRef1.current, radarRef2.current, radarRef3.current];
    if (!pointRef.current || radarRefs.some(ref => !ref)) return;

    if (isActive) {
      gsap.to(pointRef.current, {
        scale: 2,
        duration: 0.3,
        ease: "back.out(1.7)"
      });

      // Stop radar effects when active
      radarRefs.forEach(ref => {
        if (ref) {
          gsap.killTweensOf(ref);
          gsap.set(ref, { opacity: 0 });
        }
      });
    } else {
      gsap.to(pointRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });

      // Start multiple radar effects when not active with staggered timing
      radarRefs.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(ref, 
            { scale: 0.3, opacity: radarIntensity },
            { 
              scale: 4, 
              opacity: 0, 
              duration: radarSpeed,
              ease: "power2.out",
              repeat: -1,
              repeatDelay: radarFrequency * 3, // Delay between full cycles
              delay: index * radarFrequency // Stagger the start of each ring
            }
          );
        }
      });
    }
  }, [isActive, radarIntensity, radarSpeed, radarFrequency]);

  const handleMouseEnter = () => {
    if (!isActive && pointRef.current) {
      gsap.to(pointRef.current, {
        scale: 1.1,
        duration: 0.2,
        ease: "power2.out"
      });
    }
    onMouseEnter?.();
  };

  const handleMouseLeave = () => {
    if (!isActive && pointRef.current) {
      gsap.to(pointRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out"
      });
    }
  };

  const containerOpacity = hasActivePoint && !isActive ? 0.4 : 1;

  return (
    <div
      className="cursor-target absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-opacity duration-300"
      style={{
        left: position.left,
        top: position.top,
        zIndex: isActive ? 60 : 10,
        opacity: containerOpacity
      }}
      data-country={point.country}
      data-active-map-point={isActive ? "true" : "false"}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Multiple radar ping effects for non-active points */}
      <div 
        ref={radarRef1}
        className="absolute inset-0 rounded-full border-2 pointer-events-none opacity-0"
        style={{
          borderColor: '#F7E7CE', // Shallow champagne color
          backgroundColor: 'rgba(247, 231, 206, 0.2)' // Reduced fill opacity
        }}
      />
      <div 
        ref={radarRef2}
        className="absolute inset-0 rounded-full border pointer-events-none opacity-0"
        style={{
          borderColor: '#F7E7CE',
          backgroundColor: 'rgba(247, 231, 206, 0.15)'
        }}
      />
      <div 
        ref={radarRef3}
        className="absolute inset-0 rounded-full border pointer-events-none opacity-0"
        style={{
          borderColor: '#F7E7CE',
          backgroundColor: 'rgba(247, 231, 206, 0.1)'
        }}
      />
      
      {/* Outer outlined ring for non-active points */}
      {!isActive && (
        <div 
          className="absolute w-[20px] h-[20px] sm:w-[36px] sm:h-[36px] rounded-full border-2 pointer-events-none"
          style={{
            borderColor: '#F7E7CE',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 1
          }}
        />
      )}
      
      {/* Corner outlines for active points */}
      {isActive && (
        <div 
          className="absolute pointer-events-none"
          style={{
            width: '60px',
            height: '60px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          {/* Top-left corner */}
          <div 
            className="absolute"
            style={{
              top: '0px',
              left: '0px',
              width: '12px',
              height: '12px',
              borderTop: '3px solid #F7E7CE',
              borderLeft: '3px solid #F7E7CE',
              borderRadius: '3px 0 0 0'
            }}
          />
          {/* Top-right corner */}
          <div 
            className="absolute"
            style={{
              top: '0px',
              right: '0px',
              width: '12px',
              height: '12px',
              borderTop: '3px solid #F7E7CE',
              borderRight: '3px solid #F7E7CE',
              borderRadius: '0 3px 0 0'
            }}
          />
          {/* Bottom-left corner */}
          <div 
            className="absolute"
            style={{
              bottom: '0px',
              left: '0px',
              width: '12px',
              height: '12px',
              borderBottom: '3px solid #F7E7CE',
              borderLeft: '3px solid #F7E7CE',
              borderRadius: '0 0 0 3px'
            }}
          />
          {/* Bottom-right corner */}
          <div 
            className="absolute"
            style={{
              bottom: '0px',
              right: '0px',
              width: '12px',
              height: '12px',
              borderBottom: '3px solid #F7E7CE',
              borderRight: '3px solid #F7E7CE',
              borderRadius: '0 0 3px 0'
            }}
          />
        </div>
      )}

      {/* Main point */}
      <div 
        ref={pointRef}
        className={`relative flex items-center justify-center w-[10px] h-[10px] sm:w-[20px] sm:h-[20px] rounded-full ${
          isActive 
            ? 'border border-white sm:border-2 bg-transparent shadow-lg shadow-white/60' 
            : ''
        }`}
        style={{
          backgroundColor: isActive ? 'transparent' : '#F7E7CE',
          boxShadow: isActive 
            ? undefined 
            : 'inset 0 0 8px rgba(255, 255, 255, 0.8), 0 0 4px rgba(247, 231, 206, 0.6)'
        }}
      >
        {/* Solid inner circle */}
        <div 
          className="rounded-full"
          style={{
            width: isActive ? '8px' : '4px',
            height: isActive ? '8px' : '4px',
            backgroundColor: isActive ? '#F7E7CE' : '#FFFFFF',
            opacity: isActive ? 1 : 0.9
          }}
        />
      </div>
    </div>
  );
};
