import { memo, useState, useEffect } from "react";
import { useLenis } from "@studio-freight/react-lenis";
import Navbar from "../components/ui/Navbar";
import NavbarMobile from "../components/ui/NavbarMobile";
import ErrorBoundary from "../components/ErrorBoundary";
import useProgressiveMount from "../hooks/useProgressiveMount";
import Prism from "../components/PrismOptimized";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SECTION_COUNT = 8;

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

  // Sections below the hero mount one per idle period, in order.
  const mountedSections = useProgressiveMount(SECTION_COUNT);
  const lenis = useLenis();

  // Listen for screen size changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleChange = (e) => {
      setIsMobile(!e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Once every section exists, recompute ScrollTrigger positions so pins
  // created early account for everything mounted after them.
  useEffect(() => {
    if (mountedSections < SECTION_COUNT) return;
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [mountedSections]);

  // Restore scroll position when returning from other pages
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem(
      "homePageScrollPosition",
    );

    if (savedScrollPosition) {
      const scrollY = parseFloat(savedScrollPosition);

      // Wait for CoreServices section to mount (mountedSections >= 4)
      // and add a small delay to ensure DOM is ready
      if (mountedSections >= 4) {
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
  }, [mountedSections, lenis]);

  return (
    <div className="App">

      {/* Navigation - Desktop */}
      {!isMobile && <Navbar isLoaded={isLoaded} />}

      {/* Navigation - Mobile */}
      {isMobile && <NavbarMobile isLoaded={isLoaded} />}

      {/* ========== DESKTOP VERSION ========== */}
      {!isMobile && (
        <div>
          {/* Above-the-fold: render immediately */}
          <HeroDesktop key="landing-desktop" isLoaded={isLoaded} />

          {/* Mother container: Prism sits inside and serves as background for all sections below Hero.
            This uses no hooks to toggle visibility — the container appears after Hero in the DOM,
            so Prism is not visible until the user scrolls into this area. */}
          {mountedSections >= 1 && (
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
                {mountedSections >= 1 && (
                  <ErrorBoundary>
                    <div className="spacer h-[100vh]" />
                    <div className="spacer h-[100vh]" />
                    <LogoSectionDesktop />
                  </ErrorBoundary>
                )}

                {mountedSections >= 2 && (
                  <ErrorBoundary>
                    <CompanyIntroductionDesktop />
                  </ErrorBoundary>
                )}

                {mountedSections >= 3 && (
                  <ErrorBoundary>
                    <CoreServicesDesktop />
                  </ErrorBoundary>
                )}

                {mountedSections >= 4 && (
                  <ErrorBoundary>
                    <HorizontalTimelineDesktop />
                  </ErrorBoundary>
                )}

                {mountedSections >= 5 && (
                  <ErrorBoundary>
                    <ExperienceShowcaseDesktop />
                  </ErrorBoundary>
                )}

                {mountedSections >= 6 && (
                  <ErrorBoundary>
                    <FounderStaffDesktop />
                  </ErrorBoundary>
                )}

                {mountedSections >= 7 && (
                  <ErrorBoundary>
                    <GlobalPresenceDesktop />
                  </ErrorBoundary>
                )}

                {mountedSections >= 8 && (
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
          {mountedSections >= 1 && (
            <div className="home-mother relative">
              <div
                className="sticky top-0 left-0 h-screen w-screen overflow-hidden bg-zinc-900"
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
                {mountedSections >= 1 && (
                  <ErrorBoundary>
                    <LogoSectionMobile />
                  </ErrorBoundary>
                )}

                {mountedSections >= 2 && (
                  <ErrorBoundary>
                    {/* <CompanyIntroductionMobile /> */}
                  </ErrorBoundary>
                )}

                {mountedSections >= 3 && (
                  <ErrorBoundary>{/* <CoreServicesMobile /> */}</ErrorBoundary>
                )}

                {mountedSections >= 4 && (
                  <ErrorBoundary>
                    {/* <HorizontalTimelineMobile /> */}
                  </ErrorBoundary>
                )}

                {mountedSections >= 5 && (
                  <ErrorBoundary>
                    {/* <ExperienceShowcaseMobile /> */}
                  </ErrorBoundary>
                )}

                {mountedSections >= 6 && (
                  <ErrorBoundary>
                    <FounderStaffMobile />
                  </ErrorBoundary>
                )}

                {mountedSections >= 7 && (
                  <ErrorBoundary>
                    <GlobalPresenceMobile />
                  </ErrorBoundary>
                )}

                {mountedSections >= 8 && (
                  <ErrorBoundary>
                    <ContactFormMobile />
                  </ErrorBoundary>
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
