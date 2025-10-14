"use client";
import React, { useRef, memo } from "react";
import LogoSection from "./LogoSection";
import BrandPositioning from "./BrandPositioning";
import CompanyDescription from "./CompanyDescription";
import PhilosophyDivider from "./PhilosophyDivider";
import PhilosophySections from "./PhilosophySections";
import ValueProposition from "./ValueProposition";
import ClosingStatement from "./ClosingStatement";

const CompanyIntroduction = memo(() => {
  const contentRef = useRef(null);
  const textContainerRef = useRef(null);

  return (
    <div
      ref={contentRef}
      className="text-center min-h-screen relative flex items-center justify-center font-sans overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20">
        <LogoSection />

        <div ref={textContainerRef} className="mb-30">
          <BrandPositioning />
          <CompanyDescription />
          <PhilosophyDivider />
          <PhilosophySections />
          <ValueProposition />
          <ClosingStatement />
        </div>
      </div>
    </div>
  );
});

CompanyIntroduction.displayName = "CompanyIntroduction";

export default CompanyIntroduction;
