import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlowCircle from './GlowCircle';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger, SplitText);

const HorizontalTimeline = () => {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const progressBarRef = useRef(null);
    const progressIndicatorRef = useRef(null);
    const titleRef = useRef(null);
    const serviceTitleRef = useRef(null); // New ref for Service Process title
    const yearRefs = useRef([]);
    const itemRefs = useRef([]);

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
            ],
            image: "/img/1.jpg"
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
            ],
            image: "/img/2.jpg"
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
            ],
            image: "/img/3.jpg"
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
            ],
            image: "/img/1_big.jpg"
        },
        {
            year: 'Phase 5',
            phase: '第五阶段',
            title: '规模化扩张与品牌建设',
            subtitle: 'Scale Expansion & Brand Building',
            description: '实现规模化运营，建立强势品牌影响力，开拓更多市场机会',
            keyPoints: [
                '多渠道扩张：拓展至更多零售渠道，建立全方位销售网络',
                '品牌营销升级：提升品牌知名度，建立消费者忠诚度',
                '产品线丰富：基于市场反馈，推出更多符合本地化需求的产品'
            ],
            image: "/img/2_big.jpg"
        }
    ];

    // Service Process title animation
    useEffect(() => {
        if (serviceTitleRef.current) {
            // Split text into characters for animation
            const split = new SplitText(serviceTitleRef.current, { type: "words, chars" });
            
            console.log("Service Process split text chars:", split.chars); // Debug log
            
            // Set initial state - characters positioned well below to animate upward
            gsap.set(split.chars, {
                opacity: 0,
                y: 150, // Characters start well below the overflow boundary
                rotationX: 0, // Remove rotation for cleaner upward movement
                transformOrigin: "center bottom",
                // "--blur": "10px",
            });

            // Apply blur effect and gradient to individual characters
            split.chars.forEach((char, index) => {
                char.style.filter = "blur(var(--blur))";
                // Calculate gradient position for each character
                const progress = index / (split.chars.length - 1);
                const color = getGradientColor(progress);
                char.style.color = color;
            });

            // Function to calculate gradient color based on position
            function getGradientColor(progress) {
                // Create smooth gradient from #444444 -> white -> #444444
                if (progress <= 0.5) {
                    // First half: #444444 to white
                    const factor = progress * 2;
                    const gray = Math.round(68 + (255 - 68) * factor);
                    return `rgb(${gray}, ${gray}, ${gray})`;
                } else {
                    // Second half: white to #444444
                    const factor = (progress - 0.5) * 2;
                    const gray = Math.round(255 - (255 - 68) * factor);
                    return `rgb(${gray}, ${gray}, ${gray})`;
                }
            }

            // Create scroll-scrubbed animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: serviceTitleRef.current,
                    start: "top 90%",
                    end: "top 30%",
                    scrub: true, // Smooth scrub animation tied to scroll
                    onStart: () => console.log("Service Process animation started"), // Debug log
                    onComplete: () => console.log("Service Process animation completed"), // Debug log
                }
            });

            tl.to(split.chars, {
                // duration: 1.2,
                opacity: 1,
                y: 0, // Animate to final position
                // "--blur": "0px",
                stagger: 0.007, // Slightly increased stagger for more pronounced effect
                ease: "power3.out", // Smoother easing for upward movement
                onUpdate: function() {
                    // Update the filter during animation
                    this.targets().forEach(char => {
                        char.style.filter = `blur(${char.style.getPropertyValue('--blur')})`;
                    });
                }
            });

            // Store the timeline for cleanup
            return () => {
                tl.kill();
                split.revert();
            };
        }
    }, []);

    useEffect(() => {
        if (!sectionRef.current) return;

        const section = sectionRef.current;
        const items = itemRefs.current;
        const years = yearRefs.current;

        // Set initial states - hide all items except the first
        gsap.set(items, { 
            opacity: 0,
            scale: 0.8,
            filter: "blur(5px)"
        });

        // Show first item initially
        if (items[0]) {
            gsap.set(items[0], {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)"
            });
        }

        gsap.set(progressIndicatorRef.current, {
            scaleX: 0,
            transformOrigin: "left center"
        });

        const setupAnimation = () => {
            const totalItems = timelineData.length;
            const scrollDistance = window.innerHeight * 2; // Fixed scroll distance for smoother experience

            // Create ScrollTrigger for pinning and content transitions
            return ScrollTrigger.create({
                trigger: section,
                start: "top top",
                end: `+=${scrollDistance}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                    
                    // Update progress bar
                    gsap.set(progressIndicatorRef.current, {
                        scaleX: progress
                    });

                    // Calculate which item should be active
                    const itemProgress = progress * (totalItems - 1);
                    const currentIndex = Math.round(itemProgress);
                    const clampedIndex = Math.max(0, Math.min(currentIndex, totalItems - 1));

                    // Update title with smooth transition
                    if (titleRef.current) {
                        const newTitle = timelineData[clampedIndex].title;
                        if (titleRef.current.textContent !== newTitle) {
                            // Animate title change with fade out, change text, fade in
                            gsap.to(titleRef.current, {
                                opacity: 0,
                                y: -20,
                                duration: 0.3,
                                ease: "power2.out",
                                onComplete: () => {
                                    titleRef.current.textContent = newTitle;
                                    gsap.to(titleRef.current, {
                                        opacity: 1,
                                        y: 0,
                                        duration: 0.4,
                                        ease: "power2.out"
                                    });
                                }
                            });
                        }
                    }

                    // Update item visibility - only show current item
                    items.forEach((item, index) => {
                        if (!item) return;

                        if (index === clampedIndex) {
                            // Active item - full visibility with smooth transition
                            gsap.to(item, {
                                opacity: 1,
                                scale: 1,
                                filter: "blur(0px)",
                                duration: 0.6,
                                ease: "power2.out"
                            });
                        } else {
                            // Hidden items
                            gsap.to(item, {
                                opacity: 0,
                                scale: 0.8,
                                filter: "blur(5px)",
                                duration: 0.4,
                                ease: "power2.out"
                            });
                        }
                    });

                    // Update year highlights in progress bar
                    years.forEach((year, index) => {
                        if (!year) return;
                        
                        const isActive = index === clampedIndex;
                        
                        gsap.to(year, {
                            color: isActive ? "#ffffff" : "#666666",
                            scale: isActive ? 1.2 : 1,
                            duration: 0.3,
                            ease: "power2.out"
                        });

                        // Enhanced glow effect for active year
                        if (isActive) {
                            gsap.to(year, {
                                textShadow: "0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.4)",
                                duration: 0.3,
                                ease: "power2.out"
                            });
                        } else {
                            gsap.to(year, {
                                textShadow: "0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)",
                                duration: 0.3,
                                ease: "power2.out"
                            });
                        }
                    });

                }
            });
        };

        const scrollTrigger = setupAnimation();

        // Handle resize events
        const handleResize = () => {
            scrollTrigger.kill();
            ScrollTrigger.refresh();
            const newScrollTrigger = setupAnimation();
            return newScrollTrigger;
        };

        let resizeTimeout;
        const debouncedResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(handleResize, 250);
        };

        window.addEventListener('resize', debouncedResize);

        // Cleanup
        return () => {
            scrollTrigger.kill();
            window.removeEventListener('resize', debouncedResize);
            clearTimeout(resizeTimeout);
        };
    }, []);

    // Add keyframes to document head
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shimmer {
                0%, 100% {
                    transform: translateX(-100%);
                    opacity: 0;
                }
                50% {
                    transform: translateX(100%);
                    opacity: 1;
                }
            }
            @keyframes float {
                0%, 100% {
                    transform: translateY(0px) translateX(0px);
                    opacity: 0.3;
                }
                50% {
                    transform: translateY(-20px) translateX(10px);
                    opacity: 0.7;
                }
            }
            @keyframes pulse {
                0% {
                    opacity: 0.3;
                    transform: scale(1);
                }
                100% {
                    opacity: 0.1;
                    transform: scale(1.05);
                }
            }
        `;
        document.head.appendChild(style);
        
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <section 
            ref={sectionRef}
            className="timeline relative w-full h-screen bg-black overflow-hidden"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Glow Circles */}
                <GlowCircle 
                    color="rgba(59, 130, 246, 0.15)" 
                    size="600px" 
                    blur="120px" 
                    left="20%" 
                    top="30%" 
                    zIndex="-1"
                    className="animate-pulse"
                    style={{animationDuration: '6s'}}
                />
                <GlowCircle 
                    color="rgba(147, 51, 234, 0.12)" 
                    size="800px" 
                    blur="150px" 
                    left="80%" 
                    top="70%" 
                    zIndex="-1"
                    className="animate-pulse"
                    style={{animationDuration: '8s', animationDelay: '2s'}}
                />
                <GlowCircle 
                    color="rgba(236, 72, 153, 0.1)" 
                    size="500px" 
                    blur="100px" 
                    left="60%" 
                    top="20%" 
                    zIndex="-1"
                    className="animate-pulse"
                    style={{animationDuration: '10s', animationDelay: '4s'}}
                />
                <GlowCircle 
                    color="rgba(34, 197, 94, 0.08)" 
                    size="700px" 
                    blur="140px" 
                    left="10%" 
                    top="80%" 
                    zIndex="-1"
                    className="animate-pulse"
                    style={{animationDuration: '7s', animationDelay: '1s'}}
                />
                
                {/* Animated gradient overlay */}
                <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                        background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.05) 0%, transparent 50%)',
                        animation: 'pulse 8s ease-in-out infinite alternate'
                    }}
                />
                
                {/* Floating particles */}
                <div className="absolute inset-0">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-white/30 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animation: `float ${4 + Math.random() * 3}s ease-in-out infinite`,
                                animationDelay: `${Math.random() * 2}s`
                            }}
                        />
                    ))}
                </div>
                
                {/* Subtle grid pattern */}
                <div 
                    className="absolute inset-0 opacity-3"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px'
                    }}
                />
            </div>
      
        
     {/* Crimson Core Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
             "radial-gradient(45% 40% at 50% 50%, #c81e3a 0%, #a51d35 12%, #7d1a2f 25%, #591828 35%, #3c1722 45%, #2a151d 55%, #1f1317 65%, #141013 75%, #0a0a0a 85%, #000000 100%), #000000",
        }}
      />
      {/* Strong vignette for full black edges */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 80%, rgba(0,0,0,1) 100%)",
        }}
      />

      {/* Service Process Title */}
      <div className="text-center pt-28">
        <h2 className="text-7xl md:text-9xl font-bold mb-6 relative overflow-hidden">
                            <span ref={serviceTitleRef} className="text-white block">
                           Service Process
                            </span>
                        </h2>
        </div>

            {/* Timeline Track - Centered Items */}
            <div 
                ref={trackRef}
                className="timeline-track absolute top-0 left-0 w-full h-full flex items-center justify-center"
            >
                {timelineData.map((item, index) => (
                    <div
                        key={index}
                        ref={(el) => itemRefs.current[index] = el}
                        className="absolute w-full h-full flex items-center justify-center px-8 md:px-16"
                    >
                        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                            {/* Content Side */}
                            <div className={`space-y-6 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                                <div className="space-y-3">
                                    <p className="text-sm md:text-base text-gray-100 font-medium tracking-wide uppercase">
                                        {item.year} • {item.phase}
                                    </p>
                                    <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white leading-tight">
                                        {item.title}
                                    </h2>
                                    <p className="text-base md:text-lg text-gray-300 font-medium italic">
                                        {item.subtitle}
                                    </p>
                                </div>
                                <p className="text-lg md:text-xl text-gray-100 leading-relaxed max-w-lg">
                                    {item.description}
                                </p>
                                
                                {/* Key Points */}
                                {item.keyPoints && item.keyPoints.length > 0 && (
                                    <div className="space-y-3">
                                        <h4 className="text-sm font-semibold text-gray-200 uppercase tracking-wide">
                                            关键要点 Key Points
                                        </h4>
                                        <ul className="space-y-2 max-w-lg">
                                            {item.keyPoints.slice(0, 2).map((point, pointIndex) => (
                                                <li key={pointIndex} className="text-sm text-gray-300 leading-relaxed flex items-start">
                                                    <span className="inline-block w-1.5 h-1.5 bg-white/60 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                                    <span>{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <button className="inline-flex items-center space-x-2 text-white border border-white/20 px-6 py-3 rounded-full hover:bg-white/10 transition-colors duration-300">
                                    <span>了解更多 Learn more</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </button>
                            </div>

                            {/* Image Side */}
                            <div className={`${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                                <div className="relative">
                                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200">
                                        <img 
                                            src={item.image} 
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

      

            {/* Progress Bar */}
            <div className="absolute bottom-8 left-0 w-full px-6 md:px-12">
                <div className="relative">
                    {/* Phase Titles Above Progress Bar */}
                    <div className="flex justify-between items-center mb-6">
                        {timelineData.map((item, index) => (
                            <div key={index} className="flex flex-col items-center" style={{minWidth: 0}}>
                                <div 
                                    className="text-sm md:text-base lg:text-lg font-bold text-center whitespace-nowrap"
                                    style={{
                                        background: 'linear-gradient(135deg, #444444 0%, #ffffff 50%, #444444 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        textShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
                                        filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.2))'
                                    }}
                                >
                                    {item.title}
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Progress Track */}
                    <div 
                        ref={progressBarRef}
                        className="w-full h-2 bg-gradient-to-r from-white/10 via-white/30 to-white/10 rounded-full overflow-hidden relative"
                        style={{
                            boxShadow: '0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(255, 255, 255, 0.15), inset 0 0 20px rgba(255, 255, 255, 0.1)',
                            background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 100%)'
                        }}
                    >
                        {/* Animated background shimmer */}
                        <div 
                            className="absolute inset-0 rounded-full opacity-50"
                            style={{
                                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                                animation: 'shimmer 3s ease-in-out infinite'
                            }}
                        ></div>
                        
                        <div 
                            ref={progressIndicatorRef}
                            className="h-full bg-gradient-to-r from-blue-400 via-white to-blue-300 rounded-full relative z-10"
                            style={{
                                boxShadow: '0 0 40px rgba(255, 255, 255, 1), 0 0 80px rgba(255, 255, 255, 0.6), 0 0 120px rgba(255, 255, 255, 0.3), 0 0 160px rgba(135, 206, 235, 0.4)',
                                background: 'linear-gradient(90deg, rgba(96, 165, 250, 0.9) 0%, rgba(255, 255, 255, 1) 50%, rgba(147, 197, 253, 0.9) 100%)'
                            }}
                        >
                            {/* Inner glow effect */}
                            <div 
                                className="absolute inset-0 rounded-full"
                                style={{
                                    background: 'linear-gradient(90deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.6) 100%)',
                                    filter: 'blur(2px)'
                                }}
                            ></div>
                        </div>
                    </div>




                    {/* Year Markers */}
                    <div className="flex justify-between items-center mt-6">
                        {timelineData.map((item, index) => (
                            <div key={index} className="flex flex-col items-center" style={{minWidth: 0}}>
                                <div 
                                    className="w-3 h-3 bg-white/60 rounded-full mb-3 shadow-lg"
                                    style={{
                                        boxShadow: '0 0 15px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.3)'
                                    }}
                                ></div>
                                <span 
                                    ref={(el) => yearRefs.current[index] = el}
                                    className="text-base md:text-lg lg:text-xl font-semibold text-gray-50 transition-all duration-300"
                                    style={{
                                        textShadow: '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)'
                                    }}
                                >
                                    {item.year}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

 
        </section>
    );
};

export default HorizontalTimeline;