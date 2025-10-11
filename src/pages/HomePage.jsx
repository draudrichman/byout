import { lazy, Suspense, memo } from 'react'
import { Leva } from 'leva'
import LandingPage from '../components/LandingPage'
import { AuroraBackground } from '../components/ui/aurora-background'
import ErrorBoundary from '../components/ErrorBoundary'

// Lazy load below-the-fold components for better initial load
const StatsPage = lazy(() => import('../components/StatsPage').catch((err) => {
  console.error('Failed to load StatsPage:', err);
  return { default: () => <div>Loading...</div> };
}))
const LogoSection = lazy(() => import('../components/LogoSection').catch((err) => {
  console.error('Failed to load LogoSection:', err);
  return { default: () => <div>Loading...</div> };
}))
const CompanyIntroduction = lazy(() => import('../components/CompanyIntroduction').catch((err) => {
  console.error('Failed to load CompanyIntroduction:', err);
  return { default: () => <div>Loading...</div> };
}))
const ExperienceShowcase = lazy(() => import('../components/ExperienceShowcase').then(module => {
  // Ensure we get the default export
  return { default: module.default || module.ExperienceShowcase };
}).catch((err) => {
  console.error('Failed to load ExperienceShowcase:', err);
  return { default: () => <div className="text-white text-center py-20">Failed to load Experience Showcase</div> };
}))
const HorizontalTimeline = lazy(() => import('../components/HorizontalTimeline').catch((err) => {
  console.error('Failed to load HorizontalTimeline:', err);
  return { default: () => <div>Loading...</div> };
}))
const GlobalPresence = lazy(() => import('../components/GlobalPresence').catch((err) => {
  console.error('Failed to load GlobalPresence:', err);
  return { default: () => <div>Loading...</div> };
}))
const CoreServices = lazy(() => import('../components/CoreServices').catch((err) => {
  console.error('Failed to load CoreServices:', err);
  return { default: () => <div>Loading...</div> };
}))
const FounderStaff = lazy(() => import('../components/FounderStaff').catch((err) => {
  console.error('Failed to load FounderStaff:', err);
  return { default: () => <div>Loading...</div> };
}))
const ContactForm = lazy(() => import('../components/ContactForm').catch((err) => {
  console.error('Failed to load ContactForm:', err);
  return { default: () => <div>Loading...</div> };
}))

// Loading fallback component
const LoadingFallback = memo(() => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
  </div>
))

LoadingFallback.displayName = 'LoadingFallback'

const HomePage = memo(() => {
  return (
    <div className="App">
      <Leva hidden />

      <AuroraBackground>
        <LandingPage key="landing" />
      </AuroraBackground>
      
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
      
      <ErrorBoundary 
        title="Experience Showcase Error" 
        message="The experience showcase is temporarily unavailable."
      >
        <Suspense fallback={<LoadingFallback />}>
          <ExperienceShowcase />
        </Suspense>
      </ErrorBoundary>
      
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
  )
})

HomePage.displayName = 'HomePage'

export default HomePage


