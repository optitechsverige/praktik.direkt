import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import svgr from '@svgr/rollup';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    host: true,
    open: false,
    hmr: {
      overlay: false, // Disable HMR overlay for better performance
    },
    watch: {
      usePolling: false, // Disable file system polling
      ignored: ['**/node_modules/**', '**/.git/**'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/,
    exclude: []
  },
  build: {
    sourcemap: false,
    minify: 'esbuild',
    cssMinify: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('@mui')) {
              return 'vendor-mui';
            }
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('lodash') || id.includes('moment')) {
              return 'vendor-utils';
            }
            return 'vendor-other';
          }
        },
        compact: true,
      },
    },
    target: 'es2020',
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'lodash',
      'moment',
      'react-syntax-highlighter'
    ],
    exclude: [
      '@mui/*',
      'react-slick',
      'msw'
    ],
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
        '.svg': 'dataurl'
      },
      target: 'es2020',
      minify: true,
      treeShaking: true,
      define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }
  },
  plugins: [
    svgr({
      // Enable SVG optimization
      svgo: true,
      // Enable React component import
      ref: true,
      // Enable title prop
      titleProp: true,
      // Enable SVG viewBox
      svgProps: {
        role: 'img'
      },
      // Enable SVG optimization config
      svgoConfig: {
        plugins: [
          {
            name: 'removeViewBox',
            active: false
          },
          {
            name: 'removeDimensions',
            active: true
          }
        ]
      }
    }),
    react({
      // Only use Fast Refresh in development
      fastRefresh: process.env.NODE_ENV !== 'production',
      // Disable babel for faster builds
      babel: {
        babelrc: false,
        configFile: false,
      },
    }),
    // Visualize bundle size at build time
    process.env.ANALYZE === 'true' && visualizer({
      open: true,
      filename: 'bundle-analyzer-report.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),
});
