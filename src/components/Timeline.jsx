import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BorderBeam } from './ui/border-beam';
import GlowCircle from './GlowCircle';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Timeline = () => {
    const timelineRef = useRef(null);
    const lineRef = useRef(null);
    const yearRefs = useRef([]);
    const markerRefs = useRef([]);
    const prismRef = useRef(null);

    const timelineData = [
        {
            year: 'Phase 1',
            phase: '第一阶段',
            title: '联合诊断与战略签约',
            subtitle: 'Joint Diagnosis & Strategic Signing',
            description: '联合诊断、甲类战略与投入、奠定合作里程碑',
            keyPoints: [
                '初步接洽与产品力测评：品牌宣传、企业展示、品牌货',
                '深度产品调研与市场需求：品牌宣传各城市调研',
                '战略研讨会（线上/线下）：安环卫管会议',
                '方案报价与合约签署：服务方提供合同'
            ]
        },
        {
            year: 'Phase 2',
            phase: '第二阶段',
            title: '产品优化与准入准备',
            subtitle: 'Product Optimization & Access Preparation',
            description: '打造符合北美市场需求的大单品和新品，并完成所有准入基建设',
            keyPoints: [
                '成立专项小组与产品优化：成立专项小组、渠道专家、Broker专才团队',
                '本地化与合规建设：完整产品监制、包装标准化标准、编码技术等'
            ]
        },
        {
            year: 'Phase 3',
            phase: '第三阶段',
            title: '渠道推进与订单获取',
            subtitle: 'Channel Promotion & Order Acquisition',
            description: '成功将产品进推进入各大出口标渠道',
            keyPoints: [
                '正式渠道推介与谈判：由服务方专业Broker团队向店商起（如Sams Club）采购求人员介绍推荐',
                '试销与订单获取：向消费者业务试销和量，并重营业业务相关支持'
            ]
        },
        {
            year: 'Phase 4',
            phase: '第四阶段',
            title: '落地运营与持续增长',
            subtitle: 'Landing Operation & Sustainable Growth',
            description: '确保稳定供应 × 销售 × 维护，并实现可持续增长',
            keyPoints: [
                '大货生产与入仓：品牌端按PO生产大货，并建设恰当办法高效各货时间',
                '试销经营与增值服务：新国际服务前哨、年终营销等',
                '长期紧密与增值服务：新品推荐、拓展新渠道、明星KOL合营销等'
            ]
        }
    ];

    useEffect(() => {
        if (!timelineRef.current || !lineRef.current) return;

        // Set initial states
        gsap.set(yearRefs.current, { 
            opacity: 0, 
            scale: 0.8,
            filter: "blur(10px)"
        });

        // Set initial letter spacing for PRISM
        gsap.set(prismRef.current, {
            letterSpacing: "0.1em"
        });

        // Set initial line state - completely hidden
        const lineLength = 1000;
        gsap.set(lineRef.current, {
            strokeDasharray: lineLength,
            strokeDashoffset: lineLength
        });

        let animationComplete = false;
        let revealedYears = new Set();

        // Create sticky scroll trigger that pins the section during animation
        const stickyTrigger = ScrollTrigger.create({
            trigger: timelineRef.current,
            start: "top top",
            end: "+=1000vh", // Extended scroll distance for animation
            pin: true,
            pinSpacing: true,
            scrub: 1,
            // markers: true,
            onUpdate: function(self) {
                // Calculate line progress (0 to 1)
                const progress = self.progress;
                
                // Debug logging
                console.log('ScrollTrigger progress:', progress);
                
                // Animate PRISM letter spacing based on scroll progress
                const letterSpacing = progress * 0.3; // 0 to 0.3em
                gsap.set(prismRef.current, {
                    letterSpacing: `${letterSpacing}em`
                });
                
                // Animate line stroke-dashoffset to reveal the line
                const lineLength = 1000; // Straight horizontal line length (1100 - 100 = 1000)
                const dashOffset = lineLength * (1 - progress);
                console.log('Line progress - dashOffset:', dashOffset, 'lineLength:', lineLength);
                
                gsap.set(lineRef.current, {
                    strokeDasharray: lineLength,
                    strokeDashoffset: dashOffset
                });

                // Check each marker and reveal year when line reaches it
                timelineData.forEach((item, index) => {
                    const markerProgress = (index + 1) / (timelineData.length + 1);
                    
                    if (progress >= markerProgress && yearRefs.current[index] && !revealedYears.has(index)) {
                        revealedYears.add(index);
                        
                        // Reveal year with glow effect
                        gsap.to(yearRefs.current[index], {
                            opacity: 1,
                            scale: 1,
                            filter: "blur(0px)",
                            duration: 0.8,
                            ease: "power2.out",
                            overwrite: true
                        });

                        // Add glow effect
                        gsap.to(yearRefs.current[index], {
                            textShadow: "0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.6), 0 0 60px rgba(255,255,255,0.4)",
                            duration: 0.5,
                            yoyo: true,
                            repeat: 1,
                            ease: "power2.inOut",
                            delay: 0.3
                        });
                    }
                });

                // Check if animation is complete (all years revealed and line fully drawn)
                if (progress >= 0.95 && revealedYears.size === timelineData.length && !animationComplete) {
                    animationComplete = true;
                    
                    // Add a small delay before unpinning to let users appreciate the complete timeline
                    gsap.delayedCall(1, () => {
                        // Smoothly transition out of sticky mode
                        stickyTrigger.refresh();
                    });
                }
            },
            onComplete: function() {
                // Animation sequence completed, release pin
                if (animationComplete) {
                    stickyTrigger.kill();
                }
            }
        });

        // Cleanup function
        return () => {
            stickyTrigger.kill();
        };
    }, [timelineData.length]);

    return (
        <section 
            ref={timelineRef}
            className="relative w-full min-h-screen bg-black overflow-hidden py-20"
            style={{
                backgroundImage: `
            radial-gradient(circle, rgb(0 0 0 / 12%) 0%, rgb(255 255 255 / 9%) 20%, rgba(203, 213, 225, 0.03) 30%, #58585800 40%)
                `,
                backgroundSize: "100% 100%",
            }}
        >


<GlowCircle 
    color="#ffffff" 
    size="300px" 
    blur="100px" 
    left="20%" 
    top="50%" 
    zIndex="-1" 
    className="absolute inset-0" />
<GlowCircle 
    color="#ffffff" 
    size="300px" 
    blur="100px" 
    left="80%" 
    top="40%" 
    zIndex="-1" 
    className="absolute inset-0" />


    {/* Header Section */}
    <div className="container mx-auto px-4 pt-20 relative z-10">
                    {/* Company Branding */}
                    <div className="text-center mb-12">
                                                 <h1 className="text-5xl md:text-7xl font-light mb-6 relative">
                             <span 
                                 ref={prismRef}
                                 className="bg-gradient-to-r from-[#888888] via-white to-[#888888] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                             >
                                 PRISM
                             </span>
                            {/* Subtle underline */}
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-60"></div>
                        </h1>
                    </div>

                    {/* Main Title */}
                    <div className="text-center mb-12">
                        <h2 className="text-5xl md:text-7xl font-bold mb-6 relative">
                            <span className="bg-gradient-to-r from-[#444444] via-white to-[#444444] bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                                业务流程
                            </span>
                        </h2>
                        <div className="space-y-3 relative">
                            <p className="text-xl md:text-2xl text-white font-medium drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                                四阶段专业服务体系
                            </p>
                            <p className="text-base md:text-lg text-[#cccccc] drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">
                                Four-Phase Professional Service System
                            </p>
                            {/* Decorative elements */}
                            <div className="flex justify-center items-center space-x-4 mt-6">
                                <div className="w-8 h-px bg-gradient-to-r from-transparent to-white opacity-60"></div>
                                <div className="w-2 h-2 bg-white rounded-full opacity-60 animate-pulse"></div>
                                <div className="w-8 h-px bg-gradient-to-l from-transparent to-white opacity-60"></div>
                            </div>
                        </div>
                    </div>
                </div>
             {/* Timeline Container */}
                <div className="absolute inset-0 top-[5%] w-full h-auto overflow-hidden flex items-center justify-center">
                    {/* Enhanced Diagonal Line */}
                    <div className="absolute inset-0">
                        <svg 
                            className="w-full h-full" 
                            viewBox="0 0 1200 600" 
                            preserveAspectRatio="none"
                        >
                            {/* Glow effect behind line */}
                            <line
                                x1="100"
                                y1="300"
                                x2="1100"
                                y2="300"
                                stroke="rgba(255,255,255,0.1)"
                                strokeWidth="20"
                                className="blur-sm"
                            />
                            
                            {/* Main straight horizontal line */}
                            <line
                                ref={lineRef}
                                x1="100"
                                y1="300"
                                x2="1100"
                                y2="300"
                                stroke="url(#enhancedSilverGradient)"
                                strokeWidth="4"
                                strokeLinecap="round"
                                className="drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]"
                            />
                            
                            {/* Enhanced Gradient definitions */}
                            <defs>
                                <linearGradient id="enhancedSilverGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#666666" />
                                    <stop offset="25%" stopColor="#aaaaaa" />
                                    <stop offset="50%" stopColor="#ffffff" />
                                    <stop offset="75%" stopColor="#aaaaaa" />
                                    <stop offset="100%" stopColor="#666666" />
                                </linearGradient>
                                
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                                    <feMerge> 
                                        <feMergeNode in="coloredBlur"/>
                                        <feMergeNode in="SourceGraphic"/>
                                    </feMerge>
                                </filter>
                            </defs>
                        {/* Timeline points */}
                        {timelineData.map((item, index) => {
                            const x = 100 + (index + 1) * (1000 / (timelineData.length + 1)); // Distribute points evenly along the 1000px line
                            const y = 300; // Fixed y position for straight horizontal line
                            
                            return (
                                <g key={index}>
                                    {/* Point on line */}
                                    <circle
                                        cx={x}
                                        cy={y}
                                        r="6"
                                        fill="white"
                                        stroke="#c0c0c0"
                                        strokeWidth="2"
                                        className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                                    />
                                </g>
                            );
                        })}
                    </svg>
                </div>

                {/* Timeline Content */}
                {/* Enhanced Timeline Content */}
                <div className="absolute inset-0">
                        {timelineData.map((item, index) => {
                            const leftPercent = 8.33 + ((index + 1) / (timelineData.length + 1)) * 83.33; // Distribute evenly from 8.33% to 91.67%
                            
                            return (
                                <div
                                    key={index}
                                    className="absolute transform -translate-x-1/2"
                                    style={{
                                        left: `${leftPercent}%`,
                                        top: `50%`
                                    }}
                                >
                                    {/* Phase Label Above */}
                                    <div className="absolute bottom-full mb-6 left-1/2 transform -translate-x-1/2">
                                        <h3 
                                            ref={el => yearRefs.current[index] = el}
                                            className="text-2xl md:text-3xl font-bold text-white text-center relative whitespace-nowrap"
                                            style={{
                                                background: 'linear-gradient(135deg, #888888, #ffffff, #cccccc)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                backgroundClip: 'text',
                                                filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.4))'
                                            }}
                                        >
                                            {item.year}
                                            {/* Phase backdrop glow */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-lg blur-xl -z-10"></div>
                                        </h3>
                                    </div>
                                    
                                    {/* Enhanced Phase Description Box */}
                                    <div className="absolute top-full mt-6 left-1/2 transform -translate-x-1/2">
                                        <div className="text-center p-6 rounded-lg backdrop-blur-sm border border-white/10 bg-black/20 min-w-[280px] max-w-[320px]">
                                            {/* Phase Number */}
                                            <p className="text-base text-white font-semibold mb-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                                                {item.phase}
                                            </p>
                                            
                                            {/* Phase Title in Chinese */}
                                            <h4 className="text-base text-white font-bold mb-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                                                {item.title}
                                            </h4>
                                            
                                            {/* Phase Title in English */}
                                            <p className="text-sm text-[#cccccc] mb-3 italic drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">
                                                {item.subtitle}
                                            </p>
                                            
                                            {/* Main Description */}
                                            <p className="text-sm text-[#cccccc] leading-relaxed mb-4 drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">
                                                {item.description}
                                            </p>
                                            
                                            {/* Key Points */}
                                            {item.keyPoints && item.keyPoints.length > 0 && (
                                                <div className="text-left space-y-2">
                                                    <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto mb-3"></div>
                                                    {item.keyPoints.slice(0, 2).map((point, pointIndex) => (
                                                        <p key={pointIndex} className="text-xs text-[#aaaaaa] leading-relaxed drop-shadow-[0_0_3px_rgba(255,255,255,0.1)]">
                                                            • {point}
                                                        </p>
                                                    ))}
                                                </div>
                                            )}
                                            
                                            {/* Description accent line */}
                                            <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto mt-4"></div>
                                        </div>

                                        <BorderBeam
                                duration={6}
                                delay={3}
                                size={100}
                                borderWidth={2}
                                className="from-transparent via-white to-transparent"
                            />

                                    </div>
                                </div>
                            );
                        })}
                    </div>
                
            </div>

            {/* Futuristic Grid Background */}
            <div className="absolute inset-0 opacity-5">
                <div className="fui-grid w-full h-full"></div>
            </div>

            {/* Subtle glow effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#ffffff02] to-transparent pointer-events-none"></div>
        </section>
    );
};

export default Timeline;
