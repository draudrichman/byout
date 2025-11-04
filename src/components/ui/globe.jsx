import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import {
  Color,
  Scene,
  Fog,
  PerspectiveCamera,
  Vector3,
  MeshStandardMaterial,
  MeshPhysicalMaterial,
  Mesh,
  Group,
  QuadraticBezierCurve3,
  TubeGeometry,
  DoubleSide,
  AdditiveBlending,
  Sprite,
  SpriteMaterial,
} from "three";
import * as THREE from "three";
import ThreeGlobe from "three-globe";
import { useThree, Canvas, extend, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { CameraUpdater } from "./CameraUpdater";
// Post-processing effects temporarily disabled due to version compatibility
// import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing";
// import { BlendFunction } from "postprocessing";
import countries from "../../data/globe.json";

extend({ ThreeGlobe: ThreeGlobe });

const RING_PROPAGATION_SPEED = 2; // Tasteful expansion speed
const CAMERA_Z = 300;
const RING_UPDATE_INTERVAL = 1600; // Moderated frequency

// Removed unused numbersOfRings variable

export function Globe({ globeConfig, data }) {
  const globeRef = useRef(null);
  const groupRef = useRef();
  const intervalRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Memoized default props to prevent unnecessary re-renders
  const defaultProps = useMemo(
    () => ({
      pointSize: globeConfig.pointSize || 1,
      particlesSize: globeConfig.particlesSize || 200,
      hexPolygonColor: globeConfig.hexPolygonColor || "#ff6300",
      atmosphereColor: "#ffffff",
      showAtmosphere: true,
      atmosphereAltitude: 0.15, // Slightly higher for glass effect
      polygonColor: "rgba(255,255,255,0.8)", // More visible on glass
      globeColor: globeConfig.globeColor || "#e8f4fd", // Light blue tint for glass
      emissive: globeConfig.emissive || "#000000", // No emission for glass
      emissiveIntensity: globeConfig.emissiveIntensity || 0,
      shininess: globeConfig.shininess || 100, // High shininess for glass
      arcTime: 2000,
      arcLength: 0.9,
      ringColor: "#000000",
      rings: 1,
      maxRings: 5,
      globeOpacity: globeConfig.globeOpacity || 0.4, // More visible glass
      chinaHexPolygonColor: globeConfig.chinaHexPolygonColor || "#ff0000",
      targetingCountriesColor: globeConfig.targetingCountriesColor || "#00ff88",
      // Rings theme and optional overrides
      ringTheme: globeConfig.ringTheme || "chrome", // 'gold' | 'chrome'
      ringColorGold: globeConfig.ringColorGold, // e.g., '#D4AF37'
      ringColorChrome: globeConfig.ringColorChrome, // e.g., '#24282c'
      ...globeConfig,
    }),
    [globeConfig]
  );

  // Initialize globe only once with improved error handling
  useEffect(() => {
    if (!globeRef.current && groupRef.current) {
      try {
        globeRef.current = new ThreeGlobe();
        groupRef.current.add(globeRef.current);

        // Groups for glow effects removed - keeping only golden rings

        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to initialize globe:", error);
      }
    }
  }, []);

  // Enhanced material setup with glass-like appearance
  useEffect(() => {
    if (!globeRef.current || !isInitialized) return;

    try {
      const globeMaterial = globeRef.current.globeMaterial();
      if (globeMaterial) {
        // Simplified material for performance
        globeMaterial.color = new Color(defaultProps.globeColor);
        globeMaterial.emissive = new Color(defaultProps.emissive);
        globeMaterial.emissiveIntensity = defaultProps.emissiveIntensity;
        globeMaterial.shininess = defaultProps.shininess;
        globeMaterial.opacity = defaultProps.globeOpacity;
        globeMaterial.transparent = true;
        globeMaterial.needsUpdate = true;
      }
    } catch (error) {
      console.error("Failed to update globe material:", error);
    }
  }, [
    isInitialized,
    defaultProps.globeColor,
    defaultProps.emissive,
    defaultProps.emissiveIntensity,
    defaultProps.shininess,
    defaultProps.globeOpacity,
  ]);

  // Memoized points processing for better performance
  const processedPoints = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];

    const points = [];
    for (let i = 0; i < data.length; i++) {
      const arc = data[i];
      if (
        !arc ||
        typeof arc.startLat !== "number" ||
        typeof arc.startLng !== "number"
      )
        continue;

      points.push(
        {
          size: defaultProps.pointSize,
          order: arc.order,
          color: arc.color,
          lat: arc.startLat,
          lng: arc.startLng,
          opacity: defaultProps.pointOpacity,
        },
        {
          size: defaultProps.pointSize,
          order: arc.order,
          color: arc.color,
          lat: arc.endLat,
          lng: arc.endLng,
          opacity: defaultProps.pointOpacity,
        }
      );
    }

    // Enhanced deduplication with improved performance
    return points.filter(
      (point, index, array) =>
        array.findIndex((p) => p.lat === point.lat && p.lng === point.lng) ===
        index
    );
  }, [data, defaultProps.pointSize, defaultProps.pointOpacity]);

  // Create custom metallic points

  // Enhanced hex polygon color function with 3 color scheme
  const getHexPolygonColor = useCallback(
    (d) => {
      const admin = d?.properties?.admin;

      // China gets its own color
      if (admin === "China") {
        return defaultProps.chinaHexPolygonColor;
      }

      // The 6 specified countries get a different color
      const specifiedCountries = [
        "United States of America",
        "Canada",
        "Cambodia",
        "Japan",
        "Australia",
        "New Zealand",
      ];
      if (specifiedCountries.includes(admin)) {
        return defaultProps.targetingCountriesColor; // Configurable color for the 6 countries
      }

      // All other countries get the default color
      return defaultProps.hexPolygonColor;
    },
    [
      defaultProps.chinaHexPolygonColor,
      defaultProps.hexPolygonColor,
      defaultProps.targetingCountriesColor,
    ]
  );

  // Enhanced arc stroke function with more variation
  const getArcStroke = useCallback(() => {
    const variations = [0.32, 0.28, 0.3, 0.35, 0.25];
    return variations[Math.floor(Math.random() * variations.length)];
  }, []);

  // Decide a stable default ring color (gold by default)
  const defaultRingColor = useMemo(() => {
    if (defaultProps.ringTheme === "chrome")
      return defaultProps.ringColorChrome || "#24282c"; // chrome grey
    // default to a bright, glowing gold
    return defaultProps.ringColorGold || "#FFD700"; // golden
  }, [
    defaultProps.ringTheme,
    defaultProps.ringColorGold,
    defaultProps.ringColorChrome,
  ]);

  // Build data when globe is initialized or when data changes
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data || !Array.isArray(data))
      return;

    try {
      // Enhanced hex polygons setup - show all countries
      globeRef.current
        .hexPolygonsData(countries.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.2)
        .showAtmosphere(defaultProps.showAtmosphere)
        .atmosphereColor(defaultProps.atmosphereColor)
        .atmosphereAltitude(defaultProps.atmosphereAltitude)
        .hexPolygonColor(getHexPolygonColor);

      // Enhanced arcs setup with glassy, glowy, metallic materials
      globeRef.current
        .arcsData(data)
        .arcStartLat((d) => Number(d?.startLat) || 0)
        .arcStartLng((d) => Number(d?.startLng) || 0)
        .arcEndLat((d) => Number(d?.endLat) || 0)
        .arcEndLng((d) => Number(d?.endLng) || 0)
        .arcColor((e) => e?.color || "#ffffff")
        .arcAltitude((e) => Number(e?.arcAlt) || 0.1)
        .arcStroke(() => 0.8) // Thicker arcs for better metallic effect
        .arcDashLength(defaultProps.arcLength)
        .arcDashInitialGap((e) => Number(e?.order) || 0)
        .arcDashGap(2)
        .arcDashAnimateTime(() => defaultProps.arcTime)
        // Custom arc material function for glassy, glowy, metallic effect
        .arcThreeObject((d) => {
          // Create custom arc geometry and material
          const startCoords = globeRef.current.getCoords(
            d.startLat,
            d.startLng,
            0.1
          );
          const endCoords = globeRef.current.getCoords(d.endLat, d.endLng, 0.1);
          const midCoords = globeRef.current.getCoords(
            (d.startLat + d.endLat) / 2,
            (d.startLng + d.endLng) / 2,
            (Number(d?.arcAlt) || 0.1) + 0.05
          );

          // Create curve for the arc
          const curve = new QuadraticBezierCurve3(
            new Vector3(startCoords.x, startCoords.y, startCoords.z),
            new Vector3(midCoords.x, midCoords.y, midCoords.z),
            new Vector3(endCoords.x, endCoords.y, endCoords.z)
          );

          // Create tube geometry for thicker, more visible arcs with glow
          const tubeGeometry = new TubeGeometry(curve, 64, 1.8, 8, false);

          // Create enhanced glowing arc material
          const arcMaterial = new MeshStandardMaterial({
            color: new Color(d?.color || "#ffffff"),
            metalness: 0.7,
            roughness: 0.1,
            transparent: true,
            opacity: 0.4,
            emissive: new Color(d?.color || "#ffffff"),
            emissiveIntensity: 1.5,
            envMapIntensity: 2.0,
          });

          const arcMesh = new Mesh(tubeGeometry, arcMaterial);

          // Create a group to contain the main arc
          const arcGroup = new Group();
          arcGroup.add(arcMesh); // Main metallic arc

          // Add animation data for pulsing glow effect
          arcGroup.userData = {
            t: Math.random() * Math.PI * 2,
            speed: 0.8 + Math.random() * 0.4,
            baseEmissiveIntensity: 1.5,
            arcMesh: arcMesh,
          };

          return arcGroup;
        });
      // Disable default points since we're using custom endpoint markers
      globeRef.current
        .pointsData([])
        .pointColor((e) => e?.color || "#ffffff")
        .pointOpacity((e) => e?.opacity || 1)
        .pointsMerge(true)
        .pointAltitude(0.0)
        .pointRadius(defaultProps.particlesSize);

      // Rings setup with chrome/gold theme
      globeRef.current
        .ringsData([])
        .ringColor(() => defaultRingColor)
        .ringMaxRadius(12) // Increased size
        .ringPropagationSpeed(RING_PROPAGATION_SPEED)
        .ringResolution(12) // Add ring resolution for better visibility
        .ringRadius(12) // Increased size
        .ringRepeatPeriod(
          Math.max(
            1200,
            (defaultProps.arcTime * defaultProps.arcLength) /
              (defaultProps.rings || 1)
          )
        );
    } catch (error) {
      console.error("Failed to setup globe data:", error);
    }
  }, [
    isInitialized,
    data,
    processedPoints,
    defaultProps,
    getHexPolygonColor,
    getArcStroke,
    defaultRingColor,
  ]);

  // Endpoint markers removed - keeping only golden rings

  // Endpoint marker animation removed - keeping only golden rings

  // Enhanced rings animation with better cleanup and error handling
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data || !Array.isArray(data))
      return;

    const updateRings = () => {
      try {
        if (!globeRef.current || !data.length) return;

        const ringCount = Math.floor((data.length * 4) / 5);
        const newNumbersOfRings = genRandomNumbers(
          0,
          data.length,
          Math.min(ringCount, data.length)
        );

        // Create rings at both start points and end points (landing locations)
        const startRingsData = data
          .filter(
            (d, i) =>
              newNumbersOfRings.includes(i) &&
              d?.startLat != null &&
              d?.startLng != null
          )
          .map((d) => ({
            lat: d.startLat,
            lng: d.startLng,
            color: defaultRingColor,
          }));

        const endRingsData = data
          .filter(
            (d, i) =>
              newNumbersOfRings.includes(i) &&
              d?.endLat != null &&
              d?.endLng != null
          )
          .map((d) => ({
            lat: d.endLat,
            lng: d.endLng,
            color: defaultRingColor,
          }));

        // Combine both start and end rings
        const ringsData = [...startRingsData, ...endRingsData];

        globeRef.current
          .ringsData(ringsData)
          .ringColor(() => defaultRingColor)
          .ringMaxRadius(3)
          .ringRadius(3)
          .ringRepeatPeriod(
            Math.max(
              1200,
              (defaultProps.arcTime * defaultProps.arcLength) /
                (defaultProps.rings || 1)
            )
          );

        // Glow sprites removed - keeping only golden rings
      } catch (error) {
        console.error("Failed to update rings:", error);
      }
    };

    // Initial ring update
    updateRings();

    // Set up interval with cleanup
    intervalRef.current = setInterval(updateRings, RING_UPDATE_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isInitialized, data, defaultRingColor]);

  // Animate arc glow effects with pulsing
  useFrame((_, delta) => {
    if (!globeRef.current) return;

    // Get all arc groups and animate their glow
    globeRef.current.children.forEach((child) => {
      if (child.userData && child.userData.arcMesh) {
        const userData = child.userData;
        userData.t += delta * userData.speed;

        // Pulsing emissive intensity for main arc
        const emissivePulse =
          userData.baseEmissiveIntensity + 0.3 * Math.sin(userData.t);
        if (userData.arcMesh.material) {
          userData.arcMesh.material.emissiveIntensity = emissivePulse;
          userData.arcMesh.material.needsUpdate = true;
        }
      }
    });
  });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return <group ref={groupRef} />;
}

export function WebGLRendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    try {
      gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Further cap pixel ratio for performance
      gl.setSize(size.width, size.height);
      gl.setClearColor(0x000000, 0);

      // Enhanced shadow configuration for metallic materials
      gl.shadowMap.enabled = true;
      gl.shadowMap.type = gl.PCFSoftShadowMap;
      gl.shadowMap.autoUpdate = true;

      // Enhanced rendering for metallic and glass effects
      gl.toneMapping = gl.ACESFilmicToneMapping;
      gl.toneMappingExposure = 1.8; // Increased for better metallic visibility
      gl.outputEncoding = gl.sRGBEncoding;

      // Enhanced environment mapping for metallic reflections and glass
      gl.physicallyCorrectLights = true;

      // Enable antialiasing for smoother metallic surfaces
      gl.antialias = true;

      // Enhanced rendering settings for premium metallic/glass effects
      gl.gammaFactor = 2.2;
      gl.gammaInput = true;
      gl.gammaOutput = true;

      // Enable logarithmic depth buffer for better precision with transparent materials
      gl.logarithmicDepthBuffer = true;

      // Enhanced precision for metallic materials
      gl.precision = "highp";
    } catch (error) {
      console.error("Failed to configure WebGL renderer:", error);
    }
  }, [gl, size]);

  return null;
}

export function World(props) {
  const { globeConfig } = props;

  // Memoized scene setup for better performance
  const scene = useMemo(() => {
    const newScene = new Scene();
    newScene.fog = new Fog(0x000000, 600, 2000);
    return newScene;
  }, []);

  // Memoized camera setup with default position
  const camera = useMemo(() => {
    const cam = new PerspectiveCamera(55, 1, 180, 1800);
    cam.position.set(195.5409332958142, 50.14669365055826, -138.9637081132115);
    return cam;
  }, []);

  // Memoized light positions for consistency
  const lightPositions = useMemo(
    () => ({
      directionalLeft: new Vector3(-400, 100, 400),
      directionalRight: new Vector3(400, -100, -400),
      directionalTop: new Vector3(-200, 500, 200),
      pointMain: new Vector3(-200, 500, 200),
      pointAccent1: new Vector3(400, -200, 300),
      pointAccent2: new Vector3(-300, 300, -400),
    }),
    []
  );

  return (
    <Canvas scene={scene} camera={camera}>
      <WebGLRendererConfig />
      <CameraUpdater />

      {/* Simplified lighting for performance */}
      <ambientLight
        color={globeConfig.ambientLight || "#ffffff"}
        intensity={1.8}
      />
      <directionalLight
        color={globeConfig.directionalLeftLight || "#ffffff"}
        position={lightPositions.directionalLeft}
        intensity={2.5}
        castShadow={false}
      />

      <Globe {...props} />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={CAMERA_Z}
        maxDistance={CAMERA_Z}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
        enableDamping={true}
        dampingFactor={0.1}
        autoRotate={true}
        autoRotateSpeed={globeConfig.autoRotateSpeed}
      />
    </Canvas>
  );
}

// Enhanced utility functions with better error handling
export function hexToRgb(hex) {
  if (!hex || typeof hex !== "string") return null;

  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function genRandomNumbers(min, max, count) {
  if (min >= max || count <= 0 || count > max - min) {
    return [];
  }

  const arr = [];
  const attempts = Math.min(count * 10, 1000); // Prevent infinite loops
  let attemptCount = 0;

  while (arr.length < count && attemptCount < attempts) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (!arr.includes(r)) {
      arr.push(r);
    }
    attemptCount++;
  }

  return arr;
}
