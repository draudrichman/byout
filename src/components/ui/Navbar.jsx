import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div 
          className={`rounded-lg backdrop-blur-xl transition-all duration-300 fui-hologram fui-scanline ${
            isScrolled 
              ? 'shadow-lg shadow-gray-400/20' 
              : 'shadow-xl shadow-gray-400/30'
          } border border-gray-300/30 bg-white/90`}
        >
          <div className="flex items-center justify-between px-2 ">
            {/* Logo with FUI styling */}
            <div className="flex items-center ">
              <div className=" rounded-lg flex items-center justify-center relative">
                <img src="./img/logos/icon.svg" width={90} height={90} alt="Logo" className=" text-white" />
              </div>
            
            </div>

            {/* Navigation Links with FUI styling */}
            <div className="hidden md:flex items-center space-x-12">
              <a 
                href="#home" 
                className="text-gray-200/90 hover:text-white transition-colors duration-200 font-medium relative group font-mono uppercase text-sm tracking-wider"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-600 to-gray-400 transition-all duration-300 group-hover:w-full fui-glow"></span>
              </a>
              <a 
                href="#services" 
                className="text-gray-200/90 hover:text-white transition-colors duration-200 font-medium relative group font-mono uppercase text-sm tracking-wider"
              >
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-600 to-gray-400 transition-all duration-300 group-hover:w-full fui-glow"></span>
              </a>
              <a 
                href="#about" 
                className="text-gray-200/90 hover:text-white transition-colors duration-200 font-medium relative group font-mono uppercase text-sm tracking-wider"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-600 to-gray-400 transition-all duration-300 group-hover:w-full fui-glow"></span>
              </a>
              <a 
                href="#contact" 
                className="text-gray-200/90 hover:text-white transition-colors duration-200 font-medium relative group font-mono uppercase text-sm tracking-wider"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-600 to-gray-400 transition-all duration-300 group-hover:w-full fui-glow"></span>
              </a>
            </div>

            {/* CTA Buttons with FUI styling */}
            <div className="flex items-center space-x-6">
              <button className="hidden sm:block text-gray-200/90 hover:text-white transition-colors duration-200 font-medium font-mono uppercase text-sm tracking-wider">
                Access
              </button>
              <button className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-gray-600 to-gray-400 text-white font-bold hover:shadow-[0_0_20px_rgba(75,85,99,0.5)] transition-all duration-300 transform hover:scale-105 font-mono uppercase text-sm tracking-wider fui-scanline relative overflow-hidden">
                Initialize
              </button>
            </div>

            {/* Mobile Menu Button with FUI styling */}
            <button className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200 border border-gray-300">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
