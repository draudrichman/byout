import React, { useEffect, useState } from 'react';
import Odometer from 'react-odometerjs';
import { BorderBeam } from './ui/border-beam';

const StatsPage = () => {
    const [stats, setStats] = useState([
        { value: 0, target: 1500, label: 'Happy Customers', description: 'Satisfied clients worldwide' },
        { value: 0, target: 500, label: 'Projects Completed', description: 'Successful deliveries on time' },
        { value: 0, target: 99, label: 'Success Rate', description: 'Exceeding expectations consistently' },
        { value: 0, target: 24, label: 'Years Experience', description: 'Building trust and excellence' }
    ]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setStats(prevStats => 
                prevStats.map(stat => ({
                    ...stat,
                    value: stat.target
                }))
            );
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section
            className="py-20 relative w-full overflow-hidden"
            style={{
                background: `
                    radial-gradient(circle, rgb(0, 0, 0) 0px, #01010100 100%),
                    linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgb(191, 191, 189) 30%, #000000f0 70%)
                `
            }}
        >
            {/* Top gradient overlay for smooth transition from previous section */}
            <div 
                className="absolute top-0 left-0 w-full h-32 pointer-events-none z-10"
                style={{
                    background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.5) 50%, transparent 100%)`
                }}
            />
            <div className="container mx-auto px-4 relative z-10">
                {/* Section Title */}
                <div className="text-center mb-16">
                    {/* <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#762cde] via-white to-[#2c68de] bg-clip-text text-transparent">
                        Our Achievements
                    </h2> */}

                    <h2 className="text-7xl md:text-9xl font-bold mb-6 relative">
                            <span className="bg-gradient-to-r from-[#444444] via-white to-[#444444] bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                            Our Achievements
                            </span>
                        </h2>

                    <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                        Numbers that tell our story of growth, innovation, and unwavering commitment to excellence
                    </p>
                </div>

                {/* Horizontal Stats Cards */}
                <div className="flex flex-col md:flex-row gap-32 max-w-screen mx-auto">
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
        </section>
    );
};

export default StatsPage;