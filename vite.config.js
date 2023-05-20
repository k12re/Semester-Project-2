import { resolve } from "path";
import { defineConfig } from "vite";

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");
const publicDir = resolve(__dirname, "src/assets");

export default defineConfig({
  root,
  resolve: {
    alias: {
      "~bootstrap": resolve(__dirname, "node_modules/bootstrap"),
    },
  },
  css: {
    devSourcemap: true,
  },
  build: {
    outDir,
    emptyOutDir: true,
    publicDir,
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        listing: resolve(root, "listing/index.html"),
        profile: resolve(root, "profile/index.html"),
        profiles: resolve(root, "profiles/index.html"),
      },
    },
    target: "esnext",
  },
  server: {
    port: 8080,
    hot: true,
  },
});
