module.exports = [
"[project]/prism_website-main/src/components/CompanyIntroduction/hooks/useScrollAnimations.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePhilosophyRectAnimation",
    ()=>usePhilosophyRectAnimation,
    "useScrollAnimations",
    ()=>useScrollAnimations
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/gsap/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/gsap/ScrollTrigger.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f40$gsap$2f$react$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/@gsap/react/src/index.js [app-ssr] (ecmascript)");
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
const useScrollAnimations = (containerRef)=>{
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f40$gsap$2f$react$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGSAP"])(()=>{
        if (!containerRef.current) return;
        const container = containerRef.current;
        const sections = container.querySelectorAll('div:not(.philosophy-section):not(.philosophy-divider):not(.philosophy-container)');
        const headings = container.querySelectorAll('h3');
        __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(sections, {
            opacity: 0
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollTrigger"].batch(sections, {
            onEnter: (elements)=>{
                elements.forEach((element, index)=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(element, {
                        opacity: 1,
                        duration: 0.4,
                        ease: "power3.out",
                        delay: index * 0.08
                    });
                });
            },
            onLeave: (elements)=>{
                elements.forEach((element, index)=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(element, {
                        opacity: 0,
                        duration: 0.3,
                        ease: "power3.in",
                        delay: index * 0.1
                    });
                });
            },
            onEnterBack: (elements)=>{
                elements.forEach((element, index)=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(element, {
                        opacity: 1,
                        duration: 0.4,
                        ease: "power3.out",
                        delay: index * 0.08
                    });
                });
            },
            onLeaveBack: (elements)=>{
                elements.forEach((element, index)=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(element, {
                        opacity: 0,
                        duration: 0.3,
                        ease: "power3.in",
                        delay: index * 0.1
                    });
                });
            },
            start: "top 85%",
            end: "bottom -10%"
        });
        headings.forEach((h, index)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(h, {
                filter: "hue-rotate(30deg)",
                duration: 6,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
                delay: index * 1.2
            });
        });
        return ()=>{
        // Cleanup function
        };
    }, {
        scope: containerRef
    });
};
const usePhilosophyRectAnimation = ()=>{
    return {
        animateRect: (rect, delay = 0)=>{
            const tl = __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
                delay
            });
            tl.fromTo(rect, {
                opacity: 0,
                scale: 0,
                transformOrigin: "center"
            }, {
                opacity: 0.3,
                scale: 1,
                transformOrigin: "center",
                duration: 0.4,
                ease: "power2.out"
            }).to(rect, {
                opacity: 0,
                scale: 1.1,
                duration: 0.2,
                ease: "power2.in"
            });
        },
        resetRect: (rect)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(rect, {
                opacity: 0,
                scale: 0
            });
        }
    };
};
}),
"[project]/prism_website-main/src/components/CompanyIntroduction/LogoSection.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/gsap/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/gsap/ScrollTrigger.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f40$gsap$2f$react$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/@gsap/react/src/index.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
const LogoSection = ()=>{
    const logoContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const logoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const imageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const displacementMapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f40$gsap$2f$react$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGSAP"])(()=>{
        if (!logoContainerRef.current) return;
        const container = logoContainerRef.current;
        const logo = logoRef.current;
        __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(logo, {
            opacity: 0,
            scale: 0.6,
            transformOrigin: "center"
        });
        const tl = __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
            onComplete: ()=>{
                startPrismaticAnimations();
            },
            scrollTrigger: {
                trigger: container,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play reverse play reverse"
            }
        });
        tl.to(logo, {
            opacity: 1,
            scale: 1,
            transformOrigin: "center",
            duration: 0.6,
            ease: "power3.out"
        });
        function startPrismaticAnimations() {
            __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(logo, {
                filter: "url(#displacementFilter) hue-rotate(60deg) drop-shadow(0 0 8px rgba(255,255,255,0.3))",
                duration: 8,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(logo, {
                filter: "url(#displacementFilter) hue-rotate(60deg) drop-shadow(0 0 20px rgba(255,255,255,0.6)) drop-shadow(0 0 40px rgba(200,200,255,0.4))",
                duration: 5,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1
            });
            // Animate displacement image and scale over time
            if (imageRef.current && displacementMapRef.current) {
                // Gradually fade out the displacement image
                __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(imageRef.current, {
                    attr: {
                        opacity: "0"
                    },
                    duration: 1.5,
                    ease: "power3.out"
                });
                // Also gradually reduce displacement scale (amplitude)
                __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(displacementMapRef.current, {
                    attr: {
                        scale: "0"
                    },
                    duration: 1.5,
                    ease: "power3.out"
                });
            }
        }
        return ()=>{
        // Cleanup function
        };
    }, {
        scope: logoContainerRef
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "py-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: "0",
                height: "0",
                style: {
                    position: 'absolute'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                        id: "displacementFilter",
                        x: "-50%",
                        y: "-50%",
                        width: "200%",
                        height: "200%",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feImage", {
                                ref: imageRef,
                                href: "/Filter/filtertest3.png",
                                result: "displacementImage",
                                opacity: "1"
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/LogoSection.tsx",
                                lineNumber: 92,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feDisplacementMap", {
                                ref: displacementMapRef,
                                in: "SourceGraphic",
                                in2: "displacementImage",
                                scale: "25",
                                xChannelSelector: "R",
                                yChannelSelector: "G"
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/LogoSection.tsx",
                                lineNumber: 98,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/LogoSection.tsx",
                        lineNumber: 91,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/LogoSection.tsx",
                    lineNumber: 90,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/LogoSection.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: logoContainerRef,
                className: "relative inline-block select-none mb-8 sm:mb-12 text-center w-80 h-80 sm:w-96 sm:h-88 md:w-[450px] md:h-96 lg:w-[500px] lg:h-[26rem]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 flex items-center justify-center z-10",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        ref: logoRef,
                        src: "/logo.svg",
                        alt: "PRISM 瓴境",
                        className: "w-full h-auto max-w-[320px] sm:max-w-[380px] md:max-w-[450px] lg:max-w-[500px] object-contain",
                        style: {
                            filter: 'url(#displacementFilter) drop-shadow(0 0 8px rgba(255,255,255,0.3))'
                        }
                    }, void 0, false, {
                        fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/LogoSection.tsx",
                        lineNumber: 114,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/LogoSection.tsx",
                    lineNumber: 113,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/LogoSection.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/LogoSection.tsx",
        lineNumber: 88,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = LogoSection;
}),
"[project]/prism_website-main/src/components/CompanyIntroduction/BrandPositioning.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
const BrandPositioning = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-8 sm:mb-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-base sm:text-lg leading-6 sm:leading-7 text-white/90 mb-1 sm:mb-2 max-w-4xl mx-auto transition-all duration-300 font-chinese font-light",
                children: "品牌全球化价值重塑"
            }, void 0, false, {
                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/BrandPositioning.tsx",
                lineNumber: 7,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-base sm:text-lg leading-6 sm:leading-7 text-white/90 mb-2 sm:mb-3 max-w-4xl mx-auto transition-all duration-300 font-chinese font-light",
                children: "全域增长伙伴"
            }, void 0, false, {
                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/BrandPositioning.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm sm:text-base leading-5 sm:leading-6 text-white/70 mb-1 sm:mb-2 max-w-4xl mx-auto transition-all duration-300",
                children: "Global Brand Value"
            }, void 0, false, {
                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/BrandPositioning.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm sm:text-base leading-5 sm:leading-6 text-white/70 mb-12 sm:mb-16 max-w-4xl mx-auto transition-all duration-300",
                children: "Innovation & Growth Partner"
            }, void 0, false, {
                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/BrandPositioning.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/BrandPositioning.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = BrandPositioning;
}),
"[project]/prism_website-main/src/components/CompanyIntroduction/CompanyDescription.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/gsap/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/gsap/ScrollTrigger.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f40$gsap$2f$react$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/@gsap/react/src/index.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
const CompanyDescription = ()=>{
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f40$gsap$2f$react$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGSAP"])(()=>{
        if (!containerRef.current) return;
        const container = containerRef.current;
        const leftTexts = container.querySelectorAll('.company-text-left');
        const rightTexts = container.querySelectorAll('.company-text-right');
        // Initial setup - hide all texts
        __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(leftTexts, {
            opacity: 0,
            x: -100
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(rightTexts, {
            opacity: 0,
            x: 100
        });
        // Repeatable animations on scroll
        __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollTrigger"].create({
            trigger: container,
            start: "top 80%",
            end: "bottom 20%",
            onEnter: ()=>{
                // Animate left texts
                __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(leftTexts, {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    ease: "power3.out",
                    stagger: 0.1
                });
                // Animate right texts
                __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(rightTexts, {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    ease: "power3.out",
                    stagger: 0.1
                });
            },
            onLeave: ()=>{
                // Reset to initial state when leaving
                __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(leftTexts, {
                    opacity: 0,
                    x: -100,
                    duration: 0.4,
                    ease: "power3.in",
                    stagger: 0.05
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(rightTexts, {
                    opacity: 0,
                    x: 100,
                    duration: 0.4,
                    ease: "power3.in",
                    stagger: 0.05
                });
            },
            onEnterBack: ()=>{
                // Animate again when scrolling back up
                __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(leftTexts, {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    ease: "power3.out",
                    stagger: 0.1
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(rightTexts, {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    ease: "power3.out",
                    stagger: 0.1
                });
            },
            onLeaveBack: ()=>{
                // Reset when leaving from top
                __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(leftTexts, {
                    opacity: 0,
                    x: -100,
                    duration: 0.4,
                    ease: "power3.in",
                    stagger: 0.05
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(rightTexts, {
                    opacity: 0,
                    x: 100,
                    duration: 0.4,
                    ease: "power3.in",
                    stagger: 0.05
                });
            }
        });
        return ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollTrigger"].getAll().forEach((trigger)=>trigger.kill());
        };
    }, {
        scope: containerRef
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "my-24 sm:my-28 md:my-32 company-description relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "company-bg-rect absolute inset-0 -mx-4 -my-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/10"
                    }, void 0, false, {
                        fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/CompanyDescription.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/10"
                    }, void 0, false, {
                        fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/CompanyDescription.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/10"
                    }, void 0, false, {
                        fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/CompanyDescription.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/10"
                    }, void 0, false, {
                        fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/CompanyDescription.tsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/CompanyDescription.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: containerRef,
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm sm:text-base leading-6 sm:leading-7 text-white/80 mb-4 sm:mb-6 max-w-4xl mx-auto font-chinese px-2 company-text-left relative z-10",
                        children: [
                            "PRISM 瓴境是全球化时代背景下诞生的",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                className: "text-white/95",
                                children: "技术驱动型产品渠道全域生态运营商"
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/CompanyDescription.tsx",
                                lineNumber: 126,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0)),
                            "。"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/CompanyDescription.tsx",
                        lineNumber: 125,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs sm:text-sm leading-5 sm:leading-6 text-white/70 mb-4 sm:mb-6 max-w-4xl mx-auto font-chinese px-2 company-text-right relative z-10",
                        children: "前身为BYOUT 年轻化创新集团，MDL买点论实验室"
                    }, void 0, false, {
                        fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/CompanyDescription.tsx",
                        lineNumber: 128,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm sm:text-base leading-6 sm:leading-7 text-white/80 mb-4 sm:mb-6 max-w-4xl mx-auto font-chinese px-2 company-text-left relative z-10",
                        children: "独创从0到1的 产品全球化价值重构 到 全球市场落地的全链路一体化增长方案。"
                    }, void 0, false, {
                        fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/CompanyDescription.tsx",
                        lineNumber: 131,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm sm:text-base leading-6 sm:leading-7 text-white/80 mb-4 sm:mb-6 max-w-4xl mx-auto font-chinese px-2 company-text-right relative z-10",
                        children: [
                            "通过 ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                className: "text-white/95",
                                children: "“战略前策 x 技术赋能 x 渠道落地”"
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/CompanyDescription.tsx",
                                lineNumber: 135,
                                columnNumber: 12
                            }, ("TURBOPACK compile-time value", void 0)),
                            " 的三位一体深度融合，"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/CompanyDescription.tsx",
                        lineNumber: 134,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm sm:text-base leading-6 sm:leading-7 text-white/80 mb-6 sm:mb-8 max-w-4xl mx-auto font-chinese px-2 company-text-left relative z-10",
                        children: "将您的品牌与产品从可持续发展的全球化市场影响力 x 竞争力 x 购买力 的3个维度解构重塑革新"
                    }, void 0, false, {
                        fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/CompanyDescription.tsx",
                        lineNumber: 137,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm sm:text-base leading-6 sm:leading-7 text-white/80 mb-8 sm:mb-12 max-w-4xl mx-auto font-chinese px-2 company-text-right relative z-10",
                        children: "将您的企业增长蓝图转化为实实在在的全球市场份额。"
                    }, void 0, false, {
                        fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/CompanyDescription.tsx",
                        lineNumber: 140,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/CompanyDescription.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/CompanyDescription.tsx",
        lineNumber: 116,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = CompanyDescription;
}),
"[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophyDivider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/gsap/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/gsap/ScrollTrigger.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f40$gsap$2f$react$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/@gsap/react/src/index.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
const PhilosophyDivider = ()=>{
    const dividerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f40$gsap$2f$react$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGSAP"])(()=>{
        if (!dividerRef.current) return;
        const philosophyDivider = dividerRef.current;
        __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(philosophyDivider, {
            opacity: 0,
            scale: 0.7,
            transformOrigin: "center"
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollTrigger"].create({
            trigger: philosophyDivider,
            start: "top 85%",
            end: "bottom -10%",
            onEnter: ()=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(philosophyDivider, {
                    opacity: 1,
                    scale: 1,
                    transformOrigin: "center",
                    duration: 0.6,
                    ease: "power3.out"
                });
            },
            onLeave: ()=>{
            // Keep it visible when leaving
            },
            onEnterBack: ()=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(philosophyDivider, {
                    opacity: 1,
                    scale: 1,
                    transformOrigin: "center",
                    duration: 0.6,
                    ease: "power3.out"
                });
            },
            onLeaveBack: ()=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(philosophyDivider, {
                    opacity: 0,
                    scale: 0.7,
                    transformOrigin: "center",
                    duration: 0.3,
                    ease: "power3.in"
                });
            }
        });
        const philosophyText = philosophyDivider.querySelector('.tracking-widest');
        if (philosophyText && philosophyText.textContent?.includes('破界有光')) {
            __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(philosophyText, {
                textShadow: "0 0 30px rgba(255,255,255,0.6), 0 0 60px rgba(200,200,255,0.4)",
                duration: 3,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1
            });
        }
        return ()=>{
        // Cleanup function
        };
    }, {
        scope: dividerRef
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: dividerRef,
        className: "mt-8 sm:mt-12 md:mt-16 mb-16 sm:mb-20 md:mb-24 philosophy-divider",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xl sm:text-2xl md:text-3xl leading-7 sm:leading-8 text-white/90 max-w-4xl mx-auto transition-all duration-300 font-chinese text-center tracking-widest px-2",
            children: "破界有光 | 落地成境"
        }, void 0, false, {
            fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophyDivider.tsx",
            lineNumber: 77,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophyDivider.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = PhilosophyDivider;
}),
"[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/gsap/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/gsap/ScrollTrigger.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f40$gsap$2f$react$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/@gsap/react/src/index.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
const PhilosophySections = ()=>{
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f40$gsap$2f$react$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGSAP"])(()=>{
        if (!containerRef.current) return;
        const container = containerRef.current;
        const philosophySections = container.querySelectorAll('.philosophy-section');
        const rectangles = container.querySelectorAll('.philosophy-rect');
        __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(philosophySections, {
            opacity: 1
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(rectangles, {
            opacity: 0,
            scale: 0,
            transformOrigin: "center"
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollTrigger"].batch(philosophySections, {
            onEnter: (elements)=>{
                elements.forEach((element, index)=>{
                    const rect = element.querySelector('.philosophy-rect');
                    if (rect) {
                        const tl = __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
                            delay: index * 0.08
                        });
                        tl.fromTo(rect, {
                            opacity: 0,
                            scale: 0,
                            transformOrigin: "center"
                        }, {
                            opacity: 0.3,
                            scale: 1,
                            transformOrigin: "center",
                            duration: 0.4,
                            ease: "power2.out"
                        }).to(rect, {
                            opacity: 0,
                            scale: 1.1,
                            duration: 0.2,
                            ease: "power2.in"
                        });
                    }
                });
            },
            onLeave: (elements)=>{
                elements.forEach((element)=>{
                    const rect = element.querySelector('.philosophy-rect');
                    if (rect) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(rect, {
                            opacity: 0,
                            scale: 0
                        });
                    }
                });
            },
            onEnterBack: (elements)=>{
                elements.forEach((element, index)=>{
                    const rect = element.querySelector('.philosophy-rect');
                    if (rect) {
                        const tl = __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
                            delay: index * 0.08
                        });
                        tl.fromTo(rect, {
                            opacity: 0,
                            scale: 0,
                            transformOrigin: "center"
                        }, {
                            opacity: 0.3,
                            scale: 1,
                            transformOrigin: "center",
                            duration: 0.4,
                            ease: "power2.out"
                        }).to(rect, {
                            opacity: 0,
                            scale: 1.1,
                            duration: 0.2,
                            ease: "power2.in"
                        });
                    }
                });
            },
            onLeaveBack: (elements)=>{
                elements.forEach((element)=>{
                    const rect = element.querySelector('.philosophy-rect');
                    if (rect) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(rect, {
                            opacity: 0,
                            scale: 0
                        });
                    }
                });
            },
            start: "top 85%",
            end: "bottom -10%"
        });
        return ()=>{
        // Cleanup function
        };
    }, {
        scope: containerRef
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "mb-12 sm:mb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 items-start philosophy-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 py-4 relative philosophy-section min-h-[120px] sm:min-h-[140px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "philosophy-rect absolute -inset-2 opacity-0 scale-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20"
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx",
                                lineNumber: 118,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20"
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20"
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx",
                                lineNumber: 120,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20"
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-base sm:text-lg font-medium text-white/90 mb-3 sm:mb-4 font-chinese relative z-10 leading-tight",
                        children: [
                            "破界 ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white/70 text-sm sm:text-base font-normal",
                                children: "(Break Boundaries):"
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx",
                                lineNumber: 124,
                                columnNumber: 14
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx",
                        lineNumber: 123,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm sm:text-base leading-relaxed text-white/80 transition-all duration-300 font-chinese relative z-10",
                        children: "破市场之界、技术之界、渠道之界、增长之界。"
                    }, void 0, false, {
                        fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx",
                        lineNumber: 126,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 py-4 relative philosophy-section min-h-[120px] sm:min-h-[140px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "philosophy-rect absolute -inset-2 opacity-0 scale-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20"
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx",
                                lineNumber: 134,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20"
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx",
                                lineNumber: 135,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20"
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx",
                                lineNumber: 136,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20"
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx",
                                lineNumber: 137,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-base sm:text-lg font-medium text-white/90 mb-3 sm:mb-4 font-chinese relative z-10 leading-tight",
                        children: [
                            "有光 ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white/70 text-sm sm:text-base font-normal",
                                children: "(Guidance Light):"
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx",
                                lineNumber: 140,
                                columnNumber: 14
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm sm:text-base leading-relaxed text-white/80 transition-all duration-300 font-chinese relative z-10",
                        children: "以光破界，为破界之路提供指引之光（战略之光、技术之光、方法之光）。"
                    }, void 0, false, {
                        fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 py-4 relative philosophy-section min-h-[120px] sm:min-h-[140px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "philosophy-rect absolute -inset-2 opacity-0 scale-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20"
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20"
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx",
                                lineNumber: 151,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20"
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx",
                                lineNumber: 152,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20"
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx",
                                lineNumber: 153,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-base sm:text-lg font-medium text-white/90 mb-3 sm:mb-4 font-chinese relative z-10 leading-tight",
                        children: [
                            "落地 ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white/70 text-sm sm:text-base font-normal",
                                children: "(Results Oriented):"
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx",
                                lineNumber: 156,
                                columnNumber: 14
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx",
                        lineNumber: 155,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm sm:text-base leading-relaxed text-white/80 transition-all duration-300 font-chinese relative z-10",
                        children: "将全球化资源，认知，洞察转化为一步一脚印的扎实执行，实现知行合一。"
                    }, void 0, false, {
                        fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx",
                lineNumber: 148,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 py-4 relative philosophy-section min-h-[120px] sm:min-h-[140px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "philosophy-rect absolute -inset-2 opacity-0 scale-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20"
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx",
                                lineNumber: 166,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20"
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx",
                                lineNumber: 167,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20"
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx",
                                lineNumber: 168,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20"
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx",
                                lineNumber: 169,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx",
                        lineNumber: 165,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-base sm:text-lg font-medium text-white/90 mb-3 sm:mb-4 font-chinese relative z-10 leading-tight",
                        children: [
                            "成境 ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white/70 text-sm sm:text-base font-normal",
                                children: "(Create New Realms):"
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx",
                                lineNumber: 172,
                                columnNumber: 14
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx",
                        lineNumber: 171,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm sm:text-base leading-relaxed text-white/80 transition-all duration-300 font-chinese relative z-10",
                        children: "我们最终为品牌开疆扩土，创造出一片可持续增长的新境界、新天地。"
                    }, void 0, false, {
                        fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx",
                        lineNumber: 174,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx",
                lineNumber: 164,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx",
        lineNumber: 114,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = PhilosophySections;
}),
"[project]/prism_website-main/src/components/CompanyIntroduction/ValueProposition.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
const ValueProposition = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-12 sm:mb-16",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-base sm:text-lg leading-7 sm:leading-8 text-white/90 mb-6 sm:mb-8 max-w-4xl mx-auto transition-all duration-300 font-chinese text-center px-2",
                children: "PRISM瓴境 的独到价值在于："
            }, void 0, false, {
                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/ValueProposition.tsx",
                lineNumber: 7,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4 sm:space-y-6 max-w-4xl mx-auto px-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "transition-all duration-300",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm sm:text-base leading-6 sm:leading-7 text-white/80 font-chinese",
                            children: [
                                "- 我们不止是咨询顾问，而是",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    className: "text-white/95",
                                    children: "共建者"
                                }, void 0, false, {
                                    fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/ValueProposition.tsx",
                                    lineNumber: 14,
                                    columnNumber: 27
                                }, ("TURBOPACK compile-time value", void 0)),
                                "：深度介入产品优化、技术赋能与渠道谈判，与品牌深度绑定，共担风险、共享成果；"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/ValueProposition.tsx",
                            lineNumber: 13,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/ValueProposition.tsx",
                        lineNumber: 12,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "transition-all duration-300",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm sm:text-base leading-6 sm:leading-7 text-white/80 font-chinese",
                            children: [
                                "- 我们不止是资源中介，而是",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    className: "text-white/95",
                                    children: "系统构建者"
                                }, void 0, false, {
                                    fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/ValueProposition.tsx",
                                    lineNumber: 20,
                                    columnNumber: 27
                                }, ("TURBOPACK compile-time value", void 0)),
                                "：从海外零售商超的货架到消费者的心智，我们打通完整的价值链；"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/ValueProposition.tsx",
                            lineNumber: 19,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/ValueProposition.tsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "transition-all duration-300",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm sm:text-base leading-6 sm:leading-7 text-white/80 font-chinese",
                            children: [
                                "- 我们不止提供方案，更",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    className: "text-white/95",
                                    children: "交付确定性"
                                }, void 0, false, {
                                    fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/ValueProposition.tsx",
                                    lineNumber: 26,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                "：通过技术手段降低损耗、延长保鲜、革命产品力，攻破并优化产品出海的各阶段痛点。"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/ValueProposition.tsx",
                            lineNumber: 25,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/ValueProposition.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/ValueProposition.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/ValueProposition.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = ValueProposition;
}),
"[project]/prism_website-main/src/components/CompanyIntroduction/ClosingStatement.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
const ClosingStatement = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-8 sm:mt-12 md:mt-16 mb-12 sm:mb-16 md:mb-20",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xl sm:text-2xl md:text-3xl leading-7 sm:leading-8 text-white/90 max-w-4xl mx-auto transition-all duration-300 font-chinese text-center tracking-widest px-2",
            children: "与 光 同 行 | 破 界 升 维"
        }, void 0, false, {
            fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/ClosingStatement.tsx",
            lineNumber: 7,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/ClosingStatement.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = ClosingStatement;
}),
"[project]/prism_website-main/src/components/CompanyIntroduction/index.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$CompanyIntroduction$2f$hooks$2f$useScrollAnimations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/src/components/CompanyIntroduction/hooks/useScrollAnimations.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$CompanyIntroduction$2f$LogoSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/src/components/CompanyIntroduction/LogoSection.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$CompanyIntroduction$2f$BrandPositioning$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/src/components/CompanyIntroduction/BrandPositioning.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$CompanyIntroduction$2f$CompanyDescription$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/src/components/CompanyIntroduction/CompanyDescription.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$CompanyIntroduction$2f$PhilosophyDivider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophyDivider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$CompanyIntroduction$2f$PhilosophySections$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/src/components/CompanyIntroduction/PhilosophySections.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$CompanyIntroduction$2f$ValueProposition$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/src/components/CompanyIntroduction/ValueProposition.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$CompanyIntroduction$2f$ClosingStatement$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/src/components/CompanyIntroduction/ClosingStatement.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
const CompanyIntroduction = ()=>{
    const contentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const textContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$CompanyIntroduction$2f$hooks$2f$useScrollAnimations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScrollAnimations"])(textContainerRef);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: contentRef,
        className: "text-center min-h-screen relative flex items-center justify-center font-sans overflow-hidden",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative z-10 max-w-6xl px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$CompanyIntroduction$2f$LogoSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/index.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: textContainerRef,
                    className: "mb-30",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$CompanyIntroduction$2f$BrandPositioning$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/index.tsx",
                            lineNumber: 24,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$CompanyIntroduction$2f$CompanyDescription$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/index.tsx",
                            lineNumber: 25,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$CompanyIntroduction$2f$PhilosophyDivider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/index.tsx",
                            lineNumber: 26,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$CompanyIntroduction$2f$PhilosophySections$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/index.tsx",
                            lineNumber: 27,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$CompanyIntroduction$2f$ValueProposition$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/index.tsx",
                            lineNumber: 28,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$CompanyIntroduction$2f$ClosingStatement$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/index.tsx",
                            lineNumber: 29,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/index.tsx",
                    lineNumber: 23,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/index.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/prism_website-main/src/components/CompanyIntroduction/index.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = CompanyIntroduction;
}),
"[project]/prism_website-main/src/components/ExperienceShowcase/map/MapPoint.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MapPoint",
    ()=>MapPoint
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/gsap/index.js [app-ssr] (ecmascript) <locals>");
"use client";
;
;
;
const MapPoint = ({ point, isActive, onClick, onMouseEnter, radarIntensity = 0.8, radarSpeed = 1, radarFrequency = 0.1, hasActivePoint = false, containerRef })=>{
    const pointRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const radarRef1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const radarRef2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const radarRef3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [position, setPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        left: `${point.x}%`,
        top: `${point.y}%`
    });
    // Calculate adjusted position accounting for container padding
    const calculateAdjustedPosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        // If no container ref, use original position
        if (!containerRef?.current) {
            return {
                left: `${point.x}%`,
                top: `${point.y}%`
            };
        }
        const container = containerRef.current;
        const computedStyles = window.getComputedStyle(container);
        // Get actual padding values from computed styles
        const paddingTop = parseFloat(computedStyles.paddingTop);
        const paddingBottom = parseFloat(computedStyles.paddingBottom);
        // If no padding, use original position
        if (paddingTop === 0 && paddingBottom === 0) {
            return {
                left: `${point.x}%`,
                top: `${point.y}%`
            };
        }
        // Get container dimensions
        const containerHeight = container.offsetHeight;
        const effectiveMapHeight = containerHeight - paddingTop - paddingBottom;
        // Calculate adjusted Y position
        // Map the point.y (0-100% of map) to the effective area within the container
        const adjustedYPixels = paddingTop + point.y / 100 * effectiveMapHeight;
        const adjustedYPercent = adjustedYPixels / containerHeight * 100;
        return {
            left: `${point.x}%`,
            top: `${adjustedYPercent}%`
        };
    }, [
        containerRef,
        point.x,
        point.y
    ]);
    // Update position when container changes or on mount/resize
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const updatePosition = ()=>{
            setPosition(calculateAdjustedPosition());
        };
        // Initial calculation
        updatePosition();
        // Update on window resize
        window.addEventListener('resize', updatePosition);
        return ()=>{
            window.removeEventListener('resize', updatePosition);
        };
    }, [
        containerRef,
        point.x,
        point.y,
        calculateAdjustedPosition
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const radarRefs = [
            radarRef1.current,
            radarRef2.current,
            radarRef3.current
        ];
        if (!pointRef.current || radarRefs.some((ref)=>!ref)) return;
        if (isActive) {
            __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(pointRef.current, {
                scale: 2,
                duration: 0.3,
                ease: "back.out(1.7)"
            });
            // Stop radar effects when active
            radarRefs.forEach((ref)=>{
                if (ref) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].killTweensOf(ref);
                    __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(ref, {
                        opacity: 0
                    });
                }
            });
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(pointRef.current, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
            // Start multiple radar effects when not active with staggered timing
            radarRefs.forEach((ref, index)=>{
                if (ref) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].fromTo(ref, {
                        scale: 0.3,
                        opacity: radarIntensity
                    }, {
                        scale: 4,
                        opacity: 0,
                        duration: radarSpeed,
                        ease: "power2.out",
                        repeat: -1,
                        repeatDelay: radarFrequency * 3,
                        delay: index * radarFrequency // Stagger the start of each ring
                    });
                }
            });
        }
    }, [
        isActive,
        radarIntensity,
        radarSpeed,
        radarFrequency
    ]);
    const handleMouseEnter = ()=>{
        if (!isActive && pointRef.current) {
            __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(pointRef.current, {
                scale: 1.1,
                duration: 0.2,
                ease: "power2.out"
            });
        }
        onMouseEnter?.();
    };
    const handleMouseLeave = ()=>{
        if (!isActive && pointRef.current) {
            __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(pointRef.current, {
                scale: 1,
                duration: 0.2,
                ease: "power2.out"
            });
        }
    };
    const containerOpacity = hasActivePoint && !isActive ? 0.4 : 1;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "cursor-target absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-opacity duration-300",
        style: {
            left: position.left,
            top: position.top,
            zIndex: isActive ? 60 : 10,
            opacity: containerOpacity
        },
        "data-country": point.country,
        "data-active-map-point": isActive ? "true" : "false",
        onClick: onClick,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: radarRef1,
                className: "absolute inset-0 rounded-full border-2 pointer-events-none opacity-0",
                style: {
                    borderColor: '#F7E7CE',
                    backgroundColor: 'rgba(247, 231, 206, 0.2)' // Reduced fill opacity
                }
            }, void 0, false, {
                fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapPoint.tsx",
                lineNumber: 171,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: radarRef2,
                className: "absolute inset-0 rounded-full border pointer-events-none opacity-0",
                style: {
                    borderColor: '#F7E7CE',
                    backgroundColor: 'rgba(247, 231, 206, 0.15)'
                }
            }, void 0, false, {
                fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapPoint.tsx",
                lineNumber: 179,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: radarRef3,
                className: "absolute inset-0 rounded-full border pointer-events-none opacity-0",
                style: {
                    borderColor: '#F7E7CE',
                    backgroundColor: 'rgba(247, 231, 206, 0.1)'
                }
            }, void 0, false, {
                fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapPoint.tsx",
                lineNumber: 187,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            !isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute w-[20px] h-[20px] sm:w-[36px] sm:h-[36px] rounded-full border-2 pointer-events-none",
                style: {
                    borderColor: '#F7E7CE',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    opacity: 1
                }
            }, void 0, false, {
                fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapPoint.tsx",
                lineNumber: 198,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute pointer-events-none",
                style: {
                    width: '60px',
                    height: '60px',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute",
                        style: {
                            top: '0px',
                            left: '0px',
                            width: '12px',
                            height: '12px',
                            borderTop: '3px solid #F7E7CE',
                            borderLeft: '3px solid #F7E7CE',
                            borderRadius: '3px 0 0 0'
                        }
                    }, void 0, false, {
                        fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapPoint.tsx",
                        lineNumber: 223,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute",
                        style: {
                            top: '0px',
                            right: '0px',
                            width: '12px',
                            height: '12px',
                            borderTop: '3px solid #F7E7CE',
                            borderRight: '3px solid #F7E7CE',
                            borderRadius: '0 3px 0 0'
                        }
                    }, void 0, false, {
                        fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapPoint.tsx",
                        lineNumber: 236,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute",
                        style: {
                            bottom: '0px',
                            left: '0px',
                            width: '12px',
                            height: '12px',
                            borderBottom: '3px solid #F7E7CE',
                            borderLeft: '3px solid #F7E7CE',
                            borderRadius: '0 0 0 3px'
                        }
                    }, void 0, false, {
                        fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapPoint.tsx",
                        lineNumber: 249,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute",
                        style: {
                            bottom: '0px',
                            right: '0px',
                            width: '12px',
                            height: '12px',
                            borderBottom: '3px solid #F7E7CE',
                            borderRight: '3px solid #F7E7CE',
                            borderRadius: '0 0 3px 0'
                        }
                    }, void 0, false, {
                        fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapPoint.tsx",
                        lineNumber: 262,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapPoint.tsx",
                lineNumber: 212,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: pointRef,
                className: `relative flex items-center justify-center w-[10px] h-[10px] sm:w-[20px] sm:h-[20px] rounded-full ${isActive ? 'border border-white sm:border-2 bg-transparent shadow-lg shadow-white/60' : ''}`,
                style: {
                    backgroundColor: isActive ? 'transparent' : '#F7E7CE',
                    boxShadow: isActive ? undefined : 'inset 0 0 8px rgba(255, 255, 255, 0.8), 0 0 4px rgba(247, 231, 206, 0.6)'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-full",
                    style: {
                        width: isActive ? '8px' : '4px',
                        height: isActive ? '8px' : '4px',
                        backgroundColor: isActive ? '#F7E7CE' : '#FFFFFF',
                        opacity: isActive ? 1 : 0.9
                    }
                }, void 0, false, {
                    fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapPoint.tsx",
                    lineNumber: 293,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapPoint.tsx",
                lineNumber: 278,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapPoint.tsx",
        lineNumber: 156,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/prism_website-main/src/components/ExperienceShowcase/map/MapData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "countryDescriptions",
    ()=>countryDescriptions,
    "countryTextData",
    ()=>countryTextData,
    "countryValues",
    ()=>countryValues,
    "getCountryDescription",
    ()=>getCountryDescription,
    "getCountryTextData",
    ()=>getCountryTextData,
    "getCountryValues",
    ()=>getCountryValues,
    "getMapPointByCountry",
    ()=>getMapPointByCountry,
    "mapPoints",
    ()=>mapPoints
]);
const mapPoints = [
    {
        country: "Canada",
        chineseName: "加拿大",
        x: 15,
        y: 16,
        flag: "🇨🇦"
    },
    {
        country: "United States",
        chineseName: "美国",
        x: 15,
        y: 30,
        flag: "🇺🇸"
    },
    {
        country: "Cambodia",
        chineseName: "柬埔寨",
        x: 78.5,
        y: 49.5,
        flag: "🇰🇭"
    },
    {
        country: "China",
        chineseName: "中国",
        x: 75,
        y: 35,
        flag: "🇨🇳"
    },
    {
        country: "Australia",
        chineseName: "澳大利亚",
        x: 87,
        y: 76,
        flag: "🇦🇺"
    },
    {
        country: "New Zealand",
        chineseName: "新西兰",
        x: 97,
        y: 90,
        flag: "🇳🇿"
    }
];
const countryValues = [
    {
        country: "Canada",
        values: [
            2.5,
            82
        ]
    },
    {
        country: "United States",
        values: [
            7.5,
            85
        ]
    },
    {
        country: "Cambodia",
        values: [
            0.8,
            90
        ]
    },
    {
        country: "China",
        values: [
            45.2,
            75
        ]
    },
    {
        country: "Australia",
        values: [
            3.8,
            88
        ]
    },
    {
        country: "New Zealand",
        values: [
            1.2,
            85
        ]
    }
];
const getMapPointByCountry = (country)=>{
    return mapPoints.find((point)=>point.country === country);
};
const countryTextData = [
    {
        country: "Canada",
        section1: {
            value: "1万+ 门店",
            chineseLabel: "全品类超市 & 便利店",
            englishLabel: "Supermarket & Convenient stores"
        },
        section2: {
            value: "1200 + 门店",
            chineseLabel: "建材类超市",
            englishLabel: "Home Improvements"
        },
        section3: {
            value: "4% ~ 6%",
            chineseLabel: "同店销售额增长",
            englishLabel: "Same-Store Sales Growth"
        }
    },
    {
        country: "United States",
        section1: {
            value: "3万+ 门店",
            chineseLabel: "线下零售总门店数",
            englishLabel: "Total Retail locations"
        },
        section2: {
            value: "30+",
            chineseLabel: "成功入驻品类",
            englishLabel: "Onboard products"
        },
        section3: {
            value: "7%",
            chineseLabel: "品牌年增长率",
            englishLabel: "Annual Growth Rate"
        }
    },
    {
        country: "Cambodia",
        section1: {
            value: "500+ 门店",
            chineseLabel: "本地合作零售店",
            englishLabel: "Local Partner Stores"
        },
        section2: {
            value: "8个",
            chineseLabel: "覆盖主要城市",
            englishLabel: "Major Cities Covered"
        },
        section3: {
            value: "25%",
            chineseLabel: "市场份额增长",
            englishLabel: "Market Share Growth"
        }
    },
    {
        country: "China",
        section1: {
            value: "10万+ 门店",
            chineseLabel: "全国零售网络",
            englishLabel: "Nationwide Retail Network"
        },
        section2: {
            value: "300+",
            chineseLabel: "城市覆盖范围",
            englishLabel: "Cities Coverage"
        },
        section3: {
            value: "18%",
            chineseLabel: "数字化销售增长",
            englishLabel: "Digital Sales Growth"
        }
    },
    {
        country: "Australia",
        section1: {
            value: "2千+ 门店",
            chineseLabel: "专业药房连锁",
            englishLabel: "Pharmacy Chain Stores"
        },
        section2: {
            value: "500+",
            chineseLabel: "健康产品系列",
            englishLabel: "Health Product Lines"
        },
        section3: {
            value: "12%",
            chineseLabel: "健康市场占有率",
            englishLabel: "Health Market Share"
        }
    },
    {
        country: "New Zealand",
        section1: {
            value: "800+ 门店",
            chineseLabel: "有机食品专营店",
            englishLabel: "Organic Food Specialists"
        },
        section2: {
            value: "50+",
            chineseLabel: "天然产品品牌",
            englishLabel: "Natural Product Brands"
        },
        section3: {
            value: "15%",
            chineseLabel: "可持续产品增长",
            englishLabel: "Sustainable Product Growth"
        }
    }
];
const getCountryValues = (country)=>{
    return countryValues.find((data)=>data.country === country);
};
const getCountryTextData = (country)=>{
    return countryTextData.find((data)=>data.country === country);
};
const countryDescriptions = [
    {
        country: "Canada",
        chineseName: "加拿大",
        title: "Leading North American Retail Markets",
        chineseTitle: "北美领先零售市场",
        description: "得线下者得北美 - 加拿大线下销售占比总零售85%，线下实体店的主导地位与消费场景紧密深度绑定，北美线下销售占比93.9% BOPIS（线上购买，到店自提）盛行",
        chineseDescription: "得线下者得北美\n\n加拿大线下销售占比总零售85%，线下实体店的主导地位与消费场景紧密深度绑定，北美线下销售占比93.9% BOPIS（线上购买，到店自提）盛行"
    },
    {
        country: "United States",
        chineseName: "美国",
        title: "Dominant Offline Retail Landscape",
        chineseTitle: "主导线下零售格局",
        description: "得线下者得北美 - 美国线下销售占比总零售85%，线下实体店的主导地位与消费场景紧密深度绑定，北美线下销售占比93.9% BOPIS（线上购买，到店自提）盛行",
        chineseDescription: "得线下者得北美\n\n美国线下销售占比总零售85%，线下实体店的主导地位与消费场景紧密深度绑定，北美线下销售占比93.9% BOPIS（线上购买，到店自提）盛行"
    },
    {
        country: "Cambodia",
        chineseName: "柬埔寨",
        title: "Emerging Southeast Asian Market",
        chineseTitle: "新兴东南亚市场",
        description: "快速发展的东南亚新兴市场，拥有年轻的人口结构和不断增长的消费能力。零售业正在经历数字化转型，传统市场与现代零售渠道并存发展。",
        chineseDescription: "快速发展的东南亚新兴市场\n\n拥有年轻的人口结构和不断增长的消费能力。零售业正在经历数字化转型，传统市场与现代零售渠道并存发展。"
    },
    {
        country: "China",
        chineseName: "中国",
        title: "World's Largest Consumer Market",
        chineseTitle: "全球最大消费市场",
        description: "全球最大的消费市场，拥有超过14亿人口的巨大消费潜力。新零售模式引领全球，线上线下深度融合，移动支付普及率全球领先，消费升级趋势明显。",
        chineseDescription: "全球最大的消费市场\n\n拥有超过14亿人口的巨大消费潜力。新零售模式引领全球，线上线下深度融合，移动支付普及率全球领先，消费升级趋势明显。"
    },
    {
        country: "Australia",
        chineseName: "澳大利亚",
        title: "Premium Health & Wellness Market",
        chineseTitle: "高端健康养生市场",
        description: "成熟的健康养生市场，消费者注重产品质量和可持续性。有机食品、天然保健品需求旺盛，零售业高度集中，连锁经营模式成熟。",
        chineseDescription: "成熟的健康养生市场\n\n消费者注重产品质量和可持续性。有机食品、天然保健品需求旺盛，零售业高度集中，连锁经营模式成熟。"
    },
    {
        country: "New Zealand",
        chineseName: "新西兰",
        title: "Sustainable & Organic Focus",
        chineseTitle: "可持续有机理念",
        description: "以可持续发展和有机产品为核心的市场，消费者环保意识强烈。农业优势明显，绿色食品和天然产品享誉全球，小而精的零售模式。",
        chineseDescription: "以可持续发展和有机产品为核心\n\n消费者环保意识强烈。农业优势明显，绿色食品和天然产品享誉全球，小而精的零售模式。"
    }
];
const getCountryDescription = (country)=>{
    return countryDescriptions.find((data)=>data.country === country);
};
}),
"[project]/prism_website-main/src/components/ExperienceShowcase/map/MapSelector.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MapSelector",
    ()=>MapSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/gsap/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/gsap/ScrollTrigger.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$ExperienceShowcase$2f$map$2f$MapPoint$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/src/components/ExperienceShowcase/map/MapPoint.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$ExperienceShowcase$2f$map$2f$MapData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/src/components/ExperienceShowcase/map/MapData.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const MapSelector = ({ autoRotateInterval = 3000, pauseOnHover = true, className = "", onCountryChange, flagItems, selectedIndex = 0 })=>{
    const currentIndex = selectedIndex;
    const [isHovered, setIsHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const intervalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mapContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mapImageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mapPointsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const goToNext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const nextIndex = (currentIndex + 1) % flagItems.length;
        onCountryChange?.(flagItems[nextIndex].country, nextIndex);
    }, [
        currentIndex,
        onCountryChange,
        flagItems
    ]);
    const goToIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((index)=>{
        if (index >= 0 && index < flagItems.length) {
            onCountryChange?.(flagItems[index].country, index);
        }
    }, [
        onCountryChange,
        flagItems
    ]);
    // Initialize GSAP ScrollTrigger
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
        if (mapImageRef.current && mapPointsRef.current) {
            // Initial state - map and points are scaled down and faded
            __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set([
                mapImageRef.current,
                mapPointsRef.current
            ], {
                scale: 0.8,
                opacity: 0.3,
                y: 30,
                transformOrigin: "center center"
            });
            // Create scroll-triggered animation for both map and points
            __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to([
                mapImageRef.current,
                mapPointsRef.current
            ], {
                scale: 1,
                opacity: 1,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: mapContainerRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    scrub: 1,
                    toggleActions: "play none none reverse"
                }
            });
        }
        return ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollTrigger"].getAll().forEach((trigger)=>trigger.kill());
        };
    }, []);
    // Auto-rotation logic
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!pauseOnHover || !isHovered) {
            intervalRef.current = setInterval(goToNext, autoRotateInterval);
        }
        return ()=>{
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [
        goToNext,
        autoRotateInterval,
        isHovered,
        pauseOnHover
    ]);
    const handleMouseEnter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (pauseOnHover) {
            setIsHovered(true);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }
    }, [
        pauseOnHover
    ]);
    const handleMouseLeave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (pauseOnHover) {
            setIsHovered(false);
        }
    }, [
        pauseOnHover
    ]);
    const handlePointClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((country)=>{
        const flagIndex = flagItems.findIndex((flag)=>flag.country === country);
        if (flagIndex !== -1) {
            goToIndex(flagIndex);
        }
    }, [
        flagItems,
        goToIndex
    ]);
    const handlePointHover = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((country)=>{
        if (pauseOnHover && isHovered) {
            const flagIndex = flagItems.findIndex((flag)=>flag.country === country);
            if (flagIndex !== -1) {
                goToIndex(flagIndex);
            }
        }
    }, [
        flagItems,
        goToIndex,
        pauseOnHover,
        isHovered
    ]);
    const handleKeyDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event)=>{
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            const prevIndex = (currentIndex - 1 + flagItems.length) % flagItems.length;
            goToIndex(prevIndex);
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            const nextIndex = (currentIndex + 1) % flagItems.length;
            goToIndex(nextIndex);
        }
    }, [
        goToIndex,
        currentIndex,
        flagItems.length
    ]);
    const selectedCountry = flagItems[currentIndex]?.country || "Canada";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative ${className}`,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onKeyDown: handleKeyDown,
        tabIndex: 0,
        role: "tablist",
        "aria-label": "Interactive country selection map",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: mapContainerRef,
            className: "py-64 sm:py-24 md:py-18 lg:py-8 relative",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    ref: mapImageRef,
                    src: "/Map/Map.png",
                    alt: "Interactive Geographic Map",
                    className: "w-full h-auto object-contain",
                    style: {
                        maxWidth: "100%",
                        height: "auto",
                        width: "100%",
                        filter: "invert(1) brightness(0.8)",
                        opacity: 0.6
                    }
                }, void 0, false, {
                    fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapSelector.tsx",
                    lineNumber: 152,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: mapPointsRef,
                    className: "absolute inset-0",
                    style: {
                        zIndex: 60
                    },
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$ExperienceShowcase$2f$map$2f$MapData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapPoints"].map((point)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$ExperienceShowcase$2f$map$2f$MapPoint$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MapPoint"], {
                            point: point,
                            isActive: selectedCountry === point.country,
                            onClick: ()=>handlePointClick(point.country),
                            onMouseEnter: ()=>handlePointHover(point.country),
                            radarIntensity: 0.8,
                            radarSpeed: 1,
                            radarFrequency: 0.1,
                            hasActivePoint: true,
                            containerRef: mapContainerRef
                        }, point.country, false, {
                            fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapSelector.tsx",
                            lineNumber: 173,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)))
                }, void 0, false, {
                    fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapSelector.tsx",
                    lineNumber: 167,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapSelector.tsx",
            lineNumber: 151,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapSelector.tsx",
        lineNumber: 141,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/prism_website-main/src/components/ExperienceShowcase/map/MapInfoPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/gsap/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$ExperienceShowcase$2f$map$2f$MapData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/src/components/ExperienceShowcase/map/MapData.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const MapInfoPanel = ({ selectedCountry })=>{
    const textContentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Get country-specific text data
    const textData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$ExperienceShowcase$2f$map$2f$MapData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCountryTextData"])(selectedCountry);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!containerRef.current || !textContentRef.current) return;
        // Set initial states
        __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(containerRef.current, {
            opacity: 0,
            scaleX: 0
        });
        // Create timeline for entrance animation
        const tl = __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
            delay: 0.6
        });
        tl.to(containerRef.current, {
            opacity: 1,
            scaleX: 1,
            duration: 0.2,
            ease: "back.out(0.5)"
        });
    }, [
        selectedCountry
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "mt-8 mb-12 min-h-[340px] sm:min-h-[240px] flex items-center",
        "data-map-info-panel": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full px-4 sm:px-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: textContentRef,
                className: "relative grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 text-center text-white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-3xl sm:text-4xl font-bold text-white",
                                children: textData?.section1.value || "3万+ 门店"
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapInfoPanel.tsx",
                                lineNumber: 49,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm font-chinese text-white/80",
                                children: textData?.section1.chineseLabel || "线下零售总门店数"
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapInfoPanel.tsx",
                                lineNumber: 52,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-white/60",
                                children: textData?.section1.englishLabel || "Total Retail locations"
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapInfoPanel.tsx",
                                lineNumber: 55,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapInfoPanel.tsx",
                        lineNumber: 48,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden sm:block absolute left-1/3 top-1/2 transform -translate-y-1/2 w-px h-16 bg-white/20"
                    }, void 0, false, {
                        fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapInfoPanel.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-3xl sm:text-4xl font-bold text-white",
                                children: textData?.section2.value || "30+"
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapInfoPanel.tsx",
                                lineNumber: 65,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm font-chinese text-white/80",
                                children: textData?.section2.chineseLabel || "成功入驻品类"
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapInfoPanel.tsx",
                                lineNumber: 68,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-white/60",
                                children: textData?.section2.englishLabel || "Onboard products"
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapInfoPanel.tsx",
                                lineNumber: 71,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapInfoPanel.tsx",
                        lineNumber: 64,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden sm:block absolute left-2/3 top-1/2 transform -translate-y-1/2 w-px h-16 bg-white/20"
                    }, void 0, false, {
                        fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapInfoPanel.tsx",
                        lineNumber: 77,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-3xl sm:text-4xl font-bold text-white",
                                children: textData?.section3.value || "7%"
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapInfoPanel.tsx",
                                lineNumber: 81,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm font-chinese text-white/80",
                                children: textData?.section3.chineseLabel || "品牌年增长率"
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapInfoPanel.tsx",
                                lineNumber: 84,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-white/60",
                                children: textData?.section3.englishLabel || "Annual Growth Rate"
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapInfoPanel.tsx",
                                lineNumber: 87,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapInfoPanel.tsx",
                        lineNumber: 80,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapInfoPanel.tsx",
                lineNumber: 46,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapInfoPanel.tsx",
            lineNumber: 45,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapInfoPanel.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = MapInfoPanel;
}),
"[project]/prism_website-main/src/components/ExperienceShowcase/map/StatisticsDisplay.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/gsap/index.js [app-ssr] (ecmascript) <locals>");
"use client";
;
;
;
const StatisticsDisplay = ({ data })=>{
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const itemsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!containerRef.current) return;
        // Set initial states
        itemsRef.current.forEach((item)=>{
            if (item) {
                __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(item, {
                    opacity: 0,
                    y: 20
                });
            }
        });
        // Animate items in sequence
        const tl = __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
            delay: 0.3
        });
        itemsRef.current.forEach((item, index)=>{
            if (item) {
                tl.to(item, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out"
                }, index * 0.2);
            }
        });
    }, [
        data
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "space-y-8",
        children: data.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: (el)=>{
                    itemsRef.current[index] = el;
                },
                className: "flex items-center gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white min-w-[120px] text-center",
                        children: item.value
                    }, void 0, false, {
                        fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/StatisticsDisplay.tsx",
                        lineNumber: 54,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 space-y-1 text-right",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[10px] sm:text-xs md:text-base font-medium text-white/90",
                                children: item.chineseLabel
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/StatisticsDisplay.tsx",
                                lineNumber: 58,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[10px] sm:text-xs md:text-base text-white/70",
                                children: item.englishLabel
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/StatisticsDisplay.tsx",
                                lineNumber: 61,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/StatisticsDisplay.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, index, true, {
                fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/StatisticsDisplay.tsx",
                lineNumber: 49,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)))
    }, void 0, false, {
        fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/StatisticsDisplay.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = StatisticsDisplay;
}),
"[project]/prism_website-main/src/components/ExperienceShowcase/map/MapHUD.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/gsap/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$ExperienceShowcase$2f$map$2f$StatisticsDisplay$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/src/components/ExperienceShowcase/map/StatisticsDisplay.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$ExperienceShowcase$2f$map$2f$MapData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/src/components/ExperienceShowcase/map/MapData.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const MapHUD = ({ isVisible, selectedCountry, currentLogos, shouldUseStaticGrid, logoGroups, hubPosition, onClose, mapContainerRef })=>{
    const hudRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const contentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // State for dynamic dimensions
    const [hudDimensions, setHudDimensions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        width: 400,
        height: 300
    });
    // Calculate dynamic HUD dimensions based on map container size
    const calculateHudDimensions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((mapWidth, mapHeight)=>{
        // Use full map width for the unified HUD
        const constrainedWidth = mapWidth;
        // Use actual map height and extend bottom slightly
        const constrainedHeight = mapHeight + 40;
        return {
            width: constrainedWidth,
            height: constrainedHeight
        };
    }, []);
    const countryInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$ExperienceShowcase$2f$map$2f$MapData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCountryValues"])(selectedCountry);
    const values = countryInfo?.values || [
        2.5,
        82
    ];
    const countryDescription = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$ExperienceShowcase$2f$map$2f$MapData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCountryDescription"])(selectedCountry);
    const getCountryChineseName = (country)=>{
        const nameMap = {
            "Canada": "加拿大",
            "United States": "美国",
            "Cambodia": "柬埔寨",
            "China": "中国",
            "Australia": "澳大利亚",
            "New Zealand": "新西兰"
        };
        return nameMap[country] || country;
    };
    const getCurrency = (country)=>{
        if (country === "United States") return "美金";
        if (country === "China") return "人民币";
        return "美金";
    };
    const chineseName = getCountryChineseName(selectedCountry);
    const currency = getCurrency(selectedCountry);
    const statisticsData = [
        {
            value: `${values[0]}万亿${currency}`,
            chineseLabel: `2024年${chineseName}全年零售总额`,
            englishLabel: `2024 ${selectedCountry} Annual Retail Total`
        },
        {
            value: `${values[1]}%+`,
            chineseLabel: "线下实体零售占比",
            englishLabel: "Offline Physical Retail Share"
        }
    ];
    // ResizeObserver to monitor map container size changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!mapContainerRef.current) return;
        const updateDimensions = ()=>{
            if (mapContainerRef.current) {
                // Use the container's outer dimensions
                const containerWidth = mapContainerRef.current.offsetWidth;
                const containerHeight = mapContainerRef.current.offsetHeight;
                const newDimensions = calculateHudDimensions(containerWidth, containerHeight);
                setHudDimensions(newDimensions);
            }
        };
        updateDimensions();
        if (!window.ResizeObserver) {
            window.addEventListener("resize", updateDimensions);
            return ()=>window.removeEventListener("resize", updateDimensions);
        }
        const observer = new ResizeObserver(updateDimensions);
        observer.observe(mapContainerRef.current);
        window.addEventListener("resize", updateDimensions);
        return ()=>{
            observer.disconnect();
            window.removeEventListener("resize", updateDimensions);
        };
    }, [
        mapContainerRef,
        calculateHudDimensions
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!hudRef.current || !contentRef.current) return;
        if (isVisible) {
            __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(hudRef.current, {
                y: '-100%',
                opacity: 0,
                scale: 0.9
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(contentRef.current, {
                opacity: 0,
                y: 10
            });
            hudRef.current.style.display = 'block';
            const tl = __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline();
            tl.to(hudRef.current, {
                y: '0%',
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: "back.out(1.5)"
            }).to(contentRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            }, "-=0.2");
        } else {
            const tl = __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
                onComplete: ()=>{
                    if (hudRef.current) {
                        hudRef.current.style.display = 'none';
                    }
                }
            });
            tl.to(contentRef.current, {
                opacity: 0,
                y: -10,
                duration: 0.2,
                ease: "power2.in"
            }).to(hudRef.current, {
                y: '-100%',
                opacity: 0,
                scale: 0.9,
                duration: 0.3,
                ease: "back.in(1.2)"
            }, "-=0.1");
        }
    }, [
        isVisible,
        selectedCountry,
        hubPosition
    ]);
    if (!isVisible) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: hudRef,
        className: "absolute top-0 left-0 right-0 rounded-lg z-50 overflow-hidden",
        style: {
            display: 'none',
            width: `${hudDimensions.width}px`,
            height: `${hudDimensions.height}px`,
            margin: '0 auto'
        },
        onClick: (e)=>e.stopPropagation(),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none z-0 bg-black/50 md:bg-transparent"
            }, void 0, false, {
                fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapHUD.tsx",
                lineNumber: 198,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none z-0 hidden md:block",
                style: {
                    background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
                }
            }, void 0, false, {
                fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapHUD.tsx",
                lineNumber: 199,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-3 right-3 z-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    className: "p-2 rounded-full hover:bg-white/20 transition-colors duration-200 text-white",
                    "aria-label": "Close HUD",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-5 h-5",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M6 18L18 6M6 6l12 12"
                        }, void 0, false, {
                            fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapHUD.tsx",
                            lineNumber: 214,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapHUD.tsx",
                        lineNumber: 213,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapHUD.tsx",
                    lineNumber: 208,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapHUD.tsx",
                lineNumber: 207,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: contentRef,
                className: "h-full flex flex-col md:flex-row relative z-10",
                children: (()=>{
                    // Country Info Component
                    const CountryInfoSection = ()=>{
                        const alignmentClass = hubPosition === 'left' ? 'text-left md:text-right' : 'text-left';
                        // Countries in lower part of map (Australia, New Zealand) should align to top
                        const isLowerCountry = selectedCountry === 'Australia' || selectedCountry === 'New Zealand';
                        const verticalAlignment = isLowerCountry ? 'justify-start' : 'justify-end';
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `w-full md:w-1/2 pt-16 p-4 flex flex-col ${verticalAlignment}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `space-y-2 ${alignmentClass}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-2xl font-bold text-white",
                                            children: countryDescription?.chineseName
                                        }, void 0, false, {
                                            fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapHUD.tsx",
                                            lineNumber: 235,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapHUD.tsx",
                                        lineNumber: 232,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    countryDescription && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `space-y-3 ${alignmentClass} ${hubPosition === 'left' ? 'items-end' : 'items-start'} flex flex-col`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-white/90 leading-relaxed font-chinese whitespace-pre-line max-w-sm",
                                            children: countryDescription.chineseDescription
                                        }, void 0, false, {
                                            fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapHUD.tsx",
                                            lineNumber: 243,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapHUD.tsx",
                                        lineNumber: 242,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapHUD.tsx",
                                lineNumber: 230,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapHUD.tsx",
                            lineNumber: 229,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0));
                    };
                    // Market Data Component
                    const MarketDataSection = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full md:w-1/2 flex flex-col relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 pointer-events-none z-0",
                                    style: {
                                        background: hubPosition === 'left' ? 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)' : 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapHUD.tsx",
                                    lineNumber: 257,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 overflow-y-auto p-3 space-y-4 scrollbar-hide relative z-10",
                                    style: {
                                        scrollbarWidth: 'none',
                                        msOverflowStyle: 'none'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "text-xs font-medium text-white/80 uppercase tracking-wider text-left",
                                                    children: "Market Data"
                                                }, void 0, false, {
                                                    fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapHUD.tsx",
                                                    lineNumber: 271,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$ExperienceShowcase$2f$map$2f$StatisticsDisplay$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    data: statisticsData
                                                }, void 0, false, {
                                                    fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapHUD.tsx",
                                                    lineNumber: 274,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapHUD.tsx",
                                            lineNumber: 270,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "text-xs font-medium text-white/80 uppercase tracking-wider text-left",
                                                    children: "Partners"
                                                }, void 0, false, {
                                                    fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapHUD.tsx",
                                                    lineNumber: 279,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-white/10 rounded-lg p-2",
                                                    children: (()=>{
                                                        let allLogos = [];
                                                        if (shouldUseStaticGrid) {
                                                            allLogos = currentLogos;
                                                        } else if (logoGroups.useOneGroup) {
                                                            allLogos = logoGroups.group1;
                                                        } else {
                                                            allLogos = [
                                                                ...logoGroups.group1,
                                                                ...logoGroups.group2,
                                                                ...logoGroups.useTwoGroups ? [] : logoGroups.group3
                                                            ];
                                                        }
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "grid grid-cols-4 gap-2 justify-items-center items-center",
                                                            children: allLogos.map((logo, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "bg-white/40 border border-white/30 rounded-md p-1 hover:scale-105 hover:border-white/50 transition-all duration-200 w-full h-16 flex items-center justify-center",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                        src: logo.src,
                                                                        alt: logo.title,
                                                                        className: "h-10 w-auto object-contain max-w-full grayscale contrast-150 brightness-110 hover:grayscale-0 hover:contrast-100 hover:brightness-100 transition-all duration-300",
                                                                        onError: (e)=>{
                                                                            console.error(`Failed to load logo: ${logo.src}`);
                                                                            e.currentTarget.style.display = 'none';
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapHUD.tsx",
                                                                        lineNumber: 306,
                                                                        columnNumber: 31
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, `${selectedCountry}-${index}`, false, {
                                                                    fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapHUD.tsx",
                                                                    lineNumber: 302,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0)))
                                                        }, void 0, false, {
                                                            fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapHUD.tsx",
                                                            lineNumber: 300,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0));
                                                    })()
                                                }, void 0, false, {
                                                    fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapHUD.tsx",
                                                    lineNumber: 283,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapHUD.tsx",
                                            lineNumber: 278,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapHUD.tsx",
                                    lineNumber: 268,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapHUD.tsx",
                            lineNumber: 255,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0));
                    // On mobile: always country info on top
                    // On desktop: conditional layout based on hubPosition
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "block md:hidden w-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CountryInfoSection, {}, void 0, false, {
                                    fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapHUD.tsx",
                                    lineNumber: 332,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapHUD.tsx",
                                lineNumber: 331,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "block md:hidden w-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MarketDataSection, {}, void 0, false, {
                                    fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapHUD.tsx",
                                    lineNumber: 335,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapHUD.tsx",
                                lineNumber: 334,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden md:flex w-full",
                                children: hubPosition === 'left' ? // Left side countries: Market data on left, country info on right
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MarketDataSection, {}, void 0, false, {
                                            fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapHUD.tsx",
                                            lineNumber: 343,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CountryInfoSection, {}, void 0, false, {
                                            fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapHUD.tsx",
                                            lineNumber: 344,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true) : // Right side countries: Country info on left, market data on right
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CountryInfoSection, {}, void 0, false, {
                                            fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapHUD.tsx",
                                            lineNumber: 349,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MarketDataSection, {}, void 0, false, {
                                            fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapHUD.tsx",
                                            lineNumber: 350,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapHUD.tsx",
                                lineNumber: 339,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true);
                })()
            }, void 0, false, {
                fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapHUD.tsx",
                lineNumber: 219,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/map/MapHUD.tsx",
        lineNumber: 186,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = MapHUD;
}),
"[project]/prism_website-main/src/components/ExperienceShowcase/map/LogoShowcaseData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "flagItems",
    ()=>flagItems,
    "getLogoGroupsForCountry",
    ()=>getLogoGroupsForCountry,
    "logoItems",
    ()=>logoItems,
    "logosByCountry",
    ()=>logosByCountry,
    "splitLogosIntoThreeGroups",
    ()=>splitLogosIntoThreeGroups,
    "splitLogosIntoTwoGroups",
    ()=>splitLogosIntoTwoGroups
]);
const flagItems = [
    {
        country: "Canada",
        flag: "🇨🇦"
    },
    {
        country: "United States",
        flag: "🇺🇸"
    },
    {
        country: "Cambodia",
        flag: "🇰🇭"
    },
    {
        country: "China",
        flag: "🇨🇳"
    },
    {
        country: "Australia",
        flag: "🇦🇺"
    },
    {
        country: "New Zealand",
        flag: "🇳🇿"
    }
];
const logosByCountry = {
    "Canada": [
        {
            src: "/Logos/Canada/Brunet.png",
            title: "Brunet"
        },
        {
            src: "/Logos/Canada/CanadianTire.png",
            title: "Canadian Tire"
        },
        {
            src: "/Logos/Canada/Costco.png",
            title: "Costco"
        },
        {
            src: "/Logos/Canada/CoucheTard.png",
            title: "Couche-Tard"
        },
        {
            src: "/Logos/Canada/Filgo.webp",
            title: "Filgo"
        },
        {
            src: "/Logos/Canada/GiantTiger.jpeg",
            title: "Giant Tiger"
        },
        {
            src: "/Logos/Canada/Harnois.png",
            title: "Harnois"
        },
        {
            src: "/Logos/Canada/IGA.png",
            title: "IGA"
        },
        {
            src: "/Logos/Canada/JianCoutu.png",
            title: "Jean Coutu"
        },
        {
            src: "/Logos/Canada/Maxi.png",
            title: "Maxi"
        },
        {
            src: "/Logos/Canada/Metro.png",
            title: "Metro"
        },
        {
            src: "/Logos/Canada/Pharmaprix.png",
            title: "Pharmaprix"
        },
        {
            src: "/Logos/Canada/Provigo.png",
            title: "Provigo"
        },
        {
            src: "/Logos/Canada/SevenEleven.png",
            title: "7-11"
        },
        {
            src: "/Logos/Canada/SuperC.png",
            title: "Super C"
        },
        {
            src: "/Logos/Canada/Walmart.png",
            title: "Walmart"
        }
    ],
    "United States": [
        {
            src: "/Logos/US/TheHomeDepot.jpeg",
            title: "The Home Depot"
        },
        {
            src: "/Logos/US/Lowes.avif",
            title: "Lowe's"
        },
        {
            src: "/Logos/US/Target.png",
            title: "Target"
        },
        {
            src: "/Logos/US/Costco.png",
            title: "Costco"
        },
        {
            src: "/Logos/US/Walmart.png",
            title: "Walmart"
        },
        {
            src: "/Logos/US/TraderJoes.jpg",
            title: "Trader Joe's"
        },
        {
            src: "/Logos/US/AceHardware.png",
            title: "Ace Hardware"
        },
        {
            src: "/Logos/US/WholeFoods.png",
            title: "Whole Foods"
        },
        {
            src: "/Logos/US/BestBuy.png",
            title: "Best Buy"
        },
        {
            src: "/Logos/US/HMart.webp",
            title: "H-Mart"
        },
        {
            src: "/Logos/US/Mitsuwa.png",
            title: "Mitsuwa"
        },
        {
            src: "/Logos/US/Kroger.png",
            title: "Kroger"
        },
        {
            src: "/Logos/US/RiteAid.png",
            title: "Rite Aid"
        },
        {
            src: "/Logos/US/99RanchMarket.png",
            title: "99 Ranch Market"
        },
        {
            src: "/Logos/US/Walgreens.jpg",
            title: "Walgreens"
        }
    ],
    "Cambodia": [
        {
            src: "/Logos/Cambodia/LuckySupermarket.jpg",
            title: "Lucky Supermarket"
        }
    ],
    "China": [
        {
            src: "/Logos/China/SamsClub.png",
            title: "Sam's Club"
        }
    ],
    "Australia": [
        {
            src: "/Logos/Australia/Aldi.png",
            title: "Aldi"
        },
        {
            src: "/Logos/Australia/Coles.png",
            title: "Coles"
        },
        {
            src: "/Logos/Australia/Countdown.png",
            title: "Countdown"
        }
    ],
    "New Zealand": [
        {
            src: "/Logos/New Zealand/Countdown.png",
            title: "Countdown"
        },
        {
            src: "/Logos/New Zealand/NewWorld.png",
            title: "New World"
        },
        {
            src: "/Logos/New Zealand/PaknSave.png",
            title: "Pak'n Save"
        }
    ]
};
const splitLogosIntoThreeGroups = (logos)=>{
    const group1 = [];
    const group2 = [];
    const group3 = [];
    logos.forEach((logo, index)=>{
        const groupIndex = index % 3;
        if (groupIndex === 0) {
            group1.push(logo);
        } else if (groupIndex === 1) {
            group2.push(logo);
        } else {
            group3.push(logo);
        }
    });
    return {
        group1,
        group2,
        group3
    };
};
const splitLogosIntoTwoGroups = (logos)=>{
    const group1 = [];
    const group2 = [];
    logos.forEach((logo, index)=>{
        if (index % 2 === 0) {
            group1.push(logo);
        } else {
            group2.push(logo);
        }
    });
    return {
        group1,
        group2
    };
};
const getLogoGroupsForCountry = (country)=>{
    const logos = logosByCountry[country] || logosByCountry["Canada"];
    // Use 1 group for United States and Canada, 1 group for smaller countries
    if (country === "United States" || country === "Canada") {
        return {
            group1: logos,
            group2: [],
            group3: [],
            useTwoGroups: false,
            useOneGroup: true
        };
    } else if (country === "Japan" || logos.length <= 3) {
        return {
            group1: logos,
            group2: [],
            group3: [],
            useTwoGroups: false,
            useOneGroup: true
        };
    } else {
        const { group1, group2, group3 } = splitLogosIntoThreeGroups(logos);
        return {
            group1,
            group2,
            group3,
            useTwoGroups: false
        };
    }
};
const logoItems = logosByCountry["Canada"];
}),
"[project]/prism_website-main/src/components/ExperienceShowcase/DecryptedText.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const DecryptedText = ({ text, className = '', decryptSpeed = 50 })=>{
    const [displayText, setDisplayText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(text);
    const [isAnimating, setIsAnimating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const intervalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const timeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    const encryptText = ()=>{
        if (isAnimating) return;
        setIsAnimating(true);
        let iteration = 0;
        intervalRef.current = setInterval(()=>{
            setDisplayText(()=>text.split('').map((char, index)=>{
                    if (char === ' ') return ' ';
                    if (index < iteration) {
                        return text[index];
                    }
                    return characters[Math.floor(Math.random() * characters.length)];
                }).join(''));
            if (iteration >= text.length) {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }
                setDisplayText(text);
                setIsAnimating(false);
            }
            iteration += 1 / 3;
        }, decryptSpeed);
    };
    const resetText = ()=>{
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsAnimating(false);
        setDisplayText(text);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>{
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `font-mono tracking-wide cursor-pointer select-none ${className}`,
        onMouseEnter: encryptText,
        onMouseLeave: resetText,
        children: displayText
    }, void 0, false, {
        fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/DecryptedText.tsx",
        lineNumber: 82,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = DecryptedText;
}),
"[project]/prism_website-main/src/components/ExperienceShowcase/HudConnector.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/gsap/index.js [app-ssr] (ecmascript) <locals>");
"use client";
;
;
;
const HudConnector = ({ elements, positions = {
    from: 'mid',
    to: 'mid'
}, endTypes = {
    from: 'none',
    to: 'none'
}, endSizes = {
    from: 6,
    to: 6
}, colors = {
    stroke: "rgba(156, 163, 175, 0.8)",
    end: "rgba(156, 163, 175, 0.8)"
}, offsets = {
    from: {
        x: 0,
        y: 0
    },
    to: {
        x: 0,
        y: 0
    }
}, connectorType = 'straight', direction = 'horizontal-first', animated = true, className = "", strokeWidth = 2 })=>{
    const svgRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pathRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const markerStartRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const markerEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [path, setPath] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [svgDimensions, setSvgDimensions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        width: 0,
        height: 0,
        left: 0,
        top: 0
    });
    const [showMarkers, setShowMarkers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(!animated);
    const animationFrameRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastPositionsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        from: null,
        to: null
    });
    const getElementPosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((element, position)=>{
        let el = null;
        if (typeof element === 'string') {
            el = document.querySelector(element);
        } else if (element.current) {
            el = element.current;
        }
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        switch(position){
            case 'left':
                return {
                    x: rect.left,
                    y: rect.top + rect.height / 2
                };
            case 'right':
                return {
                    x: rect.right,
                    y: rect.top + rect.height / 2
                };
            case 'top':
                return {
                    x: rect.left + rect.width / 2,
                    y: rect.top
                };
            case 'bottom':
                return {
                    x: rect.left + rect.width / 2,
                    y: rect.bottom
                };
            case 'mid':
            default:
                return {
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2
                };
        }
    }, []);
    const generatePath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((from, to, type, direction = 'horizontal-first')=>{
        switch(type){
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
    const createEndMarker = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((endType, size, id)=>{
        const markerSize = size;
        const halfSize = size / 2;
        const isStart = id.includes('start');
        switch(endType){
            case 'arrow':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("marker", {
                    id: id,
                    markerWidth: markerSize,
                    markerHeight: markerSize,
                    refX: markerSize - 1,
                    refY: halfSize,
                    orient: "auto",
                    markerUnits: "strokeWidth",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        ref: isStart ? markerStartRef : markerEndRef,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                            points: `0,0 0,${markerSize} ${markerSize},${halfSize}`,
                            fill: colors.end || "rgba(156, 163, 175, 0.8)"
                        }, void 0, false, {
                            fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/HudConnector.tsx",
                            lineNumber: 170,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/HudConnector.tsx",
                        lineNumber: 169,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/HudConnector.tsx",
                    lineNumber: 160,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
            case 'circle':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("marker", {
                    id: id,
                    markerWidth: markerSize,
                    markerHeight: markerSize,
                    refX: halfSize,
                    refY: halfSize,
                    orient: "auto",
                    markerUnits: "strokeWidth",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        ref: isStart ? markerStartRef : markerEndRef,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: halfSize,
                            cy: halfSize,
                            r: halfSize,
                            fill: colors.end || "rgba(156, 163, 175, 0.8)"
                        }, void 0, false, {
                            fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/HudConnector.tsx",
                            lineNumber: 189,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/HudConnector.tsx",
                        lineNumber: 188,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/HudConnector.tsx",
                    lineNumber: 179,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
            case 'hollow-circle':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("marker", {
                    id: id,
                    markerWidth: markerSize,
                    markerHeight: markerSize,
                    refX: halfSize,
                    refY: halfSize,
                    orient: "auto",
                    markerUnits: "strokeWidth",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        ref: isStart ? markerStartRef : markerEndRef,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: halfSize,
                            cy: halfSize,
                            r: halfSize - 1,
                            fill: "none",
                            stroke: colors.end || "rgba(156, 163, 175, 0.8)",
                            strokeWidth: "1"
                        }, void 0, false, {
                            fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/HudConnector.tsx",
                            lineNumber: 210,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/HudConnector.tsx",
                        lineNumber: 209,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/HudConnector.tsx",
                    lineNumber: 200,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
            case 'square':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("marker", {
                    id: id,
                    markerWidth: markerSize,
                    markerHeight: markerSize,
                    refX: halfSize,
                    refY: halfSize,
                    orient: "auto",
                    markerUnits: "strokeWidth",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        ref: isStart ? markerStartRef : markerEndRef,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                            x: "0",
                            y: "0",
                            width: markerSize,
                            height: markerSize,
                            fill: colors.end || "rgba(156, 163, 175, 0.8)"
                        }, void 0, false, {
                            fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/HudConnector.tsx",
                            lineNumber: 233,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/HudConnector.tsx",
                        lineNumber: 232,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/HudConnector.tsx",
                    lineNumber: 223,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
            case 'diamond':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("marker", {
                    id: id,
                    markerWidth: markerSize,
                    markerHeight: markerSize,
                    refX: halfSize,
                    refY: halfSize,
                    orient: "auto",
                    markerUnits: "strokeWidth",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        ref: isStart ? markerStartRef : markerEndRef,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                            points: `${halfSize},0 ${markerSize},${halfSize} ${halfSize},${markerSize} 0,${halfSize}`,
                            fill: colors.end || "rgba(156, 163, 175, 0.8)"
                        }, void 0, false, {
                            fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/HudConnector.tsx",
                            lineNumber: 255,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/HudConnector.tsx",
                        lineNumber: 254,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/HudConnector.tsx",
                    lineNumber: 245,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
            default:
                return null;
        }
    }, [
        colors.end
    ]);
    const calculateConnector = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
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
        if (lastPositions.from && lastPositions.to && Math.abs(lastPositions.from.x - offsetFromPos.x) < 1 && Math.abs(lastPositions.from.y - offsetFromPos.y) < 1 && Math.abs(lastPositions.to.x - offsetToPos.x) < 1 && Math.abs(lastPositions.to.y - offsetToPos.y) < 1) {
            return;
        }
        // Update last positions
        lastPositionsRef.current = {
            from: offsetFromPos,
            to: offsetToPos
        };
        const minX = Math.min(offsetFromPos.x, offsetToPos.x) - 20;
        const minY = Math.min(offsetFromPos.y, offsetToPos.y) - 20;
        const maxX = Math.max(offsetFromPos.x, offsetToPos.x) + 20;
        const maxY = Math.max(offsetFromPos.y, offsetToPos.y) + 20;
        const adjustedFrom = {
            x: offsetFromPos.x - minX,
            y: offsetFromPos.y - minY
        };
        const adjustedTo = {
            x: offsetToPos.x - minX,
            y: offsetToPos.y - minY
        };
        setSvgDimensions({
            width: maxX - minX,
            height: maxY - minY,
            left: minX,
            top: minY
        });
        setPath(generatePath(adjustedFrom, adjustedTo, connectorType, direction));
    }, [
        elements.from,
        elements.to,
        positions.from,
        positions.to,
        offsets.from,
        offsets.to,
        connectorType,
        direction,
        getElementPosition,
        generatePath
    ]);
    const startAnimationFrameTracking = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const trackPositions = ()=>{
            calculateConnector();
            animationFrameRef.current = requestAnimationFrame(trackPositions);
        };
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        animationFrameRef.current = requestAnimationFrame(trackPositions);
    }, [
        calculateConnector
    ]);
    const stopAnimationFrameTracking = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        calculateConnector();
        const handleResize = ()=>calculateConnector();
        const handleScroll = ()=>calculateConnector();
        // Start animation frame tracking for smooth position updates
        startAnimationFrameTracking();
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);
        const resizeObserver = new ResizeObserver(()=>calculateConnector());
        // MutationObserver to track position changes from animations/transforms
        const mutationObserver = new MutationObserver(()=>calculateConnector());
        // Set up observers for both elements
        const setupObservers = (element)=>{
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
                    attributeFilter: [
                        'style',
                        'class',
                        'transform'
                    ],
                    childList: true,
                    subtree: true
                });
                // Also observe parent elements for layout changes
                let parent = el.parentElement;
                while(parent && parent !== document.body){
                    mutationObserver.observe(parent, {
                        attributes: true,
                        attributeFilter: [
                            'style',
                            'class',
                            'transform'
                        ],
                        childList: true
                    });
                    parent = parent.parentElement;
                }
            }
        };
        setupObservers(elements.from);
        setupObservers(elements.to);
        return ()=>{
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
            resizeObserver.disconnect();
            mutationObserver.disconnect();
            stopAnimationFrameTracking();
        };
    }, [
        calculateConnector,
        elements.from,
        elements.to,
        startAnimationFrameTracking,
        stopAnimationFrameTracking
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
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
            __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(markerStartRef.current, {
                scale: 0,
                transformOrigin: "50% 50%"
            });
        }
        if (markerEndRef.current) {
            __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(markerEndRef.current, {
                scale: 0,
                transformOrigin: "50% 50%"
            });
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(pathElement, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength
        });
        const timeline = __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline();
        timeline.to(pathElement, {
            strokeDashoffset: 0,
            duration: 0.5,
            ease: "power2.out",
            onComplete: ()=>{
                // Show markers and animate them scaling in
                setShowMarkers(true);
                // Animate marker scale from 0 to 1
                if (markerStartRef.current) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(markerStartRef.current, {
                        scale: 1,
                        duration: 0.3,
                        ease: "back.out(1.7)",
                        transformOrigin: "50% 50%"
                    });
                }
                if (markerEndRef.current) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(markerEndRef.current, {
                        scale: 1,
                        duration: 0.3,
                        ease: "back.out(1.7)",
                        transformOrigin: "50% 50%"
                    });
                }
            }
        });
        return ()=>{
            timeline.kill();
        };
    }, [
        path,
        animated
    ]);
    if (!path || svgDimensions.width === 0 || svgDimensions.height === 0) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ref: svgRef,
        className: `fixed pointer-events-none z-10 ${className}`,
        style: {
            left: svgDimensions.left,
            top: svgDimensions.top,
            width: svgDimensions.width,
            height: svgDimensions.height
        },
        width: svgDimensions.width,
        height: svgDimensions.height,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: [
                    endTypes.from && endTypes.from !== 'none' && createEndMarker(endTypes.from, endSizes.from || 6, 'marker-start'),
                    endTypes.to && endTypes.to !== 'none' && createEndMarker(endTypes.to, endSizes.to || 6, 'marker-end')
                ]
            }, void 0, true, {
                fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/HudConnector.tsx",
                lineNumber: 475,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                ref: pathRef,
                d: path,
                stroke: colors.stroke || "rgba(156, 163, 175, 0.8)",
                strokeWidth: strokeWidth,
                fill: "none",
                markerStart: showMarkers && endTypes.from && endTypes.from !== 'none' ? "url(#marker-start)" : undefined,
                markerEnd: showMarkers && endTypes.to && endTypes.to !== 'none' ? "url(#marker-end)" : undefined
            }, void 0, false, {
                fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/HudConnector.tsx",
                lineNumber: 479,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/HudConnector.tsx",
        lineNumber: 463,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = HudConnector;
}),
"[project]/prism_website-main/src/components/ExperienceShowcase/AwardsAndBrands.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
const AwardsAndBrands = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-16",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-6 flex flex-col h-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-xl sm:text-2xl lg:text-3xl font-bold text-white uppercase font-scifi text-center",
                            children: "Awards & Recognition"
                        }, void 0, false, {
                            fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/AwardsAndBrands.tsx",
                            lineNumber: 11,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white/50 p-6 backdrop-blur-sm border border-white/40 flex-1 flex items-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative overflow-hidden w-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/Logos/Awards.png",
                                    alt: "Design Awards and Recognition including Red Dot Award, iF Design Award, Great Wall Awards, and more",
                                    className: "w-full h-auto object-contain grayscale contrast-150 brightness-110 hover:grayscale-0 hover:contrast-100 hover:brightness-100 hover:scale-105 transition-all duration-500",
                                    onError: (e)=>{
                                        console.error('Failed to load Awards.png');
                                        e.currentTarget.style.display = 'none';
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/AwardsAndBrands.tsx",
                                    lineNumber: 16,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/AwardsAndBrands.tsx",
                                lineNumber: 15,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/AwardsAndBrands.tsx",
                            lineNumber: 14,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/AwardsAndBrands.tsx",
                    lineNumber: 10,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-6 flex flex-col h-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-xl sm:text-2xl lg:text-3xl font-bold text-white uppercase font-scifi text-center",
                            children: "Brand Partners"
                        }, void 0, false, {
                            fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/AwardsAndBrands.tsx",
                            lineNumber: 31,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white/50 p-6 backdrop-blur-sm border border-white/20 flex-1 flex items-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative overflow-hidden w-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/Logos/Brands.png",
                                    alt: "Brand Partners including Philips, KFC, Haier, Nescafé, and many other leading brands",
                                    className: "w-full h-auto object-contain grayscale contrast-150 brightness-110 hover:grayscale-0 hover:contrast-100 hover:brightness-100 hover:scale-105 transition-all duration-500",
                                    onError: (e)=>{
                                        console.error('Failed to load Brands.png');
                                        e.currentTarget.style.display = 'none';
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/AwardsAndBrands.tsx",
                                    lineNumber: 36,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/AwardsAndBrands.tsx",
                                lineNumber: 35,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/AwardsAndBrands.tsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/AwardsAndBrands.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/AwardsAndBrands.tsx",
            lineNumber: 8,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/AwardsAndBrands.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = AwardsAndBrands;
}),
"[project]/prism_website-main/src/components/ExperienceShowcase/index.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/prism_website-main/node_modules/gsap/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$ExperienceShowcase$2f$map$2f$MapSelector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/src/components/ExperienceShowcase/map/MapSelector.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$ExperienceShowcase$2f$map$2f$MapInfoPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/src/components/ExperienceShowcase/map/MapInfoPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$ExperienceShowcase$2f$map$2f$MapHUD$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/src/components/ExperienceShowcase/map/MapHUD.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$ExperienceShowcase$2f$map$2f$LogoShowcaseData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/src/components/ExperienceShowcase/map/LogoShowcaseData.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$ExperienceShowcase$2f$map$2f$MapData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/src/components/ExperienceShowcase/map/MapData.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$ExperienceShowcase$2f$DecryptedText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/src/components/ExperienceShowcase/DecryptedText.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$ExperienceShowcase$2f$HudConnector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/src/components/ExperienceShowcase/HudConnector.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$ExperienceShowcase$2f$AwardsAndBrands$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prism_website-main/src/components/ExperienceShowcase/AwardsAndBrands.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
const ExperienceShowcase = ()=>{
    const [selectedCountry, setSelectedCountry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("Canada");
    const [isTransitioning, setIsTransitioning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedFlagIndex, setSelectedFlagIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [showHUD, setShowHUD] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const showcaseContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const timelineRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mapSelectorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hubTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleCountryChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((country, flagIndex)=>{
        if (country === selectedCountry || isTransitioning) return;
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
        const tl = __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
            onComplete: ()=>{
                setIsTransitioning(false);
                timelineRef.current = null;
            }
        });
        timelineRef.current = tl;
        // Simple country change with unified HUD display
        tl.call(()=>{
            setSelectedCountry(country);
            // Show unified HUD overlay on map
            setShowHUD(true);
            // Auto-hide HUD after 8 seconds
            hubTimeoutRef.current = setTimeout(()=>{
                setShowHUD(false);
            }, 8000);
        });
    }, [
        selectedCountry,
        isTransitioning
    ]);
    const handleHUDClose = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setShowHUD(false);
        if (hubTimeoutRef.current) {
            clearTimeout(hubTimeoutRef.current);
            hubTimeoutRef.current = null;
        }
    }, []);
    // Cleanup timeline and timeout on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>{
            if (timelineRef.current) {
                timelineRef.current.kill();
            }
            if (hubTimeoutRef.current) {
                clearTimeout(hubTimeoutRef.current);
            }
        };
    }, []);
    const currentLogos = __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$ExperienceShowcase$2f$map$2f$LogoShowcaseData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["logosByCountry"][selectedCountry] || __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$ExperienceShowcase$2f$map$2f$LogoShowcaseData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["logosByCountry"]["Canada"];
    const shouldUseStaticGrid = currentLogos.length <= 3;
    // Get logos split into three groups for the selected country
    const logoGroups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$ExperienceShowcase$2f$map$2f$LogoShowcaseData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getLogoGroupsForCountry"])(selectedCountry);
    // Determine hub position based on country's x-coordinate
    const mapPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$ExperienceShowcase$2f$map$2f$MapData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMapPointByCountry"])(selectedCountry);
    const hubPosition = mapPoint && mapPoint.x > 50 ? 'left' : 'right';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "py-20 px-10 text-center bg-gradient-to-b from-transparent via-black/50 to-black",
        style: {
            backgroundImage: 'linear-gradient(to bottom, transparent 0%, black 33%, black 100%)'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: showcaseContainerRef,
            className: "max-w-7xl mx-auto relative",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "mb-12 text-2xl sm:text-3xl lg:text-5xl font-bold text-white uppercase font-scifi",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$ExperienceShowcase$2f$DecryptedText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        text: "Experience Showcase",
                        className: "pointer-events-auto font-scifi"
                    }, void 0, false, {
                        fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/index.tsx",
                        lineNumber: 99,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/index.tsx",
                    lineNumber: 98,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: mapSelectorRef,
                    className: "sm:px-20 relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$ExperienceShowcase$2f$map$2f$MapSelector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MapSelector"], {
                            flagItems: __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$ExperienceShowcase$2f$map$2f$LogoShowcaseData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["flagItems"],
                            autoRotateInterval: 3000,
                            pauseOnHover: true,
                            className: "justify-center",
                            onCountryChange: handleCountryChange,
                            selectedIndex: selectedFlagIndex
                        }, void 0, false, {
                            fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/index.tsx",
                            lineNumber: 103,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$ExperienceShowcase$2f$map$2f$MapHUD$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            isVisible: showHUD,
                            selectedCountry: selectedCountry,
                            currentLogos: currentLogos,
                            shouldUseStaticGrid: shouldUseStaticGrid,
                            logoGroups: logoGroups,
                            hubPosition: hubPosition,
                            onClose: handleHUDClose,
                            mapContainerRef: mapSelectorRef
                        }, void 0, false, {
                            fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/index.tsx",
                            lineNumber: 113,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/index.tsx",
                    lineNumber: 102,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$ExperienceShowcase$2f$map$2f$MapInfoPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    selectedCountry: selectedCountry
                }, void 0, false, {
                    fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/index.tsx",
                    lineNumber: 126,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$ExperienceShowcase$2f$HudConnector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    elements: {
                        from: '[data-active-map-point="true"]',
                        to: '[data-map-info-panel="true"]'
                    },
                    positions: {
                        from: 'mid',
                        to: 'top'
                    },
                    connectorType: "L-shape",
                    direction: "vertical-first",
                    colors: {
                        stroke: '#F7E7CE',
                        end: '#F7E7CE'
                    },
                    endTypes: {
                        from: 'none',
                        to: 'square'
                    },
                    endSizes: {
                        to: 8
                    },
                    strokeWidth: 1,
                    animated: true,
                    className: "z-60",
                    offsets: {
                        from: {
                            x: 0,
                            y: 0
                        },
                        to: {
                            x: -15,
                            y: 0
                        }
                    }
                }, void 0, false, {
                    fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/index.tsx",
                    lineNumber: 131,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prism_website$2d$main$2f$src$2f$components$2f$ExperienceShowcase$2f$AwardsAndBrands$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/index.tsx",
                    lineNumber: 163,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/index.tsx",
            lineNumber: 96,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/prism_website-main/src/components/ExperienceShowcase/index.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = ExperienceShowcase;
}),
];

//# sourceMappingURL=prism_website-main_src_components_07a5c336._.js.map