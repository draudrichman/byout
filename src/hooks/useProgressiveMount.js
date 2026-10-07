import { useEffect, useState } from "react";

const requestIdle =
  typeof window !== "undefined" && window.requestIdleCallback
    ? (cb) => window.requestIdleCallback(cb, { timeout: 300 })
    : (cb) => setTimeout(cb, 50);

const cancelIdle =
  typeof window !== "undefined" && window.cancelIdleCallback
    ? (id) => window.cancelIdleCallback(id)
    : (id) => clearTimeout(id);

/**
 * Mounts `total` sections one at a time, each in the browser's next idle
 * period after the previous one has rendered. Sections appear in document
 * order within a second or two, and no single mount is stacked on top of
 * another, so the main thread stays free for scrolling.
 *
 * Returns how many sections may be rendered so far.
 */
export default function useProgressiveMount(total) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= total) return;
    const id = requestIdle(() => setCount((c) => Math.min(c + 1, total)));
    return () => cancelIdle(id);
  }, [count, total]);

  return count;
}
