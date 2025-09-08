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
            year: '2007',
            date: '2007年3月',
            description: '公司成立',
            position: 'above'
        },
        {
            year: '2011',
            date: '2011年5月',
            description: '业务拓展',
            position: 'below'
        },
        {
            year: '2015',
            date: '2015年度',
            description: '战略升级',
            position: 'above'
        },
        {
            year: '2018',
            date: '2018年度',
            description: '融资A轮完成110亿',
            position: 'below'
        },
        {
            year: '2020',
            date: '2020年度',
            description: '全球疫情下创新发展',
            position: 'above'
        },
        {
            year: '2021',
            date: '2021年1月',
            description: '港交所上市',
            position: 'below'
        },
        {
            year: '2021',
            date: '2021年度',
            description: '业务全球化扩张',
            position: 'above'
        },
        {
            year: '2021',
            date: '2021年度',
            description: '获得行业领先地位',
            position: 'below'
        },
        {
            year: '2023',
            date: '2023年度',
            description: '2023年度中国上市公',
            position: 'above'
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
                
                // Animate PRISM letter spacing based on scroll progress
                const letterSpacing = progress * 0.3; // 0 to 0.3em
                gsap.set(prismRef.current, {
                    letterSpacing: `${letterSpacing}em`
                });
                
                // Animate line stroke-dashoffset to reveal the line
                const lineLength = 1200 * Math.sqrt(2); // Approximate line length
                gsap.set(lineRef.current, {
                    strokeDasharray: lineLength,
                    strokeDashoffset: lineLength * (1 - progress)
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
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
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
                        <h2 className="text-7xl md:text-9xl font-bold mb-6 relative">
                            <span className="bg-gradient-to-r from-[#444444] via-white to-[#444444] bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                                2007-2023
                            </span>
                        </h2>
                        <div className="space-y-3 relative">
                            <p className="text-xl md:text-2xl text-white font-medium drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                                全球品牌年轻化专业咨询创意机构  
                            </p>
                            <p className="text-base md:text-lg text-[#cccccc] drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">
                                Global brand youth professional consulting creative agency
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
                <div  className="relative w-full h-[600px] overflow-hidden">
                    {/* Enhanced Diagonal Line */}
                    <div className="absolute inset-0">
                        <svg 
                            className="w-full h-full" 
                            viewBox="0 0 1200 600" 
                            preserveAspectRatio="none"
                        >
                            {/* Glow effect behind line */}
                            <line
                                x1="0"
                                y1="500"
                                x2="1200"
                                y2="100"
                                stroke="rgba(255,255,255,0.1)"
                                strokeWidth="20"
                                className="blur-sm"
                            />
                            
                            {/* Main diagonal line */}
                            <line
                                ref={lineRef}
                                x1="0"
                                y1="500"
                                x2="1200"
                                y2="100"
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
                            const x = (index + 1) * (1200 / (timelineData.length + 1));
                            const y = 500 - (x - 0) * (400 / 1200); // Calculate y position along the line
                            
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
                            const leftPercent = ((index + 1) / (timelineData.length + 1)) * 100;
                            const topPercent = 83.33 - (leftPercent * 0.6667);
                            
                            return (
                                <div
                                    key={index}
                                    className="absolute transform -translate-x-1/2"
                                    style={{
                                        left: `${leftPercent}%`,
                                        top: `${topPercent}%`
                                    }}
                                >
                                    {/* Enhanced Year */}
                                    <div className="relative">
                                        <h3 
                                            ref={el => yearRefs.current[index] = el}
                                            className="text-5xl md:text-7xl font-bold text-white mb-2 text-center relative"
                                            style={{
                                                background: 'linear-gradient(135deg, #888888, #ffffff, #cccccc)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                backgroundClip: 'text',
                                                filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.4))'
                                            }}
                                        >
                                            {item.year}
                                            {/* Year backdrop glow */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-lg blur-xl -z-10"></div>
                                        </h3>
                                        
                                        {/* Enhanced Description */}
                                        <div 
                                            className={`absolute ${
                                                item.position === 'above' 
                                                    ? 'bottom-full mb-10' 
                                                    : 'top-full mt-10'
                                            } left-1/2 transform -translate-x-1/2 whitespace-nowrap`}
                                        >
                                            <div className="text-center p-4 rounded-lg backdrop-blur-sm border border-white/10 bg-black/20">
                                                <p className="text-sm text-white font-semibold mb-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                                                    {item.date}
                                                </p>
                                                <p className="text-xs text-[#cccccc] max-w-40 mx-auto leading-relaxed drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">
                                                    {item.description}
                                                </p>
                                                {/* Description accent line */}
                                                <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto mt-2"></div>
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
