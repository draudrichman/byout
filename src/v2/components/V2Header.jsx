import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { site } from "../content";
import { SmartLink, ArrowIcon } from "./primitives";

export default function V2Header() {
  const { pathname } = useLocation();
  const [solid, setSolid] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation, outside click and Escape.
  useEffect(() => {
    setOpenGroup(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenGroup(null);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <>
      <header className={`v2-header ${solid || mobileOpen ? "is-solid" : ""}`}>
        <div className="v2-container v2-header-inner">
          <SmartLink href="/" aria-label="PRISM home">
            <img className="v2-logo" src="/img/logos/prism.svg" alt="PRISM" />
          </SmartLink>

          <nav className="v2-nav" ref={navRef} aria-label="Main">
            {site.nav.map((group) => (
              <div
                key={group.label}
                className={`v2-nav-group ${openGroup === group.label ? "is-open" : ""}`}
                onMouseEnter={() => setOpenGroup(group.label)}
                onMouseLeave={() => setOpenGroup(null)}
              >
                <button
                  type="button"
                  className="v2-nav-trigger"
                  aria-expanded={openGroup === group.label}
                  onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
                >
                  {group.label}
                </button>
                <div className="v2-nav-menu">
                  {group.items.map((item) => (
                    <SmartLink
                      key={item.href}
                      href={item.href}
                      className={`v2-nav-item ${pathname === item.href ? "is-active" : ""}`}
                    >
                      <span className="v2-nav-item-label">{item.label}</span>
                      {item.note && <span className="v2-nav-item-note">{item.note}</span>}
                    </SmartLink>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <SmartLink href={site.cta.href} className="v2-button">
            {site.contactLabel} <ArrowIcon />
          </SmartLink>

          <button
            type="button"
            className="v2-menu-toggle"
            aria-expanded={mobileOpen}
            aria-controls="v2-mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <div id="v2-mobile-menu" className={`v2-mobile-menu ${mobileOpen ? "is-open" : ""}`} aria-hidden={!mobileOpen}>
        {site.nav.map((group) => (
          <div key={group.label} className="v2-mobile-group">
            <span className="v2-eyebrow">{group.label}</span>
            {group.items.map((item) => (
              <SmartLink key={item.href} href={item.href} tabIndex={mobileOpen ? 0 : -1}>
                {item.label}
              </SmartLink>
            ))}
          </div>
        ))}
        <div style={{ marginTop: 28 }}>
          <SmartLink href={site.cta.href} className="v2-button v2-button--solid" tabIndex={mobileOpen ? 0 : -1}>
            {site.contactLabel} <ArrowIcon />
          </SmartLink>
        </div>
      </div>
    </>
  );
}
