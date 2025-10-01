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

        // Show first item initially with animations
        if (items[0]) {
            gsap.set(items[0], {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)"
            });

            // Initialize first item animations
            const firstFigure = items[0].querySelector('.timeline-image-figure');
            const firstImage = items[0].querySelector('.timeline-image');
            const firstText = items[0].querySelector('.timeline-text');
            const firstPhase = items[0].querySelector('.timeline-phase');
            const firstTitle = items[0].querySelector('.timeline-title');
            const firstSubtitle = items[0].querySelector('.timeline-subtitle');
            const firstKeypoints = items[0].querySelector('.timeline-keypoints');
            const firstKeypointItems = items[0].querySelectorAll('.timeline-keypoint');

            if (firstFigure && firstImage && firstText) {
                // Set initial states for image
                gsap.set(firstFigure, {
                    clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)'
                });
                gsap.set(firstImage, {
                    transform: 'scale(1.5)'
                });

                // Set initial states for text elements
                gsap.set([firstPhase, firstTitle, firstSubtitle, firstText, firstKeypoints], {
                    opacity: 0,
                    y: 30,
                    clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)'
                });

                // Set initial states for keypoint items
                gsap.set(firstKeypointItems, {
                    opacity: 0,
                    y: 15
                });

                // Trigger initial animations after a short delay
                const initialTl = gsap.timeline({ delay: 0.5 });
                
                // Image reveal
                initialTl.to(firstFigure, {
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                    duration: 1,
                    ease: "power3.out"
                });

                initialTl.to(firstImage, {
                    transform: 'scale(1)',
                    duration: 1,
                    ease: "power3.out"
                }, "<");

                // Text reveals with fast stagger
                initialTl.to(firstPhase, {
                    opacity: 1,
                    y: 0,
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                    duration: 0.4,
                    ease: "power2.out"
                }, "+=0.05");

                initialTl.to(firstTitle, {
                    opacity: 1,
                    y: 0,
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                    duration: 0.4,
                    ease: "power2.out"
                }, "-=0.3");

                initialTl.to(firstSubtitle, {
                    opacity: 1,
                    y: 0,
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                    duration: 0.4,
                    ease: "power2.out"
                }, "-=0.3");

                initialTl.to(firstText, {
                    opacity: 1,
                    y: 0,
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                    duration: 0.4,
                    ease: "power2.out"
                }, "-=0.25");

                initialTl.to(firstKeypoints, {
                    opacity: 1,
                    y: 0,
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                    duration: 0.4,
                    ease: "power2.out"
                }, "-=0.25");

                // Animate individual keypoint items with faster stagger
                initialTl.to(firstKeypointItems, {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    stagger: 0.05,
                    ease: "power2.out"
                }, "-=0.2");


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

                            // Only trigger animations if this is a new active index
                            if (previousActiveIndex.current !== clampedIndex) {
                                previousActiveIndex.current = clampedIndex;

                                // Trigger image and text reveal animations
                                const figure = item.querySelector('.timeline-image-figure');
                                const image = item.querySelector('.timeline-image');
                                const text = item.querySelector('.timeline-text');
                                const phase = item.querySelector('.timeline-phase');
                                const title = item.querySelector('.timeline-title');
                                const subtitle = item.querySelector('.timeline-subtitle');
                                const keypoints = item.querySelector('.timeline-keypoints');
                                const keypointItems = item.querySelectorAll('.timeline-keypoint');

                                if (figure && image && text) {
                                    // Reset image animations
                                    gsap.set(figure, {
                                        clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)'
                                    });
                                    gsap.set(image, {
                                        transform: 'scale(1.5)'
                                    });

                                    // Reset text animations
                                    gsap.set([phase, title, subtitle, text, keypoints], {
                                        opacity: 0,
                                        y: 30,
                                        clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)'
                                    });

                                    // Reset individual keypoint items
                                    gsap.set(keypointItems, {
                                        opacity: 0,
                                        y: 15
                                    });

                                    // Create timeline for animations
                                    const animationTl = gsap.timeline();

                                    // Image reveal animation
                                    animationTl.to(figure, {
                                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                                        duration: 1,
                                        ease: "power3.out"
                                    });

                                    animationTl.to(image, {
                                        transform: 'scale(1)',
                                        duration: 1,
                                        ease: "power3.out"
                                    }, "<"); // Start at the same time as figure animation

                                    // Text reveal animations (fast and snappy)
                                    animationTl.to(phase, {
                                        opacity: 1,
                                        y: 0,
                                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                                        duration: 0.4,
                                        ease: "power2.out"
                                    }, "+=0.05");

                                    animationTl.to(title, {
                                        opacity: 1,
                                        y: 0,
                                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                                        duration: 0.4,
                                        ease: "power2.out"
                                    }, "-=0.3");

                                    animationTl.to(subtitle, {
                                        opacity: 1,
                                        y: 0,
                                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                                        duration: 0.4,
                                        ease: "power2.out"
                                    }, "-=0.3");

                                    animationTl.to(text, {
                                        opacity: 1,
                                        y: 0,
                                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                                        duration: 0.4,
                                        ease: "power2.out"
                                    }, "-=0.25");

                                    animationTl.to(keypoints, {
                                        opacity: 1,
                                        y: 0,
                                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                                        duration: 0.4,
                                        ease: "power2.out"
                                    }, "-=0.25");

                                    // Animate individual keypoint items with faster stagger
                                    animationTl.to(keypointItems, {
                                        opacity: 1,
                                        y: 0,
                                        duration: 0.3,
                                        stagger: 0.05,
                                        ease: "power2.out"
                                    }, "-=0.2");

                                }
                            }
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
            @keyframes rollFromLeft {
                from {
                    clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
                }
                to {
                    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
                }
            }
            @keyframes scaleDown {
                from {
                    transform: scale(1.5);
                }
                to {
                    transform: scale(1);
                }
            }
            @keyframes rollFromRight {
                from {
                    opacity: 0;
                    clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
                }
                to {
                    opacity: 1;
                    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
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
                                            clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)'
                                        }}
                                    >
                                        {item.year} • {item.phase}
                                    </p>
                                    <h2 
                                        className="timeline-title text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white leading-tight"
                                        style={{
                                            opacity: 0,
                                            transform: 'translateY(30px)',
                                            clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)'
                                        }}
                                    >
                                        {item.title}
                                    </h2>
                                    <p 
                                        className="timeline-subtitle text-base md:text-lg text-gray-300 font-medium italic"
                                        style={{
                                            opacity: 0,
                                            transform: 'translateY(20px)',
                                            clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)'
                                        }}
                                    >
                                        {item.subtitle}
                                    </p>
                                </div>
                                <figcaption 
                                    className="timeline-text text-lg md:text-xl text-gray-100 leading-relaxed max-w-lg"
                                    style={{
                                        opacity: 0,
                                        transform: 'translateY(25px)',
                                        display: 'inline',
                                        fontFamily: 'inherit',
                                        clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)'
                                    }}
                                >
                                    {item.description}
                                </figcaption>
                                
                                {/* Key Points */}
                                {item.keyPoints && item.keyPoints.length > 0 && (
                                    <div className="timeline-keypoints space-y-3" style={{
                                        opacity: 0,
                                        transform: 'translateY(30px)',
                                        clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)'
                                    }}>
                                        <h4 className="text-sm font-semibold text-gray-200 uppercase tracking-wide">
                                            关键要点 Key Points
                                        </h4>
                                        <ul className="space-y-2 max-w-lg">
                                            {item.keyPoints.slice(0, 2).map((point, pointIndex) => (
                                                <li key={pointIndex} className="timeline-keypoint text-sm text-gray-300 leading-relaxed flex items-start" style={{
                                                    opacity: 0,
                                                    transform: 'translateY(15px)',
                                                    transitionDelay: `${pointIndex * 100}ms`
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
                                        className="timeline-image-figure aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200"
                                        style={{
                                            margin: 0,
                                            padding: 0,
                                            display: 'grid',
                                            placeItems: 'center',
                                            clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)'
                                        }}
                                    >
                                        <div style={{ overflow: 'hidden' }} className="w-full h-full">
                                            <img 
                                                src={item.image} 
                                                alt={item.title}
                                                className="timeline-image w-full h-full object-cover"
                                                style={{
                                                    transform: 'scale(1.5)'
                                                }}
                                            />
                                        </div>
                                    </figure>
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