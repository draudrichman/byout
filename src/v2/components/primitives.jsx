import { forwardRef, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { modulePages } from "../content";

// Pages that live inside the V2 router tree navigate without a reload.
// Older pages (/tech, /retail, /branddev) get a normal link, which is how the
// rest of the site already reaches them.
const SPA_PATHS = new Set(["/", "/contact", ...modulePages.map((p) => `/${p.slug}`)]);

export function SmartLink({ href, children, ...props }) {
  if (href && SPA_PATHS.has(href)) {
    return (
      <Link to={href} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}

export function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" {...props}>
      <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Fades its children up once they scroll into view.
export const Reveal = forwardRef(function Reveal(
  // `Tag` is used as a JSX element below; this ESLint config can't see that.
  // eslint-disable-next-line no-unused-vars
  { as: Tag = "div", className = "", delay = 0, children, ...props },
  forwardedRef,
) {
  const ref = useRef(null);
  const setRef = (node) => {
    ref.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={setRef}
      className={`v2-reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...props}
    >
      {children}
    </Tag>
  );
});

export function SectionHead({ eyebrow, title, intro }) {
  if (!eyebrow && !title && !intro) return null;
  return (
    <Reveal className="v2-section-head">
      {eyebrow && <span className="v2-eyebrow">{eyebrow}</span>}
      {title && <h2 className="v2-h2">{title}</h2>}
      {intro && <p className="v2-lead">{intro}</p>}
    </Reveal>
  );
}
