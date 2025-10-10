import React, { useEffect, useRef, useState, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import ShaderBackground from './ShaderBackground';
import { useStyleIsolation } from '../hooks/useStyleIsolation';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Lazy load tech-page components
const MainPage = React.lazy(() => import('../tech1/tech-page/src/pages/MainPage.jsx'));

// Loading component
const LoadingSpinner = memo(() => (
  <div className="flex items-center justify-center h-screen bg-black">
    <div className="relative loading-spinner">
      <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
      <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
    </div>
  </div>
));

LoadingSpinner.displayName = 'LoadingSpinner';

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: 50,
  },
  in: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.1,
    },
  },
  out: {
    opacity: 0,
    scale: 1.05,
    y: -50,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const TechPage = memo(() => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const headerRef = useRef(null);
  const backButtonRef = useRef(null);

  // Use style isolation to prevent CSS conflicts
  useStyleIsolation(true);

  // Handle back navigation with useCallback for performance
  const handleBack = useCallback(() => {
    // Clean up any tech page specific styles that might interfere
    const techPageStyles = document.querySelectorAll('style[data-tech-page]');
    techPageStyles.forEach(style => style.remove());
    
    // Remove tech-page-active class before navigation
    document.body.classList.remove('tech-page-active');
    
    // Force browser to apply default styles
    document.body.offsetHeight;
    
    navigate('/');
  }, [navigate]);

  // Initialize animations
  useEffect(() => {
    // Header animation
    if (headerRef.current) {
      const split = new SplitType(headerRef.current, { type: "words, chars" });
      
      gsap.set(split.chars, {
        opacity: 0,
        y: 50,
        rotationX: 90,
        transformOrigin: "0% 50% -50px",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        }
      });

      tl.to(split.chars, {
        duration: 1,
        opacity: 1,
        y: 0,
        rotationX: 0,
        stagger: 0.02,
        ease: "back.out(1.7)",
      });

      return () => {
        tl.kill();
        split.revert();
      };
    }
  }, []);

  // Simulate loading completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Reduced loading time

    return () => clearTimeout(timer);
  }, []);

  // Cleanup effect to remove tech page styles when component unmounts
  useEffect(() => {
    return () => {
      // Clean up any tech page specific styles that might interfere
      const techPageStyles = document.querySelectorAll('style[data-tech-page]');
      techPageStyles.forEach(style => style.remove());
    };
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <motion.div
      className="min-h-screen bg-black text-white overflow-hidden"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
    >
      {/* Fixed background */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-black">
        <ShaderBackground opacity={0.6} />
      </div>

      {/* Header with back button */}
      <motion.header 
        className="relative z-20 p-8 lg:p-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex items-center justify-between">
          <motion.button
            ref={backButtonRef}
            onClick={handleBack}
            className="group flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 bg-black/50 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="text-white group-hover:text-blue-400 transition-colors duration-300"
            >
              <path 
                d="M19 12H5M12 19L5 12L12 5" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-white group-hover:text-blue-400 transition-colors duration-300 font-medium">
              Back to Services
            </span>
          </motion.button>

          <motion.h1 
            ref={headerRef}
            className="text-3xl lg:text-5xl font-bold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Technology Solutions
          </motion.h1>
        </div>
      </motion.header>

      {/* Main content */}
      <motion.main 
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <React.Suspense fallback={<LoadingSpinner />}>
          <MainPage />
        </React.Suspense>
      </motion.main>
    </motion.div>
  );
});

TechPage.displayName = 'TechPage';

export default TechPage;

