import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3, MeshStandardMaterial, MeshPhysicalMaterial, SphereGeometry, Mesh, Group, QuadraticBezierCurve3, TubeGeometry, DoubleSide, AdditiveBlending } from "three";
import * as THREE from "three";
import ThreeGlobe from "three-globe";
import { useThree, Canvas, extend, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// Post-processing effects temporarily disabled due to version compatibility
// import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing";
// import { BlendFunction } from "postprocessing";
import countries from "../../data/globe.json";

extend({ ThreeGlobe: ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const ASPECT = 0.9;
const CAMERA_Z = 300;
const RING_UPDATE_INTERVAL = 2000;

let numbersOfRings = [0];

export function Globe({ globeConfig, data }) {
  const globeRef = useRef(null);
  const groupRef = useRef();
  const pointsGroupRef = useRef();
  const intervalRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });

  // Memoized default props to prevent unnecessary re-renders
  const defaultProps = useMemo(() => ({
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
    rings: 1,
    maxRings: 3,
    globeOpacity: globeConfig.globeOpacity || 0.4, // More visible glass
    chinaHexPolygonColor: globeConfig.chinaHexPolygonColor || "#ff0000",
    targetingCountriesColor: globeConfig.targetingCountriesColor || "#00ff88",
    ...globeConfig,
  }), [globeConfig]);

  // Create metallic point materials
  const createMetallicPointMaterial = useCallback((color, opacity = 1) => {
    const metallicIntensity = defaultProps.metallicIntensity || 0.9;
    const glowIntensity = defaultProps.glowIntensity || 0.8;
    const material = new MeshPhysicalMaterial({
      color: new Color(color),
      metalness: metallicIntensity,
      roughness: 0.05, // Even smoother for more shine
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      emissive: new Color(color),
      emissiveIntensity: 0.4 + (glowIntensity * 0.3), // Enhanced emissive based on glow intensity
      transparent: true,
      opacity: opacity,
      envMapIntensity: 1.5, // Higher environment map intensity
      reflectivity: 1.0,
    });
    return material;
  }, [defaultProps.metallicIntensity, defaultProps.glowIntensity]);

  // Create glow material for outer shell
  const createGlowMaterial = useCallback((color, opacity = 0.3) => {
    const glowIntensity = defaultProps.glowIntensity || 0.8;
    const material = new MeshStandardMaterial({
      color: new Color(color),
      emissive: new Color(color),
      emissiveIntensity: glowIntensity * 1.5, // Enhanced glow
      transparent: true,
      opacity: opacity,
      side: 2, // DoubleSide
      blending: 1, // AdditiveBlending for stronger glow
    });
    return material;
  }, [defaultProps.glowIntensity]);

  // Initialize globe only once with improved error handling
  useEffect(() => {
    if (!globeRef.current && groupRef.current) {
      try {
        globeRef.current = new ThreeGlobe();
        groupRef.current.add(globeRef.current);
        
        // Create points group for custom metallic points
        if (!pointsGroupRef.current) {
          pointsGroupRef.current = new Group();
          groupRef.current.add(pointsGroupRef.current);
        }
        
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
        // Glass-like material properties
        globeMaterial.color = new Color("#e8f4fd"); // Light blue tint for glass
        globeMaterial.emissive = new Color("#4a90e2"); // Subtle blue emission for visibility
        globeMaterial.emissiveIntensity = 0.1; // Very subtle glow
        globeMaterial.shininess = 100; // High shininess for glass
        globeMaterial.transparent = true;
        globeMaterial.opacity = 0.4; // More visible but still glass-like
        globeMaterial.reflectivity = 0.8; // High reflectivity
        globeMaterial.refractionRatio = 0.98; // Glass-like refraction
        globeMaterial.metalness = 0.0; // Non-metallic
        globeMaterial.roughness = 0.05; // Slightly rough for more visible surface
        globeMaterial.clearcoat = 1.0; // Full clearcoat for glass effect
        globeMaterial.clearcoatRoughness = 0.1; // Slightly rough clearcoat
        globeMaterial.envMapIntensity = 1.5; // Strong environment reflections
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
      if (!arc || typeof arc.startLat !== 'number' || typeof arc.startLng !== 'number') continue;
      
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
    return points.filter((point, index, array) =>
      array.findIndex(p => p.lat === point.lat && p.lng === point.lng) === index
    );
  }, [data, defaultProps.pointSize, defaultProps.pointOpacity]);

  // Create custom metallic points


  // Enhanced hex polygon color function with 3 color scheme
  const getHexPolygonColor = useCallback((d) => {
    const admin = d?.properties?.admin;
    
    // China gets its own color
    if (admin === "China") {
      return defaultProps.chinaHexPolygonColor;
    }
    
    // The 6 specified countries get a different color
    const specifiedCountries = ["United States of America", "Canada", "Cambodia", "Japan", "Australia", "New Zealand"];
    if (specifiedCountries.includes(admin)) {
      return defaultProps.targetingCountriesColor; // Configurable color for the 6 countries
    }
    
    // All other countries get the default color
    return defaultProps.hexPolygonColor;
  }, [defaultProps.chinaHexPolygonColor, defaultProps.hexPolygonColor, defaultProps.targetingCountriesColor]);

  // Enhanced arc stroke function with more variation
  const getArcStroke = useCallback(() => {
    const variations = [0.32, 0.28, 0.3, 0.35, 0.25];
    return variations[Math.floor(Math.random() * variations.length)];
  }, []);

  // Build data when globe is initialized or when data changes
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data || !Array.isArray(data)) return;

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
          const startCoords = globeRef.current.getCoords(d.startLat, d.startLng, 0.1);
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
          
          // Create tube geometry for thicker, more visible arcs
          const tubeGeometry = new TubeGeometry(curve, 64, 1.2, 8, false);
          
          // Create glassy, glowy, metallic material with enhanced properties
          const arcMaterial = new MeshPhysicalMaterial({
            color: new Color(d?.color || "#ffffff"),
            metalness: 0.9, // Very high metallic property for mirror-like shine
            roughness: 0.05, // Ultra-low roughness for perfect reflection
            clearcoat: 1.0, // Full clearcoat for glass effect
            clearcoatRoughness: 0.02, // Extremely smooth clearcoat
            transmission: 0.4, // Enhanced glass-like transmission
            transparent: true,
            opacity: 0, // Slightly more opaque for better visibility
            emissive: new Color(d?.color || "#ffffff"),
            emissiveIntensity: 0.8, // Stronger glow for better visibility
            envMapIntensity: 3.0, // Very strong environment reflections
            reflectivity: 1.0,
            refractionRatio: 0.92, // Adjusted for better glass effect
            // Enhanced iridescence for premium metallic shine
            iridescence: 1.0,
            iridescenceIOR: 1.5, // Stronger iridescence
            iridescenceThicknessRange: [50, 1000], // Wider range for more color variation
            // Enhanced subsurface scattering for premium glass effect
            thickness: 0.8, // Thicker for more pronounced glass effect
            attenuationDistance: 0.3, // Shorter distance for more intense effect
            attenuationColor: new Color(d?.color || "#ffffff"),
            // Additional properties for premium appearance
            sheenColor: new Color(d?.color || "#ffffff"),
            sheen: 0.8, // Add sheen for fabric-like metallic reflection
            sheenRoughness: 0.1,
            specularIntensity: 1.0, // Maximum specular intensity
            specularColor: new Color("#ffffff"), // White specular highlights
          });
          
          const arcMesh = new Mesh(tubeGeometry, arcMaterial);
          
          // Add outer glow shell for enhanced glow effect
          const glowGeometry = new TubeGeometry(curve, 32, 3.0, 6, false);
          const glowMaterial = new MeshStandardMaterial({
            color: new Color(d?.color || "#ffffff"),
            emissive: new Color(d?.color || "#ffffff"),
            emissiveIntensity: 1.2, // Stronger glow intensity
            transparent: true,
            opacity: 0.4, // Slightly more visible glow
            side: DoubleSide,
            blending: AdditiveBlending,
            depthWrite: false, // Prevent depth conflicts
            depthTest: true,
          });
          
          // Add additional inner glow for layered effect
          const innerGlowGeometry = new TubeGeometry(curve, 48, 1.8, 8, false);
          const innerGlowMaterial = new MeshStandardMaterial({
            color: new Color(d?.color || "#ffffff"),
            emissive: new Color(d?.color || "#ffffff"),
            emissiveIntensity: 0.6,
            transparent: true,
            opacity: 0.6,
            side: DoubleSide,
            blending: AdditiveBlending,
            depthWrite: false,
          });
          
          const glowMesh = new Mesh(glowGeometry, glowMaterial);
          const innerGlowMesh = new Mesh(innerGlowGeometry, innerGlowMaterial);
          
          // Create a group to contain the main arc and all glow layers
          const arcGroup = new Group();
          arcGroup.add(arcMesh); // Main metallic arc
          arcGroup.add(innerGlowMesh); // Inner glow layer
          arcGroup.add(glowMesh); // Outer glow layer
          
          return arcGroup;
        });

      // Disable default points since we're using custom metallic ones
      globeRef.current
        .pointsData([])
        .pointColor((e) => e?.color || "#ffffff")
        .pointOpacity((e) => e?.opacity || 1)
        .pointsMerge(true)
        .pointAltitude(0.0)
        .pointRadius(defaultProps.particlesSize);

      // Enhanced rings setup
      globeRef.current
        .ringsData([])
        .ringColor(() => defaultProps.polygonColor)
        .ringMaxRadius(defaultProps.maxRings)
        .ringPropagationSpeed(RING_PROPAGATION_SPEED)
        .ringRepeatPeriod((defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings);

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
  ]);

  // Create metallic points when data changes


  // Enhanced rings animation with better cleanup and error handling
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data || !Array.isArray(data)) return;

    const updateRings = () => {
      try {
        if (!globeRef.current || !data.length) return;

        const ringCount = Math.floor((data.length * 4) / 5);
        const newNumbersOfRings = genRandomNumbers(0, data.length, Math.min(ringCount, data.length));

        const ringsData = data
          .filter((d, i) => newNumbersOfRings.includes(i) && d?.startLat != null && d?.startLng != null)
          .map((d) => ({
            lat: d.startLat,
            lng: d.startLng,
            color: d.color || "#ffffff",
          }));

        globeRef.current.ringsData(ringsData);
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
  }, [isInitialized, data]);



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
      gl.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio for performance
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
    const cam = new PerspectiveCamera(55, ASPECT, 180, 1800);
    cam.position.set(195.5409332958142, 50.14669365055826, -138.9637081132115);
    return cam;
  }, []);

  // Memoized light positions for consistency
  const lightPositions = useMemo(() => ({
    directionalLeft: new Vector3(-400, 100, 400),
    directionalRight: new Vector3(400, -100, -400),
    directionalTop: new Vector3(-200, 500, 200),
    pointMain: new Vector3(-200, 500, 200),
    pointAccent1: new Vector3(400, -200, 300),
    pointAccent2: new Vector3(-300, 300, -400),
  }), []);

  return (
    <Canvas scene={scene} camera={camera}>
      <WebGLRendererConfig />
      
      {/* Enhanced lighting setup for metallic and glassy arcs */}
      <ambientLight 
        color={globeConfig.ambientLight || "#ffffff"} 
        intensity={0.8} // Increased for better metallic visibility
      />
      
      {/* Main key light for metallic reflections */}
      <directionalLight
        color={globeConfig.directionalLeftLight || "#ffffff"}
        position={lightPositions.directionalLeft}
        intensity={4.5} // Increased for stronger metallic reflections
        castShadow
        shadow-mapSize-width={4096} // Higher resolution shadows for metallic arcs
        shadow-mapSize-height={4096}
        shadow-camera-far={2000}
        shadow-camera-left={-500}
        shadow-camera-right={500}
        shadow-camera-top={500}
        shadow-camera-bottom={-500}
        shadow-bias={-0.0001}
      />
      
      {/* Fill light for softer metallic highlights */}
      <directionalLight
        color={globeConfig.directionalLeftLight || "#ffffff"}
        position={lightPositions.directionalRight}
        intensity={3.5} // Increased for better metallic illumination
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      {/* Rim light for metallic edge definition */}
      <directionalLight
        color={globeConfig.directionalTopLight || "#ffffff"}
        position={lightPositions.directionalTop}
        intensity={2.8} // Increased for metallic highlights
      />
      
      {/* Additional directional light for glass refraction and metallic shine */}
      <directionalLight
        color="#ffffff"
        position={[0, 0, 400]}
        intensity={2.5} // Increased for stronger glass effects
      />
      
      {/* Backlight for rim lighting on metallic arcs */}
      <directionalLight
        color="#ffffff"
        position={[0, 0, -400]}
        intensity={1.8}
      />
      
      {/* Main point light for metallic highlights */}
      <pointLight
        color={globeConfig.pointLight || "#ffffff"}
        position={lightPositions.pointMain}
        intensity={3.5} // Increased for stronger metallic highlights
        distance={1500}
        decay={0.03}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      {/* Accent lights for metallic color variation */}
      <pointLight
        color="#ff6b35"
        position={lightPositions.pointAccent1}
        intensity={2.0} // Increased for better metallic interaction
        distance={1200}
        decay={0.08}
      />
      
      <pointLight
        color="#4ecdc4"
        position={lightPositions.pointAccent2}
        intensity={1.8} // Increased for better metallic interaction
        distance={1000}
        decay={0.12}
      />

      {/* Additional rim lights for HDR metallic effect */}
      <pointLight
        color="#f7b731"
        position={[300, 200, -300]}
        intensity={1.5} // Increased for metallic shine
        distance={800}
        decay={0.15}
      />
      
      <pointLight
        color="#a55eea"
        position={[-300, -200, 300]}
        intensity={1.2} // Increased for metallic shine
        distance={700}
        decay={0.18}
      />
      
      {/* Additional lights specifically for arc enhancement */}
      <pointLight
        color="#ffffff"
        position={[0, 400, 0]}
        intensity={2.5}
        distance={1000}
        decay={0.1}
      />
      
      <pointLight
        color="#ffffff"
        position={[0, -400, 0]}
        intensity={2.0}
        distance={1000}
        decay={0.1}
      />
      
      {/* Colored accent lights for iridescent metallic effects */}
      <pointLight
        color="#ff0080"
        position={[400, 0, 400]}
        intensity={1.0}
        distance={600}
        decay={0.2}
      />
      
      <pointLight
        color="#00ff88"
        position={[-400, 0, 400]}
        intensity={1.0}
        distance={600}
        decay={0.2}
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
      
      {/* Post-processing effects temporarily disabled due to version compatibility issues */}
      {/* 
      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          height={300}
          opacity={1.0}
          blendFunction={BlendFunction.SCREEN}
        />
        
        <ChromaticAberration
          offset={[0.002, 0.002]}
          radialModulation={true}
          modulationOffset={0.3}
        />
        
        <Vignette
          offset={0.3}
          darkness={0.5}
          eskil={false}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
      */}
    </Canvas>
  );
}

// Enhanced utility functions with better error handling
export function hexToRgb(hex) {
  if (!hex || typeof hex !== 'string') return null;
  
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
  if (min >= max || count <= 0 || count > (max - min)) {
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