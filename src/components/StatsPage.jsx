import React, { useEffect, useState, useRef, memo } from 'react';
import Odometer from 'react-odometerjs';
import { BorderBeam } from './ui/border-beam';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger, SplitText);

const StatsPage = memo(() => {
    const titleRef = useRef(null);
    const statsRef = useRef(null);
    const [stats, setStats] = useState([
        { value: 0, target: 100, label: '服务品牌', description: 'Brands Served', suffix: '+' },
        { value: 0, target: 7, label: '渠道覆盖国家', description: 'Countries with Retail Channels Coverage', suffix: '' },
        { value: 0, target: 11, label: '累计销售额', description: 'Cumulative Sales', suffix: '亿' },
        { value: 0, target: 91, label: '成功入驻产品', description: 'Products Listed', suffix: '+' }
    ]);

    useEffect(() => {
        // Stats animation triggered by scroll
        const statsScrollTrigger = ScrollTrigger.create({
            trigger: statsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            onEnter: () => {
                console.log("Stats animation triggered");
                setStats(prevStats => 
                    prevStats.map(stat => ({
                        ...stat,
                        value: stat.target
                    }))
                );
            },
            onLeave: () => {
                // Reset stats when scrolling away (optional)
                setStats(prevStats => 
                    prevStats.map(stat => ({
                        ...stat,
                        value: 0
                    }))
                );
            },
            onEnterBack: () => {
                // Re-trigger when scrolling back up
                setStats(prevStats => 
                    prevStats.map(stat => ({
                        ...stat,
                        value: stat.target
                    }))
                );
            }
        });

        return () => statsScrollTrigger.kill();
    }, []);

    useEffect(() => {
        if (titleRef.current) {
            // Split text into characters for animation
            const split = new SplitText(titleRef.current, { type: "words, chars" });
            
            console.log("Split text chars:", split.chars); // Debug log
            
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
                    trigger: titleRef.current,
                    start: "top 90%",
                    end: "top 30%",
                    scrub: true, // Smooth scrub animation tied to scroll
                    onStart: () => console.log("Animation started"), // Debug log
                    onComplete: () => console.log("Animation completed"), // Debug log
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
    return (
        <section
            className="py-60 relative h-1/2 overflow-hidden"
            style={{
                background: `
              radial-gradient(circle at center, rgb(0, 0, 0) 0px, rgba(1, 1, 1, 0) 100%), linear-gradient(rgb(191, 191, 189), rgba(0, 0, 0, 0.94) 70%)
                `
            }}
        >
            {/* Top gradient overlay for smooth transition from previous section */}
            {/* <div 
                className="absolute top-0 left-0 w-full h-32 pointer-events-none z-10"
                style={{
                    background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.5) 50%, transparent 100%)`
                }}
            /> */}
            <div className="container mx-auto px-4 relative z-10">
                {/* Section Title */}
                <div className="text-center mb-16">
                    {/* <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#762cde] via-white to-[#2c68de] bg-clip-text text-transparent">
                        Our Achievements
                    </h2> */}

                    <h2 className="text-7xl md:text-9xl font-bold mb-6 relative overflow-hidden">
                            <span ref={titleRef} className="text-white  block">
                            成就达成 
                            </span>
                        </h2>

                 
                </div>

                {/* Horizontal Stats Cards */}

<div className='w-full p-10 rounded-lg  '
// style={{
//     background: 'radial-gradient(100% 120% at 85% 0px, rgb(140 140 140), transparent 70%)',
    
// }}

>




                <div ref={statsRef} className="flex flex-col md:flex-row gap-32 max-w-screen mx-auto">
                    {stats.map((stat, index) => (
                        <div 
                        key={index}
                        className="group relative flex-1"
                        style={{ animationDelay: `${index * 200}ms` }}
                        >
                        {/* Card */}
                            <div className="relative bg-black/40 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl h-72 flex flex-col justify-between">
                                {/* Stat Value - Fixed height container */}
                                <div className="flex items-center justify-center h-16 mb-4">
                                    <Odometer 
                                        value={stat.value} 
                                        format="d"
                                        className="text-4xl md:text-5xl font-bold text-white"
                                        />
                                    {stat.suffix && (
                                        <span className="text-4xl md:text-5xl font-bold text-white ml-1">{stat.suffix}</span>
                                    )}
                                </div>
                                
                                {/* Middle section with fixed spacing */}
                                <div className="flex-1 flex flex-col justify-center">
                                    {/* Stat Label */}
                                    <h3 className="text-lg font-semibold text-white mb-3 h-12 flex items-center justify-center">
                                        {stat.label}
                                    </h3>
                                    
                                    {/* Stat Description */}
                                    <p className="text-white/80 text-sm leading-relaxed h-10 flex items-center justify-center">
                                        {stat.description}
                                    </p>
                                </div>
                                
                                {/* Bottom spacer to maintain consistent bottom spacing */}
                                <div className="h-6"></div>
                                
                                {/* Hover effect indicator */}
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-[#d1d1d1] to-[#2a2a2b] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                
                                <BorderBeam
                                    duration={6}
                                    delay={3}
                                    size={400}
                                    borderWidth={1}
                                    className="from-transparent via-white to-transparent"
                                    />
                            </div>
                        </div>
                    ))}
                    </div>


            
                </div>


                
            </div>

            
        </section>
    );
});

StatsPage.displayName = 'StatsPage';

export default StatsPage;