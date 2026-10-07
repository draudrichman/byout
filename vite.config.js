import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from "node:url";
import path from 'path'
import { analyzer } from 'vite-bundle-analyzer';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
    // Bundle report only on demand: `npm run analyze`. Running it on every
    // build starts a server that keeps `vite build` from ever exiting.
    mode === 'analyze' && analyzer(),
  ].filter(Boolean),
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src/retail-channel/gsapcountries-main/app'),
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    // Optimize chunk size
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-animation': ['gsap', 'motion/react'],
          'vendor-lenis': ['@studio-freight/react-lenis'],
        }
      }
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
        passes: 2, // Multiple compression passes for better results
        pure_funcs: ['console.log', 'console.info', 'console.debug'], // Remove specific console methods
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false, // Remove all comments
      }
    },
    // Additional optimizations
    cssCodeSplit: true,
    sourcemap: false, // Disable sourcemaps in production for smaller bundle
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'gsap', 
      '@studio-freight/react-lenis',
    ],
    exclude: [], // Don't exclude anything - let Vite handle it
  },
  // Performance optimizations
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    },
    hmr: {
      overlay: false, // Disable error overlay for better performance
    },
  },
}))
