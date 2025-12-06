import { memo, useState, useEffect } from "react";
import { Leva } from "leva";
import Navbar from "../components/ui/Navbar";
import LandingPage from "../components/LandingPage";
import ErrorBoundary from "../components/ErrorBoundary";
import Prism from "../components/PrismOptimized";
// Lazy import sections to control mounting timing
import StatsPage from "../components/StatsPage";
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

  // Progressively mount sections over 6.5 seconds to distribute load
  useEffect(() => {
    const timers = [
      setTimeout(() => setMountedSections(1), 100), // StatsPage immediately
      setTimeout(() => setMountedSections(2), 1500), // LogoSection at 1.5s
      setTimeout(() => setMountedSections(3), 2500), // CompanyIntro at 2.5s
      setTimeout(() => setMountedSections(4), 3500), // CoreServices at 3.5s
      setTimeout(() => setMountedSections(5), 4500), // Timeline at 4.5s
      setTimeout(() => setMountedSections(6), 5500), // Experience at 5.5s
      setTimeout(() => setMountedSections(7), 6500), // FounderStaff at 6.5s
      setTimeout(() => setMountedSections(8), 7500), // GlobalPresence at 7.5s
      setTimeout(() => setMountedSections(9), 8000), // ContactForm at 8s
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

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
      <LandingPage key="landing" isLoaded={isLoaded} />

      {/* Progressive section mounting to distribute load */}
      {mountedSections >= 1 && (
        <ErrorBoundary>
          <StatsPage />
        </ErrorBoundary>
      )}

      {/* Mother container: Prism sits inside and serves as background for all sections below StatsPage.
          This uses no hooks to toggle visibility — the container appears after StatsPage in the DOM,
          so Prism is not visible until the user scrolls into this area. */}
      {mountedSections >= 2 && (
        <div className="home-mother relative">
          <div
            className="sticky top-0 left-0 h-screen w-screen overflow-hidden bg-black"
            style={{ zIndex: 0 }}
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
            {mountedSections >= 2 && (
              <ErrorBoundary>
                <LogoSection />
              </ErrorBoundary>
            )}

            {mountedSections >= 3 && (
              <ErrorBoundary>
                <CompanyIntroduction />
              </ErrorBoundary>
            )}

            {mountedSections >= 4 && (
              <ErrorBoundary>
                <CoreServices />
              </ErrorBoundary>
            )}

            {mountedSections >= 5 && (
              <ErrorBoundary>
                <HorizontalTimeline />
              </ErrorBoundary>
            )}

            {mountedSections >= 6 && (
              <ErrorBoundary>
                <ExperienceShowcase />
              </ErrorBoundary>
            )}

            {mountedSections >= 7 && (
              <ErrorBoundary>
                <FounderStaff />
              </ErrorBoundary>
            )}

            {mountedSections >= 8 && (
              <ErrorBoundary>
                <GlobalPresence />
              </ErrorBoundary>
            )}

            {mountedSections >= 9 && (
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
