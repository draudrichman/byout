import React from "react";
import "@/pages/branddev/styles/scoped-globals.css";

import Cursor from "@/pages/branddev/components/cursor";
import SmoothScroll from "@/pages/branddev/components/smooth-scroll";
import ErrorBoundary from "@/pages/branddev/components/error-boundary";
import { initPerformanceMonitoring } from "@/pages/branddev/utils/performance";
import BrandDevAll from "./BrandDevAll";

// Initialize performance monitoring
if (typeof window !== "undefined") {
  initPerformanceMonitoring();
}

export default function BrandDevPage() {
  return (
    <div
      className="branddev-page font-sans antialiased"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <ErrorBoundary>
        <SmoothScroll>
          {/* <Cursor /> */}
          <BrandDevAll />
        </SmoothScroll>
      </ErrorBoundary>
    </div>
  );
}
