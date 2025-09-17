import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const HorizontalTimeline = () => {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const progressBarRef = useRef(null);
    const progressIndicatorRef = useRef(null);
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

    useEffect(() => {
        if (!sectionRef.current || !trackRef.current) return;

        const section = sectionRef.current;
        const track = trackRef.current;
        const items = itemRefs.current;
        const years = yearRefs.current;

        // Set initial states
        gsap.set(items, { 
            opacity: 0.3, 
            scale: 0.8,
            filter: "blur(5px)"
        });

        gsap.set(progressIndicatorRef.current, {
            scaleX: 0,
            transformOrigin: "left center"
        });

        const setupAnimation = () => {
            // Calculate total scroll distance based on device
            const isMobile = window.innerWidth < 768;
            const trackWidth = track.scrollWidth;
            const viewportWidth = window.innerWidth;
            const scrollDistance = trackWidth - viewportWidth;

            // Create horizontal scroll animation
            const horizontalTween = gsap.to(track, {
                x: -scrollDistance,
                ease: "none"
            });

            // Create ScrollTrigger for pinning and horizontal scroll
            return ScrollTrigger.create({
                trigger: section,
                start: "top top",
                end: () => `+=${scrollDistance + (isMobile ? window.innerHeight * 0.5 : window.innerHeight)}`,
                pin: true,
                animation: horizontalTween,
                scrub: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                    
                    // Update progress bar
                    gsap.set(progressIndicatorRef.current, {
                        scaleX: progress
                    });

                    // Calculate which item should be focused
                    const totalItems = timelineData.length;
                    const itemProgress = progress * (totalItems - 1);

                    // Update item states with enhanced mobile responsiveness
                    items.forEach((item, index) => {
                        if (!item) return;

                        const distance = Math.abs(index - itemProgress);
                        const isFocused = distance < 0.5;
                        const isAdjacent = distance < 1.5;
                        
                        if (isFocused) {
                            // Focused item - full opacity and scale with enhanced animation
                            gsap.to(item, {
                                opacity: 1,
                                scale: isMobile ? 0.95 : 1,
                                filter: "blur(0px)",
                                duration: 0.4,
                                ease: "power2.out"
                            });
                        } else if (isAdjacent) {
                            // Adjacent items - partially visible
                            gsap.to(item, {
                                opacity: 0.6,
                                scale: isMobile ? 0.85 : 0.9,
                                filter: "blur(2px)",
                                duration: 0.4,
                                ease: "power2.out"
                            });
                        } else {
                            // Distant items - minimal visibility
                            gsap.to(item, {
                                opacity: 0.3,
                                scale: isMobile ? 0.75 : 0.8,
                                filter: "blur(5px)",
                                duration: 0.4,
                                ease: "power2.out"
                            });
                        }
                    });

                    // Update year highlights in progress bar
                    years.forEach((year, index) => {
                        if (!year) return;
                        
                        const yearProgress = index / (totalItems - 1);
                        const isActive = Math.abs(progress - yearProgress) < 0.15;
                        
                        gsap.to(year, {
                            color: isActive ? "#ffffff" : "#666666",
                            scale: isActive ? (isMobile ? 1.1 : 1.2) : 1,
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
            {/* Timeline Track */}
            <div 
                ref={trackRef}
                className="timeline-track absolute top-0 left-0 h-full flex items-center"
                style={{ width: `${timelineData.length * 100}vw` }}
            >
                {timelineData.map((item, index) => (
                    <div
                        key={index}
                        ref={(el) => itemRefs.current[index] = el}
                        className="flex-shrink-0 w-screen h-full flex items-center justify-center px-8 md:px-16"
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
                            <div key={index} className="flex flex-col items-center">
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