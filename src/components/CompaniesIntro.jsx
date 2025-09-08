import React, { useEffect, useRef, useState } from 'react';

const CompaniesIntro = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Staggered animations
          setTimeout(() => setTitleVisible(true), 300);
          setTimeout(() => setDescriptionVisible(true), 800);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#000000] via-[#2c68de] to-[#762cde]"
    //   style={{
    //     background: `
    //       radial-gradient(circle at 20% 50%, rgba(118, 44, 222, 0.3) 0%, transparent 50%),
    //       radial-gradient(circle at 80% 20%, rgba(44, 104, 222, 0.2) 0%, transparent 50%),
    //       radial-gradient(circle at 40% 80%, rgba(255, 99, 0, 0.1) 0%, transparent 50%),
    //       linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)
    //     `,
    //   }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-green-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-40 w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 fui-grid opacity-5"></div>
        
        {/* Scanning Lines */}
        <div className="absolute inset-0">
          <div 
            className="absolute h-px w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30"
            style={{
              top: '30%',
              animation: 'dataStream 8s linear infinite'
            }}
          ></div>
          <div 
            className="absolute h-px w-full bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-20"
            style={{
              top: '70%',
              animation: 'dataStream 12s linear infinite',
              animationDelay: '4s'
            }}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto">
        {/* Title Section */}
        <div className="mb-16">
          <h1 
            className={`text-6xl sm:text-8xl md:text-9xl lg:text-[12vh] xl:text-[14vh] font-extralight tracking-widest text-white mb-8 leading-tight transition-all duration-1500 ease-out ${
              titleVisible 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-20 scale-95'
            }`}
            style={{
              textShadow: '0 0 30px rgba(0, 255, 255, 0.5), 0 0 60px rgba(0, 255, 255, 0.3)',
              background: 'linear-gradient(45deg, #ffffff, #00ffff, #ffffff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% 200%',
              animation: titleVisible ? 'euphoria 8s ease-in-out infinite, borderFlow 3s linear infinite' : 'none'
            }}
          >
            PRISM 瓴境
          </h1>
          
          {/* Animated Underline */}
          <div 
            className={`h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent transition-all duration-1000 delay-500 ${
              titleVisible ? 'w-full opacity-100' : 'w-0 opacity-0'
            }`}
            style={{
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.8)'
            }}
          ></div>
        </div>

        {/* Description Section */}
        <div 
          className={`text-gray-200 text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-relaxed transition-all duration-1500 ease-out delay-300 ${
            descriptionVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-20'
          }`}
        >
          <div className="space-y-6 lg:space-y-8">
            <div 
              className={`transition-all duration-700 delay-800 ${
                descriptionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
              style={{
                textShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
              }}
            >
              <span className="text-cyan-300 font-light">PRISM 瓴境</span>
              <span className="text-white ml-4">是一家专注于</span>
            </div>
            
            <div 
              className={`transition-all duration-700 delay-1000 ${
                descriptionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
              style={{
                textShadow: '0 0 20px rgba(0, 255, 65, 0.3)'
              }}
            >
              <span className="text-green-300 font-light">全球化品牌重构</span>
              <span className="text-white ml-4">的创新企业</span>
            </div>
            
            <div 
              className={`transition-all duration-700 delay-1200 ${
                descriptionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
              style={{
                textShadow: '0 0 20px rgba(255, 0, 255, 0.3)'
              }}
            >
              <span className="text-purple-300 font-light">通过先进的纳米技术</span>
            </div>
            
            <div 
              className={`transition-all duration-700 delay-1400 ${
                descriptionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
              style={{
                textShadow: '0 0 20px rgba(255, 102, 0, 0.3)'
              }}
            >
              <span className="text-orange-300 font-light">赋能全球渠道落地</span>
            </div>
            
            <div 
              className={`mt-8 transition-all duration-700 delay-1600 ${
                descriptionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                textShadow: '0 0 25px rgba(255, 255, 255, 0.5)'
              }}
            >
              <span className="text-white font-light text-lg sm:text-2xl md:text-3xl lg:text-4xl">
                重新定义未来商业生态
              </span>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 border border-cyan-400 rounded-full opacity-20 animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute -bottom-20 -right-20 w-32 h-32 border border-green-400 rounded-full opacity-20 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
        
        {/* Holographic Effects */}
        <div 
          className={`absolute inset-0 pointer-events-none transition-opacity duration-2000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute top-1/4 left-1/4 w-2 h-20 bg-gradient-to-b from-cyan-400 to-transparent opacity-30 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-2 h-16 bg-gradient-to-t from-green-400 to-transparent opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-10 w-1 h-12 bg-gradient-to-b from-purple-400 to-transparent opacity-40 animate-ping" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/2 right-10 w-1 h-10 bg-gradient-to-t from-orange-400 to-transparent opacity-40 animate-ping" style={{ animationDelay: '3s' }}></div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-transparent to-transparent"></div>
    </div>
  );
};

export default CompaniesIntro;
