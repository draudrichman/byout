(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/prism_website-main/src/components/PrismaBackground.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$ogl$2f$src$2f$core$2f$Renderer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/ogl/src/core/Renderer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$ogl$2f$src$2f$extras$2f$Triangle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/ogl/src/extras/Triangle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$ogl$2f$src$2f$core$2f$Program$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/ogl/src/core/Program.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$ogl$2f$src$2f$core$2f$Mesh$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/ogl/src/core/Mesh.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const Prism = (param)=>{
    let { height = 3.5, baseWidth = 5.5, animationType = "rotate", glow = 1, offset = {
        x: 0,
        y: 0
    }, noise = 0.5, transparent = true, scale = 3.6, hueShift = 0, colorFrequency = 1, hoverStrength = 2, inertia = 0.05, bloom = 1, suspendWhenOffscreen = false, timeScale = 0.5, colorScheme = "prism", responsive = true, mobileScale = 0.85, tabletScale = 0.9 } = param;
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [responsiveScale, setResponsiveScale] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    // Screen size detection and responsive scaling
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Prism.useEffect": ()=>{
            if (!responsive) return;
            const updateResponsiveScale = {
                "Prism.useEffect.updateResponsiveScale": ()=>{
                    const screenWidth = window.innerWidth;
                    if (screenWidth < 768) {
                        setResponsiveScale(mobileScale);
                    } else if (screenWidth < 1024) {
                        setResponsiveScale(tabletScale);
                    } else {
                        setResponsiveScale(1);
                    }
                }
            }["Prism.useEffect.updateResponsiveScale"];
            updateResponsiveScale();
            window.addEventListener('resize', updateResponsiveScale);
            return ({
                "Prism.useEffect": ()=>window.removeEventListener('resize', updateResponsiveScale)
            })["Prism.useEffect"];
        }
    }["Prism.useEffect"], [
        responsive,
        mobileScale,
        tabletScale
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Prism.useEffect": ()=>{
            const container = containerRef.current;
            if (!container) return;
            const currentScale = responsive ? responsiveScale : 1;
            const H = Math.max(0.001, height);
            const BW = Math.max(0.001, baseWidth);
            const BASE_HALF = BW * 0.5;
            const GLOW = Math.max(0.0, glow);
            const NOISE = Math.max(0.0, noise);
            var _offset_x;
            const offX = (_offset_x = offset === null || offset === void 0 ? void 0 : offset.x) !== null && _offset_x !== void 0 ? _offset_x : 0;
            var _offset_y;
            const offY = (_offset_y = offset === null || offset === void 0 ? void 0 : offset.y) !== null && _offset_y !== void 0 ? _offset_y : 0;
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
            const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$ogl$2f$src$2f$core$2f$Renderer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Renderer"]({
                dpr,
                alpha: transparent,
                antialias: false
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
                display: "block"
            });
            container.appendChild(gl.canvas);
            const vertex = "\n      attribute vec2 position;\n      void main() {\n        gl_Position = vec4(position, 0.0, 1.0);\n      }\n    ";
            const fragment = "\n      precision highp float;\n\n      uniform vec2  iResolution;\n      uniform float iTime;\n\n      uniform float uHeight;\n      uniform float uBaseHalf;\n      uniform mat3  uRot;\n      uniform mat4  uRot4D;\n      uniform float uW4D;\n      uniform int   uUseBaseWobble;\n      uniform int   uColorScheme;\n      uniform float uGlow;\n      uniform vec2  uOffsetPx;\n      uniform float uNoise;\n      uniform float uSaturation;\n      uniform float uScale;\n      uniform float uHueShift;\n      uniform float uColorFreq;\n      uniform float uBloom;\n      uniform float uCenterShift;\n      uniform float uInvBaseHalf;\n      uniform float uInvHeight;\n      uniform float uMinAxis;\n      uniform float uPxScale;\n      uniform float uTimeScale;\n\n      vec4 tanh4(vec4 x){\n        vec4 e2x = exp(2.0*x);\n        return (e2x - 1.0) / (e2x + 1.0);\n      }\n\n      float rand(vec2 co){\n        return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453123);\n      }\n\n      float sdTesseract4D(vec4 p, float size){\n        vec4 d = abs(p) - vec4(size);\n        return length(max(d, 0.0)) + min(max(d.x, max(d.y, max(d.z, d.w))), 0.0);\n      }\n\n      vec3 project4Dto3D(vec4 p4d, float wDepth){\n        float perspective = 1.0 / (wDepth - p4d.w + 1.0);\n        return p4d.xyz * perspective;\n      }\n\n      vec4 getChampagneChrome(vec3 pos, float dist) {\n        vec3 champagne = vec3(1.2, 1.0, 0.8);\n        vec3 chrome = vec3(0.9, 0.9, 0.95);\n        \n        // Create variation similar to the original sin pattern\n        float blend1 = sin(pos.y * 2.0) * 0.5 + 0.5;\n        float blend2 = sin(pos.x * 1.5 + 1.0) * 0.5 + 0.5;\n        float blend3 = sin(pos.z * 1.8 + 2.0) * 0.5 + 0.5;\n        \n        vec3 baseColor = mix(chrome, champagne, blend1);\n        baseColor = mix(baseColor, champagne * 1.1, blend2 * 0.3);\n        baseColor = mix(baseColor, chrome * 0.95, blend3 * 0.2);\n        \n        // Add subtle metallic variation without darkening too much\n        float metallic = sin(pos.z * 3.0 + iTime * 0.5) * 0.1 + 0.95;\n        baseColor *= metallic;\n        \n        // Ensure colors stay bright and visible\n        baseColor = clamp(baseColor, 0.3, 2.0);\n        \n        return vec4(baseColor, 1.0);\n      }\n\n      mat3 hueRotation(float a){\n        float c = cos(a), s = sin(a);\n        mat3 W = mat3(\n          0.299, 0.587, 0.114,\n          0.299, 0.587, 0.114,\n          0.299, 0.587, 0.114\n        );\n        mat3 U = mat3(\n           0.701, -0.587, -0.114,\n          -0.299,  0.413, -0.114,\n          -0.300, -0.588,  0.886\n        );\n        mat3 V = mat3(\n           0.168, -0.331,  0.500,\n           0.328,  0.035, -0.500,\n          -0.497,  0.296,  0.201\n        );\n        return W + U * c + V * s;\n      }\n\n      void main(){\n        vec2 f = (gl_FragCoord.xy - 0.5 * iResolution.xy - uOffsetPx) * uPxScale;\n\n        float z = 5.0;\n        float d = 0.0;\n\n        vec3 p;\n        vec4 o = vec4(0.0);\n\n        float centerShift = uCenterShift;\n        float cf = uColorFreq;\n\n        mat2 wob = mat2(1.0);\n        if (uUseBaseWobble == 1) {\n          float t = iTime * uTimeScale;\n          float c0 = cos(t + 0.0);\n          float c1 = cos(t + 33.0);\n          float c2 = cos(t + 11.0);\n          wob = mat2(c0, c1, c2, c0);\n        }\n\n        const int STEPS = 100;\n        for (int i = 0; i < STEPS; i++) {\n          p = vec3(f, z);\n          p.xz = p.xz * wob;\n          p = uRot * p;\n          \n          vec4 p4d = vec4(p, uW4D);\n          p4d = uRot4D * p4d;\n          \n          vec3 projected = project4Dto3D(p4d, 5.0);\n          float tesseractSize = uBaseHalf * 0.8;\n          d = 0.05 + 0.15 * abs(sdTesseract4D(p4d, tesseractSize));\n          z -= d;\n          \n          if (uColorScheme == 0) {\n            o += (sin((projected.y + z) * cf + vec4(0.0, 1.0, 2.0, 3.0)) + 1.0) / d;\n          } else {\n            vec4 champagneColor = getChampagneChrome(projected, d);\n            o += champagneColor / d;\n          }\n        }\n\n        o = tanh4(o * o * (uGlow * uBloom) / 1e5);\n\n        vec3 col = o.rgb;\n        float n = rand(gl_FragCoord.xy + vec2(iTime));\n        col += (n - 0.5) * uNoise;\n        col = clamp(col, 0.0, 1.0);\n\n        float L = dot(col, vec3(0.2126, 0.7152, 0.0722));\n        col = clamp(mix(vec3(L), col, uSaturation), 0.0, 1.0);\n\n        if(abs(uHueShift) > 0.0001){\n          col = clamp(hueRotation(uHueShift) * col, 0.0, 1.0);\n        }\n\n        gl_FragColor = vec4(col, o.a);\n      }\n    ";
            const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$ogl$2f$src$2f$extras$2f$Triangle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Triangle"](gl);
            const iResBuf = new Float32Array(2);
            const offsetPxBuf = new Float32Array(2);
            const program = new __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$ogl$2f$src$2f$core$2f$Program$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Program"](gl, {
                vertex,
                fragment,
                uniforms: {
                    iResolution: {
                        value: iResBuf
                    },
                    iTime: {
                        value: 0
                    },
                    uHeight: {
                        value: H
                    },
                    uBaseHalf: {
                        value: BASE_HALF
                    },
                    uUseBaseWobble: {
                        value: 1
                    },
                    uRot: {
                        value: new Float32Array([
                            1,
                            0,
                            0,
                            0,
                            1,
                            0,
                            0,
                            0,
                            1
                        ])
                    },
                    uRot4D: {
                        value: new Float32Array([
                            1,
                            0,
                            0,
                            0,
                            0,
                            1,
                            0,
                            0,
                            0,
                            0,
                            1,
                            0,
                            0,
                            0,
                            0,
                            1
                        ])
                    },
                    uW4D: {
                        value: 0
                    },
                    uColorScheme: {
                        value: colorScheme === "prism" ? 0 : 1
                    },
                    uGlow: {
                        value: GLOW
                    },
                    uOffsetPx: {
                        value: offsetPxBuf
                    },
                    uNoise: {
                        value: NOISE
                    },
                    uSaturation: {
                        value: SAT
                    },
                    uScale: {
                        value: SCALE
                    },
                    uHueShift: {
                        value: HUE
                    },
                    uColorFreq: {
                        value: CFREQ
                    },
                    uBloom: {
                        value: BLOOM
                    },
                    uCenterShift: {
                        value: H * 0.25
                    },
                    uInvBaseHalf: {
                        value: 1 / BASE_HALF
                    },
                    uInvHeight: {
                        value: 1 / H
                    },
                    uMinAxis: {
                        value: Math.min(BASE_HALF, H)
                    },
                    uPxScale: {
                        value: 1 / ((gl.drawingBufferHeight || 1) * 0.1 * SCALE)
                    },
                    uTimeScale: {
                        value: TS
                    }
                }
            });
            const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$ogl$2f$src$2f$core$2f$Mesh$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](gl, {
                geometry,
                program
            });
            const resize = {
                "Prism.useEffect.resize": ()=>{
                    const w = container.clientWidth || 1;
                    const h = container.clientHeight || 1;
                    renderer.setSize(w, h);
                    iResBuf[0] = gl.drawingBufferWidth;
                    iResBuf[1] = gl.drawingBufferHeight;
                    offsetPxBuf[0] = offX * dpr;
                    offsetPxBuf[1] = offY * dpr;
                    program.uniforms.uPxScale.value = 1 / ((gl.drawingBufferHeight || 1) * 0.1 * SCALE);
                }
            }["Prism.useEffect.resize"];
            const ro = new ResizeObserver(resize);
            ro.observe(container);
            resize();
            const rotBuf = new Float32Array(9);
            const rot4DBuf = new Float32Array(16);
            const setMat3FromEuler = {
                "Prism.useEffect.setMat3FromEuler": (yawY, pitchX, rollZ, out)=>{
                    const cy = Math.cos(yawY), sy = Math.sin(yawY);
                    const cx = Math.cos(pitchX), sx = Math.sin(pitchX);
                    const cz = Math.cos(rollZ), sz = Math.sin(rollZ);
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
                }
            }["Prism.useEffect.setMat3FromEuler"];
            const setMat4From4DRotations = {
                "Prism.useEffect.setMat4From4DRotations": (xy, xz, xw, yz, yw, zw, out)=>{
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
                    temp[0] = cxy;
                    temp[1] = -sxy;
                    temp[4] = sxy;
                    temp[5] = cxy;
                    temp[10] = temp[15] = 1;
                    // Apply XZ rotation
                    const temp2 = new Float32Array(16);
                    temp2[0] = cxz;
                    temp2[2] = -sxz;
                    temp2[8] = sxz;
                    temp2[10] = cxz;
                    temp2[5] = temp2[15] = 1;
                    // Apply XW rotation
                    const temp3 = new Float32Array(16);
                    temp3[0] = cxw;
                    temp3[3] = -sxw;
                    temp3[12] = sxw;
                    temp3[15] = cxw;
                    temp3[5] = temp3[10] = 1;
                    // Simple 4D rotation combining multiple planes
                    const t = xy + xz + xw + yz + yw + zw;
                    const ct = Math.cos(t * 0.2), st = Math.sin(t * 0.2);
                    out[0] = ct;
                    out[1] = -st;
                    out[4] = st;
                    out[5] = ct;
                    out[10] = Math.cos(t * 0.15);
                    out[11] = -Math.sin(t * 0.15);
                    out[14] = Math.sin(t * 0.15);
                    out[15] = Math.cos(t * 0.15);
                    out[2] = out[6] = out[8] = out[9] = 0;
                    out[3] = out[7] = out[12] = out[13] = 0;
                    return out;
                }
            }["Prism.useEffect.setMat4From4DRotations"];
            const NOISE_IS_ZERO = NOISE < 1e-6;
            let raf = 0;
            const t0 = performance.now();
            const startRAF = {
                "Prism.useEffect.startRAF": ()=>{
                    if (raf) return;
                    raf = requestAnimationFrame(render);
                }
            }["Prism.useEffect.startRAF"];
            const stopRAF = {
                "Prism.useEffect.stopRAF": ()=>{
                    if (!raf) return;
                    cancelAnimationFrame(raf);
                    raf = 0;
                }
            }["Prism.useEffect.stopRAF"];
            const rnd = {
                "Prism.useEffect.rnd": ()=>Math.random()
            }["Prism.useEffect.rnd"];
            const wX = (0.3 + rnd() * 0.6) * RSX;
            const wY = (0.2 + rnd() * 0.7) * RSY;
            const wZ = (0.1 + rnd() * 0.5) * RSZ;
            const phX = rnd() * Math.PI * 2;
            const phZ = rnd() * Math.PI * 2;
            let yaw = 0, pitch = 0, roll = 0;
            let targetYaw = 0, targetPitch = 0;
            const lerp = {
                "Prism.useEffect.lerp": (a, b, t)=>a + (b - a) * t
            }["Prism.useEffect.lerp"];
            const pointer = {
                x: 0,
                y: 0,
                inside: true
            };
            const onMove = {
                "Prism.useEffect.onMove": (e)=>{
                    const ww = Math.max(1, window.innerWidth);
                    const wh = Math.max(1, window.innerHeight);
                    const cx = ww * 0.5;
                    const cy = wh * 0.5;
                    const nx = (e.clientX - cx) / (ww * 0.5);
                    const ny = (e.clientY - cy) / (wh * 0.5);
                    pointer.x = Math.max(-1, Math.min(1, nx));
                    pointer.y = Math.max(-1, Math.min(1, ny));
                    pointer.inside = true;
                }
            }["Prism.useEffect.onMove"];
            const onLeave = {
                "Prism.useEffect.onLeave": ()=>{
                    pointer.inside = false;
                }
            }["Prism.useEffect.onLeave"];
            const onBlur = {
                "Prism.useEffect.onBlur": ()=>{
                    pointer.inside = false;
                }
            }["Prism.useEffect.onBlur"];
            let onPointerMove = null;
            if (animationType === "hover") {
                onPointerMove = ({
                    "Prism.useEffect": (e)=>{
                        onMove(e);
                        startRAF();
                    }
                })["Prism.useEffect"];
                window.addEventListener("pointermove", onPointerMove, {
                    passive: true
                });
                window.addEventListener("mouseleave", onLeave);
                window.addEventListener("blur", onBlur);
                program.uniforms.uUseBaseWobble.value = 0;
            } else if (animationType === "3drotate") {
                program.uniforms.uUseBaseWobble.value = 0;
            } else {
                program.uniforms.uUseBaseWobble.value = 1;
            }
            const render = {
                "Prism.useEffect.render": (t)=>{
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
                        program.uniforms.uRot.value = setMat3FromEuler(yaw, pitch, roll, rotBuf);
                        // 4D rotations for hover
                        const tScaled = time * TS * 0.5;
                        program.uniforms.uRot4D.value = setMat4From4DRotations(yaw * 0.5, pitch * 0.5, tScaled * 0.3, roll * 0.5, tScaled * 0.2, tScaled * 0.1, rot4DBuf);
                        if (NOISE_IS_ZERO) {
                            const settled = Math.abs(yaw - targetYaw) < 1e-4 && Math.abs(pitch - targetPitch) < 1e-4 && Math.abs(roll) < 1e-4;
                            if (settled) continueRAF = false;
                        }
                    } else if (animationType === "3drotate") {
                        const tScaled = time * TS;
                        yaw = tScaled * wY;
                        pitch = Math.sin(tScaled * wX + phX) * 0.6;
                        roll = Math.sin(tScaled * wZ + phZ) * 0.5;
                        program.uniforms.uRot.value = setMat3FromEuler(yaw, pitch, roll, rotBuf);
                        // 4D rotations for 3drotate mode
                        program.uniforms.uRot4D.value = setMat4From4DRotations(tScaled * 0.4, tScaled * 0.3, tScaled * 0.2, tScaled * 0.5, tScaled * 0.1, tScaled * 0.6, rot4DBuf);
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
                        program.uniforms.uRot4D.value = setMat4From4DRotations(tScaled * 0.2, tScaled * 0.3, tScaled * 0.1, tScaled * 0.4, tScaled * 0.15, tScaled * 0.25, rot4DBuf);
                        if (TS < 1e-6) continueRAF = false;
                    }
                    renderer.render({
                        scene: mesh
                    });
                    if (continueRAF) {
                        raf = requestAnimationFrame(render);
                    } else {
                        raf = 0;
                    }
                }
            }["Prism.useEffect.render"];
            if (suspendWhenOffscreen) {
                const io = new IntersectionObserver({
                    "Prism.useEffect": (entries)=>{
                        const vis = entries.some({
                            "Prism.useEffect.vis": (e)=>e.isIntersecting
                        }["Prism.useEffect.vis"]);
                        if (vis) startRAF();
                        else stopRAF();
                    }
                }["Prism.useEffect"]);
                io.observe(container);
                startRAF();
                container.__prismIO = io;
            } else {
                startRAF();
            }
            return ({
                "Prism.useEffect": ()=>{
                    stopRAF();
                    ro.disconnect();
                    if (animationType === "hover") {
                        if (onPointerMove) window.removeEventListener("pointermove", onPointerMove);
                        window.removeEventListener("mouseleave", onLeave);
                        window.removeEventListener("blur", onBlur);
                    }
                    if (suspendWhenOffscreen) {
                        const io = container.__prismIO;
                        if (io) io.disconnect();
                        delete container.__prismIO;
                    }
                    if (gl.canvas.parentElement === container) container.removeChild(gl.canvas);
                }
            })["Prism.useEffect"];
        }
    }["Prism.useEffect"], [
        height,
        baseWidth,
        animationType,
        glow,
        noise,
        offset === null || offset === void 0 ? void 0 : offset.x,
        offset === null || offset === void 0 ? void 0 : offset.y,
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
        responsiveScale
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 w-full h-full",
        ref: containerRef
    }, void 0, false, {
        fileName: "[project]/prism_website-main/src/components/PrismaBackground.tsx",
        lineNumber: 616,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Prism, "v1Ss7h20G9aTMKXjCNS4ybwGjpM=");
_c = Prism;
const __TURBOPACK__default__export__ = Prism;
var _c;
__turbopack_context__.k.register(_c, "Prism");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=prism_website-main_src_components_PrismaBackground_tsx_435315c0._.js.map