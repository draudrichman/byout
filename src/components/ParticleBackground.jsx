import { useEffect, useRef, forwardRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { createNoise3D, createNoise4D } from "simplex-noise";

// ─── Config ──────────────────────────────────────────────────────────────────

const CONFIG = {
  particleCount: 10000,
  shapeSize: 12,
  swarmDistanceFactor: 1.4,
  swirlFactor: 3.5,
  noiseFrequency: 0.08,
  noiseTimeScale: 0.03,
  noiseMaxStrength: 2.5,
  colorScheme: "fire",
  morphDuration: 3500,
  particleSizeRange: [0.06, 0.2],
  starCount: 12000,
  bloomStrength: 1.2,
  bloomRadius: 0.4,
  bloomThreshold: 0.1,
  idleFlowStrength: 0.2,
  idleFlowSpeed: 0.06,
  idleRotationSpeed: 0.015,
  morphSizeFactor: 0.4,
  morphBrightnessFactor: 0.5,
};

const COLOR_SCHEMES = {
  fire: { startHue: 0, endHue: 50, saturation: 0.9, lightness: 0.65 },
  neon: { startHue: 290, endHue: 190, saturation: 1.0, lightness: 0.7 },
  nature: { startHue: 85, endHue: 165, saturation: 0.8, lightness: 0.6 },
  rainbow: { startHue: 0, endHue: 360, saturation: 0.85, lightness: 0.65 },
};

// ─── Shape generators ────────────────────────────────────────────────────────

function generateDNAHelix(count, size) {
  const points = new Float32Array(count * 3);
  const radius = size * 0.4;
  const height = size * 1.2;
  const turns = 2;
  const helixRadius = size * 0.15;
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2 * turns;
    const y = (i / count - 0.5) * height;
    const strand = Math.floor(Math.random() * 2);
    const phase = strand * Math.PI;
    points[i * 3] = Math.cos(t + phase) * radius;
    points[i * 3 + 1] = y;
    points[i * 3 + 2] = Math.sin(t + phase) * radius;
    if (Math.random() < 0.2) {
      const cp = Math.random() * Math.PI * 2;
      points[i * 3] += Math.cos(cp) * helixRadius;
      points[i * 3 + 2] += Math.sin(cp) * helixRadius;
    }
  }
  return points;
}

function generateTorus(count, size) {
  const points = new Float32Array(count * 3);
  const R = size * 0.7,
    r = size * 0.3;
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI * 2;
    points[i * 3] = (R + r * Math.cos(phi)) * Math.cos(theta);
    points[i * 3 + 1] = r * Math.sin(phi);
    points[i * 3 + 2] = (R + r * Math.cos(phi)) * Math.sin(theta);
  }
  return points;
}

function generateHeart(count, size) {
  const points = new Float32Array(count * 3);
  const scale = size * 0.8;
  for (let i = 0; i < count; i++) {
    const t = Math.random() * Math.PI * 2;
    const r = Math.random();
    const x = r * 16 * Math.pow(Math.sin(t), 3);
    const y =
      r *
      (13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t));
    const z = (Math.random() - 0.5) * size * 0.3;
    points[i * 3] = x * scale * 0.05;
    points[i * 3 + 1] = y * scale * 0.05;
    points[i * 3 + 2] = z;
  }
  return points;
}

function generateInfinity(count, size) {
  const points = new Float32Array(count * 3);
  const scale = size * 0.5;
  for (let i = 0; i < count; i++) {
    const t = Math.random() * Math.PI * 2;
    const thickness = (Math.random() - 0.5) * size * 0.1;
    const denom = 1 + Math.sin(t) * Math.sin(t);
    points[i * 3] = (scale * Math.cos(t)) / denom;
    points[i * 3 + 1] = thickness;
    points[i * 3 + 2] = (scale * Math.sin(t) * Math.cos(t)) / denom;
  }
  return points;
}

function generateSpiral(count, size) {
  const points = new Float32Array(count * 3);
  const turns = 5;
  const heightScale = size * 0.3;
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2 * turns;
    const r = (t / (Math.PI * 2 * turns)) * size;
    const thickness = Math.random() * size * 0.1;
    const angle = t + Math.random() * 0.2;
    points[i * 3] = r * Math.cos(angle) + (Math.random() - 0.5) * thickness;
    points[i * 3 + 1] = (i / count - 0.5) * heightScale;
    points[i * 3 + 2] = r * Math.sin(angle) + (Math.random() - 0.5) * thickness;
  }
  return points;
}

function generateCrystal(count, size) {
  const points = new Float32Array(count * 3);
  const hexRadius = size * 0.6;
  const height = size * 1.2;
  const layers = 6;
  for (let i = 0; i < count; i++) {
    const layer = Math.floor(Math.random() * layers);
    const layerHeight = (layer / (layers - 1) - 0.5) * height;
    const layerFactor =
      1 - Math.pow(2 * Math.abs(layer / (layers - 1) - 0.5), 2);
    const currentRadius = hexRadius * layerFactor;
    let angle;
    if (Math.random() < 0.5) {
      angle =
        (Math.floor(Math.random() * 6) * Math.PI) / 3 +
        (Math.random() - 0.5) * 0.2;
    } else {
      angle =
        (Math.floor(Math.random() * 6) * Math.PI) / 3 +
        Math.PI / 6 +
        (Math.random() - 0.5) * 0.2;
    }
    const radiusNoise = (Math.random() - 0.5) * size * 0.1;
    const finalRadius = currentRadius + radiusNoise;
    points[i * 3] = Math.cos(angle) * finalRadius;
    points[i * 3 + 1] = layerHeight + (Math.random() - 0.5) * size * 0.05;
    points[i * 3 + 2] = Math.sin(angle) * finalRadius;
    if (Math.random() < 0.2) {
      const innerRadius = finalRadius * Math.random() * 0.8;
      points[i * 3] = Math.cos(angle) * innerRadius;
      points[i * 3 + 2] = Math.sin(angle) * innerRadius;
    }
  }
  return points;
}

const SHAPES = [
  { name: "DNA Helix", generator: generateDNAHelix },
  { name: "Torus", generator: generateTorus },
  { name: "Heart", generator: generateHeart },
  { name: "Infinity", generator: generateInfinity },
  { name: "Spiral", generator: generateSpiral },
  { name: "Crystal", generator: generateCrystal },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function createStarTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  const g = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(255,255,255,0.7)");
  g.addColorStop(0.6, "rgba(255,255,255,0.2)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

// Simple cubic-bezier easing (replaces animejs)
// cubicBezier(0.33, 0, 0.66, 1) approximated via a lookup table approach
function cubicBezierEase(t) {
  // Approximate cubicBezier(0.33, 0, 0.66, 1) — smooth ease-in-out
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * ParticleBackground
 *
 * Props:
 *  - className  {string}  – extra CSS class(es) for the wrapper div
 *  - style      {object}  – extra inline styles for the wrapper div
 *  - showUI     {boolean} – show the shape label + controls panel (default: true)
 */
const ParticleBackground = forwardRef(function ParticleBackground(
  { className = "", style = {}, showUI = true },
  ref,
) {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const stateRef = useRef(null); // holds all mutable Three.js state

  // ── info label text (controlled via ref to avoid re-renders) ──────────────
  const infoRef = useRef(null);
  const colorSchemeRef = useRef(CONFIG.colorScheme);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    // ── Per-frame reusable vectors ──────────────────────────────────────────
    const tempVec = new THREE.Vector3();
    const sourceVec = new THREE.Vector3();
    const targetVec = new THREE.Vector3();
    const swarmVec = new THREE.Vector3();
    const noiseOffset = new THREE.Vector3();
    const flowVec = new THREE.Vector3();
    const bezPos = new THREE.Vector3();
    const swirlAxis = new THREE.Vector3();
    const currentVec = new THREE.Vector3();

    // ── Scene setup ─────────────────────────────────────────────────────────
    const noise3D = createNoise3D(() => Math.random());
    const noise4D = createNoise4D(() => Math.random());

    const clock = new THREE.Clock();
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000308, 0.025);

    const camera = new THREE.PerspectiveCamera(
      75,
      wrapper.clientWidth / wrapper.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 6, 25);
    camera.lookAt(scene.position);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 4;
    controls.maxDistance = 70;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.4;

    scene.add(new THREE.AmbientLight(0x505070));
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.7);
    dirLight1.position.set(10, 15, 10);
    scene.add(dirLight1);
    const dirLight2 = new THREE.DirectionalLight(0x99bbff, 1.0);
    dirLight2.position.set(-10, -8, -10);
    scene.add(dirLight2);

    // ── Post-processing ─────────────────────────────────────────────────────
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(wrapper.clientWidth, wrapper.clientHeight),
      CONFIG.bloomStrength,
      CONFIG.bloomRadius,
      CONFIG.bloomThreshold,
    );
    composer.addPass(bloomPass);

    // ── Starfield ───────────────────────────────────────────────────────────
    const starGeometry = new THREE.BufferGeometry();
    const starVertices = new Float32Array(CONFIG.starCount * 3);
    const starSizes = new Float32Array(CONFIG.starCount);
    const starColors = new Float32Array(CONFIG.starCount * 3);
    for (let i = 0; i < CONFIG.starCount; i++) {
      tempVec.set(
        THREE.MathUtils.randFloatSpread(500),
        THREE.MathUtils.randFloatSpread(500),
        THREE.MathUtils.randFloatSpread(500),
      );
      if (tempVec.length() < 120) tempVec.setLength(120 + Math.random() * 250);
      starVertices[i * 3] = tempVec.x;
      starVertices[i * 3 + 1] = tempVec.y;
      starVertices[i * 3 + 2] = tempVec.z;
      starSizes[i] = Math.random() * 0.12 + 0.04;
      const color = new THREE.Color();
      color.setHSL(
        Math.random() < 0.15 ? Math.random() : 0.65,
        0.6,
        0.75 + Math.random() * 0.25,
      );
      starColors[i * 3] = color.r;
      starColors[i * 3 + 1] = color.g;
      starColors[i * 3 + 2] = color.b;
    }
    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starVertices, 3),
    );
    starGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(starColors, 3),
    );
    starGeometry.setAttribute(
      "size",
      new THREE.Float32BufferAttribute(starSizes, 1),
    );
    const starMaterial = new THREE.ShaderMaterial({
      uniforms: { pointTexture: { value: createStarTexture() } },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (450.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }`,
      fragmentShader: `
        uniform sampler2D pointTexture;
        varying vec3 vColor;
        void main() {
          float alpha = texture2D(pointTexture, gl_PointCoord).a;
          if (alpha < 0.1) discard;
          gl_FragColor = vec4(vColor, alpha * 0.85);
        }`,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      vertexColors: true,
    });
    scene.add(new THREE.Points(starGeometry, starMaterial));

    // ── Particle system ─────────────────────────────────────────────────────
    const targetPositions = SHAPES.map((s) =>
      s.generator(CONFIG.particleCount, CONFIG.shapeSize),
    );
    const particlesGeometry = new THREE.BufferGeometry();
    const currentPositions = new Float32Array(targetPositions[0]);
    const sourcePositions = new Float32Array(targetPositions[0]);
    const swarmPositions = new Float32Array(CONFIG.particleCount * 3);
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(currentPositions, 3),
    );

    const particleSizes = new Float32Array(CONFIG.particleCount);
    const particleOpacities = new Float32Array(CONFIG.particleCount);
    const particleEffectStrengths = new Float32Array(CONFIG.particleCount);
    for (let i = 0; i < CONFIG.particleCount; i++) {
      particleSizes[i] = THREE.MathUtils.randFloat(
        CONFIG.particleSizeRange[0],
        CONFIG.particleSizeRange[1],
      );
      particleOpacities[i] = 0.9;
      particleEffectStrengths[i] = 0.0;
    }
    particlesGeometry.setAttribute(
      "size",
      new THREE.BufferAttribute(particleSizes, 1),
    );
    particlesGeometry.setAttribute(
      "opacity",
      new THREE.BufferAttribute(particleOpacities, 1),
    );
    particlesGeometry.setAttribute(
      "aEffectStrength",
      new THREE.BufferAttribute(particleEffectStrengths, 1),
    );

    // ── Color helpers ───────────────────────────────────────────────────────
    function updateColorArray(colors, positionsArray) {
      const colorScheme = COLOR_SCHEMES[colorSchemeRef.current];
      const center = new THREE.Vector3(0, 0, 0);
      const maxRadius = CONFIG.shapeSize * 1.2;
      for (let i = 0; i < CONFIG.particleCount; i++) {
        const i3 = i * 3;
        tempVec.fromArray(positionsArray, i3);
        const dist = tempVec.distanceTo(center);
        let hue =
          colorSchemeRef.current === "rainbow"
            ? (((tempVec.x / maxRadius + 1) / 2) * 120 +
                ((tempVec.y / maxRadius + 1) / 2) * 120 +
                ((tempVec.z / maxRadius + 1) / 2) * 120) %
              360
            : THREE.MathUtils.mapLinear(
                dist,
                0,
                maxRadius,
                colorScheme.startHue,
                colorScheme.endHue,
              );
        const noiseValue =
          (noise3D(tempVec.x * 0.15, tempVec.y * 0.15, tempVec.z * 0.15) + 1) *
          0.5;
        const saturation = THREE.MathUtils.clamp(
          colorScheme.saturation * (0.85 + noiseValue * 0.25),
          0,
          1,
        );
        const lightness = THREE.MathUtils.clamp(
          colorScheme.lightness * (0.9 + noiseValue * 0.2),
          0.1,
          0.9,
        );
        new THREE.Color()
          .setHSL(hue / 360, saturation, lightness)
          .toArray(colors, i3);
      }
    }

    const colors = new Float32Array(CONFIG.particleCount * 3);
    updateColorArray(colors, currentPositions);
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3),
    );

    const particlesMaterial = new THREE.ShaderMaterial({
      uniforms: { pointTexture: { value: createStarTexture() } },
      vertexShader: `
        attribute float size;
        attribute float opacity;
        attribute float aEffectStrength;
        varying vec3 vColor;
        varying float vOpacity;
        varying float vEffectStrength;
        void main() {
          vColor = color;
          vOpacity = opacity;
          vEffectStrength = aEffectStrength;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          float sizeScale = 1.0 - vEffectStrength * ${CONFIG.morphSizeFactor.toFixed(2)};
          gl_PointSize = size * sizeScale * (450.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }`,
      fragmentShader: `
        uniform sampler2D pointTexture;
        varying vec3 vColor;
        varying float vOpacity;
        varying float vEffectStrength;
        void main() {
          float alpha = texture2D(pointTexture, gl_PointCoord).a;
          if (alpha < 0.05) discard;
          vec3 finalColor = vColor * (1.0 + vEffectStrength * ${CONFIG.morphBrightnessFactor.toFixed(2)});
          gl_FragColor = vec4(finalColor, alpha * vOpacity);
        }`,
      blending: THREE.AdditiveBlending,
      depthTest: true,
      depthWrite: false,
      transparent: true,
      vertexColors: true,
    });

    const particleSystem = new THREE.Points(
      particlesGeometry,
      particlesMaterial,
    );
    scene.add(particleSystem);

    // ── Morph state ─────────────────────────────────────────────────────────
    let currentShapeIndex = 0;
    let isMorphing = false;
    let morphStartTime = 0;
    let morphRafId = null;

    function updateColors() {
      const c = particlesGeometry.attributes.color.array;
      updateColorArray(c, particlesGeometry.attributes.position.array);
      particlesGeometry.attributes.color.needsUpdate = true;
    }

    function setInfoText(text, glow = "0 0 6px rgba(0, 128, 255, 0.9)") {
      if (infoRef.current) {
        infoRef.current.textContent = text;
        infoRef.current.style.textShadow = glow;
      }
    }

    function triggerMorph() {
      if (isMorphing) return;
      isMorphing = true;
      controls.autoRotate = false;
      setInfoText("Morphing...", "0 0 8px rgba(255, 150, 50, 0.9)");

      sourcePositions.set(currentPositions);
      const nextShapeIndex = (currentShapeIndex + 1) % SHAPES.length;
      const nextTargetPositions = targetPositions[nextShapeIndex];
      const centerOffsetAmount = CONFIG.shapeSize * CONFIG.swarmDistanceFactor;

      for (let i = 0; i < CONFIG.particleCount; i++) {
        const i3 = i * 3;
        sourceVec.fromArray(sourcePositions, i3);
        targetVec.fromArray(nextTargetPositions, i3);
        swarmVec.lerpVectors(sourceVec, targetVec, 0.5);
        const offsetDir = tempVec
          .set(
            noise3D(i * 0.04, 10, 10),
            noise3D(20, i * 0.04, 20),
            noise3D(30, 30, i * 0.04),
          )
          .normalize();
        const distFactor =
          sourceVec.distanceTo(targetVec) * 0.08 + centerOffsetAmount;
        swarmVec.addScaledVector(
          offsetDir,
          distFactor * (0.6 + Math.random() * 0.7),
        );
        swarmPositions[i3] = swarmVec.x;
        swarmPositions[i3 + 1] = swarmVec.y;
        swarmPositions[i3 + 2] = swarmVec.z;
      }

      currentShapeIndex = nextShapeIndex;
      morphStartTime = performance.now();

      // Cancel any previous morph tween
      if (morphRafId !== null) cancelAnimationFrame(morphRafId);

      function morphTick() {
        const elapsed = performance.now() - morphStartTime;
        const rawT = Math.min(elapsed / CONFIG.morphDuration, 1);
        stateRef.current.morphProgress = cubicBezierEase(rawT);
        if (rawT < 1) {
          morphRafId = requestAnimationFrame(morphTick);
        } else {
          // Morph complete
          setInfoText(
            `Shape: ${SHAPES[currentShapeIndex].name} (Click to morph)`,
          );
          currentPositions.set(targetPositions[currentShapeIndex]);
          particlesGeometry.attributes.position.needsUpdate = true;
          particleEffectStrengths.fill(0.0);
          particlesGeometry.attributes.aEffectStrength.needsUpdate = true;
          sourcePositions.set(targetPositions[currentShapeIndex]);
          updateColors();
          isMorphing = false;
          controls.autoRotate = true;
          morphRafId = null;
        }
      }
      morphRafId = requestAnimationFrame(morphTick);
    }

    // ── Store mutable state in ref so animate loop can read it ──────────────
    stateRef.current = {
      morphProgress: 0,
      isMorphingRef: () => isMorphing,
      currentShapeIndexRef: () => currentShapeIndex,
    };

    // ── Expose triggerMorph to parent via ref ────────────────────────────────
    if (ref) {
      ref.current = { triggerMorph };
    }

    // ── Animation loop ───────────────────────────────────────────────────────
    let animFrameId;

    function updateMorphAnimation(
      positions,
      effectStrengths,
      elapsedTime,
      deltaTime,
    ) {
      const t = stateRef.current.morphProgress;
      const targets = targetPositions[currentShapeIndex];
      const effectStrength = Math.sin(t * Math.PI);
      const currentSwirl = effectStrength * CONFIG.swirlFactor * deltaTime * 40;
      const currentNoise = effectStrength * CONFIG.noiseMaxStrength;

      for (let i = 0; i < CONFIG.particleCount; i++) {
        const i3 = i * 3;
        sourceVec.fromArray(sourcePositions, i3);
        swarmVec.fromArray(swarmPositions, i3);
        targetVec.fromArray(targets, i3);

        const t_inv = 1.0 - t;
        bezPos.copy(sourceVec).multiplyScalar(t_inv * t_inv);
        bezPos.addScaledVector(swarmVec, 2.0 * t_inv * t);
        bezPos.addScaledVector(targetVec, t * t);

        if (currentSwirl > 0.01) {
          tempVec.subVectors(bezPos, sourceVec);
          swirlAxis
            .set(
              noise3D(i * 0.015, elapsedTime * 0.08, 0),
              noise3D(0, i * 0.015, elapsedTime * 0.08 + 4),
              noise3D(elapsedTime * 0.08 + 8, 0, i * 0.015),
            )
            .normalize();
          tempVec.applyAxisAngle(
            swirlAxis,
            currentSwirl * (0.6 + Math.random() * 0.4),
          );
          bezPos.copy(sourceVec).add(tempVec);
        }

        if (currentNoise > 0.01) {
          const noiseTime = elapsedTime * CONFIG.noiseTimeScale;
          noiseOffset.set(
            noise4D(
              bezPos.x * CONFIG.noiseFrequency,
              bezPos.y * CONFIG.noiseFrequency,
              bezPos.z * CONFIG.noiseFrequency,
              noiseTime,
            ),
            noise4D(
              bezPos.x * CONFIG.noiseFrequency + 100,
              bezPos.y * CONFIG.noiseFrequency + 100,
              bezPos.z * CONFIG.noiseFrequency + 100,
              noiseTime,
            ),
            noise4D(
              bezPos.x * CONFIG.noiseFrequency + 200,
              bezPos.y * CONFIG.noiseFrequency + 200,
              bezPos.z * CONFIG.noiseFrequency + 200,
              noiseTime,
            ),
          );
          bezPos.addScaledVector(noiseOffset, currentNoise);
        }

        positions[i3] = bezPos.x;
        positions[i3 + 1] = bezPos.y;
        positions[i3 + 2] = bezPos.z;
        effectStrengths[i] = effectStrength;
      }
      particlesGeometry.attributes.aEffectStrength.needsUpdate = true;
    }

    function updateIdleAnimation(positions, effectStrengths, elapsedTime) {
      const breathScale = 1.0 + Math.sin(elapsedTime * 0.4) * 0.01;
      const timeScaled = elapsedTime * CONFIG.idleFlowSpeed;
      const freq = 0.08;
      let needsReset = false;

      for (let i = 0; i < CONFIG.particleCount; i++) {
        const i3 = i * 3;
        sourceVec.fromArray(sourcePositions, i3);
        tempVec.copy(sourceVec).multiplyScalar(breathScale);
        flowVec.set(
          noise4D(
            tempVec.x * freq,
            tempVec.y * freq,
            tempVec.z * freq,
            timeScaled,
          ),
          noise4D(
            tempVec.x * freq + 10,
            tempVec.y * freq + 10,
            tempVec.z * freq + 10,
            timeScaled,
          ),
          noise4D(
            tempVec.x * freq + 20,
            tempVec.y * freq + 20,
            tempVec.z * freq + 20,
            timeScaled,
          ),
        );
        tempVec.addScaledVector(flowVec, CONFIG.idleFlowStrength);
        currentVec.fromArray(positions, i3);
        currentVec.lerp(tempVec, 0.06);
        positions[i3] = currentVec.x;
        positions[i3 + 1] = currentVec.y;
        positions[i3 + 2] = currentVec.z;
        if (effectStrengths[i] !== 0.0) {
          effectStrengths[i] = 0.0;
          needsReset = true;
        }
      }
      if (needsReset)
        particlesGeometry.attributes.aEffectStrength.needsUpdate = true;
    }

    function animate() {
      animFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const deltaTime = clock.getDelta();
      controls.update();
      const positions = particlesGeometry.attributes.position.array;
      const effectStrengths =
        particlesGeometry.attributes.aEffectStrength.array;

      if (isMorphing) {
        updateMorphAnimation(
          positions,
          effectStrengths,
          elapsedTime,
          deltaTime,
        );
      } else {
        updateIdleAnimation(positions, effectStrengths, elapsedTime);
      }
      particlesGeometry.attributes.position.needsUpdate = true;
      composer.render(deltaTime);
    }

    animate();
    setInfoText(`Shape: ${SHAPES[0].name} (Click to morph)`);

    // ── Event handlers ───────────────────────────────────────────────────────
    function onResize() {
      const w = wrapper.clientWidth;
      const h = wrapper.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    }

    function onCanvasClick(e) {
      if (e.target.closest("[data-controls]")) return;
      triggerMorph();
    }

    window.addEventListener("resize", onResize);
    wrapper.addEventListener("click", onCanvasClick);

    // Expose triggerMorph and updateColors to the DOM element for button wiring
    wrapper._triggerMorph = triggerMorph;
    wrapper._updateColors = updateColors;
    wrapper._colorSchemeRef = colorSchemeRef;

    // Keep the imperative ref in sync after setup
    if (ref) ref.current = { triggerMorph };

    // ── Cleanup ──────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animFrameId);
      if (morphRafId !== null) cancelAnimationFrame(morphRafId);
      window.removeEventListener("resize", onResize);
      wrapper.removeEventListener("click", onCanvasClick);
      controls.dispose();
      renderer.dispose();
      composer.dispose?.();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
    };
  }, []);

  // ── UI handlers (read from wrapper refs) ──────────────────────────────────
  function handleShapeBtn() {
    wrapperRef.current?._triggerMorph?.();
  }

  function handleColorClick(scheme) {
    colorSchemeRef.current = scheme;
    wrapperRef.current?._updateColors?.();
  }

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "#000",
        overflow: "hidden",
        fontFamily: "'Space Mono', monospace",
        color: "white",
        ...style,
      }}
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />

      {/* UI overlay */}
      {showUI && (
        <>
          {/* Shape label */}
          <div
            style={{
              position: "absolute",
              top: 15,
              width: "100%",
              textAlign: "center",
              zIndex: 100,
              pointerEvents: "none",
            }}
          >
            <span
              ref={infoRef}
              style={{
                fontSize: 16,
                padding: "10px 20px",
                backgroundColor: "rgba(25, 30, 50, 0.5)",
                borderRadius: 12,
                display: "inline-block",
                textShadow: "0 0 6px rgba(0, 128, 255, 0.9)",
                border: "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(12px)",
                transition: "all 0.3s ease",
              }}
            />
          </div>

          {/* Controls panel */}
          <div
            data-controls
            style={{
              position: "absolute",
              bottom: 25,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 100,
              textAlign: "center",
              pointerEvents: "all",
              backgroundColor: "rgba(25, 30, 50, 0.5)",
              padding: "15px 30px",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.15)",
              backdropFilter: "blur(14px)",
              boxShadow: "0 5px 20px rgba(0,0,0,0.25)",
            }}
          >
            <button
              onClick={handleShapeBtn}
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,100,200,0.8), rgba(0,150,255,0.8))",
                color: "white",
                border: "1px solid rgba(0,180,255,0.7)",
                borderRadius: 8,
                padding: "10px 20px",
                margin: "0 10px",
                cursor: "pointer",
                fontFamily: "'Space Mono', monospace",
                fontSize: 14,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, rgba(0,130,230,0.9), rgba(0,200,255,0.9))";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 4px 10px rgba(0,150,255,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, rgba(0,100,200,0.8), rgba(0,150,255,0.8))";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Change Shape
            </button>

            {/* Color swatches */}
            <div
              style={{
                marginTop: 20,
                display: "flex",
                justifyContent: "center",
                gap: 15,
              }}
            >
              {[
                {
                  scheme: "fire",
                  bg: "linear-gradient(to bottom right, #ff4500, #ffcc00)",
                },
                {
                  scheme: "neon",
                  bg: "linear-gradient(to bottom right, #ff00ff, #00ffff)",
                },
                {
                  scheme: "nature",
                  bg: "linear-gradient(to bottom right, #00ff00, #66ffcc)",
                },
                {
                  scheme: "rainbow",
                  bg: "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)",
                },
              ].map(({ scheme, bg }) => (
                <div
                  key={scheme}
                  onClick={() => handleColorClick(scheme)}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    border: "2px solid rgba(255,255,255,0.25)",
                    cursor: "pointer",
                    background: bg,
                    boxShadow: "inset 0 0 5px rgba(0,0,0,0.5)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.2)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.8)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.25)";
                  }}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
});

export default ParticleBackground;
