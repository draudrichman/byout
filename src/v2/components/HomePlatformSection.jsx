import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { home } from "../content";
import { Reveal, SectionHead, SmartLink, ArrowIcon } from "./primitives";
import FlowMap from "./sections/FlowMap";
import "../v2.css";

// V2 "cross-market platform" section on the homepage. Copy: content/home.js.
export default function HomePlatformSection() {
  const copy = home.platform;

  // This section loads after the homepage sections below it have set up
  // their scroll animations; recompute their positions now that it has height.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="v2" id="platform" style={{ background: "transparent" }}>
      <section className="v2-section" style={{ paddingTop: "var(--v2-section-gap)" }}>
        <div className="v2-container">
          <SectionHead eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} />

          <Reveal className="v2-direction v2-framework">
            <div style={{ display: "grid", gap: 6 }}>
              <span className="v2-eyebrow">{copy.framework.label}</span>
              <span className="v2-direction-label" style={{ fontFamily: "var(--v2-font-cn)" }}>
                {copy.framework.native}
              </span>
            </div>
            <div style={{ display: "grid", gap: 14 }}>
              <p className="v2-body">{copy.framework.body}</p>
              <div className="v2-case-tags">
                {copy.framework.tags.map((t) => (
                  <span key={t} className="v2-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal style={{ marginBottom: 24 }}>
            <h3 className="v2-h3" style={{ fontSize: 15, color: "var(--v2-muted)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 500 }}>
              {copy.entryTitle}
            </h3>
          </Reveal>
          <Reveal className="v2-structures">
            {copy.entryPaths.map((p) => (
              <SmartLink key={p.title} href={p.href} className="v2-structure">
                <h3 className="v2-h3">{p.title}</h3>
                <p className="v2-body">{p.body}</p>
                <ArrowIcon className="v2-structure-arrow" />
              </SmartLink>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="v2-section">
        <div className="v2-container">
          <FlowMap />
          <Reveal style={{ marginTop: 48 }}>
            <SmartLink href={copy.systemLink.href} className="v2-button">
              {copy.systemLink.label} <ArrowIcon />
            </SmartLink>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
