import { useState } from "react";
import { Reveal, SectionHead, SmartLink, ArrowIcon } from "../primitives";

// The operating-system diagram: market layer on top, capability layers in
// the middle, the shared infrastructure underneath. Select a layer to read it.
export default function SystemMap({ eyebrow, title, intro, top, layers = [], base }) {
  const all = base ? [...layers, { ...base, isBase: true }] : layers;
  const [index, setIndex] = useState(0);
  const active = all[index] || all[0];

  return (
    <>
      <SectionHead eyebrow={eyebrow} title={title} intro={intro} />
      <div className="v2-system">
        <Reveal className="v2-system-stack" role="tablist" aria-label="System layers">
          {top && <div className="v2-system-top">{top}</div>}
          {all.map((layer, i) => (
            <button
              key={layer.title}
              type="button"
              role="tab"
              aria-selected={i === index}
              className={`v2-layer ${layer.isBase ? "v2-layer--base" : ""} ${i === index ? "is-active" : ""}`}
              onClick={() => setIndex(i)}
              onMouseEnter={() => setIndex(i)}
            >
              <span>{layer.title}</span>
              {!layer.isBase && <span className="v2-layer-index">{String(i + 1).padStart(2, "0")}</span>}
            </button>
          ))}
        </Reveal>

        <Reveal className="v2-system-detail" role="tabpanel" aria-live="polite" delay={120}>
          <span className="v2-eyebrow">{active.isBase ? "Infrastructure" : `Layer ${String(index + 1).padStart(2, "0")}`}</span>
          <h3 className="v2-h2" style={{ fontSize: "clamp(26px, 2.8vw, 38px)" }}>
            {active.title}
          </h3>
          <p className="v2-lead" style={{ fontSize: 17 }}>
            {active.body}
          </p>
          {active.links?.length > 0 && (
            <div className="v2-system-links">
              {active.links.map((l) => (
                <SmartLink key={l.href + l.label} href={l.href} className="v2-button" style={{ padding: "10px 18px" }}>
                  {l.label} <ArrowIcon />
                </SmartLink>
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </>
  );
}
