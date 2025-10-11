import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  build: {
    rollupOptions: {
      output: !isSsrBuild
        ? {
            manualChunks: {
              // Split vendor code for better caching (client-side only)
              "react-vendor": ["react", "react-dom", "react-router"],
              "gsap-vendor": ["gsap"],
            },
          }
        : undefined,
    },
    // Enable minification
    minify: "esbuild",
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable CSS code splitting
    cssCodeSplit: true,
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router", "gsap"],
  },
}));
