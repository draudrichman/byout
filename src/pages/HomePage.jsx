import { memo } from "react";
import { Leva } from "leva";
import LandingPage from "../components/LandingPage";
import ErrorBoundary from "../components/ErrorBoundary";
// Eagerly import all sections so assets start downloading immediately
import StatsPage from "../components/StatsPage";
import LogoSection from "../components/LogoSection";
import CompanyIntroduction from "../components/CompanyIntroductionNew";
import CoreServices from "../components/CoreServices";
import HorizontalTimeline from "../components/HorizontalTimeline";
import ExperienceShowcase from "../components/ExperienceShowcase";
import FounderStaff from "../components/FounderStaff";
import GlobalPresence from "../components/GlobalPresence";
import ContactForm from "../components/ContactForm";

const HomePage = memo(() => {
  return (
    <div className="App">
      {/* <Leva hidden /> */}

      {/* Above-the-fold: keep eager to render instantly */}
      <LandingPage key="landing" />

      {/* Below-the-fold sections: render eagerly so assets download during loading overlay */}
      <ErrorBoundary>
        <StatsPage />
      </ErrorBoundary>

      <ErrorBoundary>
        <LogoSection />
      </ErrorBoundary>

      <ErrorBoundary>
        <CompanyIntroduction />
      </ErrorBoundary>

      <ErrorBoundary>
        <CoreServices />
      </ErrorBoundary>

      <ErrorBoundary>
        <HorizontalTimeline />
      </ErrorBoundary>

      <ErrorBoundary>
        <ExperienceShowcase />
      </ErrorBoundary>

      <ErrorBoundary>
        <FounderStaff />
      </ErrorBoundary>

      <ErrorBoundary>
        <GlobalPresence />
      </ErrorBoundary>

      <ErrorBoundary>
        <ContactForm />
      </ErrorBoundary>
    </div>
  );
});

HomePage.displayName = "HomePage";

export default HomePage;
