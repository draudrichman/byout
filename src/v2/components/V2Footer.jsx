import { site } from "../content";
import { SmartLink } from "./primitives";

export default function V2Footer() {
  return (
    <footer className="v2-footer">
      <div className="v2-container">
        <div className="v2-footer-top">
          <div style={{ display: "grid", gap: 18, alignContent: "start" }}>
            <SmartLink href="/" aria-label="PRISM home">
              <img className="v2-logo" src="/img/logos/prism.svg" alt="PRISM" />
            </SmartLink>
            <p className="v2-body" style={{ maxWidth: "36ch" }}>
              {site.footer.statement}
            </p>
          </div>
          <div className="v2-footer-cols">
            {site.nav.map((group) => (
              <div key={group.label} className="v2-footer-col">
                <span className="v2-eyebrow" style={{ marginBottom: 6 }}>
                  {group.label}
                </span>
                {group.items.map((item) => (
                  <SmartLink key={item.href} href={item.href}>
                    {item.label}
                  </SmartLink>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="v2-footer-bottom">{site.footer.copyright}</div>
      </div>
    </footer>
  );
}
