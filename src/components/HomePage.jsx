import React, { memo, useEffect } from 'react';
import { Suspense } from 'react';
import { lazy } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Lazy load components for better performance with optimized error handling
const StatsPage = lazy(() => import('./StatsPage'))
const LogoSection = lazy(() => import('./LogoSection'))
const CompanyIntroduction = lazy(() => import('./CompanyIntroduction'))
const ExperienceShowcase = lazy(() => import('./ExperienceShowcase'))
const HorizontalTimeline = lazy(() => import('./HorizontalTimeline'))
const GlobalPresence = lazy(() => import('./GlobalPresence'))
const CoreServices = lazy(() => import('./CoreServices'))
const FounderStaff = lazy(() => import('./FounderStaff'))
const ContactForm = lazy(() => import('./ContactForm'))

// Loading fallback component
const LoadingFallback = memo(() => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
  </div>
))

LoadingFallback.displayName = 'LoadingFallback'

const HomePage = memo(() => {
  // Ensure ScrollTrigger is properly refreshed when HomePage mounts
  useEffect(() => {
    // Remove any lingering tech page classes
    document.body.classList.remove('tech-page-active');
    
    // Force a reflow to ensure all styles are reapplied
    document.body.offsetHeight;
    
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh(true);
      
      // Trigger a second refresh to ensure all elements are in correct position
      setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 100);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="App">
      <div>
        <div>
          {/* Lazy load below-the-fold components with Suspense */}
          <Suspense fallback={<LoadingFallback />}>
            <StatsPage />
          </Suspense>
          
          <Suspense fallback={<LoadingFallback />}>
            <LogoSection />
          </Suspense>
          
          <Suspense fallback={<LoadingFallback />}>
            <CompanyIntroduction />
          </Suspense>
          
          <Suspense fallback={<LoadingFallback />}>
            <ExperienceShowcase />
          </Suspense>
          
          <Suspense fallback={<LoadingFallback />}>
            <HorizontalTimeline />
          </Suspense>
          
          <Suspense fallback={<LoadingFallback />}>
            <GlobalPresence />
          </Suspense>
          
          <Suspense fallback={<LoadingFallback />}>
            <CoreServices />
          </Suspense>
          
          <Suspense fallback={<LoadingFallback />}>
            <FounderStaff />
          </Suspense>
          
          <Suspense fallback={<LoadingFallback />}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
})

HomePage.displayName = 'HomePage'

export default HomePage

