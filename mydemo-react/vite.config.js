import { defineConfig } from "vite";
import react from '@vitejs/plugin-react-swc'
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "app-Components",
      filename: "remoteEntry.js",
      // Modules to expose
      exposes: {
        "./Card": "./src/components/Card2.jsx",
        "./Upload": "./src/components/Upload.jsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
}); 
