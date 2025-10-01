import { useState, useEffect, useRef } from 'react'

import LandingPage from './components/LandingPage'
// import './App.css'
import { AuroraBackground } from './components/ui/aurora-background'
import StatsPage from './components/StatsPage'
import CompaniesIntro from './components/CompaniesIntro'
import Timeline from './components/Timeline'
import HorizontalTimeline from './components/HorizontalTimeline'
import GlobalPresence from './components/GlobalPresence'
import CoreServices from './components/CoreServices'
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import TeamSection from './components/TeamSection.jsx';
import { AestheticFluidBg } from "./components/js/AestheticFluidBg.module.js"
import { Leva } from 'leva'
import ExperienceShowcase from './components/ExperienceShowcase'
import CompanyIntroduction from './components/CompanyIntroduction'
import Prism from "./components/PrismaBackground.jsx";






function App() {
  const [isLoading, setIsLoading] = useState(true)
  const fluidBgRef = useRef(null)

  // useEffect(() => {
  //   if (fluidBgRef.current) {
  //     const colorbg = new AestheticFluidBg({
  //       dom: "fluid-bg",
  //       colors: ["#846e8c","#93aaec","#131a25","#aa86ac","#212832","#8c8f97"],
  //       loop: true
  //     })

  //     // Cleanup function to destroy the background when component unmounts
  //     return () => {
  //       if (colorbg && colorbg.destroy) {
  //         colorbg.destroy()
  //       }
  //     }
  //   }
  // }, [])

  const handlePreloaderComplete = () => {
    setIsLoading(false)
  }

  return (
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
      <div className="App">
        <div id="fluid-bg" ref={fluidBgRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}></div>

<div 
  //  style={{
  //   background: `
  //     // radial-gradient(circle, rgb(0, 0, 0) 0px, #01010100 100%),
  //     linear-gradient(180deg, rgb(191, 191, 189), #000000f0 70%)
  //   `
  // }}
>


<Leva  hidden />

        <AuroraBackground>
          <LandingPage key="landing" />
        </AuroraBackground>
        <StatsPage/>

        {/* Prism background only for CompanyIntroduction and ExperienceShowcase */}
        <div className="relative">
          {/* <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-black">
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
          </div> */}
          <div className="relative z-10">
            <CompanyIntroduction/>
            <ExperienceShowcase/>
          </div>
        </div>





        <HorizontalTimeline/>
        {/* <Timeline/> */}
        <GlobalPresence/>
        <CoreServices/>
        {/* <TeamSection/> */}
        {/* <GlobalPresence/> */}
</div>
        {/* <CompaniesIntro /> */}
      </div>
    </ReactLenis>
  )
}

export default App
