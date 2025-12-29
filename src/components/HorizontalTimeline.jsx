import React, { useEffect, useRef, memo } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from '@studio-freight/react-lenis';
import GlowCircle from './GlowCircle';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger, SplitText);

const HorizontalTimeline = memo(() => {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const progressBarRef = useRef(null);
    const progressIndicatorRef = useRef(null);
    const titleRef = useRef(null);
    const serviceTitleRef = useRef(null); // New ref for Service Process title
    const yearRefs = useRef([]);
    const itemRefs = useRef([]);
    const previousActiveIndex = useRef(-1); // Track previous active index
    
    // Get Lenis instance for smooth scroll integration
    const lenis = useLenis();
    
    // Ref for intersection observer to detect approach to ServiceProcess section
    const approachTriggerRef = useRef(null);

    const timelineData = [
        {
            year: 'Phase 1',
            phase: '第一阶段',
            title: '联合诊断与战略签约',
            subtitle: '(Phase 1: Joint Diagnosis & Strategic Signing)',
            description: '目标：双向选择，明确战略与投入，共识蓝图，奠定合作基础。',
            keyPoints: [
                '1. 初步接洽与产品力初评：品牌商提交企业及产品资料。服务方（产品专家+渠道Broker）进行初步评估，从*产品商业潜力*与*渠道匹配度*两个维度给出专业意见，判断是否接单。',
                '2. 深度产品评测与市场洞察：品牌商邮寄样品进行评测。双方签署保密协议（NDA）。服务方出具详细的《产品市场适配性评估报告》与《渠道进入战略建议》。',
                '3. 战略研讨会（线上/线下）：安排高管会议（≥3小时）。品牌方创始人、产品负责人必须参与。会议核心：探讨产品优化重塑方向、市场定位、渠道策略、财务模型。',
                '4. 方案报价与合约签订：服务方提供整合的《"品渠双驱"一站式服务方案与报价》。品牌商确认后，签署合同并支付首期款项。**付费节点一：支付战略咨询与启动费。**'
            ],
            image: "./img/phase_1.jpg"
        },
        {
            year: 'Phase 2',
            phase: '第二阶段',
            title: '产品优化与准入准备',
            subtitle: '(Phase 2: Product Optimization & Access Preparation)',
            description: '目标：打造符合北美市场需求的"大渠创新单品"，并完成所有准入基础建设。',
            keyPoints: [
                '5. 成立专项小组与产品优化：成立含产品设计师、产品经理、渠道专家、Broker等专才项目组。指导品牌商完成产品优化、设计确认及最终打样。确保产品同时满足"创新性"、"文化匹配"、"市场锚定"和"渠道商超准入标准"。',
                '6. 本地化与合规建设：指导品牌商在目标国（如加拿大）注册公司、办理税号、银行开户。完成产品安规认证（FCC, UL, CSA等）、包装标签合规化。筹备国际物流及仓储方案。'
            ],
            image: "./img/phase_2.jpg"
        },
        {
            year: 'Phase 3',
            phase: '第三阶段',
            title: '技术赋能与价值重塑',
            subtitle: '(Phase 3: Tech-Enablement & Value Remodeling)',
            description: '目标：世界top1首发独家专利技术，从根本上提升产品竞争力与品牌国际商业价值。',
            keyPoints: [
                '7. 技术方案植入与执行：HPH技术定制应用：对产品进行超高压纳米破碎处理，实现动态灭菌、纳米均质、延长保质期，优化创新口感与风味。PEF技术定制应用：为产品规划终端保鲜方案，F脉冲电场非热式杀菌技术为后续渠道配备智能冰温柜、革命产品运输保鲜，渠道端损耗率等。',
                '8. 样品重塑与验证：生产经技术赋能后的最终样品，并送交渠道买手进行体验和测试，获得反馈。'
            ],
            image: "./img/phase_3.jpg"
        },
        {
            year: 'Phase 4',
            phase: '第四阶段',
            title: '渠道推进与订单获取',
            subtitle: '(Phase 4: Channel Promotion & Order Acquisition)',
            description: '目标：成功将产品推荐进入落地目标渠道。',
            keyPoints: [
                '9. 正式渠道推荐与谈判：由服务方专业Broker团队向目标商超（如Sams Club）采购决策人进行推荐。根据商超反馈，指导品牌商进行最后的产品、价格或包装调整。提供采购谈判策略与竞品分析支持。',
                '10. 试销与订单获取：推动商超安排试销订单（First Order）。**付费节点二：获得试销订单后，支付二期服务费。**协助品牌商与商超签订正式采购合同（PO）。**付费节点三：签订正式合同后，支付三期服务费。**'
            ],
            image: "./img/phase_4.jpg"
        },
        {
            year: 'Phase 5',
            phase: '第五阶段',
            title: '落地运营与持续增长',
            subtitle: '(Phase 5: Landing Operation & Sustainable Growth)',
            description: '目标：确保稳定供应×销售×维护，并实现可持续增长。',
            keyPoints: [
                '11. 大货生产与入仓：品牌商按PO生产大货，并通过指定物流送至商超中央仓库（RDC）。**佣金（销售分成）启动节点：商品成功入仓当日，按合同约定（如批发价15%）支付佣金。**',
                '12. 长期运营与增值服务：**进销存管理**：日常订单处理、库存监控。**渠道维护**：巡店、货架陈列优化、促销活动执行（需品牌商预算支持）。**客户服务**：处理退换货、客户投诉沟通。**增长服务**：新品推荐、拓展新渠道、明星KOL代言推荐、年度策略复盘。'
            ],
            image: "./img/phase_5.jpg"
        }
    ];

    // Service Process title animation - Optimized for smoothness
    useEffect(() => {
        if (serviceTitleRef.current) {
            // Split text into characters for animation
            const split = new SplitText(serviceTitleRef.current, { type: "chars" });
            
            // Set initial state - simple and GPU-accelerated
            gsap.set(split.chars, {
                opacity: 0,
                y: 80,
                willChange: "transform, opacity"
            });

            // Apply gradient to individual characters
            split.chars.forEach((char, index) => {
                const progress = index / (split.chars.length - 1);
                const color = getGradientColor(progress);
                char.style.color = color;
            });

            // Function to calculate gradient color based on position
            function getGradientColor(progress) {
                // Create smooth gradient from #666666 -> white -> #666666
                if (progress <= 0.5) {
                    const factor = progress * 2;
                    const gray = Math.round(102 + (255 - 102) * factor);
                    return `rgb(${gray}, ${gray}, ${gray})`;
                } else {
                    const factor = (progress - 0.5) * 2;
                    const gray = Math.round(255 - (255 - 102) * factor);
                    return `rgb(${gray}, ${gray}, ${gray})`;
                }
            }

            // Create smooth scroll-scrubbed animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: serviceTitleRef.current,
                    start: "top 85%",
                    end: "top 40%",
                    scrub: 0.3, // Reduced for better performance
                }
            });

            tl.to(split.chars, {
                opacity: 1,
                y: 0,
                stagger: 0.01, // Reduced stagger for better performance
                ease: "power2.out",
                onComplete: () => {
                    // Remove will-change after animation completes
                    split.chars.forEach(char => {
                        char.style.willChange = "auto";
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

        // Configure ScrollTrigger to work with Lenis
        // ReactLenis already handles RAF internally, we just need to update ScrollTrigger
        if (lenis) {
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.lagSmoothing(0);
        }

        // Set initial states - hide all items except the first (optimized for performance)
        gsap.set(items, { 
            opacity: 0,
            scale: 0.95,
            willChange: "transform, opacity"
        });

        // Show first item initially with smooth animations
        if (items[0]) {
            gsap.set(items[0], {
                opacity: 1,
                scale: 1
            });

            // Initialize first item animations
            const firstImage = items[0].querySelector('.timeline-image');
            const firstPhase = items[0].querySelector('.timeline-phase');
            const firstTitle = items[0].querySelector('.timeline-title');
            const firstSubtitle = items[0].querySelector('.timeline-subtitle');
            const firstText = items[0].querySelector('.timeline-text');
            const firstKeypoints = items[0].querySelector('.timeline-keypoints');
            const firstKeypointItems = items[0].querySelectorAll('.timeline-keypoint');

            if (firstImage) {
                // Set initial states - simpler and smoother (scale 1.35 for phase 1)
                gsap.set(firstImage, {
                    scale: 1.35,
                    opacity: 0
                });

                // Set initial states for text elements
                gsap.set([firstPhase, firstTitle, firstSubtitle, firstText, firstKeypoints], {
                    opacity: 0,
                    y: 20
                });

                // Set initial states for keypoint items
                gsap.set(firstKeypointItems, {
                    opacity: 0,
                    x: -10
                });

                // Trigger initial animations with smooth timing
                const initialTl = gsap.timeline({ delay: 0.3 });
                
                // Image reveal - simple scale and fade
                initialTl.to(firstImage, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out"
                });

                // Text reveals with smooth stagger
                initialTl.to(firstPhase, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out"
                }, "-=0.4");

                initialTl.to(firstTitle, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out"
                }, "-=0.35");

                initialTl.to(firstSubtitle, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out"
                }, "-=0.35");

                initialTl.to(firstText, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out"
                }, "-=0.35");

                initialTl.to(firstKeypoints, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out"
                }, "-=0.35");

                // Animate individual keypoint items
                initialTl.to(firstKeypointItems, {
                    opacity: 1,
                    x: 0,
                    duration: 0.4,
                    stagger: 0.08,
                    ease: "power2.out"
                }, "-=0.3");

                // Set the initial active index
                previousActiveIndex.current = 0;
            }
        }

        gsap.set(progressIndicatorRef.current, {
            scaleX: 0,
            transformOrigin: "left center"
        });

        const setupAnimation = () => {
            const totalItems = timelineData.length;
            const scrollDistance = window.innerHeight * 2.5; // Slightly longer for smoother transitions

            // Create ScrollTrigger for pinning and content transitions
            // Configure with proper scroller for Lenis compatibility
            return ScrollTrigger.create({
                trigger: section,
                start: "top top",
                end: `+=${scrollDistance}`,
                pin: true,
                pinSpacing: true,
                scrub: 1, // Increased for smoother, less jerky transitions
                invalidateOnRefresh: true,
                anticipatePin: 0, // Reduced to 0 to prevent premature pinning
                fastScrollEnd: true, // Helps with smooth unpinning
                preventOverlaps: true, // Prevents overlapping with other pinned sections
                scroller: lenis ? document.body : window,
                onUpdate: (self) => {
                    const progress = self.progress;
                    
                    // Update progress bar - direct set for better performance
                    if (progressIndicatorRef.current) {
                        progressIndicatorRef.current.style.transform = `scaleX(${progress})`;
                    }

                    // Calculate which item should be active
                    const itemProgress = progress * (totalItems - 1);
                    const currentIndex = Math.round(itemProgress);
                    const clampedIndex = Math.max(0, Math.min(currentIndex, totalItems - 1));

                    // Update item visibility - only show current item
                    items.forEach((item, index) => {
                        if (!item) return;

                        if (index === clampedIndex) {
                            // Active item - full visibility with smooth transition
                            gsap.to(item, {
                                opacity: 1,
                                scale: 1,
                                duration: 0.5,
                                ease: "power2.out"
                            });

                            // Only trigger animations if this is a new active index
                            if (previousActiveIndex.current !== clampedIndex) {
                                previousActiveIndex.current = clampedIndex;

                                // Trigger smooth image and text reveal animations
                                const image = item.querySelector('.timeline-image');
                                const phase = item.querySelector('.timeline-phase');
                                const title = item.querySelector('.timeline-title');
                                const subtitle = item.querySelector('.timeline-subtitle');
                                const text = item.querySelector('.timeline-text');
                                const keypoints = item.querySelector('.timeline-keypoints');
                                const keypointItems = item.querySelectorAll('.timeline-keypoint');

                                if (image) {
                                    // Reset image - simple scale animation with different scale for phases 1 & 3
                                    const initialScale = (clampedIndex === 0 || clampedIndex === 2) ? 1.35 : 1.15;
                                    gsap.set(image, {
                                        scale: initialScale,
                                        opacity: 0
                                    });

                                    // Reset text animations - simple fade and slide
                                    gsap.set([phase, title, subtitle, text, keypoints], {
                                        opacity: 0,
                                        y: 20
                                    });

                                    // Reset individual keypoint items
                                    gsap.set(keypointItems, {
                                        opacity: 0,
                                        x: -10
                                    });

                                    // Create smooth timeline for animations
                                    const animationTl = gsap.timeline();

                                    // Image reveal - smooth and simple
                                    animationTl.to(image, {
                                        scale: 1,
                                        opacity: 1,
                                        duration: 0.7,
                                        ease: "power2.out"
                                    });

                                    // Text reveal animations - smooth and fast
                                    animationTl.to(phase, {
                                        opacity: 1,
                                        y: 0,
                                        duration: 0.4,
                                        ease: "power2.out"
                                    }, "-=0.4");

                                    animationTl.to(title, {
                                        opacity: 1,
                                        y: 0,
                                        duration: 0.4,
                                        ease: "power2.out"
                                    }, "-=0.3");

                                    animationTl.to(subtitle, {
                                        opacity: 1,
                                        y: 0,
                                        duration: 0.4,
                                        ease: "power2.out"
                                    }, "-=0.3");

                                    animationTl.to(text, {
                                        opacity: 1,
                                        y: 0,
                                        duration: 0.4,
                                        ease: "power2.out"
                                    }, "-=0.3");

                                    animationTl.to(keypoints, {
                                        opacity: 1,
                                        y: 0,
                                        duration: 0.4,
                                        ease: "power2.out"
                                    }, "-=0.3");

                                    // Animate individual keypoint items
                                    animationTl.to(keypointItems, {
                                        opacity: 1,
                                        x: 0,
                                        duration: 0.35,
                                        stagger: 0.08,
                                        ease: "power2.out"
                                    }, "-=0.25");
                                }
                            }
                        } else {
                            // Hidden items - smooth fade out
                            gsap.to(item, {
                                opacity: 0,
                                scale: 0.95,
                                duration: 0.4,
                                ease: "power2.out"
                            });
                        }
                    });

                    // Update year highlights in progress bar with smooth transitions
                    years.forEach((year, index) => {
                        if (!year) return;
                        
                        const isActive = index === clampedIndex;
                        
                        gsap.to(year, {
                            color: isActive ? "#ffffff" : "#777777",
                            scale: isActive ? 1.15 : 1,
                            duration: 0.4,
                            ease: "power2.out"
                        });

                        // Smooth glow effect for active year
                        if (isActive) {
                            gsap.to(year, {
                                textShadow: "0 0 20px rgba(255, 255, 255, 0.7), 0 0 35px rgba(255, 255, 255, 0.5)",
                                duration: 0.4,
                                ease: "power2.out"
                            });
                        } else {
                            gsap.to(year, {
                                textShadow: "0 0 8px rgba(255, 255, 255, 0.3)",
                                duration: 0.4,
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
            
            // Clean up Lenis event listener
            if (lenis) {
                lenis.off('scroll', ScrollTrigger.update);
            }
        };
    }, [lenis]);

    // Add optimized keyframes to document head
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
                    transform: translateY(-15px) translateX(8px);
                    opacity: 0.6;
                }
            }
            @keyframes pulse {
                0%, 100% {
                    opacity: 0.3;
                    transform: scale(1);
                }
                50% {
                    opacity: 0.15;
                    transform: scale(1.03);
                }
            }
        `;
        document.head.appendChild(style);
        
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    // Intersection Observer to refresh ScrollTrigger when approaching ServiceProcess section
    useEffect(() => {
        if (!approachTriggerRef.current) return;

        let hasRefreshed = false; // Flag to ensure we only refresh once

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasRefreshed) {
                        // User is approaching the ServiceProcess section
                        // Refresh ScrollTrigger only once to avoid lag
                        ScrollTrigger.refresh();
                        hasRefreshed = true;
                    }
                });
            },
            {
                // Trigger when the element is 200px away from entering viewport
                rootMargin: '200px 0px 0px 0px',
                threshold: 0.1
            }
        );

        observer.observe(approachTriggerRef.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <section
            id='service-process' 
            ref={sectionRef}
            className="timeline relative w-full h-screen bg-black overflow-hidden"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Glow Circles */}
    
                
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
      
            {/* Approach Trigger - Invisible element to detect when user is approaching ServiceProcess section */}
            <div 
                ref={approachTriggerRef}
                className="absolute top-0 left-0 w-full h-1 pointer-events-none"
                style={{ zIndex: -999 }}
            />

      {/* Service Process Title */}
      <div className="text-center pt-16 md:pt-20 lg:pt-24">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 relative overflow-hidden">
                            <span ref={serviceTitleRef} className="text-white block">
                           Service Process | 服务流程
                            </span>
                        </h2>
                        {/* <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-300 tracking-wider">服务流程</p> */}
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
                                    <p 
                                        className="timeline-phase text-sm md:text-base text-gray-100 font-medium tracking-wide uppercase"
                                        style={{
                                            opacity: 0,
                                            transform: 'translateY(20px)',
                                            willChange: 'transform, opacity'
                                        }}
                                    >
                                        {item.year} • {item.phase}
                                    </p>
                                    <h2 
                                        className="timeline-title text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white leading-tight"
                                        style={{
                                            opacity: 0,
                                            transform: 'translateY(20px)',
                                            willChange: 'transform, opacity'
                                        }}
                                    >
                                        {item.title}
                                    </h2>
                                    <p 
                                        className="timeline-subtitle text-base md:text-lg text-gray-300 font-medium italic"
                                        style={{
                                            opacity: 0,
                                            transform: 'translateY(20px)',
                                            willChange: 'transform, opacity'
                                        }}
                                    >
                                        {item.subtitle}
                                    </p>
                                </div>
                                <figcaption 
                                    className="timeline-text text-lg md:text-xl text-gray-100 leading-relaxed max-w-lg"
                                    style={{
                                        opacity: 0,
                                        transform: 'translateY(20px)',
                                        display: 'inline',
                                        fontFamily: 'inherit',
                                        willChange: 'transform, opacity'
                                    }}
                                >
                                    {item.description}
                                </figcaption>
                                
                                {/* Key Points */}
                                {item.keyPoints && item.keyPoints.length > 0 && (
                                    <div className="timeline-keypoints space-y-3" style={{
                                        opacity: 0,
                                        transform: 'translateY(20px)',
                                        willChange: 'transform, opacity'
                                    }}>
                                        <h4 className="text-sm font-semibold text-gray-200 uppercase tracking-wide">
                                            关键要点 Key Points
                                        </h4>
                                        <ul className="space-y-2 max-w-lg">
                                            {item.keyPoints.map((point, pointIndex) => (
                                                <li key={pointIndex} className="timeline-keypoint text-sm text-gray-300 leading-relaxed flex items-start" style={{
                                                    opacity: 0,
                                                    transform: 'translateX(-10px)',
                                                    willChange: 'transform, opacity'
                                                }}>
                                                    <span className="inline-block w-1.5 h-1.5 bg-white/60 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                                    <span>{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                            </div>

                            {/* Image Side */}
                            <div className={`${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                                <div className="relative">
                                    <figure 
                                        className="timeline-image-figure rounded-2xl overflow-hidden bg-gray-800"
                                        style={{
                                            margin: 0,
                                            padding: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <img 
                                            src={item.image} 
                                            alt={item.title}
                                            loading="lazy"
                                            className="timeline-image w-full h-auto rounded-2xl"
                                            style={{
                                                transform: index === 0 || index === 2 ? 'scale(1.35)' : 'scale(1.15)',
                                                opacity: 0,
                                                willChange: 'transform, opacity',
                                                maxHeight: '400px',
                                                objectFit: index === 0 || index === 2 ? 'cover' : 'contain'
                                            }}
                                        />
                                    </figure>
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
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
});

HorizontalTimeline.displayName = 'HorizontalTimeline';

export default HorizontalTimeline;