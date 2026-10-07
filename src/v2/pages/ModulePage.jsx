import { getModulePage } from "../content";
import V2Layout from "../components/V2Layout";
import { Hero } from "../components/sections/basic";
import { Section } from "../components/sections";

// Renders any V2 module page from its content file (src/v2/content/modules).
export default function ModulePage({ slug }) {
  const page = getModulePage(slug);
  if (!page) return null;

  return (
    <V2Layout meta={page.meta}>
      <Hero {...page.hero} />
      {page.sections.map((section, i) => (
        <Section key={`${section.type}-${i}`} section={section} />
      ))}
    </V2Layout>
  );
}
