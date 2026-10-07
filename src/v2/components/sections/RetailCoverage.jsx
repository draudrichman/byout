import { logosByCountry } from "../../../components/ExperienceShowcase/map/LogoShowcaseData";
import { Reveal, SectionHead } from "../primitives";

// Uses the same retailer data as the homepage channel map, so both stay in
// sync. Pass `countries` to show a subset, e.g. ["China"].
export default function RetailCoverage({ eyebrow, title, intro, countries }) {
  const entries = Object.entries(logosByCountry).filter(([country, logos]) => {
    if (!logos?.length) return false;
    return !countries || countries.includes(country);
  });

  return (
    <>
      <SectionHead eyebrow={eyebrow} title={title} intro={intro} />
      <div className="v2-coverage">
        {entries.map(([country, logos]) => (
          <Reveal key={country} className="v2-coverage-country">
            <span className="v2-coverage-name">{country}</span>
            <div className="v2-logos">
              {logos.map((logo) => (
                <div key={logo.src} className="v2-logo-tile" title={logo.title}>
                  <img src={logo.src} alt={logo.title || ""} loading="lazy" decoding="async" />
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </>
  );
}
