import { memo, useState, useEffect, useRef } from "react";
import { useLenis } from "@studio-freight/react-lenis";
import { Leva } from "leva";
import Navbar from "../components/ui/Navbar";
import ErrorBoundary from "../components/ErrorBoundary";
import Prism from "../components/PrismOptimized";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Import Mobile and Desktop variants for each section
// Using the same component for both initially - will be replaced with mobile-specific versions later
import HeroDesktop from "../components/HeroSection";
import HeroMobile from "../components/HeroSectionMobile";

import LogoSectionDesktop from "../components/LogoSection";
import LogoSectionMobile from "../components/LogoSection";

import CompanyIntroductionDesktop from "../components/CompanyIntroductionNew";
import CompanyIntroductionMobile from "../components/CompanyIntroductionNew";

import CoreServicesDesktop from "../components/CoreServices";
import CoreServicesMobile from "../components/CoreServices";

import HorizontalTimelineDesktop from "../components/HorizontalTimeline";
import HorizontalTimelineMobile from "../components/HorizontalTimeline";

import ExperienceShowcaseDesktop from "../components/ExperienceShowcase";
import ExperienceShowcaseMobile from "../components/ExperienceShowcase";

import FounderStaffDesktop from "../components/FounderStaff";
import FounderStaffMobile from "../components/FounderStaff";

import GlobalPresenceDesktop from "../components/GlobalPresence";
import GlobalPresenceMobile from "../components/GlobalPresence";

import ContactFormDesktop from "../components/ContactForm";
import ContactFormMobile from "../components/ContactForm";

const HomePage = memo(({ isLoaded }) => {
  // Detect if device is mobile based on screen width
  const [isMobile, setIsMobile] = useState(() => {
    // Initialize based on window width (768px is Tailwind's md breakpoint)
    return window.innerWidth < 768;
  });

  const [mountedDesktopSections, setMountedDesktopSections] = useState(0);
  const [mountedMobileSections, setMountedMobileSections] = useState(0);
  const lenis = useLenis();
  const videoRef = useRef(null);

  // Listen for screen size changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleChange = (e) => {
      setIsMobile(!e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // ========== DESKTOP TIMERS ==========
  // Progressively mount desktop sections to distribute load
  useEffect(() => {
    const timers = [
      setTimeout(() => setMountedDesktopSections(1), 100), // LogoSection immediately
      setTimeout(() => setMountedDesktopSections(2), 1500), // CompanyIntro at 1.5s
      setTimeout(() => setMountedDesktopSections(3), 2500), // CoreServices at 2.5s
      setTimeout(() => setMountedDesktopSections(4), 3500), // Timeline at 3.5s
      setTimeout(() => setMountedDesktopSections(5), 4500), // Experience at 4.5s
      setTimeout(() => setMountedDesktopSections(6), 5500), // FounderStaff at 5.5s
      setTimeout(() => setMountedDesktopSections(7), 6500), // GlobalPresence at 6.5s
      setTimeout(() => setMountedDesktopSections(8), 7500), // ContactForm at 7.5s
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  // ========== MOBILE TIMERS ==========
  // Progressively mount mobile sections (can be configured differently from desktop)
  useEffect(() => {
    const timers = [
      setTimeout(() => setMountedMobileSections(1), 100), // LogoSection immediately
      setTimeout(() => setMountedMobileSections(2), 200), // CompanyIntro at 1.5s
      setTimeout(() => setMountedMobileSections(3), 300), // CoreServices at 2.5s
      setTimeout(() => setMountedMobileSections(4), 400), // Timeline at 3.5s
      setTimeout(() => setMountedMobileSections(5), 500), // Experience at 4.5s
      setTimeout(() => setMountedMobileSections(6), 600), // FounderStaff at 5.5s
      setTimeout(() => setMountedMobileSections(7), 700), // GlobalPresence at 6.5s
      setTimeout(() => setMountedMobileSections(8), 800), // ContactForm at 7.5s
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  // Restore scroll position when returning from other pages
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem(
      "homePageScrollPosition",
    );

    if (savedScrollPosition) {
      const scrollY = parseFloat(savedScrollPosition);

      // Wait for CoreServices section to mount (mountedDesktopSections >= 4)
      // and add a small delay to ensure DOM is ready
      if (mountedDesktopSections >= 4) {
        // Use Lenis instance if available for better integration, otherwise fallback to window.scrollTo
        const restoreScroll = () => {
          if (lenis) {
            // Use Lenis scrollTo for smooth integration
            lenis.scrollTo(scrollY, { immediate: false });
          } else {
            // Fallback to standard scroll methods
            window.scrollTo({
              top: scrollY,
              left: 0,
              behavior: "auto",
            });
            document.documentElement.scrollTop = scrollY;
            document.body.scrollTop = scrollY;
          }
        };

        // Immediate attempt
        restoreScroll();

        // Additional attempts with delays to handle ReactLenis initialization and DOM readiness
        const timers = [
          setTimeout(restoreScroll, 100),
          setTimeout(restoreScroll, 300),
          setTimeout(() => {
            restoreScroll();
            // Clear the saved position after final attempt
            sessionStorage.removeItem("homePageScrollPosition");
          }, 500),
        ];

        return () => timers.forEach(clearTimeout);
      }
    }
  }, [mountedDesktopSections, lenis]);

  // Set up scroll-scrubbing video animation
  useGSAP(() => {
    if (videoRef.current && mountedDesktopSections >= 1) {
      videoRef.current.onloadedmetadata = () => {
        if (videoRef.current) {
          // Pause the video to prevent auto-play
          videoRef.current.pause();

          const video = videoRef.current;
          const videoDuration = video.duration;

          // Use quickTo for better performance - updates are batched by GSAP
          const setVideoTime = gsap.quickTo(video, "currentTime", {
            duration: 0.1,
            ease: "none",
          });

          // Create a ScrollTrigger with optimized scrubbing
          ScrollTrigger.create({
            trigger: ".home-mother",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5, // Smooth scrubbing with minimal lag
            onUpdate: (self) => {
              // Calculate scroll progress in pixels
              const scrollProgress = self.progress * self.end;
              // Loop every 4000px
              const loopProgress = (scrollProgress % 4000) / 4000;
              // Use quickTo for optimized updates
              setVideoTime(loopProgress * videoDuration);
            },
          });
        }
      };
    }
  }, [mountedDesktopSections]);

  // Video background replaces the Prism shader;
  // it scrubs forward as the user scrolls down, looping every 1000px.

  return (
    <div className="App">
      {/* <Leva hidden /> */}

      {/* Navigation */}
      <Navbar isLoaded={isLoaded} />

      {/* ========== DESKTOP VERSION ========== */}
      {!isMobile && (
        <div>
          {/* Above-the-fold: render immediately */}
          {/* <HeroDesktop key="landing-desktop" isLoaded={isLoaded} /> */}

          {/* Mother container: Prism sits inside and serves as background for all sections below Hero.
            This uses no hooks to toggle visibility — the container appears after Hero in the DOM,
            so Prism is not visible until the user scrolls into this area. */}
          {mountedDesktopSections >= 1 && (
            <div className="home-mother relative">
              <div
                className="sticky top-0 left-0 h-screen w-screen overflow-hidden bg-black"
                style={{ zIndex: 10 }}
              >
                {/* Prism shader - commented out and replaced with video */}
                {/* <Prism
                showFPS={false}
                fpsPosition="top-left"
                height={2}
                baseWidth={2}
                animationType="rotate"
              /> */}

                {/* Full-screen background video that scrubs with scroll */}
                {/* <video
                ref={videoRef}
                muted
                playsInline
                preload="auto"
                src="/scrubvideo/output.mp4"
                className="absolute inset-0 w-full h-full object-cover"
              /> */}
              </div>

              <div className="relative z-10">
                {mountedDesktopSections >= 1 && (
                  <ErrorBoundary>
                    <div className="spacer h-[100vh]" />
                    <div className="spacer h-[100vh]" />
                    <LogoSectionDesktop />
                  </ErrorBoundary>
                )}

                {mountedDesktopSections >= 2 && (
                  <ErrorBoundary>
                    <CompanyIntroductionDesktop />
                  </ErrorBoundary>
                )}

                {mountedDesktopSections >= 3 && (
                  <ErrorBoundary>
                    <CoreServicesDesktop />
                  </ErrorBoundary>
                )}

                {mountedDesktopSections >= 4 && (
                  <ErrorBoundary>
                    <HorizontalTimelineDesktop />
                  </ErrorBoundary>
                )}

                {mountedDesktopSections >= 5 && (
                  <ErrorBoundary>
                    <ExperienceShowcaseDesktop />
                  </ErrorBoundary>
                )}

                {mountedDesktopSections >= 6 && (
                  <ErrorBoundary>
                    <FounderStaffDesktop />
                  </ErrorBoundary>
                )}

                {mountedDesktopSections >= 7 && (
                  <ErrorBoundary>
                    <GlobalPresenceDesktop />
                  </ErrorBoundary>
                )}

                {mountedDesktopSections >= 8 && (
                  <ErrorBoundary>
                    <ContactFormDesktop />
                  </ErrorBoundary>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========== MOBILE VERSION ========== */}
      {isMobile && (
        <div>
          {/* Above-the-fold: render immediately */}
          <HeroMobile key="landing-mobile" isLoaded={isLoaded} />

          {/* Mother container: Prism sits inside and serves as background for all sections below Hero.
            This uses no hooks to toggle visibility — the container appears after Hero in the DOM,
            so Prism is not visible until the user scrolls into this area. */}
          {mountedMobileSections >= 1 && (
            <div className="home-mother relative">
              <div
                className="sticky top-0 left-0 h-screen w-screen overflow-hidden bg-black"
                style={{ zIndex: 10 }}
              >
                {/* Prism shader for mobile - can be commented out if needed */}
                {/* <Prism
                showFPS={false}
                fpsPosition="top-left"
                height={2}
                baseWidth={2}
                animationType="rotate"
              /> */}
              </div>

              <div className="relative z-10">
                {mountedMobileSections >= 1 && (
                  <ErrorBoundary>{/* <LogoSectionMobile /> */}</ErrorBoundary>
                )}

                {mountedMobileSections >= 2 && (
                  <ErrorBoundary>
                    {/* <CompanyIntroductionMobile /> */}
                  </ErrorBoundary>
                )}

                {mountedMobileSections >= 3 && (
                  <ErrorBoundary>{/* <CoreServicesMobile /> */}</ErrorBoundary>
                )}

                {mountedMobileSections >= 4 && (
                  <ErrorBoundary>
                    {/* <HorizontalTimelineMobile /> */}
                  </ErrorBoundary>
                )}

                {mountedMobileSections >= 5 && (
                  <ErrorBoundary>
                    {/* <ExperienceShowcaseMobile /> */}
                  </ErrorBoundary>
                )}

                {mountedMobileSections >= 6 && (
                  <ErrorBoundary>{/* <FounderStaffMobile /> */}</ErrorBoundary>
                )}

                {mountedMobileSections >= 7 && (
                  <ErrorBoundary>
                    {/* <GlobalPresenceMobile /> */}
                  </ErrorBoundary>
                )}

                {mountedMobileSections >= 8 && (
                  <ErrorBoundary>{/* <ContactFormMobile /> */}</ErrorBoundary>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

HomePage.displayName = "HomePage";

export default HomePage;
