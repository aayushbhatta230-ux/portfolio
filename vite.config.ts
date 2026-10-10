import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-three": ["three", "three-stdlib"],
          "vendor-r3f": ["@react-three/fiber", "@react-three/drei", "@react-three/rapier"],
          "vendor-gsap": ["gsap", "@gsap/react"],
          "vendor-react": ["react", "react-dom", "react-icons"]
        }
      }
    },
    chunkSizeWarningLimit: 1500
  }
});

