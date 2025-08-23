import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Preloader = ({ onComplete }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  
  const preloaderRef = useRef(null);
  const textRef = useRef(null);
  const logoRef = useRef(null);
  const circleRef = useRef(null);
  const particlesRef = useRef(null);
  const scanlineRef = useRef(null);
  
  // Generate particles
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    speed: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.8 + 0.2
  }));
  
  useEffect(() => {
    let animationId;
    let startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const duration = 4000; // 4 seconds
      const currentProgress = Math.min(elapsed / duration, 1);
      
      setProgress(Math.floor(currentProgress * 100));
      
      // Animate particles
      if (particlesRef.current) {
        const particleElements = particlesRef.current.children;
        Array.from(particleElements).forEach((particle, i) => {
          const data = particles[i];
          const newY = (data.y + data.speed * elapsed * 0.01) % 100;
          particle.style.transform = `translate(${data.x}vw, ${newY}vh)`;
          particle.style.opacity = Math.sin(elapsed * 0.001 + i) * 0.5 + 0.5;
        });
      }
      
      // Animate scanline
      if (scanlineRef.current) {
        const scanY = (elapsed * 0.1) % 100;
        scanlineRef.current.style.top = `${scanY}%`;
      }
      
      // Animate progress circle
      if (circleRef.current) {
        const circumference = 2 * Math.PI * 40;
        const offset = circumference - (currentProgress * circumference);
        circleRef.current.style.strokeDashoffset = offset;
      }
      
      if (currentProgress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        // Completion sequence
        setTimeout(() => {
          setLoading(false);
        }, 800);
      }
    };
    
    // Start animation after initial delay
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
      // Exit animation with scale and fade
      const preloader = preloaderRef.current;
      preloader.style.transition = 'all 1.5s cubic-bezier(0.77, 0, 0.175, 1)';
      preloader.style.transform = 'scale(1.1)';
      preloader.style.opacity = '0';
      preloader.style.filter = 'blur(10px)';
      
      setTimeout(() => {
        onComplete?.();
      }, 1500);
    }
  }, [loading, onComplete]);
  
  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      }}
    >
      {/* Animated background grid */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(5, 247, 70, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(5, 247, 70, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 10s linear infinite'
        }}
      />
      
      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: 'linear-gradient(45deg, #05f746, #0505f7)',
              boxShadow: '0 0 10px rgba(5, 247, 70, 0.5)',
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: 0,
              top: 0,
            }}
          />
        ))}
      </div>
      
      {/* Scanning line effect */}
      <div 
        ref={scanlineRef}
        className="absolute left-0 w-full h-0.5 opacity-60 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, #05f746, transparent)',
          boxShadow: '0 0 20px rgba(5, 247, 70, 0.8)',
        }}
      />
      
      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-12">
        
        {/* Logo with hologram effect */}
        <div 
          ref={logoRef}
          className="text-center"
          style={{
            animation: 'fadeInUp 1s ease-out 0.2s both'
          }}
        >
          <div 
            className="text-6xl font-bold tracking-wider mb-4 relative"
            style={{
              background: 'linear-gradient(45deg, #05f746, #0505f7, #05f746)',
              backgroundSize: '200% 200%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              animation: 'gradientShift 2s ease-in-out infinite alternate, textGlow 2s ease-in-out infinite alternate',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              textShadow: '0 0 30px rgba(5, 247, 70, 0.5)'
            }}
          >
            BeYOUT
            {/* Hologram scan effect */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                background: 'linear-gradient(180deg, transparent 0%, rgba(5, 247, 70, 0.2) 50%, transparent 100%)',
                animation: 'hologramScan 3s ease-in-out infinite'
              }}
            />
          </div>
          
          {/* Subtitle */}
          <div 
            className="text-sm tracking-widest uppercase font-light opacity-80"
            style={{
              color: '#05f746',
              animation: 'fadeIn 1s ease-out 0.8s both'
            }}
          >
            Initializing System
          </div>
        </div>
        
        {/* Progress section */}
        <div className="flex items-center space-x-8">
          
          {/* Circular progress indicator */}
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="rgba(5, 247, 70, 0.1)"
                strokeWidth="2"
              />
              {/* Progress circle */}
              <circle
                ref={circleRef}
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                style={{
                  strokeDasharray: `${2 * Math.PI * 40}`,
                  strokeDashoffset: `${2 * Math.PI * 40}`,
                  transition: 'stroke-dashoffset 0.3s ease',
                  filter: 'drop-shadow(0 0 10px rgba(5, 247, 70, 0.8))'
                }}
              />
              {/* Gradient definition */}
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#05f746" />
                  <stop offset="100%" stopColor="#0505f7" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Center progress text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span 
                className="text-xl font-light"
                style={{
                  color: '#05f746',
                  textShadow: '0 0 10px rgba(5, 247, 70, 0.8)'
                }}
              >
                {progress}%
              </span>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="flex flex-col space-y-3">
            <div 
              className="text-3xl font-light tracking-wider"
              ref={textRef}
              style={{
                color: '#ffffff',
                textShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
                animation: 'numberGlow 1s ease-in-out infinite alternate'
              }}
            >
              {progress < 100 ? 'LOADING' : 'COMPLETE'}
            </div>
            
            {/* Animated progress bar */}
            <div 
              className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden"
              style={{
                boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.5)'
              }}
            >
              <div 
                className="h-full rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #05f746, #0505f7)',
                  boxShadow: '0 0 20px rgba(5, 247, 70, 0.8)',
                  animation: 'progressGlow 2s ease-in-out infinite alternate'
                }}
              />
            </div>
            
            {/* Status indicators */}
            <div className="flex space-x-4 text-xs">
              {['SYSTEM', 'NETWORK', 'DATABASE', 'UI'].map((system, i) => (
                <div 
                  key={system}
                  className="flex items-center space-x-2"
                  style={{
                    opacity: progress > i * 25 ? 1 : 0.3,
                    transition: 'opacity 0.3s ease'
                  }}
                >
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: progress > i * 25 ? '#05f746' : '#333',
                      boxShadow: progress > i * 25 ? '0 0 10px rgba(5, 247, 70, 0.8)' : 'none'
                    }}
                  />
                  <span style={{ color: '#888' }}>{system}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </div>
      
      {/* Corner elements */}
      <div className="absolute top-8 left-8">
        <div 
          className="w-16 h-16 border-l-2 border-t-2"
          style={{ borderColor: '#05f746', opacity: 0.6 }}
        />
      </div>
      <div className="absolute top-8 right-8">
        <div 
          className="w-16 h-16 border-r-2 border-t-2"
          style={{ borderColor: '#05f746', opacity: 0.6 }}
        />
      </div>
      <div className="absolute bottom-8 left-8">
        <div 
          className="w-16 h-16 border-l-2 border-b-2"
          style={{ borderColor: '#05f746', opacity: 0.6 }}
        />
      </div>
      <div className="absolute bottom-8 right-8">
        <div 
          className="w-16 h-16 border-r-2 border-b-2"
          style={{ borderColor: '#05f746', opacity: 0.6 }}
        />
      </div>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        
        @keyframes textGlow {
          0% { filter: drop-shadow(0 0 20px rgba(5, 247, 70, 0.8)); }
          100% { filter: drop-shadow(0 0 40px rgba(5, 247, 70, 1)); }
        }
        
        @keyframes hologramScan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes numberGlow {
          0% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.5); }
          100% { text-shadow: 0 0 30px rgba(255, 255, 255, 0.9), 0 0 40px rgba(5, 247, 70, 0.5); }
        }
        
        @keyframes progressGlow {
          0% { box-shadow: 0 0 20px rgba(5, 247, 70, 0.8); }
          100% { box-shadow: 0 0 30px rgba(5, 247, 70, 1), 0 0 40px rgba(5, 5, 247, 0.8); }
        }
      `}</style>
    </div>
  );
};

export default Preloader;