import { useEffect } from "react";
import { useLenis } from "@studio-freight/react-lenis";
import V2Header from "./V2Header";
import V2Footer from "./V2Footer";
import "../v2.css";

const DEFAULT_TITLE = "Prïsm";

function setMeta(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content || "");
}

// Shell for every V2 page: header, footer, page title and description, and
// a fresh scroll position on arrival.
export default function V2Layout({ meta, children }) {
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    // run once per page mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.title = meta?.title || DEFAULT_TITLE;
    setMeta("description", meta?.description);
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [meta?.title, meta?.description]);

  return (
    <div className="v2" style={{ minHeight: "100vh" }}>
      <V2Header />
      <main>{children}</main>
      <V2Footer />
    </div>
  );
}
