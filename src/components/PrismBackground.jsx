"use client";
import React, { useEffect, useRef, useState } from "react";
import { Renderer, Triangle, Program, Mesh } from "ogl";

// FPS Display Component
const FPSDisplay = ({ fps, quality, position = "top-right" }) => {
  const getPositionStyles = () => {
    switch (position) {
      case "top-left":
        return { top: "10px", left: "10px" };
      case "top-right":
        return { top: "10px", right: "10px" };
      case "bottom-left":
        return { bottom: "10px", left: "10px" };
      case "bottom-right":
        return { bottom: "10px", right: "10px" };
      default:
        return { top: "10px", right: "10px" };
    }
  };

  const getColor = () => {
    if (fps > 50) return "#4ade80";
    if (fps > 30) return "#fbbf24";
    return "#ef4444";
  };

  const getQualityColor = () => {
    switch (quality) {
      case "low":
        return "#ef4444";
      case "medium":
        return "#fbbf24";
      case "high":
        return "#4ade80";
      default:
        return "#6b7280";
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        ...getPositionStyles(),
        background: "rgba(0, 0, 0, 0.8)",
        color: "white",
        padding: "8px 12px",
        borderRadius: "6px",
        fontFamily: "monospace",
        fontSize: "14px",
        zIndex: 1000,
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span>
          FPS: <span style={{ color: getColor() }}>{fps}</span>
        </span>
        <span
          style={{
            color: getQualityColor(),
            background: "rgba(255, 255, 255, 0.1)",
            padding: "2px 6px",
            borderRadius: "4px",
            fontSize: "12px",
          }}
        >
          {quality?.toUpperCase()}
        </span>
      </div>
    </div>
  );
};

// Performance Monitor Hook
const usePerformanceMonitor = (enabled = true, onQualityChange = null) => {
  const frameTimes = useRef([]);
  const fpsRef = useRef(0);
  const [displayFPS, setDisplayFPS] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    let lastTime = performance.now();
    let frameCount = 0;
    let lastFpsUpdate = performance.now();

    const updateFPS = (currentTime) => {
      frameCount++;

      if (currentTime - lastFpsUpdate >= 500) {
        const fps = Math.round(
          (frameCount * 1000) / (currentTime - lastFpsUpdate)
        );
        fpsRef.current = fps;
        setDisplayFPS(fps);
        frameCount = 0;
        lastFpsUpdate = currentTime;

        if (fps < 25 && onQualityChange) {
          onQualityChange("low");
        } else if (fps > 45 && onQualityChange) {
          onQualityChange("medium");
        } else if (fps > 55 && onQualityChange) {
          onQualityChange("high");
        }
      }
    };

    const checkPerformance = (currentTime) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      frameTimes.current.push(delta);
      if (frameTimes.current.length > 30) {
        frameTimes.current.shift();
      }

      updateFPS(currentTime);
    };

    let rafId;
    const measureFrame = () => {
      const currentTime = performance.now();
      checkPerformance(currentTime);
      rafId = requestAnimationFrame(measureFrame);
    };

    rafId = requestAnimationFrame(measureFrame);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [enabled, onQualityChange]);

  return displayFPS;
};

const Prism = ({
  height = 2.5,
  baseWidth = 2.5,
  animationType = "rotate",
  glow = 0.6,
  offset = { x: 0, y: 0 },
  noise = 0.1,
  transparent = true,
  scale = 2.8,
  hueShift = 0,
  colorFrequency = 1,
  hoverStrength = 1,
  inertia = 0.05,
  bloom = 0.9,
  suspendWhenOffscreen = true,
  timeScale = 0.5,
  colorScheme = "grey",
  responsive = true,
  mobileScale = 0.85,
  tabletScale = 0.9,
  showFPS = false,
  fpsPosition = "top-right",
}) => {
  const containerRef = useRef(null);
  const [responsiveScale, setResponsiveScale] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  const [quality, setQuality] = useState("high");

  // Use the performance monitor
  const fps = usePerformanceMonitor(showFPS, setQuality);

  // Screen size detection and responsive scaling
  useEffect(() => {
    if (!responsive) return;

    const updateResponsiveScale = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        setResponsiveScale(mobileScale);
      } else if (screenWidth < 1024) {
        setResponsiveScale(tabletScale);
      } else {
        setResponsiveScale(1);
      }
    };

    updateResponsiveScale();
    window.addEventListener("resize", updateResponsiveScale);
    return () => window.removeEventListener("resize", updateResponsiveScale);
  }, [responsive, mobileScale, tabletScale]);

  // Pause rendering when tab is not visible to save resources
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Detect device capability and adjust quality
  useEffect(() => {
    const detectPerformance = () => {
      const isLowPerf =
        navigator.hardwareConcurrency <= 4 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

      setQuality(isLowPerf ? "low" : "high");
    };

    detectPerformance();
  }, []);

  // Use quality settings in your shader
  const getQualitySettings = () => {
    switch (quality) {
      case "low":
        return { steps: 15, dpr: 0.5, timeScale: timeScale * 0.3 };
      case "medium":
        return { steps: 25, dpr: 0.75, timeScale: timeScale * 0.7 };
      case "high":
        return { steps: 35, dpr: 1, timeScale: timeScale };
      default:
        return { steps: 25, dpr: 0.75, timeScale: timeScale * 0.7 };
    }
  };

  // Get fragment shader based on quality
  const getFragmentShader = (quality) => {
    const originalFragmentShader = /* glsl */ `
      precision highp float;

      uniform vec2  iResolution;
      uniform float iTime;

      uniform float uHeight;
      uniform float uBaseHalf;
      uniform mat3  uRot;
      uniform mat4  uRot4D;
      uniform float uW4D;
      uniform int   uUseBaseWobble;
      uniform int   uColorScheme;
      uniform float uGlow;
      uniform vec2  uOffsetPx;
      uniform float uNoise;
      uniform float uSaturation;
      uniform float uScale;
      uniform float uHueShift;
      uniform float uColorFreq;
      uniform float uBloom;
      uniform float uCenterShift;
      uniform float uInvBaseHalf;
      uniform float uInvHeight;
      uniform float uMinAxis;
      uniform float uPxScale;
      uniform float uTimeScale;
      uniform int   uSteps;

      vec4 tanh4(vec4 x){
        vec4 e2x = exp(2.0*x);
        return (e2x - 1.0) / (e2x + 1.0);
      }

      float rand(vec2 co){
        return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      float sdTesseract4D(vec4 p, float size){
        vec4 d = abs(p) - vec4(size);
        return length(max(d, 0.0)) + min(max(d.x, max(d.y, max(d.z, d.w))), 0.0);
      }

      vec3 project4Dto3D(vec4 p4d, float wDepth){
        float perspective = 1.0 / (wDepth - p4d.w + 1.0);
        return p4d.xyz * perspective;
      }

      vec4 getChampagneChrome(vec3 pos, float dist) {
        vec3 champagne = vec3(1.2, 1.0, 0.8);
        vec3 chrome = vec3(0.9, 0.9, 0.95);

        float blend1 = sin(pos.y * 2.0) * 0.5 + 0.5;
        float blend2 = sin(pos.x * 1.5 + 1.0) * 0.5 + 0.5;
        float blend3 = sin(pos.z * 1.8 + 2.0) * 0.5 + 0.5;

        vec3 baseColor = mix(chrome, champagne, blend1);
        baseColor = mix(baseColor, champagne * 1.1, blend2 * 0.3);
        baseColor = mix(baseColor, chrome * 0.95, blend3 * 0.2);

        float metallic = sin(pos.z * 3.0 + iTime * 0.5) * 0.1 + 0.95;
        baseColor *= metallic;

        baseColor = clamp(baseColor, 0.3, 2.0);

        return vec4(baseColor, 1.0);
      }

      mat3 hueRotation(float a){
        float c = cos(a), s = sin(a);
        mat3 W = mat3(
          0.299, 0.587, 0.114,
          0.299, 0.587, 0.114,
          0.299, 0.587, 0.114
        );
        mat3 U = mat3(
           0.701, -0.587, -0.114,
          -0.299,  0.413, -0.114,
          -0.300, -0.588,  0.886
        );
        mat3 V = mat3(
           0.168, -0.331,  0.500,
           0.328,  0.035, -0.500,
          -0.497,  0.296,  0.201
        );
        return W + U * c + V * s;
      }

      void main(){
        vec2 f = (gl_FragCoord.xy - 0.5 * iResolution.xy - uOffsetPx) * uPxScale;

        float z = 5.0;
        float d = 0.0;

        vec3 p;
        vec4 o = vec4(0.0);

        float centerShift = uCenterShift;
        float cf = uColorFreq;

        mat2 wob = mat2(1.0);
        if (uUseBaseWobble == 1) {
          float t = iTime * uTimeScale;
          float c0 = cos(t + 0.0);
          float c1 = cos(t + 33.0);
          float c2 = cos(t + 11.0);
          wob = mat2(c0, c1, c2, c0);
        }

        float cf0 = cf * 0.0;
        float cf1 = cf * 1.0;
        float cf2 = cf * 2.0;
        float cf3 = cf * 3.0;

        vec4 phaseOffsets = vec4(cf0, cf1, cf2, cf3);
        const int STEPS = 35;
        for (int i = 0; i < STEPS; i++) {
          if (i >= uSteps) break;

          vec3 p = vec3(f, z);
          p.xz = wob * p.xz;
          p = uRot * p;

          vec4 p4d = vec4(p, uW4D);
          p4d = uRot4D * p4d;

          vec3 projected = project4Dto3D(p4d, 5.0);

          float tesseractSize = uBaseHalf * 0.8;
          float d = 0.05 + 0.15 * abs(sdTesseract4D(p4d, tesseractSize));
          if(d < 0.001) break;
          z -= d;

          vec4 trigInput = projected.y + z + phaseOffsets;
          vec4 trigVal = sin(trigInput) + 1.0;

          vec4 color0 = trigVal;
          vec4 color1 = getChampagneChrome(projected, d);

          o += mix(color0, color1, float(uColorScheme)) / d;
        }

        o = tanh4(o * o * (uGlow * uBloom) / 1e5);

        vec3 col = o.rgb;
        float n = rand(gl_FragCoord.xy + vec2(iTime));
        col += (n - 0.5) * uNoise;
        col = clamp(col, 0.0, 1.0);

        float L = dot(col, vec3(0.2126, 0.7152, 0.0722));
        col = clamp(mix(vec3(L), col, uSaturation), 0.0, 1.0);

        if(abs(uHueShift) > 0.0001){
          col = clamp(hueRotation(uHueShift) * col, 0.0, 1.0);
        }

        gl_FragColor = vec4(col, o.a);
      }
    `;

    if (quality === "low") {
      return /* glsl */ `
      precision highp float;

        uniform vec2 iResolution;
        uniform float iTime;

        void main() {
          // Simple black shader - minimal performance impact
          gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        }`;
    }

    return originalFragmentShader;
  };

  // Optimized rotation matrix calculation
  const updateRotationMatrix = (yaw, pitch, roll, out) => {
    const cy = Math.cos(yaw),
      sy = Math.sin(yaw);
    const cx = Math.cos(pitch),
      sx = Math.sin(pitch);
    const cz = Math.cos(roll),
      sz = Math.sin(roll);

    out[0] = cy * cz + sy * sx * sz;
    out[1] = cx * sz;
    out[2] = -sy * cz + cy * sx * sz;
    out[3] = -cy * sz + sy * sx * cz;
    out[4] = cx * cz;
    out[5] = sy * sz + cy * sx * cz;
    out[6] = sy * cx;
    out[7] = -sx;
    out[8] = cy * cx;

    return out;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const qualitySettings = getQualitySettings();
    const currentScale = responsive ? responsiveScale : 1;
    const H = Math.max(0.001, height);
    const BW = Math.max(0.001, baseWidth);
    const BASE_HALF = BW * 0.5;
    const GLOW = Math.max(0.0, glow);
    const NOISE = Math.max(0.0, noise);
    const offX = offset?.x ?? 0;
    const offY = offset?.y ?? 0;
    const SAT = transparent ? 1.5 : 1;
    const SCALE = Math.max(0.001, scale * currentScale);
    const HUE = hueShift || 0;
    const CFREQ = Math.max(0.0, colorFrequency || 1);
    const BLOOM = Math.max(0.0, bloom || 1);
    const RSX = 1;
    const RSY = 1;
    const RSZ = 1;
    const TS = qualitySettings.timeScale;
    const HOVSTR = Math.max(0, hoverStrength || 1);
    const INERT = Math.max(0, Math.min(1, inertia || 0.1));

    const dpr = qualitySettings.dpr;
    const renderer = new Renderer({
      dpr,
      alpha: transparent,
      antialias: false,
      powerPreference: "high-performance",
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
    });
    const gl = renderer.gl;
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    gl.disable(gl.BLEND);
    gl.disable(gl.DITHER);
    gl.hint(gl.FRAGMENT_SHADER_DERIVATIVE_HINT, gl.FASTEST);

    Object.assign(gl.canvas.style, {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
      display: "block",
    });
    container.appendChild(gl.canvas);

    const vertex = /* glsl */ `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragment = getFragmentShader(quality);

    const geometry = new Triangle(gl);
    const iResBuf = new Float32Array(2);
    const offsetPxBuf = new Float32Array(2);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iResolution: { value: iResBuf },
        iTime: { value: 0 },
        uHeight: { value: H },
        uBaseHalf: { value: BASE_HALF },
        uUseBaseWobble: { value: 1 },
        uRot: { value: new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]) },
        uRot4D: {
          value: new Float32Array([
            1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
          ]),
        },
        uW4D: { value: 0 },
        uColorScheme: { value: colorScheme === "prism" ? 0 : 1 },
        uGlow: { value: GLOW },
        uOffsetPx: { value: offsetPxBuf },
        uNoise: { value: NOISE },
        uSaturation: { value: SAT },
        uScale: { value: SCALE },
        uHueShift: { value: HUE },
        uColorFreq: { value: CFREQ },
        uBloom: { value: BLOOM },
        uCenterShift: { value: H * 0.25 },
        uInvBaseHalf: { value: 1 / BASE_HALF },
        uInvHeight: { value: 1 / H },
        uMinAxis: { value: Math.min(BASE_HALF, H) },
        uPxScale: {
          value: 1 / ((gl.drawingBufferHeight || 1) * 0.1 * SCALE),
        },
        uTimeScale: { value: TS },
        uSteps: { value: qualitySettings.steps },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h);
      iResBuf[0] = gl.drawingBufferWidth;
      iResBuf[1] = gl.drawingBufferHeight;
      offsetPxBuf[0] = offX * dpr;
      offsetPxBuf[1] = offY * dpr;
      program.uniforms.uPxScale.value =
        1 / ((gl.drawingBufferHeight || 1) * 0.1 * SCALE);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    const rotBuf = new Float32Array(9);
    const rot4DBuf = new Float32Array(16);

    const setMat4From4DRotations = (xy, xz, xw, yz, yw, zw, out) => {
      const t = xy + xz + xw + yz + yw + zw;
      const ct = Math.cos(t * 0.2),
        st = Math.sin(t * 0.2);

      out.fill(0);
      out[0] = ct;
      out[1] = -st;
      out[4] = st;
      out[5] = ct;
      out[10] = Math.cos(t * 0.15);
      out[11] = -Math.sin(t * 0.15);
      out[14] = Math.sin(t * 0.15);
      out[15] = Math.cos(t * 0.15);

      return out;
    };

    let raf = 0;
    const t0 = performance.now();
    const startRAF = () => {
      if (raf) return;
      raf = requestAnimationFrame(render);
    };
    const stopRAF = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const rnd = () => Math.random();
    const wX = (0.3 + rnd() * 0.6) * RSX;
    const wY = (0.2 + rnd() * 0.7) * RSY;
    const wZ = (0.1 + rnd() * 0.5) * RSZ;
    const phX = rnd() * Math.PI * 2;
    const phZ = rnd() * Math.PI * 2;

    let yaw = 0,
      pitch = 0,
      roll = 0;
    const pointer = { x: 0, y: 0, inside: true };

    const onMove = (e) => {
      const ww = Math.max(1, window.innerWidth);
      const wh = Math.max(1, window.innerHeight);
      const cx = ww * 0.5;
      const cy = wh * 0.5;
      const nx = (e.clientX - cx) / (ww * 0.5);
      const ny = (e.clientY - cy) / (wh * 0.5);
      pointer.x = Math.max(-1, Math.min(1, nx));
      pointer.y = Math.max(-1, Math.min(1, ny));
      pointer.inside = true;
    };

    const onLeave = () => {
      pointer.inside = false;
    };
    const onBlur = () => {
      pointer.inside = false;
    };

    let onPointerMove = null;
    if (animationType === "hover") {
      onPointerMove = (e) => {
        onMove(e);
        startRAF();
      };
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("mouseleave", onLeave);
      window.addEventListener("blur", onBlur);
      program.uniforms.uUseBaseWobble.value = 0;
    } else if (animationType === "3drotate") {
      program.uniforms.uUseBaseWobble.value = 0;
    } else {
      program.uniforms.uUseBaseWobble.value = 1;
    }

    let frameCount = 0;
    const render = (t) => {
      if (!isVisible || document.hidden) {
        raf = requestAnimationFrame(render);
        return;
      }

      frameCount++;
      if (quality === "low" && frameCount % 2 === 0) {
        raf = requestAnimationFrame(render);
        return;
      }

      const time = (t - t0) * 0.001;
      program.uniforms.iTime.value = time;

      if (animationType !== "static") {
        program.uniforms.uW4D.value = Math.sin(time * TS * 0.3) * 2.0;
      }

      if (animationType === "hover") {
        const maxPitch = 0.6 * HOVSTR;
        const maxYaw = 0.6 * HOVSTR;
        const targetYaw = pointer.inside ? -pointer.x * maxYaw : 0;
        const targetPitch = pointer.inside ? pointer.y * maxPitch : 0;

        yaw += (targetYaw - yaw) * INERT;
        pitch += (targetPitch - pitch) * INERT;

        updateRotationMatrix(yaw, pitch, 0, rotBuf);
        program.uniforms.uRot.value = rotBuf;

        if (quality !== "low") {
          program.uniforms.uRot4D.value = setMat4From4DRotations(
            yaw * 0.5,
            pitch * 0.5,
            time * TS * 0.15,
            0,
            0,
            0,
            rot4DBuf
          );
        }
      } else if (animationType === "3drotate") {
        const tScaled = time * TS;
        yaw = tScaled * wY;
        pitch = Math.sin(tScaled * wX + phX) * 0.6;
        roll = Math.sin(tScaled * wZ + phZ) * 0.3;
        program.uniforms.uRot.value = updateRotationMatrix(
          yaw,
          pitch,
          roll,
          rotBuf
        );
      } else {
        if (TS >= 1e-6) {
          const t = time * TS;
          program.uniforms.uRot.value = updateRotationMatrix(0, 0, 0, rotBuf);

          if (quality !== "low") {
            program.uniforms.uRot4D.value = setMat4From4DRotations(
              t * 0.2,
              t * 0.3,
              t * 0.1,
              t * 0.4,
              t * 0.15,
              t * 0.25,
              rot4DBuf
            );
          }
        }
      }

      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(render);
    };

    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.some((e) => e.isIntersecting);
        if (vis && !document.hidden) startRAF();
        else stopRAF();
      },
      { rootMargin: "50px" }
    );
    io.observe(container);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopRAF();
      } else {
        const rect = container.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible) startRAF();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    startRAF();
    container.__prismIO = io;

    return () => {
      stopRAF();
      ro.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (animationType === "hover") {
        if (onPointerMove)
          window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("mouseleave", onLeave);
        window.removeEventListener("blur", onBlur);
      }
      const io = container.__prismIO;
      if (io) io.disconnect();
      delete container.__prismIO;
      if (gl.canvas.parentElement === container)
        container.removeChild(gl.canvas);

      const extension = gl.getExtension("WEBGL_lose_context");
      if (extension) extension.loseContext();
    };
  }, [
    height,
    baseWidth,
    animationType,
    glow,
    noise,
    offset?.x,
    offset?.y,
    scale,
    transparent,
    hueShift,
    colorFrequency,
    timeScale,
    hoverStrength,
    inertia,
    bloom,
    suspendWhenOffscreen,
    colorScheme,
    responsive,
    responsiveScale,
    quality,
  ]);

  return (
    <div
      className="absolute inset-0 w-full h-full"
      ref={containerRef}
      style={{ background: "black", height: "100%" }}
    >
      {showFPS && (
        <FPSDisplay fps={fps} quality={quality} position={fpsPosition} />
      )}
    </div>
  );
};

export default Prism;
