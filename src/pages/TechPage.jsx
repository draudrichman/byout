import { Suspense, lazy, useState, useEffect } from 'react'

// Lazy-loaded components for code splitting
const MainPage = lazy(() => import('./tech/MainPage.jsx'))
const HPHDetailPage = lazy(() => import('./tech/HPHDetailPage.jsx'))
const PEFDetailPage = lazy(() => import('./tech/PEFDetailPage.jsx'))

// Loading component
const LoadingSpinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#2a2a2c',
    color: '#ffffff',
    fontSize: '1.2rem'
  }}>
    Loading...
  </div>
)

// Back button component
const BackButton = () => {
  return (
    <a
      href="/"
      className="fixed top-8 left-8 z-50 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-all duration-300 flex items-center gap-2 group"
    >
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
        className="transform group-hover:-translate-x-1 transition-transform"
      >
        <path d="M19 12H5M5 12L12 19M5 12L12 5"/>
      </svg>
      Back to Home
    </a>
  )
}

function TechPage() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname)
      window.scrollTo(0, 0) // Scroll to top on page change
    }
    
    // Listen for popstate (back/forward buttons)
    window.addEventListener('popstate', handleLocationChange)
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange)
    }
  }, [])
  
  // Determine which page to render
  const getCurrentPage = () => {
    if (currentPath === '/tech/hph') {
      return <HPHDetailPage />
    } else if (currentPath === '/tech/pef') {
      return <PEFDetailPage />
    } else {
      return <MainPage />
    }
  }
  
  return (
    <div className="min-h-screen bg-[#2a2a2c]">
      <BackButton />
      <Suspense fallback={<LoadingSpinner />}>
        {getCurrentPage()}
      </Suspense>
    </div>
  )
}

export default TechPage


