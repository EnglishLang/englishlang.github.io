import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import base44 from '@base44/vite-plugin';

export default defineConfig({
  // FIXED: Forces absolute paths for all built assets. 
  // This allows 404.html to find your JS/CSS files even from deep URLs.
  base: '/', 
  plugins: [
    base44({
      legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === 'true',
      hmrNotifier: false, // Bytes saved by disabling dev utilities
      navigationNotifier: false,
      analyticsTracker: true,
      visualEditAgent: false
    }),
    react(),
  ],
  build: {
    target: 'esnext', // Drops heavy legacy browser polyfills
    minify: true,
    sourcemap: false, // Eliminates heavy map footprint
    cssCodeSplit: true, // NATIVE ROLDOWN OPTIMIZATION
    rolldownOptions: {
      output: {
        codeSplitting: {
          minSize: 10000, // Don't make chunks smaller than 10KB
          groups: [
            { 
              name: 'vendor-react', 
              test: /node_modules[\\/]react/, // Isolates React core architecture
              priority: 20 // Ensures it matches this rule first
            },
            { 
              name: 'vendor-base44', 
              test: /node_modules[\\/]@base44/, // Isolates the SDK asset bloat
              priority: 15 
            },
            { 
              name: 'vendor-others', 
              test: /node_modules/, // Catches any leftover packages
              priority: 10 
            }
          ]
        }
      }
    }
  },
});
