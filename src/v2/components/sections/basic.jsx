import { site } from "../../content";
import { Reveal, SectionHead, SmartLink, ArrowIcon } from "../primitives";

export function Hero({ eyebrow, title, intro }) {
  return (
    <section className="v2-hero">
      <div className="v2-container">
        <div className="v2-hero-inner">
        {eyebrow && (
          <Reveal>
            <span className="v2-eyebrow">{eyebrow}</span>
          </Reveal>
        )}
        <Reveal as="h1" className="v2-display" delay={80}>
          {title}
        </Reveal>
        {intro && (
          <Reveal as="p" className="v2-lead" delay={160}>
            {intro}
          </Reveal>
        )}
        </div>
      </div>
    </section>
  );
}

export function Statement({ eyebrow, title, body }) {
  return (
    <div className="v2-statement">
      <Reveal style={{ display: "grid", gap: 20 }}>
        {eyebrow && <span className="v2-eyebrow">{eyebrow}</span>}
        <h2 className="v2-h2">{title}</h2>
      </Reveal>
      {body && (
        <Reveal as="p" className="v2-lead" delay={120}>
          {body}
        </Reveal>
      )}
    </div>
  );
}

// How many columns the last cell spans so a short final row fills the width.
// Large screens use `cols` columns; medium screens use 2.
function lastRowSpans(count, cols) {
  const span = (c) => (count % c === 0 ? 1 : c - (count % c) + 1);
  return { "--last-span-lg": span(cols), "--last-span-md": cols >= 2 ? span(2) : 1 };
}

export function Pillars({ eyebrow, title, intro, items = [], columns }) {
  const cols = columns || (items.length % 3 === 0 ? 3 : items.length <= 2 ? 2 : items.length === 4 ? 4 : 3);
  return (
    <>
      <SectionHead eyebrow={eyebrow} title={title} intro={intro} />
      <Reveal className={`v2-grid v2-grid--${cols}`} style={lastRowSpans(items.length, cols)}>
        {items.map((item) => (
          <div key={item.title} className="v2-cell">
            <h3 className="v2-h3">{item.title}</h3>
            {item.body && <p className="v2-body">{item.body}</p>}
            {item.href && (
              <SmartLink href={item.href} className="v2-cell-link">
                {item.linkLabel || "Learn more"} <ArrowIcon />
              </SmartLink>
            )}
          </div>
        ))}
      </Reveal>
    </>
  );
}

export function Chain({ eyebrow, title, intro, steps = [], large }) {
  return (
    <>
      <SectionHead eyebrow={eyebrow} title={title} intro={intro} />
      <Reveal as="ol" className={`v2-chain ${large ? "v2-chain--large" : ""}`} style={{ "--steps": steps.length }}>
        {steps.map((step, i) => (
          <li key={step.title} className="v2-step">
            <span className="v2-step-num">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="v2-h3">{step.title}</h3>
            {step.body && <p className="v2-body">{step.body}</p>}
          </li>
        ))}
      </Reveal>
    </>
  );
}

export function Structures({ eyebrow, title, intro, items = [] }) {
  return (
    <>
      <SectionHead eyebrow={eyebrow} title={title} intro={intro} />
      <Reveal className="v2-structures">
        {items.map((item) => {
          const inner = (
            <>
              <h3 className="v2-h3">{item.title}</h3>
              {item.body && <p className="v2-body">{item.body}</p>}
              {item.href && <ArrowIcon className="v2-structure-arrow" />}
            </>
          );
          return item.href ? (
            <SmartLink key={item.title} href={item.href} className="v2-structure">
              {inner}
            </SmartLink>
          ) : (
            <div key={item.title} className="v2-structure">
              {inner}
            </div>
          );
        })}
      </Reveal>
    </>
  );
}

export function Directions({ eyebrow, title, intro, outbound, inbound }) {
  return (
    <>
      <SectionHead eyebrow={eyebrow} title={title} intro={intro} />
      <Reveal className="v2-directions">
        {[outbound, inbound].filter(Boolean).map((side) => (
          <div key={side.label} className="v2-direction">
            <span className="v2-direction-label">{side.label}</span>
            <ul className="v2-list">
              {side.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </Reveal>
    </>
  );
}

export function Stats({ eyebrow, title }) {
  return (
    <>
      <SectionHead eyebrow={eyebrow} title={title} />
      <Reveal className="v2-stats">
        {site.stats.map((s) => (
          <div key={s.label} className="v2-stat">
            <span className="v2-stat-value">{s.value}</span>
            <span className="v2-stat-label">{s.label}</span>
          </div>
        ))}
      </Reveal>
    </>
  );
}

export function Links({ eyebrow, title, items = [] }) {
  return (
    <>
      {(eyebrow || title) && (
        <Reveal style={{ marginBottom: 28, display: "grid", gap: 12 }}>
          {eyebrow && <span className="v2-eyebrow">{eyebrow}</span>}
          {title && <h2 className="v2-h3" style={{ fontSize: 15, color: "var(--v2-muted)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 500 }}>{title}</h2>}
        </Reveal>
      )}
      <Reveal className="v2-links">
        {items.map((item) => (
          <SmartLink key={item.href} href={item.href} className="v2-link-card">
            <span className="v2-link-card-top">
              <span className="v2-h3">{item.title}</span>
              <ArrowIcon />
            </span>
            {item.body && <span className="v2-body">{item.body}</span>}
          </SmartLink>
        ))}
      </Reveal>
    </>
  );
}

export function Cta(props) {
  const cta = { ...site.cta, ...props };
  return (
    <Reveal className="v2-cta">
      <span className="v2-eyebrow">{cta.eyebrow}</span>
      <h2 className="v2-h2" style={{ maxWidth: "18ch" }}>
        {cta.title}
      </h2>
      <p className="v2-lead">{cta.body}</p>
      <SmartLink href={cta.href} className="v2-button v2-button--solid">
        {cta.button} <ArrowIcon />
      </SmartLink>
    </Reveal>
  );
}

export function CaseFramework(props) {
  return <Chain {...props} />;
}

export function Cases({ eyebrow, title, items = [], emptyTitle, emptyBody }) {
  const verified = items.filter((c) => c.verified);
  return (
    <>
      <SectionHead eyebrow={eyebrow} title={title} />
      {verified.length === 0 ? (
        <Reveal className="v2-cases-empty">
          <h3 className="v2-h3" style={{ fontSize: 22, fontWeight: 300 }}>
            {emptyTitle}
          </h3>
          <p className="v2-body">{emptyBody}</p>
          <div>
            <SmartLink href={site.cta.href} className="v2-button" style={{ marginTop: 8 }}>
              {site.contactLabel} <ArrowIcon />
            </SmartLink>
          </div>
        </Reveal>
      ) : (
        <div style={{ display: "grid", gap: 16 }}>
          {verified.map((c) => (
            <Reveal key={c.title} className="v2-case">
              <div style={{ display: "grid", gap: 12 }}>
                {c.tags?.length > 0 && (
                  <div className="v2-case-tags">
                    {c.tags.map((t) => (
                      <span key={t} className="v2-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <h3 className="v2-h2" style={{ fontSize: "clamp(26px, 3vw, 38px)" }}>
                  {c.title}
                </h3>
              </div>
              <div className="v2-grid v2-grid--4">
                {[
                  ["Challenge", c.challenge],
                  ["Entry architecture", c.architecture],
                  ["Execution", c.execution],
                  ["Commercial result", c.result],
                ].map(([label, text]) => (
                  <div key={label} className="v2-cell">
                    <span className="v2-eyebrow">{label}</span>
                    <p className="v2-body">{text}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </>
  );
}
