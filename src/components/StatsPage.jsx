import React, { useEffect, useState, useRef } from 'react';
import Odometer from 'react-odometerjs';
import { BorderBeam } from './ui/border-beam';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger, SplitText);

const StatsPage = () => {
    const titleRef = useRef(null);
    const statsRef = useRef(null);
    const [stats, setStats] = useState([
        { value: 0, target: 250, label: 'Happy Customers', description: 'Satisfied clients worldwide' },
        { value: 0, target: 500, label: 'Projects Completed', description: 'Successful deliveries on time' },
        { value: 0, target: 99, label: 'Success Rate', description: 'Exceeding expectations consistently' },
        { value: 0, target: 24, label: 'Years Experience', description: 'Building trust and excellence' }
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
            
            // Set initial state - blurred and invisible
            gsap.set(split.chars, {
                opacity: 0,
                y: 50,
                rotationX: 90,
                transformOrigin: "0% 50% -50px",
                "--blur": "10px",
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

            // Create scroll-triggered animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                    onStart: () => console.log("Animation started"), // Debug log
                    onComplete: () => console.log("Animation completed"), // Debug log
                }
            });

            

            tl.to(split.chars, {
                duration: 1,
                opacity: 1,
                y: 0,
                rotationX: 0,
                "--blur": "0px",
                stagger: 0.02,
                ease: "back.out(1.7)",
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
            className="py-20 relative w-full overflow-hidden"
            style={{
                background: `
                 radial-gradient(circle at bottom, rgb(0, 0, 0) 0px, #01010100 100%),
    linear-gradient(180deg, rgb(191, 191, 189), #000000f0 70%);
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

                    <h2 className="text-7xl md:text-9xl font-bold mb-6 relative">
                            <span ref={titleRef} className="text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                            Our Achievements
                            </span>
                        </h2>

                    <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                        Numbers that tell our story of growth, innovation, and unwavering commitment to excellence
                    </p>
                </div>

                {/* Horizontal Stats Cards */}

<div className='w-full p-10 rounded-lg border 0 '
style={{
    background: 'radial-gradient(100% 120% at 85% 0px, rgb(140 140 140), transparent 70%)',
    
}}

>




                <div ref={statsRef} className="flex flex-col md:flex-row gap-32 max-w-screen mx-auto">
                    {stats.map((stat, index) => (
                        <div 
                        key={index}
                        className="group relative flex-1"
                        style={{ animationDelay: `${index * 200}ms` }}
                        >
                            {/* Animated border */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#aea9b4] to-[#232324] rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            {/* Card */}
                            <div className="relative bg-black/40 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl h-72 flex flex-col justify-center">
                                {/* Stat Value */}
                                <div className="mb-4">
                                    <Odometer 
                                        value={stat.value} 
                                        format="d"
                                        className="text-4xl md:text-5xl font-bold text-white"
                                        />
                                </div>
                                
                                {/* Stat Label */}
                                <h3 className="text-lg font-semibold text-white mb-3">
                                    {stat.label}
                                </h3>
                                
                                {/* Stat Description */}
                                <p className="text-white/80 text-sm leading-relaxed">
                                    {stat.description}
                                </p>
                                
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
};

export default StatsPage;