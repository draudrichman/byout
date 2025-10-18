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

      // Find the philosophy panel (index 3) and set up custom animations
      const philosophyPanel = panels[3];
      if (philosophyPanel) {
        const dividerContainer = philosophyPanel.querySelector(
          ".philosophy-divider-container"
        );
        const sectionsContainer = philosophyPanel.querySelector(
          ".philosophy-sections-container"
        );

        if (dividerContainer && sectionsContainer) {
          // Set initial positions
          gsap.set(dividerContainer, {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 1,
          });
          gsap.set(sectionsContainer, {
            position: "absolute",
            top: "100%",
            left: "50%",
            transform: "translate(-50%, 0)",
            opacity: 0,
          });
        }
      }

      const tl = gsap.timeline({
        // Use linear easing; rely on scrub smoothing for smooth feel
        defaults: { ease: "none", duration: 0.6 },
      });
      // Small buffer at the start to avoid abrupt first transition
      tl.to({}, { duration: 0.3 });

      panels.forEach((panel, index) => {
        if (index === panels.length - 1) return;
        const next = panels[index + 1];

        // Special handling for philosophy panel transition
        if (index === 2) {
          // CompanyDescription to Philosophy
          const dividerContainer = next.querySelector(
            ".philosophy-divider-container"
          );
          const sectionsContainer = next.querySelector(
            ".philosophy-sections-container"
          );

          if (dividerContainer && sectionsContainer) {
            // First show the divider centered
            tl.to(panel, { autoAlpha: 0 })
              .fromTo(next, { autoAlpha: 0 }, { autoAlpha: 1 })
              // Then animate divider to top and sections in from bottom
              .to(
                dividerContainer,
                {
                  top: "20%",
                  transform: "translate(-50%, -50%)",
                  duration: 0.3,
                  ease: "power2.out",
                },
                "-=0.1"
              )
              .to(
                sectionsContainer,
                {
                  top: "60%",
                  opacity: 1,
                  transform: "translate(-50%, -50%)",
                  duration: 0.4,
                  ease: "power2.out",
                },
                "-=0.2"
              );
          } else {
            tl.to(panel, { autoAlpha: 0 }).fromTo(
              next,
              { autoAlpha: 0 },
              { autoAlpha: 1 }
            );
          }
        } else {
          // Standard panel transition
          tl.to(panel, { autoAlpha: 0 }).fromTo(
            next,
            { autoAlpha: 0 },
            { autoAlpha: 1 }
          );
        }
      });

      // Small buffer at the end to avoid abrupt finish
      tl.to({}, { duration: 0.3 });

      ScrollTrigger.create({
        animation: tl,
        trigger: container,
        start: "top top",
        end: () => "+=" + panels.length * window.innerHeight,
        // Smooth the scrubbing for less snappy feel
        scrub: 0.8,
        pin: true,
        anticipatePin: 2,
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
          className="relative h-screen max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20"
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
          <section className="snap-panel flex flex-col items-center justify-center h-full relative">
            <div className="philosophy-divider-container">
              <PhilosophyDivider />
            </div>
            <div className="philosophy-sections-container w-full">
              <PhilosophySections />
            </div>
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
