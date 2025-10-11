import { useEffect, useRef, useState, Suspense, lazy } from "react";
import gsap from "gsap";
import type { Country } from "~/models/country";
import ScrollLogos from "~/components/store-logos";
import CompanyLogos from "../constant/companies-logos";
import type { Company, CountryCompanies } from "~/models/company";

// Dynamic imports for country components
const China = lazy(() => import("./countries/China").then(m => ({ default: m.China })));
const USA = lazy(() => import("./countries/USA").then(m => ({ default: m.USA })));
const Canada = lazy(() => import("./countries/Canada").then(m => ({ default: m.Canada })));
const Australia = lazy(() => import("./countries/Australia").then(m => ({ default: m.Australia })));
const NewZealand = lazy(() => import("./countries/NewZealand").then(m => ({ default: m.NewZealand })));
const Cambodia = lazy(() => import("./countries/Cambodia").then(m => ({ default: m.Cambodia })));
const Japan = lazy(() => import("./countries/Japan").then(m => ({ default: m.Japan })));

interface CompanyDetailsProps {
  country: Country;
  onClose: () => void;
}

const countryComponentMap: Record<string, React.LazyExoticComponent<any>> = {
  china: China,
  usa: USA,
  canada: Canada,
  australia: Australia,
  zealand: NewZealand,
  cambodia: Cambodia,
  japan: Japan,
};

const LoadingFallback = () => (
  <div className="px-12 py-12">
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-stone-200 rounded w-3/4"></div>
      <div className="h-4 bg-stone-200 rounded w-1/2"></div>
      <div className="space-y-3 mt-8">
        <div className="h-4 bg-stone-200 rounded"></div>
        <div className="h-4 bg-stone-200 rounded"></div>
        <div className="h-4 bg-stone-200 rounded w-5/6"></div>
      </div>
    </div>
  </div>
);

const getCountryCompanies = (id: string): Company[] => {
  const found = CompanyLogos.find((company: CountryCompanies) => company[id]);
  return found ? found[id] : [];
};

export function CompanyDetails({ country, onClose }: CompanyDetailsProps) {
  const detailsRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const topLogosRef = useRef<HTMLDivElement>(null);
  const companyDetailsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const circularStatsRef = useRef<HTMLDivElement>(null);
  const prevCompanyRef = useRef<Country | null>(null);
  const firstRenderRef = useRef(true);
  const [countryCompanies, setCountryCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalHeight = document.body.style.height;

    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";

    if (detailsRef.current) {
      detailsRef.current.focus();
    }

    const handleScroll = (e: WheelEvent) => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight;

      if (
        (isAtTop && e.deltaY < 0) ||
        (isAtBottom && e.deltaY > 0)
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight;

      const touch = e.touches[0];
      const startY = touch.clientY;

      if (!container.dataset.startY) {
        container.dataset.startY = startY.toString();
        return;
      }

      const deltaY = startY - parseFloat(container.dataset.startY);

      if (
        (isAtTop && deltaY > 0) ||
        (isAtBottom && deltaY < 0)
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handleTouchStart = () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.dataset.startY = "";
      }
    };

    if (detailsRef.current) {
      detailsRef.current.addEventListener("wheel", handleScroll, {
        passive: false,
      });
      detailsRef.current.addEventListener("touchstart", handleTouchStart, {
        passive: false,
      });
      detailsRef.current.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
    }

    const isFirst = firstRenderRef.current;
    const isCompanyChange =
      prevCompanyRef.current && prevCompanyRef.current.name !== country.name;

    if (isFirst) {
      if (detailsRef.current) {
        gsap.set(detailsRef.current, { x: "100%", opacity: 0 });
        gsap.to(detailsRef.current, {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        });
      }
      firstRenderRef.current = false;
    } else if (isCompanyChange) {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }

      const sections = [
        topLogosRef,
        companyDetailsRef,
        statsRef,
        circularStatsRef,
        logoRef,
        aboutRef,
        comparisonRef,
        actionsRef,
      ];

      sections.forEach((ref, index) => {
        if (ref.current) {
          gsap
            .timeline({ delay: index * 0.1 })
            .to(ref.current, {
              y: 30,
              opacity: 0,
              duration: 0.3,
              ease: "power1.out",
            })
            .to(ref.current, {
              y: 0,
              opacity: 1,
              duration: 0.3,
            });
        }
      });
    }

    setCountryCompanies(getCountryCompanies(country.id));

    prevCompanyRef.current = country;

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.height = originalHeight;

      if (detailsRef.current) {
        detailsRef.current.removeEventListener("wheel", handleScroll);
        detailsRef.current.removeEventListener("touchstart", handleTouchStart);
        detailsRef.current.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, [country]);

  const handleClose = () => {
    if (detailsRef.current) {
      gsap.to(detailsRef.current, {
        x: "100%",
        duration: 0.5,
        ease: "power3.in",
        onComplete: onClose,
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const CountryComponent = countryComponentMap[country.id];

  return (
    <div
      ref={detailsRef}
      className="fixed top-0 right-0 w-3/4 h-full overflow-hidden shadow-2xl z-50 transform"
      tabIndex={-1}
      style={{
        background: `
          linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(249, 250, 251, 1) 100%)
        `,
      }}
    >
      <button
        onClick={handleClose}
        className="fixed top-8 right-8 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm border border-stone-200 text-stone-700 hover:text-stone-900 hover:bg-white hover:border-stone-300 transition-all duration-200 shadow-lg hover:shadow-xl"
        aria-label="Close details"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div
        ref={scrollContainerRef}
        className="h-full overflow-y-auto overflow-x-hidden"
        style={{
          scrollBehavior: "smooth",
          scrollbarWidth: "thin",
          scrollbarColor: "#a8a29e #f5f5f4",
        }}
      >
        <div
          ref={topLogosRef}
          className="px-12 pt-8 bg-gradient-to-br from-stone-50 to-white"
        >
          {countryCompanies.length > 0 && (
            <ScrollLogos companies={countryCompanies} />
          )}
        </div>

        <Suspense fallback={<LoadingFallback />}>
          {CountryComponent && (
            <CountryComponent
              // companyDetailsRef={companyDetailsRef}
              // statsRef={statsRef}
            />
          )}
        </Suspense>
      </div>
    </div>
  );
}