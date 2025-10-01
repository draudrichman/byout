"use client";
import React, { useEffect, useRef, useState } from "react";
import { Renderer, Triangle, Program, Mesh } from "ogl";

const Prism = ({
  height = 3.5,
  baseWidth = 5.5,
  animationType = "rotate",
  glow = 1,
  offset = { x: 0, y: 0 },
  noise = 0.5,
  transparent = true,
  scale = 3.6,
  hueShift = 0,
  colorFrequency = 1,
  hoverStrength = 2,
  inertia = 0.05,
  bloom = 1,
  suspendWhenOffscreen = false,
  timeScale = 0.5,
  colorScheme = "prism",
  responsive = true,
  mobileScale = 0.85,
  tabletScale = 0.9,
}) => {
  const containerRef = useRef(null);
  const [responsiveScale, setResponsiveScale] = useState(1);

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
    window.addEventListener('resize', updateResponsiveScale);
    return () => window.removeEventListener('resize', updateResponsiveScale);
  }, [responsive, mobileScale, tabletScale]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

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
    const TS = Math.max(0, timeScale || 1);
    const HOVSTR = Math.max(0, hoverStrength || 1);
    const INERT = Math.max(0, Math.min(1, inertia || 0.12));

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const renderer = new Renderer({
      dpr,
      alpha: transparent,
      antialias: false,
    });
    const gl = renderer.gl;
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    gl.disable(gl.BLEND);

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

    const fragment = /* glsl */ `
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
        
        // Create variation similar to the original sin pattern
        float blend1 = sin(pos.y * 2.0) * 0.5 + 0.5;
        float blend2 = sin(pos.x * 1.5 + 1.0) * 0.5 + 0.5;
        float blend3 = sin(pos.z * 1.8 + 2.0) * 0.5 + 0.5;
        
        vec3 baseColor = mix(chrome, champagne, blend1);
        baseColor = mix(baseColor, champagne * 1.1, blend2 * 0.3);
        baseColor = mix(baseColor, chrome * 0.95, blend3 * 0.2);
        
        // Add subtle metallic variation without darkening too much
        float metallic = sin(pos.z * 3.0 + iTime * 0.5) * 0.1 + 0.95;
        baseColor *= metallic;
        
        // Ensure colors stay bright and visible
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

        const int STEPS = 100;
        for (int i = 0; i < STEPS; i++) {
          p = vec3(f, z);
          p.xz = p.xz * wob;
          p = uRot * p;
          
          vec4 p4d = vec4(p, uW4D);
          p4d = uRot4D * p4d;
          
          vec3 projected = project4Dto3D(p4d, 5.0);
          float tesseractSize = uBaseHalf * 0.8;
          d = 0.05 + 0.15 * abs(sdTesseract4D(p4d, tesseractSize));
          z -= d;
          
          if (uColorScheme == 0) {
            o += (sin((projected.y + z) * cf + vec4(0.0, 1.0, 2.0, 3.0)) + 1.0) / d;
          } else {
            vec4 champagneColor = getChampagneChrome(projected, d);
            o += champagneColor / d;
          }
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
        uRot4D: { value: new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]) },
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
    const setMat3FromEuler = (
      yawY,
      pitchX,
      rollZ,
      out
    ) => {
      const cy = Math.cos(yawY),
        sy = Math.sin(yawY);
      const cx = Math.cos(pitchX),
        sx = Math.sin(pitchX);
      const cz = Math.cos(rollZ),
        sz = Math.sin(rollZ);
      const r00 = cy * cz + sy * sx * sz;
      const r01 = -cy * sz + sy * sx * cz;
      const r02 = sy * cx;

      const r10 = cx * sz;
      const r11 = cx * cz;
      const r12 = -sx;

      const r20 = -sy * cz + cy * sx * sz;
      const r21 = sy * sz + cy * sx * cz;
      const r22 = cy * cx;

      out[0] = r00;
      out[1] = r10;
      out[2] = r20;
      out[3] = r01;
      out[4] = r11;
      out[5] = r21;
      out[6] = r02;
      out[7] = r12;
      out[8] = r22;
      return out;
    };

    const setMat4From4DRotations = (
      xy, xz, xw,
      yz, yw, zw,
      out
    ) => {
      const cxy = Math.cos(xy), sxy = Math.sin(xy);
      const cxz = Math.cos(xz), sxz = Math.sin(xz);
      const cxw = Math.cos(xw), sxw = Math.sin(xw);
      // const cyz = Math.cos(yz), syz = Math.sin(yz);
      // const cyw = Math.cos(yw), syw = Math.sin(yw);
      // const czw = Math.cos(zw), szw = Math.sin(zw);

      // Identity matrix
      out.fill(0);
      out[0] = out[5] = out[10] = out[15] = 1;

      // Apply XY rotation
      const temp = new Float32Array(16);
      temp[0] = cxy; temp[1] = -sxy; temp[4] = sxy; temp[5] = cxy;
      temp[10] = temp[15] = 1;

      // Apply XZ rotation
      const temp2 = new Float32Array(16);
      temp2[0] = cxz; temp2[2] = -sxz; temp2[8] = sxz; temp2[10] = cxz;
      temp2[5] = temp2[15] = 1;

      // Apply XW rotation
      const temp3 = new Float32Array(16);
      temp3[0] = cxw; temp3[3] = -sxw; temp3[12] = sxw; temp3[15] = cxw;
      temp3[5] = temp3[10] = 1;

      // Simple 4D rotation combining multiple planes
      const t = xy + xz + xw + yz + yw + zw;
      const ct = Math.cos(t * 0.2), st = Math.sin(t * 0.2);
      out[0] = ct; out[1] = -st; out[4] = st; out[5] = ct;
      out[10] = Math.cos(t * 0.15); out[11] = -Math.sin(t * 0.15);
      out[14] = Math.sin(t * 0.15); out[15] = Math.cos(t * 0.15);
      out[2] = out[6] = out[8] = out[9] = 0;
      out[3] = out[7] = out[12] = out[13] = 0;

      return out;
    };

    const NOISE_IS_ZERO = NOISE < 1e-6;
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
    let targetYaw = 0,
      targetPitch = 0;
    const lerp = (a, b, t) => a + (b - a) * t;

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

    const render = (t) => {
      const time = (t - t0) * 0.001;
      program.uniforms.iTime.value = time;

      let continueRAF = true;

      // Update W coordinate for 4D space animation
      program.uniforms.uW4D.value = Math.sin(time * TS * 0.3) * 2.0;

      if (animationType === "hover") {
        const maxPitch = 0.6 * HOVSTR;
        const maxYaw = 0.6 * HOVSTR;
        targetYaw = (pointer.inside ? -pointer.x : 0) * maxYaw;
        targetPitch = (pointer.inside ? pointer.y : 0) * maxPitch;
        const prevYaw = yaw;
        const prevPitch = pitch;
        const prevRoll = roll;
        yaw = lerp(prevYaw, targetYaw, INERT);
        pitch = lerp(prevPitch, targetPitch, INERT);
        roll = lerp(prevRoll, 0, 0.1);
        program.uniforms.uRot.value = setMat3FromEuler(
          yaw,
          pitch,
          roll,
          rotBuf
        );

        // 4D rotations for hover
        const tScaled = time * TS * 0.5;
        program.uniforms.uRot4D.value = setMat4From4DRotations(
          yaw * 0.5, pitch * 0.5, tScaled * 0.3,
          roll * 0.5, tScaled * 0.2, tScaled * 0.1,
          rot4DBuf
        );

        if (NOISE_IS_ZERO) {
          const settled =
            Math.abs(yaw - targetYaw) < 1e-4 &&
            Math.abs(pitch - targetPitch) < 1e-4 &&
            Math.abs(roll) < 1e-4;
          if (settled) continueRAF = false;
        }
      } else if (animationType === "3drotate") {
        const tScaled = time * TS;
        yaw = tScaled * wY;
        pitch = Math.sin(tScaled * wX + phX) * 0.6;
        roll = Math.sin(tScaled * wZ + phZ) * 0.5;
        program.uniforms.uRot.value = setMat3FromEuler(
          yaw,
          pitch,
          roll,
          rotBuf
        );

        // 4D rotations for 3drotate mode
        program.uniforms.uRot4D.value = setMat4From4DRotations(
          tScaled * 0.4, tScaled * 0.3, tScaled * 0.2,
          tScaled * 0.5, tScaled * 0.1, tScaled * 0.6,
          rot4DBuf
        );

        if (TS < 1e-6) continueRAF = false;
      } else {
        rotBuf[0] = 1;
        rotBuf[1] = 0;
        rotBuf[2] = 0;
        rotBuf[3] = 0;
        rotBuf[4] = 1;
        rotBuf[5] = 0;
        rotBuf[6] = 0;
        rotBuf[7] = 0;
        rotBuf[8] = 1;
        program.uniforms.uRot.value = rotBuf;

        // 4D rotations for rotate mode
        const tScaled = time * TS;
        program.uniforms.uRot4D.value = setMat4From4DRotations(
          tScaled * 0.2, tScaled * 0.3, tScaled * 0.1,
          tScaled * 0.4, tScaled * 0.15, tScaled * 0.25,
          rot4DBuf
        );

        if (TS < 1e-6) continueRAF = false;
      }

      renderer.render({ scene: mesh });
      if (continueRAF) {
        raf = requestAnimationFrame(render);
      } else {
        raf = 0;
      }
    };

    if (suspendWhenOffscreen) {
      const io = new IntersectionObserver((entries) => {
        const vis = entries.some((e) => e.isIntersecting);
        if (vis) startRAF();
        else stopRAF();
      });
      io.observe(container);
      startRAF();
      container.__prismIO = io;
    } else {
      startRAF();
    }

    return () => {
      stopRAF();
      ro.disconnect();
      if (animationType === "hover") {
        if (onPointerMove)
          window.removeEventListener(
            "pointermove",
            onPointerMove
          );
        window.removeEventListener("mouseleave", onLeave);
        window.removeEventListener("blur", onBlur);
      }
      if (suspendWhenOffscreen) {
        const io = container.__prismIO;
        if (io) io.disconnect();
        delete container.__prismIO;
      }
      if (gl.canvas.parentElement === container)
        container.removeChild(gl.canvas);
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
  ]);

  return <div className="absolute inset-0 w-full h-full" ref={containerRef} />;
};

export default Prism;
