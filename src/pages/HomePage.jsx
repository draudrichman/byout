import { lazy, Suspense, memo } from "react";
import { Leva } from "leva";
import LandingPage from "../components/LandingPage";
import { AuroraBackground } from "../components/ui/aurora-background";
import ErrorBoundary from "../components/ErrorBoundary";
import CompanyIntroduction from "../components/CompanyIntroduction copy";

// Loading fallback component
const LoadingFallback = memo(() => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
  </div>
));

LoadingFallback.displayName = "LoadingFallback";

const HomePage = memo(() => {
  return (
    <div className="App">
      <Leva hidden />

      {/* <AuroraBackground>
        <LandingPage key="landing" />
      </AuroraBackground> */}

      {/* <Suspense fallback={<LoadingFallback />}> */}
      <CompanyIntroduction />
      {/* </Suspense> */}

      {/* <AuroraBackground>
        <LandingPage key="landing" />
      </AuroraBackground> */}
    </div>
  );
});

HomePage.displayName = "HomePage";

export default HomePage;
