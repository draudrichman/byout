import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import landData from "../../assets/ne_110m_land.json";

const RADAR_LOCATIONS = [
  { name: "China", lng: 104.1954, lat: 35.8617, color: "#DDDDDD" },
  { name: "USA", lng: -98.5795, lat: 39.8283, color: "#DDDDDD" },
  { name: "Canada", lng: -106.3468, lat: 56.1304, color: "#DDDDDD" },
  { name: "Cambodia", lng: 104.991, lat: 12.5657, color: "#DDDDDD" },
  { name: "Japan", lng: 138.2529, lat: 36.2048, color: "#DDDDDD" },
  { name: "Australia", lng: 133.7751, lat: -25.2744, color: "#DDDDDD" },
  { name: "New Zealand", lng: 174.886, lat: -40.9006, color: "#DDDDDD" },
];

export default function RotatingEarth({
  width = 800,
  height = 600,
  className = "",
}) {
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return;

    // Set up responsive dimensions
    const containerWidth = width;
    const containerHeight = height;
    const radius = Math.min(containerWidth, containerHeight) / 2.5;

    // Cap DPR at 2 for better performance on high-DPI displays
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = containerWidth * dpr;
    canvas.height = containerHeight * dpr;
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${containerHeight}px`;
    context.scale(dpr, dpr);

    // Create projection and path generator for Canvas
    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90);

    const path = d3.geoPath().projection(projection).context(context);

    const pointInPolygon = (point, polygon) => {
      const [x, y] = point;
      let inside = false;

      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];

        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside;
        }
      }

      return inside;
    };

    const pointInFeature = (point, feature) => {
      const geometry = feature.geometry;

      if (geometry.type === "Polygon") {
        const coordinates = geometry.coordinates;
        // Check if point is in outer ring
        if (!pointInPolygon(point, coordinates[0])) {
          return false;
        }
        // Check if point is in any hole (inner rings)
        for (let i = 1; i < coordinates.length; i++) {
          if (pointInPolygon(point, coordinates[i])) {
            return false; // Point is in a hole
          }
        }
        return true;
      } else if (geometry.type === "MultiPolygon") {
        // Check each polygon in the MultiPolygon
        for (const polygon of geometry.coordinates) {
          // Check if point is in outer ring
          if (pointInPolygon(point, polygon[0])) {
            // Check if point is in any hole
            let inHole = false;
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) {
                inHole = true;
                break;
              }
            }
            if (!inHole) {
              return true;
            }
          }
        }
        return false;
      }

      return false;
    };

    const generateDotsInPolygon = (feature, dotSpacing = 16) => {
      const dots = [];
      const bounds = d3.geoBounds(feature);
      const [[minLng, minLat], [maxLng, maxLat]] = bounds;

      const stepSize = dotSpacing * 0.08;

      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point = [lng, lat];
          if (pointInFeature(point, feature)) {
            dots.push(point);
          }
        }
      }

      return dots;
    };

    const allDots = [];
    let landFeatures;
    let radarAnimationTime = 0;

    // Cache graticule since it doesn't change
    const graticule = d3.geoGraticule();

    const render = () => {
      // Clear canvas
      context.clearRect(0, 0, containerWidth, containerHeight);

      const currentScale = projection.scale();
      const scaleFactor = currentScale / radius;

      // Draw ocean (globe background)
      context.save();
      context.globalAlpha = 0;
      context.beginPath();
      context.arc(
        containerWidth / 2,
        containerHeight / 2,
        currentScale,
        0,
        2 * Math.PI,
      );
      context.fill();
      context.globalAlpha = 1;
      context.strokeStyle = "#83878d";
      context.lineWidth = 2 * scaleFactor;
      context.stroke();
      context.restore();

      if (landFeatures) {
        // Draw graticule (cached)
        context.save();
        context.beginPath();
        path(graticule());
        context.strokeStyle = "#83878d";
        context.lineWidth = 1 * scaleFactor;
        context.globalAlpha = 0.25;
        context.stroke();
        context.restore();

        // Draw land outlines
        context.beginPath();
        landFeatures.features.forEach((feature) => {
          path(feature);
        });
        context.strokeStyle = "#83878d";
        context.lineWidth = 1 * scaleFactor;
        context.stroke();

        // Update current region index based on rotation
        currentRegionIndex = getCurrentFocusRegion();

        RADAR_LOCATIONS.forEach((location) => {
          // Check if this location should be visible in the current region
          const currentRegion = focusRegions[currentRegionIndex];
          if (!currentRegion.visibleCountries.includes(location.name)) {
            return; // Skip this radar if it's not in the current focus region
          }

          const projected = projection([location.lng, location.lat]);

          if (!projected) return;

          // Check if the location is on the visible side of the globe using proper spherical geometry
          const rotatedCoords = projection.rotate();

          // Convert to radians
          const locationLng = (location.lng * Math.PI) / 180;
          const locationLat = (location.lat * Math.PI) / 180;
          const rotateLng = (-rotatedCoords[0] * Math.PI) / 180;
          const rotateLat = (-rotatedCoords[1] * Math.PI) / 180;

          // Calculate if point is on the visible hemisphere using spherical dot product
          const cosc =
            Math.sin(rotateLat) * Math.sin(locationLat) +
            Math.cos(rotateLat) *
              Math.cos(locationLat) *
              Math.cos(locationLng - rotateLng);

          if (
            projected[0] >= 0 &&
            projected[0] <= containerWidth &&
            projected[1] >= 0 &&
            projected[1] <= containerHeight &&
            cosc > 0 // Only draw if on the front side
          ) {
            // Draw radar center point
            context.beginPath();
            context.arc(
              projected[0],
              projected[1],
              6 * scaleFactor,
              0,
              2 * Math.PI,
            );
            context.fillStyle = location.color;
            context.fill();

            const maxRadius = 80 * scaleFactor;
            const expandingRadius =
              ((radarAnimationTime % 5000) / 5000) * maxRadius;

            // Outer expanding circle
            context.beginPath();
            context.arc(
              projected[0],
              projected[1],
              expandingRadius,
              0,
              2 * Math.PI,
            );
            context.strokeStyle = location.color;
            context.lineWidth = 2.5 * scaleFactor;
            const outerAlpha = 1 - (radarAnimationTime % 5000) / 5000;
            context.globalAlpha = outerAlpha * 0.6;
            context.stroke();
            context.globalAlpha = 1;

            // Inner static circle
            context.beginPath();
            context.arc(
              projected[0],
              projected[1],
              30 * scaleFactor,
              0,
              2 * Math.PI,
            );
            context.strokeStyle = location.color;
            context.lineWidth = 2 * scaleFactor;
            context.globalAlpha = 0.4;
            context.stroke();
            context.globalAlpha = 1;
          }
        });
      }
    };

    const loadWorldData = () => {
      try {
        setIsLoading(true);

        // Use imported data instead of fetching
        landFeatures = landData;

        // Defer expensive dot generation to idle time to prevent blocking
        const generateDotsAsync = () => {
          let featureIndex = 0;
          let totalDots = 0;

          const processNextFeature = (deadline) => {
            // Process features in batches during idle time
            while (
              featureIndex < landFeatures.features.length &&
              (deadline.timeRemaining() > 0 || deadline.didTimeout)
            ) {
              const feature = landFeatures.features[featureIndex];
              const dots = generateDotsInPolygon(feature, 16);

              dots.forEach(([lng, lat]) => {
                allDots.push({ lng, lat, visible: true });
                totalDots++;
              });

              featureIndex++;
            }

            if (featureIndex < landFeatures.features.length) {
              // More features to process
              requestIdleCallback(processNextFeature, { timeout: 100 });
            } else {
              // All done
              console.log(
                `[Globe] Generated ${totalDots} dots across ${landFeatures.features.length} features`,
              );
            }
          };

          requestIdleCallback(processNextFeature, { timeout: 100 });
        };

        // Start async dot generation
        generateDotsAsync();

        // Render immediately (dots will appear as they're generated)
        render();
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load land map data");
        setIsLoading(false);
      }
    };

    // Set up rotation and interaction
    const rotation = [0, 0, 0]; // [longitude, latitude, roll]
    let autoRotate = true;

    // Define regions to focus on during rotation (ordered for counter-clockwise movement)
    const focusRegions = [
      {
        lng: -110, // China, Japan, Cambodia (continuing counter-clockwise)
        lat: -40,
        visibleCountries: ["China", "Japan", "Cambodia"],
      },
      {
        lng: -140, // Australia & New Zealand
        lat: 0,
        visibleCountries: ["Australia", "New Zealand"],
      },
      {
        lng: 110, // Canada & USA (going counter-clockwise/westward)
        lat: -65,
        visibleCountries: ["Canada", "USA"],
      },
    ];

    // Total cycle time for one complete rotation through all regions
    const totalCycleDuration = 18000; // 18 seconds for full cycle (6 seconds per region)
    const startTime = Date.now();

    // Helper function to determine which region is currently in focus based on rotation
    const getCurrentFocusRegion = () => {
      // Calculate distances from current rotation to each focus region
      const distances = focusRegions.map((region, index) => {
        // Normalize rotation[0] to be in similar range for comparison
        let normalizedRotation = rotation[0] % 360;
        if (normalizedRotation > 180) normalizedRotation -= 360;
        if (normalizedRotation < -180) normalizedRotation += 360;

        let normalizedRegionLng = region.lng % 360;
        if (normalizedRegionLng > 180) normalizedRegionLng -= 360;
        if (normalizedRegionLng < -180) normalizedRegionLng += 360;

        const lngDiff = Math.abs(
          ((normalizedRotation - normalizedRegionLng + 180) % 360) - 180,
        );
        const latDiff = Math.abs(rotation[1] - region.lat);
        const distance = Math.sqrt(lngDiff * lngDiff + latDiff * latDiff);
        return { index, distance };
      });

      // Return the region we're closest to
      distances.sort((a, b) => a.distance - b.distance);
      return distances[0].index;
    };

    const rotate = () => {
      if (autoRotate) {
        const elapsed = Date.now() - startTime;
        const cycleProgress =
          (elapsed % totalCycleDuration) / totalCycleDuration;

        // Calculate smooth path through all focus regions
        const totalRegions = focusRegions.length;
        const currentSegment = cycleProgress * totalRegions;
        const currentIndex = Math.floor(currentSegment);
        const nextIndex = (currentIndex + 1) % totalRegions;
        const segmentProgress = currentSegment - currentIndex;

        // Smooth interpolation between current and next region
        const currentRegion = focusRegions[currentIndex];
        const nextRegion = focusRegions[nextIndex];

        // Calculate longitude difference (no wrapping - keep going in same direction)
        let lngDiff = nextRegion.lng - currentRegion.lng;

        // Special case: when going from Australia (index 1, lng: -140) to USA/Canada (index 2, lng: 110)
        // Force counter-clockwise by subtracting 360 from the target
        if (currentIndex === 1 && nextIndex === 2) {
          lngDiff = nextRegion.lng - 360 - currentRegion.lng;
        }

        // Ease function for smooth movement (ease-in-out)
        const ease = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
        const easedProgress = ease(segmentProgress);

        rotation[0] = currentRegion.lng + lngDiff * easedProgress;
        rotation[1] =
          currentRegion.lat +
          (nextRegion.lat - currentRegion.lat) * easedProgress;

        projection.rotate(rotation);
        radarAnimationTime += 16; // Increment by ~16ms per frame
        render();
      }
    };

    let currentRegionIndex = getCurrentFocusRegion();

    // Auto-rotation timer
    const rotationTimer = d3.timer(rotate);

    const handleMouseDown = (event) => {
      autoRotate = false;
      const startX = event.clientX;
      const startY = event.clientY;
      const startRotation = [...rotation];

      const handleMouseMove = (moveEvent) => {
        const sensitivity = 0.5;
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;

        rotation[0] = startRotation[0] + dx * sensitivity;
        rotation[1] = startRotation[1] - dy * sensitivity;
        rotation[1] = Math.max(-90, Math.min(90, rotation[1]));

        projection.rotate(rotation);
        render();
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);

        setTimeout(() => {
          autoRotate = true;
        }, 10);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    // const handleWheel = (event) => {
    //   event.preventDefault();
    //   // const scaleFactor = event.deltaY > 0 ? 0.9 : 1.1
    //   // const newRadius = Math.max(radius * 0.5, Math.min(radius * 3, projection.scale() * scaleFactor))
    //   // projection.scale(newRadius)
    //   // render()
    // };

    canvas.addEventListener("mousedown", handleMouseDown);
    // canvas.addEventListener("wheel", handleWheel)

    // Load the world data
    loadWorldData();

    // Cleanup
    return () => {
      rotationTimer.stop();
      canvas.removeEventListener("mousedown", handleMouseDown);
      // canvas.removeEventListener("wheel", handleWheel)
    };
  }, [width, height]);

  if (error) {
    return (
      <div
        className={`dark flex items-center justify-center bg-card rounded-2xl p-8 ${className}`}
      >
        <div className="text-center">
          <p className="dark text-destructive font-semibold mb-2">
            Error loading Earth visualization
          </p>
          <p className="dark text-muted-foreground text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-auto rounded-2xl"
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  );
}
