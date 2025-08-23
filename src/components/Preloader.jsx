import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Preloader = ({ onComplete }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('Initializing');
  
  const preloaderRef = useRef(null);
  const globeRef = useRef(null);
  const particlesRef = useRef(null);
  const scanlineRef = useRef(null);
  const circuitRef = useRef(null);
  
  const phases = [
    'Initializing Global Network',
    'Connecting Asian Markets',
    'Establishing Trade Routes',
    'Analyzing Consumer Data',
    'Synchronizing Partnerships',
    'Launching Market Expansion'
  ];
  
  // Generate connection lines between continents
  const connections = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    startX: Math.random() * 80 + 10,
    startY: Math.random() * 60 + 20,
    endX: Math.random() * 80 + 10,
    endY: Math.random() * 60 + 20,
    delay: Math.random() * 2
  }));
  
  // Generate floating data particles
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    speed: Math.random() * 1 + 0.5,
    type: Math.random() > 0.5 ? 'data' : 'trade'
  }));
  
  useEffect(() => {
    let animationId;
    let startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const duration = 5000; // 5 seconds
      const currentProgress = Math.min(elapsed / duration, 1);
      
      setProgress(Math.floor(currentProgress * 100));
      
      // Update phase based on progress
      const phaseIndex = Math.floor(currentProgress * phases.length);
      if (phaseIndex < phases.length) {
        setCurrentPhase(phases[phaseIndex]);
      }
      
      // Animate particles
      if (particlesRef.current) {
        const particleElements = particlesRef.current.children;
        Array.from(particleElements).forEach((particle, i) => {
          const data = particles[i];
          const newX = (data.x + data.speed * elapsed * 0.01) % 100;
          const newY = (data.y + Math.sin(elapsed * 0.001 + i) * 10) % 100;
          particle.style.transform = `translate(${newX}vw, ${newY}vh)`;
          particle.style.opacity = Math.sin(elapsed * 0.002 + i) * 0.5 + 0.5;
        });
      }
      
      // Animate globe rotation
      if (globeRef.current) {
        const rotation = (elapsed * 0.05) % 360;
        globeRef.current.style.transform = `rotate(${rotation}deg)`;
      }
      
      // Animate scanning effect
      if (scanlineRef.current) {
        const scanY = (elapsed * 0.08) % 100;
        scanlineRef.current.style.top = `${scanY}%`;
      }
      
      if (currentProgress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    
    setTimeout(() => {
      animate();
    }, 500);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);
  
  useEffect(() => {
    if (!loading && preloaderRef.current) {
      const preloader = preloaderRef.current;
      preloader.style.transition = 'all 1.8s cubic-bezier(0.77, 0, 0.175, 1)';
      preloader.style.transform = 'scale(1.2)';
      preloader.style.opacity = '0';
      preloader.style.filter = 'blur(15px)';
      
      setTimeout(() => {
        onComplete?.();
      }, 1800);
    }
  }, [loading, onComplete]);
  
  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 30%, #0f3460 70%, #0a0a0a 100%)',
      }}
    >
      {/* Animated circuit board background */}
      <div 
        ref={circuitRef}
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(5, 247, 70, 0.3) 1px, transparent 1px),
            linear-gradient(rgba(5, 247, 70, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(5, 5, 247, 0.2) 1px, transparent 1px),
            linear-gradient(rgba(5, 5, 247, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 100px 100px, 50px 50px, 50px 50px',
          animation: 'circuitFlow 20s linear infinite'
        }}
      />
      
   
      
      {/* Floating data particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute flex items-center justify-center"
            style={{
              width: `${particle.size * 2}px`,
              height: `${particle.size * 2}px`,
              left: 0,
              top: 0,
            }}
          >
            {particle.type === 'data' ? (
              <div
                className="w-full h-full rounded-sm"
                style={{
                  background: 'linear-gradient(45deg, #05f746, transparent)',
                  boxShadow: '0 0 8px rgba(5, 247, 70, 0.6)',
                  animation: 'dataFloat 3s ease-in-out infinite'
                }}
              />
            ) : (
              <div
                className="w-full h-full rounded-full border"
                style={{
                  borderColor: '#0505f7',
                  boxShadow: '0 0 6px rgba(5, 5, 247, 0.6)',
                  animation: 'tradeOrbit 4s ease-in-out infinite'
                }}
              />
            )}
          </div>
        ))}
      </div>
      
 
      {/* Main content container */}
      <div className="relative z-20 flex flex-col items-center justify-center space-y-16">
        
        {/* Company logo with holographic effect */}
        <div 
          className="text-center"
          style={{
            animation: 'fadeInUp 1.5s ease-out 0.3s both'
          }}
        >
          <div 
            className="text-7xl font-bold tracking-wider mb-4 relative"
            style={{
              background: 'linear-gradient(45deg, #05f746, #0505f7, #05f746)',
              backgroundSize: '300% 300%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              animation: 'logoShimmer 3s ease-in-out infinite, textGlow 2s ease-in-out infinite alternate',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              filter: 'drop-shadow(0 0 30px rgba(5, 247, 70, 0.5))'
            }}
          >
            BeYOUT
            {/* Holographic scanner */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                background: 'linear-gradient(180deg, transparent 0%, rgba(5, 247, 70, 0.4) 50%, transparent 100%)',
                animation: 'hologramScan 4s ease-in-out infinite'
              }}
            />
          </div>
          
          <div 
            className="text-lg tracking-widest uppercase font-light mb-2"
            style={{
              color: '#05f746',
              animation: 'fadeIn 1s ease-out 1s both',
              textShadow: '0 0 15px rgba(5, 247, 70, 0.5)'
            }}
          >
            Global Market Expansion
          </div>
          
          <div 
            className="text-sm opacity-80"
            style={{
              color: '#ffffff',
              animation: 'fadeIn 1s ease-out 1.5s both'
            }}
          >
            Connecting Chinese Brands to the World Since 2004
          </div>
        </div>
        
        {/* Central globe visualization */}
        <div className="relative flex items-center justify-center">
          
          {/* Rotating globe wireframe */}
          <div 
            ref={globeRef}
            className="relative w-32 h-32"
          >
            <div 
              className="absolute inset-0 rounded-full border-2 opacity-60"
              style={{
                borderColor: '#05f746',
                boxShadow: '0 0 40px rgba(5, 247, 70, 0.3)',
                animation: 'globePulse 3s ease-in-out infinite'
              }}
            />
            <div 
              className="absolute inset-2 rounded-full border opacity-40"
              style={{
                borderColor: '#0505f7',
                borderStyle: 'dashed',
                animation: 'globePulse 3s ease-in-out infinite 0.5s'
              }}
            />
            <div 
              className="absolute inset-4 rounded-full border opacity-30"
              style={{
                borderColor: '#ffffff',
                borderStyle: 'dotted',
                animation: 'globePulse 3s ease-in-out infinite 1s'
              }}
            />
            
            {/* Center core */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="w-8 h-8 rounded-full"
                style={{
                  background: 'radial-gradient(circle, #05f746, #0505f7)',
                  boxShadow: '0 0 20px rgba(5, 247, 70, 0.8)',
                  animation: 'coreGlow 2s ease-in-out infinite alternate'
                }}
              />
            </div>
          </div>
          
          {/* Progress info panel */}
          <div className="ml-16 flex flex-col space-y-6">
            
            {/* Progress percentage */}
            <div className="text-center">
              <div 
                className="text-5xl font-light mb-2"
                style={{
                  color: '#ffffff',
                  textShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
                  animation: 'numberGlow 1s ease-in-out infinite alternate'
                }}
              >
                {progress}%
              </div>
              
              <div 
                className="text-sm tracking-wider uppercase"
                style={{
                  color: '#05f746',
                  animation: 'fadeIn 1s ease-out 2s both'
                }}
              >
                {progress < 100 ? 'EXPANDING' : 'READY'}
              </div>
            </div>
            
            {/* Dynamic progress bar */}
            <div className="w-80">
              <div 
                className="h-1 bg-gray-800 rounded-full overflow-hidden mb-3"
                style={{
                  boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.5)'
                }}
              >
                <div 
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #05f746, #0505f7)',
                    boxShadow: '0 0 20px rgba(5, 247, 70, 0.8)',
                    animation: 'progressGlow 2s ease-in-out infinite alternate'
                  }}
                />
              </div>
              
              {/* Current phase indicator */}
              <div 
                className="text-center text-sm font-light tracking-wide"
                style={{
                  color: '#ffffff',
                  minHeight: '20px',
                  transition: 'all 0.5s ease-in-out'
                }}
              >
                {currentPhase}
              </div>
            </div>
            
            {/* Market indicators */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              {[
                { region: 'China Base', status: progress > 10 },
                { region: 'North America', status: progress > 30 },
                { region: 'Europe', status: progress > 60 },
                { region: 'Global Network', status: progress > 90 }
              ].map((market) => (
                <div 
                  key={market.region}
                  className="flex items-center space-x-2"
                  style={{
                    opacity: market.status ? 1 : 0.3,
                    transition: 'opacity 0.5s ease'
                  }}
                >
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: market.status ? '#05f746' : '#333',
                      boxShadow: market.status ? '0 0 8px rgba(5, 247, 70, 0.8)' : 'none',
                      animation: market.status ? 'pulse 2s ease-in-out infinite' : 'none'
                    }}
                  />
                  <span style={{ color: '#888' }}>{market.region}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Corner UI elements */}
      <div className="absolute top-8 left-8">
        <div 
          className="w-20 h-20 border-l-2 border-t-2"
          style={{ borderColor: '#05f746', opacity: 0.6 }}
        />
        <div className="text-xs mt-2" style={{ color: '#05f746' }}>EST. 2004</div>
      </div>
      <div className="absolute top-8 right-8">
        <div 
          className="w-20 h-20 border-r-2 border-t-2"
          style={{ borderColor: '#0505f7', opacity: 0.6 }}
        />
        <div className="text-xs mt-2 text-right" style={{ color: '#0505f7' }}>GUANGZHOU</div>
      </div>
      <div className="absolute bottom-8 left-8">
        <div 
          className="w-20 h-20 border-l-2 border-b-2"
          style={{ borderColor: '#05f746', opacity: 0.6 }}
        />
        <div className="text-xs" style={{ color: '#05f746' }}>20+ YEARS</div>
      </div>
      <div className="absolute bottom-8 right-8">
        <div 
          className="w-20 h-20 border-r-2 border-b-2"
          style={{ borderColor: '#0505f7', opacity: 0.6 }}
        />
        <div className="text-xs text-right" style={{ color: '#0505f7' }}>GLOBAL</div>
      </div>
      

    </div>
  );
};
export default Preloader;