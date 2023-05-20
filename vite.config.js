import { resolve } from "path";
import { defineConfig } from "vite";

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");
const publicDir = resolve(__dirname, "assets");

// https://vitejs.dev/config/
export default defineConfig({
  root,
  css: {
    devSourcemap: true,
  },
  build: {
    outDir,
    emptyOutDir: true,
    publicDir,
    resolve: {
      alias: {
        "~bootstrap": path.resolve(dirname, "node_modules/bootstrap"),
      },
    },
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        allListings: resolve(root, "listing/index.html"),
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
