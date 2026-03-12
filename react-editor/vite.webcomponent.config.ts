// react-editor\vite.webcomponent.config.ts
import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
  ],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
    "process.env": JSON.stringify({}),
    "process": JSON.stringify({ env: { NODE_ENV: "production" } }),
    "process.browser": true,
    "global": "globalThis",
  },
  resolve: {
    alias: [
      {
        find: "next/image",
        replacement: path.resolve(__dirname, "./webcomponent/mocks/next-image.tsx"),
      },
      {
        find: "next/link",
        replacement: path.resolve(__dirname, "./webcomponent/mocks/next-link.tsx"),
      },
      {
        find: "next/navigation",
        replacement: path.resolve(__dirname, "./webcomponent/mocks/next-navigation.ts"),
      },
      {
        find: "next/router",
        replacement: path.resolve(__dirname, "./webcomponent/mocks/next-navigation.ts"),
      },
    ],
  },
  optimizeDeps: {
    include: [
      "@aws-amplify/ui-react",
      "@aws-amplify/ui-react-core",
      "@aws-amplify/ui",
    ],
  },
  build: {
    outDir: "dist-wc",
    emptyOutDir: true,
    lib: {
      entry: "./webcomponent/puck-editor-wc.tsx",
      name: "PuckEditor",
      fileName: () => "puck-editor.js",
      formats: ["iife"],
    },
    rollupOptions: {
      external: [],
      output: {
        // ✅ This tells rollup to NOT statically check named exports
        // from these virtual stub modules
        generatedCode: {
          reservedNamesAsProps: false,
        },
      },
    },
    cssCodeSplit: false,
    minify: false,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});