import { useState, useEffect, useCallback } from "react";

const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const unique = (arr) => Array.from(new Set(arr));

const useResourceLoader = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingPhase, setLoadingPhase] = useState("Initializing...");
  const [isComplete, setIsComplete] = useState(false);

  const loadFont = (fontFamily) => {
    return new Promise((resolve) => {
      if (document.fonts && document.fonts.load) {
        document.fonts
          .load(`16px ${fontFamily}`)
          .then(() => resolve())
          .catch(() => resolve());
      } else {
        // Fallback when Font Loading API is unavailable
        setTimeout(resolve, 100);
      }
    });
  };

  const preloadImage = (src) => {
    return new Promise((resolve) => {
      if (!src || src.startsWith("data:")) return resolve();
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve(); // don't block on failures
      img.src = src;
    });
  };

  const collectDomImageSrcs = () => {
    const nodes = Array.from(document.querySelectorAll("img"));
    const srcs = nodes.map((n) => n.currentSrc || n.src).filter(Boolean);
    return unique(srcs);
  };

  const loadResources = useCallback(async () => {
    try {
      // Phase 0: Delay resource loading to prevent initial lag
      setLoadingPhase("Initializing...");
      setLoadingProgress(5);
      await wait(3000); // Wait 3 seconds before starting heavy operations

      // Phase 1: allow underlying app to mount this tick
      setLoadingPhase("Preparing...");
      setLoadingProgress(10);
      await wait(50);

      // Phase 2: Fonts
      setLoadingPhase("Loading fonts...");
      setLoadingProgress(15);
      const fontsToLoad = [
        "Ethnocentric Rg",
        "MFYueHei_Noncommercial-Regular",
        "Inter",
        "system-ui",
      ];

      const fontsReady =
        document.fonts && document.fonts.ready
          ? document.fonts.ready.catch(() => {})
          : Promise.resolve();

      await Promise.race([
        Promise.allSettled(fontsToLoad.map(loadFont)),
        wait(1500), // cap font wait to keep snappy
      ]);
      await Promise.race([fontsReady, wait(500)]);
      setLoadingProgress(25);

      // Phase 3: Gather images from DOM (after pages mounted behind overlay)
      setLoadingPhase("Loading images...");
      // Let layout complete so images are in DOM
      await wait(50);
      const srcs = collectDomImageSrcs();
      const total = srcs.length || 1;
      let done = 0;

      setLoadingProgress((p) => Math.max(p, 27));

      await Promise.allSettled(
        srcs.map((src) =>
          preloadImage(src).then(() => {
            done += 1;
            const ratio = done / total;
            // Map 27% -> 95%
            const progress = 27 + ratio * 68;
            setLoadingProgress((prev) =>
              clamp(Math.max(prev, progress), 0, 97)
            );
          })
        )
      );

      // Phase 4: Finalize
      setLoadingPhase("Finalizing...");
      setLoadingProgress((p) => Math.max(p, 97));
      await wait(100);

      setLoadingPhase("Complete");
      setLoadingProgress(100);
      setIsComplete(true);
    } catch (e) {
      console.warn("Resource loading error:", e);
      setLoadingPhase("Complete");
      setLoadingProgress(100);
      setIsComplete(true);
    }
  }, []);

  useEffect(() => {
    loadResources();
  }, [loadResources]);

  return { loadingProgress, loadingPhase, isComplete };
};

export default useResourceLoader;
