import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import pluginRewriteAll from "vite-plugin-rewrite-all";
import legacy from "@vitejs/plugin-legacy";

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const excludeFiles = (predicate: boolean, paths: (string | RegExp)[]) => {
  if (predicate) return paths;
  return [];
};

export default defineConfig({
  root: "./src",
  appType: "spa",
  // resolve: {
  //   alias: {
  //     https: require.resolve("rollup-plugin-node-builtins"),
  //   },
  // },
  plugins: [
    react(),
    // allows us to use the tsconfig baseUrl setting
    // to enable absolute imports
    tsconfigPaths() as any,
    // /**
    //  * Fixes the 404 error issue on page refresh when the URL
    //  * contains invalid characters
    //  */
    pluginRewriteAll() as any,
    // // This runs the app over https but Android still
    // // refuses to load it.
    // // basicSsl()

    // // this plugin allows us to support older version of iOS
    legacy({
      targets: ["defaults", "ios >= 13"],
    }),
  ],
  envDir: "./env",
  build: {
    // for some reason it thinks it is in the src directory,
    // so we need to go up one level
    outDir: "../dist",
    minify: false,
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      external: [
        // Don't exclude for vercel builds
        ...excludeFiles(!process.env.VERCEL, [/pages\/Components.*/]),
      ],
    },
  },
  server: {
    port: 5173,
    host: "0.0.0.0",
    strictPort: true,
    // https: true
  },
  /**
   * When using npm link, you may want to exclude the dependency from vite's
   * optimizations. An example below:
   */
  // optimizeDeps: {
  //   exclude: ["@nypl/epub-to-webpub"]
  // }
});
