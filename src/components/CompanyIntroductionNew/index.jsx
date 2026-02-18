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
import ValuePropositionSecond from "./ValuePropositionSecond";
import ParticleBackground from "../ParticleBackground";

gsap.registerPlugin(ScrollTrigger);

const CompanyIntroduction = memo(() => {
  const contentRef = useRef(null);
  const pinRef = useRef(null);
  const particleBgRef = useRef(null);
  const particleRef = useRef(null); // imperative handle → { triggerMorph }

  useGSAP(
    () => {
      const container = pinRef.current;
      if (!container) return;

      const panels = gsap.utils.toArray(
        container.querySelectorAll(".snap-panel"),
      );
      if (!panels.length) return;

      gsap.set(panels, { position: "absolute", inset: 0 });
      gsap.set(panels.slice(1), { autoAlpha: 0 });

      // Find the philosophy panel (index 3) and set up custom animations
      const philosophyPanel = panels[3];
      if (philosophyPanel) {
        const dividerContainer = philosophyPanel.querySelector(
          ".philosophy-divider-container",
        );
        const sectionsContainer = philosophyPanel.querySelector(
          ".philosophy-sections-container",
        );

        if (dividerContainer && sectionsContainer) {
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
        defaults: { ease: "none", duration: 0.6 },
      });
      tl.to({}, { duration: 0.3 });

      panels.forEach((panel, index) => {
        if (index === panels.length - 1) return;
        const next = panels[index + 1];

        if (index === 2) {
          const dividerContainer = next.querySelector(
            ".philosophy-divider-container",
          );
          const sectionsContainer = next.querySelector(
            ".philosophy-sections-container",
          );

          if (dividerContainer && sectionsContainer) {
            tl.to(panel, { autoAlpha: 0 })
              .fromTo(next, { autoAlpha: 0 }, { autoAlpha: 1 })
              .to(
                dividerContainer,
                {
                  top: "20%",
                  transform: "translate(-50%, -50%)",
                  duration: 0.3,
                  ease: "power2.out",
                },
                "-=0.1",
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
                "-=0.2",
              );
          } else {
            tl.to(panel, { autoAlpha: 0 }).fromTo(
              next,
              { autoAlpha: 0 },
              { autoAlpha: 1 },
            );
          }
        } else {
          tl.to(panel, { autoAlpha: 0 }).fromTo(
            next,
            { autoAlpha: 0 },
            { autoAlpha: 1 },
          );
        }
      });

      tl.to({}, { duration: 0.3 });

      const sectionEnd = () => "+=" + panels.length * window.innerHeight * 2;

      // ── Track active panel and morph on each transition ──────────────────
      // Each panel occupies an equal slice of the total timeline progress.
      // We watch tl.progress() and fire triggerMorph() whenever the integer
      // panel index changes.
      let lastPanelIndex = -1;

      const scrollTrigger = ScrollTrigger.create({
        animation: tl,
        trigger: container,
        start: "top top",
        end: sectionEnd,
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Map scroll progress → panel index (0 … panels.length-1)
          const rawIndex = Math.floor(self.progress * panels.length);
          const panelIndex = Math.min(rawIndex, panels.length - 1);

          if (panelIndex !== lastPanelIndex) {
            lastPanelIndex = panelIndex;
            // Trigger a morph in the particle background
            particleRef.current?.triggerMorph?.();
          }
        },
      });

      // ── Fixed particle background: fade in/out with the section ──────────
      const bg = particleBgRef.current;
      if (bg) {
        gsap.set(bg, { opacity: 0 });

        const bgST = ScrollTrigger.create({
          trigger: container,
          start: "top bottom",
          end: sectionEnd,
          onEnter: () =>
            gsap.to(bg, { opacity: 1, duration: 0.6, ease: "power2.out" }),
          onLeave: () =>
            gsap.to(bg, { opacity: 0, duration: 0.6, ease: "power2.in" }),
          onEnterBack: () =>
            gsap.to(bg, { opacity: 1, duration: 0.4, ease: "power2.out" }),
          onLeaveBack: () =>
            gsap.to(bg, { opacity: 0, duration: 0.4, ease: "power2.in" }),
        });

        return () => {
          scrollTrigger.kill();
          bgST.kill();
          gsap.set(bg, { opacity: 0 });
        };
      }

      return () => {
        scrollTrigger.kill();
      };
    },
    { scope: contentRef },
  );

  return (
    <>
      {/* Fixed particle background — visible only while this section is active */}
      <div
        ref={particleBgRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0,
        }}
      >
        <ParticleBackground
          ref={particleRef}
          showUI={false}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Section content sits above the fixed bg */}
      <div
        id="about"
        ref={contentRef}
        className="text-center min-h-screen relative flex items-center justify-center font-sans overflow-hidden"
        style={{ zIndex: 1 }}
      >
        <div className="relative z-10 w-full">
          <div
            ref={pinRef}
            className="relative h-screen max-w-8xl mx-auto px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20"
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
              <div className="philosophy-divider-container w-full">
                <PhilosophyDivider />
              </div>
              <div className="philosophy-sections-container max-w-7xl w-full">
                <PhilosophySections />
              </div>
            </section>
            <section className="snap-panel flex items-center justify-center h-full">
              <ValueProposition />
            </section>
            <section className="snap-panel flex items-center justify-center h-full">
              <ValuePropositionSecond />
            </section>
            <section className="snap-panel flex items-center justify-center h-full">
              <ClosingStatement />
            </section>
          </div>
        </div>
      </div>
    </>
  );
});

CompanyIntroduction.displayName = "CompanyIntroduction";

export default CompanyIntroduction;
