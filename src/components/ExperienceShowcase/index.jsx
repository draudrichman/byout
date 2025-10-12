"use client";

import React, { useState, useCallback, useRef, useEffect, memo } from 'react';
import { gsap } from 'gsap';
import { MapSelector } from './map/MapSelector';
import MapInfoPanel from './map/MapInfoPanel';
import MapHUD from './map/MapHUD';
import { flagItems, logosByCountry, getLogoGroupsForCountry } from './map/LogoShowcaseData';
import { getMapPointByCountry } from './map/MapData';
import DecryptedText from './DecryptedText';
import HudConnector from './HudConnector';
import AwardsAndBrands from './AwardsAndBrands';

const ExperienceShowcase = memo(() => {
  const [selectedCountry, setSelectedCountry] = useState("Canada");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedFlagIndex, setSelectedFlagIndex] = useState(0);
  const [showHUD, setShowHUD] = useState(true);
  const showcaseContainerRef = useRef(null);
  const timelineRef = useRef(null);
  const mapSelectorRef = useRef(null);
  const hubTimeoutRef = useRef(null);

  const handleCountryChange = useCallback((country, flagIndex, isUserClick = true) => {
    // Allow reopening HUD for the same country if it's currently closed
    if (country === selectedCountry && showHUD && isUserClick) {
      if (isTransitioning) return;
      // Just reset the auto-hide timer
      if (hubTimeoutRef.current) {
        clearTimeout(hubTimeoutRef.current);
      }
      hubTimeoutRef.current = setTimeout(() => {
        setShowHUD(false);
      }, 8000);
      return;
    }
    
    if (isTransitioning) return;
    
    // Update flag index for connector - both country and index should be synchronized
    setSelectedFlagIndex(flagIndex);
    
    setIsTransitioning(true);
    
    // Clear existing hub timeout
    if (hubTimeoutRef.current) {
      clearTimeout(hubTimeoutRef.current);
    }
    
    // Create smooth transition timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    
    const tl = gsap.timeline({
      onComplete: () => {
        setIsTransitioning(false);
        timelineRef.current = null;
      }
    });
    
    timelineRef.current = tl;
    
    // Simple country change
    tl.call(() => {
      setSelectedCountry(country);
      // Only show unified HUD overlay on map if triggered by user click
      if (isUserClick) {
        setShowHUD(true);
        // Auto-hide HUD after 8 seconds
        hubTimeoutRef.current = setTimeout(() => {
          setShowHUD(false);
        }, 8000);
      }
    });
  }, [selectedCountry, isTransitioning, showHUD]);


  const handleHUDClose = useCallback(() => {
    setShowHUD(false);
    if (hubTimeoutRef.current) {
      clearTimeout(hubTimeoutRef.current);
      hubTimeoutRef.current = null;
    }
  }, []);

  // Cleanup timeline and timeout on unmount
  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      if (hubTimeoutRef.current) {
        clearTimeout(hubTimeoutRef.current);
      }
    };
  }, []);

  const currentLogos = logosByCountry[selectedCountry] || logosByCountry["Canada"];
  const shouldUseStaticGrid = currentLogos.length <= 3;
  
  // Get logos split into three groups for the selected country
  const logoGroups = getLogoGroupsForCountry(selectedCountry);
  
  // Determine hub position based on country's x-coordinate
  const mapPoint = getMapPointByCountry(selectedCountry);
  const hubPosition = (mapPoint && mapPoint.x > 50) ? 'left' : 'right';

  return (
    <div className="py-20 px-10 text-center bg-gradient-to-b from-transparent via-black/50 to-black" style={{backgroundImage: 'linear-gradient(to bottom, transparent 0%, black 33%, black 100%)'}}>
      <div ref={showcaseContainerRef} className="max-w-7xl mx-auto relative">
        {/* Title */}
        <h2 className="mb-12 text-2xl sm:text-3xl lg:text-5xl font-bold text-white uppercase font-scifi">
          <DecryptedText text="Experience Showcase" className="pointer-events-auto font-scifi" />
        </h2>
        {/* Interactive Map Selector with HUD overlay */}
        <div ref={mapSelectorRef} className="sm:px-20 relative">
          <MapSelector
            flagItems={flagItems}
            autoRotateInterval={3000}
            pauseOnHover={true}
            className="justify-center"
            onCountryChange={handleCountryChange}
            selectedIndex={selectedFlagIndex}
          />
          
          {/* HUD Overlay on Map */}
          <MapHUD
            isVisible={showHUD}
            selectedCountry={selectedCountry}
            currentLogos={currentLogos}
            shouldUseStaticGrid={shouldUseStaticGrid}
            logoGroups={logoGroups}
            hubPosition={hubPosition}
            onClose={handleHUDClose}
            mapContainerRef={mapSelectorRef}
          />
        </div>

        {/* Fixed Panel Below Map */}
        <MapInfoPanel
          selectedCountry={selectedCountry}
        />

        {/* HUD Connector from active map point to MapInfoPanel */}
        <HudConnector
            elements={{
              from: '[data-active-map-point="true"]',
              to: '[data-map-info-panel="true"]'
            }}
            positions={{
              from: 'mid',
              to: 'top'
            }}
            connectorType="L-shape"
            direction="vertical-first"
            colors={{
              stroke: '#F7E7CE',
              end: '#F7E7CE'
            }}
            endTypes={{
              from: 'none',
              to: 'square'
            }}
            endSizes={{
              to: 8
            }}
            strokeWidth={1}
            animated={true}
            className="z-60"
            offsets={{
              from: { x: 0, y: 0 },
              to: { x: -15, y: 0 }
            }}
          />

        {/* Awards and Brands Section */}
        {/* <AwardsAndBrands /> */}
      </div>
    </div>
  );
});

ExperienceShowcase.displayName = 'ExperienceShowcase';

export default ExperienceShowcase;
