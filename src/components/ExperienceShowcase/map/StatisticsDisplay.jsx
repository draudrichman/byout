"use client";

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const StatisticsDisplay = ({ data }) => {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Set initial states
    itemsRef.current.forEach((item) => {
      if (item) {
        gsap.set(item, { opacity: 0, y: 20 });
      }
    });

    // Animate items in sequence
    const tl = gsap.timeline({ delay: 0.3 });
    
    itemsRef.current.forEach((item, index) => {
      if (item) {
        tl.to(item, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        }, index * 0.2);
      }
    });

  }, [data]);

  return (
    <div ref={containerRef} className="space-y-8">
      {data.map((item, index) => (
        <div 
          key={index}
          ref={(el) => { itemsRef.current[index] = el; }}
          className="flex items-center gap-6"
        >
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white min-w-[120px] text-center">
            {item.value}
          </div>
          <div className="flex-1 space-y-1 text-right">
            <div className="text-[10px] sm:text-xs md:text-base font-medium text-white/90">
              {item.chineseLabel}
            </div>
            <div className="text-[10px] sm:text-xs md:text-base text-white/70">
              {item.englishLabel}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatisticsDisplay;
