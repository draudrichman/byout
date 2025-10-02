import React, { useEffect, useRef, memo } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

    const timelineData = [
        {
            year: 'Phase 1',
            phase: '第一阶段',
            title: '联合诊断与战略签约',
            subtitle: 'Joint Diagnosis & Strategic Signing',
            description: 'Mutual selection, clear strategy and investment, shared blueprint, laying the foundation for cooperation.',
            keyPoints: [
                '初步接洽与产品力初评：Brand submits company and product information. Service provider conducts preliminary assessment based on product commercial potential and channel matching degree.',
                '深度产品评测与市场洞察：Brand sends product samples for evaluation. Both parties sign NDA. Service provider issues detailed Product Market Adaptability Assessment Report and Channel Entry Strategic Recommendations.',
                '战略研讨会（线上/线下）：High-level meeting (≥3 hours) requiring participation from brand\'s founder and product lead. Core discussion on product optimization, market positioning, channel strategy, and financial models.',
                '方案报价与合约签订：Service provider offers integrated Product-Channel Dual-Drive one-stop service solution and quotation. Upon brand confirmation, contract is signed with first installment payment.'
            ],
            image: "./img/phase_1.jpg"
        },
        {
            year: 'Phase 2',
            phase: '第二阶段',
            title: '产品优化与准入准备',
            subtitle: 'Product Optimization & Access Preparation',
            description: 'To create innovative flagship products that meet North American market demands and complete all necessary access preparations.',
            keyPoints: [
                '成立专项小组与产品优化：Specialized team formed including product designers, product managers, channel experts, and brokers. Guides brand to complete product optimization, design confirmation, and final proofing.',
                '本地化与合规建设：Guides brand to register company, handle tax matters, and open bank accounts in target country. Completes product safety certifications (FCC, UL, CSA) and packaging label compliance. Prepares international logistics and warehousing solutions.'
            ],
            image: "./img/phase_2.jpg"
        },
        {
            year: 'Phase 3',
            phase: '第三阶段',
            title: '技术赋能与价值重塑',
            subtitle: 'Tech-Enablement & Value Remodeling',
            description: 'To introduce world\'s top 1 exclusive patented technology, fundamentally enhancing product competitiveness and brand\'s international commercial value.',
            keyPoints: [
                '技术方案植入与执行：HPH Technology Custom Application - ultra-high pressure nano-crushing for dynamic sterilization, nano-homogenization, extended shelf life, and optimized innovative taste and flavor.',
                'PEF技术定制应用：PEF Technology Custom Application - planning terminal preservation solutions using F-pulse electric field non-thermal sterilization technology for smart cold chain cabinets and revolutionary product transport preservation.'
            ],
            image: "./img/phase_3.jpg"
        },
        {
            year: 'Phase 4',
            phase: '第四阶段',
            title: '渠道推进与订单获取',
            subtitle: 'Channel Promotion & Order Acquisition',
            description: 'To successfully recommend products into target channels.',
            keyPoints: [
                '正式渠道推荐与谈判：Professional Broker team recommends product to purchasing decision-makers at target supermarkets (e.g., Sams Club). Based on feedback, guides brand to adjust final product, price, or packaging.',
                '试销与订单获取：Promotes supermarket to arrange trial orders (First Order). Assists brand and supermarket in signing formal Purchase Orders (PO). Second and third installment payments triggered after trial orders and formal contract signing.'
            ],
            image: "./img/phase_4.jpg"
        },
        {
            year: 'Phase 5',
            phase: '第五阶段',
            title: '落地运营与持续增长',
            subtitle: 'Landing Operation & Sustainable Growth',
            description: 'To ensure stable supply, sales, and maintenance, and achieve sustainable growth.',
            keyPoints: [
                '大货生产与入仓：Brand produces mass goods according to PO and delivers to supermarket\'s central warehouse (RDC) via designated logistics. Commission (Sales Share) activated upon successful warehouse entry.',
                '长期运营与增值服务：Inventory Management including daily order processing and monitoring. Channel Maintenance with store visits and promotional activities. Customer Service handling returns and complaints. Growth Services including new product recommendations and channel expansion.'
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
                // Set initial states - simpler and smoother
                gsap.set(firstImage, {
                    scale: 1.15,
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
            return ScrollTrigger.create({
                trigger: section,
                start: "top top",
                end: `+=${scrollDistance}`,
                pin: true,
                scrub: 0.3, // Optimized for better performance
                invalidateOnRefresh: true,
                anticipatePin: 1,
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
                                    // Reset image - simple scale animation
                                    gsap.set(image, {
                                        scale: 1.15,
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
        };
    }, []);

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
                                            {item.keyPoints.slice(0, 2).map((point, pointIndex) => (
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
                                        className="timeline-image-figure aspect-[4/3] rounded-2xl overflow-hidden bg-gray-800"
                                        style={{
                                            margin: 0,
                                            padding: 0,
                                            display: 'grid',
                                            placeItems: 'center'
                                        }}
                                    >
                                        <img 
                                            src={item.image} 
                                            alt={item.title}
                                            loading="lazy"
                                            className="timeline-image w-full h-full object-cover"
                                            style={{
                                                transform: 'scale(1.15)',
                                                opacity: 0,
                                                willChange: 'transform, opacity'
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