import {
  Statement,
  Pillars,
  Chain,
  Structures,
  Directions,
  Stats,
  Links,
  Cta,
  CaseFramework,
  Cases,
} from "./basic";
import FlowMap from "./FlowMap";
import SystemMap from "./SystemMap";
import RetailCoverage from "./RetailCoverage";

// Maps a content entry's `type` to the component that lays it out.
// See src/v2/content/README.md for the list.
const sectionTypes = {
  statement: Statement,
  pillars: Pillars,
  chain: Chain,
  structures: Structures,
  directions: Directions,
  flowMap: FlowMap,
  systemMap: SystemMap,
  caseFramework: CaseFramework,
  cases: Cases,
  retailCoverage: RetailCoverage,
  stats: Stats,
  links: Links,
  cta: Cta,
};

export function Section({ section }) {
  const { type, ...props } = section;
  const Component = sectionTypes[type];
  if (!Component) {
    if (import.meta.env.DEV) console.warn(`Unknown V2 section type "${type}"`);
    return null;
  }
  return (
    <section className="v2-section">
      <div className="v2-container">
        <Component {...props} />
      </div>
    </section>
  );
}
