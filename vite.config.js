import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from "node:url";
import path from 'path'
import { analyzer } from 'vite-bundle-analyzer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    analyzer(),
  ],
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
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor-animation': ['gsap', 'framer-motion'],
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
    target: 'es2015', // Target modern browsers for better optimization
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'gsap', 
      '@studio-freight/react-lenis',
      '@react-three/fiber',
      '@react-three/drei',
      'three',
      'three-globe'
    ],
    exclude: [], // Don't exclude anything - let Vite handle it
  },
  // Performance optimizations
  server: {
    hmr: {
      overlay: false, // Disable error overlay for better performance
    },
  },
})
