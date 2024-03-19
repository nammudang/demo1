import { defineConfig } from "vite";
import react from '@vitejs/plugin-react-swc'
import federation from "@originjs/vite-plugin-federation";
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "host-app",
      remotes: {
        app_components: "http://localhost:4173/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom", "react-router-dom"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
