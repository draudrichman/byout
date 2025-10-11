import { useState, useEffect, useRef, memo } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ReactLenis } from '@studio-freight/react-lenis'
import LoadingPage from './components/LoadingPage'
import Prism from "./components/PrismaBackground.jsx"
import PageTransition from './components/PageTransition'

// Pages
import HomePage from './pages/HomePage'
import TechPage from './pages/TechPage'
import RetailChannelPage from './pages/RetailChannelPage'




const AppContent = memo(() => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const fluidBgRef = useRef(null)
  
  // Update path on navigation
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }
    
    // Listen for popstate (back/forward buttons)
    window.addEventListener('popstate', handleLocationChange)
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange)
    }
  }, [])
  
  // Determine which page to render based on current path
  const getCurrentPage = () => {
    if (currentPath.startsWith('/tech')) {
      return <TechPage />
    } else if (currentPath === '/retail' || currentPath.startsWith('/retail')) {
      return <RetailChannelPage />
    } else {
      return <HomePage />
    }
  }
  
  // Disable smooth scroll on Tech and Retail pages
  const isSpecialPage = currentPath.startsWith('/tech') || currentPath.startsWith('/retail')

  // Performance monitoring (optional - disable if too noisy)
  useEffect(() => {
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') return;
    
    // Use PerformanceObserver instead of manual RAF for better accuracy
    let observer;
    
    try {
      observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Only log significant frame drops
          if (entry.duration > 50) { // More than 50ms is significant
            console.warn(`⚠️ Long task detected: ${entry.duration.toFixed(2)}ms`, entry.name);
          }
        }
      });
      
      observer.observe({ entryTypes: ['measure', 'longtask'] });
    } catch (e) {
      // PerformanceObserver not supported, skip monitoring
      console.log('Performance monitoring not available');
    }
    
    return () => {
      if (observer) observer.disconnect();
    };
  }, [])

  return (
    <>
      {/* Fixed background Prism for home page only */}
      {!isSpecialPage && (
        <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-black" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0}}>
          <Prism
              animationType="3drotate"
              timeScale={1}
              height={2.5}
              baseWidth={3.5}
              hueShift={0.02}
              colorFrequency={3}
              noise={0.1}
              glow={0.1}
              scale={3.6}
              colorScheme="champagne-chrome"
          />
        </div>
      )}
      
      {isSpecialPage ? (
        // No smooth scroll for special pages
        <div className="relative z-10">
          <div id="fluid-bg" ref={fluidBgRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}></div>
          <AnimatePresence mode="wait">
            <PageTransition key={currentPath}>
              {getCurrentPage()}
            </PageTransition>
          </AnimatePresence>
        </div>
      ) : (
        <ReactLenis root options={{
          lerp: 0.1,
          duration: 1.2,
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
          normalizeWheel: true,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          infinite: false,
          autoResize: true,
          syncTouch: true,
          syncTouchLerp: 0.075,
          touchInertiaMultiplier: 35,
          releaseInertia: true,
          breakpoint: 0,
          disabled: false,
          direction: 'vertical',
          gestureDirection: 'vertical',
          smoothTouch: true,
          mouseMultiplier: 1,
          smooth: true,
          class: 'lenis'
        }} disabled={isSpecialPage}>
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              <PageTransition key={currentPath}>
                {getCurrentPage()}
              </PageTransition>
            </AnimatePresence>
          </div>
        </ReactLenis>
      )}
    </>
  )
})

AppContent.displayName = 'AppContent'

const App = memo(() => {
  const [isLoading, setIsLoading] = useState(true)

  // Handle loading completion
  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  // Show loading page initially
  if (isLoading) {
    return <LoadingPage onComplete={handleLoadingComplete} duration={4000} />
  }

  return <AppContent />
})

App.displayName = 'App'

export default App