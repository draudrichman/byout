import { useState, useEffect, useRef, lazy, Suspense, memo } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { ReactLenis } from '@studio-freight/react-lenis'
import { Leva } from 'leva'

// Eager load critical above-the-fold components
import LandingPage from './components/LandingPage'
import LoadingPage from './components/LoadingPage'
import HomePage from './components/HomePage'
import { AuroraBackground } from './components/ui/aurora-background'
import Prism from "./components/PrismaBackground.jsx";
import PageTransition from './components/PageTransition'
import { useScrollPosition } from './hooks/useScrollPosition'
import { usePageState } from './hooks/usePageState'

// Lazy load below-the-fold components for better initial load
const StatsPage = lazy(() => import('./components/StatsPage').catch(() => ({ default: () => <div>Loading...</div> })))
const LogoSection = lazy(() => import('./components/LogoSection').catch(() => ({ default: () => <div>Loading...</div> })))
const CompanyIntroduction = lazy(() => import('./components/CompanyIntroduction').catch(() => ({ default: () => <div>Loading...</div> })))
const ExperienceShowcase = lazy(() => import('./components/ExperienceShowcase').catch(() => ({ default: () => <div>Loading...</div> })))
const HorizontalTimeline = lazy(() => import('./components/HorizontalTimeline').catch(() => ({ default: () => <div>Loading...</div> })))
const GlobalPresence = lazy(() => import('./components/GlobalPresence').catch(() => ({ default: () => <div>Loading...</div> })))
const CoreServices = lazy(() => import('./components/CoreServices').catch(() => ({ default: () => <div>Loading...</div> })))
const FounderStaff = lazy(() => import('./components/FounderStaff').catch(() => ({ default: () => <div>Loading...</div> })))
const ContactForm = lazy(() => import('./components/ContactForm').catch(() => ({ default: () => <div>Loading...</div> })))
const TechPage = lazy(() => import('./components/TechPage').catch(() => ({ default: () => <div>Loading...</div> })))

// Loading fallback component
const LoadingFallback = memo(() => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
  </div>
))

LoadingFallback.displayName = 'LoadingFallback'




// Main App Content Component
const AppContent = memo(() => {
  const fluidBgRef = useRef(null)
  const location = useLocation()

  // Use scroll position hook for proper restoration
  useScrollPosition(location);
  
  // Use page state hook for complete state preservation
  usePageState(location);

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
      {/* Fixed background Prism for all pages - stays in place during scroll */}
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
      
      <ReactLenis 
        root 
        options={{
          lerp: 0.1, // Lower lerp for smoother animation
          duration: 1.2, // Slightly longer duration for smoother feel
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
          normalizeWheel: true,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing for smoother feel
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
        }}
      >
        {/* Main content with higher z-index */}
        <div className="relative z-10">
          <div id="fluid-bg" ref={fluidBgRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}></div>

          <div>
            <Leva hidden />

            <PageTransition location={location}>
              <Routes>
                <Route path="/" element={
                  <>
                    <AuroraBackground>
                      <LandingPage key="landing" />
                    </AuroraBackground>
                    <Suspense fallback={<LoadingFallback />}>
                      <HomePage />
                    </Suspense>
                  </>
                } />
                <Route path="/tech" element={
                  <Suspense fallback={<LoadingFallback />}>
                    <TechPage />
                  </Suspense>
                } />
              </Routes>
            </PageTransition>
          </div>
        </div>
      </ReactLenis>
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

  return (
    <Router>
      <AppContent />
    </Router>
  )
})

App.displayName = 'App'

export default App