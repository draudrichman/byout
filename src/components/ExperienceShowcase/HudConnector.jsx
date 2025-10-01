"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";

const HudConnector = ({
  elements,
  positions = { from: 'mid', to: 'mid' },
  endTypes = { from: 'none', to: 'none' },
  endSizes = { from: 6, to: 6 },
  colors = { stroke: "rgba(156, 163, 175, 0.8)", end: "rgba(156, 163, 175, 0.8)" },
  offsets = { from: { x: 0, y: 0 }, to: { x: 0, y: 0 } },
  connectorType = 'straight',
  direction = 'horizontal-first',
  animated = true,
  className = "",
  strokeWidth = 2
}) => {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const markerStartRef = useRef(null);
  const markerEndRef = useRef(null);
  const [path, setPath] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0, left: 0, top: 0 });
  const [showMarkers, setShowMarkers] = useState(!animated);
  const animationFrameRef = useRef(null);
  const lastPositionsRef = useRef({ from: null, to: null });
  
  const getElementPosition = useCallback((
    element,
    position
  ) => {
    let el = null;
    
    if (typeof element === 'string') {
      el = document.querySelector(element);
    } else if (element.current) {
      el = element.current;
    }
    
    if (!el) return null;
    
    const rect = el.getBoundingClientRect();
    
    switch (position) {
      case 'left':
        return { x: rect.left, y: rect.top + rect.height / 2 };
      case 'right':
        return { x: rect.right, y: rect.top + rect.height / 2 };
      case 'top':
        return { x: rect.left + rect.width / 2, y: rect.top };
      case 'bottom':
        return { x: rect.left + rect.width / 2, y: rect.bottom };
      case 'mid':
      default:
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
  }, []);
  
  const generatePath = useCallback((
    from,
    to,
    type,
    direction = 'horizontal-first'
  ) => {
    switch (type) {
      case 'straight':
        return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
        
      case 'L-shape':
        if (direction === 'vertical-first') {
          const midY = from.y + (to.y - from.y) / 2;
          return `M ${from.x} ${from.y} L ${from.x} ${midY} L ${to.x} ${midY} L ${to.x} ${to.y}`;
        } else {
          const midX = from.x + (to.x - from.x) / 2;
          return `M ${from.x} ${from.y} L ${midX} ${from.y} L ${midX} ${to.y} L ${to.x} ${to.y}`;
        }
        
      case 'curved':
        if (direction === 'vertical-first') {
          const controlX1 = from.x;
          const controlY1 = from.y + (to.y - from.y) * 0.3;
          const controlX2 = to.x;
          const controlY2 = from.y + (to.y - from.y) * 0.7;
          return `M ${from.x} ${from.y} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${to.x} ${to.y}`;
        } else {
          const controlX1 = from.x + (to.x - from.x) * 0.3;
          const controlY1 = from.y;
          const controlX2 = from.x + (to.x - from.x) * 0.7;
          const controlY2 = to.y;
          return `M ${from.x} ${from.y} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${to.x} ${to.y}`;
        }
        
      default:
        return "";
    }
  }, []);

  const createEndMarker = useCallback((endType, size, id) => {
    const markerSize = size;
    const halfSize = size / 2;
    const isStart = id.includes('start');
    
    switch (endType) {
      case 'arrow':
        return (
          <marker
            id={id}
            markerWidth={markerSize}
            markerHeight={markerSize}
            refX={markerSize - 1}
            refY={halfSize}
            orient="auto"
            markerUnits="strokeWidth"
          >
            <g ref={isStart ? markerStartRef : markerEndRef}>
              <polygon
                points={`0,0 0,${markerSize} ${markerSize},${halfSize}`}
                fill={colors.end || "rgba(156, 163, 175, 0.8)"}
              />
            </g>
          </marker>
        );
      case 'circle':
        return (
          <marker
            id={id}
            markerWidth={markerSize}
            markerHeight={markerSize}
            refX={halfSize}
            refY={halfSize}
            orient="auto"
            markerUnits="strokeWidth"
          >
            <g ref={isStart ? markerStartRef : markerEndRef}>
              <circle
                cx={halfSize}
                cy={halfSize}
                r={halfSize}
                fill={colors.end || "rgba(156, 163, 175, 0.8)"}
              />
            </g>
          </marker>
        );
      case 'hollow-circle':
        return (
          <marker
            id={id}
            markerWidth={markerSize}
            markerHeight={markerSize}
            refX={halfSize}
            refY={halfSize}
            orient="auto"
            markerUnits="strokeWidth"
          >
            <g ref={isStart ? markerStartRef : markerEndRef}>
              <circle
                cx={halfSize}
                cy={halfSize}
                r={halfSize - 1}
                fill="none"
                stroke={colors.end || "rgba(156, 163, 175, 0.8)"}
                strokeWidth="1"
              />
            </g>
          </marker>
        );
      case 'square':
        return (
          <marker
            id={id}
            markerWidth={markerSize}
            markerHeight={markerSize}
            refX={halfSize}
            refY={halfSize}
            orient="auto"
            markerUnits="strokeWidth"
          >
            <g ref={isStart ? markerStartRef : markerEndRef}>
              <rect
                x="0"
                y="0"
                width={markerSize}
                height={markerSize}
                fill={colors.end || "rgba(156, 163, 175, 0.8)"}
              />
            </g>
          </marker>
        );
      case 'diamond':
        return (
          <marker
            id={id}
            markerWidth={markerSize}
            markerHeight={markerSize}
            refX={halfSize}
            refY={halfSize}
            orient="auto"
            markerUnits="strokeWidth"
          >
            <g ref={isStart ? markerStartRef : markerEndRef}>
              <polygon
                points={`${halfSize},0 ${markerSize},${halfSize} ${halfSize},${markerSize} 0,${halfSize}`}
                fill={colors.end || "rgba(156, 163, 175, 0.8)"}
              />
            </g>
          </marker>
        );
      default:
        return null;
    }
  }, [colors.end]);
  
  const calculateConnector = useCallback(() => {
    const fromPos = getElementPosition(elements.from, positions.from || 'mid');
    const toPos = getElementPosition(elements.to, positions.to || 'mid');
    
    if (!fromPos || !toPos) return;

    // Apply offsets
    const offsetFromPos = {
      x: fromPos.x + (offsets.from?.x || 0),
      y: fromPos.y + (offsets.from?.y || 0)
    };
    const offsetToPos = {
      x: toPos.x + (offsets.to?.x || 0),
      y: toPos.y + (offsets.to?.y || 0)
    };
    
    // Check if positions have actually changed to avoid unnecessary updates
    const lastPositions = lastPositionsRef.current;
    if (
      lastPositions.from &&
      lastPositions.to &&
      Math.abs(lastPositions.from.x - offsetFromPos.x) < 1 &&
      Math.abs(lastPositions.from.y - offsetFromPos.y) < 1 &&
      Math.abs(lastPositions.to.x - offsetToPos.x) < 1 &&
      Math.abs(lastPositions.to.y - offsetToPos.y) < 1
    ) {
      return;
    }
    
    // Update last positions
    lastPositionsRef.current = { from: offsetFromPos, to: offsetToPos };
    
    const minX = Math.min(offsetFromPos.x, offsetToPos.x) - 20;
    const minY = Math.min(offsetFromPos.y, offsetToPos.y) - 20;
    const maxX = Math.max(offsetFromPos.x, offsetToPos.x) + 20;
    const maxY = Math.max(offsetFromPos.y, offsetToPos.y) + 20;
    
    const adjustedFrom = { x: offsetFromPos.x - minX, y: offsetFromPos.y - minY };
    const adjustedTo = { x: offsetToPos.x - minX, y: offsetToPos.y - minY };
    
    setSvgDimensions({
      width: maxX - minX,
      height: maxY - minY,
      left: minX,
      top: minY
    });
    
    setPath(generatePath(adjustedFrom, adjustedTo, connectorType, direction));
  }, [elements.from, elements.to, positions.from, positions.to, offsets.from, offsets.to, connectorType, direction, getElementPosition, generatePath]);
  
  const startAnimationFrameTracking = useCallback(() => {
    const trackPositions = () => {
      calculateConnector();
      animationFrameRef.current = requestAnimationFrame(trackPositions);
    };
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(trackPositions);
  }, [calculateConnector]);
  
  const stopAnimationFrameTracking = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);
  
  useEffect(() => {
    calculateConnector();
    
    const handleResize = () => calculateConnector();
    const handleScroll = () => calculateConnector();
    
    // Start animation frame tracking for smooth position updates
    startAnimationFrameTracking();
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    const resizeObserver = new ResizeObserver(() => calculateConnector());
    
    // MutationObserver to track position changes from animations/transforms
    const mutationObserver = new MutationObserver(() => calculateConnector());
    
    // Set up observers for both elements
    const setupObservers = (element) => {
      let el = null;
      
      if (typeof element === 'string') {
        el = document.querySelector(element);
      } else if (element.current) {
        el = element.current;
      }
      
      if (el) {
        resizeObserver.observe(el);
        // Watch for attribute changes (like style, class) and child changes
        mutationObserver.observe(el, {
          attributes: true,
          attributeFilter: ['style', 'class', 'transform'],
          childList: true,
          subtree: true
        });
        
        // Also observe parent elements for layout changes
        let parent = el.parentElement;
        while (parent && parent !== document.body) {
          mutationObserver.observe(parent, {
            attributes: true,
            attributeFilter: ['style', 'class', 'transform'],
            childList: true
          });
          parent = parent.parentElement;
        }
      }
    };
    
    setupObservers(elements.from);
    setupObservers(elements.to);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      stopAnimationFrameTracking();
    };
  }, [calculateConnector, elements.from, elements.to, startAnimationFrameTracking, stopAnimationFrameTracking]);
  
  useEffect(() => {
    if (!animated || !pathRef.current) {
      setShowMarkers(true);
      return;
    }
    
    const pathElement = pathRef.current;
    const pathLength = pathElement.getTotalLength();
    
    // Initially hide markers during animation
    setShowMarkers(false);
    
    // Set initial scale to 0 for marker elements
    if (markerStartRef.current) {
      gsap.set(markerStartRef.current, { scale: 0, transformOrigin: "50% 50%" });
    }
    if (markerEndRef.current) {
      gsap.set(markerEndRef.current, { scale: 0, transformOrigin: "50% 50%" });
    }
    
    gsap.set(pathElement, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength
    });
    
    const timeline = gsap.timeline();
    
    timeline.to(pathElement, {
      strokeDashoffset: 0,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        // Show markers and animate them scaling in
        setShowMarkers(true);
        
        // Animate marker scale from 0 to 1
        if (markerStartRef.current) {
          gsap.to(markerStartRef.current, {
            scale: 1,
            duration: 0.3,
            ease: "back.out(1.7)",
            transformOrigin: "50% 50%"
          });
        }
        if (markerEndRef.current) {
          gsap.to(markerEndRef.current, {
            scale: 1,
            duration: 0.3,
            ease: "back.out(1.7)",
            transformOrigin: "50% 50%"
          });
        }
      }
    });
    
    return () => {
      timeline.kill();
    };
  }, [path, animated]);
  
  if (!path || svgDimensions.width === 0 || svgDimensions.height === 0) {
    return null;
  }
  
  return (
    <svg
      ref={svgRef}
      className={`fixed pointer-events-none z-10 ${className}`}
      style={{
        left: svgDimensions.left,
        top: svgDimensions.top,
        width: svgDimensions.width,
        height: svgDimensions.height
      }}
      width={svgDimensions.width}
      height={svgDimensions.height}
    >
      <defs>
        {endTypes.from && endTypes.from !== 'none' && createEndMarker(endTypes.from, endSizes.from || 6, 'marker-start')}
        {endTypes.to && endTypes.to !== 'none' && createEndMarker(endTypes.to, endSizes.to || 6, 'marker-end')}
      </defs>
      <path
        ref={pathRef}
        d={path}
        stroke={colors.stroke || "rgba(156, 163, 175, 0.8)"}
        strokeWidth={strokeWidth}
        fill="none"
        markerStart={showMarkers && endTypes.from && endTypes.from !== 'none' ? "url(#marker-start)" : undefined}
        markerEnd={showMarkers && endTypes.to && endTypes.to !== 'none' ? "url(#marker-end)" : undefined}
      />
    </svg>
  );
};

export default HudConnector;
