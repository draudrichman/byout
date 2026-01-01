import { memo, useState, useEffect } from "react";
import { useLenis } from "@studio-freight/react-lenis";
import { Leva } from "leva";
import Navbar from "../components/ui/Navbar";
import Hero from "../components/HeroSection";
import ErrorBoundary from "../components/ErrorBoundary";
import Prism from "../components/PrismOptimized";
// Lazy import sections to control mounting timing
import LogoSection from "../components/LogoSection";
import CompanyIntroduction from "../components/CompanyIntroductionNew";
import CoreServices from "../components/CoreServices";
import HorizontalTimeline from "../components/HorizontalTimeline";
import ExperienceShowcase from "../components/ExperienceShowcase";
import FounderStaff from "../components/FounderStaff";
import GlobalPresence from "../components/GlobalPresence";
import ContactForm from "../components/ContactForm";

const HomePage = memo(({ isLoaded }) => {
  const [mountedSections, setMountedSections] = useState(0);
  const lenis = useLenis();

  // Progressively mount sections over 6.5 seconds to distribute load
  useEffect(() => {
    const timers = [
      setTimeout(() => setMountedSections(1), 100), // LogoSection immediately
      setTimeout(() => setMountedSections(2), 1500), // CompanyIntro at 1.5s
      setTimeout(() => setMountedSections(3), 2500), // CoreServices at 2.5s
      setTimeout(() => setMountedSections(4), 3500), // Timeline at 3.5s
      setTimeout(() => setMountedSections(5), 4500), // Experience at 4.5s
      setTimeout(() => setMountedSections(6), 5500), // FounderStaff at 5.5s
      setTimeout(() => setMountedSections(7), 6500), // GlobalPresence at 6.5s
      setTimeout(() => setMountedSections(8), 7500), // ContactForm at 7.5s
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  // Restore scroll position when returning from other pages
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem(
      "homePageScrollPosition"
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

  // Prism background is provided by the mother container below;
  // it intentionally uses no hooks to control visibility —
  // placing Prism inside the container keeps it out of view until
  // the user scrolls past the Stats section into this container.

  return (
    <div className="App">
      {/* <Leva hidden /> */}

      {/* Navigation */}
      <Navbar isLoaded={isLoaded} />

      {/* Above-the-fold: render immediately */}
      <Hero key="landing" isLoaded={isLoaded} />

      {/* Mother container: Prism sits inside and serves as background for all sections below Hero.
          This uses no hooks to toggle visibility — the container appears after Hero in the DOM,
          so Prism is not visible until the user scrolls into this area. */}
      {mountedSections >= 1 && (
        <div className="home-mother relative">
          <div
            className="sticky top-0 left-0 h-screen w-screen overflow-hidden bg-black"
            style={{ zIndex: 10 }}
          >
            <Prism
              showFPS={false}
              fpsPosition="top-left"
              height={2}
              baseWidth={2}
              animationType="rotate"
            />
          </div>

          <div className="relative z-10">
            {mountedSections >= 1 && (
              <ErrorBoundary>
                <div className="spacer h-[100vh]" />
                <div className="spacer h-[100vh]" />
                <LogoSection />
              </ErrorBoundary>
            )}

            {mountedSections >= 2 && (
              <ErrorBoundary>
                <CompanyIntroduction />
              </ErrorBoundary>
            )}

            {mountedSections >= 3 && (
              <ErrorBoundary>
                <CoreServices />
              </ErrorBoundary>
            )}

            {mountedSections >= 4 && (
              <ErrorBoundary>
                <HorizontalTimeline />
              </ErrorBoundary>
            )}

            {mountedSections >= 5 && (
              <ErrorBoundary>
                <ExperienceShowcase />
              </ErrorBoundary>
            )}

            {mountedSections >= 6 && (
              <ErrorBoundary>
                <FounderStaff />
              </ErrorBoundary>
            )}

            {mountedSections >= 7 && (
              <ErrorBoundary>
                <GlobalPresence />
              </ErrorBoundary>
            )}

            {mountedSections >= 8 && (
              <ErrorBoundary>
                <ContactForm />
              </ErrorBoundary>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

HomePage.displayName = "HomePage";

export default HomePage;
