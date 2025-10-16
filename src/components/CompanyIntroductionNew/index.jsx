"use client";
import React, { useRef, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LogoSection from "./LogoSection";
import BrandPositioning from "./BrandPositioning";
import CompanyDescription from "./CompanyDescription";
import PhilosophyDivider from "./PhilosophyDivider";
import PhilosophySections from "./PhilosophySections";
import ValueProposition from "./ValueProposition";
import ClosingStatement from "./ClosingStatement";

gsap.registerPlugin(ScrollTrigger);

const CompanyIntroduction = memo(() => {
  const contentRef = useRef(null);
  const pinRef = useRef(null);

  useGSAP(
    () => {
      const container = pinRef.current;
      if (!container) return;

      const panels = gsap.utils.toArray(
        container.querySelectorAll(".snap-panel")
      );
      if (!panels.length) return;

      gsap.set(panels, { position: "absolute", inset: 0 });
      gsap.set(panels.slice(1), { autoAlpha: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut", duration: 0.6 },
      });
      panels.forEach((panel, index) => {
        if (index === panels.length - 1) return;
        const next = panels[index + 1];
        // Ensure the outgoing panel fully fades out before the next fades in
        tl.to(panel, { autoAlpha: 0 }).fromTo(
          next,
          { autoAlpha: 0 },
          { autoAlpha: 1 }
        );
      });

      ScrollTrigger.create({
        animation: tl,
        trigger: container,
        start: "top top",
        end: () => "+=" + panels.length * window.innerHeight,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      });

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: contentRef }
  );

  return (
    <div
      ref={contentRef}
      className="text-center min-h-screen relative flex items-center justify-center font-sans overflow-hidden"
    >
      <div className="relative z-10 w-full">
        <div
          ref={pinRef}
          className="relative h-screen max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20"
        >
          <section className="snap-panel flex items-center justify-center h-full">
            <LogoSection />
          </section>
          <section className="snap-panel flex items-center justify-center h-full">
            <BrandPositioning />
          </section>
          <section className="snap-panel flex items-center justify-center h-full">
            <CompanyDescription />
          </section>
          <section className="snap-panel flex items-center justify-center h-full">
            <PhilosophyDivider />
          </section>
          <section className="snap-panel flex items-center justify-center h-full">
            <PhilosophySections />
          </section>
          <section className="snap-panel flex items-center justify-center h-full">
            <ValueProposition />
          </section>
          <section className="snap-panel flex items-center justify-center h-full">
            <ClosingStatement />
          </section>
        </div>
      </div>
    </div>
  );
});

CompanyIntroduction.displayName = "CompanyIntroduction";

export default CompanyIntroduction;
