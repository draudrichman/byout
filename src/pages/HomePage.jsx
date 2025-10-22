import { memo } from "react";
import { Leva } from "leva";
import LandingPage from "../components/LandingPage";
import { AuroraBackground } from "../components/ui/aurora-background";
import ErrorBoundary from "../components/ErrorBoundary";
import CompanyIntroduction from "../components/CompanyIntroductionNew";
import StatsPage from "../components/StatsPage";
import ExperienceShowcase from "../components/ExperienceShowcase";
import FounderStaff from "../components/FounderStaff";
import ContactForm from "../components/ContactForm";
import HorizontalTimeline from "../components/HorizontalTimeline";
import GlobalPresence from "../components/GlobalPresence";
import CoreServices from "../components/CoreServices";
import LogoSection from "../components/LogoSection";
import CoreServicesNew from "../components/CoreServicesNew";

// Loading fallback component
const LoadingFallback = memo(() => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
  </div>
));

// const LogoSection = lazy(() =>
//   import("../components/LogoSection").catch((err) => {
//     console.error("Failed to load LogoSection:", err);
//     return { default: () => <div>Loading...</div> };
//   })
// );

LoadingFallback.displayName = "LoadingFallback";

const HomePage = memo(() => {
  return (
    <div className="App">
      {/* <Leva hidden />

      <AuroraBackground>
        <LandingPage key="landing" />
      </AuroraBackground>
      <StatsPage />
      <LogoSection />
      <CompanyIntroduction />
      <ExperienceShowcase />
      <HorizontalTimeline />
      <GlobalPresence /> */}
      <CoreServices />
      {/* <FounderStaff />
      <ContactForm /> */}
    </div>
  );
});

HomePage.displayName = "HomePage";

export default HomePage;
