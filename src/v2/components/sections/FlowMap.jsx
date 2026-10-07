import { useEffect, useMemo, useRef, useState } from "react";
import { home } from "../../content";
import { Reveal, SectionHead, SmartLink, ArrowIcon } from "../primitives";

// China ↔ Global system map. Four lanes (Brand, Product, Supply Chain,
// Business) connect the two markets; dots travel along them in the chosen
// direction. Copy comes from content/home.js → flowMap.

const LAYOUTS = {
  wide: {
    w: 1000, h: 560,
    china: [130, 280], global: [870, 280],
    lane(o) {
      const y = 280 + o * 1.3;
      return { d: `M 190 280 C 380 ${y}, 620 ${y}, 810 280`, mid: [500, 280 + o * 0.975] };
    },
    offsets: [-195, -65, 65, 195],
    labelW: 132, labelH: 34, font: 15,
  },
  narrow: {
    w: 440, h: 850,
    china: [220, 110], global: [220, 740],
    lane(o) {
      const x = 220 + o * 1.3;
      return { d: `M 220 166 C ${x} 330, ${x} 520, 220 684`, mid: [220 + o * 0.975, 425] };
    },
    offsets: [-165, -55, 55, 165],
    labelW: 98, labelH: 30, font: 13,
  },
};

const DOTS_PER_DIRECTION = 2;
const DURATION = 5.5;

function useNarrow(ref, breakpoint = 640) {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setNarrow(entry.contentRect.width < breakpoint));
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, breakpoint]);
  return narrow;
}

export default function FlowMap({ eyebrow, title, intro, showHead = true }) {
  const copy = home.flowMap;
  const stageRef = useRef(null);
  const svgRef = useRef(null);
  const narrow = useNarrow(stageRef);
  const L = narrow ? LAYOUTS.narrow : LAYOUTS.wide;
  const [direction, setDirection] = useState("both"); // both | outbound | inbound
  const [activeKey, setActiveKey] = useState(copy.assets[0].key);
  const active = copy.assets.find((a) => a.key === activeKey) || copy.assets[0];

  const lanes = useMemo(
    () => copy.assets.map((asset, i) => ({ asset, ...L.lane(L.offsets[i]) })),
    [copy.assets, L],
  );

  // SVG animations run only while the map is on screen and motion is allowed.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const update = () => {
      if (visible && !reduce.matches && !document.hidden) svg.unpauseAnimations?.();
      else svg.pauseAnimations?.();
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      update();
    });
    io.observe(svg);
    document.addEventListener("visibilitychange", update);
    reduce.addEventListener?.("change", update);
    svg.pauseAnimations?.();
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
      reduce.removeEventListener?.("change", update);
    };
  }, [narrow, direction]);

  const showOut = direction !== "inbound";
  const showIn = direction !== "outbound";
  const sides = [
    showOut && { key: "outbound", label: copy.directions.outbound, data: active.outbound },
    showIn && { key: "inbound", label: copy.directions.inbound, data: active.inbound },
  ].filter(Boolean);

  return (
    <div className="v2-flow">
      {showHead && (
        <SectionHead eyebrow={eyebrow ?? copy.eyebrow} title={title ?? copy.title} intro={intro ?? copy.intro} />
      )}

      <Reveal className="v2-flow-controls" role="group" aria-label="Direction">
        {[
          ["both", "Both directions"],
          ["outbound", copy.directions.outbound],
          ["inbound", copy.directions.inbound],
        ].map(([key, label]) => (
          <button
            key={key}
            type="button"
            className={`v2-chip ${direction === key ? "is-active" : ""}`}
            aria-pressed={direction === key}
            onClick={() => setDirection(key)}
          >
            {label}
          </button>
        ))}
      </Reveal>

      <Reveal className="v2-flow-stage" ref={stageRef}>
        <svg
          ref={svgRef}
          key={`${narrow}-${direction}`}
          className="v2-flow-svg"
          viewBox={`0 0 ${L.w} ${L.h}`}
          role="group"
          aria-label="Assets moving between China and global markets"
        >
          {lanes.map(({ asset, d, mid }, i) => {
            const id = `v2-lane-${asset.key}-${narrow ? "n" : "w"}`;
            const isActive = asset.key === activeKey;
            return (
              <g
                key={asset.key}
                className={`v2-flow-lane ${isActive ? "is-active" : ""}`}
                onClick={() => setActiveKey(asset.key)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setActiveKey(asset.key))}
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
                aria-label={asset.label}
              >
                <path id={id} className="track" d={d} />
                <path className="hit" d={d} />
                {showOut &&
                  Array.from({ length: DOTS_PER_DIRECTION }).map((_, k) => (
                    <circle key={`o${k}`} className="dot" r={isActive ? 4 : 3}>
                      <animateMotion dur={`${DURATION}s`} begin={`${-(k * DURATION) / DOTS_PER_DIRECTION - i * 0.6}s`} repeatCount="indefinite">
                        <mpath href={`#${id}`} />
                      </animateMotion>
                    </circle>
                  ))}
                {showIn &&
                  Array.from({ length: DOTS_PER_DIRECTION }).map((_, k) => (
                    <circle key={`i${k}`} className="dot" r={isActive ? 4 : 3} opacity={showOut ? 0.55 : 1}>
                      <animateMotion
                        dur={`${DURATION}s`}
                        begin={`${-(k * DURATION) / DOTS_PER_DIRECTION - i * 0.6 - DURATION / 4}s`}
                        repeatCount="indefinite"
                        keyPoints="1;0"
                        keyTimes="0;1"
                        calcMode="linear"
                      >
                        <mpath href={`#${id}`} />
                      </animateMotion>
                    </circle>
                  ))}
                <g className="lane-label" transform={`translate(${mid[0] - L.labelW / 2} ${mid[1] - L.labelH / 2})`}>
                  <rect width={L.labelW} height={L.labelH} rx={L.labelH / 2} />
                  <text x={L.labelW / 2} y={L.labelH / 2 + L.font * 0.36} textAnchor="middle" style={{ fontSize: L.font }}>
                    {asset.label}
                  </text>
                </g>
              </g>
            );
          })}

          {[
            ["china", copy.poles.china],
            ["global", copy.poles.global],
          ].map(([key, label]) => {
            const [cx, cy] = L[key];
            const below = !narrow || key === "global";
            return (
              <g key={key} className="v2-flow-pole">
                <circle className="ring" cx={cx} cy={cy} r={52} opacity={0.35} />
                <circle className="ring" cx={cx} cy={cy} r={38} opacity={0.6} />
                <circle className="core" cx={cx} cy={cy} r={24} />
                <text
                  x={cx}
                  y={narrow ? (below ? cy + 50 + 22 : cy - 50 - 10) : cy + 52 + 30}
                  textAnchor="middle"
                >
                  {label}
                </text>
              </g>
            );
          })}
        </svg>
      </Reveal>

      <Reveal className="v2-flow-detail" aria-live="polite">
        <div style={{ display: "grid", gap: 10 }}>
          <span className="v2-eyebrow">{active.label}</span>
          <h3 className="v2-h2" style={{ fontSize: "clamp(26px, 3vw, 40px)" }}>
            {sides.length === 1 ? sides[0].data.summary : `${active.label}, in both directions`}
          </h3>
        </div>
        <div className="v2-directions" style={{ gridTemplateColumns: sides.length === 1 ? "1fr" : undefined }}>
          {sides.map((side) => (
            <div key={side.key} className="v2-direction" style={{ gap: 14 }}>
              <span className="v2-direction-label" style={{ fontSize: 20 }}>
                {side.label}
              </span>
              {sides.length > 1 && <p className="v2-body">{side.data.summary}</p>}
              <ul className="v2-list">
                {side.data.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
              {side.data.link && (
                <SmartLink href={side.data.link.href} className="v2-cell-link">
                  {side.data.link.label} <ArrowIcon />
                </SmartLink>
              )}
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
