import { memo, lazy, Suspense, useEffect, useRef, useState } from "react";
import { Leva } from "leva";
import LandingPage from "../components/LandingPage";
import ErrorBoundary from "../components/ErrorBoundary";

// Lazily loaded sections (below-the-fold)
const StatsPage = lazy(() => import("../components/StatsPage"));
const LogoSection = lazy(() => import("../components/LogoSection"));
const CompanyIntroduction = lazy(() =>
  import("../components/CompanyIntroductionNew")
);
const CoreServices = lazy(() => import("../components/CoreServices"));
const HorizontalTimeline = lazy(() =>
  import("../components/HorizontalTimeline")
);
const ExperienceShowcase = lazy(() =>
  import("../components/ExperienceShowcase")
);
const FounderStaff = lazy(() => import("../components/FounderStaff"));
const GlobalPresence = lazy(() => import("../components/GlobalPresence"));
const ContactForm = lazy(() => import("../components/ContactForm"));

// Loading fallback component
const LoadingFallback = memo(() => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
  </div>
));

LoadingFallback.displayName = "LoadingFallback";

// IntersectionObserver wrapper to render children when in view
const LazyLoad = ({ children, rootMargin = "200px 0px" }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current || isVisible) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  return <div ref={ref}>{isVisible ? children : <LoadingFallback />}</div>;
};

const HomePage = memo(() => {
  return (
    <div className="App">
      {/* <Leva hidden /> */}

      {/* Above-the-fold: keep eager to render instantly */}
      <LandingPage key="landing" />

      {/* Below-the-fold sections: lazy render on scroll */}
      <LazyLoad>
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <StatsPage />
          </Suspense>
        </ErrorBoundary>
      </LazyLoad>

      <LazyLoad>
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <LogoSection />
          </Suspense>
        </ErrorBoundary>
      </LazyLoad>

      <LazyLoad>
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <CompanyIntroduction />
          </Suspense>
        </ErrorBoundary>
      </LazyLoad>

      <LazyLoad>
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <CoreServices />
          </Suspense>
        </ErrorBoundary>
      </LazyLoad>

      <LazyLoad>
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <HorizontalTimeline />
          </Suspense>
        </ErrorBoundary>
      </LazyLoad>

      <LazyLoad>
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <ExperienceShowcase />
          </Suspense>
        </ErrorBoundary>
      </LazyLoad>

      <LazyLoad>
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <FounderStaff />
          </Suspense>
        </ErrorBoundary>
      </LazyLoad>

      <LazyLoad>
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <GlobalPresence />
          </Suspense>
        </ErrorBoundary>
      </LazyLoad>

      <LazyLoad>
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <ContactForm />
          </Suspense>
        </ErrorBoundary>
      </LazyLoad>
    </div>
  );
});

HomePage.displayName = "HomePage";

export default HomePage;
