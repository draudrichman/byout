import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 100);
  }, []);
  
  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
        transform: isVisible ? 'scale(1)' : 'scale(1.1)',
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? 'blur(0px)' : 'blur(20px)',
        transition: 'all 2s cubic-bezier(0.23, 1, 0.32, 1)'
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: i % 2 === 0 ? '#05f746' : '#0505f7',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 10px ${i % 2 === 0 ? 'rgba(5, 247, 70, 0.5)' : 'rgba(5, 5, 247, 0.5)'}`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 2}s`,
              animationDirection: Math.random() > 0.5 ? 'normal' : 'reverse'
            }}
          />
        ))}
      </div>
      
      {/* Main content */}
      <div className="text-center z-10 space-y-8 px-8">
        <div
          style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 1s ease-out 0.5s'
          }}
        >
          <h1 
            className="text-7xl font-bold tracking-wider mb-6"
            style={{
              background: 'linear-gradient(45deg, #05f746, #0505f7, #05f746)',
              backgroundSize: '200% 200%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              animation: 'gradientShift 3s ease-in-out infinite alternate',
              textShadow: '0 0 40px rgba(5, 247, 70, 0.5)'
            }}
          >
            BeYOUT
          </h1>
          
          <p 
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 1s ease-out 1s'
            }}
          >
            Welcome to the future of digital experiences. Where innovation meets imagination and possibilities become reality.
          </p>
          
          <div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 1s ease-out 1.5s'
            }}
          >
            <button 
              className="px-8 py-4 rounded-full font-semibold tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              style={{
                background: 'linear-gradient(45deg, #05f746, #0505f7)',
                color: 'white',
                border: 'none',
                boxShadow: '0 0 30px rgba(5, 247, 70, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = '0 0 40px rgba(5, 247, 70, 0.8), 0 0 60px rgba(5, 5, 247, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = '0 0 30px rgba(5, 247, 70, 0.3)';
              }}
            >
              Get Started
            </button>
            
            <button 
              className="px-8 py-4 rounded-full font-semibold tracking-wide transition-all duration-300 transform hover:scale-105"
              style={{
                background: 'transparent',
                color: '#05f746',
                border: '2px solid #05f746',
                boxShadow: '0 0 20px rgba(5, 247, 70, 0.2)',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(5, 247, 70, 0.1)';
                e.target.style.boxShadow = '0 0 30px rgba(5, 247, 70, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.boxShadow = '0 0 20px rgba(5, 247, 70, 0.2)';
              }}
            >
              Learn More
            </button>
          </div>
        </div>
        
        {/* Feature cards */}
        <div 
          className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto"
          style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 1s ease-out 2s'
          }}
        >
          {[
            { title: 'Innovation', desc: 'Cutting-edge technology meets creative vision' },
            { title: 'Performance', desc: 'Lightning-fast experiences that captivate' },
            { title: 'Design', desc: 'Beautiful interfaces that inspire and engage' }
          ].map((feature, i) => (
            <div 
              key={feature.title}
              className="p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:transform hover:scale-105"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(5, 247, 70, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#05f746';
                e.target.style.boxShadow = '0 8px 32px rgba(5, 247, 70, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'rgba(5, 247, 70, 0.2)';
                e.target.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
              }}
            >
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#05f746' }}>
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
