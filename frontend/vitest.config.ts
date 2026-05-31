import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  root: "frontend",
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./test/setup.ts"],
    include: ["/**/*.{test,spec}.{ts,tsx}"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./frontend/src") },
  },
  // ✅ AGREGAR ESTO: Eliminar CSP en desarrollo
  server: {
    headers: {
      'Content-Security-Policy': ''
    }
  }
});
