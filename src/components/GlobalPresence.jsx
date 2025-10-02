import React, { useState, useEffect, useRef, memo } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlowCircle from './GlowCircle';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger, SplitText);

const GlobalPresence = memo(() => {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationPhase(1), 200);
    return () => clearTimeout(timer);
  }, []);



  // Text animation useEffect
  useEffect(() => {
    if (titleRef.current) {
      // Split text into characters for animation
      const split = new SplitText(titleRef.current, { type: "words, chars" });
      
      console.log("Global Presence split text chars:", split.chars); // Debug log
      
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
          onStart: () => console.log("Global Presence animation started"), // Debug log
          onComplete: () => console.log("Global Presence animation completed"), // Debug log
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

  // Track mouse position
  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      });
    }
  };

  const cities = [
    'China',
    'US',
    'Canada',
    'Australia',
    'Cambodia',
    'New Zealand',
    'Japan'
  ];

  const officeLocations = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      titleChinese: 'China',
      titleEnglish: 'BY&LM Shanghai Headquarters',
      location: 'China'
    },
    {
      id: 2,
      image: 'https://lp-cms-production.imgix.net/2023-02/GettyImages-1162611090.jpg?auto=format,compress&q=72&w=1095&fit=crop&crop=faces,edges',
      titleChinese: 'US',
      titleEnglish: 'BY with Shanghai Pudong',
      location: 'USA'
    },
    {
      id: 3,
      image: 'https://cdn-imgix.headout.com/media/images/e3df4ea66b17c3f9303171ff7f64678d-24206-TokyoHelicopterTour-005.jpg?auto=format&q=90&crop=faces&fit=crop',
      titleChinese: 'Canada',
      titleEnglish: 'Canada',
      location: 'Canada'
    },
    {
      id: 4,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Lights_of_Rockefeller_Center_during_sunset.jpg/1200px-Lights_of_Rockefeller_Center_during_sunset.jpg',
      titleChinese: 'New Zealand',
      titleEnglish: 'Australia',
      location: 'Australia'
    },
    {
      id: 5,
      image: 'https://lp-cms-production.imgix.net/2025-08/shutterstock2364334921.jpg?auto=format,compress&q=72&w=1440&h=810&fit=crop',
      titleChinese: 'Cambodia',
      titleEnglish: 'Cambodia',
      location: 'Cambodia'
    },
    {
      id: 6,
      image: 'https://www.o-city.com/hubfs/Shenzhen-smartcity02.jpg',
      titleChinese: 'New Zealand',
      titleEnglish: 'New Zealand',
      location: 'New Zealand'
    }
  ];

  const bilingualCities = [
    { chinese: '上海', english: '大湾区', separator: '东京' },
    { chinese: '青岛', english: '香港', separator: '奥尔良' },
    { chinese: '首尔', english: '大阪', separator: '东京' }
  ];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-black text-white overflow-hidden"
      onMouseMove={handleMouseMove}
    >



      {/* Enhanced Background with subtle silver accents */}
      <div className="absolute inset-0">
        {/* Base background */}
        <div className="absolute inset-0 bg-black"></div>
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(192,192,192,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(192,192,192,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
          }}
        ></div>
        
        {/* Subtle silver accent spots */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-300/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gray-200/3 rounded-full blur-3xl"></div>



        
      </div>


   

      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-24">

        {/* Enhanced Header */}
        <div className="text-center mb-16">
        <h2 className="text-7xl md:text-9xl font-bold mb-6 relative overflow-hidden">
                            <span ref={titleRef} className="text-white block">
                           Global Presence
                            </span>
                        </h2>
        </div>

        {/* Main Grid Layout - keeping original structure */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Cities List */}
          <div className="space-y-6 lg:space-y-8">            
            <div className="space-y-4 lg:space-y-6">
              {cities.map((city, index) => (
                <div
                  key={city}
                  className={`
                    city-item relative overflow-hidden
                    transform transition-all duration-700 ease-out
                    ${animationPhase >= 1 
                      ? 'translate-x-0 opacity-100' 
                      : '-translate-x-8 opacity-0'
                    }
                  `}
                  style={{ 
                    transitionDelay: `${index * 100}ms` 
                  }}
                >
                  <h3 className="
                    text-2xl lg:text-[3vw] font-bold 
                    cursor-pointer group relative
                    transition-all duration-300
                    hover:scale-105
                  ">
                    <span className="
                      relative z-10 block
                      bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent transition-all duration-500
                    ">
                      {city}
                    </span>
                    
               
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Enhanced Office Location Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {officeLocations.map((location, index) => (
              <div
                key={location.id}
                className={`
                  office-card group relative overflow-hidden
                  bg-black backdrop-blur-sm rounded-xl 
                  border border-gray-700/60 hover:border-gray-500/80
                  transition-all duration-500
                  transform hover:scale-105 hover:shadow-2xl
                  ${animationPhase >= 1 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-8 opacity-0'
                  }
                `}
                style={{ 
                  transitionDelay: `${(index + cities.length) * 100}ms`,
                  boxShadow: '0 4px 30px rgba(255, 255, 255, 0.05)'
                }}
              >
                {/* Image Container with enhanced shader effects */}
                <div className="relative h-48 overflow-hidden rounded-t-xl">
                  <img
                    src={location.image}
                    alt={location.titleEnglish}
                    loading="lazy"
                    className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                  />
                  
                  {/* Enhanced silver shine sweep */}
                  <div className="
                    absolute inset-0 
                    bg-gradient-to-r from-transparent via-gray-200/40 to-transparent
                    opacity-0 group-hover:opacity-100
                    transform -skew-x-12 -translate-x-full
                    group-hover:translate-x-full
                    transition-all duration-1200 ease-out
                    mix-blend-overlay
                  "></div>

                  {/* Enhanced caption overlay */}
                  <div className="
                    absolute bottom-0 left-0 right-0
                    bg-gradient-to-t from-black via-black/90 to-transparent
                    p-4 text-white
                  ">
                    <h4 className="font-bold text-sm mb-1">
                      <span className="text-gray-200">{location.titleChinese}</span>
                    </h4>
                    <p className="text-xs text-gray-300">
                      {location.titleEnglish}
                    </p>
                  </div>
                </div>

                {/* Enhanced card footer */}
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm font-medium">{location.location}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-gray-300 to-gray-500 animate-pulse"></div>
                      <div className="w-1 h-1 rounded-full bg-gray-500"></div>
                    </div>
                  </div>
                  
                  {/* Connection line */}
                  <div className="mt-3 h-px bg-gradient-to-r from-gray-600 via-gray-400 to-transparent opacity-50"></div>
                </div>
              </div>
            ))}
          </div>
        </div>





        {/* Enhanced bottom section */}
        <div className="mt-16 pt-8 border-t border-gray-800/60">
          <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
            {bilingualCities.map((cityGroup, index) => (
              <div key={index} className="flex items-center space-x-6">
                {[cityGroup.chinese, cityGroup.english, cityGroup.separator].map((city, cityIndex) => (
                  <div key={cityIndex} className="relative group cursor-pointer">
                    <span className="
                      text-lg lg:text-xl font-medium
                      bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400
                      bg-clip-text text-transparent
                      hover:from-white hover:via-gray-100 hover:to-white
                      transition-all duration-300
                    ">
                      {city}
                    </span>
                    
                    {/* Enhanced underline animation */}
                    <div className="
                      absolute bottom-0 left-0 right-0 h-0.5
                      bg-gradient-to-r from-gray-600 via-gray-300 to-gray-600
                      transform scale-x-0 group-hover:scale-x-100
                      transition-transform duration-300 origin-left
                    "></div>
                    
                    {/* Subtle glow effect */}
                    <div className="
                      absolute inset-0 blur-sm
                      bg-gradient-to-r from-gray-300/20 to-gray-200/20
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-300
                    "></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>



        
      </div>

      {/* Enhanced styling with silver accents */}
      <style jsx>{`
        .city-item::before {
          content: '';
          position: absolute;
          left: -100%;
          top: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(192,192,192,0.15), transparent);
          transition: left 0.5s;
        }
        
        .city-item:hover::before {
          left: 100%;
        }

        .office-card {
          backdrop-filter: blur(10px);
        }

        .office-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 0.75rem;
          padding: 1px;
          background: linear-gradient(135deg, rgba(192,192,192,0.4), transparent, rgba(255,255,255,0.3));
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: subtract;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .office-card:hover::after {
          opacity: 1;
        }

        .office-card:hover {
          box-shadow: 
            0 8px 32px rgba(255, 255, 255, 0.08),
            0 2px 8px rgba(192, 192, 192, 0.1);
        }
      `}</style>
    </section>
  );
});

GlobalPresence.displayName = 'GlobalPresence';

export default GlobalPresence;