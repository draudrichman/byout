import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltedCard from './ui/tilted-card';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger, SplitText);

const TeamSection = () => {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('PARTNERS');
  const [isTyping, setIsTyping] = useState(false);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);
  const morphingWordRef = useRef(null);

  // Words to cycle through
  const words = ['PARTNERS', 'TEAMMATES', 'FELLOWS', 'FRIENDS', 'ALLIES'];

  useEffect(() => {
    const timer = setTimeout(() => setAnimationPhase(1), 200);
    return () => clearTimeout(timer);
  }, []);

  // Morphing text effect
  useEffect(() => {
    let isCancelled = false;
    let timeoutId;
    
    const startAnimation = () => {
      // Set initial word immediately
      setDisplayText(words[0]);
      
      const typeWord = async (word, currentText = '') => {
        if (isCancelled) return;
        setIsTyping(true);
        
        // Erase current word if there is one
        if (currentText) {
          for (let i = currentText.length; i >= 0; i--) {
            if (isCancelled) return;
            setDisplayText(currentText.substring(0, i));
            await new Promise(resolve => timeoutId = setTimeout(resolve, 50));
          }
          
          // Pause between words
          await new Promise(resolve => timeoutId = setTimeout(resolve, 300));
        }
        
        // Type new word
        for (let i = 0; i <= word.length; i++) {
          if (isCancelled) return;
          setDisplayText(word.substring(0, i));
          await new Promise(resolve => timeoutId = setTimeout(resolve, 100));
        }
        
        setIsTyping(false);
        
        // Pause before next word
        await new Promise(resolve => timeoutId = setTimeout(resolve, 2000));
      };

      const cycleWords = async () => {
        // Wait a bit before starting the cycling
        await new Promise(resolve => timeoutId = setTimeout(resolve, 3000));
        
        // Infinite loop through all words
        let index = 0;
        while (!isCancelled) {
          const nextIndex = (index + 1) % words.length;
          const currentText = words[index];
          const nextText = words[nextIndex];
          
          await typeWord(nextText, currentText);
          
          if (!isCancelled) {
            index = nextIndex;
            setCurrentWordIndex(index);
          }
        }
      };

      cycleWords();
    };

    // Start animation after a short delay
    timeoutId = setTimeout(startAnimation, 1000);
    
    return () => {
      isCancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [words]);

  // Text animation useEffect
  useEffect(() => {
    if (titleRef.current) {
      // Split text into words for animation
      const split = new SplitText(titleRef.current, { type: "words" });
      
      // Set initial state
      gsap.set(split.words, {
        opacity: 0,
        y: 50,
        rotationX: 90,
        transformOrigin: "0% 50% -50px",
      });

      // Create scroll-triggered animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        }
      });

      tl.to(split.words, {
        duration: 1,
        opacity: 1,
        y: 0,
        rotationX: 0,
        stagger: 0.1,
        ease: "back.out(1.7)",
      });

      return () => {
        tl.kill();
        split.revert();
      };
    }
  }, []);

  // Grid animation useEffect
  useEffect(() => {
    if (gridRef.current && animationPhase >= 1) {
      const images = gridRef.current.querySelectorAll('.team-image');
      
      gsap.set(images, {
        opacity: 0,
        scale: 0.8,
        rotationY: 180,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        }
      });

      tl.to(images, {
        duration: 0.8,
        opacity: 1,
        scale: 1,
        rotationY: 0,
        stagger: {
          amount: 1.5,
          from: "random"
        },
        ease: "back.out(1.7)",
      });

      return () => {
        tl.kill();
      };
    }
  }, [animationPhase]);

  // Team member photos - using placeholder images that represent professional headshots
  const teamMembers = [
    { id: 1, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
    { id: 2, image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face' },
    { id: 3, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
    { id: 4, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face' },
    { id: 5, image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face' },
    { id: 6, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face' },
    { id: 7, image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face' },
    { id: 8, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face' },
    { id: 9, image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face' },
    { id: 10, image: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=150&h=150&fit=crop&crop=face' },
    { id: 11, image: 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=150&h=150&fit=crop&crop=face' },
    { id: 12, image: 'https://images.unsplash.com/photo-1526835746352-0b9da4054862?w=150&h=150&fit=crop&crop=face' },
    { id: 13, image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&fit=crop&crop=face' },
    { id: 14, image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face' },
    { id: 15, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
    { id: 16, image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face' },
    { id: 17, image: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=150&h=150&fit=crop&crop=face' },
    { id: 18, image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face' },
    { id: 19, image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face' },
    { id: 20, image: 'https://images.unsplash.com/photo-1546961329-78bef0414d7c?w=150&h=150&fit=crop&crop=face' },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full text-white overflow-hidden"
    >
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

      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen">
          
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div>
              <h1 
                ref={titleRef}
                className="text-4xl md:text-[3.4vw] font-bold leading-tight"
              >
                <span className="text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                  A GROUP OF EXTRAORDINARY{' '}
                  <span 
                    ref={morphingWordRef}
                    className="inline-block relative"
                  >
                    <span className="text-white">
                      {displayText}
                    </span>
                    {isTyping && (
                      <span className="inline-block w-0.5 h-[1em] bg-white ml-1 animate-pulse"></span>
                    )}
                  </span>
                  {' '}HAVE GATHERED HERE.
                </span>
              </h1>
            </div>
            
            {/* Chinese Text */}
            <div className="space-y-4">
              <p className="text-2xl md:text-3xl lg:text-5xl font-bold text-white/90">
                这里汇聚了
              </p>
              <p className="text-2xl md:text-3xl lg:text-5xl font-bold text-white/90">
                一群不甘平凡的
              </p>
              <p className="text-2xl md:text-3xl lg:text-5xl font-bold text-white/90">
                伙伴。
              </p>
            </div>
          </div>

          {/* Right Column - Team Photos Grid */}
          <div 
            ref={gridRef}
            className="grid grid-cols-4 gap-3 lg:gap-4"
          >
            {teamMembers.map((member, index) => (
         
           

<TiltedCard
  imageSrc={member.image}

  altText="Kendrick Lamar - GNX Album Cover"
  captionText="Kendrick Lamar - GNX"
  containerHeight="150px"
  containerWidth="150px"
  imageHeight="150px"
  imageWidth="150px"
  rotateAmplitude={12}
  scaleOnHover={1.2}
  showMobileWarning={false}
  showTooltip={true}
  displayOverlayContent={true}
/>
                
                
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced styling */}
      <style jsx>{`
        .team-image {
          position: relative;
        }
        
        .team-image::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 0.5rem;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent, rgba(255,255,255,0.05));
          opacity: 0;
          transition: opacity 0.3s;
        }

        .team-image:hover::after {
          opacity: 1;
        }

        .team-image:hover {
          box-shadow: 
            0 8px 32px rgba(255, 255, 255, 0.1),
            0 2px 8px rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </section>
  );
};

export default TeamSection;
